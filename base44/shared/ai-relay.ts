import { ASSERTION, AUTHORITY, digest, KEY_ID, verifyAssertion, type Operation } from "./relay-protocol.ts";
import { MAX_BODY, normalizeChat, normalizeEmbeddings, normalizeSpeech } from "./relay-input.ts";

type Gateway = { baseURL: string; token: string; headers: Record<string, string> };
type Services = {
  getKey: () => Promise<CryptoKey>;
  reserve: (token: string) => Promise<number>;
  connection: (request: Request) => Gateway;
  fetcher: typeof fetch;
  embeddingsKey?: () => string | undefined;
};
const error = (status: number, message: string) => Response.json({ error: message }, { status, headers: { "Cache-Control": "no-store" } });
let cached: { value: Promise<CryptoKey>; until: number } | undefined;
export function trustedKey(): Promise<CryptoKey> {
  if (cached && cached.until > Date.now()) return cached.value;
  const value = (async () => {
    const response = await fetch(AUTHORITY, { redirect: "error", signal: AbortSignal.timeout(5000) });
    if (!response.ok) throw new Error("Relay verification unavailable");
    const { keys } = await response.json();
    const key = Array.isArray(keys) && keys.find(k => k?.kid === KEY_ID && k?.alg === "EdDSA" && k?.kty === "OKP" && k?.crv === "Ed25519" && k?.use === "sig");
    if (!key || typeof key.x !== "string" || !/^[A-Za-z0-9_-]{43}$/.test(key.x) || "d" in key) throw new Error("Relay verification unavailable");
    return crypto.subtle.importKey("jwk", {kty:"OKP",crv:"Ed25519",x:key.x}, "Ed25519", false, ["verify"]);
  })();
  cached = {value, until: Date.now() + 30000};
  value.catch(() => { if (cached?.value === value) cached = undefined; });
  return value;
}
export async function reserve(token: string): Promise<number> {
  // Atomic across all Base44 isolates. The issuer only sees its own signed assertion.
  const response = await fetch(AUTHORITY, {method:"POST", headers:{[ASSERTION]:token}, redirect:"error",signal:AbortSignal.timeout(5000)});
  await response.body?.cancel();
  return response.status;
}
async function boundedBytes(request: Request | Response, maxBytes = MAX_BODY) {
  const length = request.headers.get("Content-Length");
  if ((length !== null && (!/^\d+$/.test(length) || Number(length) > maxBytes)) || !request.body) throw new Error("Too large");
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = []; let size = 0;
  try {
    for (;;) {
      const {value,done} = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBytes) { await reader.cancel(); throw new Error("Too large"); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const bytes = new Uint8Array(size); let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk,offset); offset += chunk.length; }
  return bytes;
}
async function embeddings(request: Request, texts: string[], services: Services): Promise<Response> {
  const key = services.embeddingsKey?.();
  if (!key) return error(503, "Embeddings are not configured on the Base44 backend");
  const response = await services.fetcher("https://api.openai.com/v1/embeddings", {
    method:"POST", redirect:"error", headers:{"Content-Type":"application/json",Authorization:"Bearer " + key},
    signal:AbortSignal.any([request.signal,AbortSignal.timeout(40000)]),
    body:JSON.stringify({model:"text-embedding-3-small",input:texts,dimensions:1536,encoding_format:"float"}),
  });
  if (!response.ok) {
    await response.body?.cancel();
    return error(response.status === 429 ? 429 : 502,"Embedding provider unavailable");
  }
  const bytes = await boundedBytes(response, 3 * 1024 * 1024);
  const result = JSON.parse(new TextDecoder().decode(bytes));
  if (result?.model !== "text-embedding-3-small" || !Array.isArray(result.data) || result.data.length !== texts.length) return error(502,"Invalid embedding response");
  const data = [...result.data].sort((a,b) => a.index - b.index);
  if (data.some((row,i) => row?.index !== i || !Array.isArray(row.embedding) || row.embedding.length !== 1536 ||
    !row.embedding.every((n:unknown) => typeof n === "number" && Number.isFinite(n)))) return error(502,"Invalid embedding response");
  return Response.json({object:"list",model:result.model,data:data.map(row => ({object:"embedding",index:row.index,embedding:row.embedding}))},
    {headers:{"Cache-Control":"no-store"}});
}
export async function relay(request: Request, services: Services): Promise<Response> {
  if (request.method !== "POST") return error(405,"Method not allowed");
  const assertion = request.headers.get(ASSERTION);
  if (!assertion || assertion.length > 1300 || !/^[A-Za-z0-9_.-]+$/.test(assertion)) return error(401,"Invalid relay authorization");
  let key: CryptoKey;
  try { key = await services.getKey(); } catch { return error(503,"Relay verification unavailable"); }
  let claims;
  try { claims = await verifyAssertion(assertion,key); } catch { return error(401,"Invalid relay authorization"); }
  if (request.headers.get("Content-Type")?.split(";")[0].trim() !== "application/json") return error(415,"Expected JSON");
  let body: Uint8Array<ArrayBuffer>;
  try { body = await boundedBytes(request); } catch { return error(413,"Request too large"); }
  if (await digest(body) !== claims.sha256) return error(401,"Invalid relay authorization");
  const operation: Operation = claims.op;
  let payload: Record<string,unknown>;
  let texts: string[] | undefined;
  try {
    const envelope = JSON.parse(new TextDecoder("utf-8",{fatal:true}).decode(body));
    if (envelope.operation !== operation || Object.keys(envelope).length !== 2) return error(400,"Invalid operation");
    if (operation === "embeddings") {
      texts = normalizeEmbeddings(envelope.payload);
      payload = {};
    } else {
      payload = operation === "chat" ? normalizeChat(envelope.payload) : normalizeSpeech(envelope.payload);
    }
  } catch { return error(400,"Unsupported AI request"); }
  let status: number;
  try { status = await services.reserve(assertion); } catch { return error(503,"Relay verification unavailable"); }
  if (status === 409) return error(409,"Request already accepted");
  if (status === 429) return error(429,"AI capacity limit reached");
  if (status === 401) return error(401,"Invalid relay authorization");
  if (status !== 204) return error(503,"Relay verification unavailable");
  try {
    if (texts) return await embeddings(request,texts,services);
    const provider = services.connection(request);
    const headers = new Headers(provider.headers);
    headers.set("Authorization","Bearer " + provider.token);
    headers.set("Content-Type","application/json");
    const endpoint = operation === "chat" ? "chat/completions" : "audio/speech";
    const upstream = await services.fetcher(provider.baseURL.replace(/\/$/,"") + "/" + endpoint, {
      method:"POST", headers, body:JSON.stringify(payload), redirect:"error",
      signal:AbortSignal.any([request.signal,AbortSignal.timeout(240000)]),
    });
    if (!upstream.ok || !upstream.body) {
      await upstream.body?.cancel();
      const code = [400,402,413,422,429].includes(upstream.status) ? upstream.status : 502;
      return error(code,"Base44 model request failed");
    }
    const stream = operation === "chat" && payload.stream === true;
    const type = upstream.headers.get("Content-Type")?.split(";")[0].trim().toLowerCase() ?? "";
    const expected = operation === "speech" ? (payload.response_format === "pcm" ? "audio/pcm;rate=24000;channels=1" : "audio/mpeg") : stream ? "text/event-stream" : "application/json";
    const audioTypes = payload.response_format === "pcm" ? ["audio/pcm","audio/raw","application/octet-stream"] : ["audio/mpeg","audio/mp3","application/octet-stream"];
    if ((operation === "chat" && type !== expected) || (operation === "speech" && !audioTypes.includes(type))) {
      await upstream.body.cancel(); return error(502,"Unexpected Base44 model response");
    }
    return new Response(upstream.body, {status:200, headers:{"Content-Type":expected,"Cache-Control":"no-store"}});
  } catch { return error(502,"Base44 model unavailable"); }
}

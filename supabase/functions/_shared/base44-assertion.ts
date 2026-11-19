import { ASSERTION, AUDIENCE, base64url, digest, encoder, ISSUER, KEY_ID, type Operation } from "./relay-protocol.ts";

// Only this source service derives the key. The exported JWK contains the public point only.
export async function deriveRelayKeys(sourceCredential: string) {
  if (sourceCredential.length < 32) throw new Error("Source signing credential is unavailable");
  const material = await crypto.subtle.importKey("raw", encoder.encode(sourceCredential), "HKDF", false, ["deriveBits"]);
  const seed = new Uint8Array(await crypto.subtle.deriveBits({
    name: "HKDF", hash: "SHA-256", salt: encoder.encode(ISSUER + "/ai-relay/v1"),
    info: encoder.encode("Ed25519 signing seed restricted to " + AUDIENCE),
  }, material, 256));
  // RFC 8410 PKCS8 wrapper around the 32-byte private seed. WebCrypto derives the public point.
  const pkcs8 = Uint8Array.from([0x30,0x2e,0x02,0x01,0x00,0x30,0x05,0x06,0x03,0x2b,0x65,0x70,0x04,0x22,0x04,0x20,...seed]);
  const privateKey = await crypto.subtle.importKey("pkcs8", pkcs8, "Ed25519", true, ["sign"]);
  const { x } = await crypto.subtle.exportKey("jwk", privateKey);
  if (!x) throw new Error("Unable to derive public relay key");
  const jwk = { kty: "OKP", crv: "Ed25519", x, kid: KEY_ID, alg: "EdDSA", use: "sig" };
  const publicKey = await crypto.subtle.importKey("jwk", jwk, "Ed25519", false, ["verify"]);
  return { privateKey, publicKey, jwk };
}
let keys: ReturnType<typeof deriveRelayKeys> | undefined;
export function sourceKeys() {
  if (Deno.env.get("SUPABASE_URL") !== ISSUER) throw new Error("Unexpected source project");
  keys ??= deriveRelayKeys(Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "");
  return keys;
}
export async function signRelayBody(operation: Operation, body: string, privateKey: CryptoKey, now = Math.floor(Date.now()/1000)): Promise<string> {
  const header = base64url(encoder.encode(JSON.stringify({ alg: "EdDSA", typ: "JWT", kid: KEY_ID })));
  const claims = base64url(encoder.encode(JSON.stringify({ iss: ISSUER, aud: AUDIENCE, iat: now, exp: now + 30, jti: crypto.randomUUID(), op: operation, sha256: await digest(body) })));
  const signingInput = header + "." + claims;
  return signingInput + "." + base64url(new Uint8Array(await crypto.subtle.sign("Ed25519", privateKey, encoder.encode(signingInput))));
}

export async function callBase44Relay(operation: Operation, payload: Record<string, unknown>, signal?: AbortSignal): Promise<Response> {
  const target = new URL(Deno.env.get("BASE44_AI_RELAY_URL") ?? "");
  if (target.protocol !== "https:" || !/^[a-z0-9-]+\.base44\.app$/.test(target.hostname) ||
      target.pathname !== "/functions/aiRelay" || target.search || target.hash || target.port || target.username || target.password) throw new Error("Invalid Base44 AI relay address");
  const body = JSON.stringify({ operation, payload });
  const assertion = await signRelayBody(operation, body, (await sourceKeys()).privateKey);
  return fetch(target, {
    method: "POST", redirect: "error", signal,
    headers: { "Content-Type": "application/json", [ASSERTION]: assertion }, body,
  });
}

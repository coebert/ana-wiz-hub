export const ISSUER = "https://aqkusdwwhlqqttvnxuwu.supabase.co";
export const AUDIENCE = "anaesthesiacore-base44-ai-relay-v1";
export const AUTHORITY = ISSUER + "/functions/v1/ai-relay-jwks";
export const ASSERTION = "X-AnaesthesiaCore-Assertion";
export const KEY_ID = "anaesthesiacore-ed25519-v1";
export const encoder = new TextEncoder();
export type Operation = "chat" | "speech" | "embeddings";
export type Claims = { iss: string; aud: string; iat: number; exp: number; jti: string; op: Operation; sha256: string };

export function base64url(bytes: Uint8Array): string {
  return btoa(String.fromCharCode(...bytes)).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/, "");
}
export function fromBase64url(value: string): Uint8Array<ArrayBuffer> {
  if (!/^[A-Za-z0-9_-]+$/.test(value)) throw new Error("Invalid assertion");
  const bytes = Uint8Array.from(atob(value.replaceAll("-", "+").replaceAll("_", "/")), c => c.charCodeAt(0));
  if (base64url(bytes) !== value) throw new Error("Invalid assertion");
  return bytes;
}
export async function digest(body: Uint8Array<ArrayBuffer> | string): Promise<string> {
  return base64url(new Uint8Array(await crypto.subtle.digest("SHA-256", typeof body === "string" ? encoder.encode(body) : body)));
}
export async function verifyAssertion(token: string, key: CryptoKey, now = Math.floor(Date.now() / 1000)): Promise<Claims> {
  if (token.length > 1300) throw new Error("Invalid assertion");
  const parts = token.split(".");
  if (parts.length !== 3) throw new Error("Invalid assertion");
  const header = JSON.parse(new TextDecoder().decode(fromBase64url(parts[0])));
  if (header?.alg !== "EdDSA" || header.typ !== "JWT" || header.kid !== KEY_ID || Object.keys(header).length !== 3) throw new Error("Invalid assertion");
  if (!(await crypto.subtle.verify("Ed25519", key, fromBase64url(parts[2]), encoder.encode(parts[0] + "." + parts[1])))) throw new Error("Invalid assertion");
  const c = JSON.parse(new TextDecoder().decode(fromBase64url(parts[1])));
  if (c?.iss !== ISSUER || c.aud !== AUDIENCE || !Number.isSafeInteger(c.iat) || !Number.isSafeInteger(c.exp) ||
      c.iat > now + 2 || c.exp <= now || c.exp <= c.iat || c.exp - c.iat > 45 ||
      typeof c.jti !== "string" || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(c.jti) ||
      (c.op !== "chat" && c.op !== "speech" && c.op !== "embeddings") || typeof c.sha256 !== "string" || !/^[A-Za-z0-9_-]{43}$/.test(c.sha256)) throw new Error("Invalid assertion");
  return c as Claims;
}

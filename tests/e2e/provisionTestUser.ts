import fs from "node:fs";
import path from "node:path";

/**
 * Provisions a deterministic, pre-confirmed test account through the
 * `e2e-provision-user` edge function so specs never have to skip when
 * TEST_USER_EMAIL / TEST_USER_PASSWORD are absent.
 *
 * The function only accepts the reserved domain `e2e.anaesthesiacore.test`
 * and recreates the account from scratch on every call, so each run starts
 * with a genuinely empty progress state in the cloud.
 */

function readEnvFile(): Record<string, string> {
  const file = path.resolve(process.cwd(), ".env");
  if (!fs.existsSync(file)) return {};
  const out: Record<string, string> = {};
  for (const line of fs.readFileSync(file, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m) out[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
  return out;
}

const fileEnv = readEnvFile();
const env = (k: string) => process.env[k] ?? fileEnv[k];

export const SUPABASE_URL = env("VITE_SUPABASE_URL") ?? "";
export const SUPABASE_ANON_KEY = env("VITE_SUPABASE_PUBLISHABLE_KEY") ?? "";

export const TEST_PASSWORD = "E2e-Progress-Test!2026";

/** Stable-ish but unique-per-run address in the reserved e2e domain. */
export function testEmail(slug: string): string {
  return `e2e-${slug}-${Date.now().toString(36)}${Math.floor(Math.random() * 1e4)}@e2e.anaesthesiacore.test`;
}

async function callProvision(payload: Record<string, unknown>) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error(
      "VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY are required to provision an e2e user"
    );
  }
  const res = await fetch(`${SUPABASE_URL}/functions/v1/e2e-provision-user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "x-e2e-secret": process.env.E2E_PROVISION_SECRET ?? "",
    },
    body: JSON.stringify(payload),
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`e2e-provision-user failed (${res.status}): ${text}`);
  }
  return JSON.parse(text) as { email: string; userId?: string };
}

/** Create (or recreate) a confirmed account. Returns its credentials. */
export async function provisionTestUser(
  slug: string,
  password: string = TEST_PASSWORD
): Promise<{ email: string; password: string }> {
  const email = testEmail(slug);
  await callProvision({ email, password, action: "provision" });
  return { email, password };
}

/**
 * Confirm an account that was just created through the app's own signup UI —
 * the test-mode equivalent of clicking the confirmation link in the e-mail.
 */
export async function confirmTestUser(email: string, password?: string): Promise<void> {
  await callProvision({ email, password, action: "confirm" });
}

/** Best-effort teardown so the auth table doesn't accumulate test accounts. */
export async function deleteTestUser(email: string): Promise<void> {
  try {
    await callProvision({ email, action: "delete" });
  } catch {
    /* teardown is best-effort */
  }
}

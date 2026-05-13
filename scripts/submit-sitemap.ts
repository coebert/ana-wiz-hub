/**
 * Submits public/sitemap.xml to Google Search Console via the
 * gsc-submit-sitemap edge function and prints a CI-friendly report.
 *
 * Wire it into deploys by adding a `postbuild` script to package.json:
 *   "postbuild": "bunx tsx scripts/submit-sitemap.ts"
 *
 * Required env (read from .env or the CI environment):
 *   - VITE_SUPABASE_URL              (project edge-functions URL)
 *   - SUPABASE_SERVICE_ROLE_KEY      (preferred — required for the admin-only
 *                                     edge function; mint one in your CI secrets)
 *   - VITE_SUPABASE_PUBLISHABLE_KEY  (anon key fallback — only works if the
 *                                     caller's bearer token is a service-role
 *                                     or admin-user JWT; CI should prefer the
 *                                     service-role key above)
 *
 * Optional env:
 *   - SKIP_SITEMAP_SUBMIT=1  → no-op (useful for PR builds)
 *   - SITEMAP_SUBMIT_SOFT_FAIL=1  → log error but exit 0 (don't block deploy)
 *
 * Exit codes:
 *   0 → submitted successfully (or skipped)
 *   1 → submission failed and SITEMAP_SUBMIT_SOFT_FAIL is not set
 */

import { config as loadDotenv } from "dotenv";

loadDotenv();

const FUNCTION_NAME = "gsc-submit-sitemap";

interface SitemapStatus {
  path?: string;
  lastSubmitted?: string;
  lastDownloaded?: string;
  isPending?: boolean;
  type?: string;
  warnings?: string;
  errors?: string;
  contents?: Array<{ type?: string; submitted?: string; indexed?: string }>;
}

interface SuccessPayload {
  ok: true;
  site: string;
  sitemapUrl: string;
  submittedAt: string;
  status: SitemapStatus;
}

interface ErrorPayload {
  ok: false;
  site: string;
  sitemapUrl: string;
  error: string;
}

function fmt(value: unknown): string {
  if (value === undefined || value === null || value === "") return "—";
  return String(value);
}

async function main(): Promise<void> {
  if (process.env.SKIP_SITEMAP_SUBMIT === "1") {
    console.log("⏭  SKIP_SITEMAP_SUBMIT=1 — skipping Google Search Console submission.");
    return;
  }

  const baseUrl = process.env.VITE_SUPABASE_URL;
  const anonKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const bearerToken = serviceKey || anonKey;
  if (!baseUrl || !bearerToken || !anonKey) {
    throw new Error(
      "Missing VITE_SUPABASE_URL, VITE_SUPABASE_PUBLISHABLE_KEY, or SUPABASE_SERVICE_ROLE_KEY — cannot reach the gsc-submit-sitemap edge function.",
    );
  }
  if (!serviceKey) {
    console.warn(
      "⏭  SUPABASE_SERVICE_ROLE_KEY not set — skipping Google Search Console sitemap submission. Set the secret in CI to enable it.",
    );
    return;
  }

  const url = `${baseUrl.replace(/\/+$/, "")}/functions/v1/${FUNCTION_NAME}`;
  console.log(`→ POST ${url}`);

  const start = Date.now();
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerToken}`,
      apikey: anonKey,
    },
    body: "{}",
  });
  const elapsed = Date.now() - start;

  const text = await res.text();
  let body: SuccessPayload | ErrorPayload;
  try {
    body = JSON.parse(text);
  } catch {
    throw new Error(`Edge function returned non-JSON [${res.status}]: ${text.slice(0, 500)}`);
  }

  if (!res.ok || !("ok" in body) || !body.ok) {
    const message = "error" in body ? body.error : `HTTP ${res.status}`;
    console.error(`✗ Sitemap submission FAILED in ${elapsed}ms`);
    console.error(`  Site:        ${("site" in body && body.site) || "—"}`);
    console.error(`  Sitemap URL: ${("sitemapUrl" in body && body.sitemapUrl) || "—"}`);
    console.error(`  Reason:      ${message}`);
    if (process.env.SITEMAP_SUBMIT_SOFT_FAIL === "1") {
      console.warn("⚠  SITEMAP_SUBMIT_SOFT_FAIL=1 — exiting 0 despite failure.");
      return;
    }
    process.exit(1);
  }

  const { site, sitemapUrl, submittedAt, status } = body;
  const warnings = Number(status.warnings ?? "0");
  const errors = Number(status.errors ?? "0");

  console.log(`✓ Sitemap submitted to Google Search Console in ${elapsed}ms`);
  console.log(`  Site:            ${site}`);
  console.log(`  Sitemap URL:     ${sitemapUrl}`);
  console.log(`  Submitted at:    ${submittedAt}`);
  console.log(`  GSC reports:`);
  console.log(`    last submitted: ${fmt(status.lastSubmitted)}`);
  console.log(`    last downloaded:${fmt(status.lastDownloaded)}`);
  console.log(`    type:           ${fmt(status.type)}`);
  console.log(`    pending:        ${status.isPending ? "yes" : "no"}`);
  console.log(`    warnings:       ${warnings}`);
  console.log(`    errors:         ${errors}`);

  if (errors > 0) {
    console.error(`✗ GSC reports ${errors} error(s) for the sitemap — failing CI.`);
    if (process.env.SITEMAP_SUBMIT_SOFT_FAIL === "1") {
      console.warn("⚠  SITEMAP_SUBMIT_SOFT_FAIL=1 — exiting 0 despite GSC errors.");
      return;
    }
    process.exit(1);
  }

  if (warnings > 0) {
    console.warn(`⚠  GSC reports ${warnings} warning(s) for the sitemap (not failing).`);
  }
}

main().catch((err: unknown) => {
  const message = err instanceof Error ? err.message : String(err);
  console.error(`✗ submit-sitemap script crashed: ${message}`);
  if (process.env.SITEMAP_SUBMIT_SOFT_FAIL === "1") {
    console.warn("⚠  SITEMAP_SUBMIT_SOFT_FAIL=1 — exiting 0 despite crash.");
    process.exit(0);
  }
  process.exit(1);
});

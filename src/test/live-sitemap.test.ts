import { describe, it, expect, beforeAll } from "vitest";
import { readFileSync, existsSync, readdirSync } from "fs";
import { resolve } from "path";

/**
 * Fetches the LIVE /robots.txt and /sitemap.xml from the deployed site and
 * asserts they match what the repo expects to ship. Catches drift between
 * the checked-in `public/` files and what is actually being served (stale
 * deploys, CDN caching, hosting-layer rewrites, etc.).
 *
 * Set SITE_URL to override the target (defaults to the canonical domain).
 * Set SKIP_LIVE_SITEMAP_CHECK=1 to opt out (useful for offline CI runs).
 */
const SITE_URL = (process.env.SITE_URL ?? "https://anaesthesiacore.app").replace(
  /\/$/,
  "",
);
const SKIP = process.env.SKIP_LIVE_SITEMAP_CHECK === "1";

const describeOrSkip = SKIP ? describe.skip : describe;

/**
 * Fetch with retry + exponential backoff. Retries transient failures
 * (network errors, 5xx, 429); 4xx fails fast.
 */
async function fetchWithRetry(
  url: string,
  { retries = 4, baseDelayMs = 500 }: { retries?: number; baseDelayMs?: number } = {},
): Promise<Response> {
  let lastError: unknown;
  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10_000);
    try {
      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timer);
      if (res.status >= 500 || res.status === 429) {
        lastError = new Error(`${url} -> HTTP ${res.status}`);
      } else {
        return res;
      }
    } catch (err) {
      clearTimeout(timer);
      lastError = err;
    }
    if (attempt < retries) {
      const delay = baseDelayMs * 2 ** attempt + Math.floor(Math.random() * 250);
      // eslint-disable-next-line no-console
      console.warn(
        `[live-sitemap] ${url} attempt ${attempt + 1}/${retries + 1} failed (${
          (lastError as Error)?.message ?? lastError
        }); retrying in ${delay}ms`,
      );
      await new Promise((r) => setTimeout(r, delay));
    }
  }
  throw new Error(
    `Failed to fetch ${url} after ${retries + 1} attempts: ${
      (lastError as Error)?.message ?? lastError
    }`,
  );
}

describeOrSkip("live sitemap & robots.txt", () => {
  let robots = "";
  let sitemap = "";
  let robotsStatus = 0;
  let sitemapStatus = 0;

  beforeAll(async () => {
    const [r, s] = await Promise.all([
      fetchWithRetry(`${SITE_URL}/robots.txt`),
      fetchWithRetry(`${SITE_URL}/sitemap.xml`),
    ]);
    robotsStatus = r.status;
    sitemapStatus = s.status;
    robots = await r.text();
    sitemap = await s.text();
  }, 90_000);

  it("GET /robots.txt returns 200", () => {
    expect(robotsStatus, `robots.txt returned ${robotsStatus}`).toBe(200);
  });

  it("GET /sitemap.xml returns 200", () => {
    expect(sitemapStatus, `sitemap.xml returned ${sitemapStatus}`).toBe(200);
  });

  it("live robots.txt declares the canonical Sitemap directive", () => {
    const sitemaps = Array.from(
      robots.matchAll(/^\s*Sitemap:\s*(\S+)\s*$/gim),
    ).map((m) => m[1]);

    expect(
      sitemaps,
      `Expected exactly one Sitemap: ${SITE_URL}/sitemap.xml — got ${JSON.stringify(sitemaps)}`,
    ).toEqual([`${SITE_URL}/sitemap.xml`]);
  });

  it("live sitemap.xml is a well-formed sitemap index", () => {
    expect(sitemap).toMatch(/<sitemapindex[^>]*>/);
    expect(sitemap).toMatch(/<\/sitemapindex>/);
  });

  it("live sitemap.xml lists exactly the per-section sitemaps shipped in repo", () => {
    const liveLocs = new Set(
      Array.from(sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)).map((m) => m[1]),
    );

    const sitemapsDir = resolve(process.cwd(), "public/sitemaps");
    const expectedLocs = new Set(
      readdirSync(sitemapsDir)
        .filter((f) => f.endsWith(".xml"))
        .map((f) => `${SITE_URL}/sitemaps/${f}`),
    );

    const missing = [...expectedLocs].filter((u) => !liveLocs.has(u));
    const extra = [...liveLocs].filter((u) => !expectedLocs.has(u));

    expect(
      { missing, extra },
      `Live sitemap index drifted from repo.\nMissing: ${missing.join(", ")}\nExtra: ${extra.join(", ")}\n` +
        `Click Publish → Update to redeploy, or regenerate via \`bunx tsx scripts/generate-sitemap.ts\`.`,
    ).toEqual({ missing: [], extra: [] });
  });

  it("live sitemap.xml index matches the repo file byte-for-byte (loc set)", () => {
    const repoPath = resolve(process.cwd(), "public/sitemap.xml");
    expect(existsSync(repoPath)).toBe(true);
    const repo = readFileSync(repoPath, "utf8");

    const repoLocs = Array.from(repo.matchAll(/<loc>([^<]+)<\/loc>/g))
      .map((m) => m[1])
      .sort();
    const liveLocs = Array.from(sitemap.matchAll(/<loc>([^<]+)<\/loc>/g))
      .map((m) => m[1])
      .sort();

    expect(
      liveLocs,
      `Live <loc>s do not match repo <loc>s — deploy is stale or a CDN is rewriting URLs.`,
    ).toEqual(repoLocs);
  });
});

/**
 * Walks the live sitemap index, fetches every per-section sitemap it lists,
 * and asserts each returns 200 with a valid <urlset> whose <loc> entries
 * match the canonical-domain URLs shipped in the repo file. Catches stale
 * CDN copies, missing files on the deployed host, and unexpected entries
 * (e.g. preview-domain URLs leaking into the live sitemap).
 */
describeOrSkip("live per-section sitemaps", () => {
  const sitemapsDir = resolve(process.cwd(), "public/sitemaps");
  const files = existsSync(sitemapsDir)
    ? readdirSync(sitemapsDir).filter((f) => f.endsWith(".xml"))
    : [];

  for (const file of files) {
    it(`GET /sitemaps/${file} returns 200 and matches repo entries`, async () => {
      const url = `${SITE_URL}/sitemaps/${file}`;
      const res = await fetchWithRetry(url);
      expect(res.status, `${url} returned ${res.status}`).toBe(200);

      const body = await res.text();
      expect(body, `${url} is not a valid <urlset>`).toMatch(/<urlset[^>]*>/);
      expect(body).toMatch(/<\/urlset>/);

      const liveLocs = Array.from(body.matchAll(/<loc>([^<]+)<\/loc>/g))
        .map((m) => m[1])
        .sort();

      const repoBody = readFileSync(resolve(sitemapsDir, file), "utf8");
      const repoLocs = Array.from(repoBody.matchAll(/<loc>([^<]+)<\/loc>/g))
        .map((m) => m[1])
        .sort();

      const missing = repoLocs.filter((u) => !liveLocs.includes(u));
      const unexpected = liveLocs.filter((u) => !repoLocs.includes(u));

      expect(
        { missing, unexpected },
        `Live ${file} drifted from repo.\n` +
          `Missing: ${missing.join(", ") || "(none)"}\n` +
          `Unexpected: ${unexpected.join(", ") || "(none)"}\n` +
          `Click Publish → Update to redeploy, or regenerate via \`bunx tsx scripts/generate-sitemap.ts\`.`,
      ).toEqual({ missing: [], unexpected: [] });

      const offDomain = liveLocs.filter((u) => !u.startsWith(SITE_URL));
      expect(
        offDomain,
        `${file} contains <loc>s on a different host: ${offDomain.join(", ")}`,
      ).toEqual([]);
    }, 60_000);
  }
});

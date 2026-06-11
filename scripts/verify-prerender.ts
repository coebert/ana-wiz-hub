/**
 * Post-prerender verification.
 *
 * The prerender script is only useful if EVERY URL Google finds via the
 * sitemap has a matching prerendered HTML file in `dist/`. If the two
 * drift apart, crawlers hit the SPA fallback (or a 404 on some hosts)
 * and only see the generic shell — exactly the indexing problem we just
 * fixed for the rest of the site.
 *
 * This script:
 *   1. Confirms `dist/sitemap.xml` exists and lists at least one sub-sitemap.
 *   2. Confirms every <loc> in every `dist/sitemaps/*.xml` has a matching
 *      `dist/<path>/index.html` written by prerender-seo.ts.
 *   3. Confirms `dist/robots.txt` exists and contains a `Sitemap:` directive
 *      that points at our sitemap (so crawlers can discover it).
 *
 * Logs a clear summary either way. Never throws — postbuild must not break
 * deploys — but exits 1 in CI when invoked with `--strict` so we can wire
 * it into a GitHub check later if desired.
 */
import { readFileSync, existsSync, readdirSync } from "fs";
import { resolve, join } from "path";

const DIST = resolve("dist");
const SITE = "https://anaesthesiacore.app";
const STRICT = process.argv.includes("--strict");

function fail(msg: string): never {
  console.error(`[verify-prerender] ✗ ${msg}`);
  if (STRICT) process.exit(1);
  // Non-strict: log but allow build to continue.
  throw new Error(msg);
}

function main() {
  if (!existsSync(DIST)) {
    console.warn(`[verify-prerender] ${DIST} not found — skipping.`);
    return;
  }

  // ---- sitemap index ----
  const indexPath = join(DIST, "sitemap.xml");
  if (!existsSync(indexPath)) return fail(`dist/sitemap.xml missing`);
  const indexXml = readFileSync(indexPath, "utf8");
  const subSitemaps = [...indexXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (subSitemaps.length === 0) return fail(`sitemap.xml lists no sub-sitemaps`);

  // ---- robots.txt ----
  const robotsPath = join(DIST, "robots.txt");
  if (!existsSync(robotsPath)) return fail(`dist/robots.txt missing`);
  const robots = readFileSync(robotsPath, "utf8");
  if (!/^\s*Sitemap:\s*https?:\/\/\S+\/sitemap\.xml\s*$/im.test(robots)) {
    return fail(`robots.txt has no Sitemap: directive pointing at /sitemap.xml`);
  }
  if (/^\s*User-agent:\s*\*[^]*?^\s*Disallow:\s*\/\s*$/im.test(robots)) {
    return fail(`robots.txt blocks the entire site for User-agent: *`);
  }

  // ---- per-section sub-sitemaps → prerendered files ----
  const sitemapsDir = join(DIST, "sitemaps");
  if (!existsSync(sitemapsDir)) return fail(`dist/sitemaps/ missing`);

  const missing: Array<{ url: string; expectedFile: string }> = [];
  let checked = 0;
  for (const f of readdirSync(sitemapsDir)) {
    if (!f.endsWith(".xml")) continue;
    const xml = readFileSync(join(sitemapsDir, f), "utf8");
    for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      const url = m[1];
      if (!url.startsWith(SITE)) continue;
      const path = url.slice(SITE.length) || "/";
      const expectedFile = path === "/"
        ? join(DIST, "index.html")
        : join(DIST, path, "index.html");
      checked++;
      if (!existsSync(expectedFile)) {
        missing.push({ url, expectedFile });
      }
    }
  }

  if (missing.length > 0) {
    console.error(
      `[verify-prerender] ✗ ${missing.length}/${checked} sitemap URL(s) have no prerendered HTML:`,
    );
    for (const m of missing.slice(0, 20)) {
      console.error(`  - ${m.url}  →  ${m.expectedFile}`);
    }
    if (missing.length > 20) {
      console.error(`  …and ${missing.length - 20} more`);
    }
    return fail(`prerender / sitemap drift — fix before deploying`);
  }

  console.log(
    `[verify-prerender] ✓ ${checked} sitemap URLs all have prerendered HTML, ${subSitemaps.length} sub-sitemaps linked, robots.txt advertises sitemap.`,
  );
}

try {
  main();
} catch (err) {
  // Already logged above. Non-strict mode swallows so postbuild keeps going.
  if (STRICT) process.exit(1);
  console.warn(`[verify-prerender] continuing despite: ${(err as Error).message}`);
}

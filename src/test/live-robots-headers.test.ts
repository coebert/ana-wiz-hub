import { describe, it, expect, beforeAll } from "vitest";
import { readFileSync, existsSync, readdirSync } from "fs";
import { resolve } from "path";
import { XMLParser } from "fast-xml-parser";

/**
 * Live integration test: fetches the deployed site and verifies that
 * HTTP response headers (`X-Robots-Tag`) and the rendered HTML
 * (`<meta name="robots">`) agree with our source-of-truth intent:
 *
 *  - public/robots.txt          → which paths are crawlable
 *  - public/sitemaps/*.xml      → which paths we advertise for indexing
 *  - src/App.tsx + page sources → routes that emit <meta robots noindex>
 *
 * Rules enforced against the live origin:
 *  1. /robots.txt is reachable, 200, and byte-identical to public/robots.txt.
 *  2. Every URL we list in a sitemap returns 2xx and is INDEXABLE
 *     (no `X-Robots-Tag: noindex` header, no `<meta name="robots" content="noindex">`).
 *  3. Every route that emits a noindex meta in source is actually NON-INDEXABLE
 *     when fetched live (header OR meta says noindex). This catches deploys
 *     where the route accidentally became publicly indexable.
 *
 * Opt-in: set `LIVE_SEO_BASE_URL` to run, e.g.
 *   LIVE_SEO_BASE_URL=https://anaesthesiacore.app bunx vitest run \
 *     src/test/live-robots-headers.test.ts
 * Skipped silently otherwise so unit suites stay hermetic.
 */

const BASE = process.env.LIVE_SEO_BASE_URL?.replace(/\/+$/, "") ?? "";
const RUN = Boolean(BASE);

// Cap how many sitemap URLs we hit to keep CI runtime bounded. Set to 0 to
// fetch every entry. Override with LIVE_SEO_SAMPLE.
const SAMPLE = Number(process.env.LIVE_SEO_SAMPLE ?? "30");

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  isArray: (name) => ["url"].includes(name),
});

function pathOf(url: string): string {
  try {
    return new URL(url).pathname;
  } catch {
    return url;
  }
}

function allSitemapPaths(): string[] {
  const dir = resolve("public/sitemaps");
  if (!existsSync(dir)) return [];
  const paths = new Set<string>();
  for (const f of readdirSync(dir).filter((n) => n.endsWith(".xml"))) {
    const doc = parser.parse(readFileSync(resolve(dir, f), "utf8"));
    for (const u of doc.urlset?.url ?? []) {
      if (u?.loc) paths.add(pathOf(u.loc));
    }
  }
  return [...paths];
}

function noindexRoutesFromSource(): string[] {
  const appPath = resolve("src/App.tsx");
  if (!existsSync(appPath)) return [];
  const appSrc = readFileSync(appPath, "utf8");
  const compToFile: Record<string, string> = {};
  const recordImport = (name: string, rel: string) => {
    const base = rel.replace(/^\.\//, "src/");
    for (const ext of [".tsx", ".ts", "/index.tsx", "/index.ts"]) {
      const c = resolve(base + ext);
      if (existsSync(c)) {
        compToFile[name] = c;
        return;
      }
    }
  };
  for (const m of appSrc.matchAll(/import\s+(\w+)\s+from\s+["'](\.\/pages\/[^"']+)["']/g)) {
    recordImport(m[1], m[2]);
  }
  for (const m of appSrc.matchAll(
    /const\s+(\w+)\s*=\s*lazy\(\s*\(\)\s*=>\s*import\(["'](\.\/pages\/[^"']+)["']\)/g,
  )) {
    recordImport(m[1], m[2]);
  }
  const out: string[] = [];
  for (const m of appSrc.matchAll(/<Route\s+path="([^"]+)"\s+element=\{<(\w+)/g)) {
    const path = m[1];
    if (path.includes(":") || path === "*") continue;
    const file = compToFile[m[2]];
    if (!file) continue;
    const src = readFileSync(file, "utf8");
    if (/<meta\s+[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(src)) {
      out.push(path);
    }
  }
  return out;
}

/** Parse the relevant indexing signals out of one HTTP response. */
async function probe(url: string): Promise<{
  status: number;
  xRobots: string;
  metaRobots: string;
}> {
  const res = await fetch(url, {
    redirect: "follow",
    headers: { "User-Agent": "AnaesthesiaCoreSEOTest/1.0 (+CI)" },
  });
  const xRobots = (res.headers.get("x-robots-tag") ?? "").toLowerCase();
  let metaRobots = "";
  const ct = res.headers.get("content-type") ?? "";
  if (ct.includes("text/html")) {
    const html = await res.text();
    const m = html.match(
      /<meta\s+[^>]*name=["']robots["'][^>]*content=["']([^"']+)["']/i,
    );
    metaRobots = (m?.[1] ?? "").toLowerCase();
  }
  return { status: res.status, xRobots, metaRobots };
}

function hasNoindex(p: { xRobots: string; metaRobots: string }): boolean {
  return /\bnoindex\b/.test(p.xRobots) || /\bnoindex\b/.test(p.metaRobots);
}

// Pre-compute once so test bodies don't reread the FS.
let sitemapPaths: string[] = [];
let noindexPaths: string[] = [];
beforeAll(() => {
  sitemapPaths = allSitemapPaths();
  noindexPaths = noindexRoutesFromSource();
});

describe.skipIf(!RUN)(
  `live robots/header integration (${BASE || "<unset>"})`,
  () => {
    it("GET /robots.txt returns 200 and matches public/robots.txt byte-for-byte", async () => {
      const res = await fetch(`${BASE}/robots.txt`);
      expect(res.status, `GET ${BASE}/robots.txt`).toBe(200);
      const live = (await res.text()).replace(/\r\n/g, "\n").trimEnd();
      const local = readFileSync(resolve("public/robots.txt"), "utf8")
        .replace(/\r\n/g, "\n")
        .trimEnd();
      expect(
        live,
        "Deployed /robots.txt drifted from public/robots.txt — redeploy or update source.",
      ).toBe(local);
    });

    it("every sitemap URL is indexable on the live origin", async () => {
      const toCheck =
        SAMPLE > 0 && sitemapPaths.length > SAMPLE
          ? // Deterministic stride sample so failures are reproducible across runs.
            sitemapPaths.filter((_, i) => i % Math.ceil(sitemapPaths.length / SAMPLE) === 0)
          : sitemapPaths;

      expect(toCheck.length, "no sitemap paths discovered").toBeGreaterThan(0);

      const offenders: string[] = [];
      // Bounded concurrency — be polite to the origin.
      const CONCURRENCY = 6;
      let cursor = 0;
      async function worker() {
        while (cursor < toCheck.length) {
          const p = toCheck[cursor++];
          try {
            const r = await probe(`${BASE}${p}`);
            if (r.status >= 400) {
              offenders.push(`${p}: HTTP ${r.status}`);
              continue;
            }
            if (hasNoindex(r)) {
              offenders.push(
                `${p}: noindex (x-robots-tag="${r.xRobots}", meta="${r.metaRobots}")`,
              );
            }
          } catch (err) {
            offenders.push(`${p}: fetch failed — ${(err as Error).message}`);
          }
        }
      }
      await Promise.all(Array.from({ length: CONCURRENCY }, worker));

      expect(
        offenders,
        `Sitemap URLs that are unreachable or noindexed on ${BASE}:\n${offenders.join("\n")}`,
      ).toEqual([]);
    }, 60_000);

    it("every source-noindex route is actually noindexed on the live origin", async () => {
      if (noindexPaths.length === 0) return;
      const offenders: string[] = [];
      for (const p of noindexPaths) {
        try {
          const r = await probe(`${BASE}${p}`);
          if (r.status >= 400) {
            // 401/403 on a protected admin route is fine — still not indexable.
            if (r.status === 401 || r.status === 403) continue;
            offenders.push(`${p}: HTTP ${r.status}`);
            continue;
          }
          if (!hasNoindex(r)) {
            offenders.push(
              `${p}: expected noindex but got x-robots-tag="${r.xRobots}", meta="${r.metaRobots}"`,
            );
          }
        } catch (err) {
          offenders.push(`${p}: fetch failed — ${(err as Error).message}`);
        }
      }
      expect(
        offenders,
        `Routes that should be noindexed on ${BASE} but aren't:\n${offenders.join("\n")}`,
      ).toEqual([]);
    }, 30_000);
  },
);

// Provide one always-running smoke assertion so vitest doesn't report
// "no tests" when LIVE_SEO_BASE_URL is unset (which is the normal local case).
describe("live robots/header integration — config", () => {
  it("is opt-in via LIVE_SEO_BASE_URL", () => {
    if (!RUN) {
      // eslint-disable-next-line no-console
      console.info(
        "[live-robots-headers] skipped — set LIVE_SEO_BASE_URL to enable (e.g. https://anaesthesiacore.app).",
      );
    }
    expect(true).toBe(true);
  });
});

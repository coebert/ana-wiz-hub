/**
 * Build per-section sitemaps + a sitemap index from the app's actual routes.
 *
 * Source of truth:
 *   - Static routes are derived from <Route path="..."> in src/App.tsx so
 *     adding a route (e.g. /viva/library) automatically appears in the sitemap.
 *   - Dynamic routes (currently only /drugs/:slug) are expanded by querying
 *     the live `drugs` table via the public Supabase REST endpoint.
 *
 * Filtered out:
 *   - Wildcard / not-found routes ("*", "/not-found")
 *   - Internal/admin routes ("/dev/...", "/glossary-audit", "/admin/...")
 *   - <Navigate> redirect routes (we don't want crawlers indexing duplicates)
 *   - Param routes we don't have a slug source for (logged as warnings)
 *
 * Failure model:
 *   - Network failures fetching dynamic slugs are logged and the generator
 *     emits the static portion of the sitemap. The script never throws and
 *     never exits non-zero — postbuild must not break the build.
 *
 * Wire-up: package.json runs `prebuild` and `predev` against this script.
 */
import { readFileSync, writeFileSync, statSync, existsSync, mkdirSync } from "fs";
import { resolve } from "path";
import { execSync } from "child_process";
import { config as loadDotenv } from "dotenv";

loadDotenv();

const BASE_URL = "https://anaesthesiacore.app";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
  lastmod?: string;
}

// Routes we never want in the sitemap, even if they appear in App.tsx.
const EXCLUDE_PREFIXES = ["/dev/", "/admin"];
// Routes that emit <meta name="robots" content="noindex"> must NOT appear in
// the sitemap — see src/test/sitemap-robots-noindex.test.ts which enforces this.
const EXCLUDE_EXACT = new Set<string>([
  "*",
  "/not-found",
  "/glossary-audit",
  "/login",
  "/review",
  "/viva/voice",
  "/ask",
]);


// Per-path overrides for changefreq/priority. Anything not listed here gets
// sensible defaults derived from path depth.
const PRIORITY_OVERRIDES: Record<string, { changefreq: SitemapEntry["changefreq"]; priority: string }> = {
  "/": { changefreq: "weekly", priority: "1.0" },
  "/revise": { changefreq: "weekly", priority: "0.9" },
  "/map": { changefreq: "weekly", priority: "0.8" },
  "/progress": { changefreq: "weekly", priority: "0.7" },
  "/podcasts": { changefreq: "weekly", priority: "0.6" },
  "/viva": { changefreq: "weekly", priority: "0.7" },
  "/viva/library": { changefreq: "weekly", priority: "0.6" },
  "/drugs": { changefreq: "weekly", priority: "0.7" },
};

function defaultsFor(path: string): { changefreq: SitemapEntry["changefreq"]; priority: string } {
  if (PRIORITY_OVERRIDES[path]) return PRIORITY_OVERRIDES[path];
  const segs = path.split("/").filter(Boolean);
  if (segs.length === 1) return { changefreq: "weekly", priority: "0.8" }; // section landing
  return { changefreq: "monthly", priority: "0.6" }; // leaf topic / drug page
}

// ---------- Parse src/App.tsx for routes + their backing components ----------
const appSrc = readFileSync(resolve("src/App.tsx"), "utf8");

function buildPathToFileMap(): Record<string, string> {
  const componentToFile: Record<string, string> = {};
  const recordImport = (name: string, rel: string) => {
    const base = rel.replace(/^\.\//, "src/");
    for (const ext of [".tsx", ".ts", "/index.tsx", "/index.ts"]) {
      const candidate = resolve(base + ext);
      if (existsSync(candidate)) {
        componentToFile[name] = candidate;
        break;
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
  const map: Record<string, string> = {};
  for (const m of appSrc.matchAll(/<Route\s+path="([^"]+)"\s+element=\{<(\w+)/g)) {
    const file = componentToFile[m[2]];
    if (file) map[m[1]] = file;
  }
  // Data-driven topic routes: [urlPath, moduleName] under src/pages/topics/.
  const topicRoutesFile = resolve("src/routes/topicRoutes.ts");
  if (existsSync(topicRoutesFile)) {
    const topicSrc = readFileSync(topicRoutesFile, "utf8");
    for (const m of topicSrc.matchAll(/\[\s*"(\/[^"]+)"\s*,\s*"([A-Za-z0-9_]+)"\s*\]/g)) {
      const candidate = resolve(`src/pages/topics/${m[2]}.tsx`);
      if (existsSync(candidate)) map[m[1]] = candidate;
    }
  }

  return map;
}

const pathToFile = buildPathToFileMap();

// Extract every <Route path="..."> with the *raw* element source so we can
// detect <Navigate> redirects and drop them from the sitemap.
//
// Also parses `src/routes/topicRoutes.ts` for the `TOPIC_ROUTES` data table
// (each entry `["/path", "ModuleName"]` renders a real <Route> in App.tsx via
// `topicRouteEntries.map`, but isn't visible to the App.tsx regex above).
function discoverRoutes(): { path: string; isRedirect: boolean; isParam: boolean }[] {
  const routes: { path: string; isRedirect: boolean; isParam: boolean }[] = [];
  const re = /<Route\s+path="([^"]+)"\s+element=\{([^}]*(?:\{[^}]*\}[^}]*)*)\}/g;
  for (const m of appSrc.matchAll(re)) {
    const path = m[1];
    const element = m[2];
    routes.push({
      path,
      isRedirect: /<Navigate\b/.test(element),
      isParam: path.includes(":"),
    });
  }

  // Data-driven topic routes (see src/routes/topicRoutes.ts).
  const topicRoutesFile = resolve("src/routes/topicRoutes.ts");
  if (existsSync(topicRoutesFile)) {
    const topicSrc = readFileSync(topicRoutesFile, "utf8");
    // TOPIC_ROUTES: ["/some/path", "ComponentName"]
    for (const m of topicSrc.matchAll(/\[\s*"(\/[^"]+)"\s*,\s*"[^"]+"\s*\]/g)) {
      routes.push({ path: m[1], isRedirect: false, isParam: m[1].includes(":") });
    }
    // TOPIC_REDIRECTS: ["/from", "/to"] — flag as redirect so they're skipped.
    const redirectsBlock = topicSrc.match(/TOPIC_REDIRECTS[\s\S]*?\]\s*as const/);
    if (redirectsBlock) {
      for (const m of redirectsBlock[0].matchAll(/\[\s*"(\/[^"]+)"\s*,\s*"\/[^"]+"\s*\]/g)) {
        routes.push({ path: m[1], isRedirect: true, isParam: false });
      }
    }
  }

  return routes;
}

function shouldIndex(path: string): boolean {
  if (EXCLUDE_EXACT.has(path)) return false;
  return !EXCLUDE_PREFIXES.some((p) => path.startsWith(p));
}

// ---------- lastmod resolution ----------
function lastModFor(path: string): string | undefined {
  const file = pathToFile[path];
  if (!file) return undefined;
  try {
    const iso = execSync(`git log -1 --format=%cI -- "${file}"`, {
      stdio: ["ignore", "pipe", "ignore"],
    })
      .toString()
      .trim();
    if (iso) return iso.slice(0, 10);
  } catch {
    /* fall through */
  }
  try {
    return statSync(file).mtime.toISOString().slice(0, 10);
  } catch {
    return undefined;
  }
}

// ---------- Dynamic route expansion ----------
async function fetchDrugSlugs(): Promise<string[]> {
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) {
    console.warn("[sitemap] Skipping /drugs/:slug — VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY not set.");
    return [];
  }
  try {
    const res = await fetch(
      `${url.replace(/\/+$/, "")}/rest/v1/drugs?select=slug&order=slug.asc`,
      { headers: { apikey: key, Authorization: `Bearer ${key}` } },
    );
    if (!res.ok) {
      console.warn(`[sitemap] Drug slug fetch returned HTTP ${res.status} — drug pages omitted.`);
      return [];
    }
    const rows = (await res.json()) as Array<{ slug: string }>;
    return rows.map((r) => r.slug).filter((s): s is string => Boolean(s));
  } catch (err) {
    console.warn(`[sitemap] Drug slug fetch failed (${(err as Error).message}) — drug pages omitted.`);
    return [];
  }
}

async function expandParamRoute(path: string): Promise<SitemapEntry[]> {
  if (path === "/drugs/:slug") {
    const slugs = await fetchDrugSlugs();
    return slugs.map((slug) => ({
      path: `/drugs/${slug}`,
      changefreq: "monthly",
      priority: "0.6",
    }));
  }
  console.warn(`[sitemap] No expander registered for param route "${path}" — skipped.`);
  return [];
}

// ---------- Group + render ----------
const SECTION_GROUPS = [
  "physics",
  "physiology",
  "pharmacology",
  "clinical",
  "intensive-care",
  "perioperative",
  "anatomy",
  "chemistry",
  "drugs",
] as const;
type Group = (typeof SECTION_GROUPS)[number] | "core";

function groupOf(path: string): Group {
  const first = path.split("/").filter(Boolean)[0];
  return (SECTION_GROUPS as readonly string[]).includes(first ?? "")
    ? (first as Group)
    : "core";
}

function renderUrlset(entries: SitemapEntry[]) {
  const urls = entries.map((e) => {
    const lastmod = e.lastmod ?? lastModFor(e.path);
    return [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n");
  });
  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
  ].join("\n");
}

function renderIndex(groups: { name: string; lastmod?: string }[]) {
  const items = groups.map((g) =>
    [
      `  <sitemap>`,
      `    <loc>${BASE_URL}/sitemaps/${g.name}.xml</loc>`,
      g.lastmod ? `    <lastmod>${g.lastmod}</lastmod>` : null,
      `  </sitemap>`,
    ]
      .filter(Boolean)
      .join("\n"),
  );
  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...items,
    `</sitemapindex>`,
  ].join("\n");
}

// ---------- Main ----------
async function main() {
  const discovered = discoverRoutes();
  const droppedRedirects: string[] = [];
  const droppedExcluded: string[] = [];
  const paramRoutes: string[] = [];
  const staticEntries: SitemapEntry[] = [];

  for (const r of discovered) {
    if (!shouldIndex(r.path)) {
      droppedExcluded.push(r.path);
      continue;
    }
    if (r.isRedirect) {
      droppedRedirects.push(r.path);
      continue;
    }
    if (r.isParam) {
      paramRoutes.push(r.path);
      continue;
    }
    const d = defaultsFor(r.path);
    staticEntries.push({ path: r.path, changefreq: d.changefreq, priority: d.priority });
  }

  // Dedupe (defensive — App.tsx shouldn't have dupes, but cheap insurance).
  const seen = new Set<string>();
  const allEntries: SitemapEntry[] = [];
  for (const e of staticEntries) {
    if (seen.has(e.path)) continue;
    seen.add(e.path);
    allEntries.push(e);
  }

  // Expand dynamic routes (drugs) — never throws.
  for (const p of paramRoutes) {
    const expanded = await expandParamRoute(p);
    for (const e of expanded) {
      if (seen.has(e.path)) continue;
      seen.add(e.path);
      allEntries.push(e);
    }
  }

  // Bucket by section
  const buckets = new Map<Group, SitemapEntry[]>();
  for (const entry of allEntries) {
    const g = groupOf(entry.path);
    if (!buckets.has(g)) buckets.set(g, []);
    buckets.get(g)!.push(entry);
  }

  const sitemapsDir = resolve("public/sitemaps");
  if (!existsSync(sitemapsDir)) mkdirSync(sitemapsDir, { recursive: true });

  const indexGroups: { name: string; lastmod?: string }[] = [];
  const orderedGroups: Group[] = ["core", ...SECTION_GROUPS];
  for (const g of orderedGroups) {
    const groupEntries = buckets.get(g);
    if (!groupEntries || groupEntries.length === 0) continue;
    writeFileSync(resolve(`public/sitemaps/${g}.xml`), renderUrlset(groupEntries));
    const lastmods = groupEntries
      .map((e) => e.lastmod ?? lastModFor(e.path))
      .filter((d): d is string => Boolean(d))
      .sort();
    indexGroups.push({ name: g, lastmod: lastmods.at(-1) });
  }

  writeFileSync(resolve("public/sitemap.xml"), renderIndex(indexGroups));

  const matched = allEntries.filter((e) => pathToFile[e.path]).length;
  console.log(
    `sitemap.xml index written (${indexGroups.length} sub-sitemaps, ${allEntries.length} URLs, ${matched} mapped to source files for lastmod)`,
  );
  if (droppedRedirects.length) {
    console.log(`[sitemap] Skipped ${droppedRedirects.length} <Navigate> redirect route(s).`);
  }
  if (droppedExcluded.length) {
    console.log(`[sitemap] Skipped ${droppedExcluded.length} internal route(s).`);
  }
}

main().catch((err) => {
  // Generator is best-effort — never fail the build.
  console.error(`[sitemap] generator crashed but continuing: ${(err as Error).message}`);
});

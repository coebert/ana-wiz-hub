import { describe, it, expect } from "vitest";
import { readFileSync, existsSync, readdirSync } from "fs";
import { resolve } from "path";
import { XMLParser } from "fast-xml-parser";

/**
 * Cross-validates three sources of indexing intent so they cannot drift apart:
 *
 *  1. public/sitemap.xml + per-section sitemaps under public/sitemaps/*.xml
 *  2. public/robots.txt (User-agent rules + Sitemap: directive)
 *  3. Per-route Helmet templates that may set `<meta name="robots" content="noindex">`
 *
 * Failure modes caught here:
 *  - Sub-sitemaps referenced by the index that don't exist on disk
 *  - Sub-sitemap files on disk not referenced from the index
 *  - Duplicate <loc> entries within or across sub-sitemaps
 *  - URLs in any sitemap that robots.txt disallows for `User-agent: *`
 *    (advertising a page for indexing while telling crawlers to skip it)
 *  - Routes whose source emits `<meta name="robots" content="noindex">`
 *    but also appear as a <loc> in a sitemap
 *  - robots.txt Sitemap: directive that points at a sitemap file we don't ship
 */

const CANONICAL_BASE = "https://anaesthesiacore.app";
const PUBLIC_DIR = resolve(process.cwd(), "public");

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  isArray: (name) => ["sitemap", "url"].includes(name),
});

function readXml(p: string): string {
  return readFileSync(p, "utf8");
}

function locsFromUrlset(xml: string): string[] {
  const doc = parser.parse(xml);
  const urls: Array<{ loc?: string }> = doc.urlset?.url ?? [];
  return urls.map((u) => u.loc ?? "").filter(Boolean);
}

function pathOf(url: string): string {
  if (!url.startsWith(CANONICAL_BASE)) return url;
  const rest = url.slice(CANONICAL_BASE.length);
  return rest === "" ? "/" : rest;
}

// ---------- robots.txt parsing (wildcard group only) ----------
function parseRobots(text: string) {
  const lines = text.split(/\r?\n/);
  type Block = { agents: string[]; allows: string[]; disallows: string[] };
  const blocks: Block[] = [];
  const sitemaps: string[] = [];
  let cur: Block | null = null;
  let inUA = false;

  for (const raw of lines) {
    const line = raw.replace(/#.*$/, "").trim();
    if (!line) {
      cur = null;
      inUA = false;
      continue;
    }
    const m = line.match(/^([A-Za-z-]+)\s*:\s*(.*)$/);
    if (!m) continue;
    const field = m[1].toLowerCase();
    const value = m[2].trim();
    if (field === "sitemap") {
      sitemaps.push(value);
      continue;
    }
    if (field === "user-agent") {
      if (!cur || !inUA) {
        cur = { agents: [], allows: [], disallows: [] };
        blocks.push(cur);
        inUA = true;
      }
      cur.agents.push(value);
      continue;
    }
    inUA = false;
    if (!cur) continue;
    if (field === "allow") cur.allows.push(value);
    else if (field === "disallow") cur.disallows.push(value);
  }
  return { blocks, sitemaps };
}

/** Google's longest-match rule: most-specific Allow/Disallow wins; tie → Allow. */
function isPathAllowed(path: string, allows: string[], disallows: string[]): boolean {
  const matches = (pat: string) => pat !== "" && path.startsWith(pat);
  const bestAllow = allows.filter(matches).reduce((m, p) => Math.max(m, p.length), 0);
  const bestDisallow = disallows.filter(matches).reduce((m, p) => Math.max(m, p.length), 0);
  if (bestDisallow === 0) return true;
  if (bestAllow === 0) return false;
  return bestAllow >= bestDisallow;
}

function wildcardBlock(parsed: ReturnType<typeof parseRobots>) {
  return parsed.blocks.find((b) => b.agents.includes("*")) ?? { allows: [], disallows: [] };
}

// ---------- Helmet noindex scanner ----------
function* walk(dir: string): Generator<string> {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = resolve(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;
      yield* walk(full);
    } else if (entry.isFile() && /\.(tsx|ts)$/.test(entry.name)) {
      yield full;
    }
  }
}

/** Returns route paths that statically emit `<meta name="robots" content="...noindex..." />`. */
function noindexRoutesFromAppTsx(): string[] {
  const appPath = resolve("src/App.tsx");
  if (!existsSync(appPath)) return [];
  const appSrc = readFileSync(appPath, "utf8");

  // Map: ComponentName -> source file path
  const compToFile: Record<string, string> = {};
  const recordImport = (name: string, rel: string) => {
    const base = rel.replace(/^\.\//, "src/");
    for (const ext of [".tsx", ".ts", "/index.tsx", "/index.ts"]) {
      const candidate = resolve(base + ext);
      if (existsSync(candidate)) {
        compToFile[name] = candidate;
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

  const offenders: string[] = [];
  const routeRe = /<Route\s+path="([^"]+)"\s+element=\{<(\w+)/g;
  for (const m of appSrc.matchAll(routeRe)) {
    const path = m[1];
    const file = compToFile[m[2]];
    if (!file) continue;
    const src = readFileSync(file, "utf8");
    // Match any meta robots tag whose content contains "noindex"
    if (/<meta\s+[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(src)) {
      offenders.push(path);
    }
  }
  return offenders;
}

// ---------- Tests ----------
describe("sitemap index ↔ sub-sitemap files agree", () => {
  const indexPath = resolve(PUBLIC_DIR, "sitemap.xml");
  it("public/sitemap.xml exists", () => {
    expect(existsSync(indexPath)).toBe(true);
  });

  const indexDoc = parser.parse(readXml(indexPath));
  const referenced: string[] = (indexDoc.sitemapindex?.sitemap ?? [])
    .map((s: { loc?: string }) => s.loc ?? "")
    .filter(Boolean);

  it("every <sitemap><loc> in the index resolves to a file in public/sitemaps/", () => {
    const missing = referenced.filter((loc) => {
      const p = pathOf(loc);
      const onDisk = resolve(PUBLIC_DIR, p.replace(/^\//, ""));
      return !existsSync(onDisk);
    });
    expect(
      missing,
      `sitemap.xml references files that do not exist on disk:\n${missing.join("\n")}`,
    ).toEqual([]);
  });

  it("every file in public/sitemaps/ is referenced by sitemap.xml", () => {
    const dir = resolve(PUBLIC_DIR, "sitemaps");
    const onDisk = existsSync(dir)
      ? readdirSync(dir)
          .filter((f) => f.endsWith(".xml"))
          .map((f) => `${CANONICAL_BASE}/sitemaps/${f}`)
      : [];
    const orphaned = onDisk.filter((u) => !referenced.includes(u));
    expect(
      orphaned,
      `Sub-sitemap files on disk but not referenced in sitemap.xml:\n${orphaned.join("\n")}`,
    ).toEqual([]);
  });
});

describe("sitemap <loc> entries are unique across all sub-sitemaps", () => {
  const dir = resolve(PUBLIC_DIR, "sitemaps");
  const files = existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith(".xml")) : [];

  it("no <loc> appears twice", () => {
    const seen = new Map<string, string[]>();
    for (const f of files) {
      for (const loc of locsFromUrlset(readXml(resolve(dir, f)))) {
        const list = seen.get(loc) ?? [];
        list.push(f);
        seen.set(loc, list);
      }
    }
    const dupes = Array.from(seen.entries())
      .filter(([, files]) => files.length > 1)
      .map(([loc, files]) => `${loc} appears in: ${files.join(", ")}`);
    expect(
      dupes,
      `Duplicate <loc> entries across sitemaps:\n${dupes.join("\n")}`,
    ).toEqual([]);
  });
});

describe("robots.txt Sitemap: directive points to a sitemap we ship", () => {
  const robotsPath = resolve(PUBLIC_DIR, "robots.txt");
  const parsed = parseRobots(readFileSync(robotsPath, "utf8"));

  it("each Sitemap: URL maps to a file under public/", () => {
    const missing = parsed.sitemaps.filter((loc) => {
      if (!loc.startsWith(CANONICAL_BASE)) return true;
      const p = pathOf(loc).replace(/^\//, "");
      return !existsSync(resolve(PUBLIC_DIR, p));
    });
    expect(
      missing,
      `robots.txt advertises sitemap(s) that are not shipped:\n${missing.join("\n")}`,
    ).toEqual([]);
  });
});

describe("no sitemap entry conflicts with robots.txt Disallow for User-agent: *", () => {
  const robots = parseRobots(readFileSync(resolve(PUBLIC_DIR, "robots.txt"), "utf8"));
  const block = wildcardBlock(robots);

  const dir = resolve(PUBLIC_DIR, "sitemaps");
  const files = existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith(".xml")) : [];
  const allLocs = files.flatMap((f) => locsFromUrlset(readXml(resolve(dir, f))));

  it("every <loc> path is allowed by the wildcard robots rules", () => {
    const conflicts = allLocs.filter((loc) => {
      const p = pathOf(loc);
      return !isPathAllowed(p, block.allows, block.disallows);
    });
    expect(
      conflicts,
      `Sitemap URLs disallowed by robots.txt User-agent: *:\n${conflicts.join("\n")}`,
    ).toEqual([]);
  });
});

describe("no route emits <meta robots noindex> while also appearing in a sitemap", () => {
  const noindexPaths = noindexRoutesFromAppTsx();

  const dir = resolve(PUBLIC_DIR, "sitemaps");
  const files = existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith(".xml")) : [];
  const sitemapPaths = new Set(
    files.flatMap((f) => locsFromUrlset(readXml(resolve(dir, f)))).map(pathOf),
  );

  it("noindex routes are excluded from sitemaps", () => {
    const conflicts = noindexPaths.filter((p) => sitemapPaths.has(p));
    expect(
      conflicts,
      `Routes emit <meta name="robots" content="noindex"> AND appear in a sitemap:\n${conflicts.join("\n")}\n` +
        `Either remove the noindex meta, or drop the route from the sitemap generator's includes.`,
    ).toEqual([]);
  });
});

// Surface unused helpers so tree-shakers / linters don't flag them.
export const __internal = { walk, isPathAllowed };

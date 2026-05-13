#!/usr/bin/env tsx
/**
 * JSON-LD route-to-URL coverage report.
 *
 * Walks every URL registered in `src/test/fixtures/jsonld-url-expectations.ts`,
 * resolves the React Router component for that URL from `src/App.tsx`, runs a
 * 2-hop transitive import scan, extracts JSON-LD blocks, and emits a Markdown
 * + HTML report listing per URL:
 *
 *   • expected @type(s)            (from the fixture)
 *   • detected @type(s)            (scanned from source)
 *   • missing required @type(s)    (expected − detected − sitewide)
 *   • bad blocks                   (non-schema.org @context, missing Rich
 *                                   Results required properties)
 *
 * Usage:
 *   tsx scripts/jsonld-route-coverage-report.ts \
 *     [--out /mnt/documents/jsonld-route-coverage.md]
 *
 * Exit code is non-zero under JSONLD_COVERAGE_STRICT=1 if any URL is missing
 * required @types or any block is malformed.
 */

import {
  readFileSync,
  writeFileSync,
  existsSync,
  statSync,
  mkdirSync,
  mkdtempSync,
} from "fs";
import { tmpdir } from "os";
import { execSync } from "child_process";
import { resolve, join, relative, dirname } from "path";
import {
  URL_EXPECTATIONS,
  RICH_RESULT_REQUIRED,
  SITEWIDE_TYPES,
  type UrlExpectation,
} from "../src/test/fixtures/jsonld-url-expectations";

const REPO_ROOT = process.cwd();
const SRC_ROOT = resolve("src");
const APP_TSX = resolve("src/App.tsx");
const SCHEMA_ORG = /^https?:\/\/schema\.org\/?$/;
const SITEWIDE = new Set<string>(SITEWIDE_TYPES);

// ── arg parsing ───────────────────────────────────────────────────────────
const VALID_KINDS = ["home", "section", "topic", "viva", "drug", "utility"] as const;
type Kind = (typeof VALID_KINDS)[number];

function arg(name: string, def: string): string {
  const i = process.argv.indexOf(name);
  return i >= 0 ? process.argv[i + 1] ?? def : def;
}
function argAll(name: string): string[] {
  const out: string[] = [];
  for (let i = 0; i < process.argv.length; i++) {
    if (process.argv[i] === name && process.argv[i + 1]) out.push(process.argv[i + 1]);
  }
  for (const a of process.argv) {
    if (a.startsWith(`${name}=`)) out.push(a.slice(name.length + 1));
  }
  return out.flatMap((v) => v.split(",")).map((v) => v.trim()).filter(Boolean);
}
function hasFlag(name: string): boolean { return process.argv.includes(name); }

if (hasFlag("--help") || hasFlag("-h")) {
  console.log(`JSON-LD route-to-URL coverage report

Usage:
  tsx scripts/jsonld-route-coverage-report.ts [options]

Options:
  --out <path>            Markdown output path (.html and .json written alongside)
  --kind <list>           Comma-separated kinds to include (repeatable).
                          One of: ${VALID_KINDS.join(", ")}
  --url-pattern <regex>   Only include URLs matching this regex (repeatable;
                          rows match if ANY pattern matches).
  --url-prefix <prefix>   Only include URLs starting with this prefix (repeatable).
  --invert                Invert the kind/URL filter (exclude matches instead).
  --baseline <path>       Compare against a previous JSON sidecar and emit a
                           diff section (regressions / fixes / unchanged).
  --baseline-url <url>    Fetch the baseline JSON sidecar from a URL (raw
                           .json, or a GitHub Actions artifact .zip — pass a
                           token via GITHUB_TOKEN/GH_TOKEN if needed).
  --diff-only             Only print the diff vs --baseline (skip group tables).
  --diff-group-by-kind    Inside the diff section, group regressions / fixes /
                           changed by page kind (home, section, topic, …).
  --help, -h              Show this help.

Env:
  JSONLD_COVERAGE_STRICT=1   Exit non-zero if any failure remains in the
                             *filtered* set.
  GITHUB_TOKEN / GH_TOKEN    Bearer token for --baseline-url (artifact downloads).
`);
  process.exit(0);
}

const OUT_MD = arg("--out", "/mnt/documents/jsonld-route-coverage.md");
const OUT_HTML = OUT_MD.replace(/\.md$/i, ".html");
const OUT_JSON = OUT_MD.replace(/\.md$/i, ".json");
const OUT_DIFF_JSON = OUT_MD.replace(/\.md$/i, ".diff.json");
const OUT_DIFF_CSV = OUT_MD.replace(/\.md$/i, ".diff.csv");

const KIND_FILTER = new Set<Kind>();
for (const k of argAll("--kind")) {
  if (!(VALID_KINDS as readonly string[]).includes(k)) {
    console.error(`✖ unknown --kind "${k}". Valid: ${VALID_KINDS.join(", ")}`);
    process.exit(2);
  }
  KIND_FILTER.add(k as Kind);
}
const URL_PATTERNS: RegExp[] = argAll("--url-pattern").map((p) => {
  try { return new RegExp(p); }
  catch (e) { console.error(`✖ invalid --url-pattern /${p}/: ${(e as Error).message}`); process.exit(2); }
});
const URL_PREFIXES = argAll("--url-prefix");
const INVERT = hasFlag("--invert");
const DIFF_GROUP_BY_KIND = hasFlag("--diff-group-by-kind");
const FILTERS_ACTIVE = KIND_FILTER.size > 0 || URL_PATTERNS.length > 0 || URL_PREFIXES.length > 0;

function passesFilter(url: string, kind: Kind): boolean {
  if (!FILTERS_ACTIVE) return true;
  const matches =
    (KIND_FILTER.size === 0 || KIND_FILTER.has(kind)) &&
    (URL_PATTERNS.length === 0 || URL_PATTERNS.some((re) => re.test(url))) &&
    (URL_PREFIXES.length === 0 || URL_PREFIXES.some((p) => url.startsWith(p)));
  return INVERT ? !matches : matches;
}

// ── App.tsx route table ───────────────────────────────────────────────────
interface RouteDecl { path: string; component: string; appLine: number; componentFile: string | null }

function lineOf(src: string, off: number): number {
  let l = 1;
  for (let i = 0; i < off && i < src.length; i++) if (src.charCodeAt(i) === 10) l++;
  return l;
}
function resolveImport(fromFile: string, spec: string): string | null {
  let base: string | null = null;
  if (spec.startsWith("@/")) base = join(SRC_ROOT, spec.slice(2));
  else if (spec.startsWith(".")) base = resolve(dirname(fromFile), spec);
  else return null;
  for (const ext of ["", ".tsx", ".ts", ".jsx", ".js", "/index.tsx", "/index.ts"]) {
    const p = base + ext;
    if (existsSync(p) && statSync(p).isFile()) return p;
  }
  return null;
}
function parseRoutes(): RouteDecl[] {
  const src = readFileSync(APP_TSX, "utf8");
  const importMap = new Map<string, string>();
  const lazyRe = /const\s+([A-Za-z_$][\w$]*)\s*=\s*lazy\s*\(\s*\(\)\s*=>\s*import\(\s*["']([^"']+)["']\s*\)\s*\)/g;
  for (let m: RegExpExecArray | null; (m = lazyRe.exec(src)) !== null; ) importMap.set(m[1], m[2]);
  const staticRe = /import\s+([A-Za-z_$][\w$]*)\s+from\s+["']([^"']+)["']/g;
  for (let m: RegExpExecArray | null; (m = staticRe.exec(src)) !== null; ) {
    if (!importMap.has(m[1])) importMap.set(m[1], m[2]);
  }
  const namedRe = /import\s*\{([^}]+)\}\s*from\s+["']([^"']+)["']/g;
  for (let m: RegExpExecArray | null; (m = namedRe.exec(src)) !== null; ) {
    const spec = m[2];
    for (const part of m[1].split(",")) {
      const local = part.trim().split(/\s+as\s+/).pop()?.trim();
      if (local && /^[A-Za-z_$][\w$]*$/.test(local) && !importMap.has(local)) importMap.set(local, spec);
    }
  }
  const routes: RouteDecl[] = [];
  const routeRe = /<Route\s+path=["']([^"']+)["'][^>]*element=\{\s*<\s*([A-Za-z_$][\w$]*)\b/g;
  for (let m: RegExpExecArray | null; (m = routeRe.exec(src)) !== null; ) {
    const [, path, component] = m;
    const spec = importMap.get(component);
    routes.push({
      path, component,
      appLine: lineOf(src, m.index),
      componentFile: spec ? resolveImport(APP_TSX, spec) : null,
    });
  }
  return routes;
}

// ── pattern matching: concrete URL → matching <Route path> ────────────────
function matchRoute(url: string, routes: RouteDecl[]): RouteDecl | null {
  // Prefer exact match.
  const exact = routes.find((r) => r.path === url);
  if (exact) return exact;
  const segs = url.split("/").filter(Boolean);
  // Score by specificity (fewer params wins).
  let best: { r: RouteDecl; params: number } | null = null;
  for (const r of routes) {
    if (r.component === "Navigate") continue;
    const ps = r.path.split("/").filter(Boolean);
    if (ps.length !== segs.length) continue;
    let ok = true;
    let params = 0;
    for (let i = 0; i < ps.length; i++) {
      if (ps[i].startsWith(":")) { params++; continue; }
      if (ps[i] !== segs[i]) { ok = false; break; }
    }
    if (!ok) continue;
    if (!best || params < best.params) best = { r, params };
  }
  return best?.r ?? null;
}

// ── JSON-LD scanner ───────────────────────────────────────────────────────
interface Block {
  file: string; line: number; type: string | null;
  contextOk: boolean; missing: string[]; resolveError?: string;
}
function extractBalancedBraces(src: string, start: number): string | null {
  if (src[start] !== "{") return null;
  let depth = 0; let inStr: string | null = null; let inTpl = false;
  for (let i = start; i < src.length; i++) {
    const c = src[i]; const prev = src[i - 1];
    if (inStr) { if (c === inStr && prev !== "\\") inStr = null; continue; }
    if (inTpl) { if (c === "`" && prev !== "\\") inTpl = false; continue; }
    if (c === '"' || c === "'") { inStr = c; continue; }
    if (c === "`") { inTpl = true; continue; }
    if (c === "{") depth++;
    else if (c === "}") { depth--; if (depth === 0) return src.substring(start, i + 1); }
  }
  return null;
}
function scanFileForJsonLd(file: string): Block[] {
  if (!existsSync(file)) return [];
  const src = readFileSync(file, "utf8");
  const re = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/g;
  const out: Block[] = [];
  for (let m: RegExpExecArray | null; (m = re.exec(src)) !== null; ) {
    const line = lineOf(src, m.index);
    let payload = m[1].trim().replace(/^\{|\}$/g, "").trim();
    let resolveError: string | undefined;
    const sm = /^JSON\.stringify\(([\s\S]+)\)$/m.exec(payload);
    if (sm) payload = sm[1].trim();
    payload = payload.replace(/^`|`$/g, "").trim();
    if (/^[A-Za-z_$][\w$]*$/.test(payload)) {
      const name = payload;
      const declRe = new RegExp(
        `(?:const|let|var)\\s+${name}\\b[^=]*=\\s*(?:useMemo\\s*\\(\\s*\\(\\)\\s*=>\\s*\\(?\\s*)?`, "g",
      );
      const dm = declRe.exec(src);
      if (!dm) resolveError = `cannot resolve "${name}"`;
      else {
        const objStart = src.indexOf("{", dm.index + dm[0].length);
        const lit = extractBalancedBraces(src, objStart);
        if (!lit) resolveError = `cannot extract literal for "${name}"`;
        else payload = lit;
      }
    }
    const sanitized = payload
      .replace(/\bas\s+const\b/g, "")
      .replace(/\bsatisfies\s+[A-Za-z_$][\w$.<>,\s|&[\]]*/g, "");
    const ctx = /["']@context["']\s*:\s*["']([^"']+)["']/.exec(sanitized);
    const typ = /["']@type["']\s*:\s*["']([^"']+)["']/.exec(sanitized);
    const type = typ ? typ[1] : null;
    const has = (p: string) => new RegExp(`(?:^|[\\s,{])["']?${p}["']?\\s*:`).test(sanitized);
    const required = type ? RICH_RESULT_REQUIRED[type] ?? [] : [];
    out.push({
      file, line, type,
      contextOk: !!ctx && SCHEMA_ORG.test(ctx[1]),
      missing: required.filter((p) => !has(p)),
      resolveError,
    });
  }
  return out;
}
const importRe = /import[^'"`;]*?from\s+['"]([^'"]+)['"]/g;
function localImports(file: string): string[] {
  if (!existsSync(file)) return [];
  const src = readFileSync(file, "utf8");
  const out: string[] = [];
  importRe.lastIndex = 0;
  for (let m: RegExpExecArray | null; (m = importRe.exec(src)) !== null; ) {
    const r = resolveImport(file, m[1]);
    if (r && r.startsWith(SRC_ROOT)) out.push(r);
  }
  return out;
}
function reachable(entry: string, maxDepth: number): Set<string> {
  const seen = new Set<string>([entry]);
  let frontier = [entry];
  for (let d = 0; d < maxDepth; d++) {
    const next: string[] = [];
    for (const f of frontier)
      for (const dep of localImports(f))
        if (!seen.has(dep)) { seen.add(dep); next.push(dep); }
    frontier = next;
    if (!frontier.length) break;
  }
  return seen;
}
const blockCache = new Map<string, Block[]>();
function blocksOf(file: string): Block[] {
  let v = blockCache.get(file);
  if (!v) { v = scanFileForJsonLd(file); blockCache.set(file, v); }
  return v;
}
const rel = (p: string) => relative(REPO_ROOT, p) || p;

// ── evaluate every URL ────────────────────────────────────────────────────
interface Row {
  url: string;
  kind: UrlExpectation["kind"];
  section?: string;
  topicId?: string;
  routePath: string | null;
  component: string | null;
  componentFile: string | null;
  expected: string[];
  detected: string[];
  missingTypes: string[];
  badBlocks: { file: string; line: number; type: string | null; contextOk: boolean; missing: string[] }[];
}

const ROUTES = parseRoutes();
function evaluateUrl(u: UrlExpectation): Row {
  const route = matchRoute(u.url, ROUTES);
  const detected = new Set<string>();
  const badBlocks: Row["badBlocks"] = [];
  if (route?.componentFile) {
    for (const f of reachable(route.componentFile, 2)) {
      for (const b of blocksOf(f)) {
        if (b.resolveError) continue;
        if (b.type) detected.add(b.type);
        if (b.type && (!b.contextOk || b.missing.length > 0)) {
          badBlocks.push({
            file: rel(b.file), line: b.line, type: b.type,
            contextOk: b.contextOk, missing: b.missing,
          });
        }
      }
    }
  }
  const effective = new Set([...detected, ...SITEWIDE]);
  return {
    url: u.url, kind: u.kind, section: u.section, topicId: u.topicId,
    routePath: route?.path ?? null,
    component: route?.component ?? null,
    componentFile: route?.componentFile ? rel(route.componentFile) : null,
    expected: u.expectedTypes,
    detected: [...detected].sort(),
    missingTypes: u.expectedTypes.filter((t) => !effective.has(t)),
    badBlocks,
  };
}

const ALL_ROWS = URL_EXPECTATIONS.map(evaluateUrl);
const ROWS = ALL_ROWS.filter((r) => passesFilter(r.url, r.kind as Kind));
if (FILTERS_ACTIVE && ROWS.length === 0) {
  console.error(`✖ filter excluded all ${ALL_ROWS.length} URL(s); nothing to report.`);
  process.exit(2);
}
const FILTER_DESCRIPTION = (() => {
  if (!FILTERS_ACTIVE) return null;
  const parts: string[] = [];
  if (KIND_FILTER.size) parts.push(`kind ∈ {${[...KIND_FILTER].join(", ")}}`);
  if (URL_PATTERNS.length) parts.push(`url matches ${URL_PATTERNS.map((r) => `/${r.source}/`).join(" | ")}`);
  if (URL_PREFIXES.length) parts.push(`url startsWith ${URL_PREFIXES.map((p) => `\`${p}\``).join(" | ")}`);
  return `${INVERT ? "NOT (" : ""}${parts.join(" AND ")}${INVERT ? ")" : ""}`;
})();

// ── baseline / diff ───────────────────────────────────────────────────────
let BASELINE_PATH = arg("--baseline", "");
const BASELINE_URL = arg("--baseline-url", "");
const DIFF_ONLY = hasFlag("--diff-only");
if (DIFF_ONLY && !BASELINE_PATH && !BASELINE_URL) {
  console.error(`✖ --diff-only requires --baseline <path> or --baseline-url <url>`);
  process.exit(2);
}
if (BASELINE_PATH && BASELINE_URL) {
  console.error(`✖ pass either --baseline or --baseline-url, not both`);
  process.exit(2);
}

async function fetchBaselineUrl(url: string): Promise<string> {
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || "";
  const headers: Record<string, string> = { "User-Agent": "jsonld-coverage-report" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  // GitHub artifact downloads are protected; the API returns a 302 to a
  // pre-signed URL. fetch() follows redirects by default.
  if (/api\.github\.com\//.test(url)) headers["Accept"] = "application/vnd.github+json";

  const res = await fetch(url, { headers, redirect: "follow" });
  if (!res.ok) {
    console.error(`✖ baseline-url ${res.status} ${res.statusText} for ${url}`);
    process.exit(2);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  const ct = res.headers.get("content-type") ?? "";
  const isZip =
    /zip/i.test(ct) || url.endsWith(".zip") ||
    (buf.length >= 2 && buf[0] === 0x50 && buf[1] === 0x4b); // PK\003\004

  const tmp = mkdtempSync(join(tmpdir(), "jsonld-baseline-"));
  if (!isZip) {
    const out = join(tmp, "baseline.json");
    writeFileSync(out, buf);
    return out;
  }
  // Extract zip and find the first JSON sidecar that looks like a coverage report.
  const zipPath = join(tmp, "artifact.zip");
  writeFileSync(zipPath, buf);
  try {
    execSync(`unzip -o -q ${JSON.stringify(zipPath)} -d ${JSON.stringify(tmp)}`, { stdio: "pipe" });
  } catch (e) {
    console.error(`✖ failed to unzip artifact: ${(e as Error).message}. Is \`unzip\` installed?`);
    process.exit(2);
  }
  const candidates = execSync(`find ${JSON.stringify(tmp)} -type f -name "*.json"`, { encoding: "utf8" })
    .split("\n").filter(Boolean);
  for (const f of candidates) {
    try {
      const j = JSON.parse(readFileSync(f, "utf8"));
      if (Array.isArray(j?.rows)) return f;
    } catch { /* skip */ }
  }
  console.error(`✖ no coverage JSON sidecar (with "rows" array) found inside artifact ${url}`);
  process.exit(2);
}

if (BASELINE_URL) {
  console.log(`Fetching baseline from ${BASELINE_URL} …`);
  BASELINE_PATH = await fetchBaselineUrl(BASELINE_URL);
  console.log(`Baseline resolved to ${BASELINE_PATH}`);
}


type StatusKind = "ok" | "missing-types" | "bad-blocks" | "unresolved";
function rowStatus(r: Pick<Row, "missingTypes" | "badBlocks" | "routePath">): StatusKind {
  if (!r.routePath) return "unresolved";
  if (r.missingTypes.length > 0) return "missing-types";
  if (r.badBlocks.length > 0) return "bad-blocks";
  return "ok";
}
function badBlockKey(b: Row["badBlocks"][number]): string {
  // file:line:type:contextOk:missing — uniquely identifies a bad-block report.
  return `${b.file}:${b.line}:${b.type ?? "?"}:${b.contextOk ? 1 : 0}:${[...b.missing].sort().join(",")}`;
}

interface BaselineRow {
  url: string; kind?: string;
  missingTypes?: string[];
  badBlocks?: Row["badBlocks"];
  routePath?: string | null;
  component?: string | null;
  componentFile?: string | null;
}
interface RouteSnapshot {
  routePath: string | null;
  component: string | null;
  componentFile: string | null;
}
interface DiffEntry {
  url: string;
  kind: UrlExpectation["kind"];
  before: StatusKind;
  after: StatusKind;
  newMissingTypes: string[];     // present now, absent before
  fixedMissingTypes: string[];   // absent now, present before
  newBadBlocks: Row["badBlocks"];
  fixedBadBlocks: Row["badBlocks"];
  route: { before: RouteSnapshot; after: RouteSnapshot; changed: boolean };
}

let BASELINE_META: { generatedAt?: string; rowCount: number } | null = null;
let DIFF: {
  regressions: DiffEntry[];   // got worse (ok→fail OR more missing/bad than before)
  fixes: DiffEntry[];         // got better
  changedSameStatus: DiffEntry[]; // status unchanged but missing/bad set differs
  added: Row[];               // URL exists now, not in baseline
  removed: BaselineRow[];     // URL existed in baseline, gone now
} | null = null;

if (BASELINE_PATH) {
  if (!existsSync(BASELINE_PATH)) {
    console.error(`✖ baseline not found: ${BASELINE_PATH}`);
    process.exit(2);
  }
  let baseRaw: unknown;
  try { baseRaw = JSON.parse(readFileSync(BASELINE_PATH, "utf8")); }
  catch (e) { console.error(`✖ baseline JSON parse error: ${(e as Error).message}`); process.exit(2); }
  const obj = baseRaw as { generatedAt?: string; rows?: BaselineRow[] };
  const baseRows: BaselineRow[] = Array.isArray(obj?.rows) ? obj.rows : [];
  BASELINE_META = { generatedAt: obj.generatedAt, rowCount: baseRows.length };

  const baseByUrl = new Map(baseRows.map((r) => [r.url, r]));
  const nowByUrl = new Map(ROWS.map((r) => [r.url, r]));

  const regressions: DiffEntry[] = [];
  const fixes: DiffEntry[] = [];
  const changedSameStatus: DiffEntry[] = [];
  const added: Row[] = [];
  const removed: BaselineRow[] = [];

  for (const cur of ROWS) {
    const prev = baseByUrl.get(cur.url);
    if (!prev) { added.push(cur); continue; }
    const beforeMissing = new Set(prev.missingTypes ?? []);
    const afterMissing = new Set(cur.missingTypes);
    const beforeBlocks = new Map((prev.badBlocks ?? []).map((b) => [badBlockKey(b), b]));
    const afterBlocks = new Map(cur.badBlocks.map((b) => [badBlockKey(b), b]));
    const newMissingTypes = [...afterMissing].filter((t) => !beforeMissing.has(t));
    const fixedMissingTypes = [...beforeMissing].filter((t) => !afterMissing.has(t));
    const newBadBlocks = [...afterBlocks].filter(([k]) => !beforeBlocks.has(k)).map(([, v]) => v);
    const fixedBadBlocks = [...beforeBlocks].filter(([k]) => !afterBlocks.has(k)).map(([, v]) => v);
    const before = rowStatus({
      missingTypes: prev.missingTypes ?? [],
      badBlocks: prev.badBlocks ?? [],
      routePath: prev.routePath ?? "x",
    });
    const after = rowStatus(cur);
    const beforeRoute: RouteSnapshot = {
      routePath: prev.routePath ?? null,
      component: prev.component ?? null,
      componentFile: prev.componentFile ?? null,
    };
    const afterRoute: RouteSnapshot = {
      routePath: cur.routePath, component: cur.component, componentFile: cur.componentFile,
    };
    const routeChanged =
      beforeRoute.routePath !== afterRoute.routePath ||
      beforeRoute.component !== afterRoute.component ||
      beforeRoute.componentFile !== afterRoute.componentFile;
    const entry: DiffEntry = {
      url: cur.url, kind: cur.kind,
      before, after,
      newMissingTypes, fixedMissingTypes, newBadBlocks, fixedBadBlocks,
      route: { before: beforeRoute, after: afterRoute, changed: routeChanged },
    };
    const worse = (before === "ok" && after !== "ok") || newMissingTypes.length > 0 || newBadBlocks.length > 0;
    const better = (before !== "ok" && after === "ok") || (fixedMissingTypes.length > 0 && newMissingTypes.length === 0 && newBadBlocks.length === 0) || (fixedBadBlocks.length > 0 && newBadBlocks.length === 0 && newMissingTypes.length === 0);
    if (worse) regressions.push(entry);
    else if (better) fixes.push(entry);
    else if (newMissingTypes.length || fixedMissingTypes.length || newBadBlocks.length || fixedBadBlocks.length || before !== after || routeChanged) {
      changedSameStatus.push(entry);
    }
  }
  for (const prev of baseRows) {
    if (!nowByUrl.has(prev.url)) removed.push(prev);
  }

  DIFF = { regressions, fixes, changedSameStatus, added, removed };
}


const total = ROWS.length;
const failingTypes = ROWS.filter((r) => r.missingTypes.length > 0);
const failingBlocks = ROWS.filter((r) => r.badBlocks.length > 0);
const unresolved = ROWS.filter((r) => !r.routePath);
const passing = ROWS.filter((r) => r.missingTypes.length === 0 && r.badBlocks.length === 0 && r.routePath);

function fmtList(xs: string[]): string {
  return xs.length ? xs.map((x) => `\`${x}\``).join(", ") : "—";
}
/** Per-@type missing-required summary, e.g. `Course`: name, description; `FAQPage`: mainEntity. */
function fmtMissingProps(r: Row, sep = "; "): string {
  // Aggregate missing props across all bad blocks of the same @type for this URL.
  const byType = new Map<string, Set<string>>();
  for (const b of r.badBlocks) {
    if (!b.type || b.missing.length === 0) continue;
    const set = byType.get(b.type) ?? new Set<string>();
    b.missing.forEach((p) => set.add(p));
    byType.set(b.type, set);
  }
  if (byType.size === 0) return "—";
  return [...byType.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([t, set]) => `\`${t}\`: ${[...set].sort().map((p) => `\`${p}\``).join(", ")}`)
    .join(sep);
}
function fmtMissingPropsHtml(r: Row): string {
  const byType = new Map<string, Set<string>>();
  for (const b of r.badBlocks) {
    if (!b.type || b.missing.length === 0) continue;
    const set = byType.get(b.type) ?? new Set<string>();
    b.missing.forEach((p) => set.add(p));
    byType.set(b.type, set);
  }
  if (byType.size === 0) return "—";
  return [...byType.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([t, set]) =>
      `<code>${esc(t)}</code>: ${[...set].sort().map((p) => `<code>${esc(p)}</code>`).join(", ")}`
    )
    .join("<br>");
}
function statusOf(r: Row): string {
  if (!r.routePath) return "⚠️ unresolved";
  if (r.missingTypes.length || r.badBlocks.length) return "❌ fail";
  return "✅ ok";
}

const groupOrder: UrlExpectation["kind"][] = ["home", "section", "topic", "viva", "drug", "utility"];
const groupLabels: Record<UrlExpectation["kind"], string> = {
  home: "Home", section: "Section landings", topic: "Topic pages",
  viva: "Viva", drug: "Drug pages", utility: "Utility pages",
};

let md = "";
md += "# JSON-LD Route-to-URL Coverage Report\n\n";
md += `Generated: ${new Date().toISOString()}\n\n`;
if (FILTER_DESCRIPTION) {
  md += `> **Filtered view** — ${FILTER_DESCRIPTION} _(${ROWS.length} of ${ALL_ROWS.length} URLs)_\n\n`;
}
md += "## Summary\n\n";
md += `| Metric | Count |\n|---|---:|\n`;
md += `| URLs evaluated${FILTER_DESCRIPTION ? " (filtered)" : ""} | ${total}${FILTER_DESCRIPTION ? ` / ${ALL_ROWS.length}` : ""} |\n`;
md += `| ✅ Passing | ${passing.length} |\n`;
md += `| ❌ Missing required @type | ${failingTypes.length} |\n`;
md += `| ❌ Bad / incomplete blocks | ${failingBlocks.length} |\n`;
md += `| ⚠️ Unresolved route | ${unresolved.length} |\n`;
if (DIFF) {
  md += `| 🔻 Regressions vs baseline | ${DIFF.regressions.length} |\n`;
  md += `| 🟢 Fixes vs baseline | ${DIFF.fixes.length} |\n`;
  md += `| ➕ Added URLs | ${DIFF.added.length} |\n`;
  md += `| ➖ Removed URLs | ${DIFF.removed.length} |\n`;
}
md += "\n";
md += `Sitewide @types inherited from \`index.html\`: ${[...SITEWIDE].map((t) => `\`${t}\``).join(", ")}.\n\n`;

if (DIFF) {
  md += "## Diff vs baseline\n\n";
  md += `Baseline: \`${BASELINE_PATH}\`${BASELINE_META?.generatedAt ? ` (generated ${BASELINE_META.generatedAt})` : ""} — ${BASELINE_META?.rowCount ?? 0} rows.\n\n`;

  const fmtRoute = (s: RouteSnapshot): string => {
    const path = s.routePath ? `\`${s.routePath}\`` : "_(unresolved)_";
    const comp = s.component ? ` → \`${s.component}\`` : "";
    const file = s.componentFile ? ` (\`${s.componentFile}\`)` : "";
    return `${path}${comp}${file}`;
  };
  const renderEntry = (e: DiffEntry): string => {
    const bits: string[] = [`\`${e.url}\` _(${e.kind})_ — \`${e.before}\` → \`${e.after}\``];
    if (e.route.changed) {
      bits.push(`route: ${fmtRoute(e.route.before)} → ${fmtRoute(e.route.after)}`);
    } else {
      bits.push(`route: ${fmtRoute(e.route.after)}`);
    }
    if (e.newMissingTypes.length) bits.push(`new missing @type: ${e.newMissingTypes.map((t) => `\`${t}\``).join(", ")}`);
    if (e.fixedMissingTypes.length) bits.push(`fixed @type: ${e.fixedMissingTypes.map((t) => `\`${t}\``).join(", ")}`);
    if (e.newBadBlocks.length) {
      bits.push(`new bad blocks: ${e.newBadBlocks.map((b) => `\`${b.file}:${b.line}\` (\`${b.type ?? "?"}\`${b.missing.length ? ` missing ${b.missing.map((p) => `\`${p}\``).join(",")}` : ""})`).join("; ")}`);
    }
    if (e.fixedBadBlocks.length) {
      bits.push(`fixed bad blocks: ${e.fixedBadBlocks.map((b) => `\`${b.file}:${b.line}\` (\`${b.type ?? "?"}\`)`).join("; ")}`);
    }
    return `- ${bits.join(" — ")}`;
  };

  function renderFlat(list: DiffEntry[], title: string, emptyMsg: string) {
    md += `### ${title} (${list.length})\n\n`;
    if (!list.length) md += `_${emptyMsg}_\n\n`;
    else { for (const e of list) md += renderEntry(e) + "\n"; md += "\n"; }
  }

  function renderGrouped(list: DiffEntry[], title: string, emptyMsg: string) {
    md += `### ${title} (${list.length})\n\n`;
    if (!list.length) { md += `_${emptyMsg}_\n\n`; return; }
    for (const k of groupOrder) {
      const g = list.filter((e) => e.kind === k);
      if (!g.length) continue;
      md += `#### ${groupLabels[k]} (${g.length})\n\n`;
      for (const e of g) md += renderEntry(e) + "\n";
      md += "\n";
    }
  }

  const renderDiff = DIFF_GROUP_BY_KIND ? renderGrouped : renderFlat;

  renderDiff(DIFF.regressions, "🔻 Regressions", "None — no URL newly started failing.");
  renderDiff(DIFF.fixes, "🟢 Fixes", "None.");

  if (DIFF.changedSameStatus.length) {
    renderDiff(DIFF.changedSameStatus, "🔄 Changed (same status, different details)", "None.");
  }

  if (DIFF.added.length) {
    md += `### ➕ Added URLs (${DIFF.added.length})\n\n`;
    for (const r of DIFF.added) md += `- \`${r.url}\` _(${r.kind})_ — status \`${rowStatus(r)}\`\n`;
    md += "\n";
  }
  if (DIFF.removed.length) {
    md += `### ➖ Removed URLs (${DIFF.removed.length})\n\n`;
    for (const r of DIFF.removed) md += `- \`${r.url}\`\n`;
    md += "\n";
  }
}

if (DIFF_ONLY) {
  // Skip the per-group tables and bad-block / unresolved sections when the
  // user only wants the diff.
} else for (const k of groupOrder) {
  const group = ROWS.filter((r) => r.kind === k);
  if (!group.length) continue;
  md += `## ${groupLabels[k]} (${group.length})\n\n`;
  md += "| Status | URL | Expected | Detected | Missing @type | Missing properties (per @type) | Component |\n";
  md += "|---|---|---|---|---|---|---|\n";
  for (const r of group) {
    md +=
      `| ${statusOf(r)} | \`${r.url}\` | ${fmtList(r.expected)} | ${fmtList(r.detected)} | ${fmtList(r.missingTypes)} | ${fmtMissingProps(r)} | ${r.component ?? "—"} |\n`;
  }
  md += "\n";
}

if (!DIFF_ONLY && failingBlocks.length) {
  md += "## Bad / incomplete JSON-LD blocks\n\n";
  for (const r of failingBlocks) {
    md += `### \`${r.url}\`\n\n`;
    for (const b of r.badBlocks) {
      const issues: string[] = [];
      if (!b.contextOk) issues.push("non-schema.org @context");
      if (b.missing.length) issues.push(`missing: ${b.missing.map((p) => `\`${p}\``).join(", ")}`);
      md += `- \`${b.file}:${b.line}\` — @type \`${b.type}\` — ${issues.join("; ")}\n`;
    }
    md += "\n";
  }
}

if (!DIFF_ONLY && unresolved.length) {
  md += "## ⚠️ URLs with no matching <Route> in App.tsx\n\n";
  for (const r of unresolved) md += `- \`${r.url}\`\n`;
  md += "\n";
}

// ── render HTML ───────────────────────────────────────────────────────────
function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function htmlList(xs: string[]): string {
  return xs.length ? xs.map((x) => `<code>${esc(x)}</code>`).join(", ") : "—";
}
let html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>JSON-LD Route-to-URL Coverage</title>
<style>
  :root { color-scheme: light dark; }
  body { font: 14px/1.5 -apple-system, system-ui, sans-serif; max-width: 1200px; margin: 2rem auto; padding: 0 1rem; }
  h1 { font-size: 1.6rem; margin-bottom: .25rem; }
  h2 { margin-top: 2rem; border-bottom: 1px solid #8884; padding-bottom: .25rem; }
  table { border-collapse: collapse; width: 100%; margin: .5rem 0 1.5rem; }
  th, td { border: 1px solid #8884; padding: .35rem .5rem; text-align: left; vertical-align: top; }
  th { background: #8881; }
  code { background: #8882; padding: 1px 4px; border-radius: 3px; font-size: 0.92em; }
  .ok { color: #2a8a3a; font-weight: 600; }
  .fail { color: #c0392b; font-weight: 600; }
  .warn { color: #b58900; font-weight: 600; }
  .summary td:last-child { text-align: right; font-variant-numeric: tabular-nums; }
  .meta { color: #888; font-size: 0.9em; }
</style>
</head>
<body>
<h1>JSON-LD Route-to-URL Coverage Report</h1>
<p class="meta">Generated ${esc(new Date().toISOString())}</p>
<h2>Summary</h2>
<table class="summary">
  <tr><td>URLs evaluated</td><td>${total}</td></tr>
  <tr><td><span class="ok">Passing</span></td><td>${passing.length}</td></tr>
  <tr><td><span class="fail">Missing required @type</span></td><td>${failingTypes.length}</td></tr>
  <tr><td><span class="fail">Bad / incomplete blocks</span></td><td>${failingBlocks.length}</td></tr>
  <tr><td><span class="warn">Unresolved route</span></td><td>${unresolved.length}</td></tr>
</table>
${FILTER_DESCRIPTION ? `<p><strong>Filtered view</strong> — ${esc(FILTER_DESCRIPTION)} (${ROWS.length} of ${ALL_ROWS.length} URLs)</p>` : ""}
<p>Sitewide @types inherited from <code>index.html</code>: ${[...SITEWIDE].map((t) => `<code>${esc(t)}</code>`).join(", ")}.</p>
`;
for (const k of groupOrder) {
  const group = ROWS.filter((r) => r.kind === k);
  if (!group.length) continue;
  html += `<h2>${esc(groupLabels[k])} (${group.length})</h2>`;
  html += `<table><thead><tr><th>Status</th><th>URL</th><th>Expected</th><th>Detected</th><th>Missing @type</th><th>Missing properties (per @type)</th><th>Component</th></tr></thead><tbody>`;
  for (const r of group) {
    const cls = !r.routePath ? "warn" : r.missingTypes.length || r.badBlocks.length ? "fail" : "ok";
    html += `<tr>
      <td><span class="${cls}">${esc(statusOf(r))}</span></td>
      <td><code>${esc(r.url)}</code></td>
      <td>${htmlList(r.expected)}</td>
      <td>${htmlList(r.detected)}</td>
      <td>${htmlList(r.missingTypes)}</td>
      <td>${fmtMissingPropsHtml(r)}</td>
      <td>${esc(r.component ?? "—")}</td>
    </tr>`;
  }
  html += `</tbody></table>`;
}
if (failingBlocks.length) {
  html += `<h2>Bad / incomplete JSON-LD blocks</h2>`;
  for (const r of failingBlocks) {
    html += `<h3><code>${esc(r.url)}</code></h3><ul>`;
    for (const b of r.badBlocks) {
      const issues: string[] = [];
      if (!b.contextOk) issues.push("non-schema.org @context");
      if (b.missing.length) issues.push(`missing: ${b.missing.map((p) => `<code>${esc(p)}</code>`).join(", ")}`);
      html += `<li><code>${esc(b.file)}:${b.line}</code> — @type <code>${esc(b.type ?? "?")}</code> — ${issues.join("; ")}</li>`;
    }
    html += `</ul>`;
  }
}
html += `</body></html>\n`;

// ── write outputs ─────────────────────────────────────────────────────────
function ensureDir(p: string) {
  const d = dirname(p);
  if (!existsSync(d)) mkdirSync(d, { recursive: true });
}
ensureDir(OUT_MD);
writeFileSync(OUT_MD, md, "utf8");
writeFileSync(OUT_HTML, html, "utf8");
writeFileSync(OUT_JSON, JSON.stringify({
  generatedAt: new Date().toISOString(),
  filter: FILTERS_ACTIVE ? {
    description: FILTER_DESCRIPTION,
    kinds: [...KIND_FILTER],
    urlPatterns: URL_PATTERNS.map((r) => r.source),
    urlPrefixes: URL_PREFIXES,
    invert: INVERT,
    matchedCount: ROWS.length,
    totalCount: ALL_ROWS.length,
  } : null,
  summary: {
    total, passing: passing.length,
    missingTypes: failingTypes.length,
    badBlocks: failingBlocks.length,
    unresolved: unresolved.length,
    regressions: DIFF?.regressions.length ?? 0,
    fixes: DIFF?.fixes.length ?? 0,
    addedUrls: DIFF?.added.length ?? 0,
    removedUrls: DIFF?.removed.length ?? 0,
  },
  baseline: DIFF ? {
    path: BASELINE_PATH,
    generatedAt: BASELINE_META?.generatedAt ?? null,
    rowCount: BASELINE_META?.rowCount ?? 0,
  } : null,
  diff: DIFF,
  rows: ROWS,
}, null, 2), "utf8");

// ── diff exports (CSV + JSON) ─────────────────────────────────────────────
if (DIFF) {
  const diffJson = {
    generatedAt: new Date().toISOString(),
    baseline: { path: BASELINE_PATH, generatedAt: BASELINE_META?.generatedAt ?? null },
    regressions: DIFF.regressions,
    fixes: DIFF.fixes,
    changed: DIFF.changedSameStatus,
    added: DIFF.added.map((r) => ({ url: r.url, kind: r.kind, status: rowStatus(r) })),
    removed: DIFF.removed,
  };
  writeFileSync(OUT_DIFF_JSON, JSON.stringify(diffJson, null, 2), "utf8");

  const csvLines: string[] = [
    "url,kind,category,before,after,routePathBefore,routePathAfter,componentBefore,componentAfter,componentFileBefore,componentFileAfter,routeChanged,newMissingTypes,fixedMissingTypes,newBadBlocksCount,newBadBlocks,fixedBadBlocksCount,fixedBadBlocks",
  ];
  const escCsv = (s: string) => `"${s.replace(/"/g, '""')}"`;
  const rowCsv = (
    url: string,
    kind: string,
    category: string,
    before: string,
    after: string,
    routeBefore: RouteSnapshot,
    routeAfter: RouteSnapshot,
    routeChanged: boolean,
    newMissing: string[],
    fixedMissing: string[],
    newBad: Row["badBlocks"],
    fixedBad: Row["badBlocks"],
  ) => {
    csvLines.push([
      escCsv(url),
      escCsv(kind),
      escCsv(category),
      escCsv(before),
      escCsv(after),
      escCsv(routeBefore.routePath ?? ""),
      escCsv(routeAfter.routePath ?? ""),
      escCsv(routeBefore.component ?? ""),
      escCsv(routeAfter.component ?? ""),
      escCsv(routeBefore.componentFile ?? ""),
      escCsv(routeAfter.componentFile ?? ""),
      routeChanged ? "true" : "false",
      escCsv(newMissing.join("; ")),
      escCsv(fixedMissing.join("; ")),
      String(newBad.length),
      escCsv(newBad.map((b) => `${b.file}:${b.line}(${b.type ?? "?"})`).join("; ")),
      String(fixedBad.length),
      escCsv(fixedBad.map((b) => `${b.file}:${b.line}(${b.type ?? "?"})`).join("; ")),
    ].join(","));
  };
  const emptySnap: RouteSnapshot = { routePath: null, component: null, componentFile: null };
  const snapOfRow = (r: Row): RouteSnapshot => ({ routePath: r.routePath, component: r.component, componentFile: r.componentFile });
  const snapOfBaseline = (r: BaselineRow): RouteSnapshot => ({ routePath: r.routePath ?? null, component: r.component ?? null, componentFile: r.componentFile ?? null });

  for (const e of DIFF.regressions) {
    rowCsv(e.url, e.kind, "regression", e.before, e.after, e.route.before, e.route.after, e.route.changed, e.newMissingTypes, e.fixedMissingTypes, e.newBadBlocks, e.fixedBadBlocks);
  }
  for (const e of DIFF.fixes) {
    rowCsv(e.url, e.kind, "fix", e.before, e.after, e.route.before, e.route.after, e.route.changed, e.newMissingTypes, e.fixedMissingTypes, e.newBadBlocks, e.fixedBadBlocks);
  }
  for (const e of DIFF.changedSameStatus) {
    rowCsv(e.url, e.kind, "changed", e.before, e.after, e.route.before, e.route.after, e.route.changed, e.newMissingTypes, e.fixedMissingTypes, e.newBadBlocks, e.fixedBadBlocks);
  }
  for (const r of DIFF.added) {
    rowCsv(r.url, r.kind, "added", "", rowStatus(r), emptySnap, snapOfRow(r), false, [], [], [], []);
  }
  for (const r of DIFF.removed) {
    rowCsv(r.url, r.kind ?? "", "removed", rowStatus({ missingTypes: r.missingTypes ?? [], badBlocks: r.badBlocks ?? [], routePath: r.routePath ?? "x" }), "", snapOfBaseline(r), emptySnap, false, [], [], [], []);
  }
  writeFileSync(OUT_DIFF_CSV, csvLines.join("\n") + "\n", "utf8");
}

// ── console summary ───────────────────────────────────────────────────────
console.log(`JSON-LD route-to-URL coverage:`);
console.log(`  URLs evaluated:        ${total}`);
console.log(`  ✅ passing:            ${passing.length}`);
console.log(`  ❌ missing @type:      ${failingTypes.length}`);
console.log(`  ❌ bad blocks:         ${failingBlocks.length}`);
console.log(`  ⚠️  unresolved routes: ${unresolved.length}`);
if (DIFF) {
  console.log(`  🔻 regressions:        ${DIFF.regressions.length}`);
  console.log(`  🟢 fixes:              ${DIFF.fixes.length}`);
  console.log(`  ➕ added urls:         ${DIFF.added.length}`);
  console.log(`  ➖ removed urls:       ${DIFF.removed.length}`);
}
const wroteFiles = [rel(OUT_MD), rel(OUT_HTML), rel(OUT_JSON)];
if (DIFF) { wroteFiles.push(rel(OUT_DIFF_JSON), rel(OUT_DIFF_CSV)); }
console.log(`Wrote ${wroteFiles.join(", ")}`);

const STRICT = process.env.JSONLD_COVERAGE_STRICT === "1";
if (STRICT && (failingTypes.length || failingBlocks.length || unresolved.length || (DIFF && DIFF.regressions.length))) {
  process.exitCode = 1;
}

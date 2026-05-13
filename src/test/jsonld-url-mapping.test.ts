import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync, existsSync } from "fs";
import { resolve, join, relative, dirname } from "path";

/**
 * Explicit route-to-URL JSON-LD validation.
 *
 * Parses src/App.tsx for every <Route path="..." element={<Component />}>
 * declaration, resolves the component to its source file (lazy() or static
 * import), and asserts that each real URL path serves the JSON-LD @type(s)
 * the URL pattern is expected to ship.
 *
 * URL pattern rules (URL-first, not file-first):
 *
 *   /                         → sitewide-only OK
 *   /<section>                → BreadcrumbList + Course (section landing)
 *   /<section>/<topic>        → BreadcrumbList + LearningResource (topic page)
 *   /viva/library             → FAQPage
 *   anything else             → sitewide-only OK
 *
 * Sitewide types (WebSite, Organization) are emitted by index.html and
 * inherited by every SPA route, so they don't need to be re-emitted.
 *
 * On failure under GITHUB_ACTIONS=true each violation is annotated as
 * `::error file=...,line=...,title=...::message` so the failure points at
 * the route declaration in App.tsx.
 */

const REPO_ROOT = process.cwd();
const SRC_ROOT = resolve("src");
const APP_TSX = resolve("src/App.tsx");
const IS_GITHUB_ACTIONS = process.env.GITHUB_ACTIONS === "true";
const SCHEMA_ORG = /^https?:\/\/schema\.org\/?$/;

const SECTION_SLUGS = new Set([
  "physics",
  "physiology",
  "pharmacology",
  "clinical",
  "intensive-care",
  "perioperative",
  "anatomy",
  "chemistry",
]);

const RICH_RESULT_REQUIRED: Record<string, string[]> = {
  WebSite: ["name", "url"],
  Organization: ["name", "url"],
  FAQPage: ["mainEntity"],
  BreadcrumbList: ["itemListElement"],
  Course: ["name", "description", "provider"],
  LearningResource: ["name"],
};

const SITEWIDE_TYPES = new Set(["WebSite", "Organization"]);

// ── annotation collector ──────────────────────────────────────────────────
interface Issue { file: string; line: number; title: string; message: string }
const issues: Issue[] = [];
const escAnn = (s: string) => s.replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
const escProp = (s: string) => escAnn(s).replace(/,/g, "%2C").replace(/:/g, "%3A");
function annotate(i: Issue) {
  issues.push(i);
  const out = IS_GITHUB_ACTIONS
    ? `::error file=${escProp(i.file)},line=${i.line},title=${escProp(i.title)}::${escAnn(i.message)}`
    : `[jsonld-url] ${i.file}:${i.line} — ${i.title}: ${i.message}`;
  // eslint-disable-next-line no-console
  console.log(out);
}
const rel = (p: string) => relative(REPO_ROOT, p) || p;
function lineOf(src: string, off: number): number {
  let l = 1;
  for (let i = 0; i < off && i < src.length; i++) if (src.charCodeAt(i) === 10) l++;
  return l;
}

// ── parse App.tsx route table ─────────────────────────────────────────────
interface RouteDecl {
  path: string;
  component: string;
  appLine: number;
  componentFile: string | null;
}

function parseRoutes(): RouteDecl[] {
  const src = readFileSync(APP_TSX, "utf8");

  // Map component name → import specifier.
  const importMap = new Map<string, string>();
  // const Foo = lazy(() => import("./pages/Foo"));
  const lazyRe = /const\s+([A-Za-z_$][\w$]*)\s*=\s*lazy\s*\(\s*\(\)\s*=>\s*import\(\s*["']([^"']+)["']\s*\)\s*\)/g;
  for (let m: RegExpExecArray | null; (m = lazyRe.exec(src)) !== null; ) {
    importMap.set(m[1], m[2]);
  }
  // import Foo from "./pages/Foo";
  const staticRe = /import\s+([A-Za-z_$][\w$]*)\s+from\s+["']([^"']+)["']/g;
  for (let m: RegExpExecArray | null; (m = staticRe.exec(src)) !== null; ) {
    if (!importMap.has(m[1])) importMap.set(m[1], m[2]);
  }
  // import { Foo, Bar as Baz } from "./x";
  const namedRe = /import\s*\{([^}]+)\}\s*from\s+["']([^"']+)["']/g;
  for (let m: RegExpExecArray | null; (m = namedRe.exec(src)) !== null; ) {
    const spec = m[2];
    for (const part of m[1].split(",")) {
      const local = part.trim().split(/\s+as\s+/).pop()?.trim();
      if (local && /^[A-Za-z_$][\w$]*$/.test(local) && !importMap.has(local)) {
        importMap.set(local, spec);
      }
    }
  }

  const routes: RouteDecl[] = [];
  const routeRe = /<Route\s+path=["']([^"']+)["'][^>]*element=\{\s*<\s*([A-Za-z_$][\w$]*)\b/g;
  for (let m: RegExpExecArray | null; (m = routeRe.exec(src)) !== null; ) {
    const [, path, component] = m;
    const spec = importMap.get(component);
    routes.push({
      path,
      component,
      appLine: lineOf(src, m.index),
      componentFile: spec ? resolveImport(APP_TSX, spec) : null,
    });
  }
  return routes;
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

// ── JSON-LD scanner (mirrors sibling tests) ───────────────────────────────
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

// ── 2-hop transitive import scan ──────────────────────────────────────────
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

// ── URL pattern → expected types ──────────────────────────────────────────
function expectedTypesFor(url: string): string[] {
  if (url === "/viva/library") return ["FAQPage"];
  const parts = url.split("/").filter(Boolean);
  if (parts.length === 1 && SECTION_SLUGS.has(parts[0])) {
    return ["BreadcrumbList", "Course"];
  }
  if (parts.length === 2 && SECTION_SLUGS.has(parts[0])) {
    return ["BreadcrumbList", "LearningResource"];
  }
  return [];
}

// ── build mapping ─────────────────────────────────────────────────────────
// Skip <Navigate> redirect routes — they have no JSON-LD of their own; the
// destination URL is exercised by its own <Route> entry.
const ROUTES = parseRoutes().filter((r) => r.component !== "Navigate");

interface UrlRow {
  url: string;
  appLine: number;
  component: string;
  file: string | null;
  expected: string[];
  detected: Set<string>;
  missing: string[];
  badBlocks: Block[];
}

function evaluate(r: RouteDecl): UrlRow {
  const expected = expectedTypesFor(r.path);
  const detected = new Set<string>();
  const badBlocks: Block[] = [];
  if (r.componentFile) {
    for (const f of reachable(r.componentFile, 2)) {
      for (const b of blocksOf(f)) {
        if (b.resolveError) continue;
        if (b.type) detected.add(b.type);
        if (b.type && (!b.contextOk || b.missing.length > 0)) badBlocks.push(b);
      }
    }
  }
  const effective = new Set([...detected, ...SITEWIDE_TYPES]);
  return {
    url: r.path,
    appLine: r.appLine,
    component: r.component,
    file: r.componentFile ? rel(r.componentFile) : null,
    expected,
    detected,
    missing: expected.filter((t) => !effective.has(t)),
    badBlocks,
  };
}

const URL_ROWS: UrlRow[] = ROUTES.map(evaluate);

// ── tests ─────────────────────────────────────────────────────────────────
describe("JSON-LD route-to-URL mapping", () => {
  it("App.tsx parsed at least one route", () => {
    expect(ROUTES.length, "no <Route path=...> declarations parsed from App.tsx")
      .toBeGreaterThan(0);
  });

  it("every concrete (non-param) route resolves to a component file", () => {
    const before = issues.length;
    for (const r of ROUTES) {
      if (r.path.includes(":") || r.path.includes("*")) continue;
      if (!r.componentFile) {
        annotate({
          file: rel(APP_TSX), line: r.appLine,
          title: `Cannot resolve route component`,
          message: `Route ${r.path} → <${r.component}/>: import specifier not found in App.tsx.`,
        });
      }
    }
    expect(issues.length).toBe(before);
  });

  // Group concrete URLs that have an expectation.
  const sectionUrls = URL_ROWS.filter(
    (r) => !r.url.includes(":") && r.expected.includes("Course"),
  );
  const topicUrls = URL_ROWS.filter(
    (r) => !r.url.includes(":") && r.expected.includes("LearningResource"),
  );
  const faqUrls = URL_ROWS.filter((r) => r.expected.includes("FAQPage"));

  it(`section landing URLs ship BreadcrumbList + Course (n=${sectionUrls.length})`, () => {
    expect(sectionUrls.length).toBeGreaterThan(0);
    const before = issues.length;
    for (const r of sectionUrls) checkRow(r);
    expect(issues.length).toBe(before);
  });

  it(`topic URLs ship BreadcrumbList + LearningResource (n=${topicUrls.length})`, () => {
    expect(topicUrls.length).toBeGreaterThan(0);
    const before = issues.length;
    for (const r of topicUrls) checkRow(r);
    expect(issues.length).toBe(before);
  });

  it(`FAQ URLs ship FAQPage (n=${faqUrls.length})`, () => {
    expect(faqUrls.length).toBeGreaterThan(0);
    const before = issues.length;
    for (const r of faqUrls) checkRow(r);
    expect(issues.length).toBe(before);
  });
});

function checkRow(r: UrlRow): void {
  if (r.missing.length > 0) {
    annotate({
      file: rel(APP_TSX), line: r.appLine,
      title: `URL ${r.url} missing required JSON-LD @type`,
      message: `Route ${r.url} (${r.component} → ${r.file ?? "<unresolved>"}) does not provide ${r.missing.join(", ")}. Detected: ${[...r.detected].join(", ") || "none"}.`,
    });
  }
  for (const b of r.badBlocks) {
    if (!b.contextOk) {
      annotate({
        file: rel(b.file), line: b.line,
        title: `JSON-LD bad @context on URL ${r.url}`,
        message: `Provider ${rel(b.file)} ships @type ${b.type} with non-schema.org @context for ${r.url}.`,
      });
    }
    if (b.missing.length > 0) {
      annotate({
        file: rel(b.file), line: b.line,
        title: `JSON-LD ${b.type} missing required ${b.missing.join(", ")} on URL ${r.url}`,
        message: `Provider ${rel(b.file)} ships @type ${b.type} for ${r.url} but is missing required Rich Results properties: ${b.missing.join(", ")}.`,
      });
    }
  }
}

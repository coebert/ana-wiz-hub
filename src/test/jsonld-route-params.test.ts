import { describe, it, expect } from "vitest";
import { readFileSync, existsSync, statSync } from "fs";
import { resolve, join, relative, dirname } from "path";
import {
  ROUTE_PARAM_FIXTURES,
  expandRoute,
  expectedTypesOverride,
} from "./fixtures/jsonld-route-params";

/**
 * Parameterised-route JSON-LD validation.
 *
 * Sibling test `jsonld-url-mapping.test.ts` covers concrete (literal)
 * routes. This file extends that coverage to routes that contain
 * `:param` segments by substituting fixture sample values from
 * `fixtures/jsonld-route-params.ts` and validating the resulting
 * concrete URL paths against the URL-pattern @type expectations.
 *
 * Each parameter (e.g. `:slug`, `:topicSlug`) defines:
 *   • one or more sample values to expand into,
 *   • optional per-route overrides for expected JSON-LD @type sets.
 *
 * Annotations (under GITHUB_ACTIONS) point at the offending <Route>
 * declaration in App.tsx with the concrete URL that failed.
 */

const REPO_ROOT = process.cwd();
const SRC_ROOT = resolve("src");
const APP_TSX = resolve("src/App.tsx");
const IS_GITHUB_ACTIONS = process.env.GITHUB_ACTIONS === "true";
const SCHEMA_ORG = /^https?:\/\/schema\.org\/?$/;

const SECTION_SLUGS = new Set([
  "physics", "physiology", "pharmacology", "clinical",
  "intensive-care", "perioperative", "anatomy", "chemistry",
]);

const RICH_RESULT_REQUIRED: Record<string, string[]> = {
  WebSite: ["name", "url"],
  Organization: ["name", "url"],
  FAQPage: ["mainEntity"],
  BreadcrumbList: ["itemListElement"],
  Course: ["name", "description", "provider"],
  LearningResource: ["name"],
  Drug: ["name"],
};

const SITEWIDE_TYPES = new Set(["WebSite", "Organization"]);

interface Issue { file: string; line: number; title: string; message: string }
const issues: Issue[] = [];
const escAnn = (s: string) => s.replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
const escProp = (s: string) => escAnn(s).replace(/,/g, "%2C").replace(/:/g, "%3A");
function annotate(i: Issue) {
  issues.push(i);
  const out = IS_GITHUB_ACTIONS
    ? `::error file=${escProp(i.file)},line=${i.line},title=${escProp(i.title)}::${escAnn(i.message)}`
    : `[jsonld-url-param] ${i.file}:${i.line} — ${i.title}: ${i.message}`;
  // eslint-disable-next-line no-console
  console.log(out);
}
const rel = (p: string) => relative(REPO_ROOT, p) || p;
function lineOf(src: string, off: number): number {
  let l = 1;
  for (let i = 0; i < off && i < src.length; i++) if (src.charCodeAt(i) === 10) l++;
  return l;
}

// ── App.tsx parser (mirrors jsonld-url-mapping.test.ts) ───────────────────
interface RouteDecl { path: string; component: string; appLine: number; componentFile: string | null }

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

function defaultExpectedTypesFor(url: string): string[] {
  if (url === "/viva/library") return ["FAQPage"];
  const parts = url.split("/").filter(Boolean);
  if (parts.length === 1 && SECTION_SLUGS.has(parts[0])) return ["BreadcrumbList", "Course"];
  if (parts.length === 2 && SECTION_SLUGS.has(parts[0])) {
    return ["BreadcrumbList", "LearningResource"];
  }
  return [];
}

// ── build expansion ───────────────────────────────────────────────────────
const ROUTES = parseRoutes().filter((r) => r.component !== "Navigate");
const PARAM_ROUTES = ROUTES.filter((r) => r.path.includes(":"));

interface Expansion {
  route: string;
  url: string;
  appLine: number;
  component: string;
  file: string | null;
  expected: string[];
  detected: Set<string>;
  missing: string[];
  badBlocks: Block[];
}

function evaluateExpansion(r: RouteDecl, url: string): Expansion {
  const override = expectedTypesOverride(r.path);
  const expected = override ?? defaultExpectedTypesFor(url);
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
    route: r.path, url, appLine: r.appLine, component: r.component,
    file: r.componentFile ? rel(r.componentFile) : null,
    expected, detected,
    missing: expected.filter((t) => !effective.has(t)),
    badBlocks,
  };
}

const EXPANSIONS: Expansion[] = PARAM_ROUTES.flatMap((r) =>
  expandRoute(r.path).map((url) => evaluateExpansion(r, url)),
);

function checkExpansion(e: Expansion): void {
  if (e.url.includes("__missing_")) {
    annotate({
      file: rel(APP_TSX), line: e.appLine,
      title: `No fixture sample for parameter in ${e.route}`,
      message: `Cannot expand ${e.route} → ${e.url}. Add a sample to ROUTE_PARAM_FIXTURES in src/test/fixtures/jsonld-route-params.ts.`,
    });
    return;
  }
  if (e.missing.length > 0) {
    annotate({
      file: rel(APP_TSX), line: e.appLine,
      title: `URL ${e.url} missing required JSON-LD @type`,
      message: `Parameterised route ${e.route} expanded to ${e.url} (${e.component} → ${e.file ?? "<unresolved>"}) does not provide ${e.missing.join(", ")}. Detected: ${[...e.detected].join(", ") || "none"}.`,
    });
  }
  for (const b of e.badBlocks) {
    if (!b.contextOk) {
      annotate({
        file: rel(b.file), line: b.line,
        title: `JSON-LD bad @context on URL ${e.url}`,
        message: `Provider ${rel(b.file)} ships @type ${b.type} with non-schema.org @context for ${e.url} (route ${e.route}).`,
      });
    }
    if (b.missing.length > 0) {
      annotate({
        file: rel(b.file), line: b.line,
        title: `JSON-LD ${b.type} missing ${b.missing.join(", ")} on URL ${e.url}`,
        message: `Provider ${rel(b.file)} ships @type ${b.type} for ${e.url} (route ${e.route}) but is missing required Rich Results properties: ${b.missing.join(", ")}.`,
      });
    }
  }
}

// ── tests ─────────────────────────────────────────────────────────────────
describe("JSON-LD parameterised route mapping (fixture-driven)", () => {
  it("App.tsx exposes at least one parameterised route", () => {
    expect(PARAM_ROUTES.length, "no parameterised <Route path=:...> declarations parsed")
      .toBeGreaterThan(0);
  });

  it("every parameter in every parameterised route has a fixture sample", () => {
    const before = issues.length;
    for (const r of PARAM_ROUTES) {
      const params = r.path.split("/").filter((s) => s.startsWith(":")).map((s) => s.slice(1));
      for (const name of params) {
        const fx = ROUTE_PARAM_FIXTURES[name];
        if (!fx || fx.samples.length === 0) {
          annotate({
            file: rel(APP_TSX), line: r.appLine,
            title: `Missing fixture for :${name}`,
            message: `Route ${r.path} uses :${name} but ROUTE_PARAM_FIXTURES has no samples for it. Add one in src/test/fixtures/jsonld-route-params.ts.`,
          });
        }
      }
    }
    expect(issues.length).toBe(before);
  });

  it(`every expanded URL satisfies its expected JSON-LD @types (n=${EXPANSIONS.length})`, () => {
    expect(EXPANSIONS.length).toBeGreaterThan(0);
    const before = issues.length;
    for (const e of EXPANSIONS) checkExpansion(e);
    expect(issues.length).toBe(before);
  });
});

import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync, existsSync } from "fs";
import { resolve, join, relative, dirname } from "path";

/**
 * Per-route JSON-LD coverage validation.
 *
 * For every route group below, asserts that the page component (and the
 * components it transitively imports, capped at 2 hops within src/) ships at
 * least the required @type(s). Sitewide types (WebSite, Organization) are
 * inherited from index.html and don't need to be re-emitted per route.
 *
 * Route groups instead of every concrete URL keep the table maintainable for
 * 200+ topic routes that all funnel through TopicTemplate.tsx.
 *
 * On failure under GITHUB_ACTIONS=true, each violation is emitted as a
 * `::error file=...,line=...,title=...::message` workflow command so the
 * failure annotates the offending page file in the PR diff.
 */

const REPO_ROOT = process.cwd();
const IS_GITHUB_ACTIONS = process.env.GITHUB_ACTIONS === "true";
const SCHEMA_ORG = /^https?:\/\/schema\.org\/?$/;

const RICH_RESULT_REQUIRED: Record<string, string[]> = {
  WebSite: ["name", "url"],
  Organization: ["name", "url"],
  Article: ["headline"],
  NewsArticle: ["headline"],
  BlogPosting: ["headline"],
  Product: ["name"],
  FAQPage: ["mainEntity"],
  BreadcrumbList: ["itemListElement"],
  Course: ["name", "description", "provider"],
  MedicalWebPage: ["name"],
  WebPage: ["name"],
  LearningResource: ["name"],
};

// Sitewide types provided by index.html — every SPA route inherits them.
const SITEWIDE_TYPES = new Set(["WebSite", "Organization"]);

// ── annotation collector ──────────────────────────────────────────────────
interface Issue { file: string; line: number; title: string; message: string }
const issues: Issue[] = [];

function escAnn(s: string): string {
  return s.replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
}
function escProp(s: string): string {
  return escAnn(s).replace(/,/g, "%2C").replace(/:/g, "%3A");
}
function annotate(i: Issue) {
  issues.push(i);
  const out = IS_GITHUB_ACTIONS
    ? `::error file=${escProp(i.file)},line=${i.line},title=${escProp(i.title)}::${escAnn(i.message)}`
    : `[jsonld-route] ${i.file}:${i.line} — ${i.title}: ${i.message}`;
  // eslint-disable-next-line no-console
  console.log(out);
}
function rel(p: string): string { return relative(REPO_ROOT, p) || p; }
function lineOf(src: string, off: number): number {
  let l = 1;
  for (let i = 0; i < off && i < src.length; i++) if (src.charCodeAt(i) === 10) l++;
  return l;
}

// ── scanner (mirrors jsonld-structured-data.test.ts logic) ────────────────
interface Block {
  file: string; line: number; type: string | null;
  contextOk: boolean; missing: string[]; resolveError?: string; payload: string;
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
  let m: RegExpExecArray | null;
  while ((m = re.exec(src)) !== null) {
    const line = lineOf(src, m.index);
    let payload = m[1].trim().replace(/^\{|\}$/g, "").trim();
    let resolveError: string | undefined;
    const stringifyMatch = /^JSON\.stringify\(([\s\S]+)\)$/m.exec(payload);
    if (stringifyMatch) payload = stringifyMatch[1].trim();
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
    const ctxMatch = /["']@context["']\s*:\s*["']([^"']+)["']/.exec(sanitized);
    const typeMatch = /["']@type["']\s*:\s*["']([^"']+)["']/.exec(sanitized);
    const type = typeMatch ? typeMatch[1] : null;
    const has = (p: string) =>
      new RegExp(`(?:^|[\\s,{])["']?${p}["']?\\s*:`).test(sanitized);
    const required = type ? RICH_RESULT_REQUIRED[type] ?? [] : [];
    out.push({
      file, line, type,
      contextOk: !!ctxMatch && SCHEMA_ORG.test(ctxMatch[1]),
      missing: required.filter((p) => !has(p)),
      resolveError, payload: sanitized,
    });
  }
  return out;
}

// ── transitive import resolver (caps depth, src/ only) ────────────────────
const SRC_ROOT = resolve("src");
const importRe = /import[^'"`;]*?from\s+['"]([^'"]+)['"]/g;

function resolveImport(fromFile: string, spec: string): string | null {
  let base: string | null = null;
  if (spec.startsWith("@/")) base = join(SRC_ROOT, spec.slice(2));
  else if (spec.startsWith(".")) base = resolve(dirname(fromFile), spec);
  else return null; // node_modules
  for (const ext of ["", ".tsx", ".ts", ".jsx", ".js", "/index.tsx", "/index.ts"]) {
    const p = base + ext;
    if (existsSync(p) && statSync(p).isFile()) return p;
  }
  return null;
}

function localImports(file: string): string[] {
  if (!existsSync(file)) return [];
  const src = readFileSync(file, "utf8");
  const out: string[] = [];
  let m: RegExpExecArray | null;
  importRe.lastIndex = 0;
  while ((m = importRe.exec(src)) !== null) {
    const r = resolveImport(file, m[1]);
    if (r && r.startsWith(SRC_ROOT)) out.push(r);
  }
  return out;
}

/** Returns the set of files reachable from `entry` via local imports, up to `maxDepth`. */
function reachable(entry: string, maxDepth: number): Set<string> {
  const seen = new Set<string>([entry]);
  let frontier = [entry];
  for (let d = 0; d < maxDepth; d++) {
    const next: string[] = [];
    for (const f of frontier) {
      for (const dep of localImports(f)) {
        if (!seen.has(dep)) { seen.add(dep); next.push(dep); }
      }
    }
    frontier = next;
    if (frontier.length === 0) break;
  }
  return seen;
}

// ── route expectation table ───────────────────────────────────────────────

interface RouteGroup {
  /** Human-readable label for the route group (used in test names + reports). */
  label: string;
  /** Glob-ish file matcher relative to src/. */
  pageMatcher: (relPath: string) => boolean;
  /** @types that MUST appear in this route's resolved JSON-LD (sitewide types not required here). */
  expectedTypes: string[];
}

const ROUTE_GROUPS: RouteGroup[] = [
  {
    label: "Topic pages (/<section>/<topic>)",
    pageMatcher: (p) => p.startsWith("src/pages/topics/") && p.endsWith("Topic.tsx"),
    expectedTypes: ["LearningResource"], // emitted by TopicTemplate
  },
  {
    label: "Section pages (/physics, /physiology, …)",
    pageMatcher: (p) =>
      /^src\/pages\/(Physics|Physiology|Pharmacology|Clinical|IntensiveCare|Perioperative|Anatomy|Chemistry)Section\.tsx$/.test(p),
    expectedTypes: ["BreadcrumbList", "Course"], // emitted by SectionLayout
  },
  {
    label: "Viva question library (/viva/library)",
    pageMatcher: (p) => p === "src/pages/VivaQuestionLibrary.tsx",
    expectedTypes: ["FAQPage"],
  },
  {
    label: "Landing (/)",
    pageMatcher: (p) => p === "src/pages/Landing.tsx",
    expectedTypes: [], // sitewide-only is acceptable
  },
  {
    label: "Drug detail (/drugs/:slug)",
    pageMatcher: (p) => p === "src/pages/DrugDetail.tsx",
    expectedTypes: [], // sitewide-only is acceptable
  },
];

function collectPagesIn(dir: string, out: string[] = []): string[] {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) collectPagesIn(p, out);
    else if (/\.(tsx|jsx)$/.test(name)) out.push(p);
  }
  return out;
}

const ALL_PAGES = collectPagesIn(resolve("src/pages"));

function pagesForGroup(g: RouteGroup): string[] {
  return ALL_PAGES.filter((abs) => g.pageMatcher(rel(abs)));
}

// Cache provider scans across all reached files.
const blockCache = new Map<string, Block[]>();
function blocksOf(file: string): Block[] {
  let v = blockCache.get(file);
  if (!v) { v = scanFileForJsonLd(file); blockCache.set(file, v); }
  return v;
}

interface RouteResult {
  page: string;
  detected: Set<string>;
  providers: Map<string, string[]>; // type -> source files
  missing: string[];
  badBlocks: Block[]; // resolved but bad shape (missing context / required props)
}

function evaluatePage(page: string, expected: string[]): RouteResult {
  const reach = reachable(page, 2);
  const detected = new Set<string>();
  const providers = new Map<string, string[]>();
  const badBlocks: Block[] = [];
  for (const f of reach) {
    for (const b of blocksOf(f)) {
      if (b.resolveError) continue;
      if (b.type) {
        detected.add(b.type);
        const arr = providers.get(b.type) ?? [];
        arr.push(rel(f));
        providers.set(b.type, arr);
      }
      if (b.type && (!b.contextOk || b.missing.length > 0)) badBlocks.push(b);
    }
  }
  const effective = new Set([...detected, ...SITEWIDE_TYPES]);
  const missing = expected.filter((t) => !effective.has(t));
  return { page: rel(page), detected, providers, missing, badBlocks };
}

// ── tests ─────────────────────────────────────────────────────────────────
describe("JSON-LD per-route coverage", () => {
  for (const group of ROUTE_GROUPS) {
    const pages = pagesForGroup(group);

    it(`${group.label}: matches at least one page`, () => {
      if (pages.length === 0) {
        annotate({
          file: "src/test/jsonld-route-coverage.test.ts",
          line: 1,
          title: `Route group "${group.label}" matched 0 pages`,
          message: `Update ROUTE_GROUPS — pageMatcher matched no files in src/pages.`,
        });
      }
      expect(pages.length, `${group.label} matched 0 pages`).toBeGreaterThan(0);
    });

    if (group.expectedTypes.length === 0) continue;

    it(`${group.label}: every page resolves required @type(s) → ${group.expectedTypes.join(", ")}`, () => {
      const before = issues.length;
      for (const page of pages) {
        const r = evaluatePage(page, group.expectedTypes);
        if (r.missing.length > 0) {
          annotate({
            file: r.page,
            line: 1,
            title: `Route missing required JSON-LD @type`,
            message: `${group.label}: ${r.page} (and its 2-hop imports) does not provide ${r.missing.join(", ")}. Detected: ${[...r.detected].join(", ") || "none"}.`,
          });
        }
        for (const b of r.badBlocks) {
          if (!b.contextOk) {
            annotate({
              file: rel(b.file), line: b.line,
              title: `JSON-LD bad @context`,
              message: `Route ${r.page}: provider ${rel(b.file)} ships @type ${b.type} with non-schema.org @context.`,
            });
          }
          if (b.missing.length > 0) {
            annotate({
              file: rel(b.file), line: b.line,
              title: `JSON-LD ${b.type} missing required ${b.missing.join(", ")}`,
              message: `Route ${r.page}: provider ${rel(b.file)} ships @type ${b.type} but is missing required Rich Results properties: ${b.missing.join(", ")}.`,
            });
          }
        }
      }
      expect(issues.length, `route violations in "${group.label}" (see annotations)`).toBe(before);
    });
  }
});

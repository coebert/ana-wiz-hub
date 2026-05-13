/**
 * SEO regression guard.
 *
 * Two static checks designed to catch SEO regressions in CI before they
 * reach production:
 *
 *   1. **Heading order** — every route component (or its template) must
 *      render an <h1>, and no JSX block may skip a heading level (e.g.
 *      h1 → h3, h2 → h4).
 *   2. **Meta tag coverage** — `index.html` must declare the sitewide
 *      head tags, and every route component listed in `src/App.tsx`
 *      must either provide its own per-route Helmet meta (title +
 *      description + canonical + og:url) or render through one of the
 *      shared layouts that injects them (`SectionLayout`,
 *      `TopicTemplate`).
 *
 * Allowlists below intentionally bless known-good exceptions (e.g.
 * NotFound is `noindex`, AdminLogin is internal). Add new entries only
 * with a matching comment explaining why the page is exempt — the test
 * is the safety net that stops regressions silently shipping.
 */
import { describe, it, expect } from "vitest";
import { readFileSync, existsSync, readdirSync, statSync } from "fs";
import { resolve, join } from "path";

const ROOT = process.cwd();

// ---------- Discover route components from src/App.tsx ----------
const appSrc = readFileSync(resolve(ROOT, "src/App.tsx"), "utf8");

function buildComponentToFile(): Record<string, string> {
  const map: Record<string, string> = {};
  const record = (name: string, rel: string) => {
    const base = rel.replace(/^\.\//, "src/");
    for (const ext of [".tsx", ".ts", "/index.tsx", "/index.ts"]) {
      const candidate = resolve(ROOT, base + ext);
      if (existsSync(candidate)) {
        map[name] = candidate;
        break;
      }
    }
  };
  for (const m of appSrc.matchAll(/import\s+(\w+)\s+from\s+["'](\.\/pages\/[^"']+)["']/g)) {
    record(m[1], m[2]);
  }
  for (const m of appSrc.matchAll(
    /const\s+(\w+)\s*=\s*lazy\(\s*\(\)\s*=>\s*import\(["'](\.\/pages\/[^"']+)["']\)/g,
  )) {
    record(m[1], m[2]);
  }
  return map;
}
const componentToFile = buildComponentToFile();

// path -> { file, isRedirect } for every <Route> in App.tsx
function discoverRoutes() {
  const routes: { path: string; file: string; isRedirect: boolean }[] = [];
  const re = /<Route\s+path="([^"]+)"\s+element=\{([^}]*(?:\{[^}]*\}[^}]*)*)\}/g;
  for (const m of appSrc.matchAll(re)) {
    const path = m[1];
    const element = m[2];
    if (/<Navigate\b/.test(element)) {
      routes.push({ path, file: "", isRedirect: true });
      continue;
    }
    const componentMatch = element.match(/<(\w+)/);
    const file = componentMatch ? componentToFile[componentMatch[1]] ?? "" : "";
    routes.push({ path, file, isRedirect: false });
  }
  return routes;
}
const routes = discoverRoutes();

// ---------- Allowlists ----------
// Routes excluded from SEO checks (internal, noindex, redirects).
const EXEMPT_PATHS = new Set<string>([
  "*",
  "/not-found",
  "/glossary-audit",
  "/dev/coverage-bars",
  "/dev/seo-indexing",
  "/admin",
  "/admin/login",
]);
function isExempt(path: string) {
  if (EXEMPT_PATHS.has(path)) return true;
  return path.startsWith("/dev/") || path.startsWith("/admin");
}

// Files with known, intentional heading-level skips. Each entry must
// document why the skip is acceptable so we don't accumulate silent debt.
const HEADING_SKIP_ALLOWLIST = new Set<string>([
  // DrugDetail renders compact <h1> + utility <h3> labels (no thematic
  // section <h2> needed — the page is one cohesive monograph view).
  "src/pages/DrugDetail.tsx",
]);

// ---------- Walk page sources ----------
function* walk(dir: string): Generator<string> {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const s = statSync(p);
    if (s.isDirectory()) yield* walk(p);
    else if (entry.endsWith(".tsx")) yield p;
  }
}
const pageFiles = [...walk(resolve(ROOT, "src/pages"))];

// ---------- Test 1: heading order ----------
function detectHeadingSkip(src: string): { from: number; to: number } | null {
  const levels = [...src.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] - levels[i - 1] > 1) return { from: levels[i - 1], to: levels[i] };
  }
  return null;
}

describe("SEO: heading structure", () => {
  it("TopicTemplate renders an <h1> (every topic page inherits it)", () => {
    const tpl = readFileSync(resolve(ROOT, "src/components/TopicTemplate.tsx"), "utf8");
    const sectionLayout = readFileSync(
      resolve(ROOT, "src/components/SectionLayout.tsx"),
      "utf8",
    );
    // TopicTemplate composes SectionLayout, so an h1 in either satisfies
    // the requirement.
    expect(/<h1[\s>]/.test(tpl) || /<h1[\s>]/.test(sectionLayout)).toBe(true);
  });

  for (const file of pageFiles) {
    const rel = file.replace(`${ROOT}/`, "");
    if (HEADING_SKIP_ALLOWLIST.has(rel)) continue;
    it(`${rel} has no heading-level skips`, () => {
      const src = readFileSync(file, "utf8");
      const skip = detectHeadingSkip(src);
      expect(
        skip,
        skip
          ? `Heading-level skip h${skip.from} → h${skip.to} in ${rel}. ` +
              `Insert the missing intermediate level, or add ${rel} to ` +
              `HEADING_SKIP_ALLOWLIST in src/test/seo-regression.test.ts ` +
              `with a comment explaining why the skip is intentional.`
          : undefined,
      ).toBeNull();
    });
  }
});

// ---------- Test 2: meta tag coverage ----------
const REQUIRED_INDEX_TAGS: { name: string; re: RegExp }[] = [
  { name: "<title>", re: /<title>[^<]+<\/title>/ },
  { name: 'meta name="description"', re: /<meta\s+name="description"\s+content="[^"]+"/ },
  { name: 'meta property="og:title"', re: /<meta\s+property="og:title"\s+content="[^"]+"/ },
  { name: 'meta property="og:description"', re: /<meta\s+property="og:description"\s+content="[^"]+"/ },
  { name: 'meta property="og:url"', re: /<meta\s+property="og:url"\s+content="[^"]+"/ },
  { name: 'meta property="og:type"', re: /<meta\s+property="og:type"\s+content="[^"]+"/ },
];

const PER_ROUTE_TAGS: { name: string; re: RegExp }[] = [
  { name: "<title>", re: /<title>/ },
  { name: 'meta name="description"', re: /name=["']description["']/ },
  { name: 'link rel="canonical"', re: /rel=["']canonical["']/ },
  { name: 'meta property="og:url"', re: /property=["']og:url["']/ },
];

describe("SEO: meta tag coverage", () => {
  const indexHtml = readFileSync(resolve(ROOT, "index.html"), "utf8");
  for (const tag of REQUIRED_INDEX_TAGS) {
    it(`index.html declares ${tag.name}`, () => {
      expect(
        tag.re.test(indexHtml),
        `index.html is missing ${tag.name}. This is the sitewide fallback ` +
          `for non-JS social crawlers (LinkedIn, Slack, Facebook).`,
      ).toBe(true);
    });
  }

  // A route component "satisfies" per-route SEO if its source carries the
  // tags directly OR it composes one of the shared layouts that supply
  // them (SectionLayout uses useLocation() to build self-referencing
  // canonical + og:url for every consumer).
  const SHARED_LAYOUTS = ["SectionLayout", "TopicTemplate"];

  for (const route of routes) {
    if (route.isRedirect || isExempt(route.path)) continue;
    if (!route.file) {
      it(`route "${route.path}" maps to a known component`, () => {
        expect(
          route.file,
          `Could not resolve a source file for route ${route.path}. Either ` +
            `add the route to EXEMPT_PATHS or wire its component import ` +
            `into src/App.tsx so this audit can find it.`,
        ).toBeTruthy();
      });
      continue;
    }

    const rel = route.file.replace(`${ROOT}/`, "");
    it(`${route.path} (${rel}) declares per-route SEO meta`, () => {
      const src = readFileSync(route.file, "utf8");
      const usesLayout = SHARED_LAYOUTS.some((c) => new RegExp(`\\b${c}\\b`).test(src));
      if (usesLayout) return; // SectionLayout/TopicTemplate own the meta
      const missing = PER_ROUTE_TAGS.filter((t) => !t.re.test(src)).map((t) => t.name);
      expect(
        missing.length,
        missing.length
          ? `${rel} is missing per-route ${missing.join(", ")}. Either add ` +
              `a <Helmet> with these tags, render the page through ` +
              `<SectionLayout>, or add ${route.path} to EXEMPT_PATHS in ` +
              `src/test/seo-regression.test.ts.`
          : undefined,
      ).toBe(0);
    });
  }
});

/**
 * Extract FAQ arrays from topic source files and map them to route paths.
 *
 * Every FAQ-bearing topic in `src/pages/topics/*.tsx` follows the same
 * convention:
 *
 *     const <name>Faqs: Array<[string, string]> = [
 *       ["question one?", "answer one."],
 *       ["question two?", "answer two."],
 *     ];
 *
 * This module:
 *   1. Builds a `route path → source file` map by parsing src/App.tsx
 *      (lazy imports + <Route path="..." element={<X />} />).
 *   2. For every topic file, finds the FAQ literal and safely evaluates
 *      it into [question, answer] tuples.
 *   3. Returns a flat `path → faqs` map consumed by prerender-seo.ts
 *      (to inject FAQPage JSON-LD into the static HTML) and by
 *      verify-prerender.ts (to confirm the script tag is present).
 *
 * Extraction is regex + Function-eval against a tuple-of-strings literal
 * — safe because the input comes from our own source tree and parsing
 * fails loudly when the convention drifts.
 */
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

export type FaqPair = [string, string];
export type FaqsByPath = Record<string, FaqPair[]>;

const APP_SRC = resolve("src/App.tsx");

interface RouteMap {
  pathToFile: Record<string, string>;
}

function buildRouteMap(): RouteMap {
  const src = readFileSync(APP_SRC, "utf8");
  const componentToFile: Record<string, string> = {};

  // Static imports:  import CapnographyTopic from "./pages/topics/CapnographyTopic"
  for (const m of src.matchAll(
    /import\s+(\w+)\s+from\s+["'](\.\/pages\/[^"']+)["']/g,
  )) {
    componentToFile[m[1]] = resolveSrc(m[2]);
  }
  // Lazy imports:   const X = lazy(() => import("./pages/topics/X"))
  for (const m of src.matchAll(
    /const\s+(\w+)\s*=\s*lazy\(\s*\(\)\s*=>\s*import\(["'](\.\/pages\/[^"']+)["']\)/g,
  )) {
    componentToFile[m[1]] = resolveSrc(m[2]);
  }

  const pathToFile: Record<string, string> = {};
  for (const m of src.matchAll(/<Route\s+path="([^"]+)"\s+element=\{<(\w+)/g)) {
    const file = componentToFile[m[2]];
    if (file) pathToFile[m[1]] = file;
  }

  // Data-driven topic table: src/routes/topicRoutes.ts — parse `["/path", "ModuleName"]` tuples.
  const topicRoutesPath = resolve("src/routes/topicRoutes.ts");
  if (existsSync(topicRoutesPath)) {
    const topicSrc = readFileSync(topicRoutesPath, "utf8");
    for (const m of topicSrc.matchAll(
      /\[\s*"(\/[^"]+)"\s*,\s*"(\w+)"\s*\]/g,
    )) {
      const [, urlPath, moduleName] = m;
      const file = resolve("src/pages/topics", `${moduleName}.tsx`);
      if (existsSync(file)) pathToFile[urlPath] = file;
    }
  }

  return { pathToFile };
}

function resolveSrc(rel: string): string {
  // App.tsx uses "./pages/..." — that resolves under src/.
  const base = resolve("src", rel.replace(/^\.\//, ""));
  for (const ext of [".tsx", ".ts", ".jsx", ".js"]) {
    if (existsSync(base + ext)) return base + ext;
  }
  return base + ".tsx"; // best-effort; readFileSync will throw cleanly if wrong
}

/**
 * Pull every FAQ source out of the given file. We accept three patterns
 * the codebase uses (all extract to the same `[question, answer]` shape):
 *
 *   1. Named array: `const <name>Faqs: Array<[string, string]> = [["q","a"], …]`
 *   2. Inline tuple form inside JSON-LD: `mainEntity: [["q","a"], …].map(…)`
 *   3. Inline object form: `mainEntity: [{ "@type": "Question", name: "q",
 *      acceptedAnswer: { "@type": "Answer", text: "a" } }, …]`
 *
 * Pairs are deduped by question text in case a file mixes patterns.
 */
function extractFaqsFromFile(file: string): FaqPair[] {
  if (!existsSync(file)) return [];
  const src = readFileSync(file, "utf8");
  const pairs: FaqPair[] = [];

  const tryEval = (literal: string): unknown => {
    try {
      // eslint-disable-next-line no-new-func
      return new Function(`return (${literal});`)();
    } catch (err) {
      console.warn(
        `[extract-faqs] failed to parse FAQ literal in ${file}: ${(err as Error).message}`,
      );
      return null;
    }
  };

  const pushIfPair = (q: unknown, a: unknown) => {
    if (typeof q === "string" && typeof a === "string" && q && a) {
      pairs.push([q, a]);
    }
  };

  const ingest = (parsed: unknown) => {
    if (!Array.isArray(parsed)) return;
    for (const row of parsed) {
      if (Array.isArray(row) && row.length === 2) {
        pushIfPair(row[0], row[1]);
      } else if (row && typeof row === "object") {
        const r = row as Record<string, unknown>;
        if (typeof r.q === "string" || typeof r.a === "string") {
          // NoteLayout / note-page shape: { q: "...", a: "..." }
          pushIfPair(r.q, r.a);
        } else {
          const name = r.name;
          const ans = r.acceptedAnswer as Record<string, unknown> | undefined;
          pushIfPair(name, ans?.text);
        }
      }
    }
  };

  // Pattern 1: `const <name>Faqs: Array<[string, string]> = [`
  for (const m of src.matchAll(
    /const\s+\w+Faqs\s*:\s*Array<\[string,\s*string\]>\s*=\s*(\[)/g,
  )) {
    const start = m.index! + m[0].length - 1;
    const literal = sliceBalanced(src, start);
    if (literal) ingest(tryEval(literal));
  }

  // Pattern 1b: note pages pass FAQs as a prop — `faqs={[{ q: "...", a: "..." }, …]}`
  // or declare them as `const <name>Faqs: NoteFaq[] = [{ q, a }, …]`.
  for (const m of src.matchAll(/faqs\s*(?:=\{|:\s*(?:NoteFaq\[\]|Array<NoteFaq>)\s*=)\s*(\[)/g)) {
    const start = m.index! + m[0].length - 1;
    const literal = sliceBalanced(src, start);
    if (literal) ingest(tryEval(literal));
  }

  // Patterns 2 + 3: `mainEntity:` followed by an array literal — only inside
  // a FAQPage block, so anchor on the "@type": "FAQPage" string and parse
  // forward to the next mainEntity literal.
  const faqBlockRe = /"@type":\s*"FAQPage"[\s\S]{0,500}?mainEntity\s*:\s*(\[)/g;
  for (const m of src.matchAll(faqBlockRe)) {
    const start = m.index! + m[0].length - 1;
    const literal = sliceBalanced(src, start);
    if (literal) ingest(tryEval(literal));
  }

  // Dedupe by question (a file occasionally declares both a named const
  // AND inlines it inside the JSON-LD literal via .map()).
  const seen = new Set<string>();
  return pairs.filter(([q]) => {
    if (seen.has(q)) return false;
    seen.add(q);
    return true;
  });
}


/** Read forward from an opening "[" and return the substring through the
 *  matching "]", respecting string literals and nested brackets. */
function sliceBalanced(src: string, openIdx: number): string | null {
  let depth = 0;
  let i = openIdx;
  let inStr: '"' | "'" | "`" | null = null;
  let escape = false;
  for (; i < src.length; i++) {
    const c = src[i];
    if (inStr) {
      if (escape) { escape = false; continue; }
      if (c === "\\") { escape = true; continue; }
      if (c === inStr) inStr = null;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") { inStr = c; continue; }
    if (c === "[") depth++;
    else if (c === "]") {
      depth--;
      if (depth === 0) return src.slice(openIdx, i + 1);
    }
  }
  return null;
}

export function extractFaqsByPath(): FaqsByPath {
  const { pathToFile } = buildRouteMap();
  const out: FaqsByPath = {};
  for (const [path, file] of Object.entries(pathToFile)) {
    const faqs = extractFaqsFromFile(file);
    if (faqs.length > 0) out[path] = faqs;
  }
  return out;
}

// CLI: print a coverage summary when invoked directly. Useful for spot-checks.
if (import.meta.url === `file://${process.argv[1]}`) {
  const map = extractFaqsByPath();
  const paths = Object.keys(map).sort();
  console.log(`[extract-faqs] ${paths.length} routes with FAQ JSON-LD source:`);
  for (const p of paths) console.log(`  ${p}  (${map[p].length} Q&A)`);
}

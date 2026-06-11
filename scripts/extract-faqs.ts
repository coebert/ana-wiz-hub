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
 * Pull every `const <name>Faqs: Array<[string, string]> = [...]` declaration
 * out of the given file and return the parsed FAQ pairs (concatenated if
 * a file declares more than one — none currently do).
 */
function extractFaqsFromFile(file: string): FaqPair[] {
  if (!existsSync(file)) return [];
  const src = readFileSync(file, "utf8");
  const decl = /const\s+\w+Faqs\s*:\s*Array<\[string,\s*string\]>\s*=\s*(\[)/g;

  const pairs: FaqPair[] = [];
  for (const m of src.matchAll(decl)) {
    const start = m.index! + m[0].length - 1; // position of opening "["
    const literal = sliceBalanced(src, start);
    if (!literal) continue;
    try {
      // Tuple-of-string-pairs literal: safe to eval. We use Function rather
      // than JSON.parse because the source uses unquoted keys nowhere but
      // legitimately uses TS-style trailing commas, template strings, and
      // string concatenation that JSON.parse rejects.
      // eslint-disable-next-line no-new-func
      const parsed = new Function(`return (${literal});`)() as unknown;
      if (Array.isArray(parsed)) {
        for (const row of parsed) {
          if (
            Array.isArray(row) &&
            row.length === 2 &&
            typeof row[0] === "string" &&
            typeof row[1] === "string"
          ) {
            pairs.push([row[0], row[1]]);
          }
        }
      }
    } catch (err) {
      console.warn(
        `[extract-faqs] failed to parse FAQ literal in ${file}: ${(err as Error).message}`,
      );
    }
  }
  return pairs;
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

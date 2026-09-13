import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";
import { allTopics, type ExamTag } from "@/data/curriculum";

/**
 * Every FRCA-mapped topic page MUST render two end-of-topic blocks:
 *
 *   1. **Key Learning Points** — passed as the required `keyPoints={[...]}`
 *      prop on `<TopicTemplate>` and rendered via `<KeyLearningPoints>`.
 *   2. **Exam Summary** — auto-rendered by `<TopicTemplate>` (see
 *      src/components/TopicTemplate.tsx line ~391 `<ExamSummary …/>`),
 *      so any topic that goes through TopicTemplate gets it for free.
 *
 * This test enforces the contract structurally so missing summaries fail CI:
 *   - Every available FRCA-tagged topic (`examTags` includes "primary" or
 *     "final") has a `<Route path="/<section>/<topic-id>" element={<X />}>`
 *     entry in src/App.tsx pointing at a real topic source file.
 *   - That file uses `<TopicTemplate` (guarantees ExamSummary is rendered).
 *   - That file passes a non-empty `keyPoints={[…]}` literal with ≥3 entries
 *     (matches the editorial floor for a usable summary block).
 *
 * Topics flagged `available: false` are roadmap placeholders and are
 * skipped. Adding a new FRCA topic without these blocks fails this test
 * before it can ship.
 */

interface RouteEntry {
  topicId: string;
  componentName: string;
  file: string | null;
}

function buildRouteIndex(): Map<string, RouteEntry> {
  const appSrc = readFileSync(resolve("src/App.tsx"), "utf8");

  // Component → file path (static + lazy imports)
  const componentToFile: Record<string, string> = {};
  for (const m of appSrc.matchAll(
    /import\s+(\w+)\s+from\s+["'](\.\/pages\/[^"']+)["']/g,
  )) {
    componentToFile[m[1]] = resolveSrc(m[2]);
  }
  for (const m of appSrc.matchAll(
    /const\s+(\w+)\s*=\s*lazy\(\s*\(\)\s*=>\s*import\(["'](\.\/pages\/[^"']+)["']\)/g,
  )) {
    componentToFile[m[1]] = resolveSrc(m[2]);
  }

  // <Route path="/<anything>/<topic-id>" element={<X …/>} />
  const out = new Map<string, RouteEntry>();
  for (const m of appSrc.matchAll(
    /<Route\s+path="([^"]+)"\s+element=\{<(\w+)/g,
  )) {
    const path = m[1];
    const component = m[2];
    const lastSegment = path.split("/").filter(Boolean).pop();
    if (!lastSegment) continue;
    if (!out.has(lastSegment)) {
      out.set(lastSegment, {
        topicId: lastSegment,
        componentName: component,
        file: componentToFile[component] ?? null,
      });
    }
  }

  // Data-driven topic routes live in src/routes/topicRoutes.ts as
  // ["/section/topic-id", "ModuleName"] pairs under src/pages/topics/.
  const topicRoutesFile = resolve("src/routes/topicRoutes.ts");
  if (existsSync(topicRoutesFile)) {
    const topicSrc = readFileSync(topicRoutesFile, "utf8");
    for (const m of topicSrc.matchAll(
      /\[\s*"(\/[^"]+)"\s*,\s*"([A-Za-z0-9_]+)"\s*\]/g,
    )) {
      const lastSegment = m[1].split("/").filter(Boolean).pop();
      if (!lastSegment || out.has(lastSegment)) continue;
      const file = resolve(`src/pages/topics/${m[2]}.tsx`);
      out.set(lastSegment, {
        topicId: lastSegment,
        componentName: m[2],
        file: existsSync(file) ? file : null,
      });
    }
  }

  return out;
}

function resolveSrc(rel: string): string {
  const base = resolve("src", rel.replace(/^\.\//, ""));
  for (const ext of [".tsx", ".ts", ".jsx", ".js"]) {
    if (existsSync(base + ext)) return base + ext;
  }
  return base + ".tsx";
}

/** Slice an array literal starting at `openIdx` (the `[`) through its match. */
function sliceBalanced(src: string, openIdx: number): string | null {
  let depth = 0;
  let inStr: '"' | "'" | "`" | null = null;
  let escape = false;
  for (let i = openIdx; i < src.length; i++) {
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

/**
 * Count entries in a `keyPoints={[ ... ]}` literal. We don't fully parse the
 * TSX — we count top-level commas at depth 1 inside the array. An entry can
 * be a string literal OR `{ text: "...", cites: [...] }`, so naive counting
 * by string-literal occurrences would undercount.
 */
function countTopLevelEntries(arrayLiteral: string): number {
  if (arrayLiteral.trim() === "[]") return 0;
  let depth = 0;
  let inStr: '"' | "'" | "`" | null = null;
  let escape = false;
  let entries = 1;
  let sawNonWhitespace = false;
  for (let i = 0; i < arrayLiteral.length; i++) {
    const c = arrayLiteral[i];
    if (inStr) {
      if (escape) { escape = false; continue; }
      if (c === "\\") { escape = true; continue; }
      if (c === inStr) inStr = null;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") { inStr = c; sawNonWhitespace = true; continue; }
    if (c === "[" || c === "{" || c === "(") depth++;
    else if (c === "]" || c === "}" || c === ")") depth--;
    else if (c === "," && depth === 1) entries++;
    else if (!/\s/.test(c) && depth >= 1) sawNonWhitespace = true;
  }
  return sawNonWhitespace ? entries : 0;
}

interface TopicAudit {
  topicId: string;
  examTags: ExamTag[];
  routeFound: boolean;
  fileFound: boolean;
  filePath: string | null;
  usesTopicTemplate: boolean;
  keyPointsCount: number;
}

function auditTopic(
  topic: (typeof allTopics)[number],
  routes: Map<string, RouteEntry>,
): TopicAudit {
  const entry = routes.get(topic.id);
  const audit: TopicAudit = {
    topicId: topic.id,
    examTags: topic.examTags,
    routeFound: !!entry,
    fileFound: false,
    filePath: entry?.file ?? null,
    usesTopicTemplate: false,
    keyPointsCount: 0,
  };
  if (!entry || !entry.file || !existsSync(entry.file)) return audit;
  audit.fileFound = true;

  const src = readFileSync(entry.file, "utf8");
  audit.usesTopicTemplate = /<TopicTemplate\b/.test(src);

  // Find `keyPoints={` — either inline `keyPoints={[...]}` OR
  // `keyPoints={identifierName}` referencing a `const identifierName = [...]`
  // declared elsewhere in the file.
  const inline = /keyPoints\s*=\s*\{\s*(\[)/.exec(src);
  if (inline) {
    const openIdx = inline.index + inline[0].length - 1;
    const literal = sliceBalanced(src, openIdx);
    if (literal) audit.keyPointsCount = countTopLevelEntries(literal);
  } else {
    const ref = /keyPoints\s*=\s*\{\s*([A-Za-z_$][\w$]*)\s*\}/.exec(src);
    if (ref) {
      const ident = ref[1];
      const declRe = new RegExp(
        `const\\s+${ident}\\b[^=]*=\\s*(\\[)`,
      );
      const decl = declRe.exec(src);
      if (decl) {
        const openIdx = decl.index + decl[0].length - 1;
        const literal = sliceBalanced(src, openIdx);
        if (literal) audit.keyPointsCount = countTopLevelEntries(literal);
      }
    }
  }
  return audit;
}

const FRCA_TAGS: ExamTag[] = ["primary", "final"];
const MIN_KEY_POINTS = 3;

describe("FRCA topics: end-of-topic summary + key learning points", () => {
  const routes = buildRouteIndex();
  const frcaTopics = allTopics.filter(
    (t) => t.available && t.examTags.some((tag) => FRCA_TAGS.includes(tag)),
  );

  it("discovers a non-trivial set of FRCA topics (guards data/parsing regressions)", () => {
    expect(frcaTopics.length).toBeGreaterThan(20);
  });

  it("every FRCA topic has a route, uses TopicTemplate, and ships ≥3 key points", () => {
    const failures: string[] = [];
    for (const topic of frcaTopics) {
      const a = auditTopic(topic, routes);
      if (!a.routeFound) {
        failures.push(`  ${a.topicId}: no <Route> entry in src/App.tsx`);
        continue;
      }
      if (!a.fileFound) {
        failures.push(`  ${a.topicId}: route maps to missing file (${a.filePath})`);
        continue;
      }
      if (!a.usesTopicTemplate) {
        failures.push(
          `  ${a.topicId} (${a.filePath}): does not render <TopicTemplate> ` +
            `→ <ExamSummary> end-of-topic block is missing`,
        );
      }
      if (a.keyPointsCount < MIN_KEY_POINTS) {
        failures.push(
          `  ${a.topicId} (${a.filePath}): keyPoints={[…]} has ${a.keyPointsCount} ` +
            `entries, need ≥${MIN_KEY_POINTS}`,
        );
      }
    }
    if (failures.length > 0) {
      throw new Error(
        `Found ${failures.length} FRCA summary/key-points violation(s):\n${failures.join("\n")}`,
      );
    }
  });
});

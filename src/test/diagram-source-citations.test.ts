import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "fs";
import { resolve, join, relative } from "path";

/**
 * Diagram source-citation contract.
 *
 * Every topic page that renders a principle diagram (anything imported from
 * `@/components/diagrams/`) MUST also cite the source(s) for those diagrams,
 * declared on `<TopicTemplate>` via:
 *
 *     sectionSources={{ diagrams: ["BJA Educ 2018", "Miller 9e Ch. 23"] }}
 *
 * Each label MUST exist in `topicReferences[topicId]` inside
 * `src/data/references.ts` — i.e. the same reference pool the topic's prose
 * cites. This prevents:
 *
 *   - diagrams shipping without provenance (legal/editorial risk),
 *   - "ghost" labels that don't resolve to any real reference, and
 *   - drift between text citations and diagram citations.
 *
 * This is a CI-grade vitest mirror of `scripts/check-section-sources.mjs`,
 * scoped specifically to the `diagrams` slot so missing diagram citations
 * fail the build.
 */

const ROOT = resolve(".");
const TOPICS_DIR = resolve("src/pages/topics");
const REFS_FILE = resolve("src/data/references.ts");

function listTopicFiles(dir = TOPICS_DIR): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...listTopicFiles(p));
    else if (name.endsWith(".tsx")) out.push(p);
  }
  return out;
}

/** topicId → Set<label> from src/data/references.ts. */
function loadReferenceLabels(): Map<string, Set<string>> {
  const src = readFileSync(REFS_FILE, "utf8");
  const map = new Map<string, Set<string>>();
  const topicRe = /"([a-z0-9-]+)"\s*:\s*\[/g;
  let m: RegExpExecArray | null;
  while ((m = topicRe.exec(src)) !== null) {
    const topicId = m[1];
    let depth = 1;
    let i = topicRe.lastIndex;
    while (i < src.length && depth > 0) {
      const ch = src[i];
      if (ch === "[") depth++;
      else if (ch === "]") depth--;
      i++;
    }
    const block = src.slice(topicRe.lastIndex, i - 1);
    const labels = new Set<string>();
    for (const lm of block.matchAll(/label\s*:\s*"([^"]+)"/g)) labels.add(lm[1]);
    map.set(topicId, labels);
  }
  return map;
}

function extractTopicId(src: string): string | null {
  const m =
    src.match(/topicId\s*=\s*"([^"]+)"/) ||
    src.match(/topicId\s*:\s*"([^"]+)"/) ||
    // Topics that hoist the id: `const TOPIC_ID = "…"` + topicId={TOPIC_ID}
    src.match(/TOPIC_ID\s*=\s*"([^"]+)"/);
  return m ? m[1] : null;
}

/** Slice an array literal starting at openIdx (the `[`) through its match. */
function sliceArrayLiteral(src: string, openIdx: number): string | null {
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

/** Pull labels from `sectionSources={{ ... diagrams: [ "A", "B" ] ... }}`. */
function extractDiagramSources(src: string): string[] | null {
  const m = /sectionSources\s*=\s*\{\{/.exec(src);
  if (!m) return null;
  // Find a top-level `diagrams: [` inside the sectionSources block.
  const region = src.slice(m.index);
  const dm = /\bdiagrams\s*:\s*(\[)/.exec(region);
  if (!dm) return null;
  const openIdx = m.index + dm.index + dm[0].length - 1;
  const literal = sliceArrayLiteral(src, openIdx);
  if (!literal) return null;
  const out: string[] = [];
  for (const sm of literal.matchAll(/"([^"\\]+)"/g)) out.push(sm[1]);
  return out;
}

function importsAnyDiagram(src: string): boolean {
  return /from\s+["']@\/components\/diagrams\//.test(src);
}

interface Issue {
  file: string;
  topicId: string | null;
  kind:
    | "missing-topicId"
    | "missing-references-entry"
    | "missing-diagram-sources"
    | "empty-diagram-sources"
    | "label-mismatch";
  detail: string;
}

describe("Diagram source-citation contract", () => {
  const refLabels = loadReferenceLabels();
  const files = listTopicFiles();

  it("loads reference labels (guards parser regressions)", () => {
    expect(refLabels.size).toBeGreaterThan(20);
  });

  // Collect all issues once and partition between hard failures (label
  // mismatches — always wrong) and baseline-tracked failures (legacy topics
  // without diagram citations — tracked via snapshot so any new offender
  // fails CI and any fix surfaces as a snapshot diff to re-baseline).
  const issues: Issue[] = [];
  let auditedTopics = 0;

  for (const file of files) {
    const src = readFileSync(file, "utf8");
    if (!importsAnyDiagram(src)) continue;
    const rel = relative(ROOT, file);

    const topicId = extractTopicId(src);
    if (!topicId) {
      issues.push({
        file: rel,
        topicId: null,
        kind: "missing-topicId",
        detail: "Topic renders diagrams but topicId could not be parsed.",
      });
      continue;
    }
    const known = refLabels.get(topicId);
    if (!known) {
      issues.push({
        file: rel,
        topicId,
        kind: "missing-references-entry",
        detail: `No entry for "${topicId}" in src/data/references.ts.`,
      });
      continue;
    }

    auditedTopics++;
    const cites = extractDiagramSources(src);
    if (cites === null) {
      issues.push({
        file: rel,
        topicId,
        kind: "missing-diagram-sources",
        detail:
          'Topic renders diagrams but no `sectionSources={{ diagrams: [...] }}` is declared.',
      });
      continue;
    }
    if (cites.length === 0) {
      issues.push({
        file: rel,
        topicId,
        kind: "empty-diagram-sources",
        detail: "`sectionSources.diagrams` is empty.",
      });
      continue;
    }
    const seen = new Set<string>();
    for (const label of cites) {
      if (seen.has(label)) continue;
      seen.add(label);
      if (!known.has(label)) {
        issues.push({
          file: rel,
          topicId,
          kind: "label-mismatch",
          detail:
            `Diagram cite "${label}" not in references.ts for "${topicId}". ` +
            `Use the SAME labels the topic's text cites.`,
        });
      }
    }
  }

  it("audits a non-trivial set of diagram-bearing topics", () => {
    expect(auditedTopics).toBeGreaterThan(0);
  });

  it("never ships a diagram cite that doesn't resolve in references.ts (hard fail)", () => {
    // Label mismatches are ALWAYS wrong — a label that doesn't resolve in
    // references.ts is broken provenance and must be fixed, never baselined.
    const mismatches = issues.filter((i) => i.kind === "label-mismatch");
    if (mismatches.length > 0) {
      const summary = mismatches
        .map((i) => `  ${i.file} → ${i.detail}`)
        .join("\n");
      throw new Error(
        `Found ${mismatches.length} unresolved diagram cite(s):\n${summary}`,
      );
    }
  });

  it("missing-citation baseline is locked (new diagram-bearing topics MUST cite sources)", () => {
    // Snapshot the SET of currently-uncovered topics. Any new diagram-bearing
    // topic without `sectionSources.diagrams` will fail this snapshot until
    // it is either (a) given a `diagrams: [...]` cite list using labels from
    // src/data/references.ts (preferred — typically BJA Education entries
    // already used by the topic's text), or (b) intentionally added to the
    // baseline via `vitest -u`. Likewise, fixing an entry surfaces as a
    // snapshot diff prompting a re-baseline.
    const baseline = issues
      .filter(
        (i) =>
          i.kind === "missing-diagram-sources" ||
          i.kind === "empty-diagram-sources" ||
          i.kind === "missing-topicId" ||
          i.kind === "missing-references-entry",
      )
      .map((i) => `[${i.kind}] ${i.file}`)
      .sort();
    expect(baseline).toMatchSnapshot("diagram-citation-baseline");
  });
});


import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "fs";
import { resolve } from "path";

/**
 * Per-diagram source-citation contract for animated principle diagrams.
 *
 * Topic-level `sectionSources.diagrams` (see diagram-source-citations.test.ts)
 * proves the topic *as a whole* has provenance for its diagram block. That
 * is necessary but NOT sufficient — a topic page often hosts several
 * animated diagrams, each illustrating a distinct principle. The reader
 * needs to know which reference backs *each* mechanism.
 *
 * This test enforces that every animated diagram component embeds at least
 * one principle-specific citation INSIDE the component itself, via the
 * existing primitives:
 *
 *     <Cite topicId="…" labels={["BJA Educ 2018"]} />
 *     <InlineRef topicId="…" refLabel="BJA Educ 2018" />
 *
 * Additionally, when a `topicId` is named on those primitives, any cited
 * label MUST exist in `topicReferences[topicId]` inside
 * `src/data/references.ts` — same reference pool as the prose. Bad labels
 * fail CI immediately; the legacy backlog of un-cited animations is pinned
 * to a snapshot so any NEW animation without per-principle cites also fails.
 *
 * Pairs with diagram-animation-contract.test.ts (which guards accessible
 * fallbacks) and diagram-source-citations.test.ts (topic-level provenance).
 */

const DIAGRAMS_DIR = resolve("src/components/diagrams");
const REFS_FILE = resolve("src/data/references.ts");

/** Recursively list every `.tsx` file under the diagrams tree (diagrams are
 * organised into per-section subfolders such as `physiology/`, `clinical/`). */
function listDiagramFiles(dir = DIAGRAMS_DIR): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (entry.name === "__tests__" || entry.name === "_dev") continue;
      out.push(...listDiagramFiles(resolve(dir, entry.name)));
    } else if (entry.name.endsWith(".tsx")) {
      out.push(resolve(dir, entry.name));
    }
  }
  return out;
}


const ANIMATION_FILE_RE = /(?:^Animated[A-Z]\w*|Animation)\.tsx$/;

/* ───────────────────────────── reference index ─────────────────────────── */

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

/* ───────────────────────── animation discovery ─────────────────────────── */

interface AnimationUnit {
  name: string;
  file: string;
  src: string;
  /** Source slice scoped to this component declaration. */
  componentSrc: string;
}

function sliceComponentBody(src: string, startIdx: number): string {
  // Walk forward over the declaration capturing balanced braces so we don't
  // mistakenly attribute another sibling component's <Cite> to this one.
  let depth = 0;
  let inStr: '"' | "'" | "`" | null = null;
  let escape = false;
  let seenBrace = false;
  for (let i = startIdx; i < src.length; i++) {
    const c = src[i];
    if (inStr) {
      if (escape) { escape = false; continue; }
      if (c === "\\") { escape = true; continue; }
      if (c === inStr) inStr = null;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") { inStr = c; continue; }
    if (c === "{") { depth++; seenBrace = true; }
    else if (c === "}") {
      depth--;
      if (seenBrace && depth === 0) return src.slice(startIdx, i + 1);
    }
  }
  return src.slice(startIdx);
}

function listAnimationUnits(): AnimationUnit[] {
  const out: AnimationUnit[] = [];
  const seen = new Set<string>();
  const declRe =
    /export\s+(?:default\s+)?(?:const|function|class)\s+(Animated[A-Z]\w*|\w*Animation)\b/g;
  for (const file of listDiagramFiles()) {
    const f = file.split("/").pop()!;
    const src = readFileSync(file, "utf8");

    // Index declaration ranges first so multi-component modules attribute
    // <Cite> nodes to the enclosing component, not their neighbours.
    const matches = Array.from(src.matchAll(declRe));
    matches.forEach((m, idx) => {
      const name = m[1];
      if (seen.has(name)) return;
      seen.add(name);
      const startIdx = m.index!;
      const end = matches[idx + 1]?.index ?? src.length;
      const componentSrc = sliceComponentBody(src.slice(0, end), startIdx);
      out.push({ name, file, src, componentSrc });
    });

    // If the filename matches the convention but no `export const Foo`
    // declaration was found (rare — uses `export default` of an arrow
    // assigned to a const named differently), still register a unit so the
    // baseline catches it.
    const base = f.replace(/\.tsx$/, "");
    if (ANIMATION_FILE_RE.test(f) && !seen.has(base)) {
      seen.add(base);
      out.push({ name: base, file, src, componentSrc: src });
    }
  }
  return out;
}

/* ──────────────────────────── cite extraction ──────────────────────────── */

interface CiteRef {
  topicId: string | null;
  labels: string[];
}

/** Pull every <Cite … /> and <InlineRef … /> off a component body. */
function extractCites(componentSrc: string): CiteRef[] {
  const out: CiteRef[] = [];

  // <Cite topicId="..." labels={["a","b"]} />
  for (const m of componentSrc.matchAll(
    /<Cite\b([^/>]*?)(?:\/|>)/g,
  )) {
    const attrs = m[1];
    const topicId = /\btopicId\s*=\s*["']([^"']+)["']/.exec(attrs)?.[1] ?? null;
    const labelsMatch = /\blabels\s*=\s*\{\s*\[([^\]]*)\]/.exec(attrs);
    const labels: string[] = [];
    if (labelsMatch) {
      for (const lm of labelsMatch[1].matchAll(/["']([^"']+)["']/g)) labels.push(lm[1]);
    }
    out.push({ topicId, labels });
  }

  // <InlineRef topicId="..." refLabel="..." />
  for (const m of componentSrc.matchAll(
    /<InlineRef\b([^/>]*?)(?:\/|>)/g,
  )) {
    const attrs = m[1];
    const topicId = /\btopicId\s*=\s*["']([^"']+)["']/.exec(attrs)?.[1] ?? null;
    const refLabel = /\brefLabel\s*=\s*["']([^"']+)["']/.exec(attrs)?.[1] ?? null;
    out.push({ topicId, labels: refLabel ? [refLabel] : [] });
  }

  return out;
}

/* ─────────────────────────────── the test ──────────────────────────────── */

interface Issue {
  unit: string;
  file: string;
  kind: "label-mismatch" | "missing-per-principle-cite";
  detail: string;
}

describe("Per-diagram principle-citation contract (animated diagrams)", () => {
  const refLabels = loadReferenceLabels();
  const units = listAnimationUnits();

  it("loads reference labels (guards parser regressions)", () => {
    expect(refLabels.size).toBeGreaterThan(20);
  });

  it("discovers animated diagram units", () => {
    expect(units.length).toBeGreaterThan(0);
  });

  const issues: Issue[] = [];
  const relFile = (f: string) => f.replace(resolve(".") + "/", "");
  for (const u of units) {
    const cites = extractCites(u.componentSrc);

    // Hard fail: any cite with a topicId must point at real labels.
    for (const c of cites) {
      if (!c.topicId) continue;
      const known = refLabels.get(c.topicId);
      if (!known) {
        issues.push({
          unit: u.name,
          file: relFile(u.file),
          kind: "label-mismatch",
          detail: `topicId="${c.topicId}" not in src/data/references.ts.`,
        });
        continue;
      }
      for (const l of c.labels) {
        if (!known.has(l)) {
          issues.push({
            unit: u.name,
            file: relFile(u.file),
            kind: "label-mismatch",
            detail:
              `cite label "${l}" not in references.ts for "${c.topicId}". ` +
              `Use the same labels the topic's text cites.`,
          });
        }
      }
    }

    const hasPrinciple = cites.some((c) => c.labels.length > 0);
    if (!hasPrinciple) {
      issues.push({
        unit: u.name,
        file: relFile(u.file),
        kind: "missing-per-principle-cite",
        detail:
          "Animation embeds no <Cite labels={[...]} /> or " +
          "<InlineRef refLabel='...' /> — readers can't tell which " +
          "reference backs this specific principle.",
      });
    }
  }

  it("every per-diagram cite resolves to a real reference (hard fail)", () => {
    const mismatches = issues.filter((i) => i.kind === "label-mismatch");
    if (mismatches.length > 0) {
      const summary = mismatches
        .map((i) => `  ${i.file} → ${i.unit}: ${i.detail}`)
        .join("\n");
      throw new Error(
        `Found ${mismatches.length} unresolved per-diagram cite(s):\n${summary}`,
      );
    }
  });

  it("missing-per-principle-cite baseline is locked (new animations MUST cite their principle)", () => {
    // Snapshot the current set of animations without principle cites. Any
    // NEW animation added without a <Cite>/<InlineRef> referencing its own
    // principle will fail this snapshot. Fixing an existing entry surfaces
    // as a diff that needs `vitest -u` — gradual cleanup without blocking
    // new editorial work.
    const baseline = issues
      .filter((i) => i.kind === "missing-per-principle-cite")
      .map((i) => `${i.file}::${i.unit}`)
      .sort();
    expect(baseline).toMatchSnapshot("per-principle-cite-baseline");
  });
});

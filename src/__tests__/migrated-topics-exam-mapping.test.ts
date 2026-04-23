import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { EXAM_TAGS, type ExamTag } from "@/data/curriculum";

/**
 * Cross-topic guard for every migrated TopicTemplate page.
 *
 * For each file, parse out:
 *   - the `sectionExamMapping={{ ... }}` block
 *   - every `exams: [...]` array literal (covers both the top-level
 *     mapping and any inline `<ExamSection exams={...}>` props)
 *   - every `curriculumCodes: [...]` array literal
 *
 * Assertions per file:
 *   1. At least one `exams` array exists (sanity — mapping was preserved).
 *   2. Every value in every `exams[]` is a valid ExamTag.
 *   3. Every `curriculumCodes[]` entry is a non-empty trimmed string.
 *
 * Plus a compile-time `satisfies` assertion so any drift in EXAM_TAGS
 * itself is caught by tsc before this test runs.
 */

// --- Compile-time check ---------------------------------------------------
const _allTags = ["primary", "final", "fficm", "edic"] as const satisfies readonly ExamTag[];
void _allTags;

const TOPICS = [
  "TIVATopic",
  "CardiothoracicTopic",
  "PaediatricAnaesthesiaTopic",
  "PainMedicineTopic",
  "RegionalAnaesthesiaTopic",
  "StatisticsEBMTopic",
  "SIUnitsThermodynamicsTopic",
  "PlasticSurgeryTopic",
] as const;

const EXAMS_ARRAY_RE = /exams\s*:\s*\[([^\]]*)\]/g;
const CURRICULUM_ARRAY_RE = /curriculumCodes\s*:\s*\[([^\]]*)\]/g;
const STRING_LITERAL_RE = /["']([^"']+)["']/g;

interface ParsedArray {
  line: number;
  values: string[];
}

function collectArrays(src: string, regex: RegExp): ParsedArray[] {
  const out: ParsedArray[] = [];
  // Reset stateful global regex per call
  const re = new RegExp(regex.source, regex.flags);
  let match: RegExpExecArray | null;
  while ((match = re.exec(src)) !== null) {
    const body = match[1];
    const values: string[] = [];
    const litRe = new RegExp(STRING_LITERAL_RE.source, STRING_LITERAL_RE.flags);
    let lit: RegExpExecArray | null;
    while ((lit = litRe.exec(body)) !== null) values.push(lit[1]);
    const line = src.slice(0, match.index).split("\n").length;
    out.push({ line, values });
  }
  return out;
}

function loadTopic(name: string): {
  source: string;
  examArrays: ParsedArray[];
  curriculumArrays: ParsedArray[];
} {
  const path = resolve(__dirname, `../pages/topics/${name}.tsx`);
  const source = readFileSync(path, "utf8");
  return {
    source,
    examArrays: collectArrays(source, EXAMS_ARRAY_RE),
    curriculumArrays: collectArrays(source, CURRICULUM_ARRAY_RE),
  };
}

describe.each(TOPICS)("%s — sectionExamMapping integrity", (topic) => {
  const { source, examArrays, curriculumArrays } = loadTopic(topic);

  it("contains a sectionExamMapping block", () => {
    expect(source).toMatch(/sectionExamMapping\s*=\s*\{\{/);
  });

  it("declares at least one exams array", () => {
    expect(examArrays.length).toBeGreaterThan(0);
  });

  it("every exams[] entry is a valid ExamTag", () => {
    const offenders: string[] = [];
    for (const { line, values } of examArrays) {
      for (const v of values) {
        if (!(EXAM_TAGS as readonly string[]).includes(v)) {
          offenders.push(`  line ${line}: "${v}"`);
        }
      }
    }
    expect(
      offenders,
      `Invalid ExamTag(s) in ${topic} (allowed: ${EXAM_TAGS.join(", ")}):\n${offenders.join("\n")}`,
    ).toEqual([]);
  });

  it("never uses the invalid 'ficm' literal (must be 'fficm')", () => {
    const offenders: { line: number; snippet: string }[] = [];
    source.split("\n").forEach((text, i) => {
      // Bare token 'ficm' inside quotes; never 'fficm'
      if (/(?<!f)["']ficm["']/.test(text)) {
        offenders.push({ line: i + 1, snippet: text.trim() });
      }
    });
    expect(
      offenders,
      `${topic} has invalid 'ficm' literals:\n${offenders
        .map((o) => `  line ${o.line}: ${o.snippet}`)
        .join("\n")}`,
    ).toEqual([]);
  });

  it("curriculumCodes (where present) are non-empty trimmed strings", () => {
    if (curriculumArrays.length === 0) return; // optional field
    const offenders: string[] = [];
    for (const { line, values } of curriculumArrays) {
      if (values.length === 0) {
        offenders.push(`  line ${line}: empty curriculumCodes array`);
        continue;
      }
      for (const v of values) {
        if (v.trim() !== v || v.length === 0) {
          offenders.push(`  line ${line}: "${v}" is empty or untrimmed`);
        }
      }
    }
    expect(offenders, `${topic} curriculumCodes issues:\n${offenders.join("\n")}`).toEqual([]);
  });
});

describe("Cross-topic summary", () => {
  it("at least one topic per migrated set declares curriculumCodes", () => {
    const withCodes = TOPICS.filter((t) => loadTopic(t).curriculumArrays.length > 0);
    expect(withCodes.length, "no migrated topic uses curriculumCodes").toBeGreaterThan(0);
  });
});

import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { EXAM_TAGS, type ExamTag } from "@/data/curriculum";

/**
 * Compile-time + runtime guard for StatisticsEBMTopic ExamTag usage.
 *
 * - Compile-time: the `satisfies ExamTag[]` assertions below fail `tsc`
 *   if any literal isn't a valid ExamTag (e.g. "ficm" vs "fficm").
 * - Runtime: parses the source file and asserts every `exams: [...]`
 *   array literal contains only valid ExamTag values, so any future
 *   typo introduced into the JSX is caught even without rendering.
 */

// --- Compile-time check ---------------------------------------------------
// These mirror the exam mappings used in StatisticsEBMTopic. If anyone
// edits the topic to use an invalid tag, copying it here would fail tsc.
const _objectivesExams = ["primary", "final", "fficm"] as const satisfies readonly ExamTag[];
const _workedExamplesExams = ["primary", "final", "fficm"] as const satisfies readonly ExamTag[];
const _keyPointsExams = ["primary", "final", "fficm"] as const satisfies readonly ExamTag[];
void _objectivesExams;
void _workedExamplesExams;
void _keyPointsExams;

// --- Runtime check --------------------------------------------------------
const TOPIC_PATH = resolve(__dirname, "../pages/topics/StatisticsEBMTopic.tsx");
const source = readFileSync(TOPIC_PATH, "utf8");

/** Match every `exams: [ ... ]` literal (ExamSection prop + sectionExamMapping). */
const EXAMS_ARRAY_RE = /exams\s*:\s*\[([^\]]*)\]/g;
/** Extract single-/double-quoted strings from inside a bracket body. */
const STRING_LITERAL_RE = /["']([^"']+)["']/g;

function collectExamArrays(src: string): { line: number; values: string[] }[] {
  const results: { line: number; values: string[] }[] = [];
  let match: RegExpExecArray | null;
  while ((match = EXAMS_ARRAY_RE.exec(src)) !== null) {
    const body = match[1];
    const values: string[] = [];
    let lit: RegExpExecArray | null;
    while ((lit = STRING_LITERAL_RE.exec(body)) !== null) {
      values.push(lit[1]);
    }
    const line = src.slice(0, match.index).split("\n").length;
    results.push({ line, values });
  }
  return results;
}

const examArrays = collectExamArrays(source);

describe("StatisticsEBMTopic ExamTag values", () => {
  it("declares at least one exams array (sanity)", () => {
    expect(examArrays.length).toBeGreaterThan(0);
  });

  it.each(examArrays)(
    "every value in exams[] at line $line is a valid ExamTag",
    ({ values }) => {
      for (const value of values) {
        expect(
          EXAM_TAGS as readonly string[],
          `"${value}" is not a valid ExamTag (allowed: ${EXAM_TAGS.join(", ")})`,
        ).toContain(value);
      }
    },
  );

  it("uses 'fficm' (not the invalid 'ficm') wherever FFICM is referenced", () => {
    const offenders: { line: number; snippet: string }[] = [];
    source.split("\n").forEach((lineText, i) => {
      // Match the bare token "ficm" inside a string literal — but never
      // "fficm". A negative lookbehind on `f` makes this precise.
      if (/(?<!f)["']ficm["']/.test(lineText)) {
        offenders.push({ line: i + 1, snippet: lineText.trim() });
      }
    });
    expect(
      offenders,
      `Found invalid 'ficm' literals (should be 'fficm'):\n${offenders
        .map((o) => `  line ${o.line}: ${o.snippet}`)
        .join("\n")}`,
    ).toEqual([]);
  });
});

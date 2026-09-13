import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Standing audit: every topic page must ship the full synthesis stack
 * (objectives → core concepts → key points → quiz → references → see also →
 * completion toggle).
 *
 * Most topics get that stack for free from `<TopicTemplate>`, which renders
 * KeyLearningPoints, QuizSection, ReferencesList, SeeAlso and
 * TopicCompletionToggle in the canonical order. For those files we assert the
 * *props* that feed the stack instead of inline component markers.
 *
 * A handful of legacy topics still compose `<SectionLayout>` by hand; those are
 * checked against the original inline-marker contract.
 *
 * If a topic legitimately needs to opt out, add its filename to
 * ALLOWED_MISSING below with a justification.
 */

const TOPICS_DIR = join(__dirname, "..", "pages", "topics");

/** Inline synthesis components required by hand-composed (legacy) topics. */
const LEGACY_REQUIRED = [
  { name: "KeyLearningPoints", marker: "<KeyLearningPoints" },
  { name: "QuizSection", marker: "<QuizSection" },
  { name: "ReferencesList", marker: "<ReferencesList" },
  { name: "SeeAlso", marker: "<SeeAlso" },
  { name: "TopicCompletionToggle", marker: "<TopicCompletionToggle" },
] as const;

/** Props a `<TopicTemplate>` topic must pass for the stack to be complete. */
const TEMPLATE_REQUIRED = [
  { name: "topicId", marker: /\btopicId=/ },
  { name: "objectives", marker: /\bobjectives=/ },
  { name: "coreConcepts", marker: /\bcoreConcepts=/ },
  { name: "keyPoints", marker: /\bkeyPoints=/ },
] as const;

// Per-file opt-outs. Key = filename, value = list of component/prop names
// allowed to be missing (with brief justification in a comment).
const ALLOWED_MISSING: Record<string, string[]> = {};

const topicFiles = readdirSync(TOPICS_DIR)
  .filter((f) => f.endsWith(".tsx"))
  .sort();

describe("Topic synthesis sections", () => {
  it("discovers topic files", () => {
    expect(topicFiles.length).toBeGreaterThan(0);
  });

  describe.each(topicFiles)("%s", (file) => {
    const content = readFileSync(join(TOPICS_DIR, file), "utf8");
    const usesTemplate = content.includes("<TopicTemplate");
    const allowedMissing = ALLOWED_MISSING[file] ?? [];

    /**
     * Intro paragraph audit: the topic body should open with prose (a `<p>`
     * element) before the first table, diagram, or grid. Rationale: orients
     * the learner before plunging into structured data.
     */
    it("opens with an intro <p> before any table/diagram/grid", () => {
      // Template topics: the body starts at the `coreConcepts` prop.
      // Legacy topics: the body starts after the <SectionLayout> open tag.
      const anchor = usesTemplate ? "coreConcepts={" : "<SectionLayout";
      const start = content.indexOf(anchor);
      expect(start, `${anchor} not found in ${file}`).toBeGreaterThan(-1);
      const openEnd = content.indexOf(">", start);
      const body = content.slice(openEnd + 1);
      const PARA_RE = /<p[\s>]/;
      const BLOCKING_RE =
        /<table\b|className="[^"]*\bgrid\b[^"]*"|<[A-Z][A-Za-z0-9]*Diagram\b/;
      const pIdx = body.search(PARA_RE);
      const bIdx = body.search(BLOCKING_RE);
      const hasIntroProse = bIdx === -1 || (pIdx !== -1 && pIdx < bIdx);
      expect(
        hasIntroProse,
        `${file} renders a table/diagram/grid before any intro <p>. Add a brief introductory paragraph at the top of the topic body.`,
      ).toBe(true);
    });

    it("includes all required synthesis components", () => {
      const missing = usesTemplate
        ? TEMPLATE_REQUIRED.filter(
            ({ name, marker }) => !marker.test(content) && !allowedMissing.includes(name),
          ).map(({ name }) => name)
        : LEGACY_REQUIRED.filter(
            ({ name, marker }) =>
              !content.includes(marker) && !allowedMissing.includes(name),
          ).map(({ name }) => name);
      expect(
        missing,
        `${file} is missing required ${usesTemplate ? "TopicTemplate props" : "components"}: ${missing.join(", ")}`,
      ).toEqual([]);
    });

    it("orders synthesis components correctly (KLP → Quiz → Refs → SeeAlso → Toggle)", () => {
      // TopicTemplate owns the ordering, so this only applies to legacy topics.
      if (usesTemplate) return;
      const present = LEGACY_REQUIRED.map(({ name, marker }) => ({
        name,
        pos: content.indexOf(marker),
      })).filter(({ pos }) => pos !== -1);
      const outOfOrder: string[] = [];
      for (let i = 0; i < present.length - 1; i++) {
        if (present[i].pos > present[i + 1].pos) {
          outOfOrder.push(`${present[i].name} appears after ${present[i + 1].name}`);
        }
      }
      expect(
        outOfOrder,
        `${file} has components out of order: ${outOfOrder.join("; ")}`,
      ).toEqual([]);
    });
  });
});

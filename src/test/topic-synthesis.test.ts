import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Standing audit: every topic page must include the full synthesis stack
 * in the canonical order:
 *   KeyLearningPoints → QuizSection → ReferencesList → SeeAlso → TopicCompletionToggle
 *
 * Rationale: ensures consistent learner experience (summary, self-test,
 * citations, cross-links, completion tracking) at the bottom of every topic.
 *
 * If a topic legitimately needs to opt out of a component, add its filename
 * to ALLOWED_MISSING below with a justification.
 */

const TOPICS_DIR = join(__dirname, "..", "pages", "topics");

const REQUIRED_COMPONENTS = [
  { name: "KeyLearningPoints", marker: "<KeyLearningPoints" },
  { name: "QuizSection", marker: "<QuizSection" },
  { name: "ReferencesList", marker: "<ReferencesList" },
  { name: "SeeAlso", marker: "<SeeAlso" },
  { name: "TopicCompletionToggle", marker: "<TopicCompletionToggle" },
] as const;

// Per-file opt-outs. Key = filename, value = list of component names allowed
// to be missing (with brief justification in a comment).
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
    const positions = REQUIRED_COMPONENTS.map(({ name, marker }) => ({
      name,
      pos: content.indexOf(marker),
    }));

    /**
     * Intro paragraph audit: every topic should open with prose
     * (a `<p>` element) before the first table, diagram, or grid.
     * Rationale: orients the learner before plunging into structured
     * data — improves scanability and exam-style framing.
     */
    it("opens with an intro <p> before any table/diagram/grid", () => {
      const start = content.indexOf("<SectionLayout");
      expect(start, "<SectionLayout> not found").toBeGreaterThan(-1);
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

    const allowedMissing = ALLOWED_MISSING[file] ?? [];

    it("includes all required synthesis components", () => {
      const missing = positions
        .filter(({ name, pos }) => pos === -1 && !allowedMissing.includes(name))
        .map(({ name }) => name);
      expect(
        missing,
        `${file} is missing required components: ${missing.join(", ")}`,
      ).toEqual([]);
    });

    it("orders synthesis components correctly (KLP → Quiz → Refs → SeeAlso → Toggle)", () => {
      const present = positions.filter(({ pos }) => pos !== -1);
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

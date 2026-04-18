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
const ALLOWED_MISSING: Record<string, string[]> = {
  // Add entries here as needed, e.g.:
  // "SomeStubTopic.tsx": ["QuizSection"], // placeholder topic, no quiz authored yet
};

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

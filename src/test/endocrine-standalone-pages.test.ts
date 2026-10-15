import { describe, expect, it } from "vitest";
import { topicReferences } from "@/data/references";

// Standalone endocrine pages reuse verified records from the parent page; shared labels must keep identical wording.
describe("standalone endocrine emergency pages", () => {
  const parent = topicReferences["icu-endocrine-emergencies"];
  for (const topic of ["thyroid-storm", "adrenal-crisis", "pituitary-apoplexy"]) {
    it(`${topic} quotations match the parent records and stay within limits`, () => {
      const refs = topicReferences[topic];
      expect(refs.length).toBeGreaterThan(3);
      for (const ref of refs) {
        const shared = parent.find((p) => p.label === ref.label);
        if (shared) expect(ref.excerpt).toBe(shared.excerpt);
        if (ref.excerpt) expect(ref.excerpt.length).toBeLessThanOrEqual(600);
      }
    });
  }
});

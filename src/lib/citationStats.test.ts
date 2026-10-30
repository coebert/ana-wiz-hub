import { describe, it, expect } from "vitest";
import { roundDown, citationStats } from "./citationStats";
import { computeStats } from "../../scripts/lib/compute-citation-stats";

describe("GOV01 citation stats", () => {
  it("zero-entry fixture shows zero, not 10+", () => {
    const s = computeStats({}, []);
    expect(s.totalReferenceEntries).toBe(0);
    expect(roundDown(s.totalReferenceEntries)).toBe(0);
    expect(roundDown(2870)).toBe(2870);
    expect(roundDown(2858)).toBe(2850);
  });
  it("topics come from registered IDs, not reference pools; duplicates are entries not unique texts", () => {
    const s = computeStats(
      { a: [{ citation: "X", url: "u" }, { citation: "x", url: "u" }], legacy: [{ citation: "Y" }], b: [] },
      ["a", "b", "a"],
    );
    expect(s).toMatchObject({ totalReferenceEntries: 3, uniqueReferenceTexts: 2, uniqueUrls: 1, referencePoolsWithReferences: 2, registeredTopics: 2, registeredTopicsWithReferences: 1 });
  });
  it("generated JSON reports registered topics separately from pools", () => {
    expect(citationStats.registeredTopics).toBeLessThanOrEqual(citationStats.referencePoolsWithReferences);
  });
});

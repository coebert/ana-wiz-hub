import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { intensiveCareTopics } from "../data/curriculum";
import { topicReferences } from "../data/references";

describe("consolidated ICU costs", () => {
  it("registers exactly one ICU cost curriculum topic", () => {
    expect(intensiveCareTopics.filter((t) => t.id.startsWith("icu-cost")).map((t) => t.id)).toEqual(["icu-costs"]);
  });

  it.each(["icu-cost-timeline", "icu-cost-by-country", "icu-cost-by-condition"])("retains every source from %s in the unified bibliography", (id) => {
    const oldSources = topicReferences[id];
    expect(oldSources.length).toBeGreaterThan(0);
    for (const source of oldSources) {
      const merged = topicReferences["icu-costs"].find((r) => r.label === source.label);
      expect(merged).toEqual(source);
    }
  });

  it("has unique source labels and retains post-discharge evidence", () => {
    const labels = topicReferences["icu-costs"].map((r) => r.label);
    expect(new Set(labels).size).toBe(labels.length);
    expect(labels).toContain("Lone 2016 hospital costs");
  });

  it("retains complete teaching in the private audit corpus", () => {
    const corpus = JSON.parse(readFileSync("data-build/audit-corpus.json", "utf8"));
    const entries = Array.isArray(corpus) ? corpus : corpus.topics;
    const entry = entries.find((t: { topic_id: string }) => t.topic_id === "icu-costs");
    expect(entry).toBeDefined();
    for (const module of ["IcuCostLosTeaching", "IcuCostTimelineTeaching", "IcuCostByCountryTeaching", "IcuCostByConditionTeaching", "IcuCostCalculator"]) {
      expect(entry.source_files).toContain(`src/components/topic/${module}.tsx`);
    }
  });
});
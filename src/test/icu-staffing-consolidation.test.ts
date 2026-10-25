import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { intensiveCareTopics } from "../data/curriculum";
import { topicReferences } from "../data/references";

describe("consolidated ICU staffing", () => {
  it("registers one staffing curriculum topic", () => {
    expect(intensiveCareTopics.filter((t) => t.id.startsWith("icu-staffing")).map((t) => t.id)).toEqual(["icu-staffing-ratios"]);
  });

  it.each(["icu-staffing-by-unit", "icu-staffing-by-country"])("preserves every source from %s", (id) => {
    expect(topicReferences[id].length).toBeGreaterThan(0);
    for (const source of topicReferences[id]) {
      expect(topicReferences["icu-staffing-ratios"].find((r) => r.label === source.label)).toEqual(source);
    }
  });

  it("has unique merged reference labels", () => {
    const labels = topicReferences["icu-staffing-ratios"].map((r) => r.label);
    expect(new Set(labels).size).toBe(labels.length);
  });

  it("retains all three teaching modules in the private audit", () => {
    const corpus = JSON.parse(readFileSync("data-build/audit-corpus.json", "utf8"));
    const entry = corpus.entries.find((t: { topic_id: string }) => t.topic_id === "icu-staffing-ratios");
    expect(entry).toBeDefined();
    for (const module of ["IcuStaffingTeaching", "IcuStaffingByUnitTeaching", "IcuStaffingByCountryTeaching"]) {
      expect(entry.source_files).toContain(`src/components/topic/${module}.tsx`);
    }
    expect(entry.text_chars).toBeGreaterThan(24000);
  });
});
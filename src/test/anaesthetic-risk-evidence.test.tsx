import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { topicReferences } from "@/data/references";
import { getTopic } from "@/data/topic";
import { anaestheticEventEstimates } from "@/components/topic/AnaestheticAdverseEventsTeaching";
import { anaestheticRiskQuiz } from "@/data/anaestheticRiskQuiz";

const find = (id: string) => anaestheticEventEstimates.find(row => row.id === id);
describe("Source-qualified anaesthetic risk evidence", () => {
  it("retains the NAP5 report-based denominator", () => {
    expect(find("awareness")?.per).toBe(19600);
    expect(find("awareness")?.events).toBe(1);
    expect(find("awareness")?.label).toBe("NAP5 incidence");
  });
  it("retains severe anaphylaxis separately from arrest", () => {
    expect(find("anaphylaxis")?.events).toBe(1);
    expect(find("anaphylaxis")?.per).toBe(10000);
    expect(find("arrest")?.events).toBe(3);
    expect(find("arrest")?.per).toBe(10000);
  });
  it("retains the RCoA dental endpoint and frequency", () => {
    expect(find("dental")?.events).toBe(5);
    expect(find("dental")?.per).toBe(10000);
    expect(find("dental")?.label).toBe("RCoA dental injury");
  });
  it("retains common side-effect ranges without replacing them with serious harms", () => {
    expect(find("throat")?.events).toEqual([20, 40]);
    expect(find("sickness")?.events).toBe(17);
  });
  it("retains historical airway composite denominator", () => {
    expect(find("airway")?.events).toBe(46);
    expect(find("airway")?.per).toBe(1000000);
  });
  it("has distinct source records and no dangling lesson citations", () => {
    const refs = topicReferences["anaesthetic-risk"];
    expect(new Set(refs.map(r => r.label)).size).toBe(refs.length);
    for (const r of refs) {
      expect(r.url).toMatch(/^https:\/\//);
      if (r.excerpt) expect(r.excerpt.length).toBeLessThanOrEqual(600);
    }
    for (const file of ["AnaestheticRiskTeaching", "AnaestheticAdverseEventsTeaching", "RegionalAnaesthesiaRiskTeaching"]) {
      const source = readFileSync(`src/components/topic/${file}.tsx`, "utf8");
      for (const match of source.matchAll(/<R label="([^"]+)"/g)) expect(refs.some(r => r.label === match[1])).toBe(true);
    }
    for (const row of anaestheticEventEstimates) expect(refs.some(r => r.label === row.label)).toBe(true);
  });
  it("registers the topic and makes its quiz available through the shared facade", () => {
    const topic = getTopic("anaesthetic-risk");
    expect(topic?.section).toBe("perioperative");
    expect(topic?.available).toBe(true);
    expect(topic?.quiz).toEqual(anaestheticRiskQuiz);
    expect(topic?.quiz.length).toBe(14);
  });
});
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { topicReferences } from "@/data/references";

describe("Contrast AKI evidence integrity", () => {
  const references = topicReferences["aki-rrt"] ?? [];
  it("resolves every teaching citation to a curated source", () => {
    const source = readFileSync("src/components/topic/ContrastAkiTeaching.tsx", "utf8");
    const labels = [...source.matchAll(/<R label="([^"]+)"/g)].map(m => m[1]);
    expect(labels.length).toBeGreaterThan(20);
    for (const label of labels) expect(references.find(r => r.label === label)?.url, label).toBeTruthy();
  });
  it("preserves trial excerpts from the shared original records", () => {
    for (const label of ["Nijssen 2017 AMACING", "Weisbord 2018 PRESERVE"]) {
      const renal = references.find(r => r.label === label);
      const ir = topicReferences["interventional-radiology"].find(r => r.label === label);
      expect(renal?.excerpt).toBeTruthy();
      expect(renal?.excerpt).toBe(ir?.excerpt);
    }
  });
  it("keeps current guideline and trial excerpts short and nonempty", () => {
    for (const label of ["NICE NG148 2024 contrast", "ACR 2026 contrast prevention", "ESUR current contrast risk", "Nyman 2026 contrast review", "Ferguson 2025 ICU contrast"]) {
      const excerpt = references.find(r => r.label === label)?.excerpt;
      expect(excerpt?.length ?? 0).toBeGreaterThan(40);
      expect(excerpt?.length ?? 1000).toBeLessThanOrEqual(600);
    }
  });
});
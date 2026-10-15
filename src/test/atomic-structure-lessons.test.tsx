import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import * as L from "@/components/topic/AtomicStructureTeaching";
import { topicReferences } from "@/data/references";
import { atomicStructureQuiz } from "@/data/quizzes";

describe("atomic structure lessons", () => {
  it("renders each lesson with substance", () => {
    for (const C of [L.AtomsIonsTeaching, L.ElectronegativityTeaching, L.HydrogenBondingTeaching, L.CarbonFluorineTeaching, L.VapourPressureTeaching]) {
      const { container, unmount } = render(<MemoryRouter><C /></MemoryRouter>);
      expect(container.textContent!.length).toBeGreaterThan(800);
      expect(container.textContent).toMatch(/Learning check/);
      unmount();
    }
  });
  it("teaches the Tec 6 altitude behaviour correctly", () => {
    const { container } = render(<MemoryRouter><L.VapourPressureTeaching /></MemoryRouter>);
    expect(container.textContent).toMatch(/constant volume concentration/);
  });
  it("has no unverifiable BJA 2010 source and excerpts are bounded", () => {
    const refs = topicReferences["atomic-structure-bonding"];
    expect(refs.find(r => r.label === "BJA Educ 2010")).toBeUndefined();
    for (const r of refs) if (r.excerpt) expect(r.excerpt.length).toBeLessThanOrEqual(600);
    expect(atomicStructureQuiz.length).toBe(7);
  });
});

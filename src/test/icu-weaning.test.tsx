import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import { topicReferences } from "@/data/references";
import { ICUWeaningTeaching } from "@/components/topic/ICUWeaningTeaching";

vi.mock("@/components/references/InlineRef", () => ({ InlineRef: ({ refLabel }: { refLabel: string }) => <span>{refLabel}</span> }));
afterEach(cleanup);

describe("ICU weaning lesson", () => {
  it("renders readiness, trial conduct, intolerance and the extubation distinction", () => {
    const { container } = render(<ICUWeaningTeaching />);
    expect(container.textContent?.length).toBeGreaterThan(4500);
    for (const name of ["Readiness is a clinical screen, not an RSBI gate", "Conducting a spontaneous breathing trial", "Recognising intolerance and planning the next attempt", "Passing an SBT is not permission to extubate"]) {
      expect(screen.getByRole("heading", { name })).toBeInTheDocument();
    }
    expect(screen.getByText("Sources for this lesson")).toBeInTheDocument();
    expect(container.textContent).not.toContain("is missing from the topic list");
    const check = screen.getByText(/Learning check: a patient completes/);
    fireEvent.click(check);
    expect(check.closest("details")).toHaveAttribute("open");
  });
  it("resolves all source labels with short excerpts and is placed in a searchable subsection", () => {
    const teaching = readFileSync("src/components/topic/ICUWeaningTeaching.tsx", "utf8");
    const refs = topicReferences["mechanical-ventilation"];
    for (const m of teaching.matchAll(/<R label="([^"]+)"/g)) {
      const ref = refs.find(r => r.label === m[1]);
      expect(ref, m[1]).toBeDefined();
      expect(ref?.excerpt?.length).toBeGreaterThan(20);
      expect(ref?.excerpt?.length).toBeLessThanOrEqual(600);
    }
    const page = readFileSync("src/pages/topics/MechanicalVentilationTopic.tsx", "utf8");
    expect(page).toContain('<CollapsibleSubsection title="7. ICU Weaning: Readiness & Spontaneous Breathing Trials"');
    expect(page).toContain("<ICUWeaningTeaching />");
    expect(page).not.toContain("WIND classification:");
    expect(page).not.toContain('detail: "Adequate spontaneous breathing on minimal support. RSBI (f/VT) <105."');
  });
});
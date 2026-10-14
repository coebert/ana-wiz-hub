import { render, screen, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import { topicReferences } from "@/data/references";
import { intensiveCareTopics } from "@/data/curriculum";
import { AlkalosisMechanismsTeaching, AlkalosisAssessmentTeaching, AlkalosisCausesTeaching, AlkalosisTreatmentTeaching, AlkalosisSafetyTeaching } from "@/components/topic/MetabolicAlkalosisTeaching";
vi.mock("@/components/references/InlineRef", () => ({ InlineRef: ({ refLabel }: { refLabel: string }) => <span>{refLabel}</span> }));
afterEach(cleanup);
describe("Metabolic alkalosis sourced lessons", () => {
  it.each([AlkalosisMechanismsTeaching, AlkalosisAssessmentTeaching, AlkalosisCausesTeaching, AlkalosisTreatmentTeaching, AlkalosisSafetyTeaching])("renders substantive teaching, a check and resolved sources", Lesson => {
    const { container } = render(<Lesson />);
    expect(container.textContent?.length).toBeGreaterThan(1800);
    expect(screen.getByText("Sources for this lesson")).toBeInTheDocument();
    expect(screen.getByText(/Learning check:/)).toBeInTheDocument();
    expect(container.textContent).not.toContain("is missing from the topic list");
  });
  it("registers and links the topic and resolves every cited label", () => {
    expect(intensiveCareTopics.some(t => t.id === "metabolic-alkalosis" && t.available)).toBe(true);
    expect(readFileSync("src/routes/topicRoutes.ts", "utf8")).toContain('["/intensive-care/metabolic-alkalosis", "MetabolicAlkalosisTopic"]');
    expect(readFileSync("src/pages/topics/AcidBaseTopic.tsx", "utf8")).toContain('to="/intensive-care/metabolic-alkalosis"');
    const refs = topicReferences["metabolic-alkalosis"];
    for (const match of readFileSync("src/components/topic/MetabolicAlkalosisTeaching.tsx", "utf8").matchAll(/<R label="([^"]+)"/g)) expect(refs.some(r => r.label === match[1]), match[1]).toBe(true);
    for (const ref of refs) { expect(ref.excerpt?.length).toBeGreaterThan(20); expect(ref.excerpt?.length).toBeLessThanOrEqual(600); }
    expect(refs.filter(r => r.label.startsWith("BJA")).every(r => r.citation.includes("Park M, Sidebotham D") && r.url?.includes("PMC10028421"))).toBe(true);
  });
  it("does not attribute urine chloride to BJA or promise faster weaning", () => {
    render(<><AlkalosisAssessmentTeaching /><AlkalosisTreatmentTeaching /></>);
    expect(screen.getByText(/AJKD Core Curriculum review—not the BJA article/)).toBeInTheDocument();
    expect(screen.getByText(/did not show a shorter duration/)).toBeInTheDocument();
  });
});

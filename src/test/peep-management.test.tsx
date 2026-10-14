import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { readFileSync } from "node:fs";
import { topicReferences } from "@/data/references";
import { intensiveCareTopics } from "@/data/curriculum";
import { breathTiming } from "@/lib/peep-teaching";
import PEEPTimingDiagram from "@/components/diagrams/intensive-care/PEEPTimingDiagram";
import { PEEPFoundationsTeaching, PEEPLungProtectionTeaching, PEEPTitrationTeaching, PEEPSettingsTeaching, PEEPSafetyTeaching } from "@/components/topic/PEEPManagementTeaching";
import { PEEPCaseTeaching } from "@/components/topic/PEEPCaseTeaching";
vi.mock("@/components/references/InlineRef", () => ({ InlineRef: ({ refLabel }: { refLabel: string }) => <span>{refLabel}</span> }));
afterEach(cleanup);
describe("PEEP management source-led teaching", () => {
  it("renders three explicitly fictional cases, observed transitions and worked answers", () => {
    const { container } = render(<MemoryRouter><PEEPCaseTeaching /></MemoryRouter>);
    expect(container.querySelectorAll('[data-peep-case]')).toHaveLength(3);
    expect(container.querySelectorAll('table')).toHaveLength(3);
    expect(screen.getAllByText(/Learning check:/)).toHaveLength(3);
    expect(screen.getByText(/Fictional adult ICU teaching cases/)).toBeInTheDocument();
    expect(screen.getByText('17 − 5 = 12 cmH₂O')).toBeInTheDocument();
    expect(screen.getByText('630 mL = 9 mL/kg PBW after obstruction improves')).toBeInTheDocument();
    expect(screen.getByText(/Do not report a precise intrinsic PEEP/)).toBeInTheDocument();
    expect(container.textContent).not.toContain('is missing from the topic list');
    const refs = topicReferences['peep-management'];
    for (const m of readFileSync('src/components/topic/PEEPCaseTeaching.tsx','utf8').matchAll(/<R label="([^"]+)"/g)) expect(refs.some(r => r.label === m[1]), m[1]).toBe(true);
    expect(breathTiming(22,1)?.expiration).toBeCloseTo(1.72727);
    expect(breathTiming(12,0.35)?.expiration).toBeCloseTo(4.65);
    expect(560*22/1000).toBeCloseTo(12.32);
    expect(420*12/1000).toBeCloseTo(5.04);
  });
  it.each([PEEPFoundationsTeaching, PEEPLungProtectionTeaching, PEEPTitrationTeaching, PEEPSettingsTeaching, PEEPSafetyTeaching])("renders a sourced substantive lesson with a learning check", Lesson => {
    const { container } = render(<MemoryRouter><Lesson /></MemoryRouter>);
    expect(container.textContent?.length).toBeGreaterThan(1600);
    expect(screen.getByText("Sources for this lesson")).toBeInTheDocument();
    expect(screen.getAllByText(/Learning check:/).length).toBeGreaterThan(0);
    expect(container.textContent).not.toContain("is missing from the topic list");
  });
  it("registers the page beside mechanical ventilation and resolves all explicit references", () => {
    expect(intensiveCareTopics.some(t => t.id === "peep-management" && t.available)).toBe(true);
    expect(readFileSync("src/routes/topicRoutes.ts", "utf8")).toContain('["/intensive-care/peep-management", "PEEPManagementTopic"]');
    const refs = topicReferences["peep-management"];
    for (const path of ["src/components/topic/PEEPManagementTeaching.tsx", "src/components/diagrams/intensive-care/PEEPTimingDiagram.tsx"]) {
      for (const match of readFileSync(path, "utf8").matchAll(/(?:<R label|refLabel)="([^"]+)"/g)) {
        if (match[1].includes("PEEP breath")) continue;
        expect(refs.some(r => r.label === match[1]), match[1]).toBe(true);
      }
    }
    for (const ref of refs) { expect(ref.excerpt?.length).toBeGreaterThan(30); expect(ref.excerpt?.length).toBeLessThanOrEqual(600); }
  });
  it("distinguishes conditional higher PEEP from harmful prolonged recruitment", () => {
    render(<MemoryRouter><PEEPTitrationTeaching /><PEEPSafetyTeaching /></MemoryRouter>);
    expect(screen.getAllByText(/conditionally suggests higher/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/strongly recommends against prolonged/).length).toBeGreaterThan(0);
    expect(screen.getByText(/ESICM 2023 made no recommendation/)).toBeInTheDocument();
  });
  it("calculates expiration without modelling patient PEEP", () => {
    expect(breathTiming(12, 1)?.expiration).toBe(4);
    expect(breathTiming(24, 1)?.expiration).toBe(1.5);
    expect(breathTiming(30, 2.5)).toBeNull();
    expect(breathTiming(0, 1)).toBeNull();
    render(<PEEPTimingDiagram />);
    fireEvent.change(screen.getByLabelText("Respiratory rate"), { target: { value: "24" } });
    expect(screen.getByRole("status")).toHaveTextContent("Expiratory time 1.50 s");
    fireEvent.change(screen.getByLabelText("Inspiratory time"), { target: { value: "2.5" } });
    expect(screen.getByRole("status")).toHaveTextContent("No expiratory time remains");
    fireEvent.click(screen.getByRole("button", { name: "Reset timing" }));
    expect(screen.getByRole("status")).toHaveTextContent("Expiratory time 4.00 s");
  });
});

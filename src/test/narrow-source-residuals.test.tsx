import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { readFileSync } from "node:fs";
import { anaesthesiaCalcDrugs } from "@/data/anaesthesiaCalculatorDrugs";
import { icuDrugDoseGroups } from "@/data/icuDrugDoses";
import { anaesthesiaDrugDoseGroups } from "@/data/anaesthesiaDrugDoses";
import { topicReferences } from "@/data/references";
import { calculateAnaesthesiaDose } from "@/lib/anaesthesia-dose-calculation";
import Calculator from "@/pages/AnaesthesiaDrugCalculator";

vi.mock("@/components/topic/TopicTemplate", () => ({ TopicTemplate: (props: { coreConcepts?: React.ReactNode }) => <>{props.coreConcepts}</> }));
vi.mock("@/components/exam/ExamSection", () => ({ ExamSection: (props: { children: React.ReactNode }) => <>{props.children}</> }));
vi.mock("@/components/references/InlineRef", () => ({ InlineRef: ({ topicId, refLabel }: { topicId: string; refLabel: string }) => {
  const ref = topicReferences[topicId]?.find(r => r.label === refLabel);
  return <a href={ref?.url}>{refLabel}</a>;
} }));
// Native select preserves actual page state changes without JSDOM pointer APIs.
vi.mock("@/components/ui/select", () => ({
  Select: ({ children, value, onValueChange }: { children: React.ReactNode; value: string; onValueChange: (value: string) => void }) => <select aria-label="Drug" value={value} onChange={e => onValueChange(e.target.value)}>{children}</select>,
  SelectItem: ({ children, value }: { children: React.ReactNode; value: string }) => <option value={value}>{children}</option>,
  SelectContent: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  SelectGroup: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  SelectLabel: () => null, SelectTrigger: () => null, SelectValue: () => null,
}));
afterEach(cleanup);
const wrap = (node: React.ReactNode) => <HelmetProvider><MemoryRouter>{node}</MemoryRouter></HelmetProvider>;
describe("named source residual safety boundaries", () => {
  it.each([5, 10, 14, 50, 70])("actual calculator withholds generic IV paracetamol at %s kg", weight => {
    const drug = anaesthesiaCalcDrugs.find(d => d.drug === "Paracetamol (IV)");
    if (!drug) throw new Error("Missing IV paracetamol");
    expect(calculateAnaesthesiaDose(drug, 15, weight, 10)).toBeNull();
    const { container } = render(wrap(<Calculator />));
    const input = container.querySelector<HTMLInputElement>("#anaes-weight");
    if (!input) throw new Error("Missing actual weight input");
    fireEvent.change(input, { target: { value: String(weight) } });
    fireEvent.change(screen.getByRole("combobox", { name: "Drug" }), { target: { value: drug.drug } });
    expect(screen.getByRole("heading", { name: "Paracetamol (IV) — product reference" })).toBeTruthy();
    expect(container.querySelector("#anaes-dose, #anaes-weight, #anaes-ideal-weight, #anaes-conc")).toBeNull();
    expect(screen.queryByText(/Usual range/)).toBeNull();
    expect(screen.getByText(/Guideline lookup only: no universal dose is calculated/)).toBeTruthy();
    expect(container.querySelector("dd")).toBeNull();
    expect(screen.getByText(/≤10 kg 7.5 mg\/kg\/dose, max 30 mg\/kg\/day/)).toBeTruthy();
    expect(screen.getByRole("link", { name: "Named product / guideline source" }).getAttribute("href")).toBe("https://www.medicines.org.uk/emc/product/100803/smpc");
  });
  it("switches calculable → lookup-only → calculable on the real page, preserving weight and restoring drug defaults", () => {
    const initial = anaesthesiaCalcDrugs[0];
    const { container } = render(wrap(<Calculator />));
    fireEvent.change(screen.getByLabelText("Patient weight (kg)"), { target: { value: "10" } });
    fireEvent.change(screen.getByLabelText(`Dose (${initial.unit})`), { target: { value: "1" } });
    for (const lookup of anaesthesiaCalcDrugs.filter(d => d.lookupOnly)) {
      fireEvent.change(screen.getByRole("combobox", { name: "Drug" }), { target: { value: lookup.drug } });
      expect(screen.getByRole("heading", { name: `${lookup.drug} — product reference` })).toBeTruthy();
      expect(container.querySelector("input, dd")).toBeNull();
      expect(container.textContent).toContain(lookup.notes);
      expect(screen.queryByText(/Usual range/)).toBeNull();
    }
    fireEvent.change(screen.getByRole("combobox", { name: "Drug" }), { target: { value: initial.drug } });
    expect(screen.getByRole("heading", { name: `${initial.drug} — calculated dose` })).toBeTruthy();
    expect(screen.getByLabelText("Patient weight (kg)").getAttribute("value")).toBe("10");
    expect(screen.getByLabelText(`Dose (${initial.unit})`).getAttribute("value")).toBe(String(initial.startDose));
    expect(screen.getByLabelText(`Concentration (${initial.amountUnit}/mL)`).getAttribute("value")).toBe(String(initial.concentrationPerMl));
    expect(container.querySelector("dd")).not.toBeNull();
  });
  it("preserves corrected IV paracetamol tables and standalone helper without wiring it into calculator", () => {
    const icu = icuDrugDoseGroups.flatMap(g => g.drugs).find(d => d.drug === "Paracetamol");
    const anaes = anaesthesiaDrugDoseGroups.flatMap(g => g.drugs).find(d => d.drug === "Paracetamol");
    expect(icu?.paediatricDose).toContain("≤10 kg 7.5 mg/kg");
    expect(anaes?.dose).toContain("≤10 kg 7.5 mg/kg");
    expect(readFileSync("src/pages/AnaesthesiaDrugCalculator.tsx", "utf8")).not.toContain("ivParacetamolLimits");
  });
  it("atropine follows the selected PLS maximum and adult exclusions", () => {
    const doses = icuDrugDoseGroups.flatMap(g => g.drugs);
    expect(doses.find(d => d.drug === "Atropine")?.paediatricDose).toContain("20 micrograms/kg IV, maximum 500 micrograms");
    expect(doses.find(d => d.drug === "Atropine")?.dose).toContain("cardiac-transplant patients or high-degree AV block with wide QRS");
    expect(doses.find(d => d.drug === "Suxamethonium")?.paediatricNotes).toContain("does not advise routine atropine premedication");
  });
  it("bupivacaine cumulative four-hour note does not alter existing arithmetic", () => {
    const drug = anaesthesiaCalcDrugs.find(d => d.drug.startsWith("Bupivacaine —"));
    if (!drug) throw new Error("Missing bupivacaine");
    expect(drug.notes).toContain("no more than 2 mg/kg in any four-hour period, including prior doses");
    expect(calculateAnaesthesiaDose(drug, 2, 100, 2.5)).toMatchObject({ amount: 150, volumeMl: 60 });
  });
  it("renders the corrected CICO block and all three resolving current references", async () => {
    const Topic = (await import("@/pages/topics/ClinicalIncidentsTopic")).default;
    const { container } = render(wrap(<Topic />));
    const text = container.textContent ?? "";
    expect(text).toContain("do not wait for a numerical oxygen-saturation threshold");
    expect(text).toContain("default to a midline vertical skin incision");
    expect(screen.getAllByRole("link", { name: "DAS 2025", hidden: true })).toHaveLength(3);
    for (const link of screen.getAllByRole("link", { name: "DAS 2025", hidden: true })) expect(link.getAttribute("href")).toBe("https://das.uk.com/new-das-2025-intubation-guidelines/");
    expect(topicReferences["clinical-incidents"].find(r => r.label === "DAS 2025")?.citation).toContain("10.1016/j.bja.2025.10.006");
  });
  it("renders the corrected paediatric propofol and dexmedetomidine blocks", async () => {
    const Topic = (await import("@/pages/topics/PaediatricIcuTopic")).default;
    const { container } = render(wrap(<Topic />));
    expect(container.textContent).toContain("this has no short-duration exemption");
    expect(container.textContent).toContain("respiratory depression, airway obstruction and apnoea can occur");
    expect(container.textContent).not.toContain("Where prolonged infusion is unavoidable");
  });
});
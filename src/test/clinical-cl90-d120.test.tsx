import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import PaediatricIcuTopic, { PAEDIATRIC_SEPSIS_2026_SUMMARY as shock, PAEDIATRIC_SEPSIS_ANTIBIOTICS_2026 as antibiotics, PAEDIATRIC_SEPSIS_STEROIDS_2026 as steroids } from "@/pages/topics/PaediatricIcuTopic";
import { icuDrugSafetyGroups } from "@/data/icuDrugSafety";
import { DrugResidualSources } from "@/components/icu/DrugResidualSources";
import { referenceLabels } from "../../scripts/lib/reference-labels";
import { extractFaqsByPath } from "../../scripts/extract-faqs";
afterEach(cleanup);
const safety = (slug: string) => {
  const found = icuDrugSafetyGroups.flatMap(g => g.drugs).find(d => d.slug === slug);
  if (!found) throw new Error(`Missing ${slug}`);
  return found;
};
describe("CL90 SSC Children 2026 boundaries", () => {
  it("uses reassessed UK 10 mL/kg, no mandatory phenotype choice or fluid prerequisite", () => {
    expect(shock).toContain("10 mL/kg isotonic crystalloid boluses");
    expect(shock).toContain("Evidence does not establish one preferred first-line agent");
    expect(shock).toContain("cold/warm labels do not mandate drug selection");
    expect(shock).toContain("do not require 40–60 mL/kg or a fixed fluid threshold before vasoactives");
    expect(shock).toContain("Peripheral vasoactive initiation");
    expect(shock).toContain("not an isolated diagnostic equality");
    expect(PaediatricIcuTopic().props.keyPoints.some((p: {text: string}) => p.text === shock)).toBe(true);
  });
  it("separates shock 1-hour and substantiated no-shock 3-hour timing with difficult evaluation exception", () => {
    expect(antibiotics).toContain("Suspected septic shock");
    expect(antibiotics).toContain("ideally within 1 hour");
    expect(antibiotics).toContain("Probable sepsis without shock");
    expect(antibiotics).toContain("if concern is substantiated");
    expect(antibiotics).toContain("ideally within 3 hours");
    expect(antibiotics).toContain("If timely evaluation is difficult");
  });
  it("separates restored stability, unresolved evidence and adrenal replacement", () => {
    expect(steroids).toContain("suggests against IV hydrocortisone when fluids and vasoactive therapy restore");
    expect(steroids).toContain("insufficient evidence for a recommendation either way");
    expect(steroids).toContain("suspected or documented adrenal insufficiency");
    expect(PaediatricIcuTopic().props.objectives).not.toContain("Manage paediatric septic shock with 10 mL/kg crystalloid boluses reassessed after each (20 mL/kg reserved for profound shock), early vasopressors, and stress-dose hydrocortisone.");
  });
  it("actual FAQ extraction retains all three summaries and resolving current source mappings", () => {
    const faq = extractFaqsByPath()["/intensive-care/paediatric-icu"].find(([q]) => q.includes("fluid resuscitation strategy"));
    expect(faq?.[1]).toContain(shock);
    expect(faq?.[1]).toContain(antibiotics);
    expect(faq?.[1]).toContain(steroids);
    const labels = referenceLabels().get("paediatric-icu");
    for (const label of ["SSC Children 2026 antibiotics", "SSC Children 2026 vasoactives", "SSC Children 2026 corticosteroids"]) expect(labels?.has(label)).toBe(true);
  });
});
describe("D120 product-specific compatibility", () => {
  it("neonatal anticipated IV calcium is contraindicated regardless of line/timing/flushing", () => {
    for (const slug of ["calcium-gluconate", "ceftriaxone"]) {
      const text = safety(slug).contraindications.join(" ");
      expect(text).toContain("28 days or less");
      expect(text).toMatch(/expected to need IV calcium/);
      expect(text).toMatch(/lines|Different lines/);
      expect(text).toMatch(/timing/);
    }
    expect(safety("ceftriaxone").contraindications.join(" ")).toContain("41 weeks postmenstrual age");
  });
  it("B Braun retains no simultaneous permission and hypovolaemia restriction; older sequential use is conditional", () => {
    for (const slug of ["calcium-gluconate", "ceftriaxone"]) {
      const text = safety(slug).interactions.join(" ");
      expect(text).toMatch(/separate lines\/sites/);
      expect(text).toContain("sequential");
      expect(text).toContain("physiological saline flushing");
      expect(text).toContain("hypovolaemia");
      expect(text).toContain("pharmacy");
    }
    expect(safety("calcium-gluconate").interactions[0]).toContain("do not transfer another product's exception");
  });
  it("does not prescribe a ceftriaxone reduction for probenecid", () => {
    expect(safety("ceftriaxone").interactions.join(" ")).toContain("Probenecid does not reduce ceftriaxone elimination");
  });
  it("existing source presentation renders exact product destinations and scoped review notes", () => {
    render(<DrugResidualSources groupId="infection" />);
    expect(screen.getByRole("link", { name: "Hameln ceftriaxone calcium compatibility" })).toHaveAttribute("href", "https://www.medicines.org.uk/emc/product/102127/smpc");
    expect(screen.getByRole("link", { name: "B Braun calcium gluconate compatibility" })).toHaveAttribute("href", "https://www.medicines.org.uk/emc/product/15226/smpc");
    expect(screen.getByRole("link", { name: "Calcium chloride compatibility SmPC" })).toHaveAttribute("href", "https://www.medicines.org.uk/emc/product/4126/smpc");
    expect(screen.getByText(/not whole-record validation/)).toBeInTheDocument();
  });
});
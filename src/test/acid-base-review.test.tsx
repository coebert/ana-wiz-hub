import { renderToStaticMarkup } from "react-dom/server";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { topicReferences } from "@/data/references";
import { HAGMATeaching, NAGMATeaching, OsmolarGapTeaching, StewartTeaching, CitrateTeaching } from "@/components/topic/AcidBaseReviewTeaching";
import StewartDiagram from "@/components/diagrams/intensive-care/StewartAcidBaseDiagram";
import ToxinConverter from "@/components/diagrams/intensive-care/ToxicAlcoholSalicylateCalculator";
import OsmolarCalculator from "@/components/diagrams/intensive-care/OsmolarGapCalculator";

describe("acid-base line-by-line review", () => {
  it.each([HAGMATeaching, NAGMATeaching, OsmolarGapTeaching, StewartTeaching, CitrateTeaching])("retains substantive sourced teaching and a learning check", Lesson => {
    const html = renderToStaticMarkup(<Lesson />);
    expect(html.length).toBeGreaterThan(2500);
    expect(html).toContain("Sources for this lesson");
    expect(html).toContain("Learning check:");
    expect(html).not.toContain("is missing from the topic list");
  });
  it("resolves every explicit source and uses short quotations", () => {
    const source = readFileSync("src/components/topic/AcidBaseReviewTeaching.tsx", "utf8");
    for (const m of source.matchAll(/<R label="([^"]+)"/g)) expect(topicReferences["acid-base"].some(r => r.label === m[1]), m[1]).toBe(true);
    const refs = topicReferences["acid-base"];
    expect(new Set(refs.map(r => r.label)).size).toBe(refs.length);
    for (const r of refs) if (r.excerpt) expect(r.excerpt.length, r.label).toBeLessThanOrEqual(650);
  });
  it("does not retain the tenfold albumin error in linked views", () => {
    for (const path of ["src/pages/topics/AcidBaseTopic.tsx", "src/components/diagrams/intensive-care/HAGMAWorkupFlowchart.tsx"]) {
      expect(readFileSync(path, "utf8")).not.toContain("2.5 × (40 −");
    }
  });
  it("shows weak-acid direction without a false numerical pH", () => {
    render(<StewartDiagram />);
    fireEvent.change(screen.getByLabelText("Total weak acids (A tot)"), { target: { value: "-1" } });
    expect(screen.getByText("Fewer weak acids → alkalinising")).toBeInTheDocument();
    expect(screen.queryByText("Calculated pH")).not.toBeInTheDocument();
  });
  it("converts salicylate using 138.12, not aspirin mass 180", () => {
    render(<ToxinConverter />);
    fireEvent.click(screen.getByRole("button", { name: /^Salicylate$/ }));
    fireEvent.change(screen.getByLabelText("Concentration unit"), { target: { value: "mmol/L" } });
    fireEvent.change(screen.getByLabelText("Salicylate concentration"), { target: { value: "1" } });
    expect(screen.getByRole("status")).toHaveTextContent("138.1 mg/L");
  });
  it("never reassures that a normal osmolar gap excludes exposure", () => {
    render(<OsmolarCalculator />);
    expect(screen.getByText(/does not exclude toxic alcohol poisoning at any stage/)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/Na⁺/), { target: { value: "99" } });
    expect(screen.getByText(/no result is calculated from invalid inputs/)).toBeInTheDocument();
  });
});

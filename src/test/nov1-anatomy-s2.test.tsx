import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Brachial from "@/components/diagrams/anatomy/BrachialPlexusUltrasoundDiagram";
import Intercostal from "@/components/diagrams/anatomy/IntercostalAnatomyDiagram";
import Paravertebral from "@/components/diagrams/anatomy/ParavertebralSpaceDiagram";
import Neck from "@/components/diagrams/anatomy/NeckCrossSectionDiagram";
import Epidural from "@/components/diagrams/anatomy/EpiduralSpaceDiagram";
import Larynx from "@/components/diagrams/anatomy/LaryngealCrossSectionDiagram";
import { EPIDURAL_DOSE_CONTEXT, PARAMEDIAN_DIRECTION, INTERCOSTAL_TARGETS, PRINCIPAL_VAN, NECK_SPATIAL, NECK_FASCIA_CONVENTION, PAEDIATRIC_AIRWAY_DIMENSIONS } from "@/components/topic/AnatomySpatialTeaching";
import { topicReferences } from "@/data/references";
import { extractFaqsByPath } from "../../scripts/extract-faqs";

afterEach(cleanup);
const mount = (Component: React.ComponentType) => render(<MemoryRouter><Component /></MemoryRouter>);

describe("S2 limited anatomy corrections (not anatomical certification)", () => {
  it("SCI052 removes every hazardous plexus shaft/tip and all four invented sonograms", () => {
    const { container } = mount(Brachial);
    for (const name of ["Interscalene", "Supraclavicular", "Infraclavicular", "Axillary"]) {
      fireEvent.click(screen.getByRole("button", { name }));
      expect(screen.getByText(/entire needle shaft and tip must avoid nerves and vessels/)).toBeInTheDocument();
      expect(container.querySelector("svg[viewBox] path[d]" )).toBeNull();
      expect(screen.queryByRole("button", { name: "Needle" })).toBeNull();
    }
  });
  it("SCI053 procedural overlay stays withdrawn; compartment inset stays epidural", () => {
    const { container } = mount(Epidural);
    for (const name of ["Epidural space (fat)", "Tuohy needle (16–18G)", "Dura mater", "Subarachnoid space (CSF)"]) {
      fireEvent.click(screen.getByRole("button", { name }));
      expect(container.textContent).toContain("misleading needle/catheter overlay is withdrawn");
      expect(container.querySelector('[id*="needle"]')).toBeNull();
      expect(container.querySelector('[data-part="catheter-segment"]')).toHaveAttribute("d", "M147 350V180Q147 152 171 127");
    }
  });
  it("SCI057 separates cephalad redirection from skin entry", () => {
    mount(Epidural);
    fireEvent.click(screen.getByRole("button", { name: "Lamina" }));
    expect(screen.getByText(PARAMEDIAN_DIRECTION)).toBeInTheDocument();
    expect(PARAMEDIAN_DIRECTION).toContain("withdraw sufficiently before redirecting cephalad and medially");
    expect(PARAMEDIAN_DIRECTION).toContain("skin-entry position is separate");
  });
  it("SCI056 supplies no universal adult volume-per-dermatome regimen", () => {
    mount(Epidural);
    expect(screen.getByText(new RegExp(EPIDURAL_DOSE_CONTEXT.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")))).toBeInTheDocument();
    expect(EPIDURAL_DOSE_CONTEXT).toContain("no universal adult mL-per-dermatome prescription");
  });
  it("SCI067 mixed chest-wall axes/pleural path are withdrawn in every selection", () => {
    const { container } = mount(Intercostal);
    const buttons = screen.getAllByRole("button").filter(b => !b.getAttribute("aria-label")?.includes("reference"));
    for (const button of buttons) fireEvent.click(button);
    expect(container.textContent).toContain("Depth and craniocaudal position are independent axes");
    expect(container.querySelector('[data-part="catheter"]')).toBeNull();
  });
  it("SCI068 distinguishes three intended injection targets", () => {
    expect(INTERCOSTAL_TARGETS).toContain("target for intercostal nerve block");
    expect(INTERCOSTAL_TARGETS).toContain("ESP injection is deep to erector spinae at the transverse process");
    expect(INTERCOSTAL_TARGETS).toContain("not make these intended injection sites interchangeable");
  });
  it("SCI067 labels toggle controls replacement visual annotations", () => {
    const { container } = mount(Intercostal);
    const before = container.querySelectorAll("svg text").length;
    fireEvent.click(screen.getByRole("button", { name: /Labels/ }));
    expect(container.querySelectorAll("svg text").length).toBeLessThan(before);
  });
  it("SCI069 removes mixed axial ribs and through-cortex route", () => {
    const { container } = mount(Paravertebral);
    expect(container.textContent).toContain("never continue through cortex");
    expect(container.textContent).toContain("separate parasagittal staged view");
    expect(container.querySelector('[data-part="catheter"]')).toBeNull();
  });
  it("SCI070 corrects principal VAN without claiming a collateral rule", () => {
    mount(Paravertebral);
    expect(screen.getByText(PRINCIPAL_VAN)).toBeInTheDocument();
    expect(PRINCIPAL_VAN).toContain("vein–artery–nerve from superior to inferior");
    expect(PRINCIPAL_VAN).toContain("variable collateral bundle");
  });
  it("SCI071 malformed vertebral/cord geometry is replaced with explicit relationships", () => {
    const { container } = mount(Neck);
    expect(screen.getByText(NECK_SPATIAL)).toBeInTheDocument();
    expect(NECK_SPATIAL).toContain("canal posterior to the vertebral body");
    expect(container.querySelector('[data-part="catheter"]')).toBeNull();
  });
  it("SCI072 uses a named fascia convention in selected and deselected states", () => {
    mount(Neck);
    for (const name of ["Prevertebral (Deep) Layer", "Pretracheal (Middle) Layer", "Alar Fascia & Danger Space"]) {
      fireEvent.click(screen.getByRole("button", { name }));
      fireEvent.click(screen.getByRole("button", { name }));
      expect(screen.getByText(NECK_FASCIA_CONVENTION)).toBeInTheDocument();
    }
    expect(NECK_FASCIA_CONVENTION).toContain("between alar and prevertebral layers");
  });
  it("SCI054 offers only nonempty coronal/superior/muscle tabs, not unavailable lateral", () => {
    mount(Larynx);
    expect(screen.queryByRole("tab", { name: /Lateral/ })).toBeNull();
    for (const tab of screen.getAllByRole("tab")) {
      fireEvent.mouseDown(tab, { button: 0 });
      fireEvent.click(tab);
      expect(screen.getByRole("tabpanel").textContent?.trim().length).toBeGreaterThan(30);
    }
  });
  it("SCI058 qualifies airway dimensions in teaching and extracted FAQ", () => {
    expect(PAEDIATRIC_AIRWAY_DIMENSIONS).toContain("Neither an eight-year cutoff nor a universal glottis-only rule");
    expect(PAEDIATRIC_AIRWAY_DIMENSIONS).toContain("rigid cricoid ring remains important");
    const faqs = extractFaqsByPath()["/clinical/paediatric-anaesthesia"];
    expect(faqs[0][1]).toContain("no universal eight-year cutoff");
  });
  it("SCI055 vestibular ligament is the inferior free edge", () => {
    mount(Larynx);
    fireEvent.click(screen.getByRole("button", { name: "False Vocal Cords" }));
    expect(screen.getByText(/thickened inferior free edge of the quadrangular membrane/)).toBeInTheDocument();
  });
  it("all new inline source labels resolve in their actual topic pools", () => {
    for (const [topic, labels] of Object.entries({
      "brachial-plexus": ["NICE HTG179 block", "RAUK needling", "SPA supraclavicular guide"],
      "thoracic-anatomy": ["WFSA thoracic PVB", "Intercostal anatomy", "Thoracic wall VAN", "BTS pleural procedures 2023", "ESRA Plan A ESP"],
      "spinal-anatomy": ["WFSA epidural", "RCoA epidural dura"],
      "head-neck-anatomy": ["Michigan vertebral anatomy", "UAMS neck fascia", "Michigan laryngeal membranes", "Alar fascia review 2022", "Litman airway MRI 2003", "Dalal airway 2009", "Kwon airway 2018"],
    })) for (const label of labels) {
      const refs = topicReferences[topic].filter(r => r.label === label);
      expect(refs).toHaveLength(1);
      expect(refs[0].url).toMatch(/^https:\/\//);
    }
  });
});
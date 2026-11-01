import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { strictDecimal, finiteResult, osmolarSolute, osmolarUnitMaximum, osmolarGapRaised, toxinConcentration } from "@/lib/science-input";
import { hillEquation, dissolvedO2, o2Content, effectiveSat, boundAvailableOxygen } from "@/lib/oxygen-illustration";
import { segments, interpolateOsm } from "@/lib/urine-illustration";
import { murrayScore, staticDrivingPressure } from "@/lib/murray-arithmetic";
import { shockNumbers, plrChange } from "@/lib/icu-shock-calcs";
import { BloodGasCalculator } from "@/components/topic/BloodGasCalculator";
import Osmolar from "@/components/diagrams/intensive-care/OsmolarGapCalculator";
import Toxin from "@/components/diagrams/intensive-care/ToxicAlcoholSalicylateCalculator";
import Murray from "@/components/diagrams/intensive-care/EOLIAMurrayCalculator";
import { OxygenDissociationCurve } from "@/components/diagrams/physiology/OxygenDissociationCurve";
import Urine from "@/components/diagrams/physiology/UrineConcentrationSimulator";
import { ShockPracticeTeaching } from "@/components/topic/ShockPracticeTeaching";
import { MehranScoreCalculator } from "@/components/diagrams/intensive-care/MehranScoreCalculator";
import { topicReferences } from "@/data/references";

afterEach(cleanup);
const show = (node: React.ReactNode) => render(<MemoryRouter>{node}</MemoryRouter>);
const input = (label: string | RegExp, value: string) => fireEvent.change(screen.getByLabelText(label), { target: { value } });

describe("SCI018 retained raw comparisons and presentation", () => {
  it("preserves MAP64.6667 below65 and CPO raw arithmetic", () => {
    const r = shockNumbers(80, 94, 50, 4);
    expect(r?.map).toBe(65); expect(r?.belowSscMap).toBe(true); expect(r?.cpo).toBe(0.57);
  });
  it.each([[9.94, false], [9.96, false], [10, true], [10.01, true]])("PLR %s uses unrounded comparison", (pct, responsive) => {
    expect(plrChange(4, 4 * (1 + pct / 100))?.responsive).toBe(responsive);
  });
  it("renders adequate MAP precision without prescribing a vasopressor", () => {
    show(<ShockPracticeTeaching />); input("Heart rate", "80"); input("Systolic", "94"); input("Diastolic", "50");
    expect(screen.getByText("64.67 mm Hg")).toBeInTheDocument();
    expect(screen.getByText(/raw arithmetic value below 65; not a treatment trigger/)).toBeInTheDocument();
    expect(screen.getAllByText(/60–65/).length).toBeGreaterThan(0);
  });
});

describe("SCI037 canonical oxygen helpers and controls", () => {
  it.each([[0, 0], [40, .12], [100, .30]])("dissolved at %smmHg is %s", (p, content) => expect(dissolvedO2(p)).toBeCloseTo(content, 12));
  it("normal100mmHg Hb15 content19.847080", () => expect(o2Content(hillEquation(100, 26.7), 100, 15)).toBeCloseTo(19.847080, 6));
  it("COHb50% reduces bound capacity once", () => {
    expect(boundAvailableOxygen(100, 15, .5)).toBeCloseTo(10.05, 12);
    expect(o2Content(effectiveSat(100, .5), 0, 15)).toBeCloseTo(10.05, 12);
  });
  it.each([10, 26.7, 35, 60])("P50%s gives half available-site saturation", p => expect(hillEquation(p, p)).toBe(50));
  it("rendered marker coordinates remain mmHg and content responds to COHb", () => {
    const { container } = show(<OxygenDissociationCurve showShifts />);
    expect([...container.querySelectorAll("circle")].some(c => Math.abs(Number(c.getAttribute("cx")) - (55 + 26.7 / 100 * 355)) < .001)).toBe(true);
    input("COHb", "50"); fireEvent.click(screen.getByRole("button", { name: "O₂ Content (ml/dL)" }));
    const panel = screen.getByText("CaO₂ @100 mmHg").parentElement;
    expect(panel).not.toBeNull(); if (panel) expect(within(panel).getByText(/10\.3 ml\/dL/)).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText("Dissolved O₂")); expect(screen.getByText("Dissolved")).toBeInTheDocument();
  });
});

describe("SCI046 continuous illustrative effect profiles", () => {
  it.each([0, .02, .03, .04, .05, .97, .98, 1])("effect%s is finite, continuous, gradient-consistent and clamps last point", effect => {
    const last = segments[segments.length - 1];
    expect(interpolateOsm(1, effect)).toBe(last.osm(effect));
    expect(interpolateOsm(2, effect)).toBe(last.osm(effect));
    expect(segments[2].osm(effect)).toBe(800 + effect * 400);
    for (const segment of segments) {
      expect(Number.isFinite(segment.osm(effect))).toBe(true);
      expect(Math.abs(segment.osm(Math.min(1, effect + 1e-7)) - segment.osm(effect))).toBeLessThan(.001);
      expect(interpolateOsm(segment.x, effect)).toBeCloseTo(segment.osm(effect), 10);
    }
  });
  it("all rendered presets and final labels match actual helper", () => {
    show(<Urine />);
    for (const [name, effect] of [["Water diuresis", 0], ["Low effect", .15], ["Intermediate effect", .5], ["High effect", .85], ["Antidiuresis", 1]] as const) {
      fireEvent.click(screen.getByRole("button", { name }));
      expect(screen.getByLabelText("Relative antidiuretic effect")).toHaveValue(String(Math.round(effect * 100)));
      expect(screen.getAllByText(String(Math.round(interpolateOsm(1, effect)))).length).toBeGreaterThan(0);
    }
  });
});

describe("SCI059/061 canonical osmolar units and threshold", () => {
  it("glucose600mg/dL33.333333 and BUN280mg/dL99.96", () => {
    expect(osmolarSolute("600", "glucose", "mg/dL")).toBeCloseTo(33.333333333, 8);
    expect(osmolarSolute("280", "urea", "mg/dL (BUN)")).toBeCloseTo(99.96, 10);
  });
  it("unit-equivalent ceilings and malformed entries", () => {
    for (const kind of ["urea", "glucose"] as const) {
      expect(osmolarSolute(String(osmolarUnitMaximum(kind, "mg/dL")), kind, "mg/dL")).toBeCloseTo(200, 10);
      expect(osmolarSolute("201", kind, "mmol/L")).toBeNull();
      expect(osmolarSolute("", kind, "mmol/L")).toBeNull();
    }
  });
  it.each([[9.999, false], [10, true], [10.001, true]])("gap%s has one comparator", (gap, raised) => {
    expect(osmolarGapRaised(gap)).toBe(raised);
    show(<Osmolar />); input(/Measured osmolality/, String(290 + gap)); input(/Anion gap \(optional\)/, "20");
    expect(screen.getByText(raised ? /Mildly raised osmolar gap/ : /Gap below the illustrative/)).toBeInTheDocument();
    expect(screen.getByText(raised ? /↑ osmolar gap \+ ↑ anion gap/ : /Gap below illustrative \+10 threshold \+ ↑ AG/)).toBeInTheDocument();
  });
  it("unit switching converts value and preserves glucose600 results", () => {
    show(<Osmolar />); fireEvent.click(screen.getByRole("button", { name: "mg/dL", exact: true }));
    input(/Glucose/, "600"); input(/Measured osmolality/, "330");
    expect(screen.getByText("318.3 mOsm/kg")).toBeInTheDocument();
    const urea = screen.getByLabelText(/Urea/); expect(urea).toHaveAttribute("max", "200");
    fireEvent.click(screen.getByRole("button", { name: "mg/dL (BUN)" })); input(/Urea/, "280");
    expect(screen.queryByText(/no result is calculated from invalid inputs/)).not.toBeInTheDocument();
    const mmolButtons = screen.getAllByRole("button", { name: "mmol/L", exact: true }); fireEvent.click(mmolButtons[1]);
    expect(Number((screen.getByLabelText(/Glucose/) as HTMLInputElement).value)).toBeCloseTo(600 / 18, 12);
  });
});

describe("SCI060/062 strict parsing, ordinary arithmetic and finite outputs", () => {
  it.each(["", " ", "7,4", "7.4junk", "5e", ".5junk", "1.", "0x10", "Infinity", "1e309"])("rejects%s", value => expect(strictDecimal(value)).toBeNull());
  it.each(["7.4", ".5", "5e1", "1e308"])("accepts complete finite%s", value => expect(strictDecimal(value)).toBe(Number(value)));
  it("derived overflow returns null", () => { expect(finiteResult(1e308 / .21)).toBeNull(); expect(toxinConcentration("1e308", "mg/dL", 32.04)).toBeNull(); });
  it.each([32.04, 62.07, 138.12])("ordinary toxin matrix mass%s", mass => {
    for (const [value, unit] of [["1", "mmol/L"], [String(mass), "mg/L"], [String(mass / 10), "mg/dL"]]) expect(toxinConcentration(value, unit, mass)?.mmolL).toBeCloseTo(1, 12);
  });
  it.each([["pH", "7,4"], ["pH", "7.4junk"], [/pCO₂/, "5e"], [/FiO₂/, ".5junk"]])("rendered blood gas suppresses malformed%s", (label, value) => {
    show(<BloodGasCalculator />); input(label as string | RegExp, value as string);
    expect(screen.getByText(/Use complete decimal numbers/)).toBeInTheDocument();
    const result = screen.getByText(label instanceof RegExp && label.source.includes("FiO") ? "PaO₂/FiO₂ ratio" : "Bicarbonate (calculated)").parentElement;
    expect(result).toHaveTextContent("—");
  });
  it("blood gas valid pressure conversion remains equivalent at boundary and overflow is visible", () => {
    show(<BloodGasCalculator />); input(/pCO₂/, "30"); input(/FiO₂/, ".21");
    const bicarbonate = screen.getByText("Bicarbonate (calculated)").parentElement?.textContent;
    fireEvent.click(screen.getByRole("radio", { name: "mmHg" }));
    expect(screen.getByText("Bicarbonate (calculated)").parentElement?.textContent).toBe(bicarbonate);
    fireEvent.click(screen.getByRole("radio", { name: "kPa" })); input(/pO₂/, "1e308");
    expect(screen.getByText(/Derived ratio is outside/)).toBeInTheDocument();
    expect(screen.getByText("PaO₂/FiO₂ ratio").parentElement).toHaveTextContent("—");
  });
  it("toxin overflow and malformed values never render Infinity/NaN", () => {
    show(<Toxin />);
    for (const value of ["1e308", "7,4", "5e", ".5junk"]) {
      input("Methanol concentration", value);
      expect(screen.getByRole("status")).toHaveTextContent(/must be finite/);
    }
  });
});

describe("SCI063–065 Murray only, no eligibility engine, valid history", () => {
  it("PF100 PEEP15 compliance10 quadrants4 Murray3.75 only", () => expect(murrayScore(100, 15, 10, 4)?.score).toBe(3.75));
  it.each([[100, 3], [175, 2], [225, 1], [300, 0]])("PF%s component%s", (pf, points) => expect(murrayScore(pf, 5, 80, 0)?.points[0]).toBe(points));
  it.each([[0, 5, 80, 0], [100, -1, 80, 0], [100, 5, 0, 0], [100, 5, 80, 1.5], [NaN, 5, 80, 0]])("invalid Murray%s", (pf, peep, c, q) => expect(murrayScore(pf, peep, c, q)).toBeNull());
  it("negative/nonfinite pressure withheld, total PEEP matters", () => {
    expect(staticDrivingPressure(15, 24)).toBeNull(); expect(staticDrivingPressure(Infinity, 5)).toBeNull(); expect(staticDrivingPressure(30, 15)).toBe(15);
  });
  it("rendered3.75 and profound hypoxaemia retain early discussion, never eligible/not indicated", async () => {
    const { container } = show(<Murray />);
    input("PaO₂ / FiO₂", "100"); input("Total PEEP (static assessment)", "15"); input("Static compliance", "10"); input("CXR quadrants with consolidation", "4");
    expect(screen.getByText("3.75")).toBeInTheDocument();
    input("PaO₂ / FiO₂", "40"); expect(screen.getByText("Early ECMO-centre discussion")).toBeInTheDocument();
    input("Plateau pressure", "15"); input("Total PEEP (static assessment)", "24");
    expect(screen.getByRole("status")).toHaveTextContent("withheld");
    await new Promise(resolve => setTimeout(resolve, 400));
    expect(container.textContent).not.toContain("ΔP -9");
    fireEvent.click(screen.getByRole("button", { name: "Reset trend" }));
    expect(screen.getByText("No valid pressure history points.")).toBeInTheDocument();
    expect(container.textContent).not.toMatch(/ECMO not currently indicated|threshold met|Optimise first, then refer|safety zone/);
  });
});

describe("SCI066 hypotension includes IABP without losing separate factor", () => {
  it("renders alternative support and independent IABP points", () => {
    show(<MehranScoreCalculator />);
    expect(screen.getByText(/requiring inotropic medication or IABP support/)).toBeInTheDocument();
    expect(screen.getByText("Intra-aortic balloon pump")).toBeInTheDocument();
  });
});

it("new mapped references resolve through executed registry", () => {
  for (const [topic, label] of [["circulatory-failure", "SSC 2026 MAP"], ["oxygen-haemoglobin", "Cheifetz 2014 oxygen content"], ["ards", "Murray 1988 lung injury"], ["ards", "EOLIA 2018"], ["ards", "ELSO 2021 adult VV ECMO"], ["ards", "Amato 2015 driving pressure"], ["renal-physiology", "Nielsen 1995 AQP2"], ["renal-physiology", "Agre aquaporins lecture"], ["renal-physiology", "NIDDK diabetes insipidus"], ["renal-physiology", "European hyponatraemia 2014 SIAD"]]) expect(topicReferences[topic]?.find(r => r.label === label)?.url, `${topic}/${label}`).toMatch(/^https:/);
});
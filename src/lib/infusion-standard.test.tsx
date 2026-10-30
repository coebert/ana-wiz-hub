import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { computeMlPerHr, extractMassDilutions, formatMassConcentration, normaliseInfusionStandard } from "./infusion-standard";
import { InfusionCalculator, PreparationGuide, WorkedExample } from "@/pages/DrugDetail";

const insulin = { infusion_standard: { amount_mg: 50, diluent_ml: 50, unit: "units/hr", weight_based: false } };
const vaso = { infusion_standard: { amount_mg: 20, diluent_ml: 50, unit: "units/hr", weight_based: false } };

describe("D39 biological units", () => {
  it("insulin 50 units / 50 mL final = 1 unit/mL; 2 units/hr = 2 mL/hr", () => {
    const n = normaliseInfusionStandard(insulin.infusion_standard)!;
    expect(n.ok && n.kind === "units" && n.unitsPerMl).toBe(1);
    const r = computeMlPerHr(n, 2);
    expect(r.ok && r.mlPerHr).toBe(2);
  });
  it("vasopressin 20 units / 50 mL = 0.4 units/mL; 2 units/hr = 5 mL/hr", () => {
    const n = normaliseInfusionStandard(vaso.infusion_standard)!;
    expect(n.ok && n.kind === "units" && n.unitsPerMl).toBeCloseTo(0.4, 10);
    const r = computeMlPerHr(n, 2);
    expect(r.ok && r.mlPerHr).toBeCloseTo(5, 10);
  });
  it("mass path unchanged: 4 mg/50 mL, 0.1 mcg/kg/min, 70 kg = 5.25 mL/hr", () => {
    const n = normaliseInfusionStandard({ amount_mg: 4, diluent_ml: 50, unit: "mcg/kg/min", weight_based: true })!;
    expect(n.ok && n.kind === "mass" && n.mgPerMl).toBeCloseTo(0.08, 10);
    expect(n.ok && n.kind === "mass" && n.mcgPerMl).toBeCloseTo(80, 10);
    const r = computeMlPerHr(n, 0.1, 70);
    expect(r.ok && r.mlPerHr).toBeCloseTo(5.25, 10);
  });
  it("ambiguous diluent prose yields no unit badge", () => {
    expect(extractMassDilutions("50 units in 49.5 mL sodium chloride")).toEqual([]);
    expect(extractMassDilutions("4 mg in 50 mL")).toEqual([]); // unqualified volume is ambiguous
    expect(extractMassDilutions("4 mg in 50 mL final volume")[0].mgPerMl).toBeCloseTo(0.08, 10);
  });
  it.each([
    [{ amount_mg: 50, diluent_ml: 0, unit: "units/hr" }],
    [{ amount_mg: -5, diluent_ml: 50, unit: "units/hr" }],
    [{ amount_mg: NaN, diluent_ml: 50, unit: "units/hr" }],
    [{ amount_mg: 5, diluent_ml: 50, unit: "units/kg/day" }],
    [{ amount: 5, amount_unit: "units", diluent_ml: 50, unit: "mg/hr" }],
  ])("rejects invalid standard %#", (std) => {
    expect(normaliseInfusionStandard(std)!.ok).toBe(false);
  });
  it("rejects negative/NaN rate and missing weight", () => {
    const n = normaliseInfusionStandard(insulin.infusion_standard)!;
    expect(computeMlPerHr(n, -1).ok).toBe(false);
    expect(computeMlPerHr(n, NaN).ok).toBe(false);
    const m = normaliseInfusionStandard({ amount_mg: 4, diluent_ml: 50, unit: "mcg/kg/min" })!;
    expect(computeMlPerHr(m, 0.1, 0).ok).toBe(false);
  });
});

describe("D39 rendered drug-page paths", () => {
  it.each([
    ["insulin", insulin, "1 unit/mL", "2.00 mL/hr", ["50 mg", "1 mg/mL", "1000 mcg/mL", "1.00 mg/mL"]],
    ["vasopressin", vaso, "0.4 units/mL", "5.00 mL/hr", ["20 mg", "0.4 mg/mL", "400 mcg/mL", "0.40 mg/mL"]],
  ])("%s worked example and calculator show units only", (_n, rec, conc, rate, forbidden) => {
    const { container } = render(<><WorkedExample drug={rec} /><InfusionCalculator drug={rec} /></>);
    const text = container.textContent ?? "";
    expect(text).toContain(conc);
    expect(text).toContain("final volume");
    expect(screen.getByTestId("pump-rate").textContent).toContain(rate);
    expect(screen.getByTestId("worked-example").textContent).toContain(rate.replace(".00", ".00"));
    for (const f of forbidden) expect(text).not.toContain(f);
    expect(text).not.toMatch(/mcg|mg\/mL/);
  });
  it("mass calculator still renders 5.25 mL/hr", () => {
    render(<InfusionCalculator drug={{ infusion_standard: { amount_mg: 4, diluent_ml: 50, unit: "mcg/kg/min", weight_based: true } }} />);
    expect(screen.getByTestId("pump-rate").textContent).toContain("5.25 mL/hr");
  });
});

const LIVE = {
  clonidine: "• Standard ampoule: 150 micrograms in 1 mL.\n• Bolus for IV administration: Dilute 150 micrograms in 9 mL sodium chloride 0.9% to a total volume of 10 mL (15 micrograms/mL).",
  methadone: "SC: Not generally recommended due to irritancy. If used (e.g. palliative care, unlicensed), dilute with Water for Injections or 0.9% sodium chloride.\nIV: Not recommended by SPC. If used (e.g. critical care, unlicensed), 10 mg in 9 mL Water for Injections or 0.9% sodium chloride to 1 mg/mL. Administer slowly over 3-5 minutes.",
  desmopressin: "For IV administration for haemostasis: Dilute the required dose (e.g. 20 micrograms) in 50 mL 0.9% sodium chloride or 5% glucose and infuse over 15–30 minutes. The resulting concentration for 20 micrograms in 50 mL is 0.4 micrograms/mL.",
};

describe("D39 prose-derived preparation badges", () => {
  it.each([
    ["clonidine", /17\s*mcg\/mL/],
    ["methadone", /1\.11\s*mg\/mL/],
    ["desmopressin", /(?<![\d.])0\s*(mcg|mg)\/mL|0\.000/],
  ] as const)("%s live string: no misleading badge, prose retained", (k, bad) => {
    const { container } = render(<PreparationGuide raw={LIVE[k]} drug={{} as never} />);
    const html = container.innerHTML;
    expect(html).not.toMatch(bad);
    expect(container.textContent).not.toContain("Common concentrations");
    expect(container.textContent).toContain(k === "clonidine" ? "total volume of 10 mL" : k === "methadone" ? "to 1 mg/mL" : "0.4 micrograms/mL");
  });
  it("explicit final volume renders correct units", () => {
    expect(formatMassConcentration(extractMassDilutions("20 micrograms in 50 mL final volume")[0].mgPerMl)).toBe("0.4 mcg/mL");
    expect(formatMassConcentration(extractMassDilutions("2 mg in 50 mL final volume")[0].mgPerMl)).toBe("40 mcg/mL");
    expect(formatMassConcentration(0.0000004)).toBe("0.4 ng/mL");
    const { container } = render(<PreparationGuide raw="Give 20 micrograms in 50 mL final volume." drug={{} as never} />);
    expect(container.textContent).toContain("0.4 mcg/mL");
    expect(container.innerHTML).not.toMatch(/0\.000/);
  });
});

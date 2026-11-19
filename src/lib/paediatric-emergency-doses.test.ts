import { describe, expect, it } from "vitest";
import {
  arrestAdrenaline,
  arrestAmiodarone,
  arrestAtropine,
  dexamethasonePonv,
  ivParacetamolDose,
  ondansetronPonv,
  oralParacetamolDose,
  paediatricDefibrillation,
} from "./paediatric-emergency-doses";

describe("IV paracetamol follows the named UK product bands (emc 100803)", () => {
  it.each([
    [5, 37.5, 150],
    [10, 75, 300],
    [10.1, 151.5, 606],
    [40, 600, 2400],
    [70, 1000, 4000],
    [120, 1000, 4000],
  ])("%s kg gives %s mg per dose and %s mg/day", (w, dose, daily) => {
    const out = ivParacetamolDose(Number(w));
    expect(out?.doseMg).toBeCloseTo(Number(dose), 5);
    expect(out?.maxDailyMg).toBeCloseTo(Number(daily), 5);
  });

  it("never exceeds 1 g per dose above 50 kg", () => {
    expect(ivParacetamolDose(70)?.doseMg).toBe(1000);
    expect(ivParacetamolDose(120)?.doseMg).toBe(1000);
  });

  it("halves the daily ceiling at 10 kg versus the 15 mg/kg band", () => {
    expect(ivParacetamolDose(10)?.doseMg).toBe(75);
    expect(ivParacetamolDose(10.1)?.doseMg).toBeCloseTo(151.5, 5);
  });

  it("lowers the >50 kg daily ceiling to 3 g with hepatotoxicity risk", () => {
    expect(ivParacetamolDose(70, true)?.maxDailyMg).toBe(3000);
    expect(ivParacetamolDose(70, false)?.maxDailyMg).toBe(4000);
  });

  it("caps >33–50 kg at 3 g/day and >10–33 kg at 2 g/day", () => {
    expect(ivParacetamolDose(50)?.maxDailyMg).toBe(3000);
    expect(ivParacetamolDose(33)?.maxDailyMg).toBe(1980);
    expect(ivParacetamolDose(33.1)?.maxDailyMg).toBeCloseTo(1986, 5);
  });

  it("rejects invalid weights", () => {
    expect(ivParacetamolDose(0)).toBeNull();
    expect(ivParacetamolDose(Number.NaN)).toBeNull();
  });
});

describe("Oral paracetamol is separate and age-limited", () => {
  it("gives 10–15 mg/kg to a child over 2 months", () => {
    const out = oralParacetamolDose(10, 24);
    expect(out?.minDoseMg).toBe(100);
    expect(out?.maxDoseMg).toBe(150);
    expect(out?.maxDailyMg).toBe(600);
  });

  it("caps the single dose at 1 g and the day at 4 g", () => {
    expect(oralParacetamolDose(120, 144)?.maxDoseMg).toBe(1000);
    expect(oralParacetamolDose(120, 144)?.maxDailyMg).toBe(4000);
  });

  it("refuses under 2 months (no confirmed infant regimen)", () => {
    expect(oralParacetamolDose(5, 1)).toBeNull();
    expect(oralParacetamolDose(5, 2)?.maxDoseMg).toBe(75);
  });
});

describe("RCUK arrest drugs cap at the chart ceilings", () => {
  it.each([
    [5, 50],
    [10, 100],
    [40, 400],
    [70, 700],
    [120, 1000],
  ])("adrenaline at %s kg is %s micrograms", (w, mcg) => {
    expect(arrestAdrenaline(Number(w))?.amount).toBeCloseTo(Number(mcg), 5);
  });

  it("derives the adrenaline volume from 1:10,000", () => {
    expect(arrestAdrenaline(10)?.volumeMl).toBeCloseTo(1, 5);
    expect(arrestAdrenaline(120)?.volumeMl).toBeCloseTo(10, 5);
    expect(arrestAdrenaline(120)?.cappedAt).toBe(1000);
  });

  it.each([
    [5, 25, 25],
    [10, 50, 50],
    [40, 200, 150],
    [70, 300, 150],
    [120, 300, 150],
  ])("amiodarone at %s kg: first %s mg, second %s mg", (w, first, second) => {
    expect(arrestAmiodarone(Number(w), 1)?.amount).toBeCloseTo(Number(first), 5);
    expect(arrestAmiodarone(Number(w), 2)?.amount).toBeCloseTo(Number(second), 5);
  });

  it("caps atropine at 600 micrograms", () => {
    expect(arrestAtropine(5)?.amount).toBe(100);
    expect(arrestAtropine(40)?.amount).toBe(600);
    expect(arrestAtropine(120)?.cappedAt).toBe(600);
  });
});

describe("Defibrillation is staged and device-limited", () => {
  it.each([
    [5, 20],
    [10, 40],
    [40, 150],
    [70, 150],
    [120, 150],
  ])("initial shock at %s kg is %s J", (w, j) => {
    expect(paediatricDefibrillation(Number(w), 5)?.initialJ).toBeCloseTo(Number(j), 5);
  });

  it("escalates refractory VF/pVT to 8 J/kg capped at 360 J", () => {
    expect(paediatricDefibrillation(10, 3)?.refractoryMaxJ).toBe(80);
    expect(paediatricDefibrillation(40, 8)?.refractoryMaxJ).toBe(320);
    expect(paediatricDefibrillation(70, 8)?.refractoryMaxJ).toBe(360);
  });

  it("sends adolescents to 360 J", () => {
    expect(paediatricDefibrillation(40, 13)?.adolescent).toBe(true);
    expect(paediatricDefibrillation(40, 13)?.refractoryMaxJ).toBe(360);
  });

  it("starts cardioversion at 1 J/kg and stops at 4 J/kg", () => {
    const plan = paediatricDefibrillation(20, 6);
    expect(plan?.cardioversionInitialJ).toBe(20);
    expect(plan?.cardioversionMaxJ).toBe(80);
  });
});

describe("Anti-emetic ceilings only where the cohort is supported", () => {
  it("caps ondansetron at 4 mg for children over 1 month", () => {
    expect(ondansetronPonv(5, 12)?.amount).toBeCloseTo(0.5, 5);
    expect(ondansetronPonv(40, 96)?.amount).toBe(4);
    expect(ondansetronPonv(120, 144)?.amount).toBe(4);
  });

  it("suppresses ondansetron at or below 1 month", () => {
    expect(ondansetronPonv(5, 1)).toBeNull();
    expect(ondansetronPonv(5, 0.5)).toBeNull();
  });

  it("caps dexamethasone at 8 mg from age 1 year", () => {
    expect(dexamethasonePonv(5, 2)?.amount).toBeCloseTo(0.75, 5);
    expect(dexamethasonePonv(70, 10)?.amount).toBe(8);
  });

  it("suppresses dexamethasone under 1 year", () => {
    expect(dexamethasonePonv(10, 0.75)).toBeNull();
  });
});

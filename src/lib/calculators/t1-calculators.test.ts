import { describe, expect, it } from "vitest";
import {
  burnFirstDayPlan,
  burnFormula24h,
  devineIbwKg,
  ivyIndex,
  minimumFpmReduction,
  omeddFromOral,
  omeddFromPatch,
  oralTargetDailyMg,
  perDoseMg,
  rchPaedsPca,
  rchRopivacaineEpidural,
  sedationMlPerHour,
  urineTargetMlPerHour,
} from "./t1-calculators";

describe("ROOT-12/13 opioid estimates (FPM tables)", () => {
  it("rejects zero, negative and non-integer frequencies instead of snapping to a patch", () => {
    expect(omeddFromOral("morphine", 0, 2)).toBeNull();
    expect(omeddFromOral("morphine", -5, 2)).toBeNull();
    expect(omeddFromOral("morphine", 10, 0)).toBeNull();
    expect(omeddFromOral("morphine", 10, 2.5)).toBeNull();
    expect(omeddFromOral("morphine", Number.NaN, 2)).toBeNull();
  });
  it("uses FPM oral potencies", () => {
    expect(omeddFromOral("oxycodone", 20, 2)).toBe(60);
    expect(omeddFromOral("codeine", 60, 4)).toBeCloseTo(24);
  });
  it("patch rates map to daily mass only at FPM-listed strengths, never ÷24", () => {
    expect(omeddFromPatch("fentanyl", 25)).toBe(60);
    expect(omeddFromPatch("buprenorphine-weekly", 5)).toBe(12);
    expect(omeddFromPatch("fentanyl", 1)).toBeNull();
    expect(omeddFromPatch("fentanyl", 0)).toBeNull();
  });
  it("reduction applies once and FPM ≥50% rule triggers at 500 mg or high risk", () => {
    expect(oralTargetDailyMg(60, "morphine", 50)).toBe(30);
    expect(minimumFpmReduction(499, false)).toBe(25);
    expect(minimumFpmReduction(500, false)).toBe(50);
    expect(minimumFpmReduction(60, true)).toBe(50);
  });
  it("per-dose uses the target interval and requires one to be chosen", () => {
    expect(perDoseMg(60, null)).toBeNull();
    expect(perDoseMg(60, 6)).toBe(10);
    expect(perDoseMg(60, 2)).toBe(30);
  });
});

describe("ROOT-14 paediatric RCH protocol", () => {
  it("epidural never exceeds 0.3 mL/kg/h (20 kg → 6 mL/h)", () => {
    const r = rchRopivacaineEpidural(20, 60, false);
    expect(r.eligible).toBe(true);
    if (r.eligible) {
      expect(r.maxMlPerHour).toBeCloseTo(6);
      expect(r.minMlPerHour).toBeCloseTo(2);
    }
  });
  it("no rate for infants under 8 months, hepatic impairment or invalid input", () => {
    expect(rchRopivacaineEpidural(7, 0, false).eligible).toBe(false);
    expect(rchRopivacaineEpidural(8, 7, false).eligible).toBe(false);
    expect(rchRopivacaineEpidural(9, 8, false).eligible).toBe(true);
    expect(rchRopivacaineEpidural(20, 60, true).eligible).toBe(false);
    expect(rchRopivacaineEpidural(0, 60, false).eligible).toBe(false);
    expect(rchRopivacaineEpidural(20, Number.NaN, false).eligible).toBe(false);
  });
  it("PCA uses the measured weight band", () => {
    expect(rchPaedsPca("morphine", 20)?.bolusDose).toBe(400);
    expect(rchPaedsPca("morphine", 45)?.band).toBe("≥45 kg");
    expect(rchPaedsPca("fentanyl", 30)?.bolusDose).toBe(9);
    expect(rchPaedsPca("morphine", -1)).toBeNull();
  });
});

describe("ROOT-15 sedation arithmetic", () => {
  it("blocks zero, negative and non-finite weight or dose", () => {
    expect(sedationMlPerHour("mg/kg/h", 1, -70, 10000)).toBeNull();
    expect(sedationMlPerHour("mg/kg/h", 1, 0, 10000)).toBeNull();
    expect(sedationMlPerHour("mg/kg/h", Number.NaN, 70, 10000)).toBeNull();
  });
  it("converts units correctly", () => {
    expect(sedationMlPerHour("mg/kg/h", 1, 70, 10000)).toBeCloseTo(7);
    expect(sedationMlPerHour("micrograms/kg/min", 0.1, 70, 100)).toBeCloseTo(4.2);
    expect(sedationMlPerHour("micrograms/kg/h", 30, 70, 1000)).toBeCloseTo(2.1);
  });
  it("Devine IBW", () => {
    expect(devineIbwKg(180, "male")).toBeCloseTo(75, 0);
    expect(devineIbwKg(140, "male")).toBeNull();
  });
});

describe("ROOT-18 burns", () => {
  it("Galveston total already includes maintenance", () => {
    const r = burnFormula24h("galveston", 20, 25, 110)!;
    expect(r.includesMaintenance).toBe(true);
    expect(r.totalMl).toBeCloseTo(2540, -1);
  });
  it("no current rate without fluid given; rate uses actual remaining volume", () => {
    expect(burnFirstDayPlan(12800, 2, null)?.status).toBe("estimate-only");
    const p = burnFirstDayPlan(12800, 2, 1000);
    expect(p?.status).toBe("rate");
    if (p?.status === "rate") expect(p.mlPerHour).toBeCloseTo(5400 / 6);
  });
  it("first-day window ends", () => {
    expect(burnFirstDayPlan(12800, 8, 0)?.status).toBe("first-8h-ended");
    expect(burnFirstDayPlan(12800, 24, 0)?.status).toBe("window-ended");
  });
  it("Ivy index: 100 kg / 60% Parkland is 240 mL/kg, below 250 until other fluids added", () => {
    const t = burnFormula24h("parkland", 100, 60)!.totalMl;
    expect(ivyIndex(t, 100)).toEqual({ mlPerKg: 240, exceeds: false });
    expect(ivyIndex(t + 1500, 100)?.exceeds).toBe(true);
  });
  it("child urine target is 1 mL/kg/h (20 kg → 20 mL/h)", () => {
    expect(urineTargetMlPerHour("child", 20)).toBe(20);
    expect(urineTargetMlPerHour("adult", 80)).toBe(40);
  });
  it("rejects invalid inputs", () => {
    expect(burnFormula24h("parkland", 0, 40)).toBeNull();
    expect(burnFormula24h("parkland", 80, 120)).toBeNull();
  });
});

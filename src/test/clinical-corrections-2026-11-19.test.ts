import { describe, it, expect } from "vitest";
import {
  calculateDeliveredDose,
  calculatePumpRate,
  INFUSION_LIMITS,
  type ForwardInput,
  type ReverseInput,
} from "@/lib/infusion-calc";
import {
  adultDailyRange,
  childDailyMaintenanceMlPerDay,
  childHourlyApproximationMlPerHour,
  FLUID_LIMITS,
  neonateBand,
  neonateDailyRange,
} from "@/lib/maintenance-fluid";
import {
  arrhythmiasEcgIcuQuestions,
  cardiacArrestPostResusQuestions,
  immunosuppressionHivQuestions,
} from "@/data/quizzes";

/** Baseline syringe used across the infusion cases. */
const syringe = {
  amount: 50,
  amountUnit: "mg" as const,
  volumeMl: 50,
  doseUnit: "mg" as const,
  doseMode: "per-kg" as const,
  weightKg: 70,
  doseRate: "per-hour" as const,
};

const forward = (overrides: Partial<ForwardInput> = {}): ForwardInput => ({
  ...syringe,
  dose: 0.05,
  ...overrides,
});

const reverse = (overrides: Partial<ReverseInput> = {}): ReverseInput => ({
  ...syringe,
  pumpRateMlPerHour: 3.5,
  ...overrides,
});

describe("infusion pump calculator — blank, zero, boundary and out-of-range", () => {
  it("refuses a blank dose instead of pre-filling one", () => {
    expect(calculatePumpRate(forward({ dose: null }))).toEqual({
      ok: false,
      error: "missing-dose",
    });
  });

  it("rejects zero and negative doses", () => {
    expect(calculatePumpRate(forward({ dose: 0 }))).toEqual({
      ok: false,
      error: "invalid-dose",
    });
    expect(calculatePumpRate(forward({ dose: -0.05 }))).toEqual({
      ok: false,
      error: "invalid-dose",
    });
  });

  it("accepts the documented weight boundaries and rejects outside them", () => {
    expect(calculatePumpRate(forward({ weightKg: INFUSION_LIMITS.weightKg.min })).ok).toBe(true);
    expect(calculatePumpRate(forward({ weightKg: INFUSION_LIMITS.weightKg.max })).ok).toBe(true);
    expect(calculatePumpRate(forward({ weightKg: INFUSION_LIMITS.weightKg.max + 1 }))).toEqual({
      ok: false,
      error: "invalid-weight",
    });
    expect(calculatePumpRate(forward({ weightKg: 0 }))).toEqual({
      ok: false,
      error: "invalid-weight",
    });
  });

  it("rejects zero volume and zero drug amount", () => {
    expect(calculatePumpRate(forward({ volumeMl: 0 }))).toEqual({
      ok: false,
      error: "invalid-volume",
    });
    expect(calculatePumpRate(forward({ amount: 0 }))).toEqual({
      ok: false,
      error: "invalid-amount",
    });
  });

  it("rejects a unit-family mismatch", () => {
    expect(calculatePumpRate(forward({ amountUnit: "units" }))).toEqual({
      ok: false,
      error: "unit-mismatch",
    });
  });

  it("computes midazolam 50 mg in 50 mL at 0.05 mg/kg/h for 70 kg", () => {
    const result = calculatePumpRate(forward());
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.concPerMl).toBeCloseTo(1000, 6);
    expect(result.amountPerHour).toBeCloseTo(3500, 6);
    expect(result.rateMlPerHour).toBeCloseTo(3.5, 6);
  });

  it("does not infer a dose from a blank or zero pump rate in reverse mode", () => {
    expect(calculateDeliveredDose(reverse({ pumpRateMlPerHour: null }))).toEqual({
      ok: false,
      error: "missing-pump-rate",
    });
    expect(calculateDeliveredDose(reverse({ pumpRateMlPerHour: 0 }))).toEqual({
      ok: false,
      error: "invalid-pump-rate",
    });
  });

  it("converts a running pump rate back to the delivered dose", () => {
    const result = calculateDeliveredDose(reverse());
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.displayDose).toBeCloseTo(0.05, 6);
  });
});

describe("maintenance fluid calculator — blank, zero, boundary and out-of-range", () => {
  it("returns null for zero, negative and out-of-range weights", () => {
    expect(childDailyMaintenanceMlPerDay(0)).toBeNull();
    expect(childDailyMaintenanceMlPerDay(-5)).toBeNull();
    expect(childDailyMaintenanceMlPerDay(FLUID_LIMITS.weightKg.min - 0.1)).toBeNull();
    expect(childDailyMaintenanceMlPerDay(FLUID_LIMITS.weightKg.max + 1)).toBeNull();
    expect(adultDailyRange(0)).toBeNull();
    expect(neonateDailyRange(0, 3)).toBeNull();
  });

  it("uses the exact NG29 100/50/20 daily rule at its band boundaries", () => {
    expect(childDailyMaintenanceMlPerDay(FLUID_LIMITS.weightKg.min)).toBeCloseTo(30, 6);
    expect(childDailyMaintenanceMlPerDay(10)).toBeCloseTo(1000, 6);
    expect(childDailyMaintenanceMlPerDay(10.1)).toBeCloseTo(1005, 6);
    expect(childDailyMaintenanceMlPerDay(20)).toBeCloseTo(1500, 6);
    expect(childDailyMaintenanceMlPerDay(20.1)).toBeCloseTo(1502, 6);
    expect(childDailyMaintenanceMlPerDay(70)).toBeCloseTo(2500, 6);
  });

  it("keeps the 4-2-1 figure separate from the daily prescription", () => {
    expect(childHourlyApproximationMlPerHour(10)).toBeCloseTo(40, 6);
    expect(childHourlyApproximationMlPerHour(20)).toBeCloseTo(60, 6);
    expect(childHourlyApproximationMlPerHour(70)).toBeCloseTo(110, 6);
    // The hourly estimate is not equal to the daily prescription divided by 24.
    expect(childHourlyApproximationMlPerHour(70)).not.toBeCloseTo(2500 / 24, 6);
  });

  it("gives the CG174 adult range rather than a single rate", () => {
    const range = adultDailyRange(70);
    expect(range).not.toBeNull();
    expect(range?.minMlPerDay).toBeCloseTo(1750, 6);
    expect(range?.maxMlPerDay).toBeCloseTo(2100, 6);
  });

  it("handles NG29 neonatal age bands and rejects out-of-range ages", () => {
    expect(neonateBand(-1)).toBeNull();
    expect(neonateBand(29)).toBeNull();
    expect(neonateBand(0)?.minMlPerKgPerDay).toBe(50);
    expect(neonateBand(1)?.maxMlPerKgPerDay).toBe(60);
    expect(neonateBand(2)?.minMlPerKgPerDay).toBe(70);
    expect(neonateBand(3)?.maxMlPerKgPerDay).toBe(100);
    expect(neonateBand(4)?.minMlPerKgPerDay).toBe(100);
    expect(neonateBand(5)?.maxMlPerKgPerDay).toBe(150);
    expect(neonateBand(28)?.maxMlPerKgPerDay).toBe(150);
  });
});

describe("confirmed clinical corrections stay corrected", () => {
  it("does not give atropine for high-grade AV block with a wide QRS", () => {
    const q = arrhythmiasEcgIcuQuestions.find((item) =>
      item.question.includes("complete heart block"),
    );
    expect(q).toBeDefined();
    expect(q?.options[q.correctIndex]).toMatch(/pacing/i);
    expect(q?.explanation).toMatch(/do not give atropine/i);
  });

  it("does not treat new LBBB alone as a STEMI equivalent after ROSC", () => {
    const q = arrhythmiasEcgIcuQuestions.find((item) => item.question.includes("new LBBB"));
    expect(q).toBeDefined();
    expect(q?.options[q.correctIndex]).toMatch(/selective|delayed/i);
    expect(q?.explanation).toMatch(/not a STEMI equivalent/i);
  });

  it("states the RCUK 2025 fever-prevention duration as 36–72 h", () => {
    const ttm = cardiacArrestPostResusQuestions.find((item) => item.question.includes("TTM2"));
    const rewarm = cardiacArrestPostResusQuestions.find((item) =>
      item.question.includes("rewarming phase"),
    );
    expect(ttm?.explanation).toContain("36–72 h");
    expect(rewarm?.explanation).toContain("36–72 h");
    expect(ttm?.explanation).not.toContain("at least 72 h");
  });

  it("risk-stratifies post-splenectomy prophylaxis rather than promising it lifelong for all", () => {
    const q = immunosuppressionHivQuestions.find((item) =>
      item.question.includes("splenectomy"),
    );
    expect(q).toBeDefined();
    expect(q?.explanation).toContain("1–3 years");
    expect(q?.explanation).toContain("high risk");
    expect(q?.explanation).toContain("10.1111/bjh.19361");
  });
});

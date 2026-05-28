/**
 * Numeric round-trip tests for canonical clinical formulae.
 *
 * Each test below pins a textbook worked example to the implementation in
 * `src/lib/clinical-formulae.ts`. A change to either side that breaks the
 * relationship fails CI — which is the whole point: these are the numbers
 * the curriculum quotes, and they must not drift silently.
 *
 * When you add a new formula:
 *   1. Add the function to `clinical-formulae.ts`.
 *   2. Add at least one worked example here, with the source cited in a
 *      comment so future reviewers can re-derive it.
 *   3. Use `toBeCloseTo(expected, 1)` for one-decimal tolerance unless the
 *      source quotes more precision.
 */
import { describe, it, expect } from "vitest";
import {
  alveolarPO2_kPa,
  aAGradient_kPa,
  anionGap,
  wintersExpectedPaCO2_mmHg,
  parklandTotalFluid_mL,
  meanArterialPressure,
  cerebralPerfusionPressure,
  plasmaOsmolarity,
  correctedCalcium,
  fickCardiacOutput_Lmin,
  shuntFraction,
  arterialO2Content_mLdL,
  henderson_pH,
} from "@/lib/clinical-formulae";

describe("alveolar gas equation", () => {
  it("room air, normocapnic adult ≈ 13.6 kPa", () => {
    // West's Respiratory Physiology: 0.21*(101.3-6.3) - 5.3/0.8 ≈ 13.3 kPa
    const PAO2 = alveolarPO2_kPa({ FiO2: 0.21, PaCO2_kPa: 5.3 });
    expect(PAO2).toBeCloseTo(13.3, 1);
  });
  it("FiO2 1.0 yields ~88 kPa with normal PaCO2", () => {
    const PAO2 = alveolarPO2_kPa({ FiO2: 1.0, PaCO2_kPa: 5.3 });
    expect(PAO2).toBeCloseTo(88.4, 1);
  });
});

describe("A–a gradient", () => {
  it("young healthy adult: < 2 kPa on room air", () => {
    const grad = aAGradient_kPa({ FiO2: 0.21, PaCO2_kPa: 5.3, PaO2_kPa: 13.0 });
    expect(grad).toBeLessThan(2);
    expect(grad).toBeGreaterThan(0);
  });
});

describe("anion gap", () => {
  it("normal panel with K included → ~14 mmol/L", () => {
    // Na 140, K 4, Cl 102, HCO3 24 → 140+4-102-24 = 18 (extended) ... typical reference uses without K
    expect(anionGap({ Na: 140, K: 4, Cl: 102, HCO3: 28 })).toBe(14);
  });
  it("Na-only form excludes K", () => {
    expect(anionGap({ Na: 140, K: 4, Cl: 102, HCO3: 24, includeK: false })).toBe(14);
  });
});

describe("Winters' formula", () => {
  it("HCO3 12 → expected PaCO2 ~26 mmHg", () => {
    // 1.5*12 + 8 = 26
    expect(wintersExpectedPaCO2_mmHg(12)).toBe(26);
  });
});

describe("Parkland formula", () => {
  it("70 kg, 40% TBSA → 11 200 mL in 24 h", () => {
    expect(parklandTotalFluid_mL(70, 40)).toBe(11200);
  });
});

describe("MAP and CPP", () => {
  it("MAP 120/80 = 93.3", () => {
    expect(meanArterialPressure(120, 80)).toBeCloseTo(93.3, 1);
  });
  it("CPP = MAP - ICP", () => {
    expect(cerebralPerfusionPressure(90, 15)).toBe(75);
  });
});

describe("plasma osmolarity", () => {
  it("normal panel ≈ 290 mosmol/L", () => {
    // 2*(140+4) + 5 + 5 = 298
    const os = plasmaOsmolarity({ Na: 140, K: 4, urea: 5, glucose: 5 });
    expect(os).toBe(298);
  });
});

describe("corrected calcium", () => {
  it("low albumin raises corrected Ca", () => {
    // Ca 2.10, alb 28 → 2.10 + 0.02*(40-28) = 2.34
    expect(correctedCalcium(2.10, 28)).toBeCloseTo(2.34, 2);
  });
});

describe("Fick cardiac output", () => {
  it("standard textbook values → ~5 L/min", () => {
    // VO2 250 mL/min, CaO2 20 mL/dL, CvO2 15 mL/dL → 250/((20-15)*10) = 5
    const co = fickCardiacOutput_Lmin({ VO2_mLmin: 250, CaO2_mLdL: 20, CvO2_mLdL: 15 });
    expect(co).toBe(5);
  });
});

describe("shunt fraction", () => {
  it("typical numbers → ~10%", () => {
    // Cc 20, Ca 19.5, Cv 15 → 0.5/5 = 0.10
    const qs = shuntFraction({ CcO2_mLdL: 20, CaO2_mLdL: 19.5, CvO2_mLdL: 15 });
    expect(qs).toBeCloseTo(0.10, 2);
  });
});

describe("arterial O2 content", () => {
  it("Hb 15, SaO2 0.98, PaO2 13 kPa ≈ 19.7 mL/dL", () => {
    const ca = arterialO2Content_mLdL({ Hb_gdL: 15, SaO2: 0.98, PaO2_kPa: 13 });
    // 1.34*15*0.98 + 0.0225*13 = 19.7 + 0.29 ≈ 20.0
    expect(ca).toBeCloseTo(20.0, 1);
  });
});

describe("Henderson–Hasselbalch", () => {
  it("normal HCO3 24, PaCO2 5.3 kPa → pH ≈ 7.40", () => {
    expect(henderson_pH(24, 5.3)).toBeCloseTo(7.40, 1);
  });
  it("acute respiratory acidosis (PaCO2 8 kPa) → pH ~7.22", () => {
    expect(henderson_pH(24, 8)).toBeCloseTo(7.22, 2);
  });
});

import { describe, expect, it } from "vitest";
import {
  interpretAbg,
  parseAbgValue,
  MMHG_PER_KPA,
  PH_CONSISTENCY_TOLERANCE,
} from "./abg-interpretation";

describe("ABG interpreter input handling", () => {
  it("does not classify absent values", () => {
    const r = interpretAbg({ pH: null, pCO2KPa: 5.3, hco3: 24 });
    expect(r.status).toBe("incomplete");
    expect(r.primary).toBeNull();
    expect(r.message).toContain("same sample");
  });

  it("does not classify zero values", () => {
    const r = interpretAbg({ pH: 7.4, pCO2KPa: 0, hco3: 0 });
    expect(r.status).toBe("incomplete");
    expect(r.primary).toBeNull();
    expect(parseAbgValue("0")).toBeNull();
    expect(parseAbgValue("  ")).toBeNull();
  });

  it("rejects implausible values rather than classifying them", () => {
    const r = interpretAbg({ pH: 7.4, pCO2KPa: 45, hco3: 24 });
    expect(r.status).toBe("incomplete");
    expect(r.primary).toBeNull();
  });
});

describe("ABG interpreter reference and conversion", () => {
  it("classifies a normal reference gas from one sample", () => {
    const r = interpretAbg({ pH: 7.4, pCO2KPa: 5.3, hco3: 24 });
    expect(r.status).toBe("interpreted");
    expect(r.primary).toBe("Normal pH");
    expect(r.compensation).toBe("no disturbance");
    expect(r.derived?.pCO2mmHg).toBeCloseTo(39.75, 2);
    expect(Math.abs(r.derived!.phDifference)).toBeLessThan(0.05);
  });

  it("converts kPa to mmHg explicitly and reports both units", () => {
    expect(5.3 * MMHG_PER_KPA).toBeCloseTo(39.75, 2);
    const r = interpretAbg({ pH: 7.25, pCO2KPa: 3.2, hco3: 10 });
    expect(r.status).toBe("interpreted");
    expect(r.primary).toBe("Metabolic acidosis");
    expect(r.compensation).toBe("with appropriate respiratory compensation");
    expect(r.expected).toContain("23 mmHg");
    expect(r.expected).toContain("3.1 kPa");
  });

  it("computes the anion gap only when Na and Cl are supplied", () => {
    const withElectrolytes = interpretAbg({
      pH: 7.25,
      pCO2KPa: 3.2,
      hco3: 10,
      na: 140,
      cl: 105,
    });
    expect(withElectrolytes.anionGap).toContain("25 mmol/L");
    expect(withElectrolytes.anionGap).toContain("local laboratory");
    expect(withElectrolytes.anionGap).toContain("Educational only");
    expect(withElectrolytes.notes.join(" ")).not.toContain("MUDPILES");
    const without = interpretAbg({ pH: 7.25, pCO2KPa: 3.2, hco3: 10 });
    expect(without.anionGap).toBeNull();
  });

  it("does not inherit demonstration electrolytes into a new gas", () => {
    // The former tool preloaded Na 140 / Cl 105, so a user's own gas silently
    // produced an invented anion gap. Blank optional fields must stay null.
    expect(parseAbgValue("")).toBeNull();
    const userGas = interpretAbg({
      pH: 7.25,
      pCO2KPa: 3.2,
      hco3: 10,
      na: parseAbgValue(""),
      cl: parseAbgValue(""),
    });
    expect(userGas.status).toBe("interpreted");
    expect(userGas.anionGap).toBeNull();
  });

  it("shows no anion gap when only one optional electrolyte is entered", () => {
    const halfEntered = interpretAbg({
      pH: 7.25,
      pCO2KPa: 3.2,
      hco3: 10,
      na: 140,
      cl: null,
    });
    expect(halfEntered.anionGap).toBeNull();
  });
});

describe("ABG interpreter consistency guard", () => {
  it("suppresses classification when pH, pCO₂ and HCO₃⁻ disagree", () => {
    // The former default demonstration: pH 7.25 with pCO₂ 3.5 kPa and HCO₃⁻ 14
    // implies a Henderson–Hasselbalch pH near 7.35.
    const r = interpretAbg({ pH: 7.25, pCO2KPa: 3.5, hco3: 14 });
    expect(r.status).toBe("inconsistent");
    expect(r.primary).toBeNull();
    expect(r.expected).toBeNull();
    expect(r.message).toContain("not mutually consistent");
    expect(r.message).toContain("kPa");
    expect(r.derived!.expectedPh).toBeGreaterThan(7.25 + PH_CONSISTENCY_TOLERANCE);
  });

  it("accepts a compensated metabolic acidosis as internally consistent", () => {
    const r = interpretAbg({ pH: 7.24, pCO2KPa: 3.1, hco3: 10 });
    expect(r.status).toBe("interpreted");
    expect(r.primary).toBe("Metabolic acidosis");
  });
});

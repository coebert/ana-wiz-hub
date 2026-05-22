/**
 * Automated diagram conversion tests.
 *
 * Verifies numerically that values surfaced inside diagrams (e.g. 1 atm in
 * mmHg / kPa / cmH₂O, body temperature in °C ↔ °F, weight in kg ↔ lb,
 * haemoglobin in g/L ↔ g/dL) round-trip correctly through `convertQty` for
 * every supported user preference combination.
 */
import { describe, it, expect } from "vitest";
import {
  convertQty,
  formatQty,
  DEFAULT_UNIT_PREFERENCES,
  type UnitPreferences,
  type PressureUnit,
  type TemperatureUnit,
  type WeightUnit,
  type HaemoglobinUnit,
} from "@/lib/units";

const prefs = (p: Partial<UnitPreferences>): UnitPreferences => ({
  ...DEFAULT_UNIT_PREFERENCES,
  ...p,
});

const approx = (a: number, b: number, tol: number) =>
  Math.abs(a - b) <= tol;

describe("pressure conversions (1 atm landmark)", () => {
  // 1 atm = 760 mmHg = 101.325 kPa ≈ 1033 cmH₂O
  it("760 mmHg → 101.325 kPa (±0.1)", () => {
    const { value, unit } = convertQty(760, "mmHg", prefs({ pressure: "kPa" }));
    expect(unit).toBe("kPa");
    expect(approx(value, 101.325, 0.1)).toBe(true);
  });

  it("760 mmHg → ≈1033 cmH₂O (±1)", () => {
    const { value, unit } = convertQty(760, "mmHg", prefs({ pressure: "cmH2O" }));
    expect(unit).toBe("cmH2O");
    expect(approx(value, 1033, 1)).toBe(true);
  });

  it("101.325 kPa → 760 mmHg (±1)", () => {
    const { value } = convertQty(101.325, "kPa", prefs({ pressure: "mmHg" }));
    expect(approx(value, 760, 1)).toBe(true);
  });

  it("1033 cmH₂O → ≈760 mmHg (±1)", () => {
    const { value } = convertQty(1033, "cmH2O", prefs({ pressure: "mmHg" }));
    expect(approx(value, 760, 1)).toBe(true);
  });

  it("CVP 8 cmH₂O → ~5.9 mmHg (±0.2)", () => {
    const { value } = convertQty(8, "cmH2O", prefs({ pressure: "mmHg" }));
    expect(approx(value, 5.88, 0.2)).toBe(true);
  });

  it("MAP 90 mmHg → 12.0 kPa (±0.1)", () => {
    const { value } = convertQty(90, "mmHg", prefs({ pressure: "kPa" }));
    expect(approx(value, 12.0, 0.1)).toBe(true);
  });
});

describe("pressure round-trips across all unit pairs", () => {
  const units: PressureUnit[] = ["mmHg", "kPa", "cmH2O"];
  const samples = [0, 5, 40, 90, 120, 760];
  for (const from of units) {
    for (const to of units) {
      for (const v of samples) {
        it(`${v} ${from} → ${to} → ${from} round-trips`, () => {
          const a = convertQty(v, from, prefs({ pressure: to }));
          const b = convertQty(a.value, to, prefs({ pressure: from }));
          expect(approx(b.value, v, 0.01)).toBe(true);
        });
      }
    }
  }
});

describe("temperature conversions", () => {
  const cases: Array<[number, number]> = [
    [0, 32],
    [37, 98.6],
    [40, 104],
    [-40, -40],
    [100, 212],
  ];
  for (const [c, f] of cases) {
    it(`${c}°C ↔ ${f}°F`, () => {
      const toF = convertQty(c, "C", prefs({ temperature: "F" }));
      expect(approx(toF.value, f, 0.1)).toBe(true);
      const toC = convertQty(f, "F", prefs({ temperature: "C" }));
      expect(approx(toC.value, c, 0.1)).toBe(true);
    });
  }
});

describe("weight conversions", () => {
  it("70 kg → 154.32 lb (±0.05)", () => {
    const { value } = convertQty(70, "kg", prefs({ weight: "lb" }));
    expect(approx(value, 154.32, 0.05)).toBe(true);
  });
  it("220 lb → 99.79 kg (±0.05)", () => {
    const { value } = convertQty(220, "lb", prefs({ weight: "kg" }));
    expect(approx(value, 99.79, 0.05)).toBe(true);
  });
  const units: WeightUnit[] = ["kg", "lb"];
  for (const from of units) {
    for (const to of units) {
      for (const v of [1, 50, 70, 120]) {
        it(`${v} ${from} → ${to} → ${from} round-trips`, () => {
          const a = convertQty(v, from, prefs({ weight: to }));
          const b = convertQty(a.value, to, prefs({ weight: from }));
          expect(approx(b.value, v, 0.001)).toBe(true);
        });
      }
    }
  }
});

describe("haemoglobin conversions", () => {
  it("140 g/L → 14.0 g/dL", () => {
    const { value } = convertQty(140, "g/L", prefs({ haemoglobin: "g/dL" }));
    expect(approx(value, 14.0, 0.001)).toBe(true);
  });
  it("12.5 g/dL → 125 g/L", () => {
    const { value } = convertQty(12.5, "g/dL", prefs({ haemoglobin: "g/L" }));
    expect(approx(value, 125, 0.001)).toBe(true);
  });
  const units: HaemoglobinUnit[] = ["g/L", "g/dL"];
  for (const from of units) {
    for (const to of units) {
      for (const v of [70, 100, 140, 180]) {
        it(`${v} ${from} → ${to} → ${from} round-trips`, () => {
          const a = convertQty(v, from, prefs({ haemoglobin: to }));
          const b = convertQty(a.value, to, prefs({ haemoglobin: from }));
          expect(approx(b.value, v, 0.001)).toBe(true);
        });
      }
    }
  }
});

describe("formatQty display strings", () => {
  it("760 mmHg → '101.3 kPa' in kPa preference", () => {
    expect(formatQty(760, "mmHg", prefs({ pressure: "kPa" }))).toBe("101.3 kPa");
  });
  it("37 C → '98.6 F' in °F preference", () => {
    expect(formatQty(37, "C", prefs({ temperature: "F" }))).toBe("98.6 F");
  });
  it("70 kg → '154.3 lb' in lb preference", () => {
    expect(formatQty(70, "kg", prefs({ weight: "lb" }))).toBe("154.3 lb");
  });
  it("140 g/L → '14.0 g/dL' in g/dL preference", () => {
    expect(formatQty(140, "g/L", prefs({ haemoglobin: "g/dL" }))).toBe("14.0 g/dL");
  });
});

describe("identity (no preference change)", () => {
  const tempUnits: TemperatureUnit[] = ["C", "F"];
  for (const u of tempUnits) {
    it(`temperature ${u} → ${u} is identity`, () => {
      const { value, converted } = convertQty(42, u, prefs({ temperature: u }));
      expect(value).toBe(42);
      expect(converted).toBe(false);
    });
  }
});

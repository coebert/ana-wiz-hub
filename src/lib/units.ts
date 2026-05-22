/**
 * Unit conversion helpers for user-switchable measurement preferences.
 *
 * Conventions:
 *  - Each "family" (pressure / temperature / weight / haemoglobin) has a
 *    canonical base unit used internally. Values authored in any supported
 *    unit are first converted to base, then formatted to the user's chosen
 *    unit.
 *  - Conversions are pure functions; no React, safe for tests.
 */

export type PressureUnit = "mmHg" | "kPa" | "cmH2O";
export type TemperatureUnit = "C" | "F";
export type WeightUnit = "kg" | "lb";
export type HaemoglobinUnit = "g/L" | "g/dL";

export type UnitFamily = "pressure" | "temperature" | "weight" | "haemoglobin";

export interface UnitPreferences {
  pressure: PressureUnit;
  temperature: TemperatureUnit;
  weight: WeightUnit;
  haemoglobin: HaemoglobinUnit;
}

export const DEFAULT_UNIT_PREFERENCES: UnitPreferences = {
  pressure: "mmHg",
  temperature: "C",
  weight: "kg",
  haemoglobin: "g/L",
};

// ---------- Pressure (base = mmHg) ----------
const KPA_PER_MMHG = 0.133322;
const CMH2O_PER_MMHG = 1.35951;

const pressureToMmHg = (v: number, u: PressureUnit): number => {
  if (u === "mmHg") return v;
  if (u === "kPa") return v / KPA_PER_MMHG;
  return v / CMH2O_PER_MMHG; // cmH2O
};
const pressureFromMmHg = (v: number, u: PressureUnit): number => {
  if (u === "mmHg") return v;
  if (u === "kPa") return v * KPA_PER_MMHG;
  return v * CMH2O_PER_MMHG;
};

// ---------- Temperature (base = °C) ----------
const tempToC = (v: number, u: TemperatureUnit): number =>
  u === "C" ? v : ((v - 32) * 5) / 9;
const tempFromC = (v: number, u: TemperatureUnit): number =>
  u === "C" ? v : (v * 9) / 5 + 32;

// ---------- Weight (base = kg) ----------
const LB_PER_KG = 2.20462;
const weightToKg = (v: number, u: WeightUnit): number =>
  u === "kg" ? v : v / LB_PER_KG;
const weightFromKg = (v: number, u: WeightUnit): number =>
  u === "kg" ? v : v * LB_PER_KG;

// ---------- Haemoglobin (base = g/L) ----------
const hbToGL = (v: number, u: HaemoglobinUnit): number =>
  u === "g/L" ? v : v * 10;
const hbFromGL = (v: number, u: HaemoglobinUnit): number =>
  u === "g/L" ? v : v / 10;

export type AnyUnit = PressureUnit | TemperatureUnit | WeightUnit | HaemoglobinUnit;

export interface ConvertedQty {
  value: number;
  unit: AnyUnit;
  /** True if displayed unit differs from source unit. */
  converted: boolean;
}

const familyOf = (unit: AnyUnit): UnitFamily | null => {
  if (unit === "mmHg" || unit === "kPa" || unit === "cmH2O") return "pressure";
  if (unit === "C" || unit === "F") return "temperature";
  if (unit === "kg" || unit === "lb") return "weight";
  if (unit === "g/L" || unit === "g/dL") return "haemoglobin";
  return null;
};

/**
 * Convert a value authored in `fromUnit` to the user's preferred unit for
 * its family. Returns original value if the family is unknown.
 */
export const convertQty = (
  value: number,
  fromUnit: AnyUnit,
  prefs: UnitPreferences,
): ConvertedQty => {
  const fam = familyOf(fromUnit);
  if (fam === null) return { value, unit: fromUnit, converted: false };

  let target: AnyUnit;
  let out: number;
  switch (fam) {
    case "pressure": {
      target = prefs.pressure;
      out = pressureFromMmHg(pressureToMmHg(value, fromUnit as PressureUnit), target as PressureUnit);
      break;
    }
    case "temperature": {
      target = prefs.temperature;
      out = tempFromC(tempToC(value, fromUnit as TemperatureUnit), target as TemperatureUnit);
      break;
    }
    case "weight": {
      target = prefs.weight;
      out = weightFromKg(weightToKg(value, fromUnit as WeightUnit), target as WeightUnit);
      break;
    }
    case "haemoglobin": {
      target = prefs.haemoglobin;
      out = hbFromGL(hbToGL(value, fromUnit as HaemoglobinUnit), target as HaemoglobinUnit);
      break;
    }
  }
  return { value: out, unit: target, converted: target !== fromUnit };
};

/** Sensible default number of decimal places per unit. */
export const defaultDigits = (unit: AnyUnit): number => {
  switch (unit) {
    case "kPa":
    case "cmH2O":
      return 1;
    case "mmHg":
      return 0;
    case "C":
    case "F":
      return 1;
    case "kg":
      return 1;
    case "lb":
      return 1;
    case "g/L":
      return 0;
    case "g/dL":
      return 1;
    default:
      return 1;
  }
};

export const formatQty = (
  value: number,
  fromUnit: AnyUnit,
  prefs: UnitPreferences,
  digits?: number,
): string => {
  const c = convertQty(value, fromUnit, prefs);
  const d = digits ?? defaultDigits(c.unit);
  return `${c.value.toFixed(d)} ${c.unit}`;
};

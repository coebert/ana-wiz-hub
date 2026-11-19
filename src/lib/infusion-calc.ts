/**
 * Infusion pump rate arithmetic.
 *
 * Pure module so the pump calculator's behaviour can be tested with zero,
 * blank, boundary and out-of-range inputs without rendering React.
 *
 * Internal base units: drug amount in micrograms (or units, unchanged), rate
 * in mL/h.
 */

export type MassUnit = "mg" | "micrograms" | "units";
export type RateUnit = "per-hour" | "per-min";
export type DoseMode = "fixed" | "per-kg";

/** Plausible input bounds. Outside these the calculation refuses rather than guesses. */
export const INFUSION_LIMITS = {
  weightKg: { min: 0.3, max: 500 },
  volumeMl: { min: 0.1, max: 2000 },
  amount: { min: 0.001, max: 1_000_000 },
  dose: { min: 0, max: 1_000_000 },
  pumpRateMlPerHour: { min: 0, max: 2000 },
} as const;

export type InfusionError =
  | "unit-mismatch"
  | "invalid-amount"
  | "invalid-volume"
  | "missing-dose"
  | "invalid-dose"
  | "invalid-weight"
  | "missing-pump-rate"
  | "invalid-pump-rate";

/** Convert a mass/unit amount to micrograms (or units, unchanged). */
export function toBase(amount: number, unit: MassUnit): number {
  return unit === "mg" ? amount * 1000 : amount;
}

/** mg and micrograms are inter-convertible; units only match units. */
export function unitsCompatible(a: MassUnit, b: MassUnit): boolean {
  return (a === "units" && b === "units") || (a !== "units" && b !== "units");
}

function isFiniteNumber(n: unknown): n is number {
  return typeof n === "number" && Number.isFinite(n);
}

function inRange(n: number, range: { min: number; max: number }): boolean {
  return n >= range.min && n <= range.max;
}

interface SyringeInput {
  amount: number;
  amountUnit: MassUnit;
  volumeMl: number;
  doseUnit: MassUnit;
  doseMode: DoseMode;
  weightKg: number;
}

type SyringeCheck =
  | { ok: true; concPerMl: number }
  | { ok: false; error: InfusionError };

/** Validate syringe contents and return the concentration in µg/mL (or units/mL). */
function checkSyringe(input: SyringeInput): SyringeCheck {
  if (!unitsCompatible(input.amountUnit, input.doseUnit)) {
    return { ok: false, error: "unit-mismatch" };
  }
  if (!isFiniteNumber(input.amount) || !inRange(input.amount, INFUSION_LIMITS.amount)) {
    return { ok: false, error: "invalid-amount" };
  }
  if (!isFiniteNumber(input.volumeMl) || !inRange(input.volumeMl, INFUSION_LIMITS.volumeMl)) {
    return { ok: false, error: "invalid-volume" };
  }
  if (
    input.doseMode === "per-kg" &&
    (!isFiniteNumber(input.weightKg) || !inRange(input.weightKg, INFUSION_LIMITS.weightKg))
  ) {
    return { ok: false, error: "invalid-weight" };
  }
  return { ok: true, concPerMl: toBase(input.amount, input.amountUnit) / input.volumeMl };
}

export interface ForwardInput extends SyringeInput {
  /** Prescribed dose. `null` means the field is blank. */
  dose: number | null;
  doseRate: RateUnit;
}

export type ForwardResult =
  | {
      ok: true;
      concPerMl: number;
      rateMlPerHour: number;
      amountPerHour: number;
      dayVolumeMl: number;
      syringeHours: number;
    }
  | { ok: false; error: InfusionError };

/** Dose → pump rate (mL/h). A blank or non-positive dose is never inferred. */
export function calculatePumpRate(input: ForwardInput): ForwardResult {
  const syringe = checkSyringe(input);
  if (!syringe.ok) return syringe;

  if (input.dose === null || Number.isNaN(input.dose)) {
    return { ok: false, error: "missing-dose" };
  }
  if (
    !isFiniteNumber(input.dose) ||
    input.dose <= INFUSION_LIMITS.dose.min ||
    !inRange(input.dose, INFUSION_LIMITS.dose)
  ) {
    return { ok: false, error: "invalid-dose" };
  }

  const perHour = input.doseRate === "per-min" ? input.dose * 60 : input.dose;
  const weightTerm = input.doseMode === "per-kg" ? input.weightKg : 1;
  const amountPerHour = toBase(perHour, input.doseUnit) * weightTerm;
  const rateMlPerHour = amountPerHour / syringe.concPerMl;

  return {
    ok: true,
    concPerMl: syringe.concPerMl,
    rateMlPerHour,
    amountPerHour,
    dayVolumeMl: rateMlPerHour * 24,
    syringeHours: amountPerHour > 0 ? toBase(input.amount, input.amountUnit) / amountPerHour : 0,
  };
}

export interface ReverseInput extends SyringeInput {
  /** Running pump rate. `null` means the field is blank. */
  pumpRateMlPerHour: number | null;
  doseRate: RateUnit;
}

export type ReverseResult =
  | {
      ok: true;
      concPerMl: number;
      rateMlPerHour: number;
      amountPerHour: number;
      dayVolumeMl: number;
      syringeHours: number;
      displayDose: number;
    }
  | { ok: false; error: InfusionError };

/** Pump rate (mL/h) → delivered dose, in the selected dose unit/mode. */
export function calculateDeliveredDose(input: ReverseInput): ReverseResult {
  const syringe = checkSyringe(input);
  if (!syringe.ok) return syringe;

  if (input.pumpRateMlPerHour === null || Number.isNaN(input.pumpRateMlPerHour)) {
    return { ok: false, error: "missing-pump-rate" };
  }
  if (
    !isFiniteNumber(input.pumpRateMlPerHour) ||
    input.pumpRateMlPerHour <= INFUSION_LIMITS.pumpRateMlPerHour.min ||
    !inRange(input.pumpRateMlPerHour, INFUSION_LIMITS.pumpRateMlPerHour)
  ) {
    return { ok: false, error: "invalid-pump-rate" };
  }

  const amountPerHour = input.pumpRateMlPerHour * syringe.concPerMl;
  const divisor = input.doseMode === "per-kg" ? input.weightKg : 1;
  const perHour = amountPerHour / divisor;
  const perRate = input.doseRate === "per-min" ? perHour / 60 : perHour;
  const displayDose = input.doseUnit === "mg" ? perRate / 1000 : perRate;

  return {
    ok: true,
    concPerMl: syringe.concPerMl,
    rateMlPerHour: input.pumpRateMlPerHour,
    amountPerHour,
    dayVolumeMl: input.pumpRateMlPerHour * 24,
    syringeHours: input.volumeMl / input.pumpRateMlPerHour,
    displayDose,
  };
}

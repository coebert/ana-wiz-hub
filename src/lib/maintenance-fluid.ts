/**
 * Maintenance fluid arithmetic for adults (NICE CG174), children and term
 * neonates (NICE NG29).
 *
 * Pure module so the calculator's behaviour can be tested with zero, blank,
 * boundary and out-of-range inputs without rendering React.
 *
 * Deliberate separations:
 *   • NG29 gives children an exact *daily* Holliday–Segar figure
 *     (100/50/20 mL/kg/day). The 4-2-1 mL/kg/h form is an approximation and is
 *     returned separately, never as the authoritative daily prescription.
 *   • Term neonates are dosed by age in days under NG29; the Holliday–Segar
 *     and 4-2-1 rules are not applied to them.
 *   • Adults use CG174's 25–30 mL/kg/day range, which is subject to explicit
 *     clinical adjustment (ideal body weight in obesity, lower range in
 *     frailty/renal/cardiac disease/refeeding risk) and is not a bolus.
 */

export type FluidPatientGroup = "adult" | "child" | "neonate";

export const FLUID_LIMITS = {
  weightKg: { min: 0.3, max: 500 },
  ageDays: { min: 0, max: 28 },
} as const;

export interface DailyRange {
  minMlPerDay: number;
  maxMlPerDay: number;
  minMlPerKgPerDay: number;
  maxMlPerKgPerDay: number;
}

function isUsableWeight(weightKg: number): boolean {
  return (
    Number.isFinite(weightKg) &&
    weightKg >= FLUID_LIMITS.weightKg.min &&
    weightKg <= FLUID_LIMITS.weightKg.max
  );
}

/**
 * NG29 exact daily maintenance for children and young people:
 * 100 mL/kg/day for the first 10 kg, 50 for the next 10 kg, 20 thereafter.
 * Returns `null` outside the usable weight range.
 */
export function childDailyMaintenanceMlPerDay(weightKg: number): number | null {
  if (!isUsableWeight(weightKg)) return null;
  if (weightKg <= 10) return 100 * weightKg;
  if (weightKg <= 20) return 1000 + 50 * (weightKg - 10);
  return 1000 + 500 + 20 * (weightKg - 20);
}

/**
 * The 4-2-1 approximation in mL/h (4 mL/kg/h first 10 kg, 2 next 10, 1 above).
 * This is an hourly estimate, not the NG29 daily prescription.
 */
export function childHourlyApproximationMlPerHour(weightKg: number): number | null {
  if (!isUsableWeight(weightKg)) return null;
  if (weightKg <= 10) return 4 * weightKg;
  if (weightKg <= 20) return 40 + 2 * (weightKg - 10);
  return 60 + 1 * (weightKg - 20);
}

/** NG29 daily child total expressed as a range, plus the exact hourly form. */
export function childDailyRange(weightKg: number): DailyRange | null {
  const daily = childDailyMaintenanceMlPerDay(weightKg);
  if (daily === null) return null;
  return {
    minMlPerDay: daily,
    maxMlPerDay: daily,
    minMlPerKgPerDay: daily / weightKg,
    maxMlPerKgPerDay: daily / weightKg,
  };
}

/** CG174 adult routine maintenance: 25–30 mL/kg/day, before clinical adjustment. */
export function adultDailyRange(weightKg: number): DailyRange | null {
  if (!isUsableWeight(weightKg)) return null;
  return {
    minMlPerDay: 25 * weightKg,
    maxMlPerDay: 30 * weightKg,
    minMlPerKgPerDay: 25,
    maxMlPerKgPerDay: 30,
  };
}

export interface NeonateBand {
  label: string;
  minMlPerKgPerDay: number;
  maxMlPerKgPerDay: number;
}

/** NG29 recommendation 1.4.2 — term neonates by age. */
export const NEONATE_BANDS: ReadonlyArray<NeonateBand & { maxAgeDays: number }> = [
  { maxAgeDays: 1, label: "Birth to day 1", minMlPerKgPerDay: 50, maxMlPerKgPerDay: 60 },
  { maxAgeDays: 2, label: "Day 2", minMlPerKgPerDay: 70, maxMlPerKgPerDay: 80 },
  { maxAgeDays: 3, label: "Day 3", minMlPerKgPerDay: 80, maxMlPerKgPerDay: 100 },
  { maxAgeDays: 4, label: "Day 4", minMlPerKgPerDay: 100, maxMlPerKgPerDay: 120 },
  { maxAgeDays: 28, label: "Days 5–28", minMlPerKgPerDay: 120, maxMlPerKgPerDay: 150 },
];

/**
 * NG29 term-neonate maintenance band for an age in whole days.
 * Returns `null` for a blank/invalid or out-of-range age.
 */
export function neonateBand(ageDays: number): (NeonateBand & { maxAgeDays: number }) | null {
  if (
    !Number.isFinite(ageDays) ||
    ageDays < FLUID_LIMITS.ageDays.min ||
    ageDays > FLUID_LIMITS.ageDays.max
  ) {
    return null;
  }
  return NEONATE_BANDS.find((band) => ageDays <= band.maxAgeDays) ?? null;
}

/** NG29 term-neonate daily range in mL/day for an age in whole days. */
export function neonateDailyRange(weightKg: number, ageDays: number): DailyRange | null {
  const band = neonateBand(ageDays);
  if (!band || !isUsableWeight(weightKg)) return null;
  return {
    minMlPerDay: band.minMlPerKgPerDay * weightKg,
    maxMlPerDay: band.maxMlPerKgPerDay * weightKg,
    minMlPerKgPerDay: band.minMlPerKgPerDay,
    maxMlPerKgPerDay: band.maxMlPerKgPerDay,
  };
}

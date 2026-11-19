/**
 * Paediatric emergency dose arithmetic for /tools/paediatric-emergency-doses.
 *
 * Sources are the named UK documents only:
 *  - Resuscitation Council UK, Paediatric emergency algorithms & resources
 *    (G2025, Feb 2026, V3) — arrest drugs, defibrillation and cardioversion.
 *  - Paracetamol 10 mg/mL solution for infusion SmPC (emc 100803, Apr 2025) —
 *    intravenous weight bands, daily ceilings and infusion time.
 *  - Ondansetron 2 mg/mL solution for injection SmPC — PONV dose/ceiling.
 *
 * Arithmetic only. Every helper returns `null` where the named source does not
 * support that weight, age or route, so the UI can never render an uncapped or
 * extrapolated dose. These are not prescriptions and do not replace the local
 * protocol or a pharmacist's review.
 */

import { ivParacetamolLimits } from "./anaesthesia-dose-calculation";

export const RCUK_PAEDIATRIC_CHART_URL =
  "https://www.resus.org.uk/sites/default/files/2026-02/RCUK%20G2025%20PAED%20PET%20Feb%2026%20V3.pdf";
export const IV_PARACETAMOL_SMPC_URL = "https://www.medicines.org.uk/emc/product/100803/smpc";
export const ONDANSETRON_SMPC_URL = "https://www.medicines.org.uk/emc/product/8482/smpc";

const isPositiveFinite = (n: unknown): n is number =>
  typeof n === "number" && Number.isFinite(n) && n > 0;

/* ────────────────────────── IV paracetamol (SmPC 100803) ────────────────────────── */

export interface IvParacetamolDose {
  doseMg: number;
  maxDailyMg: number;
  band: string;
  intervalHours: number;
  infusionMinutes: number;
}

/** Weight band label for the named IV product; `null` when the weight is invalid. */
export function ivParacetamolBand(weightKg: number): string | null {
  if (!isPositiveFinite(weightKg)) return null;
  if (weightKg <= 10) return "≤10 kg (7.5 mg/kg)";
  if (weightKg <= 33) return ">10–33 kg (15 mg/kg)";
  if (weightKg <= 50) return ">33–50 kg (15 mg/kg)";
  return ">50 kg (1 g)";
}

/**
 * IV paracetamol bands from the named UK product. No preterm dosing exists in
 * this SmPC, and the 4-hour minimum interval is a product requirement.
 */
export function ivParacetamolDose(
  weightKg: number,
  hepatotoxicityRisk = false
): IvParacetamolDose | null {
  const limits = ivParacetamolLimits(weightKg, hepatotoxicityRisk);
  const band = ivParacetamolBand(weightKg);
  if (!limits || !band) return null;
  return {
    doseMg: limits.doseMg,
    maxDailyMg: limits.dailyMg,
    band,
    intervalHours: 4,
    infusionMinutes: 15,
  };
}

/* ────────────────────────── Oral paracetamol (BNFc) ────────────────────────── */

export interface OralParacetamolDose {
  minDoseMg: number;
  maxDoseMg: number;
  maxDailyMg: number;
  intervalHours: number;
  maxDosesPerDay: number;
}

/**
 * Oral paracetamol: 10–15 mg/kg per dose, 4–6 hourly, maximum four doses and
 * 60 mg/kg (max 4 g) in 24 hours (BNF for Children). The named infant
 * suspension is not for babies under 2 months, whose analgesia needs a
 * specialist neonatal regimen — those return `null`.
 */
export function oralParacetamolDose(
  weightKg: number,
  ageMonths: number
): OralParacetamolDose | null {
  if (!isPositiveFinite(weightKg) || !Number.isFinite(ageMonths) || ageMonths < 2) return null;
  const maxDoseMg = Math.min(weightKg * 15, 1000);
  return {
    minDoseMg: weightKg * 10,
    maxDoseMg,
    maxDailyMg: Math.min(weightKg * 60, 4000),
    intervalHours: 4,
    maxDosesPerDay: 4,
  };
}

/* ────────────────────────── RCUK arrest drugs ────────────────────────── */

export interface ArrestDose {
  amount: number;
  unit: "micrograms" | "mg";
  cappedAt?: number;
  /** Volume in mL of the stated strength, where the chart gives one. */
  volumeMl?: number;
  volumeStrength?: string;
}

/** Adrenaline 1:10,000 (100 micrograms/mL), 10 micrograms/kg IV/IO, maximum 1 mg. */
export function arrestAdrenaline(weightKg: number): ArrestDose | null {
  if (!isPositiveFinite(weightKg)) return null;
  const raw = weightKg * 10;
  const amount = Math.min(raw, 1000);
  return {
    amount,
    unit: "micrograms",
    cappedAt: amount < raw ? 1000 : undefined,
    volumeMl: amount / 100,
    volumeStrength: "1:10,000 (100 micrograms/mL)",
  };
}

/** Amiodarone 5 mg/kg IV/IO after the 3rd shock (max 300 mg) or the 5th shock (max 150 mg). */
export function arrestAmiodarone(weightKg: number, doseNumber: 1 | 2): ArrestDose | null {
  if (!isPositiveFinite(weightKg)) return null;
  const cap = doseNumber === 1 ? 300 : 150;
  const raw = weightKg * 5;
  const amount = Math.min(raw, cap);
  return { amount, unit: "mg", cappedAt: amount < raw ? cap : undefined };
}

/** Atropine 20 micrograms/kg IV, maximum 600 micrograms. */
export function arrestAtropine(weightKg: number): ArrestDose | null {
  if (!isPositiveFinite(weightKg)) return null;
  const raw = weightKg * 20;
  const amount = Math.min(raw, 600);
  return { amount, unit: "micrograms", cappedAt: amount < raw ? 600 : undefined };
}

/* ────────────────────────── Defibrillation / cardioversion ────────────────────────── */

export interface DefibrillationPlan {
  /** First and subsequent manual shocks: 4 J/kg, chart column caps at 150 J. */
  initialJ: number;
  /** Refractory VF/pVT after the 5th shock: stepwise to 8 J/kg, max 360 J. */
  refractoryMaxJ: number;
  /** Synchronised cardioversion starts at 1 J/kg. */
  cardioversionInitialJ: number;
  /** …doubling each attempt to a maximum of 4 J/kg. */
  cardioversionMaxJ: number;
  adolescent: boolean;
  /** True when the 4 J/kg figure was limited by the chart's 150 J column. */
  initialCapped: boolean;
}

/**
 * RCUK 2025 staged defibrillation advice. Adolescents (≥12 years or ≥50 kg)
 * escalate to 360 J; younger children escalate stepwise to 8 J/kg (max 360 J).
 */
export function paediatricDefibrillation(
  weightKg: number,
  ageYears: number
): DefibrillationPlan | null {
  if (!isPositiveFinite(weightKg) || !Number.isFinite(ageYears) || ageYears < 0) return null;
  const adolescent = ageYears >= 12 || weightKg >= 50;
  const rawInitial = weightKg * 4;
  const initialJ = Math.min(rawInitial, 150);
  return {
    initialJ,
    refractoryMaxJ: adolescent ? 360 : Math.min(weightKg * 8, 360),
    cardioversionInitialJ: weightKg * 1,
    cardioversionMaxJ: Math.min(weightKg * 4, adolescent ? 360 : 150),
    adolescent,
    initialCapped: initialJ < rawInitial,
  };
}

/* ────────────────────────── Anti-emetics ────────────────────────── */

/** Ondansetron 0.1 mg/kg IV for PONV, maximum 4 mg; named SmPC covers children over 1 month. */
export function ondansetronPonv(weightKg: number, ageMonths: number): ArrestDose | null {
  if (!isPositiveFinite(weightKg) || !Number.isFinite(ageMonths) || ageMonths <= 1) return null;
  const raw = weightKg * 0.1;
  const amount = Math.min(raw, 4);
  return { amount, unit: "mg", cappedAt: amount < raw ? 4 : undefined };
}

/**
 * Dexamethasone 0.15 mg/kg for PONV prophylaxis, maximum 8 mg. This is a
 * guideline dose (APA 2016), not a UK product indication; no confirmed
 * paediatric PONV source supports it under 1 year, so that returns `null`.
 */
export function dexamethasonePonv(weightKg: number, ageYears: number): ArrestDose | null {
  if (!isPositiveFinite(weightKg) || !Number.isFinite(ageYears) || ageYears < 1) return null;
  const raw = weightKg * 0.15;
  const amount = Math.min(raw, 8);
  return { amount, unit: "mg", cappedAt: amount < raw ? 8 : undefined };
}

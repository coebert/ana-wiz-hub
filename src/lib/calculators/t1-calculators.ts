/**
 * Batch T1 (ROOT-12/13/14/15/18) — pure, tested arithmetic for four
 * educational calculators. Every helper returns `null` (or an ineligible
 * result) instead of a number when inputs are not finite and positive, so the
 * UI can never render a prescribing value from invalid input.
 *
 * These helpers compute named-source estimates only. They are not
 * prescriptions and do not certify any regimen.
 */

export const isPositiveFinite = (n: unknown): n is number =>
  typeof n === "number" && Number.isFinite(n) && n > 0;

/* ─────────────────────────── Opioids (FPM Opioids Aware) ─────────────────────────── */

export const FPM_URL =
  "https://www.fpm.ac.uk/opioids-aware-structured-approach-opioid-prescribing/dose-equivalents-and-changing-opioids";

/** FPM "Approximate equi-analgesic potencies … oral administration" (reviewed March 2023). Methadone excluded. */
export const FPM_ORAL = [
  { key: "morphine", label: "Morphine (oral)", potency: 1 },
  { key: "oxycodone", label: "Oxycodone (oral)", potency: 1.5 },
  { key: "hydromorphone", label: "Hydromorphone (oral)", potency: 5 },
  { key: "tapentadol", label: "Tapentadol (oral)", potency: 0.4 },
  { key: "codeine", label: "Codeine phosphate (oral)", potency: 0.1 },
  { key: "dihydrocodeine", label: "Dihydrocodeine (oral)", potency: 0.1 },
  { key: "tramadol", label: "Tramadol (oral)", potency: 0.1 },
] as const;
export type FpmOralKey = (typeof FPM_ORAL)[number]["key"];

/** FPM transdermal tables: patch rate (micrograms/hour) → oral morphine mg/24 h. Listed strengths only. */
export const FPM_PATCH: Record<"fentanyl" | "buprenorphine-weekly" | "buprenorphine-twice-weekly", { label: string; rows: { ugPerHour: number; morphineMgPerDay: number }[] }> = {
  fentanyl: {
    label: "Fentanyl patch (72-hourly)",
    rows: [
      { ugPerHour: 12, morphineMgPerDay: 30 },
      { ugPerHour: 25, morphineMgPerDay: 60 },
      { ugPerHour: 50, morphineMgPerDay: 120 },
      { ugPerHour: 75, morphineMgPerDay: 180 },
      { ugPerHour: 100, morphineMgPerDay: 240 },
    ],
  },
  "buprenorphine-weekly": {
    label: "Buprenorphine patch (changed weekly)",
    rows: [
      { ugPerHour: 5, morphineMgPerDay: 12 },
      { ugPerHour: 10, morphineMgPerDay: 24 },
      { ugPerHour: 20, morphineMgPerDay: 48 },
    ],
  },
  "buprenorphine-twice-weekly": {
    label: "Buprenorphine patch (changed every 3–4 days)",
    rows: [
      { ugPerHour: 35, morphineMgPerDay: 84 },
      { ugPerHour: 52, morphineMgPerDay: 126 },
      { ugPerHour: 70, morphineMgPerDay: 168 },
    ],
  },
};
export type FpmPatchKey = keyof typeof FPM_PATCH;

/** Oral morphine equivalent mg/24 h from an oral opioid. Null for invalid inputs. */
export function omeddFromOral(key: FpmOralKey, mgPerDose: number, dosesPerDay: number): number | null {
  const row = FPM_ORAL.find((r) => r.key === key);
  if (!row || !isPositiveFinite(mgPerDose) || !Number.isInteger(dosesPerDay) || dosesPerDay < 1 || dosesPerDay > 24) return null;
  return mgPerDose * dosesPerDay * row.potency;
}

/** Oral morphine mg/24 h for a LISTED patch strength (µg/h). No interpolation, no ÷24. */
export function omeddFromPatch(key: FpmPatchKey, ugPerHour: number): number | null {
  const row = FPM_PATCH[key]?.rows.find((r) => r.ugPerHour === ugPerHour);
  return row ? row.morphineMgPerDay : null;
}

/** FPM: at least 50% when OMEDD ≥500 mg/24 h, elderly/frail, or switching for intolerable effects. */
export function minimumFpmReduction(omedd: number, elderlyFrailOrIntolerable: boolean): number {
  return omedd >= 500 || elderlyFrailOrIntolerable ? 50 : 25;
}

/** Equianalgesic estimate of an oral target in mg/24 h, after the chosen reduction (0–100%). */
export function oralTargetDailyMg(omedd: number, targetKey: FpmOralKey, reductionPct: number): number | null {
  const row = FPM_ORAL.find((r) => r.key === targetKey);
  if (!row || !isPositiveFinite(omedd) || !Number.isFinite(reductionPct) || reductionPct < 0 || reductionPct >= 100) return null;
  return (omedd / row.potency) * (1 - reductionPct / 100);
}

/** Per-dose division uses the TARGET formulation's own interval — never the source's. */
export function perDoseMg(dailyMg: number | null, targetDosesPerDay: number | null): number | null {
  if (dailyMg === null || !isPositiveFinite(dailyMg)) return null;
  if (targetDosesPerDay === null || !Number.isInteger(targetDosesPerDay) || targetDosesPerDay < 1) return null;
  return dailyMg / targetDosesPerDay;
}

/* ─────────────────────────── Paediatric PCA / epidural (RCH Melbourne) ─────────────────────────── */

export const RCH_PCA_URL = "https://www.rch.org.au/anaes/pain_management/Patient_Controlled_Analgesia_PCA/";
export const RCH_EPIDURAL_URL = "https://www.rch.org.au/anaes/pain_management/Epidural_Infusion/";

type RchPcaDrug = "morphine" | "fentanyl" | "oxycodone" | "hydromorphone";
export interface RchPcaResult {
  band: "<45 kg" | "≥45 kg";
  syringe: string;
  bolusMl: number;
  bolusDose: number;
  bolusUnit: "micrograms";
  backgroundMlPerHour: string;
  backgroundDose: string;
}

/** RCH PCA dilution table. Measured weight only. Lockout and maximum are on the RCH prescription, not output here. */
export function rchPaedsPca(drug: RchPcaDrug, measuredWeightKg: number): RchPcaResult | null {
  if (!isPositiveFinite(measuredWeightKg) || measuredWeightKg > 150) return null;
  const w = measuredWeightKg;
  const small = w < 45;
  switch (drug) {
    case "morphine":
    case "oxycodone":
      return small
        ? { band: "<45 kg", syringe: `${round(0.5 * w, 2)} mg (0.5 mg/kg) in 50 mL 0.9% saline`, bolusMl: 2, bolusDose: round(20 * w, 1), bolusUnit: "micrograms", backgroundMlPerHour: "0.5", backgroundDose: `${round(5 * w, 1)} micrograms/h (5 micrograms/kg/h)` }
        : { band: "≥45 kg", syringe: "50 mg in 50 mL 0.9% saline", bolusMl: 1, bolusDose: 1000, bolusUnit: "micrograms", backgroundMlPerHour: "0.5", backgroundDose: "500 micrograms/h" };
    case "fentanyl":
      return small
        ? { band: "<45 kg", syringe: `${round(15 * w, 1)} micrograms (15 micrograms/kg) in 50 mL 0.9% saline`, bolusMl: 1, bolusDose: round(0.3 * w, 2), bolusUnit: "micrograms", backgroundMlPerHour: "1", backgroundDose: `${round(0.3 * w, 2)} micrograms/h (0.3 micrograms/kg/h)` }
        : { band: "≥45 kg", syringe: "750 micrograms in 50 mL 0.9% saline", bolusMl: 1, bolusDose: 15, bolusUnit: "micrograms", backgroundMlPerHour: "1", backgroundDose: "15 micrograms/h" };
    case "hydromorphone":
      return small
        ? { band: "<45 kg", syringe: `${round(0.1 * w, 3)} mg (0.1 mg/kg) in 50 mL 0.9% saline`, bolusMl: 2, bolusDose: round(4 * w, 1), bolusUnit: "micrograms", backgroundMlPerHour: "0.5", backgroundDose: `${round(1 * w, 1)} micrograms/h (1 microgram/kg/h)` }
        : { band: "≥45 kg", syringe: "6 mg in 50 mL 0.9% saline", bolusMl: 1, bolusDose: 120, bolusUnit: "micrograms", backgroundMlPerHour: "0.5–1", backgroundDose: "1–2 micrograms/kg/h (per RCH)" };
  }
}

export type EpiduralResult =
  | { eligible: true; minMlPerHour: number; maxMlPerHour: number; minMgPerKgHour: number; maxMgPerKgHour: number }
  | { eligible: false; reason: string };

/**
 * RCH protocol: ropivacaine 0.2% (2 mg/mL) at 0.1–0.3 mL/kg/h. Neonates (<44 weeks corrected PMA),
 * infants <8 months and significant hepatic impairment are special groups needing modified dosing —
 * no rate is produced for them. The protocol maximum is never exceeded.
 */
export function rchRopivacaineEpidural(measuredWeightKg: number, ageMonths: number, hepaticImpairment: boolean): EpiduralResult {
  if (!isPositiveFinite(measuredWeightKg) || measuredWeightKg > 150) return { eligible: false, reason: "Enter a valid measured weight." };
  if (!Number.isFinite(ageMonths) || ageMonths < 0 || ageMonths > 216) return { eligible: false, reason: "Enter a valid age in months (0–216)." };
  if (ageMonths < 8) return { eligible: false, reason: "RCH special group (neonate or infant under 8 months): modified dosing and duration — specialist prescription, no rate generated." };
  if (hepaticImpairment) return { eligible: false, reason: "RCH special group (significantly impaired liver function): specialist prescription, no rate generated." };
  return {
    eligible: true,
    minMlPerHour: 0.1 * measuredWeightKg,
    maxMlPerHour: 0.3 * measuredWeightKg,
    minMgPerKgHour: 0.2,
    maxMgPerKgHour: 0.6,
  };
}

/* ─────────────────────────── Adult ICU sedation ─────────────────────────── */

export type SedationUnit = "mg/kg/h" | "micrograms/kg/h" | "micrograms/kg/min";

/** Dose in native unit → mL/h. Null unless weight, dose and concentration are finite and positive. */
export function sedationMlPerHour(unit: SedationUnit, dose: number, weightKg: number, concUgPerMl: number): number | null {
  if (!isPositiveFinite(dose) || !isPositiveFinite(weightKg) || weightKg > 300 || !isPositiveFinite(concUgPerMl)) return null;
  const perHour = unit.endsWith("min") ? dose * 60 : dose;
  const ug = unit.startsWith("mg") ? perHour * 1000 : perHour;
  return (ug * weightKg) / concUgPerMl;
}

/** Devine ideal body weight (kg), used where the product specifies IBW (remifentanil in obesity). */
export function devineIbwKg(heightCm: number, sex: "male" | "female"): number | null {
  if (!isPositiveFinite(heightCm) || heightCm < 152.4 || heightCm > 250) return null;
  const inchesOver5ft = (heightCm - 152.4) / 2.54;
  return (sex === "male" ? 50 : 45.5) + 2.3 * inchesOver5ft;
}

/* ─────────────────────────── Burns fluid ─────────────────────────── */

export type BurnFormula = "parkland" | "nsw-modified-parkland" | "aba-adult" | "galveston";

export function mostellerBsa(weightKg: number, heightCm: number): number | null {
  if (!isPositiveFinite(weightKg) || !isPositiveFinite(heightCm)) return null;
  return Math.sqrt((heightCm * weightKg) / 3600);
}

/**
 * 24-h formula estimate (mL). Galveston already INCLUDES 2,000 mL/m² maintenance —
 * `includesMaintenance` tells the UI not to add another allowance.
 */
export function burnFormula24h(
  formula: BurnFormula,
  weightKg: number,
  tbsaPct: number,
  heightCm?: number,
): { totalMl: number; includesMaintenance: boolean } | null {
  if (!isPositiveFinite(weightKg) || !isPositiveFinite(tbsaPct) || tbsaPct > 100) return null;
  if (formula === "galveston") {
    const m2 = mostellerBsa(weightKg, heightCm ?? NaN);
    if (m2 === null) return null;
    return { totalMl: 5000 * m2 * (tbsaPct / 100) + 2000 * m2, includesMaintenance: true };
  }
  const factor = formula === "parkland" ? 4 : formula === "nsw-modified-parkland" ? 3 : 2;
  return { totalMl: factor * weightKg * tbsaPct, includesMaintenance: false };
}

export type FirstWindowPlan =
  | { status: "estimate-only"; first8Ml: number; next16Ml: number }
  | { status: "rate"; remainingFirst8Ml: number; hoursLeftInFirst8: number; mlPerHour: number }
  | { status: "first-8h-ended"; next16Ml: number; hoursLeftInDay: number }
  | { status: "window-ended" };

/**
 * Remaining first-8-h formula volume, timed from injury. A "rate now" is produced
 * ONLY when the volume actually given since injury is entered. After 8 h the
 * first-window instruction ends; after 24 h no first-day output is shown.
 */
export function burnFirstDayPlan(totalMl: number, hoursSinceBurn: number | null, givenSinceBurnMl: number | null): FirstWindowPlan | null {
  if (!isPositiveFinite(totalMl)) return null;
  const half = totalMl / 2;
  if (hoursSinceBurn === null || givenSinceBurnMl === null) return { status: "estimate-only", first8Ml: half, next16Ml: half };
  if (!Number.isFinite(hoursSinceBurn) || hoursSinceBurn < 0 || !Number.isFinite(givenSinceBurnMl) || givenSinceBurnMl < 0) return null;
  if (hoursSinceBurn >= 24) return { status: "window-ended" };
  if (hoursSinceBurn >= 8) return { status: "first-8h-ended", next16Ml: half, hoursLeftInDay: 24 - hoursSinceBurn };
  const remaining = Math.max(0, half - givenSinceBurnMl);
  const hoursLeft = 8 - hoursSinceBurn;
  return { status: "rate", remainingFirst8Ml: remaining, hoursLeftInFirst8: hoursLeft, mlPerHour: remaining / hoursLeft };
}

/** Ivy index comparison on TOTAL projected intake (formula + any separately prescribed fluids), mL/kg. */
export function ivyIndex(projectedTotalMl: number, weightKg: number) {
  if (!isPositiveFinite(weightKg) || !Number.isFinite(projectedTotalMl) || projectedTotalMl < 0) return null;
  const mlPerKg = projectedTotalMl / weightKg;
  return { mlPerKg, exceeds: mlPerKg > 250 };
}

export const urineTargetMlPerHour = (population: "adult" | "child", weightKg: number) =>
  isPositiveFinite(weightKg) ? (population === "child" ? 1 : 0.5) * weightKg : null;

function round(n: number, dp: number) {
  const f = 10 ** dp;
  return Math.round(n * f) / f;
}

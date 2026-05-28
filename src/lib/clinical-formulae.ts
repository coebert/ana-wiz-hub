/**
 * Canonical clinical formulae.
 *
 * Single source of truth for every formula quoted in the curriculum. Each
 * function below is the *authoritative* implementation — if a topic worked
 * example produces a different number, either the worked example is wrong
 * or the formula here is wrong. Unit tests in
 * `src/__tests__/clinical-formulae.test.ts` lock the numeric behaviour
 * against textbook examples so silent edits (a flipped sign, a missing
 * factor) fail CI.
 *
 * Conventions:
 * - Pressures in kPa unless the unit suffix says otherwise (e.g. mmHg).
 * - Concentrations in mmol/L.
 * - Volumes in mL.
 * - Weights in kg.
 *
 * Add a new formula here BEFORE quoting its result in any topic file.
 */

/** Alveolar gas equation. Returns PAO2 in kPa. */
export function alveolarPO2_kPa(args: {
  FiO2: number; // 0.21 .. 1.0
  Patm_kPa?: number; // default 101.3
  PH2O_kPa?: number; // default 6.3 (37 °C, fully saturated)
  PaCO2_kPa: number;
  R?: number; // respiratory quotient, default 0.8
}): number {
  const { FiO2, PaCO2_kPa } = args;
  const Patm = args.Patm_kPa ?? 101.3;
  const PH2O = args.PH2O_kPa ?? 6.3;
  const R = args.R ?? 0.8;
  return FiO2 * (Patm - PH2O) - PaCO2_kPa / R;
}

/** A–a gradient in kPa. */
export function aAGradient_kPa(args: {
  FiO2: number;
  PaCO2_kPa: number;
  PaO2_kPa: number;
  Patm_kPa?: number;
  PH2O_kPa?: number;
  R?: number;
}): number {
  return alveolarPO2_kPa(args) - args.PaO2_kPa;
}

/** Anion gap (mmol/L). Includes K by default; pass includeK:false for the Na-only form. */
export function anionGap(args: {
  Na: number;
  K?: number;
  Cl: number;
  HCO3: number;
  includeK?: boolean;
}): number {
  const includeK = args.includeK ?? true;
  const k = includeK ? (args.K ?? 0) : 0;
  return args.Na + k - args.Cl - args.HCO3;
}

/** Winters' formula — expected PaCO2 (mmHg) in metabolic acidosis. */
export function wintersExpectedPaCO2_mmHg(HCO3: number): number {
  return 1.5 * HCO3 + 8; // ±2
}

/** Parkland formula — total fluid (mL) in the first 24 h after a burn. */
export function parklandTotalFluid_mL(weight_kg: number, tbsaPercent: number): number {
  return 4 * weight_kg * tbsaPercent;
}

/** Mean arterial pressure (mmHg) from SBP/DBP. */
export function meanArterialPressure(SBP: number, DBP: number): number {
  return (SBP + 2 * DBP) / 3;
}

/** Cerebral perfusion pressure (mmHg). */
export function cerebralPerfusionPressure(MAP: number, ICP: number): number {
  return MAP - ICP;
}

/** Plasma osmolarity (mosmol/L). Na, K, urea, glucose all in mmol/L. */
export function plasmaOsmolarity(args: {
  Na: number;
  K?: number;
  urea: number;
  glucose: number;
}): number {
  const K = args.K ?? 0;
  return 2 * (args.Na + K) + args.urea + args.glucose;
}

/** Corrected calcium (mmol/L). Albumin in g/L. */
export function correctedCalcium(measuredCa: number, albumin_gL: number): number {
  return measuredCa + 0.02 * (40 - albumin_gL);
}

/** Fick cardiac output (L/min). VO2 in mL/min, contents in mL O2 / dL blood. */
export function fickCardiacOutput_Lmin(args: {
  VO2_mLmin: number;
  CaO2_mLdL: number;
  CvO2_mLdL: number;
}): number {
  // (CaO2 - CvO2) is mL O2 per dL; multiply by 10 to get per L, then VO2/(...) gives L/min.
  return args.VO2_mLmin / ((args.CaO2_mLdL - args.CvO2_mLdL) * 10);
}

/** Shunt fraction (Qs/Qt) as a 0..1 fraction. Contents in mL O2 / dL. */
export function shuntFraction(args: {
  CcO2_mLdL: number; // end-capillary
  CaO2_mLdL: number; // arterial
  CvO2_mLdL: number; // mixed venous
}): number {
  return (args.CcO2_mLdL - args.CaO2_mLdL) / (args.CcO2_mLdL - args.CvO2_mLdL);
}

/** Arterial oxygen content (mL O2 / dL blood). Hb in g/dL, SaO2 as 0..1, PaO2 in kPa. */
export function arterialO2Content_mLdL(args: {
  Hb_gdL: number;
  SaO2: number;
  PaO2_kPa: number;
}): number {
  // 1.34 mL O2 / g Hb (Hüfner) + dissolved O2 (0.0225 mL/dL/kPa).
  return 1.34 * args.Hb_gdL * args.SaO2 + 0.0225 * args.PaO2_kPa;
}

/** Henderson–Hasselbalch for the bicarbonate buffer. PaCO2 in kPa. */
export function henderson_pH(HCO3_mmolL: number, PaCO2_kPa: number): number {
  return 6.1 + Math.log10(HCO3_mmolL / (0.23 * PaCO2_kPa));
}

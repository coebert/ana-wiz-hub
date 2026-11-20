/**
 * Acid–base teaching arithmetic.
 *
 * pCO₂ is entered in kPa and converted explicitly to mmHg (1 kPa = 7.5 mmHg)
 * before any Boston/Winters formula is applied. All three blood-gas values
 * must come from the same sample: the Henderson–Hasselbalch relation is used
 * to reject mutually inconsistent entries rather than classify them.
 *
 * Teaching aid only — it does not diagnose or prescribe.
 */

/** Conversion used by the Boston compensation rules and displayed to the user. */
export const MMHG_PER_KPA = 7.5;

/** Henderson–Hasselbalch constants for plasma at 37 °C. */
const HH_PKA = 6.1;
const HH_CO2_SOLUBILITY = 0.03; // mmol/L per mmHg

/**
 * Maximum accepted difference between the entered pH and the pH predicted by
 * Henderson–Hasselbalch from the entered pCO₂ and HCO₃⁻. Real analysers agree
 * within a few hundredths; a larger gap means mixed samples, wrong units or a
 * transcription error, so no classification is issued.
 */
export const PH_CONSISTENCY_TOLERANCE = 0.06;

const PH_MIN = 6.5;
const PH_MAX = 8.0;
const PCO2_KPA_MIN = 1.0;
const PCO2_KPA_MAX = 20.0;
const HCO3_MIN = 1;
const HCO3_MAX = 60;

export interface AbgValues {
  pH: number | null;
  pCO2KPa: number | null;
  hco3: number | null;
  na?: number | null;
  cl?: number | null;
}

export type AbgStatus = "incomplete" | "inconsistent" | "interpreted";

export interface AbgInterpretation {
  status: AbgStatus;
  message: string;
  primary: string | null;
  compensation: string | null;
  expected: string | null;
  anionGap: string | null;
  notes: string[];
  derived: { pCO2mmHg: number; expectedPh: number; phDifference: number } | null;
}

/** Parse a form field; blank, zero and non-numeric entries become null. */
export function parseAbgValue(raw: string): number | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const value = Number(trimmed);
  if (!Number.isFinite(value) || value <= 0) return null;
  return value;
}

function incomplete(message: string): AbgInterpretation {
  return {
    status: "incomplete",
    message,
    primary: null,
    compensation: null,
    expected: null,
    anionGap: null,
    notes: [],
    derived: null,
  };
}

const inRange = (v: number | null, min: number, max: number): v is number =>
  v !== null && v >= min && v <= max;

export function interpretAbg({
  pH,
  pCO2KPa,
  hco3,
  na,
  cl,
}: AbgValues): AbgInterpretation {
  if (pH === null || pCO2KPa === null || hco3 === null) {
    return incomplete(
      "Enter pH, pCO₂ (kPa) and HCO₃⁻ (mmol/L) from the same sample to see an interpretation.",
    );
  }
  if (!inRange(pH, PH_MIN, PH_MAX) || !inRange(pCO2KPa, PCO2_KPA_MIN, PCO2_KPA_MAX) || !inRange(hco3, HCO3_MIN, HCO3_MAX)) {
    return incomplete(
      "One or more values are outside the plausible range for a blood gas (pH 6.50–8.00, pCO₂ 1.0–20.0 kPa, HCO₃⁻ 1–60 mmol/L). Check the units and re-enter.",
    );
  }

  // Explicit kPa → mmHg conversion before any compensation formula.
  const pCO2mmHg = pCO2KPa * MMHG_PER_KPA;
  const expectedPh =
    HH_PKA + Math.log10(hco3 / (HH_CO2_SOLUBILITY * pCO2mmHg));
  const phDifference = pH - expectedPh;

  if (Math.abs(phDifference) > PH_CONSISTENCY_TOLERANCE) {
    return {
      status: "inconsistent",
      message:
        `These values are not mutually consistent: Henderson–Hasselbalch predicts a pH of ` +
        `${expectedPh.toFixed(2)} from pCO₂ ${pCO2KPa.toFixed(1)} kPa (${pCO2mmHg.toFixed(0)} mmHg) ` +
        `and HCO₃⁻ ${hco3.toFixed(1)} mmol/L, not ${pH.toFixed(2)}. ` +
        `Check that all three come from the same arterial sample and that pCO₂ is in kPa. No interpretation is issued.`,
      primary: null,
      compensation: null,
      expected: null,
      anionGap: null,
      notes: [],
      derived: { pCO2mmHg, expectedPh, phDifference },
    };
  }

  const notes: string[] = [];
  let primary = "";
  let compensation = "";
  let expected = "";

  const acidaemic = pH < 7.35;
  const alkalaemic = pH > 7.45;

  if (acidaemic) {
    if (pCO2mmHg > 45) {
      primary = "Respiratory acidosis";
      const expHCO3acute = 24 + (pCO2mmHg - 40) * 0.1;
      const expHCO3chronic = 24 + (pCO2mmHg - 40) * 0.35;
      expected = `Expected HCO₃⁻ acute ${expHCO3acute.toFixed(
        1,
      )} / chronic ${expHCO3chronic.toFixed(1)} mmol/L`;
      compensation =
        hco3 > expHCO3chronic + 2
          ? "with concurrent metabolic alkalosis"
          : hco3 < expHCO3acute - 2
            ? "with concurrent metabolic acidosis"
            : hco3 > expHCO3acute + 2
              ? "with chronic renal compensation"
              : "acute, minimal compensation";
    } else if (hco3 < 22) {
      primary = "Metabolic acidosis";
      const expPCO2 = 1.5 * hco3 + 8; // Winters, mmHg
      expected = `Winters: expected pCO₂ ${expPCO2.toFixed(0)} mmHg (${(
        expPCO2 / MMHG_PER_KPA
      ).toFixed(1)} kPa)`;
      compensation =
        pCO2mmHg > expPCO2 + 2
          ? "with concurrent respiratory acidosis"
          : pCO2mmHg < expPCO2 - 2
            ? "with concurrent respiratory alkalosis"
            : "with appropriate respiratory compensation";
    } else {
      primary = "Acidaemia, mixed pattern";
      compensation = "review pCO₂ and HCO₃⁻ together";
    }
  } else if (alkalaemic) {
    if (hco3 > 26) {
      primary = "Metabolic alkalosis";
      const expPCO2 = 0.7 * hco3 + 21; // mmHg
      expected = `Expected pCO₂ ${expPCO2.toFixed(0)} mmHg (${(
        expPCO2 / MMHG_PER_KPA
      ).toFixed(1)} kPa)`;
      compensation =
        pCO2mmHg < expPCO2 - 2
          ? "with concurrent respiratory alkalosis"
          : pCO2mmHg > expPCO2 + 2
            ? "with concurrent respiratory acidosis"
            : "with appropriate respiratory compensation";
    } else if (pCO2mmHg < 35) {
      primary = "Respiratory alkalosis";
      const expHCO3acute = 24 - (40 - pCO2mmHg) * 0.2;
      const expHCO3chronic = 24 - (40 - pCO2mmHg) * 0.4;
      expected = `Expected HCO₃⁻ acute ${expHCO3acute.toFixed(
        1,
      )} / chronic ${expHCO3chronic.toFixed(1)} mmol/L`;
      compensation =
        hco3 < expHCO3chronic - 2
          ? "with concurrent metabolic acidosis"
          : "acute or chronic per HCO₃⁻";
    } else {
      primary = "Alkalaemia, mixed pattern";
      compensation = "review pCO₂ and HCO₃⁻ together";
    }
  } else {
    primary = "Normal pH";
    if (pCO2mmHg > 45 || pCO2mmHg < 35 || hco3 < 22 || hco3 > 26) {
      compensation =
        "but abnormal pCO₂/HCO₃⁻ — fully compensated or mixed disorder";
    } else {
      compensation = "no disturbance";
    }
  }

  let anionGap: string | null = null;
  if (na != null && cl != null && na > 0 && cl > 0) {
    const ag = na - (cl + hco3);
    anionGap = `Anion gap ${ag.toFixed(0)} mmol/L (normal ~8–12; add ~2.5 × (4 − albumin g/dL) if hypoalbuminaemic).`;
    if (ag > 12) notes.push("Raised anion gap — consider MUDPILES.");
  }

  return {
    status: "interpreted",
    message: "",
    primary,
    compensation,
    expected,
    anionGap,
    notes,
    derived: { pCO2mmHg, expectedPh, phDifference },
  };
}

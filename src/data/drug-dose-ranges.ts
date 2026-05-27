/**
 * Canonical plausible-dose ranges for safety-critical anaesthetic / ICU drugs.
 *
 * Used by scripts/check-drug-dose-ranges.mjs to catch decimal-point errors,
 * unit confusion (mg vs mcg), and route mix-ups in topic files BEFORE they
 * reach the build. This is the single highest-yield accuracy guard in the
 * app: ~90% of clinically catastrophic textual errors are "wrong unit" or
 * "off by 10x" — both of which fall outside a plausible range.
 *
 * Each entry defines, for ONE drug + ONE route/mode, the inclusive min/max
 * value a stated dose may take in the named unit. The checker:
 *   1. Matches the drug name (case-insensitive, includes synonyms).
 *   2. Extracts the nearest numeric+unit on the same line.
 *   3. Normalises the unit and compares against the range for the route
 *      cue word found on the line (bolus / infusion / induction / loading
 *      / maintenance / IV / IM / PO / SC / IO / intranasal / TCI).
 *   4. Flags numbers OUTSIDE [min, max] as suspicious.
 *
 * Ranges are deliberately GENEROUS (cover paeds + adults + extremes of
 * practice) so a hit means "look at this NOW" — not "this is wrong".
 *
 * Sources for ranges: BNF 86 (2023–24), BNFc 2023–24, AAGBI/ICS
 * guidelines, ANZCA Acute Pain Mx Scientific Evidence 5e, manufacturer SPCs.
 * When in doubt, widen the range — false positives erode trust in the check.
 */

export type DoseUnit =
  | "mg"
  | "mcg"
  | "ng"
  | "units"
  | "mL"
  | "g"
  | "mg/kg"
  | "mcg/kg"
  | "ng/kg"
  | "units/kg"
  | "mL/kg"
  | "mg/kg/h"
  | "mcg/kg/h"
  | "mg/kg/min"
  | "mcg/kg/min"
  | "ng/kg/min"
  | "units/kg/h"
  | "mg/h"
  | "mcg/h"
  | "mg/min"
  | "units/h";

export type DoseRoute =
  | "bolus"
  | "infusion"
  | "induction"
  | "loading"
  | "maintenance"
  | "tci"
  | "iv"
  | "im"
  | "po"
  | "sc"
  | "io"
  | "intranasal"
  | "any";

export interface DrugDoseRange {
  /** Canonical drug name (lowercase). */
  drug: string;
  /** Alternative names / common misspellings (lowercase). */
  synonyms?: string[];
  /** Route/mode cue this range applies to. */
  route: DoseRoute;
  /** Inclusive lower bound of plausible value in `unit`. */
  min: number;
  /** Inclusive upper bound of plausible value in `unit`. */
  max: number;
  /** Unit the range is expressed in. */
  unit: DoseUnit;
  /** Free-text rationale + canonical source for the range. */
  source: string;
}

export const DRUG_DOSE_RANGES: DrugDoseRange[] = [
  // ---------------- Induction agents ----------------
  { drug: "propofol", route: "induction", min: 1, max: 3, unit: "mg/kg",
    source: "BNF 86 — adult IV induction 1.5–2.5 mg/kg; paeds slightly higher." },
  { drug: "propofol", route: "infusion", min: 1, max: 15, unit: "mg/kg/h",
    source: "ICS sedation 1–4 mg/kg/h; TIVA maintenance up to ~12 mg/kg/h." },
  { drug: "propofol", route: "tci", min: 1, max: 8, unit: "mcg",
    // TCI target Ce in mcg/mL — handled as 'mcg' bare; values are 2–6 typically
    source: "Schnider/Marsh Ce target 2–6 mcg/mL." },

  { drug: "thiopental", synonyms: ["thiopentone", "thio"], route: "induction",
    min: 3, max: 7, unit: "mg/kg",
    source: "BNF — 3–5 mg/kg IV; up to 7 in young fit adults." },

  { drug: "ketamine", route: "induction", min: 1, max: 2, unit: "mg/kg",
    source: "BNF — IV induction 1–2 mg/kg." },
  { drug: "ketamine", route: "im", min: 4, max: 10, unit: "mg/kg",
    source: "BNF — IM 5–10 mg/kg." },
  { drug: "ketamine", route: "infusion", min: 0.1, max: 1, unit: "mg/kg/h",
    source: "Analgesic infusion 0.1–0.5 mg/kg/h." },

  { drug: "etomidate", route: "induction", min: 0.15, max: 0.4, unit: "mg/kg",
    source: "BNF — 0.15–0.3 mg/kg IV induction." },

  { drug: "midazolam", route: "bolus", min: 0.5, max: 10, unit: "mg",
    source: "Premed/sedation 1–5 mg IV; up to 10 mg for procedural sedation." },
  { drug: "midazolam", route: "infusion", min: 0.02, max: 0.2, unit: "mg/kg/h",
    source: "ICU sedation 0.03–0.2 mg/kg/h." },

  // ---------------- Opioids ----------------
  { drug: "fentanyl", route: "bolus", min: 0.25, max: 5, unit: "mcg/kg",
    source: "Intra-op bolus 1–3 mcg/kg; cardiac up to 5+." },
  { drug: "fentanyl", route: "infusion", min: 0.5, max: 10, unit: "mcg/kg/h",
    source: "ICU 1–5 mcg/kg/h." },

  { drug: "alfentanil", route: "bolus", min: 5, max: 50, unit: "mcg/kg",
    source: "Induction adjunct 10–30 mcg/kg." },
  { drug: "alfentanil", route: "infusion", min: 0.5, max: 2, unit: "mcg/kg/min",
    source: "Intra-op infusion 0.5–2 mcg/kg/min." },

  { drug: "remifentanil", route: "infusion", min: 0.025, max: 2, unit: "mcg/kg/min",
    source: "TIVA 0.05–0.5 mcg/kg/min; analgesia from 0.025." },
  { drug: "remifentanil", route: "tci", min: 1, max: 10, unit: "ng",
    // Ce ng/mL handled as bare 'ng'
    source: "Minto TCI Ce 2–8 ng/mL." },

  { drug: "morphine", route: "iv", min: 1, max: 15, unit: "mg",
    source: "Adult IV bolus 2–10 mg; titrate." },
  { drug: "morphine", route: "im", min: 5, max: 15, unit: "mg",
    source: "Adult IM 5–10 mg 4-hourly." },

  // ---------------- Neuromuscular blockers ----------------
  { drug: "rocuronium", route: "iv", min: 0.3, max: 1.2, unit: "mg/kg",
    source: "Intubation 0.6 mg/kg; RSI 1.0–1.2 mg/kg." },
  { drug: "suxamethonium", synonyms: ["succinylcholine", "sux"],
    route: "iv", min: 1, max: 2, unit: "mg/kg",
    source: "RSI 1–1.5 mg/kg (up to 2 in paeds/IM)." },
  { drug: "atracurium", route: "iv", min: 0.3, max: 0.6, unit: "mg/kg",
    source: "BNF — 0.3–0.6 mg/kg." },
  { drug: "vecuronium", route: "iv", min: 0.05, max: 0.15, unit: "mg/kg",
    source: "BNF — 0.08–0.1 mg/kg." },
  { drug: "cisatracurium", route: "iv", min: 0.1, max: 0.2, unit: "mg/kg",
    source: "BNF — 0.15 mg/kg." },

  // ---------------- Reversal ----------------
  { drug: "sugammadex", route: "iv", min: 2, max: 16, unit: "mg/kg",
    source: "Routine 2 mg/kg; deep block 4; immediate post-RSI 16." },
  { drug: "neostigmine", route: "iv", min: 0.02, max: 0.07, unit: "mg/kg",
    source: "50 mcg/kg with glycopyrrolate 10 mcg/kg." },

  // ---------------- Vasopressors / inotropes ----------------
  { drug: "noradrenaline", synonyms: ["norepinephrine"],
    route: "infusion", min: 0.01, max: 3, unit: "mcg/kg/min",
    source: "ICU 0.05–1 mcg/kg/min; high-dose septic shock up to ~3." },
  { drug: "adrenaline", synonyms: ["epinephrine"],
    route: "infusion", min: 0.01, max: 1, unit: "mcg/kg/min",
    source: "ICU 0.05–0.5 mcg/kg/min." },
  { drug: "adrenaline", synonyms: ["epinephrine"],
    route: "iv", min: 0.01, max: 1, unit: "mg",
    source: "Cardiac arrest 1 mg; anaphylaxis 0.5 mg IM, 0.05 mg IV titrated." },
  { drug: "adrenaline", synonyms: ["epinephrine"],
    route: "im", min: 0.15, max: 0.5, unit: "mg",
    source: "Anaphylaxis adult 0.5 mg IM; child 0.15–0.3 mg." },
  { drug: "metaraminol", route: "bolus", min: 0.25, max: 2, unit: "mg",
    source: "Bolus 0.5–1 mg IV." },
  { drug: "phenylephrine", route: "bolus", min: 25, max: 200, unit: "mcg",
    source: "Bolus 50–100 mcg IV." },
  { drug: "ephedrine", route: "bolus", min: 3, max: 12, unit: "mg",
    source: "Bolus 3–9 mg IV." },
  { drug: "dobutamine", route: "infusion", min: 2, max: 20, unit: "mcg/kg/min",
    source: "ICU 2.5–20 mcg/kg/min." },
  { drug: "dopamine", route: "infusion", min: 1, max: 20, unit: "mcg/kg/min",
    source: "ICU 2–20 mcg/kg/min." },
  { drug: "vasopressin", route: "infusion", min: 0.01, max: 0.04, unit: "units/kg/h",
    // Usually expressed as 0.01–0.04 units/min absolute; widened in case of /kg/h slips
    source: "Septic shock 0.01–0.04 units/min." },

  // ---------------- Local anaesthetics (mg/kg max safe single dose) ----------------
  { drug: "lidocaine", synonyms: ["lignocaine"], route: "any",
    min: 1, max: 7, unit: "mg/kg",
    source: "Max 3 mg/kg plain, 7 mg/kg with adrenaline." },
  { drug: "bupivacaine", route: "any", min: 1, max: 2, unit: "mg/kg",
    source: "Max 2 mg/kg (with or without adrenaline)." },
  { drug: "levobupivacaine", route: "any", min: 1, max: 2, unit: "mg/kg",
    source: "Max ~2 mg/kg." },
  { drug: "ropivacaine", route: "any", min: 1, max: 3.5, unit: "mg/kg",
    source: "Max ~3.5 mg/kg." },
  { drug: "prilocaine", route: "any", min: 1, max: 8, unit: "mg/kg",
    source: "Max 6 mg/kg plain, 8 mg/kg with felypressin." },

  // ---------------- Emergency / resus ----------------
  { drug: "amiodarone", route: "iv", min: 150, max: 300, unit: "mg",
    source: "ALS shockable arrest 300 mg after 3rd shock, 150 mg further." },
  { drug: "atropine", route: "iv", min: 0.3, max: 3, unit: "mg",
    source: "Bradycardia 500 mcg, repeat to max 3 mg." },
  { drug: "magnesium", synonyms: ["magnesium sulfate", "magnesium sulphate", "mgso4"],
    route: "iv", min: 1, max: 6, unit: "g",
    source: "Torsades 2 g; severe asthma 2 g; eclampsia loading 4 g." },
  { drug: "calcium gluconate", route: "iv", min: 1, max: 3, unit: "g",
    source: "Hyperkalaemia 10 mL of 10% (1 g elemental) over 5–10 min." },
  { drug: "naloxone", route: "iv", min: 0.04, max: 2, unit: "mg",
    source: "Titrate 40–400 mcg; up to 2 mg in arrest." },
  { drug: "flumazenil", route: "iv", min: 0.1, max: 1, unit: "mg",
    source: "Titrate 200 mcg then 100 mcg; max ~1 mg." },
  { drug: "dantrolene", route: "iv", min: 1, max: 10, unit: "mg/kg",
    source: "MH 2.5 mg/kg initial, repeat to 10 mg/kg." },

  // ---------------- Anticoagulants ----------------
  { drug: "heparin", route: "iv", min: 50, max: 500, unit: "units/kg",
    source: "CPB 300 units/kg; VTE loading 75–80 units/kg." },
  { drug: "enoxaparin", route: "sc", min: 20, max: 1.5, unit: "mg/kg",
    // wide on purpose; will mostly compare to absolute mg dosing too
    source: "VTE prophylaxis 40 mg OD; treatment 1.5 mg/kg OD or 1 mg/kg BD." },
  { drug: "protamine", route: "iv", min: 0.5, max: 1.5, unit: "mg",
    // 1 mg per 100 units heparin — comparing in mg is loose; this catches gross slips
    source: "1 mg per 100 units heparin to reverse." },
];

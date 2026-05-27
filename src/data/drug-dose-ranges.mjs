/**
 * Canonical plausible-dose ranges for safety-critical anaesthetic / ICU drugs.
 * Pure data — imported by scripts/check-drug-dose-ranges.mjs.
 * The .ts sibling re-exports this with TypeScript types for app code.
 *
 * Each entry: ONE drug + ONE route + a generous min/max in `unit`.
 * Ranges are deliberately wide (paeds + adult + extremes) so a hit means
 * "look at this NOW", not "this is definitely wrong". False positives erode
 * trust in the check.
 *
 * Sources: BNF 86 (2023–24), BNFc 2023–24, AAGBI/ICS guidelines,
 * ANZCA APMSE 5e, manufacturer SPCs.
 */
export const DRUG_DOSE_RANGES = [
  // Induction agents
  { drug: "propofol", route: "induction", min: 1, max: 3, unit: "mg/kg",
    source: "BNF 86 — IV induction 1.5–2.5 mg/kg." },
  { drug: "propofol", route: "infusion", min: 1, max: 15, unit: "mg/kg/h",
    source: "ICS sedation 1–4 mg/kg/h; TIVA up to ~12 mg/kg/h." },

  { drug: "thiopental", synonyms: ["thiopentone"], route: "induction",
    min: 3, max: 7, unit: "mg/kg", source: "BNF — 3–5 mg/kg IV." },

  { drug: "ketamine", route: "induction", min: 1, max: 2, unit: "mg/kg",
    source: "BNF — IV induction 1–2 mg/kg." },
  { drug: "ketamine", route: "im", min: 4, max: 10, unit: "mg/kg",
    source: "BNF — IM 5–10 mg/kg." },
  { drug: "ketamine", route: "infusion", min: 0.1, max: 1, unit: "mg/kg/h",
    source: "Analgesic infusion 0.1–0.5 mg/kg/h." },

  { drug: "etomidate", route: "induction", min: 0.15, max: 0.4, unit: "mg/kg",
    source: "BNF — 0.15–0.3 mg/kg IV induction." },

  { drug: "midazolam", route: "bolus", min: 0.5, max: 10, unit: "mg",
    source: "Premed/procedural sedation 1–5 mg IV." },
  { drug: "midazolam", route: "infusion", min: 0.02, max: 0.2, unit: "mg/kg/h",
    source: "ICU sedation 0.03–0.2 mg/kg/h." },

  // Opioids
  { drug: "fentanyl", route: "bolus", min: 0.25, max: 5, unit: "mcg/kg",
    source: "Intra-op 1–3 mcg/kg; cardiac up to 5+." },
  { drug: "fentanyl", route: "infusion", min: 0.5, max: 10, unit: "mcg/kg/h",
    source: "ICU 1–5 mcg/kg/h." },

  { drug: "alfentanil", route: "bolus", min: 5, max: 50, unit: "mcg/kg",
    source: "Induction adjunct 10–30 mcg/kg." },
  { drug: "alfentanil", route: "infusion", min: 0.5, max: 2, unit: "mcg/kg/min",
    source: "Intra-op 0.5–2 mcg/kg/min." },

  { drug: "remifentanil", route: "infusion", min: 0.025, max: 2, unit: "mcg/kg/min",
    source: "TIVA 0.05–0.5 mcg/kg/min." },

  { drug: "morphine", route: "iv", min: 1, max: 15, unit: "mg",
    source: "Adult IV bolus 2–10 mg." },
  { drug: "morphine", route: "im", min: 5, max: 15, unit: "mg",
    source: "Adult IM 5–10 mg 4-hourly." },

  // Neuromuscular blockers
  { drug: "rocuronium", route: "iv", min: 0.3, max: 1.2, unit: "mg/kg",
    source: "Intubation 0.6; RSI 1.0–1.2 mg/kg." },
  { drug: "suxamethonium", synonyms: ["succinylcholine"],
    route: "iv", min: 1, max: 2, unit: "mg/kg", source: "RSI 1–1.5 mg/kg." },
  { drug: "atracurium", route: "iv", min: 0.3, max: 0.6, unit: "mg/kg",
    source: "BNF — 0.3–0.6 mg/kg." },
  { drug: "vecuronium", route: "iv", min: 0.05, max: 0.15, unit: "mg/kg",
    source: "BNF — 0.08–0.1 mg/kg." },
  { drug: "cisatracurium", route: "iv", min: 0.1, max: 0.2, unit: "mg/kg",
    source: "BNF — 0.15 mg/kg." },

  // Reversal
  { drug: "sugammadex", route: "iv", min: 2, max: 16, unit: "mg/kg",
    source: "Routine 2; deep 4; post-RSI 16 mg/kg." },
  { drug: "neostigmine", route: "iv", min: 0.02, max: 0.07, unit: "mg/kg",
    source: "50 mcg/kg with glycopyrrolate." },

  // Vasopressors / inotropes
  { drug: "noradrenaline", synonyms: ["norepinephrine"],
    route: "infusion", min: 0.01, max: 3, unit: "mcg/kg/min",
    source: "ICU 0.05–1 mcg/kg/min; septic shock up to ~3." },
  { drug: "adrenaline", synonyms: ["epinephrine"],
    route: "infusion", min: 0.01, max: 1, unit: "mcg/kg/min",
    source: "ICU 0.05–0.5 mcg/kg/min." },
  { drug: "adrenaline", synonyms: ["epinephrine"],
    route: "iv", min: 0.01, max: 1, unit: "mg",
    source: "Arrest 1 mg; anaphylaxis 0.05 mg IV titrated." },
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

  // Local anaesthetics — max safe single dose
  { drug: "lidocaine", synonyms: ["lignocaine"], route: "any",
    min: 1, max: 7, unit: "mg/kg",
    source: "Max 3 mg/kg plain, 7 mg/kg with adrenaline." },
  { drug: "bupivacaine", route: "any", min: 1, max: 2, unit: "mg/kg",
    source: "Max 2 mg/kg." },
  { drug: "levobupivacaine", route: "any", min: 1, max: 2, unit: "mg/kg",
    source: "Max ~2 mg/kg." },
  { drug: "ropivacaine", route: "any", min: 1, max: 3.5, unit: "mg/kg",
    source: "Max ~3.5 mg/kg." },
  { drug: "prilocaine", route: "any", min: 1, max: 8, unit: "mg/kg",
    source: "Max 6 plain, 8 with felypressin." },

  // Emergency / resus
  { drug: "amiodarone", route: "iv", min: 150, max: 300, unit: "mg",
    source: "ALS shockable 300 mg then 150 mg." },
  { drug: "atropine", route: "iv", min: 0.3, max: 3, unit: "mg",
    source: "Bradycardia 500 mcg, max 3 mg." },
  { drug: "naloxone", route: "iv", min: 0.04, max: 2, unit: "mg",
    source: "Titrate 40–400 mcg; up to 2 mg in arrest." },
  { drug: "flumazenil", route: "iv", min: 0.1, max: 1, unit: "mg",
    source: "Titrate 200 then 100 mcg; max ~1 mg." },
  { drug: "dantrolene", route: "iv", min: 1, max: 10, unit: "mg/kg",
    source: "MH 2.5 mg/kg initial; max 10." },

  // Anticoagulants
  { drug: "heparin", route: "iv", min: 50, max: 500, unit: "units/kg",
    source: "CPB 300 units/kg; VTE 75–80 units/kg." },
  { drug: "protamine", route: "iv", min: 0.5, max: 1.5, unit: "mg",
    source: "1 mg per 100 units heparin." },
];

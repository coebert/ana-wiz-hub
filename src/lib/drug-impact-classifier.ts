// =============================================================================
// Drug-class-aware classifier for side-effect & monitoring entries.
//
// Each drug class can override the global keyword lists. Classes are matched by
// case-insensitive substring against the `drug_class` field (e.g. a rule keyed
// "aminoglycoside" matches "Antimicrobial / aminoglycoside").
//
// Edit `CLASS_RULES` below to refine accuracy for any class. Each rule has:
//   - avoid:      keywords that escalate an entry to "Avoid"
//   - caution:    keywords that escalate to "Caution"
//   - preferred:  keywords that mark a monitoring entry as required / preferred
//   - downgrade:  optional list that, if matched, should NOT trigger Avoid
//                 (useful when global word like "ototoxicity" is mentioned only
//                  as a theoretical risk for that class)
// =============================================================================

export type Impact = "avoid" | "caution" | "preferred" | "neutral";
export type Mode = "side_effects" | "monitoring";

export interface ClassRule {
  avoid?: string[];
  caution?: string[];
  preferred?: string[];
  downgrade?: string[]; // suppress Avoid escalation for these keywords
}

// ---------- Global defaults (apply to every class unless overridden) ----------

const GLOBAL_AVOID = [
  "anaphylaxis", "fatal", "death", "cardiac arrest", "irreversible",
  "fibrosis", "pris", "propofol infusion syndrome", "torsades", "vf",
  "vt storm", "rhabdomyolysis", "agranulocytosis", "stevens-johnson",
  "steven-johnson", "dress", "malignant hyperthermia", "hyperkalaem",
  "complete heart block", "asystole", "anaphylactoid",
];

const GLOBAL_CAUTION = [
  "hypotension", "bradycardia", "tachycardia", "qt", "qtc", "prolong",
  "respiratory depression", "apnoea", "apnea", "rigidity", "sedation",
  "delirium", "myoclonus", "phlebitis", "pain on injection", "ponv",
  "nausea", "vomit", "histamine", "red man", "thrombocytopenia",
  "neutropenia", "nephrotox", "hepatotox", "neuropathy", "tremor",
  "ataxia", "miosis", "hyperalgesia", "thyroid", "photosensitivity",
  "discolour", "discolor", "elevated transaminase", "lft", "tft",
];

const GLOBAL_PREFERRED = [
  "continuous", "mandatory", "monitor", "tdm", "trough", "peak",
  "target", "bis", "peeg", "etco2", "ecg", "nibp", "ibp", "spo2",
  "u&e", "fbc", "lipid", "ck", "creatine kinase", "cxr",
  "level", "essential", "baseline", "daily", "before the", "pre-dose",
  "post-dose", "auc",
];

// ---------- Per-class overrides — edit freely ----------

export const CLASS_RULES: Record<string, ClassRule> = {
  // Antimicrobials -----------------------------------------------------------
  aminoglycoside: {
    avoid: ["ototoxicity", "permanent hearing loss", "vestibular damage"],
    caution: ["nephrotoxicity", "neuromuscular weakness", "raised creatinine"],
    preferred: ["once-daily trough", "auc24", "peak level", "trough level", "tdm"],
  },
  glycopeptide: {
    avoid: ["anaphylactoid red man", "stevens-johnson", "dress"],
    caution: ["red man", "infusion-related", "nephrotoxicity", "phlebitis"],
    preferred: ["pre-dose trough", "auc24:mic", "tdm", "level before 4th dose"],
  },
  fluoroquinolone: {
    avoid: ["tendon rupture", "aortic dissection", "qtc prolongation"],
    caution: ["c. difficile", "tendinopathy", "photosensitivity", "dysglycaemia"],
    preferred: ["ecg", "qtc", "magnesium", "potassium"],
  },
  carbapenem: {
    avoid: ["seizure", "anaphylaxis"],
    caution: ["c. difficile", "thrombocytosis", "rash"],
    preferred: ["renal dose adjust", "fbc", "lft"],
  },
  penicillin: {
    avoid: ["anaphylaxis", "interstitial nephritis"],
    caution: ["rash", "diarrhoea", "neutropenia (prolonged)"],
    preferred: ["allergy history", "fbc"],
  },
  cephalosporin: {
    avoid: ["anaphylaxis", "c. difficile colitis"],
    caution: ["rash", "ldh", "neutropenia"],
    preferred: ["allergy", "fbc"],
  },
  polymyxin: {
    avoid: ["nephrotoxicity", "neurotoxicity"],
    caution: ["paraesthesia", "bronchospasm (nebulised)"],
    preferred: ["renal function", "creatinine", "tdm where available"],
  },
  azole: {
    avoid: ["qt prolongation", "torsades", "hepatotoxicity"],
    caution: ["cyp450 interactions", "visual disturbance (voriconazole)"],
    preferred: ["lft", "ecg", "voriconazole trough"],
  },

  // Cardiovascular -----------------------------------------------------------
  antiarrhythmic: {
    avoid: ["torsades", "complete heart block", "vt storm", "pulmonary fibrosis"],
    caution: ["bradycardia", "qt", "hypotension", "thyroid", "lft derangement"],
    preferred: ["continuous ecg", "qtc", "tft", "lft", "cxr", "magnesium", "potassium"],
  },
  vasopressor: {
    avoid: ["extravasation necrosis", "limb ischaemia", "mesenteric ischaemia"],
    caution: ["arrhythmia", "tachycardia", "reflex bradycardia", "hyperglycaemia"],
    preferred: ["ibp", "arterial line", "map target", "central line preferred", "cardiac output"],
  },
  inotrope: {
    avoid: ["myocardial ischaemia", "arrhythmia storm"],
    caution: ["tachyarrhythmia", "hypotension", "increased mvo2", "tolerance"],
    preferred: ["cardiac output", "ecg", "lactate", "mixed venous", "scvo2"],
  },
  vasodilator: {
    avoid: ["cyanide toxicity", "rebound hypertension", "methaemoglobinaemia"],
    caution: ["headache", "reflex tachycardia", "hypotension", "tolerance"],
    preferred: ["ibp", "thiocyanate", "methaemoglobin", "map"],
  },
  "β-blocker": {
    avoid: ["complete heart block", "decompensated heart failure", "severe asthma"],
    caution: ["bradycardia", "hypotension", "bronchospasm", "masked hypoglycaemia"],
    preferred: ["ecg", "hr target", "bp"],
  },
  "ca²⁺ blocker": {
    avoid: ["complete heart block", "severe lv dysfunction"],
    caution: ["hypotension", "constipation", "ankle oedema", "bradycardia"],
    preferred: ["ecg", "bp"],
  },

  // Anaesthetic agents -------------------------------------------------------
  "induction agent": {
    avoid: ["pris", "anaphylaxis", "adrenal suppression (etomidate)"],
    caution: ["hypotension", "apnoea", "myoclonus", "pain on injection", "emergence delirium"],
    preferred: ["ecg", "spo2", "etco2", "bis", "depth of anaesthesia"],
  },
  "volatile anaesthetic": {
    avoid: ["malignant hyperthermia", "hepatitis (halothane)"],
    caution: ["myocardial depression", "vasodilation", "ponv", "shivering"],
    preferred: ["agent monitor", "mac", "etco2", "scavenging"],
  },
  opioid: {
    avoid: ["respiratory arrest", "anaphylaxis"],
    caution: ["respiratory depression", "sedation", "ponv", "rigidity", "hyperalgesia", "miosis"],
    preferred: ["spo2", "rr", "sedation score", "etco2"],
  },
  "depolarising nmba": {
    avoid: ["hyperkalaemic cardiac arrest", "malignant hyperthermia", "anaphylaxis"],
    caution: ["fasciculations", "myalgia", "bradycardia (children)", "raised iop", "raised icp"],
    preferred: ["ecg", "potassium pre-use", "tof"],
  },
  "non-depolarising nmba": {
    avoid: ["residual paralysis", "anaphylaxis"],
    caution: ["histamine release", "prolonged block in renal/hepatic failure"],
    preferred: ["tof monitoring", "tof ratio >0.9", "quantitative neuromuscular monitor"],
  },
  "local anaesthetic": {
    avoid: ["last", "local anaesthetic systemic toxicity", "cardiac arrest", "seizure"],
    caution: ["perioral tingling", "tinnitus", "metallic taste", "hypotension (neuraxial)"],
    preferred: ["ecg", "max dose", "lipid emulsion available", "aspirate before injection"],
  },

  // Sedatives ----------------------------------------------------------------
  "α2-agonist": {
    avoid: ["sinus arrest", "severe bradycardia"],
    caution: ["bradycardia", "hypotension", "rebound hypertension on withdrawal"],
    preferred: ["ecg", "hr", "bp"],
  },
  benzodiazepine: {
    avoid: ["respiratory arrest", "paradoxical agitation in elderly"],
    caution: ["respiratory depression", "delirium", "tolerance", "withdrawal"],
    preferred: ["sedation score", "rass", "spo2"],
  },

  // Anticoagulation ---------------------------------------------------------
  anticoagulant: {
    avoid: ["intracranial haemorrhage", "spinal haematoma", "hit"],
    caution: ["bleeding", "bruising", "thrombocytopenia"],
    preferred: ["aptt", "anti-xa", "platelet count", "renal function"],
  },
  antiplatelet: {
    avoid: ["intracranial haemorrhage", "ttp"],
    caution: ["bleeding", "dyspepsia", "bruising"],
    preferred: ["platelet function", "stop pre-op interval"],
  },
  thrombolytic: {
    avoid: ["intracranial haemorrhage", "major haemorrhage"],
    caution: ["bleeding", "hypotension", "allergic reaction"],
    preferred: ["bp control", "neuro obs", "fbc", "fibrinogen"],
  },

  // Endocrine / metabolic ---------------------------------------------------
  hypoglycaemic: {
    avoid: ["severe hypoglycaemia", "lactic acidosis (metformin)", "dka (sglt2)"],
    caution: ["hypoglycaemia", "weight gain", "gi upset"],
    preferred: ["cbg", "ketones", "u&e"],
  },
  electrolyte: {
    avoid: ["hyperkalaemic arrest", "extravasation necrosis (calcium)", "hypermagnesaemia paralysis"],
    caution: ["arrhythmia", "phlebitis", "tissue irritation"],
    preferred: ["ecg", "serum level", "calcium", "magnesium", "potassium"],
  },

  // Diuretics ---------------------------------------------------------------
  diuretic: {
    avoid: ["severe hypovolaemia", "ototoxicity (rapid loop bolus)"],
    caution: ["hypokalaemia", "hyponatraemia", "aki", "ototoxicity"],
    preferred: ["u&e", "fluid balance", "weight", "urine output"],
  },

  // Bronchodilators ---------------------------------------------------------
  "β2-agonist": {
    avoid: ["lactic acidosis (high dose)", "severe hypokalaemia"],
    caution: ["tachycardia", "tremor", "hypokalaemia", "hyperglycaemia"],
    preferred: ["ecg", "k+", "lactate", "spo2"],
  },
  methylxanthine: {
    avoid: ["seizure", "tachyarrhythmia"],
    caution: ["nausea", "tremor", "tachycardia", "narrow therapeutic index"],
    preferred: ["theophylline level", "tdm", "ecg"],
  },

  // Antiemetics --------------------------------------------------------------
  "5-ht3": {
    avoid: ["torsades"],
    caution: ["headache", "constipation", "qt prolongation"],
    preferred: ["ecg if high dose", "qtc"],
  },
  antipsychotic: {
    avoid: ["nms", "torsades", "extrapyramidal crisis"],
    caution: ["sedation", "qt prolongation", "extrapyramidal", "akathisia"],
    preferred: ["ecg", "qtc"],
  },

  // Uterotonics --------------------------------------------------------------
  uterotonic: {
    avoid: ["coronary vasospasm (ergometrine)", "anaphylaxis", "severe bronchospasm (carboprost)"],
    caution: ["hypotension (oxytocin bolus)", "nausea", "diarrhoea", "pyrexia"],
    preferred: ["bp", "uterine tone", "blood loss"],
  },

  // Steroids -----------------------------------------------------------------
  corticosteroid: {
    avoid: ["adrenal crisis on abrupt withdrawal"],
    caution: ["hyperglycaemia", "immunosuppression", "delayed wound healing", "psychosis"],
    preferred: ["cbg", "infection surveillance"],
  },
};

// ---------- Resolution helpers -------------------------------------------

function resolveRules(drugClass: string | undefined | null): ClassRule {
  if (!drugClass) return {};
  const cls = drugClass.toLowerCase();
  const merged: Required<ClassRule> = { avoid: [], caution: [], preferred: [], downgrade: [] };
  for (const key of Object.keys(CLASS_RULES)) {
    if (cls.includes(key.toLowerCase())) {
      const r = CLASS_RULES[key];
      if (r.avoid) merged.avoid.push(...r.avoid);
      if (r.caution) merged.caution.push(...r.caution);
      if (r.preferred) merged.preferred.push(...r.preferred);
      if (r.downgrade) merged.downgrade.push(...r.downgrade);
    }
  }
  return merged;
}

function any(text: string, words: string[]): boolean {
  return words.some((w) => text.includes(w.toLowerCase()));
}

export function classifyImpact(
  label: string,
  body: string,
  mode: Mode,
  drugClass?: string,
): Impact {
  const text = `${label} ${body}`.toLowerCase();
  const rules = resolveRules(drugClass);

  // 1. Class-specific Avoid (unless explicitly downgraded)
  const downgraded = rules.downgrade && any(text, rules.downgrade);
  if (rules.avoid && rules.avoid.length && any(text, rules.avoid) && !downgraded) {
    return "avoid";
  }

  // 2. Class-specific Preferred (monitoring mode prioritised)
  if (mode === "monitoring" && rules.preferred && rules.preferred.length && any(text, rules.preferred)) {
    return "preferred";
  }

  // 3. Class-specific Caution
  if (rules.caution && rules.caution.length && any(text, rules.caution)) {
    return "caution";
  }

  // 4. Global fallbacks
  if (any(text, GLOBAL_AVOID) && !downgraded) return "avoid";
  if (mode === "monitoring" && any(text, GLOBAL_PREFERRED)) return "preferred";
  if (any(text, GLOBAL_CAUTION)) return "caution";

  if (mode === "monitoring") return "preferred"; // monitoring entries default to recommended
  return "neutral";
}

/**
 * Broad pharmacological categories used by the Drug Formulary browser.
 *
 * The `drugs.drug_class` column holds granular labels (e.g. "Antimicrobial /
 * cephalosporin", "Non-depolarising NMBA", "Sedative / α2-agonist"). For
 * top-level browsing we collapse those into a small set of broad buckets a
 * trainee would actually scan by ("NMBs", "Antimicrobials", "Induction
 * agents", "Antiemetics" …).
 *
 * `match` is evaluated in array order — first hit wins, so more specific
 * buckets must come before the generic catch-alls.
 */

export interface BroadCategory {
  /** URL/identifier-safe key */
  key: string;
  /** Human-readable chip label */
  label: string;
  /** Predicate run against the raw `drug_class` string */
  match: (drugClass: string) => boolean;
}

const re = (pattern: RegExp) => (cls: string) => pattern.test(cls);

export const BROAD_DRUG_CATEGORIES: BroadCategory[] = [
  { key: "induction", label: "Induction agents", match: re(/induction agent/i) },
  { key: "volatile", label: "Volatile agents", match: re(/volatile/i) },
  { key: "nmb", label: "Neuromuscular blockers", match: re(/\bNMBA?\b/i) },
  { key: "nmb-reversal", label: "NMB reversal", match: re(/NMBA reversal/i) },
  { key: "local-anaesthetic", label: "Local anaesthetics", match: re(/local anaesthetic|LA toxicity/i) },
  { key: "opioids", label: "Opioids", match: re(/^Opioid|^Analgesic$/i) },
  { key: "nsaids", label: "NSAIDs / paracetamol", match: re(/NSAID|paracetamol/i) },
  { key: "sedatives", label: "Sedatives & anxiolytics", match: re(/^Sedative|Benzodiazepine antagonist/i) },
  { key: "antiemetics", label: "Antiemetics", match: re(/^Antiemetic/i) },
  { key: "antimicrobials", label: "Antimicrobials", match: re(/^Anti(microbial|fungal|viral)/i) },
  { key: "antiarrhythmics", label: "Antiarrhythmics", match: re(/Antiarrhythmic/i) },
  { key: "vasoactive", label: "Vasoactive (pressors / inotropes / dilators)", match: re(/Vasopressor|Vasodilator|^Inotrope|Vasopressin|β-?blocker|α\/β-?blocker|Pulmonary vasodilator/i) },
  { key: "haemostasis", label: "Anticoagulation & haemostasis", match: re(/Anticoag|Antiplatelet|Antifibrinolytic|Thrombolytic|Blood product/i) },
  { key: "bronchodilators", label: "Bronchodilators & respiratory", match: re(/Bronchodilator|Respiratory stimulant/i) },
  { key: "endocrine", label: "Endocrine & steroids", match: re(/Corticosteroid|^Endocrine|Hypoglyc|Somatostatin/i) },
  { key: "fluids-electrolytes", label: "Fluids & electrolytes", match: re(/Crystalloid|Colloid|^Electrolyte|Buffer|Osmotic/i) },
  { key: "diuretics", label: "Diuretics", match: re(/^Diuretic/i) },
  { key: "gi", label: "GI / acid suppression", match: re(/Antacid|H2 antagonist|^PPI$|prokinetic/i) },
  { key: "neuro", label: "Anticonvulsants & neuro", match: re(/Anticonvulsant|Tricyclic/i) },
  { key: "obstetric", label: "Obstetric (uterotonics)", match: re(/Uterotonic/i) },
  { key: "antidotes", label: "Antidotes & reversal", match: re(/Antidote|antagonist/i) },
];

/** First matching broad bucket, or null if none. */
export function getBroadCategory(drugClass: string): BroadCategory | null {
  for (const cat of BROAD_DRUG_CATEGORIES) {
    if (cat.match(drugClass)) return cat;
  }
  return null;
}

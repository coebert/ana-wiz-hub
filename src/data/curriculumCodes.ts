/**
 * Centralized RCoA curriculum-code registry.
 *
 * Single source of truth for every `XX_BK_NN` curriculum code referenced
 * across the app — folio chips, topic-page learning-point callouts, the
 * Landing curriculum coverage strip, etc.
 *
 * Why this exists
 * ---------------
 * Codes were previously hard-coded in 30+ topic files and folio data.
 * That made it possible to:
 *   • introduce typos (`CR_BK_88`) that silently render dead chips,
 *   • drift away from the published RCoA 2021 curriculum domains,
 *   • lose human-readable titles for cross-references.
 *
 * One registry per code → one place to fix or extend.
 *
 * Format
 * ------
 *   `XX_BK_NN`  — two upper-case letters (domain), `_BK_`, two digits (unit)
 *
 * Domains follow the RCoA 2021 syllabus codes (see RCoA Curriculum 2021,
 * Annex C).  Add new codes here, then `import { isCurriculumCode }` or
 * `getCurriculumCode()` everywhere else.
 */

/** RCoA curriculum domain prefix → human-readable label. */
export const CURRICULUM_DOMAINS = {
  AN: "Anatomy",
  CH: "Hepatobiliary",
  CL: "Airway management",
  CN: "Neurosciences & neurosurgery",
  CP: "Paediatrics",
  CR: "Cardiothoracic",
  CT: "Critical care",
  CU: "Urology",
  EN: "ENT, maxillofacial & dental",
  GA: "General duties",
  HI: "Haematology & immunology",
  IC: "Intensive care medicine",
  NA: "Neuromuscular & autonomic",
  OA: "General, urological & gynaecological surgery",
  OB: "Obstetrics",
  PA: "Paediatric anaesthesia",
  PH: "Pharmacology",
  PO: "Perioperative medicine",
  PR: "Pain medicine",
  RC: "Respiratory & cardiothoracic",
  RP: "Respiratory physiology",
  RU: "Regional anaesthesia",
  VS: "Vascular surgery",
} as const;

export type CurriculumDomain = keyof typeof CURRICULUM_DOMAINS;

/** Strict shape of a single registry entry. */
export interface CurriculumCodeEntry {
  /** Full code, e.g. "CR_BK_01". */
  code: string;
  /** Two-letter domain prefix, e.g. "CR". */
  domain: CurriculumDomain;
  /** Human-readable title — what the unit is about. */
  title: string;
  /** Which FRCA exam(s) the unit primarily belongs to. */
  exams: ReadonlyArray<"primary" | "final" | "fficm" | "edic">;
}

/**
 * THE registry.  Add a new code here and it becomes valid everywhere.
 *
 * Keep entries alphabetised by code so diffs stay small.
 */
export const CURRICULUM_CODES = {
  // ---- Anatomy (AN) ----
  AN_BK_03: { title: "Applied anatomy for anaesthesia", exams: ["primary"] },
  AN_BK_07: { title: "Neuroanatomy for anaesthesia", exams: ["primary"] },

  // ---- Hepatobiliary (CH) ----
  CH_BK_03: { title: "Hepatobiliary anaesthesia & transplantation", exams: ["final"] },

  // ---- Airway management (CL) ----
  CL_BK_01: { title: "Pre-operative airway assessment", exams: ["final"] },
  CL_BK_03: { title: "Airway assessment & difficult airway management", exams: ["final"] },
  CL_BK_07: { title: "Obstetric airway management", exams: ["final"] },

  // ---- Neurosciences (CN) ----
  CN_BK_03: { title: "Neuroanaesthesia — ICP, CPP & supratentorial surgery", exams: ["final"] },

  // ---- Paediatrics (CP) ----
  CP_BK_06: { title: "Paediatric anaesthesia — common procedures", exams: ["final"] },

  // ---- Cardiothoracic (CR) ----
  CR_BK_01: { title: "Cardiovascular physiology & coronary circulation", exams: ["primary", "final"] },
  CR_BK_02: { title: "Cardiac chambers, valves & great-vessel relationships", exams: ["final"] },
  CR_BK_03: { title: "Oxygen delivery & haemoglobin physiology", exams: ["primary"] },
  CR_BK_05: { title: "Autonomic control of the cardiovascular system", exams: ["primary"] },
  CR_BK_06: { title: "Pacemakers, ICDs & peri-operative arrhythmia management", exams: ["final"] },
  CR_BK_07: { title: "Anaesthesia for carotid endarterectomy", exams: ["final"] },

  // ---- Critical care (CT) ----
  CT_BK_22: { title: "Organ donation & end-of-life care", exams: ["fficm"] },

  // ---- Urology (CU) ----
  CU_BK_03: { title: "Anaesthesia for urological surgery", exams: ["final"] },

  // ---- ENT (EN) ----
  EN_BK_03: { title: "ENT anaesthesia — shared airway", exams: ["final"] },

  // ---- General duties (GA) ----
  GA_BK_11: { title: "Non-technical skills & human factors", exams: ["final"] },

  // ---- Haematology & immunology (HI) ----
  HI_BK_01: { title: "Haematology & coagulation physiology", exams: ["primary"] },
  HI_BK_02: { title: "Blood products & transfusion", exams: ["primary"] },
  HI_BK_03: { title: "Immunology & inflammatory response", exams: ["primary"] },

  // ---- Intensive care medicine (IC) ----
  IC_BK_03: { title: "Tracheal intubation in critical care", exams: ["fficm"] },

  // ---- Neuromuscular (NA) ----
  NA_BK_01: { title: "Neurological assessment & neurophysiology", exams: ["primary"] },
  NA_BK_03: { title: "Neuromuscular junction & monitoring", exams: ["primary"] },

  // ---- General/urological/gynae surgery (OA) ----
  OA_BK_01: { title: "Cardiac electrophysiology in surgical patients", exams: ["final"] },
  OA_BK_02: { title: "Oxygen transport in surgical physiology", exams: ["final"] },
  OA_BK_03: { title: "Anaesthesia for general & upper-GI surgery", exams: ["final"] },
  OA_BK_05: { title: "Vascular anaesthesia — aorta & iliac vessels", exams: ["final"] },
  OA_BK_06: { title: "Autonomic considerations in surgery", exams: ["final"] },
  OA_BK_07: { title: "Haematological considerations in surgery", exams: ["final"] },

  // ---- Ophthalmic anaesthesia (OP) ----
  OP_BK_01: { title: "Anaesthesia for ophthalmic surgery", exams: ["final"] },



  // ---- Obstetrics (OB) ----
  OB_BK_01: { title: "Neuraxial anaesthesia in obstetrics", exams: ["final"] },
  OB_BK_02: { title: "Obstetric physiology & high-risk pregnancy", exams: ["final"] },

  // ---- Paediatric anaesthesia (PA) ----
  PA_BK_01: { title: "Foetal & neonatal physiology", exams: ["primary"] },
  PA_BK_02: { title: "Transitional circulation & congenital cardiac disease", exams: ["primary"] },
  PA_BK_03: { title: "Paediatric regional anaesthesia — caudal block", exams: ["final"] },

  // ---- Pharmacology (PH) ----
  PH_BK_01: { title: "Pharmacokinetic principles", exams: ["primary"] },
  PH_BK_02: { title: "Organic chemistry of anaesthetic agents", exams: ["primary"] },
  PH_BK_04: { title: "Inhalational anaesthetic agents", exams: ["primary"] },
  PH_BK_09: { title: "Local anaesthetics", exams: ["primary"] },
  PH_BK_12: { title: "Cardiovascular pharmacology", exams: ["primary"] },

  // ---- Perioperative medicine (PO) ----
  PO_BK_01: { title: "Pre-operative assessment & optimisation", exams: ["final"] },

  // ---- Pain medicine (PR) ----
  PR_BK_05: { title: "Pharmacology of analgesic & adjuvant agents", exams: ["primary"] },

  // ---- Respiratory & cardiothoracic (RC) ----
  RC_BK_01: { title: "Anaesthesia for thoracic surgery", exams: ["final"] },
  RC_BK_02: { title: "One-lung ventilation & DLT placement", exams: ["final"] },
  RC_BK_03: { title: "Lung mechanics & ventilation–perfusion matching", exams: ["primary"] },

  // ---- Respiratory physiology (RP) ----
  RP_BK_01: { title: "Respiratory physiology — gas exchange", exams: ["primary"] },
  RP_BK_03: { title: "Control of breathing", exams: ["primary"] },
  RP_BK_07: { title: "Pulmonary circulation & ventilation–perfusion", exams: ["primary"] },

  // ---- Regional anaesthesia (RU) ----
  RU_BK_01: { title: "Upper-limb regional anaesthesia", exams: ["final"] },
  RU_BK_02: { title: "Lower-limb & truncal regional anaesthesia", exams: ["final"] },

  // ---- Regional anaesthesia — applied (RA) ----
  RA_BK_02: { title: "Supraclavicular brachial plexus block landmarks", exams: ["primary", "final"] },

  // ---- Cardiovascular access & monitoring (CV) ----
  CV_BK_04: { title: "Subclavian central venous access", exams: ["primary"] },

  // ---- Vascular surgery (VS) ----
  VS_BK_05: { title: "Vascular surgery — aneurysm repair", exams: ["final"] },
} as const satisfies Record<string, Pick<CurriculumCodeEntry, "title" | "exams">>;

/** Literal-union type of every registered code — gives compile-time autocompletion. */
export type CurriculumCode = keyof typeof CURRICULUM_CODES;

/** Format check: matches the published `XX_BK_NN` shape. */
const CODE_FORMAT_RE = /^[A-Z]{2}_BK_\d{2}$/;

/** Type guard: `code` is well-formed AND present in the registry. */
export function isCurriculumCode(code: string): code is CurriculumCode {
  return CODE_FORMAT_RE.test(code) && code in CURRICULUM_CODES;
}

/** Looser check used by validators: format only, registry-membership ignored. */
export function isCurriculumCodeFormat(code: string): boolean {
  return CODE_FORMAT_RE.test(code);
}

/**
 * Lookup a code with a friendly error if it's missing.  Use in dev/tests
 * to fail fast; in render paths prefer `tryGetCurriculumCode`.
 */
export function getCurriculumCode(code: string): CurriculumCodeEntry {
  if (!isCurriculumCode(code)) {
    throw new Error(
      `Unknown curriculum code "${code}". ` +
        `Add it to src/data/curriculumCodes.ts or fix the typo. ` +
        `Expected format: XX_BK_NN.`,
    );
  }
  const entry = CURRICULUM_CODES[code];
  return {
    code,
    domain: code.slice(0, 2) as CurriculumDomain,
    title: entry.title,
    exams: entry.exams,
  };
}

/** Non-throwing variant for UI code paths. */
export function tryGetCurriculumCode(code: string): CurriculumCodeEntry | null {
  return isCurriculumCode(code) ? getCurriculumCode(code) : null;
}

/** Every registered code as an array — useful for tests, indexes, sitemaps. */
export const ALL_CURRICULUM_CODES = Object.keys(CURRICULUM_CODES) as CurriculumCode[];

/**
 * Centralised, exam-relevant lab glossary used by the LabGlossaryPopover.
 * Each entry carries:
 *   - reference range
 *   - the typical bedside trend in the canonical clinical context
 *   - "why" mechanism
 *   - clinical effects of derangement
 *   - action threshold(s)
 *   - sourced citations for BOTH the trend and the action threshold
 *
 * Sources are deliberately picked from BJA Education / NICE / ASPEN /
 * Endocrine Society / JBDS-IP / KDIGO / Surviving Sepsis so the chip
 * tooltip carries an exam-friendly verbatim quote.
 */

export type SourceLink = {
  /** Short label that appears on the chip (e.g. "BJA Educ — Mehanna 2008"). */
  label: string;
  /** Direct URL — opens in a new tab. */
  url: string;
  /** Verbatim supporting quote shown as the chip title (hover tooltip). */
  quote: string;
};

export type LabKey =
  | "K"
  | "Na"
  | "Cl"
  | "HCO3"
  | "pH"
  | "lactate"
  | "Glu"
  | "ketones"
  | "osmolality"
  | "PO4"
  | "Mg"
  | "Ca"
  | "cortisol"
  | "TSH"
  | "freeT4"
  | "freeT3"
  | "urea"
  | "creat";

export interface LabEntry {
  /** Display name including units symbol (e.g. "Potassium (K⁺)"). */
  full: string;
  /** Reference range low. */
  lo: number;
  /** Reference range high. */
  hi: number;
  /** Reference range units (e.g. "mmol/L"). */
  unit: string;
  /** Default "typical trend" copy. Callers may override per-context. */
  trend: string;
  /** Mechanism / pathophysiology. */
  why: string;
  /** Clinical effects of derangement. */
  clinical: string;
  /** Action threshold + bedside response. */
  action: string;
  /** Sources backing the typical trend. */
  trendSources: SourceLink[];
  /** Sources backing the action threshold. */
  actionSources: SourceLink[];
}

/* -------------------------------------------------------------------------- */
/* Source bank — declared once, reused below to keep entries readable.        */
/* -------------------------------------------------------------------------- */

const SRC = {
  bjaMehanna: {
    label: "BJA / BMJ — Mehanna 2008",
    url: "https://www.bmj.com/content/336/7659/1495",
    quote:
      "Insulin causes cellular uptake of potassium, magnesium and phosphate, leading to hypokalaemia, hypomagnesaemia and hypophosphataemia.",
  },
  niceCG32: {
    label: "NICE CG32 §1.4",
    url: "https://www.nice.org.uk/guidance/cg32/chapter/Recommendations",
    quote:
      "Provide oral, enteral or intravenous supplements of potassium (likely requirement 2–4 mmol/kg/day), phosphate (0.3–0.6 mmol/kg/day) and magnesium…",
  },
  aspen2020: {
    label: "ASPEN consensus 2020",
    url: "https://aspenjournals.onlinelibrary.wiley.com/doi/10.1002/ncp.10474",
    quote:
      "Decreases in serum potassium, magnesium, and/or phosphorus levels occur within hours to days of reintroducing nutrition.",
  },
  jbdsDka: {
    label: "JBDS-IP DKA 2023",
    url: "https://abcd.care/sites/default/files/site_uploads/JBDS_Guidelines_Current/JBDS_02_DKA_Guideline_with_QR_code_March_2023.pdf",
    quote:
      "Add potassium 40 mmol/L when serum K⁺ is 3.5–5.5 mmol/L. If K⁺ < 3.5 mmol/L withhold insulin and replace potassium urgently.",
  },
  jbdsHhs: {
    label: "JBDS-IP HHS 2022",
    url: "https://abcd.care/sites/default/files/site_uploads/JBDS_Guidelines_Current/JBDS_06_The_Management_of_the_Hyperosmolar_Hyperglycaemic_State_HHS_in_Adults_FINAL_0.pdf",
    quote:
      "Diagnostic criteria: hypovolaemia, marked hyperglycaemia (≥ 30 mmol/L) without significant ketonaemia (< 3 mmol/L) or acidosis (pH > 7.30, HCO₃⁻ > 15), osmolality usually ≥ 320 mOsm/kg.",
  },
  bjaDka: {
    label: "BJA Educ — DKA & HHS",
    url: "https://www.bjaed.org/article/S2058-5349(22)00076-1/fulltext",
    quote:
      "Total body potassium is depleted (3–5 mmol/kg) despite normal or high serum levels at presentation; insulin therapy will rapidly drop serum K⁺.",
  },
  bornsteinAddison: {
    label: "Endocrine Society — Bornstein 2016",
    url: "https://academic.oup.com/jcem/article/101/2/364/2810222",
    quote:
      "Adrenal crisis presents with hyponatraemia, hyperkalaemia and hypoglycaemia; treat with hydrocortisone 100 mg IV bolus then 200 mg/24 h.",
  },
  ataStorm: {
    label: "ATA 2016 — Hyperthyroidism",
    url: "https://www.thyroid.org/wp-content/uploads/publications/guidelines/2016/ATA-2016-Hyperthyroidism-Guidelines.pdf",
    quote:
      "Suppressed TSH with elevated free T4 and/or T3, in a patient with severe systemic decompensation, supports the diagnosis of thyroid storm.",
  },
  bjaThyroid: {
    label: "BJA Educ — Thyroid disease & anaesthesia",
    url: "https://www.bjaed.org/article/S2058-5349(20)30005-X/fulltext",
    quote:
      "In thyroid storm, beta-blockade controls the adrenergic surge while propylthiouracil blocks both new hormone synthesis and peripheral T4→T3 conversion.",
  },
  myxoedemaJCEM: {
    label: "JCEM — Myxoedema coma",
    url: "https://academic.oup.com/jcem/article/99/8/2745/2538045",
    quote:
      "Hyponatraemia is present in approximately 50 % of patients and reflects impaired free-water excretion from cortisol deficiency and reduced cardiac output.",
  },
  hyponatraemiaEU: {
    label: "EU hyponatraemia guideline 2014",
    url: "https://academic.oup.com/ndt/article/29/suppl_2/i1/1904457",
    quote:
      "Severe symptomatic hyponatraemia (Na⁺ < 125 mmol/L with seizures, coma) → 150 mL 3 % NaCl over 10 min, repeat once if no improvement; correct < 10 mmol/L in 24 h.",
  },
  ssLactate: {
    label: "Surviving Sepsis 2021",
    url: "https://www.sccm.org/SurvivingSepsisCampaign/Guidelines/Adult-Patients",
    quote:
      "For patients with sepsis-induced hypoperfusion or septic shock, we suggest guiding resuscitation to decrease serum lactate in patients with elevated lactate over not using lactate.",
  },
  bjaSepsis: {
    label: "BJA Educ — Sepsis biomarkers",
    url: "https://www.bjaed.org/article/S2058-5349(20)30106-6/fulltext",
    quote:
      "Lactate > 2 mmol/L identifies tissue hypoperfusion; > 4 mmol/L is associated with markedly increased mortality.",
  },
  bjaAcidBase: {
    label: "BJA Educ — Acid-base",
    url: "https://www.bjaed.org/article/S2058-5349(18)30101-3/fulltext",
    quote:
      "An anion gap > 16 mmol/L in the context of metabolic acidosis indicates the accumulation of unmeasured anions (lactate, ketones, salicylate, methanol, ethylene glycol).",
  },
  niceSugar: {
    label: "NICE-SUGAR 2009 (NEJM)",
    url: "https://www.nejm.org/doi/full/10.1056/NEJMoa0810625",
    quote:
      "Intensive glucose control (target 4.5–6.0 mmol/L) increased mortality compared with conventional control (≤ 10 mmol/L) in critically ill adults.",
  },
  bjaCalcium: {
    label: "BJA Educ — Calcium homeostasis",
    url: "https://www.bjaed.org/article/S2058-5349(17)30048-3/fulltext",
    quote:
      "Severe hypocalcaemia (ionised < 0.8 mmol/L) causes tetany, laryngospasm, seizures, prolonged QT and cardiac failure; treat with 10 mL 10 % calcium gluconate over 10 min.",
  },
  kdigoAki: {
    label: "KDIGO AKI 2012",
    url: "https://kdigo.org/wp-content/uploads/2016/10/KDIGO-2012-AKI-Guideline-English.pdf",
    quote:
      "Stage 1 AKI: serum creatinine rise ≥ 26 µmol/L within 48 h or 1.5–1.9× baseline within 7 days, or urine output < 0.5 mL/kg/h for 6–12 h.",
  },
} as const;

/* -------------------------------------------------------------------------- */
/* Glossary entries                                                           */
/* -------------------------------------------------------------------------- */

export const LAB_GLOSSARY: Record<LabKey, LabEntry> = {
  K: {
    full: "Potassium (K⁺)",
    lo: 3.5,
    hi: 5.0,
    unit: "mmol/L",
    trend:
      "Falls rapidly with insulin or refeeding (cellular uptake) — total-body deficit usually masked by acidosis at presentation.",
    why: "Insulin activates Na⁺/K⁺-ATPase → K⁺ shifts into cells. Acidosis and insulin deficit shift K⁺ extracellularly, so serum value at presentation often hides massive whole-body depletion.",
    clinical:
      "Arrhythmia (VT/VF, torsades, asystole), muscle weakness, ileus. ECG: flat T, U waves, long QT (low); peaked T, wide QRS, sine wave (high).",
    action:
      "Replace if < 3.5; urgent IV with cardiac monitoring if < 3.0 or symptomatic. In DKA: withhold insulin until K⁺ ≥ 3.5; add 40 mmol KCl/L when K⁺ 3.5–5.5.",
    trendSources: [SRC.bjaMehanna, SRC.aspen2020, SRC.bjaDka],
    actionSources: [SRC.jbdsDka, SRC.niceCG32],
  },
  Na: {
    full: "Sodium (Na⁺)",
    lo: 135,
    hi: 145,
    unit: "mmol/L",
    trend:
      "Falls in adrenal crisis, myxoedema and SIADH; rises in HHS / dehydration. Apparent low Na⁺ in hyperglycaemia is dilutional — correct +2.4 mmol/L per 5.5 mmol/L glucose above 5.5.",
    why: "Cortisol deficiency → ↑ ADH and free-water retention. Hyperglycaemia draws water out of cells diluting Na⁺. Severe hyperosmolar states cause true hypernatraemia from osmotic diuresis.",
    clinical:
      "Acute symptomatic ↓ Na⁺ < 125: seizures, coma, herniation. Rapid over-correction → osmotic demyelination (CPM).",
    action:
      "Severe symptomatic ↓ Na⁺: 150 mL 3 % NaCl over 10 min, repeat once. Cap correction at < 10 mmol/L in 24 h. In HHS aim Na⁺ change ≤ 10 mmol/L/24 h.",
    trendSources: [SRC.bornsteinAddison, SRC.myxoedemaJCEM, SRC.jbdsHhs],
    actionSources: [SRC.hyponatraemiaEU, SRC.jbdsHhs],
  },
  Cl: {
    full: "Chloride (Cl⁻)",
    lo: 95,
    hi: 110,
    unit: "mmol/L",
    trend:
      "Rises with large-volume 0.9 % NaCl resuscitation → hyperchloraemic (normal-anion-gap) acidosis.",
    why: "0.9 % saline contains 154 mmol/L Cl⁻ — exceeds plasma. Excess Cl⁻ displaces HCO₃⁻ (Stewart's strong-ion difference falls).",
    clinical:
      "Iatrogenic non-AG metabolic acidosis, possible AKI risk. Look for it when bicarbonate falls without ketones / lactate.",
    action:
      "Switch to balanced crystalloid (Hartmann's, Plasma-Lyte) for ongoing resuscitation when feasible.",
    trendSources: [SRC.bjaAcidBase],
    actionSources: [SRC.bjaAcidBase],
  },
  HCO3: {
    full: "Bicarbonate (HCO₃⁻)",
    lo: 22,
    hi: 28,
    unit: "mmol/L",
    trend:
      "Falls in DKA / lactic acidosis (consumed buffering H⁺); rises in vomiting / diuretic loss / chronic CO₂ retention.",
    why: "HCO₃⁻ buffers fixed acids (ketones, lactate). Renal compensation for chronic respiratory acidosis raises HCO₃⁻ by ~3.5 mmol/L per 10 mmHg PaCO₂ above 40.",
    clinical: "Used to track resolution of DKA; rise of ≥ 3 mmol/L per hour expected with adequate insulin.",
    action:
      "Avoid bicarbonate therapy in DKA (cerebral oedema, paradoxical CSF acidosis). Resolution of DKA: HCO₃⁻ > 18.",
    trendSources: [SRC.bjaAcidBase, SRC.jbdsDka],
    actionSources: [SRC.jbdsDka],
  },
  pH: {
    full: "Arterial / venous pH",
    lo: 7.35,
    hi: 7.45,
    unit: "",
    trend:
      "Falls in DKA (HAGMA) and lactic acidosis. Severity in DKA: pH < 7.10 = severe (HDU/ICU). Normal in HHS by definition (pH > 7.30).",
    why: "Accumulating ketones (β-hydroxybutyrate) or lactate consume HCO₃⁻ and raise the anion gap.",
    clinical: "Severe acidosis impairs catecholamine response, depresses myocardium and shifts K⁺ extracellularly.",
    action:
      "DKA severity: pH < 7.10 → HDU/ICU referral. Resolution criteria: venous pH > 7.30 + HCO₃⁻ > 18 + ketones < 0.6.",
    trendSources: [SRC.bjaAcidBase, SRC.jbdsDka],
    actionSources: [SRC.jbdsDka],
  },
  lactate: {
    full: "Lactate",
    lo: 0.5,
    hi: 2.0,
    unit: "mmol/L",
    trend:
      "Rises in tissue hypoperfusion, sepsis, type-B causes (metformin, propylene glycol, mitochondrial poisons). > 4 mmol/L = severe.",
    why: "Anaerobic glycolysis when oxygen delivery fails to meet demand. Type B: impaired clearance or drug-induced.",
    clinical: "Marker of shock severity and resuscitation response; lactate clearance > 10 %/h associated with improved survival in sepsis.",
    action:
      "Surviving Sepsis: re-measure at 2–4 h; aim for falling trend. Sustained > 4 mmol/L despite fluid → escalate vasopressor / source control.",
    trendSources: [SRC.bjaSepsis],
    actionSources: [SRC.ssLactate],
  },
  Glu: {
    full: "Glucose",
    lo: 4.0,
    hi: 7.8,
    unit: "mmol/L",
    trend:
      "↑↑ in DKA (> 11) and HHS (> 30); ↓ in adrenal crisis and myxoedema (cortisol/T₃ deficiency); ↓ on insulin therapy.",
    why: "Insulin deficit + counter-regulatory surge raises glucose. Cortisol deficit removes hepatic gluconeogenesis drive.",
    clinical: "Hyperglycaemia → osmotic diuresis, dehydration, hyperosmolality. Hypoglycaemia → seizures, focal deficit, arrhythmia.",
    action:
      "ICU target 6–10 mmol/L (avoid 4.5–6 — increased mortality, NICE-SUGAR). In DKA add 10 % dextrose at 125 mL/h once glucose < 14 — keeps insulin running until ketones clear.",
    trendSources: [SRC.jbdsDka, SRC.jbdsHhs, SRC.bornsteinAddison],
    actionSources: [SRC.niceSugar, SRC.jbdsDka],
  },
  ketones: {
    full: "β-hydroxybutyrate (ketones)",
    lo: 0,
    hi: 0.6,
    unit: "mmol/L",
    trend:
      "≥ 3 in DKA; < 3 in HHS by definition. SGLT2-inhibitor euglycaemic DKA: ketones ≥ 3 with normal glucose.",
    why: "Insulin deficit unmasks lipolysis → free fatty acids → hepatic ketogenesis (β-hydroxybutyrate dominates).",
    clinical: "Direct marker of insulin sufficiency at the cellular level — better than glucose for tracking DKA resolution.",
    action:
      "DKA resolution requires ketones < 0.6. If ketones not falling ≥ 0.5 mmol/L/h (or HCO₃⁻ rising ≥ 3/h), increase fixed-rate insulin by 1 U/h.",
    trendSources: [SRC.jbdsDka, SRC.jbdsHhs],
    actionSources: [SRC.jbdsDka],
  },
  osmolality: {
    full: "Calculated osmolality",
    lo: 275,
    hi: 295,
    unit: "mOsm/kg",
    trend:
      "> 320 mOsm/kg in HHS by definition. Calculated as 2[Na⁺] + glucose + urea (all in mmol/L).",
    why: "Profound hyperglycaemia + dehydration drives water out of cells; chronic onset allows brain to accumulate osmolytes — rapid correction risks central pontine myelinolysis.",
    clinical: "Coma in HHS correlates with osmolality > 340 mOsm/kg.",
    action:
      "HHS: aim osmolality fall ≤ 5 mOsm/kg/h, glucose fall ≤ 5 mmol/L/h, Na⁺ change ≤ 10 mmol/L/24 h.",
    trendSources: [SRC.jbdsHhs],
    actionSources: [SRC.jbdsHhs],
  },
  PO4: {
    full: "Phosphate (PO₄³⁻)",
    lo: 0.8,
    hi: 1.5,
    unit: "mmol/L",
    trend:
      "Falls within hours of refeeding / insulin (cellular uptake for ATP, 2,3-DPG). Nadir 24–72 h after starting feed.",
    why: "Carbohydrate-induced insulin surge drives phosphate intracellularly to phosphorylate glucose / regenerate ATP and 2,3-DPG.",
    clinical: "Severe ↓ PO₄ (< 0.32 mmol/L): respiratory failure, rhabdomyolysis, haemolysis, cardiac failure, encephalopathy.",
    action:
      "Severe (< 0.3): IV phosphate (Phosphate Polyfusor 50 mmol over 12 h, monitor Ca²⁺). Moderate: oral / enteral 30 mmol/day.",
    trendSources: [SRC.bjaMehanna, SRC.aspen2020],
    actionSources: [SRC.aspen2020, SRC.niceCG32],
  },
  Mg: {
    full: "Magnesium (Mg²⁺)",
    lo: 0.7,
    hi: 1.0,
    unit: "mmol/L",
    trend: "Falls with refeeding (cellular uptake), diuretics, PPI use, alcohol, DKA insulin therapy.",
    why: "Mg²⁺ is required for K⁺ retention and ATP-dependent enzymes — depletion perpetuates hypokalaemia and prolongs QT.",
    clinical: "Tetany, seizures, prolonged QT, refractory hypokalaemia, AF, torsades, weakness.",
    action:
      "IV MgSO₄ 2 g (8 mmol) over 15 min for symptomatic / arrhythmia; replace before/with K⁺ — hypokalaemia is otherwise refractory.",
    trendSources: [SRC.bjaMehanna, SRC.aspen2020],
    actionSources: [SRC.niceCG32],
  },
  Ca: {
    full: "Calcium (corrected total)",
    lo: 2.20,
    hi: 2.60,
    unit: "mmol/L",
    trend:
      "Falls with phosphate replacement (precipitation), citrate (massive transfusion / RRT), pancreatitis, vitamin D deficiency.",
    why: "Phosphate complexes with Ca²⁺ in plasma; citrate chelates ionised Ca²⁺.",
    clinical:
      "Tetany (Chvostek, Trousseau), laryngospasm, seizures, prolonged QT, cardiac failure (especially ionised < 0.8 mmol/L).",
    action: "10 mL 10 % calcium gluconate over 10 min for symptomatic / ionised < 0.8; repeat as needed with monitoring.",
    trendSources: [SRC.bjaCalcium],
    actionSources: [SRC.bjaCalcium],
  },
  cortisol: {
    full: "Random cortisol",
    lo: 140,
    hi: 700,
    unit: "nmol/L",
    trend:
      "Should be ≥ 500 nmol/L during severe stress. < 100 nmol/L during shock is diagnostic of adrenal crisis.",
    why: "ACTH-driven stress response normally raises cortisol > 500 nmol/L. Failure indicates primary or secondary adrenal insufficiency.",
    clinical: "Refractory shock + low Na⁺ + high K⁺ + low glucose = the bedside picture of adrenal crisis.",
    action:
      "Take paired random cortisol + ACTH BEFORE first steroid — but never delay treatment. Hydrocortisone 100 mg IV stat → 200 mg/24 h.",
    trendSources: [SRC.bornsteinAddison],
    actionSources: [SRC.bornsteinAddison],
  },
  TSH: {
    full: "Thyroid-stimulating hormone (TSH)",
    lo: 0.4,
    hi: 4.0,
    unit: "mU/L",
    trend:
      "Suppressed (< 0.1) in thyroid storm / Graves; markedly raised (> 20) in primary hypothyroidism / myxoedema coma.",
    why: "Pituitary feedback: TSH falls when free T4/T3 are high, and rises when they fall (primary disease). In secondary disease TSH is inappropriately normal/low despite low T4.",
    clinical:
      "Storm: tachycardia, AF, fever, agitation, GI/CNS dysfunction (BWPS ≥ 45). Myxoedema: hypothermia, hypoventilation, hyponatraemia, obtundation.",
    action: "Suppressed + high T4 + decompensation → treat as storm. Raised + low T4 + obtunded → treat as myxoedema (IV T3/T4 + hydrocortisone).",
    trendSources: [SRC.ataStorm, SRC.myxoedemaJCEM],
    actionSources: [SRC.ataStorm, SRC.bjaThyroid],
  },
  freeT4: {
    full: "Free thyroxine (free T4)",
    lo: 9,
    hi: 25,
    unit: "pmol/L",
    trend: "Markedly raised in thyroid storm; low in myxoedema coma.",
    why: "T4 is the prohormone — peripheral 5'-deiodinase converts to active T3. PTU uniquely blocks this conversion as well as synthesis.",
    clinical: "Severity correlates poorly with T4 level — clinical decompensation defines storm, not the number.",
    action:
      "Treat decompensated picture even if T4 not yet back. Storm: β-blocker → PTU → Lugol's iodine ≥ 1 h later → hydrocortisone.",
    trendSources: [SRC.ataStorm, SRC.bjaThyroid],
    actionSources: [SRC.ataStorm],
  },
  freeT3: {
    full: "Free tri-iodothyronine (free T3)",
    lo: 3.5,
    hi: 6.5,
    unit: "pmol/L",
    trend: "Raised in storm; low in myxoedema coma. Sick-euthyroid: low T3 with normal/low TSH.",
    why: "Active hormone. PTU blocks T4→T3 conversion; high-dose β-blocker (propranolol) also has a small inhibitory effect.",
    clinical: "Most clinically active form — drives the cardiac and metabolic effects.",
    action: "IV T3 10–20 mcg bolus then 10 mcg q4h is preferred over oral T4 in myxoedema coma (gut absorption unreliable).",
    trendSources: [SRC.bjaThyroid, SRC.myxoedemaJCEM],
    actionSources: [SRC.myxoedemaJCEM],
  },
  urea: {
    full: "Urea",
    lo: 2.5,
    hi: 7.5,
    unit: "mmol/L",
    trend: "Rises with dehydration, GI bleed, AKI, high-protein feed; falls in liver failure / pregnancy.",
    why: "Urea/creatinine ratio > 100:1 suggests pre-renal cause; > 150:1 suggests upper GI bleed.",
    clinical: "Component of calculated osmolality; correlates with hydration status.",
    action: "Use urea trend with creatinine and urine output to stage AKI (KDIGO).",
    trendSources: [SRC.kdigoAki],
    actionSources: [SRC.kdigoAki],
  },
  creat: {
    full: "Creatinine",
    lo: 60,
    hi: 110,
    unit: "µmol/L",
    trend: "Rises in AKI (pre-renal, intrinsic, post-renal); chronically raised in CKD.",
    why: "Filtered freely, minimally secreted; lags behind acute GFR fall by 24–48 h.",
    clinical:
      "Stage 1 AKI: ≥ 26 µmol/L rise within 48 h or 1.5–1.9× baseline within 7 days; or urine output < 0.5 mL/kg/h for 6–12 h.",
    action:
      "Identify and treat cause; review nephrotoxins; consider RRT for fluid overload, severe acidosis, hyperkalaemia, uraemia.",
    trendSources: [SRC.kdigoAki],
    actionSources: [SRC.kdigoAki],
  },
};

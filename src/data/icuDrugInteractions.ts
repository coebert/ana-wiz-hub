/**
 * Pairwise interaction engine for the adult ICU formulary mirrored in
 * icuDrugSafety.ts / icuDrugDoses.ts.
 *
 * Two layers:
 *  1. `icuDrugPairInteractions` — curated, named drug-pair interactions.
 *  2. `icuInteractionClassRules` + `icuDrugInteractionTags` — pharmacological
 *     class rules, so any two drugs sharing a mechanism (QT prolongation,
 *     additive hypotension, nephrotoxicity, bleeding risk…) are flagged even
 *     when no named pair exists.
 *
 * Revision aid only — always check the BNF, SPC and local critical care
 * guidelines and your pharmacist before prescribing.
 */

export type InteractionSeverity = "avoid" | "major" | "moderate";

export interface InteractionFinding {
  severity: InteractionSeverity;
  /** Short mechanism headline, e.g. "Additive QT prolongation". */
  effect: string;
  /** What happens clinically. */
  detail: string;
  /** What to do about it. */
  action: string;
  /** "Named pair" or the class rule label. */
  basis: string;
}

/** Class tags per drug slug (slugs match icuDrugSafety.ts). */
export const icuDrugInteractionTags: Record<string, string[]> = {
  propofol: ["sedative", "hypotensive", "bradycardic", "respiratory-depressant"],
  fentanyl: ["sedative", "opioid", "respiratory-depressant", "cyp3a4-substrate", "serotonergic", "bradycardic"],
  morphine: ["sedative", "opioid", "respiratory-depressant", "renally-cleared", "hypotensive"],
  alfentanil: ["sedative", "opioid", "respiratory-depressant", "cyp3a4-substrate"],
  midazolam: ["sedative", "benzodiazepine", "respiratory-depressant", "cyp3a4-substrate", "hypotensive", "delirium-risk"],
  dexmedetomidine: ["sedative", "alpha2-agonist", "bradycardic", "hypotensive"],
  clonidine: ["sedative", "alpha2-agonist", "bradycardic", "hypotensive"],
  ketamine: ["sedative", "sympathomimetic", "cyp3a4-substrate"],
  haloperidol: ["qt-prolonging", "sedative", "dopamine-antagonist", "cyp3a4-substrate"],
  rocuronium: ["neuromuscular-blocker"],
  "atracurium-cisatracurium": ["neuromuscular-blocker"],
  suxamethonium: ["neuromuscular-blocker", "hyperkalaemia", "bradycardic"],
  noradrenaline: ["vasopressor", "catecholamine", "arrhythmogenic", "extravasation-risk"],
  adrenaline: ["vasopressor", "catecholamine", "arrhythmogenic", "hypokalaemia", "hyperglycaemia", "extravasation-risk"],
  vasopressin: ["vasopressor", "extravasation-risk"],
  dobutamine: ["inotrope", "catecholamine", "arrhythmogenic", "hypotensive"],
  milrinone: ["inotrope", "hypotensive", "arrhythmogenic", "renally-cleared"],
  metaraminol: ["vasopressor", "extravasation-risk"],
  hydrocortisone: ["steroid", "hyperglycaemia", "hypokalaemia", "immunosuppressant"],
  amiodarone: ["qt-prolonging", "antiarrhythmic", "bradycardic", "cyp3a4-inhibitor", "pgp-inhibitor", "hypotensive"],
  "magnesium-sulfate": ["nmb-potentiating", "bradycardic", "hypotensive", "renally-cleared", "sedative"],
  digoxin: ["bradycardic", "narrow-therapeutic-index", "pgp-substrate", "renally-cleared", "hypokalaemia-sensitive"],
  esmolol: ["beta-blocker", "bradycardic", "hypotensive", "hypoglycaemia-masking"],
  "glyceryl-trinitrate": ["vasodilator", "hypotensive"],
  labetalol: ["beta-blocker", "bradycardic", "hypotensive", "hypoglycaemia-masking"],
  lorazepam: ["sedative", "benzodiazepine", "respiratory-depressant", "delirium-risk"],
  levetiracetam: ["anticonvulsant", "sedative", "renally-cleared"],
  phenytoin: ["anticonvulsant", "cyp-inducer", "narrow-therapeutic-index", "hypotensive", "bradycardic", "arrhythmogenic"],
  "hypertonic-saline": ["sodium-load", "extravasation-risk"],
  mannitol: ["diuretic", "nephrotoxic", "hypokalaemia", "renally-cleared"],
  nimodipine: ["vasodilator", "hypotensive", "cyp3a4-substrate"],
  "tranexamic-acid": ["prothrombotic", "renally-cleared"],
  enoxaparin: ["anticoagulant", "bleeding-risk", "hyperkalaemia", "renally-cleared"],
  "unfractionated-heparin": ["anticoagulant", "bleeding-risk", "hyperkalaemia"],
  "prothrombin-complex-concentrate": ["prothrombotic", "reversal-agent"],
  "andexanet-idarucizumab": ["prothrombotic", "reversal-agent"],
  "regional-citrate-anticoagulation": ["anticoagulant", "hypocalcaemia", "alkalosis-risk"],
  insulin: ["hypoglycaemia-risk", "hypokalaemia"],
  "calcium-gluconate": ["calcium-load", "extravasation-risk"],
  "potassium-chloride": ["hyperkalaemia", "extravasation-risk"],
  "proton-pump-inhibitors": ["cyp2c19-inhibitor", "hypomagnesaemia", "c-diff-risk"],
  terlipressin: ["vasopressor", "hyponatraemia-risk", "bradycardic"],
  "n-acetylcysteine": ["antidote", "hypotensive"],
  thiamine: ["vitamin"],
  "piperacillin-tazobactam": ["antimicrobial", "nephrotoxic", "hypokalaemia", "c-diff-risk", "bleeding-risk"],
  meropenem: ["antimicrobial", "seizure-threshold-lowering", "valproate-interaction", "c-diff-risk", "renally-cleared"],
  vancomycin: ["antimicrobial", "nephrotoxic", "narrow-therapeutic-index", "renally-cleared", "histamine-release"],
  ceftriaxone: ["antimicrobial", "calcium-incompatible", "c-diff-risk", "biliary-sludging"],
  "co-trimoxazole": ["antimicrobial", "nephrotoxic", "hyperkalaemia", "qt-prolonging", "myelosuppressive", "cyp2c9-inhibitor"],
  aciclovir: ["antimicrobial", "nephrotoxic", "neurotoxic", "renally-cleared"],
};

interface ClassRule {
  /** Both tags must be present across the pair (either order). */
  tags: [string, string];
  severity: InteractionSeverity;
  effect: string;
  detail: string;
  action: string;
  label: string;
  /** If true, both drugs must carry BOTH tags is not required — same tag on each drug. */
  sameTag?: boolean;
}

export const icuInteractionClassRules: ClassRule[] = [
  {
    tags: ["qt-prolonging", "qt-prolonging"],
    sameTag: true,
    severity: "major",
    effect: "Additive QT prolongation",
    detail:
      "Both drugs prolong the QT interval; combined use raises the risk of torsade de pointes, especially with hypokalaemia, hypomagnesaemia, bradycardia or renal failure.",
    action:
      "12-lead ECG before and after starting, then daily QTc. Keep K⁺ > 4.0 mmol/L and Mg²⁺ > 1.0 mmol/L. Stop or substitute if QTc > 500 ms or rises > 60 ms from baseline.",
    label: "Class rule: QT prolongation",
  },
  {
    tags: ["bradycardic", "bradycardic"],
    sameTag: true,
    severity: "major",
    effect: "Additive bradycardia and AV block",
    detail:
      "Combined negative chronotropy can produce profound bradycardia, junctional rhythm or asystole — dexmedetomidine, β-blockers, amiodarone, digoxin and propofol are the usual culprits.",
    action:
      "Continuous ECG; treat heart rate < 45/min or symptomatic bradycardia by stopping the least essential agent. Have atropine and external pacing available.",
    label: "Class rule: bradycardia",
  },
  {
    tags: ["hypotensive", "hypotensive"],
    sameTag: true,
    severity: "moderate",
    effect: "Additive hypotension",
    detail:
      "Both agents reduce systemic vascular resistance and/or contractility; the fall is exaggerated in hypovolaemia, sepsis and after neuraxial block.",
    action:
      "Titrate rather than bolus, restore volume first, and use invasive arterial monitoring. Reduce the least essential infusion before escalating vasopressor.",
    label: "Class rule: hypotension",
  },
  {
    tags: ["sedative", "respiratory-depressant"],
    severity: "moderate",
    effect: "Additive sedation and respiratory depression",
    detail:
      "Synergistic CNS depression prolongs ventilation, deepens sedation beyond target and increases delirium and ICU-acquired weakness.",
    action:
      "Set a RASS target, use the lowest effective doses, perform daily sedation interruption where safe, and monitor CO₂/respiratory rate in spontaneously breathing patients.",
    label: "Class rule: CNS depression",
  },
  {
    tags: ["nephrotoxic", "nephrotoxic"],
    sameTag: true,
    severity: "major",
    effect: "Additive nephrotoxicity",
    detail:
      "Concurrent nephrotoxins substantially increase the incidence of AKI (the piperacillin–tazobactam plus vancomycin combination is the classic ICU example).",
    action:
      "Daily creatinine, urine output and fluid balance; avoid hypovolaemia; use levels/AUC dosing where available and switch to a less nephrotoxic alternative if creatinine rises > 26 µmol/L in 48 h.",
    label: "Class rule: nephrotoxicity",
  },
  {
    tags: ["anticoagulant", "bleeding-risk"],
    severity: "major",
    effect: "Increased bleeding risk",
    detail:
      "Additive impairment of haemostasis — platelet dysfunction plus anticoagulation raises major and intracranial bleeding rates.",
    action:
      "Review the indication daily, check FBC and anti-Xa/APTT ratio as appropriate, and hold anticoagulation around invasive procedures per local guidance.",
    label: "Class rule: bleeding",
  },
  {
    tags: ["anticoagulant", "prothrombotic"],
    severity: "moderate",
    effect: "Opposing effects on haemostasis",
    detail:
      "One drug promotes clotting or reverses anticoagulation while the other anticoagulates — thrombotic complications follow rapid reversal, and rebound bleeding follows re-anticoagulation.",
    action:
      "Be explicit about the intent (bleeding vs thrombosis), document a restart plan, and involve haematology for reversal agents.",
    label: "Class rule: haemostatic conflict",
  },
  {
    tags: ["hyperkalaemia", "hyperkalaemia"],
    sameTag: true,
    severity: "major",
    effect: "Additive hyperkalaemia",
    detail:
      "Combined potassium retention or release can cause life-threatening hyperkalaemia, particularly in AKI, rhabdomyolysis and burns.",
    action:
      "Check K⁺ at least 12-hourly (more often in AKI), stop supplemental potassium, and treat K⁺ > 6.0 mmol/L or any ECG change immediately.",
    label: "Class rule: potassium",
  },
  {
    tags: ["hypokalaemia", "hypokalaemia"],
    sameTag: true,
    severity: "moderate",
    effect: "Additive hypokalaemia and hypomagnesaemia",
    detail:
      "Intracellular shift and renal loss lower K⁺ and Mg²⁺, which in turn promotes arrhythmia and digoxin toxicity.",
    action: "Monitor K⁺ and Mg²⁺ at least daily and replace to K⁺ > 4.0 mmol/L, Mg²⁺ > 1.0 mmol/L.",
    label: "Class rule: potassium loss",
  },
  {
    tags: ["hypokalaemia", "hypokalaemia-sensitive"],
    severity: "major",
    effect: "Hypokalaemia potentiates digoxin toxicity",
    detail:
      "Low potassium increases digoxin binding to Na⁺/K⁺-ATPase, so toxicity (nausea, visual change, bradyarrhythmia, ventricular ectopy) occurs at apparently therapeutic levels.",
    action: "Keep K⁺ > 4.0 mmol/L and Mg²⁺ > 1.0 mmol/L; check a digoxin level if any new arrhythmia appears.",
    label: "Class rule: digoxin and potassium",
  },
  {
    tags: ["nmb-potentiating", "neuromuscular-blocker"],
    severity: "moderate",
    effect: "Prolonged neuromuscular blockade",
    detail:
      "Magnesium, aminoglycosides and hypothermia potentiate non-depolarising blockade, delaying recovery and risking awareness if sedation is lightened.",
    action:
      "Use train-of-four monitoring, reduce the blocker dose, and confirm recovery before extubation. Sugammadex reverses rocuronium if urgent reversal is required.",
    label: "Class rule: neuromuscular blockade",
  },
  {
    tags: ["cyp3a4-inhibitor", "cyp3a4-substrate"],
    severity: "moderate",
    effect: "CYP3A4 inhibition raises substrate levels",
    detail:
      "Clearance of the substrate falls, so sedation, hypotension or toxicity accumulate over days rather than hours (amiodarone plus midazolam or nimodipine is typical).",
    action: "Reduce the substrate dose by roughly a third, titrate to effect, and anticipate delayed offset after stopping.",
    label: "Class rule: CYP3A4",
  },
  {
    tags: ["cyp-inducer", "cyp3a4-substrate"],
    severity: "moderate",
    effect: "Enzyme induction lowers substrate levels",
    detail:
      "Phenytoin induces CYP3A4 over 3–7 days, causing loss of effect of midazolam, fentanyl, nimodipine and many antimicrobials; offset is equally slow.",
    action: "Expect escalating dose requirements, monitor the clinical endpoint, and re-titrate down when the inducer stops.",
    label: "Class rule: enzyme induction",
  },
  {
    tags: ["cyp-inducer", "narrow-therapeutic-index"],
    severity: "major",
    effect: "Induction destabilises a narrow-index drug",
    detail: "Unpredictable loss of therapeutic level for drugs where small changes matter (phenytoin, digoxin, vancomycin).",
    action: "Take levels earlier and more often, and involve pharmacy in dose adjustment.",
    label: "Class rule: narrow therapeutic index",
  },
  {
    tags: ["catecholamine", "arrhythmogenic"],
    severity: "moderate",
    effect: "Increased arrhythmia risk",
    detail:
      "Catecholamines lower the arrhythmia threshold; combined with another proarrhythmic drug, atrial fibrillation and ventricular ectopy are common.",
    action:
      "Continuous ECG, correct K⁺/Mg²⁺, use the lowest effective vasoactive dose and reconsider mechanical/fluid causes of the low output state.",
    label: "Class rule: arrhythmia",
  },
  {
    tags: ["beta-blocker", "catecholamine"],
    severity: "major",
    effect: "Pharmacological antagonism",
    detail:
      "β-blockade blunts the inotropic and chronotropic response to catecholamines, so escalating vasopressor doses achieve little and unopposed α-effects worsen afterload.",
    action:
      "Justify the combination explicitly (e.g. rate control in septic tachycardia), monitor cardiac output, and consider milrinone or levosimendan if inotropy is needed despite β-blockade.",
    label: "Class rule: adrenergic antagonism",
  },
  {
    tags: ["hypoglycaemia-risk", "hypoglycaemia-masking"],
    severity: "moderate",
    effect: "Masked hypoglycaemia",
    detail: "β-blockade removes the adrenergic warning signs of insulin-induced hypoglycaemia in a sedated patient.",
    action: "Hourly capillary glucose while insulin is titrated; treat glucose < 4.0 mmol/L promptly.",
    label: "Class rule: glucose",
  },
  {
    tags: ["hyperglycaemia", "hypoglycaemia-risk"],
    severity: "moderate",
    effect: "Fluctuating glycaemic control",
    detail: "Steroid or catecholamine-driven hyperglycaemia increases insulin requirements, which fall abruptly when they are weaned.",
    action: "Hourly to 2-hourly glucose, target 6–10 mmol/L, and reduce insulin proactively as the steroid or catecholamine is reduced.",
    label: "Class rule: glucose",
  },
  {
    tags: ["seizure-threshold-lowering", "anticonvulsant"],
    severity: "moderate",
    effect: "Reduced seizure control",
    detail: "Carbapenems lower the seizure threshold and (with valproate) drop anticonvulsant levels sharply.",
    action: "Renally dose the carbapenem, watch for breakthrough seizures, and avoid meropenem with valproate altogether.",
    label: "Class rule: seizure threshold",
  },
  {
    tags: ["renally-cleared", "nephrotoxic"],
    severity: "moderate",
    effect: "Accumulation as renal function falls",
    detail: "Nephrotoxic injury reduces clearance of the co-prescribed renally eliminated drug, causing accumulation and toxicity.",
    action: "Recalculate the dose against the current eGFR/CRRT prescription daily and take levels where available.",
    label: "Class rule: renal clearance",
  },
  {
    tags: ["extravasation-risk", "extravasation-risk"],
    sameTag: true,
    severity: "moderate",
    effect: "Shared line and extravasation hazard",
    detail:
      "Both agents cause tissue injury if they extravasate, and co-infusion through one lumen risks bolusing a vasoactive drug.",
    action:
      "Dedicated central lumen per vasoactive drug where possible, hourly site checks, and a documented extravasation plan (phentolamine for catecholamines).",
    label: "Class rule: line safety",
  },
  {
    tags: ["calcium-load", "calcium-incompatible"],
    severity: "avoid",
    effect: "Physical incompatibility — calcium precipitation",
    detail:
      "Ceftriaxone and calcium salts form insoluble precipitates; fatal pulmonary and renal precipitation has been reported in neonates.",
    action: "Never co-infuse. Use separate lines, or flush thoroughly and separate administration in time; avoid entirely in neonates.",
    label: "Named incompatibility",
  },
  {
    tags: ["calcium-load", "anticoagulant"],
    severity: "moderate",
    effect: "Calcium and citrate interplay",
    detail:
      "Regional citrate anticoagulation chelates calcium; systemic calcium replacement is part of the circuit prescription, and errors cause severe hypo- or hypercalcaemia.",
    action: "Follow the citrate protocol: post-filter ionised Ca²⁺ 0.25–0.35 mmol/L, systemic ionised Ca²⁺ 1.1–1.3 mmol/L, and watch the total:ionised ratio > 2.5 for citrate accumulation.",
    label: "Class rule: citrate and calcium",
  },
  {
    tags: ["immunosuppressant", "antimicrobial"],
    severity: "moderate",
    effect: "Masked and opportunistic infection",
    detail: "Steroids blunt fever and inflammatory markers, delaying recognition of failing antimicrobial therapy and of fungal or PCP infection.",
    action: "Track a trend of cultures, CRP and clinical state rather than temperature alone; consider PCP prophylaxis with prolonged steroid exposure.",
    label: "Class rule: immunosuppression",
  },
  {
    tags: ["myelosuppressive", "immunosuppressant"],
    severity: "moderate",
    effect: "Additive marrow and immune suppression",
    detail: "Cytopenias develop over days, increasing infection and bleeding risk.",
    action: "FBC at least alternate days; stop or substitute if neutrophils < 1.0 × 10⁹/L or platelets fall rapidly.",
    label: "Class rule: marrow suppression",
  },
  {
    tags: ["serotonergic", "serotonergic"],
    sameTag: true,
    severity: "major",
    effect: "Serotonin toxicity risk",
    detail: "Agitation, clonus, hyperreflexia, hyperthermia and autonomic instability can be mistaken for sepsis or withdrawal in ICU.",
    action: "Review all serotonergic drugs including home SSRIs, linezolid and methylene blue; stop the least essential and treat supportively with benzodiazepines.",
    label: "Class rule: serotonin",
  },
  {
    tags: ["sodium-load", "hyponatraemia-risk"],
    severity: "moderate",
    effect: "Opposing sodium effects",
    detail: "Rapid sodium swings risk osmotic demyelination or rebound cerebral oedema.",
    action: "Check Na⁺ 4–6 hourly during active therapy and limit correction to 8–10 mmol/L in 24 h.",
    label: "Class rule: sodium",
  },
  {
    tags: ["pgp-inhibitor", "pgp-substrate"],
    severity: "major",
    effect: "P-glycoprotein inhibition raises digoxin levels",
    detail: "Amiodarone roughly doubles the digoxin concentration within a week, producing toxicity at an unchanged dose.",
    action: "Halve the digoxin dose when starting amiodarone, check a level at 5–7 days and monitor for bradyarrhythmia.",
    label: "Named pair mechanism",
  },
  {
    tags: ["delirium-risk", "dopamine-antagonist"],
    severity: "moderate",
    effect: "Delirium treated while a precipitant continues",
    detail: "Benzodiazepines are a leading precipitant of ICU delirium; adding an antipsychotic without weaning them treats the symptom, not the cause.",
    action: "Prioritise weaning the benzodiazepine (ABCDEF bundle) and use antipsychotics only for distressing agitation, with ECG monitoring.",
    label: "Class rule: delirium",
  },
  {
    tags: ["hypomagnesaemia", "qt-prolonging"],
    severity: "moderate",
    effect: "Electrolyte-driven QT risk",
    detail: "Proton pump inhibitor-associated hypomagnesaemia amplifies the arrhythmic risk of QT-prolonging drugs.",
    action: "Check Mg²⁺ at least twice weekly and replace to > 1.0 mmol/L; review PPI need daily.",
    label: "Class rule: magnesium",
  },
];

export interface NamedPair {
  a: string;
  b: string;
  severity: InteractionSeverity;
  effect: string;
  detail: string;
  action: string;
}

export const icuDrugPairInteractions: NamedPair[] = [
  {
    a: "piperacillin-tazobactam",
    b: "vancomycin",
    severity: "major",
    effect: "Marked increase in AKI",
    detail:
      "The combination is associated with a several-fold higher incidence of acute kidney injury than either drug alone or vancomycin with meropenem, and the injury is often non-oliguric and picked up only on daily creatinine.",
    action:
      "Prefer meropenem or a cephalosporin with vancomycin when both are needed beyond 48–72 h. Use AUC-guided vancomycin dosing, daily creatinine and urine output, and avoid other nephrotoxins.",
  },
  {
    a: "amiodarone",
    b: "digoxin",
    severity: "major",
    effect: "Digoxin toxicity",
    detail:
      "P-glycoprotein and renal clearance inhibition roughly doubles digoxin levels within a week; bradycardia, nausea and ventricular ectopy follow at an unchanged dose.",
    action: "Halve the digoxin dose when amiodarone starts, level at 5–7 days, keep K⁺ > 4.0 mmol/L.",
  },
  {
    a: "amiodarone",
    b: "esmolol",
    severity: "major",
    effect: "Profound bradycardia and hypotension",
    detail: "Additive negative chronotropy plus vasodilatation from the amiodarone solvent can cause junctional rhythm, AV block or asystole.",
    action: "Load amiodarone slowly through a central line, use esmolol's short half-life to titrate, and have atropine and pacing immediately available.",
  },
  {
    a: "haloperidol",
    b: "amiodarone",
    severity: "avoid",
    effect: "High torsade risk",
    detail: "Two potent QT-prolonging drugs in a patient who often also has hypokalaemia, bradycardia and renal failure.",
    action: "Avoid the combination; if unavoidable use the lowest haloperidol dose with continuous ECG, QTc daily and aggressive electrolyte replacement.",
  },
  {
    a: "haloperidol",
    b: "co-trimoxazole",
    severity: "major",
    effect: "Additive QT prolongation",
    detail: "High-dose co-trimoxazole prolongs the QT and causes hyperkalaemia, both of which raise arrhythmia risk with haloperidol.",
    action: "ECG before and during therapy, keep K⁺ 4.0–5.0 mmol/L, consider an alternative antipsychotic strategy (dexmedetomidine, non-pharmacological measures).",
  },
  {
    a: "ceftriaxone",
    b: "calcium-gluconate",
    severity: "avoid",
    effect: "Calcium–ceftriaxone precipitation",
    detail: "Insoluble calcium–ceftriaxone salts have caused fatal pulmonary and renal precipitation, particularly in neonates.",
    action: "Never give through the same line or at the same time; use a different cephalosporin in neonates needing calcium.",
  },
  {
    a: "meropenem",
    b: "levetiracetam",
    severity: "moderate",
    effect: "Reduced seizure control",
    detail:
      "Carbapenems lower the seizure threshold, particularly when renally under-dosed; breakthrough seizures may be misread as failure of the anticonvulsant. (With valproate the interaction is severe and the combination is contraindicated.)",
    action: "Renally dose the meropenem, maintain the anticonvulsant, and consider EEG if consciousness is unexplained.",
  },
  {
    a: "phenytoin",
    b: "midazolam",
    severity: "major",
    effect: "Loss of sedative effect",
    detail: "CYP3A4 induction over 3–7 days sharply increases midazolam requirement; when phenytoin stops, the same rate becomes an overdose.",
    action: "Titrate to RASS, expect rising then falling requirements, and consider propofol or dexmedetomidine as the primary sedative instead.",
  },
  {
    a: "phenytoin",
    b: "noradrenaline",
    severity: "moderate",
    effect: "Loading-related hypotension",
    detail: "Rapid phenytoin loading causes hypotension and bradyarrhythmia from the propylene glycol vehicle, increasing vasopressor requirement.",
    action: "Infuse at no more than 50 mg/min (25 mg/min if elderly or cardiac disease) with continuous ECG and arterial pressure monitoring.",
  },
  {
    a: "suxamethonium",
    b: "potassium-chloride",
    severity: "avoid",
    effect: "Dangerous hyperkalaemia",
    detail: "Suxamethonium raises K⁺ by ~0.5 mmol/L normally and far more with burns, denervation, prolonged immobility or existing hyperkalaemia.",
    action: "Use rocuronium instead. Check K⁺ before any rapid sequence induction in ICU and stop potassium infusions first.",
  },
  {
    a: "suxamethonium",
    b: "magnesium-sulfate",
    severity: "moderate",
    effect: "Altered block characteristics",
    detail: "Magnesium attenuates the fasciculations but potentiates any subsequent non-depolarising block, prolonging paralysis.",
    action: "Use train-of-four monitoring and anticipate delayed recovery; keep sedation adequate.",
  },
  {
    a: "magnesium-sulfate",
    b: "rocuronium",
    severity: "moderate",
    effect: "Prolonged neuromuscular blockade",
    detail: "Magnesium reduces presynaptic acetylcholine release and potentiates non-depolarising blockade, delaying recovery unpredictably.",
    action: "Reduce the rocuronium dose, monitor train-of-four, and confirm full reversal (or use sugammadex) before extubation.",
  },
  {
    a: "insulin",
    b: "hydrocortisone",
    severity: "moderate",
    effect: "Steroid-driven hyperglycaemia",
    detail: "Hydrocortisone raises insulin requirement substantially; requirements fall abruptly when it is stopped, risking hypoglycaemia.",
    action: "Hourly to 2-hourly glucose while titrating, target 6–10 mmol/L, and cut the insulin rate proactively as steroids are weaned.",
  },
  {
    a: "insulin",
    b: "esmolol",
    severity: "moderate",
    effect: "Masked hypoglycaemia",
    detail: "β-blockade removes tachycardia and tremor as warning signs in a sedated patient.",
    action: "Hourly capillary glucose, treat < 4.0 mmol/L immediately, and review the insulin protocol.",
  },
  {
    a: "enoxaparin",
    b: "unfractionated-heparin",
    severity: "avoid",
    effect: "Duplicate anticoagulation",
    detail: "Overlapping therapeutic heparins substantially increase major bleeding with no additional benefit.",
    action: "Prescribe one agent only; when converting, stop the LMWH and start the infusion at the time the next LMWH dose would have been due.",
  },
  {
    a: "enoxaparin",
    b: "prothrombin-complex-concentrate",
    severity: "moderate",
    effect: "Incomplete reversal plus thrombotic risk",
    detail: "PCC does not reverse LMWH (protamine is only partly effective) and adds a thrombotic burden in a patient who was anticoagulated for a reason.",
    action: "Use protamine for LMWH with haematology advice; reserve PCC for vitamin K antagonists or factor Xa inhibitor bleeding per protocol.",
  },
  {
    a: "unfractionated-heparin",
    b: "regional-citrate-anticoagulation",
    severity: "moderate",
    effect: "Double circuit anticoagulation",
    detail: "Systemic heparin plus regional citrate raises bleeding risk without improving filter life.",
    action: "Choose one strategy per circuit; use citrate where bleeding risk is high and reserve heparin for citrate intolerance or accumulation.",
  },
  {
    a: "regional-citrate-anticoagulation",
    b: "calcium-gluconate",
    severity: "moderate",
    effect: "Calcium balance is part of the prescription",
    detail: "Citrate chelates ionised calcium; the systemic calcium infusion must be titrated separately from the circuit, and citrate accumulation in liver failure causes a rising total:ionised calcium ratio with metabolic acidosis.",
    action: "Post-filter ionised Ca²⁺ 0.25–0.35 mmol/L, systemic 1.1–1.3 mmol/L, total:ionised ratio < 2.5; stop citrate if the ratio rises.",
  },
  {
    a: "noradrenaline",
    b: "vasopressin",
    severity: "moderate",
    effect: "Intended synergy with digital and splanchnic ischaemia risk",
    detail: "Adding vasopressin is catecholamine-sparing, but combined intense vasoconstriction risks digital, mesenteric and cardiac ischaemia.",
    action: "Fixed vasopressin dose (usually 0.03 units/min), review perfusion, lactate, abdominal signs and digits, and wean vasopressin last.",
  },
  {
    a: "dobutamine",
    b: "esmolol",
    severity: "major",
    effect: "Direct antagonism",
    detail: "β-blockade abolishes dobutamine's inotropy, so cardiac output falls despite escalating doses.",
    action: "Decide the therapeutic goal; if inotropy is essential despite β-blockade use milrinone or levosimendan, and monitor cardiac output objectively.",
  },
  {
    a: "milrinone",
    b: "noradrenaline",
    severity: "moderate",
    effect: "Vasodilatation offset by vasoconstriction",
    detail: "Milrinone's inodilatation frequently requires added noradrenaline; hypotension is worse in renal failure because milrinone accumulates.",
    action: "Reduce the milrinone dose in AKI, monitor cardiac output and platelets, and titrate noradrenaline to MAP target.",
  },
  {
    a: "propofol",
    b: "adrenaline",
    severity: "moderate",
    effect: "PRIS risk and masked cardiovascular depression",
    detail: "Catecholamine plus high-dose propofol infusions increase propofol-related infusion syndrome risk, while the vasopressor hides the underlying propofol-induced cardiovascular depression.",
    action: "Cap propofol at 4 mg/kg/h, add an alternative sedative, and check lactate, CK, triglycerides and ECG at least every 48 h.",
  },
  {
    a: "propofol",
    b: "fentanyl",
    severity: "moderate",
    effect: "Synergistic sedation and hypotension",
    detail: "Marked pharmacodynamic synergy lowers the propofol requirement but deepens hypotension and prolongs ventilation if both are run high.",
    action: "Use analgesia-first sedation, target RASS, and reduce the propofol rate rather than adding vasopressor.",
  },
  {
    a: "dexmedetomidine",
    b: "clonidine",
    severity: "major",
    effect: "Duplicate α2-agonism",
    detail: "Additive bradycardia and hypotension with no added sedative benefit; abrupt withdrawal of either causes rebound hypertension.",
    action: "Use one α2-agonist; when transitioning to clonidine for weaning, taper the dexmedetomidine and monitor heart rate and blood pressure.",
  },
  {
    a: "dexmedetomidine",
    b: "esmolol",
    severity: "major",
    effect: "Severe bradycardia",
    detail: "Central sympatholysis plus β-blockade can cause sinus arrest, particularly during a dexmedetomidine loading dose.",
    action: "Avoid loading doses, monitor ECG continuously, stop dexmedetomidine for heart rate < 45/min, and keep atropine available.",
  },
  {
    a: "vancomycin",
    b: "aciclovir",
    severity: "major",
    effect: "Additive nephrotoxicity",
    detail: "Both are renally cleared nephrotoxins; AKI then raises both drug levels, compounding nephro- and neurotoxicity.",
    action: "Pre-hydrate, dose aciclovir on ideal body weight, use AUC-guided vancomycin, and check creatinine daily.",
  },
  {
    a: "co-trimoxazole",
    b: "enoxaparin",
    severity: "moderate",
    effect: "Hyperkalaemia and bleeding",
    detail: "Both raise potassium (trimethoprim blocks the distal tubule ENaC; heparins suppress aldosterone), and co-trimoxazole potentiates warfarin-type anticoagulation.",
    action: "Check K⁺ every 12–24 h and monitor FBC; adjust or substitute if K⁺ > 5.5 mmol/L.",
  },
  {
    a: "mannitol",
    b: "hypertonic-saline",
    severity: "moderate",
    effect: "Competing osmotherapies",
    detail: "Sequential osmotherapy makes osmolar gap, sodium and volume status hard to interpret, and mannitol's diuresis can cause hypovolaemia while saline expands volume.",
    action: "Pick one first-line agent, monitor Na⁺, osmolality and osmolar gap; hold mannitol if osmolality > 320 mosmol/kg or Na⁺ > 155 mmol/L.",
  },
  {
    a: "nimodipine",
    b: "noradrenaline",
    severity: "moderate",
    effect: "Nimodipine-induced hypotension",
    detail: "Nimodipine reduces MAP and can compromise cerebral perfusion after subarachnoid haemorrhage, commonly requiring vasopressor support.",
    action: "Never stop nimodipine for hypotension without discussion — split the dose (30 mg 2-hourly) and support MAP with noradrenaline to the target CPP.",
  },
  {
    a: "terlipressin",
    b: "noradrenaline",
    severity: "moderate",
    effect: "Additive ischaemia risk",
    detail: "Combined splanchnic and systemic vasoconstriction risks bowel, skin and digital ischaemia; terlipressin also causes hyponatraemia.",
    action: "Monitor lactate, abdominal signs, digits and Na⁺ (at least daily); stop terlipressin for any ischaemic complication.",
  },
  {
    a: "proton-pump-inhibitors",
    b: "haloperidol",
    severity: "moderate",
    effect: "PPI hypomagnesaemia raises torsade risk",
    detail: "Prolonged PPI therapy lowers magnesium, amplifying QT prolongation.",
    action: "Check Mg²⁺ twice weekly and replace to > 1.0 mmol/L; review whether stress-ulcer prophylaxis is still indicated.",
  },
  {
    a: "n-acetylcysteine",
    b: "noradrenaline",
    severity: "moderate",
    effect: "Infusion-related hypotension",
    detail: "NAC causes histaminoid reactions with flushing, bronchospasm and hypotension, most often during the first hour.",
    action: "Slow or pause the infusion and treat with antihistamine rather than abandoning treatment; restart at a lower rate.",
  },
  {
    a: "tranexamic-acid",
    b: "unfractionated-heparin",
    severity: "moderate",
    effect: "Opposing haemostatic aims",
    detail: "Antifibrinolysis alongside anticoagulation is occasionally deliberate but increases thrombotic risk if the indication is not clear.",
    action: "Document why both are running, review daily, and stop tranexamic acid once bleeding is controlled (usually within 24 h).",
  },
  {
    a: "morphine",
    b: "midazolam",
    severity: "moderate",
    effect: "Accumulation in renal failure and delirium",
    detail: "Morphine-6-glucuronide and 1-hydroxymidazolam glucuronide both accumulate in AKI, prolonging sedation for days and driving delirium.",
    action: "Prefer fentanyl/alfentanil plus propofol in renal failure; if used, give intermittent doses, interrupt daily and screen with CAM-ICU.",
  },
  {
    a: "fentanyl",
    b: "amiodarone",
    severity: "moderate",
    effect: "CYP3A4 inhibition plus bradycardia",
    detail: "Amiodarone raises fentanyl levels and both are bradycardic; profound bradycardia and hypotension have been reported.",
    action: "Reduce the fentanyl rate, monitor ECG, and be prepared to treat bradycardia.",
  },
  {
    a: "ketamine",
    b: "noradrenaline",
    severity: "moderate",
    effect: "Blunted sympathomimetic effect",
    detail: "Ketamine's indirect sympathomimetic action depends on catecholamine reserves; in prolonged shock its direct negative inotropy can dominate.",
    action: "Titrate carefully in catecholamine-depleted patients and monitor cardiac output rather than assuming haemodynamic stability.",
  },
  {
    a: "levetiracetam",
    b: "phenytoin",
    severity: "moderate",
    effect: "Overlapping anticonvulsants",
    detail: "Dual therapy is common in status epilepticus but adds phenytoin's hypotension, arrhythmia and narrow therapeutic index to levetiracetam's sedation.",
    action: "Confirm seizure control with EEG where possible, take phenytoin levels (albumin-corrected) and rationalise to one agent as soon as safe.",
  },
];

/** All selectable drugs, flattened from the safety dataset by the page. */
export function findInteractions(
  slugA: string,
  slugB: string,
): InteractionFinding[] {
  if (!slugA || !slugB || slugA === slugB) return [];
  const findings: InteractionFinding[] = [];

  for (const pair of icuDrugPairInteractions) {
    const match =
      (pair.a === slugA && pair.b === slugB) || (pair.a === slugB && pair.b === slugA);
    if (match) {
      findings.push({
        severity: pair.severity,
        effect: pair.effect,
        detail: pair.detail,
        action: pair.action,
        basis: "Named drug-pair interaction",
      });
    }
  }

  const tagsA = icuDrugInteractionTags[slugA] ?? [];
  const tagsB = icuDrugInteractionTags[slugB] ?? [];

  for (const rule of icuInteractionClassRules) {
    const [t1, t2] = rule.tags;
    const hit = rule.sameTag
      ? tagsA.includes(t1) && tagsB.includes(t1)
      : (tagsA.includes(t1) && tagsB.includes(t2)) || (tagsB.includes(t1) && tagsA.includes(t2));
    if (!hit) continue;
    if (findings.some((f) => f.effect === rule.effect)) continue;
    findings.push({
      severity: rule.severity,
      effect: rule.effect,
      detail: rule.detail,
      action: rule.action,
      basis: rule.label,
    });
  }

  const order: Record<InteractionSeverity, number> = { avoid: 0, major: 1, moderate: 2 };
  return findings.sort((x, y) => order[x.severity] - order[y.severity]);
}

export const severityLabel: Record<InteractionSeverity, string> = {
  avoid: "Avoid combination",
  major: "Major",
  moderate: "Moderate",
};

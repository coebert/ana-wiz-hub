export interface DrugSafety {
  /** Matches the `drug` field in icuDrugDoses.ts / icuDrugMechanisms.ts. */
  drug: string;
  /** Matches the slug used on the drug mechanisms page. */
  slug: string;
  /** Clinically important drug–drug and drug–disease interactions. */
  interactions: string[];
  /** Absolute contraindications and major cautions. */
  contraindications: string[];
  /** What to monitor, how often, and the action thresholds. */
  monitoring: string[];
  /** Single most important safety message ("never event" territory). */
  alert?: string;
}

export interface DrugSafetyGroup {
  /** Matches the group id used in icuDrugDoses.ts. */
  id: string;
  title: string;
  blurb: string;
  drugs: DrugSafety[];
}

/**
 * Interactions, contraindications and monitoring for the adult ICU formulary
 * mirrored in icuDrugDoses.ts and icuDrugMechanisms.ts. Revision aid only —
 * check the BNF, SPC and local critical care guidelines before prescribing.
 */
export const icuDrugSafetyGroups: DrugSafetyGroup[] = [
  {
    id: "sedation-analgesia",
    title: "Sedation, analgesia and delirium",
    blurb:
      "Additive respiratory and cardiovascular depression is the dominant interaction; accumulation and withdrawal are the dominant monitoring problems.",
    drugs: [
      {
        drug: "Propofol 1–2%",
        slug: "propofol",
        interactions: [
          "Additive hypotension with opioids, benzodiazepines, β-blockers, ACE inhibitors and vasodilators — reduce the rate rather than adding vasopressor blindly.",
          "Catecholamine and corticosteroid co-administration increases the risk of propofol-related infusion syndrome (PRIS).",
          "Lipid load interacts with parenteral nutrition and other lipid emulsions: count 1.1 kcal/mL towards the daily energy and triglyceride burden.",
        ],
        contraindications: [
          "Known egg, soya or peanut anaphylaxis (relative — modern formulations use purified lecithin, but avoid if a true reaction is documented).",
          "Not licensed for sedation of children in intensive care.",
          "Avoid as a sole sedative in haemodynamic instability, severe aortic stenosis or fixed cardiac output states.",
          "Disordered fat metabolism, familial hypertriglyceridaemia and pancreatitis with hypertriglyceridaemia.",
        ],
        monitoring: [
          "Sedation score (RASS/SAS) hourly with daily sedation interruption where safe.",
          "Rate ceiling 4 mg/kg/h; review the cumulative dose and total lipid daily.",
          "Lactate, creatine kinase, triglycerides, potassium, ECG and liver function at least every 48 h — new bradyarrhythmia with rising lactate is PRIS until proved otherwise.",
          "Change lines and syringes 12-hourly (bacterial growth in the emulsion).",
        ],
        alert:
          "Bradyarrhythmia plus metabolic acidosis on a propofol infusion means stop the propofol — do not simply increase the vasopressor.",
      },
      {
        drug: "Fentanyl",
        slug: "fentanyl",
        interactions: [
          "CYP3A4 inhibitors (fluconazole, clarithromycin, ritonavir, amiodarone) reduce clearance and prolong sedation; rifampicin and phenytoin accelerate it.",
          "Additive respiratory depression and delirium risk with benzodiazepines, propofol and gabapentinoids.",
          "MAOIs — risk of severe reactions; serotonergic drugs (linezolid, SSRIs) can precipitate serotonin toxicity.",
        ],
        contraindications: [
          "Untreated airway obstruction or unsupported respiratory failure outside a monitored setting.",
          "Caution in shock, hepatic impairment, obesity and prolonged infusions (context-sensitive half-time lengthens markedly).",
        ],
        monitoring: [
          "Pain score plus RASS; assess adequacy of analgesia before escalating sedation.",
          "Respiratory rate, capnography and pupil size in the non-ventilated patient.",
          "Bowel function and ileus daily; start laxatives with the infusion.",
          "Score for iatrogenic withdrawal after >5–7 days and wean by 10–20% per day.",
        ],
      },
      {
        drug: "Morphine",
        slug: "morphine",
        interactions: [
          "Additive sedation and respiratory depression with benzodiazepines, propofol and antipsychotics.",
          "Gabapentinoids raise the risk of respiratory depression; MAOIs are contraindicated within 14 days.",
        ],
        contraindications: [
          "Renal impairment — morphine-6-glucuronide accumulates and causes prolonged narcosis; use fentanyl or alfentanil instead.",
          "Acute severe asthma (histamine release) and paralytic ileus.",
          "Raised ICP where hypercapnia is unacceptable, unless ventilated.",
        ],
        monitoring: [
          "Sedation and respiratory rate; pupils and conscious level in renal failure.",
          "Renal function — reduce dose or change opioid as creatinine rises.",
          "Cumulative 24 h dose, bowel function and withdrawal scores on prolonged use.",
        ],
      },
      {
        drug: "Alfentanil",
        slug: "alfentanil",
        interactions: [
          "CYP3A4 inhibitors markedly prolong the effect; erythromycin is a classic example.",
          "Additive hypotension and bradycardia with propofol and β-blockers.",
        ],
        contraindications: [
          "Unmonitored spontaneous ventilation — apnoea occurs rapidly after a bolus.",
          "Caution in hepatic failure (clearance falls) and with chest-wall rigidity risk during rapid boluses.",
        ],
        monitoring: [
          "Continuous respiratory and haemodynamic monitoring for boluses.",
          "Pain and sedation scores; suitable in renal failure (no active metabolites) so track effect rather than creatinine.",
        ],
      },
      {
        drug: "Midazolam",
        slug: "midazolam",
        interactions: [
          "CYP3A4 inhibitors (fluconazole, clarithromycin, diltiazem, ritonavir) can triple exposure; inducers (rifampicin, phenytoin) cause under-sedation.",
          "Profound synergy with opioids for respiratory depression and hypotension.",
          "Additive delirium risk with anticholinergics.",
        ],
        contraindications: [
          "Avoid where delirium risk is high, in the frail elderly, and as first-line sedation in patients expected to wean quickly.",
          "Renal failure — the active metabolite 1-hydroxymidazolam glucuronide accumulates and prolongs coma.",
          "Myasthenia gravis and untreated obstructive sleep apnoea (relative).",
        ],
        monitoring: [
          "RASS with daily interruption; expect delayed emergence after prolonged infusion.",
          "Delirium screening (CAM-ICU/ICDSC) at least once per shift.",
          "Withdrawal scores after >5 days; wean rather than stop.",
          "Flumazenil only with great caution — it can precipitate seizures in the benzodiazepine-dependent.",
        ],
      },
      {
        drug: "Dexmedetomidine",
        slug: "dexmedetomidine",
        interactions: [
          "Additive bradycardia and hypotension with β-blockers, digoxin, amiodarone, clonidine and neostigmine.",
          "Reduces the requirement for propofol, opioids and volatile agents — reduce co-sedation when starting.",
        ],
        contraindications: [
          "Second- or third-degree heart block and untreated bradycardia.",
          "Uncontrolled hypotension or severe ventricular dysfunction reliant on chronotropy.",
          "Not a substitute for anaesthesia or muscle relaxation; poor choice when deep sedation is essential.",
        ],
        monitoring: [
          "Continuous ECG and blood pressure — bradycardia and hypotension are dose-related; loading doses are usually omitted in ICU.",
          "RASS aiming for an arousable, cooperative patient.",
          "Watch for rebound hypertension and agitation if stopped abruptly after several days.",
        ],
      },
      {
        drug: "Clonidine",
        slug: "clonidine",
        interactions: [
          "Additive bradycardia and hypotension with β-blockers, digoxin and dexmedetomidine.",
          "Tricyclics and other α-antagonists blunt its effect.",
        ],
        contraindications: [
          "Severe bradyarrhythmia or sinoatrial disease.",
          "Caution in significant hypotension and in the elderly (sedation, falls).",
        ],
        monitoring: [
          "Heart rate and blood pressure after each dose increase.",
          "Never stop abruptly after prolonged use — rebound hypertension and tachycardia; wean over days.",
          "Sedation and withdrawal scores when used to facilitate opioid or benzodiazepine weaning.",
        ],
      },
      {
        drug: "Ketamine",
        slug: "ketamine",
        interactions: [
          "Sympathomimetic effect is unmasked as catecholamine depletion develops in prolonged shock, when direct myocardial depression may dominate.",
          "Benzodiazepines reduce emergence phenomena; CYP3A4 inducers increase requirements.",
          "Additive hypertension and tachycardia with other sympathomimetics.",
        ],
        contraindications: [
          "Uncontrolled hypertension, severe ischaemic heart disease and aortic dissection.",
          "Caution in raised ICP if ventilation and PaCO₂ are not controlled, and in acute psychosis.",
          "Cystitis and cholangiopathy with prolonged high-dose use.",
        ],
        monitoring: [
          "Blood pressure, heart rate and secretions (antisialagogue may be needed).",
          "Emergence reactions, dysphoria and delirium screening.",
          "Liver function on infusions lasting more than a few days.",
        ],
      },
      {
        drug: "Haloperidol",
        slug: "haloperidol",
        interactions: [
          "QT prolongation is additive with amiodarone, macrolides, quinolones, ondansetron, methadone, azoles and citalopram.",
          "Antagonises the effect of levodopa and dopamine agonists.",
          "Additive extrapyramidal effects with metoclopramide and other antipsychotics.",
        ],
        contraindications: [
          "QTc >500 ms, previous torsade, or uncorrected hypokalaemia/hypomagnesaemia.",
          "Parkinson's disease, Lewy body dementia and neuroleptic malignant syndrome history.",
          "Not indicated for hypoactive delirium or as a sedative for agitation from pain, hypoxia or withdrawal.",
        ],
        monitoring: [
          "Baseline and daily ECG for QTc; stop if QTc >500 ms or rises by >60 ms.",
          "Potassium and magnesium — keep K⁺ >4.0 and Mg²⁺ >1.0 mmol/L.",
          "Extrapyramidal signs, rigidity and temperature (neuroleptic malignant syndrome).",
          "Review the indication daily and stop as soon as the delirium settles.",
        ],
      },
    ],
  },
  {
    id: "neuromuscular-blockade",
    title: "Neuromuscular blockade",
    blurb:
      "The commonest harm is a paralysed patient who is inadequately sedated, or a relaxant given without a secured airway.",
    drugs: [
      {
        drug: "Rocuronium",
        slug: "rocuronium",
        interactions: [
          "Potentiated by aminoglycosides, magnesium, hypothermia, respiratory acidosis, hypokalaemia and volatile agents.",
          "Antagonised by chronic phenytoin or carbamazepine (upregulated receptors) — larger doses may be needed.",
          "Sugammadex encapsulates it; it also binds some steroid hormones, so warn about hormonal contraception.",
        ],
        contraindications: [
          "No means of ventilating or intubating — never give without airway rescue equipment and a plan.",
          "Previous anaphylaxis to a neuromuscular blocker (cross-reactivity is common).",
          "Prolonged effect in hepatic dysfunction; caution in myasthenia gravis (profound sensitivity — use a fraction of the dose).",
        ],
        monitoring: [
          "Peripheral nerve stimulator: train-of-four count for infusions, post-tetanic count for deep block.",
          "Confirm adequate sedation and analgesia before and throughout paralysis, with a depth-of-anaesthesia monitor if available.",
          "Eye care, pressure area care and VTE prophylaxis while paralysed.",
          "Document reversal (train-of-four ratio >0.9) before extubation.",
        ],
        alert:
          "A paralysed patient cannot signal distress — never start a relaxant infusion without confirmed deep sedation.",
      },
      {
        drug: "Atracurium / cisatracurium",
        slug: "atracurium-cisatracurium",
        interactions: [
          "Potentiated by hypothermia, acidosis, magnesium, aminoglycosides and volatile agents.",
          "Hofmann elimination slows with hypothermia and acidosis, prolonging block.",
        ],
        contraindications: [
          "Previous anaphylaxis to a neuromuscular blocker.",
          "Atracurium causes histamine release — avoid boluses in severe asthma and haemodynamic instability (cisatracurium preferred).",
          "Not reversible with sugammadex.",
        ],
        monitoring: [
          "Train-of-four monitoring — organ-independent clearance makes it the drug of choice in renal and hepatic failure but block still needs measuring.",
          "Sedation depth throughout; laudanosine accumulation is a theoretical seizure risk in prolonged high-dose use with liver failure.",
        ],
      },
      {
        drug: "Suxamethonium",
        slug: "suxamethonium",
        interactions: [
          "Effect prolonged by anticholinesterases, neostigmine, magnesium, lithium and plasma cholinesterase deficiency.",
          "Repeat doses or co-administration with other vagotonic drugs cause bradycardia, especially in children.",
        ],
        contraindications: [
          "Hyperkalaemia, or risk of it: burns >24–48 h old, spinal cord injury, prolonged immobility, denervation, severe sepsis and critical illness myopathy.",
          "Personal or family history of malignant hyperthermia; Duchenne and other myopathies (rhabdomyolysis, cardiac arrest).",
          "Penetrating eye injury and raised intraocular pressure (relative); known plasma cholinesterase deficiency.",
        ],
        monitoring: [
          "Potassium before use in any at-risk patient; ECG for peaked T waves and bradyarrhythmia.",
          "Return of twitches / spontaneous ventilation; suspect cholinesterase deficiency if block outlasts 10–15 min and keep the patient ventilated and sedated.",
          "Temperature and end-tidal CO₂ for malignant hyperthermia; CK and myoglobin if rhabdomyolysis is suspected.",
        ],
        alert:
          "Cardiac arrest from suxamethonium-induced hyperkalaemia is a recurring ICU never-event in critical illness myopathy and >24 h burns — use rocuronium instead.",
      },
    ],
  },
  {
    id: "vasoactive",
    title: "Vasopressors and inotropes",
    blurb:
      "Route, dilution and extravasation dominate safety; every infusion needs an arterial line, a dedicated lumen and a stated target.",
    drugs: [
      {
        drug: "Noradrenaline",
        slug: "noradrenaline",
        interactions: [
          "Exaggerated pressor response with MAOIs, tricyclics, linezolid and after clonidine withdrawal — start low.",
          "β-blockade unmasks unopposed α effects (hypertension with bradycardia).",
          "Volatile agents and halothane sensitise the myocardium to arrhythmia.",
        ],
        contraindications: [
          "Uncorrected hypovolaemia as the sole treatment — fill and vasoconstrict together.",
          "Peripheral administration beyond short-term low-dose bridging; avoid in critical limb or mesenteric ischaemia where possible.",
        ],
        monitoring: [
          "Invasive arterial pressure with a defined MAP target (usually ≥65 mmHg; higher in chronic hypertension).",
          "Hourly urine output, lactate and peripheral perfusion; assess fluid responsiveness before escalating.",
          "Inspect the cannula site hourly — extravasation causes necrosis; treat with phentolamine or topical GTN.",
          "Never bolus, never flush the line, and label the syringe with the concentration.",
        ],
        alert: "Flushing a vasopressor line delivers a bolus and can cause severe hypertension or arrest.",
      },
      {
        drug: "Adrenaline",
        slug: "adrenaline",
        interactions: [
          "Non-selective β-blockade causes paradoxical hypertension; tricyclics and MAOIs exaggerate the pressor response.",
          "Additive arrhythmia risk with digoxin, theophylline and volatile agents.",
        ],
        contraindications: [
          "Relative in hypertrophic obstructive cardiomyopathy and severe tachyarrhythmia.",
          "1:1000 must never be given intravenously undiluted.",
        ],
        monitoring: [
          "ECG for tachyarrhythmia and ischaemia; arterial line for beat-to-beat pressure.",
          "Lactate (β₂-driven rise is common and is not necessarily hypoperfusion), glucose and potassium.",
          "Cannula site for extravasation; central administration for infusions.",
        ],
      },
      {
        drug: "Vasopressin",
        slug: "vasopressin",
        interactions: [
          "Additive vasoconstriction with noradrenaline (its main use as a catecholamine-sparing agent).",
          "Increases sensitivity to other coronary and mesenteric vasoconstrictors.",
        ],
        contraindications: [
          "Severe coronary, mesenteric or digital ischaemia.",
          "Not for use as a first-line single vasopressor in undifferentiated shock.",
        ],
        monitoring: [
          "MAP with a fixed non-titrated rate in most protocols; do not bolus.",
          "Digits, skin and splanchnic perfusion (ischaemia, hyponatraemia and skin necrosis).",
          "Sodium, bilirubin, platelet count and urine output.",
        ],
      },
      {
        drug: "Dobutamine",
        slug: "dobutamine",
        interactions: [
          "β-blockers blunt its inotropy; combined with vasodilators it can cause marked hypotension.",
          "Additive arrhythmia risk with digoxin, aminophylline and hypokalaemia.",
        ],
        contraindications: [
          "Dynamic outflow obstruction (HOCM, severe aortic stenosis).",
          "Uncorrected hypovolaemia and uncontrolled tachyarrhythmia.",
        ],
        monitoring: [
          "Cardiac output or echocardiographic response, not the dose alone.",
          "Heart rate and ECG — tachycardia and ischaemia limit the dose; potassium and magnesium.",
          "Tolerance develops after 48–72 h through receptor downregulation.",
        ],
      },
      {
        drug: "Milrinone",
        slug: "milrinone",
        interactions: [
          "Additive hypotension with vasodilators and any drug reducing preload; often needs a concurrent vasopressor.",
          "Effect is preserved during β-blockade (post-receptor mechanism) — a reason for its use.",
        ],
        contraindications: [
          "Severe hypotension, hypovolaemia and severe outflow obstruction.",
          "Significant renal impairment — clearance is renal, so reduce the dose and avoid loading.",
        ],
        monitoring: [
          "Blood pressure closely for 30–60 min after any loading dose (usually omitted in ICU).",
          "Renal function, platelet count and ECG (ventricular arrhythmia).",
          "Cardiac output and lactate to confirm benefit before continuing.",
        ],
      },
      {
        drug: "Metaraminol",
        slug: "metaraminol",
        interactions: [
          "Exaggerated response with MAOIs, tricyclics and after clonidine withdrawal.",
          "Reflex bradycardia is accentuated by β-blockers and digoxin.",
        ],
        contraindications: [
          "Peripheral, mesenteric or placental hypoperfusion states where α agonism is harmful.",
          "Not a substitute for volume resuscitation or for a definitive vasopressor in septic shock.",
        ],
        monitoring: [
          "Blood pressure and heart rate — expect reflex bradycardia; watch for reduced cardiac output in the failing ventricle.",
          "Infusion site (may be given peripherally) and urine output.",
        ],
      },
      {
        drug: "Hydrocortisone",
        slug: "hydrocortisone",
        interactions: [
          "Additive hyperglycaemia with catecholamines and enteral feed; increases insulin requirement.",
          "Enzyme inducers (rifampicin, phenytoin) reduce steroid effect; concurrent NSAIDs raise GI bleeding risk.",
          "Neuromuscular blockade plus steroids increases ICU-acquired weakness.",
        ],
        contraindications: [
          "Untreated systemic fungal infection; live vaccines.",
          "Caution in poorly controlled diabetes, active GI bleeding and immunosuppression.",
        ],
        monitoring: [
          "Capillary glucose 1–4 hourly initially; insulin protocol as needed.",
          "Sodium, potassium and fluid balance (mineralocorticoid effect).",
          "Signs of new or worsening infection; taper after prolonged courses to avoid adrenal insufficiency.",
        ],
      },
    ],
  },
  {
    id: "cardiac-rhythm",
    title: "Antiarrhythmics and cardiovascular drugs",
    blurb:
      "QT interval, electrolytes and negative inotropy are the recurring themes; most errors are additive AV nodal blockade.",
    drugs: [
      {
        drug: "Amiodarone",
        slug: "amiodarone",
        interactions: [
          "Inhibits CYP and P-glycoprotein: halve the digoxin dose, reduce warfarin, and expect raised phenytoin and statin levels (myopathy).",
          "Additive bradycardia and AV block with β-blockers, verapamil, diltiazem and dexmedetomidine.",
          "Additive QT prolongation with haloperidol, macrolides, quinolones and ondansetron.",
        ],
        contraindications: [
          "Sinoatrial disease, second- or third-degree block without pacing, and known torsade.",
          "Severe iodine allergy and thyrotoxicosis; caution in decompensated heart failure with the loading dose.",
          "Peripheral administration for anything beyond a single emergency dose (phlebitis) — use a central line.",
        ],
        monitoring: [
          "Continuous ECG during loading — hypotension and bradycardia occur if given too fast (loading dose over 20–60 min unless in arrest).",
          "Thyroid and liver function at baseline and every 6 months on chronic therapy; chest imaging for pulmonary toxicity.",
          "Potassium and magnesium; QTc before and after loading.",
        ],
      },
      {
        drug: "Magnesium sulfate",
        slug: "magnesium-sulfate",
        interactions: [
          "Potentiates all non-depolarising neuromuscular blockers — reduce the relaxant dose and monitor train-of-four.",
          "Additive hypotension with calcium channel blockers; additive bradycardia with β-blockers.",
        ],
        contraindications: [
          "Heart block, severe bradycardia and myasthenia gravis.",
          "Significant renal impairment — magnesium accumulates; reduce the dose and monitor levels.",
        ],
        monitoring: [
          "Deep tendon reflexes (loss is the first sign of toxicity), respiratory rate and conscious level.",
          "Serum magnesium in renal impairment or repeated dosing; ECG for widening QRS and block.",
          "Calcium gluconate immediately available as the antidote.",
        ],
      },
      {
        drug: "Digoxin",
        slug: "digoxin",
        interactions: [
          "Amiodarone, verapamil, diltiazem, macrolides, ciclosporin and quinine raise digoxin levels — halve the dose.",
          "Diuretic-induced hypokalaemia and hypomagnesaemia precipitate toxicity; hypercalcaemia worsens it.",
          "Additive AV block with β-blockers and calcium channel blockers.",
        ],
        contraindications: [
          "Ventricular tachyarrhythmia, complete heart block, Wolff–Parkinson–White with atrial fibrillation.",
          "Hypertrophic obstructive cardiomyopathy with outflow obstruction; suspected digoxin toxicity.",
        ],
        monitoring: [
          "Level 6 h or more after a dose (target 0.5–0.9 microgram/L in heart failure); renal function.",
          "Potassium, magnesium and calcium; ECG for bradycardia, bigeminy and reverse tick.",
          "Clinical toxicity — nausea, xanthopsia, confusion — treat with DigiFab, not with calcium.",
        ],
      },
      {
        drug: "Esmolol",
        slug: "esmolol",
        interactions: [
          "Additive negative inotropy and AV block with verapamil, diltiazem, digoxin and amiodarone.",
          "Blunts the tachycardic response to hypoglycaemia and to haemorrhage.",
          "Unopposed α effect if given with adrenaline or in cocaine toxicity.",
        ],
        contraindications: [
          "Cardiogenic shock, decompensated heart failure, second- or third-degree block, severe bradycardia.",
          "Severe asthma with bronchospasm; untreated phaeochromocytoma.",
        ],
        monitoring: [
          "Continuous ECG and arterial pressure — the short half-life (9 min) makes it titratable but hypotension is common.",
          "Glucose in diabetes; airway resistance in reversible airways disease.",
        ],
      },
      {
        drug: "Glyceryl trinitrate",
        slug: "glyceryl-trinitrate",
        interactions: [
          "Absolutely contraindicated with phosphodiesterase-5 inhibitors (sildenafil, tadalafil) — profound hypotension.",
          "Additive hypotension with other vasodilators, propofol and neuraxial blockade.",
        ],
        contraindications: [
          "Severe aortic stenosis, HOCM, tamponade and right ventricular infarction (preload dependence).",
          "Raised ICP (cerebral vasodilatation) and uncorrected hypovolaemia.",
        ],
        monitoring: [
          "Continuous blood pressure; tachyphylaxis develops within 24–48 h.",
          "Methaemoglobinaemia with prolonged high doses; headache and reflex tachycardia.",
        ],
      },
      {
        drug: "Labetalol",
        slug: "labetalol",
        interactions: [
          "Additive AV block and bradycardia with calcium channel blockers, digoxin and amiodarone.",
          "Masks hypoglycaemia; interacts with cocaine toxicity (avoid pure β-blockade).",
        ],
        contraindications: [
          "Asthma with active bronchospasm, cardiogenic shock, heart block and severe bradycardia.",
          "Untreated phaeochromocytoma without established α blockade.",
        ],
        monitoring: [
          "Blood pressure every 5 min during titration; avoid dropping MAP more than 20–25% in the first hour in hypertensive emergency or acute stroke.",
          "Heart rate, glucose and neurological status; fetal heart rate in pregnancy.",
        ],
      },
    ],
  },
  {
    id: "neuro",
    title: "Neurocritical care and seizures",
    blurb:
      "Sodium, osmolality and infusion rate are the safety-critical variables, alongside the many interactions of phenytoin.",
    drugs: [
      {
        drug: "Lorazepam",
        slug: "lorazepam",
        interactions: [
          "Additive respiratory depression with opioids and propofol; valproate raises free lorazepam.",
          "Additive delirium and withdrawal risk with other sedatives.",
        ],
        contraindications: [
          "Unprotected airway with no means of ventilation; severe respiratory failure without support.",
          "Caution in hepatic failure and in the elderly.",
        ],
        monitoring: [
          "Airway, respiratory rate and oxygenation after each dose — have airway equipment ready.",
          "Seizure termination; escalate to second-line therapy after two doses.",
          "Propylene glycol accumulation (osmolar gap, lactic acidosis) with repeated or infused doses.",
        ],
      },
      {
        drug: "Levetiracetam",
        slug: "levetiracetam",
        interactions: [
          "Few pharmacokinetic interactions — a major advantage in ICU; no significant CYP effects.",
          "Additive sedation with other antiepileptics; carbamazepine may increase neurotoxicity.",
        ],
        contraindications: [
          "Hypersensitivity to pyrrolidone derivatives.",
          "Caution with pre-existing psychiatric disease (agitation, psychosis) and in renal impairment (dose reduction).",
        ],
        monitoring: [
          "Renal function for dose adjustment; levels are rarely needed.",
          "Behavioural change, agitation and mood; full blood count occasionally (cytopenias).",
        ],
      },
      {
        drug: "Phenytoin",
        slug: "phenytoin",
        interactions: [
          "Potent CYP inducer — reduces the effect of warfarin (variable), midazolam, steroids, rocuronium, direct oral anticoagulants, antifungals and many antibiotics.",
          "Levels raised by fluconazole, omeprazole, amiodarone, isoniazid and metronidazole; enteral feed reduces oral absorption (hold feed 2 h either side).",
          "Additive arrhythmia with other sodium channel blockers.",
        ],
        contraindications: [
          "Sinoatrial or AV block, sinus bradycardia and Stokes–Adams attacks.",
          "Rapid IV infusion — never exceed 50 mg/min (25 mg/min in the elderly or cardiac disease).",
          "Extravasation risk: purple glove syndrome; hypersensitivity or previous DRESS.",
        ],
        monitoring: [
          "Continuous ECG and blood pressure during loading.",
          "Trough level (total 10–20 mg/L) with albumin — measure free phenytoin in hypoalbuminaemia, renal failure or critical illness.",
          "Full blood count, liver function and rash (Stevens–Johnson, DRESS); nystagmus and ataxia indicate toxicity.",
        ],
      },
      {
        drug: "Hypertonic saline 2.7–5%",
        slug: "hypertonic-saline",
        interactions: [
          "Additive sodium load with sodium bicarbonate, sodium-containing antibiotics and 0.9% saline maintenance.",
          "Reduces the effect of concurrent mannitol therapy and confuses osmolar targets if both are used.",
        ],
        contraindications: [
          "Serum sodium above the agreed ceiling (usually 155–160 mmol/L) or osmolality >320 mosmol/kg.",
          "Hyperchloraemic acidosis, congestive cardiac failure and pulmonary oedema (relative).",
          "Correcting chronic hyponatraemia faster than 8–10 mmol/L in 24 h — osmotic demyelination.",
        ],
        monitoring: [
          "Sodium and chloride 4–6 hourly during therapy (1–2 hourly when treating hyponatraemic seizures).",
          "Osmolality, acid–base status, fluid balance and ICP/CPP response.",
          "Central line preferred for concentrations above 3%; check the strength on the bag before every bolus.",
        ],
        alert: "Confusing 30% sodium chloride ampoules with a ready-made bolus bag is a recognised fatal error — always have the concentration checked by a second person.",
      },
      {
        drug: "Mannitol 20%",
        slug: "mannitol",
        interactions: [
          "Additive nephrotoxicity with NSAIDs, aminoglycosides, ciclosporin and contrast.",
          "Enhances renal loss of lithium, potassium and magnesium; masks hypovolaemia when combined with diuretics.",
        ],
        contraindications: [
          "Anuric established renal failure, severe hypovolaemia and decompensated heart failure.",
          "Serum osmolality >320 mosmol/kg or osmolar gap >10; active intracranial haemorrhage with disrupted blood–brain barrier (relative).",
        ],
        monitoring: [
          "Osmolality and osmolar gap before repeat doses; sodium, potassium and renal function.",
          "Hourly urine output and fluid balance — replace the diuresis to avoid rebound hypotension.",
          "ICP response and rebound rise; use a filter — crystals form in cold ampoules.",
        ],
      },
      {
        drug: "Nimodipine",
        slug: "nimodipine",
        interactions: [
          "CYP3A4 inhibitors (macrolides, azoles, ritonavir) raise levels and cause hypotension; grapefruit juice does the same enterally.",
          "Additive hypotension with propofol, other antihypertensives and vasodilators; enzyme inducers reduce efficacy.",
        ],
        contraindications: [
          "Significant hypotension — but the drug is not stopped in subarachnoid haemorrhage; reduce the dose and support the pressure instead.",
          "Never give the oral solution intravenously; IV formulation must run in polyethylene lines.",
        ],
        monitoring: [
          "Blood pressure and MAP/CPP continuously — dose reduce or split rather than omitting.",
          "Neurological examination for delayed cerebral ischaemia; liver function on prolonged therapy.",
          "Confirm the full 21-day course is prescribed after aneurysmal subarachnoid haemorrhage.",
        ],
      },
    ],
  },
  {
    id: "coagulation",
    title: "Haemostasis and anticoagulation",
    blurb:
      "Dose against renal function and weight, know the reversal agent, and document the indication and duration every day.",
    drugs: [
      {
        drug: "Tranexamic acid",
        slug: "tranexamic-acid",
        interactions: [
          "Additive thrombotic risk with prothrombin complex concentrate, factor concentrates and combined hormonal contraception.",
          "Do not mix in the same line as blood products.",
        ],
        contraindications: [
          "Active intravascular thrombosis, seizures (dose-related risk), and previous hypersensitivity.",
          "Subarachnoid haemorrhage with vasospasm risk (specialist decision); dose reduction in renal impairment.",
          "Traumatic haemorrhage more than 3 h after injury — mortality benefit is lost and harm is possible.",
        ],
        monitoring: [
          "Bleeding, transfusion requirement and any clinical thrombosis.",
          "Renal function for dose adjustment; seizure activity in high-dose cardiac surgery use.",
          "Never give intrathecally — accidental spinal administration is fatal.",
        ],
      },
      {
        drug: "Enoxaparin",
        slug: "enoxaparin",
        interactions: [
          "Additive bleeding with antiplatelets, NSAIDs, thrombolytics and direct oral anticoagulants.",
          "Potassium retention with ACE inhibitors and potassium-sparing diuretics (hyperkalaemia).",
        ],
        contraindications: [
          "Active major bleeding, platelets <50 ×10⁹/L, heparin-induced thrombocytopenia (current or historic).",
          "Neuraxial procedure within 12 h of a prophylactic dose or 24 h of a treatment dose.",
          "Severe renal impairment (eGFR <30) — reduce the dose or use unfractionated heparin.",
        ],
        monitoring: [
          "Full blood count including platelets (day 0 then every 2–3 days for HIT), renal function and weight-based dosing review.",
          "Anti-Xa levels in extremes of weight, pregnancy or renal impairment.",
          "Bleeding, haematoma at injection and neurological signs after neuraxial procedures.",
        ],
      },
      {
        drug: "Unfractionated heparin",
        slug: "unfractionated-heparin",
        interactions: [
          "Additive bleeding with antiplatelets, thrombolytics and NSAIDs; nitrate infusions may increase heparin requirement.",
          "Antithrombin deficiency (nephrotic syndrome, prolonged infusion) causes apparent heparin resistance.",
        ],
        contraindications: [
          "Active major haemorrhage, heparin-induced thrombocytopenia, and known hypersensitivity.",
          "Caution with recent neurosurgery, epidural catheters and severe thrombocytopenia.",
        ],
        monitoring: [
          "APTT ratio or anti-Xa 4–6 hourly after starting and after every rate change, then daily when stable.",
          "Platelet count every 2–3 days — a fall of >30–50% between day 4 and 14 suggests HIT; stop heparin and use argatroban or danaparoid.",
          "Potassium (aldosterone suppression) and bleeding; protamine 1 mg per 100 units as reversal.",
        ],
      },
      {
        drug: "Prothrombin complex concentrate",
        slug: "prothrombin-complex-concentrate",
        interactions: [
          "Thrombotic risk compounded by tranexamic acid, factor VIIa and recent thrombosis.",
          "Does not reverse direct oral anticoagulants completely; heparin content matters in HIT.",
        ],
        contraindications: [
          "Heparin-induced thrombocytopenia (most products contain heparin); DIC with ongoing consumption.",
          "Not indicated for volume replacement or for reversal without a bleeding or urgent surgical indication.",
        ],
        monitoring: [
          "INR before and 30 min after administration; give vitamin K 5–10 mg IV alongside for durable reversal.",
          "Clinical bleeding, and observe for arterial or venous thrombosis over the following days.",
          "Fibrinogen and platelets in major haemorrhage — PCC does not replace them.",
        ],
      },
      {
        drug: "Andexanet alfa / idarucizumab",
        slug: "andexanet-idarucizumab",
        interactions: [
          "Andexanet alfa binds heparin and interferes with anti-Xa assays, and makes subsequent heparinisation (e.g. for bypass or CRRT) unreliable.",
          "Rebound anti-Xa activity occurs after the andexanet bolus and infusion end.",
        ],
        contraindications: [
          "No absolute contraindication in life-threatening bleeding, but thrombotic risk is significant — restart anticoagulation as soon as safe.",
          "Idarucizumab is specific to dabigatran only; andexanet does not reverse dabigatran.",
        ],
        monitoring: [
          "Confirm the anticoagulant and last dose before giving; check renal function (dabigatran is dialysable).",
          "Haemostasis clinically, plus thrombin time or dilute thrombin time for dabigatran.",
          "Observe for thrombosis and for rebound bleeding at 12–24 h.",
        ],
      },
      {
        drug: "Regional citrate (CRRT)",
        slug: "regional-citrate-anticoagulation",
        interactions: [
          "Citrate is metabolised in the liver — accumulation with hepatic failure, shock or lactic acidosis causes citrate toxicity.",
          "Calcium-containing fluids and blood products alter the calcium balance of the circuit.",
        ],
        contraindications: [
          "Severe hepatic failure or lactic acidosis >8 mmol/L with poor citrate clearance (relative — use heparin or no anticoagulation).",
          "Untreated hypocalcaemia.",
        ],
        monitoring: [
          "Post-filter ionised calcium (target 0.25–0.35 mmol/L) and systemic ionised calcium (target 1.0–1.2 mmol/L) every 6 h.",
          "Total:ionised calcium ratio >2.5 signals citrate accumulation — reduce or stop citrate.",
          "Acid–base status, sodium and circuit lifespan; hypomagnesaemia is common.",
        ],
      },
    ],
  },
  {
    id: "metabolic-gi",
    title: "Metabolic, endocrine and gastrointestinal",
    blurb:
      "Concentration errors and electrolyte shifts predominate; insulin and potassium are the two commonest sources of serious ICU medication harm.",
    drugs: [
      {
        drug: "Insulin (soluble)",
        slug: "insulin",
        interactions: [
          "Requirements rise with steroids, catecholamines, enteral or parenteral feed and thiazides; they fall abruptly when feed is interrupted or dialysis starts.",
          "β-blockers mask the adrenergic warning signs of hypoglycaemia.",
          "Additive hypokalaemia with salbutamol, diuretics and bicarbonate.",
        ],
        contraindications: [
          "Hypoglycaemia; do not start a fixed-rate infusion without a glucose source or a plan for feed interruption.",
          "Avoid tight glycaemic targets (<6 mmol/L) — hypoglycaemia increases mortality.",
        ],
        monitoring: [
          "Capillary or blood gas glucose hourly on a variable-rate infusion until stable, then 2 hourly; target roughly 6–10 mmol/L.",
          "Potassium at least 4–6 hourly during DKA or high-rate infusions; also phosphate and magnesium.",
          "Ketones and pH in DKA; never stop the insulin infusion before subcutaneous insulin has been given and overlapped.",
        ],
        alert: "Use only 1 unit/mL strengths made to local protocol and label the syringe — 10-fold insulin errors are a classic never-event.",
      },
      {
        drug: "Calcium gluconate 10%",
        slug: "calcium-gluconate",
        interactions: [
          "Precipitates with sodium bicarbonate, phosphate and ceftriaxone — flush the line between drugs.",
          "Potentiates digoxin toxicity; antagonises the effects of calcium channel blockers and magnesium (used therapeutically).",
        ],
        contraindications: [
          "Hypercalcaemia and digoxin toxicity (relative — risk of stone heart).",
          "Extravasation risk with calcium chloride peripherally; do not give in the same line as ceftriaxone in neonates.",
        ],
        monitoring: [
          "ECG during administration for hyperkalaemia; ionised calcium after each dose.",
          "Phosphate, magnesium and albumin (correct total calcium or use ionised values).",
          "Cannula site — calcium salts cause severe tissue necrosis if extravasated.",
        ],
      },
      {
        drug: "Potassium chloride",
        slug: "potassium-chloride",
        interactions: [
          "Additive hyperkalaemia with ACE inhibitors, ARBs, spironolactone, trimethoprim, heparin, NSAIDs and suxamethonium.",
          "Effect blunted by concurrent insulin, salbutamol and bicarbonate (intracellular shift).",
        ],
        contraindications: [
          "Hyperkalaemia, untreated anuric renal failure and severe tissue trauma with rising potassium.",
          "Never give as an undiluted bolus, and never in a peripheral line above 40 mmol/L.",
        ],
        monitoring: [
          "Potassium 1–4 hourly during rapid replacement (maximum peripheral rate 10 mmol/h, central 20 mmol/h with continuous ECG).",
          "Continuous ECG for rates above 10 mmol/h; magnesium — hypokalaemia is refractory until magnesium is replaced.",
          "Renal function and urine output; use pre-made bags rather than adding ampoules.",
        ],
        alert: "Ready-made bags only — adding concentrated potassium ampoules at the bedside has caused fatal arrests.",
      },
      {
        drug: "Pantoprazole / omeprazole",
        slug: "proton-pump-inhibitors",
        interactions: [
          "Omeprazole inhibits CYP2C19 — reduces clopidogrel activation (use pantoprazole) and raises phenytoin, diazepam and warfarin levels.",
          "Reduces absorption of ketoconazole, itraconazole and atazanavir; increases methotrexate levels.",
        ],
        contraindications: [
          "Hypersensitivity; review the indication daily — routine prophylaxis is not needed once enteral feeding is established and risk factors have resolved.",
        ],
        monitoring: [
          "Magnesium and sodium on prolonged therapy; full blood count if cytopenia suspected.",
          "Watch for Clostridioides difficile and ventilator-associated pneumonia — both are more common with acid suppression.",
          "Signs of GI bleeding; stop-date documented on the drug chart.",
        ],
      },
      {
        drug: "Terlipressin",
        slug: "terlipressin",
        interactions: [
          "Additive vasoconstriction and ischaemia with noradrenaline and vasopressin.",
          "Additive bradycardia with β-blockers; additive hyponatraemia with diuretics and hypotonic fluid.",
        ],
        contraindications: [
          "Ischaemic heart disease, peripheral vascular disease, and known coronary or mesenteric ischaemia.",
          "Uncontrolled sepsis in hepatorenal syndrome; respiratory failure (increased risk of respiratory failure in the CONFIRM trial).",
          "Pregnancy.",
        ],
        monitoring: [
          "ECG and continuous oxygen saturation — respiratory failure and myocardial ischaemia are the key harms.",
          "Sodium daily (dilutional hyponatraemia can be rapid), fluid balance and skin/digital perfusion.",
          "Renal function and urine output to judge efficacy in hepatorenal syndrome; give with albumin.",
        ],
      },
      {
        drug: "N-acetylcysteine",
        slug: "n-acetylcysteine",
        interactions: [
          "Prolongs the INR modestly, independent of hepatic injury — interpret coagulation carefully.",
          "Do not mix with other drugs in the same line; interferes with some point-of-care assays.",
        ],
        contraindications: [
          "No absolute contraindication in paracetamol poisoning — a non-IgE anaphylactoid reaction is managed by slowing or pausing the infusion, not by abandoning treatment.",
          "Caution in asthma (bronchospasm) and fluid overload / small body weight (dilution volume).",
        ],
        monitoring: [
          "Anaphylactoid reactions during the first hour — flushing, urticaria, bronchospasm.",
          "ALT, INR, creatinine, bicarbonate/lactate and pH at the end of the infusion to decide on continuation; paracetamol level.",
          "Fluid balance and sodium, especially in children and the very small adult.",
        ],
      },
      {
        drug: "Thiamine (Pabrinex)",
        slug: "thiamine",
        interactions: [
          "Glucose administration before thiamine can precipitate Wernicke's encephalopathy — give thiamine first or concurrently.",
          "Chronic loop diuretic therapy and renal replacement increase losses and requirement.",
        ],
        contraindications: [
          "Previous anaphylaxis to parenteral thiamine (rare); give the infusion over 30 min with resuscitation facilities available.",
        ],
        monitoring: [
          "Neurological examination for ophthalmoplegia, ataxia and confusion; lactate in suspected deficiency.",
          "Observe for hypersensitivity during and shortly after infusion.",
          "Magnesium — thiamine-dependent enzymes need it, so deficiency blunts the response.",
        ],
      },
    ],
  },
  {
    id: "infection",
    title: "Antimicrobials and immunity",
    blurb:
      "Renal dose adjustment, therapeutic drug monitoring and allergy documentation are the three recurring safety tasks.",
    drugs: [
      {
        drug: "Piperacillin–tazobactam",
        slug: "piperacillin-tazobactam",
        interactions: [
          "Additive nephrotoxicity with vancomycin — the combination increases acute kidney injury.",
          "Reduces methotrexate clearance; prolongs non-depolarising blockade slightly; high sodium load with other sodium sources.",
          "Falsely raises some galactomannan and creatinine assays.",
        ],
        contraindications: [
          "Immediate hypersensitivity to any penicillin or a previous severe reaction to β-lactams.",
          "Caution in severe renal impairment (dose interval) and in neutropenia (monitor counts).",
        ],
        monitoring: [
          "Renal function daily, especially with vancomycin; adjust the interval as eGFR falls.",
          "Full blood count (neutropenia, thrombocytopenia) on courses beyond 7 days; liver function.",
          "Potassium and sodium; review the indication and de-escalate at 48–72 h with culture results.",
        ],
      },
      {
        drug: "Meropenem",
        slug: "meropenem",
        interactions: [
          "Reduces valproate levels substantially — seizure risk; avoid the combination.",
          "Probenecid prolongs the half-life; additive seizure risk with other epileptogenic drugs.",
        ],
        contraindications: [
          "Previous anaphylaxis to a carbapenem; caution with a documented severe penicillin reaction (cross-reactivity is low but not zero).",
          "Caution in epilepsy and CNS disease — carbapenems lower the seizure threshold.",
        ],
        monitoring: [
          "Renal function for dose and interval; extended infusions are used to optimise time above MIC.",
          "Seizure activity and neurological status; full blood count and liver function on long courses.",
          "Antimicrobial stewardship review at 48–72 h — narrow where possible.",
        ],
      },
      {
        drug: "Vancomycin",
        slug: "vancomycin",
        interactions: [
          "Additive nephrotoxicity with aminoglycosides, piperacillin–tazobactam, NSAIDs, contrast and ciclosporin.",
          "Additive ototoxicity with loop diuretics and aminoglycosides.",
          "Enhances the effect of non-depolarising neuromuscular blockers.",
        ],
        contraindications: [
          "Previous vancomycin anaphylaxis (infusion-related 'vancomycin flushing syndrome' is not an allergy — slow the infusion).",
          "Caution in pre-existing renal impairment and hearing loss.",
        ],
        monitoring: [
          "Pre-dose (trough) level, target 10–15 mg/L (15–20 mg/L for deep-seated infection) or AUC/MIC 400–600 where available; level before the 3rd–4th dose or earlier in renal impairment.",
          "Creatinine and urine output daily; full blood count for neutropenia on prolonged therapy.",
          "Infusion rate no faster than 10 mg/min to avoid flushing syndrome; site for phlebitis (central line preferred).",
        ],
      },
      {
        drug: "Ceftriaxone",
        slug: "ceftriaxone",
        interactions: [
          "Precipitates with calcium-containing solutions — never co-administer, and avoid entirely in neonates receiving calcium.",
          "Enhances the effect of warfarin; may raise ciclosporin levels.",
        ],
        contraindications: [
          "Previous severe β-lactam hypersensitivity.",
          "Neonatal jaundice (bilirubin displacement — kernicterus) and concurrent calcium infusions in neonates.",
          "Caution in biliary disease (pseudolithiasis) and haemolytic anaemia.",
        ],
        monitoring: [
          "Full blood count (immune haemolysis, neutropenia), liver function and bilirubin.",
          "Clinical response and stewardship review; no routine level monitoring.",
          "Signs of Clostridioides difficile infection — the risk is high with third-generation cephalosporins.",
        ],
      },
      {
        drug: "Co-trimoxazole",
        slug: "co-trimoxazole",
        interactions: [
          "Additive hyperkalaemia with ACE inhibitors, ARBs, spironolactone and heparin (trimethoprim blocks distal sodium channels).",
          "Raises methotrexate toxicity, potentiates warfarin, raises phenytoin and digoxin levels, and increases ciclosporin nephrotoxicity.",
          "Additive marrow suppression with azathioprine, mycophenolate and other antifolates.",
        ],
        contraindications: [
          "Sulphonamide hypersensitivity, severe hepatic disease, and known folate deficiency or megaloblastic anaemia.",
          "Glucose-6-phosphate dehydrogenase deficiency (haemolysis); porphyria; late pregnancy.",
          "Severe renal impairment without dose adjustment.",
        ],
        monitoring: [
          "Potassium, sodium and creatinine every 2–3 days on high-dose therapy — hyperkalaemia and a benign creatinine rise are common.",
          "Full blood count for cytopenias; liver function; rash (Stevens–Johnson, DRESS).",
          "Folinic acid rescue is used with high-dose therapy in some protocols; check local guidance for PCP dosing.",
        ],
      },
      {
        drug: "Aciclovir",
        slug: "aciclovir",
        interactions: [
          "Additive nephrotoxicity with NSAIDs, aminoglycosides, contrast and ciclosporin.",
          "Probenecid and cimetidine raise aciclovir levels; mycophenolate increases the exposure of both drugs.",
        ],
        contraindications: [
          "Hypersensitivity; caution in dehydration, renal impairment and neurological disease.",
          "Dose on ideal or adjusted body weight in obesity to avoid toxicity.",
        ],
        monitoring: [
          "Creatinine and urine output daily on high-dose IV therapy; pre-hydrate and infuse over at least 1 h.",
          "Neurological state — confusion, myoclonus and hallucinations from the CMMG metabolite can mimic the encephalitis being treated.",
          "Cannula site (severe extravasation injury), full blood count and liver function.",
        ],
      },
    ],
  },
];

export const icuDrugSafetyCount = icuDrugSafetyGroups.reduce((n, g) => n + g.drugs.length, 0);

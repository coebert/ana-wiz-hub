/**
 * Withdrawal, rebound and stopping guidance for the adult ICU formulary
 * mirrored in icuDrugDoses.ts, icuDrugMechanisms.ts and icuDrugSafety.ts.
 * Keys are the same `slug` values. Half-life is read from src/data/pk
 * on the page so the two never drift apart.
 *
 * Revision aid only — check the BNF, the SPC and local critical care
 * guidelines (and your local sedation/analgesia weaning bundle) before
 * changing a prescription.
 */

export type WithdrawalRisk = "high" | "moderate" | "low" | "none";

export interface DrugWithdrawal {
  /** Matches the slug used on the safety, mechanism and comparison pages. */
  slug: string;
  /** How likely a true withdrawal or rebound syndrome is on stopping. */
  risk: WithdrawalRisk;
  /** Why withdrawal or rebound happens (receptor adaptation, rebound physiology) — or why it does not. */
  why: string;
  /** How the half-life and context-sensitive kinetics shape the wean. */
  offset: string;
  /** Practical tapering steps. */
  taper: string[];
  /** Features and tests that tell you the wean is going wrong. */
  monitoring: string[];
  /** What to do if withdrawal or rebound declares itself. */
  rescue?: string;
}

export const icuDrugWithdrawal: Record<string, DrugWithdrawal> = {
  propofol: {
    slug: "propofol",
    risk: "moderate",
    why: "GABA-A up-regulation after prolonged deep sedation gives agitation, tremor and tachycardia on abrupt cessation, and unmasks pain and delirium that the infusion was masking rather than treating.",
    offset:
      "Context-sensitive half-time stays short (10–15 min) after days of infusion in most patients, so the fall in sedation depth is fast — plan the analgesic and delirium cover before you stop, not after.",
    taper: [
      "After <48 h of infusion propofol can usually be stopped outright as part of a daily sedation interruption.",
      "After >48–72 h of deep sedation reduce by 25–50% every 2–4 h to a light target (RASS −1 to 0) rather than stopping in one step.",
      "Do not wean propofol and the opioid at the same time — wean one agent per 12–24 h so the cause of any agitation is unambiguous.",
      "Keep a lipid and calorie reconciliation with the dietitian as the propofol calories fall away (1.1 kcal/mL).",
    ],
    monitoring: [
      "RASS/SAS hourly during the wean, with CAM-ICU at least twice daily.",
      "Watch for hypertension, tachycardia, sweating and tremor within 2–6 h of a step down.",
      "Reassess pain independently of sedation — a Behavioural Pain Scale or Critical-Care Pain Observation Tool score, not the RASS.",
    ],
    rescue:
      "Emergence agitation is treated with analgesia and dexmedetomidine or clonidine, not by returning to deep propofol sedation.",
  },
  fentanyl: {
    slug: "fentanyl",
    risk: "high",
    why: "Mu-receptor tolerance and physical dependence are established within 5–7 days of continuous infusion; abrupt cessation gives mydriasis, yawning, sweating, piloerection, diarrhoea, agitation, hypertension and tachycardia.",
    offset:
      "The context-sensitive half-time lengthens dramatically with infusion duration as peripheral fat saturates, so a long infusion self-tapers slowly and unpredictably — never assume a rapid offset.",
    taper: [
      "Infusion <5 days: reduce by 20–25% per day, or convert to intermittent as-required boluses once the requirement is low.",
      "Infusion 5–10 days: reduce by 10–20% per day.",
      "Infusion >10 days or high cumulative dose: convert to enteral methadone or oral morphine equivalent and wean by 10% every 24–48 h.",
      "Add regular paracetamol and a regional or adjuvant strategy (ketamine, clonidine, dexmedetomidine) so the opioid reduction is not simply uncovering untreated pain.",
    ],
    monitoring: [
      "A withdrawal score at least 8-hourly (WAT-1 in children, an adult withdrawal assessment tool or the Clinical Opiate Withdrawal Scale in adults).",
      "Pause the wean for 24 h if the score rises, rather than jumping straight back to the previous rate.",
      "Diarrhoea, dilated pupils, sweating and unexplained tachypnoea are opioid withdrawal until proved otherwise in a patient off a long infusion.",
    ],
    rescue:
      "Give a rescue bolus, return to the last tolerated rate for 24 h, then resume at half the previous step size. Naloxone is for respiratory depression only — it precipitates severe withdrawal in a dependent patient.",
  },
  morphine: {
    slug: "morphine",
    risk: "high",
    why: "Same mu-receptor dependence as fentanyl, with the added problem that morphine-6-glucuronide accumulates in renal impairment, so the apparent requirement during a wean is confounded by clearing metabolite.",
    offset:
      "Parent half-life 2–4 h but M6G half-life is far longer in renal failure — withdrawal features may be delayed by a day or more after stopping.",
    taper: [
      "Convert a continuous infusion to regular enteral morphine or methadone once absorption is reliable, then reduce by 10–20% every 24 h.",
      "In renal impairment expect to reduce faster than the numbers suggest because active metabolite is still circulating; oxycodone or fentanyl-based conversion is often cleaner.",
      "Do not stop a morphine infusion in a patient with an established epidural or regional block without a plan for when the block regresses.",
    ],
    monitoring: [
      "8-hourly withdrawal score plus pain score.",
      "Sedation and respiratory rate during the first 24 h after any conversion — conversion errors cut both ways.",
      "Renal function: a rising creatinine during a wean means metabolite accumulation, not tolerance.",
    ],
    rescue: "As-required boluses of the same opioid, then re-slow the taper by half.",
  },
  alfentanil: {
    slug: "alfentanil",
    risk: "moderate",
    why: "Dependence develops as with any mu agonist, but the short context-sensitive half-time means withdrawal declares itself quickly and predictably rather than insidiously.",
    offset:
      "Offset within 15–30 min of stopping even after prolonged infusion (no active metabolite, hepatic clearance), so there is no self-taper — the transition to a longer-acting opioid must be prescribed in advance.",
    taper: [
      "Convert to fentanyl, oxycodone or methadone before weaning if the infusion has run beyond 5 days.",
      "For shorter infusions step down by 25% every 4–6 h alongside enteral analgesia.",
      "Because alfentanil is preferred in renal failure, check the substituted opioid is also renally safe.",
    ],
    monitoring: [
      "Withdrawal and pain scores 4–8 hourly during the switch.",
      "Respiratory rate and sedation after conversion to any longer-acting agent.",
    ],
  },
  midazolam: {
    slug: "midazolam",
    risk: "high",
    why: "Benzodiazepine dependence after >5–7 days of infusion produces agitation, tremor, hallucinations, hypertension and, at the severe end, seizures. Midazolam is also the sedative most strongly associated with ICU delirium.",
    offset:
      "The active metabolite 1-hydroxymidazolam glucuronide accumulates in renal failure and obesity, so a patient may stay deeply sedated for days after stopping and then withdraw as it clears — a delayed, easily missed picture.",
    taper: [
      "After >1 week convert to enteral clonazepam, lorazepam or diazepam and reduce by 10–20% every 24–48 h.",
      "If continuing intravenously, reduce by 10–25% per day; avoid abrupt cessation after prolonged use.",
      "Do not treat emergent agitation by restarting midazolam if the patient is delirious — switch to dexmedetomidine or clonidine and reserve benzodiazepine only for true withdrawal.",
      "Alcohol withdrawal is the exception: there the benzodiazepine is the treatment and is weaned against a CIWA-Ar-driven regimen.",
    ],
    monitoring: [
      "Withdrawal score 8-hourly; CAM-ICU at least twice daily.",
      "Seizure watch during the first 72 h of a wean after prolonged high-dose use.",
      "Renal function and any dialysis start/stop — both change metabolite clearance abruptly.",
    ],
    rescue:
      "A benzodiazepine bolus for true withdrawal (tremor, hallucinations, seizure), then a slower taper. Flumazenil is contraindicated in a dependent patient — it precipitates seizures.",
  },
  dexmedetomidine: {
    slug: "dexmedetomidine",
    risk: "moderate",
    why: "Central α2 agonism suppresses sympathetic outflow; abrupt cessation after >24–48 h gives rebound hypertension, tachycardia, agitation, nausea and sweating, exactly as with clonidine.",
    offset:
      "Half-life is only 2–3 h, so rebound appears within hours of stopping — the short half-life makes rebound more likely, not less.",
    taper: [
      "Infusion >24–48 h: reduce by 0.1–0.2 microgram/kg/h every 2–4 h rather than stopping abruptly.",
      "For a longer or high-dose infusion, bridge to enteral clonidine (e.g. 50–150 micrograms 6–8 hourly, titrated) and then wean the clonidine over several days.",
      "Overlap the bridge — start clonidine and then reduce dexmedetomidine, do not stop first and hope.",
    ],
    monitoring: [
      "Blood pressure and heart rate at least hourly for 6 h after each reduction and after stopping.",
      "Agitation and sleep quality — rebound insomnia and anxiety are common and are not delirium.",
    ],
    rescue: "Restart a low-dose infusion or give an enteral clonidine dose; treat the hypertension itself only if severe.",
  },
  clonidine: {
    slug: "clonidine",
    risk: "high",
    why: "Classic rebound hypertensive crisis with headache, agitation, tachycardia and sweating after abrupt withdrawal of a chronic or high-dose α2 agonist, driven by up-regulated peripheral adrenergic tone.",
    offset:
      "Half-life 12–16 h (longer in renal impairment), so rebound typically peaks 18–36 h after a missed dose — often after the patient has stepped down to the ward.",
    taper: [
      "Never stop abruptly. Reduce by roughly 25% of the total daily dose every 2–3 days.",
      "If the enteral route is lost, cover with an alternative α2 agonist (dexmedetomidine infusion) or transdermal clonidine rather than omitting doses.",
      "Flag the taper explicitly in the ward handover and discharge summary — this is a common cause of readmission-level hypertension.",
    ],
    monitoring: [
      "Blood pressure and heart rate 4-hourly during the taper, and for 48 h after the last dose.",
      "Bradycardia on the way down is uncommon; tachycardia with hypertension suggests rebound.",
    ],
    rescue:
      "Re-give clonidine. Avoid unopposed β-blockade during clonidine rebound — it worsens the hypertension through unopposed α stimulation.",
  },
  ketamine: {
    slug: "ketamine",
    risk: "low",
    why: "True physical dependence is unusual in ICU use, but prolonged high-dose infusion can be followed by dysphoria, vivid dreams, craving and, rarely, unmasked pain when the NMDA blockade is removed.",
    offset:
      "Half-life 2–3 h with active norketamine, so effect fades over hours; analgesic benefit outlasts the infusion only briefly.",
    taper: [
      "Short analgesic infusions can be stopped directly, with the opioid and multimodal plan reviewed at the same time.",
      "After several days of high-dose sedation reduce over 12–24 h and expect the opioid requirement to rise as NMDA-mediated hyperalgesia returns.",
      "Anticipate the loss of its bronchodilator and haemodynamic support in asthma or shock — those are pharmacological effects that stop when the drug does.",
    ],
    monitoring: [
      "Pain score and opioid requirement for 24 h after stopping.",
      "Emergence phenomena, dysphoria and nightmares; delirium screening.",
      "Airway secretions and, in prolonged use, liver function and any urinary symptoms.",
    ],
  },
  haloperidol: {
    slug: "haloperidol",
    risk: "low",
    why: "No dependence syndrome, but abrupt cessation after prolonged use can be followed by withdrawal dyskinesia or cholinergic rebound, and the delirium it was treating may recur.",
    offset: "Half-life 14–36 h gives a natural self-taper over 2–3 days once dosing stops.",
    taper: [
      "Stop as soon as the delirium resolves — antipsychotics are not maintenance therapy after ICU.",
      "Reduce over 2–3 days rather than stopping abruptly after several weeks of regular dosing.",
      "Explicitly deprescribe on the ward transfer and discharge summary so it is not continued indefinitely.",
    ],
    monitoring: [
      "QTc after each dose change and after stopping.",
      "Extrapyramidal features and new abnormal movements during and after the taper.",
      "Delirium screening (CAM-ICU) to distinguish recurrence from withdrawal.",
    ],
  },
  rocuronium: {
    slug: "rocuronium",
    risk: "low",
    why: "No dependence, but prolonged blockade masks pain, awareness and seizure activity; the risk on stopping is residual weakness and critical illness myopathy rather than withdrawal.",
    offset:
      "Accumulates in hepatic and renal impairment; after a long infusion recovery may take many hours despite the short single-dose duration.",
    taper: [
      "Stop, do not wean — hold the infusion daily and confirm return of a train-of-four count of 4 before reducing sedation.",
      "Keep sedation and analgesia unchanged until neuromuscular recovery is documented; reduce them only afterwards.",
      "Sugammadex reverses rocuronium if urgent recovery is needed, at 16 mg/kg for a profound block.",
    ],
    monitoring: [
      "Train-of-four with a peripheral nerve stimulator before and after stopping.",
      "Ventilatory effort, cough and grip strength; early physiotherapy assessment for ICU-acquired weakness.",
      "Depth-of-anaesthesia monitoring while paralysed, since sedation cannot be assessed clinically.",
    ],
  },
  "atracurium-cisatracurium": {
    slug: "atracurium-cisatracurium",
    risk: "low",
    why: "No dependence. Hofmann elimination means offset is independent of organ function, so the concern after stopping is unmasked pain and awareness plus ICU-acquired weakness.",
    offset: "Predictable offset in 20–30 min regardless of renal or hepatic function; laudanosine accumulation is rarely clinically relevant.",
    taper: [
      "Stop outright with a daily hold; recovery is fast and predictable.",
      "Confirm train-of-four recovery before weaning sedation.",
      "Reassess whether ongoing paralysis is needed at least daily — the shortest possible duration limits myopathy.",
    ],
    monitoring: [
      "Train-of-four and clinical strength.",
      "Sedation depth while paralysed, then pain and agitation scores after recovery.",
    ],
  },
  suxamethonium: {
    slug: "suxamethonium",
    risk: "none",
    why: "Single-dose agent — no tolerance, dependence or rebound. Prolonged block reflects pseudocholinesterase deficiency, not withdrawal.",
    offset: "Offset in 3–5 min by plasma cholinesterase; hours if the patient is homozygous for an atypical enzyme.",
    taper: ["Not applicable — never given as an infusion in modern practice."],
    monitoring: [
      "Train-of-four if block is prolonged beyond 10 min; continue sedation and ventilation until fully recovered.",
      "Potassium and ECG after use in burns, prolonged immobility or neuromuscular disease.",
    ],
  },
  noradrenaline: {
    slug: "noradrenaline",
    risk: "moderate",
    why: "No dependence, but abrupt cessation of vasopressor support causes rebound hypotension in a vasoplegic patient, and stopping too fast is a common cause of avoidable renal hypoperfusion.",
    offset: "Half-life 2–2.5 min — effect disappears within minutes, so every reduction is tested almost immediately.",
    taper: [
      "Reduce in small steps (0.01–0.05 microgram/kg/min, or 1–2 mL/h) every 10–30 min against a mean arterial pressure target, usually ≥65 mmHg.",
      "Wean the vasopressor before the inotrope in mixed shock, and correct hypovolaemia, sedation depth, acidosis and adrenal insufficiency first — those are the usual reasons a wean fails.",
      "Do not remove the central line until the patient has been off vasopressor for several hours.",
      "In long-standing high-dose use, consider hydrocortisone and vasopressin as adjuncts to allow catecholamine reduction.",
    ],
    monitoring: [
      "Continuous arterial pressure, heart rate and rhythm; lactate and urine output 4-hourly through the wean.",
      "Peripheral perfusion and capillary refill at each step.",
      "Watch for rebound tachycardia or arrhythmia as the α load falls.",
    ],
    rescue: "Return to the previous rate immediately and look for the cause — bleeding, sepsis, cardiac dysfunction or missed steroid deficiency.",
  },
  adrenaline: {
    slug: "adrenaline",
    risk: "moderate",
    why: "Abrupt cessation removes both β1 inotropy and α1 tone at once, so hypotension and low cardiac output can appear together; withdrawal is haemodynamic, not neuroadaptive.",
    offset: "Half-life 2–3 min; effect fully gone within 10 min of stopping.",
    taper: [
      "Reduce in 0.01–0.05 microgram/kg/min steps every 15–30 min with a defined MAP and perfusion target.",
      "Substitute a single-mechanism agent (noradrenaline for tone, dobutamine or milrinone for inotropy) before removing adrenaline in complex shock.",
      "Anticipate the lactate falling and the glucose and potassium rising back to baseline as the β2 effect is withdrawn.",
    ],
    monitoring: [
      "Continuous ECG and arterial line; cardiac output or echocardiographic reassessment during larger reductions.",
      "Glucose, potassium and lactate at each significant step.",
    ],
    rescue: "Return to the previous rate; consider echocardiography before the next attempt.",
  },
  vasopressin: {
    slug: "vasopressin",
    risk: "high",
    why: "Loss of V1-mediated tone is poorly compensated in septic vasoplegia, so stopping vasopressin first — before the catecholamine — is a well-described cause of abrupt, sometimes severe hypotension.",
    offset: "Half-life 10–20 min, so hypotension typically declares 30–60 min after stopping.",
    taper: [
      "Wean the catecholamine to a low dose first, then reduce vasopressin last.",
      "Reduce in 0.01 unit/min steps (or halve the fixed 0.03 unit/min rate) with 30–60 min between steps.",
      "Have a plan to increase noradrenaline transiently as vasopressin comes off.",
    ],
    monitoring: [
      "Arterial pressure continuously for at least 1 h after each reduction.",
      "Urine output and sodium — a diuresis with rising sodium after stopping suggests unmasked diabetes insipidus.",
      "Peripheral and mesenteric perfusion, digits and skin.",
    ],
    rescue: "Restart at the previous rate; hypotension after stopping vasopressin is not a reason to abandon catecholamine weaning altogether.",
  },
  dobutamine: {
    slug: "dobutamine",
    risk: "moderate",
    why: "β1 tolerance develops through receptor down-regulation within 72 h of continuous infusion, so the same rate does progressively less and stopping can drop cardiac output abruptly.",
    offset: "Half-life 2 min; effects gone within 10 min.",
    taper: [
      "Reduce by 1–2.5 microgram/kg/min every 4–12 h once perfusion, lactate and urine output are stable.",
      "Optimise oral heart-failure therapy (ACE inhibitor/ARNI, β-blocker as tolerated, diuretic) before the final steps.",
      "In advanced heart failure, reduce over days and involve the heart-failure team — some patients are inotrope-dependent.",
    ],
    monitoring: [
      "Lactate, mixed or central venous oxygen saturation, urine output and cardiac output trend after each step.",
      "ECG for arrhythmia and rate rise; blood pressure for hypotension from β2 vasodilatation.",
    ],
    rescue: "Return to the previous dose and reassess with echocardiography; consider levosimendan or milrinone if repeated weans fail.",
  },
  milrinone: {
    slug: "milrinone",
    risk: "moderate",
    why: "Post-receptor mechanism so it is not subject to catecholamine tolerance, but stopping still removes inodilator support; the long half-life means the reverse problem — accumulation — dominates in renal failure.",
    offset: "Half-life 2–4 h, prolonged to >20 h in renal impairment, so the offset after stopping is slow and self-tapering.",
    taper: [
      "Reduce by 0.125 microgram/kg/min every 12–24 h; the pharmacological tail means each step takes hours to declare.",
      "Wean vasopressor support last, since milrinone-induced vasodilatation resolves as the drug clears.",
      "In renal failure expect a prolonged effect after the infusion stops — do not add another inodilator too soon.",
    ],
    monitoring: [
      "Blood pressure, cardiac output/echocardiographic indices, urine output and platelet count.",
      "Arrhythmia surveillance for 24 h after stopping, because drug levels persist.",
    ],
  },
  metaraminol: {
    slug: "metaraminol",
    risk: "low",
    why: "Bridging vasopressor only; tachyphylaxis develops through noradrenaline store depletion, which looks like escalating requirement rather than withdrawal.",
    offset: "Effect lasts 20–60 min after a bolus — longer than the catecholamines, so a wean is stepped in tens of minutes.",
    taper: [
      "Reduce as the definitive agent (noradrenaline) or the underlying cause is addressed.",
      "Escalating requirement means tachyphylaxis or under-resuscitation — change agent, do not simply keep climbing.",
    ],
    monitoring: ["Blood pressure and heart rate; reflex bradycardia; perfusion and urine output."],
  },
  hydrocortisone: {
    slug: "hydrocortisone",
    risk: "high",
    why: "Exogenous glucocorticoid suppresses the hypothalamic–pituitary–adrenal axis within about a week, so abrupt cessation risks adrenal crisis: hypotension, hyponatraemia, hyperkalaemia, hypoglycaemia and vomiting. Vasopressor-sparing effects are also lost.",
    offset:
      "Biological effect lasts 8–12 h despite a plasma half-life of 1.5–2 h; HPA recovery takes days to weeks after prolonged use.",
    taper: [
      "Course ≤7 days for septic shock: stop directly or over 24–48 h once vasopressors are off (many units simply stop at 200 mg/day after weaning).",
      "Course >7–14 days, or any patient on long-term steroids before admission: taper, typically halving the daily dose every 2–3 days down to a physiological replacement equivalent (hydrocortisone 15–25 mg/day) before stopping.",
      "Never stop abruptly in known adrenal insufficiency, long-term steroid use or after prolonged high-dose therapy — continue replacement and involve endocrinology.",
      "Provide a steroid emergency card, sick-day rules and a clear ward taper plan on transfer.",
    ],
    monitoring: [
      "Blood pressure, sodium, potassium and glucose daily during the taper and for 48 h after stopping.",
      "Vasopressor requirement — a rise after stopping suggests the taper was too fast.",
      "Consider a short Synacthen test only after discussion, and never delay treatment to obtain it.",
    ],
    rescue:
      "Suspected adrenal crisis: hydrocortisone 100 mg IV immediately plus fluid resuscitation and glucose — treat first, investigate afterwards.",
  },
  amiodarone: {
    slug: "amiodarone",
    risk: "low",
    why: "No withdrawal syndrome; the problem is the opposite — an enormous tissue reservoir means effects, interactions and toxicity persist for weeks to months after stopping, and arrhythmia may recur late.",
    offset: "Terminal half-life 40–60 days with a Vd of 60–100 L/kg — the pharmacology outlives the prescription.",
    taper: [
      "Convert the loading infusion to oral dosing and step down to a maintenance dose (typically 200 mg daily) rather than continuing high-dose therapy.",
      "Stop entirely rather than taper when the indication has resolved, but plan the follow-up: rhythm can recur days later while levels are still therapeutic.",
      "Keep interacting drugs (warfarin, digoxin, statins) at their reduced doses for weeks after stopping, then re-titrate.",
    ],
    monitoring: [
      "ECG and QTc, thyroid function and liver function before stopping and at follow-up.",
      "Rhythm surveillance for at least 48 h after discontinuation.",
      "Baseline thyroid and pulmonary review documented for the GP, since toxicity can appear months later.",
    ],
  },
  "magnesium-sulfate": {
    slug: "magnesium-sulfate",
    risk: "low",
    why: "No dependence. Stopping simply allows renal excretion; the practical risk is rebound hypomagnesaemia with recurrent arrhythmia, bronchospasm or seizure in the depleted patient.",
    offset: "Extracellular levels fall within hours of stopping (half-life ~4 h in normal renal function); total body deficit takes days to correct.",
    taper: [
      "Stop the loading infusion and switch to replacement dosing driven by the serum level and the deficit.",
      "In pre-eclampsia continue for 24 h after delivery or the last seizure, then stop rather than taper.",
      "Correct potassium and calcium at the same time — refractory hypokalaemia is usually magnesium depletion.",
    ],
    monitoring: [
      "Serum magnesium 12–24 hourly, plus potassium and calcium.",
      "Patellar reflexes, respiratory rate and conscious level while running; recurrence of the treated problem after stopping.",
    ],
  },
  digoxin: {
    slug: "digoxin",
    risk: "moderate",
    why: "No dependence, but stopping in rate-controlled atrial fibrillation or heart failure allows rapid ventricular response and symptomatic deterioration; the long half-life masks this for a day or two.",
    offset: "Half-life 36–48 h normally, and up to 5 days in renal impairment, so both benefit and toxicity decay slowly.",
    taper: [
      "Stop rather than taper when toxicity is suspected, and cover rate control with a β-blocker or another agent if needed.",
      "When deprescribing electively, ensure alternative rate or heart-failure therapy is established first.",
      "Recheck the dose whenever renal function, potassium or an interacting drug (amiodarone, macrolide, verapamil) changes.",
    ],
    monitoring: [
      "Heart rate and rhythm continuously after stopping; ECG for return of rapid AF.",
      "Digoxin level (6 h post-dose), potassium, magnesium and creatinine.",
    ],
    rescue: "Toxicity: correct potassium and magnesium, treat bradyarrhythmia, and give digoxin-specific antibody fragments for life-threatening features.",
  },
  esmolol: {
    slug: "esmolol",
    risk: "moderate",
    why: "β-receptor up-regulation means abrupt withdrawal of any β-blocker can produce rebound tachycardia, hypertension and, in ischaemic heart disease, angina or infarction.",
    offset: "Half-life 9 min — the shortest of the β-blockers, so rebound is fast but also easy to re-treat.",
    taper: [
      "Reduce by 25–50 microgram/kg/min every 10–20 min against heart rate and blood pressure targets.",
      "Bridge to an enteral β-blocker (bisoprolol, metoprolol) before stopping if long-term blockade is indicated — especially post-infarction or in thyroid storm.",
      "Restart the patient's usual β-blocker as soon as absorption allows; perioperative β-blocker omission is itself a harm.",
    ],
    monitoring: [
      "Continuous ECG and blood pressure for 30–60 min after each reduction.",
      "Ischaemia surveillance (ST segments, troponin if symptomatic) in coronary disease.",
    ],
    rescue: "Restart the infusion; treat rebound tachycardia with β-blockade rather than escalating sedation.",
  },
  "glyceryl-trinitrate": {
    slug: "glyceryl-trinitrate",
    risk: "moderate",
    why: "Tolerance develops within 24–48 h of continuous infusion through sulfhydryl depletion, and abrupt cessation can cause rebound coronary vasoconstriction and hypertension.",
    offset: "Half-life 1–4 min; blood pressure typically rises within 5–15 min of stopping.",
    taper: [
      "Reduce in 10–20% steps every 15–30 min while introducing an enteral vasodilator or antihypertensive.",
      "Build in a nitrate-free interval (8–12 h) if therapy is to continue beyond 48 h, to limit tolerance.",
      "Escalating requirement usually means tolerance, not worsening disease — change strategy rather than dose.",
    ],
    monitoring: [
      "Continuous arterial pressure for 30 min after stopping; ECG for ischaemia.",
      "Methaemoglobin if high-dose prolonged infusion; headache and tachyphylaxis as clinical markers.",
    ],
  },
  labetalol: {
    slug: "labetalol",
    risk: "moderate",
    why: "Combined α and β blockade; abrupt withdrawal risks rebound hypertension and tachycardia, particularly in phaeochromocytoma, pre-eclampsia and after aortic dissection.",
    offset: "Half-life 4–6 h after intravenous use, so rebound tends to appear over 6–12 h rather than minutes.",
    taper: [
      "Convert the infusion to oral labetalol or another agent, overlapping the two, then reduce the infusion by 25% every 1–2 h.",
      "In aortic dissection and phaeochromocytoma, maintain blockade until the definitive treatment is complete — do not wean to prove a point.",
      "Hand over the ongoing antihypertensive plan explicitly, including postnatal blood pressure follow-up after pre-eclampsia.",
    ],
    monitoring: [
      "Blood pressure and heart rate hourly through the wean, 4-hourly for 24 h after.",
      "Fetal monitoring if still pregnant; hepatic function with prolonged use.",
    ],
  },
  lorazepam: {
    slug: "lorazepam",
    risk: "high",
    why: "Benzodiazepine dependence with the same withdrawal spectrum as midazolam — anxiety, tremor, hallucinations, autonomic instability and seizures — and a real risk of status epilepticus recurrence if stopped abruptly during seizure treatment.",
    offset: "Half-life 12–15 h with no clinically important active metabolite; propylene glycol accumulates with high-dose prolonged infusion.",
    taper: [
      "After more than a week of regular dosing, reduce by 10–25% of the daily dose every 24–48 h, or convert to diazepam or clonazepam for a smoother taper.",
      "In alcohol withdrawal, wean against a symptom-triggered score (CIWA-Ar) rather than a fixed reducing regimen.",
      "In status epilepticus, do not withdraw benzodiazepine cover until the maintenance anticonvulsant is at therapeutic level.",
    ],
    monitoring: [
      "Withdrawal score and seizure watch 8-hourly.",
      "Osmolar gap, lactate and renal function during high-dose infusion (propylene glycol toxicity).",
      "Delirium screening — benzodiazepine withdrawal and hyperactive delirium look alike.",
    ],
    rescue: "A rescue benzodiazepine dose for withdrawal or seizure, then halve the taper rate. Never use flumazenil.",
  },
  levetiracetam: {
    slug: "levetiracetam",
    risk: "moderate",
    why: "No dependence, but abrupt withdrawal of any anticonvulsant lowers the seizure threshold and can precipitate recurrence or status.",
    offset: "Half-life 6–8 h (longer in renal impairment), so levels fall within a day of stopping.",
    taper: [
      "Do not stop abruptly in a patient with established epilepsy or after status — reduce over at least 1–2 weeks with neurology input.",
      "Short prophylactic courses (for example 7 days after traumatic brain injury) can be stopped without a taper.",
      "Adjust rather than stop when renal function changes; dose by eGFR and give a supplementary dose after dialysis.",
    ],
    monitoring: [
      "Seizure surveillance, and EEG if the conscious level is unexplained.",
      "Behavioural change and agitation, which are dose-related and improve as the dose falls.",
      "Renal function with each dose change.",
    ],
  },
  phenytoin: {
    slug: "phenytoin",
    risk: "moderate",
    why: "Withdrawal seizures follow abrupt cessation, and saturable zero-order kinetics mean small dose changes cause large, delayed level changes in both directions.",
    offset: "Half-life 7–42 h and dose-dependent; after saturation, levels fall slowly and unpredictably.",
    taper: [
      "Reduce slowly with levels, typically over weeks, and never stop abruptly in established epilepsy.",
      "Cross-taper to the replacement anticonvulsant with overlap before reducing phenytoin.",
      "Correct for albumin (or measure free phenytoin) in critical illness before deciding a level is low.",
    ],
    monitoring: [
      "Trough levels (target total 10–20 mg/L; free 1–2 mg/L) after each change, and albumin.",
      "Seizure surveillance during the taper; ECG and blood pressure during any intravenous dosing.",
      "Interacting drugs — enzyme induction persists for 1–2 weeks after stopping, so re-check warfarin, DOACs and other doses then.",
    ],
  },
  "hypertonic-saline": {
    slug: "hypertonic-saline",
    risk: "high",
    why: "Osmotherapy establishes a new osmotic steady state; stopping abruptly, or correcting the sodium down too fast, causes rebound cerebral oedema and raised intracranial pressure.",
    offset: "Sodium falls over hours once infusion stops; the brain re-equilibrates over 24–48 h.",
    taper: [
      "Wean the sodium target down slowly — no faster than about 0.5 mmol/L per hour, and typically 8–10 mmol/L per 24 h.",
      "Reduce the infusion in steps, checking sodium 4–6 hourly, rather than stopping and rechecking the next day.",
      "Avoid hypotonic fluids and free water anywhere else in the prescription while weaning.",
    ],
    monitoring: [
      "Sodium, chloride, osmolality and acid–base 4–6 hourly during the wean.",
      "Neurological observations and intracranial pressure where monitored, for at least 24 h after stopping.",
      "Fluid balance and urine output — a sudden diuresis suggests diabetes insipidus, not successful weaning.",
    ],
    rescue: "Rising intracranial pressure during a wean: give a bolus of hypertonic saline, return to the previous target and image.",
  },
  mannitol: {
    slug: "mannitol",
    risk: "moderate",
    why: "Repeated dosing lets mannitol cross into injured brain, so the osmotic gradient can reverse on stopping, giving rebound intracranial hypertension; the osmotic diuresis also leaves the patient volume-depleted and hypernatraemic.",
    offset: "Half-life 0.5–2.5 h (much longer in renal failure); intracranial pressure effect lasts 2–6 h per dose.",
    taper: [
      "Space the doses out (for example 6-hourly to 8-hourly to as-required) rather than stopping abruptly after prolonged use.",
      "Restore intravascular volume as you wean, so the withdrawal is not confounded by hypovolaemia.",
      "Stop if the osmolar gap exceeds about 20 mOsm/kg or acute kidney injury develops, and switch strategy rather than continuing.",
    ],
    monitoring: [
      "Osmolality and osmolar gap, sodium, potassium, renal function and fluid balance before each dose.",
      "Intracranial pressure and neurological observations for 12 h after the last dose.",
    ],
  },
  nimodipine: {
    slug: "nimodipine",
    risk: "low",
    why: "No dependence, but stopping before the vasospasm window has closed leaves the patient unprotected against delayed cerebral ischaemia; hypotension is the usual reason a course is truncated.",
    offset: "Half-life 1–2 h with high first-pass metabolism, so the blood pressure effect resolves within hours.",
    taper: [
      "Complete the standard 21-day course after aneurysmal subarachnoid haemorrhage, then stop without a taper.",
      "If hypotension forces a change, reduce the dose and shorten the interval (for example 30 mg 2-hourly) rather than stopping the drug.",
      "Switch intravenous to enteral as soon as the gut works, keeping the course continuous.",
    ],
    monitoring: [
      "Blood pressure with every dose; neurological observations and transcranial Doppler or imaging as per protocol.",
      "New focal deficit after stopping means delayed cerebral ischaemia until proved otherwise.",
    ],
  },
  "tranexamic-acid": {
    slug: "tranexamic-acid",
    risk: "none",
    why: "Fixed-course antifibrinolytic — no tolerance or rebound. Its value is time-limited and it is simply stopped at the end of the course.",
    offset: "Half-life 2–3 h, prolonged in renal impairment; antifibrinolytic effect lasts around 8 h after a dose.",
    taper: [
      "Complete the protocol course (for example 1 g then 1 g over 8 h in trauma or obstetric haemorrhage) and stop.",
      "Do not restart beyond 3 h from injury in trauma — late administration is not beneficial.",
      "Reduce the dose in renal impairment rather than extending the course.",
    ],
    monitoring: ["Bleeding, clot burden and any seizure activity; renal function for repeat dosing."],
  },
  enoxaparin: {
    slug: "enoxaparin",
    risk: "moderate",
    why: "No dependence, but stopping anticoagulation leaves a prothrombotic patient exposed, and the risk of thrombosis on interruption has to be balanced against bleeding and neuraxial procedures.",
    offset: "Anti-Xa half-life 4–7 h subcutaneously, prolonged substantially in renal impairment — plan around 12 h (24 h for treatment dose) before a neuraxial procedure.",
    taper: [
      "Stop rather than taper, but plan the interruption: 12 h after a prophylactic dose and 24 h after a treatment dose before neuraxial block or high-risk surgery.",
      "Bridge with unfractionated heparin if the thrombotic risk is high and frequent interruptions are expected.",
      "Restart at 4 h after catheter removal or as local guidance dictates, and document the restart time.",
    ],
    monitoring: [
      "Platelets (HIT), haemoglobin, creatinine and anti-Xa level where indicated (renal failure, extremes of weight, pregnancy).",
      "Clinical thrombosis surveillance during any interruption; document a VTE risk assessment each day.",
    ],
  },
  "unfractionated-heparin": {
    slug: "unfractionated-heparin",
    risk: "moderate",
    why: "Abrupt cessation is followed by a rebound prothrombotic state after acute coronary syndrome or in heparin-induced thrombocytopenia, where stopping heparin alone is insufficient.",
    offset: "Half-life 60–90 min (dose-dependent), so the anticoagulant effect is gone within 2–4 h — the reason it is the bridging agent of choice.",
    taper: [
      "Stop the infusion and allow the effect to dissipate over 2–4 h before an invasive procedure; no taper is needed.",
      "When transitioning to warfarin, overlap for at least 5 days and until the INR has been in range for 24–48 h.",
      "In confirmed or suspected HIT, stop all heparin including flushes and start an alternative anticoagulant — do not simply stop.",
    ],
    monitoring: [
      "APTT ratio or anti-Xa 6-hourly and after each rate change; platelets at least alternate days for HIT.",
      "Haemoglobin and clinical bleeding; thrombosis surveillance after stopping.",
    ],
    rescue: "Protamine reverses unfractionated heparin (1 mg per 100 units given in the previous 2–3 h, maximum 50 mg) if bleeding is severe.",
  },
  "prothrombin-complex-concentrate": {
    slug: "prothrombin-complex-concentrate",
    risk: "none",
    why: "Single rescue dose — no tolerance or withdrawal. The clinical trap is rebound anticoagulation as the short-lived factors are consumed while the original anticoagulant persists.",
    offset: "Factor VII half-life is only 4–6 h, so the correction fades within hours while warfarin's effect lasts days — hence concurrent vitamin K.",
    taper: [
      "Not tapered. Always give vitamin K 5–10 mg IV with it for warfarin reversal to prevent rebound over-anticoagulation.",
      "Recheck coagulation 30 min after the dose and again at 6–12 h, and re-dose only on the repeat result.",
      "Plan when and whether to restart the original anticoagulant, and document that decision.",
    ],
    monitoring: ["INR/coagulation screen at 30 min and 6–12 h; thrombosis surveillance; haemoglobin and bleeding."],
  },
  "andexanet-idarucizumab": {
    slug: "andexanet-idarucizumab",
    risk: "moderate",
    why: "No withdrawal, but both agents have a rebound problem: anti-Xa activity returns after the andexanet bolus and infusion finish, and dabigatran can redistribute after idarucizumab.",
    offset: "Idarucizumab acts within minutes with reversal sustained for about 24 h; andexanet requires a bolus plus 2 h infusion, after which anti-Xa activity rebounds.",
    taper: [
      "Follow the licensed bolus-plus-infusion regimen exactly — an incomplete infusion means early rebound.",
      "Recheck coagulation after the infusion; a second idarucizumab dose may be needed if dabigatran effect returns.",
      "Decide and document when the anticoagulant will be restarted, since thrombotic risk rises immediately after reversal.",
    ],
    monitoring: ["Bleeding, anti-Xa or thrombin time after the infusion, and active thrombosis surveillance for 48 h."],
  },
  "regional-citrate-anticoagulation": {
    slug: "regional-citrate-anticoagulation",
    risk: "low",
    why: "No systemic dependence, but stopping the circuit removes both the citrate and the calcium replacement at once, so the trap is an unbalanced stop producing hypocalcaemia or a metabolic swing.",
    offset: "Citrate is metabolised in minutes when hepatic function is intact; accumulation resolves over hours once the circuit stops.",
    taper: [
      "Stop the calcium replacement and the citrate together with the circuit — never leave one running.",
      "Recheck ionised and total calcium 1 h after stopping and correct any deficit.",
      "Recognise citrate accumulation (rising total:ionised calcium ratio >2.5, metabolic acidosis) as a reason to change modality, not to continue.",
    ],
    monitoring: [
      "Ionised and total calcium ratio, acid–base, sodium and magnesium 6–12 hourly and after stopping.",
      "Filter life and circuit clotting; liver function in shock.",
    ],
  },
  insulin: {
    slug: "insulin",
    risk: "high",
    why: "Stopping a variable-rate insulin infusion without subcutaneous cover causes rebound hyperglycaemia and, in type 1 diabetes or DKA, recurrence of ketoacidosis within hours.",
    offset: "Intravenous half-life is 5–9 min — the effect is gone almost immediately, which is precisely why an overlap is mandatory.",
    taper: [
      "Overlap: give the first long-acting subcutaneous insulin dose 30–60 min before stopping the infusion (many units continue basal insulin throughout).",
      "In DKA, do not stop until ketones are <0.6 mmol/L, pH >7.3 and bicarbonate is normal, and the patient is eating.",
      "Reduce the rate as feed or parenteral nutrition is reduced — stopping the feed while the insulin runs is a common hypoglycaemia event.",
      "Restore the patient's usual regimen with diabetes team input rather than improvising.",
    ],
    monitoring: [
      "Capillary glucose hourly during the transition, then 2-hourly for 6 h; ketones in type 1 diabetes.",
      "Potassium 4–6 hourly around the transition; glucose again after any feed change.",
    ],
    rescue: "Rebound hyperglycaemia with ketones means restart the intravenous infusion and reassess the subcutaneous plan.",
  },
  "calcium-gluconate": {
    slug: "calcium-gluconate",
    risk: "low",
    why: "No dependence. Stopping an infusion in ongoing citrate load, massive transfusion or hypoparathyroidism causes recurrent hypocalcaemia with tetany, arrhythmia and impaired coagulation.",
    offset: "The membrane-stabilising effect of a bolus lasts only 30–60 min, so cover must be continuous while the cause persists.",
    taper: [
      "Wean the infusion as the citrate load, transfusion or ongoing loss stops, guided by ionised calcium.",
      "Convert to enteral calcium and activated vitamin D in hypoparathyroidism before stopping the infusion.",
      "Correct magnesium at the same time — hypomagnesaemia makes hypocalcaemia refractory.",
    ],
    monitoring: ["Ionised calcium 4–6 hourly during weaning; ECG (QT interval); magnesium, phosphate and albumin."],
  },
  "potassium-chloride": {
    slug: "potassium-chloride",
    risk: "low",
    why: "No dependence. The issue on stopping is recurrent hypokalaemia where the loss (diuretics, RRT, gastrointestinal, refeeding, β agonists) is ongoing.",
    offset: "Serum level responds within an hour of an infusion but redistributes intracellularly over hours — a normal level does not mean the deficit is filled.",
    taper: [
      "Convert from replacement infusion to maintenance in the fluid or feed once the level is stable, rather than stopping outright.",
      "Correct magnesium, since renal potassium wasting continues without it.",
      "Re-check 4–6 h after stopping any high-rate replacement.",
    ],
    monitoring: ["Potassium 4–6 hourly through replacement and after stopping; ECG; magnesium; renal function and urine output."],
  },
  "proton-pump-inhibitors": {
    slug: "proton-pump-inhibitors",
    risk: "moderate",
    why: "Chronic acid suppression causes hypergastrinaemia and parietal cell hyperplasia, so abrupt cessation after weeks to months produces rebound acid hypersecretion with dyspepsia — often misread as recurrent disease and used to justify indefinite therapy.",
    offset: "Plasma half-life 1–2 h but the irreversible pump inhibition lasts 24–48 h, and rebound hypersecretion peaks days after stopping.",
    taper: [
      "Stress-ulcer prophylaxis should be stopped as soon as the risk factors resolve (enteral feeding established, off ventilation, no coagulopathy) — most patients need no taper.",
      "After long-term therapy, halve the dose for 2–4 weeks, then move to as-required or an H2 antagonist before stopping.",
      "Deprescribe explicitly on the discharge summary — ICU-started PPIs continued indefinitely are a recognised harm.",
    ],
    monitoring: [
      "Dyspepsia and reflux symptoms after stopping; distinguish rebound (settles in 2–4 weeks) from true recurrence.",
      "Magnesium, sodium and B12 with long-term use; C. difficile and pneumonia risk while continuing.",
    ],
  },
  terlipressin: {
    slug: "terlipressin",
    risk: "moderate",
    why: "Splanchnic vasoconstriction is withdrawn on stopping, so portal pressure and the hepatorenal physiology can rebound — variceal rebleeding or a return of renal dysfunction.",
    offset: "Half-life around 50 min with a prolonged 4–6 h pharmacological effect as lysine-vasopressin is released.",
    taper: [
      "Variceal bleeding: a fixed course of 2–5 days alongside definitive endoscopic therapy, then stop — no taper.",
      "Hepatorenal syndrome: continue for up to 14 days, then stop when creatinine has responded or after 4 days of no response.",
      "Stop immediately for ischaemic complications, severe hyponatraemia or respiratory failure rather than weaning.",
    ],
    monitoring: [
      "Sodium daily (rapid falls are common), fluid balance, peripheral and mesenteric perfusion, ECG.",
      "Renal function and rebleeding surveillance for 48 h after stopping.",
    ],
  },
  "n-acetylcysteine": {
    slug: "n-acetylcysteine",
    risk: "none",
    why: "Antidote given as a defined course — no tolerance or withdrawal. The risk lies in stopping too early while hepatotoxicity is still evolving.",
    offset: "Half-life 5–6 h; glutathione repletion continues while the infusion runs.",
    taper: [
      "Complete the standard course, then reassess: continue beyond it if ALT is rising, the INR is >1.3 or paracetamol remains detectable.",
      "Do not stop for an anaphylactoid reaction — pause, treat with antihistamine, and restart at a lower rate.",
      "Discuss with the liver unit before stopping in established acute liver failure.",
    ],
    monitoring: ["ALT, INR, creatinine, pH, lactate and paracetamol level at the end of the infusion and 12-hourly if continued."],
  },
  thiamine: {
    slug: "thiamine",
    risk: "low",
    why: "No dependence, but stopping too soon in alcohol dependence or refeeding leaves the patient exposed to Wernicke's encephalopathy, which is preventable and often irreversible.",
    offset: "Half-life is short (about 5 h) but tissue stores are what matter; body stores last only 2–3 weeks without intake.",
    taper: [
      "Complete high-dose parenteral treatment (for example Pabrinex for 3–5 days) then step down to oral thiamine, rather than stopping.",
      "Continue oral thiamine through refeeding and on discharge in alcohol dependence.",
      "Always give thiamine before glucose loading in a patient at risk.",
    ],
    monitoring: ["Ocular signs, ataxia and confusion; phosphate, magnesium and potassium during refeeding."],
  },
  "piperacillin-tazobactam": {
    slug: "piperacillin-tazobactam",
    risk: "low",
    why: "No withdrawal syndrome. Stopping is an antimicrobial stewardship decision: too early risks relapse, too late drives resistance, C. difficile and toxicity.",
    offset: "Half-life 1 h, prolonged in renal impairment; effect gone within hours of the last dose.",
    taper: [
      "Stop at the end of the indicated course (commonly 5–7 days for most ICU infections) — antibiotics are stopped, never tapered.",
      "Use the daily review, culture results and a falling procalcitonin or CRP with clinical improvement to justify stopping.",
      "De-escalate to a narrower agent rather than continuing broad cover once sensitivities are known.",
    ],
    monitoring: [
      "Temperature, white cell count, CRP and cultures for relapse over 48–72 h after stopping.",
      "Full blood count (neutropenia with prolonged courses), liver function, sodium load and renal function; new diarrhoea means C. difficile testing.",
    ],
  },
  meropenem: {
    slug: "meropenem",
    risk: "low",
    why: "No withdrawal. The stewardship imperative is stronger still: prolonged carbapenem exposure selects resistant Gram-negative organisms.",
    offset: "Half-life 1 h (longer in renal failure), with time-above-MIC the determinant of effect.",
    taper: [
      "Stop at the end of a defined course; de-escalate as soon as sensitivities allow.",
      "Do not extend the course for a persistently raised CRP alone — look for undrained source or a new focus.",
      "Adjust dose or interval for renal function and RRT rather than stopping and restarting.",
    ],
    monitoring: [
      "Clinical response and cultures for 48–72 h after stopping; seizure risk while on treatment.",
      "Full blood count, liver and renal function; valproate levels are reduced by meropenem and take days to recover after stopping.",
    ],
  },
  vancomycin: {
    slug: "vancomycin",
    risk: "low",
    why: "No withdrawal. The kinetic issue after stopping is a long tail in renal impairment, with ongoing nephrotoxic potential after the last dose.",
    offset: "Half-life 4–6 h normally but 3–5 days in severe renal failure, so levels persist long after the prescription ends.",
    taper: [
      "Stop at the end of the course; do not taper.",
      "Check a level before the final dose in renal impairment — a therapeutic or high trough may mean the next dose is unnecessary.",
      "Consider oral vancomycin separately for C. difficile — it is not a continuation of the intravenous course.",
    ],
    monitoring: [
      "Trough or AUC-guided levels, creatinine and urine output during treatment and for 48 h after the last dose.",
      "Hearing and vestibular symptoms with prolonged courses; full blood count.",
    ],
  },
  ceftriaxone: {
    slug: "ceftriaxone",
    risk: "low",
    why: "No withdrawal. Long half-life allows once-daily dosing, so the drug persists for over a day after the last dose.",
    offset: "Half-life 6–9 h with high protein binding; therapeutic concentrations persist ~24 h after a dose.",
    taper: [
      "Complete the indicated course (for example 7–10 days for bacterial meningitis depending on organism) and stop.",
      "Switch to oral therapy where the indication and organism allow, rather than prolonging intravenous treatment.",
      "Avoid calcium-containing infusions through the same line for 48 h after the last dose in neonates.",
    ],
    monitoring: ["Clinical response, full blood count, liver function and bilirubin; gallbladder symptoms with prolonged use; C. difficile surveillance."],
  },
  "co-trimoxazole": {
    slug: "co-trimoxazole",
    risk: "moderate",
    why: "No withdrawal, but stopping treatment-dose therapy for Pneumocystis or Nocardia before the course completes causes relapse — and prophylaxis must continue while immunosuppression persists.",
    offset: "Half-life 10–12 h (trimethoprim) and 9–11 h (sulfamethoxazole), prolonged in renal impairment.",
    taper: [
      "Treatment-dose PCP: complete 21 days, then step down to secondary prophylaxis rather than stopping.",
      "Continue prophylaxis while the CD4 count is low or immunosuppression continues; stop only after specialist review.",
      "Stop immediately for severe rash, hyperkalaemia or marrow suppression, and record the reaction.",
    ],
    monitoring: [
      "Potassium, creatinine, full blood count and liver function at least twice weekly; folate.",
      "Rash surveillance; relapse of the treated infection after any early stop.",
    ],
  },
  aciclovir: {
    slug: "aciclovir",
    risk: "low",
    why: "No withdrawal, but stopping before the course completes in herpes encephalitis risks relapse and permanent neurological injury.",
    offset: "Half-life 2–3 h normally and up to 20 h in renal failure; intracellular effect is short-lived.",
    taper: [
      "Complete 14–21 days for herpes simplex encephalitis before stopping, guided by repeat CSF PCR where available.",
      "Do not stop for a rising creatinine — reduce the dose or interval and increase the hydration.",
      "Prophylactic and suppressive courses are stopped after specialist review, not on the ICU round.",
    ],
    monitoring: [
      "Creatinine and urine output daily (crystal nephropathy); neurological status; full blood count.",
      "Neurotoxicity — confusion, myoclonus and hallucinations in renal impairment, which resolve over days after stopping.",
    ],
  },
};

/** Number of drugs with withdrawal guidance. */
export const icuDrugWithdrawalCount = Object.keys(icuDrugWithdrawal).length;

export const withdrawalRiskLabel: Record<WithdrawalRisk, string> = {
  high: "High withdrawal/rebound risk",
  moderate: "Moderate withdrawal/rebound risk",
  low: "Low withdrawal risk",
  none: "No withdrawal syndrome",
};

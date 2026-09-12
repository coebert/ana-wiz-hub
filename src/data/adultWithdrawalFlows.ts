/**
 * Adult ICU withdrawal and weaning flows.
 *
 * Sedation, analgesia, neuromuscular blockade and vasoactive weaning for the
 * three commonest adult ICU trajectories (septic shock, ARDS, neurocritical
 * care). Drug slugs match src/data/icuDrugSafety.ts / icuDrugWithdrawal.ts so
 * every entry links to its full withdrawal guide, drug card, mechanism page
 * and adult dose row; `calcDrug` matches src/data/icuInfusions.ts so a taper
 * step can be turned straight into a pump rate.
 *
 * Revision aid only — follow the BNF/SPC, the PADIS 2018 recommendations and
 * your local sedation, delirium and vasoactive weaning bundles before
 * changing a prescription.
 */

export interface AdultWithdrawalDrug {
  /** Display name, matching the ICU dosing table. */
  name: string;
  /** Slug shared with the safety, mechanism, withdrawal and card data; empty when no page exists. */
  slug: string;
  /** Drug class shown as a chip. */
  drugClass: string;
  /** Elimination half-life and how context-sensitive it is. */
  halfLife: string;
  /** When to start stepping down, expressed against the half-life. */
  timing: string;
  /** Concrete tapering steps. */
  taper: string[];
  /** What tells you the wean is going wrong. */
  monitoring: string[];
  /** What to do if withdrawal or rebound declares itself. */
  rescue: string;
  /** Infusion name for the ICU calculator, when the drug is run as an infusion. */
  calcDrug?: string;
}

export interface AdultWithdrawalFlow {
  id: string;
  title: string;
  blurb: string;
  readiness: string[];
  phases: { title: string; timeframe: string; actions: string[]; pitfall?: string }[];
  drugs: AdultWithdrawalDrug[];
  scores: string[];
  rescue: string[];
  caseQuery: string;
  caseLabel: string;
  topicPaths: { label: string; path: string }[];
}

export const adultWithdrawalFlows: AdultWithdrawalFlow[] = [
  {
    id: "adult-sepsis-wean",
    title: "Septic shock — vasoactive and sedation wean",
    blurb:
      "In adult septic shock the vasoactives come off first and fast, sedation comes off next by daily interruption or nurse-led titration, and the opioid comes off last. Most iatrogenic withdrawal and most ICU delirium in this group is created in the 5–10 days of opioid and benzodiazepine infusion that follow the shock rather than by the shock itself.",
    readiness: [
      "Shock resolved: lactate normalised, MAP ≥ 65 mmHg on a falling vasopressor dose, urine output > 0.5 mL/kg/h and no fluid bolus for 6–12 h",
      "Source controlled and antibiotics rationalised, with no new organ failure in the last 12 h",
      "Cumulative sedative exposure known — total midazolam, propofol and opioid days set the size of each taper step",
      "A spontaneous awakening and breathing trial is being attempted daily as part of the ABCDEF bundle",
    ],
    phases: [
      {
        title: "Wean the vasoactives",
        timeframe: "First 6–24 h of recovery",
        actions: [
          "Reduce noradrenaline in 0.02–0.05 mcg/kg/min steps every 15–30 minutes against a MAP target of ≥ 65 mmHg (higher only if chronically hypertensive) — its 2–2.5 minute half-life means each step reaches steady state within minutes.",
          "Wean vasopressin last or second-to-last: stopping it before noradrenaline causes rebound hypotension in about a third of patients, so come down in 0.01 unit/min steps with the noradrenaline syringe ready.",
          "Stop hydrocortisone only after 24 h of catecholamine independence; taper over 2–3 days if it ran beyond 5–7 days.",
          "Reduce dobutamine or milrinone in 2.5 mcg/kg/min or 0.125 mcg/kg/min steps with echo or cardiac output guidance — milrinone's 2–4 h half-life is prolonged in renal failure so effects outlast the pump.",
          "Keep the central line and a made-up syringe for 6 h after the last vasopressor stops.",
        ],
        pitfall:
          "Weaning steroid and catecholamine on the same day — if the patient destabilises you cannot separate adrenal insufficiency from recurrent sepsis.",
      },
      {
        title: "Convert deep sedation to light, targeted sedation",
        timeframe: "Day 1–3 after shock resolves",
        actions: [
          "Set an explicit RASS target of 0 to −1 and chart it 4-hourly; deep sedation is no longer the goal once the shock has resolved.",
          "Stop any neuromuscular blocker first and confirm return of movement and train-of-four before reducing sedation, so agitation and pain are not masked.",
          "Move from benzodiazepine to propofol or dexmedetomidine — the PADIS recommendation for a shorter time to extubation and less delirium.",
          "Wean one agent at a time with 12–24 h between agents so any agitation has an unambiguous cause, and treat pain first (analgesia-first sedation).",
          "Screen for delirium 12-hourly with CAM-ICU or ICDSC, and mobilise early — sedation weaning and delirium prevention are the same intervention.",
        ],
      },
      {
        title: "Structured opioid and benzodiazepine taper",
        timeframe: "Day 3 onward, over 3–10 days",
        actions: [
          "Infusion for < 5 days: reduce by 20–25% per day. 5–10 days: 10–20% per day. > 10 days: 10% per day with a withdrawal assessment before each step.",
          "Convert to enteral equivalents once the gut works — fentanyl or morphine infusion to regular oral morphine (or methadone for very long exposures), midazolam to enteral diazepam or lorazepam using local equivalence tables.",
          "Hold the next reduction rather than reversing it if withdrawal appears, and reduce again only after 12–24 h of stability.",
          "Keep a written, dated taper plan with a stop date and explicit rescue instructions so the ward can continue it.",
          "Add clonidine or dexmedetomidine as the sparing agent before withdrawal declares itself, not after.",
        ],
        pitfall:
          "Treating withdrawal agitation with escalating boluses of the drug being weaned — this resets tolerance and lengthens the whole wean.",
      },
    ],
    drugs: [
      {
        name: "Noradrenaline",
        slug: "noradrenaline",
        drugClass: "α₁ vasopressor",
        halfLife: "2–2.5 min — cleared by COMT/MAO and neuronal uptake, unaffected by organ failure",
        timing: "Step down every 15–30 min; several half-lives pass between steps so the blood pressure you see is steady state.",
        taper: [
          "0.02–0.05 mcg/kg/min reductions against a MAP target, not a fixed rate schedule.",
          "Wean to off before removing the central line; extravasation risk falls as the dose falls.",
        ],
        monitoring: [
          "Invasive arterial pressure, lactate trend and peripheral perfusion through each step.",
          "Urine output and conscious level as the end-organ signals.",
        ],
        rescue:
          "Rebound hypotension: return to the previous rate, give a fluid challenge only if fluid-responsive, and echo for missed myocardial dysfunction or unrecognised source.",
        calcDrug: "Noradrenaline (norepinephrine)",
      },
      {
        name: "Vasopressin",
        slug: "vasopressin",
        drugClass: "V₁ receptor vasopressor",
        halfLife: "10–20 min, prolonged in hepatic impairment",
        timing: "Wean after or alongside noradrenaline, in 0.01 unit/min steps every 30–60 min.",
        taper: [
          "Do not stop the fixed-rate infusion abruptly — a third of patients develop clinically significant rebound hypotension.",
          "Have noradrenaline immediately available for the 60 min after it stops.",
        ],
        monitoring: ["MAP and noradrenaline requirement for 1–2 h after each step.", "Sodium, urine output and digital perfusion."],
        rescue: "Hypotension after cessation: restart at 0.01–0.03 unit/min or increase noradrenaline, then re-attempt the wean 12 h later.",
        calcDrug: "Vasopressin",
      },
      {
        name: "Hydrocortisone",
        slug: "hydrocortisone",
        drugClass: "Glucocorticoid",
        halfLife: "Plasma 1.5–2 h, biological effect 8–12 h — HPA suppression outlasts both",
        timing: "Start the taper only 24 h after catecholamine independence; suppression is likely after 5–7 days of treatment.",
        taper: ["≤ 5 days of treatment: stop outright.", "> 5–7 days: halve the daily dose each day down to physiological replacement, then stop."],
        monitoring: ["Blood pressure, glucose and sodium after each reduction.", "A 9 am cortisol if hypotension or hypoglycaemia recurs."],
        rescue: "Suspected adrenal crisis: 100 mg hydrocortisone, fluid and glucose, then re-taper more slowly.",
      },
      {
        name: "Midazolam",
        slug: "midazolam",
        drugClass: "Benzodiazepine",
        halfLife: "2–6 h, but the context-sensitive half-time runs to days after prolonged infusion; the active α-hydroxymidazolam glucuronide accumulates in renal failure",
        timing: "Expect a 12–24 h lag between a step and its full effect after long infusions, so wean no faster than daily.",
        taper: [
          "10–20% per day, 10% per day beyond 10 days of infusion.",
          "Convert to enteral diazepam or lorazepam once absorbing, using local equivalence tables.",
        ],
        monitoring: ["RASS and CAM-ICU 12-hourly; tremor, sweating, tachycardia and hallucinations as withdrawal markers.", "Renal function, which predicts metabolite accumulation."],
        rescue: "Withdrawal syndrome: give a single rescue dose, hold the taper 24 h, add clonidine or dexmedetomidine, then resume at half the step size.",
        calcDrug: "Midazolam",
      },
      {
        name: "Propofol",
        slug: "propofol",
        drugClass: "GABA-A sedative",
        halfLife: "Context-sensitive half-time 10–30 min even after days of infusion — a fast, predictable offset",
        timing: "Reduce and reassess within 15–30 min; the agent of choice when a rapid awakening trial is wanted.",
        taper: ["25% reductions towards a RASS of 0 to −1, then off before extubation.", "Watch the lipid and calorie load and the total daily dose (< 4 mg/kg/h) to avoid propofol infusion syndrome."],
        monitoring: ["RASS, blood pressure and triglycerides.", "Lactate, pH, CK and ECG if the infusion has been prolonged or high-dose."],
        rescue: "Agitation on reduction: exclude pain, hypoxia, hypercapnia, full bladder and withdrawal before returning to the previous rate.",
        calcDrug: "Propofol 1%",
      },
      {
        name: "Fentanyl",
        slug: "fentanyl",
        drugClass: "Opioid",
        halfLife: "3–4 h, with a steeply rising context-sensitive half-time after days of infusion and accumulation in fat",
        timing: "Taper last, over 5–10 days after prolonged exposure, keeping a rescue dose for procedures.",
        taper: [
          "Convert to regular oral morphine (or methadone for exposures beyond 10–14 days), then reduce 10–20% per day.",
          "Retain a procedural bolus for suctioning, physiotherapy and dressings throughout the taper.",
        ],
        monitoring: ["Pain score (CPOT or NRS), withdrawal features, bowel function and pupil size.", "Respiratory rate and CO₂ after extubation."],
        rescue: "Opioid withdrawal: give a rescue dose, hold the taper, add clonidine 25–75 mcg 8-hourly, then resume more slowly.",
        calcDrug: "Fentanyl",
      },
      {
        name: "Dexmedetomidine",
        slug: "dexmedetomidine",
        drugClass: "α₂ agonist",
        halfLife: "2–3 h; sympathetic rebound 6–24 h after abrupt cessation",
        timing: "Use as the bridge while opioid and benzodiazepine come down, then taper over 24–48 h.",
        taper: ["Reduce 0.1–0.2 mcg/kg/h every 6–12 h.", "Bridge to enteral clonidine for the ward phase after infusions beyond 3–5 days."],
        monitoring: ["Heart rate and blood pressure (bradycardia, then rebound hypertension).", "Agitation, sleep pattern and delirium scores."],
        rescue: "Rebound hypertension or agitation: restart at the last tolerated rate or give clonidine, then re-taper slowly.",
        calcDrug: "Dexmedetomidine",
      },
    ],
    scores: [
      "RASS 4-hourly against a documented target of 0 to −1",
      "CPOT or a numerical pain score before and after each opioid reduction",
      "CAM-ICU or ICDSC 12-hourly through the wean",
      "MAP, lactate and vasopressor dose charted around each vasoactive step",
      "Daily spontaneous awakening and breathing trial results",
    ],
    rescue: [
      "Hypotension recurring after every vasopressor reduction: re-echo, re-culture and reconsider source control before persisting with the wean.",
      "Agitation on every sedation step: exclude pain, hypoxia, hypercapnia, retention, alcohol and nicotine withdrawal and delirium before increasing sedation.",
      "Failed extubation twice: reassess diaphragm function, fluid balance and delirium, and discuss tracheostomy rather than re-sedating deeply.",
    ],
    caseQuery: "sepsis",
    caseLabel: "Adult septic shock cases",
    topicPaths: [
      { label: "ICU management flows", path: "/intensive-care/management-flows" },
      { label: "ICU nursing protocols", path: "/intensive-care/nursing-protocols" },
    ],
  },
  {
    id: "adult-ards-wean",
    title: "ARDS — paralysis, sedation and ventilation wean",
    blurb:
      "In ARDS the order is fixed by physiology: prone positioning and neuromuscular blockade come off first, then deep sedation as lung compliance improves and the patient can tolerate a spontaneous mode, then the opioid and any benzodiazepine over days. Weaning sedation before the lung is ready produces asynchrony, self-induced lung injury and a failed extubation.",
    readiness: [
      "P/F ratio > 200 on FiO₂ ≤ 0.5 with PEEP ≤ 10 cmH₂O and a plateau pressure < 30 cmH₂O",
      "Driving pressure < 15 cmH₂O and improving compliance over 24 h",
      "No prone session needed in the last 24 h, and vasopressors weaning or stopped",
      "No new sepsis, and fluid balance negative or neutral",
    ],
    phases: [
      {
        title: "Stop the paralysis and the prone cycles",
        timeframe: "First 24–48 h of improvement",
        actions: [
          "Stop cisatracurium or rocuronium once the P/F ratio is above 150–200 and prone positioning has ended; there is no evidence for continuing beyond 48 h.",
          "Confirm full reversal with train-of-four (four equal twitches) before touching sedation — residual blockade in a lightly sedated patient is awareness.",
          "Keep sedation deep until blockade has clearly worn off, then reduce it, not the other way round.",
          "Rocuronium can be reversed with sugammadex if urgent neurological assessment is needed; cisatracurium cannot — plan for Hofmann elimination over 30–60 min instead.",
        ],
        pitfall: "Lightening sedation while blockade persists — the commonest route to awareness and paralysis in ARDS.",
      },
      {
        title: "Lighten sedation to allow a spontaneous mode",
        timeframe: "Day 2–5 of improvement",
        actions: [
          "Convert benzodiazepine to propofol or dexmedetomidine so RASS 0 to −1 becomes achievable with a fast offset.",
          "Reduce propofol in 25% steps and watch respiratory rate, tidal volume and driving pressure — accept a rate of 20–30/min if the tidal volume stays near 6 mL/kg predicted body weight.",
          "Move to pressure support and run a daily spontaneous breathing trial once FiO₂ ≤ 0.4 and PEEP ≤ 8 cmH₂O.",
          "Continue lung-protective targets during the wean: excessive effort and large spontaneous tidal volumes are patient self-inflicted lung injury.",
        ],
        pitfall:
          "Chasing a comfortable respiratory rate with more sedation — this converts a weanable patient into another week of ventilation.",
      },
      {
        title: "Taper the opioid, benzodiazepine and adjuncts",
        timeframe: "Day 5 onward, over 3–10 days",
        actions: [
          "Reduce opioid 10–20% per day, keeping a procedural bolus for suction and physiotherapy; convert to enteral morphine or methadone after long exposures.",
          "Taper any benzodiazepine 10% per day after > 10 days of infusion, converting to enteral diazepam or lorazepam.",
          "Wean dexmedetomidine over 24–48 h and bridge to clonidine if it has run for days.",
          "Stop pulmonary vasodilators (inhaled nitric oxide, nebulised epoprostenol) in stepwise reductions — abrupt cessation causes rebound pulmonary hypertension and desaturation.",
          "Continue early mobilisation and physiotherapy through the taper; ICU-acquired weakness is the limiting factor in ARDS recovery.",
        ],
      },
    ],
    drugs: [
      {
        name: "Cisatracurium",
        slug: "atracurium-cisatracurium",
        drugClass: "Benzylisoquinolinium neuromuscular blocker",
        halfLife: "22–35 min — organ-independent Hofmann elimination and ester hydrolysis, so no accumulation in renal or hepatic failure",
        timing: "Stop outright rather than taper; expect full recovery of the train-of-four within 30–90 min of stopping.",
        taper: [
          "No taper: stop the infusion when P/F > 150–200 and proning has ended.",
          "Do not restart for asynchrony alone — treat with sedation, mode change and lung-protective settings first.",
        ],
        monitoring: ["Train-of-four to confirm four equal twitches before lightening sedation.", "Depth-of-anaesthesia monitoring or a deep RASS target while blockade continues.", "CK and daily assessment for ICU-acquired weakness."],
        rescue: "Persistent paralysis beyond 2 h: check acid–base, temperature and magnesium (all slow Hofmann elimination) and keep sedation deep until twitches return.",
      },
      {
        name: "Rocuronium",
        slug: "rocuronium",
        drugClass: "Aminosteroid neuromuscular blocker",
        halfLife: "1–2 h, markedly prolonged in hepatic and renal impairment",
        timing: "Stop and allow spontaneous recovery, guided by train-of-four rather than by the clock.",
        taper: ["No taper — stop the infusion once proning and severe asynchrony have resolved.", "Sugammadex 2–4 mg/kg reverses it if urgent assessment is required."],
        monitoring: ["Train-of-four, tidal volume and cough return.", "Renal and hepatic function, which predict how long recovery takes."],
        rescue: "Prolonged blockade: maintain sedation and ventilation, correct hypothermia, acidosis and magnesium, and reverse with sugammadex if assessment cannot wait.",
      },
      {
        name: "Propofol",
        slug: "propofol",
        drugClass: "GABA-A sedative",
        halfLife: "Context-sensitive half-time 10–30 min; offset stays fast even after prolonged infusion",
        timing: "The sedation to wean against a breathing trial: reduce 25% and reassess within 30 min.",
        taper: ["25% reductions towards RASS 0 to −1, off before extubation.", "Keep the total dose < 4 mg/kg/h and watch triglycerides, lactate, pH, CK and ECG."],
        monitoring: ["Respiratory rate, tidal volume per kg predicted body weight and driving pressure through each reduction.", "Blood pressure and triglycerides."],
        rescue: "Tachypnoea with tidal volumes > 8 mL/kg PBW: return to the previous rate, optimise the mode and PEEP, and re-attempt in 6–12 h.",
        calcDrug: "Propofol 1%",
      },
      {
        name: "Fentanyl",
        slug: "fentanyl",
        drugClass: "Opioid",
        halfLife: "3–4 h, with a long context-sensitive half-time and fat accumulation after days of infusion",
        timing: "Taper after the sedative, over 5–10 days, since opioid is what makes the tube tolerable.",
        taper: ["Reduce 10–20% per day; convert to enteral morphine or methadone after prolonged exposure.", "Keep a procedural bolus for suctioning and physiotherapy."],
        monitoring: ["CPOT or NRS pain scores, respiratory rate and CO₂.", "Withdrawal features and bowel function."],
        rescue: "Withdrawal with tachypnoea: give a rescue dose, hold the taper, add clonidine, and resume at half the step size.",
        calcDrug: "Fentanyl",
      },
      {
        name: "Morphine",
        slug: "morphine",
        drugClass: "Opioid",
        halfLife: "2–4 h, but morphine-6-glucuronide is active and accumulates markedly in renal impairment",
        timing: "Assume a 12–24 h lag between step and effect if there is any renal dysfunction.",
        taper: ["10–20% per day, converting to regular oral morphine once absorbing.", "Prefer fentanyl or alfentanil if renal function is poor or worsening."],
        monitoring: ["Sedation score, respiratory rate, pupils and renal function.", "Pain scores before and after each step."],
        rescue: "Excess sedation or respiratory depression: hold the infusion, support ventilation, and use naloxone only for life-threatening depression, titrated in 40–100 mcg increments.",
      },
      {
        name: "Midazolam",
        slug: "midazolam",
        drugClass: "Benzodiazepine",
        halfLife: "2–6 h nominal; days after prolonged infusion, with active metabolite accumulation in renal failure",
        timing: "Wean daily at most, and only after the paralysis has fully worn off.",
        taper: ["10–20% per day; 10% per day beyond 10 days of infusion.", "Convert to enteral diazepam or lorazepam once the gut works."],
        monitoring: ["RASS, CAM-ICU and autonomic withdrawal features.", "Renal function and the daily awakening trial result."],
        rescue: "Withdrawal or agitation: single rescue dose, hold the taper 24 h, add clonidine or dexmedetomidine, then resume at half the step size.",
        calcDrug: "Midazolam",
      },
      {
        name: "Dexmedetomidine",
        slug: "dexmedetomidine",
        drugClass: "α₂ agonist",
        halfLife: "2–3 h; rebound hypertension and agitation 6–24 h after abrupt cessation",
        timing: "Introduce as the bridge for the spontaneous breathing trial phase; taper over 24–48 h.",
        taper: ["0.1–0.2 mcg/kg/h reductions every 6–12 h.", "Bridge to enteral clonidine after infusions beyond 3–5 days."],
        monitoring: ["Heart rate, blood pressure and sedation depth.", "Respiratory pattern — it preserves respiratory drive, which is the point during weaning."],
        rescue: "Rebound tachycardia and hypertension: restart at the last tolerated rate or give clonidine, then re-taper.",
        calcDrug: "Dexmedetomidine",
      },
    ],
    scores: [
      "P/F ratio, PEEP, plateau pressure and driving pressure before and after each sedation step",
      "Tidal volume in mL/kg predicted body weight during spontaneous modes",
      "Train-of-four until blockade has clearly resolved",
      "RASS, CPOT and CAM-ICU with a documented target",
      "Daily spontaneous breathing trial outcome and cuff-leak/secretion assessment before extubation",
    ],
    rescue: [
      "Desaturation or rising driving pressure on every reduction: return to the previous settings, re-image, and consider recruitment, proning or fluid removal rather than more sedation.",
      "Severe asynchrony: change mode and optimise trigger and PEEP first; reserve renewed neuromuscular blockade for refractory hypoxaemia with a P/F < 150.",
      "Repeated extubation failure: assess diaphragm function, delirium and secretion load, and discuss tracheostomy early.",
    ],
    caseQuery: "ards",
    caseLabel: "Adult ARDS and respiratory failure cases",
    topicPaths: [
      { label: "ICU management flows", path: "/intensive-care/management-flows" },
      { label: "ICU drug cards", path: "/intensive-care/drug-cards" },
    ],
  },
  {
    id: "adult-neuro-wean",
    title: "Neurocritical care — sedation hold and neuroprotection wean",
    blurb:
      "After traumatic brain injury, subarachnoid haemorrhage or status epilepticus the wean is dominated by intracranial pressure and by the need for a meaningful neurological examination. Sedation is reduced in small, monitored steps around ICP and CPP, osmotherapy and anticonvulsants are managed separately, and thiopentone can keep a patient unresponsive for days after it stops.",
    readiness: [
      "ICP consistently < 20 mmHg and CPP 60–70 mmHg for 24 h without escalating therapy",
      "No osmotherapy bolus needed for 12–24 h and sodium within the target range",
      "Imaging stable, no untreated surgical lesion, and seizures controlled",
      "Temperature, CO₂ and sodium targets achievable without deep sedation",
    ],
    phases: [
      {
        title: "Wean the tier-three therapies first",
        timeframe: "First 24–48 h of ICP stability",
        actions: [
          "Come off thiopentone before other sedation, and expect zero-order kinetics: unresponsiveness may persist 48–72 h after the infusion stops.",
          "Stop therapeutic hypothermia and rewarm at 0.25 °C/h or slower — fast rewarming raises ICP and causes hyperkalaemia and hypotension.",
          "Reduce osmotherapy stepwise, keeping sodium within target; abrupt cessation of hypertonic saline causes rebound cerebral oedema.",
          "Relax mild hyperventilation slowly, allowing PaCO₂ to rise 0.5 kPa at a time with ICP charted at each step.",
        ],
        pitfall: "Prognosticating during thiopentone persistence — drug effect and brain injury look identical for up to 72 h.",
      },
      {
        title: "Structured sedation holds for neurological assessment",
        timeframe: "Day 2–5 of ICP stability",
        actions: [
          "Use propofol and short-acting opioid as the sedation of choice so a window can be opened and closed within 30 minutes.",
          "Reduce by 25% and chart ICP, CPP and pupils at baseline, 15 min and 1 h; abandon the step if ICP exceeds 20 mmHg for more than 5 minutes.",
          "Confirm neuromuscular blockade has fully worn off, and keep antiseizure medication running throughout the hold.",
          "Keep the head-up position, normocapnia, normothermia and sodium targets stable during holds so ICP changes are attributable to sedation alone.",
        ],
      },
      {
        title: "Taper the long-acting agents and plan rehabilitation",
        timeframe: "Day 5 onward, over 5–10 days",
        actions: [
          "Taper opioid and benzodiazepine 10–20% per day (10% beyond 10 days), converting to enteral morphine or methadone and diazepam once absorbing.",
          "Add clonidine or dexmedetomidine to allow an arousable patient, and bridge dexmedetomidine to enteral clonidine for the rehabilitation phase.",
          "Treat paroxysmal sympathetic hyperactivity with gabapentin, propranolol and clonidine rather than escalating benzodiazepines.",
          "Review antiseizure prophylaxis at 7 days rather than continuing indefinitely; any change waits until sedation is stable, and levetiracetam and phenytoin are reduced with neurology input rather than stopped abruptly.",
          "Screen and treat agitation and delirium with a structured protocol as sedation comes off — it is the commonest barrier to rehabilitation.",
        ],
        pitfall: "Stopping the anticonvulsant and the sedative in the same 24 h — a withdrawal seizure then has two possible causes.",
      },
    ],
    drugs: [
      {
        name: "Thiopentone",
        slug: "",
        drugClass: "Barbiturate",
        halfLife: "Zero-order kinetics at ICU doses; elimination half-life 6–12 h rising to days, with fat accumulation after prolonged infusion",
        timing: "Stop rather than taper, then wait: EEG burst suppression and unresponsiveness can persist 48–72 h.",
        taper: [
          "Stop once ICP has been controlled for 24 h and EEG burst suppression is no longer required.",
          "Continue full supportive care and do not attempt prognostication until the drug has cleared.",
        ],
        monitoring: ["Continuous EEG, ICP, CPP and pupils.", "Blood pressure and vasopressor need (myocardial depression), temperature, white cell count and potassium."],
        rescue: "Prolonged unresponsiveness: assume drug persistence, support and re-examine daily rather than concluding a poor neurological outcome.",
      },
      {
        name: "Propofol",
        slug: "propofol",
        drugClass: "GABA-A sedative",
        halfLife: "Context-sensitive half-time 10–30 min — the fast offset is what makes neurological windows possible",
        timing: "Reduce and reassess within 15–30 min, then restore depth if ICP rises.",
        taper: [
          "25% reductions with ICP, CPP and pupils charted at 15 min and 1 h.",
          "Keep the dose below 4 mg/kg/h and watch for propofol infusion syndrome during long neuro-sedation.",
        ],
        monitoring: ["ICP, CPP, pupils and cough during reductions.", "Lactate, pH, CK, triglycerides and ECG while infusing."],
        rescue: "ICP > 20 mmHg for > 5 min: return to the previous rate, confirm CO₂, sodium and position, and delay the next attempt 6–12 h.",
        calcDrug: "Propofol 1%",
      },
      {
        name: "Fentanyl",
        slug: "fentanyl",
        drugClass: "Opioid",
        halfLife: "3–4 h, with a steeply rising context-sensitive half-time after days of infusion",
        timing: "Keep running until ICP monitoring stops; taper last, over 5–10 days.",
        taper: [
          "Convert to enteral morphine or methadone, then 10–20% per day.",
          "Maintain a rescue bolus for suction, physiotherapy and dressing changes throughout.",
        ],
        monitoring: ["ICP response to stimulation, pain scores and gut function.", "Respiratory rate and CO₂ after extubation — hypercapnia raises ICP."],
        rescue: "Withdrawal with agitation after brain injury: add clonidine, and consider gabapentin and propranolol if sympathetic hyperactivity is the driver.",
        calcDrug: "Fentanyl",
      },
      {
        name: "Midazolam",
        slug: "midazolam",
        drugClass: "Benzodiazepine",
        halfLife: "2–6 h nominal, days after prolonged infusion; active metabolite accumulates in renal failure",
        timing: "Step every 12–24 h in the ICP-sensitive phase so a rise can be attributed correctly.",
        taper: ["10–20% per day, 10% per day beyond 10 days.", "Convert to enteral diazepam or lorazepam, keeping the anticonvulsant plan separate."],
        monitoring: ["ICP/CPP and pupils around each step; withdrawal features once monitoring stops.", "EEG if seizures were the indication."],
        rescue: "Withdrawal seizure or ICP surge: restore the previous dose, treat the seizure, and halve the next reduction.",
        calcDrug: "Midazolam",
      },
      {
        name: "Dexmedetomidine",
        slug: "dexmedetomidine",
        drugClass: "α₂ agonist",
        halfLife: "2–3 h; sympathetic rebound 6–24 h after abrupt cessation",
        timing: "Introduce once ICP monitoring stops and an arousable patient is the goal; taper over 24–48 h.",
        taper: ["0.1–0.2 mcg/kg/h reductions every 6–12 h.", "Bridge to enteral clonidine for rehabilitation."],
        monitoring: ["Heart rate (bradycardia), blood pressure and CPP if still monitored.", "Agitation, sleep pattern and delirium scores."],
        rescue: "Rebound hypertension after brain injury is not benign: restart at the last tolerated rate or give clonidine and re-taper slowly.",
        calcDrug: "Dexmedetomidine",
      },
      {
        name: "Hypertonic saline",
        slug: "hypertonic-saline",
        drugClass: "Osmotherapy",
        halfLife: "Effect 2–6 h per bolus; sodium clearance depends on renal function and the ADH state",
        timing: "Wean by lengthening the interval and lowering the sodium target in 2–3 mmol/L steps per day.",
        taper: [
          "Stop scheduled boluses first, keeping a rescue bolus prescription for ICP surges.",
          "Reduce the target sodium slowly — a rapid fall causes rebound cerebral oedema.",
        ],
        monitoring: ["Sodium and osmolality 6–12 hourly through the wean, plus chloride and acid–base.", "ICP, urine output and fluid balance."],
        rescue: "ICP surge as sodium falls: give a rescue bolus, return to the previous sodium target, and re-image before trying again.",
      },
      {
        name: "Levetiracetam",
        slug: "levetiracetam",
        drugClass: "Antiseizure (SV2A)",
        halfLife: "6–8 h, renally cleared — dose reduction rather than tapering is the renal adjustment",
        timing: "Maintain through the sedation wean; any change waits until sedation is stable.",
        taper: [
          "Do not stop abruptly — reduce over weeks with neurology input if prophylaxis is being withdrawn.",
          "Review post-traumatic seizure prophylaxis at 7 days rather than continuing indefinitely.",
        ],
        monitoring: ["Seizure recurrence, EEG if indicated, and behavioural change or irritability.", "Renal function and dose appropriateness."],
        rescue: "Seizure recurrence during the wean: reload, involve neurology, and defer further sedation reduction 24–48 h.",
      },
    ],
    scores: [
      "ICP, CPP and pupillary response before, 15 min after and 1 h after every sedation step",
      "GCS once sedation allows a meaningful examination, with sedation dose recorded alongside",
      "Continuous EEG where thiopentone, status epilepticus or burst suppression is involved",
      "Sodium, osmolality and temperature during osmotherapy and rewarming",
      "CAM-ICU and agitation scores once intracranial monitoring stops",
    ],
    rescue: [
      "Repeated ICP surges on any reduction: re-image, check sodium, CO₂ and seizure activity, and escalate to neurosurgery before persisting with the wean.",
      "Prolonged unresponsiveness after thiopentone: assume drug persistence for up to 72 h, support and re-examine rather than prognosticating.",
      "Paroxysmal sympathetic hyperactivity: treat with gabapentin, propranolol and clonidine, not escalating benzodiazepines.",
    ],
    caseQuery: "neuro",
    caseLabel: "Adult neurocritical care cases",
    topicPaths: [
      { label: "ICU management flows", path: "/intensive-care/management-flows" },
      { label: "ICU drug safety", path: "/intensive-care/drug-safety" },
    ],
  },
];

/** Link into the ICU infusion calculator with drug and weight pre-filled. */
export const adultCalculatorHref = (drug: string, weightKg: number) =>
  `/intensive-care/calculator?drug=${encodeURIComponent(drug)}&weight=${weightKg}`;

/**
 * Paediatric ICU withdrawal and weaning flows.
 *
 * Sedation, analgesia and vasoactive weaning for the three commonest PICU
 * trajectories (sepsis, PARDS, neurocritical care). Drug slugs match
 * src/data/icuDrugSafety.ts / icuDrugWithdrawal.ts so every entry can link
 * to its full withdrawal guide, mechanism page and paediatric dose row.
 *
 * Revision aid only — follow BNFc, local PICU sedation/withdrawal bundles
 * and the ESPNIC assessment recommendations before changing a prescription.
 */

export interface PaedWithdrawalDrug {
  /** Display name, matching the ICU dosing table. */
  name: string;
  /** Slug shared with the safety, mechanism and withdrawal data. */
  slug: string;
  /** Drug class shown as a chip. */
  drugClass: string;
  /** Age-banded elimination half-life and how context-sensitive it is. */
  halfLife: string;
  /** When to start stepping down, expressed against the half-life. */
  timing: string;
  /** Concrete tapering steps. */
  taper: string[];
  /** What tells you the wean is going wrong. */
  monitoring: string[];
  /** What to do if withdrawal or rebound declares itself. */
  rescue: string;
  /** Neonatal dose column instead of paediatric. */
  neonatal?: boolean;
}

export interface PaedWithdrawalFlow {
  id: string;
  title: string;
  blurb: string;
  /** When you are weaning in this trajectory. */
  readiness: string[];
  /** Ordered phases of the wean. */
  phases: { title: string; timeframe: string; actions: string[]; pitfall?: string }[];
  drugs: PaedWithdrawalDrug[];
  /** Scores and observations to chart through the wean. */
  scores: string[];
  rescue: string[];
  caseQuery: string;
  caseLabel: string;
  topicPaths: { label: string; path: string }[];
}

export const paedWithdrawalFlows: PaedWithdrawalFlow[] = [
  {
    id: "paed-sepsis-wean",
    title: "Septic shock — vasoactive and sedation wean",
    blurb:
      "In paediatric septic shock the vasoactives come off first and fast, the sedation comes off slowly and last. Most iatrogenic withdrawal in this group is created in the 5–10 days of opioid and benzodiazepine infusion that follow the shock, not by the shock itself.",
    readiness: [
      "Shock resolved: lactate normalised, capillary refill < 2–3 s, urine output > 1 mL/kg/h and no fluid boluses for 6–12 h",
      "Fever settling on source-controlled antibiotics, and no new organ failure in the last 12 h",
      "Cumulative sedative exposure known — total midazolam and morphine/fentanyl days drive the withdrawal plan",
    ],
    phases: [
      {
        title: "Wean the vasoactives",
        timeframe: "First 6–24 h of recovery",
        actions: [
          "Reduce noradrenaline or adrenaline in 10–20% steps every 15–30 minutes against age-specific perfusion pressure — catecholamine half-lives are 2–3 minutes so the effect of each step is visible within a few minutes.",
          "Wean the last vasoactive off before hydrocortisone: stop hydrocortisone only after 24 h of catecholamine independence, tapering over 2–3 days if given for more than 5–7 days.",
          "Keep the line and a made-up syringe for 6 h after the infusion stops — early rebound hypotension is common while capillary leak resolves.",
          "Stop milrinone stepwise (0.25 mcg/kg/min steps) and expect a lag: its 2–4 h half-life is prolonged in renal impairment, so effects persist well after the pump stops.",
        ],
        pitfall:
          "Weaning steroid and catecholamine together — if the child destabilises you cannot tell adrenal insufficiency from recurrent shock.",
      },
      {
        title: "Convert deep sedation to light, targeted sedation",
        timeframe: "Day 1–3 after shock resolves",
        actions: [
          "Set an explicit COMFORT-B target (11–17) or State Behavioural Scale target and chart it every 4 h; deep sedation is no longer the goal.",
          "Stop the neuromuscular blocker first and confirm return of spontaneous movement before touching sedation, so agitation is not masked.",
          "Wean one agent at a time — 12–24 h between agents — so any agitation has an unambiguous cause.",
          "Add or continue dexmedetomidine as the opioid/benzodiazepine sparing agent before starting the taper, not after withdrawal appears.",
        ],
      },
      {
        title: "Structured opioid and benzodiazepine taper",
        timeframe: "Day 3 onward, over 3–10 days",
        actions: [
          "Infusion for < 5 days: reduce by 20% per day. 5–10 days: 10–20% per day. > 10 days: 10% per day with a WAT-1 or SOS-PD score before each step.",
          "Convert to enteral equivalents once the gut works — morphine infusion to 4-hourly oral morphine, midazolam to enteral clonazepam or diazepam using local equipalgesic/equipotency tables.",
          "Hold the next reduction (do not reverse it) for a WAT-1 ≥ 3; reduce again only after 12–24 h of scores below threshold.",
          "Write the taper out as a dated plan the ward can continue, with a defined stop date and clear rescue instructions.",
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
        halfLife: "2–2.5 min — plasma clearance by COMT/MAO and neuronal uptake, unchanged in children",
        timing: "Step down every 15–30 min: several half-lives pass between steps so the blood pressure you see is the steady state.",
        taper: [
          "10–20% reductions against a perfusion-pressure target for age, not a fixed MAP.",
          "Wean to off before removing the central line; peripheral extravasation risk falls with the dose.",
        ],
        monitoring: [
          "Invasive or 5-minutely non-invasive blood pressure, capillary refill and lactate trend during the wean.",
          "Urine output and mental state as the true end-organ signals in children.",
        ],
        rescue: "Rebound hypotension: return to the previous rate, give 10 mL/kg balanced crystalloid if fluid-responsive, and echo for missed myocardial dysfunction.",
      },
      {
        name: "Adrenaline",
        slug: "adrenaline",
        drugClass: "β/α catecholamine",
        halfLife: "2–3 min, but the metabolic effects (lactate, glucose) outlast the pressor effect",
        timing: "Reduce in 0.02–0.05 mcg/kg/min steps every 20–30 min once perfusion is normal.",
        taper: [
          "Wean adrenaline before noradrenaline in cold shock that has converted to a normal cardiac output state.",
          "Expect the type-B lactate to fall as the infusion comes down — do not chase it with fluid.",
        ],
        monitoring: ["Heart rate for age, rhythm, glucose and lactate.", "Echo before the last reduction if myocardial dysfunction was documented."],
        rescue: "Recurrent cold shock: return to the last effective dose, reassess the source, and discuss ECMO with the retrieval service.",
      },
      {
        name: "Hydrocortisone",
        slug: "hydrocortisone",
        drugClass: "Glucocorticoid",
        halfLife: "Plasma 1.5–2 h, biological effect 8–12 h — HPA suppression outlasts both",
        timing: "Only start the taper 24 h after catecholamine independence; suppression is likely after 5–7 days of treatment.",
        taper: [
          "≤ 5 days of treatment: stop outright.",
          "> 5–7 days: halve the daily dose each day to a physiological replacement (8–10 mg/m²/day) then stop.",
        ],
        monitoring: ["Blood pressure, glucose, sodium and energy/feeding after each reduction.", "Consider a 9 am cortisol if hypotension or hypoglycaemia recurs."],
        rescue: "Suspected adrenal crisis: 2 mg/kg hydrocortisone bolus (max 100 mg), fluid and glucose, then re-taper more slowly.",
      },
      {
        name: "Midazolam",
        slug: "midazolam",
        drugClass: "Benzodiazepine",
        halfLife: "Child 1–4 h; neonate 6–12 h; prolonged in renal failure via active 1-OH-midazolam glucuronide",
        timing: "Because the active metabolite accumulates, withdrawal often appears 12–24 h after a step down — score before every reduction, not after.",
        taper: [
          "10–20% per day after 5–10 days; 10% per day after > 10 days.",
          "Convert to enteral clonazepam or diazepam once feeding, using local equivalence tables, then taper the enteral drug.",
          "Never stop a > 7 day midazolam infusion outright — withdrawal seizures are the feared end point.",
        ],
        monitoring: ["WAT-1 or SOS-PD before each reduction and 12-hourly.", "Watch for tremor, sweating, diarrhoea, poor sleep and inconsolability; seizures in abrupt cessation."],
        rescue: "WAT-1 ≥ 3: hold the taper, give a rescue benzodiazepine dose, and reduce the following step to 5–10%.",
      },
      {
        name: "Morphine",
        slug: "morphine",
        drugClass: "Opioid",
        halfLife: "Child 2–3 h; neonate 6–9 h; M6G accumulates in renal impairment",
        timing: "Neonatal clearance is a third of the child's — halve the taper rate under 44 weeks corrected age.",
        taper: [
          "Convert the infusion to 4-hourly enteral morphine at the same 24 h dose, then reduce 10–20% per day.",
          "Keep a written PRN rescue of 5–10% of the daily dose for breakthrough withdrawal.",
          "Treat constipation and pruritus through the wean — untreated, they look like withdrawal.",
        ],
        monitoring: ["WAT-1, COMFORT-B and sleep quality.", "Yawning, mydriasis, sneezing, loose stool and temperature instability as early opioid withdrawal signs."],
        rescue: "Escalating WAT-1 despite holds: add clonidine 1–3 mcg/kg 6-hourly enterally as a withdrawal-sparing agent and lengthen the taper.",
      },
      {
        name: "Dexmedetomidine",
        slug: "dexmedetomidine",
        drugClass: "α₂ agonist",
        halfLife: "2–3 h (longer in hepatic impairment); rebound follows the receptor, not the plasma level",
        timing: "After > 3 days of infusion taper over 24–48 h; abrupt cessation gives rebound tachycardia, hypertension and agitation at 6–24 h.",
        taper: [
          "Reduce by 0.1–0.2 mcg/kg/h every 6–12 h.",
          "Bridge to enteral clonidine (1–3 mcg/kg 6-hourly) when a long wean is needed or the child is leaving PICU.",
        ],
        monitoring: ["Heart rate and blood pressure for age 4-hourly during and 24 h after the wean.", "Agitation and sleep pattern."],
        rescue: "Rebound hypertension/agitation: restart at the last tolerated rate or give an enteral clonidine dose, then taper more slowly.",
      },
    ],
    scores: [
      "WAT-1 (Withdrawal Assessment Tool-1) 12-hourly and before every reduction — the validated PICU withdrawal score",
      "COMFORT-B 4-hourly for sedation depth (target 11–17 for light sedation)",
      "SOS-PD or CAP-D for delirium, which frequently coexists with and mimics withdrawal",
      "Cumulative midazolam and opioid days recorded on the chart — the strongest predictor of withdrawal",
    ],
    rescue: [
      "Withdrawal that fails a slowed taper: seek PICU pharmacy input, add clonidine, and consider a methadone conversion for opioid exposure beyond 2 weeks.",
      "Agitation with fever, tachycardia and clonus after several serotonergic drugs: consider serotonin syndrome rather than withdrawal.",
      "Seizure during a benzodiazepine wean: treat as status, restore the previous benzodiazepine dose, and image/EEG if focal or prolonged.",
    ],
    caseQuery: "sepsis",
    caseLabel: "Paediatric sepsis cases",
    topicPaths: [
      { label: "Paediatric intensive care", path: "/intensive-care/paediatric-icu" },
      { label: "Paediatric ICU flows", path: "/intensive-care/paediatric-flows" },
    ],
  },
  {
    id: "pards-wean",
    title: "PARDS — neuromuscular blocker, sedation and ventilation wean",
    blurb:
      "In paediatric ARDS the order is fixed: reverse the ventilation escalation, then the paralysis, then the sedation. Children ventilated for PARDS commonly accrue 7–14 days of infusion and are the highest-risk group in PICU for iatrogenic withdrawal syndrome.",
    readiness: [
      "Oxygenation index or OSI improving, FiO₂ ≤ 0.5–0.6 and PEEP ≤ 8–10 cmH₂O on lung-protective settings",
      "No prone positioning or inhaled pulmonary vasodilator escalation in the last 24 h",
      "Haemodynamically stable off or on minimal vasoactive support, and cumulative fluid balance turning negative",
    ],
    phases: [
      {
        title: "Stop the neuromuscular blocker and prove recovery",
        timeframe: "As soon as FiO₂ ≤ 0.6 and ventilator dyssynchrony is manageable",
        actions: [
          "Stop rocuronium or atracurium outright — these are cleared, not weaned; confirm train-of-four recovery and spontaneous movement before any sedation change.",
          "Expect slower recovery after > 48 h of infusion, in renal impairment (rocuronium), hypothermia, hypermagnesaemia and acidosis.",
          "Keep sedation and analgesia unchanged for at least 6–12 h after paralysis stops — an awake paralysed child is the classic never-event here.",
        ],
        pitfall:
          "Weaning sedation on the same day paralysis is stopped: emerging movement is misread as light sedation and the sedative is escalated again.",
      },
      {
        title: "Wean ventilation and sedation together, in small steps",
        timeframe: "Day 1–4 of recovery",
        actions: [
          "Move to a spontaneous mode with pressure support; allow permissive tachypnoea rather than deepening sedation to match the ventilator.",
          "Reduce the propofol or midazolam by 20–25% per step, aiming at COMFORT-B 11–17, with a daily assessment of extubation readiness.",
          "Keep the opioid until the tube is out — cough and tube tolerance are analgesia problems, not sedation problems.",
          "Use dexmedetomidine to bridge the last 24–48 h so the child is calm, arousable and breathing spontaneously at extubation.",
        ],
      },
      {
        title: "Post-extubation taper on the ward",
        timeframe: "Day 4–14",
        actions: [
          "Convert remaining opioid and benzodiazepine to enteral equivalents and taper 10–20% per day with WAT-1 before each step.",
          "Expect upper airway oedema and post-extubation stridor to look like agitation — treat with dexamethasone/nebulised adrenaline rather than sedation.",
          "Screen for PICU-acquired weakness and delirium before discharge; both prolong the wean and change the plan.",
          "Send a dated written taper, rescue plan and stop date with the child to the ward or home.",
        ],
        pitfall:
          "Continuing propofol beyond 48–72 h in a child at high infusion rates — watch for propofol infusion syndrome (metabolic acidosis, rising lactate, arrhythmia, rhabdomyolysis) rather than lengthening the propofol wean.",
      },
    ],
    drugs: [
      {
        name: "Rocuronium",
        slug: "rocuronium",
        drugClass: "Aminosteroid neuromuscular blocker",
        halfLife: "1–2 h; hepatobiliary elimination with 30% renal — markedly prolonged after days of infusion and in renal/hepatic failure",
        timing: "Stop outright; allow up to 24 h for full recovery after prolonged infusion before judging neurology.",
        taper: [
          "No taper — discontinue and monitor recovery with train-of-four.",
          "Correct hypermagnesaemia, acidosis and hypothermia, which prolong blockade.",
        ],
        monitoring: ["Train-of-four ratio and spontaneous movement/trigger on the ventilator.", "Depth of sedation while blockade persists — never allow awareness."],
        rescue: "Persistent weakness beyond 24–48 h: consider critical illness myopathy, check magnesium and renal function, involve physiotherapy and neurology.",
      },
      {
        name: "Atracurium",
        slug: "atracurium",
        drugClass: "Benzylisoquinolinium blocker",
        halfLife: "~20 min — Hofmann elimination and ester hydrolysis, independent of renal and hepatic function",
        timing: "Recovery within 30–60 min of stopping even after prolonged infusion; preferred where organ failure would prolong rocuronium.",
        taper: ["No taper — discontinue.", "Laudanosine accumulates in hepatic failure after long infusions; watch for agitation and seizure threshold effects."],
        monitoring: ["Train-of-four, spontaneous respiratory effort.", "Histamine-mediated flushing, bronchospasm and hypotension during use."],
        rescue: "Bronchospasm or hypotension attributed to histamine release: switch to a steroidal blocker if further paralysis is needed.",
      },
      {
        name: "Propofol",
        slug: "propofol",
        drugClass: "GABA-A sedative",
        halfLife: "Context-sensitive half-time stays short (10–20 min) but children have a higher risk of propofol infusion syndrome with prolonged use",
        timing: "Sedation lightens within 15–30 min of a step down, so plan analgesia and delirium cover before, not after, the reduction.",
        taper: [
          "< 48 h: stop as part of a sedation interruption.",
          "> 48–72 h: reduce 25% every 2–4 h to COMFORT-B 11–17.",
          "Reconcile lipid and calorie intake with the dietitian as the propofol calories fall (1.1 kcal/mL).",
        ],
        monitoring: ["COMFORT-B hourly through the wean; CAM-ICU/CAP-D twice daily.", "Lactate, CK, triglycerides, pH and ECG while the infusion continues in children."],
        rescue: "Agitation on stepping down: treat pain and delirium first; add dexmedetomidine rather than returning to a deep propofol rate.",
      },
      {
        name: "Fentanyl",
        slug: "fentanyl",
        drugClass: "Opioid",
        halfLife: "Elimination 3–4 h but context-sensitive half-time rises steeply after days of infusion; neonatal clearance is much lower",
        timing: "The apparent offset lengthens with infusion duration — after 7 days expect withdrawal 12–24 h after a step, not immediately.",
        taper: [
          "Convert to enteral morphine or methadone once the gut works, then reduce 10–20% per day.",
          "For > 2 weeks of exposure, a methadone conversion with a defined 7–14 day taper is often smoother than fentanyl reduction.",
          "Keep a written PRN rescue of 5–10% of the daily dose.",
        ],
        monitoring: ["WAT-1 before each reduction; COMFORT-B and sleep quality.", "Chest-wall rigidity risk with boluses; gut function and constipation."],
        rescue: "Rising WAT-1: hold the step, give rescue analgesia, add clonidine, and involve PICU pharmacy for a methadone plan.",
      },
      {
        name: "Midazolam",
        slug: "midazolam",
        drugClass: "Benzodiazepine",
        halfLife: "Child 1–4 h; prolonged by the active glucuronide in renal impairment and by CYP3A4 inhibitors (fluconazole, erythromycin)",
        timing: "The longest-tail agent in PARDS weans — taper by 10% per day when exposure exceeds 10 days.",
        taper: [
          "10–20% per day after 5–10 days; 10% per day beyond that.",
          "Convert to enteral clonazepam or diazepam once feeding.",
        ],
        monitoring: ["WAT-1 12-hourly; watch for tremor, sweating, diarrhoea and inconsolability.", "Delirium screening — benzodiazepines are the main modifiable risk factor."],
        rescue: "Withdrawal seizure: treat as status, restore the previous dose, and restart the taper at half the previous rate.",
      },
      {
        name: "Dexmedetomidine",
        slug: "dexmedetomidine",
        drugClass: "α₂ agonist",
        halfLife: "2–3 h; rebound sympathetic activity at 6–24 h after abrupt cessation of prolonged infusions",
        timing: "Taper over 24–48 h after > 3 days; ideal bridging agent through extubation.",
        taper: ["Reduce 0.1–0.2 mcg/kg/h every 6–12 h.", "Bridge to enteral clonidine for ward-based weans."],
        monitoring: ["Heart rate for age and blood pressure 4-hourly, continuing 24 h after the last dose.", "Sleep pattern and agitation scores."],
        rescue: "Rebound tachycardia/hypertension: give an enteral clonidine dose or restart at the last tolerated rate and taper more slowly.",
      },
    ],
    scores: [
      "WAT-1 12-hourly and before every reduction",
      "COMFORT-B 4-hourly (target 11–17 while ventilated and weaning)",
      "Train-of-four during and after neuromuscular blockade",
      "Daily extubation readiness test and spontaneous breathing trial",
      "CAP-D or SOS-PD for delirium, plus a PICU-acquired weakness assessment before discharge",
    ],
    rescue: [
      "Failed extubation with agitation: exclude airway oedema, secretions and pain before assuming under-sedation, then re-plan the taper rather than returning to deep sedation.",
      "Rising lactate, acidosis, arrhythmia or raised CK on propofol: stop propofol immediately and treat as propofol infusion syndrome.",
      "Withdrawal not controlled by a 10%/day taper after > 2 weeks of opioid: convert to methadone with a written taper and cardiac QT monitoring.",
    ],
    caseQuery: "ards",
    caseLabel: "Paediatric ARDS and ventilation cases",
    topicPaths: [
      { label: "Paediatric intensive care", path: "/intensive-care/paediatric-icu" },
      { label: "Paediatric ICU flows", path: "/intensive-care/paediatric-flows" },
    ],
  },
  {
    id: "paed-neuro-wean",
    title: "Neurocritical care — sedation wean with an intact neuro exam",
    blurb:
      "After traumatic brain injury, status epilepticus or neuroprotection the wean has a second master: intracranial physiology. Sedation is reduced only when ICP and seizure control allow, and each step is judged on both withdrawal scores and the neurological examination.",
    readiness: [
      "ICP < 20 mmHg for 24 h without osmotherapy, CPP appropriate for age, and no surges on stimulation",
      "Seizures controlled for 24–48 h with maintenance anticonvulsants established and levels checked",
      "Normothermia achieved (or rewarming complete after targeted temperature management), sodium and glucose stable",
    ],
    phases: [
      {
        title: "Stop neuroprotective adjuncts first",
        timeframe: "Once ICP has been stable 24 h",
        actions: [
          "Complete rewarming at 0.25–0.5 °C/h before touching sedation — rewarming raises ICP, CO₂ and metabolic rate, and unmasks shivering.",
          "Stop the neuromuscular blocker before the sedation so seizures and posturing become visible, and confirm train-of-four recovery.",
          "Stop hypertonic saline/mannitol boluses and keep sodium stable; a falling sodium during the wean will raise ICP independently of sedation.",
          "Where thiopentone was used for refractory ICP or status, expect zero-order kinetics: sedation can persist for 24–72 h after stopping, with EEG burst suppression outlasting the plasma level.",
        ],
        pitfall:
          "Lightening sedation during active rewarming — the two ICP insults are additive and the surge is blamed on the sedation change.",
      },
      {
        title: "Graded sedation reduction against ICP and the exam",
        timeframe: "24–72 h",
        actions: [
          "Reduce sedation in small steps (10–25%) with ICP, CPP and pupils recorded before, 15 min after and 1 h after each step.",
          "Return to the previous depth for a sustained ICP rise > 20 mmHg for > 5 min, then wait 6–12 h before retrying — repeated aborted attempts are expected.",
          "Keep the opioid running through the ICP-sensitive phase: pain, suction and tube stimulation are potent ICP triggers.",
          "Continue maintenance levetiracetam or phenytoin; never wean the anticonvulsant and the sedative in the same 24 h.",
        ],
      },
      {
        title: "Emergence, withdrawal taper and neuro-rehabilitation handover",
        timeframe: "Day 3–14",
        actions: [
          "Once ICP monitoring stops, switch the focus to withdrawal and delirium: WAT-1 before each step, CAP-D twice daily.",
          "Taper enteral opioid and benzodiazepine 10–20% per day, slower after > 10 days; agitation here is commonly emergence agitation plus withdrawal plus brain injury.",
          "Distinguish paroxysmal sympathetic hyperactivity after TBI (episodic tachycardia, hypertension, sweating, dystonia) from withdrawal — it responds to gabapentin, propranolol and clonidine, not to escalating sedation.",
          "Hand over a written taper, rescue plan and anticonvulsant plan to neuro-rehabilitation with named review dates.",
        ],
        pitfall:
          "Treating paroxysmal sympathetic hyperactivity as withdrawal and reloading benzodiazepines — it deepens delirium and delays rehabilitation.",
      },
    ],
    drugs: [
      {
        name: "Thiopentone",
        slug: "thiopentone",
        drugClass: "Barbiturate",
        halfLife: "Terminal 6–12 h after single doses, but saturable zero-order kinetics after infusion give 24–72 h of persistent effect",
        timing: "Do not judge neurology or brainstem function for at least 24–72 h after stopping a prolonged infusion; EEG guides the wean, not the clock.",
        taper: [
          "Wean under continuous EEG from burst suppression, in 25% steps every 6–12 h once ICP or seizures allow.",
          "Anticipate cardiovascular support needs falling as the infusion comes down, and immunosuppression/infection risk persisting.",
        ],
        monitoring: ["Continuous EEG, ICP/CPP, blood pressure and vasoactive requirement.", "Temperature and white cell count — barbiturate infusions mask fever and cause immunosuppression."],
        rescue: "ICP surge on weaning: return to the previous burst-suppression depth, re-image, and reconsider decompression.",
      },
      {
        name: "Midazolam",
        slug: "midazolam",
        drugClass: "Benzodiazepine",
        halfLife: "Child 1–4 h; the active glucuronide accumulates in renal impairment, giving a 12–24 h lag between step and effect",
        timing: "Step every 12–24 h in the ICP-sensitive phase so a rise can be attributed correctly.",
        taper: [
          "10–20% per day, 10% per day beyond 10 days of infusion.",
          "Convert to enteral clonazepam or diazepam when feeding, keeping the anticonvulsant plan separate.",
        ],
        monitoring: ["ICP/CPP and pupils around each step; WAT-1 12-hourly once ICP monitoring stops.", "EEG if seizures were the indication."],
        rescue: "Withdrawal seizure or ICP surge: restore the previous dose, treat the seizure, and halve the next reduction.",
      },
      {
        name: "Propofol",
        slug: "propofol",
        drugClass: "GABA-A sedative",
        halfLife: "Short context-sensitive half-time (10–20 min) — its rapid offset is what makes neurological windows possible",
        timing: "Ideal for assessing the exam: reduce and reassess within 15–30 min, then restore depth if ICP rises.",
        taper: [
          "Reduce 25% and observe for 30–60 min with ICP and pupils charted.",
          "Limit rate and duration in children (propofol infusion syndrome) — prefer midazolam or dexmedetomidine for long neuro-sedation.",
        ],
        monitoring: ["ICP, CPP, pupils and cough during reductions.", "Lactate, pH, CK, triglycerides and ECG while infusing."],
        rescue: "ICP rise > 20 mmHg for > 5 min: return to the previous rate, ensure CO₂ and sodium targets, and delay the next attempt 6–12 h.",
      },
      {
        name: "Fentanyl",
        slug: "fentanyl",
        drugClass: "Opioid",
        halfLife: "3–4 h, with a steeply rising context-sensitive half-time after days of infusion",
        timing: "Keep running until ICP monitoring stops; taper last, over 5–10 days after prolonged exposure.",
        taper: [
          "Convert to enteral morphine or methadone, then 10–20% per day with WAT-1 before each step.",
          "Maintain a rescue dose for suction, physiotherapy and dressing changes throughout.",
        ],
        monitoring: ["ICP response to stimulation, WAT-1, gut function.", "Respiratory rate and CO₂ after extubation — hypercapnia raises ICP."],
        rescue: "Withdrawal plus agitation after brain injury: add clonidine, and consider gabapentin and propranolol if paroxysmal sympathetic hyperactivity is the driver.",
      },
      {
        name: "Dexmedetomidine",
        slug: "dexmedetomidine",
        drugClass: "α₂ agonist",
        halfLife: "2–3 h; sympathetic rebound 6–24 h after abrupt cessation",
        timing: "Introduce as the bridge once ICP monitoring stops and an arousable child is the goal; taper over 24–48 h.",
        taper: ["Reduce 0.1–0.2 mcg/kg/h every 6–12 h.", "Bridge to enteral clonidine for the rehabilitation phase."],
        monitoring: ["Heart rate for age (bradycardia), blood pressure and CPP if still monitored.", "Agitation, sleep pattern and delirium scores."],
        rescue: "Rebound hypertension in a brain-injured child is not benign: restart at the last tolerated rate or give clonidine and re-taper slowly.",
      },
      {
        name: "Levetiracetam",
        slug: "levetiracetam",
        drugClass: "Anticonvulsant (SV2A)",
        halfLife: "6–8 h in children, renally cleared — dose reduction rather than tapering is the renal adjustment",
        timing: "Maintain through the sedation wean; any anticonvulsant change waits until sedation is stable.",
        taper: [
          "Do not stop abruptly — reduce over weeks under neurology guidance if seizures were provoked and prophylaxis is being stopped.",
          "For post-traumatic seizure prophylaxis, review at 7 days rather than continuing indefinitely.",
        ],
        monitoring: ["Seizure recurrence, EEG if indicated, behaviour and irritability (a recognised paediatric effect).", "Renal function and dose appropriateness."],
        rescue: "Seizure recurrence during the wean: load again, involve neurology, and defer further sedation reduction for 24–48 h.",
      },
    ],
    scores: [
      "ICP, CPP and pupillary response before, 15 min after and 1 h after every sedation step",
      "GCS/paediatric GCS once sedation allows a meaningful examination",
      "Continuous EEG where thiopentone, status epilepticus or burst suppression is involved",
      "WAT-1 and CAP-D once intracranial monitoring stops",
    ],
    rescue: [
      "Repeated ICP surges on any reduction: re-image, check sodium, CO₂ and seizure activity, and escalate to neurosurgery before persisting with the wean.",
      "Prolonged unresponsiveness after stopping thiopentone: assume drug persistence for up to 72 h, support and re-examine rather than prognosticating.",
      "Paroxysmal sympathetic hyperactivity after TBI: treat with gabapentin, propranolol and clonidine, not escalating benzodiazepines.",
    ],
    caseQuery: "neuro",
    caseLabel: "Paediatric neurocritical care cases",
    topicPaths: [
      { label: "Paediatric intensive care", path: "/intensive-care/paediatric-icu" },
      { label: "Paediatric ICU flows", path: "/intensive-care/paediatric-flows" },
    ],
  },
];

import type { DrugPharmacodynamicsMap } from "./types";

export const pdSedationNmb: DrugPharmacodynamicsMap = {
  propofol: {
    doseResponse:
      "Steep sigmoid concentration–effect curve at the GABA_A receptor: plasma concentrations of ~1 µg/mL give sedation, 2–4 µg/mL amnesia and cooperative sedation, and 4–6 µg/mL loss of consciousness in an unpremedicated adult. Because the curve is steep, small rate changes move the patient several sedation levels — titrate in 0.5 mg/kg/h steps rather than doubling.",
    therapeuticWindow:
      "Narrow in the shocked patient: hypnotic and hypotensive effects share the same dose range, so the limit is haemodynamic rather than neurological. Sedation dose 0.5–4 mg/kg/h; sustained doses >4 mg/kg/h beyond 48 h define the propofol infusion syndrome risk zone.",
    titrationTarget:
      "RASS −1 to 0 for most ventilated patients (deeper only for a specific indication such as severe ARDS proning, refractory ICP or status epilepticus), with MAP >65 mmHg as the ceiling constraint; processed EEG (BIS 40–60) when neuromuscular blockade masks clinical assessment.",
    doseRelatedEffects: [
      "Low dose: anxiolysis, antiemesis, mild fall in SVR and blood pressure.",
      "Moderate dose: loss of airway reflexes, apnoea, 15–30% fall in MAP from venodilatation, arteriodilatation and baroreflex blunting.",
      "High or prolonged dose: myocardial depression, bradycardia, hypertriglyceridaemia, lipid calorie load, and at >4 mg/kg/h for >48 h propofol-related infusion syndrome (lactic acidosis, rhabdomyolysis, refractory bradyarrhythmia).",
    ],
    interactions: [
      "Additive/synergistic hypnosis with opioids, benzodiazepines and α₂ agonists — co-administered fentanyl reduces the propofol EC₅₀ by roughly half.",
      "Additive hypotension with β-blockers, ACE inhibitors, vasodilators and neuraxial blockade; effect magnified by hypovolaemia.",
      "Catecholamine infusions and corticosteroids raise the risk of propofol-related infusion syndrome at any given dose.",
      "Antagonised functionally by pain, hypercapnia and stimulation — sedation depth is not fixed for a fixed rate.",
    ],
    tolerance:
      "Modest tolerance over days (partly pharmacodynamic, partly increased stimulation), but no true withdrawal syndrome; abrupt cessation risks agitation and unplanned extubation rather than seizures.",
  },

  fentanyl: {
    doseResponse:
      "Log-linear μ-receptor occupancy–analgesia relationship with no analgesic ceiling, but the respiratory depression curve sits close to and slightly left of the analgesic curve in the opioid-naive patient. Effect-site equilibration is 3–5 min, so bolus stacking, not dose size, causes most apnoea.",
    therapeuticWindow:
      "Analgesic plasma concentrations 1–3 ng/mL; spontaneous ventilation is usually lost above ~2 ng/mL in the naive patient, so the window is essentially absent unless the airway is protected. Ventilated ICU infusions 25–200 µg/h; tolerance widens the window over days.",
    titrationTarget:
      "Pain score at rest and on movement (CPOT 0–2 / NRS ≤3) with ventilator synchrony, not a fixed rate; in the awake patient titrate to respiratory rate ≥8 and normal sedation score.",
    doseRelatedEffects: [
      "Low dose: analgesia, cough suppression, ventilator tolerance, miosis, mild bradycardia.",
      "Moderate dose: sedation, reduced hypercapnic drive with a right-shifted CO₂ response curve, ileus, urinary retention, nausea.",
      "High dose or rapid bolus: apnoea, chest-wall and glottic rigidity, profound bradycardia, hypotension in the catecholamine-dependent patient.",
    ],
    interactions: [
      "Synergistic respiratory depression and hypnosis with propofol, midazolam, alcohol and gabapentinoids — the commonest cause of unplanned apnoea in ICU.",
      "Additive bradycardia with dexmedetomidine, β-blockers, digoxin and neostigmine.",
      "Competitively reversed by naloxone (short half-life — anticipate re-narcotisation) and partially antagonised by buprenorphine's high receptor affinity.",
      "Serotonergic co-prescription (SSRIs, linezolid, methylene blue) adds a small serotonin-syndrome risk with phenylpiperidine opioids.",
    ],
    tolerance:
      "Marked tolerance and opioid-induced hyperalgesia within 3–7 days of infusion; iatrogenic withdrawal (tachycardia, sweating, agitation, diarrhoea, dilated pupils) follows abrupt stopping after >5 days — wean by 10–20%/day or convert to enteral opioid.",
  },

  morphine: {
    doseResponse:
      "Log-linear μ agonism as for fentanyl but with slow effect-site equilibration (15–20 min), so titration by repeated small boluses (1–2 mg) is essential; the apparent dose–response is dominated by hysteresis and by accumulation of the active metabolite M6G.",
    therapeuticWindow:
      "Wide in normal renal function, but narrows dramatically once eGFR falls because morphine-6-glucuronide is more potent than the parent drug and renally cleared — days of apparently stable dosing can end in unexpected apnoea.",
    titrationTarget:
      "Pain score with respiratory rate and sedation score as safety limits; reassess the cumulative 24 h dose daily and switch to fentanyl or alfentanil if creatinine rises.",
    doseRelatedEffects: [
      "Low dose: analgesia, venodilatation and useful preload reduction in pulmonary oedema, histamine-mediated flushing and pruritus.",
      "Moderate dose: sedation, nausea, constipation, urinary retention, hypotension from histamine release.",
      "High dose or metabolite accumulation: respiratory depression, myoclonus, pinpoint pupils, coma.",
    ],
    interactions: [
      "Synergistic sedation and respiratory depression with all hypnotics.",
      "Histamine release adds to hypotension from propofol, atracurium and vancomycin infusions.",
      "MAO inhibitors and serotonergic drugs — risk of hyperpyrexia and excitatory reactions.",
      "Naloxone reverses effect but half-life is shorter than accumulated M6G, so a naloxone infusion is often needed in renal failure.",
    ],
    tolerance: "Tolerance and physical dependence within days; the withdrawal syndrome is the same as for fentanyl but slower in onset because of metabolite persistence.",
  },

  alfentanil: {
    doseResponse:
      "Very rapid effect-site equilibration (t½ke0 ~1 min) makes the observed dose–response almost immediate, so it is the easiest opioid infusion to titrate. Potency is ~1/10–1/4 of fentanyl; analgesic concentrations 50–200 ng/mL.",
    therapeuticWindow:
      "Similar analgesia/apnoea overlap to fentanyl, but the flat context-sensitive half-time means the window does not shrink with infusion duration — the practical advantage in renal failure and for daily wake-up assessments.",
    titrationTarget:
      "CPOT/NRS and ventilator synchrony; infusions typically 0.5–5 mg/h in adults, adjusted for cirrhosis and CYP3A4 inhibitors.",
    doseRelatedEffects: [
      "Low dose: analgesia with minimal haemodynamic change.",
      "Moderate dose: sedation, bradycardia, reduced respiratory drive.",
      "High dose or rapid bolus: apnoea, chest-wall rigidity (more prominent than fentanyl at equipotent boluses), hypotension.",
    ],
    interactions: [
      "Synergy with propofol and midazolam for hypnosis and apnoea.",
      "Effect prolonged by CYP3A4 inhibitors (fluconazole, clarithromycin, ritonavir) — a kinetic interaction with dynamic consequences.",
      "Additive bradycardia with β-blockers and dexmedetomidine.",
    ],
    tolerance: "Tolerance develops over days; withdrawal risk is lower than fentanyl because of the shorter offset, but a wean is still needed after prolonged use.",
  },

  midazolam: {
    doseResponse:
      "Sigmoid GABA_A benzodiazepine-site curve with a genuine ceiling for hypnosis (a modulator, not an agonist — it cannot open the channel alone), which is why it is safer than propofol on the myocardium but unreliable as a sole agent for deep sedation.",
    therapeuticWindow:
      "Wide for cardiovascular safety, narrow for cognitive outcome: sedation quality is achieved well below toxic doses but delirium risk rises with any exposure, and accumulation of active 1-hydroxymidazolam glucuronide in renal failure prolongs effect unpredictably.",
    titrationTarget:
      "RASS −1 to 0 (or seizure control in status epilepticus); prefer intermittent boluses to infusion, and use the shortest possible duration to limit delirium and withdrawal.",
    doseRelatedEffects: [
      "Low dose: anxiolysis, amnesia, anticonvulsant effect.",
      "Moderate dose: sedation, mild respiratory depression, modest fall in SVR.",
      "High dose or accumulation: prolonged coma, delayed weaning, delirium, paradoxical agitation (especially in the elderly), respiratory depression when combined with opioids.",
    ],
    interactions: [
      "Profound synergy with opioids — combined benzodiazepine/opioid dosing causes apnoea at doses either drug tolerates alone.",
      "Effect prolonged by CYP3A4 inhibitors (azoles, macrolides, amiodarone) and shortened by inducers (rifampicin, phenytoin).",
      "Competitively reversed by flumazenil — avoid in chronic benzodiazepine users or after mixed overdose (seizure risk).",
    ],
    tolerance:
      "Rapid tolerance with receptor down-regulation over 48–72 h; abrupt cessation after >1 week risks a withdrawal syndrome with agitation, tremor, hallucinations and seizures — wean by 10–25%/day or convert to enteral lorazepam/clonazepam.",
  },

  dexmedetomidine: {
    doseResponse:
      "Biphasic, α₂:α₁ selectivity 1600:1. Low infusion rates give cooperative, arousable sedation with analgesia sparing; rapid or high dosing recruits vascular postsynaptic α₂B receptors and produces hypertension followed by bradycardia and hypotension as central sympatholysis dominates. There is a genuine sedation ceiling — it cannot produce general anaesthesia.",
    therapeuticWindow:
      "0.2–1.4 µg/kg/h (some units go to 1.5); the limiting toxicity is bradycardia and hypotension rather than respiratory depression, which is the drug's main advantage. Loading doses are usually omitted in ICU precisely because they are outside the useful window.",
    titrationTarget:
      "RASS −2 to 0 with a cooperative, extubatable patient; heart rate >50/min and MAP >65 mmHg define the stopping rules.",
    doseRelatedEffects: [
      "Low dose: sedation with preserved respiratory drive, anxiolysis, reduced opioid requirement, dry mouth.",
      "Moderate dose: bradycardia, hypotension, reduced shivering threshold.",
      "High dose or bolus: transient hypertension then marked bradycardia, occasional sinus arrest, hyperthermia and polyuria reported.",
    ],
    interactions: [
      "Additive bradycardia with β-blockers, digoxin, amiodarone, neostigmine and remifentanil — asystole has been reported with combinations.",
      "Additive hypotension with propofol, vasodilators and neuraxial block; reduces catecholamine requirement in some patients but unmasks hypovolaemia.",
      "Opioid- and propofol-sparing (useful synergy: typically 30–50% reduction in requirement).",
    ],
    tolerance:
      "Tolerance after 3–7 days; abrupt withdrawal after prolonged infusion causes rebound tachycardia, hypertension and agitation — wean over 24 h or convert to enteral clonidine.",
  },

  clonidine: {
    doseResponse:
      "Partial α₂ agonist with lower selectivity (α₂:α₁ 200:1) and a flat dose–response for sedation, so escalating the dose mostly adds hypotension and bradycardia rather than sedation. Enteral onset 30–60 min, with an effect lasting 6–12 h that makes it a wean drug rather than a titratable one.",
    therapeuticWindow:
      "Typical ICU dose 25–150 µg 6–8 hourly enterally (or 0.5–2 µg/kg/h IV where used); the window is defined by heart rate and MAP, and narrows markedly in hypovolaemia or with concurrent β-blockade.",
    titrationTarget:
      "Sedation/agitation score and withdrawal scale (opioid or alcohol withdrawal), with heart rate >50/min and MAP >65 mmHg as constraints.",
    doseRelatedEffects: [
      "Low dose: sedation, anxiolysis, analgesia sparing, dry mouth, suppression of withdrawal symptoms.",
      "Moderate dose: bradycardia, hypotension, constipation.",
      "High dose: profound bradycardia, sedation with respiratory pattern change in children, and paradoxical hypertension at very high plasma levels via α₁ activity.",
    ],
    interactions: [
      "Additive bradycardia and hypotension with β-blockers, dexmedetomidine, digoxin and calcium-channel blockers.",
      "Tricyclic antidepressants antagonise its antihypertensive effect.",
      "Opioid- and benzodiazepine-sparing, and useful synergy in managing iatrogenic withdrawal.",
    ],
    tolerance:
      "Well-described rebound hypertension, tachycardia, agitation and sweating on abrupt withdrawal (worst with β-blocker co-prescription) — taper over several days; never stop abruptly on ICU discharge.",
  },

  ketamine: {
    doseResponse:
      "Distinct, dose-separated effects on the NMDA receptor: 0.1–0.3 mg/kg gives analgesia and opioid sparing, 0.3–0.8 mg/kg gives dissociation and emergence phenomena, and 1–2 mg/kg IV produces dissociative anaesthesia. Analgesia therefore occurs at doses well below those causing psychomimetic effects — the basis of low-dose ICU infusions.",
    therapeuticWindow:
      "Wide with respect to airway and respiratory drive (both largely preserved) but narrow with respect to psychomimetic and sympathomimetic effects; ICU infusions 0.05–0.4 mg/kg/h. In catecholamine-depleted shock, its indirect sympathomimetic effect is lost and direct myocardial depression is unmasked.",
    titrationTarget:
      "Pain score with opioid dose reduction as the surrogate of success; monitor for hallucinations, hypertension, tachycardia and hypersalivation, and cap the rate rather than chasing pain upwards.",
    doseRelatedEffects: [
      "Low dose: analgesia, opioid sparing, bronchodilatation, mild tachycardia and hypertension.",
      "Moderate dose: nystagmus, dissociation, vivid dreams, hypersalivation, raised intraocular pressure.",
      "High dose: emergence delirium, hypertension and tachycardia with increased myocardial oxygen demand, myoclonus; direct negative inotropy in catecholamine-depleted patients.",
    ],
    interactions: [
      "Sympathomimetic effects additive with noradrenaline, adrenaline and aminophylline (tachyarrhythmia, hypertension).",
      "Benzodiazepines and α₂ agonists blunt emergence phenomena — a deliberate protective interaction.",
      "Opioid-sparing synergy for analgesia; antagonises opioid tolerance and hyperalgesia.",
      "Additive hypertension with MAO inhibitors; potentiates non-depolarising neuromuscular blockade slightly.",
    ],
    tolerance: "Tolerance over days of infusion (partly NMDA receptor up-regulation); no major withdrawal syndrome, but cravings and dysphoria are reported after prolonged high-dose use.",
  },

  haloperidol: {
    doseResponse:
      "High-affinity D₂ antagonism with a flat antipsychotic dose–response above about 5–10 mg/day — extra dose buys extrapyramidal and QT toxicity, not extra effect. Onset 10–20 min IV, peak 20–40 min.",
    therapeuticWindow:
      "Narrow and defined by cardiac and motor toxicity: 0.5–2.5 mg IV boluses, usual maximum 10 mg/24 h in the frail and elderly; QTc >500 ms or a rise >60 ms from baseline is the hard stop.",
    titrationTarget:
      "Control of distressing agitated delirium (CAM-ICU positive with distress), not sedation depth; monitor ECG QTc, potassium and magnesium before repeat dosing.",
    doseRelatedEffects: [
      "Low dose: sedation, antiemesis, reduced agitation.",
      "Moderate dose: acute dystonia, akathisia, parkinsonism, hyperprolactinaemia, QT prolongation.",
      "High dose or accumulation: torsade de pointes, neuroleptic malignant syndrome, oculogyric crisis, lowered seizure threshold.",
    ],
    interactions: [
      "Additive QT prolongation with amiodarone, methadone, macrolides, ondansetron, quinolones, azoles and hypokalaemia/hypomagnesaemia.",
      "Antagonises dopamine and levodopa (avoid in Parkinson's disease and Lewy body dementia — use quetiapine instead).",
      "Additive sedation with opioids and benzodiazepines; additive extrapyramidal effects with metoclopramide.",
    ],
    tolerance: "No tolerance at ICU doses; withdrawal dyskinesia can appear after prolonged high-dose use, so stop once delirium resolves rather than continuing to discharge.",
  },

  rocuronium: {
    doseResponse:
      "All-or-none at the endplate with a steep margin-of-safety curve: about 75% of nicotinic receptors must be occupied before twitch height falls, and 90–95% occupancy abolishes it. Dose determines onset far more than depth — 0.6 mg/kg gives intubating conditions in 90 s, 1.0–1.2 mg/kg in 45–60 s.",
    therapeuticWindow:
      "There is no toxicity ceiling in the ventilated patient — the 'window' is one of duration and monitoring: 0.6 mg/kg lasts 30–40 min, 1.2 mg/kg 60–90 min, and infusions of 0.3–0.6 mg/kg/h accumulate, particularly in renal and hepatic impairment.",
    titrationTarget:
      "Train-of-four count 1–2 for ARDS/ventilator dyssynchrony indications; TOF ratio >0.9 before extubation. Never titrate against movement alone, and always ensure adequate sedation first — paralysis has no hypnotic or analgesic effect.",
    doseRelatedEffects: [
      "Low dose: partial blockade with weakness, upper-airway obstruction and aspiration risk if the patient is not ventilated.",
      "Standard dose: complete blockade with abolished respiratory effort, cough and eye protection; anaphylaxis risk is dose-independent (commonest cause of perioperative anaphylaxis in the UK).",
      "Prolonged infusion: residual weakness, ICU-acquired weakness, corneal abrasion and pressure injury from immobility.",
    ],
    interactions: [
      "Potentiated by volatile agents, aminoglycosides, magnesium, hypothermia, hypokalaemia, respiratory acidosis and local anaesthetics.",
      "Antagonised by chronic phenytoin and carbamazepine (resistance) and by hypercalcaemia.",
      "Reversed competitively by neostigmine (needs TOF count ≥2) or encapsulated by sugammadex (any depth; 16 mg/kg for immediate reversal).",
      "Blocks the motor signs of seizures and of awareness — always pair with a sedation/analgesia plan and consider processed EEG.",
    ],
    tolerance: "Tachyphylaxis and up-regulated extrajunctional receptors after several days of infusion or immobility, increasing dose requirement and the risk of prolonged weakness.",
  },

  "atracurium-cisatracurium": {
    doseResponse:
      "Same steep endplate occupancy curve as rocuronium. Cisatracurium is ~3–4× more potent (ED₉₅ 0.05 mg/kg vs 0.2 mg/kg) with a slower onset (3–5 min); intubating dose 0.15 mg/kg, infusion 0.06–0.18 mg/kg/h — the standard choice for ARDS blockade because Hofmann elimination is independent of organ function.",
    therapeuticWindow:
      "Defined by histamine release (atracurium) rather than blockade: atracurium boluses >0.5 mg/kg given quickly cause flushing, hypotension and bronchospasm, whereas cisatracurium is essentially histamine-free at clinical doses. Laudanosine accumulation is a theoretical seizure concern only at very prolonged, very high atracurium doses.",
    titrationTarget:
      "TOF count 1–2 (or post-tetanic count if deeper blockade is needed) on peripheral nerve stimulation, with adequate sedation confirmed first; review the indication at least daily and stop by 48 h in ARDS unless clearly required.",
    doseRelatedEffects: [
      "Low dose: partial paralysis, weak cough, dyssynchrony masking.",
      "Standard dose: complete blockade; with atracurium, dose- and rate-dependent histamine release (rash, hypotension, bronchospasm).",
      "Prolonged infusion: ICU-acquired weakness, disuse atrophy, corneal exposure, venous thromboembolism from immobility; laudanosine accumulation in hepatic failure (atracurium).",
    ],
    interactions: [
      "Potentiated by volatiles, aminoglycosides, magnesium (a common ICU combination in eclampsia), hypothermia, acidosis and hypokalaemia.",
      "Hofmann elimination accelerates with alkalosis and pyrexia and slows with hypothermia — a pH- and temperature-dependent dynamic effect.",
      "Reversed by neostigmine; sugammadex is ineffective (benzylisoquinolinium, not aminosteroid) — a critical safety point.",
    ],
    tolerance: "Requirement rises after several days of infusion through extrajunctional receptor up-regulation; monitor with TOF rather than escalating empirically.",
  },

  suxamethonium: {
    doseResponse:
      "Depolarising agonist: 1–1.5 mg/kg produces fasciculation then flaccid block within 45–60 s, lasting 3–8 min. Dose–response is all-or-none for intubating conditions; increasing the dose prolongs block and hastens phase II (desensitisation) block rather than improving conditions.",
    therapeuticWindow:
      "Wide for effect but constrained by potentially lethal, largely dose-independent hazards — hyperkalaemia, bradycardia and malignant hyperthermia trigger. Total doses >3–5 mg/kg or repeat dosing risk phase II block and profound bradycardia.",
    titrationTarget:
      "Not titrated: single weight-based dose for rapid sequence induction, with return of twitch/spontaneous ventilation as the endpoint; check plasma potassium and burn/denervation history first.",
    doseRelatedEffects: [
      "Standard dose: fasciculation, myalgia (worst in young, muscular, ambulant patients), transient K⁺ rise of 0.5 mmol/L, raised intraocular and intragastric pressure.",
      "Repeat or high dose: bradycardia and sinus arrest (especially second dose and in children), phase II block with prolonged paralysis.",
      "Susceptible patients: life-threatening hyperkalaemia (burns >24 h old, denervation, prolonged immobility, spinal cord injury, muscular dystrophy), malignant hyperthermia, masseter spasm, and prolonged apnoea with atypical plasma cholinesterase.",
    ],
    interactions: [
      "Effect prolonged by anticholinesterases (neostigmine, organophosphates), lithium, magnesium and low plasma cholinesterase (pregnancy, liver disease, plasmapheresis).",
      "Do not use with pre-existing hyperkalaemia or drugs raising K⁺ (spironolactone, ACE inhibitors, suxamethonium-sensitive myopathy).",
      "Atropine or glycopyrronium pre-treatment blunts bradycardia; a small non-depolariser dose blunts fasciculation but risks weakness.",
      "Not reversed by neostigmine (which prolongs it) or by sugammadex.",
    ],
    tolerance: "Tachyphylaxis with repeated dosing as depolarising block converts to phase II block; a second dose is rarely the right answer — plan for a non-depolariser or wake-up.",
  },
};

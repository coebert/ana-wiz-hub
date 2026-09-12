import type { DrugPharmacodynamicsMap } from "./types";

export const pdCardiovascular: DrugPharmacodynamicsMap = {
  noradrenaline: {
    doseResponse:
      "Dose-dependent α₁ vasoconstriction throughout the range, with modest β₁ effect at higher doses. Roughly: 0.01–0.1 µg/kg/min gives predominantly α₁ vasoconstriction and a rise in MAP with little change in cardiac output; 0.1–0.5 µg/kg/min adds β₁ inotropy but rising afterload; >0.5 µg/kg/min is 'high dose' with excessive vasoconstriction and organ ischaemia.",
    therapeuticWindow:
      "Effect is graded rather than toxic, so the window is regional: MAP is bought at the price of splanchnic, renal cortical and digital perfusion. Requirements above ~0.5 µg/kg/min should trigger a search for hypovolaemia, acidaemia, hypocalcaemia, adrenal insufficiency and a second agent (vasopressin) rather than further escalation.",
    titrationTarget:
      "MAP ≥65 mmHg (higher, 80–85 mmHg, in chronic hypertension or raised ICP), with lactate clearance, urine output, capillary refill and a cardiac output measure as the perfusion checks.",
    doseRelatedEffects: [
      "Low dose: rise in SVR and MAP, reflex bradycardia, increased venous return from venoconstriction.",
      "Moderate dose: raised afterload with falling stroke volume in the poorly contractile heart, cool peripheries, splanchnic and renal cortical vasoconstriction, hyperglycaemia.",
      "High dose: digital and skin necrosis, mesenteric and myocardial ischaemia, tachyarrhythmia, lactataemia from adrenergic glycolysis, extravasation injury.",
    ],
    interactions: [
      "Effect blunted by acidaemia (pH <7.2), hypocalcaemia and adrenal insufficiency — correct these before escalating.",
      "Exaggerated pressor response with MAO inhibitors, tricyclic antidepressants, cocaine and after abrupt clonidine withdrawal.",
      "Additive with vasopressin, adrenaline, metaraminol and angiotensin II (catecholamine-sparing synergy is the reason vasopressin is added at 0.25–0.5 µg/kg/min of noradrenaline).",
      "β-blockade leaves unopposed α effect — hypertension with a falling cardiac output.",
    ],
    tolerance:
      "Adrenoceptor down-regulation and desensitisation over hours to days of high-dose infusion (catecholamine tachyphylaxis); this, not disease progression alone, drives escalating requirements — consider vasopressin, hydrocortisone and methylene blue rather than dose stacking. Never stop abruptly: wean in small steps to avoid rebound hypotension.",
  },

  adrenaline: {
    doseResponse:
      "Classic dose-dependent receptor shift: 0.01–0.05 µg/kg/min is predominantly β₁/β₂ (inotropy, chronotropy, bronchodilatation, vasodilatation with a possible fall in diastolic pressure); above ~0.1 µg/kg/min α₁ vasoconstriction dominates. Cardiac arrest dosing (1 mg IV) is outside the titratable range entirely.",
    therapeuticWindow:
      "Narrow in terms of metabolic and arrhythmic cost: useful inotropy and bronchodilatation are accompanied by lactataemia, hyperglycaemia and tachyarrhythmia at the same doses. Anaphylaxis dosing (0.5 mg IM, or 50 µg IV boluses by an experienced operator) has a wide safety margin IM and a narrow one IV.",
    titrationTarget:
      "MAP and cardiac output/echo response in shock; resolution of stridor, wheeze and hypotension in anaphylaxis; peak flow and work of breathing in life-threatening asthma. Track lactate — a rising lactate on adrenaline is usually pharmacological, not necessarily worsening hypoperfusion.",
    doseRelatedEffects: [
      "Low dose: tachycardia, increased contractility, bronchodilatation, tremor, mild hypokalaemia (β₂-driven intracellular K⁺ shift).",
      "Moderate dose: hyperglycaemia, lactataemia, increased myocardial oxygen demand, atrial and ventricular ectopy.",
      "High dose: severe tachyarrhythmia, myocardial ischaemia and stunning, severe peripheral vasoconstriction with digital necrosis, pulmonary oedema, extravasation injury.",
    ],
    interactions: [
      "Non-selective β-blockade converts adrenaline into a pure vasoconstrictor — severe hypertension with bradycardia; glucagon is the rescue in β-blocker-complicated anaphylaxis.",
      "Volatile agents (especially halothane historically), digoxin and hypokalaemia sensitise the myocardium to adrenaline-induced arrhythmia.",
      "MAO inhibitors, tricyclics and cocaine exaggerate the pressor response.",
      "Additive metabolic effects with salbutamol and aminophylline (hypokalaemia, lactataemia, tachycardia).",
    ],
    tolerance: "β-receptor down-regulation with prolonged infusion; abrupt cessation causes rebound hypotension and bronchospasm, so wean rather than stop.",
  },

  vasopressin: {
    doseResponse:
      "V₁-receptor vasoconstriction is near-maximal at low fixed doses — 0.01–0.04 units/min in septic shock (typically 0.03 units/min) — so it is prescribed as a fixed dose, not titrated upwards. Above 0.04 units/min the dose–response for MAP is flat while ischaemic complications continue to rise.",
    therapeuticWindow:
      "Narrow above 0.04 units/min: digital, mesenteric and coronary ischaemia increase without further pressor benefit. Effect is preserved in acidaemia, which is its main advantage over catecholamines.",
    titrationTarget:
      "Added at a fixed rate to reduce noradrenaline requirement (typically once noradrenaline exceeds 0.25–0.5 µg/kg/min); target MAP ≥65 mmHg and wean the catecholamine, not the vasopressin, first in most protocols.",
    doseRelatedEffects: [
      "Standard dose: rise in SVR and MAP, reduced catecholamine requirement, mild reduction in heart rate, water retention via V₂ receptors with hyponatraemia risk.",
      "Higher dose: mesenteric and digital ischaemia, skin necrosis, hyponatraemia, reduced cardiac output in the failing right ventricle.",
      "Any dose: coronary vasoconstriction — caution in ischaemic heart disease.",
    ],
    interactions: [
      "Additive vasoconstriction with noradrenaline, metaraminol and terlipressin; catecholamine-sparing synergy is the intended effect.",
      "V₂-mediated antidiuresis compounds hyponatraemia with hypotonic fluids, SSRIs and thiazides.",
      "Unaffected by acidaemia and by β-blockade, unlike catecholamines.",
    ],
    tolerance: "No true tachyphylaxis, but abrupt discontinuation causes marked rebound hypotension because endogenous vasopressin stores are depleted in shock — wean by 0.01 units/min steps.",
  },

  dobutamine: {
    doseResponse:
      "β₁ > β₂ agonist: 2.5–5 µg/kg/min raises contractility and stroke volume with mild vasodilatation, 5–10 µg/kg/min gives useful inodilatation, and >10–20 µg/kg/min adds tachycardia and arrhythmia with diminishing stroke-volume gain. The dose–response for cardiac output plateaus long before that for heart rate.",
    therapeuticWindow:
      "Narrow: the useful inotropic range (2.5–10 µg/kg/min) sits directly below the arrhythmogenic and hypotensive range, and MAP may fall through β₂ vasodilatation just as output rises — hence frequent pairing with a vasopressor.",
    titrationTarget:
      "Cardiac index/stroke volume and markers of perfusion (lactate, ScvO₂, urine output) on echo or cardiac-output monitoring — not blood pressure alone; keep heart rate below ~110–120/min.",
    doseRelatedEffects: [
      "Low dose: increased contractility and stroke volume, mild fall in SVR and filling pressures.",
      "Moderate dose: tachycardia, increased myocardial oxygen consumption, hypotension in the underfilled patient.",
      "High dose: atrial and ventricular arrhythmia, myocardial ischaemia, hypokalaemia, eosinophilic myocarditis (rare, with prolonged use).",
    ],
    interactions: [
      "Effect markedly attenuated by β-blockers — use milrinone (post-receptor) instead in patients on chronic β-blockade.",
      "Additive arrhythmia risk with digoxin, hypokalaemia, hypomagnesaemia, adrenaline and aminophylline.",
      "Additive hypotension with vasodilators and in hypovolaemia — fill before starting.",
    ],
    tolerance: "β-receptor down-regulation after 48–72 h of continuous infusion with declining haemodynamic effect; consider a post-receptor agent rather than dose escalation.",
  },

  milrinone: {
    doseResponse:
      "Phosphodiesterase-3 inhibition raises cAMP downstream of the β receptor, so effect is independent of β-blockade. Infusion 0.375–0.75 µg/kg/min gives dose-dependent inodilatation: rising cardiac index with falling SVR, PVR and filling pressures. Loading doses (50 µg/kg) are often omitted in ICU because hypotension is the dose-limiting effect.",
    therapeuticWindow:
      "Narrow with respect to blood pressure; long half-life (2–4 h, longer in renal failure) means overshoot cannot be quickly withdrawn. Accumulates significantly at eGFR <30 mL/min — halve the rate.",
    titrationTarget:
      "Cardiac index, PA pressures/RV function on echo, and lactate clearance while maintaining MAP ≥65 mmHg (usually with a concurrent vasopressor).",
    doseRelatedEffects: [
      "Low dose: increased contractility and lusitropy, pulmonary and systemic vasodilatation, reduced filling pressures.",
      "Moderate dose: hypotension requiring vasopressor support, atrial and ventricular arrhythmia.",
      "High dose or accumulation: refractory hypotension, thrombocytopenia, prolonged effect after stopping.",
    ],
    interactions: [
      "Additive hypotension with vasodilators, ACE inhibitors, propofol and neuraxial blockade.",
      "Additive inotropy with dobutamine and adrenaline; works despite β-blockade (its main advantage).",
      "Additive arrhythmia risk with hypokalaemia, hypomagnesaemia and digoxin.",
    ],
    tolerance: "No significant tachyphylaxis (post-receptor site of action) — a reason to prefer it after prolonged catecholamine exposure.",
  },

  metaraminol: {
    doseResponse:
      "Predominantly direct α₁ agonism with some indirect noradrenaline release: 0.5–2 mg IV boluses raise MAP within 1–2 min, lasting 20–60 min; infusions 0.5–5 mg/h. Dose–response for MAP is steep, and reflex bradycardia scales with the pressure rise.",
    therapeuticWindow:
      "Wide for short-term pressure support but the long duration compared with phenylephrine makes overshoot hypertension harder to manage; it does not treat low cardiac output and can worsen it by raising afterload.",
    titrationTarget:
      "MAP target as a bridge while the cause of hypotension is treated or central access obtained; reassess with echo if requirements persist beyond a few hours.",
    doseRelatedEffects: [
      "Low dose: rise in SVR and MAP, reflex bradycardia.",
      "Moderate dose: reduced stroke volume in the failing ventricle, cool peripheries, reduced splanchnic flow.",
      "High dose: severe hypertension, bradyarrhythmia, tissue ischaemia and extravasation injury.",
    ],
    interactions: [
      "Exaggerated response with MAO inhibitors, tricyclics and cocaine; blunted by chronic α-blockade (e.g. tamsulosin, phenoxybenzamine).",
      "Indirect component is depleted after prolonged use or in reserpine-like states, explaining tachyphylaxis.",
      "Additive with noradrenaline and vasopressin.",
    ],
    tolerance: "Tachyphylaxis with repeated boluses as noradrenaline stores deplete — a signal to move to a titrated central noradrenaline infusion.",
  },

  hydrocortisone: {
    doseResponse:
      "Genomic effects (hours) plus rapid non-genomic vascular effects (restoration of catecholamine sensitivity within 1–2 h). Dose–response is class-specific: 200 mg/day (50 mg qds or infusion) is the septic-shock dose; 100–150 mg/day covers physiological replacement in adrenal insufficiency; anti-inflammatory doses above 300 mg/day add toxicity without shock benefit.",
    therapeuticWindow:
      "Wide over days, narrow over weeks: benefit in shock reversal is achieved at 200 mg/day, while hyperglycaemia, hypernatraemia, myopathy, immunosuppression and delirium accumulate with duration more than dose.",
    titrationTarget:
      "Vasopressor requirement (shock reversal) rather than any biochemical target; reassess daily and stop or taper once vasopressors are off. Monitor glucose 4–6 hourly, sodium and signs of infection.",
    doseRelatedEffects: [
      "Replacement dose: restored vascular catecholamine responsiveness, sodium and water retention, improved mood or agitation.",
      "Shock dose: hyperglycaemia, hypernatraemia, hypokalaemia (mineralocorticoid effect), leucocytosis, delirium.",
      "Prolonged or high dose: ICU-acquired weakness/steroid myopathy, impaired wound healing, hyperglycaemia requiring insulin, opportunistic infection, GI bleeding when combined with NSAIDs, adrenal suppression on withdrawal.",
    ],
    interactions: [
      "Additive hyperglycaemia with catecholamines and enteral/parenteral feed; increases insulin requirement.",
      "Additive hypokalaemia with loop diuretics, β₂ agonists and insulin.",
      "Raises PRIS risk with propofol; masks fever and inflammatory markers, delaying diagnosis of infection.",
      "Metabolism accelerated by rifampicin, phenytoin and carbamazepine; effect increased by CYP3A4 inhibitors.",
    ],
    tolerance: "Adrenal suppression follows courses beyond ~1–2 weeks — taper rather than stop, and cover intercurrent illness or surgery with stress dosing.",
  },

  amiodarone: {
    doseResponse:
      "Multi-channel (Vaughan Williams class I–IV) action with a very slow onset of the class III effect: an IV load of 300 mg over 20–60 min then 900 mg/24 h works largely through β-blockade and calcium-channel effects acutely, while QT prolongation and full antiarrhythmic effect develop over days as tissue stores fill (total load ~10 g).",
    therapeuticWindow:
      "Acutely limited by hypotension (rate-of-infusion dependent, partly the polysorbate 80 vehicle) and bradycardia; chronically by cumulative organ toxicity that is duration- rather than concentration-dependent. There is no useful plasma level to target.",
    titrationTarget:
      "Rhythm and rate control with MAP maintained; monitor ECG for QTc >500 ms and bradycardia, plus thyroid and liver function if therapy continues beyond a few weeks.",
    doseRelatedEffects: [
      "Loading infusion: hypotension, bradycardia, phlebitis (give centrally where possible).",
      "Days: QT prolongation, bradyarrhythmia, transaminitis, nausea.",
      "Weeks to months: thyroid dysfunction (both hypo- and hyperthyroidism), pulmonary fibrosis, corneal microdeposits, hepatitis, photosensitivity, peripheral neuropathy.",
    ],
    interactions: [
      "Doubles digoxin levels and potentiates warfarin (halve the doses and monitor).",
      "Additive QT prolongation with haloperidol, macrolides, quinolones, ondansetron, methadone and azoles; correct K⁺ and Mg²⁺ first.",
      "Additive bradycardia and AV block with β-blockers, verapamil, diltiazem, dexmedetomidine and digoxin.",
      "CYP3A4/2C9 and P-glycoprotein inhibition raises levels of statins (myopathy), DOACs (bleeding) and phenytoin.",
    ],
    tolerance: "No tachyphylaxis; the practical issue is the enormous volume of distribution and 50-day half-life, so effects and interactions persist for weeks after stopping.",
  },

  "magnesium-sulfate": {
    doseResponse:
      "Physiological antagonist at calcium channels and the NMDA receptor with a well-mapped serum-level ladder: 0.8–1.0 mmol/L normal; 2–3.5 mmol/L therapeutic for eclampsia prophylaxis; 3.5–5 mmol/L loss of deep tendon reflexes; 5–7.5 mmol/L respiratory depression; >12 mmol/L cardiac arrest.",
    therapeuticWindow:
      "One of the clearest windows in ICU practice — therapeutic 2–3.5 mmol/L against reflex loss above 3.5 and respiratory arrest above 5 mmol/L. The window narrows sharply in renal impairment because elimination is entirely renal.",
    titrationTarget:
      "Deep tendon reflexes, respiratory rate and urine output hourly in eclampsia (levels only if renal impairment or toxicity suspected); serum magnesium 0.8–1.2 mmol/L when replacing for arrhythmia prevention.",
    doseRelatedEffects: [
      "Therapeutic: flushing, warmth, nausea, mild hypotension, tocolysis, bronchodilatation, seizure prophylaxis.",
      "Above 3.5 mmol/L: loss of patellar reflexes, drowsiness, slurred speech, muscle weakness.",
      "Above 5 mmol/L: respiratory depression, bradycardia, AV block, then asystole; potentiated by renal failure.",
    ],
    interactions: [
      "Markedly potentiates non-depolarising neuromuscular blockers (and prolongs suxamethonium) — reduce blocker doses when co-administered.",
      "Additive hypotension and bradycardia with calcium-channel blockers (nifedipine) and β-blockers.",
      "Antagonised by IV calcium — 10 mL of 10% calcium gluconate is the antidote for magnesium toxicity.",
      "Additive CNS depression with opioids and benzodiazepines.",
    ],
    tolerance: "None; the risk is accumulation in renal impairment rather than tolerance.",
  },

  digoxin: {
    doseResponse:
      "Na⁺/K⁺-ATPase inhibition gives a shallow inotropic dose–response but a steeper vagotonic AV-nodal effect, so rate control precedes any inotropy. Loading 500 µg then 250–500 µg to a total of ~1–1.5 mg; maintenance 62.5–250 µg/day adjusted for renal function.",
    therapeuticWindow:
      "Classically narrow: therapeutic 0.8–2.0 µg/L (0.5–0.9 µg/L in heart failure), with toxicity common above 2.0 µg/L and possible within range if potassium is low. Sampling must be ≥6 h post-dose.",
    titrationTarget:
      "Ventricular rate <110/min at rest in AF, with potassium 4.0–5.0 mmol/L, magnesium replete and renal function tracked; check a level if toxicity is suspected or renal function changes.",
    doseRelatedEffects: [
      "Therapeutic: slowed AV conduction, mild positive inotropy, nausea, ST/T changes on ECG (reverse tick).",
      "Rising level: anorexia, vomiting, confusion, xanthopsia and blurred vision, bradycardia.",
      "Toxic: any arrhythmia — ventricular bigeminy, bidirectional VT, complete AV block, atrial tachycardia with block; hyperkalaemia in acute overdose predicts mortality.",
    ],
    interactions: [
      "Hypokalaemia, hypomagnesaemia and hypercalcaemia sensitise the myocardium — the commonest reason for toxicity at 'normal' levels.",
      "Amiodarone, verapamil, diltiazem, quinine, macrolides and spironolactone raise digoxin levels (P-glycoprotein inhibition) — halve the dose.",
      "Additive bradycardia/AV block with β-blockers, verapamil, diltiazem and dexmedetomidine.",
      "IV calcium in the digoxin-toxic patient can precipitate refractory arrest; digoxin-specific antibody fragments are the antidote.",
    ],
    tolerance: "None; accumulation with declining renal function is the practical danger, particularly in the elderly and in AKI.",
  },

  esmolol: {
    doseResponse:
      "Cardioselective β₁ antagonism with graded, rapidly reversible effect: 25–50 µg/kg/min gives modest rate control, 50–200 µg/kg/min progressive rate and contractility reduction. Onset within 2 min and offset within 10–20 min because of red-cell esterase hydrolysis — the most titratable β-blocker.",
    therapeuticWindow:
      "Determined by cardiac output: the range that controls rate overlaps the range that unmasks heart failure and hypotension, so it is used precisely because errors can be undone within minutes. Cardioselectivity is dose-dependent and lost at high infusion rates (bronchospasm risk).",
    titrationTarget:
      "Heart rate (usually <100–110/min) or the specific goal (aortic dissection shear stress, thyroid storm, ischaemia) while maintaining MAP ≥65 mmHg and adequate cardiac output on echo.",
    doseRelatedEffects: [
      "Low dose: reduced heart rate and contractility, reduced myocardial oxygen demand.",
      "Moderate dose: hypotension, fatigue, masking of hypoglycaemic tachycardia.",
      "High dose: bradyarrhythmia and AV block, decompensated heart failure, loss of β₁ selectivity with bronchospasm in asthma/COPD.",
    ],
    interactions: [
      "Additive bradycardia and AV block with verapamil, diltiazem, digoxin, amiodarone and dexmedetomidine — verapamil plus a β-blocker IV can cause asystole.",
      "Antagonises the effect of dobutamine and adrenaline (unopposed α effect with adrenaline); glucagon is the rescue for β-blocker toxicity.",
      "Masks the sympathetic warning signs of hypoglycaemia in insulin-treated patients.",
    ],
    tolerance: "None over ICU timescales; chronic β-blockade up-regulates receptors so abrupt withdrawal causes rebound tachycardia, hypertension and ischaemia.",
  },

  "glyceryl-trinitrate": {
    doseResponse:
      "Nitric-oxide donation raises cGMP with a venous-to-arterial dose gradient: low doses (5–40 µg/min) act mainly on veins to reduce preload and relieve ischaemia; higher doses (40–200 µg/min) add arterial dilatation and reduce afterload and blood pressure. Onset 1–2 min, offset 3–5 min.",
    therapeuticWindow:
      "Wide but preload-dependent: the same dose that relieves pulmonary oedema causes profound hypotension in the underfilled patient, in right ventricular infarction and in severe aortic stenosis or HOCM.",
    titrationTarget:
      "Symptom and pulmonary-oedema resolution or blood-pressure target, with MAP ≥65 mmHg; watch for headache as an early marker of effect and for tachycardia indicating excessive preload reduction.",
    doseRelatedEffects: [
      "Low dose: headache, venodilatation with reduced filling pressures, coronary vasodilatation.",
      "Moderate dose: hypotension, reflex tachycardia, flushing.",
      "High or prolonged dose: profound hypotension, increased shunt with worsened oxygenation, methaemoglobinaemia (rare, high-dose), tolerance within 24–48 h.",
    ],
    interactions: [
      "Absolutely contraindicated with phosphodiesterase-5 inhibitors (sildenafil, tadalafil) — catastrophic hypotension.",
      "Additive hypotension with all vasodilators, propofol, ACE inhibitors and neuraxial blockade.",
      "Heparin requirement may rise during high-dose GTN infusion (a described interaction) — recheck APTR after stopping.",
    ],
    tolerance: "True pharmacodynamic tolerance from sulfhydryl depletion within 24–48 h of continuous infusion; requires escalating doses or a nitrate-free interval, and rebound ischaemia can follow abrupt withdrawal.",
  },

  labetalol: {
    doseResponse:
      "Combined α₁ and non-selective β antagonism in roughly 1:3 ratio IV: 10–20 mg boluses reduce blood pressure within 5–10 min without reflex tachycardia; infusions 20–160 mg/h. Dose–response for blood pressure is graded, but the α:β ratio means heart rate falls rather than rising.",
    therapeuticWindow:
      "Reasonably wide, and the reason it is first line in pre-eclampsia and aortic dissection; limited by bradycardia, bronchospasm and heart failure. Long offset (elimination half-life 4–6 h) means overshoot cannot be rapidly reversed — unlike esmolol.",
    titrationTarget:
      "Controlled blood-pressure reduction (e.g. ≤25% of MAP in the first hour in hypertensive emergency; systolic 130–150 mmHg in pre-eclampsia) with fetal heart rate monitored in pregnancy.",
    doseRelatedEffects: [
      "Low dose: fall in SVR and blood pressure without tachycardia, scalp tingling, postural hypotension.",
      "Moderate dose: bradycardia, heart block, fatigue, bronchospasm in reactive airways.",
      "High dose: decompensated heart failure, prolonged hypotension, neonatal bradycardia and hypoglycaemia after maternal use.",
    ],
    interactions: [
      "Additive bradycardia/AV block with verapamil, diltiazem, digoxin and amiodarone.",
      "Blunts the response to β agonists (salbutamol, dobutamine, adrenaline) and masks hypoglycaemia.",
      "Additive hypotension with vasodilators, magnesium and neuraxial anaesthesia — a common combination in obstetric critical care.",
    ],
    tolerance: "None acutely; chronic use carries the same rebound risk as other β-blockers on abrupt withdrawal.",
  },
};

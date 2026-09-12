import type { DrugPharmacodynamicsMap } from "./types";

export const pdMetabolicInfection: DrugPharmacodynamicsMap = {
  insulin: {
    doseResponse:
      "Steep, near-linear glucose-lowering response to IV soluble insulin with an effect within 5–10 min and a plasma half-life of 5–9 min, so infusion rate changes act quickly but glucose falls with a 20–30 min lag. Typical variable-rate infusions run 0.5–6 units/h; DKA uses 0.1 units/kg/h fixed rate.",
    therapeuticWindow:
      "Narrow — the dose that normalises glucose readily causes hypoglycaemia, and in DKA the potassium shift is as dangerous as the glucose fall. Target 6–10 mmol/L in critical illness (NICE-SUGAR: tight control to 4.5–6.0 mmol/L increased mortality through hypoglycaemia).",
    titrationTarget:
      "Capillary or blood-gas glucose 6–10 mmol/L, checked hourly while the rate is changing; potassium 4.0–5.0 mmol/L with replacement running alongside in DKA, and ketones falling by ≥0.5 mmol/L/h.",
    doseRelatedEffects: [
      "Low dose: fall in glucose, intracellular shift of potassium, phosphate and magnesium.",
      "Moderate dose: hypokalaemia, hypophosphataemia, sodium and water retention.",
      "High dose or interrupted feed: severe hypoglycaemia with seizures and neuroglycopenic brain injury; rapid osmolar shift in DKA/HHS increasing cerebral oedema risk, especially in children.",
    ],
    interactions: [
      "Requirement rises with corticosteroids, catecholamines, enteral/parenteral nutrition and glucose-containing fluids — and falls abruptly when feed is interrupted or dialysis starts (the commonest cause of ICU hypoglycaemia).",
      "β-blockers mask the adrenergic warning signs of hypoglycaemia and blunt the counter-regulatory response.",
      "Additive hypokalaemia with salbutamol, adrenaline, loop diuretics and hydrocortisone; used deliberately with dextrose to treat hyperkalaemia.",
      "Adsorbs to giving sets — prime the line to keep the dose–response predictable.",
    ],
    tolerance: "Insulin resistance is the rule in critical illness (counter-regulatory hormones, sepsis, steroids) and falls rapidly as illness resolves — reassess the rate at least daily to avoid hypoglycaemia during recovery.",
  },

  "calcium-gluconate": {
    doseResponse:
      "Direct membrane-stabilising effect that is immediate but short-lived: 10 mL of 10% calcium gluconate (2.26 mmol Ca²⁺) improves ECG changes of hyperkalaemia within 1–3 min for 30–60 min, and raises ionised calcium by roughly 0.1–0.2 mmol/L. It does not lower potassium at all.",
    therapeuticWindow:
      "Wide for a single dose but bounded by hypercalcaemia with repeated dosing; calcium chloride 10% contains three times more calcium per mL (6.8 mmol per 10 mL) — a common and dangerous confusion between preparations.",
    titrationTarget:
      "Resolution of ECG changes and tetany, with ionised calcium 1.1–1.3 mmol/L; repeat doses guided by repeat ECG and ionised calcium, not by a fixed schedule.",
    doseRelatedEffects: [
      "Standard dose: flushing, warmth, nausea, mild bradycardia; severe tissue necrosis on extravasation (worse with calcium chloride).",
      "Repeated dosing: hypercalcaemia with confusion, ileus, polyuria and shortened QT.",
      "In the digoxin-toxic patient: risk of accelerating a refractory arrhythmia.",
    ],
    interactions: [
      "Antagonises magnesium toxicity (the antidote), calcium-channel blocker and β-blocker overdose (with high-dose insulin/glucose), and hyperkalaemic membrane effects.",
      "Precipitates with sodium bicarbonate and with ceftriaxone (fatal in neonates) — flush lines thoroughly between drugs.",
      "Increases digoxin toxicity; may reduce the effect of calcium-channel blockers being given therapeutically.",
    ],
  },

  "potassium-chloride": {
    doseResponse:
      "Replacement rather than receptor pharmacology: each 20–40 mmol infused raises serum potassium by roughly 0.25 mmol/L in a normal-sized adult, though the relationship is distorted by acid–base state and insulin, which shift potassium intracellularly. Peripheral rate limit 10 mmol/h; central 20 mmol/h (up to 40 mmol/h in monitored, life-threatening hypokalaemia).",
    therapeuticWindow:
      "One of the narrowest in ICU: therapeutic 4.0–5.0 mmol/L, with arrhythmia at both ends. Rapid central boluses have caused cardiac arrest — concentrated potassium is a never-event drug requiring double-checking and a controlled pump.",
    titrationTarget:
      "Serum potassium 4.0–5.0 mmol/L (higher end for arrhythmia and post-cardiac surgery), rechecked after each 40 mmol given or 4–6 hourly; replace magnesium at the same time or potassium will not correct.",
    doseRelatedEffects: [
      "Standard rate: pain and phlebitis peripherally, mild local irritation.",
      "Rapid infusion: peaked T waves, cardiac arrhythmia, bradycardia and asystole.",
      "Over-replacement, especially in AKI: hyperkalaemia with wide QRS, sine-wave pattern and arrest.",
    ],
    interactions: [
      "Additive hyperkalaemia with ACE inhibitors/ARBs, spironolactone, trimethoprim, heparin, NSAIDs, suxamethonium and AKI — review these before prescribing potassium.",
      "Loss increased by loop and thiazide diuretics, β₂ agonists, insulin, hydrocortisone and alkalosis; hypomagnesaemia causes refractory renal potassium wasting.",
      "Digoxin toxicity is precipitated by hypokalaemia and exacerbated by rapid correction swings.",
    ],
  },

  "proton-pump-inhibitors": {
    doseResponse:
      "Irreversible covalent inhibition of the gastric H⁺/K⁺-ATPase means effect outlasts plasma concentration and is cumulative over 2–3 days as successive proton pumps are inhibited. IV omeprazole/pantoprazole 40 mg daily gives stress-ulcer prophylaxis; 80 mg bolus then 8 mg/h for 72 h is the post-endoscopy bleeding regimen, which holds intragastric pH >6 and stabilises clot.",
    therapeuticWindow:
      "Very wide acutely; the harms are duration-dependent rather than dose-dependent, which is why the key decision is stopping prophylaxis once enteral feeding is established and risk factors resolve.",
    titrationTarget:
      "Absence of clinically important upper GI bleeding rather than any pH measurement; review the indication daily and de-prescribe on ICU discharge.",
    doseRelatedEffects: [
      "Short course: headache, nausea, diarrhoea, mild transaminitis.",
      "Prolonged use: Clostridioides difficile and hospital-acquired pneumonia risk, hypomagnesaemia, hypocalcaemia, B12 and iron malabsorption, interstitial nephritis.",
      "High-dose infusion: as above plus rebound acid hypersecretion when stopped abruptly after weeks of therapy.",
    ],
    interactions: [
      "Omeprazole inhibits CYP2C19 — reduces clopidogrel activation (prefer pantoprazole in patients on clopidogrel) and raises phenytoin and diazepam levels.",
      "Raised gastric pH reduces absorption of itraconazole, ketoconazole and atazanavir, and alters enteral iron and calcium absorption.",
      "Additive hypomagnesaemia with diuretics, amphotericin and citrate anticoagulation — check magnesium in patients with refractory arrhythmia.",
    ],
    tolerance: "No tolerance to acid suppression, but rebound hypersecretion follows abrupt cessation of prolonged therapy — taper if used for weeks.",
  },

  terlipressin: {
    doseResponse:
      "Prodrug of lysine-vasopressin with slow release of the active moiety, giving a 4–6 h duration from a 1–2 mg bolus. Splanchnic V₁ vasoconstriction reduces portal pressure in a dose-dependent way; hepatorenal syndrome regimens use 0.5–2 mg every 4–6 h (or 2–12 mg/24 h by infusion, which reduces adverse effects).",
    therapeuticWindow:
      "Narrow with respect to ischaemia: portal pressure reduction is accompanied by systemic, digital, myocardial and intestinal vasoconstriction. Albumin co-administration is part of the therapeutic package in hepatorenal syndrome.",
    titrationTarget:
      "Cessation of variceal bleeding, or a fall in creatinine (with albumin) in hepatorenal syndrome; monitor sodium daily, ECG, and inspect digits and abdomen for ischaemia. Stop after 14 days or if no creatinine response.",
    doseRelatedEffects: [
      "Standard dose: pallor, hypertension, bradycardia, abdominal cramps, diarrhoea.",
      "Higher/repeat dosing: hyponatraemia (V₂ effect, sometimes profound and rapid), digital and skin ischaemia.",
      "High cumulative dose: mesenteric and myocardial ischaemia, ischaemic colitis, respiratory failure in advanced liver failure (a signal in recent trials).",
    ],
    interactions: [
      "Additive vasoconstriction with noradrenaline, vasopressin and metaraminol.",
      "Hyponatraemia worsened by hypotonic fluids, SSRIs and diuretics — check sodium at least daily.",
      "Additive bradycardia with β-blockers, which many cirrhotic patients take for variceal prophylaxis.",
    ],
  },

  "n-acetylcysteine": {
    doseResponse:
      "Replenishes glutathione and provides a sulfhydryl substrate for NAPQI conjugation — effect depends on being given early rather than on dose escalation. The SNAP two-bag regimen (100 mg/kg over 2 h then 200 mg/kg over 10 h) is fully protective when started within 8 h of paracetamol ingestion; efficacy declines thereafter but treatment is still indicated in established hepatotoxicity.",
    therapeuticWindow:
      "Very wide — there is no dose-related organ toxicity, only infusion-rate-related pseudo-anaphylactoid reactions. Continue beyond the standard course while the INR, ALT and paracetamol level indicate ongoing injury.",
    titrationTarget:
      "Paracetamol level below the treatment line with normal ALT and INR at the end of the infusion; if not, continue at 150 mg/kg/24 h and reassess. Use King's College criteria to trigger liver-unit referral.",
    doseRelatedEffects: [
      "First bag (rate-related): flushing, urticaria, nausea, vomiting, bronchospasm and hypotension — a histamine-release pseudo-allergy, not true anaphylaxis; slow or pause the infusion and give antihistamine rather than abandoning treatment.",
      "Prolonged infusion: hypokalaemia, hyponatraemia (glucose-based diluent), and a small prolongation of INR (typically 1.3–1.5) that is a direct drug effect, not worsening liver failure.",
      "Very rare: true anaphylaxis, seizures reported with massive overdose of NAC itself.",
    ],
    interactions: [
      "The mildly raised INR confuses assessment of hepatic synthetic function and of warfarin control — interpret INR alongside ALT, lactate, pH and glucose.",
      "Additive hypotension with propofol and vasodilators during the loading bag.",
      "Does not interact with activated charcoal given earlier, and neither replaces the other.",
    ],
  },

  thiamine: {
    doseResponse:
      "Cofactor replacement (pyruvate dehydrogenase, α-ketoglutarate dehydrogenase, transketolase) rather than receptor pharmacology: effect is all-or-none once deficiency is corrected. Wernicke's encephalopathy needs 500 mg IV three times daily for 2–3 days (Pabrinex high potency), then 250 mg daily; prophylaxis in at-risk patients uses lower doses.",
    therapeuticWindow:
      "Extremely wide — no dose-related toxicity, and the only meaningful risk is rare anaphylaxis to the IV preparation. The clinical error is under-dosing or delay, not overdose.",
    titrationTarget:
      "Resolution of ophthalmoplegia, ataxia and confusion; give before or with any glucose load in a malnourished patient, and continue while alcohol withdrawal or refeeding risk persists.",
    doseRelatedEffects: [
      "Standard dose: local injection reaction, mild nausea, harmless yellow urine discolouration.",
      "IV bolus: rare anaphylaxis (have resuscitation facilities available — the reason for slow IV administration over 10 min or infusion).",
      "No cumulative toxicity: excess is renally excreted.",
    ],
    interactions: [
      "Glucose administration before thiamine precipitates or worsens Wernicke's encephalopathy — always give thiamine first or simultaneously.",
      "Requirement increased by refeeding, continuous renal replacement therapy (water-soluble vitamin losses), diuretics and alcohol dependence.",
      "No significant drug–drug interactions, which is why empirical replacement in at-risk patients is safe.",
    ],
  },

  "piperacillin-tazobactam": {
    doseResponse:
      "Time-dependent β-lactam killing: efficacy depends on the proportion of the dosing interval with free drug above the MIC (target fT>MIC ≥50%, and 100% for severe sepsis), not on peak concentration. This is why 4.5 g every 6 h, extended 4-hour infusions or continuous infusion outperform larger, less frequent doses.",
    therapeuticWindow:
      "Wide, but neurotoxicity and cytopenias appear with accumulation in renal impairment; prolonged courses risk resistance and Clostridioides difficile. Augmented renal clearance in young trauma and burns patients causes under-exposure — a failure of dose–response at standard doses.",
    titrationTarget:
      "Clinical and biochemical response with source control; extend the infusion or increase frequency rather than the single dose in severe sepsis, adjust for renal function, and de-escalate on culture results. Therapeutic drug monitoring is available in some centres.",
    doseRelatedEffects: [
      "Standard dose: diarrhoea, nausea, rash, transaminitis, hypokalaemia and sodium load (each 4.5 g contains ~11 mmol Na⁺).",
      "Accumulation: neurotoxicity with confusion, myoclonus and seizures; thrombocytopenia and neutropenia with courses beyond 1–2 weeks; direct Coombs-positive haemolysis.",
      "Any dose: Clostridioides difficile colitis, candida overgrowth, selection of resistant organisms.",
    ],
    interactions: [
      "Additive nephrotoxicity with vancomycin (a well-described AKI signal for this combination) — monitor creatinine daily and consider alternatives.",
      "Reduces methotrexate clearance (potentially fatal toxicity) and prolongs neuromuscular blockade slightly.",
      "Falsely raises galactomannan assays, confounding aspergillosis diagnosis; sodium load adds to hypernatraemia from saline and citrate.",
    ],
  },

  meropenem: {
    doseResponse:
      "Time-dependent killing as for piperacillin–tazobactam, with a target fT>MIC of 40–100%. 1 g every 8 h is standard; 2 g every 8 h or extended 3-hour infusions are used for CNS infection, Pseudomonas and high-MIC organisms — an infusion-duration rather than dose escalation strategy.",
    therapeuticWindow:
      "Wide; the limiting toxicity is seizure risk, which is concentration-dependent and rises in renal impairment, with CNS pathology and at high doses. Requires dose reduction at eGFR <50 mL/min and dose adjustment on CRRT.",
    titrationTarget:
      "Clinical response and source control, with renal function-adjusted dosing and daily review for de-escalation; extend the infusion for resistant organisms rather than increasing the interval dose.",
    doseRelatedEffects: [
      "Standard dose: nausea, diarrhoea, rash, transaminitis, thrombophlebitis.",
      "Accumulation or high dose: seizures (lower risk than imipenem but real), confusion, thrombocytopenia.",
      "Any dose: Clostridioides difficile, candidaemia, and selection of carbapenem-resistant organisms — the reason for strict stewardship.",
    ],
    interactions: [
      "Reduces valproate levels dramatically (up to 60–90% fall) with loss of seizure control — avoid the combination.",
      "Probenecid raises meropenem levels; additive seizure risk with tranexamic acid, quinolones and hyponatraemia.",
      "Excessive clearance on high-flux CRRT causes under-dosing — check local circuit-specific dosing.",
    ],
  },

  vancomycin: {
    doseResponse:
      "Exposure-dependent (AUC-driven) glycopeptide: efficacy correlates with an AUC₂₄/MIC of 400–600 for MRSA, achieved by a loading dose of 25–30 mg/kg followed by weight- and renal function-adjusted maintenance. Trough-only dosing (target 15–20 mg/L for serious infection) is a surrogate for AUC.",
    therapeuticWindow:
      "Narrow, monitored: below AUC 400 treatment fails; above AUC 600–700 (or troughs >20 mg/L) nephrotoxicity rises steeply. Slow infusion (≥1 h per gram) is needed to avoid histamine-mediated 'vancomycin flushing reaction'.",
    titrationTarget:
      "AUC₂₄ 400–600 (or trough 15–20 mg/L for endocarditis, bacteraemia, pneumonia and CNS infection) with pre-dose levels checked before the 4th dose and after any renal-function change; daily creatinine and urine output.",
    doseRelatedEffects: [
      "Rapid infusion: vancomycin flushing reaction with erythema of face and torso, pruritus and hypotension (histamine release, rate-related — slow the infusion, give antihistamine).",
      "Therapeutic exposure: phlebitis, neutropenia and thrombocytopenia with prolonged courses, rash.",
      "High exposure: acute kidney injury (interstitial nephritis and tubular toxicity), ototoxicity with very high levels, DRESS and linear IgA bullous dermatosis (rare).",
    ],
    interactions: [
      "Additive nephrotoxicity with piperacillin–tazobactam, aminoglycosides, NSAIDs, contrast, ciclosporin and loop diuretics.",
      "Additive ototoxicity with aminoglycosides and loop diuretics.",
      "Cleared substantially by high-flux CRRT and intermittent haemodialysis — dose after dialysis and use circuit-specific regimens or levels will be misleading.",
    ],
  },

  ceftriaxone: {
    doseResponse:
      "Time-dependent killing with a long half-life (6–9 h) allowing once-daily dosing: 2 g daily for most severe infections and 2 g twice daily for meningitis, where higher CSF concentrations are required. Increasing frequency rather than single-dose size drives CNS penetration.",
    therapeuticWindow:
      "Wide, with no routine monitoring; biliary and renal precipitation are the dose- and duration-related hazards, and neurotoxicity occurs with accumulation in severe renal impairment (halve dose if eGFR <10 mL/min).",
    titrationTarget:
      "Clinical and CSF/blood culture response, de-escalating once sensitivities are known; no plasma levels needed.",
    doseRelatedEffects: [
      "Standard dose: diarrhoea, rash, transaminitis, eosinophilia.",
      "Prolonged or high dose: biliary sludging and pseudolithiasis (especially in children and with fasting), nephrolithiasis, immune haemolytic anaemia, neutropenia.",
      "Accumulation: encephalopathy and non-convulsive status (particularly in renal failure and the elderly).",
    ],
    interactions: [
      "Never co-administer with calcium-containing solutions (including Hartmann's) in neonates — fatal ceftriaxone–calcium precipitation; flush lines and separate in adults too.",
      "Enhances warfarin effect by suppressing gut flora vitamin K synthesis; monitor INR.",
      "Additive C. difficile risk with other broad-spectrum agents and proton pump inhibitors.",
    ],
  },

  "co-trimoxazole": {
    doseResponse:
      "Sequential blockade of folate synthesis (sulfamethoxazole on dihydropteroate synthase, trimethoprim on dihydrofolate reductase) gives synergy such that the combination is bactericidal where each drug alone is static. Dosing is indication-specific: 120 mg/kg/day in 2–4 divided doses (trimethoprim-equivalent 15–20 mg/kg/day) for Pneumocystis pneumonia versus 960 mg twice daily for ordinary infection — an order-of-magnitude difference.",
    therapeuticWindow:
      "Narrow at PCP treatment doses: hyperkalaemia, marrow suppression, AKI and rash are frequent and dose-related. Requires renal dose adjustment (halve at eGFR 15–30 mL/min) and folinic acid rescue is sometimes needed.",
    titrationTarget:
      "Clinical response with daily potassium, creatinine, full blood count and liver function during high-dose therapy; add corticosteroids in PCP with PaO₂ <9.3 kPa on air.",
    doseRelatedEffects: [
      "Standard dose: nausea, rash, mild rise in creatinine (trimethoprim inhibits tubular creatinine secretion without a true GFR fall).",
      "High dose: hyperkalaemia (trimethoprim is an amiloride-like ENaC blocker), hyponatraemia, megaloblastic anaemia, neutropenia, thrombocytopenia, transaminitis.",
      "Idiosyncratic/high dose: Stevens–Johnson syndrome and toxic epidermal necrolysis, aseptic meningitis, haemolysis in G6PD deficiency, methaemoglobinaemia.",
    ],
    interactions: [
      "Additive hyperkalaemia with ACE inhibitors/ARBs, spironolactone, heparin and potassium replacement — a classic and lethal ICU combination.",
      "Potentiates warfarin (CYP2C9 inhibition plus protein displacement), methotrexate (additive antifolate marrow toxicity) and phenytoin.",
      "Additive marrow suppression with azathioprine, mycophenolate and chemotherapy; additive nephrotoxicity with ciclosporin and tacrolimus.",
    ],
  },

  aciclovir: {
    doseResponse:
      "Requires viral thymidine kinase for activation, so activity is selective and essentially all-or-none against susceptible herpesviruses. Dosing is indication-driven: 10 mg/kg every 8 h (ideal body weight) for HSV encephalitis and varicella pneumonitis, 5 mg/kg every 8 h for mucocutaneous disease, adjusted for renal function.",
    therapeuticWindow:
      "Limited principally by crystal nephropathy and neurotoxicity, both concentration-dependent and both largely preventable by hydration and renal dose adjustment; poor solubility means the infusion must be given over at least 1 h.",
    titrationTarget:
      "Clinical and CSF PCR response (14–21 days for encephalitis) with daily creatinine, urine output and generous IV fluids; reduce dose and interval as eGFR falls and dose after dialysis.",
    doseRelatedEffects: [
      "Standard dose: nausea, phlebitis, mild transaminitis.",
      "Rapid infusion or dehydration: obstructive crystal nephropathy with AKI — the dominant dose-related toxicity.",
      "Accumulation in renal failure: neurotoxicity with confusion, hallucinations, tremor, myoclonus and seizures, which can mimic the encephalitis being treated.",
    ],
    interactions: [
      "Additive nephrotoxicity with vancomycin, aminoglycosides, NSAIDs, contrast and ciclosporin.",
      "Probenecid and mycophenolate raise aciclovir levels; aciclovir raises the neurotoxic risk of ciclosporin and tacrolimus in transplant recipients.",
      "Cleared by haemodialysis (dose after the session) and substantially by CRRT — under-dosing is a real risk if circuit clearance is ignored.",
    ],
  },
};

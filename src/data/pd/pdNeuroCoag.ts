import type { DrugPharmacodynamicsMap } from "./types";

export const pdNeuroCoag: DrugPharmacodynamicsMap = {
  lorazepam: {
    doseResponse:
      "GABA_A benzodiazepine-site modulation with a hypnotic ceiling as for midazolam, but slower onset (5–10 min IV) and longer effect (6–12 h) because of lower lipophilicity and slower redistribution. 4 mg IV is the standard adult seizure-terminating dose, repeated once at 10 min.",
    therapeuticWindow:
      "Wide cardiovascularly, narrow with respect to respiratory depression once combined with opioids and in the frail; the long duration means overshoot lasts hours. Cumulative dosing above 8 mg for status epilepticus rarely adds benefit and adds apnoea.",
    titrationTarget:
      "Seizure cessation (or CIWA score in alcohol withdrawal, or RASS for sedation), with airway patency and respiratory rate as the safety limits; move to a second-line antiepileptic rather than a third benzodiazepine dose.",
    doseRelatedEffects: [
      "Low dose: anxiolysis, amnesia, anticonvulsant effect.",
      "Moderate dose: sedation lasting hours, mild hypotension, respiratory depression.",
      "High dose or repeat dosing: apnoea, prolonged coma delaying neurological assessment, delirium, propylene glycol accumulation (lactic acidosis, raised osmolar gap, AKI) with high-dose infusions.",
    ],
    interactions: [
      "Marked synergy with opioids and other CNS depressants for apnoea.",
      "Glucuronidation only, so unlike midazolam it is relatively free of CYP interactions — an advantage in liver disease and with azoles.",
      "Reversed by flumazenil, with the same seizure caveat in chronic users.",
    ],
    tolerance: "Tolerance and dependence within days; withdrawal seizures follow abrupt cessation after prolonged use — taper deliberately.",
  },

  levetiracetam: {
    doseResponse:
      "SV2A vesicle-protein binding with a broad, forgiving dose–response: 60 mg/kg (max 4.5 g) IV load for status epilepticus, then 500–1500 mg twice daily. No hepatic enzyme involvement, and effect does not require level monitoring.",
    therapeuticWindow:
      "Very wide — the reason it has largely replaced phenytoin as second-line therapy; limited mainly by behavioural adverse effects and by accumulation in renal impairment (halve the dose at eGFR <50 mL/min, and dose after dialysis).",
    titrationTarget:
      "Seizure control clinically or on EEG; no routine plasma levels. Reduce for renal function and review behaviour daily.",
    doseRelatedEffects: [
      "Standard dose: somnolence, dizziness, headache.",
      "Higher dose or accumulation: irritability, agitation, aggression and psychosis ('levetiracetam rage'), which may be misread as ICU delirium.",
      "Rare: thrombocytopenia, leucopenia, and hypersensitivity reactions.",
    ],
    interactions: [
      "Notably free of pharmacokinetic interactions — no CYP induction or inhibition, so it is the drug of choice alongside chemotherapy, DOACs and antiretrovirals.",
      "Additive sedation with other CNS depressants; additive behavioural disturbance with steroids and delirium-promoting drugs.",
    ],
  },

  phenytoin: {
    doseResponse:
      "Use-dependent sodium-channel blockade with saturable (zero-order) kinetics, so the concentration–dose relationship becomes vertical near the top of the therapeutic range: a 100 mg dose increase can raise the level from 15 to 30 mg/L. Load 20 mg/kg at ≤50 mg/min with cardiac monitoring.",
    therapeuticWindow:
      "The classic narrow window: total level 10–20 mg/L (free 1–2 mg/L). Nystagmus appears above ~20 mg/L, ataxia above 30, and coma/seizures above 40. In hypoalbuminaemia and uraemia — routine in ICU — the total level underestimates the free active fraction, so measure free phenytoin or correct for albumin.",
    titrationTarget:
      "Seizure control with levels checked 2 h after loading and then at trough; ECG and blood pressure during the load; albumin-corrected or free level in critical illness.",
    doseRelatedEffects: [
      "Loading infusion: hypotension, bradyarrhythmia and asystole if infused faster than 50 mg/min; purple glove syndrome and severe tissue injury on extravasation (fosphenytoin is safer).",
      "Therapeutic level: nystagmus, gum hypertrophy, hirsutism, rash.",
      "Above range: ataxia, dysarthria, confusion, then paradoxical seizures and coma; long-term, cerebellar atrophy, osteomalacia and megaloblastic anaemia.",
    ],
    interactions: [
      "Potent CYP450 inducer — lowers levels of midazolam, rocuronium (resistance), warfarin (variably), DOACs, azoles, steroids and many antibiotics.",
      "Displaced from albumin by valproate, aspirin and uraemic toxins, raising the free fraction at a normal total level.",
      "Levels raised by fluconazole, metronidazole, amiodarone, omeprazole and isoniazid.",
      "Additive hypotension and bradycardia with propofol and β-blockers during loading; incompatible with glucose-containing fluids (crystallises).",
    ],
  },

  "hypertonic-saline": {
    doseResponse:
      "Osmotic effect proportional to the sodium gradient created: 2.7–3% boluses (typically 250 mL or 2–5 mL/kg) or 5 mL/kg of 5%/23.4% via central access raise serum sodium by roughly 2–5 mmol/L per bolus and reduce ICP within 5–10 min, with an effect lasting 2–6 h. Response is graded with the achieved sodium rise, not the volume given.",
    therapeuticWindow:
      "Bounded by sodium and osmolality targets: aim Na⁺ 145–155 mmol/L (ceiling 155–160) and osmolality <320 mOsm/kg. Correction of chronic hyponatraemia must not exceed 8–10 mmol/L in 24 h to avoid osmotic demyelination — the sharpest safety limit in this group.",
    titrationTarget:
      "ICP <22 mmHg and clinical neurology in raised ICP; symptom resolution and a 4–6 mmol/L rise in symptomatic hyponatraemia. Check sodium 1–2 hourly during active treatment.",
    doseRelatedEffects: [
      "Standard bolus: reduced ICP, transient hypertension and intravascular volume expansion, thirst, phlebitis via a peripheral line.",
      "Cumulative dosing: hypernatraemia, hyperchloraemic metabolic acidosis, hypokalaemia, fluid overload and pulmonary oedema in cardiac or renal failure.",
      "Excessive rate of sodium rise: osmotic demyelination syndrome (delayed, days later, often irreversible); rebound ICP rise when stopped abruptly.",
    ],
    interactions: [
      "Additive hypernatraemia with hydrocortisone, sodium bicarbonate, sodium-containing antibiotics and citrate anticoagulation.",
      "Sodium and volume load worsens congestion with fluid resuscitation and blunts the effect of loop diuretics.",
      "Competes with mannitol — combining both requires careful osmolality and volume-status monitoring.",
    ],
    tolerance: "Effect declines as the blood–brain barrier equilibrates and brain adapts; rebound intracranial hypertension follows abrupt cessation, so wean sodium slowly.",
  },

  mannitol: {
    doseResponse:
      "Osmotic diuretic: 0.25–1 g/kg IV over 15–20 min reduces ICP within 15–30 min for 2–6 h, with larger doses giving a larger but not proportionally longer effect. The initial effect includes plasma expansion and reduced blood viscosity before osmotic dehydration of brain tissue.",
    therapeuticWindow:
      "Framed by serum osmolality and osmolar gap: repeat dosing while osmolality <320 mOsm/kg and the osmolar gap <10–20 mOsm/kg; above this, AKI risk rises steeply. Contraindicated in established anuric renal failure.",
    titrationTarget:
      "ICP and pupillary/neurological response, with 4–6 hourly osmolality, sodium, potassium and renal function plus strict fluid balance to replace the diuresis.",
    doseRelatedEffects: [
      "Standard dose: brisk osmotic diuresis, hypovolaemia and hypotension if not replaced, hypokalaemia, initial transient hyponatraemia.",
      "Repeat dosing: hyperosmolality, hypernatraemia, AKI (osmotic nephrosis), pulmonary oedema in heart failure.",
      "Excessive dosing: rebound intracranial hypertension as mannitol accumulates in injured brain, and coma from hyperosmolar state.",
    ],
    interactions: [
      "Additive hypovolaemia and electrolyte loss with loop diuretics (though sometimes deliberately combined).",
      "Additive nephrotoxicity with aminoglycosides, vancomycin, NSAIDs and contrast.",
      "Diuresis increases lithium and aminoglycoside clearance and depletes potassium, aggravating digoxin toxicity.",
    ],
    tolerance: "Rebound ICP rise with repeated dosing and a disrupted blood–brain barrier — a reason many units prefer hypertonic saline for repeated osmotherapy.",
  },

  nimodipine: {
    doseResponse:
      "Cerebroselective dihydropyridine calcium-channel blocker. Fixed dosing (60 mg enterally every 4 h for 21 days after aneurysmal subarachnoid haemorrhage) improves neurological outcome; the benefit is neuroprotective rather than angiographic, and higher doses simply cause hypotension.",
    therapeuticWindow:
      "Limited by systemic hypotension: if MAP falls, halve to 30 mg every 2 h rather than stopping outright, since interruption is associated with worse outcome. IV use requires central administration and continuous pressure monitoring.",
    titrationTarget:
      "Maintain the 21-day course while keeping MAP at the target set for cerebral perfusion (often ≥90 mmHg in vasospasm), with hourly neurological observation.",
    doseRelatedEffects: [
      "Standard dose: hypotension, headache, flushing, reflex tachycardia.",
      "Higher dose: significant hypotension compromising cerebral perfusion pressure — self-defeating in vasospasm.",
      "Rare: transaminitis, thrombocytopenia, ileus.",
    ],
    interactions: [
      "Additive hypotension with propofol, opioids, other antihypertensives and β-blockers.",
      "Levels raised markedly by CYP3A4 inhibitors (azoles, macrolides, ritonavir) and reduced by rifampicin, phenytoin and carbamazepine — grapefruit juice is a documented interaction.",
      "IV formulation is adsorbed by PVC — use polyethylene or glass giving sets, an interaction with the equipment rather than another drug.",
    ],
  },

  "tranexamic-acid": {
    doseResponse:
      "Competitive inhibition of plasminogen binding to fibrin is saturable: plasma concentrations around 10 mg/L abolish fibrinolysis, which the standard 1 g IV load followed by 1 g over 8 h achieves comfortably. Higher doses do not improve haemostasis and increase seizure risk.",
    therapeuticWindow:
      "Wide, but strictly time-dependent for benefit: given within 3 h of trauma or postpartum haemorrhage it reduces death from bleeding, and after 3 h it may increase it. Dose reduction is needed in renal impairment (renally cleared, 95% unchanged).",
    titrationTarget:
      "Not titrated to a laboratory value; give the fixed regimen early. Viscoelastic testing (maximum lysis) can confirm hyperfibrinolysis but should not delay administration.",
    doseRelatedEffects: [
      "Standard dose: nausea, vomiting, hypotension with rapid IV injection, visual disturbance.",
      "High dose or accumulation in renal failure: seizures (GABA_A antagonism, dose-dependent — notably after cardiac surgery), confusion.",
      "Any dose: theoretical thrombotic risk, not confirmed in the large randomised trials (CRASH-2, WOMAN, CRASH-3).",
    ],
    interactions: [
      "Do not use concurrently with prothrombotic states or in DIC with established thrombosis without haematology advice.",
      "Additive seizure risk with high-dose penicillins, meropenem, ciprofloxacin and hyponatraemia.",
      "Never give into an epidural or intrathecal route — fatal medication error (ampoule confusion with local anaesthetic).",
    ],
  },

  enoxaparin: {
    doseResponse:
      "Antithrombin-mediated, predominantly anti-Xa activity with a predictable linear dose–response, which is why routine monitoring is unnecessary: 40 mg daily for prophylaxis, 1 mg/kg twice daily (or 1.5 mg/kg daily) for treatment. Peak anti-Xa activity at 3–5 h.",
    therapeuticWindow:
      "Wide in normal renal function; narrows sharply at eGFR <30 mL/min (use 20 mg prophylaxis or 1 mg/kg once daily), in extremes of body weight and in pregnancy, where anti-Xa monitoring is justified (peak 0.5–1.0 IU/mL for treatment 4 h post-dose).",
    titrationTarget:
      "No routine monitoring; use anti-Xa levels in renal impairment, obesity, pregnancy and unexpected bleeding, with platelet count checked at baseline and periodically to detect HIT.",
    doseRelatedEffects: [
      "Prophylactic dose: injection-site bruising, mild rise in transaminases.",
      "Treatment dose: bleeding (GI, surgical site, retroperitoneal), hyperkalaemia via aldosterone suppression.",
      "Accumulation in renal failure: major and intracranial haemorrhage, spinal haematoma if neuraxial procedures are performed within 12 h (prophylaxis) or 24 h (treatment dose).",
    ],
    interactions: [
      "Additive bleeding with antiplatelets, NSAIDs, thrombolytics, DOACs, warfarin and SSRIs.",
      "Additive hyperkalaemia with ACE inhibitors, spironolactone and trimethoprim.",
      "Only partially reversed by protamine (~60% of anti-Xa activity) — the key difference from unfractionated heparin.",
    ],
  },

  "unfractionated-heparin": {
    doseResponse:
      "Antithrombin-dependent inhibition of thrombin and factor Xa with a non-linear, unpredictable dose–response (variable protein binding and antithrombin availability), hence mandatory monitoring. Effect is immediate IV, with a dose-dependent half-life of 30–90 min.",
    therapeuticWindow:
      "Narrow and monitored: APTR 1.5–2.5 (or anti-Xa 0.3–0.7 IU/mL) for treatment; ACT targets for cardiopulmonary bypass and circuits. Antithrombin deficiency, sepsis and lupus anticoagulant all distort the relationship between dose, APTR and true anticoagulation.",
    titrationTarget:
      "APTR or anti-Xa 6 h after starting and after every rate change, then daily once stable; platelet count every 2–3 days to screen for heparin-induced thrombocytopenia.",
    doseRelatedEffects: [
      "Low dose: bruising, minor bleeding, mild transaminitis.",
      "Therapeutic dose: major haemorrhage, hyperkalaemia, hypersensitivity.",
      "Prolonged or high dose: heparin-induced thrombocytopenia with thrombosis (day 5–10, 30–50% platelet fall — stop all heparin and use argatroban/danaparoid), osteoporosis, alopecia.",
    ],
    interactions: [
      "Additive bleeding with antiplatelets, thrombolytics, NSAIDs and other anticoagulants.",
      "Antithrombin depletion (sepsis, DIC, nephrotic syndrome, L-asparaginase) causes apparent heparin resistance — check antithrombin rather than escalating indefinitely.",
      "GTN infusion has been reported to increase heparin requirement; requirement falls when it stops.",
      "Fully reversed by protamine 1 mg per 100 units of heparin given in the last hour — watch for protamine-induced hypotension, bradycardia and pulmonary hypertension.",
    ],
  },

  "prothrombin-complex-concentrate": {
    doseResponse:
      "Replaces factors II, VII, IX and X directly, so the response is stoichiometric and near-immediate (INR corrects within 10–30 min). Dosing is weight- and INR-based (typically 25–50 units/kg), and repeat dosing is guided by re-checked INR rather than by a fixed schedule.",
    therapeuticWindow:
      "Wide for haemostasis but bounded by thrombosis risk (~1–2%), which rises with repeated high dosing and in patients with active thrombotic disease, prosthetic valves or recent VTE. Vitamin K 5–10 mg IV must be co-administered for warfarin reversal or the INR rebounds in 6–12 h as PCC factors decay.",
    titrationTarget:
      "INR <1.5 with clinical haemostasis; recheck INR 20–30 min after administration and again at 6 h.",
    doseRelatedEffects: [
      "Standard dose: rapid INR correction, transient rise in thrombin generation.",
      "Repeated or high dose: venous and arterial thrombosis, DIC in sepsis, volume-independent thrombotic risk (unlike FFP, no significant volume load).",
      "Rare: heparin-induced thrombocytopenia (most products contain heparin) and hypersensitivity.",
    ],
    interactions: [
      "Effect blunted if vitamin K is omitted for warfarin reversal — the two are complementary, not alternatives.",
      "Does not reverse DOACs reliably (idarucizumab for dabigatran, andexanet for anti-Xa agents are specific), though PCC is used when these are unavailable.",
      "Thrombotic risk additive with tranexamic acid, factor concentrates and prothrombotic states.",
    ],
  },

  "andexanet-idarucizumab": {
    doseResponse:
      "Both are target-specific and essentially all-or-none. Idarucizumab (5 g IV, two 2.5 g vials) binds dabigatran with ~350× the affinity of thrombin, normalising thrombin time within minutes. Andexanet alfa is a decoy factor Xa given as a bolus plus 2 h infusion (low- or high-dose regimen by agent, dose and timing), reducing anti-Xa activity by >90% during the infusion only.",
    therapeuticWindow:
      "Determined by rebound rather than toxicity: dabigatran can redistribute and re-anticoagulate after idarucizumab (a second 5 g dose may be needed), and anti-Xa activity rebounds when the andexanet infusion stops. Andexanet carries a definite thrombotic risk (~10% in registration studies) — restart anticoagulation as soon as safe.",
    titrationTarget:
      "Clinical haemostasis and imaging stability; thrombin time/dilute thrombin time for dabigatran and anti-Xa activity for apixaban/rivaroxaban where available — not the INR/APTR.",
    doseRelatedEffects: [
      "Idarucizumab: hypersensitivity, hypokalaemia, delirium, and re-elevation of dabigatran levels 12–24 h later.",
      "Andexanet: thrombotic events (ischaemic stroke, MI, DVT/PE), infusion reactions, and rebound anti-Xa activity after the infusion.",
      "Both: fructose load (idarucizumab, relevant in hereditary fructose intolerance) and cost/availability constraints that shape local protocols.",
    ],
    interactions: [
      "Andexanet binds heparin's antithrombin complex and makes subsequent heparinisation unreliable — a critical problem if urgent surgery or ECMO is planned.",
      "Thrombotic risk additive with PCC, tranexamic acid and factor concentrates — do not stack reversal agents without haematology advice.",
      "Idarucizumab does not affect other anticoagulants; dabigatran can be restarted 24 h later once bleeding has stopped.",
    ],
  },

  "regional-citrate-anticoagulation": {
    doseResponse:
      "Chelation of ionised calcium in the filter circuit: citrate dose is set as a ratio to blood flow (typically 3–4 mmol/L of blood) and titrated against post-filter ionised calcium, with systemic calcium replaced separately. The dose–response is a direct chemical relationship, not a receptor one.",
    therapeuticWindow:
      "Tight and two-sided: post-filter ionised calcium 0.25–0.35 mmol/L for circuit patency versus systemic ionised calcium 1.0–1.2 mmol/L for the patient. A total:ionised calcium ratio >2.5 signals citrate accumulation.",
    titrationTarget:
      "Post-filter ionised calcium 0.25–0.35 mmol/L, systemic ionised calcium 1.0–1.2 mmol/L, total:ionised calcium ratio <2.5, with acid–base and sodium monitored 6–12 hourly.",
    doseRelatedEffects: [
      "Correct dosing: prolonged filter life with no systemic anticoagulation and no bleeding risk — the main advantage over heparin.",
      "Excess citrate return: metabolic alkalosis (citrate is metabolised to bicarbonate), hypernatraemia, hypomagnesaemia.",
      "Citrate accumulation (hepatic failure, shock with lactate >4 mmol/L): metabolic acidosis with a rising total:ionised calcium ratio, ionised hypocalcaemia with tetany, arrhythmia and hypotension.",
    ],
    interactions: [
      "Impaired citrate metabolism in liver failure, severe shock and hypoperfusion — the principal contraindication.",
      "Additive hypocalcaemia with massive transfusion (also citrated), plasma exchange and albumin infusion.",
      "Alkalosis worsens ionised hypocalcaemia and shifts potassium intracellularly; adjust replacement fluids accordingly.",
    ],
  },
};

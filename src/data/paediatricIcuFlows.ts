import {
  drugDoseHref,
  infusionHref,
  caseBankHref,
  type ManagementFlow,
} from "@/data/icuManagementFlows";

export { drugDoseHref, infusionHref, caseBankHref };

/**
 * Paediatric critical care management pathways. Dosing links always open the
 * paediatric (or neonatal) column of the ICU dosing table.
 */
export const paedDrugDoseHref = (drug: string, neonatal = false) =>
  drugDoseHref(drug, neonatal ? "neonatal" : "paediatric");

export const paediatricIcuFlows: ManagementFlow[] = [
  {
    id: "paed-sepsis",
    title: "Paediatric sepsis and septic shock",
    blurb:
      "Surviving Sepsis Campaign children's guideline: recognition within the first hour, fluid with frequent reassessment, and early vasoactive support — remembering children compensate longer then crash fast.",
    triggers: [
      "Suspected infection with fever or hypothermia, tachycardia for age, and altered perfusion, mental state or feeding",
      "Cold shock (poor perfusion, narrow pulse pressure) or warm shock (bounding pulses, flash refill) — both are septic shock in children",
      "Fluid-refractory shock: persisting hypoperfusion after 40–60 mL/kg of balanced crystalloid",
    ],
    steps: [
      {
        title: "Recognise and start the first-hour bundle",
        timeframe: "0–60 min",
        actions: [
          "High-flow oxygen; obtain IV/IO access within 5 minutes — intraosseous early if IV fails; do not delay antibiotics for access attempts.",
          "Blood cultures before antibiotics if this does not delay them; broad-spectrum antibiotics within 1 hour of recognition of shock (within 3 hours for sepsis without shock).",
          "Bedside glucose (treat hypoglycaemia — limited glycogen stores), ionised calcium, lactate, FBC, U&E, coagulation and blood gas.",
          "Balanced crystalloid in 10–20 mL/kg boluses, reassessing after each for hepatomegaly, crackles and perfusion — up to 40–60 mL/kg in the first hour where intensive care is available.",
          "Consider early intubation with ketamine or a reduced-dose induction if work of breathing or coma threatens the airway — have a vasoactive infusion ready first.",
        ],
        drugs: ["Ceftriaxone", "Meropenem", "Vancomycin", "Piperacillin–tazobactam"],
        pitfall:
          "Stopping fluid at 20 mL/kg out of pulmonary oedema fear — in septic shock with ICU backup the greater danger is under-resuscitation; reassess, don't ration.",
      },
      {
        title: "Treat fluid-refractory shock",
        timeframe: "First 1–3 h",
        actions: [
          "Start a vasoactive infusion after 40–60 mL/kg if perfusion has not normalised — adrenaline for cold shock, noradrenaline for warm shock; peripheral or IO start is acceptable while central access is placed.",
          "Target normal perfusion pressure for age, capillary refill < 2–3 s, warm extremities, improving mental state and urine output > 1 mL/kg/h.",
          "Add hydrocortisone (2 mg/kg bolus then infusion, max 100 mg/dose) in catecholamine-resistant shock, especially with adrenal risk factors or purpura fulminans.",
          "Echo early: myocardial dysfunction is common and may need milrinone or dobutamine once the afterload is controlled.",
        ],
        drugs: ["Adrenaline", "Noradrenaline", "Hydrocortisone", "Milrinone"],
        infusions: ["Adrenaline (epinephrine)", "Noradrenaline (norepinephrine)"],
        pitfall:
          "Waiting for a central line before starting adrenaline — delay kills; a well-sited peripheral line in a proximal vein is an acceptable bridge.",
      },
      {
        title: "Source control and organ support",
        timeframe: "3–24 h",
        actions: [
          "Drain or debride the source early; send meningococcal PCR and give ceftriaxone if purpura fulminans — do not delay for CT.",
          "Lung-protective ventilation 6 mL/kg, SpO₂ 92–97%; conservative fluid once shock resolves.",
          "Renal replacement for refractory fluid overload > 10–20%, hyperkalaemia or acidaemia; transfuse to 70 g/L once stable (higher targets in cyanotic heart disease and severe hypoxaemia).",
          "Enteral nutrition within 48 h, glucose 4–8 mmol/L, VTE risk assessment by age and mobility.",
        ],
        drugs: ["Ceftriaxone", "Vancomycin", "Insulin (soluble)"],
      },
    ],
    rescue: [
      "Refractory shock despite two vasoactives and steroids: re-examine for missed source, adrenal crisis, myocarditis or tamponade, and discuss paediatric ECMO early with the retrieval service.",
      "Meningococcaemia with purpura fulminans: expect massive capillary leak, maintain ionised calcium, and anticipate airway oedema at intubation.",
    ],
    caseQuery: "sepsis",
    caseLabel: "Paediatric sepsis cases in the ICU bank",
    topicPaths: [
      { label: "Paediatric intensive care", path: "/intensive-care/paediatric-icu" },
      { label: "Paediatric core essentials", path: "/clinical/paediatric-core" },
    ],
  },
  {
    id: "paed-ards",
    title: "Paediatric ARDS (PARDS)",
    blurb:
      "PALICC-2 pathway: age-appropriate lung protection using oxygenation index rather than adult P/F ratios, with proning and HFOV/ECMO as escalation.",
    triggers: [
      "New parenchymal lung disease with hypoxaemia not explained by cardiac failure, within 7 days of a known insult",
      "Oxygenation index (OI = FiO₂ × mean airway pressure × 100 / PaO₂ in mmHg): mild 4–8, moderate 8–16, severe ≥ 16",
    ],
    steps: [
      {
        title: "Set lung-protective ventilation",
        timeframe: "First hour of invasive ventilation",
        actions: [
          "Tidal volume 5–8 mL/kg predicted body weight (3–6 mL/kg if severely restricted), plateau pressure ≤ 28 cmH₂O (≤ 32 if the chest wall is stiff).",
          "Accept permissive hypercapnia to pH ≥ 7.20; target SpO₂ 92–97% (lower targets in unrepaired cyanotic heart disease — know the lesion).",
          "PEEP titrated to oxygenation and compliance, typically 8–15 cmH₂O in moderate–severe PARDS.",
          "Sedation to a scored target with daily interruption once improving; avoid paralysis unless asynchrony or unsafe mechanics.",
        ],
        drugs: ["Morphine", "Midazolam", "Fentanyl"],
        infusions: ["Morphine", "Midazolam"],
        pitfall:
          "Ventilating a child with adult ARDS numbers — PALICC-2 uses OI and accepts lower SpO₂ targets; chasing 100% saturations buys volutrauma.",
      },
      {
        title: "Escalate when oxygenation fails",
        timeframe: "Within 12–24 h of moderate–severe PARDS",
        actions: [
          "Prone positioning when OI stays ≥ 8–10 despite optimised settings; sessions of 12–18 h with airway and pressure-area briefing.",
          "Neuromuscular blockade with atracurium or cisatracurium for ventilator asynchrony; cisatracurium preferred in organ failure (Hofmann elimination).",
          "Inhaled nitric oxide 5–20 ppm as a bridge while arranging escalation — improves oxygenation, not survival; wean carefully to avoid rebound.",
          "Consider HFOV only in experienced centres; discuss retrieval and VV-ECMO early for OI persistently > 16 or refractory hypercapnia with pH < 7.20.",
        ],
        drugs: ["Atracurium / cisatracurium"],
        pitfall:
          "Relying on iNO instead of calling the ECMO centre — treat it as a bridge to referral, not a destination.",
      },
      {
        title: "Recovery and weaning",
        timeframe: "Days 3+",
        actions: [
          "Spontaneous breathing trials once FiO₂ ≤ 0.5 and PEEP ≤ 8 cmH₂O; extubate to HFNC or CPAP where work of breathing allows.",
          "Screen for ventilator-associated pneumonia, barotrauma and ICU-acquired weakness; mobilise early.",
          "Feed enterally within 48 h; children have small glycogen reserves — monitor glucose on any fasting.",
        ],
      },
    ],
    rescue: [
      "Exclude reversible causes of deterioration first: tube displacement or obstruction, pneumothorax (high in surfactant-deficient stiff lungs), atelectasis, abdominal distension raising the diaphragm.",
      "Right ventricular protection matters more in children: pulmonary hypertension decompensates with hypercapnia, hypoxia and high mean airway pressure — echo early and treat PPHN actively.",
    ],
    caseQuery: "ards",
    caseLabel: "Paediatric ARDS cases in the ICU bank",
    topicPaths: [
      { label: "Paediatric intensive care", path: "/intensive-care/paediatric-icu" },
      { label: "Paediatric physiology", path: "/physiology/paediatric-physiology" },
    ],
  },
  {
    id: "neonatal-resus",
    title: "Neonatal resuscitation and stabilisation",
    blurb:
      "Resuscitation Council UK newborn life support from the delivery room to PICU admission: dry, warm, assess, inflate — then glucose, temperature and sepsis on the way in.",
    triggers: [
      "Apnoeic or gasping newborn, or heart rate < 100/min after drying and stimulation",
      "Meconium-stained liquor with a floppy, unresponsive baby",
      "Preterm delivery < 32 weeks, or any newborn with persisting cyanosis, grunting or shock",
    ],
    steps: [
      {
        title: "Dry, warm, assess and inflate",
        timeframe: "0–60 s",
        actions: [
          "Dry and wrap (polythene bag < 32 weeks without drying), start the clock, assess tone, breathing and heart rate at 30 s.",
          "If apnoeic or HR < 100/min: 5 inflation breaths of 2–3 s at 30 cmH₂O in air (term) — look for chest movement; heart rate response is the first sign of success.",
          "Use a two-person technique or mask repositioning, then airway adjuncts (Guedel, supraglottic airway ≥ 34 weeks/2 kg) before moving on.",
        ],
        pitfall:
          "Rushing to compressions when the chest never moved — neonatal bradycardia is nearly always respiratory; fix the inflation breaths first.",
      },
      {
        title: "Compressions, drugs and escalation",
        timeframe: "After 30 s of effective ventilation",
        actions: [
          "If HR < 60/min despite effective ventilation: compressions 3:1 at 120 events/min with oxygen increased to 100%.",
          "Umbilical venous access; adrenaline 10–30 micrograms/kg IV (0.1–0.3 mL/kg of 1 in 10,000) if HR remains < 60/min — repeat every 3–5 min.",
          "10 mL/kg sodium chloride 0.9% or O-negative blood for suspected hypovolaemia; sodium bicarbonate only for prolonged arrest with documented acidaemia.",
          "Check glucose and treat < 2.6 mmol/L with 2 mL/kg of 10% dextrose.",
        ],
        drugs: ["Adrenaline"],
        infusions: ["Adrenaline (epinephrine)"],
        pitfall:
          "ETT adrenaline doses differ (50–100 micrograms/kg) — know both routes, and never give undiluted 1 in 1,000 down the line.",
      },
      {
        title: "Post-resuscitation stabilisation",
        timeframe: "First hours",
        actions: [
          "Target SpO₂ 91–95% in preterm infants; avoid hyperoxia which worsens retinopathy and oxidative injury.",
          "Normothermia 36.5–37.5 °C; start therapeutic hypothermia within 6 h if moderate–severe hypoxic–ischaemic encephalopathy criteria are met.",
          "Blood culture and antibiotics for any resuscitated baby with sepsis risk factors; maintain glucose with 10% dextrose at 60–90 mL/kg/day.",
          "Umbilical arterial and venous lines if ventilated or on vasoactive drugs; cranial ultrasound and CFAM where encephalopathy is suspected.",
        ],
        drugs: ["Ceftriaxone", "Phenytoin", "Morphine"],
      },
    ],
    rescue: [
      "No heart rate response after effective ventilation, compressions and two doses of adrenaline: consider pneumothorax, haemorrhage, duct-dependent cardiac lesion or severe anaemia — get neonatal retrieval advice.",
      "Persisting cyanosis with a structurally normal chest X-ray: think PPHN or duct-dependent lesion — trial of prostaglandin E1 after discussion, and treat with oxygen, iNO and careful ventilation.",
    ],
    caseQuery: "neonatal",
    caseLabel: "Neonatal resuscitation cases in the ICU bank",
    topicPaths: [
      { label: "Paediatric core essentials", path: "/clinical/paediatric-core" },
      { label: "Paediatric intensive care", path: "/intensive-care/paediatric-icu" },
    ],
  },
  {
    id: "paed-brain",
    title: "Paediatric neuroprotection (TBI and DKA)",
    blurb:
      "Protect the injured child's brain from secondary injury — whether from trauma or cerebral oedema in DKA — with tight physiological targets and staged osmotherapy.",
    triggers: [
      "GCS ≤ 8 after head injury, or a deteriorating conscious level with abnormal posturing or pupils",
      "DKA with new headache, confusion, bradycardia or rising blood pressure — cerebral oedema until proved otherwise",
      "A child needing intubation with a brain injury: every hypotension and hypercapnia episode worsens outcome",
    ],
    steps: [
      {
        title: "Secure and set physiological targets",
        timeframe: "0–60 min",
        actions: [
          "Intubate with a neuroprotective sequence: preoxygenate, avoid hypotension (age-adjusted systolic ≥ 70 + 2×age in years as a floor; higher in TBI), use ketamine or fentanyl-based induction and rocuronium.",
          "Ventilate to normocapnia (PaCO₂ 4.5–5.0 kPa); head-up 30°, midline, loosen collar ties; SpO₂ > 94%.",
          "Normoglycaemia, normothermia — treat fever aggressively; no prophylactic hyperventilation.",
          "In DKA cerebral oedema: slow the fluids, exclude other causes, and treat immediately — do not wait for imaging.",
        ],
        drugs: ["Fentanyl", "Ketamine", "Rocuronium"],
        infusions: ["Fentanyl", "Midazolam", "Morphine"],
        pitfall:
          "A single episode of hypotension in paediatric TBI roughly doubles mortality — draw up push-dose pressor before induction, not after the fall.",
      },
      {
        title: "Tiered therapy for raised ICP",
        timeframe: "First 24–72 h",
        actions: [
          "Tier 1: sedation to target, analgesia, normocapnia, head-up nursing, treat seizures (clinical and subclinical — CFAM/EEG).",
          "Tier 2 osmotherapy: hypertonic saline boluses (3 mL/kg of 2.7–3%) for ICP crises or sodium targets; mannitol 0.25–0.5 g/kg as an alternative; in DKA cerebral oedema give hypertonic saline or mannitol at the first sign.",
          "Tier 3: decompressive craniectomy or barbiturate coma (thiopentone) for refractory intracranial hypertension after neurosurgical discussion.",
          "Lumbar drains are contraindicated with mass effect; image before any CSF diversion.",
        ],
        drugs: ["Hypertonic saline 2.7–5%", "Mannitol 20%", "Phenytoin", "Levetiracetam"],
        pitfall:
          "Mannitol in a hypotensive, hypovolaemic child causes an osmotic diuresis that collapses cerebral perfusion pressure — prefer hypertonic saline in shock.",
      },
      {
        title: "DKA-specific measures",
        timeframe: "Ongoing",
        actions: [
          "BSUKED/NICE paediatric DKA pathway: cautious rehydration over 48 h in moderate–severe DKA, insulin at 0.05 units/kg/h once fluids are running, and no insulin boluses.",
          "Neurological observations hourly on a formal tool; any deterioration means treat as cerebral oedema and call for senior help.",
          "Monitor potassium closely — expect falls once insulin starts; replace into the fluid.",
        ],
        drugs: ["Insulin (soluble)", "Mannitol", "Hypertonic saline 2.7–5%"],
      },
    ],
    rescue: [
      "Refractory intracranial hypertension: re-image (surgical lesion?), verify the CO₂ and sodium, and discuss decompressive craniectomy early rather than after a third-tier failure.",
      "Fixed dilated pupils after osmotherapy: still treat aggressively — children recover from insults that would be fatal in adults; prognosis is delayed at least 72 h.",
    ],
    caseQuery: "trauma",
    caseLabel: "Paediatric TBI and DKA cases in the ICU bank",
    topicPaths: [
      { label: "Paediatric intensive care", path: "/intensive-care/paediatric-icu" },
      { label: "Paediatric physiology", path: "/physiology/paediatric-physiology" },
    ],
  },
];

export const paediatricIcuFlowCount = paediatricIcuFlows.length;

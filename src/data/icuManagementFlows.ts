import { drugSlug } from "@/lib/caseDoseReferences";

export interface FlowStep {
  /** Short step heading, e.g. "0–15 min: recognise and resuscitate" */
  title: string;
  timeframe: string;
  /** Concrete actions with numbers, targets and thresholds */
  actions: string[];
  /** Drug names as they appear in the ICU dosing table */
  drugs?: string[];
  /** Infusion names as they appear in the ICU infusions guide */
  infusions?: string[];
  /** Common exam / bedside pitfall for this step */
  pitfall?: string;
}

export interface ManagementFlow {
  id: string;
  title: string;
  blurb: string;
  /** Bedside/exam triggers that put you in this pathway */
  triggers: string[];
  steps: FlowStep[];
  /** Escalation / rescue options when the pathway is failing */
  rescue: string[];
  /** Search terms used to pre-filter the ICU case bank */
  caseQuery: string;
  caseLabel: string;
  topicPaths: Array<{ label: string; path: string }>;
}

export const drugDoseHref = (drug: string, age: "adult" | "paediatric" | "neonatal" = "adult") =>
  `/intensive-care/drug-doses?drug=${drugSlug(drug)}${age === "adult" ? "" : `&age=${age}`}`;

export const infusionHref = (infusion: string) =>
  `/intensive-care/infusions?drug=${drugSlug(infusion)}`;

export const caseBankHref = (query: string) =>
  `/intensive-care/case-bank?q=${encodeURIComponent(query)}`;

export const icuManagementFlows: ManagementFlow[] = [
  {
    id: "sepsis",
    title: "Sepsis and septic shock",
    blurb:
      "Time-critical pathway from recognition to source control, using the Surviving Sepsis Campaign 2021 targets and the UK Sepsis Trust hour-1 actions.",
    triggers: [
      "Suspected infection with NEWS2 ≥ 5, or new confusion, or respiratory rate ≥ 25/min",
      "Lactate > 2 mmol/L, or mean arterial pressure < 65 mmHg despite initial fluid",
      "Septic shock definition: vasopressor requirement plus lactate > 2 mmol/L after adequate fluid",
    ],
    steps: [
      {
        title: "Recognise and start the hour-1 bundle",
        timeframe: "0–60 min",
        actions: [
          "High-flow oxygen to SpO₂ 94–98% (88–92% if at risk of CO₂ retention); blood cultures before antibiotics if this does not delay them beyond 1 hour.",
          "Broad-spectrum antibiotics within 1 hour of recognition of septic shock — do not wait for cultures or imaging.",
          "Lactate, full blood count, urea and electrolytes, liver function, clotting, blood gas; repeat lactate within 2–4 hours if initially > 2 mmol/L.",
          "Balanced crystalloid 30 mL/kg (about 2 L in a 70 kg adult) within the first 3 hours, given in 250–500 mL boluses with reassessment after each.",
          "Hourly urine output measurement; target > 0.5 mL/kg/h.",
        ],
        drugs: ["Piperacillin–tazobactam", "Meropenem", "Ceftriaxone", "Vancomycin"],
        pitfall:
          "Blind 30 mL/kg in cardiogenic or right-ventricular-limited physiology causes congestion — reassess fluid responsiveness (stroke volume variation, passive leg raise, echo) after each bolus.",
      },
      {
        title: "Restore perfusion pressure",
        timeframe: "First 1–6 h",
        actions: [
          "Start noradrenaline if MAP < 65 mmHg during or after fluid resuscitation — peripherally through a well-sited large cannula is acceptable while central access is obtained.",
          "Titrate to MAP ≥ 65 mmHg; use a higher target (75–85 mmHg) only in chronic hypertension or documented improvement in perfusion.",
          "Add vasopressin 0.03 units/min when noradrenaline reaches roughly 0.25–0.5 micrograms/kg/min, to limit catecholamine dose.",
          "Add hydrocortisone 200 mg/day (50 mg six-hourly or infusion) in shock still requiring noradrenaline ≥ 0.25 micrograms/kg/min for ≥ 4 hours.",
          "Insert arterial line and central venous catheter; assess cardiac output or echo if shock persists.",
        ],
        drugs: ["Noradrenaline", "Vasopressin", "Hydrocortisone", "Adrenaline"],
        infusions: ["Noradrenaline", "Vasopressin", "Adrenaline"],
        pitfall:
          "Persisting hypotension on rising noradrenaline without an echo — miss septic cardiomyopathy, undrained source or adrenal suppression.",
      },
      {
        title: "Source control and antimicrobial stewardship",
        timeframe: "6–12 h",
        actions: [
          "Definitive source control as soon as feasible, ideally within 6–12 h: drain collections, remove infected lines, debride or operate.",
          "Narrow antibiotics on culture results; review daily and use procalcitonin only as an adjunct to stopping, never to withhold treatment.",
          "Cover for MRSA or fungi only where risk factors exist; consider antibiotic pharmacokinetics — loading doses are unchanged in AKI, maintenance is not.",
        ],
        drugs: ["Vancomycin", "Meropenem"],
        pitfall:
          "Escalating vasopressors while an undrained abscess or infected prosthesis remains — vasopressor need is a source-control alarm.",
      },
      {
        title: "Organ support and de-escalation",
        timeframe: "24–72 h",
        actions: [
          "Lung-protective ventilation if intubated (6 mL/kg predicted body weight, plateau pressure < 30 cmH₂O).",
          "Renal replacement for refractory acidaemia, hyperkalaemia, fluid overload or uraemic complications — no benefit from starting early for creatinine alone (STARRT-AKI).",
          "Glucose target 8–10 mmol/L with variable-rate insulin; VTE prophylaxis and stress-ulcer prophylaxis where indicated; enteral nutrition within 48 h.",
          "Daily sedation hold, delirium screening, and de-escalation of vasopressors as lactate clears and urine output recovers.",
        ],
        drugs: ["Insulin (soluble)", "Enoxaparin", "Pantoprazole / omeprazole", "Propofol 1–2%"],
        infusions: ["Propofol 1–2%", "Fentanyl"],
      },
    ],
    rescue: [
      "Refractory shock: confirm source control, check ionised calcium, consider methylene blue or hydroxocobalamin in vasoplegia, and discuss ECMO/mechanical support if a reversible cardiac component dominates.",
      "Consider alternative diagnoses: adrenal crisis, anaphylaxis, occult haemorrhage, tamponade, thyroid storm, toxidrome.",
    ],
    caseQuery: "sepsis",
    caseLabel: "Sepsis cases in the ICU bank",
    topicPaths: [
      { label: "Sepsis and septic shock", path: "/intensive-care/sepsis" },
      { label: "Vasoactive agents", path: "/intensive-care/vasoactive-agents" },
    ],
  },
  {
    id: "ards",
    title: "ARDS and refractory hypoxaemia",
    blurb:
      "Berlin-defined ARDS managed by escalating lung protection, then proning and rescue therapies when oxygenation fails.",
    triggers: [
      "Acute onset within 1 week, bilateral infiltrates not explained by effusion/collapse/nodules, no primary cardiogenic cause",
      "PaO₂/FiO₂ ≤ 40 kPa (300 mmHg) on PEEP ≥ 5 cmH₂O — mild ≤ 40, moderate ≤ 26.7, severe ≤ 13.3 kPa",
    ],
    steps: [
      {
        title: "Set lung-protective ventilation",
        timeframe: "First hour of invasive ventilation",
        actions: [
          "Tidal volume 6 mL/kg predicted body weight (4–8 mL/kg range), plateau pressure < 30 cmH₂O, driving pressure < 15 cmH₂O.",
          "Respiratory rate up to 35/min accepting permissive hypercapnia to pH ≥ 7.20.",
          "PEEP titrated to oxygenation and compliance; higher PEEP tables for moderate–severe disease, avoiding overdistension.",
          "Target SpO₂ 88–95% / PaO₂ 8–10.7 kPa — avoid liberal oxygen.",
          "Conservative fluid strategy once shock has resolved (FACTT): aim for a neutral to negative balance.",
        ],
        drugs: ["Propofol 1–2%", "Fentanyl", "Midazolam"],
        infusions: ["Propofol 1–2%", "Fentanyl", "Midazolam"],
        pitfall:
          "Dosing tidal volume on actual weight instead of predicted body weight — a common exam trap and a real source of volutrauma.",
      },
      {
        title: "Escalate when P/F stays low",
        timeframe: "Within 12–24 h of severe ARDS",
        actions: [
          "Prone for ≥ 16 h/day when PaO₂/FiO₂ < 20 kPa (150 mmHg) on FiO₂ ≥ 0.6 and PEEP ≥ 5 (PROSEVA).",
          "Deep sedation and neuromuscular blockade for asynchrony or unsafe plateau pressures — cisatracurium infusion, not routine in all patients (ROSE).",
          "Recruitment manoeuvres cautiously; avoid aggressive stepwise recruitment plus decremental PEEP (ART harm signal).",
          "Inhaled nitric oxide or prostacyclin as a temporising oxygenation adjunct only.",
        ],
        drugs: ["Atracurium / cisatracurium", "Rocuronium"],
        infusions: ["Atracurium / cisatracurium"],
        pitfall:
          "Proning without pre-briefing airway, lines and pressure areas; unplanned extubation and facial pressure injury are the main harms.",
      },
      {
        title: "Consider extracorporeal support",
        timeframe: "24–72 h if failing",
        actions: [
          "Refer for veno-venous ECMO if PaO₂/FiO₂ < 6.7 kPa (50 mmHg) for > 3 h, < 10.7 kPa for > 6 h, or pH < 7.20 with PaCO₂ ≥ 8 kPa despite optimal settings (EOLIA/UK criteria).",
          "Refer early rather than after multi-organ failure; discuss with the regional severe respiratory failure centre.",
        ],
        pitfall:
          "Late referral once renal and cardiovascular failure are established markedly worsens outcome.",
      },
      {
        title: "Recovery and weaning",
        timeframe: "Days 3+",
        actions: [
          "Daily sedation interruption and spontaneous breathing trials once FiO₂ ≤ 0.4 and PEEP ≤ 8 cmH₂O with stable haemodynamics.",
          "Tracheostomy consideration around day 7–10 if prolonged weaning is likely; early rehabilitation and nutrition.",
          "Screen for and treat ventilator-associated pneumonia, barotrauma and ICU-acquired weakness.",
        ],
      },
    ],
    rescue: [
      "Exclude reversible deterioration first: tube obstruction, pneumothorax, lobar collapse, fluid overload, new pulmonary embolism.",
      "Right ventricular protection: limit driving pressure and PaCO₂, echo for cor pulmonale, and consider inhaled pulmonary vasodilators.",
    ],
    caseQuery: "ards",
    caseLabel: "ARDS and refractory hypoxaemia cases",
    topicPaths: [
      { label: "ARDS", path: "/intensive-care/ards" },
      { label: "Mechanical ventilation", path: "/intensive-care/mechanical-ventilation" },
    ],
  },
  {
    id: "shock",
    title: "Undifferentiated shock",
    blurb:
      "A structured approach to hypotension with hypoperfusion: classify the shock, treat the physiology, then treat the cause.",
    triggers: [
      "MAP < 65 mmHg or systolic < 90 mmHg with hypoperfusion: lactate > 2 mmol/L, mottling, oliguria, altered mentation",
      "Rising vasopressor requirement, or shock of unclear aetiology after initial fluid",
    ],
    steps: [
      {
        title: "Immediate stabilisation and classification",
        timeframe: "0–15 min",
        actions: [
          "Oxygen, large-bore access, arterial line, 12-lead ECG, bedside blood gas with lactate, ionised calcium and haemoglobin.",
          "Focused echo and lung/IVC ultrasound to separate the four patterns: hypovolaemic, cardiogenic, obstructive, distributive.",
          "Give a 250–500 mL balanced crystalloid challenge and reassess unless overt pulmonary oedema or tamponade physiology.",
          "Correct ionised calcium < 1.0 mmol/L and severe acidaemia impairing catecholamine response.",
        ],
        drugs: ["Calcium gluconate 10%", "Metaraminol", "Noradrenaline"],
        infusions: ["Noradrenaline"],
        pitfall:
          "Treating every hypotension as septic — obstructive causes (tension pneumothorax, tamponade, massive PE) worsen with fluid alone.",
      },
      {
        title: "Pattern-specific treatment",
        timeframe: "15–60 min",
        actions: [
          "Hypovolaemic/haemorrhagic: control bleeding, balanced blood product resuscitation, tranexamic acid 1 g within 3 h of trauma, permissive hypotension until surgical control.",
          "Distributive: noradrenaline first line, vasopressin second, hydrocortisone in refractory septic shock; treat anaphylaxis with intramuscular adrenaline 0.5 mg then infusion.",
          "Cardiogenic: dobutamine or adrenaline for low cardiac index, noradrenaline to preserve coronary perfusion, urgent revascularisation for ischaemia, consider mechanical support.",
          "Obstructive: decompress tension pneumothorax, pericardiocentesis for tamponade, thrombolysis or embolectomy for high-risk pulmonary embolism.",
        ],
        drugs: ["Adrenaline", "Dobutamine", "Milrinone", "Tranexamic acid", "Vasopressin"],
        infusions: ["Adrenaline", "Dobutamine", "Milrinone", "Noradrenaline"],
        pitfall:
          "Milrinone and dobutamine both vasodilate — pair with a vasopressor or MAP will fall further.",
      },
      {
        title: "Confirm adequacy of resuscitation",
        timeframe: "1–6 h",
        actions: [
          "Trend lactate clearance, central venous oxygen saturation, venoarterial CO₂ gap (< 6 mmHg suggests adequate flow), capillary refill time.",
          "Cardiac output monitoring where the pattern is unclear or vasopressor need is escalating; recheck echo after each major change.",
          "Restrict further fluid once fluid responsiveness is lost; start de-escalation and diuresis when perfusion allows.",
        ],
        pitfall:
          "Chasing a MAP number while flow remains inadequate — a normal blood pressure on high-dose vasopressor is not resuscitation.",
      },
    ],
    rescue: [
      "Vasoplegia unresponsive to two vasopressors plus steroid: consider methylene blue, angiotensin II where available, and review for occult sepsis or adrenal insufficiency.",
      "Cardiogenic shock not responding to inotropes: early discussion about intra-aortic balloon pump, Impella, or VA-ECMO in a centre that offers them.",
    ],
    caseQuery: "shock",
    caseLabel: "Shock cases in the ICU bank",
    topicPaths: [
      { label: "Circulatory failure and shock", path: "/intensive-care/circulatory-failure" },
      { label: "Cardiac output monitoring", path: "/intensive-care/cardiac-output-monitoring" },
    ],
  },
  {
    id: "multi-organ-failure",
    title: "Multi-organ dysfunction",
    blurb:
      "System-by-system daily plan for the patient with two or more failing organs, with escalation and ceiling-of-treatment decisions.",
    triggers: [
      "SOFA score rising, or two or more organ systems needing support",
      "Persistent inflammation, immunosuppression and catabolism after the acute insult is treated",
    ],
    steps: [
      {
        title: "Daily systematic review",
        timeframe: "Every ward round",
        actions: [
          "Respiratory: lung-protective settings, weaning readiness, secretions, imaging.",
          "Cardiovascular: MAP target, vasopressor trend, fluid balance and echo where flow is uncertain.",
          "Renal: urine output, creatinine trend, potassium and acid–base, RRT indications and citrate anticoagulation.",
          "Neuro: sedation depth (RASS −2 to 0 unless indicated otherwise), delirium screen, analgesia-first strategy.",
          "GI/nutrition: enteral feed 20–25 kcal/kg/day building up, prokinetics for intolerance, stress-ulcer prophylaxis.",
          "Haematology/infection: transfusion threshold 70 g/L in stable patients, VTE prophylaxis, antimicrobial review and de-escalation.",
        ],
        drugs: [
          "Regional citrate (CRRT)",
          "Insulin (soluble)",
          "Enoxaparin",
          "Pantoprazole / omeprazole",
          "Thiamine (Pabrinex)",
        ],
        infusions: ["Propofol 1–2%", "Fentanyl", "Noradrenaline"],
        pitfall:
          "Sedation creep and unreviewed antibiotics are the two commonest drivers of prolonged multi-organ support.",
      },
      {
        title: "Support escalation decisions",
        timeframe: "As dysfunction progresses",
        actions: [
          "Renal replacement for refractory hyperkalaemia, acidaemia, fluid overload, uraemic complications or dialysable toxins — not for creatinine alone.",
          "Liver failure: treat precipitants, watch for cerebral oedema in acute liver failure, apply King's College criteria and refer early.",
          "Anticipate drug accumulation: reduce or re-dose sedatives, opioids, antimicrobials and anticoagulants for organ clearance.",
        ],
        drugs: ["N-acetylcysteine", "Terlipressin", "Hypertonic saline 2.7–5%"],
      },
      {
        title: "Prognostication, ceilings and communication",
        timeframe: "Days 3–7 and ongoing",
        actions: [
          "Use trajectory over single scores; document a clear escalation plan and treatment ceiling with the multidisciplinary team.",
          "Structured family meetings: prognosis, values, and what treatments would and would not achieve.",
          "If dying is expected, move to symptom-focused care, withdraw non-beneficial support, and consider organ donation referral where appropriate.",
        ],
        drugs: ["Morphine", "Midazolam"],
        infusions: ["Morphine", "Midazolam"],
        pitfall:
          "Deferring the ceiling-of-treatment conversation until a crisis forces it — the exam and the bedside both reward early, documented planning.",
      },
    ],
    rescue: [
      "Reassess for a missed reversible driver: undrained sepsis, ischaemic gut, abdominal compartment syndrome, drug toxicity, HLH or thrombotic microangiopathy.",
      "Measure intra-abdominal pressure if abdominal distension, rising airway pressures and oliguria coexist.",
    ],
    caseQuery: "organ",
    caseLabel: "Organ-support cases in the ICU bank",
    topicPaths: [
      { label: "AKI and renal replacement", path: "/intensive-care/aki-rrt" },
      { label: "Prognostication and ethics", path: "/intensive-care/prognostication-ethics" },
    ],
  },
];

export const icuFlowCount = icuManagementFlows.length;

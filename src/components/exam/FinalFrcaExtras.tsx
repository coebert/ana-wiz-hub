import { Link } from "react-router-dom";
import { allTopics, sectionMeta } from "@/data/curriculum";

/**
 * FRCA Final extras: curriculum map (RCoA 2021 curriculum, which governs the
 * 2026 exam sittings) and model SOE (viva) answers.
 */

const VIVAS: { q: string; answer: string[] }[] = [
  {
    q: "You cannot intubate a patient after induction. What do you do?",
    answer: [
      "Declare the problem and call for help; maintain oxygenation throughout (DAS 2015 unanticipated difficult intubation guideline).",
      "Plan A: optimise position, use videolaryngoscopy and a bougie, ensure full neuromuscular block; limit to three attempts (plus one by a more experienced colleague).",
      "Plan B: insert a second-generation supraglottic airway (maximum three attempts). If oxygenation is adequate, stop and think: wake the patient, proceed via the SGA, or intubate through it with a fibrescope.",
      "Plan C: final attempt at facemask ventilation with a two-person technique and adjuncts. If successful, wake the patient (consider sugammadex after rocuronium).",
      "Plan D (can't intubate, can't oxygenate): scalpel–bougie–tube cricothyroidotomy. Afterwards: document, tell the patient, complete an airway alert and report the incident.",
    ],
  },
  {
    q: "How would you manage suspected malignant hyperthermia under anaesthesia?",
    answer: [
      "Recognise it: unexplained rising end-tidal CO₂, tachycardia, rigidity (including masseter spasm), then a rising temperature.",
      "Call for help and the MH kit; stop volatile agents, maximise fresh gas flow, fit activated charcoal filters, and switch to TIVA to keep the patient anaesthetised.",
      "Give dantrolene 2.5 mg/kg IV, then 1 mg/kg every 5 minutes until the episode is controlled (AAGBI 2020 guideline).",
      "Treat the complications: active cooling, hyperkalaemia, acidosis, arrhythmias (avoid calcium channel blockers), and myoglobinuria with a urine output above 2 ml/kg/h.",
      "Monitor on ICU, check CK and look for DIC and compartment syndrome; refer the patient and family to the UK MH Investigation Unit in Leeds.",
    ],
  },
  {
    q: "A patient becomes agitated then arrests during a regional block. Discuss local anaesthetic systemic toxicity.",
    answer: [
      "Stop injecting, call for help, maintain the airway with 100% oxygen, and control seizures with a benzodiazepine, thiopental or propofol.",
      "In cardiac arrest, start ALS and expect a prolonged resuscitation (possibly over an hour); reduce adrenaline doses to 1 microgram/kg or less and avoid lidocaine for arrhythmias.",
      "Lipid emulsion 20%: 1.5 ml/kg bolus over 1 minute, then an infusion at 15 ml/kg/h; repeat the bolus up to twice at 5-minute intervals and double the infusion rate if needed. Maximum cumulative dose 12 ml/kg (AAGBI).",
      "Consider cardiopulmonary bypass or ECMO if available. Report the incident, and prevent recurrence with ultrasound guidance, dose calculation and incremental injection.",
    ],
  },
  {
    q: "What is your approach to suspected perioperative anaphylaxis?",
    answer: [
      "Recognise it: most commonly hypotension, then bronchospasm, with or without rash. Remove likely triggers (NAP6: antibiotics, neuromuscular blockers, chlorhexidine, Patent Blue).",
      "Call for help, give 100% oxygen, and give IV adrenaline 50 microgram boluses in adults, repeated as needed; start an adrenaline infusion if several doses are required. Give rapid IV crystalloid.",
      "Refractory hypotension: consider metaraminol, vasopressin or glucagon (in patients on beta-blockers). Start CPR if the systolic pressure is below 50 mmHg.",
      "Take mast cell tryptase samples as soon as possible, at 1–2 hours and at more than 24 hours. Refer to an allergy clinic, and inform the patient and GP.",
    ],
  },
  {
    q: "How do you assess and optimise an elderly patient for emergency laparotomy?",
    answer: [
      "Estimate risk with NELA or P-POSSUM and use it to plan the level of care; involve consultant surgeon and anaesthetist and a critical care bed if the predicted mortality is 5% or more.",
      "Screen for frailty (Clinical Frailty Scale) and involve elderly-care medicine; have shared decision-making and treatment-escalation conversations, and consider cognition and consent.",
      "Treat sepsis promptly (antibiotics within an hour), plan fluid resuscitation and electrolyte correction, and avoid delaying theatre.",
      "Intraoperatively: invasive monitoring as needed, goal-directed fluids, and protective ventilation. Afterwards: analgesia, early mobilisation and delirium prevention.",
    ],
  },
  {
    q: "Discuss the management of major obstetric haemorrhage.",
    answer: [
      "Activate the major haemorrhage protocol; get a multidisciplinary team (obstetrics, anaesthesia, midwifery, haematology) and wide-bore IV access.",
      "Identify the cause (the 4 Ts: tone, trauma, tissue, thrombin) and give uterotonics: oxytocin, ergometrine, carboprost and misoprostol, noting their contraindications.",
      "Give tranexamic acid 1 g IV (WOMAN trial), measure blood loss, use point-of-care viscoelastic testing, and keep fibrinogen above 2 g/L. Use cell salvage.",
      "Anaesthesia: continue regional anaesthesia if the patient is stable; convert to GA with rapid sequence induction if unstable. Afterwards: high-dependency care, thromboprophylaxis once safe, and a debrief.",
    ],
  },
  {
    q: "A child develops laryngospasm at the end of anaesthesia. How do you manage it?",
    answer: [
      "Recognise it: stridor or silent obstruction, paradoxical chest movement, loss of the capnography trace and falling saturations. Call for help.",
      "Remove the stimulus, suction the airway, apply 100% oxygen with CPAP via a tight-fitting facemask, and use jaw thrust (including firm pressure at Larson's point).",
      "If it doesn't resolve, deepen anaesthesia with IV propofol (around 1 mg/kg).",
      "If it persists with desaturation, give suxamethonium (IV about 0.5–1 mg/kg, or IM 4 mg/kg if there is no IV access) with atropine if bradycardic, then intubate if needed.",
      "Afterwards: watch for negative-pressure pulmonary oedema; prevent it next time by extubating either deep or fully awake.",
    ],
  },
  {
    q: "How do you manage a patient with severe traumatic brain injury on arrival in theatre or ICU?",
    answer: [
      "Prevent secondary injury: avoid hypoxia (keep PaO₂ above 13 kPa) and hypotension (keep systolic at least 110 mmHg in adults), and keep PaCO₂ at 4.5–5.0 kPa.",
      "Rapid sequence induction with manual in-line stabilisation; sedation and analgesia; 30° head-up tilt with the neck neutral and ties loose.",
      "Targets: ICP below 22 mmHg, CPP 60–70 mmHg (Brain Trauma Foundation), normoglycaemia, normothermia, sodium in the upper normal range.",
      "Raised ICP: osmotherapy (hypertonic saline or mannitol), deeper sedation, brief hyperventilation only as a bridge; involve neurosurgery for evacuation or decompressive craniectomy.",
      "Also: seizure prophylaxis, VTE prophylaxis once safe, and a tertiary survey for other injuries.",
    ],
  },
  {
    q: "Outline the first-hour management of septic shock.",
    answer: [
      "Recognise it early: suspected infection with organ dysfunction; septic shock means needing vasopressors to keep MAP at 65 mmHg or above with lactate above 2 mmol/L despite fluids (Sepsis-3).",
      "Take blood cultures, then give broad-spectrum antibiotics within one hour; measure lactate and repeat it.",
      "Give IV crystalloid (Surviving Sepsis Campaign 2021 suggests 30 ml/kg within 3 hours), reassessing response rather than giving fixed volumes.",
      "Start noradrenaline to target MAP 65 mmHg (peripheral access is acceptable at first); add vasopressin, then consider hydrocortisone if still needing escalating doses.",
      "Find and control the source, and escalate to ICU with ongoing organ support.",
    ],
  },
  {
    q: "Explain how a pulse oximeter works and its limitations.",
    answer: [
      "It uses the Beer–Lambert law: light at 660 nm (red) and 940 nm (infrared) is absorbed differently by deoxy- and oxyhaemoglobin.",
      "The pulsatile (AC) signal is divided by the steady (DC) signal at each wavelength. The ratio of ratios is converted to SpO₂ using a calibration curve from healthy volunteers.",
      "Limitations: carboxyhaemoglobin reads falsely high; methaemoglobin drives the reading towards 85%; dyes such as methylene blue read low; poor perfusion, motion and ambient light cause errors.",
      "It overestimates saturation in people with darker skin (a recognised equity issue), is inaccurate below about 70%, and lags behind hypoxaemia, especially with a finger probe.",
    ],
  },
];

const AREAS: { title: string; items: string; topics: string[]; vivas: number[] }[] = [
  { title: "General anaesthesia & airway", items: "Difficult airway (DAS guidelines), front-of-neck access, extubation, TIVA/TCI.", topics: ["airway-management", "tiva", "ent-anaesthesia", "emergency-surgery"], vivas: [0] },
  { title: "Regional & pain", items: "Neuraxial and peripheral blocks, local anaesthetic toxicity, acute and chronic pain.", topics: ["regional-anaesthesia", "local-anaesthetics", "brachial-plexus", "pain-medicine"], vivas: [2] },
  { title: "Obstetrics", items: "Labour analgesia, category 1 section, pre-eclampsia, haemorrhage, maternal collapse.", topics: ["obstetric-anaesthesia", "maternal-physiology", "transfusion-coagulation"], vivas: [5] },
  { title: "Paediatrics", items: "Neonatal physiology, airway, fluids, safeguarding, the unwell child.", topics: ["paediatric-anaesthesia", "paediatric-core", "paediatric-physiology", "paediatric-icu"], vivas: [6] },
  { title: "Cardiothoracic & neuro", items: "Bypass, one-lung ventilation, raised ICP, subarachnoid haemorrhage, spinal injury.", topics: ["cardiothoracic", "neuroanaesthesia", "neurointensive-care", "vascular-anaesthesia"], vivas: [7] },
  { title: "Perioperative medicine", items: "Pre-operative assessment, risk scores, CPET, frailty, ERAS, anaemia, diabetes.", topics: ["preoperative-assessment", "enhanced-recovery", "elderly-anaesthesia", "perioperative-fluids"], vivas: [4] },
  { title: "Intensive care", items: "Sepsis, ARDS, AKI, trauma, burns, organ donation, end-of-life care.", topics: ["sepsis", "ards", "aki-rrt", "organ-donation"], vivas: [8] },
  { title: "Applied sciences & patient safety", items: "Physiology, pharmacology and equipment applied to cases; crises, human factors, NAP findings.", topics: ["pulse-oximetry", "clinical-incidents", "non-technical-skills", "muscle-relaxants"], vivas: [9, 1, 3] },
];

const topicById = new Map(allTopics.map((t) => [t.id, t]));

export const FinalFrcaExtras = () => (
  <section aria-labelledby="curriculum-2026-heading" className="mb-10">
    <h2 id="curriculum-2026-heading" className="text-2xl font-serif font-bold text-foreground mb-2">
      FRCA Final 2026: curriculum map, notes and model viva answers
    </h2>
    <p className="text-sm text-muted-foreground mb-4">
      The 2026 Final FRCA sittings are set against the RCoA 2021 Curriculum for Anaesthetics
      Training (Stage 2). Each area below links to its revision notes and has model answers to
      common structured oral exam (SOE) questions. Say your answer out loud first, then compare,
      or practise live with an AI examiner in{" "}
      <Link to="/viva" className="underline">Viva Practice</Link>. Always check doses against
      current local and national guidance.
    </p>
    <div className="space-y-4">
      {AREAS.map((a) => (
        <div key={a.title} className="rounded-lg border border-border bg-card p-4">
          <h3 className="text-lg font-serif font-bold text-foreground">{a.title}</h3>
          <p className="text-sm text-muted-foreground mb-3">{a.items}</p>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">Notes</p>
          <ul className="flex flex-wrap gap-2 mb-3">
            {a.topics.map((id) => {
              const t = topicById.get(id);
              if (!t || !t.available) return null;
              return (
                <li key={id}>
                  <Link to={`${sectionMeta[t.section].path}/${t.id}`} className="inline-block rounded-md border border-border bg-background px-2.5 py-1 text-sm text-foreground hover:bg-muted/40">
                    {t.title}
                  </Link>
                </li>
              );
            })}
          </ul>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">Model viva answers</p>
          <div className="space-y-2">
            {a.vivas.map((i) => {
              const v = VIVAS[i];
              return (
                <details key={v.q} className="rounded-md border border-border bg-background px-3 py-2">
                  <summary className="cursor-pointer font-semibold text-foreground">{v.q}</summary>
                  <ol className="mt-2 list-decimal pl-5 space-y-1.5 text-sm text-muted-foreground leading-relaxed">
                    {v.answer.map((p) => <li key={p}>{p}</li>)}
                  </ol>
                </details>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default FinalFrcaExtras;

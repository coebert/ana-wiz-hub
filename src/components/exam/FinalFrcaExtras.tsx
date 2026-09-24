import { Link } from "react-router-dom";

/**
 * FRCA Final extras: curriculum map (RCoA 2021 curriculum, which governs the
 * 2026 exam sittings) and model SOE (viva) answers.
 */

const CURRICULUM_AREAS: { title: string; items: string; path: string }[] = [
  { title: "General anaesthesia & airway", items: "Difficult airway (DAS guidelines), emergency front-of-neck access, extubation, TIVA/TCI.", path: "/clinical" },
  { title: "Regional & pain", items: "Neuraxial and peripheral blocks, LAST, acute and chronic pain, opioid stewardship.", path: "/clinical" },
  { title: "Obstetrics", items: "Labour analgesia, category 1 section, pre-eclampsia, obstetric haemorrhage, maternal collapse.", path: "/clinical" },
  { title: "Paediatrics", items: "Neonatal physiology, airway, fluids, safeguarding, the unwell child.", path: "/clinical" },
  { title: "Cardiothoracic & neuro", items: "Cardiac bypass, one-lung ventilation, raised ICP, subarachnoid haemorrhage, spinal injury.", path: "/clinical" },
  { title: "Perioperative medicine", items: "Pre-operative assessment, risk scores, CPET, frailty, ERAS, anaemia, diabetes.", path: "/perioperative" },
  { title: "Intensive care", items: "Sepsis, ARDS, AKI, trauma, burns, organ donation, end-of-life care.", path: "/intensive-care" },
  { title: "Applied basic sciences & safety", items: "Physiology, pharmacology and equipment applied to cases; human factors, NAP findings, consent.", path: "/physiology" },
];

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
];

export const FinalFrcaExtras = () => (
  <>
    <section aria-labelledby="curriculum-2026-heading" className="mb-10">
      <h2 id="curriculum-2026-heading" className="text-2xl font-serif font-bold text-foreground mb-2">
        FRCA Final 2026: curriculum map
      </h2>
      <p className="text-sm text-muted-foreground mb-4">
        The 2026 Final FRCA sittings are set against the RCoA 2021 Curriculum for Anaesthetics
        Training (Stage 2). These are the main areas examined, with links to the matching topics.
      </p>
      <ul className="grid gap-2 sm:grid-cols-2">
        {CURRICULUM_AREAS.map((a) => (
          <li key={a.title}>
            <Link to={a.path} className="block h-full rounded-md border border-border bg-card px-3 py-2 hover:bg-muted/40 transition-colors">
              <span className="font-semibold text-foreground">{a.title}</span>
              <span className="block text-sm text-muted-foreground leading-snug">{a.items}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>

    <section aria-labelledby="model-viva-heading" className="mb-10">
      <h2 id="model-viva-heading" className="text-2xl font-serif font-bold text-foreground mb-2">
        Model viva answers for the FRCA Final SOE
      </h2>
      <p className="text-sm text-muted-foreground mb-4">
        Structured model answers to common structured oral exam questions. Open one, say your answer
        out loud first, then compare. For live practice with an AI examiner, try{" "}
        <Link to="/viva" className="underline">Viva Practice</Link>. Always check doses against current local and national guidance.
      </p>
      <div className="space-y-2">
        {VIVAS.map((v) => (
          <details key={v.q} className="rounded-md border border-border bg-card px-3 py-2">
            <summary className="cursor-pointer font-semibold text-foreground">{v.q}</summary>
            <ol className="mt-2 list-decimal pl-5 space-y-1.5 text-sm text-muted-foreground leading-relaxed">
              {v.answer.map((p) => <li key={p}>{p}</li>)}
            </ol>
          </details>
        ))}
      </div>
    </section>
  </>
);

export default FinalFrcaExtras;

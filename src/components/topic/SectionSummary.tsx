import { Sparkles } from "lucide-react";

export type SectionKey =
  | "physics"
  | "physiology"
  | "pharmacology"
  | "anatomy"
  | "clinical"
  | "intensive-care"
  | "perioperative"
  | "chemistry";

const ACCENT: Record<SectionKey, string> = {
  physics: "text-physics",
  physiology: "text-physiology",
  pharmacology: "text-pharmacology",
  anatomy: "text-foreground",
  clinical: "text-clinical",
  "intensive-care": "text-icu",
  perioperative: "text-perioperative",
  chemistry: "text-foreground",
};

const SUMMARIES: Record<SectionKey, { title: string; points: string[] }> = {
  physics: {
    title: "Physics — key learning points",
    points: [
      "Master the SI base units, gas laws (Boyle, Charles, Gay-Lussac, Dalton, Henry) and apply them to vaporiser output, cylinder behaviour and gas solubility.",
      "Distinguish laminar from turbulent flow (Reynolds number, Hagen–Poiseuille) and apply it to tracheal tubes, IV cannulae and breathing-system resistance.",
      "Understand how pressure, temperature and humidity are measured, including transducer zeroing, levelling and the sources of damping and resonance error.",
      "Explain ultrasound, pulse oximetry, capnography and MRI physics well enough to predict their failure modes and artefacts at the bedside.",
      "Apply electrical-safety principles — leakage current, microshock, Class I/II/CF equipment and diathermy return-plate physics — to protect patients in theatre.",
    ],
  },
  physiology: {
    title: "Physiology — key learning points",
    points: [
      "Interpret cardiac, respiratory and renal physiology through pressure–volume, flow–volume and clearance relationships rather than memorised numbers.",
      "Use the oxyhaemoglobin dissociation curve, alveolar gas equation and V/Q relationships to reason about hypoxaemia at altitude, in shunt and in dead space.",
      "Apply Starling forces, autoregulation and the renal handling of sodium and water to fluid prescribing, oedema and oliguria.",
      "Link autonomic, endocrine and neuromuscular control to the cardiovascular, respiratory and metabolic responses to stress, surgery and critical illness.",
      "Recognise how pregnancy, paediatrics and the elderly modify baseline physiology and the implications for anaesthesia and resuscitation.",
    ],
  },
  pharmacology: {
    title: "Pharmacology — key learning points",
    points: [
      "Use PK principles (compartments, clearance, context-sensitive half-time) to predict onset, offset and accumulation of IV anaesthetics and opioids.",
      "Apply PD concepts — efficacy, potency, receptor reserve, tolerance — to dose-titrate volatiles, neuromuscular blockers and vasoactive agents.",
      "Compare the agents within each class (induction agents, opioids, NMBs, local anaesthetics, antiemetics) on mechanism, side-effects and clinical niche.",
      "Anticipate clinically important drug interactions and idiosyncratic reactions, including MH, anaphylaxis, serotonin syndrome and QT prolongation.",
      "Choose vasoactive and antiarrhythmic drugs rationally for shock states, balancing receptor profile, ino/chronotropy and afterload effects.",
    ],
  },
  anatomy: {
    title: "Anatomy — key learning points",
    points: [
      "Know the surface, sonographic and fascial anatomy that underpins airway management, vascular access and regional blocks.",
      "Map dermatomes, myotomes and autonomic outflow to predict block height, missed segments and haemodynamic effects of neuraxial anaesthesia.",
      "Understand the spinal column, brachial plexus and lumbosacral plexus in three dimensions to plan and trouble-shoot regional techniques safely.",
      "Apply thoracic, cardiac and abdominal anatomy to the interpretation of imaging, drain placement and one-lung ventilation.",
      "Use head, neck and cranial-nerve anatomy to anticipate the difficult airway and the consequences of intracranial pathology and surgery.",
    ],
  },
  clinical: {
    title: "Clinical anaesthesia — key learning points",
    points: [
      "Plan anaesthesia around a structured preoperative assessment that integrates comorbidity, functional capacity and patient-centred risk discussion.",
      "Deliver safe airway management — predicting difficulty, having a clear plan A–D, and following DAS/PROSPECT-style algorithms when things deviate.",
      "Tailor anaesthetic technique (GA, regional, sedation) to the patient, surgery and recovery goals, with explicit attention to PONV, pain and delirium.",
      "Manage common intra-operative crises (anaphylaxis, MH, LAST, massive haemorrhage, can't-intubate-can't-oxygenate) using rehearsed cognitive aids.",
      "Apply human-factors and non-technical skills — communication, situational awareness, leadership — to reduce error and improve team performance.",
    ],
  },
  "intensive-care": {
    title: "Intensive care — key learning points",
    points: [
      "Recognise and resuscitate the critically ill using an A–E approach, early lactate-guided sepsis bundles and lung-protective ventilation.",
      "Set and titrate mechanical ventilation (Vt, PEEP, plateau, driving pressure) for ARDS, obstructive disease and weaning, and recognise patient–ventilator asynchrony.",
      "Diagnose and manage shock states using a combined haemodynamic, echo and biochemical picture rather than a single number.",
      "Manage AKI, electrolyte disturbance and acid–base disorders, and prescribe and trouble-shoot RRT modalities.",
      "Apply ethical, prognostic and end-of-life frameworks — including organ donation pathways — to decision-making and family communication on the unit.",
    ],
  },
  perioperative: {
    title: "Perioperative medicine — key learning points",
    points: [
      "Stratify perioperative risk with validated tools (RCRI, ASA, CPET, NELA) and translate this into shared decision-making and pathway selection.",
      "Optimise comorbidities — anaemia, diabetes, frailty, cardiorespiratory disease — and apply enhanced recovery principles across the surgical journey.",
      "Tailor anaesthesia for specialty surgery (obstetrics, paediatrics, neuro, cardiothoracic, vascular, day-case) to the physiology and surgical demands.",
      "Plan perioperative fluid, transfusion and analgesia strategies that minimise complications, opioid load and length of stay.",
      "Coordinate transfer, post-op high-care and follow-up so that perioperative care extends safely beyond the theatre and recovery room.",
    ],
  },
  chemistry: {
    title: "Chemistry — key learning points",
    points: [
      "Use atomic structure, bonding and intermolecular forces to predict the physical behaviour of anaesthetic gases, vapours and IV agents.",
      "Apply acid–base, buffer and solution chemistry to interpret blood gases, fluid composition and drug ionisation at physiological pH.",
      "Recognise the organic-chemistry features (ester vs amide, chirality, functional groups) that determine drug metabolism, allergy and duration of action.",
      "Understand oxidation–reduction reactions relevant to methaemoglobinaemia, free-radical injury and antioxidant defences.",
      "Use units, concentrations and basic stoichiometry confidently when preparing infusions, diluting drugs and interpreting laboratory results.",
    ],
  },
};

interface SectionSummaryProps {
  section: SectionKey;
}

export const SectionSummary = ({ section }: SectionSummaryProps) => {
  const data = SUMMARIES[section];
  if (!data) return null;
  const accent = ACCENT[section];

  return (
    <section
      aria-labelledby={`section-summary-${section}`}
      className="mt-10 rounded-xl border border-border bg-card p-5 sm:p-6"
    >
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className={`h-5 w-5 ${accent}`} aria-hidden="true" />
        <h2
          id={`section-summary-${section}`}
          className="text-lg sm:text-xl font-serif font-bold text-foreground"
        >
          {data.title}
        </h2>
      </div>
      <ol className="space-y-2.5 list-decimal list-outside pl-5 text-sm sm:text-[15px] leading-relaxed text-foreground">
        {data.points.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ol>
    </section>
  );
};

export default SectionSummary;

export type ExamTag = "primary" | "final" | "fficm";
export type Section = "physics" | "physiology" | "pharmacology" | "anatomy" | "clinical" | "intensive-care" | "perioperative";

export interface Topic {
  id: string;
  title: string;
  description: string;
  section: Section;
  examTags: ExamTag[];
  available: boolean;
}

export const physicsTopics: Topic[] = [
  { id: "gas-laws", title: "Gas Laws", description: "Boyle's, Charles', Dalton's, Henry's laws and their clinical applications", section: "physics", examTags: ["primary", "final"], available: true },
  { id: "pressure-measurement", title: "Pressure Measurement", description: "Transducers, manometers, and invasive monitoring principles", section: "physics", examTags: ["primary", "final"], available: true },
  { id: "flow-measurement", title: "Flow & Flowmeters", description: "Laminar vs turbulent flow, Hagen-Poiseuille equation, rotameters", section: "physics", examTags: ["primary"], available: true },
  { id: "vaporizers", title: "Vaporizers", description: "Physics of vaporization, SVP, plenum and draw-over vaporizers", section: "physics", examTags: ["primary"], available: true },
  { id: "electrical-safety", title: "Electrical Safety", description: "Microshock, macroshock, diathermy, defibrillation", section: "physics", examTags: ["primary", "final"], available: true },
  { id: "pulse-oximetry", title: "Pulse Oximetry & Capnography", description: "Beer-Lambert law, absorption spectroscopy, infrared analysis", section: "physics", examTags: ["primary", "final", "fficm"], available: true },
  { id: "abg-analyser", title: "ABG Analyser & Gas Measurement", description: "pH electrode, Clark electrode, Severinghaus electrode, galvanic fuel cell", section: "physics", examTags: ["primary", "final"], available: true },
  { id: "temperature-measurement", title: "Temperature Measurement", description: "Thermocouples, thermistors, resistance thermometers, infrared tympanic thermometry", section: "physics", examTags: ["primary", "final"], available: true },
  { id: "humidity-gas-sampling", title: "Humidity & Gas Analysis", description: "Pneumotachographs, mass spectrometry, Raman scattering, humidification physics", section: "physics", examTags: ["primary", "final"], available: true },
  { id: "lasers-fibreoptics", title: "Lasers & Fibreoptics", description: "LASER principles, fibreoptic light transmission, total internal reflection, clinical applications", section: "physics", examTags: ["primary", "final"], available: true },
  { id: "ultrasound-physics", title: "Ultrasound Physics", description: "Piezoelectric effect, frequency vs resolution, Doppler effect, artefacts", section: "physics", examTags: ["primary", "final", "fficm"], available: true },
  { id: "mri-physics", title: "MRI Physics", description: "Nuclear spin, precession, T1/T2 relaxation, MRI safety for anaesthetists", section: "physics", examTags: ["primary", "final"], available: true },
  { id: "breathing-circuits", title: "Breathing Circuits & Scavenging", description: "Mapleson classification, circle system, soda lime, scavenging systems", section: "physics", examTags: ["primary", "final"], available: true },
  { id: "anaesthetic-machine", title: "The Anaesthetic Machine", description: "Pipeline supply, cylinder storage, pressure regulators, flowmeters, and safety features", section: "physics", examTags: ["primary", "final"], available: true },
  { id: "defibrillation-pacing", title: "Defibrillation & Pacing", description: "Monophasic vs biphasic waveforms, transthoracic impedance, pacemaker modes, and EMI", section: "physics", examTags: ["primary", "final", "fficm"], available: true },
  { id: "clinical-measurement", title: "Clinical Measurement", description: "Invasive arterial monitoring, natural frequency and damping, CVP, and cardiac output techniques", section: "physics", examTags: ["primary", "final", "fficm"], available: true },
  { id: "si-units-thermodynamics", title: "SI Units & Thermodynamics", description: "SI units, gas law derivations, latent heat, specific heat capacity, and laws of thermodynamics", section: "physics", examTags: ["primary"], available: true },
];

export const physiologyTopics: Topic[] = [
  { id: "oxygen-haemoglobin", title: "Oxygen-Haemoglobin Dissociation", description: "The ODC, Bohr effect, factors shifting the curve, oxygen delivery", section: "physiology", examTags: ["primary", "final", "fficm"], available: true },
  { id: "cardiac-cycle", title: "The Cardiac Cycle", description: "Pressure-volume loops, Wiggers diagram, cardiac output", section: "physiology", examTags: ["primary", "final", "fficm"], available: true },
  { id: "lung-mechanics", title: "Lung Mechanics", description: "Compliance, resistance, surfactant, work of breathing", section: "physiology", examTags: ["primary", "final", "fficm"], available: true },
  { id: "renal-physiology", title: "Renal Physiology", description: "GFR, tubular function, acid-base balance, electrolyte handling", section: "physiology", examTags: ["primary", "final", "fficm"], available: true },
  { id: "neuromuscular", title: "Neuromuscular Transmission", description: "Motor endplate, acetylcholine, muscle contraction, monitoring", section: "physiology", examTags: ["primary", "final"], available: true },
  { id: "autonomic-nervous", title: "Autonomic Nervous System", description: "Sympathetic and parasympathetic pathways, receptors, reflexes", section: "physiology", examTags: ["primary", "final"], available: true },
];

export const pharmacologyTopics: Topic[] = [
  { id: "pharmacokinetics", title: "Pharmacokinetic Principles", description: "Compartment models, volume of distribution, clearance, half-life", section: "pharmacology", examTags: ["primary", "final", "fficm"], available: true },
  { id: "iv-anaesthetics", title: "Intravenous Anaesthetic Agents", description: "Propofol, thiopentone, ketamine, etomidate — mechanisms and pharmacology", section: "pharmacology", examTags: ["primary", "final", "fficm"], available: true },
  { id: "volatile-agents", title: "Volatile Anaesthetic Agents", description: "MAC, Meyer-Overton, blood-gas partition coefficient, uptake and distribution", section: "pharmacology", examTags: ["primary", "final"], available: true },
  { id: "opioids", title: "Opioid Pharmacology", description: "Receptor subtypes, clinical pharmacology of morphine, fentanyl, remifentanil", section: "pharmacology", examTags: ["primary", "final", "fficm"], available: true },
  { id: "muscle-relaxants", title: "Neuromuscular Blocking Agents", description: "Depolarising vs non-depolarising, reversal agents, sugammadex", section: "pharmacology", examTags: ["primary", "final"], available: true },
  { id: "local-anaesthetics", title: "Local Anaesthetic Agents", description: "Mechanism, pKa, protein binding, toxicity, lipid rescue", section: "pharmacology", examTags: ["primary", "final"], available: true },
];

export const anatomyTopics: Topic[] = [
  { id: "airway-anatomy", title: "Airway & Laryngeal Anatomy", description: "Nasal cavity, pharynx, larynx, trachea, bronchial tree, innervation", section: "anatomy", examTags: ["primary", "final"], available: true },
  { id: "cardiac-anatomy", title: "Cardiac & Great Vessel Anatomy", description: "Heart chambers, coronary arteries, conducting system, great vessels", section: "anatomy", examTags: ["primary", "final", "fficm"], available: true },
  { id: "spinal-anatomy", title: "Vertebral Column & Spinal Cord", description: "Vertebral anatomy, meninges, epidural space, CSF, spinal tracts", section: "anatomy", examTags: ["primary", "final"], available: true },
  { id: "brachial-plexus", title: "Brachial Plexus", description: "Roots, trunks, divisions, cords, branches — relevant to upper limb blocks", section: "anatomy", examTags: ["primary", "final"], available: true },
  { id: "thoracic-anatomy", title: "Thoracic Anatomy", description: "Lungs, pleura, mediastinum, intercostal space, thoracic wall", section: "anatomy", examTags: ["primary", "final"], available: true },
  { id: "abdominal-anatomy", title: "Abdominal & Pelvic Anatomy", description: "Abdominal wall layers, inguinal canal, peritoneum, major organs", section: "anatomy", examTags: ["primary", "final"], available: true },
  { id: "head-neck-anatomy", title: "Head & Neck Anatomy", description: "Cranial nerves, neck triangles, blood supply, skull base foramina", section: "anatomy", examTags: ["primary", "final"], available: true },
  { id: "neuroanatomy", title: "Neuroanatomy", description: "Brain anatomy, cranial fossae, circle of Willis, CSF circulation, autonomic pathways", section: "anatomy", examTags: ["primary", "final", "fficm"], available: true },
];

export const clinicalTopics: Topic[] = [
  { id: "airway-management", title: "Airway Management", description: "Difficult airway algorithms, DAS guidelines, supraglottic devices, surgical airway", section: "clinical", examTags: ["final", "fficm"], available: true },
  { id: "regional-anaesthesia", title: "Regional & Neuraxial Anaesthesia", description: "Spinal, epidural, nerve blocks, ultrasound-guided techniques", section: "clinical", examTags: ["final"], available: true },
  { id: "obstetric-anaesthesia", title: "Obstetric Anaesthesia", description: "Caesarean section, epidural labour analgesia, high-risk obstetrics, PPH", section: "clinical", examTags: ["final"], available: true },
  { id: "paediatric-anaesthesia", title: "Paediatric Anaesthesia", description: "Neonatal physiology, paediatric pharmacology, common procedures", section: "clinical", examTags: ["final"], available: true },
  { id: "neuroanaesthesia", title: "Neuroanaesthesia", description: "ICP management, posterior fossa surgery, neuromonitoring, awakening", section: "clinical", examTags: ["final"], available: true },
  { id: "cardiothoracic", title: "Cardiothoracic Anaesthesia", description: "Cardiopulmonary bypass, one-lung ventilation, TOE basics", section: "clinical", examTags: ["final"], available: true },
  { id: "trauma-emergency", title: "Trauma & Emergency Anaesthesia", description: "RSI, damage control resuscitation, massive transfusion, ATLS", section: "clinical", examTags: ["final", "fficm"], available: true },
  { id: "clinical-incidents", title: "Critical Incidents", description: "Anaphylaxis, malignant hyperthermia, LA toxicity, awareness, can't intubate", section: "clinical", examTags: ["final", "fficm"], available: true },
  { id: "pain-medicine", title: "Pain Medicine", description: "Acute and chronic pain, neuropathic pain, multimodal analgesia, interventions", section: "clinical", examTags: ["final", "fficm"], available: true },
];

export const intensiveCareTopics: Topic[] = [
  { id: "sepsis", title: "Sepsis & Septic Shock", description: "Surviving Sepsis guidelines, early recognition, bundles, vasopressors", section: "intensive-care", examTags: ["final", "fficm"], available: true },
  { id: "mechanical-ventilation", title: "Mechanical Ventilation", description: "Ventilator modes, ARDS protocols, lung-protective strategies, weaning", section: "intensive-care", examTags: ["final", "fficm"], available: true },
  { id: "circulatory-failure", title: "Circulatory Failure & Shock", description: "Cardiogenic, distributive, obstructive, hypovolaemic shock management", section: "intensive-care", examTags: ["final", "fficm"], available: true },
  { id: "aki-rrt", title: "Acute Kidney Injury & RRT", description: "KDIGO staging, CRRT, IHD, indications for renal replacement therapy", section: "intensive-care", examTags: ["final", "fficm"], available: true },
  { id: "acute-liver-failure", title: "Acute Liver Failure", description: "Paracetamol toxicity, King's College criteria, liver transplantation", section: "intensive-care", examTags: ["fficm"], available: true },
  { id: "neurointensive-care", title: "Neurointensive Care", description: "TBI management, SAH, status epilepticus, brain death testing", section: "intensive-care", examTags: ["final", "fficm"], available: true },
  { id: "cardiac-output-monitoring", title: "Cardiac Output Monitoring", description: "PA catheter, PiCCO, oesophageal Doppler, echocardiography", section: "intensive-care", examTags: ["final", "fficm"], available: true },
  { id: "acid-base", title: "Acid-Base Disorders", description: "Stewart approach, strong ion difference, anion gap, base excess", section: "intensive-care", examTags: ["primary", "final", "fficm"], available: true },
  { id: "ards", title: "ARDS & Lung Injury", description: "Berlin definition, prone positioning, ECMO, rescue therapies", section: "intensive-care", examTags: ["final", "fficm"], available: true },
  { id: "icu-nutrition", title: "Nutrition in Critical Care", description: "Enteral vs parenteral, refeeding syndrome, metabolic response to illness", section: "intensive-care", examTags: ["fficm"], available: true },
  { id: "transfusion-coagulation", title: "Transfusion & Coagulation", description: "Massive transfusion protocols, DIC, TEG/ROTEM, blood products", section: "intensive-care", examTags: ["final", "fficm"], available: true },
  { id: "icu-sedation-delirium", title: "ICU Sedation & Delirium", description: "RASS, CAM-ICU, dexmedetomidine, sedation protocols, ABCDEF bundle", section: "intensive-care", examTags: ["fficm"], available: true },
  { id: "organ-donation", title: "Organ Donation", description: "Brainstem death testing, DCD, DBD, donor optimisation", section: "intensive-care", examTags: ["fficm"], available: true },
  { id: "antimicrobials-icu", title: "Antimicrobials in ICU", description: "Empiric therapy, antimicrobial resistance, stewardship, PK/PD dosing", section: "intensive-care", examTags: ["fficm"], available: true },
];

export const perioperativeTopics: Topic[] = [
  { id: "preoperative-assessment", title: "Preoperative Assessment", description: "Risk stratification, CPET, cardiac risk indices, optimisation", section: "perioperative", examTags: ["final"], available: true },
  { id: "enhanced-recovery", title: "Enhanced Recovery (ERAS)", description: "Perioperative care pathways, prehabilitation, goal-directed therapy", section: "perioperative", examTags: ["final"], available: true },
  { id: "perioperative-fluids", title: "Perioperative Fluid Therapy", description: "Crystalloids vs colloids, goal-directed, fluid responsiveness", section: "perioperative", examTags: ["final", "fficm"], available: true },
];

export const allTopics: Topic[] = [
  ...physicsTopics,
  ...physiologyTopics,
  ...pharmacologyTopics,
  ...anatomyTopics,
  ...clinicalTopics,
  ...intensiveCareTopics,
  ...perioperativeTopics,
];

export const topicsBySection: Record<Section, Topic[]> = {
  physics: physicsTopics,
  physiology: physiologyTopics,
  pharmacology: pharmacologyTopics,
  anatomy: anatomyTopics,
  clinical: clinicalTopics,
  "intensive-care": intensiveCareTopics,
  perioperative: perioperativeTopics,
};

export const sectionMeta: Record<Section, { label: string; path: string }> = {
  physics: { label: "Physics", path: "/physics" },
  physiology: { label: "Physiology", path: "/physiology" },
  pharmacology: { label: "Pharmacology", path: "/pharmacology" },
  anatomy: { label: "Anatomy", path: "/anatomy" },
  clinical: { label: "Clinical Anaesthesia", path: "/clinical" },
  "intensive-care": { label: "Intensive Care", path: "/intensive-care" },
  perioperative: { label: "Perioperative Medicine", path: "/perioperative" },
};

/**
 * Single source of truth for exam tags.
 * Use the `EXAM_TAGS` constant or `Exam.*` helper instead of bare string
 * literals so typos (e.g. "ficm" vs "fficm") cannot compile.
 */
export const EXAM_TAGS = ["primary", "final", "fficm", "edic"] as const;
export type ExamTag = (typeof EXAM_TAGS)[number];

/** Named accessor — `Exam.FFICM` instead of the string "fficm". */
export const Exam = {
  PRIMARY: "primary",
  FINAL: "final",
  FFICM: "fficm",
  EDIC: "edic",
} as const satisfies Record<string, ExamTag>;

/**
 * Compile-time validator. Use when you must keep an array of literals:
 *   examTags: examTags("primary", "final", "fficm")
 * Misspellings are rejected by the compiler.
 */
export const examTags = <T extends ExamTag[]>(...tags: T): T => tags;
export type Section = "physics" | "physiology" | "pharmacology" | "anatomy" | "clinical" | "intensive-care" | "perioperative" | "chemistry";

export interface Topic {
  id: string;
  title: string;
  description: string;
  section: Section;
  examTags: ExamTag[];
  available: boolean;
}

export const physicsTopics: Topic[] = [
  // Foundations
  { id: "si-units-thermodynamics", title: "SI Units & Thermodynamics", description: "SI units, gas law derivations, latent heat, specific heat capacity, and laws of thermodynamics", section: "physics", examTags: ["primary"], available: true },
  { id: "math-concepts", title: "Mathematical Concepts", description: "Graph shapes, exponentials, logarithms, sigmoid curves and their physiological and pharmacokinetic applications", section: "physics", examTags: ["primary", "final"], available: true },
  { id: "gas-laws", title: "Gas Laws", description: "Boyle's, Charles', Dalton's, Henry's laws and their clinical applications", section: "physics", examTags: ["primary", "final"], available: true },
  // Electricity & Optics
  { id: "electricity-magnetism", title: "Electricity & Magnetism", description: "Ohm's law, capacitance, inductance, transformers, and the Wheatstone bridge", section: "physics", examTags: ["primary", "final"], available: true },
  { id: "electrical-safety", title: "Electrical Safety", description: "Microshock, macroshock, diathermy, defibrillation", section: "physics", examTags: ["primary", "final"], available: true },
  { id: "defibrillation-pacing", title: "Defibrillation & Pacing", description: "Monophasic vs biphasic waveforms, transthoracic impedance, pacemaker modes, and EMI", section: "physics", examTags: ["primary", "final", "fficm"], available: true },
  { id: "optics-light", title: "Optics & Light", description: "Reflection, refraction, fibreoptics, Beer-Lambert law, and spectrophotometry", section: "physics", examTags: ["primary", "final"], available: true },
  { id: "lasers-fibreoptics", title: "Lasers & Fibreoptics", description: "LASER principles, fibreoptic light transmission, total internal reflection, clinical applications", section: "physics", examTags: ["primary", "final"], available: true },
  // Measurement principles
  { id: "pressure-measurement", title: "Pressure Measurement", description: "Transducers, manometers, and invasive monitoring principles", section: "physics", examTags: ["primary", "final"], available: true },
  { id: "flow-measurement", title: "Flow & Flowmeters", description: "Laminar vs turbulent flow, Hagen-Poiseuille equation, rotameters", section: "physics", examTags: ["primary"], available: true },
  { id: "temperature-measurement", title: "Temperature Measurement", description: "Thermocouples, thermistors, resistance thermometers, infrared tympanic thermometry", section: "physics", examTags: ["primary", "final"], available: true },
  { id: "humidity-gas-sampling", title: "Humidity & Gas Analysis", description: "Pneumotachographs, mass spectrometry, Raman scattering, humidification physics", section: "physics", examTags: ["primary", "final"], available: true },
  // Imaging
  { id: "ultrasound-physics", title: "Ultrasound Physics", description: "Piezoelectric effect, frequency vs resolution, Doppler effect, artefacts", section: "physics", examTags: ["primary", "final", "fficm"], available: true },
  { id: "mri-physics", title: "MRI Physics", description: "Nuclear spin, precession, T1/T2 relaxation, MRI safety for anaesthetists", section: "physics", examTags: ["primary", "final"], available: true },
  { id: "xray-radiation-safety", title: "X-rays & Radiation Safety", description: "X-ray production, photon–tissue interactions, dose units, ALARA, shielding and dosimetry for anaesthetists", section: "physics", examTags: ["primary", "final", "fficm"], available: true },
  // Anaesthetic equipment & monitoring (consolidated)
  { id: "equipment-monitoring", title: "Anaesthetic Equipment & Monitoring", description: "Unified workstation tour: machine, vaporizers, circuits, ventilators, monitoring, airway equipment and AAGBI safety checks", section: "physics", examTags: ["primary", "final", "fficm"], available: true },
  // Patient monitoring
  { id: "clinical-measurement", title: "Clinical Measurement", description: "Invasive arterial monitoring, natural frequency and damping, CVP, and cardiac output techniques", section: "physics", examTags: ["primary", "final", "fficm"], available: true },
  { id: "pulse-oximetry", title: "Pulse Oximetry & Capnography", description: "Beer-Lambert law, absorption spectroscopy, infrared analysis", section: "physics", examTags: ["primary", "final", "fficm"], available: true },
  { id: "abg-analyser", title: "ABG Analyser & Gas Measurement", description: "pH electrode, Clark electrode, Severinghaus electrode, galvanic fuel cell", section: "physics", examTags: ["primary", "final"], available: true },
  { id: "depth-of-anaesthesia", title: "Depth of Anaesthesia Monitoring", description: "BIS, Entropy, Narcotrend — processed EEG, suppression ratio, SEF, and clinical evidence", section: "physics", examTags: ["primary", "final", "fficm"], available: true },
  // Research methods
  { id: "statistics-ebm", title: "Statistics & Evidence-Based Medicine", description: "Study design, p-values, odds ratios, NNT, sensitivity/specificity, and common statistical tests", section: "physics", examTags: ["primary", "final", "fficm"], available: true },
];

export const physiologyTopics: Topic[] = [
  // Cardiovascular
  { id: "cardiac-cycle", title: "The Cardiac Cycle", description: "Pressure-volume loops, Wiggers diagram, cardiac output", section: "physiology", examTags: ["primary", "final", "fficm"], available: true },
  { id: "cardiac-electrophysiology", title: "Cardiac Electrophysiology", description: "Cardiac action potentials, ion channels, pacemaker cells, conduction system, anti-arrhythmic mechanisms", section: "physiology", examTags: ["primary", "final", "fficm"], available: true },
  { id: "starling-forces", title: "Starling Forces & Fluid Exchange", description: "Revised Starling equation, glycocalyx, transcapillary filtration, oedema formation", section: "physiology", examTags: ["primary", "final", "fficm"], available: true },
  // Respiratory
  { id: "lung-mechanics", title: "Lung Mechanics", description: "Compliance, resistance, surfactant, work of breathing", section: "physiology", examTags: ["primary", "final", "fficm"], available: true },
  { id: "ventilation-perfusion", title: "Ventilation-Perfusion Matching", description: "V/Q ratio, West's zones, HPV, shunt equation, alveolar gas equation, A-a gradient", section: "physiology", examTags: ["primary", "final", "fficm"], available: true },
  { id: "oxygen-haemoglobin", title: "Oxygen-Haemoglobin Dissociation", description: "The ODC, Bohr effect, factors shifting the curve, oxygen delivery", section: "physiology", examTags: ["primary", "final", "fficm"], available: true },
  // Neuro & Neuromuscular
  { id: "autonomic-nervous", title: "Autonomic Nervous System", description: "Sympathetic and parasympathetic pathways, receptors, reflexes", section: "physiology", examTags: ["primary", "final"], available: true },
  { id: "neuromuscular", title: "Neuromuscular Transmission", description: "Motor endplate, acetylcholine, muscle contraction, monitoring", section: "physiology", examTags: ["primary", "final"], available: true },
  // Renal, GI, Hepatic
  { id: "renal-physiology", title: "Renal Physiology", description: "GFR, tubular function, acid-base balance, electrolyte handling", section: "physiology", examTags: ["primary", "final", "fficm"], available: true },
  { id: "gi-physiology", title: "Gastrointestinal Physiology", description: "Gastric acid secretion, nausea & vomiting pathways, gut motility, and anaesthetic implications", section: "physiology", examTags: ["primary", "final"], available: true },
  { id: "hepatic-physiology", title: "Hepatic Physiology", description: "Hepatic blood supply, acinar zones, drug metabolism, synthetic function, LFTs", section: "physiology", examTags: ["primary", "final", "fficm"], available: true },
  // Endocrine & Haematology
  { id: "endocrine-physiology", title: "Endocrine Physiology", description: "HPA axis, stress response, thyroid, insulin, adrenal, and perioperative endocrine management", section: "physiology", examTags: ["primary", "final"], available: true },
  { id: "haematology-immunity", title: "Haematology & Immunity", description: "Coagulation cascade, blood groups, transfusion, innate/adaptive immunity, hypersensitivity", section: "physiology", examTags: ["primary", "final", "fficm"], available: true },
  // Developmental physiology
  { id: "maternal-physiology", title: "Maternal Physiology", description: "Cardiovascular, respiratory, haematological and pharmacological changes in pregnancy", section: "physiology", examTags: ["primary", "final"], available: true },
  { id: "foetal-circulation", title: "Foetal Circulation", description: "Foetal shunts, HbF, transitional circulation, persistent pulmonary hypertension", section: "physiology", examTags: ["primary", "final"], available: true },
];

export const pharmacologyTopics: Topic[] = [
  // Principles
  { id: "pharmacokinetics", title: "Pharmacokinetic Principles", description: "Compartment models, volume of distribution, clearance, half-life", section: "pharmacology", examTags: ["primary", "final", "fficm"], available: true },
  { id: "pharmacodynamics", title: "Pharmacodynamics & Drug Receptors", description: "Dose-response, agonists/antagonists, receptor types, signal transduction, drug interactions", section: "pharmacology", examTags: ["primary", "final"], available: true },
  // Anaesthetic agents
  { id: "iv-anaesthetics", title: "Intravenous Anaesthetic Agents", description: "Propofol, thiopentone, ketamine, etomidate — mechanisms and pharmacology", section: "pharmacology", examTags: ["primary", "final", "fficm"], available: true },
  { id: "volatile-agents", title: "Volatile Anaesthetic Agents", description: "MAC, Meyer-Overton, blood-gas partition coefficient, uptake and distribution", section: "pharmacology", examTags: ["primary", "final"], available: true },
  { id: "muscle-relaxants", title: "Neuromuscular Blocking Agents", description: "Depolarising vs non-depolarising, reversal agents, sugammadex", section: "pharmacology", examTags: ["primary", "final"], available: true },
  { id: "local-anaesthetics", title: "Local Anaesthetic Agents", description: "Mechanism, pKa, protein binding, toxicity, lipid rescue", section: "pharmacology", examTags: ["primary", "final"], available: true },
  // Analgesia
  { id: "opioids", title: "Opioid Pharmacology", description: "Receptor subtypes, clinical pharmacology of morphine, fentanyl, remifentanil", section: "pharmacology", examTags: ["primary", "final", "fficm"], available: true },
  { id: "nsaids-paracetamol", title: "NSAIDs & Paracetamol", description: "COX inhibition, aspirin, coxibs, paracetamol mechanism and toxicity, ceiling effects", section: "pharmacology", examTags: ["primary", "final"], available: true },
  // Cardiovascular
  { id: "vasoactive-agents", title: "Vasoactive & Inotropic Agents", description: "Catecholamines, vasopressors, inotropes, inodilators, vasodilators, digoxin, calcium, and receptor pharmacology", section: "pharmacology", examTags: ["primary", "final", "fficm"], available: true },
  { id: "antiarrhythmics", title: "Antiarrhythmic Drugs", description: "Vaughan-Williams classification, Na⁺/K⁺/Ca²⁺ channel blockers, β-blockers, amiodarone, adenosine, and pro-arrhythmic risk", section: "pharmacology", examTags: ["primary", "final", "fficm"], available: true },
  { id: "anticoagulants", title: "Anticoagulant Pharmacology", description: "Heparins (UFH/LMWH), warfarin, DOACs, HIT, reversal agents, and perioperative/neuraxial management", section: "pharmacology", examTags: ["primary", "final", "fficm"], available: true },
  // Anti-infectives & adjuncts
  { id: "antimicrobials-pharm", title: "Antimicrobials", description: "Antibiotics, antifungals, and antivirals — mechanisms, spectrum, resistance, and ICU considerations", section: "pharmacology", examTags: ["primary", "final", "fficm"], available: true },
  { id: "antiemetics", title: "Antiemetics", description: "PONV risk factors, receptor targets, ondansetron, dexamethasone, multimodal prophylaxis", section: "pharmacology", examTags: ["primary", "final"], available: true },
  { id: "corticosteroids", title: "Corticosteroids & Endocrine Pharmacology", description: "Steroid potency, HPA suppression, perioperative steroid cover, mineralocorticoid effects", section: "pharmacology", examTags: ["primary", "final", "fficm"], available: true },
];

export const anatomyTopics: Topic[] = [
  // Head & central nervous system
  { id: "head-neck-anatomy", title: "Head, Neck & Airway Anatomy", description: "Cranial nerves, neck triangles, larynx, trachea, bronchial tree, skull base, orbit", section: "anatomy", examTags: ["primary", "final"], available: true },
  { id: "neuroanatomy", title: "Neuroanatomy", description: "Brain anatomy, cranial fossae, circle of Willis, CSF circulation, autonomic pathways", section: "anatomy", examTags: ["primary", "final", "fficm"], available: true },
  // Spine
  { id: "spinal-anatomy", title: "Vertebral Column & Spinal Cord", description: "Vertebral anatomy, meninges, epidural space, CSF, spinal tracts", section: "anatomy", examTags: ["primary", "final"], available: true },
  // Trunk
  { id: "thoracic-anatomy", title: "Thoracic Anatomy", description: "Lungs, pleura, mediastinum, intercostal space, thoracic wall", section: "anatomy", examTags: ["primary", "final"], available: true },
  { id: "cardiac-anatomy", title: "Cardiac & Great Vessel Anatomy", description: "Heart chambers, coronary arteries, conducting system, great vessels", section: "anatomy", examTags: ["primary", "final", "fficm"], available: true },
  { id: "abdominal-anatomy", title: "Abdominal & Pelvic Anatomy", description: "Abdominal wall layers, inguinal canal, peritoneum, major organs", section: "anatomy", examTags: ["primary", "final"], available: true },
  // Limbs
  { id: "upper-limb-anatomy", title: "Upper Limb Anatomy", description: "Brachial plexus, arterial supply, cubital fossa, venous drainage — cannulation and regional blocks", section: "anatomy", examTags: ["primary", "final"], available: true },
  { id: "brachial-plexus", title: "Brachial Plexus", description: "Detailed brachial plexus organisation, block approaches, ultrasound anatomy, terminal nerves and complications", section: "anatomy", examTags: ["primary", "final"], available: true },
  { id: "lower-limb-anatomy", title: "Lower Limb & Lumbosacral Plexus", description: "Lumbar and sacral plexus, femoral/sciatic nerves, dermatomes, lower limb blocks", section: "anatomy", examTags: ["primary", "final"], available: true },
];

export const clinicalTopics: Topic[] = [
  // Environment & systems
  { id: "operating-theatre-environment", title: "The Operating Theatre & Theatre Complex", description: "Layout, zoning, laminar-flow ventilation, air changes, temperature/humidity, scavenging, electrical safety, theatre team workflow", section: "clinical", examTags: ["primary", "final"], available: true },
  // Core skills
  { id: "airway-management", title: "Airway Management", description: "Difficult airway algorithms, DAS guidelines, supraglottic devices, surgical airway", section: "clinical", examTags: ["final", "fficm"], available: true },
  { id: "regional-anaesthesia", title: "Regional & Neuraxial Anaesthesia", description: "Spinal, epidural, nerve blocks, ultrasound-guided techniques", section: "clinical", examTags: ["final"], available: true },
  { id: "tiva", title: "Total Intravenous Anaesthesia (TIVA)", description: "TCI pharmacokinetic models, Marsh vs Schnider vs Eleveld, Cp vs Ce targeting, practical TIVA setup", section: "clinical", examTags: ["primary", "final", "fficm"], available: true },
  { id: "pain-medicine", title: "Pain Medicine", description: "Acute and chronic pain, neuropathic pain, multimodal analgesia, interventions", section: "clinical", examTags: ["final", "fficm"], available: true },
  // Major sub-specialties
  { id: "obstetric-anaesthesia", title: "Obstetric Anaesthesia", description: "Caesarean section, epidural labour analgesia, high-risk obstetrics, PPH", section: "clinical", examTags: ["final"], available: true },
  { id: "paediatric-anaesthesia", title: "Paediatric Anaesthesia", description: "Neonatal physiology, paediatric pharmacology, common procedures", section: "clinical", examTags: ["final"], available: true },
  { id: "neuroanaesthesia", title: "Neuroanaesthesia", description: "ICP management, posterior fossa surgery, neuromonitoring, awakening", section: "clinical", examTags: ["final"], available: true },
  { id: "cardiothoracic", title: "Cardiothoracic Anaesthesia", description: "Cardiopulmonary bypass, one-lung ventilation, TOE basics", section: "clinical", examTags: ["final"], available: true },
  // Surgical specialties
  { id: "orthopaedic-anaesthesia", title: "Orthopaedic Anaesthesia", description: "Tourniquets, cement reactions, fat embolism, regional techniques, enhanced recovery", section: "clinical", examTags: ["final"], available: true },
  { id: "vascular-anaesthesia", title: "Vascular Anaesthesia", description: "AAA repair, aortic cross-clamping, carotid endarterectomy, peripheral vascular surgery", section: "clinical", examTags: ["final"], available: true },
  { id: "ent-anaesthesia", title: "ENT & Maxillofacial Anaesthesia", description: "Shared airway, tonsillectomy, laser surgery, nasal/ear surgery, tracheostomy, Le Fort fractures", section: "clinical", examTags: ["final"], available: true },
  { id: "ophthalmic-anaesthesia", title: "Ophthalmic Anaesthesia", description: "Ocular physiology, IOP, peribulbar/sub-Tenon's blocks, oculocardiac reflex", section: "clinical", examTags: ["final"], available: true },
  { id: "urological-anaesthesia", title: "Urological Anaesthesia", description: "TURP syndrome, lithotomy positioning, radical cystectomy, nephrectomy, ESWL", section: "clinical", examTags: ["final"], available: true },
  { id: "gynaecological-anaesthesia", title: "Gynaecological Anaesthesia", description: "Laparoscopic/robotic surgery, hysteroscopy fluid absorption, major oncology, Trendelenburg effects", section: "clinical", examTags: ["final"], available: true },
  { id: "hepatobiliary-transplant", title: "Hepatobiliary & Transplant Anaesthesia", description: "Liver resection, low CVP technique, liver transplant phases, cirrhotic patient, post-reperfusion syndrome", section: "clinical", examTags: ["final", "fficm"], available: true },
  { id: "burns-plastics", title: "Burns & Plastic Surgery", description: "Burn pathophysiology, Parkland formula, airway burns, suxamethonium risk, free flap surgery", section: "clinical", examTags: ["final", "fficm"], available: true },
  { id: "plastic-surgery", title: "Plastic Surgery & Microsurgery", description: "Free flap perfusion, microsurgical principles, prolonged surgery, digital replantation, DIEP flap", section: "clinical", examTags: ["final"], available: true },
  // Special populations & settings
  { id: "bariatric-anaesthesia", title: "Bariatric Anaesthesia", description: "Obesity physiology, drug dosing, airway management, OSA/OHS, bariatric surgery", section: "clinical", examTags: ["final"], available: true },
  { id: "elderly-anaesthesia", title: "Anaesthesia for the Elderly", description: "Frailty, age-related physiology, postoperative delirium, hip fracture, pharmacological changes", section: "clinical", examTags: ["final", "fficm"], available: true },
  { id: "day-surgery", title: "Day Surgery", description: "Patient selection, anaesthetic techniques, PONV prevention, discharge criteria", section: "clinical", examTags: ["final"], available: true },
  { id: "procedural-sedation", title: "Procedural Sedation", description: "Sedation continuum, drug techniques (bolus, infusion, TCI), patient selection, safe practice", section: "clinical", examTags: ["primary", "final"], available: true },
  { id: "interventional-radiology", title: "Anaesthesia for Interventional Radiology", description: "Remote location anaesthesia, contrast reactions, radiation safety, TIPSS, embolisation, EVAR", section: "clinical", examTags: ["final"], available: true },
  { id: "transfer-medicine", title: "Transfer of the Critically Ill Patient", description: "Pre-departure stabilisation, packaging, ventilation/sedation in transit, neuroprotection, in-transit emergencies, ECMO retrieval, aeromedical physiology", section: "clinical", examTags: ["final", "fficm"], available: true },
  { id: "patient-positioning", title: "Patient Positioning in Anaesthesia", description: "Supine, lithotomy, lateral, prone (Wilson/Jackson/Relton-Hall), park-bench and sitting positions — pressure points, nerve injury, physiological effects, neuro-anaesthesia positioning", section: "clinical", examTags: ["primary", "final", "fficm"], available: true },
  // Emergencies & incidents
  { id: "emergency-surgery", title: "Anaesthesia for Emergency Surgery", description: "Emergency laparotomy, appendicectomy, ruptured ectopic, NCEPOD classification, NELA standards", section: "clinical", examTags: ["final", "fficm"], available: true },
  { id: "trauma-emergency", title: "Trauma & Emergency Anaesthesia", description: "RSI, damage control resuscitation, massive transfusion, ATLS", section: "clinical", examTags: ["final", "fficm"], available: true },
  { id: "clinical-incidents", title: "Critical Incidents", description: "Anaphylaxis, malignant hyperthermia, LA toxicity, awareness, can't intubate", section: "clinical", examTags: ["final", "fficm"], available: true },
  { id: "resource-poor-anaesthesia", title: "Anaesthesia in Resource-Poor Settings", description: "WHO–WFSA standards, draw-over vaporisers, ketamine, spinal-first practice, Lifebox, SAFE courses, global surgery", section: "clinical", examTags: ["final", "fficm"], available: true },
  { id: "mass-casualty-military", title: "Mass Casualty, CRM & Military Anaesthesia", description: "Major-incident planning (METHANE), triage (Sieve/Sort/MPTT-24), crisis resource management, damage-control resuscitation & surgery, deployed military Roles 1–4, CBRN and blast injury", section: "clinical", examTags: ["final", "fficm"], available: true },
];

export const intensiveCareTopics: Topic[] = [
  // Respiratory
  { id: "mechanical-ventilation", title: "Mechanical Ventilation", description: "Ventilator modes, ARDS protocols, lung-protective strategies, weaning", section: "intensive-care", examTags: ["final", "fficm", "edic"], available: true },
  { id: "ards", title: "ARDS & Lung Injury", description: "Berlin definition, prone positioning, ECMO, rescue therapies", section: "intensive-care", examTags: ["final", "fficm", "edic"], available: true },
  { id: "bronchospastic-failure", title: "Bronchospastic Respiratory Failure", description: "Life-threatening asthma, IECOPD, pharmacology, NIV, ventilation strategies, inhaled volatiles via Sedaconda", section: "intensive-care", examTags: ["final", "fficm", "edic"], available: true },
  // Cardiovascular
  { id: "circulatory-failure", title: "Circulatory Failure, Shock & Mechanical Circulatory Support", description: "Hypovolaemic, cardiogenic, distributive and obstructive shock; vasopressor rationale; IABP, Impella, LVAD, VV/VA-ECMO", section: "intensive-care", examTags: ["final", "fficm", "edic"], available: true },
  { id: "cardiac-output-monitoring", title: "Cardiac Output Monitoring", description: "PA catheter, PiCCO, oesophageal Doppler, echocardiography", section: "intensive-care", examTags: ["final", "fficm", "edic"], available: true },
  { id: "pulmonary-hypertension", title: "Pulmonary Hypertension Management", description: "WHO classification, RV-protective strategy, targeted vasodilators, perioperative care and crisis management", section: "intensive-care", examTags: ["final", "fficm", "edic"], available: true },
  { id: "arrhythmias-ecg-icu", title: "Arrhythmias & ECG Interpretation", description: "Systematic ECG approach, brady- and tachyarrhythmias, heart block, bundle branch block, peri-arrest algorithms, electrolyte disturbances, ICU pacing & defibrillation", section: "intensive-care", examTags: ["final", "fficm", "edic"], available: true },
  { id: "cardiac-arrest-post-resus", title: "Cardiac Arrest & Post-Resuscitation Care", description: "Post-ROSC bundle, targeted temperature management (TTM2), multimodal neuroprognostication (clinical, NSE, EEG, SSEP, MRI), ECMO-CPR (eCPR), withdrawal & donation", section: "intensive-care", examTags: ["final", "fficm", "edic"], available: true },
  { id: "neuroprognostication", title: "Neuroprognostication after Cardiac Arrest", description: "ERC/ESICM 2021 multimodal algorithm — timing, clinical signs, EEG, SSEP (N20), NSE thresholds, neuroimaging, confounders and WLST decisions", section: "intensive-care", examTags: ["fficm", "edic"], available: true },
  { id: "ecmo", title: "Extracorporeal Membrane Oxygenation (ECMO)", description: "VV vs VA configurations, circuit physics, ELSO/EOLIA/CESAR criteria, ECPR (ARREST, Prague-OHCA, INCEPTION), Harlequin syndrome, LV distension, weaning trials", section: "intensive-care", examTags: ["fficm", "edic"], available: true },
  // Sepsis & Infection
  { id: "sepsis", title: "Sepsis & Septic Shock", description: "Surviving Sepsis guidelines, early recognition, bundles, vasopressors", section: "intensive-care", examTags: ["final", "fficm", "edic"], available: true },
  { id: "infectious-disease-icu", title: "Infectious Disease in ICU", description: "Organisms causing critical illness, pneumonia, urosepsis, CNS infections, necrotising fasciitis, fungal infections", section: "intensive-care", examTags: ["final", "fficm", "edic"], available: true },
  { id: "antimicrobials-icu", title: "Antimicrobials in ICU", description: "Empiric therapy, antimicrobial resistance, stewardship, PK/PD dosing", section: "intensive-care", examTags: ["fficm", "edic"], available: true },
  // Renal & Metabolic
  { id: "acid-base", title: "Acid-Base Disorders", description: "Stewart approach, strong ion difference, anion gap, base excess", section: "intensive-care", examTags: ["primary", "final", "fficm", "edic"], available: true },
  { id: "aki-rrt", title: "Acute Kidney Injury & RRT", description: "KDIGO staging, CRRT, IHD, indications for renal replacement therapy", section: "intensive-care", examTags: ["final", "fficm", "edic"], available: true },
  { id: "icu-nutrition", title: "Nutrition in Critical Care", description: "Enteral vs parenteral, refeeding syndrome, metabolic response to illness", section: "intensive-care", examTags: ["fficm", "edic"], available: true },
  { id: "icu-endocrine-emergencies", title: "Endocrine Emergencies in ICU", description: "DKA, HHS, thyroid storm, adrenal (Addisonian) crisis, myxoedema coma, phaeochromocytoma crisis, pituitary apoplexy", section: "intensive-care", examTags: ["final", "fficm", "edic"], available: true },
  // Neuro
  { id: "neurointensive-care", title: "Neurointensive Care", description: "TBI management, SAH, status epilepticus, brain death testing", section: "intensive-care", examTags: ["final", "fficm", "edic"], available: true },
  { id: "icu-sedation-delirium", title: "ICU Sedation & Delirium", description: "RASS, CAM-ICU, dexmedetomidine, sedation protocols, ABCDEF bundle", section: "intensive-care", examTags: ["fficm", "edic"], available: true },
  // Hepatic & Toxicology
  { id: "acute-liver-failure", title: "Acute Liver Failure", description: "Paracetamol toxicity, King's College criteria, liver transplantation", section: "intensive-care", examTags: ["fficm", "edic"], available: true },
  { id: "acute-pancreatitis", title: "Acute Severe Pancreatitis", description: "Atlanta classification, Glasgow score, fluid resuscitation, step-up necrosectomy, tertiary referral", section: "intensive-care", examTags: ["final", "fficm", "edic"], available: true },
  { id: "abdominal-compartment-syndrome", title: "Abdominal Compartment Syndrome", description: "WSACS definitions and grading, intravesical IAP measurement, APP target, primary vs secondary ACS, medical bundle, decompressive laparotomy and open abdomen", section: "intensive-care", examTags: ["final", "fficm", "edic"], available: true },
  { id: "toxicology", title: "Toxicology & Poisoning", description: "Paracetamol, opioid, TCA overdose, LAST, antidotes, toxidromes, lipid emulsion", section: "intensive-care", examTags: ["final", "fficm", "edic"], available: true },
  // Haematology
  { id: "transfusion-coagulation", title: "Transfusion & Coagulation", description: "Massive haemorrhage protocols, blood components & lifespans, transfusion reactions (TRALI/TACO), cell salvage, DIC, TEG/ROTEM", section: "intensive-care", examTags: ["final", "fficm", "edic"], available: true },
  { id: "haematology-icu", title: "Haematological & Immunological Disorders", description: "TTP, HLH/MAS, thrombotic microangiopathies, PLASMIC score, HScore, plasma exchange, and immunosuppression in ICU", section: "intensive-care", examTags: ["fficm", "edic"], available: true },
  // Perioperative critical care
  { id: "postop-high-risk-icu", title: "Critical Care of the High-Risk Surgical Patient", description: "Risk stratification (P-POSSUM/SORT/CPET/CFS), level-2/3 indications, structured handover, goal-directed therapy, MINS surveillance, NELA/CPOC standards", section: "intensive-care", examTags: ["final", "fficm", "edic"], available: true },
  // Special Populations
  { id: "paediatric-icu", title: "Paediatric Intensive Care", description: "Age-specific physiology, paediatric sepsis, congenital heart disease, neurocritical care, sedation, and resuscitation", section: "intensive-care", examTags: ["fficm", "edic"], available: true },
  { id: "burns-icu", title: "Burns Intensive Care", description: "Major-burn pathophysiology, airway/inhalation injury, fluid resuscitation (Parkland/modified Brooke), escharotomy, sepsis, nutrition, AKI, and ICU referral criteria", section: "intensive-care", examTags: ["final", "fficm", "edic"], available: true },
  // Ethics, Communication & Outcomes
  { id: "organ-donation", title: "Organ Donation", description: "Brainstem death testing, DCD, DBD, donor optimisation", section: "intensive-care", examTags: ["fficm", "edic"], available: true },
  { id: "prognostication-ethics-icu", title: "Prognostication, Ethics & Outcomes", description: "Prognostic scoring, treatment escalation plans, medical ethics, withdrawal of treatment, PICS, long-term outcomes", section: "intensive-care", examTags: ["final", "fficm", "edic"], available: true },
  { id: "end-of-life-communication", title: "End-of-Life Care & Communication", description: "Breaking bad news, family meetings, withdrawal of life-sustaining treatment, symptom control at end of life, conflict resolution, cultural and spiritual care", section: "intensive-care", examTags: ["fficm", "edic"], available: true },
  { id: "non-technical-skills", title: "Non-Technical Skills & Human Factors", description: "ANTS framework, situation awareness, decision-making, teamwork, leadership, crisis resource management, debriefing, just culture", section: "intensive-care", examTags: ["fficm", "edic"], available: true },
];

export const perioperativeTopics: Topic[] = [
  // Assessment & optimisation
  { id: "preoperative-assessment", title: "Preoperative Assessment", description: "Risk stratification, CPET, cardiac risk indices, optimisation", section: "perioperative", examTags: ["final"], available: true },
  { id: "enhanced-recovery", title: "Enhanced Recovery (ERAS)", description: "Perioperative care pathways, prehabilitation, goal-directed therapy", section: "perioperative", examTags: ["final"], available: true },
  { id: "perioperative-fluids", title: "Perioperative Fluid Therapy", description: "Crystalloids vs colloids, goal-directed, fluid responsiveness", section: "perioperative", examTags: ["final", "fficm"], available: true },
  { id: "vascular-access-devices", title: "Vascular Access Devices", description: "Cannulae, midlines, PICCs, CVCs, vascaths, trauma lines (RIC/MAC) and Swan-Ganz introducer sheaths", section: "perioperative", examTags: ["primary", "final", "fficm"], available: true },
  // Co-existing disease
  { id: "cardiovascular-disease", title: "Cardiovascular Co-Existing Disease", description: "IHD, valvular disease, heart failure, arrhythmias, pacemakers/ICDs, pulmonary hypertension, ACHD", section: "perioperative", examTags: ["primary", "final", "fficm"], available: true },
  { id: "respiratory-disease", title: "Respiratory Co-Existing Disease", description: "Asthma, COPD, OSA, restrictive lung disease, pulmonary fibrosis, respiratory infections", section: "perioperative", examTags: ["primary", "final", "fficm"], available: true },
  { id: "endocrine-disease", title: "Endocrine Co-Existing Disease", description: "Diabetes mellitus, thyroid disease, adrenal disorders, phaeochromocytoma, carcinoid syndrome", section: "perioperative", examTags: ["primary", "final", "fficm"], available: true },
  { id: "neurological-disease", title: "Neurological Co-Existing Disease", description: "Myasthenia gravis, epilepsy, MS, Parkinson's, MND, muscular dystrophies, spinal cord injury", section: "perioperative", examTags: ["primary", "final", "fficm"], available: true },
  { id: "hepatic-disease", title: "Hepatic Co-Existing Disease", description: "Cirrhosis, portal hypertension, Child-Pugh & MELD risk, altered pharmacology, coagulation, hepatorenal syndrome, anaesthesia for non-hepatic surgery in liver disease", section: "perioperative", examTags: ["final", "fficm"], available: true },
  { id: "genetic-syndromes", title: "Genetic Syndromes & Anaesthesia", description: "MH, dystrophinopathies, myotonic dystrophy, BChE deficiency, Down, Marfan, sickle cell, porphyria", section: "perioperative", examTags: ["final", "fficm"], available: true },
];

export const chemistryTopics: Topic[] = [
  { id: "atomic-structure-bonding", title: "Atomic Structure & Chemical Bonding", description: "Electron configuration, ionic/covalent/metallic bonds, intermolecular forces, electronegativity", section: "chemistry", examTags: ["primary"], available: true },
  { id: "acids-bases-buffers", title: "Acids, Bases & Buffer Systems", description: "pH, pKa, Henderson-Hasselbalch equation, physiological buffers, strong vs weak acids", section: "chemistry", examTags: ["primary", "final", "fficm"], available: true },
  { id: "organic-chemistry", title: "Organic Chemistry for Anaesthetists", description: "Functional groups, isomerism, chirality, and their relevance to drug structure and action", section: "chemistry", examTags: ["primary"], available: true },
  { id: "solutions-concentration", title: "Solutions & Concentration", description: "Molarity, molality, osmolality, osmolarity, tonicity, colligative properties", section: "chemistry", examTags: ["primary", "final"], available: true },
  { id: "oxidation-reduction", title: "Oxidation, Reduction & Electrochemistry", description: "Redox reactions, electrode potentials, clinical electrodes, free radicals", section: "chemistry", examTags: ["primary"], available: true },
];

export const allTopics: Topic[] = [
  ...physicsTopics,
  ...physiologyTopics,
  ...pharmacologyTopics,
  ...anatomyTopics,
  ...clinicalTopics,
  ...intensiveCareTopics,
  ...perioperativeTopics,
  ...chemistryTopics,
];

export const topicsBySection: Record<Section, Topic[]> = {
  physics: physicsTopics,
  physiology: physiologyTopics,
  pharmacology: pharmacologyTopics,
  anatomy: anatomyTopics,
  clinical: clinicalTopics,
  "intensive-care": intensiveCareTopics,
  perioperative: perioperativeTopics,
  chemistry: chemistryTopics,
};

export const sectionMeta: Record<Section, { label: string; path: string }> = {
  physics: { label: "Physics", path: "/physics" },
  physiology: { label: "Physiology", path: "/physiology" },
  pharmacology: { label: "Pharmacology", path: "/pharmacology" },
  anatomy: { label: "Anatomy", path: "/anatomy" },
  clinical: { label: "Clinical Anaesthesia", path: "/clinical" },
  "intensive-care": { label: "Intensive Care", path: "/intensive-care" },
  perioperative: { label: "Perioperative Medicine", path: "/perioperative" },
  chemistry: { label: "Chemistry Foundations", path: "/chemistry" },
};

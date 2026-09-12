/**
 * Per-topic SEO overrides: keyword-tuned title, meta description, and the
 * `alternateName` aliases used to build a MedicalWebPage JSON-LD block.
 *
 * Consumed by `TopicTemplate`. Any topic without an entry falls back to the
 * generic title/description that SectionLayout already emits.
 *
 * Title rule: ≤ 60 chars (Google truncates beyond that).
 * Description rule: 80–155 chars.
 */
export interface TopicSeo {
  /** Optional <title> override. Keep ≤ 60 chars. */
  title?: string;
  /** Optional <meta name="description"> override. 80–155 chars. */
  description?: string;
  /** Alternate names for the topic — feeds MedicalWebPage `about.alternateName`. */
  aliases: string[];
  /** Comma-joined into MedicalWebPage `keywords`. */
  keywords?: string[];
}

export const topicSeo: Record<string, TopicSeo> = {
  // ===== Physics =====
  "capnography": {
    title: "Capnography Waveforms & Normal ETCO₂ Range | FRCA",
    description: "Capnography for FRCA Primary/Final & FFICM: four waveform phases, abnormal patterns (shark-fin, curare cleft, rebreathing), normal ETCO₂ range (4.5–6.0 kPa / 35–45 mmHg) and CPR use.",
    aliases: ["Capnography", "Capnograph", "End-tidal CO2", "ETCO2", "EtCO₂", "Waveform capnography", "CO2 monitoring"],
    keywords: ["capnography", "capnography waveforms", "ETCO2 normal range", "end tidal CO2", "shark fin capnograph", "curare cleft", "waveform capnography FRCA"],
  },
  "electrical-safety": {
    title: "Electrical Safety: Shock Thresholds & Classes | FRCA",
    description: "Anaesthesia electrical safety for FRCA Primary physics: shock thresholds, equipment classification (Class I–III, type B/BF/CF), diathermy, defibrillation.",
    aliases: ["Electrical safety", "Microshock", "Macroshock", "Diathermy safety", "Equipment classification", "Type CF equipment"],
    keywords: ["FRCA Primary physics", "anaesthesia electrical safety", "equipment classification", "shock thresholds", "microshock", "macroshock", "type CF", "diathermy", "isolated power supply"],
  },
  // ===== Intensive Care (30 topics) =====
  "mechanical-ventilation": {
    title: "Mechanical Ventilation: Modes, ARDSnet & Weaning | FRCA",
    description: "FRCA/FFICM guide to mechanical ventilation: PCV vs VCV, ARDSnet lung-protective settings, PEEP titration, driving pressure, weaning and SBT protocols.",
    aliases: ["Invasive ventilation", "IPPV", "Lung-protective ventilation", "ARDSnet protocol", "Ventilator settings"],
    keywords: ["mechanical ventilation FRCA", "ARDSnet", "PEEP titration", "driving pressure", "ventilator weaning"],
  },
  "ards": {
    title: "ARDS: Berlin Definition, Prone, ECMO | FRCA/FFICM Notes",
    description: "Acute Respiratory Distress Syndrome for FRCA/FFICM: Berlin definition, lung-protective ventilation, prone positioning, neuromuscular blockade, EOLIA/VV-ECMO.",
    aliases: ["Acute Respiratory Distress Syndrome", "ARDS", "Adult Respiratory Distress Syndrome", "Berlin ARDS", "Acute lung injury"],
    keywords: ["ARDS Berlin definition", "prone positioning", "VV-ECMO", "EOLIA", "lung-protective ventilation"],
  },
  "bronchospastic-failure": {
    title: "Severe Asthma & IECOPD in ICU | FRCA/FFICM Notes",
    description: "Life-threatening asthma and IECOPD for FFICM: pharmacology, NIV vs invasive ventilation, permissive hypercapnia, inhaled volatiles via Sedaconda.",
    aliases: ["Status asthmaticus", "Acute severe asthma", "AECOPD", "IECOPD", "Bronchospasm in ICU"],
    keywords: ["status asthmaticus ICU", "AECOPD ventilation", "Sedaconda", "permissive hypercapnia"],
  },
  "circulatory-failure": {
    title: "Shock & Mechanical Circulatory Support | FFICM Notes",
    description: "Hypovolaemic, cardiogenic, distributive and obstructive shock; vasopressor rationale; IABP, Impella, LVAD, VV/VA-ECMO for FRCA Final and FFICM.",
    aliases: ["Shock", "Cardiogenic shock", "Distributive shock", "Hypovolaemic shock", "Mechanical circulatory support", "MCS"],
    keywords: ["cardiogenic shock", "IABP", "Impella", "VA-ECMO", "vasopressors"],
  },
  "cardiac-output-monitoring": {
    title: "Cardiac Output Monitoring: PAC, PiCCO, Doppler | FRCA",
    description: "Cardiac output monitoring for FRCA/FFICM: pulmonary artery catheter, PiCCO, LiDCO, oesophageal Doppler, echocardiography — principles, accuracy and indications.",
    aliases: ["Cardiac output monitor", "PA catheter", "Swan-Ganz", "PiCCO", "LiDCO", "Oesophageal Doppler"],
    keywords: ["cardiac output monitoring", "pulmonary artery catheter", "PiCCO", "oesophageal Doppler"],
  },
  "pulmonary-hypertension": {
    title: "Pulmonary Hypertension: ICU & Perioperative Care | FFICM",
    description: "Pulmonary hypertension for FFICM: WHO classification, RV-protective strategy, inhaled nitric oxide and prostacyclins, perioperative care and PH crisis management.",
    aliases: ["Pulmonary hypertension", "PH", "Pulmonary arterial hypertension", "PAH", "RV failure"],
    keywords: ["pulmonary hypertension ICU", "RV failure", "inhaled nitric oxide", "iloprost", "WHO PH classification"],
  },
  "arrhythmias-ecg-icu": {
    title: "Arrhythmias & ECG Interpretation in ICU | FFICM Notes",
    description: "ICU arrhythmias and ECG for FFICM: systematic ECG approach, brady/tachyarrhythmias, heart block, peri-arrest algorithms, electrolyte ECGs, pacing & defibrillation.",
    aliases: ["ICU arrhythmias", "ECG interpretation", "Atrial fibrillation ICU", "Tachyarrhythmia", "Bradyarrhythmia", "Peri-arrest"],
    keywords: ["ICU arrhythmia", "ECG interpretation", "peri-arrest algorithm", "AF in ICU"],
  },
  "cardiac-arrest-post-resus": {
    title: "Post-Cardiac Arrest Care: TTM2, eCPR, NSE | FFICM",
    description: "Post-resuscitation care for FFICM: ROSC bundle, targeted temperature management (TTM2), multimodal neuroprognostication, ECMO-CPR (ARREST, Prague-OHCA).",
    aliases: ["Cardiac arrest", "Post-ROSC", "Targeted temperature management", "TTM2", "Post-resuscitation care", "eCPR"],
    keywords: ["post cardiac arrest care", "TTM2 trial", "eCPR", "ARREST trial", "ROSC bundle"],
  },
  "neuroprognostication": {
    title: "Neuroprognostication after Cardiac Arrest | FFICM/EDIC",
    description: "ERC/ESICM 2021 multimodal neuroprognostication: timing, clinical exam, EEG, SSEP N20, NSE thresholds, neuroimaging, confounders and WLST decisions.",
    aliases: ["Neuroprognostication", "Post-arrest prognostication", "SSEP N20", "NSE", "ERC ESICM 2021"],
    keywords: ["neuroprognostication", "SSEP N20", "NSE threshold", "EEG post arrest", "ERC ESICM 2021"],
  },
  "ecmo": {
    title: "ECMO: VV vs VA, ECPR, Harlequin Syndrome | FFICM",
    description: "Extracorporeal Membrane Oxygenation for FFICM/EDIC: VV vs VA configurations, ELSO/EOLIA/CESAR criteria, ECPR (ARREST, Prague-OHCA), Harlequin syndrome, weaning.",
    aliases: ["Extracorporeal Membrane Oxygenation", "ECMO", "VV ECMO", "VA ECMO", "ECPR", "Extracorporeal life support", "ECLS"],
    keywords: ["VV vs VA ECMO", "ECPR", "Harlequin syndrome", "ELSO criteria", "EOLIA", "CESAR trial"],
  },
  "sepsis": {
    title: "Sepsis & Septic Shock: SSC Hour-1 Bundle | FFICM",
    description: "Sepsis and septic shock for FRCA/FFICM: Sepsis-3 definitions, qSOFA/SOFA, Surviving Sepsis Hour-1 bundle, vasopressor and steroid choices, source control.",
    aliases: ["Sepsis", "Septic shock", "Sepsis-3", "Surviving Sepsis Campaign", "SSC bundle"],
    keywords: ["sepsis FRCA", "Sepsis-3", "Surviving Sepsis 2021", "Hour-1 bundle", "septic shock"],
  },
  "infectious-disease-icu": {
    title: "Infectious Disease in ICU: Pneumonia, CNS, NF | FFICM",
    description: "Critical-care infections for FFICM: HAP/VAP, urosepsis, CNS infections, necrotising fasciitis, invasive fungal disease — pathogens, empirical antibiotics, source control.",
    aliases: ["ICU infection", "HAP", "VAP", "Necrotising fasciitis", "Meningitis ICU", "Invasive fungal infection"],
    keywords: ["ICU infection", "VAP", "necrotising fasciitis", "fungal infection ICU"],
  },
  "antimicrobials-icu": {
    title: "Antimicrobials in ICU: PK/PD & Stewardship | FFICM",
    description: "Antimicrobial therapy in critical care for FFICM/EDIC: empiric vs targeted therapy, antimicrobial resistance, stewardship, PK/PD-guided dosing in sepsis and AKI.",
    aliases: ["ICU antibiotics", "Antimicrobial stewardship", "PK/PD dosing", "Antibiotic resistance", "Empirical antibiotics"],
    keywords: ["ICU antibiotics", "antimicrobial stewardship", "PK PD dosing", "AMR"],
  },
  "acid-base": {
    title: "Acid-Base Disorders: Stewart, SID, Anion Gap | FRCA",
    description: "Acid-base for FRCA Primary/Final and FFICM: Henderson-Hasselbalch vs Stewart approach, strong ion difference, anion gap, base excess, mixed disorders.",
    aliases: ["Acid-base balance", "Stewart approach", "Strong ion difference", "Anion gap", "Base excess", "Metabolic acidosis"],
    keywords: ["acid base FRCA", "Stewart approach", "strong ion difference", "anion gap"],
  },
  "aki-rrt": {
    title: "Acute Kidney Injury & RRT: KDIGO, CRRT | FFICM",
    description: "AKI and renal replacement therapy for FRCA/FFICM: KDIGO staging, indications for RRT, CRRT vs IHD, dose, anticoagulation, drug dosing in CRRT.",
    aliases: ["Acute Kidney Injury", "AKI", "Renal Replacement Therapy", "RRT", "CRRT", "CVVH", "CVVHDF", "Continuous renal replacement therapy"],
    keywords: ["AKI KDIGO", "CRRT", "RRT indications", "continuous renal replacement therapy"],
  },
  "icu-nutrition": {
    title: "Nutrition in Critical Care: Refeeding & EN vs PN | FFICM",
    description: "Critical-care nutrition for FFICM/EDIC: enteral vs parenteral feeding, refeeding syndrome, indirect calorimetry, NUTRIC score, metabolic response to critical illness.",
    aliases: ["ICU nutrition", "Critical care nutrition", "Enteral nutrition", "Parenteral nutrition", "Refeeding syndrome", "NUTRIC score"],
    keywords: ["ICU nutrition", "refeeding syndrome", "enteral feeding", "parenteral nutrition"],
  },
  "icu-endocrine-emergencies": {
    title: "Endocrine Emergencies in ICU: DKA, HHS, Thyroid Storm",
    description: "Endocrine emergencies for FRCA/FFICM: DKA, HHS, thyroid storm, adrenal (Addisonian) crisis, myxoedema coma, phaeochromocytoma crisis, pituitary apoplexy.",
    aliases: ["Endocrine emergencies", "DKA", "HHS", "Thyroid storm", "Addisonian crisis", "Myxoedema coma", "Phaeochromocytoma crisis"],
    keywords: ["DKA ICU", "HHS", "thyroid storm", "adrenal crisis", "myxoedema coma", "phaeochromocytoma crisis"],
  },
  "neurointensive-care": {
    title: "Neurointensive Care: TBI, SAH, Status Epilepticus | FFICM",
    description: "Neurocritical care for FRCA/FFICM: traumatic brain injury, subarachnoid haemorrhage, status epilepticus, brainstem death testing, ICP and CPP targets.",
    aliases: ["Neurointensive care", "Neurocritical care", "TBI", "Traumatic brain injury", "Subarachnoid haemorrhage", "Status epilepticus", "Brainstem death"],
    keywords: ["TBI management", "SAH", "status epilepticus", "ICP CPP", "brainstem death"],
  },
  "icu-sedation-delirium": {
    title: "ICU Sedation & Delirium: RASS, CAM-ICU, ABCDEF | FFICM",
    description: "Sedation and delirium for FFICM/EDIC: RASS, CAM-ICU, propofol vs dexmedetomidine vs midazolam, light sedation, ABCDEF bundle and PADIS guidelines.",
    aliases: ["ICU sedation", "ICU delirium", "RASS", "CAM-ICU", "Dexmedetomidine", "ABCDEF bundle", "PADIS"],
    keywords: ["ICU sedation", "ICU delirium", "CAM-ICU", "dexmedetomidine", "ABCDEF bundle"],
  },
  "acute-liver-failure": {
    title: "Acute Liver Failure: King's College Criteria | FFICM",
    description: "Acute liver failure for FFICM/EDIC: paracetamol toxicity, King's College criteria, NAC, intracranial hypertension, liver transplantation referral.",
    aliases: ["Acute liver failure", "ALF", "Fulminant hepatic failure", "King's College criteria", "Paracetamol overdose"],
    keywords: ["acute liver failure", "King's College criteria", "paracetamol overdose", "NAC"],
  },
  "acute-pancreatitis": {
    title: "Acute Severe Pancreatitis: Atlanta, Glasgow | FFICM",
    description: "Acute severe pancreatitis for FRCA/FFICM: Atlanta classification, Glasgow score, fluid resuscitation, step-up necrosectomy, tertiary referral criteria.",
    aliases: ["Acute pancreatitis", "Severe acute pancreatitis", "Atlanta classification", "Glasgow score", "Necrotising pancreatitis"],
    keywords: ["acute pancreatitis", "Atlanta classification", "Glasgow score", "step-up necrosectomy"],
  },
  "abdominal-compartment-syndrome": {
    title: "Abdominal Compartment Syndrome: WSACS & APP | FFICM",
    description: "ACS for FRCA/FFICM: WSACS definitions, intravesical IAP measurement, APP target, primary vs secondary ACS, medical bundle, decompressive laparotomy.",
    aliases: ["Abdominal Compartment Syndrome", "ACS", "Intra-abdominal hypertension", "IAH", "WSACS", "Decompressive laparotomy"],
    keywords: ["abdominal compartment syndrome", "WSACS", "intra-abdominal pressure", "decompressive laparotomy"],
  },
  "toxicology": {
    title: "Toxicology & Poisoning in ICU: Antidotes & LAST | FFICM",
    description: "ICU toxicology for FRCA/FFICM: paracetamol, opioid, TCA, beta-blocker overdose, LAST and lipid emulsion, toxidromes, antidotes, decontamination.",
    aliases: ["ICU toxicology", "Poisoning", "Overdose", "Toxidrome", "LAST", "Local anaesthetic systemic toxicity", "Lipid rescue"],
    keywords: ["ICU toxicology", "LAST", "lipid emulsion", "paracetamol overdose", "TCA overdose"],
  },
  "transfusion-coagulation": {
    title: "Massive Transfusion & Coagulopathy: TEG/ROTEM | FFICM",
    description: "Transfusion and coagulation in ICU for FRCA/FFICM: massive haemorrhage protocols, blood components, TRALI/TACO, cell salvage, DIC, TEG and ROTEM.",
    aliases: ["Massive transfusion", "Massive haemorrhage protocol", "Coagulopathy", "TRALI", "TACO", "TEG", "ROTEM", "DIC", "Cell salvage"],
    keywords: ["massive transfusion", "TEG ROTEM", "TRALI TACO", "DIC", "cell salvage"],
  },
  "haematology-icu": {
    title: "TTP, HLH/MAS & Thrombotic Microangiopathy | FFICM",
    description: "Haematological emergencies in ICU for FFICM/EDIC: TTP, HLH/MAS, thrombotic microangiopathies, PLASMIC and HScore, plasma exchange, immunosuppression.",
    aliases: ["TTP", "Thrombotic thrombocytopenic purpura", "HLH", "MAS", "Haemophagocytic lymphohistiocytosis", "Thrombotic microangiopathy", "TMA", "PLASMIC", "HScore"],
    keywords: ["TTP", "HLH MAS", "thrombotic microangiopathy", "PLASMIC score", "HScore", "plasma exchange"],
  },
  "postop-high-risk-icu": {
    title: "Critical Care of the High-Risk Surgical Patient | FFICM",
    description: "High-risk surgical patient for FRCA Final/FFICM: P-POSSUM/SORT/CPET/CFS, level-2/3 admission, structured handover, GDT, MINS surveillance, NELA/CPOC standards.",
    aliases: ["High-risk surgical patient", "Perioperative critical care", "P-POSSUM", "SORT", "CPET", "MINS", "NELA", "CPOC"],
    keywords: ["high risk surgical patient", "P-POSSUM", "CPET", "MINS surveillance", "NELA"],
  },
  "paediatric-core": {
    title: "Paediatric Core Essentials: Physiology, Fluids, Dosing | FRCA",
    description: "Paediatric core essentials for FRCA: age-specific physiology, Holliday-Segar maintenance fluids, weight-based drug dosing, WETFLAG, and pain scoring (FLACC, FACES, NRS).",
    aliases: ["Paediatric physiology", "Paediatric fluids", "Paediatric drug dosing", "Paediatric pain scoring", "WETFLAG", "Holliday-Segar"],
    keywords: ["paediatric physiology", "paediatric maintenance fluids", "paediatric drug dosing", "FLACC score", "WETFLAG", "Holliday-Segar"],
  },
  "paediatric-icu": {
    title: "Paediatric Intensive Care: PICU Essentials | FFICM",
    description: "Paediatric intensive care for FFICM: age-specific physiology, paediatric sepsis, congenital heart disease, paediatric neurocritical care, sedation, resuscitation.",
    aliases: ["Paediatric ICU", "PICU", "Paediatric sepsis", "Paediatric resuscitation", "Paediatric critical care"],
    keywords: ["paediatric ICU", "PICU", "paediatric sepsis", "paediatric resuscitation"],
  },
  "burns-icu": {
    title: "Burns Intensive Care: Parkland, Inhalation Injury | FFICM",
    description: "Major burns critical care for FRCA/FFICM: pathophysiology, airway and inhalation injury, fluid resuscitation (Parkland/modified Brooke), escharotomy, AKI, sepsis.",
    aliases: ["Burns ICU", "Major burn", "Inhalation injury", "Parkland formula", "Modified Brooke", "Escharotomy"],
    keywords: ["burns ICU", "Parkland formula", "inhalation injury", "escharotomy"],
  },
  "organ-donation": {
    title: "Organ Donation: Brainstem Death, DBD & DCD | FFICM",
    description: "Organ donation for FFICM/EDIC: brainstem death testing, DBD vs DCD pathways, donor optimisation, family approach, legal and ethical framework.",
    aliases: ["Organ donation", "Brainstem death", "DBD", "DCD", "Donation after brain death", "Donation after circulatory death", "Donor optimisation"],
    keywords: ["organ donation", "brainstem death", "DBD DCD", "donor optimisation"],
  },
  "prognostication-ethics-icu": {
    title: "ICU Prognostication, Ethics & PICS | FFICM",
    description: "Prognostication and ethics in ICU for FRCA Final/FFICM: prognostic scoring, treatment escalation plans, withdrawal of treatment, PICS and long-term outcomes.",
    aliases: ["ICU prognostication", "Treatment escalation plan", "Withdrawal of treatment", "PICS", "Post-intensive care syndrome", "ICU ethics"],
    keywords: ["ICU prognostication", "treatment escalation plan", "PICS", "withdrawal of treatment"],
  },
  "end-of-life-communication": {
    title: "End-of-Life Care & Communication in ICU | FFICM",
    description: "End-of-life care for FFICM: breaking bad news, family meetings, withdrawal of life-sustaining treatment, symptom control, conflict resolution, cultural care.",
    aliases: ["End of life care", "Withdrawal of life-sustaining treatment", "WLST", "Breaking bad news", "Family meetings ICU", "Palliative care ICU"],
    keywords: ["end of life ICU", "WLST", "family meetings", "breaking bad news"],
  },
  "non-technical-skills": {
    title: "Non-Technical Skills & Human Factors (ANTS) | FRCA/FFICM",
    description: "Non-technical skills and human factors for FRCA/FFICM: ANTS framework, situation awareness, decision-making, teamwork, leadership, CRM, debriefing, just culture.",
    aliases: ["Non-technical skills", "Human factors", "ANTS", "Anaesthetists Non-Technical Skills", "Crisis resource management", "CRM", "Debriefing"],
    keywords: ["ANTS", "human factors", "crisis resource management", "non-technical skills FRCA"],
  },
  "gynaecological-anaesthesia": {
    title: "Gynaecological Anaesthesia: Laparoscopy, Robotics & Oncology | FRCA",
    description: "Gynaecological anaesthesia for FRCA Final: pneumoperitoneum and Trendelenburg physiology, robotic surgery airway considerations, hysteroscopy fluid absorption, CO₂ gas embolism, major oncology and ERAS.",
    aliases: ["Gynaecological anaesthesia", "Laparoscopic gynaecology", "Robotic gynaecology", "Hysteroscopy anaesthesia", "TURP-equivalent syndrome", "CO₂ gas embolism"],
    keywords: ["gynaecological anaesthesia FRCA", "pneumoperitoneum Trendelenburg", "hysteroscopy fluid absorption", "CO2 gas embolism", "robotic gynaecology"],
  },
  "plastic-surgery": {
    title: "Plastic Surgery Anaesthesia: Free Flaps & Microsurgery | FRCA",
    description: "Plastic and reconstructive anaesthesia for FRCA Final: free flap physiology, haemodilution, vasopressor choice, DIEP and head & neck reconstruction, digital replantation, prolonged surgery.",
    aliases: ["Plastic surgery anaesthesia", "Free flap anaesthesia", "Microsurgery anaesthesia", "DIEP flap", "Digital replantation", "Head and neck reconstruction"],
    keywords: ["free flap anaesthesia", "DIEP flap", "microsurgery FRCA", "plastic surgery anaesthesia", "digital replantation"],
  },
  "pain-medicine": {
    title: "Pain Medicine: Multimodal, Neuropathic & Cancer | FRCA",
    description: "FRCA Final & FFICM pain medicine: acute and chronic pain mechanisms, multimodal analgesia, neuropathic pain guidelines, CRPS, cancer pain, opioid rotation, SCS, and interventional techniques.",
    aliases: ["Pain medicine", "Multimodal analgesia", "Neuropathic pain", "Chronic pain", "Cancer pain", "CRPS", "Spinal cord stimulation", "Opioid rotation"],
    keywords: ["pain medicine FRCA", "multimodal analgesia", "neuropathic pain", "CRPS", "cancer pain", "opioid rotation", "spinal cord stimulation"],
  },
  "hepatobiliary-transplant": {
    title: "Hepatobiliary & Transplant Anaesthesia: Liver Resection & LT | FRCA",
    description: "Hepatobiliary and transplant anaesthesia for FRCA Final: low CVP technique, Pringle manoeuvre, liver transplant phases, post-reperfusion syndrome, cirrhotic patient physiology.",
    aliases: ["Hepatobiliary anaesthesia", "Liver transplant anaesthesia", "Liver resection anaesthesia", "Low CVP technique", "Post-reperfusion syndrome", "Cirrhotic patient"],
    keywords: ["liver transplant anaesthesia", "low CVP technique", "post reperfusion syndrome", "Pringle manoeuvre", "hepatobiliary FRCA"],
  },
  "tiva": {
    title: "TIVA & TCI: Marsh, Schnider, Eleveld Models | FRCA",
    description: "FRCA Primary & Final guide to TIVA and target-controlled infusion: PK compartment models, Marsh vs Schnider vs Eleveld, plasma vs effect-site targeting, CSHT, PRIS, and practical setup.",
    aliases: ["TIVA", "Total intravenous anaesthesia", "TCI", "Target-controlled infusion", "Propofol TCI", "Remifentanil TCI", "Marsh model", "Schnider model", "Eleveld model"],
    keywords: ["TIVA FRCA", "TCI models", "Marsh vs Schnider", "Eleveld propofol", "effect-site targeting", "CSHT", "PRIS", "propofol infusion syndrome"],
  },
  "burns-plastics": {
    title: "Burns & Plastic Surgery Anaesthesia — Parkland & Airway | FRCA",
    description: "Burns and plastic surgery anaesthesia for FRCA Final: burn assessment and Parkland fluid resuscitation, airway and inhalational injury, carbon monoxide and cyanide poisoning, suxamethonium contraindication.",
    aliases: ["Burns anaesthesia", "Burn injury", "Parkland formula", "Inhalation injury", "Carbon monoxide poisoning", "Suxamethonium contraindication"],
    keywords: ["burns anaesthesia FRCA", "Parkland formula", "inhalation injury", "carbon monoxide poisoning", "suxamethonium burns"],
  },
  "obstetric-anaesthesia": {
    title: "Obstetric Anaesthesia: Labour Epidural & LSCS | FRCA",
    description: "Obstetric anaesthesia for FRCA Final and FFICM: labour epidural and CSE, spinal for caesarean section, category-1 RSI, pregnancy physiology, PPH, pre-eclampsia, remifentanil PCA, and OAA/DAS guidelines.",
    aliases: ["Obstetric anaesthesia", "Labour epidural", "Spinal anaesthesia caesarean", "Category 1 caesarean", "Obstetric GA", "Pre-eclampsia anaesthesia", "PPH management", "Remifentanil PCA labour"],
    keywords: ["obstetric anaesthesia FRCA", "labour epidural", "spinal caesarean section", "category 1 caesarean", "obstetric RSI", "pre-eclampsia anaesthesia", "remifentanil PCA labour", "PPH management"],
  },
  "airway-management": {
    title: "Airway Management: RSI, DAS 2015 & Difficult Airway | FRCA",
    description: "Airway management for FRCA Final and FFICM: rapid sequence induction, DAS 2015 unanticipated difficult intubation algorithm, awake fibreoptic intubation, supraglottic airways, videolaryngoscopy, NAP4 lessons and front-of-neck access.",
    aliases: ["Airway management", "Rapid sequence induction", "RSI anaesthesia", "DAS algorithm", "Difficult airway", "Awake fibreoptic intubation", "Cricothyroidotomy", "Front-of-neck access", "CICO"],
    keywords: ["airway management FRCA", "rapid sequence induction", "DAS 2015 algorithm", "difficult airway", "awake fibreoptic intubation", "supraglottic airway", "videolaryngoscopy", "cricothyroidotomy", "CICO scalpel bougie tube", "NAP4"],
  },
  "clinical-incidents": {
    title: "Critical Incidents: Anaphylaxis, MH, LAST & Awareness | FRCA",
    description: "Perioperative critical incidents for FRCA/FFICM: anaphylaxis management, malignant hyperthermia, local anaesthetic systemic toxicity (LAST), accidental awareness under anaesthesia, and death on the table.",
    aliases: ["Critical incidents", "Perioperative anaphylaxis", "Malignant hyperthermia", "LAST", "Local anaesthetic systemic toxicity", "Accidental awareness", "NAP5", "NAP6", "NAP7"],
    keywords: ["perioperative anaphylaxis FRCA", "malignant hyperthermia", "LAST Intralipid", "accidental awareness", "NAP5", "NAP6", "NAP7"],
  },
  "preoperative-assessment": {
    title: "Preoperative Assessment: RCRI, CPET & NICE NG45 | FRCA",
    description: "Preoperative assessment for FRCA/FFICM: ASA, RCRI, SORT, CPET thresholds, NICE NG45 investigations, medication management and PBM.",
    aliases: ["Preoperative assessment", "Perioperative risk stratification", "RCRI", "SORT", "CPET", "NICE NG45", "Patient blood management", "Pre-op anaemia"],
    keywords: ["preoperative assessment FRCA", "RCRI", "CPET anaerobic threshold", "NICE NG45", "patient blood management", "pre-op anaemia"],
  },
  "day-surgery": {
    title: "Day Surgery Anaesthesia: BADS, Selection & Discharge | FRCA",
    description: "Day surgery anaesthesia for FRCA Final: BADS criteria, patient selection, short-acting agents, multimodal analgesia, PONV prophylaxis and safe discharge criteria.",
    aliases: ["Day surgery", "Day case anaesthesia", "BADS", "Patient selection day surgery", "Discharge criteria", "PADSS", "Ambulatory anaesthesia"],
    keywords: ["day surgery anaesthesia FRCA", "BADS criteria", "day case selection", "discharge criteria", "PONV prophylaxis", "multimodal analgesia"],
  },
  "enhanced-recovery": {
    title: "Enhanced Recovery (ERAS): Pathways, Trials & PONV | FRCA",
    description: "Enhanced Recovery After Surgery for FRCA Final: ERAS principles, surgical stress response, prehabilitation, PONV prophylaxis, landmark trials and specialty protocols.",
    aliases: ["Enhanced recovery", "ERAS", "Fast track surgery", "Perioperative care pathway", "Prehabilitation", "PONV prophylaxis"],
    keywords: ["ERAS FRCA", "enhanced recovery surgery", "ERAS principles", "prehabilitation", "PONV prophylaxis", "LAFA trial", "RELIEF trial"],
  },
  "perioperative-fluids": {
    title: "Perioperative Fluid Therapy: GDFT, Glycocalyx & Trials | FRCA",
    description: "Perioperative fluid therapy for FRCA/FFICM: crystalloids vs colloids, goal-directed fluid therapy, revised Starling equation, glycocalyx, and landmark trials (SMART, RELIEF, BaSICS).",
    aliases: ["Perioperative fluid therapy", "GDFT", "Goal-directed fluid therapy", "Crystalloids vs colloids", "Fluid responsiveness", "Glycocalyx", "Revised Starling equation"],
    keywords: ["perioperative fluid therapy FRCA", "GDFT", "goal-directed fluid therapy", "crystalloids vs colloids", "SMART trial", "RELIEF trial", "glycocalyx", "fluid responsiveness"],
  },
  "vascular-access-devices": {
    title: "Vascular Access Devices: CVC, PICC, Vascath & RIC | FRCA",
    description: "Vascular access devices for FRCA Primary/Final/FFICM: peripheral cannulae, midlines, PICCs, CVCs, vascaths, trauma lines (RIC/MAC), Swan-Ganz introducers, and long-term tunnelled devices.",
    aliases: ["Vascular access devices", "Central venous catheter", "CVC", "PICC", "Peripheral cannula", "Midline catheter", "Vascath", "Trauma line", "RIC", "MAC", "Swan-Ganz sheath", "Portacath", "Hickman line"],
    keywords: ["vascular access devices FRCA", "CVC anaesthesia", "PICC line", "peripheral cannula", "midline catheter", "vascath", "trauma line RIC MAC", "Swan-Ganz sheath", "Portacath", "Hickman line"],
  },
  "cardiovascular-disease": {
    title: "Cardiovascular Disease: IHD, Valvular, HF & PH | FRCA",
    description: "Perioperative cardiovascular disease for FRCA Final: IHD, valvular lesions, heart failure, arrhythmias, devices, pulmonary hypertension and ACHD.",
    aliases: ["Cardiovascular disease", "Ischaemic heart disease", "Valvular heart disease", "Aortic stenosis", "Heart failure", "Pulmonary hypertension", "Adult congenital heart disease", "ACHD"],
    keywords: ["cardiovascular disease FRCA", "perioperative cardiac risk", "aortic stenosis anaesthesia", "pulmonary hypertension", "heart failure surgery"],
  },
  "respiratory-disease": {
    title: "Respiratory Disease: Asthma, COPD, OSA & Fibrosis | FRCA",
    description: "Perioperative respiratory disease for FRCA Final: asthma, COPD, OSA, restrictive lung disease, pulmonary fibrosis and respiratory infections.",
    aliases: ["Respiratory disease", "Asthma anaesthesia", "COPD surgery", "Obstructive sleep apnoea", "OSA", "Pulmonary fibrosis", "Restrictive lung disease"],
    keywords: ["respiratory disease FRCA", "asthma anaesthesia", "COPD perioperative", "OSA surgery", "pulmonary fibrosis"],
  },
  "endocrine-disease": {
    title: "Endocrine Disease: DM, Thyroid, Phaeo & Steroids | FRCA",
    description: "Perioperative endocrine disease for FRCA Final: diabetes mellitus, thyroid disorders, adrenal insufficiency, phaeochromocytoma and carcinoid syndrome.",
    aliases: ["Endocrine disease", "Diabetes mellitus surgery", "Thyroid storm", "Phaeochromocytoma anaesthesia", "Adrenal insufficiency", "Carcinoid syndrome", "Steroid supplementation"],
    keywords: ["endocrine disease FRCA", "diabetes perioperative", "phaeochromocytoma anaesthesia", "thyroid storm", "steroid cover surgery", "carcinoid syndrome"],
  },
  "renal-disease": {
    title: "Renal Disease: CKD, Dialysis & AKI Risk | FRCA",
    description: "Perioperative renal co-existing disease for FRCA Final and FFICM: CKD staging, dialysis timing, altered drug handling, electrolyte emergencies, transplant recipients and AKI prevention.",
    aliases: ["Renal disease", "Chronic kidney disease anaesthesia", "Dialysis patient surgery", "Anaesthesia in renal failure", "Renal transplant recipient"],
    keywords: ["renal disease FRCA", "CKD anaesthesia", "dialysis perioperative", "hyperkalaemia anaesthesia", "perioperative AKI prevention", "renal transplant anaesthesia"],
  },
  "musculoskeletal-disease": {
    title: "Rheumatoid, Ankylosing Spondylitis & MSK Disease | FRCA",
    description: "Musculoskeletal and rheumatological disease for FRCA Final: rheumatoid airway and cervical spine risk, ankylosing spondylitis, connective tissue disease, DMARDs and biologics.",
    aliases: ["Rheumatological disease", "Rheumatoid arthritis anaesthesia", "Ankylosing spondylitis anaesthesia", "Connective tissue disease", "Cervical spine instability"],
    keywords: ["rheumatoid arthritis anaesthesia", "ankylosing spondylitis intubation", "atlantoaxial subluxation", "DMARD perioperative", "biologics before surgery"],
  },
  "gastrointestinal-disease": {
    title: "GI Disease: Reflux, IBD & Malnutrition | FRCA",
    description: "Gastrointestinal co-existing disease for FRCA Final: reflux and aspiration risk, inflammatory bowel disease, malnutrition and refeeding syndrome, intestinal failure and bowel obstruction.",
    aliases: ["Gastrointestinal disease", "GORD anaesthesia", "Inflammatory bowel disease surgery", "Malnutrition perioperative", "Refeeding syndrome", "Intestinal failure"],
    keywords: ["GORD aspiration risk", "IBD anaesthesia", "refeeding syndrome", "malnutrition surgery", "bowel obstruction anaesthesia", "short bowel syndrome"],
  },
  "psychiatric-substance-disease": {
    title: "Psychiatric Disease & Substance Misuse | FRCA",
    description: "Psychiatric disease and substance misuse for FRCA Final: antidepressants, antipsychotics, lithium, ECT, serotonin syndrome, alcohol and opioid dependence, capacity and withdrawal.",
    aliases: ["Psychiatric disease anaesthesia", "Substance misuse anaesthesia", "Serotonin syndrome", "Lithium perioperative", "ECT anaesthesia", "Opioid dependence surgery"],
    keywords: ["psychiatric drugs anaesthesia", "serotonin syndrome", "lithium surgery", "ECT anaesthesia", "alcohol withdrawal perioperative", "buprenorphine perioperative"],
  },
  "immunosuppression-hiv": {
    title: "Immunosuppression, Transplant & HIV | FRCA",
    description: "Immunosuppression and HIV for FRCA Final and FFICM: transplant immunosuppressants, biologics, steroid cover, antiretroviral interactions, asplenia and infection precautions.",
    aliases: ["Immunosuppression anaesthesia", "HIV anaesthesia", "Transplant recipient surgery", "Biologic therapy perioperative", "Asplenia"],
    keywords: ["immunosuppression anaesthesia", "HIV antiretroviral interactions", "tacrolimus perioperative", "steroid cover surgery", "asplenia prophylaxis"],
  },
  "hepatic-disease": {
    title: "Hepatic Disease: Cirrhosis, MELD & HRS | FRCA",
    description: "Perioperative hepatic disease for FRCA Final: Child-Pugh and MELD risk, cirrhosis physiology, rebalanced coagulation, drug choices and hepatorenal syndrome.",
    aliases: ["Hepatic disease", "Cirrhosis anaesthesia", "Child-Pugh score", "MELD score", "Hepatorenal syndrome", "Hepatopulmonary syndrome", "Portopulmonary hypertension"],
    keywords: ["hepatic disease FRCA", "cirrhosis anaesthesia", "MELD perioperative", "hepatorenal syndrome", "rebalanced haemostasis", "VOCAL-Penn"],
  },
  "neurological-disease": {
    title: "Neurological Disease: MG, Epilepsy, MS, PD & MND | FRCA",
    description: "Perioperative neurological disease for FRCA Final: myasthenia gravis, epilepsy, multiple sclerosis, Parkinson's, motor neuron disease, muscular dystrophies and spinal cord injury.",
    aliases: ["Neurological disease", "Myasthenia gravis anaesthesia", "Epilepsy surgery", "Multiple sclerosis anaesthesia", "Parkinson's disease surgery", "Motor neuron disease", "Muscular dystrophy anaesthesia", "Spinal cord injury anaesthesia"],
    keywords: ["neurological disease FRCA", "myasthenia gravis anaesthesia", "epilepsy perioperative", "Parkinson's anaesthesia", "spinal cord injury anaesthesia"],
  },
  "genetic-syndromes": {
    title: "Genetic Syndromes & Anaesthesia: MH, DMD, Down, Marfan | FRCA",
    description: "Perioperative genetic syndromes for FRCA Final: malignant hyperthermia, muscular dystrophies, Down syndrome, Marfan, achondroplasia, sickle cell, porphyria and BChE deficiency.",
    aliases: ["Genetic syndromes", "Malignant hyperthermia", "Duchenne muscular dystrophy", "Down syndrome anaesthesia", "Marfan syndrome anaesthesia", "Achondroplasia anaesthesia", "Sickle cell anaesthesia", "Porphyria anaesthesia", "Pseudocholinesterase deficiency"],
    keywords: ["genetic syndromes FRCA", "malignant hyperthermia anaesthesia", "DMD anaesthesia", "Down syndrome anaesthesia", "Marfan syndrome anaesthesia", "sickle cell surgery", "acute intermittent porphyria"],
  },
  "muscle-relaxants": {
    title: "Neuromuscular Blocking Drugs (NMJ Blockers) | FRCA Notes",
    description: "Depolarising and non-depolarising muscle relaxants for FRCA: suxamethonium, rocuronium, vecuronium, atracurium, cisatracurium — mechanism, dosing, monitoring and reversal.",
    aliases: [
      "Neuromuscular blocking drugs",
      "Neuromuscular blocker drugs",
      "NMJ blockers",
      "NMBA",
      "Muscle relaxants",
      "Depolarising muscle relaxant",
      "Non-depolarising muscle relaxants",
      "Suxamethonium",
      "Rocuronium",
      "Vecuronium",
      "Atracurium",
      "Cisatracurium",
    ],
    keywords: [
      "neuromuscular blocking drugs",
      "nmj blockers",
      "depolarising muscle relaxant",
      "non-depolarising muscle relaxants",
      "neuromuscular blocker drugs",
      "muscle relaxants FRCA",
      "suxamethonium",
      "rocuronium",
      "sugammadex reversal",
    ],
  },
};




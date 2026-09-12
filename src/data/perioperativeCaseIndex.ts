export type CaseDifficulty = "Foundation" | "Intermediate" | "Advanced";

export interface PerioperativeCaseIndexEntry {
  id: string;
  title: string;
  category: "Steroid cover" | "Phaeochromocytoma" | "Antifibrinolytics" | "Co-existing disease" | "Paediatric anaesthesia";
  difficulty: CaseDifficulty;
  summary: string;
  topicIds: string[];
}

const steroidTopics = [
  "corticosteroids",
  "endocrine-physiology",
  "endocrine-disease",
  "icu-endocrine-emergencies",
];

const phaeochromocytomaTopics = [
  "endocrine-physiology",
  "endocrine-disease",
  "icu-endocrine-emergencies",
];

const antifibrinolyticTopics = [
  "haematology-immunity",
  "transfusion-coagulation",
  "haematological-disease",
];

export const perioperativeCaseIndex: PerioperativeCaseIndexEntry[] = [
  { id: "steroid-colectomy", title: "Chronic prednisolone before colectomy", category: "Steroid cover", difficulty: "Foundation", summary: "Major surgery, HPA-axis suppression and postoperative adrenal crisis.", topicIds: [...steroidTopics, "emergency-surgery"] },
  { id: "steroid-inhaled", title: "The overlooked inhaled steroid", category: "Steroid cover", difficulty: "Intermediate", summary: "Hidden cumulative steroid exposure before laparoscopic surgery.", topicIds: [...steroidTopics, "respiratory-disease"] },
  { id: "steroid-addisons", title: "Primary adrenal insufficiency and emergency laparotomy", category: "Steroid cover", difficulty: "Advanced", summary: "Recognition and immediate treatment of adrenal crisis before emergency surgery.", topicIds: [...steroidTopics, "emergency-surgery"] },
  { id: "steroid-joint", title: "Recent joint injections before arthroplasty", category: "Steroid cover", difficulty: "Intermediate", summary: "Persistent HPA suppression after oral and intra-articular steroids.", topicIds: [...steroidTopics, "orthopaedic-anaesthesia", "preoperative-assessment"] },
  { id: "phaeo-prep", title: "Preparing an adrenal phaeochromocytoma", category: "Phaeochromocytoma", difficulty: "Foundation", summary: "Alpha-before-beta blockade, volume restoration and operative planning.", topicIds: [...phaeochromocytomaTopics, "preoperative-assessment", "pharmacodynamics"] },
  { id: "phaeo-beta", title: "Beta blocker before diagnosis", category: "Phaeochromocytoma", difficulty: "Advanced", summary: "Unopposed alpha stimulation and catecholamine crisis.", topicIds: [...phaeochromocytomaTopics, "pharmacodynamics", "circulatory-failure"] },
  { id: "phaeo-handling", title: "Hypertension during tumour handling", category: "Phaeochromocytoma", difficulty: "Advanced", summary: "Rapid control of an intraoperative catecholamine surge.", topicIds: [...phaeochromocytomaTopics, "circulatory-failure"] },
  { id: "phaeo-recovery", title: "Post-adrenalectomy collapse", category: "Phaeochromocytoma", difficulty: "Intermediate", summary: "Post-resection hypotension, hypoglycaemia and high-acuity monitoring.", topicIds: [...phaeochromocytomaTopics, "circulatory-failure"] },
  { id: "txa-trauma", title: "Trauma inside the three-hour window", category: "Antifibrinolytics", difficulty: "Foundation", summary: "Time-critical tranexamic acid during traumatic haemorrhage.", topicIds: [...antifibrinolyticTopics, "trauma-emergency", "mass-casualty-military"] },
  { id: "txa-pph", title: "Postpartum haemorrhage after caesarean birth", category: "Antifibrinolytics", difficulty: "Intermediate", summary: "Early tranexamic acid alongside definitive postpartum haemorrhage control.", topicIds: [...antifibrinolyticTopics, "obstetric-anaesthesia"] },
  { id: "txa-elective", title: "Tranexamic acid in high-risk non-cardiac surgery", category: "Antifibrinolytics", difficulty: "Advanced", summary: "Balancing bleeding benefit, vascular risk and medication safety.", topicIds: [...antifibrinolyticTopics, "preoperative-assessment", "pharmacokinetics"] },
  { id: "txa-dic", title: "Septic DIC with line-site bleeding", category: "Antifibrinolytics", difficulty: "Advanced", summary: "Distinguishing component replacement from exceptional antifibrinolytic use.", topicIds: [...antifibrinolyticTopics, "sepsis"] },
  { id: "steroid-dental", title: "Minor procedure on replacement hydrocortisone", category: "Steroid cover", difficulty: "Foundation", summary: "Proportionate steroid cover for minor procedural stress.", topicIds: [...steroidTopics, "day-surgery", "ent-anaesthesia"] },
  { id: "steroid-pituitary", title: "Pituitary insufficiency before major surgery", category: "Steroid cover", difficulty: "Intermediate", summary: "Secondary adrenal insufficiency, hypoglycaemia and hormone sequencing.", topicIds: [...steroidTopics, "preoperative-assessment"] },
  { id: "phaeo-pregnancy", title: "Catecholamine symptoms in pregnancy", category: "Phaeochromocytoma", difficulty: "Advanced", summary: "Diagnosis, blockade and coordinated maternal–fetal planning.", topicIds: [...phaeochromocytomaTopics, "obstetric-anaesthesia"] },
  { id: "phaeo-incidental", title: "Adrenal incidentaloma before elective surgery", category: "Phaeochromocytoma", difficulty: "Intermediate", summary: "Managing occult catecholamine risk before unrelated surgery.", topicIds: [...phaeochromocytomaTopics, "preoperative-assessment"] },
  { id: "txa-renal", title: "Tranexamic acid in advanced kidney disease", category: "Antifibrinolytics", difficulty: "Advanced", summary: "Renal dose adjustment, accumulation and seizure risk.", topicIds: [...antifibrinolyticTopics, "renal-physiology", "aki-rrt", "pharmacokinetics", "orthopaedic-anaesthesia"] },
  { id: "txa-cardiac", title: "High-dose TXA during cardiac surgery", category: "Antifibrinolytics", difficulty: "Advanced", summary: "Cumulative dosing, renal function and neurological toxicity on bypass.", topicIds: [...antifibrinolyticTopics, "cardiothoracic", "pharmacokinetics"] },
  { id: "paed-fontan-appendicectomy", title: "Fontan circulation for laparoscopic appendicectomy", category: "Paediatric anaesthesia", difficulty: "Advanced", summary: "Passive pulmonary flow, preload and pneumoperitoneum in a single-ventricle child.", topicIds: ["paediatric-anaesthesia", "paediatric-icu", "cardiac-cycle", "cardiovascular-disease", "emergency-surgery"] },
  { id: "paed-neonatal-resuscitation", title: "Neonatal resuscitation at emergency caesarean birth", category: "Paediatric anaesthesia", difficulty: "Foundation", summary: "Inflation breaths, 3:1 compressions, adrenaline dosing and thermal care at birth.", topicIds: ["paediatric-anaesthesia", "paediatric-icu", "obstetric-anaesthesia", "trauma-emergency"] },
  { id: "paed-ex-premature-hernia", title: "Ex-premature infant for inguinal hernia repair", category: "Paediatric anaesthesia", difficulty: "Intermediate", summary: "Post-conceptual age, apnoea risk, awake regional anaesthesia and caffeine.", topicIds: ["paediatric-anaesthesia", "day-surgery", "preoperative-assessment"] },
  { id: "paed-pyloric-stenosis", title: "Pyloric stenosis with metabolic alkalosis", category: "Paediatric anaesthesia", difficulty: "Intermediate", summary: "Hypochloraemic hypokalaemic alkalosis, resuscitation targets and full-stomach induction.", topicIds: ["paediatric-anaesthesia", "acid-base", "perioperative-fluids", "emergency-surgery"] },
  { id: "paed-tet-spell", title: "Hypercyanotic spell in unrepaired tetralogy of Fallot", category: "Paediatric anaesthesia", difficulty: "Advanced", summary: "Right-to-left shunt physiology, vasoconstrictors and beta blockade in a tet spell.", topicIds: ["paediatric-anaesthesia", "paediatric-icu", "cardiac-cycle", "cardiovascular-disease"] },
  { id: "paed-inhaled-foreign-body", title: "Inhaled foreign body in a toddler", category: "Paediatric anaesthesia", difficulty: "Advanced", summary: "Shared airway, spontaneous ventilation and gas trapping during rigid bronchoscopy.", topicIds: ["paediatric-anaesthesia", "airway-management", "ent-anaesthesia"] },
];

export const casesForTopic = (topicId: string) =>
  perioperativeCaseIndex.filter((caseItem) => caseItem.topicIds.includes(topicId));
import type { QuizQuestion } from "@/components/quiz/QuizSection";

export interface SurgicalProtocol {
  id: string;
  title: string;
  link: string;
  scope: string;
  preop: string[];
  intraop: string[];
  postop: string[];
  quiz: QuizQuestion[];
}

export const surgicalProtocols: SurgicalProtocol[] = [
  {
    id: "protocol-general-colorectal",
    title: "General & Colorectal",
    link: "/clinical/general-colorectal-surgery",
    scope: "Laparoscopic and open bowel resection, cholecystectomy, upper GI surgery.",
    preop: [
      "ERAS pathway: education, prehabilitation, anaemia correction (IV iron if iron-deficient)",
      "Risk stratification (e.g. NSQIP/P-POSSUM); CPET for major or high-risk resection",
      "Carbohydrate drink up to 2 h pre-op where pathway allows; avoid routine bowel preparation unless surgeon requires",
      "Plan analgesia by incision: laparoscopic vs open",
    ],
    intraop: [
      "Pneumoperitoneum 12–15 mmHg: ↓FRC, ↑PaCO₂, ↑SVR; steep Trendelenburg worsens ventilation",
      "Lung-protective ventilation, normothermia, PONV prophylaxis with ≥2 agents in high-risk patients",
      "Euvolaemia (avoid both liberal and overly restrictive fluids — RELIEF); goal-directed therapy in high-risk",
      "Analgesia: intrathecal morphine or abdominal wall blocks for laparoscopic; epidural or rectus sheath catheters for open",
    ],
    postop: [
      "No routine NG decompression; early oral intake within 24 h",
      "Early mobilisation, stop IV fluids once drinking",
      "VTE prophylaxis — consider 28 days after major abdominal cancer surgery (NICE NG89)",
      "Watch for anastomotic leak: unexplained tachycardia, new AF, rising CRP",
    ],
    quiz: [
      { question: "What did the RELIEF trial find with a restrictive fluid regimen in major abdominal surgery?", options: ["Improved disability-free survival", "More acute kidney injury with no survival benefit", "Fewer surgical-site infections", "Shorter hospital stay"], correctIndex: 1, explanation: "RELIEF showed no difference in disability-free survival but more AKI (and SSI) with the restrictive regimen — aim for euvolaemia." },
      { question: "After elective colorectal resection, routine nasogastric decompression:", options: ["Reduces anastomotic leak", "Should be continued until flatus", "Is not recommended", "Reduces pneumonia"], correctIndex: 2, explanation: "Routine NG decompression delays return of bowel function without reducing leak or pneumonia; ERAS recommends removal before emergence." },
      { question: "Which physiological change is typical of pneumoperitoneum at 15 mmHg?", options: ["Increased FRC", "Decreased SVR", "Increased PaCO₂", "Increased venous return in reverse Trendelenburg"], correctIndex: 2, explanation: "CO₂ absorption raises PaCO₂; FRC falls and SVR rises. Head-up reduces venous return." },
    ],
  },
  {
    id: "protocol-orthopaedic",
    title: "Orthopaedic (Hip & Knee)",
    link: "/clinical/orthopaedic-anaesthesia",
    scope: "Elective arthroplasty and hip fracture surgery.",
    preop: [
      "Hip fracture: surgery on day of or day after admission; avoid delay for non-essential investigations",
      "Fascia iliaca or femoral nerve block on admission for hip fracture",
      "Review anticoagulants and timing for neuraxial anaesthesia; frailty and delirium screening",
      "Correct anaemia; group and save",
    ],
    intraop: [
      "Spinal or general anaesthesia — no mortality difference in hip fracture (REGAIN, RAGA)",
      "Cemented hemiarthroplasty: anticipate bone cement implantation syndrome; communicate before cement insertion, maintain BP",
      "Tranexamic acid to reduce blood loss in arthroplasty unless contraindicated",
      "Tourniquet (knee): document time; watch for release hypotension and acidosis",
    ],
    postop: [
      "Multimodal analgesia; adductor canal / iPACK or local infiltration for knee",
      "Early mobilisation (day 0–1), delirium prevention",
      "VTE prophylaxis per NICE NG89",
      "Orthogeriatric review for hip fracture",
    ],
    quiz: [
      { question: "In hip fracture surgery, REGAIN compared spinal with general anaesthesia and found:", options: ["Lower 60-day mortality with spinal", "No difference in walking/death at 60 days", "Less delirium with general", "More delirium with spinal"], correctIndex: 1, explanation: "REGAIN found no difference in death or inability to walk at 60 days and no difference in delirium." },
      { question: "Bone cement implantation syndrome most typically presents with:", options: ["Hypertension and bradycardia", "Hypoxia, hypotension and possible cardiac arrest", "Bronchospasm only", "Delayed rash at 24 h"], correctIndex: 1, explanation: "BCIS causes hypoxia, hypotension, arrhythmia and potentially arrest around cementing, reaming or prosthesis insertion." },
      { question: "First-line regional analgesia on admission for a fractured neck of femur is:", options: ["Interscalene block", "Fascia iliaca block", "Ankle block", "Paravertebral block"], correctIndex: 1, explanation: "Fascia iliaca (or femoral) block is recommended on admission for hip fracture analgesia." },
    ],
  },
  {
    id: "protocol-cardiac",
    title: "Cardiac",
    link: "/clinical/cardiothoracic",
    scope: "CABG and valve surgery on cardiopulmonary bypass.",
    preop: [
      "Risk score (EuroSCORE II); echo, coronary anatomy, lung and renal function",
      "Antiplatelet/anticoagulant plan agreed with surgeon; continue aspirin usually",
      "Crossmatch; check for heparin-induced thrombocytopenia history",
    ],
    intraop: [
      "Arterial line before induction; central line, TOE",
      "Haemodynamically stable induction; maintain coronary perfusion pressure",
      "Heparin for bypass (target ACT typically >400–480 s), reversal with protamine; watch for protamine reaction",
      "Antifibrinolytic (tranexamic acid); viscoelastic-guided transfusion",
    ],
    postop: [
      "Cardiac ICU: early extubation when stable",
      "Monitor bleeding, tamponade, AF (common days 2–3), AKI",
      "Pacing wires and electrolytes (K⁺, Mg²⁺)",
    ],
    quiz: [
      { question: "Which complication is most common in the first days after cardiac surgery?", options: ["Atrial fibrillation", "Stroke", "Mediastinitis", "Complete heart block"], correctIndex: 0, explanation: "Postoperative AF affects roughly 20–40% of patients, peaking around days 2–3." },
      { question: "Rising CVP, hypotension and falling drain output after cardiac surgery suggests:", options: ["Hypovolaemia", "Cardiac tamponade", "Vasoplegia", "Pneumothorax only"], correctIndex: 1, explanation: "Tamponade can occur with a clotted drain; needs urgent echo and re-sternotomy." },
      { question: "Heparin anticoagulation for bypass is monitored with:", options: ["APTT", "Activated clotting time", "INR", "Anti-Xa only"], correctIndex: 1, explanation: "ACT is the point-of-care test used to confirm adequate heparinisation before and during bypass." },
    ],
  },
  {
    id: "protocol-thoracic",
    title: "Thoracic",
    link: "/clinical/cardiothoracic",
    scope: "Lobectomy, pneumonectomy, VATS.",
    preop: [
      "Lung function: FEV₁ and DLCO (ppo values); CPET if ppo values are low",
      "Smoking cessation, prehabilitation",
      "Plan lung isolation (double-lumen tube or bronchial blocker)",
    ],
    intraop: [
      "Lateral decubitus with one-lung ventilation; confirm position with fibreoptic bronchoscope",
      "Protective OLV: tidal volume ~5 mL/kg PBW, PEEP, permissive hypercapnia",
      "Hypoxaemia: check tube, FiO₂ 1.0, recruit/PEEP to ventilated lung, CPAP to operative lung",
      "Restrict fluids (pneumonectomy oedema risk)",
    ],
    postop: [
      "Paravertebral or erector spinae catheter, or thoracic epidural",
      "Physiotherapy, early mobilisation; chest drain management",
      "Watch for air leak, AF, post-pneumonectomy pulmonary oedema",
    ],
    quiz: [
      { question: "During one-lung ventilation, the first step for sudden hypoxaemia is:", options: ["Clamp the pulmonary artery", "Check tube position and increase FiO₂", "Give salbutamol", "Increase tidal volume to 10 mL/kg"], correctIndex: 1, explanation: "Exclude tube malposition/obstruction with bronchoscopy and increase FiO₂ before other measures." },
      { question: "A ppo-FEV₁ below which value traditionally triggers further testing such as CPET?", options: ["80%", "60%", "30%", "10%"], correctIndex: 2, explanation: "ppoFEV₁ or ppoDLCO below ~30% (some guidance 40%) indicates high risk and further assessment." },
      { question: "Post-pneumonectomy pulmonary oedema is associated with:", options: ["Liberal perioperative fluids", "Epidural analgesia", "Lateral position", "Early mobilisation"], correctIndex: 0, explanation: "Excess fluid is a key risk factor; restrictive fluids are recommended for pneumonectomy." },
    ],
  },
  {
    id: "protocol-neuro",
    title: "Neurosurgery",
    link: "/clinical/neuroanaesthesia",
    scope: "Supratentorial craniotomy, posterior fossa surgery.",
    preop: [
      "Neurological baseline (GCS, deficits), signs of raised ICP",
      "Steroids for tumour oedema; antiepileptics as indicated",
      "Plan for awake craniotomy if eloquent cortex",
    ],
    intraop: [
      "Smooth induction avoiding ICP/BP surges; head up 15–30°, neutral neck",
      "Maintain CPP; normocapnia (short hyperventilation only for brain herniation)",
      "TIVA or <1 MAC volatile; avoid hyperglycaemia and hypotonic fluids",
      "Sitting position (posterior fossa): venous air embolism risk — monitoring and plan",
    ],
    postop: [
      "Smooth emergence; early neurological assessment",
      "Frequent neuro-obs; urgent CT for deterioration",
      "Watch for seizures, sodium disturbance (SIADH, DI, cerebral salt wasting)",
    ],
    quiz: [
      { question: "Which IV fluid should be avoided in neurosurgery?", options: ["0.9% saline", "Plasma-Lyte", "5% dextrose", "Hartmann's in moderation"], correctIndex: 2, explanation: "Hypotonic/glucose fluids worsen cerebral oedema and hyperglycaemia." },
      { question: "Prophylactic hyperventilation during craniotomy:", options: ["Is routinely recommended", "Should be avoided except briefly for herniation", "Improves outcome in TBI", "Increases ICP"], correctIndex: 1, explanation: "Hypocapnia causes cerebral vasoconstriction and ischaemia; reserve for brief rescue." },
      { question: "The sitting position for posterior fossa surgery particularly increases the risk of:", options: ["Venous air embolism", "Malignant hyperthermia", "TURP syndrome", "Fat embolism"], correctIndex: 0, explanation: "Open venous sinuses above the heart allow air entrainment." },
    ],
  },
  {
    id: "protocol-vascular",
    title: "Vascular",
    link: "/clinical/vascular-anaesthesia",
    scope: "Open/endovascular AAA repair, carotid endarterectomy.",
    preop: [
      "High cardiac risk: functional capacity, CPET for open AAA",
      "Continue statin and antiplatelet; beta-blockers not started de novo just before surgery",
      "Crossmatch and cell salvage for open repair",
    ],
    intraop: [
      "Open AAA: cross-clamp ↑afterload (vasodilators), unclamp hypotension (volume, vasopressors)",
      "EVAR: often regional/local; prepare to convert",
      "Carotid: GA or regional; tight BP control; monitor neurology (awake) or cerebral oximetry",
    ],
    postop: [
      "Critical care after open AAA; watch AKI, bleeding, gut ischaemia, abdominal compartment syndrome",
      "Carotid: neck haematoma (airway), hyperperfusion syndrome, BP control",
    ],
    quiz: [
      { question: "Release of an aortic cross-clamp typically causes:", options: ["Hypertension", "Hypotension from vasodilation and washout of metabolites", "Bradycardia only", "Hyperkalaemia only without haemodynamic change"], correctIndex: 1, explanation: "Declamping hypotension follows reactive hyperaemia, acidaemia and reduced afterload; anticipate with fluid and gradual release." },
      { question: "A rapidly expanding neck swelling after carotid endarterectomy needs:", options: ["Observation", "Immediate wound opening/airway management", "Diuretic", "Ultrasound next day"], correctIndex: 1, explanation: "Haematoma threatens the airway — open the wound and secure the airway urgently." },
      { question: "Starting a beta-blocker the day before non-cardiac vascular surgery:", options: ["Is recommended", "Is not recommended (POISE: more stroke and death)", "Prevents AKI", "Is mandatory"], correctIndex: 1, explanation: "POISE showed fewer MIs but more stroke and death with acute high-dose metoprolol." },
    ],
  },
  {
    id: "protocol-obstetric",
    title: "Obstetric (Caesarean Section)",
    link: "/clinical/obstetric-anaesthesia",
    scope: "Elective and emergency caesarean section.",
    preop: [
      "Antacid prophylaxis (H₂ antagonist ± sodium citrate)",
      "Classify urgency (category 1–4); group and save, platelets/coagulation as indicated",
      "Neuraxial preferred; check anticoagulant timing",
    ],
    intraop: [
      "Left uterine displacement to avoid aortocaval compression",
      "Spinal: phenylephrine infusion to maintain BP near baseline",
      "GA: RSI, difficult/failed obstetric airway plan (OAA/DAS)",
      "Oxytocin by slow bolus/infusion; tranexamic acid for PPH",
    ],
    postop: [
      "Intrathecal diamorphine/morphine + regular paracetamol and NSAIDs",
      "Monitoring for respiratory depression per neuraxial opioid guidance",
      "VTE risk assessment; follow-up for post-dural puncture headache",
    ],
    quiz: [
      { question: "Hypotension after spinal for caesarean is best prevented with:", options: ["Large crystalloid preload alone", "Prophylactic phenylephrine infusion", "Head-down tilt", "Ephedrine only"], correctIndex: 1, explanation: "Prophylactic phenylephrine infusion (with co-load) is recommended by international consensus." },
      { question: "Category 1 caesarean section means:", options: ["Elective", "Immediate threat to life of woman or fetus", "Maternal compromise not immediately life-threatening", "Early delivery at planned time"], correctIndex: 1, explanation: "Category 1: immediate threat; aim decision-to-delivery within 30 minutes." },
      { question: "Why is left uterine displacement used?", options: ["To improve the surgical view", "To reduce aortocaval compression", "To speed spinal spread", "To prevent aspiration"], correctIndex: 1, explanation: "The gravid uterus compresses the IVC and aorta in the supine position." },
    ],
  },
  {
    id: "protocol-ent",
    title: "ENT & Head and Neck",
    link: "/clinical/ent-anaesthesia",
    scope: "Tonsillectomy, laser airway surgery, major head and neck resection.",
    preop: [
      "Airway assessment including nasendoscopy / imaging findings",
      "Plan for shared airway; consider awake tracheal intubation or tracheostomy",
      "OSA screening (especially paediatric tonsillectomy)",
    ],
    intraop: [
      "Secure airway (RAE / reinforced tube; laser-safe tube and low FiO₂ for laser)",
      "Throat pack with documented removal",
      "Remifentanil/controlled hypotension for a dry field where appropriate",
      "Free flap: maintain perfusion, normothermia",
    ],
    postop: [
      "Extubation plan (DAS); smooth emergence",
      "Post-tonsillectomy bleed: hypovolaemia, full stomach, blood in airway",
      "Tracheostomy care; airway emergency algorithm at bedside",
    ],
    quiz: [
      { question: "Key fire-risk reduction step in laser airway surgery:", options: ["High FiO₂", "Nitrous oxide", "Lowest acceptable FiO₂ and laser-safe tube", "PVC tube"], correctIndex: 2, explanation: "Reduce oxidant (FiO₂ ≤0.3, no N₂O) and use a laser-resistant tube with saline-filled cuff." },
      { question: "A post-tonsillectomy bleed patient should be treated as:", options: ["Fasted", "Full stomach with likely hypovolaemia", "Elective", "Needing awake fibreoptic always"], correctIndex: 1, explanation: "Swallowed blood means aspiration risk; resuscitate then RSI." },
      { question: "Throat packs require:", options: ["No documentation", "A formal insertion and removal check", "Leaving in overnight", "Removal by recovery staff only"], correctIndex: 1, explanation: "Retained throat packs are a never event; use a visual/documented check." },
    ],
  },
  {
    id: "protocol-urology",
    title: "Urology",
    link: "/clinical/urological-anaesthesia",
    scope: "TURP, cystectomy, robotic prostatectomy.",
    preop: [
      "Elderly comorbid population; renal function",
      "Plan neuraxial for TURP (allows early detection of TURP syndrome)",
      "Robotic: assess tolerance of steep Trendelenburg (glaucoma, cerebrovascular disease)",
    ],
    intraop: [
      "TURP: limit resection time; bipolar resection with saline reduces TURP syndrome",
      "Lithotomy: pressure points, compartment syndrome in long cases",
      "Robotic: steep head-down + pneumoperitoneum — airway oedema, raised ICP/IOP",
    ],
    postop: [
      "Check sodium if glycine irrigation used",
      "Bladder irrigation management, bleeding",
      "Cystectomy: ERAS, ileus, fluid and electrolyte monitoring",
    ],
    quiz: [
      { question: "TURP syndrome is caused by:", options: ["Air embolism", "Absorption of hypotonic irrigation fluid", "Local anaesthetic toxicity", "Bladder perforation only"], correctIndex: 1, explanation: "Glycine/water absorption causes hyponatraemia, fluid overload and glycine toxicity." },
      { question: "Why is spinal anaesthesia favoured for TURP?", options: ["Prevents bleeding", "Allows early recognition of confusion from TURP syndrome", "Avoids lithotomy", "Prevents hypothermia"], correctIndex: 1, explanation: "An awake patient shows early neurological signs." },
      { question: "Bipolar TURP with saline irrigation:", options: ["Increases hyponatraemia risk", "Reduces dilutional hyponatraemia risk", "Requires glycine", "Is contraindicated in the elderly"], correctIndex: 1, explanation: "Isotonic saline removes the dilutional hyponatraemia, though fluid overload can still occur." },
    ],
  },
  {
    id: "protocol-paediatric",
    title: "Paediatric (Day Case)",
    link: "/clinical/paediatric-anaesthesia",
    scope: "Common day-case surgery in children.",
    preop: [
      "Fasting: clear fluids up to 1 h (APA/ESAIC), breast milk 4 h, food 6 h",
      "Weight-based drug calculations; URTI and OSA assessment",
      "Topical anaesthetic cream; parental presence and premedication if anxious",
    ],
    intraop: [
      "Inhalational or IV induction; age-appropriate equipment",
      "Laryngospasm plan: CPAP, deepen with propofol, suxamethonium if needed",
      "Caudal or local infiltration for lower abdominal/penile surgery",
      "Isotonic maintenance fluids with glucose as indicated",
    ],
    postop: [
      "Multimodal analgesia (paracetamol, NSAID); avoid codeine in under-12s",
      "PONV prophylaxis (high risk: strabismus, tonsillectomy)",
      "Discharge criteria; emergence delirium management",
    ],
    quiz: [
      { question: "Current UK/European guidance allows clear fluids in children until:", options: ["4 h", "2 h", "1 h before anaesthesia", "6 h"], correctIndex: 2, explanation: "APA/ESAIC consensus supports clear fluids up to 1 hour pre-induction." },
      { question: "Codeine should be avoided in children under 12 because:", options: ["It is ineffective", "Ultra-rapid CYP2D6 metabolisers risk fatal respiratory depression", "It causes hepatotoxicity", "It is too expensive"], correctIndex: 1, explanation: "MHRA contraindicates codeine under 12 and after tonsillectomy in under-18s." },
      { question: "First step in managing laryngospasm:", options: ["Suxamethonium immediately", "Jaw thrust with CPAP 100% O₂", "Extubate", "Give atropine only"], correctIndex: 1, explanation: "Remove stimulus, jaw thrust and CPAP; deepen with propofol, then suxamethonium if it persists." },
    ],
  },
];

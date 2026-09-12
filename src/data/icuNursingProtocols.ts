export interface ProtocolReference {
  label: string;
  source: string;
  url: string;
}

export interface NursingProtocol {
  id: string;
  title: string;
  category:
    | "Vascular access"
    | "Airway & ventilation"
    | "Neurological"
    | "Renal & fluids"
    | "Nutrition & GI"
    | "Skin & mobility"
    | "Infection prevention";
  aim: string;
  /** Routine bedside steps, in the order they are performed. */
  steps: string[];
  /** What the bedside nurse records and how often. */
  monitoring: string[];
  /** Triggers to call the ICU doctor / outreach. */
  escalation: string[];
  references: ProtocolReference[];
}

/**
 * Bedside nursing care bundles used in UK adult critical care. Content is a
 * revision summary of national guidance (GPICS v2.1, epic3, NICE, SSC) and must
 * be used alongside each unit's own written protocols.
 */
export const icuNursingProtocols: NursingProtocol[] = [
  {
    id: "central-line-care",
    title: "Central venous catheter care",
    category: "Vascular access",
    aim: "Prevent catheter-related bloodstream infection (CRBSI) and mechanical complications, and remove the line as soon as it is no longer needed.",
    steps: [
      "Insertion bundle: hand hygiene, maximal sterile barrier precautions, 2% chlorhexidine in 70% alcohol skin prep allowed to dry, ultrasound guidance, subclavian or internal jugular preferred over femoral in adults.",
      "Secure with a sutureless device where possible and cover with a sterile, transparent semipermeable dressing; use a chlorhexidine-impregnated dressing if the unit's CRBSI rate remains high.",
      "Change transparent dressings every 7 days (gauze every 2 days) and immediately if damp, soiled or loose.",
      "Decontaminate every needle-free connector by scrubbing with 2% chlorhexidine in 70% alcohol for at least 15 seconds and allow to dry before each access.",
      "Change administration sets: crystalloid every 96 h, blood and blood components within 12 h (giving set per unit policy), lipid-containing parenteral nutrition every 24 h, propofol every 12 h.",
      "Dedicate a lumen to parenteral nutrition; label lumens for vasoactive infusions and never bolus through a vasopressor lumen.",
      "Review the need for the line on every ward round and document a removal plan — daily review is the single most effective bundle element.",
    ],
    monitoring: [
      "Inspect and score the insertion site at least once per shift (VIP/equivalent score) and document.",
      "Record dressing integrity, date of insertion and days in situ on the daily chart.",
      "Check line position on the chest radiograph after insertion and after any accidental pull.",
      "Measure and record the external catheter length to detect migration.",
    ],
    escalation: [
      "New erythema, discharge, tenderness or a positive VIP score — inform medical team and consider removal.",
      "New fever or rising inflammatory markers with no other source — send paired peripheral and line cultures and discuss line removal.",
      "Occlusion, air aspiration, inability to aspirate blood, or sudden breathlessness or arrhythmia during use.",
      "Suspected air embolism: clamp the line, lay the patient head-down in the left lateral position, give 100% oxygen and call for help immediately.",
    ],
    references: [
      {
        label: "epic3: national evidence-based guidelines for preventing healthcare-associated infections",
        source: "Journal of Hospital Infection 2014",
        url: "https://www.journalofhospitalinfection.com/article/S0195-6701(13)60012-2/fulltext",
      },
      {
        label: "Guidelines for the Provision of Intensive Care Services (GPICS) v2.1",
        source: "Faculty of Intensive Care Medicine / Intensive Care Society",
        url: "https://www.ficm.ac.uk/standardssafetyguidelinesstandards/guidelines-for-the-provision-of-intensive-care-services",
      },
      {
        label: "Infection: prevention and control of healthcare-associated infections (CG139)",
        source: "NICE",
        url: "https://www.nice.org.uk/guidance/cg139",
      },
    ],
  },
  {
    id: "ventilator-care-bundle",
    title: "Ventilated patient care bundle",
    category: "Airway & ventilation",
    aim: "Reduce ventilator-associated pneumonia (VAP) and ventilator-induced lung injury while shortening time on the ventilator.",
    steps: [
      "Head-up positioning at 30–45° unless contraindicated (spinal precautions, haemodynamic instability, prone positioning).",
      "Chlorhexidine or non-antiseptic oral care with suction at least 6-hourly; keep lips and mucosa moist.",
      "Measure tracheal cuff pressure at least 8-hourly and keep it at 20–30 cmH₂O — enough to seal, not enough to cause mucosal ischaemia.",
      "Subglottic secretion drainage where the tube allows; use closed in-line suction and change per unit policy.",
      "Daily sedation hold with a paired spontaneous breathing trial when safe (ABCDEF bundle) and document readiness-to-wean criteria.",
      "Lung-protective settings: tidal volume 6 mL/kg predicted body weight, plateau pressure ≤30 cmH₂O, driving pressure ≤15 cmH₂O.",
      "Thromboprophylaxis and stress-ulcer prophylaxis as prescribed; avoid unnecessary proton pump inhibitors once enterally fed and low risk.",
      "Change heat and moisture exchangers every 24 h or when soiled; do not routinely change ventilator circuits.",
    ],
    monitoring: [
      "Hourly: mode, set and delivered tidal volume, rate, FiO₂, PEEP, peak/plateau pressure, SpO₂, end-tidal CO₂.",
      "Per shift: tube length at the lips/teeth, cuff pressure, secretion volume and appearance, sedation score (RASS) and pain score.",
      "Daily: chest radiograph indication, arterial blood gas trend, weaning screen, VAP bundle compliance audit.",
    ],
    escalation: [
      "Sudden rise in airway pressure or loss of capnograph trace — DOPES check (Displacement, Obstruction, Pneumothorax, Equipment, Stacked breaths) and call for help.",
      "Falling SpO₂ or rising FiO₂ requirement, new purulent secretions, or fever suggesting VAP.",
      "Plateau pressure >30 cmH₂O or driving pressure >15 cmH₂O despite optimisation.",
      "Unplanned extubation or cuff leak that cannot be corrected at 30 cmH₂O.",
    ],
    references: [
      {
        label: "Guidelines for the Provision of Intensive Care Services (GPICS) v2.1 — respiratory support standards",
        source: "Faculty of Intensive Care Medicine / Intensive Care Society",
        url: "https://www.ficm.ac.uk/standardssafetyguidelinesstandards/guidelines-for-the-provision-of-intensive-care-services",
      },
      {
        label: "Ventilation with lower tidal volumes for acute lung injury and ARDS (ARMA trial)",
        source: "ARDS Network, NEJM 2000;342:1301–8",
        url: "https://www.nejm.org/doi/full/10.1056/NEJM200005043421801",
      },
      {
        label: "Strategies to prevent ventilator-associated pneumonia in acute care hospitals: 2022 update",
        source: "SHEA/IDSA, Infect Control Hosp Epidemiol 2022",
        url: "https://www.cambridge.org/core/journals/infection-control-and-hospital-epidemiology/article/strategies-to-prevent-ventilatorassociated-pneumonia-ventilatorassociated-events-and-nonventilator-hospitalacquired-pneumonia-in-acute-care-hospitals-2022-update/49485F1DA6E06BFDA1C4E4A5A12FBA9A",
      },
    ],
  },
  {
    id: "tracheostomy-care",
    title: "Tracheostomy care",
    category: "Airway & ventilation",
    aim: "Maintain a patent, secure tracheostomy and ensure every bedside is equipped to manage displacement or obstruction.",
    steps: [
      "Bed-head sign displaying tube type, size, insertion date, whether the patient has a patent upper airway, and the emergency algorithm.",
      "Bedside emergency equipment: same-size and one-size-smaller tubes, tracheal dilators, suction, bag-valve device, capnography, spare inner cannulae.",
      "Check and clean the inner cannula at least 4-hourly (more if secretions are thick) — an obstructed inner tube is the commonest cause of sudden difficulty.",
      "Humidify all inspired gas; give saline nebulisers or mucolytics if secretions are tenacious.",
      "Suction only to the length of the tube, using the smallest effective catheter, and pre-oxygenate if the patient desaturates.",
      "Change tapes/holder with two staff, one securing the tube throughout; keep the tube clean and the stoma dry.",
      "Assess for cuff deflation, speaking valve and swallow assessment with speech and language therapy once weaning.",
    ],
    monitoring: [
      "Per shift: tube patency, stoma appearance, cuff pressure 20–30 cmH₂O, secretion load and character.",
      "Continuous capnography for any ventilated tracheostomy patient.",
      "Document the first tube change date (usually after 7–10 days when the tract is mature) and who may perform it.",
    ],
    escalation: [
      "Suspected displacement or obstruction — follow the National Tracheostomy Safety Project emergency algorithm and call for airway help immediately.",
      "Bleeding from the stoma, particularly any sentinel bleed — consider tracheo-innominate fistula, a surgical emergency.",
      "Surgical emphysema, increasing airway pressures or inability to pass a suction catheter.",
    ],
    references: [
      {
        label: "NTSP emergency tracheostomy and laryngectomy management algorithms",
        source: "National Tracheostomy Safety Project",
        url: "https://www.tracheostomy.org.uk/healthcare-staff/emergency-care",
      },
      {
        label: "Multidisciplinary guidelines for the management of tracheostomy and laryngectomy airway emergencies",
        source: "Anaesthesia 2012;67:1025–41",
        url: "https://associationofanaesthetists-publications.onlinelibrary.wiley.com/doi/10.1111/j.1365-2044.2012.07217.x",
      },
    ],
  },
  {
    id: "sedation-delirium-abcdef",
    title: "Sedation, pain and delirium (ABCDEF bundle)",
    category: "Neurological",
    aim: "Keep patients comfortable, awake and interactive where possible — less sedation means less delirium, shorter ventilation and better long-term function.",
    steps: [
      "A — Assess, prevent and manage pain first, using a validated tool (numerical rating scale, or CPOT/BPS if unable to self-report).",
      "B — Both spontaneous awakening and spontaneous breathing trials, coordinated daily by nursing and medical staff.",
      "C — Choice of analgesia and sedation: analgesia-first, target the lightest sedation possible, prefer propofol or dexmedetomidine over benzodiazepines.",
      "D — Delirium assessment with CAM-ICU or ICDSC at least once per shift; treat causes (pain, hypoxia, sepsis, retention, withdrawal, drugs) before considering antipsychotics.",
      "E — Early mobility and exercise, escalating from passive range of movement to sitting out and walking.",
      "F — Family engagement and empowerment: open visiting, orientation aids, hearing aids and glasses, diaries, day-night routine.",
    ],
    monitoring: [
      "Hourly sedation score (RASS target usually 0 to −2) and pain score; document target versus actual.",
      "Once-per-shift delirium screen (CAM-ICU) with the result recorded on the chart.",
      "Daily: sedation hold performed or reason documented, mobility level achieved, sleep quality.",
    ],
    escalation: [
      "RASS persistently outside the prescribed target, or failure to wake during a sedation hold.",
      "New positive CAM-ICU, agitation risking line or tube removal, or suspected withdrawal.",
      "New focal neurology, seizures, or pupils changing — urgent medical review and consider imaging.",
    ],
    references: [
      {
        label: "PADIS guidelines: pain, agitation/sedation, delirium, immobility and sleep disruption in adult ICU patients",
        source: "Society of Critical Care Medicine, Crit Care Med 2018;46:e825–73",
        url: "https://journals.lww.com/ccmjournal/fulltext/2018/09000/clinical_practice_guidelines_for_the_prevention.29.aspx",
      },
      {
        label: "Delirium: prevention, diagnosis and management in hospital and long-term care (CG103)",
        source: "NICE",
        url: "https://www.nice.org.uk/guidance/cg103",
      },
      {
        label: "Rehabilitation after critical illness in adults (CG83)",
        source: "NICE",
        url: "https://www.nice.org.uk/guidance/cg83",
      },
    ],
  },
  {
    id: "prone-positioning",
    title: "Prone positioning",
    category: "Airway & ventilation",
    aim: "Deliver prone ventilation safely in moderate-to-severe ARDS (PaO₂/FiO₂ <20 kPa) for at least 12–16 hours per session.",
    steps: [
      "Pre-turn checklist and team brief: minimum five staff, airway lead at the head, roles allocated, escalation plan agreed.",
      "Secure the airway and all lines; pre-oxygenate, empty and aspirate the nasogastric tube, pause feed, protect the eyes with lubricant and tape.",
      "Disconnect non-essential lines, position ECG electrodes on the back, and prepare pillows for chest, pelvis and lower legs.",
      "Turn on a count led by the airway lead, then reposition head and arms into a swimmer's position.",
      "Two-hourly repositioning of head, arms and pressure points; reverse Trendelenburg if intra-abdominal or facial oedema is a problem.",
      "Restart feeding at a reduced rate with head-up tilt once stable, and document eye and pressure-area care.",
    ],
    monitoring: [
      "Continuous SpO₂, capnography and haemodynamics during and after the turn; blood gas 1 h after proning to assess response.",
      "Two-hourly pressure-area and facial oedema checks (forehead, cheeks, chin, chest, iliac crests, knees).",
      "Check tube length, cuff pressure, line patency and feeding tolerance after each repositioning.",
    ],
    escalation: [
      "Desaturation, loss of capnograph trace, or suspected tube displacement during the turn — return supine immediately if the airway is lost.",
      "No improvement in oxygenation after 4 hours prone, or worsening haemodynamics requiring escalating vasopressors.",
      "New pressure damage, facial or conjunctival oedema threatening the eye.",
    ],
    references: [
      {
        label: "Prone positioning in severe acute respiratory distress syndrome (PROSEVA)",
        source: "Guérin et al., NEJM 2013;368:2159–68",
        url: "https://www.nejm.org/doi/full/10.1056/NEJMoa1214103",
      },
      {
        label: "Guidance for: prone positioning in adult critical care",
        source: "Intensive Care Society / Faculty of Intensive Care Medicine",
        url: "https://ics.ac.uk/resource/prone-position-guidance.html",
      },
    ],
  },
  {
    id: "rrt-circuit-care",
    title: "Renal replacement therapy circuit care",
    category: "Renal & fluids",
    aim: "Maintain filter life, deliver the prescribed dose of therapy and avoid fluid and electrolyte errors.",
    steps: [
      "Confirm the prescription before starting: modality, effluent dose (usually 20–25 mL/kg/h delivered), blood flow, anticoagulation, fluid removal rate and replacement fluid.",
      "Check the vascath position, secure it, and use it only for renal replacement therapy unless a documented exception applies.",
      "Prime the circuit per manufacturer instructions and check all connections are visible and not covered by bedding.",
      "Regional citrate anticoagulation is first-line where available; monitor post-filter ionised calcium 0.25–0.35 mmol/L and systemic ionised calcium 1.1–1.3 mmol/L.",
      "Where heparin is used, monitor APTT ratio or anti-Xa per unit protocol; consider no anticoagulation if actively bleeding.",
      "Reconcile the fluid balance hourly — pump-reported balance and actual bag weights must agree.",
      "Return the blood on planned disconnection; document filter life and reason for circuit loss.",
    ],
    monitoring: [
      "Hourly: access and return pressures, transmembrane pressure, blood flow, effluent dose, net ultrafiltration, cumulative balance.",
      "4–6-hourly: ionised calcium (systemic and post-filter if citrate), potassium, phosphate, magnesium, acid-base.",
      "Per shift: circuit integrity, filter appearance for clotting/streaking, vascath site.",
    ],
    escalation: [
      "Rising transmembrane pressure or repeated access alarms — imminent clotting; reposition line and inform the medical team.",
      "Citrate accumulation: rising total:ionised calcium ratio >2.5, metabolic acidosis with increasing anion gap — stop or reduce citrate.",
      "Hypotension with fluid removal, arrhythmia, or potassium <3.0 or >6.0 mmol/L.",
      "Air in the circuit, blood leak alarm, or circuit disconnection — clamp, stop the pump and call for help.",
    ],
    references: [
      {
        label: "KDIGO clinical practice guideline for acute kidney injury",
        source: "Kidney International Supplements 2012;2:1–138",
        url: "https://kdigo.org/guidelines/acute-kidney-injury/",
      },
      {
        label: "Acute kidney injury: prevention, detection and management (NG148)",
        source: "NICE",
        url: "https://www.nice.org.uk/guidance/ng148",
      },
    ],
  },
  {
    id: "enteral-feeding",
    title: "Enteral feeding and nasogastric tube safety",
    category: "Nutrition & GI",
    aim: "Start feed early and safely, confirm tube position before every use, and avoid refeeding and aspiration complications.",
    steps: [
      "Start enteral nutrition within 24–48 h of admission unless contraindicated (uncontrolled shock, bowel obstruction, ischaemia, high-output fistula).",
      "Confirm nasogastric tube position by pH-testing the aspirate — pH 5.5 or below is safe to use. Never use the whoosh test or litmus paper.",
      "If aspirate cannot be obtained or pH is >5.5, obtain a chest radiograph interpreted and documented by a competent clinician before use.",
      "Re-check position before every feed, drug administration and water flush, after vomiting or coughing, and after any tube movement.",
      "Nurse head-up at 30–45° during feeding and for at least 30 minutes afterwards.",
      "Follow the unit's feeding algorithm for gastric residual volumes; consider prokinetics then post-pyloric feeding if intolerance persists.",
      "Assess refeeding risk before starting: if high risk, begin at no more than 10 kcal/kg/day, give thiamine and vitamin B before feeding, and replace potassium, phosphate and magnesium.",
    ],
    monitoring: [
      "Each shift: tube position check documented, external tube length, nostril and mouth care, feed volume delivered versus prescribed.",
      "Daily: weight or fluid balance, bowel chart, electrolytes (potassium, phosphate, magnesium) especially in the first 72 h of feeding.",
      "Blood glucose per protocol; dietitian review within 24–48 h.",
    ],
    escalation: [
      "Misplacement suspected — coughing, desaturation, or aspirate that cannot be confirmed: stop, remove and escalate (never-event risk).",
      "Large or bilious aspirates, abdominal distension, new abdominal pain, or absent bowel sounds with distension.",
      "Falling phosphate, potassium or magnesium after feed starts — treat as refeeding syndrome.",
    ],
    references: [
      {
        label: "Nasogastric tube misplacement: continuing risk of death and severe harm (patient safety alert)",
        source: "NHS Improvement",
        url: "https://www.england.nhs.uk/publication/patient-safety-alert-nasogastric-tube-misplacement-continuing-risk-of-death-and-severe-harm/",
      },
      {
        label: "Nutrition support for adults (CG32)",
        source: "NICE",
        url: "https://www.nice.org.uk/guidance/cg32",
      },
      {
        label: "ESPEN guideline on clinical nutrition in the intensive care unit",
        source: "Clinical Nutrition 2019;38:48–79",
        url: "https://www.espen.org/files/ESPEN-Guidelines/ESPEN-guideline-on-clinical-nutrition-in-the-intensive-care-unit.pdf",
      },
    ],
  },
  {
    id: "pressure-area-mobility",
    title: "Pressure area care and early mobilisation",
    category: "Skin & mobility",
    aim: "Prevent pressure ulcers and ICU-acquired weakness with structured repositioning and graded rehabilitation.",
    steps: [
      "Perform a skin and pressure ulcer risk assessment (e.g. Braden/Waterlow with an ICU-specific adjustment) within 6 h of admission and daily thereafter.",
      "Reposition at least 2–4-hourly, documenting position; use 30° tilt rather than 90° lateral to offload the trochanter.",
      "Use a pressure-redistributing mattress for all patients who cannot reposition themselves; heel offloading devices for anyone sedated or vasopressor-dependent.",
      "Protect device-related sites: tracheostomy flanges, tube ties, ETT lips, pulse oximeter probes (rotate 4-hourly), nasal bridge under non-invasive masks.",
      "Agree a daily rehabilitation goal with physiotherapy: passive range of movement, sitting on the edge of the bed, standing, then walking.",
      "Set short-term rehabilitation goals within 4 days of admission or before discharge from critical care, per NICE CG83.",
    ],
    monitoring: [
      "Each shift: full skin inspection including sacrum, heels, occiput and all device sites; grade and photograph any damage per policy.",
      "Daily: mobility level achieved, hand-grip or MRC sum score where used, rehabilitation goals reviewed.",
      "Nutrition and moisture management documented — incontinence-associated dermatitis accelerates pressure damage.",
    ],
    escalation: [
      "Any category 2 or above pressure ulcer — report as an incident and refer to tissue viability.",
      "Unable to reposition because of haemodynamic instability — document and review with the medical team for a mitigation plan.",
      "New profound weakness on waking suggesting ICU-acquired weakness — physiotherapy and medical review.",
    ],
    references: [
      {
        label: "Pressure ulcers: prevention and management (CG179)",
        source: "NICE",
        url: "https://www.nice.org.uk/guidance/cg179",
      },
      {
        label: "Prevention and treatment of pressure ulcers/injuries: clinical practice guideline",
        source: "EPUAP/NPIAP/PPPIA 2019",
        url: "https://internationalguideline.com/",
      },
      {
        label: "Rehabilitation after critical illness in adults (CG83)",
        source: "NICE",
        url: "https://www.nice.org.uk/guidance/cg83",
      },
    ],
  },
  {
    id: "sepsis-six-nursing",
    title: "Sepsis recognition and the first hour",
    category: "Infection prevention",
    aim: "Recognise deterioration early and deliver time-critical treatment within the first hour of suspected sepsis.",
    steps: [
      "Screen every deteriorating patient with NEWS2 plus a sepsis screening tool; escalate an aggregate NEWS2 ≥5 or a single score of 3 immediately.",
      "Take blood cultures before antibiotics where this does not delay them, plus lactate, full blood count, urea and electrolytes, clotting and glucose.",
      "Give broad-spectrum antibiotics within 1 hour of recognising septic shock or high-probability sepsis.",
      "Start fluid resuscitation — 30 mL/kg balanced crystalloid within the first 3 h for hypotension or lactate ≥4 mmol/L, given in assessed boluses.",
      "Measure urine output hourly and consider a urinary catheter; start vasopressors for MAP <65 mmHg not corrected by fluid.",
      "Achieve source control as early as possible — chase imaging, surgical or radiological review.",
      "Repeat lactate within 2–4 h to assess response.",
    ],
    monitoring: [
      "Continuous or minimum 30-minute observations until stable: NEWS2, MAP, heart rate, respiratory rate, SpO₂, temperature, conscious level.",
      "Hourly urine output and fluid balance; serial lactate.",
      "Antibiotic timing and culture results documented; review and de-escalate daily.",
    ],
    escalation: [
      "MAP <65 mmHg after 30 mL/kg fluid, or rising lactate — critical care outreach and vasopressor initiation.",
      "Antibiotics not given within 1 hour of recognition — escalate immediately, this is a time-critical failure.",
      "New confusion, oliguria <0.5 mL/kg/h for 2 h, or rising oxygen requirement.",
    ],
    references: [
      {
        label: "Surviving Sepsis Campaign: international guidelines for management of sepsis and septic shock 2021",
        source: "Intensive Care Medicine 2021;47:1181–247",
        url: "https://link.springer.com/article/10.1007/s00134-021-06506-y",
      },
      {
        label: "Suspected acute respiratory infection in over 16s: assessment at first presentation and initial management (NG237)",
        source: "NICE",
        url: "https://www.nice.org.uk/guidance/ng237",
      },
      {
        label: "National Early Warning Score (NEWS2)",
        source: "Royal College of Physicians",
        url: "https://www.rcp.ac.uk/improving-care/resources/national-early-warning-score-news-2/",
      },
    ],
  },
  {
    id: "urinary-catheter-care",
    title: "Urinary catheter care",
    category: "Infection prevention",
    aim: "Avoid catheter-associated urinary tract infection and remove the catheter at the earliest safe opportunity.",
    steps: [
      "Insert only for a documented indication — accurate hourly urine measurement in the critically ill, retention, or specific surgical need.",
      "Aseptic insertion with single-use sterile lubricant and a closed drainage system that is never broken.",
      "Keep the bag below bladder level and off the floor; empty into a clean, patient-specific container using gloves and apron.",
      "Daily meatal hygiene with soap and water — do not use antiseptics or routine bladder washouts.",
      "Sample only from the designated sampling port after disinfection, never from the bag.",
      "Review the need for the catheter daily and record the planned removal date; trial without catheter as soon as the indication ends.",
    ],
    monitoring: [
      "Hourly urine volume and colour in the critically ill; document days in situ.",
      "Per shift: meatal appearance, drainage system integrity, no dependent loops or kinks.",
      "Do not send routine surveillance cultures from asymptomatic catheterised patients.",
    ],
    escalation: [
      "New fever, suprapubic or loin pain, or delirium with no other source — consider CAUTI and discuss catheter change plus culture.",
      "Anuria or sudden fall in output — check for blockage or kinking, bladder-scan, then escalate as possible AKI.",
      "Haematuria, traumatic insertion, or inability to deflate the balloon.",
    ],
    references: [
      {
        label: "epic3: preventing infections associated with short-term indwelling urethral catheters",
        source: "Journal of Hospital Infection 2014",
        url: "https://www.journalofhospitalinfection.com/article/S0195-6701(13)60012-2/fulltext",
      },
      {
        label: "Healthcare-associated infections: prevention and control in primary and community care (CG139)",
        source: "NICE",
        url: "https://www.nice.org.uk/guidance/cg139",
      },
    ],
  },
  {
    id: "glycaemic-control",
    title: "Glycaemic control and insulin infusion",
    category: "Renal & fluids",
    aim: "Keep blood glucose in a safe range without causing hypoglycaemia, which is independently associated with harm.",
    steps: [
      "Start a variable-rate intravenous insulin infusion when blood glucose exceeds 10 mmol/L on two consecutive readings.",
      "Target a glucose of roughly 8–10 mmol/L in critically ill adults; avoid tight control targeting 4.5–6 mmol/L.",
      "Use a standard concentration (commonly 50 units soluble insulin in 50 mL 0.9% sodium chloride, 1 unit/mL) via a dedicated pump and lumen.",
      "Ensure a concurrent carbohydrate source (feed or glucose infusion) and never stop the substrate without stopping the insulin.",
      "Follow the unit's titration table; double-check any rate change with a second nurse.",
      "Treat glucose <4 mmol/L immediately with 100 mL of 20% glucose IV, stop the insulin and recheck at 15 minutes.",
    ],
    monitoring: [
      "Hourly capillary or arterial blood glucose until stable for 4 h, then 2-hourly per protocol.",
      "Arterial blood gas glucose or a laboratory sample if the patient is shocked or on vasopressors — capillary values are unreliable.",
      "Daily potassium — insulin drives potassium intracellularly.",
    ],
    escalation: [
      "Any glucose <4 mmol/L, or recurrent hypoglycaemia despite protocol adjustment.",
      "Glucose persistently >12 mmol/L on maximum protocol rates.",
      "Ketones present with hyperglycaemia — consider DKA pathway rather than a standard insulin infusion.",
    ],
    references: [
      {
        label: "Intensive versus conventional glucose control in critically ill patients (NICE-SUGAR)",
        source: "NEJM 2009;360:1283–97",
        url: "https://www.nejm.org/doi/full/10.1056/NEJMoa0810625",
      },
      {
        label: "Surviving Sepsis Campaign 2021 — glucose control recommendations",
        source: "Intensive Care Medicine 2021;47:1181–247",
        url: "https://link.springer.com/article/10.1007/s00134-021-06506-y",
      },
    ],
  },
  {
    id: "handover-daily-goals",
    title: "Handover, daily goals and family communication",
    category: "Neurological",
    aim: "Ensure continuity of care, a shared daily plan, and consistent communication with families.",
    steps: [
      "Structured bedside handover (SBAR or equivalent) at every shift change, with the nurse and medical team present for the ward round summary.",
      "Complete a daily goals sheet covering organ-support targets, sedation and mobility targets, lines and devices to remove, feeding, escalation status and family update.",
      "Review every line, drain, catheter and drug daily for continued need — the FASTHUG mnemonic (Feeding, Analgesia, Sedation, Thromboprophylaxis, Head-up, Ulcer prophylaxis, Glucose) is a reliable safety net.",
      "Document treatment escalation and resuscitation decisions clearly and revisit them as the clinical picture changes.",
      "Offer families a daily update, written information, open visiting and access to an ICU diary where the unit provides one.",
      "Use structured transfer documentation when the patient leaves the unit, including a rehabilitation and follow-up plan.",
    ],
    monitoring: [
      "Audit daily goals completion and FASTHUG compliance.",
      "Record who was updated, when, and what was said.",
      "Track ward-discharge time of day — out-of-hours discharge is linked to worse outcomes.",
    ],
    escalation: [
      "Disagreement about the treatment plan or escalation status — involve the consultant early.",
      "Family distress, safeguarding concerns, or a request for a second opinion.",
      "Discharge planned out of hours or without a completed rehabilitation plan.",
    ],
    references: [
      {
        label: "Guidelines for the Provision of Intensive Care Services (GPICS) v2.1 — care standards and handover",
        source: "Faculty of Intensive Care Medicine / Intensive Care Society",
        url: "https://www.ficm.ac.uk/standardssafetyguidelinesstandards/guidelines-for-the-provision-of-intensive-care-services",
      },
      {
        label: "Rehabilitation after critical illness in adults (CG83)",
        source: "NICE",
        url: "https://www.nice.org.uk/guidance/cg83",
      },
      {
        label: "Acutely ill adults in hospital: recognising and responding to deterioration (CG50)",
        source: "NICE",
        url: "https://www.nice.org.uk/guidance/cg50",
      },
    ],
  },
];

export const nursingProtocolCategories = Array.from(
  new Set(icuNursingProtocols.map((p) => p.category)),
);

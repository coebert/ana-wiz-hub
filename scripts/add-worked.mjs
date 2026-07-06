#!/usr/bin/env node
// Injects a single WorkedExample into 30 topic pages missing them.
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve("src/pages/topics");

const EX = {
  // ---------- Anatomy ----------
  SpinalAnatomyTopic: {
    title: "Identifying a safe interspace for spinal anaesthesia",
    scenario:
      "A 32-year-old G2P1 at 39 weeks requests a CSE for elective caesarean section. She is BMI 38 and palpation is difficult. How do you choose a safe interspace and confirm midline?",
    steps: [
      "Position upright or lateral with maximal lumbar flexion to widen interspinous gaps",
      "Identify Tuffier's line (intercristal): in adults this crosses L4 spinous process or the L3/4 interspace",
      "In obese pregnancy the line may overlie L3 — go one space caudal (L3/4 or L4/5) to stay well below the L1/2 conus",
      "If landmarks are unreliable use ultrasound paramedian sagittal oblique to identify laminae and count from the sacrum upward",
      "Confirm midline by symmetrical paraspinous resistance and CSF flow free of paraesthesia",
    ],
    traps: [
      "Choosing a higher interspace because Tuffier's line is displaced cephalad in pregnancy and obesity — risk of conus injury",
      "Mistaking the lower border of T12 for L1 on ultrasound count",
    ],
    answer:
      "Use L3/4 or L4/5 with Tuffier's line as a starting estimate; in this BMI-38 parturient, confirm with ultrasound and count from the sacrum to stay caudal to the conus (L1/2).",
    cites: ["BJA Educ 2006", "Ellis & Feldman Ch.6"],
  },
  HeadNeckAnatomyTopic: {
    title: "Front-of-neck access (FONA) in a CICO scenario",
    scenario:
      "After failed intubation and ventilation in a 70 kg adult, you proceed to emergency front-of-neck access. Describe the landmark-guided scalpel-bougie-tube technique and key anatomy.",
    steps: [
      "Extend the neck and palpate the cricothyroid membrane between the thyroid (above) and cricoid (below) cartilages",
      "If membrane is impalpable, make an 8–10 cm vertical midline skin incision then re-palpate (DAS 'laryngeal handshake')",
      "Stabilise the larynx with the non-dominant hand; make a transverse stab through the cricothyroid membrane, rotate the blade caudally",
      "Railroad a bougie caudally into the trachea (feel tracheal clicks), then advance a 6.0 cuffed ETT over the bougie",
      "Inflate cuff, ventilate, confirm with capnography, and call for ENT/surgical airway support",
    ],
    traps: [
      "Cricothyroid artery runs across the upper third of the membrane — stay low",
      "Mistaking the thyrohyoid membrane for the cricothyroid in slim necks",
      "Advancing the bougie cephalad into the larynx",
    ],
    answer:
      "DAS scalpel-bougie-tube via the cricothyroid membrane: transverse stab, caudal rotation, bougie railroad, 6.0 cuffed tube, capnography confirmation.",
    cites: ["DAS 2015 Guidelines", "BJA Educ 2016"],
  },
  UpperLimbAnatomyTopic: {
    title: "Choosing a brachial plexus approach for hand surgery",
    scenario:
      "A 45-year-old needs an awake regional anaesthetic for trigger finger release of the 4th digit. Which brachial plexus block is most appropriate and why?",
    steps: [
      "Identify the surgical territory: 4th digit innervated by median (palmar) and ulnar (dorsal) nerves — both terminal branches",
      "Map approaches to plexus levels: interscalene → roots/trunks (misses C8–T1), supraclavicular → trunks/divisions, infraclavicular → cords, axillary → terminal branches",
      "Interscalene spares the ulnar nerve (inferior trunk, C8–T1) — inappropriate",
      "Choose axillary or infraclavicular: axillary block covers median, ulnar, radial directly (musculocutaneous needs separate block for forearm tourniquet)",
      "Add ultrasound-guided musculocutaneous block in coracobrachialis if forearm tourniquet is used >30 min",
    ],
    traps: [
      "Forgetting the musculocutaneous nerve leaves the lateral cord proximal to the axilla",
      "Using interscalene for hand surgery — ulnar sparing",
      "Intercostobrachial (T2) not covered by any brachial plexus block",
    ],
    answer:
      "Ultrasound-guided axillary block (median, ulnar, radial) plus a separate musculocutaneous injection in coracobrachialis; add tourniquet pain plan and intercostobrachial infiltration if needed.",
    cites: ["BJA Educ 2014", "Ellis & Feldman Ch.8"],
  },
  LowerLimbAnatomyTopic: {
    title: "Regional plan for total knee replacement",
    scenario:
      "A 72-year-old for elective TKR wants opioid-sparing analgesia with early mobilisation. Design a regional plan covering the relevant nerves while preserving quadriceps power.",
    steps: [
      "Map the surgical innervation: anterior knee — femoral nerve branches (vastus, saphenous); posterior knee — sciatic (tibial + common peroneal) and obturator articular branches",
      "For motor-sparing analgesia choose adductor canal block (saphenous + nerve to vastus medialis) instead of femoral — preserves quadriceps for early mobilisation",
      "Cover the posterior capsule with IPACK (Infiltration between Popliteal Artery and Capsule of Knee) — analgesia without foot drop",
      "Add periarticular surgical infiltration with LA + ketorolac to bridge the obturator contribution",
      "Avoid sciatic block — produces foot drop and impairs early mobilisation/falls assessment",
    ],
    traps: [
      "Femoral block causing quad weakness and falls in day-case TKR",
      "Missing posterior capsule pain when relying on adductor canal alone",
      "Local anaesthetic systemic toxicity from combined regional + periarticular doses — calculate maximum mg/kg",
    ],
    answer:
      "Adductor canal block + IPACK + surgical periarticular infiltration — motor-sparing multimodal regional plan compatible with enhanced recovery.",
    cites: ["BJA Educ 2018", "Ellis & Feldman Ch.8"],
  },
  ThoracicAnatomyTopic: {
    title: "Regional analgesia for a unilateral thoracotomy",
    scenario:
      "A patient for right open thoracotomy (T5–T9 incision) refuses thoracic epidural. Which fascial plane block best matches the dermatomal coverage and what are the trade-offs?",
    steps: [
      "Identify the dermatomes: T5–T9 anterior chest wall via intercostal nerves (ventral rami) plus posterior coverage via dorsal rami",
      "Compare options: paravertebral (covers ventral and dorsal rami, similar efficacy to epidural, lower hypotension); erector spinae plane (ESP) at T5 (covers dorsal and partial ventral rami); serratus anterior (lateral T2–T9, misses posterior incision)",
      "Choose paravertebral catheter at T6 — closest single-shot efficacy to epidural with unilateral sympathetic block only",
      "If anticoagulation precludes paravertebral, choose ESP catheter at T5 — superficial, compressible, similar dermatomal spread",
      "Add multimodal: paracetamol, NSAID (if renal function allows), intercostal cryoanalgesia if surgeon-led",
    ],
    traps: [
      "Serratus block alone misses posterior thoracotomy pain",
      "Pneumothorax with paravertebral — pre-procedure ultrasound and confirmation of pleural sliding",
      "Bilateral sympathetic block from epidural causing hypotension in single-lung ventilation",
    ],
    answer:
      "Ultrasound-guided paravertebral catheter at T6 (or ESP at T5 if coagulopathic) plus multimodal analgesia.",
    cites: ["BJA Educ 2020 ESP", "BJA Educ 2010 paravertebral"],
  },

  // ---------- Equipment / Monitoring ----------
  ABGAnalyserTopic: {
    title: "Interpreting a discrepant ABG: SaO₂ vs SpO₂",
    scenario:
      "A 60-year-old smoker rescued from a house fire has SpO₂ 99% on 15 L/min but the ABG reports SaO₂ 78%, COHb 22%, MetHb 1%. Explain the discrepancy and management.",
    steps: [
      "Recognise SpO₂ measures the ratio of two wavelengths (660/940 nm) and cannot distinguish HbO₂ from COHb (both absorb similarly at 660 nm) — falsely reassuring",
      "Co-oximetry on the ABG uses ≥4 wavelengths and reports fractional saturations (HbO₂, HHb, COHb, MetHb) — gold standard",
      "Calculate true oxygen content: CaO₂ = (1.34 × Hb × fractional SaO₂) + (0.003 × PaO₂); CO poisoning markedly reduces CaO₂ despite normal PaO₂",
      "Treat with 100% O₂ via tight-fitting reservoir mask (t½ of COHb falls from 320 min to 80 min)",
      "Consider hyperbaric O₂ if COHb >25%, neurological signs, pregnancy, or syncope/seizure",
    ],
    traps: [
      "Trusting SpO₂ in suspected CO or smoke inhalation",
      "Methaemoglobinaemia drives SpO₂ towards 85% regardless of PaO₂ — give methylene blue 1–2 mg/kg",
      "Acid–base interpretation: CO tissue hypoxia produces metabolic acidosis with raised lactate",
    ],
    answer:
      "SpO₂ is falsely normal because COHb absorbs at 660 nm. Co-oximetry reveals 22% COHb. Treat with 100% O₂, escalate to hyperbaric O₂ given exposure and clinical context.",
    cites: ["BJA Educ 2014 CO", "Davis & Kenny Ch.17"],
  },
  PulseOximetryTopic: {
    title: "Troubleshooting a low SpO₂ in theatre",
    scenario:
      "Mid-procedure, the SpO₂ falls from 99% to 86% on FiO₂ 0.5. Capnography trace is normal. List the systematic causes from probe to patient and the next steps.",
    steps: [
      "Probe and signal: check pulsatile waveform, perfusion index, sensor position, nail varnish, motion artefact, ambient light, methylene blue",
      "Patient delivery: confirm FiO₂ delivered (analyser), circuit integrity, endobronchial intubation (auscultate, recheck tube depth), bronchospasm, pneumothorax",
      "Ventilation/perfusion mismatch: atelectasis (recruitment manoeuvre), one-lung position, mucus plug (suction)",
      "Diffusion / shunt: pulmonary oedema, embolism, intracardiac shunt",
      "Dyshaemoglobinaemia: send co-oximetry if COHb/MetHb suspected (SpO₂ ceiling at 85% in metHb)",
    ],
    traps: [
      "Treating low SpO₂ before checking the waveform — non-pulsatile reading is unreliable",
      "Forgetting that SpO₂ lags 20–30 s behind a desaturating event (probe site dependent)",
      "Beer–Lambert assumes only two absorbers — dyes (methylene blue, indocyanine green) cause transient dips",
    ],
    answer:
      "Apply a structured probe-→circuit-→lung-→haemoglobin algorithm. Address the most likely cause (endobronchial intubation, atelectasis) first; escalate FiO₂, recruit, recheck tube depth, exclude pneumothorax.",
    cites: ["AAGBI Monitoring 2015", "BJA Educ 2012 pulse oximetry"],
  },
  DepthOfAnaesthesiaMonitoringTopic: {
    title: "Awareness risk in TIVA with neuromuscular blockade",
    scenario:
      "Propofol/remifentanil TIVA with rocuronium for laparoscopic surgery. BIS reads 62 despite Ce propofol 4 µg/mL. How do you respond and what does NAP5 say?",
    steps: [
      "Confirm BIS signal quality (SQI >80, EMG <40) — high frontalis EMG inflates BIS",
      "Cross-check TCI: pump infusing, IV cannula patent, no extravasation, line connections secure (TIVA disconnects underlie many NAP5 awareness cases)",
      "Deepen anaesthesia: bolus propofol 0.5–1 mg/kg, increase Ce target, consider adding low-dose volatile if available",
      "Document any patient warning signs (lacrimation, sweating, hypertension, tachycardia in absence of stimulus)",
      "NAP5: TIVA with NMB carries the highest awareness risk — use processed EEG and end-of-case debrief; avoid running BIS >60 sustained",
    ],
    traps: [
      "Trusting BIS in ketamine, N₂O or dexmedetomidine anaesthesia — paradoxical readings",
      "Ignoring electrocautery artefact that transiently inflates BIS",
      "Failing to maintain anaesthesia during transfer/induction of paralysis",
    ],
    answer:
      "Check TIVA delivery, deepen anaesthesia to target BIS 40–60, and document. NAP5 mandates depth-of-anaesthesia monitoring when NMB is used with TIVA.",
    cites: ["NAP5 2014", "BJA Educ 2017 depth monitoring"],
  },
  ElectricalSafetyTopic: {
    title: "Microshock risk during central line insertion",
    scenario:
      "A patient with a temporary pacing wire develops VF when a poorly-earthed infusion pump is connected. Explain the mechanism and the safety standards that should have prevented it.",
    steps: [
      "Recognise microshock: very small currents (>100 µA) reaching the myocardium directly via a conductive pathway can trigger VF — far below the macroshock threshold (100 mA)",
      "The pacing wire bypasses the skin's high resistance, eliminating the safety margin of macroshock",
      "Class CF (Cardiac Floating) equipment limits leakage to <10 µA single fault, <50 µA in fault conditions — mandatory for direct cardiac contact",
      "Theatre supply uses an isolated (IT) system with line isolation monitor — single-fault tolerance, no large current return path",
      "Equipotential earthing and regular electrical safety testing prevent leakage currents from summing across devices",
    ],
    traps: [
      "Class B / BF equipment is not safe for direct cardiac contact",
      "RCDs protect against macroshock (mA range) but not microshock",
      "Daisy-chained extension leads defeat isolated supply protection",
    ],
    answer:
      "Microshock via the pacing wire. Use only CF-rated equipment for cardiac connections, maintain isolated theatre supply with line-isolation monitoring, and ensure regular electrical safety testing.",
    cites: ["BJA Educ 2010 electrical safety", "Davis & Kenny Ch.21"],
  },
  TemperatureMeasurementTopic: {
    title: "Choosing a core temperature site for major surgery",
    scenario:
      "A patient for 4-hour open hemicolectomy needs reliable core temperature monitoring per NICE CG65. Compare nasopharyngeal, oesophageal, tympanic and bladder probes.",
    steps: [
      "NICE CG65 requires continuous core temperature monitoring for any procedure >30 min under GA",
      "Distal oesophageal probe (lower third) tracks cardiac/aortic blood temperature accurately — first choice in intubated abdominal surgery",
      "Nasopharyngeal probe approximates brain temperature; risk of epistaxis with coagulopathy",
      "Tympanic infrared is intermittent and operator-dependent — unsuitable for continuous monitoring",
      "Bladder temperature lags during rapid changes (e.g., CPB rewarming) and is unreliable with low urine flow",
    ],
    traps: [
      "Oesophageal probe in the upper third reads cooler due to airway gas — must be in the distal third",
      "Skin temperature is not core — useful only for gradient monitoring",
      "Forced-air warmer set to default 38 °C without monitoring risks hyperthermia",
    ],
    answer:
      "Use a distal oesophageal probe with continuous display, target core 36.5–37.5 °C, pre-warm and forced-air warm intra-operatively per NICE CG65.",
    cites: ["NICE CG65", "BJA Educ 2014 temperature"],
  },
  ClinicalMeasurementTopic: {
    title: "Interpreting a Bland–Altman plot for a new cardiac output monitor",
    scenario:
      "A new pulse-contour device is compared to thermodilution in 50 patients. Bland–Altman shows bias +0.4 L/min, 95% limits of agreement ±1.8 L/min, percentage error 38%. Should it replace thermodilution?",
    steps: [
      "Distinguish bias (mean difference) from precision (SD of differences) — bias is correctable, precision is not",
      "Critchley & Critchley: a new CO method is acceptable if percentage error ≤30% versus reference",
      "Compute: (1.96 × SD) / mean CO × 100 = percentage error — here 38% exceeds the threshold",
      "Bland–Altman plot detects proportional bias (slope) and outliers that correlation coefficients hide",
      "Reject as a one-to-one replacement; may still be useful for trending if concordance >92%",
    ],
    traps: [
      "Using Pearson r to validate agreement — r measures association, not agreement",
      "Ignoring the reference's own precision (~20% for bolus thermodilution)",
      "Extrapolating beyond the studied CO range",
    ],
    answer:
      "Percentage error 38% > 30% — fails Critchley criteria for interchangeability. May be acceptable for trend monitoring only.",
    cites: ["Critchley & Critchley 1999", "BJA Educ 2010 statistics"],
  },
  EquipmentMonitoringTopic: {
    title: "Capnography trace diagnosis in theatre",
    scenario:
      "During laparoscopic cholecystectomy the capnogram shows a sudden drop in ETCO₂ from 38 to 12 mmHg with stable SpO₂. Walk through the differential and management.",
    steps: [
      "Recognise the pattern: sudden ETCO₂ drop = reduced delivery of CO₂ to alveoli — circulation or circuit problem",
      "Circuit: disconnection, sampling line leak, oesophageal intubation (usually no trace at all), kinked tube — inspect connections and waveform",
      "Circulation: cardiac arrest, massive PE (including CO₂ embolism during laparoscopy), severe hypotension",
      "Suspect CO₂ embolism: stop insufflation, release pneumoperitoneum, place left lateral head-down (Durant), 100% O₂, aspirate via CVC",
      "If cardiac arrest, start ALS; rising ETCO₂ during CPR (>10 mmHg) indicates adequate compressions and possible ROSC",
    ],
    traps: [
      "Confusing a leak (gradual decline) with embolism (abrupt fall)",
      "Falsely reassuring SpO₂ that lags 20–30 s behind the event",
      "Failing to recognise the diagnostic waveform shapes (curare cleft, obstructive 'shark fin', cardiogenic oscillations)",
    ],
    answer:
      "Sudden ETCO₂ drop with laparoscopy → high suspicion of CO₂ embolism. Stop insufflation, desufflate, head-down left lateral, 100% O₂, supportive ALS.",
    cites: ["BJA Educ 2017 capnography", "AAGBI Monitoring 2015"],
  },
  VascularAccessDevicesTopic: {
    title: "Choosing vascular access for prolonged chemotherapy",
    scenario:
      "A 55-year-old needs 6 months of cyclical chemotherapy with intermittent blood sampling. Compare PICC, tunnelled cuffed Hickman, and a totally implantable port — which is best?",
    steps: [
      "Map the requirement: intermittent (not continuous), 6 months, vesicant drug, home discharge",
      "PICC: easy bedside insertion, high thrombosis rate (5–10%), unsuitable for swimming/showering long-term",
      "Tunnelled cuffed Hickman: external lumens, requires regular flushing and dressing; better for continuous infusion (TPN, induction chemo)",
      "Totally implantable port: subcutaneous reservoir accessed by Huber needle, low infection rate (<0.2 per 1000 catheter-days), allows normal activity — best for intermittent long-term therapy",
      "Insert under ultrasound guidance, confirm tip at cavo-atrial junction by fluoroscopy or ECG (P-wave maximal then biphasic)",
    ],
    traps: [
      "Avoid subclavian approach with low platelets (non-compressible)",
      "PICC in lymphoedema-risk arm or planned AV fistula side",
      "Pinch-off syndrome with subclavian ports between clavicle and first rib",
    ],
    answer:
      "Implantable port (e.g., Port-a-Cath) — lowest infection risk and best quality of life for cyclical 6-month therapy.",
    cites: ["EPIC3 2014", "BJA Educ 2016 vascular access"],
  },

  // ---------- ICU ----------
  AntimicrobialsPharmTopic: {
    title: "Dosing meropenem in septic AKI on CVVHDF",
    scenario:
      "A septic patient with AKI is on CVVHDF (effluent 25 mL/kg/h). The team asks how to dose meropenem to balance efficacy (T>MIC) and toxicity.",
    steps: [
      "Recall that meropenem is a time-dependent β-lactam — efficacy correlates with fT>MIC (>40–70% of dosing interval)",
      "CVVHDF removes drug substantially (sieving coefficient ~1, low protein binding) — under-dosing risk",
      "Loading dose 1 g IV regardless of renal function to reach Cmax early",
      "Maintenance 1 g 8-hourly as extended (3 h) or continuous infusion to maximise T>MIC at higher MIC organisms (Pseudomonas)",
      "Therapeutic drug monitoring if available; aim trough 2–4× MIC; reassess as renal function recovers",
    ],
    traps: [
      "Renal-dose adjustment based on creatinine clearance in AKI — overestimates clearance",
      "Bolus dosing in resistant gram-negative sepsis — inadequate fT>MIC",
      "Forgetting nephrotoxic interactions (vancomycin + aminoglycosides) potentiated in AKI",
    ],
    answer:
      "1 g loading then 1 g 8-hourly by extended infusion on CVVHDF, with TDM if available. Do not reduce dose for AKI on full-dose CVVHDF.",
    cites: ["SCCM/IDSA Sepsis 2021", "BJA Educ 2019 antimicrobials"],
  },

  // ---------- Perioperative ----------
  BariatricAnaesthesiaTopic: {
    title: "Drug dosing in the morbidly obese patient",
    scenario:
      "A 145 kg (BMI 48) woman for laparoscopic sleeve gastrectomy. Calculate induction doses for propofol, fentanyl, rocuronium and suxamethonium, and explain the scalar used for each.",
    steps: [
      "Compute weights: TBW 145, IBW ≈ 60 kg (female), LBW ≈ 75 kg (Janmahasatian), ABW = IBW + 0.4(TBW−IBW) ≈ 94 kg",
      "Propofol induction by LBW (reduces overdose); maintenance by ABW",
      "Fentanyl by LBW (lipophilic but distribution well predicted by LBW)",
      "Rocuronium by IBW (hydrophilic, distributes to lean mass) — TBW dosing prolongs duration",
      "Suxamethonium by TBW (increased pseudocholinesterase and ECF in obesity) — full 1.5 mg/kg of TBW",
    ],
    traps: [
      "Using TBW for rocuronium → markedly prolonged paralysis",
      "Under-dosing suxamethonium → inadequate intubating conditions",
      "Ramped position not used → failed mask ventilation and intubation",
    ],
    answer:
      "Propofol/LBW (~150 mg), fentanyl/LBW, rocuronium/IBW (~60 mg), suxamethonium/TBW (~220 mg). Position ramped, pre-oxygenate with CPAP/PEEP.",
    cites: ["AAGBI Obesity 2015", "BJA Educ 2014 bariatric"],
  },
  CardiovascularDiseaseTopic: {
    title: "Perioperative β-blocker decision",
    scenario:
      "A 68-year-old for elective AAA repair is not on a β-blocker. He has stable angina, LVEF 55%, no heart failure. Should you start one preoperatively?",
    steps: [
      "Risk-stratify: vascular surgery is high-risk; he has known IHD (RCRI ≥2)",
      "Recall POISE-1: peri-operative metoprolol started on the day of surgery reduced MI but increased stroke and total mortality (NNH for death 167)",
      "Current ESC/AHA: do NOT initiate β-blockers within 24 h of non-cardiac surgery; continue chronic β-blockers; consider starting ≥7 days in advance with titration if indicated",
      "Optimise alternative cardiac protection: statin, aspirin per surgeon, treat anaemia, plan invasive arterial monitoring and goal-directed haemodynamic care",
      "Document discussion and shared decision-making",
    ],
    traps: [
      "Initiating high-dose β-blockade on the morning of surgery (POISE) — hypotension and stroke",
      "Stopping chronic β-blockers perioperatively — rebound tachycardia and ischaemia",
      "Confusing RCRI with the Revised Cardiac Risk Index — verify the calculator",
    ],
    answer:
      "Do not start a β-blocker acutely; refer to cardiology for elective ≥7-day titration if indicated. Continue statins, ensure haemoglobin optimisation, and use goal-directed intra-operative haemodynamic monitoring.",
    cites: ["POISE 2008", "ESC/ESA 2022 non-cardiac"],
  },
  ElderlyAnaesthesiaTopic: {
    title: "Preventing postoperative delirium in an 85-year-old",
    scenario:
      "An 85-year-old with mild cognitive impairment is for fractured-NOF repair. Build an evidence-based perioperative bundle to reduce postoperative delirium.",
    steps: [
      "Preoperative: orientation aids (glasses, hearing aids), AMTS baseline, hydration, screen and treat anaemia, review benzodiazepines/anticholinergics",
      "Anaesthetic technique: regional (spinal or fascia-iliaca) where feasible; if GA, use depth monitoring to avoid burst suppression (BIS 40–60) — ENGAGES showed depth-targeted GA did not reduce delirium but very deep anaesthesia increases risk",
      "Avoid deliriogenic drugs: benzodiazepines, pethidine, anticholinergics (atropine over glycopyrrolate); favour paracetamol-based multimodal analgesia",
      "Postoperative: HELP bundle (Hospital Elder Life Program) — re-orientation, early mobilisation, sleep hygiene, daily delirium screen with 4AT",
      "Treat reversible causes promptly: pain, hypoxia, sepsis, urinary retention, constipation, electrolyte disturbance",
    ],
    traps: [
      "Equating sedation with anaesthesia — over-sedation worsens delirium",
      "Withholding analgesia for fear of delirium — under-treated pain is itself a strong precipitant",
      "Using haloperidol routinely for prevention (not evidence-based)",
    ],
    answer:
      "Multimodal bundle: fascia-iliaca block, neuraxial where suitable, depth-monitored light GA if needed, avoid deliriogenic drugs, HELP bundle and 4AT screening post-op.",
    cites: ["NICE CG103 delirium", "ENGAGES 2019", "BJA Educ 2018 delirium"],
  },
  EmergencySurgeryTopic: {
    title: "NELA-aligned care of perforated diverticulitis",
    scenario:
      "A 76-year-old with perforated diverticulitis and septic shock requires emergency laparotomy. Outline the NELA bundle from decision to operate to post-op disposition.",
    steps: [
      "Surgeon-anaesthetist-radiologist huddle within 2 h of CT diagnosis; calculate P-POSSUM and NELA risk score",
      "Pre-op: blood cultures + antibiotics within 1 h, IV crystalloid 30 mL/kg if hypoperfused, lactate trend, prepare blood products, mark patient",
      "Consultant anaesthetist and surgeon present for risk ≥5%; theatre target within 6 h",
      "Intra-op: invasive monitoring, cardiac output monitoring for fluid responsiveness, lung-protective ventilation, normothermia, vasopressor as needed",
      "Postoperative: critical care admission for risk ≥10% or organ support; structured handover; daily multidisciplinary review",
    ],
    traps: [
      "Delaying surgery for 'optimisation' in septic shock — source control is the priority",
      "Restrictive fluid strategy in hypovolaemic patient before sepsis is controlled",
      "Failing to document NELA risk and consultant presence (audit requirement)",
    ],
    answer:
      "Apply the NELA bundle: rapid source control, sepsis-6 within 1 h, consultant-delivered care, ITU disposition. Documented risk score and time-to-theatre.",
    cites: ["NELA 2023 report", "BJA Educ 2019 emergency laparotomy"],
  },
  EndOfLifeCommunicationTopic: {
    title: "Family conference about withdrawal of life-sustaining treatment",
    scenario:
      "An 82-year-old with anoxic brain injury after cardiac arrest meets criteria for poor prognosis at 72 h. Plan a family meeting for shared decision-making about WLST.",
    steps: [
      "Prepare: review prognostic markers (motor response ≤2, bilateral absent SSEP N20, EEG burst-suppression, NSE), consensus among ICU team and neurology, private room",
      "Use SPIKES: Setting, Perception, Invitation, Knowledge, Empathy, Strategy/Summary",
      "Frame decisions around the patient's previously expressed values and any advance care planning documents",
      "Offer time, second opinions, and chaplaincy; document Mental Capacity Act 2005 best-interests rationale and Court of Protection escalation if dispute persists",
      "Plan transition: palliative extubation pathway, family presence, anticipatory medication (opioid + benzodiazepine + antimuscarinic), bereavement support",
    ],
    traps: [
      "Premature prognostication <72 h post-TTM (sedation, hypothermia confound exam)",
      "Asking the family to 'decide' rather than guiding a best-interests decision",
      "Withdrawing without symptom-management plan — distress to family and staff",
    ],
    answer:
      "Structured SPIKES-based meeting after multimodal prognostication ≥72 h, best-interests framework under MCA 2005, with a clear palliative extubation and bereavement plan.",
    cites: ["GMC End of Life 2010", "FICM Care at End of Life 2019"],
  },
  EndocrineDiseaseTopic: {
    title: "Perioperative management of an insulin-dependent diabetic for major surgery",
    scenario:
      "A 60-year-old with T1DM on basal-bolus insulin is first on the list for a 4-h Whipple procedure. Plan his peri-operative glycaemic strategy.",
    steps: [
      "Pre-op: HbA1c if not within 3 months (target <69 mmol/mol), continue long-acting basal at 80% night before, omit short-acting on the morning",
      "Schedule first on list, start variable-rate insulin infusion (VRII) with 0.45% saline + 5% glucose + 0.15% KCl when missed >1 meal",
      "Intra-op: capillary or arterial glucose hourly, target 6–10 mmol/L (acceptable up to 12), adjust VRII per NHS England/JBDS algorithm",
      "Maintain basal insulin alongside VRII (overlap to prevent DKA in T1DM — never stop basal completely)",
      "Post-op: restart subcutaneous regimen once eating and drinking with 30-min overlap before stopping VRII",
    ],
    traps: [
      "Stopping all insulin in T1DM perioperatively → DKA within hours",
      "Sliding-scale insulin without dextrose → hypoglycaemia",
      "Treating stress hyperglycaemia with aggressive insulin → hypoglycaemia + variability",
    ],
    answer:
      "Continue basal insulin, omit prandial, start VRII with glucose/saline/KCl, hourly glucose monitoring, restart SC regimen with overlap when eating.",
    cites: ["JBDS Perioperative Diabetes 2022", "BJA Educ 2017 diabetes"],
  },
  EnhancedRecoveryTopic: {
    title: "ERAS pathway for elective colorectal resection",
    scenario:
      "A 65-year-old for elective laparoscopic right hemicolectomy. Outline the key ERAS elements from pre-admission to discharge that you control as anaesthetist.",
    steps: [
      "Pre-op: pre-habilitation, treat anaemia (IV iron), carbohydrate drink up to 2 h pre-op, avoid mechanical bowel prep, no premed sedation",
      "Intra-op: short-acting agents, opioid-sparing (TAP block or epidural for open, IV lidocaine infusion for laparoscopic), goal-directed fluids (avoid >2 L crystalloid), normothermia, PONV prophylaxis (≥2 agents)",
      "Avoid routine drains and NG tubes; remove urinary catheter early",
      "Post-op: multimodal analgesia (paracetamol + NSAID + LA infiltration), early oral intake, mobilise day 0",
      "Audit: discharge by day 3–4; readmission monitored",
    ],
    traps: [
      "Liberal fluid administration causing bowel oedema and ileus",
      "Opioid-heavy analgesia delaying gut function",
      "Hypothermia (<36 °C) tripling wound infection risk",
    ],
    answer:
      "Apply the ERAS bundle: carb loading, opioid-sparing analgesia, goal-directed fluids, normothermia, early feeding and mobilisation.",
    cites: ["ERAS Society Colorectal 2018", "BJA Educ 2017 ERAS"],
  },
  NeurologicalDiseaseTopic: {
    title: "Anaesthesia for a patient with myasthenia gravis",
    scenario:
      "A 45-year-old with generalised MG on pyridostigmine and prednisolone is for thymectomy. Plan induction, neuromuscular management and post-op disposition.",
    steps: [
      "Pre-op: optimise MG (plasma exchange or IVIG if bulbar/respiratory weakness), continue pyridostigmine (omit morning dose to reduce secretions and unpredictable NMJ response), steroid cover",
      "Predict difficult ventilation post-op: vital capacity <2.9 L, disease >6 y, pyridostigmine >750 mg/day, COPD (Leventhal score)",
      "Induction with TIVA (propofol + remifentanil) — avoids volatile-potentiated weakness",
      "Avoid or markedly reduce non-depolarising NMB (sensitive — give 10–20% of normal dose, monitor TOF); suxamethonium is resistant (use 1.5–2 mg/kg) but recovery normal",
      "Sugammadex preferred for reversal of rocuronium; plan elective post-op critical care for ventilatory observation",
    ],
    traps: [
      "Neostigmine reversal can precipitate cholinergic crisis in pyridostigmine-treated patients",
      "Aminoglycosides, magnesium and high-dose steroids worsen weakness",
      "Mistaking myasthenic crisis (weakness improved by edrophonium) for cholinergic crisis (weakness worsened)",
    ],
    answer:
      "TIVA, minimise non-depolarising NMB with TOF monitoring, sugammadex reversal, elective post-op HDU/ICU and continuation of immunosuppression.",
    cites: ["BJA Educ 2011 myasthenia", "Stoelting Co-existing Disease Ch.30"],
  },
  NonTechnicalSkillsTopic: {
    title: "Applying ANTS in a 'can't intubate, can't oxygenate' scenario",
    scenario:
      "During induction you encounter CICO. Describe how the Anaesthetists' Non-Technical Skills (ANTS) framework supports management while the DAS algorithm is executed.",
    steps: [
      "Situation awareness: declare 'CICO' aloud, recognise SpO₂ trend, time-stamp events",
      "Decision-making: commit to DAS Plan D (FONA) rather than persistent intubation attempts — avoid task fixation",
      "Team-working: assign explicit roles (airway lead, surgical airway, drugs, runner, scribe), use closed-loop communication, call for senior help early",
      "Task management: prepare FONA kit, ensure adequate paralysis, monitor SpO₂/ETCO₂, plan post-event debrief",
      "Cognitive aids: use the DAS CICO cognitive aid on the wall; rehearse with simulation",
    ],
    traps: [
      "Hierarchy preventing junior team members from speaking up — graded assertiveness (CUS, PACE)",
      "Plan continuation bias — repeated DL attempts after failure",
      "Failing to debrief after the event — second-victim impact and learning loss",
    ],
    answer:
      "Use ANTS categories (situation awareness, decision-making, teamwork, task management) alongside DAS algorithms and cognitive aids to maintain coordinated CICO management and debrief afterwards.",
    cites: ["DAS 2015", "ANTS Framework Univ. Aberdeen", "NAP4 2011"],
  },
  ObstetricAnaesthesiaTopic: {
    title: "Category-1 caesarean section under GA",
    scenario:
      "A G2P1 at 38 weeks with cord prolapse and fetal bradycardia needs immediate delivery. Plan a rapid-sequence GA with awareness mitigation.",
    steps: [
      "Pre-induction in <10 min: 30° left tilt or manual displacement, pre-oxygenate to FeO₂ >0.9 (3 min or 8 vital capacity breaths), aspiration prophylaxis (Na citrate 0.3 M 30 mL ± ranitidine/metoclopramide if time)",
      "RSI with thiopentone 5–7 mg/kg or propofol 2 mg/kg + suxamethonium 1.5 mg/kg (TBW); cricoid pressure (per local policy)",
      "Use videolaryngoscopy first if available (OAA/DAS); have plan B (2nd-generation SAD) and plan C (FONA) ready",
      "Maintain with sevoflurane 1 MAC + 50% N₂O until delivery, then deepen and add opioid; uterotonics: oxytocin 5 IU slow bolus then 30 IU/500 mL infusion (RCOG/MBRRACE)",
      "Awareness mitigation: avoid muscle relaxant overdose without depth monitoring; document ABCDE and post-op visit; NAP5 highlights obstetric GA awareness risk",
    ],
    traps: [
      "Hypotension from aortocaval compression — left tilt mandatory",
      "High-pressure oxytocin bolus causing hypotension/ischaemia — give slowly",
      "Failing to plan extubation: awake, head-up, suction, anti-emetics",
    ],
    answer:
      "Rapid sequence GA with tilt, pre-oxygenation, RSI, videolaryngoscopy, MAC-targeted volatile, careful oxytocin and awareness mitigation per NAP5/OAA.",
    cites: ["OAA/DAS Obstetric Airway 2015", "NAP5 2014", "MBRRACE 2023"],
  },
  OrthopaedicAnaesthesiaTopic: {
    title: "Bone-cement implantation syndrome during hip hemiarthroplasty",
    scenario:
      "During cementation for a hemiarthroplasty in an 85-year-old, BP falls from 130/70 to 60/40 with desaturation. Identify the syndrome, grade it, and manage.",
    steps: [
      "Recognise BCIS: hypoxia, hypotension ± loss of consciousness within minutes of cement insertion; mechanism — embolic, monomer toxicity, complement activation",
      "Grade (AAGBI): 1 (SpO₂ <94% or BP fall >20%), 2 (loss of consciousness), 3 (cardiac arrest)",
      "Pre-cement mitigation: communicate with surgeon, ensure euvolaemia, FiO₂ 1.0, vasopressor (metaraminol/noradrenaline) primed, lavage of femoral canal and retrograde cementation",
      "Intra-event: 100% O₂, IV fluid bolus, vasopressor (noradrenaline preferred for vasoplegia), call for help, consider TOE if available",
      "Post-event: ITU for monitoring; document and audit (RCoA/AAGBI BCIS guidelines)",
    ],
    traps: [
      "Failing to anticipate in high-risk patients (elderly, male, cardiopulmonary disease, intertrochanteric fracture, long stem)",
      "Reversing hypotension with fluid alone — often need pressor",
      "Mis-attributing arrest to PE without considering BCIS",
    ],
    answer:
      "Grade-2 BCIS: 100% O₂, fluid bolus, noradrenaline, surgeon communication and post-op ITU. Pre-empt with lavage, retrograde cementation and vasopressor preparation.",
    cites: ["AAGBI BCIS 2015", "BJA Educ 2014 BCIS"],
  },
  PatientPositioningTopic: {
    title: "Preventing brachial plexus injury in steep Trendelenburg",
    scenario:
      "A patient for robotic prostatectomy will be in 30° head-down lithotomy for 4 hours. List positioning-related injury risks and prevention strategies.",
    steps: [
      "Brachial plexus: arms tucked, shoulders padded, no shoulder braces (compress plexus against clavicle); arm boards <90° abduction, forearm supinated",
      "Eye injury: tape eyelids, protect from pressure; risk of ischaemic optic neuropathy in prolonged head-down — monitor and document",
      "Airway oedema: face/tongue swelling — assess cuff leak before extubation",
      "Pressure injury: gel pads at heels, sacrum, knees; reposition every 2 h if surgery allows",
      "Compartment syndrome (lithotomy): calf compartment pressure rises with steep Trendelenburg + lithotomy >4 h — calf relaxation periods and post-op monitoring",
    ],
    traps: [
      "Shoulder braces causing brachial plexus stretch palsy",
      "Hyperabduction (>90°) of arm boards",
      "Sliding cephalad in steep Trendelenburg — secure with bean-bag or shoulder support across the manubrium (not lateral)",
    ],
    answer:
      "Tuck arms with padding, avoid shoulder braces and >90° abduction, protect eyes, periodic leg release for lithotomy, post-op assessment for compartment syndrome and airway oedema.",
    cites: ["AAGBI Positioning 2021", "BJA Educ 2018 robotic anaesthesia"],
  },
  PreoperativeAssessmentTopic: {
    title: "Functional capacity assessment for major non-cardiac surgery",
    scenario:
      "A 70-year-old smoker for open AAA repair scores 4 METs subjectively. The METS study questions the validity of subjective MET estimation. How do you proceed?",
    steps: [
      "Stratify with RCRI and consider biomarkers (NT-proBNP, hsTnT) — METS study showed these outperform clinician/patient subjective MET estimates",
      "Order CPET if available: VO₂ peak <15 mL/kg/min and AT <11 mL/kg/min predict increased mortality after major surgery",
      "Optimise modifiable risks: smoking cessation (>4 weeks if possible), pre-habilitation, anaemia (IV iron if Hb <130/120), statin and antiplatelet review",
      "Multidisciplinary planning: vascular surgeon, anaesthetist, cardiology if indicated; consent including critical care plan",
      "Document shared decision-making per Centre for Perioperative Care SDM guidance",
    ],
    traps: [
      "Relying solely on subjective METs (METS study limitation)",
      "Stopping antiplatelet without considering coronary stent timing",
      "Delaying surgery in symptomatic AAA pending optimisation",
    ],
    answer:
      "Use objective risk stratification (RCRI, NT-proBNP, CPET) and shared decision-making rather than subjective METs alone; pre-habilitate and plan critical care.",
    cites: ["METS Study 2018 Lancet", "ESC/ESA 2022 non-cardiac", "CPOC SDM 2018"],
  },
  RespiratoryDiseaseTopic: {
    title: "Anaesthesia for severe COPD undergoing thoracic surgery",
    scenario:
      "A 68-year-old with FEV1 35% predicted and pCO₂ 6.8 kPa needs a right upper lobectomy. Plan pre-op assessment and intra-op ventilation strategy.",
    steps: [
      "Pre-op: PFTs (FEV1, DLCO), V/Q split function, exercise testing (6MWT or CPET; VO₂ peak <15 mL/kg/min = high risk), optimise bronchodilators, treat infection, smoking cessation",
      "Calculate predicted post-op FEV1 (ppoFEV1) and ppoDLCO; <40% predicts increased respiratory failure risk",
      "Intra-op: thoracic epidural or paravertebral for analgesia, double-lumen tube with bronchoscopic position check, lung-protective OLV (Vt 4–6 mL/kg ideal body weight, PEEP 5, plateau <25 cmH₂O, permissive hypercapnia)",
      "Manage hypoxia on OLV stepwise: FiO₂, recruit dependent lung, CPAP to non-dependent, intermittent re-inflation, surgical pause if persistent",
      "Post-op: HDU, regional analgesia, early mobilisation, chest physiotherapy, NIV if hypercapnic respiratory failure develops",
    ],
    traps: [
      "Excessive tidal volumes on OLV → acute lung injury (ARDS 4–8% post-pneumonectomy)",
      "Volume overload — restrictive fluid strategy (1–2 mL/kg/h crystalloid)",
      "Failing to plan analgesia for chest drain pain (intercostal block + opioids)",
    ],
    answer:
      "Comprehensive risk assessment with ppoFEV1, multidisciplinary fitness review, lung-protective OLV (Vt 4–6 mL/kg IBW, PEEP, permissive hypercapnia), regional analgesia and HDU recovery.",
    cites: ["BTS 2010 lung resection", "BJA Educ 2017 OLV"],
  },
  VascularAnaesthesiaTopic: {
    title: "Carotid endarterectomy: GA vs regional and neuromonitoring",
    scenario:
      "A 72-year-old with 80% symptomatic carotid stenosis is for CEA. Discuss GA vs cervical plexus block and how you monitor cerebral perfusion during cross-clamping.",
    steps: [
      "GENESIS / GALA trial: no significant difference in stroke/death/MI between GA and regional — choose based on patient preference, surgeon experience, anatomical factors",
      "Regional (superficial ± deep cervical plexus block): awake neurological monitoring is gold standard for shunt need — direct conversation, contralateral grip",
      "If GA, monitor cerebral perfusion: stump pressure (<50 mmHg = shunt), transcranial Doppler (MCA velocity <50% baseline), cerebral oximetry (rSO₂ fall >20%), processed EEG",
      "Maintain MAP within 20% of baseline (or higher per surgical request during clamp), normocapnia, normothermia; treat hypotension with phenylephrine/noradrenaline rather than fluid",
      "Post-op: HDU, monitor for hyperperfusion syndrome (headache, seizure, ICH), tight BP control",
    ],
    traps: [
      "Deep cervical block risks phrenic nerve, intrathecal/intravascular injection — avoid bilateral",
      "Hypotension on clamp release — anticipate and correct",
      "Missing carotid sinus bradycardia — have atropine ready",
    ],
    answer:
      "Either GA with multimodal neuromonitoring or cervical plexus block with awake assessment is acceptable; maintain MAP within 20% baseline and admit to HDU.",
    cites: ["GALA 2008 Lancet", "BJA Educ 2014 CEA"],
  },
  VasoactiveAgentsTopic: {
    title: "Choosing a vasopressor in septic shock",
    scenario:
      "A 55-year-old with septic shock remains hypotensive (MAP 55) after 30 mL/kg crystalloid. Which vasopressor first and what is the evidence?",
    steps: [
      "SSC 2021: noradrenaline is first-line vasopressor — α₁-mediated vasoconstriction with modest β₁ inotropy, lower arrhythmia risk than dopamine (SOAP-II trial)",
      "Add vasopressin 0.03 U/min if MAP <65 despite noradrenaline 0.25–0.5 µg/kg/min — VASST trial reduces noradrenaline requirements",
      "Consider hydrocortisone 200 mg/day if vasopressor-refractory (APROCCHSS, ADRENAL)",
      "Reassess fluid responsiveness dynamically (pulse pressure variation, passive leg raise, cardiac output monitor) before further fluid",
      "Inotrope (dobutamine) if cardiac output low or echo shows myocardial dysfunction",
    ],
    traps: [
      "Dopamine first-line — increases arrhythmias and mortality vs noradrenaline (SOAP-II)",
      "Vasopressin alone in pure vasoplegia without noradrenaline cover — risk of mesenteric/digital ischaemia",
      "Continuing fluid boluses without responsiveness check — fluid overload increases mortality",
    ],
    answer:
      "Start noradrenaline (titrate to MAP 65), add vasopressin if refractory, consider hydrocortisone, and reassess fluid responsiveness rather than empirical boluses.",
    cites: ["Surviving Sepsis Campaign 2021", "SOAP-II 2010 NEJM", "VASST 2008 NEJM"],
  },
};

const KEYS = Object.keys(EX);

function jsxList(items) {
  return items.map((s) => `          <li>${s.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</li>`).join("\n");
}

function buildBlock(name, e) {
  return `const ${name}WorkedExamples: WorkedExample[] = [
  {
    title: ${JSON.stringify(e.title)},
    scenario: ${JSON.stringify(e.scenario)},
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
${jsxList(e.steps)}
        </ol>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
${jsxList(e.traps)}
          </ul>
        </div>
      </div>
    ),
    answer: ${JSON.stringify(e.answer)},
    cites: ${JSON.stringify(e.cites)},
  },
];
`;
}

let updated = 0, skipped = 0, errors = [];

for (const key of KEYS) {
  const file = path.join(ROOT, `${key}.tsx`);
  if (!fs.existsSync(file)) { errors.push(`missing ${file}`); continue; }
  let src = fs.readFileSync(file, "utf8");
  if (src.includes("workedExamples")) { skipped++; continue; }

  // Add WorkedExample import if missing
  if (!src.includes("WorkedExample")) {
    if (src.includes('from "@/components/topic/TopicTemplate"')) {
      src = src.replace(
        /(import\s*{\s*TopicTemplate\s*}\s*from\s*"@\/components\/TopicTemplate";)/,
        `$1\nimport { WorkedExample } from "@/components/topic/WorkedExamples";`
      );
    } else {
      errors.push(`${key}: no TopicTemplate import`);
      continue;
    }
  }

  // Insert const block before component declaration
  const compRegex = new RegExp(`(const ${key}\\s*=\\s*\\(\\s*\\)\\s*=>\\s*{)`);
  const block = buildBlock(key, EX[key]);
  if (compRegex.test(src)) {
    src = src.replace(compRegex, `${block}\n$1`);
  } else {
    errors.push(`${key}: component decl not found`);
    continue;
  }

  // Add prop to TopicTemplate - insert after topicTitle= line
  const propLine = `      workedExamples={${key}WorkedExamples}\n`;
  if (/topicTitle=/.test(src)) {
    src = src.replace(/(\n\s*topicTitle=.*?\n)/, `$1${propLine}`);
  } else if (/<TopicTemplate/.test(src)) {
    src = src.replace(/<TopicTemplate\b/, `<TopicTemplate`);
    src = src.replace(/(<TopicTemplate[^>]*?)(\n)/, `$1${propLine}$2`);
  } else {
    errors.push(`${key}: TopicTemplate JSX not found`);
    continue;
  }

  fs.writeFileSync(file, src);
  updated++;
}

console.log(`Updated: ${updated}, Skipped: ${skipped}, Errors: ${errors.length}`);
errors.forEach((e) => console.error(" -", e));

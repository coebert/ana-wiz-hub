import { Link } from "react-router-dom";
import { NoteLayout } from "./NoteLayout";
import PneumoperitoneumTrendelenburgDiagram from "@/components/diagrams/clinical/PneumoperitoneumTrendelenburgDiagram";
import {
  RoboticVentilationStrategyDiagram,
  CO2AbsorptionDiagram,
  RoboticHaemodynamicsDiagram,
} from "@/components/diagrams/clinical/RoboticSurgeryDiagrams";

const RoboticSurgeryAnaesthesiaNote = () => (
  <NoteLayout
    slug="anaesthesia-for-robotic-surgery-guide"
    title="Anaesthesia for robotic surgery: a practical guide"
    shortTitle="Anaesthesia for robotic surgery"
    description="FRCA-mapped guide to anaesthesia for robotic surgery: physiology of steep Trendelenburg and CO₂ pneumoperitoneum, pharmacology, ventilation, fluids, positioning and emergency undocking."
    datePublished="2026-07-23"
    examTags={["final", "fficm"]}
    lede="Robot-assisted surgery — most commonly da Vinci robotic prostatectomy, hysterectomy and colorectal resections — combines CO₂ pneumoperitoneum, extreme patient positioning (often 30–45° steep Trendelenburg) and a docked robot that makes rapid access to the patient impossible. Safe anaesthesia hinges on anticipating the cardiorespiratory, cerebral, ocular and airway consequences before docking, because after docking almost every problem must be fixed with the patient still tilted and the robot still attached."
    faqs={[
      {
        q: "What are the main physiological changes of steep Trendelenburg with pneumoperitoneum?",
        a: "Raised intrathoracic pressure with reduced FRC and compliance, raised peak airway pressures, cephalad shift of the diaphragm and carina (endobronchial migration risk), raised CVP and PCWP with preserved cardiac output in fit patients, raised intracranial and intraocular pressure, facial and upper-airway oedema, and hypercapnia from CO₂ absorption.",
      },
      {
        q: "How should I ventilate a patient in steep Trendelenburg with pneumoperitoneum?",
        a: "Pressure-controlled or volume-controlled with pressure limit, tidal volumes 6–8 ml/kg predicted body weight, PEEP 5–10 cmH₂O (higher in obese patients), plateau pressure ≤ 30 cmH₂O, and permissive hypercapnia (PaCO₂ up to ~6.5–7 kPa) to avoid harmful driving pressures. Recruitment manoeuvres after desufflation improve postoperative oxygenation.",
      },
      {
        q: "What are the specific complications of robotic surgery I must plan for?",
        a: "Corneal abrasion and postoperative visual loss (ischaemic optic neuropathy), brachial plexus and common peroneal nerve injury from shoulder braces and lithotomy, facial and laryngeal oedema, endobronchial intubation as the carina moves cephalad, gas embolism, subcutaneous emphysema, and inability to convert rapidly — every theatre must rehearse emergency undocking.",
      },
      {
        q: "How do I manage fluids for robotic prostatectomy?",
        a: "Restrictive: 1–2 ml/kg/h maintenance crystalloid until the vesicourethral anastomosis is complete, then liberalise. Excess fluid worsens facial and airway oedema in steep Trendelenburg and obscures the surgical field around the bladder neck. Use vasopressors (phenylephrine or metaraminol) rather than fluid boluses to maintain MAP.",
      },
      {
        q: "Which FRCA curriculum domains does robotic surgery cover?",
        a: "RCoA 2021 Final: General, Urological, and Gynaecological anaesthesia; Perioperative Medicine; Airway Management; Pain. FFICM/FICM 2021: perioperative critical care, respiratory support, and management of the deteriorating perioperative patient. Cross-cuts Primary physiology (respiratory mechanics, CV, cerebral) and pharmacology (TIVA, neuromuscular blockade, vasopressors).",
      },
    ]}
    related={[
      { label: "Laparoscopic surgery — physiology and anaesthesia", to: "/clinical/laparoscopic-surgery" },
      { label: "Patient positioning and nerve injury", to: "/perioperative/patient-positioning" },
      { label: "One-lung ventilation and lung-protective strategy", to: "/clinical/one-lung-ventilation" },
      { label: "TIVA — total intravenous anaesthesia", to: "/clinical/tiva" },
      { label: "Enhanced recovery after surgery", to: "/perioperative/enhanced-recovery" },
    ]}
  >
    <h2>Why robotic surgery is different</h2>
    <p>
      Robotic surgery is not just laparoscopy with better instruments. Three
      features drive every anaesthetic decision: <strong>steep Trendelenburg</strong>{" "}
      (30–45° head-down for pelvic work), <strong>prolonged CO₂ pneumoperitoneum</strong>{" "}
      at 12–15 mmHg for two to four hours, and a <strong>docked robot</strong>{" "}
      that physically blocks access to the head and abdomen. Once the ports
      are inserted and the arms locked, any airway problem, arrhythmia or
      catastrophic bleed requires the surgeon to emergency-undock before you
      can move the patient — a manoeuvre that takes 30–60 seconds even when
      well drilled.
    </p>

    <h2>FRCA curriculum mapping</h2>
    <p>
      This guide is written against the RCoA 2021 curriculum and the
      FICM 2021 CCT in Intensive Care Medicine. Use the mapping below to
      target revision by exam.
    </p>
    <ul>
      <li>
        <strong>FRCA Primary.</strong> Respiratory physiology (FRC, compliance,
        V/Q, dead space), cardiovascular physiology (venous return, CVP, cardiac
        output), cerebral physiology (ICP, CPP), and applied pharmacology of
        propofol, remifentanil, rocuronium/sugammadex and vasopressors.
      </li>
      <li>
        <strong>FRCA Final — General, Urological, Gynaecological, Colorectal.</strong>{" "}
        Anaesthesia for laparoscopic and robot-assisted pelvic and abdominal
        surgery, positioning, complications and enhanced recovery.
      </li>
      <li>
        <strong>FRCA Final — Perioperative Medicine.</strong> Preoperative risk
        stratification for prolonged pneumoperitoneum and steep tilt; ERAS;
        postoperative respiratory failure and delirium.
      </li>
      <li>
        <strong>FRCA Final — Airway.</strong> Facial and laryngeal oedema,
        endobronchial migration, planning extubation in the oedematous airway.
      </li>
      <li>
        <strong>FFICM / EDIC.</strong> Postoperative lung-protective ventilation,
        recognition and management of intra-abdominal hypertension, and
        perioperative complications requiring critical care.
      </li>
    </ul>

    <h2>Applied physiology (Primary + Final)</h2>
    <h3>Respiratory</h3>
    <ul>
      <li>
        Pneumoperitoneum + head-down tilt push the diaphragm cephalad →
        <strong> FRC falls by 20–40%</strong>, closing capacity encroaches on
        tidal breathing, and V/Q mismatch worsens.
      </li>
      <li>
        Compliance falls by 30–50%; peak and plateau pressures rise. Driving
        pressure (Pplat − PEEP) is the ventilator variable most tightly linked
        to postoperative pulmonary complications — keep it &lt; 15 cmH₂O.
      </li>
      <li>
        CO₂ absorption from the peritoneum raises PaCO₂ by 8–10 mmHg within
        15–20 minutes, then plateaus. Minute ventilation typically has to rise
        15–25% to maintain a target ETCO₂.
      </li>
      <li>
        The carina moves 1–3 cm cephalad — a mid-tracheal tube can become
        endobronchial after tilt. Re-auscultate and re-check ETCO₂ trace after
        every position change.
      </li>
    </ul>
    <h3>Cardiovascular</h3>
    <ul>
      <li>
        Intra-abdominal pressure of 12–15 mmHg compresses the IVC → venous
        return initially rises (autotransfusion of splanchnic blood) then falls
        as pressure exceeds venous pressure.
      </li>
      <li>
        Head-down tilt increases venous return and preload. In healthy patients
        cardiac output is preserved or slightly raised; in diastolic
        dysfunction it can precipitate pulmonary oedema.
      </li>
      <li>
        SVR rises from catecholamine release and mechanical aortic compression;
        MAP typically rises 10–20%. CVP and PCWP are unreliable measures of
        preload in this setting.
      </li>
      <li>
        Hypercapnia causes direct myocardial depression offset by sympathetic
        activation — arrhythmias (especially bradycardia on peritoneal
        insufflation from vagal stretch) are common.
      </li>
    </ul>
    <h3>Cerebral, ocular and splanchnic</h3>
    <ul>
      <li>
        ICP rises 10–15 mmHg in steep Trendelenburg from impaired jugular
        venous drainage and hypercapnia. CPP is usually preserved because MAP
        rises in parallel, but avoid in acute intracranial pathology.
      </li>
      <li>
        Intraocular pressure rises by 12–15 mmHg — the mechanism of
        postoperative visual loss (ischaemic optic neuropathy) in prolonged
        cases. Limit case duration and avoid hypotension.
      </li>
      <li>
        Splanchnic and renal blood flow fall; urine output is a poor guide to
        volume status intraoperatively and typically recovers on desufflation.
      </li>
    </ul>

    <h2>Applied pharmacology (Primary + Final)</h2>
    <ul>
      <li>
        <strong>Induction and maintenance.</strong>{" "}
        <Link to="/clinical/tiva">TIVA with propofol and remifentanil</Link>{" "}
        is favoured — reduced PONV, obtunds the pressor response, and rapid
        offset for a clean neurological assessment. Volatile agents are
        acceptable; avoid nitrous oxide (bowel distension, gas-space
        expansion).
      </li>
      <li>
        <strong>Neuromuscular blockade.</strong> Deep block (PTC 1–2)
        throughout — patient movement with the robot docked risks visceral
        injury. Rocuronium with quantitative train-of-four monitoring;
        sugammadex 2–4 mg/kg for reliable reversal. TOF ratio ≥ 0.9 before
        extubation.
      </li>
      <li>
        <strong>Vasoactive drugs.</strong> Low-dose noradrenaline (0.02–0.1
        µg/kg/min) or intermittent metaraminol/phenylephrine to maintain MAP
        &gt; 65 mmHg without volume loading. Glycopyrrolate for
        insufflation-related bradycardia.
      </li>
      <li>
        <strong>Analgesia.</strong> Multimodal: paracetamol, an NSAID unless
        contraindicated, low-dose intraoperative opioid (fentanyl 1–2 µg/kg or
        remifentanil TCI), local infiltration to port sites, and consider
        rectus-sheath or TAP blocks if converted to open.
      </li>
      <li>
        <strong>Antiemetics.</strong> Dexamethasone 4–8 mg at induction and
        ondansetron 4 mg towards the end — pelvic surgery, female sex and
        opioid exposure make PONV highly likely.
      </li>
    </ul>

    <h2>Practical perioperative considerations</h2>
    <h3>Preoperative</h3>
    <ul>
      <li>
        <strong>Cardiorespiratory reserve.</strong> Raised intrathoracic
        pressure and hypercapnia are poorly tolerated in severe COPD, pulmonary
        hypertension, and HFrEF. CPET or functional capacity assessment for
        borderline cases.
      </li>
      <li>
        <strong>Raised ICP or intraocular pressure.</strong> Recent stroke,
        untreated glaucoma and space-occupying lesions are relative
        contraindications to steep Trendelenburg.
      </li>
      <li>
        <strong>Obesity and difficult airway.</strong> BMI &gt; 40 markedly
        raises peak airway pressures and facial oedema; the postoperative
        airway may not be the airway you intubated.
      </li>
      <li>
        <strong>Bloods.</strong> Group-and-save minimum; cross-match for
        cystectomy and complex colorectal work. Baseline U&amp;E and lactate.
      </li>
      <li>
        <strong>Consent and WHO checklist.</strong> Specific mention of
        positioning injuries, corneal abrasion, POVL, conversion to open, and
        VTE risk.
      </li>
    </ul>
    <h3>Positioning and pressure-area care</h3>
    <p>
      Position everything before docking, because you cannot reposition after.
      Standard package for robotic prostatectomy:
    </p>
    <ul>
      <li>Arms tucked and padded at the sides (never abducted &gt; 90°).</li>
      <li>Shoulder braces avoided where possible — they cause brachial plexus injury; use a non-slip gel mattress or bean-bag instead.</li>
      <li>Legs in low lithotomy with heels supported and knees bent to 90–120° — common peroneal nerve at the fibular head is the classic injury.</li>
      <li>Eyes taped and protected; consider a clear face shield to prevent instrument or facial-oedema pressure.</li>
      <li>Bite block to prevent tongue trauma if the patient bites down during emergence.</li>
      <li>Head neutral, well-padded, and secured against sliding. Perform a tilt test before draping.</li>
    </ul>
    <h3>Intraoperative — airway and ventilation</h3>
    <p>
      Cuffed oral endotracheal tube — never an LMA — because peak airway
      pressures routinely exceed 30 cmH₂O and gastric insufflation is
      unacceptable. Re-check tube position after tilt: the carina moves
      cephalad and endobronchial migration is common. See{" "}
      <Link to="/physics/capnography">capnography</Link> for interpreting the
      hypercapnic waveform and{" "}
      <Link to="/clinical/one-lung-ventilation">lung-protective ventilation</Link>{" "}
      for the driving-pressure rationale.
    </p>
    <ul>
      <li>Tidal volume 6–8 ml/kg predicted body weight, PEEP 5–10 cmH₂O (10–15 in obese).</li>
      <li>Plateau pressure ≤ 30 cmH₂O, driving pressure &lt; 15 cmH₂O.</li>
      <li>Permissive hypercapnia to PaCO₂ 6.5–7 kPa if needed.</li>
      <li>Recruitment manoeuvre after desufflation, then maintain PEEP until extubation.</li>
    </ul>
    <h3>Intraoperative — cardiovascular and fluids</h3>
    <p>
      Expect a rise in CVP and PCWP that does <em>not</em> reflect true
      preload — hydrostatic transmission from the raised intrathoracic
      pressure and gravity. In healthy patients cardiac output is preserved.
      In patients with impaired ventricles, run a low-dose noradrenaline or
      metaraminol infusion rather than chasing MAP with fluid, and cap
      intraoperative crystalloid at 1–2 ml/kg/h until desufflation. Liberalise
      after the anastomosis is complete.
    </p>
    <h3>Postoperative and emergence</h3>
    <ul>
      <li>Reverse tilt fully and keep the patient head-up for 5–10 min to allow facial and airway oedema to redistribute before extubation.</li>
      <li>Confirm TOF ≥ 0.9, adequate tidal volume, and airway leak (cuff-leak test) if prolonged tilt or obese.</li>
      <li>Extubate awake, sitting up; have a videolaryngoscope and reintubation plan immediately available.</li>
      <li>Analgesia: multimodal as above. Opioid requirements are usually modest.</li>
      <li>PONV prophylaxis with at least two agents — see the <Link to="/notes/apfel-score-ponv-risk">Apfel score note</Link>.</li>
      <li>ERAS pathway: early mobilisation, early oral intake, urinary catheter management per surgical protocol.</li>
    </ul>

    <h2>Specific complications and how to plan for them</h2>
    <ul>
      <li><strong>Corneal abrasion</strong> — eye tape + shield; check at end of case.</li>
      <li><strong>Postoperative visual loss (ION)</strong> — limit tilt duration, avoid hypotension, maintain haematocrit.</li>
      <li><strong>Brachial plexus / common peroneal / ulnar nerve injury</strong> — meticulous positioning, avoid shoulder braces.</li>
      <li><strong>Facial and laryngeal oedema</strong> — cuff-leak test, delayed extubation if any doubt.</li>
      <li><strong>Endobronchial intubation</strong> — re-auscultate after tilt.</li>
      <li><strong>CO₂ gas embolism</strong> — sudden fall in ETCO₂, hypotension, mill-wheel murmur; stop insufflation, 100% O₂, left lateral head-down, aspirate from CVC if in situ.</li>
      <li><strong>Subcutaneous emphysema and pneumothorax</strong> — palpate chest wall and neck; check ETCO₂ trend and airway pressures.</li>
      <li><strong>Vascular injury</strong> — rare but catastrophic; call for blood early, activate major haemorrhage protocol, prepare for emergency undocking.</li>
    </ul>

    <h2>Emergency undocking</h2>
    <p>
      Every robotic theatre must display an <strong>emergency undocking
      checklist</strong> and rehearse it. Indications: cardiac arrest,
      catastrophic haemorrhage requiring open conversion, airway loss, and
      malignant hyperthermia. Roles are pre-assigned: surgeon undocks the
      arms and removes trocars, anaesthetist manages the airway and
      circulation, scrub team flattens the table and reverses Trendelenburg,
      and the runner calls for help. Target time from decision to
      supine-and-accessible &lt; 60 seconds.
    </p>

    <h2>Key learning points</h2>
    <ul>
      <li>Three-hit physiology: CO₂ pneumoperitoneum, steep Trendelenburg, docked robot.</li>
      <li>Lung-protective ventilation with driving pressure &lt; 15 cmH₂O; permissive hypercapnia is safe.</li>
      <li>Restrictive fluids + vasopressor-first haemodynamic strategy until desufflation.</li>
      <li>Deep neuromuscular blockade throughout with quantitative monitoring and full reversal.</li>
      <li>Position for the whole case before docking; the peroneal nerve, brachial plexus, eyes and airway are the high-cost injuries.</li>
      <li>Every team must rehearse emergency undocking to &lt; 60 s.</li>
    </ul>
  </NoteLayout>
);

export default RoboticSurgeryAnaesthesiaNote;

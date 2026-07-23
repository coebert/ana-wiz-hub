import { Link } from "react-router-dom";
import { NoteLayout } from "./NoteLayout";

const RoboticSurgeryAnaesthesiaNote = () => (
  <NoteLayout
    slug="anaesthesia-for-robotic-surgery-guide"
    title="Anaesthesia for robotic surgery: a practical guide"
    shortTitle="Anaesthesia for robotic surgery"
    description="Anaesthesia for robotic surgery: positioning, pneumoperitoneum and steep Trendelenburg physiology, ventilation strategy, fluids, and specific complications."
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

    <h2>Preoperative assessment</h2>
    <ul>
      <li>
        <strong>Cardiorespiratory reserve.</strong> Raised intrathoracic
        pressure and hypercapnia are poorly tolerated in severe COPD, pulmonary
        hypertension, and heart failure with reduced ejection fraction.
      </li>
      <li>
        <strong>Raised ICP or intraocular pressure.</strong> Recent stroke,
        untreated glaucoma and space-occupying lesions are relative
        contraindications to steep Trendelenburg.
      </li>
      <li>
        <strong>Obesity and difficult airway.</strong> BMI &gt; 40 markedly
        raises peak airway pressures and facial oedema; assess for the
        possibility of a postoperative airway that is no longer the airway you
        intubated.
      </li>
      <li>
        <strong>Duration and blood loss.</strong> Group-and-save minimum;
        cross-match for cystectomy and complex colorectal work.
      </li>
    </ul>

    <h2>Positioning and pressure-area care</h2>
    <p>
      Position everything before docking, because you cannot reposition after.
      Standard package for robotic prostatectomy:
    </p>
    <ul>
      <li>Arms tucked and padded at the sides (never abducted &gt; 90°).</li>
      <li>Shoulder braces avoided where possible — they cause brachial plexus injury; use a non-slip gel mattress or bean-bag instead.</li>
      <li>Legs in low lithotomy with heels supported and knees bent to 90–120°.</li>
      <li>Eyes taped and protected; consider a clear face shield to prevent instrument or facial-oedema pressure.</li>
      <li>Bite block to prevent tongue trauma if the patient bites down during emergence.</li>
      <li>Head neutral, well-padded, and secured against sliding.</li>
    </ul>

    <h2>Airway and ventilation</h2>
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

    <h2>Cardiovascular management</h2>
    <p>
      Expect a rise in CVP and PCWP that does <em>not</em> reflect true
      preload — hydrostatic transmission from the raised intrathoracic
      pressure and gravity. In healthy patients cardiac output is preserved.
      In patients with impaired ventricles, run a low-dose noradrenaline or
      metaraminol infusion rather than chasing MAP with fluid, and cap
      intraoperative crystalloid at 1–2 ml/kg/h until desufflation.
    </p>

    <h2>Analgesia and emergence</h2>
    <ul>
      <li>Multimodal: paracetamol, an NSAID unless contraindicated, and a low-dose intraoperative opioid.</li>
      <li>Local anaesthetic wound infiltration at port sites; consider TAP or rectus-sheath blocks for open conversion.</li>
      <li>PONV prophylaxis with at least two agents — see the <Link to="/notes/apfel-score-ponv-risk">Apfel score note</Link>.</li>
      <li>Extubate awake, sitting up, with the head-down tilt fully reversed for at least 5–10 minutes to allow facial and airway oedema to redistribute.</li>
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
  </NoteLayout>
);

export default RoboticSurgeryAnaesthesiaNote;

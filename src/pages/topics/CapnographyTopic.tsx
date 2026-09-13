import { Helmet } from "react-helmet-async";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { Exam } from "@/data/curriculum";
import { ExamSection } from "@/components/exam/ExamSection";
import { capnographyQuiz } from "@/data/quizzes";
import type { WorkedExample } from "@/components/topic/WorkedExamples";
import CapnographyWaveformDiagram from "@/components/diagrams/physics/CapnographyWaveformDiagram";
import { InlineRef } from "@/components/references/InlineRef";

const capnographyFaqs: Array<[string, string]> = [
  [
    "What is the normal ETCO₂ range?",
    "In a healthy ventilated adult the normal end-tidal CO₂ (ETCO₂) range is 4.5–6.0 kPa (35–45 mmHg). ETCO₂ typically sits 0.3–0.7 kPa (2–5 mmHg) below the arterial PaCO₂ because of alveolar dead-space dilution; this PaCO₂–ETCO₂ gradient widens with pulmonary embolism, low cardiac output, COPD/ARDS and high airway pressures.",
  ],
  [
    "What are the four phases of a normal capnography waveform?",
    "Phase I (expiratory baseline, CO₂-free gas from the apparatus and anatomical dead space, value 0). Phase II (expiratory upstroke, rapid rise as alveolar gas reaches the sensor). Phase III (alveolar plateau, gently rising; the value at its end is ETCO₂). Phase 0 (inspiratory downstroke back to baseline). The alpha angle (II–III) is normally ~100–110° and widens with airflow obstruction (shark-fin); the beta angle (III–0) is ~90° and widens with rebreathing.",
  ],
  [
    "What does a shark-fin capnography waveform mean?",
    "A shark-fin (sloped) trace reflects prolonged, uneven alveolar emptying — the alpha angle becomes obtuse and the plateau slopes upward. It indicates expiratory airflow obstruction: acute severe asthma, COPD exacerbation, anaphylaxis, kinked tracheal tube or partial circuit obstruction. Anaphylaxis is a key perioperative cause: NAP6 found bronchospasm and reduced or absent end-tidal CO₂ among the commonest features, so anaphylaxis can present either as a shark-fin obstructive trace or as sudden loss of the trace with cardiovascular collapse and PEA arrest. Treat the cause; do not increase ventilator rate before addressing obstruction or you will generate auto-PEEP.",
  ],
  [
    "What is a curare cleft on capnography?",
    "A curare cleft is a downward notch in the middle of the alveolar plateau (phase III) caused by a spontaneous diaphragmatic effort against a partly paralysed patient on controlled ventilation — neuromuscular blockade is wearing off. Confirm with quantitative neuromuscular monitoring (TOF ratio) and top up the relaxant or wake and reverse, depending on the stage of surgery.",
  ],
  [
    "Why is ETCO₂ used during CPR?",
    "ETCO₂ reflects pulmonary blood flow during cardiac arrest, so it is a real-time index of chest-compression effectiveness and ROSC. RCUK/ERC guidance: aim for ETCO₂ > 1.3 kPa (10 mmHg) during good-quality CPR; a persistent ETCO₂ < 1.3 kPa after 20 minutes of advanced life support is associated with very low likelihood of survival. A sudden rise in ETCO₂ is one of the earliest signs of ROSC.",
  ],
  [
    "Why does ETCO₂ underestimate PaCO₂?",
    "ETCO₂ samples mixed alveolar gas, which is diluted by alveolar dead space (well-ventilated, poorly perfused units). In healthy lungs the PaCO₂–ETCO₂ gradient is ~0.5 kPa (4 mmHg). The gradient widens whenever alveolar dead space rises — pulmonary embolism (early sign), low cardiac output, COPD, ARDS, auto-PEEP and arrest (where ETCO₂ approaches zero despite a preserved PaCO₂).",
  ],
];


/**
 * Standalone FRCA Primary / Final / FFICM topic page for Capnography.
 * Extracted from the combined Pulse Oximetry & Capnography topic so
 * the page can rank for the high-volume "capnography waveform" query
 * cluster (curare cleft, shark-fin, rebreathing, oesophageal
 * intubation, cardiac oscillations) and host an interactive pattern
 * recogniser.
 */

const objectives = [
  "Describe the physics of infrared CO₂ measurement (Beer-Lambert law, 4.26 μm absorption band, sidestream vs mainstream sampling).",
  "Identify the four phases of a normal capnograph and the alpha and beta angles.",
  "Recognise abnormal capnograph patterns: obstructive (shark-fin), curare cleft, raised baseline (rebreathing), sudden loss (disconnection / oesophageal / arrest) and cardiac oscillations.",
  "Explain why EtCO₂ underestimates PaCO₂ and how that gradient changes in disease.",
  "Justify capnography as mandatory monitoring for all general anaesthesia, sedation requiring airway support, and intubated transfer (Association of Anaesthetists 2021, NAP4).",
  "Use EtCO₂ as a marker of cardiac output during CPR (RCUK 2021) and ROSC.",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Falling EtCO₂ during a long abdominal case",
    scenario: (
      <>
        Mid-laparotomy on a 70 kg patient ventilated to a steady EtCO₂ of
        4.8 kPa. Over 10 minutes EtCO₂ falls to 2.5 kPa with no change in
        ventilator settings. BP has dropped from 110/70 to 75/45. What
        differential do you work through and in what order?
      </>
    ),
    working: (
      <>
        EtCO₂ falls when{" "}
        <strong>(1) CO₂ production</strong> falls (hypothermia, deepening
        anaesthesia — slow change),{" "}
        <strong>(2) pulmonary blood flow</strong> falls (haemorrhage,
        embolism, tamponade, arrest — fast change), or{" "}
        <strong>(3) ventilation</strong> increases (hyperventilation,
        sampling-line leak — abrupt). A sudden drop with hypotension is a
        circulation problem until proven otherwise. Rule out massive
        haemorrhage (surgical field, drains, suction), then pulmonary
        embolism (air, fat, thrombus, gas).
      </>
    ),
    answer: (
      <>
        Call for help, FiO₂ 1.0, fluid/vasopressor bolus, inspect surgical
        field for bleeding, send ABG (rising A-a gradient and falling
        PaCO₂–EtCO₂ gradient support PE). If embolism likely, treat
        haemodynamically and consider TOE / CT once stabilised.
      </>
    ),
    cites: ["BJA Educ 2017 Capnography", "Association of Anaesthetists 2021"],
  },
  {
    title: "Confirming tracheal intubation in an obese patient",
    scenario: (
      <>
        After RSI in a BMI 42 patient, the registrar passes the tube and
        squeezes the bag once — EtCO₂ reads 2 kPa. Is the tube in the
        trachea?
      </>
    ),
    working: (
      <>
        A single squeeze is unreliable: oesophageal intubation produces
        small CO₂ traces for up to <strong>6 breaths</strong> from gastric
        CO₂ (carbonated drinks, mask ventilation pre-induction). Sustained
        EtCO₂ of a normal shape and value across <strong>≥ 6 consecutive
        breaths</strong> is the gold standard for tracheal placement
        (NAP4; PUMA consensus 2022; DAS 2025). A flat or vanishing trace is presumed
        oesophageal until proven otherwise.
      </>
    ),
    answer: (
      <>
        Continue to ventilate and observe at least six waveforms. If the
        capnograph maintains a normal-shaped plateau, the tube is
        tracheal. If the trace falls away, remove the tube and re-attempt
        intubation; <em>do not</em> use auscultation as the sole
        confirmation.
      </>
    ),
    cites: ["NAP4", "PUMA 2022", "DAS 2025"],
  },
  {
    title: "EtCO₂ as a CPR feedback monitor",
    scenario: (
      <>
        A patient is in PEA arrest. Twenty minutes of high-quality CPR
        gives a sustained EtCO₂ of 0.8 kPa (~6 mmHg). The team asks
        whether to continue.
      </>
    ),
    working: (
      <>
        RCUK 2021 cites EtCO₂ as the most useful prognostic monitor during
        resuscitation. An EtCO₂ persistently &lt; 1.3 kPa (10 mmHg) after
        20 minutes of optimal CPR is associated with near-zero survival in
        adult cardiac arrest, particularly in non-shockable rhythms. A
        sudden rise of &gt; 1 kPa typically heralds ROSC.
      </>
    ),
    answer: (
      <>
        A sustained EtCO₂ &lt; 1.3 kPa after 20 minutes of optimal CPR in
        PEA is one of several criteria supporting termination of
        resuscitation. Decision must integrate downtime, reversible
        causes, ultrasound findings, and family wishes — not EtCO₂ alone.
      </>
    ),
    cites: ["RCUK 2021 ALS"],
  },
];

const keyPoints = [
  {
    text: "Capnography measures CO₂ continuously throughout the respiratory cycle and displays it as a waveform; capnometry shows only a number. Both use infrared absorption at the 4.26 μm CO₂ band (Beer-Lambert law: A = ε·c·l).",
    cites: ["BJA Educ 2017 Capnography"],
  },
  {
    text: "Sidestream analyser aspirates ~50–200 mL/min from a Luer port at the patient end; introduces a 2–4 s delay and a sampling-line water trap. Mainstream analyser sits inline at the airway with no delay but adds bulk, heat (39 °C to prevent condensation) and dead space — used in MRI, neonates, transport.",
    cites: ["Al-Shaikh & Stacey Ch.10-11"],
  },
  {
    text: "Normal capnograph has four phases: I — dead-space gas (zero), II — rapid upstroke, III — alveolar plateau, and 0 — inspiration. The α-angle (II–III) is normally about 100–110°; the β-angle (III–0) is about 90°.",
    cites: ["Bhavani-Shankar & Philip 2000"],
  },
  {
    text: "EtCO₂ ≈ PaCO₂ − 0.5 kPa (4 mmHg) in healthy lungs; gradient widens in any condition that increases alveolar dead space (PE, low CO, COPD, ARDS, high airway pressures). A widening gradient is a sensitive marker of evolving V/Q mismatch.",
    cites: ["BJA Educ 2017 Capnography"],
  },
  {
    text: "Shark-fin (sloping II, no clear III, prolonged): bronchospasm, COPD, kinked/partly obstructed ETT. Slope of phase III tracks severity and resolves with effective bronchodilator therapy.",
    cites: ["BJA Educ 2017 Capnography"],
  },
  {
    text: "Curare cleft: a notch in the alveolar plateau caused by a returning diaphragmatic effort during IPPV — reflects wearing-off of neuromuscular blockade or light anaesthesia. Confirm with PNS train-of-four.",
    cites: ["Bhavani-Shankar & Philip 2000"],
  },
  {
    text: "Raised baseline = patient is inspiring CO₂ (rebreathing). Causes: exhausted soda lime, faulty expiratory unidirectional valve, inadequate FGF in a Mapleson D or coaxial inner-tube disconnection (Bain — positive Pethick's test).",
    cites: ["BJA Educ 2017 Capnography"],
  },
  {
    text: "Sudden loss of trace is a never-event signal — work through tube position (oesophageal, dislodged), circuit (disconnection, sample-line failure) and circulation (arrest) in that order. Oesophageal CO₂ from a stomach full of carbonated fluid is the classic trap — it dies away within ~6 breaths.",
    cites: ["NAP4", "DAS 2025"],
  },
  {
    text: "EtCO₂ in CPR: < 1.3 kPa (10 mmHg) after 20 min of optimal compressions predicts non-survival in adult cardiac arrest; an abrupt rise of > 1 kPa heralds ROSC and should not be misinterpreted as a need for more compressions.",
    cites: ["RCUK 2021 ALS"],
  },
  {
    text: "Cardiac oscillations: small ripples on the descending limb at heart rate — benign, but the ventilator may auto-trigger off them in PSV. Reduce trigger sensitivity to abolish.",
    cites: ["Bhavani-Shankar & Philip 2000"],
  },
  {
    text: "Capnography is mandatory monitoring for all general anaesthesia, sedation requiring airway support, advanced airways including LMA, and intubated transfers. The Association of Anaesthetists 2021 standards reinforce that waveform capnography is required during sedation and during regional anaesthesia with sedation, not general anaesthesia alone (Association of Anaesthetists 2021; NAP4).",
    cites: ["Association of Anaesthetists 2021", "NAP4"],
  },
  {
    text: "Limitations: infrared analysers do not measure O₂ (no changing dipole moment); N₂O and volatile agents broaden the CO₂ absorption peak — modern machines compensate. Water vapour and high O₂ can introduce small errors if not corrected.",
    cites: ["Al-Shaikh & Stacey Ch.10-11"],
  },
];

const CapnographyTopic = () => {
  return (
    <TopicTemplate
      title="Capnography"
      subtitle="FRCA Primary / Final / FFICM — physics, waveform phases, abnormal patterns and capnography in CPR"
      backPath="/physics"
      backLabel="Physics"
      accentColor="text-physics"
      objectives={objectives}
      workedExamples={workedExamples}
      keyPoints={keyPoints}
      topicId="capnography"
      topicTitle="Capnography"
      quizQuestions={capnographyQuiz}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM] },
        workedExamples: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM] },
      }}
      sectionSources={{
        objectives: ["BJA Educ 2017 Capnography", "Association of Anaesthetists 2021"],
        keyPoints: ["BJA Educ 2017 Capnography", "Bhavani-Shankar & Philip 2000", "Al-Shaikh & Stacey Ch.10-11"],
        workedExamples: ["BJA Educ 2017 Capnography", "NAP4", "RCUK 2021 ALS"],
      }}
      coreConcepts={
        <ExamSection exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} className="scroll-mt-24">
          <section className="space-y-6">
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
                Read the waveform, name the problem
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                The capnograph is the single most informative monitor in
                anaesthesia. It confirms tracheal placement, tracks
                ventilator-circuit integrity, signals bronchospasm
                early, and is the prognostic marker examiners ask about
                in CPR. The shape of the trace is more diagnostic than
                the number — every classic pattern has a distinctive
                fingerprint. Use the simulator to lock the patterns in.
              </p>
            </div>

            <CapnographyWaveformDiagram />

            <p className="text-sm text-muted-foreground italic">
              Want the pattern-by-pattern interpretation guide? See{" "}
              <a
                href="/physics/capnography/waveforms"
                className="text-physics underline font-medium not-italic"
              >
                Capnography waveforms — how to read the trace
              </a>{" "}
              for an annotated catalogue of every classic waveform with
              causes and immediate actions.
            </p>

            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
                Four phases of the normal capnograph
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { name: "Phase I — expiratory baseline / anatomical dead-space gas", detail: "Zero CO₂. Start of expiration brings out the apparatus and anatomical dead space (no alveolar gas yet)." },
                  { name: "Phase II — rapid upstroke", detail: "Mixed dead-space and alveolar gas reaches the sensor. Steep, near-vertical rise. Slope reflects emptying of fast alveoli." },
                  { name: "Phase III — alveolar plateau", detail: "Pure alveolar gas. Mild upward slope (< 5°) reflects continuing V/Q heterogeneity. End of phase III = EtCO₂." },
                  { name: "Phase 0 — inspiration", detail: "Rapid descent to zero as fresh gas (no CO₂) flows past the sensor. β-angle should be near 90°." },
                ].map((s) => (
                  <div key={s.name} className="p-3 rounded-lg border border-border">
                    <p className="font-semibold text-foreground text-sm">{s.name}</p>
                    <p className="text-sm text-muted-foreground mt-1">{s.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
                Sidestream vs mainstream sampling
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border text-left">
                      <th className="p-2 font-semibold">Feature</th>
                      <th className="p-2 font-semibold">Sidestream</th>
                      <th className="p-2 font-semibold">Mainstream</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border">
                      <td className="p-2 font-medium text-foreground">Position of analyser</td>
                      <td className="p-2">Inside the monitor; sample drawn through long line</td>
                      <td className="p-2">Inline at the patient airway</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-2 font-medium text-foreground">Sampling rate</td>
                      <td className="p-2">50–200 mL/min aspirated</td>
                      <td className="p-2">No aspiration — gas passes through cuvette</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-2 font-medium text-foreground">Time delay</td>
                      <td className="p-2">2–4 s (transit time + analyser response)</td>
                      <td className="p-2">Near zero</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-2 font-medium text-foreground">Water handling</td>
                      <td className="p-2">Water trap; line can block with secretions</td>
                      <td className="p-2">Heated cuvette (39 °C) prevents condensation</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-2 font-medium text-foreground">Weight / dead space at airway</td>
                       <td className="p-2">Adds some dead space via the T-piece connector</td>
                      <td className="p-2">Adds bulk and dead space — significant in neonates</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-medium text-foreground">Typical use</td>
                      <td className="p-2">Operating theatre standard, anaesthetic agents simultaneously sampled</td>
                      <td className="p-2">MRI, transport ventilators, paediatric ICU</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">Mainstream systems respond rapidly, remove no gas and cannot kink or block a sample line, but add airway weight/dead space, may heat the adaptor, can be contaminated by secretions and are awkward without an advanced airway. Sidestream systems are light, work with nasal cannulae and permit multigas analysis, but delay the trace, remove gas, need scavenging and are vulnerable to leaks, kinks, water and secretions. <InlineRef topicId="capnography" refLabel="Al-Shaikh & Stacey Ch.10-11" /></p>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
                Why EtCO₂ &lt; PaCO₂ — and when the gap widens
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                EtCO₂ samples mixed alveolar gas, diluted by alveolar dead
                space (well-ventilated but poorly perfused units). In
                healthy lungs the gradient is small (~0.5 kPa / 4 mmHg).
                It widens with any process that increases alveolar dead
                space:
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li><strong>Pulmonary embolism</strong> — abrupt rise in PaCO₂–EtCO₂ gradient is one of the earliest signs.</li>
                <li><strong>Low cardiac output / haemorrhage</strong> — falling EtCO₂ with stable ventilation.</li>
                <li><strong>COPD / ARDS</strong> — heterogeneous V/Q widens the gradient chronically.</li>
                <li><strong>High airway pressures / auto-PEEP</strong> — compressed capillaries → West zone 1 dead space.</li>
                <li><strong>Hypotension and arrest</strong> — the gradient becomes infinite (EtCO₂ → 0 with preserved PaCO₂).</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
                Capnography in perioperative anaphylaxis
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Anaphylaxis has a dual capnographic presentation. Where mediator release causes
                bronchospasm, the trace becomes obstructive — a sloping phase II with no true plateau
                (shark-fin) and an obtuse α-angle. Where the dominant problem is circulatory, EtCO₂
                falls abruptly or disappears as pulmonary blood flow collapses, culminating in PEA
                arrest with a flat trace despite a correctly placed tube. In NAP6, the presenting features included
                <strong> hypotension in 46%</strong>, <strong>bronchospasm in 18%</strong>, and a reduced or absent capnography
                trace in <strong>2.3%</strong>; all patients became hypotensive during the episode. Therefore, during suspected
                anaphylaxis, a falling or absent EtCO₂ may be a marker of profound circulatory failure rather than simply airway
                obstruction <InlineRef topicId="capnography" refLabel="NAP6 2018" />.
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Shark-fin trace after induction or on giving antibiotic/neuromuscular blocker — think anaphylaxis before "light" bronchospasm.</li>
                <li>Sudden EtCO₂ fall with rising airway pressure and a vanishing pulse — treat as anaphylactic cardiovascular collapse: adrenaline, fluid, stop the trigger.</li>
                <li>Recovery of the plateau shape and rising EtCO₂ are useful bedside markers of response to adrenaline.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
                Capnography in the ICU intubation bundle
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Waveform capnography is a core component of safe intubation protocols in critical care.
                A prospective multicentre study of an intubation management bundle reduced
                life-threatening complications from 34% to 21% and other complications from 21% to 9%
                <InlineRef topicId="capnography" refLabel="Jaber 2010 Intubation Bundle" />.
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li><strong>Pre-intubation</strong> — two operators, fluid loading unless contraindicated, prepared vasopressor, planned induction and sedation, pre-oxygenation with NIV or high-flow oxygen.</li>
                <li><strong>During</strong> — rapid sequence induction with cricoid pressure where indicated, and capnography connected before the first attempt.</li>
                <li><strong>Post-intubation</strong> — immediate confirmation of tracheal placement by sustained waveform capnography, lung-protective ventilation, and vasopressor titration to target pressure.</li>
                <li>NAP4 showed airway events in ICU carry a disproportionate share of death and brain damage, frequently where capnography was absent or misinterpreted <InlineRef topicId="capnography" refLabel="NAP4" />. Continuous capnography is therefore mandatory for every intubated ICU patient, including during transfer.</li>
              </ul>
            </div>


            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
                Volumetric capnography
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Standard time capnography plots CO₂ against <em>time</em>. Volumetric
                capnography (VCap, the single-breath test for CO₂) plots CO₂ against
                <strong> expired volume</strong>, so the area under the curve is the volume of
                CO₂ eliminated per breath (VCO₂) and dead space can be quantified rather than
                inferred <InlineRef topicId="capnography" refLabel="BJA Educ 2017 Capnography" />.
              </p>
              <div className="grid sm:grid-cols-3 gap-3 mb-3">
                {[
                  { name: "Phase I", detail: "CO₂-free gas from apparatus and conducting airways — its volume is the airway (anatomical + apparatus) dead space." },
                  { name: "Phase II", detail: "Steep S-shaped rise as alveolar gas mixes with dead-space gas; its slope reflects the airway/alveolar interface and ventilation heterogeneity." },
                  { name: "Phase III", detail: "Alveolar plateau. Its slope, taken by linear regression over the final 25 % of phase III, is normally 0.4–2.5 kPa/L and steepens with V/Q heterogeneity." },
                ].map((p) => (
                  <div key={p.name} className="p-3 rounded-lg border border-border">
                    <p className="font-semibold text-foreground text-sm">{p.name}</p>
                    <p className="text-sm text-muted-foreground mt-1">{p.detail}</p>
                  </div>
                ))}
              </div>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li><strong>PetCO₂</strong> — read at the end of phase III, as for time capnography.</li>
                <li><strong>Phase III slope</strong> — an index of intrapulmonary gas-exchange heterogeneity; rises in bronchospasm, COPD and emphysema, and falls with successful bronchodilation.</li>
                <li><strong>PaCO₂ − PetCO₂ gradient</strong> — widened alveolar dead space (pulmonary embolism, low cardiac output, high airway pressures).</li>
                <li><strong>Physiological dead space</strong> — the <strong>Bohr equation</strong> (VD/VT = (PACO₂ − PĒCO₂)/PACO₂) uses mean alveolar CO₂ taken from the volumetric capnogram; the <strong>Enghoff modification</strong> substitutes PaCO₂, so it also captures shunt and therefore reports a larger "dead space" in ARDS.</li>
              </ul>
              <p className="text-sm text-muted-foreground mt-3">
                Clinically, VCap tracks V/Q matching breath by breath: rising alveolar tidal volume and falling
                dead-space fraction after a recruitment manoeuvre or PEEP titration suggest effective recruitment,
                whereas a rising VD/VT signals overdistension. A high dead-space fraction on day 1 of ARDS is an
                independent predictor of mortality, and an abrupt rise in VD/VT with a widened PaCO₂ − PetCO₂ gradient
                and a normal phase III slope is characteristic of pulmonary embolism.
              </p>
            </div>


            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
                Common exam pitfalls
              </h2>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Confirming tracheal intubation on a single breath — confirm across ≥ 6 sustained, normal-shaped waveforms.</li>
                <li><strong>Never use clinical signs to confirm tracheal placement when sustained capnography is absent.</strong> Tube misting has a false-positive rate up to 69%; ordinary auscultation about 14%, and even five-point auscultation about 18%. Chest rise is also unreliable. False reassurance from these signs recurs in fatal unrecognised oesophageal intubation: if sustained exhaled CO₂ is absent, exclude oesophageal placement systematically rather than accepting clinical signs. <InlineRef topicId="capnography" refLabel="Anaesthesia 2023 Intubation Tests" /></li>
                <li>Quoting EtCO₂ alone for adequacy of ventilation in COPD or PE — the PaCO₂–EtCO₂ gradient is what matters.</li>
                <li>Calling a raised baseline "ventilator artefact" — it is rebreathing; check absorber and valves.</li>
                <li>Missing curare cleft on a long display — examine the plateau, not the peak.</li>
                <li>Treating cardiac oscillations as patient effort — recognise the heart-rate periodicity and reduce trigger sensitivity.</li>
                <li>Forgetting that infrared analysers cannot measure O₂ — that needs paramagnetic or fuel-cell technology.</li>
              </ul>
            </div>
          </section>

          <Helmet>
            {/* Title + meta description provided centrally via topicSeo.capnography; FAQPage JSON-LD here targets "capnography waveforms" and "ETCO₂ normal range" queries for rich-result eligibility. */}
            <script type="application/ld+json">{JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: capnographyFaqs.map(([name, acceptedAnswer]) => ({
                "@type": "Question",
                name,
                acceptedAnswer: { "@type": "Answer", text: acceptedAnswer },
              })),
            })}</script>
          </Helmet>
        </ExamSection>
      }
    />
  );
};

export default CapnographyTopic;

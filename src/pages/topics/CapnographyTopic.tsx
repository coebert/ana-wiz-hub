import { TopicTemplate } from "@/components/TopicTemplate";
import { Exam } from "@/data/curriculum";
import { ExamSection } from "@/components/ExamSection";
import { capnographyQuiz } from "@/data/quizzes";
import type { WorkedExample } from "@/components/WorkedExamples";
import CapnographyWaveformDiagram from "@/components/diagrams/CapnographyWaveformDiagram";

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
  "Justify capnography as mandatory monitoring for all general anaesthesia, sedation requiring airway support, and intubated transfer (AAGBI 2015, NAP4).",
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
    cites: ["BJA Educ 2017 Capnography", "AAGBI Monitoring 2015"],
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
        (NAP4, DAS 2015). A flat or vanishing trace is presumed
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
    cites: ["NAP4", "DAS 2015"],
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
    text: "Normal capnograph has four phases: I — dead-space gas (zero), II — rapid upstroke (mixed dead-space + alveolar), III — alveolar plateau (slope < 5°), and 0 — inspiratory baseline (back to zero). The α-angle (II–III) and β-angle (III–0) both ~90°.",
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
    cites: ["NAP4", "DAS 2015"],
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
    text: "Capnography is mandatory monitoring for all general anaesthesia, all sedation requiring airway support, all advanced airways including LMA, and all intubated transfers within and between hospitals (AAGBI 2015, NAP4 recommendation 1).",
    cites: ["AAGBI Monitoring 2015", "NAP4"],
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
        objectives: ["BJA Educ 2017 Capnography", "AAGBI Monitoring 2015"],
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

            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
                Four phases of the normal capnograph
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { name: "Phase I — inspiratory baseline / dead-space gas", detail: "Zero CO₂. Start of expiration brings out the apparatus and anatomical dead space (no alveolar gas yet)." },
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
                      <td className="p-2">Minimal</td>
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
                Common exam pitfalls
              </h2>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Confirming tracheal intubation on a single breath — confirm across ≥ 6 sustained, normal-shaped waveforms.</li>
                <li>Quoting EtCO₂ alone for adequacy of ventilation in COPD or PE — the PaCO₂–EtCO₂ gradient is what matters.</li>
                <li>Calling a raised baseline "ventilator artefact" — it is rebreathing; check absorber and valves.</li>
                <li>Missing curare cleft on a long display — examine the plateau, not the peak.</li>
                <li>Treating cardiac oscillations as patient effort — recognise the heart-rate periodicity and reduce trigger sensitivity.</li>
                <li>Forgetting that infrared analysers cannot measure O₂ — that needs paramagnetic or fuel-cell technology.</li>
              </ul>
            </div>
          </section>
        </ExamSection>
      }
    />
  );
};

export default CapnographyTopic;

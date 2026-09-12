import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { DiagramSection } from "@/components/topic/DiagramSection";
import FinapresDiagram from "@/components/diagrams/physics/FinapresDiagram";
import NIBPOscillometricDiagram from "@/components/diagrams/physics/NIBPOscillometricDiagram";
import AuscultatoryNIBPDiagram from "@/components/diagrams/physics/AuscultatoryNIBPDiagram";
import NIBPvsArterialDiagram from "@/components/diagrams/physics/NIBPvsArterialDiagram";
import ManometerDiagram from "@/components/diagrams/physics/ManometerDiagram";
import DampingCurvesDiagram from "@/components/diagrams/physics/DampingCurvesDiagram";
import { pressureMeasurementQuiz } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { InlineRef } from "@/components/references/InlineRef";

const pressureMeasurementFaqs: Array<[string, string]> = [
  [
    "What is the natural frequency of an arterial line and why must it exceed 40 Hz?",
    "Natural frequency f₀ = (1/2π) × √(πd²E / 4ρLV) — depends on tubing diameter, stiffness, length and fluid density. The pulse pressure waveform contains harmonics up to ~10× heart rate (~25 Hz at HR 150). To reproduce these without resonance distortion, f₀ should exceed 40 Hz. Short, stiff, wide-bore, bubble-free tubing maximises f₀."
  ],
  [
    "What is optimal damping and how is it measured?",
    "Damping coefficient 0.6–0.7 is optimal — fast response without overshoot. Measured by the fast-flush (square-wave) test: count oscillations after release. ≥2 oscillations = under-damped (overshoots, overestimates SBP); ≤1 oscillation = over-damped (underestimates SBP). MAP is reliable in both cases."
  ],
  [
    "How does a strain-gauge transducer convert pressure into an electrical signal?",
    "A flexible diaphragm deforms under pressure, stretching wires arranged in a Wheatstone bridge configuration. The resistance change unbalances the bridge, producing a small voltage proportional to applied pressure. The transducer is zeroed at the level of the right atrium (phlebostatic axis) to remove the effect of hydrostatic column."
  ]
];

const objectives = [
  "Convert fluently between mmHg, cmH₂O, kPa and bar in clinical pressure measurements",
  "Describe the strain-gauge Wheatstone-bridge pressure transducer and the importance of zeroing/levelling",
  "Define natural frequency and damping coefficient and recognise over- and under-damped arterial traces",
  "Explain the oscillometric NIBP method and the volume-clamp (Penáz) principle behind Finapres / ClearSight",
  "Identify common errors in invasive arterial monitoring and the manoeuvre to correct each",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Levelling error in arterial monitoring",
    scenario:
      "An arterial transducer is mistakenly fixed to the head of the bed, 26 cm above the phlebostatic axis. The displayed MAP is 52 mmHg. Estimate the true MAP.",
    working:
      "Hydrostatic pressure of a fluid column: ΔP (cmH₂O) = height (cm).\nConvert cmH₂O → mmHg: 1 mmHg = 1.36 cmH₂O.\n26 cmH₂O / 1.36 ≈ 19 mmHg.\nTransducer above the heart under-reads by this amount.",
    answer:
      "True MAP ≈ 52 + 19 ≈ 71 mmHg. The displayed hypotension was an artefact of levelling. Always zero AND level to the phlebostatic axis (4th ICS, mid-axillary line) — every 13 cm of height error gives ~10 mmHg.",
    cites: ["Cross & Plunkett Ch.7"],
  },
  {
    title: "Damping diagnosis from a fast-flush test",
    scenario:
      "A square-wave fast flush of an arterial line shows a single small overshoot followed by a return to baseline within 1 oscillation. Damping coefficient and clinical implications?",
    working:
      "Single oscillation pattern → damping coefficient ζ ≈ 0.6–0.7 (optimal range, ζ_opt = 0.64).\nCompare to: no oscillation (over-damped, ζ > 1, sluggish); 2–3 decreasing oscillations (under-damped, ζ < 0.4, resonance distortion).\nNatural frequency from cycle length on the trace: fn = 1/T. The system's natural frequency must exceed the highest significant harmonic of the arterial waveform (≈10th harmonic). For HR 120 bpm (fundamental 2 Hz) the 10th harmonic is 20 Hz, so a natural frequency >24 Hz is typically required (BJA Educ 2020).",
    answer:
      "Optimal damping (ζ ≈ 0.64). The trace is reliable: SBP, DBP and MAP can all be trusted. Over-damping under-reads SBP and over-reads DBP; under-damping does the opposite. MAP is least affected by damping artefact in either direction.",
    cites: ["BJA Educ 2015", "BJA Educ 2020 (Resonance)"],
  },
];

const PressureMeasurementTopic = () => {
  return (
    <TopicTemplate
      title="Pressure Measurement"
      subtitle="Transducers, manometers and the principles of invasive and non-invasive monitoring"
      backPath="/physics"
      backLabel="Physics"
      accentColor="text-physics"
      topicId="pressure-measurement"
      topicTitle="Pressure Measurement"
      objectives={objectives}
      workedExamples={workedExamples}
      quizQuestions={pressureMeasurementQuiz}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY, Exam.FINAL], curriculumCodes: ["RCoA Primary — Physics", "RCoA Final — Physics"] },
        workedExamples: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL] },
      }}
      sectionSources={{
        workedExamples: ["BJA Educ 2015", "BJA Educ 2020 (Resonance)", "Cross & Plunkett Ch.7"],
        keyPoints: ["Al-Shaikh & Stacey Ch.19", "Cross & Plunkett Ch.7", "BJA Educ 2015", "BJA Educ 2020 (Resonance)"],
      }}
      keyPoints={[
        { text: "Pressure = Force/Area. SI unit is Pascal. Clinical units: mmHg, cmH₂O, kPa, bar.", cites: ["Al-Shaikh & Stacey Ch.19"] },
        { text: "Wheatstone bridge strain gauge transducers convert diaphragm deflection to voltage via resistance change.", cites: ["Cross & Plunkett Ch.7"] },
        { text: "Transducers must be zeroed to atmosphere and levelled to the phlebostatic axis. 13 cm error ≈ 10 mmHg.", cites: ["BJA Educ 2015"] },
        { text: "Natural frequency must exceed the highest significant harmonic of the arterial waveform (≈10th harmonic, so typically >24 Hz at clinical heart rates). Optimal damping coefficient ζ = 0.64.", cites: ["BJA Educ 2020 (Resonance)"] },
        { text: "Over-damping underestimates systolic; under-damping overestimates systolic. MAP is least affected.", cites: ["Cross & Plunkett Ch.7"] },
        { text: "NIBP oscillometric method: maximum oscillation amplitude = MAP; systolic and diastolic are derived algorithmically.", cites: ["BJA Educ 2015"] },
      ]}
      coreConcepts={
        <>
          <ExamSection id="introduction" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Introduction" defaultOpen>
            <p className="text-foreground/90 leading-relaxed">
              Accurate pressure measurement is fundamental to anaesthetic monitoring. Pressures encountered in clinical practice
              range from atmospheric (101.3 kPa) to intracranial (0.7–2 kPa). Understanding the physics behind transducers,
              manometers, and invasive monitoring is essential for safe practice and FRCA examinations.
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="units" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Units of Pressure">
            <p className="text-foreground/90 leading-relaxed">
              Pressure = Force / Area. The SI unit is the Pascal (Pa), where 1 Pa = 1 N/m². In clinical practice, pressures are
              commonly expressed in mmHg (arterial BP), cmH₂O (CVP, airway pressure), kPa (gas partial pressures), and bar (gas
              cylinders). Key conversions: 1 atm = 101.3 kPa = 760 mmHg = 1033 cmH₂O
              <InlineRef topicId="pressure-measurement" refLabel="Al-Shaikh & Stacey Ch.19" />.
            </p>

            <div className="overflow-x-auto rounded-lg border border-border mt-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-secondary/50">
                    <th className="text-left p-3 border border-border font-semibold text-foreground">Unit</th>
                    <th className="text-left p-3 border border-border font-semibold text-foreground">Equivalents</th>
                  </tr>
                </thead>
                <tbody className="text-foreground/90">
                  <tr>
                    <td className="p-3 border border-border font-medium">1 kPa</td>
                    <td className="p-3 border border-border">7.5 mmHg = 10.2 cmH₂O = 0.01 bar</td>
                  </tr>
                  <tr className="bg-secondary/20">
                    <td className="p-3 border border-border font-medium">1 mmHg</td>
                    <td className="p-3 border border-border">0.133 kPa = 1.36 cmH₂O</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-border font-medium">1 cmH₂O</td>
                    <td className="p-3 border border-border">0.098 kPa = 0.74 mmHg</td>
                  </tr>
                  <tr className="bg-secondary/20">
                    <td className="p-3 border border-border font-medium">1 atm</td>
                    <td className="p-3 border border-border">101.3 kPa = 760 mmHg = 1033 cmH₂O = 1.013 bar</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-border font-medium">1 bar</td>
                    <td className="p-3 border border-border">100 kPa ≈ 750 mmHg</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-foreground/90 leading-relaxed mt-4">
              Pressure from a liquid column follows <strong>P = ρgh</strong>, so for a given pressure the column height needed is
              inversely proportional to the fluid's density. Mercury (13.6 × 10³ kg/m³) is 13.6 times denser than water, so
              1 mmHg = 13.6 mmH₂O = 1.36 cmH₂O — which is also why a mercury manometer can be compact enough to be practical,
              whereas a water manometer for arterial pressure would need to stand over a metre tall
              <InlineRef topicId="pressure-measurement" refLabel="Cross & Plunkett Ch.7" />.
            </p>

            <div className="grid gap-3 mt-4 md:grid-cols-3">
              <div className="rounded-lg border border-border bg-card p-4">
                <p className="text-sm font-medium text-foreground">Worked example 1</p>
                <p className="text-sm text-muted-foreground mt-1">
                  A ventilator shows a peak inspiratory pressure of 25 cmH₂O. What is this in mmHg?
                </p>
                <p className="text-sm text-foreground mt-2">25 ÷ 1.36 ≈ <strong>18 mmHg</strong> (or 25 × 0.74).</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Airway pressures are conventionally expressed in cmH₂O because the numbers are conveniently large — a legacy of
                  the historical water manometer.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <p className="text-sm font-medium text-foreground">Worked example 2</p>
                <p className="text-sm text-muted-foreground mt-1">
                  A blood gas reports PaO₂ 12 kPa. What is this in mmHg?
                </p>
                <p className="text-sm text-foreground mt-2">12 × 7.5 = <strong>90 mmHg</strong>.</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <p className="text-sm font-medium text-foreground">Worked example 3</p>
                <p className="text-sm text-muted-foreground mt-1">
                  CVP is reported as 8 mmHg. What is this in cmH₂O?
                </p>
                <p className="text-sm text-foreground mt-2">8 × 1.36 ≈ <strong>11 cmH₂O</strong>.</p>
              </div>
            </div>

            <div className="bg-secondary/30 rounded-lg p-4 mt-4 border border-border">
              <p className="text-sm text-muted-foreground">
                These conversions are routinely tested in Primary FRCA MCQ/SBA and OSCE equipment stations. Mixing units — e.g.
                comparing a CVP reported in mmHg with an airway pressure in cmH₂O when estimating cerebral or abdominal perfusion
                pressure — is a classic error <InlineRef topicId="pressure-measurement" refLabel="BJA Educ 2018 (Physics)" />.
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="manometers" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <DiagramSection
              title="Manometers"
              intro={
                <>
                  A manometer measures pressure using either a column of liquid (U-tube) or the elastic deformation of a
                  curved metal tube (Bourdon gauge). Toggle between the two below to compare their working principles.
                </>
              }
            >
              <ManometerDiagram />
              <div className="bg-secondary/30 rounded-lg p-4 mt-3 border border-border">
                <p className="text-sm font-medium text-foreground">Clinical Application</p>
                <p className="text-sm text-muted-foreground mt-1">
                  CVP was historically measured using a water manometer (cmH₂O). A 20 cmH₂O column equates to approximately
                  15 mmHg. Modern practice uses electronic transducers, but understanding the principle remains essential.
                  Bourdon gauges remain ubiquitous on cylinder yokes and pipeline regulators.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  An <strong>aneroid gauge</strong> uses an evacuated flexible metal capsule or bellows that expands or contracts with
                  pressure and drives a dial through linkages. A <strong>Bourdon gauge</strong> uses a coiled, flattened hollow metal tube
                  of elliptical cross-section open to the pressure source; rising pressure makes the tube uncoil, and a lever-and-gear
                  mechanism amplifies movement of the free end to turn a pointer over a calibrated dial. It reads gauge pressure (zero at
                  atmospheric), spans cylinder pressures up to ~250 bar, and is used on cylinder yokes, pipeline gauges and regulators.
                  Limitations: mechanical hysteresis and wear of the linkage, susceptibility to mechanical shock, a slow response that makes
                  it unsuitable for dynamic waveforms, temperature-dependent tube elasticity, and the need for periodic recalibration; a
                  ruptured tube is directed away from the operator by a blow-out disc
                  <InlineRef topicId="pressure-measurement" refLabel="Al-Shaikh & Stacey Ch.19" />
                  <InlineRef topicId="pressure-measurement" refLabel="BJA Educ 2018 (Physics)" />.
                </p>
              </div>
            </DiagramSection>
          </ExamSection>

          <ExamSection id="icp" exams={[Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Intracranial Pressure Measurement">
              <div className="text-foreground/90 leading-relaxed space-y-3">
                <p>
                  The <strong>Monro–Kellie doctrine</strong> treats brain, CSF and intracranial blood as a fixed-volume compartment;
                  compensation initially buffers added volume, then ICP rises steeply as compliance is exhausted. An
                  <strong>external ventricular drain (EVD)</strong> is the clinical reference standard because it measures ventricular
                  pressure and permits CSF sampling and drainage. Level its fluid transducer to the tragus/external auditory meatus as a
                  practical surrogate for the foramen of Monro and re-level after position changes.
                </p>
                <p>
                  Intraparenchymal fibreoptic or strain-gauge probes are easier to place and carry less infection risk but cannot drain
                  CSF and may drift because they cannot be re-zeroed in situ; subdural/epidural devices are less accurate. The ICP pulse
                  has <strong>P1</strong> percussion, <strong>P2</strong> tidal/compliance and <strong>P3</strong> dicrotic components.
                  Normally P1 &gt; P2; P2 exceeding P1 suggests reduced intracranial compliance
                  <InlineRef topicId="pressure-measurement" refLabel="BTF Severe TBI" />.
                </p>
                <p>
                  <strong>Indications</strong>: severe traumatic brain injury with GCS ≤8 and an abnormal CT (or a normal CT with two of
                  age &gt;40 years, motor posturing, or systolic pressure &lt;90 mmHg), poor-grade subarachnoid haemorrhage with
                  hydrocephalus or a depressed conscious level, large middle cerebral artery infarction with impending malignant oedema,
                  fulminant hepatic failure with grade IV encephalopathy, and selected patients after cardiac arrest or intracranial
                  surgery where neurological examination is unavailable <InlineRef topicId="pressure-measurement" refLabel="BTF Severe TBI" />.
                </p>
                <p>
                  <strong>Derived targets</strong>: cerebral perfusion pressure <strong>CPP = MAP − ICP</strong> (use ICP or central venous
                  pressure, whichever is higher). Treat ICP above <strong>22 mmHg</strong> and aim for a CPP of
                  <strong> 60–70 mmHg</strong>, individualised to autoregulatory reserve; aggressive pressor-driven CPP &gt;70 mmHg risks
                  ARDS <InlineRef topicId="pressure-measurement" refLabel="BTF Severe TBI" />.
                </p>
                <p>
                  <strong>Complications and pitfalls</strong>: infection/ventriculitis (rising with duration of an EVD), tract or
                  intraparenchymal haemorrhage, malposition and failure to cannulate a shifted or collapsed ventricle, catheter blockage by
                  blood or debris, CSF leak, over-drainage causing ventricular collapse, and measurement error from zero drift, an
                  incorrectly levelled transducer, or air/blood in the fluid-filled line.
                </p>
              </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="iap" exams={[Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Intra-Abdominal Pressure Measurement">
              <div className="text-foreground/90 leading-relaxed space-y-3">
                <p>
                  Measure IAP in patients at risk after major trauma, pancreatitis, burns, massive fluid resuscitation, ileus or tense
                  abdominal closure. <strong>Intra-abdominal hypertension (IAH)</strong> is sustained/repeated IAP ≥12 mmHg; grades are
                  I 12–15, II 16–20, III 21–25 and IV &gt;25 mmHg. <strong>Abdominal compartment syndrome</strong> is sustained IAP
                  &gt;20 mmHg with new organ dysfunction <InlineRef topicId="pressure-measurement" refLabel="WSACS IAP Consensus" />.
                </p>
                <p>
                  For intermittent intravesical measurement, empty the bladder, instil no more than <strong>25 mL sterile saline</strong>,
                  connect to a pressure transducer zeroed at the mid-axillary line at the iliac crest, and read at end-expiration with the
                  patient supine and abdominal muscles relaxed. Raised IAP reduces renal perfusion and urine output, raises diaphragm and
                  airway pressures, impairs venous return and cardiac output, and compromises splanchnic perfusion; it is independently
                  associated with acute kidney injury <InlineRef topicId="pressure-measurement" refLabel="Intensive Care Med 2008 IAP" />.
                </p>
                <p>
                  <strong>Kron technique, step by step</strong>: drain and clamp the urinary catheter, connect a three-way tap and
                  transducer set to the sampling port, instil 20–25 mL of sterile saline into the empty bladder, clamp the drainage tubing
                  distal to the port, zero the transducer at the level of the <strong>symphysis pubis</strong> (the original description) or
                  the mid-axillary line at the iliac crest (the WSACS reference), wait 30–60 seconds for detrusor relaxation, and read at
                  end-expiration in the complete supine position. Normal IAP in a ventilated adult is 5–7 mmHg and IAP &lt;12 mmHg is
                  normal overall <InlineRef topicId="pressure-measurement" refLabel="WSACS IAP Consensus" />.
                </p>
                <p>
                  <strong>Sources of error</strong>: an incorrectly levelled or unzeroed transducer, head-up or lateral positioning (each
                  degree of head-up tilt raises the reading), detrusor contraction or a small contracted bladder, instilling excess volume
                  (&gt;25 mL falsely elevates IAP), a blocked or kinked catheter, abdominal muscle activity, coughing or straining, reading
                  during inspiration on positive-pressure ventilation, obesity and pregnancy (chronically raised baseline), and air bubbles
                  in the fluid column.
                </p>
              </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="transducers" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Pressure Transducers">
            <p className="text-foreground/90 leading-relaxed">
              Modern invasive pressure monitoring uses a <strong>Wheatstone bridge strain gauge</strong> transducer. A diaphragm
              deflects under pressure, changing the resistance of strain gauge elements arranged in a Wheatstone bridge circuit.
              The voltage change is amplified and displayed as a pressure waveform.
            </p>
            <p className="text-foreground/90 leading-relaxed mt-3">
              The transducer must be <strong>zeroed</strong> (opened to atmosphere at the level of interest — typically the
              phlebostatic axis at the right atrium) and <strong>levelled</strong>. A 13 cm height error produces approximately
              10 mmHg error.
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="arterial" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Invasive Arterial Monitoring">
            <p className="text-foreground/90 leading-relaxed">
              The arterial line system consists of an intra-arterial cannula, fluid-filled non-compliant tubing, a three-way tap,
              a flush device (300 mmHg pressure bag with heparinised saline delivering 3–4 ml/hr), and the transducer. The system
              must faithfully reproduce the arterial waveform.
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="cvp" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Central Venous Pressure (CVP) Monitoring">
              <div className="text-foreground/90 leading-relaxed space-y-3">
                <p>
                  CVP is the pressure in the great veins/right atrium at the level of the tricuspid valve, measured with the
                  transducer zeroed at the mid-axillary line (phlebostatic axis) and read at <strong>end-expiration</strong>.
                  Normal values are <strong>2–6 mmHg</strong> (up to 8 mmHg is often quoted), higher when ventilated with PEEP
                  <InlineRef topicId="pressure-measurement" refLabel="Cross & Plunkett Ch.7" />.
                </p>
                <p>
                  Measurement uses a fluid-filled catheter–transducer system identical in principle to an arterial line
                  (strain-gauge Wheatstone bridge, zeroing to atmosphere, levelling, flush test, and the same damping/resonance
                  considerations) <InlineRef topicId="pressure-measurement" refLabel="Al-Shaikh & Stacey Ch.19" />.
                </p>
                <div className="bg-secondary/30 rounded-lg p-4 border border-border">
                  <p className="text-sm font-medium text-foreground">Waveform components and the cardiac cycle</p>
                  <ul className="text-sm text-muted-foreground mt-1 space-y-1 list-disc list-inside">
                    <li><strong>a wave</strong> — atrial contraction (end-diastole, follows the ECG P wave)</li>
                    <li><strong>c wave</strong> — bulging of the closed tricuspid valve into the atrium in early systole (± transmitted carotid pulsation)</li>
                    <li><strong>x descent</strong> — atrial relaxation and downward pull of the tricuspid annulus during systole</li>
                    <li><strong>v wave</strong> — atrial filling against a closed tricuspid valve in late systole</li>
                    <li><strong>y descent</strong> — tricuspid valve opens and rapid ventricular filling begins</li>
                  </ul>
                </div>
                <div className="overflow-x-auto rounded-lg border border-border">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-secondary/50">
                        <th className="text-left p-3 border border-border font-semibold text-foreground">Abnormality</th>
                        <th className="text-left p-3 border border-border font-semibold text-foreground">Cause</th>
                      </tr>
                    </thead>
                    <tbody className="text-foreground/90">
                      <tr>
                        <td className="p-3 border border-border font-medium">Large a waves</td>
                        <td className="p-3 border border-border">Obstruction to RA emptying or reduced RV compliance — tricuspid stenosis, pulmonary hypertension, RV hypertrophy</td>
                      </tr>
                      <tr className="bg-secondary/20">
                        <td className="p-3 border border-border font-medium">Cannon (giant) a waves</td>
                        <td className="p-3 border border-border">Atrium contracts against a closed tricuspid valve — complete AV dissociation/junctional rhythm, ventricular pacing</td>
                      </tr>
                      <tr>
                        <td className="p-3 border border-border font-medium">Absent a waves</td>
                        <td className="p-3 border border-border">Atrial fibrillation</td>
                      </tr>
                      <tr className="bg-secondary/20">
                        <td className="p-3 border border-border font-medium">Large fused cv waves</td>
                        <td className="p-3 border border-border">Tricuspid regurgitation</td>
                      </tr>
                      <tr>
                        <td className="p-3 border border-border font-medium">Steep y descent (M/W trace)</td>
                        <td className="p-3 border border-border">Constrictive pericarditis</td>
                      </tr>
                      <tr className="bg-secondary/20">
                        <td className="p-3 border border-border font-medium">Blunted y descent</td>
                        <td className="p-3 border border-border">Cardiac tamponade</td>
                      </tr>
                      <tr>
                        <td className="p-3 border border-border font-medium">Kussmaul's sign</td>
                        <td className="p-3 border border-border">Paradoxical inspiratory rise in CVP — constrictive pericarditis</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  <strong>Limitations as a measure of fluid responsiveness</strong>: CVP is a static pressure reflecting the
                  interaction of venous return with RV function and compliance, confounded by PEEP, intra-abdominal pressure,
                  valvular disease and vasomotor tone. Meta-analyses show no useful correlation between CVP (or ΔCVP) and fluid
                  responsiveness, so it should not be used alone to guide fluid therapy. Dynamic indices — stroke volume
                  variation and pulse pressure variation (requiring sinus rhythm, controlled ventilation with tidal volume
                  ≥8 mL/kg, a closed chest and no significant arrhythmia), the passive leg raise with a flow measure, the
                  end-expiratory occlusion test, and echocardiographic assessment are generally more informative. CVP remains
                  useful as a marker of venous congestion (afterload on organ perfusion, e.g. renal) and as a safety limit
                  <InlineRef topicId="pressure-measurement" refLabel="Cross & Plunkett Ch.7" />
                  <InlineRef topicId="pressure-measurement" refLabel="BJA Educ 2020 (Resonance)" />.
                </p>
              </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="pac" exams={[Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Advanced Haemodynamic Monitoring: the Pulmonary Artery Catheter">
              <div className="text-foreground/90 leading-relaxed space-y-3">
                <p>
                  The pulmonary artery catheter (PAC) is a flow-directed, balloon-tipped catheter with a distal thermistor used
                  for thermodilution cardiac output measurement. During insertion, waveform morphology identifies catheter
                  position: <strong>RA</strong> (low-pressure venous trace with a-c-v waves) → <strong>RV</strong> (large
                  systolic step-up with a low diastolic pressure close to zero) → <strong>PA</strong> (a dicrotic notch and a
                  diastolic step-up above RV diastolic pressure, reflecting the closed pulmonary valve) →
                  <strong> wedge/occlusion</strong> trace once the balloon occludes a distal branch
                  <InlineRef topicId="pressure-measurement" refLabel="Al-Shaikh & Stacey Ch.19" />.
                </p>
                <div className="overflow-x-auto rounded-lg border border-border">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-secondary/50">
                        <th className="text-left p-3 border border-border font-semibold text-foreground">Chamber</th>
                        <th className="text-left p-3 border border-border font-semibold text-foreground">Normal pressure</th>
                      </tr>
                    </thead>
                    <tbody className="text-foreground/90">
                      <tr>
                        <td className="p-3 border border-border font-medium">RAP / CVP</td>
                        <td className="p-3 border border-border">2–6 mmHg</td>
                      </tr>
                      <tr className="bg-secondary/20">
                        <td className="p-3 border border-border font-medium">RV</td>
                        <td className="p-3 border border-border">15–30 / 0–8 mmHg</td>
                      </tr>
                      <tr>
                        <td className="p-3 border border-border font-medium">PAP</td>
                        <td className="p-3 border border-border">15–30 / 4–12 mmHg (mean 9–18 mmHg)</td>
                      </tr>
                      <tr className="bg-secondary/20">
                        <td className="p-3 border border-border font-medium">PAOP (wedge)</td>
                        <td className="p-3 border border-border">2–15 mmHg</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  <strong>PAOP</strong> approximates left atrial pressure and hence LVEDP, but this is valid only in West zone 3
                  lung, with no mitral valve disease and low airway/PEEP pressure; it is overestimated by mitral
                  stenosis/regurgitation and by high airway pressure transmitted through the pulmonary vasculature.
                </p>
                <p>
                  <strong>Derived variables</strong>: cardiac output and index (thermodilution), <strong>SVR = 80 × (MAP −
                  CVP)/CO</strong>, <strong>PVR = 80 × (mean PAP − PAOP)/CO</strong> (normal ~50–150 dyn·s·cm⁻⁵), stroke volume,
                  mixed venous saturation (SvO₂), and oxygen delivery/consumption.
                </p>
                <p>
                  Routine PAC use has declined following outcome trials showing no mortality benefit over less invasive
                  monitoring, but it retains a role in pulmonary hypertension, right ventricular failure, complex cardiac
                  surgery and transplant assessment <InlineRef topicId="pressure-measurement" refLabel="BJA Educ 2020 (Resonance)" />.
                </p>
              </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="dynamic-response" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Dynamic Response & Damping">
            <p className="text-foreground/90 leading-relaxed">
              The monitoring system has a <strong>natural (resonant) frequency</strong> which must exceed the highest
              significant harmonic of the arterial waveform (around the 10th harmonic). At a heart rate of 120 bpm the
              fundamental is 2 Hz, so the 10th harmonic is 20 Hz and a system with a natural frequency
              <strong> &gt;24 Hz</strong> is sufficient for accurate waveform reproduction. The <strong>damping
              coefficient</strong> (ζ) describes how quickly oscillations decay after a step change. Optimal damping
              (ζ = 0.64) provides the best balance between bandwidth and overshoot.
            </p>
            <div className="bg-secondary/30 rounded-lg p-4 mt-3 border border-border">
              <p className="text-sm font-medium text-foreground">Over-damping vs Under-damping</p>
              <p className="text-sm text-muted-foreground mt-1">
                <strong>Over-damped</strong> (air bubbles, clot, kink, compliant tubing): sluggish waveform, underestimates systolic,
                overestimates diastolic. <strong>Under-damped</strong> (long stiff tubing): resonant artefact, overestimates systolic,
                underestimates diastolic. Mean arterial pressure is least affected by damping artefact.
              </p>
            </div>
            <DampingCurvesDiagram />
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="nibp" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Non-Invasive Blood Pressure (NIBP)">
            <p className="text-foreground/90 leading-relaxed">
              The <strong>oscillometric method</strong> detects oscillations in cuff pressure during deflation. Maximum oscillation
              amplitude corresponds to MAP. Systolic and diastolic are calculated algorithmically. Cuff width should be ~40% of
              arm circumference — too narrow overestimates, too wide underestimates.
            </p>
            <div className="bg-secondary/30 rounded-lg p-4 mt-3 border border-border">
              <p className="text-sm font-medium text-foreground">Limitations of oscillometry</p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
                <li><strong>Arrhythmias</strong> — atrial fibrillation or marked rhythm irregularity disrupts the oscillometric envelope, producing unreliable or absent readings.</li>
                <li><strong>Severe hypotension / shock</strong> — low pulse pressure and peripheral vasoconstriction reduce cuff oscillations, causing overestimation or failure to measure.</li>
                <li><strong>Patient movement / shivering</strong> — motion artefact is interpreted as pressure oscillations and distorts the algorithmically derived systolic and diastolic values.</li>
                <li><strong>Vasoconstriction / vasopressor infusion</strong> — reduced arterial pulsatility alters the oscillation amplitude versus pressure relationship.</li>
                <li><strong>Morbid obesity</strong> — incorrect cuff size or shape can make a standard adult cuff too small (overestimates BP) or the arm too conical for even pressure distribution.</li>
              </ul>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-foreground mb-2">Cuffless blood pressure measurement</p>
              <p className="text-foreground/90 leading-relaxed text-sm">
                Wearable and smartphone-based technologies are being developed to measure BP without an inflatable cuff. They broadly separate into calibrated and uncalibrated approaches: calibrated methods must first be referenced against a conventional cuff, while uncalibrated methods aim for cuff-free absolute measurement
                <InlineRef topicId="pressure-measurement" refLabel="Annual Rev Biomed Eng 2022 (Cuffless)" />.
              </p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
                <li><strong>Pulse transit time (PTT)</strong> — estimates BP from the interval between an ECG R-wave and the corresponding pulse wave arrival at a peripheral site (e.g. pulse oximeter fingertip or wrist PPG). PTT is influenced by arterial stiffness and preload, so it generally requires periodic cuff calibration.</li>
                <li><strong>Pulse wave analysis (PWA)</strong> — extracts features from the photoplethysmography waveform shape (amplitude, area, reflection indices). Like PTT, it usually needs calibration to an oscillometric device for absolute BP values.</li>
              </ul>
              <p className="text-foreground/90 leading-relaxed text-sm mt-2">
                These technologies are promising for longitudinal trends and hypertension screening, but at present automated cuff-based NIBP remains the standard for perioperative and critical-care measurement.
              </p>
            </div>
            <p className="text-foreground/90 leading-relaxed mt-3">
              <strong>Von Recklinghausen oscillotonometer</strong> uses two cuffs (occluding and sensing) and was the precursor to
              modern automated oscillometry.
            </p>
            <AuscultatoryNIBPDiagram />
            <NIBPOscillometricDiagram />
            <NIBPvsArterialDiagram />
            <div className="mt-4 p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm mb-2">Finapres (FINger Arterial PRESsure)</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Continuous non-invasive arterial pressure monitoring based on the <strong>Penáz principle</strong> (volume-clamp method). A small finger cuff contains an infrared plethysmograph and a fast servo-controlled pressure system. The cuff pressure is continuously adjusted to keep the arterial wall in a state of constant diameter (the "unloaded" state), matching intra-arterial pressure beat-to-beat.
              </p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
                <li><strong>Physiocal algorithm</strong>: periodically recalibrates the volume-clamp set-point to account for smooth muscle tone changes</li>
                <li><strong>Advantages</strong>: beat-to-beat BP waveform without arterial cannulation; allows pulse contour analysis for stroke volume variation (SVV) and cardiac output estimation</li>
                <li><strong>Limitations</strong>: inaccurate in vasoconstriction, Raynaud's, poor peripheral perfusion; finger pressure ≠ aortic pressure (transfer function correction applied in modern devices e.g. ClearSight/CNAP)</li>
                <li><strong>Clinical use</strong>: perioperative haemodynamic monitoring, autonomic function testing, research</li>
              </ul>
            </div>
            <FinapresDiagram />
            </CollapsibleSubsection>
          </ExamSection>

          {/* Frank–Starling section removed — content audit (49e6c4eb): cardiac physiology content out of scope for a pressure-measurement physics topic. Relocate to a cardiac physiology topic. */}
          <ExamPitfallsCallout
            accent="physics"
            pitfalls={[
              "Aneroid gauges (Bourdon) for high pressures (cylinders); mercury/water manometers for static low pressures; strain-gauge transducers for invasive monitoring.",
              "Resonance/damping: optimal damping coefficient ≈ 0.64; under-damped overshoots, over-damped slurs the waveform.",
              "Natural frequency must exceed ~10× the fundamental of the arterial waveform — short, stiff, wide tubing with no bubbles.",
              "Zeroing references the transducer to atmospheric; levelling to the phlebostatic axis (4th ICS, mid-axillary line) defines the hydrostatic reference.",
              "1 mmHg ≈ 1.36 cmH₂O ≈ 133 Pa — unit conversions appear in viva and OSCE stations.",
            ]}
          />
          <TopicFaqs faqs={pressureMeasurementFaqs} />

        </>
      }
    />
  );
};

export default PressureMeasurementTopic;

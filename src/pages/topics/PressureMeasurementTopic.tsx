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
              cylinders). Key conversions: 1 atm = 101.3 kPa = 760 mmHg = 1033 cmH₂O.
            </p>
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
                  pressure and drives a dial through linkages. A <strong>Bourdon gauge</strong> uses a curved, flattened hollow metal tube
                  open to the pressure source; rising pressure makes it straighten, and a lever-and-gear mechanism amplifies movement of
                  the free end to turn a pointer. Its robust high-pressure range suits gas cylinders and regulators
                  <InlineRef topicId="pressure-measurement" refLabel="Al-Shaikh & Stacey Ch.19" />.
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

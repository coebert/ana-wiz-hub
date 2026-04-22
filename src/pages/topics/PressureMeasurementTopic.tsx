import { TopicTemplate } from "@/components/TopicTemplate";
import { ExamSection } from "@/components/ExamSection";
import { WorkedExample } from "@/components/WorkedExamples";
import { DiagramSection } from "@/components/DiagramSection";
import FinapresDiagram from "@/components/diagrams/FinapresDiagram";
import ManometerDiagram from "@/components/diagrams/ManometerDiagram";
import { pressureMeasurementQuiz } from "@/data/quizzes";

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
  },
  {
    title: "Damping diagnosis from a fast-flush test",
    scenario:
      "A square-wave fast flush of an arterial line shows a single small overshoot followed by a return to baseline within 1 oscillation. Damping coefficient and clinical implications?",
    working:
      "Single oscillation pattern → damping coefficient ζ ≈ 0.6–0.7 (optimal range, ζ_opt = 0.64).\nCompare to: no oscillation (over-damped, ζ > 1, sluggish); 2–3 decreasing oscillations (under-damped, ζ < 0.4, resonance distortion).\nNatural frequency from cycle length on the trace: fn = 1/T (target >40 Hz to exceed the 10th harmonic of arterial waveform).",
    answer:
      "Optimal damping (ζ ≈ 0.64). The trace is reliable: SBP, DBP and MAP can all be trusted. Over-damping under-reads SBP and over-reads DBP; under-damping does the opposite. MAP is least affected by damping artefact in either direction.",
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
        objectives: { exams: ["primary", "final"], curriculumCodes: ["RCoA Primary — Physics", "RCoA Final — Physics"] },
        workedExamples: { exams: ["primary", "final", "fficm"] },
        keyPoints: { exams: ["primary", "final"] },
      }}
      sectionSources={{
        workedExamples: ["BJA Educ 2015"],
      }}
      keyPoints={[
        "Pressure = Force/Area. SI unit is Pascal. Clinical units: mmHg, cmH₂O, kPa, bar.",
        "Wheatstone bridge strain gauge transducers convert diaphragm deflection to voltage via resistance change.",
        "Transducers must be zeroed to atmosphere and levelled to the phlebostatic axis. 13 cm error ≈ 10 mmHg.",
        "Natural frequency should exceed 40 Hz. Optimal damping coefficient ζ = 0.64.",
        "Over-damping underestimates systolic; under-damping overestimates systolic. MAP is least affected.",
        "NIBP oscillometric method: maximum oscillation amplitude = MAP; systolic and diastolic are derived algorithmically.",
      ]}
      coreConcepts={
        <>
          <ExamSection id="introduction" exams={["primary", "final"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Introduction</h2>
            <p className="text-foreground/90 leading-relaxed">
              Accurate pressure measurement is fundamental to anaesthetic monitoring. Pressures encountered in clinical practice
              range from atmospheric (101.3 kPa) to intracranial (0.7–2 kPa). Understanding the physics behind transducers,
              manometers, and invasive monitoring is essential for safe practice and FRCA examinations.
            </p>
          </ExamSection>

          <ExamSection id="units" exams={["primary", "final"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Units of Pressure</h2>
            <p className="text-foreground/90 leading-relaxed">
              Pressure = Force / Area. The SI unit is the Pascal (Pa), where 1 Pa = 1 N/m². In clinical practice, pressures are
              commonly expressed in mmHg (arterial BP), cmH₂O (CVP, airway pressure), kPa (gas partial pressures), and bar (gas
              cylinders). Key conversions: 1 atm = 101.3 kPa = 760 mmHg = 1033 cmH₂O.
            </p>
          </ExamSection>

          <ExamSection id="manometers" exams={["primary", "final"]}>
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
              </div>
            </DiagramSection>
          </ExamSection>

          <ExamSection id="transducers" exams={["primary", "final"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Pressure Transducers</h2>
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
          </ExamSection>

          <ExamSection id="arterial" exams={["primary", "final", "fficm"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Invasive Arterial Monitoring</h2>
            <p className="text-foreground/90 leading-relaxed">
              The arterial line system consists of an intra-arterial cannula, fluid-filled non-compliant tubing, a three-way tap,
              a flush device (300 mmHg pressure bag with heparinised saline delivering 3–4 ml/hr), and the transducer. The system
              must faithfully reproduce the arterial waveform.
            </p>
          </ExamSection>

          <ExamSection id="dynamic-response" exams={["primary", "final", "fficm"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Dynamic Response & Damping</h2>
            <p className="text-foreground/90 leading-relaxed">
              The monitoring system has a <strong>natural (resonant) frequency</strong> — ideally &gt;40 Hz to exceed the
              highest harmonic of the arterial waveform (~10th harmonic). The <strong>damping coefficient</strong> (ζ) describes
              how quickly oscillations decay after a step change. Optimal damping (ζ = 0.64) provides the best balance.
            </p>
            <div className="bg-secondary/30 rounded-lg p-4 mt-3 border border-border">
              <p className="text-sm font-medium text-foreground">Over-damping vs Under-damping</p>
              <p className="text-sm text-muted-foreground mt-1">
                <strong>Over-damped</strong> (air bubbles, clot, kink, compliant tubing): sluggish waveform, underestimates systolic,
                overestimates diastolic. <strong>Under-damped</strong> (long stiff tubing): resonant artefact, overestimates systolic,
                underestimates diastolic. Mean arterial pressure is least affected by damping artefact.
              </p>
            </div>
          </ExamSection>

          <ExamSection id="nibp" exams={["primary", "final"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Non-Invasive Blood Pressure (NIBP)</h2>
            <p className="text-foreground/90 leading-relaxed">
              The <strong>oscillometric method</strong> detects oscillations in cuff pressure during deflation. Maximum oscillation
              amplitude corresponds to MAP. Systolic and diastolic are calculated algorithmically. Cuff width should be ~40% of
              arm circumference — too narrow overestimates, too wide underestimates.
            </p>
            <p className="text-foreground/90 leading-relaxed mt-3">
              <strong>Von Recklinghausen oscillotonometer</strong> uses two cuffs (occluding and sensing) and was the precursor to
              modern automated oscillometry.
            </p>
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
          </ExamSection>
        </>
      }
    />
  );
};

export default PressureMeasurementTopic;

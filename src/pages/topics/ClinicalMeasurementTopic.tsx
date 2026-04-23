import { TopicTemplate } from "@/components/TopicTemplate";
import { clinicalMeasurementQuiz } from "@/data/quizzes";
import ClinicalMeasurementDiagram from "@/components/diagrams/ClinicalMeasurementDiagram";

const objectives = [
  "Set up an invasive arterial line correctly (zeroing, levelling, transducer choice).",
  "Apply the concepts of natural frequency and damping to interpret arterial waveforms.",
  "Diagnose under- and over-damping with the fast-flush square-wave test.",
  "Interpret CVP waveforms (a, c, x, v, y) and recognise pathological patterns.",
  "Compare cardiac output measurement techniques (PAC thermodilution vs non-invasive methods).",
];

const keyPoints = [
  "Arterial transducers use a Wheatstone bridge strain gauge; zero to atmosphere and level to the phlebostatic axis (mid-axillary, 4th ICS)",
  "Natural frequency must be >10× the fundamental frequency of the arterial waveform (ideally >200 Hz) to avoid resonance artefact",
  "Optimal damping coefficient = 0.64 — flat frequency response with no overshoot; assessed by the fast flush (square wave) test",
  "Underdamped: >2 oscillations after flush → overestimates SBP; Overdamped: no oscillations → underestimates SBP; MAP preserved in both",
  "CVP waveform: a (atrial contraction), c (tricuspid closure), x (atrial relaxation), v (passive filling), y (rapid emptying)",
  "PAC thermodilution is the clinical gold standard for CO measurement; Stewart-Hamilton equation: CO inversely proportional to area under curve",
  "Non-invasive CO methods: oesophageal Doppler (VTI × CSA × HR), LiDCO, FloTrac, thoracic bioimpedance, echocardiography",
];

const ClinicalMeasurementTopic = () => {
  return (
    <TopicTemplate
      title="Clinical Measurement"
      subtitle="Invasive arterial monitoring, natural frequency and damping, CVP, and cardiac output techniques"
      backPath="/physics"
      backLabel="Physics"
      accentColor="text-physics"
      topicId="clinical-measurement"
      topicTitle="Clinical Measurement"
      objectives={objectives}
      keyPoints={keyPoints}
      quizQuestions={clinicalMeasurementQuiz}
      diagrams={<ClinicalMeasurementDiagram />}
      sectionExamMapping={{
        objectives: { exams: ["primary", "final"] },
        diagrams: { exams: ["primary", "final"] },
        keyPoints: { exams: ["primary", "final"] },
      }}
      sectionSources={{
        objectives: ["Cross & Plunkett Ch.16", "Middleton Ch.18"],
        diagrams: ["BJA Educ 2005"],
        keyPoints: ["Cross & Plunkett Ch.16", "Middleton Ch.18", "BJA Educ 2005"],
      }}
      coreConcepts={
        <>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Introduction</h2>
          <p className="text-muted-foreground leading-relaxed">
            Clinical measurement of haemodynamic parameters is fundamental to anaesthetic and critical care practice. Invasive
            arterial monitoring provides beat-to-beat blood pressure measurement and waveform analysis, while central venous
            pressure monitoring offers information about right heart filling and fluid status. Cardiac output measurement
            ranges from highly invasive (pulmonary artery catheter) to non-invasive (echocardiography, bioimpedance). Understanding
            the physics of transducer systems — particularly natural frequency and damping — is essential for accurate
            interpretation and is a core Primary FRCA topic.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Interactive Diagrams</h2>
          <ClinicalMeasurementDiagram />
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Invasive Arterial Monitoring</h2>
          <div className="text-muted-foreground leading-relaxed space-y-3">
            <p>
              The arterial transducer system converts a pressure signal into an electrical signal using a <strong>strain gauge</strong> arranged
              in a <strong>Wheatstone bridge</strong> configuration. Pressure changes deflect a diaphragm, altering resistance in the strain
              gauge elements, which produces a proportional voltage change. The system requires <strong>stiff, short, wide-bore tubing</strong> (ideally
              &lt;120 cm) filled with saline and free of air bubbles to maintain an adequate frequency response.
            </p>
            <p>
              The transducer must be <strong>zeroed</strong> (opened to atmosphere to set the reference point) and <strong>levelled</strong> to
              the <strong>phlebostatic axis</strong> — the level of the right atrium, approximated by the mid-axillary line at the 4th
              intercostal space. If the transducer is positioned below this level, hydrostatic pressure is added and readings are
              falsely high; if above, readings are falsely low. Approximately 1.3 cmH₂O (1 mmHg) error per centimetre of displacement.
            </p>
            <p>
              The arterial waveform shows <strong>systolic amplification</strong> in distal arteries — systolic pressure increases and
              diastolic pressure decreases as the waveform moves peripherally, due to wave reflection and decreased arterial compliance.
              Crucially, <strong>MAP is preserved</strong> and is the most reliable parameter for clinical decisions.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Natural Frequency & Damping</h2>
          <div className="text-muted-foreground leading-relaxed space-y-3">
            <p>
              Every transducer system has a <strong>natural (resonant) frequency</strong> — the frequency at which it oscillates
              maximally in response to an input signal. The arterial waveform is a complex wave comprising a fundamental frequency
              (equal to heart rate) plus 6–8 harmonics. To reproduce the waveform faithfully, the system's natural frequency must
              be at least <strong>10× the fundamental frequency</strong> — typically &gt;200 Hz.
            </p>
            <p>
              <strong>Damping</strong> describes the tendency of the system to resist oscillation. The <strong>damping coefficient (D)</strong> of
              0.64 is optimal, providing a flat frequency response up to the natural frequency. An <strong>underdamped</strong> system
              (D &lt; 0.64) exhibits excessive oscillation (ringing), overestimating systolic and underestimating diastolic pressure.
              An <strong>overdamped</strong> system (D &gt; 0.64) has a sluggish response, underestimating systolic and overestimating
              diastolic pressure. In both cases, MAP remains relatively accurate.
            </p>
            <p>
              The <strong>fast flush (square wave) test</strong> assesses system dynamics at the bedside. A brief flush followed by
              rapid release produces oscillations: 1–2 oscillations before returning to the waveform indicates optimal damping;
              &gt;2 oscillations suggests underdamping; absence of oscillations suggests overdamping. Common causes of underdamping
              include long tubing, compliant tubing, and additional stopcocks. Causes of overdamping include air bubbles, blood clots,
              kinked tubing, and a partially closed stopcock.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Central Venous Pressure</h2>
          <div className="text-muted-foreground leading-relaxed space-y-3">
            <p>
              The CVP waveform reflects right atrial pressure changes during the cardiac cycle. It comprises three positive waves
              (<strong>a, c, v</strong>) and two descents (<strong>x, y</strong>). The <strong>a wave</strong> represents atrial
              contraction (absent in AF; giant in tricuspid stenosis and pulmonary hypertension). The <strong>c wave</strong> is
              caused by tricuspid valve closure bulging into the atrium. The <strong>x descent</strong> represents atrial relaxation
              and descent of the tricuspid annulus during ventricular systole.
            </p>
            <p>
              The <strong>v wave</strong> occurs during passive atrial filling against the closed tricuspid valve (giant v waves
              indicate tricuspid regurgitation). The <strong>y descent</strong> represents rapid atrial emptying after the tricuspid
              valve opens — it is steep and prominent in constrictive pericarditis (Friedreich's sign) and absent in tamponade.
            </p>
            <p>
              Normal CVP is <strong>0–8 mmHg</strong>, measured at end-expiration and zeroed to the right atrial level. While useful
              for trending, CVP is a <strong>poor predictor of fluid responsiveness</strong> — dynamic measures such as pulse pressure
              variation (PPV), stroke volume variation (SVV), and passive leg raise are more reliable.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Cardiac Output Measurement</h2>
          <div className="text-muted-foreground leading-relaxed space-y-3">
            <p>
              <strong>Pulmonary artery catheter (PAC) thermodilution</strong> remains the clinical reference standard. A known volume
              of cold saline is injected into the right atrium, and the resulting temperature change is measured by a thermistor at the
              PA tip. The <strong>modified Stewart-Hamilton equation</strong> calculates CO: it is inversely proportional to the area
              under the thermodilution curve. A large area indicates low CO; a small area indicates high CO.
            </p>
            <p>
              <strong>Transpulmonary thermodilution</strong> (PiCCO, VolumeView) uses a central venous injection with an arterial
              thermistor, providing CO plus volumetric parameters (GEDV, EVLW) and continuous pulse contour analysis. The
              <strong>Fick principle</strong> — CO = VO₂ / (CaO₂ − CvO₂) — is the theoretical gold standard but impractical for
              routine clinical use as it requires measurement of oxygen consumption and mixed venous oxygen content.
            </p>
            <p>
              Less invasive options include <strong>oesophageal Doppler</strong> (measures aortic blood flow velocity to derive CO
              from CSA × VTI × HR), <strong>LiDCO</strong> (lithium dilution calibration with pulse power analysis),
              <strong>FloTrac/Vigileo</strong> (uncalibrated arterial waveform analysis), and <strong>echocardiography</strong> (LVOT
              method: CO = π(d/2)² × VTI × HR). Each method has specific limitations, and no single technique is ideal for all
              clinical scenarios.
            </p>
          </div>
        </div>
        </>
      }
    />
  );
};

export default ClinicalMeasurementTopic;

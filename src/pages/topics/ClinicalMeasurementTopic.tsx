import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { ExamSection } from "@/components/exam/ExamSection";
import { clinicalMeasurementQuiz } from "@/data/quizzes";
import ClinicalMeasurementDiagram from "@/components/diagrams/physics/ClinicalMeasurementDiagram";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { InlineRef } from "@/components/references/InlineRef";

const clinicalMeasurementFaqs: Array<[string, string]> = [
  [
    "Define accuracy, precision, drift and hysteresis.",
    "Accuracy — closeness to the true value. Precision — reproducibility (low scatter on repeat measurement); a device can be precise but inaccurate (systematic bias). Drift — slow change in reading over time with no change in input (corrected by re-calibration). Hysteresis — different reading depending on whether the input is rising or falling."
  ],
  [
    "What is the difference between a static and dynamic response of a measurement system?",
    "Static response — calibration, linearity, sensitivity, accuracy under steady conditions. Dynamic response — how quickly the system tracks a changing input: characterised by natural frequency, damping coefficient and time constant. A pressure transducer with poor dynamic response may give the correct mean but distort the waveform."
  ],
  [
    "What does it mean to 'zero' and 'calibrate' a transducer?",
    "Zeroing — setting the output to 0 when input is at a reference value (e.g. arterial line transducer open to atmosphere at the phlebostatic axis). Calibration — applying a known input and adjusting gain so output matches (modern transducers are factory-calibrated and need only zeroing). Recalibrate after any disconnect or after large shifts in transducer height."
  ]
];

const objectives = [
  "Set up an invasive arterial line correctly (zeroing, levelling, transducer choice).",
  "Apply the concepts of natural frequency and damping to interpret arterial waveforms.",
  "Diagnose under- and over-damping with the fast-flush square-wave test.",
  "Interpret CVP waveforms (a, c, x, v, y) and recognise pathological patterns.",
  "Compare cardiac output measurement techniques (PAC thermodilution vs non-invasive methods).",
];

const keyPoints = [
  { text: "Arterial transducers use a Wheatstone bridge strain gauge; zero to atmosphere and level to the phlebostatic axis (mid-axillary, 4th ICS)", cites: ["Cross & Plunkett Ch.16"] },
  { text: "Natural frequency must be >10× the fundamental frequency of the arterial waveform (ideally >200 Hz) to avoid resonance artefact", cites: ["BJA Educ 2005"] },
  { text: "Optimal damping coefficient = 0.64 — flat frequency response with no overshoot; assessed by the fast flush (square wave) test", cites: ["Middleton Ch.18"] },
  { text: "Underdamped: >2 oscillations after flush → overestimates SBP; Overdamped: no oscillations → underestimates SBP; MAP preserved in both", cites: ["Cross & Plunkett Ch.16"] },
  { text: "CVP waveform: a (atrial contraction), c (tricuspid closure), x (atrial relaxation), v (passive filling), y (rapid emptying)", cites: ["BJA Educ 2005"] },
  { text: "PAC thermodilution is the clinical gold standard for CO measurement; Stewart-Hamilton equation: CO inversely proportional to area under curve", cites: ["Middleton Ch.18"] },
  { text: "Non-invasive CO methods: oesophageal Doppler (VTI × CSA × HR), LiDCO, FloTrac, thoracic bioimpedance, echocardiography", cites: ["Cross & Plunkett Ch.16"] },
];

const ClinicalMeasurementTopicWorkedExamples: WorkedExample[] = [
  {
    title: "Interpreting a Bland–Altman plot for a new cardiac output monitor",
    scenario: "A new pulse-contour device is compared to thermodilution in 50 patients. Bland–Altman shows bias +0.4 L/min, 95% limits of agreement ±1.8 L/min, percentage error 38%. Should it replace thermodilution?",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>Distinguish bias (mean difference) from precision (SD of differences) — bias is correctable, precision is not</li>
          <li>Critchley & Critchley: a new CO method is acceptable if percentage error ≤30% versus reference</li>
          <li>Compute: (1.96 × SD) / mean CO × 100 = percentage error — here 38% exceeds the threshold</li>
          <li>Bland–Altman plot detects proportional bias (slope) and outliers that correlation coefficients hide</li>
          <li>Reject as a one-to-one replacement; may still be useful for trending if concordance &gt;92%</li>
        </ol>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
          <li>Using Pearson r to validate agreement — r measures association, not agreement</li>
          <li>Ignoring the reference's own precision (~20% for bolus thermodilution)</li>
          <li>Extrapolating beyond the studied CO range</li>
          </ul>
        </div>
      </div>
    ),
    answer: "Percentage error 38% > 30% — fails Critchley criteria for interchangeability. May be acceptable for trend monitoring only.",
    cites: ["Cross & Plunkett Ch.16", "Middleton Ch.18", "BJA Educ 2005"],
  },
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
      workedExamples={ClinicalMeasurementTopicWorkedExamples}
      objectives={objectives}
      keyPoints={keyPoints}
      quizQuestions={clinicalMeasurementQuiz}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY, Exam.FINAL] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL] },
      }}
      sectionSources={{
        objectives: ["Cross & Plunkett Ch.16", "Middleton Ch.18"],
        keyPoints: ["Cross & Plunkett Ch.16", "Middleton Ch.18", "BJA Educ 2005"],
      }}
      coreConcepts={
        <>
        <ExamSection exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} className="scroll-mt-24">

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
              Crucially, <strong>MAP is preserved</strong> and is the most reliable parameter for clinical decisions. The <strong>anacrotic
              notch</strong> is a small inflection on the <em>ascending</em> limb that marks aortic valve opening (before peak systolic
              pressure); the <strong>dicrotic notch</strong> on the descending limb corresponds to aortic valve closure
              <InlineRef topicId="clinical-measurement" refLabel="LITFL Arterial Waveform" />
              <InlineRef topicId="clinical-measurement" refLabel="Deranged Physiology Arterial Line" />.
            </p>
          </div>
          <div className="mt-4 rounded-lg border border-border p-4"><h3 className="font-semibold text-foreground">Complications</h3><p className="mt-2 text-sm text-muted-foreground">Local or proximal thrombosis can cause distal ischaemia and necrosis; thrombus or air may embolise. Other complications include haemorrhage, haematoma, local infection or bacteraemia, accidental intra-arterial drug injection, adjacent nerve injury and pseudoaneurysm. Use asepsis, secure all ports and remove the cannula when no longer required. <InlineRef topicId="clinical-measurement" refLabel="Cross & Plunkett Ch.16" /></p></div>
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
            <p><strong>Pathological patterns:</strong> cannon a waves arise when the atrium contracts against a closed tricuspid valve in AV dissociation—junctional rhythm, complete heart block or ventricular pacing. Large a waves also occur with tricuspid or pulmonary stenosis, pulmonary hypertension and RV hypertrophy. Tricuspid regurgitation produces a large systolic c–v wave with “ventricularisation” and loss of the x descent. Constrictive pericarditis produces prominent x and y descents (the M/W or “steeple” pattern); tamponade preserves x but blunts or abolishes y, while RV ischaemia can also blunt y. <InlineRef topicId="clinical-measurement" refLabel="Cross & Plunkett Ch.16" /></p>
            <p>
              Normal CVP is <strong>0–8 mmHg</strong>, measured at end-expiration and zeroed to the right atrial level. While useful
              for trending, CVP is a <strong>poor predictor of fluid responsiveness</strong> — dynamic measures such as pulse pressure
              variation (PPV), stroke volume variation (SVV), and passive leg raise are more reliable.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Dynamic Indices of Fluid Responsiveness</h2>
          <div className="text-muted-foreground leading-relaxed space-y-3">
            <p>
              <strong>Physiological basis:</strong> pulse pressure variation (PPV) and stroke volume variation (SVV) arise from
              heart–lung interaction during positive-pressure ventilation. Each mechanical breath raises intrathoracic pressure,
              reducing venous return and right ventricular preload while transiently squeezing pulmonary blood into the left
              ventricle; a few beats later left ventricular stroke volume falls. The size of this cyclical swing depends on where
              both ventricles sit on the Frank–Starling curve <InlineRef topicId="clinical-measurement" refLabel="Michard & Teboul 2002" />.
            </p>
            <p>
              <strong>Interpretation:</strong> PPV = (PP<sub>max</sub> − PP<sub>min</sub>)/[(PP<sub>max</sub> + PP<sub>min</sub>)/2] × 100; SVV uses the same equation with SV<sub>max</sub> and SV<sub>min</sub>. A value above
              roughly <strong>12–13%</strong> indicates that both ventricles are on the steep part of the curve and the patient is
              likely to increase stroke volume with a fluid bolus; values below ~9% predict non-response, with a "grey zone" in
              between <InlineRef topicId="clinical-measurement" refLabel="Marik CCM 2009 (PPV)" />.
            </p>
            <div className="rounded-lg border border-border p-4">
              <h3 className="font-semibold text-foreground">Prerequisites and limitations</h3>
              <ul className="mt-2 list-disc pl-5 text-sm space-y-1">
                <li>Fully controlled mechanical ventilation with no spontaneous effort (triggered breaths invalidate the swing).</li>
                <li>Tidal volume ≥8 mL/kg predicted body weight; low tidal volumes under-read PPV.</li>
                <li>Regular sinus rhythm — atrial fibrillation or frequent ectopics produce beat-to-beat variation unrelated to preload.</li>
                <li>Closed chest and normal intra-abdominal pressure; open thorax and raised IAP distort transmission.</li>
                <li>Unreliable in right ventricular failure, very high PEEP, low lung compliance and with vasoactive changes in tone.</li>
                <li>Alternatives when prerequisites fail: passive leg raise, end-expiratory occlusion test or a 100–250 mL mini-fluid challenge with cardiac output monitoring.</li>
              </ul>
            </div>
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
              thermistor, providing CO plus volumetric parameters. <strong>GEDV</strong> sums end-diastolic volumes of all four chambers and indexes preload (GEDI normally 680–800 mL/m²). <strong>EVLW</strong> quantifies pulmonary oedema (EVLWI normally 3–7 mL/kg predicted body weight). Both are derived from thermodilution transit times alongside CO and can guide fluid strategy in shock and ARDS. <InlineRef topicId="clinical-measurement" refLabel="Middleton Ch.18" />
            </p>
            <p><strong>Fick principle:</strong> organ blood flow equals uptake or release of a substance divided by its arteriovenous concentration difference: CO = VO₂/(CaO₂−CvO₂). VO₂ is measured from inspired/expired gas with a metabolic cart; CaO₂ and true mixed-venous CvO₂ (sampled from a PA catheter) use O₂ content = (1.34×Hb×saturation)+(0.003×PO₂). Indirect Fick substitutes estimated VO₂; CO₂ rebreathing applies the same conservation principle to CO₂. <InlineRef topicId="clinical-measurement" refLabel="Cross & Plunkett Ch.16" /></p>
            <p>
              Less invasive options include <strong>oesophageal Doppler</strong> (measures aortic blood flow velocity to derive CO
              from CSA × VTI × HR), <strong>LiDCO</strong> (lithium dilution calibration with pulse power analysis),
              <strong>FloTrac/Vigileo</strong> (uncalibrated arterial waveform analysis), and <strong>echocardiography</strong> (LVOT
              method: CO = π(d/2)² × VTI × HR). Each method has specific limitations, and no single technique is ideal for all
              clinical scenarios.
            </p>
            <p><strong>Pulse contour analysis</strong> derives stroke volume from the systolic arterial-waveform area/pulse pressure and a model of vascular impedance. Calibrated LiDCO uses lithium dilution to generate a patient-specific scaling factor for pulse-power analysis. Uncalibrated FloTrac estimates impedance from pressure variability plus age, sex, height and weight. Both require a clean waveform and become less reliable with arrhythmia, profound instability or rapidly changing vascular tone, including sepsis and vasopressors. <InlineRef topicId="clinical-measurement" refLabel="BJA Educ 2005" /></p>
            <p><strong>Thoracic bioimpedance</strong> applies a high-frequency, low-amplitude current between electrodes on the neck and lower thorax. Because blood has relatively low impedance, beat-to-beat thoracic impedance changes; stroke volume is derived principally from the maximum rate of change, dZ/dt. <strong>Bioreactance</strong> instead measures the phase shift of the transmitted current and is less sensitive to amplitude noise from movement and electrical interference. Both are non-invasive and continuous, but pleural effusions, pulmonary oedema, aortic regurgitation, major movement and diathermy reduce accuracy. <InlineRef topicId="clinical-measurement" refLabel="Middleton Ch.18" /></p>
            <div className="mt-2 grid gap-3 sm:grid-cols-2 text-sm">
              <div className="rounded-lg border border-border p-3">
                <p className="font-semibold text-foreground">PAC — measured variables</p>
                <p className="mt-1">CVP (right atrial pressure), pulmonary artery systolic/diastolic/mean pressure, pulmonary artery occlusion ("wedge") pressure, cardiac output by thermodilution, mixed venous saturation (SvO₂) and core blood temperature.</p>
              </div>
              <div className="rounded-lg border border-border p-3">
                <p className="font-semibold text-foreground">PAC — derived variables</p>
                <p className="mt-1">Cardiac index, stroke volume and stroke volume index, systemic vascular resistance ((MAP−CVP)×80/CO), pulmonary vascular resistance ((mPAP−PAOP)×80/CO), oxygen delivery (DO₂) and consumption (VO₂), and right/left ventricular stroke work index.</p>
              </div>
              <div className="rounded-lg border border-border p-3">
                <p className="font-semibold text-foreground">Waveforms on insertion</p>
                <p className="mt-1">Right atrium: low amplitude 0–8 mmHg with a/c/v waves. Right ventricle: systolic step-up to ~25 mmHg with a low diastolic pressure and upsloping diastole. Pulmonary artery: same systolic pressure but diastolic rises to ~10 mmHg with a dicrotic notch. Wedge: damped trace ~6–12 mmHg on balloon inflation, returning to a PA trace on deflation <InlineRef topicId="clinical-measurement" refLabel="NEJM 2013 (PAC)" />.</p>
              </div>
              <div className="rounded-lg border border-border p-3">
                <p className="font-semibold text-foreground">Indications and contraindications</p>
                <p className="mt-1">Considered in complex cardiac surgery, severe pulmonary hypertension or right ventricular failure, refractory cardiogenic or mixed shock, transplant assessment and to titrate therapy when less invasive monitors are unreliable. Avoid with tricuspid or pulmonary stenosis, prosthetic tricuspid/pulmonary valves, right-sided mass or thrombus, and in severe untreated coagulopathy or complete heart block without pacing back-up.</p>
              </div>
              <div className="rounded-lg border border-border p-3 sm:col-span-2">
                <p className="font-semibold text-foreground">Complications</p>
                <p className="mt-1">Arrhythmia (especially transient RV ectopy or ventricular tachycardia) and right bundle branch block during passage; central venous access complications (pneumothorax, arterial puncture); catheter knotting or entrapment; balloon rupture and air embolism; valvular or endocardial damage; pulmonary infarction from persistent wedging; catheter-related bloodstream infection; and rare but frequently fatal pulmonary artery rupture — never over-inflate the balloon and never wedge for longer than a few respiratory cycles.</p>
              </div>
            </div>
          </div>
        </div>
          <ExamPitfallsCallout
            accent="physics"
            pitfalls={[
              "Optimal damping coefficient ≈ 0.64; natural frequency should be ≥10× the fundamental of the waveform (≈40 Hz at HR 150).",
              "Square-wave (fast-flush) test: 1–2 oscillations before return = optimal; many oscillations = under-damped; sluggish = over-damped.",
              "CVP waveform a/c/v waves and x/y descents reflect right-heart events; cannon a waves suggest AV dissociation.",
              "Thermodilution (Stewart–Hamilton): area under the temperature–time curve is inversely proportional to cardiac output.",
              "Always level the transducer to the phlebostatic axis; raising it by 10 cm under-reads pressure by ~7 mmHg.",
            ]}
          />
        </ExamSection>
          <TopicFaqs faqs={clinicalMeasurementFaqs} />
        </>
      }
    />
  );
};

export default ClinicalMeasurementTopic;

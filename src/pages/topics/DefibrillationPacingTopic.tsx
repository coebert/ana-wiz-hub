import { TopicTemplate } from "@/components/TopicTemplate";
import { ExamSection } from "@/components/ExamSection";
import { WorkedExample } from "@/components/WorkedExamples";
import DefibrillationPacingDiagram from "@/components/diagrams/DefibrillationPacingDiagram";
import { defibrillationPacingQuiz } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";

const objectives = [
  "Compare monophasic and biphasic defibrillation waveforms in terms of energy, efficacy and myocardial injury",
  "List the determinants of transthoracic impedance and the manoeuvres that reduce it",
  "Decode the 5-position NBG pacemaker code and recognise the common modes (VVI, DDD, AAI, VOO/DOO)",
  "Predict pacemaker behaviour in response to magnet application and identify when it is unsafe",
  "Plan a perioperative strategy for patients with pacemakers and ICDs to minimise EMI-related harm",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Energy delivered by a defibrillator capacitor",
    scenario:
      "A defibrillator stores energy in a 32 µF capacitor charged to 5,000 V. Calculate the stored energy and explain why the patient does not receive the full amount.",
    working:
      "E = ½CV² = ½ × 32 × 10⁻⁶ × (5000)² = 0.5 × 32 × 10⁻⁶ × 2.5 × 10⁷ = 400 J.\nDelivered energy depends on transthoracic impedance (TTI). With TTI ≈ 75 Ω only ~4% of charge crosses the myocardium; biphasic devices use impedance compensation to deliver a consistent transmyocardial current.",
    answer:
      "Stored energy is 400 J. The 'selected energy' on the front panel (e.g. 200 J) is the energy actually delivered into a 50 Ω test load — only a small fraction (≈4%) reaches the heart, which is why pad contact, expiration phase and gel use matter so much.",
  },
  {
    title: "Pacemaker patient for elective laparoscopic cholecystectomy",
    scenario:
      "A 78-year-old DDD-paced for complete heart block is listed for laparoscopic cholecystectomy. The surgeon plans monopolar diathermy to the abdomen. Outline the perioperative plan.",
    working:
      "Pre-op: device interrogation within 6–12 months, identify pacing dependence, document mode and battery, contact cardiac physiology team.\nIntra-op: external defib pads on; bipolar diathermy if possible; if monopolar — short bursts <5 s, return pad on the thigh so current vector avoids the generator; magnet over generator converts most pacemakers to DOO (asynchronous) and prevents EMI-induced inhibition.\nMonitoring: ECG + plethysmography (confirms cardiac output during EMI artefact); arterial line considered.\nPost-op: re-interrogate before discharge to home / ward to confirm settings unchanged and reset to original mode.",
    answer:
      "Pre-op interrogation, intra-op magnet (DOO), bipolar diathermy where feasible with the return pad on the thigh, defib pads attached, plethysmographic confirmation of perfusion, and post-op reinterrogation. ICD patients additionally need anti-tachycardia therapies disabled before incision.",
  },
];

const DefibrillationPacingTopic = () => {
  return (
    <TopicTemplate
      title="Defibrillation & Pacing"
      subtitle="Monophasic vs biphasic waveforms, transthoracic impedance, pacemaker modes, and electromagnetic interference"
      backPath="/physics"
      backLabel="Physics"
      accentColor="text-physics"
      topicId="defibrillation-pacing"
      topicTitle="Defibrillation & Pacing"
      objectives={objectives}
      workedExamples={workedExamples}
      quizQuestions={defibrillationPacingQuiz}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM], curriculumCodes: ["RCoA Primary — Physics", "RCoA Final — Physics", "FFICM 2.5"] },
        workedExamples: { exams: [Exam.FINAL, Exam.FFICM] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM] },
      }}
      sectionSources={{
        workedExamples: ["Resuscitation Council UK 2021"],
      }}
      keyPoints={[
        "Biphasic defibrillators use lower energy (120–200 J vs 360 J monophasic) with equal or superior efficacy and less myocardial damage",
        "Transthoracic impedance (typically 70–80 Ω) determines how much current reaches the heart — only ~4% traverses the myocardium",
        "Factors reducing TTI: gel pads, firm pressure, expiration, larger pads, repeated shocks, and shaving a hairy chest",
        "NBG pacemaker code: 5 positions — I (paced), II (sensed), III (response), IV (rate modulation), V (multisite)",
        "DDD is the most physiological mode; VOO/DOO (asynchronous) is used with magnet application to avoid EMI-induced inhibition",
        "Surgical diathermy is the most common source of EMI — bipolar preferred; monopolar in short bursts with return pad away from generator",
        "ICD patients: disable anti-tachycardia therapies intra-operatively; always re-interrogate post-operatively",
      ]}
      coreConcepts={
        <>
          <ExamSection id="introduction" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Defibrillation delivers a controlled electrical shock to depolarise a critical mass of myocardium simultaneously,
              terminating fibrillation and allowing the sinoatrial node to resume organised pacing. Cardiac pacing provides
              electrical stimulation when the heart's intrinsic conduction system fails. Understanding the physics of energy
              delivery, waveform design, and electromagnetic interference is essential for the Primary FRCA and safe perioperative
              management of patients with cardiac implantable electronic devices (CIEDs).
            </p>
          </ExamSection>

          <ExamSection id="diagram" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-xl font-bold text-foreground mb-4">Interactive Diagrams</h2>
            <DefibrillationPacingDiagram />
          </ExamSection>

          <ExamSection id="waveforms" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Defibrillation Waveforms</h2>
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                <strong>Monophasic damped sinusoidal (MDS)</strong> waveforms deliver current in a single direction. They require
                higher energies (up to 360 J for VF) and do not compensate for varying transthoracic impedance. They have been
                largely superseded by biphasic technology.
              </p>
              <p>
                <strong>Biphasic waveforms</strong> reverse polarity during the shock, delivering current first in one direction
                then the other. Two subtypes exist: <strong>biphasic truncated exponential (BTE)</strong> and <strong>rectilinear
                biphasic (RLB)</strong>. Both achieve equivalent or superior defibrillation success at lower energies (120–200 J),
                causing less myocardial injury and post-shock ST changes.
              </p>
              <p>
                A key advantage of biphasic devices is <strong>impedance compensation</strong> — the waveform automatically adjusts
                its duration and voltage based on measured transthoracic impedance, ensuring consistent current delivery regardless
                of patient characteristics.
              </p>
            </div>
          </ExamSection>

          <ExamSection id="tti" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Transthoracic Impedance</h2>
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                Transthoracic impedance (TTI) is the resistance to current flow across the chest, typically <strong>70–80 Ω</strong> but
                ranging from 15–150 Ω. Only approximately <strong>4% of delivered current</strong> actually traverses the heart — the
                remainder follows alternative pathways through chest wall muscle, lung, and other structures.
              </p>
              <p>
                Factors that <strong>increase impedance</strong> include obesity, hyperinflated lungs (COPD, inspiration), poor
                pad-skin contact, small pad size, and excessive chest hair. Factors that <strong>reduce impedance</strong> include
                self-adhesive gel pads, firm application pressure (~25 lb), defibrillation during expiration, larger pad surface area,
                and successive shocks (transthoracic impedance falls with repeated defibrillation).
              </p>
              <p>
                Pad placement follows the <strong>anterolateral</strong> position: one pad below the right clavicle (right sternal edge)
                and one at the left mid-axillary line (V6 position). Alternative positions include anteroposterior, which may be
                preferred in certain circumstances.
              </p>
            </div>
          </ExamSection>

          <ExamSection id="pacing-modes" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Pacemaker Modes</h2>
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                Pacemakers are classified using the <strong>NASPE/BPEG Generic (NBG) code</strong>, a five-position system describing
                chamber paced (I), chamber sensed (II), response to sensing (III), rate modulation (IV), and multisite pacing (V).
                Letters used include A (atrium), V (ventricle), D (dual), O (none), I (inhibited), T (triggered), and R (rate-responsive).
              </p>
              <p>
                <strong>VVI</strong> (ventricular demand) is the most common single-chamber mode — it paces and senses the ventricle,
                inhibiting output when intrinsic activity is detected. Its main limitation is <strong>pacemaker syndrome</strong> caused
                by loss of AV synchrony. <strong>DDD</strong> is the most physiological mode, pacing and sensing both chambers to
                maintain AV synchrony, and is the mode of choice for complete heart block.
              </p>
              <p>
                Magnet application converts most pacemakers to an <strong>asynchronous mode</strong> (VOO or DOO) — fixed-rate pacing
                without sensing. This eliminates the risk of EMI-induced inhibition during surgery. The magnet rate also provides
                information about battery status (rate decreases as battery depletes).
              </p>
            </div>
          </ExamSection>

          <ExamSection id="emi" exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["FFICM 2.5"]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Electromagnetic Interference</h2>
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                <strong>Surgical diathermy</strong> is the most significant source of EMI in the operating theatre. Monopolar diathermy
                poses the greatest risk as current passes through the body between the active electrode and return pad. EMI can cause
                inappropriate <strong>inhibition</strong> (pacemaker interprets diathermy as cardiac activity and withholds pacing) or
                <strong>inappropriate tracking</strong> (device interprets EMI as atrial activity and paces the ventricle rapidly).
              </p>
              <p>
                For patients with <strong>ICDs</strong>, anti-tachycardia therapies must be disabled intra-operatively (via magnet
                application or reprogramming) to prevent inappropriate shock delivery triggered by diathermy artefact. External
                defibrillation pads must be applied before disabling the ICD.
              </p>
              <p>
                Key perioperative precautions include using <strong>bipolar diathermy</strong> where possible, placing the return pad
                away from the generator, using short bursts (&lt;5 seconds), and maintaining continuous monitoring with ECG, pulse
                oximetry, and ideally arterial blood pressure. All devices must be <strong>re-interrogated post-operatively</strong> to
                confirm settings and function.
              </p>
            </div>
          </ExamSection>
        </>
      }
    />
  );
};

export default DefibrillationPacingTopic;

import { TopicTemplate } from "@/components/TopicTemplate";
import { ExamSection } from "@/components/ExamSection";
import { WorkedExample } from "@/components/WorkedExamples";
import UltrasoundPhysicsDiagram from "@/components/diagrams/UltrasoundPhysicsDiagram";
import { ultrasoundPhysicsQuiz } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/ExamPitfallsCallout";

const objectives = [
  "Explain the piezoelectric effect and the components of a clinical ultrasound transducer",
  "Justify probe selection from the frequency–penetration trade-off (linear vs curvilinear vs phased array)",
  "Apply the Doppler equation (Δf = 2f₀v cos θ / c) and recognise aliasing on PW Doppler",
  "Distinguish CW, PW, colour and power Doppler in terms of velocity range and depth resolution",
  "Identify the common B-mode artefacts (shadowing, enhancement, A-lines, B-lines, lung sliding) and their clinical meaning",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Probe choice for ultrasound-guided supraclavicular block",
    scenario:
      "Choosing between a linear high-frequency probe (12 MHz) and a curvilinear probe (3.5 MHz) for a supraclavicular brachial plexus block in an adult.",
    working:
      "Target depth at the supraclavicular fossa ≈ 1–3 cm.\nAttenuation ≈ 0.5 dB/cm/MHz × 2 ways → at 12 MHz over 3 cm round trip = 36 dB attenuation (acceptable, image still bright).\nAxial resolution at 12 MHz ≈ wavelength × ½ × cycles ≈ 0.13 mm × 1 ≈ 0.13 mm — easily resolves individual hypoechoic nerve fascicles.\nAt 3.5 MHz axial resolution ≈ 0.4 mm — fascicles less distinct but probe penetrates 15–20 cm.",
    answer:
      "Use the high-frequency linear probe. The plexus is shallow, so penetration is not limiting and axial resolution at 12 MHz allows fine needle-tip and fascicular discrimination. Reserve curvilinear/phased array probes for deeper structures (FAST, abdominal, cardiac).",
  },
  {
    title: "Aliasing on PW Doppler at the LVOT",
    scenario:
      "PW Doppler at the LVOT in a patient with HOCM shows the velocity envelope wrapping around the baseline at a Nyquist limit of 0.8 m/s. Estimate true peak velocity and choose a remedy.",
    working:
      "Aliasing occurs when Doppler shift > Nyquist limit = PRF/2.\nNyquist = 0.8 m/s → true velocity exceeds this and is mis-displayed in the opposite direction.\nOptions: (1) increase PRF (raises Nyquist); (2) shift baseline to use full negative scale; (3) reduce sample depth (deeper sample → lower max PRF); (4) switch to CW Doppler — no aliasing, but loses depth specificity.",
    answer:
      "True velocity is greater than the Nyquist limit. Use CW Doppler aligned through the LVOT to obtain an unaliased peak velocity (often 4–6 m/s in HOCM). Apply the simplified Bernoulli (ΔP = 4v²) to estimate the dynamic LVOT gradient.",
  },
];

const UltrasoundPhysicsTopic = () => {
  return (
    <TopicTemplate
      title="Ultrasound Physics"
      subtitle="Piezoelectric effect, frequency–resolution trade-off, Doppler, and artefacts"
      backPath="/physics"
      backLabel="Physics"
      accentColor="text-physics"
      topicId="ultrasound-physics"
      topicTitle="Ultrasound Physics"
      objectives={objectives}
      workedExamples={workedExamples}
      quizQuestions={ultrasoundPhysicsQuiz}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM], curriculumCodes: ["RCoA Primary — Physics", "RCoA Final — Physics", "FFICM 2.5"] },
        workedExamples: { exams: [Exam.FINAL, Exam.FFICM] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM] },
      }}
      sectionSources={{
        workedExamples: ["BJA Educ 2017", "BJA Educ 2017"],
      }}
      keyPoints={[
        "Piezoelectric crystals (PZT) convert electrical to mechanical energy (transmit) and vice versa (receive) — the basis of all ultrasound transducers",
        "Higher frequency → better axial resolution but less penetration; axial resolution = SPL/2",
        "Speed of sound in soft tissue is assumed to be 1,540 m/s for depth calculations",
        "Doppler equation: Δf = 2f₀v cos θ / c — angle of insonation must be <60° for accurate velocity measurement",
        "CW Doppler has no aliasing but no depth discrimination; PW Doppler is depth-specific but aliases above Nyquist limit (PRF/2)",
        "A-lines (reverberation) = normal aerated lung; B-lines (comet tail) = interstitial oedema; absent lung sliding → pneumothorax",
        "Acoustic shadowing occurs behind bone/calculi; posterior enhancement occurs behind fluid-filled structures",
      ]}
      coreConcepts={
        <>
          <ExamSection id="introduction" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Ultrasound has become indispensable in anaesthesia and critical care — from vascular access and nerve blocks to
              focused echocardiography and lung assessment. Understanding the underlying physics enables optimal image acquisition,
              appropriate probe selection, and correct interpretation of artefacts. This topic is heavily examined in both
              Primary and Final FRCA.
            </p>
          </ExamSection>

          <ExamSection id="diagram" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-xl font-bold text-foreground mb-4">Interactive Diagrams</h2>
            <UltrasoundPhysicsDiagram />
          </ExamSection>

          <ExamSection id="piezoelectric" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Piezoelectric Effect & Transducer Design</h2>
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                Ultrasound transducers use <strong>piezoelectric crystals</strong> (typically lead zirconate titanate — PZT) that
                exhibit two complementary effects: the <strong>reverse piezoelectric effect</strong> (applying alternating voltage
                causes crystal vibration → ultrasound production) and the <strong>direct piezoelectric effect</strong> (returning
                echoes deform the crystal → generate voltage for image formation).
              </p>
              <p>
                The transducer spends approximately 1% of time transmitting and 99% receiving (listening for echoes). Key components
                include: the <strong>backing/damping material</strong> (shortens pulse duration → improves axial resolution), the
                <strong> matching layer</strong> (λ/4 thickness, reduces impedance mismatch between crystal and skin), and the
                <strong> acoustic lens</strong> (focuses the beam laterally).
              </p>
            </div>
          </ExamSection>

          <ExamSection id="resolution" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Frequency, Resolution & Penetration</h2>
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                The fundamental trade-off in ultrasound is between <strong>resolution and penetration</strong>. Higher frequency
                produces shorter wavelengths and better resolution, but higher frequency waves are attenuated more rapidly by tissue
                (~0.5 dB/cm/MHz), limiting penetration depth.
              </p>
              <p>
                <strong>Axial resolution</strong> (along the beam) = spatial pulse length / 2 = (number of cycles × wavelength) / 2.
                It is improved by higher frequency and better damping. <strong>Lateral resolution</strong> (perpendicular to beam)
                equals beam width and is best at the focal zone. <strong>Elevational (slice thickness) resolution</strong> depends
                on the transducer element height.
              </p>
              <p>
                Clinical probe selection: <strong>linear 6–15 MHz</strong> for superficial structures (nerve blocks, vascular access);
                <strong> curvilinear 2–5 MHz</strong> for deep abdominal structures (FAST scan); <strong>phased array 1–5 MHz</strong>
                for cardiac imaging through small acoustic windows.
              </p>
            </div>
          </ExamSection>

          <ExamSection id="doppler" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Doppler Ultrasound</h2>
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                The <strong>Doppler effect</strong> describes the frequency shift when ultrasound reflects off moving red blood cells:
                <strong> Δf = 2f₀v cos θ / c</strong>. The angle of insonation (θ) is critical — at 90° (cos 90° = 0) there is no
                Doppler shift; the angle must be kept <strong>&lt;60°</strong> for accurate velocity measurement (small angle errors
                cause large velocity errors at angles approaching 90°).
              </p>
              <p>
                <strong>CW Doppler</strong> uses separate transmit and receive crystals operating continuously — it can measure
                very high velocities without aliasing but has no depth discrimination. <strong>PW Doppler</strong> uses a single
                crystal alternating between transmit and receive with a sample gate at a specific depth — it is subject to
                <strong> aliasing</strong> when the Doppler shift exceeds the Nyquist limit (PRF/2).
              </p>
              <p>
                <strong>Colour flow Doppler</strong> is PW-based and maps velocity as colour: red toward the transducer, blue away
                (BART convention). It also aliases. <strong>Power Doppler</strong> displays signal amplitude rather than velocity —
                more sensitive to slow flow but gives no directional information.
              </p>
            </div>
          </ExamSection>

          <ExamSection id="artefacts" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Ultrasound Artefacts</h2>
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                <strong>Acoustic shadowing</strong> occurs behind strong reflectors (bone, gallstones, calcified structures) that
                absorb or reflect nearly all ultrasound, creating an anechoic region deep to the structure. Conversely,
                <strong> posterior acoustic enhancement</strong> occurs behind fluid-filled structures (bladder, cysts) where less
                attenuation results in brighter echoes beyond.
              </p>
              <p>
                <strong>Reverberation</strong> produces equidistant parallel lines (A-lines) when ultrasound bounces repeatedly
                between two strong parallel reflectors (e.g., pleura-air interface). In lung ultrasound, A-lines indicate
                <strong> normal aerated lung</strong>. <strong>B-lines</strong> (comet-tail artefact) are vertical hyperechoic lines
                extending from the pleural line to the screen edge without fading — they indicate <strong>interstitial oedema</strong>
                or fluid-thickened interlobular septa. ≥3 B-lines per rib space is pathological.
              </p>
              <p>
                <strong>Lung sliding</strong> (the shimmering movement of the visceral pleura against the parietal pleura with
                respiration) rules out pneumothorax at that point. On M-mode, normal lung sliding produces the
                <strong> "seashore sign"</strong>; absent sliding produces the <strong>"barcode/stratosphere sign"</strong>.
              </p>
            </div>
          </ExamSection>
          <ExamPitfallsCallout
            accent="physics"
            pitfalls={[
              "Frequency vs resolution vs penetration: higher frequency → better axial resolution but less penetration.",
              "Piezoelectric crystals (lead zirconate titanate) both transmit and receive — same crystal pulses then 'listens'.",
              "Doppler shift: Δf = 2f₀ v cosθ / c — angle of insonation matters; 90° gives zero Doppler signal.",
              "Common artefacts: acoustic shadowing (bone, calculus), enhancement (cysts), reverberation (pleura), mirror image.",
              "Mechanical index quantifies cavitation risk; thermal index quantifies tissue heating — both should be 'as low as reasonably achievable'.",
            ]}
          />
        </>
      }
    />
  );
};

export default UltrasoundPhysicsTopic;

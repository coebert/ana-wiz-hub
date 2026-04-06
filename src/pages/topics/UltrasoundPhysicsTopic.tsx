import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { QuizSection } from "@/components/QuizSection";
import { ultrasoundPhysicsQuiz } from "@/data/quizzes";
import UltrasoundPhysicsDiagram from "@/components/diagrams/UltrasoundPhysicsDiagram";
import { ReferencesList } from "@/components/ReferencesList";

const UltrasoundPhysicsTopic = () => {
  return (
    <SectionLayout
      title="Ultrasound Physics"
      subtitle="Piezoelectric effect, frequency–resolution trade-off, Doppler, and artefacts"
      backPath="/physics"
      backLabel="Physics"
      accentColor="text-physics"
    >
      <div className="space-y-8">
        <KeyLearningPoints
          points={[
            "Piezoelectric crystals (PZT) convert electrical to mechanical energy (transmit) and vice versa (receive) — the basis of all ultrasound transducers",
            "Higher frequency → better axial resolution but less penetration; axial resolution = SPL/2",
            "Speed of sound in soft tissue is assumed to be 1,540 m/s for depth calculations",
            "Doppler equation: Δf = 2f₀v cos θ / c — angle of insonation must be <60° for accurate velocity measurement",
            "CW Doppler has no aliasing but no depth discrimination; PW Doppler is depth-specific but aliases above Nyquist limit (PRF/2)",
            "A-lines (reverberation) = normal aerated lung; B-lines (comet tail) = interstitial oedema; absent lung sliding → pneumothorax",
            "Acoustic shadowing occurs behind bone/calculi; posterior enhancement occurs behind fluid-filled structures",
          ]}
        />

        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Introduction</h2>
          <p className="text-muted-foreground leading-relaxed">
            Ultrasound has become indispensable in anaesthesia and critical care — from vascular access and nerve blocks to
            focused echocardiography and lung assessment. Understanding the underlying physics enables optimal image acquisition,
            appropriate probe selection, and correct interpretation of artefacts. This topic is heavily examined in both
            Primary and Final FRCA.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Interactive Diagrams</h2>
          <UltrasoundPhysicsDiagram />
        </div>

        <div>
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
        </div>

        <div>
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
        </div>

        <div>
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
        </div>

        <div>
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
        </div>

        <QuizSection questions={ultrasoundPhysicsQuiz} />

      <ReferencesList topicId="ultrasound-physics" />

        <TopicCompletionToggle topicId="ultrasound-physics" topicTitle="Ultrasound Physics" />
      </div>
    </SectionLayout>
  );
};

export default UltrasoundPhysicsTopic;

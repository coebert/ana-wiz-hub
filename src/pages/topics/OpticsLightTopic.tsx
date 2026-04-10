import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { QuizSection } from "@/components/QuizSection";
import { opticsLightQuiz } from "@/data/quizzes";
import OpticsLightDiagram from "@/components/diagrams/OpticsLightDiagram";
import { ReferencesList } from "@/components/ReferencesList";
import { SeeAlso } from "@/components/SeeAlso";

const OpticsLightTopic = () => {
  return (
    <SectionLayout
      title="Optics & Light"
      subtitle="Reflection, refraction, fibreoptics, Beer-Lambert law, and spectrophotometry"
      backPath="/physics"
      backLabel="Physics"
      accentColor="text-physics"
    >
      <div className="space-y-8">
        <KeyLearningPoints
          points={[
            "Law of reflection: angle of incidence = angle of reflection (θᵢ = θᵣ); incident ray, reflected ray, and normal lie in the same plane",
            "Snell's law: n₁ sin θ₁ = n₂ sin θ₂; light bends toward the normal when entering a denser medium (higher refractive index)",
            "Total internal reflection (TIR) occurs when light exceeds the critical angle (sin θc = n₂/n₁) travelling from dense → less dense medium",
            "Fibreoptic scopes use TIR: coherent bundles (image) preserve spatial arrangement; incoherent bundles (light) transmit illumination only",
            "Beer-Lambert law: A = ε × c × l — absorbance proportional to concentration × path length; basis of pulse oximetry and co-oximetry",
            "Pulse oximetry uses 660 nm (red) and 940 nm (IR); R ratio calibrated empirically; cannot detect COHb or MetHb (needs co-oximetry)",
            "Isobestic point (~800 nm): HbO₂ and Hb absorb equally — used for calibration and total haemoglobin estimation",
          ]}
        />

        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Introduction</h2>
          <p className="text-muted-foreground leading-relaxed">
            The physics of light and optics underpins many monitoring and diagnostic technologies in anaesthesia and critical
            care. From pulse oximetry and co-oximetry (based on the Beer-Lambert law) to fibreoptic intubation (based on total
            internal reflection), a thorough understanding of optical principles is essential for the Primary FRCA. This topic
            covers the fundamental laws of reflection and refraction, fibreoptic light transmission, and the spectrophotometric
            techniques used in clinical monitoring.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Interactive Diagrams</h2>
          <OpticsLightDiagram />
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Reflection</h2>
          <div className="text-muted-foreground leading-relaxed space-y-3">
            <p>
              The <strong>law of reflection</strong> states that the angle of incidence equals the angle of reflection (θᵢ = θᵣ),
              measured from the normal to the surface. The incident ray, reflected ray, and normal all lie in the same plane.
              <strong>Specular reflection</strong> occurs at smooth surfaces (mirrors) where parallel rays remain parallel;
              <strong>diffuse reflection</strong> occurs at rough surfaces where rays scatter in all directions.
            </p>
            <p>
              Clinically, <strong>reflectance pulse oximetry</strong> uses reflected rather than transmitted light — the LED and
              photodetector are on the same side of the tissue. This allows measurement at sites where transmission is impractical
              (forehead, oesophagus). The principles are identical to transmission oximetry, but the optical path is different.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Refraction & Total Internal Reflection</h2>
          <div className="text-muted-foreground leading-relaxed space-y-3">
            <p>
              <strong>Refraction</strong> is the bending of light as it passes between media of different optical density.
              <strong>Snell's law</strong> (n₁ sin θ₁ = n₂ sin θ₂) quantifies this: light bends toward the normal when entering
              a denser medium (higher refractive index n). The <strong>refractive index</strong> is defined as n = c/v, the ratio
              of the speed of light in vacuum to its speed in the medium.
            </p>
            <p>
              When light travels from a dense to a less dense medium (n₁ &gt; n₂) and exceeds the <strong>critical angle</strong>
              (sin θc = n₂/n₁), all light is reflected back into the denser medium — <strong>total internal reflection (TIR)</strong>.
              This is the fundamental principle behind fibreoptic light transmission. TIR is complete, with no light lost to
              transmission, making it highly efficient for transmitting light over long distances through flexible fibres.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Fibreoptics</h2>
          <div className="text-muted-foreground leading-relaxed space-y-3">
            <p>
              A fibreoptic consists of a <strong>core</strong> (high refractive index glass) surrounded by <strong>cladding</strong>
              (lower refractive index). Light entering within the <strong>acceptance angle</strong> (determined by the numerical
              aperture) undergoes repeated TIR at the core-cladding interface, propagating along the fibre regardless of bends.
            </p>
            <p>
              <strong>Coherent bundles</strong> have fibres aligned identically at both ends, preserving spatial relationships to
              transmit images. <strong>Incoherent bundles</strong> have randomly arranged fibres and transmit light intensity only
              (illumination). A flexible fibreoptic scope contains both types plus a working channel (2.2–3.2 mm for suction,
              oxygen, and local anaesthetic) and angulation wires for tip control.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Beer-Lambert Law</h2>
          <div className="text-muted-foreground leading-relaxed space-y-3">
            <p>
              The <strong>Beer-Lambert law</strong> states that absorbance (A) is proportional to the concentration (c) of the
              absorbing substance and the path length (l): <strong>A = ε × c × l</strong>, where ε is the molar absorptivity
              (extinction coefficient). Transmittance T = I/I₀, and absorbance A = −log₁₀(T).
            </p>
            <p>
              The law assumes monochromatic light, low concentrations (linearity breaks down at high concentrations), no scattering,
              and uniform path length. It is the theoretical basis of <strong>pulse oximetry</strong>, <strong>co-oximetry</strong>,
              <strong>capnography</strong> (infrared CO₂ absorption), and <strong>anaesthetic agent analysis</strong>.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Spectrophotometry</h2>
          <div className="text-muted-foreground leading-relaxed space-y-3">
            <p>
              <strong>Pulse oximetry</strong> uses two wavelengths — 660 nm (red) and 940 nm (infrared). Oxyhaemoglobin (HbO₂)
              absorbs more infrared light, while deoxyhaemoglobin (Hb) absorbs more red light. The ratio R = (AC₆₆₀/DC₆₆₀) /
              (AC₉₄₀/DC₉₄₀) is calibrated against direct arterial blood gas measurements in healthy volunteers. At R = 1,
              SpO₂ ≈ 85%. Pulse oximetry measures <strong>functional saturation</strong>: HbO₂/(HbO₂ + Hb), and cannot detect
              COHb or MetHb with only two wavelengths.
            </p>
            <p>
              <strong>Co-oximetry</strong> uses 4 or more wavelengths to measure <strong>fractional saturation</strong>: HbO₂/
              (HbO₂ + Hb + COHb + MetHb), and can individually quantify each haemoglobin species. <strong>Near-infrared
              spectroscopy (NIRS)</strong> uses wavelengths in the 700–1000 nm range to measure regional cerebral oxygen
              saturation (rSO₂), providing a mixed arterial-venous signal (approximately 75% venous, 25% arterial).
            </p>
            <p>
              The <strong>isobestic point</strong> (~800 nm) is where HbO₂ and Hb have equal absorption. At this wavelength,
              absorption depends only on total haemoglobin concentration, independent of oxygenation — it is used for
              calibration and total Hb estimation.
            </p>
          </div>
        </div>

        <QuizSection questions={opticsLightQuiz} />

      <ReferencesList topicId="optics-light" />

        <SeeAlso topicId="optics-light" />
        <TopicCompletionToggle topicId="optics-light" topicTitle="Optics & Light" />
      </div>
    </SectionLayout>
  );
};

export default OpticsLightTopic;

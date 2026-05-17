import { TopicTemplate } from "@/components/TopicTemplate";
import { CollapsibleSubsection } from "@/components/CollapsibleSubsection";
import { ExamSection } from "@/components/ExamSection";
import { WorkedExample } from "@/components/WorkedExamples";
import OpticsLightDiagram from "@/components/diagrams/OpticsLightDiagram";
import { opticsLightQuiz } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/ExamPitfallsCallout";

const objectives = [
  "State the laws of reflection and refraction (Snell's law) and apply them to clinical optics",
  "Calculate the critical angle and explain total internal reflection in fibreoptic equipment",
  "State the Beer-Lambert law (A = εcl) and its assumptions, and identify clinical applications",
  "Explain how pulse oximetry uses the 660/940 nm wavelength pair and why it cannot detect COHb or MetHb",
  "Distinguish functional from fractional saturation and describe the role of co-oximetry and NIRS",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Pulse oximeter reading in carbon monoxide poisoning",
    scenario:
      "A 30-year-old rescued from a house fire has a pulse oximeter reading of 99%. ABG co-oximetry: SaO₂ 78%, COHb 22%, MetHb 1%. Why is the SpO₂ misleading?",
    working:
      "Pulse oximetry uses 660 nm (red) + 940 nm (IR). It calculates functional saturation = HbO₂ / (HbO₂ + Hb).\nCOHb absorbs almost identically to HbO₂ at 660 nm → the oximeter sees COHb as oxygenated haemoglobin.\nFractional SaO₂ = HbO₂ / (HbO₂ + Hb + COHb + MetHb) = 78% — the true tissue oxygen-carrying capacity.\nCo-oximetry uses ≥4 wavelengths (typically including 535, 585, 660, 940 nm) to resolve all four species.",
    answer:
      "SpO₂ is falsely reassuring because COHb and HbO₂ are optically indistinguishable at 660 nm. Treat with high-flow 100% O₂ (reduces COHb half-life from 320 min in air to ~80 min on FiO₂ 1.0) regardless of SpO₂; consider hyperbaric O₂ if COHb >25% or neurological signs.",
    cites: ["BJA Educ 2004"],
  },
  {
    title: "Critical angle in a fibreoptic bronchoscope",
    scenario:
      "A bronchoscope core has refractive index 1.62 and cladding 1.48. Calculate the critical angle for total internal reflection at the core/cladding interface.",
    working:
      "sin θc = n₂ / n₁ = 1.48 / 1.62 = 0.9136.\nθc = arcsin(0.9136) = 65.9°.",
    answer:
      "Critical angle ≈ 66°. Light striking the interface at angles greater than this (measured from the normal) undergoes total internal reflection and propagates losslessly along the fibre — the optical principle that allows a flexible scope to bend through the airway without leaking light.",
    cites: ["Middleton Ch.12"],
  },
];

const OpticsLightTopic = () => {
  return (
    <TopicTemplate
      title="Optics & Light"
      subtitle="Reflection, refraction, fibreoptics, Beer-Lambert law, and spectrophotometry"
      backPath="/physics"
      backLabel="Physics"
      accentColor="text-physics"
      topicId="optics-light"
      topicTitle="Optics & Light"
      objectives={objectives}
      workedExamples={workedExamples}
      quizQuestions={opticsLightQuiz}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY, Exam.FINAL], curriculumCodes: ["RCoA Primary — Physics", "RCoA Final — Physics"] },
        workedExamples: { exams: [Exam.PRIMARY, Exam.FINAL] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL] },
      }}
      sectionSources={{
        workedExamples: ["BJA Educ 2004"],
        keyPoints: ["Cross & Plunkett Ch.18", "BJA Educ 2004", "Middleton Ch.12"],
      }}
      keyPoints={[
        { text: "Law of reflection: angle of incidence = angle of reflection (θᵢ = θᵣ); incident ray, reflected ray, and normal lie in the same plane", cites: ["Cross & Plunkett Ch.18"] },
        { text: "Snell's law: n₁ sin θ₁ = n₂ sin θ₂; light bends toward the normal when entering a denser medium (higher refractive index)", cites: ["BJA Educ 2004"] },
        { text: "Total internal reflection (TIR) occurs when light exceeds the critical angle (sin θc = n₂/n₁) travelling from dense → less dense medium", cites: ["Middleton Ch.12"] },
        { text: "Fibreoptic scopes use TIR: coherent bundles (image) preserve spatial arrangement; incoherent bundles (light) transmit illumination only", cites: ["Cross & Plunkett Ch.18"] },
        { text: "Beer-Lambert law: A = ε × c × l — absorbance proportional to concentration × path length; basis of pulse oximetry and co-oximetry", cites: ["BJA Educ 2004"] },
        { text: "Pulse oximetry uses 660 nm (red) and 940 nm (IR); R ratio calibrated empirically; cannot detect COHb or MetHb (needs co-oximetry)", cites: ["Middleton Ch.12"] },
        { text: "Isobestic point (~800 nm): HbO₂ and Hb absorb equally — used for calibration and total haemoglobin estimation", cites: ["Cross & Plunkett Ch.18"] },
      ]}
      coreConcepts={
        <>
          <ExamSection id="introduction" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Introduction" defaultOpen>
            <p className="text-muted-foreground leading-relaxed">
              The physics of light and optics underpins many monitoring and diagnostic technologies in anaesthesia and critical
              care. From pulse oximetry and co-oximetry (based on the Beer-Lambert law) to fibreoptic intubation (based on total
              internal reflection), a thorough understanding of optical principles is essential for the Primary FRCA. This topic
              covers the fundamental laws of reflection and refraction, fibreoptic light transmission, and the spectrophotometric
              techniques used in clinical monitoring.
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="diagram" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Interactive Diagrams">
            <OpticsLightDiagram />
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="reflection" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Reflection">
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
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="refraction" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Refraction & Total Internal Reflection">
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
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="fibreoptics" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Fibreoptics">
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
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="beer-lambert" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Beer-Lambert Law">
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
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="spectrophotometry" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Spectrophotometry">
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
            </CollapsibleSubsection>
          </ExamSection>
          <ExamPitfallsCallout
            accent="physics"
            pitfalls={[
              "Beer–Lambert law (A = εcl) underpins pulse oximetry, capnography and co-oximetry — it assumes a single absorber per wavelength.",
              "Total internal reflection requires light moving from denser to less dense medium above the critical angle — the basis of fibreoptics.",
              "Snell's law (n₁sinθ₁ = n₂sinθ₂) governs refraction; refractive index is wavelength-dependent (dispersion).",
              "Spectrophotometry vs co-oximetry: pulse oximeters use two wavelengths; lab co-oximeters use four or more to detect MetHb and COHb.",
              "Polarisation and plane-polarised light are exploited in laser physics and optical activity measurement.",
            ]}
          />
        </>
      }
    />
  );
};

export default OpticsLightTopic;

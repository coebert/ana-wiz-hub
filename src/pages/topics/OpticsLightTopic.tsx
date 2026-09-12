import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import OpticsLightDiagram from "@/components/diagrams/physics/OpticsLightDiagram";
import { opticsLightQuiz } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import InlineRef from "@/components/references/InlineRef";

const opticsLightFaqs: Array<[string, string]> = [
  [
    "How does the Beer–Lambert law underpin pulse oximetry and capnography?",
    "A = ε × c × l: absorbance is proportional to molar absorptivity, concentration, and path length. Pulse oximetry uses this at 660 nm and 940 nm to derive the ratio of oxy- to deoxy-haemoglobin. Infrared capnography uses absorbance at 4.26 µm (CO₂'s peak) to derive end-tidal CO₂ concentration."
  ],
  [
    "What is total internal reflection and how is it used in fibreoptic intubation?",
    "When light passes from a denser to a less dense medium at an angle greater than the critical angle, it is reflected entirely back into the dense medium. Optical fibres exploit this: a high-index core surrounded by lower-index cladding traps light by repeated internal reflection. Coherent bundles transmit images; non-coherent bundles transmit illumination."
  ],
  [
    "What wavelengths are used by common surgical lasers?",
    "CO₂ — 10 600 nm (far infrared, absorbed by water; surface cutting/vaporisation, airway). Nd:YAG — 1064 nm (deeper penetration; tumour debulking, photocoagulation). KTP — 532 nm (green; vascular lesions, urology). Argon — 488/514 nm (retinal photocoagulation). Each requires wavelength-specific eye protection."
  ]
];

const objectives = [
  "State the laws of reflection and refraction (Snell's law) and apply them to clinical optics",
  "Calculate the critical angle and explain total internal reflection in fibreoptic equipment",
  "State the Beer-Lambert law (A = εcl) and its assumptions, and identify clinical applications",
  "Explain how pulse oximetry uses the 660/940 nm wavelength pair and why it cannot detect COHb or MetHb",
  "Distinguish functional from fractional saturation and describe the role of co-oximetry and NIRS",
  "Describe the properties of laser light, the main surgical lasers and the hazards and safety measures required",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Pulse oximeter reading in carbon monoxide poisoning",
    scenario:
      "A 30-year-old rescued from a house fire has a pulse oximeter reading of 99%. ABG co-oximetry: SaO₂ 78%, COHb 22%, MetHb 1%. Why is the SpO₂ misleading?",
    working:
      "Pulse oximetry uses 660 nm (red) + 940 nm (IR). It calculates functional saturation = HbO₂ / (HbO₂ + Hb).\nThe device computes a ratio of ratios R = (AC₆₆₀/DC₆₆₀)/(AC₉₄₀/DC₉₄₀). COHb has an absorbance at 660 nm very close to that of HbO₂ but a very low absorbance at 940 nm — the resulting R value is virtually indistinguishable from that produced by HbO₂, so the algorithm classifies COHb as oxygenated haemoglobin and returns a falsely reassuring SpO₂.\nFractional SaO₂ = HbO₂ / (HbO₂ + Hb + COHb + MetHb) = 78% — the true tissue oxygen-carrying capacity.\nCo-oximetry uses ≥4 wavelengths (typically including 535, 585, 660, 940 nm) to resolve all four species.",
    answer:
      "SpO₂ is falsely reassuring because the ratio of COHb absorbances at 660 nm and 940 nm mimics that of HbO₂, so the two-wavelength algorithm reports COHb as oxyhaemoglobin. Treat with high-flow 100% O₂ (carboxyhaemoglobin half-life falls from roughly 300 min breathing air to about 90 min on high-flow oxygen, and ~30 min at 2.5–3 ATA) regardless of SpO₂; consider referral for hyperbaric O₂ (e.g. COHb >25%, loss of consciousness, neurological signs, myocardial ischaemia or pregnancy) after discussion with the poisons service.",
    cites: ["BJA Educ 2004 (Spectrophotometry)", "BJA Educ 2017 (Pulse oximetry)", "NEJM 2009 (CO poisoning)", "NEJM 2002 (HBO for CO)"],
  },
  {
    title: "Critical angle in a fibreoptic bronchoscope",
    scenario:
      "A bronchoscope core has refractive index 1.62 and cladding 1.48. Calculate the critical angle for total internal reflection at the core/cladding interface.",
    working:
      "sin θc = n₂ / n₁ = 1.48 / 1.62 = 0.9136.\nθc = arcsin(0.9136) = 65.9°.",
    answer:
      "Critical angle ≈ 66°. Light striking the interface at angles greater than this (measured from the normal) undergoes total internal reflection and propagates losslessly along the fibre — the optical principle that allows a flexible scope to bend through the airway without leaking light.",
    cites: ["Middleton Ch.12", "BJA Educ 2004"],
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
        workedExamples: ["BJA Educ 2004 (Spectrophotometry)", "BJA Educ 2017 (Pulse oximetry)", "Middleton Ch.12", "NEJM 2009 (CO poisoning)", "NEJM 2002 (HBO for CO)"],
        keyPoints: ["Cross & Plunkett Ch.18", "BJA Educ 2004 (Spectrophotometry)", "BJA Educ 2017 (Pulse oximetry)", "Middleton Ch.12"],
      }}
      keyPoints={[
        { text: "Law of reflection: angle of incidence = angle of reflection (θᵢ = θᵣ); incident ray, reflected ray, and normal lie in the same plane", cites: ["Cross & Plunkett Ch.18"] },
        { text: "Snell's law: n₁ sin θ₁ = n₂ sin θ₂; light bends toward the normal when entering a denser medium (higher refractive index)", cites: ["BJA Educ 2004"] },
        { text: "Total internal reflection (TIR) occurs when light exceeds the critical angle (sin θc = n₂/n₁) travelling from dense → less dense medium", cites: ["Middleton Ch.12"] },
        { text: "Fibreoptic scopes use TIR: coherent bundles (image) preserve spatial arrangement; incoherent bundles (light) transmit illumination only", cites: ["Cross & Plunkett Ch.18"] },
        { text: "Beer-Lambert law: A = ε × c × l — absorbance proportional to concentration × path length; basis of pulse oximetry and co-oximetry", cites: ["BJA Educ 2004 (Spectrophotometry)"] },
        { text: "Pulse oximetry isolates arterial blood by analysing the pulsatile (AC) component of absorption against the static (DC) baseline at 660 nm and 940 nm; cannot detect COHb or MetHb (needs co-oximetry)", cites: ["BJA Educ 2017 (Pulse oximetry)"] },
        { text: "Isobestic point (805 nm): HbO₂ and Hb absorb equally — used for calibration and total haemoglobin estimation", cites: ["BJA Educ 2004 (Spectrophotometry)"] },
        { text: "MetHb absorbs roughly equally at 660 nm and 940 nm, driving the ratio of ratios toward 1 — SpO₂ trends to ~85% regardless of true SaO₂", cites: ["BJA Educ 2017 (Pulse oximetry)"] },
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
                It is the theoretical basis of <strong>pulse oximetry</strong>, <strong>co-oximetry</strong>,
                <strong>capnography</strong> (infrared CO₂ absorption), and <strong>anaesthetic agent analysis</strong>
                <InlineRef topicId="optics-light" refLabel="BJA Educ 2004 (Spectrophotometry)" />
                <InlineRef topicId="optics-light" refLabel="BJA Educ Spectrophotometry (full text)" />.
              </p>
              <p className="font-medium text-foreground">Assumptions and limitations (commonly examined)</p>
              <ul className="list-disc list-inside space-y-1">
                <li>The <strong>incident light must be monochromatic</strong> — a broad-spectrum source samples several
                  extinction coefficients at once and the relationship becomes non-linear.</li>
                <li>The solution must be <strong>homogeneous with uniform concentration</strong> and a <strong>constant, known
                  path length</strong>.</li>
                <li><strong>No scattering</strong> of light by suspended particles — a major limitation in whole blood and
                  tissue, where red cells scatter strongly (the reason pulse oximeters need empirical calibration rather than
                  first-principles calculation).</li>
                <li>The absorbing species must <strong>not fluoresce or phosphoresce</strong>, and must not undergo photochemical
                  change during measurement.</li>
                <li>Only accurate at <strong>low concentrations</strong>: at high concentrations solute–solute interaction and
                  refractive-index changes alter the molar absorptivity, so absorbance under-reads.</li>
                <li>Absorbers must be <strong>independent</strong>; with a mixture, total absorbance is only the simple sum of
                  each species' absorbance if they do not interact — and n wavelengths are needed to resolve n species.</li>
              </ul>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="spectrophotometry" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Spectrophotometry">
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                <strong>Pulse oximetry</strong> uses two wavelengths — 660 nm (red) and 940 nm (infrared). Oxyhaemoglobin (HbO₂)
                absorbs more infrared light, while deoxyhaemoglobin (Hb) absorbs more red light. Crucially, the probe measures
                absorbance throughout the cardiac cycle: a small <strong>pulsatile (AC)</strong> component arises from the
                arterial blood added with each systolic pulse, superimposed on a much larger <strong>non-pulsatile (DC)</strong>
                baseline from skin, soft tissue, venous blood and the static arterial blood. By computing the ratio of the AC
                to DC signal at each wavelength, and then the ratio of these two ratios
                R = (AC₆₆₀/DC₆₆₀) / (AC₉₄₀/DC₉₄₀), the device isolates the absorbance characteristics of the freshly
                arriving arterial blood and rejects everything else. R is calibrated empirically against arterial blood gas
                measurements in healthy volunteers; at R = 1, SpO₂ ≈ 85%. Pulse oximetry reports <strong>functional
                saturation</strong>: HbO₂/(HbO₂ + Hb), and with only two wavelengths cannot resolve COHb or MetHb
                <InlineRef topicId="optics-light" refLabel="BJA Educ 2017 (Pulse oximetry)" />
                <InlineRef topicId="optics-light" refLabel="BJA Educ Pulse Oximetry (full text)" />.
              </p>
              <p>
                <strong>Co-oximetry</strong> uses 4 or more wavelengths to measure <strong>fractional saturation</strong>: HbO₂/
                (HbO₂ + Hb + COHb + MetHb), and can individually quantify each haemoglobin species. <strong>Near-infrared
                spectroscopy (NIRS)</strong> uses wavelengths in the 700–1000 nm range to measure regional cerebral oxygen
                saturation (rSO₂), providing a mixed arterial-venous signal (approximately 75% venous, 25% arterial).
              </p>
              <p>
                The <strong>isobestic point</strong> (805 nm) is the wavelength at which HbO₂ and Hb absorb equally. At this
                wavelength, absorption depends only on total haemoglobin concentration, independent of oxygenation — it is used
                for calibration and total Hb estimation
                <InlineRef topicId="optics-light" refLabel="BJA Educ Spectrophotometry (full text)" />.
              </p>
              <p>
                <strong>Methaemoglobin (MetHb)</strong> has approximately equal absorbance at 660 nm and 940 nm. This drives the
                ratio of ratios toward R ≈ 1, which corresponds to an SpO₂ of approximately <strong>85%</strong>, irrespective
                of the true arterial saturation. Clinically this produces a falsely low SpO₂ in well-oxygenated patients and a
                falsely high SpO₂ in those who are profoundly hypoxic — co-oximetry is required to quantify MetHb
                <InlineRef topicId="optics-light" refLabel="BJA Educ Pulse Oximetry (full text)" />.
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>
          <ExamSection id="lasers" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Lasers in Anaesthesia">
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                <strong>LASER</strong> = Light Amplification by Stimulated Emission of Radiation. Laser light has three defining
                properties: it is <strong>monochromatic</strong> (a single wavelength, so tissue absorption is predictable),
                <strong> coherent</strong> (all waves in phase in time and space) and <strong>collimated</strong> (parallel,
                so it barely diverges and energy density stays high over distance). These properties allow enormous power density
                to be focused on a very small spot.
              </p>
              <p className="font-medium text-foreground">Components</p>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Active (lasing) medium</strong> — gas, crystal, liquid dye or semiconductor; determines the wavelength.</li>
                <li><strong>Pumping source</strong> — electrical discharge or flash lamp that raises electrons to a higher energy
                  level, producing <em>population inversion</em>.</li>
                <li><strong>Optical resonant cavity</strong> — two mirrors, one fully and one partially reflective; photons pass
                  repeatedly through the medium causing stimulated emission and amplification, with the beam emerging through the
                  partially reflective mirror.</li>
              </ul>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left">
                      <th className="py-2 pr-3 font-semibold text-foreground">Laser</th>
                      <th className="py-2 pr-3 font-semibold text-foreground">Wavelength</th>
                      <th className="py-2 pr-3 font-semibold text-foreground">Medium</th>
                      <th className="py-2 font-semibold text-foreground">Tissue interaction and use</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/60">
                      <td className="py-2 pr-3">CO₂</td>
                      <td className="py-2 pr-3">10 600 nm (far infrared)</td>
                      <td className="py-2 pr-3">CO₂ gas</td>
                      <td className="py-2">Strongly absorbed by water, so energy is deposited in ~0.1 mm: precise surface cutting and vaporisation. Airway and laryngeal surgery.</td>
                    </tr>
                    <tr className="border-b border-border/60">
                      <td className="py-2 pr-3">Nd:YAG</td>
                      <td className="py-2 pr-3">1064 nm (near infrared)</td>
                      <td className="py-2 pr-3">Neodymium-doped yttrium aluminium garnet crystal</td>
                      <td className="py-2">Poorly absorbed by water so penetrates several millimetres: deep coagulation, tracheobronchial tumour debulking. Invisible — greatest inadvertent-injury risk.</td>
                    </tr>
                    <tr className="border-b border-border/60">
                      <td className="py-2 pr-3">KTP</td>
                      <td className="py-2 pr-3">532 nm (green)</td>
                      <td className="py-2 pr-3">Frequency-doubled Nd:YAG through a potassium titanyl phosphate crystal</td>
                      <td className="py-2">Absorbed by haemoglobin: vascular lesions, urology (prostate), ENT.</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-3">Argon</td>
                      <td className="py-2 pr-3">488 / 514 nm (blue-green)</td>
                      <td className="py-2 pr-3">Argon gas</td>
                      <td className="py-2">Absorbed by haemoglobin and melanin, transmitted by the vitreous: retinal photocoagulation, dermatology.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="font-medium text-foreground">Hazards and safety</p>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Eye injury</strong> — the dominant hazard. Visible and near-infrared beams (Nd:YAG, KTP, argon) are
                  focused by the lens onto the retina; CO₂ (far infrared) damages the cornea. Everyone in the controlled area,
                  including the anaesthetised patient, needs <strong>wavelength-specific</strong> eye protection: goggles for
                  staff, taped protective eye pads and moist gauze for the patient.</li>
                <li><strong>Airway fire</strong> — the classic exam emergency. Reduce risk with the lowest tolerable FiO₂
                  (ideally ≤0.3, aiming for air/oxygen), <strong>avoid nitrous oxide</strong> (supports combustion), use a
                  laser-resistant (metal-wrapped or metal) tracheal tube, fill the cuff with saline (often dyed with methylene
                  blue) or consider jet ventilation/apnoeic techniques. If fire occurs: stop the laser, stop gas flow, remove the
                  burning tube, flood with saline, ventilate with air, then re-intubate and bronchoscope to assess injury.</li>
                <li><strong>Tissue and drape burns</strong> from reflected beams — use matte, non-reflective instruments and wet
                  swabs/drapes around the field.</li>
                <li><strong>Plume</strong> — the smoke contains carbonised particles, viable virus (e.g. HPV) and toxic products:
                  use smoke evacuation and high-filtration masks.</li>
                <li><strong>Administrative controls</strong> — a designated laser-controlled area with warning signs and locked
                  doors, blanked windows, a trained laser protection supervisor, key-controlled activation and stand-by mode when
                  not firing. Laser products are classified 1–4 (class 3B and 4 medical lasers are the hazardous ones)
                  <InlineRef topicId="optics-light" refLabel="BS EN 60825-1" />
                  <InlineRef topicId="optics-light" refLabel="MHRA Lasers 2015" />.</li>
              </ul>
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
          <TopicFaqs faqs={opticsLightFaqs} />

        </>
      }
    />
  );
};

export default OpticsLightTopic;

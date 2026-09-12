import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import UltrasoundPhysicsDiagram from "@/components/diagrams/physics/UltrasoundPhysicsDiagram";
import { ultrasoundPhysicsQuiz } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { InlineRef } from "@/components/references/InlineRef";

const ultrasoundPhysicsFaqs: Array<[string, string]> = [
  [
    "What is the trade-off between ultrasound frequency, resolution and depth?",
    "Higher frequency (10–15 MHz) — better axial resolution but rapid attenuation, so only superficial structures (vascular access, peripheral nerves). Lower frequency (2–5 MHz) — penetrates deeper (cardiac, abdominal) at the cost of resolution. Resolution improves with shorter wavelength (λ = c/f, c ≈ 1540 m/s in soft tissue)."
  ],
  [
    "Explain the principle of Doppler in vascular ultrasound.",
    "Frequency shift (Δf) = 2 × f₀ × v × cosθ / c, where v is blood velocity and θ is the angle between beam and flow. Optimal θ <60° (cos plateau steepens above this — error increases). Colour Doppler maps direction (toward probe = red, away = blue). Pulsed-wave Doppler gives velocity at a specific depth but is limited by Nyquist; continuous-wave measures any velocity but loses depth resolution."
  ],
  [
    "What is the acoustic impedance and how does it cause reflection?",
    "Z = ρ × c (density × speed of sound). Reflection occurs at boundaries with different Z. A small mismatch (soft tissue–soft tissue ~1 %) gives weak echoes; a large mismatch (tissue–air or tissue–bone) reflects nearly all the energy, casting a shadow. Coupling gel removes the tissue–air interface at the skin."
  ]
];

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
    cites: ["Middleton Ch.13"],
  },
  {
    title: "Aliasing on PW Doppler at the LVOT",
    scenario:
      "PW Doppler at the LVOT in a patient with HOCM shows the velocity envelope wrapping around the baseline at a Nyquist limit of 0.8 m/s. Estimate true peak velocity and choose a remedy.",
    working:
      "Aliasing occurs when Doppler shift > Nyquist limit = PRF/2.\nNyquist = 0.8 m/s → true velocity exceeds this and is mis-displayed in the opposite direction.\nOptions: (1) increase PRF (raises Nyquist); (2) shift baseline to use full negative scale; (3) reduce sample depth (deeper sample → lower max PRF); (4) switch to CW Doppler — no aliasing, but loses depth specificity.",
    answer:
      "True velocity is greater than the Nyquist limit. Use CW Doppler aligned through the LVOT to obtain an unaliased peak velocity (often 4–6 m/s in HOCM). Apply the simplified Bernoulli (ΔP = 4v²) to estimate the dynamic LVOT gradient.",
    cites: ["Cross & Plunkett Ch.17"],
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
        workedExamples: ["BJA Educ 2017", "BJA Educ 2017", "Middleton Ch.13", "Cross & Plunkett Ch.17"],
        keyPoints: ["BJA Educ 2017", "Middleton Ch.13", "Cross & Plunkett Ch.17", "BJA Educ Ultrasound 2017"],
      }}
      keyPoints={[
        { text: "Piezoelectric crystals (PZT) convert electrical to mechanical energy (transmit) and vice versa (receive) — the basis of all ultrasound transducers", cites: ["BJA Educ 2017"] },
        { text: "Higher frequency → better axial resolution but less penetration; axial resolution = SPL/2", cites: ["Middleton Ch.13"] },
        { text: "Speed of sound in soft tissue is assumed to be 1,540 m/s for depth calculations", cites: ["Cross & Plunkett Ch.17"] },
        { text: "Doppler equation: Δf = 2f₀v cos θ / c — angle of insonation must be <60° for accurate velocity measurement", cites: ["BJA Educ 2017"] },
        { text: "CW Doppler has no aliasing but no depth discrimination; PW Doppler is depth-specific but aliases above Nyquist limit (PRF/2)", cites: ["Middleton Ch.13"] },
        { text: "A-lines (reverberation) = normal aerated lung; B-lines (comet tail) = interstitial oedema; absent lung sliding → pneumothorax", cites: ["Cross & Plunkett Ch.17"] },
        { text: "Acoustic shadowing occurs behind bone/calculi; posterior enhancement occurs behind fluid-filled structures", cites: ["BJA Educ 2017"] },
      ]}
      coreConcepts={
        <>
          <ExamSection id="introduction" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Introduction" defaultOpen>
            <p className="text-muted-foreground leading-relaxed">
              Ultrasound has become indispensable in anaesthesia and critical care — from vascular access and nerve blocks to
              focused echocardiography and lung assessment. Understanding the underlying physics enables optimal image acquisition,
              appropriate probe selection, and correct interpretation of artefacts. This topic is heavily examined in both
              Primary and Final FRCA.
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="diagram" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Interactive Diagrams">
            <p className="text-muted-foreground leading-relaxed mb-3">
              Explore the core ultrasound physics concepts interactively: the piezoelectric transmit/receive cycle,
              the frequency–penetration trade-off across linear, curvilinear and phased-array probes, the Doppler
              equation and aliasing on PW Doppler, and the common B-mode artefacts (acoustic shadowing, posterior
              enhancement, A-lines, B-lines and lung sliding). Use these alongside the text to consolidate probe
              selection and image interpretation for the FRCA Primary and Final.
            </p>
            <UltrasoundPhysicsDiagram />
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="piezoelectric" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Piezoelectric Effect & Transducer Design">
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
              <p>
                <strong>Acoustic impedance (Z = ρc)</strong> is density multiplied by propagation speed. The greater the impedance
                difference across a boundary, the greater the reflected fraction: tissue–air and tissue–bone interfaces produce
                near-total reflection and acoustic shadowing. Coupling gel removes the air layer between probe and skin. The quarter-
                wavelength matching layer has impedance intermediate between PZT and tissue, reducing reflection and maximising energy
                transmission <InlineRef topicId="ultrasound-physics" refLabel="BJA Educ 2017" />.
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="resolution" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Frequency, Resolution & Penetration">
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
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="display-modes" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Display Modes: A-, B- and M-mode">
              <div className="text-muted-foreground leading-relaxed space-y-3">
                <p>
                  Every image is built from the amplitude and return time of received echoes; the modes differ only in
                  how that information is displayed
                  <InlineRef topicId="ultrasound-physics" refLabel="BJA Educ Ultrasound Physics 2020" />.
                </p>
                <p>
                  <strong>A-mode (amplitude)</strong> — a one-dimensional plot of echo amplitude against depth along a
                  single beam line. Historically the first clinical display; it survives in ophthalmology for accurate
                  axial-length (biometry) and lesion-height measurement, and conceptually underlies every scan line of a
                  modern image.
                </p>
                <p>
                  <strong>B-mode (brightness)</strong> — the standard 2D grey-scale image. Many scan lines, swept
                  electronically across the array, are assembled into a sector or rectangle, with echo amplitude coded
                  as pixel brightness and depth from the round-trip time (assuming 1,540 m/s). This is the foundation of
                  nerve-block, vascular-access, FAST and lung imaging; frame rate falls as depth and sector width
                  increase, because each line must return before the next is sent.
                </p>
                <p>
                  <strong>M-mode (motion)</strong> — a single B-mode line displayed against time, giving very high
                  temporal resolution for moving structures. Used for valve and chamber-wall motion and diaphragmatic
                  excursion in echocardiography, and in lung ultrasound to demonstrate the "seashore sign" of normal
                  sliding versus the "barcode/stratosphere sign" of pneumothorax.
                </p>
              </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="doppler" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Doppler Ultrasound">
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
              <p>
                <strong>Tissue Doppler imaging (TDI)</strong> reverses conventional wall filtering to retain low-velocity,
                high-amplitude myocardial signals while suppressing blood flow. Mitral-annular e′ velocity contributes to assessment
                of diastolic relaxation and the E/e′ ratio estimates filling pressure, although angle dependence remains. 
                <strong>Elastography</strong> maps deformation or shear-wave propagation to estimate tissue stiffness, supporting
                characterisation of liver, thyroid, breast and endobronchial lesions
                <InlineRef topicId="ultrasound-physics" refLabel="Diagnostics 2024 Elastography" />.
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="ultrasound-safety" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Ultrasound Safety & Bioeffects">
              <div className="text-muted-foreground leading-relaxed space-y-3">
                <p>
                  Diagnostic ultrasound is non-ionising but can heat tissue and produce mechanical effects. Apply
                  <strong> ALARA—acoustic output and dwell time as low as reasonably achievable</strong>—while obtaining a diagnostic image.
                </p>
                <p>
                  The <strong>thermal index (TI)</strong> is the ratio of emitted acoustic power to the power estimated to raise tissue
                  temperature by 1 °C, i.e. it reflects heating from absorbed energy. Subtypes: <strong>TIS</strong> (soft tissue),
                  <strong> TIB</strong> (bone near the focus — bone absorbs strongly and heats adjacent tissue) and <strong>TIC</strong>
                  (cranial bone, for transcranial scanning). Heating is greatest with spectral Doppler and colour Doppler, which use a
                  stationary beam and high time-averaged intensity, and matters most in <strong>fetal scanning</strong> (embryonic
                  tissue, ossifying bone, no protective perfusion) and neonatal transcranial imaging.
                </p>
                <p>
                  The <strong>mechanical index (MI) = peak rarefactional pressure / √frequency</strong> estimates non-thermal
                  <strong> cavitation</strong> risk. In <em>stable</em> (non-inertial) cavitation, existing gas nuclei oscillate in size
                  with the pressure cycle, producing microstreaming and shear at cell membranes. In <em>inertial</em> (transient)
                  cavitation, bubbles grow then collapse violently, with local high temperatures, free radicals and mechanical
                  disruption. Higher negative pressure and lower frequency raise MI; an <strong>MI &gt; 0.7</strong> is the accepted
                  theoretical threshold at which lung capillary haemorrhage becomes possible, particularly where gas bodies exist
                  (lung, bowel) or contrast microbubbles have been given
                  <InlineRef topicId="ultrasound-physics" refLabel="BJA Educ Ultrasound Physics 2020" />.
                </p>
                <p>
                  For routine anaesthetic and ICU applications — vascular access, regional blocks, gastric or lung scanning — measured
                  bioeffects are negligible and no diagnostic ultrasound injury has been demonstrated at these outputs. Operators should
                  nonetheless keep displayed TI and MI below 1 where practicable, minimise scanning and spectral-Doppler dwell time,
                  avoid holding a Doppler gate over one spot, and reduce acoustic output before degrading gain or image-quality controls
                  <InlineRef topicId="ultrasound-physics" refLabel="BMUS Safety Guidelines" />.
                </p>
              </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="artefacts" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Ultrasound Artefacts">
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
            </CollapsibleSubsection>
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
          <TopicFaqs faqs={ultrasoundPhysicsFaqs} />

        </>
      }
    />
  );
};

export default UltrasoundPhysicsTopic;

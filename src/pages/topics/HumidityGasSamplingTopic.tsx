import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import HumidityGasSamplingDiagram from "@/components/diagrams/physics/HumidityGasSamplingDiagram";
import HygrometersDiagram from "@/components/diagrams/physics/HygrometersDiagram";
import { GasSamplingSiteDiagram } from "@/components/diagrams/physics/GasSamplingSiteDiagram";
import ParamagneticO2Diagram from "@/components/diagrams/physics/ParamagneticO2Diagram";
import { CrossReferenceCallout } from "@/components/topic/CrossReferenceCallout";
import { InlineRef } from "@/components/references/InlineRef";
import { humidityGasSamplingQuiz } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";

const humidityGasSamplingFaqs: Array<[string, string]> = [
  [
    "Why must inspired gases be humidified, and what humidity is required?",
    "Dry gases (medical pipeline 0 % RH) cause mucosal drying, ciliary paralysis, mucus plugging and atelectasis. The upper airway normally conditions gas to 100 % RH at 37 °C (44 mg/L). Intubated patients bypass this — minimum 60 % RH at 30 °C (~17 mg/L) is required; HMEs deliver ~25–30 mg/L; active humidifiers (heated water bath) achieve full 44 mg/L."
  ],
  [
    "How does an HME work and what are its limits?",
    "Heat and Moisture Exchanger: hygroscopic + hydrophobic layers trap exhaled water vapour and heat, returning them on inspiration. Efficiency 70–90 %. Adds 1–2 cmH₂O resistance and ~50 mL dead-space. Change every 24 h, or sooner if visibly soiled, bloody, or after nebulisation. Not adequate for >96 h ventilation — switch to active heated humidification."
  ],
  [
    "Compare side-stream and main-stream capnography sampling.",
    "Side-stream — sample aspirated at 150–200 mL/min through fine tubing to a remote analyser; small footprint, slight delay (1–4 s) and waveform distortion, suction can dilute paediatric tidal volumes. Main-stream — IR cell sits in the airway at the ETT; instant response, no sampling losses, but bulky, heated to prevent condensation, and adds dead-space."
  ]
];

const objectives = [
  "Define absolute and relative humidity and recall the saturated value at 37 °C (44 mg/L)",
  "Locate the isothermic saturation boundary (ISB) and explain how intubation displaces it distally",
  "Compare HME filters and heated humidifiers in terms of efficiency, dead space and complications",
  "Describe how a pneumotachograph (Fleisch / Lilly) measures flow and what causes inaccuracy",
  "Explain the principle of paramagnetic O₂ analysis (unpaired electrons in O₂ → attraction in a magnetic field)",
  "Explain how infrared absorption measures CO₂, N₂O and volatile agents, and the role of collision broadening / agent cross-sensitivity",
  "Compare mainstream (in-line) and sidestream gas sampling — response time, dead space, dilution, scavenging and clinical use",
  "Compare mass spectrometry, infrared absorption, paramagnetic and Raman analysers for clinical gas measurement",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Humidity deficit when bypassing the upper airway",
    scenario:
      "A patient is intubated and ventilated with cold, dry medical gas (≈0 mg/L water content) without humidification. How much water is the patient losing per minute through the airway at a minute ventilation of 6 L/min?",
    working:
      "Target conditioning at the carina = 44 mg/L (37 °C, 100% RH).\nDeficit per litre of inspired gas ≈ 44 mg.\nPer minute = 44 × 6 = 264 mg/min ≈ 16 g/h ≈ 380 mL/day of insensible water loss + corresponding heat loss (latent heat of vaporisation 2.26 kJ/g → ~14 W of heat loss).",
    answer:
      "About 264 mg/min of water (and ~14 W of heat) is lost from the lower airway. Over hours this dries secretions, impairs ciliary function and contributes to hypothermia — mandating an HMEF (≈30–38 mg/L) or active heated humidifier (44 mg/L) in any prolonged anaesthetic.",
    cites: ["BJA Educ 2007"],
  },
  {
    title: "Distinguishing N₂O from CO₂ on a gas analyser",
    scenario:
      "A combined gas analyser reports rising CO₂ during a laparoscopic case. Why might mass spectrometry alone be ambiguous, and what alternative confirms the gas identity?",
    working:
      "Mass spec separates by m/z. N₂O and CO₂ both have molecular m/z = 44 → primary peak overlaps.\nFragmentation patterns differ (CO₂ → m/z 28, 16; N₂O → m/z 30, 14) so high-resolution mass spec can still distinguish them, but the primary peak alone is not specific.\nInfrared absorption can resolve them (different absorption bands).\nRaman scattering is unambiguous: each molecule has a unique vibrational shift, including for homonuclear gases like N₂ that are invisible to IR.",
    answer:
      "Rely on either the fragmentation pattern (m/z 28 vs 30), an IR analyser tuned to CO₂'s 4.26 µm band, or Raman spectroscopy. In modern theatres the dual IR/paramagnetic analyser is the standard solution.",
    cites: ["Cross & Plunkett Ch.9"],
  },
];

const HumidityGasSamplingTopic = () => {
  return (
    <TopicTemplate
      title="Humidity & Gas Analysis"
      subtitle="Pneumotachographs, mass spectrometry, Raman scattering, and humidification physics"
      backPath="/physics"
      backLabel="Physics"
      accentColor="text-physics"
      topicId="humidity-gas-sampling"
      topicTitle="Humidity & Gas Analysis"
      objectives={objectives}
      workedExamples={workedExamples}
      quizQuestions={humidityGasSamplingQuiz}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY, Exam.FINAL], curriculumCodes: ["RCoA Primary — Physics", "RCoA Final — Physics"] },
        workedExamples: { exams: [Exam.PRIMARY, Exam.FINAL] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL] },
      }}
      sectionSources={{
        objectives: ["Cross & Plunkett Ch.9", "BJA Education"],
        workedExamples: ["BJA Educ 2007", "Cross & Plunkett Ch.9", "BJA Education"],
        keyPoints: ["Al-Shaikh & Stacey Ch.8", "BJA Educ 2007", "Cross & Plunkett Ch.9", "BJA Educ Humidification 2018", "BJA Education"],
      }}
      keyPoints={[
        { text: "Absolute humidity at the carina = 44 mg/L at 37°C (100% RH); the isothermic saturation boundary (ISB) is normally at this level", cites: ["Al-Shaikh & Stacey Ch.8"] },
        { text: "Pneumotachographs (Fleisch/Lilly) measure flow via ΔP across a known resistance — valid only for laminar flow (Hagen-Poiseuille)", cites: ["BJA Educ 2007"] },
        { text: "Mass spectrometry ionises gas molecules and separates by m/z ratio in a magnetic field (r = mv/qB) — the only analyser to identify all gases simultaneously", cites: ["Cross & Plunkett Ch.9"] },
        { text: "N₂O and CO₂ share m/z = 44 — mass spec distinguishes them by fragmentation patterns; Raman distinguishes by unique vibrational shifts", cites: ["Al-Shaikh & Stacey Ch.8"] },
        { text: "Raman scattering is inelastic — frequency shift (Δν) unique to each molecule; can detect N₂ (unlike infrared absorption)", cites: ["BJA Educ 2007"] },
        { text: "Paramagnetic O₂ analyser exploits O₂'s two unpaired electrons (only O₂ and NO are paramagnetic among medical gases) — fast, accurate, no consumable", cites: ["Cross & Plunkett Ch.9"] },
        { text: "Infrared absorption measures CO₂ (4.26 µm), N₂O (4.5 µm) and all modern volatiles (8–13 µm fingerprint region) — only molecules with a changing dipole moment absorb IR (so O₂, N₂, Ar are invisible)", cites: ["Al-Shaikh & Stacey Ch.8"] },
        { text: "Collision broadening: N₂O broadens CO₂'s IR absorption peak → falsely high CO₂ reading unless the analyser compensates", cites: ["BJA Educ 2007"] },
        { text: "Mainstream (in-line) sampling = airway cuvette, real-time, no dilution, but heavy and CO₂-only; sidestream = remote analyser, multi-gas, ~2–3 s delay, risks dilution at low tidal volumes and needs scavenging", cites: ["Cross & Plunkett Ch.9"] },
        { text: "Modern HMEFs typically return 30–38 mg/L humidity on inspiration (passive, depending on device and minute ventilation) but add dead space; heated humidifiers can achieve the 44 mg/L alveolar target at the cost of condensation, circuit complexity and infection risk", cites: ["BJA Educ Humidification 2018", "Al-Shaikh & Stacey Ch.8"] },
      ]}
      coreConcepts={
        <>
          <ExamSection id="introduction" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Introduction" defaultOpen>
            <p className="text-muted-foreground leading-relaxed">
              Gas analysis and humidity management are fundamental to safe anaesthesia and ventilation. Understanding the physics
              of flow measurement, gas identification, and airway humidification underpins rational use of monitoring equipment
              and ventilator circuits. This topic covers pneumotachography, mass spectrometry, Raman scattering, and the physics
              of humidity — all core Primary FRCA material <InlineRef topicId="humidity-gas-sampling" refLabel="BJA Education" />.
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="diagram" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Interactive Diagrams">
            <HumidityGasSamplingDiagram />
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="humidity" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Humidity & Humidification">
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                <strong>Absolute humidity</strong> is the mass of water vapour per unit volume of gas (mg/L). <strong>Relative
                humidity</strong> is the ratio of actual water vapour content to the maximum possible at that temperature (%).
                At 37°C, the saturated vapour pressure of water is 6.3 kPa, giving an absolute humidity of 44 mg/L at 100% RH
                <InlineRef topicId="humidity-gas-sampling" refLabel="BJA Educ 2007" />.
              </p>
              <div className="rounded-lg border border-border p-3">
                <p className="font-semibold text-foreground">Complications of humidification</p>
                <ul className="mt-2 list-disc list-inside text-sm space-y-1">
                  <li><strong>HMEF:</strong> apparatus dead space and resistance; abrupt obstruction by secretions or blood; inadequate humidification with large leaks, high minute ventilation or prolonged use.</li>
                  <li><strong>Heated humidifier:</strong> overheating and airway thermal injury; under-heating and rain-out causing resistance, ventilator malfunction or aspiration.</li>
                  <li>Water reservoirs and condensate can become colonised; circuit complexity adds leak and disconnection points. Handle condensate away from the patient and use infection-control procedures.</li>
                </ul>
                <InlineRef topicId="humidity-gas-sampling" refLabel="BJA Educ Humidification 2018" />
              </div>
              <p>
                The nose warms, humidifies, and filters inspired gas. The point at which gas is fully conditioned to 37 °C and
                100% RH (44 mg/L) is the <strong>isothermic saturation boundary (ISB)</strong>. In a healthy, resting adult this
                lies in the large bronchi (around the 4th–5th generation; often approximated to the level of the carina for
                teaching). Endotracheal intubation bypasses the nose, shifting the ISB distally and risking mucociliary damage,
                secretion thickening, and heat loss <InlineRef topicId="humidity-gas-sampling" refLabel="Al-Shaikh & Stacey Ch.8" />.
              </p>
              <p>
                Modern <strong>heat and moisture exchange filters (HMEFs)</strong> passively trap heat and moisture from
                exhaled gas, typically returning <strong>30–38 mg/L</strong> on inspiration depending on the device and
                ventilation parameters <InlineRef topicId="humidity-gas-sampling" refLabel="BJA Educ Humidification 2018" />.
                They add mechanical dead space (30–90 mL).
              </p>
              <p>
                <strong>Heated water bath humidifiers.</strong> Inspired gas is passed over (<em>pass-over</em> design) or bubbled
                through (<em>bubble-through</em> design) a reservoir of heated water, leaving the chamber fully saturated so that at
                the airway it delivers <strong>100 % relative humidity at 37 °C ≈ 44 mg/L</strong> — the same conditioning the upper
                airway normally provides. Pass-over designs (often with a hydrophobic membrane or wick to increase surface area)
                add little resistance and generate no aerosol; bubble-through designs humidify more efficiently at high flows but
                raise resistance and can aerosolise contaminated water
                <InlineRef topicId="humidity-gas-sampling" refLabel="BJA Educ Humidification 2018" />.
              </p>
              <p>
                <strong>Components:</strong> a thermostatically controlled heater base, a disposable water chamber with an
                auto-feed reservoir, an airway temperature probe, and usually a <strong>heated wire in the inspiratory limb</strong>
                that keeps the circuit above chamber temperature to prevent condensation ("rain-out").
                <strong> Risks:</strong> thermal airway injury if the servo/thermostat fails or the probe is misplaced, scalding from
                the reservoir, condensate pooling that increases resistance and can be tipped into the airway, added circuit weight
                causing disconnection or accidental extubation, loss of PEEP if the circuit is broken to drain water, and bacterial
                colonisation of the warm reservoir (a nosocomial pneumonia risk with bubble-through systems in particular).
                They are also bulkier and more expensive than an HMEF and need a power supply
                <InlineRef topicId="humidity-gas-sampling" refLabel="BJA Educ 2007" />.
              </p>
              <p>
                <strong>Choosing between them:</strong> an HMEF is adequate for routine theatre ventilation and short-term ICU use
                (cheap, passive, also filters). Active heated humidification is preferred for <strong>prolonged ventilation</strong>,
                <strong> thick or tenacious secretions</strong> and mucus plugging, <strong>hypothermia</strong> or rewarming,
                tracheostomy and long-term airways, neonates and small children (where HMEF dead space is significant), high-flow
                nasal oxygen, and whenever an HMEF's added dead space or resistance is not tolerated (severe airflow obstruction,
                permissive hypercapnia, low tidal volumes)
                <InlineRef topicId="humidity-gas-sampling" refLabel="BJA Educ Humidification 2018" />.
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="hygrometers" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Measurement of Humidity — Hygrometers">
            <div className="text-muted-foreground leading-relaxed mb-3 space-y-3">
            <p>
              Four hygrometer types are commonly examined: the <strong>hair</strong> hygrometer (mechanical), the
              <strong> wet-and-dry bulb</strong> psychrometer (latent heat of evaporation), <strong>Regnault's dew-point</strong>
              hygrometer (the gold-standard absolute method), and the modern <strong>electrical / capacitance</strong> sensor
              found in every contemporary anaesthetic monitor. Step through each animation to see the underlying physics.
            </p>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li><strong>Wet-and-dry bulb psychrometer:</strong> one thermometer is dry and one is wrapped in a water-soaked wick. Evaporation removes latent heat and cools the wet bulb; a larger temperature difference means drier gas, and a psychrometric chart converts the pair of readings to relative humidity.</li>
              <li><strong>Regnault dew-point hygrometer:</strong> cool a polished silvered surface until condensation first appears. At that dew point the adjacent gas is saturated, allowing absolute humidity to be read from saturated water-vapour data.</li>
              <li><strong>Hair hygrometer:</strong> degreased organic fibres lengthen as humidity rises and mechanically move a pointer; it is simple but slow and requires calibration.</li>
              <li><strong>Electrical / capacitance hygrometer:</strong> a parallel-plate capacitor whose hygroscopic dielectric (usually a thin polymer film) absorbs water vapour. Absorbed water raises the dielectric constant, so capacitance rises with humidity; the change is measured electronically (often as a shift in the resonant frequency of an oscillator circuit) and displayed directly as relative humidity. It is small, fast-responding and needs no moving parts, which is why it is the sensor used in anaesthetic machines and ICU ventilators. Resistance-based (electrolytic) variants work on the same absorption principle but measure a fall in resistance instead.</li>
            </ul>
            <InlineRef topicId="humidity-gas-sampling" refLabel="BJA Educ 2007" />
            </div>
            <HygrometersDiagram />
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="pneumotachography" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Pneumotachography">
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                A pneumotachograph measures gas flow by detecting the pressure difference (ΔP) across a known fixed resistance.
                The <strong>Fleisch</strong> type uses parallel capillary tubes to ensure laminar flow; the <strong>Lilly</strong>
                type uses a fine wire mesh screen. In both, ΔP is proportional to flow (Hagen-Poiseuille equation), but only
                while flow remains laminar <InlineRef topicId="humidity-gas-sampling" refLabel="Cross & Plunkett Ch.9" />.
              </p>
              <p>
                For laminar flow, Hagen–Poiseuille gives <strong>Q = ΔP/R</strong>, with resistance proportional to gas viscosity,
                tube length and 1/radius⁴. The parallel capillaries of a Fleisch head and mesh of a Lilly head create a known,
                approximately linear resistance, so a differential transducer converts ΔP into flow. Variable-orifice devices instead
                use the Bernoulli relationship and are more density dependent <InlineRef topicId="humidity-gas-sampling" refLabel="BJA 1983 Pneumotachography" />.
              </p>
              <p>
                <strong>Lilly type in detail.</strong> A single fine stainless-steel or nylon <strong>mesh screen</strong> (sometimes
                two in series) placed across the gas path provides the fixed resistance, and ΔP measured either side obeys the same
                relationship <strong>ΔP = Flow × R</strong>. Compared with the Fleisch head, the Lilly screen is
                <strong> more robust, lighter and much shorter</strong> (less dead space), easier to clean or replace, and less easily
                blocked by droplets of water because there are no long narrow capillaries to occlude. Its weakness is that the mesh
                resistance <strong>changes if it is contaminated</strong> with secretions, blood or nebulised drug, or if the screen
                is damaged or partly torn — either way the calibration is lost and readings drift. Like the Fleisch head it must be
                <strong> heated to around body temperature</strong> (or placed proximal to an HME) to prevent condensation on the
                screen, and it is sensitive to gas composition, so calibration should match the gas mixture in use
                <InlineRef topicId="humidity-gas-sampling" refLabel="Cross & Plunkett Ch.9" />.
              </p>
              <p>
                The flow signal is <strong>integrated electronically</strong> to derive volume (tidal volume, minute ventilation).
                Both types must be <strong>heated to body temperature</strong> to prevent condensation on the resistance element,
                which would increase resistance and cause inaccuracy. Changes in gas composition (viscosity, density) also affect readings
                <InlineRef topicId="humidity-gas-sampling" refLabel="Cross & Plunkett Ch.9" />. At high flow, turbulence breaks the
                linear ΔP–flow relationship; N₂O, oxygen and air differ in viscosity, so calibration must match gas composition.
              </p>
              <div className="rounded-lg border border-border p-3">
                <p className="font-semibold text-foreground">Sources of error and calibration</p>
                <ul className="mt-2 list-disc list-inside text-sm space-y-2">
                  <li>
                    <strong>Condensation.</strong> Expired gas cools below its dew point and water condenses on the
                    resistive element (Fleisch capillary bundle or Lilly mesh), narrowing the effective radius. Because
                    ΔP ∝ 1/r⁴, resistance rises so the measured pressure drop for a given flow increases and the device
                    <strong> over-reads flow/volume</strong>; droplets also cause erratic, noisy traces. Prevented by an
                    integral heating element maintaining <strong>37–40 °C</strong> and by siting the head proximal to the
                    patient's expiratory water load or on the inspiratory limb <InlineRef topicId="humidity-gas-sampling" refLabel="BJA 1983 Pneumotachography" />.
                  </li>
                  <li>
                    <strong>Gas composition.</strong> The pneumotachograph relies on laminar flow and Hagen–Poiseuille, so
                    it is <strong>viscosity-dependent</strong> — adding a more viscous gas such as nitrous oxide (or
                    changing FiO₂, helium or volatile agent concentration) alters ΔP for the same flow. Contrast with
                    variable-orifice/turbulent devices (e.g. Wright respirometer, rotameter at high flow, peak-flow
                    meters) which are <strong>density-dependent</strong> (Bernoulli). Modern workstations compensate
                    electronically using the measured gas mixture <InlineRef topicId="humidity-gas-sampling" refLabel="Cross & Plunkett Ch.9" />.
                  </li>
                  <li>
                    <strong>Turbulence.</strong> The linear pressure–flow relationship holds only while flow is laminar
                    (Reynolds number below ~2000). At high peak inspiratory flows, or with a partially obstructed
                    element, flow becomes turbulent, ΔP rises with the square of flow and the device
                    <strong> under-reads</strong> unless corrected. The Fleisch design (many parallel narrow capillaries,
                    each with a low Reynolds number) exists to keep flow laminar; smooth tapered inlets reduce entry
                    turbulence <InlineRef topicId="humidity-gas-sampling" refLabel="BJA 1983 Pneumotachography" />.
                  </li>
                  <li>
                    <strong>Calibration and drift.</strong> Two-point calibration with a known volume delivered from a
                    1- or 3-litre calibration syringe at physiological flows, zeroing of the differential pressure
                    transducer at no flow (baseline drift otherwise causes cumulative volume error when flow is
                    integrated over time), calibration for the specific gas mixture and BTPS correction, plus regular
                    checks for a blocked element or leaking sampling tubing <InlineRef topicId="humidity-gas-sampling" refLabel="Cross & Plunkett Ch.9" />.
                  </li>
                </ul>
              </div>
            </div>
            <CrossReferenceCallout
              reason="Detailed discussion of the Fleisch and Lilly pneumotachographs, sources of error, and clinical use."
              links={[{ topicId: "flow-measurement" }]}
            />
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="mass-spec" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Mass Spectrometry">
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                The mass spectrometer is <strong>one of two clinical methods (the other being Raman scattering) capable of
                identifying all respiratory and anaesthetic gases simultaneously</strong>. Gas molecules are ionised by electron
                bombardment in a high vacuum, then accelerated through a voltage gradient and deflected by a magnetic field. The
                radius of curvature depends on mass-to-charge ratio: <strong>r = mv/qB</strong>. Lighter ions curve more tightly
                <InlineRef topicId="humidity-gas-sampling" refLabel="Cross & Plunkett Ch.9" />.
              </p>
              <p>
                A key exam point: <strong>N₂O and CO₂ both have m/z = 44</strong>. The mass spectrometer distinguishes them by
                their different fragmentation patterns (daughter ions). The instrument is expensive, large, and requires a high
                vacuum pump, but can be multiplexed to serve multiple operating theatres via a rotating valve and long sampling lines
                <InlineRef topicId="humidity-gas-sampling" refLabel="Cross & Plunkett Ch.9" />.
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="raman" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Raman Scattering">
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                When monochromatic light (argon laser) interacts with gas molecules, most photons scatter elastically
                (<strong>Rayleigh scattering</strong> — same frequency). A tiny fraction (~1 in 10⁷) scatter inelastically
                with a frequency shift corresponding to the molecule's vibrational energy — this is <strong>Raman scattering</strong>
                <InlineRef topicId="humidity-gas-sampling" refLabel="Cross & Plunkett Ch.9" />.
              </p>
              <p>
                The <strong>Stokes shift</strong> (lower frequency) is most commonly measured. Each molecule has a unique Raman
                shift acting as a fingerprint. Unlike infrared absorption (which requires a changing dipole moment), Raman can
                detect <strong>homonuclear diatomic molecules</strong> like N₂ and O₂. It can also distinguish N₂O from CO₂
                by their different vibrational modes — something IR absorption finds challenging
                <InlineRef topicId="humidity-gas-sampling" refLabel="Cross & Plunkett Ch.9" />.
              </p>
              <p>
                <strong>Clinical Raman analysers</strong> include the Rascal™/Rascal II and Datex-Ohmeda Raman gas analyser. They can
                quantify O₂, N₂, CO₂, N₂O and volatile agents simultaneously, distinguish CO₂ from N₂O despite their identical molecular
                mass, and separate isomers such as isoflurane and enflurane by their unique spectra. They need no vacuum, but the Raman
                signal is extremely weak: powerful lasers, sensitive photodetectors and a relatively large, expensive optical system are
                required. Water vapour can interfere, and response is slower than dedicated paramagnetic O₂ or infrared CO₂ channels.
                These disadvantages leave Raman as a capable but niche clinical technology
                <InlineRef topicId="humidity-gas-sampling" refLabel="Cross & Plunkett Ch.9" />.
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="paramagnetic" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Paramagnetic Oxygen Analysis">
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                Most molecules are <strong>diamagnetic</strong> (all electrons paired) and are weakly repelled by a magnetic field.
                <strong> Oxygen is unusual</strong>: its molecular orbital structure leaves <strong>two unpaired electrons</strong>,
                making it strongly <strong>paramagnetic</strong> — attracted into a magnetic field. Among medical gases only O₂
                and nitric oxide (NO) show this property, so the measurement is essentially specific for O₂
                <InlineRef topicId="humidity-gas-sampling" refLabel="Cross & Plunkett Ch.9" />.
              </p>
              <p>
                The classic <strong>Pauling analyser</strong> suspends two nitrogen-filled glass spheres ("dumb-bell") in a
                non-uniform magnetic field. Sample gas containing O₂ enters the chamber; the O₂ is drawn into the strongest
                part of the field, displacing the spheres and rotating the dumb-bell. A mirror on the suspension reflects a
                light beam onto a photocell; a feedback current is applied to hold the dumb-bell stationary, and that current
                is proportional to the partial pressure of O₂ <InlineRef topicId="humidity-gas-sampling" refLabel="Cross & Plunkett Ch.9" />.
              </p>
              <p>
                Modern monitors use a <strong>differential pressure (fast-response) paramagnetic cell</strong>: sample gas and
                a reference gas are alternately pulled into a chamber containing a switched electromagnet. The pressure
                difference oscillating across a sensitive transducer is proportional to the difference in O₂ concentration
                — giving a <strong>response time fast enough for breath-by-breath inspired/expired O₂ measurement</strong>
                (used to track oxygen uptake and during low-flow anaesthesia) <InlineRef topicId="humidity-gas-sampling" refLabel="Cross & Plunkett Ch.9" />.
              </p>
              <p>
                Strengths: highly accurate, linear, no consumable element, fast. Weaknesses: sensitive to water vapour
                (sample line must be dried), affected by sample-gas pressure changes, and the static Pauling type is slow
                (only suitable for FiO₂ trending) <InlineRef topicId="humidity-gas-sampling" refLabel="Cross & Plunkett Ch.9" />.
              </p>
            </div>

            <ParamagneticO2Diagram />

            <CrossReferenceCallout
              reason="The galvanic fuel cell and Clark electrode are the electrochemical alternatives for measuring O₂ partial pressure (in the breathing circuit and in arterial blood respectively)."
              links={[{ topicId: "abg-analyser" }]}
            />
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="infrared" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Infrared Absorption — CO₂, N₂O and Volatile Agents">
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                Polyatomic molecules with a <strong>changing dipole moment</strong> during vibration absorb infrared radiation
                at characteristic wavelengths. A broad-spectrum IR source illuminates the sample chamber; the gas absorbs
                specific wavelengths and the residual transmitted intensity is measured by a detector. The fractional
                absorption follows the <strong>Beer-Lambert law</strong> (A = εcl), so the signal is proportional to the
                partial pressure of the target gas. Here <strong>A</strong> is absorbance (log₁₀ of incident/transmitted intensity),
                <strong> ε</strong> is the wavelength-specific molar absorption coefficient, <strong>c</strong> is gas concentration and
                <strong> l</strong> is optical path length <InlineRef topicId="humidity-gas-sampling" refLabel="Al-Shaikh & Stacey Ch.8" />.
              </p>
              <p>
                <strong>Characteristic absorption bands:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong>CO₂</strong> — 4.26 µm (asymmetric stretch). Used in every capnograph.</li>
                <li><strong>N₂O</strong> — 4.5 µm (and a secondary peak near 3.9 µm).</li>
                <li><strong>Volatile agents (sevoflurane, isoflurane, desflurane, halothane, enflurane)</strong> — broad
                  absorption in the <strong>8–13 µm "fingerprint" region</strong>. Each agent has a slightly different
                  spectrum, so a multi-wavelength analyser (or a tunable filter / Fourier-transform IR) can both
                  <strong> identify</strong> the agent and <strong>quantify</strong> its concentration <InlineRef topicId="humidity-gas-sampling" refLabel="Al-Shaikh & Stacey Ch.8" />.</li>
                <li><strong>O₂, N₂, Ar, He</strong> — homonuclear or monoatomic → no changing dipole → <strong>not detected</strong>
                  by IR. O₂ requires paramagnetic, electrochemical or Raman analysis.</li>
              </ul>
              <p>
                <strong>Pitfalls and corrections:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong>Collision (pressure) broadening:</strong> N₂O molecules collide with CO₂ and broaden its
                  4.26 µm absorption peak, causing the analyser to <em>overestimate</em> CO₂. Modern analysers measure N₂O
                  simultaneously and apply software correction <InlineRef topicId="humidity-gas-sampling" refLabel="BJA Educ 2007" />.</li>
                <li><strong>Agent cross-sensitivity:</strong> volatile spectra overlap. A single-wavelength agent monitor
                  will give a wrong reading if the wrong agent is selected; modern multi-wavelength analysers identify the
                  agent automatically and warn if a mixture is present (e.g. residual desflurane during a sevoflurane case) <InlineRef topicId="humidity-gas-sampling" refLabel="Al-Shaikh & Stacey Ch.8" />.</li>
                <li><strong>Water vapour and condensation</strong> in the sampling line shift readings — sample lines use
                  Nafion™ tubing that selectively allows water vapour to equilibrate with room air <InlineRef topicId="humidity-gas-sampling" refLabel="Al-Shaikh & Stacey Ch.8" />.</li>
                <li><strong>Sidestream sampling delay</strong> (≈2–3 s) and <strong>aspiration rate</strong> (typically
                  150–200 mL/min) must be matched to tidal volume in neonates to avoid dilution <InlineRef topicId="humidity-gas-sampling" refLabel="Cross & Plunkett Ch.9" />.</li>
              </ul>
              <p>
                <strong>Hardware variants:</strong> dispersive IR (rotating filter wheel selects wavelength); non-dispersive
                IR (NDIR — uses specific optical filters and detectors for each target gas, the original implementation being
                the dual-chamber Luft cell; NDIR is the dominant design in modern clinical monitors); and photoacoustic
                spectroscopy (pulsed IR heats the gas → pressure pulse detected by a microphone — used in the Brüel & Kjær
                multi-gas analyser) <InlineRef topicId="humidity-gas-sampling" refLabel="Al-Shaikh & Stacey Ch.8" />.
              </p>
            </div>
            <CrossReferenceCallout
              reason="The capnograph waveform and its mainstream vs sidestream sampling options are the bedside application of this 4.26 µm CO₂ absorption."
              links={[{ topicId: "pulse-oximetry" }]}
            />
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="sampling-site" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Mainstream (in-line) vs Sidestream Sampling">
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                Once a gas analyser exists, the next engineering question is <strong>where to put the sensor relative to the
                breathing circuit</strong>. Two designs dominate clinical practice <InlineRef topicId="humidity-gas-sampling" refLabel="Cross & Plunkett Ch.9" />:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong>Mainstream (in-line)</strong> — the IR sensor sits in a cuvette inserted directly between the
                  catheter mount and the breathing circuit; expired gas flows <em>through</em> the measuring cell.</li>
                <li><strong>Sidestream (diverting)</strong> — a fine sampling line aspirates ≈ 50–250 mL/min of gas from a
                  T-piece at the airway and delivers it to a remote analyser inside the monitor.</li>
              </ul>

              <div className="my-3">
                <GasSamplingSiteDiagram />
                <p className="text-xs text-muted-foreground mt-2 italic">
                  Toggle between the two configurations to see exactly where the sensing element sits in the circuit:
                  the mainstream cuvette is in the gas stream at the catheter mount, while the sidestream T-piece feeds
                  a remote analyser via a 2–3 m sample line and water trap.
                </p>
              </div>

              <div className="overflow-x-auto mt-2">
                <table className="w-full text-sm border border-border rounded-lg">
                  <thead className="bg-secondary/40">
                    <tr>
                      <th className="text-left p-2 text-foreground font-semibold">Feature</th>
                      <th className="text-left p-2 text-foreground font-semibold">Mainstream (in-line)</th>
                      <th className="text-left p-2 text-foreground font-semibold">Sidestream</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-t border-border">
                      <td className="p-2 font-medium text-foreground">Sensor location</td>
                      <td className="p-2">In the airway, at the catheter mount</td>
                      <td className="p-2">Inside the monitor; gas aspirated via 2–3 m sample line</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="p-2 font-medium text-foreground">Response time / delay</td>
                      <td className="p-2">Real-time (essentially zero transit delay)</td>
                      <td className="p-2">~2–4 s transit delay + rise time</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="p-2 font-medium text-foreground">Waveform fidelity</td>
                      <td className="p-2">Sharp — best for detecting subtle expired CO₂ changes (e.g. ROSC)</td>
                      <td className="p-2">Slightly damped; further degraded if sample flow is too low or tubing too long</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="p-2 font-medium text-foreground">Gases measured</td>
                      <td className="p-2">Usually CO₂ only (single-wavelength IR)</td>
                      <td className="p-2">CO₂, N₂O, O₂ and all volatile agents — multi-gas analysis</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="p-2 font-medium text-foreground">Weight at the airway</td>
                      <td className="p-2">Heavy cuvette + cable — risk of ETT kinking, accidental extubation</td>
                      <td className="p-2">Light T-piece adaptor only</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="p-2 font-medium text-foreground">Dead space added</td>
                      <td className="p-2">5–10 mL adult cuvette (significant in neonates)</td>
                      <td className="p-2">Negligible (&lt; 1 mL adaptor)</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="p-2 font-medium text-foreground">Water / secretions</td>
                      <td className="p-2">Cuvette window can fog or soil → drift; heated to 39 °C to prevent condensation</td>
                      <td className="p-2">Water trap + Nafion™ tubing remove water vapour selectively</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="p-2 font-medium text-foreground">Gas dilution</td>
                      <td className="p-2">None — measures actual airway gas</td>
                      <td className="p-2">Aspiration rate (150–200 mL/min) can dilute small tidal volumes (neonates,
                        HFOV, jet ventilation) → falsely low ETCO₂</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="p-2 font-medium text-foreground">Scavenging</td>
                      <td className="p-2">Not required (gas returns to circuit)</td>
                      <td className="p-2">Sampled gas (containing volatile/N₂O) must be returned to the circuit or
                        scavenged; otherwise increases fresh-gas requirement</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="p-2 font-medium text-foreground">Suitability for non-intubated patients</td>
                      <td className="p-2">Poor — needs sealed circuit</td>
                      <td className="p-2">Good — nasal cannula sampling line works during sedation, recovery,
                        procedural sedation</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="p-2 font-medium text-foreground">Cost / robustness</td>
                      <td className="p-2">Higher per-use cost (disposable airway sensor or fragile reusable head)</td>
                      <td className="p-2">Cheap consumable (sample line, water trap)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p>
                <strong>Why modern theatre monitors are sidestream:</strong> the multi-gas requirement (O₂ paramagnetic
                + IR for CO₂/N₂O/agent) is impossible to package into a lightweight in-airway cuvette, so the analyser
                has to live inside the monitor and the gas must be brought to it. The 2–3 second transit delay is
                acceptable for steady-state monitoring of a ventilated adult.
              </p>
              <p>
                <strong>When mainstream wins:</strong> neonatal/paediatric ventilation (no aspiration loss, no dilution),
                pre-hospital and transport CO₂ monitoring (no pump, lower power), and high-fidelity capnography during
                CPR where small/early ETCO₂ changes signal ROSC.
              </p>
              <p>
                <strong>Common sidestream pitfalls in vivas:</strong> kinked or water-blocked sample line → flat trace;
                disconnection at the T-piece → <em>room-air dilution</em> of the sampled gas → falsely low ETCO₂ with
                preserved waveform shape; long sample line in low-flow anaesthesia → loss of fresh gas if not returned to
                the circuit.
              </p>
            </div>
            <CrossReferenceCallout
              reason="Capnography phases and the α/β angles are interpreted on the waveform produced by whichever sampling design is in use."
              links={[{ topicId: "pulse-oximetry" }]}
            />
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="analyser-comparison" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Comparison of Gas-Concentration Analysers">
            <p className="text-muted-foreground leading-relaxed mb-3">
              Each technique has a niche; modern anaesthetic monitors combine <strong>paramagnetic</strong> (O₂) with
              <strong> multi-wavelength infrared</strong> (CO₂, N₂O, volatile agent) and an <strong>electrochemical</strong> back-up
              for inspired O₂ alarming.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead className="bg-secondary/40">
                  <tr>
                    <th className="text-left p-2 text-foreground font-semibold">Technique</th>
                    <th className="text-left p-2 text-foreground font-semibold">Gases measured</th>
                    <th className="text-left p-2 text-foreground font-semibold">Principle</th>
                    <th className="text-left p-2 text-foreground font-semibold">Strength / Limitation</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-t border-border">
                    <td className="p-2 font-medium text-foreground">Paramagnetic</td>
                    <td className="p-2">O₂ (and NO)</td>
                    <td className="p-2">Unpaired electrons attracted into magnetic field</td>
                    <td className="p-2">Fast, accurate, no consumable / sensitive to water vapour</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-2 font-medium text-foreground">Infrared absorption</td>
                    <td className="p-2">CO₂, N₂O, volatile agents</td>
                    <td className="p-2">Beer-Lambert at agent-specific wavelengths</td>
                    <td className="p-2">Cheap, fast / collision broadening, agent cross-sensitivity, blind to O₂/N₂</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-2 font-medium text-foreground">Galvanic fuel cell</td>
                    <td className="p-2">O₂ (FiO₂)</td>
                    <td className="p-2">Spontaneous redox: O₂ + lead → EMF</td>
                    <td className="p-2">No power needed / consumable lead anode (~6–12 mo)</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-2 font-medium text-foreground">Clark electrode</td>
                    <td className="p-2">O₂ (PaO₂ in blood)</td>
                    <td className="p-2">Polarographic — current proportional to PO₂</td>
                    <td className="p-2">Gold standard for blood gas / needs polarising voltage, drift</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-2 font-medium text-foreground">Mass spectrometry</td>
                    <td className="p-2">All respiratory and anaesthetic gases</td>
                    <td className="p-2">Ionise → deflect by m/z (r = mv/qB)</td>
                    <td className="p-2">Universal, multiplexable / large, expensive, vacuum required; N₂O ≡ CO₂ at m/z 44</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-2 font-medium text-foreground">Raman scattering</td>
                    <td className="p-2">All gases including N₂, O₂</td>
                    <td className="p-2">Inelastic photon scatter — vibrational fingerprint</td>
                    <td className="p-2">Unambiguous, fast / weak signal, expensive laser, niche use</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              <strong>Exam tip:</strong> if a question gives you a single medical gas to measure, the canonical answer is
              usually paramagnetic for O₂, infrared for CO₂/N₂O/volatiles, fuel cell for circuit FiO₂ and Clark electrode for
              arterial blood. Mass spectrometry and Raman appear in "which analyser identifies <em>all</em> gases?" stems.
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="electrochemical-o2" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Electrochemical Oxygen Analysers">
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                Two electrochemical devices measure oxygen partial pressure by consuming O₂ at a cathode; they differ
                chiefly in whether they need an external power supply.
              </p>
              <div className="rounded-lg border border-border p-3">
                <p className="font-semibold text-foreground">Galvanic fuel cell (FiO₂ in the breathing system)</p>
                <p className="mt-2 text-sm">
                  A lead (or occasionally cadmium) anode and a gold/silver mesh cathode sit in potassium hydroxide
                  electrolyte behind an oxygen-permeable membrane. <strong>Cathode:</strong> O₂ + 2H₂O + 4e⁻ → 4OH⁻.
                  <strong> Anode:</strong> Pb + 2OH⁻ → PbO + H₂O + 2e⁻ (i.e. Pb → Pb²⁺ + 2e⁻). It is a
                  <strong> self-powered battery</strong> — the current, and hence the voltage across a fixed resistor,
                  is proportional to the partial pressure of oxygen. Response is slow (~20–30 s), so it reads mean
                  rather than breath-by-breath FiO₂; the anode is <strong>irreversibly consumed</strong>, giving a
                  finite lifespan of roughly <strong>6–12 months</strong> that is shortened by continuous exposure to
                  high FiO₂; output is temperature-dependent (thermistor-compensated) and it reads partial pressure, so
                  readings change with ambient pressure <InlineRef topicId="humidity-gas-sampling" refLabel="Cross & Plunkett Ch.9" />.
                </p>
              </div>
              <div className="rounded-lg border border-border p-3">
                <p className="font-semibold text-foreground">Clark polarographic electrode (PaO₂ in a blood-gas analyser)</p>
                <p className="mt-2 text-sm">
                  The key difference is that it requires an <strong>external polarising voltage</strong> of about
                  0.6 V. A platinum cathode and silver/silver chloride anode sit in potassium chloride electrolyte
                  behind an oxygen-permeable (polypropylene/Teflon) membrane. <strong>Cathode:</strong> O₂ + 2H₂O + 4e⁻
                  → 4OH⁻. <strong>Anode:</strong> 4Ag + 4Cl⁻ → 4AgCl + 4e⁻. Current flow is proportional to the number
                  of oxygen molecules reduced at the cathode, i.e. to PO₂, and is linear over the clinical range. It
                  has a faster response than a fuel cell; is maintained at 37 °C; requires two-point calibration; the
                  anode is not consumed, but protein deposition on the membrane and volatile agents (halothane can be
                  reduced at the cathode) cause error <InlineRef topicId="humidity-gas-sampling" refLabel="Cross & Plunkett Ch.9" />.
                </p>
              </div>
              <p className="text-sm">
                <strong>Compare and contrast:</strong> the galvanic fuel cell is a self-generating battery with a
                consumable anode, used to alarm on breathing-system FiO₂; the Clark electrode is externally polarised,
                does not consume its anode, and is used to measure PaO₂ in blood <InlineRef topicId="humidity-gas-sampling" refLabel="Al-Shaikh & Stacey Ch.8" />.
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>
          <ExamPitfallsCallout
            accent="physics"
            pitfalls={[
              "Absolute humidity = mass of water per volume (mg/L); relative humidity = % of saturation at that temperature.",
              "Fully saturated alveolar gas at 37 °C carries 44 mg/L of water — this is the target for HMEs and active humidifiers.",
              "Mass spectrometry separates ions by mass:charge ratio; Raman scattering uses inelastic light scattering — both can identify multiple gases simultaneously.",
              "Pneumotachograph (Fleisch) measures pressure drop across a laminar-flow resistance — flow ∝ ΔP only while flow stays laminar.",
              "Side-stream capnography has a 1–2 s delay; main-stream is faster but adds bulk and dead-space at the airway.",
            ]}
          />
          <TopicFaqs faqs={humidityGasSamplingFaqs} />

        </>
      }
    />
  );
};

export default HumidityGasSamplingTopic;

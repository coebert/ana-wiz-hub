import { TopicTemplate } from "@/components/TopicTemplate";
import { ExamSection } from "@/components/ExamSection";
import { WorkedExample } from "@/components/WorkedExamples";
import HumidityGasSamplingDiagram from "@/components/diagrams/HumidityGasSamplingDiagram";
import HygrometersDiagram from "@/components/diagrams/HygrometersDiagram";
import { CrossReferenceCallout } from "@/components/CrossReferenceCallout";
import { humidityGasSamplingQuiz } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";

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
      "About 264 mg/min of water (and ~14 W of heat) is lost from the lower airway. Over hours this dries secretions, impairs ciliary function and contributes to hypothermia — mandating an HME (≈25–30 mg/L) or active heated humidifier (44 mg/L) in any prolonged anaesthetic.",
  },
  {
    title: "Distinguishing N₂O from CO₂ on a gas analyser",
    scenario:
      "A combined gas analyser reports rising CO₂ during a laparoscopic case. Why might mass spectrometry alone be ambiguous, and what alternative confirms the gas identity?",
    working:
      "Mass spec separates by m/z. N₂O and CO₂ both have molecular m/z = 44 → primary peak overlaps.\nFragmentation patterns differ (CO₂ → m/z 28, 16; N₂O → m/z 30, 14) so high-resolution mass spec can still distinguish them, but the primary peak alone is not specific.\nInfrared absorption can resolve them (different absorption bands).\nRaman scattering is unambiguous: each molecule has a unique vibrational shift, including for homonuclear gases like N₂ that are invisible to IR.",
    answer:
      "Rely on either the fragmentation pattern (m/z 28 vs 30), an IR analyser tuned to CO₂'s 4.26 µm band, or Raman spectroscopy. In modern theatres the dual IR/paramagnetic analyser is the standard solution.",
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
        objectives: ["Cross & Plunkett Ch.9"],
      }}
      keyPoints={[
        "Absolute humidity at the carina = 44 mg/L at 37°C (100% RH); the isothermic saturation boundary (ISB) is normally at this level",
        "Pneumotachographs (Fleisch/Lilly) measure flow via ΔP across a known resistance — valid only for laminar flow (Hagen-Poiseuille)",
        "Mass spectrometry ionises gas molecules and separates by m/z ratio in a magnetic field (r = mv/qB) — the only analyser to identify all gases simultaneously",
        "N₂O and CO₂ share m/z = 44 — mass spec distinguishes them by fragmentation patterns; Raman distinguishes by unique vibrational shifts",
        "Raman scattering is inelastic — frequency shift (Δν) unique to each molecule; can detect N₂ (unlike infrared absorption)",
        "Paramagnetic O₂ analyser exploits O₂'s two unpaired electrons (only O₂ and NO are paramagnetic among medical gases) — fast, accurate, no consumable",
        "Infrared absorption measures CO₂ (4.26 µm), N₂O (4.5 µm) and all modern volatiles (8–13 µm fingerprint region) — only molecules with a changing dipole moment absorb IR (so O₂, N₂, Ar are invisible)",
        "Collision broadening: N₂O broadens CO₂'s IR absorption peak → falsely high CO₂ reading unless the analyser compensates",
        "HME filters provide 25–30 mg/L humidity passively but add dead space; heated humidifiers achieve 44 mg/L but risk condensation",
      ]}
      coreConcepts={
        <>
          <ExamSection id="introduction" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Gas analysis and humidity management are fundamental to safe anaesthesia and ventilation. Understanding the physics
              of flow measurement, gas identification, and airway humidification underpins rational use of monitoring equipment
              and ventilator circuits. This topic covers pneumotachography, mass spectrometry, Raman scattering, and the physics
              of humidity — all core Primary FRCA material.
            </p>
          </ExamSection>

          <ExamSection id="diagram" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <h2 className="text-xl font-bold text-foreground mb-4">Interactive Diagrams</h2>
            <HumidityGasSamplingDiagram />
          </ExamSection>

          <ExamSection id="humidity" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Humidity & Humidification</h2>
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                <strong>Absolute humidity</strong> is the mass of water vapour per unit volume of gas (mg/L). <strong>Relative
                humidity</strong> is the ratio of actual water vapour content to the maximum possible at that temperature (%).
                At 37°C, the saturated vapour pressure of water is 6.3 kPa, giving an absolute humidity of 44 mg/L at 100% RH.
              </p>
              <p>
                The nose warms, humidifies, and filters inspired gas. At the <strong>isothermic saturation boundary (ISB)</strong>,
                normally at the carina, gas is fully conditioned to 37°C and 44 mg/L. Endotracheal intubation bypasses the nose,
                shifting the ISB distally and risking mucociliary damage, secretion thickening, and heat loss.
              </p>
              <p>
                <strong>HME filters</strong> passively trap heat and moisture from exhaled gas, returning 25–30 mg/L on inspiration.
                They add mechanical dead space (30–90 mL). <strong>Heated water bath humidifiers</strong> actively achieve 44 mg/L
                but carry risks of circuit condensation, infection, and airway burns.
              </p>
            </div>
          </ExamSection>

          <ExamSection id="hygrometers" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Measurement of Humidity — Hygrometers</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Four hygrometer types are commonly examined: the <strong>hair</strong> hygrometer (mechanical), the
              <strong> wet-and-dry bulb</strong> psychrometer (latent heat of evaporation), <strong>Regnault's dew-point</strong>
              hygrometer (the gold-standard absolute method), and the modern <strong>electrical / capacitance</strong> sensor
              found in every contemporary anaesthetic monitor. Step through each animation to see the underlying physics.
            </p>
            <HygrometersDiagram />
          </ExamSection>

          <ExamSection id="pneumotachography" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Pneumotachography</h2>
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                A pneumotachograph measures gas flow by detecting the pressure difference (ΔP) across a known fixed resistance.
                The <strong>Fleisch</strong> type uses parallel capillary tubes to ensure laminar flow; the <strong>Lilly</strong>
                type uses a fine wire mesh screen. In both, ΔP is proportional to flow (Hagen-Poiseuille equation), but only
                while flow remains laminar.
              </p>
              <p>
                The flow signal is <strong>integrated electronically</strong> to derive volume (tidal volume, minute ventilation).
                Both types must be <strong>heated to body temperature</strong> to prevent condensation on the resistance element,
                which would increase resistance and cause inaccuracy. Changes in gas composition (viscosity, density) also affect readings.
              </p>
            </div>
          </ExamSection>

          <ExamSection id="mass-spec" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Mass Spectrometry</h2>
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                The mass spectrometer is the <strong>only gas analyser that can identify all respiratory and anaesthetic gases
                simultaneously</strong>. Gas molecules are ionised by electron bombardment in a high vacuum, then accelerated
                through a voltage gradient and deflected by a magnetic field. The radius of curvature depends on mass-to-charge
                ratio: <strong>r = mv/qB</strong>. Lighter ions curve more tightly.
              </p>
              <p>
                A key exam point: <strong>N₂O and CO₂ both have m/z = 44</strong>. The mass spectrometer distinguishes them by
                their different fragmentation patterns (daughter ions). The instrument is expensive, large, and requires a high
                vacuum pump, but can be multiplexed to serve multiple operating theatres via a rotating valve and long sampling lines.
              </p>
            </div>
          </ExamSection>

          <ExamSection id="raman" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Raman Scattering</h2>
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                When monochromatic light (argon laser) interacts with gas molecules, most photons scatter elastically
                (<strong>Rayleigh scattering</strong> — same frequency). A tiny fraction (~1 in 10⁷) scatter inelastically
                with a frequency shift corresponding to the molecule's vibrational energy — this is <strong>Raman scattering</strong>.
              </p>
              <p>
                The <strong>Stokes shift</strong> (lower frequency) is most commonly measured. Each molecule has a unique Raman
                shift acting as a fingerprint. Unlike infrared absorption (which requires a changing dipole moment), Raman can
                detect <strong>homonuclear diatomic molecules</strong> like N₂ and O₂. It can also distinguish N₂O from CO₂
                by their different vibrational modes — something IR absorption and mass spectrometry find challenging.
              </p>
              <p>
                <strong>Clinical Raman analysers</strong> (e.g., Rascal™) are fast, measure all gases, and don't require a vacuum.
                However, the signal is extremely weak, requiring sensitive photodetectors and powerful lasers, making the equipment
                expensive. They are not widely used in current clinical practice.
              </p>
            </div>
          </ExamSection>

          <ExamSection id="paramagnetic" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Paramagnetic Oxygen Analysis</h2>
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                Most molecules are <strong>diamagnetic</strong> (all electrons paired) and are weakly repelled by a magnetic field.
                <strong> Oxygen is unusual</strong>: its molecular orbital structure leaves <strong>two unpaired electrons</strong>,
                making it strongly <strong>paramagnetic</strong> — attracted into a magnetic field. Among medical gases only O₂
                and nitric oxide (NO) show this property, so the measurement is essentially specific for O₂.
              </p>
              <p>
                The classic <strong>Pauling analyser</strong> suspends two nitrogen-filled glass spheres ("dumb-bell") in a
                non-uniform magnetic field. Sample gas containing O₂ enters the chamber; the O₂ is drawn into the strongest
                part of the field, displacing the spheres and rotating the dumb-bell. A mirror on the suspension reflects a
                light beam onto a photocell; a feedback current is applied to hold the dumb-bell stationary, and that current
                is proportional to the partial pressure of O₂.
              </p>
              <p>
                Modern monitors use a <strong>differential pressure (fast-response) paramagnetic cell</strong>: sample gas and
                a reference gas are alternately pulled into a chamber containing a switched electromagnet. The pressure
                difference oscillating across a sensitive transducer is proportional to the difference in O₂ concentration
                — giving a <strong>response time fast enough for breath-by-breath inspired/expired O₂ measurement</strong>
                (used to track oxygen uptake and during low-flow anaesthesia).
              </p>
              <p>
                Strengths: highly accurate, linear, no consumable element, fast. Weaknesses: sensitive to water vapour
                (sample line must be dried), affected by sample-gas pressure changes, and the static Pauling type is slow
                (only suitable for FiO₂ trending).
              </p>
            </div>
            <CrossReferenceCallout
              reason="The galvanic fuel cell and Clark electrode are the electrochemical alternatives for measuring O₂ partial pressure (in the breathing circuit and in arterial blood respectively)."
              links={[{ topicId: "abg-analyser" }]}
            />
          </ExamSection>

          <ExamSection id="infrared" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Infrared Absorption — CO₂, N₂O and Volatile Agents</h2>
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                Polyatomic molecules with a <strong>changing dipole moment</strong> during vibration absorb infrared radiation
                at characteristic wavelengths. A broad-spectrum IR source illuminates the sample chamber; the gas absorbs
                specific wavelengths and the residual transmitted intensity is measured by a detector. The fractional
                absorption follows the <strong>Beer-Lambert law</strong> (A = εcl), so the signal is proportional to the
                partial pressure of the target gas.
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
                  <strong> identify</strong> the agent and <strong>quantify</strong> its concentration.</li>
                <li><strong>O₂, N₂, Ar, He</strong> — homonuclear or monoatomic → no changing dipole → <strong>not detected</strong>
                  by IR. O₂ requires paramagnetic, electrochemical or Raman analysis.</li>
              </ul>
              <p>
                <strong>Pitfalls and corrections:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong>Collision (pressure) broadening:</strong> N₂O molecules collide with CO₂ and broaden its
                  4.26 µm absorption peak, causing the analyser to <em>overestimate</em> CO₂. Modern analysers measure N₂O
                  simultaneously and apply software correction.</li>
                <li><strong>Agent cross-sensitivity:</strong> volatile spectra overlap. A single-wavelength agent monitor
                  will give a wrong reading if the wrong agent is selected; modern multi-wavelength analysers identify the
                  agent automatically and warn if a mixture is present (e.g. residual desflurane during a sevoflurane case).</li>
                <li><strong>Water vapour and condensation</strong> in the sampling line shift readings — sample lines use
                  Nafion™ tubing that selectively allows water vapour to equilibrate with room air.</li>
                <li><strong>Sidestream sampling delay</strong> (≈2–3 s) and <strong>aspiration rate</strong> (typically
                  150–200 mL/min) must be matched to tidal volume in neonates to avoid dilution.</li>
              </ul>
              <p>
                <strong>Hardware variants:</strong> dispersive IR (rotating filter wheel selects wavelength), non-dispersive
                IR (NDIR — uses a dual-chamber detector, the original Luft cell), and photoacoustic spectroscopy (pulsed IR
                heats the gas → pressure pulse detected by a microphone — used in the Brüel & Kjær multi-gas analyser).
              </p>
            </div>
            <CrossReferenceCallout
              reason="The capnograph waveform and its mainstream vs sidestream sampling options are the bedside application of this 4.26 µm CO₂ absorption."
              links={[{ topicId: "pulse-oximetry" }]}
            />
          </ExamSection>

          <ExamSection id="sampling-site" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Mainstream (in-line) vs Sidestream Sampling</h2>
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                Once a gas analyser exists, the next engineering question is <strong>where to put the sensor relative to the
                breathing circuit</strong>. Two designs dominate clinical practice:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong>Mainstream (in-line)</strong> — the IR sensor sits in a cuvette inserted directly between the
                  catheter mount and the breathing circuit; expired gas flows <em>through</em> the measuring cell.</li>
                <li><strong>Sidestream (diverting)</strong> — a fine sampling line aspirates ≈ 50–250 mL/min of gas from a
                  T-piece at the airway and delivers it to a remote analyser inside the monitor.</li>
              </ul>

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
          </ExamSection>

          <ExamSection id="analyser-comparison" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Comparison of Gas-Concentration Analysers</h2>
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
          </ExamSection>
        </>
      }
    />
  );
};

export default HumidityGasSamplingTopic;

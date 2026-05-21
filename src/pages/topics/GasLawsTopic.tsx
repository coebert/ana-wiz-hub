import { TopicTemplate } from "@/components/TopicTemplate";
import { CollapsibleSubsection } from "@/components/CollapsibleSubsection";
import { ExamSection } from "@/components/ExamSection";
import { WorkedExample } from "@/components/WorkedExamples";
import { GasLawsDiagram } from "@/components/diagrams/GasLawsDiagram";
import { CriticalTemperatureDiagram } from "@/components/diagrams/CriticalTemperatureDiagram";
import { AndrewsIsothermsDiagram } from "@/components/diagrams/AndrewsIsothermsDiagram";
import { SynthesisBlock } from "@/components/SynthesisBlock";
import { gasLawsQuiz } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/ExamPitfallsCallout";

const objectives = [
  "State Boyle's, Charles', Gay-Lussac's, Avogadro's, Dalton's and Henry's laws and describe how they combine into the ideal gas equation PV = nRT (Avogadro's law contributing the n term).",
  "Define critical temperature, critical pressure and pseudo-critical temperature with values for O₂, N₂O and Entonox.",
  "Explain N₂O cylinder behaviour using saturated vapour pressure and the two-phase dome.",
  "Distinguish adiabatic expansion from the Joule–Thomson (isenthalpic) effect and apply each to clinical cooling phenomena.",
  "Use Dalton's and Henry's laws to derive the alveolar gas equation and predict gas uptake / nitrogen narcosis.",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Adiabatic emptying of an O₂ cylinder",
    scenario:
      "An E-size O₂ cylinder is opened from 137 bar (absolute ≈ 138 bar) to atmospheric pressure (1 bar) so quickly that no heat enters from the cylinder wall. With γ = 1.40 and T₁ = 293 K (20 °C), what is the predicted final temperature, and why doesn't the cylinder actually reach that?",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li><strong>Pick the right relationship.</strong> Reversible adiabatic process for an ideal gas: T₂ = T₁ × (P₂ / P₁)<sup>(γ−1)/γ</sup>.</li>
          <li><strong>Compute the exponent.</strong> (γ − 1) / γ = 0.4 / 1.4 ≈ 0.286.</li>
          <li><strong>Substitute.</strong> T₂ = 293 × (1 / 138)<sup>0.286</sup> ≈ 293 × 0.266 ≈ <strong>78 K (≈ −195 °C)</strong>.</li>
          <li><strong>Reality check.</strong> True adiabatic conditions never hold — heat conducts in from the cylinder wall and ambient air, so observed surface cooling is only ~30–50 °C. Frost on the cylinder body is the visual sign.</li>
        </ol>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>Using °C in T₁ — the relation is only valid in <strong>Kelvin</strong>.</li>
            <li>Confusing this with Joule–Thomson cooling — adiabatic expansion does external work; J–T throttling is isenthalpic with no external work.</li>
            <li>Forgetting that for a real cylinder the process is not reversible, so the prediction over-estimates cooling.</li>
          </ul>
        </div>
      </div>
    ),
    answer:
      "The reversible-adiabatic prediction is ~78 K (−195 °C). In practice heat conduction limits surface cooling to ~30–50 °C, but it explains the frost on a rapidly discharged O₂ cylinder.",
   cites: ["Peck & Hill Ch.1"],
  },
  {
    title: "Frost line on an N₂O cylinder during heavy use",
    scenario:
      "A continuous 6 L/min N₂O flow is run for a long case. Why does a ring of frost form at a particular height, and what does the height tell you?",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li><strong>Two-phase storage.</strong> N₂O at 20 °C is below its Tc (36.5 °C) — the cylinder contains liquid + vapour at the saturated vapour pressure (~52 bar).</li>
          <li><strong>Latent heat of vaporisation.</strong> ~376 kJ/kg is taken from the liquid and cylinder wall as withdrawn vapour is replaced by evaporation, cooling the cylinder.</li>
          <li><strong>Joule–Thomson cooling at the regulator.</strong> ΔT ≈ μ<sub>JT</sub> × ΔP ≈ 0.25 × (52 − 4) ≈ <strong>12 °C</strong> drop across the regulator.</li>
          <li><strong>Frost forms at the liquid–vapour interface.</strong> The wall there is coldest because that is where evaporation is occurring; ambient water vapour deposits as frost. <strong>The height of the frost line ≈ remaining liquid contents.</strong></li>
        </ol>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>Estimating N₂O contents from the pressure gauge — pressure stays at SVP until the very last liquid evaporates.</li>
            <li>Forgetting that delivered pressure <em>falls</em> during fast discharge (cylinder cools → SVP drops).</li>
            <li>Thinking the cylinder cools because of work done against the regulator — the dominant mechanism in heavy use is latent heat, with J–T cooling on top.</li>
          </ul>
        </div>
      </div>
    ),
    answer:
      "Latent heat of vaporisation cools the cylinder where evaporation occurs (the liquid–vapour interface), and J–T cooling at the regulator adds ~12 °C drop. The frost line marks the level of remaining liquid — the only reliable visual gauge of N₂O contents.",
   cites: ["Cross & Plunkett Ch.1"],
  },
  {
    title: "Alveolar oxygen tension at altitude",
    scenario:
      "A patient is ventilated with FiO₂ 0.21 at 4000 m (atmospheric pressure ≈ 460 mmHg). Assume PaCO₂ 40 mmHg and R = 0.8. What is the alveolar PO₂?",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li><strong>Apply Dalton's law to derive the alveolar gas equation.</strong> PAO₂ = FiO₂ × (Patm − PH₂O) − PaCO₂ / R.</li>
          <li><strong>Substitute.</strong> PAO₂ = 0.21 × (460 − 47) − 40 / 0.8 = 0.21 × 413 − 50.</li>
          <li><strong>Compute.</strong> = 86.7 − 50 = <strong>~37 mmHg</strong>. (Sea level for comparison: 0.21 × 713 − 50 ≈ 100 mmHg.)</li>
          <li><strong>Clinical implication.</strong> A PAO₂ of 37 mmHg sits on the steep part of the haemoglobin dissociation curve — significant desaturation. Supplemental O₂ is essential at altitude.</li>
        </ol>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>Forgetting to subtract <strong>PH₂O 47 mmHg</strong> — fully saturated alveolar gas is humidified at body temperature.</li>
            <li>Using barometric pressure in kPa with PaCO₂ in mmHg — keep units consistent.</li>
            <li>Assuming hyperventilation alone fully compensates — even with PaCO₂ down to 25, PAO₂ rises only to ~55 mmHg at 4000 m on FiO₂ 0.21.</li>
          </ul>
        </div>
      </div>
    ),
    answer:
      "PAO₂ ≈ 37 mmHg, well below the safe lower limit. Supplemental oxygen, hyperventilation, or descent are required.",
   cites: ["BJA Educ 2017"],
  },
];

const GasLawsTopic = () => {
  return (
    <TopicTemplate
      title="Gas Laws"
      subtitle="FRCA Primary — Physics"
      backPath="/physics"
      backLabel="Physics"
      accentColor="text-physics"
      topicId="gas-laws"
      quizQuestions={gasLawsQuiz}
      objectives={objectives}
      workedExamples={workedExamples}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY], curriculumCodes: ["PH_BK_01"] },
        workedExamples: { exams: [Exam.PRIMARY, Exam.FINAL], curriculumCodes: ["PH_BK_01"] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL], curriculumCodes: ["PH_BK_01"] },
      }}
      sectionSources={{
        objectives: ["Cross & Plunkett Ch.1", "Peck & Hill Ch.1"],
        workedExamples: ["Cross & Plunkett Ch.1", "Peck & Hill Ch.1", "BJA Educ 2017"],
        keyPoints: ["Cross & Plunkett Ch.1", "Peck & Hill Ch.1", "BJA Educ 2017"],
      }}
      coreConcepts={
        <>
          <ExamSection exams={[Exam.PRIMARY]} curriculumCodes={["PH_BK_01"]}>
            <CollapsibleSubsection title="Introduction" defaultOpen>
            <p className="text-foreground/90 leading-relaxed">
              Understanding gas behaviour is fundamental to anaesthetic practice. Gases are used for patient ventilation, as
              carrier gases for volatile agents, and in various monitoring systems. The gas laws describe the relationships
              between pressure, volume, temperature, and amount of gas under defined conditions.
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.PRIMARY]} curriculumCodes={["PH_BK_01"]}>
            <CollapsibleSubsection title="Boyle's Law">
            <p className="text-foreground/90 leading-relaxed">
              At constant temperature, the volume of a given mass of gas is inversely proportional to its pressure
              (<strong>P₁V₁ = P₂V₂</strong>). This is clinically relevant to the function of bellows ventilators,
              compression of gas in closed spaces (e.g., pneumothorax, air emboli), and the behaviour of gas cylinders.
            </p>
            <div className="bg-secondary/30 rounded-lg p-4 mt-3 border border-border">
              <p className="text-sm font-medium text-foreground">Clinical Application</p>
              <p className="text-sm text-muted-foreground mt-1">
                A pneumothorax at altitude: as atmospheric pressure decreases, Boyle's law predicts the trapped gas will
                expand, potentially converting a simple pneumothorax to a tension pneumothorax.
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.PRIMARY]} curriculumCodes={["PH_BK_01"]}>
            <CollapsibleSubsection title="Charles' Law">
            <p className="text-foreground/90 leading-relaxed">
              At constant pressure, the volume of a gas is directly proportional to its absolute temperature
              (<strong>V₁/T₁ = V₂/T₂</strong>). Temperature must be measured in Kelvin. This explains why gas volumes
              measured at room temperature differ from those at body temperature.
            </p>
            <div className="bg-secondary/30 rounded-lg p-4 mt-3 border border-border">
              <p className="text-sm font-medium text-foreground">Clinical Application</p>
              <p className="text-sm text-muted-foreground mt-1">
                Spirometry measurements taken at room temperature (ATPS) must be corrected to body conditions (BTPS) using
                Charles' law, as gas expands approximately 6% when warmed from 20°C to 37°C (310/293 = 1.058).
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.PRIMARY]} curriculumCodes={["PH_BK_01"]}>
            <CollapsibleSubsection title="Gay-Lussac's Law">
            <p className="text-foreground/90 leading-relaxed">
              At constant volume, the pressure of a fixed mass of gas is directly proportional to its absolute temperature
              (<strong>P₁/T₁ = P₂/T₂</strong>). As temperature rises, gas molecules move faster and strike the rigid
              container walls more frequently and forcefully, raising the measured pressure.
            </p>
            <div className="bg-secondary/30 rounded-lg p-4 mt-3 border border-border">
              <p className="text-sm font-medium text-foreground">Clinical Application</p>
              <p className="text-sm text-muted-foreground mt-1">
                The pressure inside a full oxygen cylinder rises if the cylinder is stored in a hot environment, and falls
                if it is cooled. This is why cylinder pressures should be interpreted in the context of ambient temperature,
                and why cylinders must be protected from fire — a heated cylinder can develop dangerously high internal
                pressures and rupture.
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.PRIMARY]} curriculumCodes={["PH_BK_01"]}>
            <CollapsibleSubsection title="The Combined Gas Law">
            <div className="mb-4 bg-card rounded-xl border border-border p-4 md:p-6">
              <GasLawsDiagram />
            </div>
            <p className="text-foreground/90 leading-relaxed">
              Boyle's, Charles' and Gay-Lussac's laws can be unified into a single expression that relates pressure,
              volume and absolute temperature for a fixed mass of gas:
            </p>
            <div className="bg-card border border-border rounded-lg p-4 mt-3 text-center">
              <p className="text-lg font-mono text-foreground">
                (P₁ × V₁) / T₁ = (P₂ × V₂) / T₂
              </p>
            </div>
            <p className="text-foreground/90 leading-relaxed mt-3">
              Each individual gas law is a special case in which one of the three variables is held constant:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-foreground/90">
              <li><strong>Constant T</strong> → P₁V₁ = P₂V₂ (Boyle's law)</li>
              <li><strong>Constant P</strong> → V₁/T₁ = V₂/T₂ (Charles' law)</li>
              <li><strong>Constant V</strong> → P₁/T₁ = P₂/T₂ (Gay-Lussac's law)</li>
            </ul>
            <p className="text-foreground/90 leading-relaxed mt-3">
              The combined gas law is the practical bridge to the ideal gas equation (PV = nRT): when the amount of gas
              (n) is also allowed to vary, the constant of proportionality becomes nR. Temperature must always be in
              Kelvin, and pressures must be absolute (not gauge) for the relationship to hold.
            </p>
            <div className="bg-secondary/30 rounded-lg p-4 mt-3 border border-border">
              <p className="text-sm font-medium text-foreground">Clinical Application</p>
              <p className="text-sm text-muted-foreground mt-1">
                Converting a measured gas volume between conditions — for example, expired gas volumes measured at ATPS
                being corrected to BTPS or STPD for metabolic calculations — relies directly on the combined gas law.
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["PH_BK_01"]}>
            <CollapsibleSubsection title="Dalton's Law of Partial Pressures">
            <p className="text-foreground/90 leading-relaxed">
              In a mixture of gases, the total pressure equals the sum of the partial pressures of each constituent gas
              (<strong>Pₜₒₜₐₗ = P₁ + P₂ + P₃ + ...</strong>). The partial pressure of each gas is proportional to its
              fractional concentration.
            </p>
            <div className="bg-secondary/30 rounded-lg p-4 mt-3 border border-border">
              <p className="text-sm font-medium text-foreground">Clinical Application</p>
              <p className="text-sm text-muted-foreground mt-1">
                Calculating alveolar oxygen tension using the alveolar gas equation depends on Dalton's law. At sea level,
                PAO₂ ≈ FiO₂ × (Patm − PH₂O) − PaCO₂/R, where PAO₂ is the <em>alveolar</em> oxygen partial pressure (not
                the arterial PaO₂). Understanding partial pressures is essential for calculating safe FiO₂ at altitude
                and during hyperbaric therapy.
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.PRIMARY]} curriculumCodes={["PH_BK_01"]}>
            <CollapsibleSubsection title="The Ideal Gas Law">
            <p className="text-foreground/90 leading-relaxed">
              The ideal gas equation <strong>PV = nRT</strong> unifies Boyle's, Charles', Gay-Lussac's <em>and</em>
              Avogadro's laws (V ∝ n at constant T and P, which supplies the molar term n) into a single expression, where
              P = pressure, V = volume, n = number of moles, R = universal gas constant (8.314 J·mol⁻¹·K⁻¹), and
              T = absolute temperature. Real gases deviate from ideal behaviour at high pressures and low temperatures,
              described by the van der Waals equation.
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["PH_BK_01"]}>
            <CollapsibleSubsection title="Critical Temperature & Critical Pressure">
            <div className="mb-4 bg-card rounded-xl border border-border p-4 md:p-6">
              <CriticalTemperatureDiagram />
            </div>
            <p className="text-foreground/90 leading-relaxed">
              The <strong>critical temperature</strong> of a substance is the temperature above which it cannot be
              liquefied by the application of pressure alone, no matter how great. The <strong>critical pressure</strong>
              is the pressure required to liquefy the gas at exactly its critical temperature. Above the critical
              temperature, the substance can only exist as a gas; below it, gas and liquid phases can coexist if the
              pressure is high enough.
            </p>
            <div className="bg-secondary/30 rounded-lg p-4 mt-3 border border-border">
              <p className="text-sm font-medium text-foreground">Key values for anaesthetic gases</p>
              <ul className="text-sm text-muted-foreground mt-2 space-y-1 list-disc pl-5">
                <li><strong>Oxygen:</strong> critical temperature −118 °C, critical pressure 50 bar</li>
                <li><strong>Nitrous oxide:</strong> critical temperature 36.5 °C, critical pressure 72 bar</li>
                <li><strong>Carbon dioxide:</strong> critical temperature 31 °C, critical pressure 74 bar</li>
                <li><strong>Air:</strong> critical temperature −141 °C (pseudo-critical, as it is a mixture)</li>
              </ul>
            </div>

            <h3 className="text-xl font-serif font-bold text-foreground mt-6">Why N₂O cylinder pressure is constant</h3>
            <p className="text-foreground/90 leading-relaxed mt-2">
              At a typical room temperature of 20 °C, N₂O is <em>below</em> its critical temperature of 36.5 °C. When
              it is compressed into a cylinder it partially liquefies, so the cylinder contains a two-phase system: a
              pool of liquid N₂O at the bottom in equilibrium with N₂O vapour above it. The pressure of the vapour
              phase is the <strong>saturated vapour pressure</strong> (SVP) of N₂O, which depends only on temperature —
              taken as <strong>~52 bar at 20 °C</strong> in UK anaesthetic teaching (equation-of-state models give
              52–53 bar, which is what the interactive isotherm below displays).
            </p>
            <p className="text-foreground/90 leading-relaxed mt-2">
              As gas is drawn off, more liquid evaporates to replace it and the vapour pressure stays constant. The
              gauge therefore continues to read ~52 bar throughout the working life of the cylinder, even as the
              contents progressively diminish. Only once the very last drop of liquid has evaporated does the cylinder
              behave as a simple gas reservoir — and at that point the pressure falls rapidly as the remaining vapour
              is consumed (typically when ~20% of the original mass remains).
            </p>
            <p className="text-foreground/90 leading-relaxed mt-2">
              By contrast, O₂ has a critical temperature of −118 °C, far below room temperature. It cannot be liquefied
              by pressure alone at 20 °C and is stored as a compressed gas only. The cylinder pressure therefore obeys
              Boyle's law and falls linearly as oxygen is used, making the gauge a reliable indicator of remaining
              contents.
            </p>

            <div className="bg-secondary/30 rounded-lg p-4 mt-3 border border-border">
              <p className="text-sm font-medium text-foreground">Clinical Application</p>
              <p className="text-sm text-muted-foreground mt-1">
                The contents of an N₂O cylinder are determined by <strong>weighing</strong> (full weight − tare weight),
                not by the pressure gauge. Cylinders are filled to a <strong>filling ratio</strong> (mass of N₂O / mass
                of water that would fill the cylinder) of 0.75 in temperate climates and 0.67 in the tropics, to leave
                vapour headspace and prevent dangerous pressure rises if the cylinder warms. As N₂O vaporises, latent
                heat of vaporisation cools the cylinder and the vapour pressure (and hence delivered pressure) actually
                <em> falls</em> during heavy use — frost may form on the outside of the cylinder.
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["PH_BK_01"]}>
            <CollapsibleSubsection title="Andrews' Isotherms — N₂O on a P–V Diagram">
            <div className="mb-4 bg-card rounded-xl border border-border p-4 md:p-6">
              <AndrewsIsothermsDiagram />
            </div>
            <p className="text-foreground/90 leading-relaxed">
              Thomas Andrews' classic 1869 experiments on CO₂ produced the first family of isotherms — curves of
              pressure against volume at constant temperature — that revealed the nature of the critical point. The same
              picture applies to N₂O, which is the anaesthetic gas most often discussed in these terms because its
              critical temperature (36.5 °C) sits within the clinical range.
            </p>

            <h3 className="text-xl font-serif font-bold text-foreground mt-6">How to read the diagram</h3>
            <ul className="text-foreground/90 leading-relaxed mt-2 list-disc pl-6 space-y-2">
              <li>
                <strong>Sub-critical isotherms (T &lt; Tc).</strong> Starting from large volume (right) and compressing
                the gas, pressure rises along the vapour branch until it meets the dashed dome at the saturated-vapour
                point. Further compression occurs at <em>constant pressure</em> (the horizontal tie-line) as vapour
                condenses to liquid — this is the two-phase region. Once all the vapour is liquid, pressure rises almost
                vertically because liquids are nearly incompressible.
              </li>
              <li>
                <strong>The critical isotherm (T = Tc, 36.5 °C for N₂O).</strong> The horizontal tie-line shrinks to a
                single point — the <strong>critical point</strong> — where the densities of liquid and vapour become
                equal and the meniscus disappears (critical opalescence). The isotherm has a point of inflection here
                with (∂P/∂V)<sub>T</sub> = 0 and (∂²P/∂V²)<sub>T</sub> = 0.
              </li>
              <li>
                <strong>Super-critical isotherms (T &gt; Tc).</strong> No phase change is possible at any pressure. The
                substance exists as a single fluid phase whose density rises smoothly with pressure. At high T the curve
                tends to PV = constant (Boyle's law).
              </li>
              <li>
                <strong>The dashed dome</strong> is the locus of all saturated-liquid and saturated-vapour points; its
                apex is the critical point. Inside the dome, liquid and vapour coexist; outside it, only one phase
                exists.
              </li>
            </ul>

            <h3 className="text-xl font-serif font-bold text-foreground mt-6">Pseudo-critical temperature</h3>
            <p className="text-foreground/90 leading-relaxed mt-2">
              For a <em>mixture</em> of gases there is no single critical temperature. Instead a{" "}
              <strong>pseudo-critical temperature</strong> is defined: the temperature below which the components of
              the mixture may separate into two phases. Two clinically important examples:
            </p>
            <ul className="text-foreground/90 leading-relaxed mt-2 list-disc pl-6 space-y-2">
              <li>
                <strong>Air (≈79 % N₂, 21 % O₂):</strong> pseudo-critical temperature −141 °C — the temperature below
                which air, if compressed, can be liquefied as a single mixed fluid. This is exploited industrially in
                the fractional distillation of liquid air to separate its components such as oxygen and nitrogen for
                medical use.
              </li>
              <li>
                <strong>Entonox (50 % N₂O / 50 % O₂):</strong> pseudo-critical temperature{" "}
                <strong>−5.5 °C at 137 bar</strong> (the cylinder pressure). Below this, the N₂O can liquefy out and
                pool at the bottom of the cylinder, leaving an O₂-rich gas to be delivered first and a hypoxic
                N₂O-rich mixture later — the so-called <em>Poynting effect failure</em>. Cylinders left in cold
                environments must be re-warmed (≥10 °C for at least 2 h, or 24 h with inversion) and inverted three
                times before clinical use.
              </li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["PH_BK_01"]}>
            <CollapsibleSubsection title="Joule–Thomson Effect & Adiabatic Expansion">
            <p className="text-foreground/90 leading-relaxed">
              When a real gas expands, its temperature changes. Two distinct mechanisms operate in clinical practice:
              <strong> adiabatic expansion</strong> (work done by the gas as it pushes back its surroundings, no heat
              exchange) and the <strong>Joule–Thomson effect</strong> (isenthalpic throttling through a restriction with
              no external work). Both produce cooling on cylinder discharge but for different physical reasons.
            </p>

            <h3 className="text-xl font-serif font-bold text-foreground mt-6">Adiabatic expansion</h3>
            <p className="text-foreground/90 leading-relaxed mt-2">
              An <em>adiabatic</em> process exchanges no heat with the surroundings (Q = 0). For an ideal gas the first
              law gives ΔU = −W; the gas does work at the expense of its own internal energy, so its temperature falls.
              For a reversible adiabatic process:
            </p>
            <div className="bg-muted/40 rounded-lg p-4 mt-2 border border-border">
              <p className="text-foreground font-mono text-center">
                PV<sup>γ</sup> = constant &nbsp;&nbsp; and &nbsp;&nbsp; T₁V₁<sup>γ−1</sup> = T₂V₂<sup>γ−1</sup>
              </p>
              <p className="text-sm text-muted-foreground text-center mt-2">
                where γ = Cp/Cv (1.40 for diatomic gases such as O₂ and N₂; 1.31 for N₂O; 1.67 for monatomic helium).
              </p>
            </div>
            <p className="text-foreground/90 leading-relaxed mt-3">
              Adiabatic expansion underlies <strong>cryotherapy probes</strong> (rapid expansion of high-pressure gas at
              the probe tip cools tissue to −70 °C or below for ablation of tumours, arrhythmic foci or skin lesions),
              and the <strong>cooling of an O₂ cylinder during fast discharge</strong>.
            </p>

            <h3 className="text-xl font-serif font-bold text-foreground mt-6">The Joule–Thomson (throttling) effect</h3>
            <p className="text-foreground/90 leading-relaxed mt-2">
              When a real gas is forced through a porous plug, narrow valve or other restriction without doing external
              work and without heat exchange, the process is <strong>isenthalpic</strong> (H = constant). For an ideal
              gas H depends only on T, so there is no temperature change. For a <em>real</em> gas there is, because of
              the work done against (or by) intermolecular forces:
            </p>
            <div className="bg-muted/40 rounded-lg p-4 mt-2 border border-border">
              <p className="text-foreground font-mono text-center">
                μ<sub>JT</sub> = (∂T/∂P)<sub>H</sub>
              </p>
              <p className="text-sm text-muted-foreground text-center mt-2">
                μ<sub>JT</sub> &gt; 0: gas <strong>cools</strong> on expansion. μ<sub>JT</sub> &lt; 0: gas <strong>warms</strong>.
              </p>
            </div>
            <p className="text-foreground/90 leading-relaxed mt-3">
              At low temperatures, attractive intermolecular forces dominate; the gas does work against them as it
              expands and so cools (μ<sub>JT</sub> &gt; 0). At very high temperatures, repulsive forces dominate; the
              gas warms on expansion (μ<sub>JT</sub> &lt; 0). The temperature at which μ<sub>JT</sub> = 0 — the dividing
              line between cooling and warming — is the <strong>inversion temperature</strong>.
            </p>

            <div className="overflow-x-auto rounded-xl border border-border bg-card mt-4">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr className="border-b border-border">
                    <th className="text-left p-3 font-semibold text-foreground">Gas</th>
                    <th className="text-left p-3 font-semibold text-foreground">Inversion T (max)</th>
                    <th className="text-left p-3 font-semibold text-foreground">Behaviour at room T (293 K) on throttling</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="p-3 font-medium text-foreground">N₂O</td><td className="p-3 text-foreground/80">~1500 K</td><td className="p-3 text-foreground/80">Cools strongly (~0.25 K per bar)</td></tr>
                  <tr><td className="p-3 font-medium text-foreground">CO₂</td><td className="p-3 text-foreground/80">~1500 K</td><td className="p-3 text-foreground/80">Cools strongly — used in cryotherapy</td></tr>
                  <tr><td className="p-3 font-medium text-foreground">N₂</td><td className="p-3 text-foreground/80">~620 K</td><td className="p-3 text-foreground/80">Cools modestly</td></tr>
                  <tr><td className="p-3 font-medium text-foreground">O₂</td><td className="p-3 text-foreground/80">~760 K</td><td className="p-3 text-foreground/80">Cools modestly (~0.31 K per bar)</td></tr>
                  <tr><td className="p-3 font-medium text-foreground">H₂</td><td className="p-3 text-foreground/80">~205 K</td><td className="p-3 text-foreground/80"><strong>Warms</strong> — must be pre-cooled below 205 K to liquefy</td></tr>
                  <tr><td className="p-3 font-medium text-foreground">He</td><td className="p-3 text-foreground/80">~45 K</td><td className="p-3 text-foreground/80"><strong>Warms</strong> — must be pre-cooled to liquefy (key to MRI cryostat design)</td></tr>
                </tbody>
              </table>
            </div>

            <div className="bg-secondary/30 rounded-lg p-4 mt-4 border border-border">
              <p className="text-sm font-medium text-foreground">Clinical Application — H₂ and He</p>
              <p className="text-sm text-muted-foreground mt-1">
                Hydrogen and helium have inversion temperatures below room temperature (205 K and 45 K respectively),
                so they <em>warm</em> on throttling at 20 °C. To liquefy them they must first be pre-cooled below the
                inversion temperature. This is why MRI cryostats use liquid helium pre-cooled through a multi-stage
                cascade — and why a sudden quench of an MRI magnet vents enormous volumes of warming He gas rather
                than a self-cooling jet.
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["PH_BK_01"]}>
            <CollapsibleSubsection title="Henry's Law">
            <p className="text-foreground/90 leading-relaxed">
              <strong>Henry's law</strong> states that, at constant temperature, the amount of a given gas that
              dissolves in a given type and volume of liquid is directly proportional to the partial pressure of that
              gas in equilibrium with the liquid (C = k·P, where k is the gas- and solvent-specific solubility
              coefficient). It underpins oxygen and carbon dioxide transport in blood, alveolar uptake of volatile
              anaesthetic agents, and the behaviour of dissolved gases under altered ambient pressure.
            </p>
            <div className="bg-secondary/30 rounded-lg p-4 mt-3 border border-border">
              <p className="text-sm font-medium text-foreground">Clinical Application</p>
              <p className="text-sm text-muted-foreground mt-1">
                Raising the partial pressure of an inhaled gas raises the amount dissolved in plasma and tissues.
                Examples: alveolar uptake of volatile agents is proportional to their alveolar partial pressure;
                <strong> nitrogen narcosis</strong> during deep diving reflects increased PN₂ driving more nitrogen
                into neural tissue; <strong>pulmonary oxygen toxicity</strong> at prolonged high FiO₂ or under
                hyperbaric conditions reflects the elevated dissolved O₂ load; and decompression illness occurs when
                dissolved N₂ comes out of solution as bubbles when ambient pressure falls too rapidly.
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["PH_BK_01"]}>
            <SynthesisBlock
              title="Gas Laws — Equation, Anaesthetic Application"
              subtitle="The headline equations and where each one bites in clinical practice."
              variant="table"
            >
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border bg-secondary/50">
                    <th className="text-left p-2 text-foreground font-semibold">Law</th>
                    <th className="text-left p-2 text-foreground font-semibold">Equation</th>
                    <th className="text-left p-2 text-foreground font-semibold">Anaesthetic Application</th>
                  </tr>
                </thead>
                <tbody className="text-foreground/90">
                  {[
                    ["Boyle", "P₁V₁ = P₂V₂ (constant T)", "Pneumothorax expansion at altitude; cylinder contents calculation"],
                    ["Charles", "V₁/T₁ = V₂/T₂ (constant P)", "Volume changes in heated humidifiers; pressure-volume loops"],
                    ["Gay-Lussac", "P₁/T₁ = P₂/T₂ (constant V)", "Cylinder pressure rises with ambient temperature"],
                    ["Avogadro", "Equal V at STP contain equal n", "1 mol gas = 22.4 L at STP — basis of vaporiser calibration"],
                    ["Ideal gas (combined)", "PV = nRT", "Predicts behaviour of medical gases over wide ranges"],
                    ["Dalton", "P_total = ΣP_partial", "Partial-pressure based gas analysis; alveolar gas equation"],
                    ["Henry", "C = k·P (constant T)", "O₂/CO₂ transport in blood; volatile uptake; nitrogen narcosis"],
                    ["Graham", "Rate ∝ 1/√MW", "Diffusion of gases across alveolar membrane"],
                    ["Fick (diffusion)", "J = −D·A·ΔC/d", "Pulmonary diffusion capacity (DLCO); placental gas transfer"],
                  ].map(([law, eqn, app]) => (
                    <tr key={law as string} className="border-b border-border/50">
                      <td className="p-2 font-medium">{law}</td>
                      <td className="p-2 text-muted-foreground font-mono text-xs">{eqn}</td>
                      <td className="p-2 text-muted-foreground">{app}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </SynthesisBlock>
          </ExamSection>
          <ExamPitfallsCallout
            accent="physics"
            pitfalls={[
              "Boyle's, Charles' and Gay-Lussac's laws combine into the ideal gas equation PV = nRT.",
              "Dalton's law underpins the alveolar gas equation and FiO₂ calculations at altitude.",
              "Henry's law explains gas solubility (blood–gas partition coefficient) and decompression sickness.",
              "Adiabatic compression heats a gas (cylinder filling); adiabatic expansion cools it (cryotherapy, cylinder cooling).",
              "N₂O cylinder gauge reflects vapour pressure of the liquid phase, not contents — only an empty cylinder reads zero accurately.",
            ]}
          />
        </>
      }
      keyPoints={[
        { text: "Boyle's law (P₁V₁ = P₂V₂): at constant temperature, pressure and volume are inversely proportional. Relevant to pneumothorax expansion and gas cylinder contents.", cites: ["Cross & Plunkett Ch.1"] },
        { text: "Charles' law (V₁/T₁ = V₂/T₂): at constant pressure, volume is proportional to absolute temperature. Explains ATPS to BTPS correction.", cites: ["Peck & Hill Ch.1"] },
        { text: "Dalton's law: total pressure equals the sum of partial pressures. Fundamental to the alveolar gas equation and FiO₂ calculations.", cites: ["BJA Educ 2017"] },
        { text: "The ideal gas equation (PV = nRT) combines Boyle's, Charles', Gay-Lussac's and Avogadro's laws (Avogadro's contributing the n term). Real gases deviate at high pressure and low temperature.", cites: ["Cross & Plunkett Ch.1", "BJA Educ 2007 (Gas laws)"] },
        { text: "Henry's law: gas dissolved in liquid is proportional to its partial pressure. Governs O₂/CO₂ transport and volatile agent uptake.", cites: ["Peck & Hill Ch.1"] },
        { text: "Adiabatic expansion (PVγ = constant) cools a gas as it does work — explains rapid O₂ cylinder cooling and reversible adiabatic processes.", cites: ["BJA Educ 2017"] },
        { text: "Joule–Thomson effect: isenthalpic throttling cools real gases below their inversion temperature (N₂O, CO₂, O₂, N₂ at room T) and warms H₂ and He.", cites: ["Cross & Plunkett Ch.1"] },
        { text: "Key critical constants: O₂ Tc −118 °C / Pc 50 bar; N₂O Tc 36.5 °C / Pc 72 bar; CO₂ Tc 31 °C / Pc 74 bar; N₂O SVP ≈ 52 bar at 20 °C; Entonox pseudo-critical T −5.5 °C at 137 bar; UK temperate filling ratio 0.75.", cites: ["BJA Educ 2017 (Medical gases)"] },
        { text: "N₂O cylinder pressure stays constant at the saturated vapour pressure until the last liquid evaporates — gauge cannot estimate contents; weigh instead.", cites: ["Peck & Hill Ch.1", "BJA Educ 2017 (Medical gases)"] },
      ]}
    />
  );
};

export default GasLawsTopic;

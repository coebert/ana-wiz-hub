import { SectionLayout } from "@/components/SectionLayout";
import { GasLawsDiagram } from "@/components/diagrams/GasLawsDiagram";
import { CriticalTemperatureDiagram } from "@/components/diagrams/CriticalTemperatureDiagram";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { QuizSection } from "@/components/QuizSection";
import { gasLawsQuiz } from "@/data/quizzes";
import { ReferencesList } from "@/components/ReferencesList";
import { SeeAlso } from "@/components/SeeAlso";

const GasLawsTopic = () => {
  return (
    <SectionLayout
      title="Gas Laws"
      subtitle="FRCA Primary — Physics"
      backPath="/physics"
      backLabel="Physics"
      accentColor="text-physics"
    >
      <div className="prose prose-slate max-w-none">
        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Introduction</h2>
          <p className="text-foreground/90 leading-relaxed">
            Understanding gas behaviour is fundamental to anaesthetic practice. Gases are used for patient ventilation, as
            carrier gases for volatile agents, and in various monitoring systems. The gas laws describe the relationships
            between pressure, volume, temperature, and amount of gas under defined conditions.
          </p>
          <p className="text-sm text-muted-foreground italic mt-2">
            Reference: Magee P, Tooley M. The physics, clinical measurement and equipment of anaesthetic practice. Oxford University Press, 2011.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Interactive Gas Laws</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Use the buttons below to explore each gas law with animated visualisation. Observe how changes in one variable
            affect others when remaining variables are held constant.
          </p>
          <div className="bg-card rounded-xl border border-border p-6">
            <GasLawsDiagram />
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Boyle's Law</h2>
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
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Charles' Law</h2>
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
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Gay-Lussac's Law</h2>
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
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">The Combined Gas Law</h2>
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
              (ambient temperature and pressure, saturated) being corrected to BTPS (body temperature and pressure,
              saturated) or STPD (standard temperature and pressure, dry) for metabolic calculations — relies directly
              on the combined gas law.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Dalton's Law of Partial Pressures</h2>
          <p className="text-foreground/90 leading-relaxed">
            In a mixture of gases, the total pressure equals the sum of the partial pressures of each constituent gas
            (<strong>Pₜₒₜₐₗ = P₁ + P₂ + P₃ + ...</strong>). The partial pressure of each gas is proportional to its
            fractional concentration.
          </p>
          <div className="bg-secondary/30 rounded-lg p-4 mt-3 border border-border">
            <p className="text-sm font-medium text-foreground">Clinical Application</p>
            <p className="text-sm text-muted-foreground mt-1">
              Calculating alveolar oxygen tension using the alveolar gas equation depends on Dalton's law. At sea level,
              PaO₂ ≈ FiO₂ × (Patm − PH₂O) − PaCO₂/R. Understanding partial pressures is essential for calculating safe
              FiO₂ at altitude and during hyperbaric therapy.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">The Ideal Gas Law</h2>
          <p className="text-foreground/90 leading-relaxed">
            The ideal gas equation <strong>PV = nRT</strong> combines all three laws into a single expression, where
            P = pressure, V = volume, n = number of moles, R = universal gas constant (8.314 J·mol⁻¹·K⁻¹), and
            T = absolute temperature. Real gases deviate from ideal behaviour at high pressures and low temperatures,
            described by the van der Waals equation.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Critical Temperature & Critical Pressure</h2>
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

          <h3 className="text-xl font-serif font-bold text-foreground mt-6">Cylinder Behaviour: N₂O vs O₂</h3>
          <p className="text-foreground/90 leading-relaxed mt-2 mb-4">
            Use the slider below to empty each cylinder and observe how the pressure gauge behaves. The contrast
            between N₂O and O₂ is a direct consequence of where room temperature sits relative to each gas's critical
            temperature.
          </p>
          <div className="bg-card rounded-xl border border-border p-6">
            <CriticalTemperatureDiagram />
          </div>

          <h3 className="text-xl font-serif font-bold text-foreground mt-6">Why N₂O cylinder pressure is constant</h3>
          <p className="text-foreground/90 leading-relaxed mt-2">
            At a typical room temperature of 20 °C, N₂O is <em>below</em> its critical temperature of 36.5 °C. When
            it is compressed into a cylinder it partially liquefies, so the cylinder contains a two-phase system: a
            pool of liquid N₂O at the bottom in equilibrium with N₂O vapour above it. The pressure of the vapour
            phase is the <strong>saturated vapour pressure</strong> (SVP) of N₂O, which depends only on temperature —
            approximately 52 bar at 20 °C.
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
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Henry's Law</h2>
          <p className="text-foreground/90 leading-relaxed">
            At constant temperature, the amount of gas dissolved in a liquid is directly proportional to the partial
            pressure of that gas above the liquid. This is fundamental to understanding oxygen and carbon dioxide transport
            in blood, and the uptake of volatile anaesthetic agents.
          </p>
          <div className="bg-secondary/30 rounded-lg p-4 mt-3 border border-border">
            <p className="text-sm font-medium text-foreground">Clinical Application</p>
            <p className="text-sm text-muted-foreground mt-1">
              Nitrogen narcosis during deep diving occurs because increased PN₂ at depth drives more nitrogen into solution
              in neural tissue. Similarly, the solubility coefficient determines how much volatile agent dissolves in blood
              at a given partial pressure.
            </p>
          </div>
        </section>
      </div>

      <KeyLearningPoints points={[
        "Boyle's law (P₁V₁ = P₂V₂): at constant temperature, pressure and volume are inversely proportional. Relevant to pneumothorax expansion and gas cylinder contents.",
        "Charles' law (V₁/T₁ = V₂/T₂): at constant pressure, volume is proportional to absolute temperature. Explains ATPS to BTPS correction.",
        "Dalton's law: total pressure equals the sum of partial pressures. Fundamental to the alveolar gas equation and FiO₂ calculations.",
        "The ideal gas equation (PV = nRT) combines all individual gas laws. Real gases deviate at high pressure and low temperature.",
        "Henry's law: gas dissolved in liquid is proportional to its partial pressure. Governs O₂/CO₂ transport and volatile agent uptake.",
        "Understanding gas behaviour is critical for safe use of medical gas systems, ventilation, and altitude/diving physiology."
      ]} />
      <QuizSection questions={gasLawsQuiz} />
      <ReferencesList topicId="gas-laws" />

      <SeeAlso topicId="gas-laws" />
        <TopicCompletionToggle topicId="gas-laws" topicTitle="Gas Laws" />
    </SectionLayout>
  );
};

export default GasLawsTopic;

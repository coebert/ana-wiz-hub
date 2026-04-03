import { SectionLayout } from "@/components/SectionLayout";
import { GasLawsDiagram } from "@/components/diagrams/GasLawsDiagram";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";

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
              Charles' law, as gas expands approximately 10% when warmed from 20°C to 37°C.
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
      <TopicCompletionToggle topicId="gas-laws" topicTitle="Gas Laws" />
    </SectionLayout>
  );
};

export default GasLawsTopic;

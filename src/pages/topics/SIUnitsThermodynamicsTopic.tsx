import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { QuizSection } from "@/components/QuizSection";
import { siUnitsThermodynamicsQuiz } from "@/data/quizzes";
import SIUnitsThermodynamicsDiagram from "@/components/diagrams/SIUnitsThermodynamicsDiagram";

const SIUnitsThermodynamicsTopic = () => {
  return (
    <SectionLayout
      title="SI Units & Thermodynamics"
      subtitle="SI base and derived units, gas law derivations, latent heat, specific heat capacity, and the laws of thermodynamics"
      backPath="/physics"
      backLabel="Physics"
      accentColor="text-physics"
    >
      <div className="space-y-8">
        <KeyLearningPoints
          points={[
            "There are 7 SI base units: metre (m), kilogram (kg), second (s), ampere (A), kelvin (K), mole (mol), candela (cd)",
            "Key derived units: Pascal (N/m²), Joule (N·m), Watt (J/s). Pressure conversions: 1 atm = 101.3 kPa = 760 mmHg",
            "All individual gas laws (Boyle's, Charles', Gay-Lussac's, Avogadro's) derive from the ideal gas equation PV = nRT",
            "Specific heat capacity (c): energy to raise 1 kg by 1 K; water's high c (4.18 kJ/kg/K) provides thermal stability",
            "Latent heat of vaporisation (2260 kJ/kg for water): energy for phase change without temperature change — drives evaporative heat loss",
            "First law: energy conservation (ΔU = Q − W); adiabatic gas expansion causes cooling (pressure regulators, cryotherapy)",
            "Second law: heat flows hot → cold spontaneously; entropy always increases — explains perioperative hypothermia mechanisms",
          ]}
        />

        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Introduction</h2>
          <p className="text-muted-foreground leading-relaxed">
            A solid understanding of SI units, gas laws, and thermodynamic principles underpins much of the physics examined
            in the Primary FRCA. The SI system provides a coherent framework for all physical measurements in medicine. The
            gas laws — all derivable from the ideal gas equation PV = nRT — have direct clinical applications from altitude
            physiology to anaesthetic vaporizer function. Thermodynamics governs heat transfer, phase changes, and energy
            conservation, with immediate relevance to perioperative temperature management, vaporizer physics, and cryotherapy.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Interactive Diagrams</h2>
          <SIUnitsThermodynamicsDiagram />
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">SI Units</h2>
          <div className="text-muted-foreground leading-relaxed space-y-3">
            <p>
              The <strong>Système International (SI)</strong> defines seven base units from which all other units are derived.
              In anaesthesia, the most commonly encountered derived units are the <strong>Pascal</strong> (pressure = N/m²),
              <strong>Joule</strong> (energy = N·m), and <strong>Watt</strong> (power = J/s). Temperature in gas calculations must
              always be in <strong>Kelvin</strong> (K = °C + 273.15).
            </p>
            <p>
              Pressure unit conversions are frequently tested: <strong>1 atmosphere = 101.3 kPa = 760 mmHg = 1013 cmH₂O =
              14.7 psi = 1.013 bar</strong>. Understanding these conversions is essential for interpreting arterial blood gases,
              ventilator settings, and gas cylinder pressures. The SI unit of pressure is the Pascal, though mmHg and cmH₂O
              remain in widespread clinical use.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Gas Law Derivations</h2>
          <div className="text-muted-foreground leading-relaxed space-y-3">
            <p>
              The <strong>ideal gas equation PV = nRT</strong> (where R = 8.314 J/mol/K) describes the behaviour of a hypothetical
              gas with no intermolecular forces and negligible molecular volume. All individual gas laws are special cases of this
              equation when certain variables are held constant: <strong>Boyle's law</strong> (constant T, n → P₁V₁ = P₂V₂),
              <strong>Charles' law</strong> (constant P, n → V₁/T₁ = V₂/T₂), and <strong>Gay-Lussac's law</strong> (constant V, n → P₁/T₁ = P₂/T₂).
            </p>
            <p>
              <strong>Dalton's law</strong> (total pressure = sum of partial pressures) is essential for the alveolar gas equation:
              PAO₂ = FiO₂(P<sub>atm</sub> − PH₂O) − PaCO₂/RQ. <strong>Henry's law</strong> (amount dissolved ∝ partial pressure ×
              solubility) explains nitrogen narcosis, decompression sickness, and the principles of blood gas analysis.
            </p>
            <p>
              Real gases deviate from ideal behaviour at <strong>high pressures</strong> and <strong>low temperatures</strong> (near
              their critical point). N₂O in cylinders is a real gas (stored as liquid), while O₂ behaves close to an ideal gas at
              clinical temperatures. The <strong>van der Waals equation</strong> accounts for intermolecular forces and molecular
              volume in real gases.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Heat & Specific Heat Capacity</h2>
          <div className="text-muted-foreground leading-relaxed space-y-3">
            <p>
              <strong>Specific heat capacity (c)</strong> is the energy required to raise the temperature of 1 kg of a substance
              by 1 K. Water has an exceptionally high specific heat capacity (<strong>4.18 kJ/kg/K</strong>), which provides
              thermal stability to the body (60% water) and makes water an effective warming/cooling medium. The equation
              <strong>Q = m × c × ΔT</strong> calculates the heat energy transferred.
            </p>
            <p>
              <strong>Latent heat</strong> is the energy required for a phase change at constant temperature. The latent heat
              of vaporisation of water (<strong>2260 kJ/kg</strong>) is very large, meaning evaporation is an extremely effective
              cooling mechanism — this explains why evaporative heat loss is the dominant mechanism of intraoperative heat loss
              from exposed surgical surfaces, and why sweating is so effective for thermoregulation.
            </p>
            <p>
              In vaporizers, the latent heat of vaporisation of volatile agents cools the liquid, reducing its saturated vapour
              pressure and output concentration. Temperature-compensating mechanisms (bimetallic strip, wick, copper heat sink)
              counteract this cooling effect to maintain stable output.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Laws of Thermodynamics</h2>
          <div className="text-muted-foreground leading-relaxed space-y-3">
            <p>
              The <strong>zeroth law</strong> establishes thermal equilibrium as transitive — if two systems are each in equilibrium
              with a third, they are in equilibrium with each other. This is the fundamental basis of temperature measurement:
              a thermometer reaches equilibrium with the patient, and we read the thermometer.
            </p>
            <p>
              The <strong>first law</strong> (conservation of energy: ΔU = Q − W) states that energy cannot be created or destroyed.
              In an <strong>adiabatic process</strong> (Q = 0), work done by expanding gas comes at the expense of internal energy,
              causing cooling. This explains the cooling that occurs in pressure regulators (Joule-Thomson effect) and the principle
              behind cryotherapy. The <strong>Joule-Thomson coefficient</strong> is positive for most gases at room temperature
              (cooling on expansion) but negative for hydrogen and helium.
            </p>
            <p>
              The <strong>second law</strong> states that heat flows spontaneously from hot to cold bodies, and the entropy
              (disorder) of an isolated system always increases. This explains why patients lose heat to the cold theatre
              environment via radiation (40%), convection (30%), evaporation (25%), and conduction (5%). The
              <strong>third law</strong> establishes absolute zero (0 K = −273.15°C) as the point where entropy approaches
              zero — it defines the Kelvin scale essential for gas law calculations.
            </p>
          </div>
        </div>

        <QuizSection questions={siUnitsThermodynamicsQuiz} />

        <TopicCompletionToggle topicId="si-units-thermodynamics" topicTitle="SI Units & Thermodynamics" />
      </div>
    </SectionLayout>
  );
};

export default SIUnitsThermodynamicsTopic;

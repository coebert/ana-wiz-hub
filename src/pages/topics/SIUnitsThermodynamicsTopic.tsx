import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { QuizSection } from "@/components/QuizSection";
import { siUnitsThermodynamicsQuiz } from "@/data/quizzes";
import SIUnitsThermodynamicsDiagram from "@/components/diagrams/SIUnitsThermodynamicsDiagram";
import { ReferencesList } from "@/components/ReferencesList";

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
          <h2 className="text-xl font-bold text-foreground mb-2">Temperature Scales</h2>
          <div className="text-muted-foreground leading-relaxed space-y-3">
            <p>
              Three temperature scales are encountered in medicine and physics. The <strong>Celsius scale</strong> defines
              0°C as the freezing point and 100°C as the boiling point of water at 1 atmosphere.
              The <strong>Fahrenheit scale</strong> sets water's freezing point at 32°F and boiling at 212°F — still used
              in some clinical settings internationally. Conversions: <strong>°F = (°C × 9/5) + 32</strong> and
              <strong> °C = (°F − 32) × 5/9</strong>. Normal body temperature (37°C = 98.6°F).
            </p>
            <p>
              The <strong>Kelvin scale</strong> is the SI unit of temperature and is an <strong>absolute scale</strong> — its
              zero point (0 K = −273.15°C) represents the theoretical minimum where molecular motion ceases, defined by the
              third law of thermodynamics. Crucially, the Kelvin scale has <strong>no negative values</strong>, which is why
              it must be used in all gas law calculations. Using Celsius in PV = nRT would give nonsensical results because
              a "doubling" of temperature from 10°C to 20°C is not a doubling of absolute temperature (283 K to 293 K is only
              a 3.5% increase).
            </p>
            <p>
              <strong>Why Kelvin matters for gas laws:</strong> Charles' law states V ∝ T (at constant P). If you plot volume
              against temperature in °C and extrapolate to zero volume, the line crosses the x-axis at −273.15°C — this is
              absolute zero. All gas law relationships (Boyle's, Charles', Gay-Lussac's, combined) require temperature in
              Kelvin because they describe proportional relationships that only hold on an absolute scale. For example,
              spirometry readings taken at room temperature (20°C = 293 K) corrected to body temperature (37°C = 310 K)
              increase by 310/293 = 5.8%.
            </p>
            <div className="bg-muted/30 rounded-lg p-4 mt-2">
              <h3 className="text-sm font-semibold text-foreground mb-2">Quick Conversion Reference</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong>Celsius → Kelvin:</strong> K = °C + 273.15 (e.g., 37°C = 310.15 K)</li>
                <li><strong>Celsius → Fahrenheit:</strong> °F = (°C × 1.8) + 32 (e.g., 37°C = 98.6°F)</li>
                <li><strong>Fahrenheit → Celsius:</strong> °C = (°F − 32) / 1.8 (e.g., 104°F = 40°C)</li>
                <li><strong>Key landmarks:</strong> 0°C = 273 K = 32°F | 37°C = 310 K = 98.6°F | 100°C = 373 K = 212°F</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Clinical Thermometry Principles</h2>
          <div className="text-muted-foreground leading-relaxed space-y-3">
            <p>
              Accurate temperature measurement relies on the <strong>zeroth law of thermodynamics</strong>: the measuring
              device must reach thermal equilibrium with the tissue being measured. Different sites reflect different
              aspects of body temperature, and the choice of site and device affects accuracy and response time.
            </p>
            <p>
              <strong>Core temperature</strong> is best reflected by the <strong>pulmonary artery catheter</strong> (gold
              standard), <strong>distal oesophageal probe</strong> (lower third, near the heart — not upper oesophagus which
              is cooled by tracheal gases), and <strong>nasopharyngeal probe</strong> (reflects brain temperature, placed along
              the floor of the nose to the posterior pharynx). <strong>Tympanic membrane</strong> thermometry uses infrared
              detection of the tympanic membrane (shared blood supply with hypothalamus via the internal carotid artery) and
              provides a rapid, non-invasive estimate of core temperature.
            </p>
            <p>
              <strong>Peripheral sites</strong> (axillary, skin) are typically 0.5–1°C lower than core and are influenced by
              ambient conditions and peripheral perfusion. The <strong>core-peripheral temperature gradient</strong> (normally
              0–2°C) widens in shock and vasoconstriction and narrows with vasodilation — it can be used as a surrogate marker
              of perfusion. Rectal temperature lags behind rapid core changes and should not be used during malignant
              hyperthermia monitoring.
            </p>
            <div className="bg-muted/30 rounded-lg p-4 mt-2">
              <h3 className="text-sm font-semibold text-foreground mb-2">Thermometry Devices — Physical Principles</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong>Thermocouple:</strong> Seebeck effect — voltage generated at junction of two dissimilar metals (e.g., copper–constantan) proportional to temperature. Fast response, small gauge, used in PA catheters</li>
                <li><strong>Thermistor:</strong> Semiconductor whose resistance decreases exponentially with temperature (negative temperature coefficient). Highly sensitive, used in oesophageal/rectal probes</li>
                <li><strong>Resistance thermometer (RTD):</strong> Metal (platinum) whose resistance increases linearly with temperature. Very accurate, used as laboratory standard — slower response than thermistors</li>
                <li><strong>Infrared tympanic:</strong> Detects infrared radiation (Wien's displacement law — peak wavelength ∝ 1/T). Non-contact, fast (&lt;2 s), but accuracy affected by cerumen, otitis, and probe positioning</li>
                <li><strong>Liquid crystal:</strong> Cholesteric crystals change colour with temperature. Forehead strips — convenient but inaccurate (±1–2°C), suitable only for screening</li>
              </ul>
            </div>
            <p>
              <strong>Perioperative temperature management:</strong> Hypothermia (&lt;36°C) affects drug metabolism (prolonged
              neuromuscular blockade, reduced MAC), coagulation (impaired platelet function, reduced enzyme activity),
              increases wound infection rates, and triggers shivering (increasing O₂ consumption by 200–400%). NICE guidelines
              recommend active warming for all procedures &gt;30 minutes with a target core temperature ≥36°C.
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

      <ReferencesList topicId="si-units-thermodynamics" />

        <TopicCompletionToggle topicId="si-units-thermodynamics" topicTitle="SI Units & Thermodynamics" />
      </div>
    </SectionLayout>
  );
};

export default SIUnitsThermodynamicsTopic;

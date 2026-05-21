import { TopicTemplate } from "@/components/TopicTemplate";
import { CollapsibleSubsection } from "@/components/CollapsibleSubsection";
import { ExamSection } from "@/components/ExamSection";
import { WorkedExample } from "@/components/WorkedExamples";
import { siUnitsThermodynamicsQuiz } from "@/data/quizzes";
import SIUnitsThermodynamicsDiagram from "@/components/diagrams/SIUnitsThermodynamicsDiagram";
import LatentHeatDiagram from "@/components/diagrams/LatentHeatDiagram";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/ExamPitfallsCallout";

const objectives = [
  "List the 7 SI base units and the most relevant derived units (Pa, J, W)",
  "Convert between Celsius, Kelvin and Fahrenheit and justify use of Kelvin in gas law calculations",
  "Derive Boyle's, Charles' and Gay-Lussac's laws from the ideal gas equation PV = nRT",
  "Define specific heat capacity and latent heat and apply them to vaporiser physics and perioperative heat loss",
  "State the four laws of thermodynamics and apply the first/second laws to clinical scenarios",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Heat to warm 1 L of crystalloid from 20 °C to 37 °C",
    scenario:
      "How much energy (kJ) is required to warm 1 L of normal saline from room temperature (20 °C) to body temperature (37 °C)? (c ≈ 4.18 kJ/kg/K, density ≈ 1 kg/L)",
    working:
      "Q = m × c × ΔT\nm = 1 kg, c = 4.18 kJ/kg/K, ΔT = 17 K\nQ = 1 × 4.18 × 17 = 71.1 kJ\nThis is the basis for fluid warmers — significant energy is needed, hence the need for high-power countercurrent or dry-heat warming devices to keep up at infusion rates >500 ml/min.",
    answer:
      "Approximately 71 kJ. Each litre of 20 °C fluid effectively cools the patient by transferring this much heat away from them if not warmed.",
    cites: ["Middleton Ch.8"],
  },
  {
    title: "Spirometry temperature correction (BTPS)",
    scenario:
      "A patient exhales a measured volume of 4.00 L at room temperature 20 °C, ambient pressure. Using Charles' law (constant pressure), what is the equivalent volume at body temperature 37 °C?",
    working:
      "Charles' law: V₁/T₁ = V₂/T₂ (T in Kelvin)\nT₁ = 293 K, T₂ = 310 K\nV₂ = V₁ × (T₂/T₁) = 4.00 × (310/293) = 4.23 L\nThis ~5.8% expansion is why pulmonary function values must be reported BTPS (body temperature, ambient pressure, saturated).",
    answer:
      "≈4.23 L (an increase of ~5.8%), illustrating why temperatures in gas law calculations must always be converted to Kelvin.",
    cites: ["Middleton Ch.1"],
  },
];

const SIUnitsThermodynamicsTopic = () => {
  return (
    <TopicTemplate
      title="SI Units & Thermodynamics"
      subtitle="SI base and derived units, gas law derivations, latent heat, specific heat capacity, and the laws of thermodynamics"
      backPath="/physics"
      backLabel="Physics"
      accentColor="text-physics"
      topicId="si-units-thermodynamics"
      topicTitle="SI Units & Thermodynamics"
      objectives={objectives}
      workedExamples={workedExamples}
      quizQuestions={siUnitsThermodynamicsQuiz}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY], curriculumCodes: ["RCoA Primary — Physics"] },
        workedExamples: { exams: [Exam.PRIMARY] },
        keyPoints: { exams: [Exam.PRIMARY] },
      }}
      sectionSources={{
        objectives: [
          "Cross & Plunkett Ch.1-2",
          "Middleton Ch.1",
          "Middleton Ch.8",
        ],
        keyPoints: [
          "Cross & Plunkett Ch.1-2",
          "Middleton Ch.1",
          "Middleton Ch.8",
          "NICE CG65",
        ],
        workedExamples: ["Middleton Ch.8", "Middleton Ch.1"],
      }}
      keyPoints={[
        { text: "There are 7 SI base units: metre (m), kilogram (kg), second (s), ampere (A), kelvin (K), mole (mol), candela (cd)", cites: ["Cross & Plunkett Ch.1-2"] },
        { text: "Key derived units: Pascal (N/m²), Joule (N·m), Watt (J/s). Pressure conversions: 1 atm = 101.3 kPa = 760 mmHg", cites: ["Middleton Ch.8"] },
        { text: "All individual gas laws (Boyle's, Charles', Gay-Lussac's, Avogadro's) derive from the ideal gas equation PV = nRT", cites: ["Middleton Ch.1"] },
        { text: "Specific heat capacity (c): energy to raise 1 kg by 1 K; water's high c (4.18 kJ/kg/K) provides thermal stability", cites: ["Cross & Plunkett Ch.1-2"] },
        { text: "Latent heat of vaporisation (2260 kJ/kg for water): energy for phase change without temperature change — drives evaporative heat loss", cites: ["Middleton Ch.8"] },
        { text: "First law: energy conservation (ΔU = Q − W); adiabatic gas expansion causes cooling (pressure regulators, cryotherapy)", cites: ["Middleton Ch.1"] },
        { text: "Second law: heat flows hot → cold spontaneously; entropy always increases — explains perioperative hypothermia mechanisms", cites: ["Cross & Plunkett Ch.1-2"] },
      ]}
      coreConcepts={
        <>
          <ExamSection id="introduction" exams={[Exam.PRIMARY]}>
            <CollapsibleSubsection title="Introduction" defaultOpen>
            <p className="text-muted-foreground leading-relaxed">
              A solid understanding of SI units, gas laws, and thermodynamic principles underpins much of the physics examined
              in the Primary FRCA. The SI system provides a coherent framework for all physical measurements in medicine. The
              gas laws — all derivable from the ideal gas equation PV = nRT — have direct clinical applications from altitude
              physiology to anaesthetic vaporiser function. Thermodynamics governs heat transfer, phase changes, and energy
              conservation, with immediate relevance to perioperative temperature management, vaporiser physics, and cryotherapy.
            </p>
            <div className="mt-4 bg-card rounded-xl border border-border p-4 md:p-6">
              <SIUnitsThermodynamicsDiagram />
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="si-units" exams={[Exam.PRIMARY]}>
            <CollapsibleSubsection title="SI Units">
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                The <strong>Système International (SI)</strong> defines seven base units from which all other units are derived.
                In anaesthesia, the most commonly encountered derived units are the <strong>Pascal</strong> (pressure = N/m²),
                <strong> Joule</strong> (energy = N·m), and <strong>Watt</strong> (power = J/s). Temperature in gas calculations must
                always be in <strong>Kelvin</strong> (K = °C + 273.15).
              </p>
              <p>
                Pressure unit conversions are frequently tested: <strong>1 atmosphere = 101.3 kPa = 760 mmHg = 1013 cmH₂O =
                14.7 psi = 1.013 bar</strong>. Understanding these conversions is essential for interpreting arterial blood gases,
                ventilator settings, and gas cylinder pressures. The SI unit of pressure is the Pascal, though mmHg and cmH₂O
                remain in widespread clinical use.
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="temperature-scales" exams={[Exam.PRIMARY]}>
            <CollapsibleSubsection title="Temperature Scales">
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                Three temperature scales are encountered in medicine and physics. The <strong>Celsius scale</strong> defines
                0 °C as the freezing point and 100 °C as the boiling point of water at 1 atmosphere.
                The <strong>Fahrenheit scale</strong> sets water's freezing point at 32 °F and boiling at 212 °F.
                Conversions: <strong>°F = (°C × 9/5) + 32</strong> and <strong>°C = (°F − 32) × 5/9</strong>. Normal body temperature (37 °C = 98.6 °F).
              </p>
              <p>
                The <strong>Kelvin scale</strong> is the SI unit of temperature and is an <strong>absolute scale</strong> — its
                zero point (0 K = −273.15 °C) represents the theoretical minimum where molecular motion ceases. The Kelvin scale has
                <strong> no negative values</strong>, which is why it must be used in all gas law calculations. Using Celsius in PV = nRT would
                give nonsensical results because a "doubling" of temperature from 10 °C to 20 °C is not a doubling of absolute temperature
                (283 K to 293 K is only a 3.5% increase).
              </p>
              <p>
                <strong>Why Kelvin matters for gas laws:</strong> Charles' law states V ∝ T (at constant P). If you plot volume
                against temperature in °C and extrapolate to zero volume, the line crosses the x-axis at −273.15 °C — this is
                absolute zero. Spirometry readings taken at room temperature (20 °C = 293 K) corrected to body temperature (37 °C = 310 K)
                increase by 310/293 = 5.8%.
              </p>
              <div className="bg-muted/30 rounded-lg p-4 mt-2">
                <h3 className="text-sm font-semibold text-foreground mb-2">Quick Conversion Reference</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li><strong>Celsius → Kelvin:</strong> K = °C + 273.15 (e.g., 37 °C = 310.15 K)</li>
                  <li><strong>Celsius → Fahrenheit:</strong> °F = (°C × 1.8) + 32 (e.g., 37 °C = 98.6 °F)</li>
                  <li><strong>Fahrenheit → Celsius:</strong> °C = (°F − 32) / 1.8 (e.g., 104 °F = 40 °C)</li>
                  <li><strong>Key landmarks:</strong> 0 °C = 273 K = 32 °F | 37 °C = 310 K = 98.6 °F | 100 °C = 373 K = 212 °F</li>
                </ul>
              </div>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="thermometry" exams={[Exam.PRIMARY]}>
            <CollapsibleSubsection title="Clinical Thermometry Principles">
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                Accurate temperature measurement relies on the <strong>zeroth law of thermodynamics</strong>: the measuring
                device must reach thermal equilibrium with the tissue being measured.
              </p>
              <p>
                <strong>Core temperature</strong> is best reflected by the <strong>pulmonary artery catheter</strong> (gold
                standard), <strong>distal oesophageal probe</strong> (lower third, near the heart), and <strong>nasopharyngeal probe</strong>
                (reflects brain temperature). <strong>Tympanic membrane</strong> thermometry uses infrared detection (shared blood supply
                with hypothalamus via the internal carotid artery) for a rapid, non-invasive estimate of core temperature.
              </p>
              <p>
                <strong>Peripheral sites</strong> (axillary, skin) are 0.5–1 °C lower than core. The <strong>core-peripheral gradient</strong>
                (normally 0–2 °C) widens in shock and vasoconstriction — useful as a perfusion surrogate. Rectal temperature lags rapid core changes
                and should not be used during malignant hyperthermia monitoring.
              </p>
              <div className="bg-muted/30 rounded-lg p-4 mt-2">
                <h3 className="text-sm font-semibold text-foreground mb-2">Thermometry Devices — Physical Principles</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li><strong>Thermocouple:</strong> Seebeck effect — voltage at junction of two dissimilar metals (copper–constantan). Fast, used in PA catheters</li>
                  <li><strong>Thermistor:</strong> Semiconductor whose resistance falls exponentially with temperature (NTC). Sensitive, used in oesophageal/rectal probes</li>
                  <li><strong>RTD (platinum):</strong> Resistance increases linearly with temperature. Very accurate laboratory standard — slower than thermistors</li>
                  <li><strong>Infrared tympanic:</strong> Detects IR radiation (Wien's law — peak λ ∝ 1/T). Non-contact, &lt;2 s, but accuracy affected by cerumen/positioning</li>
                  <li><strong>Liquid crystal:</strong> Cholesteric crystals change colour with T. Forehead strips — convenient but inaccurate (±1–2 °C)</li>
                </ul>
              </div>
              <p>
                <strong>Perioperative temperature management:</strong> Hypothermia (&lt;36 °C) prolongs neuromuscular blockade, reduces MAC, impairs platelet
                function, increases wound infection rates, and triggers shivering (↑VO₂ 200–400%). NICE recommends active warming for all procedures &gt;30 min
                with a target core temperature ≥36 °C.
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="gas-laws" exams={[Exam.PRIMARY]}>
            <CollapsibleSubsection title="Gas Law Derivations">
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                The <strong>ideal gas equation PV = nRT</strong> (R = 8.314 J/mol/K) describes a hypothetical gas with no intermolecular forces and
                negligible molecular volume. All individual gas laws are special cases when certain variables are held constant: <strong>Boyle's law</strong>
                (constant T, n → P₁V₁ = P₂V₂), <strong>Charles' law</strong> (constant P, n → V₁/T₁ = V₂/T₂), and <strong>Gay-Lussac's law</strong> (constant V, n → P₁/T₁ = P₂/T₂).
              </p>
              <p>
                <strong>Dalton's law</strong> (total pressure = sum of partial pressures) underpins the alveolar gas equation:
                PAO₂ = FiO₂(P<sub>atm</sub> − PH₂O) − PaCO₂/RQ. <strong>Henry's law</strong> (amount dissolved ∝ partial pressure × solubility) explains
                nitrogen narcosis, decompression sickness, and blood gas analysis.
              </p>
              <p>
                Real gases deviate from ideal behaviour at <strong>high pressures</strong> and <strong>low temperatures</strong> (near the critical point).
                N₂O in cylinders is a real gas (stored as liquid), while O₂ behaves close to an ideal gas at clinical temperatures. The <strong>van der Waals equation</strong>
                accounts for intermolecular forces and molecular volume in real gases.
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="heat-capacity" exams={[Exam.PRIMARY]}>
            <CollapsibleSubsection title="Heat & Specific Heat Capacity">
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                <strong>Specific heat capacity (c)</strong> is the energy required to raise the temperature of 1 kg of a substance by 1 K. Water has an
                exceptionally high c (<strong>4.18 kJ/kg/K</strong>), providing thermal stability to the body (60% water) and making water an effective warming/cooling
                medium. <strong>Q = m × c × ΔT</strong> calculates the heat energy transferred.
              </p>
              <p>
                <strong>Latent heat</strong> is the energy required for a phase change at constant temperature. The latent heat of vaporisation of water
                (<strong>2260 kJ/kg</strong>) is very large — evaporation is therefore extremely effective at cooling, explaining why evaporative loss is the dominant
                mechanism of intraoperative heat loss from exposed surgical surfaces, and why sweating is so effective.
              </p>
              <p>
                In vaporisers, the latent heat of vaporisation of volatile agents cools the liquid, reducing its saturated vapour pressure and output concentration.
                Temperature-compensating mechanisms (bimetallic strip, wick, copper heat sink) counteract this cooling effect to maintain stable output.
              </p>
              <LatentHeatDiagram />
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="thermodynamic-laws" exams={[Exam.PRIMARY]}>
            <CollapsibleSubsection title="Laws of Thermodynamics">
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                The <strong>zeroth law</strong> establishes thermal equilibrium as transitive — if two systems are each in equilibrium with a third, they are
                in equilibrium with each other. This is the fundamental basis of temperature measurement.
              </p>
              <p>
                The <strong>first law</strong> (conservation of energy: ΔU = Q − W) states energy cannot be created or destroyed. In an <strong>adiabatic process</strong>
                (Q = 0), work done by expanding gas comes at the expense of internal energy, causing cooling (Joule-Thomson effect in pressure regulators, cryotherapy).
                The <strong>Joule-Thomson coefficient</strong> is positive for most gases at room temperature but negative for hydrogen and helium.
              </p>
              <p>
                The <strong>second law</strong> states heat flows spontaneously hot → cold and entropy of an isolated system always increases. This explains
                perioperative heat loss to the cold theatre via radiation (40%), convection (30%), evaporation (25%), and conduction (5%). The <strong>third law</strong>
                establishes absolute zero (0 K = −273.15 °C) as the point where entropy approaches zero — defining the Kelvin scale used in gas law calculations.
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>
          <ExamPitfallsCallout
            accent="physics"
            pitfalls={[
              "Don't confuse the seven base SI units with derived units — pressure (Pa = N/m²), energy (J = N·m) and power (W = J/s) are all derived.",
              "Specific heat capacity (J/kg/K) is per mass; molar heat capacity is per mole — exam vivas often probe units.",
              "Latent heat of vaporisation is why ethyl chloride feels cold and why volatile vaporiser blocks need temperature compensation.",
              "Zeroth, first, second and third laws — know one-line statements and clinical examples (e.g. entropy and information loss in disorder).",
              "Absolute zero is 0 K = −273.15 °C; always use Kelvin in gas-law calculations.",
            ]}
          />
        </>
      }
    />
  );
};

export default SIUnitsThermodynamicsTopic;

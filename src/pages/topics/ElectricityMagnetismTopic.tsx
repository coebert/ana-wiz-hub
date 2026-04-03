import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { QuizSection } from "@/components/QuizSection";
import { electricityMagnetismQuiz } from "@/data/quizzes";
import ElectricityMagnetismDiagram from "@/components/diagrams/ElectricityMagnetismDiagram";

const ElectricityMagnetismTopic = () => {
  return (
    <SectionLayout
      title="Electricity & Magnetism"
      subtitle="Ohm's law, capacitance, inductance, transformers, and the Wheatstone bridge"
      backPath="/physics"
      backLabel="Physics"
      accentColor="text-physics"
    >
      <div className="space-y-8">
        <KeyLearningPoints
          points={[
            "Ohm's law: V = IR. Power: P = VI = I²R = V²/R. Series resistances add; parallel: 1/R = 1/R₁ + 1/R₂",
            "Impedance (Z) is the AC equivalent of resistance: Z = √(R² + (XL − XC)²) — includes capacitive and inductive reactance",
            "Capacitors store energy in electric fields (E = ½CV²); Xc = 1/(2πfC) — pass AC, block DC. Time constant τ = RC",
            "Inductors store energy in magnetic fields (E = ½LI²); XL = 2πfL — pass DC, block AC. Basis of transformers",
            "Transformer equation: V₁/V₂ = N₁/N₂ = I₂/I₁. Only works with AC. Isolation transformers eliminate earth reference",
            "Wheatstone bridge: balanced when R₁/R₃ = R₂/R₄. Used in arterial transducers (strain gauge) and thermistor circuits",
            "Defibrillators use capacitors: charge to high voltage → rapid discharge. E = ½CV² determines energy delivered",
          ]}
        />

        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Introduction</h2>
          <p className="text-muted-foreground leading-relaxed">
            Electrical principles are fundamental to understanding anaesthetic and monitoring equipment. From the simple
            application of Ohm's law in understanding electrical safety, to the Wheatstone bridge in arterial pressure
            transducers, and transformers in isolated power supplies — these concepts appear throughout the Primary FRCA
            physics curriculum. Capacitance and inductance govern the behaviour of AC circuits and are essential for
            understanding defibrillators, diathermy, and signal filtering in monitoring equipment.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Interactive Diagrams</h2>
          <ElectricityMagnetismDiagram />
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Ohm's Law & Circuit Fundamentals</h2>
          <div className="text-muted-foreground leading-relaxed space-y-3">
            <p>
              <strong>Ohm's law (V = IR)</strong> is the fundamental relationship between voltage (potential difference in volts),
              current (charge flow in amperes), and resistance (opposition to flow in ohms). Power dissipation is described by
              <strong>P = VI = I²R = V²/R</strong>, measured in watts. In <strong>series circuits</strong>, resistances add directly
              and the same current flows through all components. In <strong>parallel circuits</strong>, voltages are equal across each
              branch and currents divide — total resistance is found from 1/R = 1/R₁ + 1/R₂ + ...
            </p>
            <p>
              UK mains supply is <strong>230V AC at 50 Hz</strong>. The distinction between <strong>DC</strong> (constant direction,
              e.g., batteries) and <strong>AC</strong> (sinusoidal oscillation) is critical. <strong>Impedance (Z)</strong> is the AC
              equivalent of resistance, incorporating capacitive reactance (Xc) and inductive reactance (XL):
              Z = √(R² + (XL − XC)²). At high frequencies, tissue impedance decreases due to capacitive coupling, which is
              why diathermy (0.4–3 MHz) can pass through the body without stimulating nerves or muscles.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Capacitance</h2>
          <div className="text-muted-foreground leading-relaxed space-y-3">
            <p>
              A <strong>capacitor</strong> stores energy in an electric field between two conducting plates separated by an
              insulator (dielectric). Capacitance <strong>C = Q/V = εA/d</strong> (Farads), where ε is the permittivity of the
              dielectric, A is the plate area, and d is the separation. Energy stored: <strong>E = ½CV²</strong>.
            </p>
            <p>
              <strong>Capacitive reactance Xc = 1/(2πfC)</strong> decreases with increasing frequency — capacitors pass AC and
              block DC. The <strong>time constant τ = RC</strong> determines charging rate: after 1τ the capacitor reaches 63%
              charge, after 3τ ~95%, and after 5τ ~99%. Clinically, capacitors are used in <strong>defibrillators</strong>
              (energy storage and rapid discharge), ECG filters (RC circuits for high-pass and low-pass filtering), and
              safety circuits in diathermy equipment.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Inductance & Transformers</h2>
          <div className="text-muted-foreground leading-relaxed space-y-3">
            <p>
              An <strong>inductor</strong> stores energy in a magnetic field created by current flowing through a coil.
              The induced EMF opposes changes in current (<strong>Lenz's law</strong>): V = L × dI/dt. <strong>Inductive
              reactance XL = 2πfL</strong> increases with frequency — inductors pass DC and block AC, the opposite of capacitors.
            </p>
            <p>
              <strong>Transformers</strong> exploit mutual inductance between two coils sharing a magnetic core. The voltage
              ratio equals the turns ratio: <strong>V₁/V₂ = N₁/N₂</strong>, and since power is conserved (ideally),
              V₁I₁ = V₂I₂. Step-up transformers increase voltage (X-ray tubes, defibrillator charging). Step-down transformers
              decrease voltage (equipment power supplies). <strong>Isolation transformers (1:1)</strong> are used in operating
              theatres to eliminate the earth reference, preventing macroshock — a <strong>line isolation monitor</strong>
              continuously checks for earth faults.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Wheatstone Bridge</h2>
          <div className="text-muted-foreground leading-relaxed space-y-3">
            <p>
              The <strong>Wheatstone bridge</strong> is a circuit of four resistors arranged in a diamond configuration with a
              galvanometer across the midpoints. When the bridge is <strong>balanced</strong> (R₁/R₃ = R₂/R₄), no current flows
              through the galvanometer. Any imbalance produces a measurable voltage proportional to the resistance change,
              allowing extremely precise measurements.
            </p>
            <p>
              The <strong>arterial pressure transducer</strong> is the most important clinical application: four strain gauge
              elements (whose resistance changes with deformation) are arranged in a Wheatstone bridge on a silicon diaphragm.
              Pressure deflects the diaphragm, unbalancing the bridge and producing a voltage proportional to pressure. The
              bridge configuration provides <strong>temperature compensation</strong> (adjacent arms affected equally cancel out)
              and <strong>improved sensitivity</strong> (changes in opposing arms are additive).
            </p>
            <p>
              Other clinical applications include <strong>thermistor circuits</strong> (temperature measurement in PAC
              thermodilution — thermistor resistance decreases with temperature in NTC type) and <strong>strain gauge
              plethysmography</strong> for DVT diagnosis.
            </p>
          </div>
        </div>

        <QuizSection questions={electricityMagnetismQuiz} />

        <TopicCompletionToggle topicId="electricity-magnetism" topicTitle="Electricity & Magnetism" />
      </div>
    </SectionLayout>
  );
};

export default ElectricityMagnetismTopic;

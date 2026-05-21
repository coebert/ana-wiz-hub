import { TopicTemplate } from "@/components/TopicTemplate";
import { CollapsibleSubsection } from "@/components/CollapsibleSubsection";
import { ExamSection } from "@/components/ExamSection";
import { WorkedExample } from "@/components/WorkedExamples";
import ElectricityMagnetismDiagram from "@/components/diagrams/ElectricityMagnetismDiagram";
import { electricityMagnetismQuiz } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/ExamPitfallsCallout";

const objectives = [
  "Apply Ohm's law and the power equations (P = VI = I²R = V²/R) to clinical scenarios",
  "Define impedance, capacitive and inductive reactance, and explain their frequency dependence",
  "Describe how a transformer transfers energy and the role of isolation transformers in theatre safety",
  "Explain how a Wheatstone bridge enables precise resistance measurement in arterial transducers and thermistors",
  "Calculate energy storage in a capacitor (E = ½CV²) and apply it to defibrillator design",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Diathermy frequency and tissue effects",
    scenario:
      "Why does surgical diathermy use frequencies of 0.4–3 MHz when mains current at 50 Hz can be lethal at <100 mA?",
    working:
      "Tissue impedance falls with frequency due to capacitive coupling: Xc = 1/(2πfC).\nAt 50 Hz capacitive reactance is large → current is restricted to nerve/muscle pathways and stimulates depolarisation (microshock at >100 µA via intracardiac catheter; macroshock VF threshold ~100 mA).\nAt 1 MHz, Xc collapses → current passes through tissue without exciting nerves/muscle (above the critical frequency for membrane depolarisation, ~10 kHz).\nLocal heating at the active tip remains intense because of high current density (P = I²R) over a small area.",
    answer:
      "High-frequency current bypasses excitable tissue (no neuromuscular stimulation) yet still produces local Joule heating. This is why a 100 W diathermy at 1 MHz cuts tissue without triggering VF, whereas a few hundred mA at 50 Hz can be lethal.",
    cites: ["BJA Educ 2017"],
  },
  {
    title: "Defibrillator capacitor sizing",
    scenario:
      "Design choice: deliver 200 J using a capacitor charged to 2,500 V. What capacitance is needed?",
    working:
      "E = ½CV² → C = 2E/V² = 2 × 200 / (2500)² = 400 / 6.25 × 10⁶ = 64 µF.",
    answer:
      "A 64 µF capacitor is required. In practice biphasic devices use smaller capacitors (~30–50 µF) at higher voltages plus an inductor to shape the discharge waveform — improving efficacy at lower stored energy and reducing burns/myocardial injury.",
    cites: ["Middleton Ch.15"],
  },
];

const ElectricityMagnetismTopic = () => {
  return (
    <TopicTemplate
      title="Electricity & Magnetism"
      subtitle="Ohm's law, capacitance, inductance, transformers, and the Wheatstone bridge"
      backPath="/physics"
      backLabel="Physics"
      accentColor="text-physics"
      topicId="electricity-magnetism"
      topicTitle="Electricity & Magnetism"
      objectives={objectives}
      workedExamples={workedExamples}
      quizQuestions={electricityMagnetismQuiz}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY, Exam.FINAL], curriculumCodes: ["RCoA Primary — Physics", "RCoA Final — Physics"] },
        workedExamples: { exams: [Exam.PRIMARY, Exam.FINAL] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL] },
      }}
      sectionSources={{
        objectives: [
          "Cross & Plunkett Ch.12-13",
          "Middleton Ch.15",
          "BJA Educ 2017",
        ],
        keyPoints: [
          "Cross & Plunkett Ch.12-13",
          "Middleton Ch.15",
          "BJA Educ 2017",
        ],
        workedExamples: ["BJA Educ 2017", "Middleton Ch.15"],
      }}
      keyPoints={[
        { text: "Ohm's law: V = IR. Power: P = VI = I²R = V²/R. Series resistances add; parallel: 1/R = 1/R₁ + 1/R₂", cites: ["Cross & Plunkett Ch.12-13"] },
        { text: "Impedance (Z) is the AC equivalent of resistance: Z = √(R² + (XL − XC)²) — includes capacitive and inductive reactance", cites: ["BJA Educ 2017"] },
        { text: "Capacitors store energy in electric fields (E = ½CV²); Xc = 1/(2πfC) — pass AC, block DC. Time constant τ = RC", cites: ["Middleton Ch.15"] },
        { text: "Inductors store energy in magnetic fields (E = ½LI²); XL = 2πfL — pass DC, block AC. Basis of transformers", cites: ["Cross & Plunkett Ch.12-13"] },
        { text: "Transformer equation: V₁/V₂ = N₁/N₂ = I₂/I₁. Only works with AC. Isolation transformers eliminate earth reference", cites: ["BJA Educ 2017"] },
        { text: "Wheatstone bridge: balanced when R₁/R₃ = R₂/R₄. Used in arterial transducers (strain gauge) and thermistor circuits", cites: ["Middleton Ch.15"] },
        { text: "Defibrillators use capacitors: charge to high voltage → rapid discharge. E = ½CV² determines energy delivered", cites: ["Cross & Plunkett Ch.12-13"] },
      ]}
      coreConcepts={
        <>
          <ExamSection id="introduction" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Introduction" defaultOpen>
            <p className="text-muted-foreground leading-relaxed">
              Electrical principles are fundamental to understanding anaesthetic and monitoring equipment. From the simple
              application of Ohm's law in understanding electrical safety, to the Wheatstone bridge in arterial pressure
              transducers, and transformers in isolated power supplies — these concepts appear throughout the Primary FRCA
              physics curriculum. Capacitance and inductance govern the behaviour of AC circuits and are essential for
              understanding defibrillators, diathermy, and signal filtering in monitoring equipment.
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="diagram" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Interactive Diagrams">
            <ElectricityMagnetismDiagram />
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="ohms-law" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Ohm's Law & Circuit Fundamentals">
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
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="capacitance" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Capacitance">
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
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="inductance" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Inductance & Transformers">
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                An <strong>inductor</strong> stores energy in a magnetic field created by current flowing through a coil.
                The induced EMF opposes changes in current (<strong>Lenz's law</strong>): V = L × dI/dt. The energy stored
                in an inductor is <strong>E = ½LI²</strong> (joules, with L in henries and I in amperes), analogous to
                E = ½CV² for a capacitor. <strong>Inductive reactance XL = 2πfL</strong> increases with frequency —
                inductors pass DC and block AC, the opposite of capacitors.
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
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="wheatstone" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Wheatstone Bridge">
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
            </CollapsibleSubsection>
          </ExamSection>
          <ExamPitfallsCallout
            accent="physics"
            pitfalls={[
              "Ohm's law (V = IR) applies to DC and resistive AC circuits; for AC with reactive components use impedance Z.",
              "Capacitive reactance falls with rising frequency (Xc = 1/2πfC); inductive reactance rises (XL = 2πfL).",
              "Transformers only work with AC; turns ratio sets voltage ratio. Isolation transformers protect from earth-leakage shock.",
              "The Wheatstone bridge is a null-deflection circuit used by strain-gauge transducers and thermistors.",
              "Defibrillator capacitance ≈ 32 µF; stored energy E = ½CV². Know how to derive delivered energy.",
            ]}
          />
        </>
      }
    />
  );
};

export default ElectricityMagnetismTopic;

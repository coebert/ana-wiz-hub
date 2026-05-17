import { TopicTemplate } from "@/components/TopicTemplate";
import { WorkedExample } from "@/components/WorkedExamples";
import { ExamSection } from "@/components/ExamSection";
import { temperatureMeasurementQuiz } from "@/data/quizzes";
import TemperatureMeasurementDiagram from "@/components/diagrams/TemperatureMeasurementDiagram";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/ExamPitfallsCallout";

const objectives = [
  "Explain the Seebeck effect and the construction of thermocouples.",
  "Describe thermistors and resistance thermometers (RTDs) and contrast their accuracy/response.",
  "Apply the Stefan-Boltzmann law to infrared tympanic thermometry.",
  "Choose appropriate temperature monitoring sites (PA, nasopharyngeal, oesophageal, tympanic, skin).",
  "Recognise the three phases of perioperative core temperature drop.",
];

const keyPoints = [
  { text: "Thermocouples use the Seebeck effect — EMF generated at junction of two dissimilar metals proportional to temperature difference", cites: ["BJA Educ 2014"] },
  { text: "Thermistors are NTC semiconductors — resistance falls exponentially with rising temperature; very sensitive but non-linear", cites: ["Cross & Plunkett Ch.11"] },
  { text: "Platinum resistance thermometers (RTD/Pt100) have a linear PTC response — most accurate but slowest; laboratory standard", cites: ["NICE CG65"] },
  { text: "Infrared tympanic thermometry uses the Stefan-Boltzmann law (P ∝ T⁴) with a thermopile sensor to detect IR radiation from the tympanic membrane", cites: ["BJA Educ 2014"] },
  { text: "The tympanic membrane shares its blood supply (internal carotid) with the hypothalamus, reflecting core temperature", cites: ["Cross & Plunkett Ch.11"] },
  { text: "Thermocouples are self-generating (no battery needed); thermistors and RTDs require external power via a Wheatstone bridge", cites: ["NICE CG65"] },
  { text: "PA catheter thermistor is the gold standard for core temperature; nasopharyngeal thermocouple best reflects brain temperature", cites: ["BJA Educ 2014"] },
];

const TemperatureMeasurementTopicWorkedExamples: WorkedExample[] = [
  {
    title: "Choosing a core temperature site for major surgery",
    scenario: "A patient for 4-hour open hemicolectomy needs reliable core temperature monitoring per NICE CG65. Compare nasopharyngeal, oesophageal, tympanic and bladder probes.",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>NICE CG65 requires continuous core temperature monitoring for any procedure &gt;30 min under GA</li>
          <li>Distal oesophageal probe (lower third) tracks cardiac/aortic blood temperature accurately — first choice in intubated abdominal surgery</li>
          <li>Nasopharyngeal probe approximates brain temperature; risk of epistaxis with coagulopathy</li>
          <li>Tympanic infrared is intermittent and operator-dependent — unsuitable for continuous monitoring</li>
          <li>Bladder temperature lags during rapid changes (e.g., CPB rewarming) and is unreliable with low urine flow</li>
        </ol>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
          <li>Oesophageal probe in the upper third reads cooler due to airway gas — must be in the distal third</li>
          <li>Skin temperature is not core — useful only for gradient monitoring</li>
          <li>Forced-air warmer set to default 38 °C without monitoring risks hyperthermia</li>
          </ul>
        </div>
      </div>
    ),
    answer: "Use a distal oesophageal probe with continuous display, target core 36.5–37.5 °C, pre-warm and forced-air warm intra-operatively per NICE CG65.",
    cites: ["BJA Educ 2014", "NICE CG65", "Cross & Plunkett Ch.11"],
  },
];

const TemperatureMeasurementTopic = () => {
  return (
    <TopicTemplate
      title="Temperature Measurement"
      subtitle="Thermocouples, thermistors, resistance thermometers, and infrared tympanic thermometry"
      backPath="/physics"
      backLabel="Physics"
      accentColor="text-physics"
      topicId="temperature-measurement"
      topicTitle="Temperature Measurement"
      workedExamples={TemperatureMeasurementTopicWorkedExamples}
      objectives={objectives}
      keyPoints={keyPoints}
      quizQuestions={temperatureMeasurementQuiz}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY] },
        keyPoints: { exams: [Exam.PRIMARY] },
      }}
      sectionSources={{
        objectives: ["Cross & Plunkett Ch.11", "NICE CG65"],
        keyPoints: ["BJA Educ 2014", "NICE CG65", "Cross & Plunkett Ch.11"],
      }}
      coreConcepts={
        <ExamSection exams={[Exam.PRIMARY, Exam.FINAL]} className="scroll-mt-24">

        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Introduction</h2>
          <p className="text-muted-foreground leading-relaxed">
            Accurate temperature measurement is essential in anaesthesia and critical care. Hypothermia and hyperthermia profoundly
            affect pharmacokinetics, coagulation, and neurological outcome. Understanding the physics behind different thermometry
            devices is a core Primary FRCA topic and has direct clinical relevance for choosing the right monitoring site and device.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Interactive Diagrams</h2>
          <TemperatureMeasurementDiagram />
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Thermocouple — The Seebeck Effect</h2>
          <div className="text-muted-foreground leading-relaxed space-y-3">
            <p>
              When two dissimilar metals (e.g., copper and constantan) are joined at a junction, a small voltage (EMF) is generated
              proportional to the temperature difference between the measuring junction (patient end) and the reference junction.
              This is the <strong>Seebeck effect</strong>. Type T (copper-constantan) thermocouples produce approximately 40 μV per °C.
            </p>
            <p>
              <strong>Advantages:</strong> Fastest response time (milliseconds), very small probe size, self-generating (no battery),
              wide temperature range (−200 to +400°C). <strong>Disadvantages:</strong> Very small EMF requires amplification;
              needs reference junction compensation (cold junction compensation).
            </p>
            <p>
              <strong>Clinical use:</strong> Nasopharyngeal and oesophageal temperature probes. The nasopharyngeal probe reflects
              brain temperature as it sits near the internal carotid artery.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Thermistor — Semiconductor Resistance</h2>
          <div className="text-muted-foreground leading-relaxed space-y-3">
            <p>
              A thermistor is a semiconductor (metal oxide bead) with a <strong>negative temperature coefficient (NTC)</strong> —
              its resistance falls exponentially as temperature rises. This gives it very high sensitivity (thousands of Ω per °C)
              but a markedly <strong>non-linear</strong> response requiring calibration or linearisation circuitry.
            </p>
            <p>
              Resistance is measured using a <strong>Wheatstone bridge</strong> circuit. The thermistor is one arm of the bridge;
              when its resistance changes with temperature, the bridge becomes unbalanced and the resulting voltage is proportional
              to the temperature change.
            </p>
            <p>
              <strong>Clinical use:</strong> The thermistor at the tip of a <strong>pulmonary artery (PA) catheter</strong> measures
              blood temperature for thermodilution cardiac output. Also used in skin temperature probes and bladder temperature catheters.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Resistance Thermometer (RTD/Pt100)</h2>
          <div className="text-muted-foreground leading-relaxed space-y-3">
            <p>
              A resistance temperature detector uses a metallic conductor (usually platinum) whose resistance increases linearly
              with temperature — a <strong>positive temperature coefficient (PTC)</strong>. The standard Pt100 has a resistance of
              100Ω at 0°C, rising by 0.385Ω per °C.
            </p>
            <p>
              The relationship is described by: <strong>Rₜ = R₀(1 + αΔT)</strong> where α = 0.00385 Ω/Ω/°C.
              The <strong>linear response</strong> is its main advantage over the thermistor. However, it has lower sensitivity
              and the <strong>slowest response time</strong> of all electronic thermometers.
            </p>
            <p>
              <strong>Clinical use:</strong> Laboratory reference standard. Rarely used for bedside monitoring due to slow
              response and large probe size.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Infrared Tympanic Thermometry</h2>
          <div className="text-muted-foreground leading-relaxed space-y-3">
            <p>
              All objects at temperatures above absolute zero emit infrared radiation. The <strong>Stefan-Boltzmann law</strong>
              states that the power radiated is proportional to T⁴ (P = εσAT⁴). An IR tympanic thermometer uses a
              <strong> thermopile</strong> (multiple thermocouples in series) to detect the IR radiation emitted by the tympanic membrane.
            </p>
            <p>
              The tympanic membrane is an excellent site because it shares its blood supply with the <strong>hypothalamus</strong>
              via the internal carotid artery, making it a reliable surrogate for core temperature.
            </p>
            <p>
              <strong>Sources of error:</strong> Cerumen (ear wax) absorbs IR radiation → falsely low readings. Otitis media
              and poor probe positioning (not aimed at TM) also cause inaccuracy. The probe must be placed to form a
              seal with the ear canal.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Clinical Temperature Monitoring Sites</h2>
          <div className="text-muted-foreground leading-relaxed space-y-3">
            <p>
              <strong>Core sites:</strong> PA catheter (gold standard), distal oesophagus (lower third), nasopharynx,
              tympanic membrane, bladder. <strong>Peripheral sites:</strong> Axilla, skin (forehead), rectal (delayed response).
            </p>
            <p>
              The <strong>core-peripheral temperature gradient</strong> reflects peripheral vasoconstriction and is used clinically
              to assess perfusion in shock. A gradient &gt;2°C suggests significant vasoconstriction.
            </p>
            <p>
              During general anaesthesia, core temperature typically drops in three phases: (1) <strong>redistribution</strong>
              (rapid drop in first hour due to vasodilation), (2) <strong>linear decline</strong> (radiation &gt; metabolic heat
              production), (3) <strong>plateau</strong> (thermoregulatory vasoconstriction re-established at ~34.5°C).
            </p>
          </div>
        </div>
          <ExamPitfallsCallout
            accent="physics"
            pitfalls={[
              "Thermocouples: Seebeck effect, fastest response, no battery — best for nasopharyngeal/oesophageal probes.",
              "Thermistors: NTC semiconductor, very sensitive but non-linear — used in PA-catheter thermodilution.",
              "Platinum resistance (Pt100): linear, accurate, slow — laboratory standard, not bedside.",
              "Infrared tympanic uses Stefan–Boltzmann (P ∝ T⁴); cerumen and poor seal cause falsely low readings.",
              "Core-peripheral gradient >2 °C suggests significant vasoconstriction; redistribution dominates the first hour of GA.",
            ]}
          />
        </ExamSection>
      }
    />
  );
};

export default TemperatureMeasurementTopic;

import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { ExamSection } from "@/components/exam/ExamSection";
import { temperatureMeasurementQuiz } from "@/data/quizzes";
import TemperatureMeasurementDiagram from "@/components/diagrams/physics/TemperatureMeasurementDiagram";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { InlineRef } from "@/components/references/InlineRef";

const temperatureMeasurementFaqs: Array<[string, string]> = [
  [
    "Compare thermistors and thermocouples for clinical use.",
    "Thermistor — semiconductor whose resistance falls exponentially with temperature. Highly sensitive, small, used in PA catheters and oesophageal probes; non-linear so needs linearising circuit. Thermocouple — two dissimilar metals; voltage proportional to temperature difference (Seebeck effect). Linear, robust, requires a reference junction; used in some skin probes."
  ],
  [
    "Where are core temperature measurements taken and which is the gold standard?",
    "Pulmonary artery (gold standard — true core). Distal oesophagus (within 0.5 °C of PA; influenced by airway gas), nasopharynx (close to hypothalamus), tympanic membrane (good for brain temperature). Bladder and rectum lag behind. Skin and axilla underestimate core by 1–2 °C and are unreliable intra-operatively."
  ],
  [
    "What are the consequences of perioperative hypothermia (<36 °C)?",
    "Triples wound infection, increases blood loss and transfusion requirements (impaired coagulation and platelet function), prolongs drug action (especially NMBAs and volatiles), causes shivering with ↑VO₂ up to 400 %, prolongs recovery and ICU stay, and increases cardiac events. NICE CG65 mandates active warming for any operation >30 min."
  ]
];

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
  { text: "Platinum resistance thermometers (RTD/Pt100) have a linear PTC response — most accurate but slowest; laboratory standard", cites: ["Cross & Plunkett Ch.11"] },
  { text: "Infrared tympanic thermometry uses the Stefan-Boltzmann law (P ∝ T⁴) with a thermopile sensor to detect IR radiation from the tympanic membrane", cites: ["BJA Educ 2014"] },
  { text: "The tympanic membrane lies close to the internal carotid artery; its emitted IR radiation is therefore a surrogate for the temperature of blood supplying the hypothalamus, reflecting core temperature", cites: ["Cross & Plunkett Ch.11"] },
  { text: "Thermocouples are self-generating (no battery needed); thermistors and RTDs require external power via a Wheatstone bridge", cites: ["Cross & Plunkett Ch.11"] },
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
          <li>NICE CG65 (Hypothermia: prevention and management in adults having surgery, 2008, last updated December 2016) requires temperature measurement before induction and every 30 minutes intra-operatively, with forced-air warming set to maintain at least 36.5 °C. NG180 (Perioperative care in adults, 2020) cross-refers to CG65 rather than replacing it</li>
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
    answer: "Use a distal oesophageal probe with continuous display, target core ≥36.5 °C, pre-warm and forced-air warm intra-operatively per NICE CG65.",
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
        keyPoints: ["BJA Educ 2014", "NICE CG65", "Cross & Plunkett Ch.11", "NICE NG125", "BJA Educ Temperature 2020", "SCCM IDSA Fever 2023"],
      }}
      coreConcepts={
        <>
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
              Thermocouple voltage represents <strong>T1 − T2</strong>, not T1 alone. In modern monitors the reference or “cold”
              junction is inside the monitor; a thermistor measures that internal temperature (T2), and the electronics add the
              equivalent reference-junction voltage to calculate patient temperature (T1). This electronic correction replaces the
              historical ice-bath reference <InlineRef topicId="temperature-measurement" refLabel="Cross & Plunkett Ch.11" />.
            </p>
            <p>
              <strong>Clinical use:</strong> Nasopharyngeal and oesophageal temperature probes. The nasopharyngeal probe reflects
              brain temperature as it sits near the internal carotid artery.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Peltier and Thomson Effects</h2>
          <div className="text-muted-foreground leading-relaxed space-y-3">
            <p>
              <strong>Peltier effect</strong> is the converse of the Seebeck effect: passing a current through a
              junction of two dissimilar metals causes heat to be absorbed or liberated at that junction, depending on
              the direction of current flow. It is used for active heating/cooling — thermoelectric coolers, cold-junction
              compensation, and some blood/fluid warming and targeted temperature management devices
              <InlineRef topicId="temperature-measurement" refLabel="Cross & Plunkett Ch.11" />.
            </p>
            <p>
              <strong>Thomson effect</strong> is the heating or cooling of a <em>single</em> homogeneous current-carrying
              conductor along which a temperature gradient exists; the sign depends on the metal and the direction of
              current relative to the gradient.
            </p>
            <p>
              <strong>Exam point:</strong> Seebeck is the principle of temperature <em>measurement</em>; Peltier is used
              for active heating/cooling; Thomson is a small contributory thermoelectric effect and a favourite viva
              completion question <InlineRef topicId="temperature-measurement" refLabel="Cross & Plunkett Ch.11" />.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Liquid Crystal Thermometers</h2>
          <p className="text-muted-foreground leading-relaxed">
            Disposable forehead strips contain microencapsulated <strong>cholesteryl ester liquid crystals</strong>. Temperature alters
            their ordered molecular structure and therefore the wavelength—and colour—of reflected light. They measure skin rather than
            core temperature, are influenced by ambient conditions and perfusion, and are suitable only for rough trends rather than
            anaesthetic or critical-care decisions <InlineRef topicId="temperature-measurement" refLabel="Cross & Plunkett Ch.11" />.
          </p>
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
              Resistance is measured using a <strong>Wheatstone bridge</strong> circuit. Four resistors — R1, R2, R3 and
              Rx (the thermistor or RTD) — are arranged in a diamond, with an input voltage Vin applied across one pair
              of opposite corners and Vout measured across the other pair. The bridge is <strong>balanced</strong> when
              R1/R2 = R3/Rx, so Vout is zero; a change in temperature changes Rx, unbalancing the bridge and producing a
              Vout proportional to the resistance change <InlineRef topicId="temperature-measurement" refLabel="Cross & Plunkett Ch.11" />.
            </p>
            <div className="my-3 rounded-lg border border-border p-3">
              <svg viewBox="0 0 300 200" className="w-full h-auto max-w-sm mx-auto">
                <g className="stroke-primary" fill="none" strokeWidth="1.5">
                  <line x1="150" y1="20" x2="60" y2="100" />
                  <line x1="150" y1="20" x2="240" y2="100" />
                  <line x1="60" y1="100" x2="150" y2="180" />
                  <line x1="240" y1="100" x2="150" y2="180" />
                  <line x1="150" y1="20" x2="150" y2="4" />
                  <line x1="150" y1="180" x2="150" y2="196" />
                  <line x1="60" y1="100" x2="30" y2="100" />
                  <line x1="240" y1="100" x2="270" y2="100" />
                </g>
                <g className="fill-muted-foreground text-[10px]">
                  <text x="90" y="55">R1</text>
                  <text x="195" y="55">R2</text>
                  <text x="85" y="150">R3</text>
                  <text x="190" y="150">Rx</text>
                  <text x="140" y="14">Vin+</text>
                  <text x="130" y="197">Vin−</text>
                  <text x="0" y="95">Vout−</text>
                  <text x="272" y="95">Vout+</text>
                </g>
              </svg>
              <p className="text-xs text-muted-foreground text-center mt-1">
                Wheatstone bridge: balanced (Vout = 0) when R1/R2 = R3/Rx; Rx changing with temperature unbalances the
                bridge and generates a proportional Vout.
              </p>
            </div>
            <p>
              <strong>Practical points:</strong> a <em>null-deflection</em> version adjusts a variable resistor until
              Vout is zero (most accurate, no current drawn), while a <em>deflection</em> version reads Vout directly
              (used for continuous monitoring). A second, identical thermistor in an adjacent arm can compensate for
              ambient temperature. Long lead resistance introduces error, mitigated by a three- or four-wire RTD
              connection. Self-heating of the thermistor by the excitation current is itself a source of error, so the
              excitation current is kept small <InlineRef topicId="temperature-measurement" refLabel="Cross & Plunkett Ch.11" />.
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
              Although the tympanic membrane is itself supplied predominantly by branches of the <em>external</em> carotid
              artery, its close anatomical proximity to the <strong>internal carotid artery</strong> means its emitted
              infrared radiation acts as a surrogate for the temperature of blood supplying the <strong>hypothalamus</strong>,
              making it a reliable reflection of core temperature.
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
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead className="bg-secondary/40"><tr><th className="p-2 text-left text-foreground">Site</th><th className="p-2 text-left text-foreground">Bias vs PA</th><th className="p-2 text-left text-foreground">Interpretation</th></tr></thead>
                <tbody>
                  <tr className="border-t border-border"><td className="p-2">Pulmonary artery</td><td className="p-2">Reference</td><td className="p-2">Best measure of mixed central blood temperature; invasive.</td></tr>
                  <tr className="border-t border-border"><td className="p-2">Distal oesophagus</td><td className="p-2">+0.11 °C; LoA −0.19 to +0.41 °C</td><td className="p-2">Close agreement; upper placement is cooled by airway gas.</td></tr>
                  <tr className="border-t border-border"><td className="p-2">Bladder</td><td className="p-2">−0.21 °C; LoA −0.61 to +0.19 °C</td><td className="p-2">Useful in ICU; lags rapid change and depends on urine flow.</td></tr>
                  <tr className="border-t border-border"><td className="p-2">Rectal</td><td className="p-2">−0.07 °C; LoA −0.87 to +0.73 °C</td><td className="p-2">Wide agreement and thermal lag; may be affected by stool.</td></tr>
                  <tr className="border-t border-border"><td className="p-2">Tympanic</td><td className="p-2">Variable</td><td className="p-2">Operator, alignment and cerumen dependent.</td></tr>
                </tbody>
              </table>
              <p className="p-2 text-xs text-muted-foreground"><InlineRef topicId="temperature-measurement" refLabel="Intensive Care Med 2003" /></p>
            </div>
            <p>
              The <strong>core-peripheral temperature gradient</strong> reflects peripheral vasoconstriction and is used clinically
              to assess perfusion in shock. A gradient &gt;2°C suggests significant vasoconstriction.
            </p>
            <p>
              During general anaesthesia, core temperature typically drops in three phases: (1) <strong>redistribution</strong>
              (rapid drop in first hour due to vasodilation), (2) <strong>linear decline</strong> (radiation &gt; metabolic heat
              production), (3) <strong>plateau</strong> (thermoregulatory vasoconstriction re-established at ~34.5°C).
            </p>
            <div className="rounded-lg border border-border p-3">
              <p className="font-semibold text-foreground">Zero-Heat-Flux Thermometry</p>
              <div className="mt-2 text-sm space-y-2">
                <p>
                  <strong>Principle:</strong> a dual-sensor forehead patch (e.g. 3M Bair Hugger temperature monitoring
                  system) contains two thermistors separated by an insulating layer, plus a servo-controlled heating
                  element.
                </p>
                <p>
                  <strong>Mechanism:</strong> the heater warms the skin until the two thermistors read the same
                  temperature, i.e. there is no temperature gradient and therefore <strong>zero heat flux</strong>
                  between deep tissue and the skin surface. With heat loss abolished, the skin surface temperature
                  equilibrates with, and so reports, the underlying deep-tissue (core) temperature. Equilibration takes
                  a few minutes after application <InlineRef topicId="temperature-measurement" refLabel="BJA Educ Temperature 2020" />.
                </p>
                <p>
                  <strong>Clinical use:</strong> continuous, non-invasive core temperature in theatre, recovery and ICU,
                  including awake and regional cases; validation studies show bias within about 0.2 °C of oesophageal,
                  bladder or pulmonary artery temperature with limits of agreement around ±0.5 °C
                  <InlineRef topicId="temperature-measurement" refLabel="Intensive Care Med 2003" />.
                </p>
                <p>
                  <strong>Advantages:</strong> non-invasive, continuous, no airway or urinary access needed, usable
                  pre-induction and post-operatively.
                </p>
                <p>
                  <strong>Limitations:</strong> requires clean dry forehead access (competes with the surgical field in
                  neuro/ENT/ophthalmic work and with EEG/BIS electrodes), single-use consumable cost, potential local
                  skin irritation or pressure/thermal injury with prolonged use, slow to follow very rapid changes such
                  as cardiopulmonary bypass rewarming, and less reliable in low-flow or profoundly vasoconstricted
                  states.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Fever Monitoring in ICU</h2>
          <p className="text-muted-foreground leading-relaxed">
            For a new fever in a critically ill adult, use a central measurement—PA-catheter, bladder-catheter or oesophageal
            thermistor—when already present or when precision will change diagnosis or treatment. Do not insert an invasive device solely
            to measure temperature. Without central access, oral or rectal measurement is preferred over less reliable axillary, temporal
            or non-contact methods. This differs from routine intraoperative practice, where distal oesophageal or nasopharyngeal probes
            are convenient continuous choices <InlineRef topicId="temperature-measurement" refLabel="SCCM IDSA Fever 2023" />.
          </p>
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
          <TopicFaqs faqs={temperatureMeasurementFaqs} />
        </>
      }
    />
  );
};

export default TemperatureMeasurementTopic;

import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { QuizSection } from "@/components/QuizSection";
import { breathingCircuitsQuiz } from "@/data/quizzes";
import BreathingCircuitsDiagram from "@/components/diagrams/BreathingCircuitsDiagram";
import { ReferencesList } from "@/components/ReferencesList";

const BreathingCircuitsTopic = () => {
  return (
    <SectionLayout
      title="Breathing Circuits & Scavenging"
      subtitle="Mapleson classification, circle system, soda lime, and scavenging systems"
      backPath="/physics"
      backLabel="Physics"
      accentColor="text-physics"
    >
      <div className="space-y-8">
        <KeyLearningPoints
          points={[
            "Mapleson A (Magill) is most efficient for spontaneous ventilation (FGF ≈ MV); Mapleson D (Bain) is most efficient for controlled ventilation",
            "Mapleson E (Ayre's T-piece) has no valves → minimal resistance → ideal for neonates; F (Jackson-Rees) adds an open-tail bag for IPPV",
            "The circle system has 7 components and allows low-flow anaesthesia (FGF 0.5–1 L/min) by rebreathing after CO₂ absorption",
            "Soda lime: Ca(OH)₂ 80% + NaOH 4% — exothermic reaction produces heat and water; indicator turns purple when exhausted",
            "Compound A (nephrotoxic) from sevoflurane + desiccated soda lime; CO from desflurane + desiccated soda lime (especially with KOH)",
            "Scavenging has 4 components with a 30mm connector; safety valves limit pressure to ±0.5 cmH₂O to prevent barotrauma",
            "COSHH limits: N₂O <100 ppm (8hr TWA), halogenated agents <50 ppm",
          ]}
        />

        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Introduction</h2>
          <p className="text-muted-foreground leading-relaxed">
            Breathing circuits deliver anaesthetic gases from the machine to the patient and remove exhaled CO₂. Understanding
            circuit classification, efficiency, and the physics of CO₂ absorption is essential for safe anaesthetic practice
            and is heavily examined in the Primary FRCA. Scavenging systems protect theatre staff from chronic exposure to
            waste anaesthetic gases.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Interactive Diagrams</h2>
          <BreathingCircuitsDiagram />
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Mapleson Classification</h2>
          <div className="text-muted-foreground leading-relaxed space-y-3">
            <p>
              Mapleson circuits (A–F) are <strong>semi-open systems</strong> that prevent rebreathing by using high fresh gas
              flows to flush expired CO₂ out through the APL valve. They differ in the relative positions of the FGF inlet,
              reservoir bag, APL valve, and corrugated tubing.
            </p>
            <p>
              <strong>Mapleson A (Magill)</strong> is the most efficient for spontaneous ventilation because alveolar gas
              (rich in CO₂) is vented first through the APL valve near the patient, while dead space gas (low CO₂) refills
              the tubing. FGF need only equal minute ventilation (~70 mL/kg/min). For controlled ventilation, Mapleson A
              is the least efficient because squeezing the bag pushes fresh gas out of the APL valve.
            </p>
            <p>
              <strong>Mapleson D (Bain)</strong> is a coaxial circuit with FGF delivered through an inner tube to the patient
              end. It is the most efficient for controlled ventilation. The <strong>Bain coaxial circuit</strong> is compact
              but risks hypoxia if the inner tube disconnects (Pethick test: occlude inner tube, high-flow O₂ should not
              generate positive pressure in the circuit).
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Circle Breathing System</h2>
          <div className="text-muted-foreground leading-relaxed space-y-3">
            <p>
              The circle system is a <strong>semi-closed</strong> (or closed) rebreathing circuit that uses a CO₂ absorber
              to remove carbon dioxide, allowing exhaled gas to be recirculated. It has seven essential components:
              FGF inlet, inspiratory and expiratory unidirectional valves, Y-piece, APL valve, reservoir bag,
              and CO₂ absorber canister.
            </p>
            <p>
              <strong>Low-flow anaesthesia</strong> (FGF 0.5–1 L/min) conserves volatile agents and reduces costs, warms
              and humidifies inspired gas via the exothermic soda lime reaction, and minimises environmental pollution.
              <strong> Closed-circuit anaesthesia</strong> (FGF equals uptake only, ~200–300 mL/min) requires careful
              monitoring of inspired O₂ and agent concentration.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Soda Lime & CO₂ Absorption</h2>
          <div className="text-muted-foreground leading-relaxed space-y-3">
            <p>
              Soda lime contains <strong>Ca(OH)₂ (~80%)</strong>, NaOH (~4%), KOH (~1%), water (~14%), silica (hardener),
              and an indicator dye. CO₂ reacts with water to form carbonic acid, which reacts with NaOH to form Na₂CO₃.
              This then reacts with Ca(OH)₂ to regenerate NaOH and produce the end product CaCO₃. The overall reaction
              is <strong>exothermic</strong>, producing heat (up to 40–60°C) and water.
            </p>
            <p>
              <strong>Exhaustion indicators</strong>: ethyl violet changes from white to purple. Caution: colour may
              reverse overnight ("regeneration") giving a false impression of fresh soda lime. <strong>Desiccated soda
              lime</strong> (e.g., left with FGF running overnight without a patient) poses two major risks: production
              of <strong>compound A</strong> with sevoflurane (nephrotoxic in rats) and <strong>carbon monoxide</strong>
              with desflurane (especially soda lime containing KOH).
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Scavenging Systems</h2>
          <div className="text-muted-foreground leading-relaxed space-y-3">
            <p>
              The anaesthetic gas scavenging system (AGSS) removes waste gases from the theatre environment. It has
              four components: <strong>collecting</strong> (from APL/ventilator exhaust via a 30mm connector — deliberately
              different from 22mm/15mm breathing circuit connectors), <strong>transfer</strong> (tubing to receiving system),
              <strong> receiving</strong> (reservoir with safety valves), and <strong>disposal</strong> (active or passive).
            </p>
            <p>
              <strong>Safety valves</strong> in the receiving system are critical: they limit both positive and negative
              pressure transmission to the patient circuit to ±0.5 cmH₂O, preventing barotrauma from a blocked scavenging
              system or excessive suction. <strong>Active systems</strong> use a fan or piped vacuum (75 L/min);
              <strong> passive systems</strong> vent directly to the outside atmosphere.
            </p>
          </div>
        </div>

        <QuizSection questions={breathingCircuitsQuiz} />

      <ReferencesList topicId="breathing-circuits" />

        <TopicCompletionToggle topicId="breathing-circuits" topicTitle="Breathing Circuits & Scavenging" />
      </div>
    </SectionLayout>
  );
};

export default BreathingCircuitsTopic;

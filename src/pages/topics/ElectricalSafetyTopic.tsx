import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { QuizSection } from "@/components/QuizSection";
import { electricalSafetyQuiz } from "@/data/quizzes";
import ElectricalSafetyDiagram from "@/components/diagrams/ElectricalSafetyDiagram";
import { DefibrillatorCapacitorDiagram } from "@/components/diagrams/DefibrillatorCapacitorDiagram";
import { ReferencesList } from "@/components/ReferencesList";
import { SeeAlso } from "@/components/SeeAlso";

const ElectricalSafetyTopic = () => {
  return (
    <SectionLayout
      title="Electrical Safety"
      subtitle="FRCA Primary — Physics"
      backPath="/physics"
      backLabel="Physics"
      accentColor="text-physics"
    >
      <div className="prose prose-slate max-w-none">
        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Introduction</h2>
          <p className="text-foreground/90 leading-relaxed">
            Operating theatres contain numerous electrical devices in close proximity to patients. Understanding electrical
            hazards (microshock and macroshock), protection mechanisms, and the safe use of diathermy and defibrillation
            is a core FRCA primary topic.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Current, Voltage & Resistance</h2>
          <p className="text-foreground/90 leading-relaxed">
            <strong>Ohm's law: V = IR</strong>. Current (I) is the flow of electrons; voltage (V) is the driving force;
            resistance (R) opposes current flow. Biological damage from electricity depends primarily on <em>current density</em>
            and <em>pathway</em> through the body. Skin resistance (dry ~100 kΩ, wet ~1 kΩ) is the main protective barrier.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Macroshock</h2>
          <p className="text-foreground/90 leading-relaxed">
            Macroshock occurs when current passes through the body via the skin. Thresholds (50 Hz AC):
          </p>
          <ul className="text-foreground/90 mt-2 space-y-1">
            <li><strong>1 mA</strong> — perception (tingling)</li>
            <li><strong>5 mA</strong> — pain</li>
            <li><strong>15 mA</strong> — "let-go" threshold (tetanic muscle contraction prevents release)</li>
            <li><strong>50 mA</strong> — respiratory arrest</li>
            <li><strong>100 mA</strong> — ventricular fibrillation</li>
            <li><strong>&gt;5 A</strong> — sustained asystole, burns</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Microshock</h2>
          <p className="text-foreground/90 leading-relaxed">
            Microshock occurs when current is delivered directly to the myocardium (e.g., via a pacing wire, central line,
            or intracardiac catheter). As little as <strong>150 µA (0.15 mA)</strong> applied directly to the heart can
            cause ventricular fibrillation — 1000 times less than the macroshock threshold.
          </p>
          <div className="bg-secondary/30 rounded-lg p-4 mt-3 border border-border">
            <p className="text-sm font-medium text-foreground">Clinical Implication</p>
            <p className="text-sm text-muted-foreground mt-1">
              Patients with intracardiac catheters are "electrically susceptible." All equipment contacting the patient must
              have leakage current &lt;10 µA (Type CF equipment). Saline-filled CVP lines can act as conductors.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Equipment Classification</h2>
          <p className="text-foreground/90 leading-relaxed">
            <strong>Class I</strong>: earthed metal casing (fault current flows to earth via green/yellow wire).
            <strong> Class II</strong>: double insulated, no earth needed (□ within □ symbol).
            <strong> Class III</strong>: powered by safety extra-low voltage (&lt;24V AC).
          </p>
          <p className="text-foreground/90 leading-relaxed mt-3">
            <strong>Type B</strong>: body contact, leakage &lt;100 µA. <strong>Type BF</strong>: floating patient connection,
            &lt;100 µA. <strong>Type CF</strong>: cardiac floating, leakage &lt;10 µA — required for intracardiac use.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Diathermy</h2>
          <p className="text-foreground/90 leading-relaxed">
            Surgical diathermy uses high-frequency AC (0.4–3 MHz) which does not stimulate neuromuscular tissue. <strong>Monopolar
            </strong>: current flows from active electrode through the patient to a large return plate (current density at plate
            is low → no burns). <strong>Bipolar</strong>: current flows between two prongs of forceps — no return plate needed,
            safer near pacemakers.
          </p>
          <div className="bg-secondary/30 rounded-lg p-4 mt-3 border border-border">
            <p className="text-sm font-medium text-foreground">Diathermy Hazards</p>
            <p className="text-sm text-muted-foreground mt-1">
              Burns at the return plate (poor contact, small area). Channelling effect at narrow points (digits). Interference
              with pacemakers and monitoring. Bowel burns during laparoscopic surgery (direct coupling, capacitative coupling).
              Ignition of alcohol-based skin prep or airway fires with high FiO₂.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Defibrillation</h2>
          <p className="text-foreground/90 leading-relaxed">
            Defibrillation delivers a large DC current (~30–40 A peak) to simultaneously depolarise a critical mass of
            myocardium, allowing the SA node to resume normal conduction. Modern biphasic defibrillators are more effective
            at lower energy (120–200 J) than monophasic (360 J). Transthoracic impedance (~70–80 Ω) affects current delivery.
          </p>
        </section>
      </div>

      <ElectricalSafetyDiagram />

      <KeyLearningPoints points={[
        "Macroshock VF threshold ~100 mA via skin; microshock VF threshold ~150 µA via intracardiac catheter.",
        "Type CF equipment (leakage <10 µA) required for intracardiac connections.",
        "Surgical diathermy uses high-frequency AC (0.4-3 MHz) which does not stimulate muscle/nerve.",
        "Monopolar diathermy requires a return plate; bipolar does not. Bipolar is safer near pacemakers.",
        "Equipment classes: I (earthed), II (double insulated), III (low voltage <24V AC).",
        "Biphasic defibrillators deliver equivalent efficacy at lower energy than monophasic."
      ]} />
      <QuizSection questions={electricalSafetyQuiz} />
      <ReferencesList topicId="electrical-safety" />

      <SeeAlso topicId="electrical-safety" />
        <TopicCompletionToggle topicId="electrical-safety" topicTitle="Electrical Safety" />
    </SectionLayout>
  );
};

export default ElectricalSafetyTopic;

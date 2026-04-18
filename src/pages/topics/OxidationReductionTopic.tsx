import { SectionLayout } from "@/components/SectionLayout";
import { RedoxElectrochemistryDiagram } from "@/components/diagrams/RedoxElectrochemistryDiagram";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { SeeAlso } from "@/components/SeeAlso";
import { ReferencesList } from "@/components/ReferencesList";
import { redoxQuiz } from "@/data/quizzes";

const OxidationReductionTopic = () => {
  return (
    <SectionLayout
      title="Oxidation, Reduction & Electrochemistry"
      subtitle="Redox reactions, clinical electrodes, and free radical biology"
      backPath="/chemistry"
      backLabel="Chemistry Foundations"
      accentColor="text-chemistry"
    >
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Redox Chemistry in Medicine</h2>
          <div className="prose prose-sm max-w-none text-muted-foreground space-y-3">
            <p>
              Oxidation-reduction (redox) reactions involve the <strong>transfer of electrons</strong> between species. 
              They are fundamental to energy metabolism (electron transport chain), drug metabolism (cytochrome P450), 
              clinical measurement (Clark and Severinghaus electrodes), and pathology (free radical injury).
            </p>
            <p>
              Remember: <strong>OIL RIG</strong> — Oxidation Is Loss (of electrons), Reduction Is Gain.
              The species that loses electrons is <strong>oxidised</strong> and acts as the <strong>reducing agent</strong>. 
              The species that gains electrons is <strong>reduced</strong> and acts as the <strong>oxidising agent</strong>.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-4">Interactive Diagram</h2>
          <RedoxElectrochemistryDiagram />
        </section>

        <KeyLearningPoints
          points={[
            "OIL RIG: Oxidation Is Loss, Reduction Is Gain (of electrons). Always occur together.",
            "Methaemoglobin: Fe²⁺ oxidised to Fe³⁺ → cannot carry O₂. Caused by prilocaine, dapsone, GTN. Treat with methylene blue.",
            "Clark electrode (PO₂): amperometric — O₂ reduced at platinum cathode, current proportional to PO₂",
            "Severinghaus electrode (PCO₂): CO₂ diffuses through Teflon into NaHCO₃ → pH change measured",
            "Galvanic fuel cell: self-generating O₂ sensor (no external voltage). Lead anode consumed over time.",
            "Free radicals have unpaired electrons — highly reactive. Superoxide, hydroxyl radical, peroxynitrite",
            "Ischaemia-reperfusion generates ROS via xanthine oxidase — major cause of post-ROSC organ damage",
            "N-acetylcysteine replenishes glutathione — treats paracetamol toxicity by neutralising NAPQI",
          ]}
        />

        <QuizSection questions={redoxQuiz} />
        <ReferencesList topicId="oxidation-reduction" />
        <SeeAlso topicId="oxidation-reduction" />
        <TopicCompletionToggle topicId="oxidation-reduction" topicTitle="Oxidation, Reduction & Electrochemistry" />
      </div>
    </SectionLayout>
  );
};

export default OxidationReductionTopic;

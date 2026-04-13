import { SectionLayout } from "@/components/SectionLayout";
import { SolutionsConcentrationDiagram } from "@/components/diagrams/SolutionsConcentrationDiagram";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { solutionsConcentrationQuiz } from "@/data/quizzes";

const SolutionsConcentrationTopic = () => {
  return (
    <SectionLayout
      title="Solutions & Concentration"
      subtitle="Molarity, osmolality, tonicity, and colligative properties"
      backPath="/chemistry"
      backLabel="Chemistry Foundations"
      accentColor="text-chemistry"
    >
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Solutions in Anaesthetic Practice</h2>
          <div className="prose prose-sm max-w-none text-muted-foreground space-y-3">
            <p>
              Every drug you administer is a solution. Understanding concentration units, osmolality, and tonicity 
              is essential for safe prescribing and fluid management. Errors in concentration calculations 
              (particularly with adrenaline and insulin) are a significant cause of drug errors in anaesthesia.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-4">Interactive Diagram</h2>
          <SolutionsConcentrationDiagram />
        </section>

        <KeyLearningPoints
          points={[
            "1% solution = 10 mg/mL. Adrenaline 1:1000 = 1 mg/mL; 1:10,000 = 100 μg/mL",
            "Osmolality (mOsm/kg) is measured; osmolarity (mOsm/L) is calculated. Clinically near-equivalent.",
            "Normal plasma osmolality 280-295 mOsm/kg. Calculated = 2[Na⁺] + [urea] + [glucose]",
            "Tonicity considers only non-membrane-permeable solutes. 5% dextrose is hypotonic in vivo.",
            "Osmol gap >10 → suspect methanol, ethylene glycol, ethanol, or mannitol",
            "Colligative properties (BP elevation, FP depression, osmotic pressure, VP lowering) depend on particle number, not type",
            "Hyponatraemia → cellular oedema. Correct slowly (<10 mmol/24h) to avoid osmotic demyelination syndrome",
          ]}
        />

        <QuizSection questions={solutionsConcentrationQuiz} />
        <TopicCompletionToggle topicId="solutions-concentration" topicTitle="Solutions & Concentration" />
      </div>
    </SectionLayout>
  );
};

export default SolutionsConcentrationTopic;

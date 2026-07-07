import { SectionLayout } from "@/components/layout/SectionLayout";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { SectionSubNav } from "@/components/layout/SectionSubNav";
import { SectionTopicsList } from "@/components/topic/SectionTopicsList";
import { SectionSummary } from "@/components/topic/SectionSummary";
import { chemistryTopics } from "@/data/curriculum";
import { useProgress } from "@/contexts/ProgressContext";
import { useExamFilter } from "@/contexts/ExamFilterContext";

const ChemistrySection = () => {
  const { getSectionProgress } = useProgress();
  const { matchesFilter } = useExamFilter();
  const progress = getSectionProgress("chemistry");
  const visibleTopics = chemistryTopics.filter((t) => matchesFilter(t.examTags));

  return (
    <SectionLayout
      title="Anaesthesia Chemistry Explained"
      subtitle="Anaesthesia chemistry explained — foundational chemistry for FRCA trainees with no A-level chemistry required."
      metaDescription="Anaesthesia chemistry explained for FRCA trainees: atoms, bonding, acids and bases, equilibria, gases and organic chemistry — foundational concepts that underpin anaesthetic pharmacology, physiology and physics, with no A-level chemistry required."
      backPath="/revise"
      backLabel="Core Disciplines"
      accentColor="text-chemistry"
      disableAutoTOC
    >
      <SectionSubNav />
      <SectionHeader
        section="chemistry"
        eyebrow="Chemistry Foundations · FRCA"
        completed={progress.completed}
        total={progress.total}
        intro={
          <p>
            <strong>Anaesthesia chemistry explained.</strong> Foundational
            chemistry concepts that underpin anaesthetic pharmacology, physiology
            and physics — atoms and bonding, acids and bases, equilibria, gases
            and basic organic chemistry. Designed for FRCA trainees without
            A-level chemistry, with clear notes, diagrams and worked examples so
            downstream pharmacology and physics topics make sense.
          </p>
        }
      />

      <section id="topics" className="scroll-mt-28">
        <SectionTopicsList section="chemistry" topics={visibleTopics} />
      </section>

      <section id="summary" className="scroll-mt-28">
        <SectionSummary section="chemistry" />
      </section>
    </SectionLayout>
  );
};

export default ChemistrySection;

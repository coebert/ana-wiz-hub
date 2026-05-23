import { SectionLayout } from "@/components/SectionLayout";
import { SectionTopicsList } from "@/components/SectionTopicsList";
import { SectionSummary } from "@/components/SectionSummary";
import { chemistryTopics } from "@/data/curriculum";
import { useProgress } from "@/contexts/ProgressContext";
import { useExamFilter } from "@/contexts/ExamFilterContext";
import { ProgressRing } from "@/components/ProgressRing";

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
    >
      <section className="mb-6 p-5 rounded-lg border border-border bg-card/50">
        <p className="text-sm text-foreground leading-relaxed">
          <strong>Anaesthesia chemistry explained.</strong> Foundational
          chemistry concepts that underpin anaesthetic pharmacology, physiology
          and physics — atoms and bonding, acids and bases, equilibria, gases
          and basic organic chemistry. Designed for FRCA trainees without
          A-level chemistry, with clear notes, diagrams and worked examples so
          downstream pharmacology and physics topics make sense.
        </p>
      </section>
      <div className="flex items-center gap-3 mb-6 p-4 rounded-lg bg-card border border-border">
        <ProgressRing completed={progress.completed} total={progress.total} size={48} />
        <div>
          <p className="text-sm font-medium text-foreground">{progress.completed} of {progress.total} topics completed</p>
          <p className="text-xs text-muted-foreground">Chemistry Foundations topics</p>
        </div>
      </div>
      <SectionTopicsList section="chemistry" topics={visibleTopics} />
      <SectionSummary section="chemistry" />
    </SectionLayout>
  );
};

export default ChemistrySection;

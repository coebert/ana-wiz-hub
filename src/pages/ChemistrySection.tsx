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
      title="Chemistry Foundations"
      subtitle="Essential chemistry principles for anaesthetists — no prior A-level chemistry required"
      backPath="/revise"
      backLabel="Core Disciplines"
      accentColor="text-chemistry"
    >
      <div className="bg-secondary/30 rounded-xl p-4 border border-border mb-6">
        <p className="text-sm text-muted-foreground leading-relaxed">
          This section covers the foundational chemistry concepts that underpin anaesthetic pharmacology, 
          physiology, and physics. It is designed for trainees who may not have studied chemistry at A-level, 
          providing a clear and accessible introduction to the key principles you'll encounter throughout 
          the FRCA curriculum.
        </p>
      </div>
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

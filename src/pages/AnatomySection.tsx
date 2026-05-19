import { SectionLayout } from "@/components/SectionLayout";
import { SectionTopicsList } from "@/components/SectionTopicsList";
import { SectionSummary } from "@/components/SectionSummary";
import { anatomyTopics } from "@/data/curriculum";
import { useProgress } from "@/contexts/ProgressContext";
import { useExamFilter } from "@/contexts/ExamFilterContext";
import { ProgressRing } from "@/components/ProgressRing";

const AnatomySection = () => {
  const { getSectionProgress } = useProgress();
  const { matchesFilter } = useExamFilter();
  const progress = getSectionProgress("anatomy");
  const visibleTopics = anatomyTopics.filter((t) => matchesFilter(t.examTags));

  return (
    <SectionLayout
      title="Anatomy"
      subtitle="Applied anatomy for anaesthesia, regional techniques, and intensive care"
      backPath="/revise"
      backLabel="Core Disciplines"
      accentColor="text-anatomy"
    >
      <div className="flex items-center gap-3 mb-6 p-4 rounded-lg bg-card border border-border">
        <ProgressRing completed={progress.completed} total={progress.total} size={48} />
        <div>
          <p className="text-sm font-medium text-foreground">{progress.completed} of {progress.total} topics completed</p>
          <p className="text-xs text-muted-foreground">Anatomy topics</p>
        </div>
      </div>
      <SectionTopicsList section="anatomy" topics={visibleTopics} />
      <SectionSummary section="anatomy" />
    </SectionLayout>
  );
};

export default AnatomySection;

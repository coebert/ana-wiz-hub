import { SectionLayout } from "@/components/SectionLayout";
import { SectionTopicsList } from "@/components/SectionTopicsList";
import { SectionSummary } from "@/components/SectionSummary";
import { physicsTopics } from "@/data/curriculum";
import { useProgress } from "@/contexts/ProgressContext";
import { useExamFilter } from "@/contexts/ExamFilterContext";
import { ProgressRing } from "@/components/ProgressRing";

const PhysicsSection = () => {
  const { getSectionProgress } = useProgress();
  const { matchesFilter } = useExamFilter();
  const progress = getSectionProgress("physics");
  const visibleTopics = physicsTopics.filter((t) => matchesFilter(t.examTags));

  return (
    <SectionLayout
      title="Physics"
      subtitle="Physical principles applied to anaesthetic equipment and monitoring"
      backPath="/revise"
      backLabel="Core Disciplines"
      accentColor="text-physics"
    >
      <div className="flex items-center gap-3 mb-6 p-4 rounded-lg bg-card border border-border">
        <ProgressRing completed={progress.completed} total={progress.total} size={48} />
        <div>
          <p className="text-sm font-medium text-foreground">{progress.completed} of {progress.total} topics completed</p>
          <p className="text-xs text-muted-foreground">Physics topics</p>
        </div>
      </div>
      <SectionTopicsList section="physics" topics={visibleTopics} />
      <SectionSummary section="physics" />
    </SectionLayout>
  );
};

export default PhysicsSection;

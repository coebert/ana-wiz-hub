import { SectionLayout } from "@/components/SectionLayout";
import { SectionTopicsList } from "@/components/SectionTopicsList";
import { perioperativeTopics } from "@/data/curriculum";
import { useProgress } from "@/contexts/ProgressContext";
import { useExamFilter } from "@/contexts/ExamFilterContext";
import { ProgressRing } from "@/components/ProgressRing";

const PerioperativeSection = () => {
  const { getSectionProgress } = useProgress();
  const { matchesFilter } = useExamFilter();
  const progress = getSectionProgress("perioperative");
  const visibleTopics = perioperativeTopics.filter((t) => matchesFilter(t.examTags));

  return (
    <SectionLayout
      title="Perioperative Medicine"
      subtitle="Preoperative assessment, risk stratification, and enhanced recovery"
      backPath="/revise"
      backLabel="Core Disciplines"
      accentColor="text-perioperative"
    >
      <div className="flex items-center gap-3 mb-6 p-4 rounded-lg bg-card border border-border">
        <ProgressRing completed={progress.completed} total={progress.total} size={48} />
        <div>
          <p className="text-sm font-medium text-foreground">{progress.completed} of {progress.total} topics completed</p>
          <p className="text-xs text-muted-foreground">Perioperative medicine topics</p>
        </div>
      </div>
      <SectionTopicsList section="perioperative" topics={visibleTopics} />
    </SectionLayout>
  );
};

export default PerioperativeSection;

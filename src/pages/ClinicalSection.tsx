import { SectionLayout } from "@/components/SectionLayout";
import { TopicCard } from "@/components/TopicCard";
import { clinicalTopics } from "@/data/curriculum";
import { useProgress } from "@/contexts/ProgressContext";
import { useExamFilter } from "@/contexts/ExamFilterContext";
import { ProgressRing } from "@/components/ProgressRing";

const ClinicalSection = () => {
  const { getSectionProgress } = useProgress();
  const { matchesFilter } = useExamFilter();
  const progress = getSectionProgress("clinical");
  const visibleTopics = clinicalTopics.filter((t) => matchesFilter(t.examTags));

  return (
    <SectionLayout
      title="Clinical Anaesthesia"
      subtitle="Subspecialty anaesthesia and clinical management"
      backPath="/"
      backLabel="Home"
      accentColor="text-clinical"
    >
      <div className="flex items-center gap-3 mb-6 p-4 rounded-lg bg-card border border-border">
        <ProgressRing completed={progress.completed} total={progress.total} size={48} />
        <div>
          <p className="text-sm font-medium text-foreground">{progress.completed} of {progress.total} topics completed</p>
          <p className="text-xs text-muted-foreground">Clinical anaesthesia topics</p>
        </div>
      </div>
      <div className="space-y-3">
        {visibleTopics.map((topic) => (
          <TopicCard
            key={topic.id}
            title={topic.title}
            description={topic.description}
            path={`/clinical/${topic.id}`}
            section="clinical"
            topicId={topic.id}
            examTags={topic.examTags}
          />
        ))}
      </div>
    </SectionLayout>
  );
};

export default ClinicalSection;

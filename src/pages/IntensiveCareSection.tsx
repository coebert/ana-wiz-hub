import { SectionLayout } from "@/components/layout/SectionLayout";
import { SectionTopicsList } from "@/components/topic/SectionTopicsList";
import { SectionSummary } from "@/components/topic/SectionSummary";
import { intensiveCareTopics } from "@/data/curriculum";
import { useProgress } from "@/contexts/ProgressContext";
import { useExamFilter } from "@/contexts/ExamFilterContext";
import { ProgressRing } from "@/components/shared/ProgressRing";

const IntensiveCareSection = () => {
  const { getSectionProgress } = useProgress();
  const { matchesFilter } = useExamFilter();
  const progress = getSectionProgress("intensive-care");
  const visibleTopics = intensiveCareTopics.filter((t) => matchesFilter(t.examTags));

  return (
    <SectionLayout
      title="Intensive Care Medicine Explained"
      subtitle="Intensive care medicine explained — organ support, sepsis, ARDS, shock and neurocritical care for FFICM and FRCA trainees."
      metaDescription="Intensive care medicine explained for FFICM and FRCA trainees: mechanical ventilation, sepsis, ARDS, shock, AKI, neurocritical care and organ support — concise notes, diagrams, MCQs and structured viva answers."
      backPath="/revise"
      backLabel="Core Disciplines"
      accentColor="text-icu"
    >
      <div className="flex items-center gap-3 mb-6 p-4 rounded-lg bg-card border border-border">
        <ProgressRing completed={progress.completed} total={progress.total} size={48} />
        <div>
          <p className="text-sm font-medium text-foreground">{progress.completed} of {progress.total} topics completed</p>
          <p className="text-xs text-muted-foreground">Intensive care topics</p>
        </div>
      </div>
      <section className="mb-8 p-5 rounded-lg border border-border bg-card/50">
        <h2 className="sr-only">Introduction</h2>
        <p className="text-sm text-foreground leading-relaxed">
          <strong>Intensive care medicine explained.</strong> Critical care for
          FFICM and FRCA Final trainees — mechanical ventilation and ARDS,
          sepsis and shock, AKI and renal replacement, neurocritical care,
          nutrition, sedation and end-of-life decisions. Each topic pairs
          concise notes with diagrams, MCQs and structured viva answers.
        </p>
      </section>
      <SectionTopicsList section="intensive-care" topics={visibleTopics} />
      <SectionSummary section="intensive-care" />
    </SectionLayout>
  );
};

export default IntensiveCareSection;

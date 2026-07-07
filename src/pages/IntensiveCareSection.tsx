import { SectionLayout } from "@/components/layout/SectionLayout";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { SectionSubNav } from "@/components/layout/SectionSubNav";
import { SectionTopicsList } from "@/components/topic/SectionTopicsList";
import { SectionSummary } from "@/components/topic/SectionSummary";
import { intensiveCareTopics } from "@/data/curriculum";
import { useProgress } from "@/contexts/ProgressContext";
import { useExamFilter } from "@/contexts/ExamFilterContext";

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
      disableAutoTOC
    >
      <SectionSubNav />
      <SectionHeader
        section="intensive-care"
        eyebrow="Intensive Care · FFICM · FRCA Final"
        completed={progress.completed}
        total={progress.total}
        intro={
          <p>
            <strong>Intensive care medicine explained.</strong> Critical care for
            FFICM and FRCA Final trainees — mechanical ventilation and ARDS,
            sepsis and shock, AKI and renal replacement, neurocritical care,
            nutrition, sedation and end-of-life decisions. Each topic pairs
            concise notes with diagrams, MCQs and structured viva answers.
          </p>
        }
      />

      <section id="topics" className="scroll-mt-28">
        <SectionTopicsList section="intensive-care" topics={visibleTopics} />
      </section>

      <section id="summary" className="scroll-mt-28">
        <SectionSummary section="intensive-care" />
      </section>
    </SectionLayout>
  );
};

export default IntensiveCareSection;

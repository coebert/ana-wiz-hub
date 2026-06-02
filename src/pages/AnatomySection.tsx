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
      title="Anaesthesia Anatomy Explained"
      subtitle="Applied anatomy for anaesthesia explained — airway, spine, brachial plexus, abdominal wall and lower limb anatomy for FRCA and FFICM."
      metaDescription="Anaesthesia anatomy explained for FRCA and FFICM exams: airway, vertebral column, brachial plexus, abdominal wall, lower limb and thoracic anatomy applied to regional anaesthesia and intensive care — concise notes, diagrams, MCQs and viva practice."
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
      <section className="mb-8 p-5 rounded-lg border border-border bg-card/50">
        <h2 className="sr-only">Introduction</h2>
        <p className="text-sm text-foreground leading-relaxed">
          <strong>Anaesthesia anatomy explained.</strong> Applied anatomy for
          FRCA Primary, Final and FFICM trainees — airway, vertebral column and
          spinal cord, brachial plexus, abdominal wall, lower limb and thoracic
          anatomy framed around regional anaesthesia, line insertion and
          critical care procedures. Each topic pairs diagrams with MCQs and
          structured viva answers.
        </p>
      </section>
      <SectionTopicsList section="anatomy" topics={visibleTopics} />
      <SectionSummary section="anatomy" />
    </SectionLayout>
  );
};

export default AnatomySection;

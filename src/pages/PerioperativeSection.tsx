import { SectionLayout } from "@/components/layout/SectionLayout";
import { SectionTopicsList } from "@/components/topic/SectionTopicsList";
import { SectionSummary } from "@/components/topic/SectionSummary";
import { perioperativeTopics } from "@/data/curriculum";
import { useProgress } from "@/contexts/ProgressContext";
import { useExamFilter } from "@/contexts/ExamFilterContext";
import { ProgressRing } from "@/components/shared/ProgressRing";

const PerioperativeSection = () => {
  const { getSectionProgress } = useProgress();
  const { matchesFilter } = useExamFilter();
  const progress = getSectionProgress("perioperative");
  const visibleTopics = perioperativeTopics.filter((t) => matchesFilter(t.examTags));

  return (
    <SectionLayout
      title="Perioperative Medicine Explained"
      subtitle="Perioperative medicine explained — preoperative assessment, risk stratification, enhanced recovery and postoperative care for FRCA and FFICM."
      metaDescription="Perioperative medicine explained for FRCA and FFICM exams: preoperative assessment, cardiac and respiratory risk stratification, enhanced recovery (ERAS), postoperative care and frailty — concise notes, MCQs and viva practice."
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
      <section className="mb-8 p-5 rounded-lg border border-border bg-card/50">
        <h2 className="sr-only">Introduction</h2>
        <p className="text-sm text-foreground leading-relaxed">
          <strong>Perioperative medicine explained.</strong> Preoperative
          assessment, cardiac and respiratory risk stratification, CPET, frailty
          scoring, enhanced recovery (ERAS) and postoperative care for FRCA
          Final and FFICM trainees. Each topic pairs concise notes with
          diagrams, MCQs and structured viva answers.
        </p>
      </section>
      <SectionTopicsList section="perioperative" topics={visibleTopics} />
      <SectionSummary section="perioperative" />
    </SectionLayout>
  );
};

export default PerioperativeSection;

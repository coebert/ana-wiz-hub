import { SectionLayout } from "@/components/layout/SectionLayout";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { SectionSubNav } from "@/components/layout/SectionSubNav";
import { SectionTopicsList } from "@/components/topic/SectionTopicsList";
import { SectionSummary } from "@/components/topic/SectionSummary";
import { perioperativeTopics } from "@/data/curriculum";
import { useProgress } from "@/contexts/ProgressContext";
import { useExamFilter } from "@/contexts/ExamFilterContext";

const PerioperativeSection = () => {
  const { getSectionProgress } = useProgress();
  const { matchesFilter } = useExamFilter();
  const progress = getSectionProgress("perioperative");
  const visibleTopics = perioperativeTopics.filter((t) => matchesFilter(t.examTags));

  return (
    <SectionLayout
      title="Perioperative Medicine Explained"
      subtitle="Perioperative medicine explained — preoperative assessment, risk stratification, enhanced recovery and postoperative care for FRCA and FFICM."
      metaDescription="Perioperative medicine for FRCA and FFICM: preop assessment, cardiac and respiratory risk, ERAS, postoperative care and frailty — notes and MCQs."
      backPath="/revise"
      backLabel="Core Disciplines"
      accentColor="text-perioperative"
      disableAutoTOC
    >
      <SectionSubNav />
      <SectionHeader
        section="perioperative"
        eyebrow="Perioperative Medicine · FRCA Final · FFICM"
        completed={progress.completed}
        total={progress.total}
        intro={
          <p>
            <strong>Perioperative medicine explained.</strong> Preoperative
            assessment, cardiac and respiratory risk stratification, CPET, frailty
            scoring, enhanced recovery (ERAS) and postoperative care for FRCA
            Final and FFICM trainees. Each topic pairs concise notes with
            diagrams, MCQs and structured viva answers.
          </p>
        }
      />

      <section id="topics" className="scroll-mt-28">
        <SectionTopicsList section="perioperative" topics={visibleTopics} />
      </section>

      <section id="summary" className="scroll-mt-28">
        <SectionSummary section="perioperative" />
      </section>
    </SectionLayout>
  );
};

export default PerioperativeSection;

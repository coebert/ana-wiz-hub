import { SectionLayout } from "@/components/layout/SectionLayout";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { SectionSubNav } from "@/components/layout/SectionSubNav";
import { SectionTopicsList } from "@/components/topic/SectionTopicsList";
import { SectionSummary } from "@/components/topic/SectionSummary";
import { anatomyTopics } from "@/data/curriculum";
import { useProgress } from "@/contexts/ProgressContext";
import { useExamFilter } from "@/contexts/ExamFilterContext";

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
      disableAutoTOC
    >
      <SectionSubNav />
      <SectionHeader
        section="anatomy"
        eyebrow="Anatomy · FRCA · FFICM"
        completed={progress.completed}
        total={progress.total}
        intro={
          <p>
            <strong>Anaesthesia anatomy explained.</strong> Applied anatomy for
            FRCA Primary, Final and FFICM trainees — airway, vertebral column and
            spinal cord, brachial plexus, abdominal wall, lower limb and thoracic
            anatomy framed around regional anaesthesia, line insertion and
            critical care procedures. Each topic pairs diagrams with MCQs and
            structured viva answers.
          </p>
        }
      />

      <section id="topics" className="scroll-mt-28">
        <SectionTopicsList section="anatomy" topics={visibleTopics} />
      </section>

      <section id="summary" className="scroll-mt-28">
        <SectionSummary section="anatomy" />
      </section>
    </SectionLayout>
  );
};

export default AnatomySection;

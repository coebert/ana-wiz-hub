import { SectionLayout } from "@/components/layout/SectionLayout";
import { CaseBankCallout } from "@/components/cases/CaseBankCallout";
import { physicsCaseBank } from "@/data/cases/physicsCases";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { SectionSubNav } from "@/components/layout/SectionSubNav";
import { SectionTopicsList } from "@/components/topic/SectionTopicsList";
import { SectionSummary } from "@/components/topic/SectionSummary";
import { physicsTopics } from "@/data/curriculum";
import { useProgress } from "@/contexts/ProgressContext";
import { useExamFilter } from "@/contexts/ExamFilterContext";

const PhysicsSection = () => {
  const { getSectionProgress } = useProgress();
  const { matchesFilter } = useExamFilter();
  const progress = getSectionProgress("physics");
  const visibleTopics = physicsTopics.filter((t) => matchesFilter(t.examTags));

  return (
    <SectionLayout
      title="Anaesthesia Physics Explained"
      subtitle="Anaesthesia physics explained for FRCA and FFICM — gas laws, flow, pressure, electrical safety and monitoring equipment, with diagrams and viva-ready answers."
      metaDescription="Anaesthesia physics for FRCA and FFICM: gas laws, flow, pressure, electrical safety, pulse oximetry and capnography — notes, diagrams and MCQs."
      backPath="/revise"
      backLabel="Core Disciplines"
      accentColor="text-physics"
      disableAutoTOC
    >
      <SectionSubNav />
      <SectionHeader
        section="physics"
        eyebrow="Physics · FRCA · FFICM"
        completed={progress.completed}
        total={progress.total}
        intro={
          <p>
            <strong>Anaesthesia physics explained.</strong> This section covers the
            physical principles every anaesthetist needs for the FRCA Primary,
            Final and FFICM exams — from the gas laws that govern vaporiser
            output, through flow and pressure measurement, electrical safety in
            theatre, and the working principles of pulse oximetry, capnography,
            arterial blood gas analysers, temperature probes, lasers and
            fibreoptics. Each topic pairs concise revision notes with diagrams,
            single best answer MCQs and structured viva answers, so equipment
            behaviour and underlying physics become exam-ready.
          </p>
        }
      />

      <CaseBankCallout bank={physicsCaseBank} />

      <section id="topics" className="scroll-mt-28">
        <SectionTopicsList section="physics" topics={visibleTopics} />
      </section>

      <section id="summary" className="scroll-mt-28">
        <SectionSummary section="physics" />
      </section>
    </SectionLayout>
  );
};

export default PhysicsSection;

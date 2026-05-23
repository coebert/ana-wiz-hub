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
      title="Anaesthesia Physics Explained"
      subtitle="Anaesthesia physics explained for FRCA and FFICM — gas laws, flow, pressure, electrical safety and monitoring equipment, with diagrams and viva-ready answers."
      metaDescription="Anaesthesia physics explained for FRCA and FFICM exams: gas laws, flow and pressure measurement, electrical safety, pulse oximetry, capnography, lasers and temperature monitoring — concise notes with diagrams, MCQs and viva practice."
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

      <section className="mb-8 p-5 rounded-lg border border-border bg-card/50">
        <p className="text-sm text-foreground leading-relaxed">
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
      </section>

      <SectionTopicsList section="physics" topics={visibleTopics} />
      <SectionSummary section="physics" />
    </SectionLayout>
  );
};

export default PhysicsSection;

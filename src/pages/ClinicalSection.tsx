import { Link } from "react-router-dom";
import { ChevronRight, ExternalLink } from "lucide-react";
import { SectionLayout } from "@/components/layout/SectionLayout";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { SectionSubNav } from "@/components/layout/SectionSubNav";
import { TopicCard } from "@/components/topic/TopicCard";
import { SectionReferencesPanel } from "@/components/topic/SectionReferencesPanel";
import { SectionSummary } from "@/components/topic/SectionSummary";
import { clinicalTopics } from "@/data/curriculum";
import { useProgress } from "@/contexts/ProgressContext";
import { useExamFilter } from "@/contexts/ExamFilterContext";

const ClinicalSection = () => {
  const { getSectionProgress } = useProgress();
  const { matchesFilter } = useExamFilter();
  const progress = getSectionProgress("clinical");
  const visibleTopics = clinicalTopics.filter((t) => matchesFilter(t.examTags));

  return (
    <SectionLayout
      title="Clinical Anaesthesia Explained"
      subtitle="Subspecialty anaesthesia explained — obstetric, paediatric, neuro, cardiac, regional and trauma anaesthesia for FRCA and FFICM."
      metaDescription="Clinical anaesthesia explained for FRCA and FFICM exams: obstetric, paediatric, neuro, cardiac, regional, day-case and trauma anaesthesia — concise revision notes, diagrams, MCQs and structured viva answers."
      backPath="/revise"
      backLabel="Core Disciplines"
      accentColor="text-clinical"
      disableAutoTOC
    >
      <SectionSubNav />
      <SectionHeader
        section="clinical"
        eyebrow="Clinical Anaesthesia · FRCA Final · FFICM"
        completed={progress.completed}
        total={progress.total}
        intro={
          <p>
            <strong>Clinical anaesthesia explained.</strong> Subspecialty
            anaesthesia for FRCA Final and FFICM trainees — obstetric, paediatric,
            neuro, cardiothoracic, vascular, regional, day-case and trauma
            anaesthesia, plus airway management and resuscitation. Each topic pairs
            concise clinical notes with diagrams, MCQs and structured viva
            answers.
          </p>
        }
      />

      <section id="topics" className="scroll-mt-28">
        <h2 className="text-lg font-serif font-semibold text-foreground mb-3">
          Curriculum Topics
        </h2>
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

          {/* Cross-listed: lives in Physics but clinically relevant */}
          <div className="pt-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold mb-2">
              Related — cross-listed from other sections
            </p>
            <Link
              to="/physics/depth-of-anaesthesia"
              className="topic-card block group border-dashed"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      Depth of Anaesthesia Monitoring
                    </h3>
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium border bg-physics/10 text-physics border-physics/20">
                      <ExternalLink className="h-2.5 w-2.5" />
                      Lives in Physics
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    BIS, Entropy, Narcotrend — processed EEG, suppression ratio, SEF, and clinical evidence
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
              </div>
            </Link>
          </div>
        </div>
        <SectionReferencesPanel section="clinical" topics={clinicalTopics} />
      </section>

      <section id="summary" className="scroll-mt-28">
        <SectionSummary section="clinical" />
      </section>
    </SectionLayout>
  );
};

export default ClinicalSection;


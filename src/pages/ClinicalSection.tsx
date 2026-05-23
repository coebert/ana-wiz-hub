import { Link } from "react-router-dom";
import { ChevronRight, ExternalLink } from "lucide-react";
import { SectionLayout } from "@/components/SectionLayout";
import { TopicCard } from "@/components/TopicCard";
import { SectionReferencesPanel } from "@/components/SectionReferencesPanel";
import { SectionSummary } from "@/components/SectionSummary";
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
      title="Clinical Anaesthesia Explained"
      subtitle="Subspecialty anaesthesia explained — obstetric, paediatric, neuro, cardiac, regional and trauma anaesthesia for FRCA and FFICM."
      metaDescription="Clinical anaesthesia explained for FRCA and FFICM exams: obstetric, paediatric, neuro, cardiac, regional, day-case and trauma anaesthesia — concise revision notes, diagrams, MCQs and structured viva answers."
      backPath="/revise"
      backLabel="Core Disciplines"
      accentColor="text-clinical"
    >
      <div className="flex items-center gap-3 mb-6 p-4 rounded-lg bg-card border border-border">
        <ProgressRing completed={progress.completed} total={progress.total} size={48} />
        <div>
          <p className="text-sm font-medium text-foreground">{progress.completed} of {progress.total} topics completed</p>
          <p className="text-xs text-muted-foreground">Clinical anaesthesia topics</p>
        </div>
      </div>
      <section className="mb-8 p-5 rounded-lg border border-border bg-card/50">
        <p className="text-sm text-foreground leading-relaxed">
          <strong>Clinical anaesthesia explained.</strong> Subspecialty
          anaesthesia for FRCA Final and FFICM trainees — obstetric, paediatric,
          neuro, cardiothoracic, vascular, regional, day-case and trauma
          anaesthesia, plus airway management and resuscitation. Each topic pairs
          concise clinical notes with diagrams, MCQs and structured viva
          answers.
        </p>
      </section>
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
            className="topic-card section-card-clinical block group border-dashed"
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
      <SectionSummary section="clinical" />
      <SectionReferencesPanel section="clinical" topics={clinicalTopics} />
    </SectionLayout>
  );
};

export default ClinicalSection;

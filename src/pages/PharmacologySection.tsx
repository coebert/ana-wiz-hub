import { SectionLayout } from "@/components/layout/SectionLayout";
import { TopicCard } from "@/components/topic/TopicCard";
import { SectionReferencesPanel } from "@/components/topic/SectionReferencesPanel";
import { SectionSummary } from "@/components/topic/SectionSummary";
import { pharmacologyTopics } from "@/data/curriculum";
import { Badge } from "@/components/ui/badge";
import { ProgressRing } from "@/components/shared/ProgressRing";
import { useProgress } from "@/contexts/ProgressContext";

const PharmacologySection = () => {
  const { getSectionProgress } = useProgress();
  const progress = getSectionProgress("pharmacology");

  return (
    <SectionLayout
      title="Anaesthesia Pharmacology Explained"
      subtitle="Anaesthetic drugs explained — pharmacokinetics, pharmacodynamics, induction agents, opioids, neuromuscular blockers and inhalational agents for FRCA and FFICM."
      metaDescription="Anaesthesia pharmacology explained for FRCA and FFICM exams: pharmacokinetics, pharmacodynamics, induction agents, opioids, neuromuscular blockers, local anaesthetics and inhalational agents — concise notes, diagrams, MCQs and viva practice."
      backPath="/revise"
      backLabel="Core Disciplines"
      accentColor="text-pharmacology"
    >
      <div className="flex items-center gap-3 mb-6 p-4 rounded-lg bg-card border border-border">
        <ProgressRing completed={progress.completed} total={progress.total} size={48} />
        <div>
          <p className="text-sm font-medium text-foreground">{progress.completed} of {progress.total} topics completed</p>
          <p className="text-xs text-muted-foreground">Available pharmacology topics</p>
        </div>
      </div>
      <section className="mb-8 p-5 rounded-lg border border-border bg-card/50">
        <h2 className="sr-only">Introduction</h2>
        <p className="text-sm text-foreground leading-relaxed">
          <strong>Anaesthesia pharmacology explained.</strong> Drug action,
          kinetics and dynamics for the FRCA Primary, Final and FFICM exams —
          induction agents, opioids, neuromuscular blockers, local anaesthetics,
          inhalational agents, vasoactives and antiemetics. Each drug topic pairs
          mechanism, dose and side-effect notes with diagrams, MCQs and
          structured viva answers.
        </p>
      </section>
      <div className="space-y-3">
        {pharmacologyTopics.map((topic) => (
          <div key={topic.id} className="relative">
            {!topic.available && (
              <div className="absolute inset-0 bg-background/50 rounded-lg z-10 flex items-center justify-center">
                <Badge variant="secondary" className="text-xs">Coming soon</Badge>
              </div>
            )}
            <TopicCard
              title={topic.title}
              description={topic.description}
              path={topic.available ? `/pharmacology/${topic.id}` : "#"}
              section="pharmacology"
              topicId={topic.available ? topic.id : undefined}
            />
          </div>
        ))}
      </div>
      <SectionSummary section="pharmacology" />
      <SectionReferencesPanel
        section="pharmacology"
        topics={pharmacologyTopics.filter((t) => t.available)}
      />
    </SectionLayout>
  );
};

export default PharmacologySection;

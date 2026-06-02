import { SectionLayout } from "@/components/SectionLayout";
import { TopicCard } from "@/components/TopicCard";
import { SectionReferencesPanel } from "@/components/SectionReferencesPanel";
import { SectionSummary } from "@/components/SectionSummary";
import { physiologyTopics } from "@/data/curriculum";
import { Badge } from "@/components/ui/badge";
import { ProgressRing } from "@/components/ProgressRing";
import { useProgress } from "@/contexts/ProgressContext";

const PhysiologySection = () => {
  const { getSectionProgress } = useProgress();
  const progress = getSectionProgress("physiology");

  return (
    <SectionLayout
      title="Anaesthesia Physiology Explained"
      subtitle="Applied physiology for anaesthesia and intensive care — cardiovascular, respiratory, renal, neuro and endocrine systems for FRCA and FFICM."
      metaDescription="Anaesthesia physiology explained for FRCA and FFICM: cardiovascular, respiratory, renal, neurological and endocrine systems applied to anaesthesia and intensive care — concise notes, diagrams, MCQs and viva practice."
      backPath="/revise"
      backLabel="Core Disciplines"
      accentColor="text-physiology"
    >
      <div className="flex items-center gap-3 mb-6 p-4 rounded-lg bg-card border border-border">
        <ProgressRing completed={progress.completed} total={progress.total} size={48} />
        <div>
          <p className="text-sm font-medium text-foreground">{progress.completed} of {progress.total} topics completed</p>
          <p className="text-xs text-muted-foreground">Available physiology topics</p>
        </div>
      </div>
      <section className="mb-8 p-5 rounded-lg border border-border bg-card/50">
        <h2 className="sr-only">Introduction</h2>
        <p className="text-sm text-foreground leading-relaxed">
          <strong>Anaesthesia physiology explained.</strong> Applied physiology
          for FRCA Primary, Final and FFICM trainees — cardiovascular, respiratory,
          renal, neurological, endocrine and metabolic systems, framed around how
          anaesthetic drugs, mechanical ventilation and critical illness perturb
          normal function. Each topic pairs concise revision notes with diagrams,
          MCQs and structured viva answers so the physiology is exam-ready.
        </p>
      </section>
      <div className="space-y-3">
        {physiologyTopics.map((topic) => (
          <div key={topic.id} className="relative">
            {!topic.available && (
              <div className="absolute inset-0 bg-background/50 rounded-lg z-10 flex items-center justify-center">
                <Badge variant="secondary" className="text-xs">Coming soon</Badge>
              </div>
            )}
            <TopicCard
              title={topic.title}
              description={topic.description}
              path={topic.available ? `/physiology/${topic.id}` : "#"}
              section="physiology"
              topicId={topic.available ? topic.id : undefined}
            />
          </div>
        ))}
      </div>
      <SectionSummary section="physiology" />
      <SectionReferencesPanel
        section="physiology"
        topics={physiologyTopics.filter((t) => t.available)}
      />
    </SectionLayout>
  );
};

export default PhysiologySection;

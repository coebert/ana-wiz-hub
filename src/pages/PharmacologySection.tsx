import { SectionLayout } from "@/components/layout/SectionLayout";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { SectionSubNav } from "@/components/layout/SectionSubNav";
import { TopicCard } from "@/components/topic/TopicCard";
import { SectionReferencesPanel } from "@/components/topic/SectionReferencesPanel";
import { SectionSummary } from "@/components/topic/SectionSummary";
import { pharmacologyTopics } from "@/data/curriculum";
import { Badge } from "@/components/ui/badge";
import { useProgress } from "@/contexts/ProgressContext";

const PharmacologySection = () => {
  const { getSectionProgress } = useProgress();
  const progress = getSectionProgress("pharmacology");

  return (
    <SectionLayout
      title="Anaesthesia Pharmacology Explained"
      subtitle="Anaesthetic drugs explained — pharmacokinetics, pharmacodynamics, induction agents, opioids, neuromuscular blockers and inhalational agents for FRCA and FFICM."
      metaDescription="Anaesthesia pharmacology for FRCA and FFICM: PK/PD, induction agents, opioids, NMBs, local and inhalational agents — concise notes and MCQs."
      backPath="/revise"
      backLabel="Core Disciplines"
      accentColor="text-pharmacology"
      disableAutoTOC
    >
      <SectionSubNav />
      <SectionHeader
        section="pharmacology"
        eyebrow="Pharmacology · FRCA · FFICM"
        completed={progress.completed}
        total={progress.total}
        intro={
          <p>
            <strong>Anaesthesia pharmacology explained.</strong> Drug action,
            kinetics and dynamics for the FRCA Primary, Final and FFICM exams —
            induction agents, opioids, neuromuscular blockers, local anaesthetics,
            inhalational agents, vasoactives and antiemetics. Each drug topic pairs
            mechanism, dose and side-effect notes with diagrams, MCQs and
            structured viva answers.
          </p>
        }
      />

      <section id="topics" className="scroll-mt-28">
        <h2 className="text-lg font-serif font-semibold text-foreground mb-3">
          Curriculum Topics
        </h2>
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
        <SectionReferencesPanel
          section="pharmacology"
          topics={pharmacologyTopics.filter((t) => t.available)}
        />
      </section>

      <section id="summary" className="scroll-mt-28">
        <SectionSummary section="pharmacology" />
      </section>
    </SectionLayout>
  );
};

export default PharmacologySection;

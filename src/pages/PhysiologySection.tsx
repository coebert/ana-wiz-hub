import { SectionLayout } from "@/components/layout/SectionLayout";
import { CaseBankCallout } from "@/components/cases/CaseBankCallout";
import { physiologyCaseBank } from "@/data/cases/physiologyCases";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { SectionSubNav } from "@/components/layout/SectionSubNav";
import { TopicCard } from "@/components/topic/TopicCard";
import { SectionReferencesPanel } from "@/components/topic/SectionReferencesPanel";
import { SectionSummary } from "@/components/topic/SectionSummary";
import { physiologyTopics } from "@/data/curriculum";
import { Badge } from "@/components/ui/badge";
import { useProgress } from "@/contexts/ProgressContext";

const PhysiologySection = () => {
  const { getSectionProgress } = useProgress();
  const progress = getSectionProgress("physiology");

  return (
    <SectionLayout
      title="Anaesthesia Physiology Explained"
      subtitle="Applied physiology for anaesthesia and intensive care — cardiovascular, respiratory, renal, neuro and endocrine systems for FRCA and FFICM."
      metaDescription="Anaesthesia physiology for FRCA and FFICM: cardiovascular, respiratory, renal, neuro and endocrine systems — concise notes, diagrams and MCQs."
      backPath="/revise"
      backLabel="Core Disciplines"
      accentColor="text-physiology"
      disableAutoTOC
    >
      <SectionSubNav />
      <SectionHeader
        section="physiology"
        eyebrow="Physiology · FRCA · FFICM"
        completed={progress.completed}
        total={progress.total}
        intro={
          <p>
            <strong>Anaesthesia physiology explained.</strong> Applied physiology
            for FRCA Primary, Final and FFICM trainees — cardiovascular, respiratory,
            renal, neurological, endocrine and metabolic systems, framed around how
            anaesthetic drugs, mechanical ventilation and critical illness perturb
            normal function. Each topic pairs concise revision notes with diagrams,
            MCQs and structured viva answers so the physiology is exam-ready.
          </p>
        }
      />

      <CaseBankCallout bank={physiologyCaseBank} />

      <section id="topics" className="scroll-mt-28">
        <h2 className="text-lg font-serif font-semibold text-foreground mb-3">
          Curriculum Topics
        </h2>
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
        <SectionReferencesPanel
          section="physiology"
          topics={physiologyTopics.filter((t) => t.available)}
        />
      </section>

      <section id="summary" className="scroll-mt-28">
        <SectionSummary section="physiology" />
      </section>
    </SectionLayout>
  );
};

export default PhysiologySection;


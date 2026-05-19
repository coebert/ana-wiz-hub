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
      title="Physiology"
      subtitle="Applied physiology for the anaesthetist"
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
    </SectionLayout>
  );
};

export default PhysiologySection;

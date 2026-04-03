import { SectionLayout } from "@/components/SectionLayout";
import { TopicCard } from "@/components/TopicCard";
import { physicsTopics } from "@/data/curriculum";
import { Badge } from "@/components/ui/badge";
import { ProgressRing } from "@/components/ProgressRing";
import { useProgress } from "@/contexts/ProgressContext";

const PhysicsSection = () => {
  const { getSectionProgress } = useProgress();
  const progress = getSectionProgress("physics");

  return (
    <SectionLayout
      title="Physics"
      subtitle="Physical principles applied to anaesthetic equipment and monitoring"
      backPath="/"
      backLabel="Home"
      accentColor="text-physics"
    >
      <div className="flex items-center gap-3 mb-6 p-4 rounded-lg bg-card border border-border">
        <ProgressRing completed={progress.completed} total={progress.total} size={48} />
        <div>
          <p className="text-sm font-medium text-foreground">{progress.completed} of {progress.total} topics completed</p>
          <p className="text-xs text-muted-foreground">Available physics topics</p>
        </div>
      </div>
      <div className="space-y-3">
        {physicsTopics.map((topic) => (
          <div key={topic.id} className="relative">
            {!topic.available && (
              <div className="absolute inset-0 bg-background/50 rounded-lg z-10 flex items-center justify-center">
                <Badge variant="secondary" className="text-xs">Coming soon</Badge>
              </div>
            )}
            <TopicCard
              title={topic.title}
              description={topic.description}
              path={topic.available ? `/physics/${topic.id}` : "#"}
              section="physics"
              topicId={topic.available ? topic.id : undefined}
            />
          </div>
        ))}
      </div>
    </SectionLayout>
  );
};

export default PhysicsSection;

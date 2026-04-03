import { SectionLayout } from "@/components/SectionLayout";
import { TopicCard } from "@/components/TopicCard";
import { physicsTopics } from "@/data/curriculum";
import { Badge } from "@/components/ui/badge";

const PhysicsSection = () => {
  return (
    <SectionLayout
      title="Physics"
      subtitle="Physical principles applied to anaesthetic equipment and monitoring"
      backPath="/"
      backLabel="Home"
      accentColor="text-physics"
    >
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
            />
          </div>
        ))}
      </div>
    </SectionLayout>
  );
};

export default PhysicsSection;

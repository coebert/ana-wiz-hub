import { SectionLayout } from "@/components/SectionLayout";
import { TopicCard } from "@/components/TopicCard";
import { physiologyTopics } from "@/data/curriculum";
import { Badge } from "@/components/ui/badge";

const PhysiologySection = () => {
  return (
    <SectionLayout
      title="Physiology"
      subtitle="Applied physiology for the anaesthetist"
      backPath="/"
      backLabel="Home"
      accentColor="text-physiology"
    >
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
            />
          </div>
        ))}
      </div>
    </SectionLayout>
  );
};

export default PhysiologySection;

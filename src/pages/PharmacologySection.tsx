import { SectionLayout } from "@/components/SectionLayout";
import { TopicCard } from "@/components/TopicCard";
import { pharmacologyTopics } from "@/data/curriculum";
import { Badge } from "@/components/ui/badge";

const PharmacologySection = () => {
  return (
    <SectionLayout
      title="Pharmacology"
      subtitle="Drug action, kinetics and dynamics relevant to anaesthesia"
      backPath="/"
      backLabel="Home"
      accentColor="text-pharmacology"
    >
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
            />
          </div>
        ))}
      </div>
    </SectionLayout>
  );
};

export default PharmacologySection;

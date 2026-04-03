import { SectionLayout } from "@/components/SectionLayout";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";

const IcuSedationDeliriumTopic = () => {
  return (
    <SectionLayout title="ICU Sedation & Delirium" subtitle="FRCA / FFICM — Intensive Care" backPath="/intensive-care" backLabel="Intensive Care" accentColor="text-icu">
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Coming Soon</h2>
          <p className="text-muted-foreground leading-relaxed">
            This topic is being developed with comprehensive content, interactive diagrams, and exam-style MCQs. Check back soon.
          </p>
        </div>
      </section>
      <TopicCompletionToggle topicId="icu-sedation-delirium" topicTitle="ICU Sedation & Delirium" />
    </SectionLayout>
  );
};

export default IcuSedationDeliriumTopic;

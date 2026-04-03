import { SectionLayout } from "@/components/SectionLayout";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";

const EnhancedRecoveryTopic = () => {
  return (
    <SectionLayout title="Enhanced Recovery (ERAS)" subtitle="FRCA / FFICM — Perioperative Medicine" backPath="/perioperative" backLabel="Perioperative Medicine" accentColor="text-perioperative">
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Coming Soon</h2>
          <p className="text-muted-foreground leading-relaxed">
            This topic is being developed with comprehensive content, interactive diagrams, and exam-style MCQs. Check back soon.
          </p>
        </div>
      </section>
      <TopicCompletionToggle topicId="enhanced-recovery" topicTitle="Enhanced Recovery (ERAS)" />
    </SectionLayout>
  );
};

export default EnhancedRecoveryTopic;

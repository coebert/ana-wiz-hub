import { SectionLayout } from "@/components/SectionLayout";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";

const NeuroanaesthesiaTopic = () => {
  return (
    <SectionLayout title="Neuroanaesthesia" subtitle="FRCA / FFICM — Clinical Anaesthesia" backPath="/clinical" backLabel="Clinical Anaesthesia" accentColor="text-clinical">
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Coming Soon</h2>
          <p className="text-muted-foreground leading-relaxed">
            This topic is being developed with comprehensive content, interactive diagrams, and exam-style MCQs. Check back soon.
          </p>
        </div>
      </section>
      <TopicCompletionToggle topicId="neuroanaesthesia" topicTitle="Neuroanaesthesia" />
    </SectionLayout>
  );
};

export default NeuroanaesthesiaTopic;

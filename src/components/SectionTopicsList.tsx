import { TopicCard } from "@/components/TopicCard";
import { SectionReferencesPanel } from "@/components/SectionReferencesPanel";
import { useReferenceCounts } from "@/hooks/useReferenceCounts";
import { Section, Topic, sectionMeta } from "@/data/curriculum";

interface Props {
  section: Section;
  topics: Topic[];
  /** Render after the topic cards but before the references panel. */
  trailing?: React.ReactNode;
}

/**
 * Renders a section's topic cards (with reference-count badges) and the
 * aggregated references panel underneath. Each section page passes its
 * already-filtered visible topics; the full topic list is used for the
 * panel so users can see references for topics outside their current
 * exam filter.
 */
export const SectionTopicsList = ({ section, topics, trailing }: Props) => {
  const { data: counts } = useReferenceCounts(topics.map((t) => t.id));
  const basePath = sectionMeta[section].path;

  return (
    <>
      <div className="space-y-3">
        {topics.map((topic) => (
          <TopicCard
            key={topic.id}
            title={topic.title}
            description={topic.description}
            path={`${basePath}/${topic.id}`}
            section={section}
            topicId={topic.id}
            examTags={topic.examTags}
            referenceCount={counts?.[topic.id]}
          />
        ))}
        {trailing}
      </div>
      <SectionReferencesPanel section={section} topics={topics} />
    </>
  );
};

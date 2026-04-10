import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { seeAlsoMap } from "@/data/seeAlso";
import { allTopics, sectionMeta } from "@/data/curriculum";

interface SeeAlsoProps {
  topicId: string;
}

export const SeeAlso = ({ topicId }: SeeAlsoProps) => {
  const relatedIds = seeAlsoMap[topicId];
  if (!relatedIds || relatedIds.length === 0) return null;

  const relatedTopics = relatedIds
    .map((id) => allTopics.find((t) => t.id === id))
    .filter(Boolean);

  if (relatedTopics.length === 0) return null;

  return (
    <div className="mt-8 mb-2 rounded-lg border border-border bg-card p-4">
      <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
        <ArrowRight className="h-4 w-4 text-primary" />
        See Also
      </h3>
      <div className="flex flex-wrap gap-2">
        {relatedTopics.map((topic) => {
          if (!topic) return null;
          const section = sectionMeta[topic.section];
          return (
            <Link
              key={topic.id}
              to={`${section.path}/${topic.id}`}
              className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-border bg-secondary/50 text-foreground hover:bg-primary/10 hover:border-primary/30 transition-colors"
            >
              <span className="font-medium">{topic.title}</span>
              <span className="text-muted-foreground">· {section.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

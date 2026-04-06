import { ExternalLink, BookOpen } from "lucide-react";
import { topicReferences, Reference } from "@/data/references";

interface ReferencesListProps {
  topicId: string;
}

export const ReferencesList = ({ topicId }: ReferencesListProps) => {
  const refs = topicReferences[topicId];
  if (!refs || refs.length === 0) return null;

  return (
    <div className="mt-8 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <BookOpen className="h-4 w-4 text-muted-foreground" />
        <h3 className="text-sm font-semibold text-foreground">References &amp; Further Reading</h3>
      </div>
      <ol className="space-y-2 list-decimal list-inside">
        {refs.map((ref, i) => (
          <li key={i} className="text-xs text-muted-foreground leading-relaxed">
            <span className="font-medium text-foreground">{ref.label}</span>
            {" — "}
            {ref.citation}
            {ref.url && (
              <a
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-0.5 ml-1 text-primary hover:underline"
              >
                <ExternalLink className="h-3 w-3" />
                <span>Link</span>
              </a>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

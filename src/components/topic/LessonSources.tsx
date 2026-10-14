import { topicReferences } from "@/data/references";

interface Source {
  topicId: string;
  label: string;
}

/**
 * Lists the curated references a lesson cites, resolved from the topic's
 * reference list so the citation text is never re-typed or invented.
 */
export function LessonSources({ topicId, labels, extra = [] }: { topicId: string; labels: string[]; extra?: Source[] }) {
  const items = [...labels.map((label) => ({ topicId, label })), ...extra].map((s) => ({
    ...s,
    ref: (topicReferences[s.topicId] ?? []).find((r) => r.label === s.label),
  }));
  return (
    <div className="rounded-lg border border-border bg-muted/30 p-4 mt-4">
      <p className="text-sm font-semibold text-foreground mb-2">Sources for this lesson</p>
      <ol className="list-decimal pl-5 space-y-1 text-xs text-muted-foreground">
        {items.map(({ label, ref }) => (
          <li key={label}>
            {ref ? (
              <>
                {ref.citation}{" "}
                {ref.url && (
                  <a href={ref.url} target="_blank" rel="noopener noreferrer" className="text-primary underline break-all">
                    {ref.url.replace(/^https?:\/\//, "")}
                  </a>
                )}
              </>
            ) : (
              <span className="text-destructive">Reference “{label}” is missing from the topic list.</span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

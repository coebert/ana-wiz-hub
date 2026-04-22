import { ExternalLink, BookOpen } from "lucide-react";
import { topicReferences, Reference } from "@/data/references";

interface SectionReferencesProps {
  /** Topic ID — used to look up the reference list in `topicReferences`. */
  topicId: string;
  /**
   * Reference labels (must match `Reference.label` in `src/data/references.ts`)
   * that support this section. Unknown labels are silently ignored so a typo
   * never breaks the page; a dev-only warning is logged.
   */
  refLabels: string[];
  /** Optional heading shown above the panel (e.g. "Sources for this section"). */
  heading?: string;
  /** Compact rendering for use under diagrams / objectives. */
  dense?: boolean;
}

/**
 * In-page references panel scoped to a single section, learning objective
 * group, or diagram block. Use alongside (not instead of) the topic-wide
 * `<ReferencesList>` so learners can see exactly which BJA Education /
 * guideline / textbook sources support each piece of content.
 */
export const SectionReferences = ({
  topicId,
  refLabels,
  heading = "Sources for this section",
  dense = false,
}: SectionReferencesProps) => {
  const all = topicReferences[topicId] ?? [];
  const matched: Reference[] = [];
  const missing: string[] = [];

  for (const label of refLabels) {
    const found = all.find((r) => r.label === label);
    if (found) matched.push(found);
    else missing.push(label);
  }

  if (import.meta.env.DEV && missing.length > 0) {
    // eslint-disable-next-line no-console
    console.warn(
      `[SectionReferences] Unknown ref labels for topic "${topicId}":`,
      missing,
    );
  }

  if (matched.length === 0) return null;

  return (
    <aside
      className={`rounded-lg border border-border/70 bg-muted/30 ${
        dense ? "p-3" : "p-4"
      } mt-3`}
      aria-label={heading}
    >
      <div className="flex items-center gap-1.5 mb-2">
        <BookOpen className="h-3.5 w-3.5 text-muted-foreground" />
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          {heading}
        </p>
      </div>
      <ul className={`space-y-1.5 ${dense ? "text-[11px]" : "text-xs"} leading-relaxed`}>
        {matched.map((ref) => (
          <li key={ref.label} className="text-muted-foreground">
            {ref.url ? (
              <a
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                <span className="font-medium text-primary">{ref.label}</span>
                {" — "}
                <span>{ref.citation}</span>
                <ExternalLink className="inline h-3 w-3 ml-1 text-primary/60" />
              </a>
            ) : (
              <>
                <span className="font-medium text-foreground">{ref.label}</span>
                {" — "}
                {ref.citation}
              </>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SectionReferences;

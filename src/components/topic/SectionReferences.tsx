import { useState } from "react";
import { ExternalLink, BookOpen, ArrowUpRight, ChevronRight } from "lucide-react";
import { topicReferences, Reference } from "@/data/references";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";

interface SectionReferencesProps {
  topicId: string;
  refLabels: string[];
  heading?: string;
  dense?: boolean;
  targetId?: string;
  targetLabel?: string;
}

export const SectionReferences = ({
  topicId,
  refLabels,
  heading = "Sources for this section",
  dense = false,
  targetId,
  targetLabel = "Jump to section",
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
    console.warn(
      `[SectionReferences] Unknown ref labels for topic "${topicId}":`,
      missing,
    );
  }

  const [open, setOpen] = useState(false);

  if (matched.length === 0) return null;

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className={`rounded-lg border border-border/70 bg-muted/30 ${dense ? "p-3" : "p-4"} mt-3`}
      aria-label={heading}
      asChild
    >
      <aside>
        <div className="flex items-center justify-between gap-2">
          <CollapsibleTrigger className="flex items-center gap-1.5 flex-1 text-left group">
            <ChevronRight
              className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${open ? "rotate-90" : ""}`}
            />
            <BookOpen className="h-3.5 w-3.5 text-muted-foreground" />
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              {heading}
            </p>
            <span className="text-[11px] text-muted-foreground ml-1">({matched.length})</span>
          </CollapsibleTrigger>
          {targetId && (
            <a
              href={`#${targetId}`}
              className="inline-flex items-center gap-0.5 text-[11px] font-medium text-primary hover:underline"
              aria-label={targetLabel}
            >
              {targetLabel}
              <ArrowUpRight className="h-3 w-3" />
            </a>
          )}
        </div>
        <CollapsibleContent>
          <ul className={`space-y-1.5 mt-2 ${dense ? "text-[11px]" : "text-xs"} leading-relaxed`}>
            {matched.map((ref) => (
              <li key={ref.label} className="text-muted-foreground flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <span className="font-medium text-foreground">{ref.label}</span>
                  {" — "}
                  {ref.url || ref.pmid ? (
                    <a
                      href={ref.pmid ? `https://pubmed.ncbi.nlm.nih.gov/${ref.pmid}/` : ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      <span>{ref.citation}</span>
                      <ExternalLink className="inline h-3 w-3 ml-1 text-primary/60" />
                    </a>
                  ) : (
                    <span>{ref.citation}</span>
                  )}
                  {(ref.pmid || ref.url) && (
                    <span className="inline-flex items-center gap-1 ml-1.5 align-middle">
                      {ref.pmid && (
                        <a
                          href={`https://pubmed.ncbi.nlm.nih.gov/${ref.pmid}/`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-0.5 rounded px-1 py-0.5 text-[10px] font-semibold text-background hover:opacity-90 transition-opacity"
                          style={{ backgroundColor: "hsl(210 75% 42%)" }}
                        >
                          PubMed <ExternalLink className="h-2.5 w-2.5" />
                        </a>
                      )}
                      {ref.url && (
                        <a
                          href={ref.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-0.5 rounded px-1 py-0.5 text-[10px] font-semibold text-background hover:opacity-90 transition-opacity"
                          style={{ backgroundColor: "hsl(160 55% 35%)" }}
                        >
                          DOI <ExternalLink className="h-2.5 w-2.5" />
                        </a>
                      )}
                    </span>
                  )}
                  {ref.excerpt && (
                    <blockquote className="mt-1 border-l-2 border-primary/40 bg-background/60 pl-2 pr-1.5 py-1 italic text-foreground/75 rounded-r text-[11px] leading-snug">
                      “{ref.excerpt}”
                    </blockquote>
                  )}
                </div>
                {targetId && (
                  <a
                    href={`#${targetId}`}
                    className="shrink-0 inline-flex items-center gap-0.5 text-[10px] font-medium text-primary/80 hover:text-primary hover:underline"
                    aria-label={`${targetLabel} — supports ${ref.label}`}
                    title={targetLabel}
                  >
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                )}
              </li>
            ))}
          </ul>
        </CollapsibleContent>
      </aside>
    </Collapsible>
  );
};

export default SectionReferences;

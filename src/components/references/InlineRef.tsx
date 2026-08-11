import { ExternalLink } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { topicReferences } from "@/data/references";

interface InlineRefProps {
  /** Topic ID matching key in topicReferences */
  topicId: string;
  /** The reference label to look up (must match an entry in references.ts) */
  refLabel: string;
  /** Optional override label to display in the marker (defaults to numeric index in topic) */
  marker?: string;
  /** Optional context heading shown above the key points (e.g., blade name) */
  contextTitle?: string;
  /** Optional list of key learning points shown inside the popover beneath the citation */
  keyPoints?: string[];
  /** Optional accent colour (HSL string) applied to the context title and bullet markers */
  accentColor?: string;
}

/**
 * Inline citation marker — BJA Education-style superscript.
 * Click opens a popover with the full citation, link out to DOI/source,
 * and (optionally) the contextual key learning points for the surrounding topic.
 *
 * Usage:
 *   <InlineRef topicId="enhanced-recovery" refLabel="RELIEF 2018" />
 *   <InlineRef topicId="equipment-monitoring" refLabel="DAS 2015"
 *              contextTitle="Macintosh — key points"
 *              keyPoints={info.keyPoints} accentColor={info.color} />
 */
export const InlineRef = ({
  topicId,
  refLabel,
  marker,
  contextTitle,
  keyPoints,
  accentColor,
}: InlineRefProps) => {
  const refs = topicReferences[topicId] ?? [];
  const idx = refs.findIndex((r) => r.label === refLabel);
  const ref = idx >= 0 ? refs[idx] : null;

  const display = marker ?? (idx >= 0 ? String(idx + 1) : "?");

  if (!ref) {
    return (
      <sup className="text-[0.65rem] font-semibold text-muted-foreground/60 ml-0.5">
        [{display}]
      </sup>
    );
  }

  const hasKeyPoints = keyPoints && keyPoints.length > 0;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={`Reference ${display}: ${ref.label}`}
          className="align-super text-[0.65rem] font-semibold text-perioperative hover:text-perioperative/80 hover:underline ml-0.5 cursor-pointer focus:outline-none focus:ring-1 focus:ring-perioperative rounded px-0.5"
        >
          [{display}]
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-96 max-w-[92vw] text-xs leading-relaxed max-h-[70vh] overflow-y-auto" side="top">
        <p className="font-semibold text-foreground mb-1">{ref.label}</p>
        <p className="text-muted-foreground mb-2">{ref.citation}</p>
        {ref.excerpt && (
          <blockquote
            className="mb-2 border-l-2 border-perioperative/60 bg-muted/40 pl-2.5 pr-2 py-1.5 italic text-foreground/80 rounded-r"
            aria-label="Verbatim source excerpt"
          >
            <span className="not-italic text-[10px] font-semibold uppercase tracking-wide text-muted-foreground block mb-0.5">
              From the source
            </span>
            “{ref.excerpt}”
          </blockquote>
        )}
        {(ref.pmid || ref.url) && (
          <div className="flex flex-wrap items-center gap-2">
            {ref.pmid && (
              <a
                href={`https://pubmed.ncbi.nlm.nih.gov/${ref.pmid}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[11px] font-semibold text-background hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "hsl(210 75% 42%)" }}
              >
                PubMed <ExternalLink className="h-3 w-3" />
              </a>
            )}
            {ref.url && (
              <a
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[11px] font-semibold text-background hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "hsl(160 55% 35%)" }}
              >
                DOI <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
        )}

        {hasKeyPoints && (
          <div className="mt-3 pt-3 border-t border-border">
            {contextTitle && (
              <p
                className="font-semibold mb-1.5 text-[11px] uppercase tracking-wide"
                style={accentColor ? { color: accentColor } : undefined}
              >
                {contextTitle}
              </p>
            )}
            <ul className="space-y-1 text-muted-foreground">
              {keyPoints!.map((kp, i) => (
                <li key={i} className="flex gap-1.5">
                  <span
                    className="flex-shrink-0 mt-1 inline-block w-1 h-1 rounded-full"
                    style={{ backgroundColor: accentColor ?? "currentColor" }}
                  />
                  <span className="leading-snug">{kp}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default InlineRef;

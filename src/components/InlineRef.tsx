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
}

/**
 * Inline citation marker — BJA Education-style superscript.
 * Click opens a popover with the full citation and link out to DOI/source.
 *
 * Usage:
 *   <InlineRef topicId="enhanced-recovery" refLabel="RELIEF 2018" />
 */
export const InlineRef = ({ topicId, refLabel, marker }: InlineRefProps) => {
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
      <PopoverContent className="w-80 text-xs leading-relaxed" side="top">
        <p className="font-semibold text-foreground mb-1">{ref.label}</p>
        <p className="text-muted-foreground mb-2">{ref.citation}</p>
        {ref.url && (
          <a
            href={ref.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-perioperative hover:underline font-medium"
          >
            Open source <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default InlineRef;

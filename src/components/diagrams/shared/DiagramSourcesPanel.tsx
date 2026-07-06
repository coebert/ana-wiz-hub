import { useState } from "react";
import { BookOpen, ExternalLink, ImageIcon, ChevronRight } from "lucide-react";
import { DiagramFigure } from "../_shared/DiagramFigure";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";

export interface DiagramSource {
  label: string;
  detail?: string;
  url?: string;
}

interface DiagramSourcesPanelProps {
  references: DiagramSource[];
  imageCredit: string;
  note?: string;
}

export const DiagramSourcesPanel = ({ references, imageCredit, note }: DiagramSourcesPanelProps) => {
  const [open, setOpen] = useState(false);
  return (
    <DiagramFigure
      id="diagram-sources-panel"
      title="Diagram sources panel"
      description="Auto-generated wrapper for the Diagram sources panel anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
      <Collapsible
        open={open}
        onOpenChange={setOpen}
        className="border-t border-border bg-muted/20 px-4 sm:px-6 py-3"
      >
        <CollapsibleTrigger className="w-full flex items-center gap-2 text-left">
          <ChevronRight
            className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${open ? "rotate-90" : ""}`}
          />
          <BookOpen className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
          <p className="text-sm font-semibold text-foreground">Sources & references</p>
          <span className="text-xs text-muted-foreground ml-1">({references.length})</span>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3 pt-3">
          <ul className="space-y-1.5">
            {references.map((r) => (
              <li key={r.label} className="text-xs text-muted-foreground leading-relaxed">
                {r.url ? (
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-baseline gap-1 text-foreground underline underline-offset-2 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                  >
                    <span>{r.label}</span>
                    <ExternalLink className="w-3 h-3 shrink-0 self-center" aria-hidden="true" />
                  </a>
                ) : (
                  <span className="font-medium text-foreground">{r.label}</span>
                )}
                {r.detail && <span> — {r.detail}</span>}
              </li>
            ))}
          </ul>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <ImageIcon className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
              <p className="text-sm font-semibold text-foreground">Image credit</p>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{imageCredit}</p>
          </div>

          {note && <p className="text-[11px] text-muted-foreground/80 italic">{note}</p>}
        </CollapsibleContent>
      </Collapsible>
    </DiagramFigure>
  );
};

export default DiagramSourcesPanel;

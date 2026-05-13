import { BookOpen, ExternalLink, ImageIcon } from "lucide-react";

export interface DiagramSource {
  label: string;
  detail?: string;
  url?: string;
}

interface DiagramSourcesPanelProps {
  /** Anatomical / textbook references used to label the plate */
  references: DiagramSource[];
  /** Image credit (illustrator, photographer, AI generator, etc.) */
  imageCredit: string;
  /** Optional extra note (e.g. "Educational use only") */
  note?: string;
}

/**
 * Footer panel shown beneath an anatomical diagram listing the reference
 * texts that informed the labelled anatomy and the image credit.
 */
export const DiagramSourcesPanel = ({ references, imageCredit, note }: DiagramSourcesPanelProps) => {
  return (
            <div className="border-t border-border bg-muted/20 px-4 sm:px-6 py-4 space-y-3">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
          <p className="text-sm font-semibold text-foreground">Sources & references</p>
        </div>
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
      </div>

      <div>
        <div className="flex items-center gap-2 mb-1">
          <ImageIcon className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
          <p className="text-sm font-semibold text-foreground">Image credit</p>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">{imageCredit}</p>
      </div>

      {note && (
        <p className="text-[11px] text-muted-foreground/80 italic">{note}</p>
      )}
    </div>
  );
};

export default DiagramSourcesPanel;

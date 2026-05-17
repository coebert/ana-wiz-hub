import { useState } from "react";
import { ExternalLink, BookOpen, ChevronRight } from "lucide-react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";

export interface GuidelineSource {
  label: string;
  url: string;
  detail?: string;
}

interface GuidelineSourcesProps {
  sources: GuidelineSource[];
  title?: string;
  className?: string;
}

const GuidelineSources = ({ sources, title = "Guideline sources", className = "" }: GuidelineSourcesProps) => {
  const [open, setOpen] = useState(false);
  if (!sources?.length) return null;
  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className={`mt-4 p-3 rounded-lg border border-border bg-muted/30 ${className}`}
    >
      <CollapsibleTrigger className="w-full flex items-center gap-2 text-left">
        <ChevronRight
          className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${open ? "rotate-90" : ""}`}
        />
        <BookOpen className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {title}
        </p>
        <span className="text-[11px] text-muted-foreground ml-1">({sources.length})</span>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ul className="flex flex-wrap gap-1.5 mt-2">
          {sources.map((s) => (
            <li key={s.url}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                title={s.detail ?? s.label}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-card border border-border text-[11px] text-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors"
              >
                <span>{s.label}</span>
                <ExternalLink className="h-3 w-3 opacity-60" aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default GuidelineSources;

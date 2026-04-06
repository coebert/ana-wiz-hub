import { ExternalLink, BookOpen, ChevronRight } from "lucide-react";
import { topicReferences, Reference } from "@/data/references";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { useState } from "react";

interface ReferencesListProps {
  topicId: string;
}

export const ReferencesList = ({ topicId }: ReferencesListProps) => {
  const refs = topicReferences[topicId];
  const [open, setOpen] = useState(false);
  if (!refs || refs.length === 0) return null;

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="mt-8 mb-6">
      <CollapsibleTrigger className="flex items-center gap-2 group cursor-pointer w-full">
        <ChevronRight className={`h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 ${open ? "rotate-90" : ""}`} />
        <BookOpen className="h-4 w-4 text-muted-foreground" />
        <h3 className="text-sm font-semibold text-foreground">References &amp; Further Reading</h3>
        <span className="text-xs text-muted-foreground ml-1">({refs.length})</span>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-3">
        <ol className="space-y-2 list-decimal list-inside pl-5">
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
      </CollapsibleContent>
    </Collapsible>
  );
};
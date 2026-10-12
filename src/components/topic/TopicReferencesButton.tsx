import { useState } from "react";
import { BookOpen, ExternalLink } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { topicReferences } from "@/data/references";

interface TopicReferencesButtonProps {
  topicId: string;
  topicTitle: string;
  section: string;
  /** Visual variant — default = full button in topic header, compact = icon-only inline */
  variant?: "default" | "compact";
}

/**
 * Shows the curated reference list authored alongside the topic content
 * (src/data/references.ts). References are never generated on request —
 * the content is written from these sources, not the other way round.
 */
export const TopicReferencesButton = ({
  topicId,
  topicTitle,
  variant = "default",
}: TopicReferencesButtonProps) => {
  const [open, setOpen] = useState(false);
  const refs = topicReferences[topicId] ?? [];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant={variant === "compact" ? "ghost" : "outline"}
          size="sm"
          className="gap-1.5"
          aria-label={`References for ${topicTitle}`}
        >
          <BookOpen className="h-4 w-4" />
          References
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl">References</SheetTitle>
          <SheetDescription>
            Sources used to write <span className="font-medium">{topicTitle}</span>.
            Each is cited in the text where it supports a claim.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6">
          {refs.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No curated references have been attached to this topic yet.
            </p>
          ) : (
            <ol className="space-y-3 list-decimal pl-5 text-sm text-foreground">
              {refs.map((r, i) => {
                const href = r.pmid
                  ? `https://pubmed.ncbi.nlm.nih.gov/${r.pmid}/`
                  : r.url;
                return (
                  <li key={i} className="leading-relaxed">
                    <span>{r.citation}</span>
                    {href && (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-1.5 inline-flex items-center gap-0.5 align-baseline text-primary hover:underline text-xs font-medium"
                      >
                        <ExternalLink className="h-3 w-3" />
                        {r.pmid ? "PubMed" : "Link"}
                      </a>
                    )}
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

import { ExternalLink, BookOpen, ChevronRight } from "lucide-react";
import { topicReferences, Reference } from "@/data/references";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { useEffect, useState } from "react";

interface ReferencesListProps {
  topicId: string;
}

export const ReferencesList = ({ topicId }: ReferencesListProps) => {
  const refs = topicReferences[topicId];
  const [open, setOpen] = useState(false);

  // Auto-expand and scroll into view if the URL hash points at a reference
  // (e.g. when a footnote chip on an animated diagram is clicked).
  useEffect(() => {
    if (!refs) return;
    const tryOpenFromHash = () => {
      const hash = window.location.hash.replace(/^#/, "");
      if (!hash) return;
      if (hash === "references" || hash.startsWith("ref-")) {
        setOpen(true);
        // Re-scroll AFTER the collapsible renders the content.
        requestAnimationFrame(() => {
          const el = document.getElementById(hash);
          el?.scrollIntoView({ behavior: "smooth", block: "center" });
        });
      }
    };
    tryOpenFromHash();
    window.addEventListener("hashchange", tryOpenFromHash);
    return () => window.removeEventListener("hashchange", tryOpenFromHash);
  }, [refs]);

  if (!refs || refs.length === 0) return null;

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="mt-8 mb-6" id="references">
      <CollapsibleTrigger className="flex items-center gap-2 group cursor-pointer w-full">
        <ChevronRight className={`h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 ${open ? "rotate-90" : ""}`} />
        <BookOpen className="h-4 w-4 text-muted-foreground" />
        <h3 className="text-sm font-semibold text-foreground">References &amp; Further Reading</h3>
        <span className="text-xs text-muted-foreground ml-1">({refs.length})</span>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-3">
        <ol className="space-y-2 list-decimal list-inside pl-5">
          {refs.map((ref, i) => {
            const slug = ref.label
              .toLowerCase()
              .trim()
              .replace(/[^\w\s-]/g, "")
              .replace(/\s+/g, "-")
              .replace(/-+/g, "-");
            return (
              <li
                key={i}
                id={`ref-${slug}`}
                className="text-xs text-muted-foreground leading-relaxed scroll-mt-24 target:bg-primary/5 target:rounded target:px-1"
              >
                {ref.url ? (
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/ref hover:underline"
                  >
                    <span className="font-medium text-primary">{ref.label}</span>
                    {" — "}
                    <span className="text-muted-foreground group-hover/ref:text-primary/80">{ref.citation}</span>
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
            );
          })}
        </ol>
      </CollapsibleContent>
    </Collapsible>
  );
};
import { ChevronRight } from "lucide-react";
import { ReactNode, useEffect, useRef, useState } from "react";
import { sectionAnchorId } from "@/lib/sectionAnchor";

interface CollapsibleSubsectionProps {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}

/**
 * Collapsible subsection wrapper for long topic pages.
 * Uses native <details> so it works without JS, respects reduce-motion,
 * and keeps printable/searchable semantics. Defaults to collapsed.
 *
 * Each subsection exposes a stable anchor id derived from its title
 * (e.g. "Inguinal Canal" -> "section-inguinal-canal") so the Content
 * Audit admin dashboard can deep-link directly to it. When the page
 * loads with a matching hash, the section auto-opens, scrolls into
 * view and briefly highlights so reviewers spot it immediately.
 */
export const CollapsibleSubsection = ({
  title,
  defaultOpen = false,
  children,
}: CollapsibleSubsectionProps) => {
  const anchorId = sectionAnchorId(title);
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const [forcedOpen, setForcedOpen] = useState(false);
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const check = () => {
      const hash = window.location.hash.replace(/^#/, "");
      if (hash && hash === anchorId) {
        setForcedOpen(true);
        // wait a tick so the section is expanded before scrolling
        requestAnimationFrame(() => {
          detailsRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
          setHighlight(true);
          window.setTimeout(() => setHighlight(false), 2400);
        });
      }
    };
    check();
    window.addEventListener("hashchange", check);
    return () => window.removeEventListener("hashchange", check);
  }, [anchorId]);

  return (
    <details
      ref={detailsRef}
      id={anchorId}
      open={defaultOpen || forcedOpen}
      className={`group/collapsible scroll-mt-24 rounded-md transition-colors ${
        highlight ? "ring-2 ring-primary/60 bg-primary/5" : ""
      }`}
    >
      <summary className="flex items-center gap-2 cursor-pointer list-none mb-3 select-none hover:opacity-80 transition-opacity [&::-webkit-details-marker]:hidden">
        <ChevronRight
          className="h-5 w-5 text-muted-foreground transition-transform duration-200 group-open/collapsible:rotate-90 shrink-0"
          aria-hidden="true"
        />
        <h2 className="text-2xl font-serif font-bold text-foreground m-0">
          {title}
        </h2>
      </summary>
      <div className="mt-1">{children}</div>
    </details>
  );
};

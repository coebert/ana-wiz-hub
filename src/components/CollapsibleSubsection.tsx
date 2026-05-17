import { ChevronRight } from "lucide-react";
import { ReactNode } from "react";

interface CollapsibleSubsectionProps {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}

/**
 * Collapsible subsection wrapper for long topic pages.
 * Uses native <details> so it works without JS, respects reduce-motion,
 * and keeps printable/searchable semantics. Defaults to collapsed.
 */
export const CollapsibleSubsection = ({
  title,
  defaultOpen = false,
  children,
}: CollapsibleSubsectionProps) => (
  <details open={defaultOpen} className="group/collapsible">
    <summary className="flex items-center gap-2 cursor-pointer list-none mb-3 select-none hover:opacity-80 transition-opacity [&::-webkit-details-marker]:hidden">
      <ChevronRight
        className="h-5 w-5 text-muted-foreground transition-transform duration-200 group-open/collapsible:rotate-90 shrink-0"
        aria-hidden="true"
      />
      <h2 className="text-2xl font-serif font-bold text-foreground m-0">{title}</h2>
    </summary>
    <div className="mt-1">{children}</div>
  </details>
);

import { Link } from "react-router-dom";
import { ArrowUpRight, Link2 } from "lucide-react";
import { allTopics, sectionMeta } from "@/data/curriculum";
import { cn } from "@/lib/utils";

/**
 * Inline cross-reference callout for use *inside* a topic section, immediately
 * adjacent to the block whose concept partially overlaps another topic. This
 * is distinct from the bottom-of-page <SeeAlso /> (which is one consolidated
 * "related topics" list per topic page).
 *
 * Use this when the placement-flow dedupe verdict is "cross-reference" — i.e.
 * the new addition is *adjacent* to existing material rather than duplicative.
 * The callout makes the conceptual link explicit at the point of reading,
 * rather than leaving the reader to discover it at the bottom of the page.
 *
 * Example:
 *   <CrossReferenceCallout
 *     reason="The dichrotic notch is the timing reference for IABP counterpulsation."
 *     links={[{ topicId: "mechanical-circulatory-support", anchor: "iabp" }]}
 *   />
 */

export interface CrossReferenceLink {
  /** Target topic id (must exist in `allTopics`). */
  topicId: string;
  /** Optional URL hash to scroll to a specific block within the target topic. */
  anchor?: string;
  /** Optional override label; defaults to the target topic's title. */
  label?: string;
}

interface CrossReferenceCalloutProps {
  /** One short sentence explaining the conceptual link. */
  reason: string;
  links: CrossReferenceLink[];
  /** Visual density. Default = "inline" (compact); "panel" = bordered card. */
  variant?: "inline" | "panel";
  className?: string;
}

export const CrossReferenceCallout = ({
  reason,
  links,
  variant = "inline",
  className,
}: CrossReferenceCalloutProps) => {
  const resolved = links
    .map((l) => {
      const topic = allTopics.find((t) => t.id === l.topicId);
      if (!topic) return null;
      const section = sectionMeta[topic.section];
      const href = `${section.path}/${topic.id}${l.anchor ? `#${l.anchor}` : ""}`;
      return {
        href,
        label: l.label ?? topic.title,
        sectionLabel: section.label,
      };
    })
    .filter((x): x is { href: string; label: string; sectionLabel: string } => x !== null);

  if (resolved.length === 0) return null;

  if (variant === "panel") {
    return (
      <aside
        className={cn(
          "my-4 rounded-lg border border-primary/20 bg-primary/5 p-3",
          className
        )}
        role="complementary"
        aria-label="Related material in other topics"
      >
        <div className="flex items-start gap-2">
          <Link2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
          <div className="flex-1 space-y-2">
            <p className="text-xs text-foreground leading-relaxed">
              <span className="font-semibold text-primary">See also: </span>
              {reason}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {resolved.map((r) => (
                <Link
                  key={r.href}
                  to={r.href}
                  className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border border-primary/30 bg-background text-foreground hover:bg-primary/10 transition-colors"
                >
                  <span className="font-medium">{r.label}</span>
                  <span className="text-muted-foreground">· {r.sectionLabel}</span>
                  <ArrowUpRight className="h-3 w-3 text-primary" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <p
      className={cn(
        "my-2 text-xs text-muted-foreground italic flex flex-wrap items-center gap-x-1.5 gap-y-1",
        className
      )}
    >
      <Link2 className="h-3 w-3 text-primary inline-block" />
      <span className="font-semibold text-primary not-italic">See also:</span>
      <span>{reason}</span>
      {resolved.map((r, i) => (
        <span key={r.href} className="not-italic">
          {i > 0 && <span className="text-muted-foreground">, </span>}
          <Link
            to={r.href}
            className="text-primary hover:underline font-medium inline-flex items-center gap-0.5"
          >
            {r.label}
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </span>
      ))}
    </p>
  );
};

export default CrossReferenceCallout;

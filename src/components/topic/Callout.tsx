import { ReactNode, useEffect, useRef, useState } from "react";
import {
  Lightbulb,
  AlertTriangle,
  AlertOctagon,
  Sparkles,
  Stethoscope,
  BookOpen,
  Info,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * <Callout> — the standardized in-topic block for surfacing key
 * principles, exam pearls, pitfalls, warnings, clinical bottom-lines
 * and general notes.
 *
 * Design decisions:
 *  - Six semantic variants tied to project category tokens (no ad-hoc
 *    palettes in components — colours come from `bg-*`, `text-*`,
 *    `border-*` semantic classes defined in `index.css`).
 *  - Every callout carries a category rule on the left (a 3px accent
 *    bar) and a soft tinted fill, so long-form topic pages get a
 *    consistent visual rhythm regardless of who authored the topic.
 *  - Entrance animation: the block fades and slides in on scroll into
 *    view via IntersectionObserver. Respects `prefers-reduced-motion`.
 *  - The accent bar animates its scaleY in behind the fade — a small
 *    editorial flourish that anchors the eye. Also suppressed under
 *    `prefers-reduced-motion`.
 *
 * Author-facing API is intentionally tight — `variant`, `title`
 * (optional; defaults to the variant label) and `children`.
 */
export type CalloutVariant =
  | "principle"
  | "pearl"
  | "pitfall"
  | "warning"
  | "clinical"
  | "note";

interface VariantSpec {
  label: string;
  Icon: LucideIcon;
  /** Solid accent-bar colour (uses semantic tokens). */
  accent: string;
  /** Soft tint for the card body. */
  tint: string;
  /** Border colour of the whole card. */
  border: string;
  /** Foreground colour for icon + eyebrow. */
  fg: string;
  /** Circle-badge background behind the icon. */
  chip: string;
}

const VARIANTS: Record<CalloutVariant, VariantSpec> = {
  principle: {
    label: "Key principle",
    Icon: Sparkles,
    accent: "bg-primary",
    tint: "bg-primary/5",
    border: "border-primary/25",
    fg: "text-primary",
    chip: "bg-primary/15",
  },
  pearl: {
    label: "Exam pearl",
    Icon: Lightbulb,
    accent: "bg-cta",
    tint: "bg-cta/5",
    border: "border-cta/25",
    fg: "text-cta",
    chip: "bg-cta/15",
  },
  pitfall: {
    label: "Common pitfall",
    Icon: AlertTriangle,
    accent: "bg-amber-500",
    tint: "bg-amber-500/5",
    border: "border-amber-500/25",
    fg: "text-amber-600 dark:text-amber-400",
    chip: "bg-amber-500/15",
  },
  warning: {
    label: "Safety warning",
    Icon: AlertOctagon,
    accent: "bg-destructive",
    tint: "bg-destructive/5",
    border: "border-destructive/25",
    fg: "text-destructive",
    chip: "bg-destructive/15",
  },
  clinical: {
    label: "Clinical bottom line",
    Icon: Stethoscope,
    accent: "bg-clinical",
    tint: "bg-clinical/5",
    border: "border-clinical/25",
    fg: "text-clinical",
    chip: "bg-clinical/15",
  },
  note: {
    label: "Note",
    Icon: Info,
    accent: "bg-muted-foreground",
    tint: "bg-muted/40",
    border: "border-border",
    fg: "text-foreground/70",
    chip: "bg-muted",
  },
};

interface CalloutProps {
  variant?: CalloutVariant;
  /** Optional override for the header label. Defaults to the variant label. */
  title?: string;
  /** Swap the default variant icon. Rarely needed. */
  icon?: LucideIcon;
  children: ReactNode;
  className?: string;
}

export const Callout = ({
  variant = "principle",
  title,
  icon,
  children,
  className,
}: CalloutProps) => {
  const spec = VARIANTS[variant];
  const Icon = icon ?? spec.Icon;
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Users who prefer reduced motion get the final state immediately.
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <aside
      ref={ref}
      role="note"
      aria-label={title ?? spec.label}
      className={cn(
        "relative my-5 overflow-hidden rounded-xl border pl-4 pr-4 py-4 sm:py-5 sm:pl-5 sm:pr-5",
        spec.border,
        spec.tint,
        visible ? "animate-callout-in" : "opacity-0",
        className,
      )}
    >
      {/* Left category rule — animates its scaleY on entry */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-y-0 left-0 w-[3px] origin-top",
          spec.accent,
          visible ? "animate-callout-accent" : "scale-y-0",
        )}
      />

      <div className="flex items-start gap-3">
        <span
          className={cn(
            "shrink-0 inline-flex h-8 w-8 items-center justify-center rounded-full",
            spec.chip,
            spec.fg,
          )}
          aria-hidden
        >
          <Icon className="h-4 w-4" strokeWidth={2.25} />
        </span>
        <div className="min-w-0 flex-1">
          <p
            className={cn(
              "eyebrow font-semibold mb-1.5",
              spec.fg,
            )}
          >
            {title ?? spec.label}
          </p>
          <div className="text-sm sm:text-[15px] leading-relaxed text-foreground/90 [&>p]:mb-2 [&>p:last-child]:mb-0 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-1 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:space-y-1 [&>ul>li]:marker:text-muted-foreground [&>ol>li]:marker:text-muted-foreground [&_strong]:text-foreground">
            {children}
          </div>
        </div>
      </div>
    </aside>
  );
};

// Re-export icon lookup so downstream MDX / topic authors can build
// custom callout titles without importing lucide directly.
export const CalloutIcons: Record<CalloutVariant, LucideIcon> = {
  principle: Sparkles,
  pearl: Lightbulb,
  pitfall: AlertTriangle,
  warning: AlertOctagon,
  clinical: Stethoscope,
  note: BookOpen,
};

export default Callout;

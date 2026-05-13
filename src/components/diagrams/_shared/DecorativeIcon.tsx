import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * DecorativeIcon
 *
 * Wraps a lucide (or any) icon as pure UI decoration so assistive tech
 * never tries to interpret it as content — useful for diagram badges,
 * legend swatches, and inline pictograms that sit next to a real text label.
 *
 * Always sets:
 *  - aria-hidden="true"
 *  - role="presentation"
 *  - focusable={false}      (suppresses tab focus on the inner SVG in IE/Edge legacy)
 *  - tabIndex={-1}
 *
 * Usage:
 *   <DecorativeIcon icon={AlertTriangle} className="w-3 h-3" strokeWidth={2} />
 *
 *   // Or as a tinted badge (matches CAM-ICU "Why screen?" style):
 *   <DecorativeIcon
 *     icon={AlertTriangle}
 *     badge="destructive"
 *     iconClassName="w-3 h-3"
 *   />
 */

export type DecorativeIconBadge =
  | "none"
  | "primary"
  | "destructive"
  | "accent"
  | "clinical"
  | "icu"
  | "pharmacology"
  | "physiology";

const BADGE_CLASSES: Record<Exclude<DecorativeIconBadge, "none">, string> = {
  primary: "bg-primary/15 text-primary ring-1 ring-primary/30",
  destructive:
    "bg-destructive/15 text-destructive ring-1 ring-destructive/30",
  accent: "bg-accent/15 text-accent ring-1 ring-accent/30",
  clinical:
    "bg-[hsl(var(--clinical)/0.15)] text-[hsl(var(--clinical))] ring-1 ring-[hsl(var(--clinical)/0.3)]",
  icu: "bg-[hsl(var(--icu)/0.15)] text-[hsl(var(--icu))] ring-1 ring-[hsl(var(--icu)/0.3)]",
  pharmacology:
    "bg-[hsl(var(--pharmacology)/0.15)] text-[hsl(var(--pharmacology))] ring-1 ring-[hsl(var(--pharmacology)/0.3)]",
  physiology:
    "bg-[hsl(var(--physiology)/0.15)] text-[hsl(var(--physiology))] ring-1 ring-[hsl(var(--physiology)/0.3)]",
};

type IconLike = React.ComponentType<React.SVGProps<SVGSVGElement> & { strokeWidth?: number; size?: number | string }>;

export interface DecorativeIconProps {
  /** The icon component to render (e.g. lucide `AlertTriangle`). */
  icon: IconLike;
  /** Optional tinted circular badge wrapper. Defaults to "none". */
  badge?: DecorativeIconBadge;
  /** Tailwind size for the badge wrapper (default w-5 h-5). */
  badgeClassName?: string;
  /** Tailwind classes applied to the icon itself. Default w-3.5 h-3.5. */
  iconClassName?: string;
  /** Stroke width forwarded to the icon. */
  strokeWidth?: number;
  /** Extra props forwarded to the icon (style, etc.). */
  iconProps?: React.SVGProps<SVGSVGElement>;
  /** When badge is "none", classes are applied to the icon directly. */
  className?: string;
}

const a11yProps = {
  "aria-hidden": true as const,
  role: "presentation" as const,
  focusable: false as const,
  tabIndex: -1,
};

export const DecorativeIcon: React.FC<DecorativeIconProps> = ({
  icon: Icon,
  badge = "none",
  badgeClassName,
  iconClassName,
  strokeWidth,
  iconProps,
  className,
}) => {
  const iconElement = (
    <Icon
      className={cn(iconClassName ?? "w-3.5 h-3.5", badge === "none" ? className : undefined)}
      strokeWidth={strokeWidth}
      {...a11yProps}
      {...iconProps}
    />
  );

  if (badge === "none") return iconElement;

  return (
    <span
      {...a11yProps}
      className={cn(
        "inline-flex items-center justify-center rounded-full shrink-0",
        "w-5 h-5",
        BADGE_CLASSES[badge],
        badgeClassName,
        className,
      )}
    >
      {iconElement}
    </span>
  );
};

DecorativeIcon.displayName = "DecorativeIcon";

import * as React from "react";
import type { LucideIcon, LucideProps } from "lucide-react";
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

/**
 * Acceptable icon component shape.
 *
 * Primary target is `lucide-react`'s `LucideIcon`. We also accept any
 * forwardRef-compatible SVG component that takes `LucideProps` so custom
 * pictograms drawn in the same style can be used interchangeably.
 *
 * Plain `React.ComponentType<any>`, HTML intrinsics, strings, lazy elements,
 * etc. are rejected at compile time.
 */
export type DecorativeIconComponent =
  | LucideIcon
  | React.ForwardRefExoticComponent<
      LucideProps & React.RefAttributes<SVGSVGElement>
    >;

/**
 * Props that callers must NEVER override — they would defeat the whole
 * purpose of this wrapper (which is to guarantee the icon is invisible to
 * assistive tech). Listed here so the compiler rejects them on `iconProps`.
 */
type ForbiddenA11yProps =
  | "aria-hidden"
  | "aria-label"
  | "aria-labelledby"
  | "aria-describedby"
  | "role"
  | "tabIndex"
  | "focusable"
  | "ref"
  | "children";

export type SafeIconProps = Omit<LucideProps, ForbiddenA11yProps>;

interface DecorativeIconBaseProps {
  /** The icon component to render (e.g. lucide `AlertTriangle`). */
  icon: DecorativeIconComponent;
  /** Tailwind classes applied to the icon itself. Default w-3.5 h-3.5. */
  iconClassName?: string;
  /** Stroke width forwarded to the icon. */
  strokeWidth?: number;
  /**
   * Extra props forwarded to the icon. A11y/role/tabIndex/focusable/ref/children
   * are intentionally forbidden — those are owned by DecorativeIcon.
   */
  iconProps?: SafeIconProps;
  /** This component never renders children. */
  children?: never;
}

interface DecorativeIconNoBadgeProps extends DecorativeIconBaseProps {
  badge?: "none";
  /** When badge is "none", classes are applied to the icon directly. */
  className?: string;
  /** Not valid without a badge. */
  badgeClassName?: never;
}

interface DecorativeIconBadgedProps extends DecorativeIconBaseProps {
  badge: Exclude<DecorativeIconBadge, "none">;
  /** Tailwind classes applied to the badge wrapper. */
  className?: string;
  /** Tailwind size for the badge wrapper (default w-5 h-5). */
  badgeClassName?: string;
}

export type DecorativeIconProps =
  | DecorativeIconNoBadgeProps
  | DecorativeIconBadgedProps;

const a11yProps = {
  "aria-hidden": true as const,
  role: "presentation" as const,
  focusable: false as const,
  tabIndex: -1,
};

/* ------------------------------------------------------------------ */
/*  Dev-only runtime guard                                            */
/* ------------------------------------------------------------------ */

/**
 * Warn (once per offending component) if a non-Lucide-like value is
 * passed as `icon`. Stripped from production bundles by the
 * `process.env.NODE_ENV !== "production"` guard.
 *
 * Heuristics for "Lucide-like":
 *   1. A `forwardRef` exotic object  — matches lucide-react icons
 *      (their `$$typeof === Symbol.for("react.forward_ref")`).
 *   2. A plain function component whose displayName/name looks like a
 *      PascalCase icon (matches custom hand-rolled SVG components).
 *
 * Anything else — strings, HTML intrinsics, lazy components, class
 * components, plain objects — gets a console.warn pointing at the call
 * site so the developer can fix it before it ships.
 */
const REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
const REACT_MEMO_TYPE = Symbol.for("react.memo");
const warnedIcons = new WeakSet<object>();

function assertLucideLike(icon: unknown): void {
  if (process.env.NODE_ENV === "production") return;
  if (icon == null) {
    // eslint-disable-next-line no-console
    console.warn(
      "[DecorativeIcon] `icon` prop is null/undefined. Pass a lucide-react icon component, e.g. `icon={AlertTriangle}`.",
    );
    return;
  }

  // Already-warned components — bail out to avoid log spam.
  if (
    (typeof icon === "object" || typeof icon === "function") &&
    warnedIcons.has(icon as object)
  ) {
    return;
  }

  const isForwardRef =
    typeof icon === "object" &&
    icon !== null &&
    (icon as { $$typeof?: symbol }).$$typeof === REACT_FORWARD_REF_TYPE;

  const isMemoOfForwardRef =
    typeof icon === "object" &&
    icon !== null &&
    (icon as { $$typeof?: symbol }).$$typeof === REACT_MEMO_TYPE &&
    (icon as { type?: { $$typeof?: symbol } }).type?.$$typeof ===
      REACT_FORWARD_REF_TYPE;

  let isPascalCaseFnComponent = false;
  if (typeof icon === "function") {
    const fnName =
      (icon as { displayName?: string; name?: string }).displayName ??
      (icon as { name?: string }).name ??
      "";
    isPascalCaseFnComponent = /^[A-Z][A-Za-z0-9]*$/.test(fnName);
  }

  if (isForwardRef || isMemoOfForwardRef || isPascalCaseFnComponent) return;

  if (typeof icon === "object" || typeof icon === "function") {
    warnedIcons.add(icon as object);
  }

  const description =
    typeof icon === "string"
      ? `string ("${icon}")`
      : typeof icon === "function"
      ? `function "${(icon as { name?: string }).name || "anonymous"}" — name is not PascalCase`
      : `${typeof icon}`;

  // eslint-disable-next-line no-console
  console.warn(
    `[DecorativeIcon] Expected a Lucide-like icon component (forwardRef ` +
      `SVG component or PascalCase function component). Received: ${description}. ` +
      `This will not render the expected icon.`,
  );
}

export const DecorativeIcon: React.FC<DecorativeIconProps> = ({
  icon: Icon,
  badge = "none",
  badgeClassName,
  iconClassName,
  strokeWidth,
  iconProps,
  className,
}) => {
  assertLucideLike(Icon);
  const iconElement = (
    <Icon
      {...iconProps}
      className={cn(iconClassName ?? "w-3.5 h-3.5", badge === "none" ? className : undefined)}
      strokeWidth={strokeWidth}
      {...a11yProps}
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

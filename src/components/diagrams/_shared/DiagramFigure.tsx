import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * DiagramFigure
 *
 * Semantic wrapper for SVG diagrams. Gives assistive tech a clear,
 * predictable structure so screen readers can describe the figure as
 * a single unit rather than walking decorative <path>/<rect> children.
 *
 * Renders:
 *   <figure role="group" aria-labelledby … aria-describedby …>
 *     <figcaption className="sr-only"> {title}. {description} </figcaption>
 *     {children}                       // the <svg> goes here
 *   </figure>
 *
 * The child <svg> should still carry role="img" + its own
 * <title>/<desc> for in-SVG SR support; this wrapper provides the
 * outer landmark and the visual figcaption (when `showCaption`).
 *
 * Usage:
 *   <DiagramFigure
 *     id="cam-icu"
 *     title="CAM-ICU delirium screening flowchart"
 *     description="Sequential screen: RASS → Feature 1 → 2 → (3 OR 4)."
 *   >
 *     <svg role="img" aria-labelledby="cam-icu-title cam-icu-desc">…</svg>
 *   </DiagramFigure>
 */
export interface DiagramFigureProps
  extends React.HTMLAttributes<HTMLElement> {
  /** Stable id prefix used for caption / description ids. */
  id: string;
  /** Short accessible name read first by screen readers. */
  title: string;
  /** Longer description of what the diagram conveys. */
  description?: string;
  /** Show the title visually as a caption (default: false / sr-only). */
  showCaption?: boolean;
}

export const DiagramFigure = React.forwardRef<HTMLElement, DiagramFigureProps>(
  (
    {
      id,
      title,
      description,
      showCaption = false,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const titleId = `${id}-figure-title`;
    const descId = description ? `${id}-figure-desc` : undefined;

    return (
      <figure
        ref={ref}
        role="group"
        aria-labelledby={titleId}
        aria-describedby={descId}
        className={cn("relative", className)}
        {...rest}
      >
        <figcaption
          id={titleId}
          className={cn(
            "text-sm font-semibold text-foreground mb-2",
            !showCaption && "sr-only",
          )}
        >
          {title}
        </figcaption>
        {description && (
          <p id={descId} className="sr-only">
            {description}
          </p>
        )}
        {children}
      </figure>
    );
  },
);
DiagramFigure.displayName = "DiagramFigure";

/* ------------------------------------------------------------------ */
/*  Helpers for SVG-internal accessibility                            */
/* ------------------------------------------------------------------ */

/**
 * Spread onto the root <svg> to get a complete role="img" wiring.
 *
 *   <svg {...svgImgProps({ id: "cam-icu", title: true, desc: true })}>
 *     <title id="cam-icu-title">…</title>
 *     <desc id="cam-icu-desc">…</desc>
 *   </svg>
 */
export const svgImgProps = ({
  id,
  title = true,
  desc = true,
}: {
  id: string;
  title?: boolean;
  desc?: boolean;
}) => {
  const labels: string[] = [];
  if (title) labels.push(`${id}-title`);
  if (desc) labels.push(`${id}-desc`);
  return {
    role: "img" as const,
    "aria-labelledby": labels.join(" ") || undefined,
    focusable: false,
  };
};

/**
 * Spread onto an SVG <g> to label a meaningful node group
 * (e.g. a flowchart step). Adds role="group" + aria-label and
 * a <title> child the user can hand-render inside the <g>.
 *
 *   <g {...svgNodeProps("Step 1: Assess RASS")}>
 *     <title>Step 1 — Assess RASS</title>
 *     <rect … />
 *   </g>
 */
export const svgNodeProps = (label: string) => ({
  role: "group" as const,
  "aria-label": label,
});

/**
 * Spread onto an SVG element that is purely decorative (background
 * fills, ornamental strokes, gradient halos). Belt-and-braces with
 * the role="img" parent — explicit hiding prevents older SR engines
 * from descending into the SVG.
 */
export const svgDecorativeProps = {
  "aria-hidden": true as const,
  role: "presentation" as const,
  focusable: false as const,
};

/**
 * Shared diagram style tokens.
 *
 * Single source of truth for stroke widths, node outlines and HSL-token
 * fills/strokes used across every SVG diagram in the app. Import from here
 * so new diagrams stay automatically consistent with CAM-ICU and the rest
 * of the normalised set.
 *
 * Usage:
 *   import { strokeWidth, token, nodeRectProps, edgeProps } from "@/components/diagrams/_shared/diagramStyles";
 *
 *   <rect {...nodeRectProps("clinical")} x={10} y={10} width={120} height={40} />
 *   <path {...edgeProps()} d="M 0 0 L 100 0" />
 */

/** Allowed stroke widths. Snap any new value to one of these. */
export const strokeWidth = {
  hairline: 0.5,
  thin: 0.75,
  light: 1,
  regular: 1.5,
  bold: 2,
  heavy: 3,
} as const;

export type StrokeWeight = keyof typeof strokeWidth;

/** Semantic HSL design tokens available to diagrams. */
export const tokens = [
  "primary",
  "secondary",
  "accent",
  "muted",
  "muted-foreground",
  "foreground",
  "background",
  "card",
  "border",
  "destructive",
  // Section tokens
  "physics",
  "physiology",
  "pharmacology",
  "clinical",
  "icu",
  "perioperative",
] as const;

export type DiagramToken = (typeof tokens)[number];

/** Wrap a token name as a CSS hsl(var(--…)) string. */
export const token = (name: DiagramToken): string => `hsl(var(--${name}))`;

/** Default opacity for filled nodes (matches CAM-ICU). */
export const NODE_FILL_OPACITY = 0.9;

/** Default node border colour and width. */
export const nodeBorder = {
  stroke: token("border"),
  strokeWidth: strokeWidth.thin, // 0.75
} as const;

/** Default edge / connector colour and width. */
export const edge = {
  stroke: token("foreground"),
  strokeWidth: strokeWidth.regular, // 1.5
  fill: "none",
} as const;

/** Subdued / "no" branch edge. */
export const edgeMuted = {
  stroke: token("muted-foreground"),
  strokeWidth: strokeWidth.regular,
  fill: "none",
} as const;

/** Destructive / warning edge. */
export const edgeDestructive = {
  stroke: token("destructive"),
  strokeWidth: strokeWidth.regular,
  fill: "none",
} as const;

/**
 * Spread onto a filled <rect> to get the standard node look:
 * token fill at 0.9 opacity with a hairline border.
 */
export const nodeRectProps = (
  fillToken: DiagramToken,
  opts: { opacity?: number; rx?: number } = {},
) => ({
  fill: token(fillToken),
  opacity: opts.opacity ?? NODE_FILL_OPACITY,
  rx: opts.rx ?? 6,
  stroke: nodeBorder.stroke,
  strokeWidth: nodeBorder.strokeWidth,
});

/** Spread onto a <path>/<line> to get a standard connector. */
export const edgeProps = (
  variant: "default" | "muted" | "destructive" = "default",
) => {
  switch (variant) {
    case "muted":
      return edgeMuted;
    case "destructive":
      return edgeDestructive;
    default:
      return edge;
  }
};

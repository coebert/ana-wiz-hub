/**
 * Reusable SVG primitives that bake in the shared diagram styling.
 *
 * Prefer these in new diagrams over hand-written <rect>/<path> with
 * inline tokens — they guarantee stroke widths, outlines and HSL
 * tokens stay consistent app-wide.
 */
import * as React from "react";
import {
  edgeProps,
  nodeRectProps,
  token,
  type DiagramToken,
} from "./diagramStyles";

type SvgRectProps = React.SVGProps<SVGRectElement>;
type SvgPathProps = React.SVGProps<SVGPathElement>;
type SvgTextProps = React.SVGProps<SVGTextElement>;

export interface DiagramNodeProps extends Omit<SvgRectProps, "fill"> {
  /** Semantic token used for the fill, e.g. "clinical", "icu". */
  fillToken: DiagramToken;
  /** Override the default 0.9 fill opacity. */
  fillOpacity?: number;
  /** Override the default rx (6). */
  cornerRadius?: number;
}

/** Standard rounded, token-filled, border-outlined diagram node. */
export const DiagramNode = React.forwardRef<SVGRectElement, DiagramNodeProps>(
  ({ fillToken, fillOpacity, cornerRadius, ...rest }, ref) => {
    const base = nodeRectProps(fillToken, {
      opacity: fillOpacity,
      rx: cornerRadius,
    });
    return <rect ref={ref} {...base} {...rest} />;
  },
);
DiagramNode.displayName = "DiagramNode";

export type EdgeVariant = "default" | "muted" | "destructive";

export interface DiagramEdgeProps extends SvgPathProps {
  variant?: EdgeVariant;
}

/** Standard connector path (default 1.5px foreground, fill="none"). */
export const DiagramEdge = React.forwardRef<SVGPathElement, DiagramEdgeProps>(
  ({ variant = "default", ...rest }, ref) => {
    const base = edgeProps(variant);
    return <path ref={ref} {...base} {...rest} />;
  },
);
DiagramEdge.displayName = "DiagramEdge";

export interface DiagramLabelProps extends Omit<SvgTextProps, "fill"> {
  /** Semantic token used for the text colour. Defaults to foreground. */
  colorToken?: DiagramToken;
}

/** Themed SVG text label using a design-token colour. */
export const DiagramLabel = React.forwardRef<SVGTextElement, DiagramLabelProps>(
  ({ colorToken = "foreground", ...rest }, ref) => (
    <text ref={ref} fill={token(colorToken)} {...rest} />
  ),
);
DiagramLabel.displayName = "DiagramLabel";

import React, { useId, useMemo, useState } from "react";
import { cn } from "@/lib/utils";


/**
 * AnatomyPlate — single SVG primitive for hand-coded anatomy diagrams.
 *
 * All labels and leader lines are defined in code (not baked into pixels),
 * so every label position can be audited and corrected. Replaces the
 * JPEG-based CorPictumFolio plates.
 *
 * Coordinate system: caller chooses the viewBox (default 1000x700).
 * Labels live in the same coordinate space.
 */

export type AnatomyLabel = {
  /** Unique key */
  id: string;
  /** Visible label text */
  text: string;
  /** Coordinate of the structure being pointed at (leader endpoint) */
  target: [number, number];
  /** Coordinate of the label box centre */
  label: [number, number];
  /** Optional intermediate elbow point for a 2-segment leader */
  elbow?: [number, number];
  /** Side hint — affects text-anchor (default inferred from label.x vs target.x) */
  side?: "left" | "right";
  /** Optional secondary line under the main label */
  sub?: string;
  /** Optional accent colour (CSS var or value) for the leader and dot */
  accent?: string;
};

export interface AnatomyPlateProps {
  title: string;
  subtitle?: string;
  caption?: string;
  /** Bullet checkpoints shown under the figure (curriculum pearls) */
  checkpoints?: string[];
  /** SVG viewBox width (default 1000) */
  width?: number;
  /** SVG viewBox height (default 700) */
  height?: number;
  /** The anatomical drawing — paths, shapes etc. in viewBox units */
  children: React.ReactNode;
  labels: AnatomyLabel[];
  /** Optional className for the outer figure */
  className?: string;
  /** Hide the printed labels (for cases where the figure speaks for itself) */
  hideLabels?: boolean;
}

const LABEL_FONT_SIZE = 13;
const LABEL_PADDING_X = 6;
const LABEL_PADDING_Y = 4;
const LEADER_DOT_R = 3;

const AnatomyPlate: React.FC<AnatomyPlateProps> = ({
  title,
  subtitle,
  caption,
  checkpoints,
  width = 1000,
  height = 700,
  children,
  labels,
  className,
  hideLabels,
}) => {
  const uid = useId();
  const [hovered, setHovered] = useState<string | null>(null);
  

  const labelMetrics = useMemo(
    () =>
      labels.map((l) => {
        const side =
          l.side ?? (l.label[0] < l.target[0] ? "left" : "right");
        // Approximate text width — monospace-ish heuristic
        const w = Math.max(l.text.length, l.sub?.length ?? 0) * 6.6 + 2 * LABEL_PADDING_X;
        const h = (l.sub ? 2 : 1) * (LABEL_FONT_SIZE + 2) + 2 * LABEL_PADDING_Y;
        const anchorX =
          side === "left" ? l.label[0] + w / 2 : l.label[0] - w / 2;
        return { label: l, side, w, h, anchorX };
      }),
    [labels],
  );

  return (
    <figure
      className={cn(
        // Cap plate width on desktop so the SVG stays at a comfortable
        // reading size (~720–880px) rather than stretching to the full
        // 4xl topic column. Centred so labels remain near the body text.
        "my-4 mx-auto w-full max-w-2xl lg:max-w-3xl rounded-xl border border-border bg-card overflow-hidden",
        className,
      )}
    >
      <div
        className="px-4 py-3 border-b border-border bg-muted/30"
        aria-hidden={false}
      >
        <p className="text-sm font-semibold text-foreground">{title}</p>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
        )}
      </div>
      {/* Constrain portrait plates by viewport height so a tall figure
          never pushes the labels and caption below the fold. */}
      <div className="bg-[hsl(var(--anatomy-paper))] flex justify-center max-h-[78vh] overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="xMidYMid meet"
          className="block w-full h-auto max-h-[78vh]"
          role="img"
          aria-label={title}
        >
          <defs>
            <marker
              id={`${uid}-dot`}
              viewBox="0 0 10 10"
              refX="5"
              refY="5"
              markerWidth="5"
              markerHeight="5"
            >
              <circle cx="5" cy="5" r="4" fill="currentColor" />
            </marker>
          </defs>

          {/* The hand-drawn anatomy */}
          <g className="anatomy-body">{children}</g>

          {/* Labels + leader lines */}
          {!hideLabels && (
            <g className="anatomy-labels" fontFamily="Inter, system-ui, sans-serif">
              {labelMetrics.map(({ label, side, w, h }) => {
                const isHover = hovered === label.id;
                const accent = label.accent ?? "hsl(var(--anatomy-stroke))";
                const labelX =
                  side === "left" ? label.label[0] : label.label[0] - w;
                const labelY = label.label[1] - h / 2;
                const lineEndX =
                  side === "left" ? label.label[0] + w : label.label[0] - w;
                const lineEndY = label.label[1];
                const points = label.elbow
                  ? `${lineEndX},${lineEndY} ${label.elbow[0]},${label.elbow[1]} ${label.target[0]},${label.target[1]}`
                  : `${lineEndX},${lineEndY} ${label.target[0]},${label.target[1]}`;
                return (
                  <g
                    key={label.id}
                    onMouseEnter={() => setHovered(label.id)}
                    onMouseLeave={() => setHovered(null)}
                    style={{ cursor: "default" }}
                  >
                    <polyline
                      points={points}
                      fill="none"
                      stroke={accent}
                      strokeWidth={isHover ? 1.6 : 1}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity={isHover ? 1 : 0.75}
                    />
                    <circle
                      cx={label.target[0]}
                      cy={label.target[1]}
                      r={LEADER_DOT_R}
                      fill={accent}
                    />
                    <rect
                      x={labelX}
                      y={labelY}
                      width={w}
                      height={h}
                      rx={4}
                      ry={4}
                      fill="hsl(var(--card))"
                      stroke={accent}
                      strokeWidth={isHover ? 1.2 : 0.8}
                      opacity={0.97}
                    />
                    <text
                      x={labelX + w / 2}
                      y={labelY + LABEL_PADDING_Y + LABEL_FONT_SIZE - 1}
                      textAnchor="middle"
                      fontSize={LABEL_FONT_SIZE}
                      fontWeight={600}
                      fill="hsl(var(--anatomy-stroke))"
                    >
                      {label.text}
                    </text>
                    {label.sub && (
                      <text
                        x={labelX + w / 2}
                        y={labelY + LABEL_PADDING_Y + 2 * LABEL_FONT_SIZE + 1}
                        textAnchor="middle"
                        fontSize={LABEL_FONT_SIZE - 2}
                        fill="hsl(var(--muted-foreground))"
                      >
                        {label.sub}
                      </text>
                    )}
                  </g>
                );
              })}
            </g>
          )}

        </svg>
      </div>
      {(caption || (checkpoints && checkpoints.length > 0)) && (
        <figcaption className="px-4 py-3 border-t border-border">
          {caption && (
            <p className="text-sm text-foreground">{caption}</p>
          )}
          {checkpoints && checkpoints.length > 0 && (
            <ul className="mt-1.5 grid gap-1 sm:grid-cols-2 text-xs text-muted-foreground">
              {checkpoints.map((c) => (
                <li key={c} className="flex gap-1.5">
                  <span aria-hidden className="text-foreground/60">•</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          )}
        </figcaption>
      )}
    </figure>
  );
};

export default AnatomyPlate;

/** Helper: shorthand colour values matching the anatomy-* CSS tokens. */
export const ANATOMY_COLORS = {
  artery: "hsl(var(--anatomy-artery))",
  vein: "hsl(var(--anatomy-vein))",
  nerve: "hsl(var(--anatomy-nerve))",
  muscle: "hsl(var(--anatomy-muscle))",
  bone: "hsl(var(--anatomy-bone))",
  organ: "hsl(var(--anatomy-organ))",
  fat: "hsl(var(--anatomy-fat))",
  stroke: "hsl(var(--anatomy-stroke))",
} as const;

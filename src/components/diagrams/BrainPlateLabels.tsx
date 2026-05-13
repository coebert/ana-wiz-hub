import { useState } from "react";

/**
 * Reusable SVG overlay for anatomical label callouts on the brain plates.
 * Coordinates are normalised (0–100) over the underlying image's viewBox so
 * labels stay aligned at every breakpoint. Each label is a small dot at the
 * anatomical structure, a leader line, and a text pill anchored at the edge.
 *
 * Layout pass: labels are grouped by side (start = left gutter, end = right
 * gutter, middle = floating). Within each side, label y-positions are shifted
 * to enforce a minimum vertical gap so pills never collide. Leader lines still
 * point back to the original anatomical dot.
 *
 * Alignment-check mode: a tiny "Align" button in the top-right toggles a
 * calibration overlay — 10% major + 5% minor grid, axis numbers, dot
 * crosshairs and label-anchor targets — so coordinates can be fine-tuned
 * accurately at any viewport size.
 */
export interface PlateLabel {
  /** Short label text shown in the pill. */
  text: string;
  /** Dot position on the structure — normalised % of plate (0–100). */
  dot: { x: number; y: number };
  /** Label pill position — normalised % of plate (0–100). */
  label: { x: number; y: number };
  /** Text-anchor for the label ("start" left of pill, "end" right of pill). */
  anchor?: "start" | "end" | "middle";
}

interface BrainPlateLabelsProps {
  labels: PlateLabel[];
  /** Minimum vertical gap (in viewBox %) between adjacent label rows on the same side. */
  minGap?: number;
}

interface ResolvedLabel extends PlateLabel {
  resolvedAnchor: "start" | "end" | "middle";
  /** Adjusted y-position after de-overlap pass. */
  y: number;
  /** Approximate pill half-width in viewBox % (for background sizing). */
  halfWidth: number;
}

function deoverlapColumn(items: ResolvedLabel[], minGap: number): void {
  if (items.length < 2) return;
  items.sort((a, b) => a.y - b.y);
  for (let i = 1; i < items.length; i++) {
    const prev = items[i - 1];
    const cur = items[i];
    if (cur.y - prev.y < minGap) cur.y = prev.y + minGap;
  }
  const maxY = 98;
  if (items[items.length - 1].y > maxY) {
    items[items.length - 1].y = maxY;
    for (let i = items.length - 2; i >= 0; i--) {
      const next = items[i + 1];
      const cur = items[i];
      if (next.y - cur.y < minGap) cur.y = next.y - minGap;
    }
  }
}

/**
 * Calibration grid + crosshair overlay. Renders only when `show` is true.
 * - Minor lines every 5%, major lines every 10%, axis numbers in the gutters.
 * - Crosshair + coordinate read-out at every anatomical dot.
 * - Small target marker at every label-anchor coordinate (pre-de-overlap).
 */
const AlignmentOverlay = ({ labels }: { labels: PlateLabel[] }) => {
  const ticks = Array.from({ length: 21 }, (_, i) => i * 5); // 0,5,10,...,100
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 w-full h-full"
      aria-hidden="true"
    >
      {/* Grid lines */}
      {ticks.map((t) => {
        const major = t % 10 === 0;
        const stroke = major ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))";
        const opacity = major ? 0.55 : 0.25;
        const width = major ? 0.16 : 0.1;
        return (
          <g key={t}>
            <line
              x1={t}
              y1={0}
              x2={t}
              y2={100}
              stroke={stroke}
              strokeWidth={width}
              vectorEffect="non-scaling-stroke"
              opacity={opacity}
            />
            <line
              x1={0}
              y1={t}
              x2={100}
              y2={t}
              stroke={stroke}
              strokeWidth={width}
              vectorEffect="non-scaling-stroke"
              opacity={opacity}
            />
          </g>
        );
      })}
      {/* Centre cross */}
      <line x1={50} y1={0} x2={50} y2={100} stroke="hsl(var(--destructive))" strokeWidth={0.5} vectorEffect="non-scaling-stroke" opacity={0.7} />
      <line x1={0} y1={50} x2={100} y2={50} stroke="hsl(var(--destructive))" strokeWidth={0.5} vectorEffect="non-scaling-stroke" opacity={0.7} />

      {/* Axis numbers — every 10% on top + left edge */}
      {ticks
        .filter((t) => t % 10 === 0)
        .map((t) => (
          <g key={`n-${t}`}>
            <text
              x={t}
              y={2.2}
              fontSize={1.6}
              textAnchor="middle"
              fill="hsl(var(--primary))"
              stroke="hsl(var(--background))"
              strokeWidth={0.5}
              paintOrder="stroke"
              style={{ fontFamily: "JetBrains Mono, ui-monospace, monospace" }}
            >
              {t}
            </text>
            <text
              x={1.5}
              y={t + 0.6}
              fontSize={1.6}
              textAnchor="start"
              fill="hsl(var(--primary))"
              stroke="hsl(var(--background))"
              strokeWidth={0.5}
              paintOrder="stroke"
              style={{ fontFamily: "JetBrains Mono, ui-monospace, monospace" }}
            >
              {t}
            </text>
          </g>
        ))}

      {/* Per-label calibration markers */}
      {labels.map((l, i) => (
        <g key={`m-${i}`}>
          {/* Dot crosshair (anatomical site) */}
          <line x1={l.dot.x - 1.6} y1={l.dot.y} x2={l.dot.x + 1.6} y2={l.dot.y} stroke="hsl(var(--destructive))" strokeWidth={0.5} vectorEffect="non-scaling-stroke" />
          <line x1={l.dot.x} y1={l.dot.y - 1.6} x2={l.dot.x} y2={l.dot.y + 1.6} stroke="hsl(var(--destructive))" strokeWidth={0.5} vectorEffect="non-scaling-stroke" />
          <circle cx={l.dot.x} cy={l.dot.y} r={0.9} fill="none" stroke="hsl(var(--destructive))" strokeWidth={0.5} vectorEffect="non-scaling-stroke" />
          <text
            x={l.dot.x + 1.2}
            y={l.dot.y - 1.2}
            fontSize={1.4}
            fill="hsl(var(--destructive))"
            stroke="hsl(var(--background))"
            strokeWidth={0.5}
            paintOrder="stroke"
            style={{ fontFamily: "JetBrains Mono, ui-monospace, monospace" }}
          >
            {`${l.dot.x.toFixed(0)},${l.dot.y.toFixed(0)}`}
          </text>

          {/* Label-anchor target (pre-de-overlap, so you tune the source values) */}
          <rect
            x={l.label.x - 1}
            y={l.label.y - 1}
            width={2}
            height={2}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth={0.5}
            vectorEffect="non-scaling-stroke"
          />
          <text
            x={l.label.x + (l.label.x > 50 ? -1.5 : 1.5)}
            y={l.label.y + 2.4}
            fontSize={1.4}
            textAnchor={l.label.x > 50 ? "end" : "start"}
            fill="hsl(var(--primary))"
            stroke="hsl(var(--background))"
            strokeWidth={0.5}
            paintOrder="stroke"
            style={{ fontFamily: "JetBrains Mono, ui-monospace, monospace" }}
          >
            {`${l.label.x.toFixed(0)},${l.label.y.toFixed(0)}`}
          </text>
        </g>
      ))}
    </svg>
  );
};

const BrainPlateLabels = ({ labels, minGap = 4.2 }: BrainPlateLabelsProps) => {
  const [showAlign, setShowAlign] = useState(false);

  const estimateHalfWidth = (text: string) => {
    // Inter @ fontSize 1.7, weight 600 → ~0.85 viewBox units per character.
    // Cap conservatively so long labels stay inside the side gutter and
    // never overhang into the brain illustration.
    const longest = text.split("\n").reduce((m, l) => Math.max(m, l.length), 0);
    return Math.min(18, (longest * 0.85) / 2 + 0.8);
  };

  const resolved: ResolvedLabel[] = labels.map((l) => ({
    ...l,
    resolvedAnchor: l.anchor ?? (l.label.x < l.dot.x ? "end" : "start"),
    y: l.label.y,
    halfWidth: estimateHalfWidth(l.text),
  }));

  const left = resolved.filter((r) => r.resolvedAnchor === "end");
  const right = resolved.filter((r) => r.resolvedAnchor === "start");
  const mid = resolved.filter((r) => r.resolvedAnchor === "middle");
  deoverlapColumn(left, minGap);
  deoverlapColumn(right, minGap);
  deoverlapColumn(mid, minGap);

  return (
    <>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        {resolved.map((l, i) => {
          const anchor = l.resolvedAnchor;
          const padX = anchor === "end" ? -0.6 : anchor === "start" ? 0.6 : 0;
          const lines = l.text.split("\n");
          const lineHeight = 1.95;
          const totalH = lines.length * lineHeight;
          const pillX =
            anchor === "end"
              ? l.label.x - l.halfWidth * 2 - 0.2
              : anchor === "start"
              ? l.label.x - 0.4
              : l.label.x - l.halfWidth;
          const pillY = l.y - totalH / 2 - 0.4;
          const pillW = l.halfWidth * 2 + 0.6;
          const pillH = totalH + 0.8;

          return (
            <g key={i} opacity={showAlign ? 0.35 : 1}>
              <line
                x1={l.dot.x}
                y1={l.dot.y}
                x2={l.label.x}
                y2={l.y}
                stroke="hsl(var(--clinical))"
                strokeWidth="0.5"
                vectorEffect="non-scaling-stroke"
                opacity="0.85"
              />
              <circle
                cx={l.dot.x}
                cy={l.dot.y}
                r="0.6"
                fill="hsl(var(--clinical))"
                stroke="hsl(var(--background))"
                strokeWidth="0.5"
                vectorEffect="non-scaling-stroke"
              />
              <rect
                x={pillX}
                y={pillY}
                width={pillW}
                height={pillH}
                rx="0.8"
                ry="0.8"
                fill="hsl(var(--background))"
                opacity="0.78"
              />
              <text
                x={l.label.x + padX}
                y={l.y - (lines.length - 1) * (lineHeight / 2)}
                textAnchor={anchor}
                dominantBaseline="middle"
                fontSize="1.7"
                fontWeight="600"
                fill="hsl(var(--foreground))"
                stroke="hsl(var(--background))"
                strokeWidth="0.5"
                paintOrder="stroke"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              >
                {lines.map((line, idx) => (
                  <tspan key={idx} x={l.label.x + padX} dy={idx === 0 ? 0 : lineHeight}>
                    {line}
                  </tspan>
                ))}
              </text>
            </g>
          );
        })}
      </svg>

      {showAlign && <AlignmentOverlay labels={labels} />}

      {/* Toggle — small, unobtrusive, top-right corner of the plate */}
      <button
        type="button"
        onClick={() => setShowAlign((v) => !v)}
        aria-pressed={showAlign}
        className="absolute top-2 right-2 z-10 px-2 py-1 rounded-md text-[10px] font-mono font-semibold border border-border bg-background/85 text-foreground hover:bg-background shadow-sm backdrop-blur-sm"
      >
        {showAlign ? "Hide grid" : "Align"}
      </button>
    </>
  );
};

export default BrainPlateLabels;

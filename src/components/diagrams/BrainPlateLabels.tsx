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

/**
 * Greedy 1-D de-overlap: sort by desired y, then sweep top→bottom and bottom→top
 * pushing collisions apart by minGap. Two passes converge for typical layouts.
 */
function deoverlapColumn(items: ResolvedLabel[], minGap: number): void {
  if (items.length < 2) return;
  items.sort((a, b) => a.y - b.y);
  // Forward pass — push later items down
  for (let i = 1; i < items.length; i++) {
    const prev = items[i - 1];
    const cur = items[i];
    if (cur.y - prev.y < minGap) cur.y = prev.y + minGap;
  }
  // Reverse pass — if we ran past the bottom, pull items back up
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

const BrainPlateLabels = ({ labels, minGap = 4.2 }: BrainPlateLabelsProps) => {
  // Approximate text width from character count (in viewBox % units).
  // Font size 1.9 ⇒ ~0.95% per character at this aspect ratio. We use the
  // longest line of the label (text may contain "\n") for multi-line pills.
  const estimateHalfWidth = (text: string) => {
    const longest = text.split("\n").reduce((m, l) => Math.max(m, l.length), 0);
    return Math.min(28, (longest * 0.95) / 2 + 1.2);
  };

  const resolved: ResolvedLabel[] = labels.map((l) => ({
    ...l,
    resolvedAnchor: l.anchor ?? (l.label.x < l.dot.x ? "end" : "start"),
    y: l.label.y,
    halfWidth: estimateHalfWidth(l.text),
  }));

  // Group by side and de-overlap each column independently.
  const left = resolved.filter((r) => r.resolvedAnchor === "end");
  const right = resolved.filter((r) => r.resolvedAnchor === "start");
  const mid = resolved.filter((r) => r.resolvedAnchor === "middle");
  deoverlapColumn(left, minGap);
  deoverlapColumn(right, minGap);
  deoverlapColumn(mid, minGap);

  return (
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
        const lineHeight = 2.1;
        const totalH = lines.length * lineHeight;
        // Pill background rect — sized to the longest line.
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
          <g key={i}>
            {/* Leader line — original dot → adjusted label position */}
            <line
              x1={l.dot.x}
              y1={l.dot.y}
              x2={l.label.x}
              y2={l.y}
              stroke="hsl(var(--clinical))"
              strokeWidth="0.18"
              vectorEffect="non-scaling-stroke"
              opacity="0.85"
            />
            {/* Anatomical dot */}
            <circle
              cx={l.dot.x}
              cy={l.dot.y}
              r="0.6"
              fill="hsl(var(--clinical))"
              stroke="hsl(var(--background))"
              strokeWidth="0.15"
              vectorEffect="non-scaling-stroke"
            />
            {/* Pill background — soft, semi-transparent for readability without obscuring anatomy */}
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
            {/* Label text — multi-line aware */}
            <text
              x={l.label.x + padX}
              y={l.y - (lines.length - 1) * (lineHeight / 2)}
              textAnchor={anchor}
              dominantBaseline="middle"
              fontSize="1.9"
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
  );
};

export default BrainPlateLabels;

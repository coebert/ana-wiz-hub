/**
 * Reusable SVG overlay for anatomical label callouts on the brain plates.
 * Coordinates are normalised (0–100) over the underlying image's viewBox so
 * labels stay aligned at every breakpoint. Each label is a small dot at the
 * anatomical structure, a leader line, and a text pill anchored at the edge.
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
}

const BrainPlateLabels = ({ labels }: BrainPlateLabelsProps) => {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 w-full h-full"
      aria-hidden="true"
    >
      {labels.map((l, i) => {
        const anchor = l.anchor ?? (l.label.x < l.dot.x ? "end" : "start");
        const padX = anchor === "end" ? -0.6 : anchor === "start" ? 0.6 : 0;
        return (
          <g key={i}>
            {/* Leader line */}
            <line
              x1={l.dot.x}
              y1={l.dot.y}
              x2={l.label.x}
              y2={l.label.y}
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
            {/* Label text — uses a stroke halo for contrast on any background */}
            <text
              x={l.label.x + padX}
              y={l.label.y}
              textAnchor={anchor}
              dominantBaseline="middle"
              fontSize="1.9"
              fontWeight="600"
              fill="hsl(var(--foreground))"
              stroke="hsl(var(--background))"
              strokeWidth="0.6"
              paintOrder="stroke"
              style={{ fontFamily: "Inter, system-ui, sans-serif" }}
            >
              {l.text}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export default BrainPlateLabels;

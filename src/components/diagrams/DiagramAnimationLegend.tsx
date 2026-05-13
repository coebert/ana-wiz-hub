import { DiagramFigure } from "./_shared/DiagramFigure";
/**
 * Compact, reusable legend for animated pathophysiology diagrams.
 * Renders small inline SVG glyphs that mirror the vocabulary used inside
 * the diagram (pulsing nodes, travelling mediator particles, arrows, etc.)
 * so learners can decode what each shape and motion represents.
 */
export interface LegendItem {
  /** Glyph type — controls which mini-SVG is rendered. */
  glyph:
    | "trigger"      // grey rounded rect = stimulus / input
    | "process"      // pulsing circle = active cellular/biochemical process
    | "mediator"     // travelling dot = mediator / cell trafficking
    | "structure"    // animated rect/ellipse = airway / lumen / lung
    | "arrow"        // causal flow
    | "outcome"      // tinted box = end consequence
    | "oscillate";   // bidirectional cycle
  /** Short label shown next to the glyph. */
  label: string;
  /** Optional plain-language explanation. */
  meaning?: string;
}

interface DiagramAnimationLegendProps {
  items: LegendItem[];
  title?: string;
}

const Glyph = ({ type }: { type: LegendItem["glyph"] }) => {
  switch (type) {
    case "trigger":
      return (
        <svg width="36" height="20" viewBox="0 0 36 20" aria-hidden="true">
          <rect x="1" y="2" width="34" height="16" rx="4"
            fill="hsl(var(--muted))" stroke="hsl(var(--border))" />
        </svg>
      );
    case "process":
      return (
        <svg width="28" height="20" viewBox="0 0 28 20" aria-hidden="true">
          <circle cx="14" cy="10" r="7"
            fill="hsl(var(--clinical) / 0.18)"
            stroke="hsl(var(--clinical))" strokeWidth="1.5">
            <animate attributeName="r" values="6;9;6" dur="1.4s" repeatCount="indefinite" />
          </circle>
        </svg>
      );
    case "mediator":
      return (
        <svg width="40" height="20" viewBox="0 0 40 20" aria-hidden="true">
          <line x1="2" y1="10" x2="38" y2="10"
            stroke="hsl(var(--border))" strokeDasharray="2 3" />
          {[0, 0.5, 1].map((d, i) => (
            <circle key={i} cx="4" cy="10" r="2.5" fill="hsl(var(--clinical))">
              <animate attributeName="cx" values="4;36" dur="1.6s" begin={`${d}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;1;0" dur="1.6s" begin={`${d}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </svg>
      );
    case "structure":
      return (
        <svg width="36" height="20" viewBox="0 0 36 20" aria-hidden="true">
          <rect x="2" y="4" width="32" height="12" rx="3"
            fill="hsl(var(--muted))" stroke="hsl(var(--border))" />
          <rect x="2" y="4" width="32" height="12" rx="3"
            fill="hsl(var(--clinical) / 0.4)" stroke="hsl(var(--clinical))" strokeWidth="1">
            <animate attributeName="height" values="3;10;3" dur="2.2s" repeatCount="indefinite" />
            <animate attributeName="y" values="8.5;5;8.5" dur="2.2s" repeatCount="indefinite" />
          </rect>
        </svg>
      );
    case "arrow":
      return (
        <svg width="36" height="20" viewBox="0 0 36 20" aria-hidden="true">
          <defs>
            <marker id="legend-arr" viewBox="0 0 10 10" refX="8" refY="5"
              markerWidth="5" markerHeight="5" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="hsl(var(--clinical))" />
            </marker>
          </defs>
          <line x1="2" y1="10" x2="30" y2="10"
            stroke="hsl(var(--clinical))" strokeWidth="2"
            markerEnd="url(#legend-arr)" />
        </svg>
      );
    case "outcome":
      return (
        <svg width="36" height="20" viewBox="0 0 36 20" aria-hidden="true">
          <rect x="1" y="2" width="34" height="16" rx="5"
            fill="hsl(var(--clinical) / 0.12)"
            stroke="hsl(var(--clinical))" strokeWidth="1.5" />
        </svg>
      );
    case "oscillate":
      return (
        <svg width="36" height="20" viewBox="0 0 36 20" aria-hidden="true">
          <ellipse cx="18" cy="10" rx="10" ry="6"
            fill="hsl(var(--clinical) / 0.3)" stroke="hsl(var(--clinical))">
            <animate attributeName="rx" values="6;13;6" dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="ry" values="4;8;4" dur="2.4s" repeatCount="indefinite" />
          </ellipse>
        </svg>
      );
  }
};

const DiagramAnimationLegend = ({
  items,
  title = "Diagram legend",
}: DiagramAnimationLegendProps) => {
  return (
        <div className="mt-4 rounded-lg border border-border bg-muted/30 p-3">
      <p className="text-xs font-semibold text-foreground mb-2">{title}</p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-xs">
            <span className="flex-shrink-0 mt-0.5"><Glyph type={item.glyph} /></span>
            <span className="leading-snug">
              <span className="font-medium text-foreground">{item.label}</span>
              {item.meaning && (
                <span className="text-muted-foreground"> — {item.meaning}</span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DiagramAnimationLegend;

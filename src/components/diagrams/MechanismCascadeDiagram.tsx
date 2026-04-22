import { useEffect, useMemo, useState } from "react";
import { Play, Pause, RotateCcw, BookOpen, ExternalLink } from "lucide-react";

/**
 * Re-usable animated mechanism cascade.
 *
 * Each cascade is a vertical chain of nodes connected by arrows. The active
 * step lights up with the accent colour, the connecting arrow fills in, and a
 * description card explains what is happening at that step. Plays through on
 * a timer; user can pause, restart, or jump to any step.
 *
 * Designed for ICU pathophysiology where the *sequence* of events matters
 * (host response, autodigestion, ammonia → oedema, post-ROSC pillars).
 */

export interface CascadeSource {
  /** Short citation label, e.g. "BJA Educ 2023" or "ERC 2021". */
  label: string;
  /** Full citation text shown in the bibliography. */
  citation: string;
  /** External URL (DOI, journal, guideline). */
  url: string;
}

export interface CascadeStep {
  /** Short label inside the node (1-3 words). */
  node: string;
  /** Optional second line in node (e.g. molecular detail). */
  detail?: string;
  /** Header for the explanation card. */
  title: string;
  /** Body text for the explanation card. */
  body: string;
  /**
   * Sources backing this step. Rendered inline as numbered superscript links
   * matching the consolidated bibliography at the foot of the diagram.
   */
  sources?: CascadeSource[];
}

interface MechanismCascadeDiagramProps {
  title: string;
  subtitle?: string;
  /** Tailwind colour token without the `text-`/`bg-` prefix, e.g. "icu". */
  accent: "icu" | "pharmacology" | "clinical" | "physiology" | "perioperative";
  steps: CascadeStep[];
  /** Layout: vertical chain (default) or radial (4 pillars around a centre). */
  layout?: "chain" | "radial";
  /** Centre label for radial layout. */
  centerLabel?: string;
}

export const MechanismCascadeDiagram = ({
  title,
  subtitle,
  accent,
  steps,
  layout = "chain",
  centerLabel,
}: MechanismCascadeDiagramProps) => {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(
      () => setStep((s) => (s + 1) % steps.length),
      1800,
    );
    return () => window.clearInterval(id);
  }, [playing, steps.length]);

  const accentVar = `hsl(var(--${accent}))`;
  const current = steps[step];

  return (
    <div className="rounded-xl border border-border bg-card/40 p-4">
      <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
        <div>
          <h3 className="text-base font-semibold text-foreground">{title}</h3>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted/60"
            aria-label={playing ? "Pause animation" : "Play animation"}
          >
            {playing ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
            {playing ? "Pause" : "Play"}
          </button>
          <button
            type="button"
            onClick={() => {
              setStep(0);
              setPlaying(true);
            }}
            className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted/60"
            aria-label="Restart animation"
          >
            <RotateCcw className="h-3 w-3" /> Restart
          </button>
        </div>
      </div>

      {/* Step pills */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {steps.map((s, i) => (
          <button
            key={s.node}
            type="button"
            onClick={() => {
              setStep(i);
              setPlaying(false);
            }}
            data-active={step === i}
            className="rounded-full border border-border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground transition-colors data-[active=true]:bg-primary data-[active=true]:text-primary-foreground data-[active=true]:border-primary"
          >
            {i + 1}. {s.node}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr,1fr] gap-4">
        <div className="rounded-lg border border-border bg-background p-3 flex items-center justify-center">
          {layout === "chain" ? (
            <ChainSvg steps={steps} active={step} accentVar={accentVar} />
          ) : (
            <RadialSvg
              steps={steps}
              active={step}
              accentVar={accentVar}
              centerLabel={centerLabel ?? ""}
            />
          )}
        </div>

        <div
          className="rounded-lg border p-3 flex flex-col justify-center"
          style={{
            borderColor: `hsl(var(--${accent}) / 0.35)`,
            backgroundColor: `hsl(var(--${accent}) / 0.06)`,
          }}
        >
          <p
            className="text-[11px] font-bold uppercase tracking-wide mb-1"
            style={{ color: accentVar }}
          >
            Step {step + 1} · {current.title}
          </p>
          <p className="text-sm text-foreground leading-relaxed">{current.body}</p>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Vertical chain layout                                                     */
/* -------------------------------------------------------------------------- */

interface ChainSvgProps {
  steps: CascadeStep[];
  active: number;
  accentVar: string;
}

const ChainSvg = ({ steps, active, accentVar }: ChainSvgProps) => {
  const nodeH = 50;
  const gap = 28;
  const width = 240;
  const height = steps.length * nodeH + (steps.length - 1) * gap + 12;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto max-h-[420px]">
      {steps.map((s, i) => {
        const y = i * (nodeH + gap) + 6;
        const isActive = i === active;
        const isPast = i < active;
        const stroke = isActive || isPast ? accentVar : "hsl(var(--border))";
        const fill = isActive ? `${accentVar}` : "hsl(var(--card))";
        const textColor = isActive ? "hsl(var(--background))" : "hsl(var(--foreground))";
        return (
          <g key={s.node}>
            {/* Connecting arrow from previous node */}
            {i > 0 && (
              <g>
                <line
                  x1={width / 2}
                  y1={y - gap}
                  x2={width / 2}
                  y2={y - 6}
                  stroke={isActive || isPast ? accentVar : "hsl(var(--border))"}
                  strokeWidth={isActive || isPast ? 2.5 : 1.5}
                  strokeDasharray={isActive ? "0" : isPast ? "0" : "4 3"}
                />
                <polygon
                  points={`${width / 2 - 5},${y - 8} ${width / 2 + 5},${y - 8} ${width / 2},${y - 1}`}
                  fill={isActive || isPast ? accentVar : "hsl(var(--border))"}
                />
              </g>
            )}
            <rect
              x={20}
              y={y}
              width={width - 40}
              height={nodeH}
              rx={8}
              fill={fill}
              stroke={stroke}
              strokeWidth={isActive ? 2.5 : 1.4}
            />
            <text
              x={width / 2}
              y={s.detail ? y + 21 : y + 30}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={textColor}
            >
              {s.node}
            </text>
            {s.detail && (
              <text
                x={width / 2}
                y={y + 38}
                textAnchor="middle"
                fontSize="9"
                fill={isActive ? "hsl(var(--background) / 0.85)" : "hsl(var(--muted-foreground))"}
              >
                {s.detail}
              </text>
            )}
            {/* Pulse ring around active node */}
            {isActive && (
              <rect
                x={16}
                y={y - 4}
                width={width - 32}
                height={nodeH + 8}
                rx={11}
                fill="none"
                stroke={accentVar}
                strokeWidth="1"
                opacity="0.5"
              >
                <animate attributeName="opacity" from="0.6" to="0" dur="1.4s" repeatCount="indefinite" />
                <animate attributeName="stroke-width" from="1" to="4" dur="1.4s" repeatCount="indefinite" />
              </rect>
            )}
          </g>
        );
      })}
    </svg>
  );
};

/* -------------------------------------------------------------------------- */
/*  Radial layout (centre + 4 pillars)                                        */
/* -------------------------------------------------------------------------- */

interface RadialSvgProps {
  steps: CascadeStep[];
  active: number;
  accentVar: string;
  centerLabel: string;
}

const RadialSvg = ({ steps, active, accentVar, centerLabel }: RadialSvgProps) => {
  const size = 320;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 110;
  const nodeR = 46;

  // Position nodes evenly around a circle starting at top
  const positions = steps.map((_, i) => {
    const angle = (i / steps.length) * 2 * Math.PI - Math.PI / 2;
    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    };
  });

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-auto max-h-[420px]">
      {/* Spokes */}
      {positions.map((p, i) => (
        <line
          key={`spoke-${i}`}
          x1={cx}
          y1={cy}
          x2={p.x}
          y2={p.y}
          stroke={i === active ? accentVar : "hsl(var(--border))"}
          strokeWidth={i === active ? 2.5 : 1}
          strokeDasharray={i === active ? "0" : "3 3"}
        />
      ))}
      {/* Centre */}
      <circle cx={cx} cy={cy} r={36} fill="hsl(var(--muted))" stroke={accentVar} strokeWidth={1.5} />
      <text x={cx} y={cy + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="hsl(var(--foreground))">
        {centerLabel.split(" ").slice(0, 2).join(" ")}
      </text>
      {centerLabel.split(" ").length > 2 && (
        <text x={cx} y={cy + 16} textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))">
          {centerLabel.split(" ").slice(2).join(" ")}
        </text>
      )}

      {/* Pillar nodes */}
      {steps.map((s, i) => {
        const p = positions[i];
        const isActive = i === active;
        return (
          <g key={s.node}>
            <circle
              cx={p.x}
              cy={p.y}
              r={nodeR}
              fill={isActive ? accentVar : "hsl(var(--card))"}
              stroke={isActive ? accentVar : "hsl(var(--border))"}
              strokeWidth={isActive ? 2.5 : 1.4}
            />
            {/* Wrap label to up to 3 lines */}
            {wrapLabel(s.node, 12).map((line, li, arr) => (
              <text
                key={li}
                x={p.x}
                y={p.y + (li - (arr.length - 1) / 2) * 11 + 4}
                textAnchor="middle"
                fontSize="10"
                fontWeight="700"
                fill={isActive ? "hsl(var(--background))" : "hsl(var(--foreground))"}
              >
                {line}
              </text>
            ))}
            {isActive && (
              <circle
                cx={p.x}
                cy={p.y}
                r={nodeR + 4}
                fill="none"
                stroke={accentVar}
                strokeWidth="1"
                opacity="0.5"
              >
                <animate attributeName="opacity" from="0.6" to="0" dur="1.4s" repeatCount="indefinite" />
                <animate attributeName="r" from={String(nodeR + 2)} to={String(nodeR + 14)} dur="1.4s" repeatCount="indefinite" />
              </circle>
            )}
          </g>
        );
      })}
    </svg>
  );
};

/** Naive word-wrap into lines with a max char count. */
function wrapLabel(text: string, max: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const w of words) {
    if ((current + " " + w).trim().length > max && current) {
      lines.push(current.trim());
      current = w;
    } else {
      current = (current + " " + w).trim();
    }
  }
  if (current) lines.push(current.trim());
  return lines.slice(0, 3);
}

export default MechanismCascadeDiagram;

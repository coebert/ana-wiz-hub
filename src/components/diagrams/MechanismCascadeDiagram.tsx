import { useCallback, useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { BookOpen, ChevronLeft, ChevronRight, ExternalLink, Pause, Play, RotateCcw } from "lucide-react";
import { DiagramFigure } from "./_shared/DiagramFigure";

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
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const baseId = useId();
  const tablistId = `${baseId}-steps`;
  const panelId = `${baseId}-panel`;
  const statusId = `${baseId}-status`;
  // Respect prefers-reduced-motion: don't auto-advance for those users.
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (!playing || prefersReducedMotion) return;
    const id = window.setInterval(
      () => setStep((s) => (s + 1) % steps.length),
      1800,
    );
    return () => window.clearInterval(id);
  }, [playing, prefersReducedMotion, steps.length]);

  const accentVar = `hsl(var(--${accent}))`;
  const current = steps[step];

  const goTo = useCallback(
    (i: number, { focus = false }: { focus?: boolean } = {}) => {
      const next = ((i % steps.length) + steps.length) % steps.length;
      setStep(next);
      setPlaying(false);
      if (focus) {
        // Move focus to the corresponding tab so screen-reader users hear it.
        requestAnimationFrame(() => tabRefs.current[next]?.focus());
      }
    },
    [steps.length],
  );

  const onTablistKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        goTo(step + 1, { focus: true });
        break;
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        goTo(step - 1, { focus: true });
        break;
      case "Home":
        e.preventDefault();
        goTo(0, { focus: true });
        break;
      case "End":
        e.preventDefault();
        goTo(steps.length - 1, { focus: true });
        break;
      case " ":
      case "Spacebar":
        e.preventDefault();
        setPlaying((p) => !p);
        break;
    }
  };

  /**
   * Build a stable, de-duplicated bibliography across all steps.
   * Order is determined by first appearance (step order, then source order
   * within step). Each unique URL gets a 1-based number used both inline and
   * in the consolidated list at the bottom.
   */
  const bibliography = useMemo(() => {
    const list: CascadeSource[] = [];
    const indexByUrl = new Map<string, number>();
    for (const s of steps) {
      for (const src of s.sources ?? []) {
        if (!indexByUrl.has(src.url)) {
          list.push(src);
          indexByUrl.set(src.url, list.length);
        }
      }
    }
    return { list, indexByUrl };
  }, [steps]);

  /** Citation numbers (in bibliography order) for the current step's sources. */
  const currentSourceIndexes = (current.sources ?? [])
    .map((src) => bibliography.indexByUrl.get(src.url))
    .filter((n): n is number => typeof n === "number");

  return (
    <DiagramFigure
      id="mechanism-cascade-diagram"
      title="Mechanism cascade"
      description="Auto-generated wrapper for the Mechanism cascade anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
          <div
        className="rounded-xl border border-border bg-card/40 p-4"
        role="group"
        aria-roledescription="Animated mechanism cascade"
        aria-label={`${title}. ${steps.length} steps. Use arrow keys to navigate, space to play or pause.`}
      >
        <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
          <div>
            <h3 className="text-base font-semibold text-foreground">{title}</h3>
            {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-1.5" role="toolbar" aria-label="Cascade player controls">
            <button
              type="button"
              onClick={() => goTo(step - 1)}
              className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:opacity-50"
              aria-label="Previous step"
              aria-controls={panelId}
            >
              <ChevronLeft className="h-3 w-3" aria-hidden="true" focusable="false" />
              <span className="sr-only sm:not-sr-only">Prev</span>
            </button>
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
              aria-label={playing ? "Pause animation" : "Play animation"}
              aria-pressed={playing}
              aria-controls={panelId}
            >
              {playing ? (
                <Pause className="h-3 w-3" aria-hidden="true" focusable="false" />
              ) : (
                <Play className="h-3 w-3" aria-hidden="true" focusable="false" />
              )}
              {playing ? "Pause" : "Play"}
            </button>
            <button
              type="button"
              onClick={() => goTo(step + 1)}
              className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
              aria-label="Next step"
              aria-controls={panelId}
            >
              <span className="sr-only sm:not-sr-only">Next</span>
              <ChevronRight className="h-3 w-3" aria-hidden="true" focusable="false" />
            </button>
            <button
              type="button"
              onClick={() => {
                setStep(0);
                setPlaying(true);
              }}
              className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
              aria-label="Restart animation from step 1"
            >
              <RotateCcw className="h-3 w-3" aria-hidden="true" focusable="false" /> Restart
            </button>
          </div>
        </div>

        {/* Step pills — implemented as an ARIA tablist with roving tabindex */}
        <div
          className="flex flex-wrap gap-1.5 mb-4"
          role="tablist"
          id={tablistId}
          aria-label="Cascade steps"
          aria-orientation="horizontal"
          onKeyDown={onTablistKeyDown}
        >
          {steps.map((s, i) => {
            const selected = step === i;
            return (
              <button
                key={s.node}
                ref={(el) => { tabRefs.current[i] = el; }}
                type="button"
                role="tab"
                id={`${tablistId}-tab-${i}`}
                aria-selected={selected}
                aria-controls={panelId}
                aria-label={`Step ${i + 1} of ${steps.length}: ${s.node}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => goTo(i)}
                data-active={selected}
                className="rounded-full border border-border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground transition-colors data-[active=true]:bg-primary data-[active=true]:text-primary-foreground data-[active=true]:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
              >
                {i + 1}. {s.node}
              </button>
            );
          })}
        </div>

        {/* Screen-reader announcement of step changes */}
        <p id={statusId} className="sr-only" aria-live="polite" aria-atomic="true">
          Step {step + 1} of {steps.length}: {current.title}. {playing ? "Playing." : "Paused."}
        </p>

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
            <p className="text-sm text-foreground leading-relaxed">
              {current.body}
              {currentSourceIndexes.length > 0 && (
                <span className="ml-1 inline-flex items-baseline gap-0.5 align-baseline">
                  {currentSourceIndexes.map((n, i) => {
                    const src = bibliography.list[n - 1];
                    return (
                      <a
                        key={src.url}
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`${src.label} — ${src.citation}`}
                        className="text-[10px] font-bold align-super rounded-sm px-1 transition-colors hover:underline"
                        style={{
                          color: accentVar,
                          backgroundColor: `hsl(var(--${accent}) / 0.12)`,
                        }}
                      >
                        [{n}]{i < currentSourceIndexes.length - 1 ? "" : ""}
                      </a>
                    );
                  })}
                </span>
              )}
            </p>
          </div>
        </div>
  
        {/* Consolidated bibliography */}
        {bibliography.list.length > 0 && (
          <div className="mt-3 rounded-lg border border-border bg-background/60 p-3">
            <div className="flex items-center gap-1.5 mb-2">
              <BookOpen className="h-3.5 w-3.5 text-muted-foreground" />
              <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                Sources for this cascade
              </p>
            </div>
            <ol className="space-y-1.5 list-none">
              {bibliography.list.map((src, i) => (
                <li
                  key={src.url}
                  className="text-[11px] text-muted-foreground leading-relaxed flex gap-1.5"
                >
                  <span
                    className="font-bold shrink-0"
                    style={{ color: accentVar }}
                  >
                    [{i + 1}]
                  </span>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline group/cite"
                  >
                    <span className="font-semibold text-foreground">{src.label}</span>
                    {" — "}
                    <span className="group-hover/cite:text-foreground">{src.citation}</span>
                    <ExternalLink
                      className="inline h-2.5 w-2.5 ml-0.5 align-baseline"
                      style={{ color: accentVar }}
                    />
                  </a>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </DiagramFigure>
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

import { useEffect, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DiagramFigure } from "./_shared/DiagramFigure";

/**
 * Animated diagram: managing ventilation during transport.
 *
 * Three timed phases shown side-by-side along a single timeline:
 *   1. Bagging (manual ventilation during transfer between ventilators)
 *   2. Switch to transport ventilator (replicate ICU settings, observe ≥15 min)
 *   3. O₂ / FiO₂ planning + circuit-disconnection prevention
 *
 * Pure SVG + React state (no animation library). Cycle ≈ 9s.
 */

const CYCLE_MS = 9000;
const PHASES = [
  { id: 0, label: "Bag-valve transition", t0: 0, t1: 0.33 },
  { id: 1, label: "Transport ventilator", t0: 0.33, t1: 0.66 },
  { id: 2, label: "O₂ planning & integrity", t0: 0.66, t1: 1.0 },
];

const phaseAt = (p: number) => {
  if (p < 0.33) return 0;
  if (p < 0.66) return 1;
  return 2;
};

export const TransportVentilationDiagram = () => {
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const start = performance.now() - t * CYCLE_MS;
    let raf = 0;
    const tick = (now: number) => {
      const p = ((now - start) % CYCLE_MS) / CYCLE_MS;
      setT(p);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);

  const phase = phaseAt(t);

  // Bag squeeze sine, only animates in phase 0
  const bagSqueeze = phase === 0 ? 0.5 + 0.5 * Math.sin(t * Math.PI * 12) : 0;
  // Vent breath cycle, only animates in phase 1
  const ventBreath = phase === 1 ? 0.5 + 0.5 * Math.sin(t * Math.PI * 10) : 0;
  // Cylinder fill drains across phase 2
  const cylDrain = phase === 2 ? Math.min(1, (t - 0.66) / 0.34) : 0;

  return (
    <DiagramFigure
      id="transport-ventilation-diagram"
      title="Transport ventilation"
      description="Auto-generated wrapper for the Transport ventilation anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <figure className="my-6 rounded-xl border border-border bg-card p-4 md:p-5">
        <figcaption className="mb-3 flex items-start justify-between gap-3">
          <div>
            <h3 className="font-serif font-bold text-foreground text-lg leading-tight">
              Ventilation during inter-hospital transport
            </h3>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              Three phases: bag-valve handover → transport ventilator → O₂ / FiO₂ planning and
              disconnection prevention.
            </p>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "Pause animation" : "Play animation"}
            >
              {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() => setT(0)}
              aria-label="Restart animation"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </Button>
          </div>
        </figcaption>
  
        {/* Phase indicator */}
        <div className="mb-3 grid grid-cols-3 gap-1.5">
          {PHASES.map((p) => (
            <div
              key={p.id}
              className={cn(
                "rounded-md border px-2 py-1.5 text-[11px] font-semibold leading-tight transition-colors",
                phase === p.id
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-background text-muted-foreground",
              )}
            >
              <span className="tabular-nums mr-1">{p.id + 1}.</span>
              {p.label}
            </div>
          ))}
        </div>
  
        <div className="rounded-lg border border-border bg-secondary/20 p-2">
          <svg
            viewBox="0 0 720 320"
            className="w-full h-auto"
            role="img"
            aria-label="Animated diagram of transport ventilation"
          >
            {/* Patient silhouette across the bottom */}
            <g>
              <rect x="80" y="240" width="560" height="40" rx="8" className="fill-muted" />
              <circle cx="120" cy="240" r="28" className="fill-muted" />
              <text
                x="360"
                y="305"
                textAnchor="middle"
                className="fill-muted-foreground"
                style={{ fontSize: 11, fontFamily: "Inter, sans-serif" }}
              >
                Critically ill patient — ETT in situ
              </text>
              {/* ETT */}
              <line
                x1="148"
                y1="240"
                x2="200"
                y2="180"
                stroke="hsl(var(--foreground))"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </g>
  
            {/* PHASE 0 — Bagging */}
            <g style={{ opacity: phase === 0 ? 1 : 0.15, transition: "opacity 300ms" }}>
              {/* Self-inflating bag */}
              <ellipse
                cx="260"
                cy="120"
                rx={48 - bagSqueeze * 14}
                ry={32 - bagSqueeze * 8}
                className="fill-primary/20 stroke-primary"
                strokeWidth="2"
              />
              {/* Reservoir */}
              <rect
                x="306"
                y="100"
                width="44"
                height="40"
                rx="6"
                className="fill-emerald-500/15 stroke-emerald-500"
                strokeWidth="2"
              />
              <text
                x="328"
                y="125"
                textAnchor="middle"
                className="fill-emerald-700 dark:fill-emerald-300"
                style={{ fontSize: 10, fontWeight: 700 }}
              >
                O₂
              </text>
              {/* Connection to ETT */}
              <line
                x1="220"
                y1="135"
                x2="200"
                y2="180"
                stroke="hsl(var(--primary))"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <text
                x="260"
                y="180"
                textAnchor="middle"
                className="fill-foreground"
                style={{ fontSize: 11, fontWeight: 700 }}
              >
                Self-inflating bag + reservoir
              </text>
              <text
                x="260"
                y="196"
                textAnchor="middle"
                className="fill-muted-foreground"
                style={{ fontSize: 10 }}
              >
                FiO₂ 1.0 · gentle squeeze 10–12/min
              </text>
              {/* Air puff to patient */}
              <circle
                cx={200 - bagSqueeze * 8}
                cy={180 + bagSqueeze * 6}
                r={3 + bagSqueeze * 4}
                className="fill-primary/60"
              />
            </g>
  
            {/* PHASE 1 — Transport ventilator */}
            <g style={{ opacity: phase === 1 ? 1 : 0.15, transition: "opacity 300ms" }}>
              <rect
                x="380"
                y="60"
                width="160"
                height="120"
                rx="10"
                className="fill-card stroke-foreground"
                strokeWidth="2"
              />
              <text
                x="460"
                y="82"
                textAnchor="middle"
                className="fill-foreground"
                style={{ fontSize: 11, fontWeight: 700 }}
              >
                Transport ventilator
              </text>
              {/* Pressure waveform */}
              <polyline
                points={Array.from({ length: 30 }, (_, i) => {
                  const x = 395 + i * 4.7;
                  const phaseShift = (i / 30 + t * 4) % 1;
                  const y = 140 - 30 * Math.max(0, Math.sin(phaseShift * Math.PI * 2));
                  return `${x},${y}`;
                }).join(" ")}
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
              />
              <line x1="395" y1="140" x2="535" y2="140" stroke="hsl(var(--border))" strokeWidth="1" />
              <text
                x="460"
                y="160"
                textAnchor="middle"
                className="fill-muted-foreground"
                style={{ fontSize: 9 }}
              >
                VT 6 mL/kg · PEEP · FiO₂ replicated
              </text>
              <text
                x="460"
                y="172"
                textAnchor="middle"
                className="fill-muted-foreground"
                style={{ fontSize: 9 }}
              >
                Observe ≥15 min before departure
              </text>
              {/* Circuit to patient */}
              <path
                d={`M 380 150 Q 280 ${190 + ventBreath * 6} 200 180`}
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* ETCO2 sidestream connector */}
              <circle cx="240" cy="186" r="5" className="fill-amber-500" />
              <text
                x="240"
                y="208"
                textAnchor="middle"
                className="fill-amber-700 dark:fill-amber-300"
                style={{ fontSize: 9, fontWeight: 700 }}
              >
                ETCO₂
              </text>
            </g>
  
            {/* PHASE 2 — O2 planning + integrity */}
            <g style={{ opacity: phase === 2 ? 1 : 0.15, transition: "opacity 300ms" }}>
              {/* Cylinder 1 */}
              <g transform="translate(560, 60)">
                <rect
                  x="0"
                  y="0"
                  width="36"
                  height="110"
                  rx="8"
                  className="fill-card stroke-foreground"
                  strokeWidth="2"
                />
                <rect
                  x="3"
                  y={3 + cylDrain * 60}
                  width="30"
                  height={104 - cylDrain * 60}
                  rx="6"
                  className="fill-emerald-500/40"
                />
                <text
                  x="18"
                  y="130"
                  textAnchor="middle"
                  className="fill-foreground"
                  style={{ fontSize: 9, fontWeight: 700 }}
                >
                  E-cyl 680 L
                </text>
              </g>
              <g transform="translate(610, 60)">
                <rect
                  x="0"
                  y="0"
                  width="36"
                  height="110"
                  rx="8"
                  className="fill-card stroke-foreground"
                  strokeWidth="2"
                />
                <rect
                  x="3"
                  y={3 + cylDrain * 30}
                  width="30"
                  height={104 - cylDrain * 30}
                  rx="6"
                  className="fill-emerald-500/40"
                />
                <text
                  x="18"
                  y="130"
                  textAnchor="middle"
                  className="fill-foreground"
                  style={{ fontSize: 9, fontWeight: 700 }}
                >
                  Spare
                </text>
              </g>
              {/* Calculation block */}
              <g transform="translate(380, 60)">
                <rect
                  x="0"
                  y="0"
                  width="160"
                  height="110"
                  rx="8"
                  className="fill-secondary stroke-border"
                  strokeWidth="1"
                />
                <text
                  x="80"
                  y="20"
                  textAnchor="middle"
                  className="fill-foreground"
                  style={{ fontSize: 11, fontWeight: 700 }}
                >
                  O₂ planning
                </text>
                <text
                  x="12"
                  y="42"
                  className="fill-muted-foreground"
                  style={{ fontSize: 10 }}
                >
                  MV × FiO₂ + driving gas
                </text>
                <text
                  x="12"
                  y="60"
                  className="fill-muted-foreground"
                  style={{ fontSize: 10 }}
                >
                  × duration × 2 safety
                </text>
                <text
                  x="12"
                  y="82"
                  className="fill-foreground"
                  style={{ fontSize: 11, fontWeight: 700 }}
                >
                  e.g. 5 L/min × 90 = 450 L
                </text>
                <text
                  x="12"
                  y="98"
                  className="fill-foreground"
                  style={{ fontSize: 11, fontWeight: 700 }}
                >
                  → carry ≥ 900 L
                </text>
              </g>
  
              {/* Disconnection sentinel — shows a brief alarm flash mid phase */}
              <g
                transform="translate(80, 80)"
                style={{
                  opacity:
                    phase === 2 && Math.sin((t - 0.66) * Math.PI * 14) > 0.5 ? 1 : 0.35,
                  transition: "opacity 200ms",
                }}
              >
                <rect
                  x="0"
                  y="0"
                  width="200"
                  height="80"
                  rx="8"
                  className="fill-destructive/10 stroke-destructive"
                  strokeWidth="2"
                />
                <text
                  x="100"
                  y="22"
                  textAnchor="middle"
                  className="fill-destructive"
                  style={{ fontSize: 11, fontWeight: 700 }}
                >
                  Loss of ETCO₂ trace
                </text>
                <text
                  x="100"
                  y="42"
                  textAnchor="middle"
                  className="fill-foreground"
                  style={{ fontSize: 9 }}
                >
                  Disconnection / extubation
                </text>
                <text
                  x="100"
                  y="58"
                  textAnchor="middle"
                  className="fill-foreground"
                  style={{ fontSize: 9 }}
                >
                  until proven otherwise
                </text>
                <text
                  x="100"
                  y="72"
                  textAnchor="middle"
                  className="fill-muted-foreground"
                  style={{ fontSize: 8 }}
                >
                  hand-ventilate · check circuit · re-attach
                </text>
              </g>
            </g>
  
            {/* Timeline bar */}
            <g transform="translate(80, 295)">
              <rect x="0" y="0" width="560" height="3" rx="1.5" className="fill-muted" />
              <rect
                x="0"
                y="0"
                width={560 * t}
                height="3"
                rx="1.5"
                className="fill-primary"
              />
            </g>
          </svg>
        </div>
  
        {/* Legend / take-home */}
        <ul className="mt-3 grid gap-1.5 text-xs text-muted-foreground sm:grid-cols-3">
          <li>
            <span className="font-semibold text-foreground">Bag-valve</span>: FiO₂ 1.0,
            self-inflating bag + reservoir, gentle 10–12/min while moving between ventilators.
          </li>
          <li>
            <span className="font-semibold text-foreground">Transport vent</span>: replicate ICU
            settings, observe waveform &amp; ETCO₂ ≥15 min before departure; recruit lung first.
          </li>
          <li>
            <span className="font-semibold text-foreground">O₂ &amp; integrity</span>: flow × time × 2
            safety; carry a spare cylinder; treat lost ETCO₂ trace as disconnection until proven
            otherwise.
          </li>
        </ul>
      </figure>
    </DiagramFigure>
  );
};

export default TransportVentilationDiagram;

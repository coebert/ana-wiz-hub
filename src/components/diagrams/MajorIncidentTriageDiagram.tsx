import { useEffect, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { svgNodeProps } from "./_shared/DiagramFigure";

/**
 * Animated major-incident triage flow.
 *
 * Four timed phases on a single timeline:
 *   1. METHANE alert from scene
 *   2. Triage Sieve at scene (walking → breathing → RR → CRT/HR)
 *   3. Triage Sort (TRTS) at hospital
 *   4. Casualty stream into P1/P2/P3/Dead with periodic re-triage
 *
 * Pure SVG + React state. ~12s cycle.
 */

const CYCLE_MS = 12000;
const PHASES = [
  { id: 0, label: "METHANE alert", t0: 0.0, t1: 0.2 },
  { id: 1, label: "Triage Sieve (scene)", t0: 0.2, t1: 0.55 },
  { id: 2, label: "Triage Sort / TRTS (ED)", t0: 0.55, t1: 0.8 },
  { id: 3, label: "Stream & re-triage", t0: 0.8, t1: 1.0 },
];

const phaseAt = (p: number) => {
  if (p < 0.2) return 0;
  if (p < 0.55) return 1;
  if (p < 0.8) return 2;
  return 3;
};

const PRIORITY = {
  P1: { label: "P1 Immediate", color: "hsl(var(--destructive))", text: "destructive" },
  P2: { label: "P2 Urgent", color: "hsl(38 92% 50%)", text: "" },
  P3: { label: "P3 Delayed", color: "hsl(142 71% 45%)", text: "" },
  P4: { label: "P4 Expectant", color: "hsl(var(--muted-foreground))", text: "muted-foreground" },
  DEAD: { label: "Dead", color: "hsl(var(--foreground))", text: "foreground" },
} as const;

export const MajorIncidentTriageDiagram = () => {
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

  // Sieve decision: which step is illuminated 0..3 (Walking, Breathing, RR, CRT/HR)
  const sieveStepRaw = phase === 1 ? ((t - 0.2) / 0.35) * 4 : 0;
  const sieveStep = Math.min(3, Math.floor(sieveStepRaw));

  // Stream flow progress in phase 3
  const streamP = phase === 3 ? (t - 0.8) / 0.2 : 0;

  return (
    <figure className="my-6 rounded-xl border border-border bg-card p-4 md:p-5">
      <figcaption className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            Major-incident triage flow: METHANE → Sieve → Sort → Stream
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Animated walkthrough of the UK major-incident triage chain. Re-triage occurs at every node;
            categories are dynamic, not fixed.
          </p>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setT(0)}
            aria-label="Restart"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </figcaption>

      {/* Timeline */}
      <div className="mb-3">
        <div className="flex gap-1">
          {PHASES.map((p) => {
            const active = phase === p.id;
            const done = phase > p.id;
            return (
              <div
                key={p.id}
                className={cn(
                  "flex-1 rounded-md border px-2 py-1.5 text-[11px] font-medium transition-colors",
                  active
                    ? "border-primary bg-primary/10 text-primary"
                    : done
                    ? "border-border bg-muted/50 text-muted-foreground"
                    : "border-border bg-background text-muted-foreground"
                )}
              >
                {p.id + 1}. {p.label}
              </div>
            );
          })}
        </div>
        <div className="mt-1.5 h-1 w-full overflow-hidden rounded bg-muted">
          <div
            className="h-full bg-primary transition-[width] duration-100"
            style={{ width: `${t * 100}%` }}
          />
        </div>
      </div>

      {/* Diagram */}
      <div className="rounded-lg border border-border bg-background p-3">
        <svg viewBox="0 0 800 360" className="w-full h-auto" role="img" aria-label="Triage flow">
          {/* ===== Phase 0: METHANE radio bubble ===== */}
          <g {...svgNodeProps("Step 1/4: METHANE alert from scene")} opacity={phase === 0 ? 1 : 0.18} style={{ transition: "opacity 300ms" }}>
            <rect x="20" y="20" width="220" height="120" rx="10" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="1.5" />
            <text x="32" y="42" fontSize="13" fontWeight="700" fill="hsl(var(--primary))">METHANE</text>
            <text x="32" y="60" fontSize="10" fill="hsl(var(--foreground))"><tspan fontWeight="700">M</tspan>ajor incident declared</text>
            <text x="32" y="74" fontSize="10" fill="hsl(var(--foreground))"><tspan fontWeight="700">E</tspan>xact location · <tspan fontWeight="700">T</tspan>ype</text>
            <text x="32" y="88" fontSize="10" fill="hsl(var(--foreground))"><tspan fontWeight="700">H</tspan>azards · <tspan fontWeight="700">A</tspan>ccess</text>
            <text x="32" y="102" fontSize="10" fill="hsl(var(--foreground))"><tspan fontWeight="700">N</tspan>umber of casualties</text>
            <text x="32" y="116" fontSize="10" fill="hsl(var(--foreground))"><tspan fontWeight="700">E</tspan>mergency services</text>
            {/* radio waves */}
            {phase === 0 && [0, 1, 2].map((i) => {
              const r = 8 + ((t * 5 + i / 3) % 1) * 30;
              const o = 1 - ((t * 5 + i / 3) % 1);
              return <circle key={i} cx="240" cy="80" r={r} fill="none" stroke="hsl(var(--primary))" strokeWidth="1" opacity={o * 0.8} />;
            })}
          </g>

          {/* Arrow to scene */}
          <path d="M 250 80 L 290 80" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" markerEnd="url(#arr)" opacity={phase >= 1 ? 1 : 0.3} />

          <defs>
            <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--muted-foreground))" />
            </marker>
          </defs>

          {/* ===== Phase 1: Triage Sieve decision tree ===== */}
          <g {...svgNodeProps("Step 2/4: Triage Sieve at scene")} opacity={phase === 1 ? 1 : phase > 1 ? 0.35 : 0.15} style={{ transition: "opacity 300ms" }}>
            <text x="300" y="35" fontSize="12" fontWeight="700" fill="hsl(var(--foreground))">Triage Sieve (&lt; 30 s per casualty)</text>

            {[
              { y: 55, q: "Walking?", yes: "→ P3 Delayed", no: "↓ next", color: PRIORITY.P3.color },
              { y: 100, q: "Breathing after airway opening?", yes: "↓ next", no: "→ Dead", color: PRIORITY.DEAD.color },
              { y: 145, q: "RR < 10 or > 29?", yes: "→ P1 Immediate", no: "↓ next", color: PRIORITY.P1.color },
              { y: 190, q: "CRT > 2 s or HR > 120?", yes: "→ P1 Immediate", no: "→ P2 Urgent", color: PRIORITY.P1.color },
            ].map((row, i) => {
              const active = phase === 1 && sieveStep === i;
              return (
                <g key={i} {...svgNodeProps(`Decision ${i + 1}/4: ${row.q} (yes ${row.yes}; no ${row.no})`)}>
                  <rect
                    x="300"
                    y={row.y}
                    width="220"
                    height="32"
                    rx="6"
                    fill={active ? "hsl(var(--primary) / 0.12)" : "hsl(var(--card))"}
                    stroke={active ? "hsl(var(--primary))" : "hsl(var(--border))"}
                    strokeWidth={active ? 1.6 : 1}
                  />
                  <text x="310" y={row.y + 14} fontSize="11" fontWeight="600" fill="hsl(var(--foreground))">{row.q}</text>
                  <text x="310" y={row.y + 27} fontSize="9.5" fill="hsl(var(--muted-foreground))">
                    YES {row.yes}  ·  NO {row.no}
                  </text>
                </g>
              );
            })}
          </g>

          {/* Arrow Sieve → Sort */}
          <path d="M 530 130 L 565 130" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" markerEnd="url(#arr)" opacity={phase >= 2 ? 1 : 0.3} />

          {/* ===== Phase 2: Triage Sort / TRTS ===== */}
          <g {...svgNodeProps("Step 3/4: Triage Sort (TRTS) at ED")} opacity={phase === 2 ? 1 : phase > 2 ? 0.35 : 0.15} style={{ transition: "opacity 300ms" }}>
            <text x="575" y="35" fontSize="12" fontWeight="700" fill="hsl(var(--foreground))">Triage Sort — TRTS (ED)</text>
            <rect x="575" y="50" width="205" height="170" rx="8" fill="hsl(var(--card))" stroke="hsl(var(--border))" />
            <text x="585" y="68" fontSize="10" fontWeight="600" fill="hsl(var(--foreground))">Score 0–4 each:</text>
            <text x="585" y="84" fontSize="10" fill="hsl(var(--muted-foreground))">• Respiratory rate</text>
            <text x="585" y="98" fontSize="10" fill="hsl(var(--muted-foreground))">• Systolic BP</text>
            <text x="585" y="112" fontSize="10" fill="hsl(var(--muted-foreground))">• GCS</text>

            <line x1="585" y1="124" x2="770" y2="124" stroke="hsl(var(--border))" />

            <text x="585" y="142" fontSize="11" fontWeight="700" fill={PRIORITY.P1.color}>TRTS ≤ 10 → P1</text>
            <text x="585" y="160" fontSize="11" fontWeight="700" fill="hsl(38 92% 45%)">TRTS = 11 → P2</text>
            <text x="585" y="178" fontSize="11" fontWeight="700" fill={PRIORITY.P3.color}>TRTS = 12 → P3</text>
            <text x="585" y="200" fontSize="9" fill="hsl(var(--muted-foreground))">Senior up- or down-grades</text>
            <text x="585" y="212" fontSize="9" fill="hsl(var(--muted-foreground))">on clinical judgement.</text>
          </g>

          {/* ===== Phase 3: Casualty stream ===== */}
          <g {...svgNodeProps("Step 4/4: Stream and re-triage every 15 min")} opacity={phase === 3 ? 1 : 0.2} style={{ transition: "opacity 300ms" }}>
            <text x="20" y="245" fontSize="12" fontWeight="700" fill="hsl(var(--foreground))">Stream to area · re-triage every 15 min</text>

            {/* Lanes */}
            {[
              { x: 20, label: "P1 Resus", color: PRIORITY.P1.color, n: 4 },
              { x: 175, label: "P2 Majors", color: "hsl(38 92% 50%)", n: 6 },
              { x: 330, label: "P3 Minors", color: PRIORITY.P3.color, n: 8 },
              { x: 485, label: "P4 Expectant", color: PRIORITY.P4.color, n: 2 },
              { x: 640, label: "Deceased", color: "hsl(var(--foreground))", n: 2 },
            ].map((lane) => (
              <g key={lane.label} {...svgNodeProps(`Outcome: ${lane.label} (${lane.n} casualties)`)}>
                <rect x={lane.x} y={260} width={140} height={80} rx={6} fill="hsl(var(--card))" stroke={lane.color} strokeWidth="1" />
                <text x={lane.x + 8} y={278} fontSize="10.5" fontWeight="700" fill={lane.color}>{lane.label}</text>
                {/* casualty dots populating with streamP */}
                {Array.from({ length: lane.n }).map((_, i) => {
                  const reveal = streamP * lane.n;
                  const visible = i < reveal;
                  return (
                        <circle
                      key={i}
                      cx={lane.x + 14 + (i % 6) * 18}
                      cy={300 + Math.floor(i / 6) * 18}
                      r={5}
                      fill={lane.color}
                      opacity={visible ? 0.9 : 0.15}
                      style={{ transition: "opacity 200ms" }}
                    />
  );
                })}
              </g>
            ))}

            {/* Re-triage loop arrow */}
            {phase === 3 && (
              <g>
                <path
                  d="M 90 260 C 90 230, 250 230, 250 260"
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                  markerEnd="url(#arr)"
                />
                <text x="125" y="232" fontSize="10" fontWeight="600" fill="hsl(var(--primary))">re-triage</text>
              </g>
            )}
          </g>
        </svg>
      </div>

      {/* Phase explainer */}
      <div className="mt-3 grid gap-2 text-xs md:grid-cols-2">
        {phase === 0 && (
          <p className="md:col-span-2 text-muted-foreground">
            <span className="font-semibold text-foreground">METHANE</span> is the structured first message from
            scene. It triggers the hospital cascade and command structure (Gold/Silver/Bronze) before any patient arrives.
          </p>
        )}
        {phase === 1 && (
          <p className="md:col-span-2 text-muted-foreground">
            <span className="font-semibold text-foreground">Triage Sieve</span> is a &lt; 30 s physiological
            sort done at the casualty's location. Walking patients are P3; apnoeic patients despite airway opening
            are declared dead; deranged RR or perfusion = P1.
          </p>
        )}
        {phase === 2 && (
          <p className="md:col-span-2 text-muted-foreground">
            <span className="font-semibold text-foreground">Triage Sort</span> uses the Triage Revised Trauma
            Score (RR + SBP + GCS, each 0–4) to refine priority on hospital arrival. A senior clinician can
            up- or down-grade based on mechanism and clinical impression.
          </p>
        )}
        {phase === 3 && (
          <p className="md:col-span-2 text-muted-foreground">
            Casualties are streamed to <span className="font-semibold text-foreground">geographically distinct areas</span>
            {" "}(resus / majors / minors / expectant / deceased) and re-triaged every 15 min — physiology
            evolves faster than triage labels. P4 (expectant) is reserved for situations where demand vastly
            exceeds capacity and is a senior decision.
          </p>
        )}
      </div>

      {/* Legend */}
      <div className="mt-3 flex flex-wrap gap-3 text-[11px] text-muted-foreground">
        {Object.entries(PRIORITY).map(([k, v]) => (
          <div key={k} className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: v.color }} />
            <span>{v.label}</span>
          </div>
        ))}
      </div>
    </figure>
  );
};

export default MajorIncidentTriageDiagram;

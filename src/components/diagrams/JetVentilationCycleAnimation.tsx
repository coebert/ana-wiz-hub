import { useEffect, useRef, useState } from "react";
import { DiagramFigure } from "./_shared/DiagramFigure";

/**
 * JetVentilationCycleAnimation — animated single-breath cycle for low-frequency
 * supraglottic jet ventilation. Visualises the four checkpoints the operator
 * must verify on every breath:
 *   1. Jet pulse delivered through the injector
 *   2. Chest rise during inspiration
 *   3. Passive expiration with full chest fall (long expiratory time)
 *   4. STOP signal if the chest does not move
 */

type Phase = "insp" | "hold" | "exp" | "rest";

interface Cycle {
  phase: Phase;
  duration: number; // ms
  label: string;
  hint: string;
}

// Total ≈ 4 s = 15 breaths · min⁻¹, I:E ≈ 1:3
const NORMAL_CYCLE: Cycle[] = [
  { phase: "insp", duration: 800, label: "Jet pulse — inspiration", hint: "Watch the chest rise" },
  { phase: "hold", duration: 300, label: "End-inspiratory pause", hint: "Confirm bilateral expansion" },
  { phase: "exp", duration: 2400, label: "Passive expiration", hint: "Chest must fall fully — gas exits the way it came in" },
  { phase: "rest", duration: 500, label: "Pre-breath check", hint: "Expiratory pathway clear?" },
];

export default function JetVentilationCycleAnimation() {
  const [running, setRunning] = useState(true);
  const [chestObstructed, setChestObstructed] = useState(false);
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [progress, setProgress] = useState(0); // 0..1 within phase
  const [stopAlert, setStopAlert] = useState(false);
  const [breathCount, setBreathCount] = useState(0);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  const phase = NORMAL_CYCLE[phaseIdx];

  useEffect(() => {
    if (!running) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      startRef.current = null;
      return;
    }
    const tick = (t: number) => {
      if (startRef.current == null) startRef.current = t;
      const elapsed = t - startRef.current;
      const p = Math.min(1, elapsed / phase.duration);
      setProgress(p);
      if (p >= 1) {
        startRef.current = null;
        const next = (phaseIdx + 1) % NORMAL_CYCLE.length;
        setPhaseIdx(next);
        if (next === 0) setBreathCount((c) => c + 1);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [running, phaseIdx, phase.duration]);

  // Trigger stop alert after one full breath if chest is "obstructed"
  useEffect(() => {
    if (chestObstructed && running && breathCount >= 1) {
      setStopAlert(true);
      setRunning(false);
    }
  }, [chestObstructed, breathCount, running]);

  const reset = () => {
    setRunning(false);
    setStopAlert(false);
    setChestObstructed(false);
    setPhaseIdx(0);
    setProgress(0);
    setBreathCount(0);
    startRef.current = null;
    setTimeout(() => setRunning(true), 50);
  };

  // Visual mappings
  // Chest expansion factor 0..1 (clamped if obstructed)
  let chestRise = 0;
  if (phase.phase === "insp") chestRise = chestObstructed ? 0.05 : progress;
  else if (phase.phase === "hold") chestRise = chestObstructed ? 0.05 : 1;
  else if (phase.phase === "exp") chestRise = chestObstructed ? 0.05 : 1 - progress;
  else chestRise = 0;

  // Jet stream visibility (only during insp)
  const jetActive = phase.phase === "insp";
  const jetIntensity = jetActive ? 0.3 + 0.7 * Math.sin(Math.PI * progress) : 0;

  // Expiratory flow particles during exp
  const expFlow = phase.phase === "exp" ? Math.sin(Math.PI * progress) : 0;

  const chestY = 110 - chestRise * 18; // top of chest moves up
  const diaphragmY = 175 + chestRise * 10; // diaphragm descends

  return (
    <DiagramFigure
      id="jet-ventilation-cycle-animation"
      title="Jet ventilation cycle"
      description="Auto-generated wrapper for the Jet ventilation cycle animated physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <div className="w-full rounded-lg border border-border bg-card p-4">
        <div className="flex flex-col gap-1 mb-3">
          <h3 className="text-lg font-serif font-semibold text-foreground">
            Jet ventilation — breath cycle
          </h3>
          <p className="text-xs text-muted-foreground">
            Low-frequency supraglottic jet at ~15 min⁻¹, I:E 1:3. Every breath is a four-step verification:
            deliver, look for chest rise, allow full passive exhalation, then re-check before the next pulse.
          </p>
        </div>
  
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,260px] gap-4">
          {/* Animation panel */}
          <div className="relative rounded-md border border-border bg-background overflow-hidden">
            <svg viewBox="0 0 420 260" className="w-full h-auto" role="img" aria-label="Animated jet ventilation breath cycle">
              <defs>
                <linearGradient id="jvc-chest" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--clinical) / 0.18)" />
                  <stop offset="100%" stopColor="hsl(var(--clinical) / 0.05)" />
                </linearGradient>
                <radialGradient id="jvc-jet" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                </radialGradient>
              </defs>
  
              {/* Torso silhouette */}
              <path
                d={`M 90 ${chestY} Q 110 ${chestY - 8} 210 ${chestY - 8} Q 310 ${chestY - 8} 330 ${chestY} L 320 220 Q 210 232 100 220 Z`}
                fill="url(#jvc-chest)"
                stroke="hsl(var(--clinical))"
                strokeWidth="1.5"
              />
              {/* Ribs (suggestive) */}
              {[0, 1, 2].map((i) => (
                <path
                  key={i}
                  d={`M 110 ${chestY + 18 + i * 22} Q 210 ${chestY + 10 + i * 22} 310 ${chestY + 18 + i * 22}`}
                  stroke="hsl(var(--clinical) / 0.35)"
                  strokeWidth="1"
                  fill="none"
                />
              ))}
              {/* Diaphragm */}
              <path
                d={`M 100 ${diaphragmY} Q 210 ${diaphragmY + 18} 320 ${diaphragmY}`}
                stroke="hsl(var(--clinical))"
                strokeWidth="1.5"
                fill="none"
                strokeDasharray="3 3"
              />
  
              {/* Trachea */}
              <rect x="200" y="40" width="20" height={chestY - 40 + 6} rx="4" fill="hsl(var(--muted))" stroke="hsl(var(--border))" />
              {/* Larynx */}
              <path d="M 192 36 L 228 36 L 224 50 L 196 50 Z" fill="hsl(var(--muted))" stroke="hsl(var(--border))" />
  
              {/* Sanders injector — angled cannula */}
              <line x1="150" y1="20" x2="206" y2="44" stroke="hsl(var(--foreground))" strokeWidth="3" strokeLinecap="round" />
              <circle cx="150" cy="20" r="5" fill="hsl(var(--foreground))" />
              <text x="138" y="14" fontSize="9" fill="hsl(var(--muted-foreground))" textAnchor="end">
                jet source 1–4 bar
              </text>
  
              {/* Jet stream during inspiration */}
              {jetActive && (
                <>
                  <ellipse
                    cx="210"
                    cy={70 + progress * 40}
                    rx="6"
                    ry={10 + progress * 12}
                    fill="url(#jvc-jet)"
                    opacity={jetIntensity}
                  />
                  {/* Entrainment arrows */}
                  <g opacity={jetIntensity * 0.7} stroke="hsl(var(--primary))" strokeWidth="1" fill="none">
                    <path d="M 175 55 Q 195 60 204 64" markerEnd="url(#jvc-arrow)" />
                    <path d="M 245 55 Q 225 60 216 64" markerEnd="url(#jvc-arrow)" />
                  </g>
                </>
              )}
  
              {/* Expiratory flow during exp */}
              {phase.phase === "exp" && (
                <g opacity={expFlow} stroke="hsl(var(--accent-foreground))" strokeWidth="1.5" fill="none">
                  <path d="M 210 60 Q 200 40 178 28" markerEnd="url(#jvc-arrow-exp)" />
                  <path d="M 210 60 Q 220 40 242 28" markerEnd="url(#jvc-arrow-exp)" />
                </g>
              )}
  
              <defs>
                <marker id="jvc-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--primary))" />
                </marker>
                <marker id="jvc-arrow-exp" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--accent-foreground))" />
                </marker>
              </defs>
  
              {/* Chest-rise indicator bar */}
              <g transform="translate(360, 60)">
                <rect x="0" y="0" width="14" height="120" rx="3" fill="hsl(var(--muted))" stroke="hsl(var(--border))" />
                <rect
                  x="0"
                  y={120 - chestRise * 120}
                  width="14"
                  height={chestRise * 120}
                  rx="3"
                  fill={chestObstructed ? "hsl(var(--destructive))" : "hsl(var(--clinical))"}
                />
                <text x="7" y="194" fontSize="9" fill="hsl(var(--muted-foreground))" textAnchor="middle">chest</text>
                <text x="7" y="206" fontSize="9" fill="hsl(var(--muted-foreground))" textAnchor="middle">rise</text>
              </g>
  
              {/* STOP overlay */}
              {stopAlert && (
                <g>
                  <rect x="0" y="0" width="420" height="260" fill="hsl(var(--destructive) / 0.12)" />
                  <rect x="80" y="100" width="260" height="60" rx="6" fill="hsl(var(--destructive))" stroke="hsl(var(--border))" strokeWidth="0.75" />
                  <text x="210" y="128" fontSize="18" fontWeight="700" fill="hsl(var(--destructive-foreground))" textAnchor="middle">
                    STOP JETTING
                  </text>
                  <text x="210" y="148" fontSize="10" fill="hsl(var(--destructive-foreground))" textAnchor="middle">
                    No chest rise → suspect obstructed expiration / misplaced injector
                  </text>
                </g>
              )}
            </svg>
          </div>
  
          {/* Side panel — phase + controls */}
          <div className="flex flex-col gap-3">
            <div className="rounded-md border border-border bg-background p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Phase</span>
                <span className="text-[10px] font-mono text-muted-foreground">breath {breathCount + 1}</span>
              </div>
              <div className="text-sm font-semibold text-foreground">{phase.label}</div>
              <div className="text-xs text-muted-foreground mt-1">{phase.hint}</div>
              {/* Phase progress */}
              <div className="mt-2 h-1.5 w-full bg-muted rounded">
                <div
                  className="h-full rounded bg-primary transition-[width] duration-75"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
              {/* Phase chips */}
              <div className="mt-3 grid grid-cols-4 gap-1">
                {NORMAL_CYCLE.map((c, i) => (
                  <div
                    key={c.phase}
                    className={`text-[9px] text-center rounded px-1 py-1 border ${
                      i === phaseIdx
                        ? "bg-primary/15 border-primary text-foreground"
                        : "bg-muted/40 border-border text-muted-foreground"
                    }`}
                  >
                    {c.phase === "insp" ? "Insp" : c.phase === "hold" ? "Hold" : c.phase === "exp" ? "Exp" : "Check"}
                  </div>
                ))}
              </div>
            </div>
  
            <div className="rounded-md border border-border bg-background p-3 space-y-2">
              <button
                onClick={() => setRunning((r) => !r)}
                className="w-full text-xs font-medium rounded bg-primary text-primary-foreground py-1.5 hover:opacity-90 transition"
              >
                {running ? "Pause cycle" : stopAlert ? "Cycle stopped" : "Resume cycle"}
              </button>
              <button
                onClick={() => setChestObstructed((v) => !v)}
                className={`w-full text-xs font-medium rounded py-1.5 border transition ${
                  chestObstructed
                    ? "bg-destructive text-destructive-foreground border-destructive"
                    : "bg-background text-foreground border-border hover:bg-muted"
                }`}
              >
                {chestObstructed ? "Restoring chest movement…" : "Simulate: no chest rise"}
              </button>
              <button
                onClick={reset}
                className="w-full text-xs rounded border border-border bg-background py-1.5 hover:bg-muted transition"
              >
                Reset
              </button>
            </div>
  
            <div className="rounded-md border border-destructive/40 bg-destructive/5 p-3">
              <div className="text-[10px] uppercase tracking-wider text-destructive font-semibold mb-1">
                Stop criteria
              </div>
              <ul className="text-[11px] text-foreground/85 list-disc list-inside space-y-0.5">
                <li>No chest rise on a delivered jet</li>
                <li>Failure of full passive exhalation</li>
                <li>Rising airway pressure / falling SpO₂</li>
                <li>Subcutaneous emphysema or sudden compliance change</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DiagramFigure>
  );
}

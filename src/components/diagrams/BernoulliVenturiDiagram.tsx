import { useEffect, useRef, useState } from "react";
import { DiagramFigure } from "./_shared/DiagramFigure";

type Mode = "bernoulli" | "venturi";

const W = 600;
const H = 320;

// Pipe geometry — symmetrical converging-diverging "venturi" tube.
// y as a function of x, returning {top, bottom} of the inner pipe wall.
const pipeProfile = (x: number) => {
  // Wide ends, narrow throat at x ≈ 300
  const wide = 70; // half-height at the ends
  const narrow = 22; // half-height at throat
  const throatX = 300;
  const throatWidth = 90;
  const dx = Math.abs(x - throatX);
  let half: number;
  if (dx > throatWidth + 90) {
    half = wide;
  } else if (dx > throatWidth) {
    // Smooth cosine taper
    const t = (dx - throatWidth) / 90;
    const eased = 0.5 - 0.5 * Math.cos(t * Math.PI);
    half = narrow + (wide - narrow) * eased;
  } else {
    half = narrow;
  }
  return { top: H / 2 - half, bottom: H / 2 + half, half };
};

// Pipe outline path
const buildPipePath = (xMin: number, xMax: number, step = 4) => {
  const top: string[] = [];
  const bottom: string[] = [];
  for (let x = xMin; x <= xMax; x += step) {
    const p = pipeProfile(x);
    top.push(`${x === xMin ? "M" : "L"} ${x} ${p.top.toFixed(2)}`);
    bottom.push(`L ${x} ${p.bottom.toFixed(2)}`);
  }
  return top.join(" ") + " " + bottom.reverse().join(" ") + " Z";
};

const PIPE_X_MIN = 40;
const PIPE_X_MAX = 560;

interface Particle {
  id: number;
  x: number;
  yOffset: number; // -1..1 vertical position within pipe
  hue: number;
}

interface EntrainParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  side: "top" | "bottom";
}

export const BernoulliVenturiDiagram = () => {
  const [mode, setMode] = useState<Mode>("bernoulli");
  const [running, setRunning] = useState(true);
  const [tick, setTick] = useState(0);
  const rafRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const entrainRef = useRef<EntrainParticle[]>([]);
  const idRef = useRef(0);
  const lastSpawnRef = useRef(0);
  const lastEntrainRef = useRef(0);

  // Initialise main flow particles once
  useEffect(() => {
    if (particlesRef.current.length === 0) {
      const init: Particle[] = [];
      for (let i = 0; i < 40; i++) {
        init.push({
          id: idRef.current++,
          x: PIPE_X_MIN + (i / 40) * (PIPE_X_MAX - PIPE_X_MIN),
          yOffset: (Math.random() - 0.5) * 1.6,
          hue: 200 + Math.random() * 30,
        });
      }
      particlesRef.current = init;
    }
  }, []);

  useEffect(() => {
    if (!running) return;
    const step = () => {
      // Update main flow particles
      particlesRef.current = particlesRef.current.map((p) => {
        const profile = pipeProfile(p.x);
        // Velocity inversely proportional to area (continuity).
        // Use half-height as a proxy (1D pipe).
        const v = 1.5 * (70 / Math.max(profile.half, 8));
        let nextX = p.x + v;
        if (nextX > PIPE_X_MAX) {
          nextX = PIPE_X_MIN + (nextX - PIPE_X_MAX);
        }
        return { ...p, x: nextX };
      });

      // Spawn entrainment particles (only in venturi mode)
      if (mode === "venturi") {
        if (performance.now() - lastEntrainRef.current > 110) {
          lastEntrainRef.current = performance.now();
          // Side port positions
          const portX = 300;
          ([
            { side: "top" as const, y: H / 2 - 70 - 30 },
            { side: "bottom" as const, y: H / 2 + 70 + 30 },
          ]).forEach(({ side, y }) => {
            for (let i = 0; i < 2; i++) {
              entrainRef.current.push({
                id: idRef.current++,
                x: portX + (Math.random() - 0.5) * 18,
                y: y + (Math.random() - 0.5) * 10,
                vx: (Math.random() - 0.5) * 0.6,
                vy: side === "top" ? 1.3 + Math.random() * 0.6 : -(1.3 + Math.random() * 0.6),
                side,
              });
            }
          });
        }

        entrainRef.current = entrainRef.current
          .map((ep) => {
            // Accelerate toward throat as they near it (low pressure suction)
            const dx = 300 - ep.x;
            const ax = dx * 0.0015;
            // Once inside the pipe, sweep them along with the main flow
            const insidePipe =
              ep.y > pipeProfile(ep.x).top + 2 && ep.y < pipeProfile(ep.x).bottom - 2;
            const newVx = insidePipe ? ep.vx + 0.35 : ep.vx + ax;
            const newVy = insidePipe ? ep.vy * 0.85 : ep.vy;
            return { ...ep, x: ep.x + newVx, y: ep.y + newVy, vx: newVx, vy: newVy };
          })
          .filter((ep) => ep.x > 20 && ep.x < PIPE_X_MAX + 20 && ep.y > -20 && ep.y < H + 20);
      } else {
        entrainRef.current = [];
      }

      setTick((t) => (t + 1) % 1000000);
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [running, mode]);

  const pipePath = buildPipePath(PIPE_X_MIN, PIPE_X_MAX);

  // Manometer columns at three points: inlet (x=100), throat (x=300), outlet (x=500)
  const stations = [
    { x: 100, label: "P₁", area: pipeProfile(100).half },
    { x: 300, label: "P₂", area: pipeProfile(300).half },
    { x: 500, label: "P₃", area: pipeProfile(500).half },
  ];
  // Pressure ~ 1/v² (Bernoulli, simplified). Use half-area as proxy for area.
  const pressureFor = (halfArea: number) => {
    const v = 1 / halfArea;
    const p = 1 - 0.5 * v * v * 8000; // tuned constant for visual range
    return Math.max(0.1, Math.min(1, p));
  };

  return (
    <DiagramFigure
      id="bernoulli-venturi-diagram"
      title="Bernoulli & Venturi effects — animated flow through a constriction"
      description="Animated converging-diverging tube showing how velocity rises and lateral pressure falls at the throat (Bernoulli), and how the resulting low pressure entrains gas through side ports (Venturi)."
    >
      <div className="w-full max-w-2xl mx-auto">
        <div className="flex flex-wrap gap-2 justify-center mb-3">
          <button
            onClick={() => setMode("bernoulli")}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
              mode === "bernoulli"
                ? "bg-physics/10 border-physics text-physics"
                : "border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            Bernoulli effect
          </button>
          <button
            onClick={() => setMode("venturi")}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
              mode === "venturi"
                ? "bg-physics/10 border-physics text-physics"
                : "border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            Venturi effect
          </button>
          <button
            onClick={() => setRunning((r) => !r)}
            className="px-3 py-1.5 rounded-lg text-sm font-medium border border-border text-muted-foreground hover:bg-muted"
          >
            {running ? "Pause" : "Play"}
          </button>
        </div>

        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto"
          role="img"
          aria-label={
            mode === "bernoulli"
              ? "Animated Bernoulli demonstration: fluid speeds up and lateral pressure falls at the throat"
              : "Animated Venturi demonstration: low pressure at the throat draws air in through side entrainment ports"
          }
        >
          <defs>
            <linearGradient id="pipe-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--muted))" stopOpacity="0.4" />
              <stop offset="50%" stopColor="hsl(var(--muted))" stopOpacity="0.15" />
              <stop offset="100%" stopColor="hsl(var(--muted))" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="press-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="hsl(var(--physics) / 0.8)" />
              <stop offset="50%" stopColor="hsl(var(--destructive) / 0.7)" />
              <stop offset="100%" stopColor="hsl(var(--physics) / 0.8)" />
            </linearGradient>
          </defs>

          {/* Pressure gradient strip (under pipe) — shows visual cue: low pressure at throat */}
          <rect x={PIPE_X_MIN} y={H - 22} width={PIPE_X_MAX - PIPE_X_MIN} height={6} fill="url(#press-grad)" rx={2} opacity={0.7} />
          <text x={PIPE_X_MIN} y={H - 4} fontSize="10" className="fill-muted-foreground">High P</text>
          <text x={W / 2} y={H - 4} textAnchor="middle" fontSize="10" fill="hsl(var(--destructive))" className="font-semibold">Low P (throat)</text>
          <text x={PIPE_X_MAX} y={H - 4} textAnchor="end" fontSize="10" className="fill-muted-foreground">High P</text>

          {/* Side entrainment ports (only shown in venturi mode) */}
          {mode === "venturi" && (
            <>
              {/* Top port */}
              <rect x={290} y={H / 2 - 70 - 35} width={20} height={35} fill="hsl(var(--background))" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
              <text x={300} y={H / 2 - 70 - 42} textAnchor="middle" fontSize="10" className="fill-muted-foreground">Air in</text>
              {/* Bottom port */}
              <rect x={290} y={H / 2 + 70} width={20} height={35} fill="hsl(var(--background))" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
              <text x={300} y={H / 2 + 70 + 50} textAnchor="middle" fontSize="10" className="fill-muted-foreground">Air in</text>
            </>
          )}

          {/* Pipe body */}
          <path d={pipePath} fill="url(#pipe-grad)" stroke="hsl(var(--foreground))" strokeWidth="2" />

          {/* Flow particles */}
          {particlesRef.current.map((p) => {
            const profile = pipeProfile(p.x);
            const half = profile.half - 4;
            const y = H / 2 + p.yOffset * half;
            const v = 1.5 * (70 / Math.max(profile.half, 8));
            const len = Math.min(20, 4 + v * 2.5);
            return (
              <line
                key={p.id}
                x1={p.x - len}
                y1={y}
                x2={p.x}
                y2={y}
                stroke={`hsl(${p.hue} 70% 55%)`}
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity={0.85}
              />
            );
          })}

          {/* Entrainment particles (venturi only) */}
          {mode === "venturi" &&
            entrainRef.current.map((ep) => (
              <circle
                key={ep.id}
                cx={ep.x}
                cy={ep.y}
                r={2}
                fill="hsl(var(--clinical))"
                opacity={0.85}
              />
            ))}

          {/* Manometers */}
          {stations.map((s) => {
            const p = pressureFor(s.area);
            const colHeight = p * 60;
            const baseY = pipeProfile(s.x).top - 6;
            return (
              <g key={s.label}>
                {/* Tube */}
                <rect
                  x={s.x - 5}
                  y={baseY - 70}
                  width={10}
                  height={70}
                  fill="hsl(var(--background))"
                  stroke="hsl(var(--foreground))"
                  strokeWidth="1"
                />
                {/* Fluid column */}
                <rect
                  x={s.x - 5}
                  y={baseY - colHeight}
                  width={10}
                  height={colHeight}
                  fill="hsl(var(--physics))"
                  opacity={0.85}
                />
                <text x={s.x} y={baseY - 76} textAnchor="middle" fontSize="11" className="fill-foreground font-semibold">
                  {s.label}
                </text>
              </g>
            );
          })}

          {/* Velocity arrows above pipe */}
          {[100, 300, 500].map((x) => {
            const half = pipeProfile(x).half;
            const v = 1.5 * (70 / Math.max(half, 8));
            const len = v * 14;
            const y = pipeProfile(x).bottom + 18;
            return (
              <g key={`vel-${x}`}>
                <line
                  x1={x - len / 2}
                  y1={y}
                  x2={x + len / 2}
                  y2={y}
                  stroke="hsl(var(--clinical))"
                  strokeWidth="2"
                  markerEnd="url(#vel-arrow)"
                />
                <text x={x} y={y + 14} textAnchor="middle" fontSize="10" fill="hsl(var(--clinical))" className="font-semibold">
                  v {x === 300 ? "↑↑" : "↓"}
                </text>
              </g>
            );
          })}

          <defs>
            <marker id="vel-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="hsl(var(--clinical))" />
            </marker>
          </defs>

          {/* Annotations */}
          <text x={300} y={26} textAnchor="middle" fontSize="12" fill="hsl(var(--destructive))" className="font-semibold">
            Throat: ↑ velocity, ↓ pressure
          </text>
        </svg>

        <div className="mt-4 grid sm:grid-cols-2 gap-3 text-sm">
          {mode === "bernoulli" ? (
            <>
              <div className="p-3 rounded-md bg-secondary/40 border border-border">
                <p className="font-semibold text-foreground">Bernoulli's principle</p>
                <p className="text-muted-foreground mt-1">
                  For incompressible, steady, frictionless flow:
                </p>
                <p className="font-mono text-xs text-foreground mt-1">P + ½ρv² + ρgh = constant</p>
                <p className="text-muted-foreground mt-1">
                  Conservation of energy along a streamline. Rising kinetic energy (velocity) is paid for by falling pressure energy.
                </p>
              </div>
              <div className="p-3 rounded-md bg-secondary/40 border border-border">
                <p className="font-semibold text-foreground">Continuity equation</p>
                <p className="font-mono text-xs text-foreground mt-1">A₁v₁ = A₂v₂</p>
                <p className="text-muted-foreground mt-1">
                  In a narrowing tube, area falls so velocity must rise to keep mass flow constant — which then drives the pressure drop seen in the manometers.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="p-3 rounded-md bg-secondary/40 border border-border">
                <p className="font-semibold text-foreground">Venturi effect</p>
                <p className="text-muted-foreground mt-1">
                  The sub-atmospheric pressure at the throat draws ("entrains") gas in through side ports. Final FiO₂ is set by the
                  <strong> entrainment ratio</strong> = air flow / O₂ flow. Larger ports → more air → lower FiO₂.
                </p>
              </div>
              <div className="p-3 rounded-md bg-secondary/40 border border-border">
                <p className="font-semibold text-foreground">Clinical applications</p>
                <ul className="text-muted-foreground mt-1 list-disc list-inside space-y-0.5">
                  <li><strong>Venturi (fixed-performance) O₂ masks</strong> — accurate FiO₂ 24–60% independent of breathing pattern</li>
                  <li><strong>Jet ventilation & nebulisers</strong> — high-velocity gas entrains air or aerosol</li>
                  <li><strong>Suction (wall, Venturi-type)</strong> and <strong>scavenging</strong> systems</li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </DiagramFigure>
  );
};

export default BernoulliVenturiDiagram;

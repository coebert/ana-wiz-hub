import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { DiagramFigure } from "./_shared/DiagramFigure";

type Regime = "low" | "normal" | "high";

const REGIME_LABEL: Record<Regime, string> = {
  low: "Low flow (e.g. neonate)",
  normal: "Normal adult VT",
  high: "High flow (cough / panting)",
};

// Calibration curve — Wright under-reads at low flows, over-reads at high flows
// Returns the displayed VT for a given true VT (ml)
const displayedVT = (trueVT: number, regime: Regime) => {
  if (regime === "low") return trueVT * 0.78;
  if (regime === "high") return trueVT * 1.18;
  return trueVT * 1.0;
};

const TRUE_VT: Record<Regime, number> = {
  low: 80,
  normal: 500,
  high: 1100,
};

// Turbine spin speed (revs/sec at rendered scale)
const SPIN_SPEED: Record<Regime, number> = {
  low: 0.6,
  normal: 1.6,
  high: 3.0,
};

const WrightRespirometerDiagram = () => {
  const [regime, setRegime] = useState<Regime>("normal");
  const [running, setRunning] = useState(true);
  const [angle, setAngle] = useState(0); // turbine rotation
  const [breath, setBreath] = useState(0); // breath cycle 0..1, advances during inspiration

  const rafRef = useRef<number | null>(null);
  const lastT = useRef<number>(performance.now());

  useEffect(() => {
    if (!running) return;
    const tick = (t: number) => {
      const dt = (t - lastT.current) / 1000;
      lastT.current = t;
      setAngle((a) => (a + dt * SPIN_SPEED[regime] * 360) % 360);
      // Breath cycle: 4 s per breath
      setBreath((b) => (b + dt / 4) % 1);
      rafRef.current = requestAnimationFrame(tick);
    };
    lastT.current = performance.now();
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [running, regime]);

  // Inspiratory phase: 0..0.4 of the cycle (quick in, slower out)
  const inspiring = breath < 0.4;
  const expiring = breath >= 0.5 && breath < 0.95;
  const flowing = inspiring || expiring;

  // Cumulative displayed volume across breath
  const trueVT = TRUE_VT[regime];
  const dispVT = displayedVT(trueVT, regime);
  const _accumulating = inspiring;
  const cycleProgress = inspiring ? breath / 0.4 : 1;
  const liveDisplayedVolume = dispVT * cycleProgress;
  const error = ((dispVT - trueVT) / trueVT) * 100;

  // Vane positions — 4 vanes around centre
  const vanes = Array.from({ length: 4 }).map((_, i) => {
    const a = ((angle + i * 90) * Math.PI) / 180;
    return { a };
  });

  // Particles entering through the slit — tangential entry to spin the turbine
  const nParticles = flowing ? 6 : 0;
  const particles = Array.from({ length: nParticles }).map((_, i) => {
    const t = (breath * 6 + i / nParticles) % 1;
    // Curved path: start at left tangential slit, spiral toward centre
    const startX = 60;
    const startY = 130;
    const cx = 200;
    const _cy = 130;
    const x = startX + (cx - startX) * t;
    const y = startY - Math.sin(t * Math.PI) * 20;
    return { x, y, t };
  });

  return (
    <DiagramFigure
      id="wright-respirometer-diagram"
      title="Wright respirometer"
      description="Auto-generated wrapper for the Wright respirometer anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <div className="border border-border rounded-lg p-4 mb-6 bg-card">
        <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
          <div>
            <h3 className="text-lg font-serif font-bold text-foreground">
              Wright respirometer — turbine vane flowmeter
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Tangential gas inflow spins a low-mass mica vane; gearing converts
              revolutions to a dial reading of expired tidal &amp; minute volume.
              Inertia under-reads at low flow, momentum over-reads at high flow.
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setRunning((r) => !r)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-primary bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {running ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              {running ? "Pause" : "Play"}
            </button>
            <button
              type="button"
              onClick={() => {
                setRunning(false);
                setAngle(0);
                setBreath(0);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-border bg-background text-muted-foreground hover:bg-accent/40"
              aria-label="Reset"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          </div>
        </div>
  
        {/* Regime selector */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-xs text-muted-foreground">Flow regime:</span>
          {(Object.keys(REGIME_LABEL) as Regime[]).map((r) => (
            <button
              key={r}
              onClick={() => setRegime(r)}
              className={`px-2.5 py-1 rounded text-xs font-medium border transition-all ${
                regime === r
                  ? "border-primary/50 bg-primary/10 text-foreground"
                  : "border-border text-muted-foreground hover:bg-accent/40"
              }`}
            >
              {REGIME_LABEL[r]}
            </button>
          ))}
        </div>
  
        <div className="grid lg:grid-cols-[1fr_220px] gap-4 items-start">
          <svg viewBox="0 0 400 260" className="w-full">
            <defs>
              <radialGradient id="wr-housing" cx="0.5" cy="0.5" r="0.6">
                <stop offset="0" stopColor="hsl(var(--secondary))" stopOpacity="0.6" />
                <stop offset="1" stopColor="hsl(var(--secondary))" stopOpacity="0.2" />
              </radialGradient>
              <marker id="wr-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6" fill="hsl(var(--primary))" />
              </marker>
            </defs>
  
            {/* Patient / circuit label */}
            <text x="30" y="125" fontSize="9" fill="hsl(var(--muted-foreground))" textAnchor="start">
              Expired
            </text>
            <text x="30" y="138" fontSize="9" fill="hsl(var(--muted-foreground))" textAnchor="start">
              gas
            </text>
  
            {/* Inlet tube with tangential slit */}
            <path d="M55,120 L100,120 L130,135 L130,150" fill="none" stroke="hsl(var(--border))" strokeWidth="2" />
            <path d="M55,140 L100,140 L130,155 L130,150" fill="none" stroke="hsl(var(--border))" strokeWidth="2" />
  
            {/* Housing */}
            <circle cx="200" cy="130" r="55" fill="url(#wr-housing)" stroke="hsl(var(--border))" strokeWidth="2" />
            <circle cx="200" cy="130" r="48" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" opacity="0.6" />
  
            {/* Tangential entry (slit into housing) */}
            <line x1="130" y1="135" x2="155" y2="115" stroke="hsl(195 80% 55%)" strokeWidth="2" opacity="0.7" />
            <line x1="130" y1="150" x2="155" y2="130" stroke="hsl(195 80% 55%)" strokeWidth="2" opacity="0.7" />
  
            {/* Vanes (rotating) */}
            <g transform={`rotate(${angle} 200 130)`}>
              {vanes.map((v, i) => {
                const x2 = 200 + Math.cos(v.a) * 38;
                const y2 = 130 + Math.sin(v.a) * 38;
                return (
                  <g key={i}>
                    <line
                      x1={200}
                      y1={130}
                      x2={x2}
                      y2={y2}
                      stroke="hsl(210 60% 55%)"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    {/* vane blade */}
                    <ellipse
                      cx={(200 + x2) / 2}
                      cy={(130 + y2) / 2}
                      rx="20"
                      ry="3"
                      fill="hsl(210 60% 55%)"
                      fillOpacity="0.4"
                      transform={`rotate(${(v.a * 180) / Math.PI} ${(200 + x2) / 2} ${(130 + y2) / 2})`}
                    />
                  </g>
                );
              })}
              <circle cx="200" cy="130" r="4" fill="hsl(var(--foreground))" opacity="0.7" />
            </g>
  
            {/* Outlet (top right) */}
            <path d="M250,110 L290,110 L290,150 L250,150" fill="none" stroke="hsl(var(--border))" strokeWidth="2" />
            <text x="295" y="125" fontSize="8" fill="hsl(var(--muted-foreground))">to atmosphere</text>
            <text x="295" y="135" fontSize="8" fill="hsl(var(--muted-foreground))">/ scavenger</text>
  
            {/* Flow particles */}
            {particles.map((p, i) => (
              <circle
                key={i}
                cx={p.x}
                cy={p.y}
                r="2.2"
                fill="hsl(195 80% 55%)"
                fillOpacity={0.4 + (1 - p.t) * 0.5}
              />
            ))}
  
            {/* Flow direction arrow */}
            {flowing && (
              <>
                <line x1="60" y1="90" x2="100" y2="90" stroke="hsl(var(--primary))" strokeWidth="1.5" markerEnd="url(#wr-arrow)" />
                <text x="80" y="83" fontSize="8" fill="hsl(var(--muted-foreground))" textAnchor="middle">
                  {inspiring ? "Expired flow in" : "Tail"}
                </text>
              </>
            )}
  
            {/* Gear linkage to dial */}
            <line x1="200" y1="75" x2="200" y2="40" stroke="hsl(var(--border))" strokeWidth="1.5" strokeDasharray="3 2" />
            {/* Small gears */}
            <circle cx="200" cy="50" r="6" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
            <circle cx="212" cy="50" r="4" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
  
            {/* Dial */}
            <g transform="translate(330,50)">
              <circle r="32" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="2" />
              {/* Tick marks */}
              {Array.from({ length: 12 }).map((_, i) => {
                const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
                return (
                      <line
                    key={i}
                    x1={Math.cos(a) * 24}
                    y1={Math.sin(a) * 24}
                    x2={Math.cos(a) * 28}
                    y2={Math.sin(a) * 28}
                    stroke="hsl(var(--muted-foreground))"
                    strokeWidth="1"
                  />
    );
              })}
              {/* Needle — angle proportional to volume accrued this cycle */}
              <line
                x1="0"
                y1="0"
                x2={Math.cos((liveDisplayedVolume / 1500) * Math.PI * 2 - Math.PI / 2) * 20}
                y2={Math.sin((liveDisplayedVolume / 1500) * Math.PI * 2 - Math.PI / 2) * 20}
                stroke="hsl(0 70% 55%)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle r="2.5" fill="hsl(var(--foreground))" />
              <text y="-12" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))">
                VT (mL)
              </text>
            </g>
  
            {/* Title for flow phase */}
            <text x="200" y="225" fontSize="9" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="600">
              {inspiring ? "Expiration through respirometer →" : expiring ? "Slow trailing flow" : "Pause"}
            </text>
            <text x="200" y="240" fontSize="7.5" fill="hsl(var(--muted-foreground))" textAnchor="middle">
              Vanes spin proportional to flow; dial integrates revolutions → volume
            </text>
          </svg>
  
          {/* Live readouts */}
          <div className="space-y-2">
            <div className="rounded-lg border border-border p-3 bg-secondary/30">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">True VT</p>
              <p className="text-lg font-mono font-bold text-foreground tabular-nums">
                {trueVT.toFixed(0)}{" "}
                <span className="text-xs text-muted-foreground">mL</span>
              </p>
            </div>
            <div className="rounded-lg border border-border p-3 bg-secondary/30">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Displayed VT</p>
              <p className="text-lg font-mono font-bold text-foreground tabular-nums">
                {dispVT.toFixed(0)}{" "}
                <span className="text-xs text-muted-foreground">mL</span>
              </p>
              <div className="h-1.5 rounded-full bg-background mt-1 overflow-hidden">
                <div
                  className="h-full transition-all"
                  style={{
                    width: `${Math.min(100, (liveDisplayedVolume / 1500) * 100)}%`,
                    background: "hsl(210 60% 55%)",
                  }}
                />
              </div>
            </div>
            <div
              className={`rounded-lg border p-3 ${
                Math.abs(error) < 5
                  ? "border-primary/30 bg-primary/5"
                  : error < 0
                    ? "border-amber-500/40 bg-amber-500/10"
                    : "border-orange-500/40 bg-orange-500/10"
              }`}
            >
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Calibration error</p>
              <p className="text-lg font-mono font-bold text-foreground tabular-nums">
                {error > 0 ? "+" : ""}
                {error.toFixed(0)}%
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                {error < -5
                  ? "Inertia under-reads"
                  : error > 5
                    ? "Momentum over-reads"
                    : "Within calibrated range"}
              </p>
            </div>
          </div>
        </div>
  
        <div className="grid sm:grid-cols-2 gap-3 mt-4">
          <div className="rounded-lg border border-border p-3">
            <p className="text-xs font-semibold text-foreground mb-1">Strengths</p>
            <ul className="text-[11px] text-muted-foreground list-disc list-inside space-y-0.5">
              <li>Compact, mechanical, no electrical supply needed</li>
              <li>Reads tidal &amp; minute volume directly</li>
              <li>Largely independent of gas composition</li>
            </ul>
          </div>
          <div className="rounded-lg border border-border p-3">
            <p className="text-xs font-semibold text-foreground mb-1">Pitfalls</p>
            <ul className="text-[11px] text-muted-foreground list-disc list-inside space-y-0.5">
              <li>Under-reads at low flow (vane inertia must be overcome)</li>
              <li>Over-reads at high flow (vane momentum continues after flow stops)</li>
              <li>Unidirectional — typically placed on expiratory limb</li>
              <li>Damaged by water vapour, debris &amp; reverse flow</li>
            </ul>
          </div>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default WrightRespirometerDiagram;

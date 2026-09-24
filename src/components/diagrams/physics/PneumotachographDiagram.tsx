import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { DiagramFigure } from "../_shared/DiagramFigure";

type Variant = "fleisch" | "lilly";

const PneumotachographDiagram = () => {
  const [variant, setVariant] = useState<Variant>("fleisch");
  const [running, setRunning] = useState(true);
  // Flow as a normalized value 0..1 representing the inspiratory→expiratory cycle
  const [phase, setPhase] = useState(0); // radians
  const rafRef = useRef<number | null>(null);
  const lastT = useRef<number>(performance.now());

  useEffect(() => {
    if (!running) return;
    const tick = (t: number) => {
      const dt = (t - lastT.current) / 1000;
      lastT.current = t;
      setPhase((p) => (p + dt * 1.4) % (Math.PI * 2)); // ~1 breath per 4.5 s
      rafRef.current = requestAnimationFrame(tick);
    };
    lastT.current = performance.now();
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [running]);

  // Flow signal: -1 (expiration) ... +1 (inspiration). Sinusoidal-ish but with sharper inspiration.
  const flow = Math.sin(phase);
  const absFlow = Math.abs(flow);
  // Pressure drop ΔP is linearly proportional to flow for a pneumotachograph (laminar element)
  const dp = flow; // proportional
  // Cumulative volume = integral of inspiratory flow (visual only) — approximate over current cycle
  const cycleVolume = Math.max(0, 1 - Math.cos(phase)) / 2; // 0..1 during inspiration, drops during expiration

  // Direction of flow particles
  const dir = flow >= 0 ? 1 : -1;
  const speed = absFlow; // 0..1

  // 8 particles spread along the tube, animated by the time phase
  const particles = Array.from({ length: 9 }).map((_, i) => {
    const baseX = (i / 8) * 220 + 90; // x positions across the tube interior
    // Offset by phase × speed × direction; wrap within the tube interior 90..310
    const range = 220;
    const offset = ((phase * 80 * dir + i * 12) % range + range) % range;
    const x = 90 + offset;
    return { id: i, x, baseX };
  });

  return (
    <DiagramFigure
      id="pneumotachograph-diagram"
      title="Pneumotachograph"
      description="Pneumotachograph: labelled teaching figure showing the structures, relationships and key values FRCA and FFICM candidates need to recognise and explain."
    >
              <div className="border border-border rounded-lg p-4 mb-6 bg-card">
        <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
          <div>
            <h3 className="text-lg font-serif font-bold text-foreground">
              Pneumotachograph — flow → pressure drop
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              A laminar resistance element generates a pressure drop proportional
              to flow (ΔP ∝ Q). Watch flow direction reverse with the breath; the
              differential transducer reads the pressure either side of the
              resistor.
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
                setPhase(0);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-border bg-background text-muted-foreground hover:bg-accent/40"
              aria-label="Reset"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          </div>
        </div>
  
        {/* Variant toggle */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs text-muted-foreground">Resistance element:</span>
          {(
            [
              { k: "fleisch", label: "Fleisch (parallel capillaries)" },
              { k: "lilly", label: "Lilly (mesh screen)" },
            ] as const
          ).map((opt) => (
            <button
              key={opt.k}
              onClick={() => setVariant(opt.k)}
              className={`px-2.5 py-1 rounded text-xs font-medium border transition-all ${
                variant === opt.k
                  ? "border-primary/50 bg-primary/10 text-foreground"
                  : "border-border text-muted-foreground hover:bg-accent/40"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
  
        <div className="grid lg:grid-cols-[1fr_220px] gap-4 items-start">
          <svg viewBox="0 0 400 240" className="w-full">
            <defs>
              <linearGradient id="pn-tube" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="hsl(var(--secondary))" stopOpacity="0.5" />
                <stop offset="1" stopColor="hsl(var(--secondary))" stopOpacity="0.15" />
              </linearGradient>
              <marker id="pn-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6" fill="hsl(var(--primary))" />
              </marker>
            </defs>
  
            {/* Patient label */}
            <text x="40" y="60" fontSize="9" fill="hsl(var(--muted-foreground))" textAnchor="middle">
              Patient
            </text>
            <text x="40" y="72" fontSize="9" fill="hsl(var(--muted-foreground))" textAnchor="middle">
              airway
            </text>
  
            {/* Machine label */}
            <text x="360" y="60" fontSize="9" fill="hsl(var(--muted-foreground))" textAnchor="middle">
              Ventilator /
            </text>
            <text x="360" y="72" fontSize="9" fill="hsl(var(--muted-foreground))" textAnchor="middle">
              spirometer
            </text>
  
            {/* Tube body */}
            <rect x="80" y="100" width="240" height="50" rx="10" fill="url(#pn-tube)" stroke="hsl(var(--border))" strokeWidth="1.5" />
  
            {/* Connectors */}
            <rect x="55" y="110" width="28" height="30" rx="3" fill="hsl(var(--secondary))" stroke="hsl(var(--border))" />
            <rect x="317" y="110" width="28" height="30" rx="3" fill="hsl(var(--secondary))" stroke="hsl(var(--border))" />
  
            {/* Resistance element in centre */}
            {variant === "fleisch" ? (
              <g>
                {/* Bundle of capillaries — many thin tubes */}
                {Array.from({ length: 10 }).map((_, i) => (
                  <line
                    key={i}
                    x1={170}
                    x2={230}
                    y1={106 + i * 4}
                    y2={106 + i * 4}
                    stroke="hsl(210 60% 55%)"
                    strokeWidth="1"
                    opacity="0.6"
                  />
                ))}
                <text x="200" y="170" fontSize="8" fill="hsl(var(--muted-foreground))" textAnchor="middle">
                  Bundle of fine capillaries
                </text>
              </g>
            ) : (
              <g>
                {/* Mesh screen — crosshatch */}
                <rect x="190" y="105" width="20" height="40" fill="hsl(210 60% 55%)" fillOpacity="0.15" stroke="hsl(210 60% 55%)" strokeWidth="1" />
                {Array.from({ length: 10 }).map((_, i) => (
                  <line
                    key={`v${i}`}
                    x1={190 + i * 2}
                    x2={190 + i * 2}
                    y1={105}
                    y2={145}
                    stroke="hsl(210 60% 55%)"
                    strokeWidth="0.5"
                    opacity="0.7"
                  />
                ))}
                {Array.from({ length: 10 }).map((_, i) => (
                  <line
                    key={`h${i}`}
                    x1={190}
                    x2={210}
                    y1={105 + i * 4}
                    y2={105 + i * 4}
                    stroke="hsl(210 60% 55%)"
                    strokeWidth="0.5"
                    opacity="0.7"
                  />
                ))}
                <text x="200" y="170" fontSize="8" fill="hsl(var(--muted-foreground))" textAnchor="middle">
                  Fine wire mesh screen
                </text>
              </g>
            )}
  
            {/* Pressure tap left */}
            <line x1="140" y1="100" x2="140" y2="60" stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.6" />
            <circle cx="140" cy="100" r="2" fill="hsl(var(--foreground))" opacity="0.7" />
            {/* Pressure tap right */}
            <line x1="260" y1="100" x2="260" y2="60" stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.6" />
            <circle cx="260" cy="100" r="2" fill="hsl(var(--foreground))" opacity="0.7" />
  
            {/* Differential pressure transducer */}
            <rect x="170" y="20" width="60" height="30" rx="6" fill="hsl(var(--card))" stroke="hsl(var(--border))" />
            <text x="200" y="38" fontSize="8" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="600">
              ΔP transducer
            </text>
            {/* connect taps to transducer */}
            <line x1="140" y1="60" x2="180" y2="50" stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.6" />
            <line x1="260" y1="60" x2="220" y2="50" stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.6" />
  
            {/* Pressure indicators (size scales with |dp|) */}
            {(() => {
              const r = 4 + Math.abs(dp) * 9;
              // Higher pressure side is "upstream" of the resistance, lower side "downstream"
              const leftHigh = flow > 0;
              return (
                    <g>
                  <circle
                    cx="140"
                    cy="80"
                    r={leftHigh ? r : r * 0.4}
                    fill={leftHigh ? "hsl(0 70% 55%)" : "hsl(210 60% 55%)"}
                    fillOpacity="0.5"
                  />
                  <circle
                    cx="260"
                    cy="80"
                    r={leftHigh ? r * 0.4 : r}
                    fill={leftHigh ? "hsl(210 60% 55%)" : "hsl(0 70% 55%)"}
                    fillOpacity="0.5"
                  />
                  <text x="140" y="95" fontSize="7" fill="hsl(var(--muted-foreground))" textAnchor="middle">P₁</text>
                  <text x="260" y="95" fontSize="7" fill="hsl(var(--muted-foreground))" textAnchor="middle">P₂</text>
                </g>
    );
            })()}
  
            {/* Particles (gas molecules) flowing through the tube */}
            {particles.map((p) => (
              <circle
                key={p.id}
                cx={p.x}
                cy={115 + ((p.id * 13) % 30)}
                r={1.8}
                fill={flow > 0 ? "hsl(195 80% 55%)" : "hsl(25 85% 55%)"}
                fillOpacity={0.35 + speed * 0.5}
              />
            ))}
  
            {/* Flow direction arrow */}
            {speed > 0.05 && (
              <line
                x1={flow > 0 ? 90 : 310}
                x2={flow > 0 ? 130 : 270}
                y1={185}
                y2={185}
                stroke="hsl(var(--primary))"
                strokeWidth={1 + speed * 2}
                markerEnd="url(#pn-arrow)"
                opacity={0.4 + speed * 0.6}
              />
            )}
            <text x="200" y="188" fontSize="8" fill="hsl(var(--muted-foreground))" textAnchor="middle">
              {flow > 0.05
                ? "Inspiration →"
                : flow < -0.05
                  ? "← Expiration"
                  : "End-tidal pause"}
            </text>
  
            {/* Equation */}
            <text x="200" y="215" fontSize="9" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="600">
              Q = ΔP · (πr⁴ / 8ηl) — ΔP ∝ Flow (linear in laminar regime)
            </text>
            <text x="200" y="228" fontSize="7.5" fill="hsl(var(--muted-foreground))" textAnchor="middle">
              ∫ Q dt = Volume — output integrated to give tidal volume
            </text>
          </svg>
  
          {/* Live readouts */}
          <div className="space-y-2">
            <div className="rounded-lg border border-border p-3 bg-secondary/30">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Flow (Q)</p>
              <p className="text-lg font-mono font-bold text-foreground tabular-nums">
                {(flow * 60).toFixed(1)}{" "}
                <span className="text-xs text-muted-foreground">L/min</span>
              </p>
              <div className="h-1.5 rounded-full bg-background mt-1 overflow-hidden">
                <div
                  className="h-full transition-all"
                  style={{
                    width: `${Math.min(100, absFlow * 100)}%`,
                    background: flow >= 0 ? "hsl(195 80% 55%)" : "hsl(25 85% 55%)",
                    marginLeft: flow >= 0 ? 0 : `${100 - absFlow * 100}%`,
                  }}
                />
              </div>
            </div>
            <div className="rounded-lg border border-border p-3 bg-secondary/30">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">ΔP across resistor</p>
              <p className="text-lg font-mono font-bold text-foreground tabular-nums">
                {(dp * 2).toFixed(2)}{" "}
                <span className="text-xs text-muted-foreground">cmH₂O</span>
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5">Linear with Q</p>
            </div>
            <div className="rounded-lg border border-border p-3 bg-secondary/30">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Integrated VT</p>
              <p className="text-lg font-mono font-bold text-foreground tabular-nums">
                {(cycleVolume * 500).toFixed(0)}{" "}
                <span className="text-xs text-muted-foreground">mL</span>
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5">Σ Q · dt</p>
            </div>
          </div>
        </div>
  
        <div className="grid sm:grid-cols-2 gap-3 mt-4">
          <div className="rounded-lg border border-border p-3">
            <p className="text-xs font-semibold text-foreground mb-1">Strengths</p>
            <ul className="text-[11px] text-muted-foreground list-disc list-inside space-y-0.5">
              <li>Linear, fast response — captures dynamic flow waveform</li>
              <li>Bidirectional (inspiratory & expiratory)</li>
              <li>Integration gives accurate tidal volume</li>
            </ul>
          </div>
          <div className="rounded-lg border border-border p-3">
            <p className="text-xs font-semibold text-foreground mb-1">Pitfalls</p>
            <ul className="text-[11px] text-muted-foreground list-disc list-inside space-y-0.5">
              <li>Resistance changes with gas viscosity, density &amp; temperature</li>
              <li>Water vapour or secretions block capillaries/mesh → drift</li>
              <li>Fleisch is heated to ≈37 °C to prevent condensation</li>
            </ul>
          </div>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default PneumotachographDiagram;

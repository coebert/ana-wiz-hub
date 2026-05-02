import { useState, useEffect } from "react";

/**
 * Animated diagram: gut → hepatic portal vein → liver → systemic circulation.
 * Visualises first-pass metabolism by showing drug particles being extracted
 * as they traverse hepatic sinusoids. Extraction ratio (ER) is user-adjustable.
 */
const PortalFirstPassDiagram = () => {
  const [er, setEr] = useState(0.7); // extraction ratio 0–1
  const [playing, setPlaying] = useState(true);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setTick((t) => (t + 1) % 1000), 40);
    return () => clearInterval(id);
  }, [playing]);

  const W = 560;
  const H = 360;

  // Particle pool: each has an offset along the journey (0..1)
  const N_PARTICLES = 18;
  const particles = Array.from({ length: N_PARTICLES }, (_, i) => {
    const phase = (tick * 0.012 + i / N_PARTICLES) % 1;
    return { id: i, p: phase };
  });

  // Path waypoints along the journey:
  //   0.00 → 0.20  gut capillary bed (oral drug enters)
  //   0.20 → 0.40  portal vein
  //   0.40 → 0.70  hepatic sinusoids (extraction window)
  //   0.70 → 0.85  hepatic vein → IVC
  //   0.85 → 1.00  systemic arterial circulation
  const positionAt = (p: number): { x: number; y: number } => {
    if (p < 0.2) {
      // through gut wall
      const t = p / 0.2;
      return { x: 80 + t * 80, y: 280 };
    }
    if (p < 0.4) {
      // portal vein: rises diagonally up to liver inferior border
      const t = (p - 0.2) / 0.2;
      return { x: 160 + t * 120, y: 280 - t * 100 };
    }
    if (p < 0.7) {
      // through liver sinusoids (horizontal sweep)
      const t = (p - 0.4) / 0.3;
      return { x: 280 + t * 140, y: 180 - Math.sin(t * Math.PI) * 8 };
    }
    if (p < 0.85) {
      // hepatic vein → IVC ascending
      const t = (p - 0.7) / 0.15;
      return { x: 420 + t * 30, y: 180 - t * 60 };
    }
    // systemic circulation (top loop)
    const t = (p - 0.85) / 0.15;
    return { x: 450 - t * 380, y: 120 + Math.sin(t * Math.PI) * -10 };
  };

  // Whether a particle has been extracted by the liver
  const isExtracted = (i: number, p: number) => {
    if (p < 0.4) return false;
    // Deterministic pseudo-random per particle id
    const r = ((i * 9301 + 49297) % 233280) / 233280;
    // Extraction occurs progressively across the sinusoid window
    if (p < 0.7) {
      const through = (p - 0.4) / 0.3;
      return r < er * through;
    }
    return r < er;
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">
        Portal Circulation & First-Pass Metabolism
      </h3>

      <div className="bg-card rounded-xl border border-border p-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img"
          aria-label="Animated diagram of oral drug travelling through gut, portal vein, liver sinusoids and into systemic circulation, showing first-pass extraction.">
          <defs>
            <marker id="pf-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="hsl(var(--muted-foreground))" />
            </marker>
            <radialGradient id="pf-liver" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="hsl(15, 55%, 55%)" />
              <stop offset="100%" stopColor="hsl(10, 60%, 35%)" />
            </radialGradient>
            <linearGradient id="pf-portal" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(260, 50%, 55%)" />
              <stop offset="100%" stopColor="hsl(260, 50%, 40%)" />
            </linearGradient>
            <linearGradient id="pf-hepvein" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="hsl(210, 65%, 50%)" />
              <stop offset="100%" stopColor="hsl(210, 65%, 35%)" />
            </linearGradient>
          </defs>

          {/* Systemic arterial circulation arc (top) */}
          <path d="M 70 120 Q 260 60 450 120" fill="none"
            stroke="hsl(0, 70%, 55%)" strokeWidth="14" strokeLinecap="round" opacity={0.18} />
          <path d="M 70 120 Q 260 60 450 120" fill="none"
            stroke="hsl(0, 70%, 55%)" strokeWidth="3" strokeLinecap="round" />
          <text x={260} y={70} textAnchor="middle" fontSize="11"
            className="fill-foreground font-semibold">Systemic circulation</text>

          {/* Gut */}
          <rect x={40} y={250} width={130} height={70} rx={14}
            fill="hsl(35, 55%, 70%)" stroke="hsl(30, 50%, 40%)" strokeWidth="1.5" opacity={0.85} />
          <text x={105} y={295} textAnchor="middle" fontSize="11"
            className="fill-foreground font-semibold">Gut</text>
          <text x={105} y={310} textAnchor="middle" fontSize="9"
            className="fill-muted-foreground">(oral drug absorbed)</text>

          {/* Portal vein */}
          <path d="M 160 280 Q 220 260 280 180" stroke="url(#pf-portal)"
            strokeWidth="14" fill="none" strokeLinecap="round" />
          <text x={195} y={245} fontSize="10" className="fill-foreground font-semibold"
            transform="rotate(-35, 195, 245)">Hepatic portal vein</text>

          {/* Liver */}
          <path d="M 280 130 Q 340 110 430 125 Q 470 145 460 200 Q 420 235 340 230 Q 285 220 270 180 Z"
            fill="url(#pf-liver)" stroke="hsl(10, 60%, 25%)" strokeWidth="1.5" />
          <text x={365} y={155} textAnchor="middle" fontSize="12"
            className="font-semibold" fill="hsl(45, 100%, 95%)">Liver</text>
          <text x={365} y={170} textAnchor="middle" fontSize="9"
            fill="hsl(45, 100%, 95%)" opacity={0.9}>sinusoids · CYP450</text>

          {/* Sinusoid cross-hatch hint */}
          {[0, 1, 2, 3].map((i) => (
            <line key={i} x1={295 + i * 35} y1={195} x2={295 + i * 35} y2={215}
              stroke="hsl(45, 100%, 95%)" strokeWidth="0.8" opacity={0.4} />
          ))}

          {/* Hepatic vein → IVC */}
          <path d="M 430 180 Q 450 150 450 120" stroke="url(#pf-hepvein)"
            strokeWidth="10" fill="none" strokeLinecap="round" />
          <text x={465} y={155} fontSize="9" className="fill-muted-foreground">Hepatic v.</text>

          {/* Direction arrows on vessels */}
          <line x1={210} y1={262} x2={235} y2={235} stroke="hsl(var(--foreground))"
            strokeWidth="1" markerEnd="url(#pf-arrow)" opacity={0.6} />
          <line x1={440} y1={155} x2={448} y2={135} stroke="hsl(var(--foreground))"
            strokeWidth="1" markerEnd="url(#pf-arrow)" opacity={0.6} />

          {/* Animated drug particles */}
          {particles.map(({ id, p }) => {
            // Hide particles that haven't entered yet (rest at gut)
            const { x, y } = positionAt(p);
            const extracted = isExtracted(id, p);
            // If extracted, fade as it crosses the sinusoid then disappear
            if (extracted && p > 0.4) {
              if (p > 0.7) return null; // removed by liver
              const fade = 1 - (p - 0.4) / 0.3;
              return (
                <g key={id} opacity={fade}>
                  <circle cx={x} cy={y} r={4} fill="hsl(280, 70%, 55%)"
                    stroke="hsl(280, 80%, 30%)" strokeWidth="0.8" />
                </g>
              );
            }
            // Active drug
            return (
              <g key={id}>
                <circle cx={x} cy={y} r={4.5} fill="hsl(280, 75%, 60%)"
                  stroke="hsl(280, 80%, 30%)" strokeWidth="1" />
              </g>
            );
          })}

          {/* Sinusoid extraction overlay */}
          <rect x={285} y={170} width={140} height={28} rx={6}
            fill="hsl(15, 70%, 50%)" opacity={0.08 + er * 0.18} />
          <text x={355} y={250} textAnchor="middle" fontSize="9"
            className="fill-muted-foreground">
            Extraction window
          </text>

          {/* Legend */}
          <g transform="translate(40, 30)">
            <circle cx={6} cy={6} r={4.5} fill="hsl(280, 75%, 60%)" stroke="hsl(280, 80%, 30%)" strokeWidth="1" />
            <text x={16} y={10} fontSize="10" className="fill-foreground">Drug molecule</text>
            <circle cx={6} cy={24} r={4} fill="hsl(280, 70%, 55%)" opacity={0.4} />
            <text x={16} y={28} fontSize="10" className="fill-muted-foreground">Extracted (metabolised)</text>
          </g>
        </svg>
      </div>

      {/* Controls */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="bg-secondary/30 rounded-lg p-3 border border-border">
          <div className="flex justify-between text-xs mb-2">
            <span className="text-muted-foreground">Hepatic extraction ratio (E)</span>
            <span className="font-mono font-semibold text-foreground">{er.toFixed(2)}</span>
          </div>
          <input type="range" min={0} max={1} step={0.05} value={er}
            onChange={(e) => setEr(Number(e.target.value))}
            className="w-full h-2 rounded-full appearance-none bg-secondary cursor-pointer accent-primary" />
          <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
            <span>0 (no extraction)</span>
            <span>1 (complete)</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Oral bioavailability F ≈ (1 − E) × Fa. With E = {er.toFixed(2)}, an orally absorbed
            drug delivers ≈ <span className="font-mono font-semibold text-foreground">{Math.round((1 - er) * 100)}%</span> to the systemic circulation.
          </p>
        </div>

        <div className="bg-secondary/30 rounded-lg p-3 border border-border">
          <p className="text-xs font-semibold text-foreground mb-1">Clinical correlates</p>
          <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside leading-relaxed">
            <li><span className="font-semibold text-foreground">High E (&gt;0.7):</span> propranolol, lidocaine, morphine, GTN, fentanyl — flow-dependent clearance; bypass first pass with IV/SL/TD/PR routes.</li>
            <li><span className="font-semibold text-foreground">Low E (&lt;0.3):</span> diazepam, warfarin, phenytoin — capacity-limited; clearance unchanged by flow.</li>
            <li>Portosystemic shunting (cirrhosis, TIPSS) ↑ bioavailability of high-E drugs → toxicity risk.</li>
          </ul>
        </div>
      </div>

      <div className="flex justify-center">
        <button onClick={() => setPlaying((p) => !p)}
          className="px-4 py-1.5 rounded-lg text-sm font-medium border border-border text-foreground hover:bg-muted transition-colors">
          {playing ? "⏸ Pause" : "▶ Play"}
        </button>
      </div>
    </div>
  );
};

export default PortalFirstPassDiagram;

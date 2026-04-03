import { useState, useEffect } from "react";

const PHASES = [
  { id: "rest", label: "Resting State", duration: 80 },
  { id: "ap", label: "Action Potential Arrives", duration: 40 },
  { id: "ca", label: "Ca²⁺ Influx", duration: 40 },
  { id: "vesicle", label: "Vesicle Fusion & ACh Release", duration: 60 },
  { id: "bind", label: "ACh Binds nAChR", duration: 50 },
  { id: "depol", label: "End-Plate Depolarisation", duration: 50 },
  { id: "degrade", label: "ACh Hydrolysis by AChE", duration: 50 },
];

const TOTAL = PHASES.reduce((s, p) => s + p.duration, 0);

export const NMJDiagram = () => {
  const [frame, setFrame] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => setFrame((f) => (f + 1) % TOTAL), 40);
    return () => clearInterval(interval);
  }, [playing]);

  // Determine current phase
  let accumulated = 0;
  let currentPhase = PHASES[0];
  let phaseProgress = 0;
  for (const p of PHASES) {
    if (frame >= accumulated && frame < accumulated + p.duration) {
      currentPhase = p;
      phaseProgress = (frame - accumulated) / p.duration;
      break;
    }
    accumulated += p.duration;
  }

  const w = 520;
  const h = 380;

  // Vesicle positions
  const vesicles = [
    { cx: 160, cy: 115 },
    { cx: 200, cy: 105 },
    { cx: 240, cy: 112 },
    { cx: 280, cy: 108 },
    { cx: 320, cy: 115 },
  ];

  const showCaArrows = currentPhase.id === "ca" || currentPhase.id === "vesicle";
  const showAChDots = currentPhase.id === "vesicle" || currentPhase.id === "bind" || currentPhase.id === "depol";
  const vesiclesFusing = currentPhase.id === "vesicle" || currentPhase.id === "bind" || currentPhase.id === "depol";
  const receptorsActive = currentPhase.id === "bind" || currentPhase.id === "depol";
  const showDegradation = currentPhase.id === "degrade";
  const showAP = currentPhase.id === "ap" || currentPhase.id === "ca";

  // ACh dot animation
  const achY = showAChDots
    ? 140 + phaseProgress * 50
    : 140;

  return (
    <div className="w-full max-w-xl mx-auto">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
        {/* Nerve terminal */}
        <rect x={100} y={40} width={300} height={100} rx="12" fill="hsl(210 60% 94%)" stroke="hsl(210 70% 45%)" strokeWidth="2" />
        <text x={250} y={30} textAnchor="middle" fontSize="11" className="fill-foreground font-semibold">Pre-synaptic Nerve Terminal</text>

        {/* Action potential flash */}
        {showAP && (
          <g>
            <line x1={60} y1={90} x2={100} y2={90} stroke="hsl(30 80% 50%)" strokeWidth="3" strokeDasharray="6 3">
              <animate attributeName="stroke-opacity" values="1;0.3;1" dur="0.4s" repeatCount="indefinite" />
            </line>
            <text x={50} y={85} textAnchor="end" fontSize="9" className="fill-muted-foreground">AP →</text>
          </g>
        )}

        {/* Voltage-gated Ca²⁺ channels */}
        {[140, 200, 260, 320, 360].map((x, i) => (
          <rect key={i} x={x - 6} y={132} width={12} height={16} rx="2"
            fill={showCaArrows ? "hsl(30 80% 50%)" : "hsl(210 20% 80%)"}
            stroke="hsl(210 20% 60%)" strokeWidth="1"
          />
        ))}

        {/* Ca²⁺ arrows entering */}
        {showCaArrows && [160, 260, 340].map((x, i) => (
          <g key={i} opacity={0.8 + phaseProgress * 0.2}>
            <line x1={x} y1={160} x2={x} y2={130} stroke="hsl(30 80% 50%)" strokeWidth="1.5" markerEnd="url(#arrowCa)" />
            <text x={x + 4} y={158} fontSize="8" className="fill-muted-foreground">Ca²⁺</text>
          </g>
        ))}

        {/* Vesicles */}
        {vesicles.map((v, i) => {
          const fusing = vesiclesFusing && i < Math.floor(phaseProgress * 5 + 1);
          const vy = fusing ? v.cy + (140 - v.cy) * Math.min(phaseProgress * 1.5, 1) : v.cy;
          const opacity = showDegradation ? 0.3 : fusing ? 0.6 : 1;
          return (
            <g key={i}>
              <circle cx={v.cx} cy={vy} r={12} fill="hsl(170 50% 70%)" stroke="hsl(170 50% 40%)" strokeWidth="1.5" opacity={opacity} />
              {/* ACh dots inside */}
              {!fusing && (
                <>
                  <circle cx={v.cx - 3} cy={vy - 2} r={2} fill="hsl(170 50% 40%)" />
                  <circle cx={v.cx + 3} cy={vy + 2} r={2} fill="hsl(170 50% 40%)" />
                </>
              )}
            </g>
          );
        })}

        {/* Label vesicles */}
        <text x={380} y={95} fontSize="9" className="fill-muted-foreground">ACh vesicles</text>

        {/* Synaptic cleft */}
        <rect x={100} y={150} width={300} height={50} fill="hsl(45 40% 95%)" stroke="none" />
        <text x={420} y={178} fontSize="9" className="fill-muted-foreground">Synaptic</text>
        <text x={420} y={188} fontSize="9" className="fill-muted-foreground">Cleft</text>

        {/* ACh molecules in cleft */}
        {showAChDots && Array.from({ length: 8 }).map((_, i) => {
          const x = 130 + i * 30 + Math.sin(i * 2 + frame * 0.1) * 5;
          const y = Math.min(achY + Math.sin(i * 3) * 8, 195);
          const opacity = showDegradation ? Math.max(0, 1 - phaseProgress * 2) : 0.8;
          return (
            <circle key={i} cx={x} cy={y} r={3} fill="hsl(170 50% 40%)" opacity={opacity} />
          );
        })}

        {/* AChE molecules */}
        {showDegradation && Array.from({ length: 4 }).map((_, i) => (
          <g key={i} opacity={phaseProgress}>
            <text x={150 + i * 55} y={178} fontSize="8" className="font-semibold" fill="hsl(0 65% 50%)">AChE</text>
          </g>
        ))}

        {/* Post-synaptic membrane / motor end plate */}
        <rect x={100} y={200} width={300} height={90} rx="12" fill="hsl(340 40% 95%)" stroke="hsl(340 60% 50%)" strokeWidth="2" />
        <text x={250} y={218} textAnchor="middle" fontSize="11" className="fill-foreground font-semibold">Motor End Plate</text>

        {/* nAChR receptors */}
        {[140, 180, 220, 260, 300, 340].map((x, i) => {
          const active = receptorsActive && i < Math.floor(phaseProgress * 6 + 1);
          return (
            <g key={i}>
              {/* Receptor channel */}
              <rect x={x - 8} y={195} width={16} height={24} rx="3"
                fill={active ? "hsl(170 50% 60%)" : "hsl(340 30% 85%)"}
                stroke={active ? "hsl(170 50% 35%)" : "hsl(340 30% 60%)"}
                strokeWidth="1.5"
              />
              {/* Channel pore */}
              <line x1={x} y1={197} x2={x} y2={217}
                stroke={active ? "hsl(170 50% 35%)" : "hsl(340 30% 70%)"}
                strokeWidth={active ? "3" : "1"}
              />
              {active && (
                <text x={x} y={230} textAnchor="middle" fontSize="7" className="fill-muted-foreground">Na⁺↓</text>
              )}
            </g>
          );
        })}
        <text x={380} y={210} fontSize="9" className="fill-muted-foreground">nAChR</text>

        {/* End-plate potential */}
        {currentPhase.id === "depol" && (
          <g>
            <text x={250} y={270} textAnchor="middle" fontSize="10" className="fill-foreground font-medium">
              End-Plate Potential → Muscle AP
            </text>
            <line x1={170} y1={275} x2={330} y2={275} stroke="hsl(340 60% 50%)" strokeWidth="2">
              <animate attributeName="stroke-opacity" values="1;0.4;1" dur="0.5s" repeatCount="indefinite" />
            </line>
          </g>
        )}

        {/* Choline recycling arrow */}
        {showDegradation && (
          <g opacity={phaseProgress}>
            <path d="M 250 200 Q 430 170 250 145" fill="none" stroke="hsl(210 50% 60%)" strokeWidth="1" strokeDasharray="4 2" markerEnd="url(#arrowRecycle)" />
            <text x={440} y={165} fontSize="8" className="fill-muted-foreground">Choline</text>
            <text x={440} y={175} fontSize="8" className="fill-muted-foreground">reuptake</text>
          </g>
        )}

        {/* Arrow markers */}
        <defs>
          <marker id="arrowCa" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="hsl(30 80% 50%)" />
          </marker>
          <marker id="arrowRecycle" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="hsl(210 50% 60%)" />
          </marker>
        </defs>
      </svg>

      {/* Phase indicator */}
      <div className="text-center mt-2 mb-3">
        <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-primary/10 text-primary">
          {currentPhase.label}
        </span>
      </div>

      {/* Phase timeline */}
      <div className="flex gap-0.5 mb-4">
        {PHASES.map((p, i) => {
          const start = PHASES.slice(0, i).reduce((s, pp) => s + pp.duration, 0);
          const isCurrent = currentPhase.id === p.id;
          return (
            <div
              key={p.id}
              className={`h-1.5 rounded-full transition-colors ${isCurrent ? "bg-primary" : frame > start ? "bg-primary/30" : "bg-muted"}`}
              style={{ flex: p.duration }}
            />
          );
        })}
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => setPlaying(!playing)}
          className="px-4 py-1.5 rounded-lg text-sm font-medium border border-border text-foreground hover:bg-muted transition-colors"
        >
          {playing ? "⏸ Pause" : "▶ Play"}
        </button>
      </div>
    </div>
  );
};

import { useState, useEffect } from "react";

const PHASES = [
  { id: "rest", label: "Resting State", duration: 70 },
  { id: "ap", label: "Action Potential Arrives", duration: 40 },
  { id: "ca", label: "Ca²⁺ Influx through VGCCs", duration: 80 },
  { id: "vesicle", label: "Ca²⁺-Triggered Vesicle Fusion & ACh Release", duration: 60 },
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

        {/* Voltage-gated Ca²⁺ channels — labelled VGCC, glow when open */}
        {[140, 200, 260, 320, 360].map((x, i) => {
          const open = showCaArrows;
          return (
            <g key={i}>
              {open && (
                <circle cx={x} cy={140} r={14} fill="hsl(35 95% 55%)" opacity={0.25}>
                  <animate attributeName="r" values="10;16;10" dur="0.8s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.15;0.4;0.15" dur="0.8s" repeatCount="indefinite" />
                </circle>
              )}
              <rect x={x - 7} y={130} width={14} height={20} rx="2"
                fill={open ? "hsl(35 95% 55%)" : "hsl(210 20% 80%)"}
                stroke={open ? "hsl(25 90% 40%)" : "hsl(210 20% 60%)"}
                strokeWidth={open ? 1.5 : 1}
              />
              {open && (
                <line x1={x} y1={132} x2={x} y2={148} stroke="hsl(45 100% 95%)" strokeWidth="2.5" />
              )}
            </g>
          );
        })}
        {/* VGCC label */}
        {showCaArrows && (
          <text x={100} y={128} fontSize="9" className="fill-foreground font-semibold" fill="hsl(25 90% 40%)">VGCC open</text>
        )}

        {/* Ca²⁺ ions streaming UP through channels into terminal */}
        {showCaArrows && [140, 200, 260, 320, 360].flatMap((x, ci) =>
          [0, 0.4, 0.75].map((delay, di) => {
            const cycle = ((phaseProgress * 4) + delay + ci * 0.13) % 1;
            // Start below membrane, travel up into terminal toward vesicles
            const startY = 175;
            const endY = 110;
            const y = startY + (endY - startY) * cycle;
            const opacity = cycle < 0.1 ? cycle * 10 : cycle > 0.85 ? (1 - cycle) * 6.5 : 1;
            return (
              <g key={`${ci}-${di}`}>
                <circle cx={x} cy={y} r={5}
                  fill="hsl(35 95% 55%)" stroke="hsl(25 90% 35%)" strokeWidth="1"
                  opacity={Math.min(1, opacity)} />
                <text x={x} y={y + 2} textAnchor="middle" fontSize="5"
                  className="font-bold" fill="hsl(0 0% 100%)"
                  opacity={Math.min(1, opacity)}>
                  Ca
                </text>
              </g>
            );
          })
        )}

        {/* Intracellular Ca²⁺ cloud building under active zone */}
        {showCaArrows && (
          <ellipse cx={250} cy={120} rx={130} ry={18}
            fill="hsl(35 95% 55%)" opacity={0.12 + phaseProgress * 0.18}>
            <animate attributeName="opacity" values="0.15;0.3;0.15" dur="1.2s" repeatCount="indefinite" />
          </ellipse>
        )}

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
        {(currentPhase.id === "ca" || currentPhase.id === "vesicle") && (
          <p className="text-xs text-muted-foreground mt-2 max-w-md mx-auto leading-relaxed">
            Depolarisation opens <span className="font-semibold" style={{ color: "hsl(25 90% 40%)" }}>P/Q-type voltage-gated Ca²⁺ channels</span>.
            Extracellular Ca²⁺ flows down its gradient into the nerve terminal, raising local [Ca²⁺]ᵢ
            from ~100 nM to &gt;100 µM at the active zone — the trigger for synaptotagmin-mediated vesicle fusion.
          </p>
        )}
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

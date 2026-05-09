import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

type Pathology = "normal" | "bronchospasm" | "rebreathing" | "oesophageal" | "cardiac-oscillations" | "curare-cleft";

interface PathologyInfo {
  label: string;
  description: string;
  color: string;
}

const pathologies: Record<Pathology, PathologyInfo> = {
  normal: {
    label: "Normal",
    description: "Four distinct phases: Phase I (baseline, dead space gas), Phase II (rapid upstroke), Phase III (alveolar plateau), Phase IV (rapid descent as inspiration begins). EtCO₂ typically 4.5–5.5 kPa (35–45 mmHg).",
    color: "hsl(var(--primary))",
  },
  bronchospasm: {
    label: "Bronchospasm",
    description: "Slurred Phase II upstroke and steep Phase III ('shark fin' appearance). The α angle increases due to V/Q mismatch and uneven alveolar emptying. EtCO₂ may be elevated.",
    color: "hsl(25, 95%, 53%)",
  },
  rebreathing: {
    label: "Rebreathing",
    description: "Elevated baseline — Phase I does not return to zero. Caused by exhausted soda lime, inadequate fresh gas flow, or incompetent expiratory valve. Both baseline and EtCO₂ rise progressively.",
    color: "hsl(340, 82%, 52%)",
  },
  oesophageal: {
    label: "Oesophageal Intubation",
    description: "Brief diminishing waveforms (from swallowed gas in stomach) that rapidly fall to zero. No sustained EtCO₂ trace. Demands immediate reintubation.",
    color: "hsl(0, 84%, 60%)",
  },
  "cardiac-oscillations": {
    label: "Cardiac Oscillations",
    description: "Small rhythmic undulations on the Phase III plateau, synchronous with the heartbeat. Caused by cardiogenic mixing of gas in the lungs. Seen at low respiratory rates or small tidal volumes.",
    color: "hsl(260, 67%, 60%)",
  },
  "curare-cleft": {
    label: "Curare Cleft",
    description: "A notch or 'cleft' in the Phase III plateau caused by diaphragmatic contractions during partial neuromuscular recovery. Indicates wearing off of muscle relaxant.",
    color: "hsl(170, 70%, 45%)",
  },
};

const W = 600;
const H = 280;
const PAD = { top: 30, right: 20, bottom: 40, left: 55 };
const PW = W - PAD.left - PAD.right;
const PH = H - PAD.top - PAD.bottom;

interface WaveformKeyPoints {
  /** Where Phase II meets Phase III (α angle vertex) — normalised coords within first cycle */
  alphaVertex: [number, number];
  /** Tangent directions at α: [incoming angle from Phase II, outgoing angle into Phase III] in degrees */
  alphaDeg: [number, number];
  /** Where Phase III meets Phase IV (β angle vertex) */
  betaVertex: [number, number];
  /** Tangent directions at β */
  betaDeg: [number, number];
}

function generateWaveformWithKeyPoints(pathology: Pathology): { path: string; keyPoints: WaveformKeyPoints } {
  const allPoints: [number, number][] = [];
  const cycles = pathology === "oesophageal" ? 3 : 2;
  const cycleW = PW / cycles;

  let alphaVertex: [number, number] = [0, 0];
  let betaVertex: [number, number] = [0, 0];
  let alphaPrePoint: [number, number] = [0, 0];
  let alphaPostPoint: [number, number] = [0, 0];
  let betaPrePoint: [number, number] = [0, 0];
  let betaPostPoint: [number, number] = [0, 0];

  for (let c = 0; c < cycles; c++) {
    const ox = c * cycleW;
    const oesophagealDecay = pathology === "oesophageal" ? Math.pow(0.35, c) : 1;
    const baselineOffset = pathology === "rebreathing" ? 0.08 + c * 0.06 : 0;
    const peakCO2 = pathology === "oesophageal" ? 0.5 * oesophagealDecay : 0.85;

    // Phase I — baseline
    const p1End = 0.1;
    for (let t = 0; t <= p1End; t += 0.005) {
      allPoints.push([ox + t * cycleW, baselineOffset]);
    }

    // Phase II — upstroke
    const p2End = pathology === "bronchospasm" ? 0.35 : 0.2;
    const steps = 30;
    for (let i = 0; i <= steps; i++) {
      const t = p1End + (i / steps) * (p2End - p1End);
      let frac: number;
      if (pathology === "bronchospasm") {
        frac = Math.pow(i / steps, 2.5);
      } else {
        frac = Math.pow(i / steps, 0.4);
      }
      allPoints.push([ox + t * cycleW, baselineOffset + frac * (peakCO2 - baselineOffset)]);
    }

    // Capture α key points at end of Phase II (first cycle only)
    if (c === 0) {
      alphaPrePoint = [...allPoints[allPoints.length - 3]];
      alphaVertex = [...allPoints[allPoints.length - 1]];
    }

    // Phase III — plateau
    const p3Start = p2End;
    const p3End = pathology === "bronchospasm" ? 0.72 : 0.7;
    const plateauSteps = 40;
    const plateauStartIdx = allPoints.length;
    for (let i = 0; i <= plateauSteps; i++) {
      const t = p3Start + (i / plateauSteps) * (p3End - p3Start);
      let y = peakCO2;

      if (pathology === "bronchospasm") {
        y = peakCO2 + (i / plateauSteps) * 0.1;
      }

      if (pathology === "cardiac-oscillations") {
        y += Math.sin(i * 1.8) * 0.03;
      }

      if (pathology === "curare-cleft") {
        const cleftCenter = 0.5;
        const dist = Math.abs(i / plateauSteps - cleftCenter);
        if (dist < 0.15) {
          y -= (0.15 - dist) / 0.15 * 0.18;
        }
      }

      allPoints.push([ox + t * cycleW, baselineOffset + (y - baselineOffset) * (pathology === "oesophageal" ? oesophagealDecay : 1)]);
    }

    // Capture α post-point and β pre-point (first cycle)
    if (c === 0) {
      alphaPostPoint = [...allPoints[plateauStartIdx + 2]];
      betaPrePoint = [...allPoints[allPoints.length - 3]];
      betaVertex = [...allPoints[allPoints.length - 1]];
    }

    // Phase IV — downstroke
    const p4End = 0.95;
    const downSteps = 20;
    const lastPlateau = allPoints[allPoints.length - 1][1];
    const downStartIdx = allPoints.length;
    for (let i = 1; i <= downSteps; i++) {
      const t = p3End + (i / downSteps) * (p4End - p3End);
      const frac = Math.pow(i / downSteps, 0.5);
      const target = pathology === "rebreathing" ? baselineOffset + 0.03 : baselineOffset;
      allPoints.push([ox + t * cycleW, lastPlateau - frac * (lastPlateau - target)]);
    }

    if (c === 0) {
      betaPostPoint = [...allPoints[downStartIdx + 2]];
    }

    // Return to baseline
    for (let t = p4End; t <= 1.0; t += 0.01) {
      allPoints.push([ox + t * cycleW, pathology === "rebreathing" ? baselineOffset + 0.03 : baselineOffset]);
    }
  }

  // Convert to SVG path
  const pathStr = allPoints
    .map(([x, y], i) => {
      const px = PAD.left + x;
      const py = PAD.top + PH - y * PH;
      return `${i === 0 ? "M" : "L"}${px.toFixed(1)},${py.toFixed(1)}`;
    })
    .join(" ");

  // Compute angles
  const toSvg = (p: [number, number]): [number, number] => [PAD.left + p[0], PAD.top + PH - p[1] * PH];

  const angleDeg = (from: [number, number], to: [number, number]) =>
    Math.atan2(to[1] - from[1], to[0] - from[0]) * (180 / Math.PI);

  const aV = toSvg(alphaVertex);
  const aPre = toSvg(alphaPrePoint);
  const aPost = toSvg(alphaPostPoint);
  const bV = toSvg(betaVertex);
  const bPre = toSvg(betaPrePoint);
  const bPost = toSvg(betaPostPoint);

  return {
    path: pathStr,
    keyPoints: {
      alphaVertex: aV,
      alphaDeg: [angleDeg(aV, aPre), angleDeg(aV, aPost)],
      betaVertex: bV,
      betaDeg: [angleDeg(bV, bPre), angleDeg(bV, bPost)],
    },
  };
}

// Phase label positions for normal waveform
const phaseLabels = [
  { label: "I", x: 0.05 },
  { label: "II", x: 0.15 },
  { label: "III", x: 0.45 },
  { label: "IV", x: 0.82 },
];

function AngleArc({
  cx, cy, startDeg, endDeg, radius, label, color, _info, isActive, onClick,
}: {
  cx: number; cy: number; startDeg: number; endDeg: number; radius: number;
  label: string; color: string; info: string; isActive: boolean; onClick: () => void;
}) {
  // Ensure we draw the smaller arc between the two directions
  let s = startDeg;
  let e = endDeg;
  // Normalise to 0-360
  s = ((s % 360) + 360) % 360;
  e = ((e % 360) + 360) % 360;
  let sweep = e - s;
  if (sweep < 0) sweep += 360;
  if (sweep > 180) {
    // swap and go the other way
    [s, e] = [e, s];
    sweep = 360 - sweep;
  }

  const sRad = (s * Math.PI) / 180;
  const eRad = (e * Math.PI) / 180;
  const x1 = cx + radius * Math.cos(sRad);
  const y1 = cy + radius * Math.sin(sRad);
  const x2 = cx + radius * Math.cos(eRad);
  const y2 = cy + radius * Math.sin(eRad);
  const largeArc = sweep > 180 ? 1 : 0;

  const midRad = ((s + sweep / 2) * Math.PI) / 180;
  const labelR = radius + 14;
  const lx = cx + labelR * Math.cos(midRad);
  const ly = cy + labelR * Math.sin(midRad);

  // Lines from vertex along tangent directions
  const lineLen = radius * 0.7;
  const lx1 = cx + lineLen * Math.cos(sRad);
  const ly1 = cy + lineLen * Math.sin(sRad);
  const lx2 = cx + lineLen * Math.cos(eRad);
  const ly2 = cy + lineLen * Math.sin(eRad);

  const angleDegrees = Math.round(sweep);

  return (
    <g onClick={onClick} style={{ cursor: "pointer" }}>
      {/* Tangent lines */}
      <line x1={cx} y1={cy} x2={lx1} y2={ly1} stroke={color} strokeWidth="1" strokeDasharray="3,2" opacity={0.6} />
      <line x1={cx} y1={cy} x2={lx2} y2={ly2} stroke={color} strokeWidth="1" strokeDasharray="3,2" opacity={0.6} />

      {/* Arc */}
      <path
        d={`M${x1},${y1} A${radius},${radius} 0 ${largeArc} 1 ${x2},${y2}`}
        fill="none"
        stroke={color}
        strokeWidth={isActive ? "2.5" : "1.5"}
        opacity={isActive ? 1 : 0.7}
      />

      {/* Filled wedge when active */}
      {isActive && (
        <path
          d={`M${cx},${cy} L${x1},${y1} A${radius},${radius} 0 ${largeArc} 1 ${x2},${y2} Z`}
          fill={color}
          opacity={0.12}
        />
      )}

      {/* Label */}
      <text
        x={lx} y={ly + 3}
        textAnchor="middle" fontSize="10" fontWeight="700" fill={color}
      >
        {label}
      </text>

      {/* Degree readout when active */}
      {isActive && (
        <text
          x={lx} y={ly + 14}
          textAnchor="middle" fontSize="8" fill={color} opacity={0.8}
        >
          ≈{angleDegrees}°
        </text>
      )}

      {/* Vertex dot */}
      <circle cx={cx} cy={cy} r="3" fill={color} opacity={isActive ? 1 : 0.5} />
    </g>
  );
}

const angleInfo: Record<string, Record<Pathology, string>> = {
  alpha: {
    normal: "α angle ≈ 110°. Sharp transition from Phase II to III indicates rapid, uniform alveolar emptying.",
    bronchospasm: "α angle markedly increased (>110°). Slurred upstroke reflects uneven alveolar emptying due to airway obstruction and V/Q mismatch.",
    rebreathing: "α angle relatively preserved. The key abnormality is the elevated baseline, not the upstroke shape.",
    oesophageal: "No meaningful α angle — waveform rapidly diminishes as gastric gas is exhausted.",
    "cardiac-oscillations": "α angle normal. The oscillations occur on the plateau, not at the II–III transition.",
    "curare-cleft": "α angle normal. The cleft occurs within Phase III due to diaphragmatic contraction.",
  },
  beta: {
    normal: "β angle ≈ 90°. Sharp transition from Phase III to IV indicates clean start of inspiration.",
    bronchospasm: "β angle increased. Delayed emptying of obstructed alveoli continues into early inspiration, blunting the III–IV transition.",
    rebreathing: "β angle may be slightly obtuse. Rebreathing prevents CO₂ from reaching zero before the next expiration.",
    oesophageal: "No meaningful β angle — trace falls to zero as stomach gas is depleted.",
    "cardiac-oscillations": "β angle normal. Cardiogenic oscillations do not affect the Phase III–IV transition.",
    "curare-cleft": "β angle normal. The neuromuscular cleft is distinct from the inspiratory downstroke.",
  },
};

export const CapnographyDiagram = () => {
  const [selected, setSelected] = useState<Pathology>("normal");
  const [showPhases, setShowPhases] = useState(true);
  const [showAngles, setShowAngles] = useState(true);
  const [activeAngle, setActiveAngle] = useState<"alpha" | "beta" | null>(null);

  const { path, keyPoints } = useMemo(() => generateWaveformWithKeyPoints(selected), [selected]);
  const normalData = useMemo(
    () => (selected !== "normal" ? generateWaveformWithKeyPoints("normal") : null),
    [selected]
  );

  const info = pathologies[selected];
  const yTicks = [0, 0.2, 0.4, 0.6, 0.8, 1.0];
  const showAngleAnnotations = showAngles && selected !== "oesophageal";

  const alphaColor = "hsl(45, 93%, 47%)";
  const betaColor = "hsl(200, 80%, 50%)";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h3 className="font-semibold text-foreground text-sm">Capnography Waveforms</h3>
        <div className="flex gap-1.5">
          {selected !== "oesophageal" && (
            <button
              onClick={() => { setShowAngles(!showAngles); setActiveAngle(null); }}
              className={cn(
                "text-xs px-2.5 py-1 rounded-full border transition-colors",
                showAngles
                  ? "bg-primary/10 border-primary/30 text-primary"
                  : "bg-secondary/50 border-border text-muted-foreground"
              )}
            >
              α β angles
            </button>
          )}
          {selected === "normal" && (
            <button
              onClick={() => setShowPhases(!showPhases)}
              className={cn(
                "text-xs px-2.5 py-1 rounded-full border transition-colors",
                showPhases
                  ? "bg-primary/10 border-primary/30 text-primary"
                  : "bg-secondary/50 border-border text-muted-foreground"
              )}
            >
              Phases
            </button>
          )}
        </div>
      </div>

      {/* Pathology selector */}
      <div className="flex flex-wrap gap-1.5">
        {(Object.keys(pathologies) as Pathology[]).map((key) => (
          <button
            key={key}
            onClick={() => { setSelected(key); setActiveAngle(null); }}
            className={cn(
              "text-xs px-2.5 py-1.5 rounded-lg border transition-all font-medium",
              selected === key
                ? "border-primary bg-primary/10 text-primary shadow-sm"
                : "border-border bg-secondary/30 text-muted-foreground hover:bg-secondary/60"
            )}
          >
            {pathologies[key].label}
          </button>
        ))}
      </div>

      {/* SVG */}
      <div className="bg-background rounded-lg border border-border overflow-hidden">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
          {/* Grid */}
          {yTicks.map((t) => {
            const y = PAD.top + PH - t * PH;
            return (
              <g key={t}>
                <line
                  x1={PAD.left} x2={W - PAD.right}
                  y1={y} y2={y}
                  stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray={t === 0 ? "none" : "3,3"}
                />
                <text x={PAD.left - 6} y={y + 3} textAnchor="end" fontSize="9" fill="hsl(var(--muted-foreground))">
                  {(t * 8).toFixed(0)}
                </text>
              </g>
            );
          })}

          {/* Axes */}
          <line x1={PAD.left} x2={PAD.left} y1={PAD.top} y2={H - PAD.bottom} stroke="hsl(var(--foreground))" strokeWidth="1" />
          <line x1={PAD.left} x2={W - PAD.right} y1={H - PAD.bottom} y2={H - PAD.bottom} stroke="hsl(var(--foreground))" strokeWidth="1" />

          {/* Axis labels */}
          <text
            x={PAD.left - 38} y={PAD.top + PH / 2}
            textAnchor="middle" fontSize="10" fill="hsl(var(--foreground))"
            transform={`rotate(-90, ${PAD.left - 38}, ${PAD.top + PH / 2})`}
            fontWeight="600"
          >
            CO₂ (kPa)
          </text>
          <text
            x={PAD.left + PW / 2} y={H - 5}
            textAnchor="middle" fontSize="10" fill="hsl(var(--foreground))"
            fontWeight="600"
          >
            Time →
          </text>

          {/* Normal reference when showing pathology */}
          {normalData && (
            <path
              d={normalData.path}
              fill="none"
              stroke="hsl(var(--muted-foreground))"
              strokeWidth="1"
              strokeDasharray="4,4"
              opacity="0.4"
            />
          )}

          {/* Main waveform */}
          <path
            d={path}
            fill="none"
            stroke={info.color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Phase labels for normal */}
          {selected === "normal" && showPhases && phaseLabels.map((p) => {
            const cycleW = PW / 2;
            const px = PAD.left + p.x * cycleW;
            return (
              <g key={p.label}>
                <line x1={px} x2={px} y1={PAD.top + 5} y2={PAD.top + PH - 5} stroke="hsl(var(--primary))" strokeWidth="0.5" strokeDasharray="2,3" opacity="0.5" />
                <rect x={px - 8} y={PAD.top + 2} width="16" height="14" rx="3" fill="hsl(var(--primary))" opacity="0.15" />
                <text x={px} y={PAD.top + 12} textAnchor="middle" fontSize="9" fill="hsl(var(--primary))" fontWeight="700">
                  {p.label}
                </text>
              </g>
            );
          })}

          {/* Angle annotations */}
          {showAngleAnnotations && (
            <>
              <AngleArc
                cx={keyPoints.alphaVertex[0]}
                cy={keyPoints.alphaVertex[1]}
                startDeg={keyPoints.alphaDeg[0]}
                endDeg={keyPoints.alphaDeg[1]}
                radius={28}
                label="α"
                color={alphaColor}
                info=""
                isActive={activeAngle === "alpha"}
                onClick={() => setActiveAngle(activeAngle === "alpha" ? null : "alpha")}
              />
              <AngleArc
                cx={keyPoints.betaVertex[0]}
                cy={keyPoints.betaVertex[1]}
                startDeg={keyPoints.betaDeg[0]}
                endDeg={keyPoints.betaDeg[1]}
                radius={28}
                label="β"
                color={betaColor}
                info=""
                isActive={activeAngle === "beta"}
                onClick={() => setActiveAngle(activeAngle === "beta" ? null : "beta")}
              />
            </>
          )}

          {/* EtCO₂ label */}
          {selected !== "oesophageal" && (
            <g>
              <line
                x1={PAD.left + PW / 2 * 0.7} x2={PAD.left + PW / 2 * 0.7 + 30}
                y1={PAD.top + PH * 0.15 + 4} y2={PAD.top + PH * 0.15 + 4}
                stroke={info.color} strokeWidth="1"
              />
              <text
                x={PAD.left + PW / 2 * 0.7 + 35}
                y={PAD.top + PH * 0.15 + 7}
                fontSize="9" fill={info.color} fontWeight="600"
              >
                EtCO₂
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Legend when showing pathology */}
      {normalData && (
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="w-4 h-0.5 border-t border-dashed border-muted-foreground inline-block" />
            Normal (reference)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-4 h-0.5 inline-block rounded" style={{ background: info.color }} />
            {info.label}
          </span>
        </div>
      )}

      {/* Angle info panel */}
      {activeAngle && showAngleAnnotations && (
        <div
          className="p-3 rounded-lg border border-border"
          style={{
            background: activeAngle === "alpha"
              ? "hsla(45, 93%, 47%, 0.08)"
              : "hsla(200, 80%, 50%, 0.08)",
            borderColor: activeAngle === "alpha" ? alphaColor : betaColor,
          }}
        >
          <p className="text-xs font-semibold mb-1" style={{ color: activeAngle === "alpha" ? alphaColor : betaColor }}>
            {activeAngle === "alpha" ? "α Angle (Phase II → III)" : "β Angle (Phase III → IV)"}
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {angleInfo[activeAngle][selected]}
          </p>
        </div>
      )}

      {/* Description panel */}
      <div className="p-3 rounded-lg bg-secondary/30 border border-border">
        <p className="text-xs font-semibold text-foreground mb-1">{info.label}</p>
        <p className="text-xs text-muted-foreground leading-relaxed">{info.description}</p>
      </div>

      {/* Angle hint */}
      {showAngleAnnotations && !activeAngle && (
        <p className="text-xs text-muted-foreground/60 text-center italic">
          Tap α or β on the diagram for clinical interpretation
        </p>
      )}
    </div>
  );
};

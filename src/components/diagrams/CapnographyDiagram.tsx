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

function generateWaveform(pathology: Pathology): string {
  const points: [number, number][] = [];
  const cycles = pathology === "oesophageal" ? 3 : 2;
  const cycleW = PW / cycles;

  for (let c = 0; c < cycles; c++) {
    const ox = c * cycleW;
    const oesophagealDecay = pathology === "oesophageal" ? Math.pow(0.35, c) : 1;
    const baselineOffset = pathology === "rebreathing" ? 0.08 + c * 0.06 : 0;
    const peakCO2 = pathology === "oesophageal" ? 0.5 * oesophagealDecay : 0.85;

    // Phase I — baseline
    const p1End = 0.1;
    for (let t = 0; t <= p1End; t += 0.005) {
      points.push([ox + t * cycleW, baselineOffset]);
    }

    // Phase II — upstroke
    const p2End = pathology === "bronchospasm" ? 0.35 : 0.2;
    const steps = 30;
    for (let i = 0; i <= steps; i++) {
      const t = p1End + (i / steps) * (p2End - p1End);
      let frac: number;
      if (pathology === "bronchospasm") {
        // Slow, slurred upstroke
        frac = Math.pow(i / steps, 2.5);
      } else {
        // Sharp upstroke
        frac = Math.pow(i / steps, 0.4);
      }
      points.push([ox + t * cycleW, baselineOffset + frac * (peakCO2 - baselineOffset)]);
    }

    // Phase III — plateau
    const p3Start = p2End;
    const p3End = pathology === "bronchospasm" ? 0.72 : 0.7;
    const plateauSteps = 40;
    for (let i = 0; i <= plateauSteps; i++) {
      const t = p3Start + (i / plateauSteps) * (p3End - p3Start);
      let y = peakCO2;

      if (pathology === "bronchospasm") {
        // Steep rising plateau
        y = peakCO2 + (i / plateauSteps) * 0.1;
      }

      if (pathology === "cardiac-oscillations") {
        // Small oscillations
        y += Math.sin(i * 1.8) * 0.03;
      }

      if (pathology === "curare-cleft") {
        // Cleft in middle of plateau
        const cleftCenter = 0.5;
        const dist = Math.abs(i / plateauSteps - cleftCenter);
        if (dist < 0.15) {
          y -= (0.15 - dist) / 0.15 * 0.18;
        }
      }

      points.push([ox + t * cycleW, baselineOffset + (y - baselineOffset) * (pathology === "oesophageal" ? oesophagealDecay : 1)]);
    }

    // Phase IV — downstroke
    const p4End = 0.95;
    const downSteps = 20;
    const lastPlateau = points[points.length - 1][1];
    for (let i = 1; i <= downSteps; i++) {
      const t = p3End + (i / downSteps) * (p4End - p3End);
      const frac = Math.pow(i / downSteps, 0.5);
      const target = pathology === "rebreathing" ? baselineOffset + 0.03 : baselineOffset;
      points.push([ox + t * cycleW, lastPlateau - frac * (lastPlateau - target)]);
    }

    // Return to baseline
    for (let t = p4End; t <= 1.0; t += 0.01) {
      points.push([ox + t * cycleW, pathology === "rebreathing" ? baselineOffset + 0.03 : baselineOffset]);
    }
  }

  return points
    .map(([x, y], i) => {
      const px = PAD.left + x;
      const py = PAD.top + PH - y * PH;
      return `${i === 0 ? "M" : "L"}${px.toFixed(1)},${py.toFixed(1)}`;
    })
    .join(" ");
}

// Phase label positions for normal waveform
const phaseLabels = [
  { label: "I", x: 0.05, desc: "Dead space" },
  { label: "II", x: 0.15, desc: "Upstroke" },
  { label: "III", x: 0.45, desc: "Plateau" },
  { label: "IV", x: 0.82, desc: "Descent" },
];

export const CapnographyDiagram = () => {
  const [selected, setSelected] = useState<Pathology>("normal");
  const [showPhases, setShowPhases] = useState(true);

  const path = useMemo(() => generateWaveform(selected), [selected]);
  const normalPath = useMemo(() => (selected !== "normal" ? generateWaveform("normal") : null), [selected]);

  const info = pathologies[selected];
  const yTicks = [0, 0.2, 0.4, 0.6, 0.8, 1.0];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground text-sm">Capnography Waveforms</h3>
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
            Phase labels
          </button>
        )}
      </div>

      {/* Pathology selector */}
      <div className="flex flex-wrap gap-1.5">
        {(Object.keys(pathologies) as Pathology[]).map((key) => (
          <button
            key={key}
            onClick={() => setSelected(key)}
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
          {normalPath && (
            <path
              d={normalPath}
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
      {normalPath && (
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

      {/* Description panel */}
      <div className="p-3 rounded-lg bg-secondary/30 border border-border">
        <p className="text-xs font-semibold text-foreground mb-1">{info.label}</p>
        <p className="text-xs text-muted-foreground leading-relaxed">{info.description}</p>
      </div>
    </div>
  );
};

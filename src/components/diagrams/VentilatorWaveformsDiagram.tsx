import { useState, useMemo } from "react";

type Mode = "vcv" | "pcv" | "psv";

interface ModeConfig {
  label: string;
  description: string;
  control: string;
  trigger: string;
  cycle: string;
}

const MODES: Record<Mode, ModeConfig> = {
  vcv: { label: "Volume Control (VCV)", description: "Constant (square) inspiratory flow → linearly rising airway pressure. Volume is guaranteed; pressure varies with compliance and resistance. Peak pressure > plateau pressure (resistive component).", control: "Volume & Flow", trigger: "Time / Patient", cycle: "Volume (set VT delivered)" },
  pcv: { label: "Pressure Control (PCV)", description: "Square pressure waveform → decelerating exponential flow. Pressure is guaranteed; volume varies with compliance. More uniform alveolar filling. Lower peak pressures for same mean airway pressure.", control: "Pressure", trigger: "Time / Patient", cycle: "Time (set Ti)" },
  psv: { label: "Pressure Support (PSV)", description: "Patient-triggered, pressure-supported spontaneous breaths. Decelerating flow pattern. Cycling occurs when flow drops to 25% of peak (flow-cycled). Requires intact respiratory drive. Used for weaning.", control: "Pressure", trigger: "Patient only", cycle: "Flow (25% peak flow)" },
};

// Waveform generators — return normalised 0-1 values over one breath cycle (0-1)
// Each returns { pressure, flow, volume } at time fraction t

interface WaveformPoint { pressure: number; flow: number; volume: number }

function vcvWaveform(t: number, iRatio: number = 0.33): WaveformPoint {
  const peep = 0.15; // baseline PEEP as fraction of max pressure
  if (t < iRatio) {
    // Inspiration: constant flow, linearly rising pressure
    const frac = t / iRatio;
    return {
      flow: 0.8,
      pressure: peep + frac * 0.7, // rises linearly (resistive + elastic)
      volume: frac * 0.95,
    };
  }
  if (t < iRatio + 0.03) {
    // Brief inspiratory hold — flow drops, pressure drops to plateau
    const frac = (t - iRatio) / 0.03;
    return {
      flow: 0.8 * (1 - frac),
      pressure: peep + 0.7 - frac * 0.15, // peak → plateau (lose resistive component)
      volume: 0.95,
    };
  }
  // Expiration: passive, exponential decay
  const eFrac = (t - iRatio - 0.03) / (1 - iRatio - 0.03);
  const decay = Math.exp(-4 * eFrac);
  return {
    flow: -0.6 * decay, // negative = expiratory
    pressure: peep + 0.55 * decay,
    volume: 0.95 * decay,
  };
}

function pcvWaveform(t: number, iRatio: number = 0.33): WaveformPoint {
  const peep = 0.15;
  if (t < 0.02) {
    // Rapid pressure rise
    const frac = t / 0.02;
    return {
      pressure: peep + frac * 0.7,
      flow: frac * 0.9,
      volume: frac * 0.05,
    };
  }
  if (t < iRatio) {
    // Constant pressure, decelerating flow
    const frac = (t - 0.02) / (iRatio - 0.02);
    const flowDecay = 0.9 * Math.exp(-3.5 * frac);
    // Volume is integral of decelerating flow
    const vol = 0.05 + (1 - Math.exp(-3.5 * frac)) / (1 - Math.exp(-3.5)) * 0.9;
    return {
      pressure: peep + 0.7,
      flow: flowDecay,
      volume: Math.min(vol, 0.95),
    };
  }
  // Expiration
  const eFrac = (t - iRatio) / (1 - iRatio);
  const decay = Math.exp(-4 * eFrac);
  return {
    flow: -0.6 * decay,
    pressure: peep + 0.7 * decay * 0.3 + peep * (1 - decay) * 0.5,
    volume: 0.95 * decay,
  };
}

function psvWaveform(t: number): WaveformPoint {
  const peep = 0.15;
  const iRatio = 0.28; // shorter, patient-determined
  if (t < 0.015) {
    // Patient trigger — slight negative pressure dip
    const frac = t / 0.015;
    return {
      pressure: peep - 0.05 * Math.sin(frac * Math.PI),
      flow: frac * 0.3,
      volume: 0,
    };
  }
  if (t < 0.04) {
    // Rapid pressurisation
    const frac = (t - 0.015) / 0.025;
    return {
      pressure: peep + frac * 0.55,
      flow: 0.3 + frac * 0.55,
      volume: frac * 0.08,
    };
  }
  if (t < iRatio) {
    // Constant pressure, decelerating flow
    const frac = (t - 0.04) / (iRatio - 0.04);
    const peakFlow = 0.85;
    const flowNow = peakFlow * Math.exp(-3 * frac);
    const vol = 0.08 + (1 - Math.exp(-3 * frac)) / (1 - Math.exp(-3)) * 0.82;
    // Cycle when flow hits 25% peak
    return {
      pressure: peep + 0.55 * (flowNow > peakFlow * 0.25 ? 1 : (1 - (frac - 0.46) * 3)),
      flow: Math.max(flowNow, 0),
      volume: Math.min(vol, 0.9),
    };
  }
  // Expiration
  const eFrac = (t - iRatio) / (1 - iRatio);
  const decay = Math.exp(-3.5 * eFrac);
  return {
    pressure: peep + 0.1 * decay,
    flow: -0.5 * decay,
    volume: 0.9 * decay,
  };
}

const WAVEFORM_FNS: Record<Mode, (t: number) => WaveformPoint> = {
  vcv: vcvWaveform,
  pcv: pcvWaveform,
  psv: psvWaveform,
};

const TRACE_COLORS = {
  pressure: "hsl(210 70% 50%)",
  flow: "hsl(150 60% 40%)",
  volume: "hsl(35 70% 50%)",
};

export const VentilatorWaveformsDiagram = () => {
  const [mode, setMode] = useState<Mode>("vcv");
  const [rr, setRR] = useState(14);
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [activeTrace, setActiveTrace] = useState<string | null>(null);

  const breaths = 2;
  const svgW = 460, traceH = 75, gap = 8;
  const padL = 48, padR = 15, padT = 12, padB = 25;
  const plotW = svgW - padL - padR;
  const svgH = padT + traceH * 3 + gap * 2 + padB;

  // Generate waveform data for N breaths
  const steps = 200;
  const waveformFn = WAVEFORM_FNS[mode];

  const data = useMemo(() => {
    const pts: WaveformPoint[] = [];
    for (let i = 0; i <= steps * breaths; i++) {
      const t = (i / steps) % 1;
      pts.push(waveformFn(t));
    }
    return pts;
  }, [mode, waveformFn]);

  const toX = (i: number) => padL + (i / (steps * breaths)) * plotW;

  const makeTracePath = (accessor: (pt: WaveformPoint) => number, top: number, height: number, minV: number, maxV: number): string => {
    return data.map((pt, i) => {
      const x = toX(i);
      const val = accessor(pt);
      const y = top + height - ((val - minV) / (maxV - minV)) * height;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    }).join(" ");
  };

  const pressTop = padT;
  const flowTop = padT + traceH + gap;
  const volTop = padT + (traceH + gap) * 2;

  const pressPath = useMemo(() => makeTracePath(p => p.pressure, pressTop, traceH, -0.1, 1.1), [data]);
  const flowPath = useMemo(() => makeTracePath(p => p.flow, flowTop, traceH, -0.8, 1.1), [data]);
  const volPath = useMemo(() => makeTracePath(p => p.volume, volTop, traceH, -0.1, 1.1), [data]);

  // Pressure labels based on mode
  const pressLabels = mode === "vcv"
    ? [{ y: 0.85, label: "Ppeak" }, { y: 0.7, label: "Pplat" }, { y: 0.15, label: "PEEP" }]
    : [{ y: 0.85, label: "Pinsp" }, { y: 0.15, label: "PEEP" }];

  // Inspiration time marker
  const iTime = mode === "psv" ? 0.28 : 0.33;
  const iEndX = toX(iTime * steps);

  const traces = [
    { id: "pressure", label: "Pressure (cmH₂O)", color: TRACE_COLORS.pressure, path: pressPath, top: pressTop },
    { id: "flow", label: "Flow (L/min)", color: TRACE_COLORS.flow, path: flowPath, top: flowTop },
    { id: "volume", label: "Volume (ml)", color: TRACE_COLORS.volume, path: volPath, top: volTop },
  ];

  return (
    <div className="space-y-4">
      {/* Mode selector */}
      <div className="flex flex-wrap gap-1.5">
        {(["vcv", "pcv", "psv"] as Mode[]).map(m => (
          <button key={m} onClick={() => setMode(m)}
            className={`px-2.5 py-1 rounded text-xs font-medium border transition-all ${
              mode === m ? "border-primary/50 bg-primary/10 text-foreground" : "border-border bg-secondary/30 text-muted-foreground hover:bg-secondary/60"
            }`}>
            {MODES[m].label.split("(")[0].trim()}
          </button>
        ))}
      </div>

      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full">
        {/* Trace backgrounds */}
        {traces.map(tr => (
          <rect key={tr.id} x={padL} y={tr.top} width={plotW} height={traceH}
            fill="hsl(var(--secondary)/0.12)" rx="3"
            className="cursor-pointer" onClick={() => setActiveTrace(activeTrace === tr.id ? null : tr.id)} />
        ))}

        {/* Inspiration phase shading (first breath only for clarity) */}
        {showAnnotations && (
          <>
            <rect x={padL} y={padT} width={iEndX - padL} height={traceH * 3 + gap * 2}
              fill="hsl(210 70% 50%)" opacity="0.04" />
            <text x={(padL + iEndX) / 2} y={padT + 8} fontSize="7" fill="hsl(210 70% 50%)" textAnchor="middle" opacity="0.6">
              Insp
            </text>
            <text x={(iEndX + toX(steps)) / 2} y={padT + 8} fontSize="7" fill="hsl(var(--muted-foreground))" textAnchor="middle" opacity="0.4">
              Exp
            </text>
            {/* I:E boundary */}
            <line x1={iEndX} y1={padT} x2={iEndX} y2={padT + traceH * 3 + gap * 2}
              stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.3" />
          </>
        )}

        {/* Trace labels */}
        {traces.map(tr => (
          <text key={`lbl-${tr.id}`} x={padL - 4} y={tr.top + traceH / 2 + 3} textAnchor="end" fontSize="8"
            fill={tr.color} fontWeight="600">
            {tr.id === "pressure" ? "Paw" : tr.id === "flow" ? "Flow" : "Vol"}
          </text>
        ))}

        {/* Zero line for flow (expiratory is negative) */}
        <line x1={padL} y1={flowTop + traceH * (1.1 / 1.9)} x2={svgW - padR} y2={flowTop + traceH * (1.1 / 1.9)}
          stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" opacity="0.3" />
        <text x={padL - 4} y={flowTop + traceH * (1.1 / 1.9) + 3} textAnchor="end" fontSize="6" fill="hsl(var(--muted-foreground))">0</text>

        {/* Waveform traces */}
        {traces.map(tr => (
          <path key={tr.id} d={tr.path} fill="none" stroke={tr.color}
            strokeWidth={activeTrace === tr.id ? 3 : 2}
            opacity={activeTrace && activeTrace !== tr.id ? 0.3 : 1}
            className="transition-all duration-200" />
        ))}

        {/* Pressure annotations */}
        {showAnnotations && pressLabels.map(lbl => {
          const y = pressTop + traceH - (lbl.y / 1.2) * traceH;
          return (
            <g key={lbl.label}>
              <line x1={padL} y1={y} x2={padL + 20} y2={y} stroke={TRACE_COLORS.pressure} strokeWidth="0.5" strokeDasharray="2 2" opacity="0.5" />
              <text x={padL + 22} y={y + 3} fontSize="6" fill={TRACE_COLORS.pressure} opacity="0.7">{lbl.label}</text>
            </g>
          );
        })}

        {/* VCV specific: Ppeak vs Pplat annotation */}
        {showAnnotations && mode === "vcv" && (
          <g opacity="0.5">
            <line x1={iEndX - 8} y1={pressTop + traceH - (0.85 / 1.2) * traceH}
              x2={iEndX - 8} y2={pressTop + traceH - (0.7 / 1.2) * traceH}
              stroke={TRACE_COLORS.pressure} strokeWidth="1" />
            <text x={iEndX - 3} y={pressTop + traceH - (0.77 / 1.2) * traceH} fontSize="5" fill={TRACE_COLORS.pressure}>
              R×Flow
            </text>
          </g>
        )}

        {/* PSV trigger annotation */}
        {showAnnotations && mode === "psv" && (
          <g opacity="0.5">
            <text x={padL + 4} y={pressTop + traceH - 4} fontSize="6" fill={TRACE_COLORS.pressure}>
              ↓ trigger
            </text>
            <text x={toX(iTime * steps * 0.7)} y={flowTop + traceH - 8} fontSize="6" fill={TRACE_COLORS.flow}>
              25% peak → cycle off
            </text>
          </g>
        )}

        {/* Time axis */}
        <text x={padL + plotW / 2} y={svgH - 5} textAnchor="middle" fontSize="8" fill="hsl(var(--muted-foreground))" fontWeight="600">
          Time →
        </text>
        {/* Breath markers */}
        {Array.from({ length: breaths }).map((_, i) => (
          <text key={i} x={toX(steps * i + steps / 2)} y={svgH - 14} textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))" opacity="0.4">
            Breath {i + 1}
          </text>
        ))}
      </svg>

      {/* Mode info panel */}
      <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
        <p className="text-sm font-semibold text-foreground mb-1">{MODES[mode].label}</p>
        <p className="text-sm text-muted-foreground leading-relaxed">{MODES[mode].description}</p>
        <div className="grid grid-cols-3 gap-2 mt-3">
          {[
            { label: "Control", value: MODES[mode].control },
            { label: "Trigger", value: MODES[mode].trigger },
            { label: "Cycle", value: MODES[mode].cycle },
          ].map(item => (
            <div key={item.label} className="text-center">
              <p className="text-[10px] text-muted-foreground">{item.label}</p>
              <p className="text-xs font-medium text-foreground">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button onClick={() => setShowAnnotations(!showAnnotations)}
          className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all ${
            showAnnotations ? "bg-primary/10 border-primary/40 text-primary" : "border-border text-muted-foreground"
          }`}>
          {showAnnotations ? "Labels ✓" : "Labels"}
        </button>
        {(["pressure", "flow", "volume"] as const).map(tr => (
          <button key={tr} onClick={() => setActiveTrace(activeTrace === tr ? null : tr)}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
              activeTrace === tr ? "bg-primary/10 border-primary/40 text-foreground" : "border-border text-muted-foreground hover:bg-secondary/60"
            }`}>
            <span className="inline-block w-2 h-2 rounded-full mr-1" style={{ backgroundColor: TRACE_COLORS[tr] }} />
            {tr.charAt(0).toUpperCase() + tr.slice(1)}
          </button>
        ))}
      </div>

      <p className="text-xs text-muted-foreground text-center">
        Click a trace to isolate it. Toggle labels for annotation details.
      </p>
    </div>
  );
};

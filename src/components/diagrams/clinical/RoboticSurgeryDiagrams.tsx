import { useEffect, useState } from "react";
import { DiagramFigure } from "../_shared/DiagramFigure";

/**
 * Robotic-surgery ventilation strategy — animated lungs showing FRC
 * reduction with pneumoperitoneum + steep Trendelenburg, and the effect
 * of lung-protective settings (low VT, PEEP, driving pressure).
 */
export const RoboticVentilationStrategyDiagram = () => {
  const [mode, setMode] = useState<"baseline" | "pneumo" | "protective">("baseline");

  const cfg = {
    baseline: {
      diaphragmY: 260,
      lungHeight: 170,
      vt: 500,
      peep: 5,
      pplat: 18,
      compliance: 60,
      caption: "Supine, no pneumoperitoneum",
    },
    pneumo: {
      diaphragmY: 210,
      lungHeight: 115,
      vt: 500,
      peep: 5,
      pplat: 34,
      compliance: 30,
      caption: "12–15 mmHg CO₂ + 40° head-down — FRC↓, compliance↓, Pplat↑",
    },
    protective: {
      diaphragmY: 215,
      lungHeight: 125,
      vt: 400,
      peep: 10,
      pplat: 26,
      compliance: 40,
      caption: "Protective: VT 6 ml/kg PBW, PEEP 10, recruitment, permissive hypercapnia",
    },
  }[mode];

  const drivingPressure = cfg.pplat - cfg.peep;

  return (
    <DiagramFigure
      title="Ventilation strategy in steep Trendelenburg"
      caption={cfg.caption}
    >
      <div className="flex flex-wrap gap-2 mb-3">
        {(["baseline", "pneumo", "protective"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
              mode === m
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background border-border hover:bg-muted"
            }`}
          >
            {m === "baseline" ? "Supine baseline" : m === "pneumo" ? "Pneumo + tilt" : "Protective settings"}
          </button>
        ))}
      </div>

      <svg viewBox="0 0 520 340" className="w-full h-auto" role="img" aria-label="Animated lung volumes diagram">
        {/* Thoracic outline */}
        <ellipse cx="260" cy="200" rx="180" ry="110" fill="none" stroke="hsl(var(--border))" strokeWidth="2" />
        {/* Diaphragm (animated) */}
        <path
          d={`M 90 ${cfg.diaphragmY} Q 260 ${cfg.diaphragmY + 40} 430 ${cfg.diaphragmY} L 430 310 L 90 310 Z`}
          fill="hsl(var(--muted))"
          stroke="hsl(var(--muted-foreground))"
          strokeWidth="1.5"
          style={{ transition: "d 0.6s ease" }}
        />
        <text x="260" y={cfg.diaphragmY + 25} textAnchor="middle" fontSize="11" fill="hsl(var(--muted-foreground))">
          diaphragm
        </text>
        {/* Lungs — pair of ellipses whose height animates */}
        {[190, 330].map((cx) => (
          <ellipse
            key={cx}
            cx={cx}
            cy={200 - (170 - cfg.lungHeight) / 2}
            rx="55"
            ry={cfg.lungHeight / 2}
            fill="hsl(var(--physiology) / 0.15)"
            stroke="hsl(var(--physiology))"
            strokeWidth="1.5"
            style={{ transition: "all 0.6s ease" }}
          >
            <animate attributeName="ry" values={`${cfg.lungHeight / 2};${cfg.lungHeight / 2 + 6};${cfg.lungHeight / 2}`} dur="3s" repeatCount="indefinite" />
          </ellipse>
        ))}
        {/* Trachea */}
        <rect x="253" y="70" width="14" height="70" fill="hsl(var(--muted))" stroke="hsl(var(--muted-foreground))" />
        {/* Metrics panel */}
        <g transform="translate(20, 20)">
          <rect width="130" height="90" rx="6" fill="hsl(var(--card))" stroke="hsl(var(--border))" />
          <text x="10" y="18" fontSize="11" fill="hsl(var(--muted-foreground))">Tidal volume</text>
          <text x="10" y="34" fontSize="14" fontWeight="600" fill="hsl(var(--foreground))">{cfg.vt} ml</text>
          <text x="10" y="54" fontSize="11" fill="hsl(var(--muted-foreground))">PEEP</text>
          <text x="10" y="70" fontSize="14" fontWeight="600" fill="hsl(var(--foreground))">{cfg.peep} cmH₂O</text>
        </g>
        <g transform="translate(370, 20)">
          <rect width="130" height="90" rx="6" fill="hsl(var(--card))" stroke="hsl(var(--border))" />
          <text x="10" y="18" fontSize="11" fill="hsl(var(--muted-foreground))">Pplat</text>
          <text x="10" y="34" fontSize="14" fontWeight="600" fill={cfg.pplat > 30 ? "hsl(var(--destructive))" : "hsl(var(--foreground))"}>{cfg.pplat} cmH₂O</text>
          <text x="10" y="54" fontSize="11" fill="hsl(var(--muted-foreground))">Driving pressure</text>
          <text x="10" y="70" fontSize="14" fontWeight="600" fill={drivingPressure > 15 ? "hsl(var(--destructive))" : "hsl(var(--physiology))"}>{drivingPressure} cmH₂O</text>
        </g>
      </svg>

      <p className="text-xs text-muted-foreground mt-3">
        Target: driving pressure &lt; 15 cmH₂O, Pplat ≤ 30 cmH₂O. Accept
        permissive hypercapnia rather than harming lungs.
      </p>
    </DiagramFigure>
  );
};

/**
 * CO₂ pneumoperitoneum absorption — animated PaCO₂ vs time curve
 * showing the classic 15–20 min rise and plateau, with ventilator
 * response.
 */
export const CO2AbsorptionDiagram = () => {
  const [t, setT] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setT((v) => (v + 1) % 60), 250);
    return () => clearInterval(id);
  }, []);

  // Time axis 0-60 min; PaCO₂ rises from 5.0 to ~6.8 by minute 20, plateaus
  const paco2At = (min: number) => {
    if (min <= 20) return 5.0 + (6.8 - 5.0) * (1 - Math.exp(-min / 6));
    return 6.8 + 0.05 * Math.sin(min / 3);
  };
  const mvAt = (min: number) => {
    if (min <= 20) return 6.0 + 2.0 * (1 - Math.exp(-min / 6));
    return 8.0;
  };

  const points = Array.from({ length: t + 1 }, (_, i) => {
    const x = 60 + i * 7;
    const y = 220 - (paco2At(i) - 4) * 55;
    return `${x},${y}`;
  }).join(" ");

  const mvPoints = Array.from({ length: t + 1 }, (_, i) => {
    const x = 60 + i * 7;
    const y = 220 - (mvAt(i) - 4) * 20;
    return `${x},${y}`;
  }).join(" ");

  return (
    <DiagramFigure
      title="CO₂ pneumoperitoneum — absorption kinetics"
      caption="PaCO₂ (red) rises exponentially over ~15–20 min then plateaus; minute ventilation (blue) must rise 20–30% to compensate."
    >
      <svg viewBox="0 0 520 280" className="w-full h-auto" role="img" aria-label="CO2 absorption curve over time">
        {/* Axes */}
        <line x1="60" y1="30" x2="60" y2="240" stroke="hsl(var(--border))" />
        <line x1="60" y1="240" x2="490" y2="240" stroke="hsl(var(--border))" />
        {/* Y ticks (PaCO₂ 4-8 kPa) */}
        {[4, 5, 6, 7, 8].map((v) => (
          <g key={v}>
            <line x1="55" x2="60" y1={220 - (v - 4) * 55} y2={220 - (v - 4) * 55} stroke="hsl(var(--muted-foreground))" />
            <text x="50" y={224 - (v - 4) * 55} textAnchor="end" fontSize="10" fill="hsl(var(--muted-foreground))">{v}</text>
          </g>
        ))}
        <text x="20" y="130" fontSize="11" fill="hsl(var(--muted-foreground))" transform="rotate(-90 20 130)">PaCO₂ (kPa)</text>
        {/* X ticks */}
        {[0, 15, 30, 45, 60].map((m) => (
          <g key={m}>
            <line x1={60 + m * 7} x2={60 + m * 7} y1="240" y2="245" stroke="hsl(var(--muted-foreground))" />
            <text x={60 + m * 7} y="258" textAnchor="middle" fontSize="10" fill="hsl(var(--muted-foreground))">{m}</text>
          </g>
        ))}
        <text x="275" y="275" textAnchor="middle" fontSize="11" fill="hsl(var(--muted-foreground))">Time from insufflation (min)</text>
        {/* Insufflation marker */}
        <line x1="60" y1="30" x2="60" y2="240" stroke="hsl(var(--pharmacology))" strokeDasharray="3 3" />
        <text x="65" y="45" fontSize="10" fill="hsl(var(--pharmacology))">insufflation on</text>
        {/* Plateau band */}
        <rect x={60 + 20 * 7} y="30" width={40 * 7} height="210" fill="hsl(var(--muted) / 0.35)" />
        <text x={60 + 40 * 7} y="45" textAnchor="middle" fontSize="10" fill="hsl(var(--muted-foreground))">plateau phase</text>
        {/* PaCO2 curve */}
        <polyline points={points} fill="none" stroke="hsl(var(--destructive))" strokeWidth="2.5" />
        {/* Minute ventilation curve */}
        <polyline points={mvPoints} fill="none" stroke="hsl(var(--physiology))" strokeWidth="2" strokeDasharray="4 3" />
        {/* Current PaCO₂ readout */}
        <circle cx={60 + t * 7} cy={220 - (paco2At(t) - 4) * 55} r="4" fill="hsl(var(--destructive))" />
        <text x={60 + t * 7 + 8} y={220 - (paco2At(t) - 4) * 55 - 4} fontSize="11" fontWeight="600" fill="hsl(var(--destructive))">
          {paco2At(t).toFixed(1)} kPa
        </text>
        {/* Legend */}
        <g transform="translate(340, 60)">
          <line x1="0" y1="0" x2="20" y2="0" stroke="hsl(var(--destructive))" strokeWidth="2.5" />
          <text x="26" y="4" fontSize="10" fill="hsl(var(--foreground))">PaCO₂</text>
          <line x1="0" y1="18" x2="20" y2="18" stroke="hsl(var(--physiology))" strokeWidth="2" strokeDasharray="4 3" />
          <text x="26" y="22" fontSize="10" fill="hsl(var(--foreground))">Minute ventilation</text>
        </g>
      </svg>
    </DiagramFigure>
  );
};

/**
 * Haemodynamic response to insufflation + steep Trendelenburg —
 * animated bar chart across 4 phases showing MAP, CVP, CO, SVR.
 */
export const RoboticHaemodynamicsDiagram = () => {
  const phases = [
    { label: "Supine baseline", map: 85, cvp: 6, co: 100, svr: 100 },
    { label: "Insufflation (12–15 mmHg)", map: 95, cvp: 12, co: 95, svr: 125 },
    { label: "Steep Trendelenburg 40°", map: 105, cvp: 18, co: 100, svr: 130 },
    { label: "Desufflation + supine", map: 78, cvp: 7, co: 95, svr: 90 },
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % phases.length), 2200);
    return () => clearInterval(id);
  }, [phases.length]);

  const p = phases[i];
  const metrics: Array<{ key: keyof typeof p; label: string; val: number; unit: string; color: string; max: number }> = [
    { key: "map", label: "MAP", val: p.map as number, unit: "mmHg", color: "hsl(var(--destructive))", max: 130 },
    { key: "cvp", label: "CVP", val: p.cvp as number, unit: "mmHg", color: "hsl(var(--physiology))", max: 25 },
    { key: "co", label: "CO", val: p.co as number, unit: "%", color: "hsl(var(--pharmacology))", max: 140 },
    { key: "svr", label: "SVR", val: p.svr as number, unit: "%", color: "hsl(var(--clinical))", max: 160 },
  ];

  return (
    <DiagramFigure
      title="Haemodynamic response — insufflation & steep Trendelenburg"
      caption={`Phase ${i + 1}/4 · ${p.label}. CVP is misleading here — hydrostatic transmission, not true preload.`}
    >
      <svg viewBox="0 0 520 260" className="w-full h-auto" role="img" aria-label="Haemodynamic bar chart across phases">
        {/* Phase indicator */}
        <g transform="translate(20, 15)">
          {phases.map((ph, idx) => (
            <g key={ph.label}>
              <circle cx={idx * 130 + 12} cy="10" r="8" fill={idx === i ? "hsl(var(--primary))" : "hsl(var(--muted))"} style={{ transition: "fill 0.4s" }} />
              <text x={idx * 130 + 26} y="14" fontSize="10" fill="hsl(var(--foreground))">{ph.label}</text>
            </g>
          ))}
        </g>
        {/* Bars */}
        {metrics.map((m, idx) => {
          const x = 60 + idx * 110;
          const barHeight = (m.val / m.max) * 140;
          return (
            <g key={m.key}>
              <rect x={x} y="200" width="60" height="4" fill="hsl(var(--border))" />
              <rect
                x={x}
                y={200 - barHeight}
                width="60"
                height={barHeight}
                fill={m.color}
                opacity="0.85"
                style={{ transition: "y 0.6s ease, height 0.6s ease" }}
              />
              <text x={x + 30} y="220" textAnchor="middle" fontSize="12" fontWeight="600" fill="hsl(var(--foreground))">{m.label}</text>
              <text x={x + 30} y="236" textAnchor="middle" fontSize="11" fill="hsl(var(--muted-foreground))">{m.val} {m.unit}</text>
              <text x={x + 30} y={195 - barHeight} textAnchor="middle" fontSize="10" fill={m.color} style={{ transition: "y 0.6s ease" }}>
                {m.val}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="flex gap-2 mt-3">
        {phases.map((ph, idx) => (
          <button
            key={ph.label}
            onClick={() => setI(idx)}
            className={`px-2 py-1 text-xs rounded border transition-colors ${
              idx === i ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border hover:bg-muted"
            }`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </DiagramFigure>
  );
};

import { useState, useEffect, useCallback } from "react";

const TOTAL_FRAMES = 300; // one full cardiac cycle
const PHASES = [
  { name: "Atrial Systole", start: 0, end: 40, color: "hsl(210 70% 50%)" },
  { name: "Isovolumetric Contraction", start: 40, end: 70, color: "hsl(340 60% 50%)" },
  { name: "Rapid Ejection", start: 70, end: 130, color: "hsl(0 70% 50%)" },
  { name: "Reduced Ejection", start: 130, end: 180, color: "hsl(20 70% 50%)" },
  { name: "Isovolumetric Relaxation", start: 180, end: 210, color: "hsl(170 50% 40%)" },
  { name: "Rapid Filling", start: 210, end: 260, color: "hsl(260 50% 55%)" },
  { name: "Reduced Filling (Diastasis)", start: 260, end: 300, color: "hsl(215 25% 60%)" },
];

// Pressure waveform generators (mmHg)
const aorticPressure = (f: number): number => {
  const t = f / TOTAL_FRAMES;
  if (t < 0.13) return 80 + t * 100; // early rise
  if (t < 0.23) return 80 + 13 + Math.sin((t - 0.13) / 0.1 * Math.PI) * 40; // peak ~120
  if (t < 0.43) return 120 - (t - 0.23) * 80; // ejection decline
  if (t < 0.47) return 104 - (t - 0.43) * 200 + 8; // dicrotic notch dip
  if (t < 0.5) return 95 + Math.sin((t - 0.47) / 0.03 * Math.PI) * 5; // notch bounce
  return 80 + (1 - t) * 20; // diastolic decline
};

const lvPressure = (f: number): number => {
  const t = f / TOTAL_FRAMES;
  if (t < 0.05) return 8 + t * 40; // atrial kick raises LV
  if (t < 0.13) return 10 + ((t - 0.05) / 0.08) * 70; // isovolumetric contraction
  if (t < 0.23) return 80 + Math.sin((t - 0.13) / 0.1 * Math.PI) * 45; // peak ~125
  if (t < 0.43) return 125 - ((t - 0.23) / 0.2) * 115; // decline during ejection
  if (t < 0.6) return 10 * Math.max(0, 1 - (t - 0.43) / 0.17); // isovolumetric relaxation
  return 2 + (t - 0.6) * 15; // filling, gradual rise
};

const laPressure = (f: number): number => {
  const t = f / TOTAL_FRAMES;
  // a, c, v waves
  const aWave = t < 0.1 ? Math.sin(t / 0.1 * Math.PI) * 6 : 0;
  const cWave = t > 0.12 && t < 0.2 ? Math.sin((t - 0.12) / 0.08 * Math.PI) * 3 : 0;
  const vWave = t > 0.3 && t < 0.6 ? Math.sin((t - 0.3) / 0.3 * Math.PI) * 8 : 0;
  return 6 + aWave + cWave + vWave;
};

// ECG-like waveform (arbitrary units 0-1 range)
const ecgWaveform = (f: number): number => {
  const t = f / TOTAL_FRAMES;
  // P wave
  if (t < 0.08) return 0.5 + Math.sin(t / 0.08 * Math.PI) * 0.08;
  // PR segment
  if (t < 0.12) return 0.5;
  // QRS
  if (t < 0.13) return 0.5 - (t - 0.12) / 0.01 * 0.1; // Q
  if (t < 0.15) return 0.4 + ((t - 0.13) / 0.02) * 0.5; // R
  if (t < 0.17) return 0.9 - ((t - 0.15) / 0.02) * 0.55; // S
  if (t < 0.19) return 0.35 + ((t - 0.17) / 0.02) * 0.15; // return
  // ST segment
  if (t < 0.28) return 0.5;
  // T wave
  if (t < 0.4) return 0.5 + Math.sin((t - 0.28) / 0.12 * Math.PI) * 0.1;
  return 0.5;
};

// Heart sounds
const heartSounds = (f: number): { s1: boolean; s2: boolean } => {
  const t = f / TOTAL_FRAMES;
  return {
    s1: t > 0.12 && t < 0.16,
    s2: t > 0.43 && t < 0.47,
  };
};

export const WiggersDiagram = () => {
  const [frame, setFrame] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % TOTAL_FRAMES);
    }, 33 / speed);
    return () => clearInterval(interval);
  }, [playing, speed]);

  const currentPhase = PHASES.find((p) => frame >= p.start && frame < p.end) || PHASES[6];

  const w = 560;
  const h = 520;
  const padL = 55;
  const padR = 20;
  const plotW = w - padL - padR;

  // Regions: ECG, Pressures, Heart sounds, Phase bar
  const ecgTop = 20;
  const ecgH = 60;
  const pressTop = 100;
  const pressH = 250;
  const hsTop = 370;
  const hsH = 30;
  const phaseTop = 420;
  const phaseH = 24;

  const timeToX = (f: number) => padL + (f / TOTAL_FRAMES) * plotW;

  // Generate paths
  const generatePath = (fn: (f: number) => number, top: number, height: number, minVal: number, maxVal: number): string => {
    const pts: string[] = [];
    for (let i = 0; i <= TOTAL_FRAMES; i += 2) {
      const x = timeToX(i);
      const val = fn(i);
      const y = top + height - ((val - minVal) / (maxVal - minVal)) * height;
      pts.push(`${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`);
    }
    return pts.join(" ");
  };

  const ecgPath = generatePath(ecgWaveform, ecgTop, ecgH, 0.2, 1.0);
  const aorticPath = generatePath(aorticPressure, pressTop, pressH, -5, 135);
  const lvPath = generatePath(lvPressure, pressTop, pressH, -5, 135);
  const laPath = generatePath(laPressure, pressTop, pressH, -5, 135);

  const cursorX = timeToX(frame);
  const hs = heartSounds(frame);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <svg viewBox={`0 0 ${w} ${h + 50}`} className="w-full">
        {/* Background regions */}
        <rect x={padL} y={ecgTop} width={plotW} height={ecgH} fill="hsl(210 20% 97%)" rx="4" />
        <rect x={padL} y={pressTop} width={plotW} height={pressH} fill="hsl(210 20% 97%)" rx="4" />
        <rect x={padL} y={hsTop} width={plotW} height={hsH} fill="hsl(210 20% 97%)" rx="4" />

        {/* Labels */}
        <text x={padL - 8} y={ecgTop + ecgH / 2 + 4} textAnchor="end" fontSize="10" className="fill-muted-foreground font-medium">ECG</text>

        {/* Pressure Y-axis labels */}
        {[0, 40, 80, 120].map((v) => {
          const y = pressTop + pressH - ((v + 5) / 140) * pressH;
          return (
            <g key={v}>
              <line x1={padL} y1={y} x2={padL + plotW} y2={y} stroke="hsl(210 20% 92%)" strokeWidth="0.5" />
              <text x={padL - 8} y={y + 3} textAnchor="end" fontSize="9" className="fill-muted-foreground">{v}</text>
            </g>
          );
        })}
        <text x={8} y={pressTop + pressH / 2} textAnchor="middle" fontSize="10" className="fill-muted-foreground font-medium" transform={`rotate(-90, 8, ${pressTop + pressH / 2})`}>
          mmHg
        </text>

        <text x={padL - 8} y={hsTop + hsH / 2 + 4} textAnchor="end" fontSize="9" className="fill-muted-foreground font-medium">Sounds</text>

        {/* Phase bar */}
        {PHASES.map((p) => (
          <rect
            key={p.name}
            x={timeToX(p.start)}
            y={phaseTop}
            width={timeToX(p.end) - timeToX(p.start)}
            height={phaseH}
            fill={p.color}
            opacity={frame >= p.start && frame < p.end ? 0.8 : 0.15}
            rx="2"
          />
        ))}

        {/* ECG trace */}
        <path d={ecgPath} fill="none" stroke="hsl(170 50% 35%)" strokeWidth="1.5" />

        {/* Pressure traces */}
        <path d={aorticPath} fill="none" stroke="hsl(0 65% 50%)" strokeWidth="2" />
        <path d={lvPath} fill="none" stroke="hsl(210 70% 45%)" strokeWidth="2" />
        <path d={laPath} fill="none" stroke="hsl(340 55% 55%)" strokeWidth="1.5" strokeDasharray="4 2" />

        {/* Heart sounds markers */}
        {hs.s1 && (
          <rect x={cursorX - 4} y={hsTop + 4} width={8} height={hsH - 8} fill="hsl(210 70% 45%)" rx="2" />
        )}
        {hs.s2 && (
          <rect x={cursorX - 4} y={hsTop + 4} width={8} height={hsH - 8} fill="hsl(0 65% 50%)" rx="2" />
        )}
        {/* S1/S2 labels */}
        <text x={timeToX(42)} y={hsTop + hsH / 2 + 3} textAnchor="middle" fontSize="8" className="fill-primary font-semibold">S1</text>
        <text x={timeToX(135)} y={hsTop + hsH / 2 + 3} textAnchor="middle" fontSize="8" className="fill-destructive font-semibold">S2</text>

        {/* Cursor line */}
        <line x1={cursorX} y1={ecgTop} x2={cursorX} y2={phaseTop + phaseH} stroke="hsl(215 25% 30%)" strokeWidth="1" opacity="0.5" strokeDasharray="3 2" />

        {/* Legend */}
        <line x1={padL + 10} y1={h + 10} x2={padL + 30} y2={h + 10} stroke="hsl(0 65% 50%)" strokeWidth="2" />
        <text x={padL + 34} y={h + 14} fontSize="10" className="fill-foreground">Aortic</text>

        <line x1={padL + 90} y1={h + 10} x2={padL + 110} y2={h + 10} stroke="hsl(210 70% 45%)" strokeWidth="2" />
        <text x={padL + 114} y={h + 14} fontSize="10" className="fill-foreground">LV</text>

        <line x1={padL + 150} y1={h + 10} x2={padL + 170} y2={h + 10} stroke="hsl(340 55% 55%)" strokeWidth="1.5" strokeDasharray="4 2" />
        <text x={padL + 174} y={h + 14} fontSize="10" className="fill-foreground">LA</text>

        <rect x={padL + 230} y={h + 5} width={10} height={10} fill="hsl(170 50% 35%)" rx="1" />
        <text x={padL + 244} y={h + 14} fontSize="10" className="fill-foreground">ECG</text>
      </svg>

      {/* Current phase */}
      <div className="text-center mt-2 mb-4">
        <span
          className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold text-primary-foreground transition-colors duration-200"
          style={{ backgroundColor: currentPhase.color }}
        >
          {currentPhase.name}
        </span>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => setPlaying(!playing)}
          className="px-4 py-1.5 rounded-lg text-sm font-medium border border-border text-foreground hover:bg-muted transition-colors"
        >
          {playing ? "⏸ Pause" : "▶ Play"}
        </button>
        {[0.5, 1, 2].map((s) => (
          <button
            key={s}
            onClick={() => setSpeed(s)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
              speed === s
                ? "bg-primary/10 border-primary text-primary"
                : "border-border text-muted-foreground hover:border-primary/50"
            }`}
          >
            {s}×
          </button>
        ))}
      </div>
    </div>
  );
};

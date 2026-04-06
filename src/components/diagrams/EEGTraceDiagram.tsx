import { useState, useMemo } from "react";

type DepthStage = {
  label: string;
  bisRange: string;
  eegDescription: string;
  frequency: number;      // dominant Hz
  amplitude: number;      // µV scale factor (0-1)
  burstSuppress: boolean;
  isoelectric: boolean;
  beta: number;           // high-freq component weight
};

const stages: DepthStage[] = [
  {
    label: "Awake (eyes open)",
    bisRange: "95–100",
    eegDescription: "Low-amplitude, high-frequency beta activity (13–30 Hz). Desynchronised cortex. EMG artefact often present.",
    frequency: 22, amplitude: 0.25, burstSuppress: false, isoelectric: false, beta: 0.8,
  },
  {
    label: "Sedation / Light",
    bisRange: "70–85",
    eegDescription: "Increasing alpha (8–13 Hz) with anterior predominance ('alpha anteriorisation'). Amplitude increases. Beta diminishes.",
    frequency: 11, amplitude: 0.45, burstSuppress: false, isoelectric: false, beta: 0.3,
  },
  {
    label: "Surgical Anaesthesia",
    bisRange: "40–60",
    eegDescription: "Slow delta/theta activity (1–7 Hz). High-amplitude synchronised waves. Spindles may be seen. Target range for GA.",
    frequency: 4, amplitude: 0.85, burstSuppress: false, isoelectric: false, beta: 0.05,
  },
  {
    label: "Deep Anaesthesia",
    bisRange: "20–40",
    eegDescription: "Very slow, high-amplitude delta (<4 Hz). Approaching burst suppression. Suppression ratio begins to rise.",
    frequency: 2, amplitude: 1.0, burstSuppress: false, isoelectric: false, beta: 0.0,
  },
  {
    label: "Burst Suppression",
    bisRange: "5–20",
    eegDescription: "Alternating bursts of high-amplitude activity and periods of isoelectric silence (suppression). SR >0%. Excessive depth — reduce agent.",
    frequency: 2, amplitude: 1.0, burstSuppress: true, isoelectric: false, beta: 0.0,
  },
  {
    label: "Isoelectric",
    bisRange: "0–5",
    eegDescription: "Flat-line EEG. Complete cortical electrical silence. <0.5 µV. SR 100%. Seen with very deep anaesthesia, hypothermic circulatory arrest, or brain death.",
    frequency: 0, amplitude: 0, burstSuppress: false, isoelectric: true, beta: 0.0,
  },
];

/**
 * Generate a pseudo-EEG waveform polyline from stage parameters.
 * Uses deterministic seeded noise so the trace is stable per stage.
 */
function generateTrace(stage: DepthStage, width: number, height: number, midY: number): string {
  const points: string[] = [];
  const numPoints = 600;
  const dx = width / numPoints;

  // Deterministic noise from a seed
  const seed = stage.frequency * 1000 + stage.amplitude * 500;
  const noise = (i: number) => {
    const x = Math.sin(seed + i * 0.7127) * 43758.5453;
    return x - Math.floor(x);
  };

  if (stage.isoelectric) {
    // Flat line with tiny noise
    for (let i = 0; i <= numPoints; i++) {
      const y = midY + (noise(i) - 0.5) * 1.5;
      points.push(`${(i * dx).toFixed(1)},${y.toFixed(1)}`);
    }
    return points.join(" ");
  }

  const maxAmp = (height / 2 - 10) * stage.amplitude;

  for (let i = 0; i <= numPoints; i++) {
    const t = i / numPoints;
    const timeMs = t * 4000; // 4-second window

    if (stage.burstSuppress) {
      // Burst-suppression pattern: alternating bursts and silence
      const cyclePos = (timeMs % 1200) / 1200; // 1.2s cycle
      const inBurst = cyclePos < 0.35; // ~35% burst, 65% suppression
      if (inBurst) {
        const burstT = cyclePos / 0.35;
        const envelope = Math.sin(burstT * Math.PI); // fade in/out
        const wave = Math.sin(2 * Math.PI * stage.frequency * timeMs / 1000)
          + 0.5 * Math.sin(2 * Math.PI * (stage.frequency * 2.3) * timeMs / 1000) * (noise(i * 3) - 0.3);
        const y = midY - wave * maxAmp * envelope * 0.8;
        points.push(`${(i * dx).toFixed(1)},${Math.max(midY - height / 2 + 5, Math.min(midY + height / 2 - 5, y)).toFixed(1)}`);
      } else {
        const y = midY + (noise(i) - 0.5) * 2;
        points.push(`${(i * dx).toFixed(1)},${y.toFixed(1)}`);
      }
      continue;
    }

    // Normal EEG: mix of dominant frequency + harmonics + beta + noise
    const primary = Math.sin(2 * Math.PI * stage.frequency * timeMs / 1000);
    const harmonic = 0.3 * Math.sin(2 * Math.PI * (stage.frequency * 1.7) * timeMs / 1000 + 0.5);
    const betaComponent = stage.beta * 0.4 * Math.sin(2 * Math.PI * 20 * timeMs / 1000)
      + stage.beta * 0.2 * Math.sin(2 * Math.PI * 28 * timeMs / 1000 + 1.2);
    const noiseComponent = (noise(i) - 0.5) * 0.4;

    const wave = primary + harmonic + betaComponent + noiseComponent;
    const normWave = wave / (1 + 0.3 + stage.beta * 0.6 + 0.2); // normalise roughly
    const y = midY - normWave * maxAmp;
    points.push(`${(i * dx).toFixed(1)},${Math.max(midY - height / 2 + 5, Math.min(midY + height / 2 - 5, y)).toFixed(1)}`);
  }

  return points.join(" ");
}

const EEGTraceDiagram = () => {
  const [stageIdx, setStageIdx] = useState(0);
  const stage = stages[stageIdx];

  const svgW = 560;
  const svgH = 180;
  const traceY = svgH / 2;
  const traceH = 140;

  const tracePoints = useMemo(
    () => generateTrace(stage, svgW - 60, traceH, traceY),
    [stageIdx]
  );

  // BIS colour
  const bisColor = stageIdx <= 1
    ? "hsl(150, 50%, 45%)"  // green — awake/light
    : stageIdx === 2
      ? "hsl(200, 55%, 50%)" // blue — target
      : stageIdx === 3
        ? "hsl(35, 65%, 50%)"  // amber — deep
        : "hsl(0, 55%, 50%)";  // red — burst/iso

  return (
    <div className="border border-border rounded-lg p-4 mb-6">
      <h3 className="text-lg font-serif font-bold text-foreground mb-1">
        Simulated EEG Trace — Depth of Anaesthesia
      </h3>
      <p className="text-xs text-muted-foreground mb-4">
        Drag the slider from awake → deep to see how the raw EEG waveform changes with increasing anaesthetic depth
      </p>

      {/* Slider */}
      <div className="mb-4">
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground font-medium w-14 shrink-0">Awake</span>
          <input
            type="range"
            min={0}
            max={stages.length - 1}
            step={1}
            value={stageIdx}
            onChange={(e) => setStageIdx(Number(e.target.value))}
            className="flex-1 h-2 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, hsl(150,50%,45%), hsl(200,55%,50%) 40%, hsl(35,65%,50%) 70%, hsl(0,55%,50%))`,
            }}
          />
          <span className="text-xs text-muted-foreground font-medium w-20 text-right shrink-0">Isoelectric</span>
        </div>
        {/* Stage tick labels */}
        <div className="flex justify-between mt-1 px-14">
          {stages.map((s, i) => (
            <button
              key={i}
              onClick={() => setStageIdx(i)}
              className={`text-[9px] leading-tight text-center max-w-[60px] transition-colors ${
                i === stageIdx ? "text-foreground font-semibold" : "text-muted-foreground/50 hover:text-muted-foreground"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 items-start">
        {/* SVG Trace */}
        <div className="flex-shrink-0 mx-auto lg:mx-0">
          <svg
            viewBox={`0 0 ${svgW} ${svgH}`}
            width={svgW}
            height={svgH}
            className="border border-border rounded bg-gradient-to-b from-background to-secondary/10 max-w-full"
          >
            {/* Grid lines */}
            {[0.25, 0.5, 0.75].map(frac => (
              <line key={frac} x1="40" y1={svgH * frac} x2={svgW - 10} y2={svgH * frac}
                stroke="hsl(var(--muted-foreground))" strokeWidth="0.3" opacity="0.15" />
            ))}
            {Array.from({ length: 9 }, (_, i) => (
              <line key={i} x1={40 + (i + 1) * (svgW - 50) / 9} y1="10" x2={40 + (i + 1) * (svgW - 50) / 9} y2={svgH - 10}
                stroke="hsl(var(--muted-foreground))" strokeWidth="0.3" opacity="0.1" />
            ))}

            {/* Centre baseline */}
            <line x1="40" y1={traceY} x2={svgW - 10} y2={traceY}
              stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" opacity="0.2" strokeDasharray="4 4" />

            {/* Y axis labels */}
            <text x="36" y={traceY - traceH / 2 + 10} textAnchor="end" fontSize="6" fill="hsl(var(--muted-foreground))" opacity="0.4">+µV</text>
            <text x="36" y={traceY + 2} textAnchor="end" fontSize="6" fill="hsl(var(--muted-foreground))" opacity="0.4">0</text>
            <text x="36" y={traceY + traceH / 2 - 4} textAnchor="end" fontSize="6" fill="hsl(var(--muted-foreground))" opacity="0.4">−µV</text>

            {/* Time axis */}
            <text x={svgW / 2} y={svgH - 3} textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))" opacity="0.35">
              4 s epoch — 10 mm/s paper speed equivalent
            </text>

            {/* Calibration bar */}
            <line x1="15" y1={traceY - 20} x2="15" y2={traceY + 20} stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.3" />
            <line x1="12" y1={traceY - 20} x2="18" y2={traceY - 20} stroke="hsl(var(--foreground))" strokeWidth="0.5" opacity="0.3" />
            <line x1="12" y1={traceY + 20} x2="18" y2={traceY + 20} stroke="hsl(var(--foreground))" strokeWidth="0.5" opacity="0.3" />
            <text x="15" y={traceY - 24} textAnchor="middle" fontSize="5" fill="hsl(var(--muted-foreground))" opacity="0.4">50µV</text>

            {/* EEG trace */}
            <g transform="translate(40,0)">
              <polyline
                key={stageIdx}
                points={tracePoints}
                fill="none"
                stroke={bisColor}
                strokeWidth="1.2"
                opacity="0.85"
                strokeLinejoin="round"
                className="transition-all duration-500"
              />
            </g>

            {/* Stage label overlay */}
            <rect x={svgW - 155} y="8" width="148" height="34" rx="5"
              fill="hsl(var(--background))" fillOpacity="0.8"
              stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" opacity="0.6" />
            <text x={svgW - 150} y="22" fontSize="7" fill="hsl(var(--foreground))" fontWeight="700" opacity="0.8">
              {stage.label}
            </text>
            <text x={svgW - 150} y="34" fontSize="6" fill={bisColor} fontWeight="600" opacity="0.9">
              BIS {stage.bisRange}
            </text>

            {/* Dominant frequency badge */}
            <rect x="42" y="8" width="82" height="18" rx="4"
              fill="hsl(var(--background))" fillOpacity="0.7"
              stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" opacity="0.5" />
            <text x="48" y="20" fontSize="6" fill="hsl(var(--muted-foreground))" opacity="0.6">
              {stage.isoelectric ? "Flat-line (<0.5 µV)" : stage.burstSuppress ? `Burst: ${stage.frequency} Hz / Flat` : `Dominant: ~${stage.frequency} Hz`}
            </text>
          </svg>
        </div>

        {/* Description panel */}
        <div className="flex-1 min-w-0 space-y-3 animate-fade-in" key={stageIdx}>
          <div className="p-3 rounded-lg border border-border">
            <p className="font-semibold text-foreground text-sm flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: bisColor }} />
              {stage.label}
              <span className="text-xs font-normal text-muted-foreground ml-auto">BIS {stage.bisRange}</span>
            </p>
            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
              {stage.eegDescription}
            </p>
          </div>

          <div className="p-3 rounded-lg border border-border bg-secondary/20">
            <p className="font-semibold text-foreground text-xs mb-1">EEG Band Progression with Depth</p>
            <div className="grid grid-cols-4 gap-1.5 text-[10px]">
              {[
                { band: "β (13–30 Hz)", active: stageIdx <= 1 },
                { band: "α (8–13 Hz)", active: stageIdx === 1 },
                { band: "θ (4–7 Hz)", active: stageIdx === 2 },
                { band: "δ (0.5–4 Hz)", active: stageIdx >= 3 && !stage.isoelectric },
              ].map(({ band, active }) => (
                <div key={band} className={`text-center py-1 rounded border transition-all ${
                  active
                    ? "border-primary bg-primary/10 text-foreground font-semibold"
                    : "border-border text-muted-foreground/40"
                }`}>
                  {band}
                </div>
              ))}
            </div>
          </div>

          {stage.burstSuppress && (
            <div className="p-3 rounded-lg border border-destructive/30 bg-destructive/5">
              <p className="font-semibold text-foreground text-xs">⚠ Burst Suppression</p>
              <p className="text-xs text-muted-foreground mt-1">
                Suppression ratio (SR) &gt;0%. Bursts of high-amplitude activity alternate with isoelectric periods. Associated with <strong>excessive anaesthetic depth</strong>, postoperative delirium, and increased mortality in elderly patients. Action: reduce anaesthetic delivery.
              </p>
            </div>
          )}

          {stage.isoelectric && (
            <div className="p-3 rounded-lg border border-destructive/40 bg-destructive/5">
              <p className="font-semibold text-foreground text-xs">⚠ Isoelectric EEG</p>
              <p className="text-xs text-muted-foreground mt-1">
                Complete cortical silence (&lt;0.5 µV). SR 100%. Seen with: profound anaesthetic overdose, hypothermic circulatory arrest (intentional), or brain death. In anaesthesia: <strong>immediately reduce or cease anaesthetic agent</strong>. Differentiate from artefact (check electrode impedance).
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EEGTraceDiagram;

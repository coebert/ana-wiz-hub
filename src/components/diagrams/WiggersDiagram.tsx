import { useState, useEffect, useMemo } from "react";

const TOTAL_FRAMES = 300;

interface Phase {
  name: string;
  start: number;
  end: number;
  color: string;
  valves: string;
  description: string;
}

const PHASES: Phase[] = [
  { name: "Atrial Systole", start: 0, end: 40, color: "hsl(210 70% 50%)",
    valves: "AV valves open, semilunar valves closed",
    description: "Atrial contraction (P wave on ECG) adds 15–25% to ventricular filling ('atrial kick'). LV pressure rises slightly. a-wave on LA pressure trace. EDV reached at end of this phase (~120 ml)." },
  { name: "Isovolumetric Contraction", start: 40, end: 70, color: "hsl(340 60% 50%)",
    valves: "All valves closed",
    description: "Ventricular contraction begins (QRS complex). LV pressure rises rapidly with no change in volume. Ends when LV pressure exceeds aortic diastolic pressure (~80 mmHg). S1 heard (AV valve closure). c-wave on LA trace." },
  { name: "Rapid Ejection", start: 70, end: 130, color: "hsl(0 70% 50%)",
    valves: "Semilunar valves open, AV valves closed",
    description: "Aortic valve opens. ~70% of stroke volume ejected rapidly. LV and aortic pressures rise together to peak systolic (~120 mmHg). Ventricular volume falls steeply. T wave begins." },
  { name: "Reduced Ejection", start: 130, end: 180, color: "hsl(20 70% 50%)",
    valves: "Semilunar valves open, AV valves closed",
    description: "Ejection slows as ventricular repolarisation occurs (T wave). Aortic pressure begins to fall. v-wave on LA trace as atrium fills behind closed mitral valve. ESV reached at end (~50 ml)." },
  { name: "Isovolumetric Relaxation", start: 180, end: 210, color: "hsl(170 50% 40%)",
    valves: "All valves closed",
    description: "Aortic valve closes (S2, dicrotic notch). LV pressure drops rapidly with no volume change. Ends when LV pressure falls below LA pressure and mitral valve opens." },
  { name: "Rapid Filling", start: 210, end: 260, color: "hsl(260 50% 55%)",
    valves: "AV valves open, semilunar valves closed",
    description: "Mitral valve opens. Blood rushes from LA to LV down pressure gradient. ~70% of ventricular filling occurs passively in this phase. y-descent on LA trace. S3 may be heard (normal in young)." },
  { name: "Reduced Filling (Diastasis)", start: 260, end: 300, color: "hsl(215 25% 60%)",
    valves: "AV valves open, semilunar valves closed",
    description: "Slow passive filling as LA-LV pressure gradient equilibrates. Shortened at higher heart rates — diastole is disproportionately reduced. S4 if atrial contraction into stiff ventricle." },
];

// Pressure generators (mmHg)
const aorticPressure = (f: number): number => {
  const t = f / TOTAL_FRAMES;
  if (t < 0.13) return 80 + t * 100;
  if (t < 0.23) return 80 + 13 + Math.sin((t - 0.13) / 0.1 * Math.PI) * 40;
  if (t < 0.43) return 120 - (t - 0.23) * 80;
  if (t < 0.47) return 104 - (t - 0.43) * 200 + 8;
  if (t < 0.5) return 95 + Math.sin((t - 0.47) / 0.03 * Math.PI) * 5;
  return 80 + (1 - t) * 20;
};

const lvPressure = (f: number): number => {
  const t = f / TOTAL_FRAMES;
  if (t < 0.05) return 8 + t * 40;
  if (t < 0.13) return 10 + ((t - 0.05) / 0.08) * 70;
  if (t < 0.23) return 80 + Math.sin((t - 0.13) / 0.1 * Math.PI) * 45;
  if (t < 0.43) return 125 - ((t - 0.23) / 0.2) * 115;
  if (t < 0.6) return 10 * Math.max(0, 1 - (t - 0.43) / 0.17);
  return 2 + (t - 0.6) * 15;
};

const laPressure = (f: number): number => {
  const t = f / TOTAL_FRAMES;
  const aWave = t < 0.1 ? Math.sin(t / 0.1 * Math.PI) * 6 : 0;
  const cWave = t > 0.12 && t < 0.2 ? Math.sin((t - 0.12) / 0.08 * Math.PI) * 3 : 0;
  const vWave = t > 0.3 && t < 0.6 ? Math.sin((t - 0.3) / 0.3 * Math.PI) * 8 : 0;
  return 6 + aWave + cWave + vWave;
};

// Ventricular volume (ml)
const lvVolume = (f: number): number => {
  const t = f / TOTAL_FRAMES;
  if (t < 0.13) return 105 + Math.sin(t / 0.13 * Math.PI * 0.5) * 15; // atrial kick → EDV ~120
  if (t < 0.23) return 120; // isovolumetric contraction
  if (t < 0.43) return 120 - ((t - 0.23) / 0.2) * 65; // ejection → ~55 (rapid then reduced)
  if (t < 0.6) return 50; // isovolumetric relaxation ~ESV
  if (t < 0.87) return 50 + ((t - 0.6) / 0.27) * 55; // filling
  return 105;
};

const ecgWaveform = (f: number): number => {
  const t = f / TOTAL_FRAMES;
  if (t < 0.08) return 0.5 + Math.sin(t / 0.08 * Math.PI) * 0.08;
  if (t < 0.12) return 0.5;
  if (t < 0.13) return 0.5 - (t - 0.12) / 0.01 * 0.1;
  if (t < 0.15) return 0.4 + ((t - 0.13) / 0.02) * 0.5;
  if (t < 0.17) return 0.9 - ((t - 0.15) / 0.02) * 0.55;
  if (t < 0.19) return 0.35 + ((t - 0.17) / 0.02) * 0.15;
  if (t < 0.28) return 0.5;
  if (t < 0.4) return 0.5 + Math.sin((t - 0.28) / 0.12 * Math.PI) * 0.1;
  return 0.5;
};

const heartSounds = (f: number): { s1: boolean; s2: boolean } => {
  const t = f / TOTAL_FRAMES;
  return { s1: t > 0.12 && t < 0.16, s2: t > 0.43 && t < 0.47 };
};

export const WiggersDiagram = () => {
  const [frame, setFrame] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [selectedPhase, setSelectedPhase] = useState<number | null>(null);
  const [showVolume, setShowVolume] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      setFrame(f => (f + 1) % TOTAL_FRAMES);
    }, 33 / speed);
    return () => clearInterval(interval);
  }, [playing, speed]);

  // When a phase is selected and not playing, jump cursor to mid-phase
  useEffect(() => {
    if (selectedPhase !== null && !playing) {
      const phase = PHASES[selectedPhase];
      setFrame(Math.floor((phase.start + phase.end) / 2));
    }
  }, [selectedPhase, playing]);

  const currentPhase = PHASES.find(p => frame >= p.start && frame < p.end) || PHASES[6];
  const activePhaseIdx = selectedPhase ?? PHASES.indexOf(currentPhase);

  const w = 560, h = 600;
  const padL = 55, padR = 20;
  const plotW = w - padL - padR;

  const ecgTop = 20, ecgH = 50;
  const pressTop = 85, pressH = 220;
  const volTop = 320, volH = 80;
  const hsTop = 415, hsH = 24;
  const phaseTop = 455, phaseH = 20;

  const timeToX = (f: number) => padL + (f / TOTAL_FRAMES) * plotW;

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

  const paths = useMemo(() => ({
    ecg: generatePath(ecgWaveform, ecgTop, ecgH, 0.2, 1.0),
    aortic: generatePath(aorticPressure, pressTop, pressH, -5, 135),
    lv: generatePath(lvPressure, pressTop, pressH, -5, 135),
    la: generatePath(laPressure, pressTop, pressH, -5, 135),
    vol: generatePath(lvVolume, volTop, volH, 30, 130),
  }), []);

  const cursorX = timeToX(frame);
  const hs = heartSounds(frame);

  // LA wave labels
  const aWaveX = timeToX(12);
  const cWaveX = timeToX(48);
  const vWaveX = timeToX(135);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-3">
      {/* Phase selector buttons */}
      <div className="flex flex-wrap gap-1.5">
        {PHASES.map((p, i) => (
          <button
            key={p.name}
            onClick={() => { setSelectedPhase(selectedPhase === i ? null : i); setPlaying(false); }}
            className={`px-2 py-1 rounded text-[10px] sm:text-xs font-medium border transition-all ${
              activePhaseIdx === i
                ? "border-primary/60 bg-primary/10 text-foreground"
                : "border-border bg-secondary/30 text-muted-foreground hover:bg-secondary/60"
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      <svg viewBox={`0 0 ${w} ${h - 100}`} className="w-full">
        {/* Phase highlight band */}
        {PHASES.map((p, i) => (
          <rect key={p.name} x={timeToX(p.start)} y={ecgTop - 5} width={timeToX(p.end) - timeToX(p.start)}
            height={hsTop + hsH - ecgTop + 10} fill={p.color}
            opacity={activePhaseIdx === i ? 0.06 : 0} rx="2" className="transition-opacity duration-200" />
        ))}

        {/* Background panels */}
        <rect x={padL} y={ecgTop} width={plotW} height={ecgH} fill="hsl(var(--secondary)/0.15)" rx="4" />
        <rect x={padL} y={pressTop} width={plotW} height={pressH} fill="hsl(var(--secondary)/0.15)" rx="4" />
        {showVolume && <rect x={padL} y={volTop} width={plotW} height={volH} fill="hsl(var(--secondary)/0.15)" rx="4" />}
        <rect x={padL} y={hsTop} width={plotW} height={hsH} fill="hsl(var(--secondary)/0.15)" rx="4" />

        {/* Axis labels */}
        <text x={padL - 8} y={ecgTop + ecgH / 2 + 3} textAnchor="end" fontSize="9" fill="hsl(var(--muted-foreground))" fontWeight="600">ECG</text>

        {/* Pressure gridlines + labels */}
        {[0, 40, 80, 120].map(v => {
          const y = pressTop + pressH - ((v + 5) / 140) * pressH;
          return (
            <g key={v}>
              <line x1={padL} y1={y} x2={padL + plotW} y2={y} stroke="hsl(var(--border))" strokeWidth="0.5" />
              <text x={padL - 8} y={y + 3} textAnchor="end" fontSize="8" fill="hsl(var(--muted-foreground))">{v}</text>
            </g>
          );
        })}
        <text x={10} y={pressTop + pressH / 2} textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))" fontWeight="600"
          transform={`rotate(-90, 10, ${pressTop + pressH / 2})`}>mmHg</text>

        {/* Volume axis */}
        {showVolume && (
          <>
            <text x={padL - 8} y={volTop + 10} textAnchor="end" fontSize="7" fill="hsl(var(--muted-foreground))">120</text>
            <text x={padL - 8} y={volTop + volH - 2} textAnchor="end" fontSize="7" fill="hsl(var(--muted-foreground))">50</text>
            <text x={10} y={volTop + volH / 2} textAnchor="middle" fontSize="8" fill="hsl(var(--muted-foreground))" fontWeight="600"
              transform={`rotate(-90, 10, ${volTop + volH / 2})`}>ml</text>
            {/* EDV / ESV labels */}
            <text x={timeToX(38)} y={volTop - 3} fontSize="7" fill="hsl(var(--muted-foreground))" textAnchor="middle">EDV</text>
            <text x={timeToX(170)} y={volTop + volH + 10} fontSize="7" fill="hsl(var(--muted-foreground))" textAnchor="middle">ESV</text>
          </>
        )}

        <text x={padL - 8} y={hsTop + hsH / 2 + 3} textAnchor="end" fontSize="8" fill="hsl(var(--muted-foreground))" fontWeight="600">HS</text>

        {/* ECG trace */}
        <path d={paths.ecg} fill="none" stroke="hsl(170 50% 35%)" strokeWidth="1.5" />
        {/* ECG labels */}
        <text x={timeToX(12)} y={ecgTop + 8} fontSize="7" fill="hsl(170 50% 45%)" textAnchor="middle" fontWeight="600">P</text>
        <text x={timeToX(43)} y={ecgTop + 8} fontSize="7" fill="hsl(170 50% 45%)" textAnchor="middle" fontWeight="600">QRS</text>
        <text x={timeToX(100)} y={ecgTop + 8} fontSize="7" fill="hsl(170 50% 45%)" textAnchor="middle" fontWeight="600">T</text>

        {/* Pressure traces */}
        <path d={paths.aortic} fill="none" stroke="hsl(0 65% 50%)" strokeWidth="2" />
        <path d={paths.lv} fill="none" stroke="hsl(210 70% 50%)" strokeWidth="2" />
        <path d={paths.la} fill="none" stroke="hsl(340 55% 55%)" strokeWidth="1.5" strokeDasharray="4 2" />

        {/* LA wave labels */}
        <text x={aWaveX} y={pressTop + pressH - 12} fontSize="7" fill="hsl(340 55% 55%)" textAnchor="middle" fontWeight="600">a</text>
        <text x={cWaveX} y={pressTop + pressH - 18} fontSize="7" fill="hsl(340 55% 55%)" textAnchor="middle" fontWeight="600">c</text>
        <text x={vWaveX} y={pressTop + pressH - 40} fontSize="7" fill="hsl(340 55% 55%)" textAnchor="middle" fontWeight="600">v</text>

        {/* Dicrotic notch label */}
        <text x={timeToX(135)} y={pressTop + 85} fontSize="6" fill="hsl(0 65% 50%)" textAnchor="start" fontStyle="italic">DN</text>

        {/* Volume trace */}
        {showVolume && <path d={paths.vol} fill="none" stroke="hsl(45 70% 45%)" strokeWidth="2" />}

        {/* Heart sound markers */}
        <text x={timeToX(42)} y={hsTop + hsH / 2 + 3} textAnchor="middle" fontSize="9" fill="hsl(210 70% 50%)" fontWeight="700">S1</text>
        <text x={timeToX(135)} y={hsTop + hsH / 2 + 3} textAnchor="middle" fontSize="9" fill="hsl(0 65% 50%)" fontWeight="700">S2</text>

        {/* Animated HS bar */}
        {hs.s1 && <rect x={cursorX - 3} y={hsTop + 3} width={6} height={hsH - 6} fill="hsl(210 70% 50%)" rx="2" opacity="0.7" />}
        {hs.s2 && <rect x={cursorX - 3} y={hsTop + 3} width={6} height={hsH - 6} fill="hsl(0 65% 50%)" rx="2" opacity="0.7" />}

        {/* Valve event annotations */}
        {[
          { f: 40, label: "MV closes", y: pressTop + pressH + 8 },
          { f: 70, label: "AV opens", y: pressTop + pressH + 8 },
          { f: 180, label: "AV closes", y: pressTop + pressH + 8 },
          { f: 210, label: "MV opens", y: pressTop + pressH + 8 },
        ].map((evt, i) => (
          <g key={i}>
            <line x1={timeToX(evt.f)} y1={pressTop} x2={timeToX(evt.f)} y2={pressTop + pressH}
              stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" strokeDasharray="2 3" opacity="0.4" />
            <text x={timeToX(evt.f)} y={evt.y} fontSize="6" fill="hsl(var(--muted-foreground))" textAnchor="middle"
              transform={`rotate(-45, ${timeToX(evt.f)}, ${evt.y})`}>{evt.label}</text>
          </g>
        ))}

        {/* Phase bar */}
        {PHASES.map((p, i) => (
          <rect key={p.name} x={timeToX(p.start)} y={phaseTop} width={timeToX(p.end) - timeToX(p.start)}
            height={phaseH} fill={p.color} opacity={activePhaseIdx === i ? 0.8 : 0.15} rx="2"
            className="cursor-pointer transition-opacity" onClick={() => { setSelectedPhase(i); setPlaying(false); }} />
        ))}

        {/* Cursor */}
        <line x1={cursorX} y1={ecgTop} x2={cursorX} y2={phaseTop + phaseH}
          stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.3" strokeDasharray="3 2" />

        {/* Click-to-scrub overlay */}
        <rect x={padL} y={ecgTop} width={plotW} height={phaseTop + phaseH - ecgTop}
          fill="transparent" className="cursor-crosshair"
          onClick={(e) => {
            const svg = e.currentTarget.ownerSVGElement!;
            const pt = svg.createSVGPoint();
            pt.x = e.clientX;
            const svgPt = pt.matrixTransform(svg.getScreenCTM()!.inverse());
            const f = Math.round(((svgPt.x - padL) / plotW) * TOTAL_FRAMES);
            setFrame(Math.max(0, Math.min(TOTAL_FRAMES - 1, f)));
            setPlaying(false);
            setSelectedPhase(null);
          }} />

        {/* Legend */}
        {[
          { x: padL + 5, color: "hsl(0 65% 50%)", label: "Aortic", dash: "" },
          { x: padL + 75, color: "hsl(210 70% 50%)", label: "LV", dash: "" },
          { x: padL + 120, color: "hsl(340 55% 55%)", label: "LA", dash: "4 2" },
          { x: padL + 160, color: "hsl(170 50% 35%)", label: "ECG", dash: "" },
          ...(showVolume ? [{ x: padL + 215, color: "hsl(45 70% 45%)", label: "LV Vol", dash: "" }] : []),
        ].map((item, i) => (
          <g key={i}>
            <line x1={item.x} y1={phaseTop + phaseH + 15} x2={item.x + 18} y2={phaseTop + phaseH + 15}
              stroke={item.color} strokeWidth="2" strokeDasharray={item.dash} />
            <text x={item.x + 22} y={phaseTop + phaseH + 18} fontSize="8" fill="hsl(var(--foreground))">{item.label}</text>
          </g>
        ))}
      </svg>

      {/* Phase info panel */}
      <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 animate-fade-in">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: PHASES[activePhaseIdx].color }} />
          <p className="text-sm font-semibold text-foreground">{PHASES[activePhaseIdx].name}</p>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{PHASES[activePhaseIdx].description}</p>
        <p className="text-xs text-muted-foreground mt-2">
          <span className="font-medium text-foreground/80">Valves:</span> {PHASES[activePhaseIdx].valves}
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button onClick={() => { setPlaying(!playing); setSelectedPhase(null); }}
          className="px-4 py-1.5 rounded-lg text-sm font-medium border border-border text-foreground hover:bg-muted transition-colors">
          {playing ? "⏸ Pause" : "▶ Play"}
        </button>
        {[0.5, 1, 2].map(s => (
          <button key={s} onClick={() => setSpeed(s)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
              speed === s ? "bg-primary/10 border-primary text-primary" : "border-border text-muted-foreground hover:border-primary/50"
            }`}>
            {s}×
          </button>
        ))}
        <button onClick={() => setShowVolume(!showVolume)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
            showVolume ? "bg-amber-500/10 border-amber-500/40 text-amber-600" : "border-border text-muted-foreground"
          }`}>
          {showVolume ? "Vol ✓" : "Vol"}
        </button>
      </div>

      <p className="text-xs text-muted-foreground text-center">Click anywhere on the diagram to scrub through the cardiac cycle</p>
    </div>
  );
};

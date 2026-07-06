import { useState, useMemo } from "react";
import { DiagramFigure } from "../_shared/DiagramFigure";

type DepthStage = {
  label: string;
  bisRange: string;
  eegDescription: string;
  frequency: number;
  amplitude: number;
  burstSuppress: boolean;
  isoelectric: boolean;
  beta: number;
};

const stages: DepthStage[] = [
  { label: "Awake (eyes open)", bisRange: "95–100", eegDescription: "Low-amplitude, high-frequency beta activity (13–30 Hz). Desynchronised cortex. EMG artefact often present.", frequency: 22, amplitude: 0.25, burstSuppress: false, isoelectric: false, beta: 0.8 },
  { label: "Sedation / Light", bisRange: "70–85", eegDescription: "Increasing alpha (8–13 Hz) with anterior predominance ('alpha anteriorisation'). Amplitude increases. Beta diminishes.", frequency: 11, amplitude: 0.45, burstSuppress: false, isoelectric: false, beta: 0.3 },
  { label: "Surgical Anaesthesia", bisRange: "40–60", eegDescription: "Slow delta/theta activity (1–7 Hz). High-amplitude synchronised waves. Spindles may be seen. Target range for GA.", frequency: 4, amplitude: 0.85, burstSuppress: false, isoelectric: false, beta: 0.05 },
  { label: "Deep Anaesthesia", bisRange: "20–40", eegDescription: "Very slow, high-amplitude delta (<4 Hz). Approaching burst suppression. Suppression ratio begins to rise.", frequency: 2, amplitude: 1.0, burstSuppress: false, isoelectric: false, beta: 0.0 },
  { label: "Burst Suppression", bisRange: "5–20", eegDescription: "Alternating bursts of high-amplitude activity and periods of isoelectric silence (suppression). SR >0%. Excessive depth — reduce agent.", frequency: 2, amplitude: 1.0, burstSuppress: true, isoelectric: false, beta: 0.0 },
  { label: "Isoelectric", bisRange: "0–5", eegDescription: "Flat-line EEG. Complete cortical electrical silence. <0.5 µV. SR 100%. Seen with very deep anaesthesia, hypothermic circulatory arrest, or brain death.", frequency: 0, amplitude: 0, burstSuppress: false, isoelectric: true, beta: 0.0 },
];

function generateTrace(stage: DepthStage, width: number, height: number, midY: number): string {
  const points: string[] = [];
  const numPoints = 600;
  const dx = width / numPoints;
  const seed = stage.frequency * 1000 + stage.amplitude * 500;
  const noise = (i: number) => { const x = Math.sin(seed + i * 0.7127) * 43758.5453; return x - Math.floor(x); };

  if (stage.isoelectric) {
    for (let i = 0; i <= numPoints; i++) {
      const y = midY + (noise(i) - 0.5) * 1.5;
      points.push(`${(i * dx).toFixed(1)},${y.toFixed(1)}`);
    }
    return points.join(" ");
  }

  const maxAmp = (height / 2 - 10) * stage.amplitude;
  for (let i = 0; i <= numPoints; i++) {
    const t = i / numPoints;
    const timeMs = t * 4000;
    if (stage.burstSuppress) {
      const cyclePos = (timeMs % 1200) / 1200;
      const inBurst = cyclePos < 0.35;
      if (inBurst) {
        const burstT = cyclePos / 0.35;
        const envelope = Math.sin(burstT * Math.PI);
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
    const primary = Math.sin(2 * Math.PI * stage.frequency * timeMs / 1000);
    const harmonic = 0.3 * Math.sin(2 * Math.PI * (stage.frequency * 1.7) * timeMs / 1000 + 0.5);
    const betaComponent = stage.beta * 0.4 * Math.sin(2 * Math.PI * 20 * timeMs / 1000)
      + stage.beta * 0.2 * Math.sin(2 * Math.PI * 28 * timeMs / 1000 + 1.2);
    const noiseComponent = (noise(i) - 0.5) * 0.4;
    const wave = primary + harmonic + betaComponent + noiseComponent;
    const normWave = wave / (1 + 0.3 + stage.beta * 0.6 + 0.2);
    const y = midY - normWave * maxAmp;
    points.push(`${(i * dx).toFixed(1)},${Math.max(midY - height / 2 + 5, Math.min(midY + height / 2 - 5, y)).toFixed(1)}`);
  }
  return points.join(" ");
}

/** Generate a simulated power spectrum for each stage */
function generateSpectrum(stage: DepthStage): { freq: number; power: number }[] {
  const maxFreq = 35;
  const bins: { freq: number; power: number }[] = [];

  for (let f = 0.5; f <= maxFreq; f += 0.5) {
    let power = 0;

    if (stage.isoelectric) {
      power = 0.02; // flat noise floor
    } else if (stage.burstSuppress) {
      // Reduced overall power with some delta
      const deltaPeak = Math.exp(-((f - 2) ** 2) / 2) * 0.4;
      power = deltaPeak + 0.03;
    } else {
      // Dominant frequency peak
      const domPeak = Math.exp(-((f - stage.frequency) ** 2) / (stage.frequency < 6 ? 3 : 6)) * stage.amplitude;
      // Harmonic
      const harmPeak = Math.exp(-((f - stage.frequency * 1.7) ** 2) / 5) * stage.amplitude * 0.2;
      // Beta component
      const betaPeak1 = Math.exp(-((f - 20) ** 2) / 15) * stage.beta * 0.5;
      const betaPeak2 = Math.exp(-((f - 28) ** 2) / 10) * stage.beta * 0.25;
      // Alpha component (for sedation)
      const alphaPeak = stage.frequency >= 8 && stage.frequency <= 13
        ? Math.exp(-((f - 10) ** 2) / 4) * 0.3
        : 0;
      // 1/f noise floor
      const noiseFloor = 0.05 / (1 + f * 0.1);

      power = domPeak + harmPeak + betaPeak1 + betaPeak2 + alphaPeak + noiseFloor;
    }
    bins.push({ freq: f, power: Math.min(1, power) });
  }
  return bins;
}

/** Band color for a given frequency */
function bandColor(f: number): string {
  if (f <= 4) return "hsl(280, 55%, 55%)";   // delta — purple
  if (f <= 8) return "hsl(200, 60%, 50%)";   // theta — blue
  if (f <= 13) return "hsl(140, 55%, 45%)";  // alpha — green
  if (f <= 30) return "hsl(45, 70%, 50%)";   // beta — yellow
  return "hsl(15, 65%, 50%)";                // gamma — orange
}

/** Band label for SEF95 annotation */
function bandName(f: number): string {
  if (f <= 4) return "δ";
  if (f <= 8) return "θ";
  if (f <= 13) return "α";
  if (f <= 30) return "β";
  return "γ";
}

const EEGTraceDiagram = () => {
  const [stageIdx, setStageIdx] = useState(0);
  const stage = stages[stageIdx];

  // EEG trace dimensions
  const svgW = 560;
  const eegH = 150;
  const fftH = 120;
  const gapH = 16;
  const svgH = eegH + gapH + fftH + 10;
  const traceY = eegH / 2;
  const traceH = 120;

  // FFT plot area
  const fftPlotX = 50;
  const fftPlotY = eegH + gapH;
  const fftPlotW = svgW - 70;
  const fftPlotH = fftH - 15;

  const tracePoints = useMemo(() => generateTrace(stage, svgW - 60, traceH, traceY), [stageIdx]);
  const spectrum = useMemo(() => generateSpectrum(stage), [stageIdx]);

  // Compute SEF95 from spectrum
  const sef95 = useMemo(() => {
    const totalPower = spectrum.reduce((sum, b) => sum + b.power, 0);
    let cumulative = 0;
    for (const bin of spectrum) {
      cumulative += bin.power;
      if (cumulative >= totalPower * 0.95) return bin.freq;
    }
    return 30;
  }, [spectrum]);

  // Peak frequency
  const peakFreq = useMemo(() => {
    let maxP = 0, peakF = 0;
    for (const bin of spectrum) {
      if (bin.power > maxP) { maxP = bin.power; peakF = bin.freq; }
    }
    return peakF;
  }, [spectrum]);

  const maxPower = useMemo(() => Math.max(...spectrum.map(b => b.power), 0.1), [spectrum]);

  // Build FFT filled area path
  const fftPath = useMemo(() => {
    const maxFreq = 35;
    const xScale = (f: number) => fftPlotX + (f / maxFreq) * fftPlotW;
    const yScale = (p: number) => fftPlotY + fftPlotH - (p / maxPower) * fftPlotH;

    let path = `M${xScale(0.5)},${fftPlotY + fftPlotH}`;
    for (const bin of spectrum) {
      path += ` L${xScale(bin.freq).toFixed(1)},${yScale(bin.power).toFixed(1)}`;
    }
    path += ` L${xScale(35)},${fftPlotY + fftPlotH} Z`;
    return path;
  }, [spectrum, maxPower]);

  // Build individual band-coloured bar rects for the spectrum
  const fftBars = useMemo(() => {
    const maxFreq = 35;
    const barW = fftPlotW / (maxFreq * 2); // each bin is 0.5 Hz
    return spectrum.map((bin, i) => {
      const x = fftPlotX + (bin.freq / maxFreq) * fftPlotW - barW / 2;
      const barH = (bin.power / maxPower) * fftPlotH;
      const y = fftPlotY + fftPlotH - barH;
      return (
        <rect key={i} x={x} y={y} width={barW * 0.9} height={barH}
          fill={bandColor(bin.freq)} opacity="0.5" />
      );
    });
  }, [spectrum, maxPower]);

  const bisColor = stageIdx <= 1
    ? "hsl(150, 50%, 45%)"
    : stageIdx === 2
      ? "hsl(200, 55%, 50%)"
      : stageIdx === 3
        ? "hsl(35, 65%, 50%)"
        : "hsl(0, 55%, 50%)";

  const maxFreq = 35;
  const xScaleFFT = (f: number) => fftPlotX + (f / maxFreq) * fftPlotW;

  return (
    <DiagramFigure
      id="eeg-trace-diagram"
      title="EEG trace"
      description="Auto-generated wrapper for the EEG trace anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
                  <div className="border border-border rounded-lg p-4 mb-6">
        <h3 className="text-lg font-serif font-bold text-foreground mb-1">
          Simulated EEG Trace &amp; Power Spectrum
        </h3>
        <p className="text-xs text-muted-foreground mb-4">
          Drag the slider to see how the raw EEG waveform and its frequency-domain power spectrum (FFT) change with anaesthetic depth
        </p>
  
        {/* Slider */}
        <div className="mb-4">
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground font-medium w-14 shrink-0">Awake</span>
            <input type="range" min={0} max={stages.length - 1} step={1} value={stageIdx}
              onChange={(e) => setStageIdx(Number(e.target.value))}
              className="flex-1 h-2 rounded-full appearance-none cursor-pointer"
              style={{ background: `linear-gradient(to right, hsl(150,50%,45%), hsl(200,55%,50%) 40%, hsl(35,65%,50%) 70%, hsl(0,55%,50%))` }} />
            <span className="text-xs text-muted-foreground font-medium w-20 text-right shrink-0">Isoelectric</span>
          </div>
          <div className="flex justify-between mt-1 px-14">
            {stages.map((s, i) => (
              <button key={i} onClick={() => setStageIdx(i)}
                className={`text-[9px] leading-tight text-center max-w-[60px] transition-colors ${i === stageIdx ? "text-foreground font-semibold" : "text-muted-foreground/50 hover:text-muted-foreground"}`}>
                {s.label}
              </button>
            ))}
          </div>
        </div>
  
        <div className="flex flex-col lg:flex-row gap-4 items-start">
          <div className="flex-shrink-0 mx-auto lg:mx-0">
            <svg viewBox={`0 0 ${svgW} ${svgH}`} width={svgW} height={svgH}
              className="border border-border rounded bg-gradient-to-b from-background to-secondary/10 max-w-full">
  
              {/* ═══ EEG TRACE (top) ═══ */}
              {[0.25, 0.5, 0.75].map(frac => (
                <line key={frac} x1="40" y1={eegH * frac} x2={svgW - 10} y2={eegH * frac}
                  stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" opacity="0.15" />
              ))}
              <line x1="40" y1={traceY} x2={svgW - 10} y2={traceY}
                stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" opacity="0.2" strokeDasharray="4 4" />
              <text x="36" y={traceY - traceH / 2 + 10} textAnchor="end" fontSize="6" fill="hsl(var(--muted-foreground))" opacity="0.4">+µV</text>
              <text x="36" y={traceY + 2} textAnchor="end" fontSize="6" fill="hsl(var(--muted-foreground))" opacity="0.4">0</text>
              <text x="36" y={traceY + traceH / 2 - 4} textAnchor="end" fontSize="6" fill="hsl(var(--muted-foreground))" opacity="0.4">−µV</text>
  
              {/* Calibration bar */}
              <line x1="15" y1={traceY - 20} x2="15" y2={traceY + 20} stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.3" />
              <line x1="12" y1={traceY - 20} x2="18" y2={traceY - 20} stroke="hsl(var(--foreground))" strokeWidth="0.5" opacity="0.3" />
              <line x1="12" y1={traceY + 20} x2="18" y2={traceY + 20} stroke="hsl(var(--foreground))" strokeWidth="0.5" opacity="0.3" />
              <text x="15" y={traceY - 24} textAnchor="middle" fontSize="5" fill="hsl(var(--muted-foreground))" opacity="0.4">50µV</text>
  
              {/* EEG trace */}
              <g transform="translate(40,0)">
                <polyline key={stageIdx} points={tracePoints} fill="none" stroke={bisColor}
                  strokeWidth="1" opacity="0.85" strokeLinejoin="round" />
              </g>
  
              {/* Stage label */}
              <rect x={svgW - 155} y="6" width="148" height="30" rx="5"
                fill="hsl(var(--background))" fillOpacity="0.8"
                stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" opacity="0.6" />
              <text x={svgW - 150} y="18" fontSize="7" fill="hsl(var(--foreground))" fontWeight="700" opacity="0.8">{stage.label}</text>
              <text x={svgW - 150} y="30" fontSize="6" fill={bisColor} fontWeight="600" opacity="0.9">BIS {stage.bisRange}</text>
  
              {/* Section label */}
              <text x="42" y="14" fontSize="7" fill="hsl(var(--foreground))" fontWeight="600" opacity="0.5">Raw EEG</text>
  
              {/* ═══ FFT POWER SPECTRUM (bottom) ═══ */}
              {/* Separator */}
              <line x1="10" y1={eegH + gapH / 2} x2={svgW - 10} y2={eegH + gapH / 2}
                stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" opacity="0.15" />
  
              {/* Section label */}
              <text x="42" y={fftPlotY - 2} fontSize="7" fill="hsl(var(--foreground))" fontWeight="600" opacity="0.5">Power Spectrum (FFT)</text>
  
              {/* Plot background */}
              <rect x={fftPlotX} y={fftPlotY} width={fftPlotW} height={fftPlotH}
                fill="hsl(var(--muted-foreground))" fillOpacity="0.02"
                stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" opacity="0.2" />
  
              {/* Band background shading */}
              {[
                { x1: 0.5, x2: 4, color: "hsl(280, 55%, 55%)", label: "δ" },
                { x1: 4, x2: 8, color: "hsl(200, 60%, 50%)", label: "θ" },
                { x1: 8, x2: 13, color: "hsl(140, 55%, 45%)", label: "α" },
                { x1: 13, x2: 30, color: "hsl(45, 70%, 50%)", label: "β" },
                { x1: 30, x2: 35, color: "hsl(15, 65%, 50%)", label: "γ" },
              ].map(band => (
                <g key={band.label}>
                  <rect x={xScaleFFT(band.x1)} y={fftPlotY} width={xScaleFFT(band.x2) - xScaleFFT(band.x1)} height={fftPlotH}
                    fill={band.color} opacity="0.04" />
                  <text x={(xScaleFFT(band.x1) + xScaleFFT(band.x2)) / 2} y={fftPlotY + fftPlotH + 10}
                    textAnchor="middle" fontSize="6" fill={band.color} opacity="0.6" fontWeight="600">
                    {band.label}
                  </text>
                </g>
              ))}
  
              {/* FFT bars */}
              {fftBars}
  
              {/* FFT outline */}
              <path d={fftPath} fill="none" stroke={bisColor} strokeWidth="1" opacity="0.6" />
  
              {/* Y axis for FFT */}
              <text x={fftPlotX - 4} y={fftPlotY + 5} textAnchor="end" fontSize="5" fill="hsl(var(--muted-foreground))" opacity="0.4">Power</text>
              <text x={fftPlotX - 4} y={fftPlotY + fftPlotH} textAnchor="end" fontSize="5" fill="hsl(var(--muted-foreground))" opacity="0.4">0</text>
  
              {/* X axis freq ticks */}
              {[0, 5, 10, 15, 20, 25, 30, 35].map(f => (
                <g key={f}>
                  <line x1={xScaleFFT(f)} y1={fftPlotY + fftPlotH} x2={xScaleFFT(f)} y2={fftPlotY + fftPlotH + 3}
                    stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" opacity="0.3" />
                  <text x={xScaleFFT(f)} y={fftPlotY + fftPlotH + 20} textAnchor="middle"
                    fontSize="5" fill="hsl(var(--muted-foreground))" opacity="0.4">{f}</text>
                </g>
              ))}
              <text x={fftPlotX + fftPlotW / 2} y={svgH - 2} textAnchor="middle"
                fontSize="6" fill="hsl(var(--muted-foreground))" opacity="0.35">Frequency (Hz)</text>
  
              {/* SEF95 marker */}
              {!stage.isoelectric && (
                <g>
                  <line x1={xScaleFFT(sef95)} y1={fftPlotY} x2={xScaleFFT(sef95)} y2={fftPlotY + fftPlotH}
                    stroke="hsl(var(--foreground))" strokeWidth="1" strokeDasharray="3 2" opacity="0.4" />
                  <text x={xScaleFFT(sef95) + 3} y={fftPlotY + 10} fontSize="5.5"
                    fill="hsl(var(--foreground))" opacity="0.6" fontWeight="600">
                    SEF95: {sef95.toFixed(1)} Hz
                  </text>
                </g>
              )}
  
              {/* Peak frequency marker */}
              {!stage.isoelectric && peakFreq > 0 && (
                <g>
                  <circle cx={xScaleFFT(peakFreq)} cy={fftPlotY + fftPlotH - (spectrum.find(b => b.freq === peakFreq)!.power / maxPower) * fftPlotH}
                    r="3" fill={bisColor} opacity="0.7" />
                  <text x={xScaleFFT(peakFreq)} y={fftPlotY + fftPlotH - (spectrum.find(b => b.freq === peakFreq)!.power / maxPower) * fftPlotH - 6}
                    textAnchor="middle" fontSize="5" fill={bisColor} opacity="0.7" fontWeight="600">
                    Peak: {peakFreq} Hz ({bandName(peakFreq)})
                  </text>
                </g>
              )}
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
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{stage.eegDescription}</p>
            </div>
  
            <div className="p-3 rounded-lg border border-border bg-secondary/20">
              <p className="font-semibold text-foreground text-xs mb-1.5">Power Spectrum Analysis</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-muted-foreground text-[10px]">Peak Frequency</p>
                  <p className="text-foreground font-semibold">{stage.isoelectric ? "—" : `${peakFreq} Hz (${bandName(peakFreq)})`}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-[10px]">SEF95</p>
                  <p className="text-foreground font-semibold">{stage.isoelectric ? "—" : `${sef95.toFixed(1)} Hz`}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                {stage.isoelectric
                  ? "No spectral power — flat noise floor only."
                  : stage.burstSuppress
                    ? "Reduced total power with intermittent delta bursts. SEF95 very low."
                    : `Dominant power in the ${bandName(peakFreq)} band. As anaesthesia deepens, spectral power shifts from high-frequency beta → alpha → delta, and SEF95 decreases.`
                }
              </p>
            </div>
  
            <div className="p-3 rounded-lg border border-border bg-secondary/20">
              <p className="font-semibold text-foreground text-xs mb-1">EEG Band Progression</p>
              <div className="grid grid-cols-5 gap-1 text-[9px]">
                {[
                  { band: "δ", range: "0.5–4", color: "hsl(280, 55%, 55%)", active: stageIdx >= 3 && !stage.isoelectric },
                  { band: "θ", range: "4–8", color: "hsl(200, 60%, 50%)", active: stageIdx === 2 },
                  { band: "α", range: "8–13", color: "hsl(140, 55%, 45%)", active: stageIdx === 1 },
                  { band: "β", range: "13–30", color: "hsl(45, 70%, 50%)", active: stageIdx === 0 },
                  { band: "γ", range: ">30", color: "hsl(15, 65%, 50%)", active: false },
                ].map(({ band, range, color, active }) => (
                  <div key={band} className={`text-center py-1 rounded border transition-all ${active ? "font-semibold" : "opacity-40"}`}
                    style={active ? { borderColor: color, backgroundColor: `${color}15`, color } : undefined}>
                    <span className="font-bold">{band}</span>
                    <br />{range} Hz
                  </div>
                ))}
              </div>
            </div>
  
            {stage.burstSuppress && (
              <div className="p-3 rounded-lg border border-destructive/30 bg-destructive/5">
                <p className="font-semibold text-foreground text-xs">⚠ Burst Suppression</p>
                <p className="text-xs text-muted-foreground mt-1">
                  SR &gt;0%. Bursts of activity alternate with isoelectric periods. Associated with <strong>excessive depth</strong>, postoperative delirium, and increased mortality. Action: reduce anaesthetic.
                </p>
              </div>
            )}
            {stage.isoelectric && (
              <div className="p-3 rounded-lg border border-destructive/40 bg-destructive/5">
                <p className="font-semibold text-foreground text-xs">⚠ Isoelectric EEG</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Complete cortical silence (&lt;0.5 µV). SR 100%. <strong>Immediately reduce or cease anaesthetic agent</strong>. Differentiate from artefact.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default EEGTraceDiagram;

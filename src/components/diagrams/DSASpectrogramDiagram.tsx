import { useState, useMemo, useCallback } from "react";

type Phase = "preinduction" | "induction" | "maintenance" | "emergence" | "recovery";

interface PhaseInfo {
  label: string;
  timeLabel: string;
  description: string;
  eegPattern: string;
  bisRange: string;
  dominantBand: string;
}

const phaseInfo: Record<Phase, PhaseInfo> = {
  preinduction: {
    label: "Pre-induction (Awake)",
    timeLabel: "T = 0 min",
    description: "Patient awake, eyes open or closed. EEG dominated by beta activity (13–30 Hz) when alert, or posterior alpha (8–13 Hz) with eyes closed. Low power across all bands. DSA shows diffuse warm colours in the high-frequency range.",
    eegPattern: "Low-amplitude, high-frequency desynchronised activity",
    bisRange: "90–100",
    dominantBand: "β (13–30 Hz)",
  },
  induction: {
    label: "Induction",
    timeLabel: "T = 2–5 min",
    description: "As propofol/volatile takes effect: initial beta activation ('paradoxical excitation'), then rapid transition through alpha anteriorisation to dominant frontal alpha (8–13 Hz). Power increases markedly. The DSA shows a bright alpha band forming — the characteristic 'alpha bridge'. Delta power starts to appear.",
    eegPattern: "Beta → alpha anteriorisation → frontal alpha spindles + increasing delta",
    bisRange: "40–65",
    dominantBand: "α (8–13 Hz) anteriorised",
  },
  maintenance: {
    label: "Maintenance (Surgical Anaesthesia)",
    timeLabel: "T = 10–90 min",
    description: "Stable surgical anaesthesia. DSA shows two distinct bands: a prominent slow delta band (0.5–4 Hz) and an alpha band (~10 Hz) — this 'two-band' pattern is the hallmark of adequate propofol/volatile anaesthesia. The alpha band may shift lower with deeper planes. Loss of the alpha band suggests excessive depth.",
    eegPattern: "Slow-delta oscillation + alpha spindles (two-band pattern)",
    bisRange: "40–60",
    dominantBand: "δ (0.5–4 Hz) + α (~10 Hz)",
  },
  emergence: {
    label: "Emergence",
    timeLabel: "T = 90–100 min",
    description: "As anaesthetic concentration decreases: alpha band shifts upward and eventually fragments. Delta power decreases. Beta activity returns. The DSA shows the alpha band 'dissolving' with return of broadband higher-frequency activity. A zip-like pattern of converging bands may appear.",
    eegPattern: "Alpha fragmentation → beta return → desynchronisation",
    bisRange: "60–85",
    dominantBand: "α fragmenting → β returning",
  },
  recovery: {
    label: "Recovery (Awake)",
    timeLabel: "T = 105+ min",
    description: "Patient responsive. EEG returns to awake pattern — low-amplitude desynchronised beta/gamma. DSA shows loss of the organised alpha and delta bands, replaced by diffuse low-power high-frequency activity. Similar to pre-induction pattern.",
    eegPattern: "Low-amplitude beta, desynchronised — awake pattern",
    bisRange: "85–100",
    dominantBand: "β (13–30 Hz)",
  },
};

const phaseOrder: Phase[] = ["preinduction", "induction", "maintenance", "emergence", "recovery"];

/**
 * Generate DSA spectrogram pixel data as a 2D array [time][freq] → power (0–1).
 * Deterministic pseudo-noise for consistency.
 */
function generateSpectrogram(): number[][] {
  const timeSteps = 200; // columns
  const freqBins = 40;   // rows (0–40 Hz, 1 Hz per bin)
  const data: number[][] = [];

  const noise = (seed: number) => {
    const x = Math.sin(seed) * 43758.5453;
    return x - Math.floor(x);
  };

  for (let t = 0; t < timeSteps; t++) {
    const row: number[] = [];
    const phase = t / timeSteps; // 0→1 across entire timeline

    for (let f = 0; f < freqBins; f++) {
      let power = 0;
      const n = noise(t * 41.3 + f * 17.7) * 0.08; // background noise

      if (phase < 0.08) {
        // Pre-induction: diffuse low-power beta
        const betaPeak = f >= 13 && f <= 25 ? 0.2 * Math.exp(-((f - 18) ** 2) / 30) : 0;
        const alphaPeak = f >= 8 && f <= 12 ? 0.15 * Math.exp(-((f - 10) ** 2) / 8) : 0;
        power = betaPeak + alphaPeak + n * 0.5;
      } else if (phase < 0.2) {
        // Induction: beta flash then alpha anteriorisation
        const inductionProgress = (phase - 0.08) / 0.12;
        const betaFlash = inductionProgress < 0.3
          ? (f >= 15 && f <= 28 ? 0.5 * Math.exp(-((f - 20) ** 2) / 25) * (1 - inductionProgress / 0.3) : 0)
          : 0;
        const alphaGrow = f >= 8 && f <= 13
          ? 0.7 * Math.exp(-((f - 10) ** 2) / 5) * Math.min(1, inductionProgress * 1.5)
          : 0;
        const deltaGrow = f >= 0 && f <= 4
          ? 0.4 * Math.exp(-((f - 2) ** 2) / 4) * Math.min(1, inductionProgress * 1.2)
          : 0;
        power = betaFlash + alphaGrow + deltaGrow + n * 0.3;
      } else if (phase < 0.75) {
        // Maintenance: stable two-band (delta + alpha)
        const maintenanceT = (phase - 0.2) / 0.55;
        const deltaPower = f >= 0 && f <= 5
          ? 0.8 * Math.exp(-((f - 1.5) ** 2) / 3) * (0.9 + 0.1 * Math.sin(maintenanceT * 12))
          : 0;
        const alphaPower = f >= 7 && f <= 14
          ? 0.65 * Math.exp(-((f - 10) ** 2) / 5) * (0.85 + 0.15 * Math.sin(maintenanceT * 8 + 1))
          : 0;
        // Slight wandering of alpha peak
        const alphaShift = f >= 7 && f <= 14
          ? 0.1 * Math.exp(-((f - (10 + Math.sin(maintenanceT * 6) * 1.5)) ** 2) / 3)
          : 0;
        power = deltaPower + alphaPower + alphaShift + n * 0.15;
      } else if (phase < 0.9) {
        // Emergence: alpha dissolves, beta returns
        const emergeProgress = (phase - 0.75) / 0.15;
        const deltaFade = f >= 0 && f <= 5
          ? 0.6 * Math.exp(-((f - 1.5) ** 2) / 3) * (1 - emergeProgress * 0.8)
          : 0;
        const alphaFade = f >= 7 && f <= 14
          ? 0.5 * Math.exp(-((f - 10) ** 2) / 5) * (1 - emergeProgress)
          : 0;
        const betaReturn = f >= 13 && f <= 28
          ? 0.3 * Math.exp(-((f - 20) ** 2) / 30) * emergeProgress
          : 0;
        power = deltaFade + alphaFade + betaReturn + n * 0.3;
      } else {
        // Recovery: awake pattern
        const betaPeak = f >= 13 && f <= 25 ? 0.25 * Math.exp(-((f - 18) ** 2) / 30) : 0;
        const alphaPeak = f >= 8 && f <= 12 ? 0.12 * Math.exp(-((f - 10) ** 2) / 8) : 0;
        power = betaPeak + alphaPeak + n * 0.5;
      }

      row.push(Math.min(1, Math.max(0, power)));
    }
    data.push(row);
  }
  return data;
}

/** Map power 0–1 to a colour (dark blue → cyan → yellow → red → white) */
function powerToColor(p: number): string {
  const v = Math.min(1, Math.max(0, p));
  if (v < 0.15) return `hsl(240, 60%, ${8 + v * 100}%)`;
  if (v < 0.35) return `hsl(${240 - (v - 0.15) * 600}, 65%, ${20 + v * 60}%)`;
  if (v < 0.55) return `hsl(${120 + (0.55 - v) * 300}, 70%, ${40 + v * 30}%)`;
  if (v < 0.75) return `hsl(${60 - (v - 0.55) * 200}, 80%, ${50 + v * 15}%)`;
  return `hsl(${20 - (v - 0.75) * 80}, ${85 + v * 15}%, ${55 + v * 20}%)`;
}

const DSASpectrogramDiagram = () => {
  const [hoveredPhase, setHoveredPhase] = useState<Phase>("maintenance");
  const specData = useMemo(() => generateSpectrogram(), []);

  const svgW = 600;
  const svgH = 280;
  const plotX = 50;
  const plotY = 25;
  const plotW = 520;
  const plotH = 180;
  const timeSteps = specData.length;
  const freqBins = specData[0].length;

  const cellW = plotW / timeSteps;
  const cellH = plotH / freqBins;

  // Phase boundaries in timeline fraction → pixel
  const phaseBounds: { phase: Phase; x1: number; x2: number }[] = [
    { phase: "preinduction", x1: 0, x2: 0.08 },
    { phase: "induction", x1: 0.08, x2: 0.2 },
    { phase: "maintenance", x1: 0.2, x2: 0.75 },
    { phase: "emergence", x1: 0.75, x2: 0.9 },
    { phase: "recovery", x1: 0.9, x2: 1.0 },
  ];

  const handleHover = useCallback((phase: Phase) => setHoveredPhase(phase), []);

  const info = phaseInfo[hoveredPhase];

  // Pre-render spectrogram rects
  const spectrogramRects = useMemo(() => {
    const rects: JSX.Element[] = [];
    // Render every 2nd pixel for performance, double width
    for (let t = 0; t < timeSteps; t += 2) {
      for (let f = 0; f < freqBins; f++) {
        const p = Math.max(specData[t][f], t + 1 < timeSteps ? specData[t + 1][f] : 0);
        if (p < 0.03) continue; // skip near-zero
        rects.push(
          <rect
            key={`${t}-${f}`}
            x={plotX + t * cellW}
            y={plotY + plotH - (f + 1) * cellH}
            width={cellW * 2.2}
            height={cellH * 1.1}
            fill={powerToColor(p)}
          />
        );
      }
    }
    return rects;
  }, [specData]);

  return (
    <div className="border border-border rounded-lg p-4 mb-6">
      <h3 className="text-lg font-serif font-bold text-foreground mb-1">
        Density Spectral Array (DSA) — Spectrogram
      </h3>
      <p className="text-xs text-muted-foreground mb-4">
        Colour-coded frequency × time display showing power spectral changes through induction, maintenance, and emergence. Hover or tap a phase to see details.
      </p>

      <div className="flex flex-col lg:flex-row gap-4 items-start">
        <div className="flex-shrink-0 mx-auto lg:mx-0 overflow-x-auto">
          <svg viewBox={`0 0 ${svgW} ${svgH}`} width={svgW} height={svgH}
            className="border border-border rounded bg-[hsl(240,20%,6%)] max-w-full">

            {/* Background */}
            <rect x={plotX} y={plotY} width={plotW} height={plotH} fill="hsl(240, 30%, 5%)" />

            {/* Spectrogram pixels */}
            {spectrogramRects}

            {/* Phase boundaries & hover zones */}
            {phaseBounds.map(({ phase, x1, x2 }) => {
              const px1 = plotX + x1 * plotW;
              const px2 = plotX + x2 * plotW;
              const isActive = hoveredPhase === phase;
              return (
                <g key={phase}>
                  {/* Hover zone */}
                  <rect x={px1} y={plotY} width={px2 - px1} height={plotH}
                    fill="transparent" cursor="pointer"
                    onMouseEnter={() => handleHover(phase)}
                    onClick={() => handleHover(phase)} />
                  {/* Active highlight border */}
                  {isActive && (
                    <rect x={px1} y={plotY} width={px2 - px1} height={plotH}
                      fill="none" stroke="hsl(var(--primary-foreground))" strokeWidth="1.5" opacity="0.6" strokeDasharray="4 3" />
                  )}
                  {/* Phase divider */}
                  {x1 > 0 && (
                    <line x1={px1} y1={plotY} x2={px1} y2={plotY + plotH}
                      stroke="hsl(0, 0%, 60%)" strokeWidth="0.5" opacity="0.4" strokeDasharray="3 3" />
                  )}
                  {/* Phase label at top */}
                  <text x={(px1 + px2) / 2} y={plotY + plotH + 14} textAnchor="middle"
                    fontSize="6.5" fontWeight={isActive ? "700" : "400"}
                    fill={isActive ? "hsl(var(--primary-foreground))" : "hsl(0, 0%, 70%)"} opacity={isActive ? 1 : 0.5}>
                    {phaseInfo[phase].label.split("(")[0].trim()}
                  </text>
                </g>
              );
            })}

            {/* Y-axis: frequency labels */}
            {[0, 5, 10, 15, 20, 25, 30, 35, 40].map(f => (
              <g key={f}>
                <text x={plotX - 4} y={plotY + plotH - f * cellH + 2} textAnchor="end"
                  fontSize="5.5" fill="hsl(0, 0%, 65%)" opacity="0.6">{f}</text>
                <line x1={plotX} y1={plotY + plotH - f * cellH} x2={plotX + plotW} y2={plotY + plotH - f * cellH}
                  stroke="hsl(0, 0%, 50%)" strokeWidth="0.2" opacity="0.15" />
              </g>
            ))}
            <text x="12" y={plotY + plotH / 2} textAnchor="middle" fontSize="7" fill="hsl(0, 0%, 70%)" opacity="0.6"
              transform={`rotate(-90, 12, ${plotY + plotH / 2})`}>
              Frequency (Hz)
            </text>

            {/* X-axis label */}
            <text x={plotX + plotW / 2} y={svgH - 8} textAnchor="middle" fontSize="7" fill="hsl(0, 0%, 65%)" opacity="0.5">
              Time →
            </text>

            {/* Time ticks */}
            {["0", "15", "30", "45", "60", "75", "90", "105"].map((t, i) => (
              <text key={t} x={plotX + (i / 7) * plotW} y={plotY + plotH + 24} textAnchor="middle"
                fontSize="5" fill="hsl(0, 0%, 60%)" opacity="0.4">{t} min</text>
            ))}

            {/* EEG band reference markers on right */}
            {[
              { label: "δ", y1: 0, y2: 4, color: "hsl(280, 60%, 55%)" },
              { label: "θ", y1: 4, y2: 8, color: "hsl(200, 60%, 55%)" },
              { label: "α", y1: 8, y2: 13, color: "hsl(120, 55%, 50%)" },
              { label: "β", y1: 13, y2: 30, color: "hsl(45, 70%, 55%)" },
              { label: "γ", y1: 30, y2: 40, color: "hsl(15, 70%, 55%)" },
            ].map(({ label, y1, y2, color }) => {
              const py1 = plotY + plotH - y2 * cellH;
              const py2 = plotY + plotH - y1 * cellH;
              return (
                <g key={label}>
                  <line x1={plotX + plotW + 4} y1={py1} x2={plotX + plotW + 4} y2={py2}
                    stroke={color} strokeWidth="3" opacity="0.5" strokeLinecap="round" />
                  <text x={plotX + plotW + 12} y={(py1 + py2) / 2 + 2} fontSize="7" fill={color} opacity="0.7" fontWeight="600">
                    {label}
                  </text>
                </g>
              );
            })}

            {/* Colour bar legend */}
            <defs>
              <linearGradient id="dsa-colorbar" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="hsl(240, 60%, 10%)" />
                <stop offset="20%" stopColor="hsl(200, 65%, 30%)" />
                <stop offset="40%" stopColor="hsl(160, 70%, 40%)" />
                <stop offset="60%" stopColor="hsl(60, 75%, 50%)" />
                <stop offset="80%" stopColor="hsl(30, 80%, 55%)" />
                <stop offset="100%" stopColor="hsl(10, 85%, 65%)" />
              </linearGradient>
            </defs>
            <rect x={plotX} y={svgH - 18} width="120" height="6" rx="2" fill="url(#dsa-colorbar)" />
            <text x={plotX - 2} y={svgH - 13} fontSize="4.5" fill="hsl(0,0%,60%)" opacity="0.5" textAnchor="end">Low</text>
            <text x={plotX + 124} y={svgH - 13} fontSize="4.5" fill="hsl(0,0%,60%)" opacity="0.5">High</text>
            <text x={plotX + 60} y={svgH - 8} textAnchor="middle" fontSize="4.5" fill="hsl(0,0%,55%)" opacity="0.4">Power (µV²/Hz)</text>

            {/* Key features: alpha bridge visible in maintenance phase */}
          </svg>
        </div>

        {/* Info panel */}
        <div className="flex-1 min-w-0 space-y-3 animate-fade-in" key={hoveredPhase}>
          <div className="p-3 rounded-lg border border-border">
            <p className="font-semibold text-foreground text-sm">{info.label}</p>
            <p className="text-[10px] text-muted-foreground opacity-60 mb-1">{info.timeLabel} · BIS {info.bisRange}</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{info.description}</p>
          </div>

          <div className="p-3 rounded-lg border border-border bg-secondary/20">
            <div className="flex items-start gap-2">
              <div className="shrink-0">
                <p className="text-[10px] text-muted-foreground font-semibold">EEG Pattern</p>
                <p className="text-xs text-foreground mt-0.5">{info.eegPattern}</p>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-border">
              <p className="text-[10px] text-muted-foreground font-semibold">Dominant Band</p>
              <p className="text-xs text-foreground mt-0.5">{info.dominantBand}</p>
            </div>
          </div>

          <div className="p-3 rounded-lg border border-border bg-secondary/20">
            <p className="text-[10px] text-muted-foreground font-semibold mb-1">DSA Interpretation Tips</p>
            <ul className="text-xs text-muted-foreground space-y-1.5 leading-relaxed">
              <li>• <strong>Two-band pattern</strong> (delta + alpha) = adequate anaesthesia (propofol/volatile)</li>
              <li>• <strong>Alpha band loss</strong> with only delta = excessive depth → reduce agent</li>
              <li>• <strong>Alpha band rising / fragmenting</strong> = lightening → emergence approaching</li>
              <li>• <strong>Broadband activation</strong> (beta/gamma) = awake or inadequate anaesthesia</li>
              <li>• Ketamine and N₂O produce different patterns — gamma predominance, not classic alpha + delta</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DSASpectrogramDiagram;

import { DiagramFigure } from "./_shared/DiagramFigure";
const APRVWaveformDiagram = () => {
  // Layout constants
  const W = 700;
  const H = 340;
  const ml = 70; // margin left
  const mr = 30;
  const mt = 40;
  const mb = 60;
  const plotW = W - ml - mr;
  const plotH = H - mt - mb;

  // Pressure levels (mapped to y)
  const pHigh = 25; // cmH2O
  const pLow = 0;
  const pMax = 35;

  const yScale = (p: number) => mt + plotH - (p / pMax) * plotH;
  const yHigh = yScale(pHigh);
  const yLow = yScale(pLow);
  const yZero = yScale(0);

  // Time parameters (seconds) — 2 full cycles
  const tHigh = 4.5;
  const tLow = 0.6;
  const cycle = tHigh + tLow;
  const totalTime = cycle * 2;
  const xScale = (t: number) => ml + (t / totalTime) * plotW;

  // Build the pressure waveform path
  const riseTime = 0.15;
  const fallTime = 0.1;

  const buildCyclePath = (startT: number) => {
    const points: string[] = [];
    // Rise from Plow to Phigh
    points.push(`${xScale(startT)},${yLow}`);
    points.push(`${xScale(startT + riseTime)},${yHigh}`);
    // Hold at Phigh
    points.push(`${xScale(startT + tHigh - fallTime)},${yHigh}`);
    // Fall to Plow
    points.push(`${xScale(startT + tHigh)},${yLow}`);
    // Hold at Plow (brief release)
    points.push(`${xScale(startT + tHigh + tLow - riseTime)},${yLow}`);
    return points;
  };

  const allPoints = [
    `${xScale(0)},${yLow}`,
    ...buildCyclePath(0),
    ...buildCyclePath(cycle),
    `${xScale(totalTime)},${yLow}`,
  ];

  const pathD = `M ${allPoints.join(" L ")}`;

  // Small spontaneous breathing ripples on the Phigh plateau
  const ripples: { cx: number; cy: number }[] = [];
  for (let c = 0; c < 2; c++) {
    const base = c * cycle;
    for (let i = 0; i < 4; i++) {
      const t = base + 0.6 + i * 0.9;
      if (t < base + tHigh - 0.3) {
        ripples.push({ cx: xScale(t), cy: yHigh });
      }
    }
  }

  // Annotation positions
  const cycle1Start = 0;
  const tHighMid = cycle1Start + tHigh / 2;
  const tLowMid = cycle1Start + tHigh + tLow / 2;

  // Tick values for Y axis
  const yTicks = [0, 5, 10, 15, 20, 25, 30, 35];

  return (
    <DiagramFigure
      id="aprv-waveform-diagram"
      title="APRV waveform"
      description="Auto-generated wrapper for the APRV waveform anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <div className="rounded-xl border border-border bg-card p-4 mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-3 text-center">APRV Pressure–Time Waveform</h3>
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="APRV pressure-time waveform showing P high, P low, T high and T low">
          {/* Grid lines */}
          {yTicks.map((p) => (
            <line key={p} x1={ml} x2={W - mr} y1={yScale(p)} y2={yScale(p)} stroke="hsl(var(--border))" strokeWidth={0.5} strokeDasharray={p === 0 ? "0" : "4 3"} />
          ))}
  
          {/* Y axis */}
          <line x1={ml} y1={mt} x2={ml} y2={yZero} stroke="hsl(var(--foreground))" strokeWidth={1.5} />
          {yTicks.map((p) => (
            <g key={`yt-${p}`}>
              <line x1={ml - 4} y1={yScale(p)} x2={ml} y2={yScale(p)} stroke="hsl(var(--foreground))" strokeWidth={1} />
              <text x={ml - 8} y={yScale(p) + 4} textAnchor="end" fontSize={10} fill="hsl(var(--muted-foreground))">{p}</text>
            </g>
          ))}
          <text x={14} y={mt + plotH / 2} textAnchor="middle" fontSize={11} fill="hsl(var(--foreground))" transform={`rotate(-90, 14, ${mt + plotH / 2})`}>
            Pressure (cmH₂O)
          </text>
  
          {/* X axis */}
          <line x1={ml} y1={yZero} x2={W - mr} y2={yZero} stroke="hsl(var(--foreground))" strokeWidth={1.5} />
          <text x={ml + plotW / 2} y={H - 8} textAnchor="middle" fontSize={11} fill="hsl(var(--foreground))">Time</text>
  
          {/* Pressure waveform */}
          <path d={pathD} fill="none" stroke="hsl(var(--primary))" strokeWidth={2} strokeLinejoin="round" />
  
          {/* Spontaneous breathing ripples */}
          {ripples.map((r, i) => (
            <path
              key={i}
              d={`M ${r.cx - 8},${r.cy} Q ${r.cx - 4},${r.cy - 5} ${r.cx},${r.cy} Q ${r.cx + 4},${r.cy + 4} ${r.cx + 8},${r.cy}`}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth={1.5}
              opacity={0.6}
            />
          ))}
  
          {/* P high label */}
          <line x1={ml} y1={yHigh} x2={W - mr} y2={yHigh} stroke="hsl(var(--accent))" strokeWidth={1} strokeDasharray="6 3" opacity={0.5} />
          <text x={W - mr + 4} y={yHigh + 4} fontSize={11} fontWeight="bold" fill="hsl(var(--accent))">P_high</text>
  
          {/* P low label */}
          <text x={W - mr + 4} y={yZero - 4} fontSize={11} fontWeight="bold" fill="hsl(var(--destructive))">P_low</text>
  
          {/* T high annotation (first cycle) */}
          <line x1={xScale(riseTime)} y1={yHigh - 18} x2={xScale(tHigh - fallTime)} y2={yHigh - 18} stroke="hsl(var(--foreground))" strokeWidth={1} markerStart="url(#arrowL)" markerEnd="url(#arrowR)" />
          <text x={xScale(tHighMid)} y={yHigh - 24} textAnchor="middle" fontSize={12} fontWeight="bold" fill="hsl(var(--foreground))">T high</text>
  
          {/* T low annotation (first release) */}
          <line x1={xScale(tHigh)} y1={yLow + 18} x2={xScale(tHigh + tLow)} y2={yLow + 18} stroke="hsl(var(--foreground))" strokeWidth={1} markerStart="url(#arrowL)" markerEnd="url(#arrowR)" />
          <text x={xScale(tLowMid)} y={yLow + 32} textAnchor="middle" fontSize={12} fontWeight="bold" fill="hsl(var(--foreground))">T low</text>
  
          {/* Spontaneous breathing label */}
          <text x={xScale(tHighMid)} y={yHigh + 20} textAnchor="middle" fontSize={9} fill="hsl(var(--muted-foreground))" fontStyle="italic">spontaneous breaths</text>
  
          {/* Arrow markers */}
          <defs>
            <marker id="arrowR" markerWidth={6} markerHeight={6} refX={5} refY={3} orient="auto">
              <path d="M 0 0 L 6 3 L 0 6" fill="none" stroke="hsl(var(--foreground))" strokeWidth={1} />
            </marker>
            <marker id="arrowL" markerWidth={6} markerHeight={6} refX={1} refY={3} orient="auto">
              <path d="M 6 0 L 0 3 L 6 6" fill="none" stroke="hsl(var(--foreground))" strokeWidth={1} />
            </marker>
          </defs>
        </svg>
        <p className="text-xs text-muted-foreground text-center mt-2">
          The prolonged T<sub>high</sub> maintains alveolar recruitment. The brief T<sub>low</sub> release allows CO₂ clearance while preserving intrinsic PEEP. Small ripples represent spontaneous breathing on the P<sub>high</sub> plateau.
        </p>
      </div>
    </DiagramFigure>
  );
};

export default APRVWaveformDiagram;

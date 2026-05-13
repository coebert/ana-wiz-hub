import { DiagramFigure } from "./_shared/DiagramFigure";
const APRVExpiratoryFlowDiagram = () => {
  const W = 700;
  const H = 320;
  const ml = 80;
  const mr = 40;
  const mt = 40;
  const mb = 55;
  const plotW = W - ml - mr;
  const plotH = H - mt - mb;

  // Flow axis: +60 to -80 L/min
  const flowMax = 60;
  const flowMin = -80;
  const flowRange = flowMax - flowMin;
  const yScale = (f: number) => mt + plotH - ((f - flowMin) / flowRange) * plotH;
  const yZero = yScale(0);

  // Time axis: 0 to 1.2 seconds (showing release and re-pressurisation)
  const tTotal = 1.2;
  const xScale = (t: number) => ml + (t / tTotal) * plotW;

  // PEFR value
  const pefr = -70; // L/min peak expiratory flow
  const pefrY = yScale(pefr);

  // T low termination points
  const tLowCorrect = 0.6; // correct T low — flow at 50-75% PEFR
  const tLowTooLong = 0.95; // too long — flow near zero

  // Expiratory flow curve: rapid peak then exponential decay
  // Flow(t) = PEFR * exp(-k*t) for t > 0
  const k = 4.5;
  const flowAt = (t: number) => {
    if (t <= 0) return 0;
    if (t <= 0.05) return pefr * (t / 0.05); // rapid ramp to peak
    return pefr * Math.exp(-k * (t - 0.05));
  };

  // Build flow curve path
  const points: string[] = [];
  const steps = 120;
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * 1.05;
    const f = flowAt(t);
    points.push(`${xScale(t)},${yScale(f)}`);
  }
  // Return to zero (re-pressurisation)
  points.push(`${xScale(1.05)},${yScale(flowAt(1.05))}`);
  points.push(`${xScale(1.1)},${yZero}`);

  const pathD = `M ${xScale(0)},${yZero} L ${points.join(" L ")}`;

  // Flow values at termination points
  const flowAtCorrect = flowAt(tLowCorrect);
  const percentCorrect = Math.round((flowAtCorrect / pefr) * 100);

  const flowAtTooLong = flowAt(tLowTooLong);

  // 75% and 50% PEFR lines
  const pefr75 = pefr * 0.75;
  const pefr50 = pefr * 0.50;

  // Shaded target zone
  const zoneY1 = yScale(pefr75);
  const zoneY2 = yScale(pefr50);

  // Y-axis ticks
  const yTicks = [60, 40, 20, 0, -20, -40, -60, -80];

  return (
        <div className="rounded-xl border border-border bg-card p-4 mb-4">
      <h3 className="text-lg font-semibold text-foreground mb-3 text-center">
        Expiratory Flow During T<sub>low</sub> — Setting the Termination Point
      </h3>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Expiratory flow-time trace during APRV T low showing 50-75% PEFR termination zone">

        {/* Grid lines */}
        {yTicks.map((f) => (
          <line key={f} x1={ml} x2={W - mr} y1={yScale(f)} y2={yScale(f)}
            stroke="hsl(var(--border))" strokeWidth={0.5}
            strokeDasharray={f === 0 ? "0" : "4 3"} />
        ))}

        {/* Target termination zone (50-75% PEFR) */}
        <rect x={ml} y={zoneY2} width={plotW} height={zoneY1 - zoneY2}
          fill="hsl(var(--accent))" opacity={0.1} />

        {/* 75% PEFR line */}
        <line x1={ml} x2={W - mr} y1={yScale(pefr75)} y2={yScale(pefr75)}
          stroke="hsl(var(--accent))" strokeWidth={1} strokeDasharray="6 3" opacity={0.7} />
        <text x={W - mr + 4} y={yScale(pefr75) + 4} fontSize={9} fill="hsl(var(--accent))" fontWeight="bold">
          75% PEFR
        </text>

        {/* 50% PEFR line */}
        <line x1={ml} x2={W - mr} y1={yScale(pefr50)} y2={yScale(pefr50)}
          stroke="hsl(var(--accent))" strokeWidth={1} strokeDasharray="6 3" opacity={0.7} />
        <text x={W - mr + 4} y={yScale(pefr50) + 4} fontSize={9} fill="hsl(var(--accent))" fontWeight="bold">
          50% PEFR
        </text>

        {/* PEFR line */}
        <line x1={ml} x2={W - mr} y1={pefrY} y2={pefrY}
          stroke="hsl(var(--destructive))" strokeWidth={1} strokeDasharray="4 4" opacity={0.5} />
        <text x={W - mr + 4} y={pefrY + 4} fontSize={9} fill="hsl(var(--destructive))" fontWeight="bold">
          PEFR
        </text>

        {/* Zero flow line (thicker) */}
        <line x1={ml} x2={W - mr} y1={yZero} y2={yZero}
          stroke="hsl(var(--foreground))" strokeWidth={1.5} />

        {/* Y axis */}
        <line x1={ml} y1={mt} x2={ml} y2={mt + plotH} stroke="hsl(var(--foreground))" strokeWidth={1.5} />
        {yTicks.map((f) => (
          <g key={`yt-${f}`}>
            <line x1={ml - 4} y1={yScale(f)} x2={ml} y2={yScale(f)} stroke="hsl(var(--foreground))" strokeWidth={1} />
            <text x={ml - 8} y={yScale(f) + 4} textAnchor="end" fontSize={10} fill="hsl(var(--muted-foreground))">{f}</text>
          </g>
        ))}
        <text x={16} y={mt + plotH / 2} textAnchor="middle" fontSize={11} fill="hsl(var(--foreground))"
          transform={`rotate(-90, 16, ${mt + plotH / 2})`}>
          Flow (L/min)
        </text>

        {/* X axis label */}
        <text x={ml + plotW / 2} y={H - 6} textAnchor="middle" fontSize={11} fill="hsl(var(--foreground))">
          Time (seconds)
        </text>
        {/* X axis ticks */}
        {[0, 0.2, 0.4, 0.6, 0.8, 1.0, 1.2].map((t) => (
          <g key={`xt-${t}`}>
            <line x1={xScale(t)} y1={yZero - 3} x2={xScale(t)} y2={yZero + 3} stroke="hsl(var(--foreground))" strokeWidth={1} />
            <text x={xScale(t)} y={yZero + 16} textAnchor="middle" fontSize={10} fill="hsl(var(--muted-foreground))">{t.toFixed(1)}</text>
          </g>
        ))}

        {/* Flow curve */}
        <path d={pathD} fill="none" stroke="hsl(var(--primary))" strokeWidth={2} strokeLinejoin="round" />

        {/* Correct termination point (green) */}
        <line x1={xScale(tLowCorrect)} y1={yZero} x2={xScale(tLowCorrect)} y2={yScale(flowAtCorrect)}
          stroke="hsl(var(--accent))" strokeWidth={2} strokeDasharray="4 3" />
        <circle cx={xScale(tLowCorrect)} cy={yScale(flowAtCorrect)} r={5}
          fill="hsl(var(--accent))" stroke="hsl(var(--background))" strokeWidth={2} />
        <text x={xScale(tLowCorrect)} y={yZero + 30} textAnchor="middle" fontSize={10} fontWeight="bold" fill="hsl(var(--accent))">
          ✓ Correct T low
        </text>
        <text x={xScale(tLowCorrect)} y={yZero + 42} textAnchor="middle" fontSize={9} fill="hsl(var(--accent))">
          ({percentCorrect}% PEFR)
        </text>

        {/* Too-long termination point (red) */}
        <line x1={xScale(tLowTooLong)} y1={yZero} x2={xScale(tLowTooLong)} y2={yScale(flowAtTooLong)}
          stroke="hsl(var(--destructive))" strokeWidth={2} strokeDasharray="4 3" />
        <circle cx={xScale(tLowTooLong)} cy={yScale(flowAtTooLong)} r={5}
          fill="hsl(var(--destructive))" stroke="hsl(var(--background))" strokeWidth={2} />
        <text x={xScale(tLowTooLong)} y={yZero + 30} textAnchor="middle" fontSize={10} fontWeight="bold" fill="hsl(var(--destructive))">
          ✗ Too long
        </text>
        <text x={xScale(tLowTooLong)} y={yZero + 42} textAnchor="middle" fontSize={9} fill="hsl(var(--destructive))">
          (derecruitment)
        </text>

        {/* Inspiratory flow label */}
        <text x={ml + 8} y={yScale(50)} fontSize={9} fill="hsl(var(--muted-foreground))" fontStyle="italic">
          Inspiratory
        </text>
        <text x={ml + 8} y={yScale(-10)} fontSize={9} fill="hsl(var(--muted-foreground))" fontStyle="italic">
          Expiratory
        </text>

        {/* Target zone label */}
        <rect x={ml + plotW * 0.55} y={zoneY2 + 2} width={120} height={18} rx={3}
          fill="hsl(var(--accent))" opacity={0.15} stroke="hsl(var(--border))" strokeWidth="0.75" />
        <text x={ml + plotW * 0.55 + 60} y={zoneY2 + 14} textAnchor="middle" fontSize={9} fontWeight="bold" fill="hsl(var(--accent))">
          Target zone (50–75%)
        </text>

        <defs>
          <marker id="arrowDown" markerWidth={6} markerHeight={6} refX={3} refY={5} orient="auto">
            <path d="M 0 0 L 3 6 L 6 0" fill="none" stroke="hsl(var(--foreground))" strokeWidth={1} />
          </marker>
        </defs>
      </svg>
      <p className="text-xs text-muted-foreground text-center mt-2">
        T<sub>low</sub> should be set so expiratory flow terminates at <span className="font-semibold text-foreground">50–75% of peak expiratory flow rate (PEFR)</span>. 
        If flow reaches zero, alveoli have fully emptied and derecruitment occurs. The shaded zone shows the target termination window.
      </p>
    </div>
  );
};

export default APRVExpiratoryFlowDiagram;

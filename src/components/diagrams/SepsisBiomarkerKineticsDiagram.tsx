import { useState } from "react";

interface BiomarkerConfig {
  id: string;
  label: string;
  color: string;
  unit: string;
  normalRange: string;
  peakTime: string;
  halfLife: string;
  riseStart: number; // hours
  peakHour: number;
  fallComplete: number; // hours to return near baseline
  peakY: number; // 0-1 normalised peak height
  description: string;
}

const biomarkers: BiomarkerConfig[] = [
  {
    id: "presepsin",
    label: "Presepsin",
    color: "hsl(270, 65%, 55%)",
    unit: "pg/mL",
    normalRange: "<200 pg/mL",
    peakTime: "2–3 h",
    halfLife: "1–3 h",
    riseStart: 0.5,
    peakHour: 3,
    fallComplete: 18,
    peakY: 0.55,
    description: "Fastest kinetics of all sepsis biomarkers. Soluble CD14 fragment released on monocyte activation by LPS. Rises within 2 h, peaks at 3 h, rapidly clears. Emerging evidence — not yet in SSC guidelines.",
  },
  {
    id: "lactate",
    label: "Lactate",
    color: "hsl(0, 75%, 55%)",
    unit: "mmol/L",
    normalRange: "<2 mmol/L",
    peakTime: "2–6 h",
    halfLife: "~20 min (if perfusion restored)",
    riseStart: 0.5,
    peakHour: 4,
    fallComplete: 24,
    peakY: 0.65,
    description: "Rises rapidly with tissue hypoperfusion and β₂-adrenergic stimulation. Clearance is fast if perfusion is restored (hepatic metabolism). Persistent elevation is the strongest predictor of mortality. SSC resuscitation target.",
  },
  {
    id: "pct",
    label: "Procalcitonin",
    color: "hsl(210, 80%, 55%)",
    unit: "ng/mL",
    normalRange: "<0.1 ng/mL",
    peakTime: "12–24 h",
    halfLife: "24–30 h",
    riseStart: 2,
    peakHour: 18,
    fallComplete: 72,
    peakY: 0.85,
    description: "Extra-thyroidal production induced by endotoxin and TNF-α. Best evidence for guiding antibiotic de-escalation (PRORATA, SAPS trials). 80% decline from peak supports stopping antibiotics. SSC 2021 recommended.",
  },
  {
    id: "crp",
    label: "CRP",
    color: "hsl(35, 92%, 50%)",
    unit: "mg/L",
    normalRange: "<5 mg/L",
    peakTime: "36–50 h",
    halfLife: "~19 h",
    riseStart: 6,
    peakHour: 42,
    fallComplete: 96,
    peakY: 0.95,
    description: "Hepatic acute-phase protein triggered by IL-6. Slowest kinetics — lags behind clinical picture by 24–48 h. Widely available and inexpensive. Non-specific: elevated in surgery, trauma, autoimmune disease. Best for trend monitoring.",
  },
];

// Generate curve points using a skewed gaussian-like shape
function generateCurve(b: BiomarkerConfig, maxHours: number): string {
  const points: string[] = [];
  const chartLeft = 50;
  const chartRight = 450;
  const chartTop = 30;
  const chartBottom = 220;
  const chartW = chartRight - chartLeft;
  const chartH = chartBottom - chartTop;

  for (let h = 0; h <= maxHours; h += 0.5) {
    const x = chartLeft + (h / maxHours) * chartW;
    let y: number;

    if (h < b.riseStart) {
      y = 0;
    } else if (h <= b.peakHour) {
      // Rise phase
      const t = (h - b.riseStart) / (b.peakHour - b.riseStart);
      y = b.peakY * Math.pow(t, 1.2);
    } else {
      // Fall phase — exponential decay
      const t = (h - b.peakHour) / (b.fallComplete - b.peakHour);
      y = b.peakY * Math.exp(-2.5 * t);
    }

    const px = x;
    const py = chartBottom - y * chartH;
    points.push(`${px},${py}`);
  }

  return `M ${points[0]} ` + points.slice(1).map(p => `L ${p}`).join(" ");
}

const maxHours = 96;
const timeLabels = [0, 6, 12, 24, 48, 72, 96];

const SepsisBiomarkerKineticsDiagram = () => {
  const [activeBiomarkers, setActiveBiomarkers] = useState<Set<string>>(
    new Set(biomarkers.map(b => b.id))
  );
  const [hoveredBiomarker, setHoveredBiomarker] = useState<string | null>(null);

  const toggleBiomarker = (id: string) => {
    setActiveBiomarkers(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        if (next.size > 1) next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const chartLeft = 50;
  const chartRight = 450;
  const chartTop = 30;
  const chartBottom = 220;
  const chartW = chartRight - chartLeft;

  const detailBiomarker = hoveredBiomarker
    ? biomarkers.find(b => b.id === hoveredBiomarker)
    : null;

  return (
    <div className="rounded-xl border border-border bg-card p-4 sm:p-6 mb-8">
      <h3 className="text-lg font-serif font-bold text-foreground mb-1">Sepsis Biomarker Kinetics</h3>
      <p className="text-xs text-muted-foreground mb-4">Click biomarkers to toggle visibility. Hover/tap for details.</p>

      {/* Toggle buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        {biomarkers.map(b => {
          const isActive = activeBiomarkers.has(b.id);
          return (
            <button
              key={b.id}
              onClick={() => toggleBiomarker(b.id)}
              onMouseEnter={() => setHoveredBiomarker(b.id)}
              onMouseLeave={() => setHoveredBiomarker(null)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all duration-200 ${
                isActive
                  ? "border-border bg-secondary/40 text-foreground"
                  : "border-border bg-secondary/10 text-muted-foreground opacity-50"
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: isActive ? b.color : "hsl(var(--muted-foreground))" }}
              />
              {b.label}
              <span className="text-muted-foreground font-normal">({b.unit})</span>
            </button>
          );
        })}
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {/* Chart */}
        <div className="md:col-span-2 rounded-lg border border-border bg-background p-2">
          <svg viewBox="0 20 480 230" className="w-full h-auto">
            {/* Grid lines */}
            {[0.25, 0.5, 0.75, 1].map(frac => {
              const y = chartBottom - frac * (chartBottom - chartTop);
              return (
                <line key={frac} x1={chartLeft} y1={y} x2={chartRight} y2={y}
                  stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" opacity="0.15" />
              );
            })}

            {/* Time grid lines */}
            {timeLabels.map(h => {
              const x = chartLeft + (h / maxHours) * chartW;
              return (
                <g key={h}>
                  <line x1={x} y1={chartTop} x2={x} y2={chartBottom}
                    stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" opacity="0.15" />
                  <text x={x} y={chartBottom + 14} textAnchor="middle"
                    className="fill-muted-foreground text-[8px]">{h}h</text>
                </g>
              );
            })}

            {/* Axes */}
            <line x1={chartLeft} y1={chartBottom} x2={chartRight} y2={chartBottom}
              stroke="hsl(var(--muted-foreground))" strokeWidth="1" opacity="0.3" />
            <line x1={chartLeft} y1={chartTop} x2={chartLeft} y2={chartBottom}
              stroke="hsl(var(--muted-foreground))" strokeWidth="1" opacity="0.3" />

            {/* Axis labels */}
            <text x={chartLeft + chartW / 2} y={chartBottom + 26} textAnchor="middle"
              className="fill-muted-foreground text-[8px] font-semibold">Time from onset of infection (hours)</text>
            <text x={15} y={(chartTop + chartBottom) / 2} textAnchor="middle"
              className="fill-muted-foreground text-[7px] font-semibold"
              transform={`rotate(-90, 15, ${(chartTop + chartBottom) / 2})`}>
              Relative concentration
            </text>

            {/* Curves */}
            {biomarkers.map(b => {
              if (!activeBiomarkers.has(b.id)) return null;
              const path = generateCurve(b, maxHours);
              const isHovered = hoveredBiomarker === b.id;
              return (
                <g key={b.id}
                  onMouseEnter={() => setHoveredBiomarker(b.id)}
                  onMouseLeave={() => setHoveredBiomarker(null)}
                  className="cursor-pointer"
                >
                  <path
                    d={path}
                    fill="none"
                    stroke={b.color}
                    strokeWidth={isHovered ? 3 : 2}
                    opacity={hoveredBiomarker && !isHovered ? 0.25 : 1}
                    className="transition-all duration-300"
                  />
                  {/* Peak label */}
                  {(() => {
                    const peakX = chartLeft + (b.peakHour / maxHours) * chartW;
                    const peakPxY = chartBottom - b.peakY * (chartBottom - chartTop);
                    return (
                      <text
                        x={peakX}
                        y={peakPxY - 6}
                        textAnchor="middle"
                        className="text-[7px] font-bold"
                        fill={b.color}
                        opacity={hoveredBiomarker && !isHovered ? 0.2 : 0.9}
                      >
                        {b.label}
                      </text>
                    );
                  })()}
                </g>
              );
            })}

            {/* Key time annotations */}
            <line x1={chartLeft + (1 / maxHours) * chartW} y1={chartTop} x2={chartLeft + (1 / maxHours) * chartW} y2={chartBottom}
              stroke="hsl(var(--destructive))" strokeWidth="1" strokeDasharray="3,3" opacity="0.4" />
            <text x={chartLeft + (1 / maxHours) * chartW} y={chartTop - 2} textAnchor="middle"
              className="fill-destructive text-[6px] font-semibold" opacity="0.7">Antibiotics</text>
          </svg>
        </div>

        {/* Detail panel */}
        <div className="space-y-3">
          {detailBiomarker ? (
            <div className="rounded-lg border border-border bg-background p-4 animate-fade-in" key={detailBiomarker.id}>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: detailBiomarker.color }} />
                <p className="text-sm font-semibold text-foreground">{detailBiomarker.label}</p>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">{detailBiomarker.description}</p>
              <div className="space-y-1.5">
                {[
                  { k: "Normal range", v: detailBiomarker.normalRange },
                  { k: "Peak time", v: detailBiomarker.peakTime },
                  { k: "Half-life", v: detailBiomarker.halfLife },
                ].map(item => (
                  <div key={item.k} className="flex justify-between bg-secondary/30 rounded px-2 py-1">
                    <span className="text-xs font-medium text-foreground">{item.k}</span>
                    <span className="text-xs text-muted-foreground">{item.v}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-lg border border-border bg-background p-4">
              <p className="text-xs text-muted-foreground italic">Hover over a biomarker curve or button for details</p>
            </div>
          )}

          {/* Summary comparison */}
          <div className="rounded-lg border border-border bg-background p-4">
            <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Speed Ranking</p>
            <div className="space-y-1.5">
              {biomarkers.map((b, i) => (
                <div key={b.id} className="flex items-center gap-2">
                  <span className="text-xs font-bold text-foreground w-4">{i + 1}.</span>
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: b.color }} />
                  <span className="text-xs text-foreground font-medium flex-1">{b.label}</span>
                  <span className="text-xs text-muted-foreground">{b.peakTime}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg bg-secondary/30 border border-border p-3">
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">Key principle: </span>
              Trends are more informative than single values. Presepsin rises fastest but is least available. PCT has the strongest evidence for antibiotic stewardship. Lactate clearance guides resuscitation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SepsisBiomarkerKineticsDiagram;

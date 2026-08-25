import { useState, useMemo, useCallback } from "react";
import { DiagramFigure } from "../_shared/DiagramFigure";

interface DrugCSHT {
  name: string;
  color: string;
  /** Returns CSHT in minutes for a given infusion duration in minutes */
  csht: (duration: number) => number;
  notes: string;
}

/**
 * CSHT curves based on published data (Hughes et al 1992, Egan 1993, Kapila 1995).
 * Approximated with fitted functions matching standard FRCA teaching curves.
 */
const drugs: DrugCSHT[] = [
  {
    name: "Remifentanil",
    color: "hsl(150, 60%, 45%)",
    csht: () => 3.5, // ~3–4 min regardless of duration (ester hydrolysis)
    notes: "CSHT ~3–4 min independent of infusion duration. Metabolised by non-specific tissue and plasma esterases (not pseudocholinesterase). No accumulation. Allows rapid, predictable emergence regardless of case length.",
  },
  {
    name: "Propofol",
    color: "hsl(200, 65%, 50%)",
    // Rises from ~5 min (short) to ~40 min (8h), plateaus ~45 min
    csht: (d) => {
      if (d <= 0) return 2;
      return 5 + 38 * (1 - Math.exp(-d / 300)) + 3 * Math.log(1 + d / 30);
    },
    notes: "CSHT increases with duration due to saturation of peripheral compartments (V₂, V₃). ~8 min after 1h, ~20 min after 3h, ~40 min after 8h. Despite increasing CSHT, propofol remains suitable for prolonged TIVA because the absolute values remain clinically manageable.",
  },
  {
    name: "Alfentanil",
    color: "hsl(45, 70%, 50%)",
    // Rises relatively linearly: ~10 min (short) to ~60 min (8h)
    csht: (d) => {
      if (d <= 0) return 5;
      return 8 + 50 * (1 - Math.exp(-d / 250)) + 2 * Math.log(1 + d / 20);
    },
    notes: "Small Vd (0.4–1 L/kg) but moderate hepatic clearance. CSHT rises steadily — ~15 min after 1h, ~55 min after 4h. Less context-sensitive than fentanyl but more so than remifentanil. Rapid onset (1–2 min) due to high unionised fraction and low pKa (6.5).",
  },
  {
    name: "Sufentanil",
    color: "hsl(280, 55%, 55%)",
    // Rises then plateaus ~30–35 min
    csht: (d) => {
      if (d <= 0) return 3;
      return 5 + 28 * (1 - Math.exp(-d / 120));
    },
    notes: "Despite large Vd (2.5 L/kg), high hepatic extraction ratio means rapid clearance. CSHT plateaus at ~30–35 min even after prolonged infusion. More suitable than fentanyl for long cases. 5–10× more potent than fentanyl.",
  },
  {
    name: "Fentanyl",
    color: "hsl(0, 60%, 50%)",
    // Rises steeply and continuously — no plateau within clinical timeframe
    csht: (d) => {
      if (d <= 0) return 5;
      return 10 + 0.85 * Math.sqrt(d) * Math.log(1 + d / 15) + d * 0.15;
    },
    notes: "Large Vd (3–5 L/kg), moderate clearance. Extensive redistribution into fat/muscle. CSHT rises progressively — ~20 min after 1h, ~120 min after 3h, >300 min after 8h. Most context-sensitive of the opioids. Not ideal for prolonged infusion — use for short cases or intermittent bolus.",
  },
];

function CSHTDiagram() {
  const [hoveredDrug, setHoveredDrug] = useState<string | null>(null);
  const [visibleDrugs, setVisibleDrugs] = useState<Set<string>>(
    () => new Set(drugs.map(d => d.name))
  );

  const toggleDrug = useCallback((name: string) => {
    setVisibleDrugs(prev => {
      const next = new Set(prev);
      if (next.has(name)) {
        if (next.size > 1) next.delete(name);
      } else {
        next.add(name);
      }
      return next;
    });
  }, []);

  const svgW = 580;
  const svgH = 310;
  const plotX = 58;
  const plotY = 18;
  const plotW = 490;
  const plotH = 230;

  const maxDuration = 480; // 8 hours in minutes
  const maxCSHT = 350; // minutes

  const xScale = useCallback((d: number) => plotX + (d / maxDuration) * plotW, []);
  const yScale = useCallback((c: number) => plotY + plotH - (Math.min(c, maxCSHT) / maxCSHT) * plotH, []);

  // Generate polylines
  const polylines = useMemo(() => {
    const result: Record<string, string> = {};
    for (const drug of drugs) {
      const pts: string[] = [];
      for (let d = 0; d <= maxDuration; d += 2) {
        const c = drug.csht(d);
        pts.push(`${xScale(d).toFixed(1)},${yScale(c).toFixed(1)}`);
      }
      result[drug.name] = pts.join(" ");
    }
    return result;
  }, [xScale, yScale]);

  // Cursor position for hover info
  const [cursorDuration, setCursorDuration] = useState<number | null>(null);

  const activeDrug = hoveredDrug ? drugs.find(d => d.name === hoveredDrug) : null;

  // Y-axis ticks
  const yTicks = [0, 50, 100, 150, 200, 250, 300, 350];
  // X-axis ticks (hours)
  const xTicks = [0, 60, 120, 180, 240, 300, 360, 420, 480];

  return (
    <DiagramFigure id="csht" title="Context-sensitive half-time of common intravenous anaesthetics" description="Context-sensitive half-time curves for propofol, remifentanil, fentanyl, alfentanil and thiopentone as a function of infusion duration.">
    <div className="border border-border rounded-lg p-4 mb-6">
      <h3 className="text-lg font-serif font-bold text-foreground mb-1">
        Context-Sensitive Half-Time (CSHT)
      </h3>
      <p className="text-xs text-muted-foreground mb-4">
        Time for effect-site concentration to fall by 50% after stopping infusion, plotted against infusion duration. Click drugs to toggle visibility.
      </p>

      {/* Drug toggle buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        {drugs.map(drug => {
          const visible = visibleDrugs.has(drug.name);
          return (
            <button
              key={drug.name}
              onClick={() => toggleDrug(drug.name)}
              onMouseEnter={() => setHoveredDrug(drug.name)}
              onMouseLeave={() => setHoveredDrug(null)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-all ${
                visible
                  ? "bg-opacity-10"
                  : "border-border text-muted-foreground/70"
              }`}
              style={visible ? {
                borderColor: drug.color,
                color: drug.color,
                backgroundColor: `${drug.color}15`,
              } : undefined}
            >
              {drug.name}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col lg:flex-row gap-4 items-start">
        <div className="w-full lg:flex-1 lg:min-w-0">
          <svg viewBox={`0 0 ${svgW} ${svgH}`} width="100%" height="auto" preserveAspectRatio="xMidYMid meet"
            className="w-full h-auto border border-border rounded bg-gradient-to-b from-background to-secondary/10"

            onMouseMove={e => {
              const rect = (e.target as SVGElement).closest("svg")?.getBoundingClientRect();
              if (!rect) return;
              const x = ((e.clientX - rect.left) / rect.width) * svgW;
              const dur = ((x - plotX) / plotW) * maxDuration;
              setCursorDuration(dur >= 0 && dur <= maxDuration ? dur : null);
            }}
            onMouseLeave={() => setCursorDuration(null)}
          >
            {/* Grid */}
            {yTicks.map(v => (
              <g key={v}>
                <line x1={plotX} y1={yScale(v)} x2={plotX + plotW} y2={yScale(v)}
                  stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" opacity="0.15" />
                <text x={plotX - 5} y={yScale(v) + 3} textAnchor="end" fontSize="6"
                  fill="hsl(var(--muted-foreground))" opacity="0.5">{v}</text>
              </g>
            ))}
            {xTicks.map(d => (
              <g key={d}>
                <line x1={xScale(d)} y1={plotY} x2={xScale(d)} y2={plotY + plotH}
                  stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" opacity="0.1" />
                <text x={xScale(d)} y={plotY + plotH + 14} textAnchor="middle" fontSize="6"
                  fill="hsl(var(--muted-foreground))" opacity="0.5">{d / 60}h</text>
              </g>
            ))}

            {/* Axis labels */}
            <text x={plotX + plotW / 2} y={plotY + plotH + 28} textAnchor="middle"
              fontSize="7" fill="hsl(var(--muted-foreground))" opacity="0.5">Infusion Duration</text>
            <text x="14" y={plotY + plotH / 2} textAnchor="middle" fontSize="7"
              fill="hsl(var(--muted-foreground))" opacity="0.5"
              transform={`rotate(-90, 14, ${plotY + plotH / 2})`}>
              CSHT (min)
            </text>

            {/* Drug curves */}
            {drugs.map(drug => {
              if (!visibleDrugs.has(drug.name)) return null;
              const isHovered = hoveredDrug === drug.name;
              return (
                <polyline
                  key={drug.name}
                  points={polylines[drug.name]}
                  fill="none"
                  stroke={drug.color}
                  strokeWidth={isHovered ? 2.8 : 1.8}
                  opacity={hoveredDrug && !isHovered ? 0.25 : 0.85}
                  strokeLinejoin="round"
                  className="transition-all duration-200"
                  onMouseEnter={() => setHoveredDrug(drug.name)}
                  onMouseLeave={() => setHoveredDrug(null)}
                  style={{ cursor: "pointer" }}
                />
              );
            })}

            {/* End-of-curve labels */}
            {drugs.map((drug, idx) => {
              if (!visibleDrugs.has(drug.name)) return null;
              const cshtEnd = drug.csht(maxDuration);
              const y = yScale(Math.min(cshtEnd, maxCSHT));
              // Offset labels to avoid overlap
              const offsets = [0, -2, 4, -6, 8];
              return (
                <text key={drug.name}
                  x={plotX + plotW + 4}
                  y={y + (offsets[idx] || 0)}
                  fontSize="5.5" fontWeight="600"
                  fill={drug.color} opacity={hoveredDrug && hoveredDrug !== drug.name ? 0.3 : 0.8}>
                  {drug.name}
                </text>
              );
            })}

            {/* Cursor crosshair */}
            {cursorDuration !== null && cursorDuration >= 0 && (
              <g>
                <line x1={xScale(cursorDuration)} y1={plotY} x2={xScale(cursorDuration)} y2={plotY + plotH}
                  stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" opacity="0.3" strokeDasharray="3 3" />
                {/* CSHT dots at cursor position */}
                {drugs.map(drug => {
                  if (!visibleDrugs.has(drug.name)) return null;
                  const c = drug.csht(cursorDuration);
                  if (c > maxCSHT) return null;
                  return (
                    <g key={drug.name}>
                      <circle cx={xScale(cursorDuration)} cy={yScale(c)} r="3"
                        fill={drug.color} opacity="0.7" />
                      <text x={xScale(cursorDuration) + 6} y={yScale(c) + 3} fontSize="5"
                        fill={drug.color} opacity="0.7" fontWeight="600">
                        {c.toFixed(0)} min
                      </text>
                    </g>
                  );
                })}
                {/* Duration label */}
                <text x={xScale(cursorDuration)} y={plotY - 4} textAnchor="middle" fontSize="5.5"
                  fill="hsl(var(--muted-foreground))" opacity="0.6">
                  {cursorDuration < 60
                    ? `${cursorDuration.toFixed(0)} min`
                    : `${(cursorDuration / 60).toFixed(1)} h`}
                </text>
              </g>
            )}

            {/* Plot border */}
            <rect x={plotX} y={plotY} width={plotW} height={plotH}
              fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" opacity="0.2" />
          </svg>
        </div>

        {/* Info panel */}
        <div className="flex-1 min-w-0 space-y-3 animate-fade-in" key={hoveredDrug || "default"}>
          {activeDrug ? (
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: activeDrug.color }} />
                {activeDrug.name}
              </p>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{activeDrug.notes}</p>
              <div className="mt-2 pt-2 border-t border-border grid grid-cols-3 gap-2 text-xs">
                {[60, 180, 480].map(d => (
                  <div key={d} className="text-center">
                    <p className="text-muted-foreground text-[10px]">{d / 60}h infusion</p>
                    <p className="font-semibold text-foreground">{activeDrug.csht(d).toFixed(0)} min</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">What is CSHT?</p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                The context-sensitive half-time is the time taken for plasma (or effect-site) concentration to decrease by 50% after stopping an infusion of a given duration. Unlike elimination half-life, CSHT accounts for redistribution and is therefore <strong>dependent on the duration of infusion</strong> — making it clinically more useful for predicting recovery.
              </p>
            </div>
          )}

          <div className="p-3 rounded-lg border border-border bg-secondary/20">
            <p className="font-semibold text-foreground text-xs mb-1.5">CSHT Comparison at Key Timepoints</p>
            <div className="overflow-x-auto">
              <table className="w-full text-[10px]">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-1 text-muted-foreground font-semibold">Drug</th>
                    <th className="text-center py-1 text-muted-foreground font-semibold">1h</th>
                    <th className="text-center py-1 text-muted-foreground font-semibold">3h</th>
                    <th className="text-center py-1 text-muted-foreground font-semibold">8h</th>
                  </tr>
                </thead>
                <tbody>
                  {drugs.map(drug => (
                    <tr key={drug.name} className="border-b border-border/50"
                      onMouseEnter={() => setHoveredDrug(drug.name)}
                      onMouseLeave={() => setHoveredDrug(null)}
                      style={{ cursor: "pointer" }}>
                      <td className="py-1 font-medium" style={{ color: drug.color }}>{drug.name}</td>
                      <td className="text-center text-foreground">{drug.csht(60).toFixed(0)} min</td>
                      <td className="text-center text-foreground">{drug.csht(180).toFixed(0)} min</td>
                      <td className="text-center text-foreground">{drug.csht(480).toFixed(0)} min</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-3 rounded-lg border border-border bg-secondary/20">
            <p className="font-semibold text-foreground text-xs mb-1">Clinical Pearls</p>
            <ul className="text-xs text-muted-foreground space-y-1 leading-relaxed">
              <li>• <strong>Remifentanil</strong> is unique — organ-independent ester metabolism → flat CSHT curve</li>
              <li>• <strong>Fentanyl</strong> accumulates in fat (large Vd) → CSHT rises steeply with duration — avoid prolonged infusion</li>
              <li>• <strong>Sufentanil</strong> CSHT plateaus despite large Vd because of high hepatic extraction ratio</li>
              <li>• <strong>Propofol</strong> CSHT remains manageable (&lt;45 min) even after 8h — supports prolonged TIVA</li>
              <li>• CSHT explains why switching to remifentanil for long cases enables predictable emergence timing</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    </DiagramFigure>
  );
}

export default CSHTDiagram;

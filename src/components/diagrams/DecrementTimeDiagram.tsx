import { useState, useMemo, useCallback } from "react";

interface DecrementCurve {
  label: string;
  /** Returns decrement time (min) for a given infusion duration (min) */
  fn: (duration: number) => number;
  dash?: string;
}

interface DrugDecrement {
  name: string;
  color: string;
  curves: DecrementCurve[];
  notes: string;
}

/**
 * Decrement time curves for propofol and remifentanil.
 * 20%, 50% (CSHT), and 80% decrement times.
 * Based on Shafer & Varvel 1991, Hughes et al 1992, Egan 1993.
 */
const drugs: DrugDecrement[] = [
  {
    name: "Propofol",
    color: "hsl(200, 65%, 50%)",
    curves: [
      {
        label: "20% decrement",
        fn: (d) => d <= 0 ? 1 : 2 + 6 * (1 - Math.exp(-d / 200)) + 0.5 * Math.log(1 + d / 40),
        dash: "6 3",
      },
      {
        label: "50% decrement (CSHT)",
        fn: (d) => d <= 0 ? 2 : 5 + 38 * (1 - Math.exp(-d / 300)) + 3 * Math.log(1 + d / 30),
      },
      {
        label: "80% decrement",
        fn: (d) => d <= 0 ? 8 : 20 + 180 * (1 - Math.exp(-d / 400)) + 15 * Math.log(1 + d / 50),
        dash: "2 2",
      },
    ],
    notes: "Propofol 20% decrement is fast (~5 min) even after long infusions — explains why patients begin to lighten quickly. But the 80% decrement rises steeply (>150 min after 6h) — full elimination takes much longer. Emergence depends on which decrement matters: if target is 20% above wake-up Ce, the 20% decrement predicts it; if MAC-awake requires 80% drop, recovery is much slower.",
  },
  {
    name: "Remifentanil",
    color: "hsl(280, 50%, 55%)",
    curves: [
      {
        label: "20% decrement",
        fn: () => 1.5,
        dash: "6 3",
      },
      {
        label: "50% decrement (CSHT)",
        fn: () => 3.5,
      },
      {
        label: "80% decrement",
        fn: () => 7,
        dash: "2 2",
      },
    ],
    notes: "All three remifentanil decrement times are flat — organ-independent ester hydrolysis means no context sensitivity at any decrement level. This is why remifentanil emergence is uniquely predictable: whether you need a 20% or 80% reduction, the time is essentially constant (~1.5–7 min).",
  },
];

const DecrementTimeDiagram = () => {
  const [hoveredDrug, setHoveredDrug] = useState<string | null>(null);
  const [hoveredDecrement, setHoveredDecrement] = useState<string | null>(null);

  const svgW = 560;
  const svgH = 280;
  const plotX = 55;
  const plotY = 18;
  const plotW = 475;
  const plotH = 210;

  const maxDuration = 480; // 8h
  const maxTime = 250; // max y-axis minutes

  const xScale = useCallback((d: number) => plotX + (d / maxDuration) * plotW, []);
  const yScale = useCallback((t: number) => plotY + plotH - (Math.min(t, maxTime) / maxTime) * plotH, []);

  // Generate polylines
  const polylines = useMemo(() => {
    const result: Record<string, Record<string, string>> = {};
    for (const drug of drugs) {
      result[drug.name] = {};
      for (const curve of drug.curves) {
        const pts: string[] = [];
        for (let d = 0; d <= maxDuration; d += 2) {
          pts.push(`${xScale(d).toFixed(1)},${yScale(curve.fn(d)).toFixed(1)}`);
        }
        result[drug.name][curve.label] = pts.join(" ");
      }
    }
    return result;
  }, [xScale, yScale]);

  const xTicks = [0, 60, 120, 180, 240, 300, 360, 420, 480];
  const yTicks = [0, 50, 100, 150, 200, 250];

  const activeDrug = hoveredDrug ? drugs.find(d => d.name === hoveredDrug) : null;

  return (
    <div className="border border-border rounded-lg p-4 mb-6">
      <h3 className="text-lg font-serif font-bold text-foreground mb-1">
        Decrement Times — 20%, 50%, 80%
      </h3>
      <p className="text-xs text-muted-foreground mb-4">
        Why CSHT (50% decrement) alone doesn't predict emergence: the 80% decrement time for propofol is dramatically longer, while remifentanil remains flat at all levels
      </p>

      <div className="flex flex-col lg:flex-row gap-4 items-start">
        <div className="flex-shrink-0 mx-auto lg:mx-0 overflow-x-auto">
          <svg viewBox={`0 0 ${svgW} ${svgH}`} width={svgW} height={svgH}
            className="border border-border rounded bg-gradient-to-b from-background to-secondary/10 max-w-full">

            {/* Grid */}
            {yTicks.map(v => (
              <g key={v}>
                <line x1={plotX} y1={yScale(v)} x2={plotX + plotW} y2={yScale(v)}
                  stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" opacity="0.15" />
                <text x={plotX - 4} y={yScale(v) + 3} textAnchor="end" fontSize="6"
                  fill="hsl(var(--muted-foreground))" opacity="0.5">{v}</text>
              </g>
            ))}
            {xTicks.map(d => (
              <g key={d}>
                <line x1={xScale(d)} y1={plotY} x2={xScale(d)} y2={plotY + plotH}
                  stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" opacity="0.1" />
                <text x={xScale(d)} y={plotY + plotH + 13} textAnchor="middle" fontSize="6"
                  fill="hsl(var(--muted-foreground))" opacity="0.5">{d / 60}h</text>
              </g>
            ))}

            {/* Axis labels */}
            <text x={plotX + plotW / 2} y={plotY + plotH + 26} textAnchor="middle"
              fontSize="7" fill="hsl(var(--muted-foreground))" opacity="0.5">Infusion Duration</text>
            <text x="12" y={plotY + plotH / 2} textAnchor="middle" fontSize="7"
              fill="hsl(var(--muted-foreground))" opacity="0.5"
              transform={`rotate(-90, 12, ${plotY + plotH / 2})`}>
              Decrement Time (min)
            </text>

            {/* Curves */}
            {drugs.map(drug => (
              drug.curves.map(curve => {
                const isHovered = hoveredDrug === drug.name || hoveredDecrement === curve.label;
                const isDimmed = (hoveredDrug && hoveredDrug !== drug.name) || (hoveredDecrement && hoveredDecrement !== curve.label);
                return (
                  <polyline
                    key={`${drug.name}-${curve.label}`}
                    points={polylines[drug.name][curve.label]}
                    fill="none"
                    stroke={drug.color}
                    strokeWidth={isHovered ? 2.8 : 1.6}
                    strokeDasharray={curve.dash || "none"}
                    opacity={isDimmed ? 0.15 : 0.8}
                    strokeLinejoin="round"
                    className="transition-all duration-200"
                    style={{ cursor: "pointer" }}
                    onMouseEnter={() => { setHoveredDrug(drug.name); setHoveredDecrement(curve.label); }}
                    onMouseLeave={() => { setHoveredDrug(null); setHoveredDecrement(null); }}
                  />
                );
              })
            ))}

            {/* End labels for propofol curves */}
            {drugs[0].curves.map((curve, i) => {
              const val = curve.fn(maxDuration);
              const y = yScale(Math.min(val, maxTime));
              return (
                <text key={i} x={plotX + plotW + 4} y={y + 3} fontSize="5"
                  fill={drugs[0].color} opacity="0.6" fontWeight="500">
                  {Math.round(val)} min
                </text>
              );
            })}

            {/* End labels for remifentanil curves */}
            {drugs[1].curves.map((curve, i) => {
              const val = curve.fn(maxDuration);
              return (
                <text key={i} x={plotX + plotW + 4} y={yScale(val) + 3} fontSize="5"
                  fill={drugs[1].color} opacity="0.6" fontWeight="500">
                  {val.toFixed(0)} min
                </text>
              );
            })}

            {/* Annotation: gap between 50% and 80% for propofol */}
            {(() => {
              const dur = 360; // 6h
              const y50 = yScale(drugs[0].curves[1].fn(dur));
              const y80 = yScale(drugs[0].curves[2].fn(dur));
              return (
                    <g opacity="0.4">
                  <line x1={xScale(dur) + 8} y1={y50} x2={xScale(dur) + 8} y2={y80}
                    stroke={drugs[0].color} strokeWidth="0.75" />
                  <line x1={xScale(dur) + 5} y1={y50} x2={xScale(dur) + 11} y2={y50}
                    stroke={drugs[0].color} strokeWidth="0.5" />
                  <line x1={xScale(dur) + 5} y1={y80} x2={xScale(dur) + 11} y2={y80}
                    stroke={drugs[0].color} strokeWidth="0.5" />
                  <text x={xScale(dur) + 14} y={(y50 + y80) / 2 + 2} fontSize="5"
                    fill={drugs[0].color} fontWeight="600">
                    ↕ {Math.round(drugs[0].curves[2].fn(dur) - drugs[0].curves[1].fn(dur))} min gap
                  </text>
                </g>
  );
            })()}

            {/* Legend */}
            <g transform={`translate(${plotX + 8}, ${plotY + 4})`}>
              <rect x="-4" y="-4" width="130" height="68" rx="4"
                fill="hsl(var(--background))" fillOpacity="0.85"
                stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" opacity="0.4" />
              {drugs.map((drug, di) => (
                <g key={drug.name} transform={`translate(0, ${di * 32})`}
                  onMouseEnter={() => setHoveredDrug(drug.name)}
                  onMouseLeave={() => setHoveredDrug(null)}
                  style={{ cursor: "pointer" }}>
                  <text x="0" y="8" fontSize="6" fill={drug.color} fontWeight="700" opacity="0.8">{drug.name}</text>
                  {drug.curves.map((curve, ci) => (
                    <g key={ci}>
                      <line x1="0" y1={16 + ci * 8} x2="16" y2={16 + ci * 8}
                        stroke={drug.color} strokeWidth="1.5" strokeDasharray={curve.dash || "none"} opacity="0.7" />
                      <text x="20" y={18 + ci * 8} fontSize="5" fill="hsl(var(--foreground))" opacity="0.6">
                        {curve.label}
                      </text>
                    </g>
                  ))}
                </g>
              ))}
            </g>

            {/* Plot border */}
            <rect x={plotX} y={plotY} width={plotW} height={plotH}
              fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" opacity="0.2" />
          </svg>
        </div>

        {/* Info panel */}
        <div className="flex-1 min-w-0 space-y-3 animate-fade-in" key={hoveredDrug || "default"}>
          {activeDrug ? (
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm" style={{ color: activeDrug.color }}>
                {activeDrug.name}
              </p>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{activeDrug.notes}</p>
              <div className="mt-2 pt-2 border-t border-border">
                <p className="text-[10px] text-muted-foreground font-semibold mb-1">After 3h infusion:</p>
                <div className="grid grid-cols-3 gap-2 text-xs text-center">
                  {activeDrug.curves.map(c => (
                    <div key={c.label}>
                      <p className="text-muted-foreground text-[10px]">{c.label.split(" ")[0]}</p>
                      <p className="font-semibold text-foreground">{c.fn(180).toFixed(0)} min</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Why Decrement Times Matter</p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                The CSHT (50% decrement) only tells you how long for concentration to halve. But clinical wake-up depends on the <strong>ratio of maintenance Ce to wake-up Ce</strong>. If you're running propofol at Ce 4 µg/mL and MAC-awake is ~1.5 µg/mL, you need roughly a 60% decrease — closer to the 80% decrement time than the CSHT.
              </p>
            </div>
          )}

          {/* Comparison table */}
          <div className="p-3 rounded-lg border border-border bg-secondary/20">
            <p className="font-semibold text-foreground text-xs mb-1.5">Decrement Time Comparison (3h infusion)</p>
            <div className="overflow-x-auto">
              <table className="w-full text-[10px]">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-1 text-muted-foreground font-semibold">Decrement</th>
                    <th className="text-center py-1 font-semibold" style={{ color: drugs[0].color }}>Propofol</th>
                    <th className="text-center py-1 font-semibold" style={{ color: drugs[1].color }}>Remifentanil</th>
                    <th className="text-left py-1 text-muted-foreground font-semibold">Clinical relevance</th>
                  </tr>
                </thead>
                <tbody>
                  {[0, 1, 2].map(i => (
                    <tr key={i} className="border-b border-border/50">
                      <td className="py-1 text-muted-foreground">{drugs[0].curves[i].label.split(" ")[0]}</td>
                      <td className="text-center text-foreground">{drugs[0].curves[i].fn(180).toFixed(0)} min</td>
                      <td className="text-center text-foreground">{drugs[1].curves[i].fn(180).toFixed(0)} min</td>
                      <td className="py-1 text-muted-foreground">
                        {i === 0 ? "Initial lightening" : i === 1 ? "Traditional CSHT" : "Full emergence / extubation"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-3 rounded-lg border border-border bg-secondary/20">
            <p className="font-semibold text-foreground text-xs mb-1">Clinical Pearls</p>
            <ul className="text-xs text-muted-foreground space-y-1 leading-relaxed">
              <li>• <strong>CSHT underestimates</strong> emergence time for propofol — the 80% decrement is 3–5× longer</li>
              <li>• Remifentanil is uniquely predictable: all decrement times are flat → ideal for planning emergence</li>
              <li>• For propofol TIVA: plan infusion stop time based on the decrement needed, not just CSHT</li>
              <li>• Combining propofol + remifentanil: stop remi at end of surgery, but stop propofol earlier (based on 60–80% decrement)</li>
              <li>• BIS monitoring helps confirm actual emergence timing regardless of PK predictions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecrementTimeDiagram;

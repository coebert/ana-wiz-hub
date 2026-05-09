import { useState, useMemo, useCallback } from "react";

type Model = "marsh" | "schnider";

interface SimParams {
  targetCe: number; // µg/mL
}

/**
 * Simulate simplified 3-compartment TCI pharmacokinetics.
 * Returns arrays of {t, cp, ce} over 15 minutes (900s) at 1s resolution.
 * Uses first-order approximation with overshoot behaviour.
 */
function simulateTCI(
  model: Model,
  params: SimParams,
  _weight: number = 70,
  _age: number = 50
): { t: number; cp: number; ce: number }[] {
  const { targetCe } = params;

  // Simplified rate constants (min⁻¹) derived from published models
  // Marsh: V1 = 0.228 L/kg × weight; ke0 = 0.26 min⁻¹
  // Schnider: V1 = 4.27 L (fixed); ke0 = 0.456 min⁻¹
  const ke0 = model === "marsh" ? 0.26 : 0.456; // min⁻¹
  const k10 = model === "marsh" ? 0.119 : 0.443;
  const k12 = model === "marsh" ? 0.112 : 0.302;
  const k21 = model === "marsh" ? 0.055 : 0.196;

  // TCI controller: overshoot Cp above targetCe to drive Ce up faster
  // Marsh (plasma-targeting with Cp=Ce option) vs Schnider (effect-site targeting)
  // The overshoot is more pronounced with lower ke0 (Marsh)
  const overshootRatio = model === "marsh" ? 2.2 : 1.5;

  const dt = 1; // seconds
  const totalTime = 900; // 15 minutes
  const points: { t: number; cp: number; ce: number }[] = [];

  let cp = 0;
  let ce = 0;
  let c2 = 0; // peripheral compartment
  let infusionRate = 0;

  for (let s = 0; s <= totalTime; s++) {
    const tMin = s / 60;

    // Simple TCI controller logic
    const ceError = targetCe - ce;

    if (ceError > 0.05) {
      // Need to increase: overshoot plasma concentration
      const targetCp = targetCe + ceError * overshootRatio;
      const cpError = targetCp - cp;
      infusionRate = Math.max(0, cpError * 3.5); // proportional control
    } else if (ceError < -0.05) {
      // Overshoot phase: stop infusion, let redistribution bring Cp down
      infusionRate = 0;
    } else {
      // Maintenance: steady-state infusion to replace elimination
      infusionRate = Math.max(0, targetCe * k10 * 0.5);
    }

    // Update concentrations (Euler integration, per-second)
    const dtMin = dt / 60;
    cp += (infusionRate - cp * (k10 + k12) + c2 * k21) * dtMin;
    c2 += (cp * k12 - c2 * k21) * dtMin;
    ce += ke0 * (cp - ce) * dtMin;

    cp = Math.max(0, cp);
    ce = Math.max(0, ce);
    c2 = Math.max(0, c2);

    if (s % 3 === 0) { // sample every 3s for performance
      points.push({ t: tMin, cp, ce });
    }
  }

  return points;
}

function buildPolyline(
  points: { t: number; val: number }[],
  xScale: (t: number) => number,
  yScale: (v: number) => number
): string {
  return points.map(p => `${xScale(p.t).toFixed(1)},${yScale(p.val).toFixed(1)}`).join(" ");
}

const TCISimulatorDiagram = () => {
  const [targetCe, setTargetCe] = useState(4);
  const [showMarsh, setShowMarsh] = useState(true);
  const [showSchnider, setShowSchnider] = useState(true);

  const params: SimParams = { targetCe };

  const marshData = useMemo(() => simulateTCI("marsh", params), [targetCe]);
  const schniderData = useMemo(() => simulateTCI("schnider", params), [targetCe]);

  // SVG dimensions
  const svgW = 580;
  const svgH = 300;
  const plotX = 55;
  const plotY = 20;
  const plotW = 490;
  const plotH = 220;

  const maxTime = 15; // minutes
  const maxConc = Math.max(
    targetCe * 3.5,
    ...marshData.map(d => d.cp),
    ...schniderData.map(d => d.cp),
    8
  );

  const xScale = useCallback((t: number) => plotX + (t / maxTime) * plotW, [maxTime]);
  const yScale = useCallback((v: number) => plotY + plotH - (v / maxConc) * plotH, [maxConc]);

  // Build polylines
  const marshCpLine = useMemo(
    () => buildPolyline(marshData.map(d => ({ t: d.t, val: d.cp })), xScale, yScale),
    [marshData, xScale, yScale]
  );
  const marshCeLine = useMemo(
    () => buildPolyline(marshData.map(d => ({ t: d.t, val: d.ce })), xScale, yScale),
    [marshData, xScale, yScale]
  );
  const schniderCpLine = useMemo(
    () => buildPolyline(schniderData.map(d => ({ t: d.t, val: d.cp })), xScale, yScale),
    [schniderData, xScale, yScale]
  );
  const schniderCeLine = useMemo(
    () => buildPolyline(schniderData.map(d => ({ t: d.t, val: d.ce })), xScale, yScale),
    [schniderData, xScale, yScale]
  );

  // Peak Cp values
  const marshPeakCp = Math.max(...marshData.map(d => d.cp));
  const schniderPeakCp = Math.max(...schniderData.map(d => d.cp));

  // Time to reach target Ce (within 5%)
  const timeToTarget = (data: { t: number; ce: number }[]) => {
    const thresh = targetCe * 0.95;
    const pt = data.find(d => d.ce >= thresh);
    return pt ? pt.t.toFixed(1) : ">15";
  };
  const marshTTCe = timeToTarget(marshData);
  const schniderTTCe = timeToTarget(schniderData);

  const marshColor = "hsl(200, 65%, 50%)";
  const schniderColor = "hsl(25, 70%, 55%)";
  const targetColor = "hsl(150, 55%, 45%)";

  return (
    <div className="border border-border rounded-lg p-4 mb-6">
      <h3 className="text-lg font-serif font-bold text-foreground mb-1">
        TCI Simulator — Marsh vs Schnider Overshoot
      </h3>
      <p className="text-xs text-muted-foreground mb-4">
        Adjust target effect-site concentration (Ce) and compare plasma overshoot behaviour between the two propofol models
      </p>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <label className="text-xs text-muted-foreground font-medium whitespace-nowrap">
            Target Ce (µg/mL):
          </label>
          <input
            type="range" min={1} max={8} step={0.5} value={targetCe}
            onChange={e => setTargetCe(Number(e.target.value))}
            className="w-32 h-2 rounded-full appearance-none cursor-pointer"
            style={{ background: `linear-gradient(to right, hsl(150,50%,45%), hsl(35,65%,50%), hsl(0,55%,50%))` }}
          />
          <span className="text-sm font-semibold text-foreground w-8">{targetCe}</span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setShowMarsh(!showMarsh)}
            className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-all ${
              showMarsh
                ? "border-[hsl(200,65%,50%)] text-[hsl(200,65%,50%)] bg-[hsl(200,65%,50%)]/10"
                : "border-border text-muted-foreground/40"
            }`}
          >
            Marsh
          </button>
          <button
            onClick={() => setShowSchnider(!showSchnider)}
            className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-all ${
              showSchnider
                ? "border-[hsl(25,70%,55%)] text-[hsl(25,70%,55%)] bg-[hsl(25,70%,55%)]/10"
                : "border-border text-muted-foreground/40"
            }`}
          >
            Schnider
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 items-start">
        {/* SVG Chart */}
        <div className="flex-shrink-0 mx-auto lg:mx-0 overflow-x-auto">
          <svg viewBox={`0 0 ${svgW} ${svgH}`} width={svgW} height={svgH}
            className="border border-border rounded bg-gradient-to-b from-background to-secondary/10 max-w-full">

            {/* Grid */}
            {Array.from({ length: 6 }, (_, i) => {
              const v = (maxConc / 5) * i;
              const y = yScale(v);
              return (
                <g key={i}>
                  <line x1={plotX} y1={y} x2={plotX + plotW} y2={y}
                    stroke="hsl(var(--muted-foreground))" strokeWidth="0.3" opacity="0.15" />
                  <text x={plotX - 4} y={y + 3} textAnchor="end" fontSize="6"
                    fill="hsl(var(--muted-foreground))" opacity="0.5">
                    {v.toFixed(1)}
                  </text>
                </g>
              );
            })}
            {Array.from({ length: 16 }, (_, i) => (
              <g key={i}>
                <line x1={xScale(i)} y1={plotY} x2={xScale(i)} y2={plotY + plotH}
                  stroke="hsl(var(--muted-foreground))" strokeWidth="0.2" opacity="0.1" />
                {i % 3 === 0 && (
                  <text x={xScale(i)} y={plotY + plotH + 12} textAnchor="middle" fontSize="6"
                    fill="hsl(var(--muted-foreground))" opacity="0.5">{i}</text>
                )}
              </g>
            ))}

            {/* Axis labels */}
            <text x={plotX + plotW / 2} y={plotY + plotH + 26} textAnchor="middle"
              fontSize="7" fill="hsl(var(--muted-foreground))" opacity="0.5">Time (min)</text>
            <text x="14" y={plotY + plotH / 2} textAnchor="middle" fontSize="7"
              fill="hsl(var(--muted-foreground))" opacity="0.5"
              transform={`rotate(-90, 14, ${plotY + plotH / 2})`}>
              Concentration (µg/mL)
            </text>

            {/* Target Ce line */}
            <line x1={plotX} y1={yScale(targetCe)} x2={plotX + plotW} y2={yScale(targetCe)}
              stroke={targetColor} strokeWidth="1" strokeDasharray="6 3" opacity="0.6" />
            <text x={plotX + plotW + 3} y={yScale(targetCe) + 3} fontSize="6"
              fill={targetColor} fontWeight="600" opacity="0.8">
              Ce target
            </text>
            <text x={plotX + plotW + 3} y={yScale(targetCe) + 11} fontSize="5.5"
              fill={targetColor} opacity="0.5">
              {targetCe} µg/mL
            </text>

            {/* Marsh traces */}
            {showMarsh && (
              <g>
                <polyline points={marshCpLine} fill="none" stroke={marshColor}
                  strokeWidth="1.8" opacity="0.7" strokeLinejoin="round" />
                <polyline points={marshCeLine} fill="none" stroke={marshColor}
                  strokeWidth="1.8" opacity="0.9" strokeDasharray="5 2" strokeLinejoin="round" />
                {/* Peak Cp annotation */}
                {marshData.length > 0 && (() => {
                  const peakIdx = marshData.findIndex(d => d.cp === marshPeakCp);
                  const peak = marshData[peakIdx];
                  if (!peak) return null;
                  return (
                    <g>
                      <circle cx={xScale(peak.t)} cy={yScale(peak.cp)} r="3"
                        fill={marshColor} opacity="0.5" />
                      <text x={xScale(peak.t) + 5} y={yScale(peak.cp) - 5} fontSize="5.5"
                        fill={marshColor} opacity="0.7">
                        Cp peak {marshPeakCp.toFixed(1)}
                      </text>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* Schnider traces */}
            {showSchnider && (
              <g>
                <polyline points={schniderCpLine} fill="none" stroke={schniderColor}
                  strokeWidth="1.8" opacity="0.7" strokeLinejoin="round" />
                <polyline points={schniderCeLine} fill="none" stroke={schniderColor}
                  strokeWidth="1.8" opacity="0.9" strokeDasharray="5 2" strokeLinejoin="round" />
                {/* Peak Cp annotation */}
                {schniderData.length > 0 && (() => {
                  const peakIdx = schniderData.findIndex(d => d.cp === schniderPeakCp);
                  const peak = schniderData[peakIdx];
                  if (!peak) return null;
                  return (
                    <g>
                      <circle cx={xScale(peak.t)} cy={yScale(peak.cp)} r="3"
                        fill={schniderColor} opacity="0.5" />
                      <text x={xScale(peak.t) + 5} y={yScale(peak.cp) + 10} fontSize="5.5"
                        fill={schniderColor} opacity="0.7">
                        Cp peak {schniderPeakCp.toFixed(1)}
                      </text>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* Legend */}
            <g transform={`translate(${plotX + 8}, ${plotY + 6})`}>
              <rect x="-4" y="-6" width="105" height="52" rx="4"
                fill="hsl(var(--background))" fillOpacity="0.8"
                stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" opacity="0.5" />
              <line x1="0" y1="3" x2="18" y2="3" stroke={marshColor} strokeWidth="2" opacity="0.7" />
              <text x="22" y="5.5" fontSize="5.5" fill="hsl(var(--foreground))" opacity="0.7">Marsh Cp (solid)</text>
              <line x1="0" y1="13" x2="18" y2="13" stroke={marshColor} strokeWidth="2" strokeDasharray="4 2" opacity="0.9" />
              <text x="22" y="15.5" fontSize="5.5" fill="hsl(var(--foreground))" opacity="0.7">Marsh Ce (dashed)</text>
              <line x1="0" y1="23" x2="18" y2="23" stroke={schniderColor} strokeWidth="2" opacity="0.7" />
              <text x="22" y="25.5" fontSize="5.5" fill="hsl(var(--foreground))" opacity="0.7">Schnider Cp (solid)</text>
              <line x1="0" y1="33" x2="18" y2="33" stroke={schniderColor} strokeWidth="2" strokeDasharray="4 2" opacity="0.9" />
              <text x="22" y="35.5" fontSize="5.5" fill="hsl(var(--foreground))" opacity="0.7">Schnider Ce (dashed)</text>
              <line x1="0" y1="43" x2="18" y2="43" stroke={targetColor} strokeWidth="1" strokeDasharray="4 2" opacity="0.6" />
              <text x="22" y="45.5" fontSize="5.5" fill="hsl(var(--foreground))" opacity="0.7">Target Ce</text>
            </g>

            {/* Overshoot annotation area */}
            {showMarsh && marshPeakCp > targetCe * 1.2 && (
              <g>
                <line x1={xScale(0.3)} y1={yScale(targetCe)} x2={xScale(0.3)} y2={yScale(marshPeakCp)}
                  stroke={marshColor} strokeWidth="0.8" opacity="0.3" strokeDasharray="2 2" />
                <text x={xScale(0.3) + 4} y={yScale((targetCe + marshPeakCp) / 2) + 2} fontSize="5"
                  fill={marshColor} opacity="0.5">
                  ↕ overshoot
                </text>
              </g>
            )}
          </svg>
        </div>

        {/* Info panel */}
        <div className="flex-1 min-w-0 space-y-3 animate-fade-in" key={targetCe}>
          {/* Comparison table */}
          <div className="p-3 rounded-lg border border-border">
            <p className="font-semibold text-foreground text-sm mb-2">Model Comparison at Ce {targetCe} µg/mL</p>
            <div className="grid grid-cols-3 gap-1 text-xs">
              <div className="text-muted-foreground font-medium" />
              <div className="text-center font-semibold" style={{ color: marshColor }}>Marsh</div>
              <div className="text-center font-semibold" style={{ color: schniderColor }}>Schnider</div>

              <div className="text-muted-foreground">Peak Cp</div>
              <div className="text-center text-foreground">{marshPeakCp.toFixed(1)} µg/mL</div>
              <div className="text-center text-foreground">{schniderPeakCp.toFixed(1)} µg/mL</div>

              <div className="text-muted-foreground">Overshoot</div>
              <div className="text-center text-foreground">{((marshPeakCp / targetCe - 1) * 100).toFixed(0)}%</div>
              <div className="text-center text-foreground">{((schniderPeakCp / targetCe - 1) * 100).toFixed(0)}%</div>

              <div className="text-muted-foreground">Time to Ce</div>
              <div className="text-center text-foreground">{marshTTCe} min</div>
              <div className="text-center text-foreground">{schniderTTCe} min</div>

              <div className="text-muted-foreground">ke0</div>
              <div className="text-center text-foreground">0.26 min⁻¹</div>
              <div className="text-center text-foreground">0.456 min⁻¹</div>

              <div className="text-muted-foreground">V₁</div>
              <div className="text-center text-foreground">0.228 L/kg</div>
              <div className="text-center text-foreground">4.27 L (fixed)</div>
            </div>
          </div>

          <div className="p-3 rounded-lg border border-border">
            <p className="font-semibold text-foreground text-sm">Marsh Model</p>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              Weight-based V₁ (0.228 L/kg). Originally plasma-targeting — ke0 added retrospectively. <strong>Lower ke0 (0.26 min⁻¹)</strong> means slower plasma-effect equilibration, requiring greater Cp overshoot to achieve target Ce quickly. The modified Marsh with effect-site targeting produces a large initial plasma peak that may cause transient hypotension.
            </p>
          </div>

          <div className="p-3 rounded-lg border border-border">
            <p className="font-semibold text-foreground text-sm">Schnider Model</p>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              Fixed V₁ (4.27 L), covariates = age, weight, lean body mass, height. <strong>Higher ke0 (0.456 min⁻¹)</strong> → faster equilibration → less Cp overshoot needed. Effect-site targeting is integral to the model. Smaller V₁ means the initial bolus is smaller, with less haemodynamic disturbance. Better suited for elderly patients.
            </p>
          </div>

          <div className="p-3 rounded-lg border border-border bg-secondary/20">
            <p className="font-semibold text-foreground text-xs mb-1">Clinical Pearls</p>
            <ul className="text-xs text-muted-foreground space-y-1 leading-relaxed">
              <li>• <strong>Higher target Ce</strong> → proportionally greater Cp overshoot → more haemodynamic effect</li>
              <li>• Marsh: bolus dose ∝ weight — may overdose obese, underdose thin patients</li>
              <li>• Schnider: age-adjusted — automatically reduces bolus in elderly</li>
              <li>• Neither model validated for morbid obesity (BMI &gt;35) or children</li>
              <li>• Effect-site targeting is now standard — always confirm pump mode</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TCISimulatorDiagram;

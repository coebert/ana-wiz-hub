import { STARLING_STEADY, STARLING_BARRIER, STARLING_ANP, STARLING_FLUID } from "@/lib/physics-fluid-teaching";
import { InlineRef } from "@/components/references/InlineRef";
import { useState, useMemo, useCallback } from "react";
import { DiagramFigure } from "../_shared/DiagramFigure";

/**
 * Interactive Starling Forces diagram showing the balance of hydrostatic
 * and oncotic pressures across the capillary, with glycocalyx layer.
 */
const StarlingForcesDiagram = () => {
  const [selectedForce, setSelectedForce] = useState<string | null>(null);

  const forces = useMemo(() => [
    {
      id: "Pc",
      label: "Capillary Hydrostatic Pressure (Pc)",
      artValue: "32 mmHg (illustrative)",
      venValue: "20 mmHg (illustrative)",
      direction: "out",
      color: "hsl(0, 65%, 55%)",
      desc: "The blood pressure inside the capillary pushing fluid OUT through the vessel wall into the interstitium. Higher at the arteriolar end (~32 mmHg) and lower at the venular end (~20 mmHg) — values used in the revised Starling–Levick model in which slight filtration usually prevails at steady state in most continuous systemic microvessels. Increased in heart failure, venous obstruction, and fluid overload.",
    },
    {
      id: "Pi",
      label: "Interstitial Hydrostatic Pressure (Pi)",
      artValue: "−2 mmHg",
      venValue: "−2 mmHg",
      direction: "in",
      color: "hsl(200, 65%, 50%)",
      desc: "Pressure in the interstitial space, normally slightly sub-atmospheric (−2 mmHg) due to lymphatic drainage. Being sub-atmospheric it adds slightly to the outward hydrostatic gradient (Pc − Pi); as it rises it opposes filtration; net exchange depends on all terms and tissue context. Becomes positive in oedema, reducing further filtration (safety factor).",
    },
    {
      id: "πc",
      label: "Capillary Oncotic Pressure (πc)",
      artValue: "25 mmHg",
      venValue: "25 mmHg",
      direction: "in",
      color: "hsl(140, 55%, 45%)",
      desc: "Osmotic pressure exerted by plasma proteins (primarily albumin, ~60%) drawing fluid INTO the capillary. Relatively constant along the capillary (~25 mmHg). Decreased in hypoalbuminaemia (liver failure, nephrotic syndrome, burns, sepsis) → oedema.",
    },
    {
      id: "πsg",
      label: "Sub-glycocalyx Oncotic Pressure (πsg)",
      artValue: "Low, flow-dependent",
      venValue: "Low, flow-dependent",
      direction: "out",
      color: "hsl(35, 70%, 55%)",
      desc: STARLING_BARRIER,
    },

  ], []);

  const activeForce = selectedForce ? forces.find(f => f.id === selectedForce) : null;

  // SVG dimensions
  const w = 560;
  const h = 320;
  const capY = 120;
  const capH = 50;

  const drawArrow = useCallback((x: number, y1: number, y2: number, color: string, isActive: boolean) => {
    const headSize = isActive ? 7 : 5;
    const dir = y2 > y1 ? 1 : -1;
    return (
      <g>
        <line x1={x} y1={y1} x2={x} y2={y2}
          stroke={color} strokeWidth={isActive ? 2.5 : 1.5} opacity={isActive ? 1 : 0.6} />
        <polygon
          points={`${x},${y2} ${x - headSize},${y2 - dir * headSize} ${x + headSize},${y2 - dir * headSize}`}
          fill={color} opacity={isActive ? 1 : 0.6} />
      </g>
    );
  }, []);

  return (
    <DiagramFigure
      id="starling-forces-diagram"
      title="Starling forces"
      description="Interactive Starling Forces diagram showing the balance of hydrostatic and oncotic pressures across the capillary, with glycocalyx layer."
    >
                  <div className="border border-border rounded-lg p-4 mb-6">
        <h3 className="text-lg font-serif font-bold text-foreground mb-1">Starling Forces — Revised Model</h3>
        <p className="text-xs text-muted-foreground mb-4">
          Click each force to explore. The revised Starling-Levick equation accounts for the glycocalyx layer and sub-glycocalyx oncotic pressure.
        </p>
  
        <div className="flex flex-col lg:flex-row gap-4 items-start">
          <div className="w-full lg:flex-1 min-w-0 mx-auto lg:mx-0">
            <svg viewBox={`0 0 ${w} ${h}`}
              className="w-full h-auto max-w-[560px] border border-border rounded bg-gradient-to-b from-background to-secondary/10">
  
              {/* Interstitial space background */}
              <rect x="40" y={capY + capH + 8} width={w - 80} height="100" rx="8"
                fill="hsl(35, 30%, 50%)" fillOpacity="0.06" stroke="hsl(35, 40%, 50%)" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.4" />
              <text x={w / 2} y={capY + capH + 65} textAnchor="middle" fontSize="7"
                fill="hsl(var(--muted-foreground))" opacity="0.4" fontWeight="500">INTERSTITIAL SPACE</text>
  
              {/* Capillary vessel */}
              <rect x="60" y={capY} width={w - 120} height={capH} rx="25"
                fill="hsl(0, 50%, 55%)" fillOpacity="0.08"
                stroke="hsl(0, 50%, 55%)" strokeWidth="1.5" opacity="0.5" />
  
              {/* Glycocalyx layer */}
              <rect x="60" y={capY + capH - 6} width={w - 120} height="8" rx="2"
                fill="hsl(280, 50%, 60%)" fillOpacity="0.15"
                stroke="hsl(280, 50%, 60%)" strokeWidth="0.5" strokeDasharray="2 1" opacity="0.6" />
              <text x={w - 75} y={capY + capH + 6} fontSize="5" fill="hsl(280, 50%, 60%)" opacity="0.7" fontWeight="600">GLYCOCALYX</text>
  
              {/* Arteriolar end label */}
              <text x="80" y={capY - 8} fontSize="7" fill="hsl(0, 60%, 55%)" fontWeight="600" opacity="0.6">Arteriolar end</text>
              {/* Venular end label */}
              <text x={w - 155} y={capY - 8} fontSize="7" fill="hsl(220, 50%, 55%)" fontWeight="600" opacity="0.6">Venular end</text>
  
              {/* Blood flow arrow */}
              <line x1="80" y1={capY + capH / 2} x2={w - 80} y2={capY + capH / 2}
                stroke="hsl(0, 50%, 50%)" strokeWidth="0.75" opacity="0.2" markerEnd="url(#flowArrow)" />
              <defs>
                <marker id="flowArrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(0, 50%, 50%)" opacity="0.3" />
                </marker>
              </defs>
              <text x={w / 2} y={capY + capH / 2 - 4} textAnchor="middle" fontSize="6"
                fill="hsl(0, 50%, 50%)" opacity="0.3">Blood flow →</text>
  
              {/* Pc arrows (outward) — arteriolar end */}
              <g style={{ cursor: "pointer" }} onClick={() => setSelectedForce(selectedForce === "Pc" ? null : "Pc")}>
                {drawArrow(130, capY + capH, capY + capH + 50, forces[0].color, selectedForce === "Pc")}
                <text x="130" y={capY + capH + 62} textAnchor="middle" fontSize="7"
                  fill={forces[0].color} fontWeight={selectedForce === "Pc" ? "700" : "500"}>
                  Pc = 32
                </text>
              </g>
              {/* Pc — venular end */}
              <g style={{ cursor: "pointer" }} onClick={() => setSelectedForce(selectedForce === "Pc" ? null : "Pc")}>
                {drawArrow(410, capY + capH, capY + capH + 30, forces[0].color, selectedForce === "Pc")}
                <text x="410" y={capY + capH + 42} textAnchor="middle" fontSize="7"
                  fill={forces[0].color} fontWeight={selectedForce === "Pc" ? "700" : "500"}>
                  Pc = 20
                </text>
              </g>
  
              {/* Pi arrows (outward — negative Pi acts outward) */}
              <g style={{ cursor: "pointer" }} onClick={() => setSelectedForce(selectedForce === "Pi" ? null : "Pi")}>
                {drawArrow(270, capY + capH + 45, capY + capH + 12, forces[1].color, selectedForce === "Pi")}
                <text x="270" y={capY + capH + 58} textAnchor="middle" fontSize="7"
                  fill={forces[1].color} fontWeight={selectedForce === "Pi" ? "700" : "500"}>
                  Pi = −2
                </text>
              </g>
  
              {/* πc arrows (inward — into capillary) */}
              <g style={{ cursor: "pointer" }} onClick={() => setSelectedForce(selectedForce === "πc" ? null : "πc")}>
                {drawArrow(200, capY + capH + 40, capY + capH + 4, forces[2].color, selectedForce === "πc")}
                <text x="200" y={capY + capH + 52} textAnchor="middle" fontSize="7"
                  fill={forces[2].color} fontWeight={selectedForce === "πc" ? "700" : "500"}>
                  πc = 25
                </text>
                {drawArrow(360, capY + capH + 40, capY + capH + 4, forces[2].color, selectedForce === "πc")}
                <text x="360" y={capY + capH + 52} textAnchor="middle" fontSize="7"
                  fill={forces[2].color} fontWeight={selectedForce === "πc" ? "700" : "500"}>
                  πc = 25
                </text>
              </g>
  
              {/* πsg arrow — sub-glycocalyx oncotic pressure (revised Starling-Levick model) */}
              <g style={{ cursor: "pointer" }} onClick={() => setSelectedForce(selectedForce === "πsg" ? null : "πsg")}>
                {drawArrow(470, capY + capH + 6, capY + capH + 20, forces[3].color, selectedForce === "πsg")}
                <text x="470" y={capY + capH + 32} textAnchor="middle" fontSize="7"
                  fill={forces[3].color} fontWeight={selectedForce === "πsg" ? "700" : "500"}>

                  πsg: low / variable
                </text>
                <text x="470" y={capY + capH + 42} textAnchor="middle" fontSize="5"
                  fill="hsl(var(--muted-foreground))">
                  (sub-glycocalyx)
                </text>
              </g>
  
              {/* Lymphatic drainage */}
              <g opacity="0.4">
                <rect x={w - 85} y={capY + capH + 70} width="50" height="18" rx="4"
                  fill="hsl(140, 30%, 50%)" fillOpacity="0.1" stroke="hsl(140, 30%, 50%)" strokeWidth="0.5" />
                <text x={w - 60} y={capY + capH + 82} textAnchor="middle" fontSize="5"
                  fill="hsl(140, 30%, 50%)" fontWeight="500">Lymphatic</text>
              </g>
  
              {/* Net filtration equation */}
              <rect x="60" y={h - 48} width={w - 120} height="38" rx="6"
                fill="hsl(var(--background))" fillOpacity="0.9"
                stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" opacity="0.3" />
              <text x={w / 2} y={h - 32} textAnchor="middle" fontSize="7.5"
                fill="hsl(var(--foreground))" fontWeight="600">
                Jv = Kf × [(Pc − Pi) − σ(πc − πsg)]
              </text>
              <text x={w / 2} y={h - 20} textAnchor="middle" fontSize="5.5"
                fill="hsl(var(--muted-foreground))">
                Revised Starling-Levick equation — πsg = sub-glycocalyx oncotic pressure (flow-dependent)
              </text>
  
              {/* Legend squares */}
              <g transform="translate(65, 20)">
                {forces.map((f, i) => (
                  <g key={f.id} transform={`translate(${i * 125}, 0)`}
                    style={{ cursor: "pointer" }}
                    onClick={() => setSelectedForce(selectedForce === f.id ? null : f.id)}>
                    <rect x="0" y="0" width="8" height="8" rx="1" fill={f.color}
                      opacity={selectedForce === f.id ? 1 : 0.5} />
                    <text x="12" y="7" fontSize="6" fill="hsl(var(--foreground))"
                      fontWeight={selectedForce === f.id ? "700" : "400"} opacity="0.7">
                      {f.id} — {f.direction === "out" ? "promotes filtration" : "promotes absorption"}
                    </text>
                  </g>
                ))}
              </g>
            </svg>
          </div>
  
          {/* Info panel */}
          <div className="w-full lg:w-[280px] lg:shrink-0 space-y-3">
            {activeForce ? (
              <div className="p-3 rounded-lg border border-border animate-fade-in" key={activeForce.id}>
                <p className="font-semibold text-foreground text-sm" style={{ color: activeForce.color }}>
                  {activeForce.label}
                </p>
                <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{activeForce.desc}</p>
                <div className="mt-2 pt-2 border-t border-border grid grid-cols-2 gap-2 text-xs text-center">
                  <div>
                    <p className="text-muted-foreground text-[10px]">Arteriolar end</p>
                    <p className="font-semibold text-foreground">{activeForce.artValue}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-[10px]">Venular end</p>
                    <p className="font-semibold text-foreground">{activeForce.venValue}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Click a force to explore</p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  {STARLING_BARRIER}
                </p>
              </div>
            )}
  
            <div className="p-3 rounded-lg border border-border bg-secondary/20">
              <p className="font-semibold text-foreground text-xs mb-1.5">Net Filtration Pressure</p>
              <div className="overflow-x-auto">
                <table className="w-full text-[10px]">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-1 text-muted-foreground">Location</th>
                      <th className="text-center py-1 text-muted-foreground">NFP</th>
                      <th className="text-left py-1 text-muted-foreground">Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50">
                      <td className="py-1 text-foreground">Arteriolar end</td>
                      <td className="text-center text-foreground">Context-dependent</td>
                      <td className="py-1 text-muted-foreground">Net filtration (fluid leaves)</td>
                    </tr>
                    <tr>
                      <td className="py-1 text-foreground">Venular end</td>
                      <td className="text-center text-foreground">Context-dependent</td>
                      <td className="py-1 text-muted-foreground">Usually slight steady-state filtration; not universal</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[10px] text-muted-foreground mt-1.5 leading-relaxed">
                {STARLING_STEADY}<InlineRef topicId="starling-forces" refLabel="Starling Extension 2020" />
              </p>
            </div>
  
            <div className="p-3 rounded-lg border border-border bg-secondary/20">
              <p className="font-semibold text-foreground text-xs mb-1">Causes of Oedema</p>
              <ul className="text-[10px] text-muted-foreground space-y-0.5 leading-relaxed">
                <li>• <strong>↑ Pc</strong>: heart failure, fluid overload, venous obstruction</li>
                <li>• <strong>↓ πc</strong>: hypoalbuminaemia (liver failure, nephrotic, malnutrition)</li>
                <li>• <strong>↑ Kf</strong>: inflammation, sepsis — glycocalyx damage increases permeability and πsg</li>
                <li>• <strong>↓ lymphatic drainage</strong>: lymphoedema, surgical disruption</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default StarlingForcesDiagram;

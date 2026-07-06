import { useState } from "react";
import { DiagramFigure } from "../_shared/DiagramFigure";

interface ZoneInfo {
  id: number;
  label: string;
  color: string;
  colorLight: string;
  oxygenLevel: string;
  oxygenPercent: number;
  functions: string[];
  vulnerability: string;
  clinicalRelevance: string;
}

const zones: ZoneInfo[] = [
  {
    id: 1,
    label: "Zone 1 — Periportal",
    color: "hsl(0, 75%, 55%)",
    colorLight: "hsl(0, 60%, 95%)",
    oxygenLevel: "Highest pO₂ (~65 mmHg)",
    oxygenPercent: 95,
    functions: [
      "Oxidative phosphorylation",
      "Gluconeogenesis",
      "β-oxidation of fatty acids",
      "Bile salt uptake & excretion",
      "Urea synthesis (ammonia detox)",
      "Cholesterol synthesis",
    ],
    vulnerability: "Most resistant to ischaemia. First affected by viral hepatitis and cholestatic injury.",
    clinicalRelevance: "Phosphorus poisoning causes periportal necrosis. Zone 1 injury pattern in eclampsia.",
  },
  {
    id: 2,
    label: "Zone 2 — Intermediate",
    color: "hsl(35, 80%, 55%)",
    colorLight: "hsl(35, 60%, 95%)",
    oxygenLevel: "Intermediate pO₂ (~45 mmHg)",
    oxygenPercent: 60,
    functions: [
      "Transitional metabolic activity",
      "Mixed oxidative & glycolytic",
      "Some CYP450 activity",
      "Intermediate synthetic function",
    ],
    vulnerability: "Intermediate vulnerability. Yellow fever causes midzonal necrosis.",
    clinicalRelevance: "Less commonly a distinct injury pattern clinically. Bridge between periportal and centrilobular zones.",
  },
  {
    id: 3,
    label: "Zone 3 — Centrilobular",
    color: "hsl(220, 70%, 55%)",
    colorLight: "hsl(220, 50%, 95%)",
    oxygenLevel: "Lowest pO₂ (~35 mmHg)",
    oxygenPercent: 30,
    functions: [
      "CYP450 drug metabolism (Phase I)",
      "Glycolysis & lipogenesis",
      "Glutamine synthesis",
      "Ketogenesis",
      "Glycogen storage (fed state)",
      "Biotransformation of toxins",
    ],
    vulnerability: "Most vulnerable to ischaemia and toxic injury. Highest CYP450 → toxic metabolite production.",
    clinicalRelevance: "Paracetamol toxicity → NAPQI → Zone 3 necrosis. Halothane hepatitis, cardiac failure (nutmeg liver), hypotension-related injury.",
  },
];

const HepaticAcinusDiagram = () => {
  const [activeZone, setActiveZone] = useState<number | null>(null);
  const selectedZone = activeZone !== null ? zones.find(z => z.id === activeZone) : null;

  const cx = 200;
  const cy = 200;

  return (
    <DiagramFigure
      id="hepatic-acinus-diagram"
      title="Hepatic acinus"
      description="Auto-generated wrapper for the Hepatic acinus anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <div className="my-8 p-4 sm:p-6 rounded-xl border border-border bg-card">
        <h3 className="text-lg font-serif font-bold text-foreground mb-1">Interactive Hepatic Acinus</h3>
        <p className="text-xs text-muted-foreground mb-4">Click or tap a zone to explore its metabolic functions, oxygen supply, and clinical significance.</p>
  
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* SVG Diagram */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <svg viewBox="0 0 400 400" className="w-full max-w-[360px]" role="img" aria-label="Rappaport hepatic acinus diagram — diamond functional unit with portal triads on the long axis and central veins at the short-axis apices, divided into zones 1, 2 and 3">
              {/* Acinus boundary — diamond (Rappaport model). Long (portal) axis horizontal between two terminal portal vessels; short axis runs to two adjacent terminal hepatic venules (central veins). */}
              <defs>
                <linearGradient id="o2grad" x1="0.5" y1="0.5" x2="0.5" y2="1">
                  <stop offset="0%" stopColor="hsl(0, 75%, 55%)" />
                  <stop offset="50%" stopColor="hsl(35, 80%, 55%)" />
                  <stop offset="100%" stopColor="hsl(220, 70%, 55%)" />
                </linearGradient>
                <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                  <polygon points="0 0, 8 3, 0 6" fill="hsl(var(--muted-foreground))" />
                </marker>
              </defs>

              <polygon
                points="200,40 360,200 200,360 40,200"
                fill="none"
                stroke="hsl(var(--border))"
                strokeWidth="1.5"
                strokeDasharray="6,3"
                opacity={0.6}
              />

              {/* Zone 3 — outermost band, closest to central veins (top & bottom apices of diamond) */}
              <ellipse
                cx={cx} cy={cy} rx={155} ry={150}
                fill={activeZone === 3 ? zones[2].color : zones[2].colorLight}
                stroke={zones[2].color}
                strokeWidth={activeZone === 3 ? 3 : 1.5}
                className="cursor-pointer transition-all duration-300"
                onClick={() => setActiveZone(activeZone === 3 ? null : 3)}
                opacity={activeZone !== null && activeZone !== 3 ? 0.4 : 0.85}
              />
              {/* Zone 2 — middle band */}
              <ellipse
                cx={cx} cy={cy} rx={130} ry={95}
                fill={activeZone === 2 ? zones[1].color : zones[1].colorLight}
                stroke={zones[1].color}
                strokeWidth={activeZone === 2 ? 3 : 1.5}
                className="cursor-pointer transition-all duration-300"
                onClick={() => setActiveZone(activeZone === 2 ? null : 2)}
                opacity={activeZone !== null && activeZone !== 2 ? 0.4 : 0.85}
              />
              {/* Zone 1 — innermost band, straddling the portal axis (between the two terminal portal vessels) */}
              <ellipse
                cx={cx} cy={cy} rx={100} ry={42}
                fill={activeZone === 1 ? zones[0].color : zones[0].colorLight}
                stroke={zones[0].color}
                strokeWidth={activeZone === 1 ? 3 : 1.5}
                className="cursor-pointer transition-all duration-300"
                onClick={() => setActiveZone(activeZone === 1 ? null : 1)}
                opacity={activeZone !== null && activeZone !== 1 ? 0.4 : 0.85}
              />

              {/* Portal axis (dotted line connecting the two terminal portal vessels) */}
              <line x1={50} y1={cy} x2={350} y2={cy} stroke="hsl(0, 65%, 50%)" strokeWidth="1" strokeDasharray="4,3" opacity={0.5} />

              {/* Two terminal portal vessels (PTs) at lateral ends of the long axis */}
              {[{ x: 40, y: 200 }, { x: 360, y: 200 }].map((pt, i) => (
                <g key={`pt${i}`}>
                  <circle cx={pt.x} cy={pt.y} r={14} fill="hsl(0, 65%, 50%)" stroke="hsl(0, 70%, 40%)" strokeWidth="1.5" opacity={0.9} />
                  <text x={pt.x} y={pt.y + 4} textAnchor="middle" className="text-[8px] font-bold" fill="hsl(var(--background))">PT</text>
                </g>
              ))}

              {/* Two terminal hepatic venules (central veins) at top and bottom apices */}
              {[{ x: 200, y: 40 }, { x: 200, y: 360 }].map((cv, i) => (
                <g key={`cv${i}`}>
                  <circle cx={cv.x} cy={cv.y} r={12} fill="hsl(220, 70%, 45%)" stroke="hsl(220, 80%, 35%)" strokeWidth="1.5" />
                  <text x={cv.x} y={cv.y + 4} textAnchor="middle" className="text-[8px]" fill="hsl(var(--background))">CV</text>
                </g>
              ))}

              {/* Zone labels */}
              <text x={cx} y={cy + 4} textAnchor="middle" className="text-[11px] font-bold" fill={zones[0].color}>Zone 1</text>
              <text x={cx} y={cy - 70} textAnchor="middle" className="text-[11px] font-bold" fill={zones[1].color}>Zone 2</text>
              <text x={cx} y={cy - 120} textAnchor="middle" className="text-[11px] font-bold" fill={zones[2].color}>Zone 3</text>

              {/* O₂ gradient bar (PT axis → CV apex) */}
              <rect x={cx - 4} y={60} width={8} height={130} rx={3} fill="url(#o2grad)" opacity={0.6} transform={`rotate(180 ${cx} 125)`} />
              <text x={cx + 12} y={50} className="text-[8px]" fill="hsl(var(--muted-foreground))">Low O₂ (CV)</text>
              <text x={cx + 12} y={cy - 2} className="text-[8px]" fill="hsl(var(--muted-foreground))">High O₂ (PT axis)</text>

              {/* Blood flow arrows — radiating from portal axis outward to the central veins */}
              {[
                { x1: cx, y1: cy - 8, x2: cx, y2: 60 },
                { x1: cx, y1: cy + 8, x2: cx, y2: 340 },
                { x1: cx - 40, y1: cy - 4, x2: 120, y2: 90 },
                { x1: cx + 40, y1: cy - 4, x2: 280, y2: 90 },
                { x1: cx - 40, y1: cy + 4, x2: 120, y2: 310 },
                { x1: cx + 40, y1: cy + 4, x2: 280, y2: 310 },
              ].map((ln, i) => (
                <line
                  key={i}
                  x1={ln.x1} y1={ln.y1} x2={ln.x2} y2={ln.y2}
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth="1"
                  strokeDasharray="4,3"
                  opacity={0.35}
                  markerEnd="url(#arrowhead)"
                />
              ))}
            </svg>
          </div>
  
          {/* Info Panel */}
          <div className="w-full lg:w-1/2">
            {selectedZone ? (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: selectedZone.color }} />
                  <h4 className="font-serif font-bold text-foreground">{selectedZone.label}</h4>
                </div>
  
                {/* Oxygen bar */}
                <div>
                  <p className="text-xs text-muted-foreground mb-1">{selectedZone.oxygenLevel}</p>
                  <div className="h-2.5 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${selectedZone.oxygenPercent}%`,
                        backgroundColor: selectedZone.color,
                      }}
                    />
                  </div>
                </div>
  
                {/* Functions */}
                <div>
                  <p className="text-xs font-semibold text-foreground mb-1">Key Metabolic Functions</p>
                  <ul className="space-y-1">
                    {selectedZone.functions.map((f) => (
                      <li key={f} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: selectedZone.color }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
  
                {/* Vulnerability */}
                <div className="p-3 rounded-lg border border-border bg-secondary/30">
                  <p className="text-xs font-semibold text-foreground mb-1">Vulnerability</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selectedZone.vulnerability}</p>
                </div>
  
                {/* Clinical */}
                <div className="p-3 rounded-lg border border-border bg-secondary/30">
                  <p className="text-xs font-semibold text-foreground mb-1">Clinical Relevance</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selectedZone.clinicalRelevance}</p>
                </div>
              </div>
            ) : (
              <div className="text-center lg:text-left py-8 lg:py-12">
                <p className="text-muted-foreground text-sm">Select a zone in the diagram to view details</p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-2 mt-4">
                  {zones.map((z) => (
                    <button
                      key={z.id}
                      onClick={() => setActiveZone(z.id)}
                      className="px-3 py-1.5 rounded-full text-xs font-medium border transition-colors hover:opacity-80"
                      style={{ borderColor: z.color, color: z.color }}
                    >
                      Zone {z.id}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
  
        {/* Legend */}
        <div className="mt-4 pt-3 border-t border-border flex flex-wrap gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: "hsl(0, 65%, 50%)" }} /> PT = Portal Triad (hepatic artery + portal vein + bile duct)</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: "hsl(220, 70%, 45%)" }} /> CV = Central (hepatic) Vein</span>
          <span>Blood flows from PT → CV through zones 1 → 2 → 3</span>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default HepaticAcinusDiagram;

import { useState } from "react";

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
    <div className="my-8 p-4 sm:p-6 rounded-xl border border-border bg-card">
      <h3 className="text-lg font-serif font-bold text-foreground mb-1">Interactive Hepatic Acinus</h3>
      <p className="text-xs text-muted-foreground mb-4">Click or tap a zone to explore its metabolic functions, oxygen supply, and clinical significance.</p>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* SVG Diagram */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <svg viewBox="0 0 400 400" className="w-full max-w-[360px]" role="img" aria-label="Hepatic acinus diagram showing zones 1, 2 and 3">
            {/* Background hexagonal lobule shape */}
            <polygon
              points="200,30 350,110 350,290 200,370 50,290 50,110"
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth="1.5"
              strokeDasharray="6,3"
              opacity={0.5}
            />

            {/* Zone 3 — outermost ring (centrilobular) */}
            <circle
              cx={cx} cy={cy} r={140}
              fill={activeZone === 3 ? zones[2].color : zones[2].colorLight}
              stroke={zones[2].color}
              strokeWidth={activeZone === 3 ? 3 : 1.5}
              className="cursor-pointer transition-all duration-300"
              onClick={() => setActiveZone(activeZone === 3 ? null : 3)}
              opacity={activeZone !== null && activeZone !== 3 ? 0.4 : 0.85}
            />
            {/* Zone 2 — middle ring */}
            <circle
              cx={cx} cy={cy} r={95}
              fill={activeZone === 2 ? zones[1].color : zones[1].colorLight}
              stroke={zones[1].color}
              strokeWidth={activeZone === 2 ? 3 : 1.5}
              className="cursor-pointer transition-all duration-300"
              onClick={() => setActiveZone(activeZone === 2 ? null : 2)}
              opacity={activeZone !== null && activeZone !== 2 ? 0.4 : 0.85}
            />
            {/* Zone 1 — innermost ring (periportal) */}
            <circle
              cx={cx} cy={cy} r={52}
              fill={activeZone === 1 ? zones[0].color : zones[0].colorLight}
              stroke={zones[0].color}
              strokeWidth={activeZone === 1 ? 3 : 1.5}
              className="cursor-pointer transition-all duration-300"
              onClick={() => setActiveZone(activeZone === 1 ? null : 1)}
              opacity={activeZone !== null && activeZone !== 1 ? 0.4 : 0.85}
            />

            {/* Central vein */}
            <circle cx={cx} cy={cy} r={14} fill="hsl(220, 70%, 45%)" stroke="hsl(220, 80%, 35%)" strokeWidth="2" />
            <text x={cx} y={cy - 20} textAnchor="middle" className="text-[9px] font-semibold" fill="hsl(220, 70%, 35%)">Central</text>
            <text x={cx} y={cy - 11} textAnchor="middle" className="text-[9px] font-semibold" fill="hsl(220, 70%, 35%)">Vein</text>
            <text x={cx} y={cy + 4} textAnchor="middle" className="text-[8px]" fill="hsl(var(--background))">CV</text>

            {/* Portal triads at vertices */}
            {[
              { x: 200, y: 48 },
              { x: 330, y: 125 },
              { x: 330, y: 275 },
              { x: 200, y: 352 },
              { x: 70, y: 275 },
              { x: 70, y: 125 },
            ].map((pt, i) => (
              <g key={i}>
                <circle cx={pt.x} cy={pt.y} r={10} fill="hsl(0, 65%, 50%)" stroke="hsl(0, 70%, 40%)" strokeWidth="1.5" opacity={0.8} />
                <text x={pt.x} y={pt.y + 3.5} textAnchor="middle" className="text-[7px] font-bold" fill="hsl(var(--background))">PT</text>
              </g>
            ))}

            {/* Zone labels */}
            <text x={cx} y={cy + 40} textAnchor="middle" className="text-[11px] font-bold" fill={zones[0].color}>Zone 1</text>
            <text x={cx + 72} y={cy - 55} textAnchor="middle" className="text-[11px] font-bold" fill={zones[1].color}>Zone 2</text>
            <text x={cx - 80} y={cy + 110} textAnchor="middle" className="text-[11px] font-bold" fill={zones[2].color}>Zone 3</text>

            {/* O₂ gradient arrow */}
            <defs>
              <linearGradient id="o2grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="hsl(0, 75%, 55%)" />
                <stop offset="50%" stopColor="hsl(35, 80%, 55%)" />
                <stop offset="100%" stopColor="hsl(220, 70%, 55%)" />
              </linearGradient>
              <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="hsl(var(--muted-foreground))" />
              </marker>
            </defs>
            <rect x={100} y={378} width={200} height={6} rx={3} fill="url(#o2grad)" opacity={0.7} />
            <text x={100} y={396} className="text-[8px]" fill="hsl(var(--muted-foreground))">High O₂ (Portal Triad)</text>
            <text x={300} y={396} textAnchor="end" className="text-[8px]" fill="hsl(var(--muted-foreground))">Low O₂ (Central Vein)</text>

            {/* Blood flow arrows (portal triad → central vein) */}
            {[0, 60, 120, 180, 240, 300].map((angle) => {
              const rad = (angle * Math.PI) / 180;
              const x1 = cx + Math.sin(rad) * 130;
              const y1 = cy - Math.cos(rad) * 130;
              const x2 = cx + Math.sin(rad) * 25;
              const y2 = cy - Math.cos(rad) * 25;
              return (
                <line
                  key={angle}
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth="1"
                  strokeDasharray="4,3"
                  opacity={0.3}
                  markerEnd="url(#arrowhead)"
                />
              );
            })}
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
  );
};

export default HepaticAcinusDiagram;

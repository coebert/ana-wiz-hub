import { DiagramFigure } from "../_shared/DiagramFigure";
/**
 * Animated pathophysiology diagram — Carcinoid syndrome.
 * Tumour mediator release → systemic effects → carcinoid heart disease.
 */
const CarcinoidSyndromeDiagram = () => {
  return (
    <DiagramFigure
      id="carcinoid-syndrome-diagram"
      title="Carcinoid syndrome"
      description="Animated pathophysiology diagram — Carcinoid syndrome. Tumour mediator release → systemic effects → carcinoid heart disease."
    >
                  <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="px-4 sm:px-6 py-4 border-b border-border bg-muted/30">
          <h3 className="text-lg font-serif font-bold text-foreground">Carcinoid Syndrome — Mediator Cascade</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Animated release of vasoactive mediators bypassing hepatic first-pass and triggering crisis
          </p>
        </div>
  
        <div className="p-4 sm:p-6">
          <svg viewBox="0 0 800 440" className="w-full h-auto" role="img" aria-label="Carcinoid syndrome mediator cascade">
            <defs>
              <marker id="arr-car" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M0,0 L10,5 L0,10 z" fill="hsl(var(--pharmacology))" />
              </marker>
            </defs>
  
            {/* Tumour */}
            <g>
              <ellipse cx="100" cy="220" rx="70" ry="55" fill="hsl(var(--pharmacology) / 0.15)" stroke="hsl(var(--pharmacology))" strokeWidth="2">
                <animate attributeName="rx" values="68;75;68" dur="1.8s" repeatCount="indefinite" />
              </ellipse>
              <text x="100" y="216" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="700">Carcinoid</text>
              <text x="100" y="232" textAnchor="middle" className="fill-muted-foreground" fontSize="10">tumour (gut / hepatic mets)</text>
            </g>
  
            {/* Mediator legend - colour coded particles */}
            {[
              { color: "hsl(var(--clinical))", label: "5-HT", y: 140 },
              { color: "hsl(var(--pharmacology))", label: "Histamine", y: 200 },
              { color: "hsl(var(--anatomy))", label: "Kallikrein", y: 260 },
              { color: "hsl(var(--icu))", label: "Prostaglandins", y: 320 },
            ].map((m, mi) => (
              <g key={m.label}>
                {/* Streaming particles */}
                {[0, 0.4, 0.8, 1.2].map((d, i) => (
                  <circle key={i} cx="170" cy={m.y} r="4" fill={m.color}>
                    <animate attributeName="cx" values={`170;${380}`} dur="2s" begin={`${d + mi * 0.1}s`} repeatCount="indefinite" />
                    <animate attributeName="cy" values={`${m.y};${230}`} dur="2s" begin={`${d + mi * 0.1}s`} repeatCount="indefinite" />
                    <animate attributeName="opacity" values="1;1;0" dur="2s" begin={`${d + mi * 0.1}s`} repeatCount="indefinite" />
                  </circle>
                ))}
                {/* Legend dot */}
                <circle cx="190" cy={m.y - 14} r="4" fill={m.color} />
                <text x="200" y={m.y - 11} className="fill-muted-foreground" fontSize="9">{m.label}</text>
              </g>
            ))}
  
            {/* Hepatic shunt — dashed bypass arrow */}
            <g>
              <path d="M180 350 Q 280 380 380 280" stroke="hsl(var(--destructive))" strokeWidth="2" strokeDasharray="6 4" fill="none" />
              <text x="240" y="395" className="fill-destructive" fontSize="10" fontWeight="600">Bypasses hepatic first-pass (liver mets)</text>
            </g>
  
            {/* Systemic circulation node */}
            <g>
              <rect x="380" y="200" width="180" height="80" rx="12" fill="hsl(var(--card))" stroke="hsl(var(--pharmacology))" strokeWidth="2" />
              <text x="470" y="226" textAnchor="middle" className="fill-foreground" fontSize="13" fontWeight="700">Systemic circulation</text>
              <text x="470" y="246" textAnchor="middle" className="fill-muted-foreground" fontSize="10">Mediators reach end organs</text>
              <text x="470" y="264" textAnchor="middle" className="fill-muted-foreground" fontSize="10">unmetabolised</text>
            </g>
  
            {/* Four end-organ effects */}
            {[
              { x: 600, y: 50, label: "Flushing", detail: "Vasodilation (5-HT, kallikrein-bradykinin)" },
              { x: 600, y: 130, label: "Diarrhoea", detail: "↑ gut motility & secretion (5-HT)" },
              { x: 600, y: 290, label: "Bronchospasm", detail: "Histamine, 5-HT" },
              { x: 600, y: 370, label: "Right-heart valves", detail: "Fibrosis: TR + PS (carcinoid heart disease)" },
            ].map((c, i) => (
              <g key={c.label}>
                <path d={`M560 240 Q ${c.x - 20} ${c.y + 25} ${c.x} ${c.y + 25}`} stroke="hsl(var(--pharmacology))" strokeWidth="1.5" fill="none" opacity="0.6" markerEnd="url(#arr-car)">
                  <animate attributeName="stroke-dasharray" values="0 200;200 0" dur="2.5s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
                </path>
                <rect x={c.x} y={c.y} width="200" height="50" rx="8" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
                <text x={c.x + 12} y={c.y + 22} className="fill-foreground" fontSize="12" fontWeight="600">{c.label}</text>
                <text x={c.x + 12} y={c.y + 40} className="fill-muted-foreground" fontSize="9">{c.detail}</text>
              </g>
            ))}
  
            {/* Connector tumour → particles */}
            <path d="M170 220 L 380 240" stroke="hsl(var(--pharmacology))" strokeWidth="1" strokeDasharray="2 3" opacity="0.3" />
          </svg>
  
          <div className="mt-4 grid sm:grid-cols-2 gap-2 text-sm">
            <div className="p-3 rounded-lg border border-clinical/30 bg-clinical/5">
              <p className="font-semibold text-foreground text-xs">Block release, not response</p>
              <p className="text-muted-foreground text-xs mt-1">Octreotide infusion 50–100 µg/h pre-induction; 100–500 µg bolus for crisis. Avoid catecholamines — they may trigger further mediator release.</p>
            </div>
            <div className="p-3 rounded-lg border border-destructive/30 bg-destructive/5">
              <p className="font-semibold text-foreground text-xs">Avoid triggers</p>
              <p className="text-muted-foreground text-xs mt-1">Histamine releasers (atracurium, morphine, suxamethonium), sympathomimetics, hypothermia, hypercarbia, surgical handling.</p>
            </div>
          </div>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default CarcinoidSyndromeDiagram;

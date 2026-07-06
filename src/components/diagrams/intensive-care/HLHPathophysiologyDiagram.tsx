import { DiagramFigure, svgImgProps } from "../_shared/DiagramFigure";

/**
 * HLH/MAS pathophysiology — failed cytotoxic killing → cytokine storm.
 */
const HLHPathophysiologyDiagram = () => {
  const id = "hlh-pathophys";
  return (
    <DiagramFigure
      id={id}
      title="HLH / MAS pathophysiology — defective cytotoxicity drives cytokine storm"
      description="Trigger persists because NK / CD8 cells cannot lyse infected antigen-presenting cells (perforin/granzyme defect or exhaustion). Persistent IFN-γ, IL-1, IL-6, IL-18 storm activates macrophages, which haemophagocytose blood cells, raising ferritin, sCD25, triglycerides — multi-organ failure follows."
      showCaption
    >
      <svg
        viewBox="0 0 820 380"
        className="w-full h-auto rounded-lg border border-border bg-card p-3 my-3"
        {...svgImgProps({ id })}
      >
        <title id={`${id}-title`}>HLH pathophysiology</title>
        <desc id={`${id}-desc`}>
          Failed cytotoxic clearance perpetuates antigen presentation, driving IFN-γ-mediated
          macrophage activation, haemophagocytosis and multi-organ failure.
        </desc>

        <defs>
          <marker id="hlh-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0 L10 5 L0 10 z" fill="hsl(var(--foreground))" />
          </marker>
        </defs>

        {/* Trigger */}
        <g>
          <circle cx="80" cy="80" r="38" fill="hsl(var(--warn, 38 92% 50%) / 0.2)" stroke="hsl(var(--warn, 38 92% 50%))" />
          <text x="55" y="78" fontSize="11" fontWeight="700" fill="hsl(var(--foreground))">Trigger</text>
          <text x="44" y="94" fontSize="9" fill="hsl(var(--muted-foreground))">EBV / malignancy</text>
          <text x="50" y="106" fontSize="9" fill="hsl(var(--muted-foreground))">/ rheum (MAS)</text>
        </g>

        {/* APC */}
        <path d="M118 80 L180 80" stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd="url(#hlh-arr)" />
        <g>
          <rect x="180" y="55" width="100" height="50" rx="8" fill="hsl(var(--secondary))" stroke="hsl(var(--border))" />
          <text x="208" y="78" fontSize="11" fontWeight="600" fill="hsl(var(--foreground))">Infected APC</text>
          <text x="200" y="94" fontSize="9" fill="hsl(var(--muted-foreground))">presents antigen</text>
        </g>

        {/* NK / CD8 cell */}
        <path d="M230 105 L230 160" stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd="url(#hlh-arr)" />
        <g>
          <rect x="170" y="160" width="120" height="60" rx="8" fill="hsl(var(--secondary))" stroke="hsl(var(--border))" />
          <text x="195" y="183" fontSize="11" fontWeight="600" fill="hsl(var(--foreground))">NK / CD8 T cell</text>
          <text x="180" y="200" fontSize="9" fill="hsl(var(--muted-foreground))">perforin / granzyme</text>
          <text x="195" y="214" fontSize="9" fill="hsl(var(--destructive))" fontWeight="600">DEFECTIVE</text>
        </g>

        {/* Big red X over killing arrow */}
        <g transform="translate(310 188)">
          <line x1="-10" y1="-10" x2="10" y2="10" stroke="hsl(var(--destructive))" strokeWidth="3" />
          <line x1="-10" y1="10" x2="10" y2="-10" stroke="hsl(var(--destructive))" strokeWidth="3" />
        </g>
        <text x="305" y="240" fontSize="9" fill="hsl(var(--destructive))">no cytolysis</text>

        {/* Persistent activation arrow up */}
        <path d="M280 80 Q400 30 500 80" stroke="hsl(var(--destructive))" strokeWidth="2" fill="none" markerEnd="url(#hlh-arr)" />
        <text x="360" y="40" fontSize="10" fill="hsl(var(--destructive))" fontWeight="600">persistent antigen → IFN-γ ↑↑</text>

        {/* Macrophage cytokine storm */}
        <g>
          <circle cx="540" cy="100" r="55" fill="hsl(var(--destructive) / 0.12)" stroke="hsl(var(--destructive))">
            <animate attributeName="r" values="52;58;52" dur="1.6s" repeatCount="indefinite" />
          </circle>
          <text x="510" y="92" fontSize="11" fontWeight="700" fill="hsl(var(--destructive))">Activated</text>
          <text x="505" y="108" fontSize="11" fontWeight="700" fill="hsl(var(--destructive))">macrophage</text>
          <text x="525" y="124" fontSize="9" fill="hsl(var(--muted-foreground))">storm</text>
        </g>

        {/* Cytokines radiating */}
        {[
          { x: 660, y: 50, label: "IL-1" },
          { x: 700, y: 100, label: "IL-6" },
          { x: 660, y: 150, label: "IL-18" },
          { x: 620, y: 40, label: "TNF-α" },
        ].map((c, i) => (
          <g key={c.label}>
            <circle cx={c.x} cy={c.y} r="14" fill="hsl(var(--destructive) / 0.2)" stroke="hsl(var(--destructive))">
              <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
            </circle>
            <text x={c.x - 12} y={c.y + 4} fontSize="9" fontWeight="600" fill="hsl(var(--destructive))">{c.label}</text>
          </g>
        ))}

        {/* Haemophagocytosis */}
        <g>
          <rect x="350" y="260" width="220" height="100" rx="8" fill="hsl(var(--secondary))" stroke="hsl(var(--border))" />
          <text x="360" y="282" fontSize="12" fontWeight="700" fill="hsl(var(--foreground))">Haemophagocytosis</text>
          <text x="360" y="302" fontSize="10" fill="hsl(var(--muted-foreground))">Macrophages engulf RBC, PLT, WBC</text>
          <text x="360" y="318" fontSize="10" fill="hsl(var(--muted-foreground))">→ pancytopenia, splenomegaly</text>
          <text x="360" y="338" fontSize="10" fontWeight="600" fill="hsl(var(--icu))">↑ Ferritin, sCD25, TG, LDH</text>
          <text x="360" y="354" fontSize="10" fontWeight="600" fill="hsl(var(--icu))">↓ Fibrinogen, NK activity</text>
        </g>

        {/* Outcome */}
        <g>
          <rect x="600" y="200" width="200" height="160" rx="8" fill="hsl(var(--destructive) / 0.08)" stroke="hsl(var(--destructive) / 0.5)" />
          <text x="612" y="222" fontSize="12" fontWeight="700" fill="hsl(var(--destructive))">Multi-organ failure</text>
          <text x="612" y="244" fontSize="10" fill="hsl(var(--muted-foreground))">Liver: hepatitis, coagulopathy</text>
          <text x="612" y="260" fontSize="10" fill="hsl(var(--muted-foreground))">Lung: ARDS</text>
          <text x="612" y="276" fontSize="10" fill="hsl(var(--muted-foreground))">CNS: seizures, encephalopathy</text>
          <text x="612" y="292" fontSize="10" fill="hsl(var(--muted-foreground))">Renal: AKI</text>
          <text x="612" y="316" fontSize="11" fontWeight="700" fill="hsl(var(--success, 142 70% 40%))">Treatment</text>
          <text x="612" y="332" fontSize="10" fill="hsl(var(--muted-foreground))">Trigger control + dexamethasone</text>
          <text x="612" y="348" fontSize="10" fill="hsl(var(--muted-foreground))">± etoposide / anakinra (IL-1)</text>
        </g>

        {/* HScore badge */}
        <g>
          <rect x="20" y="230" width="200" height="120" rx="8" fill="hsl(var(--icu) / 0.08)" stroke="hsl(var(--icu) / 0.5)" />
          <text x="32" y="252" fontSize="12" fontWeight="700" fill="hsl(var(--icu))">HLH-2004 / HScore</text>
          <text x="32" y="272" fontSize="10" fill="hsl(var(--muted-foreground))">Fever, splenomegaly, cytopenias</text>
          <text x="32" y="288" fontSize="10" fill="hsl(var(--muted-foreground))">↑ Ferritin (often &gt;10,000)</text>
          <text x="32" y="304" fontSize="10" fill="hsl(var(--muted-foreground))">↑ TG &amp;/or ↓ fibrinogen</text>
          <text x="32" y="320" fontSize="10" fill="hsl(var(--muted-foreground))">Haemophagocytosis on biopsy</text>
          <text x="32" y="340" fontSize="10" fontWeight="600" fill="hsl(var(--icu))">HScore &gt;169 → &gt;93% prob.</text>
        </g>
      </svg>
    </DiagramFigure>
  );
};

export default HLHPathophysiologyDiagram;

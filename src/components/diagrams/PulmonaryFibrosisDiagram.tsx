import DiagramAnimationLegend from "./DiagramAnimationLegend";

/**
 * Animated pathophysiology diagram — Pulmonary Fibrosis (restrictive disease).
 * Repeated alveolar epithelial injury → aberrant repair (TGF-β, fibroblast
 * proliferation) → collagen deposition → thick alveolar-capillary membrane
 * → ↓ compliance, ↓ DLCO, → V/Q mismatch and pulmonary hypertension.
 */
const PulmonaryFibrosisDiagram = () => {
  return (
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <div className="px-4 sm:px-6 py-4 border-b border-border bg-muted/30">
        <h3 className="text-lg font-serif font-bold text-foreground">Pulmonary Fibrosis — Restrictive Pathophysiology</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Aberrant repair after repeated injury → stiff lungs, impaired gas exchange, pulmonary HTN
        </p>
      </div>

      <div className="p-4 sm:p-6">
        <svg viewBox="0 0 800 440" className="w-full h-auto" role="img" aria-label="Pulmonary fibrosis pathophysiology">
          <defs>
            <marker id="arr-fib" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="hsl(var(--clinical))" />
            </marker>
          </defs>

          {/* Repeated injury */}
          <g>
            <rect x="20" y="30" width="200" height="64" rx="10" fill="hsl(var(--muted))" stroke="hsl(var(--border))" />
            <text x="120" y="54" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="600">Repeated alveolar injury</text>
            <text x="120" y="72" textAnchor="middle" className="fill-muted-foreground" fontSize="10">smoke · GORD · viral · drugs</text>
            <text x="120" y="86" textAnchor="middle" className="fill-muted-foreground" fontSize="9">amiodarone · methotrexate · bleomycin</text>
          </g>

          {/* Aberrant repair node */}
          <g>
            <circle cx="400" cy="62" r="36" fill="hsl(var(--clinical) / 0.15)" stroke="hsl(var(--clinical))" strokeWidth="2">
              <animate attributeName="r" values="34;40;34" dur="2s" repeatCount="indefinite" />
            </circle>
            <text x="400" y="58" textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="600">Aberrant</text>
            <text x="400" y="72" textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="600">repair</text>
            <text x="400" y="86" textAnchor="middle" className="fill-clinical" fontSize="9">TGF-β · PDGF</text>
          </g>

          {/* Fibroblasts proliferating */}
          <g>
            <rect x="540" y="30" width="240" height="64" rx="10" fill="hsl(var(--clinical) / 0.08)" stroke="hsl(var(--clinical) / 0.5)" />
            <text x="660" y="52" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="600">Fibroblast/myofibroblast</text>
            <text x="660" y="68" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="600">proliferation → collagen</text>
            <text x="660" y="86" textAnchor="middle" className="fill-muted-foreground" fontSize="9">pirfenidone · nintedanib block this step</text>
          </g>

          {/* Alveolus comparison panel */}
          <g transform="translate(40, 130)">
            <rect width="360" height="180" rx="10" fill="hsl(var(--card))" stroke="hsl(var(--border))" />
            <text x="180" y="22" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="700">Alveolar–capillary membrane</text>

            {/* Normal alveolus */}
            <g transform="translate(20, 40)">
              <text x="70" y="0" textAnchor="middle" className="fill-muted-foreground" fontSize="10">Normal</text>
              <circle cx="70" cy="60" r="42" fill="hsl(var(--clinical) / 0.05)" stroke="hsl(var(--clinical))" strokeWidth="1.5" />
              <ellipse cx="70" cy="60" rx="38" ry="38" fill="none" stroke="hsl(var(--clinical))" strokeWidth="0.75" strokeDasharray="2 2" />
              <text x="70" y="62" textAnchor="middle" className="fill-foreground" fontSize="9">thin wall</text>
              <text x="70" y="120" textAnchor="middle" className="fill-clinical" fontSize="9" fontWeight="600">DLCO normal</text>
            </g>

            {/* Arrow */}
            <path d="M180 100 L 220 100" stroke="hsl(var(--clinical))" strokeWidth="2" markerEnd="url(#arr-fib)" />

            {/* Fibrosed alveolus */}
            <g transform="translate(240, 40)">
              <text x="70" y="0" textAnchor="middle" className="fill-muted-foreground" fontSize="10">Fibrosed</text>
              <circle cx="70" cy="60" r="42" fill="hsl(var(--clinical) / 0.25)" stroke="hsl(var(--clinical))" strokeWidth="3" />
              {/* Collagen scribbles */}
              {[0, 60, 120, 180, 240, 300].map((angle) => (
                <line
                  key={angle}
                  x1={70 + Math.cos((angle * Math.PI) / 180) * 30}
                  y1={60 + Math.sin((angle * Math.PI) / 180) * 30}
                  x2={70 + Math.cos((angle * Math.PI) / 180) * 42}
                  y2={60 + Math.sin((angle * Math.PI) / 180) * 42}
                  stroke="hsl(var(--clinical))"
                  strokeWidth="2"
                />
              ))}
              <text x="70" y="62" textAnchor="middle" className="fill-foreground" fontSize="9">thickened</text>
              <text x="70" y="120" textAnchor="middle" className="fill-clinical" fontSize="9" fontWeight="600">↓↓ DLCO</text>
            </g>
          </g>

          {/* Lung mechanics box - stiff lung animation */}
          <g transform="translate(420, 130)">
            <rect width="340" height="180" rx="10" fill="hsl(var(--card))" stroke="hsl(var(--border))" />
            <text x="170" y="22" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="700">Lung mechanics</text>

            {/* Healthy lung - large breathing */}
            <ellipse cx="100" cy="100" rx="40" ry="50" fill="hsl(var(--clinical) / 0.15)" stroke="hsl(var(--clinical))" strokeWidth="1.5">
              <animate attributeName="rx" values="36;48;36" dur="3s" repeatCount="indefinite" />
              <animate attributeName="ry" values="46;58;46" dur="3s" repeatCount="indefinite" />
            </ellipse>
            <text x="100" y="172" textAnchor="middle" className="fill-muted-foreground" fontSize="10">normal compliance</text>

            {/* Fibrosed lung - small, restricted breathing */}
            <ellipse cx="240" cy="100" rx="28" ry="36" fill="hsl(var(--clinical) / 0.3)" stroke="hsl(var(--clinical))" strokeWidth="2">
              <animate attributeName="rx" values="26;30;26" dur="3s" repeatCount="indefinite" />
              <animate attributeName="ry" values="34;38;34" dur="3s" repeatCount="indefinite" />
            </ellipse>
            <text x="240" y="172" textAnchor="middle" className="fill-clinical" fontSize="10" fontWeight="600">↓ FVC · ↓ TLC · ↓ compliance</text>
          </g>

          {/* Final consequence */}
          <g>
            <rect x="120" y="345" width="560" height="80" rx="10" fill="hsl(var(--clinical) / 0.1)" stroke="hsl(var(--clinical))" strokeWidth="2" />
            <text x="400" y="370" textAnchor="middle" className="fill-foreground" fontSize="13" fontWeight="700">Hypoxaemia · pulmonary hypertension · cor pulmonale</text>
            <text x="400" y="390" textAnchor="middle" className="fill-muted-foreground" fontSize="10">small VT (4–6 mL/kg) · ↑ RR · moderate PEEP · risk of barotrauma & pneumothorax</text>
            <text x="400" y="408" textAnchor="middle" className="fill-muted-foreground" fontSize="10">avoid N₂O (raises PVR, expands bullae) · post-op ICU planning</text>
          </g>

          {/* Top arrows */}
          <path d="M220 60 L 360 62" stroke="hsl(var(--clinical))" strokeWidth="2" markerEnd="url(#arr-fib)" />
          <path d="M438 62 L 535 62" stroke="hsl(var(--clinical))" strokeWidth="2" markerEnd="url(#arr-fib)" />
          <path d="M660 96 L 220 130" stroke="hsl(var(--clinical))" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" markerEnd="url(#arr-fib)" />
          <path d="M660 96 L 590 130" stroke="hsl(var(--clinical))" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" markerEnd="url(#arr-fib)" />
          <path d="M220 310 L 320 345" stroke="hsl(var(--clinical))" strokeWidth="2" markerEnd="url(#arr-fib)" />
          <path d="M590 310 L 480 345" stroke="hsl(var(--clinical))" strokeWidth="2" markerEnd="url(#arr-fib)" />
        </svg>

        <DiagramAnimationLegend
          items={[
            { glyph: "trigger", label: "Injury source box", meaning: "repeated alveolar insult — smoke, GORD, drugs (amiodarone, bleomycin)" },
            { glyph: "process", label: "Pulsing repair node", meaning: "aberrant TGF-β / PDGF signalling driving fibroblast activation" },
            { glyph: "mediator", label: "Travelling dots", meaning: "profibrotic mediators reaching the interstitium" },
            { glyph: "structure", label: "Thickened membrane", meaning: "alveolar-capillary wall expanded by collagen → ↓ DLCO" },
            { glyph: "oscillate", label: "Shrinking lung outline", meaning: "↓ FVC, ↓ TLC, ↓ compliance — restrictive physiology" },
            { glyph: "outcome", label: "Tinted outcome box", meaning: "hypoxaemia → pulmonary hypertension → cor pulmonale" },
          ]}
        />

        <p className="text-xs text-muted-foreground mt-3 italic">
          Restrictive physiology + thickened diffusion barrier + pulmonary HTN guides the anaesthetic plan: lung-protective ventilation, careful fluids (RV is preload-sensitive), and avoid agents that further increase PVR.
        </p>
      </div>
    </div>
  );
};

export default PulmonaryFibrosisDiagram;

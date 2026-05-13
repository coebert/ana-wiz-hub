import DiagramAnimationLegend from "./DiagramAnimationLegend";

/**
 * Animated pathophysiology diagram — Acute Asthma / Bronchospasm.
 * Trigger → mast cell degranulation → smooth muscle contraction,
 * mucosal oedema and mucus plugging → expiratory flow limitation
 * with dynamic hyperinflation (auto-PEEP).
 */
const AsthmaBronchospasmDiagram = () => {
  return (
            <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <div className="px-4 sm:px-6 py-4 border-b border-border bg-muted/30">
        <h3 className="text-lg font-serif font-bold text-foreground">Asthma — Acute Bronchospasm Cascade</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Animated cascade from airway trigger to dynamic hyperinflation and gas-trapping
        </p>
      </div>

      <div className="p-4 sm:p-6">
        <svg viewBox="0 0 800 440" className="w-full h-auto" role="img" aria-label="Asthma bronchospasm pathophysiology">
          <defs>
            <marker id="arr-asthma" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="hsl(var(--clinical))" />
            </marker>
          </defs>

          {/* Trigger */}
          <g>
            <rect x="20" y="30" width="180" height="60" rx="10" fill="hsl(var(--muted))" stroke="hsl(var(--border))" />
            <text x="110" y="58" textAnchor="middle" className="fill-foreground" fontSize="13" fontWeight="600">Trigger</text>
            <text x="110" y="76" textAnchor="middle" className="fill-muted-foreground" fontSize="10">ETT · cold gas · histamine · allergen</text>
          </g>

          {/* Mast cell - pulsing */}
          <g>
            <circle cx="320" cy="60" r="28" fill="hsl(var(--clinical) / 0.15)" stroke="hsl(var(--clinical))" strokeWidth="2">
              <animate attributeName="r" values="26;32;26" dur="1.4s" repeatCount="indefinite" />
            </circle>
            <text x="320" y="58" textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="600">Mast cell</text>
            <text x="320" y="74" textAnchor="middle" className="fill-clinical" fontSize="10" fontWeight="700">degranulation</text>
          </g>

          {/* Mediator particles */}
          {[0, 0.3, 0.6, 0.9, 1.2].map((delay, i) => (
            <g key={i}>
              <circle cx="350" cy="60" r="3.5" fill="hsl(var(--clinical))">
                <animate attributeName="cx" values="350;560" dur="1.8s" begin={`${delay}s`} repeatCount="indefinite" />
                <animate attributeName="cy" values="60;55;65;60" dur="1.8s" begin={`${delay}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;1;0" dur="1.8s" begin={`${delay}s`} repeatCount="indefinite" />
              </circle>
            </g>
          ))}

          {/* Mediators panel */}
          <g>
            <rect x="560" y="30" width="220" height="60" rx="10" fill="hsl(var(--clinical) / 0.08)" stroke="hsl(var(--clinical) / 0.5)" />
            <text x="670" y="52" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="600">Inflammatory mediators</text>
            <text x="670" y="70" textAnchor="middle" className="fill-muted-foreground" fontSize="10">Histamine · LTC₄/D₄ · PGD₂ · IL-4/5/13</text>
            <text x="670" y="84" textAnchor="middle" className="fill-muted-foreground" fontSize="9">eosinophil & Th2 recruitment</text>
          </g>

          {/* Three downstream effects */}
          {/* 1. Smooth muscle contraction - animated airway narrowing */}
          <g transform="translate(40, 140)">
            <rect width="220" height="120" rx="10" fill="hsl(var(--card))" stroke="hsl(var(--border))" />
            <text x="110" y="22" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="600">Smooth muscle</text>
            <text x="110" y="36" textAnchor="middle" className="fill-clinical" fontSize="10" fontWeight="700">contraction</text>
            {/* Airway lumen */}
            <rect x="40" y="50" width="140" height="50" rx="6" fill="hsl(var(--muted))" stroke="hsl(var(--border))" />
            <rect x="40" y="50" width="140" height="50" rx="6" fill="hsl(var(--clinical) / 0.4)">
              <animate attributeName="height" values="10;30;10" dur="2.2s" repeatCount="indefinite" stroke="hsl(var(--border))" strokeWidth="0.75" />
              <animate attributeName="y" values="70;60;70" dur="2.2s" repeatCount="indefinite" />
            </rect>
            <rect x="40" y="50" width="140" height="50" rx="6" fill="none" stroke="hsl(var(--clinical))" strokeWidth="1.5">
              <animate attributeName="height" values="10;30;10" dur="2.2s" repeatCount="indefinite" />
              <animate attributeName="y" values="70;60;70" dur="2.2s" repeatCount="indefinite" />
            </rect>
            <text x="110" y="115" textAnchor="middle" className="fill-muted-foreground" fontSize="9">M3 · LTRA targets</text>
          </g>

          {/* 2. Mucosal oedema */}
          <g transform="translate(290, 140)">
            <rect width="220" height="120" rx="10" fill="hsl(var(--card))" stroke="hsl(var(--border))" />
            <text x="110" y="22" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="600">Mucosal oedema</text>
            <text x="110" y="36" textAnchor="middle" className="fill-clinical" fontSize="10" fontWeight="700">↑ vascular permeability</text>
            {/* Vessel + leaking droplets */}
            <rect x="30" y="58" width="160" height="14" rx="6" fill="hsl(var(--clinical) / 0.3)" stroke="hsl(var(--clinical))" />
            {[0, 0.4, 0.8, 1.2].map((d, i) => (
              <circle key={i} cx={50 + i * 35} cy="78" r="3" fill="hsl(var(--clinical))">
                <animate attributeName="cy" values="78;100;78" dur="1.6s" begin={`${d}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0.2;1" dur="1.6s" begin={`${d}s`} repeatCount="indefinite" />
              </circle>
            ))}
            <text x="110" y="115" textAnchor="middle" className="fill-muted-foreground" fontSize="9">steroids ↓ inflammation</text>
          </g>

          {/* 3. Mucus plugging */}
          <g transform="translate(540, 140)">
            <rect width="220" height="120" rx="10" fill="hsl(var(--card))" stroke="hsl(var(--border))" />
            <text x="110" y="22" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="600">Mucus plugging</text>
            <text x="110" y="36" textAnchor="middle" className="fill-clinical" fontSize="10" fontWeight="700">goblet cell hyperplasia</text>
            {/* Animated plug growing */}
            <rect x="40" y="55" width="140" height="40" rx="6" fill="hsl(var(--muted))" stroke="hsl(var(--border))" />
            <ellipse cx="110" cy="75" rx="20" ry="12" fill="hsl(var(--clinical) / 0.7)">
              <animate attributeName="rx" values="10;40;10" dur="2.4s" repeatCount="indefinite" />
            </ellipse>
            <text x="110" y="115" textAnchor="middle" className="fill-muted-foreground" fontSize="9">humidification · physio</text>
          </g>

          {/* Convergence arrows to consequence */}
          <path d="M150 270 L 380 310" stroke="hsl(var(--clinical))" strokeWidth="2" fill="none" markerEnd="url(#arr-asthma)" />
          <path d="M400 270 L 400 305" stroke="hsl(var(--clinical))" strokeWidth="2" fill="none" markerEnd="url(#arr-asthma)" />
          <path d="M650 270 L 420 310" stroke="hsl(var(--clinical))" strokeWidth="2" fill="none" markerEnd="url(#arr-asthma)" />

          {/* Final - dynamic hyperinflation */}
          <g>
            <rect x="180" y="320" width="440" height="100" rx="12" fill="hsl(var(--clinical) / 0.1)" stroke="hsl(var(--clinical))" strokeWidth="2" />
            <text x="400" y="346" textAnchor="middle" className="fill-foreground" fontSize="14" fontWeight="700">Expiratory flow limitation</text>
            <text x="400" y="368" textAnchor="middle" className="fill-clinical" fontSize="11" fontWeight="600">Dynamic hyperinflation · auto-PEEP · ↑ WoB</text>
            {/* Pulsing lung */}
            <ellipse cx="280" cy="395" rx="22" ry="14" fill="hsl(var(--clinical) / 0.3)" stroke="hsl(var(--clinical))">
              <animate attributeName="rx" values="22;30;28" dur="3s" repeatCount="indefinite" />
              <animate attributeName="ry" values="14;20;18" dur="3s" repeatCount="indefinite" />
            </ellipse>
            <text x="400" y="400" textAnchor="middle" className="fill-muted-foreground" fontSize="10">↑ I:E (1:3–1:4) · permissive hypercapnia · low VT</text>
            <ellipse cx="520" cy="395" rx="22" ry="14" fill="hsl(var(--clinical) / 0.3)" stroke="hsl(var(--clinical))">
              <animate attributeName="rx" values="22;30;28" dur="3s" repeatCount="indefinite" />
              <animate attributeName="ry" values="14;20;18" dur="3s" repeatCount="indefinite" />
            </ellipse>
          </g>

          {/* Trigger arrow */}
          <path d="M200 60 L 290 60" stroke="hsl(var(--clinical))" strokeWidth="2" fill="none" markerEnd="url(#arr-asthma)" />
        </svg>

        <DiagramAnimationLegend
          items={[
            { glyph: "trigger", label: "Trigger box", meaning: "stimulus entering the airway (allergen, ETT, cold gas)" },
            { glyph: "process", label: "Pulsing mast cell", meaning: "active degranulation releasing mediators" },
            { glyph: "mediator", label: "Travelling dots", meaning: "histamine / leukotrienes diffusing to target tissues" },
            { glyph: "structure", label: "Narrowing lumen", meaning: "smooth-muscle contraction · oedema · mucus reducing airway calibre" },
            { glyph: "arrow", label: "Solid arrow", meaning: "causal step in the cascade" },
            { glyph: "outcome", label: "Tinted final box", meaning: "downstream consequence — dynamic hyperinflation & auto-PEEP" },
          ]}
        />

        <p className="text-xs text-muted-foreground mt-3 italic">
          Treatment maps onto the cascade: β₂-agonists & ipratropium reverse smooth-muscle contraction, steroids reduce mucosal oedema, magnesium relaxes airway smooth muscle, and ventilator strategy (long expiration, low VT) tolerates the hyperinflation while it resolves.
        </p>
      </div>
    </div>
  );
};

export default AsthmaBronchospasmDiagram;

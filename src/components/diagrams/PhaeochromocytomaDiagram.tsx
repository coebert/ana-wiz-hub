/**
 * Animated pathophysiology diagram — Phaeochromocytoma.
 * Shows tumour catecholamine secretion, α₁/β₁ effects, and why α-blockade
 * MUST precede β-blockade.
 */
const PhaeochromocytomaDiagram = () => {
  return (
            <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <div className="px-4 sm:px-6 py-4 border-b border-border bg-muted/30">
        <h3 className="text-lg font-serif font-bold text-foreground">Phaeochromocytoma — Catecholamine Cascade</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Why α-blockade must precede β-blockade — animated receptor-level mechanism
        </p>
      </div>

      <div className="p-4 sm:p-6">
        <svg viewBox="0 0 800 440" className="w-full h-auto" role="img" aria-label="Phaeochromocytoma catecholamine cascade">
          <defs>
            <marker id="arr-ph" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="hsl(var(--clinical))" />
            </marker>
            <radialGradient id="tumourGrad" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="hsl(var(--destructive))" stopOpacity="0.6" />
              <stop offset="100%" stopColor="hsl(var(--destructive))" stopOpacity="0.1" />
            </radialGradient>
          </defs>

          {/* Adrenal medulla / tumour - pulsing */}
          <g>
            <ellipse cx="120" cy="220" rx="70" ry="55" fill="url(#tumourGrad)" stroke="hsl(var(--destructive))" strokeWidth="2">
              <animate attributeName="rx" values="68;76;68" dur="1.4s" repeatCount="indefinite" />
              <animate attributeName="ry" values="53;60;53" dur="1.4s" repeatCount="indefinite" />
            </ellipse>
            <text x="120" y="218" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="700">Adrenal medulla</text>
            <text x="120" y="234" textAnchor="middle" className="fill-destructive" fontSize="11" fontWeight="700">tumour</text>
          </g>

          {/* Catecholamine particles streaming */}
          {[0, 0.25, 0.5, 0.75, 1.0, 1.25].map((delay, i) => (
            <g key={i}>
              <circle cx="190" cy="220" r="5" fill="hsl(var(--clinical))">
                <animate attributeName="cx" values="190;380" dur="1.8s" begin={`${delay}s`} repeatCount="indefinite" />
                <animate attributeName="cy" values={`220;${180 + (i % 3) * 40}`} dur="1.8s" begin={`${delay}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;1;0" dur="1.8s" begin={`${delay}s`} repeatCount="indefinite" />
              </circle>
            </g>
          ))}

          <text x="285" y="160" textAnchor="middle" className="fill-muted-foreground" fontSize="10" fontStyle="italic">
            adrenaline · noradrenaline
          </text>

          {/* α₁ receptor box */}
          <g>
            <rect x="380" y="100" width="200" height="80" rx="10" fill="hsl(var(--destructive) / 0.08)" stroke="hsl(var(--destructive))" strokeWidth="2" />
            <text x="480" y="125" textAnchor="middle" className="fill-foreground" fontSize="13" fontWeight="700">α₁ receptors</text>
            <text x="480" y="145" textAnchor="middle" className="fill-muted-foreground" fontSize="10">Vascular smooth muscle</text>
            <text x="480" y="163" textAnchor="middle" className="fill-destructive" fontSize="11" fontWeight="600">→ vasoconstriction · ↑↑ SVR · ↑ BP</text>
          </g>

          {/* β₁ receptor box */}
          <g>
            <rect x="380" y="260" width="200" height="80" rx="10" fill="hsl(var(--clinical) / 0.08)" stroke="hsl(var(--clinical))" strokeWidth="2" />
            <text x="480" y="285" textAnchor="middle" className="fill-foreground" fontSize="13" fontWeight="700">β₁ receptors</text>
            <text x="480" y="305" textAnchor="middle" className="fill-muted-foreground" fontSize="10">Cardiac myocytes / SA node</text>
            <text x="480" y="323" textAnchor="middle" className="fill-clinical" fontSize="11" fontWeight="600">→ tachycardia · ↑ contractility</text>
          </g>

          {/* Outcome panel: BP gauge */}
          <g>
            <rect x="620" y="100" width="160" height="240" rx="10" fill="hsl(var(--card))" stroke="hsl(var(--border))" />
            <text x="700" y="125" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="700">Haemodynamics</text>

            {/* Animated BP bar */}
            <rect x="660" y="150" width="22" height="120" fill="hsl(var(--muted))" rx="4" />
            <rect x="660" y="150" width="22" height="0" fill="hsl(var(--destructive))" rx="4">
              <animate attributeName="y" values="270;160;270" dur="3s" repeatCount="indefinite" />
              <animate attributeName="height" values="0;110;0" dur="3s" repeatCount="indefinite" />
            </rect>
            <text x="671" y="285" textAnchor="middle" className="fill-muted-foreground" fontSize="9">BP</text>

            {/* Animated HR bar */}
            <rect x="700" y="150" width="22" height="120" fill="hsl(var(--muted))" rx="4" />
            <rect x="700" y="150" width="22" height="0" fill="hsl(var(--clinical))" rx="4">
              <animate attributeName="y" values="270;180;270" dur="3s" begin="0.4s" repeatCount="indefinite" />
              <animate attributeName="height" values="0;90;0" dur="3s" begin="0.4s" repeatCount="indefinite" />
            </rect>
            <text x="711" y="285" textAnchor="middle" className="fill-muted-foreground" fontSize="9">HR</text>

            <text x="700" y="320" textAnchor="middle" className="fill-destructive" fontSize="11" fontWeight="700">Paroxysmal crisis</text>
          </g>

          {/* Connecting arrows */}
          <path d="M580 140 L 620 140" stroke="hsl(var(--destructive))" strokeWidth="2" markerEnd="url(#arr-ph)" />
          <path d="M580 300 L 620 300" stroke="hsl(var(--clinical))" strokeWidth="2" markerEnd="url(#arr-ph)" />

          {/* Warning — unopposed alpha */}
          <g>
            <rect x="40" y="350" width="740" height="60" rx="8" fill="hsl(var(--destructive) / 0.08)" stroke="hsl(var(--destructive))" strokeWidth="1.5" strokeDasharray="6 4" />
            <text x="60" y="376" className="fill-destructive" fontSize="12" fontWeight="700">⚠ Never β-block first</text>
            <text x="60" y="396" className="fill-muted-foreground" fontSize="11">
              β-block alone removes vasodilatory β₂ tone → unopposed α₁ vasoconstriction → catastrophic hypertensive crisis.
            </text>
            <text x="60" y="396" className="fill-muted-foreground" fontSize="11" opacity="0">
              <animate attributeName="opacity" values="0;1;0" dur="2.5s" repeatCount="indefinite" />
            </text>
          </g>
        </svg>

        <div className="mt-4 grid sm:grid-cols-3 gap-2 text-sm">
          <div className="p-3 rounded-lg border border-border">
            <p className="font-semibold text-foreground text-xs">Step 1 · α-blockade</p>
            <p className="text-muted-foreground text-xs mt-1">Phenoxybenzamine 10 mg BD, titrate over 10–14 d.</p>
          </div>
          <div className="p-3 rounded-lg border border-border">
            <p className="font-semibold text-foreground text-xs">Step 2 · Volume</p>
            <p className="text-muted-foreground text-xs mt-1">Liberal salt + fluids — restore intravascular volume.</p>
          </div>
          <div className="p-3 rounded-lg border border-border">
            <p className="font-semibold text-foreground text-xs">Step 3 · β-blockade</p>
            <p className="text-muted-foreground text-xs mt-1">Add propranolol once α-blocked & reflex tachycardia present.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhaeochromocytomaDiagram;

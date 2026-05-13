/**
 * Animated schematic of how ACD-A citrate chelates ionised calcium during
 * intra-operative cell salvage.
 *
 * Left: shed blood entering the suction tubing carries free Ca²⁺.
 * Middle: citrate (Cit³⁻) drips in from the ACD-A line and binds Ca²⁺,
 *         forming an inert Ca–citrate complex.
 * Right: with no free Ca²⁺, the coagulation cascade (II, VII, IX, X) is
 *        halted — blood remains fluid as it enters the reservoir.
 *
 * Pure SVG + SMIL animation; no JS state, no external deps.
 */
const AcdCitrateChelationDiagram = () => {
  return (
            <figure className="w-full rounded-lg border border-border bg-card p-4 my-4">
      <svg
        viewBox="0 0 800 320"
        className="w-full h-auto"
        role="img"
        aria-label="Animated diagram showing ACD-A citrate chelating ionised calcium in cell salvage tubing"
      >
        {/* ===== Suction tubing (horizontal channel) ===== */}
        <defs>
          <linearGradient id="tube-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--muted))" />
            <stop offset="100%" stopColor="hsl(var(--background))" />
          </linearGradient>
          <linearGradient id="blood-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="hsl(0 70% 45%)" stopOpacity="0.85" />
            <stop offset="100%" stopColor="hsl(0 60% 35%)" stopOpacity="0.85" />
          </linearGradient>
        </defs>

        {/* Tubing body */}
        <rect x="20" y="140" width="760" height="60" rx="30" fill="url(#tube-grad)" stroke="hsl(var(--border))" strokeWidth="2" />
        {/* Blood column flowing left → right */}
        <rect x="20" y="148" width="760" height="44" rx="22" fill="url(#blood-grad)" opacity="0.35" />

        {/* Direction-of-flow arrow */}
        <g opacity="0.6">
          <path d="M 720 170 L 750 170 M 745 164 L 752 170 L 745 176" stroke="hsl(var(--foreground))" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <text x="700" y="135" fontSize="11" fill="hsl(var(--muted-foreground))" textAnchor="middle">flow → reservoir</text>
        </g>

        {/* ===== ACD-A drip line entering from above ===== */}
        <line x1="400" y1="20" x2="400" y2="140" stroke="hsl(var(--border))" strokeWidth="2" strokeDasharray="4 3" />
        <rect x="370" y="0" width="60" height="22" rx="4" fill="hsl(var(--accent))" stroke="hsl(var(--border))" />
        <text x="400" y="15" fontSize="11" fill="hsl(var(--accent-foreground))" textAnchor="middle" fontWeight="600">ACD-A</text>

        {/* Falling citrate drops (continuous loop) */}
        {[0, 1.2, 2.4].map((delay) => (
          <g key={`drop-${delay}`}>
            <circle r="6" fill="hsl(var(--accent))" opacity="0.9">
              <animate attributeName="cy" values="25;140" dur="3.6s" begin={`${delay}s`} repeatCount="indefinite" />
              <animate attributeName="cx" values="400;400" dur="3.6s" begin={`${delay}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur="3.6s" begin={`${delay}s`} repeatCount="indefinite" />
            </circle>
            <text fontSize="9" fill="hsl(var(--accent-foreground))" textAnchor="middle" fontWeight="700" pointerEvents="none">
              <animate attributeName="y" values="28;143" dur="3.6s" begin={`${delay}s`} repeatCount="indefinite" />
              <animate attributeName="x" values="400;400" dur="3.6s" begin={`${delay}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur="3.6s" begin={`${delay}s`} repeatCount="indefinite" />
              Cit
            </text>
          </g>
        ))}

        {/* ===== ZONE A — Free Ca²⁺ in shed blood (LEFT) ===== */}
        <text x="130" y="240" fontSize="12" fill="hsl(var(--muted-foreground))" textAnchor="middle" fontWeight="600">
          Shed blood (free Ca²⁺)
        </text>
        {[
          { cx: 70, cy: 170, d: 0 },
          { cx: 110, cy: 180, d: 0.6 },
          { cx: 150, cy: 165, d: 1.2 },
          { cx: 200, cy: 178, d: 1.8 },
          { cx: 250, cy: 168, d: 2.4 },
        ].map((ion, i) => (
          <g key={`ca-${i}`}>
            {/* Ca²⁺ travels left → middle, then disappears (chelated) */}
            <circle r="11" fill="hsl(var(--primary))" stroke="hsl(var(--primary-foreground))" strokeWidth="1.5">
              <animate attributeName="cx" values={`${ion.cx};400`} dur="3.6s" begin={`${ion.d}s`} repeatCount="indefinite" />
              <animate attributeName="cy" values={`${ion.cy};170`} dur="3.6s" begin={`${ion.d}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;1;0" keyTimes="0;0.7;1" dur="3.6s" begin={`${ion.d}s`} repeatCount="indefinite" />
            </circle>
            <text fontSize="9" fill="hsl(var(--primary-foreground))" textAnchor="middle" fontWeight="700" pointerEvents="none">
              <animate attributeName="x" values={`${ion.cx};400`} dur="3.6s" begin={`${ion.d}s`} repeatCount="indefinite" />
              <animate attributeName="y" values={`${ion.cy + 3};173`} dur="3.6s" begin={`${ion.d}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;1;0" keyTimes="0;0.7;1" dur="3.6s" begin={`${ion.d}s`} repeatCount="indefinite" />
              Ca²⁺
            </text>
          </g>
        ))}

        {/* ===== ZONE B — Chelation event (MIDDLE) ===== */}
        <g>
          {/* Pulsing complex marker at the binding zone */}
          <circle cx="400" cy="170" r="22" fill="none" stroke="hsl(var(--accent))" strokeWidth="2" opacity="0">
            <animate attributeName="r" values="14;28;14" dur="1.2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;0.7;0" dur="1.2s" repeatCount="indefinite" />
          </circle>
          <text x="400" y="245" fontSize="12" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="600">
            Ca–citrate complex (inert)
          </text>
          <text x="400" y="262" fontSize="10" fill="hsl(var(--muted-foreground))" textAnchor="middle" fontStyle="italic">
            chelation: 3 Ca²⁺ + 2 Cit³⁻ → Ca₃(Cit)₂
          </text>
        </g>

        {/* ===== ZONE C — Coagulation cascade BLOCKED (RIGHT) ===== */}
        <g transform="translate(560, 100)">
          <rect x="0" y="0" width="200" height="130" rx="8" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="1.5" opacity="0.5" />
          <text x="100" y="20" fontSize="11" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="700">
            Coagulation cascade
          </text>
          {/* Ca²⁺-dependent factors */}
          {[
            { label: "Factor II", y: 42 },
            { label: "Factor VII", y: 60 },
            { label: "Factor IX", y: 78 },
            { label: "Factor X", y: 96 },
          ].map((f) => (
            <g key={f.label}>
              <text x="20" y={f.y} fontSize="10" fill="hsl(var(--muted-foreground))">{f.label}</text>
              {/* Red strike-through pulses to show inhibition */}
              <line x1="80" y1={f.y - 3} x2="180" y2={f.y - 3} stroke="hsl(0 70% 50%)" strokeWidth="2" opacity="0.85">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="1.8s" repeatCount="indefinite" />
              </line>
              <text x="185" y={f.y} fontSize="11" fill="hsl(0 70% 50%)" fontWeight="700">✕</text>
            </g>
          ))}
          <text x="100" y="120" fontSize="9" fill="hsl(var(--muted-foreground))" textAnchor="middle" fontStyle="italic">
            no free Ca²⁺ → no clot
          </text>
        </g>

        {/* Connector arrow: complex → cascade box */}
        <path d="M 425 170 Q 500 150 555 165" fill="none" stroke="hsl(var(--border))" strokeWidth="1.5" strokeDasharray="3 3" />

        {/* ===== Bottom legend ===== */}
        <g transform="translate(20, 290)">
          <circle cx="8" cy="8" r="6" fill="hsl(var(--primary))" />
          <text x="22" y="12" fontSize="10" fill="hsl(var(--muted-foreground))">Ca²⁺ ion</text>

          <circle cx="100" cy="8" r="6" fill="hsl(var(--accent))" />
          <text x="114" y="12" fontSize="10" fill="hsl(var(--muted-foreground))">Citrate (Cit³⁻)</text>

          <line x1="220" y1="8" x2="240" y2="8" stroke="hsl(0 70% 50%)" strokeWidth="2" />
          <text x="246" y="12" fontSize="10" fill="hsl(var(--muted-foreground))">Inhibited Ca²⁺-dependent step</text>
        </g>
      </svg>

      <figcaption className="mt-3 text-xs text-muted-foreground leading-relaxed">
        <strong className="text-foreground">How ACD-A works in cell salvage:</strong> citrate (Cit³⁻) drips into the suction tubing at the operative tip and immediately <em>chelates</em> ionised calcium — the cofactor required at multiple steps of the coagulation cascade (factors II, VII, IX, X). With Ca²⁺ sequestered as inert calcium-citrate, the cascade cannot propagate and shed blood remains fluid through the reservoir. During the centrifuge wash, citrate (and the Ca-citrate complex) partitions into the plasma waste and is decanted, so re-infused red cells carry negligible citrate — systemic hypocalcaemia is rare unless the wash cycle is bypassed.
      </figcaption>
    </figure>
  );
};

export default AcdCitrateChelationDiagram;

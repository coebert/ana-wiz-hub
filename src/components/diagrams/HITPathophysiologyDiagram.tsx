import { DiagramFigure, svgImgProps } from "./_shared/DiagramFigure";

/**
 * HIT type II pathophysiology — IgG vs PF4-heparin → FcγRIIa platelet activation.
 */
const HITPathophysiologyDiagram = () => {
  const id = "hit-pathophys";
  return (
    <DiagramFigure
      id={id}
      title="HIT type II pathophysiology — PF4–heparin immune complex drives prothrombotic platelet activation"
      description="Heparin binds platelet factor 4 forming a neoantigen. IgG anti-PF4/heparin complexes cross-link FcγRIIa on platelets and monocytes, triggering platelet activation, thrombin generation and microparticle release — producing thrombocytopenia AND paradoxical thrombosis."
      showCaption
    >
      <svg
        viewBox="0 0 820 360"
        className="w-full h-auto rounded-lg border border-border bg-card p-3 my-3"
        {...svgImgProps({ id })}
      >
        <title id={`${id}-title`}>HIT pathophysiology</title>
        <desc id={`${id}-desc`}>
          Heparin–PF4 complexes act as neoantigen for IgG; cross-linked FcγRIIa receptors activate
          platelets, generating thrombin and producing prothrombotic thrombocytopenia.
        </desc>

        <defs>
          <marker id="hit-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0 L10 5 L0 10 z" fill="hsl(var(--foreground))" />
          </marker>
        </defs>

        {/* Step 1: Heparin + PF4 */}
        <g>
          <text x="20" y="35" fontSize="12" fontWeight="700" fill="hsl(var(--foreground))">1. Neoantigen</text>
          <circle cx="60" cy="80" r="14" fill="hsl(var(--icu))" />
          <text x="50" y="84" fontSize="9" fill="hsl(var(--background))" fontWeight="700">PF4</text>
          <text x="42" y="115" fontSize="9" fill="hsl(var(--muted-foreground))">platelet factor 4</text>

          <path d="M85 80 Q100 70 115 80" stroke="hsl(var(--warn, 38 92% 50%))" strokeWidth="3" fill="none" />
          <text x="85" y="65" fontSize="9" fill="hsl(var(--warn, 38 92% 50%))" fontWeight="600">heparin</text>

          <circle cx="135" cy="80" r="14" fill="hsl(var(--icu))" />
          <text x="125" y="84" fontSize="9" fill="hsl(var(--background))" fontWeight="700">PF4</text>

          <text x="40" y="135" fontSize="9" fontStyle="italic" fill="hsl(var(--muted-foreground))">PF4–heparin complex</text>
        </g>

        <path d="M160 90 L210 90" stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd="url(#hit-arr)" />

        {/* Step 2: IgG binds */}
        <g>
          <text x="220" y="35" fontSize="12" fontWeight="700" fill="hsl(var(--foreground))">2. IgG response</text>
          {/* Y-shaped antibody */}
          <g transform="translate(260 80)">
            <line x1="0" y1="0" x2="-12" y2="-18" stroke="hsl(var(--destructive))" strokeWidth="3" />
            <line x1="0" y1="0" x2="12" y2="-18" stroke="hsl(var(--destructive))" strokeWidth="3" />
            <line x1="0" y1="0" x2="0" y2="14" stroke="hsl(var(--destructive))" strokeWidth="3" />
          </g>
          <text x="240" y="125" fontSize="9" fill="hsl(var(--destructive))" fontWeight="600">IgG anti-PF4/heparin</text>
          <text x="252" y="138" fontSize="9" fill="hsl(var(--muted-foreground))">(day 5–10)</text>
        </g>

        <path d="M310 90 L360 90" stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd="url(#hit-arr)" />

        {/* Step 3: FcγRIIa cross-link on platelet */}
        <g>
          <text x="370" y="35" fontSize="12" fontWeight="700" fill="hsl(var(--foreground))">3. FcγRIIa cross-link</text>
          <ellipse cx="440" cy="100" rx="48" ry="28" fill="hsl(var(--warn, 38 92% 50%) / 0.3)" stroke="hsl(var(--warn, 38 92% 50%))">
            <animate attributeName="rx" values="46;52;46" dur="1.5s" repeatCount="indefinite" />
          </ellipse>
          <text x="416" y="105" fontSize="11" fontWeight="700" fill="hsl(var(--foreground))">Platelet</text>
          {/* receptors */}
          {[-30, -10, 10, 30].map((dx) => (
            <rect key={dx} x={440 + dx - 4} y={72} width="8" height="6" fill="hsl(var(--foreground))" />
          ))}
          <text x="402" y="68" fontSize="8" fill="hsl(var(--muted-foreground))">FcγRIIa</text>
        </g>

        {/* Activation downstream */}
        <path d="M440 130 L440 175" stroke="hsl(var(--destructive))" strokeWidth="2" markerEnd="url(#hit-arr)" />
        <g>
          <rect x="320" y="180" width="240" height="60" rx="8" fill="hsl(var(--destructive) / 0.1)" stroke="hsl(var(--destructive))" />
          <text x="332" y="200" fontSize="11" fontWeight="700" fill="hsl(var(--destructive))">Platelet activation + microparticles</text>
          <text x="332" y="218" fontSize="10" fill="hsl(var(--muted-foreground))">→ massive thrombin generation</text>
          <text x="332" y="234" fontSize="10" fill="hsl(var(--muted-foreground))">→ monocyte tissue factor expression</text>
        </g>

        {/* Two consequences */}
        <path d="M380 240 Q280 270 200 280" stroke="hsl(var(--foreground))" strokeWidth="1.5" fill="none" markerEnd="url(#hit-arr)" />
        <path d="M500 240 Q600 270 690 280" stroke="hsl(var(--foreground))" strokeWidth="1.5" fill="none" markerEnd="url(#hit-arr)" />

        <g>
          <rect x="20" y="270" width="220" height="80" rx="8" fill="hsl(var(--warn, 38 92% 50%) / 0.1)" stroke="hsl(var(--warn, 38 92% 50%))" />
          <text x="32" y="292" fontSize="11" fontWeight="700" fill="hsl(var(--warn, 38 92% 50%))">Thrombocytopenia</text>
          <text x="32" y="310" fontSize="10" fill="hsl(var(--muted-foreground))">Consumption + clearance</text>
          <text x="32" y="326" fontSize="10" fill="hsl(var(--muted-foreground))">↓ ≥50% from baseline</text>
          <text x="32" y="342" fontSize="10" fill="hsl(var(--muted-foreground))">Nadir 40–80 ×10⁹/L</text>
        </g>

        <g>
          <rect x="580" y="270" width="220" height="80" rx="8" fill="hsl(var(--destructive) / 0.1)" stroke="hsl(var(--destructive))" />
          <text x="592" y="292" fontSize="11" fontWeight="700" fill="hsl(var(--destructive))">Paradoxical thrombosis</text>
          <text x="592" y="310" fontSize="10" fill="hsl(var(--muted-foreground))">Venous &gt; arterial (DVT/PE)</text>
          <text x="592" y="326" fontSize="10" fill="hsl(var(--muted-foreground))">Limb ischaemia, skin necrosis</text>
          <text x="592" y="342" fontSize="10" fill="hsl(var(--muted-foreground))">30-day risk ~50% if untreated</text>
        </g>

        {/* 4Ts hint */}
        <text x="280" y="335" fontSize="10" fontWeight="700" fill="hsl(var(--icu))">4Ts ≥4 → stop ALL heparin · argatroban / bivalirudin</text>
      </svg>
    </DiagramFigure>
  );
};

export default HITPathophysiologyDiagram;

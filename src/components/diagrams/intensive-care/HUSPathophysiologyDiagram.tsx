import { DiagramFigure, svgImgProps } from "./_shared/DiagramFigure";

/**
 * HUS pathophysiology — STEC vs atypical (complement) HUS.
 */
const HUSPathophysiologyDiagram = () => {
  const id = "hus-pathophys";
  return (
    <DiagramFigure
      id={id}
      title="HUS pathophysiology — Shiga toxin vs complement dysregulation"
      description="STEC-HUS: Shiga toxin binds Gb3 on glomerular endothelium → apoptosis and microthrombi. aHUS: uncontrolled alternative complement pathway → MAC-mediated endothelial injury; eculizumab blocks C5."
      showCaption
    >
      <svg
        viewBox="0 0 820 380"
        className="w-full h-auto rounded-lg border border-border bg-card p-3 my-3"
        {...svgImgProps({ id })}
      >
        <title id={`${id}-title`}>HUS pathophysiology</title>
        <desc id={`${id}-desc`}>
          Two mechanisms converge on glomerular endothelial injury: Shiga toxin Gb3 binding in
          STEC-HUS, and unregulated alternative complement activation in atypical HUS.
        </desc>

        {/* Divider */}
        <line x1="410" y1="20" x2="410" y2="360" stroke="hsl(var(--border))" strokeDasharray="4 4" />

        {/* LEFT — STEC */}
        <text x="20" y="35" fontSize="13" fontWeight="700" fill="hsl(var(--icu))">STEC-HUS (typical)</text>

        {/* Bacterium */}
        <ellipse cx="80" cy="80" rx="22" ry="14" fill="hsl(var(--warn, 38 92% 50%))" stroke="hsl(var(--foreground))" />
        <text x="58" y="115" fontSize="10" fill="hsl(var(--muted-foreground))">E. coli O157:H7</text>

        {/* Shiga toxin particles travelling */}
        {[0, 0.6, 1.2].map((d, i) => (
          <g key={i}>
            <circle r="6" fill="hsl(var(--destructive))">
              <animateMotion dur="3s" begin={`${d}s`} repeatCount="indefinite" path="M100 80 Q200 60 300 140" />
            </circle>
          </g>
        ))}
        <text x="160" y="55" fontSize="10" fill="hsl(var(--destructive))" fontWeight="600">Shiga toxin</text>

        {/* Glomerular endothelial cell */}
        <rect x="280" y="140" width="100" height="50" rx="6" fill="hsl(var(--muted))" stroke="hsl(var(--border))" />
        <text x="288" y="160" fontSize="10" fill="hsl(var(--foreground))">Glomerular</text>
        <text x="288" y="175" fontSize="10" fill="hsl(var(--foreground))">endothelium</text>
        {/* Gb3 receptor */}
        <circle cx="290" cy="142" r="4" fill="hsl(var(--success, 142 70% 40%))" />
        <text x="245" y="135" fontSize="9" fill="hsl(var(--success, 142 70% 40%))">Gb3</text>

        {/* Outcome arrows */}
        <path d="M330 195 L330 245" stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd="url(#arr-l)" />
        <defs>
          <marker id="arr-l" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0 0 L10 5 L0 10 z" fill="hsl(var(--foreground))" />
          </marker>
          <marker id="arr-r" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0 0 L10 5 L0 10 z" fill="hsl(var(--foreground))" />
          </marker>
        </defs>
        <rect x="240" y="250" width="180" height="90" rx="6" fill="hsl(var(--destructive) / 0.08)" stroke="hsl(var(--destructive) / 0.4)" />
        <text x="250" y="270" fontSize="11" fontWeight="600" fill="hsl(var(--destructive))">Endothelial apoptosis</text>
        <text x="250" y="288" fontSize="10" fill="hsl(var(--muted-foreground))">→ platelet activation</text>
        <text x="250" y="304" fontSize="10" fill="hsl(var(--muted-foreground))">→ glomerular microthrombi</text>
        <text x="250" y="320" fontSize="10" fill="hsl(var(--muted-foreground))">→ MAHA + AKI</text>
        <text x="250" y="336" fontSize="10" fill="hsl(var(--muted-foreground))">Antibiotics ↑ toxin release</text>

        {/* RIGHT — aHUS */}
        <text x="430" y="35" fontSize="13" fontWeight="700" fill="hsl(var(--icu))">Atypical HUS (complement)</text>

        {/* Complement cascade */}
        <g fontFamily="inherit">
          <rect x="450" y="60" width="60" height="26" rx="4" fill="hsl(var(--secondary))" stroke="hsl(var(--border))" />
          <text x="460" y="78" fontSize="11" fill="hsl(var(--foreground))">C3</text>
          <path d="M510 73 L555 73" stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd="url(#arr-r)" />
          <rect x="555" y="60" width="60" height="26" rx="4" fill="hsl(var(--secondary))" stroke="hsl(var(--border))" />
          <text x="563" y="78" fontSize="11" fill="hsl(var(--foreground))">C3b</text>
          <path d="M615 73 L660 73" stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd="url(#arr-r)" />
          <rect x="660" y="60" width="60" height="26" rx="4" fill="hsl(var(--secondary))" stroke="hsl(var(--border))" />
          <text x="673" y="78" fontSize="11" fill="hsl(var(--foreground))">C5</text>
          <path d="M720 73 L765 73" stroke="hsl(var(--destructive))" strokeWidth="2" markerEnd="url(#arr-r)" />
          <rect x="710" y="100" width="80" height="26" rx="4" fill="hsl(var(--destructive) / 0.15)" stroke="hsl(var(--destructive))" />
          <text x="725" y="118" fontSize="11" fontWeight="600" fill="hsl(var(--destructive))">MAC C5b-9</text>
          <path d="M740 100 L740 90" stroke="hsl(var(--destructive))" strokeWidth="2" markerEnd="url(#arr-r)" />
        </g>

        {/* Loss of regulators */}
        <text x="430" y="160" fontSize="10" fill="hsl(var(--warn, 38 92% 50%))" fontWeight="600">Loss of regulators (CFH, CFI, MCP)</text>
        <text x="430" y="175" fontSize="10" fill="hsl(var(--muted-foreground))">→ unregulated amplification loop</text>

        {/* Eculizumab block */}
        <g>
          <text x="600" y="180" fontSize="11" fontWeight="700" fill="hsl(var(--success, 142 70% 40%))">Eculizumab</text>
          <line x1="600" y1="185" x2="720" y2="100" stroke="hsl(var(--success, 142 70% 40%))" strokeWidth="2.5" strokeDasharray="3 3" />
          <text x="600" y="195" fontSize="9" fill="hsl(var(--muted-foreground))">anti-C5 → blocks MAC</text>
        </g>

        {/* Endothelial injury panel */}
        <rect x="430" y="220" width="370" height="120" rx="6" fill="hsl(var(--destructive) / 0.06)" stroke="hsl(var(--destructive) / 0.4)" />
        <text x="442" y="242" fontSize="11" fontWeight="600" fill="hsl(var(--destructive))">Endothelial MAC insertion</text>
        <text x="442" y="262" fontSize="10" fill="hsl(var(--muted-foreground))">→ swelling, denudation, vWF release</text>
        <text x="442" y="280" fontSize="10" fill="hsl(var(--muted-foreground))">→ platelet activation, microthrombi</text>
        <text x="442" y="298" fontSize="10" fill="hsl(var(--muted-foreground))">→ severe AKI, often progressive ESRD</text>
        <text x="442" y="320" fontSize="10" fill="hsl(var(--muted-foreground))">Triggers: pregnancy, infection, drugs</text>
      </svg>
    </DiagramFigure>
  );
};

export default HUSPathophysiologyDiagram;

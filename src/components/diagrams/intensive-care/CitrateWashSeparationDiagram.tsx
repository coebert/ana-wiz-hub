import { DiagramFigure } from "../_shared/DiagramFigure";
/**
 * Animated schematic of how citrate (free Cit³⁻) and the Ca–citrate complex
 * are removed from salvaged blood during the centrifuge wash cycle.
 *
 * Left: spinning bell-shaped bowl. Centrifugal force sediments dense RBCs
 *       to the periphery; lighter plasma + citrate + Ca-citrate + free Hb
 *       form the inner ("buffy/plasma") layer.
 * Middle: 0.9% saline wash flushes the inner layer outward.
 * Right: waste bag fills with decanted plasma + citrate + Ca-citrate;
 *        washed packed red cells remain in the bowl for re-infusion.
 *
 * Pure SVG + SMIL animation; no JS state, no external deps.
 */
const CitrateWashSeparationDiagram = () => {
  return (
    <DiagramFigure
      id="citrate-wash-separation-diagram"
      title="Citrate wash separation"
      description="Animated schematic of how citrate (free Cit³⁻) and the Ca–citrate complex are removed from salvaged blood during the centrifuge wash cycle. Left: spinning bell-shaped bowl."
    >
                  <figure className="w-full rounded-lg border border-border bg-card p-4 my-4">
        <svg
          viewBox="0 0 800 340"
          className="w-full h-auto"
          role="img"
          aria-label="Animated diagram showing centrifuge wash cycle separating citrate and Ca-citrate into the plasma waste bag, leaving washed packed red cells"
        >
          <defs>
            <radialGradient id="rbc-grad" cx="50%" cy="50%" r="50%">
              <stop offset="60%" stopColor="hsl(0 60% 35%)" stopOpacity="0" />
              <stop offset="80%" stopColor="hsl(0 70% 40%)" stopOpacity="0.85" />
              <stop offset="100%" stopColor="hsl(0 75% 30%)" stopOpacity="0.95" />
            </radialGradient>
            <radialGradient id="plasma-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(45 80% 70%)" stopOpacity="0.7" />
              <stop offset="70%" stopColor="hsl(45 70% 60%)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="hsl(45 70% 60%)" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="waste-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(45 60% 55%)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="hsl(45 70% 45%)" stopOpacity="0.7" />
            </linearGradient>
            <linearGradient id="saline-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(200 80% 90%)" />
              <stop offset="100%" stopColor="hsl(200 70% 75%)" />
            </linearGradient>
          </defs>
  
          {/* ===== LEFT: Saline wash bag ===== */}
          <g transform="translate(20, 20)">
            <rect x="10" y="0" width="80" height="70" rx="6" fill="url(#saline-grad)" stroke="hsl(var(--border))" strokeWidth="1.5" />
            <text x="50" y="40" fontSize="11" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="700">0.9%</text>
            <text x="50" y="54" fontSize="11" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="700">saline</text>
            {/* Drip line down to bowl */}
            <line x1="50" y1="70" x2="50" y2="155" stroke="hsl(var(--border))" strokeWidth="2" strokeDasharray="3 3" />
            {/* Saline droplets falling into bowl */}
            {[0, 0.9, 1.8].map((d) => (
              <circle key={`sal-${d}`} cx="50" r="4" fill="hsl(200 80% 70%)" opacity="0.9">
                <animate attributeName="cy" values="72;155" dur="2.7s" begin={`${d}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur="2.7s" begin={`${d}s`} repeatCount="indefinite" />
              </circle>
            ))}
          </g>
  
          {/* ===== CENTRE: Spinning centrifuge bowl ===== */}
          <g transform="translate(220, 60)">
            {/* Bell housing outline */}
            <path
              d="M 30 30 L 30 180 Q 30 200 60 200 L 200 200 Q 230 200 230 180 L 230 30 Q 230 10 200 10 L 60 10 Q 30 10 30 30 Z"
              fill="hsl(var(--muted))"
              stroke="hsl(var(--border))"
              strokeWidth="2"
              opacity="0.4"
            />
  
            {/* Spinning content group — rotates around bowl centre */}
            <g style={{ transformOrigin: "130px 105px" }}>
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 130 105"
                to="360 130 105"
                dur="1.2s"
                repeatCount="indefinite"
              />
  
              {/* Outer RBC layer (dense — sediments to periphery) */}
              <ellipse cx="130" cy="105" rx="92" ry="92" fill="url(#rbc-grad)" />
  
              {/* Inner plasma + citrate layer */}
              <ellipse cx="130" cy="105" rx="55" ry="55" fill="url(#plasma-grad)" />
  
              {/* Floating citrate (Cit) markers in inner layer */}
              {[
                { x: 110, y: 80 },
                { x: 145, y: 95 },
                { x: 120, y: 125 },
                { x: 150, y: 120 },
              ].map((p, i) => (
                <text key={`cit-${i}`} x={p.x} y={p.y} fontSize="10" fill="hsl(var(--accent))" fontWeight="700" textAnchor="middle">
                  Cit
                </text>
              ))}
  
              {/* Ca-citrate complex markers */}
              {[
                { x: 125, y: 100 },
                { x: 138, y: 115 },
              ].map((p, i) => (
                <g key={`cacit-${i}`}>
                  <circle cx={p.x} cy={p.y} r="6" fill="hsl(var(--accent))" opacity="0.75" />
                  <text x={p.x} y={p.y + 3} fontSize="7" fill="hsl(var(--accent-foreground))" textAnchor="middle" fontWeight="700">
                    Ca·Cit
                  </text>
                </g>
              ))}
            </g>
  
            {/* Static labels (do not spin) */}
            <text x="130" y="225" fontSize="11" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="600">
              Centrifuge bowl
            </text>
            <text x="130" y="240" fontSize="9" fill="hsl(var(--muted-foreground))" textAnchor="middle" fontStyle="italic">
              ~5000 rpm
            </text>
  
            {/* Layer annotations */}
            <text x="40" y="105" fontSize="9" fill="hsl(0 70% 40%)" fontWeight="700">RBCs</text>
            <text x="40" y="118" fontSize="8" fill="hsl(var(--muted-foreground))">(retained)</text>
  
            <text x="135" y="60" fontSize="9" fill="hsl(45 60% 35%)" fontWeight="700" textAnchor="middle">plasma + citrate</text>
  
            {/* Outflow port → waste bag */}
            <path d="M 230 90 L 280 90" stroke="hsl(var(--border))" strokeWidth="2" />
            <path d="M 275 84 L 282 90 L 275 96" stroke="hsl(var(--foreground))" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <text x="255" y="78" fontSize="10" fill="hsl(var(--muted-foreground))" textAnchor="middle" fontStyle="italic">decant</text>
          </g>
  
          {/* ===== Particles flowing from bowl → waste bag ===== */}
          {[
            { label: "Cit", color: "hsl(var(--accent))", delay: 0 },
            { label: "Ca·Cit", color: "hsl(var(--accent))", delay: 0.7 },
            { label: "Cit", color: "hsl(var(--accent))", delay: 1.4 },
            { label: "Ca·Cit", color: "hsl(var(--accent))", delay: 2.1 },
          ].map((p, i) => (
            <g key={`flow-${i}`}>
              <circle r="9" fill={p.color} opacity="0.85">
                <animate attributeName="cx" values="450;620" dur="2.8s" begin={`${p.delay}s`} repeatCount="indefinite" />
                <animate attributeName="cy" values="150;235" dur="2.8s" begin={`${p.delay}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur="2.8s" begin={`${p.delay}s`} repeatCount="indefinite" />
              </circle>
              <text fontSize="7" fill="hsl(var(--accent-foreground))" textAnchor="middle" fontWeight="700" pointerEvents="none">
                <animate attributeName="x" values="450;620" dur="2.8s" begin={`${p.delay}s`} repeatCount="indefinite" />
                <animate attributeName="y" values="153;238" dur="2.8s" begin={`${p.delay}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur="2.8s" begin={`${p.delay}s`} repeatCount="indefinite" />
                {p.label}
              </text>
            </g>
          ))}
  
          {/* ===== RIGHT: Waste bag ===== */}
          <g transform="translate(580, 180)">
            <path
              d="M 10 10 L 90 10 L 100 30 L 100 130 Q 100 140 90 140 L 10 140 Q 0 140 0 130 L 0 30 Z"
              fill="url(#waste-grad)"
              stroke="hsl(var(--border))"
              strokeWidth="1.5"
            />
            <text x="50" y="28" fontSize="10" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="700">WASTE</text>
            <text x="50" y="58" fontSize="9" fill="hsl(var(--muted-foreground))" textAnchor="middle">plasma</text>
            <text x="50" y="72" fontSize="9" fill="hsl(var(--muted-foreground))" textAnchor="middle">citrate</text>
            <text x="50" y="86" fontSize="9" fill="hsl(var(--muted-foreground))" textAnchor="middle">Ca-citrate</text>
            <text x="50" y="100" fontSize="9" fill="hsl(var(--muted-foreground))" textAnchor="middle">free Hb, K⁺</text>
            <text x="50" y="114" fontSize="9" fill="hsl(var(--muted-foreground))" textAnchor="middle">cytokines</text>
          </g>
  
          {/* ===== Bottom outcome strip — washed RBCs returned to patient ===== */}
          <g transform="translate(60, 290)">
            <rect x="0" y="0" width="680" height="38" rx="8" fill="hsl(0 70% 45%)" opacity="0.15" stroke="hsl(0 70% 45%)" strokeWidth="1.5" strokeDasharray="4 3" />
            <circle cx="22" cy="19" r="9" fill="hsl(0 70% 40%)" />
            <text x="22" y="22" fontSize="9" fill="hsl(0 0% 100%)" textAnchor="middle" fontWeight="700">RBC</text>
            <text x="48" y="16" fontSize="11" fill="hsl(var(--foreground))" fontWeight="700">Washed packed red cells →</text>
            <text x="48" y="30" fontSize="10" fill="hsl(var(--muted-foreground))">
              Hct 50–70%, negligible citrate, normal 2,3-DPG, normal K⁺ — re-infused via 40 µm filter
            </text>
          </g>
  
          {/* Legend */}
          <g transform="translate(20, 250)">
            <text x="0" y="10" fontSize="10" fill="hsl(var(--accent))" fontWeight="700">Cit</text>
            <text x="22" y="10" fontSize="9" fill="hsl(var(--muted-foreground))">free citrate</text>
  
            <circle cx="100" cy="7" r="5" fill="hsl(var(--accent))" opacity="0.8" />
            <text x="110" y="10" fontSize="9" fill="hsl(var(--muted-foreground))">Ca-citrate complex</text>
          </g>
        </svg>
  
        <figcaption className="mt-3 text-xs text-muted-foreground leading-relaxed">
          <strong className="text-foreground">Why systemic citrate toxicity is rare:</strong> in the spinning bowl, dense RBCs sediment to the periphery while lighter plasma — carrying free citrate, the Ca-citrate complex, free haemoglobin, K⁺ and inflammatory cytokines — forms the inner layer. A <strong>1–1.5 L 0.9% saline wash</strong> displaces this inner layer outward through the decant port into the waste bag. The packed red cells that return to the patient are essentially citrate-free, so the patient does not receive a calcium-chelating load — provided the wash cycle is not bypassed (e.g. emergency unwashed return) or shortened. Massive transfusion of unwashed salvaged blood, by contrast, can produce ionised hypocalcaemia and metabolic alkalosis (citrate → bicarbonate in the liver).
        </figcaption>
      </figure>
    </DiagramFigure>
  );
};

export default CitrateWashSeparationDiagram;

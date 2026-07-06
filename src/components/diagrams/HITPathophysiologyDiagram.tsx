import { DiagramFigure, svgImgProps } from "./_shared/DiagramFigure";
import { Cite } from "@/components/references/Cite";

/**
 * HIT type II pathophysiology — 4-step cascade with animated mediator flow.
 *
 * Step 1: Heparin binds PF4 → conformational neoantigen
 * Step 2: B cells generate IgG anti-PF4/heparin (day 5–10)
 * Step 3: Immune complexes cross-link FcγRIIa on platelets (and monocytes)
 * Step 4: Platelet activation, microparticle release, thrombin burst, TF expression
 *
 * Two consequences branch from the activated platelet:
 *   • Thrombocytopenia (consumption + clearance)
 *   • Paradoxical thrombosis (venous > arterial)
 */
const HITPathophysiologyDiagram = () => {
  const id = "hit-pathophys";

  // Reusable numbered step badge
  const stepBadge = (cx: number, cy: number, n: number) => (
    <g>
      <circle cx={cx} cy={cy} r="11" fill="hsl(var(--icu))" />
      <text
        x={cx}
        y={cy + 4}
        fontSize="12"
        fontWeight="700"
        textAnchor="middle"
        fill="hsl(var(--primary-foreground))"
      >
        {n}
      </text>
    </g>
  );

  // PF4 tetramer glyph
  const PF4 = ({ cx, cy }: { cx: number; cy: number }) => (
    <g>
      <circle cx={cx} cy={cy} r="13" fill="hsl(var(--icu))" stroke="hsl(var(--icu))" strokeWidth="0.5" />
      <text x={cx} y={cy + 3} fontSize="9" fontWeight="700" textAnchor="middle" fill="hsl(var(--primary-foreground))">
        PF4
      </text>
    </g>
  );

  // Y-shaped IgG glyph
  const IgG = ({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) => (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <line x1="0" y1="0" x2="-12" y2="-18" stroke="hsl(var(--destructive))" strokeWidth="3" strokeLinecap="round" />
      <line x1="0" y1="0" x2="12" y2="-18" stroke="hsl(var(--destructive))" strokeWidth="3" strokeLinecap="round" />
      <line x1="0" y1="0" x2="0" y2="14" stroke="hsl(var(--destructive))" strokeWidth="3" strokeLinecap="round" />
      <circle cx="-12" cy="-18" r="3" fill="hsl(var(--destructive))" />
      <circle cx="12" cy="-18" r="3" fill="hsl(var(--destructive))" />
    </g>
  );

  return (
    <DiagramFigure
      id={id}
      title="HIT type II pathophysiology — PF4–heparin immune complex drives prothrombotic platelet activation"
      description="Heparin binds platelet factor 4 forming a neoantigen. IgG anti-PF4/heparin immune complexes cross-link FcγRIIa on platelets and monocytes, triggering massive platelet activation, microparticle release, thrombin generation and tissue-factor expression — producing thrombocytopenia AND paradoxical thrombosis."
      showCaption
    >
      <svg
        viewBox="0 0 860 520"
        className="w-full h-auto rounded-lg border border-border bg-card p-3 my-3"
        {...svgImgProps({ id })}
      >
        <title id={`${id}-title`}>HIT type II pathophysiology cascade</title>
        <desc id={`${id}-desc`}>
          Four-step cascade: heparin binds PF4 to form a neoantigen; IgG against the
          PF4–heparin complex appears around days 5–10; immune complexes cross-link
          FcγRIIa receptors on platelets and monocytes; resulting platelet activation
          releases procoagulant microparticles and triggers a thrombin burst, producing
          both thrombocytopenia and paradoxical venous and arterial thrombosis.
        </desc>

        <defs>
          <marker id={`${id}-arr`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0 L10 5 L0 10 z" fill="hsl(var(--foreground))" />
          </marker>
          <marker id={`${id}-arr-bad`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0 L10 5 L0 10 z" fill="hsl(var(--destructive))" />
          </marker>
        </defs>

        {/* ─────────────── Lane backgrounds ─────────────── */}
        <rect x="10" y="50" width="200" height="170" rx="8" fill="hsl(var(--muted) / 0.4)" stroke="hsl(var(--border))" />
        <rect x="220" y="50" width="190" height="170" rx="8" fill="hsl(var(--muted) / 0.4)" stroke="hsl(var(--border))" />
        <rect x="420" y="50" width="220" height="170" rx="8" fill="hsl(var(--muted) / 0.4)" stroke="hsl(var(--border))" />
        <rect x="650" y="50" width="200" height="170" rx="8" fill="hsl(var(--destructive) / 0.08)" stroke="hsl(var(--destructive))" />

        {/* ─────────────── STEP 1 — Neoantigen ─────────────── */}
        {stepBadge(30, 70, 1)}
        <text x="48" y="74" fontSize="12" fontWeight="700" fill="hsl(var(--foreground))">
          Heparin + PF4 → neoantigen
        </text>

        {/* PF4 tetramer */}
        <PF4 cx={70} cy={140} />
        <PF4 cx={150} cy={140} />

        {/* Animated heparin chain sliding in to bind PF4s */}
        <path
          d="M50 140 Q110 110 170 140"
          stroke="hsl(38 92% 50%)"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="6 4"
        >
          <animate attributeName="stroke-dashoffset" from="40" to="0" dur="2s" repeatCount="indefinite" />
        </path>
        <text x="85" y="105" fontSize="10" fontWeight="600" fill="hsl(38 92% 40%)">
          heparin
        </text>

        <text x="55" y="180" fontSize="9" fontStyle="italic" fill="hsl(var(--muted-foreground))">
          conformational change
        </text>
        <text x="50" y="195" fontSize="10" fontWeight="600" fill="hsl(var(--icu))">
          PF4–heparin complex
        </text>

        {/* Step 1 → Step 2 arrow with travelling particle */}
        <path
          d="M210 135 L220 135"
          stroke="hsl(var(--foreground))"
          strokeWidth="1.5"
          markerEnd={`url(#${id}-arr)`}
        />

        {/* ─────────────── STEP 2 — IgG response ─────────────── */}
        {stepBadge(240, 70, 2)}
        <text x="258" y="74" fontSize="12" fontWeight="700" fill="hsl(var(--foreground))">
          B-cell IgG response
        </text>

        {/* IgG appearing (fade in, days 5–10) */}
        <g>
          <IgG x={290} y={140} />
          <animate
            attributeName="opacity"
            values="0;1;1"
            dur="3s"
            repeatCount="indefinite"
            begin="0s"
          />
        </g>
        <g>
          <IgG x={340} y={155} scale={0.85} />
        </g>
        <g>
          <IgG x={370} y={130} scale={0.7} />
        </g>

        <text x="240" y="195" fontSize="10" fontWeight="600" fill="hsl(var(--destructive))">
          IgG anti-PF4/heparin
        </text>
        <text x="240" y="208" fontSize="9" fill="hsl(var(--muted-foreground))">
          appears day 5–10 (or &lt;1 d if re-exposed)
        </text>

        {/* Step 2 → Step 3 arrow */}
        <path
          d="M410 135 L420 135"
          stroke="hsl(var(--foreground))"
          strokeWidth="1.5"
          markerEnd={`url(#${id}-arr)`}
        />

        {/* ─────────────── STEP 3 — Cross-linking ─────────────── */}
        {stepBadge(440, 70, 3)}
        <text x="458" y="74" fontSize="12" fontWeight="700" fill="hsl(var(--foreground))">
          FcγRIIa cross-linking
        </text>

        {/* Two PF4–heparin–IgG complexes bridging two FcγRIIa receptors */}
        {/* Platelet membrane strip */}
        <rect x="430" y="180" width="200" height="14" rx="3" fill="hsl(38 92% 50% / 0.3)" stroke="hsl(38 92% 45%)" />
        <text x="510" y="213" fontSize="9" fill="hsl(var(--muted-foreground))" textAnchor="middle">
          platelet membrane
        </text>

        {/* Two FcγRIIa receptors */}
        {[465, 595].map((x, i) => (
          <g key={i}>
            <rect x={x - 5} y={170} width="10" height="14" fill="hsl(var(--foreground))" />
            <text x={x} y={166} fontSize="8" textAnchor="middle" fill="hsl(var(--muted-foreground))">
              FcγRIIa
            </text>
          </g>
        ))}

        {/* Two PF4–heparin complexes sitting on top of IgG Fab arms */}
        <PF4 cx={485} cy={120} />
        <PF4 cx={575} cy={120} />
        <path
          d="M498 120 Q530 100 562 120"
          stroke="hsl(38 92% 50%)"
          strokeWidth="2.5"
          fill="none"
          strokeDasharray="5 3"
        >
          <animate attributeName="stroke-dashoffset" from="32" to="0" dur="2s" repeatCount="indefinite" />
        </path>

        {/* IgG bridging — Fab to PF4, Fc to receptor */}
        <g>
          <line x1="465" y1="170" x2="478" y2="135" stroke="hsl(var(--destructive))" strokeWidth="3" strokeLinecap="round" />
          <line x1="595" y1="170" x2="582" y2="135" stroke="hsl(var(--destructive))" strokeWidth="3" strokeLinecap="round" />
          <line x1="478" y1="135" x2="582" y2="135" stroke="hsl(var(--destructive))" strokeWidth="3" strokeLinecap="round" />
          {/* Subtle pulse to suggest cross-linking tension */}
          <animate attributeName="opacity" values="0.85;1;0.85" dur="1.6s" repeatCount="indefinite" />
        </g>

        <text x="530" y="60" fontSize="9" textAnchor="middle" fill="hsl(var(--destructive))" fontWeight="600">
          immune complex bridges 2 receptors
        </text>

        {/* Step 3 → Step 4 arrow */}
        <path
          d="M640 135 L650 135"
          stroke="hsl(var(--destructive))"
          strokeWidth="1.5"
          markerEnd={`url(#${id}-arr-bad)`}
        />

        {/* ─────────────── STEP 4 — Activation ─────────────── */}
        {stepBadge(670, 70, 4)}
        <text x="688" y="74" fontSize="12" fontWeight="700" fill="hsl(var(--destructive))">
          Platelet activation
        </text>

        {/* Pulsing activated platelet */}
        <ellipse cx="750" cy="135" rx="36" ry="22" fill="hsl(var(--destructive) / 0.25)" stroke="hsl(var(--destructive))" strokeWidth="1.5">
          <animate attributeName="rx" values="34;40;34" dur="1.2s" repeatCount="indefinite" />
          <animate attributeName="ry" values="20;26;20" dur="1.2s" repeatCount="indefinite" />
        </ellipse>
        <text x="750" y="139" fontSize="10" fontWeight="700" textAnchor="middle" fill="hsl(var(--destructive))">
          ACTIVATED
        </text>

        {/* Microparticles spinning off */}
        {[
          { x: 705, y: 100, dx: -25, dy: -20 },
          { x: 795, y: 100, dx: 25, dy: -25 },
          { x: 700, y: 175, dx: -28, dy: 25 },
          { x: 800, y: 175, dx: 30, dy: 22 },
        ].map((m, i) => (
          <circle key={i} cx={m.x} cy={m.y} r="3" fill="hsl(var(--destructive))">
            <animate
              attributeName="cx"
              values={`750;${m.x + m.dx}`}
              dur="1.6s"
              begin={`${i * 0.2}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="cy"
              values={`135;${m.y + m.dy}`}
              dur="1.6s"
              begin={`${i * 0.2}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="1;0"
              dur="1.6s"
              begin={`${i * 0.2}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
        <text x="750" y="208" fontSize="9" textAnchor="middle" fill="hsl(var(--destructive))" fontWeight="600">
          → procoagulant microparticles
        </text>

        {/* ─────────────── Downstream effector box ─────────────── */}
        <path
          d="M750 220 L750 250"
          stroke="hsl(var(--destructive))"
          strokeWidth="2"
          markerEnd={`url(#${id}-arr-bad)`}
        />

        <rect x="200" y="255" width="460" height="70" rx="8" fill="hsl(var(--destructive) / 0.1)" stroke="hsl(var(--destructive))" />
        <text x="430" y="278" fontSize="12" fontWeight="700" textAnchor="middle" fill="hsl(var(--destructive))">
          Massive thrombin burst + monocyte tissue-factor expression
        </text>
        <text x="430" y="297" fontSize="10" textAnchor="middle" fill="hsl(var(--muted-foreground))">
          activated platelets aggregate · TF on monocytes/endothelium amplifies coagulation
        </text>
        <text x="430" y="313" fontSize="10" textAnchor="middle" fill="hsl(var(--muted-foreground))">
          IgG-coated platelets cleared by splenic macrophages
        </text>

        {/* Travelling particle along the central activation arrow */}
        <circle r="3.5" fill="hsl(var(--destructive))">
          <animate attributeName="cx" values="750;750" dur="2s" repeatCount="indefinite" />
          <animate attributeName="cy" values="220;250" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
        </circle>

        {/* ─────────────── Two consequences ─────────────── */}
        <path
          d="M310 325 Q230 360 160 380"
          stroke="hsl(var(--foreground))"
          strokeWidth="1.5"
          fill="none"
          markerEnd={`url(#${id}-arr)`}
        />
        <path
          d="M550 325 Q630 360 700 380"
          stroke="hsl(var(--foreground))"
          strokeWidth="1.5"
          fill="none"
          markerEnd={`url(#${id}-arr)`}
        />

        {/* Consequence A — Thrombocytopenia */}
        <g>
          <rect x="20" y="385" width="280" height="105" rx="8" fill="hsl(38 92% 50% / 0.1)" stroke="hsl(38 92% 50%)" />
          <text x="32" y="408" fontSize="12" fontWeight="700" fill="hsl(38 92% 40%)">
            Thrombocytopenia
          </text>
          <text x="32" y="428" fontSize="10" fill="hsl(var(--muted-foreground))">
            • Consumption in microthrombi
          </text>
          <text x="32" y="445" fontSize="10" fill="hsl(var(--muted-foreground))">
            • Splenic clearance of opsonised platelets
          </text>
          <text x="32" y="462" fontSize="10" fill="hsl(var(--muted-foreground))">
            • ↓ ≥50% from baseline (rarely &lt;20)
          </text>
          <text x="32" y="479" fontSize="10" fill="hsl(var(--muted-foreground))">
            • Nadir 40–80 ×10⁹/L · bleeding rare
          </text>
        </g>

        {/* Consequence B — Paradoxical thrombosis */}
        <g>
          <rect x="560" y="385" width="280" height="105" rx="8" fill="hsl(var(--destructive) / 0.1)" stroke="hsl(var(--destructive))" />
          <text x="572" y="408" fontSize="12" fontWeight="700" fill="hsl(var(--destructive))">
            Paradoxical thrombosis
          </text>
          <text x="572" y="428" fontSize="10" fill="hsl(var(--muted-foreground))">
            • Venous &gt; arterial (DVT/PE most common)
          </text>
          <text x="572" y="445" fontSize="10" fill="hsl(var(--muted-foreground))">
            • Limb ischaemia, skin necrosis at injection site
          </text>
          <text x="572" y="462" fontSize="10" fill="hsl(var(--muted-foreground))">
            • Adrenal vein thrombosis → addisonian crisis
          </text>
          <text x="572" y="479" fontSize="10" fill="hsl(var(--muted-foreground))">
            • 30-day thrombotic risk ~50% if untreated
          </text>
        </g>

        {/* Management hint */}
        <g>
          <rect x="320" y="400" width="220" height="75" rx="8" fill="hsl(var(--icu) / 0.1)" stroke="hsl(var(--icu))" />
          <text x="430" y="421" fontSize="11" fontWeight="700" textAnchor="middle" fill="hsl(var(--icu))">
            4Ts ≥ 4 → act now
          </text>
          <text x="430" y="440" fontSize="10" textAnchor="middle" fill="hsl(var(--muted-foreground))">
            STOP all heparin (incl. flushes)
          </text>
          <text x="430" y="456" fontSize="10" textAnchor="middle" fill="hsl(var(--muted-foreground))">
            Start argatroban / bivalirudin
          </text>
          <text x="430" y="471" fontSize="10" textAnchor="middle" fill="hsl(var(--muted-foreground))">
            Send anti-PF4 ELISA + SRA
          </text>
        </g>
      </svg>

      {/* Compact legend */}
      <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-full" style={{ background: "hsl(var(--icu))" }} /> PF4 tetramer
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-0.5 w-5" style={{ background: "hsl(38 92% 50%)" }} /> heparin chain
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span style={{ color: "hsl(var(--destructive))", fontWeight: 700 }}>Y</span> IgG anti-PF4/heparin
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-3 w-2" style={{ background: "hsl(var(--foreground))" }} /> FcγRIIa receptor
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-full" style={{ background: "hsl(var(--destructive) / 0.4)", border: "1px solid hsl(var(--destructive))" }} /> activated platelet
        </span>
      </div>

      {/* Per-step source citations (BJA Education-style) */}
      <div className="mt-3 rounded-md border border-border bg-muted/30 p-3 text-[11px] leading-relaxed">
        <p className="font-semibold text-foreground mb-1.5">Step sources — verify each cascade step</p>
        <ul className="space-y-1 text-muted-foreground">
          <li>
            <span className="font-medium text-foreground">Step 1 — Heparin + PF4 neoantigen:</span>{" "}
            PF4 tetramer binds heparin polyanion, exposing cryptic epitopes
            <Cite topicId="haematology-icu" labels={["BJA Educ HIT 2008", "Greinacher NEJM 2015"]} />
          </li>
          <li>
            <span className="font-medium text-foreground">Step 2 — IgG anti-PF4/heparin (day 5–10):</span>{" "}
            class-switched IgG appears in 25–50% of UFH-exposed patients; only a subset clinically active
            <Cite topicId="haematology-icu" labels={["Greinacher NEJM 2015", "ASH 2018 HIT"]} />
          </li>
          <li>
            <span className="font-medium text-foreground">Step 3 — FcγRIIa cross-linking on platelets:</span>{" "}
            immune-complex bridging activates platelets and monocytes via Fc receptor
            <Cite topicId="haematology-icu" labels={["BJA Educ HIT 2008", "Greinacher NEJM 2015"]} />
          </li>
          <li>
            <span className="font-medium text-foreground">Step 4 — Microparticles + thrombin burst:</span>{" "}
            procoagulant microparticles, monocyte tissue factor → paradoxical thrombosis
            <Cite topicId="haematology-icu" labels={["Greinacher NEJM 2015", "ASH 2018 HIT"]} />
          </li>
          <li>
            <span className="font-medium text-foreground">Outcomes — thrombocytopenia + thrombosis:</span>{" "}
            ≥50% platelet drop; 30-day thrombotic risk ~50% if heparin continued
            <Cite topicId="haematology-icu" labels={["BJA Educ HIT 2008", "ASH 2018 HIT"]} />
          </li>
        </ul>
      </div>
    </DiagramFigure>
  );
};

export default HITPathophysiologyDiagram;

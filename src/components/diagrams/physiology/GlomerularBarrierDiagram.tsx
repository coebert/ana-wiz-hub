import { useState, useEffect } from "react";
import { DiagramFigure } from "./_shared/DiagramFigure";

type LayerId = "endothelium" | "gbm" | "podocytes" | "slit-diaphragm" | "mesangial" | "filtrate";

interface LayerInfo {
  id: LayerId;
  label: string;
  color: string;
  description: string;
  detail: string;
}

const layers: LayerInfo[] = [
  {
    id: "endothelium",
    label: "Fenestrated Endothelium",
    color: "hsl(0 55% 50%)",
    description: "Innermost layer lining the glomerular capillary. Contains fenestrae (pores) of 70–100 nm diameter — large enough to allow plasma but restrict blood cells. The fenestrae lack diaphragms (unlike other fenestrated capillaries). The glycocalyx coating provides additional charge selectivity.",
    detail: "Pore size: 70–100 nm. No diaphragm. Glycocalyx adds negative charge barrier. Damaged in pre-eclampsia (endotheliosis) → proteinuria.",
  },
  {
    id: "gbm",
    label: "Glomerular Basement Membrane",
    color: "hsl(45 60% 48%)",
    description: "Acellular layer composed of type IV collagen, laminin, nidogen, and heparan sulphate proteoglycans (HSPGs). Three sublayers: lamina rara interna, lamina densa (main structural barrier, ~300 nm), and lamina rara externa. The negative charge from HSPGs repels albumin (pI 4.7, anionic at pH 7.4).",
    detail: "Type IV collagen (α3α4α5 network — mutations → Alport syndrome). HSPGs provide charge barrier. Lamina densa = main size barrier (~8 nm effective pore). Anti-GBM antibodies → Goodpasture disease.",
  },
  {
    id: "podocytes",
    label: "Podocyte Foot Processes",
    color: "hsl(200 55% 50%)",
    description: "Visceral epithelial cells with interdigitating foot processes (pedicels) that wrap around capillaries. Connected by slit diaphragms. Foot processes contain actin cytoskeleton and are anchored to the GBM by α3β1 integrins. Podocyte injury → foot process effacement → proteinuria.",
    detail: "Foot process width ~200 nm, gap ~25–60 nm bridged by slit diaphragm. Cannot regenerate — injury is irreversible. Effacement seen in minimal change disease (MCD), FSGS.",
  },
  {
    id: "slit-diaphragm",
    label: "Slit Diaphragm",
    color: "hsl(270 50% 55%)",
    description: "A specialised cell junction bridging adjacent podocyte foot processes. The key protein is nephrin (encoded by NPHS1) which forms a zipper-like structure with ~4 nm × 14 nm pores. Also contains podocin, CD2AP, and TRPC6. Functions as the final size-selective filter preventing albumin (3.6 nm radius) passage.",
    detail: "Nephrin mutations → congenital nephrotic syndrome (Finnish type). Podocin (NPHS2) mutations → steroid-resistant nephrotic syndrome. Slit pore ~4 × 14 nm — effective size cutoff ~70 kDa.",
  },
  {
    id: "mesangial",
    label: "Mesangial Cells",
    color: "hsl(30 50% 48%)",
    description: "Contractile cells between capillary loops that provide structural support. Contract in response to angiotensin II → reduce filtration surface area → ↓GFR. Produce mesangial matrix (collagen, fibronectin). Phagocytose trapped macromolecules. Proliferate in IgA nephropathy and membranoproliferative GN.",
    detail: "ANG II → contraction → ↓Kf → ↓GFR. ANP → relaxation → ↑Kf → ↑GFR. Mesangial expansion in diabetic nephropathy (Kimmelstiel-Wilson nodules).",
  },
  {
    id: "filtrate",
    label: "Filtrate Composition",
    color: "hsl(150 50% 48%)",
    description: "The ultrafiltrate in Bowman's space is essentially plasma without proteins. Contains water, electrolytes (Na⁺, K⁺, Cl⁻, HCO₃⁻), glucose, amino acids, urea, creatinine, and low-molecular-weight proteins (<70 kDa). Albumin (69 kDa, anionic) is normally >99.9% retained.",
    detail: "GFR ≈ 125 mL/min. Filtration fraction = GFR/RPF ≈ 20%. Freely filtered: inulin, creatinine. Partially filtered: myoglobin (17 kDa). Not filtered: albumin (69 kDa), IgG (150 kDa).",
  },
];

// Animated particle flowing through the barrier
const FiltrationParticle = ({ delay, speed, size, color, blocked, label }: {
  delay: number; speed: number; size: number; color: string; blocked: boolean; label: string;
}) => {
  const [pos, setPos] = useState(0);
  const [phase, setPhase] = useState<"moving" | "blocked" | "done">("moving");

  useEffect(() => {
    let frame: number;
    let start: number | null = null;
    const totalDuration = speed;
    const blockPoint = blocked ? 0.55 + Math.random() * 0.15 : 1;

    const animate = (ts: number) => {
      if (!start) start = ts - (delay % totalDuration);
      const elapsed = ((ts - start) % (totalDuration + 1500));
      if (elapsed < 0) { frame = requestAnimationFrame(animate); return; }
      const progress = Math.min(1, elapsed / totalDuration);

      if (blocked && progress >= blockPoint) {
        setPos(blockPoint);
        setPhase("blocked");
      } else if (progress >= 0.98) {
        setPos(0);
        setPhase("done");
      } else {
        setPos(progress);
        setPhase("moving");
      }
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [delay, speed, blocked]);

  // Map progress to y position (top=capillary lumen, bottom=Bowman's space)
  const y = 40 + pos * 260;
  const x = 240 + Math.sin(pos * 8 + delay) * 15;
  const opacity = phase === "done" ? 0 : phase === "blocked" ? (0.4 + Math.sin(Date.now() / 300) * 0.2) : 0.8;

  return (
    <DiagramFigure
      id="glomerular-barrier-diagram"
      title="Glomerular barrier"
      description="Auto-generated wrapper for the Glomerular barrier anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <g opacity={opacity}>
        <circle cx={x} cy={y} r={size} fill={color} />
        {size > 3 && <circle cx={x} cy={y} r={size} fill="none" stroke={color} strokeWidth="0.5" opacity="0.4" />}
        <text x={x} y={y - size - 2} fontSize="5" fill={color} textAnchor="middle" fontWeight="600">{label}</text>
        {phase === "blocked" && (
          <text x={x + size + 4} y={y + 2} fontSize="5" fill="hsl(0 60% 55%)" fontWeight="700">✕</text>
        )}
      </g>
    </DiagramFigure>
  );
};

// Small flowing dots for general filtrate movement
const FlowDot = ({ delay, x: baseX }: { delay: number; x: number }) => {
  const [y, setY] = useState(0);

  useEffect(() => {
    let frame: number;
    let start: number | null = null;
    const animate = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ((ts - start + delay) % 4000) / 4000;
      setY(40 + elapsed * 270);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [delay]);

  const opacity = y < 60 ? (y - 40) / 20 : y > 280 ? (310 - y) / 30 : 0.3;
  return <circle cx={baseX} cy={y} r={1} fill="hsl(200 50% 60%)" opacity={opacity} />;
};

export const GlomerularBarrierDiagram = () => {
  const [activeLayer, setActiveLayer] = useState<LayerId | null>(null);
  const info = activeLayer ? layers.find(l => l.id === activeLayer) : null;

  return (
    <div className="space-y-4">
      {/* Layer selector */}
      <div className="flex flex-wrap gap-2">
        {layers.map(l => (
          <button key={l.id} onClick={() => setActiveLayer(activeLayer === l.id ? null : l.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              activeLayer === l.id
                ? "bg-primary/15 border-primary/40 text-primary"
                : "bg-secondary/50 border-border text-muted-foreground hover:bg-secondary"
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>

      <svg viewBox="0 0 480 380" className="w-full" role="img" aria-label="Glomerular filtration barrier cross-section">
        <defs>
          <linearGradient id="capLumen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(0 55% 50%)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="hsl(0 55% 50%)" stopOpacity="0.04" />
          </linearGradient>
          <linearGradient id="bowmanSpace" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(200 50% 50%)" stopOpacity="0.04" />
            <stop offset="100%" stopColor="hsl(200 50% 50%)" stopOpacity="0.08" />
          </linearGradient>
          <linearGradient id="gbmGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(45 50% 55%)" stopOpacity="0.2" />
            <stop offset="50%" stopColor="hsl(45 60% 45%)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="hsl(45 50% 55%)" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* === CAPILLARY LUMEN === */}
        <rect x="0" y="0" width="480" height="80" fill="url(#capLumen)" rx="6" />
        <text x="240" y="20" fontSize="10" fill="hsl(0 50% 50%)" textAnchor="middle" fontWeight="700" opacity="0.7">
          CAPILLARY LUMEN
        </text>
        {/* RBCs */}
        {[60, 150, 280, 380].map((x, i) => (
          <g key={`rbc-${i}`} opacity="0.25">
            <ellipse cx={x} cy={45 + (i % 2) * 10} rx={10} ry={5} fill="hsl(0 60% 45%)" />
            <ellipse cx={x} cy={45 + (i % 2) * 10} rx={4} ry={2} fill="hsl(0 60% 35%)" opacity="0.4" />
          </g>
        ))}
        {/* Albumin molecules (large, won't pass) */}
        {[100, 200, 340, 420].map((x, i) => (
          <g key={`alb-${i}`} opacity="0.2">
            <circle cx={x} cy={55 + (i % 3) * 5} r={5} fill="hsl(270 40% 55%)" />
            <text x={x} y={58 + (i % 3) * 5} fontSize="3.5" fill="hsl(var(--background))" textAnchor="middle" fontWeight="700">Alb</text>
          </g>
        ))}

        {/* === LAYER 1: FENESTRATED ENDOTHELIUM === */}
        <g className="cursor-pointer" onClick={() => setActiveLayer(activeLayer === "endothelium" ? null : "endothelium")}>
          <rect x="0" y="80" width="480" height="40" fill="hsl(0 55% 50%)"
            fillOpacity={activeLayer === "endothelium" ? 0.15 : 0.06}
            stroke="hsl(0 55% 50%)" strokeWidth={activeLayer === "endothelium" ? 1.5 : 0.5} />
          {/* Fenestrae (pores) */}
          {Array.from({ length: 16 }).map((_, i) => {
            const x = 20 + i * 29;
            return (
              <g key={`fen-${i}`}>
                <rect x={x} y={85} width={12} height={30} rx={2}
                  fill="hsl(var(--background))" fillOpacity="0.5"
                  stroke="hsl(0 55% 50%)" strokeWidth="0.5" />
                {/* Glycocalyx hairs on top */}
                {[x + 3, x + 6, x + 9].map((gx, j) => (
                  <line key={j} x1={gx} y1={85} x2={gx} y2={80} stroke="hsl(0 40% 55%)" strokeWidth="0.5" opacity="0.4" />
                ))}
              </g>
            );
          })}
          <text x="475" y="98" fontSize="6" fill="hsl(0 55% 50%)" textAnchor="end" fontWeight="600" opacity="0.8">
            Fenestrated Endothelium
          </text>
          <text x="475" y="108" fontSize="5" fill="hsl(0 55% 50%)" textAnchor="end" opacity="0.5">
            70–100 nm pores
          </text>
        </g>

        {/* === LAYER 2: GBM (3 sublayers) === */}
        <g className="cursor-pointer" onClick={() => setActiveLayer(activeLayer === "gbm" ? null : "gbm")}>
          <rect x="0" y="120" width="480" height="60" fill="url(#gbmGrad)"
            stroke="hsl(45 60% 48%)" strokeWidth={activeLayer === "gbm" ? 1.5 : 0.5} />
          {/* Sublayer labels */}
          <line x1="0" y1="135" x2="480" y2="135" stroke="hsl(45 50% 50%)" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.4" />
          <line x1="0" y1="165" x2="480" y2="165" stroke="hsl(45 50% 50%)" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.4" />
          <text x="8" y="132" fontSize="4.5" fill="hsl(45 55% 50%)" opacity="0.6">Lamina rara interna</text>
          <text x="8" y="153" fontSize="5" fill="hsl(45 60% 48%)" fontWeight="600" opacity="0.7">Lamina densa</text>
          <text x="8" y="175" fontSize="4.5" fill="hsl(45 55% 50%)" opacity="0.6">Lamina rara externa</text>
          {/* Negative charges (HSPGs) */}
          {Array.from({ length: 12 }).map((_, i) => (
            <text key={`charge-${i}`} x={70 + i * 35} y={150} fontSize="8" fill="hsl(45 60% 48%)"
              textAnchor="middle" opacity="0.35" fontWeight="700">−</text>
          ))}
          {/* Collagen IV network lines */}
          {Array.from({ length: 8 }).map((_, i) => (
            <path key={`col-${i}`} d={`M ${i * 60} 140 Q ${i * 60 + 30} 148 ${(i + 1) * 60} 140`}
              fill="none" stroke="hsl(45 50% 45%)" strokeWidth="0.5" opacity="0.25" />
          ))}
          <text x="475" y="140" fontSize="6" fill="hsl(45 60% 48%)" textAnchor="end" fontWeight="600" opacity="0.8">
            GBM
          </text>
          <text x="475" y="150" fontSize="5" fill="hsl(45 60% 48%)" textAnchor="end" opacity="0.5">
            Type IV collagen + HSPGs
          </text>
        </g>

        {/* === LAYER 3: PODOCYTE FOOT PROCESSES + SLIT DIAPHRAGMS === */}
        <g className="cursor-pointer" onClick={() => setActiveLayer(activeLayer === "podocytes" ? null : "podocytes")}>
          <rect x="0" y="180" width="480" height="70" fill="hsl(200 50% 50%)"
            fillOpacity={activeLayer === "podocytes" || activeLayer === "slit-diaphragm" ? 0.1 : 0.04}
            stroke="hsl(200 55% 50%)" strokeWidth={activeLayer === "podocytes" ? 1.5 : 0.5} />
          {/* Foot processes */}
          {Array.from({ length: 10 }).map((_, i) => {
            const x = 15 + i * 48;
            return (
                  <g key={`fp-${i}`}>
                {/* Left foot process */}
                <path d={`M ${x} 180 L ${x} 220 Q ${x + 5} 240 ${x + 10} 240 L ${x + 18} 240 Q ${x + 20} 240 ${x + 20} 235 L ${x + 20} 220`}
                  fill="hsl(200 50% 50%)" fillOpacity="0.15" stroke="hsl(200 55% 50%)" strokeWidth="1" />
                {/* Right foot process */}
                <path d={`M ${x + 28} 180 L ${x + 28} 220 Q ${x + 33} 240 ${x + 35} 240 L ${x + 42} 240 Q ${x + 46} 240 ${x + 46} 235 L ${x + 46} 220`}
                  fill="hsl(200 50% 50%)" fillOpacity="0.15" stroke="hsl(200 55% 50%)" strokeWidth="1" />
                {/* Slit diaphragm between */}
                <g className="cursor-pointer" onClick={(e) => { e.stopPropagation(); setActiveLayer(activeLayer === "slit-diaphragm" ? null : "slit-diaphragm"); }}>
                  {/* Nephrin zipper structure */}
                  {[222, 226, 230, 234].map((sy, j) => (
                    <line key={`sd-${i}-${j}`} x1={x + 20} y1={sy} x2={x + 28} y2={sy + (j % 2 === 0 ? 1 : -1)}
                      stroke="hsl(270 50% 55%)" strokeWidth={activeLayer === "slit-diaphragm" ? 1.2 : 0.6}
                      opacity={activeLayer === "slit-diaphragm" ? 0.8 : 0.4} />
                  ))}
                </g>
                {/* Actin filaments inside foot processes */}
                {activeLayer === "podocytes" && (
                  <g opacity="0.3">
                    <line x1={x + 5} y1={185} x2={x + 5} y2={230} stroke="hsl(200 40% 55%)" strokeWidth="0.5" />
                    <line x1={x + 15} y1={185} x2={x + 15} y2={230} stroke="hsl(200 40% 55%)" strokeWidth="0.5" />
                    <line x1={x + 33} y1={185} x2={x + 33} y2={230} stroke="hsl(200 40% 55%)" strokeWidth="0.5" />
                    <line x1={x + 41} y1={185} x2={x + 41} y2={230} stroke="hsl(200 40% 55%)" strokeWidth="0.5" />
                  </g>
                )}
              </g>
  );
          })}
          <text x="475" y="198" fontSize="6" fill="hsl(200 55% 50%)" textAnchor="end" fontWeight="600" opacity="0.8">
            Podocyte Foot Processes
          </text>
          <text x="475" y="208" fontSize="5" fill="hsl(270 50% 55%)" textAnchor="end" opacity="0.6">
            Slit diaphragm (nephrin)
          </text>
          <text x="475" y="218" fontSize="5" fill="hsl(200 50% 50%)" textAnchor="end" opacity="0.5">
            Gap ~25–60 nm
          </text>
        </g>

        {/* === BOWMAN'S SPACE === */}
        <rect x="0" y="250" width="480" height="80" fill="url(#bowmanSpace)" />
        <text x="240" y="275" fontSize="10" fill="hsl(200 50% 50%)" textAnchor="middle" fontWeight="700" opacity="0.7">
          BOWMAN'S SPACE (Ultrafiltrate)
        </text>
        <text x="240" y="290" fontSize="6" fill="hsl(200 40% 50%)" textAnchor="middle" opacity="0.4">
          Na⁺, K⁺, Cl⁻, glucose, amino acids, urea, creatinine — no albumin
        </text>

        {/* === ANIMATED FILTRATE PARTICLES === */}
        {/* Small molecules passing through */}
        {Array.from({ length: 8 }).map((_, i) => (
          <FlowDot key={`fd-${i}`} delay={i * 500} x={55 + i * 50 + Math.sin(i) * 10} />
        ))}

        {/* Specific molecules with animation */}
        <FiltrationParticle delay={0} speed={4000} size={2} color="hsl(0 55% 55%)" blocked={false} label="Na⁺" />
        <FiltrationParticle delay={800} speed={4200} size={2} color="hsl(120 50% 50%)" blocked={false} label="Cl⁻" />
        <FiltrationParticle delay={1600} speed={3800} size={2.5} color="hsl(45 65% 50%)" blocked={false} label="Glc" />
        <FiltrationParticle delay={2400} speed={4500} size={2} color="hsl(200 50% 55%)" blocked={false} label="H₂O" />
        <FiltrationParticle delay={400} speed={5000} size={2} color="hsl(30 50% 50%)" blocked={false} label="Urea" />
        {/* Albumin — BLOCKED at GBM/slit diaphragm */}
        <FiltrationParticle delay={1200} speed={6000} size={5} color="hsl(270 50% 55%)" blocked={true} label="Albumin" />
        <FiltrationParticle delay={3000} speed={5500} size={5.5} color="hsl(270 45% 50%)" blocked={true} label="IgG" />

        {/* === SIZE/CHARGE SELECTIVITY LEGEND === */}
        <rect x="0" y="335" width="480" height="45" rx="4" fill="hsl(var(--secondary))" fillOpacity="0.3" stroke="hsl(var(--border))" strokeWidth="0.75" />
        <text x="14" y="350" fontSize="6" fill="hsl(var(--foreground))" fontWeight="700" opacity="0.7">Size &amp; Charge Selectivity:</text>
        {/* Freely filtered */}
        <circle cx="14" cy="365" r="2" fill="hsl(150 50% 50%)" />
        <text x="20" y="368" fontSize="5" fill="hsl(var(--muted-foreground))">Freely filtered: H₂O, Na⁺, Cl⁻, glucose, urea, creatinine (&lt;7 kDa)</text>
        {/* Partially filtered */}
        <circle cx="260" cy="365" r="3" fill="hsl(45 55% 50%)" opacity="0.6" />
        <text x="267" y="368" fontSize="5" fill="hsl(var(--muted-foreground))">Partial: myoglobin (17 kDa), β₂-microglobulin</text>
        {/* Blocked */}
        <circle cx="14" cy="375" r="4" fill="hsl(270 50% 55%)" opacity="0.4" />
        <text x="22" y="378" fontSize="5" fill="hsl(var(--muted-foreground))">Blocked: albumin (69 kDa, anionic), IgG (150 kDa) — &gt;99.9% retained</text>

        {/* Mesangial cell indicator */}
        {activeLayer === "mesangial" && (
          <g opacity="0.6">
            <rect x="5" y="105" width="70" height="70" rx="6" fill="hsl(30 50% 48%)" fillOpacity="0.08"
              stroke="hsl(30 50% 48%)" strokeWidth="1" strokeDasharray="3 2" />
            <text x="40" y="125" fontSize="5" fill="hsl(30 50% 48%)" textAnchor="middle" fontWeight="600">Mesangial</text>
            <text x="40" y="135" fontSize="4" fill="hsl(30 50% 48%)" textAnchor="middle">ANG II → contract</text>
            <text x="40" y="144" fontSize="4" fill="hsl(30 50% 48%)" textAnchor="middle">→ ↓surface area</text>
            <text x="40" y="153" fontSize="4" fill="hsl(30 50% 48%)" textAnchor="middle">→ ↓GFR</text>
            <polygon points="40,165 30,160 50,160" fill="hsl(30 50% 48%)" fillOpacity="0.3" />
          </g>
        )}

        {/* Pressure annotations */}
        <g opacity="0.35">
          <text x="480" y="55" fontSize="5" fill="hsl(0 50% 50%)" textAnchor="end">P_GC = 50 mmHg →</text>
          <text x="480" y="290" fontSize="5" fill="hsl(200 50% 50%)" textAnchor="end">← P_BC = 10 mmHg</text>
          <text x="480" y="65" fontSize="5" fill="hsl(0 40% 50%)" textAnchor="end">π_GC = 25 mmHg ←</text>
          <text x="480" y="300" fontSize="5" fill="hsl(200 40% 50%)" textAnchor="end">π_BC ≈ 0 mmHg</text>
          <text x="480" y="315" fontSize="5.5" fill="hsl(var(--foreground))" textAnchor="end" fontWeight="600" opacity="0.5">NFP ≈ 15 mmHg</text>
        </g>
      </svg>

      {/* Info panel */}
      {info ? (
        <div className="rounded-lg border border-border bg-secondary/30 p-4 animate-fade-in" key={info.id}>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: info.color }} />
            <h4 className="text-sm font-semibold text-foreground">{info.label}</h4>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{info.description}</p>
          <p className="text-xs text-muted-foreground mt-2 border-t border-border pt-2">
            <span className="font-semibold text-foreground/80">Clinical: </span>{info.detail}
          </p>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground text-center">Click any layer to explore its structure, function, and associated pathology</p>
      )}
    </div>
  );
};

export default GlomerularBarrierDiagram;

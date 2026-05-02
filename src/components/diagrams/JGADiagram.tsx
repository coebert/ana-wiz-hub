import { useState } from "react";

type JGAPartId = "jg-cells" | "macula-densa" | "egm-cells" | "afferent" | "efferent" | "glomerulus" | "tgf-low" | "tgf-high" | "raas";

interface JGAPart {
  id: JGAPartId;
  label: string;
  color: string;
  category: "structure" | "mechanism";
  description: string;
  detail: string;
}

const parts: JGAPart[] = [
  {
    id: "jg-cells", label: "Juxtaglomerular (Granular) Cells", color: "hsl(260 55% 55%)",
    category: "structure",
    description: "Modified smooth muscle cells in the wall of the afferent arteriole, directly adjacent to the glomerulus. Contain renin-storing secretory granules. Act as intrarenal baroreceptors — decreased stretch (↓perfusion pressure) → renin release. Also receive sympathetic innervation via β₁-adrenoceptors → renin release.",
    detail: "Renin release stimuli: (1) ↓renal perfusion pressure (baroreceptor), (2) ↓NaCl at macula densa (TGF), (3) sympathetic β₁ stimulation. Inhibited by: ANG II (short-loop negative feedback), ANP, high perfusion pressure.",
  },
  {
    id: "macula-densa", label: "Macula Densa", color: "hsl(45 65% 50%)",
    category: "structure",
    description: "A plaque of 15–20 specialised tall columnar epithelial cells at the junction of the thick ascending limb (TAL) and the distal convoluted tubule (DCT). Located where the tubule returns to its own glomerulus — enabling single-nephron feedback. Senses luminal [NaCl] via apical NKCC2 and detects flow rate.",
    detail: "Sensing mechanism: NaCl entry via NKCC2 → ↑intracellular [Na⁺/Cl⁻] → ↑ATP release → adenosine production by ecto-5'-nucleotidase. Adenosine acts on A₁ receptors on afferent arteriole. Also releases PGE₂ (vasodilatory) and nitric oxide.",
  },
  {
    id: "egm-cells", label: "Extraglomerular Mesangial Cells", color: "hsl(30 50% 50%)",
    category: "structure",
    description: "Also called lacis cells or Goormaghtigh cells. Fill the triangular space between the afferent arteriole, efferent arteriole, and macula densa. Connected to each other and to intraglomerular mesangial cells by gap junctions. Relay signals from macula densa to the arterioles and JG cells.",
    detail: "Function as a communication hub — transmit paracrine signals (adenosine, ATP, PGE₂, NO) between macula densa and vascular pole. May also participate in renin secretion regulation. Poorly understood compared to other JGA components.",
  },
  {
    id: "afferent", label: "Afferent Arteriole", color: "hsl(0 60% 50%)",
    category: "structure",
    description: "Delivers blood to the glomerulus. Contains JG cells in its wall near the glomerulus. Calibre is regulated by myogenic response (Bayliss effect), TGF (adenosine → A₁ receptor → constriction), and prostaglandins (PGE₂/PGI₂ → dilation). NSAIDs block prostaglandin synthesis → unopposed vasoconstriction → ↓GFR.",
    detail: "Myogenic response: ↑pressure → stretch → VSMC depolarisation → Ca²⁺ entry → constriction (maintains constant RBF/GFR). Operates over MAP 80–180 mmHg. Lost in CKD, diabetes, and with NSAIDs/ACEi combination.",
  },
  {
    id: "efferent", label: "Efferent Arteriole", color: "hsl(0 40% 42%)",
    category: "structure",
    description: "Exits the glomerulus. Preferentially constricted by angiotensin II (higher density of AT₁ receptors than afferent). This maintains GFR when perfusion pressure falls by increasing filtration fraction. Gives rise to peritubular capillaries (cortical nephrons) or vasa recta (juxtamedullary nephrons).",
    detail: "ACE inhibitors / ARBs → efferent dilation → ↓intraglomerular pressure → ↓filtration fraction → ↓GFR (initially) but renoprotective long-term in diabetic nephropathy. Contraindicated in bilateral renal artery stenosis (GFR depends on ANG II–mediated efferent tone).",
  },
  {
    id: "glomerulus", label: "Glomerular Capillary Tuft", color: "hsl(0 55% 50%)",
    category: "structure",
    description: "Network of capillary loops between afferent and efferent arterioles. Filtration occurs across the glomerular filtration barrier. GFR is determined by Kf × net filtration pressure. Mesangial cells within the tuft contract (ANG II) or relax (ANP) to alter filtration surface area (Kf).",
    detail: "GFR ≈ 125 mL/min. Kf = hydraulic conductivity × surface area. Net filtration pressure = (P_GC − P_BC) − (π_GC − π_BC) ≈ 15 mmHg. Filtration equilibrium may be reached along the capillary length.",
  },
  {
    id: "tgf-low", label: "TGF Response: Low NaCl", color: "hsl(150 55% 45%)",
    category: "mechanism",
    description: "When GFR is low → less NaCl delivered to macula densa → ↓NaCl uptake via NKCC2 → ↓intracellular ATP → ↓adenosine production → loss of A₁ receptor–mediated afferent constriction → AFFERENT DILATION → ↑RBF → ↑GFR (restoration). Simultaneously, ↓NaCl triggers renin release from JG cells → ANG II → efferent constriction → further ↑GFR.",
    detail: "Macula densa also releases PGE₂ and NO when NaCl is low → afferent vasodilation. This is the 'rescue' pathway: ↓GFR → ↓NaCl → dilate afferent + constrict efferent → restore GFR. NSAIDs block PGE₂ → impair this rescue → risk of AKI.",
  },
  {
    id: "tgf-high", label: "TGF Response: High NaCl", color: "hsl(0 55% 50%)",
    category: "mechanism",
    description: "When GFR is high → more NaCl delivered to macula densa → ↑NaCl uptake via NKCC2 → ↑ATP release → ↑adenosine (via ecto-5'-nucleotidase) → adenosine acts on A₁ receptors on afferent arteriolar smooth muscle → AFFERENT CONSTRICTION → ↓RBF → ↓GFR (negative feedback). Renin release is suppressed.",
    detail: "This negative feedback loop stabilises single-nephron GFR (SNGFR). Response time ~6–10 seconds. Theophylline (adenosine receptor antagonist) blocks TGF → may explain ↑GFR in early caffeine consumption. Loop diuretics block NKCC2 on macula densa → mimic 'low NaCl' signal → ↑renin release.",
  },
  {
    id: "raas", label: "RAAS Activation", color: "hsl(270 50% 50%)",
    category: "mechanism",
    description: "Renin (released by JG cells) cleaves angiotensinogen (liver) → angiotensin I → ACE (lung endothelium) → angiotensin II. ANG II: (1) efferent constriction → ↑FF, (2) systemic vasoconstriction → ↑BP, (3) aldosterone release (zona glomerulosa) → Na⁺ retention, (4) ADH release, (5) thirst stimulation, (6) proximal tubular Na⁺ reabsorption.",
    detail: "Drug targets: ACE inhibitors (ramipril, enalapril), ARBs (losartan, candesartan), direct renin inhibitors (aliskiren), aldosterone antagonists (spironolactone, eplerenone). ANG II has short-loop negative feedback on renin release.",
  },
];

export const JGADiagram = () => {
  const [active, setActive] = useState<JGAPartId | null>(null);
  const info = active ? parts.find(p => p.id === active) : null;
  const toggle = (id: JGAPartId) => () => setActive(active === id ? null : id);
  const isActive = (id: JGAPartId) => active === id;
  const isMech = (id: JGAPartId) => active === id;

  return (
    <div className="space-y-4">
      {/* Tabs: structures vs mechanisms */}
      <div className="space-y-2">
        <div className="flex flex-wrap gap-2">
          <span className="text-xs font-semibold text-muted-foreground self-center mr-1">Structures:</span>
          {parts.filter(p => p.category === "structure").map(p => (
            <button key={p.id} onClick={toggle(p.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                active === p.id ? "bg-primary/15 border-primary/40 text-primary" : "bg-secondary/50 border-border text-muted-foreground hover:bg-secondary"
              }`}>{p.label.split(" ")[0]}</button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="text-xs font-semibold text-muted-foreground self-center mr-1">Mechanisms:</span>
          {parts.filter(p => p.category === "mechanism").map(p => (
            <button key={p.id} onClick={toggle(p.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                active === p.id ? "bg-primary/15 border-primary/40 text-primary" : "bg-secondary/50 border-border text-muted-foreground hover:bg-secondary"
              }`}>{p.label.replace("TGF Response: ", "").replace("RAAS Activation", "RAAS")}</button>
          ))}
        </div>
      </div>

      <svg viewBox="0 0 500 440" className="w-full" role="img" aria-label="Juxtaglomerular apparatus diagram">
        <defs>
          <radialGradient id="glomGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(0 55% 50%)" stopOpacity="0.12" />
            <stop offset="100%" stopColor="hsl(0 55% 50%)" stopOpacity="0.03" />
          </radialGradient>
          <linearGradient id="tgfLowGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="hsl(150 55% 45%)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="hsl(150 55% 45%)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="tgfHighGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="hsl(0 55% 50%)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="hsl(0 55% 50%)" stopOpacity="0" />
          </linearGradient>
          <marker id="arrJGA" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
            <path d="M0,0 L6,2 L0,4" fill="hsl(var(--muted-foreground))" opacity="0.6" />
          </marker>
          <marker id="arrGreen" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
            <path d="M0,0 L6,2 L0,4" fill="hsl(150 55% 45%)" />
          </marker>
          <marker id="arrRedJGA" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
            <path d="M0,0 L6,2 L0,4" fill="hsl(0 55% 50%)" />
          </marker>
          <marker id="arrPurple" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
            <path d="M0,0 L6,2 L0,4" fill="hsl(270 50% 50%)" />
          </marker>
        </defs>

        {/* ========== AFFERENT ARTERIOLE ========== */}
        <g className="cursor-pointer" onClick={toggle("afferent")} opacity={active && active !== "afferent" && active !== "jg-cells" && active !== "tgf-low" && active !== "tgf-high" ? 0.3 : 1}>
          {/* Vessel walls */}
          <path d="M 30 155 Q 60 148 90 142 Q 120 136 150 132" fill="none"
            stroke={isActive("afferent") ? "hsl(0 70% 55%)" : "hsl(0 60% 50%)"} strokeWidth={isActive("afferent") ? 2 : 1.2} />
          <path d="M 30 180 Q 60 173 90 167 Q 120 161 150 157" fill="none"
            stroke={isActive("afferent") ? "hsl(0 70% 55%)" : "hsl(0 60% 50%)"} strokeWidth={isActive("afferent") ? 2 : 1.2} />
          {/* Lumen fill */}
          <path d="M 30 167 Q 60 160 90 154 Q 120 148 150 144" fill="none"
            stroke="hsl(0 55% 50%)" strokeWidth="16" opacity="0.06" strokeLinecap="round" />
          {/* Smooth muscle cells */}
          {[50, 72, 95].map((x, i) => (
            <ellipse key={`aff-sm-${i}`} cx={x} cy={153 - i * 3} rx={4} ry={2.5}
              fill="hsl(0 50% 50%)" fillOpacity="0.2" stroke="hsl(0 55% 50%)" strokeWidth="0.5" />
          ))}
          {/* Flow arrow */}
          <polygon points="35,163 35,172 25,167" fill="hsl(0 55% 50%)" opacity="0.6" />
          <text x="28" y="195" fontSize="7" fill="hsl(0 55% 50%)" fontWeight="600">Afferent</text>
          <text x="28" y="204" fontSize="6" fill="hsl(0 55% 50%)" opacity="0.5">arteriole</text>
          {/* PGE₂ label */}
          {(isActive("afferent") || isMech("tgf-low")) && (
            <text x="80" y="198" fontSize="5" fill="hsl(150 50% 50%)" opacity="0.6">PGE₂/PGI₂ → dilation</text>
          )}
        </g>

        {/* ========== JG CELLS (on afferent wall near glomerulus) ========== */}
        <g className="cursor-pointer" onClick={toggle("jg-cells")} opacity={active && active !== "jg-cells" && active !== "raas" && active !== "tgf-low" && active !== "tgf-high" ? 0.3 : 1}>
          {[120, 132, 144].map((x, i) => (
            <g key={`jg-${i}`}>
              <circle cx={x} cy={138 - i * 2} r={7}
                fill={isActive("jg-cells") ? "hsl(260 55% 55%/0.25)" : "hsl(260 55% 55%/0.12)"}
                stroke="hsl(260 55% 55%)" strokeWidth={isActive("jg-cells") ? 1.5 : 0.8} />
              {/* Renin granules */}
              {[-2, 0, 2].map((dx, j) => (
                <circle key={`rg-${i}-${j}`} cx={x + dx} cy={138 - i * 2 + (j - 1) * 2} r={1.2}
                  fill="hsl(260 55% 55%)" fillOpacity={isActive("jg-cells") ? 0.7 : 0.4} />
              ))}
            </g>
          ))}
          <text x="132" y="118" fontSize="6.5" fill="hsl(260 55% 55%)" textAnchor="middle" fontWeight="600">JG Cells</text>
          <text x="132" y="126" fontSize="5" fill="hsl(260 55% 55%)" textAnchor="middle" opacity="0.6">(renin granules)</text>
          {/* β₁ receptor */}
          {isActive("jg-cells") && (
            <g opacity="0.5">
              <rect x="98" y="108" width="24" height="10" rx="3" fill="hsl(260 40% 50%)" fillOpacity="0.15" stroke="hsl(260 40% 50%)" strokeWidth="0.6" />
              <text x="110" y="115" fontSize="4.5" fill="hsl(260 40% 50%)" textAnchor="middle">β₁-R</text>
            </g>
          )}
        </g>

        {/* ========== GLOMERULUS ========== */}
        <g className="cursor-pointer" onClick={toggle("glomerulus")} opacity={active && active !== "glomerulus" ? 0.35 : 1}>
          <ellipse cx="220" cy="130" rx="60" ry="50" fill="url(#glomGrad)"
            stroke={isActive("glomerulus") ? "hsl(0 55% 50%)" : "hsl(0 45% 45%)"} strokeWidth={isActive("glomerulus") ? 2 : 1} />
          <ellipse cx="220" cy="130" rx="55" ry="45" fill="none"
            stroke="hsl(0 40% 45%)" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.3" />
          {/* Capillary loops */}
          {[
            "M 195 112 Q 190 125 198 133 Q 205 140 200 148",
            "M 210 108 Q 205 122 213 128 Q 220 135 215 145",
            "M 228 110 Q 222 125 230 130 Q 238 138 232 148",
            "M 242 115 Q 237 128 245 133 Q 250 140 245 150",
          ].map((d, i) => (
            <path key={`cap-${i}`} d={d} fill="none" stroke="hsl(0 55% 50%)" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
          ))}
          <text x="220" y="170" fontSize="7" fill="hsl(0 50% 50%)" textAnchor="middle" fontWeight="600" opacity="0.7">Glomerulus</text>
        </g>

        {/* ========== EFFERENT ARTERIOLE ========== */}
        <g className="cursor-pointer" onClick={toggle("efferent")} opacity={active && active !== "efferent" && active !== "raas" ? 0.3 : 1}>
          <path d="M 280 132 Q 310 125 340 120 Q 370 115 400 118" fill="none"
            stroke={isActive("efferent") ? "hsl(0 50% 48%)" : "hsl(0 40% 42%)"} strokeWidth={isActive("efferent") ? 2 : 1} />
          <path d="M 280 155 Q 310 148 340 143 Q 370 138 400 141" fill="none"
            stroke={isActive("efferent") ? "hsl(0 50% 48%)" : "hsl(0 40% 42%)"} strokeWidth={isActive("efferent") ? 2 : 1} />
          <path d="M 280 143 Q 310 136 340 131 Q 370 126 400 129" fill="none"
            stroke="hsl(0 40% 42%)" strokeWidth="14" opacity="0.04" strokeLinecap="round" />
          <polygon points="400,126 400,135 410,130" fill="hsl(0 40% 42%)" opacity="0.5" />
          <text x="410" y="125" fontSize="7" fill="hsl(0 40% 42%)" fontWeight="600">Efferent</text>
          <text x="410" y="134" fontSize="6" fill="hsl(0 40% 42%)" opacity="0.5">arteriole</text>
          {isActive("efferent") && (
            <text x="340" y="112" fontSize="5" fill="hsl(270 50% 55%)" textAnchor="middle" opacity="0.6">ANG II → constriction (AT₁)</text>
          )}
        </g>

        {/* ========== THICK ASCENDING LIMB / DCT ========== */}
        <g opacity={active && active !== "macula-densa" && active !== "tgf-low" && active !== "tgf-high" ? 0.3 : 1}>
          {/* TAL approaching */}
          <path d="M 470 340 Q 440 310 400 280 Q 360 250 320 230 Q 280 215 250 210" fill="none"
            stroke="hsl(30 55% 45%)" strokeWidth="1.2" />
          <path d="M 470 355 Q 440 325 400 295 Q 360 265 320 245 Q 280 230 250 225" fill="none"
            stroke="hsl(30 55% 45%)" strokeWidth="1.2" />
          <text x="450" y="338" fontSize="6" fill="hsl(30 55% 45%)" fontWeight="600">TAL</text>
          <polygon points="465,345 470,338 472,348" fill="hsl(30 55% 45%)" opacity="0.5" />

          {/* DCT departing */}
          <path d="M 190 225 Q 150 230 120 240 Q 90 250 60 265" fill="none"
            stroke="hsl(45 55% 45%)" strokeWidth="1.2" />
          <path d="M 190 210 Q 150 215 120 225 Q 90 235 60 250" fill="none"
            stroke="hsl(45 55% 45%)" strokeWidth="1.2" />
          <text x="55" y="248" fontSize="6" fill="hsl(45 55% 45%)" fontWeight="600" textAnchor="end">DCT</text>
          <polygon points="55,260 60,252 62,263" fill="hsl(45 55% 45%)" opacity="0.5" />

          {/* Animated NaCl particles flowing past macula densa when TGF is selected */}
          {(isMech("tgf-low") || isMech("tgf-high")) && (
            <g>
              {[0, 0.25, 0.5, 0.75].map((delay, i) => {
                const isHigh = isMech("tgf-high");
                const colour = isHigh ? "hsl(0 70% 50%)" : "hsl(150 55% 45%)";
                return (
                  <circle key={i} r={isHigh ? 2.6 : 1.6} fill={colour}
                    opacity={isHigh ? 0.95 : 0.55}>
                    <animateMotion
                      dur={isHigh ? "2.2s" : "3.4s"}
                      begin={`${-delay * (isHigh ? 2.2 : 3.4)}s`}
                      repeatCount="indefinite"
                      path="M 470 348 Q 440 318 400 287 Q 360 257 320 237 Q 280 222 220 217" />
                  </circle>
                );
              })}
              <text
                x="370" y="270" fontSize="5.5" fontWeight="700"
                fill={isMech("tgf-high") ? "hsl(0 60% 50%)" : "hsl(150 55% 45%)"}
                opacity="0.8">
                {isMech("tgf-high") ? "↑↑ NaCl flow" : "↓ NaCl flow"}
              </text>
            </g>
          )}
        </g>

        {/* ========== MACULA DENSA ========== */}
        <g className="cursor-pointer" onClick={toggle("macula-densa")} opacity={active && active !== "macula-densa" && active !== "tgf-low" && active !== "tgf-high" ? 0.3 : 1}>
          <rect x="195" y="200" width="60" height="30" rx="6"
            fill={isActive("macula-densa") ? "hsl(45 65% 50%/0.25)" : "hsl(45 65% 50%/0.1)"}
            stroke="hsl(45 65% 50%)" strokeWidth={isActive("macula-densa") ? 2 : 1} />
          {/* Tall columnar cells */}
          {[205, 215, 225, 235, 245].map((x, i) => (
            <g key={`md-cell-${i}`}>
              <rect x={x - 3} y={204} width="6" height="22" rx="1.5"
                fill="hsl(45 60% 50%)" fillOpacity={isActive("macula-densa") ? 0.3 : 0.15}
                stroke="hsl(45 60% 50%)" strokeWidth="0.5" />
              <circle cx={x} cy={210} r={1.8} fill="hsl(45 50% 40%)" fillOpacity="0.5" />
            </g>
          ))}
          <text x="225" y="244" fontSize="7" fill="hsl(45 65% 50%)" textAnchor="middle" fontWeight="600">Macula Densa</text>
          <text x="225" y="253" fontSize="5" fill="hsl(45 60% 50%)" textAnchor="middle" opacity="0.6">senses [NaCl] via NKCC2</text>
        </g>

        {/* ========== EXTRAGLOMERULAR MESANGIAL CELLS ========== */}
        <g className="cursor-pointer" onClick={toggle("egm-cells")} opacity={active && active !== "egm-cells" ? 0.3 : 1}>
          {/* Triangle between afferent, efferent, and macula densa */}
          <polygon points="170,160 270,160 220,200"
            fill={isActive("egm-cells") ? "hsl(30 50% 50%/0.15)" : "hsl(30 50% 50%/0.05)"}
            stroke="hsl(30 50% 50%)" strokeWidth={isActive("egm-cells") ? 1.2 : 0.5} strokeDasharray="3 2" />
          {/* Lacis cells */}
          {[{x: 200, y: 175}, {x: 220, y: 180}, {x: 240, y: 175}, {x: 210, y: 185}, {x: 230, y: 188}].map((c, i) => (
            <circle key={`egm-${i}`} cx={c.x} cy={c.y} r={3.5}
              fill="hsl(30 50% 50%)" fillOpacity={isActive("egm-cells") ? 0.25 : 0.1}
              stroke="hsl(30 50% 50%)" strokeWidth="0.5" />
          ))}
          {/* Gap junctions */}
          {isActive("egm-cells") && (
            <g opacity="0.4">
              <line x1={203} y1={176} x2={217} y2={183} stroke="hsl(30 50% 50%)" strokeWidth="0.6" strokeDasharray="1.5 1" />
              <line x1={222} y1={181} x2={233} y2={186} stroke="hsl(30 50% 50%)" strokeWidth="0.6" strokeDasharray="1.5 1" />
              <line x1={240} y1={176} x2={230} y2={185} stroke="hsl(30 50% 50%)" strokeWidth="0.6" strokeDasharray="1.5 1" />
              <text x="220" y="168" fontSize="4.5" fill="hsl(30 50% 50%)" textAnchor="middle">gap junctions</text>
            </g>
          )}
          <text x="220" y="162" fontSize="5.5" fill="hsl(30 50% 50%)" textAnchor="middle" fontWeight="600" opacity="0.7">EGM cells</text>
        </g>

        {/* ========== TGF MECHANISM: LOW NaCl ========== */}
        {isMech("tgf-low") && (
          <g className="animate-fade-in">
            <rect x="10" y="270" width="230" height="160" rx="6" fill="url(#tgfLowGrad)" stroke="hsl(150 55% 45%)" strokeWidth="1" />
            <text x="125" y="288" fontSize="8" fill="hsl(150 55% 45%)" textAnchor="middle" fontWeight="700">↓ NaCl at Macula Densa</text>
            {/* Signal cascade */}
            {[
              { y: 302, text: "↓ NKCC2 uptake → ↓ intracellular [NaCl]" },
              { y: 316, text: "↓ ATP release → ↓ adenosine production" },
              { y: 330, text: "↓ A₁ receptor activation on afferent" },
              { y: 344, text: "→ AFFERENT DILATION → ↑ RBF → ↑ GFR" },
              { y: 360, text: "Also: ↑ PGE₂ & NO release → vasodilation" },
              { y: 376, text: "Also: ↑ renin release → RAAS activation" },
            ].map((line, i) => (
              <text key={i} x="20" y={line.y} fontSize="6" fill={i === 3 ? "hsl(150 60% 45%)" : "hsl(150 45% 45%)"} fontWeight={i === 3 ? "700" : "400"}>
                {line.text}
              </text>
            ))}
            {/* Arrow: macula densa → afferent */}
            <path d="M 225 215 Q 200 200 170 175 Q 150 160 130 150" fill="none"
              stroke="hsl(150 55% 45%)" strokeWidth="1.5" markerEnd="url(#arrGreen)" strokeDasharray="4 2" />
            <text x="165" y="190" fontSize="5" fill="hsl(150 55% 45%)" fontWeight="600" transform="rotate(-30, 165, 190)">dilate</text>
            {/* Arrow: JG cells → renin */}
            <path d="M 132 130 Q 132 110 145 100" fill="none"
              stroke="hsl(260 55% 55%)" strokeWidth="1" markerEnd="url(#arrPurple)" strokeDasharray="3 2" />
            <text x="150" y="98" fontSize="5" fill="hsl(260 55% 55%)">↑ renin</text>
          </g>
        )}

        {/* ========== TGF MECHANISM: HIGH NaCl ========== */}
        {isMech("tgf-high") && (
          <g className="animate-fade-in">
            <rect x="260" y="270" width="230" height="145" rx="6" fill="url(#tgfHighGrad)" stroke="hsl(0 55% 50%)" strokeWidth="1" />
            <text x="375" y="288" fontSize="8" fill="hsl(0 55% 50%)" textAnchor="middle" fontWeight="700">↑ NaCl at Macula Densa</text>
            {[
              { y: 302, text: "↑ NKCC2 uptake → ↑ intracellular [NaCl]" },
              { y: 316, text: "↑ ATP release → ecto-5'-nucleotidase" },
              { y: 330, text: "→ ↑ adenosine → A₁ receptor activation" },
              { y: 344, text: "→ AFFERENT CONSTRICTION → ↓ RBF → ↓ GFR" },
              { y: 358, text: "Also: ↓ renin release (negative feedback)" },
              { y: 372, text: "Response time ~6–10 seconds" },
            ].map((line, i) => (
              <text key={i} x="270" y={line.y} fontSize="6" fill={i === 3 ? "hsl(0 60% 50%)" : "hsl(0 45% 45%)"} fontWeight={i === 3 ? "700" : "400"}>
                {line.text}
              </text>
            ))}
            <path d="M 225 215 Q 200 200 170 175 Q 150 160 130 150" fill="none"
              stroke="hsl(0 55% 50%)" strokeWidth="1.5" markerEnd="url(#arrRedJGA)" strokeDasharray="4 2" />
            <text x="165" y="190" fontSize="5" fill="hsl(0 55% 50%)" fontWeight="600" transform="rotate(-30, 165, 190)">constrict</text>
          </g>
        )}

        {/* ========== RAAS CASCADE ========== */}
        {isMech("raas") && (
          <g className="animate-fade-in">
            <rect x="50" y="270" width="400" height="160" rx="6" fill="hsl(270 40% 50%)" fillOpacity="0.05" stroke="hsl(270 50% 50%)" strokeWidth="1" />
            {/* Cascade boxes */}
            {[
              { x: 70, y: 285, w: 75, label: "Angiotensinogen", sub: "(liver)", color: "hsl(30 40% 50%)" },
              { x: 170, y: 285, w: 65, label: "ANG I", sub: "(decapeptide)", color: "hsl(270 45% 50%)" },
              { x: 260, y: 285, w: 65, label: "ANG II", sub: "(octapeptide)", color: "hsl(270 55% 55%)" },
            ].map((b, i) => (
              <g key={`raas-${i}`}>
                <rect x={b.x} y={b.y} width={b.w} height={28} rx="4" fill={b.color} fillOpacity="0.1" stroke={b.color} strokeWidth="0.8" />
                <text x={b.x + b.w / 2} y={b.y + 12} fontSize="6" fill={b.color} textAnchor="middle" fontWeight="600">{b.label}</text>
                <text x={b.x + b.w / 2} y={b.y + 22} fontSize="4.5" fill={b.color} textAnchor="middle" opacity="0.6">{b.sub}</text>
              </g>
            ))}
            {/* Arrows between cascade */}
            <line x1={145} y1={299} x2={168} y2={299} stroke="hsl(270 50% 50%)" strokeWidth="1" markerEnd="url(#arrPurple)" />
            <text x="156" y="293" fontSize="4.5" fill="hsl(260 55% 55%)" textAnchor="middle" fontWeight="600">Renin</text>
            <line x1={235} y1={299} x2={258} y2={299} stroke="hsl(270 50% 50%)" strokeWidth="1" markerEnd="url(#arrPurple)" />
            <text x="246" y="293" fontSize="4.5" fill="hsl(0 50% 50%)" textAnchor="middle" fontWeight="600">ACE</text>
            <text x="246" y="320" fontSize="4" fill="hsl(0 50% 50%)" textAnchor="middle" opacity="0.5">(lung)</text>
            {/* ANG II effects */}
            {[
              { y: 335, text: "1. Efferent constriction → ↑ filtration fraction" },
              { y: 347, text: "2. Systemic vasoconstriction → ↑ BP" },
              { y: 359, text: "3. Aldosterone (zona glomerulosa) → Na⁺ retention" },
              { y: 371, text: "4. ADH release + thirst stimulation" },
              { y: 383, text: "5. Proximal tubular Na⁺/HCO₃⁻ reabsorption" },
            ].map((l, i) => (
              <text key={i} x="80" y={l.y} fontSize="5.5" fill="hsl(270 45% 50%)">{l.text}</text>
            ))}
            {/* Drug targets */}
            <g opacity="0.6">
              <rect x="340" y="330" width="100" height="55" rx="4" fill="hsl(0 50% 50%)" fillOpacity="0.05" stroke="hsl(0 50% 50%)" strokeWidth="0.6" />
              <text x="390" y="342" fontSize="5" fill="hsl(0 50% 50%)" textAnchor="middle" fontWeight="600">Drug Targets ✕</text>
              <text x="390" y="353" fontSize="4.5" fill="hsl(0 45% 50%)" textAnchor="middle">ACEi (ramipril)</text>
              <text x="390" y="363" fontSize="4.5" fill="hsl(0 45% 50%)" textAnchor="middle">ARBs (losartan)</text>
              <text x="390" y="373" fontSize="4.5" fill="hsl(0 45% 50%)" textAnchor="middle">DRI (aliskiren)</text>
              <text x="390" y="383" fontSize="4.5" fill="hsl(0 45% 50%)" textAnchor="middle">MRA (spironolactone)</text>
            </g>
          </g>
        )}

        {/* ========== SIGNAL ARROWS (always visible, subtle) ========== */}
        {!isMech("tgf-low") && !isMech("tgf-high") && !isMech("raas") && (
          <g opacity="0.3">
            {/* MD → JG cells */}
            <path d="M 220 200 Q 190 180 150 155" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.8" strokeDasharray="3 2" markerEnd="url(#arrJGA)" />
            <text x="178" y="183" fontSize="4.5" fill="hsl(var(--muted-foreground))" transform="rotate(-25, 178, 183)">signal</text>
            {/* MD → afferent */}
            <path d="M 210 200 Q 170 185 130 165" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.8" strokeDasharray="3 2" markerEnd="url(#arrJGA)" />
            {/* EGM relay */}
            <path d="M 220 195 Q 220 185 220 175" fill="none" stroke="hsl(30 50% 50%)" strokeWidth="0.6" strokeDasharray="2 1" />
          </g>
        )}

        {/* Labels for non-mechanism view */}
        {!isMech("tgf-low") && !isMech("tgf-high") && !isMech("raas") && (
          <g opacity="0.4">
            <rect x="50" y="310" width="180" height="45" rx="4" fill="hsl(var(--secondary))" fillOpacity="0.4" stroke="hsl(var(--border))" strokeWidth="0.5" />
            <text x="140" y="326" fontSize="6" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="600">Tubuloglomerular Feedback</text>
            <text x="140" y="338" fontSize="5" fill="hsl(var(--muted-foreground))" textAnchor="middle">↑NaCl → constrict afferent → ↓GFR</text>
            <text x="140" y="348" fontSize="5" fill="hsl(var(--muted-foreground))" textAnchor="middle">↓NaCl → dilate afferent → ↑GFR</text>

            <rect x="270" y="310" width="180" height="45" rx="4" fill="hsl(var(--secondary))" fillOpacity="0.4" stroke="hsl(var(--border))" strokeWidth="0.5" />
            <text x="360" y="326" fontSize="6" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="600">RAAS Activation</text>
            <text x="360" y="338" fontSize="5" fill="hsl(var(--muted-foreground))" textAnchor="middle">↓NaCl / ↓perfusion / β₁ → renin</text>
            <text x="360" y="348" fontSize="5" fill="hsl(var(--muted-foreground))" textAnchor="middle">→ ANG II → efferent constriction</text>
          </g>
        )}

        {/* Bowman's capsule label */}
        <text x="220" y="108" fontSize="5" fill="hsl(0 40% 45%)" textAnchor="middle" opacity="0.35">Bowman's capsule</text>
      </svg>

      {/* Info panel */}
      {info ? (
        <div className="rounded-lg border border-border bg-secondary/30 p-4 animate-fade-in" key={info.id}>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: info.color }} />
            <h4 className="text-sm font-semibold text-foreground">{info.label}</h4>
            <span className="text-xs text-muted-foreground capitalize">({info.category})</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{info.description}</p>
          <p className="text-xs text-muted-foreground mt-2 border-t border-border pt-2">
            <span className="font-semibold text-foreground/80">Clinical: </span>{info.detail}
          </p>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground text-center">Click any structure or mechanism to explore its anatomy, function, and clinical relevance</p>
      )}
    </div>
  );
};

export default JGADiagram;

import { useState } from "react";

type PathwayKey = "beta-camp" | "pde-camp" | "glucagon-camp" | "ca-sensitisation" | "nak-atpase" | "direct-ca";

interface Pathway {
  label: string;
  color: string;
  agents: string;
  steps: string[];
  netEffect: string;
  clinicalNote: string;
}

const pathways: Record<PathwayKey, Pathway> = {
  "beta-camp": {
    label: "β₁-Agonist → ↑ cAMP",
    color: "hsl(210, 60%, 55%)",
    agents: "Adrenaline, dobutamine, dopamine, isoprenaline",
    steps: [
      "β₁-receptor activated by agonist",
      "Gs protein activates adenylyl cyclase (AC)",
      "AC converts ATP → cAMP",
      "cAMP activates protein kinase A (PKA)",
      "PKA phosphorylates L-type Ca²⁺ channels → ↑ Ca²⁺ entry",
      "PKA phosphorylates phospholamban → ↑ SERCA activity → faster relaxation (lusitropy)",
      "↑ Intracellular [Ca²⁺] → ↑ contractile force",
    ],
    netEffect: "↑ Inotropy, ↑ chronotropy, ↑ lusitropy. ↑ MVO₂.",
    clinicalNote: "Most commonly used inotropes. Dose-dependent effects. Tachyphylaxis with prolonged use due to β-receptor downregulation."
  },
  "pde-camp": {
    label: "PDE III Inhibitor → ↑ cAMP",
    color: "hsl(280, 50%, 55%)",
    agents: "Milrinone, enoximone",
    steps: [
      "PDE III normally breaks down cAMP → AMP",
      "PDE III inhibitor blocks this degradation",
      "cAMP accumulates in cardiomyocyte",
      "PKA activation (same downstream pathway as β₁ agonists)",
      "In vascular smooth muscle: ↑ cAMP → vasodilation (inodilation)",
    ],
    netEffect: "↑ Inotropy + vasodilation (inodilator). ↓ PVR — useful in RV failure.",
    clinicalNote: "Bypasses β-receptor → effective in β-blocked or downregulated patients. No tachyphylaxis. Risk of hypotension."
  },
  "glucagon-camp": {
    label: "Glucagon Receptor → ↑ cAMP",
    color: "hsl(30, 60%, 50%)",
    agents: "Glucagon",
    steps: [
      "Glucagon binds to glucagon receptor on cardiomyocyte",
      "Receptor couples to Gs protein (same as β₁)",
      "Gs activates adenylyl cyclase → ↑ cAMP",
      "PKA activation → ↑ Ca²⁺ entry",
      "Entire pathway bypasses the β-receptor",
    ],
    netEffect: "↑ Inotropy, ↑ chronotropy. Also ↑ blood glucose.",
    clinicalNote: "Key role in β-blocker overdose — bypasses the blocked β-receptor to restore cAMP production via an alternative receptor."
  },
  "ca-sensitisation": {
    label: "Ca²⁺ Sensitisation",
    color: "hsl(150, 50%, 45%)",
    agents: "Levosimendan",
    steps: [
      "Levosimendan binds to troponin C",
      "Stabilises the Ca²⁺–troponin C complex",
      "↑ Contractile force at the SAME intracellular [Ca²⁺]",
      "No increase in intracellular Ca²⁺ concentration",
      "Also opens KATP channels → vasodilation + cardioprotection",
      "Also has mild PDE III inhibitor activity",
    ],
    netEffect: "↑ Inotropy WITHOUT ↑ MVO₂. Vasodilation. Cardioprotection.",
    clinicalNote: "Unique mechanism: improves contractility without increasing myocardial oxygen demand. Active metabolite OR-1896 (T½ ~75h) prolongs effect for days."
  },
  "nak-atpase": {
    label: "Na⁺/K⁺-ATPase Inhibition",
    color: "hsl(0, 55%, 50%)",
    agents: "Digoxin, digitoxin",
    steps: [
      "Digoxin inhibits Na⁺/K⁺-ATPase on cell membrane",
      "↑ Intracellular [Na⁺]",
      "Na⁺/Ca²⁺ exchanger (NCX) reverses direction",
      "NCX normally exports Ca²⁺ / imports Na⁺ — now reversed",
      "↑ Intracellular [Ca²⁺]",
      "↑ Ca²⁺ available for excitation-contraction coupling",
    ],
    netEffect: "Weak inotrope. ↓ HR (vagotonic). ↓ AV conduction. Narrow TI.",
    clinicalNote: "Toxicity enhanced by ↓K⁺ (competes for same binding site), ↓Mg²⁺, ↑Ca²⁺. Treat toxicity with DigiFab. Not removed by dialysis (large Vd)."
  },
  "direct-ca": {
    label: "Direct Ca²⁺ Supplementation",
    color: "hsl(45, 65%, 48%)",
    agents: "Calcium chloride, calcium gluconate",
    steps: [
      "IV calcium raises extracellular [Ca²⁺]",
      "↑ Driving gradient for Ca²⁺ entry via L-type channels",
      "↑ Ca²⁺ available during systolic depolarisation",
      "↑ Excitation-contraction coupling strength",
    ],
    netEffect: "↑ Inotropy. Membrane stabilisation (hyperkalaemia). Transient effect.",
    clinicalNote: "CaCl₂ provides 3× more ionised Ca²⁺ than gluconate. Used in hyperkalaemia (stabilises membrane), CCB toxicity, massive transfusion, and cardiac arrest."
  },
};

const pathwayOrder: PathwayKey[] = ["beta-camp", "pde-camp", "glucagon-camp", "ca-sensitisation", "nak-atpase", "direct-ca"];

const InotropeSignallingDiagram = () => {
  const [selected, setSelected] = useState<PathwayKey>("beta-camp");
  const info = pathways[selected];

  // SVG layout
  const cellX = 30, cellY = 20, cellW = 260, cellH = 180;

  return (
    <div className="border border-border rounded-lg p-4 mb-6">
      <h3 className="text-lg font-serif font-bold text-foreground mb-1">Inotrope Signalling Pathways</h3>
      <p className="text-xs text-muted-foreground mb-3">Tap a pathway to explore the intracellular mechanism</p>

      {/* Pathway selector buttons */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {pathwayOrder.map((key) => (
          <button
            key={key}
            onClick={() => setSelected(key)}
            className={`text-xs px-2.5 py-1.5 rounded border transition-all ${
              selected === key
                ? "border-primary bg-primary/10 text-foreground font-medium"
                : "border-border text-muted-foreground hover:border-primary/50"
            }`}
          >
            {pathways[key].label}
          </button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start">
        {/* SVG diagram */}
        <div className="flex-shrink-0 mx-auto">
          <svg viewBox="0 0 320 220" width="320" height="220" className="border border-border rounded">
            {/* Cell membrane */}
            <rect x={cellX} y={cellY} width={cellW} height={cellH} rx="12"
              fill="hsl(var(--secondary))" fillOpacity="0.3"
              stroke="hsl(var(--border))" strokeWidth="1.5" strokeDasharray="6 3" />
            <text x={cellX + cellW / 2} y={cellY + 12} fontSize="7" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontWeight="bold">
              CARDIOMYOCYTE
            </text>
            <text x={cellX + cellW / 2} y={cellY - 5} fontSize="6" textAnchor="middle" fill="hsl(var(--muted-foreground))">
              Cell Membrane
            </text>

            {/* Common final path: myofilaments */}
            <rect x={cellX + 70} y={cellY + cellH - 35} width={120} height={22} rx="4"
              fill="hsl(340, 40%, 55%)" fillOpacity="0.2" stroke="hsl(340, 40%, 55%)" strokeWidth="1" />
            <text x={cellX + 130} y={cellY + cellH - 20} fontSize="6.5" textAnchor="middle" fill="hsl(340, 40%, 55%)" fontWeight="bold">
              Actin–Myosin + Troponin C
            </text>
            <text x={cellX + 130} y={cellY + cellH - 12} fontSize="5.5" textAnchor="middle" fill="hsl(340, 40%, 55%)">
              → CONTRACTION
            </text>

            {/* Pathway-specific elements */}
            {(selected === "beta-camp" || selected === "pde-camp" || selected === "glucagon-camp") && (
              <g>
                {/* Receptor on membrane */}
                <rect x={cellX - 5} y={cellY + 25} width={30} height={18} rx="3"
                  fill={info.color} fillOpacity="0.4" stroke={info.color} strokeWidth="1.5" />
                <text x={cellX + 10} y={cellY + 36} fontSize="5" textAnchor="middle" fill={info.color} fontWeight="bold">
                  {selected === "beta-camp" ? "β₁-R" : selected === "glucagon-camp" ? "Gluc-R" : "—"}
                </text>

                {/* Gs */}
                <circle cx={cellX + 55} cy={cellY + 34} r="10" fill={info.color} fillOpacity="0.2" stroke={info.color} strokeWidth="1" />
                <text x={cellX + 55} y={cellY + 37} fontSize="6" textAnchor="middle" fill={info.color} fontWeight="bold">Gs</text>
                <line x1={cellX + 25} y1={cellY + 34} x2={cellX + 45} y2={cellY + 34} stroke={info.color} strokeWidth="1.5" markerEnd="url(#arrowInotrope)" />

                {/* AC */}
                <rect x={cellX + 80} y={cellY + 25} width={28} height={18} rx="3"
                  fill={info.color} fillOpacity="0.3" stroke={info.color} strokeWidth="1" />
                <text x={cellX + 94} y={cellY + 37} fontSize="6" textAnchor="middle" fill={info.color} fontWeight="bold">AC</text>
                <line x1={cellX + 65} y1={cellY + 34} x2={cellX + 80} y2={cellY + 34} stroke={info.color} strokeWidth="1.5" markerEnd="url(#arrowInotrope)" />

                {/* cAMP */}
                <circle cx={cellX + 140} cy={cellY + 60} r="14" fill={info.color} fillOpacity="0.25" stroke={info.color} strokeWidth="1.5" />
                <text x={cellX + 140} y={cellY + 58} fontSize="6.5" textAnchor="middle" fill={info.color} fontWeight="bold">cAMP</text>
                <text x={cellX + 140} y={cellY + 66} fontSize="5" textAnchor="middle" fill={info.color}>↑↑↑</text>
                <line x1={cellX + 108} y1={cellY + 38} x2={cellX + 128} y2={cellY + 52} stroke={info.color} strokeWidth="1.5" markerEnd="url(#arrowInotrope)" />

                {/* PDE III inhibitor block */}
                {selected === "pde-camp" && (
                  <g>
                    <rect x={cellX + 170} y={cellY + 42} width={30} height={16} rx="3"
                      fill="hsl(0, 60%, 50%)" fillOpacity="0.2" stroke="hsl(0, 60%, 50%)" strokeWidth="1" />
                    <text x={cellX + 185} y={cellY + 53} fontSize="5" textAnchor="middle" fill="hsl(0, 60%, 50%)" fontWeight="bold">PDE III</text>
                    <line x1={cellX + 154} y1={cellY + 55} x2={cellX + 170} y2={cellY + 52} stroke="hsl(0, 60%, 50%)" strokeWidth="1" strokeDasharray="3 2" />
                    <text x={cellX + 210} y={cellY + 50} fontSize="8" fill="hsl(0, 60%, 50%)" fontWeight="bold">✕</text>
                    <text x={cellX + 205} y={cellY + 62} fontSize="5" fill="hsl(0, 60%, 50%)">BLOCKED</text>
                  </g>
                )}

                {/* PKA */}
                <rect x={cellX + 115} y={cellY + 85} width={50} height={18} rx="3"
                  fill={info.color} fillOpacity="0.3" stroke={info.color} strokeWidth="1" />
                <text x={cellX + 140} y={cellY + 97} fontSize="6.5" textAnchor="middle" fill={info.color} fontWeight="bold">PKA</text>
                <line x1={cellX + 140} y1={cellY + 74} x2={cellX + 140} y2={cellY + 85} stroke={info.color} strokeWidth="1.5" markerEnd="url(#arrowInotrope)" />

                {/* L-type Ca channel */}
                <rect x={cellX + 190} y={cellY + 85} width={55} height={18} rx="3"
                  fill="hsl(45, 60%, 50%)" fillOpacity="0.25" stroke="hsl(45, 60%, 50%)" strokeWidth="1" />
                <text x={cellX + 217} y={cellY + 97} fontSize="5.5" textAnchor="middle" fill="hsl(45, 60%, 50%)" fontWeight="bold">L-type Ca²⁺</text>
                <line x1={cellX + 165} y1={cellY + 94} x2={cellX + 190} y2={cellY + 94} stroke="hsl(45, 60%, 50%)" strokeWidth="1" markerEnd="url(#arrowInotrope)" />

                {/* Ca²⁺ to myofilaments */}
                <text x={cellX + 217} y={cellY + 115} fontSize="7" textAnchor="middle" fill="hsl(45, 60%, 50%)" fontWeight="bold">Ca²⁺ ↑</text>
                <line x1={cellX + 200} y1={cellY + 120} x2={cellX + 170} y2={cellY + cellH - 35} stroke="hsl(340, 40%, 55%)" strokeWidth="1" strokeDasharray="3 2" markerEnd="url(#arrowInotrope)" />

                {/* Phospholamban/SERCA */}
                <text x={cellX + 60} y={cellY + 95} fontSize="5" fill={info.color}>PLB → SERCA ↑</text>
                <text x={cellX + 60} y={cellY + 103} fontSize="4.5" fill={info.color} opacity="0.7">(↑ lusitropy)</text>
                <line x1={cellX + 115} y1={cellY + 97} x2={cellX + 95} y2={cellY + 92} stroke={info.color} strokeWidth="0.8" markerEnd="url(#arrowInotrope)" />
              </g>
            )}

            {selected === "ca-sensitisation" && (
              <g>
                {/* Levosimendan enters */}
                <text x={cellX + 10} y={cellY + 35} fontSize="6" fill={info.color} fontWeight="bold">Levosimendan</text>
                <line x1={cellX + 60} y1={cellY + 38} x2={cellX + 100} y2={cellY + 60} stroke={info.color} strokeWidth="1.5" markerEnd="url(#arrowInotrope)" />

                {/* Troponin C binding */}
                <circle cx={cellX + 130} cy={cellY + 70} r="18" fill={info.color} fillOpacity="0.2" stroke={info.color} strokeWidth="1.5" />
                <text x={cellX + 130} y={cellY + 66} fontSize="6" textAnchor="middle" fill={info.color} fontWeight="bold">TnC</text>
                <text x={cellX + 130} y={cellY + 76} fontSize="5" textAnchor="middle" fill={info.color}>+ Ca²⁺</text>

                {/* Stabilised complex */}
                <text x={cellX + 130} y={cellY + 100} fontSize="5.5" textAnchor="middle" fill={info.color} fontWeight="bold">Ca²⁺–TnC STABILISED</text>
                <line x1={cellX + 130} y1={cellY + 88} x2={cellX + 130} y2={cellY + 95} stroke={info.color} strokeWidth="1.5" markerEnd="url(#arrowInotrope)" />

                {/* No Ca increase */}
                <rect x={cellX + 170} y={cellY + 40} width={80} height={22} rx="3"
                  fill="hsl(150, 50%, 45%)" fillOpacity="0.15" stroke={info.color} strokeWidth="1" />
                <text x={cellX + 210} y={cellY + 50} fontSize="5" textAnchor="middle" fill={info.color} fontWeight="bold">NO ↑ [Ca²⁺]ᵢ</text>
                <text x={cellX + 210} y={cellY + 58} fontSize="4.5" textAnchor="middle" fill={info.color}>= NO ↑ MVO₂</text>

                {/* KATP */}
                <text x={cellX + 20} y={cellY + 110} fontSize="5" fill={info.color}>Also: KATP channels →</text>
                <text x={cellX + 20} y={cellY + 118} fontSize="5" fill={info.color}>vasodilation + protection</text>

                {/* Arrow to myofilaments */}
                <line x1={cellX + 130} y1={cellY + 105} x2={cellX + 130} y2={cellY + cellH - 35} stroke="hsl(340, 40%, 55%)" strokeWidth="1.5" markerEnd="url(#arrowInotrope)" />
              </g>
            )}

            {selected === "nak-atpase" && (
              <g>
                {/* Na/K ATPase on membrane */}
                <rect x={cellX - 5} y={cellY + 30} width={45} height={22} rx="3"
                  fill={info.color} fillOpacity="0.3" stroke={info.color} strokeWidth="1.5" />
                <text x={cellX + 17} y={cellY + 40} fontSize="5" textAnchor="middle" fill={info.color} fontWeight="bold">Na⁺/K⁺</text>
                <text x={cellX + 17} y={cellY + 48} fontSize="5" textAnchor="middle" fill={info.color} fontWeight="bold">ATPase</text>

                {/* X block */}
                <text x={cellX + 48} y={cellY + 35} fontSize="10" fill={info.color} fontWeight="bold">✕</text>
                <text x={cellX + 45} y={cellY + 25} fontSize="5" fill={info.color}>Digoxin</text>

                {/* Na+ rises */}
                <circle cx={cellX + 100} cy={cellY + 50} r="14" fill="hsl(210, 50%, 55%)" fillOpacity="0.2" stroke="hsl(210, 50%, 55%)" strokeWidth="1" />
                <text x={cellX + 100} y={cellY + 48} fontSize="6" textAnchor="middle" fill="hsl(210, 50%, 55%)" fontWeight="bold">Na⁺ ↑</text>
                <text x={cellX + 100} y={cellY + 57} fontSize="5" textAnchor="middle" fill="hsl(210, 50%, 55%)">(intracell.)</text>
                <line x1={cellX + 55} y1={cellY + 43} x2={cellX + 86} y2={cellY + 47} stroke="hsl(210, 50%, 55%)" strokeWidth="1.5" markerEnd="url(#arrowInotrope)" />

                {/* NCX reversal */}
                <rect x={cellX + 130} y={cellY + 55} width={50} height={22} rx="3"
                  fill="hsl(45, 60%, 50%)" fillOpacity="0.2" stroke="hsl(45, 60%, 50%)" strokeWidth="1" />
                <text x={cellX + 155} y={cellY + 65} fontSize="5" textAnchor="middle" fill="hsl(45, 60%, 50%)" fontWeight="bold">NCX</text>
                <text x={cellX + 155} y={cellY + 73} fontSize="4.5" textAnchor="middle" fill="hsl(45, 60%, 50%)">REVERSED</text>
                <line x1={cellX + 114} y1={cellY + 55} x2={cellX + 130} y2={cellY + 62} stroke="hsl(45, 60%, 50%)" strokeWidth="1.5" markerEnd="url(#arrowInotrope)" />

                {/* Ca²⁺ rises */}
                <circle cx={cellX + 155} cy={cellY + 100} r="14" fill="hsl(45, 60%, 50%)" fillOpacity="0.25" stroke="hsl(45, 60%, 50%)" strokeWidth="1.5" />
                <text x={cellX + 155} y={cellY + 98} fontSize="7" textAnchor="middle" fill="hsl(45, 60%, 50%)" fontWeight="bold">Ca²⁺ ↑</text>
                <text x={cellX + 155} y={cellY + 107} fontSize="5" textAnchor="middle" fill="hsl(45, 60%, 50%)">↑↑</text>
                <line x1={cellX + 155} y1={cellY + 77} x2={cellX + 155} y2={cellY + 86} stroke="hsl(45, 60%, 50%)" strokeWidth="1.5" markerEnd="url(#arrowInotrope)" />

                {/* To myofilaments */}
                <line x1={cellX + 155} y1={cellY + 114} x2={cellX + 150} y2={cellY + cellH - 35} stroke="hsl(340, 40%, 55%)" strokeWidth="1.5" markerEnd="url(#arrowInotrope)" />

                {/* Vagal effect */}
                <text x={cellX + 210} y={cellY + 95} fontSize="5" fill={info.color}>Also: ↑ vagal tone</text>
                <text x={cellX + 210} y={cellY + 103} fontSize="5" fill={info.color}>→ ↓ HR, ↓ AV cond.</text>
              </g>
            )}

            {selected === "direct-ca" && (
              <g>
                {/* IV Ca²⁺ */}
                <text x={cellX + 10} y={cellY - 5} fontSize="6" fill={info.color} fontWeight="bold">IV Ca²⁺ (CaCl₂ / gluconate)</text>

                {/* Extracellular Ca²⁺ */}
                <rect x={cellX + 80} y={cellY + 25} width={100} height={22} rx="3"
                  fill={info.color} fillOpacity="0.25" stroke={info.color} strokeWidth="1.5" />
                <text x={cellX + 130} y={cellY + 37} fontSize="6" textAnchor="middle" fill={info.color} fontWeight="bold">Extracell. [Ca²⁺] ↑↑</text>

                {/* L-type channel */}
                <rect x={cellX + 90} y={cellY + 60} width={80} height={20} rx="3"
                  fill="hsl(45, 60%, 50%)" fillOpacity="0.2" stroke="hsl(45, 60%, 50%)" strokeWidth="1" />
                <text x={cellX + 130} y={cellY + 73} fontSize="5.5" textAnchor="middle" fill="hsl(45, 60%, 50%)" fontWeight="bold">L-type Ca²⁺ Channel</text>
                <line x1={cellX + 130} y1={cellY + 47} x2={cellX + 130} y2={cellY + 60} stroke={info.color} strokeWidth="1.5" markerEnd="url(#arrowInotrope)" />

                {/* Increased driving gradient */}
                <text x={cellX + 130} y={cellY + 93} fontSize="6" textAnchor="middle" fill={info.color} fontWeight="bold">↑ Ca²⁺ driving gradient</text>
                <line x1={cellX + 130} y1={cellY + 80} x2={cellX + 130} y2={cellY + 87} stroke={info.color} strokeWidth="1.5" markerEnd="url(#arrowInotrope)" />

                {/* Ca²⁺ entry */}
                <circle cx={cellX + 130} cy={cellY + 110} r="14" fill={info.color} fillOpacity="0.25" stroke={info.color} strokeWidth="1.5" />
                <text x={cellX + 130} y={cellY + 108} fontSize="7" textAnchor="middle" fill={info.color} fontWeight="bold">Ca²⁺ ↑</text>
                <text x={cellX + 130} y={cellY + 117} fontSize="5" textAnchor="middle" fill={info.color}>(intracell.)</text>
                <line x1={cellX + 130} y1={cellY + 97} x2={cellX + 130} y2={cellY + 96} stroke={info.color} strokeWidth="1.5" />

                {/* To myofilaments */}
                <line x1={cellX + 130} y1={cellY + 124} x2={cellX + 130} y2={cellY + cellH - 35} stroke="hsl(340, 40%, 55%)" strokeWidth="1.5" markerEnd="url(#arrowInotrope)" />

                {/* Membrane stabilisation note */}
                <text x={cellX + 10} y={cellY + 110} fontSize="5" fill={info.color}>Also stabilises</text>
                <text x={cellX + 10} y={cellY + 118} fontSize="5" fill={info.color}>cardiac membrane</text>
                <text x={cellX + 10} y={cellY + 126} fontSize="5" fill={info.color}>(hyperkalaemia)</text>
              </g>
            )}

            {/* Arrow marker */}
            <defs>
              <marker id="arrowInotrope" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                <path d="M0,0 L6,2 L0,4" fill="hsl(var(--foreground))" opacity="0.6" />
              </marker>
            </defs>

            {/* Common final path label */}
            <text x={cellX + cellW / 2} y={cellY + cellH + 12} fontSize="6.5" textAnchor="middle" fill="hsl(340, 40%, 55%)" fontWeight="bold">
              All pathways → ↑ Ca²⁺–Troponin C interaction → ↑ CONTRACTILE FORCE
            </text>
          </svg>
        </div>

        {/* Info panel */}
        <div className="flex-1 min-w-0">
          <div className="p-4 rounded-lg border border-border animate-fade-in" key={selected}>
            <p className="font-bold text-sm" style={{ color: info.color }}>{info.label}</p>
            <p className="text-xs text-muted-foreground mt-1 mb-2 italic">{info.agents}</p>

            <div className="space-y-1">
              {info.steps.map((step, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-xs font-bold text-primary mt-0.5 w-4 flex-shrink-0">{i + 1}</span>
                  <span className="text-xs text-muted-foreground">{step}</span>
                </div>
              ))}
            </div>

            <p className="text-xs mt-3 p-2 rounded bg-secondary/50 text-foreground">
              <strong>Net effect:</strong> {info.netEffect}
            </p>
            <p className="text-xs mt-2 p-2 rounded bg-secondary/50 text-foreground">
              <strong>Clinical:</strong> {info.clinicalNote}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InotropeSignallingDiagram;

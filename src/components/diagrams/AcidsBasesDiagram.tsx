import { useState } from "react";
import { DiagramFigure } from "./_shared/DiagramFigure";

export const AcidsBasesDiagram = () => {
  const [pka, setPka] = useState(7.4);
  const [ph, setPh] = useState(7.4);
  const [activeTab, setActiveTab] = useState<"ph" | "hh" | "buffers">("ph");

  // Henderson-Hasselbalch
  const ratio = Math.pow(10, ph - pka);
  const percentIonised = (ratio / (1 + ratio)) * 100;
  const percentUnionised = 100 - percentIonised;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex gap-2 justify-center mb-6">
        {([
          { key: "ph" as const, label: "pH Scale" },
          { key: "hh" as const, label: "Henderson-Hasselbalch" },
          { key: "buffers" as const, label: "Buffer Systems" },
        ]).map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              activeTab === key
                ? "bg-chemistry/10 border-chemistry text-chemistry"
                : "border-border text-muted-foreground hover:border-chemistry/50"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {activeTab === "ph" && (
        <div className="space-y-4">
          <div className="bg-secondary/30 rounded-xl p-4 border border-border text-center">
            <p className="text-xs text-muted-foreground mb-1">Definition</p>
            <p className="text-base font-mono font-bold text-foreground">pH = −log₁₀[H⁺]</p>
            <p className="text-xs text-muted-foreground mt-1">A change of 1 pH unit = 10-fold change in [H⁺]</p>
          </div>

          {/* pH scale */}
          <svg viewBox="0 0 440 200" className="w-full">
            {/* Gradient bar */}
            <defs>
              <linearGradient id="phGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="hsl(0 80% 50%)" />
                <stop offset="35%" stopColor="hsl(35 80% 55%)" />
                <stop offset="50%" stopColor="hsl(95 50% 50%)" />
                <stop offset="65%" stopColor="hsl(170 60% 45%)" />
                <stop offset="100%" stopColor="hsl(260 60% 45%)" />
              </linearGradient>
            </defs>
            <rect x={30} y={30} width={380} height={30} rx="6" fill="url(#phGrad)" opacity="0.8" />
            
            {/* pH labels */}
            {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14].map(v => {
              const x = 30 + (v / 14) * 380;
              return (
                <g key={v}>
                  <line x1={x} y1={60} x2={x} y2={68} stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.5" />
                  <text x={x} y={78} textAnchor="middle" fontSize="8" className="fill-foreground">{v}</text>
                </g>
              );
            })}
            <text x={30} y={92} fontSize="9" className="fill-muted-foreground">← Acidic (↑ [H⁺])</text>
            <text x={410} y={92} textAnchor="end" fontSize="9" className="fill-muted-foreground">Alkaline (↓ [H⁺]) →</text>
            <text x={220} y={22} textAnchor="middle" fontSize="10" className="fill-foreground font-semibold">pH Scale</text>

            {/* Clinical markers */}
            {[
              { ph: 1, label: "Gastric acid", y: 110 },
              { ph: 4.6, label: "LA pKa ~7.9\n(tissue pH)", y: 145 },
              { ph: 6.1, label: "pKa CO₂/HCO₃⁻", y: 125 },
              { ph: 7.35, label: "Acidaemia", y: 110 },
              { ph: 7.4, label: "Blood pH", y: 135 },
              { ph: 7.45, label: "Alkalaemia", y: 110 },
              { ph: 8, label: "Pancreatic\njuice", y: 160 },
              { ph: 13, label: "Soda lime", y: 110 },
            ].map((m, i) => {
              const x = 30 + (m.ph / 14) * 380;
              return (
    <DiagramFigure
      id="acids-bases-diagram"
      title="Acids bases"
      description="Auto-generated wrapper for the Acids bases anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
                      <g key={i}>
                    <line x1={x} y1={60} x2={x} y2={m.y - 8} stroke="hsl(var(--foreground))" strokeWidth="0.75" strokeDasharray="2 2" opacity="0.6" />
                    <circle cx={x} cy={45} r={3} fill="hsl(var(--foreground))" opacity="0.7" />
                    {m.label.split("\n").map((line, j) => (
                      <text key={j} x={x} y={m.y + j * 10} textAnchor="middle" fontSize="7" className="fill-muted-foreground">{line}</text>
                    ))}
                  </g>
    </DiagramFigure>
  );
            })}

            {/* Normal range highlight */}
            <rect x={30 + (7.35/14)*380} y={30} width={(0.1/14)*380} height={30} fill="hsl(95 55% 38%)" opacity="0.25" rx="2" />
          </svg>

          <div className="bg-card rounded-xl border border-border p-4">
            <h4 className="text-xs font-semibold text-foreground mb-2">Key Relationships</h4>
            <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground">
              <div>
                <p className="font-medium text-foreground">Normal blood [H⁺]</p>
                <p>40 nmol/L (pH 7.40)</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Compatible with life</p>
                <p>pH 6.8–7.8 ([H⁺] 16–160 nmol/L)</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Intracellular pH</p>
                <p>~7.0–7.2 (slightly more acidic)</p>
              </div>
              <div>
                <p className="font-medium text-foreground">CSF pH</p>
                <p>~7.32 (lower HCO₃⁻ than plasma)</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "hh" && (
        <div className="space-y-4">
          <div className="bg-secondary/30 rounded-xl p-4 border border-border text-center">
            <p className="text-xs text-muted-foreground mb-1">Henderson-Hasselbalch Equation</p>
            <p className="text-base font-mono font-bold text-foreground">
              pH = pKa + log₁₀([A⁻] / [HA])
            </p>
            <p className="text-xs text-muted-foreground mt-2">When pH = pKa → 50% ionised, 50% unionised</p>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">pKa</span>
                <span className="font-mono font-semibold text-foreground">{pka.toFixed(1)}</span>
              </div>
              <input type="range" min={2} max={12} step={0.1} value={pka} onChange={e => setPka(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none bg-secondary cursor-pointer accent-chemistry" />
              <div className="flex justify-between text-xs text-muted-foreground mt-0.5">
                <span>Aspirin (3.5)</span>
                <span>Morphine (8.0)</span>
                <span>Atropine (9.7)</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">pH of environment</span>
                <span className="font-mono font-semibold text-foreground">{ph.toFixed(1)}</span>
              </div>
              <input type="range" min={1} max={14} step={0.1} value={ph} onChange={e => setPh(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none bg-secondary cursor-pointer accent-chemistry" />
            </div>
          </div>

          {/* Visual bar */}
          <div className="bg-card rounded-xl border border-border p-4">
            <div className="flex justify-between text-xs mb-2">
              <span className="text-muted-foreground">Unionised (HA) — lipid-soluble</span>
              <span className="text-muted-foreground">Ionised (A⁻) — water-soluble</span>
            </div>
            <div className="flex h-8 rounded-lg overflow-hidden border border-border">
              <div className="flex items-center justify-center text-xs font-bold transition-all duration-300" style={{ width: `${percentUnionised}%`, background: "hsl(95 55% 38%)", color: "white" }}>
                {percentUnionised > 10 ? `${percentUnionised.toFixed(0)}%` : ""}
              </div>
              <div className="flex items-center justify-center text-xs font-bold transition-all duration-300" style={{ width: `${percentIonised}%`, background: "hsl(210 70% 50%)", color: "white" }}>
                {percentIonised > 10 ? `${percentIonised.toFixed(0)}%` : ""}
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              [A⁻]/[HA] ratio = {ratio < 0.01 ? ratio.toExponential(1) : ratio > 100 ? ratio.toExponential(1) : ratio.toFixed(2)}
            </p>
          </div>

          <div className="bg-secondary/30 rounded-lg p-3 border border-border">
            <p className="text-xs font-medium text-foreground mb-1">Clinical Application — Ion Trapping</p>
            <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
              <li>Weak acids (e.g. aspirin pKa 3.5) are mostly unionised in acidic stomach → absorbed</li>
              <li>In alkaline plasma (pH 7.4), weak acids become ionised → <strong>ion trapped</strong> in blood</li>
              <li>Local anaesthetics (weak bases, pKa ~7.7–8.1) are more ionised at lower pH → less effective in infected (acidic) tissue</li>
              <li>Only the <strong>unionised fraction</strong> crosses lipid membranes (blood-brain barrier, placenta)</li>
            </ul>
          </div>
        </div>
      )}

      {activeTab === "buffers" && (
        <div className="space-y-4">
          <div className="bg-secondary/30 rounded-xl p-4 border border-border text-center">
            <p className="text-xs text-muted-foreground mb-1">Buffer Definition</p>
            <p className="text-sm font-medium text-foreground">
              A solution that resists changes in pH when small amounts of acid or base are added
            </p>
            <p className="text-xs text-muted-foreground mt-1">Most effective within ±1 pH unit of its pKa</p>
          </div>

          {/* Buffer systems table */}
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  <th className="text-left p-2 font-semibold text-foreground">Buffer System</th>
                  <th className="text-left p-2 font-semibold text-foreground">pKa</th>
                  <th className="text-left p-2 font-semibold text-foreground">Location</th>
                  <th className="text-left p-2 font-semibold text-foreground">% Buffering</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "CO₂/HCO₃⁻", pka: "6.1", loc: "ECF (plasma)", pct: "~35%", note: "Open system — CO₂ exhaled. Most important ECF buffer despite pKa far from 7.4" },
                  { name: "Haemoglobin", pka: "Variable", loc: "RBCs", pct: "~35%", note: "Histidine residues. Deoxyhaemoglobin is a better buffer (Haldane effect)" },
                  { name: "Protein", pka: "Variable", loc: "ICF + plasma", pct: "~7%", note: "Albumin, histidine/cysteine side chains" },
                  { name: "Phosphate", pka: "6.8", loc: "ICF + urine", pct: "~5%", note: "H₂PO₄⁻/HPO₄²⁻. Important renal buffer (titratable acidity)" },
                  { name: "Bone CaCO₃", pka: "—", loc: "Bone", pct: "~18%", note: "Chronic buffering. CaCO₃ dissolution releases Ca²⁺ and HCO₃⁻" },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-border/50 last:border-0">
                    <td className="p-2 font-medium text-foreground">{row.name}</td>
                    <td className="p-2 font-mono">{row.pka}</td>
                    <td className="p-2">{row.loc}</td>
                    <td className="p-2 font-mono">{row.pct}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bicarbonate buffer equation */}
          <div className="bg-card rounded-xl border border-border p-4">
            <h4 className="text-xs font-semibold text-foreground mb-2">The Bicarbonate Buffer System</h4>
            <div className="text-center mb-3">
              <p className="text-sm font-mono text-foreground">
                CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻
              </p>
              <p className="text-xs text-muted-foreground mt-1">(catalysed by carbonic anhydrase in RBCs)</p>
            </div>
            <svg viewBox="0 0 400 80" className="w-full">
              {/* Arrow showing open system */}
              <text x={50} y={20} fontSize="9" className="fill-foreground font-semibold">Lungs</text>
              <text x={50} y={32} fontSize="8" className="fill-muted-foreground">excrete CO₂</text>
              <path d="M 80 38 L 130 50" stroke="hsl(210 70% 50%)" strokeWidth="1.5" fill="none" markerEnd="url(#arrowBlue)" />
              
              <text x={140} y={55} fontSize="11" className="fill-foreground font-bold">CO₂ + H₂O</text>
              <text x={220} y={55} fontSize="11" className="fill-foreground">⇌</text>
              <text x={240} y={55} fontSize="11" className="fill-foreground font-bold">H⁺ + HCO₃⁻</text>
              
              <path d="M 320 50 L 370 38" stroke="hsl(95 55% 38%)" strokeWidth="1.5" fill="none" />
              <text x={345} y={20} fontSize="9" className="fill-foreground font-semibold">Kidneys</text>
              <text x={345} y={32} fontSize="8" className="fill-muted-foreground">excrete H⁺,</text>
              <text x={345} y={42} fontSize="8" className="fill-muted-foreground">reabsorb HCO₃⁻</text>
            </svg>
            <p className="text-xs text-muted-foreground text-center">
              <strong>Open system:</strong> CO₂ can be removed by ventilation, making this buffer extraordinarily effective despite pKa 6.1
            </p>
          </div>

          {/* Strong vs weak acids */}
          <div className="bg-secondary/30 rounded-lg p-3 border border-border">
            <p className="text-xs font-medium text-foreground mb-1">Strong vs Weak Acids — Key Distinction</p>
            <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground">
              <div>
                <p className="font-medium text-foreground">Strong acid (e.g. HCl)</p>
                <p>Completely dissociates in solution. Cannot act as a buffer. Example: gastric HCl.</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Weak acid (e.g. H₂CO₃)</p>
                <p>Partially dissociates — exists in equilibrium between HA and A⁻. Can buffer.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

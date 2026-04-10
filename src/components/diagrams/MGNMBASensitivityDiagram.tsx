import { useState } from "react";
import { Button } from "@/components/ui/button";

type View = "sensitivity" | "nmj" | "crisis";

const MGNMBASensitivityDiagram = () => {
  const [view, setView] = useState<View>("sensitivity");

  return (
    <div className="space-y-4 mb-8">
      <div className="p-4 rounded-lg border border-border bg-card">
        <h2 className="text-xl font-serif font-bold text-foreground mb-1">Myasthenia Gravis & Neuromuscular Blocking Agents</h2>
        <p className="text-sm text-muted-foreground mb-3">Interactive comparison of NMBA responses in myasthenia gravis vs normal patients.</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          <Button variant={view === "sensitivity" ? "default" : "outline"} size="sm" onClick={() => setView("sensitivity")} className="text-xs">NMBA Sensitivity</Button>
          <Button variant={view === "nmj" ? "default" : "outline"} size="sm" onClick={() => setView("nmj")} className="text-xs">NMJ Pathology</Button>
          <Button variant={view === "crisis" ? "default" : "outline"} size="sm" onClick={() => setView("crisis")} className="text-xs">Crisis Comparison</Button>
        </div>

        {view === "sensitivity" && (
          <div className="space-y-4">
            {/* Dose comparison bars */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">Non-Depolarising NMBAs: Dose Required</h3>
              <p className="text-xs text-muted-foreground mb-2">MG patients are exquisitely sensitive — use 10–50% of normal dose</p>

              {[
                { drug: "Rocuronium", normal: 100, mg: 50, mgDose: "10–25 mg", normalDose: "50 mg" },
                { drug: "Atracurium", normal: 100, mg: 30, mgDose: "10–15 mg", normalDose: "35 mg" },
                { drug: "Vecuronium", normal: 100, mg: 25, mgDose: "2–4 mg", normalDose: "8 mg" },
                { drug: "Cisatracurium", normal: 100, mg: 35, mgDose: "5 mg", normalDose: "15 mg" },
              ].map((d) => (
                <div key={d.drug} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-foreground">{d.drug}</span>
                    <span className="text-muted-foreground">Normal: {d.normalDose}</span>
                  </div>
                  <div className="relative h-6 rounded-md bg-secondary/30 overflow-hidden">
                    {/* Normal bar */}
                    <div className="absolute top-0 left-0 h-full bg-primary/20 rounded-md" style={{ width: `${d.normal}%` }} />
                    {/* MG bar */}
                    <div className="absolute top-0 left-0 h-full bg-destructive/60 rounded-md transition-all duration-700" style={{ width: `${d.mg}%` }} />
                    <div className="absolute inset-0 flex items-center px-2">
                      <span className="text-[10px] font-bold text-destructive">MG: {d.mgDose}</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-[9px] text-muted-foreground">
                    <span>0%</span>
                    <span className="text-destructive font-medium">{d.mg}% of normal</span>
                    <span>100%</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Suxamethonium - opposite */}
            <div className="p-3 rounded-lg border border-chart-4/30 bg-chart-4/5">
              <h3 className="text-sm font-semibold text-foreground mb-1">Suxamethonium: Relative RESISTANCE</h3>
              <div className="relative h-6 rounded-md bg-secondary/30 overflow-hidden mb-1">
                <div className="absolute top-0 left-0 h-full bg-primary/30 rounded-md" style={{ width: "38%" }} />
                <div className="absolute top-0 left-0 h-full bg-chart-4/60 rounded-md" style={{ width: "100%" }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-foreground">ED₉₅ = 2.6× normal dose</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Fewer functional AChRs → needs more suxamethonium to depolarise remaining receptors. Phase II block may develop at lower doses. Onset may be prolonged.</p>
            </div>

            {/* Reversal */}
            <div className="grid sm:grid-cols-2 gap-2">
              <div className="p-3 rounded-lg border border-chart-4/30 bg-chart-4/5">
                <p className="text-xs font-semibold text-foreground">✓ Sugammadex (preferred)</p>
                <p className="text-[10px] text-muted-foreground mt-1">Directly encapsulates rocuronium — no interaction with AChR or anticholinesterases. Clean, predictable reversal.</p>
              </div>
              <div className="p-3 rounded-lg border border-destructive/30 bg-destructive/5">
                <p className="text-xs font-semibold text-foreground">⚠ Neostigmine (problematic)</p>
                <p className="text-[10px] text-muted-foreground mt-1">Inhibits AChE → unpredictable interaction with pyridostigmine already on board. Risk of cholinergic crisis. Muscarinic side effects. Difficult to titrate.</p>
              </div>
            </div>
          </div>
        )}

        {view === "nmj" && (
          <div className="space-y-4">
            <svg viewBox="0 0 560 350" className="w-full max-w-xl mx-auto">
              <text x="280" y="18" textAnchor="middle" className="fill-foreground text-[12px] font-semibold">NMJ: Normal vs Myasthenia Gravis</text>

              {/* Normal NMJ */}
              <text x="140" y="45" textAnchor="middle" className="fill-primary text-[10px] font-bold">NORMAL</text>

              {/* Pre-synaptic terminal */}
              <rect x="60" y="55" width="160" height="60" rx="8" fill="hsl(var(--primary)/0.1)" stroke="hsl(var(--primary))" strokeWidth="1.5" />
              <text x="140" y="75" textAnchor="middle" className="fill-primary text-[8px] font-semibold">Pre-synaptic terminal</text>

              {/* ACh vesicles */}
              {[80, 110, 140, 170, 200].map((x) => (
                <circle key={x} cx={x} cy={95} r="6" fill="hsl(var(--chart-4)/0.5)" stroke="hsl(var(--chart-4))" strokeWidth="1" />
              ))}
              <text x="140" y="108" textAnchor="middle" className="fill-chart-4 text-[6px]">ACh vesicles</text>

              {/* Synaptic cleft */}
              <rect x="60" y="120" width="160" height="15" fill="hsl(var(--secondary)/0.3)" />
              <text x="140" y="130" textAnchor="middle" className="fill-muted-foreground text-[6px]">synaptic cleft</text>

              {/* Post-synaptic membrane — normal (many receptors) */}
              <rect x="60" y="138" width="160" height="55" rx="8" fill="hsl(var(--accent)/0.1)" stroke="hsl(var(--accent))" strokeWidth="1.5" />
              {/* Lots of AChRs */}
              {[75, 95, 115, 135, 155, 175, 195].map((x) => (
                <circle key={x} cx={x} cy={155} r="5" fill="hsl(var(--primary)/0.6)" stroke="hsl(var(--primary))" strokeWidth="1" />
              ))}
              <text x="140" y="180" textAnchor="middle" className="fill-primary text-[7px]">Many functional AChRs</text>

              <text x="140" y="210" textAnchor="middle" className="fill-chart-4 text-[9px] font-semibold">Safety factor: large receptor reserve</text>
              <text x="140" y="222" textAnchor="middle" className="fill-muted-foreground text-[7px]">~5× more receptors than needed for contraction</text>

              {/* MG NMJ */}
              <text x="420" y="45" textAnchor="middle" className="fill-destructive text-[10px] font-bold">MYASTHENIA GRAVIS</text>

              <rect x="340" y="55" width="160" height="60" rx="8" fill="hsl(var(--primary)/0.1)" stroke="hsl(var(--primary))" strokeWidth="1.5" />
              <text x="420" y="75" textAnchor="middle" className="fill-primary text-[8px] font-semibold">Pre-synaptic terminal</text>
              <text x="420" y="88" textAnchor="middle" className="fill-muted-foreground text-[7px]">(normal ACh release)</text>

              {[360, 390, 420, 450, 480].map((x) => (
                <circle key={x} cx={x} cy={95} r="6" fill="hsl(var(--chart-4)/0.5)" stroke="hsl(var(--chart-4))" strokeWidth="1" />
              ))}

              {/* Synaptic cleft with antibodies */}
              <rect x="340" y="120" width="160" height="15" fill="hsl(var(--destructive)/0.1)" />
              <text x="420" y="130" textAnchor="middle" className="fill-destructive text-[6px]">Anti-AChR antibodies (IgG)</text>

              {/* Post-synaptic — fewer receptors, simplified folds */}
              <rect x="340" y="138" width="160" height="55" rx="8" fill="hsl(var(--destructive)/0.08)" stroke="hsl(var(--destructive))" strokeWidth="1.5" />
              {/* Few remaining AChRs */}
              {[370, 420, 470].map((x) => (
                <circle key={x} cx={x} cy={155} r="5" fill="hsl(var(--destructive)/0.6)" stroke="hsl(var(--destructive))" strokeWidth="1" />
              ))}
              {/* X marks for destroyed receptors */}
              {[395, 445].map((x) => (
                <g key={x}>
                  <line x1={x - 4} y1={151} x2={x + 4} y2={159} stroke="hsl(var(--destructive))" strokeWidth="1.5" />
                  <line x1={x + 4} y1={151} x2={x - 4} y2={159} stroke="hsl(var(--destructive))" strokeWidth="1.5" />
                </g>
              ))}
              <text x="420" y="180" textAnchor="middle" className="fill-destructive text-[7px]">Reduced AChRs + simplified folds</text>

              <text x="420" y="210" textAnchor="middle" className="fill-destructive text-[9px] font-semibold">Safety factor lost</text>
              <text x="420" y="222" textAnchor="middle" className="fill-muted-foreground text-[7px]">Small ↓ in AChR → large ↓ in contraction</text>

              {/* Implications box */}
              <rect x="60" y="240" width="440" height="100" rx="10" fill="hsl(var(--secondary)/0.15)" stroke="hsl(var(--border))" strokeWidth="1" />
              <text x="280" y="260" textAnchor="middle" className="fill-foreground text-[10px] font-bold">Implications for NMBAs</text>
              <text x="280" y="278" textAnchor="middle" className="fill-destructive text-[9px]">Non-depol NMBAs: fewer receptors to block → exquisitely sensitive (10–50% dose)</text>
              <text x="280" y="296" textAnchor="middle" className="fill-chart-4 text-[9px]">Suxamethonium: fewer receptors to depolarise → relative resistance (ED₉₅ 2.6× normal)</text>
              <text x="280" y="314" textAnchor="middle" className="fill-primary text-[9px]">Anticholinesterases already in use → unpredictable NMBA duration → always monitor TOF</text>
              <text x="280" y="332" textAnchor="middle" className="fill-foreground text-[9px] font-semibold">Golden rule: ALWAYS use quantitative neuromuscular monitoring</text>
            </svg>
          </div>
        )}

        {view === "crisis" && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Myasthenic vs Cholinergic Crisis</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-2 text-foreground font-semibold">Feature</th>
                    <th className="text-left p-2 text-destructive font-semibold">Myasthenic Crisis</th>
                    <th className="text-left p-2 text-chart-4 font-semibold">Cholinergic Crisis</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  {[
                    { f: "Cause", my: "Disease exacerbation / undertreated", ch: "Excess anticholinesterase (pyridostigmine overdose)" },
                    { f: "Weakness", my: "Fatigable, worsens with activity", ch: "Constant, not fatigable" },
                    { f: "Pupils", my: "Normal or mydriasis", ch: "Miosis" },
                    { f: "Secretions", my: "Normal", ch: "Excessive (SLUDGE: salivation, lacrimation, urination, defaecation, GI, emesis)" },
                    { f: "Heart rate", my: "Normal or tachycardia", ch: "Bradycardia" },
                    { f: "Fasciculations", my: "Absent", ch: "May be present" },
                    { f: "Edrophonium test", my: "IMPROVES strength", ch: "WORSENS weakness" },
                    { f: "Treatment", my: "↑ Anticholinesterase, IVIG, plasmapheresis", ch: "STOP anticholinesterase, atropine, ventilatory support" },
                  ].map((r) => (
                    <tr key={r.f} className="border-b border-border/50">
                      <td className="p-2 font-medium text-foreground">{r.f}</td>
                      <td className="p-2">{r.my}</td>
                      <td className="p-2">{r.ch}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-3 rounded-lg border border-primary/20 bg-primary/5">
              <p className="text-xs font-semibold text-foreground">Predictors of Postoperative Ventilation</p>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {["Disease >6 years", "Pyridostigmine >750 mg/day", "VC <2.9 L", "Bulbar symptoms", "NYHA III/IV"].map((p) => (
                  <span key={p} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">{p}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MGNMBASensitivityDiagram;

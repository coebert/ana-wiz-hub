import { useState, useMemo } from "react";
import { DiagramFigure } from "./_shared/DiagramFigure";

type Agent = "adrenaline" | "noradrenaline" | "phenylephrine" | "dobutamine" | "dopamine" | "isoprenaline" | "ephedrine";

interface ReceptorProfile {
  label: string;
  // Each returns [α1, β1, β2, D1, V1] as 0-100 for a given dose (0-100)
  getProfile: (dose: number) => number[];
  doseLabel: (dose: number) => string;
  notes: string;
  color: string;
}

const agents: Record<Agent, ReceptorProfile> = {
  adrenaline: {
    label: "Adrenaline",
    getProfile: (d) => [
      Math.min(100, d * 1.8),           // α1 rises steeply with dose
      20 + d * 0.7,                       // β1 moderate throughout
      Math.max(0, 80 - d * 1.2),         // β2 high at low dose, falls
      0, 0,
    ],
    doseLabel: (d) => d < 33 ? "Low (0.01–0.05 µg/kg/min)" : d < 66 ? "Moderate (0.05–0.2 µg/kg/min)" : "High (>0.2 µg/kg/min)",
    notes: "Low dose: β₂ vasodilation & bronchodilation. Moderate: β₁ inotropy. High: α₁ vasoconstriction predominates.",
    color: "hsl(var(--primary))",
  },
  noradrenaline: {
    label: "Noradrenaline",
    getProfile: (d) => [
      60 + d * 0.4,   // α1 high always
      30 + d * 0.3,   // β1 moderate
      5,               // β2 minimal
      0, 0,
    ],
    doseLabel: (d) => `${(0.01 + d * 0.0099).toFixed(2)}–${(0.05 + d * 0.0095).toFixed(2)} µg/kg/min`,
    notes: "Predominantly α₁ with some β₁. Minimal β₂ → no vasodilation. First-line in septic shock.",
    color: "hsl(0, 70%, 55%)",
  },
  phenylephrine: {
    label: "Phenylephrine",
    getProfile: () => [90, 0, 0, 0, 0],
    doseLabel: () => "Pure α₁ agonist (dose-independent selectivity)",
    notes: "No β activity. Reflex bradycardia. Preferred vasopressor in obstetric spinal hypotension.",
    color: "hsl(280, 60%, 55%)",
  },
  dobutamine: {
    label: "Dobutamine",
    getProfile: (d) => [
      10 + d * 0.15,  // α1 weak
      50 + d * 0.5,   // β1 strong
      30 + d * 0.3,   // β2 moderate
      0, 0,
    ],
    doseLabel: (d) => `${(2.5 + d * 0.175).toFixed(1)} µg/kg/min`,
    notes: "Inodilator: β₁ > β₂ > α₁. Increases CO while reducing afterload. Tachyphylaxis with prolonged use.",
    color: "hsl(150, 60%, 45%)",
  },
  dopamine: {
    label: "Dopamine",
    getProfile: (d) => [
      Math.min(100, Math.max(0, (d - 60) * 2.5)),  // α1 only at high dose
      Math.min(90, Math.max(0, (d - 20) * 1.5)),    // β1 at moderate dose
      5,                                               // β2 minimal
      Math.max(0, 80 - d * 1.2),                     // D1 at low dose
      0,
    ],
    doseLabel: (d) => d < 25 ? "Low (1–3 µg/kg/min) — D₁" : d < 65 ? "Moderate (3–10 µg/kg/min) — β₁" : "High (>10 µg/kg/min) — α₁",
    notes: "Traditional dose-dependent selectivity. 'Renal dose' dopamine is now abandoned. More arrhythmogenic than NA.",
    color: "hsl(35, 80%, 50%)",
  },
  isoprenaline: {
    label: "Isoprenaline",
    getProfile: () => [0, 85, 85, 0, 0],
    doseLabel: () => "Non-selective β agonist (no α activity)",
    notes: "Pure β₁ + β₂ agonist. Used for severe bradycardia, heart block, torsades. Causes vasodilation + tachycardia.",
    color: "hsl(200, 70%, 50%)",
  },
  ephedrine: {
    label: "Ephedrine",
    getProfile: (d) => [
      Math.max(10, 45 - d * 0.3),  // α1 moderate, decreases with tachyphylaxis
      Math.max(10, 50 - d * 0.35), // β1 moderate, tachyphylaxis
      Math.max(5, 30 - d * 0.2),   // β2 mild
      0, 0,
    ],
    doseLabel: (d) => d < 50 ? "Initial doses (3–6 mg bolus)" : "Repeated doses → tachyphylaxis",
    notes: "Indirect sympathomimetic — releases stored NA. Mixed α + β. Tachyphylaxis with repeated doses as NA stores deplete.",
    color: "hsl(330, 60%, 55%)",
  },
};

const receptorLabels = ["α₁", "β₁", "β₂", "D₁", "V₁"];
const receptorColors = [
  "hsl(0, 70%, 55%)",
  "hsl(210, 70%, 55%)",
  "hsl(150, 60%, 50%)",
  "hsl(35, 80%, 50%)",
  "hsl(280, 60%, 55%)",
];

const agentKeys: Agent[] = ["adrenaline", "noradrenaline", "phenylephrine", "dobutamine", "dopamine", "isoprenaline", "ephedrine"];

const VasoactiveReceptorDiagram = () => {
  const [selected, setSelected] = useState<Agent>("adrenaline");
  const [dose, setDose] = useState(50);
  const agent = agents[selected];

  const profile = useMemo(() => agent.getProfile(dose), [agent, dose]);
  const hasVariableDose = selected !== "phenylephrine" && selected !== "isoprenaline";

  return (
    <DiagramFigure
      id="vasoactive-receptor-diagram"
      title="Vasoactive receptor"
      description="Auto-generated wrapper for the Vasoactive receptor anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
          <div className="space-y-5">
        <h4 className="font-semibold text-foreground">Interactive Receptor Selectivity</h4>
  
        {/* Agent selector */}
        <div className="flex flex-wrap gap-2">
          {agentKeys.map((key) => (
            <button
              key={key}
              onClick={() => { setSelected(key); setDose(50); }}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                selected === key
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80"
              }`}
            >
              {agents[key].label}
            </button>
          ))}
        </div>
  
        <div className="bg-secondary/30 rounded-xl p-5 border border-border space-y-5">
          {/* Dose slider */}
          {hasVariableDose && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">Dose</label>
                <span className="text-xs text-muted-foreground">{agent.doseLabel(dose)}</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={dose}
                onChange={(e) => setDose(Number(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-primary bg-secondary"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>
          )}
  
          {/* Bar chart */}
          <div className="space-y-3">
            {receptorLabels.map((label, i) => {
              const value = Math.round(profile[i]);
              if (selected === "phenylephrine" && i > 0 && value === 0) {
                // Still show zeros for pure agents to emphasise selectivity
              }
              return (
                <div key={label} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground w-8">{label}</span>
                    <span className="text-xs text-muted-foreground">{value}%</span>
                  </div>
                  <div className="w-full h-5 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500 ease-out"
                      style={{
                        width: `${Math.max(value, 0)}%`,
                        backgroundColor: receptorColors[i],
                        opacity: value > 0 ? 1 : 0.15,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
  
          {/* Clinical effect summary */}
          <div className="rounded-lg bg-background/60 p-3 border border-border">
            <p className="text-xs font-medium text-foreground mb-1">Clinical Effect at Current Dose</p>
            <div className="flex flex-wrap gap-2 mb-2">
              {profile[0] > 40 && (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-destructive/10 text-destructive">
                  ↑ SVR / Vasoconstriction
                </span>
              )}
              {profile[1] > 40 && (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary/10 text-primary">
                  ↑ Inotropy / Chronotropy
                </span>
              )}
              {profile[2] > 30 && (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-accent/30 text-accent-foreground">
                  Vasodilation / Bronchodilation
                </span>
              )}
              {profile[3] > 20 && (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-secondary text-foreground">
                  Renal/Splanchnic Vasodilation
                </span>
              )}
              {profile[0] <= 40 && profile[1] <= 40 && profile[2] <= 30 && profile[3] <= 20 && (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-muted text-muted-foreground">
                  Minimal effect at this dose
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">{agent.notes}</p>
          </div>
  
          {/* Comparison mode */}
          <details className="group">
            <summary className="text-sm font-medium text-primary cursor-pointer hover:underline">
              Compare all agents at current dose setting
            </summary>
            <div className="mt-3 overflow-x-auto">
              <table className="min-w-full text-xs border border-border rounded-lg">
                <thead>
                  <tr className="bg-secondary/50">
                    <th className="px-3 py-2 text-left text-foreground font-semibold border-b border-border">Agent</th>
                    {receptorLabels.map((r) => (
                      <th key={r} className="px-3 py-2 text-center text-foreground font-semibold border-b border-border">{r}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {agentKeys.map((key) => {
                    const p = agents[key].getProfile(dose);
                    return (
                          <tr key={key} className={`border-b border-border ${key === selected ? "bg-primary/5" : ""}`}>
                        <td className="px-3 py-1.5 font-medium text-foreground">{agents[key].label}</td>
                        {p.map((v, i) => (
                          <td key={i} className="px-3 py-1.5 text-center">
                            <span
                              className="inline-block min-w-[28px] px-1 py-0.5 rounded text-[10px] font-bold"
                              style={{
                                backgroundColor: v > 0 ? `${receptorColors[i]}20` : "transparent",
                                color: v > 0 ? receptorColors[i] : "hsl(var(--muted-foreground))",
                              }}
                            >
                              {Math.round(v)}
                            </span>
                          </td>
                        ))}
                      </tr>
    );
                  })}
                </tbody>
              </table>
            </div>
          </details>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default VasoactiveReceptorDiagram;

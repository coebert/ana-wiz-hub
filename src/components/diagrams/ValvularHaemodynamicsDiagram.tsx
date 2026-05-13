import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DiagramFigure } from "./_shared/DiagramFigure";

type Valve = "AS" | "AR" | "MS" | "MR";

interface ValveGoals {
  label: string;
  rate: string;
  rateTarget: string;
  preload: string;
  afterload: string;
  rhythm: string;
  contractility: string;
  avoid: string[];
  rationale: string;
  rateBar: number; // 0-100 position on slow–fast scale
  preloadBar: number;
  afterloadBar: number;
}

const valveData: Record<Valve, ValveGoals> = {
  AS: {
    label: "Aortic Stenosis",
    rate: "Slow–Normal",
    rateTarget: "60–80 bpm",
    preload: "Maintain / High",
    afterload: "Maintain SVR",
    rhythm: "Sinus rhythm ESSENTIAL",
    contractility: "Maintain",
    avoid: ["Tachycardia", "Hypotension", "Loss of SR", "Myocardial depression", "Hypovolaemia"],
    rationale: "Fixed obstruction → dependent on filling time (slow rate) and preload. Loss of atrial kick (AF) can cause 25% drop in CO. SVR must be maintained — vasodilation causes catastrophic hypotension with inability to increase CO.",
    rateBar: 25,
    preloadBar: 80,
    afterloadBar: 80,
  },
  AR: {
    label: "Aortic Regurgitation",
    rate: "Slightly Fast",
    rateTarget: "80–100 bpm",
    preload: "Adequate",
    afterload: "Low SVR",
    rhythm: "Less critical",
    contractility: "Maintain",
    avoid: ["Bradycardia", "Increased SVR", "Myocardial depression"],
    rationale: "Faster rate shortens diastole → less time for regurgitation. Low SVR reduces the pressure driving retrograde flow. Bradycardia prolongs diastole → more regurgitation → LV volume overload.",
    rateBar: 70,
    preloadBar: 50,
    afterloadBar: 25,
  },
  MS: {
    label: "Mitral Stenosis",
    rate: "Slow",
    rateTarget: "60–80 bpm",
    preload: "Adequate",
    afterload: "Maintain SVR",
    rhythm: "Sinus rhythm important",
    contractility: "Maintain",
    avoid: ["Tachycardia", "AF", "Fluid overload", "Increased PVR"],
    rationale: "Fixed mitral valve area → CO dependent on diastolic filling time. Tachycardia reduces filling → pulmonary congestion. AF loses atrial kick and risks pulmonary oedema. Avoid increasing PVR (hypoxia, hypercarbia).",
    rateBar: 25,
    preloadBar: 55,
    afterloadBar: 70,
  },
  MR: {
    label: "Mitral Regurgitation",
    rate: "Slightly Fast",
    rateTarget: "80–100 bpm",
    preload: "Adequate",
    afterload: "Low SVR",
    rhythm: "Less critical",
    contractility: "Maintain",
    avoid: ["Bradycardia", "Increased SVR", "Myocardial depression"],
    rationale: "Lower SVR favours forward flow over regurgitation. Faster rate reduces diastolic filling → less LV volume → less regurgitation. Regional anaesthesia (sympathectomy) can actually be beneficial.",
    rateBar: 70,
    preloadBar: 50,
    afterloadBar: 25,
  },
};

const valves: Valve[] = ["AS", "AR", "MS", "MR"];

const BarIndicator = ({ value, lowLabel, highLabel, color }: { value: number; lowLabel: string; highLabel: string; color: string }) => (
  <div className="space-y-1">
    <div className="relative h-3 rounded-full bg-secondary/50 overflow-hidden">
      <div className={`absolute left-0 top-0 h-full rounded-full transition-all duration-500 ${color}`} style={{ width: `${value}%` }} />
      <div className="absolute top-0 h-full w-0.5 bg-foreground/30 left-1/2" />
    </div>
    <div className="flex justify-between text-[9px] text-muted-foreground">
      <span>{lowLabel}</span>
      <span>{highLabel}</span>
    </div>
  </div>
);

const ValvularHaemodynamicsDiagram = () => {
  const [selected, setSelected] = useState<Valve>("AS");
  const data = valveData[selected];

  return (
    <DiagramFigure
      id="valvular-haemodynamics-diagram"
      title="Valvular haemodynamics"
      description="Auto-generated wrapper for the Valvular haemodynamics anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <div className="space-y-4 mb-8">
        <div className="p-4 rounded-lg border border-border bg-card">
          <h2 className="text-xl font-serif font-bold text-foreground mb-1">Valvular Haemodynamic Goals</h2>
          <p className="text-sm text-muted-foreground mb-3">Select a valve lesion to see the target haemodynamic parameters and rationale.</p>
  
          <div className="flex flex-wrap gap-2 mb-4">
            {valves.map((v) => (
              <Button key={v} variant={selected === v ? "default" : "outline"} size="sm" onClick={() => setSelected(v)} className="text-xs">
                {valveData[v].label}
              </Button>
            ))}
          </div>
  
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Left — parameters */}
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold text-foreground mb-1">Heart Rate: <span className="text-primary">{data.rateTarget}</span></p>
                <BarIndicator value={data.rateBar} lowLabel="Slow" highLabel="Fast" color="bg-primary" />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground mb-1">Preload: <span className="text-primary">{data.preload}</span></p>
                <BarIndicator value={data.preloadBar} lowLabel="Low" highLabel="High" color="bg-chart-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground mb-1">Afterload (SVR): <span className="text-primary">{data.afterload}</span></p>
                <BarIndicator value={data.afterloadBar} lowLabel="Low" highLabel="High" color="bg-destructive" />
              </div>
              <div className="text-xs">
                <span className="font-semibold text-foreground">Rhythm: </span>
                <span className="text-muted-foreground">{data.rhythm}</span>
              </div>
              <div className="text-xs">
                <span className="font-semibold text-foreground">Contractility: </span>
                <span className="text-muted-foreground">{data.contractility}</span>
              </div>
            </div>
  
            {/* Right — avoid & rationale */}
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold text-foreground mb-1">⚠️ Avoid</p>
                <div className="flex flex-wrap gap-1">
                  {data.avoid.map((a) => (
                    <span key={a} className="text-[10px] px-2 py-0.5 rounded-full bg-destructive/10 text-destructive border border-destructive/20">{a}</span>
                  ))}
                </div>
              </div>
              <div className="p-3 rounded-lg border border-primary/20 bg-primary/5">
                <p className="text-xs font-semibold text-foreground mb-1">Rationale</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{data.rationale}</p>
              </div>
            </div>
          </div>
        </div>
  
        {/* Comparison mini-table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-1.5 text-foreground font-semibold">Lesion</th>
                <th className="text-left p-1.5 text-foreground font-semibold">Rate</th>
                <th className="text-left p-1.5 text-foreground font-semibold">Preload</th>
                <th className="text-left p-1.5 text-foreground font-semibold">SVR</th>
                <th className="text-left p-1.5 text-foreground font-semibold">Rhythm</th>
              </tr>
            </thead>
            <tbody>
              {valves.map((v) => {
                const d = valveData[v];
                return (
                      <tr key={v} className={`border-b border-border/50 cursor-pointer transition-colors ${selected === v ? "bg-primary/10" : "hover:bg-secondary/30"}`} onClick={() => setSelected(v)}>
                    <td className="p-1.5 font-medium text-foreground">{d.label}</td>
                    <td className="p-1.5 text-muted-foreground">{d.rate}</td>
                    <td className="p-1.5 text-muted-foreground">{d.preload}</td>
                    <td className="p-1.5 text-muted-foreground">{d.afterload}</td>
                    <td className="p-1.5 text-muted-foreground">{d.rhythm}</td>
                  </tr>
    );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default ValvularHaemodynamicsDiagram;

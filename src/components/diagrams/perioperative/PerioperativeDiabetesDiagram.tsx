import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DiagramFigure } from "../_shared/DiagramFigure";

type Scenario = "type1" | "type2diet" | "type2oral" | "type2insulin";

interface MedAction {
  med: string;
  day_before: string;
  morning_of: string;
  postop: string;
  color: string;
}

interface ScenarioData {
  label: string;
  description: string;
  meds: MedAction[];
  vriii: boolean;
  notes: string[];
}

const scenarios: Record<Scenario, ScenarioData> = {
  type1: {
    label: "Type 1 DM",
    description: "Always insulin-dependent — NEVER omit all insulin",
    meds: [
      { med: "Basal insulin (Lantus/Levemir)", day_before: "Give as normal (or reduce by 20%)", morning_of: "Give 80% of usual dose", postop: "Resume usual dose", color: "bg-primary/10 border-primary/30" },
      { med: "Rapid-acting insulin", day_before: "Give with meals", morning_of: "OMIT (fasting)", postop: "Resume with first meal", color: "bg-chart-4/10 border-chart-4/30" },
      { med: "VRIII", day_before: "—", morning_of: "START if missing ≥1 meal", postop: "Continue until eating & drinking", color: "bg-destructive/10 border-destructive/30" },
    ],
    vriii: true,
    notes: [
      "Never stop all insulin in Type 1 — risk of DKA within hours",
      "Always co-infuse dextrose 5–10% + KCl with VRIII",
      "First on morning list to minimise fasting",
      "Check glucose hourly when on VRIII",
    ],
  },
  type2diet: {
    label: "T2DM — Diet only",
    description: "No diabetes medications",
    meds: [
      { med: "No medications", day_before: "N/A", morning_of: "N/A", postop: "Monitor glucose", color: "bg-secondary/30 border-border" },
    ],
    vriii: false,
    notes: [
      "Monitor blood glucose perioperatively",
      "VRIII only if glucose persistently >12 mmol/L",
      "Stress response may cause hyperglycaemia",
    ],
  },
  type2oral: {
    label: "T2DM — Oral agents",
    description: "Oral hypoglycaemics ± GLP-1 agonists",
    meds: [
      { med: "Metformin", day_before: "Take as normal", morning_of: "OMIT", postop: "Resume when eating (check renal function)", color: "bg-primary/10 border-primary/30" },
      { med: "Sulfonylureas (gliclazide)", day_before: "Take as normal", morning_of: "OMIT (hypo risk)", postop: "Resume with first meal", color: "bg-destructive/10 border-destructive/30" },
      { med: "SGLT2i (dapagliflozin)", day_before: "OMIT (stop 3 days before)", morning_of: "OMIT", postop: "Resume 48 h postop if eating", color: "bg-destructive/10 border-destructive/30" },
      { med: "GLP-1 agonist (semaglutide)", day_before: "Consider omitting", morning_of: "OMIT", postop: "Resume when tolerating oral", color: "bg-chart-4/10 border-chart-4/30" },
      { med: "DPP-4i (sitagliptin)", day_before: "Take as normal", morning_of: "Take as normal", postop: "Resume", color: "bg-chart-4/10 border-chart-4/30" },
    ],
    vriii: false,
    notes: [
      "SGLT2 inhibitors: stop 3 days before — risk of euglycaemic DKA",
      "GLP-1 agonists: delayed gastric emptying → aspiration risk",
      "Metformin: lactic acidosis risk with renal impairment, contrast, or hypoperfusion",
      "VRIII if glucose persistently >12 mmol/L or missing >1 meal",
    ],
  },
  type2insulin: {
    label: "T2DM — Insulin",
    description: "On insulin ± oral agents",
    meds: [
      { med: "Basal insulin", day_before: "Give as normal", morning_of: "Give 80% of usual dose", postop: "Resume usual dose", color: "bg-primary/10 border-primary/30" },
      { med: "Premixed insulin (Novomix)", day_before: "Give as normal", morning_of: "Give half usual dose", postop: "Resume with meals", color: "bg-chart-4/10 border-chart-4/30" },
      { med: "Rapid-acting insulin", day_before: "Give with meals", morning_of: "OMIT (fasting)", postop: "Resume with first meal", color: "bg-chart-4/10 border-chart-4/30" },
      { med: "Oral agents", day_before: "See T2DM oral protocol", morning_of: "OMIT all", postop: "Resume when eating", color: "bg-secondary/30 border-border" },
    ],
    vriii: true,
    notes: [
      "VRIII if missing ≥1 meal or glucose >12 mmol/L",
      "Resume SC insulin before stopping VRIII (overlap by 30–60 min for basal)",
      "Postop insulin resistance common — may need increased doses temporarily",
    ],
  },
};

const scenarioKeys: Scenario[] = ["type1", "type2diet", "type2oral", "type2insulin"];

const PerioperativeDiabetesDiagram = () => {
  const [selected, setSelected] = useState<Scenario>("type1");
  const data = scenarios[selected];

  return (
    <DiagramFigure
      id="perioperative-diabetes-diagram"
      title="Perioperative diabetes"
      description="Perioperative diabetes: labelled teaching figure showing the structures, relationships and key values FRCA and FFICM candidates need to recognise and explain for this topic."
    >
                  <div className="space-y-4 mb-8">
        <div className="p-4 rounded-lg border border-border bg-card">
          <h2 className="text-xl font-serif font-bold text-foreground mb-1">Perioperative Diabetes Management</h2>
          <p className="text-sm text-muted-foreground mb-3">Select patient type to see medication adjustments. Based on JBDS-IP 2021 guidelines.</p>
  
          <div className="flex flex-wrap gap-1.5 mb-4">
            {scenarioKeys.map((s) => (
              <Button key={s} variant={selected === s ? "default" : "outline"} size="sm" onClick={() => setSelected(s)} className="text-xs">
                {scenarios[s].label}
              </Button>
            ))}
          </div>
  
          <p className="text-xs text-muted-foreground mb-3 italic">{data.description}</p>
  
          {/* Medication timeline table */}
          <div className="overflow-x-auto mb-3">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-2 text-foreground font-semibold">Medication</th>
                  <th className="text-left p-2 text-foreground font-semibold">Day Before</th>
                  <th className="text-left p-2 text-foreground font-semibold">Morning of Surgery</th>
                  <th className="text-left p-2 text-foreground font-semibold">Postoperative</th>
                </tr>
              </thead>
              <tbody>
                {data.meds.map((m) => (
                  <tr key={m.med} className={`border-b border-border/50 ${m.color}`}>
                    <td className="p-2 font-medium text-foreground">{m.med}</td>
                    <td className="p-2 text-muted-foreground">{m.day_before}</td>
                    <td className="p-2 text-muted-foreground">{m.morning_of}</td>
                    <td className="p-2 text-muted-foreground">{m.postop}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
  
          {/* Notes */}
          <div className="space-y-1.5">
            {data.notes.map((n, i) => (
              <div key={i} className="flex gap-2 items-start">
                <span className="flex-shrink-0 w-4 h-4 rounded-full bg-accent/20 text-accent text-[9px] font-bold flex items-center justify-center mt-0.5">!</span>
                <p className="text-xs text-muted-foreground leading-relaxed">{n}</p>
              </div>
            ))}
          </div>
        </div>
  
        {/* Glucose targets */}
        <div className="grid sm:grid-cols-3 gap-2">
          <div className="p-3 rounded-lg border border-chart-4/30 bg-chart-4/5">
            <p className="text-xs font-semibold text-foreground">Target Glucose</p>
            <p className="text-lg font-bold text-chart-4">6–10 mmol/L</p>
            <p className="text-[10px] text-muted-foreground">NICE-SUGAR: tight control (4.5–6) increased mortality</p>
          </div>
          <div className="p-3 rounded-lg border border-destructive/30 bg-destructive/5">
            <p className="text-xs font-semibold text-foreground">Hypoglycaemia</p>
            <p className="text-lg font-bold text-destructive">&lt;4 mmol/L</p>
            <p className="text-[10px] text-muted-foreground">75–100 mL 20% glucose IV; glucagon 1 mg IM</p>
          </div>
          <div className="p-3 rounded-lg border border-primary/30 bg-primary/5">
            <p className="text-xs font-semibold text-foreground">Start VRIII when</p>
            <p className="text-lg font-bold text-primary">&gt;12 mmol/L</p>
            <p className="text-[10px] text-muted-foreground">Or missing ≥1 meal, or Type 1 DM always</p>
          </div>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default PerioperativeDiabetesDiagram;

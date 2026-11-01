import { WATERFALL_OUTCOMES } from "@/components/topic/PancreatitisTeaching";
import { InlineRef } from "@/components/references/InlineRef";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DiagramFigure } from "../_shared/DiagramFigure";

type Strategy = "aggressive" | "moderate";

const outcomes = WATERFALL_OUTCOMES;

export const WaterfallFluidDiagram = () => {
  const [strategy, setStrategy] = useState<Strategy>("moderate");
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setTick(0);
    const t = setInterval(() => setTick((v) => Math.min(v + 1, 100)), 30);
    return () => clearInterval(t);
  }, [strategy]);

  const protocol =
    strategy === "aggressive"
      ? {
          title: "Aggressive (WATERFALL trial arm)",
          bolus: "20 mL/kg over 2 h",
          maintenance: "3 mL/kg/h",
          note: "Stopped early in WATERFALL (NEJM 2022) for fluid overload without benefit.",
          tone: "destructive" as const,
        }
      : {
          title: "Moderate (WATERFALL trial arm)",
          bolus: "10 mL/kg only if hypovolaemic",
          maintenance: "1.5 mL/kg/h Ringer's lactate",
          note: "Overload check at 3 ±1 h; frequent individual reassessment, then trial checks at 12/24/48/72 h. Reduce/stop for overload; review IV needs as oral intake is tolerated.",
          tone: "primary" as const,
        };

  const max = Math.max(...outcomes.flatMap((o) => [o.aggressive, o.moderate]));

  return (
    <DiagramFigure
      id="waterfall-fluid-diagram"
      title="Waterfall fluid"
      description="Waterfall fluid: labelled teaching figure showing the structures, relationships and key values FRCA and FFICM candidates need to recognise and explain for this topic."
    >
              <div className="rounded-xl border border-border bg-card p-4 space-y-4">
        <div>
          <p className="text-sm font-semibold text-foreground">
            Fluid resuscitation strategy in acute pancreatitis — WATERFALL trial
          </p>
          <p className="text-xs text-muted-foreground">
            Compare reported WATERFALL trial outcomes. Rates are group estimates, not an individual prediction; the trial stopped early for fluid overload.
          </p>
        </div>
  
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={strategy === "moderate" ? "default" : "outline"}
            onClick={() => setStrategy("moderate")}
          >
            Moderate
          </Button>
          <Button
            size="sm"
            variant={strategy === "aggressive" ? "default" : "outline"}
            onClick={() => setStrategy("aggressive")}
          >
            Aggressive
          </Button>
        </div>
  
        <div
          className={`rounded-lg border p-3 ${
            protocol.tone === "destructive"
              ? "border-destructive/40 bg-destructive/5"
              : "border-primary/40 bg-primary/5"
          }`}
        >
          <p
            className={`text-sm font-semibold ${
              protocol.tone === "destructive" ? "text-destructive" : "text-primary"
            }`}
          >
            {protocol.title}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            <span className="font-medium text-foreground">Bolus:</span> {protocol.bolus} ·{" "}
            <span className="font-medium text-foreground">Initial infusion:</span> {protocol.maintenance}
          </p>
          <p className="text-xs text-muted-foreground mt-1 italic">{protocol.note}</p>
        </div>
  
        <div className="space-y-2">
          {outcomes.map((o) => {
            const value = strategy === "aggressive" ? o.aggressive : o.moderate;
            const animated = (value * tick) / 100;
            const widthPct = (animated / max) * 100;
            const isWorse = strategy === "aggressive" && o.demonstratedIncrease;
            return (
                  <div key={o.label}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">{o.label}</span>
                  <span
                    className={`font-mono font-semibold ${
                      isWorse ? "text-destructive" : "text-foreground"
                    }`}
                  >
                    {value}
                    {o.unit}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-1">{o.note}</p>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full transition-[width] duration-100 ${
                      isWorse ? "bg-destructive" : "bg-primary"
                    }`}
                    style={{ width: `${widthPct}%` }}
                  />
                </div>
              </div>
    );
          })}
        </div>
  
        <p className="text-xs text-muted-foreground">Trial excluded baseline shock/respiratory failure, significant heart failure and eGFR &lt;60 mL/min/1.73 m². Severe disease/comorbidity requires individual resuscitation, not automatic continuation of this arm. <InlineRef topicId="acute-pancreatitis" refLabel="WATERFALL protocol 2020" /></p>
        <p className="text-xs text-muted-foreground italic">
          Source: de‑Madaria et al., Aggressive or Moderate Fluid Resuscitation in Acute Pancreatitis
          (WATERFALL), NEJM 2022;387:989–1000. <InlineRef topicId="acute-pancreatitis" refLabel="WATERFALL 2022" />
        </p>
      </div>
    </DiagramFigure>
  );
};

export default WaterfallFluidDiagram;

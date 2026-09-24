import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DiagramFigure } from "../_shared/DiagramFigure";

type Strategy = "aggressive" | "moderate";

interface Outcome {
  label: string;
  aggressive: number;
  moderate: number;
  worseIs: "high"; // higher = worse
}

const outcomes: Outcome[] = [
  { label: "Fluid overload at 72 h", aggressive: 20.5, moderate: 6.3, worseIs: "high" },
  { label: "Progression to moderate/severe AP", aggressive: 22.1, moderate: 17.3, worseIs: "high" },
  { label: "Median hospital stay (days)", aggressive: 9, moderate: 7, worseIs: "high" },
  { label: "Persistent organ failure", aggressive: 7.4, moderate: 4.5, worseIs: "high" },
];

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
          title: "Aggressive (legacy IAP/APA 2013)",
          bolus: "20 mL/kg over 2 h",
          maintenance: "3 mL/kg/h",
          note: "Stopped early in WATERFALL (NEJM 2022) for fluid overload without benefit.",
          tone: "destructive" as const,
        }
      : {
          title: "Moderate (WATERFALL / AGA 2024 / BSG 2024)",
          bolus: "10 mL/kg only if hypovolaemic",
          maintenance: "1.5 mL/kg/h Ringer's lactate",
          note: "Reassess at 12, 24, 48, 72 h — titrate to MAP, UO, lactate, BUN.",
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
            Toggle the strategy to compare 72 h outcomes. Bars animate to scale.
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
            <span className="font-medium text-foreground">Maintenance:</span> {protocol.maintenance}
          </p>
          <p className="text-xs text-muted-foreground mt-1 italic">{protocol.note}</p>
        </div>
  
        <div className="space-y-2">
          {outcomes.map((o) => {
            const value = strategy === "aggressive" ? o.aggressive : o.moderate;
            const animated = (value * tick) / 100;
            const widthPct = (animated / max) * 100;
            const isWorse = strategy === "aggressive" && value > o.moderate;
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
                    {o.label.includes("days") ? "" : "%"}
                  </span>
                </div>
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
  
        <p className="text-xs text-muted-foreground italic">
          Source: de‑Madaria et al., Aggressive or Moderate Fluid Resuscitation in Acute Pancreatitis
          (WATERFALL), NEJM 2022;387:989–1000.
        </p>
      </div>
    </DiagramFigure>
  );
};

export default WaterfallFluidDiagram;

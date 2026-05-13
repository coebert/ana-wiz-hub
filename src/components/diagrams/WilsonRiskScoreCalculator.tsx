import { useState } from "react";
import { DiagramFigure } from "./_shared/DiagramFigure";

type Factor = "weight" | "headNeck" | "jaw" | "mandible" | "teeth";

const factors: Record<Factor, { label: string; scores: { value: number; desc: string }[] }> = {
  weight: {
    label: "Weight",
    scores: [
      { value: 0, desc: "<90 kg" },
      { value: 1, desc: "90–110 kg" },
      { value: 2, desc: ">110 kg" },
    ],
  },
  headNeck: {
    label: "Head & Neck Movement",
    scores: [
      { value: 0, desc: ">90° (full extension)" },
      { value: 1, desc: "~90° (moderate)" },
      { value: 2, desc: "<90° (limited)" },
    ],
  },
  jaw: {
    label: "Jaw Movement",
    scores: [
      { value: 0, desc: "IG ≥5 cm or SLux >0" },
      { value: 1, desc: "IG 4–5 cm or SLux = 0" },
      { value: 2, desc: "IG <4 cm or SLux <0" },
    ],
  },
  mandible: {
    label: "Receding Mandible",
    scores: [
      { value: 0, desc: "Normal" },
      { value: 1, desc: "Moderate recession" },
      { value: 2, desc: "Severe recession" },
    ],
  },
  teeth: {
    label: "Buck Teeth",
    scores: [
      { value: 0, desc: "Normal" },
      { value: 1, desc: "Moderate overjet" },
      { value: 2, desc: "Severe overjet" },
    ],
  },
};

const factorOrder: Factor[] = ["weight", "headNeck", "jaw", "mandible", "teeth"];

const getRiskCategory = (total: number) => {
  if (total <= 2) return { label: "Low risk", color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/30", detail: "Easy intubation predicted. Standard preparation." };
  if (total <= 4) return { label: "Moderate risk", color: "text-yellow-500", bg: "bg-yellow-500/10", border: "border-yellow-500/30", detail: "Some difficulty possible. Ensure backup plan and experienced operator." };
  return { label: "High risk", color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/30", detail: "Difficult intubation likely. Prepare difficult airway equipment. Consider awake technique. Senior anaesthetist required." };
};

const WilsonRiskScoreCalculator = () => {
  const [scores, setScores] = useState<Record<Factor, number>>({
    weight: 0, headNeck: 0, jaw: 0, mandible: 0, teeth: 0,
  });

  const total = Object.values(scores).reduce((a, b) => a + b, 0);
  const risk = getRiskCategory(total);

  return (
    <DiagramFigure
      id="wilson-risk-score-calculator"
      title="Wilson risk score"
      description="Auto-generated wrapper for the Wilson risk score interactive calculator. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
          <div className="border border-border rounded-lg p-4 mb-6">
        <h3 className="text-lg font-serif font-bold text-foreground mb-1">Wilson Risk Score Calculator</h3>
        <p className="text-xs text-muted-foreground mb-4">Score each factor 0–2. Total ≥2 predicts ~75% of difficult intubations (Wilson et al., 1988).</p>
  
        <div className="space-y-3 mb-5">
          {factorOrder.map((f) => {
            const factor = factors[f];
            return (
                  <div key={f} className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm mb-2">{factor.label}</p>
                <div className="flex flex-wrap gap-2">
                  {factor.scores.map((s) => (
                    <button
                      key={s.value}
                      onClick={() => setScores((prev) => ({ ...prev, [f]: s.value }))}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                        scores[f] === s.value
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-border text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <span className="font-bold">{s.value}</span> — {s.desc}
                    </button>
                  ))}
                </div>
              </div>
    );
          })}
        </div>
  
        {/* Result */}
        <div className={`p-4 rounded-lg border ${risk.border} ${risk.bg} transition-all`}>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <p className="text-sm text-muted-foreground">Total Score</p>
              <p className="text-3xl font-bold text-foreground">{total}<span className="text-sm font-normal text-muted-foreground"> / 10</span></p>
            </div>
            <div className="text-right">
              <p className={`text-lg font-bold ${risk.color}`}>{risk.label}</p>
              <p className="text-xs text-muted-foreground max-w-xs">{risk.detail}</p>
            </div>
          </div>
  
          {/* Score bar */}
          <div className="mt-3 h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${(total / 10) * 100}%`,
                backgroundColor: total <= 2 ? "hsl(142, 60%, 45%)" : total <= 4 ? "hsl(45, 80%, 50%)" : "hsl(0, 70%, 50%)",
              }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[10px] text-muted-foreground">0 (easy)</span>
            <span className="text-[10px] text-muted-foreground">10 (very difficult)</span>
          </div>
        </div>
  
        {/* Clinical notes */}
        <div className="mt-3 p-3 rounded-lg border border-border bg-secondary/20">
          <p className="text-xs font-semibold text-foreground mb-1">Clinical Notes</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong>Wilson score ≥2:</strong> sensitivity ~75%, specificity ~90% for difficult intubation. Low positive predictive value (~10%) due to low prevalence of difficulty — many false positives. Best used alongside Mallampati, thyromental distance (&lt;6.5 cm), inter-incisor gap (&lt;3 cm), upper lip bite test, and sternomental distance (&lt;12.5 cm). No single predictor is sufficiently reliable alone — multimodal assessment is essential. <strong>IG</strong> = inter-incisor gap. <strong>SLux</strong> = subluxation (voluntary protrusion of lower incisors anterior to upper incisors).
          </p>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default WilsonRiskScoreCalculator;

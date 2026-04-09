import { useState } from "react";

const criteria = [
  { key: "snoring", letter: "S", label: "Snoring", desc: "Do you snore loudly (louder than talking or loud enough to be heard through closed doors)?" },
  { key: "tired", letter: "T", label: "Tired", desc: "Do you often feel tired, fatigued, or sleepy during the daytime?" },
  { key: "observed", letter: "O", label: "Observed", desc: "Has anyone observed you stop breathing or choking/gasping during sleep?" },
  { key: "pressure", letter: "P", label: "Pressure", desc: "Are you being treated for high blood pressure?" },
  { key: "bmi", letter: "B", label: "BMI > 35", desc: "Body mass index greater than 35 kg/m²?" },
  { key: "age", letter: "A", label: "Age > 50", desc: "Age older than 50 years?" },
  { key: "neck", letter: "N", label: "Neck > 40 cm", desc: "Neck circumference greater than 40 cm (16 inches)?" },
  { key: "gender", letter: "G", label: "Gender = Male", desc: "Male sex?" },
] as const;

const getRisk = (score: number) => {
  if (score <= 2) return { label: "Low risk", color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/30", detail: "Low risk of moderate-to-severe OSA. Standard perioperative care." };
  if (score <= 4) return { label: "Intermediate risk", color: "text-yellow-500", bg: "bg-yellow-500/10", border: "border-yellow-500/30", detail: "Intermediate risk. Consider formal sleep study. Perioperative precautions advised." };
  return { label: "High risk", color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/30", detail: "High risk of moderate-to-severe OSA. Formal polysomnography recommended. Plan for postoperative monitoring, CPAP, and opioid-sparing analgesia." };
};

const StopBangCalculator = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const score = Object.values(checked).filter(Boolean).length;
  const risk = getRisk(score);

  const toggle = (key: string) => setChecked((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="border border-border rounded-lg p-4 mb-6">
      <h3 className="text-lg font-serif font-bold text-foreground mb-1">STOP-BANG Questionnaire</h3>
      <p className="text-xs text-muted-foreground mb-4">Score 1 point for each "Yes". ≥3 = intermediate risk, ≥5 = high risk of OSA (Chung et al., 2008).</p>

      <div className="space-y-2 mb-5">
        {criteria.map((c) => (
          <button
            key={c.key}
            onClick={() => toggle(c.key)}
            className={`w-full text-left p-3 rounded-lg border transition-all flex items-start gap-3 ${
              checked[c.key]
                ? "bg-primary/10 border-primary/40"
                : "border-border hover:border-muted-foreground/30"
            }`}
          >
            <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
              checked[c.key] ? "bg-primary border-primary" : "border-muted-foreground/40"
            }`}>
              {checked[c.key] && (
                <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                <span className="text-primary font-bold mr-1">{c.letter}</span>— {c.label}
              </p>
              <p className="text-xs text-muted-foreground">{c.desc}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Result */}
      <div className={`p-4 rounded-lg border ${risk.border} ${risk.bg} transition-all`}>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <p className="text-sm text-muted-foreground">Total Score</p>
            <p className="text-3xl font-bold text-foreground">{score}<span className="text-sm font-normal text-muted-foreground"> / 8</span></p>
          </div>
          <div className="text-right">
            <p className={`text-lg font-bold ${risk.color}`}>{risk.label}</p>
            <p className="text-xs text-muted-foreground max-w-xs">{risk.detail}</p>
          </div>
        </div>

        <div className="mt-3 h-2 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${(score / 8) * 100}%`,
              backgroundColor: score <= 2 ? "hsl(142, 60%, 45%)" : score <= 4 ? "hsl(45, 80%, 50%)" : "hsl(0, 70%, 50%)",
            }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[10px] text-muted-foreground">0 (low)</span>
          <span className="text-[10px] text-muted-foreground">8 (high)</span>
        </div>
      </div>

      <div className="mt-3 p-3 rounded-lg border border-border bg-secondary/20">
        <p className="text-xs font-semibold text-foreground mb-1">Anaesthetic Relevance</p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          <strong>Score ≥5:</strong> high probability of moderate-to-severe OSA. These patients require postoperative continuous SpO₂ monitoring, early CPAP resumption, head-up positioning, and opioid-sparing multimodal analgesia. Consider HDU/ICU admission. <strong>Score 3–4:</strong> intermediate risk — clinical judgement guides further investigation. <strong>Sensitivity ~84%</strong> at cutoff ≥3 for moderate-to-severe OSA (AHI ≥15).
        </p>
      </div>
    </div>
  );
};

export default StopBangCalculator;

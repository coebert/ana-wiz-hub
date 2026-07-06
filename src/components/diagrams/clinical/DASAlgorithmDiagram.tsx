import { useState } from "react";
import { DiagramFigure } from "./_shared/DiagramFigure";

type PlanKey = "A" | "B" | "C" | "D";

interface PlanStep {
  title: string;
  color: string;
  steps: { label: string; detail: string }[];
  failAction: string;
  succeedAction?: string;
}

const plans: Record<PlanKey, PlanStep> = {
  A: {
    title: "Plan A — Facemask Ventilation & Tracheal Intubation",
    color: "hsl(145, 55%, 42%)",
    steps: [
      { label: "Optimise position", detail: "Head elevated ('ramped'), sniffing position. Preoxygenation to EtO₂ >90%." },
      { label: "1st intubation attempt", detail: "Direct or video laryngoscopy. External laryngeal manipulation (ELM). Bougie if needed." },
      { label: "2nd attempt", detail: "Change device, operator, or approach. Max 3+1 attempts total." },
      { label: "3rd attempt", detail: "Most experienced available. Consider video laryngoscopy if not already used." },
      { label: "Declare failure", detail: "If intubation fails after max attempts → move to Plan B." },
    ],
    failAction: "Intubation failed → Plan B",
    succeedAction: "Intubation successful → confirm with capnography",
  },
  B: {
    title: "Plan B — Maintaining Oxygenation: SAD Insertion",
    color: "hsl(45, 80%, 48%)",
    steps: [
      { label: "Insert 2nd generation SAD", detail: "i-gel or LMA ProSeal. Maximum 3 attempts. Optimise head position." },
      { label: "Oxygenate & ventilate", detail: "Confirm ventilation with capnography. Consider whether to wake or proceed." },
      { label: "If surgery is essential", detail: "Proceed via SAD if appropriate. Or attempt intubation through SAD (max 1 attempt)." },
    ],
    failAction: "SAD failed → Plan C",
    succeedAction: "SAD successful → wake patient or proceed",
  },
  C: {
    title: "Plan C — Final Attempt at Facemask Ventilation",
    color: "hsl(25, 80%, 50%)",
    steps: [
      { label: "Facemask ventilation", detail: "Two-person technique, jaw thrust, Guedel/NPA. Paralysis with suxamethonium or rocuronium if not given." },
      { label: "Optimise technique", detail: "Head position, two-handed grip, oral/nasal airway adjuncts." },
      { label: "If ventilation possible", detail: "Wake patient up. Consider awake intubation or surgical airway later." },
    ],
    failAction: "CICO — Can't Intubate, Can't Oxygenate → Plan D",
    succeedAction: "Ventilation restored → wake patient",
  },
  D: {
    title: "Plan D — Emergency Front of Neck Access (eFONA)",
    color: "hsl(0, 70%, 50%)",
    steps: [
      { label: "Declare CICO emergency", detail: "Verbalise: 'This is a Can't Intubate, Can't Oxygenate emergency'. Call for help." },
      { label: "Scalpel cricothyroidotomy", detail: "Palpate cricothyroid membrane. Stab incision through skin and membrane. Rotate scalpel 90°." },
      { label: "Bougie insertion", detail: "Railroad bougie through incision into trachea (feel tracheal clicks)." },
      { label: "6.0 cuffed tube", detail: "Railroad size 6.0 cuffed ETT over bougie. Inflate cuff. Confirm with capnography." },
      { label: "Ventilate", detail: "Attach to circuit. Confirm EtCO₂. Secure tube. Plan definitive airway." },
    ],
    failAction: "",
    succeedAction: "Oxygenation restored via surgical airway",
  },
};

const planOrder: PlanKey[] = ["A", "B", "C", "D"];

const DASAlgorithmDiagram = () => {
  const [activePlan, setActivePlan] = useState<PlanKey>("A");
  const [activeStep, setActiveStep] = useState(0);
  const plan = plans[activePlan];

  const handlePlanChange = (p: PlanKey) => {
    setActivePlan(p);
    setActiveStep(0);
  };

  const handleNextStep = () => {
    if (activeStep < plan.steps.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      // Move to next plan
      const idx = planOrder.indexOf(activePlan);
      if (idx < planOrder.length - 1) {
        handlePlanChange(planOrder[idx + 1]);
      }
    }
  };

  const handlePrevStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    } else {
      const idx = planOrder.indexOf(activePlan);
      if (idx > 0) {
        const prevPlan = planOrder[idx - 1];
        setActivePlan(prevPlan);
        setActiveStep(plans[prevPlan].steps.length - 1);
      }
    }
  };

  return (
    <DiagramFigure id="das-algorithm" title="DAS unanticipated difficult intubation algorithm: Plans A–D" description="Difficult Airway Society algorithm walking through Plan A (laryngoscopy), Plan B (supraglottic rescue), Plan C (face-mask) and Plan D (front-of-neck access).">
    <div className="border border-border rounded-lg p-4 mb-6">
      <h3 className="text-lg font-serif font-bold text-foreground mb-1">DAS Difficult Airway Algorithm (2015)</h3>
      <p className="text-xs text-muted-foreground mb-4">Step through Plans A→D. Tap a plan or use arrows to navigate.</p>

      {/* Plan selector / flowchart overview */}
      <div className="flex items-center justify-center gap-1 mb-5 flex-wrap">
        {planOrder.map((key, i) => (
          <div key={key} className="flex items-center gap-1">
            <button
              onClick={() => handlePlanChange(key)}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all border-2 ${
                activePlan === key ? "text-white" : "bg-transparent opacity-60 hover:opacity-100"
              }`}
              style={{
                borderColor: plans[key].color,
                backgroundColor: activePlan === key ? plans[key].color : "transparent",
                color: activePlan === key ? "white" : plans[key].color,
              }}
            >
              Plan {key}
            </button>
            {i < planOrder.length - 1 && (
              <svg width="20" height="16" viewBox="0 0 20 16" className="flex-shrink-0">
                <path d="M2,8 L14,8 M10,4 L14,8 L10,12" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" fill="none" opacity="0.5" />
              </svg>
            )}
          </div>
        ))}
      </div>

      {/* Active plan title */}
      <div className="rounded-lg p-3 mb-4 border-l-4" style={{ borderColor: plan.color, backgroundColor: `${plan.color}10` }}>
        <p className="font-bold text-sm" style={{ color: plan.color }}>{plan.title}</p>
      </div>

      {/* Step visualization */}
      <div className="space-y-2 mb-4">
        {plan.steps.map((step, i) => {
          const isActive = i === activeStep;
          const isPast = i < activeStep;
          return (
            <button
              key={i}
              onClick={() => setActiveStep(i)}
              className={`w-full text-left p-3 rounded-lg border transition-all duration-300 ${
                isActive ? "border-2 shadow-sm" : isPast ? "opacity-50" : "opacity-40"
              }`}
              style={{
                borderColor: isActive ? plan.color : "hsl(var(--border))",
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                  style={{
                    backgroundColor: isActive || isPast ? plan.color : "transparent",
                    color: isActive || isPast ? "white" : plan.color,
                    border: `2px solid ${plan.color}`,
                    opacity: isActive || isPast ? 1 : 0.5,
                  }}
                >
                  {isPast ? "✓" : i + 1}
                </div>
                <div>
                  <p className={`text-sm font-semibold ${isActive ? "text-foreground" : "text-muted-foreground"}`}>{step.label}</p>
                  {isActive && (
                    <p className="text-sm text-muted-foreground mt-1 animate-fade-in">{step.detail}</p>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Fail / succeed action */}
      {activeStep === plan.steps.length - 1 && (
        <div className="flex flex-col gap-2 animate-fade-in">
          {plan.succeedAction && (
            <div className="p-2 rounded bg-secondary/50 text-xs text-foreground font-medium text-center">
              ✅ {plan.succeedAction}
            </div>
          )}
          {plan.failAction && (
            <div className="p-2 rounded text-xs font-medium text-center text-white" style={{ backgroundColor: plan.color }}>
              ❌ {plan.failAction}
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrevStep}
          disabled={activePlan === "A" && activeStep === 0}
          className="px-3 py-1.5 text-xs font-medium rounded border border-border text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
        >
          ← Previous
        </button>
        <button
          onClick={handleNextStep}
          disabled={activePlan === "D" && activeStep === plan.steps.length - 1}
          className="px-3 py-1.5 text-xs font-medium rounded text-white transition-colors disabled:opacity-30"
          style={{ backgroundColor: plan.color }}
        >
          Next →
        </button>
      </div>
    </div>
    </DiagramFigure>
  );
};

export default DASAlgorithmDiagram;

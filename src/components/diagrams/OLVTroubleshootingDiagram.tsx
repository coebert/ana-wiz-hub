import { useState } from "react";
import { PlayCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import GuidedWalkthroughOverlay, { WalkthroughStep } from "./GuidedWalkthroughOverlay";

interface AlgorithmStep {
  id: string;
  title: string;
  detail: string;
  actions: string[];
  resolved?: string;
  nextIfUnresolved?: string;
  urgency: "immediate" | "systematic" | "escalation";
  examTip?: string;
}

const steps: AlgorithmStep[] = [
  {
    id: "confirm",
    title: "1. Confirm Hypoxia & Increase FiO₂",
    detail: "SpO₂ <90% or PaO₂ <8 kPa during OLV. First response: increase FiO₂ to 1.0. Check pulse oximetry probe and waveform quality.",
    actions: [
      "Increase FiO₂ to 1.0 immediately",
      "Confirm pulse oximetry trace is reliable (check waveform, probe position)",
      "Inform surgeon that hypoxia is occurring",
      "Check capnography — confirm ventilation is occurring",
    ],
    resolved: "SpO₂ recovers >92% → continue monitoring, titrate FiO₂ down",
    nextIfUnresolved: "tube-position",
    urgency: "immediate",
  },
  {
    id: "tube-position",
    title: "2. Check DLT / Bronchial Blocker Position",
    detail: "Tube displacement is the most common cause of hypoxia during OLV. Surgical manipulation, positioning changes, and cuff herniation can all displace the tube.",
    actions: [
      "Fibreoptic bronchoscopy (FOB) through tracheal AND bronchial lumens",
      "Confirm bronchial cuff position relative to carina (blue cuff just visible beyond carina)",
      "Check for cuff herniation obstructing contralateral bronchus",
      "Reposition DLT if malpositioned — re-confirm with FOB",
      "If bronchial blocker: check position hasn't migrated proximally",
    ],
    resolved: "Tube repositioned → SpO₂ improving → continue OLV",
    nextIfUnresolved: "ventilation",
    urgency: "immediate",
    examTip: "FOB is the gold standard for confirming DLT position — always have one available for OLV cases.",
  },
  {
    id: "ventilation",
    title: "3. Optimise Dependent Lung Ventilation",
    detail: "The dependent (ventilated) lung is subject to compression, atelectasis, and V/Q mismatch from lateral positioning, abdominal contents, and mediastinal weight.",
    actions: [
      "Apply PEEP 5–10 cmH₂O to dependent lung",
      "Recruitment manoeuvre: sustained inflation 30 cmH₂O for 30 seconds",
      "Ensure tidal volume 5–6 ml/kg IBW (lung-protective during OLV)",
      "Check for secretions/blood — suction through DLT",
      "Exclude bronchospasm (wheeze, high airway pressures) — treat with salbutamol",
      "Check ventilator circuit for disconnection or kinking",
    ],
    resolved: "Improved compliance and oxygenation → continue OLV with PEEP",
    nextIfUnresolved: "cpap",
    urgency: "systematic",
  },
  {
    id: "cpap",
    title: "4. CPAP to Non-Dependent (Operative) Lung",
    detail: "Applying CPAP (5–10 cmH₂O) with 100% O₂ to the collapsed (non-dependent) lung maintains some alveolar inflation and allows oxygen uptake without full re-inflation — minimally interferes with surgical field.",
    actions: [
      "Apply CPAP 5–10 cmH₂O with O₂ to the non-dependent lung via bronchial lumen/blocker port",
      "Use a dedicated CPAP circuit or self-inflating bag with PEEP valve",
      "Communicate with surgeon — slight lung inflation may obstruct view",
      "If using bronchial blocker: partial deflation allows some oxygen flow",
    ],
    resolved: "SpO₂ >92% with CPAP → continue with surgical awareness of partial inflation",
    nextIfUnresolved: "hpv",
    urgency: "systematic",
    examTip: "CPAP to the operative lung + PEEP to the dependent lung is the most effective combination for refractory hypoxia during OLV.",
  },
  {
    id: "hpv",
    title: "5. Optimise Hypoxic Pulmonary Vasoconstriction (HPV)",
    detail: "HPV is the main protective mechanism during OLV — it diverts blood away from the non-ventilated lung, reducing shunt. Several factors inhibit HPV and should be addressed.",
    actions: [
      "Reduce volatile agent to ≤1 MAC (volatiles inhibit HPV in dose-dependent manner)",
      "Consider switching to TIVA (propofol does not inhibit HPV)",
      "Avoid systemic vasodilators (GTN, SNP, calcium channel blockers)",
      "Correct hypothermia (impairs HPV)",
      "Optimise cardiac output — low CO worsens V/Q mismatch",
      "Avoid excessive PEEP (can divert blood to non-ventilated lung)",
    ],
    resolved: "Improved oxygenation with HPV-preserving anaesthetic technique",
    nextIfUnresolved: "intermittent",
    urgency: "systematic",
    examTip: "Volatile agents inhibit HPV above 1 MAC. TIVA with propofol preserves HPV and is the preferred technique for prolonged OLV.",
  },
  {
    id: "intermittent",
    title: "6. Intermittent Two-Lung Ventilation",
    detail: "If hypoxia persists despite the above measures, ask the surgeon for periodic reinflation of the operative lung.",
    actions: [
      "Request surgeon to pause — re-inflate operative lung with 100% O₂ for 5–10 minutes",
      "Recruitment manoeuvre on both lungs before re-collapsing",
      "Plan surgical steps to minimise further OLV duration",
      "Consider whether surgery can continue with intermittent TLV periods",
    ],
    resolved: "SpO₂ recovers during TLV → plan intermittent OLV/TLV cycles",
    nextIfUnresolved: "escalation",
    urgency: "escalation",
  },
  {
    id: "escalation",
    title: "7. Escalation — Life-Threatening Hypoxia",
    detail: "If SpO₂ remains critically low despite all measures, this is a life-threatening emergency requiring immediate action.",
    actions: [
      "Abandon OLV — resume two-lung ventilation immediately",
      "Clamp pulmonary artery to non-dependent lung (surgeon — eliminates shunt entirely)",
      "Consider almitrine bismesylate IV (enhances HPV — not available in all countries)",
      "Consider inhaled nitric oxide (iNO) to dependent lung (improves V/Q matching)",
      "If cardiac arrest: standard ALS with patient repositioned supine if possible",
      "Post-event: discuss with team whether to continue, change approach, or abandon procedure",
    ],
    urgency: "escalation",
    examTip: "PA clamping by the surgeon eliminates shunt completely and is the definitive rescue for life-threatening hypoxia during OLV.",
  },
];

const urgencyColors: Record<string, string> = {
  immediate: "bg-red-500/10 text-red-400 border-red-500/30",
  systematic: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  escalation: "bg-purple-500/10 text-purple-400 border-purple-500/30",
};

const urgencyLabels: Record<string, string> = {
  immediate: "Immediate",
  systematic: "Systematic",
  escalation: "Escalation",
};

const OLVTroubleshootingDiagram = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [expandedSteps, setExpandedSteps] = useState<Set<number>>(new Set([0]));
  const [walkthroughOpen, setWalkthroughOpen] = useState(false);

  const walkthroughSteps: WalkthroughStep[] = steps.map((s) => ({
    id: s.id,
    title: s.title.replace(/^\d+\.\s*/, ""),
    detail: s.detail,
    actions: s.actions,
    confirmation: s.resolved
      ? `If resolved: ${s.resolved}`
      : "If hypoxia persists, escalate to the next step.",
    tone:
      s.urgency === "escalation"
        ? "critical"
        : s.urgency === "immediate"
          ? "warn"
          : "info",
  }));

  const toggleStep = (index: number) => {
    setActiveStep(index);
    setExpandedSteps(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <Card className="mb-8 border-border bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <CardTitle className="text-lg font-serif text-foreground">
            Hypoxia During OLV — Troubleshooting Algorithm
          </CardTitle>
          <button
            type="button"
            onClick={() => setWalkthroughOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-primary bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <PlayCircle className="w-3.5 h-3.5" />
            Rescue walkthrough
          </button>
        </div>
        <p className="text-sm text-muted-foreground">
          Stepwise approach to managing desaturation during one-lung ventilation. Tap each step to expand, or launch the rescue walkthrough to tick off actions as you perform them.
        </p>
      </CardHeader>
      <CardContent>
        {/* Visual flow */}
        <div className="space-y-0">
          {steps.map((step, i) => {
            const isExpanded = expandedSteps.has(i);
            const isActive = activeStep === i;

            return (
                  <div key={step.id}>
                {/* Connector line */}
                {i > 0 && (
                  <div className="flex items-center gap-2 pl-5 py-1">
                    <div className="w-0.5 h-4 bg-border" />
                    <span className="text-xs text-muted-foreground italic">Unresolved ↓</span>
                  </div>
                )}

                {/* Step card */}
                <button
                  onClick={() => toggleStep(i)}
                  className={`w-full text-left rounded-lg border p-3 transition-all duration-200 ${
                    isActive
                      ? "border-primary/50 bg-primary/5"
                      : "border-border hover:bg-muted/30"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                      isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}>
                      {i + 1}
                    </span>
                    <span className={`text-sm font-semibold flex-1 ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                      {step.title.replace(/^\d+\.\s*/, "")}
                    </span>
                    <Badge variant="outline" className={`text-xs ${urgencyColors[step.urgency]}`}>
                      {urgencyLabels[step.urgency]}
                    </Badge>
                  </div>

                  {isExpanded && (
                    <div className="mt-3 ml-9 space-y-3 animate-fade-in" onClick={e => e.stopPropagation()}>
                      <p className="text-sm text-muted-foreground">{step.detail}</p>

                      <div className="space-y-1">
                        <p className="text-xs font-semibold text-foreground uppercase tracking-wide">Actions</p>
                        {step.actions.map((action, j) => (
                          <div key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-primary mt-0.5 flex-shrink-0">→</span>
                            <span>{action}</span>
                          </div>
                        ))}
                      </div>

                      {step.resolved && (
                        <div className="p-2 rounded border border-green-500/20 bg-green-500/5">
                          <p className="text-xs text-green-400">
                            <strong>✓ Resolved:</strong> {step.resolved}
                          </p>
                        </div>
                      )}

                      {step.examTip && (
                        <div className="p-2 rounded border border-amber-500/20 bg-amber-500/5">
                          <p className="text-xs text-amber-400">
                            <strong>⚠ Exam Tip:</strong> {step.examTip}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </button>
              </div>
  );
          })}
        </div>

        {/* Summary box */}
        <div className="mt-6 p-4 rounded-lg border border-border bg-muted/20">
          <p className="text-xs font-semibold text-foreground mb-2">Quick Reference — OLV Hypoxia Mnemonic: "CPAP FIVE"</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-muted-foreground">
            <div><strong className="text-foreground">C</strong> — Check tube position (FOB)</div>
            <div><strong className="text-foreground">P</strong> — PEEP to dependent lung</div>
            <div><strong className="text-foreground">A</strong> — Adjust FiO₂ to 1.0</div>
            <div><strong className="text-foreground">P</strong> — CPAP to operative lung</div>
            <div><strong className="text-foreground">F</strong> — Fix HPV (reduce volatile / TIVA)</div>
            <div><strong className="text-foreground">I</strong> — Intermittent TLV</div>
            <div><strong className="text-foreground">V</strong> — Ventilate both lungs if critical</div>
            <div><strong className="text-foreground">E</strong> — Escalate (PA clamp / iNO)</div>
          </div>
        </div>
      </CardContent>

      <GuidedWalkthroughOverlay
        open={walkthroughOpen}
        onClose={() => setWalkthroughOpen(false)}
        steps={walkthroughSteps}
        stepIndex={activeStep}
        onStepChange={(i) => {
          setActiveStep(i);
          setExpandedSteps((prev) => new Set(prev).add(i));
        }}
        title="OLV hypoxia — rescue walkthrough"
        subtitle="Step through the algorithm; tick off each action as performed"
      />
    </Card>
  );
};

export default OLVTroubleshootingDiagram;

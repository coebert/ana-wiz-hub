import { useMemo, useState } from "react";
import { withAlpha } from "@/lib/color-utils";
import { DiagramToggleBar } from "./DiagramToggleBar";
import { DiagramFigure } from "./_shared/DiagramFigure";

/**
 * ECMO-CPR (eCPR) decision tree.
 *
 * The clinician answers up to 6 sequential questions; the diagram traces a
 * path through the tree and shows whether the patient is a candidate, a
 * borderline case, or excluded — with the reasoning that drove the call.
 *
 * Based on ELSO 2020/2023 + ARREST (2020), Prague OHCA (2022) and INCEPTION
 * (2023) inclusion frameworks.
 */

type Step =
  | "witnessed"
  | "rhythm"
  | "noFlow"
  | "lowFlow"
  | "etco2"
  | "comorbidity";

interface NodeMeta {
  question: string;
  options: { label: string; favourable: boolean; rationale: string }[];
}

const tree: Record<Step, NodeMeta> = {
  witnessed: {
    question: "Witnessed arrest with bystander CPR within 5 min?",
    options: [
      { label: "Yes", favourable: true, rationale: "Short no-flow time → highest chance of meaningful neurological recovery." },
      { label: "No / unknown", favourable: false, rationale: "Unwitnessed arrest with prolonged no-flow predicts dismal neurological outcome — eCPR rarely justified." },
    ],
  },
  rhythm: {
    question: "Initial rhythm?",
    options: [
      { label: "VF / pulseless VT", favourable: true, rationale: "Shockable rhythm = best evidence base. ARREST and Prague OHCA both restricted enrolment to VF/VT." },
      { label: "PEA with reversible cause", favourable: true, rationale: "PEA is acceptable if a clear reversible cause (PE, tamponade, hypothermia, toxicity) — highly selected." },
      { label: "Asystole", favourable: false, rationale: "Asystole as the presenting rhythm is generally an exclusion outside hypothermia / toxicology." },
    ],
  },
  noFlow: {
    question: "No-flow time (collapse → CPR start)?",
    options: [
      { label: "≤ 5 min", favourable: true, rationale: "Minimal no-flow correlates strongly with intact neurological recovery." },
      { label: "5–10 min", favourable: false, rationale: "Borderline — proceed only if other parameters are highly favourable." },
      { label: "> 10 min", favourable: false, rationale: "Prolonged no-flow predicts severe HIE; relative contraindication to eCPR." },
    ],
  },
  lowFlow: {
    question: "Anticipated low-flow time (CPR → ECMO flow)?",
    options: [
      { label: "< 60 min", favourable: true, rationale: "ELSO recommends initiating ECMO within 60 min of arrest. Survival drops sharply beyond this." },
      { label: "60–90 min", favourable: false, rationale: "Borderline; case-by-case. Prague OHCA included low-flow up to ~60 min." },
      { label: "> 90 min", favourable: false, rationale: "Survival to good neurological outcome is rare. Generally an exclusion outside hypothermia." },
    ],
  },
  etco2: {
    question: "End-tidal CO₂ during high-quality CPR?",
    options: [
      { label: "≥ 10 mmHg (1.3 kPa)", favourable: true, rationale: "Sustained ETCO₂ ≥10 mmHg suggests effective CPR perfusion and viability." },
      { label: "< 10 mmHg sustained", favourable: false, rationale: "Persistently low ETCO₂ during good-quality CPR predicts non-survival." },
    ],
  },
  comorbidity: {
    question: "Patient profile?",
    options: [
      { label: "Age < 70, good baseline, no major comorbidity", favourable: true, rationale: "Best candidate: physiological reserve + neurological recovery potential." },
      { label: "Significant comorbidity / frailty / metastatic cancer", favourable: false, rationale: "ELSO relative exclusions: irreversible terminal illness, severe frailty, advanced organ failure unlikely to recover." },
    ],
  },
};

const stepOrder: Step[] = ["witnessed", "rhythm", "noFlow", "lowFlow", "etco2", "comorbidity"];

const EcprDecisionTreeDiagram = () => {
  const [answers, setAnswers] = useState<Partial<Record<Step, number>>>({});
  const [showRationale, setShowRationale] = useState(true);

  const verdict = useMemo(() => {
    const answered = stepOrder.filter((s) => answers[s] !== undefined);
    if (answered.length === 0) return null;
    const favCount = answered.filter((s) => tree[s].options[answers[s]!].favourable).length;
    const total = answered.length;
    const allFav = favCount === total;
    const completed = answered.length === stepOrder.length;
    if (completed && allFav) {
      return {
        type: "candidate" as const,
        color: "hsl(140, 55%, 42%)",
        label: "ECPR candidate",
        message:
          "Activate the eCPR pathway: alert ECMO team, prepare cannulation kit, continue mechanical CPR (LUCAS), aim for cannulation within 60 min of arrest. Coronary angiography after stable ECMO flow.",
      };
    }
    if (favCount >= total - 1 && completed) {
      return {
        type: "borderline" as const,
        color: "hsl(38, 92%, 50%)",
        label: "Borderline — senior decision",
        message:
          "Discuss urgently with the on-call ECMO consultant. Consider patient-specific factors (witnessed status, downtime quality, premorbid function, family wishes). Continue CPR while deciding.",
      };
    }
    if (!allFav) {
      return {
        type: "excluded" as const,
        color: "hsl(0, 65%, 50%)",
        label: "Not an eCPR candidate",
        message:
          "One or more disqualifying factors. Continue conventional ALS; consider transition to comfort care once standard reversible causes addressed and prolonged downtime confirmed.",
      };
    }
    return {
      type: "incomplete" as const,
      color: "hsl(var(--muted-foreground))",
      label: `Continue (${favCount}/${total} favourable)`,
      message: "Answer the remaining questions to complete the assessment.",
    };
  }, [answers]);

  const reset = () => setAnswers({});

  return (
    <DiagramFigure
      id="ecpr-decision-tree-diagram"
      title="Ecpr decision tree"
      description="Auto-generated wrapper for the Ecpr decision tree anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <div className="my-6 space-y-4">
        <div className="bg-muted/30 rounded-xl border border-border p-4">
          <DiagramToggleBar
            title="eCPR (ECMO-CPR) decision tree"
            subtitle="Walk through the 6 selection criteria — answers feed a real-time eligibility verdict"
            toggles={[{ label: "Rationale", active: showRationale, onChange: () => setShowRationale((s) => !s) }]}
          />
  
          <div className="space-y-2">
            {stepOrder.map((step, i) => {
              const node = tree[step];
              const ans = answers[step];
              const answered = ans !== undefined;
              const fav = answered ? node.options[ans!].favourable : null;
              const stepColor = answered
                ? fav
                  ? "hsl(140, 55%, 42%)"
                  : "hsl(0, 65%, 50%)"
                : "hsl(var(--muted-foreground))";
              return (
                <div
                  key={step}
                  className="rounded-lg border border-border bg-background/70 p-3"
                  style={{ borderLeftWidth: 4, borderLeftColor: stepColor }}
                >
                  <div className="flex items-start gap-2 mb-2">
                    <span
                      className="flex-shrink-0 w-6 h-6 rounded-full text-[11px] font-bold flex items-center justify-center text-white"
                      style={{ backgroundColor: stepColor }}
                    >
                      {i + 1}
                    </span>
                    <p className="text-sm font-semibold text-foreground">{node.question}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 ml-8">
                    {node.options.map((opt, oi) => {
                      const selected = ans === oi;
                      return (
                            <button
                          key={opt.label}
                          onClick={() => setAnswers((a) => ({ ...a, [step]: oi }))}
                          aria-pressed={selected}
                          className="px-2.5 py-1 rounded-md text-[11px] font-medium border transition-all"
                          style={{
                            borderColor: selected ? (opt.favourable ? "hsl(140, 55%, 42%)" : "hsl(0, 65%, 50%)") : "hsl(var(--border))",
                            backgroundColor: selected
                              ? withAlpha(opt.favourable ? "hsl(140, 55%, 42%)" : "hsl(0, 65%, 50%)", 0.15)
                              : "transparent",
                            color: selected ? (opt.favourable ? "hsl(140, 55%, 35%)" : "hsl(0, 65%, 45%)") : "hsl(var(--foreground))",
                          }}
                        >
                          {opt.label}
                        </button>
    );
                    })}
                  </div>
                  {showRationale && answered && (
                    <p className="text-[11px] text-muted-foreground mt-2 ml-8 italic leading-relaxed">
                      {node.options[ans!].rationale}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
  
          {/* Verdict */}
          <div className="mt-4">
            {verdict ? (
              <div
                className="p-3 rounded-lg border-2"
                style={{
                  borderColor: verdict.color,
                  backgroundColor: withAlpha(verdict.color, 0.08),
                }}
              >
                <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                  <p className="text-sm font-bold" style={{ color: verdict.color }}>
                    {verdict.label}
                  </p>
                  <button
                    onClick={reset}
                    className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded border border-border text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
                  >
                    Reset
                  </button>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{verdict.message}</p>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground italic text-center py-2">
                Answer the questions above to see the eCPR eligibility verdict.
              </p>
            )}
          </div>
  
          <p className="text-[11px] text-muted-foreground mt-2 italic text-center">
            Frameworks: ELSO 2020/2023, ARREST (2020), Prague OHCA (2022), INCEPTION (2023). Always involve the local ECMO retrieval service early — minutes matter.
          </p>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default EcprDecisionTreeDiagram;

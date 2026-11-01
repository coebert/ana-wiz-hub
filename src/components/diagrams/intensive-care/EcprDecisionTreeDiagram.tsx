import { POST_ARREST_ECPR_TRIALS } from "@/components/topic/PostArrestReviewedFacts";
import { InlineRef } from "@/components/references/InlineRef";
import { useState } from "react";
import { withAlpha } from "@/lib/color-utils";
import { DiagramToggleBar } from "@/components/diagrams/shared/DiagramToggleBar";
import { DiagramFigure } from "../_shared/DiagramFigure";

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
      { label: "No / unknown", favourable: false, rationale: "Unknown or longer no-flow requires assessment of circumstances and the local rescue pathway; this answer alone is not exclusion." },
    ],
  },
  rhythm: {
    question: "Initial rhythm?",
    options: [
      { label: "VF / pulseless VT", favourable: true, rationale: "Shockable rhythm = best evidence base. ARREST enrolled refractory VF; Prague OHCA enrolled witnessed presumed cardiac OHCA and did not restrict all enrolment to VF/VT." },
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
      { label: "< 60 min", favourable: true, rationale: "ELSO describes a rapid time-to-flow goal and example selection criteria; local goals are not guarantees or universal exclusions." },
      { label: "60–90 min", favourable: false, rationale: "Borderline; case-by-case. Prague OHCA included low-flow up to ~60 min." },
      { label: "> 90 min", favourable: false, rationale: "Survival to good neurological outcome is rare. Generally an exclusion outside hypothermia." },
    ],
  },
  etco2: {
    question: "End-tidal CO₂ during high-quality CPR?",
    options: [
      { label: "≥ 10 mmHg (1.3 kPa)", favourable: true, rationale: "ETCO₂ can support assessment of CPR physiology; this value does not establish viability or eligibility." },
      { label: "< 10 mmHg sustained", favourable: false, rationale: "Low ETCO₂ warrants assessment of CPR quality, ventilation and cause; it is not a stand-alone futility or eligibility test." },
    ],
  },
  comorbidity: {
    question: "Patient profile?",
    options: [
      { label: "Age < 70, good baseline, no major comorbidity", favourable: true, rationale: "Age thresholds vary by service; assess physiological reserve and baseline function with the ECMO team, not a universal age cutoff." },
      { label: "Significant comorbidity / frailty / metastatic cancer", favourable: false, rationale: "ELSO relative exclusions: irreversible terminal illness, severe frailty, advanced organ failure unlikely to recover." },
    ],
  },
};

const stepOrder: Step[] = ["witnessed", "rhythm", "noFlow", "lowFlow", "etco2", "comorbidity"];

const EcprDecisionTreeDiagram = () => {
  const [answers, setAnswers] = useState<Partial<Record<Step, number>>>({});
  const [showRationale, setShowRationale] = useState(true);

  const answeredCount = stepOrder.filter(key => answers[key] !== undefined).length;
  const verdict = answeredCount ? {
    color: "hsl(var(--anatomy))",
    label: "Educational pathway checklist — specialist decision required",
    message: "These recorded factors do not establish eligibility or exclusion. Confirm the locally agreed pathway with the receiving ECMO team while high-quality ALS continues. Projected transport time does not guarantee time to flow. Do not stop resuscitation or initiate treatment solely from this checklist.",
  } : null;

  const reset = () => setAnswers({});

  return (
    <DiagramFigure
      id="ecpr-decision-tree-diagram"
      title="Ecpr decision tree"
      description="ECMO-CPR (eCPR) decision tree. Educational checklist of pathway factors; local specialist judgement determines acceptance. No automated candidate, exclusion or withdrawal verdict."
    >
              <div className="my-6 space-y-4">
        <div className="bg-muted/30 rounded-xl border border-border p-4">
          <DiagramToggleBar
            title="eCPR educational pathway checklist"
            subtitle="Locally defined selection; no automatic eligibility or exclusion"
            toggles={[{ label: "Rationale", active: showRationale, onChange: () => setShowRationale((s) => !s) }]}
          />
  
          <div className="space-y-2">
            {stepOrder.map((step, i) => {
              const node = tree[step];
              const ans = answers[step];
              const answered = ans !== undefined;
              const chosen = ans !== undefined ? node.options[ans] : undefined;
              const fav = chosen?.favourable;
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
                      {chosen?.rationale}
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
                Local ECMO-team assessment is required; this checklist does not provide eligibility clearance.
              </p>
            )}
          </div>
  
          <p className="text-[11px] text-muted-foreground mt-2 italic text-center">
            {POST_ARREST_ECPR_TRIALS}<InlineRef topicId="cardiac-arrest-post-resus" refLabel="ELSO ECPR 2021" /><InlineRef topicId="cardiac-arrest-post-resus" refLabel="ARREST 2020" /><InlineRef topicId="cardiac-arrest-post-resus" refLabel="Prague OHCA 2022" /><InlineRef topicId="cardiac-arrest-post-resus" refLabel="INCEPTION 2023" />
          </p>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default EcprDecisionTreeDiagram;

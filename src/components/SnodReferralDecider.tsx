import { useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, Clock, RotateCcw, Stethoscope } from "lucide-react";

type Answer = "yes" | "no" | null;

interface Question {
  id: keyof Answers;
  text: string;
  hint?: string;
}

interface Answers {
  ventilatedCatastrophic: Answer;
  bsdPlanned: Answer;
  wlstPlanned: Answer;
  absoluteContra: Answer;
}

const questions: Question[] = [
  {
    id: "ventilatedCatastrophic",
    text: "Mechanically ventilated patient with a catastrophic brain injury?",
    hint: "GCS 3 with no sedation effect, fixed pupils, devastating imaging, or planned admission for DBI observation.",
  },
  {
    id: "bsdPlanned",
    text: "Is brainstem death testing planned, or has it already been done?",
  },
  {
    id: "wlstPlanned",
    text: "Is withdrawal of life-sustaining treatment being actively planned or discussed?",
  },
  {
    id: "absoluteContra",
    text: "Any known absolute contraindication to donation (e.g. active untreated systemic infection, certain CNS or haematological malignancies)?",
    hint: "If unsure, treat as 'No' — SN-OD will advise on suitability.",
  },
];

type Verdict = {
  level: "now" | "soon" | "not-yet" | "advice-only";
  title: string;
  body: string;
  icon: typeof CheckCircle2;
  toneClass: string;
};

function decide(a: Answers): Verdict | null {
  if (Object.values(a).some((v) => v === null)) return null;

  if (a.absoluteContra === "yes") {
    return {
      level: "advice-only",
      title: "Discuss with SN-OD for advice — donation likely contraindicated",
      body: "Absolute contraindications are rare and frequently misjudged. Refer for confirmation rather than excluding the patient yourself; SN-OD will document and advise.",
      icon: AlertTriangle,
      toneClass: "border-destructive/40 bg-destructive/5 text-destructive",
    };
  }

  if (a.bsdPlanned === "yes" || a.wlstPlanned === "yes") {
    return {
      level: "now",
      title: "Refer to SN-OD now",
      body:
        a.bsdPlanned === "yes"
          ? "A clinical trigger has been met (planned brainstem death testing). Refer before testing so the DBD pathway can be prepared in parallel."
          : "A clinical trigger has been met (planned WLST). Refer before the family conversation about withdrawal so DCD can be considered.",
      icon: CheckCircle2,
      toneClass: "border-icu/50 bg-icu/10 text-icu",
    };
  }

  if (a.ventilatedCatastrophic === "yes") {
    return {
      level: "soon",
      title: "Refer soon — within the 24–72 h DBI window",
      body: "No formal trigger yet, but a catastrophic brain injury under active management often evolves toward one. Notify SN-OD early so they can attend MDT discussions; full prognostication still requires ≥72 h of active treatment.",
      icon: Clock,
      toneClass: "border-primary/40 bg-primary/5 text-foreground",
    };
  }

  return {
    level: "not-yet",
    title: "Not yet — reassess as the clinical picture evolves",
    body: "No referral trigger is currently met. Continue active treatment, exclude confounders, and reassess at each MDT review. Refer immediately if BSD testing is planned or WLST is considered.",
    icon: Stethoscope,
    toneClass: "border-border bg-secondary/40 text-foreground",
  };
}

export function SnodReferralDecider() {
  const [answers, setAnswers] = useState<Answers>({
    ventilatedCatastrophic: null,
    bsdPlanned: null,
    wlstPlanned: null,
    absoluteContra: null,
  });

  const verdict = useMemo(() => decide(answers), [answers]);
  const answered = Object.values(answers).filter((v) => v !== null).length;

  const reset = () =>
    setAnswers({
      ventilatedCatastrophic: null,
      bsdPlanned: null,
      wlstPlanned: null,
      absoluteContra: null,
    });

  return (
    <div className="rounded-lg border border-border bg-card p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h4 className="text-base font-serif font-bold text-foreground">SN-OD referral decider</h4>
          <p className="text-xs text-muted-foreground mt-1">
            Answer the trigger questions for guidance. Always discuss with your local SN-OD if unsure — they decide suitability, not you.
          </p>
        </div>
        <span className="shrink-0 text-[11px] font-medium text-muted-foreground">
          {answered}/{questions.length}
        </span>
      </div>

      <ol className="space-y-3">
        {questions.map((q, idx) => {
          const value = answers[q.id];
          return (
            <li key={q.id} className="rounded-md border border-border/70 bg-background/40 p-3">
              <p className="text-sm text-foreground">
                <span className="font-semibold mr-1">{idx + 1}.</span>
                {q.text}
              </p>
              {q.hint && (
                <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">{q.hint}</p>
              )}
              <div className="mt-2 flex gap-2" role="radiogroup" aria-label={q.text}>
                {(["yes", "no"] as const).map((opt) => {
                  const selected = value === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() =>
                        setAnswers((prev) => ({ ...prev, [q.id]: opt }))
                      }
                      className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                        selected
                          ? "bg-icu text-primary-foreground border-icu"
                          : "bg-background text-muted-foreground border-border hover:border-icu/60 hover:text-foreground"
                      }`}
                    >
                      {opt === "yes" ? "Yes" : "No"}
                    </button>
                  );
                })}
              </div>
            </li>
          );
        })}
      </ol>

      <div className="mt-4">
        {verdict ? (
          <div className={`rounded-md border p-3 ${verdict.toneClass}`}>
            <div className="flex items-start gap-2">
              <verdict.icon className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold">{verdict.title}</p>
                <p className="text-xs mt-1 leading-relaxed text-foreground/80">{verdict.body}</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-xs text-muted-foreground italic">
            Answer all {questions.length} questions for a recommendation.
          </p>
        )}

        <button
          type="button"
          onClick={reset}
          className="mt-3 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          <RotateCcw className="h-3 w-3" /> Reset
        </button>
      </div>

      <p className="mt-3 text-[10px] text-muted-foreground italic">
        Decision support only. Follows NHSBT clinical triggers (planned BSD testing or planned WLST) — not a substitute for clinical judgement or local policy.
      </p>
    </div>
  );
}

export default SnodReferralDecider;

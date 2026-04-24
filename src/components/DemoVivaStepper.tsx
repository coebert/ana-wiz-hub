import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookMarked,
  MessageSquare,
  Mic,
  Quote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import DemoVivaPlayer from "@/components/DemoVivaPlayer";
import DemoVivaInteractive from "@/components/DemoVivaInteractive";

export interface DemoVivaQuestion {
  tag: string;
  /** "Primary" | "Final" — drives the AI examiner's exam standard. */
  difficulty: "Primary" | "Final";
  question: string;
  /** Pre-written model candidate answer (used for the audio playback + reference panel). */
  answer: string;
  feedback: { label: string; text: string }[];
  curriculum: { exam: "Primary" | "Final"; code: string; topic: string }[];
}

interface DemoVivaStepperProps {
  questions: DemoVivaQuestion[];
}

/**
 * Step-by-step viva demo: shows ONE question card at a time with Back/Next
 * controls and a progress indicator so the candidate can work through the
 * three demo questions in focus rather than scrolling all three at once.
 */
const DemoVivaStepper = ({ questions }: DemoVivaStepperProps) => {
  const [step, setStep] = useState(0);
  const total = questions.length;
  const q = questions[step];

  const goTo = (idx: number) => {
    if (idx < 0 || idx >= total) return;
    setStep(idx);
    // Scroll the card into view smoothly so the candidate's focus follows.
    requestAnimationFrame(() => {
      document
        .getElementById("demo-viva-stepper-card")
        ?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  };

  const isFirst = step === 0;
  const isLast = step === total - 1;

  return (
    <div className="space-y-4">
      {/* Progress + step indicator */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-white/80 [text-shadow:0_1px_3px_rgba(0,0,0,0.3)]">
            Step {step + 1} of {total}
          </span>
          <div className="flex items-center gap-1.5">
            {questions.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to question ${i + 1}`}
                aria-current={i === step ? "step" : undefined}
                className={`h-2 rounded-full transition-all ${
                  i === step
                    ? "w-6 bg-white"
                    : i < step
                      ? "w-2 bg-white/70 hover:bg-white"
                      : "w-2 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            size="sm"
            variant="secondary"
            onClick={() => goTo(step - 1)}
            disabled={isFirst}
          >
            <ArrowLeft className="h-3.5 w-3.5 mr-1.5" />
            Back
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={() => goTo(step + 1)}
            disabled={isLast}
          >
            Next
            <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
          </Button>
        </div>
      </div>

      {/* Active question card */}
      <div
        id="demo-viva-stepper-card"
        className="rounded-2xl border border-border bg-card p-5 md:p-6 shadow-sm"
      >
        <div className="flex items-center gap-2 mb-3">
          <Quote className="h-4 w-4 text-primary" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Question {step + 1}
          </span>
          <span className="ml-auto inline-flex items-center rounded-full bg-primary/10 text-primary px-2 py-0.5 text-[11px] font-medium">
            {q.tag}
          </span>
          <span className="text-[11px] text-muted-foreground">{q.difficulty}</span>
        </div>

        <p className="font-display text-base md:text-lg text-foreground leading-snug mb-3">
          "{q.question}"
        </p>

        <div className="mb-4">
          <DemoVivaPlayer
            segments={[
              { label: "Examiner question", text: q.question },
              { label: "Model candidate answer", text: q.answer },
              {
                label: "Examiner feedback",
                text: q.feedback.map((f) => `${f.label}. ${f.text}`).join(" "),
              },
            ]}
          />
        </div>

        <div className="mb-4">
          <DemoVivaInteractive
            // Re-mount per step so any in-flight session resets cleanly.
            key={step}
            question={q.question}
            topicTitle={`${q.tag} — demo viva`}
            exam={q.difficulty === "Primary" ? "primary" : "final"}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border/60 bg-muted/40 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Mic className="h-3.5 w-3.5 text-primary" />
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Model candidate answer
              </span>
            </div>
            <p className="text-sm text-foreground/90 leading-relaxed">{q.answer}</p>
          </div>

          <div className="rounded-xl border border-border/60 bg-muted/40 p-4">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="h-3.5 w-3.5 text-primary" />
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Examiner feedback
              </span>
            </div>
            <ul className="space-y-2 text-sm text-foreground/90">
              {q.feedback.map((f, j) => (
                <li key={j}>
                  <span className="font-semibold text-foreground">{f.label}:</span>{" "}
                  {f.text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-4">
          <div className="flex items-center gap-2 mb-2">
            <BookMarked className="h-3.5 w-3.5 text-primary" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              FRCA curriculum mapping
            </span>
          </div>
          <ul className="space-y-1.5 text-sm text-foreground/90">
            {q.curriculum.map((c, k) => (
              <li key={k} className="flex items-start gap-2">
                <span
                  className={`mt-0.5 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider flex-shrink-0 ${
                    c.exam === "Primary"
                      ? "bg-physiology/15 text-physiology"
                      : "bg-clinical/15 text-clinical"
                  }`}
                >
                  {c.exam}
                </span>
                <span className="leading-snug">
                  <span className="font-mono text-[11px] text-muted-foreground mr-1.5">
                    {c.code}
                  </span>
                  {c.topic}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Back/Next for long cards — easier to reach without scrolling up */}
      <div className="flex items-center justify-between gap-3">
        <Button
          type="button"
          size="sm"
          variant="secondary"
          onClick={() => goTo(step - 1)}
          disabled={isFirst}
        >
          <ArrowLeft className="h-3.5 w-3.5 mr-1.5" />
          Previous question
        </Button>
        {isLast ? (
          <span className="text-[11px] text-white/80 [text-shadow:0_1px_3px_rgba(0,0,0,0.3)]">
            End of demo — try the full Viva tool from the menu above.
          </span>
        ) : (
          <Button type="button" size="sm" onClick={() => goTo(step + 1)}>
            Next question
            <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default DemoVivaStepper;

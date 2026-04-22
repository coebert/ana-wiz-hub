import { useEffect, useMemo, useState } from "react";
import { Check, ChevronLeft, ChevronRight, X, RotateCcw } from "lucide-react";

export interface WalkthroughStep {
  id: string | number;
  title: string;
  detail?: string;
  actions: string[];
  /** Optional confirmation prompt shown when all actions are checked */
  confirmation?: string;
  tone?: "info" | "warn" | "critical";
}

interface Props {
  open: boolean;
  onClose: () => void;
  /** External step index (controlled). If omitted, the overlay manages its own. */
  stepIndex?: number;
  onStepChange?: (i: number) => void;
  steps: WalkthroughStep[];
  title: string;
  subtitle?: string;
}

const toneClasses = {
  info: "border-primary/40 bg-primary/5",
  warn: "border-amber-500/40 bg-amber-500/10",
  critical: "border-red-500/50 bg-red-500/10",
} as const;

const toneText = {
  info: "text-primary",
  warn: "text-amber-500",
  critical: "text-red-500",
} as const;

export default function GuidedWalkthroughOverlay({
  open,
  onClose,
  stepIndex,
  onStepChange,
  steps,
  title,
  subtitle,
}: Props) {
  const [internalIdx, setInternalIdx] = useState(0);
  const idx = stepIndex ?? internalIdx;
  const setIdx = (i: number) => {
    const clamped = Math.max(0, Math.min(steps.length - 1, i));
    if (onStepChange) onStepChange(clamped);
    else setInternalIdx(clamped);
  };

  // checked[stepId] = Set of action indices done
  const [checked, setChecked] = useState<Record<string, Set<number>>>({});

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIdx(idx + 1);
      if (e.key === "ArrowLeft") setIdx(idx - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, idx, onClose]);

  const step = steps[idx];
  const stepKey = String(step?.id ?? idx);
  const checkedSet = checked[stepKey] ?? new Set<number>();
  const allDone = step ? checkedSet.size === step.actions.length : false;
  const tone = step?.tone ?? "info";

  const completedSteps = useMemo(
    () =>
      steps.filter((s) => {
        const set = checked[String(s.id)];
        return set && set.size === s.actions.length;
      }).length,
    [checked, steps],
  );

  const toggleAction = (i: number) => {
    setChecked((prev) => {
      const next = { ...prev };
      const set = new Set(next[stepKey] ?? []);
      if (set.has(i)) set.delete(i);
      else set.add(i);
      next[stepKey] = set;
      return next;
    });
  };

  const resetProgress = () => {
    setChecked({});
    setIdx(0);
  };

  if (!open || !step) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-background/70 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={`${title} — guided walkthrough`}
      onClick={onClose}
    >
      <div
        className="relative w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto bg-card border border-border rounded-t-2xl sm:rounded-2xl shadow-xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-card/95 backdrop-blur border-b border-border px-4 py-3 flex items-start gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">
              Guided walkthrough
            </p>
            <h3 className="text-sm font-serif font-bold text-foreground truncate">{title}</h3>
            {subtitle && (
              <p className="text-[11px] text-muted-foreground truncate">{subtitle}</p>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={resetProgress}
              className="p-1.5 rounded-md text-muted-foreground hover:bg-accent/50 hover:text-foreground transition-colors"
              aria-label="Reset progress"
              title="Reset progress"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-md text-muted-foreground hover:bg-accent/50 hover:text-foreground transition-colors"
              aria-label="Close walkthrough"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress bar + step pips */}
        <div className="px-4 pt-3">
          <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1.5">
            <span>
              Step {idx + 1} of {steps.length}
            </span>
            <span>
              {completedSteps}/{steps.length} complete
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-secondary/60 overflow-hidden mb-2">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${((idx + 1) / steps.length) * 100}%` }}
            />
          </div>
          <div className="flex flex-wrap gap-1 mb-3">
            {steps.map((s, i) => {
              const set = checked[String(s.id)];
              const done = set && set.size === s.actions.length;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setIdx(i)}
                  className={`w-6 h-6 rounded-full text-[10px] font-bold border transition-all ${
                    i === idx
                      ? "border-primary bg-primary text-primary-foreground"
                      : done
                        ? "border-primary/50 bg-primary/15 text-primary"
                        : "border-border bg-background text-muted-foreground hover:bg-accent/40"
                  }`}
                  aria-label={`Go to step ${i + 1}: ${s.title}`}
                  aria-current={i === idx}
                >
                  {done ? "✓" : i + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* Body */}
        <div className="px-4 pb-4 space-y-3">
          <div>
            <h4 className="text-base font-semibold text-foreground">{step.title}</h4>
            {step.detail && (
              <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                {step.detail}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Confirm each action
            </p>
            {step.actions.map((action, i) => {
              const isChecked = checkedSet.has(i);
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => toggleAction(i)}
                  className={`w-full text-left flex items-start gap-2.5 p-2.5 rounded-lg border transition-all ${
                    isChecked
                      ? "border-primary/40 bg-primary/5"
                      : "border-border bg-background hover:bg-accent/30"
                  }`}
                >
                  <span
                    className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors mt-0.5 ${
                      isChecked
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background"
                    }`}
                    aria-hidden
                  >
                    {isChecked && <Check className="w-3 h-3" strokeWidth={3} />}
                  </span>
                  <span
                    className={`text-xs leading-relaxed ${
                      isChecked
                        ? "text-muted-foreground line-through decoration-primary/50"
                        : "text-foreground"
                    }`}
                  >
                    {action}
                  </span>
                </button>
              );
            })}
          </div>

          {allDone && (
            <div
              className={`rounded-lg border p-3 animate-fade-in ${toneClasses[tone]}`}
            >
              <p
                className={`text-[10px] font-semibold uppercase tracking-wider mb-1 ${toneText[tone]}`}
              >
                Step complete
              </p>
              <p className="text-xs text-foreground leading-relaxed">
                {step.confirmation ??
                  (idx === steps.length - 1
                    ? "All steps complete. Walkthrough finished."
                    : "Proceed to the next step when ready.")}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-card/95 backdrop-blur border-t border-border px-4 py-3 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => setIdx(idx - 1)}
            disabled={idx === 0}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border border-border text-muted-foreground hover:bg-accent/40 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" /> Previous
          </button>

          {idx === steps.length - 1 ? (
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border border-primary bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Finish
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIdx(idx + 1)}
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                allDone
                  ? "border-primary bg-primary text-primary-foreground hover:bg-primary/90"
                  : "border-primary/50 bg-primary/10 text-foreground hover:bg-primary/20"
              }`}
            >
              {allDone ? "Next step" : "Skip ahead"}{" "}
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

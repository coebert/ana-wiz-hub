import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Pause, Play, RotateCcw, ChevronLeft, ChevronRight, BookOpen, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const slugifyLabel = (label: string) =>
  label
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export interface AnimatedMechanismStepSource {
  /** Short label, must match a `topicReferences` entry on the host topic. */
  label: string;
  /** Optional direct URL — if provided, the chip opens it in a new tab.
   *  If omitted, the chip scrolls to `#ref-{slugified label}` in the page
   *  references list (auto-expanding it via the standard hash behaviour). */
  url?: string;
}

export interface AnimatedMechanismStep {
  /** Short label shown on the chip / step pill (1-3 words). */
  label: string;
  /** Detailed teaching explanation rendered in the side panel for the active step. */
  detail: ReactNode;
  /** Optional sub-callout (e.g. drug, dose, key number) shown under the detail. */
  callout?: ReactNode;
  /** Optional ms duration override for THIS step (defaults to `stepMs` on the parent). */
  durationMs?: number;
  /** Optional verified sources backing THIS step. Rendered as a footnote row
   *  in the side panel — each chip links to the topic's References list
   *  (or directly out, if a `url` is supplied). */
  sources?: AnimatedMechanismStepSource[];
}

export interface AnimatedMechanismProps {
  /** Headline shown above the diagram (e.g. "CICO — DAS 2015 emergency drill"). */
  title: string;
  /** Optional 1-2 sentence subtitle. */
  subtitle?: ReactNode;
  /** Ordered causal steps. The active step is passed back to `renderScene`. */
  steps: AnimatedMechanismStep[];
  /**
   * Render the visual scene. Receives the index of the active step so the
   * caller can light up the relevant element (e.g. an SVG node, a row, a row
   * of the cascade). Wrap your scene in semantic colour tokens — never raw hex.
   */
  renderScene: (activeStep: number) => ReactNode;
  /** Default ms per step (overridden by `step.durationMs`). Default 2400 ms. */
  stepMs?: number;
  /** Tailwind className for the side-panel accent border (e.g. "border-clinical/40"). */
  accentClass?: string;
  /** Optional extra className on the outer wrapper. */
  className?: string;
}

/**
 * Reusable scrubbable mechanism animation.
 *
 * - Auto-plays unless the user prefers reduced motion (then waits for Play)
 * - Pause / Play / Restart toolbar
 * - Prev / Next stepping
 * - Click a chip to jump to that step
 *
 * The visual scene is fully delegated to `renderScene(activeStep)` so each
 * mechanism (CICO, opioid signalling, RSI) can render its own SVG / layout
 * while reusing all the timing & accessibility logic.
 */
export const AnimatedMechanism = ({
  title,
  subtitle,
  steps,
  renderScene,
  stepMs = 2400,
  accentClass = "border-accent/40",
  className,
}: AnimatedMechanismProps) => {
  // Respect prefers-reduced-motion.
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  }, []);

  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(!prefersReducedMotion);
  const timerRef = useRef<number | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Auto-advance loop — re-armed whenever active step or playing state changes.
  useEffect(() => {
    clearTimer();
    if (!playing) return;
    const dur = steps[active]?.durationMs ?? stepMs;
    timerRef.current = window.setTimeout(() => {
      setActive((prev) => (prev + 1) % steps.length);
    }, dur);
    return clearTimer;
  }, [active, playing, steps, stepMs, clearTimer]);

  const restart = () => {
    clearTimer();
    setActive(0);
    setPlaying(!prefersReducedMotion);
  };
  const togglePlay = () => setPlaying((p) => !p);
  const next = () => {
    setPlaying(false);
    setActive((p) => (p + 1) % steps.length);
  };
  const prev = () => {
    setPlaying(false);
    setActive((p) => (p - 1 + steps.length) % steps.length);
  };
  const jumpTo = (i: number) => {
    setPlaying(false);
    setActive(i);
  };

  const current = steps[active];
  const progressPct = ((active + 1) / steps.length) * 100;

  return (
    <figure
      className={cn(
        "rounded-xl border border-border bg-card shadow-sm overflow-hidden",
        className,
      )}
      aria-label={`${title} — animated mechanism, ${steps.length} steps`}
    >
      <header className="px-4 sm:px-5 pt-4 pb-3 border-b border-border bg-muted/30">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-base sm:text-lg font-serif font-semibold text-foreground leading-tight">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <Button
              type="button"
              size="icon"
              variant="outline"
              className="h-8 w-8"
              onClick={prev}
              aria-label="Previous step"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="default"
              className="h-8 w-8"
              onClick={togglePlay}
              aria-label={playing ? "Pause animation" : "Play animation"}
              aria-pressed={playing}
            >
              {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button
              type="button"
              size="icon"
              variant="outline"
              className="h-8 w-8"
              onClick={next}
              aria-label="Next step"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="h-8 w-8"
              onClick={restart}
              aria-label="Restart animation"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Progress bar */}
        <div
          className="mt-3 h-1.5 w-full rounded-full bg-muted overflow-hidden"
          role="progressbar"
          aria-valuenow={active + 1}
          aria-valuemin={1}
          aria-valuemax={steps.length}
        >
          <div
            className="h-full bg-primary transition-[width] duration-500 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {/* Step chips */}
        <ol className="mt-3 flex flex-wrap gap-1.5" aria-label="Mechanism steps">
          {steps.map((s, i) => {
            const isActive = i === active;
            const isDone = i < active;
            return (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => jumpTo(i)}
                  aria-current={isActive ? "step" : undefined}
                  className={cn(
                    "text-xs px-2.5 py-1 rounded-full border transition-colors flex items-center gap-1.5",
                    isActive
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : isDone
                      ? "bg-muted text-foreground border-border"
                      : "bg-background text-muted-foreground border-border hover:bg-muted",
                  )}
                >
                  <span className="font-mono tabular-nums opacity-70">{i + 1}</span>
                  <span className="font-medium">{s.label}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-0">
        {/* Scene */}
        <div
          key={active /* re-mount on step change → free fade-in */}
          className="p-4 sm:p-5 bg-background animate-fade-in min-h-[260px]"
        >
          {renderScene(active)}
        </div>

        {/* Side-panel detail */}
        <aside
          className={cn(
            "p-4 sm:p-5 border-t lg:border-t-0 lg:border-l border-border bg-muted/20",
          )}
          aria-live="polite"
        >
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
            Step {active + 1} of {steps.length}
          </p>
          <p className="text-sm font-semibold text-foreground mb-2">{current?.label}</p>
          <div
            key={`detail-${active}`}
            className="text-sm text-muted-foreground leading-relaxed animate-fade-in"
          >
            {current?.detail}
          </div>
          {current?.callout && (
            <div
              key={`callout-${active}`}
              className={cn(
                "mt-3 rounded-md border-l-4 bg-card px-3 py-2 text-xs text-foreground animate-fade-in",
                accentClass,
              )}
            >
              {current.callout}
            </div>
          )}
          {current?.sources && current.sources.length > 0 && (
            <div
              key={`sources-${active}`}
              className="mt-3 pt-3 border-t border-border animate-fade-in"
              aria-label="Sources for this step"
            >
              <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">
                <BookOpen className="h-3 w-3" /> Sources
              </p>
              <ul className="flex flex-wrap gap-1.5">
                {current.sources.map((s, i) => {
                  const isExternal = !!s.url;
                  const href = s.url ?? `#ref-${slugifyLabel(s.label)}`;
                  return (
                    <li key={`${s.label}-${i}`}>
                      <a
                        href={href}
                        {...(isExternal
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-2 py-0.5 text-[11px] font-medium text-foreground hover:bg-muted hover:border-primary/40 transition-colors"
                        title={isExternal ? `Open ${s.label}` : `Jump to "${s.label}" in the references list`}
                      >
                        <span>{s.label}</span>
                        {isExternal && <ExternalLink className="h-2.5 w-2.5 text-muted-foreground" />}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </figure>
  );
};

export default AnimatedMechanism;

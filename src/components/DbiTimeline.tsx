import { useEffect, useRef, useState } from "react";

const steps = [
  {
    time: "0–6 h",
    title: "Resuscitate & image",
    detail:
      "A–E, intubate, lung-protective ventilation, empirical ICP control, urgent CT ± angio, neurosurgical referral for any reversible lesion.",
    flag: null as string | null,
  },
  {
    time: "6–24 h",
    title: "Stabilise & protect",
    detail:
      "TTM 36–37 °C, CPP 60–70, ICP <22, glucose 6–10, Na 140–150, correct coagulopathy. Begin documenting baseline neurology.",
    flag: "Start excluding confounders",
  },
  {
    time: "24–72 h",
    title: "Observe & involve",
    detail:
      "Daily MDT review, full supportive care, family discussions about uncertainty and ceilings of care. No formal prognostication yet.",
    flag: "Refer to SN-OD when DBI suspected",
  },
  {
    time: "≥72 h",
    title: "Prognosticate & decide",
    detail:
      "Senior, multimodal assessment off sedation. ≥2 senior clinicians decide WLST or transition to brainstem death testing / DCD pathway.",
    flag: "Confounders must be excluded",
  },
];

export function DbiTimeline() {
  const [active, setActive] = useState(0);
  const figureRef = useRef<HTMLDivElement | null>(null);

  // Scroll-driven active stage. Maps the figure's vertical position in the
  // viewport to a stage index 0–3. Uses rAF throttling to stay smooth.
  useEffect(() => {
    const el = figureRef.current;
    if (!el) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      // Progress: 0 when the figure top hits viewport center,
      // 1 when figure bottom passes viewport center.
      const center = viewport * 0.55;
      const span = rect.height + viewport * 0.4;
      const progress = (center - rect.top) / span;
      const clamped = Math.min(1, Math.max(0, progress));
      const idx = Math.min(steps.length - 1, Math.floor(clamped * steps.length));
      setActive((prev) => (prev === idx ? prev : idx));
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const fillPercent = ((active + 0.5) / steps.length) * 100;

  return (
    <figure className="mb-5">
      <figcaption className="sr-only">
        Visual timeline of the first 72 hours of devastating brain injury management,
        highlighting when to exclude confounders and when to involve the specialist nurse for
        organ donation (SN-OD). The active stage updates as you scroll or click.
      </figcaption>
      <div
        ref={figureRef}
        className="relative rounded-lg border border-border bg-card p-4 sm:p-5"
        role="group"
        aria-label="DBI 72-hour management timeline"
      >
        {/* Track */}
        <div className="relative">
          <div className="absolute left-0 right-0 top-3 h-1 rounded-full bg-icu/15" aria-hidden="true" />
          <div
            className="absolute left-0 top-3 h-1 rounded-full bg-gradient-to-r from-icu/60 to-icu transition-[width] duration-500 ease-out"
            style={{ width: `${fillPercent}%` }}
            aria-hidden="true"
          />
          <ol className="relative grid grid-cols-2 sm:grid-cols-4 gap-4">
            {steps.map((step, idx) => {
              const isActive = idx === active;
              const isReached = idx <= active;
              return (
                <li key={step.time} className="relative pt-8">
                  <button
                    type="button"
                    onClick={() => setActive(idx)}
                    aria-pressed={isActive}
                    aria-label={`Show ${step.time} — ${step.title}`}
                    className={`absolute left-1/2 top-1 -translate-x-1/2 flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold ring-4 ring-card transition-all duration-300 ${
                      isReached
                        ? "bg-icu text-primary-foreground"
                        : "bg-icu/20 text-icu"
                    } ${isActive ? "scale-125 shadow-md shadow-icu/40" : "hover:scale-110"}`}
                  >
                    {idx + 1}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActive(idx)}
                    className={`block w-full text-center transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-60 hover:opacity-90"
                    }`}
                  >
                    <p className="text-xs font-semibold uppercase tracking-wide text-icu">
                      {step.time}
                    </p>
                    <p className="text-sm font-semibold text-foreground mt-0.5">{step.title}</p>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Active stage detail card */}
        <div className="mt-5 rounded-md border border-icu/30 bg-icu/5 p-3 animate-fade-in" key={active}>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-icu">
              Stage {active + 1} · {steps[active].time}
            </span>
            <span className="text-sm font-semibold text-foreground">{steps[active].title}</span>
            {steps[active].flag && (
              <span className="rounded-full border border-icu/40 bg-icu/10 px-2 py-0.5 text-[10px] font-medium text-icu">
                {steps[active].flag}
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">{steps[active].detail}</p>
        </div>

        {/* Key milestones */}
        <div className="mt-5 grid sm:grid-cols-2 gap-3 text-xs">
          <div className="rounded-md border border-border bg-secondary/40 p-3">
            <p className="font-semibold text-foreground mb-1">Confounder exclusion checkpoint</p>
            <p className="text-muted-foreground leading-relaxed">
              Before any prognostic decision: residual sedation/NMB, temperature ≥36 °C,
              Na/glucose/urea normal, no hypoxia or hypotension, no NCSE, no intoxication, no
              severe metabolic/hepatic/renal derangement.
            </p>
          </div>
          <div className="rounded-md border border-border bg-secondary/40 p-3">
            <p className="font-semibold text-foreground mb-1">When to refer to SN-OD</p>
            <p className="text-muted-foreground leading-relaxed">
              As soon as a clinical trigger is met — catastrophic brain injury with planned
              brainstem death testing, or anticipated WLST. Refer <strong>early</strong> (within
              the 24–72 h window), before the family conversation about WLST. Referral does not
              commit to donation.
            </p>
          </div>
        </div>
      </div>
    </figure>
  );
}

export default DbiTimeline;

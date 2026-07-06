import React, { useEffect, useRef, useState } from "react";
import { DiagramFigure } from "../_shared/DiagramFigure";

/**
 * Animated infographic comparing recommended dwell-time approach
 * (clinically indicated vs scheduled / routine change) across the five
 * common vascular access categories. Each row animates its bar to a
 * visual "max recommended dwell" length, with a coloured tag indicating
 * the management strategy and a one-line evidence anchor.
 *
 * Pure presentation (frame animation via CSS keyframes triggered on
 * IntersectionObserver) — designed to be read alongside the dwell-time
 * and site evidence sections of the Vascular Access Devices topic.
 */

type Strategy = "clinical" | "scheduled" | "context";

interface Row {
  device: string;
  /** Visual bar length, 0–100 (= percent of axis). */
  bar: number;
  /** Short dwell-time descriptor displayed at the bar end. */
  dwellLabel: string;
  strategy: Strategy;
  strategyLabel: string;
  evidence: string;
  hue: number;
}

const ROWS: Row[] = [
  {
    device: "Peripheral cannula",
    bar: 12,
    dwellLabel: "Remove when clinically indicated",
    strategy: "clinical",
    strategyLabel: "Clinically indicated",
    evidence: "Rickard 2012 (Lancet); Cochrane 2019; epic3",
    hue: 200,
  },
  {
    device: "Arterial line",
    bar: 22,
    dwellLabel: "≈ 5–7 days · radial preferred",
    strategy: "clinical",
    strategyLabel: "Clinically indicated",
    evidence: "CDC 2017; Maki 2006 (CRBSI ≈ 1.7/1000)",
    hue: 0,
  },
  {
    device: "Non-tunnelled CVC",
    bar: 38,
    dwellLabel: "≤ 7–14 days · no routine change",
    strategy: "context",
    strategyLabel: "Site-dependent",
    evidence: "3SITES (Parienti 2015): SCV < IJV < femoral",
    hue: 350,
  },
  {
    device: "PICC",
    bar: 75,
    dwellLabel: "Weeks – months",
    strategy: "clinical",
    strategyLabel: "Clinically indicated",
    evidence: "epic3; INS 2021 — remove on completion of therapy",
    hue: 280,
  },
  {
    device: "Tunnelled / dialysis catheter",
    bar: 92,
    dwellLabel: "Months – years",
    strategy: "scheduled",
    strategyLabel: "Scheduled review",
    evidence: "KDOQI 2019; Hickman/Permcath — exit-site surveillance",
    hue: 150,
  },
];

const STRATEGY_STYLES: Record<Strategy, { bg: string; fg: string; ring: string }> = {
  clinical:  { bg: "hsl(150 55% 92%)", fg: "hsl(150 60% 25%)", ring: "hsl(150 55% 45%)" },
  scheduled: { bg: "hsl(35 85% 92%)",  fg: "hsl(28 70% 28%)",  ring: "hsl(35 75% 50%)" },
  context:   { bg: "hsl(220 60% 94%)", fg: "hsl(220 60% 28%)", ring: "hsl(220 60% 50%)" },
};

export const DwellTimeInfographic: React.FC = () => {
  const [animate, setAnimate] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setAnimate(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.25 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <DiagramFigure
      id="dwell-time-infographic"
      title="Dwell time infographic"
      description="Auto-generated wrapper for the Dwell time infographic graphical relationship. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <figure
        ref={ref}
        className="my-6 rounded-xl border border-border bg-card overflow-hidden"
      >
        <figcaption className="px-4 py-3 border-b border-border bg-muted/30">
          <p className="text-sm font-semibold text-foreground">
            Recommended dwell-time approach by device
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Bar length is a visual proxy for the maximum recommended dwell
            time. The coloured tag shows the management strategy:{" "}
            <span className="font-medium" style={{ color: STRATEGY_STYLES.clinical.ring }}>
              clinically indicated
            </span>
            {" · "}
            <span className="font-medium" style={{ color: STRATEGY_STYLES.context.ring }}>
              site-dependent
            </span>
            {" · "}
            <span className="font-medium" style={{ color: STRATEGY_STYLES.scheduled.ring }}>
              scheduled review
            </span>
            .
          </p>
        </figcaption>
  
        <div className="p-4 space-y-3">
          {/* Axis */}
          <div className="relative ml-[180px] mr-2 h-4 text-[10px] text-muted-foreground">
            {[
              { pct: 0,  label: "hours" },
              { pct: 22, label: "days" },
              { pct: 50, label: "weeks" },
              { pct: 80, label: "months" },
              { pct: 100, label: "years" },
            ].map((t) => (
              <div
                key={t.label}
                className="absolute top-0 -translate-x-1/2 flex flex-col items-center"
                style={{ left: `${t.pct}%` }}
              >
                <div className="h-1.5 w-px bg-border" />
                <span>{t.label}</span>
              </div>
            ))}
          </div>
  
          {ROWS.map((r, i) => {
            const styles = STRATEGY_STYLES[r.strategy];
            const delay = 120 + i * 140;
            return (
                  <div
                key={r.device}
                className="grid grid-cols-[180px_1fr] items-center gap-3"
              >
                {/* Label column */}
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground leading-tight">
                    {r.device}
                  </p>
                  <p className="text-[10px] text-muted-foreground italic mt-0.5">
                    {r.evidence}
                  </p>
                </div>
  
                {/* Bar + tag column */}
                <div className="relative h-10">
                  {/* Track */}
                  <div className="absolute inset-y-3 left-0 right-0 rounded-full bg-muted/60" />
                  {/* Animated fill */}
                  <div
                    className="absolute inset-y-3 left-0 rounded-full"
                    style={{
                      width: animate ? `${r.bar}%` : "0%",
                      background: `linear-gradient(90deg, hsl(${r.hue} 60% 70%), hsl(${r.hue} 60% 45%))`,
                      transition: `width 900ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
                    }}
                  />
                  {/* End-of-bar dwell label */}
                  <div
                    className="absolute top-0 -translate-x-1/2 text-[10px] font-medium text-foreground whitespace-nowrap"
                    style={{
                      left: animate ? `${Math.min(r.bar, 92)}%` : "0%",
                      opacity: animate ? 1 : 0,
                      transition: `left 900ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, opacity 400ms ease-out ${delay + 600}ms`,
                    }}
                  >
                    {r.dwellLabel}
                  </div>
                  {/* Strategy tag */}
                  <div
                    className="absolute bottom-0 right-0 text-[10px] font-semibold px-2 py-0.5 rounded-full border"
                    style={{
                      backgroundColor: styles.bg,
                      color: styles.fg,
                      borderColor: styles.ring,
                      opacity: animate ? 1 : 0,
                      transform: animate ? "translateX(0)" : "translateX(8px)",
                      transition: `opacity 400ms ease-out ${delay + 400}ms, transform 400ms ease-out ${delay + 400}ms`,
                    }}
                  >
                    {r.strategyLabel}
                  </div>
                </div>
              </div>
    );
          })}
  
          <p className="pt-2 text-[11px] text-muted-foreground border-t border-border">
            Routine scheduled replacement of peripheral cannulae every 72–96 h
            is no longer recommended (Rickard 2012, Cochrane 2019, epic3).
            Central catheters are removed when no longer needed rather than
            on a fixed timetable; site choice (3SITES, NEJM 2015) does more
            to reduce CRBSI than rotation. Tunnelled and dialysis catheters
            are kept under scheduled exit-site surveillance.
          </p>
        </div>
      </figure>
    </DiagramFigure>
  );
};

export default DwellTimeInfographic;

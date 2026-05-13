import { useMemo, useState } from "react";
import { withAlpha } from "@/lib/color-utils";
import { DiagramToggleBar } from "./DiagramToggleBar";
import { DiagramFigure } from "./_shared/DiagramFigure";

/**
 * Primary vs secondary antibody kinetics.
 *
 * Plots IgM and IgG titres (log scale) across two exposures:
 *   - First (naïve) — IgM dominant, slow, low affinity
 *   - Second (memory) — IgG dominant, rapid, 100–1000× higher
 *
 * Toggles let the learner compare overlay or just one exposure.
 */

const AntibodyKineticsDiagram = () => {
  const [showPrimary, setShowPrimary] = useState(true);
  const [showSecondary, setShowSecondary] = useState(true);
  const [showIgM, setShowIgM] = useState(true);
  const [showIgG, setShowIgG] = useState(true);

  // chart geometry
  const W = 700;
  const H = 280;
  const padL = 50;
  const padR = 16;
  const padT = 18;
  const padB = 42;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;

  // x-axis: 0 → 56 days, with second exposure at day 28
  const maxDay = 56;
  const reChallengeDay = 28;
  const xForDay = (d: number) => padL + (d / maxDay) * innerW;

  // y-axis: log titre 0–4 (i.e. 1 → 10⁴)
  const maxLog = 4;
  const yForLog = (l: number) => padT + (1 - l / maxLog) * innerH;

  // Curves — modelled to mirror Janeway figure 11.6
  const sample = (n: number, fn: (t: number) => number) =>
    Array.from({ length: n }, (_, i) => {
      const t = (i / (n - 1)) * maxDay;
      return { t, y: fn(t) };
    });

  // Primary IgM: rises day 5, peaks day 10–12, falls
  const primaryIgM = sample(120, (t) => {
    if (t < 4) return 0;
    if (t < 12) return 1.6 * Math.sin(((t - 4) / 8) * Math.PI * 0.5);
    if (t < 24) return 1.6 * Math.cos(((t - 12) / 12) * Math.PI * 0.5);
    return 0.05;
  });
  // Primary IgG: rises day 7, peaks day 14, plateaus low
  const primaryIgG = sample(120, (t) => {
    if (t < 7) return 0;
    if (t < 14) return 2.2 * Math.sin(((t - 7) / 7) * Math.PI * 0.5);
    if (t < reChallengeDay) return 2.2 - (t - 14) * 0.08;
    return Math.max(1.4 - (t - reChallengeDay) * 0.04, 1.0);
  });
  // Secondary IgM: small, brief
  const secondaryIgM = sample(120, (t) => {
    if (t < reChallengeDay) return 0;
    const dt = t - reChallengeDay;
    if (dt < 4) return 1.0 * Math.sin((dt / 4) * Math.PI * 0.5);
    if (dt < 14) return 1.0 * Math.cos(((dt - 4) / 10) * Math.PI * 0.5);
    return 0.05;
  });
  // Secondary IgG: explosive, peaks day 32–35, ~100× primary peak
  const secondaryIgG = sample(120, (t) => {
    if (t < reChallengeDay) return 0;
    const dt = t - reChallengeDay;
    if (dt < 5) return 3.8 * Math.sin((dt / 5) * Math.PI * 0.5);
    if (dt < 28) return 3.8 - dt * 0.04;
    return 3.0;
  });

  const buildPath = (pts: { t: number; y: number }[]) =>
    pts.map((p, i) => `${i === 0 ? "M" : "L"}${xForDay(p.t)},${yForLog(p.y)}`).join(" ");

  const igmColor = "hsl(35, 85%, 50%)";
  const igGColor = "hsl(265, 65%, 55%)";

  const yTicks = useMemo(() => [0, 1, 2, 3, 4], []);
  const xTicks = useMemo(() => [0, 7, 14, 21, 28, 35, 42, 49, 56], []);

  return (
    <DiagramFigure
      id="antibody-kinetics-diagram"
      title="Antibody kinetics"
      description="Auto-generated wrapper for the Antibody kinetics anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <div className="my-6 space-y-4">
        <div className="bg-muted/30 rounded-xl border border-border p-4">
          <DiagramToggleBar
            title="Antibody kinetics — primary vs secondary"
            subtitle="Log titre over time. Re-challenge at day 28 produces a faster, larger, IgG-dominant response."
            toggles={[
              { label: "Primary", active: showPrimary, onChange: () => setShowPrimary((s) => !s) },
              { label: "Secondary", active: showSecondary, onChange: () => setShowSecondary((s) => !s) },
              { label: "IgM", active: showIgM, onChange: () => setShowIgM((s) => !s) },
              { label: "IgG", active: showIgG, onChange: () => setShowIgG((s) => !s) },
            ]}
          />
  
          <div className="w-full overflow-x-auto">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="w-full min-w-[600px]"
              role="img"
              aria-label="Antibody titre kinetics: primary vs secondary response"
            >
              {/* Plot frame */}
              <rect x={padL} y={padT} width={innerW} height={innerH} fill="hsl(var(--background))" stroke="hsl(var(--border))" strokeWidth="1" />
  
              {/* Y gridlines + log labels */}
              {yTicks.map((l) => (
                <g key={l}>
                  <line x1={padL} y1={yForLog(l)} x2={padL + innerW} y2={yForLog(l)} stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.5" />
                  <text x={padL - 6} y={yForLog(l) + 3} textAnchor="end" className="fill-muted-foreground" style={{ fontSize: 10 }}>
                    10{l > 0 ? <tspan baselineShift="super" style={{ fontSize: 7 }}>{l}</tspan> : <tspan baselineShift="super" style={{ fontSize: 7 }}>0</tspan>}
                  </text>
                </g>
              ))}
  
              {/* X ticks */}
              {xTicks.map((d) => (
                <g key={d}>
                  <line x1={xForDay(d)} y1={padT + innerH} x2={xForDay(d)} y2={padT + innerH + 4} stroke="hsl(var(--border))" />
                  <text x={xForDay(d)} y={padT + innerH + 16} textAnchor="middle" className="fill-muted-foreground" style={{ fontSize: 10 }}>
                    {d}
                  </text>
                </g>
              ))}
  
              {/* Exposure markers */}
              <line x1={xForDay(0)} y1={padT} x2={xForDay(0)} y2={padT + innerH} stroke="hsl(var(--foreground))" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
              <text x={xForDay(0) + 4} y={padT + 12} className="fill-foreground" style={{ fontSize: 10, fontWeight: 600 }}>
                ↓ 1st exposure
              </text>
              <line x1={xForDay(reChallengeDay)} y1={padT} x2={xForDay(reChallengeDay)} y2={padT + innerH} stroke="hsl(var(--foreground))" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
              <text x={xForDay(reChallengeDay) + 4} y={padT + 12} className="fill-foreground" style={{ fontSize: 10, fontWeight: 600 }}>
                ↓ Re-challenge
              </text>
  
              {/* Curves */}
              {showPrimary && showIgM && (
                <path d={buildPath(primaryIgM)} fill="none" stroke={igmColor} strokeWidth="2" strokeDasharray="6 4" />
              )}
              {showPrimary && showIgG && (
                <path d={buildPath(primaryIgG)} fill="none" stroke={igGColor} strokeWidth="2" strokeDasharray="6 4" />
              )}
              {showSecondary && showIgM && (
                <path d={buildPath(secondaryIgM)} fill="none" stroke={igmColor} strokeWidth="2" />
              )}
              {showSecondary && showIgG && (
                <path d={buildPath(secondaryIgG)} fill="none" stroke={igGColor} strokeWidth="2" />
              )}
  
              {/* In-line annotations */}
              {showPrimary && showIgM && (
                <text x={xForDay(11)} y={yForLog(1.7) - 4} className="fill-foreground" style={{ fontSize: 10 }}>
                  IgM (primary)
                </text>
              )}
              {showPrimary && showIgG && (
                <text x={xForDay(15)} y={yForLog(2.3) - 4} style={{ fontSize: 10 }} fill={igGColor}>
                  IgG (primary)
                </text>
              )}
              {showSecondary && showIgG && (
                <text x={xForDay(34)} y={yForLog(3.85) - 4} style={{ fontSize: 10, fontWeight: 600 }} fill={igGColor}>
                  IgG (secondary) — 100–1000× higher
                </text>
              )}
  
              {/* x axis label */}
              <text x={padL + innerW / 2} y={H - 4} textAnchor="middle" className="fill-muted-foreground" style={{ fontSize: 10 }}>
                Days after first exposure
              </text>
            </svg>
          </div>
  
          {/* Legend */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <svg width="22" height="6"><line x1="0" y1="3" x2="22" y2="3" stroke={igmColor} strokeWidth="2" /></svg>
              IgM
            </span>
            <span className="inline-flex items-center gap-1.5">
              <svg width="22" height="6"><line x1="0" y1="3" x2="22" y2="3" stroke={igGColor} strokeWidth="2" /></svg>
              IgG
            </span>
            <span className="inline-flex items-center gap-1.5">
              <svg width="22" height="6"><line x1="0" y1="3" x2="22" y2="3" stroke="hsl(var(--foreground))" strokeWidth="2" strokeDasharray="6 4" /></svg>
              Primary (dashed)
            </span>
            <span className="inline-flex items-center gap-1.5">
              <svg width="22" height="6"><line x1="0" y1="3" x2="22" y2="3" stroke="hsl(var(--foreground))" strokeWidth="2" /></svg>
              Secondary (solid)
            </span>
          </div>
  
          {/* Take-home grid */}
          <div className="grid grid-cols-2 gap-2 mt-3">
            <div
              className="rounded-lg border p-3"
              style={{ borderLeftWidth: 4, borderLeftColor: igmColor, backgroundColor: withAlpha(igmColor, 0.05) }}
            >
              <p className="text-xs font-semibold text-foreground mb-1">Primary (naïve)</p>
              <ul className="text-[11px] text-muted-foreground space-y-0.5 leading-snug">
                <li>Lag 5–10 days before measurable antibody</li>
                <li>IgM dominant, low affinity, pentameric</li>
                <li>Complement: alternative / lectin (innate)</li>
                <li>Symptomatic illness — pathogen replicates</li>
              </ul>
            </div>
            <div
              className="rounded-lg border p-3"
              style={{ borderLeftWidth: 4, borderLeftColor: igGColor, backgroundColor: withAlpha(igGColor, 0.05) }}
            >
              <p className="text-xs font-semibold text-foreground mb-1">Secondary (memory)</p>
              <ul className="text-[11px] text-muted-foreground space-y-0.5 leading-snug">
                <li>Antibody within 1–3 days</li>
                <li>IgG dominant, high affinity (somatic hypermutation)</li>
                <li>Complement: classical (Ag–Ab → C1q)</li>
                <li>Often subclinical — basis of vaccination</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default AntibodyKineticsDiagram;

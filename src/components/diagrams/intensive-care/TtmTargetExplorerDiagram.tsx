import { useState } from "react";
import { withAlpha } from "@/lib/color-utils";
import { DiagramToggleBar } from "@/components/diagrams/shared/DiagramToggleBar";
import { DiagramFigure } from "./_shared/DiagramFigure";

/**
 * Targeted Temperature Management (TTM) explorer.
 *
 * Lets the learner pick one of four post-ROSC temperature strategies and shows
 * the rationale, current evidence, physiological effects and complications.
 * Includes a simple temperature curve illustrating the 24h target + 12h
 * controlled rewarm at 0.25–0.5 °C/h, with strict <37.7 °C fever control out
 * to 72h post-ROSC (per ERC/ESICM 2021 + TTM2 evidence).
 */

type Target = "33" | "36" | "normo" | "fever";

interface TargetMeta {
  label: string;
  shortLabel: string;
  temp: number; // target °C
  color: string;
  evidence: string;
  rationale: string;
  pros: string[];
  cons: string[];
  whoBenefits: string;
}

const targets: Record<Target, TargetMeta> = {
  "33": {
    label: "Hypothermia 33 °C",
    shortLabel: "33 °C",
    temp: 33,
    color: "hsl(210, 70%, 50%)",
    evidence:
      "HACA (2002) and Bernard (2002): both showed neurological benefit at 32–34 °C vs uncontrolled normothermia after VF arrest. Foundational trials — but compared with no temperature control, not modern targeted normothermia.",
    rationale:
      "Reduces cerebral metabolic rate ~6 %/°C, suppresses excitotoxic Ca²⁺/glutamate release, attenuates apoptosis, free-radical injury and BBB disruption.",
    pros: [
      "Strongest historical evidence base for shockable rhythms",
      "Robust suppression of secondary brain injury cascades",
      "Reduces seizure frequency and ICP rise",
    ],
    cons: [
      "Bradycardia, hypotension, arrhythmia",
      "Coagulopathy, platelet dysfunction, bleeding",
      "Insulin resistance, hypokalaemia (then rebound hyper-K on rewarm)",
      "Shivering — increases CMR if uncontrolled",
      "Impaired drug clearance (sedatives, NMBA accumulate)",
    ],
    whoBenefits:
      "Some centres still use 33 °C for refractory ICP, status epilepticus, or selected shockable OHCA — though TTM2 found no advantage over 36 °C / fever control.",
  },
  "36": {
    label: "Mild hypothermia 36 °C",
    shortLabel: "36 °C",
    temp: 36,
    color: "hsl(180, 55%, 45%)",
    evidence:
      "TTM trial (Nielsen 2013, n=950): no difference in survival or neurological outcome between 33 °C and 36 °C in OHCA. Established 36 °C as a reasonable, lower-complication alternative.",
    rationale:
      "Avoids spontaneous rise to febrile temperatures while limiting the haemodynamic and coagulation penalties of deeper cooling.",
    pros: [
      "Fewer arrhythmias and less haemodynamic compromise than 33 °C",
      "Easier nursing, less shivering, less sedation needed",
      "Equivalent neurological outcome to 33 °C in landmark TTM trial",
    ],
    cons: [
      "Still requires active cooling device + core temperature monitoring",
      "Mild metabolic effects (ileus, mild K⁺ shift)",
      "TTM2 questioned whether any active cooling improves on tight normothermia",
    ],
    whoBenefits:
      "A pragmatic choice when haemodynamics are precarious or bleeding risk high — but TTM2 suggests strict normothermia is non-inferior.",
  },
  normo: {
    label: "Normothermia ≤ 37.5 °C",
    shortLabel: "Normo",
    temp: 37.5,
    color: "hsl(140, 50%, 45%)",
    evidence:
      "TTM2 (Dankiewicz 2021, n=1900): 33 °C vs targeted normothermia (≤37.8 °C) showed no difference in 6-month mortality (50 vs 48 %) or poor neurological outcome (55 % both). Now the default for adult OHCA in most ICUs.",
    rationale:
      "Permissive temperature management with active intervention only above ~37.7 °C. Avoids the harms of deeper cooling while preventing fever-driven secondary brain injury.",
    pros: [
      "Largest, most contemporary RCT (TTM2) supports this approach",
      "Fewer arrhythmias, less coagulopathy than active cooling",
      "Less sedation, faster wakening, easier neuroprognostication",
      "Still requires temperature feedback device (TTM2 used active control)",
    ],
    cons: [
      "Many patients still develop fever despite passive measures — needs active surface or intravascular cooling",
      "Less protection if ROSC is delayed and severe ischaemic injury already established",
    ],
    whoBenefits:
      "Default strategy for most adult OHCA per ERC/ESICM 2021 update. Maintain ≤37.7 °C for at least 72 h post-ROSC.",
  },
  fever: {
    label: "Fever control only",
    shortLabel: "Fever Rx",
    temp: 38.5,
    color: "hsl(20, 75%, 50%)",
    evidence:
      "Pyrexia is independently associated with worse neurological outcome (every °C above 37 °C increases risk). Fever in the first 72 h after cardiac arrest doubles mortality in observational studies.",
    rationale:
      "Prevent secondary injury from hyperthermia-driven excitotoxicity, increased CMR, BBB disruption, and seizure burden.",
    pros: [
      "Pragmatic, applicable to every post-arrest patient",
      "Cheap (paracetamol, surface cooling, fans)",
      "Always indicated regardless of which TTM strategy is otherwise chosen",
    ],
    cons: [
      "Reactive only — fever is already harmful by the time you treat it",
      "Paracetamol alone is often insufficient",
      "Shivering on aggressive surface cooling without sedation",
    ],
    whoBenefits:
      "Mandatory baseline for all post-ROSC patients. Even when 33 / 36 / normothermia targets are not reached, prevent T > 37.7 °C for ≥72 h.",
  },
};

const phaseSpec = [
  { key: "induction", label: "Induction", durationH: 4, color: "hsl(210, 70%, 60%)" },
  { key: "maintenance", label: "Maintenance (24 h)", durationH: 24, color: "hsl(180, 55%, 50%)" },
  { key: "rewarm", label: "Controlled rewarm (0.25–0.5 °C/h)", durationH: 12, color: "hsl(45, 75%, 55%)" },
  { key: "fever", label: "Strict fever control (≤37.7 °C, 72 h)", durationH: 32, color: "hsl(20, 75%, 55%)" },
];

const totalH = phaseSpec.reduce((s, p) => s + p.durationH, 0); // 72 h

const TtmTargetExplorerDiagram = () => {
  const [target, setTarget] = useState<Target>("normo");
  const [showPhases, setShowPhases] = useState(true);
  const [showLabels, setShowLabels] = useState(true);

  const info = targets[target];

  // Y axis: 32–39 °C → SVG y 20–180
  const tToY = (t: number) => 180 - ((t - 32) / 7) * 160;
  // X axis: 0–72 h → SVG x 40–460
  const hToX = (h: number) => 40 + (h / totalH) * 420;

  // Build temperature curve: ROSC at h0, T~36.5; induce to target by 4h; hold 24h; rewarm to 37.0 over 12h; then strict ≤37.7 for 32h.
  const targetT = target === "fever" ? 37.0 : info.temp;
  const startT = 36.5;
  const fevercapT = 37.7;

  const induceEnd = 4;
  const maintEnd = induceEnd + 24; // 28
  const rewarmEnd = maintEnd + 12; // 40
  // fever phase to 72h

  const points: { x: number; y: number }[] = [];
  // 0..induceEnd
  for (let h = 0; h <= induceEnd; h += 0.5) {
    const t = startT + ((targetT - startT) * h) / induceEnd;
    points.push({ x: hToX(h), y: tToY(t) });
  }
  // maint
  for (let h = induceEnd + 0.5; h <= maintEnd; h += 0.5) {
    points.push({ x: hToX(h), y: tToY(targetT) });
  }
  // rewarm to 37
  for (let h = maintEnd + 0.5; h <= rewarmEnd; h += 0.5) {
    const t = targetT + ((37 - targetT) * (h - maintEnd)) / 12;
    points.push({ x: hToX(h), y: tToY(t) });
  }
  // fever control: oscillate gently around 37, capped at 37.5
  for (let h = rewarmEnd + 0.5; h <= totalH; h += 0.5) {
    const t = 37 + 0.3 * Math.sin((h - rewarmEnd) * 0.6);
    points.push({ x: hToX(h), y: tToY(Math.min(t, 37.4)) });
  }
  const path = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");

  return (
    <DiagramFigure
      id="ttm-target-explorer-diagram"
      title="Ttm target explorer"
      description="Auto-generated wrapper for the Ttm target explorer anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <div className="my-6 space-y-4">
        <div className="bg-muted/30 rounded-xl border border-border p-4">
          <DiagramToggleBar
            title="Targeted Temperature Management — pick a target"
            subtitle="Compare 33 °C, 36 °C, targeted normothermia and fever control after ROSC"
            toggles={[
              { label: "Phases", active: showPhases, onChange: () => setShowPhases((s) => !s) },
              { label: "Labels", active: showLabels, onChange: () => setShowLabels((s) => !s) },
            ]}
          />
  
          {/* Target selector */}
          <div className="flex flex-wrap gap-2 mb-3">
            {(Object.keys(targets) as Target[]).map((t) => (
              <button
                key={t}
                onClick={() => setTarget(t)}
                aria-pressed={target === t}
                className="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all"
                style={{
                  borderColor: target === t ? targets[t].color : "hsl(var(--border))",
                  backgroundColor: target === t ? targets[t].color : "transparent",
                  color: target === t ? "white" : "hsl(var(--muted-foreground))",
                }}
              >
                {targets[t].label}
              </button>
            ))}
          </div>
  
          {/* SVG curve */}
          <div className="bg-background/70 rounded-lg border border-border p-3">
            <svg viewBox="0 0 480 210" className="w-full" role="img" aria-label="Temperature vs time curve for the selected TTM strategy">
              {/* Phase backgrounds */}
              {showPhases && (() => {
                let xCursor = 0;
                return phaseSpec.map((p) => {
                  const x0 = hToX(xCursor);
                  const x1 = hToX(xCursor + p.durationH);
                  xCursor += p.durationH;
                  return (
                    <g key={p.key}>
                      <rect x={x0} y={20} width={x1 - x0} height={160} fill={p.color} fillOpacity={0.06} />
                      <line x1={x1} y1={20} x2={x1} y2={180} stroke="hsl(var(--border))" strokeWidth={0.5} strokeDasharray="2 2" />
                    </g>
                  );
                });
              })()}
  
              {/* Y axis */}
              <line x1={40} y1={20} x2={40} y2={180} stroke="hsl(var(--border))" strokeWidth={0.75} />
              {/* Temperature gridlines */}
              {[33, 34, 35, 36, 37, 38].map((t) => (
                <g key={t}>
                  <line x1={40} y1={tToY(t)} x2={460} y2={tToY(t)} stroke="hsl(var(--muted-foreground))" strokeWidth={0.5} strokeDasharray="2 3" opacity={0.4} />
                  <text x={36} y={tToY(t) + 3} fontSize={7} fill="hsl(var(--muted-foreground))" textAnchor="end">{t}°</text>
                </g>
              ))}
              {/* X axis */}
              <line x1={40} y1={180} x2={460} y2={180} stroke="hsl(var(--border))" strokeWidth={0.75} />
              {[0, 12, 24, 36, 48, 60, 72].map((h) => (
                <g key={h}>
                  <line x1={hToX(h)} y1={180} x2={hToX(h)} y2={183} stroke="hsl(var(--muted-foreground))" strokeWidth={0.5} />
                  <text x={hToX(h)} y={193} fontSize={7} fill="hsl(var(--muted-foreground))" textAnchor="middle">{h}h</text>
                </g>
              ))}
              {showLabels && (
                <>
                  <text x={250} y={205} fontSize={7} fill="hsl(var(--muted-foreground))" textAnchor="middle">Hours post-ROSC</text>
                  <text x={14} y={100} fontSize={7} fill="hsl(var(--muted-foreground))" textAnchor="middle" transform="rotate(-90 14 100)">Core temperature (°C)</text>
                </>
              )}
  
              {/* Fever cap line */}
              <line x1={40} y1={tToY(fevercapT)} x2={460} y2={tToY(fevercapT)} stroke={targets.fever.color} strokeWidth={1} strokeDasharray="4 3" opacity={0.7} />
              {showLabels && (
                <text x={455} y={tToY(fevercapT) - 3} fontSize={6.5} fill={targets.fever.color} textAnchor="end" fontWeight="600">Fever cap 37.7 °C</text>
              )}
  
              {/* Phase labels */}
              {showPhases && showLabels && (() => {
                let xCursor = 0;
                return phaseSpec.map((p) => {
                  const xMid = hToX(xCursor + p.durationH / 2);
                  xCursor += p.durationH;
                  return (
                        <text key={p.key} x={xMid} y={32} fontSize={6.5} fontWeight="600" fill={p.color} textAnchor="middle">
                      {p.label}
                    </text>
    );
                });
              })()}
  
              {/* The temperature curve */}
              <path d={path} fill="none" stroke={info.color} strokeWidth={3} strokeLinejoin="round" strokeLinecap="round" />
  
              {/* Target marker */}
              <circle cx={hToX(induceEnd + 12)} cy={tToY(targetT)} r={3.2} fill={info.color} />
              {showLabels && (
                <text x={hToX(induceEnd + 12) + 5} y={tToY(targetT) - 5} fontSize={7} fill={info.color} fontWeight="bold">
                  Target {targetT.toFixed(1)} °C
                </text>
              )}
  
              {/* ROSC marker */}
              <circle cx={hToX(0)} cy={tToY(startT)} r={3} fill="hsl(var(--foreground))" />
              {showLabels && (
                <text x={hToX(0) + 4} y={tToY(startT) - 5} fontSize={7} fill="hsl(var(--foreground))" fontWeight="bold">ROSC</text>
              )}
            </svg>
          </div>
  
          {/* Detail panel */}
          <div
            className="mt-4 p-3 rounded-lg border border-border bg-background/80 space-y-2"
            style={{ borderLeftWidth: 4, borderLeftColor: info.color }}
          >
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <p className="font-semibold text-foreground text-sm">{info.label}</p>
              <span
                className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-md font-bold"
                style={{ background: withAlpha(info.color, 0.15), color: info.color }}
              >
                Target {info.temp} °C
              </span>
            </div>
  
            <div>
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold mb-0.5">Evidence</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{info.evidence}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold mb-0.5">Rationale</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{info.rationale}</p>
            </div>
  
            <div className="grid sm:grid-cols-2 gap-2 pt-1">
              <div className="p-2 rounded border border-border/60">
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold mb-1">Pros</p>
                <ul className="text-[11px] text-foreground/85 space-y-0.5 list-disc list-inside">
                  {info.pros.map((p) => <li key={p}>{p}</li>)}
                </ul>
              </div>
              <div className="p-2 rounded border border-border/60">
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold mb-1">Cons / risks</p>
                <ul className="text-[11px] text-foreground/85 space-y-0.5 list-disc list-inside">
                  {info.cons.map((p) => <li key={p}>{p}</li>)}
                </ul>
              </div>
            </div>
  
            <div className="pt-1 border-t border-border/50">
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold mb-0.5">Who benefits</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{info.whoBenefits}</p>
            </div>
          </div>
  
          <p className="text-[11px] text-muted-foreground mt-2 italic text-center">
            Tip: TTM2 (2021) is the largest contemporary RCT — favoured normothermia ≤ 37.7 °C. ERC/ESICM 2021 endorses any target between 32 and 37.5 °C provided fever is actively prevented for ≥ 72 h.
          </p>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default TtmTargetExplorerDiagram;

import { useMemo, useState } from "react";
import { DiagramFigure } from "./_shared/DiagramFigure";

type CellType = "ventricular" | "pacemaker";

interface ChannelTrace {
  id: string;
  name: string;
  ion: string;
  direction: "inward" | "outward";
  color: string;
  description: string;
  phases: string;
  // Activation profile: array of {t, amp} where t in 0..1 (fraction of cycle), amp in 0..1
  ventricular: { t: number; amp: number }[];
  pacemaker: { t: number; amp: number }[];
}

const channels: ChannelTrace[] = [
  {
    id: "INa",
    name: "INa",
    ion: "Na⁺ ↓",
    direction: "inward",
    color: "hsl(0 70% 55%)",
    phases: "Phase 0 (ventricular)",
    description: "Voltage-gated fast Na⁺ channel (Nav1.5). Opens at threshold (~−65 mV) and inactivates within 1–2 ms — generates the rapid upstroke of phase 0 in fast-response cells. Blocked by class I antiarrhythmics and local anaesthetics. Absent functional contribution in nodal tissue (where ICa-L drives phase 0 instead).",
    ventricular: [
      { t: 0, amp: 0 }, { t: 0.005, amp: 0 }, { t: 0.01, amp: 1 },
      { t: 0.02, amp: 0.7 }, { t: 0.04, amp: 0.05 }, { t: 0.1, amp: 0 }, { t: 1, amp: 0 },
    ],
    pacemaker: [{ t: 0, amp: 0 }, { t: 1, amp: 0 }],
  },
  {
    id: "ICaL",
    name: "ICa-L",
    ion: "Ca²⁺ ↓",
    direction: "inward",
    color: "hsl(25 85% 55%)",
    phases: "Phase 2 (ventricular) · Phase 0 (nodal)",
    description: "Long-lasting (L-type) voltage-gated Ca²⁺ channel (Cav1.2). Activates at ~−40 mV, slow inactivation. In ventricle: maintains the phase-2 plateau and triggers SR Ca²⁺ release (excitation–contraction coupling). In SA/AV node: provides the upstroke of phase 0. Blocked by class IV (verapamil/diltiazem) and dihydropyridines.",
    ventricular: [
      { t: 0, amp: 0 }, { t: 0.02, amp: 0.3 }, { t: 0.05, amp: 0.85 },
      { t: 0.25, amp: 0.7 }, { t: 0.45, amp: 0.4 }, { t: 0.6, amp: 0.05 }, { t: 1, amp: 0 },
    ],
    pacemaker: [
      { t: 0, amp: 0 }, { t: 0.4, amp: 0.1 }, { t: 0.5, amp: 0.9 },
      { t: 0.6, amp: 0.7 }, { t: 0.75, amp: 0.2 }, { t: 1, amp: 0 },
    ],
  },
  {
    id: "Ito",
    name: "Ito",
    ion: "K⁺ ↑",
    direction: "outward",
    color: "hsl(45 75% 50%)",
    phases: "Phase 1",
    description: "Transient outward K⁺ current (Kv4.2/4.3). Rapidly activates and inactivates after phase 0 — produces the brief notch (phase 1) on the ventricular AP. Larger in epicardium than endocardium — contributes to transmural dispersion of repolarisation.",
    ventricular: [
      { t: 0, amp: 0 }, { t: 0.012, amp: 0.1 }, { t: 0.02, amp: 0.85 },
      { t: 0.04, amp: 0.4 }, { t: 0.08, amp: 0.05 }, { t: 1, amp: 0 },
    ],
    pacemaker: [{ t: 0, amp: 0 }, { t: 1, amp: 0 }],
  },
  {
    id: "IKr",
    name: "IKr",
    ion: "K⁺ ↑",
    direction: "outward",
    color: "hsl(195 70% 50%)",
    phases: "Phase 3 (rapid)",
    description: "Rapid delayed-rectifier K⁺ current (hERG / KCNH2). Major driver of phase-3 repolarisation. Inward rectification means peak current occurs late in the plateau. Blocked by class III drugs (sotalol, dofetilide), many non-cardiac drugs (ondansetron, methadone, macrolides) — and loss-of-function mutations cause LQT2.",
    ventricular: [
      { t: 0, amp: 0 }, { t: 0.1, amp: 0.1 }, { t: 0.3, amp: 0.4 },
      { t: 0.5, amp: 0.85 }, { t: 0.6, amp: 0.95 }, { t: 0.7, amp: 0.5 },
      { t: 0.8, amp: 0.1 }, { t: 1, amp: 0 },
    ],
    pacemaker: [
      { t: 0, amp: 0 }, { t: 0.55, amp: 0.3 }, { t: 0.7, amp: 0.85 },
      { t: 0.85, amp: 0.4 }, { t: 1, amp: 0 },
    ],
  },
  {
    id: "IKs",
    name: "IKs",
    ion: "K⁺ ↑",
    direction: "outward",
    color: "hsl(220 65% 55%)",
    phases: "Phase 3 (slow)",
    description: "Slow delayed-rectifier K⁺ current (KCNQ1 + KCNE1). Activates slowly during the plateau, reaches maximum late in phase 3. Important 'repolarisation reserve' — more critical when sympathetic tone is high (β-adrenergic enhancement). LQT1 mutations (KCNQ1) classically triggered by exercise/swimming.",
    ventricular: [
      { t: 0, amp: 0 }, { t: 0.2, amp: 0.05 }, { t: 0.4, amp: 0.25 },
      { t: 0.6, amp: 0.55 }, { t: 0.75, amp: 0.7 }, { t: 0.85, amp: 0.4 },
      { t: 0.95, amp: 0.1 }, { t: 1, amp: 0 },
    ],
    pacemaker: [{ t: 0, amp: 0 }, { t: 1, amp: 0 }],
  },
  {
    id: "IK1",
    name: "IK1",
    ion: "K⁺ ↑",
    direction: "outward",
    color: "hsl(265 55% 55%)",
    phases: "Phase 4 (resting) — ventricular",
    description: "Inward-rectifier K⁺ current (Kir2.1). Maintains the stable, hyperpolarised resting potential (~−90 mV) of ventricular myocytes by holding K⁺ permeability dominant in phase 4. Strong inward rectification means it shuts off during depolarisation. Absent in nodal cells — which is why they spontaneously depolarise.",
    ventricular: [
      { t: 0, amp: 0.85 }, { t: 0.005, amp: 0.05 }, { t: 0.7, amp: 0.05 },
      { t: 0.85, amp: 0.5 }, { t: 0.95, amp: 0.85 }, { t: 1, amp: 0.85 },
    ],
    pacemaker: [{ t: 0, amp: 0 }, { t: 1, amp: 0 }],
  },
  {
    id: "If",
    name: "If",
    ion: "Na⁺/K⁺ ↓",
    direction: "inward",
    color: "hsl(310 60% 55%)",
    phases: "Phase 4 (pacemaker)",
    description: "'Funny' current — HCN channels (HCN4 dominant). Mixed Na⁺/K⁺ inward current activated by hyperpolarisation, producing the slow diastolic depolarisation of phase 4 in nodal cells. Modulated by cAMP — β-adrenergic stimulation accelerates, ACh slows. Selectively blocked by ivabradine.",
    ventricular: [{ t: 0, amp: 0 }, { t: 1, amp: 0 }],
    pacemaker: [
      { t: 0, amp: 0.05 }, { t: 0.05, amp: 0.4 }, { t: 0.2, amp: 0.7 },
      { t: 0.35, amp: 0.85 }, { t: 0.45, amp: 0.4 }, { t: 0.55, amp: 0.05 },
      { t: 0.85, amp: 0.05 }, { t: 0.9, amp: 0.3 }, { t: 1, amp: 0.6 },
    ],
  },
];

// Build action potential path
const buildAP = (cell: CellType, w: number, h: number) => {
  const mvToY = (mv: number) => h - ((mv + 90) / 130) * h;
  if (cell === "ventricular") {
    return [
      { t: 0, mv: -90 }, { t: 0.01, mv: 30 }, { t: 0.025, mv: 10 },
      { t: 0.05, mv: 15 }, { t: 0.4, mv: 5 }, { t: 0.55, mv: -10 },
      { t: 0.7, mv: -50 }, { t: 0.78, mv: -85 }, { t: 1, mv: -90 },
    ].map((p, i) => `${i === 0 ? "M" : "L"} ${p.t * w} ${mvToY(p.mv)}`).join(" ");
  }
  // pacemaker
  return [
    { t: 0, mv: -60 }, { t: 0.4, mv: -45 }, { t: 0.5, mv: -40 },
    { t: 0.55, mv: 10 }, { t: 0.7, mv: -10 }, { t: 0.85, mv: -55 },
    { t: 0.95, mv: -62 }, { t: 1, mv: -60 },
  ].map((p, i) => `${i === 0 ? "M" : "L"} ${p.t * w} ${mvToY(p.mv)}`).join(" ");
};

// Build a smooth path for a current trace given control points
const buildTrace = (points: { t: number; amp: number }[], w: number, h: number, direction: "inward" | "outward") => {
  if (points.length < 2) return "";
  const baseY = h / 2;
  const yFor = (amp: number) =>
    direction === "outward" ? baseY - amp * (h / 2 - 2) : baseY + amp * (h / 2 - 2);
  let d = `M 0 ${baseY}`;
  points.forEach((p) => {
    d += ` L ${p.t * w} ${yFor(p.amp)}`;
  });
  d += ` L ${w} ${baseY}`;
  return d;
};

const phaseRegions: Record<CellType, { id: string; t0: number; t1: number; label: string; color: string }[]> = {
  ventricular: [
    { id: "0", t0: 0, t1: 0.012, label: "0", color: "hsl(0 60% 55%)" },
    { id: "1", t0: 0.012, t1: 0.04, label: "1", color: "hsl(45 60% 50%)" },
    { id: "2", t0: 0.04, t1: 0.5, label: "2", color: "hsl(25 70% 55%)" },
    { id: "3", t0: 0.5, t1: 0.78, label: "3", color: "hsl(195 60% 50%)" },
    { id: "4", t0: 0.78, t1: 1, label: "4", color: "hsl(265 55% 55%)" },
  ],
  pacemaker: [
    { id: "4", t0: 0, t1: 0.5, label: "4 (pacemaker)", color: "hsl(310 55% 55%)" },
    { id: "0", t0: 0.5, t1: 0.6, label: "0", color: "hsl(25 80% 55%)" },
    { id: "3", t0: 0.6, t1: 0.95, label: "3", color: "hsl(195 60% 50%)" },
  ],
};

export const IonChannelTimelineDiagram = () => {
  const [cell, setCell] = useState<CellType>("ventricular");
  const [hover, setHover] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>("INa");

  const W = 600;
  const apH = 90;
  const traceH = 40;

  const visibleChannels = useMemo(
    () => channels.filter((c) => (cell === "ventricular" ? c.ventricular.length > 2 : c.pacemaker.length > 2)),
    [cell]
  );

  const apPath = useMemo(() => buildAP(cell, W, apH), [cell]);
  const phases = phaseRegions[cell];
  const activeChannel = channels.find((c) => c.id === (hover || selected));
  const totalDuration = cell === "ventricular" ? 350 : 800; // ms (one cycle)

  return (
    <DiagramFigure
      id="ion-channel-timeline-diagram"
      title="Ion channel timeline"
      description="Auto-generated wrapper for the Ion channel timeline anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
          <div className="space-y-4">
        {/* Cell type toggle */}
        <div className="flex flex-wrap gap-2">
          {([
            { id: "ventricular", label: "Ventricular myocyte (fast)" },
            { id: "pacemaker", label: "SA node pacemaker (slow)" },
          ] as { id: CellType; label: string }[]).map((c) => (
            <button
              key={c.id}
              onClick={() => setCell(c.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                cell === c.id
                  ? "bg-primary/15 border-primary/50 text-primary"
                  : "bg-secondary/50 border-border text-muted-foreground hover:bg-secondary"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
  
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Stacked trace plot */}
          <div className="lg:col-span-3 rounded-lg border border-border bg-card p-3 overflow-x-auto">
            <svg
              viewBox={`0 0 ${W + 70} ${apH + visibleChannels.length * (traceH + 4) + 40}`}
              className="w-full min-w-[480px]"
              role="img"
              aria-label="Ion channel timeline"
            >
              {/* Phase backgrounds (full height) */}
              {phases.map((p) => (
                <rect
                  key={p.id}
                  x={50 + p.t0 * W}
                  y={0}
                  width={(p.t1 - p.t0) * W}
                  height={apH + visibleChannels.length * (traceH + 4) + 8}
                  fill={p.color}
                  opacity={hover || selected ? 0.04 : 0.06}
                />
              ))}
  
              {/* Phase divider lines */}
              {phases.slice(1).map((p) => (
                <line
                  key={`div-${p.id}`}
                  x1={50 + p.t0 * W}
                  y1={0}
                  x2={50 + p.t0 * W}
                  y2={apH + visibleChannels.length * (traceH + 4) + 8}
                  stroke="hsl(var(--border))"
                  strokeDasharray="2 3"
                  strokeWidth="0.5"
                  opacity="0.6"
                />
              ))}
  
              {/* AP plot */}
              <g transform={`translate(50, 0)`}>
                <text x="-4" y="10" fontSize="8" fill="hsl(var(--muted-foreground))" textAnchor="end" fontWeight="600">+30</text>
                <text x="-4" y={apH / 2 + 3} fontSize="8" fill="hsl(var(--muted-foreground))" textAnchor="end">−30</text>
                <text x="-4" y={apH - 2} fontSize="8" fill="hsl(var(--muted-foreground))" textAnchor="end">−90</text>
                <line x1="0" y1={apH - ((0 + 90) / 130) * apH} x2={W} y2={apH - ((0 + 90) / 130) * apH}
                  stroke="hsl(var(--border))" strokeDasharray="1 3" strokeWidth="0.5" opacity="0.5" />
                <path d={apPath} fill="none" stroke="hsl(var(--foreground))" strokeWidth="2" />
                {/* Phase labels on AP */}
                {phases.map((p) => (
                  <text
                    key={`pl-${p.id}`}
                    x={(p.t0 + (p.t1 - p.t0) / 2) * W}
                    y={12}
                    fontSize="9"
                    fill={p.color}
                    textAnchor="middle"
                    fontWeight="700"
                  >
                    {p.label}
                  </text>
                ))}
              </g>
  
              {/* Channel traces */}
              {visibleChannels.map((ch, idx) => {
                const y0 = apH + 8 + idx * (traceH + 4);
                const points = cell === "ventricular" ? ch.ventricular : ch.pacemaker;
                const isActive = activeChannel?.id === ch.id;
                const isDimmed = (hover || selected) && !isActive;
                return (
                      <g
                    key={ch.id}
                    transform={`translate(50, ${y0})`}
                    className="cursor-pointer"
                    onMouseEnter={() => setHover(ch.id)}
                    onMouseLeave={() => setHover(null)}
                    onClick={() => setSelected(ch.id)}
                    opacity={isDimmed ? 0.35 : 1}
                  >
                    {/* Lane background */}
                    <rect x="0" y="0" width={W} height={traceH} fill={isActive ? ch.color : "hsl(var(--muted))"} opacity={isActive ? 0.08 : 0.15} rx="2" />
                    {/* Zero line */}
                    <line x1="0" y1={traceH / 2} x2={W} y2={traceH / 2} stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="2 2" />
                    {/* Trace */}
                    <path
                      d={buildTrace(points, W, traceH, ch.direction)}
                      fill={ch.color}
                      fillOpacity={isActive ? 0.55 : 0.3}
                      stroke={ch.color}
                      strokeWidth={isActive ? 1.6 : 1}
                    />
                    {/* Label (left) */}
                    <g transform={`translate(-46, ${traceH / 2})`}>
                      <text x="0" y="-2" fontSize="9" fill={ch.color} fontWeight="700">{ch.name}</text>
                      <text x="0" y="9" fontSize="7" fill="hsl(var(--muted-foreground))">{ch.ion}</text>
                    </g>
                    {/* Direction arrow (right) */}
                    <g transform={`translate(${W + 4}, ${traceH / 2})`}>
                      <text x="0" y="3" fontSize="9" fill={ch.color} fontWeight="700">
                        {ch.direction === "inward" ? "↓" : "↑"}
                      </text>
                    </g>
                  </g>
    );
              })}
  
              {/* Time axis */}
              <g transform={`translate(50, ${apH + 8 + visibleChannels.length * (traceH + 4) + 4})`}>
                <line x1="0" y1="0" x2={W} y2="0" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" />
                {[0, 0.25, 0.5, 0.75, 1].map((f) => (
                  <g key={f}>
                    <line x1={f * W} y1="0" x2={f * W} y2="3" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" />
                    <text x={f * W} y="12" fontSize="7" fill="hsl(var(--muted-foreground))" textAnchor="middle">
                      {Math.round(f * totalDuration)}
                    </text>
                  </g>
                ))}
                <text x={W / 2} y="24" fontSize="8" fill="hsl(var(--muted-foreground))" textAnchor="middle">time (ms)</text>
              </g>
            </svg>
            <p className="text-[10px] text-muted-foreground text-center mt-1">
              Hover or click any current trace to highlight. ↓ = inward, ↑ = outward.
            </p>
          </div>
  
          {/* Channel detail panel */}
          <div className="lg:col-span-2 space-y-3">
            {activeChannel ? (
              <>
                <div className="rounded-lg border-2 p-3" style={{ borderColor: activeChannel.color, backgroundColor: `${activeChannel.color}15` }}>
                  <div className="flex items-baseline justify-between mb-1">
                    <p className="text-base font-bold" style={{ color: activeChannel.color }}>{activeChannel.name}</p>
                    <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                      {activeChannel.direction} · {activeChannel.ion}
                    </span>
                  </div>
                  <p className="text-[11px] uppercase tracking-wide text-muted-foreground font-semibold">Active during</p>
                  <p className="text-xs text-foreground/90 font-medium mb-2">{activeChannel.phases}</p>
                  <p className="text-xs text-foreground/85 leading-relaxed">{activeChannel.description}</p>
                </div>
              </>
            ) : (
              <div className="rounded-lg border border-border bg-card p-3">
                <p className="text-xs text-muted-foreground">Hover or tap any channel trace to see its detail.</p>
              </div>
            )}
  
            {/* Quick legend */}
            <div className="rounded-lg border border-border bg-card p-3">
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold mb-2">Phase colour key</p>
              <div className="flex flex-wrap gap-2">
                {phases.map((p) => (
                  <div key={p.id} className="flex items-center gap-1.5 text-[11px]">
                    <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: p.color, opacity: 0.5 }} />
                    <span className="text-foreground/80">Phase {p.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default IonChannelTimelineDiagram;

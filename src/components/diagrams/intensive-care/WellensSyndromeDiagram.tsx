import { useState } from "react";
import { withAlpha } from "@/lib/color-utils";
import { DiagramToggleBar } from "@/components/diagrams/shared/DiagramToggleBar";
import { DiagramFigure } from "./_shared/DiagramFigure";

/**
 * Wellens syndrome — pattern A (biphasic) vs pattern B (deeply inverted)
 * precordial T waves in the pain-free interval after unstable angina.
 * Renders a 12-lead schematic with the characteristic T-wave morphology
 * concentrated in V2–V3 (and often spilling into V1, V4) while the
 * remaining leads stay normal.
 *
 * Sibling to TwelveLeadEcgDiagram.tsx — uses the same 3×4 lead grid
 * language and stylised P–QRS–T paths so the visual feels consistent
 * across the ECG topic.
 */

type Pattern = "A" | "B";

const PATTERN_META: Record<Pattern, { label: string; short: string; color: string; prevalence: string; description: string }> = {
  A: {
    label: "Pattern A — biphasic T waves",
    short: "Pattern A",
    color: "hsl(280, 60%, 50%)",
    prevalence: "≈ 25% of cases",
    description:
      "T wave starts positive, then dips sharply negative — biphasic 'positive-then-negative' deflection. Best seen in V2–V3, often subtle so easily missed on a quick eyeball.",
  },
  B: {
    label: "Pattern B — deep symmetric T inversion",
    short: "Pattern B",
    color: "hsl(0, 65%, 50%)",
    prevalence: "≈ 75% of cases",
    description:
      "Deeply (≥ 2 mm) and symmetrically inverted T waves in V2–V3, often extending into V1 and V4. Striking when seen, but classically the patient is now pain-free which falsely reassures the team.",
  },
};

interface LeadDef {
  id: string;
  col: number;
  row: number;
  /** Whether this lead carries the Wellens T-wave change. */
  affected: "primary" | "spillover" | "none";
}

const LEADS: LeadDef[] = [
  { id: "I",   col: 0, row: 0, affected: "none" },
  { id: "aVR", col: 1, row: 0, affected: "none" },
  { id: "V1",  col: 2, row: 0, affected: "spillover" },
  { id: "V4",  col: 3, row: 0, affected: "spillover" },
  { id: "II",  col: 0, row: 1, affected: "none" },
  { id: "aVL", col: 1, row: 1, affected: "none" },
  { id: "V2",  col: 2, row: 1, affected: "primary" },
  { id: "V5",  col: 3, row: 1, affected: "none" },
  { id: "III", col: 0, row: 2, affected: "none" },
  { id: "aVF", col: 1, row: 2, affected: "none" },
  { id: "V3",  col: 2, row: 2, affected: "primary" },
  { id: "V6",  col: 3, row: 2, affected: "none" },
];

/* ─────────── Stylised QRS-T path generators ─────────── */

const baselinePath = (x0: number, y0: number) =>
  // Small P, narrow QRS, normal upright T
  `M ${x0} ${y0} l 4 0 q 2 -3 4 0 l 3 0 l 1 2 l 2 -10 l 2 14 l 2 -6 l 3 0 q 4 -5 8 0 l 4 0`;

const wellensAPath = (x0: number, y0: number) =>
  // Small P, narrow QRS, biphasic T (up then deep down)
  `M ${x0} ${y0} l 4 0 q 2 -3 4 0 l 3 0 l 1 2 l 2 -10 l 2 14 l 2 -6 l 3 0 q 3 -7 6 0 q 3 12 6 0 l 3 0`;

const wellensBPath = (x0: number, y0: number) =>
  // Small P, narrow QRS, deep symmetric inverted T
  `M ${x0} ${y0} l 4 0 q 2 -3 4 0 l 3 0 l 1 2 l 2 -10 l 2 14 l 2 -6 l 3 0 q 6 14 12 0 l 3 0`;

const Lead = ({
  lead,
  pattern,
  patternColor,
  showLabels,
}: {
  lead: LeadDef;
  pattern: Pattern;
  patternColor: string;
  showLabels: boolean;
}) => {
  const W = 110;
  const H = 60;
  const baseline = 38;

  const isAffected = lead.affected !== "none";
  const isPrimary = lead.affected === "primary";

  const path =
    lead.affected === "none"
      ? baselinePath(8, baseline)
      : pattern === "A"
      ? wellensAPath(8, baseline)
      : wellensBPath(8, baseline);

  const traceColor = isPrimary
    ? patternColor
    : isAffected
    ? withAlpha(patternColor, 0.7)
    : "hsl(var(--foreground))";

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-auto"
      role="img"
      aria-label={`Lead ${lead.id} — ${isAffected ? `${pattern === "A" ? "biphasic" : "inverted"} T wave` : "normal"}`}
    >
      <defs>
        <pattern id={`wellens-grid-${lead.id}-${pattern}`} width="5" height="5" patternUnits="userSpaceOnUse">
          <path d="M 5 0 L 0 0 0 5" fill="none" stroke={isAffected ? patternColor : "hsl(var(--muted-foreground))"} strokeOpacity={isAffected ? 0.18 : 0.1} strokeWidth="0.5" />
        </pattern>
      </defs>

      <rect
        x="0.5"
        y="0.5"
        width={W - 1}
        height={H - 1}
        rx="3"
        fill={isAffected ? withAlpha(patternColor, 0.06) : "hsl(var(--background))"}
        stroke={isPrimary ? patternColor : isAffected ? withAlpha(patternColor, 0.5) : "hsl(var(--border))"}
        strokeWidth={isPrimary ? 1.2 : 0.6}
      />
      <rect x="0.5" y="0.5" width={W - 1} height={H - 1} rx="3" fill={`url(#wellens-grid-${lead.id}-${pattern})`} pointerEvents="none" />

      {/* Baseline */}
      <line x1="4" y1={baseline} x2={W - 4} y2={baseline} stroke="hsl(var(--muted-foreground))" strokeOpacity="0.35" strokeWidth="0.5" />

      {/* Trace */}
      <path d={path} fill="none" stroke={traceColor} strokeWidth={isAffected ? 1.6 : 1.2} strokeLinecap="round" strokeLinejoin="round" />

      {/* Lead label */}
      <text x={5} y={11} fontSize="9" fontWeight="bold" fill={isAffected ? patternColor : "hsl(var(--foreground))"}>
        {lead.id}
      </text>

      {/* Annotation */}
      {showLabels && isPrimary && (
        <text x={W - 4} y={11} textAnchor="end" fontSize="7" fill={patternColor} fontWeight="bold">
          {pattern === "A" ? "biphasic T" : "deep T inv"}
        </text>
      )}
      {showLabels && lead.affected === "spillover" && (
        <text x={W - 4} y={11} textAnchor="end" fontSize="6.5" fill={withAlpha(patternColor, 0.85)} fontStyle="italic">
          spillover
        </text>
      )}
    </svg>
  );
};

const WellensSyndromeDiagram = () => {
  const [pattern, setPattern] = useState<Pattern>("B");
  const [showLabels, setShowLabels] = useState(true);

  const meta = PATTERN_META[pattern];

  return (
    <DiagramFigure
      id="wellens-syndrome-diagram"
      title="Wellens syndrome"
      description="Auto-generated wrapper for the Wellens syndrome anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
                  <div className="my-6 space-y-4">
        <div className="bg-muted/30 rounded-xl border border-border p-4">
          <DiagramToggleBar
            title="Wellens syndrome — pattern A vs pattern B on the 12-lead"
            subtitle="LAD-territory T-wave changes recorded in the pain-free interval. Toggle between the two morphologies."
            toggles={[
              { label: "Pattern A (biphasic)", active: pattern === "A", onChange: () => setPattern("A") },
              { label: "Pattern B (deep inv)", active: pattern === "B", onChange: () => setPattern("B") },
              { label: "Labels", active: showLabels, onChange: () => setShowLabels((s) => !s) },
            ]}
          />
  
          {/* Active pattern badge */}
          <div className="flex items-center justify-between gap-2 flex-wrap mb-3">
            <div className="flex items-center gap-2 min-w-0">
              <span
                className="text-[10px] uppercase tracking-wide font-bold px-2 py-1 rounded"
                style={{ background: withAlpha(meta.color, 0.15), color: meta.color }}
              >
                {meta.short}
              </span>
              <p className="text-xs text-muted-foreground truncate">{meta.prevalence}</p>
            </div>
            <p className="text-[11px] text-muted-foreground italic">Pain-free at time of ECG · troponin often normal</p>
          </div>
  
          {/* 12-lead grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {LEADS.map((lead) => (
              <Lead key={lead.id} lead={lead} pattern={pattern} patternColor={meta.color} showLabels={showLabels} />
            ))}
          </div>
  
          {/* Pattern explanation */}
          <div
            className="mt-4 p-3 rounded-lg border border-border bg-background/80 space-y-1.5"
            style={{ borderLeftWidth: 4, borderLeftColor: meta.color }}
          >
            <p className="font-semibold text-foreground text-sm">{meta.label}</p>
            <p className="text-xs text-muted-foreground leading-snug">{meta.description}</p>
          </div>
  
          {/* Diagnostic criteria */}
          <div className="mt-3 grid sm:grid-cols-2 gap-2">
            <div className="p-3 rounded-lg border border-border bg-background/60">
              <p className="font-semibold text-foreground text-xs mb-1">Diagnostic criteria (de Zwaan)</p>
              <ul className="text-[11px] text-muted-foreground space-y-0.5 leading-snug">
                <li>· History of recent angina (now pain-free)</li>
                <li>· Biphasic or deeply inverted T waves in V2–V3 (± V1, V4)</li>
                <li>· Isoelectric or minimally elevated ST (&lt; 1 mm)</li>
                <li>· No precordial Q waves, preserved R-wave progression</li>
                <li>· Normal or only mildly elevated troponin</li>
              </ul>
            </div>
            <div className="p-3 rounded-lg border border-border bg-background/60">
              <p className="font-semibold text-foreground text-xs mb-1">Why it matters</p>
              <ul className="text-[11px] text-muted-foreground space-y-0.5 leading-snug">
                <li>· Critical proximal LAD stenosis — high risk of large anterior MI within days</li>
                <li>· <span className="font-medium text-foreground">Do not stress test</span> — provoked ischaemia can precipitate infarct</li>
                <li>· Refer for early invasive coronary angiography ± PCI</li>
                <li>· T-wave changes typically resolve once the lesion is revascularised</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default WellensSyndromeDiagram;

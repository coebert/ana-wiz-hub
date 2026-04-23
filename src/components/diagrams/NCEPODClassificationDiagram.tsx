import { AnimatedMechanism, AnimatedMechanismStep } from "./AnimatedMechanism";

/**
 * NCEPOD urgency classification visualised as a triage clock.
 * Walks through Categories 1 → 4 (Immediate, Urgent, Expedited, Elective)
 * highlighting the active tier on a stylised clock dial.
 */

type Tier = {
  cat: 1 | 2 | 3 | 4;
  label: string;
  window: string;
  color: string; // semantic token reference
  examples: string;
  startAngle: number; // degrees on dial
  endAngle: number;
};

const TIERS: Tier[] = [
  {
    cat: 1,
    label: "Immediate",
    window: "Minutes",
    color: "hsl(var(--destructive))",
    examples: "Ruptured AAA, ruptured ectopic, airway obstruction, intracranial haematoma with coning",
    startAngle: -90,
    endAngle: 0,
  },
  {
    cat: 2,
    label: "Urgent",
    window: "Within hours",
    color: "hsl(var(--clinical))",
    examples: "Perforated viscus, compound fracture, septic source control, bowel obstruction",
    startAngle: 0,
    endAngle: 90,
  },
  {
    cat: 3,
    label: "Expedited",
    window: "Within days",
    color: "hsl(var(--icu))",
    examples: "Acute appendicitis, open #, tendon repair, stable cholecystitis",
    startAngle: 90,
    endAngle: 180,
  },
  {
    cat: 4,
    label: "Elective",
    window: "Planned",
    color: "hsl(var(--accent))",
    examples: "Booked procedure timed to suit patient and hospital — full optimisation",
    startAngle: 180,
    endAngle: 270,
  },
];

const polar = (cx: number, cy: number, r: number, deg: number) => {
  const rad = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
};

const arcPath = (cx: number, cy: number, r: number, start: number, end: number) => {
  const s = polar(cx, cy, r, start);
  const e = polar(cx, cy, r, end);
  const large = end - start <= 180 ? 0 : 1;
  return `M ${cx} ${cy} L ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y} Z`;
};

const TIER_SOURCES: Record<1 | 2 | 3 | 4, { label: string }[]> = {
  1: [{ label: "NCEPOD Knowing the Risk" }, { label: "RCoA Emergency Laparotomy" }],
  2: [{ label: "NCEPOD Knowing the Risk" }, { label: "NELA Year 9 Report" }],
  3: [{ label: "NCEPOD Knowing the Risk" }, { label: "AAGBI Pre-op 2010" }],
  4: [{ label: "AAGBI Pre-op 2010" }, { label: "RCoA Emergency Laparotomy" }],
};

const STEPS: AnimatedMechanismStep[] = TIERS.map((t) => ({
  label: `Cat ${t.cat} — ${t.label}`,
  detail: (
    <>
      <strong>Target window:</strong> {t.window}.{" "}
      {t.cat === 1
        ? "Resuscitation is simultaneous with surgery — haemorrhage control IS the resuscitation."
        : t.cat === 2
        ? "Time-critical but allows brief optimisation: airway, IV access, blood products, ABG."
        : t.cat === 3
        ? "Allows fasting, optimisation of comorbidities and consent — but should not be repeatedly bumped."
        : "Full preoperative assessment, prehab, optimisation of all comorbidities."}
    </>
  ),
  callout: <><strong>Examples:</strong> {t.examples}</>,
  durationMs: 2800,
  sources: TIER_SOURCES[t.cat],
}));

export const NCEPODClassificationDiagram = () => {
  return (
    <AnimatedMechanism
      title="NCEPOD classification — urgency triage"
      subtitle="The clock dictates the workup. Categories 1–4 set the timeline from decision to knife-to-skin."
      steps={STEPS}
      accentClass="border-clinical/40"
      renderScene={(active) => {
        const cx = 180;
        const cy = 180;
        const r = 140;
        return (
          <svg
            viewBox="0 0 360 360"
            role="img"
            aria-label="NCEPOD classification clock — four urgency categories"
            className="w-full max-w-[420px] mx-auto"
          >
            {/* Backdrop */}
            <defs>
              <radialGradient id="ncpd-bg" cx="50%" cy="50%" r="60%">
                <stop offset="0%" stopColor="hsl(var(--muted))" stopOpacity="0.6" />
                <stop offset="100%" stopColor="hsl(var(--background))" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="360" height="360" fill="url(#ncpd-bg)" />

            {/* Tier wedges */}
            {TIERS.map((t, i) => {
              const isActive = i === active;
              return (
                <g key={t.cat}>
                  <path
                    d={arcPath(cx, cy, r, t.startAngle, t.endAngle)}
                    fill={t.color}
                    fillOpacity={isActive ? 0.85 : 0.18}
                    stroke={t.color}
                    strokeWidth={isActive ? 2 : 1}
                    style={{ transition: "fill-opacity 400ms ease, stroke-width 400ms ease" }}
                  />
                  {(() => {
                    const mid = (t.startAngle + t.endAngle) / 2;
                    const labelPos = polar(cx, cy, r * 0.62, mid);
                    return (
                      <text
                        x={labelPos.x}
                        y={labelPos.y}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize="13"
                        fontWeight={isActive ? 700 : 500}
                        fill={isActive ? "hsl(var(--background))" : "hsl(var(--foreground))"}
                        style={{ transition: "fill 400ms ease" }}
                      >
                        Cat {t.cat}
                      </text>
                    );
                  })()}
                </g>
              );
            })}

            {/* Centre hub */}
            <circle cx={cx} cy={cy} r={28} fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth={1.5} />
            <text
              x={cx}
              y={cy - 4}
              textAnchor="middle"
              fontSize="9"
              fill="hsl(var(--muted-foreground))"
            >
              NCEPOD
            </text>
            <text
              x={cx}
              y={cy + 8}
              textAnchor="middle"
              fontSize="11"
              fontWeight={700}
              fill="hsl(var(--foreground))"
            >
              {TIERS[active]?.window}
            </text>

            {/* Pointer */}
            {(() => {
              const t = TIERS[active];
              const mid = (t.startAngle + t.endAngle) / 2;
              const tip = polar(cx, cy, r - 8, mid);
              return (
                <line
                  x1={cx}
                  y1={cy}
                  x2={tip.x}
                  y2={tip.y}
                  stroke="hsl(var(--foreground))"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  style={{ transition: "all 500ms cubic-bezier(0.4,0,0.2,1)" }}
                />
              );
            })()}
          </svg>
        );
      }}
    />
  );
};

export default NCEPODClassificationDiagram;

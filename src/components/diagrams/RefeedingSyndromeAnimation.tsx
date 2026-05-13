import { useState } from "react";
import { AnimatedMechanism, AnimatedMechanismStep } from "./AnimatedMechanism";
import LabGlossaryPopover from "@/components/LabGlossaryPopover";
import type { LabKey as SharedLabKey, SourceLink } from "@/lib/lab-glossary";
import { DiagramFigure } from "./_shared/DiagramFigure";

/**
 * Refeeding syndrome — pathophysiology animation.
 *
 * Walks the learner from prolonged starvation through the insulin surge,
 * intracellular electrolyte shift, thiamine depletion, and the resulting
 * cardiac / neurological / respiratory sequelae. Designed for the
 * ICU Nutrition topic.
 */
const STEPS: AnimatedMechanismStep[] = [
  {
    label: "Starvation",
    detail: (
      <>
        After ~5 days of negligible intake the body switches from glycolysis to{" "}
        <strong>lipolysis &amp; ketogenesis</strong>. Insulin falls, glucagon
        rises. Total-body K⁺, PO₄³⁻ and Mg²⁺ are <em>depleted</em> (lost in
        urine, shifted out of cells) but serum levels often look{" "}
        <em>normal</em> because the intracellular pool is collapsing in
        parallel. Thiamine (B₁) stores last only 2–3 weeks.
      </>
    ),
    callout: (
      <>
        Pre-feed serum K⁺ / PO₄ / Mg²⁺ <strong>under-estimate</strong> the
        deficit — replace empirically before feeding starts.
      </>
    ),
  },
  {
    label: "Carb load",
    detail: (
      <>
        Carbohydrate (enteral, parenteral or IV dextrose) hits a
        carbohydrate-naïve metabolism. Glucose floods the portal circulation,
        β-cells respond with a <strong>large insulin surge</strong> — the
        single trigger of the entire syndrome.
      </>
    ),
    callout: (
      <>
        Even 5% dextrose maintenance fluid can precipitate refeeding in
        extreme-risk patients (BMI &lt; 14, &gt; 15 d nil intake).
      </>
    ),
  },
  {
    label: "Insulin surge",
    detail: (
      <>
        Insulin drives <strong>K⁺, PO₄³⁻ and Mg²⁺ into cells</strong> alongside
        glucose to fuel renewed glycolysis and ATP synthesis. Phosphate is
        consumed making 2,3-DPG and ATP; magnesium is a co-factor for Na⁺/K⁺
        ATPase. Sodium and water are retained → <strong>fluid overload</strong>.
      </>
    ),
    callout: (
      <>
        Hallmark biochemistry: <strong>↓PO₄³⁻ (&lt; 0.5 mmol/L)</strong>, ↓K⁺,
        ↓Mg²⁺, often with hyperglycaemia.
      </>
    ),
  },
  {
    label: "Thiamine depletion",
    detail: (
      <>
        Thiamine (vitamin B₁) is the cofactor for{" "}
        <strong>pyruvate dehydrogenase</strong> and transketolase. Sudden
        carbohydrate metabolism consumes the last reserves → pyruvate cannot
        enter the TCA cycle → <strong>lactic acidosis</strong> and{" "}
        <strong>Wernicke's encephalopathy</strong> (ophthalmoplegia, ataxia,
        confusion).
      </>
    ),
    callout: (
      <>
        Give <strong>IV thiamine 200–300 mg before</strong> the first
        carbohydrate, then daily for 3–10 days. Cheap, safe, mandatory.
      </>
    ),
  },
  {
    label: "Clinical sequelae",
    detail: (
      <>
        End-organ effects of the electrolyte shift:
        <ul className="mt-2 space-y-1 list-disc list-inside">
          <li>
            <strong>Cardiac</strong>: arrhythmia, QT prolongation, cardiac
            failure, sudden death (↓PO₄ ↓K⁺ ↓Mg²⁺ + fluid overload).
          </li>
          <li>
            <strong>Respiratory</strong>: diaphragmatic weakness, failure to
            wean (ATP-depleted muscle).
          </li>
          <li>
            <strong>Neuro</strong>: Wernicke's, seizures, paraesthesia,
            rhabdomyolysis.
          </li>
          <li>
            <strong>Haem</strong>: haemolysis, leucocyte dysfunction (↓2,3-DPG,
            ↓ATP in RBCs).
          </li>
        </ul>
      </>
    ),
    callout: (
      <>
        Prevention: start <strong>10 kcal/kg/day</strong> (5 if extreme),
        replace electrolytes <em>during</em> feeding, daily U&amp;E + PO₄ + Mg
        for the first week, cardiac monitoring days 3–7.
      </>
    ),
  },
];

/**
 * Visual scene — five-row cascade. The active row brightens; arrows between
 * rows light up as the cascade progresses. A small "serum vs intracellular"
 * compartment bar on the right shows the electrolyte shift.
 */
const RefeedingScene = ({ active }: { active: number }) => {
  const rows = [
    { label: "Starvation", sub: "Catabolism · ↓insulin · depleted K⁺/PO₄/Mg²⁺", token: "muted-foreground" },
    { label: "Carbohydrate load", sub: "Feed / dextrose introduced", token: "clinical" },
    { label: "Insulin surge", sub: "K⁺ · PO₄³⁻ · Mg²⁺ → intracellular", token: "pharmacology" },
    { label: "Thiamine consumed", sub: "PDH cofactor exhausted → lactate", token: "physiology" },
    { label: "Sequelae", sub: "Arrhythmia · Wernicke · resp failure", token: "destructive" },
  ];

  const [showThiamineTip, setShowThiamineTip] = useState(false);

  // Compartment shift — extracellular bar shrinks, intracellular bar grows
  // once the insulin step is reached.
  const shifted = active >= 2;
  const extraPct = shifted ? 35 : 80;
  const intraPct = shifted ? 95 : 60;

  return (
    <div className="w-full">
      <svg
        viewBox="0 0 380 280"
        className="w-full h-auto overflow-visible"
        role="img"
        aria-label="Refeeding syndrome cascade — five-step pathophysiology"
      >
        <defs>
          <linearGradient id="rfs-bg" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--card))" />
            <stop offset="100%" stopColor="hsl(var(--muted) / 0.4)" />
          </linearGradient>
          <marker
            id="rfs-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M0,0 L10,5 L0,10 z" fill="hsl(var(--foreground))" />
          </marker>
        </defs>

        <rect width="380" height="280" fill="url(#rfs-bg)" rx="6" />

        {/* Cascade rows — left column */}
        {rows.map((r, i) => {
          const isActive = i === active;
          const isDone = i < active;
          const y = 12 + i * 50;
          return (
            <g
              key={r.label}
              transform={`translate(12, ${y})`}
              opacity={isActive || isDone ? 1 : 0.35}
              className="transition-opacity duration-500"
            >
              <rect
                width="220"
                height="40"
                rx="6"
                fill={
                  isActive
                    ? `hsl(var(--${r.token}) / 0.18)`
                    : "hsl(var(--card))"
                }
                stroke={
                  isActive
                    ? `hsl(var(--${r.token}))`
                    : "hsl(var(--border))"
                }
                strokeWidth={isActive ? 2 : 1}
              />
              <circle
                cx="16"
                cy="20"
                r="10"
                fill={
                  isActive || isDone
                    ? `hsl(var(--${r.token}))`
                    : "hsl(var(--muted))"
                }
              />
              <text
                x="16"
                y="24"
                textAnchor="middle"
                className="text-[10px] font-bold"
                fill={
                  isActive || isDone
                    ? "hsl(var(--background))"
                    : "hsl(var(--muted-foreground))"
                }
              >
                {i + 1}
              </text>
              <text
                x="32"
                y="17"
                className="text-[11px] font-semibold"
                fill="hsl(var(--foreground))"
              >
                {r.label}
              </text>
              <text
                x="32"
                y="30"
                className="text-[9px]"
                fill="hsl(var(--muted-foreground))"
              >
                {r.sub}
              </text>
            </g>
          );
        })}

        {/* Connecting arrows between rows */}
        {rows.slice(0, -1).map((_, i) => {
          const lit = active > i;
          const y = 52 + i * 50;
          return (
            <line
              key={`arrow-${i}`}
              x1="122"
              x2="122"
              y1={y}
              y2={y + 12}
              stroke={lit ? "hsl(var(--foreground))" : "hsl(var(--border))"}
              strokeWidth={lit ? 2 : 1}
              markerEnd="url(#rfs-arrow)"
              className="transition-colors duration-500"
            />
          );
        })}

        {/* Right-hand compartment panel — extracellular vs intracellular */}
        <g transform="translate(250, 12)">
          <text
            x="0"
            y="10"
            className="text-[10px] font-semibold"
            fill="hsl(var(--foreground))"
          >
            K⁺ · PO₄³⁻ · Mg²⁺
          </text>

          {/* Extracellular (serum) */}
          <text x="0" y="30" className="text-[9px]" fill="hsl(var(--muted-foreground))">
            Serum
          </text>
          <rect x="0" y="34" width="110" height="14" rx="2" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="0.75" />
          <rect
            x="0"
            y="34"
            width={(110 * extraPct) / 100}
            height="14"
            rx="2"
            fill="hsl(var(--clinical))"
            className="transition-all duration-700 ease-out" stroke="hsl(var(--border))" strokeWidth="0.75" />
          <text
            x={(110 * extraPct) / 100 + 4}
            y="44"
            className="text-[8px] font-mono tabular-nums"
            fill="hsl(var(--foreground))"
            style={{ transition: "all 0.7s" }}
          >
            {shifted ? "↓↓" : "≈"}
          </text>

          {/* Intracellular */}
          <text x="0" y="68" className="text-[9px]" fill="hsl(var(--muted-foreground))">
            Intracellular
          </text>
          <rect x="0" y="72" width="110" height="14" rx="2" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="0.75" />
          <rect
            x="0"
            y="72"
            width={(110 * intraPct) / 100}
            height="14"
            rx="2"
            fill="hsl(var(--pharmacology))"
            className="transition-all duration-700 ease-out" stroke="hsl(var(--border))" strokeWidth="0.75" />
          <text
            x={(110 * intraPct) / 100 + 4}
            y="82"
            className="text-[8px] font-mono tabular-nums"
            fill="hsl(var(--foreground))"
          >
            {shifted ? "↑↑" : "↓"}
          </text>

          {/* Insulin tag */}
          <g transform="translate(0, 102)" opacity={active >= 1 ? 1 : 0.2} className="transition-opacity duration-500">
            <rect width="110" height="22" rx="3" fill="hsl(var(--clinical) / 0.18)" stroke="hsl(var(--clinical))" />
            <text x="55" y="15" textAnchor="middle" className="text-[9px] font-semibold" fill="hsl(var(--foreground))">
              insulin {active >= 2 ? "↑↑↑" : active >= 1 ? "↑" : "—"}
            </text>
          </g>

          {/* Thiamine tag — with prophylaxis tooltip */}
          <g transform="translate(0, 132)" opacity={active >= 3 ? 1 : 0.55} className="transition-opacity duration-500">
            <rect width="110" height="22" rx="3" fill="hsl(var(--physiology) / 0.18)" stroke="hsl(var(--physiology))" />
            <text x="50" y="15" textAnchor="middle" className="text-[9px] font-semibold" fill="hsl(var(--foreground))">
              thiamine {active >= 3 ? "✗ depleted" : "low reserve"}
            </text>
            {/* Info button — opens prophylaxis tooltip */}
            <g
              transform="translate(92, 4)"
              className="cursor-pointer"
              onMouseEnter={() => setShowThiamineTip(true)}
              onMouseLeave={() => setShowThiamineTip(false)}
              onFocus={() => setShowThiamineTip(true)}
              onBlur={() => setShowThiamineTip(false)}
              onClick={() => setShowThiamineTip((v) => !v)}
              tabIndex={0}
              role="button"
              aria-label="Show thiamine prophylaxis dose and timing"
              aria-expanded={showThiamineTip}
            >
              <circle cx="7" cy="7" r="7" fill="hsl(var(--background))" stroke="hsl(var(--physiology))" strokeWidth="1" />
              <text x="7" y="10" textAnchor="middle" className="text-[9px] font-bold" fill="hsl(var(--physiology))">
                i
              </text>
            </g>

            {/* Tooltip — anchored above the tag, rendered last so it sits on top */}
            {showThiamineTip && (
              <foreignObject x="-150" y="-118" width="240" height="118" className="overflow-visible">
                <div
                  className="rounded-md border border-physiology/60 bg-card text-foreground shadow-lg p-2.5 text-[10px] leading-snug animate-fade-in"
                  role="tooltip"
                >
                  <div className="font-semibold text-physiology mb-1">
                    IV thiamine prophylaxis (NICE CG32)
                  </div>
                  <ul className="space-y-0.5 text-muted-foreground">
                    <li>
                      <strong className="text-foreground">When:</strong> ≥30 min{" "}
                      <em>before</em> the first carbohydrate (feed, PN or IV
                      dextrose).
                    </li>
                    <li>
                      <strong className="text-foreground">Dose:</strong>{" "}
                      200–300 mg IV (e.g. Pabrinex® 1 pair) once, then daily for
                      3–10 days.
                    </li>
                    <li>
                      <strong className="text-foreground">Plus:</strong> vitamin
                      B compound + multivitamin / trace elements daily.
                    </li>
                  </ul>
                </div>
              </foreignObject>
            )}
          </g>

          {/* Clinical alert */}
          {active >= 4 && (
            <g transform="translate(0, 162)" className="animate-fade-in">
              <rect width="110" height="36" rx="3" fill="hsl(var(--destructive) / 0.18)" stroke="hsl(var(--destructive))" />
              <text x="55" y="15" textAnchor="middle" className="text-[9px] font-bold" fill="hsl(var(--destructive))">
                ⚠ arrhythmia
              </text>
              <text x="55" y="28" textAnchor="middle" className="text-[8px]" fill="hsl(var(--foreground))">
                weakness · Wernicke
              </text>
            </g>
          )}
        </g>
      </svg>

      {/* Animated example serum labs — change with each step to mirror the
          intracellular shift shown in the compartment bars above. */}
      <LabsPanel active={active} />
    </div>
  );
};

/** Per-step example serum values. Units: K mmol/L, PO4 mmol/L, Mg mmol/L,
 *  glucose mmol/L. Numbers are illustrative (typical exam-friendly values),
 *  not patient data. */
const LAB_SERIES: Array<{ K: number; PO4: number; Mg: number; Glu: number; note: string }> = [
  { K: 4.0, PO4: 0.95, Mg: 0.85, Glu: 4.2, note: "Pre-feed: looks normal — total-body stores depleted" },
  { K: 3.9, PO4: 0.90, Mg: 0.82, Glu: 9.5, note: "Carb load: glucose climbs first" },
  { K: 3.1, PO4: 0.55, Mg: 0.65, Glu: 11.8, note: "Insulin surge: K⁺/PO₄/Mg²⁺ shift intracellularly" },
  { K: 2.8, PO4: 0.38, Mg: 0.58, Glu: 8.0, note: "Thiamine consumed → lactate ↑" },
  { K: 2.6, PO4: 0.30, Mg: 0.55, Glu: 7.2, note: "Critical: arrhythmia / weakness risk" },
];

const REF = {
  K: { lo: 3.5, hi: 5.0, unit: "mmol/L" },
  PO4: { lo: 0.8, hi: 1.5, unit: "mmol/L" },
  Mg: { lo: 0.7, hi: 1.0, unit: "mmol/L" },
  Glu: { lo: 4.0, hi: 7.8, unit: "mmol/L" },
} as const;

type LabKey = keyof typeof REF;

/** Refeeding-specific copy + sources that override the central glossary
 *  defaults inside the LabGlossaryPopover. Keeping the overrides here
 *  preserves the rich, refeeding-flavoured wording while the rest of the
 *  app reuses the shared LabGlossaryPopover for other contexts.
 */
const REFEEDING_OVERRIDES: Record<SharedLabKey & ("K" | "PO4" | "Mg" | "Glu"), {
  trend?: string;
  why?: string;
  clinical?: string;
  action?: string;
  trendSources?: SourceLink[];
  actionSources?: SourceLink[];
}> = {
  K: {
    trend: "Falls with the insulin surge — typical nadir 2.5–3.0 mmol/L by day 2–4 of refeeding.",
    why: "Insulin activates Na⁺/K⁺-ATPase → K⁺ driven into cells. Total-body K⁺ already depleted from starvation, so serum drop is rapid.",
    action: "Replace if < 3.5; urgent IV if < 3.0 or symptomatic. Cardiac monitor during replacement.",
  },
  PO4: {
    trend: "Drops sharply 24–72 h after feed start — the diagnostic biochemical hallmark of refeeding.",
    why: "Consumed making 2,3-DPG, ATP and phosphorylated glycolytic intermediates. Insulin co-transports PO₄ into cells.",
    clinical: "Diaphragmatic / respiratory muscle weakness (failure to wean), cardiac failure, rhabdomyolysis, haemolysis, paraesthesia, seizures.",
    action: "ASPEN: mild < 0.65, moderate 0.32–0.50, severe < 0.32 mmol/L. Replace IV if < 0.5 or symptomatic.",
    trendSources: [
      {
        label: "Frontline Gastro 2020",
        url: "https://fg.bmj.com/content/11/3/254",
        quote:
          "A fall in serum phosphate to <0.50 mmol/L within 72 hours of feeding is the diagnostic biochemical hallmark.",
      },
    ],
  },
  Mg: {
    trend: "Falls in parallel with K⁺ and PO₄ — often nadir < 0.7 mmol/L during early refeeding.",
    why: "Cofactor for Na⁺/K⁺-ATPase and ATP-dependent enzymes; pulled intracellularly. Renal wasting in starvation also contributes.",
    clinical: "Refractory hypokalaemia (cannot correct K⁺ until Mg²⁺ replaced), arrhythmia (torsades), tremor, tetany, seizures.",
    action: "Replace if < 0.7. Always check Mg²⁺ before giving up on persistent hypokalaemia.",
  },
  Glu: {
    trend: "Rises first (carb-naïve metabolism) then settles or undershoots once the insulin response peaks.",
    why: "Sudden carbohydrate load on a glycogen-depleted, insulin-resistant patient → transient hyperglycaemia → counter-regulatory insulin surge that triggers the electrolyte shift.",
    clinical: "Hyperglycaemia → osmotic diuresis, fluid overload, infection risk. Late hypoglycaemia possible if feed interrupted.",
    action: "Target 6–10 mmol/L (NICE-SUGAR). Avoid IV dextrose boluses; start feed at 10 kcal/kg/day.",
  },
};

const LabsPanel = ({ active }: { active: number }) => {
  const labs = LAB_SERIES[Math.min(active, LAB_SERIES.length - 1)];
  const items: Array<{ key: LabKey; label: string; value: number }> = [
    { key: "K", label: "K⁺", value: labs.K },
    { key: "PO4", label: "PO₄³⁻", value: labs.PO4 },
    { key: "Mg", label: "Mg²⁺", value: labs.Mg },
    { key: "Glu", label: "Glucose", value: labs.Glu },
  ];

  return (
    <div className="mt-3 rounded-md border border-border bg-card/60 p-2.5">
      <div className="flex items-center justify-between mb-1.5 gap-2">
        <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">
          Example serum labs · <span className="normal-case font-normal italic">tap a cell for clinical meaning</span>
        </p>
        <p className="text-[10px] text-muted-foreground italic text-right">{labs.note}</p>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {items.map((it) => {
          const { lo, hi, unit } = REF[it.key];
          const low = it.value < lo;
          const high = it.value > hi;
          const tone = low
            ? "text-destructive border-destructive/50 bg-destructive/10"
            : high
            ? "text-clinical border-clinical/50 bg-clinical/10"
            : "text-foreground border-border bg-muted/40";
          const arrow = low ? "↓" : high ? "↑" : "";
          return (
            <LabGlossaryPopover key={it.key} labKey={it.key} overrides={REFEEDING_OVERRIDES[it.key]}>
              <button
                type="button"
                aria-label={`${it.label} — clinical glossary`}
                className={`text-left rounded-md border px-2 py-1.5 transition-colors duration-500 hover:ring-2 hover:ring-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/50 ${tone}`}
              >
                <div className="flex items-baseline justify-between">
                  <span className="text-[10px] font-semibold">{it.label}</span>
                  <span className="text-[9px] opacity-70">
                    {lo}–{hi}
                  </span>
                </div>
                <div
                  key={`${it.key}-${active}`}
                  className="text-sm font-mono font-bold tabular-nums leading-tight animate-fade-in"
                >
                  {it.value.toFixed(it.key === "K" || it.key === "Glu" ? 1 : 2)}
                  <span className="text-[9px] font-normal opacity-70 ml-0.5">{arrow}</span>
                </div>
                <div className="text-[9px] opacity-60">{unit}</div>
              </button>
            </LabGlossaryPopover>
          );
        })}
      </div>

      {/* Sources footer — references for the typical exam-friendly serum
          trends shown above. Chips link out to the primary literature. */}
      <div className="mt-2 pt-2 border-t border-border/60">
        <p className="text-[9px] uppercase tracking-wider font-semibold text-muted-foreground mb-1">
          Sources
        </p>
        <ul className="flex flex-wrap gap-1.5">
          {[
            {
              label: "NICE CG32 (2006, upd. 2017)",
              url: "https://www.nice.org.uk/guidance/cg32",
              title: "Nutrition support for adults — refeeding criteria, 10 kcal/kg start, thiamine 200–300 mg",
            },
            {
              label: "ASPEN Consensus 2020",
              url: "https://aspenjournals.onlinelibrary.wiley.com/doi/full/10.1002/ncp.10474",
              title: "da Silva et al. Nutr Clin Pract 2020 — diagnostic criteria & electrolyte thresholds",
            },
            {
              label: "De Silva & Nightingale, Frontline Gastro 2020",
              url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7447285/",
              title: "Refeeding syndrome: physiological background and practical management",
            },
            {
              label: "Mehanna et al. BMJ 2008",
              url: "https://www.bmj.com/content/336/7659/1495",
              title: "Refeeding syndrome: what it is, and how to prevent and treat it",
            },
            {
              label: "Khan et al. Lit. review 2011",
              url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2945646/",
              title: "Refeeding syndrome: a literature review (Gastroenterol Res Pract)",
            },
          ].map((s) => (
            <li key={s.label}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                title={s.title}
                className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2 py-0.5 text-[10px] font-medium text-foreground hover:bg-muted hover:border-primary/40 transition-colors"
              >
                {s.label}
                <span aria-hidden className="text-muted-foreground text-[8px]">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const RefeedingSyndromeAnimation = () => {
  return (
    <DiagramFigure
      id="refeeding-syndrome-animation"
      title="Refeeding syndrome"
      description="Auto-generated wrapper for the Refeeding syndrome animated physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
                  <AnimatedMechanism
        title="Refeeding syndrome — pathophysiology"
        subtitle="From starvation to insulin-driven electrolyte shift, thiamine depletion and end-organ injury"
        steps={STEPS}
        stepMs={3200}
        accentClass="border-destructive/40"
        renderScene={(active) => <RefeedingScene active={active} />}
      />
    </DiagramFigure>
  );
};

export default RefeedingSyndromeAnimation;

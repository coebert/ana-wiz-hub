import { useState } from "react";
import { DiagramFigure } from "./_shared/DiagramFigure";

/**
 * Antibiotic PK/PD primer — three killing patterns with worked dosing examples.
 * Time-dependent (β-lactams), concentration-dependent (aminoglycosides),
 * AUC-dependent (vancomycin, fluoroquinolones).
 */

type PatternKey = "time" | "conc" | "auc";

interface Pattern {
  key: PatternKey;
  label: string;
  shortLabel: string;
  parameter: string;
  parameterPlain: string;
  target: string;
  drugs: string;
  principle: string;
  dosingStrategy: string;
  color: string;
  example: {
    title: string;
    setup: string;
    calculation: string;
    conclusion: string;
  };
}

const PATTERNS: Pattern[] = [
  {
    key: "time",
    label: "Time-dependent killing",
    shortLabel: "Time-dependent",
    parameter: "%fT > MIC",
    parameterPlain: "Fraction of dosing interval that free drug concentration exceeds the MIC",
    target: "≥ 40–50% fT>MIC for cephalosporins · ≥ 50% for penicillins · ≥ 40% for carbapenems (≥100% for critically ill or resistant organisms)",
    drugs: "β-lactams (penicillins, cephalosporins, carbapenems), aztreonam, linezolid, clindamycin",
    principle: "Killing saturates at ~4× MIC. Above this, raising the peak adds no benefit — only the duration of exposure above MIC matters.",
    dosingStrategy: "Maximise time above MIC by giving smaller doses more frequently, by extended-infusion (3–4 h), or by continuous infusion. Never appropriate to give once-daily.",
    color: "hsl(210 75% 50%)",
    example: {
      title: "Extended-infusion meropenem in severe sepsis",
      setup: "Standard: meropenem 1 g IV bolus (~30 min) every 8 h. fT>MIC for an organism with MIC 2 mg/L is roughly 40–50% — borderline for the critically ill.",
      calculation: "Switch to 1 g IV over 3 h every 8 h: peak is lower but the concentration stays above 2 mg/L for ~70–80% of the dosing interval. Continuous infusion (3 g/24 h after a 1 g loading dose) gives ~100% T>MIC.",
      conclusion: "DALI and MERCY studies support extended/continuous infusion of β-lactams for ICU patients with sepsis or organisms at the higher end of the susceptible MIC range.",
    },
  },
  {
    key: "conc",
    label: "Concentration-dependent killing",
    shortLabel: "Concentration-dependent",
    parameter: "Cmax / MIC",
    parameterPlain: "Ratio of peak free drug concentration to MIC",
    target: "Cmax/MIC ≥ 8–10 for aminoglycosides · ≥ 10 for daptomycin",
    drugs: "Aminoglycosides (gentamicin, amikacin, tobramycin), daptomycin, metronidazole, polymyxins",
    principle: "Higher peaks kill faster and more completely. Significant post-antibiotic effect (PAE) means killing continues even after the drug falls below MIC — so troughs can be very low.",
    dosingStrategy: "Give the entire daily dose as a single large bolus (once-daily / extended-interval dosing) to maximise peak and minimise time at toxic trough concentrations.",
    color: "hsl(15 90% 55%)",
    example: {
      title: "Once-daily (Hartford) gentamicin",
      setup: "Traditional: 1 mg/kg IV every 8 h gives Cmax ~6 mg/L. For an organism with MIC 1 mg/L, Cmax/MIC = 6 — sub-target.",
      calculation: "Once-daily: 5–7 mg/kg IV over 30 min gives Cmax 15–20 mg/L → Cmax/MIC = 15–20 ✓. Trough falls below 1 mg/L for several hours each day, allowing the proximal tubular brush border to recover (reduces nephrotoxicity).",
      conclusion: "Hartford nomogram: take a level 6–14 h post-dose, plot on the nomogram and adjust the interval (q24/q36/q48 h). Avoid in pregnancy, endocarditis (synergy regimens), severe burns, and CrCl < 20 ml/min.",
    },
  },
  {
    key: "auc",
    label: "AUC-dependent killing",
    shortLabel: "AUC-dependent",
    parameter: "AUC₂₄ / MIC",
    parameterPlain: "Ratio of 24-hour area under the concentration–time curve to MIC",
    target: "Vancomycin: AUC₂₄/MIC 400–600 mg·h/L (assuming MIC ≤ 1) · Fluoroquinolones: ≥ 125 (Gram-neg), ≥ 30 (Strep)",
    drugs: "Vancomycin, fluoroquinolones (ciprofloxacin, levofloxacin, moxifloxacin), tigecycline, azithromycin, tedizolid",
    principle: "Both peak and duration matter — total drug exposure across the dosing interval drives killing. Neither pure trough nor pure peak captures efficacy.",
    dosingStrategy: "Target AUC₂₄ directly, ideally with Bayesian software using two levels (peak + trough) or one steady-state level. Trough-only monitoring (15–20 mg/L) over-doses many patients and is being phased out.",
    color: "hsl(280 70% 55%)",
    example: {
      title: "Vancomycin AUC monitoring (2020 IDSA guideline)",
      setup: "70 kg adult, MRSA bacteraemia, MIC 1 mg/L. Loading 25–30 mg/kg (≈ 2 g), then 15–20 mg/kg every 8–12 h.",
      calculation: "Bayesian dosing software estimates AUC₂₄ from a peak (1 h post-infusion) and trough at 24–48 h. Adjust dose to keep AUC₂₄ 400–600 mg·h/L. Trough-only ≥ 15 mg/L correlates poorly with AUC and tends to over-expose, increasing nephrotoxicity (acute kidney injury rises sharply above AUC₂₄ 650).",
      conclusion: "Trough-only targeting of 15–20 mg/L is now reserved for centres without Bayesian software. AUC-guided dosing reduces nephrotoxicity by ~30% with equivalent clinical cure (IDSA/ASHP/PIDS/SIDP 2020).",
    },
  },
];

const AntibioticPKPDPrimer = () => {
  const [active, setActive] = useState<PatternKey>("time");
  const p = PATTERNS.find((x) => x.key === active)!;

  return (
    <DiagramFigure
      id="antibiotic-pkpd-primer"
      title="Antibiotic pkpd primer"
      description="Auto-generated wrapper for the Antibiotic pkpd primer anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
          <div className="rounded-xl border border-border bg-card p-4 my-6">
        <h3 className="text-lg font-semibold text-foreground">Antibiotic PK/PD primer — three killing patterns</h3>
        <p className="text-xs text-muted-foreground mb-4">
          Click a tab to compare the pharmacodynamic parameter, dosing strategy and a worked clinical example for each killing pattern.
        </p>
  
        {/* Tab selector */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
          {PATTERNS.map((pat) => (
            <button
              key={pat.key}
              onClick={() => setActive(pat.key)}
              className="rounded-lg border p-3 text-left transition-all"
              style={{
                backgroundColor: active === pat.key ? `${pat.color}20` : "hsl(var(--background))",
                borderColor: active === pat.key ? pat.color : "hsl(var(--border))",
                borderWidth: active === pat.key ? 2 : 1,
              }}
            >
              <p className="text-[10px] uppercase tracking-wide font-semibold" style={{ color: pat.color }}>
                {pat.shortLabel}
              </p>
              <p className="text-sm font-bold text-foreground mt-0.5">{pat.parameter}</p>
              <p className="text-[11px] text-muted-foreground mt-1 leading-snug">{pat.drugs.split(",").slice(0, 2).join(", ")}…</p>
            </button>
          ))}
        </div>
  
        {/* SVG concentration–time curve illustrating the active pattern */}
        <div className="rounded-lg border border-border bg-background p-3 mb-4">
          <svg viewBox="0 0 600 220" className="w-full h-auto">
            {/* Axes */}
            <line x1="50" y1="180" x2="580" y2="180" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
            <line x1="50" y1="20" x2="50" y2="180" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
            <text x="315" y="210" textAnchor="middle" fontSize="11" fill="hsl(var(--muted-foreground))">time (h) →</text>
            <text x="20" y="100" textAnchor="middle" fontSize="11" fill="hsl(var(--muted-foreground))" transform="rotate(-90 20 100)">[drug]</text>
  
            {/* MIC line */}
            <line x1="50" y1="135" x2="580" y2="135" stroke="hsl(var(--destructive))" strokeWidth="1" strokeDasharray="4 3" />
            <text x="585" y="138" fontSize="10" fill="hsl(var(--destructive))" fontWeight="600">MIC</text>
  
            {active === "time" && (
              <>
                {/* Three smaller peaks (q8h dosing) — bolus */}
                <path d="M 50 180 L 80 50 Q 110 60 140 130 L 170 175 L 200 175 L 230 50 Q 260 60 290 130 L 320 175 L 350 175 L 380 50 Q 410 60 440 130 L 470 175 L 500 175 L 530 175"
                  fill="none" stroke="hsl(210 75% 50% / 0.5)" strokeWidth="2" strokeDasharray="4 2" />
                {/* Extended-infusion solid curve — sustained above MIC */}
                <path d="M 50 180 Q 80 100 130 90 L 200 88 Q 230 88 260 100 L 280 130 Q 310 95 360 90 L 430 88 Q 460 90 490 110 L 510 130 L 530 145"
                  fill="none" stroke="hsl(210 75% 50%)" strokeWidth="2" />
                {/* Shaded T>MIC region */}
                <path d="M 50 135 L 580 135 L 580 88 Q 360 85 130 90 L 50 100 Z"
                  fill="hsl(210 75% 50% / 0.15)" />
                <text x="300" y="115" textAnchor="middle" fontSize="10" fontWeight="600" fill="hsl(210 75% 50%)">
                  fT &gt; MIC (extended infusion maximises this)
                </text>
                <text x="60" y="40" fontSize="9" fill="hsl(210 75% 50% / 0.7)">— — bolus q8h</text>
                <text x="60" y="55" fontSize="9" fill="hsl(210 75% 50%)" fontWeight="600">—— extended infusion</text>
              </>
            )}
  
            {active === "conc" && (
              <>
                {/* Once-daily large peak */}
                <path d="M 50 180 L 90 30 Q 130 40 180 110 Q 230 150 280 170 L 530 178"
                  fill="none" stroke="hsl(15 90% 55%)" strokeWidth="2" />
                {/* Cmax marker */}
                <line x1="90" y1="30" x2="90" y2="180" stroke="hsl(15 90% 55% / 0.4)" strokeWidth="1" strokeDasharray="2 2" />
                <text x="100" y="35" fontSize="11" fontWeight="700" fill="hsl(15 90% 55%)">Cmax</text>
                <line x1="50" y1="30" x2="90" y2="30" stroke="hsl(15 90% 55%)" strokeWidth="1" />
                <path d="M 90 30 L 90 135" stroke="hsl(15 90% 55%)" strokeWidth="1.5" markerEnd="url(#arrow)" />
                <text x="105" y="85" fontSize="10" fontWeight="600" fill="hsl(15 90% 55%)">Cmax / MIC ≥ 8–10</text>
                {/* PAE region */}
                <rect x="280" y="135" width="250" height="43" fill="hsl(15 90% 55% / 0.1)" />
                <text x="405" y="160" textAnchor="middle" fontSize="10" fontWeight="600" fill="hsl(15 90% 55%)">
                  post-antibiotic effect (killing continues below MIC)
                </text>
                <defs>
                  <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="9" markerWidth="6" markerHeight="6" orient="auto">
                    <path d="M 0 0 L 5 10 L 10 0 z" fill="hsl(15 90% 55%)" />
                  </marker>
                </defs>
              </>
            )}
  
            {active === "auc" && (
              <>
                {/* Two moderate peaks (q12h) */}
                <path d="M 50 180 L 100 60 Q 150 70 200 100 Q 250 125 290 145 L 320 145 L 370 60 Q 420 70 470 100 Q 520 125 560 145"
                  fill="none" stroke="hsl(280 70% 55%)" strokeWidth="2" />
                {/* AUC shaded area under entire curve */}
                <path d="M 50 180 L 100 60 Q 150 70 200 100 Q 250 125 290 145 L 320 145 L 370 60 Q 420 70 470 100 Q 520 125 560 145 L 560 180 Z"
                  fill="hsl(280 70% 55% / 0.18)" />
                <text x="200" y="130" textAnchor="middle" fontSize="11" fontWeight="700" fill="hsl(280 70% 55%)">AUC₂₄</text>
                <text x="200" y="145" textAnchor="middle" fontSize="9" fill="hsl(280 70% 55%)">(total exposure)</text>
                <text x="430" y="40" fontSize="10" fontWeight="600" fill="hsl(280 70% 55%)">
                  AUC₂₄ / MIC ≥ 400 (vancomycin)
                </text>
              </>
            )}
          </svg>
        </div>
  
        {/* Active pattern detail card */}
        <div
          className="rounded-lg border-l-4 p-4"
          style={{ borderLeftColor: p.color, backgroundColor: `${p.color}0d` }}
        >
          <div className="flex items-baseline gap-3 flex-wrap">
            <p className="text-xs uppercase tracking-wide font-semibold" style={{ color: p.color }}>
              {p.shortLabel}
            </p>
            <p className="text-base font-bold text-foreground">{p.parameter}</p>
          </div>
          <p className="text-xs text-muted-foreground mt-1 italic leading-snug">{p.parameterPlain}</p>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
            <div className="rounded-md bg-background/60 border border-border p-2.5">
              <p className="text-[11px] uppercase tracking-wide font-semibold text-foreground">Drugs</p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{p.drugs}</p>
            </div>
            <div className="rounded-md bg-background/60 border border-border p-2.5">
              <p className="text-[11px] uppercase tracking-wide font-semibold text-foreground">Target</p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{p.target}</p>
            </div>
            <div className="rounded-md bg-background/60 border border-border p-2.5">
              <p className="text-[11px] uppercase tracking-wide font-semibold text-foreground">Principle</p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{p.principle}</p>
            </div>
            <div className="rounded-md bg-background/60 border border-border p-2.5">
              <p className="text-[11px] uppercase tracking-wide font-semibold text-foreground">Dosing strategy</p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{p.dosingStrategy}</p>
            </div>
          </div>
  
          {/* Worked example */}
          <div className="mt-3 rounded-md border p-3" style={{ borderColor: `${p.color}40`, backgroundColor: `${p.color}14` }}>
            <p className="text-[11px] uppercase tracking-wide font-semibold" style={{ color: p.color }}>
              Worked example
            </p>
            <p className="text-sm font-semibold text-foreground mt-0.5">{p.example.title}</p>
            <div className="mt-2 space-y-1.5 text-xs leading-relaxed">
              <p className="text-foreground"><span className="font-semibold">Setup:</span> <span className="text-muted-foreground">{p.example.setup}</span></p>
              <p className="text-foreground"><span className="font-semibold">Calculation:</span> <span className="text-muted-foreground">{p.example.calculation}</span></p>
              <p className="text-foreground"><span className="font-semibold">Conclusion:</span> <span className="text-muted-foreground">{p.example.conclusion}</span></p>
            </div>
          </div>
        </div>
  
        {/* Quick-reference summary table */}
        <div className="mt-4 rounded-lg border border-border overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-muted/40">
              <tr>
                <th className="text-left p-2 font-semibold text-foreground">Pattern</th>
                <th className="text-left p-2 font-semibold text-foreground">Parameter</th>
                <th className="text-left p-2 font-semibold text-foreground">Example drugs</th>
                <th className="text-left p-2 font-semibold text-foreground">Dosing implication</th>
              </tr>
            </thead>
            <tbody>
              {PATTERNS.map((pat) => (
                <tr key={pat.key} className="border-t border-border">
                  <td className="p-2 font-semibold" style={{ color: pat.color }}>{pat.shortLabel}</td>
                  <td className="p-2 text-foreground font-medium">{pat.parameter}</td>
                  <td className="p-2 text-muted-foreground">{pat.drugs.split(",").slice(0, 2).join(", ")}</td>
                  <td className="p-2 text-muted-foreground">
                    {pat.key === "time" && "Frequent dosing or extended/continuous infusion"}
                    {pat.key === "conc" && "Once-daily, high-dose bolus; allow trough to fall"}
                    {pat.key === "auc" && "Bayesian AUC-guided dosing (vancomycin)"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default AntibioticPKPDPrimer;

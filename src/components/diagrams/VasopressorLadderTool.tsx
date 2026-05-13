import { useMemo, useState } from "react";

/**
 * Vasopressor & inotrope ladder — Surviving Sepsis Campaign 2021.
 * Inputs: MAP, cardiac index, SVR, lactate, current noradrenaline dose, steroid status.
 * Output: stepwise escalation recommendation with rationale and dosing.
 */

type Profile = "vasoplegic" | "cardiogenic" | "mixed" | "hypovolaemic" | "adequate";

const VasopressorLadderTool = () => {
  const [map, setMap] = useState(58);
  const [ci, setCi] = useState(2.4);                // L/min/m²
  const [svr, setSvr] = useState(700);              // dyn·s·cm⁻⁵
  const [lactate, setLactate] = useState(3.8);      // mmol/L
  const [noradDose, setNoradDose] = useState(0.25); // µg/kg/min
  const [onVasopressin, setOnVasopressin] = useState(false);
  const [onAdrenaline, setOnAdrenaline] = useState(false);
  const [onSteroid, setOnSteroid] = useState(false);
  const [fluidResuscitated, setFluidResuscitated] = useState(true);

  const result = useMemo(
    () => evaluate({ map, ci, svr, lactate, noradDose, onVasopressin, onAdrenaline, onSteroid, fluidResuscitated }),
    [map, ci, svr, lactate, noradDose, onVasopressin, onAdrenaline, onSteroid, fluidResuscitated]
  );

  return (
    <div className="rounded-xl border border-border bg-card p-4 my-6">
      <h3 className="text-lg font-semibold text-foreground">Vasopressor &amp; Inotrope Ladder</h3>
      <p className="text-xs text-muted-foreground mb-4">
        Surviving Sepsis Campaign 2021 escalation logic. Targets MAP ≥ 65 mmHg with an appropriate haemodynamic profile (CI ≥ 2.5 L/min/m², SVR 800–1200 dyn·s·cm⁻⁵).
      </p>

      <p className="text-xs font-semibold text-foreground mb-2">Haemodynamics</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 mb-4">
        <Slider label="MAP" value={map} min={30} max={120} step={1} unit="mmHg" onChange={setMap} />
        <Slider label="Cardiac index" value={ci} min={1.0} max={6.0} step={0.1} unit="L/min/m²" onChange={setCi} decimals={1} />
        <Slider label="SVR" value={svr} min={300} max={2000} step={25} unit="dyn·s·cm⁻⁵" onChange={setSvr} />
        <Slider label="Lactate" value={lactate} min={0.5} max={15} step={0.1} unit="mmol/L" onChange={setLactate} decimals={1} />
        <Slider label="Noradrenaline dose" value={noradDose} min={0} max={1.0} step={0.01} unit="µg/kg/min" onChange={setNoradDose} decimals={2} />
      </div>

      <p className="text-xs font-semibold text-foreground mb-2">Current therapy</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4 text-xs">
        <Toggle label="Fluid resuscitated (≥30 mL/kg)" checked={fluidResuscitated} onChange={setFluidResuscitated} />
        <Toggle label="On vasopressin" checked={onVasopressin} onChange={setOnVasopressin} />
        <Toggle label="On adrenaline" checked={onAdrenaline} onChange={setOnAdrenaline} />
        <Toggle label="On hydrocortisone" checked={onSteroid} onChange={setOnSteroid} />
      </div>

      {/* Profile card */}
      <div className="rounded-lg bg-secondary/40 border border-border p-3 mb-3">
        <div className="flex items-baseline justify-between flex-wrap gap-2">
          <p className="text-sm font-semibold text-foreground">Haemodynamic profile</p>
          <p className="text-base font-bold" style={{ color: result.profileColor }}>{result.profileLabel}</p>
        </div>
        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{result.profileDetail}</p>
      </div>

      {/* Ladder visualisation */}
      <div className="rounded-lg border border-border p-3 mb-3">
        <p className="text-sm font-semibold text-foreground mb-3">Escalation ladder</p>
        <div className="space-y-2">
          {result.ladder.map((step, idx) => (
            <LadderStep key={step.name} step={step} index={idx + 1} />
          ))}
        </div>
      </div>

      {/* Next action */}
      <div
        className="rounded-lg p-3 border-l-4 mb-3"
        style={{ borderLeftColor: result.actionColor, backgroundColor: `${result.actionColor}1A` }}
      >
        <p className="text-sm font-bold" style={{ color: result.actionColor }}>Next action</p>
        <p className="text-sm text-foreground mt-1 leading-relaxed font-semibold">{result.nextAction}</p>
        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{result.nextRationale}</p>
      </div>

      <p className="text-[10px] text-muted-foreground italic">
        Refs: Evans L et al. Surviving Sepsis Campaign Guidelines 2021. Crit Care Med 2021;49:e1063. Russell JA et al. VASST. NEJM 2008;358:877. Annane D et al. APROCCHSS. NEJM 2018;378:809. Venkatesh B et al. ADRENAL. NEJM 2018;378:797.
      </p>
    </div>
  );
};

/* ───── Sub-components ───── */
function Slider({ label, value, min, max, step, unit, onChange, decimals = 0 }: {
  label: string; value: number; min: number; max: number; step: number;
  unit: string; onChange: (v: number) => void; decimals?: number;
}) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-0.5">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-mono font-semibold text-foreground">{value.toFixed(decimals)} {unit}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none bg-secondary cursor-pointer accent-primary"
      />
    </div>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void; }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer rounded-md border border-border bg-background/40 px-2 py-1.5">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="accent-primary" />
      <span className="text-muted-foreground text-[11px] leading-tight">{label}</span>
    </label>
  );
}

interface Step {
  name: string;
  dose: string;
  status: "active" | "recommended" | "pending" | "notIndicated";
  rationale: string;
}

function LadderStep({ step, index }: { step: Step; index: number }) {
  const cfg = {
    active:        { color: "hsl(var(--icu))",         badge: "ACTIVE",      ring: "ring-2" },
    recommended:   { color: "hsl(15 90% 55%)",         badge: "START NOW",   ring: "ring-2 animate-pulse" },
    pending:       { color: "hsl(var(--muted-foreground))", badge: "STEP",   ring: "" },
    notIndicated:  { color: "hsl(var(--muted-foreground))", badge: "—",      ring: "opacity-40" },
  }[step.status];
  return (
            <div
      className={`flex items-start gap-3 rounded-md border border-border p-2 ${cfg.ring}`}
      style={{ borderLeftWidth: 4, borderLeftColor: cfg.color }}
    >
      <div
        className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
        style={{ backgroundColor: cfg.color }}
      >
        {index}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-2 flex-wrap">
          <p className="text-sm font-semibold text-foreground">{step.name}</p>
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: `${cfg.color}26`, color: cfg.color }}>
            {cfg.badge}
          </span>
        </div>
        <p className="text-xs font-mono text-foreground/80">{step.dose}</p>
        <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">{step.rationale}</p>
      </div>
    </div>
  );
}

/* ───── Logic ───── */
interface Inputs {
  map: number; ci: number; svr: number; lactate: number;
  noradDose: number; onVasopressin: boolean; onAdrenaline: boolean; onSteroid: boolean;
  fluidResuscitated: boolean;
}

function classifyProfile(i: Inputs): { profile: Profile; label: string; detail: string; color: string } {
  const lowSvr = i.svr < 800;
  const lowCi = i.ci < 2.2;
  const adequateMap = i.map >= 65;

  if (!i.fluidResuscitated && i.map < 65) {
    return {
      profile: "hypovolaemic",
      label: "Inadequate preload",
      detail: "Complete initial 30 mL/kg crystalloid bolus before titrating vasopressors (SSC 2021 strong recommendation).",
      color: "hsl(45 90% 50%)",
    };
  }
  if (lowSvr && !lowCi) {
    return {
      profile: "vasoplegic",
      label: `Vasoplegic (SVR ${i.svr}, CI ${i.ci.toFixed(1)})`,
      detail: "Distributive / vasoplegic shock — pure vasoconstrictor strategy. Noradrenaline first-line; add vasopressin to spare catecholamine load.",
      color: "hsl(15 90% 55%)",
    };
  }
  if (lowCi && !lowSvr) {
    return {
      profile: "cardiogenic",
      label: `Cardiogenic (CI ${i.ci.toFixed(1)}, SVR ${i.svr})`,
      detail: "Low cardiac output with preserved/raised SVR — add inodilator (dobutamine) or inoconstrictor (adrenaline) rather than more pure vasoconstrictor. Consider echo and mechanical support assessment.",
      color: "hsl(var(--destructive))",
    };
  }
  if (lowSvr && lowCi) {
    return {
      profile: "mixed",
      label: `Mixed shock (CI ${i.ci.toFixed(1)}, SVR ${i.svr})`,
      detail: "Septic cardiomyopathy or combined shock — needs both vasoconstriction and inotropy. Adrenaline is the SSC-recommended single agent; alternatively noradrenaline + dobutamine.",
      color: "hsl(var(--destructive))",
    };
  }
  if (adequateMap) {
    return {
      profile: "adequate",
      label: "Targets met",
      detail: `MAP ${i.map} mmHg, CI ${i.ci.toFixed(1)}, SVR ${i.svr} — re-assess perfusion (lactate trend, CRT, urine output, ScvO₂). Begin de-escalation if sustained ≥ 4 h.`,
      color: "hsl(var(--icu))",
    };
  }
  return {
    profile: "vasoplegic",
    label: `MAP ${i.map} below target`,
    detail: "MAP below 65 mmHg despite reasonable preload — escalate per ladder.",
    color: "hsl(45 90% 50%)",
  };
}

function evaluate(i: Inputs) {
  const profileInfo = classifyProfile(i);
  const adequateMap = i.map >= 65;
  const highNorad = i.noradDose >= 0.25; // SSC threshold to add vasopressin
  const veryHighNorad = i.noradDose >= 0.5; // refractory threshold

  // Ladder
  const ladder: Step[] = [];

  // Step 1: Fluid
  ladder.push({
    name: "1. Fluid resuscitation",
    dose: "30 mL/kg balanced crystalloid within first 3 h",
    status: i.fluidResuscitated ? "active" : "recommended",
    rationale: i.fluidResuscitated
      ? "Initial bolus complete — further fluids guided by dynamic responsiveness (PLR, PPV/SVV, VTI)."
      : "SSC 2021 strong recommendation. Reassess for fluid responsiveness before further boluses.",
  });

  // Step 2: Noradrenaline
  ladder.push({
    name: "2. Noradrenaline",
    dose: i.noradDose > 0 ? `Currently ${i.noradDose.toFixed(2)} µg/kg/min — titrate to MAP ≥ 65` : "Start 0.05–0.1 µg/kg/min, titrate to MAP ≥ 65",
    status: i.noradDose > 0 ? "active" : (adequateMap && i.fluidResuscitated ? "notIndicated" : "recommended"),
    rationale: "First-line vasopressor (SSC 2021 strong recommendation, moderate evidence). α₁ predominant, modest β₁ — preserves cardiac output. Central access preferred but may start peripherally for ≤ 6 h.",
  });

  // Step 3: Vasopressin
  const needVasopressin = highNorad && !adequateMap;
  ladder.push({
    name: "3. Vasopressin",
    dose: "Fixed 0.03 U/min (do not titrate above 0.04 U/min)",
    status: i.onVasopressin ? "active"
      : needVasopressin ? "recommended"
      : (i.noradDose < 0.15 ? "notIndicated" : "pending"),
    rationale: "Add when noradrenaline ≥ 0.25 µg/kg/min or to spare catecholamine dose (SSC 2021 weak recommendation). V1a-mediated vasoconstriction independent of adrenergic pathway. VASST trial: no overall mortality benefit but reduced mortality in less severe shock subgroup.",
  });

  // Step 4: Adrenaline
  const needAdrenaline = (profileInfo.profile === "cardiogenic" || profileInfo.profile === "mixed") || (veryHighNorad && i.onVasopressin && !adequateMap);
  ladder.push({
    name: "4. Adrenaline",
    dose: "Start 0.05 µg/kg/min, titrate to effect (typical 0.05–0.5 µg/kg/min)",
    status: i.onAdrenaline ? "active"
      : needAdrenaline ? "recommended"
      : "pending",
    rationale: "Add for inadequate MAP despite noradrenaline + vasopressin, or when CI < 2.2 (mixed/cardiogenic profile). β₁/β₂ + α₁ — increases CO and SVR. Watch lactate (β₂-driven aerobic glycolysis can artefactually elevate lactate).",
  });

  // Step 5: Hydrocortisone
  const needSteroid = (i.noradDose >= 0.25 || veryHighNorad) && !adequateMap;
  ladder.push({
    name: "5. Hydrocortisone",
    dose: "200 mg/day IV (50 mg q6h or 200 mg/24 h infusion) ± fludrocortisone 50 µg PO",
    status: i.onSteroid ? "active"
      : needSteroid ? "recommended"
      : "pending",
    rationale: "Add when noradrenaline ≥ 0.25 µg/kg/min for ≥ 4 h (SSC 2021 weak recommendation). APROCCHSS: 90-day mortality benefit; ADRENAL: faster shock reversal, no mortality benefit. Faster vasopressor wean and ICU LOS reduction across both trials.",
  });

  // Step 6: Salvage / refractory
  const needSalvage = veryHighNorad && i.onVasopressin && i.onAdrenaline && i.onSteroid && !adequateMap;
  ladder.push({
    name: "6. Refractory shock — salvage",
    dose: "Methylene blue 1–2 mg/kg, angiotensin II (0.02–0.2 µg/kg/min), VA-ECMO referral",
    status: needSalvage ? "recommended" : "pending",
    rationale: "When all guideline-recommended agents fail. Methylene blue (NOS inhibitor) for vasoplegia; angiotensin II (ATHOS-3) reduced noradrenaline requirements; VA-ECMO if cardiogenic component dominant and reversible.",
  });

  // Determine next action
  let nextAction = "", nextRationale = "", actionColor = "hsl(var(--icu))";
  const recommended = ladder.find((s) => s.status === "recommended");
  if (adequateMap && i.lactate < 2 && i.noradDose > 0) {
    nextAction = "Begin de-escalation";
    nextRationale = "MAP ≥ 65 sustained with normal lactate. Wean noradrenaline by 0.02 µg/kg/min every 30–60 min, last in / first out (vasopressin off last to avoid rebound hypotension in some studies, though SSC has no firm preference).";
    actionColor = "hsl(var(--icu))";
  } else if (recommended) {
    nextAction = recommended.name.replace(/^\d+\.\s*/, "");
    nextRationale = recommended.rationale;
    actionColor = recommended.name.includes("Refractory") ? "hsl(var(--destructive))" : "hsl(15 90% 55%)";
  } else if (adequateMap) {
    nextAction = "Maintain current therapy and re-assess in 30 min";
    nextRationale = "Targets met but no de-escalation criteria yet. Re-check lactate, CRT, urine output and ScvO₂.";
    actionColor = "hsl(45 90% 50%)";
  } else {
    nextAction = "Reassess profile and consider echo";
    nextRationale = "Inputs do not match a clear escalation step — bedside echo, repeat lactate, consider obstructive shock (PE, tamponade) or inadequate source control.";
    actionColor = "hsl(15 90% 55%)";
  }

  return {
    profileLabel: profileInfo.label,
    profileDetail: profileInfo.detail,
    profileColor: profileInfo.color,
    ladder,
    nextAction,
    nextRationale,
    actionColor,
  };
}

export default VasopressorLadderTool;

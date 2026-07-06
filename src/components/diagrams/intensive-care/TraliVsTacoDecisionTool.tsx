import { useMemo, useState } from "react";
import { AlertTriangle, Droplets, HeartPulse, Activity, Wind } from "lucide-react";
import { Label } from "@/components/ui/label";
import { DiagramFigure } from "../_shared/DiagramFigure";

/**
 * TRALI vs TACO Decision Tool — interactive bedside differential.
 *
 * Synthesises four pillars used in the UK NHSBT / SHOT and ISBT 2019
 * consensus definitions: timing, filling pressures (CVP / JVP),
 * oxygenation pattern, and response to diuresis. Outputs a weighted
 * likelihood with rationale.
 *
 * Sources: ISBT TRALI consensus 2019; NHSBT/SHOT 2023 Annual Report;
 * Vlaar AP et al., Transfusion 2019.
 */

type Timing = "<6h" | "6-12h" | ">12h";
type Pressure = "raised" | "normal" | "low";
type Oxygenation = "pf<200" | "pf200-300" | "pf>300";
type Diuretic = "improves" | "no-change" | "worsens" | "not-given";
type BP = "hyper" | "normo" | "hypo";

interface Inputs {
  timing: Timing;
  pressure: Pressure;
  oxy: Oxygenation;
  diuretic: Diuretic;
  bp: BP;
  fever: boolean;
  bnpRaised: boolean;
}

const score = (i: Inputs) => {
  let trali = 0;
  let taco = 0;
  const reasons: { dx: "TRALI" | "TACO"; text: string }[] = [];

  // Timing — both classically <6 h, but TACO can present up to 12 h
  if (i.timing === "<6h") {
    trali += 2;
    taco += 2;
  } else if (i.timing === "6-12h") {
    taco += 2;
    reasons.push({ dx: "TACO", text: "Onset 6–12 h favours TACO (TRALI strictly ≤6 h)" });
  } else {
    reasons.push({ dx: "TACO", text: ">12 h after transfusion — neither classical, consider delayed TACO or alternative diagnosis" });
  }

  // Filling pressures — most discriminating single feature
  if (i.pressure === "raised") {
    taco += 4;
    reasons.push({ dx: "TACO", text: "Raised CVP / JVP indicates hydrostatic overload" });
  } else if (i.pressure === "normal") {
    trali += 3;
    reasons.push({ dx: "TRALI", text: "Normal CVP / JVP fits non-cardiogenic capillary leak" });
  } else {
    trali += 2;
    reasons.push({ dx: "TRALI", text: "Low filling pressures argue against hydrostatic overload" });
  }

  // Oxygenation — Berlin/ISBT P/F thresholds
  if (i.oxy === "pf<200") {
    trali += 2;
    reasons.push({ dx: "TRALI", text: "P/F <200 — severe hypoxaemia typical of TRALI" });
  } else if (i.oxy === "pf200-300") {
    trali += 1;
    taco += 1;
  } else {
    taco += 1;
  }

  // Response to diuretics
  if (i.diuretic === "improves") {
    taco += 4;
    reasons.push({ dx: "TACO", text: "Rapid improvement with diuresis is diagnostic of TACO" });
  } else if (i.diuretic === "worsens") {
    trali += 4;
    reasons.push({ dx: "TRALI", text: "Worsening with diuresis fits intravascular depletion in TRALI" });
  } else if (i.diuretic === "no-change") {
    trali += 2;
    reasons.push({ dx: "TRALI", text: "No response to diuresis argues against pure hydrostatic oedema" });
  }

  // Blood pressure
  if (i.bp === "hyper") {
    taco += 2;
    reasons.push({ dx: "TACO", text: "Hypertension often accompanies acute volume overload" });
  } else if (i.bp === "hypo") {
    trali += 2;
    reasons.push({ dx: "TRALI", text: "Hypotension is characteristic of TRALI (vs hypertension in TACO)" });
  }

  // Fever / leucopenia surrogate
  if (i.fever) {
    trali += 2;
    reasons.push({ dx: "TRALI", text: "Fever ± transient leucopenia supports TRALI" });
  }

  // BNP — TACO usually >1.5× baseline
  if (i.bnpRaised) {
    taco += 3;
    reasons.push({ dx: "TACO", text: "BNP / NT-proBNP >1.5× baseline supports TACO" });
  } else {
    trali += 1;
  }

  const total = trali + taco;
  const traliPct = total ? Math.round((trali / total) * 100) : 50;
  const tacoPct = 100 - traliPct;

  let verdict: "TRALI" | "TACO" | "EQUIVOCAL";
  const diff = Math.abs(trali - taco);
  if (diff < 3) verdict = "EQUIVOCAL";
  else verdict = trali > taco ? "TRALI" : "TACO";

  return { trali, taco, traliPct, tacoPct, reasons, verdict };
};

const RadioRow = <T extends string>({
  label,
  value,
  options,
  onChange,
  icon: Icon,
}: {
  label: string;
  value: T;
  options: { v: T; l: string }[];
  onChange: (v: T) => void;
  icon: typeof Wind;
}) => (
  <div>
    <div className="flex items-center gap-2 mb-1.5">
      <Icon className="h-3.5 w-3.5 text-muted-foreground" />
      <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</Label>
    </div>
    <div className="flex flex-wrap gap-1.5">
      {options.map((o) => (
        <button
          key={o.v}
          type="button"
          onClick={() => onChange(o.v)}
          className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-all ${
            value === o.v
              ? "bg-primary text-primary-foreground border-primary"
              : "border-border text-muted-foreground hover:text-foreground"
          }`}
        >
          {o.l}
        </button>
      ))}
    </div>
  </div>
);

export const TraliVsTacoDecisionTool = () => {
  const [i, setI] = useState<Inputs>({
    timing: "<6h",
    pressure: "normal",
    oxy: "pf<200",
    diuretic: "not-given",
    bp: "hypo",
    fever: false,
    bnpRaised: false,
  });

  const r = useMemo(() => score(i), [i]);

  const verdictCopy = {
    TRALI: { title: "Likely TRALI", tone: "text-destructive", bg: "bg-destructive/10", ring: "border-destructive/40" },
    TACO: { title: "Likely TACO", tone: "text-icu", bg: "bg-icu/10", ring: "border-icu/40" },
    EQUIVOCAL: { title: "Equivocal — consider both", tone: "text-foreground", bg: "bg-secondary/40", ring: "border-border" },
  }[r.verdict];

  return (
    <DiagramFigure
      id="trali-vs-taco-decision-tool"
      title="Trali vs taco decision tool"
      description="Auto-generated wrapper for the Trali vs taco decision tool anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
                  <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="mb-4">
          <h3 className="text-lg font-serif font-bold text-foreground">TRALI vs TACO Decision Tool</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Bedside differentiator for transfusion-associated pulmonary oedema. Updates live from ISBT 2019 / SHOT criteria.
          </p>
        </div>
  
        <div className="grid lg:grid-cols-2 gap-5">
          <div className="space-y-4">
            <RadioRow
              label="Timing from transfusion"
              value={i.timing}
              icon={Activity}
              onChange={(v) => setI((s) => ({ ...s, timing: v }))}
              options={[
                { v: "<6h", l: "<6 h" },
                { v: "6-12h", l: "6–12 h" },
                { v: ">12h", l: ">12 h" },
              ]}
            />
            <RadioRow
              label="CVP / JVP"
              value={i.pressure}
              icon={HeartPulse}
              onChange={(v) => setI((s) => ({ ...s, pressure: v }))}
              options={[
                { v: "raised", l: "Raised" },
                { v: "normal", l: "Normal" },
                { v: "low", l: "Low" },
              ]}
            />
            <RadioRow
              label="Oxygenation (P/F ratio)"
              value={i.oxy}
              icon={Wind}
              onChange={(v) => setI((s) => ({ ...s, oxy: v }))}
              options={[
                { v: "pf<200", l: "<200" },
                { v: "pf200-300", l: "200–300" },
                { v: "pf>300", l: ">300" },
              ]}
            />
            <RadioRow
              label="Response to diuretic"
              value={i.diuretic}
              icon={Droplets}
              onChange={(v) => setI((s) => ({ ...s, diuretic: v }))}
              options={[
                { v: "improves", l: "Improves" },
                { v: "no-change", l: "No change" },
                { v: "worsens", l: "Worsens" },
                { v: "not-given", l: "Not given" },
              ]}
            />
            <RadioRow
              label="Blood pressure trend"
              value={i.bp}
              icon={HeartPulse}
              onChange={(v) => setI((s) => ({ ...s, bp: v }))}
              options={[
                { v: "hyper", l: "Hypertensive" },
                { v: "normo", l: "Normal" },
                { v: "hypo", l: "Hypotensive" },
              ]}
            />
  
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setI((s) => ({ ...s, fever: !s.fever }))}
                className={`px-3 py-2 rounded-md text-xs font-medium border transition-all ${
                  i.fever ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                Fever / leucopenia
              </button>
              <button
                type="button"
                onClick={() => setI((s) => ({ ...s, bnpRaised: !s.bnpRaised }))}
                className={`px-3 py-2 rounded-md text-xs font-medium border transition-all ${
                  i.bnpRaised ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                BNP &gt;1.5× baseline
              </button>
            </div>
          </div>
  
          <div className={`rounded-lg border-2 ${verdictCopy.ring} ${verdictCopy.bg} p-4 space-y-3`}>
            <div className="flex items-center gap-2">
              <AlertTriangle className={`h-5 w-5 ${verdictCopy.tone}`} />
              <p className={`text-sm font-bold uppercase tracking-wide ${verdictCopy.tone}`}>{verdictCopy.title}</p>
            </div>
  
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-[11px] font-semibold uppercase tracking-wide text-muted-foreground mb-1">
                  <span>TRALI</span>
                  <span>{r.traliPct}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-destructive transition-all" style={{ width: `${r.traliPct}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] font-semibold uppercase tracking-wide text-muted-foreground mb-1">
                  <span>TACO</span>
                  <span>{r.tacoPct}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-icu transition-all" style={{ width: `${r.tacoPct}%` }} />
                </div>
              </div>
            </div>
  
            {r.reasons.length > 0 && (
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground mb-1">Reasoning</p>
                <ul className="text-xs text-foreground space-y-1">
                  {r.reasons.map((rs, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span
                        className={`shrink-0 mt-0.5 px-1.5 rounded text-[10px] font-bold ${
                          rs.dx === "TRALI" ? "bg-destructive/20 text-destructive" : "bg-icu/20 text-icu"
                        }`}
                      >
                        {rs.dx}
                      </span>
                      <span className="leading-snug">{rs.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
  
            <div className="rounded-md bg-background/60 border border-border/60 p-3 space-y-1.5">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Bedside management</p>
              {r.verdict === "TRALI" && (
                <ul className="text-xs text-foreground space-y-1 list-disc list-inside leading-relaxed">
                  <li>Stop transfusion; quarantine implicated unit; notify blood bank + haemovigilance (SHOT).</li>
                  <li>Lung-protective ventilation (6 mL/kg PBW), titrate PEEP, target SpO₂ 92–96%.</li>
                  <li>Vasopressors as needed — <strong>avoid diuretics</strong> (worsens hypovolaemia).</li>
                  <li>Supportive only; usually resolves in 48–96 h. Mortality ~5–10%.</li>
                </ul>
              )}
              {r.verdict === "TACO" && (
                <ul className="text-xs text-foreground space-y-1 list-disc list-inside leading-relaxed">
                  <li>Stop / slow transfusion; sit patient up; high-flow O₂ ± NIV / CPAP.</li>
                  <li>IV furosemide 20–40 mg; reassess; consider GTN infusion if hypertensive.</li>
                  <li>Future transfusions: 1 unit at a time over 3–4 h, pre-emptive diuretic in elderly / cardiac / renal patients.</li>
                  <li>Report to SHOT — leading cause of transfusion-related death in the UK.</li>
                </ul>
              )}
              {r.verdict === "EQUIVOCAL" && (
                <ul className="text-xs text-foreground space-y-1 list-disc list-inside leading-relaxed">
                  <li>Treat the dominant physiology while gathering data: BNP, echo, CXR, repeat ABG.</li>
                  <li>Cautious diuretic trial only if BP and CVP support TACO.</li>
                  <li>Lung-protective ventilation is safe in either; avoid aggressive fluids.</li>
                  <li>Discuss with haematology and report to SHOT pending classification.</li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default TraliVsTacoDecisionTool;

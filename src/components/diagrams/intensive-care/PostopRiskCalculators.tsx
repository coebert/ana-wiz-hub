import { useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { DiagramFigure } from "../_shared/DiagramFigure";

/* -----------------------------------------------------------
 * Shared helpers
 * --------------------------------------------------------- */

const logistic = (logit: number) => 1 / (1 + Math.exp(-logit));
const pct = (p: number) => `${(p * 100).toFixed(1)}%`;

const RiskBadge = ({ p, label }: { p: number; label?: string }) => {
  const token = p >= 0.1 ? "destructive" : p >= 0.05 ? "clinical" : "physiology";
  const tier =
    p >= 0.1 ? "High risk → level-3 critical care" :
    p >= 0.05 ? "Intermediate → level-2 critical care" :
    "Lower risk — ward, with vigilance";
  return (
    <div
      className="rounded-lg border-l-4 p-4 mt-3"
      style={{
        borderColor: `hsl(var(--${token}))`,
        background: `hsl(var(--${token}) / 0.10)`,
      }}
    >
      <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
        {label ?? "Predicted 30-day mortality"}
      </p>
      <p className="text-3xl font-mono font-bold mt-1" style={{ color: `hsl(var(--${token}))` }}>
        {pct(p)}
      </p>
      <p className="text-xs text-muted-foreground mt-1">{tier}</p>
    </div>
  );
};

/* -----------------------------------------------------------
 * P-POSSUM (Copeland 1991, Prytherch 1998)
 * Physiological score (12 vars) + operative score (6 vars).
 * ln(R/(1-R)) = -9.065 + 0.1692·PS + 0.1550·OS  → 30-day mortality
 * Each variable scored 1, 2, 4 or 8.
 * --------------------------------------------------------- */

interface PScoreOption { label: string; value: number }

const PHYS_VARS: Array<{ key: string; label: string; opts: PScoreOption[] }> = [
  { key: "age", label: "Age (years)", opts: [
    { label: "≤ 60",  value: 1 },
    { label: "61–70", value: 2 },
    { label: "≥ 71",  value: 4 },
  ]},
  { key: "cardiac", label: "Cardiac status", opts: [
    { label: "No failure",                          value: 1 },
    { label: "Diuretic / digoxin / antianginal",    value: 2 },
    { label: "Peripheral oedema, warfarin",         value: 4 },
    { label: "Raised JVP, cardiomegaly",            value: 8 },
  ]},
  { key: "resp", label: "Respiratory", opts: [
    { label: "No dyspnoea",                          value: 1 },
    { label: "On exertion",                          value: 2 },
    { label: "Limiting (1 flight)",                  value: 4 },
    { label: "Dyspnoea at rest",                     value: 8 },
  ]},
  { key: "ecg", label: "ECG", opts: [
    { label: "Normal",                                value: 1 },
    { label: "AF rate 60–90",                         value: 4 },
    { label: "Other abnormal rhythm / ≥5 ectopics / Q waves / ST/T changes", value: 8 },
  ]},
  { key: "sbp", label: "Systolic BP (mmHg)", opts: [
    { label: "110–130", value: 1 },
    { label: "131–170 or 100–109", value: 2 },
    { label: ">170 or 90–99", value: 4 },
    { label: "<90", value: 8 },
  ]},
  { key: "hr", label: "Heart rate (bpm)", opts: [
    { label: "50–80", value: 1 },
    { label: "81–100 or 40–49", value: 2 },
    { label: "101–120", value: 4 },
    { label: ">120 or <40", value: 8 },
  ]},
  { key: "gcs", label: "GCS", opts: [
    { label: "15", value: 1 },
    { label: "12–14", value: 2 },
    { label: "9–11", value: 4 },
    { label: "<9", value: 8 },
  ]},
  { key: "hb", label: "Haemoglobin (g/dL)", opts: [
    { label: "13–16", value: 1 },
    { label: "11.5–12.9 or 16.1–17", value: 2 },
    { label: "10–11.4 or 17.1–18", value: 4 },
    { label: "<10 or >18", value: 8 },
  ]},
  { key: "wcc", label: "WCC (×10⁹/L)", opts: [
    { label: "4–10", value: 1 },
    { label: "10.1–20 or 3.1–4", value: 2 },
    { label: ">20 or <3", value: 4 },
  ]},
  { key: "urea", label: "Urea (mmol/L)", opts: [
    { label: "≤7.5", value: 1 },
    { label: "7.6–10", value: 2 },
    { label: "10.1–15", value: 4 },
    { label: ">15", value: 8 },
  ]},
  { key: "na", label: "Sodium (mmol/L)", opts: [
    { label: "136–145", value: 1 },
    { label: "131–135", value: 2 },
    { label: "126–130", value: 4 },
    { label: "≤125 or >145", value: 8 },
  ]},
  { key: "k", label: "Potassium (mmol/L)", opts: [
    { label: "3.5–5",         value: 1 },
    { label: "3.2–3.4 or 5.1–5.3", value: 2 },
    { label: "2.9–3.1 or 5.4–5.9", value: 4 },
    { label: "<2.9 or >5.9",  value: 8 },
  ]},
];

const OP_VARS: Array<{ key: string; label: string; opts: PScoreOption[] }> = [
  { key: "severity", label: "Operative severity", opts: [
    { label: "Minor", value: 1 },
    { label: "Moderate", value: 2 },
    { label: "Major", value: 4 },
    { label: "Major+ / complex", value: 8 },
  ]},
  { key: "procs", label: "Number of procedures", opts: [
    { label: "1", value: 1 },
    { label: "2", value: 4 },
    { label: ">2", value: 8 },
  ]},
  { key: "loss", label: "Blood loss (mL)", opts: [
    { label: "≤100", value: 1 },
    { label: "101–500", value: 2 },
    { label: "501–999", value: 4 },
    { label: "≥1000", value: 8 },
  ]},
  { key: "soiling", label: "Peritoneal soiling", opts: [
    { label: "None", value: 1 },
    { label: "Minor (serous)", value: 2 },
    { label: "Local pus", value: 4 },
    { label: "Free bowel content / pus / blood", value: 8 },
  ]},
  { key: "malig", label: "Malignancy", opts: [
    { label: "None", value: 1 },
    { label: "Primary only", value: 2 },
    { label: "Nodal mets", value: 4 },
    { label: "Distant mets", value: 8 },
  ]},
  { key: "urgency", label: "Urgency", opts: [
    { label: "Elective", value: 1 },
    { label: "Urgent (<24 h)", value: 4 },
    { label: "Emergency (<2 h)", value: 8 },
  ]},
];

const PPossumCalc = () => {
  const [phys, setPhys] = useState<Record<string, number>>(
    Object.fromEntries(PHYS_VARS.map((v) => [v.key, 1])),
  );
  const [op, setOp] = useState<Record<string, number>>(
    Object.fromEntries(OP_VARS.map((v) => [v.key, 1])),
  );

  const PS = Object.values(phys).reduce((a, b) => a + b, 0);
  const OS = Object.values(op).reduce((a, b) => a + b, 0);
  const mortLogit = -9.065 + 0.1692 * PS + 0.1550 * OS;
  const morbLogit = -5.91 + 0.16 * PS + 0.19 * OS;
  const mort = logistic(mortLogit);
  const morb = logistic(morbLogit);

  const renderGroup = (
    title: string,
    vars: typeof PHYS_VARS,
    state: Record<string, number>,
    setter: (s: Record<string, number>) => void,
  ) => (
    <div className="space-y-2">
      <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">{title}</p>
      <div className="grid sm:grid-cols-2 gap-2">
        {vars.map((v) => (
          <div key={v.key} className="space-y-1">
            <Label className="text-xs">{v.label}</Label>
            <Select
              value={String(state[v.key])}
              onValueChange={(val) => setter({ ...state, [v.key]: Number(val) })}
            >
              <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                {v.opts.map((o) => (
                  <SelectItem key={o.label} value={String(o.value)} className="text-xs">
                    {o.label} <span className="text-muted-foreground ml-1">({o.value})</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="grid lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-4">
      <div className="space-y-4">
        {renderGroup("Physiological score (12)", PHYS_VARS, phys, setPhys)}
        {renderGroup("Operative score (6)",     OP_VARS,   op,   setOp)}
      </div>
      <aside className="bg-muted/30 rounded-lg p-4 border border-border h-fit lg:sticky lg:top-24">
        <div className="flex justify-between text-sm">
          <div>
            <p className="text-xs text-muted-foreground">Phys score</p>
            <p className="font-mono font-bold text-foreground text-lg">{PS}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Op score</p>
            <p className="font-mono font-bold text-foreground text-lg">{OS}</p>
          </div>
        </div>
        <RiskBadge p={mort} label="30-day mortality" />
        <RiskBadge p={morb} label="30-day morbidity" />
        <p className="text-[10px] text-muted-foreground mt-3 leading-snug">
          Prytherch 1998. NELA quality-improvement standard. Underestimates mortality at the highest risk
          tertile (re-calibrated regularly).
        </p>
      </aside>
    </div>
  );
};

/* -----------------------------------------------------------
 * SORT (Protopapa 2014) — pre-operative 30-day mortality
 * --------------------------------------------------------- */

const SortCalc = () => {
  const [asa,      setAsa]      = useState("3");
  const [urgency,  setUrgency]  = useState("elective");
  const [highRisk, setHighRisk] = useState("no");
  const [severity, setSeverity] = useState("major");
  const [cancer,   setCancer]   = useState("no");
  const [age,      setAge]      = useState("65-79");

  const result = useMemo(() => {
    let l = -7.366;
    l += { "1": 0, "2": 0.332, "3": 1.140, "4": 2.198, "5": 3.223 }[asa] ?? 0;
    l += { elective: 0, expedited: 1.236, urgent: 1.657, immediate: 2.452 }[urgency] ?? 0;
    if (highRisk === "yes") l += 0.712;
    l += { minor: 0, intermediate: 0, major: 0.381, complex: 1.238 }[severity] ?? 0;
    if (cancer === "yes") l += 0.667;
    l += { "<65": 0, "65-79": 0.777, "≥80": 1.591 }[age] ?? 0;
    return logistic(l);
  }, [asa, urgency, highRisk, severity, cancer, age]);

  const Field = ({
    label, value, set, options,
  }: { label: string; value: string; set: (v: string) => void; options: { v: string; l: string }[] }) => (
    <div className="space-y-1">
      <Label className="text-xs">{label}</Label>
      <Select value={value} onValueChange={set}>
        <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o.v} value={o.v} className="text-xs">{o.l}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <div className="grid lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-4">
      <div className="grid sm:grid-cols-2 gap-3">
        <Field label="ASA-PS" value={asa} set={setAsa} options={[
          { v: "1", l: "I — healthy" },
          { v: "2", l: "II — mild systemic" },
          { v: "3", l: "III — severe systemic" },
          { v: "4", l: "IV — life-threatening" },
          { v: "5", l: "V — moribund" },
        ]} />
        <Field label="Urgency (NCEPOD)" value={urgency} set={setUrgency} options={[
          { v: "elective",   l: "Elective" },
          { v: "expedited",  l: "Expedited" },
          { v: "urgent",     l: "Urgent (<24 h)" },
          { v: "immediate",  l: "Immediate (<2 h)" },
        ]} />
        <Field label="High-risk surgical specialty" value={highRisk} set={setHighRisk} options={[
          { v: "no",  l: "No" },
          { v: "yes", l: "Yes (GI / thoracic / vascular)" },
        ]} />
        <Field label="Surgical severity" value={severity} set={setSeverity} options={[
          { v: "minor",        l: "Minor" },
          { v: "intermediate", l: "Intermediate" },
          { v: "major",        l: "Major / Xmajor" },
          { v: "complex",      l: "Complex / major+" },
        ]} />
        <Field label="Cancer present" value={cancer} set={setCancer} options={[
          { v: "no",  l: "No" },
          { v: "yes", l: "Yes" },
        ]} />
        <Field label="Age (years)" value={age} set={setAge} options={[
          { v: "<65",   l: "< 65" },
          { v: "65-79", l: "65–79" },
          { v: "≥80",   l: "≥ 80" },
        ]} />
      </div>
      <aside className="bg-muted/30 rounded-lg p-4 border border-border h-fit lg:sticky lg:top-24">
        <RiskBadge p={result} label="SORT 30-day mortality" />
        <p className="text-[10px] text-muted-foreground mt-3 leading-snug">
          Protopapa 2014, validated in &gt; 16 000 UK patients. Use pre-operatively to guide consent,
          critical-care booking and treatment-escalation planning. Externally validated SORT-v2 adds
          biomarkers but the 6-variable form remains the bedside standard.
        </p>
      </aside>
    </div>
  );
};

/* -----------------------------------------------------------
 * CPET-derived risk (AT, V̇O₂peak, V̇E/V̇CO₂ at AT)
 * --------------------------------------------------------- */

const CpetCalc = () => {
  const [at,    setAt]    = useState(11);
  const [vo2,   setVo2]   = useState(15);
  const [vevco2, setVeVco2] = useState(34);

  const flags = [
    { label: "AT < 11 mL/kg/min",         hit: at < 11,      basis: "Older 1993 / Shoemaker — perioperative cardiac events" },
    { label: "V̇O₂peak < 15 mL/kg/min",     hit: vo2 < 15,     basis: "Snowden 2010 — major abdominal / vascular morbidity" },
    { label: "V̇E/V̇CO₂ at AT > 34",         hit: vevco2 > 34,  basis: "West / Wilson — independent mortality predictor; reflects ventilatory inefficiency" },
  ];
  const score = flags.filter((f) => f.hit).length;
  const tier =
    score >= 2 ? { token: "destructive", text: "High risk — strongly favours level-3 admission, prehab, MDT review" } :
    score === 1 ? { token: "clinical",   text: "Intermediate risk — level-2 bed, individualised MAP target, surveillance troponin" } :
                  { token: "physiology", text: "Lower CPET-defined risk — proceed with standard enhanced-recovery pathway" };

  const SliderRow = ({
    label, value, setter, min, max, step, suffix, target,
  }: {
    label: string; value: number; setter: (n: number) => void;
    min: number; max: number; step: number; suffix: string; target: string;
  }) => (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <Label className="text-sm font-medium">{label}</Label>
        <span className="font-mono text-sm tabular-nums">
          {value.toFixed(step < 1 ? 1 : 0)} <span className="text-muted-foreground text-xs">{suffix}</span>
        </span>
      </div>
      <Slider value={[value]} min={min} max={max} step={step}
        onValueChange={(v) => setter(v[0])} />
      <p className="text-[10px] text-muted-foreground">{target}</p>
    </div>
  );

  return (
    <div className="grid lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-4">
      <div className="space-y-5">
        <SliderRow label="Anaerobic threshold (AT)" value={at}  setter={setAt}
          min={5} max={20} step={0.5} suffix="mL/kg/min"
          target="High risk threshold: < 11 mL/kg/min" />
        <SliderRow label="V̇O₂ peak"                 value={vo2} setter={setVo2}
          min={6} max={30} step={0.5} suffix="mL/kg/min"
          target="High risk threshold: < 15 mL/kg/min (Snowden 2010)" />
        <SliderRow label="V̇E/V̇CO₂ slope at AT"      value={vevco2} setter={setVeVco2}
          min={20} max={60} step={1} suffix="ratio"
          target="High risk threshold: > 34 (ventilatory inefficiency)" />
      </div>
      <aside className="bg-muted/30 rounded-lg p-4 border border-border h-fit lg:sticky lg:top-24">
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
          High-risk criteria met
        </p>
        <p className="text-3xl font-mono font-bold text-foreground mt-1">{score}<span className="text-base text-muted-foreground"> / 3</span></p>
        <div className="rounded-md p-3 mt-3 border-l-4"
          style={{ borderColor: `hsl(var(--${tier.token}))`, background: `hsl(var(--${tier.token}) / 0.1)` }}>
          <p className="text-xs font-semibold" style={{ color: `hsl(var(--${tier.token}))` }}>{tier.text}</p>
        </div>
        <ul className="space-y-1.5 mt-3">
          {flags.map((f) => (
            <li key={f.label} className="text-[10px] flex items-start gap-1.5">
              <span className="font-mono mt-0.5"
                style={{ color: f.hit ? "hsl(var(--destructive))" : "hsl(var(--physiology))" }}>
                {f.hit ? "✗" : "✓"}
              </span>
              <span><span className="font-semibold text-foreground">{f.label}</span>
                <span className="text-muted-foreground"> — {f.basis}</span></span>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

/* -----------------------------------------------------------
 * Clinical Frailty Scale (Rockwood 2005)
 * --------------------------------------------------------- */

const CFS_LEVELS: Array<{ score: number; label: string; desc: string }> = [
  { score: 1, label: "Very fit",                  desc: "Robust, active, energetic. Exercise regularly. Among the fittest for their age." },
  { score: 2, label: "Well",                       desc: "No active disease symptoms; less fit than category 1. Active occasionally." },
  { score: 3, label: "Managing well",              desc: "Medical problems well controlled. Not regularly active beyond walking." },
  { score: 4, label: "Vulnerable",                 desc: "Not dependent on others daily, but symptoms limit activities. Often \"slowed up\"." },
  { score: 5, label: "Mildly frail",               desc: "Evident slowing; need help with high-order IADLs (finance, transport, heavy housework, meds)." },
  { score: 6, label: "Moderately frail",           desc: "Need help with all outside activities and with bathing; minimal help with dressing." },
  { score: 7, label: "Severely frail",             desc: "Completely dependent for personal care, but seem stable; not at high risk of dying within 6 months." },
  { score: 8, label: "Very severely frail",        desc: "Completely dependent and approaching end of life. Could not recover from a minor illness." },
  { score: 9, label: "Terminally ill",             desc: "Life expectancy < 6 months, not otherwise overtly frail." },
];

const CfsCalc = () => {
  const [score, setScore] = useState(4);
  const level = CFS_LEVELS[score - 1];
  const highRisk = score >= 5;
  const token = score >= 7 ? "destructive" : score >= 5 ? "clinical" : "physiology";

  return (
    <div className="grid lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-4">
      <div className="space-y-3">
        <div className="flex flex-wrap gap-1.5">
          {CFS_LEVELS.map((lvl) => {
            const active = lvl.score === score;
            return (
                  <button
                key={lvl.score}
                type="button"
                onClick={() => setScore(lvl.score)}
                aria-pressed={active}
                className="flex flex-col items-center px-3 py-2 rounded-md border transition-all min-w-[72px]"
                style={{
                  background: active ? `hsl(var(--${token}) / 0.15)` : "hsl(var(--card))",
                  borderColor: active ? `hsl(var(--${token}))` : "hsl(var(--border))",
                  borderWidth: active ? 2 : 1,
                }}
              >
                <span className="font-mono font-bold text-base text-foreground">{lvl.score}</span>
                <span className="text-[10px] text-muted-foreground text-center leading-tight mt-0.5">
                  {lvl.label}
                </span>
              </button>
  );
          })}
        </div>
        <div className="p-3 rounded-md bg-muted/30 border border-border">
          <p className="text-sm font-semibold text-foreground">CFS {level.score} — {level.label}</p>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{level.desc}</p>
        </div>
      </div>
      <aside className="bg-muted/30 rounded-lg p-4 border border-border h-fit lg:sticky lg:top-24">
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Frailty category</p>
        <p className="text-3xl font-mono font-bold mt-1" style={{ color: `hsl(var(--${token}))` }}>
          {level.score}/9
        </p>
        <div className="rounded-md p-3 mt-3 border-l-4"
          style={{ borderColor: `hsl(var(--${token}))`, background: `hsl(var(--${token}) / 0.1)` }}>
          <p className="text-xs font-semibold text-foreground">
            {highRisk ? "Frail (CFS ≥ 5)" : "Not frail"}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">
            {highRisk
              ? "~2× 30-day mortality after surgery (Hewitt 2015). Discuss treatment-escalation, prehabilitation, level-2/3 bed, geriatrician/POPS review."
              : "Standard perioperative pathway; reassess if acute illness develops."}
          </p>
        </div>
        <p className="text-[10px] text-muted-foreground mt-3 leading-snug">
          Rockwood 2005, 9-point CSHA scale. NELA &amp; CPOC mandate documentation in everyone ≥ 65 undergoing major surgery.
        </p>
      </aside>
    </div>
  );
};

/* -----------------------------------------------------------
 * Top-level wrapper
 * --------------------------------------------------------- */

const PostopRiskCalculators = () => (
    <DiagramFigure
      id="postop-risk-calculators"
      title="Postop risk calculators"
      description="Auto-generated wrapper for the Postop risk calculators interactive calculator. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
            <div className="my-6 rounded-xl border border-border bg-card shadow-sm overflow-hidden">
      <header className="px-4 sm:px-5 pt-4 pb-3 border-b border-border bg-muted/30">
        <h3 className="text-base sm:text-lg font-serif font-semibold text-foreground leading-tight">
          Bedside risk calculators
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
          Apply each score to the worked examples — values update live. Educational tools, not validated for sole clinical decision-making.
        </p>
      </header>
      <div className="p-4 sm:p-5">
        <Tabs defaultValue="ppossum">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="ppossum">P-POSSUM</TabsTrigger>
            <TabsTrigger value="sort">SORT</TabsTrigger>
            <TabsTrigger value="cpet">CPET</TabsTrigger>
            <TabsTrigger value="cfs">CFS</TabsTrigger>
          </TabsList>
          <TabsContent value="ppossum" className="mt-4"><PPossumCalc /></TabsContent>
          <TabsContent value="sort"    className="mt-4"><SortCalc /></TabsContent>
          <TabsContent value="cpet"    className="mt-4"><CpetCalc /></TabsContent>
          <TabsContent value="cfs"     className="mt-4"><CfsCalc /></TabsContent>
        </Tabs>
      </div>
    </div>
    </DiagramFigure>
  );

export default PostopRiskCalculators;

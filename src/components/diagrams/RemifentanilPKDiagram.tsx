import { useState } from "react";

type TabId = "csht" | "metabolism" | "clinical";

const tabs: { id: TabId; label: string; color: string }[] = [
  { id: "csht", label: "CSHT comparison", color: "hsl(210 70% 55%)" },
  { id: "metabolism", label: "Esterase metabolism", color: "hsl(140 55% 45%)" },
  { id: "clinical", label: "Clinical implications", color: "hsl(0 70% 55%)" },
];

interface Opioid {
  id: string;
  name: string;
  color: string;
  // CSHT model: t50 in min as a function of infusion duration t (min)
  csht: (t: number) => number;
  metabolism: string;
}

// Approximate CSHT curves derived from Hughes/Shafer simulations
const opioids: Opioid[] = [
  {
    id: "remi",
    name: "Remifentanil",
    color: "hsl(0 70% 55%)",
    csht: () => 3.5, // essentially flat at ~3-4 min
    metabolism: "Non-specific tissue + plasma esterases (organ-independent)",
  },
  {
    id: "alf",
    name: "Alfentanil",
    color: "hsl(45 85% 50%)",
    csht: (t) => 30 + Math.min(60, t * 0.18),
    metabolism: "Hepatic CYP3A4",
  },
  {
    id: "suf",
    name: "Sufentanil",
    color: "hsl(140 55% 45%)",
    csht: (t) => 20 + Math.min(40, t * 0.05),
    metabolism: "Hepatic CYP3A4",
  },
  {
    id: "fent",
    name: "Fentanyl",
    color: "hsl(280 65% 55%)",
    csht: (t) => Math.min(280, 10 + t * 0.45),
    metabolism: "Hepatic CYP3A4",
  },
];

export const RemifentanilPKDiagram = () => {
  const [tab, setTab] = useState<TabId>("csht");
  const [duration, setDuration] = useState<number>(180); // infusion duration min for slider
  const [visible, setVisible] = useState<Record<string, boolean>>({
    remi: true,
    alf: true,
    suf: true,
    fent: true,
  });

  const active = tabs.find((t) => t.id === tab) ?? tabs[0];

  // Plot dimensions
  const W = 800;
  const H = 360;
  const padL = 60;
  const padR = 30;
  const padT = 40;
  const padB = 60;
  const xMax = 600; // minutes infusion duration
  const yMax = 300; // CSHT minutes

  const xScale = (t: number) => padL + (t / xMax) * (W - padL - padR);
  const yScale = (v: number) => H - padB - (Math.min(v, yMax) / yMax) * (H - padT - padB);

  const buildPath = (op: Opioid) => {
    const pts: string[] = [];
    for (let t = 0; t <= xMax; t += 10) {
      pts.push(`${pts.length === 0 ? "M" : "L"} ${xScale(t)} ${yScale(op.csht(t))}`);
    }
    return pts.join(" ");
  };

  return (
    <div className="w-full bg-card border border-border rounded-lg p-4 sm:p-6 my-6">
      <h3 className="text-lg font-serif font-bold text-foreground mb-1">Remifentanil — CSHT & Organ-Independent Metabolism</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Remifentanil's flat ~3-minute CSHT — independent of infusion duration — is unique among opioids and underpins its perioperative versatility.
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
              tab === t.id
                ? "border-foreground text-background shadow-sm"
                : "border-border text-foreground hover:border-foreground/50"
            }`}
            style={{ backgroundColor: tab === t.id ? t.color : "transparent" }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* CSHT */}
      {tab === "csht" && (
        <div>
          {/* Toggle chips */}
          <div className="flex flex-wrap gap-2 mb-3">
            {opioids.map((op) => (
              <button
                key={op.id}
                onClick={() => setVisible({ ...visible, [op.id]: !visible[op.id] })}
                className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-all ${
                  visible[op.id] ? "text-background" : "text-foreground bg-background"
                }`}
                style={{
                  backgroundColor: visible[op.id] ? op.color : "transparent",
                  borderColor: op.color,
                }}
              >
                {op.name}
              </button>
            ))}
          </div>

          <div className="w-full overflow-x-auto">
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" style={{ minWidth: 600 }}>
              {/* Axes */}
              <line x1={padL} y1={H - padB} x2={W - padR} y2={H - padB} stroke="hsl(var(--foreground))" strokeWidth="1.5" />
              <line x1={padL} y1={padT} x2={padL} y2={H - padB} stroke="hsl(var(--foreground))" strokeWidth="1.5" />

              <text x={W / 2} y={H - 15} textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="600">
                Infusion duration (min)
              </text>
              <text
                x={20}
                y={H / 2}
                textAnchor="middle"
                className="fill-foreground"
                fontSize="11"
                fontWeight="600"
                transform={`rotate(-90 20 ${H / 2})`}
              >
                Context-sensitive half-time (min)
              </text>

              {/* Grid + ticks */}
              {[0, 100, 200, 300, 400, 500, 600].map((t) => (
                <g key={t}>
                  <line x1={xScale(t)} y1={H - padB} x2={xScale(t)} y2={H - padB + 5} stroke="hsl(var(--foreground))" strokeWidth="1" />
                  <line x1={xScale(t)} y1={padT} x2={xScale(t)} y2={H - padB} stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.5" />
                  <text x={xScale(t)} y={H - padB + 18} textAnchor="middle" className="fill-muted-foreground" fontSize="9">{t}</text>
                </g>
              ))}
              {[0, 60, 120, 180, 240, 300].map((y) => (
                <g key={y}>
                  <line x1={padL - 5} y1={yScale(y)} x2={padL} y2={yScale(y)} stroke="hsl(var(--foreground))" strokeWidth="1" />
                  <line x1={padL} y1={yScale(y)} x2={W - padR} y2={yScale(y)} stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.5" />
                  <text x={padL - 8} y={yScale(y) + 3} textAnchor="end" className="fill-muted-foreground" fontSize="9">{y}</text>
                </g>
              ))}

              {/* Curves */}
              {opioids.map(
                (op) =>
                  visible[op.id] && (
                    <g key={op.id}>
                      <path d={buildPath(op)} fill="none" stroke={op.color} strokeWidth="3" />
                      {/* End-of-curve label */}
                      <text x={xScale(xMax) - 5} y={yScale(op.csht(xMax)) - 8} textAnchor="end" className="fill-foreground" fontSize="10" fontWeight="600">
                        {op.name}
                      </text>
                    </g>
                  )
              )}

              {/* Vertical marker for slider */}
              <line x1={xScale(duration)} y1={padT} x2={xScale(duration)} y2={H - padB} stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeDasharray="3 3" />
              {opioids.map(
                (op) =>
                  visible[op.id] && (
                    <circle key={op.id} cx={xScale(duration)} cy={yScale(op.csht(duration))} r="5" fill={op.color} stroke="hsl(var(--background))" strokeWidth="2" />
                  )
              )}
            </svg>
          </div>

          {/* Slider + readouts */}
          <div className="mt-4 p-4 rounded-lg border-2" style={{ borderColor: active.color, backgroundColor: `${active.color}10` }}>
            <label className="block text-sm font-medium text-foreground mb-2">
              Infusion duration: <span className="font-bold" style={{ color: active.color }}>{duration} min</span> ({(duration / 60).toFixed(1)} h)
            </label>
            <input
              type="range"
              min={0}
              max={600}
              step={10}
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full mb-3 accent-foreground"
            />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {opioids.map((op) => (
                <div key={op.id} className="p-2 rounded bg-background border-2" style={{ borderColor: op.color }}>
                  <p className="text-muted-foreground">{op.name}</p>
                  <p className="font-bold text-base text-foreground">{Math.round(op.csht(duration))} min</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 p-4 rounded-lg border border-border bg-background">
            <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-2">What CSHT means</p>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>The time for plasma concentration to fall by <strong className="text-foreground">50%</strong> after stopping a continuous infusion that has maintained a steady plasma level.</li>
              <li>Depends on infusion duration because of accumulation in peripheral compartments — explains why fentanyl behaves very differently after a 30-min vs 6-h infusion.</li>
              <li><strong className="text-foreground">Remifentanil's CSHT is essentially flat at ~3 min</strong> regardless of duration — no clinically meaningful accumulation.</li>
              <li>Sufentanil unexpectedly performs well on prolonged infusion due to a large volume of distribution and re-distribution kinetics.</li>
            </ul>
          </div>
        </div>
      )}

      {/* METABOLISM */}
      {tab === "metabolism" && (
        <div>
          <div className="w-full overflow-x-auto">
            <svg viewBox="0 0 800 360" className="w-full h-auto" style={{ minWidth: 600 }}>
              <defs>
                <marker id="arrRem" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--muted-foreground))" />
                </marker>
              </defs>

              {/* Remifentanil molecule simplified */}
              <rect x="40" y="40" width="200" height="60" rx="8" fill="hsl(0 70% 55%)" opacity="0.15" stroke="hsl(0 70% 55%)" strokeWidth="2" />
              <text x="140" y="62" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="700">Remifentanil</text>
              <text x="140" y="78" textAnchor="middle" className="fill-muted-foreground" fontSize="10">piperidine + methyl ester</text>
              <text x="140" y="92" textAnchor="middle" className="fill-foreground" fontSize="10" fontWeight="600">‒CO‒O‒CH₃</text>

              {/* Arrow → cleavage */}
              <line x1="240" y1="70" x2="320" y2="70" stroke="hsl(var(--muted-foreground))" strokeWidth="2" markerEnd="url(#arrRem)" />
              <text x="280" y="55" textAnchor="middle" className="fill-foreground" fontSize="10" fontWeight="600">esterases</text>
              <text x="280" y="92" textAnchor="middle" className="fill-muted-foreground" fontSize="9">ester hydrolysis</text>

              {/* Inactive metabolite */}
              <rect x="335" y="40" width="220" height="60" rx="8" fill="hsl(140 55% 45%)" opacity="0.15" stroke="hsl(140 55% 45%)" strokeWidth="2" />
              <text x="445" y="62" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="700">Remifentanil acid (GR90291)</text>
              <text x="445" y="78" textAnchor="middle" className="fill-muted-foreground" fontSize="10">~1/4600 potency — inactive</text>
              <text x="445" y="92" textAnchor="middle" className="fill-foreground" fontSize="10" fontWeight="600">‒CO‒OH</text>

              {/* Arrow → renal */}
              <line x1="555" y1="70" x2="630" y2="70" stroke="hsl(var(--muted-foreground))" strokeWidth="2" markerEnd="url(#arrRem)" />
              <rect x="635" y="45" width="120" height="50" rx="6" fill="hsl(var(--background))" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
              <text x="695" y="65" textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="700">Renal</text>
              <text x="695" y="80" textAnchor="middle" className="fill-muted-foreground" fontSize="9">excretion</text>

              {/* Sites of metabolism */}
              <text x="40" y="150" className="fill-foreground" fontSize="12" fontWeight="700">Sites of esterase activity (organ-independent):</text>

              {[
                { x: 80, label: "Plasma", detail: "Non-specific esterases (NOT plasma cholinesterase)" },
                { x: 280, label: "RBC membrane", detail: "Erythrocyte esterases" },
                { x: 480, label: "Tissue esterases", detail: "Skeletal muscle, intestine, others" },
              ].map((site, i) => (
                <g key={i}>
                  <ellipse cx={site.x + 70} cy="200" rx="80" ry="30" fill="hsl(140 55% 45%)" opacity="0.2" stroke="hsl(140 55% 45%)" strokeWidth="1.5" />
                  <text x={site.x + 70} y="200" textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="700">{site.label}</text>
                  <text x={site.x + 70} y="215" textAnchor="middle" className="fill-muted-foreground" fontSize="9">{site.detail}</text>
                </g>
              ))}

              {/* Cross out liver/kidney as primary clearance */}
              <g>
                <rect x="80" y="265" width="200" height="50" rx="8" fill="hsl(var(--background))" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" strokeDasharray="3 3" />
                <text x="180" y="290" textAnchor="middle" className="fill-muted-foreground" fontSize="11" fontWeight="600">Hepatic CYP450</text>
                <text x="180" y="305" textAnchor="middle" className="fill-muted-foreground" fontSize="9">NOT involved in clearance</text>
                <line x1="95" y1="270" x2="265" y2="310" stroke="hsl(0 70% 55%)" strokeWidth="2.5" />
              </g>

              <g>
                <rect x="320" y="265" width="200" height="50" rx="8" fill="hsl(var(--background))" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" strokeDasharray="3 3" />
                <text x="420" y="290" textAnchor="middle" className="fill-muted-foreground" fontSize="11" fontWeight="600">Renal clearance (parent)</text>
                <text x="420" y="305" textAnchor="middle" className="fill-muted-foreground" fontSize="9">NOT required (only metabolite)</text>
                <line x1="335" y1="270" x2="505" y2="310" stroke="hsl(0 70% 55%)" strokeWidth="2.5" />
              </g>

              <g>
                <rect x="560" y="265" width="200" height="50" rx="8" fill="hsl(140 55% 45%)" opacity="0.15" stroke="hsl(140 55% 45%)" strokeWidth="2" />
                <text x="660" y="290" textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="700">Plasma cholinesterase</text>
                <text x="660" y="305" textAnchor="middle" className="fill-muted-foreground" fontSize="9">also NOT involved — unaffected by deficiency</text>
              </g>
            </svg>
          </div>

          <div className="mt-4 p-4 rounded-lg border border-border bg-background">
            <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-2">Pharmacokinetic consequences</p>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li><strong className="text-foreground">Clearance ~40 mL/kg/min</strong> — far exceeds liver blood flow, confirming extra-hepatic metabolism.</li>
              <li><strong className="text-foreground">Elimination half-life 3–10 min</strong>; ester hydrolysis is so rapid that clearance equals or exceeds redistribution.</li>
              <li><strong className="text-foreground">Unaffected by:</strong> hepatic failure, renal failure (parent drug), pseudocholinesterase deficiency, age, sex.</li>
              <li><strong className="text-foreground">Pharmacokinetics in renal failure:</strong> the inactive acid metabolite GR90291 accumulates but is &gt;4000× less potent — safe in CKD/AKI.</li>
              <li><strong className="text-foreground">Solvent:</strong> formulated with glycine — historically contraindicated for neuraxial use due to neurotoxicity concern.</li>
            </ul>
          </div>
        </div>
      )}

      {/* CLINICAL */}
      {tab === "clinical" && (
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-lg border-2" style={{ borderColor: "hsl(140 55% 45%)", backgroundColor: "hsl(140 55% 45% / 0.1)" }}>
              <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "hsl(140 55% 45%)" }}>Advantages</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li><strong className="text-foreground">Predictable, rapid offset</strong> — wake-up time independent of infusion length</li>
                <li>Ideal for <strong className="text-foreground">neurosurgery</strong> (rapid neuro assessment), <strong className="text-foreground">bariatric</strong>, <strong className="text-foreground">day surgery</strong></li>
                <li>Excellent <strong className="text-foreground">TIVA partner</strong> with propofol — reliable hypnosis + analgesia</li>
                <li>Allows <strong className="text-foreground">deep intraoperative analgesia</strong> without postop residual sedation</li>
                <li>Useful in <strong className="text-foreground">organ failure</strong> — no dose adjustment for hepatic or renal disease</li>
                <li><strong className="text-foreground">Awake fibreoptic intubation</strong> — TCI mode for cooperative sedation</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border-2" style={{ borderColor: "hsl(0 70% 55%)", backgroundColor: "hsl(0 70% 55% / 0.1)" }}>
              <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "hsl(0 70% 55%)" }}>Disadvantages & pitfalls</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li><strong className="text-foreground">No postoperative analgesia</strong> — must overlap with longer-acting opioid (morphine, oxycodone) ~30 min before stopping</li>
                <li><strong className="text-foreground">Acute opioid tolerance & OIH</strong> — particularly with high doses (&gt;0.3 µg/kg/min) over &gt;90 min (Fletcher & Martinez, BJA 2014)</li>
                <li><strong className="text-foreground">Bradycardia & hypotension</strong> — vagally mediated, especially with bolus dosing</li>
                <li><strong className="text-foreground">Severe muscle rigidity</strong> if bolused (avoid bolus on induction without NMBA)</li>
                <li><strong className="text-foreground">Cost</strong> — significantly more expensive than alternatives</li>
                <li><strong className="text-foreground">Pump errors</strong> — rapid recovery means small infusion interruptions cause sudden awareness or pain</li>
              </ul>
            </div>
          </div>

          <div className="p-4 rounded-lg border border-border bg-background">
            <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-2">Typical dosing</p>
            <div className="grid sm:grid-cols-3 gap-2 text-sm">
              <div className="p-2 rounded border border-border">
                <p className="text-foreground font-semibold">Induction</p>
                <p className="text-muted-foreground text-xs">0.5–1 µg/kg over 60–90 s (avoid bolus → rigidity)</p>
              </div>
              <div className="p-2 rounded border border-border">
                <p className="text-foreground font-semibold">Maintenance</p>
                <p className="text-muted-foreground text-xs">0.05–0.5 µg/kg/min IV; titrate to surgical stimulus</p>
              </div>
              <div className="p-2 rounded border border-border">
                <p className="text-foreground font-semibold">TCI (Minto model)</p>
                <p className="text-muted-foreground text-xs">Target Ce 2–8 ng/mL</p>
              </div>
              <div className="p-2 rounded border border-border">
                <p className="text-foreground font-semibold">Sedation</p>
                <p className="text-muted-foreground text-xs">0.025–0.1 µg/kg/min</p>
              </div>
              <div className="p-2 rounded border border-border">
                <p className="text-foreground font-semibold">Labour analgesia (PCA)</p>
                <p className="text-muted-foreground text-xs">20–40 µg bolus, 2-min lockout — must have 1:1 midwifery</p>
              </div>
              <div className="p-2 rounded border border-border">
                <p className="text-foreground font-semibold">Cardiac surgery</p>
                <p className="text-muted-foreground text-xs">0.25–1 µg/kg/min — fast-track extubation</p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg border border-border bg-card">
            <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-2">Mitigating remifentanil-induced hyperalgesia</p>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Co-administer <strong className="text-foreground">ketamine</strong> (0.15–0.5 mg/kg bolus or 0.1–0.25 mg/kg/h)</li>
              <li><strong className="text-foreground">IV magnesium</strong> 30–50 mg/kg bolus then 6–15 mg/kg/h</li>
              <li><strong className="text-foreground">Limit infusion rate</strong> to lowest effective dose; avoid sustained high doses</li>
              <li>Transition to <strong className="text-foreground">long-acting opioid</strong> (morphine 0.1–0.15 mg/kg) 20–30 min before emergence</li>
              <li>Maximise <strong className="text-foreground">multimodal analgesia</strong> and consider regional techniques</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// ---- Decision-aid logic ----
type Answer = "yes" | "no" | "unknown";
interface Q { id: string; text: string; }
const QUESTIONS: Q[] = [
  { id: "apnoea", text: "Apnoeic / RR < 8 / cyanotic (life-threatening respiratory depression)?" },
  { id: "chronic", text: "Chronic opioid user (maintenance methadone/buprenorphine, palliative, long-term Rx)?" },
  { id: "bupren", text: "Suspected buprenorphine or methadone (long-acting, high-affinity)?" },
  { id: "polypharm", text: "Co-ingested sedatives (BZD, alcohol, GHB) contributing to coma?" },
  { id: "iatrogenic", text: "Iatrogenic — procedural opioid in an opioid-naïve patient?" },
];

interface Verdict {
  give: "give" | "withhold" | "caution";
  headline: string;
  detail: string;
  dose: string;
}

const decide = (a: Record<string, Answer>): Verdict => {
  // Override: if no apnoea, no urgent need
  if (a.apnoea === "no") {
    return {
      give: "withhold",
      headline: "Withhold — no life-threatening depression",
      detail: "Naloxone is for respiratory failure, not sedation. Drowsy but breathing patients (RR ≥ 10, SpO₂ maintained) should be observed, not reversed. Empirical naloxone can precipitate withdrawal, pulmonary oedema, arrhythmia and severe pain.",
      dose: "—",
    };
  }
  if (a.iatrogenic === "yes") {
    return {
      give: "give",
      headline: "Give — iatrogenic opioid reversal",
      detail: "Procedural opioid over-shoot in an opioid-naïve patient is the textbook indication. Use small titrated doses to restore ventilation without abolishing analgesia.",
      dose: "40 µg IV every 2 min (dilute 400 µg in 10 mL → 40 µg/mL). Stop when RR ≥ 10.",
    };
  }
  if (a.bupren === "yes" || a.bupren === "unknown") {
    return {
      give: "caution",
      headline: "Caution — buprenorphine / methadone OD",
      detail: "Buprenorphine: very high µ affinity (Kd ~0.2 nM), slow dissociation → standard naloxone often fails. Methadone: t½ 15–60 h far outlasts naloxone (~30 min) → guaranteed re-narcotisation. Both require an INFUSION and prolonged monitoring (12–24 h).",
      dose: "Bolus 0.4–2 mg IV (may need 10–30 mg total for buprenorphine), then infusion 2/3 of effective bolus per hour.",
    };
  }
  if (a.chronic === "yes") {
    return {
      give: "caution",
      headline: "Caution — chronic opioid user",
      detail: "Aim to restore ventilation, NOT to wake fully. Full reversal precipitates acute withdrawal: agitation, hypertension, tachycardia, vomiting (aspiration risk), pulmonary oedema, severe pain, arrhythmia. Use the smallest dose that works.",
      dose: "40 µg IV q2 min titrated to RR ≥ 10. Most respond to ≤ 200 µg cumulative.",
    };
  }
  if (a.polypharm === "yes") {
    return {
      give: "give",
      headline: "Give — opioid component is reversible",
      detail: "Naloxone reverses only the opioid contribution. Sedation from BZDs/alcohol persists — patient may still need airway protection. Be ready to support ventilation; do NOT give flumazenil if mixed.",
      dose: "0.4 mg IV, repeat q2 min, titrate to ventilation. Consider infusion if long-acting opioid suspected.",
    };
  }
  if (a.apnoea === "yes") {
    return {
      give: "give",
      headline: "Give — opioid-naïve respiratory failure",
      detail: "Pure opioid OD with apnoea in an opioid-naïve patient: full reversal is appropriate. Anticipate emergence agitation; have suction ready.",
      dose: "0.4–2 mg IV (or 0.4 mg IM if no IV access). Repeat q2 min to max 10 mg before reconsidering diagnosis.",
    };
  }
  return {
    give: "withhold",
    headline: "Insufficient information",
    detail: "Answer the apnoea question first — naloxone is reserved for respiratory failure, not coma alone.",
    dose: "—",
  };
};

// ---- Concentration-vs-time curve ----
const SCENARIOS = [
  { id: "heroin", label: "Heroin (t½ ≈ 30 min, active metabolites 2–4 h)", parentT: 60, color: "hsl(140 60% 45%)" },
  { id: "morphine", label: "Morphine IV (t½ ≈ 2–4 h, M6G longer)", parentT: 180, color: "hsl(200 65% 50%)" },
  { id: "methadone", label: "Methadone (t½ 15–60 h)", parentT: 1800, color: "hsl(280 65% 55%)" },
  { id: "bupren", label: "Buprenorphine (t½ ≈ 24–37 h, slow off-rate)", parentT: 1800, color: "hsl(330 65% 55%)" },
];

const NALOXONE_T = 35; // min IV elimination half-life (range 30–80, clinical effect ~30–60 min)

export const NaloxoneDiagram = () => {
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [scenarioId, setScenarioId] = useState(SCENARIOS[0].id);
  const verdict = useMemo(() => decide(answers), [answers]);
  const scenario = SCENARIOS.find((s) => s.id === scenarioId)!;

  const setAns = (id: string, v: Answer) => setAnswers((s) => ({ ...s, [id]: v }));
  const reset = () => setAnswers({});

  const W = 640, H = 240, PAD_L = 50, PAD_R = 16, PAD_T = 16, PAD_B = 36;
  const X_MAX = 360;
  const x = (m: number) => PAD_L + (m / X_MAX) * (W - PAD_L - PAD_R);
  const y = (frac: number) => H - PAD_B - frac * (H - PAD_T - PAD_B);

  const curve = (halfMin: number) => {
    const pts: string[] = [];
    for (let m = 0; m <= X_MAX; m += 4) {
      const f = Math.pow(0.5, m / halfMin);
      pts.push(`${x(m).toFixed(1)},${y(f).toFixed(1)}`);
    }
    return `M ${pts.join(" L ")}`;
  };

  const naloxoneCurve = curve(NALOXONE_T);
  const parentCurve = curve(scenario.parentT);
  const naloxoneGoneAt = -NALOXONE_T * Math.log2(0.1); // ≈ 116 min

  const verdictTone =
    verdict.give === "give"
      ? "border-primary/50 bg-primary/10"
      : verdict.give === "withhold"
      ? "border-destructive/40 bg-destructive/5"
      : "border-amber-500/50 bg-amber-500/5";

  return (
            <Card className="p-4 sm:p-6 my-6 bg-card border-border">
      <h3 className="text-lg font-serif font-bold text-foreground mb-1">
        Naloxone — Mechanism, Kinetics &amp; Decision Aid
      </h3>
      <p className="text-xs text-muted-foreground mb-4">
        Competitive µ / κ / δ antagonist. Reverses opioid respiratory depression — but t½ (~35 min) is shorter than nearly
        every opioid it reverses. Re-narcotisation is the rule, not the exception.
      </p>

      <Tabs defaultValue="mech" className="w-full">
        <TabsList className="grid grid-cols-4 w-full mb-4">
          <TabsTrigger value="mech">Mechanism</TabsTrigger>
          <TabsTrigger value="kinetics">Kinetics</TabsTrigger>
          <TabsTrigger value="dosing">Dosing</TabsTrigger>
          <TabsTrigger value="decide">Decision aid</TabsTrigger>
        </TabsList>

        {/* === MECHANISM === */}
        <TabsContent value="mech" className="space-y-3">
          <div className="rounded-lg border border-border bg-secondary/20 p-3">
            <svg viewBox="0 0 640 220" className="w-full h-auto">
              {/* Receptor cartoon */}
              <ellipse cx="320" cy="120" rx="180" ry="60" fill="hsl(var(--muted))" opacity="0.35" stroke="hsl(var(--border))" />
              <text x="320" y="195" textAnchor="middle" fontSize="10" className="fill-muted-foreground">
                µ / κ / δ G-protein coupled receptor (membrane)
              </text>

              {/* µ receptor */}
              <circle cx="260" cy="120" r="32" fill="hsl(var(--pharmacology))" opacity="0.85" />
              <text x="260" y="124" textAnchor="middle" fontSize="14" fontWeight="700" className="fill-primary-foreground">µ</text>

              {/* κ receptor */}
              <circle cx="340" cy="120" r="26" fill="hsl(var(--icu))" opacity="0.7" />
              <text x="340" y="124" textAnchor="middle" fontSize="12" fontWeight="700" className="fill-primary-foreground">κ</text>

              {/* binding pocket */}
              <rect x="244" y="108" width="32" height="24" rx="4" fill="hsl(var(--background))"
                stroke="hsl(var(--foreground))" strokeDasharray="2 2" />
              <text x="260" y="100" textAnchor="middle" fontSize="8" className="fill-muted-foreground">orthosteric site</text>

              {/* Opioid agonist from left */}
              <g>
                <circle cx="160" cy="120" r="14" fill="hsl(140 60% 45%)" opacity="0.9">
                  <animate attributeName="cx" values="160;245;160" dur="3.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.9;0.3;0.9" dur="3.5s" repeatCount="indefinite" />
                </circle>
                <text x="160" y="148" textAnchor="middle" fontSize="9" fontWeight="600" className="fill-foreground">Opioid agonist</text>
              </g>

              {/* Naloxone from right - displaces */}
              <g>
                <circle cx="500" cy="120" r="14" fill="hsl(0 75% 55%)" opacity="0.95">
                  <animate attributeName="cx" values="500;270;270;500;500" dur="3.5s" repeatCount="indefinite" />
                </circle>
                <text x="500" y="148" textAnchor="middle" fontSize="9" fontWeight="600" className="fill-foreground">Naloxone</text>
              </g>

              {/* labels */}
              <path d="M 220 50 L 240 70" stroke="hsl(var(--foreground))" strokeWidth="1" markerEnd="url(#nx-arr)" />
              <text x="170" y="46" fontSize="9" className="fill-foreground" fontWeight="600">Agonist → ↓ cAMP, K⁺ efflux → analgesia + ↓RR</text>

              <path d="M 460 50 L 440 70" stroke="hsl(var(--destructive))" strokeWidth="1" markerEnd="url(#nx-arr-r)" />
              <text x="440" y="46" fontSize="9" className="fill-destructive" fontWeight="600">Antagonist → no signalling</text>

              <defs>
                <marker id="nx-arr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                  <path d="M0,0 L8,4 L0,8 Z" fill="hsl(var(--foreground))" />
                </marker>
                <marker id="nx-arr-r" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                  <path d="M0,0 L8,4 L0,8 Z" fill="hsl(var(--destructive))" />
                </marker>
              </defs>
            </svg>
          </div>

          <div className="grid sm:grid-cols-2 gap-2 text-xs">
            <div className="rounded-md p-3 bg-secondary/30 border border-border">
              <p className="font-semibold text-foreground mb-1">Pure competitive antagonism</p>
              <p className="text-muted-foreground">
                N-allyl derivative of oxymorphone. High µ affinity (greatest), modest κ/δ. <strong>Zero intrinsic activity</strong> —
                no analgesia, no respiratory depression alone. Effect depends on relative concentration vs the agonist at the receptor.
              </p>
            </div>
            <div className="rounded-md p-3 bg-secondary/30 border border-border">
              <p className="font-semibold text-foreground mb-1">Affinity hierarchy matters</p>
              <ul className="text-muted-foreground list-disc list-inside space-y-0.5">
                <li><strong>Buprenorphine</strong>: Kd ~0.2 nM, slow off-rate → naloxone often ineffective at standard doses</li>
                <li><strong>Fentanyl, methadone, morphine</strong>: readily displaced by naloxone</li>
                <li>Reversal of analgesia + sympathetic surge is intrinsic to the mechanism — not a side effect</li>
              </ul>
            </div>
          </div>
        </TabsContent>

        {/* === KINETICS === */}
        <TabsContent value="kinetics" className="space-y-3">
          <div className="flex flex-wrap gap-1.5">
            {SCENARIOS.map((s) => (
              <button
                key={s.id}
                onClick={() => setScenarioId(s.id)}
                className={`px-2.5 py-1 text-[11px] rounded-md border transition-all ${
                  scenarioId === s.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-secondary/30 text-foreground border-border hover:bg-secondary/50"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="rounded-lg border border-border bg-secondary/10 p-2">
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
              {[0, 0.25, 0.5, 0.75, 1].map((f) => (
                <g key={f}>
                  <line x1={PAD_L} x2={W - PAD_R} y1={y(f)} y2={y(f)} stroke="hsl(var(--border))" strokeDasharray="2 3" opacity="0.5" />
                  <text x={PAD_L - 6} y={y(f) + 3} textAnchor="end" fontSize="9" className="fill-muted-foreground">
                    {(f * 100).toFixed(0)}%
                  </text>
                </g>
              ))}
              {[0, 60, 120, 180, 240, 300, 360].map((m) => (
                <g key={m}>
                  <line x1={x(m)} x2={x(m)} y1={PAD_T} y2={H - PAD_B} stroke="hsl(var(--border))" strokeDasharray="2 3" opacity="0.4" />
                  <text x={x(m)} y={H - PAD_B + 14} textAnchor="middle" fontSize="9" className="fill-muted-foreground">
                    {m === 0 ? "0" : m < 60 ? `${m}m` : `${m / 60}h`}
                  </text>
                </g>
              ))}

              <line x1={PAD_L} y1={H - PAD_B} x2={W - PAD_R} y2={H - PAD_B} stroke="hsl(var(--foreground))" />
              <line x1={PAD_L} y1={PAD_T} x2={PAD_L} y2={H - PAD_B} stroke="hsl(var(--foreground))" />

              {/* Re-narcotisation band */}
              <rect x={PAD_L} y={y(0.5)} width={W - PAD_L - PAD_R} height={y(0.25) - y(0.5)}
                fill="hsl(var(--destructive))" opacity="0.08" />
              <text x={W - PAD_R - 4} y={y(0.4)} textAnchor="end" fontSize="9" className="fill-destructive" fontWeight="600">
                Re-narcotisation risk band
              </text>

              {/* Parent opioid */}
              <path d={parentCurve} fill="none" stroke={scenario.color} strokeWidth="2" />
              {/* Naloxone */}
              <path d={naloxoneCurve} fill="none" stroke="hsl(0 75% 55%)" strokeWidth="2" />

              {naloxoneGoneAt < X_MAX && (
                <g>
                  <line x1={x(naloxoneGoneAt)} x2={x(naloxoneGoneAt)} y1={PAD_T} y2={H - PAD_B}
                    stroke="hsl(var(--destructive))" strokeDasharray="4 3" />
                  <text x={x(naloxoneGoneAt) + 4} y={PAD_T + 12} fontSize="9" className="fill-destructive" fontWeight="600">
                    naloxone &lt; 10%
                  </text>
                </g>
              )}

              <g transform="translate(60, 16)">
                <rect x="0" y="0" width="10" height="10" fill="hsl(0 75% 55%)" />
                <text x="14" y="9" fontSize="10" className="fill-foreground">Naloxone (t½ ≈ 35 min)</text>
                <rect x="180" y="0" width="10" height="10" fill={scenario.color} />
                <text x="194" y="9" fontSize="10" className="fill-foreground">{scenario.label}</text>
              </g>

              <text x={W / 2} y={H - 4} textAnchor="middle" fontSize="10" fontWeight="600" className="fill-foreground">
                Time after single dose (min)
              </text>
            </svg>
          </div>

          <div className="rounded-md p-3 bg-destructive/5 border border-destructive/30 text-xs">
            <p className="font-semibold text-foreground mb-1">⚠ Re-narcotisation</p>
            <p className="text-muted-foreground">
              Naloxone clears faster than every opioid except remifentanil. After heroin, expect re-narcotisation at <strong>20–60 min</strong>;
              after methadone or buprenorphine it is inevitable. <strong>Minimum 4 h observation post-dose; 12–24 h + infusion for long-acting opioids.</strong>
              Patients who "wake up and walk out" are at high risk of fatal late respiratory arrest.
            </p>
          </div>
        </TabsContent>

        {/* === DOSING === */}
        <TabsContent value="dosing" className="space-y-3">
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="rounded-lg border border-primary/40 bg-primary/5 p-3">
              <p className="text-xs font-semibold text-foreground mb-2">Iatrogenic / chronic user (titrated)</p>
              <ol className="text-xs text-muted-foreground space-y-1.5 list-decimal list-inside">
                <li>Dilute 400 µg in 10 mL saline → <strong className="text-foreground">40 µg/mL</strong></li>
                <li><strong className="text-foreground">40 µg IV</strong> q2 min</li>
                <li>Endpoint = RR ≥ 10, SpO₂ &gt; 92% — NOT full alertness</li>
                <li>Most respond to cumulative <strong className="text-foreground">100–200 µg</strong></li>
                <li>If recurrent: infusion <strong className="text-foreground">2/3 of effective bolus / hour</strong></li>
              </ol>
            </div>
            <div className="rounded-lg border border-border bg-secondary/20 p-3">
              <p className="text-xs font-semibold text-foreground mb-2">Out-of-hospital / unknown OD</p>
              <ol className="text-xs text-muted-foreground space-y-1.5 list-decimal list-inside">
                <li><strong className="text-foreground">0.4–2 mg IV</strong> (or 0.4 mg IM, or 1.6–4 mg IN)</li>
                <li>Repeat q2–3 min, titrated to RR</li>
                <li>If no response by <strong className="text-foreground">10 mg total</strong> → reconsider diagnosis</li>
                <li>Buprenorphine: <strong className="text-foreground">2 mg bolus then 4 mg/h infusion</strong> may be needed</li>
                <li>Methadone: anticipate ≥ 24 h infusion + monitoring</li>
              </ol>
            </div>
          </div>

          <div className="rounded-md p-3 bg-secondary/30 border border-border text-xs">
            <p className="font-semibold text-foreground mb-1.5">Pharmacokinetic snapshot</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                ["Onset (IV)", "1–2 min"],
                ["Onset (IM/IN)", "2–5 min"],
                ["Duration", "30–60 min"],
                ["Elim. t½", "~30–80 min"],
                ["Vd", "2–3 L/kg"],
                ["Clearance", "~22 mL/min/kg"],
                ["Protein binding", "~45%"],
                ["Metabolism", "Hepatic glucuronidation → inactive"],
              ].map(([k, v]) => (
                <div key={k} className="bg-card rounded p-1.5 border border-border">
                  <p className="text-[9px] uppercase text-muted-foreground tracking-wide">{k}</p>
                  <p className="text-[11px] font-mono text-foreground">{v}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-md p-3 bg-amber-500/5 border border-amber-500/30 text-xs">
            <p className="font-semibold text-foreground mb-1">⚠ Reversal hazards</p>
            <ul className="text-muted-foreground list-disc list-inside space-y-0.5">
              <li>Acute withdrawal in dependent patients (agitation, vomiting, HTN, tachycardia)</li>
              <li>Non-cardiogenic <strong>pulmonary oedema</strong> — especially after large IV boluses</li>
              <li>Ventricular arrhythmia, asystole — sympathetic surge</li>
              <li>Severe pain (loss of analgesia in postop / cancer / trauma patients)</li>
              <li>Aspiration as airway reflexes return alongside vomiting</li>
            </ul>
          </div>
        </TabsContent>

        {/* === DECISION AID === */}
        <TabsContent value="decide" className="space-y-3">
          <div className="rounded-lg border border-border bg-secondary/20 p-4 space-y-3">
            {QUESTIONS.map((q) => (
              <div key={q.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <p className="text-xs text-foreground flex-1">{q.text}</p>
                <div className="flex gap-1">
                  {(["yes", "no", "unknown"] as Answer[]).map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setAns(q.id, opt)}
                      className={`px-2.5 py-1 text-[10px] rounded-md border capitalize transition-all ${
                        answers[q.id] === opt
                          ? opt === "yes"
                            ? "bg-destructive text-destructive-foreground border-destructive"
                            : opt === "no"
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-muted text-foreground border-border"
                          : "bg-card text-muted-foreground border-border hover:bg-secondary/50"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <button
              onClick={reset}
              className="text-[11px] text-muted-foreground underline hover:text-foreground"
            >
              Reset answers
            </button>
          </div>

          <div className={`rounded-lg border p-3 ${verdictTone}`}>
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Verdict</p>
            <p className="text-sm font-semibold text-foreground mb-1">{verdict.headline}</p>
            <p className="text-xs text-muted-foreground leading-relaxed mb-2">{verdict.detail}</p>
            {verdict.dose !== "—" && (
              <div className="rounded-md bg-card border border-border p-2 mt-2">
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Suggested regimen</p>
                <p className="text-xs font-mono text-foreground">{verdict.dose}</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default NaloxoneDiagram;

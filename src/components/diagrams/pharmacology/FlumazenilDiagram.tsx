import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// ---- Decision-aid logic ----
type Answer = "yes" | "no" | "unknown";
interface Q { id: string; text: string; }
const QUESTIONS: Q[] = [
  { id: "knownBzd", text: "Is the ingestion known to be benzodiazepine-only?" },
  { id: "tca", text: "Any suspicion of co-ingested TCA / pro-convulsant (cocaine, bupropion, isoniazid)?" },
  { id: "chronic", text: "Chronic benzodiazepine user (dependence / long-term Rx)?" },
  { id: "seizureHx", text: "History of seizure disorder?" },
  { id: "iatrogenic", text: "Iatrogenic over-sedation from procedural midazolam (no chronic use, no co-ingestion)?" },
];

interface Verdict {
  give: "give" | "withhold" | "caution";
  headline: string;
  detail: string;
}

const decide = (a: Record<string, Answer>): Verdict => {
  if (a.iatrogenic === "yes") {
    return {
      give: "give",
      headline: "Give flumazenil — iatrogenic reversal indication",
      detail: "Procedural over-sedation in a non-dependent patient is the strongest indication. Titrate 100–200 µg IV every 60 s up to 1 mg.",
    };
  }
  if (a.tca === "yes" || a.tca === "unknown") {
    return {
      give: "withhold",
      headline: "Withhold — risk of unmasking pro-convulsant",
      detail: "BZD provides seizure protection in TCA / cocaine / mixed OD. Reversing it can precipitate refractory seizures and arrhythmias.",
    };
  }
  if (a.seizureHx === "yes") {
    return {
      give: "withhold",
      headline: "Withhold — known seizure disorder",
      detail: "Flumazenil lowers seizure threshold; absolute caution in epilepsy on chronic BZD therapy.",
    };
  }
  if (a.chronic === "yes") {
    return {
      give: "caution",
      headline: "Caution — chronic BZD use",
      detail: "Risk of acute withdrawal seizures. Reserve for life-threatening respiratory failure where intubation is undesirable; use small doses (100 µg).",
    };
  }
  if (a.knownBzd === "yes") {
    return {
      give: "give",
      headline: "Give flumazenil — pure BZD overdose, no contraindications",
      detail: "200 µg IV over 15 s, then 100 µg every 60 s to a max of 1 mg. Watch for resedation — flumazenil t½ ≈ 50 min, often < parent BZD.",
    };
  }
  return {
    give: "withhold",
    headline: "Withhold — diagnostic uncertainty",
    detail: "When ingestion is unknown, supportive care + airway protection is safer than empirical reversal. Flumazenil is NOT a diagnostic test.",
  };
};

// ---- Concentration-vs-time curve ----
const SCENARIOS = [
  { id: "midaz", label: "Midazolam (t½ ≈ 2 h)", parentT: 120, parentMET: false },
  { id: "midazAKI", label: "Midazolam in AKI (t½ ≈ 8 h)", parentT: 480, parentMET: true },
  { id: "diaz", label: "Diazepam (t½ 20–80 h)", parentT: 1800, parentMET: true },
  { id: "loraz", label: "Lorazepam (t½ ≈ 14 h)", parentT: 840, parentMET: false },
];

const FLUMAZENIL_T = 50; // min

export const FlumazenilDiagram = () => {
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [scenarioId, setScenarioId] = useState(SCENARIOS[0].id);
  const verdict = useMemo(() => decide(answers), [answers]);
  const scenario = SCENARIOS.find((s) => s.id === scenarioId)!;

  const setAns = (id: string, v: Answer) => setAnswers((s) => ({ ...s, [id]: v }));
  const reset = () => setAnswers({});

  // Build curves — exponential decay
  const W = 640, H = 240, PAD_L = 50, PAD_R = 16, PAD_T = 16, PAD_B = 36;
  const X_MAX = 360; // min visible
  const x = (m: number) => PAD_L + (m / X_MAX) * (W - PAD_L - PAD_R);
  const y = (frac: number) => H - PAD_B - frac * (H - PAD_T - PAD_B);

  const curve = (halfMin: number, color: string, dash?: string) => {
    const pts: string[] = [];
    for (let m = 0; m <= X_MAX; m += 4) {
      const f = Math.pow(0.5, m / halfMin);
      pts.push(`${x(m).toFixed(1)},${y(f).toFixed(1)}`);
    }
    return { d: `M ${pts.join(" L ")}`, color, dash };
  };

  const flumCurve = curve(FLUMAZENIL_T, "hsl(0 75% 55%)");
  const parentCurve = curve(scenario.parentT, "hsl(280 65% 60%)");

  // Resedation threshold ≈ 25% of starting plasma BZD
  // Time when flumazenil falls below clinically effective (~10% original)
  const flumGoneAt = -FLUMAZENIL_T * Math.log2(0.1); // ≈ 166 min

  return (
    <Card className="p-4 sm:p-6 my-6 bg-card border-border">
      <h3 className="text-lg font-serif font-bold text-foreground mb-1">
        Flumazenil — Mechanism, Kinetics &amp; Decision Aid
      </h3>
      <p className="text-xs text-muted-foreground mb-4">
        Imidazobenzodiazepine; competitive antagonist at the BZD site of GABA-A. Reverses sedation, amnesia,
        anticonvulsant action — but not respiratory depression of co-ingested opioids.
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
              {/* GABA-A receptor cartoon */}
              <ellipse cx="320" cy="120" rx="180" ry="60" fill="hsl(var(--muted))" opacity="0.35" stroke="hsl(var(--border))" />
              <text x="320" y="195" textAnchor="middle" fontSize="10" className="fill-muted-foreground">GABA-A pentamer (membrane)</text>

              {/* α subunit */}
              <circle cx="260" cy="120" r="32" fill="hsl(var(--pharmacology))" opacity="0.85" />
              <text x="260" y="124" textAnchor="middle" fontSize="11" fontWeight="700" className="fill-primary-foreground">α₁</text>

              {/* γ subunit */}
              <circle cx="340" cy="120" r="32" fill="hsl(var(--icu))" opacity="0.85" />
              <text x="340" y="124" textAnchor="middle" fontSize="11" fontWeight="700" className="fill-primary-foreground">γ₂</text>

              {/* BZD binding pocket marker */}
              <rect x="288" y="108" width="24" height="24" rx="4" fill="hsl(var(--background))" stroke="hsl(var(--foreground))" strokeDasharray="2 2" />
              <text x="300" y="100" textAnchor="middle" fontSize="8" className="fill-muted-foreground">BZD site</text>

              {/* Midazolam ligand approaching from left */}
              <g>
                <circle cx="160" cy="120" r="14" fill="hsl(280 65% 60%)" opacity="0.9">
                  <animate attributeName="cx" values="160;290;160" dur="3.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.9;0.3;0.9" dur="3.5s" repeatCount="indefinite" />
                </circle>
                <text x="160" y="148" textAnchor="middle" fontSize="9" fontWeight="600" className="fill-foreground">Midazolam</text>
              </g>

              {/* Flumazenil ligand from right - wins binding */}
              <g>
                <circle cx="500" cy="120" r="14" fill="hsl(0 75% 55%)" opacity="0.95">
                  <animate attributeName="cx" values="500;310;310;500;500" dur="3.5s" repeatCount="indefinite" />
                </circle>
                <text x="500" y="148" textAnchor="middle" fontSize="9" fontWeight="600" className="fill-foreground">Flumazenil</text>
              </g>

              {/* Cl- channel state arrows */}
              <path d="M 220 50 L 240 70" stroke="hsl(var(--foreground))" strokeWidth="1" markerEnd="url(#fz-arr)" />
              <text x="180" y="46" fontSize="9" className="fill-foreground" fontWeight="600">Agonist → ↑ Cl⁻ → sedation</text>

              <path d="M 460 50 L 440 70" stroke="hsl(var(--destructive))" strokeWidth="1" markerEnd="url(#fz-arr-r)" />
              <text x="440" y="46" fontSize="9" className="fill-destructive" fontWeight="600">Antagonist → no Cl⁻ shift</text>

              <defs>
                <marker id="fz-arr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                  <path d="M0,0 L8,4 L0,8 Z" fill="hsl(var(--foreground))" />
                </marker>
                <marker id="fz-arr-r" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                  <path d="M0,0 L8,4 L0,8 Z" fill="hsl(var(--destructive))" />
                </marker>
              </defs>
            </svg>
          </div>

          <div className="grid sm:grid-cols-2 gap-2 text-xs">
            <div className="rounded-md p-3 bg-secondary/30 border border-border">
              <p className="font-semibold text-foreground mb-1">Pure competitive antagonism</p>
              <p className="text-muted-foreground">
                Binds the same α/γ pocket as BZD agonists with high affinity but <strong>zero intrinsic activity</strong>
                — no GABA potentiation, no Cl⁻ flux change. Pure receptor occupation.
              </p>
            </div>
            <div className="rounded-md p-3 bg-secondary/30 border border-border">
              <p className="font-semibold text-foreground mb-1">What it does NOT reverse</p>
              <ul className="text-muted-foreground list-disc list-inside space-y-0.5">
                <li>Opioid respiratory depression</li>
                <li>Alcohol, propofol, barbiturate effects</li>
                <li>Z-drugs (zolpidem, zopiclone) <em>partially</em> at higher doses</li>
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
              {/* gridlines y */}
              {[0, 0.25, 0.5, 0.75, 1].map((f) => (
                <g key={f}>
                  <line x1={PAD_L} x2={W - PAD_R} y1={y(f)} y2={y(f)} stroke="hsl(var(--border))" strokeDasharray="2 3" opacity="0.5" />
                  <text x={PAD_L - 6} y={y(f) + 3} textAnchor="end" fontSize="9" className="fill-muted-foreground">
                    {(f * 100).toFixed(0)}%
                  </text>
                </g>
              ))}
              {/* gridlines x */}
              {[0, 60, 120, 180, 240, 300, 360].map((m) => (
                <g key={m}>
                  <line x1={x(m)} x2={x(m)} y1={PAD_T} y2={H - PAD_B} stroke="hsl(var(--border))" strokeDasharray="2 3" opacity="0.4" />
                  <text x={x(m)} y={H - PAD_B + 14} textAnchor="middle" fontSize="9" className="fill-muted-foreground">
                    {m === 0 ? "0" : m < 60 ? `${m}m` : `${m / 60}h`}
                  </text>
                </g>
              ))}

              {/* axes */}
              <line x1={PAD_L} y1={H - PAD_B} x2={W - PAD_R} y2={H - PAD_B} stroke="hsl(var(--foreground))" />
              <line x1={PAD_L} y1={PAD_T} x2={PAD_L} y2={H - PAD_B} stroke="hsl(var(--foreground))" />

              {/* Resedation threshold band */}
              <rect x={PAD_L} y={y(0.5)} width={W - PAD_L - PAD_R} height={y(0.25) - y(0.5)}
                fill="hsl(var(--destructive))" opacity="0.08" />
              <text x={W - PAD_R - 4} y={y(0.4)} textAnchor="end" fontSize="9" className="fill-destructive" fontWeight="600">
                Resedation risk band
              </text>

              {/* Parent BZD */}
              <path d={parentCurve.d} fill="none" stroke={parentCurve.color} strokeWidth="2" />
              {/* Flumazenil */}
              <path d={flumCurve.d} fill="none" stroke={flumCurve.color} strokeWidth="2" />

              {/* Marker: flumazenil clinically gone */}
              {flumGoneAt < X_MAX && (
                <g>
                  <line x1={x(flumGoneAt)} x2={x(flumGoneAt)} y1={PAD_T} y2={H - PAD_B}
                    stroke="hsl(var(--destructive))" strokeDasharray="4 3" />
                  <text x={x(flumGoneAt) + 4} y={PAD_T + 12} fontSize="9" className="fill-destructive" fontWeight="600">
                    flumazenil &lt; 10%
                  </text>
                </g>
              )}

              {/* Legend */}
              <g transform="translate(60, 16)">
                <rect x="0" y="0" width="10" height="10" fill="hsl(0 75% 55%)" />
                <text x="14" y="9" fontSize="10" className="fill-foreground">Flumazenil (t½ ≈ 50 min)</text>
                <rect x="180" y="0" width="10" height="10" fill="hsl(280 65% 60%)" />
                <text x="194" y="9" fontSize="10" className="fill-foreground">{scenario.label}</text>
              </g>

              {/* axis labels */}
              <text x={W / 2} y={H - 4} textAnchor="middle" fontSize="10" fontWeight="600" className="fill-foreground">
                Time after single dose (min)
              </text>
            </svg>
          </div>

          <div className="rounded-md p-3 bg-destructive/5 border border-destructive/30 text-xs">
            <p className="font-semibold text-foreground mb-1">⚠ Resedation</p>
            <p className="text-muted-foreground">
              Flumazenil's elimination t½ (≈ 50 min) is shorter than nearly every parent BZD —
              resedation typically appears at <strong>30–60 min</strong> post-bolus and is the rule, not the exception,
              after long-acting agents (diazepam, lorazepam, midazolam-glucuronide in AKI).
              <strong> Patients require ≥ 2 h post-dose monitoring; consider an infusion.</strong>
            </p>
          </div>
        </TabsContent>

        {/* === DOSING === */}
        <TabsContent value="dosing" className="space-y-3">
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="rounded-lg border border-primary/40 bg-primary/5 p-3">
              <p className="text-xs font-semibold text-foreground mb-2">Iatrogenic reversal (procedural)</p>
              <ol className="text-xs text-muted-foreground space-y-1.5 list-decimal list-inside">
                <li><strong className="text-foreground">200 µg</strong> IV over 15 s</li>
                <li>Wait 60 s — assess</li>
                <li>If inadequate: <strong className="text-foreground">100 µg</strong> increments q60 s</li>
                <li>Max <strong className="text-foreground">1 mg</strong> per episode (typical effective 300–600 µg)</li>
                <li>Cumulative max <strong className="text-foreground">2 mg / h</strong></li>
              </ol>
            </div>
            <div className="rounded-lg border border-border bg-secondary/20 p-3">
              <p className="text-xs font-semibold text-foreground mb-2">BZD overdose</p>
              <ol className="text-xs text-muted-foreground space-y-1.5 list-decimal list-inside">
                <li><strong className="text-foreground">300 µg</strong> IV over 15 s</li>
                <li>Then 100 µg q60 s, max 2 mg total</li>
                <li>If recurrent: <strong className="text-foreground">infusion 100–400 µg/h</strong></li>
                <li>Titrate to RR &gt; 10 / GCS protective, not to full alertness</li>
              </ol>
            </div>
          </div>

          <div className="rounded-md p-3 bg-secondary/30 border border-border text-xs">
            <p className="font-semibold text-foreground mb-1.5">Pharmacokinetic snapshot</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                ["Onset (IV)", "1–2 min"],
                ["Peak effect", "6–10 min"],
                ["Duration", "30–60 min"],
                ["Elim. t½", "~50 min"],
                ["Vd", "0.9–1.1 L/kg"],
                ["Clearance", "~1 L/min (hepatic)"],
                ["Protein binding", "~50%"],
                ["Metabolism", "CYP3A4 → inactive"],
              ].map(([k, v]) => (
                <div key={k} className="bg-card rounded p-1.5 border border-border">
                  <p className="text-[9px] uppercase text-muted-foreground tracking-wide">{k}</p>
                  <p className="text-[11px] font-mono text-foreground">{v}</p>
                </div>
              ))}
            </div>
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
                          : "bg-secondary/30 text-muted-foreground border-border hover:bg-secondary/50"
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
              className="text-[10px] text-muted-foreground hover:text-foreground underline"
            >
              Reset answers
            </button>
          </div>

          <div
            className={`rounded-lg p-4 border-l-4 ${
              verdict.give === "give"
                ? "border-l-primary bg-primary/5"
                : verdict.give === "withhold"
                  ? "border-l-destructive bg-destructive/5"
                  : "border-l-orange-500 bg-orange-500/5"
            }`}
          >
            <div className="flex items-start justify-between gap-2 mb-1">
              <p className="text-sm font-semibold text-foreground">{verdict.headline}</p>
              <Badge
                variant={verdict.give === "give" ? "default" : verdict.give === "withhold" ? "destructive" : "outline"}
                className="text-[10px] uppercase shrink-0"
              >
                {verdict.give}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">{verdict.detail}</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-2 text-xs">
            <div className="rounded-md p-3 bg-secondary/30 border border-border">
              <p className="font-semibold text-foreground mb-1">✓ Reasonable indications</p>
              <ul className="text-muted-foreground space-y-0.5 list-disc list-inside">
                <li>Iatrogenic procedural over-sedation</li>
                <li>Reversal of paradoxical reactions</li>
                <li>Diagnosis of unexplained coma where BZD ingestion is highly likely &amp; airway threatened</li>
                <li>Paediatric accidental BZD ingestion (no co-ingestion)</li>
              </ul>
            </div>
            <div className="rounded-md p-3 bg-destructive/5 border border-destructive/30">
              <p className="font-semibold text-foreground mb-1">✗ Avoid in</p>
              <ul className="text-muted-foreground space-y-0.5 list-disc list-inside">
                <li>Mixed OD with TCAs / cocaine / pro-convulsants</li>
                <li>Chronic BZD-dependent patients</li>
                <li>Known seizure disorder on BZD</li>
                <li>Raised ICP (rebound surge)</li>
                <li>Status epilepticus reversal</li>
              </ul>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default FlumazenilDiagram;

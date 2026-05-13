import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

type DrugKey = "diazepam" | "lorazepam" | "midazolam" | "temazepam";

interface Drug {
  key: DrugKey;
  name: string;
  onsetIVMin: [number, number]; // min
  durationH: [number, number]; // h
  halfLifeH: [number, number];
  lipidSol: 1 | 2 | 3 | 4 | 5;
  metabolites: string;
  metaboliteActive: boolean;
  metabolism: string;
  routes: string;
  doseAdult: string;
  color: string;
}

const DRUGS: Drug[] = [
  {
    key: "diazepam",
    name: "Diazepam",
    onsetIVMin: [1, 3],
    durationH: [6, 12],
    halfLifeH: [20, 80],
    lipidSol: 5,
    metabolites: "desmethyldiazepam (t½ 36–200 h), oxazepam, temazepam — all active",
    metaboliteActive: true,
    metabolism: "Hepatic CYP2C19 / CYP3A4 → glucuronidation",
    routes: "PO · IV · PR · IM (erratic)",
    doseAdult: "5–10 mg IV (status: 10–20 mg)",
    color: "hsl(var(--pharmacology))",
  },
  {
    key: "lorazepam",
    name: "Lorazepam",
    onsetIVMin: [3, 5],
    durationH: [6, 8],
    halfLifeH: [10, 20],
    lipidSol: 3,
    metabolites: "lorazepam-glucuronide (inactive)",
    metaboliteActive: false,
    metabolism: "Direct hepatic glucuronidation (Phase II only)",
    routes: "PO · IV · IM · SL",
    doseAdult: "1–4 mg IV (status: 4 mg)",
    color: "hsl(var(--clinical))",
  },
  {
    key: "midazolam",
    name: "Midazolam",
    onsetIVMin: [1, 2],
    durationH: [1, 2],
    halfLifeH: [1.5, 2.5],
    lipidSol: 4,
    metabolites: "α-OH-midazolam → α-OH-midazolam-glucuronide (active, renally cleared)",
    metaboliteActive: true,
    metabolism: "Hepatic CYP3A4 → UGT glucuronidation",
    routes: "PO · IV · IM · IN · buccal · PR",
    doseAdult: "1–5 mg IV titrated",
    color: "hsl(var(--icu))",
  },
  {
    key: "temazepam",
    name: "Temazepam",
    onsetIVMin: [30, 60],
    durationH: [6, 8],
    halfLifeH: [8, 15],
    lipidSol: 3,
    metabolites: "temazepam-glucuronide (inactive)",
    metaboliteActive: false,
    metabolism: "Direct hepatic glucuronidation",
    routes: "PO only",
    doseAdult: "10–20 mg PO premed",
    color: "hsl(var(--physiology))",
  },
];

const SCENARIOS: { id: string; label: string; question: string; pick: DrugKey; rationale: string }[] = [
  {
    id: "premed",
    label: "Anxiolytic premed (adult)",
    question: "70-year-old, 2 h before TURP, anxious about spinal.",
    pick: "temazepam",
    rationale: "PO route, predictable 30–60 min onset matched to theatre timing, no IV cannula needed, modest duration. Inactive metabolite — safe in elderly.",
  },
  {
    id: "paedpremed",
    label: "Paediatric premed",
    question: "4-year-old, distressed at parental separation.",
    pick: "midazolam",
    rationale: "Intranasal/buccal/PO routes, onset 10–20 min PO, anxiolysis + amnesia, short duration so doesn't delay PACU discharge.",
  },
  {
    id: "status",
    label: "Status epilepticus (in hospital, IV access)",
    question: "Generalised tonic-clonic seizure ongoing > 5 min.",
    pick: "lorazepam",
    rationale: "First-line per NICE / status guidelines — longer anticonvulsant action than diazepam (less recurrence) due to slower CNS redistribution.",
  },
  {
    id: "statuscommunity",
    label: "Status — pre-hospital / no IV",
    question: "Tonic-clonic at home, paramedic on scene, no IV.",
    pick: "midazolam",
    rationale: "Buccal or IM midazolam — rapid mucosal absorption. Diazepam PR alternative (paeds). Lorazepam not absorbed IM reliably.",
  },
  {
    id: "alcohol",
    label: "Alcohol withdrawal (CIWA-driven)",
    question: "CIWA 18 on the ward, normal liver function.",
    pick: "diazepam",
    rationale: "Long-acting + active metabolites give 'self-tapering' levels — fewer breakthrough symptoms. Lorazepam preferred only in liver failure or elderly.",
  },
  {
    id: "icu",
    label: "ICU sedation infusion",
    question: "Ventilated septic patient needing 48 h sedation, AKI.",
    pick: "midazolam",
    rationale: "Historically used — but PADIS guidelines deprioritise BZDs (delirium, accumulation of α-OH-midazolam-glucuronide in AKI). Propofol or dexmedetomidine preferred; if BZD essential, lorazepam may be safer in renal failure.",
  },
];

const Bar = ({ value, max = 5, color }: { value: number; max?: number; color: string }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: max }).map((_, i) => (
      <div key={i} className="h-2 w-3 rounded-sm"
        style={{ backgroundColor: i < value ? color : "hsl(var(--muted))" }} />
    ))}
  </div>
);

export const BenzodiazepineComparisonDiagram = () => {
  const [scenarioId, setScenarioId] = useState(SCENARIOS[0].id);
  const scenario = SCENARIOS.find((s) => s.id === scenarioId)!;
  const picked = DRUGS.find((d) => d.key === scenario.pick)!;

  // Map a duration in hours (max 24h displayed log-ish) onto a 0-100% scale
  const durPct = (h: number) => Math.min(100, (Math.log10(h + 1) / Math.log10(25)) * 100);

  return (
        <Card className="p-4 sm:p-6 my-6 bg-card border-border">
      <h3 className="text-lg font-serif font-bold text-foreground mb-1">
        Benzodiazepine Class Comparison
      </h3>
      <p className="text-xs text-muted-foreground mb-4">
        All bind the BZD site at the α/γ interface of GABA-A. Clinical differences are driven by lipid solubility,
        metabolism, and active metabolite kinetics.
      </p>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid grid-cols-4 w-full mb-4">
          <TabsTrigger value="profile">Profiles</TabsTrigger>
          <TabsTrigger value="timeline">Onset/Duration</TabsTrigger>
          <TabsTrigger value="metab">Metabolism</TabsTrigger>
          <TabsTrigger value="scenario">Scenarios</TabsTrigger>
        </TabsList>

        {/* === PROFILES === */}
        <TabsContent value="profile" className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {DRUGS.map((d) => (
              <div
                key={d.key}
                className="rounded-lg border border-border bg-secondary/20 p-3"
                style={{ borderLeftWidth: "3px", borderLeftColor: d.color }}
              >
                <div className="flex items-baseline justify-between mb-2">
                  <p className="font-semibold text-foreground">{d.name}</p>
                  <Badge
                    variant={d.metaboliteActive ? "destructive" : "outline"}
                    className="text-[10px]"
                  >
                    {d.metaboliteActive ? "active metabolite" : "inactive metabolite"}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px]">
                  <div className="text-muted-foreground">Onset (IV)</div>
                  <div className="font-mono text-foreground">{d.onsetIVMin[0]}–{d.onsetIVMin[1]} min</div>
                  <div className="text-muted-foreground">Clinical duration</div>
                  <div className="font-mono text-foreground">{d.durationH[0]}–{d.durationH[1]} h</div>
                  <div className="text-muted-foreground">Elimination t½</div>
                  <div className="font-mono text-foreground">{d.halfLifeH[0]}–{d.halfLifeH[1]} h</div>
                  <div className="text-muted-foreground">Routes</div>
                  <div className="text-foreground">{d.routes}</div>
                  <div className="text-muted-foreground">Adult dose</div>
                  <div className="text-foreground">{d.doseAdult}</div>
                </div>

                <div className="flex items-center justify-between mt-2 pt-2 border-t border-border text-[10px]">
                  <span className="text-muted-foreground">Lipid solubility</span>
                  <Bar value={d.lipidSol} color={d.color} />
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* === TIMELINE === */}
        <TabsContent value="timeline" className="space-y-3">
          <div className="rounded-lg border border-border bg-secondary/20 p-3">
            <p className="text-xs font-semibold text-foreground mb-3">
              Onset → clinical duration (log-scaled time axis, IV unless noted)
            </p>
            <svg viewBox="0 0 640 220" className="w-full h-auto">
              {/* axis */}
              <line x1="100" y1="190" x2="620" y2="190" stroke="hsl(var(--border))" />
              {[
                { v: 0, label: "0" },
                { v: 0.083, label: "5 m" },
                { v: 0.5, label: "30 m" },
                { v: 1, label: "1 h" },
                { v: 4, label: "4 h" },
                { v: 12, label: "12 h" },
                { v: 24, label: "24 h" },
              ].map((tk) => {
                const x = 100 + (durPct(tk.v) / 100) * 520;
                return (
                  <g key={tk.label}>
                    <line x1={x} y1="188" x2={x} y2="194" stroke="hsl(var(--border))" />
                    <text x={x} y="206" textAnchor="middle" fontSize="9" className="fill-muted-foreground">{tk.label}</text>
                  </g>
                );
              })}

              {DRUGS.map((d, i) => {
                const y = 30 + i * 38;
                const onsetMid = (d.onsetIVMin[0] + d.onsetIVMin[1]) / 2 / 60; // h
                const x0 = 100 + (durPct(onsetMid) / 100) * 520;
                const _x1 = 100 + (durPct(onsetMid + d.durationH[0]) / 100) * 520;
                const x2 = 100 + (durPct(onsetMid + d.durationH[1]) / 100) * 520;
                const x3 = 100 + (durPct(onsetMid + d.halfLifeH[1]) / 100) * 520;
                return (
                  <g key={d.key}>
                    <text x="95" y={y + 4} textAnchor="end" fontSize="10" fontWeight="600" className="fill-foreground">
                      {d.name}
                    </text>
                    {/* half-life shadow */}
                    <rect x={x0} y={y - 6} width={Math.max(2, x3 - x0)} height="12" rx="2"
                      fill={d.color} opacity="0.18" />
                    {/* clinical effect */}
                    <rect x={x0} y={y - 6} width={Math.max(2, x2 - x0)} height="12" rx="2"
                      fill={d.color} opacity="0.85" />
                    {/* onset marker */}
                    <circle cx={x0} cy={y} r="3" fill={d.color}>
                      <animate attributeName="r" values="2.5;5;2.5" dur="1.4s" repeatCount="indefinite" begin={`${i * 0.2}s`} />
                    </circle>
                    <text x={x2 + 4} y={y + 3} fontSize="9" className="fill-muted-foreground">
                      {d.durationH[0]}–{d.durationH[1]} h
                    </text>
                  </g>
                );
              })}

              <text x="100" y="14" fontSize="9" className="fill-muted-foreground">
                ● onset · solid = clinical effect · faded = elimination t½
              </text>
            </svg>
          </div>

          <div className="rounded-md p-3 bg-secondary/30 border border-border text-xs">
            <p className="font-semibold text-foreground mb-1">Why does midazolam wear off so fast despite t½ similar to lorazepam?</p>
            <p className="text-muted-foreground">
              Clinical offset of a single bolus is governed by <strong className="text-foreground">redistribution</strong>,
              not elimination. Highly lipid-soluble agents (diazepam, midazolam) penetrate the brain rapidly <em>and</em> redistribute
              away rapidly — short clinical effect from a single dose. Lorazepam is less lipid-soluble: slower entry, slower exit,
              longer clinical effect (anticonvulsant gold standard). Diazepam: fast in <em>and</em> fast out — but its long-acting
              metabolites give a delayed plateau, hence the prolonged "alcohol withdrawal" sedative effect.
            </p>
          </div>
        </TabsContent>

        {/* === METABOLISM === */}
        <TabsContent value="metab" className="space-y-3">
          <div className="rounded-lg border border-border bg-secondary/20 p-3">
            <svg viewBox="0 0 640 280" className="w-full h-auto">
              {/* Diazepam chain */}
              <text x="10" y="20" fontSize="10" fontWeight="700" className="fill-foreground">Diazepam — Phase I + II, multi-step active chain</text>
              <rect x="10" y="30" width="100" height="32" rx="4" fill="hsl(var(--pharmacology))" opacity="0.85" stroke="hsl(var(--border))" strokeWidth="0.75" />
              <text x="60" y="51" textAnchor="middle" fontSize="10" fontWeight="600" className="fill-primary-foreground">Diazepam</text>

              <path d="M 110 46 L 140 46" stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd="url(#bzd-arr)" />
              <text x="125" y="40" fontSize="8" textAnchor="middle" className="fill-muted-foreground">CYP2C19/3A4</text>

              <rect x="140" y="30" width="160" height="32" rx="4" fill="hsl(var(--pharmacology))" opacity="0.85" stroke="hsl(var(--border))" strokeWidth="0.75" />
              <text x="220" y="48" textAnchor="middle" fontSize="9" fontWeight="700" className="fill-primary-foreground">desmethyldiazepam</text>
              <text x="220" y="58" textAnchor="middle" fontSize="8" className="fill-primary-foreground">t½ 36–200 h · active</text>

              <path d="M 300 46 L 330 46" stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd="url(#bzd-arr)" />

              <rect x="330" y="30" width="120" height="32" rx="4" fill="hsl(var(--pharmacology))" opacity="0.7" stroke="hsl(var(--border))" strokeWidth="0.75" />
              <text x="390" y="48" textAnchor="middle" fontSize="10" fontWeight="600" className="fill-primary-foreground">oxazepam</text>
              <text x="390" y="58" textAnchor="middle" fontSize="8" className="fill-primary-foreground">active</text>

              <path d="M 450 46 L 480 46" stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd="url(#bzd-arr)" />
              <text x="465" y="40" fontSize="8" textAnchor="middle" className="fill-muted-foreground">UGT</text>

              <rect x="480" y="30" width="150" height="32" rx="4" fill="hsl(var(--muted))" opacity="0.6" stroke="hsl(var(--border))" />
              <text x="555" y="50" textAnchor="middle" fontSize="9" className="fill-foreground">glucuronide → urine</text>

              {/* Midazolam chain */}
              <text x="10" y="92" fontSize="10" fontWeight="700" className="fill-foreground">Midazolam — Phase I + II, active glucuronide</text>
              <rect x="10" y="102" width="100" height="32" rx="4" fill="hsl(var(--icu))" opacity="0.85" stroke="hsl(var(--border))" strokeWidth="0.75" />
              <text x="60" y="123" textAnchor="middle" fontSize="10" fontWeight="600" className="fill-primary-foreground">Midazolam</text>

              <path d="M 110 118 L 140 118" stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd="url(#bzd-arr)" />
              <text x="125" y="112" fontSize="8" textAnchor="middle" className="fill-muted-foreground">CYP3A4</text>

              <rect x="140" y="102" width="160" height="32" rx="4" fill="hsl(var(--icu))" opacity="0.85" stroke="hsl(var(--border))" strokeWidth="0.75" />
              <text x="220" y="120" textAnchor="middle" fontSize="9" fontWeight="700" className="fill-primary-foreground">α-OH-midazolam</text>
              <text x="220" y="130" textAnchor="middle" fontSize="8" className="fill-primary-foreground">active (~10%)</text>

              <path d="M 300 118 L 330 118" stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd="url(#bzd-arr)" />
              <text x="315" y="112" fontSize="8" textAnchor="middle" className="fill-muted-foreground">UGT</text>

              <rect x="330" y="102" width="180" height="32" rx="4" fill="hsl(var(--destructive))" opacity="0.85">
                <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" stroke="hsl(var(--border))" strokeWidth="0.75" />
              </rect>
              <text x="420" y="118" textAnchor="middle" fontSize="9" fontWeight="700" className="fill-primary-foreground">α-OH-midaz-glucuronide</text>
              <text x="420" y="128" textAnchor="middle" fontSize="8" className="fill-primary-foreground">ACTIVE · renally cleared</text>

              <path d="M 510 118 L 540 118" stroke="hsl(var(--destructive))" strokeWidth="1.5" markerEnd="url(#bzd-arr)" />

              <rect x="540" y="102" width="90" height="32" rx="4" fill="hsl(var(--muted))" opacity="0.6" stroke="hsl(var(--destructive))" />
              <text x="585" y="123" textAnchor="middle" fontSize="9" className="fill-destructive">↑↑ in AKI</text>

              {/* Lorazepam */}
              <text x="10" y="170" fontSize="10" fontWeight="700" className="fill-foreground">Lorazepam &amp; Temazepam — Phase II only (LOT)</text>
              <rect x="10" y="180" width="100" height="32" rx="4" fill="hsl(var(--clinical))" opacity="0.85" stroke="hsl(var(--border))" strokeWidth="0.75" />
              <text x="60" y="201" textAnchor="middle" fontSize="10" fontWeight="600" className="fill-primary-foreground">Lorazepam</text>

              <path d="M 110 196 L 200 196" stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd="url(#bzd-arr)" />
              <text x="155" y="190" fontSize="8" textAnchor="middle" className="fill-muted-foreground">UGT (direct)</text>

              <rect x="200" y="180" width="180" height="32" rx="4" fill="hsl(var(--muted))" opacity="0.6" stroke="hsl(var(--border))" />
              <text x="290" y="201" textAnchor="middle" fontSize="9" className="fill-foreground">lorazepam-glucuronide (inactive)</text>

              <path d="M 380 196 L 410 196" stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd="url(#bzd-arr)" />
              <rect x="410" y="180" width="100" height="32" rx="4" fill="hsl(var(--muted))" opacity="0.6" stroke="hsl(var(--border))" />
              <text x="460" y="201" textAnchor="middle" fontSize="9" className="fill-foreground">renal excretion</text>

              <text x="10" y="240" fontSize="9" className="fill-muted-foreground">
                "<strong>LOT</strong>" — <strong>L</strong>orazepam, <strong>O</strong>xazepam, <strong>T</strong>emazepam — bypass CYP and undergo Phase II glucuronidation only.
              </text>
              <text x="10" y="254" fontSize="9" className="fill-muted-foreground">
                → safer in liver disease and elderly (no CYP-dependent variability, no active metabolites).
              </text>

              <defs>
                <marker id="bzd-arr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                  <path d="M0,0 L8,4 L0,8 Z" fill="hsl(var(--foreground))" />
                </marker>
              </defs>
            </svg>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 text-xs">
            <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-3">
              <p className="font-semibold text-foreground mb-1">Beware: active metabolites</p>
              <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                <li><strong className="text-foreground">Diazepam</strong> — desmethyldiazepam t½ up to 200 h. Days of effect after a single dose in elderly.</li>
                <li><strong className="text-foreground">Midazolam</strong> — α-OH-glucuronide accumulates in AKI/CKD → prolonged ICU coma.</li>
                <li>CYP3A4 inhibitors (erythromycin, diltiazem, grapefruit, ritonavir) potentiate midazolam &amp; diazepam markedly.</li>
              </ul>
            </div>
            <div className="rounded-lg border border-primary/30 bg-primary/5 p-3">
              <p className="font-semibold text-foreground mb-1">Safer in liver/renal failure</p>
              <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                <li><strong className="text-foreground">LOT</strong> drugs avoid CYP and have inactive metabolites.</li>
                <li><strong className="text-foreground">Lorazepam</strong> — preferred BZD for ICU sedation in cirrhosis or AKI when a BZD is essential.</li>
                <li><strong className="text-foreground">Temazepam</strong> — premed of choice in elderly (no active metabolite).</li>
              </ul>
            </div>
          </div>
        </TabsContent>

        {/* === SCENARIOS === */}
        <TabsContent value="scenario" className="space-y-3">
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

          <div className="rounded-lg border border-border bg-secondary/20 p-4">
            <p className="text-xs text-muted-foreground italic mb-3">{scenario.question}</p>
            <div
              className="rounded-md p-3 border-l-4"
              style={{ borderLeftColor: picked.color, backgroundColor: "hsl(var(--secondary) / 0.4)" }}
            >
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Best choice</p>
              <p className="text-base font-semibold text-foreground">{picked.name}</p>
              <p className="text-xs text-muted-foreground mt-1">{scenario.rationale}</p>
            </div>

            <div className="grid grid-cols-4 gap-1.5 mt-3">
              {DRUGS.map((d) => {
                const isPick = d.key === scenario.pick;
                return (
                      <div
                    key={d.key}
                    className={`text-center p-1.5 rounded text-[10px] border ${
                      isPick
                        ? "border-primary bg-primary/10 text-foreground font-semibold"
                        : "border-border bg-secondary/20 text-muted-foreground"
                    }`}
                  >
                    {d.name}
                    <div className="text-[9px] mt-0.5">{isPick ? "✓ pick" : "alt"}</div>
                  </div>
  );
              })}
            </div>
          </div>

          <div className="rounded-md p-3 bg-secondary/30 border border-border text-xs">
            <p className="font-semibold text-foreground mb-1">Cross-cutting cautions</p>
            <ul className="text-muted-foreground space-y-1 list-disc list-inside">
              <li>All BZDs cause respiratory depression — synergistic with opioids (esp. midazolam + fentanyl)</li>
              <li>All risk delirium in the elderly — Beers list. Avoid as routine premed &gt; 65 y</li>
              <li>Tolerance &amp; dependence with chronic use — taper, never abrupt withdrawal</li>
              <li>Reversal: flumazenil — but resedation likely (t½ shorter than parent BZD)</li>
            </ul>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default BenzodiazepineComparisonDiagram;

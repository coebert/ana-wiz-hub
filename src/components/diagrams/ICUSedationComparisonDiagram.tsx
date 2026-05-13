import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { DiagramFigure } from "./_shared/DiagramFigure";

type AgentKey = "propofol" | "midazolam" | "dex" | "ketamine";

interface Agent {
  key: AgentKey;
  name: string;
  short: string;
  receptor: string;
  onset: string; // min
  offset: string;
  rassRange: [number, number]; // achievable RASS depth
  delirium: 1 | 2 | 3 | 4 | 5; // 1 = lowest risk
  hypotension: 1 | 2 | 3 | 4 | 5;
  brady: 1 | 2 | 3 | 4 | 5;
  resp: 1 | 2 | 3 | 4 | 5; // resp depression
  cost: 1 | 2 | 3 | 4 | 5;
  duration: string; // recommended max
  color: string; // hsl token class
}

const AGENTS: Agent[] = [
  {
    key: "propofol",
    name: "Propofol",
    short: "GABA-A",
    receptor: "GABA-A potentiation",
    onset: "30 s",
    offset: "5–10 min",
    rassRange: [-5, -1],
    delirium: 3,
    hypotension: 4,
    brady: 2,
    resp: 4,
    cost: 2,
    duration: "≤ 48 h at > 4 mg/kg/h (PRIS)",
    color: "hsl(var(--icu))",
  },
  {
    key: "midazolam",
    name: "Midazolam",
    short: "BZD",
    receptor: "GABA-A (BZD site)",
    onset: "2–5 min",
    offset: "Hours–days (active metabolite)",
    rassRange: [-5, -2],
    delirium: 5,
    hypotension: 2,
    brady: 1,
    resp: 4,
    cost: 1,
    duration: "Avoid > 24 h infusion",
    color: "hsl(var(--pharmacology))",
  },
  {
    key: "dex",
    name: "Dexmedetomidine",
    short: "α2-agonist",
    receptor: "Central α2A (locus coeruleus)",
    onset: "5–10 min (no bolus)",
    offset: "60–120 min",
    rassRange: [-3, 0],
    delirium: 1,
    hypotension: 3,
    brady: 4,
    resp: 1,
    cost: 5,
    duration: "Up to 28 days (SPICE-III)",
    color: "hsl(var(--clinical))",
  },
  {
    key: "ketamine",
    name: "Ketamine",
    short: "NMDA",
    receptor: "NMDA antagonist",
    onset: "30–60 s",
    offset: "10–15 min",
    rassRange: [-4, -1],
    delirium: 4,
    hypotension: 1,
    brady: 1,
    resp: 1,
    cost: 3,
    duration: "Bridging / shock; emergence phenomena",
    color: "hsl(var(--physiology))",
  },
];

const Bar = ({ value, max = 5, color }: { value: number; max?: number; color: string }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: max }).map((_, i) => (
      <div
        key={i}
        className="h-2 w-3 rounded-sm"
        style={{ backgroundColor: i < value ? color : "hsl(var(--muted))" }}
      />
    ))}
  </div>
);

const SCENARIOS = [
  {
    id: "septic",
    label: "Septic shock, intubated",
    detail: "Hypotensive on noradrenaline 0.4 µg/kg/min, lactate 4. RASS target -1 to 0.",
    pick: "ketamine",
    rationale: "Sympathomimetic — preserves MAP. Add low-dose dex once stable to wean.",
  },
  {
    id: "tbi",
    label: "Severe TBI, ICP control",
    detail: "GCS 5 pre-intubation, ICP 22 mmHg. Need RASS -4 to -5, ICP & CMRO₂ control.",
    pick: "propofol",
    rationale: "Reduces CMRO₂ & ICP; rapid neurological wake-up for assessment.",
  },
  {
    id: "weaning",
    label: "Difficult vent weaning, day 7",
    detail: "RASS -3 on midazolam infusion 5 days. Failing SBT due to over-sedation, agitated when light.",
    pick: "dex",
    rationale: "Cooperative sedation, no resp depression, halves delirium incidence (PRODEX/MIDEX).",
  },
  {
    id: "status",
    label: "Refractory status epilepticus",
    detail: "Failed 2nd-line. Need burst-suppression EEG, RASS -5.",
    pick: "midazolam",
    rationale: "Anticonvulsant infusion (or propofol). Dex/ketamine inadequate alone.",
  },
  {
    id: "alcohol",
    label: "Alcohol withdrawal, agitated",
    detail: "CIWA 22, hallucinating, tachycardic. Not yet intubated.",
    pick: "dex",
    rationale: "Adjunct to benzodiazepines — reduces benzo requirement & delirium without resp depression.",
  },
];

export const ICUSedationComparisonDiagram = () => {
  const [rassTarget, setRassTarget] = useState([-2]);
  const [scenarioId, setScenarioId] = useState(SCENARIOS[0].id);
  const scenario = SCENARIOS.find((s) => s.id === scenarioId)!;
  const pickedAgent = AGENTS.find((a) => a.key === scenario.pick)!;
  const target = rassTarget[0];
  const suitableAgents = AGENTS.filter(
    (a) => target >= a.rassRange[0] && target <= a.rassRange[1]
  );

  return (
    <Card className="p-4 sm:p-6 my-6 bg-card border-border">
      <h3 className="text-lg font-serif font-bold text-foreground mb-1">
        ICU Sedation Comparison — Propofol · Midazolam · Dexmedetomidine · Ketamine
      </h3>
      <p className="text-xs text-muted-foreground mb-4">
        Light, goal-directed sedation (RASS 0 to −2) is the default. Agent choice depends on
        haemodynamics, delirium risk, expected duration, and cost.
      </p>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid grid-cols-4 w-full mb-4">
          <TabsTrigger value="profile">Profiles</TabsTrigger>
          <TabsTrigger value="rass">RASS Target</TabsTrigger>
          <TabsTrigger value="scenario">Scenarios</TabsTrigger>
          <TabsTrigger value="trials">Trials</TabsTrigger>
        </TabsList>

        {/* === PROFILES === */}
        <TabsContent value="profile" className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {AGENTS.map((a) => (
              <div
                key={a.key}
                className="rounded-lg border border-border bg-secondary/20 p-3"
                style={{ borderLeftWidth: "3px", borderLeftColor: a.color }}
              >
                <div className="flex items-baseline justify-between mb-2">
                  <p className="font-semibold text-foreground">{a.name}</p>
                  <Badge variant="outline" className="text-[10px]">{a.short}</Badge>
                </div>
                <p className="text-[11px] text-muted-foreground mb-2">{a.receptor}</p>

                <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11px]">
                  <div className="text-muted-foreground">Onset</div>
                  <div className="text-foreground font-mono">{a.onset}</div>
                  <div className="text-muted-foreground">Offset</div>
                  <div className="text-foreground font-mono">{a.offset}</div>
                  <div className="text-muted-foreground">RASS reach</div>
                  <div className="text-foreground font-mono">{a.rassRange[0]} to {a.rassRange[1]}</div>
                </div>

                <div className="mt-2 pt-2 border-t border-border space-y-1.5">
                  {[
                    { label: "Delirium risk", value: a.delirium },
                    { label: "Hypotension", value: a.hypotension },
                    { label: "Bradycardia", value: a.brady },
                    { label: "Resp. depression", value: a.resp },
                    { label: "Cost", value: a.cost },
                  ].map((r) => (
                    <div key={r.label} className="flex items-center justify-between text-[10px]">
                      <span className="text-muted-foreground">{r.label}</span>
                      <Bar value={r.value} color={a.color} />
                    </div>
                  ))}
                </div>

                <p className="text-[10px] text-muted-foreground mt-2 italic border-t border-border pt-2">
                  {a.duration}
                </p>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* === RASS TARGET === */}
        <TabsContent value="rass" className="space-y-4">
          <div className="rounded-lg border border-border bg-secondary/20 p-4">
            <p className="text-xs font-semibold text-foreground mb-2">
              Set RASS target — see which agents can reach it
            </p>
            <Slider
              value={rassTarget}
              onValueChange={setRassTarget}
              min={-5}
              max={2}
              step={1}
            />
            <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
              <span>−5 unarousable</span>
              <span className="font-mono text-foreground text-sm">RASS {target > 0 ? `+${target}` : target}</span>
              <span>+2 agitated</span>
            </div>

            {/* RASS bar */}
            <svg viewBox="0 0 600 130" className="w-full h-auto mt-3">
              {/* axis */}
              <line x1="40" y1="20" x2="560" y2="20" stroke="hsl(var(--border))" strokeWidth="1" />
              {[-5, -4, -3, -2, -1, 0, 1, 2].map((v, i) => {
                const x = 40 + (i / 7) * 520;
                const isTarget = v === target;
                return (
                  <g key={v}>
                    <line x1={x} y1="15" x2={x} y2="25" stroke="hsl(var(--border))" />
                    <text x={x} y="10" textAnchor="middle" fontSize="9"
                      className={isTarget ? "fill-primary font-bold" : "fill-muted-foreground"}>
                      {v > 0 ? `+${v}` : v}
                    </text>
                    {isTarget && (
                      <circle cx={x} cy="20" r="5" fill="hsl(var(--primary))">
                        <animate attributeName="r" values="4;7;4" dur="1.2s" repeatCount="indefinite" />
                      </circle>
                    )}
                  </g>
                );
              })}

              {/* agent reach bars */}
              {AGENTS.map((a, idx) => {
                const x1 = 40 + ((a.rassRange[0] + 5) / 7) * 520;
                const x2 = 40 + ((a.rassRange[1] + 5) / 7) * 520;
                const y = 40 + idx * 20;
                const inRange = target >= a.rassRange[0] && target <= a.rassRange[1];
                return (
                  <g key={a.key}>
                    <text x="35" y={y + 4} textAnchor="end" fontSize="9"
                      className={inRange ? "fill-foreground font-semibold" : "fill-muted-foreground"}>
                      {a.name}
                    </text>
                    <rect
                      x={x1}
                      y={y - 4}
                      width={x2 - x1}
                      height="8"
                      rx="2"
                      fill={a.color}
                      opacity={inRange ? 0.85 : 0.25}
                    />
                    {inRange && (
                      <text x={x2 + 6} y={y + 4} fontSize="9" className="fill-foreground">✓</text>
                    )}
                  </g>
                );
              })}
            </svg>

            <p className="text-[11px] text-muted-foreground mt-2">
              {suitableAgents.length} of 4 agents can target RASS {target > 0 ? `+${target}` : target}.
              {target >= -2 && target <= 0 && (
                <span className="text-foreground"> Light sedation — dexmedetomidine preferred to minimise delirium.</span>
              )}
              {target <= -4 && (
                <span className="text-foreground"> Deep sedation — propofol or midazolam infusion required.</span>
              )}
            </p>
          </div>

          <div className="rounded-lg border border-border bg-secondary/30 p-3 text-xs">
            <p className="font-semibold text-foreground mb-1">Why light sedation wins (PAD/PADIS guidelines)</p>
            <ul className="text-muted-foreground space-y-1 list-disc list-inside">
              <li>Shorter ventilator days &amp; ICU LOS (Kress 2000, Girard ABC trial)</li>
              <li>Less delirium &amp; long-term cognitive impairment</li>
              <li>Daily sedation holds (SAT) paired with spontaneous breathing trials (SBT)</li>
              <li>Analgesia first (fentanyl/remi) — sedation only if pain controlled and still distressed</li>
            </ul>
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
            <p className="text-xs text-muted-foreground mb-3">{scenario.detail}</p>
            <div
              className="rounded-md p-3 border-l-4"
              style={{ borderLeftColor: pickedAgent.color, backgroundColor: "hsl(var(--secondary) / 0.4)" }}
            >
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground">First-line</p>
              <p className="text-base font-semibold text-foreground">{pickedAgent.name}</p>
              <p className="text-xs text-muted-foreground mt-1">{scenario.rationale}</p>
            </div>

            <div className="grid grid-cols-4 gap-1.5 mt-3">
              {AGENTS.map((a) => {
                const picked = a.key === scenario.pick;
                return (
    <DiagramFigure
      id="icu-sedation-comparison-diagram"
      title="ICU sedation comparison"
      description="Auto-generated wrapper for the ICU sedation comparison anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
                        <div
                      key={a.key}
                      className={`text-center p-1.5 rounded text-[10px] border ${
                        picked
                          ? "border-primary bg-primary/10 text-foreground font-semibold"
                          : "border-border bg-secondary/20 text-muted-foreground"
                      }`}
                    >
                      {a.name.split(" ")[0]}
                      <div className="text-[9px] mt-0.5">{picked ? "✓ pick" : "consider"}</div>
                    </div>
    </DiagramFigure>
  );
              })}
            </div>
          </div>
        </TabsContent>

        {/* === TRIALS === */}
        <TabsContent value="trials" className="space-y-2">
          {[
            {
              name: "SPICE-III (2019)",
              n: "4,000 ventilated adults",
              q: "Early dex vs usual care",
              result: "No 90-day mortality difference. Dex ↓ delirium, ↓ time to extubation. Bradycardia & hypotension more common.",
            },
            {
              name: "PRODEX & MIDEX (2012)",
              n: "1,000 mixed ICU",
              q: "Dex vs propofol/midazolam",
              result: "Dex ≥ as effective for light sedation. Shorter vent time vs midazolam. Better patient communication.",
            },
            {
              name: "MENDS (2007)",
              n: "106 ventilated",
              q: "Dex vs lorazepam",
              result: "Dex → more delirium-free days, similar coma-free days.",
            },
            {
              name: "MIND-USA (2018)",
              n: "566 delirious ICU pts",
              q: "Haloperidol vs ziprasidone vs placebo",
              result: "No effect on delirium duration. Antipsychotics not routinely indicated for ICU delirium.",
            },
            {
              name: "ABC Trial — Girard (2008)",
              n: "336 vent patients",
              q: "Paired SAT + SBT vs SBT alone",
              result: "Paired protocol ↓ vent days, ↓ ICU LOS, ↓ 1-year mortality (NNT 7).",
            },
          ].map((t) => (
            <div key={t.name} className="rounded-lg border border-border bg-secondary/20 p-3">
              <div className="flex items-baseline justify-between mb-1">
                <p className="font-semibold text-foreground text-sm">{t.name}</p>
                <span className="text-[10px] text-muted-foreground">{t.n}</span>
              </div>
              <p className="text-[11px] text-muted-foreground italic">{t.q}</p>
              <p className="text-xs text-foreground/90 mt-1">{t.result}</p>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default ICUSedationComparisonDiagram;

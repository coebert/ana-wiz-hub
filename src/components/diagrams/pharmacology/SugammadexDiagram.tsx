import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { DiagramFigure } from "../_shared/DiagramFigure";

// =================================================================
// Decision-aid logic — re-paralysis & reversal scenarios
// =================================================================
type Answer = "yes" | "no" | "unknown";
interface Q { id: string; text: string }

const QUESTIONS: Q[] = [
  { id: "agent", text: "Was the relaxant rocuronium or vecuronium (an aminosteroid)?" },
  { id: "depth", text: "Is the block deep / profound (PTC ≥ 1, no TOF twitches)?" },
  { id: "ccov", text: "Emergency airway loss — 'can't intubate, can't oxygenate'?" },
  { id: "renal", text: "Severe renal impairment (eGFR < 30 mL/min)?" },
  { id: "reparalyse", text: "Likely need to re-paralyse within the next 24 hours?" },
];

interface Verdict {
  give: "give" | "withhold" | "caution";
  headline: string;
  detail: string;
  dose: string;
  reparalysis: string;
}

const decide = (a: Record<string, Answer>): Verdict => {
  if (a.agent === "no") {
    return {
      give: "withhold",
      headline: "Withhold — wrong drug class",
      detail:
        "Sugammadex only encapsulates aminosteroid NMBAs (rocuronium ≫ vecuronium ≫ pancuronium). It does not bind benzylisoquinoliniums (atracurium, cisatracurium, mivacurium) or suxamethonium. Use neostigmine + glycopyrrolate once TOF count ≥ 2.",
      dose: "—",
      reparalysis: "Unaffected — use any NMBA as normal.",
    };
  }
  if (a.ccov === "yes") {
    return {
      give: "give",
      headline: "Give — emergency rescue dose",
      detail:
        "Immediate full reversal of profound rocuronium block. Onset ~1.5 min — faster than spontaneous suxamethonium recovery. Does not solve airway oedema or laryngospasm; reversal restores spontaneous ventilation only if no obstruction.",
      dose: "16 mg/kg IV bolus (ideal/total body weight in obesity per local protocol).",
      reparalysis:
        "Avoid rocuronium/vecuronium for 24 h — use cisatracurium or atracurium if relaxation is needed sooner.",
    };
  }
  if (a.depth === "yes") {
    return {
      give: "give",
      headline: "Give — deep block reversal",
      detail:
        "Deep block (PTC ≥ 1, TOF count 0) cannot be reversed by neostigmine. Sugammadex 4 mg/kg restores TOF ratio ≥ 0.9 within 2–3 min.",
      dose: "4 mg/kg IV (rounded to nearest vial).",
      reparalysis:
        a.reparalyse === "yes"
          ? "If re-paralysis needed within 24 h, switch to a benzylisoquinolinium (cisatracurium); otherwise rocuronium dose must be ↑ (1.2 mg/kg) and onset will still be delayed."
          : "Wait 24 h before re-using rocuronium/vecuronium at standard doses.",
    };
  }
  if (a.renal === "yes") {
    return {
      give: "caution",
      headline: "Caution — severe renal impairment",
      detail:
        "Sugammadex–rocuronium complex is renally cleared. In eGFR < 30 mL/min the complex t½ is markedly prolonged but reversal is still effective and recurrence of block is not seen at standard doses. Not recommended in dialysis-dependent patients in many SPCs, but increasingly used off-label.",
      dose: "Standard dose for depth of block (2 or 4 mg/kg). Monitor TOF for 2 h post-reversal.",
      reparalysis:
        "Complex persists for days — assume rocuronium 'unavailable' for 24 h, longer if anuric.",
    };
  }
  return {
    give: "give",
    headline: "Give — routine moderate-block reversal",
    detail:
      "Reliable, complete reversal of moderate block (TOF count ≥ 2). Faster and more predictable than neostigmine, with no muscarinic effects and no need for an antimuscarinic. Confirm TOF ratio ≥ 0.9 before extubation.",
    dose: "2 mg/kg IV.",
    reparalysis:
      a.reparalyse === "yes"
        ? "Re-paralysis within 24 h: rocuronium will need a higher dose (1.2 mg/kg) with delayed onset. Consider a benzylisoquinolinium instead."
        : "Standard 24 h washout if rocuronium re-use planned.",
  };
};

// =================================================================
// Mechanism diagram — encapsulation
// =================================================================
const MechanismDiagram = ({ encapsulated }: { encapsulated: boolean }) => {
  // Cyclodextrin: torus rendered as 8-fold symmetry; rocuronium as a stick figure with steroid rings
  return (
    <svg viewBox="0 0 600 320" className="w-full h-auto">
      {/* Receptor zone */}
      <g>
        <rect x="20" y="220" width="560" height="80" rx="8" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="0.75" />
        <text x="300" y="290" textAnchor="middle" fontSize="11" fill="hsl(var(--muted-foreground))" fontFamily="sans-serif">
          Neuromuscular junction — nicotinic ACh receptors
        </text>
        {/* AChR icons */}
        {[80, 180, 280, 380, 480].map((x) => (
          <g key={x}>
            <rect x={x - 14} y={232} width={28} height={36} rx={4} fill="hsl(var(--background))" stroke="hsl(var(--border))" />
            <circle cx={x} cy={250} r={5} fill="hsl(var(--muted-foreground))" opacity={0.4} />
          </g>
        ))}
      </g>

      {/* Free vs encapsulated rocuronium */}
      {/* Rocuronium 1: free or encapsulated */}
      <g transform="translate(150, 100)">
        {encapsulated && <Cyclodextrin />}
        <Rocuronium dimmed={encapsulated} />
        <text x="0" y="-50" textAnchor="middle" fontSize="10" fill="hsl(var(--muted-foreground))" fontFamily="sans-serif">
          {encapsulated ? "Rocuronium · γ-cyclodextrin (1:1)" : "Free rocuronium"}
        </text>
      </g>

      {/* Rocuronium 2 — heading toward NMJ when free, captured when reversed */}
      <g transform="translate(380, 100)">
        {encapsulated && <Cyclodextrin />}
        <Rocuronium dimmed={encapsulated} />
      </g>

      {/* Arrows */}
      {!encapsulated && (
        <g stroke="hsl(var(--destructive))" strokeWidth={1.5} fill="none">
          <path d="M150 160 L150 220" markerEnd="url(#arrow)" />
          <path d="M380 160 L380 220" markerEnd="url(#arrow)" />
        </g>
      )}
      {encapsulated && (
        <text x="300" y="180" textAnchor="middle" fontSize="11" fill="hsl(var(--primary))" fontFamily="sans-serif" fontWeight={600}>
          Encapsulated → cannot reach receptor
        </text>
      )}

      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="hsl(var(--destructive))" />
        </marker>
      </defs>
    </svg>
  );
};

const Cyclodextrin = () => {
  // 8-fold ring suggests γ-cyclodextrin (8 glucose units); shaded torus
  const r = 46;
  const inner = 26;
  return (
    <g>
      <circle r={r} fill="hsl(var(--primary) / 0.10)" stroke="hsl(var(--primary))" strokeWidth={1.5} />
      <circle r={inner} fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth={1} strokeDasharray="2 3" />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        const x1 = Math.cos(a) * inner;
        const y1 = Math.sin(a) * inner;
        const x2 = Math.cos(a) * r;
        const y2 = Math.sin(a) * r;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="hsl(var(--primary))" strokeWidth={0.75} opacity={0.5} />;
      })}
      <text x={0} y={r + 14} textAnchor="middle" fontSize="9" fill="hsl(var(--primary))" fontFamily="sans-serif">
        γ-cyclodextrin
      </text>
    </g>
  );
};

const Rocuronium = ({ dimmed }: { dimmed: boolean }) => {
  // Stylised steroid: 3 fused hexagons + cyclopentane
  const op = dimmed ? 0.55 : 1;
  return (
    <g opacity={op}>
      <g stroke="hsl(var(--foreground))" strokeWidth={1} fill="hsl(var(--background))">
        <polygon points="-22,-10 -10,-18 2,-10 2,4 -10,12 -22,4" />
        <polygon points="2,-10 14,-18 26,-10 26,4 14,12 2,4" />
        <polygon points="14,12 26,4 36,12 32,24 18,24" />
      </g>
      {/* Quaternary nitrogen as charged head */}
      <circle cx={-26} cy={-2} r={5} fill="hsl(var(--destructive))" />
      <text x={-26} y={1} textAnchor="middle" fontSize="7" fill="hsl(var(--background))" fontWeight={700}>+</text>
    </g>
  );
};

// =================================================================
// Dose vs depth chart
// =================================================================
const DOSE_TIERS = [
  { key: "moderate", dose: "2 mg/kg", depth: "Moderate block · TOF count ≥ 2", time: "≈ 2 min", color: "hsl(var(--chart-2))" },
  { key: "deep", dose: "4 mg/kg", depth: "Deep block · PTC ≥ 1, TOF count 0", time: "≈ 3 min", color: "hsl(var(--chart-3))" },
  { key: "rescue", dose: "16 mg/kg", depth: "Immediate rescue · 3 min after 1.2 mg/kg roc", time: "≈ 1.5 min", color: "hsl(var(--destructive))" },
];

const DoseDepthDiagram = () => {
  const [active, setActive] = useState<string>("moderate");
  const tier = DOSE_TIERS.find((t) => t.key === active)!;
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        {DOSE_TIERS.map((t) => (
          <Button
            key={t.key}
            variant={active === t.key ? "default" : "outline"}
            onClick={() => setActive(t.key)}
            className="flex flex-col h-auto py-2"
          >
            <span className="font-bold text-base">{t.dose}</span>
            <span className="text-[10px] opacity-80">{t.time} to TOF ≥ 0.9</span>
          </Button>
        ))}
      </div>

      <svg viewBox="0 0 600 240" className="w-full h-auto">
        {/* Depth scale axis */}
        <line x1={60} y1={30} x2={60} y2={210} stroke="hsl(var(--border))" strokeWidth={1} />
        <text x={50} y={28} textAnchor="end" fontSize="10" fill="hsl(var(--muted-foreground))">Recovered</text>
        <text x={50} y={120} textAnchor="end" fontSize="10" fill="hsl(var(--muted-foreground))">Moderate</text>
        <text x={50} y={170} textAnchor="end" fontSize="10" fill="hsl(var(--muted-foreground))">Deep</text>
        <text x={50} y={208} textAnchor="end" fontSize="10" fill="hsl(var(--muted-foreground))">Profound</text>

        {/* Bands */}
        {[
          { y: 30, h: 50, label: "TOF ratio ≥ 0.9", fill: "hsl(var(--chart-1) / 0.15)" },
          { y: 80, h: 50, label: "TOF count ≥ 2", fill: "hsl(var(--chart-2) / 0.15)" },
          { y: 130, h: 50, label: "PTC ≥ 1, TOF 0", fill: "hsl(var(--chart-3) / 0.15)" },
          { y: 180, h: 30, label: "PTC = 0", fill: "hsl(var(--destructive) / 0.15)" },
        ].map((b) => (
          <g key={b.label}>
            <rect x={60} y={b.y} width={520} height={b.h} fill={b.fill} />
            <text x={70} y={b.y + b.h / 2 + 3} fontSize="10" fill="hsl(var(--muted-foreground))" fontFamily="sans-serif">
              {b.label}
            </text>
          </g>
        ))}

        {/* Coverage line per dose tier */}
        {DOSE_TIERS.map((t) => {
          const coverY = t.key === "moderate" ? 80 : t.key === "deep" ? 130 : 180;
          const isActive = t.key === active;
          return (
            <g key={t.key} opacity={isActive ? 1 : 0.25}>
              <line
                x1={420}
                y1={coverY}
                x2={580}
                y2={coverY}
                stroke={t.color}
                strokeWidth={isActive ? 3 : 1.5}
                strokeDasharray={isActive ? "" : "3 3"}
              />
              <text
                x={580}
                y={coverY - 6}
                textAnchor="end"
                fontSize="10"
                fill={t.color}
                fontFamily="sans-serif"
                fontWeight={isActive ? 700 : 400}
              >
                {t.dose} reverses to here ↑
              </text>
            </g>
          );
        })}

        {/* Footer */}
        <text x={60} y={232} fontSize="10" fill="hsl(var(--muted-foreground))">
          Reversal target: TOF ratio ≥ 0.9 before extubation
        </text>
      </svg>

      <div className="rounded-lg border border-border bg-card/50 p-3 text-sm">
        <div className="font-semibold text-foreground">{tier.dose} — {tier.depth}</div>
        <div className="text-muted-foreground mt-1">
          Restores TOF ratio ≥ 0.9 in {tier.time}. {tier.key === "rescue" && "Used for failed intubation following 1.2 mg/kg rocuronium RSI; faster than waiting for suxamethonium recovery."}
        </div>
      </div>
    </div>
  );
};

// =================================================================
// Kinetics chart — free rocuronium vs sugammadex-rocuronium complex
// =================================================================
const KineticsDiagram = () => {
  const [scenario, setScenario] = useState<"normal" | "renal">("normal");
  // Concentration curves over 0-180 min after sugammadex bolus at t=0
  // Rocuronium free t½ ~70 min; complex t½ ~100 min normal, ~24h+ in renal failure
  const points = useMemo(() => {
    const pts: { t: number; free: number; complex: number }[] = [];
    const tHalfFree = 30; // rapid drop because encapsulated
    const tHalfComplex = scenario === "normal" ? 100 : 1800;
    for (let t = 0; t <= 180; t += 5) {
      // Free roc: drops quickly to near zero (encapsulated)
      const free = 100 * Math.exp(-t / tHalfFree) * 0.05 + (t < 2 ? 50 : 0); // tiny residual
      // Complex: rises to ~95 then decays slowly
      const complex = 95 * (1 - Math.exp(-t / 1.5)) * Math.exp(-t / tHalfComplex);
      pts.push({ t, free: Math.max(0, free * 0.9), complex });
    }
    return pts;
  }, [scenario]);

  const W = 600, H = 260, PAD = 40;
  const xScale = (t: number) => PAD + (t / 180) * (W - PAD - 20);
  const yScale = (c: number) => H - PAD - (c / 100) * (H - PAD - 30);

  const pathFor = (key: "free" | "complex") =>
    points.map((p, i) => `${i === 0 ? "M" : "L"} ${xScale(p.t)} ${yScale(p[key])}`).join(" ");

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button size="sm" variant={scenario === "normal" ? "default" : "outline"} onClick={() => setScenario("normal")}>
          Normal renal function
        </Button>
        <Button size="sm" variant={scenario === "renal" ? "default" : "outline"} onClick={() => setScenario("renal")}>
          eGFR &lt; 30 mL/min
        </Button>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
        {/* Axes */}
        <line x1={PAD} y1={H - PAD} x2={W - 10} y2={H - PAD} stroke="hsl(var(--border))" />
        <line x1={PAD} y1={20} x2={PAD} y2={H - PAD} stroke="hsl(var(--border))" />
        <text x={W / 2} y={H - 10} textAnchor="middle" fontSize="10" fill="hsl(var(--muted-foreground))">
          Time after sugammadex bolus (min)
        </text>
        <text
          x={12}
          y={H / 2}
          textAnchor="middle"
          fontSize="10"
          fill="hsl(var(--muted-foreground))"
          transform={`rotate(-90 12 ${H / 2})`}
        >
          Plasma level (% peak)
        </text>

        {/* X ticks */}
        {[0, 30, 60, 90, 120, 150, 180].map((t) => (
          <g key={t}>
            <line x1={xScale(t)} y1={H - PAD} x2={xScale(t)} y2={H - PAD + 4} stroke="hsl(var(--muted-foreground))" />
            <text x={xScale(t)} y={H - PAD + 16} textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))">
              {t}
            </text>
          </g>
        ))}

        {/* Curves */}
        <path d={pathFor("complex")} fill="none" stroke="hsl(var(--primary))" strokeWidth={2} />
        <path d={pathFor("free")} fill="none" stroke="hsl(var(--destructive))" strokeWidth={2} strokeDasharray="4 3" />

        {/* Renal warning band */}
        {scenario === "renal" && (
          <g>
            <rect x={xScale(0)} y={20} width={xScale(180) - xScale(0)} height={H - PAD - 20} fill="hsl(var(--destructive) / 0.04)" />
            <text x={xScale(150)} y={40} textAnchor="end" fontSize="10" fill="hsl(var(--destructive))" fontWeight={600}>
              Complex t½ &gt; 24 h — assume rocuronium 'unavailable'
            </text>
          </g>
        )}

        {/* Legend */}
        <g transform={`translate(${PAD + 8}, 28)`}>
          <line x1={0} y1={0} x2={20} y2={0} stroke="hsl(var(--primary))" strokeWidth={2} />
          <text x={26} y={3} fontSize="10" fill="hsl(var(--foreground))">Sugammadex–rocuronium complex</text>
          <line x1={0} y1={16} x2={20} y2={16} stroke="hsl(var(--destructive))" strokeWidth={2} strokeDasharray="4 3" />
          <text x={26} y={19} fontSize="10" fill="hsl(var(--foreground))">Free rocuronium</text>
        </g>
      </svg>

      <div className="grid md:grid-cols-3 gap-3 text-sm">
        <div className="rounded-lg border border-border bg-card/50 p-3">
          <div className="text-xs uppercase tracking-wide text-muted-foreground">Sugammadex</div>
          <div className="text-foreground font-medium mt-1">t½ ≈ 1.8 h</div>
          <div className="text-muted-foreground text-xs mt-1">Vd ≈ 11–14 L · 100% renal clearance, unmetabolised.</div>
        </div>
        <div className="rounded-lg border border-border bg-card/50 p-3">
          <div className="text-xs uppercase tracking-wide text-muted-foreground">Rocuronium (free)</div>
          <div className="text-foreground font-medium mt-1">t½ ≈ 1.4 h</div>
          <div className="text-muted-foreground text-xs mt-1">Drops to near-zero immediately as encapsulation pulls free drug into plasma → into complex.</div>
        </div>
        <div className="rounded-lg border border-border bg-card/50 p-3">
          <div className="text-xs uppercase tracking-wide text-muted-foreground">Complex</div>
          <div className="text-foreground font-medium mt-1">{scenario === "normal" ? "t½ ≈ 1.7 h" : "t½ ≫ 24 h"}</div>
          <div className="text-muted-foreground text-xs mt-1">
            {scenario === "normal"
              ? "Excreted unchanged in urine. No metabolism."
              : "Accumulates in renal failure but reversal still effective; recurrence not seen at standard doses."}
          </div>
        </div>
      </div>
    </div>
  );
};

// =================================================================
// Main component
// =================================================================
export const SugammadexDiagram = () => {
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const verdict = decide(answers);
  const setA = (id: string, v: Answer) => setAnswers((s) => ({ ...s, [id]: v }));
  const reset = () => setAnswers({});
  const [encapsulated, setEncapsulated] = useState(true);

  return (
    <DiagramFigure
      id="sugammadex-diagram"
      title="Sugammadex"
      description="Auto-generated wrapper for the Sugammadex anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
                  <Card className="p-6 bg-gradient-to-br from-background to-muted/20">
        <div className="flex flex-col gap-1 mb-4">
          <h3 className="text-xl font-serif font-bold text-foreground">
            Sugammadex — encapsulation, dosing, kinetics & re-paralysis
          </h3>
          <p className="text-sm text-muted-foreground">
            Modified γ-cyclodextrin that encapsulates aminosteroid NMBAs in a 1:1 complex. The whole reversal story in four panels.
          </p>
        </div>
  
        <Tabs defaultValue="mechanism" className="w-full">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="mechanism">Mechanism</TabsTrigger>
            <TabsTrigger value="dose">Dose vs depth</TabsTrigger>
            <TabsTrigger value="kinetics">Kinetics</TabsTrigger>
            <TabsTrigger value="decision">Decision aid</TabsTrigger>
          </TabsList>
  
          {/* MECHANISM */}
          <TabsContent value="mechanism" className="mt-4 space-y-3">
            <div className="flex justify-end">
              <Button size="sm" variant="outline" onClick={() => setEncapsulated((v) => !v)}>
                {encapsulated ? "Show free rocuronium" : "Encapsulate"}
              </Button>
            </div>
            <MechanismDiagram encapsulated={encapsulated} />
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg border border-border bg-card/50 p-3">
                <div className="font-semibold text-foreground">1:1 stoichiometry</div>
                <div className="text-muted-foreground mt-1">
                  One sugammadex molecule wraps one rocuronium molecule by hydrophobic interaction with the steroid core, anchored by electrostatic interaction between the negatively-charged carboxyl groups on the cyclodextrin rim and the positively-charged quaternary nitrogen on rocuronium. The complex is biologically inert.
                </div>
              </div>
              <div className="rounded-lg border border-border bg-card/50 p-3">
                <div className="font-semibold text-foreground">Affinity ladder</div>
                <div className="text-muted-foreground mt-1">
                  Rocuronium ≫ vecuronium &gt; pancuronium. Does <span className="text-foreground font-medium">not</span> bind benzylisoquinoliniums (atracurium, cisatracurium, mivacurium) or suxamethonium — wrong shape, wrong charge.
                </div>
              </div>
            </div>
          </TabsContent>
  
          {/* DOSE VS DEPTH */}
          <TabsContent value="dose" className="mt-4">
            <DoseDepthDiagram />
          </TabsContent>
  
          {/* KINETICS */}
          <TabsContent value="kinetics" className="mt-4">
            <KineticsDiagram />
          </TabsContent>
  
          {/* DECISION AID */}
          <TabsContent value="decision" className="mt-4 space-y-3">
            <div className="space-y-2">
              {QUESTIONS.map((q) => (
                <div key={q.id} className="rounded-lg border border-border bg-card/50 p-3">
                  <div className="text-sm text-foreground mb-2">{q.text}</div>
                  <div className="flex gap-2">
                    {(["yes", "no", "unknown"] as Answer[]).map((v) => (
                      <Button
                        key={v}
                        size="sm"
                        variant={answers[q.id] === v ? "default" : "outline"}
                        onClick={() => setA(q.id, v)}
                        className="capitalize h-7 text-xs"
                      >
                        {v}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
              <div className="flex justify-end">
                <Button size="sm" variant="ghost" onClick={reset}>Reset</Button>
              </div>
            </div>
  
            <div
              className={`rounded-lg border p-4 ${
                verdict.give === "give"
                  ? "border-emerald-500/40 bg-emerald-500/5"
                  : verdict.give === "withhold"
                    ? "border-muted bg-muted/30"
                    : "border-amber-500/40 bg-amber-500/5"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`inline-block h-2 w-2 rounded-full ${
                    verdict.give === "give"
                      ? "bg-emerald-500"
                      : verdict.give === "withhold"
                        ? "bg-muted-foreground"
                        : "bg-amber-500"
                  }`}
                />
                <div className="text-sm font-semibold text-foreground">{verdict.headline}</div>
              </div>
              <div className="text-sm text-muted-foreground leading-relaxed">{verdict.detail}</div>
              <div className="mt-2 text-xs">
                <span className="font-semibold text-foreground">Dose:</span>{" "}
                <span className="text-muted-foreground">{verdict.dose}</span>
              </div>
              <div className="mt-1 text-xs">
                <span className="font-semibold text-foreground">Re-paralysis plan:</span>{" "}
                <span className="text-muted-foreground">{verdict.reparalysis}</span>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </DiagramFigure>
  );
};

export default SugammadexDiagram;

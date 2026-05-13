import { useState, useMemo } from "react";
import { Slider } from "@/components/ui/slider";
import { DiagramFigure } from "./_shared/DiagramFigure";

// =====================================================================
// Henderson–Hasselbalch interactive
// Weak base:  pKa = pH + log10([BH+]/[B])  →  [BH+]/[B] = 10^(pKa - pH)
// Weak acid:  pKa = pH + log10([A-]/[HA])  →  [A-]/[HA]  = 10^(pH - pKa)
// =====================================================================

type DrugType = "base" | "acid";

interface Scenario {
  id: string;
  label: string;
  short: string;
  drugType: DrugType;
  pKa: number;
  compartments: { name: string; pH: number; tone: "good" | "bad" | "neutral" }[];
  teaching: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: "la-infected",
    label: "LA in infected tissue",
    short: "Lidocaine, abscess",
    drugType: "base",
    pKa: 7.9,
    compartments: [
      { name: "Healthy tissue (pH 7.4)", pH: 7.4, tone: "good" },
      { name: "Infected/abscess (pH 6.4)", pH: 6.4, tone: "bad" },
    ],
    teaching:
      "Acidic infected tissue traps the LA in its ionised (BH⁺) form. Only the unionised base (B) crosses the nerve membrane — at pH 6.4 less than 4% is unionised, so onset is markedly slower and block density poorer. This is why dental abscesses 'won't take' a block, and why bicarbonate is added to LA solutions to raise pH and increase the unionised fraction.",
  },
  {
    id: "ion-trap-foetal",
    label: "Ion trapping — foetal acidosis",
    short: "Lidocaine to acidotic foetus",
    drugType: "base",
    pKa: 7.9,
    compartments: [
      { name: "Maternal plasma (pH 7.4)", pH: 7.4, tone: "neutral" },
      { name: "Healthy foetus (pH 7.35)", pH: 7.35, tone: "good" },
      { name: "Distressed foetus (pH 7.1)", pH: 7.1, tone: "bad" },
    ],
    teaching:
      "Unionised base crosses the placenta freely. In an acidotic foetus more drug is protonated to BH⁺, which cannot diffuse back — the drug accumulates ('ion trapping'). Clinically important for lidocaine, bupivacaine and pethidine in obstetrics; the more acidotic the foetus, the higher the foetal:maternal drug ratio.",
  },
  {
    id: "bicarb-la",
    label: "Bicarbonate added to LA",
    short: "Lidocaine + NaHCO₃",
    drugType: "base",
    pKa: 7.9,
    compartments: [
      { name: "Plain commercial LA (pH 4.5)", pH: 4.5, tone: "bad" },
      { name: "After NaHCO₃ (pH 7.2)", pH: 7.2, tone: "good" },
    ],
    teaching:
      "Commercial LA solutions are acidic for stability — at pH ~4.5 essentially 100% is ionised, so onset is slow and injection stings. Adding 1 mL 8.4% NaHCO₃ per 10 mL lidocaine raises the pH towards 7.2, dramatically increasing the unionised fraction and speeding onset. Adrenaline-containing solutions are even more acidic (pH ~3.5).",
  },
  {
    id: "aspirin-overdose",
    label: "Aspirin overdose — urinary alkalinisation",
    short: "Salicylate, weak acid",
    drugType: "acid",
    pKa: 3.5,
    compartments: [
      { name: "Acidic urine (pH 5.5)", pH: 5.5, tone: "bad" },
      { name: "Alkaline urine (pH 8.0)", pH: 8.0, tone: "good" },
    ],
    teaching:
      "Salicylate is a weak acid (pKa ≈ 3.5). At alkaline urinary pH it is almost entirely ionised (A⁻) and cannot be reabsorbed across renal tubular cells — it is trapped in the urine and excreted. Bicarbonate infusion to urine pH > 7.5 dramatically increases salicylate clearance.",
  },
  {
    id: "amphetamine",
    label: "Amphetamine OD — urinary acidification (historical)",
    short: "Amphetamine, weak base",
    drugType: "base",
    pKa: 9.9,
    compartments: [
      { name: "Alkaline urine (pH 8.0)", pH: 8.0, tone: "bad" },
      { name: "Acidic urine (pH 5.5)", pH: 5.5, tone: "good" },
    ],
    teaching:
      "Amphetamine is a strong base (pKa ≈ 9.9). In acidic urine it is fully protonated (BH⁺) and trapped → faster excretion. No longer routinely used (rhabdomyolysis risk) but illustrates ion trapping for basic drugs in the opposite direction to salicylate.",
  },
];

// =====================================================================
// Helpers
// =====================================================================
const fractionUnionised = (drugType: DrugType, pKa: number, pH: number): number => {
  // Returns fraction unionised (B for base, HA for acid) as 0..1
  if (drugType === "base") {
    const r = Math.pow(10, pKa - pH); // [BH+]/[B]
    return 1 / (1 + r); // [B] / total
  }
  // acid
  const r = Math.pow(10, pH - pKa); // [A-]/[HA]
  return 1 / (1 + r); // [HA] / total
};

export const HendersonHasselbalchDiagram = () => {
  const [drugType, setDrugType] = useState<DrugType>("base");
  const [pKa, setPKa] = useState(7.9);
  const [pH, setPH] = useState(7.4);
  const [scenarioId, setScenarioId] = useState<string | null>(null);

  const scenario = useMemo(() => SCENARIOS.find((s) => s.id === scenarioId) ?? null, [scenarioId]);

  const applyScenario = (s: Scenario) => {
    setScenarioId(s.id);
    setDrugType(s.drugType);
    setPKa(s.pKa);
    setPH(s.compartments[0].pH);
  };

  const fU = fractionUnionised(drugType, pKa, pH);
  const fI = 1 - fU;
  const pctU = fU * 100;
  const pctI = fI * 100;

  // Ratio expression
  const ratioStr = useMemo(() => {
    if (drugType === "base") {
      const r = Math.pow(10, pKa - pH); // BH+ : B
      if (r >= 1) return `${r.toFixed(2)} : 1`;
      return `1 : ${(1 / r).toFixed(2)}`;
    }
    const r = Math.pow(10, pH - pKa); // A- : HA
    if (r >= 1) return `${r.toFixed(2)} : 1`;
    return `1 : ${(1 / r).toFixed(2)}`;
  }, [drugType, pKa, pH]);

  // Curve plot
  const W = 480, H = 200, padL = 50, padR = 16, padT = 16, padB = 32;
  const plotW = W - padL - padR, plotH = H - padT - padB;
  const phMin = 3, phMax = 11;

  const curvePath = useMemo(() => {
    const pts: string[] = [];
    for (let i = 0; i <= 200; i++) {
      const ph = phMin + (i / 200) * (phMax - phMin);
      const f = fractionUnionised(drugType, pKa, ph) * 100;
      const x = padL + ((ph - phMin) / (phMax - phMin)) * plotW;
      const y = padT + plotH - (f / 100) * plotH;
      pts.push(`${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`);
    }
    return pts.join(" ");
  }, [drugType, pKa, plotW, plotH]);

  const xAt = (ph: number) => padL + ((ph - phMin) / (phMax - phMin)) * plotW;
  const yAt = (pct: number) => padT + plotH - (pct / 100) * plotH;

  const unionisedLabel = drugType === "base" ? "Unionised base (B) — crosses membrane" : "Unionised acid (HA) — crosses membrane";
  const ionisedLabel = drugType === "base" ? "Ionised (BH⁺) — trapped, active at receptor" : "Ionised (A⁻) — trapped";

  return (
    <DiagramFigure
      id="henderson-hasselbalch-diagram"
      title="Henderson hasselbalch"
      description="Auto-generated wrapper for the Henderson hasselbalch anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
          <div className="border border-border rounded-lg p-4 bg-card/30">
        <h3 className="text-lg font-serif font-bold text-foreground mb-1">Henderson–Hasselbalch — Interactive</h3>
        <p className="text-xs text-muted-foreground mb-4">
          Drag the pH and pKa sliders, or pick a clinical scenario to see how ionisation changes between compartments.
        </p>
  
        {/* Drug type toggle */}
        <div className="flex gap-2 mb-4">
          {(["base", "acid"] as DrugType[]).map((t) => (
            <button
              key={t}
              onClick={() => { setDrugType(t); setScenarioId(null); if (t === "acid" && pKa > 8) setPKa(3.5); }}
              className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-all ${
                drugType === t
                  ? "border-primary/60 bg-primary/10 text-foreground"
                  : "border-border text-muted-foreground hover:bg-secondary/40"
              }`}
            >
              Weak {t === "base" ? "Base (e.g. LA, opioid)" : "Acid (e.g. salicylate, barbiturate)"}
            </button>
          ))}
        </div>
  
        {/* Equation */}
        <div className="rounded-md bg-muted/40 p-3 mb-4 font-mono text-xs text-foreground text-center">
          {drugType === "base" ? (
            <>pKa = pH + log<sub>10</sub>([BH⁺] / [B]) &nbsp; → &nbsp; [BH⁺] : [B] = <span className="text-primary font-semibold">{ratioStr}</span></>
          ) : (
            <>pKa = pH + log<sub>10</sub>([A⁻] / [HA]) &nbsp; → &nbsp; [A⁻] : [HA] = <span className="text-primary font-semibold">{ratioStr}</span></>
          )}
        </div>
  
        <div className="grid lg:grid-cols-2 gap-4">
          {/* Sliders + readouts */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-foreground">pH</span>
                <span className="font-mono text-foreground">{pH.toFixed(2)}</span>
              </div>
              <Slider
                value={[pH]}
                min={3}
                max={11}
                step={0.05}
                onValueChange={(v) => { setPH(v[0]); setScenarioId(null); }}
              />
              <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                <span>3</span><span>5</span><span>7</span><span>9</span><span>11</span>
              </div>
            </div>
  
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-foreground">pKa</span>
                <span className="font-mono text-foreground">{pKa.toFixed(2)}</span>
              </div>
              <Slider
                value={[pKa]}
                min={2}
                max={11}
                step={0.05}
                onValueChange={(v) => { setPKa(v[0]); setScenarioId(null); }}
              />
              <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                <span>2</span><span>4</span><span>6</span><span>8</span><span>10</span>
              </div>
            </div>
  
            {/* Bar */}
            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span style={{ color: "hsl(170 50% 40%)" }} className="font-semibold">Unionised: {pctU.toFixed(1)}%</span>
                <span style={{ color: "hsl(340 60% 50%)" }} className="font-semibold">Ionised: {pctI.toFixed(1)}%</span>
              </div>
              <div className="h-6 w-full rounded-md overflow-hidden flex border border-border">
                <div
                  className="h-full transition-all duration-200 flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ width: `${pctU}%`, backgroundColor: "hsl(170 50% 40%)" }}
                >
                  {pctU > 8 ? (drugType === "base" ? "B" : "HA") : ""}
                </div>
                <div
                  className="h-full transition-all duration-200 flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ width: `${pctI}%`, backgroundColor: "hsl(340 60% 50%)" }}
                >
                  {pctI > 8 ? (drugType === "base" ? "BH⁺" : "A⁻") : ""}
                </div>
              </div>
              <p className="text-[10px] text-muted-foreground mt-1.5 leading-snug">
                <span style={{ color: "hsl(170 50% 40%)" }}>■</span> {unionisedLabel} &nbsp;
                <span style={{ color: "hsl(340 60% 50%)" }}>■</span> {ionisedLabel}
              </p>
            </div>
          </div>
  
          {/* Curve */}
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
            {/* gridlines */}
            {[0, 25, 50, 75, 100].map((v) => (
              <g key={v}>
                <line x1={padL} y1={yAt(v)} x2={W - padR} y2={yAt(v)} stroke="hsl(var(--border))" strokeWidth={0.5} />
                <text x={padL - 6} y={yAt(v) + 3} textAnchor="end" fontSize="9" className="fill-muted-foreground">{v}%</text>
              </g>
            ))}
            {[3, 5, 7, 9, 11].map((v) => (
              <g key={v}>
                <line x1={xAt(v)} y1={padT} x2={xAt(v)} y2={padT + plotH} stroke="hsl(var(--border))" strokeWidth={0.5} />
                <text x={xAt(v)} y={H - 12} textAnchor="middle" fontSize="9" className="fill-muted-foreground">{v}</text>
              </g>
            ))}
            <text x={W / 2} y={H - 1} textAnchor="middle" fontSize="9" className="fill-foreground font-medium">pH</text>
            <text x={10} y={padT + plotH / 2} textAnchor="middle" fontSize="9" className="fill-foreground font-medium" transform={`rotate(-90, 10, ${padT + plotH / 2})`}>% unionised</text>
  
            {/* pKa line */}
            <line x1={xAt(pKa)} y1={padT} x2={xAt(pKa)} y2={padT + plotH} stroke="hsl(var(--muted-foreground))" strokeWidth={1} strokeDasharray="3 3" />
            <text x={xAt(pKa)} y={padT - 4} textAnchor="middle" fontSize="9" className="fill-muted-foreground">pKa {pKa.toFixed(2)}</text>
  
            {/* curve */}
            <path d={curvePath} fill="none" stroke="hsl(170 50% 40%)" strokeWidth={2} />
  
            {/* current pH point */}
            <line x1={xAt(pH)} y1={padT} x2={xAt(pH)} y2={padT + plotH} stroke="hsl(210 70% 45%)" strokeWidth={1} opacity={0.5} />
            <circle cx={xAt(pH)} cy={yAt(pctU)} r={5} fill="hsl(170 50% 40%)" stroke="hsl(var(--card))" strokeWidth={2} />
            <text x={xAt(pH) + 8} y={yAt(pctU) - 6} fontSize="9" className="fill-foreground font-semibold">pH {pH.toFixed(2)}</text>
  
            {/* compartment markers if scenario active */}
            {scenario && scenario.compartments.map((c, i) => {
              const f = fractionUnionised(drugType, pKa, c.pH) * 100;
              const tone = c.tone === "good" ? "hsl(140 50% 45%)" : c.tone === "bad" ? "hsl(0 65% 50%)" : "hsl(var(--muted-foreground))";
              return (
                <g key={i}>
                  <circle cx={xAt(c.pH)} cy={yAt(f)} r={4} fill={tone} stroke="hsl(var(--card))" strokeWidth={1.5} />
                  <text x={xAt(c.pH)} y={padT + plotH + 14} textAnchor="middle" fontSize="8" fill={tone} fontWeight={600}>
                    {c.pH}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
  
        {/* Scenario picker */}
        <div className="mt-5">
          <p className="text-xs font-semibold text-foreground mb-2">Clinical scenarios</p>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {SCENARIOS.map((s) => (
              <button
                key={s.id}
                onClick={() => applyScenario(s)}
                className={`px-2.5 py-1 rounded text-[11px] font-medium border transition-all ${
                  scenarioId === s.id
                    ? "border-primary/60 bg-primary/10 text-foreground"
                    : "border-border text-muted-foreground hover:bg-secondary/40"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
  
          {scenario && (
            <div className="rounded-md border border-border p-3 bg-secondary/20 animate-fade-in">
              <p className="text-xs font-semibold text-foreground mb-2">{scenario.label} — {scenario.short} (pKa {scenario.pKa})</p>
              <div className="grid sm:grid-cols-3 gap-2 mb-2">
                {scenario.compartments.map((c) => {
                  const f = fractionUnionised(scenario.drugType, scenario.pKa, c.pH) * 100;
                  const tone = c.tone === "good" ? "hsl(140 50% 45%)" : c.tone === "bad" ? "hsl(0 65% 50%)" : "hsl(var(--muted-foreground))";
                  return (
                        <button
                      key={c.name}
                      onClick={() => setPH(c.pH)}
                      className={`text-left p-2 rounded border transition-all hover:bg-card ${
                        Math.abs(pH - c.pH) < 0.02 ? "border-primary/60 bg-card" : "border-border"
                      }`}
                    >
                      <p className="text-[10px] font-medium" style={{ color: tone }}>{c.name}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        Unionised: <span className="font-mono font-semibold text-foreground">{f.toFixed(1)}%</span>
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        Ionised: <span className="font-mono font-semibold text-foreground">{(100 - f).toFixed(1)}%</span>
                      </p>
                    </button>
    );
                })}
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{scenario.teaching}</p>
            </div>
          )}
        </div>
      </div>
    </DiagramFigure>
  );
};

export default HendersonHasselbalchDiagram;

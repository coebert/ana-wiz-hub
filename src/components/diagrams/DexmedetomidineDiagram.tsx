import { useState, useEffect } from "react";

type Tab = "locus" | "sleep" | "biphasic" | "dosing" | "vsClonidine";

export const DexmedetomidineDiagram = () => {
  const [tab, setTab] = useState<Tab>("locus");
  const [t, setT] = useState(0);
  const [bolusGiven, setBolusGiven] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setT((x) => x + 1), 50);
    return () => clearInterval(id);
  }, []);

  const tabs: { id: Tab; label: string }[] = [
    { id: "locus", label: "α2 in locus coeruleus" },
    { id: "sleep", label: "NREM-like sedation" },
    { id: "biphasic", label: "Biphasic BP response" },
    { id: "dosing", label: "ICU dosing" },
    { id: "vsClonidine", label: "vs clonidine" },
  ];

  const W = 660;
  const H = 360;

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      <div className="flex flex-wrap gap-1.5 justify-center">
        {tabs.map((tb) => (
          <button
            key={tb.id}
            onClick={() => setTab(tb.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              tab === tb.id
                ? "bg-pharmacology/10 border-pharmacology text-pharmacology"
                : "border-border text-muted-foreground hover:border-pharmacology/40"
            }`}
          >
            {tb.label}
          </button>
        ))}
      </div>

      {/* ============== LOCUS COERULEUS ============== */}
      {tab === "locus" && (
        <div className="bg-card rounded-xl border border-border p-4">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
            <text x={W / 2} y={24} textAnchor="middle" fontSize="13" className="fill-foreground font-bold">
              α₂A agonism at the locus coeruleus (LC) — pre-synaptic autoinhibition
            </text>

            {/* Brainstem outline */}
            <g transform="translate(50, 50)">
              <ellipse cx={130} cy={140} rx={130} ry={100} fill="hsl(20 30% 94%)" stroke="hsl(215 25% 35%)" strokeWidth="1" />
              <text x={130} y={50} textAnchor="middle" fontSize="9" className="fill-muted-foreground">pons</text>

              {/* LC nucleus */}
              <ellipse cx={130} cy={140} rx={20} ry={28} fill="hsl(220 60% 60%)" stroke="hsl(220 60% 30%)" strokeWidth="1.5" />
              <text x={130} y={144} textAnchor="middle" fontSize="9" className="fill-white font-bold">LC</text>

              {/* NA projections to cortex/thalamus (diminished when α2 activated) */}
              {[-60, -30, 0, 30, 60].map((angle, i) => {
                const rad = (angle * Math.PI) / 180;
                const x2 = 130 + 110 * Math.sin(rad);
                const y2 = 140 - 95 * Math.cos(rad);
                const dash = (t * 2 + i * 4) % 12;
                return (
                  <g key={i}>
                    <line x1={130} y1={140} x2={x2} y2={y2}
                      stroke="hsl(45 90% 55%)" strokeWidth="1.5"
                      strokeDasharray="3 9" strokeDashoffset={-dash} opacity={0.4} />
                  </g>
                );
              })}
              <text x={130} y={260} textAnchor="middle" fontSize="9" className="fill-[hsl(45_70%_40%)]">↓ NA output to cortex/thalamus</text>
            </g>

            {/* Synapse zoom */}
            <g transform="translate(340, 70)">
              <text x={140} y={0} textAnchor="middle" fontSize="11" className="fill-foreground font-semibold">Pre-synaptic LC neuron</text>

              {/* Terminal */}
              <path d="M 30 30 L 250 30 L 250 90 Q 140 110 30 90 Z"
                fill="hsl(220 30% 96%)" stroke="hsl(220 60% 40%)" strokeWidth="1" />

              {/* α2A autoreceptor */}
              <rect x={120} y={88} width={40} height={12} fill="hsl(220 60% 60%)" stroke="hsl(220 60% 30%)" strokeWidth="1" />
              <text x={140} y={112} textAnchor="middle" fontSize="9" className="fill-foreground font-medium">α₂A autoreceptor</text>

              {/* Dexmedetomidine binding */}
              <g transform={`translate(140, ${85 + Math.sin(t * 0.1) * 1.5})`}>
                <rect x={-14} y={-10} width={28} height={14} rx={3} fill="hsl(0 70% 50%)" />
                <text x={0} y={1} textAnchor="middle" fontSize="8" className="fill-white font-bold">DEX</text>
              </g>

              {/* Gi pathway */}
              <text x={20} y={140} fontSize="10" className="fill-foreground font-semibold">Gi-coupled cascade:</text>
              <text x={20} y={156} fontSize="9" className="fill-muted-foreground">↓ adenylyl cyclase → ↓ cAMP</text>
              <text x={20} y={170} fontSize="9" className="fill-muted-foreground">↑ K⁺ efflux (GIRK) → hyperpolarisation</text>
              <text x={20} y={184} fontSize="9" className="fill-muted-foreground">↓ Ca²⁺ influx → ↓ vesicle release</text>

              {/* Vesicle suppression */}
              <g opacity={0.4}>
                {[60, 100, 200, 230].map((cx, i) => (
                  <circle key={i} cx={cx} cy={50} r={6} fill="hsl(45 90% 55%)" stroke="hsl(45 70% 40%)" strokeWidth="0.75" />
                ))}
              </g>
              <text x={140} y={210} textAnchor="middle" fontSize="9" className="fill-[hsl(0_70%_45%)] font-medium">↓ NA release</text>

              {/* Synaptic cleft */}
              <line x1={30} y1={230} x2={250} y2={230} stroke="hsl(215 25% 50%)" strokeWidth="0.75" strokeDasharray="2 2" />
              <text x={140} y={245} textAnchor="middle" fontSize="9" className="fill-muted-foreground">cleft</text>

              {/* Post-synaptic */}
              <rect x={30} y={250} width={220} height={30} rx={4} fill="hsl(20 30% 94%)" stroke="hsl(215 25% 35%)" strokeWidth="1" />
              <text x={140} y={269} textAnchor="middle" fontSize="9" className="fill-foreground">↓ cortical/VLPO arousal</text>
            </g>

            {/* Selectivity badge */}
            <g transform="translate(20, 295)">
              <rect width={620} height={50} rx={6} fill="hsl(140 30% 95%)" stroke="hsl(140 50% 45%)" strokeWidth="1" />
              <text x={10} y={18} fontSize="11" className="fill-foreground font-semibold">α₂ : α₁ selectivity</text>
              <text x={10} y={35} fontSize="10" className="fill-muted-foreground">Dexmedetomidine <strong>1620 : 1</strong> (highly selective) &nbsp;·&nbsp; Clonidine 220 : 1 &nbsp;·&nbsp; Selectivity drives the absence of analgesia-only / depressor-only effects in clonidine.</text>
            </g>
          </svg>
        </div>
      )}

      {/* ============== NREM SLEEP ============== */}
      {tab === "sleep" && (
        <div className="bg-card rounded-xl border border-border p-4">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
            <text x={W / 2} y={24} textAnchor="middle" fontSize="13" className="fill-foreground font-bold">
              NREM-stage-2-like sedation via the natural sleep pathway
            </text>

            {/* Pathway flow */}
            <g transform="translate(40, 60)">
              <rect width={140} height={50} rx={6} fill="hsl(220 30% 95%)" stroke="hsl(220 60% 40%)" strokeWidth="1.5" />
              <text x={70} y={22} textAnchor="middle" fontSize="11" className="fill-foreground font-semibold">Locus coeruleus</text>
              <text x={70} y={38} textAnchor="middle" fontSize="9" className="fill-muted-foreground">(NA arousal nucleus)</text>
            </g>

            {/* arrow */}
            <line x1={180} y1={85} x2={230} y2={85} stroke="hsl(215 25% 50%)" strokeWidth="1.5" markerEnd="url(#arrSleep)" />
            <text x={205} y={78} textAnchor="middle" fontSize="9" className="fill-foreground">DEX</text>

            <g transform="translate(230, 60)">
              <rect width={170} height={50} rx={6} fill="hsl(0 30% 95%)" stroke="hsl(0 60% 50%)" strokeWidth="1.5" />
              <text x={85} y={22} textAnchor="middle" fontSize="11" className="fill-foreground font-semibold">↓ NA inhibition of</text>
              <text x={85} y={38} textAnchor="middle" fontSize="11" className="fill-foreground font-semibold">VLPO</text>
            </g>

            <line x1={400} y1={85} x2={450} y2={85} stroke="hsl(215 25% 50%)" strokeWidth="1.5" markerEnd="url(#arrSleep)" />

            <g transform="translate(450, 60)">
              <rect width={170} height={50} rx={6} fill="hsl(140 30% 95%)" stroke="hsl(140 50% 45%)" strokeWidth="1.5" />
              <text x={85} y={22} textAnchor="middle" fontSize="11" className="fill-foreground font-semibold">VLPO disinhibits</text>
              <text x={85} y={38} textAnchor="middle" fontSize="11" className="fill-foreground font-semibold">→ GABAergic outflow</text>
            </g>

            {/* Down arrow */}
            <line x1={535} y1={110} x2={535} y2={140} stroke="hsl(215 25% 50%)" strokeWidth="1.5" markerEnd="url(#arrSleep)" />

            <g transform="translate(360, 140)">
              <rect width={260} height={50} rx={6} fill="hsl(260 30% 95%)" stroke="hsl(260 50% 50%)" strokeWidth="1.5" />
              <text x={130} y={22} textAnchor="middle" fontSize="11" className="fill-foreground font-semibold">Tuberomammillary nucleus</text>
              <text x={130} y={38} textAnchor="middle" fontSize="9" className="fill-muted-foreground">↓ histamine → cortical sleep state</text>
            </g>

            {/* EEG comparison */}
            <text x={40} y={170} fontSize="11" className="fill-foreground font-semibold">EEG signature</text>

            {(() => {
              const lines = [
                { label: "Awake", y: 195, freq: 14, amp: 8, color: "hsl(45 80% 50%)" },
                { label: "DEX sedation", y: 235, freq: 4, amp: 18, color: "hsl(220 60% 50%)", spindles: true },
                { label: "Propofol", y: 275, freq: 2, amp: 14, color: "hsl(0 60% 50%)" },
              ];
              return lines.map((ln) => {
                let path = `M 20 ${ln.y}`;
                for (let x = 0; x <= 320; x += 4) {
                  const v = Math.sin((x * ln.freq) / 30 + t * 0.05) * ln.amp;
                  // Add NREM spindles for DEX
                  let extra = 0;
                  if (ln.spindles) {
                    const spindlePhase = (x + (t * 0.5) % 80) / 80;
                    if (spindlePhase > 0.6 && spindlePhase < 0.85) {
                      extra = Math.sin(x * 0.8) * 8 * Math.sin((spindlePhase - 0.6) * 12);
                    }
                  }
                  path += ` L ${20 + x} ${ln.y + v + extra}`;
                }
                return (
                  <g key={ln.label}>
                    <path d={path} fill="none" stroke={ln.color} strokeWidth="1.5" />
                    <text x={350} y={ln.y + 4} fontSize="10" className="fill-foreground">{ln.label}</text>
                  </g>
                );
              });
            })()}

            <g transform="translate(420, 215)">
              <rect width={210} height={120} rx={6} fill="hsl(45 30% 95%)" stroke="hsl(45 80% 50%)" strokeWidth="1" />
              <text x={10} y={18} fontSize="11" className="fill-foreground font-semibold">Why this matters clinically</text>
              <text x={10} y={36} fontSize="9" className="fill-muted-foreground">• Easily rousable ("co-operative sedation")</text>
              <text x={10} y={50} fontSize="9" className="fill-muted-foreground">• Patient follows commands when stimulated</text>
              <text x={10} y={64} fontSize="9" className="fill-muted-foreground">• Minimal respiratory depression</text>
              <text x={10} y={78} fontSize="9" className="fill-muted-foreground">• Sleep spindles & K-complexes on EEG</text>
              <text x={10} y={92} fontSize="9" className="fill-muted-foreground">• ↓ delirium vs benzodiazepines (SEDCOM,</text>
              <text x={10} y={104} fontSize="9" className="fill-muted-foreground">  MIDEX/PRODEX)</text>
            </g>

            <defs>
              <marker id="arrSleep" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(215 25% 50%)" />
              </marker>
            </defs>
          </svg>
        </div>
      )}

      {/* ============== BIPHASIC BP ============== */}
      {tab === "biphasic" && (
        <div className="bg-card rounded-xl border border-border p-4">
          <svg viewBox={`0 0 ${W} 320`} className="w-full">
            <text x={W / 2} y={24} textAnchor="middle" fontSize="13" className="fill-foreground font-bold">
              Biphasic blood-pressure response
            </text>
            <text x={W / 2} y={42} textAnchor="middle" fontSize="10" className="fill-muted-foreground">
              {bolusGiven ? "With loading dose 1 µg/kg over 10 min" : "Slow infusion only — no bolus"}
            </text>

            {/* Axes */}
            <line x1={50} y1={250} x2={620} y2={250} stroke="hsl(215 25% 50%)" strokeWidth="1" />
            <line x1={50} y1={70} x2={50} y2={250} stroke="hsl(215 25% 50%)" strokeWidth="1" />
            <text x={335} y={275} textAnchor="middle" fontSize="10" className="fill-muted-foreground">time (min)</text>
            <text x={20} y={160} textAnchor="middle" fontSize="10" transform="rotate(-90, 20, 160)" className="fill-muted-foreground">MAP (mmHg)</text>

            {/* Baseline marker */}
            <line x1={50} y1={170} x2={620} y2={170} stroke="hsl(215 25% 70%)" strokeWidth="0.75" strokeDasharray="3 3" />
            <text x={620} y={167} textAnchor="end" fontSize="9" className="fill-muted-foreground">baseline 90</text>

            {/* X labels */}
            {[0, 10, 20, 30, 60, 90, 120].map((min) => {
              const x = 50 + (min / 120) * 570;
              return (
                <g key={min}>
                  <line x1={x} y1={250} x2={x} y2={254} stroke="hsl(215 25% 50%)" strokeWidth="1" />
                  <text x={x} y={266} textAnchor="middle" fontSize="9" className="fill-muted-foreground">{min}</text>
                </g>
              );
            })}

            {/* MAP curve */}
            {(() => {
              let path = "";
              for (let min = 0; min <= 120; min += 0.5) {
                let map = 90; // baseline
                if (bolusGiven) {
                  // Phase 1: hypertensive peak from peripheral α2B, peak ~3-5 min, MAP ~115
                  if (min < 12) {
                    map = 90 + 30 * Math.exp(-Math.pow((min - 4) / 3, 2));
                  } else {
                    // Phase 2: central α2A dominates, gradual fall, plateau ~75-80
                    map = 90 - 15 * (1 - Math.exp(-(min - 12) / 15));
                  }
                } else {
                  // Slow infusion: gradual fall, no peak
                  map = 90 - 12 * (1 - Math.exp(-min / 25));
                }
                const x = 50 + (min / 120) * 570;
                const y = 250 - ((map - 40) / 100) * 180;
                path += min === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
              }
              return <path d={path} fill="none" stroke="hsl(0 70% 50%)" strokeWidth="2" />;
            })()}

            {/* Phase annotations */}
            {bolusGiven && (
              <>
                <g transform="translate(95, 80)">
                  <rect width={140} height={36} rx={4} fill="hsl(0 30% 95%)" stroke="hsl(0 60% 50%)" strokeWidth="1" />
                  <text x={70} y={15} textAnchor="middle" fontSize="9" className="fill-foreground font-semibold">Phase 1: hypertensive</text>
                  <text x={70} y={28} textAnchor="middle" fontSize="8" className="fill-muted-foreground">peripheral α₂B vasoconstriction</text>
                </g>
                <line x1={165} y1={116} x2={165} y2={140} stroke="hsl(0 60% 50%)" strokeWidth="1" strokeDasharray="2 2" />

                <g transform="translate(310, 200)">
                  <rect width={170} height={36} rx={4} fill="hsl(220 30% 95%)" stroke="hsl(220 60% 40%)" strokeWidth="1" />
                  <text x={85} y={15} textAnchor="middle" fontSize="9" className="fill-foreground font-semibold">Phase 2: hypotension + bradycardia</text>
                  <text x={85} y={28} textAnchor="middle" fontSize="8" className="fill-muted-foreground">central α₂A → ↓ sympathetic outflow</text>
                </g>
              </>
            )}

            {/* Mechanism summary */}
            <g transform="translate(50, 285)">
              <text fontSize="9" className="fill-muted-foreground">
                <tspan className="fill-foreground font-semibold">Avoidance:</tspan> omit the bolus or give over ≥ 20 min · maintenance 0.2–0.7 µg/kg/h · pre-treat hypovolaemia.
              </text>
            </g>
          </svg>

          <div className="mt-3 flex gap-2">
            <button
              onClick={() => setBolusGiven(true)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${bolusGiven ? "bg-pharmacology/10 border-pharmacology text-pharmacology" : "border-border text-muted-foreground"}`}
            >
              With loading bolus (1 µg/kg / 10 min)
            </button>
            <button
              onClick={() => setBolusGiven(false)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${!bolusGiven ? "bg-pharmacology/10 border-pharmacology text-pharmacology" : "border-border text-muted-foreground"}`}
            >
              Slow infusion only
            </button>
          </div>
        </div>
      )}

      {/* ============== ICU DOSING ============== */}
      {tab === "dosing" && (
        <div className="bg-card rounded-xl border border-border p-4">
          <svg viewBox={`0 0 ${W} 320`} className="w-full">
            <text x={W / 2} y={24} textAnchor="middle" fontSize="13" className="fill-foreground font-bold">ICU sedation dosing & PK</text>

            {/* Dose bands */}
            <text x={40} y={60} fontSize="10" className="fill-foreground font-semibold">Maintenance infusion (µg/kg/h)</text>
            {(() => {
              const bands = [
                { x: 50, w: 110, color: "hsl(140 55% 70%)", label: "0.2–0.7", sub: "Standard sedation" },
                { x: 160, w: 130, color: "hsl(45 85% 70%)", label: "0.7–1.4", sub: "Deeper sedation" },
                { x: 290, w: 130, color: "hsl(25 80% 65%)", label: "≥ 1.4", sub: "Off-label, ↑ HD risk" },
                { x: 420, w: 200, color: "hsl(220 50% 75%)", label: "1 µg/kg / 10 min", sub: "Optional load (↑ BP risk)" },
              ];
              return bands.map((b, i) => (
                <g key={i}>
                  <rect x={b.x} y={70} width={b.w} height={50} fill={b.color} stroke="hsl(215 25% 30%)" strokeWidth="0.5" />
                  <text x={b.x + b.w / 2} y={92} textAnchor="middle" fontSize="11" className="fill-foreground font-bold">{b.label}</text>
                  <text x={b.x + b.w / 2} y={108} textAnchor="middle" fontSize="9" className="fill-foreground">{b.sub}</text>
                </g>
              ));
            })()}

            {/* PK panel */}
            <g transform="translate(40, 145)">
              <rect width={290} height={150} rx={6} fill="hsl(210 30% 96%)" stroke="hsl(215 25% 60%)" strokeWidth="1" />
              <text x={10} y={20} fontSize="11" className="fill-foreground font-semibold">Pharmacokinetics</text>
              <text x={10} y={40} fontSize="10" className="fill-muted-foreground">• Distribution t½ (α): ~6 min</text>
              <text x={10} y={56} fontSize="10" className="fill-muted-foreground">• Elimination t½ (β): ~2 h</text>
              <text x={10} y={72} fontSize="10" className="fill-muted-foreground">• Vd ~118 L · Clearance ~39 L/h</text>
              <text x={10} y={88} fontSize="10" className="fill-muted-foreground">• Hepatic glucuronidation + CYP2A6</text>
              <text x={10} y={104} fontSize="10" className="fill-muted-foreground">• Inactive metabolites — renal excretion</text>
              <text x={10} y={120} fontSize="10" className="fill-muted-foreground">• Highly protein-bound (94%)</text>
              <text x={10} y={138} fontSize="10" className="fill-[hsl(0_50%_35%)] font-medium">↓ dose in hepatic dysfunction</text>
            </g>

            {/* Indications panel */}
            <g transform="translate(345, 145)">
              <rect width={295} height={150} rx={6} fill="hsl(140 30% 96%)" stroke="hsl(140 50% 45%)" strokeWidth="1" />
              <text x={10} y={20} fontSize="11" className="fill-foreground font-semibold">Indications & advantages</text>
              <text x={10} y={40} fontSize="10" className="fill-muted-foreground">• Light sedation in ventilated ICU patients</text>
              <text x={10} y={56} fontSize="10" className="fill-muted-foreground">• Sedation for non-intubated procedures</text>
              <text x={10} y={72} fontSize="10" className="fill-muted-foreground">• Awake fibre-optic intubation (AFOI)</text>
              <text x={10} y={88} fontSize="10" className="fill-muted-foreground">• Withdrawal: ETOH, opioids</text>
              <text x={10} y={104} fontSize="10" className="fill-muted-foreground">• Adjunct in regional anaesthesia (prolongs block)</text>
              <text x={10} y={122} fontSize="10" className="fill-foreground font-semibold">Adverse effects:</text>
              <text x={10} y={138} fontSize="9" className="fill-muted-foreground">bradycardia, hypotension, dry mouth, rebound HTN</text>
            </g>

            <text x={40} y={315} fontSize="9" className="fill-muted-foreground">
              <tspan className="fill-foreground font-semibold">SPICE-III (2019):</tspan> dexmedetomidine non-inferior to propofol/midazolam for 90-day mortality; more ventilator-free days, less delirium.
            </text>
          </svg>
        </div>
      )}

      {/* ============== vs CLONIDINE ============== */}
      {tab === "vsClonidine" && (
        <div className="bg-card rounded-xl border border-border p-4">
          <h4 className="text-sm font-bold text-foreground text-center mb-3">Dexmedetomidine vs clonidine</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-2 text-foreground"></th>
                  <th className="text-left py-2 px-2 text-foreground">Dexmedetomidine</th>
                  <th className="text-left py-2 px-2 text-foreground">Clonidine</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {[
                  ["α₂ : α₁ selectivity", "1620 : 1 (highly selective)", "220 : 1"],
                  ["Class", "Imidazole, dextro-isomer of medetomidine", "Imidazoline"],
                  ["Routes", "IV infusion (intranasal/buccal off-label)", "PO, IV, epidural, intrathecal, transdermal"],
                  ["Onset (IV)", "5–10 min (without bolus)", "10–20 min"],
                  ["Elimination t½", "~2 h", "~12 h"],
                  ["Sedation depth", "Co-operative, NREM-like, easily roused", "Mild sedation, less profound"],
                  ["Respiratory effect", "Minimal depression — safe in spont. vent.", "Minimal"],
                  ["BP response", "Marked biphasic (HTN with bolus, then ↓)", "Mainly hypotension; less hypertensive peak"],
                  ["Bradycardia", "Common, sometimes severe", "Less marked"],
                  ["Analgesia", "Modest, opioid-sparing", "Modest, useful for neuraxial adjunct"],
                  ["Rebound on cessation", "Possible after prolonged use", "Well documented hypertension; taper"],
                  ["Licensed ICU sedation (UK)", "Yes (Dexdor)", "No (off-label)"],
                  ["Cost", "£££", "£"],
                ].map(([k, d, c]) => (
                  <tr key={k} className="border-b border-border/50 align-top">
                    <td className="py-1.5 px-2 font-medium text-foreground">{k}</td>
                    <td className="py-1.5 px-2">{d}</td>
                    <td className="py-1.5 px-2">{c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-3 bg-secondary/30 rounded-lg border border-border p-3">
            <p className="text-xs text-muted-foreground">
              <strong className="text-foreground">Bottom line:</strong> dexmedetomidine's higher α₂ selectivity gives a cleaner sedation profile with minimal respiratory depression and a sleep-like state — at the cost of bradycardia, biphasic BP, and a much higher price than clonidine. Clonidine remains useful as a cheap, oral, multi-route adjunct (premedication, neuraxial, withdrawal) where rapid titration and pure α₂ effect are not essential.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DexmedetomidineDiagram;

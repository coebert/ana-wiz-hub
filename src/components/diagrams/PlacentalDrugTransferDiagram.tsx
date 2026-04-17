import { useState } from "react";

type Drug = {
  id: string;
  name: string;
  // 0 (does not cross) to 100 (crosses freely) — clinical "fetal:maternal ratio" surrogate
  transfer: number;
  mw: number; // Da
  lipid: "Low" | "Moderate" | "High" | "Very high";
  proteinBinding: number; // %
  ionised: "Mostly unionised" | "Mixed" | "Mostly ionised" | "Fully ionised";
  determinant: string;
  clinical: string;
  color: string;
};

const DRUGS: Drug[] = [
  {
    id: "thio",
    name: "Thiopentone",
    transfer: 90,
    mw: 264,
    lipid: "High",
    proteinBinding: 80,
    ionised: "Mostly unionised",
    determinant: "Lipid solubility wins — crosses rapidly despite 80% protein binding (free fraction equilibrates fast).",
    clinical: "Detectable in foetal circulation within 30 s of induction; foetal levels reach maternal within 3 min. Historically used for LSCS GA — neonatal sedation possible at high doses.",
    color: "hsl(0 75% 55%)",
  },
  {
    id: "prop",
    name: "Propofol",
    transfer: 85,
    mw: 178,
    lipid: "Very high",
    proteinBinding: 98,
    ionised: "Mostly unionised",
    determinant: "Very lipid-soluble + small + unionised → crosses readily.",
    clinical: "Now standard induction for category-1 LSCS in many UK units. Foetal:maternal ratio ~0.7. Brief neonatal effect; well-tolerated.",
    color: "hsl(15 80% 55%)",
  },
  {
    id: "fent",
    name: "Fentanyl",
    transfer: 80,
    mw: 336,
    lipid: "Very high",
    proteinBinding: 84,
    ionised: "Mostly unionised",
    determinant: "Lipid solubility + unionised at physiological pH — crosses freely. Ion trapping occurs in acidotic foetus.",
    clinical: "Used in epidural mixtures and for category-1 LSCS GA. Foetal acidosis → ion trapping → higher fetal levels (relevant in distressed labour).",
    color: "hsl(20 75% 55%)",
  },
  {
    id: "lido",
    name: "Lidocaine",
    transfer: 70,
    mw: 234,
    lipid: "Moderate",
    proteinBinding: 65,
    ionised: "Mixed",
    determinant: "Weak base (pKa 7.9) — significant unionised fraction at maternal pH. Ion trapping in acidotic foetus.",
    clinical: "Classical example of ION TRAPPING — foetal acidosis converts unionised → ionised in foetal compartment, accumulates. Foetal:maternal ratio rises from 0.5 to >1.0 in distressed foetus.",
    color: "hsl(40 80% 50%)",
  },
  {
    id: "bupi",
    name: "Bupivacaine",
    transfer: 30,
    mw: 288,
    lipid: "Very high",
    proteinBinding: 95,
    ionised: "Mostly ionised",
    determinant: "HIGH protein binding limits free fraction; pKa 8.1 means largely ionised at pH 7.4.",
    clinical: "Workhorse for epidural/spinal LSCS partly because of LOW placental transfer. Foetal:maternal ratio ~0.3. Cardiotoxicity to mother is the bigger concern, not the foetus.",
    color: "hsl(60 70% 50%)",
  },
  {
    id: "warfarin",
    name: "Warfarin",
    transfer: 95,
    mw: 308,
    lipid: "High",
    proteinBinding: 99,
    ionised: "Mostly unionised",
    determinant: "Small + lipid-soluble + unionised (weak acid, pKa 5.0 → mostly unionised at pH 7.4) — TERATOGEN.",
    clinical: "TERATOGENIC — warfarin embryopathy (chondrodysplasia punctata, nasal hypoplasia) in 1st trimester; CNS haemorrhage 2nd/3rd. Switch to LMWH in pregnancy. Mechanical valve dilemma is exam-favourite.",
    color: "hsl(330 65% 55%)",
  },
  {
    id: "sux",
    name: "Suxamethonium",
    transfer: 5,
    mw: 397,
    lipid: "Low",
    proteinBinding: 30,
    ionised: "Fully ionised",
    determinant: "TWO QUATERNARY AMMONIUM groups → permanent positive charge → cannot cross lipid bilayer.",
    clinical: "Negligible placental transfer at standard doses (1–1.5 mg/kg). Safe for RSI in obstetric GA. Theoretical neonatal weakness only at massive doses (e.g. >3 mg/kg) or if foetus has pseudocholinesterase deficiency.",
    color: "hsl(195 70% 50%)",
  },
  {
    id: "rocur",
    name: "Rocuronium",
    transfer: 12,
    mw: 530,
    lipid: "Low",
    proteinBinding: 30,
    ionised: "Fully ionised",
    determinant: "Aminosteroid with quaternary nitrogen — large + ionised → poor transfer.",
    clinical: "Foetal:maternal ratio ~0.15. Now standard for obstetric RSI (replacing sux in many units, especially with sugammadex available for reversal).",
    color: "hsl(210 65% 50%)",
  },
  {
    id: "heparin",
    name: "Heparin (unfractionated)",
    transfer: 0,
    mw: 12000,
    lipid: "Low",
    proteinBinding: 95,
    ionised: "Fully ionised",
    determinant: "MASSIVE molecule (>1000 Da threshold) + highly polar/charged → cannot cross at all.",
    clinical: "Anticoagulant of choice in pregnancy — does not cross placenta, does not cross into breast milk. LMWH (4–6 kDa) similarly safe. Contrast with warfarin (308 Da, teratogenic).",
    color: "hsl(245 60% 55%)",
  },
  {
    id: "lmwh",
    name: "LMWH (e.g. enoxaparin)",
    transfer: 0,
    mw: 4500,
    lipid: "Low",
    proteinBinding: 80,
    ionised: "Fully ionised",
    determinant: "Still well above 1000 Da molecular weight cut-off; highly charged.",
    clinical: "Standard anticoagulant in pregnancy. Issues are maternal (anti-Xa monitoring, neuraxial timing 24 h after therapeutic dose) — not foetal transfer.",
    color: "hsl(265 55% 55%)",
  },
  {
    id: "insulin",
    name: "Insulin",
    transfer: 0,
    mw: 5800,
    lipid: "Low",
    proteinBinding: 5,
    ionised: "Mixed",
    determinant: "Large protein (5.8 kDa) >> 1000 Da threshold.",
    clinical: "Maternal insulin does NOT cross — but maternal hyperglycaemia DOES. Foetal pancreas responds with own insulin → macrosomia + neonatal hypoglycaemia after delivery.",
    color: "hsl(280 55% 55%)",
  },
  {
    id: "glyco",
    name: "Glycopyrrolate",
    transfer: 5,
    mw: 398,
    lipid: "Low",
    proteinBinding: 0,
    ionised: "Fully ionised",
    determinant: "Quaternary amine → permanently charged → does not cross.",
    clinical: "Preferred antimuscarinic in pregnancy/labour. Atropine (tertiary amine) DOES cross and increases foetal heart rate. Choose glycopyrrolate when foetal effect is undesirable.",
    color: "hsl(150 55% 45%)",
  },
];

const DETERMINANTS = [
  {
    id: "mw",
    name: "Molecular Weight",
    icon: "⚖",
    rule: "< 500 Da → crosses easily; 500–1000 Da → some transfer; > 1000 Da → minimal transfer",
    examples: "Heparin (12 000 Da, 0%) vs warfarin (308 Da, 95%)",
    color: "hsl(0 75% 55%)",
  },
  {
    id: "lipid",
    name: "Lipid Solubility",
    icon: "💧",
    rule: "Lipid-soluble drugs cross the lipid bilayer of placental syncytiotrophoblast freely",
    examples: "Thiopentone, propofol, fentanyl — high lipid solubility, fast transfer",
    color: "hsl(40 80% 55%)",
  },
  {
    id: "pb",
    name: "Protein Binding",
    icon: "🔗",
    rule: "Only the FREE fraction crosses. Highly bound drugs have low free fraction → less transfer",
    examples: "Bupivacaine (95% bound, ratio 0.3) vs lidocaine (65% bound, ratio 0.5)",
    color: "hsl(150 55% 45%)",
  },
  {
    id: "ion",
    name: "Degree of Ionisation",
    icon: "⊕",
    rule: "Unionised molecules cross; ionised do not. pKa + pH dictate fraction. Quaternary amines NEVER cross.",
    examples: "Suxamethonium / rocuronium / glycopyrrolate (quaternary, do not cross). Lidocaine ion-traps in foetal acidosis.",
    color: "hsl(280 55% 55%)",
  },
];

const PlacentalDrugTransferDiagram = () => {
  const [selectedId, setSelectedId] = useState<string>("thio");
  const [hoveredDeterminant, setHoveredDeterminant] = useState<string | null>(null);

  const sel = DRUGS.find((d) => d.id === selectedId)!;

  // Plot dimensions
  const W = 600;
  const H = 280;
  const PAD_L = 60;
  const PAD_R = 30;
  const PAD_T = 20;
  const PAD_B = 50;

  // X-axis: log10(MW) from 100 (2) to 20000 (~4.3)
  const xScale = (mw: number) => {
    const log = Math.log10(Math.max(100, mw));
    const minLog = 2;
    const maxLog = 4.3;
    return PAD_L + ((log - minLog) / (maxLog - minLog)) * (W - PAD_L - PAD_R);
  };
  // Y-axis: transfer 0–100, inverted
  const yScale = (t: number) => PAD_T + (1 - t / 100) * (H - PAD_T - PAD_B);

  return (
    <div className="my-6 rounded-lg border border-border bg-card p-4">
      <p className="text-sm font-semibold text-foreground mb-1 text-center">
        Placental Drug Transfer — The Four Determinants
      </p>
      <p className="text-xs text-muted-foreground text-center mb-3">
        Whether a drug crosses the placenta is governed by molecular weight, lipid solubility, protein binding and ionisation. Click a drug to see how all four play out.
      </p>

      {/* Four-determinant cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
        {DETERMINANTS.map((det) => (
          <div
            key={det.id}
            onMouseEnter={() => setHoveredDeterminant(det.id)}
            onMouseLeave={() => setHoveredDeterminant(null)}
            className="p-2 rounded-lg border-2 transition cursor-help"
            style={{
              borderColor: hoveredDeterminant === det.id ? det.color : `${det.color}55`,
              background: hoveredDeterminant === det.id ? `${det.color}15` : `${det.color}08`,
            }}
          >
            <p className="text-base mb-0.5">{det.icon}</p>
            <p className="text-[11px] font-bold" style={{ color: det.color }}>{det.name}</p>
            <p className="text-[10px] text-muted-foreground leading-snug mt-1">{det.rule}</p>
            {hoveredDeterminant === det.id && (
              <p className="text-[10px] text-foreground italic mt-1 pt-1 border-t border-border leading-snug">
                e.g. {det.examples}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-4 items-start">
        {/* Scatter plot: MW vs Transfer */}
        <div>
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Scatter plot of molecular weight vs placental transfer">
            {/* Background zones */}
            <rect x={PAD_L} y={PAD_T} width={xScale(500) - PAD_L} height={H - PAD_T - PAD_B} fill="hsl(0 75% 55%)" opacity="0.05" />
            <rect x={xScale(500)} y={PAD_T} width={xScale(1000) - xScale(500)} height={H - PAD_T - PAD_B} fill="hsl(40 80% 55%)" opacity="0.05" />
            <rect x={xScale(1000)} y={PAD_T} width={W - PAD_R - xScale(1000)} height={H - PAD_T - PAD_B} fill="hsl(150 55% 45%)" opacity="0.05" />

            {/* MW threshold lines */}
            <line x1={xScale(500)} y1={PAD_T} x2={xScale(500)} y2={H - PAD_B} stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" strokeDasharray="3 3" />
            <line x1={xScale(1000)} y1={PAD_T} x2={xScale(1000)} y2={H - PAD_B} stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" strokeDasharray="3 3" />
            <text x={xScale(500)} y={PAD_T - 5} textAnchor="middle" fontSize="8" fill="hsl(var(--muted-foreground))">500 Da</text>
            <text x={xScale(1000)} y={PAD_T - 5} textAnchor="middle" fontSize="8" fill="hsl(var(--muted-foreground))">1000 Da</text>

            {/* Axes */}
            <line x1={PAD_L} y1={H - PAD_B} x2={W - PAD_R} y2={H - PAD_B} stroke="hsl(var(--foreground))" strokeWidth="1" />
            <line x1={PAD_L} y1={PAD_T} x2={PAD_L} y2={H - PAD_B} stroke="hsl(var(--foreground))" strokeWidth="1" />

            {/* Y axis labels */}
            {[0, 25, 50, 75, 100].map((v) => (
              <g key={v}>
                <line x1={PAD_L - 4} y1={yScale(v)} x2={PAD_L} y2={yScale(v)} stroke="hsl(var(--foreground))" strokeWidth="0.6" />
                <text x={PAD_L - 8} y={yScale(v) + 3} textAnchor="end" fontSize="9" fill="hsl(var(--muted-foreground))">{v}%</text>
              </g>
            ))}
            <text x={15} y={(PAD_T + H - PAD_B) / 2} textAnchor="middle" fontSize="10" fontWeight="700" fill="hsl(var(--foreground))" transform={`rotate(-90 15 ${(PAD_T + H - PAD_B) / 2})`}>
              Placental transfer (F:M ratio %)
            </text>

            {/* X axis labels (log scale) */}
            {[100, 300, 1000, 3000, 10000].map((v) => (
              <g key={v}>
                <line x1={xScale(v)} y1={H - PAD_B} x2={xScale(v)} y2={H - PAD_B + 4} stroke="hsl(var(--foreground))" strokeWidth="0.6" />
                <text x={xScale(v)} y={H - PAD_B + 14} textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))">{v >= 1000 ? `${v / 1000}k` : v}</text>
              </g>
            ))}
            <text x={(PAD_L + W - PAD_R) / 2} y={H - 10} textAnchor="middle" fontSize="10" fontWeight="700" fill="hsl(var(--foreground))">
              Molecular weight (Da, log scale)
            </text>

            {/* Zone labels */}
            <text x={(PAD_L + xScale(500)) / 2} y={H - PAD_B - 8} textAnchor="middle" fontSize="8" fill="hsl(0 75% 55%)" fontStyle="italic" opacity="0.8">crosses easily</text>
            <text x={(xScale(500) + xScale(1000)) / 2} y={H - PAD_B - 8} textAnchor="middle" fontSize="8" fill="hsl(40 80% 55%)" fontStyle="italic" opacity="0.8">variable</text>
            <text x={(xScale(1000) + W - PAD_R) / 2} y={H - PAD_B - 8} textAnchor="middle" fontSize="8" fill="hsl(150 55% 45%)" fontStyle="italic" opacity="0.8">minimal</text>

            {/* Drug points */}
            {DRUGS.map((d) => {
              const cx = xScale(d.mw);
              const cy = yScale(d.transfer);
              const isSel = d.id === selectedId;
              return (
                <g key={d.id} style={{ cursor: "pointer" }} onClick={() => setSelectedId(d.id)}>
                  <circle cx={cx} cy={cy} r={isSel ? 8 : 5} fill={d.color} opacity={isSel ? 0.95 : 0.7} stroke="hsl(var(--background))" strokeWidth="1.5" />
                  {isSel && (
                    <circle cx={cx} cy={cy} r="14" fill="none" stroke={d.color} strokeWidth="1.5" opacity="0.5">
                      <animate attributeName="r" values="8;18;8" dur="1.6s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.7;0;0.7" dur="1.6s" repeatCount="indefinite" />
                    </circle>
                  )}
                  <text x={cx + 10} y={cy + 3} fontSize={isSel ? 10 : 8} fontWeight={isSel ? 700 : 500} fill={d.color}>
                    {d.name.split(" ")[0]}
                  </text>
                </g>
              );
            })}
          </svg>
          <p className="text-[10px] text-muted-foreground text-center italic mt-1">
            Click any drug to inspect — F:M ratio = foetal : maternal plasma concentration
          </p>
        </div>

        {/* Drug detail panel */}
        <div className="rounded-lg border-2 p-3" style={{ borderColor: `${sel.color}55`, background: `${sel.color}0d` }}>
          <p className="text-base font-bold text-foreground mb-2">{sel.name}</p>

          <div className="grid grid-cols-2 gap-1.5 mb-3">
            <div className="p-1.5 rounded bg-card/60 border border-border">
              <p className="text-[9px] font-bold text-muted-foreground uppercase">⚖ MW</p>
              <p className="text-xs font-bold text-foreground">{sel.mw.toLocaleString()} Da</p>
            </div>
            <div className="p-1.5 rounded bg-card/60 border border-border">
              <p className="text-[9px] font-bold text-muted-foreground uppercase">💧 Lipid solubility</p>
              <p className="text-xs font-bold text-foreground">{sel.lipid}</p>
            </div>
            <div className="p-1.5 rounded bg-card/60 border border-border">
              <p className="text-[9px] font-bold text-muted-foreground uppercase">🔗 Protein binding</p>
              <p className="text-xs font-bold text-foreground">{sel.proteinBinding}%</p>
            </div>
            <div className="p-1.5 rounded bg-card/60 border border-border">
              <p className="text-[9px] font-bold text-muted-foreground uppercase">⊕ Ionisation</p>
              <p className="text-xs font-bold text-foreground">{sel.ionised}</p>
            </div>
          </div>

          {/* Transfer bar */}
          <div className="mb-3">
            <div className="flex items-baseline justify-between mb-1">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">Placental transfer</p>
              <p className="text-xs font-bold" style={{ color: sel.color }}>{sel.transfer}%</p>
            </div>
            <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
              <div className="h-full rounded-full transition-all" style={{ width: `${sel.transfer}%`, background: sel.color }} />
            </div>
          </div>

          <div className="p-2 rounded bg-card/60 border border-border mb-2">
            <p className="text-[10px] font-bold text-foreground uppercase tracking-wide mb-1">Why?</p>
            <p className="text-[11px] text-muted-foreground leading-snug">{sel.determinant}</p>
          </div>

          <div className="p-2 rounded bg-secondary/60 border border-primary/20">
            <p className="text-[10px] font-bold text-foreground uppercase tracking-wide mb-1">💡 Clinical relevance</p>
            <p className="text-[11px] text-muted-foreground leading-snug">{sel.clinical}</p>
          </div>
        </div>
      </div>

      {/* Synthesis */}
      <div className="mt-3 p-2.5 rounded bg-secondary/40 border border-border">
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          <strong className="text-foreground">Exam-ready summary: </strong>
          The placenta is a lipid bilayer — drugs cross by passive diffusion governed by Fick's law. Three drugs that <em>do not</em> cross: <strong>heparin</strong> (huge), <strong>suxamethonium / rocuronium / glycopyrrolate</strong> (quaternary, ionised), <strong>insulin</strong> (large protein). Three that <em>do</em>: <strong>thiopentone / propofol / fentanyl</strong> (lipid-soluble, small, unionised), <strong>warfarin</strong> (small, lipid-soluble, teratogenic), <strong>local anaesthetics</strong> (ion-trap in foetal acidosis — lidocaine more than bupivacaine because of lower protein binding).
        </p>
      </div>
    </div>
  );
};

export default PlacentalDrugTransferDiagram;

import { useState, useEffect } from "react";
import { DiagramFigure } from "./_shared/DiagramFigure";

type Tab = "nmda" | "enantiomers" | "sympathetic" | "doses" | "emergence";

export const KetaminePharmacologyDiagram = () => {
  const [tab, setTab] = useState<Tab>("nmda");
  const [t, setT] = useState(0);
  const [doseMgKg, setDoseMgKg] = useState(0.5);

  useEffect(() => {
    const id = setInterval(() => setT((x) => x + 1), 50);
    return () => clearInterval(id);
  }, []);

  const tabs: { id: Tab; label: string }[] = [
    { id: "nmda", label: "NMDA antagonism" },
    { id: "enantiomers", label: "S(+) vs racemic" },
    { id: "sympathetic", label: "Sympathomimetic" },
    { id: "doses", label: "Dose ranges" },
    { id: "emergence", label: "Emergence phenomena" },
  ];

  const W = 660;
  const H = 360;

  // Dose effect classification
  const doseEffect = (() => {
    if (doseMgKg < 0.15) return { label: "Sub-analgesic / anti-depressant", color: "hsl(260 60% 55%)" };
    if (doseMgKg < 0.5) return { label: "Analgesic (sub-anaesthetic)", color: "hsl(140 50% 45%)" };
    if (doseMgKg < 1) return { label: "Sedation / dissociation", color: "hsl(45 90% 50%)" };
    if (doseMgKg <= 2) return { label: "Induction (anaesthesia)", color: "hsl(25 85% 50%)" };
    return { label: "Deep dissociation — emergence risk", color: "hsl(0 75% 50%)" };
  })();

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

      {/* ============== NMDA RECEPTOR ============== */}
      {tab === "nmda" && (
        <div className="bg-card rounded-xl border border-border p-4">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
            {/* Membrane */}
            <rect x={40} y={150} width={W - 80} height={40} fill="hsl(45 60% 88%)" stroke="hsl(45 50% 60%)" strokeWidth="1" />
            <text x={50} y={145} fontSize="10" className="fill-muted-foreground">post-synaptic membrane</text>

            {/* Channel pore */}
            <rect x={290} y={140} width={80} height={60} fill="hsl(210 30% 95%)" stroke="hsl(215 25% 35%)" strokeWidth="1.5" />
            <rect x={300} y={150} width={60} height={40} fill="hsl(210 30% 99%)" stroke="hsl(215 25% 60%)" strokeWidth="0.75" />
            <text x={330} y={210} textAnchor="middle" fontSize="9" className="fill-muted-foreground">NMDA receptor</text>

            {/* Glutamate (extracellular) */}
            <circle cx={250} cy={100} r={10} fill="hsl(140 60% 50%)" />
            <text x={250} y={104} textAnchor="middle" fontSize="9" className="fill-white font-bold">Glu</text>
            {/* Glycine */}
            <circle cx={410} cy={100} r={9} fill="hsl(200 60% 55%)" />
            <text x={410} y={104} textAnchor="middle" fontSize="9" className="fill-white font-bold">Gly</text>

            {/* Mg2+ block (normal resting) */}
            <circle cx={330} cy={130} r={8} fill="hsl(280 50% 60%)" opacity={0.5}>
              <animate attributeName="cy" values="130;125;130" dur="2s" repeatCount="indefinite" />
            </circle>
            <text x={330} y={120} textAnchor="middle" fontSize="8" className="fill-muted-foreground">Mg²⁺ block</text>

            {/* Ketamine — animated entering pore */}
            <g transform={`translate(${330 + Math.sin(t * 0.05) * 2}, ${165 + Math.sin(t * 0.05) * 3})`}>
              <rect x={-12} y={-8} width={24} height={16} rx={3} fill="hsl(0 70% 50%)" />
              <text x={0} y={4} textAnchor="middle" fontSize="8" className="fill-white font-bold">KET</text>
            </g>
            <text x={400} y={175} fontSize="9" className="fill-[hsl(0_70%_45%)] font-medium">non-competitive</text>
            <text x={400} y={186} fontSize="9" className="fill-[hsl(0_70%_45%)] font-medium">use-dependent block</text>

            {/* Ca2+ / Na+ ions blocked from entering */}
            <g opacity={0.4}>
              <circle cx={330} cy={100} r={5} fill="hsl(45 100% 55%)" />
              <text x={330} y={92} textAnchor="middle" fontSize="8" className="fill-muted-foreground">Ca²⁺</text>
              <line x1={320} y1={115} x2={340} y2={140} stroke="hsl(0 70% 50%)" strokeWidth="2" />
              <line x1={340} y1={115} x2={320} y2={140} stroke="hsl(0 70% 50%)" strokeWidth="2" />
            </g>

            {/* Intracellular */}
            <text x={50} y={250} fontSize="10" className="fill-muted-foreground">intracellular</text>
            <text x={330} y={240} textAnchor="middle" fontSize="9" className="fill-foreground font-medium">↓ Ca²⁺ entry → ↓ depolarisation</text>
            <text x={330} y={255} textAnchor="middle" fontSize="9" className="fill-foreground font-medium">↓ central sensitisation, ↓ wind-up</text>

            {/* Title */}
            <text x={W / 2} y={30} textAnchor="middle" fontSize="13" className="fill-foreground font-bold">Non-competitive NMDA receptor antagonism</text>
            <text x={W / 2} y={48} textAnchor="middle" fontSize="10" className="fill-muted-foreground">Ketamine binds inside the open Ca²⁺ channel — distinct from the Mg²⁺ block site</text>

            {/* Other targets */}
            <g transform="translate(20, 290)">
              <text fontSize="10" className="fill-foreground font-semibold">Other targets:</text>
              <text x={0} y={15} fontSize="9" className="fill-muted-foreground">• HCN1 channels (hyperpolarisation-activated) — major contributor to hypnosis</text>
              <text x={0} y={28} fontSize="9" className="fill-muted-foreground">• Opioid (μ, κ, δ) — weak agonism, contributes to analgesia</text>
              <text x={0} y={41} fontSize="9" className="fill-muted-foreground">• Monoaminergic & muscarinic — emergence phenomena, antisialagogue effect needed</text>
            </g>
          </svg>
        </div>
      )}

      {/* ============== ENANTIOMERS ============== */}
      {tab === "enantiomers" && (
        <div className="bg-card rounded-xl border border-border p-4">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
            <text x={W / 2} y={28} textAnchor="middle" fontSize="13" className="fill-foreground font-bold">S(+) vs R(−) — chirality matters</text>

            {/* Mirror axis */}
            <line x1={W / 2} y1={50} x2={W / 2} y2={H - 30} stroke="hsl(215 25% 70%)" strokeWidth="0.75" strokeDasharray="3 3" />
            <text x={W / 2 + 6} y={60} fontSize="9" className="fill-muted-foreground">mirror plane</text>

            {/* Left: S(+) */}
            <g transform="translate(40, 80)">
              <rect width={250} height={250} rx={8} fill="hsl(140 30% 96%)" stroke="hsl(140 50% 45%)" strokeWidth="1.5" />
              <text x={125} y={20} textAnchor="middle" fontSize="13" className="fill-[hsl(140_50%_30%)] font-bold">S(+)-ketamine (esketamine)</text>

              {/* Schematic molecule */}
              <g transform="translate(125, 75)">
                <circle r={20} fill="none" stroke="hsl(215 25% 35%)" strokeWidth="1" />
                <circle cx={-30} r={6} fill="hsl(140 60% 50%)" />
                <text x={-30} y={3} textAnchor="middle" fontSize="8" className="fill-white font-bold">Cl</text>
                <circle cx={20} cy={-15} r={6} fill="hsl(220 60% 60%)" />
                <text x={20} y={-12} textAnchor="middle" fontSize="8" className="fill-white font-bold">N</text>
                <text x={0} y={4} textAnchor="middle" fontSize="9" className="fill-foreground font-medium">chiral C</text>
              </g>

              <text x={20} y={130} fontSize="10" className="fill-foreground font-semibold">vs racemic, equipotent dose:</text>
              <text x={20} y={148} fontSize="10" className="fill-muted-foreground">• ~2× NMDA affinity</text>
              <text x={20} y={163} fontSize="10" className="fill-muted-foreground">• ~½ the dose needed</text>
              <text x={20} y={178} fontSize="10" className="fill-muted-foreground">• Faster recovery</text>
              <text x={20} y={193} fontSize="10" className="fill-muted-foreground">• Less psychomimesis</text>
              <text x={20} y={208} fontSize="10" className="fill-muted-foreground">• Less salivation, ataxia</text>
              <text x={20} y={228} fontSize="10" className="fill-[hsl(140_50%_30%)] font-medium">→ Spravato (intranasal) for TRD</text>
            </g>

            {/* Right: R(−) (in racemate) */}
            <g transform="translate(370, 80)">
              <rect width={250} height={250} rx={8} fill="hsl(0 30% 96%)" stroke="hsl(0 50% 50%)" strokeWidth="1.5" />
              <text x={125} y={20} textAnchor="middle" fontSize="13" className="fill-[hsl(0_50%_35%)] font-bold">R(−)-ketamine</text>

              {/* Mirror molecule */}
              <g transform="translate(125, 75) scale(-1, 1)">
                <circle r={20} fill="none" stroke="hsl(215 25% 35%)" strokeWidth="1" />
                <circle cx={-30} r={6} fill="hsl(140 60% 50%)" />
                <text x={-30} y={3} textAnchor="middle" fontSize="8" className="fill-white font-bold" transform="scale(-1, 1)">Cl</text>
                <circle cx={20} cy={-15} r={6} fill="hsl(220 60% 60%)" />
                <text x={20} y={-12} textAnchor="middle" fontSize="8" className="fill-white font-bold" transform="scale(-1, 1)">N</text>
                <text x={0} y={4} textAnchor="middle" fontSize="9" className="fill-foreground font-medium" transform="scale(-1, 1)">chiral C</text>
              </g>

              <text x={20} y={130} fontSize="10" className="fill-foreground font-semibold">In the racemic mix (50:50):</text>
              <text x={20} y={148} fontSize="10" className="fill-muted-foreground">• Lower NMDA affinity</text>
              <text x={20} y={163} fontSize="10" className="fill-muted-foreground">• More vivid dreams</text>
              <text x={20} y={178} fontSize="10" className="fill-muted-foreground">• Slower emergence</text>
              <text x={20} y={193} fontSize="10" className="fill-muted-foreground">• Some preclinical evidence</text>
              <text x={20} y={208} fontSize="10" className="fill-muted-foreground">  for sustained antidepressant</text>
              <text x={20} y={228} fontSize="10" className="fill-[hsl(0_50%_35%)] font-medium">  effect — debated</text>
            </g>
          </svg>
        </div>
      )}

      {/* ============== SYMPATHOMIMETIC ============== */}
      {tab === "sympathetic" && (
        <div className="bg-card rounded-xl border border-border p-4">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
            <text x={W / 2} y={28} textAnchor="middle" fontSize="13" className="fill-foreground font-bold">Indirect sympathomimetic action</text>

            {/* CNS box */}
            <rect x={40} y={60} width={150} height={60} rx={6} fill="hsl(260 30% 95%)" stroke="hsl(260 50% 55%)" strokeWidth="1.5" />
            <text x={115} y={82} textAnchor="middle" fontSize="11" className="fill-foreground font-semibold">CNS</text>
            <text x={115} y={98} textAnchor="middle" fontSize="9" className="fill-muted-foreground">↑ central sympathetic outflow</text>
            <text x={115} y={111} textAnchor="middle" fontSize="9" className="fill-muted-foreground">(NMDA antag. of inhibitory pathways)</text>

            {/* Nerve terminal */}
            <rect x={250} y={60} width={170} height={60} rx={6} fill="hsl(45 30% 95%)" stroke="hsl(45 80% 50%)" strokeWidth="1.5" />
            <text x={335} y={82} textAnchor="middle" fontSize="11" className="fill-foreground font-semibold">Sympathetic nerve terminal</text>
            <text x={335} y={98} textAnchor="middle" fontSize="9" className="fill-muted-foreground">↑ NA release</text>
            <text x={335} y={111} textAnchor="middle" fontSize="9" className="fill-muted-foreground">↓ NA reuptake (uptake-1 inhibition)</text>

            {/* Adrenal */}
            <rect x={470} y={60} width={150} height={60} rx={6} fill="hsl(0 30% 95%)" stroke="hsl(0 60% 50%)" strokeWidth="1.5" />
            <text x={545} y={82} textAnchor="middle" fontSize="11" className="fill-foreground font-semibold">Adrenal medulla</text>
            <text x={545} y={98} textAnchor="middle" fontSize="9" className="fill-muted-foreground">↑ adrenaline release</text>

            {/* Arrows down */}
            {[115, 335, 545].map((cx, i) => (
              <g key={i}>
                <line x1={cx} y1={120} x2={cx} y2={170} stroke="hsl(215 25% 50%)" strokeWidth="1.5" markerEnd="url(#arr2)" />
                <circle cx={cx} cy={130 + ((t * 1.5 + i * 8) % 35)} r={3} fill="hsl(45 100% 55%)" opacity={0.8} />
              </g>
            ))}

            {/* Plasma catechol pool */}
            <rect x={40} y={185} width={580} height={40} rx={6} fill="hsl(45 60% 90%)" stroke="hsl(45 80% 50%)" strokeWidth="1.5" />
            <text x={W / 2} y={210} textAnchor="middle" fontSize="11" className="fill-foreground font-semibold">↑ Plasma catecholamines (NA, adrenaline)</text>

            {/* Effects */}
            <g transform="translate(40, 245)">
              <rect width="180" height="100" rx="6" fill="hsl(0 30% 96%)" stroke="hsl(0 50% 50%)" strokeWidth="1" />
              <text x={90} y={18} textAnchor="middle" fontSize="11" className="fill-foreground font-semibold">CVS effects</text>
              <text x={10} y={36} fontSize="9" className="fill-muted-foreground">↑ HR, ↑ BP, ↑ SVR, ↑ CO</text>
              <text x={10} y={50} fontSize="9" className="fill-muted-foreground">↑ MVO₂ (caution: IHD)</text>
              <text x={10} y={64} fontSize="9" className="fill-muted-foreground">Useful: shock, tamponade,</text>
              <text x={10} y={76} fontSize="9" className="fill-muted-foreground">RSI in trauma, asthma</text>
              <text x={10} y={92} fontSize="9" className="fill-[hsl(0_50%_35%)] font-medium">⚠ unmasked in catechol-</text>
            </g>

            <g transform="translate(240, 245)">
              <rect width="180" height="100" rx="6" fill="hsl(140 30% 96%)" stroke="hsl(140 50% 45%)" strokeWidth="1" />
              <text x={90} y={18} textAnchor="middle" fontSize="11" className="fill-foreground font-semibold">Respiratory</text>
              <text x={10} y={36} fontSize="9" className="fill-muted-foreground">Bronchodilation</text>
              <text x={10} y={50} fontSize="9" className="fill-muted-foreground">(β₂ + direct smooth m.)</text>
              <text x={10} y={64} fontSize="9" className="fill-muted-foreground">Preserves drive & reflexes</text>
              <text x={10} y={78} fontSize="9" className="fill-muted-foreground">↑ secretions (antisial.</text>
              <text x={10} y={90} fontSize="9" className="fill-muted-foreground">cover often given)</text>
            </g>

            <g transform="translate(440, 245)">
              <rect width="180" height="100" rx="6" fill="hsl(260 30% 96%)" stroke="hsl(260 50% 55%)" strokeWidth="1" />
              <text x={90} y={18} textAnchor="middle" fontSize="11" className="fill-foreground font-semibold">CNS / other</text>
              <text x={10} y={36} fontSize="9" className="fill-muted-foreground">↑ CBF, ↑ CMRO₂, ↑ ICP*</text>
              <text x={10} y={50} fontSize="9" className="fill-muted-foreground">↑ IOP</text>
              <text x={10} y={64} fontSize="9" className="fill-muted-foreground">Nystagmus, lacrimation</text>
              <text x={10} y={80} fontSize="8" className="fill-muted-foreground">*ICP rise debated when</text>
              <text x={10} y={91} fontSize="8" className="fill-muted-foreground">PaCO₂ controlled</text>
            </g>

            <defs>
              <marker id="arr2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(215 25% 50%)" />
              </marker>
            </defs>
          </svg>
        </div>
      )}

      {/* ============== DOSE RANGES ============== */}
      {tab === "doses" && (
        <div className="bg-card rounded-xl border border-border p-4">
          <svg viewBox={`0 0 ${W} 280`} className="w-full">
            <text x={W / 2} y={28} textAnchor="middle" fontSize="13" className="fill-foreground font-bold">Dose-effect spectrum (IV bolus, mg/kg)</text>

            {/* Log-ish bar with regions */}
            {(() => {
              const bands = [
                { x: 50, w: 70, color: "hsl(260 60% 75%)", label: "0.05–0.15", sub: "Anti-depressant" },
                { x: 120, w: 100, color: "hsl(140 55% 70%)", label: "0.15–0.5", sub: "Analgesic" },
                { x: 220, w: 110, color: "hsl(45 85% 70%)", label: "0.5–1.0", sub: "Sedation" },
                { x: 330, w: 130, color: "hsl(25 80% 65%)", label: "1.0–2.0 IV", sub: "Induction" },
                { x: 460, w: 150, color: "hsl(0 70% 65%)", label: "5–10 IM", sub: "IM induction" },
              ];
              return bands.map((b, i) => (
                <g key={i}>
                  <rect x={b.x} y={70} width={b.w} height={50} fill={b.color} stroke="hsl(215 25% 30%)" strokeWidth="0.5" />
                  <text x={b.x + b.w / 2} y={92} textAnchor="middle" fontSize="11" className="fill-foreground font-bold">{b.label}</text>
                  <text x={b.x + b.w / 2} y={108} textAnchor="middle" fontSize="9" className="fill-foreground">{b.sub}</text>
                </g>
              ));
            })()}

            {/* Pointer based on slider */}
            {(() => {
              // map 0–3 mg/kg to x 50–610
              const x = Math.min(610, Math.max(50, 50 + (doseMgKg / 3) * 560));
              return (
                <g>
                  <line x1={x} y1={55} x2={x} y2={130} stroke={doseEffect.color} strokeWidth="2" />
                  <polygon points={`${x - 6},55 ${x + 6},55 ${x},65`} fill={doseEffect.color} />
                  <text x={x} y={48} textAnchor="middle" fontSize="10" className="fill-foreground font-bold">{doseMgKg.toFixed(2)} mg/kg</text>
                </g>
              );
            })()}

            {/* Mechanism by dose */}
            <g transform="translate(50, 160)">
              <rect width={560} height={28} rx={4} fill={doseEffect.color} opacity={0.15} stroke={doseEffect.color} strokeWidth="1" />
              <text x={280} y={19} textAnchor="middle" fontSize="11" className="fill-foreground font-semibold">{doseEffect.label}</text>
            </g>

            <g transform="translate(50, 200)">
              <text fontSize="10" className="fill-foreground font-semibold">Routes & infusion (sub-anaesthetic):</text>
              <text x={0} y={15} fontSize="9" className="fill-muted-foreground">• Analgesic infusion: 0.1–0.5 mg/kg/h IV (perioperative, opioid-sparing)</text>
              <text x={0} y={28} fontSize="9" className="fill-muted-foreground">• Chronic pain: 0.5 mg/kg over 30–60 min, repeated</text>
              <text x={0} y={41} fontSize="9" className="fill-muted-foreground">• Esketamine (Spravato) IN: 56–84 mg twice weekly for treatment-resistant depression</text>
              <text x={0} y={54} fontSize="9" className="fill-muted-foreground">• Paediatric IM: 5–10 mg/kg (slow onset 3–5 min, useful in uncooperative child)</text>
            </g>
          </svg>

          <div className="mt-3 px-2">
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-medium text-foreground">Test dose (mg/kg IV)</label>
              <span className="text-xs font-mono text-muted-foreground">{doseMgKg.toFixed(2)}</span>
            </div>
            <input
              type="range" min={0.05} max={3} step={0.05} value={doseMgKg}
              onChange={(e) => setDoseMgKg(Number(e.target.value))}
              className="w-full accent-pharmacology"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground mt-0.5">
              <span>0.05</span><span>0.5</span><span>1.0</span><span>2.0</span><span>3.0</span>
            </div>
          </div>
        </div>
      )}

      {/* ============== EMERGENCE ============== */}
      {tab === "emergence" && (
        <div className="bg-card rounded-xl border border-border p-4">
          <svg viewBox={`0 0 ${W} 320`} className="w-full">
            <text x={W / 2} y={28} textAnchor="middle" fontSize="13" className="fill-foreground font-bold">Emergence phenomena</text>

            {/* Brain schematic with thalamocortical disruption */}
            <g transform="translate(60, 60)">
              <ellipse cx={120} cy={90} rx={110} ry={70} fill="hsl(20 40% 92%)" stroke="hsl(215 25% 35%)" strokeWidth="1.5" />
              {/* Thalamus */}
              <ellipse cx={120} cy={100} rx={28} ry={18} fill="hsl(260 40% 75%)" stroke="hsl(260 50% 40%)" strokeWidth="1" />
              <text x={120} y={104} textAnchor="middle" fontSize="9" className="fill-foreground font-medium">thalamus</text>

              {/* Cortex regions */}
              <text x={120} y={45} textAnchor="middle" fontSize="9" className="fill-muted-foreground">cortex</text>

              {/* Disrupted connections */}
              {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                const rad = (angle * Math.PI) / 180;
                const x1 = 120 + 28 * Math.cos(rad);
                const y1 = 100 + 18 * Math.sin(rad);
                const x2 = 120 + 95 * Math.cos(rad);
                const y2 = 100 + 60 * Math.sin(rad);
                const dash = (t * 2 + i * 5) % 12;
                return (
    <DiagramFigure
      id="ketamine-pharmacology-diagram"
      title="Ketamine pharmacology"
      description="Auto-generated wrapper for the Ketamine pharmacology anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
                        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                      stroke="hsl(0 70% 55%)" strokeWidth="1" strokeDasharray="4 8" strokeDashoffset={-dash} opacity={0.7} />
    </DiagramFigure>
  );
              })}
              <text x={120} y={180} textAnchor="middle" fontSize="9" className="fill-[hsl(0_60%_45%)] font-medium">thalamocortical dissociation</text>
            </g>

            {/* Right: features */}
            <g transform="translate(310, 60)">
              <rect width={310} height={120} rx={6} fill="hsl(0 30% 96%)" stroke="hsl(0 50% 50%)" strokeWidth="1" />
              <text x={10} y={18} fontSize="11" className="fill-foreground font-semibold">Features (10–30% adults)</text>
              <text x={10} y={36} fontSize="10" className="fill-muted-foreground">• Vivid, often unpleasant dreams</text>
              <text x={10} y={50} fontSize="10" className="fill-muted-foreground">• Hallucinations (visual &gt; auditory)</text>
              <text x={10} y={64} fontSize="10" className="fill-muted-foreground">• Out-of-body / floating sensations</text>
              <text x={10} y={78} fontSize="10" className="fill-muted-foreground">• Delirium, agitation, dysphoria</text>
              <text x={10} y={92} fontSize="10" className="fill-muted-foreground">• Uncommon in children &lt; 10 y</text>
              <text x={10} y={108} fontSize="10" className="fill-[hsl(0_50%_35%)] font-medium">↑ with: female, age &gt; 16, larger dose, fast bolus</text>
            </g>

            <g transform="translate(310, 195)">
              <rect width={310} height={110} rx={6} fill="hsl(140 30% 96%)" stroke="hsl(140 50% 45%)" strokeWidth="1" />
              <text x={10} y={18} fontSize="11" className="fill-foreground font-semibold">Mitigation</text>
              <text x={10} y={36} fontSize="10" className="fill-muted-foreground">• Benzodiazepine premed (midazolam 1–2 mg)</text>
              <text x={10} y={50} fontSize="10" className="fill-muted-foreground">• Co-induction with propofol (ketofol)</text>
              <text x={10} y={64} fontSize="10" className="fill-muted-foreground">• Quiet recovery — minimise stimulation</text>
              <text x={10} y={78} fontSize="10" className="fill-muted-foreground">• Use S(+)-ketamine — fewer phenomena</text>
              <text x={10} y={92} fontSize="10" className="fill-muted-foreground">• Lower dose; slow administration</text>
            </g>

            <g transform="translate(60, 235)">
              <rect width={230} height={70} rx={6} fill="hsl(45 30% 96%)" stroke="hsl(45 80% 50%)" strokeWidth="1" />
              <text x={10} y={18} fontSize="11" className="fill-foreground font-semibold">Mechanism</text>
              <text x={10} y={34} fontSize="9" className="fill-muted-foreground">NMDA blockade in inferior colliculus &</text>
              <text x={10} y={46} fontSize="9" className="fill-muted-foreground">medial geniculate disrupts auditory–limbic</text>
              <text x={10} y={58} fontSize="9" className="fill-muted-foreground">integration; cortical disinhibition.</text>
            </g>
          </svg>
        </div>
      )}

      {/* Bottom summary */}
      <div className="grid sm:grid-cols-3 gap-2 text-xs">
        <div className="bg-card rounded-lg border border-border p-2.5">
          <p className="font-semibold text-foreground">PK</p>
          <p className="text-muted-foreground">Onset 30–60 s IV. Vd ~3 L/kg. Hepatic CYP3A4 → norketamine (1/3 potency, active). t½β ~2.5 h.</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-2.5">
          <p className="font-semibold text-foreground">Cautions</p>
          <p className="text-muted-foreground">IHD, severe HTN, raised ICP (uncontrolled CO₂), open eye injury, psychosis, hyperthyroidism.</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-2.5">
          <p className="font-semibold text-foreground">Niche uses</p>
          <p className="text-muted-foreground">Pre-hospital trauma, severe asthma, burns dressings, status asthmaticus infusion, CRPS, depression.</p>
        </div>
      </div>
    </div>
  );
};

export default KetaminePharmacologyDiagram;

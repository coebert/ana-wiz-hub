import { useState, useEffect } from "react";

type Tab = "pathway" | "duration" | "sepsis" | "alternatives";

export const EtomidatePharmacologyDiagram = () => {
  const [tab, setTab] = useState<Tab>("pathway");
  const [t, setT] = useState(0);
  const [hoursPostDose, setHoursPostDose] = useState(8);

  useEffect(() => {
    const id = setInterval(() => setT((x) => x + 1), 50);
    return () => clearInterval(id);
  }, []);

  const tabs: { id: Tab; label: string }[] = [
    { id: "pathway", label: "Cortisol pathway block" },
    { id: "duration", label: "Suppression timeline" },
    { id: "sepsis", label: "Sepsis controversy" },
    { id: "alternatives", label: "Decision aid" },
  ];

  const W = 660;
  const H = 380;

  // Cortisol level after single induction dose (relative to baseline %)
  const cortisolPct = (() => {
    const h = hoursPostDose;
    if (h <= 0) return 100;
    if (h < 1) return 100 - 70 * h; // rapid drop in first hour
    if (h < 8) return 30 + 5 * Math.exp(-(h - 1) / 4); // nadir ~30%
    if (h < 24) return 30 + 50 * (1 - Math.exp(-(h - 8) / 8)); // gradual recovery
    if (h < 48) return 80 + 18 * (1 - Math.exp(-(h - 24) / 10));
    return 98;
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

      {/* ============== PATHWAY ============== */}
      {tab === "pathway" && (
        <div className="bg-card rounded-xl border border-border p-4">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
            <text x={W / 2} y={22} textAnchor="middle" fontSize="13" className="fill-foreground font-bold">
              Adrenal cortisol synthesis — etomidate blocks 11β-hydroxylase
            </text>

            {/* Pathway nodes */}
            {(() => {
              const nodes = [
                { y: 55, name: "Cholesterol", sub: "" },
                { y: 105, name: "Pregnenolone", sub: "" },
                { y: 155, name: "Progesterone", sub: "" },
                { y: 205, name: "17-OH-Progesterone", sub: "" },
                { y: 255, name: "11-Deoxycortisol", sub: "(substrate that accumulates)" },
                { y: 320, name: "CORTISOL", sub: "(end product)" },
              ];
              return nodes.map((n, i) => {
                const isBlock = i === 4; // step before cortisol
                const isFinal = i === 5;
                return (
                  <g key={n.name}>
                    <rect
                      x={140} y={n.y - 16} width={220} height={32} rx={4}
                      fill={isFinal ? "hsl(45 60% 90%)" : isBlock ? "hsl(25 50% 92%)" : "hsl(210 30% 96%)"}
                      stroke={isFinal ? "hsl(45 80% 45%)" : isBlock ? "hsl(25 80% 50%)" : "hsl(215 25% 60%)"}
                      strokeWidth="1.2"
                    />
                    <text x={250} y={n.y - 1} textAnchor="middle" fontSize="11" className="fill-foreground font-semibold">{n.name}</text>
                    {n.sub && (
                      <text x={250} y={n.y + 11} textAnchor="middle" fontSize="8" className="fill-muted-foreground">{n.sub}</text>
                    )}
                  </g>
                );
              });
            })()}

            {/* Arrows / enzymes */}
            {[
              { from: 71, to: 89, enz: "P450scc (side-chain cleavage)" },
              { from: 121, to: 139, enz: "3β-HSD" },
              { from: 171, to: 189, enz: "17α-hydroxylase" },
              { from: 221, to: 239, enz: "21-hydroxylase" },
            ].map((a, i) => (
              <g key={i}>
                <line x1={250} y1={a.from} x2={250} y2={a.to} stroke="hsl(215 25% 50%)" strokeWidth="1.5" markerEnd="url(#arrEt)" />
                <text x={365} y={(a.from + a.to) / 2 + 3} fontSize="9" className="fill-muted-foreground">{a.enz}</text>
              </g>
            ))}

            {/* Blocked step */}
            <g>
              <line x1={250} y1={271} x2={250} y2={304} stroke="hsl(0 70% 50%)" strokeWidth="2" strokeDasharray="4 3" markerEnd="url(#arrBlock)" />
              <text x={365} y={290} fontSize="10" className="fill-[hsl(0_70%_45%)] font-semibold">11β-hydroxylase</text>

              {/* Etomidate molecule blocking */}
              <g transform={`translate(${415 + Math.sin(t * 0.08) * 2}, 287)`}>
                <rect x={-22} y={-10} width={44} height={20} rx={4} fill="hsl(0 70% 50%)" />
                <text x={0} y={4} textAnchor="middle" fontSize="9" className="fill-white font-bold">ETOMIDATE</text>
              </g>

              {/* Cross over arrow */}
              <line x1={232} y1={278} x2={268} y2={297} stroke="hsl(0 70% 50%)" strokeWidth="2.5" />
              <line x1={268} y1={278} x2={232} y2={297} stroke="hsl(0 70% 50%)" strokeWidth="2.5" />
            </g>

            {/* Aldosterone arm */}
            <g>
              <text x={520} y={205} textAnchor="middle" fontSize="9" className="fill-muted-foreground">(via 18-OH steps)</text>
              <line x1={360} y1={205} x2={490} y2={250} stroke="hsl(215 25% 50%)" strokeWidth="1" markerEnd="url(#arrEt)" strokeDasharray="3 3" />
              <rect x={460} y={255} width={120} height={32} rx={4} fill="hsl(140 30% 92%)" stroke="hsl(140 50% 45%)" strokeWidth="1.2" />
              <text x={520} y={270} textAnchor="middle" fontSize="10" className="fill-foreground font-semibold">Aldosterone</text>
              <text x={520} y={283} textAnchor="middle" fontSize="8" className="fill-muted-foreground">(also ↓ — same step)</text>
            </g>

            <defs>
              <marker id="arrEt" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(215 25% 50%)" />
              </marker>
              <marker id="arrBlock" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(0 70% 50%)" />
              </marker>
            </defs>
          </svg>

          <div className="mt-3 grid sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-card rounded-lg border border-border p-3">
              <p className="font-semibold text-foreground">Mechanism of inhibition</p>
              <p className="text-muted-foreground mt-1">
                The imidazole nitrogen of etomidate binds the haem iron of mitochondrial cytochrome P450 11B1
                (<strong className="text-foreground">11β-hydroxylase</strong>), reversibly blocking conversion of 11-deoxycortisol
                → cortisol. Aldosterone synthesis (P450 11B2) is also impaired but recovers earlier.
              </p>
            </div>
            <div className="bg-card rounded-lg border border-border p-3">
              <p className="font-semibold text-foreground">Why etomidate is unique among induction agents</p>
              <p className="text-muted-foreground mt-1">
                Imidazole ring + lipophilic side chain → potent CYP enzyme affinity. No other commonly used IV
                induction agent meaningfully inhibits steroidogenesis.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ============== DURATION ============== */}
      {tab === "duration" && (
        <div className="bg-card rounded-xl border border-border p-4">
          <svg viewBox={`0 0 ${W} 320`} className="w-full">
            <text x={W / 2} y={24} textAnchor="middle" fontSize="13" className="fill-foreground font-bold">
              Cortisol after a single induction dose (0.3 mg/kg IV)
            </text>

            {/* Axes */}
            <line x1={50} y1={250} x2={620} y2={250} stroke="hsl(215 25% 50%)" strokeWidth="1" />
            <line x1={50} y1={60} x2={50} y2={250} stroke="hsl(215 25% 50%)" strokeWidth="1" />
            <text x={335} y={275} textAnchor="middle" fontSize="10" className="fill-muted-foreground">hours after dose</text>
            <text x={20} y={155} textAnchor="middle" fontSize="10" transform="rotate(-90, 20, 155)" className="fill-muted-foreground">% of baseline cortisol</text>

            {/* Y gridlines */}
            {[0, 25, 50, 75, 100].map((p) => {
              const y = 250 - (p / 100) * 190;
              return (
                <g key={p}>
                  <line x1={50} y1={y} x2={620} y2={y} stroke="hsl(215 25% 80%)" strokeWidth="0.6" strokeDasharray="2 3" />
                  <text x={42} y={y + 3} textAnchor="end" fontSize="9" className="fill-muted-foreground">{p}%</text>
                </g>
              );
            })}

            {/* X labels */}
            {[0, 1, 4, 8, 12, 24, 36, 48].map((h) => {
              const x = 50 + (h / 48) * 570;
              return (
                <g key={h}>
                  <line x1={x} y1={250} x2={x} y2={254} stroke="hsl(215 25% 50%)" strokeWidth="1" />
                  <text x={x} y={266} textAnchor="middle" fontSize="9" className="fill-muted-foreground">{h}h</text>
                </g>
              );
            })}

            {/* Critical illness threshold */}
            <line x1={50} y1={250 - (50 / 100) * 190} x2={620} y2={250 - (50 / 100) * 190} stroke="hsl(0 70% 50%)" strokeWidth="0.8" strokeDasharray="4 4" />
            <text x={620} y={250 - (50 / 100) * 190 - 3} textAnchor="end" fontSize="9" className="fill-[hsl(0_70%_45%)]">~50%: critical-illness threshold</text>

            {/* Curve */}
            {(() => {
              let path = "";
              for (let h = 0; h <= 48; h += 0.25) {
                let pct;
                if (h <= 0) pct = 100;
                else if (h < 1) pct = 100 - 70 * h;
                else if (h < 8) pct = 30 + 5 * Math.exp(-(h - 1) / 4);
                else if (h < 24) pct = 30 + 50 * (1 - Math.exp(-(h - 8) / 8));
                else if (h < 48) pct = 80 + 18 * (1 - Math.exp(-(h - 24) / 10));
                else pct = 98;
                const x = 50 + (h / 48) * 570;
                const y = 250 - (pct / 100) * 190;
                path += h === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
              }
              return <path d={path} fill="none" stroke="hsl(220 60% 50%)" strokeWidth="2.5" />;
            })()}

            {/* Cursor */}
            {(() => {
              const x = 50 + (hoursPostDose / 48) * 570;
              const y = 250 - (cortisolPct / 100) * 190;
              return (
                <g>
                  <line x1={x} y1={60} x2={x} y2={250} stroke="hsl(0 70% 50%)" strokeWidth="1" strokeDasharray="2 2" />
                  <circle cx={x} cy={y} r={5} fill="hsl(0 70% 50%)" />
                  <rect x={x + 8} y={y - 22} width={120} height={36} rx={4} fill="hsl(210 30% 98%)" stroke="hsl(215 25% 60%)" strokeWidth="1" />
                  <text x={x + 14} y={y - 8} fontSize="10" className="fill-foreground font-semibold">{hoursPostDose}h post-dose</text>
                  <text x={x + 14} y={y + 7} fontSize="10" className="fill-foreground">cortisol ≈ {cortisolPct.toFixed(0)}%</text>
                </g>
              );
            })()}

            {/* Annotated phases */}
            <g transform="translate(60, 90)">
              <text fontSize="9" className="fill-foreground font-semibold">Nadir</text>
              <text fontSize="8" className="fill-muted-foreground" y={11}>1–4 h</text>
            </g>
            <g transform="translate(220, 90)">
              <text fontSize="9" className="fill-foreground font-semibold">Plateau</text>
              <text fontSize="8" className="fill-muted-foreground" y={11}>4–8 h</text>
            </g>
            <g transform="translate(380, 90)">
              <text fontSize="9" className="fill-foreground font-semibold">Recovery</text>
              <text fontSize="8" className="fill-muted-foreground" y={11}>~12–24 h (healthy)</text>
            </g>
          </svg>

          <div className="mt-3 px-2">
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-medium text-foreground">Hours after a single induction dose</label>
              <span className="text-xs font-mono text-muted-foreground">{hoursPostDose} h</span>
            </div>
            <input
              type="range" min={0} max={48} step={1} value={hoursPostDose}
              onChange={(e) => setHoursPostDose(Number(e.target.value))}
              className="w-full accent-pharmacology"
            />
          </div>

          <div className="mt-3 bg-secondary/30 rounded-lg border border-border p-3 text-xs text-muted-foreground">
            <strong className="text-foreground">Key points:</strong> after a single induction bolus, plasma cortisol falls within
            minutes, reaches nadir at 1–8 h, and typically recovers by 24 h in healthy patients. <strong className="text-foreground">In
            critical illness recovery is delayed</strong> — suppression has been documented for 24–72 h, occasionally longer.
            Continuous infusion was abandoned in 1983 after Watt & Ledingham showed dramatically increased ICU mortality (Lancet 1983).
          </div>
        </div>
      )}

      {/* ============== SEPSIS CONTROVERSY ============== */}
      {tab === "sepsis" && (
        <div className="bg-card rounded-xl border border-border p-4">
          <h4 className="text-sm font-bold text-foreground text-center mb-3">Etomidate in sepsis — what does the evidence say?</h4>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-2 text-foreground">Study</th>
                  <th className="text-left py-2 px-2 text-foreground">Design</th>
                  <th className="text-left py-2 px-2 text-foreground">Finding</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {[
                  ["Watt & Ledingham 1983", "Retrospective ICU cohort (infusion)", "↑ mortality with etomidate infusion → infusion withdrawn"],
                  ["Annane 2002 (CORTICUS context)", "Sub-analysis", "Etomidate-exposed septic patients had higher rate of relative adrenal insufficiency"],
                  ["CORTICUS 2008", "RCT — steroids in septic shock", "No mortality benefit overall; etomidate users had worse outcomes regardless of steroid"],
                  ["KETASED (Jabre 2009)", "RCT — etomidate vs ketamine for emergency RSI", "Similar SOFA scores & mortality; etomidate ↑ adrenal insufficiency markers"],
                  ["Chan 2012 meta-analysis", "Sepsis subgroups (n≈865)", "↑ adrenal insufficiency; trend to ↑ mortality (not statistically significant)"],
                  ["Bruder 2015 Cochrane", "8 RCTs, n=772", "↑ adrenal suppression; insufficient evidence for mortality difference"],
                  ["McPhee 2013 / SCCM 2017", "Guideline", "Avoid etomidate in septic shock if alternative available; otherwise single dose acceptable"],
                ].map(([study, design, finding]) => (
                  <tr key={study} className="border-b border-border/50 align-top">
                    <td className="py-1.5 px-2 font-medium text-foreground whitespace-nowrap">{study}</td>
                    <td className="py-1.5 px-2">{design}</td>
                    <td className="py-1.5 px-2">{finding}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-3 grid sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-card rounded-lg border border-border p-3">
              <p className="font-semibold text-foreground mb-1">Arguments AGAINST in sepsis</p>
              <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                <li>Septic patients already have HPA dysfunction</li>
                <li>Suppression may persist 24–72 h in critical illness</li>
                <li>Consistently associated with adrenal insufficiency</li>
                <li>SCCM/SSC suggest avoiding when alternative exists</li>
                <li>Cochrane signal towards harm (not statistically significant)</li>
              </ul>
            </div>
            <div className="bg-card rounded-lg border border-border p-3">
              <p className="font-semibold text-foreground mb-1">Arguments FOR (single dose)</p>
              <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                <li>Best haemodynamic stability of induction agents</li>
                <li>No clear mortality difference in RCTs (KETASED)</li>
                <li>Hydrocortisone substitution can rescue suppression</li>
                <li>Useful in unstable patient where ketamine contraindicated (e.g. severe IHD, raised ICP)</li>
                <li>Familiar agent with predictable pharmacology</li>
              </ul>
            </div>
          </div>

          <div className="mt-3 bg-[hsl(45_60%_95%)] border border-[hsl(45_80%_50%)] rounded-lg p-3 text-xs">
            <p className="text-foreground"><strong>Pragmatic FRCA/FFICM answer:</strong> A single induction dose of etomidate in septic shock is unlikely to change mortality but reliably causes biochemical adrenal insufficiency. Most modern guidance prefers <strong>ketamine</strong> (or low-dose propofol with vasopressor support) for RSI in septic shock; if etomidate is used, <strong>cover with hydrocortisone 50 mg IV</strong> if shock is unresponsive to fluids and vasopressors.</p>
          </div>
        </div>
      )}

      {/* ============== ALTERNATIVES / DECISION AID ============== */}
      {tab === "alternatives" && (
        <div className="bg-card rounded-xl border border-border p-4">
          <h4 className="text-sm font-bold text-foreground text-center mb-3">When to use — and when to avoid — etomidate</h4>

          <div className="grid sm:grid-cols-2 gap-3">
            <div className="bg-[hsl(140_30%_95%)] border border-[hsl(140_50%_45%)] rounded-lg p-3 text-xs">
              <p className="font-bold text-[hsl(140_50%_25%)] mb-2">Reasonable to use (single dose)</p>
              <ul className="text-foreground/80 space-y-1.5 list-disc list-inside">
                <li>Severe cardiac disease (critical AS, severe LV impairment)</li>
                <li>Cardiac tamponade / restrictive physiology</li>
                <li>Raised ICP with haemodynamic compromise</li>
                <li>Major haemorrhage where ketamine contraindicated</li>
                <li>Anticipated short procedure (cardioversion)</li>
              </ul>
            </div>
            <div className="bg-[hsl(0_30%_95%)] border border-[hsl(0_60%_50%)] rounded-lg p-3 text-xs">
              <p className="font-bold text-[hsl(0_60%_30%)] mb-2">Avoid</p>
              <ul className="text-foreground/80 space-y-1.5 list-disc list-inside">
                <li><strong>Continuous infusion</strong> — never (post-1983)</li>
                <li>Septic shock — prefer ketamine if no contraindication</li>
                <li>Known adrenal insufficiency</li>
                <li>Porphyria (relative — limited data)</li>
                <li>Routine elective induction (PONV, myoclonus, pain)</li>
              </ul>
            </div>
          </div>

          <h5 className="text-xs font-bold text-foreground mt-4 mb-2">Comparison with alternatives in haemodynamic compromise</h5>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-2 text-foreground">Agent</th>
                  <th className="text-left py-2 px-2 text-foreground">CVS profile</th>
                  <th className="text-left py-2 px-2 text-foreground">Adrenal effect</th>
                  <th className="text-left py-2 px-2 text-foreground">Best for</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {[
                  ["Etomidate", "Most stable: minimal ↓ HR/BP/CO", "↓ cortisol 24–72h after single dose", "Shocked patient with IHD, AS, tamponade"],
                  ["Ketamine 1–2 mg/kg", "↑ HR/BP (sympathomimetic) — depressant if catechol-depleted", "None", "Septic shock, asthma, trauma"],
                  ["Propofol (titrated 0.5–1 mg/kg)", "↓ SVR, ↓ contractility", "None", "Stable patient; slow titration with vasopressor"],
                  ["Midazolam 0.1–0.3 mg/kg", "Modest ↓ BP, slow onset", "None", "Adjunct or co-induction; rare as sole agent"],
                ].map(([agent, cvs, adrenal, use]) => (
                  <tr key={agent} className="border-b border-border/50 align-top">
                    <td className="py-1.5 px-2 font-medium text-foreground whitespace-nowrap">{agent}</td>
                    <td className="py-1.5 px-2">{cvs}</td>
                    <td className="py-1.5 px-2">{adrenal}</td>
                    <td className="py-1.5 px-2">{use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Summary footer */}
      <div className="grid sm:grid-cols-3 gap-2 text-xs">
        <div className="bg-card rounded-lg border border-border p-2.5">
          <p className="font-semibold text-foreground">Dose / PK</p>
          <p className="text-muted-foreground">0.3 mg/kg IV. Onset 30–60 s. Vd 2–4 L/kg. Hepatic ester hydrolysis. t½β ~3 h. Inactive metabolites.</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-2.5">
          <p className="font-semibold text-foreground">Side effects</p>
          <p className="text-muted-foreground">Pain on injection, myoclonus (not seizures), high PONV, adrenal suppression, no analgesia.</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-2.5">
          <p className="font-semibold text-foreground">Formulation</p>
          <p className="text-muted-foreground">2 mg/mL in 35% propylene glycol (pain on injection) or lipid emulsion (Etomidate-Lipuro — less pain).</p>
        </div>
      </div>
    </div>
  );
};

export default EtomidatePharmacologyDiagram;

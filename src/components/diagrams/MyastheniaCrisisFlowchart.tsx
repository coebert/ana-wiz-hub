import { AnimatedMechanism, AnimatedMechanismStep } from "./AnimatedMechanism";
import { svgNodeProps } from "./_shared/DiagramFigure";

/**
 * Myasthenic crisis — animated ICU decision flow.
 * Six-step cascade: recognition → bedside respiratory metrics → NIV trial →
 * intubation thresholds → immunotherapy choice (IVIg vs PLEX) → adjuncts.
 */
const STEPS: AnimatedMechanismStep[] = [
  {
    label: "Recognise crisis",
    detail: (
      <>
        Acute MG exacerbation with <strong>respiratory failure</strong> or
        <strong> severe bulbar weakness</strong> threatening the airway.
        Triggers: infection (commonest), surgery, aspiration, pregnancy,
        offending drugs (aminoglycosides, fluoroquinolones, macrolides,
        β-blockers, magnesium, neuromuscular blockers).
      </>
    ),
    callout: <>Always rule out <em>cholinergic crisis</em>: SLUDGE + miosis + fasciculations + bradycardia → stop pyridostigmine, give atropine.</>,
  },
  {
    label: "Bedside respiratory metrics",
    detail: (
      <>
        Serial <strong>4-hourly</strong> bedside testing — single counts and
        gases lag behind respiratory failure. Track <strong>FVC</strong>,
        <strong> NIF (MIP)</strong>, <strong>MEP</strong> and{" "}
        <strong>single-breath count</strong>. ABG is a late sign — rising
        PaCO₂ means you are already too late.
      </>
    ),
    callout: <>Single-breath count &lt; 20 ≈ FVC &lt; 1 L; falling NIF predicts decompensation hours before SpO₂ drops.</>,
  },
  {
    label: "Trial NIV?",
    detail: (
      <>
        If <strong>no significant bulbar weakness</strong> and the patient is
        cooperative, alert and protecting their airway, a <strong>BiPAP
        trial</strong> (IPAP 8–12 / EPAP 4–5, titrate up) avoids intubation
        in <strong>~70%</strong> when started <em>early</em> (PaCO₂ &lt; 6.5 kPa,
        pH &gt; 7.30).
      </>
    ),
    callout: <>Contraindications: bulbar weakness with secretions, ↓ GCS, copious airway soiling, haemodynamic instability, vomiting.</>,
  },
  {
    label: "Intubation thresholds (20/30/40)",
    detail: (
      <>
        Intubate <em>electively</em> — never wait for arrest. <strong>FVC &lt; 15
        mL/kg</strong> (or &lt; 1 L), <strong>NIF &lt; −20 cmH₂O</strong>,
        <strong> MEP &lt; +40</strong>, severe bulbar dysfunction, failed NIV,
        aspiration. Avoid suxamethonium (resistance) and use{" "}
        <strong>1/10–1/5 normal dose</strong> of rocuronium (extreme
        sensitivity); ideally avoid NMB altogether — use propofol/remifentanil.
      </>
    ),
    callout: <>"20/30/40 rule": FVC &lt; 20 mL/kg · NIF &lt; −30 · MEP &lt; +40 → impending failure (some texts use 20/−20/+40).</>,
  },
  {
    label: "Choose immunotherapy",
    detail: (
      <>
        <strong>IVIg 0.4 g/kg/day × 5 days</strong> OR <strong>PLEX (5
        exchanges over 1–2 weeks)</strong> — equivalent efficacy by RCT.
        Onset <strong>2–5 days</strong>, peak ~2 weeks. Choose by patient
        factors and access:
        <ul className="list-disc list-inside mt-1 text-xs">
          <li><strong>PLEX</strong>: faster, preferred if MuSK-Ab+ or severe bulbar; needs central line, removes IVIg if given first.</li>
          <li><strong>IVIg</strong>: easier logistics; avoid if IgA deficiency, renal failure, hypercoagulable, fluid overload.</li>
        </ul>
      </>
    ),
    callout: <>Start <strong>steroids AFTER</strong> immunotherapy is established — risk of transient worsening at 5–10 days.</>,
  },
  {
    label: "Adjuncts & wean",
    detail: (
      <>
        <strong>Stop pyridostigmine</strong> while intubated (secretions,
        no benefit on ventilator). Treat trigger (antibiotics if septic),
        VTE prophylaxis, nutrition, physiotherapy. Resume pyridostigmine
        and steroid taper before extubation. Extubate when{" "}
        <strong>FVC &gt; 15 mL/kg + NIF &lt; −25</strong> + adequate cough +
        bulbar function recovered.
      </>
    ),
    callout: <>Refractory crisis: rituximab, eculizumab (AChR-Ab+), efgartigimod (FcRn). Thymectomy is elective, NOT acute.</>,
  },
];

const MyastheniaCrisisScene = ({ active }: { active: number }) => {
  // Live respiratory parameter trajectory through the cascade
  const fvc = active >= 3 ? "12" : active >= 1 ? "18" : "32";
  const nif = active >= 3 ? "−18" : active >= 1 ? "−28" : "−60";
  const sbc = active >= 3 ? "12" : active >= 1 ? "22" : "45";
  const paco2 = active >= 3 ? "7.2" : active >= 1 ? "5.8" : "5.0";

  // Decision branches that light up
  const niv = active === 2;
  const tube = active >= 3;
  const ivig = active >= 4;
  const plex = active >= 4;

  return (
    <div className="w-full">
      <svg viewBox="0 0 400 320" className="w-full h-auto" role="img"
        aria-label="Myasthenic crisis ICU decision flowchart with respiratory monitoring and treatment branches">
        <defs>
          <linearGradient id="mc-bg" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--card))" />
            <stop offset="100%" stopColor="hsl(var(--muted) / 0.4)" />
          </linearGradient>
          <marker id="mc-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="hsl(var(--foreground))" />
          </marker>
        </defs>
        <rect width="400" height="320" fill="url(#mc-bg)" rx="6" />

        {/* TOP: recognition pill */}
        <g transform="translate(120, 10)" {...svgNodeProps("Step 1/6: Recognise myasthenic crisis")}>
          <rect width="160" height="32" rx="16"
            fill={active >= 0 ? "hsl(var(--destructive) / 0.18)" : "hsl(var(--card))"}
            stroke="hsl(var(--destructive))" strokeWidth={active === 0 ? 2 : 1} />
          <text x="80" y="20" textAnchor="middle" className="text-[11px] font-semibold" fill="hsl(var(--foreground))">
            Myasthenic crisis
          </text>
        </g>
        <line x1="200" y1="42" x2="200" y2="58" stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd="url(#mc-arrow)" />

        {/* MIDDLE: bedside metrics box */}
        <g transform="translate(50, 62)" opacity={active >= 1 ? 1 : 0.4} className="transition-opacity duration-500" {...svgNodeProps("Step 2/6: Bedside metrics 4-hourly (FVC, NIF, SBC, PaCO2)")}>
          <rect width="300" height="78" rx="6"
            fill={active === 1 ? "hsl(var(--clinical) / 0.12)" : "hsl(var(--card))"}
            stroke={active === 1 ? "hsl(var(--clinical))" : "hsl(var(--border))"}
            strokeWidth={active === 1 ? 2 : 1} />
          <text x="10" y="14" className="text-[10px] font-semibold" fill="hsl(var(--foreground))">
            Bedside respiratory metrics (4-hourly)
          </text>
          {[
            { label: "FVC (mL/kg)", val: fvc, danger: active >= 3 },
            { label: "NIF (cmH₂O)", val: nif, danger: active >= 3 },
            { label: "Single-breath count", val: sbc, danger: active >= 3 },
            { label: "PaCO₂ (kPa)", val: paco2, danger: active >= 3 },
          ].map((m, i) => (
            <g key={m.label} transform={`translate(${10 + (i % 4) * 72}, 24)`}>
              <rect width="66" height="44" rx="4"
                fill={m.danger ? "hsl(var(--destructive) / 0.15)" : "hsl(var(--muted) / 0.5)"}
                stroke={m.danger ? "hsl(var(--destructive))" : "hsl(var(--border))"} />
              <text x="33" y="14" textAnchor="middle" className="text-[8px]" fill="hsl(var(--muted-foreground))">{m.label}</text>
              <text x="33" y="32" textAnchor="middle" className="text-[13px] font-mono font-bold tabular-nums"
                fill={m.danger ? "hsl(var(--destructive))" : "hsl(var(--foreground))"}>{m.val}</text>
            </g>
          ))}
        </g>

        {/* DECISION DIAMOND: bulbar / NIV-eligible? */}
        <line x1="200" y1="140" x2="200" y2="156" stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd="url(#mc-arrow)" />
        <g transform="translate(140, 158)" opacity={active >= 2 ? 1 : 0.4} className="transition-opacity duration-500" {...svgNodeProps("Decision 1/1: Bulbar OK and PaCO2 < 6.5 kPa? (yes → NIV; no/fail → intubate)")}>
          <polygon points="60,0 120,28 60,56 0,28"
            fill={active === 2 ? "hsl(var(--physiology) / 0.15)" : "hsl(var(--card))"}
            stroke={active === 2 ? "hsl(var(--physiology))" : "hsl(var(--border))"}
            strokeWidth={active === 2 ? 2 : 1} />
          <text x="60" y="26" textAnchor="middle" className="text-[9px] font-semibold" fill="hsl(var(--foreground))">Bulbar OK +</text>
          <text x="60" y="38" textAnchor="middle" className="text-[9px] font-semibold" fill="hsl(var(--foreground))">PaCO₂ &lt; 6.5?</text>
        </g>

        {/* LEFT BRANCH: NIV trial */}
        <line x1="140" y1="186" x2="80" y2="220" stroke={niv ? "hsl(var(--physiology))" : "hsl(var(--border))"}
          strokeWidth={niv ? 2 : 1} markerEnd="url(#mc-arrow)" />
        <text x="100" y="205" className="text-[8px]" fill="hsl(var(--muted-foreground))">YES</text>
        <g transform="translate(15, 222)" opacity={active >= 2 ? 1 : 0.35} className="transition-opacity duration-500" {...svgNodeProps("Step 3a/6 — Branch yes: NIV trial (BiPAP 8/4 → 12/5 cmH2O)")}>
          <rect width="130" height="44" rx="6"
            fill={niv ? "hsl(var(--physiology) / 0.18)" : "hsl(var(--card))"}
            stroke={niv ? "hsl(var(--physiology))" : "hsl(var(--border))"}
            strokeWidth={niv ? 2 : 1} />
          <text x="65" y="16" textAnchor="middle" className="text-[10px] font-semibold" fill="hsl(var(--foreground))">NIV trial</text>
          <text x="65" y="30" textAnchor="middle" className="text-[8px]" fill="hsl(var(--muted-foreground))">BiPAP 8/4 → 12/5</text>
          <text x="65" y="40" textAnchor="middle" className="text-[8px]" fill="hsl(var(--muted-foreground))">avoids tube ~70%</text>
        </g>

        {/* RIGHT BRANCH: intubate */}
        <line x1="260" y1="186" x2="320" y2="220" stroke={tube ? "hsl(var(--destructive))" : "hsl(var(--border))"}
          strokeWidth={tube ? 2 : 1} markerEnd="url(#mc-arrow)" />
        <text x="290" y="205" className="text-[8px]" fill="hsl(var(--muted-foreground))">NO / FAIL</text>
        <g transform="translate(255, 222)" opacity={active >= 3 ? 1 : 0.35} className="transition-opacity duration-500" {...svgNodeProps("Step 3b/6 — Branch no: Intubate (FVC < 15 mL/kg or NIF > −20 cmH2O; ↓NMB 1/5–1/10)")}>
          <rect width="130" height="44" rx="6"
            fill={tube ? "hsl(var(--destructive) / 0.18)" : "hsl(var(--card))"}
            stroke={tube ? "hsl(var(--destructive))" : "hsl(var(--border))"}
            strokeWidth={tube ? 2 : 1} />
          <text x="65" y="16" textAnchor="middle" className="text-[10px] font-semibold" fill="hsl(var(--foreground))">Intubate</text>
          <text x="65" y="30" textAnchor="middle" className="text-[8px]" fill="hsl(var(--muted-foreground))">FVC &lt; 15 · NIF &gt; −20</text>
          <text x="65" y="40" textAnchor="middle" className="text-[8px]" fill="hsl(var(--muted-foreground))">↓ NMB dose 1/5–1/10</text>
        </g>

        {/* CONVERGE → immunotherapy */}
        <line x1="80" y1="266" x2="160" y2="282" stroke={ivig ? "hsl(var(--clinical))" : "hsl(var(--border))"}
          strokeWidth={ivig ? 2 : 1} markerEnd="url(#mc-arrow)" />
        <line x1="320" y1="266" x2="240" y2="282" stroke={plex ? "hsl(var(--clinical))" : "hsl(var(--border))"}
          strokeWidth={plex ? 2 : 1} markerEnd="url(#mc-arrow)" />

        {/* Immunotherapy split: IVIg / PLEX */}
        <g transform="translate(50, 282)" opacity={active >= 4 ? 1 : 0.35} className="transition-opacity duration-500" {...svgNodeProps("Step 4a/6: Immunotherapy — IVIg 0.4 g/kg/day × 5 d")}>
          <rect width="140" height="32" rx="6"
            fill={ivig ? "hsl(var(--clinical) / 0.18)" : "hsl(var(--card))"}
            stroke={ivig ? "hsl(var(--clinical))" : "hsl(var(--border))"}
            strokeWidth={ivig ? 2 : 1} />
          <text x="70" y="14" textAnchor="middle" className="text-[10px] font-semibold" fill="hsl(var(--foreground))">IVIg 0.4 g/kg × 5</text>
          <text x="70" y="26" textAnchor="middle" className="text-[8px]" fill="hsl(var(--muted-foreground))">avoid: IgA def · AKI · VTE</text>
        </g>
        <g transform="translate(210, 282)" opacity={active >= 4 ? 1 : 0.35} className="transition-opacity duration-500" {...svgNodeProps("Step 4b/6: Immunotherapy — PLEX × 5 sessions")}>
          <rect width="140" height="32" rx="6"
            fill={plex ? "hsl(var(--clinical) / 0.18)" : "hsl(var(--card))"}
            stroke={plex ? "hsl(var(--clinical))" : "hsl(var(--border))"}
            strokeWidth={plex ? 2 : 1} />
          <text x="70" y="14" textAnchor="middle" className="text-[10px] font-semibold" fill="hsl(var(--foreground))">PLEX × 5</text>
          <text x="70" y="26" textAnchor="middle" className="text-[8px]" fill="hsl(var(--muted-foreground))">faster · MuSK-Ab+ · severe bulbar</text>
        </g>

        {/* Steroid follow-on label */}
        {active >= 5 && (
          <g className="animate-fade-in" {...svgNodeProps("Step 6/6: Add steroids after immunotherapy established")}>
            <text x="200" y="316" textAnchor="middle" className="text-[9px] font-semibold" fill="hsl(var(--physiology))">
              + Steroids AFTER immunotherapy established
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};

const MyastheniaCrisisFlowchart = () => (
  <AnimatedMechanism
    title="Myasthenic crisis — NIV vs intubation vs immunotherapy"
    subtitle="Bedside metrics drive escalation; choose IVIg or PLEX by patient factors; steroids follow, never lead"
    steps={STEPS}
    stepMs={3600}
    accentClass="border-clinical/40"
    renderScene={(active) => <MyastheniaCrisisScene active={active} />}
  />
);

export default MyastheniaCrisisFlowchart;

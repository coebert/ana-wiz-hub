import { useState } from "react";
import { DiagramFigure } from "./_shared/DiagramFigure";

type TabId = "racemic" | "nmda" | "herg" | "conversion";

interface Tab {
  id: TabId;
  label: string;
  color: string;
}

const tabs: Tab[] = [
  { id: "racemic", label: "Racemic mixture", color: "hsl(210 70% 55%)" },
  { id: "nmda", label: "NMDA antagonism", color: "hsl(280 65% 55%)" },
  { id: "herg", label: "hERG / QT", color: "hsl(0 70% 55%)" },
  { id: "conversion", label: "Dose conversion", color: "hsl(140 55% 45%)" },
];

// Equianalgesic conversion: oral morphine equivalent daily dose (oMEDD) → oral methadone ratio
// Based on Mercadante / Ayonrinde / Caraceni (EAPC) recommendations
const conversionRows = [
  { range: "< 90 mg/day", ratio: "4 : 1", example: "60 mg morphine → 15 mg methadone" },
  { range: "90 – 300 mg/day", ratio: "8 : 1", example: "200 mg morphine → 25 mg methadone" },
  { range: "300 – 600 mg/day", ratio: "10 : 1", example: "500 mg morphine → 50 mg methadone" },
  { range: "600 – 1000 mg/day", ratio: "12 : 1", example: "800 mg morphine → 67 mg methadone" },
  { range: "> 1000 mg/day", ratio: "≥ 15 : 1", example: "1500 mg morphine → ~100 mg methadone" },
];

export const MethadonePharmacologyDiagram = () => {
  const [tab, setTab] = useState<TabId>("racemic");
  const [oMEDD, setOMEDD] = useState<number>(200);

  const getRatio = (dose: number) => {
    if (dose < 90) return 4;
    if (dose < 300) return 8;
    if (dose < 600) return 10;
    if (dose < 1000) return 12;
    return 15;
  };
  const ratio = getRatio(oMEDD);
  const methadoneDose = Math.round(oMEDD / ratio);
  const startingDose = Math.round(methadoneDose * 0.75); // 25% reduction for incomplete cross-tolerance

  const active = tabs.find((t) => t.id === tab) ?? tabs[0];

  return (
    <DiagramFigure
      id="methadone-pharmacology-diagram"
      title="Methadone pharmacology"
      description="Auto-generated wrapper for the Methadone pharmacology anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <div className="w-full bg-card border border-border rounded-lg p-4 sm:p-6 my-6">
        <h3 className="text-lg font-serif font-bold text-foreground mb-1">Methadone — Unique Pharmacology</h3>
        <p className="text-sm text-muted-foreground mb-4">
          A synthetic μ-agonist with NMDA antagonism, ultra-long elimination half-life, and significant cardiac risk. Click a tab to explore each property.
        </p>
  
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                tab === t.id
                  ? "border-foreground text-background shadow-sm"
                  : "border-border text-foreground hover:border-foreground/50"
              }`}
              style={{ backgroundColor: tab === t.id ? t.color : "transparent" }}
            >
              {t.label}
            </button>
          ))}
        </div>
  
        {/* RACEMIC MIXTURE */}
        {tab === "racemic" && (
          <div>
            <div className="w-full overflow-x-auto">
              <svg viewBox="0 0 800 360" className="w-full h-auto" style={{ minWidth: 600 }}>
                <defs>
                  <marker id="arrM" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--muted-foreground))" />
                  </marker>
                </defs>
  
                {/* Racemic methadone box */}
                <rect x="320" y="20" width="160" height="60" rx="8" fill="hsl(var(--background))" stroke="hsl(var(--foreground))" strokeWidth="2" />
                <text x="400" y="42" textAnchor="middle" className="fill-foreground" fontSize="13" fontWeight="700">Racemic methadone</text>
                <text x="400" y="60" textAnchor="middle" className="fill-muted-foreground" fontSize="10">50 : 50 mixture</text>
                <text x="400" y="73" textAnchor="middle" className="fill-muted-foreground" fontSize="10">(R)- + (S)- enantiomers</text>
  
                {/* Split arrows */}
                <line x1="370" y1="80" x2="200" y2="120" stroke="hsl(var(--muted-foreground))" strokeWidth="2" markerEnd="url(#arrM)" />
                <line x1="430" y1="80" x2="600" y2="120" stroke="hsl(var(--muted-foreground))" strokeWidth="2" markerEnd="url(#arrM)" />
  
                {/* (R)-methadone — analgesic */}
                <rect x="60" y="125" width="280" height="170" rx="8" fill="hsl(140 55% 45%)" opacity="0.12" stroke="hsl(140 55% 45%)" strokeWidth="2" />
                <text x="200" y="148" textAnchor="middle" className="fill-foreground" fontSize="13" fontWeight="700">(R)-methadone — "L"</text>
                <text x="200" y="164" textAnchor="middle" className="fill-muted-foreground" fontSize="10">levomethadone</text>
  
                <text x="80" y="190" className="fill-foreground" fontSize="11" fontWeight="600">μ-opioid agonist</text>
                <text x="80" y="205" className="fill-muted-foreground" fontSize="10">10–50× more potent at MOR</text>
                <text x="80" y="218" className="fill-muted-foreground" fontSize="10">than (S)-enantiomer</text>
  
                <text x="80" y="240" className="fill-foreground" fontSize="11" fontWeight="600">→ Analgesia</text>
                <text x="80" y="255" className="fill-muted-foreground" fontSize="10">→ Respiratory depression</text>
                <text x="80" y="268" className="fill-muted-foreground" fontSize="10">→ Sedation, miosis, constipation</text>
                <text x="80" y="285" className="fill-muted-foreground" fontSize="10" fontStyle="italic">Available alone in some EU countries</text>
  
                {/* (S)-methadone — NMDA + hERG */}
                <rect x="460" y="125" width="280" height="170" rx="8" fill="hsl(0 70% 55%)" opacity="0.12" stroke="hsl(0 70% 55%)" strokeWidth="2" />
                <text x="600" y="148" textAnchor="middle" className="fill-foreground" fontSize="13" fontWeight="700">(S)-methadone — "D"</text>
                <text x="600" y="164" textAnchor="middle" className="fill-muted-foreground" fontSize="10">dextromethadone</text>
  
                <text x="480" y="190" className="fill-foreground" fontSize="11" fontWeight="600">NMDA antagonist</text>
                <text x="480" y="205" className="fill-muted-foreground" fontSize="10">non-competitive blockade</text>
  
                <text x="480" y="230" className="fill-foreground" fontSize="11" fontWeight="600">hERG K⁺ channel blocker</text>
                <text x="480" y="245" className="fill-muted-foreground" fontSize="10">→ QT prolongation, TdP risk</text>
  
                <text x="480" y="270" className="fill-foreground" fontSize="11" fontWeight="600">SERT/NET reuptake inhibition</text>
                <text x="480" y="285" className="fill-muted-foreground" fontSize="10">→ ↑ serotonin syndrome risk</text>
  
                {/* Combined effect bar */}
                <rect x="120" y="320" width="560" height="35" rx="8" fill="hsl(var(--muted))" opacity="0.4" stroke="hsl(var(--border))" strokeWidth="1" />
                <text x="400" y="343" textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="600">
                  Net effect: opioid analgesia + anti-hyperalgesic + cardiac risk
                </text>
              </svg>
            </div>
  
            <div className="mt-4 p-4 rounded-lg border border-border bg-background">
              <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-2">Why this matters clinically</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>The two enantiomers have <strong className="text-foreground">distinct pharmacology</strong> — analgesia derives almost entirely from (R), while (S) drives both the NMDA-antagonist benefit and the cardiac toxicity.</li>
                <li>Pharmacokinetics: oral bioavailability 70–90%, t½ <strong className="text-foreground">15–60 hours (highly variable)</strong>, hepatic metabolism via CYP3A4, CYP2B6 and CYP2D6 — many drug interactions.</li>
                <li>Steady state requires <strong className="text-foreground">5–7 days</strong> — risk of accumulation and delayed respiratory depression after dose increases.</li>
              </ul>
            </div>
          </div>
        )}
  
        {/* NMDA ANTAGONISM */}
        {tab === "nmda" && (
          <div>
            <div className="w-full overflow-x-auto">
              <svg viewBox="0 0 800 360" className="w-full h-auto" style={{ minWidth: 600 }}>
                <defs>
                  <marker id="arrN" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(280 65% 55%)" />
                  </marker>
                  <marker id="arrG" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--muted-foreground))" />
                  </marker>
                </defs>
  
                {/* Presynaptic */}
                <ellipse cx="150" cy="120" rx="60" ry="40" fill="hsl(var(--background))" stroke="hsl(var(--foreground))" strokeWidth="2" />
                <text x="150" y="115" textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="600">C-fibre</text>
                <text x="150" y="130" textAnchor="middle" className="fill-muted-foreground" fontSize="10">terminal</text>
  
                {/* Glutamate release */}
                <circle cx="220" cy="170" r="5" fill="hsl(280 65% 55%)" />
                <circle cx="240" cy="180" r="5" fill="hsl(280 65% 55%)" />
                <circle cx="260" cy="172" r="5" fill="hsl(280 65% 55%)" />
                <text x="280" y="175" className="fill-muted-foreground" fontSize="10">Glu</text>
  
                {/* Postsynaptic with NMDA */}
                <ellipse cx="500" cy="220" rx="120" ry="50" fill="hsl(var(--background))" stroke="hsl(var(--foreground))" strokeWidth="2" />
                <text x="500" y="218" textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="600">Projection neuron</text>
                <text x="500" y="232" textAnchor="middle" className="fill-muted-foreground" fontSize="10">(dorsal horn lamina I/V)</text>
  
                {/* NMDA receptor */}
                <rect x="430" y="180" width="50" height="20" fill="hsl(280 65% 55%)" opacity="0.4" stroke="hsl(var(--foreground))" strokeWidth="1" rx="2" />
                <text x="455" y="194" textAnchor="middle" className="fill-foreground" fontSize="10" fontWeight="600">NMDA</text>
  
                {/* (S)-methadone blocking NMDA */}
                <circle cx="455" cy="155" r="14" fill="hsl(0 70% 55%)" opacity="0.85" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
                <text x="455" y="159" textAnchor="middle" className="fill-background" fontSize="9" fontWeight="700">(S)</text>
                <line x1="455" y1="170" x2="455" y2="180" stroke="hsl(0 70% 55%)" strokeWidth="2" />
                <text x="500" y="158" className="fill-foreground" fontSize="10" fontWeight="600">(S)-methadone</text>
                <text x="500" y="170" className="fill-muted-foreground" fontSize="9">non-competitive block</text>
  
                {/* MOR with (R)-methadone */}
                <rect x="540" y="180" width="50" height="20" fill="hsl(140 55% 45%)" opacity="0.4" stroke="hsl(var(--foreground))" strokeWidth="1" rx="2" />
                <text x="565" y="194" textAnchor="middle" className="fill-foreground" fontSize="10" fontWeight="600">MOR</text>
                <circle cx="565" cy="155" r="14" fill="hsl(140 55% 45%)" opacity="0.85" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
                <text x="565" y="159" textAnchor="middle" className="fill-background" fontSize="9" fontWeight="700">(R)</text>
                <line x1="565" y1="170" x2="565" y2="180" stroke="hsl(140 55% 45%)" strokeWidth="2" />
  
                {/* Wind-up arrow blocked */}
                <text x="350" y="295" className="fill-muted-foreground" fontSize="11" fontWeight="600">No 'wind-up'</text>
                <text x="350" y="310" className="fill-muted-foreground" fontSize="10">↓ central sensitisation, ↓ tolerance, useful in OIH</text>
  
                {/* Glutamate arrow → NMDA */}
                <line x1="280" y1="175" x2="425" y2="190" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" strokeDasharray="3 3" markerEnd="url(#arrG)" />
              </svg>
            </div>
  
            <div className="mt-4 p-4 rounded-lg border border-border bg-background">
              <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-2">Clinical advantages of NMDA antagonism</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li><strong className="text-foreground">Opioid rotation in OIH:</strong> Methadone is the agent of choice when switching from another μ-agonist in patients with hyperalgesia or refractory neuropathic pain.</li>
                <li><strong className="text-foreground">Reduced tolerance:</strong> NMDA blockade prevents wind-up, reducing the need for dose escalation.</li>
                <li><strong className="text-foreground">Neuropathic pain:</strong> More effective than morphine in many neuropathic pain syndromes due to dual mechanism.</li>
                <li><strong className="text-foreground">Incomplete cross-tolerance:</strong> Conversion from another opioid requires dose reduction (typically 25–50%) to avoid overdose.</li>
              </ul>
            </div>
          </div>
        )}
  
        {/* hERG / QT */}
        {tab === "herg" && (
          <div>
            <div className="w-full overflow-x-auto">
              <svg viewBox="0 0 800 380" className="w-full h-auto" style={{ minWidth: 600 }}>
                {/* hERG channel cartoon */}
                <text x="10" y="20" className="fill-muted-foreground" fontSize="11" fontWeight="600">CARDIAC MYOCYTE — repolarisation (IKr)</text>
                <rect x="40" y="40" width="220" height="40" fill="hsl(var(--muted))" opacity="0.4" />
  
                {/* Channel */}
                {[0, 1, 2, 3].map((i) => (
                  <rect key={i} x={120 + i * 14} y="38" width="10" height="44" fill="hsl(0 70% 55%)" opacity="0.7" stroke="hsl(var(--foreground))" strokeWidth="1" rx="2" />
                ))}
                <text x="155" y="100" textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="700">hERG channel</text>
                <text x="155" y="113" textAnchor="middle" className="fill-muted-foreground" fontSize="9">(KCNH2 / IKr)</text>
  
                {/* Methadone blocking */}
                <circle cx="155" cy="20" r="12" fill="hsl(0 70% 55%)" opacity="0.85" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
                <text x="155" y="24" textAnchor="middle" className="fill-background" fontSize="9" fontWeight="700">M</text>
                <line x1="155" y1="30" x2="155" y2="36" stroke="hsl(0 70% 55%)" strokeWidth="2" />
                <text x="280" y="58" className="fill-foreground" fontSize="11" fontWeight="600">Methadone (esp. S-enantiomer)</text>
                <text x="280" y="72" className="fill-muted-foreground" fontSize="10">blocks rapid delayed rectifier K⁺</text>
                <text x="280" y="85" className="fill-muted-foreground" fontSize="10">→ delayed repolarisation → ↑ QT</text>
  
                {/* ECG comparison */}
                <text x="10" y="160" className="fill-muted-foreground" fontSize="11" fontWeight="600">ECG — QT interval</text>
  
                {/* Normal ECG */}
                <text x="50" y="185" className="fill-foreground" fontSize="10" fontWeight="600">Normal</text>
                <polyline
                  points="50,220 90,220 95,210 100,230 110,200 115,260 125,220 145,220 165,200 185,220 200,220"
                  fill="none"
                  stroke="hsl(140 55% 45%)"
                  strokeWidth="2"
                />
                <line x1="115" y1="270" x2="175" y2="270" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
                <text x="145" y="285" textAnchor="middle" className="fill-muted-foreground" fontSize="9">QT &lt; 440 ms</text>
  
                {/* Prolonged ECG */}
                <text x="350" y="185" className="fill-foreground" fontSize="10" fontWeight="600">Methadone (high dose)</text>
                <polyline
                  points="350,220 390,220 395,210 400,230 410,200 415,260 425,220 470,220 500,200 530,220 550,220"
                  fill="none"
                  stroke="hsl(0 70% 55%)"
                  strokeWidth="2"
                />
                <line x1="415" y1="270" x2="520" y2="270" stroke="hsl(0 70% 55%)" strokeWidth="1.5" />
                <text x="467" y="285" textAnchor="middle" className="fill-foreground" fontSize="9" fontWeight="600">QTc &gt; 500 ms</text>
                <text x="467" y="298" textAnchor="middle" className="fill-muted-foreground" fontSize="9">↑ TdP risk</text>
  
                {/* Risk factors box */}
                <rect x="40" y="310" width="720" height="60" rx="6" fill="hsl(0 70% 55%)" opacity="0.12" stroke="hsl(0 70% 55%)" strokeWidth="1.5" />
                <text x="55" y="330" className="fill-foreground" fontSize="11" fontWeight="700">Additive risk factors for TdP:</text>
                <text x="55" y="347" className="fill-muted-foreground" fontSize="10">↓ K⁺, ↓ Mg²⁺, ↓ Ca²⁺ · bradycardia · female sex · structural heart disease</text>
                <text x="55" y="362" className="fill-muted-foreground" fontSize="10">other QT-prolonging drugs (ondansetron, amiodarone, antipsychotics, fluoroquinolones, macrolides)</text>
              </svg>
            </div>
  
            <div className="mt-4 p-4 rounded-lg border border-border bg-background">
              <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-2">Monitoring recommendations</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li><strong className="text-foreground">Baseline ECG</strong> before initiation in all patients with cardiac risk factors. Some guidelines (Krantz 2009, AAPM) recommend ECG in <em>all</em> patients on methadone.</li>
                <li>Repeat ECG at <strong className="text-foreground">30 days</strong>, then annually, and after any dose increase &gt; 30 mg/day.</li>
                <li><strong className="text-foreground">QTc 450–500 ms:</strong> Discuss risk-benefit, address modifiable factors, consider dose reduction.</li>
                <li><strong className="text-foreground">QTc &gt; 500 ms:</strong> Reduce dose or stop methadone; consider alternative opioid.</li>
                <li>Risk is dose-dependent — significant prolongation usually at <strong className="text-foreground">&gt; 100 mg/day</strong>, but TdP can occur at lower doses with risk factors.</li>
              </ul>
            </div>
          </div>
        )}
  
        {/* CONVERSION CALCULATOR */}
        {tab === "conversion" && (
          <div>
            <div className="p-4 rounded-lg border-2 mb-4" style={{ borderColor: active.color, backgroundColor: `${active.color}10` }}>
              <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-3">Interactive conversion calculator</p>
  
              <label className="block text-sm font-medium text-foreground mb-2">
                Oral morphine equivalent daily dose (oMEDD): <span className="font-bold" style={{ color: active.color }}>{oMEDD} mg/day</span>
              </label>
              <input
                type="range"
                min={30}
                max={2000}
                step={10}
                value={oMEDD}
                onChange={(e) => setOMEDD(Number(e.target.value))}
                className="w-full mb-4 accent-foreground"
              />
  
              <div className="grid sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-md bg-background border border-border">
                  <p className="text-xs text-muted-foreground">Conversion ratio</p>
                  <p className="text-xl font-bold text-foreground">{ratio} : 1</p>
                  <p className="text-xs text-muted-foreground">morphine : methadone</p>
                </div>
                <div className="p-3 rounded-md bg-background border border-border">
                  <p className="text-xs text-muted-foreground">Equianalgesic methadone</p>
                  <p className="text-xl font-bold text-foreground">{methadoneDose} mg/day</p>
                  <p className="text-xs text-muted-foreground">total daily dose</p>
                </div>
                <div className="p-3 rounded-md border-2" style={{ borderColor: active.color }}>
                  <p className="text-xs text-muted-foreground">Recommended starting dose</p>
                  <p className="text-xl font-bold" style={{ color: active.color }}>{startingDose} mg/day</p>
                  <p className="text-xs text-muted-foreground">25% reduction (incomplete cross-tolerance)</p>
                </div>
              </div>
  
              <p className="text-xs text-muted-foreground mt-3 italic">
                Divide total daily dose into 8-hourly (TDS) administration. Titrate every 5–7 days (steady state). Always verify with local protocols.
              </p>
            </div>
  
            {/* Reference table */}
            <div>
              <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-2">Reference conversion ratios (Mercadante / EAPC)</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 text-foreground font-semibold">oMEDD range</th>
                      <th className="text-left py-2 text-foreground font-semibold">Ratio (morphine : methadone)</th>
                      <th className="text-left py-2 text-foreground font-semibold">Example</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    {conversionRows.map((r) => {
                      const isActive =
                        (r.range.startsWith("<") && oMEDD < 90) ||
                        (r.range.startsWith("90") && oMEDD >= 90 && oMEDD < 300) ||
                        (r.range.startsWith("300") && oMEDD >= 300 && oMEDD < 600) ||
                        (r.range.startsWith("600") && oMEDD >= 600 && oMEDD < 1000) ||
                        (r.range.startsWith(">") && oMEDD >= 1000);
                      return (
                            <tr key={r.range} className="border-b border-border" style={isActive ? { backgroundColor: `${active.color}15` } : undefined}>
                          <td className="py-2 font-medium text-foreground">{r.range}</td>
                          <td className="py-2">{r.ratio}</td>
                          <td className="py-2">{r.example}</td>
                        </tr>
    );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
  
            <div className="mt-4 p-4 rounded-lg border border-border bg-background">
              <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-2">Key safety principles</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Conversion ratios are <strong className="text-foreground">non-linear</strong> — methadone becomes relatively more potent as the morphine dose increases.</li>
                <li>Reduce calculated dose by <strong className="text-foreground">25–50%</strong> for incomplete cross-tolerance, especially in opioid-tolerant patients.</li>
                <li>Three switching strategies: <strong className="text-foreground">"stop-and-go"</strong> (Edmonton), <strong className="text-foreground">3-day switch</strong>, or <strong className="text-foreground">gradual titration</strong>. Choose based on setting and risk.</li>
                <li>Monitor closely for <strong className="text-foreground">delayed accumulation</strong> — sedation/respiratory depression peaks at day 3–5.</li>
                <li>Parenteral : oral methadone ≈ <strong className="text-foreground">1 : 2</strong> (better bioavailability than morphine).</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </DiagramFigure>
  );
};

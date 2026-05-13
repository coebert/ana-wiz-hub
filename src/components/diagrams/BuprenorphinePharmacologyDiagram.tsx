import { useState } from "react";

type TabId = "partial" | "affinity" | "formulations" | "periop";

const tabs: { id: TabId; label: string; color: string }[] = [
  { id: "partial", label: "Partial agonism & ceiling", color: "hsl(210 70% 55%)" },
  { id: "affinity", label: "MOR affinity", color: "hsl(280 65% 55%)" },
  { id: "formulations", label: "Formulations", color: "hsl(140 55% 45%)" },
  { id: "periop", label: "Perioperative management", color: "hsl(0 70% 55%)" },
];

const formulations = [
  {
    name: "Sublingual tablet/film",
    examples: "Subutex® (bup), Suboxone® (bup + naloxone 4:1)",
    dose: "2–32 mg/day",
    bioavail: "30–55%",
    onset: "30–60 min",
    duration: "24–72 h",
    indication: "Opioid use disorder (OUD), chronic pain",
    note: "Naloxone added to deter IV abuse — inactive sublingually but precipitates withdrawal if injected.",
  },
  {
    name: "Transdermal patch",
    examples: "BuTrans® (5/10/15/20 µg/h, 7-day), Transtec® (35/52.5/70 µg/h, 4-day)",
    dose: "5–70 µg/h",
    bioavail: "~50%",
    onset: "12–24 h to steady state",
    duration: "7 days (BuTrans), 4 days (Transtec)",
    indication: "Chronic non-malignant and cancer pain (mild-moderate)",
    note: "Useful in elderly and renal impairment. Stable plasma levels. Remove before MRI (metal backing).",
  },
  {
    name: "IV / IM",
    examples: "Temgesic® IV/IM 0.3–0.6 mg",
    dose: "0.3–0.6 mg q6–8h",
    bioavail: "100% (IV)",
    onset: "5–15 min",
    duration: "6–8 h",
    indication: "Acute postoperative pain, perioperative analgesia",
    note: "Slow IV (over 2 min). Naloxone reversal requires high doses (4–10 mg) due to high MOR affinity.",
  },
  {
    name: "Buccal film",
    examples: "Belbuca® (75–900 µg BD)",
    dose: "75–900 µg BD",
    bioavail: "~50%",
    onset: "30–60 min",
    duration: "12 h",
    indication: "Chronic pain in opioid-naive patients",
    note: "Lower doses than SL — designed for analgesia rather than OUD.",
  },
  {
    name: "Subcutaneous depot",
    examples: "Sublocade® (monthly), Buvidal® (weekly/monthly)",
    dose: "64–160 mg/month",
    bioavail: "Sustained release",
    onset: "Days",
    duration: "1 week to 1 month",
    indication: "OUD maintenance — improves adherence",
    note: "Eliminates daily dosing burden. Established on SL bup before depot initiation.",
  },
];

export const BuprenorphinePharmacologyDiagram = () => {
  const [tab, setTab] = useState<TabId>("partial");
  const [dose, setDose] = useState<number>(8); // mg/day SL bup for slider
  const [selectedForm, setSelectedForm] = useState<number>(0);

  const active = tabs.find((t) => t.id === tab) ?? tabs[0];

  // Modelled effects vs dose for partial agonism plot
  // Analgesia: rises and plateaus around 16–32 mg
  // Respiratory depression: ceilings around 4–8 mg (much earlier)
  const analgesia = Math.min(95, (dose / (dose + 4)) * 100);
  const respDepression = Math.min(40, (dose / (dose + 1)) * 40); // hard ceiling at ~40%
  const fullAgonistResp = Math.min(100, dose * 6); // morphine-equivalent

  return (
        <div className="w-full bg-card border border-border rounded-lg p-4 sm:p-6 my-6">
      <h3 className="text-lg font-serif font-bold text-foreground mb-1">Buprenorphine — Pharmacology & Perioperative Management</h3>
      <p className="text-sm text-muted-foreground mb-4">
        High-affinity partial μ-agonist (and κ/δ antagonist, NOP partial agonist) with a respiratory ceiling effect. Click a tab to explore.
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

      {/* PARTIAL AGONISM & CEILING */}
      {tab === "partial" && (
        <div>
          <div className="w-full overflow-x-auto">
            <svg viewBox="0 0 800 380" className="w-full h-auto" style={{ minWidth: 600 }}>
              <defs>
                <marker id="arrBup" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--muted-foreground))" />
                </marker>
              </defs>

              {/* Axes */}
              <line x1="80" y1="320" x2="720" y2="320" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
              <line x1="80" y1="40" x2="80" y2="320" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
              <text x="400" y="355" textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="600">Dose (mg/day SL buprenorphine)</text>
              <text x="25" y="180" textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="600" transform="rotate(-90 25 180)">Effect (%)</text>

              {/* X-axis ticks */}
              {[0, 4, 8, 16, 24, 32].map((d, _i) => (
                <g key={d}>
                  <line x1={80 + (d / 32) * 640} y1="320" x2={80 + (d / 32) * 640} y2="325" stroke="hsl(var(--foreground))" strokeWidth="1" />
                  <text x={80 + (d / 32) * 640} y="338" textAnchor="middle" className="fill-muted-foreground" fontSize="9">{d}</text>
                </g>
              ))}
              {/* Y-axis ticks */}
              {[0, 25, 50, 75, 100].map((y) => (
                <g key={y}>
                  <line x1="75" y1={320 - (y / 100) * 280} x2="80" y2={320 - (y / 100) * 280} stroke="hsl(var(--foreground))" strokeWidth="1" />
                  <text x="68" y={324 - (y / 100) * 280} textAnchor="end" className="fill-muted-foreground" fontSize="9">{y}</text>
                </g>
              ))}

              {/* Full-agonist respiratory depression (morphine, dotted reference) */}
              <path
                d={`M 80 320 ${Array.from({ length: 33 }, (_, i) => {
                  const d = i;
                  const x = 80 + (d / 32) * 640;
                  const y = 320 - (Math.min(100, d * 6) / 100) * 280;
                  return `L ${x} ${y}`;
                }).join(" ")}`}
                fill="none"
                stroke="hsl(0 70% 55%)"
                strokeWidth="2"
                strokeDasharray="4 3"
                opacity="0.7"
              />
              <text x="200" y="60" className="fill-foreground" fontSize="10" fontWeight="600">Full agonist (morphine)</text>
              <text x="200" y="74" className="fill-muted-foreground" fontSize="9">— respiratory depression rises with dose</text>

              {/* Buprenorphine analgesia (rises, plateaus high) */}
              <path
                d={`M 80 320 ${Array.from({ length: 33 }, (_, i) => {
                  const d = i;
                  const x = 80 + (d / 32) * 640;
                  const a = (d / (d + 4)) * 100;
                  const y = 320 - (Math.min(95, a) / 100) * 280;
                  return `L ${x} ${y}`;
                }).join(" ")}`}
                fill="none"
                stroke="hsl(140 55% 45%)"
                strokeWidth="3"
              />
              <text x="500" y="120" className="fill-foreground" fontSize="10" fontWeight="600">Buprenorphine — analgesia</text>

              {/* Buprenorphine respiratory depression (ceiling at ~40%) */}
              <path
                d={`M 80 320 ${Array.from({ length: 33 }, (_, i) => {
                  const d = i;
                  const x = 80 + (d / 32) * 640;
                  const r = (d / (d + 1)) * 40;
                  const y = 320 - (Math.min(40, r) / 100) * 280;
                  return `L ${x} ${y}`;
                }).join(" ")}`}
                fill="none"
                stroke="hsl(210 70% 55%)"
                strokeWidth="3"
              />
              <text x="500" y="245" className="fill-foreground" fontSize="10" fontWeight="600">Buprenorphine — resp depression</text>
              <text x="500" y="259" className="fill-muted-foreground" fontSize="9">ceiling ~40% (life-saving feature)</text>

              {/* Ceiling line */}
              <line x1="80" y1="208" x2="720" y2="208" stroke="hsl(210 70% 55%)" strokeWidth="1" strokeDasharray="2 4" opacity="0.5" />

              {/* Interactive dose marker */}
              <line x1={80 + (dose / 32) * 640} y1="40" x2={80 + (dose / 32) * 640} y2="320" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx={80 + (dose / 32) * 640} cy={320 - (analgesia / 100) * 280} r="6" fill="hsl(140 55% 45%)" stroke="hsl(var(--background))" strokeWidth="2" />
              <circle cx={80 + (dose / 32) * 640} cy={320 - (respDepression / 100) * 280} r="6" fill="hsl(210 70% 55%)" stroke="hsl(var(--background))" strokeWidth="2" />
              <circle cx={80 + (dose / 32) * 640} cy={320 - (fullAgonistResp / 100) * 280} r="5" fill="hsl(0 70% 55%)" stroke="hsl(var(--background))" strokeWidth="2" opacity="0.7" />
            </svg>
          </div>

          {/* Slider */}
          <div className="mt-4 p-4 rounded-lg border-2" style={{ borderColor: active.color, backgroundColor: `${active.color}10` }}>
            <label className="block text-sm font-medium text-foreground mb-2">
              Dose: <span className="font-bold" style={{ color: active.color }}>{dose} mg/day</span>
            </label>
            <input
              type="range"
              min={0}
              max={32}
              step={1}
              value={dose}
              onChange={(e) => setDose(Number(e.target.value))}
              className="w-full mb-3 accent-foreground"
            />
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="p-2 rounded bg-background border border-border">
                <p className="text-muted-foreground">Analgesia</p>
                <p className="font-bold text-base" style={{ color: "hsl(140 55% 45%)" }}>{Math.round(analgesia)}%</p>
              </div>
              <div className="p-2 rounded bg-background border border-border">
                <p className="text-muted-foreground">Resp depression (bup)</p>
                <p className="font-bold text-base" style={{ color: "hsl(210 70% 55%)" }}>{Math.round(respDepression)}%</p>
              </div>
              <div className="p-2 rounded bg-background border border-border">
                <p className="text-muted-foreground">Resp depression (morphine eq.)</p>
                <p className="font-bold text-base" style={{ color: "hsl(0 70% 55%)" }}>{Math.round(fullAgonistResp)}%</p>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 rounded-lg border border-border bg-background">
            <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-2">Why partial agonism matters</p>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li><strong className="text-foreground">Ceiling on respiratory depression</strong> at ~40% of maximum — markedly safer than full agonists in overdose, hence FDA approval for OUD treatment.</li>
              <li><strong className="text-foreground">No ceiling on analgesia</strong> in the clinically relevant dose range — full analgesic efficacy comparable to morphine.</li>
              <li>Bell-shaped dose-response in some studies — analgesia may decrease at very high doses (rarely clinically relevant).</li>
              <li>Ceiling does NOT prevent overdose if combined with benzodiazepines, alcohol, or other CNS depressants.</li>
            </ul>
          </div>
        </div>
      )}

      {/* MOR AFFINITY */}
      {tab === "affinity" && (
        <div>
          <div className="w-full overflow-x-auto">
            <svg viewBox="0 0 800 380" className="w-full h-auto" style={{ minWidth: 600 }}>
              <text x="10" y="20" className="fill-muted-foreground" fontSize="11" fontWeight="600">μ-RECEPTOR (MOR) — affinity comparison</text>

              {/* MOR cartoon */}
              <rect x="40" y="160" width="720" height="40" fill="hsl(var(--muted))" opacity="0.4" />
              {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <rect key={i} x={365 + i * 11} y="158" width="8" height="44" fill="hsl(280 65% 55%)" opacity="0.85" stroke="hsl(var(--foreground))" strokeWidth="1" rx="2" />
              ))}
              <text x="400" y="222" textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="700">MOR</text>

              {/* Buprenorphine dominant */}
              <circle cx="400" cy="120" r="20" fill="hsl(210 70% 55%)" stroke="hsl(var(--foreground))" strokeWidth="2" />
              <text x="400" y="125" textAnchor="middle" className="fill-background" fontSize="11" fontWeight="700">Bup</text>
              <line x1="400" y1="140" x2="400" y2="155" stroke="hsl(210 70% 55%)" strokeWidth="3" />

              {/* Other opioids displaced */}
              <circle cx="200" cy="80" r="12" fill="hsl(0 70% 55%)" opacity="0.5" stroke="hsl(var(--foreground))" strokeWidth="1" />
              <text x="200" y="84" textAnchor="middle" className="fill-background" fontSize="9" fontWeight="700">Mor</text>
              <line x1="215" y1="90" x2="350" y2="135" stroke="hsl(var(--muted-foreground))" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
              <text x="200" y="65" textAnchor="middle" className="fill-muted-foreground" fontSize="9">displaced</text>

              <circle cx="600" cy="80" r="12" fill="hsl(0 70% 55%)" opacity="0.5" stroke="hsl(var(--foreground))" strokeWidth="1" />
              <text x="600" y="84" textAnchor="middle" className="fill-background" fontSize="9" fontWeight="700">Fent</text>
              <line x1="585" y1="90" x2="450" y2="135" stroke="hsl(var(--muted-foreground))" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
              <text x="600" y="65" textAnchor="middle" className="fill-muted-foreground" fontSize="9">displaced</text>

              {/* Affinity Ki bars */}
              <text x="40" y="260" className="fill-foreground" fontSize="11" fontWeight="700">MOR Ki (lower = higher affinity)</text>

              <text x="40" y="285" className="fill-foreground" fontSize="10">Buprenorphine</text>
              <rect x="180" y="275" width="30" height="14" fill="hsl(210 70% 55%)" />
              <text x="220" y="286" className="fill-muted-foreground" fontSize="10">Ki ≈ 0.2 nM</text>

              <text x="40" y="305" className="fill-foreground" fontSize="10">Fentanyl</text>
              <rect x="180" y="295" width="120" height="14" fill="hsl(0 70% 55%)" opacity="0.6" />
              <text x="310" y="306" className="fill-muted-foreground" fontSize="10">Ki ≈ 1.4 nM</text>

              <text x="40" y="325" className="fill-foreground" fontSize="10">Morphine</text>
              <rect x="180" y="315" width="160" height="14" fill="hsl(0 70% 55%)" opacity="0.5" />
              <text x="350" y="326" className="fill-muted-foreground" fontSize="10">Ki ≈ 1.8 nM</text>

              <text x="40" y="345" className="fill-foreground" fontSize="10">Naloxone</text>
              <rect x="180" y="335" width="80" height="14" fill="hsl(45 85% 50%)" />
              <text x="270" y="346" className="fill-muted-foreground" fontSize="10">Ki ≈ 1.0 nM (still lower than bup!)</text>

              <text x="40" y="370" className="fill-muted-foreground" fontSize="9" fontStyle="italic">
                Buprenorphine binds tighter and dissociates more slowly (t½ at MOR ≈ 166 min vs morphine ~7 min) — explaining its long duration and naloxone resistance.
              </text>
            </svg>
          </div>

          <div className="mt-4 p-4 rounded-lg border border-border bg-background">
            <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-2">Clinical consequences of high affinity</p>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li><strong className="text-foreground">Displaces full agonists from MOR</strong> → precipitated withdrawal if given to a patient on full agonist therapy. Wait until mild-moderate withdrawal (COWS &gt; 8) before initiating.</li>
              <li><strong className="text-foreground">Blocks subsequent opioid analgesia</strong> — full agonists given on top of buprenorphine have markedly reduced effect.</li>
              <li><strong className="text-foreground">Naloxone reversal requires very high doses</strong> (4–10 mg, sometimes infusion) and is often incomplete — be prepared to support ventilation.</li>
              <li><strong className="text-foreground">Long duration of action</strong> (24–72 h) due to slow MOR dissociation, despite short plasma half-life.</li>
            </ul>
          </div>
        </div>
      )}

      {/* FORMULATIONS */}
      {tab === "formulations" && (
        <div>
          <div className="grid sm:grid-cols-5 gap-2 mb-4">
            {formulations.map((f, i) => (
              <button
                key={f.name}
                onClick={() => setSelectedForm(i)}
                className={`p-2 rounded-md border text-xs font-medium transition-all text-left ${
                  selectedForm === i
                    ? "border-foreground text-background shadow-sm"
                    : "border-border text-foreground hover:border-foreground/50 bg-background"
                }`}
                style={{ backgroundColor: selectedForm === i ? "hsl(140 55% 45%)" : undefined }}
              >
                {f.name}
              </button>
            ))}
          </div>

          <div className="p-4 rounded-lg border-2" style={{ borderColor: "hsl(140 55% 45%)", backgroundColor: "hsl(140 55% 45% / 0.1)" }}>
            <h4 className="font-serif font-bold text-foreground text-base mb-2">{formulations[selectedForm].name}</h4>
            <p className="text-sm text-muted-foreground mb-3"><strong className="text-foreground">Examples:</strong> {formulations[selectedForm].examples}</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
              <div className="p-2 rounded bg-background border border-border">
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Typical dose</p>
                <p className="text-sm font-bold text-foreground">{formulations[selectedForm].dose}</p>
              </div>
              <div className="p-2 rounded bg-background border border-border">
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Bioavailability</p>
                <p className="text-sm font-bold text-foreground">{formulations[selectedForm].bioavail}</p>
              </div>
              <div className="p-2 rounded bg-background border border-border">
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Onset</p>
                <p className="text-sm font-bold text-foreground">{formulations[selectedForm].onset}</p>
              </div>
              <div className="p-2 rounded bg-background border border-border">
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Duration</p>
                <p className="text-sm font-bold text-foreground">{formulations[selectedForm].duration}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-2"><strong className="text-foreground">Indication:</strong> {formulations[selectedForm].indication}</p>
            <p className="text-sm text-muted-foreground"><strong className="text-foreground">Note:</strong> {formulations[selectedForm].note}</p>
          </div>

          <div className="mt-4 p-4 rounded-lg border border-border bg-background">
            <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-2">General PK</p>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Hepatic metabolism via <strong className="text-foreground">CYP3A4</strong> → norbuprenorphine (active). Glucuronidation via UGT1A1/2B7.</li>
              <li>Excretion: 70% biliary (faecal), 30% renal — <strong className="text-foreground">no dose adjustment in renal impairment</strong>.</li>
              <li>Plasma t½ 24–37 h (variable). MOR dissociation t½ &gt; receptor binding determines clinical duration.</li>
              <li>Negligible oral bioavailability (extensive first-pass) — only sublingual, transdermal, buccal, IV/IM, or SC depot.</li>
            </ul>
          </div>
        </div>
      )}

      {/* PERIOPERATIVE MANAGEMENT */}
      {tab === "periop" && (
        <div className="space-y-4">
          <div className="p-4 rounded-lg border-2" style={{ borderColor: "hsl(0 70% 55%)", backgroundColor: "hsl(0 70% 55% / 0.1)" }}>
            <h4 className="font-serif font-bold text-foreground text-base mb-2">The dilemma</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Patients on buprenorphine for OUD or chronic pain present a perioperative challenge: high MOR affinity blocks supplemental opioid analgesia, but stopping buprenorphine risks relapse, withdrawal, and overdose. <strong className="text-foreground">Modern guidance (ASRA/AAPM 2021) recommends continuing buprenorphine perioperatively in most cases.</strong>
            </p>
          </div>

          {/* Decision flowchart */}
          <div className="grid sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-lg border-2 border-border bg-background">
              <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "hsl(140 55% 45%)" }}>Minor surgery / mild pain</p>
              <p className="text-sm text-foreground font-semibold mb-1">Continue full dose</p>
              <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                <li>Multimodal: paracetamol, NSAIDs, regional, ketamine, dexmedetomidine</li>
                <li>No additional opioids needed</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border-2" style={{ borderColor: "hsl(45 85% 50%)" }}>
              <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "hsl(45 85% 50%)" }}>Moderate surgery</p>
              <p className="text-sm text-foreground font-semibold mb-1">Continue (consider split BD/TDS)</p>
              <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                <li>Splitting daily dose enhances analgesic effect</li>
                <li>Add high-dose full agonist (fentanyl) if needed</li>
                <li>Maximise regional anaesthesia</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border-2" style={{ borderColor: "hsl(0 70% 55%)" }}>
              <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "hsl(0 70% 55%)" }}>Major surgery / severe pain</p>
              <p className="text-sm text-foreground font-semibold mb-1">Continue OR reduce to 8–16 mg</p>
              <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                <li>Older guidance: stop 72 h preop — now discouraged (relapse risk)</li>
                <li>Use high-affinity agonists (fentanyl, sufentanil) at higher doses</li>
                <li>Plan for ICU/HDU if respiratory depression risk</li>
                <li>Engage addiction specialist early</li>
              </ul>
            </div>
          </div>

          {/* Postop & emergency */}
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-lg border border-border bg-background">
              <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-2">Postoperative analgesia strategies</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li><strong className="text-foreground">Multimodal first:</strong> paracetamol, NSAIDs, gabapentinoids, ketamine, IV lidocaine, magnesium</li>
                <li><strong className="text-foreground">Regional anaesthesia:</strong> single-shot or catheter techniques are highly effective</li>
                <li><strong className="text-foreground">PCA fentanyl/sufentanil:</strong> high-affinity agonists overcome MOR blockade better than morphine</li>
                <li><strong className="text-foreground">Avoid mixed agonist-antagonists</strong> (nalbuphine, pentazocine) — precipitate withdrawal</li>
                <li><strong className="text-foreground">Restart preop dose</strong> as soon as tolerating oral intake</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border border-border bg-background">
              <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-2">Emergency reversal of overdose</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li><strong className="text-foreground">Standard naloxone doses ineffective</strong> due to high MOR affinity</li>
                <li>Initial: <strong className="text-foreground">2 mg IV naloxone</strong>, repeat or escalate to 4–10 mg</li>
                <li>May require <strong className="text-foreground">infusion 4–10 mg/h</strong> due to long bup duration</li>
                <li><strong className="text-foreground">Support ventilation</strong> while reversal takes effect</li>
                <li>Naloxone effect outlasts on bup &lt; full agonists — observe for re-sedation</li>
              </ul>
            </div>
          </div>

          {/* Naloxone-containing formulations note */}
          <div className="p-3 rounded-lg border border-border bg-card">
            <p className="text-xs text-muted-foreground">
              <strong className="text-foreground">Suboxone® (bup + naloxone)</strong> is generally safe perioperatively — the naloxone has negligible effect via the sublingual route (BA &lt; 10%) and serves only to deter IV abuse.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

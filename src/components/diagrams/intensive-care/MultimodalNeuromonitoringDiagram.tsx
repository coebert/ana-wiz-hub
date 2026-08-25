import { useState } from "react";
import { DiagramFigure } from "../_shared/DiagramFigure";

type Modality = {
  id: string;
  name: string;
  abbreviation: string;
  measures: string;
  spatial: "Global" | "Regional" | "Focal";
  temporal: "Continuous" | "Intermittent (1h)" | "Intermittent (manual)";
  invasiveness: "Non-invasive" | "Intracranial" | "Intravascular";
  spatialScore: number; // 1 (focal) to 5 (whole brain) for plot
  temporalScore: number; // 1 (slow/intermittent) to 5 (real-time)
  threshold: string;
  strengths: string[];
  limitations: string[];
  // Position on schematic head (viewBox 0 0 360 360)
  x: number;
  y: number;
  color: string;
};

const MODALITIES: Modality[] = [
  {
    id: "icp",
    name: "Intracranial Pressure",
    abbreviation: "ICP",
    measures: "Pressure within the cranial vault (mmHg).",
    spatial: "Global",
    temporal: "Continuous",
    invasiveness: "Intracranial",
    spatialScore: 5,
    temporalScore: 5,
    threshold: "Treat sustained > 22 mmHg (BTF)",
    strengths: [
      "Gold-standard pressure measurement (EVD also drains CSF therapeutically)",
      "Continuous, real-time, well-validated waveform analysis",
      "Drives CPP calculation and the entire tiered TBI protocol",
      "Cheap, simple, widely available",
    ],
    limitations: [
      "Pressure is a late surrogate of injury — cellular distress can occur with normal ICP",
      "EVD risk: infection (~5–10% / week), haemorrhage on insertion (~1%)",
      "Intraparenchymal probes drift over days, cannot be re-zeroed",
      "Doesn't detect focal ischaemia in non-swollen brain",
    ],
    x: 180,
    y: 75,
    color: "hsl(15 80% 55%)",
  },
  {
    id: "cpp",
    name: "Cerebral Perfusion Pressure",
    abbreviation: "CPP",
    measures: "MAP − ICP (mmHg). A surrogate of perfusion pressure, not flow.",
    spatial: "Global",
    temporal: "Continuous",
    invasiveness: "Non-invasive",
    spatialScore: 5,
    temporalScore: 5,
    threshold: "60–70 mmHg (BTF)",
    strengths: [
      "Simple derived value — no extra hardware beyond ICP + arterial line",
      "Anchors haemodynamic management",
      "PRx-derived 'optimal CPP' (CPPopt) emerging as a personalised target",
    ],
    limitations: [
      "Pressure ≠ flow — depends on cerebrovascular resistance and autoregulation",
      "Same CPP can produce ischaemia in one patient and luxury perfusion in another",
      "Aggressive CPP elevation (>70) increases ARDS risk without outcome benefit",
    ],
    x: 180,
    y: 130,
    color: "hsl(0 70% 60%)",
  },
  {
    id: "pbto2",
    name: "Brain Tissue Oxygen",
    abbreviation: "PbtO₂",
    measures: "Partial pressure of O₂ in a 17 mm³ volume of white matter (mmHg).",
    spatial: "Focal",
    temporal: "Continuous",
    invasiveness: "Intracranial",
    spatialScore: 1,
    temporalScore: 5,
    threshold: "Treat < 20 mmHg; critical < 10",
    strengths: [
      "Continuous focal tissue oxygenation — real-time response to interventions",
      "BOOST-II RCT: PbtO₂-guided therapy reduced burden of brain hypoxia",
      "Detects ischaemia even when ICP and CPP are normal",
    ],
    limitations: [
      "Samples only ~17 mm³ — placement (normal vs perilesional) determines meaning",
      "Requires bolt/burr-hole; ~30 min equilibration after insertion",
      "Affected by FiO₂, PaCO₂, Hb, temperature — interpret in context",
      "Single-trial data; no proven mortality benefit yet",
    ],
    x: 245,
    y: 155,
    color: "hsl(195 75% 50%)",
  },
  {
    id: "sjvo2",
    name: "Jugular Bulb O₂ Saturation",
    abbreviation: "SjvO₂",
    measures: "Mixed cerebral venous O₂ saturation in the dominant jugular bulb (%).",
    spatial: "Global",
    temporal: "Continuous",
    invasiveness: "Intravascular",
    spatialScore: 4,
    temporalScore: 4,
    threshold: "Normal 55–75%; < 50 ischaemia, > 75 hyperaemia / arteriovenous shunt",
    strengths: [
      "Global cerebral O₂ extraction — complements focal PbtO₂",
      "Detects hyperaemia (high SjvO₂) and global ischaemia",
      "Can calculate AVDO₂ and CMRO₂",
    ],
    limitations: [
      "Misses focal ischaemia (a small infarct won't change global SjvO₂)",
      "Catheter drift, thrombosis, infection — frequent recalibration",
      "Choice of dominant side matters (usually right); contamination from extracerebral drainage",
      "Largely superseded by PbtO₂ + NIRS in modern units",
    ],
    x: 90,
    y: 295,
    color: "hsl(280 55% 55%)",
  },
  {
    id: "nirs",
    name: "Near-Infrared Spectroscopy",
    abbreviation: "NIRS (rSO₂)",
    measures: "Regional frontal-cortex tissue oxygen saturation (%).",
    spatial: "Regional",
    temporal: "Continuous",
    invasiveness: "Non-invasive",
    spatialScore: 2,
    temporalScore: 5,
    threshold: "Alarm if ↓ > 20% from baseline (or absolute < 50%)",
    strengths: [
      "Truly non-invasive, continuous, easy to apply (forehead pads)",
      "Works during transport, in cardiac surgery (CPB), in awake patients",
      "Useful trend monitor — pre/post intervention comparisons",
      "Cerebral autoregulation indices (COx) without intracranial probes",
    ],
    limitations: [
      "Only frontal cortex sampled — may miss MCA territory ischaemia",
      "Extracranial scalp/skull contamination of signal",
      "Absolute values vary between manufacturers — trends matter",
      "No RCT evidence that NIRS-guided care improves outcomes",
    ],
    x: 145,
    y: 60,
    color: "hsl(150 55% 45%)",
  },
  {
    id: "cmd",
    name: "Cerebral Microdialysis",
    abbreviation: "CMD",
    measures: "Brain extracellular glucose, lactate, pyruvate, glutamate, glycerol; LPR ratio.",
    spatial: "Focal",
    temporal: "Intermittent (1h)",
    invasiveness: "Intracranial",
    spatialScore: 1,
    temporalScore: 2,
    threshold: "LPR > 25 = metabolic crisis; tissue glucose < 0.8 mmol/L",
    strengths: [
      "Only modality showing biochemistry — distinguishes ischaemia from mitochondrial dysfunction",
      "Reshaped post-TBI glucose targets (away from tight control)",
      "Detects DCI in SAH hours before clinical deterioration",
      "Endorsed by 2014 international multimodal monitoring consensus",
    ],
    limitations: [
      "Samples only ~1 cm³ — placement is everything",
      "Hourly resolution — slow compared with continuous monitors",
      "Labour-intensive (vial change + bedside analyser)",
      "Limited to specialist neuro-ICU centres",
    ],
    x: 220,
    y: 110,
    color: "hsl(40 85% 50%)",
  },
];

const PILL_COLORS: Record<string, string> = {
  "Non-invasive": "hsl(150 55% 45%)",
  "Intracranial": "hsl(15 80% 55%)",
  "Intravascular": "hsl(280 55% 55%)",
  Global: "hsl(210 65% 50%)",
  Regional: "hsl(40 75% 50%)",
  Focal: "hsl(0 70% 55%)",
  Continuous: "hsl(150 55% 45%)",
  "Intermittent (1h)": "hsl(40 75% 50%)",
  "Intermittent (manual)": "hsl(0 70% 55%)",
};

const Pill = ({ value }: { value: string }) => (
  <span
    className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide"
    style={{ background: `${PILL_COLORS[value]}25`, color: PILL_COLORS[value], border: `1px solid ${PILL_COLORS[value]}55` }}
  >
    {value}
  </span>
);

const MultimodalNeuromonitoringDiagram = () => {
  const [selectedId, setSelectedId] = useState<string>("icp");
  const [view, setView] = useState<"schematic" | "table" | "matrix">("schematic");

  const sel = MODALITIES.find((m) => m.id === selectedId)!;

  return (
    <DiagramFigure
      id="multimodal-neuromonitoring-diagram"
      title="Multimodal neuromonitoring"
      description="Auto-generated wrapper for the Multimodal neuromonitoring anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
          <div className="my-6 rounded-lg border border-border bg-card p-4">
        <p className="text-sm font-semibold text-foreground mb-1 text-center">
          Multimodal Neuromonitoring — Comparative Overview
        </p>
        <p className="text-xs text-muted-foreground text-center mb-3">
          ICP, CPP, PbtO₂, SjvO₂, NIRS and microdialysis side-by-side. No single modality is sufficient — modern neuro-ICUs combine 2–4.
        </p>
  
        {/* Modality selector */}
        <div className="flex flex-wrap gap-1.5 justify-center mb-3">
          {MODALITIES.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedId(m.id)}
              className="text-[11px] px-2.5 py-1 rounded border transition font-semibold"
              style={{
                background: selectedId === m.id ? m.color : "transparent",
                color: selectedId === m.id ? "white" : "hsl(var(--foreground))",
                borderColor: selectedId === m.id ? m.color : "hsl(var(--border))",
              }}
            >
              {m.abbreviation}
            </button>
          ))}
        </div>
  
        {/* View toggle */}
        <div className="flex justify-center gap-1 mb-4">
          {(["schematic", "matrix", "table"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`text-[10px] px-2 py-1 rounded border transition uppercase tracking-wide ${
                view === v
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card hover:bg-muted/50 text-muted-foreground"
              }`}
            >
              {v === "schematic" ? "Anatomical" : v === "matrix" ? "Resolution matrix" : "Comparison table"}
            </button>
          ))}
        </div>
  
        {/* === SCHEMATIC VIEW === */}
        {view === "schematic" && (
          <div className="grid lg:grid-cols-[1fr_1fr] gap-4 items-start">
            <div>
              <svg viewBox="0 0 360 360" className="w-full h-auto max-w-[400px] mx-auto" role="img" aria-label="Schematic head with monitoring modalities">
                {/* Head outline (sagittal/oblique) */}
                <path
                  d="M 180 35 Q 95 35, 75 130 Q 65 200, 85 260 Q 100 305, 140 320 L 180 322 L 220 320 Q 260 305, 275 260 Q 295 200, 285 130 Q 265 35, 180 35 Z"
                  fill="hsl(var(--muted))"
                  opacity="0.4"
                  stroke="hsl(var(--foreground))"
                  strokeWidth="1"
                />
                {/* Brain */}
                <path
                  d="M 180 55 Q 110 55, 95 135 Q 88 195, 105 245 Q 120 280, 155 290 L 205 290 Q 240 280, 255 245 Q 272 195, 265 135 Q 250 55, 180 55 Z"
                  fill="hsl(var(--anatomy))"
                  opacity="0.18"
                  stroke="hsl(var(--anatomy))"
                  strokeWidth="0.75"
                />
                {/* Sulci */}
                <g stroke="hsl(var(--anatomy))" strokeWidth="0.5" fill="none" opacity="0.45">
                  <path d="M 110 130 Q 130 125, 150 135" />
                  <path d="M 105 175 Q 135 170, 160 180" />
                  <path d="M 110 220 Q 140 215, 165 225" />
                  <path d="M 250 130 Q 230 125, 210 135" />
                  <path d="M 255 175 Q 225 170, 200 180" />
                  <path d="M 250 220 Q 220 215, 195 225" />
                </g>
                {/* Ventricles */}
                <ellipse cx="160" cy="170" rx="10" ry="22" fill="hsl(var(--background))" stroke="hsl(var(--anatomy))" strokeWidth="0.5" opacity="0.85" />
                <ellipse cx="200" cy="170" rx="10" ry="22" fill="hsl(var(--background))" stroke="hsl(var(--anatomy))" strokeWidth="0.5" opacity="0.85" />
                {/* IJV / jugular bulb hint at base */}
                <path d="M 130 290 Q 125 310, 120 325" stroke="hsl(280 55% 55%)" strokeWidth="3" fill="none" opacity="0.5" />
                <text x="100" y="335" fontSize="7" fill="hsl(var(--muted-foreground))" fontStyle="italic">
                  IJV
                </text>
  
                {/* Modality markers */}
                {MODALITIES.map((m) => {
                  const isSel = m.id === selectedId;
                  return (
                    <g key={m.id} style={{ cursor: "pointer" }} onClick={() => setSelectedId(m.id)}>
                      {/* Probe representation */}
                      {m.id === "nirs" && (
                        <rect x={m.x - 22} y={m.y - 8} width="44" height="14" rx="3" fill={m.color} opacity={isSel ? 0.9 : 0.5} stroke={m.color} strokeWidth="1" />
                      )}
                      {(m.id === "icp" || m.id === "pbto2" || m.id === "cmd") && (
                        <>
                          <rect x={m.x - 4} y={m.y - 35} width="8" height="35" fill={m.color} opacity={isSel ? 0.9 : 0.55} />
                          <line x1={m.x} y1={m.y} x2={m.x} y2={m.y + (m.id === "icp" ? 70 : m.id === "pbto2" ? 60 : 75)} stroke={m.color} strokeWidth="2" opacity={isSel ? 0.9 : 0.55} />
                        </>
                      )}
                      {m.id === "sjvo2" && (
                        <circle cx={m.x} cy={m.y} r="6" fill={m.color} opacity={isSel ? 0.9 : 0.55} stroke={m.color} strokeWidth="1.5" />
                      )}
                      {m.id === "cpp" && (
                        <g opacity={isSel ? 0.9 : 0.5}>
                          <circle cx={m.x} cy={m.y} r="14" fill="none" stroke={m.color} strokeWidth="1.5" strokeDasharray="3 2" />
                        </g>
                      )}
                      {/* Anchor label */}
                      <circle cx={m.x} cy={m.y} r={isSel ? 7 : 4} fill={m.color} stroke="hsl(var(--background))" strokeWidth="1.5" />
                      <text x={m.x} y={m.y + 2} textAnchor="middle" fontSize="6" fontWeight="700" fill="hsl(var(--background))" pointerEvents="none">
                        {isSel ? "●" : ""}
                      </text>
                    </g>
                  );
                })}
  
                {/* Labels with leader lines for selected */}
                {(() => {
                  // Label positions on the side
                  const labelMap: Record<string, { lx: number; ly: number; anchor: "start" | "end" }> = {
                    nirs: { lx: 30, ly: 50, anchor: "start" },
                    icp: { lx: 330, ly: 60, anchor: "end" },
                    cmd: { lx: 330, ly: 100, anchor: "end" },
                    cpp: { lx: 30, ly: 145, anchor: "start" },
                    pbto2: { lx: 330, ly: 155, anchor: "end" },
                    sjvo2: { lx: 30, ly: 295, anchor: "start" },
                  };
                  return MODALITIES.map((m) => {
                    const lp = labelMap[m.id];
                    const isSel = m.id === selectedId;
                    return (
                      <g key={`lbl-${m.id}`} opacity={isSel ? 1 : 0.55}>
                        <line x1={m.x} y1={m.y} x2={lp.lx + (lp.anchor === "start" ? 30 : -30)} y2={lp.ly + 4} stroke={m.color} strokeWidth={isSel ? 1 : 0.5} />
                        <text x={lp.lx} y={lp.ly} textAnchor={lp.anchor} fontSize="9" fontWeight="700" fill={m.color}>
                          {m.abbreviation}
                        </text>
                      </g>
                    );
                  });
                })()}
              </svg>
              <p className="text-[10px] text-muted-foreground text-center italic mt-1">
                Click a probe or chip to inspect
              </p>
            </div>
  
            {/* Detail panel */}
            <ModalityDetail m={sel} />
          </div>
        )}
  
        {/* === MATRIX VIEW === */}
        {view === "matrix" && (
          <div className="grid lg:grid-cols-[1fr_1fr] gap-4 items-start">
            <div>
              <svg viewBox="0 0 360 320" className="w-full h-auto max-w-[400px] mx-auto" role="img" aria-label="Spatial vs temporal resolution matrix">
                {/* Axes */}
                <line x1="50" y1="280" x2="340" y2="280" stroke="hsl(var(--foreground))" strokeWidth="1" />
                <line x1="50" y1="280" x2="50" y2="20" stroke="hsl(var(--foreground))" strokeWidth="1" />
  
                {/* Grid */}
                {[1, 2, 3, 4, 5].map((i) => (
                  <g key={`grid-${i}`} opacity="0.2">
                    <line x1={50 + i * 58} y1="20" x2={50 + i * 58} y2="280" stroke="hsl(var(--foreground))" strokeWidth="0.5" strokeDasharray="2 3" />
                    <line x1="50" y1={280 - i * 52} x2="340" y2={280 - i * 52} stroke="hsl(var(--foreground))" strokeWidth="0.5" strokeDasharray="2 3" />
                  </g>
                ))}
  
                {/* Axis labels */}
                <text x="195" y="308" textAnchor="middle" fontSize="10" fontWeight="700" fill="hsl(var(--foreground))">
                  Spatial coverage →
                </text>
                <text x="50" y="298" textAnchor="middle" fontSize="8" fill="hsl(var(--muted-foreground))">
                  Focal
                </text>
                <text x="340" y="298" textAnchor="middle" fontSize="8" fill="hsl(var(--muted-foreground))">
                  Whole brain
                </text>
  
                <text x="15" y="150" textAnchor="middle" fontSize="10" fontWeight="700" fill="hsl(var(--foreground))" transform="rotate(-90 15 150)">
                  Temporal resolution →
                </text>
                <text x="42" y="285" textAnchor="end" fontSize="8" fill="hsl(var(--muted-foreground))">
                  Hourly
                </text>
                <text x="42" y="28" textAnchor="end" fontSize="8" fill="hsl(var(--muted-foreground))">
                  Real-time
                </text>
  
                {/* Modality dots */}
                {MODALITIES.map((m) => {
                  const cx = 50 + m.spatialScore * 58;
                  const cy = 280 - m.temporalScore * 52;
                  const isSel = m.id === selectedId;
                  return (
                        <g key={`dot-${m.id}`} style={{ cursor: "pointer" }} onClick={() => setSelectedId(m.id)}>
                      <circle cx={cx} cy={cy} r={isSel ? 14 : 10} fill={m.color} opacity={isSel ? 0.95 : 0.6} stroke={m.color} strokeWidth={isSel ? 2 : 1} />
                      <text x={cx} y={cy + 3} textAnchor="middle" fontSize={isSel ? 9 : 8} fontWeight="700" fill="hsl(var(--background))" pointerEvents="none">
                        {m.abbreviation.replace(" (rSO₂)", "")}
                      </text>
                    </g>
    );
                })}
  
                {/* Quadrant hints */}
                <text x="100" y="55" fontSize="7" fill="hsl(var(--muted-foreground))" fontStyle="italic" opacity="0.7">
                  Focal · fast
                </text>
                <text x="290" y="55" fontSize="7" fill="hsl(var(--muted-foreground))" fontStyle="italic" opacity="0.7">
                  Global · fast
                </text>
                <text x="100" y="270" fontSize="7" fill="hsl(var(--muted-foreground))" fontStyle="italic" opacity="0.7">
                  Focal · slow
                </text>
                <text x="290" y="270" fontSize="7" fill="hsl(var(--muted-foreground))" fontStyle="italic" opacity="0.7">
                  Global · slow
                </text>
              </svg>
              <p className="text-[10px] text-muted-foreground text-center italic mt-1">
                No modality covers everything — combinations are complementary
              </p>
            </div>
            <ModalityDetail m={sel} />
          </div>
        )}
  
        {/* === TABLE VIEW === */}
        {view === "table" && (
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-2 px-2 text-foreground font-bold">Modality</th>
                  <th className="text-left py-2 px-2 text-foreground font-bold">Measures</th>
                  <th className="text-left py-2 px-2 text-foreground font-bold">Spatial</th>
                  <th className="text-left py-2 px-2 text-foreground font-bold">Temporal</th>
                  <th className="text-left py-2 px-2 text-foreground font-bold">Invasive</th>
                  <th className="text-left py-2 px-2 text-foreground font-bold">Threshold</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {MODALITIES.map((m) => (
                  <tr
                    key={m.id}
                    className={`border-b border-border cursor-pointer hover:bg-muted/30 ${selectedId === m.id ? "bg-primary/5" : ""}`}
                    onClick={() => setSelectedId(m.id)}
                  >
                    <td className="py-2 px-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: m.color }} />
                        <span className="font-bold text-foreground">{m.abbreviation}</span>
                      </div>
                    </td>
                    <td className="py-2 px-2">{m.measures}</td>
                    <td className="py-2 px-2"><Pill value={m.spatial} /></td>
                    <td className="py-2 px-2"><Pill value={m.temporal} /></td>
                    <td className="py-2 px-2"><Pill value={m.invasiveness} /></td>
                    <td className="py-2 px-2 text-[11px]">{m.threshold}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-3">
              <ModalityDetail m={sel} />
            </div>
          </div>
        )}
  
        {/* Bottom synthesis */}
        <div className="mt-3 p-2.5 rounded bg-secondary/40 border border-border">
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            <strong className="text-foreground">2014 international consensus (Le Roux et al, Neurocrit Care):</strong> multimodal monitoring is recommended for severe TBI / poor-grade SAH. Typical bundle = ICP + CPP (always) + PbtO₂ ± CMD via a triple-lumen bolt, ± NIRS for trends. Each modality answers a different question — pressure, flow surrogate, oxygenation, biochemistry. Use them <em>together</em>: a normal ICP doesn't exclude focal ischaemia; a high LPR with normal pyruvate won't respond to ↑ CPP; NIRS is best as a trend monitor; SjvO₂ now largely replaced by PbtO₂ + NIRS.
          </p>
        </div>
      </div>
    </DiagramFigure>
  );
};

const ModalityDetail = ({ m }: { m: Modality }) => (
      <div className="rounded-lg border-2 p-3" style={{ borderColor: `${m.color}55`, background: `${m.color}0d` }}>
    <div className="flex items-baseline gap-2 flex-wrap mb-2">
      <span className="text-base font-bold text-foreground">{m.abbreviation}</span>
      <span className="text-xs text-muted-foreground">— {m.name}</span>
    </div>
    <div className="flex flex-wrap gap-1.5 mb-2">
      <Pill value={m.spatial} />
      <Pill value={m.temporal} />
      <Pill value={m.invasiveness} />
    </div>
    <p className="text-xs text-foreground leading-relaxed mb-2">
      <strong>Measures:</strong> {m.measures}
    </p>
    <p className="text-xs text-foreground mb-2">
      <strong>Threshold:</strong> <span className="text-muted-foreground">{m.threshold}</span>
    </p>
    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-2">
      <div>
        <p className="text-[11px] font-bold text-foreground uppercase tracking-wide mb-1">✓ Strengths</p>
        <ul className="text-[11px] text-muted-foreground space-y-1 list-disc list-inside leading-snug">
          {m.strengths.map((s, i) => <li key={i}>{s}</li>)}
        </ul>
      </div>
      <div>
        <p className="text-[11px] font-bold text-foreground uppercase tracking-wide mb-1">✗ Limitations</p>
        <ul className="text-[11px] text-muted-foreground space-y-1 list-disc list-inside leading-snug">
          {m.limitations.map((l, i) => <li key={i}>{l}</li>)}
        </ul>
      </div>
    </div>
  </div>
  );

export default MultimodalNeuromonitoringDiagram;

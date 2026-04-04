import { useState } from "react";

type View = "overview" | "co2" | "o2" | "ph";

const ControlOfBreathingDiagram = () => {
  const [view, setView] = useState<View>("overview");
  const [paCO2, setPaCO2] = useState(5.3); // kPa
  const [paO2, setPaO2] = useState(13.3); // kPa
  const [pH, setPH] = useState(7.40);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Control of Breathing & Chemoreceptors</h3>

      <div className="flex flex-wrap gap-2">
        {([
          { key: "overview" as View, label: "Neural Overview" },
          { key: "co2" as View, label: "CO₂ Response" },
          { key: "o2" as View, label: "O₂ Response" },
          { key: "ph" as View, label: "pH Response" },
        ]).map(v => (
          <button key={v.key} onClick={() => setView(v.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              view === v.key ? "bg-primary text-primary-foreground shadow-sm" : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
            }`}>
            {v.label}
          </button>
        ))}
      </div>

      {view === "overview" && <OverviewDiagram />}
      {view === "co2" && <CO2ResponseCurve paCO2={paCO2} setPaCO2={setPaCO2} paO2={paO2} />}
      {view === "o2" && <O2ResponseCurve paO2={paO2} setPaO2={setPaO2} paCO2={paCO2} />}
      {view === "ph" && <PHResponseCurve pH={pH} setPH={setPH} />}
    </div>
  );
};

/* ─── Neural Overview ─── */
function OverviewDiagram() {
  const [selected, setSelected] = useState<string | null>(null);

  const structures: Record<string, { description: string }> = {
    "Medullary Centre": { description: "DRG (nucleus tractus solitarius): primary inspiratory rhythm. VRG (nucleus ambiguus/retroambiguus): expiratory neurons, active in forced expiration. Pre-Bötzinger complex: pacemaker neurons generating respiratory rhythm." },
    "Pontine Centres": { description: "Pneumotaxic centre (nucleus parabrachialis): limits inspiration, ↑ RR. Apneustic centre: promotes prolonged inspiration. Pneumotaxic overrides apneustic — vagotomy + pneumotaxic lesion → apneusis." },
    "Central Chemoreceptors": { description: "Located on ventral medullary surface. Respond to CSF [H⁺] (which reflects PaCO₂ via CO₂ diffusion across BBB). NOT directly stimulated by CO₂. Account for ~80% of chemical drive. Slow response (minutes) due to BBB equilibration." },
    "Peripheral Chemoreceptors": { description: "Carotid bodies (CN IX → NTS): respond to ↓PaO₂, ↑PaCO₂, ↓pH, ↓BP. Main O₂ sensors. Fast response (~seconds). Aortic bodies (CN X): less important in humans. Carotid body has highest blood flow per gram of any organ." },
    "Higher Centres": { description: "Cortex: voluntary control (speaking, breath-holding). Hypothalamus: temperature, emotion. Limbic system: anxiety, pain responses. Can override brainstem temporarily but medullary drive ultimately prevails." },
    "Lung Receptors": { description: "Slowly adapting stretch receptors (Hering-Breuer reflex): inhibit inspiration at high lung volumes. Rapidly adapting (irritant) receptors: cough, bronchoconstriction. J receptors (juxtapulmonary capillary): stimulated by pulmonary oedema, PE → rapid shallow breathing." },
  };

  return (
    <div className="space-y-4">
      <svg viewBox="0 0 400 280" className="w-full">
        {/* Brain stem */}
        <rect x="130" y="10" width="140" height="90" rx="10"
          fill="hsl(210, 70%, 55%)" opacity={0.1} stroke="hsl(210, 70%, 55%)" strokeWidth="1.5" />
        <text x="200" y="28" textAnchor="middle" className="text-[9px] fill-foreground font-semibold">Brainstem</text>

        {/* Pontine */}
        <rect x="140" y="33" width="55" height="25" rx="4"
          fill={selected === "Pontine Centres" ? "hsl(142, 60%, 45%, 0.2)" : "hsl(var(--muted))"}
          stroke="hsl(142, 60%, 45%)" strokeWidth={selected === "Pontine Centres" ? 2 : 1}
          className="cursor-pointer" onClick={() => setSelected(selected === "Pontine Centres" ? null : "Pontine Centres")} />
        <text x="167" y="49" textAnchor="middle" className="text-[7px] fill-foreground cursor-pointer"
          onClick={() => setSelected(selected === "Pontine Centres" ? null : "Pontine Centres")}>Pons</text>

        {/* Medullary */}
        <rect x="205" y="33" width="55" height="25" rx="4"
          fill={selected === "Medullary Centre" ? "hsl(210, 70%, 55%, 0.2)" : "hsl(var(--muted))"}
          stroke="hsl(210, 70%, 55%)" strokeWidth={selected === "Medullary Centre" ? 2 : 1}
          className="cursor-pointer" onClick={() => setSelected(selected === "Medullary Centre" ? null : "Medullary Centre")} />
        <text x="232" y="49" textAnchor="middle" className="text-[7px] fill-foreground cursor-pointer"
          onClick={() => setSelected(selected === "Medullary Centre" ? null : "Medullary Centre")}>Medulla</text>

        {/* Central chemoreceptors */}
        <rect x="140" y="65" width="120" height="25" rx="4"
          fill={selected === "Central Chemoreceptors" ? "hsl(35, 80%, 50%, 0.2)" : "hsl(var(--muted))"}
          stroke="hsl(35, 80%, 50%)" strokeWidth={selected === "Central Chemoreceptors" ? 2 : 1}
          className="cursor-pointer" onClick={() => setSelected(selected === "Central Chemoreceptors" ? null : "Central Chemoreceptors")} />
        <text x="200" y="81" textAnchor="middle" className="text-[7px] fill-foreground cursor-pointer"
          onClick={() => setSelected(selected === "Central Chemoreceptors" ? null : "Central Chemoreceptors")}>Central Chemoreceptors</text>

        {/* Higher centres */}
        <rect x="20" y="15" width="95" height="30" rx="6"
          fill={selected === "Higher Centres" ? "hsl(270, 50%, 55%, 0.15)" : "hsl(var(--muted))"}
          stroke="hsl(270, 50%, 55%)" strokeWidth={selected === "Higher Centres" ? 2 : 1}
          className="cursor-pointer" onClick={() => setSelected(selected === "Higher Centres" ? null : "Higher Centres")} />
        <text x="67" y="34" textAnchor="middle" className="text-[8px] fill-foreground cursor-pointer"
          onClick={() => setSelected(selected === "Higher Centres" ? null : "Higher Centres")}>Higher Centres</text>
        <line x1="115" y1="30" x2="130" y2="45" stroke="hsl(var(--border))" strokeWidth="1" markerEnd="url(#cobArr)" />

        {/* Peripheral chemoreceptors */}
        <ellipse cx="80" cy="140" rx="60" ry="22"
          fill={selected === "Peripheral Chemoreceptors" ? "hsl(0, 70%, 55%, 0.15)" : "hsl(var(--muted), 0.3)"}
          stroke="hsl(0, 70%, 55%)" strokeWidth={selected === "Peripheral Chemoreceptors" ? 2 : 1}
          className="cursor-pointer" onClick={() => setSelected(selected === "Peripheral Chemoreceptors" ? null : "Peripheral Chemoreceptors")} />
        <text x="80" y="137" textAnchor="middle" className="text-[7px] fill-foreground font-medium cursor-pointer"
          onClick={() => setSelected(selected === "Peripheral Chemoreceptors" ? null : "Peripheral Chemoreceptors")}>Peripheral Chemo</text>
        <text x="80" y="148" textAnchor="middle" className="text-[6px] fill-muted-foreground">(Carotid + Aortic bodies)</text>
        {/* CN IX/X to medulla */}
        <line x1="120" y1="125" x2="180" y2="90" stroke="hsl(0, 70%, 55%)" strokeWidth="1.5" markerEnd="url(#cobArr)" />
        <text x="140" y="102" className="text-[6px] fill-muted-foreground">CN IX/X</text>

        {/* Lung receptors */}
        <ellipse cx="320" cy="160" rx="60" ry="30"
          fill={selected === "Lung Receptors" ? "hsl(210, 70%, 55%, 0.15)" : "hsl(var(--muted), 0.3)"}
          stroke="hsl(210, 70%, 55%)" strokeWidth={selected === "Lung Receptors" ? 2 : 1}
          className="cursor-pointer" onClick={() => setSelected(selected === "Lung Receptors" ? null : "Lung Receptors")} />
        <text x="320" y="155" textAnchor="middle" className="text-[7px] fill-foreground font-medium cursor-pointer"
          onClick={() => setSelected(selected === "Lung Receptors" ? null : "Lung Receptors")}>Lung Receptors</text>
        <text x="320" y="166" textAnchor="middle" className="text-[6px] fill-muted-foreground">SAR / RAR / J</text>
        {/* Vagus to medulla */}
        <line x1="280" y1="138" x2="240" y2="90" stroke="hsl(210, 70%, 55%)" strokeWidth="1.5" markerEnd="url(#cobArr)" />
        <text x="268" y="108" className="text-[6px] fill-muted-foreground">CN X</text>

        {/* Effectors */}
        <rect x="140" y="210" width="120" height="30" rx="6"
          fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="1" />
        <text x="200" y="228" textAnchor="middle" className="text-[8px] fill-foreground font-medium">Respiratory Muscles</text>
        <text x="200" y="238" textAnchor="middle" className="text-[6px] fill-muted-foreground">Diaphragm (C3-5) + Intercostals</text>
        {/* Motor output */}
        <line x1="200" y1="100" x2="200" y2="210" stroke="hsl(var(--border))" strokeWidth="1.5" markerEnd="url(#cobArr)" />
        <text x="208" y="160" className="text-[6px] fill-muted-foreground">Phrenic</text>
        <text x="208" y="170" className="text-[6px] fill-muted-foreground">C3,4,5</text>

        {/* Stimuli */}
        <text x="80" y="185" textAnchor="middle" className="text-[7px] fill-muted-foreground">↓PaO₂  ↑PaCO₂  ↓pH</text>

        <defs>
          <marker id="cobArr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6" fill="hsl(var(--muted-foreground))" />
          </marker>
        </defs>
      </svg>

      {/* Detail panel */}
      {selected && (
        <div className="bg-secondary/30 rounded-lg p-3 border border-border">
          <p className="text-sm font-semibold text-foreground">{selected}</p>
          <p className="text-xs text-muted-foreground mt-1">{structures[selected].description}</p>
        </div>
      )}
      {!selected && <p className="text-xs text-muted-foreground text-center">Tap a structure to see details</p>}
    </div>
  );
}

/* ─── CO₂ Response Curve ─── */
function CO2ResponseCurve({ paCO2, setPaCO2, paO2 }: { paCO2: number; setPaCO2: (v: number) => void; paO2: number }) {
  const W = 380, H = 200, PL = 50, PR = 10, PT = 10, PB = 25;
  const plotW = W - PL - PR; const plotH = H - PT - PB;
  const pMin = 2.7, pMax = 10.7, veMax = 50;
  const toX = (p: number) => PL + ((p - pMin) / (pMax - pMin)) * plotW;
  const toY = (v: number) => PT + plotH - (v / veMax) * plotH;

  const normalSlope = 15; // L/min/kPa (was ~2 L/min/mmHg × 7.5)
  const hypoxicSlope = 26; // enhanced by hypoxia
  const threshold = 4.8; // kPa apnoeic threshold (was 36 mmHg)

  const calcVE = (co2: number, slope: number) => Math.max(slope * (co2 - threshold), 0);
  const currentVE = calcVE(paCO2, paO2 < 8 ? hypoxicSlope : normalSlope);

  return (
    <div className="space-y-4">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
        <rect x={PL} y={PT} width={plotW} height={plotH} fill="hsl(var(--muted))" opacity={0.06} />
        <line x1={PL} y1={PT + plotH} x2={PL + plotW} y2={PT + plotH} stroke="hsl(var(--border))" strokeWidth="1.5" />
        <line x1={PL} y1={PT} x2={PL} y2={PT + plotH} stroke="hsl(var(--border))" strokeWidth="1.5" />
        <text x={W / 2} y={H - 2} textAnchor="middle" className="text-[9px] fill-muted-foreground">PaCO₂ (kPa)</text>
        <text x="8" y={PT + plotH / 2} textAnchor="middle" className="text-[9px] fill-muted-foreground" transform={`rotate(-90,8,${PT + plotH / 2})`}>Minute Ventilation (L/min)</text>

        {/* Ticks */}
        {[3, 4, 5, 6, 7, 8, 9, 10].map(p => (
          <text key={p} x={toX(p)} y={PT + plotH + 12} textAnchor="middle" className="text-[7px] fill-muted-foreground">{p}</text>
        ))}
        {[0, 10, 20, 30, 40, 50].map(v => (
          <text key={v} x={PL - 4} y={toY(v) + 3} textAnchor="end" className="text-[7px] fill-muted-foreground">{v}</text>
        ))}

        {/* Normal curve */}
        <path d={Array.from({ length: 80 }, (_, i) => {
          const co2 = pMin + (i / 79) * (pMax - pMin);
          return `${i === 0 ? "M" : "L"} ${toX(co2).toFixed(1)},${toY(Math.min(calcVE(co2, normalSlope), veMax)).toFixed(1)}`;
        }).join(" ")} fill="none" stroke="hsl(210, 70%, 55%)" strokeWidth="2.5" />

        {/* Hypoxic curve */}
        <path d={Array.from({ length: 80 }, (_, i) => {
          const co2 = pMin + (i / 79) * (pMax - pMin);
          return `${i === 0 ? "M" : "L"} ${toX(co2).toFixed(1)},${toY(Math.min(calcVE(co2, hypoxicSlope), veMax)).toFixed(1)}`;
        }).join(" ")} fill="none" stroke="hsl(0, 70%, 55%)" strokeWidth="2" strokeDasharray="6,3" />

        {/* Anaesthesia/opioid curve */}
        <path d={Array.from({ length: 80 }, (_, i) => {
          const co2 = pMin + (i / 79) * (pMax - pMin);
          const ve = Math.max(7.5 * (co2 - 5.9), 0);
          return `${i === 0 ? "M" : "L"} ${toX(co2).toFixed(1)},${toY(Math.min(ve, veMax)).toFixed(1)}`;
        }).join(" ")} fill="none" stroke="hsl(142, 60%, 45%)" strokeWidth="2" strokeDasharray="3,4" />

        {/* Apnoeic threshold */}
        <line x1={toX(threshold)} y1={PT} x2={toX(threshold)} y2={PT + plotH}
          stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="4,3" />
        <text x={toX(threshold) + 3} y={PT + 10} className="text-[7px] fill-muted-foreground">Apnoeic</text>
        <text x={toX(threshold) + 3} y={PT + 19} className="text-[7px] fill-muted-foreground">threshold</text>

        {/* Current point */}
        <circle cx={toX(paCO2)} cy={toY(Math.min(currentVE, veMax))} r="5"
          fill="hsl(210, 70%, 55%)" stroke="white" strokeWidth="1.5" />

        {/* Legend */}
        <line x1={PL + 5} y1={PT + 8} x2={PL + 25} y2={PT + 8} stroke="hsl(210, 70%, 55%)" strokeWidth="2.5" />
        <text x={PL + 28} y={PT + 11} className="text-[7px] fill-muted-foreground">Normal</text>
        <line x1={PL + 5} y1={PT + 18} x2={PL + 25} y2={PT + 18} stroke="hsl(0, 70%, 55%)" strokeWidth="2" strokeDasharray="4,2" />
        <text x={PL + 28} y={PT + 21} className="text-[7px] fill-muted-foreground">+ Hypoxia</text>
        <line x1={PL + 5} y1={PT + 28} x2={PL + 25} y2={PT + 28} stroke="hsl(142, 60%, 45%)" strokeWidth="2" strokeDasharray="3,3" />
        <text x={PL + 28} y={PT + 31} className="text-[7px] fill-muted-foreground">+ Opioids/Anaesthesia</text>
      </svg>

      <Slider label="PaCO₂" value={paCO2} min={2.7} max={10.7} unit="kPa" onChange={setPaCO2} />

      <div className="grid grid-cols-2 gap-2">
        <Metric label="Minute Ventilation" value={`${currentVE.toFixed(1)}`} unit="L/min" />
        <Metric label="Response Slope" value={`${(paO2 < 8 ? hypoxicSlope : normalSlope).toFixed(0)}`} unit="L/min/kPa" />
      </div>

      <div className="bg-secondary/30 rounded-lg p-3 border border-border">
        <p className="text-xs font-medium text-foreground">CO₂ Response Key Points</p>
        <ul className="text-xs text-muted-foreground mt-1 space-y-1 list-disc list-inside">
          <li>CO₂ is the primary driver of ventilation via central chemoreceptors (80%)</li>
          <li>Linear response: ~15 L/min increase in VE per 1 kPa rise in PaCO₂</li>
          <li>Hypoxia left-shifts and steepens the curve (synergistic effect)</li>
          <li>Opioids, anaesthetics, sleep: right-shift and flatten (↓ sensitivity)</li>
          <li>Apnoeic threshold ~4.8 kPa — below this, apnoea occurs (important post-hyperventilation)</li>
        </ul>
      </div>
    </div>
  );
}

/* ─── O₂ Response Curve ─── */
function O2ResponseCurve({ paO2, setPaO2, paCO2 }: { paO2: number; setPaO2: (v: number) => void; paCO2: number }) {
  const W = 380, H = 200, PL = 50, PR = 10, PT = 10, PB = 25;
  const plotW = W - PL - PR; const plotH = H - PT - PB;
  const veMax = 40;
  const pMin = 2.7, pMaxO2 = 16;
  const toX = (p: number) => PL + ((p - pMin) / (pMaxO2 - pMin)) * plotW;
  const toY = (v: number) => PT + plotH - (v / veMax) * plotH;

  const calcVE = (o2: number, co2: number) => {
    const base = 5 + (co2 - 4.8) * 11;
    if (o2 > 13.3) return Math.max(base, 0);
    const hypoxicDrive = o2 < 8 ? 30 * Math.exp(-(o2 - 4) / 2) : 2 * Math.exp(-(o2 - 8) / 4);
    return Math.max(base + hypoxicDrive, 0);
  };

  const currentVE = calcVE(paO2, paCO2);

  return (
    <div className="space-y-4">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
        <rect x={PL} y={PT} width={plotW} height={plotH} fill="hsl(var(--muted))" opacity={0.06} />
        <line x1={PL} y1={PT + plotH} x2={PL + plotW} y2={PT + plotH} stroke="hsl(var(--border))" strokeWidth="1.5" />
        <line x1={PL} y1={PT} x2={PL} y2={PT + plotH} stroke="hsl(var(--border))" strokeWidth="1.5" />
        <text x={W / 2} y={H - 2} textAnchor="middle" className="text-[9px] fill-muted-foreground">PaO₂ (kPa)</text>
        <text x="8" y={PT + plotH / 2} textAnchor="middle" className="text-[9px] fill-muted-foreground" transform={`rotate(-90,8,${PT + plotH / 2})`}>Minute Ventilation (L/min)</text>

        {[3, 5, 8, 10, 13, 16].map(p => (
          <text key={p} x={toX(p)} y={PT + plotH + 12} textAnchor="middle" className="text-[7px] fill-muted-foreground">{p}</text>
        ))}
        {[0, 10, 20, 30, 40].map(v => (
          <text key={v} x={PL - 4} y={toY(v) + 3} textAnchor="end" className="text-[7px] fill-muted-foreground">{v}</text>
        ))}

        {/* Normal CO2 curve */}
        <path d={Array.from({ length: 100 }, (_, i) => {
          const o2 = pMin + (i / 99) * (pMaxO2 - pMin);
          return `${i === 0 ? "M" : "L"} ${toX(o2).toFixed(1)},${toY(Math.min(calcVE(o2, 5.3), veMax)).toFixed(1)}`;
        }).join(" ")} fill="none" stroke="hsl(210, 70%, 55%)" strokeWidth="2.5" />

        {/* High CO2 */}
        <path d={Array.from({ length: 100 }, (_, i) => {
          const o2 = pMin + (i / 99) * (pMaxO2 - pMin);
          return `${i === 0 ? "M" : "L"} ${toX(o2).toFixed(1)},${toY(Math.min(calcVE(o2, 6.7), veMax)).toFixed(1)}`;
        }).join(" ")} fill="none" stroke="hsl(0, 70%, 55%)" strokeWidth="2" strokeDasharray="6,3" />

        {/* Danger zone */}
        <rect x={PL} y={PT} width={toX(8) - PL} height={plotH} fill="hsl(0, 70%, 55%)" opacity={0.04} />
        <line x1={toX(8)} y1={PT} x2={toX(8)} y2={PT + plotH} stroke="hsl(0, 70%, 55%)" strokeWidth="1" strokeDasharray="4,3" />
        <text x={toX(8) + 3} y={PT + 10} className="text-[7px] fill-destructive">PaO₂ 8 kPa</text>

        {/* Current point */}
        <circle cx={toX(paO2)} cy={toY(Math.min(currentVE, veMax))} r="5"
          fill="hsl(210, 70%, 55%)" stroke="white" strokeWidth="1.5" />

        {/* Legend */}
        <line x1={W - 120} y1={PT + 8} x2={W - 100} y2={PT + 8} stroke="hsl(210, 70%, 55%)" strokeWidth="2.5" />
        <text x={W - 97} y={PT + 11} className="text-[7px] fill-muted-foreground">PaCO₂ 5.3</text>
        <line x1={W - 120} y1={PT + 18} x2={W - 100} y2={PT + 18} stroke="hsl(0, 70%, 55%)" strokeWidth="2" strokeDasharray="4,2" />
        <text x={W - 97} y={PT + 21} className="text-[7px] fill-muted-foreground">PaCO₂ 6.7</text>
      </svg>

      <Slider label="PaO₂" value={paO2} min={2.7} max={16} unit="kPa" onChange={setPaO2} />

      <div className={`rounded-lg p-3 border ${paO2 < 8 ? "bg-destructive/5 border-destructive/30" : "bg-green-500/5 border-green-500/30"}`}>
        <p className={`text-xs font-semibold ${paO2 < 8 ? "text-destructive" : "text-green-600"}`}>
          {paO2 < 8 ? `PaO₂ ${paO2.toFixed(1)} kPa — hypoxic drive active. Steep part of curve (like ODC).` :
           `PaO₂ ${paO2.toFixed(1)} kPa — minimal hypoxic drive. O₂ response is flat above 8 kPa.`}
        </p>
      </div>

      <div className="bg-secondary/30 rounded-lg p-3 border border-border">
        <p className="text-xs font-medium text-foreground">O₂ Response Key Points</p>
        <ul className="text-xs text-muted-foreground mt-1 space-y-1 list-disc list-inside">
          <li>Hyperbolic response — minimal until PaO₂ &lt;8 kPa (steep below this)</li>
          <li>Mediated entirely by peripheral chemoreceptors (carotid bodies)</li>
          <li>Hypercapnia shifts curve upward — synergistic with CO₂ response</li>
          <li>O₂ provides 10–20% of resting drive. Primary drive only in chronic CO₂ retention</li>
          <li>100% O₂ in COPD: may abolish hypoxic drive → hypoventilation (Haldane effect also contributes)</li>
        </ul>
      </div>
    </div>
  );
}

/* ─── pH Response ─── */
function PHResponseCurve({ pH, setPH }: { pH: number; setPH: (v: number) => void }) {
  const W = 380, H = 180, PL = 50, PR = 10, PT = 10, PB = 25;
  const plotW = W - PL - PR; const plotH = H - PT - PB;
  const veMax = 35;
  const toX = (p: number) => PL + ((p - 7.0) / (7.6 - 7.0)) * plotW;
  const toY = (v: number) => PT + plotH - (v / veMax) * plotH;

  const calcVE = (ph: number) => Math.max(35 - 50 * (ph - 7.0), 2);
  const currentVE = Math.min(calcVE(pH), veMax);

  return (
    <div className="space-y-4">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
        <rect x={PL} y={PT} width={plotW} height={plotH} fill="hsl(var(--muted))" opacity={0.06} />
        <line x1={PL} y1={PT + plotH} x2={PL + plotW} y2={PT + plotH} stroke="hsl(var(--border))" strokeWidth="1.5" />
        <line x1={PL} y1={PT} x2={PL} y2={PT + plotH} stroke="hsl(var(--border))" strokeWidth="1.5" />
        <text x={W / 2} y={H - 2} textAnchor="middle" className="text-[9px] fill-muted-foreground">Arterial pH</text>
        <text x="8" y={PT + plotH / 2} textAnchor="middle" className="text-[9px] fill-muted-foreground" transform={`rotate(-90,8,${PT + plotH / 2})`}>VE (L/min)</text>

        {[7.0, 7.1, 7.2, 7.3, 7.4, 7.5, 7.6].map(p => (
          <text key={p} x={toX(p)} y={PT + plotH + 12} textAnchor="middle" className="text-[7px] fill-muted-foreground">{p.toFixed(1)}</text>
        ))}

        {/* Curve */}
        <path d={Array.from({ length: 61 }, (_, i) => {
          const ph = 7.0 + i * 0.01;
          const ve = Math.min(Math.max(calcVE(ph), 0), veMax);
          return `${i === 0 ? "M" : "L"} ${toX(ph).toFixed(1)},${toY(ve).toFixed(1)}`;
        }).join(" ")} fill="none" stroke="hsl(35, 80%, 50%)" strokeWidth="2.5" />

        {/* Normal pH zone */}
        <rect x={toX(7.35)} y={PT} width={toX(7.45) - toX(7.35)} height={plotH}
          fill="hsl(142, 60%, 45%)" opacity={0.06} />

        <circle cx={toX(pH)} cy={toY(currentVE)} r="5" fill="hsl(35, 80%, 50%)" stroke="white" strokeWidth="1.5" />
      </svg>

      <div>
        <div className="flex justify-between text-xs mb-0.5">
          <span className="text-muted-foreground">Arterial pH</span>
          <span className="font-mono font-semibold text-foreground">{pH.toFixed(2)}</span>
        </div>
        <input type="range" min={700} max={760} value={Math.round(pH * 100)}
          onChange={e => setPH(Number(e.target.value) / 100)}
          className="w-full h-2 rounded-full appearance-none bg-secondary cursor-pointer accent-primary" />
      </div>

      <div className="bg-secondary/30 rounded-lg p-3 border border-border">
        <p className="text-xs font-medium text-foreground">pH Response Key Points</p>
        <ul className="text-xs text-muted-foreground mt-1 space-y-1 list-disc list-inside">
          <li>Metabolic acidosis stimulates peripheral chemoreceptors → ↑ VE (Kussmaul breathing)</li>
          <li>Central chemoreceptors respond to CSF pH (H⁺ doesn't cross BBB well — slow compensation)</li>
          <li>Acute respiratory acidosis: rapid CSF pH change → strong central response</li>
          <li>Chronic respiratory acidosis: CSF pH normalises (HCO₃⁻ transport) → blunted central response</li>
          <li>Metabolic alkalosis: depresses ventilation but hypoxia limits the degree of hypoventilation</li>
        </ul>
      </div>
    </div>
  );
}

/* ─── Shared Components ─── */
function Slider({ label, value, min, max, unit, onChange }: {
  label: string; value: number; min: number; max: number; unit: string; onChange: (v: number) => void;
}) {
  const step = max - min < 20 ? 0.1 : 1;
  return (
    <div>
      <div className="flex justify-between text-xs mb-0.5">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-mono font-semibold text-foreground">{step < 1 ? value.toFixed(1) : value} {unit}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full appearance-none bg-secondary cursor-pointer accent-primary" />
    </div>
  );
}

function Metric({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="text-center bg-card rounded-lg p-2 border border-border">
      <p className="text-[10px] text-muted-foreground">{label}</p>
      <p className="text-base font-mono font-bold text-foreground">{value}</p>
      <p className="text-[9px] text-muted-foreground">{unit}</p>
    </div>
  );
}

export { ControlOfBreathingDiagram };

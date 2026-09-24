import { useState } from "react";
import { DiagramFigure } from "../_shared/DiagramFigure";

type PanelId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

interface PanelInfo {
  title: string;
  xAxis: string;
  yAxis: string;
  description: string;
  keyPoints: string[];
  abnormal: string;
}

const panels: Record<PanelId, PanelInfo> = {
  1: {
    title: "VO₂ & VCO₂ vs Time",
    xAxis: "Time",
    yAxis: "VO₂ / VCO₂ (ml/min)",
    description: "Shows the rate of oxygen consumption (VO₂) and carbon dioxide production (VCO₂) throughout the exercise test. VO₂ rises linearly with workload then plateaus at VO₂ peak. VCO₂ rises faster above the anaerobic threshold (AT) due to buffering of lactic acid.",
    keyPoints: [
      "VO₂ peak = highest VO₂ achieved — overall cardiorespiratory fitness",
      "AT identified where VCO₂ starts rising disproportionately to VO₂",
      "VO₂ peak <15 ml/kg/min or AT <11 ml/kg/min = high perioperative risk",
    ],
    abnormal: "Flattened VO₂ curve (early plateau) suggests cardiac limitation. Failure to reach predicted VO₂ peak in deconditioning, cardiac or pulmonary disease.",
  },
  2: {
    title: "HR & O₂ Pulse vs Time",
    xAxis: "Time",
    yAxis: "HR (bpm) / O₂ Pulse (ml/beat)",
    description: "Heart rate (HR) should rise linearly with VO₂. O₂ pulse (VO₂/HR) represents stroke volume × O₂ extraction — a surrogate for cardiac stroke volume during exercise.",
    keyPoints: [
      "O₂ pulse = VO₂ ÷ HR — reflects stroke volume × arteriovenous O₂ difference",
      "Normal: O₂ pulse rises then plateaus at peak exercise",
      "Chronotropic incompetence: HR fails to rise appropriately (β-blockers, sick sinus)",
    ],
    abnormal: "Early plateau or fall in O₂ pulse suggests cardiac output limitation (LV dysfunction, ischaemia). Exaggerated HR response with low O₂ pulse = poor stroke volume.",
  },
  3: {
    title: "VE vs Time",
    xAxis: "Time",
    yAxis: "Minute Ventilation (L/min)",
    description: "Minute ventilation (VE) increases progressively during exercise. The ventilatory reserve (MVV − VE peak) assesses whether breathing capacity limits exercise.",
    keyPoints: [
      "Breathing reserve = MVV − VE peak (normal >20% or >11 L/min)",
      "MVV estimated as FEV₁ × 40",
      "Exhausted breathing reserve suggests ventilatory (lung) limitation to exercise",
    ],
    abnormal: "Breathing reserve <15% or <11 L/min = ventilatory limitation (COPD, ILD, obesity). Normal breathing reserve with low VO₂ peak points to cardiac or deconditioning cause.",
  },
  4: {
    title: "VE/VO₂ & VE/VCO₂ vs Time",
    xAxis: "Time",
    yAxis: "Ventilatory Equivalents",
    description: "Ventilatory equivalents measure how much ventilation is needed per unit of gas exchange. VE/VCO₂ is the most clinically important — it reflects ventilatory efficiency and dead space.",
    keyPoints: [
      "VE/VCO₂ at AT: normal <34. Values >34 = poor ventilatory efficiency",
      "VE/VCO₂ >34 is an independent predictor of postoperative morbidity",
      "VE/VO₂ nadir corresponds to the anaerobic threshold (V-slope method confirmation)",
    ],
    abnormal: "Elevated VE/VCO₂ in heart failure (↑ dead space from V/Q mismatch), pulmonary hypertension, and lung disease. Strong prognostic marker in cardiac failure.",
  },
  5: {
    title: "V-Slope (VCO₂ vs VO₂)",
    xAxis: "VO₂ (ml/min)",
    yAxis: "VCO₂ (ml/min)",
    description: "The V-slope plot is the primary method for determining the anaerobic threshold (AT). Below the AT, VCO₂ rises in a 1:1 ratio with VO₂. Above AT, the slope steepens as excess CO₂ is produced from bicarbonate buffering of lactic acid.",
    keyPoints: [
      "AT = inflection point where VCO₂/VO₂ slope changes from ~1.0 to >1.0",
      "AT <11 ml/kg/min = high perioperative risk for major surgery",
      "AT 11–14 ml/kg/min = intermediate risk; >14 ml/kg/min = low risk",
    ],
    abnormal: "Very low AT (<8 ml/kg/min): severe cardiac limitation or profound deconditioning. Indeterminate AT may occur with hyperventilation or erratic breathing pattern.",
  },
  6: {
    title: "PETO₂ & PETCO₂ vs Time",
    xAxis: "Time",
    yAxis: "End-tidal Pressures (mmHg)",
    description: "End-tidal O₂ (PETO₂) and end-tidal CO₂ (PETCO₂) reflect gas exchange efficiency. PETCO₂ normally rises slightly during exercise (↑ perfusion) then falls above AT as hyperventilation begins.",
    keyPoints: [
      "At AT: PETCO₂ starts to fall and PETO₂ starts to rise (isocapnic buffering ends)",
      "Confirms AT identified on V-slope",
      "Low PETCO₂ throughout = hyperventilation or ↑ dead space",
    ],
    abnormal: "Failure of PETCO₂ to rise in early exercise suggests high dead space (pulmonary vascular disease). Persistently low PETCO₂ with high VE/VCO₂ = poor prognosis in heart failure.",
  },
  7: {
    title: "VT vs VE",
    xAxis: "VE (L/min)",
    yAxis: "Tidal Volume (L)",
    description: "Tidal volume (VT) rises with increasing ventilation until it plateaus, after which further increases in VE are achieved by increasing respiratory rate. The pattern reveals ventilatory mechanics.",
    keyPoints: [
      "Normal: VT rises to ~50–60% of VC then plateaus",
      "Further VE increase achieved by ↑ respiratory rate",
      "Helps distinguish obstructive from restrictive patterns",
    ],
    abnormal: "Early VT plateau at low volumes = restrictive disease (ILD, obesity, chest wall). In obstruction, VT may be limited by dynamic hyperinflation and expiratory flow limitation.",
  },
  8: {
    title: "RER vs Time",
    xAxis: "Time",
    yAxis: "Respiratory Exchange Ratio",
    description: "The respiratory exchange ratio (RER = VCO₂/VO₂) indicates substrate utilisation and effort adequacy. RER >1.0 indicates anaerobic metabolism. Peak RER >1.10–1.15 suggests adequate effort.",
    keyPoints: [
      "Rest: RER ~0.8 (mixed substrate). RER 0.7 = pure fat oxidation, 1.0 = pure carbohydrate",
      "RER >1.0 = anaerobic threshold exceeded (excess CO₂ from buffering)",
      "Peak RER >1.10–1.15 indicates good patient effort (validates test quality)",
    ],
    abnormal: "Peak RER <1.0 suggests submaximal effort — test may be unreliable. Very early rise in RER (before expected AT) may indicate severe deconditioning or cardiac limitation.",
  },
  9: {
    title: "SpO₂ vs Time",
    xAxis: "Time",
    yAxis: "SpO₂ (%)",
    description: "Oxygen saturation monitoring throughout the test detects exercise-induced desaturation suggesting pulmonary gas exchange impairment.",
    keyPoints: [
      "Normal: SpO₂ maintained >95% throughout exercise",
      "Desaturation >4% or SpO₂ <90% = significant",
      "Exercise-induced desaturation seen in ILD, pulmonary vascular disease, R→L shunt",
    ],
    abnormal: "Desaturation with exercise: ILD (diffusion limitation), pulmonary hypertension, intracardiac shunt (PFO/ASD with R→L flow at peak exercise). May unmask subclinical disease.",
  },
};

const panelLayout: PanelId[][] = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

// Mini SVG chart sketches for each panel
const PanelChart = ({ id }: { id: PanelId }) => {
  const w = 120, h = 70;
  const charts: Record<PanelId, React.ReactNode> = {
    1: (
      <>
        <polyline points="10,60 30,50 50,35 70,22 90,15 110,12" fill="none" stroke="hsl(210,70%,55%)" strokeWidth="2" />
        <polyline points="10,62 30,55 50,42 65,30 80,18 95,10 110,8" fill="none" stroke="hsl(0,60%,55%)" strokeWidth="2" strokeDasharray="4,2" />
        <line x1="55" y1="5" x2="55" y2="65" stroke="hsl(45,80%,50%)" strokeWidth="1" strokeDasharray="2,2" opacity="0.6" />
        <text x="56" y="10" fontSize="6" fill="hsl(45,80%,50%)">AT</text>
      </>
    ),
    2: (
      <>
        <polyline points="10,55 30,45 50,32 70,22 90,16 110,12" fill="none" stroke="hsl(0,60%,55%)" strokeWidth="2" />
        <polyline points="10,58 30,48 50,38 70,30 90,28 110,27" fill="none" stroke="hsl(142,50%,45%)" strokeWidth="2" strokeDasharray="4,2" />
      </>
    ),
    3: (
      <>
        <polyline points="10,58 25,55 40,48 55,38 70,25 85,15 100,10 110,8" fill="none" stroke="hsl(210,70%,55%)" strokeWidth="2" />
        <line x1="5" y1="20" x2="115" y2="20" stroke="hsl(0,60%,55%)" strokeWidth="1" strokeDasharray="3,2" opacity="0.5" />
        <text x="80" y="18" fontSize="6" fill="hsl(0,60%,55%)">MVV</text>
      </>
    ),
    4: (
      <>
        <polyline points="10,30 30,35 50,42 60,42 70,38 85,28 100,18 110,12" fill="none" stroke="hsl(210,70%,55%)" strokeWidth="2" />
        <polyline points="10,35 30,40 50,45 60,45 70,44 85,42 100,38 110,35" fill="none" stroke="hsl(0,60%,55%)" strokeWidth="2" strokeDasharray="4,2" />
        <line x1="60" y1="5" x2="60" y2="65" stroke="hsl(45,80%,50%)" strokeWidth="1" strokeDasharray="2,2" opacity="0.6" />
      </>
    ),
    5: (
      <>
        <polyline points="10,60 30,48 50,36 60,30 70,22 85,12 100,5" fill="none" stroke="hsl(270,50%,55%)" strokeWidth="2" />
        <line x1="10" y1="60" x2="100" y2="5" stroke="hsl(210,30%,60%)" strokeWidth="1" strokeDasharray="3,2" opacity="0.4" />
        <circle cx="50" cy="36" r="3" fill="hsl(45,80%,50%)" opacity="0.8" />
        <text x="38" y="33" fontSize="6" fill="hsl(45,80%,50%)">AT</text>
      </>
    ),
    6: (
      <>
        <polyline points="10,40 30,38 50,35 60,35 70,38 85,42 100,48 110,52" fill="none" stroke="hsl(210,70%,55%)" strokeWidth="2" />
        <polyline points="10,42 30,40 50,38 60,36 70,32 85,26 100,20 110,16" fill="none" stroke="hsl(0,60%,55%)" strokeWidth="2" strokeDasharray="4,2" />
      </>
    ),
    7: (
      <>
        <polyline points="10,58 25,42 40,32 55,26 70,24 85,23 100,23 110,23" fill="none" stroke="hsl(142,50%,45%)" strokeWidth="2" />
        <line x1="5" y1="22" x2="115" y2="22" stroke="hsl(0,60%,55%)" strokeWidth="1" strokeDasharray="3,2" opacity="0.4" />
        <text x="85" y="19" fontSize="6" fill="hsl(0,60%,55%)">~60% VC</text>
      </>
    ),
    8: (
      <>
        <polyline points="10,42 30,42 45,40 55,38 65,32 75,25 85,20 100,16 110,14" fill="none" stroke="hsl(30,70%,50%)" strokeWidth="2" />
        <line x1="5" y1="35" x2="115" y2="35" stroke="hsl(210,30%,60%)" strokeWidth="1" strokeDasharray="3,2" opacity="0.5" />
        <text x="80" y="40" fontSize="6" fill="hsl(210,30%,60%)">RER=1.0</text>
      </>
    ),
    9: (
      <>
        <polyline points="10,15 30,15 50,15 70,15 85,15 100,15 110,15" fill="none" stroke="hsl(142,50%,45%)" strokeWidth="2" />
        <polyline points="10,15 30,15 50,16 70,18 85,22 100,28 110,35" fill="none" stroke="hsl(0,60%,55%)" strokeWidth="2" strokeDasharray="4,2" />
        <text x="60" y="42" fontSize="6" fill="hsl(0,60%,55%)">abnormal</text>
      </>
    ),
  };

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto">
      <rect x="0" y="0" width={w} height={h} fill="none" />
      {charts[id]}
    </svg>
  );
};

const CPETNinePanelDiagram = () => {
  const [selected, setSelected] = useState<PanelId | null>(null);
  const info = selected ? panels[selected] : null;

  return (
    <DiagramFigure
      id="cpet-nine-panel-diagram"
      title="CPET nine panel"
      description="CPET nine panel: labelled teaching figure showing the structures, relationships and key values FRCA and FFICM candidates need to recognise and explain for this topic."
    >
              <div className="border border-border rounded-lg p-4 mb-6">
        <h3 className="text-lg font-serif font-bold text-foreground mb-1">Wasserman 9-Panel CPET Plot</h3>
        <p className="text-xs text-muted-foreground mb-4">Click any panel for a detailed explanation. The 9-panel layout is the standard format for reporting cardiopulmonary exercise tests.</p>
  
        {/* 3×3 Grid */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {panelLayout.flat().map((id) => {
            const p = panels[id];
            return (
                  <button
                key={id}
                onClick={() => setSelected(selected === id ? null : id)}
                className={`p-2 rounded-lg border text-left transition-all ${
                  selected === id
                    ? "border-primary bg-primary/10 ring-1 ring-primary/30"
                    : "border-border hover:border-muted-foreground/40"
                }`}
              >
                <p className="text-[10px] font-bold text-foreground mb-0.5 leading-tight">Panel {id}</p>
                <p className="text-[9px] text-muted-foreground leading-tight mb-1 line-clamp-1">{p.title}</p>
                <div className="bg-muted/30 rounded p-1">
                  <PanelChart id={id} />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-[7px] text-muted-foreground">{p.xAxis}</span>
                  <span className="text-[7px] text-muted-foreground">{p.yAxis.split('(')[0].trim()}</span>
                </div>
              </button>
    );
          })}
        </div>
  
        {/* Detail panel */}
        {info && selected && (
          <div className="p-4 rounded-lg border border-primary/30 bg-primary/5 transition-all">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-sm font-bold text-foreground">Panel {selected}: {info.title}</p>
                <p className="text-xs text-muted-foreground">X-axis: {info.xAxis} | Y-axis: {info.yAxis}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground text-xs px-2 py-1 rounded border border-border">✕</button>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">{info.description}</p>
            <div className="space-y-1 mb-3">
              {info.keyPoints.map((pt, i) => (
                <p key={i} className="text-xs text-muted-foreground leading-relaxed">• {pt}</p>
              ))}
            </div>
            <div className="p-2 rounded border border-destructive/20 bg-destructive/5">
              <p className="text-xs font-semibold text-destructive mb-0.5">Abnormal Findings</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{info.abnormal}</p>
            </div>
          </div>
        )}
  
        {/* Summary box */}
        <div className="mt-4 p-3 rounded-lg border border-border bg-secondary/20">
          <p className="text-xs font-semibold text-foreground mb-1">Perioperative Risk Thresholds</p>
          <div className="grid grid-cols-3 gap-2 mt-2">
            <div className="p-2 rounded border border-green-500/30 bg-green-500/10 text-center">
              <p className="text-xs font-bold text-green-500">Low Risk</p>
              <p className="text-[10px] text-muted-foreground">AT &gt;14 ml/kg/min</p>
              <p className="text-[10px] text-muted-foreground">VE/VCO₂ &lt;34</p>
            </div>
            <div className="p-2 rounded border border-yellow-500/30 bg-yellow-500/10 text-center">
              <p className="text-xs font-bold text-yellow-500">Intermediate</p>
              <p className="text-[10px] text-muted-foreground">AT 11–14 ml/kg/min</p>
              <p className="text-[10px] text-muted-foreground">VO₂ peak 15–20</p>
            </div>
            <div className="p-2 rounded border border-destructive/30 bg-destructive/10 text-center">
              <p className="text-xs font-bold text-destructive">High Risk</p>
              <p className="text-[10px] text-muted-foreground">AT &lt;11 ml/kg/min</p>
              <p className="text-[10px] text-muted-foreground">VO₂ peak &lt;15</p>
            </div>
          </div>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default CPETNinePanelDiagram;

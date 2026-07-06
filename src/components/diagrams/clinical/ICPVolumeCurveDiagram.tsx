import { useState } from "react";
import { DiagramFigure } from "./_shared/DiagramFigure";

const ICPVolumeCurveDiagram = () => {
  const [selectedZone, setSelectedZone] = useState<number | null>(null);

  const zones = [
    {
      label: "Zone 1 — High Compliance",
      volume: "Normal → +small",
      icp: "5–15 mmHg (flat)",
      color: "hsl(142 60% 45%)",
      compensation: [
        "CSF displacement into spinal theca (primary buffer)",
        "Venous blood compression out of dural sinuses",
        "↓CSF production by choroid plexus",
        "↑CSF reabsorption via arachnoid granulations",
      ],
      clinical: "Asymptomatic. Large volume can be added with minimal ICP change. Elastance is low. This is where most patients sit normally.",
      interventions: "No intervention needed. Monitor if at-risk (e.g., posterior fossa lesion).",
    },
    {
      label: "Zone 2 — Declining Compliance",
      volume: "Moderate increase",
      icp: "15–25 mmHg (rising)",
      color: "hsl(45 80% 50%)",
      compensation: [
        "Compensatory reserves exhausting",
        "CSF displacement near maximum",
        "Venous compression approaching limit",
        "Small additional volume → noticeable ICP rise",
      ],
      clinical: "Headache, nausea, drowsiness. Papilloedema may develop. Compliance falling — on the 'elbow' of the curve. Lundberg B waves may appear on ICP trace.",
      interventions: "Head-up 30° (neutral). PaCO₂ 4.0–4.5 kPa. Osmotherapy (mannitol 0.5 g/kg or hypertonic saline). Sedation with propofol ± remifentanil. Consider EVD insertion.",
    },
    {
      label: "Zone 3 — Exhausted Compensation",
      volume: "Further increase",
      icp: "25–40 mmHg (steep rise)",
      color: "hsl(25 80% 50%)",
      compensation: [
        "All compensatory mechanisms exhausted",
        "Intracranial elastance very high",
        "Tiny volume change → large ICP spike",
        "Lundberg A waves (plateau waves) — sustained ↑ICP 50–100 mmHg for 5–20 min",
      ],
      clinical: "↓GCS, Cushing's response (HTN, bradycardia, irregular breathing). CPP compromised → cerebral ischaemia. Uncal herniation risk — ipsilateral CN III palsy (fixed dilated pupil).",
      interventions: "Aggressive osmotherapy (hypertonic saline 23.4%). Thiopentone bolus for burst suppression. CSF drainage via EVD. Consider decompressive craniectomy (RESCUEicp trial). Urgent CT to identify cause.",
    },
    {
      label: "Zone 4 — Terminal",
      volume: "Critical",
      icp: ">40 mmHg (vertical)",
      color: "hsl(0 70% 50%)",
      compensation: [
        "No compensatory capacity remains",
        "Global cerebral ischaemia (CPP → 0)",
        "Tonsillar herniation through foramen magnum",
        "Brainstem compression → cardiovascular collapse",
      ],
      clinical: "Bilateral fixed dilated pupils. Loss of brainstem reflexes. Diabetes insipidus (posterior pituitary failure). Progression to brain death.",
      interventions: "Decompressive craniectomy (if not already done). Brainstem death testing if criteria met. Consider organ donation pathway.",
    },
  ];

  return (
    <DiagramFigure
      id="icp-volume-curve-diagram"
      title="ICP volume curve"
      description="Auto-generated wrapper for the ICP volume curve graphical relationship. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <div className="my-6 p-4 bg-muted/30 rounded-xl border border-border">
        <h3 className="text-lg font-bold text-foreground mb-1">Intracranial Pressure–Volume Curve (Langfitt)</h3>
        <p className="text-sm text-muted-foreground mb-4">Monro-Kellie doctrine: brain (80%) + blood (10%) + CSF (10%) = constant volume in rigid skull</p>
  
        {/* SVG Curve */}
        <svg viewBox="0 0 460 260" className="w-full h-auto mb-4">
          {/* Background zone shading */}
          <rect x="60" y="30" width="90" height="190" fill="hsl(142,60%,45%)" opacity="0.07" rx="2" />
          <rect x="150" y="30" width="90" height="190" fill="hsl(45,80%,50%)" opacity="0.07" rx="2" />
          <rect x="240" y="30" width="90" height="190" fill="hsl(25,80%,50%)" opacity="0.07" rx="2" />
          <rect x="330" y="30" width="90" height="190" fill="hsl(0,70%,50%)" opacity="0.07" rx="2" />
  
          {/* Axes */}
          <line x1="60" y1="220" x2="430" y2="220" stroke="hsl(var(--border))" strokeWidth="1.5" />
          <line x1="60" y1="30" x2="60" y2="220" stroke="hsl(var(--border))" strokeWidth="1.5" />
          <text x="245" y="252" textAnchor="middle" className="fill-muted-foreground" fontSize="11">Intracranial Volume →</text>
          <text x="18" y="125" textAnchor="middle" className="fill-muted-foreground" fontSize="11" transform="rotate(-90,18,125)">ICP (mmHg) →</text>
  
          {/* ICP scale */}
          {[0, 15, 25, 40, 60].map((v, _i) => {
            const y = 220 - (v / 60) * 185;
            return (
              <g key={v}>
                <line x1="55" y1={y} x2="60" y2={y} stroke="hsl(var(--border))" />
                <text x="50" y={y + 3} textAnchor="end" className="fill-muted-foreground" fontSize="8">{v}</text>
                {v > 0 && <line x1="60" y1={y} x2="430" y2={y} stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="3,3" />}
              </g>
            );
          })}
  
          {/* The exponential curve */}
          <path
            d="M 65,178 C 100,176 140,174 180,170 C 210,166 230,155 260,130 C 285,105 310,65 340,45 L 370,38 L 400,35"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="3"
            strokeLinecap="round"
          />
  
          {/* Zone labels at top */}
          {zones.map((z, i) => {
            const x = 105 + i * 90;
            return (
              <g key={i}>
                <text x={x} y="22" textAnchor="middle" fontSize="9" fontWeight="700" fill={z.color}>
                  {i + 1}
                </text>
                {i < 3 && <line x1={60 + (i + 1) * 90} y1="30" x2={60 + (i + 1) * 90} y2="220" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="4,3" />}
              </g>
            );
          })}
  
          {/* Compensation arrow annotation */}
          <text x="120" y="200" textAnchor="middle" className="fill-muted-foreground" fontSize="7">High compliance</text>
          <text x="120" y="209" textAnchor="middle" className="fill-muted-foreground" fontSize="7">(flat curve)</text>
  
          {/* Elbow annotation */}
          <circle cx="210" cy="168" r="12" fill="none" stroke="hsl(45,80%,50%)" strokeWidth="1.5" strokeDasharray="3,2" />
          <text x="210" y="156" textAnchor="middle" fontSize="7" fill="hsl(45,80%,50%)" fontWeight="600">Elbow</text>
  
          {/* Steep rise annotation */}
          <text x="350" y="70" textAnchor="middle" fontSize="7" fill="hsl(0,70%,50%)" fontWeight="600">Exponential</text>
          <text x="350" y="80" textAnchor="middle" fontSize="7" fill="hsl(0,70%,50%)">rise</text>
  
          {/* Clickable zone hotspots */}
          {zones.map((z, i) => (
            <rect
              key={i}
              x={60 + i * 90}
              y="30"
              width="90"
              height="190"
              fill="transparent"
              className="cursor-pointer"
              onClick={() => setSelectedZone(selectedZone === i ? null : i)}
            />
          ))}
        </svg>
  
        {/* Zone selector buttons */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          {zones.map((z, i) => (
            <button
              key={i}
              onClick={() => setSelectedZone(selectedZone === i ? null : i)}
              className={`p-2 rounded-lg border text-left transition-all text-xs ${selectedZone === i ? "border-primary bg-primary/10 ring-1 ring-primary" : "border-border hover:border-primary/50"}`}
            >
              <span className="font-bold" style={{ color: z.color }}>Zone {i + 1}</span>
              <p className="text-muted-foreground mt-0.5">ICP {z.icp}</p>
            </button>
          ))}
        </div>
  
        {/* Detail panel */}
        {selectedZone !== null && (() => {
          const z = zones[selectedZone];
          return (
                <div className="p-3 rounded-lg border border-primary/30 bg-primary/5 animate-fade-in space-y-3">
              <div>
                <p className="font-bold text-foreground text-sm" style={{ color: z.color }}>{z.label}</p>
                <p className="text-xs text-muted-foreground">ICP: {z.icp} | Volume: {z.volume}</p>
              </div>
  
              <div>
                <p className="text-xs font-semibold text-foreground mb-1">Compensatory Mechanisms</p>
                <ul className="space-y-1">
                  {z.compensation.map((c, i) => (
                    <li key={i} className="text-xs text-muted-foreground flex gap-1.5">
                      <span className="mt-0.5" style={{ color: z.color }}>•</span>{c}
                    </li>
                  ))}
                </ul>
              </div>
  
              <div>
                <p className="text-xs font-semibold text-foreground mb-1">Clinical Features</p>
                <p className="text-xs text-muted-foreground">{z.clinical}</p>
              </div>
  
              <div className="p-2 rounded bg-background border border-border">
                <p className="text-xs font-semibold text-foreground mb-1">Interventions</p>
                <p className="text-xs text-muted-foreground">{z.interventions}</p>
              </div>
            </div>
    );
        })()}
  
        {/* Monro-Kellie summary */}
        {selectedZone === null && (
          <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 text-xs text-muted-foreground">
            <strong className="text-foreground">Key concept: </strong>
            The Langfitt curve is exponential — initially flat (high compliance) then vertical (zero compliance). The clinical "elbow" is where compensatory mechanisms exhaust and small volume additions cause dangerous ICP spikes. Tap a zone above to explore.
          </div>
        )}
      </div>
    </DiagramFigure>
  );
};

export default ICPVolumeCurveDiagram;

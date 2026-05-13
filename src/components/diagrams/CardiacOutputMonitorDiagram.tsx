import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { DiagramFigure } from "./_shared/DiagramFigure";

type Monitor = "pac" | "picco" | "doppler" | "echo";

const monitors: Record<Monitor, {
  label: string;
  fullName: string;
  principle: string;
  measures: string[];
  pros: string[];
  cons: string[];
  invasiveness: number; // 1-4
}> = {
  pac: {
    label: "PA Catheter",
    fullName: "Pulmonary Artery Catheter (Swan-Ganz)",
    principle: "Thermodilution — cold saline injected via RA port; thermistor at PA tip measures temperature change. CO = V × (Tb-Ti) / ∫ΔT·dt (Stewart-Hamilton).",
    measures: ["CO (intermittent/continuous)", "PAOP (wedge)", "CVP", "Mixed venous O₂ (SvO₂)", "PVR & SVR (calculated)"],
    pros: ["Gold standard for CO measurement", "Measures PAOP (LV filling)", "Continuous SvO₂ monitoring", "Calculates PVR (pulmonary HTN)"],
    cons: ["Invasive (PA rupture risk ~0.02%)", "Catheter-related infections", "PAC-Man trial: no mortality benefit", "Requires expertise to insert & interpret"],
    invasiveness: 4,
  },
  picco: {
    label: "PiCCO",
    fullName: "Pulse Contour Cardiac Output (PiCCO)",
    principle: "Transpulmonary thermodilution (calibration) + pulse contour analysis (continuous). Cold saline via CVC → femoral arterial thermistor. Analyses arterial waveform area for beat-to-beat CO.",
    measures: ["CO (continuous)", "GEDI (preload)", "EVLWI (lung water)", "SVV / PPV", "CFI (contractility)"],
    pros: ["Less invasive than PAC", "Continuous CO + volumetric preload", "EVLWI guides fluid in ARDS", "SVV predicts fluid responsiveness"],
    cons: ["Requires CVC + femoral arterial line", "Needs recalibration (drift)", "Inaccurate with aortic regurgitation", "Femoral line site complications"],
    invasiveness: 3,
  },
  doppler: {
    label: "Oesophageal Doppler",
    fullName: "Oesophageal Doppler Monitor (ODM)",
    principle: "Doppler ultrasound probe in oesophagus measures blood flow velocity in descending aorta. CO calculated from velocity-time integral × aortic cross-section area (nomogram).",
    measures: ["CO (continuous)", "SV & SVI", "FTc (corrected flow time)", "Peak velocity (PV)", "Stroke distance"],
    pros: ["Minimally invasive", "Rapid insertion", "Real-time flow optimisation", "Good for goal-directed fluid therapy"],
    cons: ["Operator dependent (probe position)", "Assumes 70% CO via descending aorta", "Uncomfortable in awake patients", "Not suitable for aortic disease"],
    invasiveness: 2,
  },
  echo: {
    label: "Echo (TTE/TOE)",
    fullName: "Echocardiography (TTE / TOE)",
    principle: "Ultrasound imaging of cardiac chambers. CO = LVOT VTI × LVOT area × HR. TOE provides superior views in ventilated patients. FOCUS/FATE protocols for rapid assessment.",
    measures: ["CO (VTI method)", "EF (eyeball/Simpson's)", "Wall motion", "Valve function", "Fluid status (IVC/SVC)"],
    pros: ["Non/minimally invasive", "Direct visualisation of pathology", "Identifies cause of shock", "No calibration needed"],
    cons: ["Operator dependent", "Intermittent (not continuous)", "Requires training (BSE accreditation)", "TOE: oesophageal injury risk"],
    invasiveness: 1,
  },
};

const waveformPaths: Record<Monitor, { path: string; color: string; label: string }> = {
  pac: {
    path: "M 20 70 Q 30 70 35 50 Q 40 30 45 45 Q 50 55 55 40 Q 58 35 62 50 Q 68 65 80 65 L 100 65 Q 110 65 115 45 Q 120 25 125 40 Q 130 50 135 35 Q 138 30 142 45 Q 148 60 160 60 L 180 60 Q 190 60 195 40 Q 200 20 205 35 Q 210 45 215 30 Q 218 25 222 40 Q 228 55 240 55 L 260 55",
    color: "hsl(var(--primary))",
    label: "PA pressure trace — systolic/diastolic waveform with dicrotic notch",
  },
  picco: {
    path: "M 20 70 L 20 70 Q 30 70 35 30 Q 37 20 40 35 Q 45 55 50 60 Q 55 65 65 68 L 90 68 Q 100 68 105 28 Q 107 18 110 33 Q 115 53 120 58 Q 125 63 135 66 L 160 66 Q 170 66 175 26 Q 177 16 180 31 Q 185 51 190 56 Q 195 61 205 64 L 230 64 Q 240 64 245 24 Q 247 14 250 29 Q 255 49 260 54",
    color: "hsl(var(--primary))",
    label: "Arterial waveform — pulse contour area ∝ stroke volume",
  },
  doppler: {
    path: "M 20 80 Q 30 80 40 75 Q 50 65 60 35 Q 70 15 80 25 Q 90 40 100 70 Q 105 80 120 80 L 140 80 Q 150 80 160 75 Q 170 60 180 30 Q 190 10 200 20 Q 210 35 220 65 Q 225 80 240 80 L 260 80",
    color: "hsl(var(--primary))",
    label: "Doppler flow velocity — triangular waveform, area = stroke distance",
  },
  echo: {
    path: "M 20 50 Q 30 50 35 60 Q 40 68 50 68 Q 60 68 65 50 Q 70 30 75 20 Q 80 15 85 25 Q 90 40 95 55 Q 100 65 110 65 L 130 65 Q 135 65 140 55 Q 145 48 150 48 Q 155 48 160 55 Q 165 65 175 65 L 195 65 Q 200 65 205 55 Q 210 40 215 30 Q 220 20 225 30 Q 230 45 235 55 Q 240 65 250 65 L 260 65",
    color: "hsl(var(--primary))",
    label: "LVOT VTI Doppler — velocity envelope for stroke volume calculation",
  },
};

export const CardiacOutputMonitorDiagram = () => {
  const [active, setActive] = useState<Monitor>("pac");
  const [animPhase, setAnimPhase] = useState(0);
  const m = monitors[active];
  const w = waveformPaths[active];

  useEffect(() => {
    setAnimPhase(0);
    const timer = setInterval(() => setAnimPhase((p) => (p + 1) % 100), 50);
    return () => clearInterval(timer);
  }, [active]);

  const dashOffset = animPhase * 3;

  return (
    <DiagramFigure
      id="cardiac-output-monitor-diagram"
      title="Cardiac output monitor"
      description="Auto-generated wrapper for the Cardiac output monitor anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <div className="space-y-4">
        <div className="flex gap-2 flex-wrap">
          {(Object.keys(monitors) as Monitor[]).map((key) => (
            <Button key={key} variant={active === key ? "default" : "outline"} size="sm" onClick={() => setActive(key)}>
              {monitors[key].label}
            </Button>
          ))}
        </div>
  
        {/* Animated waveform */}
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-1">{m.fullName} — Characteristic Waveform</p>
          <svg viewBox="0 0 280 100" className="w-full rounded-lg border border-border bg-secondary/20">
            {/* Grid lines */}
            {[20, 40, 60, 80].map((y) => (
              <line key={y} x1="15" y1={y} x2="265" y2={y} stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.4" />
            ))}
            {/* Animated waveform trace */}
            <path
              d={w.path}
              fill="none"
              stroke={w.color}
              strokeWidth="2"
              strokeDasharray="600"
              strokeDashoffset={-dashOffset}
            />
            {/* Sweep line */}
            <line
              x1={20 + ((animPhase * 2.4) % 240)}
              y1="5"
              x2={20 + ((animPhase * 2.4) % 240)}
              y2="95"
              stroke="hsl(var(--primary))"
              strokeWidth="1"
              opacity="0.3"
            />
          </svg>
          <p className="text-xs text-muted-foreground mt-1 italic">{w.label}</p>
        </div>
  
        {/* Invasiveness indicator */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">Invasiveness:</span>
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`w-6 h-2 rounded-full transition-colors ${
                  level <= m.invasiveness
                    ? "bg-primary"
                    : "bg-muted"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            {m.invasiveness === 1 ? "Non-invasive" : m.invasiveness === 2 ? "Minimally invasive" : m.invasiveness === 3 ? "Moderately invasive" : "Highly invasive"}
          </span>
        </div>
  
        {/* Principle */}
        <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
          <p className="text-xs font-semibold text-primary mb-1">Principle</p>
          <p className="text-sm text-foreground">{m.principle}</p>
        </div>
  
        {/* Measures, Pros, Cons */}
        <div className="grid sm:grid-cols-3 gap-3">
          <div className="p-3 rounded-lg border border-border">
            <p className="text-xs font-semibold text-foreground mb-2">Measures</p>
            <ul className="space-y-1">
              {m.measures.map((item) => (
                <li key={item} className="text-xs text-muted-foreground flex items-start gap-1">
                  <span className="text-primary mt-0.5">•</span>{item}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-3 rounded-lg border border-border">
            <p className="text-xs font-semibold text-emerald-600 mb-2">Advantages</p>
            <ul className="space-y-1">
              {m.pros.map((item) => (
                <li key={item} className="text-xs text-muted-foreground flex items-start gap-1">
                  <span className="text-emerald-500 mt-0.5">✓</span>{item}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-3 rounded-lg border border-border">
            <p className="text-xs font-semibold text-destructive mb-2">Limitations</p>
            <ul className="space-y-1">
              {m.cons.map((item) => (
                <li key={item} className="text-xs text-muted-foreground flex items-start gap-1">
                  <span className="text-destructive mt-0.5">✗</span>{item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </DiagramFigure>
  );
};

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const PiCCODiagram = () => {
  const [selectedParam, setSelectedParam] = useState<string | null>(null);
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);

  const piccoParams = [
    { id: "ci", name: "CI", full: "Cardiac Index", normal: "3.0–5.0 L/min/m²", unit: "L/min/m²", category: "Flow", interpretation: "Low CI (<3.0): cardiogenic shock, hypovolaemia, or excessive afterload. High CI (>5.0): hyperdynamic state — sepsis, liver failure, thyrotoxicosis. Interpret with SVR and preload.", color: "hsl(var(--primary))" },
    { id: "gedi", name: "GEDI", full: "Global End-Diastolic Volume Index", normal: "680–800 mL/m²", unit: "mL/m²", category: "Preload", interpretation: "Volumetric preload marker — superior to CVP/PAOP. Low GEDI (<680): hypovolaemia — likely fluid responsive. High GEDI (>800): volume overloaded or cardiac dysfunction. Measured by transpulmonary thermodilution (mean transit time × CO).", color: "hsl(200 70% 50%)" },
    { id: "evlwi", name: "EVLWI", full: "Extravascular Lung Water Index", normal: "3–7 mL/kg", unit: "mL/kg", category: "Lung water", interpretation: "Quantifies pulmonary oedema. 7–10: mild oedema. 10–14: moderate. >14: severe (ARDS). Guides fluid restriction and diuresis. Only monitor that directly measures lung water at the bedside. Prognostic in ARDS (↑EVLWI = ↑mortality).", color: "hsl(142 60% 45%)" },
    { id: "svri", name: "SVRI", full: "Systemic Vascular Resistance Index", normal: "1700–2400 dyn·s/cm⁵·m²", unit: "dyn·s/cm⁵·m²", category: "Afterload", interpretation: "Low SVRI (<1700): vasodilation — sepsis, anaphylaxis, neurogenic shock, liver failure. High SVRI (>2400): vasoconstriction — cardiogenic shock (compensatory), hypovolaemia, vasopressor excess. Calculated: 80 × (MAP − CVP) / CI.", color: "hsl(25 80% 50%)" },
    { id: "gef", name: "GEF", full: "Global Ejection Fraction", normal: "25–35%", unit: "%", category: "Contractility", interpretation: "Estimates cardiac contractility. Low GEF (<25%): myocardial dysfunction — consider inotropes (dobutamine, levosimendan). Not the same as LVEF on echo. GEF = 4 × SV / GEDV. Better than dP/dt for contractility assessment.", color: "hsl(0 70% 50%)" },
    { id: "svv", name: "SVV", full: "Stroke Volume Variation", normal: "<10%", unit: "%", category: "Fluid responsiveness", interpretation: "Dynamic preload marker from pulse contour analysis. SVV >12%: likely fluid responsive (on steep Starling curve). Requirements: MV, VT ≥8 mL/kg, sinus rhythm, closed chest. Continuously displayed — no need for thermodilution.", color: "hsl(45 80% 50%)" },
    { id: "ppv", name: "PPV", full: "Pulse Pressure Variation", normal: "<13%", unit: "%", category: "Fluid responsiveness", interpretation: "PPV >13%: fluid responsive. Same requirements as SVV. Slightly better specificity than SVV in some studies. Both are continuously updated from the arterial waveform — no recalibration needed.", color: "hsl(45 80% 50%)" },
    { id: "pvpi", name: "PVPI", full: "Pulmonary Vascular Permeability Index", normal: "1.0–3.0", unit: "ratio", category: "Lung water", interpretation: "PVPI = EVLW / pulmonary blood volume. Distinguishes cardiogenic (PVPI 1–3, high GEDI) from non-cardiogenic pulmonary oedema/ARDS (PVPI >3, normal/low GEDI). Unique to PiCCO — cannot be obtained from PAC.", color: "hsl(142 60% 45%)" },
  ];

  const clinicalScenarios = [
    { id: "sepsis", name: "Septic Shock", ci: "↑↑ (hyperdynamic)", gedi: "↓ or normal", evlwi: "↑ (capillary leak)", svri: "↓↓", gef: "↓ (septic cardiomyopathy)", svv: "↑ (often >12%)", action: "Fluid if GEDI low + SVV >12%. Noradrenaline for ↓SVRI. Dobutamine if GEF <25% and GEDI adequate. Monitor EVLWI to limit fluids." },
    { id: "cardiogenic", name: "Cardiogenic Shock", ci: "↓↓", gedi: "↑↑", evlwi: "↑↑ (hydrostatic)", svri: "↑↑ (compensatory)", gef: "↓↓ (<20%)", svv: "Low (flat Starling)", action: "Inotropes (dobutamine/levosimendan). Avoid fluid loading (GEDI already high). Vasodilators if SVRI very high. Diuresis if EVLWI elevated. Consider IABP/Impella." },
    { id: "hypovolaemia", name: "Hypovolaemia", ci: "↓", gedi: "↓↓", evlwi: "Normal/↓", svri: "↑ (compensatory)", gef: "Normal/↑", svv: "↑↑ (>15%)", action: "Fluid resuscitation (GEDI low + SVV high = responsive). Reassess after each bolus. Stop fluids when GEDI normalises and SVV <10%. Source control if haemorrhage." },
    { id: "ards", name: "ARDS", ci: "Variable", gedi: "Normal/↑", evlwi: "↑↑↑ (>14)", svri: "Variable", gef: "Variable (may ↓ with RV strain)", svv: "Unreliable (low VT)", action: "EVLWI is the KEY parameter. Target EVLWI <10 with conservative fluid strategy. PVPI >3 confirms permeability oedema (not cardiogenic). Diuretics if GEDI adequate. Fluid restrict." },
  ];

  return (
    <div className="my-6 p-4 bg-muted/30 rounded-xl border border-border">
      <h3 className="text-lg font-bold text-foreground mb-1">PiCCO Monitoring System</h3>
      <p className="text-sm text-muted-foreground mb-4">Setup, parameters, interpretation, and clinical scenarios</p>

      <Tabs defaultValue="setup" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="setup" className="text-xs">Setup & Principle</TabsTrigger>
          <TabsTrigger value="params" className="text-xs">Parameters</TabsTrigger>
          <TabsTrigger value="scenarios" className="text-xs">Scenarios</TabsTrigger>
        </TabsList>

        <TabsContent value="setup">
          {/* PiCCO circuit SVG */}
          <div className="bg-background rounded-lg border border-border p-3 mb-3">
            <svg viewBox="0 0 420 320" className="w-full h-auto">
              {/* Title */}
              <text x="210" y="18" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="700">PiCCO Circuit Setup</text>

              {/* Heart */}
              <ellipse cx="210" cy="100" rx="45" ry="40" fill="hsl(0,70%,55%)" opacity="0.12" stroke="hsl(0,70%,55%)" strokeWidth="1.5" />
              <text x="210" y="95" textAnchor="middle" fill="hsl(0,70%,55%)" fontSize="10" fontWeight="700">Heart</text>
              <text x="210" y="108" textAnchor="middle" fill="hsl(0,70%,55%)" fontSize="7">RA → RV → PA →</text>
              <text x="210" y="118" textAnchor="middle" fill="hsl(0,70%,55%)" fontSize="7">Lungs → LA → LV → Aorta</text>

              {/* Lungs */}
              <ellipse cx="210" cy="55" rx="60" ry="18" fill="hsl(200,70%,50%)" opacity="0.1" stroke="hsl(200,70%,50%)" strokeWidth="1" strokeDasharray="4,2" />
              <text x="210" y="50" textAnchor="middle" fill="hsl(200,70%,50%)" fontSize="8">Lungs</text>
              <text x="210" y="62" textAnchor="middle" fill="hsl(200,70%,50%)" fontSize="6">EVLW measured here</text>

              {/* CVC — injection site */}
              <rect x="30" y="75" width="75" height="45" rx="6" fill="hsl(var(--primary))" opacity="0.12" stroke="hsl(var(--primary))" strokeWidth="1.5" />
              <text x="67" y="93" textAnchor="middle" className="fill-primary" fontSize="9" fontWeight="700">CVC</text>
              <text x="67" y="105" textAnchor="middle" className="fill-primary" fontSize="7">Internal jugular</text>
              <text x="67" y="115" textAnchor="middle" className="fill-primary" fontSize="6">or subclavian</text>
              {/* Arrow CVC to heart */}
              <line x1="105" y1="97" x2="165" y2="97" stroke="hsl(var(--primary))" strokeWidth="2" markerEnd="url(#arrowBlue)" />
              <defs><marker id="arrowBlue" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M 0,0 L 6,3 L 0,6 Z" fill="hsl(var(--primary))" /></marker></defs>
              <text x="135" y="90" textAnchor="middle" className="fill-primary" fontSize="7" fontWeight="600">Cold saline</text>
              <text x="135" y="80" textAnchor="middle" className="fill-primary" fontSize="6">10 mL iced 0.9% NaCl</text>

              {/* Femoral arterial line — detection site */}
              <rect x="315" y="170" width="85" height="55" rx="6" fill="hsl(25,80%,50%)" opacity="0.12" stroke="hsl(25,80%,50%)" strokeWidth="1.5" />
              <text x="357" y="188" textAnchor="middle" fill="hsl(25,80%,50%)" fontSize="9" fontWeight="700">Femoral Art.</text>
              <text x="357" y="200" textAnchor="middle" fill="hsl(25,80%,50%)" fontSize="7">Thermistor-tipped</text>
              <text x="357" y="212" textAnchor="middle" fill="hsl(25,80%,50%)" fontSize="7">arterial catheter</text>
              {/* Arrow heart to femoral */}
              <path d="M 245,120 Q 300,140 330,175" fill="none" stroke="hsl(25,80%,50%)" strokeWidth="2" markerEnd="url(#arrowOrange)" />
              <defs><marker id="arrowOrange" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M 0,0 L 6,3 L 0,6 Z" fill="hsl(25,80%,50%)" /></marker></defs>
              <text x="300" y="145" fill="hsl(25,80%,50%)" fontSize="7" fontWeight="600">Transpulmonary</text>
              <text x="300" y="155" fill="hsl(25,80%,50%)" fontSize="6">thermodilution path</text>

              {/* PiCCO monitor */}
              <rect x="110" y="200" width="120" height="60" rx="8" fill="hsl(var(--muted))" opacity="0.3" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
              <text x="170" y="222" textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="700">PiCCO Monitor</text>
              <text x="170" y="238" textAnchor="middle" className="fill-muted-foreground" fontSize="7">Pulsion Medical / Getinge</text>
              <text x="170" y="250" textAnchor="middle" className="fill-muted-foreground" fontSize="6">Displays all parameters</text>

              {/* Connections to monitor */}
              <line x1="67" y1="120" x2="67" y2="205" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="3,2" />
              <line x1="67" y1="205" x2="110" y2="225" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="3,2" />
              <line x1="315" y1="210" x2="230" y2="230" stroke="hsl(25,80%,50%)" strokeWidth="1" strokeDasharray="3,2" />

              {/* Thermodilution curve */}
              <rect x="25" y="175" width="75" height="55" rx="4" fill="hsl(var(--background))" stroke="hsl(var(--border))" strokeWidth="1" />
              <text x="62" y="188" textAnchor="middle" className="fill-foreground" fontSize="7" fontWeight="600">TD Curve</text>
              <path d="M 32,220 L 42,195 Q 50,185 55,190 Q 65,205 75,215 Q 85,220 92,222" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" />
              <text x="62" y="230" textAnchor="middle" className="fill-muted-foreground" fontSize="5">Area = CO (Stewart-Hamilton)</text>

              {/* Key measurements annotations */}
              <text x="210" y="285" textAnchor="middle" className="fill-foreground" fontSize="9" fontWeight="600">Two measurement principles:</text>
              <text x="120" y="300" textAnchor="middle" className="fill-primary" fontSize="8" fontWeight="600">① Thermodilution</text>
              <text x="120" y="312" textAnchor="middle" className="fill-muted-foreground" fontSize="6">Calibration: CO, GEDI, EVLWI</text>
              <text x="300" y="300" textAnchor="middle" fill="hsl(25,80%,50%)" fontSize="8" fontWeight="600">② Pulse Contour</text>
              <text x="300" y="312" textAnchor="middle" className="fill-muted-foreground" fontSize="6">Continuous: CI, SVV, PPV, dP/dt</text>
            </svg>
          </div>

          {/* How it works */}
          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-lg border border-border">
              <p className="font-bold text-foreground text-sm mb-1">Transpulmonary Thermodilution</p>
              <p className="text-muted-foreground">Cold indicator (10 mL iced saline) injected via CVC → travels through right heart → lungs → left heart → aorta → detected by thermistor at femoral artery. Longer transit than PAC thermodilution — allows calculation of intrathoracic volumes.</p>
              <div className="mt-2 p-2 rounded bg-muted/50">
                <p className="text-foreground font-semibold">Stewart-Hamilton equation:</p>
                <p className="text-muted-foreground font-mono mt-0.5">CO = (V<sub>i</sub> × (T<sub>b</sub> − T<sub>i</sub>) × K) / ∫ΔT·dt</p>
                <p className="text-muted-foreground mt-1">V<sub>i</sub> = injectate volume, T<sub>b</sub> = blood temp, T<sub>i</sub> = injectate temp, ∫ΔT·dt = area under thermodilution curve.</p>
              </div>
            </div>
            <div className="p-3 rounded-lg border border-border">
              <p className="font-bold text-foreground text-sm mb-1">Pulse Contour Analysis</p>
              <p className="text-muted-foreground">Between thermodilution calibrations, PiCCO analyses the arterial pressure waveform continuously. SV ∝ area under systolic portion of arterial curve / aortic impedance. Provides beat-to-beat CI, SVV, PPV, dP/dt<sub>max</sub>.</p>
              <p className="text-muted-foreground mt-1"><strong>Recalibration needed:</strong> every 8h routinely, or after significant haemodynamic changes (vasopressor dose change, fluid bolus, cardiac event).</p>
            </div>
            <div className="p-2 rounded bg-primary/5 border border-primary/20 text-xs text-muted-foreground">
              <strong className="text-foreground">Requirements: </strong>
              CVC (IJ or SC — NOT femoral) + thermistor-tipped femoral arterial catheter. CVC and arterial line must be in different compartments (venous injection, arterial detection). Axillary/brachial art. line also possible (smaller patients).
            </div>
          </div>
        </TabsContent>

        <TabsContent value="params">
          <p className="text-xs text-muted-foreground mb-3">Tap a parameter for interpretation and clinical significance</p>
          <div className="grid grid-cols-2 gap-1.5 mb-3">
            {piccoParams.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedParam(selectedParam === p.id ? null : p.id)}
                className={`p-2 rounded-lg border text-left transition-all text-xs ${selectedParam === p.id ? "border-primary bg-primary/10 ring-1 ring-primary" : "border-border hover:border-primary/50"}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-foreground">{p.name}</span>
                  <span className="text-[9px] px-1 py-0.5 rounded bg-muted text-muted-foreground">{p.category}</span>
                </div>
                <p className="text-muted-foreground mt-0.5 text-[10px]">{p.full}</p>
              </button>
            ))}
          </div>

          {selectedParam && (() => {
            const p = piccoParams.find((x) => x.id === selectedParam)!;
            return (
              <div className="p-3 rounded-lg border border-primary/30 bg-primary/5 animate-fade-in text-xs space-y-2">
                <div>
                  <p className="font-bold text-foreground text-sm">{p.name} — {p.full}</p>
                  <p className="text-muted-foreground">{p.category}</p>
                </div>
                <div className="p-2 rounded bg-background border border-border">
                  <span className="text-muted-foreground">Normal range: </span>
                  <span className="font-bold text-foreground">{p.normal}</span>
                </div>
                <p className="text-muted-foreground">{p.interpretation}</p>
              </div>
            );
          })()}

          {!selectedParam && (
            <div className="p-3 rounded bg-primary/5 border border-primary/20 text-xs text-muted-foreground">
              <strong className="text-foreground">PiCCO advantage over PAC: </strong>
              Provides GEDI (volumetric preload — better than PAOP), EVLWI (direct lung water quantification — unique), and PVPI (permeability index — distinguishes ARDS from cardiogenic oedema). Continuous SVV/PPV without recalibration. Fewer complications than PAC.
            </div>
          )}
        </TabsContent>

        <TabsContent value="scenarios">
          <p className="text-xs text-muted-foreground mb-3">How PiCCO parameters change in common clinical scenarios</p>
          <div className="space-y-1.5">
            {clinicalScenarios.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedScenario(selectedScenario === s.id ? null : s.id)}
                className={`w-full text-left p-2.5 rounded-lg border transition-all text-xs ${selectedScenario === s.id ? "border-primary bg-primary/10 ring-1 ring-primary" : "border-border hover:border-primary/50"}`}
              >
                <span className="font-bold text-foreground">{s.name}</span>
                {selectedScenario === s.id && (
                  <div className="mt-2 space-y-2 animate-fade-in">
                    <div className="grid grid-cols-3 gap-1">
                      {[
                        { label: "CI", value: s.ci },
                        { label: "GEDI", value: s.gedi },
                        { label: "EVLWI", value: s.evlwi },
                        { label: "SVRI", value: s.svri },
                        { label: "GEF", value: s.gef },
                        { label: "SVV", value: s.svv },
                      ].map((v) => (
                        <div key={v.label} className="p-1 rounded bg-background border border-border text-center">
                          <span className="text-muted-foreground text-[10px]">{v.label}</span>
                          <p className="font-semibold text-foreground text-[10px]">{v.value}</p>
                        </div>
                      ))}
                    </div>
                    <div className="p-2 rounded bg-primary/10 border border-primary/20">
                      <span className="font-semibold text-foreground">Management: </span>
                      <span className="text-muted-foreground">{s.action}</span>
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>

          <div className="mt-3 p-2 rounded bg-destructive/5 border border-destructive/20 text-xs text-muted-foreground">
            <strong className="text-foreground">PiCCO limitations: </strong>
            Inaccurate with: intracardiac shunts, severe aortic regurgitation, aortic aneurysm, IABP, ECMO. Femoral arterial line may not reflect central pressures in severe vasoplegia. Recalibration needed after significant haemodynamic changes.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PiCCODiagram;

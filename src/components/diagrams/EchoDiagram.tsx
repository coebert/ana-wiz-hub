import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const EchoDiagram = () => {
  const [selectedView, setSelectedView] = useState<string | null>(null);
  const [selectedMeasurement, setSelectedMeasurement] = useState<string | null>(null);
  const [selectedFUSE, setSelectedFUSE] = useState<number | null>(null);

  const views = [
    {
      id: "plax",
      name: "PLAX",
      full: "Parasternal Long Axis",
      probe: "Left parasternal border, 3rd–4th intercostal space. Marker to right shoulder. Patient left lateral decubitus.",
      structures: "RV (anterior), IVS, LV cavity, mitral valve (anterior + posterior leaflets), LVOT, aortic valve, aortic root, LA (posterior), descending aorta (behind LA in cross-section).",
      measures: "LV dimensions (LVIDd/LVIDs — M-mode), IVS and posterior wall thickness, aortic root diameter, LA anteroposterior diameter, E-point septal separation (EPSS — quick LVEF estimate: >7 mm suggests ↓EF).",
      pathology: "Pericardial effusion (posterior to LV, anterior to descending aorta — distinguishes from pleural effusion which tracks behind aorta). MV prolapse. Aortic dissection flap. LVH. RWMA.",
      svg: (
        <svg viewBox="0 0 340 140" className="w-full h-auto">
          {/* Simplified PLAX diagram */}
          <ellipse cx="170" cy="70" rx="130" ry="55" fill="hsl(var(--muted))" opacity="0.15" stroke="hsl(var(--border))" strokeWidth="1" />
          {/* RV */}
          <path d="M 55,40 Q 100,25 145,35" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" />
          <text x="100" y="30" textAnchor="middle" className="fill-primary" fontSize="8" fontWeight="600">RV</text>
          {/* IVS */}
          <line x1="60" y1="45" x2="200" y2="45" stroke="hsl(var(--foreground))" strokeWidth="2" opacity="0.3" />
          <text x="130" y="42" textAnchor="middle" className="fill-muted-foreground" fontSize="6">IVS</text>
          {/* LV cavity */}
          <ellipse cx="130" cy="70" rx="65" ry="22" fill="hsl(var(--primary))" opacity="0.08" stroke="hsl(var(--primary))" strokeWidth="1" />
          <text x="130" y="73" textAnchor="middle" className="fill-primary" fontSize="10" fontWeight="700">LV</text>
          {/* MV */}
          <path d="M 195,55 Q 210,70 195,85" fill="none" stroke="hsl(0,70%,55%)" strokeWidth="2" />
          <text x="215" y="72" fontSize="7" fill="hsl(0,70%,55%)" fontWeight="600">MV</text>
          {/* AV + Aortic root */}
          <line x1="60" y1="55" x2="60" y2="85" stroke="hsl(25,80%,50%)" strokeWidth="2" />
          <text x="45" y="73" fontSize="7" fill="hsl(25,80%,50%)" fontWeight="600">AV</text>
          {/* LA */}
          <ellipse cx="240" cy="85" rx="40" ry="20" fill="hsl(0,70%,55%)" opacity="0.08" stroke="hsl(0,70%,55%)" strokeWidth="1" />
          <text x="240" y="88" textAnchor="middle" fill="hsl(0,70%,55%)" fontSize="9" fontWeight="600">LA</text>
          {/* Posterior wall */}
          <line x1="60" y1="95" x2="200" y2="95" stroke="hsl(var(--foreground))" strokeWidth="2" opacity="0.3" />
          <text x="130" y="107" textAnchor="middle" className="fill-muted-foreground" fontSize="6">Posterior wall</text>
          {/* Desc Ao */}
          <circle cx="270" cy="110" r="10" fill="hsl(25,80%,50%)" opacity="0.1" stroke="hsl(25,80%,50%)" strokeWidth="1" />
          <text x="270" y="113" textAnchor="middle" fill="hsl(25,80%,50%)" fontSize="5">Desc Ao</text>
        </svg>
      ),
    },
    {
      id: "psax",
      name: "PSAX",
      full: "Parasternal Short Axis",
      probe: "Same position as PLAX, rotate probe 90° clockwise. Marker to left shoulder. Tilt to scan from base (aortic valve) to apex.",
      structures: "Base level: aortic valve (3 cusps — 'Mercedes-Benz' sign), LA, RA, RVOT, TV, PV. Mid-papillary level: circular LV ('doughnut'), papillary muscles (2), RV crescent. Apical level: LV cavity only.",
      measures: "LV wall motion (16-segment model — each coronary territory visualised). LV geometry (D-shaped = RV pressure/volume overload). Fractional area change. AV morphology (bicuspid = 2 cusps).",
      pathology: "RWMA (corresponds to coronary territories — LAD anterior, RCA inferior, LCx lateral). RV dilatation (D-shaped septum). VSD (colour Doppler at septal level). Bicuspid AV.",
      svg: (
        <svg viewBox="0 0 340 140" className="w-full h-auto">
          {/* LV circle */}
          <circle cx="150" cy="70" r="45" fill="hsl(var(--primary))" opacity="0.08" stroke="hsl(var(--primary))" strokeWidth="1.5" />
          <circle cx="150" cy="70" r="30" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="1" />
          <text x="150" y="73" textAnchor="middle" className="fill-primary" fontSize="10" fontWeight="700">LV</text>
          {/* Papillary muscles */}
          <circle cx="135" cy="85" r="5" fill="hsl(var(--foreground))" opacity="0.3" />
          <circle cx="165" cy="85" r="5" fill="hsl(var(--foreground))" opacity="0.3" />
          <text x="150" y="100" textAnchor="middle" className="fill-muted-foreground" fontSize="6">Papillary mm.</text>
          {/* RV crescent */}
          <path d="M 105,40 Q 80,70 105,100" fill="hsl(200,70%,50%)" opacity="0.08" stroke="hsl(200,70%,50%)" strokeWidth="1.5" />
          <text x="85" y="73" textAnchor="middle" fill="hsl(200,70%,50%)" fontSize="8" fontWeight="600">RV</text>
          {/* Wall segments */}
          <text x="150" y="30" textAnchor="middle" className="fill-muted-foreground" fontSize="6">Anterior (LAD)</text>
          <text x="210" y="73" fontSize="6" className="fill-muted-foreground">Lateral (LCx)</text>
          <text x="150" y="125" textAnchor="middle" className="fill-muted-foreground" fontSize="6">Inferior (RCA)</text>
          {/* Level label */}
          <text x="290" y="50" fontSize="8" className="fill-foreground" fontWeight="600">Mid-papillary</text>
          <text x="290" y="62" fontSize="7" className="fill-muted-foreground">level</text>
        </svg>
      ),
    },
    {
      id: "a4c",
      name: "A4C",
      full: "Apical 4-Chamber",
      probe: "Apex (PMI, 5th ICS mid-clavicular line). Marker to patient's left. Left lateral decubitus position essential.",
      structures: "All four chambers simultaneously. MV and TV (TV more apical — if MV more apical, suspect AV canal defect). IAS (foramen ovale region). IVS. Moderator band (RV). Pulmonary veins entering LA.",
      measures: "LVEF (Simpson's biplane — trace LV endocardium in systole and diastole). TAPSE (tricuspid annular plane systolic excursion — RV function, normal >17 mm). MV E/A ratio (diastolic function). E/e' ratio (LV filling pressures). TR velocity (estimate PASP). LV volumes.",
      pathology: "RWMA. LV thrombus (apex). Pericardial effusion. Valvular regurgitation (colour Doppler). ASD (dropout at IAS — confirm with bubble study). RV dilatation (RV:LV ratio >0.6).",
      svg: (
        <svg viewBox="0 0 340 140" className="w-full h-auto">
          {/* Four chambers */}
          <path d="M 170,15 L 100,65 L 100,110 Q 100,125 135,125 L 170,125" fill="hsl(var(--primary))" opacity="0.06" stroke="hsl(var(--primary))" strokeWidth="1.5" />
          <path d="M 170,15 L 240,65 L 240,110 Q 240,125 205,125 L 170,125" fill="hsl(200,70%,50%)" opacity="0.06" stroke="hsl(200,70%,50%)" strokeWidth="1.5" />
          {/* Septum */}
          <line x1="170" y1="15" x2="170" y2="125" stroke="hsl(var(--foreground))" strokeWidth="1.5" opacity="0.3" />
          {/* AV valve line */}
          <line x1="100" y1="65" x2="240" y2="65" stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.2" />
          {/* Labels */}
          <text x="135" y="50" textAnchor="middle" className="fill-primary" fontSize="10" fontWeight="700">LV</text>
          <text x="205" y="50" textAnchor="middle" fill="hsl(200,70%,50%)" fontSize="10" fontWeight="700">RV</text>
          <text x="135" y="95" textAnchor="middle" fill="hsl(0,70%,55%)" fontSize="9" fontWeight="600">LA</text>
          <text x="205" y="95" textAnchor="middle" fill="hsl(25,80%,50%)" fontSize="9" fontWeight="600">RA</text>
          {/* Valves */}
          <text x="145" y="62" textAnchor="middle" fontSize="6" className="fill-muted-foreground">MV</text>
          <text x="200" y="62" textAnchor="middle" fontSize="6" className="fill-muted-foreground">TV</text>
          {/* Apex marker */}
          <text x="170" y="10" textAnchor="middle" fontSize="6" className="fill-muted-foreground">Apex</text>
        </svg>
      ),
    },
    {
      id: "subcostal",
      name: "Subcostal",
      full: "Subcostal / Subxiphoid",
      probe: "Below xiphisternum, probe flat, angled towards left shoulder. Patient supine with knees bent (relaxes abdominal wall). Best view in ventilated patients (PLAX/A4C difficult).",
      structures: "Four chambers (liver as acoustic window). IVC entering RA (subcostal IVC view — rotate 90°). Pericardium (best view for effusion — gravity-dependent fluid anterior to RV). Hepatic veins. IAS (best view for ASD detection).",
      measures: "IVC diameter and collapsibility (inspiratory collapse >50% with sniff = CVP ~3 mmHg; <50% collapse = CVP ~15 mmHg). Pericardial effusion quantification. RV wall thickness.",
      pathology: "Pericardial effusion and tamponade (RA/RV diastolic collapse). IVC plethora (dilated, non-collapsible = ↑CVP). ASD (bubble study — early bubbles in LA). Peritoneal free fluid.",
      svg: (
        <svg viewBox="0 0 340 140" className="w-full h-auto">
          {/* Liver */}
          <path d="M 30,20 Q 100,10 170,30 Q 200,40 170,55 L 30,55 Z" fill="hsl(25,80%,50%)" opacity="0.08" stroke="hsl(25,80%,50%)" strokeWidth="1" />
          <text x="100" y="40" textAnchor="middle" fill="hsl(25,80%,50%)" fontSize="8">Liver</text>
          {/* Heart chambers below */}
          <rect x="50" y="60" width="100" height="55" rx="8" fill="hsl(var(--primary))" opacity="0.06" stroke="hsl(var(--primary))" strokeWidth="1" />
          <line x1="100" y1="60" x2="100" y2="115" stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.2" />
          <line x1="50" y1="85" x2="150" y2="85" stroke="hsl(var(--foreground))" strokeWidth="0.5" opacity="0.2" />
          <text x="75" y="78" textAnchor="middle" fill="hsl(200,70%,50%)" fontSize="8" fontWeight="600">RV</text>
          <text x="125" y="78" textAnchor="middle" className="fill-primary" fontSize="8" fontWeight="600">LV</text>
          <text x="75" y="102" textAnchor="middle" fill="hsl(25,80%,50%)" fontSize="7">RA</text>
          <text x="125" y="102" textAnchor="middle" fill="hsl(0,70%,55%)" fontSize="7">LA</text>
          {/* IVC */}
          <path d="M 200,85 L 260,85 Q 280,85 300,80" fill="none" stroke="hsl(200,70%,50%)" strokeWidth="3" opacity="0.4" />
          <text x="250" y="78" textAnchor="middle" fill="hsl(200,70%,50%)" fontSize="8" fontWeight="600">IVC</text>
          <text x="250" y="105" textAnchor="middle" className="fill-muted-foreground" fontSize="6">Measure diameter</text>
          <text x="250" y="115" textAnchor="middle" className="fill-muted-foreground" fontSize="6">+ collapsibility</text>
        </svg>
      ),
    },
  ];

  const measurements = [
    { id: "lvef", name: "LVEF", full: "LV Ejection Fraction", normal: ">55%", method: "Simpson's biplane (gold standard): trace LV endocardium at end-diastole and end-systole in A4C and A2C views. EF = (EDV − ESV) / EDV × 100. Eyeball estimate acceptable in emergencies. EPSS (E-point septal separation on PLAX M-mode): >7 mm suggests ↓EF.", grades: "Normal >55%. Mild ↓ 45–54%. Moderate ↓ 30–44%. Severe ↓ <30%.", clinical: "Most important single echo measurement. Guides inotrope therapy, device eligibility (ICD if EF ≤35%), surgical risk. Visual estimate correlates well with formal methods in experienced hands." },
    { id: "ea", name: "E/A Ratio", full: "Mitral Inflow Velocities", normal: "1–2 (age-dependent)", method: "PW Doppler at mitral leaflet tips in A4C. E wave = early passive filling (LV relaxation). A wave = atrial contraction ('atrial kick'). E/A ratio reflects diastolic function. Must interpret with tissue Doppler (e') and age.", grades: "Normal: E/A 1–2. Grade I (impaired relaxation): E/A <1, DT >200 ms. Grade II (pseudonormal): E/A 1–2 but e' reduced. Grade III (restrictive): E/A >2, DT <150 ms.", clinical: "Diastolic dysfunction grading. Pseudonormal pattern (looks normal but e' is low — use E/e' to unmask). Restrictive pattern = severe ↑filling pressures, poor prognosis." },
    { id: "ee", name: "E/e' Ratio", full: "LV Filling Pressure Estimate", normal: "<8 (normal), >14 (elevated)", method: "E = mitral inflow E wave (PW Doppler). e' = tissue Doppler velocity at mitral annulus (septal e' or lateral e'). Use average of septal and lateral e'. E/e' estimates LVEDP/PAOP non-invasively.", grades: "E/e' <8: normal filling pressures. 8–14: indeterminate (use other markers). >14: elevated filling pressures (correlates with PAOP >18 mmHg). Lateral e' normal >10 cm/s, septal e' normal >7 cm/s.", clinical: "Best non-invasive estimate of LV filling pressures. Remains reliable even with ↓EF (unlike E/A alone). Key in diagnosing HFpEF. E/e' >14 = likely elevated LAP = pulmonary congestion." },
    { id: "ivc", name: "IVC Assessment", full: "IVC Diameter & Collapsibility", normal: "1.5–2.5 cm, >50% collapse", method: "Subcostal view, long-axis of IVC entering RA. Measure diameter 2 cm from RA junction. Assess respiratory variation with sniff test (sharp inspiration). M-mode for precise measurement.", grades: "Small IVC (<1.5 cm) + >50% collapse: CVP ~0–5 mmHg. Normal IVC (1.5–2.5 cm) + >50% collapse: CVP ~5–10 mmHg. Dilated IVC (>2.5 cm) + <50% collapse: CVP ~15–20 mmHg. Fixed dilated IVC: CVP >20 mmHg.", clinical: "Quick volume status assessment. Plethoric IVC: RV failure, tamponade, PE, fluid overload. Collapsing IVC: hypovolaemia, may be fluid responsive (but poor PPV as isolated marker). In ventilated patients: distensibility index (opposite — IVC distends with inspiration)." },
    { id: "tapse", name: "TAPSE", full: "Tricuspid Annular Plane Systolic Excursion", normal: ">17 mm", method: "M-mode cursor through lateral tricuspid annulus in A4C. Measure total excursion of annulus towards apex during systole. Simple, reproducible, angle-dependent.", grades: "Normal >17 mm. Mild RV dysfunction 14–17 mm. Severe RV dysfunction <10 mm.", clinical: "Quick, reliable RV systolic function marker. Low TAPSE: acute PE (RV strain), RV infarct, pulmonary HTN, post-cardiac surgery (always reduced — unreliable after sternotomy). Prognostic in PE and heart failure." },
    { id: "pasp", name: "PASP", full: "Pulmonary Artery Systolic Pressure", normal: "<35 mmHg", method: "Continuous-wave Doppler across tricuspid valve in A4C (TR jet). Apply modified Bernoulli: PASP = 4 × (TR Vmax)² + RAP. RAP estimated from IVC diameter/collapsibility. Requires at least mild TR (present in ~70% of patients).", grades: "Normal <35 mmHg. Mild PH 35–45 mmHg. Moderate PH 45–60 mmHg. Severe PH >60 mmHg.", clinical: "Non-invasive estimate of PA systolic pressure. Requires TR jet — if absent, cannot calculate. May underestimate in severe TR (low velocity). Confirms pulmonary HTN but PAC remains gold standard for PH classification (pre- vs post-capillary)." },
  ];

  const fuseSteps = [
    { step: "LV Function", view: "A4C / PLAX", look: "Eyeball LVEF. Hyperdynamic (sepsis, hypovolaemia) vs severely impaired (cardiogenic). RWMA suggests MI. LV dilatation.", action: "↓EF: inotropes (dobutamine). RWMA: cardiology referral, consider PCI. Hyperdynamic + ↓BP: consider sepsis or hypovolaemia." },
    { step: "RV Size & Function", view: "A4C / Subcostal", look: "RV:LV ratio (normal <0.6, dilated >1.0). TAPSE (<17 mm = dysfunction). D-shaped septum (PSAX). McConnell's sign (apical sparing in acute PE).", action: "Dilated RV + haemodynamic compromise: consider PE (CTPA), thrombolysis if massive PE. RV infarct: fluid cautiously, avoid GTN/diuretics." },
    { step: "IVC & Volume Status", view: "Subcostal IVC", look: "IVC diameter + collapsibility. Small collapsing IVC → hypovolaemia. Plethoric IVC → ↑CVP (RV failure, tamponade, fluid overload).", action: "Collapsing IVC: fluid challenge. Plethoric IVC: stop fluids, consider vasopressors/inotropes, assess for tamponade/PE." },
    { step: "Pericardial Effusion", view: "Subcostal / PLAX", look: "Circumferential fluid (global). RA/RV diastolic collapse = tamponade. Swinging heart. Electrical alternans on ECG.", action: "Tamponade: pericardiocentesis (echo-guided, subcostal approach). Do NOT give diuretics. Fluid load to maintain preload. Call cardiology/surgery." },
    { step: "Pleural Effusion & Lung", view: "Posterior / lateral", look: "Anechoic fluid above diaphragm. Consolidated lung (tissue-like appearance). B-lines (vertical comet-tail artefacts from pleura = interstitial oedema — ≥3 per field is abnormal).", action: "Large effusion + respiratory failure: drain. B-lines: diuresis if cardiogenic. Consolidation: antibiotics. Absent lung sliding: pneumothorax." },
    { step: "Aorta", view: "PLAX / Subcostal / Suprasternal", look: "Aortic root dilatation (>4.0 cm). Dissection flap (intimal flap in ascending/descending aorta). Aortic regurgitation (colour Doppler).", action: "Dissection flap: urgent CT aortogram, BP control (esmolol/labetalol), call cardiothoracic surgery. Type A = surgical emergency." },
  ];

  return (
    <div className="my-6 p-4 bg-muted/30 rounded-xl border border-border">
      <h3 className="text-lg font-bold text-foreground mb-1">Echocardiography for Anaesthesia & ICU</h3>
      <p className="text-sm text-muted-foreground mb-4">Standard views, key measurements, and focused echo in shock</p>

      <Tabs defaultValue="views" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="views" className="text-xs">Standard Views</TabsTrigger>
          <TabsTrigger value="measurements" className="text-xs">Measurements</TabsTrigger>
          <TabsTrigger value="fuse" className="text-xs">FUSE Protocol</TabsTrigger>
        </TabsList>

        <TabsContent value="views">
          <div className="grid grid-cols-2 gap-1.5 mb-3">
            {views.map((v) => (
              <button
                key={v.id}
                onClick={() => setSelectedView(selectedView === v.id ? null : v.id)}
                className={`p-2 rounded-lg border text-left transition-all text-xs ${selectedView === v.id ? "border-primary bg-primary/10 ring-1 ring-primary" : "border-border hover:border-primary/50"}`}
              >
                <span className="font-bold text-foreground">{v.name}</span>
                <p className="text-muted-foreground mt-0.5 text-[10px]">{v.full}</p>
              </button>
            ))}
          </div>

          {selectedView && (() => {
            const v = views.find((x) => x.id === selectedView)!;
            return (
              <div className="animate-fade-in space-y-3">
                <div className="bg-background rounded-lg border border-border p-2">{v.svg}</div>
                <div className="p-3 rounded-lg border border-primary/30 bg-primary/5 text-xs space-y-2">
                  <p className="font-bold text-foreground text-sm">{v.full} ({v.name})</p>
                  <div className="p-2 rounded bg-background border border-border">
                    <span className="font-semibold text-foreground">Probe position: </span>
                    <span className="text-muted-foreground">{v.probe}</span>
                  </div>
                  <div className="p-2 rounded bg-background border border-border">
                    <span className="font-semibold text-foreground">Structures: </span>
                    <span className="text-muted-foreground">{v.structures}</span>
                  </div>
                  <div className="p-2 rounded bg-background border border-border">
                    <span className="font-semibold text-foreground">Measurements: </span>
                    <span className="text-muted-foreground">{v.measures}</span>
                  </div>
                  <div className="p-2 rounded bg-primary/10 border border-primary/20">
                    <span className="font-semibold text-foreground">Pathology: </span>
                    <span className="text-muted-foreground">{v.pathology}</span>
                  </div>
                </div>
              </div>
            );
          })()}

          {!selectedView && (
            <div className="p-3 rounded bg-primary/5 border border-primary/20 text-xs text-muted-foreground">
              <strong className="text-foreground">Echo windows: </strong>
              Parasternal views use the cardiac notch (lung-free zone). Apical views: patient must be in left lateral decubitus. Subcostal: best window in ventilated/obese patients (liver as acoustic window). Always adjust gain, depth, and sector width before assessing.
            </div>
          )}
        </TabsContent>

        <TabsContent value="measurements">
          <p className="text-xs text-muted-foreground mb-3">Core quantitative measurements — tap for method and grading</p>
          <div className="grid grid-cols-2 gap-1.5 mb-3">
            {measurements.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedMeasurement(selectedMeasurement === m.id ? null : m.id)}
                className={`p-2 rounded-lg border text-left transition-all text-xs ${selectedMeasurement === m.id ? "border-primary bg-primary/10 ring-1 ring-primary" : "border-border hover:border-primary/50"}`}
              >
                <span className="font-bold text-foreground">{m.name}</span>
                <p className="text-muted-foreground mt-0.5 text-[10px]">{m.full}</p>
                <p className="text-primary text-[10px] font-semibold mt-0.5">Normal: {m.normal}</p>
              </button>
            ))}
          </div>

          {selectedMeasurement && (() => {
            const m = measurements.find((x) => x.id === selectedMeasurement)!;
            return (
              <div className="p-3 rounded-lg border border-primary/30 bg-primary/5 animate-fade-in text-xs space-y-2">
                <p className="font-bold text-foreground text-sm">{m.name} — {m.full}</p>
                <div className="p-2 rounded bg-background border border-border">
                  <span className="font-semibold text-foreground">How to measure: </span>
                  <span className="text-muted-foreground">{m.method}</span>
                </div>
                <div className="p-2 rounded bg-background border border-border">
                  <span className="font-semibold text-foreground">Grading: </span>
                  <span className="text-muted-foreground">{m.grades}</span>
                </div>
                <div className="p-2 rounded bg-primary/10 border border-primary/20">
                  <span className="font-semibold text-foreground">Clinical significance: </span>
                  <span className="text-muted-foreground">{m.clinical}</span>
                </div>
              </div>
            );
          })()}
        </TabsContent>

        <TabsContent value="fuse">
          <p className="text-xs text-muted-foreground mb-1 font-semibold">Focused Ultrasound in Shock & Emergencies</p>
          <p className="text-xs text-muted-foreground mb-3">Systematic 6-step protocol — identify the cause of shock at the bedside in &lt;5 minutes</p>

          <div className="space-y-2">
            {fuseSteps.map((s, i) => (
              <button
                key={i}
                onClick={() => setSelectedFUSE(selectedFUSE === i ? null : i)}
                className={`w-full text-left transition-all ${selectedFUSE === i ? "ring-1 ring-primary" : ""}`}
              >
                <div className={`p-3 rounded-lg border ${selectedFUSE === i ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"}`}>
                  <div className="flex items-center gap-2">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center text-xs font-bold text-primary">{i + 1}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-foreground text-sm">{s.step}</p>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{s.view}</span>
                      </div>
                    </div>
                  </div>
                  {selectedFUSE === i && (
                    <div className="mt-2 ml-8 space-y-1.5 animate-fade-in text-xs">
                      <p className="text-muted-foreground"><strong className="text-foreground">Look for:</strong> {s.look}</p>
                      <div className="p-2 rounded bg-primary/10 border border-primary/20">
                        <span className="font-semibold text-foreground">Action: </span>
                        <span className="text-muted-foreground">{s.action}</span>
                      </div>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          <div className="mt-3 p-2 rounded bg-primary/5 border border-primary/20 text-xs text-muted-foreground">
            <strong className="text-foreground">FATE protocol (Focus Assessed Transthoracic Echo): </strong>
            4 views in &lt;2 minutes: subcostal 4C → A4C → PLAX → pleural. Answers: Is there a pericardial effusion? Is LV/RV severely impaired? Is the patient severely hypovolaemic? Any pleural effusion? Level 1 echo competence — all anaesthetists/intensivists should achieve.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EchoDiagram;

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DiagramFigure } from "./_shared/DiagramFigure";

type TOEView = {
  id: string;
  name: string;
  short: string;
  depth: "ME" | "TG" | "UE";
  angle: string;
  depthCm: string;
  structures: string;
  measures: string;
  pearls: string;
};

const TOEViewsDiagram = () => {
  const [selectedView, setSelectedView] = useState<string | null>("me-4c");
  const [selectedIndication, setSelectedIndication] = useState<number | null>(null);

  // 11 standard ASE/SCA views — Mid-oesophageal (ME), Transgastric (TG), Upper-oesophageal (UE)
  const views: TOEView[] = [
    {
      id: "me-4c",
      name: "ME 4-Chamber",
      short: "ME 4C",
      depth: "ME",
      angle: "0°",
      depthCm: "30–35 cm",
      structures: "All four chambers, MV (anterior + posterior leaflets — A2/A3, P2/P3 segments), TV (septal + lateral leaflets), IAS, IVS, LV apex (often foreshortened — retroflex probe to optimise).",
      measures: "LVEF (Simpson's biplane), MV inflow E/A, TV annular plane (TAPSE-equivalent), TR jet for PASP, RV size and function, IAS Doppler for ASD/PFO.",
      pearls: "Foundation view. Withdraw or anteflex slightly to avoid coronary sinus contamination. If LV apex foreshortened — advance probe and retroflex. Equivalent to TTE A4C but with reversed left/right orientation on screen (RV appears on left).",
    },
    {
      id: "me-2c",
      name: "ME 2-Chamber",
      short: "ME 2C",
      depth: "ME",
      angle: "60–90°",
      depthCm: "30–35 cm",
      structures: "LV (anterior + inferior walls), LA, LAA (left atrial appendage — best view for thrombus before cardioversion / pre-AF ablation), MV (A1/P3 segments — bicommissural view at 60°).",
      measures: "LV inferior wall motion (RCA territory), LAA emptying velocity (PW Doppler — <40 cm/s = ↑ thromboembolic risk), MV scallop assessment.",
      pearls: "LAA inspection mandatory before DCCV in AF >48 hours. LAA thrombus appears as echodensity within trabeculations — distinguish from pectinate muscles. Use multiplane sweep 0→180° through LAA.",
    },
    {
      id: "me-lax",
      name: "ME Long Axis",
      short: "ME LAX",
      depth: "ME",
      angle: "120–140°",
      depthCm: "30–35 cm",
      structures: "LVOT, AV (RCC + NCC), aortic root, ascending aorta, LV (anteroseptal + inferolateral walls), MV (A2 + P2 segments — central scallops).",
      measures: "LVOT diameter (for stroke volume calculation: SV = LVOT area × LVOT VTI). Aortic root + sinotubular junction diameter. AR severity (vena contracta, pressure half-time). MR mechanism — Carpentier classification.",
      pearls: "Equivalent to TTE PLAX. Best view for AV morphology, AR jet quantification, and LVOT VTI for cardiac output. In MR: mechanism (leaflet prolapse, restriction, perforation) and direction of jet guide repair vs replacement.",
    },
    {
      id: "me-mc",
      name: "ME Mitral Commissural",
      short: "ME MC",
      depth: "ME",
      angle: "60°",
      depthCm: "30–35 cm",
      structures: "MV from above showing P3–A2–P1 scallops (medial to lateral). Posteromedial and anterolateral commissures. Papillary muscles in cross-section.",
      measures: "Scallop-by-scallop assessment of MV. 3D zoom for en-face 'surgeon's view'. Identification of prolapsed/flail scallop — critical for MV repair planning.",
      pearls: "P2 prolapse most common (60%). 'Smiley face' appearance. Sweep 0→180° centred on MV: 0° (4C, A3/A2 + P1), 60° (commissural, P3-A2-P1), 90° (2C, A2/P3), 120° (LAX, A2/P2). 3D TOE has revolutionised MV repair planning.",
    },
    {
      id: "me-av-sax",
      name: "ME AV Short Axis",
      short: "ME AV SAX",
      depth: "ME",
      angle: "30–45°",
      depthCm: "30 cm",
      structures: "Aortic valve en face — 3 cusps (right coronary, left coronary, non-coronary). 'Mercedes-Benz' sign in tricuspid AV. Coronary ostia (LMS at 4 o'clock, RCA at 11 o'clock).",
      measures: "AV planimetry (severe AS <1.0 cm²). Cusp number (bicuspid vs tricuspid). Vegetation, calcification, prolapse. Coronary ostia patency post AV replacement.",
      pearls: "Bicuspid AV (1–2% population) — 'fish-mouth' opening, raphe between fused cusps. Type 1 (R-L fusion 70%), Type 0 (true bicuspid 5%). Associated with aortopathy — image entire ascending aorta.",
    },
    {
      id: "me-av-lax",
      name: "ME AV Long Axis",
      short: "ME AV LAX",
      depth: "ME",
      angle: "120–140°",
      depthCm: "30 cm",
      structures: "AV in long axis (RCC anterior, NCC posterior — LCC not seen), aortic root (annulus → sinuses of Valsalva → STJ → ascending aorta), LVOT, anterior MV leaflet.",
      measures: "Annulus (for TAVI sizing), sinus of Valsalva, STJ, ascending aorta diameters. AR vena contracta. AV cusp coaptation. Sub-aortic membrane.",
      pearls: "Critical for TAVI annular sizing (3D measurement from this plane). Acute aortic dissection — intimal flap, true vs false lumen. Aortic root abscess (perivalvular cavity) in IE.",
    },
    {
      id: "me-bicaval",
      name: "ME Bicaval",
      short: "ME Bicaval",
      depth: "ME",
      angle: "90–110°",
      depthCm: "30–35 cm",
      structures: "RA, IAS (full length — best ASD detection view), SVC (right) and IVC (left) entering RA. Eustachian valve (IVC), Chiari network. Crista terminalis. RA appendage.",
      measures: "ASD size and rims (for percutaneous closure). PFO detection (bubble study with Valsalva — early bubbles in LA = PFO). SVC/IVC cannulation guidance for cardiopulmonary bypass.",
      pearls: "Best view for IAS pathology — secundum ASD (most common), sinus venosus ASD (rare, near SVC), PFO. Bubble study: agitated saline IV → look for early (<3 cardiac cycles) bubbles in LA. Cor triatriatum membrane visible here.",
    },
    {
      id: "me-rv-inflow-outflow",
      name: "ME RV Inflow–Outflow",
      short: "ME RV I-O",
      depth: "ME",
      angle: "60–90°",
      depthCm: "30 cm",
      structures: "RA → TV → RV → RVOT → PV → main PA. 'Wraparound' view of right heart. AV in cross-section centrally. Septal + anterior TV leaflets.",
      measures: "TR jet (PASP). PV stenosis/regurgitation. RVOT VTI (alternative SV measurement). PE thrombus in main PA (proximal saddle embolus).",
      pearls: "Only view showing TV, RV, PV, and PA together. Acute massive PE: dilated RV, McConnell's sign, visible thrombus in PA. Carcinoid heart: thickened restricted TV + PV.",
    },
    {
      id: "tg-mid-sax",
      name: "TG Mid SAX",
      short: "TG mid-SAX",
      depth: "TG",
      angle: "0°",
      depthCm: "40–45 cm",
      structures: "LV doughnut at mid-papillary level. Both papillary muscles (anterolateral + posteromedial). 6 LV segments — coronary territories visible (anterior LAD, lateral LCx, inferior RCA, septal LAD).",
      measures: "Real-time RWMA monitoring intraoperatively (most useful TOE view in cardiac surgery). LV preload (end-diastolic area), contractility (fractional area change). Pericardial effusion.",
      pearls: "The most valuable single TOE view in the OR — real-time detection of new RWMA = ischaemia. Advance probe from ME, anteflex, 0° rotation. Empty 'kissing papillaries' = severe hypovolaemia. D-shaped septum = RV pressure/volume overload.",
    },
    {
      id: "tg-lax",
      name: "TG Long Axis",
      short: "TG LAX",
      depth: "TG",
      angle: "90–120°",
      depthCm: "40–45 cm",
      structures: "LV in long axis, LVOT, AV — Doppler beam parallel to flow through LVOT/AV.",
      measures: "AV peak gradient (best Doppler alignment for AS — Vmax × 4 = peak gradient). LVOT VTI for stroke volume / cardiac output. Continuity equation for AVA: AVA = (LVOT area × LVOT VTI) / AV VTI.",
      pearls: "Essential for accurate AV gradient measurement — only TOE view with parallel Doppler alignment to AV. Deep TG view (advance probe further) gives similar alignment. Severe AS: Vmax >4 m/s, mean gradient >40 mmHg, AVA <1.0 cm².",
    },
    {
      id: "ue-aortic-arch",
      name: "UE Aortic Arch",
      short: "UE Arch",
      depth: "UE",
      angle: "0° (LAX) / 90° (SAX)",
      depthCm: "20–25 cm",
      structures: "Aortic arch, brachiocephalic, L common carotid, L subclavian arteries (origins). Main PA in SAX (90°). Left innominate vein.",
      measures: "Arch atheroma (grade I–V — grade IV/V is mobile, embolic risk in cardiac surgery → off-pump or epi-aortic scan). Arch dissection. Aneurysm.",
      pearls: "Withdraw probe from ME. Distal ascending aorta has 'blind spot' (interposed trachea/L main bronchus). Severe atheroma changes operative plan — avoid aortic cross-clamp at affected site.",
    },
  ];

  const indications = [
    { cat: "Class I (strong)", items: ["Cardiac surgery — valve repair/replacement, congenital, aortic surgery, HOCM septal myectomy", "Catheter-based intracardiac procedures — TAVI, MitraClip, ASD/PFO/LAA closure, transseptal puncture", "Persistent unexplained haemodynamic instability when TTE inadequate", "Suspected acute aortic syndrome (dissection, intramural haematoma)", "Suspected infective endocarditis with negative/inconclusive TTE"] },
    { cat: "Class IIa (reasonable)", items: ["Routine intraoperative monitoring during high-risk non-cardiac surgery (liver transplant, major vascular)", "Pre-cardioversion in AF >48 h (rule out LAA thrombus)", "Source of embolus investigation (cryptogenic stroke — PFO, LAA, aortic atheroma)", "Cardiac trauma assessment"] },
    { cat: "Contraindications", items: ["Absolute: oesophageal stricture, perforation, recent oesophageal/gastric surgery, active upper GI bleed", "Relative: oesophageal varices, large hiatus hernia, severe coagulopathy, unstable cervical spine", "Always: informed consent, NBM 6 h, dental check, suction, bite block, monitoring"] },
    { cat: "Complications (~0.2%)", items: ["Oropharyngeal trauma (most common)", "Dental damage", "Oesophageal perforation (0.01–0.09% — high mortality)", "Bleeding (varices)", "Vocal cord injury, dysphagia (transient)", "Arrhythmias, hypotension during insertion"] },
  ];

  const probeManoeuvres = [
    { name: "Advance / Withdraw", icon: "↕", desc: "Push probe deeper (advance) or pull out (withdraw) — moves imaging plane caudally/cranially through chambers." },
    { name: "Turn (rotate shaft)", icon: "↻", desc: "Rotate entire probe shaft clockwise (right-sided structures) or anticlockwise (left-sided structures)." },
    { name: "Anteflex / Retroflex", icon: "⌒", desc: "Large wheel — flexes probe tip towards anterior (anteflex) or posterior (retroflex) chest. Optimises near-field." },
    { name: "Flex left / right", icon: "⇄", desc: "Small wheel — lateral flexion of tip. Used to centre off-axis structures." },
    { name: "Multiplane angle (ω)", icon: "0–180°", desc: "Electronic rotation of imaging array. 0° = transverse (4-chamber). 90° = orthogonal. 180° = mirrored transverse. Sweep through structures of interest." },
  ];

  const groupedViews = {
    ME: views.filter((v) => v.depth === "ME"),
    TG: views.filter((v) => v.depth === "TG"),
    UE: views.filter((v) => v.depth === "UE"),
  };

  // Visual: oesophagus + heart cross-section showing probe depth zones
  const ProbePositionDiagram = () => {
    const v = views.find((x) => x.id === selectedView);
    const depth = v?.depth ?? "ME";
    return (
      <svg viewBox="0 0 400 280" className="w-full h-auto">
        <defs>
          <linearGradient id="oesoph-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--muted))" stopOpacity="0.5" />
            <stop offset="100%" stopColor="hsl(var(--muted))" stopOpacity="0.2" />
          </linearGradient>
          <radialGradient id="heart-grad" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="hsl(var(--icu) / 0.35)" />
            <stop offset="100%" stopColor="hsl(var(--icu) / 0.15)" />
          </radialGradient>
        </defs>

        {/* Trachea + lungs background */}
        <ellipse cx="120" cy="60" rx="55" ry="80" fill="hsl(var(--muted))" opacity="0.18" />
        <ellipse cx="280" cy="60" rx="55" ry="80" fill="hsl(var(--muted))" opacity="0.18" />
        <text x="80" y="40" fontSize="8" fill="hsl(var(--muted-foreground))">R lung</text>
        <text x="305" y="40" fontSize="8" fill="hsl(var(--muted-foreground))">L lung</text>

        {/* Oesophagus — vertical tube */}
        <path d="M 195,15 Q 198,80 200,150 Q 202,210 200,265" fill="none" stroke="hsl(var(--border))" strokeWidth="3" strokeLinecap="round" />
        <path d="M 195,15 Q 198,80 200,150 Q 202,210 200,265" fill="none" stroke="url(#oesoph-grad)" strokeWidth="3" strokeLinecap="round" />

        {/* Depth zone markers */}
        <g fontSize="7" fill="hsl(var(--muted-foreground))">
          <line x1="155" y1="50" x2="185" y2="50" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="2 2" />
          <text x="150" y="53" textAnchor="end">UE  20–25 cm</text>

          <line x1="155" y1="130" x2="185" y2="130" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="2 2" />
          <text x="150" y="133" textAnchor="end">ME  30–35 cm</text>

          <line x1="155" y1="220" x2="185" y2="220" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="2 2" />
          <text x="150" y="223" textAnchor="end">TG  40–45 cm</text>
        </g>

        {/* Heart silhouette */}
        <path d="M 215,90 Q 270,85 305,115 Q 320,160 295,210 Q 250,235 215,225 Q 200,200 205,170 Q 200,130 215,90 Z" fill="url(#heart-grad)" stroke="hsl(var(--icu))" strokeWidth="1" opacity="0.85" />
        <text x="265" y="155" fontSize="10" fill="hsl(var(--icu))" fontWeight="700" textAnchor="middle">HEART</text>

        {/* Diaphragm */}
        <path d="M 50,235 Q 200,250 350,235" fill="none" stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="4 3" />
        <text x="55" y="248" fontSize="7" fill="hsl(var(--muted-foreground))">diaphragm</text>

        {/* Stomach (TG) */}
        <ellipse cx="235" cy="255" rx="35" ry="14" fill="hsl(var(--muted))" opacity="0.25" stroke="hsl(var(--border))" strokeWidth="0.5" />
        <text x="235" y="259" fontSize="7" fill="hsl(var(--muted-foreground))" textAnchor="middle">stomach</text>

        {/* Active probe tip — moves with selected view */}
        {(() => {
          const y = depth === "UE" ? 50 : depth === "ME" ? 130 : 220;
          return (
            <g>
              <circle cx="200" cy={y} r="8" fill="hsl(var(--primary))" opacity="0.3">
                <animate attributeName="r" values="8;14;8" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="200" cy={y} r="5" fill="hsl(var(--primary))" />
              <line x1="200" y1={y} x2="240" y2={y - 5} stroke="hsl(var(--primary))" strokeWidth="0.5" strokeDasharray="2 1" opacity="0.7" />
              <line x1="200" y1={y} x2="245" y2={y + 18} stroke="hsl(var(--primary))" strokeWidth="0.5" strokeDasharray="2 1" opacity="0.7" />
              <text x="178" y={y + 2} fontSize="7" fill="hsl(var(--primary))" fontWeight="700" textAnchor="end">{depth}</text>
            </g>
          );
        })()}

        {/* Multiplane angle indicator */}
        {v && (
          <g transform="translate(345,260)">
            <circle r="20" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" />
            <line x1="-20" y1="0" x2="20" y2="0" stroke="hsl(var(--border))" strokeWidth="0.5" />
            {(() => {
              // parse first numeric angle from string like "60–90°" or "0°"
              const m = v.angle.match(/(\d+)/);
              const ang = m ? parseInt(m[1]) : 0;
              const rad = (ang * Math.PI) / 180;
              const x2 = Math.cos(rad - Math.PI / 2) * 18;
              const y2 = Math.sin(rad - Math.PI / 2) * 18;
              return <line x1="0" y1="0" x2={x2} y2={y2} stroke="hsl(var(--primary))" strokeWidth="1.5" />;
            })()}
            <text x="0" y="36" fontSize="6" fill="hsl(var(--muted-foreground))" textAnchor="middle">ω = {v.angle}</text>
          </g>
        )}

        <text x="200" y="278" fontSize="7" fill="hsl(var(--muted-foreground))" textAnchor="middle" fontStyle="italic">Probe trajectory through oesophagus & stomach</text>
      </svg>
    );
  };

  return (
    <div className="my-6 p-4 bg-muted/30 rounded-xl border border-border">
      <h3 className="text-lg font-bold text-foreground mb-1">TOE — 11 Standard Views</h3>
      <p className="text-sm text-muted-foreground mb-4">Mid-oesophageal, transgastric & upper-oesophageal — ASE/SCA basic perioperative TOE</p>

      <Tabs defaultValue="views" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="views" className="text-xs">Standard Views</TabsTrigger>
          <TabsTrigger value="manoeuvres" className="text-xs">Probe Manoeuvres</TabsTrigger>
          <TabsTrigger value="indications" className="text-xs">Indications</TabsTrigger>
        </TabsList>

        <TabsContent value="views">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-3">
            {/* Left: probe diagram + view list */}
            <div className="space-y-3">
              <div className="bg-background rounded-lg border border-border p-2">
                <ProbePositionDiagram />
              </div>

              {(["ME", "TG", "UE"] as const).map((group) => (
                <div key={group}>
                  <p className="text-[11px] font-bold text-foreground mb-1.5 uppercase tracking-wider">
                    {group === "ME" ? "Mid-Oesophageal" : group === "TG" ? "Transgastric" : "Upper-Oesophageal"} ({groupedViews[group].length})
                  </p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {groupedViews[group].map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setSelectedView(v.id)}
                        className={`p-2 rounded-lg border text-left transition-all text-[11px] ${selectedView === v.id ? "border-primary bg-primary/10 ring-1 ring-primary" : "border-border hover:border-primary/50"}`}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-bold text-foreground">{v.short}</span>
                          <span className="text-[9px] px-1 py-0.5 rounded bg-muted text-muted-foreground">{v.angle}</span>
                        </div>
                        <p className="text-muted-foreground text-[10px] mt-0.5">{v.depthCm}</p>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Right: detail panel */}
            <div>
              {selectedView && (() => {
                const v = views.find((x) => x.id === selectedView)!;
                return (
    <DiagramFigure
      id="toe-views-diagram"
      title="Toe views"
      description="Auto-generated wrapper for the Toe views anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
                        <div className="p-3 rounded-lg border border-primary/30 bg-primary/5 text-xs space-y-2 animate-fade-in sticky top-4">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-bold text-foreground text-sm">{v.name}</p>
                          <p className="text-[10px] text-muted-foreground">
                            {v.depth === "ME" ? "Mid-oesophageal" : v.depth === "TG" ? "Transgastric" : "Upper-oesophageal"} · depth {v.depthCm} · multiplane {v.angle}
                          </p>
                        </div>
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
                        <span className="font-semibold text-foreground">Clinical pearls: </span>
                        <span className="text-muted-foreground">{v.pearls}</span>
                      </div>
                    </div>
    </DiagramFigure>
  );
              })()}
            </div>
          </div>

          <div className="mt-3 p-2 rounded bg-primary/5 border border-primary/20 text-xs text-muted-foreground">
            <strong className="text-foreground">Standard sweep: </strong>
            ASE/SCA recommend a systematic 11-view sweep. Begin ME 4C (0°) → rotate multiplane through 60° (commissural / 2C) → 90° (bicaval, RV inflow-outflow) → 120° (LAX) → withdraw to AV SAX/LAX → advance to TG mid-SAX → TG LAX → withdraw fully to UE arch. Always image the entire thoracic aorta (ascending, arch, descending) before completing the study.
          </div>
        </TabsContent>

        <TabsContent value="manoeuvres">
          <p className="text-xs text-muted-foreground mb-3">Five degrees of freedom — combine to sweep through any structure</p>
          <div className="space-y-2">
            {probeManoeuvres.map((m) => (
              <div key={m.name} className="p-3 rounded-lg border border-border bg-background flex items-start gap-3">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                  {m.icon}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-foreground text-sm">{m.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 p-3 rounded-lg border border-primary/20 bg-primary/5 text-xs text-muted-foreground space-y-2">
            <p><strong className="text-foreground">Multiplane sweep technique: </strong>Park the probe at the structure of interest (e.g. MV at ME depth), keep position fixed, then rotate the multiplane angle 0° → 180° using the buttons on the handle. The imaging array rotates electronically inside the probe tip — no need to physically move the probe. This sweeps through orthogonal planes of the same structure.</p>
            <p><strong className="text-foreground">3D TOE: </strong>Modern matrix-array probes acquire volumetric data. 'Live 3D' for real-time MV repair guidance, '3D zoom' for surgeon's-eye view of the MV, 'full-volume' for LV quantification. Has transformed structural heart interventions (TAVI, MitraClip, LAA closure).</p>
          </div>
        </TabsContent>

        <TabsContent value="indications">
          <p className="text-xs text-muted-foreground mb-3">ASE/SCA 2010 + ESC 2017 — perioperative TOE indications</p>
          <div className="space-y-2">
            {indications.map((ind, i) => (
              <button
                key={i}
                onClick={() => setSelectedIndication(selectedIndication === i ? null : i)}
                className={`w-full text-left transition-all ${selectedIndication === i ? "ring-1 ring-primary" : ""}`}
              >
                <div className={`p-3 rounded-lg border ${selectedIndication === i ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"}`}>
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-foreground text-sm">{ind.cat}</p>
                    <span className="text-[10px] text-muted-foreground">{ind.items.length} items</span>
                  </div>
                  {selectedIndication === i && (
                    <ul className="mt-2 space-y-1 animate-fade-in">
                      {ind.items.map((item, j) => (
                        <li key={j} className="text-xs text-muted-foreground flex gap-2">
                          <span className="text-primary flex-shrink-0">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </button>
            ))}
          </div>

          <div className="mt-3 p-3 rounded-lg border border-primary/20 bg-primary/5 text-xs text-muted-foreground">
            <strong className="text-foreground">Operator competence: </strong>
            UK: Accreditation in Transoesophageal Echocardiography (ACTA/BSE) — minimum 125 supervised studies + logbook + written and practical exams. US: NBE Advanced PTEeXAM. Basic perioperative TOE (intraoperative monitoring) requires fewer studies than comprehensive TOE (diagnostic). Always inform patient of risks and obtain consent (or document urgency if unable).
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TOEViewsDiagram;

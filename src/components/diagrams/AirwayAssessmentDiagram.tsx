import { useState } from "react";

type Tab = "mallampati" | "predictors" | "fona-anatomy";

const tabs: { key: Tab; label: string }[] = [
  { key: "mallampati", label: "Mallampati" },
  { key: "predictors", label: "Predictors" },
  { key: "fona-anatomy", label: "FONA Anatomy" },
];

const MallampatiDiagram = () => {
  const [selected, setSelected] = useState(0);

  const classes = [
    { grade: "I", label: "Class I", structures: "Soft palate, fauces, uvula, pillars", intubation: "Easy — full glottic view expected", color: "hsl(150, 60%, 45%)" },
    { grade: "II", label: "Class II", structures: "Soft palate, fauces, upper uvula", intubation: "Usually straightforward", color: "hsl(50, 70%, 50%)" },
    { grade: "III", label: "Class III", structures: "Soft palate, base of uvula only", intubation: "Moderate difficulty predicted", color: "hsl(25, 80%, 50%)" },
    { grade: "IV", label: "Class IV", structures: "Hard palate only", intubation: "Difficult intubation likely", color: "hsl(0, 70%, 50%)" },
  ];

  const c = classes[selected];

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {classes.map((cl, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`flex-1 px-2 py-2 rounded-lg text-xs font-bold transition-all ${
              selected === i ? "text-primary-foreground" : "bg-secondary text-muted-foreground hover:bg-secondary/80"
            }`}
            style={selected === i ? { backgroundColor: cl.color } : {}}
          >
            {cl.label}
          </button>
        ))}
      </div>

      <div className="bg-secondary/30 rounded-xl p-4 border border-border">
        <svg viewBox="0 0 300 220" className="w-full max-w-[300px] mx-auto h-auto">
          {/* Mouth opening */}
          <ellipse cx={150} cy={100} rx={70} ry={90} fill="hsl(var(--secondary))" stroke="hsl(var(--foreground))" strokeWidth="2" />
          {/* Inner mouth */}
          <ellipse cx={150} cy={105} rx={55} ry={72} fill="hsl(0, 20%, 15%)" />

          {/* Teeth - upper */}
          <rect x={100} y={30} width={100} height={10} rx={3} fill="hsl(var(--background))" stroke="hsl(var(--foreground))" strokeWidth="1" />
          {/* Teeth - lower */}
          <rect x={100} y={178} width={100} height={10} rx={3} fill="hsl(var(--background))" stroke="hsl(var(--foreground))" strokeWidth="1" />

          {/* Tongue */}
          {selected <= 1 && (
            <ellipse cx={150} cy={160} rx={40} ry={selected === 0 ? 18 : 25} fill="hsl(0, 40%, 55%)" opacity="0.7" />
          )}
          {selected === 2 && (
            <ellipse cx={150} cy={145} rx={45} ry={35} fill="hsl(0, 40%, 55%)" opacity="0.7" />
          )}
          {selected === 3 && (
            <ellipse cx={150} cy={130} rx={48} ry={50} fill="hsl(0, 40%, 55%)" opacity="0.8" />
          )}

          {/* Hard palate */}
          <path d="M 100 45 Q 150 55 200 45" fill="none" stroke="hsl(var(--foreground)/0.5)" strokeWidth="1.5" />
          <text x={150} y={58} textAnchor="middle" className="fill-muted-foreground text-[7px]">Hard palate</text>

          {/* Soft palate - visible in I, II, III */}
          {selected <= 2 && (
            <>
              <path d={`M 105 62 Q 150 ${selected === 0 ? 80 : selected === 1 ? 75 : 70} 195 62`} fill="hsl(350, 50%, 65%)" fillOpacity="0.5" stroke="hsl(var(--foreground)/0.4)" strokeWidth="1" />
              <text x={150} y={72} textAnchor="middle" className="fill-foreground text-[7px]">Soft palate</text>
            </>
          )}

          {/* Uvula */}
          {selected === 0 && (
            <>
              <ellipse cx={150} cy={100} rx={6} ry={14} fill="hsl(350, 60%, 60%)" />
              <text x={170} y={100} textAnchor="start" className="fill-foreground text-[7px]">Uvula</text>
            </>
          )}
          {selected === 1 && (
            <>
              <ellipse cx={150} cy={92} rx={5} ry={10} fill="hsl(350, 60%, 60%)" />
              <text x={168} y={92} textAnchor="start" className="fill-muted-foreground text-[7px]">Partial uvula</text>
            </>
          )}

          {/* Tonsillar pillars - visible in I */}
          {selected === 0 && (
            <>
              <line x1={118} y1={75} x2={118} y2={120} stroke="hsl(350, 50%, 60%)" strokeWidth="3" />
              <line x1={182} y1={75} x2={182} y2={120} stroke="hsl(350, 50%, 60%)" strokeWidth="3" />
              <text x={105} y={100} textAnchor="end" className="fill-foreground text-[6px]">Pillars</text>
            </>
          )}

          {/* Grade label */}
          <text x={150} y={210} textAnchor="middle" className="fill-foreground text-[11px] font-bold">{c.label}</text>
        </svg>

        <div className="mt-3 space-y-1">
          <p className="text-xs font-medium text-foreground">Visible structures: {c.structures}</p>
          <p className="text-xs" style={{ color: c.color }}><strong>{c.intubation}</strong></p>
        </div>
      </div>

      <div className="rounded-lg bg-background/60 p-3 border border-border">
        <p className="text-xs font-bold text-foreground mb-1">Assessment Technique</p>
        <ul className="text-xs text-muted-foreground space-y-0.5">
          <li>• Patient sitting upright, mouth fully open, tongue protruded maximally</li>
          <li>• Examiner at eye level. No phonation (invalidates grading)</li>
          <li>• Class III/IV predicts difficult laryngoscopy (sensitivity ~60%, specificity ~70%)</li>
          <li>• Poor positive predictive value alone — combine with other predictors</li>
        </ul>
      </div>
    </div>
  );
};

const predictors = [
  {
    name: "Mallampati Score",
    test: "Mouth open, tongue out, no phonation",
    normal: "Class I–II",
    concern: "Class III–IV",
    notes: "Low sensitivity alone (~60%). Best combined with other tests.",
  },
  {
    name: "Thyromental Distance",
    test: "Mentum to thyroid notch, neck extended",
    normal: "≥ 6.5 cm (3 finger breadths)",
    concern: "< 6 cm",
    notes: "Short TMD = anterior larynx, reduced mandibular space for tongue displacement.",
  },
  {
    name: "Mouth Opening",
    test: "Inter-incisor distance (IID)",
    normal: "≥ 3 cm (2 finger breadths)",
    concern: "< 3 cm",
    notes: "Limited opening impairs laryngoscope and SAD insertion. Trismus = 0 cm.",
  },
  {
    name: "Upper Lip Bite Test",
    test: "Lower incisors bite upper lip",
    normal: "Class I (incisors cover lip fully)",
    concern: "Class III (cannot bite upper lip)",
    notes: "Tests mandibular protrusion (jaw subluxation). Better PPV than Mallampati alone.",
  },
  {
    name: "Neck Movement",
    test: "Atlanto-occipital extension",
    normal: "≥ 35° extension",
    concern: "< 20° or fixed flexion",
    notes: "Reduced in C-spine disease, ankylosing spondylitis, rheumatoid arthritis.",
  },
  {
    name: "Sternomental Distance",
    test: "Sternal notch to mentum, neck extended",
    normal: "≥ 12.5 cm",
    concern: "< 12.5 cm",
    notes: "Combines neck extension and mandibular length in one measurement.",
  },
  {
    name: "BMI / Neck Circumference",
    test: "Weight/height², neck tape measure",
    normal: "BMI < 30, neck < 40 cm",
    concern: "BMI > 35, neck > 43 cm",
    notes: "Obesity: ↑ soft tissue, ↓ FRC, rapid desaturation. Ramped position essential.",
  },
  {
    name: "Wilson Score",
    test: "5 risk factors scored 0–2 each",
    normal: "Score < 2",
    concern: "Score ≥ 2",
    notes: "Weight, head/neck movement, jaw movement, receding mandible, buck teeth. Max 10.",
  },
];

const PredictorsDiagram = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">
        No single test reliably predicts difficult intubation. Multivariate assessment improves sensitivity. Tap any predictor for detail.
      </p>
      <div className="space-y-2">
        {predictors.map((p, i) => (
          <button
            key={i}
            onClick={() => setExpanded(expanded === i ? null : i)}
            className="w-full text-left rounded-lg border border-border bg-secondary/20 hover:bg-secondary/40 transition-all p-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">{p.name}</span>
              <span className="text-xs text-muted-foreground">{expanded === i ? "▲" : "▼"}</span>
            </div>
            <div className="flex gap-4 mt-1">
              <span className="text-[10px] text-muted-foreground"><strong>Normal:</strong> {p.normal}</span>
              <span className="text-[10px] text-destructive"><strong>Concern:</strong> {p.concern}</span>
            </div>
            {expanded === i && (
              <div className="mt-2 pt-2 border-t border-border space-y-1 animate-fade-in">
                <p className="text-xs text-muted-foreground"><strong>Test:</strong> {p.test}</p>
                <p className="text-xs text-muted-foreground">{p.notes}</p>
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="rounded-lg bg-background/60 p-3 border border-border">
        <p className="text-xs font-bold text-foreground mb-1">El-Ganzouri Risk Index (EGRI)</p>
        <p className="text-xs text-muted-foreground">
          Combines 7 independent predictors (Mallampati, TMD, mouth opening, neck movement, jaw protrusion,
          BMI, previous difficult intubation). Score ≥ 4 has sensitivity ~65% for difficult intubation.
          Always assess for markers of difficult SAD placement and FONA access separately.
        </p>
      </div>
    </div>
  );
};

const FONAAnatomyDiagram = () => (
  <div className="space-y-4">
    <div className="bg-secondary/30 rounded-xl p-4 border border-border">
      <svg viewBox="0 0 360 320" className="w-full max-w-[360px] mx-auto h-auto">
        {/* Anterior neck - midline sagittal view */}
        {/* Skin outline */}
        <path d="M 100 20 Q 180 10 260 20 L 270 300 Q 180 310 90 300 Z" fill="hsl(var(--secondary)/0.3)" stroke="hsl(var(--foreground))" strokeWidth="2" />

        {/* Hyoid bone */}
        <rect x={130} y={50} width={100} height={12} rx={4} fill="hsl(var(--muted)/0.5)" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <text x={180} y={45} textAnchor="middle" className="fill-foreground text-[10px] font-bold">Hyoid bone</text>
        <text x={290} y={60} textAnchor="start" className="fill-muted-foreground text-[8px]">C3 level</text>
        <line x1={230} y1={56} x2={285} y2={56} stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" strokeDasharray="2 2" />

        {/* Thyrohyoid membrane */}
        <rect x={140} y={68} width={80} height={18} rx={2} fill="hsl(var(--accent)/0.15)" stroke="hsl(var(--accent)/0.4)" strokeWidth="1" strokeDasharray="3 2" />
        <text x={290} y={80} textAnchor="start" className="fill-accent text-[7px]">Thyrohyoid membrane</text>
        <line x1={220} y1={77} x2={285} y2={77} stroke="hsl(var(--accent)/0.4)" strokeWidth="0.5" strokeDasharray="2 2" />

        {/* Thyroid cartilage */}
        <path d="M 125 90 L 180 110 L 235 90 L 235 160 Q 180 170 125 160 Z" fill="hsl(var(--primary)/0.1)" stroke="hsl(var(--foreground))" strokeWidth="2" />
        <text x={180} y={135} textAnchor="middle" className="fill-foreground text-[10px] font-bold">Thyroid</text>
        <text x={180} y={148} textAnchor="middle" className="fill-foreground text-[10px] font-bold">cartilage</text>
        {/* Laryngeal prominence */}
        <circle cx={180} cy={105} r={4} fill="hsl(var(--primary)/0.3)" />
        <text x={290} y={107} textAnchor="start" className="fill-primary text-[7px]">Laryngeal prominence</text>
        <text x={290} y={117} textAnchor="start" className="fill-muted-foreground text-[7px]">(Adam's apple)</text>
        <line x1={184} y1={105} x2={285} y2={107} stroke="hsl(var(--primary)/0.4)" strokeWidth="0.5" strokeDasharray="2 2" />

        {/* ★ CRICOTHYROID MEMBRANE — the target */}
        <rect x={135} y={170} width={90} height={20} rx={3} fill="hsl(var(--destructive)/0.25)" stroke="hsl(var(--destructive))" strokeWidth="2.5" />
        <text x={180} y={184} textAnchor="middle" className="fill-destructive text-[9px] font-bold">CTM</text>
        {/* Label with arrow */}
        <line x1={225} y1={180} x2={280} y2={180} stroke="hsl(var(--destructive))" strokeWidth="1.5" />
        <text x={290} y={174} textAnchor="start" className="fill-destructive text-[9px] font-bold">Cricothyroid</text>
        <text x={290} y={185} textAnchor="start" className="fill-destructive text-[9px] font-bold">membrane</text>
        <text x={290} y={196} textAnchor="start" className="fill-destructive text-[7px]">FONA target site</text>
        {/* Dimensions */}
        <text x={90} y={184} textAnchor="end" className="fill-destructive text-[7px] font-bold">9×30mm</text>

        {/* Cricoid cartilage */}
        <rect x={130} y={196} width={100} height={22} rx={6} fill="hsl(var(--primary)/0.1)" stroke="hsl(var(--foreground))" strokeWidth="2" />
        <text x={180} y={212} textAnchor="middle" className="fill-foreground text-[10px] font-bold">Cricoid</text>
        <text x={290} y={210} textAnchor="start" className="fill-muted-foreground text-[8px]">C6 — Sellick's</text>
        <line x1={230} y1={207} x2={285} y2={208} stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" strokeDasharray="2 2" />

        {/* Tracheal rings */}
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={140} y={226 + i * 18} width={80} height={12} rx={4} fill="hsl(var(--muted)/0.3)" stroke="hsl(var(--foreground))" strokeWidth="1" />
        ))}
        <text x={180} y={278} textAnchor="middle" className="fill-muted-foreground text-[8px]">Tracheal rings</text>

        {/* Isthmus of thyroid gland */}
        <rect x={120} y={230} width={120} height={10} rx={3} fill="hsl(var(--accent)/0.2)" stroke="hsl(var(--accent))" strokeWidth="1" strokeDasharray="3 2" />
        <text x={60} y={238} textAnchor="end" className="fill-accent text-[7px]">Thyroid isthmus</text>
        <text x={60} y={248} textAnchor="end" className="fill-accent text-[6px]">(rings 2-4)</text>

        {/* Sternal notch */}
        <path d="M 130 300 Q 180 308 230 300" fill="none" stroke="hsl(var(--foreground))" strokeWidth="2" />
        <text x={180} y={318} textAnchor="middle" className="fill-muted-foreground text-[8px]">Sternal notch</text>
      </svg>
    </div>

    <div className="rounded-lg bg-background/60 p-3 border border-border">
      <p className="text-xs font-bold text-foreground mb-1">Cricothyroid Membrane (CTM)</p>
      <ul className="text-xs text-muted-foreground space-y-0.5">
        <li>• Dimensions: ~9 mm (height) × 30 mm (width) — relatively avascular midline</li>
        <li>• Bounded superiorly by thyroid cartilage, inferiorly by cricoid</li>
        <li>• Superior cricothyroid artery crosses the upper third — incise in lower ⅓</li>
        <li>• Palpable in ~70% of patients. Ultrasound improves identification (especially obese)</li>
        <li>• DAS technique: transverse stab incision → rotate scalpel 90° → bougie → 6.0 ETT</li>
      </ul>
    </div>

    <div className="rounded-lg bg-background/60 p-3 border border-border">
      <p className="text-xs font-bold text-destructive mb-1">⚠ Key Landmarks for Palpation</p>
      <ul className="text-xs text-muted-foreground space-y-0.5">
        <li>• <strong>Laryngeal handshake:</strong> stabilise thyroid cartilage between thumb & middle finger</li>
        <li>• <strong>Index finger</strong> identifies the CTM as a soft depression below thyroid cartilage</li>
        <li>• <strong>Obese / difficult anatomy:</strong> use ultrasound to mark CTM pre-induction</li>
        <li>• <strong>Children &lt;8 years:</strong> needle cricothyroidotomy preferred (CTM too small for surgical)</li>
      </ul>
    </div>
  </div>
);

const AirwayAssessmentDiagram = () => {
  const [activeTab, setActiveTab] = useState<Tab>("mallampati");

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.key
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:bg-secondary/80"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "mallampati" && <MallampatiDiagram />}
      {activeTab === "predictors" && <PredictorsDiagram />}
      {activeTab === "fona-anatomy" && <FONAAnatomyDiagram />}
    </div>
  );
};

export default AirwayAssessmentDiagram;

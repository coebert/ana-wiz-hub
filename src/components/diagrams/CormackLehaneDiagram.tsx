import { useState } from "react";

type Grade = "I" | "II" | "IIa" | "IIb" | "III" | "IV";

interface GradeInfo {
  label: string;
  description: string;
  incidence: string;
  difficulty: string;
  tips: string[];
}

const grades: Record<Grade, GradeInfo> = {
  I: {
    label: "Grade I",
    description: "Full view of the glottis — vocal cords completely visible",
    incidence: "~50% of intubations",
    difficulty: "Easy intubation",
    tips: ["Standard direct laryngoscopy sufficient", "ETT passes under direct vision through cords"],
  },
  II: {
    label: "Grade II",
    description: "Partial view of the glottis — posterior commissure or arytenoids visible",
    incidence: "~30% of intubations",
    difficulty: "Usually straightforward",
    tips: ["Optimise head position (sniffing/ramped)", "External laryngeal manipulation (BURP/bimanual)", "Consider bougie to aid intubation"],
  },
  IIa: {
    label: "Grade IIa (Yentis modification)",
    description: "Partial view — posterior part of cords visible",
    incidence: "Subset of Grade II",
    difficulty: "Easy — direct passage of ETT",
    tips: ["ETT can usually be passed under direct vision", "Bougie rarely needed"],
  },
  IIb: {
    label: "Grade IIb (Yentis modification)",
    description: "Only arytenoids or posterior commissure visible — no cord seen",
    incidence: "Subset of Grade II",
    difficulty: "Difficult — bougie recommended",
    tips: ["Bougie is the primary tool — pass anterior to arytenoids", "BURP manoeuvre by assistant", "Consider videolaryngoscope early"],
  },
  III: {
    label: "Grade III",
    description: "Only the epiglottis visible — no glottic structures seen",
    incidence: "~5–10% of intubations",
    difficulty: "Difficult intubation",
    tips: [
      "Bougie essential — slide under epiglottis, feel tracheal clicks",
      "Lift epiglottis directly with straight (Miller) blade",
      "Switch to videolaryngoscope (best evidence for improving view)",
      "Optimise: ear-to-sternal-notch alignment, ramped position in obese",
      "External laryngeal manipulation (backward-upward-rightward pressure)",
    ],
  },
  IV: {
    label: "Grade IV",
    description: "Neither epiglottis nor glottis visible — only soft palate/tongue",
    incidence: "<1% of intubations",
    difficulty: "Cannot intubate with direct laryngoscopy",
    tips: [
      "Follow DAS failed intubation algorithm — max 3+1 attempts",
      "Videolaryngoscope (may convert to Grade I/II view)",
      "Supraglottic airway device as rescue",
      "Fibreoptic intubation (awake if anticipated)",
      "Declare CICO early if ventilation also fails → front-of-neck access",
    ],
  },
};

const gradeOrder: Grade[] = ["I", "II", "IIa", "IIb", "III", "IV"];

const GlottisView = ({ grade, size = 140 }: { grade: Grade; size?: number }) => {
  const _half = size / 2;
  // All views are a circular laryngoscopic "port" view
  return (
    <svg viewBox="0 0 140 140" width={size} height={size}>
      {/* Laryngoscope view circle */}
      <circle cx="70" cy="70" r="66" fill="hsl(0, 15%, 18%)" stroke="hsl(0, 10%, 28%)" strokeWidth="3" />
      {/* Pharyngeal mucosal shading */}
      <circle cx="70" cy="70" r="64" fill="none" stroke="hsl(0, 20%, 25%)" strokeWidth="1" opacity="0.3" />

      {grade === "I" && (
        <g>
          {/* Epiglottis — lifted, visible at top */}
          <path d="M35,28 C45,20 60,16 70,15 C80,16 95,20 105,28 C100,32 85,35 70,36 C55,35 40,32 35,28Z"
            fill="hsl(350, 30%, 50%)" stroke="hsl(350, 25%, 40%)" strokeWidth="1" opacity="0.7" />
          <text x="70" y="28" fontSize="6" fill="hsl(0, 0%, 75%)" textAnchor="middle" opacity="0.7">epiglottis</text>

          {/* Vocal cords — fully visible, open V shape */}
          <path d="M45,55 L70,95 L95,55" fill="none" stroke="hsl(0, 0%, 85%)" strokeWidth="2" />
          {/* Cord tissue */}
          <path d="M45,55 L70,95" stroke="hsl(0, 10%, 75%)" strokeWidth="3" strokeLinecap="round" />
          <path d="M95,55 L70,95" stroke="hsl(0, 10%, 75%)" strokeWidth="3" strokeLinecap="round" />
          {/* Glottic opening (dark triangle) */}
          <path d="M50,58 L70,90 L90,58 Z" fill="hsl(0, 0%, 8%)" opacity="0.9" />
          {/* Arytenoids */}
          <circle cx="45" cy="55" r="5" fill="hsl(350, 25%, 55%)" opacity="0.7" />
          <circle cx="95" cy="55" r="5" fill="hsl(350, 25%, 55%)" opacity="0.7" />
          {/* Tracheal rings visible through opening */}
          <g opacity="0.3">
            <ellipse cx="70" cy="78" rx="12" ry="2" fill="none" stroke="hsl(0, 0%, 50%)" strokeWidth="0.75" />
            <ellipse cx="70" cy="84" rx="10" ry="1.5" fill="none" stroke="hsl(0, 0%, 50%)" strokeWidth="0.75" />
          </g>
          {/* Posterior commissure */}
          <path d="M45,55 C55,48 65,46 70,46 C75,46 85,48 95,55" fill="none" stroke="hsl(350, 20%, 55%)" strokeWidth="1.5" opacity="0.5" />
          <text x="70" y="115" fontSize="7" fill="hsl(0, 0%, 70%)" textAnchor="middle" fontWeight="bold">Grade I</text>
        </g>
      )}

      {grade === "II" && (
        <g>
          {/* Epiglottis partially obscuring */}
          <path d="M25,35 C40,22 60,18 70,17 C80,18 100,22 115,35 C105,42 85,46 70,47 C55,46 35,42 25,35Z"
            fill="hsl(350, 30%, 50%)" stroke="hsl(350, 25%, 40%)" strokeWidth="1" opacity="0.7" />
          <text x="70" y="34" fontSize="6" fill="hsl(0, 0%, 75%)" textAnchor="middle" opacity="0.7">epiglottis</text>

          {/* Arytenoids visible */}
          <circle cx="50" cy="60" r="6" fill="hsl(350, 25%, 55%)" opacity="0.7" />
          <circle cx="90" cy="60" r="6" fill="hsl(350, 25%, 55%)" opacity="0.7" />
          {/* Posterior part of cords only */}
          <path d="M50,60 L70,85 L90,60" fill="none" stroke="hsl(0, 10%, 75%)" strokeWidth="2" />
          {/* Partial glottic opening */}
          <path d="M55,62 L70,80 L85,62 Z" fill="hsl(0, 0%, 8%)" opacity="0.8" />
          {/* Anterior cords obscured by epiglottis */}
          <path d="M30,48 C45,52 65,50 70,50 C75,50 95,52 110,48 C100,56 80,60 70,60 C60,60 40,56 30,48Z"
            fill="hsl(350, 28%, 45%)" opacity="0.4" />
          <text x="70" y="115" fontSize="7" fill="hsl(0, 0%, 70%)" textAnchor="middle" fontWeight="bold">Grade II</text>
        </g>
      )}

      {grade === "IIa" && (
        <g>
          {/* Epiglottis */}
          <path d="M25,38 C40,25 60,20 70,19 C80,20 100,25 115,38 C105,45 85,48 70,49 C55,48 35,45 25,38Z"
            fill="hsl(350, 30%, 50%)" stroke="hsl(350, 25%, 40%)" strokeWidth="1" opacity="0.7" />
          {/* Posterior cords visible */}
          <path d="M50,60 L70,82 L90,60" fill="none" stroke="hsl(0, 10%, 75%)" strokeWidth="2" />
          <path d="M55,62 L70,78 L85,62 Z" fill="hsl(0, 0%, 8%)" opacity="0.8" />
          <circle cx="50" cy="60" r="5" fill="hsl(350, 25%, 55%)" opacity="0.7" />
          <circle cx="90" cy="60" r="5" fill="hsl(350, 25%, 55%)" opacity="0.7" />
          {/* Cord visible marker */}
          <text x="70" y="72" fontSize="5" fill="hsl(120, 40%, 55%)" textAnchor="middle" opacity="0.8">cords visible</text>
          <text x="70" y="115" fontSize="7" fill="hsl(0, 0%, 70%)" textAnchor="middle" fontWeight="bold">Grade IIa</text>
        </g>
      )}

      {grade === "IIb" && (
        <g>
          {/* Epiglottis — lower, more obscuring */}
          <path d="M22,42 C38,28 58,22 70,21 C82,22 102,28 118,42 C106,50 86,55 70,56 C54,55 34,50 22,42Z"
            fill="hsl(350, 30%, 50%)" stroke="hsl(350, 25%, 40%)" strokeWidth="1" opacity="0.7" />
          {/* Only arytenoids visible — no cords */}
          <circle cx="52" cy="66" r="7" fill="hsl(350, 25%, 55%)" opacity="0.8" />
          <circle cx="88" cy="66" r="7" fill="hsl(350, 25%, 55%)" opacity="0.8" />
          <text x="52" y="69" fontSize="4.5" fill="hsl(0, 0%, 80%)" textAnchor="middle">ary</text>
          <text x="88" y="69" fontSize="4.5" fill="hsl(0, 0%, 80%)" textAnchor="middle">ary</text>
          {/* Interarytenoid notch only */}
          <path d="M58,68 C65,72 75,72 82,68" fill="none" stroke="hsl(0, 0%, 30%)" strokeWidth="2" />
          {/* No cords visible */}
          <text x="70" y="85" fontSize="5" fill="hsl(0, 45%, 55%)" textAnchor="middle" opacity="0.8">no cords seen</text>
          <text x="70" y="115" fontSize="7" fill="hsl(0, 0%, 70%)" textAnchor="middle" fontWeight="bold">Grade IIb</text>
        </g>
      )}

      {grade === "III" && (
        <g>
          {/* Epiglottis only — large, obscuring everything */}
          <path d="M25,35 C40,25 55,20 70,18 C85,20 100,25 115,35 C112,55 100,72 85,82 C75,88 65,88 55,82 C40,72 28,55 25,35Z"
            fill="hsl(350, 30%, 48%)" stroke="hsl(350, 25%, 38%)" strokeWidth="1.5" opacity="0.8" />
          {/* Epiglottis surface detail */}
          <path d="M50,40 C55,50 60,58 65,62" fill="none" stroke="hsl(350, 20%, 42%)" strokeWidth="0.75" opacity="0.5" />
          <path d="M90,40 C85,50 80,58 75,62" fill="none" stroke="hsl(350, 20%, 42%)" strokeWidth="0.75" opacity="0.5" />
          <text x="70" y="55" fontSize="7" fill="hsl(0, 0%, 75%)" textAnchor="middle" opacity="0.8">epiglottis</text>
          <text x="70" y="66" fontSize="5" fill="hsl(0, 0%, 65%)" textAnchor="middle" opacity="0.6">only</text>
          {/* Surrounding mucosa */}
          <path d="M30,90 C45,95 65,98 70,98 C75,98 95,95 110,90"
            fill="none" stroke="hsl(350, 20%, 40%)" strokeWidth="1" opacity="0.3" />
          <text x="70" y="115" fontSize="7" fill="hsl(0, 0%, 70%)" textAnchor="middle" fontWeight="bold">Grade III</text>
        </g>
      )}

      {grade === "IV" && (
        <g>
          {/* Only soft palate / base of tongue visible */}
          <path d="M15,30 C30,20 50,15 70,14 C90,15 110,20 125,30 C128,50 125,70 118,85 C110,100 95,110 70,115 C45,110 30,100 22,85 C15,70 12,50 15,30Z"
            fill="hsl(350, 25%, 42%)" stroke="hsl(350, 20%, 35%)" strokeWidth="1.5" opacity="0.8" />
          {/* Tongue base texture */}
          <g opacity="0.3">
            <circle cx="55" cy="50" r="3" fill="hsl(350, 20%, 50%)" />
            <circle cx="70" cy="45" r="3" fill="hsl(350, 20%, 50%)" />
            <circle cx="85" cy="50" r="3" fill="hsl(350, 20%, 50%)" />
            <circle cx="60" cy="65" r="2.5" fill="hsl(350, 20%, 50%)" />
            <circle cx="80" cy="65" r="2.5" fill="hsl(350, 20%, 50%)" />
            <circle cx="70" cy="60" r="3" fill="hsl(350, 20%, 50%)" />
            <circle cx="50" cy="75" r="2" fill="hsl(350, 20%, 50%)" />
            <circle cx="90" cy="75" r="2" fill="hsl(350, 20%, 50%)" />
          </g>
          <text x="70" y="55" fontSize="7" fill="hsl(0, 0%, 75%)" textAnchor="middle" opacity="0.8">soft palate</text>
          <text x="70" y="75" fontSize="6" fill="hsl(0, 0%, 65%)" textAnchor="middle" opacity="0.6">no epiglottis</text>
          <text x="70" y="86" fontSize="6" fill="hsl(0, 0%, 65%)" textAnchor="middle" opacity="0.6">no glottis</text>
          <text x="70" y="115" fontSize="7" fill="hsl(0, 0%, 70%)" textAnchor="middle" fontWeight="bold">Grade IV</text>
        </g>
      )}
    </svg>
  );
};

const CormackLehaneDiagram = () => {
  const [selected, setSelected] = useState<Grade>("I");
  const info = grades[selected];

  return (
    <div className="border border-border rounded-lg p-4 mb-6">
      <h3 className="text-lg font-serif font-bold text-foreground mb-1">Cormack–Lehane Laryngoscopic Grading</h3>
      <p className="text-xs text-muted-foreground mb-4">Select a grade to see the laryngoscopic view and management tips</p>

      {/* Grade selector */}
      <div className="flex flex-wrap gap-2 mb-4">
        {gradeOrder.map((g) => (
          <button
            key={g}
            onClick={() => setSelected(g)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
              selected === g
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
            }`}
          >
            {g === "IIa" || g === "IIb" ? g : `Grade ${g}`}
          </button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-5 items-start">
        {/* SVG view */}
        <div className="flex-shrink-0 mx-auto">
          <div className="rounded-lg overflow-hidden border border-border bg-background/50 p-2" key={selected}>
            <GlottisView grade={selected} size={180} />
          </div>
        </div>

        {/* Info panel */}
        <div className="flex-1 min-w-0 space-y-3">
          <div className="animate-fade-in" key={selected}>
            <p className="font-bold text-foreground text-sm">{info.label}</p>
            <p className="text-sm text-muted-foreground mt-1">{info.description}</p>
            <div className="flex gap-4 mt-2 text-xs">
              <span className="text-muted-foreground"><strong className="text-foreground">Incidence:</strong> {info.incidence}</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Difficulty:</strong> {info.difficulty}</span>
            </div>

            <div className="mt-3">
              <p className="text-xs font-semibold text-foreground mb-1.5">Management Tips</p>
              <div className="space-y-1.5">
                {info.tips.map((tip, i) => (
                  <div key={i} className="flex gap-2 items-start">
                    <span className="shrink-0 w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <span className="text-[9px] font-bold text-primary">{i + 1}</span>
                    </span>
                    <p className="text-xs text-muted-foreground">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* All grades overview strip */}
      <div className="mt-5 pt-4 border-t border-border">
        <p className="text-xs font-semibold text-foreground mb-3">All Grades at a Glance</p>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {gradeOrder.map((g) => (
            <button key={g} onClick={() => setSelected(g)} className={`rounded-lg border p-1.5 transition-all ${selected === g ? "border-primary ring-1 ring-primary/30" : "border-border hover:border-foreground/20"}`}>
              <GlottisView grade={g} size={80} />
            </button>
          ))}
        </div>
      </div>

      {/* Key optimisation manoeuvres */}
      <div className="mt-4 p-4 rounded-lg border border-border bg-secondary/30">
        <p className="text-sm font-semibold text-foreground mb-2">Optimisation Manoeuvres to Improve Laryngoscopic View</p>
        <div className="grid sm:grid-cols-2 gap-2 text-xs text-muted-foreground">
          <div><strong className="text-foreground">BURP:</strong> Backward–Upward–Rightward Pressure on thyroid cartilage (by assistant)</div>
          <div><strong className="text-foreground">Bimanual:</strong> Laryngoscopist's right hand guides assistant — optimises view better than blind BURP</div>
          <div><strong className="text-foreground">Head position:</strong> Sniffing position (neck flexion + atlanto-occipital extension) aligns oral–pharyngeal–laryngeal axes</div>
          <div><strong className="text-foreground">Ramping:</strong> In obese patients, ear-to-sternal-notch alignment — elevate head/shoulders</div>
          <div><strong className="text-foreground">Bougie:</strong> First-line adjunct for Grade II–III; feel for tracheal clicks and hold-up at carina</div>
          <div><strong className="text-foreground">Videolaryngoscope:</strong> Improves view by 1–2 grades vs direct; first-line for anticipated difficulty</div>
        </div>
      </div>
    </div>
  );
};

export default CormackLehaneDiagram;

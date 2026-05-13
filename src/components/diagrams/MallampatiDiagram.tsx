import { useState } from "react";
import { DiagramFigure } from "./_shared/DiagramFigure";

type MallampatiClass = "I" | "II" | "III" | "IV";

const classes: Record<MallampatiClass, { label: string; description: string; visibility: string; difficulty: string }> = {
  I: { label: "Class I", description: "Soft palate, fauces, uvula, pillars visible", visibility: "Full view of oropharynx", difficulty: "Easy intubation expected" },
  II: { label: "Class II", description: "Soft palate, fauces, uvula visible; pillars obscured", visibility: "Partial uvula visible", difficulty: "Usually straightforward" },
  III: { label: "Class III", description: "Soft palate and base of uvula only", visibility: "Only soft palate seen", difficulty: "Increased difficulty likely" },
  IV: { label: "Class IV", description: "Hard palate only visible", visibility: "No oropharyngeal structures", difficulty: "Difficult intubation predicted" },
};

const MouthView = ({ grade, size = 120 }: { grade: MallampatiClass; size?: number }) => {
  const s = size;
  const cx = s / 2;
  const cy = s / 2;

  // Lip outline
  const lipRx = s * 0.38;
  const lipRy = s * 0.34;

  // Tongue
  const tongueY = (g: MallampatiClass) => {
    switch (g) {
      case "I": return cy + s * 0.08;
      case "II": return cy + s * 0.02;
      case "III": return cy - s * 0.06;
      case "IV": return cy - s * 0.15;
    }
  };

  // Uvula visibility
  const showUvula = grade === "I" || grade === "II";
  const showUvulaBase = grade === "III";
  const uvulaLen = grade === "I" ? s * 0.12 : s * 0.08;

  // Pillars
  const showPillars = grade === "I";

  // Soft palate
  const showSoftPalate = grade !== "IV";

  const tY = tongueY(grade);

  return (
    <svg viewBox={`0 0 ${s} ${s}`} width={s} height={s}>
      {/* Oral cavity (dark background) */}
      <ellipse cx={cx} cy={cy} rx={lipRx} ry={lipRy} fill="hsl(0, 10%, 12%)" />

      {/* Soft palate arch */}
      {showSoftPalate && (
        <path
          d={`M${cx - lipRx * 0.75},${cy - lipRy * 0.45} Q${cx},${cy - lipRy * 0.15} ${cx + lipRx * 0.75},${cy - lipRy * 0.45}`}
          fill="hsl(0, 40%, 55%)" fillOpacity="0.5" stroke="hsl(0, 35%, 45%)" strokeWidth="0.75"
        />
      )}

      {/* Hard palate (always visible) */}
      <path
        d={`M${cx - lipRx * 0.85},${cy - lipRy * 0.55} Q${cx},${cy - lipRy * 0.85} ${cx + lipRx * 0.85},${cy - lipRy * 0.55}`}
        fill="hsl(0, 35%, 60%)" fillOpacity="0.35" stroke="hsl(0, 30%, 50%)" strokeWidth="0.5"
      />

      {/* Pillars (Class I only) */}
      {showPillars && (
        <>
          <line x1={cx - s * 0.12} y1={cy - s * 0.12} x2={cx - s * 0.1} y2={cy + s * 0.05}
            stroke="hsl(0, 40%, 50%)" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          <line x1={cx + s * 0.12} y1={cy - s * 0.12} x2={cx + s * 0.1} y2={cy + s * 0.05}
            stroke="hsl(0, 40%, 50%)" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        </>
      )}

      {/* Uvula */}
      {showUvula && (
        <ellipse cx={cx} cy={cy - s * 0.05} rx={s * 0.03} ry={uvulaLen}
          fill="hsl(0, 45%, 55%)" stroke="hsl(0, 40%, 45%)" strokeWidth="0.5" />
      )}
      {showUvulaBase && (
        <ellipse cx={cx} cy={cy - s * 0.12} rx={s * 0.025} ry={s * 0.04}
          fill="hsl(0, 45%, 55%)" stroke="hsl(0, 40%, 45%)" strokeWidth="0.5" opacity="0.6" />
      )}

      {/* Tongue */}
      <ellipse cx={cx} cy={tY + s * 0.18} rx={lipRx * 0.8} ry={s * 0.22}
        fill="hsl(0, 35%, 52%)" stroke="hsl(0, 30%, 42%)" strokeWidth="0.75" />

      {/* Teeth (upper) */}
      {[-3, -2, -1, 0, 1, 2, 3].map(i => (
        <rect key={`u${i}`}
          x={cx + i * s * 0.055 - s * 0.025} y={cy - lipRy + s * 0.02}
          width={s * 0.05} height={s * 0.05} rx="2"
          fill="hsl(40, 20%, 90%)" stroke="hsl(40, 10%, 75%)" strokeWidth="0.5"
        />
      ))}
      {/* Teeth (lower) */}
      {[-3, -2, -1, 0, 1, 2, 3].map(i => (
        <rect key={`l${i}`}
          x={cx + i * s * 0.055 - s * 0.025} y={cy + lipRy - s * 0.07}
          width={s * 0.05} height={s * 0.05} rx="2"
          fill="hsl(40, 20%, 90%)" stroke="hsl(40, 10%, 75%)" strokeWidth="0.5"
        />
      ))}

      {/* Lip outline */}
      <ellipse cx={cx} cy={cy} rx={lipRx} ry={lipRy}
        fill="none" stroke="hsl(0, 30%, 50%)" strokeWidth="2" />
    </svg>
  );
};

const MallampatiDiagram = () => {
  const [selected, setSelected] = useState<MallampatiClass>("I");
  const info = classes[selected];

  return (
    <DiagramFigure id="mallampati" title="Mallampati classification: oropharyngeal view classes I–IV" description="Selectable Mallampati classes I to IV with the corresponding visible pharyngeal structures and predicted intubation difficulty.">
    <div className="border border-border rounded-lg p-4 mb-6">
      <h3 className="text-lg font-serif font-bold text-foreground mb-1">Mallampati Classification</h3>
      <p className="text-xs text-muted-foreground mb-4">Patient sitting, tongue protruded, no phonation. Select a class to explore.</p>

      {/* All 4 views in a row */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {(["I", "II", "III", "IV"] as MallampatiClass[]).map((g) => (
          <button
            key={g}
            onClick={() => setSelected(g)}
            className="flex flex-col items-center gap-1 p-2 rounded-lg border transition-all"
            style={{
              borderColor: selected === g ? "hsl(var(--primary))" : "hsl(var(--border))",
              backgroundColor: selected === g ? "hsl(var(--primary) / 0.06)" : "transparent",
            }}
          >
            <MouthView grade={g} size={80} />
            <span className={`text-xs font-semibold ${selected === g ? "text-primary" : "text-muted-foreground"}`}>
              Class {g}
            </span>
          </button>
        ))}
      </div>

      {/* Detail panel */}
      <div className="p-4 rounded-lg border border-border animate-fade-in" key={selected}>
        <div className="flex items-start gap-4">
          <MouthView grade={selected} size={120} />
          <div className="flex-1 min-w-0 space-y-2">
            <p className="font-bold text-foreground">{info.label}</p>
            <p className="text-sm text-muted-foreground">{info.description}</p>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="p-2 rounded border border-border">
                <p className="text-xs font-semibold text-foreground">Visibility</p>
                <p className="text-xs text-muted-foreground">{info.visibility}</p>
              </div>
              <div className="p-2 rounded border border-border">
                <p className="text-xs font-semibold text-foreground">Prediction</p>
                <p className="text-xs text-muted-foreground">{info.difficulty}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Clinical notes */}
      <div className="mt-3 p-3 rounded-lg border border-border bg-secondary/20">
        <p className="text-xs font-semibold text-foreground mb-1">Clinical Notes</p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          <strong>Sensitivity ~50%, specificity ~80%</strong> for difficult intubation when used alone. Always combine with other predictors: thyromental distance (&lt;6.5 cm), inter-incisor gap (&lt;3 cm), neck mobility, jaw protrusion (upper lip bite test), Wilson risk score. Modified Mallampati (with phonation) increases class by ~1 grade — original Samsoon & Young classification is preferred.
        </p>
      </div>
    </div>
    </DiagramFigure>
  );
};

export default MallampatiDiagram;

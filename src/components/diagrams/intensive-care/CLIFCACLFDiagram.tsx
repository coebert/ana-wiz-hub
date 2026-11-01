import { ACLF_CLASSIFICATION } from "@/lib/c4-clinical-rules";
import { InlineRef } from "@/components/references/InlineRef";
import { DiagramFigure } from "../_shared/DiagramFigure";
const CLIFCACLFDiagram = () => {
  const organFailures = [
    { organ: "Liver", criterion: "Bilirubin ≥12 mg/dL\n(≥204 µmol/L)", color: "#f59e0b" },
    { organ: "Kidney", criterion: "Creatinine ≥2.0 mg/dL\n(≥177 µmol/L)\nor RRT", color: "#ef4444" },
    { organ: "Brain", criterion: "HE Grade III–IV\n(West Haven)", color: "#a855f7" },
    { organ: "Coagulation", criterion: "INR ≥2.5", color: "#ec4899" },
    { organ: "Circulation", criterion: "Vasopressors\nrequired", color: "#3b82f6" },
    { organ: "Respiration", criterion: "PaO₂/FiO₂ ≤200\nor SpO₂/FiO₂ ≤214", color: "#06b6d4" },
  ];

  const grades = ACLF_CLASSIFICATION.map((g, i) => ({ grade: g.grade, criteria: g.description, mortality: g.mortality, color: ["hsl(var(--primary))", "hsl(var(--foreground))", "hsl(var(--foreground))", "hsl(var(--destructive))"][i], bg: "hsl(var(--muted))" }));

  return (
    <DiagramFigure
      id="clifcaclf-diagram"
      title="CLIFCACLF"
      description="CLIFCACLF: labelled teaching figure showing the structures, relationships and key values FRCA and FFICM candidates need to recognise and explain for this topic."
    >
                  <div className="my-6">
        <h3 className="text-lg font-serif font-bold text-foreground mb-4">CLIF-C ACLF Grading Algorithm</h3>
  
        {/* Organ Failure Definitions */}
        <div className="mb-4">
          <p className="text-sm font-semibold text-foreground mb-2">CLIF-C Organ Failure Definitions</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {organFailures.map((of) => (
              <div
                key={of.organ}
                className="p-3 rounded-lg border border-border text-center"
                style={{ borderLeftWidth: 3, borderLeftColor: of.color }}
              >
                <p className="font-bold text-sm text-foreground">{of.organ}</p>
                <p className="text-xs text-muted-foreground mt-1 whitespace-pre-line">{of.criterion}</p>
              </div>
            ))}
          </div>
        </div>
  
        {/* Arrow */}
        <div className="flex justify-center my-3">
          <svg aria-hidden="true" focusable="false" width="24" height="32" viewBox="0 0 24 32">
            <path d="M12 0 L12 24 M4 18 L12 28 L20 18" stroke="currentColor" strokeWidth="2" fill="none" className="text-muted-foreground" />
          </svg>
        </div>
  
        {/* Grading */}
        <div className="mb-4">
          <p className="text-sm font-semibold text-foreground mb-2">Apply single-organ exceptions, then count failures for grades 2/3</p>
          <div className="space-y-2">
            {grades.map((g) => (
              <div
                key={g.grade}
                className="flex flex-wrap items-start gap-3 p-3 rounded-lg border border-border"
                style={{ backgroundColor: g.bg, borderLeftWidth: 4, borderLeftColor: g.color }}
              >
                <span className="font-bold text-sm min-w-[80px]" style={{ color: g.color }}>{g.grade}</span>
                <span className="text-xs text-muted-foreground flex-1 min-w-[180px] whitespace-pre-line">{g.criteria}</span>
                <span className="text-sm font-bold whitespace-nowrap" style={{ color: g.color }}>28-d: {g.mortality}</span>
              </div>
            ))}
          </div>
        </div>
  
        <p className="text-xs text-muted-foreground">Approximate 28-day figures describe the historical CANONIC cohort, not a patient prediction.<InlineRef topicId="acute-liver-failure" refLabel="EASL ACLF 2023" /></p>
        {/* Trajectory box */}
        <div className="p-3 rounded-lg bg-secondary/50 border border-primary/20">
          <p className="text-sm font-semibold text-foreground mb-1">Trajectory Reassessment (Day 3–7)</p>
          <div className="grid sm:grid-cols-3 gap-2 text-xs text-muted-foreground">
            <div className="p-2 rounded border border-border text-center">
              <p className="font-bold text-green-500">Improving</p>
              <p>↓ ACLF grade → better prognosis</p>
            </div>
            <div className="p-2 rounded border border-border text-center">
              <p className="font-bold text-amber-500">Stable</p>
              <p>Same grade → reassess at day 7</p>
            </div>
            <div className="p-2 rounded border border-border text-center">
              <p className="font-bold text-red-500">Worsening</p>
              <p>Worsening grade 3 → urgent multidisciplinary reassessment, including transplant candidacy; grade alone is not futility.</p>
            </div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-3">After 3–7 days of full organ support, no salvage transplant option plus ≥4 organ failures OR CLIF-C ACLF &gt;70 may prompt individual multidisciplinary review of ongoing support and palliation, not automatic withdrawal.<InlineRef topicId="acute-liver-failure" refLabel="EASL ACLF 2023" /></p>
      </div>
    </DiagramFigure>
  );
};

export default CLIFCACLFDiagram;

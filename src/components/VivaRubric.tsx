import type { ExamTag } from "@/data/curriculum";

type Exam = Extract<ExamTag, "primary" | "final" | "fficm">;

interface RubricRow {
  marks: string;
  criterion: string;
  detail: string;
}

const RUBRICS: Record<Exam, { label: string; rows: RubricRow[]; passMark: string }> = {
  primary: {
    label: "FRCA Primary",
    passMark: "5/10 = bare pass · 7/10 = solid pass",
    rows: [
      { marks: "3", criterion: "Core facts & definitions", detail: "Accurate definitions, units, normal values, key numbers." },
      { marks: "3", criterion: "Underlying basic science", detail: "Correct physiology / pharmacology / physics mechanism — not just descriptive." },
      { marks: "2", criterion: "Structure & clarity", detail: "Logical framework (e.g. classification, system-by-system), no waffle." },
      { marks: "1", criterion: "Clinical relevance", detail: "Links the science to an anaesthetic scenario." },
      { marks: "1", criterion: "Fluency under pressure", detail: "Confident delivery, no major hesitations or contradictions." },
    ],
  },
  final: {
    label: "FRCA Final",
    passMark: "5/10 = bare pass · 7/10 = solid pass",
    rows: [
      { marks: "3", criterion: "Applied clinical reasoning", detail: "Patient-centred plan, weighs risks/benefits, justifies choices." },
      { marks: "2", criterion: "Integration of basic science", detail: "Brings in physiology / pharmacology to defend the plan." },
      { marks: "2", criterion: "Safety & contingency", detail: "Anticipates complications, names rescue strategies, escalation." },
      { marks: "2", criterion: "Structure & prioritisation", detail: "Addresses the most important issue first; clear framework." },
      { marks: "1", criterion: "Awareness of guidelines / evidence", detail: "Cites relevant UK guidance (AAGBI, RCoA, NICE) where appropriate." },
    ],
  },
  fficm: {
    label: "FFICM Final",
    passMark: "5/10 = bare pass · 7/10 = solid pass",
    rows: [
      { marks: "3", criterion: "ICU management plan", detail: "Coherent, prioritised plan: resuscitation, organ support, source control." },
      { marks: "2", criterion: "Evidence base", detail: "Names landmark trials / guidelines (e.g. ARDSnet, SSC, NICE) and applies them." },
      { marks: "2", criterion: "Risk / benefit & ceilings of care", detail: "Discusses limitations of treatment, prognosis, MDT and ethical dimension." },
      { marks: "2", criterion: "Safety & complications", detail: "Anticipates ICU-specific harms (VAP, line sepsis, delirium, AKI)." },
      { marks: "1", criterion: "Communication & structure", detail: "Clear delivery suitable for handover or family discussion." },
    ],
  },
};

interface VivaRubricProps {
  exam: Exam;
  score?: number;
}

const VivaRubric = ({ exam, score }: VivaRubricProps) => {
  const r = RUBRICS[exam];
  return (
    <div className="rounded-lg border border-border bg-card/60 p-4">
      <div className="flex items-baseline justify-between gap-2 flex-wrap mb-2">
        <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">
          Marking rubric · {r.label}
        </p>
        <p className="text-[11px] text-muted-foreground">{r.passMark}</p>
      </div>
      <ul className="divide-y divide-border">
        {r.rows.map((row) => (
          <li key={row.criterion} className="py-2 flex gap-3 items-start">
            <span className="inline-flex items-center justify-center min-w-8 h-6 rounded bg-primary/10 text-primary text-xs font-bold tabular-nums">
              {row.marks}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground leading-tight">{row.criterion}</p>
              <p className="text-xs text-muted-foreground leading-snug">{row.detail}</p>
            </div>
          </li>
        ))}
      </ul>
      {typeof score === "number" && (
        <p className="mt-3 text-xs text-muted-foreground">
          You scored <span className="font-semibold text-foreground">{score}/10</span> — focus on the
          highest-mark rows above where the examiner flagged gaps.
        </p>
      )}
    </div>
  );
};

export default VivaRubric;

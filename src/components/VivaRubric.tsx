import type { ExamTag } from "@/data/curriculum";

type Exam = Extract<ExamTag, "primary" | "final" | "fficm">;

interface RubricRow {
  marks: string;
  criterion: string;
  detail: string;
  /** Concrete next-practice actions tailored to this rubric area. */
  practice: string[];
}

const RUBRICS: Record<Exam, { label: string; rows: RubricRow[]; passMark: string }> = {
  primary: {
    label: "FRCA Primary",
    passMark: "5/10 = bare pass · 7/10 = solid pass",
    rows: [
      {
        marks: "3",
        criterion: "Core facts & definitions",
        detail: "Accurate definitions, units, normal values, key numbers.",
        practice: [
          "Write the definition + units from memory on a flashcard, then verbalise it aloud.",
          "Drill normal values (e.g. CMRO₂ 3.5 mL/100 g/min, GFR 125 mL/min) until automatic.",
          "Open the topic page and re-cite every numerical value in one breath.",
        ],
      },
      {
        marks: "3",
        criterion: "Underlying basic science",
        detail: "Correct physiology / pharmacology / physics mechanism — not just descriptive.",
        practice: [
          "Sketch the mechanism (graph, ion flow, receptor) on paper without notes.",
          "Practise the 60-second 'why' — explain the mechanism aloud as if to a CT1.",
          "Re-read the linked diagram on the topic page and re-explain it back.",
        ],
      },
      {
        marks: "2",
        criterion: "Structure & clarity",
        detail: "Logical framework (e.g. classification, system-by-system), no waffle.",
        practice: [
          "Open with a one-line classification before any detail (e.g. 'central vs peripheral').",
          "Rehearse a 30-second answer skeleton: definition → mechanism → clinical link.",
        ],
      },
      {
        marks: "1",
        criterion: "Clinical relevance",
        detail: "Links the science to an anaesthetic scenario.",
        practice: [
          "Add one clinical sentence to every fact: 'Why does this matter on the day?'",
          "Pair each topic with a real case you have anaesthetised.",
        ],
      },
      {
        marks: "1",
        criterion: "Fluency under pressure",
        detail: "Confident delivery, no major hesitations or contradictions.",
        practice: [
          "Re-run this same viva question with the timer — aim to start speaking within 3 seconds.",
          "Record yourself, listen back, and cut filler words ('um', 'kind of').",
        ],
      },
    ],
  },
  final: {
    label: "FRCA Final",
    passMark: "5/10 = bare pass · 7/10 = solid pass",
    rows: [
      {
        marks: "3",
        criterion: "Applied clinical reasoning",
        detail: "Patient-centred plan, weighs risks/benefits, justifies choices.",
        practice: [
          "Re-answer the question framed as 'this specific patient' — name age, comorbidities, urgency.",
          "Justify every choice with one risk and one benefit.",
          "Practise the phrase 'I would do X because Y, accepting Z risk'.",
        ],
      },
      {
        marks: "2",
        criterion: "Integration of basic science",
        detail: "Brings in physiology / pharmacology to defend the plan.",
        practice: [
          "Re-do the viva and force one physiology + one pharmacology sentence into the answer.",
          "Revisit the basic-science topic page linked to this clinical scenario.",
        ],
      },
      {
        marks: "2",
        criterion: "Safety & contingency",
        detail: "Anticipates complications, names rescue strategies, escalation.",
        practice: [
          "List 3 things that could go wrong + your rescue plan for each before answering.",
          "Practise the escalation sentence: 'If X happens I will call for Y and do Z.'",
          "Drill the relevant emergency algorithm (CICO, anaphylaxis, MH, LAST).",
        ],
      },
      {
        marks: "2",
        criterion: "Structure & prioritisation",
        detail: "Addresses the most important issue first; clear framework.",
        practice: [
          "Rehearse the ABCDE / pre-op-intra-op-post-op skeleton aloud.",
          "Open with: 'My main concerns are X, Y, Z — I'll address X first because…'",
        ],
      },
      {
        marks: "1",
        criterion: "Awareness of guidelines / evidence",
        detail: "Cites relevant UK guidance (AAGBI, RCoA, NICE) where appropriate.",
        practice: [
          "Look up the relevant AAGBI / RCoA / NICE / DAS guideline and quote one headline number.",
          "Build a 'guidelines I cite' list per topic — 5 minutes a day.",
        ],
      },
    ],
  },
  fficm: {
    label: "FFICM Final",
    passMark: "5/10 = bare pass · 7/10 = solid pass",
    rows: [
      {
        marks: "3",
        criterion: "ICU management plan",
        detail: "Coherent, prioritised plan: resuscitation, organ support, source control.",
        practice: [
          "Rehearse the answer as 'resuscitate → investigate → definitive treatment → organ support'.",
          "Practise verbalising vent settings / vasopressor targets with actual numbers.",
        ],
      },
      {
        marks: "2",
        criterion: "Evidence base",
        detail: "Names landmark trials / guidelines (e.g. ARDSnet, SSC, NICE) and applies them.",
        practice: [
          "Memorise 1 trial name + 1 number per topic (e.g. ARDSnet 6 mL/kg, SSC 30 mL/kg in 3 h).",
          "Re-do the viva and force one named trial / guideline into the answer.",
        ],
      },
      {
        marks: "2",
        criterion: "Risk / benefit & ceilings of care",
        detail: "Discusses limitations of treatment, prognosis, MDT and ethical dimension.",
        practice: [
          "Add the sentence 'this needs an MDT discussion about ceiling of care' where relevant.",
          "Rehearse a 30-second prognosis paragraph for the index condition.",
        ],
      },
      {
        marks: "2",
        criterion: "Safety & complications",
        detail: "Anticipates ICU-specific harms (VAP, line sepsis, delirium, AKI).",
        practice: [
          "Run the FAST HUGS BID checklist mentally before answering any ICU viva.",
          "List 3 ICU iatrogenic harms + the bundle to prevent each.",
        ],
      },
      {
        marks: "1",
        criterion: "Communication & structure",
        detail: "Clear delivery suitable for handover or family discussion.",
        practice: [
          "Re-deliver the answer as an SBAR handover.",
          "Practise the family-conversation version of this scenario aloud.",
        ],
      },
    ],
  },
};

interface VivaRubricProps {
  exam: Exam;
  score?: number;
  /** Gap bullets returned by the examiner — used to highlight focus rows. */
  gaps?: string[];
}

/**
 * Roughly match a rubric row to a free-text gap bullet.
 * Uses simple keyword matching from the criterion + detail.
 */
function rowMatchesGap(row: RubricRow, gaps: string[]): boolean {
  if (!gaps?.length) return false;
  const haystack = (row.criterion + " " + row.detail).toLowerCase();
  const tokens = haystack.split(/[^a-z]+/).filter((t) => t.length > 4);
  const gapBlob = gaps.join(" ").toLowerCase();
  return tokens.some((t) => gapBlob.includes(t));
}

const VivaRubric = ({ exam, score, gaps = [] }: VivaRubricProps) => {
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
        {r.rows.map((row) => {
          const flagged = rowMatchesGap(row, gaps);
          return (
            <li key={row.criterion} className="py-2.5 flex gap-3 items-start">
              <span
                className={`inline-flex items-center justify-center min-w-8 h-6 rounded text-xs font-bold tabular-nums ${
                  flagged
                    ? "bg-amber-500/15 text-amber-700 dark:text-amber-300"
                    : "bg-primary/10 text-primary"
                }`}
              >
                {row.marks}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-medium text-foreground leading-tight">
                    {row.criterion}
                  </p>
                  {flagged && (
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-amber-700 dark:text-amber-300">
                      Focus next
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground leading-snug">{row.detail}</p>
                <div className="mt-1.5">
                  <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-0.5">
                    Next practice
                  </p>
                  <ul className="text-xs text-foreground space-y-0.5 list-disc pl-4">
                    {row.practice.map((p, i) => <li key={i}>{p}</li>)}
                  </ul>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      {typeof score === "number" && (
        <p className="mt-3 text-xs text-muted-foreground">
          You scored <span className="font-semibold text-foreground">{score}/10</span>
          {gaps.length > 0
            ? " — start with the rows marked Focus next."
            : " — pick the highest-mark row you felt weakest on and rehearse it now."}
        </p>
      )}
    </div>
  );
};

export default VivaRubric;

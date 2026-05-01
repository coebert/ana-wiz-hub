import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

type Answer = "yes" | "no" | null;

interface Case {
  id: string;
  label: string;
  vignette: string;
  rass: number;
  feature1: { answer: "yes" | "no"; detail: string };
  feature2: { answer: "yes" | "no"; detail: string }; // SAVEAHAART errors > 2
  feature3: { answer: "yes" | "no"; detail: string }; // RASS != 0
  feature4: { answer: "yes" | "no"; detail: string };
}

const CASES: Case[] = [
  {
    id: "positive",
    label: "Positive — hyperactive delirium",
    vignette:
      "Day 4 post-laparotomy for perforated diverticulitis. RASS +1, pulling at NG tube. Nurse reports patient was calm and oriented yesterday but is now intermittently agitated and confused.",
    rass: 1,
    feature1: {
      answer: "yes",
      detail: "Acute change from baseline mental status (yesterday calm/oriented) AND fluctuating course (lucid intervals between agitation).",
    },
    feature2: {
      answer: "yes",
      detail: "SAVEAHAART letters test: 4 errors (squeezed on non-A letters and missed two A's). Threshold > 2 errors = inattention.",
    },
    feature3: {
      answer: "yes",
      detail: "RASS = +1 (not zero) → altered level of consciousness. Feature 3 met automatically.",
    },
    feature4: {
      answer: "yes",
      detail: "Disorganised thinking — answered 2 of 4 yes/no questions incorrectly; could not follow 'hold up this many fingers, now do the same with the other hand.'",
    },
  },
  {
    id: "negative",
    label: "Negative — sedated but no delirium",
    vignette:
      "Day 2 ventilated for community-acquired pneumonia. On propofol 2 mg/kg/h, RASS −2, opens eyes to voice, follows simple commands when prompted. Mental status unchanged from yesterday.",
    rass: -2,
    feature1: {
      answer: "no",
      detail: "No acute change from baseline (mental status unchanged for 24 h) and no fluctuating course documented.",
    },
    feature2: {
      answer: "no",
      detail: "Only 1 error on SAVEAHAART — within normal limits.",
    },
    feature3: {
      answer: "yes",
      detail: "RASS = −2 (light sedation) → altered LOC, but Feature 1 already negative so screen stops here.",
    },
    feature4: {
      answer: "no",
      detail: "Not assessed — screen already negative.",
    },
  },
  {
    id: "hypoactive",
    label: "Positive — hypoactive (often missed)",
    vignette:
      "Day 6 ICU for septic shock, off sedation 12 h. RASS −1, withdrawn, slow to respond. Family says 'he's just tired' but baseline was independent and sharp at home.",
    rass: -1,
    feature1: {
      answer: "yes",
      detail: "Acute change vs. premorbid baseline (sharp/independent → withdrawn/slow). Hypoactive subtype is the most common (60%) and most missed.",
    },
    feature2: {
      answer: "yes",
      detail: "5 errors on SAVEAHAART. Even quiet patients fail attention testing — that's the screening gold.",
    },
    feature3: {
      answer: "yes",
      detail: "RASS = −1 → altered LOC.",
    },
    feature4: {
      answer: "no",
      detail: "Answered yes/no questions correctly. Feature 4 not needed — Features 1+2+3 already meet diagnosis (1+2 + either 3 or 4).",
    },
  },
];

export const CAMICUFlowchartDiagram = () => {
  const [caseId, setCaseId] = useState(CASES[0].id);
  const [step, setStep] = useState(0);
  const c = CASES.find((x) => x.id === caseId)!;

  // Determine outcome based on CAM-ICU rules:
  // CAM-ICU positive = Feature 1 + Feature 2 + (Feature 3 OR Feature 4)
  const f1 = c.feature1.answer === "yes";
  const f2 = c.feature2.answer === "yes";
  const f3 = c.feature3.answer === "yes";
  const f4 = c.feature4.answer === "yes";
  const positive = f1 && f2 && (f3 || f4);
  const unassessable = c.rass <= -4;

  const reset = (id: string) => {
    setCaseId(id);
    setStep(0);
  };

  const stepComplete = step >= 5;

  return (
    <Card className="p-4 sm:p-6 my-6 bg-card border-border">
      <h3 className="text-lg font-serif font-bold text-foreground mb-1">
        CAM-ICU — Confusion Assessment Method for the ICU
      </h3>
      <p className="text-xs text-muted-foreground mb-4">
        Validated bedside delirium screen for ventilated and non-ventilated ICU patients (Ely 2001).
        Takes &lt; 2 min. Perform every shift and PRN.
      </p>

      <Tabs defaultValue="flow" className="w-full">
        <TabsList className="grid grid-cols-3 w-full mb-4">
          <TabsTrigger value="flow">Flowchart</TabsTrigger>
          <TabsTrigger value="walkthrough">Worked Example</TabsTrigger>
          <TabsTrigger value="pearls">Pearls</TabsTrigger>
        </TabsList>

        {/* === FLOWCHART === */}
        <TabsContent value="flow" className="space-y-3">
          <div className="rounded-lg border border-border bg-secondary/20 p-3">
            <svg viewBox="0 0 640 460" className="w-full h-auto">
              {/* Step 0: RASS */}
              <rect x="220" y="10" width="200" height="44" rx="6" fill="hsl(var(--primary))" opacity="0.85" />
              <text x="320" y="30" textAnchor="middle" fontSize="11" fontWeight="700" className="fill-primary-foreground">
                Step 1 — Assess RASS
              </text>
              <text x="320" y="44" textAnchor="middle" fontSize="9" className="fill-primary-foreground">
                If RASS ≤ −4 → unassessable (stop)
              </text>

              <path d="M 320 54 L 320 78" stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd="url(#cam-arr)" />

              {/* Feature 1 */}
              <rect x="180" y="80" width="280" height="58" rx="6" fill="hsl(var(--clinical))" opacity="0.85" />
              <text x="320" y="100" textAnchor="middle" fontSize="11" fontWeight="700" className="fill-primary-foreground">
                Feature 1 — Acute onset OR fluctuating course
              </text>
              <text x="320" y="116" textAnchor="middle" fontSize="9" className="fill-primary-foreground">
                Δ from baseline in last 24 h?
              </text>
              <text x="320" y="128" textAnchor="middle" fontSize="9" className="fill-primary-foreground">
                Mental status fluctuated in past 24 h?
              </text>

              {/* No → CAM-ICU negative */}
              <path d="M 180 109 L 60 109 L 60 200" stroke="hsl(var(--muted-foreground))" strokeWidth="1.2" markerEnd="url(#cam-arr)" />
              <text x="100" y="100" fontSize="9" className="fill-muted-foreground" fontWeight="600">NO</text>

              <path d="M 320 138 L 320 162" stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd="url(#cam-arr)" />
              <text x="328" y="155" fontSize="9" className="fill-foreground" fontWeight="600">YES</text>

              {/* Feature 2 */}
              <rect x="180" y="164" width="280" height="56" rx="6" fill="hsl(var(--icu))" opacity="0.85" />
              <text x="320" y="184" textAnchor="middle" fontSize="11" fontWeight="700" className="fill-primary-foreground">
                Feature 2 — Inattention
              </text>
              <text x="320" y="200" textAnchor="middle" fontSize="9" className="fill-primary-foreground">
                SAVEAHAART letters or pictures
              </text>
              <text x="320" y="212" textAnchor="middle" fontSize="9" className="fill-primary-foreground">
                {">"} 2 errors = positive
              </text>

              <path d="M 180 192 L 60 192 L 60 230" stroke="hsl(var(--muted-foreground))" strokeWidth="1.2" markerEnd="url(#cam-arr)" />
              <text x="100" y="183" fontSize="9" className="fill-muted-foreground" fontWeight="600">NO</text>

              <path d="M 320 220 L 320 244" stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd="url(#cam-arr)" />
              <text x="328" y="237" fontSize="9" className="fill-foreground" fontWeight="600">YES</text>

              {/* Feature 3 */}
              <rect x="180" y="246" width="280" height="44" rx="6" fill="hsl(var(--pharmacology))" opacity="0.85" />
              <text x="320" y="266" textAnchor="middle" fontSize="11" fontWeight="700" className="fill-primary-foreground">
                Feature 3 — Altered consciousness
              </text>
              <text x="320" y="280" textAnchor="middle" fontSize="9" className="fill-primary-foreground">
                Current RASS ≠ 0
              </text>

              {/* If F3 yes → POSITIVE */}
              <path d="M 460 268 L 540 268 L 540 380" stroke="hsl(var(--destructive))" strokeWidth="1.5" fill="none" markerEnd="url(#cam-arr-danger)" />
              <text x="475" y="262" fontSize="9" className="fill-destructive" fontWeight="600">YES</text>

              {/* If F3 no → check F4 */}
              <path d="M 320 290 L 320 312" stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd="url(#cam-arr)" />
              <text x="328" y="305" fontSize="9" className="fill-foreground" fontWeight="600">NO</text>

              {/* Feature 4 */}
              <rect x="180" y="314" width="280" height="56" rx="6" fill="hsl(var(--physiology))" opacity="0.85" />
              <text x="320" y="334" textAnchor="middle" fontSize="11" fontWeight="700" className="fill-primary-foreground">
                Feature 4 — Disorganised thinking
              </text>
              <text x="320" y="350" textAnchor="middle" fontSize="9" className="fill-primary-foreground">
                4 yes/no questions + 2-step command
              </text>
              <text x="320" y="362" textAnchor="middle" fontSize="9" className="fill-primary-foreground">
                {">"} 1 error = positive
              </text>

              <path d="M 180 342 L 60 342 L 60 392" stroke="hsl(var(--muted-foreground))" strokeWidth="1.2" markerEnd="url(#cam-arr)" />
              <text x="100" y="333" fontSize="9" className="fill-muted-foreground" fontWeight="600">NO</text>

              <path d="M 460 342 L 540 342 L 540 380" stroke="hsl(var(--destructive))" strokeWidth="1.5" markerEnd="url(#cam-arr)" />
              <text x="475" y="333" fontSize="9" className="fill-destructive" fontWeight="600">YES</text>

              {/* Outcome — Negative */}
              <rect x="10" y="392" width="180" height="48" rx="6" fill="hsl(var(--muted))" opacity="0.6" stroke="hsl(var(--border))" />
              <text x="100" y="413" textAnchor="middle" fontSize="11" fontWeight="700" className="fill-foreground">
                CAM-ICU NEGATIVE
              </text>
              <text x="100" y="428" textAnchor="middle" fontSize="9" className="fill-muted-foreground">
                no delirium
              </text>

              {/* Outcome — Positive */}
              <rect x="450" y="382" width="180" height="58" rx="6" fill="hsl(var(--destructive))" opacity="0.85" />
              <text x="540" y="404" textAnchor="middle" fontSize="11" fontWeight="700" className="fill-primary-foreground">
                CAM-ICU POSITIVE
              </text>
              <text x="540" y="420" textAnchor="middle" fontSize="9" className="fill-primary-foreground">
                Delirium present
              </text>
              <text x="540" y="432" textAnchor="middle" fontSize="9" className="fill-primary-foreground">
                Apply ABCDEF bundle
              </text>

              <defs>
                <marker id="cam-arr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto" markerUnits="userSpaceOnUse">
                  <path d="M0,0 L8,4 L0,8 Z" fill="hsl(var(--muted-foreground))" />
                </marker>
                <marker id="cam-arr-danger" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto" markerUnits="userSpaceOnUse">
                  <path d="M0,0 L8,4 L0,8 Z" fill="hsl(var(--destructive))" />
                </marker>
              </defs>
            </svg>
          </div>

          <div className="rounded-md p-3 bg-secondary/30 border border-border text-xs">
            <p className="font-semibold text-foreground mb-1">The rule</p>
            <p className="text-muted-foreground">
              CAM-ICU <strong className="text-foreground">positive = Feature 1 AND Feature 2 AND (Feature 3 OR Feature 4)</strong>.
              If RASS ≤ −4, the patient is unassessable — re-screen when lighter.
            </p>
          </div>
        </TabsContent>

        {/* === WALKTHROUGH === */}
        <TabsContent value="walkthrough" className="space-y-3">
          <div className="flex flex-wrap gap-1.5">
            {CASES.map((cs) => (
              <button
                key={cs.id}
                onClick={() => reset(cs.id)}
                className={`px-2.5 py-1 text-[11px] rounded-md border transition-all ${
                  caseId === cs.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-secondary/30 text-foreground border-border hover:bg-secondary/50"
                }`}
              >
                {cs.label}
              </button>
            ))}
          </div>

          <div className="rounded-lg border border-border bg-secondary/20 p-3">
            <p className="text-xs text-muted-foreground italic mb-2">{c.vignette}</p>
            <div className="text-[11px] text-foreground">
              <Badge variant="outline" className="text-[10px] mr-2">
                RASS {c.rass > 0 ? `+${c.rass}` : c.rass}
              </Badge>
              {unassessable && (
                <Badge variant="destructive" className="text-[10px]">Unassessable (RASS ≤ −4)</Badge>
              )}
            </div>
          </div>

          {/* Stepwise reveal */}
          <div className="space-y-2">
            <StepRow
              n={1}
              title="RASS check"
              done={step >= 1}
              answer={unassessable ? "no" : "yes"}
              detail={unassessable ? "RASS ≤ −4 → screen aborted, reassess later." : `RASS ${c.rass > 0 ? `+${c.rass}` : c.rass} → patient assessable, proceed to Feature 1.`}
            />
            <StepRow
              n={2}
              title="Feature 1 — Acute onset / fluctuating course"
              done={step >= 2}
              answer={c.feature1.answer}
              detail={c.feature1.detail}
            />
            <StepRow
              n={3}
              title="Feature 2 — Inattention (SAVEAHAART)"
              done={step >= 3}
              answer={c.feature2.answer}
              detail={c.feature2.detail}
              skipped={!f1}
            />
            <StepRow
              n={4}
              title="Feature 3 — Altered LOC (RASS ≠ 0)"
              done={step >= 4}
              answer={c.feature3.answer}
              detail={c.feature3.detail}
              skipped={!f1 || !f2}
            />
            <StepRow
              n={5}
              title="Feature 4 — Disorganised thinking"
              done={step >= 5}
              answer={c.feature4.answer}
              detail={c.feature4.detail}
              skipped={!f1 || !f2 || f3}
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setStep(Math.min(5, step + 1))}
              disabled={stepComplete}
              className="px-3 py-1.5 text-xs rounded-md bg-primary text-primary-foreground border border-primary disabled:opacity-50"
            >
              {stepComplete ? "Complete" : `Reveal step ${step + 1}`}
            </button>
            <button
              onClick={() => setStep(0)}
              className="px-3 py-1.5 text-xs rounded-md bg-secondary/30 text-foreground border border-border"
            >
              Reset
            </button>
            {stepComplete && (
              <div
                className={`ml-auto px-3 py-1.5 rounded-md text-xs font-semibold border ${
                  positive
                    ? "bg-destructive/15 text-destructive border-destructive/40"
                    : "bg-primary/10 text-foreground border-primary/30"
                }`}
              >
                {positive ? "CAM-ICU POSITIVE — delirium" : "CAM-ICU NEGATIVE"}
              </div>
            )}
          </div>
        </TabsContent>

        {/* === PEARLS === */}
        <TabsContent value="pearls" className="space-y-3 text-xs">
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="rounded-lg border border-border bg-secondary/30 p-3">
              <p className="font-semibold text-foreground mb-1">SAVEAHAART explained</p>
              <p className="text-muted-foreground">
                Read the 10 letters S-A-V-E-A-H-A-A-R-T at one-second intervals. Patient squeezes the examiner's
                hand on every <strong className="text-foreground">"A"</strong> (4 in total). An error is either
                squeezing on a non-A or failing to squeeze on an A. <strong className="text-foreground">&gt; 2 errors = positive</strong>.
                If the patient cannot squeeze, use the picture version.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-secondary/30 p-3">
              <p className="font-semibold text-foreground mb-1">Feature 4 questions</p>
              <p className="text-muted-foreground mb-1">Four yes/no questions, e.g.:</p>
              <ul className="text-muted-foreground space-y-0.5 list-disc list-inside">
                <li>"Will a stone float on water?"</li>
                <li>"Are there fish in the sea?"</li>
                <li>"Does one pound weigh more than two?"</li>
                <li>"Can you use a hammer to pound a nail?"</li>
              </ul>
              <p className="text-muted-foreground mt-1">
                Plus a 2-step command ("hold up this many fingers, now do the same with the other hand"). Total
                errors &gt; 1 = positive.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-secondary/30 p-3">
              <p className="font-semibold text-foreground mb-1">Subtypes</p>
              <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                <li><strong className="text-foreground">Hypoactive</strong> (~60%) — withdrawn, drowsy. Most missed, worst prognosis.</li>
                <li><strong className="text-foreground">Hyperactive</strong> (~5%) — agitated, hallucinating. Most recognised.</li>
                <li><strong className="text-foreground">Mixed</strong> (~35%) — fluctuating between the two.</li>
              </ul>
            </div>
            <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-3">
              <p className="font-semibold text-foreground mb-1 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> Why screen?
              </p>
              <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                <li>Up to 80% of ventilated patients develop delirium</li>
                <li>Independent predictor of mortality, ↑ ICU LOS, long-term cognitive impairment</li>
                <li>Without active screening, &gt; 70% of cases (especially hypoactive) are missed</li>
                <li>CAM-ICU sensitivity 80%, specificity 96% in ventilated patients</li>
                <li>Triggers <strong className="text-foreground">ABCDEF bundle</strong> response</li>
              </ul>
            </div>
          </div>

          <div className="rounded-md p-3 bg-secondary/30 border border-border">
            <p className="font-semibold text-foreground mb-1">Reversible drivers (DELIRIUMS mnemonic)</p>
            <p className="text-muted-foreground">
              <strong className="text-foreground">D</strong>rugs (BZDs, anticholinergics, opioids) ·{" "}
              <strong className="text-foreground">E</strong>lectrolytes ·{" "}
              <strong className="text-foreground">L</strong>ack of drugs (withdrawal: alcohol, BZD, nicotine) ·{" "}
              <strong className="text-foreground">I</strong>nfection (UTI, line, chest) ·{" "}
              <strong className="text-foreground">R</strong>educed sensory input (glasses, hearing aids) ·{" "}
              <strong className="text-foreground">I</strong>ntracranial (CVA, meningitis) ·{" "}
              <strong className="text-foreground">U</strong>rinary retention / faecal impaction ·{" "}
              <strong className="text-foreground">M</strong>yocardial (MI, CCF) ·{" "}
              <strong className="text-foreground">S</strong>leep deprivation.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

const StepRow = ({
  n,
  title,
  done,
  answer,
  detail,
  skipped,
}: {
  n: number;
  title: string;
  done: boolean;
  answer: Answer;
  detail: string;
  skipped?: boolean;
}) => {
  if (!done) {
    return (
      <div className="rounded-md border border-dashed border-border p-2.5 text-xs text-muted-foreground bg-secondary/10">
        <span className="font-mono mr-2">{n}.</span> {title}
      </div>
    );
  }
  if (skipped) {
    return (
      <div className="rounded-md border border-border p-2.5 text-xs bg-secondary/20">
        <p className="font-semibold text-muted-foreground">
          <span className="font-mono mr-2">{n}.</span> {title} — <span className="italic">not assessed (screen already determined)</span>
        </p>
      </div>
    );
  }
  const yes = answer === "yes";
  return (
    <div
      className={`rounded-md border p-2.5 text-xs ${
        yes ? "border-destructive/40 bg-destructive/5" : "border-primary/30 bg-primary/5"
      }`}
    >
      <div className="flex items-start gap-2">
        {yes ? (
          <CheckCircle2 className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
        ) : (
          <XCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
        )}
        <div>
          <p className="font-semibold text-foreground">
            <span className="font-mono mr-2">{n}.</span> {title} —{" "}
            <span className={yes ? "text-destructive" : "text-primary"}>{yes ? "POSITIVE" : "negative"}</span>
          </p>
          <p className="text-muted-foreground mt-1">{detail}</p>
        </div>
      </div>
    </div>
  );
};

export default CAMICUFlowchartDiagram;

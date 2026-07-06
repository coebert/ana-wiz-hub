import { useState, type CSSProperties } from "react";
import { Card } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, AlertTriangle, Sun, Moon } from "lucide-react";
import { DiagramFigure, svgNodeProps } from "../_shared/DiagramFigure";

type Answer = "yes" | "no" | null;

// Local token overrides so the flowchart can be previewed in either theme
// independently of the page theme. Values mirror :root and .dark in index.css.
const LIGHT_TOKENS: CSSProperties = {
  ["--background" as any]: "210 20% 98%",
  ["--foreground" as any]: "215 25% 15%",
  ["--card" as any]: "0 0% 100%",
  ["--card-foreground" as any]: "215 25% 15%",
  ["--primary" as any]: "210 70% 35%",
  ["--primary-foreground" as any]: "0 0% 100%",
  ["--secondary" as any]: "180 30% 94%",
  ["--secondary-foreground" as any]: "210 70% 35%",
  ["--muted" as any]: "210 15% 93%",
  ["--muted-foreground" as any]: "215 15% 50%",
  ["--destructive" as any]: "0 84.2% 60.2%",
  ["--destructive-foreground" as any]: "210 40% 98%",
  ["--border" as any]: "210 20% 90%",
  ["--clinical" as any]: "25 80% 50%",
  ["--icu" as any]: "260 50% 50%",
  ["--pharmacology" as any]: "170 50% 40%",
  ["--physiology" as any]: "340 60% 45%",
  colorScheme: "light",
};

const DARK_TOKENS: CSSProperties = {
  ["--background" as any]: "215 25% 10%",
  ["--foreground" as any]: "210 20% 95%",
  ["--card" as any]: "215 25% 13%",
  ["--card-foreground" as any]: "210 20% 95%",
  ["--primary" as any]: "210 60% 55%",
  ["--primary-foreground" as any]: "0 0% 100%",
  ["--secondary" as any]: "215 20% 18%",
  ["--secondary-foreground" as any]: "210 20% 90%",
  ["--muted" as any]: "215 20% 18%",
  ["--muted-foreground" as any]: "215 15% 60%",
  ["--destructive" as any]: "0 62.8% 30.6%",
  ["--destructive-foreground" as any]: "210 40% 98%",
  ["--border" as any]: "215 20% 20%",
  ["--clinical" as any]: "25 80% 55%",
  ["--icu" as any]: "260 55% 65%",
  ["--pharmacology" as any]: "170 50% 50%",
  ["--physiology" as any]: "340 60% 60%",
  colorScheme: "dark",
};

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
  const [previewTheme, setPreviewTheme] = useState<"auto" | "light" | "dark">("auto");
  const isMobile = useIsMobile();
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
          <div className="flex flex-wrap items-center justify-end gap-1.5 text-[11px]">
            <span className="text-muted-foreground mr-1">Theme preview:</span>
            {([
              { id: "auto", label: "Auto", icon: null },
              { id: "light", label: "Light", icon: <Sun className="h-3 w-3" aria-hidden="true" focusable={false} /> },
              { id: "dark", label: "Dark", icon: <Moon className="h-3 w-3" aria-hidden="true" focusable={false} /> },
            ] as const).map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setPreviewTheme(opt.id)}
                aria-pressed={previewTheme === opt.id}
                className={`inline-flex items-center gap-1 px-2 py-1 rounded border transition-colors ${
                  previewTheme === opt.id
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border text-muted-foreground hover:bg-muted/50"
                }`}
              >
                {opt.icon}
                {opt.label}
              </button>
            ))}
          </div>
          <div
            style={previewTheme === "light" ? LIGHT_TOKENS : previewTheme === "dark" ? DARK_TOKENS : undefined}
            className={`rounded-lg border border-border p-3 ${
              previewTheme === "dark"
                ? "bg-background"
                : previewTheme === "light"
                ? "bg-background"
                : "bg-secondary/20"
            }`}
          >
            <div className={isMobile ? "overflow-x-auto -mx-1 px-1" : ""}>
              <svg
                viewBox="0 0 640 460"
                preserveAspectRatio="xMidYMid meet"
                className="w-full h-auto block"
                style={isMobile ? { minWidth: "520px" } : undefined}
                role="img"
                aria-labelledby="cam-icu-title cam-icu-desc"
              >
              <title id="cam-icu-title">CAM-ICU delirium screening flowchart</title>
              <desc id="cam-icu-desc">
                Sequential delirium screen. Step 1 assesses sedation with RASS (skip if RASS ≤ −4).
                Then four features are checked in order: Feature 1 acute onset or fluctuating course,
                Feature 2 inattention, Feature 3 altered consciousness, Feature 4 disorganised thinking.
                A NO at Feature 1 or Feature 2 ends as CAM-ICU negative. CAM-ICU is positive when
                Feature 1 AND Feature 2 are present AND either Feature 3 or Feature 4 is present.
              </desc>

              {/* Step 0: RASS */}
              <g {...svgNodeProps("Step 1/5: Assess RASS (stop if RASS ≤ −4)")}>
                <title>Step 1 — Assess RASS</title>
                <rect x="220" y="10" width="200" height="44" rx="6" fill="hsl(var(--primary))" opacity="0.9" stroke="hsl(var(--border))" strokeWidth="0.75" />
                <text x="320" y="30" textAnchor="middle" fontSize="11" fontWeight="700" className="fill-primary-foreground">
                  Step 1 — Assess RASS
                </text>
                <text x="320" y="44" textAnchor="middle" fontSize="9" className="fill-primary-foreground">
                  If RASS ≤ −4 → unassessable (stop)
                </text>
              </g>

              <path d="M 320 54 L 320 78" stroke="hsl(var(--foreground))" strokeWidth="1.5" aria-label="Proceed to Feature 1">
                <title>Proceed from Step 1 to Feature 1</title>
              </path>

              {/* Feature 1 */}
              <g {...svgNodeProps("Step 2/5 — Feature 1: Acute onset or fluctuating course")}>
                <title>Feature 1 — Acute onset OR fluctuating course</title>
                <rect x="180" y="80" width="280" height="58" rx="6" fill="hsl(var(--clinical))" opacity="0.9" stroke="hsl(var(--border))" strokeWidth="0.75" />
                <text x="320" y="100" textAnchor="middle" fontSize="11" fontWeight="700" className="fill-primary-foreground">
                  Feature 1 — Acute onset OR fluctuating course
                </text>
                <text x="320" y="116" textAnchor="middle" fontSize="9" className="fill-primary-foreground">
                  Δ from baseline in last 24 h?
                </text>
                <text x="320" y="128" textAnchor="middle" fontSize="9" className="fill-primary-foreground">
                  Mental status fluctuated in past 24 h?
                </text>
              </g>

              {/* No → CAM-ICU negative */}
              <g {...svgNodeProps("Branch no: Feature 1 → CAM-ICU negative")}>
                <title>Feature 1 NO → CAM-ICU negative</title>
                <path d="M 180 109 L 60 109 L 60 200" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" />
                <text x="100" y="100" fontSize="9" className="fill-muted-foreground" fontWeight="600">NO</text>
              </g>

              <g {...svgNodeProps("Branch yes: Feature 1 → Feature 2")}>
                <title>Feature 1 YES → Feature 2</title>
                <path d="M 320 138 L 320 162" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
                <text x="328" y="155" fontSize="9" className="fill-foreground" fontWeight="600">YES</text>
              </g>

              {/* Feature 2 */}
              <g {...svgNodeProps("Step 3/5 — Feature 2: Inattention (SAVEAHAART, >2 errors positive)")}>
                <title>Feature 2 — Inattention</title>
                <rect x="180" y="164" width="280" height="56" rx="6" fill="hsl(var(--icu))" opacity="0.9" stroke="hsl(var(--border))" strokeWidth="0.75" />
                <text x="320" y="184" textAnchor="middle" fontSize="11" fontWeight="700" className="fill-primary-foreground">
                  Feature 2 — Inattention
                </text>
                <text x="320" y="200" textAnchor="middle" fontSize="9" className="fill-primary-foreground">
                  SAVEAHAART letters or pictures
                </text>
                <text x="320" y="212" textAnchor="middle" fontSize="9" className="fill-primary-foreground">
                  {">"} 2 errors = positive
                </text>
              </g>

              <g {...svgNodeProps("Branch no: Feature 2 → CAM-ICU negative")}>
                <title>Feature 2 NO → CAM-ICU negative</title>
                <path d="M 180 192 L 60 192 L 60 230" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" />
                <text x="100" y="183" fontSize="9" className="fill-muted-foreground" fontWeight="600">NO</text>
              </g>

              <g {...svgNodeProps("Branch yes: Feature 2 → Feature 3")}>
                <title>Feature 2 YES → Feature 3</title>
                <path d="M 320 220 L 320 244" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
                <text x="328" y="237" fontSize="9" className="fill-foreground" fontWeight="600">YES</text>
              </g>

              {/* Feature 3 */}
              <g {...svgNodeProps("Step 4/5 — Feature 3: Altered consciousness (RASS ≠ 0)")}>
                <title>Feature 3 — Altered consciousness</title>
                <rect x="180" y="246" width="280" height="44" rx="6" fill="hsl(var(--pharmacology))" opacity="0.9" stroke="hsl(var(--border))" strokeWidth="0.75" />
                <text x="320" y="266" textAnchor="middle" fontSize="11" fontWeight="700" className="fill-primary-foreground">
                  Feature 3 — Altered consciousness
                </text>
                <text x="320" y="280" textAnchor="middle" fontSize="9" className="fill-primary-foreground">
                  Current RASS ≠ 0
                </text>
              </g>

              {/* If F3 yes → POSITIVE */}
              <g {...svgNodeProps("Branch yes: Feature 3 → CAM-ICU positive")}>
                <title>Feature 3 YES → CAM-ICU positive</title>
                <path d="M 460 268 L 540 268 L 540 380" stroke="hsl(var(--destructive))" strokeWidth="1.5" fill="none" />
                <text x="475" y="262" fontSize="9" className="fill-destructive" fontWeight="600">YES</text>
              </g>

              {/* If F3 no → check F4 */}
              <g {...svgNodeProps("Branch no: Feature 3 → Feature 4")}>
                <title>Feature 3 NO → Feature 4</title>
                <path d="M 320 290 L 320 312" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
                <text x="328" y="305" fontSize="9" className="fill-foreground" fontWeight="600">NO</text>
              </g>

              {/* Feature 4 */}
              <g {...svgNodeProps("Step 5/5 — Feature 4: Disorganised thinking (≥1 error positive)")}>
                <title>Feature 4 — Disorganised thinking</title>
                <rect x="180" y="314" width="280" height="56" rx="6" fill="hsl(var(--physiology))" opacity="0.9" stroke="hsl(var(--border))" strokeWidth="0.75" />
                <text x="320" y="334" textAnchor="middle" fontSize="11" fontWeight="700" className="fill-primary-foreground">
                  Feature 4 — Disorganised thinking
                </text>
                <text x="320" y="350" textAnchor="middle" fontSize="9" className="fill-primary-foreground">
                  4 yes/no questions + 2-step command
                </text>
                <text x="320" y="362" textAnchor="middle" fontSize="9" className="fill-primary-foreground">
                  {"≥"} 1 error = positive
                </text>
              </g>

              <g {...svgNodeProps("Branch no: Feature 4 → CAM-ICU negative")}>
                <title>Feature 4 NO → CAM-ICU negative</title>
                <path d="M 180 342 L 60 342 L 60 392" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" />
                <text x="100" y="333" fontSize="9" className="fill-muted-foreground" fontWeight="600">NO</text>
              </g>

              <g {...svgNodeProps("Branch yes: Feature 4 → CAM-ICU positive")}>
                <title>Feature 4 YES → CAM-ICU positive</title>
                <path d="M 460 342 L 540 342 L 540 380" stroke="hsl(var(--destructive))" strokeWidth="1.5" fill="none" />
                <text x="475" y="333" fontSize="9" className="fill-destructive" fontWeight="600">YES</text>
              </g>

              {/* Outcome — Negative */}
              <g {...svgNodeProps("Outcome: CAM-ICU negative (no delirium)")}>
                <title>CAM-ICU NEGATIVE — no delirium</title>
                <rect x="10" y="392" width="180" height="48" rx="6" fill="hsl(var(--muted))" opacity="0.6" stroke="hsl(var(--border))" />
                <text x="100" y="413" textAnchor="middle" fontSize="11" fontWeight="700" className="fill-foreground">
                  CAM-ICU NEGATIVE
                </text>
                <text x="100" y="428" textAnchor="middle" fontSize="9" className="fill-muted-foreground">
                  no delirium
                </text>
              </g>

              {/* Outcome — Positive */}
              <g {...svgNodeProps("Outcome: CAM-ICU positive (delirium — apply ABCDEF bundle)")}>
                <title>CAM-ICU POSITIVE — delirium present, apply ABCDEF bundle</title>
                <rect x="450" y="382" width="180" height="58" rx="6" fill="hsl(var(--destructive))" opacity="0.9" stroke="hsl(var(--border))" strokeWidth="0.75" />
                <text x="540" y="404" textAnchor="middle" fontSize="11" fontWeight="700" className="fill-primary-foreground">
                  CAM-ICU POSITIVE
                </text>
                <text x="540" y="420" textAnchor="middle" fontSize="9" className="fill-primary-foreground">
                  Delirium present
                </text>
                <text x="540" y="432" textAnchor="middle" fontSize="9" className="fill-primary-foreground">
                  Apply ABCDEF bundle
                </text>
              </g>

              <defs />

              </svg>

              {/* Screen-reader-only linear walkthrough — many SR's skip into SVG internals
                  when role=img, so we mirror the flow as semantic HTML for assistive tech. */}
              <ol className="sr-only" aria-label="CAM-ICU flowchart, step-by-step">
                <li>Step 1 — Assess RASS. If RASS is less than or equal to minus 4, the patient is unassessable; stop screening.</li>
                <li>Feature 1 — Acute onset or fluctuating course. If NO, the result is CAM-ICU negative. If YES, continue to Feature 2.</li>
                <li>Feature 2 — Inattention (SAVEAHAART; more than 2 errors is positive). If NO, the result is CAM-ICU negative. If YES, continue to Feature 3.</li>
                <li>Feature 3 — Altered consciousness (RASS not equal to 0). If YES, the result is CAM-ICU positive. If NO, continue to Feature 4.</li>
                <li>Feature 4 — Disorganised thinking (4 yes/no questions plus 2-step command; 1 or more errors is positive). If YES, the result is CAM-ICU positive. If NO, the result is CAM-ICU negative.</li>
                <li>CAM-ICU positive: delirium present — apply the ABCDEF bundle. CAM-ICU negative: no delirium.</li>
              </ol>
            </div>
          </div>

          <div className="rounded-md p-3 bg-secondary/30 border border-border text-xs">
            <p className="font-semibold text-foreground mb-1">The rule</p>
            <p className="text-muted-foreground">
              CAM-ICU <strong className="text-foreground">positive = Feature 1 AND Feature 2 AND (Feature 3 OR Feature 4)</strong>.
              If RASS ≤ −4, the patient is unassessable — re-screen when lighter.
            </p>
          </div>

          <div
            className="rounded-md p-3 bg-secondary/20 border border-border text-[11px]"
            aria-label="Icon legend"
          >
            <p className="font-semibold text-foreground mb-1.5">Icon legend</p>
            <ul className="space-y-1.5 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span
                  role="presentation"
                  aria-hidden="true"
                  className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-destructive/15 text-destructive ring-1 ring-destructive/30 shrink-0 mt-0.5"
                >
                  <AlertTriangle className="w-2.5 h-2.5" strokeWidth={2} aria-hidden="true" focusable={false} role="presentation" />
                </span>
                <span>
                  <strong className="text-foreground">UI badge</strong> — circular tinted icon used in surrounding callouts (e.g.&nbsp;“Why screen?”). Decorative, not part of the flowchart.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span
                  role="presentation"
                  aria-hidden="true"
                  className="inline-block w-4 h-4 rounded-sm shrink-0 mt-0.5"
                  style={{ background: "hsl(var(--destructive) / 0.9)", border: "0.75px solid hsl(var(--border))" }}
                />
                <span>
                  <strong className="text-foreground">In-diagram node</strong> — solid rounded rectangle inside the SVG. The red/destructive fill marks the <em>CAM-ICU positive</em> outcome; coloured edges leaving a feature node show the “positive” branch.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" aria-hidden="true" focusable={false} />
                <span>
                  <strong className="text-foreground">Walkthrough tick / cross</strong> — appears only in the step-by-step walkthrough tab to mark a feature answered YES or NO. Not shown inside the flowchart SVG.
                </span>
              </li>
            </ul>
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
              <p className="font-semibold text-foreground mb-1 flex items-center gap-2">
                <span
                  role="presentation"
                  aria-hidden="true"
                  className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-destructive/15 text-destructive ring-1 ring-destructive/30 shrink-0"
                >
                  <AlertTriangle
                    className="w-3 h-3"
                    strokeWidth={2}
                    aria-hidden="true"
                    focusable={false}
                    role="presentation"
                  />
                </span>
                Why screen?
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
    <DiagramFigure
      id="camicu-flowchart-diagram"
      title="CAMICU flowchart"
      description="Auto-generated wrapper for the CAMICU flowchart clinical decision flowchart. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
                  <div
        className={`rounded-md border p-2.5 text-xs ${
          yes ? "border-destructive/40 bg-destructive/5" : "border-primary/30 bg-primary/5"
        }`}
      >
        <div className="flex items-start gap-2">
          {yes ? (
            <CheckCircle2 className="w-4 h-4 text-destructive shrink-0 mt-0.5" aria-hidden="true" focusable={false} />
          ) : (
            <XCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" focusable={false} />
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
    </DiagramFigure>
  );
};

export default CAMICUFlowchartDiagram;

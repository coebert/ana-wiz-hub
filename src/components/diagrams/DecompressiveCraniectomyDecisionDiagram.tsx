import { useState } from "react";
import { Brain, AlertTriangle, CheckCircle2, XCircle, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ScenarioKey = "decra" | "rescueicp" | "mca";

interface Scenario {
  key: ScenarioKey;
  trial: string;
  context: string;
  population: string;
  trigger: string;
  intervention: string;
  outcome: string;
  verdict: "avoid" | "consider" | "offer";
  verdictText: string;
  takeaway: string;
}

const scenarios: Scenario[] = [
  {
    key: "decra",
    trial: "DECRA (NEJM 2011)",
    context: "Early refractory ICP in diffuse TBI",
    population: "Adults 15–59 y, diffuse TBI, no mass lesion",
    trigger: "ICP > 20 mmHg for > 15 min within any 1 h, after tier-1 only",
    intervention: "Bifrontotemporoparietal craniectomy vs continued medical Rx",
    outcome:
      "Lower ICP and shorter ICU stay, but worse 6-month extended GOS. No mortality difference.",
    verdict: "avoid",
    verdictText: "Do NOT perform DC at this threshold",
    takeaway:
      "An early/low ICP trigger captured patients who would have done well with optimised medical therapy — surgery added harm. Escalate tier-2 medical management first.",
  },
  {
    key: "rescueicp",
    trial: "RESCUEicp (NEJM 2016)",
    context: "Late, truly refractory ICP in TBI",
    population: "Patients 10–65 y with TBI",
    trigger:
      "ICP > 25 mmHg sustained 1–12 h despite optimised tier-1 AND tier-2 therapy (sedation, osmotherapy, hyperventilation, CSF drainage)",
    intervention:
      "Last-tier large fronto-temporo-parietal or bifrontal DC vs barbiturate coma + continued medical Rx",
    outcome:
      "6-mo mortality 27 % vs 49 % (NNT ≈ 5). Survivors had more vegetative state and severe disability; upper-severe disability and good recovery similar. Survival benefit persists at 24 mo.",
    verdict: "consider",
    verdictText: "Consider DC after explicit family counselling",
    takeaway:
      "DC saves lives but trades death for dependency. Frame the decision around acceptable outcome states, not just survival; MDT discussion with neurosurgery and family.",
  },
  {
    key: "mca",
    trial: "DESTINY / DECIMAL / HAMLET (2007) + DESTINY II (2014)",
    context: "Malignant MCA infarction (ischaemic stroke)",
    population:
      "Complete MCA territory infarct with depressed consciousness, midline shift, no haemorrhagic conversion",
    trigger:
      "Clinical + imaging diagnosis of malignant MCA syndrome within 48 h of stroke onset",
    intervention: "Hemicraniectomy + duroplasty (≥ 12 cm flap) vs best medical care",
    outcome:
      "Age ≤ 60: mortality 22 % vs 71 %; mRS ≤ 3 at 12 mo 43 % vs 21 % (NNT ≈ 2 survival, ≈ 4 mRS ≤ 4). Age > 60 (DESTINY II): survival doubled but most survivors mRS 4–5; no patient mRS ≤ 2.",
    verdict: "offer",
    verdictText: "Offer DC within 48 h (especially age ≤ 60)",
    takeaway:
      "Strongest evidence base of the three. Time-critical — refer to neurosurgery early. Above 60 y, individualised consent around tolerance for moderate-to-severe disability.",
  },
];

const verdictStyle: Record<
  Scenario["verdict"],
  { ring: string; chip: string; icon: typeof CheckCircle2; iconClass: string }
> = {
  avoid: {
    ring: "border-destructive/40 bg-destructive/5",
    chip: "bg-destructive/15 text-destructive border-destructive/30",
    icon: XCircle,
    iconClass: "text-destructive",
  },
  consider: {
    ring: "border-amber-500/40 bg-amber-500/5",
    chip: "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30",
    icon: AlertTriangle,
    iconClass: "text-amber-600 dark:text-amber-400",
  },
  offer: {
    ring: "border-emerald-500/40 bg-emerald-500/5",
    chip: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
    icon: CheckCircle2,
    iconClass: "text-emerald-600 dark:text-emerald-400",
  },
};

const DecompressiveCraniectomyDecisionDiagram = () => {
  const [active, setActive] = useState<ScenarioKey>("rescueicp");
  const current = scenarios.find((s) => s.key === active)!;
  const style = verdictStyle[current.verdict];
  const VerdictIcon = style.icon;

  return (
    <figure className="rounded-xl border border-border bg-card p-4 md:p-6">
      <figcaption className="mb-4">
        <h4 className="text-base font-serif font-bold text-foreground flex items-center gap-2">
          <Brain className="h-4 w-4 text-clinical" aria-hidden />
          When to consider decompressive craniectomy
        </h4>
        <p className="text-xs text-muted-foreground mt-1">
          Three trial-defined clinical scenarios — choose the patient context to see triggers, evidence, and the consent framing.
        </p>
      </figcaption>

      {/* Entry node */}
      <div className="rounded-lg border border-border bg-secondary/40 p-3 mb-3">
        <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">
          Step 1 · Identify the clinical scenario
        </p>
        <p className="text-sm text-foreground mt-1">
          Decompressive craniectomy is a tier-3, last-line intervention. The right answer depends entirely on <em>which</em> pathology and at <em>which</em> point in the escalation ladder you are.
        </p>
      </div>

      {/* Scenario selector */}
      <div className="grid sm:grid-cols-3 gap-2 mb-4">
        {scenarios.map((s) => {
          const isActive = s.key === active;
          const v = verdictStyle[s.verdict];
          return (
            <button
              key={s.key}
              type="button"
              onClick={() => setActive(s.key)}
              aria-pressed={isActive}
              className={cn(
                "text-left rounded-lg border p-3 transition-all",
                isActive
                  ? cn(v.ring, "ring-2 ring-primary/40 shadow-sm")
                  : "border-border bg-background hover:border-primary/40 hover:bg-secondary/30"
              )}
            >
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
                Scenario {scenarios.indexOf(s) + 1}
              </p>
              <p className="text-sm font-semibold text-foreground mt-0.5">{s.context}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.trial}</p>
            </button>
          );
        })}
      </div>

      {/* Flow arrow */}
      <div className="flex items-center justify-center mb-3" aria-hidden>
        <div className="h-px flex-1 bg-border" />
        <ChevronRight className="h-4 w-4 text-muted-foreground rotate-90" />
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* Decision detail */}
      <div className={cn("rounded-lg border p-4 space-y-3", style.ring)}>
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">
              Step 2 · Check trial criteria
            </p>
            <p className="text-sm font-semibold text-foreground mt-0.5">{current.trial}</p>
          </div>
          <span
            className={cn(
              "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold",
              style.chip
            )}
          >
            <VerdictIcon className={cn("h-3.5 w-3.5", style.iconClass)} aria-hidden />
            {current.verdictText}
          </span>
        </div>

        <dl className="grid sm:grid-cols-2 gap-3 text-sm">
          <div className="rounded-md bg-background/60 border border-border p-3">
            <dt className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              Population
            </dt>
            <dd className="text-foreground mt-1">{current.population}</dd>
          </div>
          <div className="rounded-md bg-background/60 border border-border p-3">
            <dt className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              Trigger threshold
            </dt>
            <dd className="text-foreground mt-1">{current.trigger}</dd>
          </div>
          <div className="rounded-md bg-background/60 border border-border p-3">
            <dt className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              Intervention tested
            </dt>
            <dd className="text-foreground mt-1">{current.intervention}</dd>
          </div>
          <div className="rounded-md bg-background/60 border border-border p-3">
            <dt className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              Outcome
            </dt>
            <dd className="text-foreground mt-1">{current.outcome}</dd>
          </div>
        </dl>

        <div className="rounded-md bg-secondary/40 border border-border p-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            Step 3 · Bedside takeaway
          </p>
          <p className="text-sm text-foreground mt-1">{current.takeaway}</p>
        </div>
      </div>

      <p className="text-[11px] text-muted-foreground mt-3 italic">
        Sources: Cooper DJ et al. NEJM 2011 (DECRA); Hutchinson PJ et al. NEJM 2016 (RESCUEicp) and 24-mo follow-up Kolias 2022; Vahedi K et al. Lancet Neurol 2007 (pooled); Jüttler E et al. NEJM 2014 (DESTINY II).
      </p>
    </figure>
  );
};

export default DecompressiveCraniectomyDecisionDiagram;

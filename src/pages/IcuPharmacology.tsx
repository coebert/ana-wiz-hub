import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, FlaskConical, Search, TriangleAlert } from "lucide-react";
import { PageSection } from "@/components/layout/PageSection";
import { PageJsonLd } from "@/components/layout/PageJsonLd";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { icuDrugDoseGroups, icuDrugCount, type DrugDose } from "@/data/icuDrugDoses";
import { icuDrugSafetyGroups } from "@/data/icuDrugSafety";
import { pharmacokineticsFor } from "@/data/pk";
import { pharmacodynamicsFor } from "@/data/pd";
import { drugSlug } from "@/lib/caseDoseReferences";
import { mechanismLinkForDrug } from "@/lib/icuDrugMechanismLinks";

/**
 * Dedicated ICU pharmacology reference: for every formulary drug, the four
 * questions asked on a ward round — what dose, by what route, for how long,
 * and what do I monitor. Structured after the antifungal-stewardship and
 * warfarin-skin-necrosis sections: labelled fields, explicit thresholds and
 * an action for each monitored value.
 */

// Dosing-table slug → safety/PK slug where the datasets name the drug
// differently (strengths, combined agents, class names).
const SLUG_ALIASES: Record<string, string> = {
  "andexanet-alfa-idarucizumab": "andexanet-idarucizumab",
  "regional-citrate": "regional-citrate-anticoagulation",
  "pantoprazole-omeprazole": "proton-pump-inhibitors",
};

const slugBase = (name: string) => drugSlug(name).replace(/-\d.*$/, "");
const slugFor = (name: string): string =>
  SLUG_ALIASES[drugSlug(name)] ?? SLUG_ALIASES[slugBase(name)] ?? drugSlug(name);

const safetyBySlug = new Map(
  icuDrugSafetyGroups.flatMap((g) => g.drugs).map((d) => [d.slug, d]),
);
const safetyFor = (name: string) =>
  safetyBySlug.get(slugFor(name)) ?? safetyBySlug.get(slugBase(name));
const pkFor = (name: string) =>
  pharmacokineticsFor(slugFor(name)) ?? pharmacokineticsFor(slugBase(name));
const pdFor = (name: string) =>
  pharmacodynamicsFor(slugFor(name)) ?? pharmacodynamicsFor(slugBase(name));

/**
 * Course length and review rules by drug group. These are the "for how long"
 * answers that no per-drug dose field carries: stop dates, daily review
 * triggers and the point at which continuation becomes a decision in itself.
 */
const DURATION_RULES: Record<string, string> = {
  "sedation-analgesia":
    "No sedative or opioid infusion should run without a daily sedation hold or lightening and an explicit target score (e.g. RASS 0 to \u22122). Review the indication every day; beyond 5\u20137 days plan a taper of 10\u201320% of the dose per day because iatrogenic withdrawal becomes likely. Review propofol at 48 h and keep it below 4 mg/kg/h.",
  "neuromuscular-blockade":
    "Continuous neuromuscular blockade is a time-limited intervention: in severe ARDS restrict it to about the first 48 h, then stop and reassess. Never continue beyond the indication, and never without confirmed adequate sedation and depth-of-block monitoring.",
  vasoactive:
    "Titrate to the lowest dose that meets the MAP or cardiac-output target and wean as soon as filling, source control and the underlying insult allow. A rising requirement over hours is a trigger to re-examine the patient \u2014 bleeding, missed source, tamponade, adrenal insufficiency \u2014 not simply to increase the dose. Reassess inotropes against a repeat echocardiogram or cardiac-output measurement every 24 h.",
  "cardiac-rhythm":
    "Antiarrhythmic infusions are bridges, not treatments: correct potassium, magnesium, hypoxia, acidosis, sepsis and drug causes in parallel and stop the infusion once rhythm control is stable. Amiodarone loading is followed by a defined maintenance period only, with thyroid, liver and pulmonary surveillance if it continues beyond weeks.",
  neuro:
    "Anticonvulsant loading is immediate; maintenance continues while seizure risk persists, with levels and a neurology plan for step-down. Osmotherapy and hypertonic saline are given as targeted boluses or short infusions against an ICP or sodium target, not open-ended, and are stopped once the target is met.",
  coagulation:
    "Thromboprophylaxis continues while immobility and risk persist. Therapeutic anticoagulation needs a documented indication and a planned duration, reassessed daily against bleeding risk, platelet count, renal function and planned procedures. Reversal agents and blood products are single-episode treatments \u2014 re-dose only on repeat assessment.",
  "metabolic-gi":
    "These agents are short courses tied to a physiological target (glucose, sodium, cortisol response, gastric protection). Review at least daily and stop when the target is met or the risk factor resolves; continuing after resolution is a common source of iatrogenic harm. Stress-ulcer prophylaxis should stop when enteral feeding is established and the risk factors have gone.",
  infection:
    "Apply Start Smart Then Focus: document indication, dose and a review date, then reassess at 48\u201372 h with cultures, de-escalate, and switch IV to oral when eating and stable. Most ICU infections are treated for 5\u20137 days, with defined longer courses (endocarditis, bone and joint, undrained collections). Antifungals need the same stewardship: treat proven or strongly suspected invasive disease, review at 48\u201372 h with cultures, \u03b2-D-glucan and imaging, step down from an echinocandin to fluconazole where the isolate is susceptible, remove or exchange the infected line, and stop empirical cover when the work-up is negative.",
};

const durationRuleFor = (groupId: string): string | undefined =>
  DURATION_RULES[groupId] ??
  Object.entries(DURATION_RULES).find(([key]) => groupId.includes(key))?.[1];

interface Props {
  drug: DrugDose;
}

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</dt>
    <dd className="mt-0.5 text-sm text-foreground/85">{children}</dd>
  </div>
);

const DrugPharmacologyCard = ({ drug }: Props) => {
  const safety = safetyFor(drug.drug);
  const pk = pkFor(drug.drug);
  const pd = pdFor(drug.drug);
  const slug = drugSlug(drug.drug);
  const mechanism = mechanismLinkForDrug(drug.drug);

  const duration = [
    pk?.duration ? `Single dose: ${pk.duration}` : null,
    pk?.halfLife ? `Half-life: ${pk.halfLife}` : null,
    pk?.infusionBehaviour ? `Prolonged infusion: ${pk.infusionBehaviour}` : null,
  ].filter(Boolean) as string[];

  return (
    <article
      id={`drug-${slug}`}
      data-drug={slug}
      className="scroll-mt-24 rounded-xl border border-border bg-card p-4 sm:p-5"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-base font-semibold text-foreground">{drug.drug}</h3>
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs">
          {mechanism && (
            <Link to={mechanism} className="text-icu underline-offset-4 hover:underline">
              Mechanism &amp; kinetics
            </Link>
          )}
          <Link
            to={`/intensive-care/drug-safety?drug=${slug}`}
            className="text-icu underline-offset-4 hover:underline"
          >
            Safety profile
          </Link>
          <Link
            to={`/intensive-care/drug-doses?drug=${slug}`}
            className="text-icu underline-offset-4 hover:underline"
          >
            Dosing table
          </Link>
        </div>
      </div>

      <p className="mt-1.5 text-sm text-muted-foreground">{drug.indications}</p>

      <dl className="mt-3 grid gap-3 sm:grid-cols-2">
        <Field label="Dose (adult)">{drug.dose}</Field>
        <Field label="Route">
          {drug.route}
          <span className="block text-xs text-muted-foreground">{drug.frequency}</span>
        </Field>
        {drug.paediatricDose && <Field label="Dose (child)">{drug.paediatricDose}</Field>}
        {drug.neonatalDose && <Field label="Dose (neonate)">{drug.neonatalDose}</Field>}
        {duration.length > 0 && (
          <Field label="Duration of effect">
            <ul className="space-y-1">
              {duration.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </Field>
        )}
        {pd?.titrationTarget && <Field label="Titrate against">{pd.titrationTarget}</Field>}
        {pd?.therapeuticWindow && (
          <Field label="Therapeutic window">{pd.therapeuticWindow}</Field>
        )}
        {pk?.organImpairment && (
          <Field label="Organ failure &amp; RRT">{pk.organImpairment}</Field>
        )}
      </dl>

      {safety?.monitoring?.length ? (
        <div className="mt-3 rounded-lg border border-border bg-muted/30 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Monitoring &amp; action thresholds
          </p>
          <ul className="mt-1.5 list-disc space-y-1 pl-4 text-sm text-muted-foreground">
            {safety.monitoring.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {drug.notes && (
        <p className="mt-3 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Practice point: </span>
          {drug.notes}
        </p>
      )}

      {safety?.alert && (
        <p className="mt-3 flex items-start gap-2 rounded-lg border border-icu/30 bg-icu/5 p-3 text-sm text-foreground/85">
          <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-icu" aria-hidden />
          <span>
            <span className="font-medium">Safety alert: </span>
            {safety.alert}
          </span>
        </p>
      )}
    </article>
  );
};

const DESCRIPTION =
  "ICU pharmacology reference: dose, route, duration of therapy and monitoring with action thresholds for every drug in the adult critical care formulary, grouped by class.";

const IcuPharmacology = () => {
  const [search, setSearch] = useState("");
  const [activeGroup, setActiveGroup] = useState("all");

  const groups = useMemo(() => {
    const q = search.trim().toLowerCase();
    return icuDrugDoseGroups
      .filter((g) => activeGroup === "all" || g.id === activeGroup)
      .map((g) => ({
        ...g,
        drugs: q
          ? g.drugs.filter((d) =>
              [d.drug, d.dose, d.route, d.frequency, d.indications, d.notes ?? ""]
                .join(" ")
                .toLowerCase()
                .includes(q),
            )
          : g.drugs,
      }))
      .filter((g) => g.drugs.length > 0);
  }, [search, activeGroup]);

  const shown = groups.reduce((n, g) => n + g.drugs.length, 0);

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>ICU Pharmacology: Dose, Route, Duration, Monitoring</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://anaesthesiacore.app/intensive-care/pharmacology" />
        <meta property="og:url" content="https://anaesthesiacore.app/intensive-care/pharmacology" />
      </Helmet>
      <PageJsonLd name="ICU Pharmacology" description={DESCRIPTION} />

      <PageSection className="pt-8 pb-16">
        <Link
          to="/intensive-care"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Intensive Care
        </Link>

        <div className="mt-4 flex items-start gap-3">
          <div className="rounded-lg bg-icu/10 p-2.5 text-icu">
            <FlaskConical className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">ICU Pharmacology</h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Every drug in the adult critical care formulary set out the way it
              is used at the bedside: what dose, by what route, for how long, and
              what you monitor with the value that makes you act. Each class
              opens with its course-length and review rule, then lists per-drug
              dosing, duration of effect, titration target, organ-failure
              handling and monitoring thresholds.
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-start gap-2.5 rounded-lg border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
          <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-icu" aria-hidden />
          <p>
            Revision aid only. Doses assume a 70 kg adult with normal organ
            function; check the BNF, the product literature and your local
            critical care guideline before prescribing, and adjust for weight,
            renal and hepatic function.
          </p>
        </div>

        <div className="relative mt-6 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search drug, indication or route (e.g. vancomycin, sedation)…"
            className="pl-9"
            aria-label="Search ICU pharmacology"
          />
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          <Button
            size="sm"
            variant={activeGroup === "all" ? "default" : "outline"}
            className="shrink-0"
            onClick={() => setActiveGroup("all")}
          >
            All classes
          </Button>
          {icuDrugDoseGroups.map((g) => (
            <Button
              key={g.id}
              size="sm"
              variant={activeGroup === g.id ? "default" : "outline"}
              className="shrink-0"
              onClick={() => setActiveGroup(g.id)}
            >
              {g.title}
            </Button>
          ))}
        </div>

        <p className="mt-3 text-sm text-muted-foreground">
          {shown} of {icuDrugCount} drugs shown
        </p>

        {shown === 0 && (
          <p className="mt-8 rounded-lg border border-border bg-card p-6 text-sm text-muted-foreground">
            No drugs match that search. Try a drug name, an indication or a route.
          </p>
        )}

        <div className="mt-8 space-y-12">
          {groups.map((group) => (
            <section key={group.id} id={group.id} className="scroll-mt-24">
              <h2 className="text-xl font-semibold tracking-tight">{group.title}</h2>
              <p className="mt-1 max-w-3xl text-sm text-muted-foreground">{group.blurb}</p>

              {durationRuleFor(group.id) && (
                <p className="mt-3 max-w-3xl rounded-lg border border-icu/25 bg-icu/5 p-3 text-sm text-foreground/85">
                  <span className="font-medium">Duration &amp; review: </span>
                  {durationRuleFor(group.id)}
                </p>
              )}

              <div className="mt-4 space-y-4">
                {group.drugs.map((d) => (
                  <DrugPharmacologyCard key={d.drug} drug={d} />
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 rounded-xl border border-border bg-card p-5">
          <h2 className="text-lg font-semibold">Related pharmacology tools</h2>
          <ul className="mt-2 space-y-1.5 text-sm text-icu">
            <li>
              <Link to="/intensive-care/drug-doses" className="underline-offset-4 hover:underline">
                Dosing table (adult, child, neonate)
              </Link>
            </li>
            <li>
              <Link to="/intensive-care/infusions" className="underline-offset-4 hover:underline">
                Infusion recipes, diluents and mL/h rates
              </Link>
            </li>
            <li>
              <Link to="/intensive-care/drug-safety" className="underline-offset-4 hover:underline">
                Drug safety: interactions, contraindications, monitoring
              </Link>
            </li>
            <li>
              <Link to="/intensive-care/interaction-checker" className="underline-offset-4 hover:underline">
                Interaction checker
              </Link>
            </li>
            <li>
              <Link to="/intensive-care/drug-cards" className="underline-offset-4 hover:underline">
                Full drug cards
              </Link>
            </li>
            <li>
              <Link to="/intensive-care/calculator" className="underline-offset-4 hover:underline">
                Infusion rate calculator
              </Link>
            </li>
          </ul>
        </div>
      </PageSection>
    </main>
  );
};

export default IcuPharmacology;

import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Columns2, ArrowLeftRight, TriangleAlert, ShieldAlert } from "lucide-react";
import { PageSection } from "@/components/layout/PageSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { icuDrugMechanismGroups } from "@/data/icuDrugMechanisms";
import { icuDrugDoseGroups } from "@/data/icuDrugDoses";
import { icuDrugSafetyGroups } from "@/data/icuDrugSafety";
import { icuDrugPharmacokinetics } from "@/data/pk";
import { findInteractions, severityLabel, type InteractionSeverity } from "@/data/icuDrugInteractions";

interface ComparableDrug {
  slug: string;
  name: string;
  groupTitle: string;
  drugClass: string;
  pharmacodynamics: string;
  metabolismNarrative: string;
  adverseEffects: string;
  dose?: {
    dose: string;
    route: string;
    frequency: string;
    indications: string;
    notes?: string;
    paediatricDose?: string;
    neonatalDose?: string;
  };
  safety?: {
    interactions: string[];
    contraindications: string[];
    monitoring: string[];
    alert?: string;
  };
  pk?: (typeof icuDrugPharmacokinetics)[string];
}

const doseByName = new Map(
  icuDrugDoseGroups.flatMap((g) => g.drugs).map((d) => [d.drug, d]),
);
const safetyBySlug = new Map(
  icuDrugSafetyGroups.flatMap((g) => g.drugs).map((d) => [d.slug, d]),
);

const comparableDrugs: ComparableDrug[] = icuDrugMechanismGroups
  .flatMap((g) =>
    g.drugs.map<ComparableDrug>((d) => {
      const dose = doseByName.get(d.drug);
      const safety = safetyBySlug.get(d.slug);
      return {
        slug: d.slug,
        name: d.drug,
        groupTitle: g.title,
        drugClass: d.drugClass,
        pharmacodynamics: d.pharmacodynamics,
        metabolismNarrative: d.metabolism,
        adverseEffects: d.adverseEffects,
        dose: dose
          ? {
              dose: dose.dose,
              route: dose.route,
              frequency: dose.frequency,
              indications: dose.indications,
              notes: dose.notes,
              paediatricDose: dose.paediatricDose,
              neonatalDose: dose.neonatalDose,
            }
          : undefined,
        safety: safety
          ? {
              interactions: safety.interactions,
              contraindications: safety.contraindications,
              monitoring: safety.monitoring,
              alert: safety.alert,
            }
          : undefined,
        pk: icuDrugPharmacokinetics[d.slug],
      };
    }),
  )
  .sort((a, b) => a.name.localeCompare(b.name));

const severityStyles: Record<InteractionSeverity, string> = {
  avoid: "border-destructive/40 bg-destructive/10",
  major: "border-icu/40 bg-icu/10",
  moderate: "border-border bg-surface",
};

const severityBadge: Record<InteractionSeverity, "destructive" | "default" | "secondary"> = {
  avoid: "destructive",
  major: "default",
  moderate: "secondary",
};

/** One comparison row: a label plus the value for each drug. */
const Row = ({
  label,
  a,
  b,
  nameA,
  nameB,
  list,
}: {
  label: string;
  a?: string | string[];
  b?: string | string[];
  nameA: string;
  nameB: string;
  list?: boolean;
}) => {
  if (!a && !b) return null;
  const render = (value?: string | string[]) => {
    if (!value || (Array.isArray(value) && value.length === 0)) {
      return <p className="text-sm text-muted-foreground">Not recorded in this dataset.</p>;
    }
    if (list && Array.isArray(value)) {
      return (
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          {value.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    }
    return (
      <p className="text-sm leading-relaxed text-muted-foreground">
        {Array.isArray(value) ? value.join(" ") : value}
      </p>
    );
  };

  return (
    <div className="border-t border-border py-4 first:border-t-0 first:pt-0">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">{label}</h3>
      <div className="mt-2 grid gap-4 lg:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-3">
          <p className="mb-1.5 text-xs font-medium text-icu lg:hidden">{nameA}</p>
          {render(a)}
        </div>
        <div className="rounded-lg border border-border bg-card p-3">
          <p className="mb-1.5 text-xs font-medium text-icu lg:hidden">{nameB}</p>
          {render(b)}
        </div>
      </div>
    </div>
  );
};

const IcuDrugComparison = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [slugA, setSlugA] = useState(searchParams.get("a") ?? "");
  const [slugB, setSlugB] = useState(searchParams.get("b") ?? "");

  useEffect(() => {
    const next = new URLSearchParams();
    if (slugA) next.set("a", slugA);
    if (slugB) next.set("b", slugB);
    setSearchParams(next, { replace: true });
  }, [slugA, slugB, setSearchParams]);

  const a = comparableDrugs.find((d) => d.slug === slugA);
  const b = comparableDrugs.find((d) => d.slug === slugB);
  const sameDrug = Boolean(slugA && slugA === slugB);
  const ready = Boolean(a && b && !sameDrug);
  const findings = useMemo(
    () => (ready ? findInteractions(slugA, slugB) : []),
    [ready, slugA, slugB],
  );

  const nameA = a?.name ?? "First drug";
  const nameB = b?.name ?? "Second drug";

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>ICU Drug Comparison: Doses, Kinetics and Safety Side by Side</title>
        <meta
          name="description"
          content="Compare any two adult intensive care drugs side by side — dose and route, pharmacodynamics, metabolism and elimination, adverse effects."
        />
        <link rel="canonical" href="https://anaesthesiacore.app/intensive-care/drug-comparison" />
        <meta property="og:url" content="https://anaesthesiacore.app/intensive-care/drug-comparison" />
      </Helmet>

      <PageSection className="pt-8 pb-16">
        <Link
          to="/intensive-care"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Intensive Care
        </Link>

        <div className="mt-4 flex items-start gap-3">
          <div className="rounded-lg bg-icu/10 p-2.5 text-icu">
            <Columns2 className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">ICU Drug Comparison</h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Choose two of the {comparableDrugs.length} adult critical care drugs to compare their
              doses, pharmacodynamics, metabolism, adverse effects and safety requirements side by
              side — the "compare and contrast" viva question in one view.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
          <label className="block text-sm">
            <span className="mb-1.5 block font-medium">First drug</span>
            <Select value={slugA} onValueChange={setSlugA}>
              <SelectTrigger aria-label="First drug">
                <SelectValue placeholder="Select a drug" />
              </SelectTrigger>
              <SelectContent>
                {comparableDrugs.map((d) => (
                  <SelectItem key={d.slug} value={d.slug}>
                    {d.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </label>

          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setSlugA(slugB);
              setSlugB(slugA);
            }}
            disabled={!slugA && !slugB}
            className="w-full sm:w-auto"
          >
            <ArrowLeftRight aria-hidden className="h-4 w-4" /> Swap
          </Button>

          <label className="block text-sm">
            <span className="mb-1.5 block font-medium">Second drug</span>
            <Select value={slugB} onValueChange={setSlugB}>
              <SelectTrigger aria-label="Second drug">
                <SelectValue placeholder="Select a drug" />
              </SelectTrigger>
              <SelectContent>
                {comparableDrugs.map((d) => (
                  <SelectItem key={d.slug} value={d.slug}>
                    {d.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </label>
        </div>

        {(slugA || slugB) && (
          <div className="mt-3">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setSlugA("");
                setSlugB("");
              }}
            >
              Clear selection
            </Button>
          </div>
        )}

        {!ready ? (
          <p className="mt-8 rounded-lg border border-border bg-surface p-4 text-sm text-muted-foreground">
            {sameDrug
              ? "Those are the same drug — choose a second, different drug."
              : "Select two different drugs to build the comparison."}
          </p>
        ) : (
          <div className="mt-8" aria-live="polite">
            <div className="hidden gap-4 lg:grid lg:grid-cols-2">
              {[a!, b!].map((d) => (
                <div key={d.slug} className="rounded-lg border border-icu/30 bg-icu/5 p-3">
                  <h2 className="font-serif text-lg font-bold text-foreground">{d.name}</h2>
                  <p className="text-xs text-muted-foreground">{d.groupTitle}</p>
                </div>
              ))}
            </div>
            <h2 className="font-serif text-xl font-bold text-foreground lg:hidden">
              {nameA} vs {nameB}
            </h2>

            <div className="mt-4">
              <Row label="Drug class" nameA={nameA} nameB={nameB} a={a!.drugClass} b={b!.drugClass} />
              <Row
                label="Adult dose"
                nameA={nameA}
                nameB={nameB}
                a={a!.dose?.dose}
                b={b!.dose?.dose}
              />
              <Row
                label="Route and frequency"
                nameA={nameA}
                nameB={nameB}
                a={a!.dose ? `${a!.dose.route} — ${a!.dose.frequency}` : undefined}
                b={b!.dose ? `${b!.dose.route} — ${b!.dose.frequency}` : undefined}
              />
              <Row
                label="Paediatric dose"
                nameA={nameA}
                nameB={nameB}
                a={a!.dose?.paediatricDose}
                b={b!.dose?.paediatricDose}
              />
              <Row
                label="Neonatal dose"
                nameA={nameA}
                nameB={nameB}
                a={a!.dose?.neonatalDose}
                b={b!.dose?.neonatalDose}
              />
              <Row
                label="Main indications"
                nameA={nameA}
                nameB={nameB}
                a={a!.dose?.indications}
                b={b!.dose?.indications}
              />
              <Row
                label="Pharmacodynamics"
                nameA={nameA}
                nameB={nameB}
                a={a!.pharmacodynamics}
                b={b!.pharmacodynamics}
              />
              <Row
                label="Onset and duration"
                nameA={nameA}
                nameB={nameB}
                a={a!.pk ? `Onset: ${a!.pk.onset} Duration: ${a!.pk.duration}` : undefined}
                b={b!.pk ? `Onset: ${b!.pk.onset} Duration: ${b!.pk.duration}` : undefined}
              />
              <Row
                label="Half-life"
                nameA={nameA}
                nameB={nameB}
                a={a!.pk?.halfLife}
                b={b!.pk?.halfLife}
              />
              <Row
                label="Distribution and protein binding"
                nameA={nameA}
                nameB={nameB}
                a={a!.pk ? `${a!.pk.volumeOfDistribution} ${a!.pk.proteinBinding}` : undefined}
                b={b!.pk ? `${b!.pk.volumeOfDistribution} ${b!.pk.proteinBinding}` : undefined}
              />
              <Row
                label="Metabolic pathway"
                nameA={nameA}
                nameB={nameB}
                a={a!.pk?.metabolicPathway}
                b={b!.pk?.metabolicPathway}
              />
              <Row
                label="Active metabolites"
                nameA={nameA}
                nameB={nameB}
                a={a!.pk?.activeMetabolites}
                b={b!.pk?.activeMetabolites}
              />
              <Row
                label="Elimination"
                nameA={nameA}
                nameB={nameB}
                a={a!.pk?.elimination}
                b={b!.pk?.elimination}
              />
              <Row
                label="Organ failure and RRT"
                nameA={nameA}
                nameB={nameB}
                a={a!.pk?.organImpairment}
                b={b!.pk?.organImpairment}
              />
              <Row
                label="Behaviour in prolonged infusion"
                nameA={nameA}
                nameB={nameB}
                a={a!.pk?.infusionBehaviour}
                b={b!.pk?.infusionBehaviour}
              />
              <Row
                label="Metabolism summary"
                nameA={nameA}
                nameB={nameB}
                a={a!.metabolismNarrative}
                b={b!.metabolismNarrative}
              />
              <Row
                label="Adverse effects and toxicity"
                nameA={nameA}
                nameB={nameB}
                a={a!.adverseEffects}
                b={b!.adverseEffects}
              />
              <Row
                label="Key interactions"
                nameA={nameA}
                nameB={nameB}
                a={a!.safety?.interactions}
                b={b!.safety?.interactions}
                list
              />
              <Row
                label="Contraindications and cautions"
                nameA={nameA}
                nameB={nameB}
                a={a!.safety?.contraindications}
                b={b!.safety?.contraindications}
                list
              />
              <Row
                label="Monitoring"
                nameA={nameA}
                nameB={nameB}
                a={a!.safety?.monitoring}
                b={b!.safety?.monitoring}
                list
              />
              <Row
                label="Safety alert"
                nameA={nameA}
                nameB={nameB}
                a={a!.safety?.alert}
                b={b!.safety?.alert}
              />
            </div>

            <section className="mt-10">
              <h2 className="font-serif text-xl font-bold text-foreground">
                Using them together
              </h2>
              {findings.length === 0 ? (
                <p className="mt-2 text-sm text-muted-foreground">
                  No interaction between {nameA} and {nameB} is recorded in this dataset — still check
                  the BNF, the SPC and your pharmacist before co-prescribing.
                </p>
              ) : (
                <div className="mt-3 space-y-3">
                  {findings.map((f) => (
                    <article
                      key={`${f.effect}-${f.basis}`}
                      className={`rounded-lg border p-4 ${severityStyles[f.severity]}`}
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant={severityBadge[f.severity]}>{severityLabel[f.severity]}</Badge>
                        <span className="text-xs text-muted-foreground">{f.basis}</span>
                      </div>
                      <h3 className="mt-2 flex items-start gap-2 font-semibold text-foreground">
                        {f.severity === "avoid" ? (
                          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-destructive" aria-hidden />
                        ) : (
                          <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-icu" aria-hidden />
                        )}
                        {f.effect}
                      </h3>
                      <p className="mt-1.5 text-sm text-muted-foreground">{f.detail}</p>
                      <p className="mt-2 text-sm text-foreground">
                        <span className="font-semibold">What to do: </span>
                        {f.action}
                      </p>
                    </article>
                  ))}
                </div>
              )}
              <p className="mt-3 text-sm">
                <Link
                  to={`/intensive-care/interaction-checker?a=${slugA}&b=${slugB}`}
                  className="font-medium text-icu underline-offset-4 hover:underline"
                >
                  Open this pair in the interaction checker
                </Link>
              </p>
            </section>
          </div>
        )}

        <p className="mt-10 rounded-lg border border-border bg-surface p-4 text-sm text-muted-foreground">
          Revision aid only — check every dose against the BNF, the summary of product
          characteristics and local critical care guidelines. See also the{" "}
          <Link to="/intensive-care/drug-doses" className="font-medium text-icu underline-offset-4 hover:underline">
            dosing table
          </Link>
          ,{" "}
          <Link to="/intensive-care/drug-mechanisms" className="font-medium text-icu underline-offset-4 hover:underline">
            drug mechanisms
          </Link>
          ,{" "}
          <Link to="/intensive-care/drug-safety" className="font-medium text-icu underline-offset-4 hover:underline">
            drug safety
          </Link>{" "}
          and the{" "}
          <Link to="/intensive-care/infusions" className="font-medium text-icu underline-offset-4 hover:underline">
            infusions page
          </Link>
          .
        </p>
      </PageSection>
    </main>
  );
};

export default IcuDrugComparison;

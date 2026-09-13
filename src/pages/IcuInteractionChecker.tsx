import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ArrowLeftRight, Ban, Activity, TriangleAlert, ShieldAlert, ShieldCheck } from "lucide-react";
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
import { icuDrugSafetyGroups, type DrugSafety } from "@/data/icuDrugSafety";
import { findInteractions, severityLabel, type InteractionSeverity } from "@/data/icuDrugInteractions";
import { PageJsonLd } from "@/components/layout/PageJsonLd";

interface Option extends DrugSafety {
  groupTitle: string;
}

const options: Option[] = icuDrugSafetyGroups.flatMap((g) =>
  g.drugs.map((d) => ({ ...d, groupTitle: g.title })),
).sort((a, b) => a.drug.localeCompare(b.drug));

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

const DrugDetails = ({ drug }: { drug: Option }) => (
  <article className="rounded-lg border border-border bg-card p-4">
    <h3 className="font-serif text-lg font-bold text-foreground">{drug.drug}</h3>
    <p className="mt-0.5 text-xs text-muted-foreground">{drug.groupTitle}</p>
    {drug.alert && (
      <p className="mt-3 rounded-md border border-destructive/30 bg-destructive/10 p-2.5 text-sm font-medium text-foreground">
        {drug.alert}
      </p>
    )}
    <dl className="mt-3 space-y-3 text-sm">
      <div>
        <dt className="flex items-center gap-1.5 font-semibold">
          <Ban className="h-4 w-4 text-icu" /> Contraindications and cautions
        </dt>
        <dd className="mt-1">
          <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
            {drug.contraindications.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </dd>
      </div>
      <div>
        <dt className="flex items-center gap-1.5 font-semibold">
          <Activity className="h-4 w-4 text-icu" /> Monitoring
        </dt>
        <dd className="mt-1">
          <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
            {drug.monitoring.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </dd>
      </div>
    </dl>
    <div className="mt-4 flex flex-wrap gap-3 text-sm">
      <Link
        to={`/intensive-care/drug-doses?drug=${encodeURIComponent(drug.drug)}`}
        className="font-medium text-icu underline-offset-4 hover:underline"
      >
        Dosing
      </Link>
      <Link
        to={`/intensive-care/drug-mechanisms?slug=${drug.slug}`}
        className="font-medium text-icu underline-offset-4 hover:underline"
      >
        Mechanism and kinetics
      </Link>
      <Link
        to={`/intensive-care/drug-safety?slug=${drug.slug}`}
        className="font-medium text-icu underline-offset-4 hover:underline"
      >
        Full safety entry
      </Link>
    </div>
  </article>
);

const IcuInteractionChecker = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [drugA, setDrugA] = useState(searchParams.get("a") ?? "");
  const [drugB, setDrugB] = useState(searchParams.get("b") ?? "");

  useEffect(() => {
    const next = new URLSearchParams();
    if (drugA) next.set("a", drugA);
    if (drugB) next.set("b", drugB);
    setSearchParams(next, { replace: true });
  }, [drugA, drugB, setSearchParams]);

  const a = options.find((o) => o.slug === drugA);
  const b = options.find((o) => o.slug === drugB);
  const findings = useMemo(() => findInteractions(drugA, drugB), [drugA, drugB]);
  const samedrug = Boolean(drugA && drugA === drugB);

  const swap = () => {
    setDrugA(drugB);
    setDrugB(drugA);
  };

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>ICU Drug Interaction Checker | AnaesthesiaCore</title>
        <meta
          name="description"
          content="Choose any two adult intensive care drugs and see their known interactions, severity, contraindications and the monitoring each one needs."
        />
        <link rel="canonical" href="https://anaesthesiacore.app/intensive-care/interaction-checker" />
        <meta property="og:url" content="https://anaesthesiacore.app/intensive-care/interaction-checker" />
      </Helmet>
      <PageJsonLd name="ICU Drug Interaction Checker" description="Choose any two adult intensive care drugs and see their known interactions, severity, contraindications and the monitoring each one needs." />

      <PageSection className="pt-8 pb-16">
        <Link
          to="/intensive-care"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Intensive Care
        </Link>

        <div className="mt-4 flex items-start gap-3">
          <div className="rounded-lg bg-icu/10 p-2.5 text-icu">
            <ArrowLeftRight className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">ICU Interaction Checker</h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Pick two drugs from the adult critical care formulary to see their known interactions,
              why they matter and what to monitor, alongside each drug's contraindications. Built from
              the{" "}
              <Link to="/intensive-care/drug-safety" className="font-medium text-icu underline-offset-4 hover:underline">
                drug safety dataset
              </Link>{" "}
              of {options.length} drugs.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
          <label className="block text-sm">
            <span className="mb-1.5 block font-medium">First drug</span>
            <Select value={drugA} onValueChange={setDrugA}>
              <SelectTrigger aria-label="First drug">
                <SelectValue placeholder="Select a drug" />
              </SelectTrigger>
              <SelectContent>
                {options.map((o) => (
                  <SelectItem key={o.slug} value={o.slug}>
                    {o.drug}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </label>

          <Button
            type="button"
            variant="outline"
            onClick={swap}
            disabled={!drugA && !drugB}
            className="w-full sm:w-auto"
          >
            <ArrowLeftRight aria-hidden className="h-4 w-4" /> Swap
          </Button>

          <label className="block text-sm">
            <span className="mb-1.5 block font-medium">Second drug</span>
            <Select value={drugB} onValueChange={setDrugB}>
              <SelectTrigger aria-label="Second drug">
                <SelectValue placeholder="Select a drug" />
              </SelectTrigger>
              <SelectContent>
                {options.map((o) => (
                  <SelectItem key={o.slug} value={o.slug}>
                    {o.drug}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </label>
        </div>

        {(drugA || drugB) && (
          <div className="mt-3">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setDrugA("");
                setDrugB("");
              }}
            >
              Clear selection
            </Button>
          </div>
        )}

        <section className="mt-8" aria-live="polite">
          <h2 className="text-xl font-serif font-bold text-foreground">
            {a && b && !samedrug ? `${a.drug} + ${b.drug}` : "Interactions"}
          </h2>

          {!a || !b ? (
            <p className="mt-2 text-sm text-muted-foreground">
              Select two different drugs to check the pair.
            </p>
          ) : samedrug ? (
            <p className="mt-2 text-sm text-muted-foreground">
              Those are the same drug — choose a second, different drug.
            </p>
          ) : findings.length === 0 ? (
            <div className="mt-3 flex items-start gap-3 rounded-lg border border-border bg-surface p-4">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-icu" aria-hidden />
              <p className="text-sm text-muted-foreground">
                No interaction is recorded in this dataset for {a.drug} with {b.drug}. That is not the
                same as "no interaction exists" — check the BNF, the SPC and your critical care
                pharmacist, and review both drugs' contraindications and monitoring below.
              </p>
            </div>
          ) : (
            <>
              <p className="mt-2 text-sm text-muted-foreground">
                {findings.length} {findings.length === 1 ? "interaction" : "interactions"} found.
              </p>
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
            </>
          )}
        </section>

        {(a || b) && (
          <section className="mt-10">
            <h2 className="text-xl font-serif font-bold text-foreground">
              Contraindications and monitoring
            </h2>
            <div className="mt-3 grid gap-4 lg:grid-cols-2">
              {a && <DrugDetails drug={a} />}
              {b && !samedrug && <DrugDetails drug={b} />}
            </div>
          </section>
        )}

        <p className="mt-10 rounded-lg border border-border bg-surface p-4 text-sm text-muted-foreground">
          Revision aid only. This checker covers the drugs in this site's adult ICU formulary and the
          interactions examiners expect you to know — it is not a substitute for the BNF, the summary
          of product characteristics, your local critical care guidelines or a pharmacist review.
          Doses and rates live on the{" "}
          <Link to="/intensive-care/drug-doses" className="font-medium text-icu underline-offset-4 hover:underline">
            dosing table
          </Link>
          ,{" "}
          <Link to="/intensive-care/infusions" className="font-medium text-icu underline-offset-4 hover:underline">
            infusions page
          </Link>{" "}
          and{" "}
          <Link to="/intensive-care/calculator" className="font-medium text-icu underline-offset-4 hover:underline">
            drug calculator
          </Link>
          .
        </p>
      </PageSection>
    </main>
  );
};

export default IcuInteractionChecker;

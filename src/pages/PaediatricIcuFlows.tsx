import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  Baby,
  Calculator,
  Droplets,
  ListOrdered,
  Pill,
  TriangleAlert,
  BookOpenCheck,
} from "lucide-react";
import { PageSection } from "@/components/layout/PageSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageJsonLd } from "@/components/layout/PageJsonLd";
import {
  caseBankHref,
  calculableInfusions,
  calculatorHref,
  infusionHref,
  paedDrugDoseHref,
  paediatricIcuFlows,
} from "@/data/paediatricIcuFlows";

const PaediatricIcuFlows = () => {
  const [activeFlow, setActiveFlow] = useState(paediatricIcuFlows[0].id);
  const flow = paediatricIcuFlows.find((f) => f.id === activeFlow) ?? paediatricIcuFlows[0];
  const neonatal = flow.id === "neonatal-resus";
  const [weight, setWeight] = useState("");
  const parsedWeight = parseFloat(weight);
  const weightValue =
    Number.isFinite(parsedWeight) && parsedWeight > 0 ? parsedWeight : neonatal ? 3.5 : 20;


  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>Paediatric ICU Management Flows | AnaesthesiaCore</title>
        <meta
          name="description"
          content="Step-by-step paediatric critical care pathways for sepsis, paediatric ARDS, neonatal resuscitation and neuroprotection, with age-specific links to drug doses."
        />
        <link rel="canonical" href="https://anaesthesiacore.app/intensive-care/paediatric-flows" />
        <meta property="og:url" content="https://anaesthesiacore.app/intensive-care/paediatric-flows" />
      </Helmet>
      <PageJsonLd name="Paediatric ICU Management Flows" description="Step-by-step paediatric critical care pathways for sepsis, paediatric ARDS, neonatal resuscitation and neuroprotection, with age-specific links to drug doses." />

      <PageSection className="pt-8 pb-16">
        <Link
          to="/intensive-care"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Intensive Care
        </Link>

        <div className="mt-4 flex items-start gap-3">
          <div className="rounded-lg bg-icu/10 p-2.5 text-icu">
            <Baby className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Paediatric ICU Management Flows</h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              What to do, in what order, for the commonest paediatric critical
              care presentations — with age-specific dosing links, infusion
              recipes and case bank scenarios at every step.
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-start gap-2.5 rounded-lg border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
          <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-icu" aria-hidden />
          <p>
            Revision aid only, based on Surviving Sepsis (children), PALICC-2,
            Resuscitation Council UK and BSUKED guidance. Children compensate
            late and decompensate fast — always follow local PICU protocols and
            involve the retrieval service early.
          </p>
        </div>

        <nav aria-label="Paediatric management pathways" className="mt-6 flex gap-2 overflow-x-auto pb-1">
          {paediatricIcuFlows.map((f) => (
            <Button
              key={f.id}
              size="sm"
              variant={f.id === activeFlow ? "default" : "outline"}
              className="shrink-0"
              onClick={() => setActiveFlow(f.id)}
              aria-pressed={f.id === activeFlow}
            >
              {f.title}
            </Button>
          ))}
        </nav>

        <div className="mt-4 flex flex-wrap items-end gap-3 rounded-lg border border-icu/25 bg-icu/5 p-3">
          <div className="w-full max-w-[180px]">
            <Label htmlFor="paed-flow-weight" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Child's weight (kg)
            </Label>
            <Input
              id="paed-flow-weight"
              type="number"
              inputMode="decimal"
              min={0.5}
              step={0.5}
              value={weight}
              placeholder={String(neonatal ? 3.5 : 20)}
              onChange={(e) => setWeight(e.target.value)}
              className="mt-1"
            />
          </div>
          <p className="flex-1 text-xs text-muted-foreground">
            Used by the “Calculate infusion rate” links in each step — they open the ICU calculator
            with the drug and this weight already filled in (default{" "}
            {neonatal ? "3.5 kg neonate" : "20 kg child"}).
          </p>
        </div>



        <article className="mt-8">
          <h2 className="text-2xl font-semibold tracking-tight">{flow.title}</h2>
          <p className="mt-2 max-w-3xl text-muted-foreground">{flow.blurb}</p>

          <section className="mt-5 rounded-xl border border-icu/25 bg-card p-5">
            <h3 className="font-semibold text-foreground">When you are in this pathway</h3>
            <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
              {flow.triggers.map((t) => (
                <li key={t} className="flex gap-2">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-icu" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </section>

          <ol className="mt-6 space-y-5">
            {flow.steps.map((step, index) => (
              <li key={step.title} className="rounded-xl border border-border bg-card p-5">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-icu/10 text-sm font-semibold text-icu">
                    {index + 1}
                  </span>
                  <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                  <span className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground">
                    {step.timeframe}
                  </span>
                </div>

                <ul className="mt-3 space-y-2 text-sm text-foreground/90">
                  {step.actions.map((a) => (
                    <li key={a} className="flex gap-2">
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-icu/60" />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>

                {step.drugs && step.drugs.length > 0 && (
                  <div className="mt-4">
                    <h4 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      <Pill className="h-3.5 w-3.5" aria-hidden /> {neonatal ? "Neonatal" : "Paediatric"} dosing
                    </h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {step.drugs.map((d) => (
                        <Link
                          key={d}
                          to={paedDrugDoseHref(d, neonatal)}
                          className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground transition-colors hover:border-icu hover:text-icu"
                        >
                          {d}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {step.infusions && step.infusions.length > 0 && (
                  <div className="mt-4">
                    <h4 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      <Droplets className="h-3.5 w-3.5" aria-hidden /> Infusion recipes
                    </h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {step.infusions.map((i) => (
                        <Link
                          key={i}
                          to={infusionHref(i)}
                          className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground transition-colors hover:border-icu hover:text-icu"
                        >
                          {i}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {(() => {
                  const calcDrugs = calculableInfusions([step.infusions, step.drugs]);
                  if (calcDrugs.length === 0) return null;
                  return (
                    <div className="mt-4">
                      <h4 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        <Calculator className="h-3.5 w-3.5" aria-hidden /> Calculate infusion rate at{" "}
                        {weightValue} kg
                      </h4>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {calcDrugs.map((d) => (
                          <Link
                            key={d}
                            to={calculatorHref(d, weightValue)}
                            className="inline-flex items-center gap-1.5 rounded-full border border-icu/40 bg-icu/5 px-3 py-1 text-xs font-medium text-icu transition-colors hover:bg-icu/10"
                          >
                            <Calculator className="h-3 w-3" aria-hidden /> Calculate {d} rate
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                })()}


                {step.pitfall && (
                  <p className="mt-4 rounded-lg border border-border bg-muted/40 p-3 text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">Pitfall: </span>
                    {step.pitfall}
                  </p>
                )}
              </li>
            ))}
          </ol>

          <section className="mt-6 rounded-xl border border-border bg-card p-5">
            <h3 className="font-semibold text-foreground">If the pathway is failing</h3>
            <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
              {flow.rescue.map((r) => (
                <li key={r} className="flex gap-2">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-icu" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-6 rounded-xl border border-icu/25 bg-card p-5 sm:flex sm:items-center sm:justify-between sm:gap-4">
            <div className="flex items-start gap-3">
              <BookOpenCheck className="mt-0.5 h-6 w-6 shrink-0 text-icu" aria-hidden />
              <div>
                <h3 className="font-semibold text-foreground">Practise it on a case</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {flow.caseLabel} — staged prompts with model answers that follow
                  this pathway.
                </p>
              </div>
            </div>
            <div className="mt-4 flex shrink-0 flex-col gap-2 sm:mt-0">
              <Button asChild variant="outline">
                <Link to={caseBankHref(flow.caseQuery)}>Open matching cases</Link>
              </Button>
              {flow.topicPaths.map((t) => (
                <Button key={t.path} asChild variant="outline">
                  <Link to={t.path}>{t.label}</Link>
                </Button>
              ))}
            </div>
          </section>
        </article>

        <p className="mt-10 text-sm text-muted-foreground">
          Reference tables:{" "}
          <Link to="/intensive-care/drug-doses?age=paediatric" className="font-medium text-icu underline-offset-4 hover:underline">
            ICU drug dosing table (child)
          </Link>{" "}
          ·{" "}
          <Link to="/intensive-care/drug-doses?age=neonatal" className="font-medium text-icu underline-offset-4 hover:underline">
            neonatal dosing
          </Link>{" "}
          ·{" "}
          <Link to="/intensive-care/infusions" className="font-medium text-icu underline-offset-4 hover:underline">
            ICU infusions guide
          </Link>{" "}
          ·{" "}
          <Link to="/intensive-care/case-bank" className="font-medium text-icu underline-offset-4 hover:underline">
            ICU case bank
          </Link>{" "}
          ·{" "}
          <Link to="/intensive-care/management-flows" className="font-medium text-icu underline-offset-4 hover:underline">
            adult management flows
          </Link>{" "}
          ·{" "}
          <Link to="/clinical/paediatric-core" className="font-medium text-icu underline-offset-4 hover:underline">
            paediatric core essentials
          </Link>
        </p>
      </PageSection>
    </main>
  );
};

export default PaediatricIcuFlows;

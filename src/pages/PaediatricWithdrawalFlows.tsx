import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  BookOpenCheck,
  ClipboardList,
  Clock,
  LifeBuoy,
  Stethoscope,
  TriangleAlert,
} from "lucide-react";
import { PageSection } from "@/components/layout/PageSection";
import { Button } from "@/components/ui/button";
import { caseBankHref, paedDrugDoseHref } from "@/data/paediatricIcuFlows";
import { paedWithdrawalFlows } from "@/data/paediatricWithdrawalFlows";
import { PageJsonLd } from "@/components/layout/PageJsonLd";

const PaediatricWithdrawalFlows = () => {
  const [activeFlow, setActiveFlow] = useState(paedWithdrawalFlows[0].id);
  const flow = paedWithdrawalFlows.find((f) => f.id === activeFlow) ?? paedWithdrawalFlows[0];

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>Paediatric ICU Withdrawal Flow | AnaesthesiaCore</title>
        <meta
          name="description"
          content="Step-by-step paediatric ICU withdrawal and weaning flows for sepsis, PARDS and neurocritical care: drug tapering rates, half-life timing."
        />
        <link rel="canonical" href="https://anaesthesiacore.app/intensive-care/paediatric-withdrawal" />
        <meta property="og:url" content="https://anaesthesiacore.app/intensive-care/paediatric-withdrawal" />
      </Helmet>
      <PageJsonLd name="Paediatric ICU Withdrawal Flow" description="Step-by-step paediatric ICU withdrawal and weaning flows for sepsis, PARDS and neurocritical care: drug tapering rates, half-life timing." />

      <PageSection className="pt-8 pb-16">
        <Link
          to="/intensive-care"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Intensive Care
        </Link>

        <div className="mt-4 flex items-start gap-3">
          <div className="rounded-lg bg-icu/10 p-2.5 text-icu">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Paediatric ICU Withdrawal Flow</h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              How to come off sedation, analgesia, paralysis and vasoactive
              support in a child — in what order, at what rate, judged against
              half-life timing, withdrawal scores and a rescue plan.
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-start gap-2.5 rounded-lg border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
          <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-icu" aria-hidden />
          <p>
            Revision aid only. Tapering rates, equivalences and rescue doses vary
            between units — follow BNFc, the SPC and your local PICU sedation,
            analgesia and withdrawal bundle, and involve PICU pharmacy for long
            or failing weans.
          </p>
        </div>

        <nav aria-label="Withdrawal pathways" className="mt-6 flex gap-2 overflow-x-auto pb-1">
          {paedWithdrawalFlows.map((f) => (
            <Button
              key={f.id}
              size="sm"
              variant={f.id === activeFlow ? "default" : "outline"}
              className="shrink-0"
              onClick={() => setActiveFlow(f.id)}
              aria-pressed={f.id === activeFlow}
            >
              {f.title.split(" — ")[0]}
            </Button>
          ))}
        </nav>

        <article className="mt-8">
          <h2 className="text-2xl font-semibold tracking-tight">{flow.title}</h2>
          <p className="mt-2 max-w-3xl text-muted-foreground">{flow.blurb}</p>

          <section className="mt-5 rounded-xl border border-icu/25 bg-card p-5">
            <h3 className="font-semibold text-foreground">Ready to start weaning when</h3>
            <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
              {flow.readiness.map((r) => (
                <li key={r} className="flex gap-2">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-icu" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </section>

          <h3 className="mt-8 text-xl font-semibold tracking-tight">The wean, in order</h3>
          <ol className="mt-4 space-y-5">
            {flow.phases.map((phase, index) => (
              <li key={phase.title} className="rounded-xl border border-border bg-card p-5">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-icu/10 text-sm font-semibold text-icu">
                    {index + 1}
                  </span>
                  <h4 className="text-lg font-semibold text-foreground">{phase.title}</h4>
                  <span className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground">
                    {phase.timeframe}
                  </span>
                </div>
                <ul className="mt-3 space-y-2 text-sm text-foreground/90">
                  {phase.actions.map((a) => (
                    <li key={a} className="flex gap-2">
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-icu/60" />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
                {phase.pitfall && (
                  <p className="mt-4 rounded-lg border border-border bg-muted/40 p-3 text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">Pitfall: </span>
                    {phase.pitfall}
                  </p>
                )}
              </li>
            ))}
          </ol>

          <h3 className="mt-10 text-xl font-semibold tracking-tight">Drug-by-drug tapering</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Half-life sets the interval between steps; exposure duration sets the
            size of each step.
          </p>
          <div className="mt-4 space-y-5">
            {flow.drugs.map((drug) => (
              <section key={`${flow.id}-${drug.name}`} className="rounded-xl border border-border bg-card p-5">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h4 className="text-lg font-semibold text-foreground">{drug.name}</h4>
                  <span className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground">
                    {drug.drugClass}
                  </span>
                </div>

                <dl className="mt-3 space-y-3 text-sm">
                  <div>
                    <dt className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" aria-hidden /> Half-life and offset
                    </dt>
                    <dd className="mt-1 text-foreground/90">{drug.halfLife}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Timing of steps
                    </dt>
                    <dd className="mt-1 text-foreground/90">{drug.timing}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Taper
                    </dt>
                    <dd className="mt-1">
                      <ul className="space-y-1.5 text-foreground/90">
                        {drug.taper.map((t) => (
                          <li key={t} className="flex gap-2">
                            <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-icu/60" />
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                  <div>
                    <dt className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      <Stethoscope className="h-3.5 w-3.5" aria-hidden /> Monitoring
                    </dt>
                    <dd className="mt-1">
                      <ul className="space-y-1.5 text-muted-foreground">
                        {drug.monitoring.map((m) => (
                          <li key={m} className="flex gap-2">
                            <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-icu/40" />
                            <span>{m}</span>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                  <div>
                    <dt className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      <LifeBuoy className="h-3.5 w-3.5" aria-hidden /> Rescue
                    </dt>
                    <dd className="mt-1 text-foreground/90">{drug.rescue}</dd>
                  </div>
                </dl>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    to={paedDrugDoseHref(drug.name, drug.neonatal)}
                    className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground transition-colors hover:border-icu hover:text-icu"
                  >
                    {drug.neonatal ? "Neonatal" : "Paediatric"} dose
                  </Link>
                  {drug.slug && (
                    <>
                      <Link
                        to={`/intensive-care/drug-safety?slug=${drug.slug}#${drug.slug}-withdrawal`}
                        className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground transition-colors hover:border-icu hover:text-icu"
                      >
                        Full withdrawal guide
                      </Link>
                      <Link
                        to={`/intensive-care/drug-mechanisms?slug=${drug.slug}#${drug.slug}`}
                        className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground transition-colors hover:border-icu hover:text-icu"
                      >
                        Mechanism &amp; metabolism
                      </Link>
                      <Link
                        to={`/intensive-care/drug-cards?slug=${drug.slug}`}
                        className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground transition-colors hover:border-icu hover:text-icu"
                      >
                        Drug card
                      </Link>
                    </>
                  )}
                </div>
              </section>
            ))}
          </div>

          <section className="mt-8 rounded-xl border border-border bg-card p-5">
            <h3 className="flex items-center gap-2 font-semibold text-foreground">
              <ClipboardList className="h-4 w-4 text-icu" aria-hidden /> Scores and observations to chart
            </h3>
            <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
              {flow.scores.map((s) => (
                <li key={s} className="flex gap-2">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-icu" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-6 rounded-xl border border-border bg-card p-5">
            <h3 className="font-semibold text-foreground">If the wean is failing</h3>
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
                  {flow.caseLabel} — staged prompts with model answers that
                  include the weaning phase.
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
          <Link to="/intensive-care/drug-safety" className="font-medium text-icu underline-offset-4 hover:underline">
            drug safety &amp; withdrawal
          </Link>{" "}
          ·{" "}
          <Link to="/intensive-care/drug-cards" className="font-medium text-icu underline-offset-4 hover:underline">
            ICU drug cards
          </Link>{" "}
          ·{" "}
          <Link
            to="/intensive-care/paediatric-pharmacokinetics"
            className="font-medium text-icu underline-offset-4 hover:underline"
          >
            paediatric pharmacokinetics
          </Link>{" "}
          ·{" "}

          <Link to="/intensive-care/paediatric-flows" className="font-medium text-icu underline-offset-4 hover:underline">
            paediatric management flows
          </Link>{" "}
          ·{" "}
          <Link to="/intensive-care/nursing-protocols" className="font-medium text-icu underline-offset-4 hover:underline">
            ICU nursing protocols
          </Link>
        </p>
      </PageSection>
    </main>
  );
};

export default PaediatricWithdrawalFlows;

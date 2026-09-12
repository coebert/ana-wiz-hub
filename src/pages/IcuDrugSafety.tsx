import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  ShieldAlert,
  Search,
  TriangleAlert,
  Ban,
  Activity,
  Link2,
  FlaskConical,
  TrendingDown,
} from "lucide-react";
import { PageSection } from "@/components/layout/PageSection";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { icuDrugSafetyGroups, icuDrugSafetyCount } from "@/data/icuDrugSafety";
import { icuDrugMechanismGroups } from "@/data/icuDrugMechanisms";
import { icuDrugPharmacokinetics } from "@/data/pk";
import {
  icuDrugWithdrawal,
  withdrawalRiskLabel,
  type WithdrawalRisk,
} from "@/data/icuDrugWithdrawal";

/** Badge colouring for the withdrawal/rebound risk of each drug. */
const riskBadgeClass: Record<WithdrawalRisk, string> = {
  high: "border-destructive/40 bg-destructive/10 text-destructive",
  moderate: "border-icu/40 bg-icu/10 text-icu",
  low: "border-border bg-muted text-muted-foreground",
  none: "border-border bg-muted text-muted-foreground",
};


/** Mechanism records keyed by slug so each safety card can explain *why* it behaves that way. */
const mechanismBySlug = new Map(
  icuDrugMechanismGroups.flatMap((g) => g.drugs).map((d) => [d.slug, d]),
);

/** Trim a long narrative to its first couple of sentences for the summary line. */
const firstSentences = (text: string, count = 2) => {
  const parts = text.match(/[^.!?]+[.!?]+/g);
  if (!parts) return text;
  const summary = parts.slice(0, count).join(" ").trim();
  return parts.length > count ? summary : summary;
};

const IcuDrugSafety = () => {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("drug") ?? "");
  const [activeGroup, setActiveGroup] = useState<string>("all");
  const [riskOnly, setRiskOnly] = useState(false);

  const targetSlug = searchParams.get("slug");

  useEffect(() => {
    if (!targetSlug) return;
    const el = document.getElementById(targetSlug);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [targetSlug]);


  const groups = useMemo(() => {
    const q = search.trim().toLowerCase();
    return icuDrugSafetyGroups
      .filter((g) => activeGroup === "all" || g.id === activeGroup)
      .map((g) => ({
        ...g,
        drugs: q
          ? g.drugs.filter((d) =>
              [d.drug, ...d.interactions, ...d.contraindications, ...d.monitoring, d.alert ?? ""]
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
        <title>ICU Drug Safety: Interactions, Contraindications, Monitoring</title>
        <meta
          name="description"
          content="Pharmacokinetics, half-life, clearance, interactions, contraindications and monitoring for 50 adult intensive care drugs — sedatives, neuromuscular blockers, vasopressors, antiarrhythmics, anticonvulsants, anticoagulants and antimicrobials."
        />
        <link rel="canonical" href="https://anaesthesiacore.app/intensive-care/drug-safety" />
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
            <ShieldAlert className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">ICU Drug Safety</h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              The interactions, contraindications and monitoring that go with each of the{" "}
              {icuDrugSafetyCount} drugs in the adult critical care formulary — each with key pharmacokinetic
              parameters (onset, half-life, clearance, volume of distribution, protein binding and
              elimination) alongside its interactions, contraindications and monitoring — the companion to
              the{" "}
              <Link
                to="/intensive-care/drug-doses"
                className="font-medium text-icu underline-offset-4 hover:underline"
              >
                dosing table
              </Link>{" "}
              and the{" "}
              <Link
                to="/intensive-care/drug-mechanisms"
                className="font-medium text-icu underline-offset-4 hover:underline"
              >
                mechanisms page
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-start gap-3 rounded-lg border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
          <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-icu" />
          <p>
            Revision aid only, and not a complete list. Check every prescription against the BNF, the
            summary of product characteristics, the patient&rsquo;s allergy and organ function, and local
            critical care guidelines.
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <label className="relative block max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search a drug, interaction or monitoring test"
              className="pl-9"
              aria-label="Search ICU drug safety information"
            />
          </label>

          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
            <Button
              size="sm"
              variant={activeGroup === "all" ? "default" : "outline"}
              onClick={() => setActiveGroup("all")}
              className="shrink-0"
            >
              All classes
            </Button>
            {icuDrugSafetyGroups.map((g) => (
              <Button
                key={g.id}
                size="sm"
                variant={activeGroup === g.id ? "default" : "outline"}
                onClick={() => setActiveGroup(g.id)}
                className="shrink-0"
              >
                {g.title}
              </Button>
            ))}
          </div>

          <p className="text-sm text-muted-foreground">
            Showing {shown} of {icuDrugSafetyCount} drugs
          </p>
        </div>

        {shown === 0 && (
          <p className="mt-10 rounded-lg border border-dashed border-border p-6 text-sm text-muted-foreground">
            No drugs match that search. Try a drug name, an interacting drug or a monitoring test.
          </p>
        )}

        <div className="mt-10 space-y-12">
          {groups.map((group) => (
            <section key={group.id} id={group.id} className="scroll-mt-24">
              <h2 className="text-xl font-semibold tracking-tight">{group.title}</h2>
              <p className="mt-1 max-w-3xl text-sm text-muted-foreground">{group.blurb}</p>

              <div className="mt-5 space-y-5">
                {group.drugs.map((d) => (
                  <article
                    key={d.slug}
                    id={d.slug}
                    className="scroll-mt-24 rounded-xl border border-border bg-card p-5 shadow-sm"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="text-lg font-semibold">{d.drug}</h3>
                      <div className="flex flex-wrap gap-3 text-xs">
                        <Link
                          to={`/intensive-care/drug-doses?drug=${encodeURIComponent(d.drug)}`}
                          className="font-medium text-icu underline-offset-4 hover:underline"
                        >
                          Dose
                        </Link>
                        <Link
                          to={`/intensive-care/drug-mechanisms?slug=${d.slug}#${d.slug}`}
                          className="font-medium text-icu underline-offset-4 hover:underline"
                        >
                          Mechanism &amp; kinetics
                        </Link>
                        <Link
                          to={`/intensive-care/drug-comparison?a=${d.slug}`}
                          className="font-medium text-icu underline-offset-4 hover:underline"
                        >
                          Compare
                        </Link>
                      </div>
                    </div>

                    {d.alert && (
                      <p className="mt-3 flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm font-medium text-destructive">
                        <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
                        <span>{d.alert}</span>
                      </p>
                    )}

                    {(() => {
                      const mech = mechanismBySlug.get(d.slug);
                      const pk = icuDrugPharmacokinetics[d.slug];
                      if (!mech) return null;
                      return (
                        <div className="mt-3 rounded-lg border border-icu/25 bg-icu/5 p-3 text-sm">
                          <p className="flex items-center gap-1.5 font-semibold text-foreground">
                            <FlaskConical className="h-4 w-4 text-icu" aria-hidden /> Why — mechanism
                            behind this safety profile
                          </p>
                          <p className="mt-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            {mech.drugClass}
                          </p>
                          <p className="mt-2 text-muted-foreground">
                            <span className="font-medium text-foreground">Pharmacodynamics: </span>
                            {firstSentences(mech.pharmacodynamics)}
                          </p>
                          <p className="mt-1.5 text-muted-foreground">
                            <span className="font-medium text-foreground">Metabolism: </span>
                            {firstSentences(mech.metabolism)}
                          </p>
                          {pk && (
                            <>
                              <dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 rounded-md border border-icu/20 bg-background/60 p-2.5 sm:grid-cols-3">
                                {(
                                  [
                                    ["Onset", pk.onset],
                                    ["Half-life", pk.halfLife],
                                    ["Clearance", pk.clearance],
                                    ["Vd", pk.volumeOfDistribution],
                                    ["Protein binding", pk.proteinBinding],
                                    ["Elimination", pk.elimination],
                                  ] as const
                                ).map(([label, value]) => (
                                  <div key={label}>
                                    <dt className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                                      {label}
                                    </dt>
                                    <dd className="mt-0.5 text-xs leading-snug text-foreground">{value}</dd>
                                  </div>
                                ))}
                              </dl>
                              <p className="mt-1.5 text-muted-foreground">
                                <span className="font-medium text-foreground">Handling: </span>
                                {pk.organImpairment}
                              </p>
                            </>
                          )}
                          <Link
                            to={`/intensive-care/drug-mechanisms?slug=${d.slug}#${d.slug}`}
                            className="mt-2 inline-block text-sm font-medium text-icu underline-offset-4 hover:underline"
                          >
                            Full pharmacodynamics, metabolism and kinetics for {d.drug}
                          </Link>
                        </div>
                      );
                    })()}


                    {(() => {
                      const wd = icuDrugWithdrawal[d.slug];
                      if (!wd) return null;
                      const pk = icuDrugPharmacokinetics[d.slug];
                      return (
                        <div className="mt-3 rounded-lg border border-border bg-muted/30 p-3 text-sm">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="flex items-center gap-1.5 font-semibold text-foreground">
                              <TrendingDown className="h-4 w-4 text-icu" aria-hidden /> Stopping and
                              withdrawal
                            </p>
                            <span
                              className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${riskBadgeClass[wd.risk]}`}
                            >
                              {withdrawalRiskLabel[wd.risk]}
                            </span>
                          </div>

                          <p className="mt-2 text-muted-foreground">
                            <span className="font-medium text-foreground">Why: </span>
                            {wd.why}
                          </p>

                          <dl className="mt-2 grid gap-2 rounded-md border border-border bg-background/60 p-2.5 sm:grid-cols-2">
                            <div>
                              <dt className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                                Half-life
                              </dt>
                              <dd className="mt-0.5 text-xs leading-snug text-foreground">
                                {pk?.halfLife ?? "See the mechanisms page"}
                              </dd>
                            </div>
                            <div>
                              <dt className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                                Offset and what it means for the wean
                              </dt>
                              <dd className="mt-0.5 text-xs leading-snug text-foreground">{wd.offset}</dd>
                            </div>
                          </dl>

                          <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                            Tapering
                          </p>
                          <ul className="mt-1 list-disc space-y-1 pl-5 text-muted-foreground">
                            {wd.taper.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>

                          <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                            Monitoring during and after the wean
                          </p>
                          <ul className="mt-1 list-disc space-y-1 pl-5 text-muted-foreground">
                            {wd.monitoring.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>

                          {wd.rescue && (
                            <p className="mt-3 rounded-md border border-icu/25 bg-icu/5 p-2.5 text-sm text-foreground">
                              <span className="font-semibold">If withdrawal declares itself: </span>
                              {wd.rescue}
                            </p>
                          )}
                        </div>
                      );
                    })()}

                    <dl className="mt-4 space-y-4 text-sm leading-relaxed">
                      <div>
                        <dt className="flex items-center gap-1.5 font-semibold">
                          <Link2 className="h-4 w-4 text-icu" /> Interactions
                        </dt>
                        <dd className="mt-1">
                          <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                            {d.interactions.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </dd>
                      </div>
                      <div>
                        <dt className="flex items-center gap-1.5 font-semibold">
                          <Ban className="h-4 w-4 text-icu" /> Contraindications and cautions
                        </dt>
                        <dd className="mt-1">
                          <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                            {d.contraindications.map((item) => (
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
                            {d.monitoring.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </dd>
                      </div>
                    </dl>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-10 text-sm text-muted-foreground">
          Need doses or infusion recipes? See the{" "}
          <Link to="/intensive-care/drug-doses" className="font-medium text-icu underline-offset-4 hover:underline">
            ICU drug dosing table
          </Link>
          ,{" "}
          <Link to="/intensive-care/infusions" className="font-medium text-icu underline-offset-4 hover:underline">
            key ICU drug infusions
          </Link>{" "}
          , the{" "}
          <Link to="/intensive-care/drug-mechanisms" className="font-medium text-icu underline-offset-4 hover:underline">
            drug mechanisms page
          </Link>{" "}
          and the{" "}
          <Link to="/intensive-care/interaction-checker" className="font-medium text-icu underline-offset-4 hover:underline">
            interaction checker
          </Link>
          .
        </p>
      </PageSection>
    </main>
  );
};

export default IcuDrugSafety;

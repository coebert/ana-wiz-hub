import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ArrowRight, FlaskConical, Search, TriangleAlert } from "lucide-react";
import { PageSection } from "@/components/layout/PageSection";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { icuDrugMechanismGroups, icuDrugMechanismCount } from "@/data/icuDrugMechanisms";
import { DrugPharmacokineticsPanel } from "@/components/icu/DrugPharmacokineticsPanel";
import { pharmacokineticsFor } from "@/data/pk";
import { drugSlug } from "@/lib/caseDoseReferences";

const IcuDrugMechanisms = () => {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [activeGroup, setActiveGroup] = useState<string>("all");

  /** Deep links from the safety and dosing pages arrive as ?slug=propofol — scroll to that card. */
  const targetSlug = searchParams.get("slug");
  useEffect(() => {
    if (!targetSlug) return;
    const el = document.getElementById(targetSlug);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [targetSlug]);


  const groups = useMemo(() => {
    const q = search.trim().toLowerCase();
    return icuDrugMechanismGroups
      .filter((g) => activeGroup === "all" || g.id === activeGroup)
      .map((g) => ({
        ...g,
        drugs: q
          ? g.drugs.filter((d) =>
              [
                d.drug,
                d.drugClass,
                d.pharmacodynamics,
                d.metabolism,
                d.adverseEffects,
                ...Object.values(pharmacokineticsFor(d.slug) ?? {}),
              ]
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
        <title>ICU Drug Mechanisms, Pharmacokinetics &amp; Metabolism</title>
        <meta
          name="description"
          content="Pharmacodynamics, pharmacokinetics, metabolism and adverse effects of 50 adult intensive care drugs — half-life, volume of distribution, protein binding, active metabolites and dosing in liver failure, renal failure and RRT."
        />
        <link rel="canonical" href="https://anaesthesiacore.app/intensive-care/drug-mechanisms" />
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
            <FlaskConical className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">ICU Drug Mechanisms</h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Receptor and enzyme targets, handling by the liver and kidney, and the
              adverse effects that follow — for the {icuDrugMechanismCount} drugs in the
              adult critical care formulary. The companion to the{" "}
              <Link
                to="/intensive-care/drug-doses"
                className="font-medium text-icu underline-offset-4 hover:underline"
              >
                dosing table
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-start gap-3 rounded-lg border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
          <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-icu" />
          <p>
            Written for exam revision. Confirm every prescribing decision against the
            BNF, the summary of product characteristics and local critical care guidelines.
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <label className="relative block max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search a drug, receptor, enzyme or side effect"
              className="pl-9"
              aria-label="Search ICU drug mechanisms"
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
            {icuDrugMechanismGroups.map((g) => (
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
            Showing {shown} of {icuDrugMechanismCount} drugs
          </p>
        </div>

        {shown === 0 && (
          <p className="mt-10 rounded-lg border border-dashed border-border p-6 text-sm text-muted-foreground">
            No drugs match that search. Try a drug name, a receptor or an adverse effect.
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
                    <h3 className="text-lg font-semibold">{d.drug}</h3>
                    <p className="mt-1 text-sm font-medium text-icu">{d.drugClass}</p>

                    <dl className="mt-4 space-y-4 text-sm leading-relaxed">
                      <div>
                        <dt className="font-semibold">Pharmacodynamics</dt>
                        <dd className="mt-1 text-muted-foreground">{d.pharmacodynamics}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold">Metabolism and elimination</dt>
                        <dd className="mt-1 text-muted-foreground">{d.metabolism}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold">Adverse effects and cautions</dt>
                        <dd className="mt-1 text-muted-foreground">{d.adverseEffects}</dd>
                      </div>
                    </dl>

                    <DrugPharmacokineticsPanel slug={d.slug} />

                    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                      <Link
                        to={`/intensive-care/drug-doses?drug=${drugSlug(d.drug)}#drug-${drugSlug(d.drug)}`}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-icu underline-offset-4 hover:underline"
                      >
                        Doses for {d.drug} <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                      <Link
                        to={`/intensive-care/drug-safety?slug=${d.slug}#${d.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-icu underline-offset-4 hover:underline"
                      >
                        Interactions, contraindications and monitoring{" "}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>

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
          </Link>{" "}
          and{" "}
          <Link to="/intensive-care/infusions" className="font-medium text-icu underline-offset-4 hover:underline">
            key ICU drug infusions
          </Link>
          . For interactions, contraindications and monitoring, open{" "}
          <Link to="/intensive-care/drug-safety" className="font-medium text-icu underline-offset-4 hover:underline">
            ICU drug safety
          </Link>
          .
        </p>
      </PageSection>
    </main>
  );
};

export default IcuDrugMechanisms;

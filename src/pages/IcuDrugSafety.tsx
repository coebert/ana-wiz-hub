import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ShieldAlert, Search, TriangleAlert, Ban, Activity, Link2 } from "lucide-react";
import { PageSection } from "@/components/layout/PageSection";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { icuDrugSafetyGroups, icuDrugSafetyCount } from "@/data/icuDrugSafety";

const IcuDrugSafety = () => {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("drug") ?? "");
  const [activeGroup, setActiveGroup] = useState<string>("all");

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
          content="Interactions, contraindications and monitoring requirements for 50 adult intensive care drugs — sedatives, neuromuscular blockers, vasopressors, antiarrhythmics, anticonvulsants, anticoagulants and antimicrobials."
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
              {icuDrugSafetyCount} drugs in the adult critical care formulary — the companion to the{" "}
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
                          to={`/intensive-care/drug-mechanisms#${d.slug}`}
                          className="font-medium text-icu underline-offset-4 hover:underline"
                        >
                          Mechanism
                        </Link>
                      </div>
                    </div>

                    {d.alert && (
                      <p className="mt-3 flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm font-medium text-destructive">
                        <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
                        <span>{d.alert}</span>
                      </p>
                    )}

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
          and the{" "}
          <Link to="/intensive-care/drug-mechanisms" className="font-medium text-icu underline-offset-4 hover:underline">
            drug mechanisms page
          </Link>
          .
        </p>
      </PageSection>
    </main>
  );
};

export default IcuDrugSafety;

import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Pill, Search, TriangleAlert } from "lucide-react";
import { PageSection } from "@/components/layout/PageSection";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { icuDrugDoseGroups, icuDrugCount } from "@/data/icuDrugDoses";

const IcuDrugDoses = () => {
  const [search, setSearch] = useState("");
  const [activeGroup, setActiveGroup] = useState<string>("all");

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
        <title>ICU Drug Dosing Table — AnaesthesiaCore</title>
        <meta
          name="description"
          content="Searchable adult intensive care drug dosing table: sedation, analgesia, neuromuscular blockade, vasopressors, inotropes, antiarrhythmics, neurocritical care, anticoagulation, metabolic and antimicrobial drugs with dose, route, frequency and key indications."
        />
        <link rel="canonical" href="https://anaesthesiacore.app/intensive-care/drug-doses" />
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
            <Pill className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">ICU Drug Dosing Table</h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Dose, route, frequency and key indications for the drugs used every
              day in adult critical care, grouped by clinical purpose. Use it for
              revision and viva preparation alongside the linked topics.
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-start gap-2.5 rounded-lg border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
          <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-icu" aria-hidden />
          <p>
            Revision aid only. Doses are typical adult starting points assuming
            normal organ function; always check the BNF, the product literature
            and your local critical care guidelines before prescribing, and
            adjust for weight, renal and hepatic function.
          </p>
        </div>

        <div className="relative mt-6 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search drug, indication or dose (e.g. noradrenaline, status epilepticus)…"
            className="pl-9"
            aria-label="Search ICU drug doses"
          />
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          <Button
            size="sm"
            variant={activeGroup === "all" ? "default" : "outline"}
            className="shrink-0"
            onClick={() => setActiveGroup("all")}
          >
            All groups
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

        <div className="mt-8 space-y-10">
          {groups.map((group) => (
            <section key={group.id} id={group.id} className="scroll-mt-24">
              <h2 className="text-xl font-semibold tracking-tight">{group.title}</h2>
              <p className="mt-1 max-w-3xl text-sm text-muted-foreground">{group.blurb}</p>

              {/* Table on wider screens */}
              <div className="mt-4 hidden overflow-x-auto rounded-xl border border-border md:block">
                <table className="w-full min-w-[720px] border-collapse text-sm">
                  <caption className="sr-only">
                    {group.title}: dose, route, frequency and key indications
                  </caption>
                  <thead className="bg-muted/50 text-left">
                    <tr>
                      <th scope="col" className="p-3 font-semibold">Drug</th>
                      <th scope="col" className="p-3 font-semibold">Dose</th>
                      <th scope="col" className="p-3 font-semibold">Route</th>
                      <th scope="col" className="p-3 font-semibold">Frequency</th>
                      <th scope="col" className="p-3 font-semibold">Key indications</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.drugs.map((d) => (
                      <tr key={d.drug} className="border-t border-border align-top">
                        <th scope="row" className="p-3 text-left font-medium text-foreground">
                          {d.drug}
                        </th>
                        <td className="p-3 text-muted-foreground">{d.dose}</td>
                        <td className="p-3 text-muted-foreground">{d.route}</td>
                        <td className="p-3 text-muted-foreground">{d.frequency}</td>
                        <td className="p-3 text-muted-foreground">
                          {d.indications}
                          {d.notes && (
                            <span className="mt-1.5 block text-xs italic">{d.notes}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Stacked cards on mobile */}
              <ul className="mt-4 space-y-3 md:hidden">
                {group.drugs.map((d) => (
                  <li key={d.drug} className="rounded-xl border border-border bg-card p-4">
                    <h3 className="font-semibold text-foreground">{d.drug}</h3>
                    <dl className="mt-2 space-y-1.5 text-sm">
                      <div>
                        <dt className="inline font-medium">Dose: </dt>
                        <dd className="inline text-muted-foreground">{d.dose}</dd>
                      </div>
                      <div>
                        <dt className="inline font-medium">Route: </dt>
                        <dd className="inline text-muted-foreground">{d.route}</dd>
                      </div>
                      <div>
                        <dt className="inline font-medium">Frequency: </dt>
                        <dd className="inline text-muted-foreground">{d.frequency}</dd>
                      </div>
                      <div>
                        <dt className="inline font-medium">Indications: </dt>
                        <dd className="inline text-muted-foreground">{d.indications}</dd>
                      </div>
                      {d.notes && (
                        <div>
                          <dt className="inline font-medium">Cautions: </dt>
                          <dd className="inline text-muted-foreground">{d.notes}</dd>
                        </div>
                      )}
                    </dl>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <p className="mt-10 text-sm text-muted-foreground">
          Drawing up an infusion? See{" "}
          <Link to="/intensive-care/infusions" className="font-medium text-icu underline-offset-4 hover:underline">
            key ICU drug infusions
          </Link>{" "}
          for diluents, concentrations and mL/hour rates.
        </p>
      </PageSection>
    </main>
  );
};

export default IcuDrugDoses;

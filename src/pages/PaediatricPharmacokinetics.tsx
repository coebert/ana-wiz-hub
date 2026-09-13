import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Baby, Search, TriangleAlert, X } from "lucide-react";
import { PageSection } from "@/components/layout/PageSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { paedPkGroups, paediatricPkDrugs, type PaedPkGroup } from "@/data/paediatricPk";

const PaediatricPharmacokinetics = () => {
  const [params] = useSearchParams();
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState<PaedPkGroup | "all">("all");

  useEffect(() => {
    const slug = params.get("slug");
    if (!slug) return;
    const el = document.getElementById(`pk-${slug}`);
    if (el) window.setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 300);
  }, [params]);

  const drugs = useMemo(() => {
    const q = query.trim().toLowerCase();
    return paediatricPkDrugs.filter((d) => {
      if (group !== "all" && d.group !== group) return false;
      if (!q) return true;
      return (
        d.name.toLowerCase().includes(q) ||
        d.route.toLowerCase().includes(q) ||
        d.maturation.toLowerCase().includes(q) ||
        d.bands.some((b) => b.band.toLowerCase().includes(q) || b.implication.toLowerCase().includes(q))
      );
    });
  }, [query, group]);

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>Paediatric Pharmacokinetics | AnaesthesiaCore</title>
        <meta
          name="description"
          content="Weight-based paediatric pharmacokinetics for PICU drugs: clearance, volume of distribution and half-life by age band, with allometric scaling."
        />
        <link rel="canonical" href="https://anaesthesiacore.app/intensive-care/paediatric-pharmacokinetics" />
        <meta property="og:url" content="https://anaesthesiacore.app/intensive-care/paediatric-pharmacokinetics" />
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
            <Baby className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Paediatric Pharmacokinetics</h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Weight-based clearance, volume of distribution and half-life for the
              PICU formulary, band by band from the preterm neonate to the
              adolescent — with the dosing consequence spelled out for each.
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-start gap-2.5 rounded-lg border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
          <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-icu" aria-hidden />
          <p>
            Revision aid only. Values are typical population estimates and vary
            widely with illness severity, organ function, ECMO and renal
            replacement therapy — prescribe from BNFc, the SPC and local PICU
            guidance, with therapeutic drug monitoring where available.
          </p>
        </div>

        <section className="mt-8 grid gap-3 md:grid-cols-3">
          <div className="rounded-lg border border-border p-4">
            <h2 className="font-semibold">Size: allometric scaling</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Clearance scales with weight<sup>0.75</sup> and volume of distribution
              with weight<sup>1.0</sup>. Per-kg clearance is therefore <em>highest</em> in
              small children and falls as they grow — a 10 kg child needs a larger
              mg/kg/h rate than a 60 kg adolescent for the same steady-state
              concentration.
            </p>
          </div>
          <div className="rounded-lg border border-border p-4">
            <h2 className="font-semibold">Maturation: age</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Size alone over-predicts neonatal clearance. Phase I (CYP3A4,
              CYP2C9) and phase II (UGT) enzymes and glomerular filtration mature
              over the first 6–12 months, so neonates clear midazolam, morphine and
              milrinone far more slowly than size predicts.
            </p>
          </div>
          <div className="rounded-lg border border-border p-4">
            <h2 className="font-semibold">Body composition</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Neonates are about 75–80% water with little fat or muscle, giving a
              larger volume of distribution for water-soluble drugs and a smaller
              one for lipophilic drugs. Lower albumin and α1-acid glycoprotein
              raise the free fraction of highly bound drugs such as phenytoin.
            </p>
          </div>
        </section>

        <div className="mt-8 space-y-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search drug, pathway or age band…"
              aria-label="Search paediatric pharmacokinetics"
              className="pl-9 pr-9"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            ) : null}
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            <Button
              size="sm"
              variant={group === "all" ? "default" : "outline"}
              className="shrink-0"
              onClick={() => setGroup("all")}
              aria-pressed={group === "all"}
            >
              All
            </Button>
            {paedPkGroups.map((g) => (
              <Button
                key={g}
                size="sm"
                variant={group === g ? "default" : "outline"}
                className="shrink-0"
                onClick={() => setGroup(g)}
                aria-pressed={group === g}
              >
                {g}
              </Button>
            ))}
          </div>

          <p className="text-sm text-muted-foreground">
            Showing {drugs.length} of {paediatricPkDrugs.length} drugs
          </p>
        </div>

        {drugs.length === 0 ? (
          <p className="mt-10 rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
            No drugs match that search. Try a drug name, a pathway such as
            &ldquo;renal&rdquo;, or an age band such as &ldquo;neonate&rdquo;.
          </p>
        ) : null}

        <div className="mt-6 space-y-6">
          {drugs.map((d) => (
            <article
              key={d.slug}
              id={`pk-${d.slug}`}
              className="scroll-mt-24 rounded-xl border border-border bg-card p-4 md:p-6"
            >
              <header className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-xl font-semibold tracking-tight">{d.name}</h2>
                <span className="rounded-full bg-icu/10 px-2.5 py-0.5 text-xs font-medium text-icu">{d.group}</span>
              </header>
              <p className="mt-2 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Elimination route:</span> {d.route}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Maturation:</span> {d.maturation}
              </p>

              {/* Desktop table */}
              <div className="mt-4 hidden overflow-x-auto md:block">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-border text-left">
                      <th className="py-2 pr-3 font-semibold">Age band</th>
                      <th className="py-2 pr-3 font-semibold">Clearance</th>
                      <th className="py-2 pr-3 font-semibold">V<sub>d</sub></th>
                      <th className="py-2 pr-3 font-semibold">Half-life</th>
                      <th className="py-2 font-semibold">Dosing consequence</th>
                    </tr>
                  </thead>
                  <tbody>
                    {d.bands.map((b) => (
                      <tr key={b.band} className="border-b border-border/60 align-top">
                        <td className="py-2 pr-3 font-medium text-foreground">{b.band}</td>
                        <td className="py-2 pr-3 text-muted-foreground">{b.clearance}</td>
                        <td className="py-2 pr-3 text-muted-foreground">{b.vd}</td>
                        <td className="py-2 pr-3 text-muted-foreground">{b.halfLife}</td>
                        <td className="py-2 text-muted-foreground">{b.implication}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="mt-4 space-y-3 md:hidden">
                {d.bands.map((b) => (
                  <div key={b.band} className="rounded-lg border border-border p-3">
                    <p className="text-sm font-semibold">{b.band}</p>
                    <dl className="mt-2 space-y-1 text-sm text-muted-foreground">
                      <div className="flex gap-2">
                        <dt className="w-24 shrink-0 font-medium text-foreground">Clearance</dt>
                        <dd>{b.clearance}</dd>
                      </div>
                      <div className="flex gap-2">
                        <dt className="w-24 shrink-0 font-medium text-foreground">V<sub>d</sub></dt>
                        <dd>{b.vd}</dd>
                      </div>
                      <div className="flex gap-2">
                        <dt className="w-24 shrink-0 font-medium text-foreground">Half-life</dt>
                        <dd>{b.halfLife}</dd>
                      </div>
                    </dl>
                    <p className="mt-2 text-sm text-muted-foreground">{b.implication}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-lg border border-border bg-secondary/30 p-3 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Scaling &amp; organ function: </span>
                {d.scaling}
              </div>

              {d.withdrawal ? (
                <div className="mt-2 rounded-lg border border-border bg-secondary/30 p-3 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Weaning relevance: </span>
                  {d.withdrawal}
                </div>
              ) : null}

              <div className="mt-4 flex flex-wrap gap-2">
                <Button asChild size="sm" variant="outline">
                  <Link to={`/intensive-care/drug-doses?age=child&drug=${encodeURIComponent(d.name)}`}>
                    Dosing table
                  </Link>
                </Button>
                {d.cardSlug ? (
                  <>
                    <Button asChild size="sm" variant="outline">
                      <Link to={`/intensive-care/drug-cards?slug=${d.cardSlug}#card-${d.cardSlug}`}>Full drug card</Link>
                    </Button>
                    <Button asChild size="sm" variant="outline">
                      <Link to={`/intensive-care/drug-safety?slug=${d.cardSlug}#${d.cardSlug}`}>Safety profile</Link>
                    </Button>
                    <Button asChild size="sm" variant="outline">
                      <Link to={`/intensive-care/drug-safety?slug=${d.cardSlug}#${d.cardSlug}-withdrawal`}>
                        Withdrawal &amp; tapering
                      </Link>
                    </Button>
                  </>
                ) : null}
                <Button asChild size="sm" variant="outline">
                  <Link to="/intensive-care/paediatric-withdrawal">Paediatric withdrawal flow</Link>
                </Button>
              </div>
            </article>
          ))}
        </div>

        <section className="mt-10 rounded-xl border border-border p-4 md:p-6">
          <h2 className="text-lg font-semibold">References</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              Anderson BJ, Holford NHG. Mechanism-based concepts of size and maturity in pharmacokinetics.
              <em> Annu Rev Pharmacol Toxicol</em>. 2008;48:303–332.{" "}
              <a
                className="text-icu underline-offset-4 hover:underline"
                href="https://doi.org/10.1146/annurev.pharmtox.48.113006.094708"
                target="_blank"
                rel="noreferrer"
              >
                doi:10.1146/annurev.pharmtox.48.113006.094708
              </a>
            </li>
            <li>
              Kearns GL, Abdel-Rahman SM, Alander SW, et al. Developmental pharmacology — drug disposition, action,
              and therapy in infants and children. <em>N Engl J Med</em>. 2003;349:1157–1167.{" "}
              <a
                className="text-icu underline-offset-4 hover:underline"
                href="https://doi.org/10.1056/NEJMra035092"
                target="_blank"
                rel="noreferrer"
              >
                doi:10.1056/NEJMra035092
              </a>
            </li>
            <li>
              Anderson BJ, Larsson P. A maturation model for midazolam clearance. <em>Paediatr Anaesth</em>.
              2011;21(3):302–308.{" "}
              <a
                className="text-icu underline-offset-4 hover:underline"
                href="https://doi.org/10.1111/j.1460-9592.2010.03364.x"
                target="_blank"
                rel="noreferrer"
              >
                doi:10.1111/j.1460-9592.2010.03364.x
              </a>
            </li>
            <li>
              Bouwmeester NJ, Anderson BJ, Tibboel D, Holford NHG. Developmental pharmacokinetics of morphine and
              its metabolites in neonates, infants and young children. <em>Br J Anaesth</em>. 2004;92(2):208–217.{" "}
              <a
                className="text-icu underline-offset-4 hover:underline"
                href="https://doi.org/10.1093/bja/aeh042"
                target="_blank"
                rel="noreferrer"
              >
                doi:10.1093/bja/aeh042
              </a>
            </li>
            <li>
              Paediatric Formulary Committee. <em>BNF for Children</em>. London: BMJ Group, Pharmaceutical Press and
              RCPCH Publications (current edition).{" "}
              <a
                className="text-icu underline-offset-4 hover:underline"
                href="https://bnfc.nice.org.uk/"
                target="_blank"
                rel="noreferrer"
              >
                bnfc.nice.org.uk
              </a>
            </li>
          </ul>
        </section>

        <p className="mt-8 text-sm text-muted-foreground">
          Related:{" "}
          <Link to="/intensive-care/drug-cards" className="font-medium text-icu underline-offset-4 hover:underline">
            ICU drug cards
          </Link>{" "}
          ·{" "}
          <Link
            to="/intensive-care/paediatric-withdrawal"
            className="font-medium text-icu underline-offset-4 hover:underline"
          >
            Paediatric withdrawal flow
          </Link>{" "}
          ·{" "}
          <Link to="/intensive-care/drug-doses?age=child" className="font-medium text-icu underline-offset-4 hover:underline">
            Paediatric dosing table
          </Link>{" "}
          ·{" "}
          <Link to="/intensive-care/calculator" className="font-medium text-icu underline-offset-4 hover:underline">
            Infusion calculator
          </Link>{" "}
          ·{" "}
          <Link to="/clinical/paediatric-core" className="font-medium text-icu underline-offset-4 hover:underline">
            Paediatric core topic
          </Link>
        </p>
      </PageSection>
    </main>
  );
};

export default PaediatricPharmacokinetics;

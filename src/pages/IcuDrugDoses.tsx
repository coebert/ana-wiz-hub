import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Pill, Search, TriangleAlert } from "lucide-react";
import { PageSection } from "@/components/layout/PageSection";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { icuDrugDoseGroups, icuDrugCount, type DrugDose } from "@/data/icuDrugDoses";
import { icuDrugSafetyGroups } from "@/data/icuDrugSafety";
import { icuDrugMechanismGroups } from "@/data/icuDrugMechanisms";
import { drugSlug } from "@/lib/caseDoseReferences";
import { mechanismLinkForDrug } from "@/lib/icuDrugMechanismLinks";

type AgeMode = "adult" | "paediatric" | "neonatal";

const ageOptions: Array<{ id: AgeMode; label: string }> = [
  { id: "adult", label: "Adult" },
  { id: "paediatric", label: "Child" },
  { id: "neonatal", label: "Neonate" },
];

const doseFor = (drug: DrugDose, age: AgeMode): string => {
  if (age === "paediatric") return drug.paediatricDose ?? "No separate paediatric dose listed — see local PICU guideline";
  if (age === "neonatal")
    return drug.neonatalDose ?? drug.paediatricDose ?? "No neonatal dose listed — seek neonatal/PICU advice";
  return drug.dose;
};

const cautionFor = (drug: DrugDose, age: AgeMode): string | undefined =>
  age === "adult" ? drug.notes : drug.paediatricNotes ?? drug.notes;

// --- Per-drug interactions / side effects / monitoring -------------------
// Safety and mechanism datasets are keyed by a base slug (e.g. "propofol"),
// while dosing-table names may carry strengths ("Propofol 1%"). Try the full
// slug first, then the slug with a trailing strength token removed.
const slugBase = (name: string) => drugSlug(name).replace(/-\d.*$/, "");

// Dosing-table slug → safety/mechanism slug where the datasets name the drug
// differently (strengths, combined agents, class names).
const SLUG_ALIASES: Record<string, string> = {
  "andexanet-alfa-idarucizumab": "andexanet-idarucizumab",
  "regional-citrate": "regional-citrate-anticoagulation",
  "pantoprazole-omeprazole": "proton-pump-inhibitors",
};

const slugFor = (name: string): string =>
  SLUG_ALIASES[drugSlug(name)] ?? SLUG_ALIASES[slugBase(name)] ?? drugSlug(name);

const safetyBySlug = new Map(
  icuDrugSafetyGroups.flatMap((g) => g.drugs).map((d) => [d.slug, d]),
);
const mechanismBySlug = new Map(
  icuDrugMechanismGroups.flatMap((g) => g.drugs).map((d) => [d.slug, d]),
);

const safetyFor = (drugName: string) =>
  safetyBySlug.get(slugFor(drugName)) ?? safetyBySlug.get(slugBase(drugName));
const adverseEffectsFor = (drugName: string): string | undefined =>
  (mechanismBySlug.get(slugFor(drugName)) ?? mechanismBySlug.get(slugBase(drugName)))
    ?.adverseEffects;

/** Expandable interactions / side effects / monitoring panel for one drug. */
const DrugSafetyDetail = ({ drugName }: { drugName: string }) => {
  const safety = safetyFor(drugName);
  const adverse = adverseEffectsFor(drugName);
  if (!safety && !adverse) return null;
  return (
    <details className="group mt-2 rounded-lg border border-border bg-muted/30 text-sm">
      <summary className="cursor-pointer select-none px-3 py-2 text-xs font-medium text-icu marker:text-icu">
        Interactions · side effects · monitoring
      </summary>
      <div className="space-y-3 border-t border-border px-3 py-3">
        {safety?.interactions?.length ? (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Interactions
            </p>
            <ul className="mt-1 list-disc space-y-1 pl-4 text-muted-foreground">
              {safety.interactions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null}
        {adverse && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Side effects
            </p>
            <p className="mt-1 leading-relaxed text-muted-foreground">{adverse}</p>
          </div>
        )}
        {safety?.monitoring?.length ? (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Monitoring
            </p>
            <ul className="mt-1 list-disc space-y-1 pl-4 text-muted-foreground">
              {safety.monitoring.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null}
        <p className="text-xs">
          <Link
            to={`/intensive-care/drug-safety#${safety?.slug ?? slugBase(drugName)}`}
            className="font-medium text-icu underline-offset-4 hover:underline"
          >
            Full safety profile
          </Link>{" "}
          ·{" "}
          <Link
            to="/intensive-care/interaction-checker"
            className="font-medium text-icu underline-offset-4 hover:underline"
          >
            Check a drug pair
          </Link>
        </p>
      </div>
    </details>
  );
};

const IcuDrugDoses = () => {
  const [searchParams] = useSearchParams();
  const requestedDrug = searchParams.get("drug") ?? "";
  const requestedAge = searchParams.get("age") ?? "";
  const [search, setSearch] = useState("");
  const [activeGroup, setActiveGroup] = useState<string>("all");
  const [age, setAge] = useState<AgeMode>("adult");

  useEffect(() => {
    if (requestedAge === "paediatric" || requestedAge === "neonatal") setAge(requestedAge);
  }, [requestedAge]);

  // A case-bank dosing link arrives as ?drug=<slug>: prefill the search with
  // that drug name and scroll to its row.
  useEffect(() => {
    if (!requestedDrug) return;
    const match = icuDrugDoseGroups
      .flatMap((group) => group.drugs)
      .find((drug) => drugSlug(drug.drug) === requestedDrug);
    if (!match) return;
    setActiveGroup("all");
    setSearch(match.drug.replace(/\s*[0-9].*$/, "").trim());
    window.requestAnimationFrame(() => {
      const targets = Array.from(
        document.querySelectorAll<HTMLElement>(`[data-drug="${requestedDrug}"]`),
      );
      const visible = targets.find((el) => el.offsetParent !== null) ?? targets[0];
      visible?.scrollIntoView({ block: "center" });
    });
  }, [requestedDrug]);

  const groups = useMemo(() => {
    const q = search.trim().toLowerCase();
    return icuDrugDoseGroups
      .filter((g) => activeGroup === "all" || g.id === activeGroup)
      .map((g) => ({
        ...g,
        drugs: q
          ? g.drugs.filter((d) =>
              [
                d.drug,
                d.dose,
                d.route,
                d.frequency,
                d.indications,
                d.notes ?? "",
                d.paediatricDose ?? "",
                d.neonatalDose ?? "",
                d.paediatricNotes ?? "",
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
        <title>ICU Drug Dosing Table: Adult, Paediatric a | AnaesthesiaCore</title>
        <meta
          name="description"
          content="Searchable intensive care drug dosing table with adult, paediatric and neonatal doses: sedation, analgesia, neuromuscular blockade, vasopressors, inotropes."
        />
        <link rel="canonical" href="https://anaesthesiacore.app/intensive-care/drug-doses" />
        <meta property="og:url" content="https://anaesthesiacore.app/intensive-care/drug-doses" />
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
              day in critical care, grouped by clinical purpose, with adult,
              paediatric and neonatal doses. Use it for revision and viva
              preparation alongside the linked topics.
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

        <div className="mt-4 flex flex-wrap items-center gap-2" role="group" aria-label="Choose patient age group">
          <span className="text-sm text-muted-foreground">Doses for:</span>
          {ageOptions.map((option) => (
            <Button
              key={option.id}
              size="sm"
              variant={age === option.id ? "default" : "outline"}
              onClick={() => setAge(option.id)}
              aria-pressed={age === option.id}
            >
              {option.label}
            </Button>
          ))}
        </div>

        {age !== "adult" && (
          <p className="mt-3 rounded-lg border border-border bg-muted/40 p-3 text-sm text-muted-foreground">
            {age === "paediatric"
              ? "Paediatric doses are per kg and must never exceed the adult dose. Check every calculation against the BNF for Children and your local PICU guideline."
              : "Neonatal doses assume a term baby; adjust for postmenstrual age, weight and renal function, and confirm with the BNF for Children and your neonatal or PICU guideline."}
          </p>
        )}

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
                      <th scope="col" className="p-3 font-semibold">
                        {age === "adult" ? "Adult dose" : age === "paediatric" ? "Paediatric dose" : "Neonatal dose"}
                      </th>
                      <th scope="col" className="p-3 font-semibold">Route</th>
                      <th scope="col" className="p-3 font-semibold">Frequency</th>
                      <th scope="col" className="p-3 font-semibold">Key indications</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.drugs.map((d) => (
                      <tr
                        key={d.drug}
                        id={`drug-${drugSlug(d.drug)}`}
                        data-drug={drugSlug(d.drug)}
                        className="border-t border-border align-top scroll-mt-24"
                      >
                        <th scope="row" className="p-3 text-left font-medium text-foreground">
                          {d.drug}
                          {mechanismLinkForDrug(d.drug) && (
                            <Link
                              to={mechanismLinkForDrug(d.drug)!}
                              className="mt-1 block text-xs font-normal text-icu underline-offset-4 hover:underline"
                            >
                              Kinetics &amp; metabolism
                            </Link>
                          )}
                          <DrugSafetyDetail drugName={d.drug} />
                        </th>
                        <td className="p-3 text-muted-foreground">{doseFor(d, age)}</td>
                        <td className="p-3 text-muted-foreground">{d.route}</td>
                        <td className="p-3 text-muted-foreground">{d.frequency}</td>
                        <td className="p-3 text-muted-foreground">
                          {d.indications}
                          {cautionFor(d, age) && (
                            <span className="mt-1.5 block text-xs italic">{cautionFor(d, age)}</span>
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
                  <li
                    key={d.drug}
                    data-drug={drugSlug(d.drug)}
                    className="scroll-mt-24 rounded-xl border border-border bg-card p-4"
                  >
                    <h3 className="font-semibold text-foreground">{d.drug}</h3>
                    {mechanismLinkForDrug(d.drug) && (
                      <Link
                        to={mechanismLinkForDrug(d.drug)!}
                        className="mt-1 inline-block text-xs text-icu underline-offset-4 hover:underline"
                      >
                        Kinetics &amp; metabolism
                      </Link>
                    )}
                    <dl className="mt-2 space-y-1.5 text-sm">
                      <div>
                        <dt className="inline font-medium">
                          {age === "adult" ? "Adult dose" : age === "paediatric" ? "Paediatric dose" : "Neonatal dose"}:{" "}
                        </dt>
                        <dd className="inline text-muted-foreground">{doseFor(d, age)}</dd>
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
                      {cautionFor(d, age) && (
                        <div>
                          <dt className="inline font-medium">Cautions: </dt>
                          <dd className="inline text-muted-foreground">{cautionFor(d, age)}</dd>
                        </div>
                      )}
                    </dl>
                    <DrugSafetyDetail drugName={d.drug} />
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
          for diluents, concentrations and mL/hour rates. For pharmacodynamics,
          metabolism and adverse effects of every drug listed here, open{" "}
          <Link
            to="/intensive-care/drug-mechanisms"
            className="font-medium text-icu underline-offset-4 hover:underline"
          >
            ICU drug mechanisms
          </Link>
          . For interactions, contraindications and monitoring, open{" "}
          <Link
            to="/intensive-care/drug-safety"
            className="font-medium text-icu underline-offset-4 hover:underline"
          >
            ICU drug safety
          </Link>{" "}
          or check a pair of drugs in the{" "}
          <Link
            to="/intensive-care/interaction-checker"
            className="font-medium text-icu underline-offset-4 hover:underline"
          >
            interaction checker
          </Link>{" "}
          or side by side in the{" "}
          <Link
            to="/intensive-care/drug-comparison"
            className="font-medium text-icu underline-offset-4 hover:underline"
          >
            drug comparison tool
          </Link>
          .

        </p>
      </PageSection>
    </main>
  );
};

export default IcuDrugDoses;

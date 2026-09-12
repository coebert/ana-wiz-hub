import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Droplets, Search, TriangleAlert } from "lucide-react";
import { PageSection } from "@/components/layout/PageSection";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  formatMlPerHour,
  icuInfusionCount,
  icuInfusionGroups,
  mlPerHour,
  type Infusion,
} from "@/data/icuInfusions";

const DEFAULT_WEIGHT = 70;

const rangeFor = (i: Infusion, weight: number) => {
  const start = mlPerHour(i, i.startDose, weight);
  const lo = mlPerHour(i, i.minDose, weight);
  const hi = mlPerHour(i, i.maxDose, weight);
  return { start, lo, hi };
};

const IcuInfusions = () => {
  const [search, setSearch] = useState("");
  const [activeGroup, setActiveGroup] = useState<string>("all");
  const [weightInput, setWeightInput] = useState(String(DEFAULT_WEIGHT));
  const weight = Number(weightInput) > 0 ? Number(weightInput) : DEFAULT_WEIGHT;

  const groups = useMemo(() => {
    const q = search.trim().toLowerCase();
    return icuInfusionGroups
      .filter((g) => activeGroup === "all" || g.id === activeGroup)
      .map((g) => ({
        ...g,
        infusions: q
          ? g.infusions.filter((i) =>
              [i.drug, i.diluent, i.drawUp, i.concentrationLabel, i.notes ?? ""]
                .join(" ")
                .toLowerCase()
                .includes(q),
            )
          : g.infusions,
      }))
      .filter((g) => g.infusions.length > 0);
  }, [search, activeGroup]);

  const shown = groups.reduce((n, g) => n + g.infusions.length, 0);

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>Key ICU Drug Infusions — AnaesthesiaCore</title>
        <meta
          name="description"
          content="Adult ICU infusion recipes: vasopressors, inotropes, sedatives and analgesics with safe diluents, draw-up volumes and concentrations, starting doses and dose ranges in micrograms/kg/min (or equivalent) with a live mL/hour converter."
        />
        <link rel="canonical" href="https://anaesthesiacore.app/intensive-care/infusions" />
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
            <Droplets className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Key ICU Drug Infusions</h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              How to draw up the infusions used every day on critical care —
              diluent, concentration, starting dose and dose range, with mL/hour
              rates worked out for your patient's weight.
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-start gap-2.5 rounded-lg border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
          <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-icu" aria-hidden />
          <p>
            Revision aid only. Recipes reflect common UK practice; always follow
            your local critical care infusion guidelines and smart-pump drug
            library, and never run incompatible drugs through the same lumen.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search drug, diluent or recipe (e.g. noradrenaline, glucose)…"
              className="pl-9"
              aria-label="Search ICU infusions"
            />
          </div>
          <div className="w-full sm:w-44">
            <label htmlFor="pt-weight" className="mb-1 block text-xs font-medium text-muted-foreground">
              Patient weight (kg) for mL/h
            </label>
            <Input
              id="pt-weight"
              type="number"
              min={1}
              inputMode="decimal"
              value={weightInput}
              onChange={(e) => setWeightInput(e.target.value)}
            />
          </div>
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
          {icuInfusionGroups.map((g) => (
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
          {shown} of {icuInfusionCount} infusions shown · rates calculated for {weight} kg
        </p>

        {shown === 0 && (
          <p className="mt-8 rounded-lg border border-border bg-card p-6 text-sm text-muted-foreground">
            No infusions match that search. Try a drug name or a diluent.
          </p>
        )}

        <div className="mt-8 space-y-10">
          {groups.map((group) => (
            <section key={group.id} id={group.id} className="scroll-mt-24">
              <h2 className="text-xl font-semibold tracking-tight">{group.title}</h2>
              <p className="mt-1 max-w-3xl text-sm text-muted-foreground">{group.blurb}</p>

              {/* Table on wider screens */}
              <div className="mt-4 hidden overflow-x-auto rounded-xl border border-border lg:block">
                <table className="w-full min-w-[960px] border-collapse text-sm">
                  <caption className="sr-only">
                    {group.title}: diluent, draw-up, concentration, starting dose and dose range with mL/hour rates
                  </caption>
                  <thead className="bg-muted/50 text-left">
                    <tr>
                      <th scope="col" className="p-3 font-semibold">Drug</th>
                      <th scope="col" className="p-3 font-semibold">Diluent</th>
                      <th scope="col" className="p-3 font-semibold">Draw up</th>
                      <th scope="col" className="p-3 font-semibold">Concentration</th>
                      <th scope="col" className="p-3 font-semibold">Start dose</th>
                      <th scope="col" className="p-3 font-semibold">Dose range</th>
                      <th scope="col" className="p-3 font-semibold">mL/h range ({weight} kg)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.infusions.map((i) => {
                      const r = rangeFor(i, weight);
                      return (
                        <tr key={i.drug} className="border-t border-border align-top">
                          <th scope="row" className="p-3 text-left font-medium text-foreground">
                            {i.drug}
                            {i.notes && (
                              <span className="mt-1.5 block text-xs font-normal italic text-muted-foreground">
                                {i.notes}
                              </span>
                            )}
                          </th>
                          <td className="p-3 text-muted-foreground">{i.diluent}</td>
                          <td className="p-3 text-muted-foreground">{i.drawUp}</td>
                          <td className="p-3 text-muted-foreground">{i.concentrationLabel}</td>
                          <td className="p-3 text-muted-foreground">
                            {i.startDose} {i.unit}
                            <span className="block text-xs">
                              ≈ {formatMlPerHour(r.start)} mL/h
                            </span>
                          </td>
                          <td className="p-3 text-muted-foreground">
                            {i.minDose}–{i.maxDose} {i.unit}
                          </td>
                          <td className="p-3 text-muted-foreground">
                            {formatMlPerHour(r.lo)}–{formatMlPerHour(r.hi)} mL/h
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Stacked cards on mobile/tablet */}
              <ul className="mt-4 space-y-3 lg:hidden">
                {group.infusions.map((i) => {
                  const r = rangeFor(i, weight);
                  return (
                    <li key={i.drug} className="rounded-xl border border-border bg-card p-4">
                      <h3 className="font-semibold text-foreground">{i.drug}</h3>
                      <dl className="mt-2 space-y-1.5 text-sm">
                        <div>
                          <dt className="inline font-medium">Diluent: </dt>
                          <dd className="inline text-muted-foreground">{i.diluent}</dd>
                        </div>
                        <div>
                          <dt className="inline font-medium">Draw up: </dt>
                          <dd className="inline text-muted-foreground">{i.drawUp}</dd>
                        </div>
                        <div>
                          <dt className="inline font-medium">Concentration: </dt>
                          <dd className="inline text-muted-foreground">{i.concentrationLabel}</dd>
                        </div>
                        <div>
                          <dt className="inline font-medium">Start: </dt>
                          <dd className="inline text-muted-foreground">
                            {i.startDose} {i.unit} ≈ {formatMlPerHour(r.start)} mL/h
                          </dd>
                        </div>
                        <div>
                          <dt className="inline font-medium">Range: </dt>
                          <dd className="inline text-muted-foreground">
                            {i.minDose}–{i.maxDose} {i.unit} ({formatMlPerHour(r.lo)}–
                            {formatMlPerHour(r.hi)} mL/h at {weight} kg)
                          </dd>
                        </div>
                        {i.notes && (
                          <div>
                            <dt className="inline font-medium">Cautions: </dt>
                            <dd className="inline text-muted-foreground">{i.notes}</dd>
                          </div>
                        )}
                      </dl>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>

        <p className="mt-10 text-sm text-muted-foreground">
          Looking for bolus dosing? See the{" "}
          <Link to="/intensive-care/drug-doses" className="font-medium text-icu underline-offset-4 hover:underline">
            ICU drug dosing table
          </Link>
          .
        </p>
      </PageSection>
    </main>
  );
};

export default IcuInfusions;

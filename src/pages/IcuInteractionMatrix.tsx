import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Grid3X3, ShieldAlert, TriangleAlert, Search, X } from "lucide-react";
import { PageSection } from "@/components/layout/PageSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { icuDrugSafetyGroups, type DrugSafety } from "@/data/icuDrugSafety";
import { PageJsonLd } from "@/components/layout/PageJsonLd";
import {
  findInteractions,
  severityLabel,
  type InteractionFinding,
  type InteractionSeverity,
} from "@/data/icuDrugInteractions";

interface MatrixDrug extends DrugSafety {
  groupTitle: string;
}

const allDrugs: MatrixDrug[] = icuDrugSafetyGroups.flatMap((g) =>
  g.drugs.map((d) => ({ ...d, groupTitle: g.title })),
);

const groupTitles = icuDrugSafetyGroups.map((g) => g.title);

const severityRank: Record<InteractionSeverity, number> = { avoid: 0, major: 1, moderate: 2 };

/** Worst severity for a pair, or null when the pair has no recorded interaction. */
const worstSeverity = (a: string, b: string): InteractionSeverity | null => {
  const findings = findInteractions(a, b);
  if (findings.length === 0) return null;
  return findings.reduce<InteractionSeverity>(
    (worst, f) => (severityRank[f.severity] < severityRank[worst] ? f.severity : worst),
    "moderate",
  );
};

const cellStyles: Record<InteractionSeverity, string> = {
  avoid: "bg-destructive/80 text-destructive-foreground hover:bg-destructive",
  major: "bg-icu/70 text-white hover:bg-icu",
  moderate: "bg-icu/25 text-foreground hover:bg-icu/40",
};

const cellGlyph: Record<InteractionSeverity, string> = {
  avoid: "A",
  major: "M",
  moderate: "m",
};

const panelStyles: Record<InteractionSeverity, string> = {
  avoid: "border-destructive/40 bg-destructive/10",
  major: "border-icu/40 bg-icu/10",
  moderate: "border-border bg-surface",
};

const severityBadge: Record<InteractionSeverity, "destructive" | "default" | "secondary"> = {
  avoid: "destructive",
  major: "default",
  moderate: "secondary",
};

const FindingCard = ({ finding }: { finding: InteractionFinding }) => (
  <article className={`rounded-lg border p-4 ${panelStyles[finding.severity]}`}>
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant={severityBadge[finding.severity]}>{severityLabel[finding.severity]}</Badge>
      <span className="text-xs text-muted-foreground">{finding.basis}</span>
    </div>
    <h4 className="mt-2 flex items-start gap-2 font-semibold text-foreground">
      {finding.severity === "avoid" ? (
        <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-destructive" aria-hidden />
      ) : (
        <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-icu" aria-hidden />
      )}
      {finding.effect}
    </h4>
    <p className="mt-1.5 text-sm text-muted-foreground">{finding.detail}</p>
    <p className="mt-2 text-sm text-foreground">
      <span className="font-semibold">What to do: </span>
      {finding.action}
    </p>
  </article>
);

const IcuInteractionMatrix = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [group, setGroup] = useState<string>(searchParams.get("group") ?? groupTitles[0]);
  const [query, setQuery] = useState("");
  const [pair, setPair] = useState<{ a: string; b: string } | null>(() => {
    const a = searchParams.get("a");
    const b = searchParams.get("b");
    return a && b ? { a, b } : null;
  });
  const [focusSlug, setFocusSlug] = useState<string | null>(searchParams.get("slug"));

  const drugs = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q) {
      return allDrugs.filter(
        (d) => d.drug.toLowerCase().includes(q) || d.groupTitle.toLowerCase().includes(q),
      );
    }
    return allDrugs.filter((d) => d.groupTitle === group);
  }, [group, query]);

  const focusDrug = focusSlug ? allDrugs.find((d) => d.slug === focusSlug) ?? null : null;

  /** Every recorded interaction for the focused drug, worst first. */
  const focusRows = useMemo(() => {
    if (!focusDrug) return [];
    return allDrugs
      .filter((d) => d.slug !== focusDrug.slug)
      .map((d) => ({ drug: d, findings: findInteractions(focusDrug.slug, d.slug) }))
      .filter((row) => row.findings.length > 0)
      .sort(
        (x, y) =>
          severityRank[x.findings[0].severity] - severityRank[y.findings[0].severity] ||
          x.drug.drug.localeCompare(y.drug.drug),
      );
  }, [focusDrug]);

  const pairDrugs = pair
    ? {
        a: allDrugs.find((d) => d.slug === pair.a),
        b: allDrugs.find((d) => d.slug === pair.b),
      }
    : null;
  const pairFindings = pair ? findInteractions(pair.a, pair.b) : [];

  const updateParams = (next: { group?: string; slug?: string | null; a?: string; b?: string | null }) => {
    const params = new URLSearchParams(searchParams);
    if (next.group !== undefined) params.set("group", next.group);
    if (next.slug !== undefined) {
      if (next.slug) params.set("slug", next.slug);
      else params.delete("slug");
    }
    if (next.a !== undefined && next.b !== undefined) {
      if (next.a && next.b) {
        params.set("a", next.a);
        params.set("b", next.b);
      } else {
        params.delete("a");
        params.delete("b");
      }
    }
    setSearchParams(params, { replace: true });
  };

  const selectPair = (a: string, b: string) => {
    setPair({ a, b });
    updateParams({ a, b });
  };

  const selectGroup = (title: string) => {
    setGroup(title);
    setQuery("");
    updateParams({ group: title });
  };

  const selectFocus = (slug: string | null) => {
    setFocusSlug(slug);
    updateParams({ slug });
  };

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>ICU Drug Interaction Matrix | AnaesthesiaCore</title>
        <meta
          name="description"
          content="A grid of the adult intensive care formulary showing which ICU drugs interact with each other, graded avoid, major or moderate, with mechanism."
        />
        <link rel="canonical" href="https://anaesthesiacore.app/intensive-care/interaction-matrix" />
        <meta property="og:url" content="https://anaesthesiacore.app/intensive-care/interaction-matrix" />
      </Helmet>
      <PageJsonLd name="ICU Drug Interaction Matrix" description="A grid of the adult intensive care formulary showing which ICU drugs interact with each other, graded avoid, major or moderate, with mechanism." />

      <PageSection className="pt-8 pb-16">
        <Link
          to="/intensive-care"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Intensive Care
        </Link>

        <div className="mt-4 flex items-start gap-3">
          <div className="rounded-lg bg-icu/10 p-2.5 text-icu">
            <Grid3X3 className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              ICU Drug Interaction Matrix
            </h1>
            <p className="mt-2 max-w-3xl text-muted-foreground">
              Every pair in the adult intensive care formulary, graded by the worst interaction it
              carries. Pick a drug class to see its grid, or search a drug and read its full
              interaction list. Tap any coloured square for the mechanism, the clinical consequence
              and what to do about it.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
          <span className="font-semibold text-foreground">Key:</span>
          {(["avoid", "major", "moderate"] as InteractionSeverity[]).map((s) => (
            <span key={s} className="inline-flex items-center gap-1.5">
              <span
                className={`inline-flex h-5 w-5 items-center justify-center rounded text-[11px] font-bold ${cellStyles[s]}`}
              >
                {cellGlyph[s]}
              </span>
              <span className="text-muted-foreground">{severityLabel[s]}</span>
            </span>
          ))}
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded border border-border bg-surface" />
            <span className="text-muted-foreground">No recorded interaction</span>
          </span>
        </div>

        <div className="mt-6 space-y-3">
          <div className="relative max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a drug or class"
              className="pl-9"
              aria-label="Search drugs"
            />
          </div>
          <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            <div className="flex w-max gap-2 pb-1">
              {groupTitles.map((title) => (
                <Button
                  key={title}
                  size="sm"
                  variant={!query && group === title ? "default" : "outline"}
                  onClick={() => selectGroup(title)}
                  className="whitespace-nowrap"
                >
                  {title}
                </Button>
              ))}
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Showing {drugs.length} {drugs.length === 1 ? "drug" : "drugs"}
            {query ? ` matching "${query}"` : ` in ${group}`}.
          </p>
        </div>

        {/* Matrix — horizontally scrollable, so it never overflows the page on mobile */}
        <section className="mt-6">
          <h2 className="text-xl font-serif font-bold text-foreground">Pairwise grid</h2>
          {drugs.length < 2 ? (
            <p className="mt-2 text-sm text-muted-foreground">
              Select a class or widen your search to at least two drugs to draw the grid.
            </p>
          ) : (
            <div className="-mx-4 mt-3 overflow-x-auto px-4 sm:mx-0 sm:px-0">
              <table className="w-max border-collapse text-xs">
                <caption className="sr-only">
                  Interaction severity for each pair of drugs in the current selection
                </caption>
                <thead>
                  <tr>
                    <th scope="col" className="sticky left-0 z-10 bg-background p-1 text-left" />
                    {drugs.map((d) => (
                      <th
                        key={d.slug}
                        scope="col"
                        className="h-28 w-8 p-0 align-bottom font-medium text-muted-foreground"
                      >
                        <span className="block h-28 w-8 origin-bottom-left -rotate-90 whitespace-nowrap pl-1 text-left leading-8">
                          {d.drug}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {drugs.map((row) => (
                    <tr key={row.slug}>
                      <th
                        scope="row"
                        className="sticky left-0 z-10 max-w-[9rem] truncate bg-background py-1 pr-2 text-left font-medium text-foreground"
                      >
                        <button
                          type="button"
                          onClick={() => selectFocus(row.slug)}
                          className="truncate underline-offset-4 hover:underline"
                        >
                          {row.drug}
                        </button>
                      </th>
                      {drugs.map((col) => {
                        if (row.slug === col.slug) {
                          return (
                            <td key={col.slug} className="p-0.5">
                              <span className="block h-7 w-7 rounded bg-muted" aria-hidden />
                            </td>
                          );
                        }
                        const severity = worstSeverity(row.slug, col.slug);
                        const label = severity
                          ? `${row.drug} with ${col.drug}: ${severityLabel[severity]}`
                          : `${row.drug} with ${col.drug}: no recorded interaction`;
                        return (
                          <td key={col.slug} className="p-0.5">
                            {severity ? (
                              <button
                                type="button"
                                onClick={() => selectPair(row.slug, col.slug)}
                                title={label}
                                aria-label={label}
                                className={`flex h-7 w-7 items-center justify-center rounded text-[11px] font-bold transition-colors ${cellStyles[severity]}`}
                              >
                                {cellGlyph[severity]}
                              </button>
                            ) : (
                              <span
                                title={label}
                                className="block h-7 w-7 rounded border border-border bg-surface"
                              />
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Selected pair detail */}
        {pair && pairDrugs?.a && pairDrugs?.b && (
          <section className="mt-10 scroll-mt-24" id="pair">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-serif font-bold text-foreground">
                {pairDrugs.a.drug} + {pairDrugs.b.drug}
              </h2>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setPair(null);
                  updateParams({ a: "", b: null });
                }}
              >
                <X className="mr-1 h-4 w-4" /> Clear
              </Button>
            </div>
            <div className="mt-3 space-y-3">
              {pairFindings.map((f) => (
                <FindingCard key={`${f.effect}-${f.basis}`} finding={f} />
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-3 text-sm">
              <Link
                to={`/intensive-care/interaction-checker?a=${pair.a}&b=${pair.b}`}
                className="font-medium text-icu underline-offset-4 hover:underline"
              >
                Open in interaction checker
              </Link>
              <Link
                to={`/intensive-care/drug-comparison?a=${pair.a}&b=${pair.b}`}
                className="font-medium text-icu underline-offset-4 hover:underline"
              >
                Compare side by side
              </Link>
            </div>
          </section>
        )}

        {/* Focused drug — full interaction list, the mobile-friendly view */}
        {focusDrug && (
          <section className="mt-10 scroll-mt-24" id="drug">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-serif font-bold text-foreground">
                  Everything that interacts with {focusDrug.drug}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {focusRows.length} {focusRows.length === 1 ? "drug" : "drugs"} in this formulary,
                  worst severity first.
                </p>
              </div>
              <Button size="sm" variant="ghost" onClick={() => selectFocus(null)}>
                <X className="mr-1 h-4 w-4" /> Clear
              </Button>
            </div>
            <div className="mt-3 space-y-2">
              {focusRows.map(({ drug, findings }) => (
                <div
                  key={drug.slug}
                  className={`rounded-lg border p-3 ${panelStyles[findings[0].severity]}`}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant={severityBadge[findings[0].severity]}>
                      {severityLabel[findings[0].severity]}
                    </Badge>
                    <button
                      type="button"
                      onClick={() => selectPair(focusDrug.slug, drug.slug)}
                      className="font-semibold text-foreground underline-offset-4 hover:underline"
                    >
                      {drug.drug}
                    </button>
                  </div>
                  <ul className="mt-1.5 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                    {findings.map((f) => (
                      <li key={`${f.effect}-${f.basis}`}>{f.effect}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-3 text-sm">
              <Link
                to={`/intensive-care/drug-safety?slug=${focusDrug.slug}`}
                className="font-medium text-icu underline-offset-4 hover:underline"
              >
                Safety profile
              </Link>
              <Link
                to={`/intensive-care/drug-mechanisms?slug=${focusDrug.slug}#pd-${focusDrug.slug}`}
                className="font-medium text-icu underline-offset-4 hover:underline"
              >
                Pharmacodynamics
              </Link>
              <Link
                to={`/intensive-care/drug-cards?slug=${focusDrug.slug}#card-${focusDrug.slug}`}
                className="font-medium text-icu underline-offset-4 hover:underline"
              >
                Full drug card
              </Link>
            </div>
          </section>
        )}

        <p className="mt-10 rounded-lg border border-border bg-surface p-4 text-sm text-muted-foreground">
          Revision aid only. The grid covers this site's adult ICU formulary and the interactions
          examiners expect you to know, combining named drug-pair interactions with pharmacological
          class rules — it is not a substitute for the BNF, the summary of product characteristics,
          your local critical care guidelines or a pharmacist review. Physical Y-site compatibility is
          a separate question: check your local infusion compatibility chart. Two drugs to check in
          detail?{" "}
          <Link
            to="/intensive-care/interaction-checker"
            className="font-medium text-icu underline-offset-4 hover:underline"
          >
            Use the interaction checker
          </Link>
          .
        </p>
      </PageSection>
    </main>
  );
};

export default IcuInteractionMatrix;

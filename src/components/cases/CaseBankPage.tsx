import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpenCheck, Search, ShieldCheck, X } from "lucide-react";
import { SectionLayout } from "@/components/layout/SectionLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProgressiveCase } from "@/components/perioperative/ProgressiveCase";
import type { CaseBank, CaseBankCase } from "@/data/cases/types";

interface CaseBankPageProps {
  bank: CaseBank;
}

const difficulties = ["All", "Foundation", "Intermediate", "Advanced"] as const;

/** Everything a learner might search on, including the model answers. */
const caseSearchText = (caseData: CaseBankCase): string =>
  [
    caseData.title,
    caseData.category,
    caseData.difficulty,
    caseData.summary,
    caseData.patient,
    caseData.presentation,
    caseData.takeHome,
    ...caseData.stages.flatMap((stage) => [stage.title, stage.prompt, ...stage.answer]),
    ...caseData.detailedAnswer.flatMap((section) => [section.title, section.content]),
  ]
    .join(" ")
    .toLowerCase();

export const CaseBankPage = ({ bank }: CaseBankPageProps) => {
  const [category, setCategory] = useState<string>("All");
  const [difficulty, setDifficulty] = useState<string>("All");
  const [query, setQuery] = useState("");
  const filters = useMemo(() => ["All", ...bank.categories], [bank.categories]);
  const visibleCases = useMemo(() => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    return bank.cases.filter((item) => {
      if (category !== "All" && item.category !== category) return false;
      if (difficulty !== "All" && item.difficulty !== difficulty) return false;
      if (terms.length === 0) return true;
      const haystack = caseSearchText(item);
      return terms.every((term) => haystack.includes(term));
    });
  }, [bank.cases, category, difficulty, query]);
  const hasFilters = category !== "All" || difficulty !== "All" || query.trim() !== "";
  const clearFilters = () => {
    setCategory("All");
    setDifficulty("All");
    setQuery("");
  };

  return (
    <SectionLayout
      title={bank.title}
      subtitle={bank.subtitle}
      metaDescription={bank.metaDescription}
      backPath={bank.backPath}
      backLabel={bank.backLabel}
      accentColor={bank.accentColor}
      disableAutoTOC
    >
      <section className="border-y border-border py-5 mb-6">
        <div className="grid sm:grid-cols-[auto_1fr] gap-4 items-start">
          <BookOpenCheck className={`h-8 w-8 ${bank.accentColor}`} aria-hidden />
          <div>
            <h2 className="text-lg font-semibold text-foreground">How the cases work</h2>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Pause at each stage, commit to an assessment or management plan, then reveal the model answer. Answers can be
              hidden again for re-testing, and each case has a shareable summary. Complete every stage to unlock a detailed
              second pass with the clinical reasoning, practical management and common pitfalls. The patients are fictionalised
              composites; no identifiable patient information is used.
            </p>
          </div>
        </div>
      </section>

      <div className="mb-6 space-y-4">
        <div>
          <Label htmlFor="case-search" className="text-sm font-medium">
            Search by condition, specialty or keyword
          </Label>
          <div className="relative mt-1.5">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
            <Input
              id="case-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="e.g. sepsis, proning, ketamine, oliguria…"
              className="pl-9 pr-9"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            )}
          </div>
        </div>
        <div
          className="-mx-1 px-1 flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible"
          role="group"
          aria-label="Filter cases by subject"
        >
          {filters.map((item) => (
            <Button
              key={item}
              type="button"
              size="sm"
              className="shrink-0"
              variant={category === item ? "primary" : "outline"}
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
            >
              {item}
            </Button>
          ))}
        </div>
        <div
          className="-mx-1 px-1 flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible"
          role="group"
          aria-label="Filter cases by difficulty"
        >
          {difficulties.map((item) => (
            <Button
              key={item}
              type="button"
              size="sm"
              className="shrink-0"
              variant={difficulty === item ? "primary" : "outline"}
              onClick={() => setDifficulty(item)}
              aria-pressed={difficulty === item}
            >
              {item === "All" ? "Any difficulty" : item}
            </Button>
          ))}
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-4" aria-live="polite">
        Showing {visibleCases.length} of {bank.cases.length} cases
        {hasFilters && (
          <Button type="button" variant="link" size="sm" className="ml-2 h-auto p-0 align-baseline" onClick={clearFilters}>
            Clear filters
          </Button>
        )}
      </p>
      {visibleCases.length === 0 && (
        <p className="rounded-md border border-dashed border-border p-6 text-sm text-muted-foreground">
          No cases match your filters. Try a different condition, specialty or keyword, or clear the filters.
        </p>
      )}
      <div className="space-y-5">
        {visibleCases.map((caseData) => (
          <ProgressiveCase key={caseData.id} caseData={caseData} />
        ))}
      </div>

      <section className="mt-8 border-t border-border pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex gap-3 items-start">
          <ShieldCheck className="h-5 w-5 shrink-0 text-accent mt-0.5" aria-hidden />
          <p className="text-sm text-muted-foreground">
            These revision cases support structured reasoning but do not replace local protocols, senior advice or clinical
            judgement.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link to={bank.backPath}>Return to topics</Link>
        </Button>
      </section>
    </SectionLayout>
  );
};

export default CaseBankPage;

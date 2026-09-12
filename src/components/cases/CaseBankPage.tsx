import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpenCheck, ShieldCheck } from "lucide-react";
import { SectionLayout } from "@/components/layout/SectionLayout";
import { Button } from "@/components/ui/button";
import { ProgressiveCase } from "@/components/perioperative/ProgressiveCase";
import type { CaseBank } from "@/data/cases/types";

interface CaseBankPageProps {
  bank: CaseBank;
}

export const CaseBankPage = ({ bank }: CaseBankPageProps) => {
  const [category, setCategory] = useState<string>("All");
  const filters = useMemo(() => ["All", ...bank.categories], [bank.categories]);
  const visibleCases = useMemo(
    () => (category === "All" ? bank.cases : bank.cases.filter((item) => item.category === category)),
    [bank.cases, category],
  );

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

      <div
        className="-mx-1 px-1 mb-6 flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible"
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

      <p className="text-sm text-muted-foreground mb-4">
        Showing {visibleCases.length} of {bank.cases.length} cases
      </p>
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

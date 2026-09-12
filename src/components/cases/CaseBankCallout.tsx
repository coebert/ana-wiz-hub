import { Link } from "react-router-dom";
import { BookOpenCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CaseBank } from "@/data/cases/types";

interface CaseBankCalloutProps {
  bank: CaseBank;
}

export const CaseBankCallout = ({ bank }: CaseBankCalloutProps) => (
  <section className="border-y border-border py-5 mb-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div className="flex items-start gap-3">
      <BookOpenCheck className={`h-6 w-6 shrink-0 mt-0.5 ${bank.accentColor}`} aria-hidden />
      <div>
        <h2 className="font-semibold text-foreground">{bank.title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Work through {bank.cases.length} progressive patient scenarios that apply this section&apos;s topics at the bedside.
        </p>
      </div>
    </div>
    <Button asChild className="shrink-0">
      <Link to={bank.path}>Open case bank</Link>
    </Button>
  </section>
);

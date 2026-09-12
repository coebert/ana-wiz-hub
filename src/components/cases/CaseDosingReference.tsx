import { Link } from "react-router-dom";
import { Pill } from "lucide-react";
import { doseReferencesForCase, drugDoseHref } from "@/lib/caseDoseReferences";
import type { PerioperativeCase } from "@/components/perioperative/ProgressiveCase";

interface CaseDosingReferenceProps {
  caseData: PerioperativeCase;
}

/** Links a case to the doses it needs in the ICU drug dosing table. */
export const CaseDosingReference = ({ caseData }: CaseDosingReferenceProps) => {
  const references = doseReferencesForCase(caseData);
  if (references.length === 0) return null;

  return (
    <aside className="rounded-md border border-border bg-muted/40 p-4">
      <p className="flex items-center gap-2 text-xs font-semibold uppercase text-muted-foreground">
        <Pill className="h-3.5 w-3.5" aria-hidden /> Dosing reference
      </p>
      <ul className="mt-2 space-y-1.5 text-sm">
        {references.map((reference) => (
          <li key={reference.slug} className="leading-relaxed">
            <Link
              to={drugDoseHref(reference)}
              className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
            >
              {reference.drug}
            </Link>{" "}
            <span className="text-muted-foreground">
              — {reference.dose} · {reference.route}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-xs text-muted-foreground">
        Typical adult starting doses from the{" "}
        <Link to="/intensive-care/drug-doses" className="underline underline-offset-4 hover:text-foreground">
          ICU drug dosing table
        </Link>
        . Always check the BNF and local guidelines.
      </p>
    </aside>
  );
};

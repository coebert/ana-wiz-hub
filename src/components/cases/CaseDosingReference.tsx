import { Link } from "react-router-dom";
import { Pill, ShieldCheck } from "lucide-react";
import { doseReferencesForCase, drugDoseHref } from "@/lib/caseDoseReferences";
import { mechanismSlugForDrug } from "@/lib/icuDrugMechanismLinks";
import type { PerioperativeCase } from "@/components/perioperative/ProgressiveCase";

interface CaseDosingReferenceProps {
  caseData: PerioperativeCase;
}

/** Links a case to the doses it needs in the ICU drug dosing table. */
export const CaseDosingReference = ({ caseData }: CaseDosingReferenceProps) => {
  const references = doseReferencesForCase(caseData);
  if (references.length === 0) return null;
  const ageGroup = references[0].ageGroup;
  const ageLabel =
    ageGroup === "neonatal" ? "Neonatal doses" : ageGroup === "paediatric" ? "Paediatric doses" : "Dosing reference";

  return (
    <aside className="rounded-md border border-border bg-muted/40 p-4">
      <p className="flex items-center gap-2 text-xs font-semibold uppercase text-muted-foreground">
        <Pill className="h-3.5 w-3.5" aria-hidden /> {ageLabel}
      </p>
      <ul className="mt-2 space-y-1.5 text-sm">
        {references.map((reference) => {
          const safetySlug = mechanismSlugForDrug(reference.drug);
          return (
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
              {safetySlug ? (
                <span className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <ShieldCheck className="h-3 w-3 shrink-0" aria-hidden />
                  <Link
                    to={`/intensive-care/drug-safety?slug=${safetySlug}#${safetySlug}`}
                    className="underline underline-offset-4 hover:text-foreground"
                  >
                    Safety profile
                  </Link>
                  <span aria-hidden>·</span>
                  <Link
                    to={`/intensive-care/drug-mechanisms?slug=${safetySlug}#${safetySlug}`}
                    className="underline underline-offset-4 hover:text-foreground"
                  >
                    Mechanism &amp; metabolism
                  </Link>
                </span>
              ) : null}
            </li>
          );
        })}
      </ul>
      <p className="mt-2 text-xs text-muted-foreground">
        {ageGroup === "adult"
          ? "Typical adult starting doses from the "
          : ageGroup === "neonatal"
            ? "Weight-based neonatal doses from the "
            : "Weight-based paediatric doses from the "}
        <Link to="/intensive-care/drug-doses" className="underline underline-offset-4 hover:text-foreground">
          ICU drug dosing table
        </Link>
        . Work out infusion rates for this patient's weight with the{" "}
        <Link to="/intensive-care/calculator" className="underline underline-offset-4 hover:text-foreground">
          ICU drug calculator
        </Link>
        .{" "}
        {ageGroup === "adult"
          ? "Always check the BNF and local guidelines."
          : "Always check the BNF for Children and your local PICU or neonatal guideline, and never exceed the adult dose."}
      </p>
    </aside>
  );
};

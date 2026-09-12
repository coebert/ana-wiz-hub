import { Link } from "react-router-dom";
import { Pill } from "lucide-react";
import { Button } from "@/components/ui/button";
import { icuDrugCount } from "@/data/icuDrugDoses";

interface DrugDosesCalloutProps {
  /** Optional focus text, e.g. "sedation and analgesia infusions". */
  focus?: string;
}

export const DrugDosesCallout = ({ focus }: DrugDosesCalloutProps) => (
  <section className="my-6 rounded-xl border border-icu/25 bg-card p-5 shadow-sm sm:flex sm:items-center sm:justify-between sm:gap-4">
    <div className="flex items-start gap-3">
      <Pill className="mt-0.5 h-6 w-6 shrink-0 text-icu" aria-hidden />
      <div>
        <h3 className="font-semibold text-foreground">ICU drug dosing table</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {focus
            ? `Quick reference for ${focus} — dose, route, frequency and key indications for ${icuDrugCount} critical care drugs.`
            : `Dose, route, frequency and key indications for ${icuDrugCount} critical care drugs in one searchable table.`}
        </p>
      </div>
    </div>
    <div className="mt-4 flex shrink-0 flex-col gap-2 sm:mt-0">
      <Button asChild variant="outline">
        <Link to="/intensive-care/drug-doses">Open dosing table</Link>
      </Button>
      <Button asChild variant="outline">
        <Link to="/intensive-care/infusions">ICU infusions guide</Link>
      </Button>
    </div>
  </section>
);

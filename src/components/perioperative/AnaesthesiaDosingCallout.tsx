import { Link } from "react-router-dom";
import { Pill } from "lucide-react";
import { Button } from "@/components/ui/button";
import { anaesthesiaDrugCount } from "@/data/anaesthesiaDrugDoses";

interface AnaesthesiaDosingCalloutProps {
  /** Optional focus text, e.g. "opioids used in anaesthesia". */
  focus?: string;
}

export const AnaesthesiaDosingCallout = ({ focus }: AnaesthesiaDosingCalloutProps) => (
  <section className="my-6 rounded-xl border border-perioperative/25 bg-card p-5 shadow-sm sm:flex sm:items-center sm:justify-between sm:gap-4">
    <div className="flex items-start gap-3">
      <Pill className="mt-0.5 h-6 w-6 shrink-0 text-perioperative" aria-hidden />
      <div>
        <h3 className="font-semibold text-foreground">Anaesthesia drug dosing table</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {focus
            ? `Quick reference for ${focus} — dose, route, frequency and key indications across induction, maintenance, analgesia and reversal.`
            : `Dose, route, frequency and key indications for ${anaesthesiaDrugCount} anaesthetic drugs — induction, maintenance, analgesia and reversal — in one searchable table.`}
        </p>
      </div>
    </div>
    <div className="mt-4 flex shrink-0 flex-col gap-2 sm:mt-0">
      <Button asChild variant="outline">
        <Link to="/perioperative/drug-doses">Open dosing table</Link>
      </Button>
    </div>
  </section>
);

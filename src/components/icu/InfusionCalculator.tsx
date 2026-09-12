import { useMemo, useState } from "react";
import { Calculator } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  formatMlPerHour,
  icuInfusionGroups,
  mlPerHour,
  type Infusion,
} from "@/data/icuInfusions";

const allInfusions: Infusion[] = icuInfusionGroups.flatMap((g) => g.infusions);

const fmtAmount = (micrograms: number, isUnits: boolean) => {
  if (isUnits) return `${Number(micrograms.toFixed(1))} units`;
  if (micrograms >= 1000) return `${Number((micrograms / 1000).toFixed(2))} mg`;
  return `${Number(micrograms.toFixed(1))} micrograms`;
};

interface Props {
  weight: number;
}

const InfusionCalculator = ({ weight }: Props) => {
  const [drugName, setDrugName] = useState(allInfusions[0].drug);
  const infusion = useMemo(
    () => allInfusions.find((i) => i.drug === drugName) ?? allInfusions[0],
    [drugName],
  );
  const [concInput, setConcInput] = useState(String(allInfusions[0].concentrationPerMl));
  const [volInput, setVolInput] = useState("50");
  const [doseInput, setDoseInput] = useState(String(allInfusions[0].startDose));

  const pickDrug = (name: string) => {
    const next = allInfusions.find((i) => i.drug === name);
    setDrugName(name);
    if (next) {
      setConcInput(String(next.concentrationPerMl));
      setDoseInput(String(next.startDose));
    }
  };

  const conc = Number(concInput) > 0 ? Number(concInput) : infusion.concentrationPerMl;
  const volume = Number(volInput) > 0 ? Number(volInput) : 50;
  const dose = Number(doseInput) > 0 ? Number(doseInput) : infusion.startDose;

  const isUnits = infusion.unit.startsWith("units");
  const totalAmount = conc * volume; // micrograms (or units) in the bag/syringe
  const custom: Infusion = { ...infusion, concentrationPerMl: conc };
  const rate = mlPerHour(custom, dose, weight);

  const fieldLabel = "mb-1 block text-xs font-medium text-muted-foreground";

  return (
    <section
      aria-labelledby="infusion-calculator"
      className="mt-6 rounded-lg border border-icu/30 bg-icu/5 p-4 sm:p-5"
    >
      <h2
        id="infusion-calculator"
        className="flex items-center gap-2 text-lg font-semibold tracking-tight"
      >
        <Calculator className="h-5 w-5 text-icu" aria-hidden /> Infusion calculator
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Pick a drug, set your target concentration and final volume to get the
        amount of drug and diluent — then enter a dose to convert it to mL/hour.
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label htmlFor="calc-drug" className={fieldLabel}>Drug</label>
          <select
            id="calc-drug"
            value={drugName}
            onChange={(e) => pickDrug(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            {allInfusions.map((i) => (
              <option key={i.drug} value={i.drug}>{i.drug}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="calc-conc" className={fieldLabel}>
            Desired concentration ({isUnits ? "units" : "micrograms"}/mL)
          </label>
          <Input
            id="calc-conc"
            type="number"
            min={0}
            inputMode="decimal"
            value={concInput}
            onChange={(e) => setConcInput(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="calc-vol" className={fieldLabel}>Final volume (mL)</label>
          <Input
            id="calc-vol"
            type="number"
            min={1}
            inputMode="decimal"
            value={volInput}
            onChange={(e) => setVolInput(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="calc-dose" className={fieldLabel}>
            Target dose ({infusion.unit})
          </label>
          <Input
            id="calc-dose"
            type="number"
            min={0}
            inputMode="decimal"
            value={doseInput}
            onChange={(e) => setDoseInput(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-md border border-border bg-background p-3">
          <p className="text-xs font-medium text-muted-foreground">Drug to add</p>
          <p className="mt-1 text-lg font-semibold">{fmtAmount(totalAmount, isUnits)}</p>
        </div>
        <div className="rounded-md border border-border bg-background p-3">
          <p className="text-xs font-medium text-muted-foreground">Diluent</p>
          <p className="mt-1 text-lg font-semibold">Make up to {volume} mL</p>
          <p className="mt-0.5 text-xs text-muted-foreground">{infusion.diluent}</p>
        </div>
        <div className="rounded-md border border-border bg-background p-3">
          <p className="text-xs font-medium text-muted-foreground">
            Rate at {dose} {infusion.unit}{infusion.perKg ? ` · ${weight} kg` : ""}
          </p>
          <p className="mt-1 text-lg font-semibold">{formatMlPerHour(rate)} mL/h</p>
        </div>
      </div>
    </section>
  );
};

export default InfusionCalculator;

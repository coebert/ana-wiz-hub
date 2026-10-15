import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Plus } from "lucide-react";

// NHS England National Schedule of NHS Costs 2019/20, "CC" sheet: national average unit cost per
// adult critical care bed day by unit function (CCU code) and HRG (XC07Z = 0 organs … XC01Z = 6+).
// Values rounded to the nearest pound; [bed days, £ per day]. null = no row published.
type Row = [number, number] | null;
const ORGANS = ["0", "1", "2", "3", "4", "5", "6 or more"] as const;
const UNITS: { id: string; label: string; costs: Row[] }[] = [
  { id: "CCU01", label: "General adult critical care", costs: [[18641, 1096], [315126, 1303], [220299, 1802], [172156, 2004], [81919, 2172], [24438, 2168], [5797, 2066]] },
  { id: "CCU06", label: "Cardiac surgical", costs: [[2819, 1207], [41261, 1216], [48413, 1520], [51017, 1774], [17774, 2251], [5534, 2880], [1515, 3887]] },
  { id: "CCU07", label: "Thoracic surgical", costs: [[823, 789], [14806, 1190], [11574, 1252], [8190, 1515], [4324, 1985], [1632, 1901], [331, 1906]] },
  { id: "CCU05", label: "Neurosciences", costs: [[2278, 886], [18969, 1330], [16660, 1375], [21309, 2022], [9011, 1833], [1454, 1945], [98, 2032]] },
  { id: "CCU11", label: "Liver", costs: [[115, 1065], [1675, 1323], [1308, 1422], [1056, 1866], [1057, 1998], [1392, 2137], [1773, 1967]] },
  { id: "CCU12", label: "Obstetric and gynaecology", costs: [[3501, 1399], [4164, 3040], [127, 2675], [191, 2549], [11, 2729], [14, 2388], null] },
  { id: "CCU08", label: "Burns and plastic surgery", costs: [[164, 934], [4577, 976], [1678, 1563], [707, 2927], [649, 3964], [312, 4328], null] },
  { id: "CCU02", label: "Surgical (unspecified)", costs: [[2489, 1214], [41392, 1266], [12475, 1635], [5292, 2065], [2598, 2430], [689, 2270], [47, 2212]] },
  { id: "CCU03", label: "Medical (unspecified)", costs: [[2448, 911], [48144, 913], [14732, 1751], [9971, 1948], [5770, 2088], [1731, 2263], [224, 2269]] },
  { id: "CCU09", label: "Spinal", costs: [[134, 914], [3849, 1026], [1445, 1426], [273, 1194], [8, 2168], null, null] },
  { id: "CCU10", label: "Renal", costs: [[599, 733], [2501, 1298], [1306, 1176], [342, 1532], [226, 1558], [83, 1726], null] },
];
const SMALL = 100;
const gbp = (n: number) => "£" + Math.round(n).toLocaleString("en-GB");

interface Period { organs: number; days: string }

export function IcuCostCalculator() {
  const [unitId, setUnitId] = useState("CCU01");
  const [periods, setPeriods] = useState<Period[]>([{ organs: 2, days: "3" }]);
  const unit = UNITS.find((u) => u.id === unitId)!;
  const update = (i: number, p: Partial<Period>) => setPeriods((ps) => ps.map((x, j) => (j === i ? { ...x, ...p } : x)));

  const lines = periods.map((p) => {
    const days = Math.max(0, Math.min(365, Number(p.days) || 0));
    const row = unit.costs[p.organs];
    return { days, row, subtotal: row ? row[1] * days : 0 };
  });
  const missing = lines.some((l) => l.days > 0 && !l.row);
  const small = lines.some((l) => l.row && l.days > 0 && l.row[0] < SMALL);
  const totalDays = lines.reduce((a, l) => a + l.days, 0);
  const total = lines.reduce((a, l) => a + l.subtotal, 0);

  return (
    <div className="rounded-lg border border-border bg-card p-4 space-y-4" aria-label="ICU cost calculator">
      <div className="space-y-1">
        <Label htmlFor="icu-unit">Unit type</Label>
        <Select value={unitId} onValueChange={setUnitId}>
          <SelectTrigger id="icu-unit"><SelectValue /></SelectTrigger>
          <SelectContent>{UNITS.map((u) => <SelectItem key={u.id} value={u.id}>{u.label}</SelectItem>)}</SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Periods of the stay</p>
        {periods.map((p, i) => (
          <div key={i} className="grid grid-cols-[1fr_6rem_auto] gap-2 items-end">
            <div className="space-y-1">
              <Label htmlFor={`org-${i}`} className="text-xs">Organs supported per day</Label>
              <Select value={String(p.organs)} onValueChange={(v) => update(i, { organs: Number(v) })}>
                <SelectTrigger id={`org-${i}`}><SelectValue /></SelectTrigger>
                <SelectContent>{ORGANS.map((o, k) => <SelectItem key={o} value={String(k)}>{o}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label htmlFor={`days-${i}`} className="text-xs">Days</Label>
              <Input id={`days-${i}`} type="number" min={0} max={365} value={p.days} onChange={(e) => update(i, { days: e.target.value })} />
            </div>
            <Button variant="ghost" size="icon" aria-label="Remove period" disabled={periods.length === 1} onClick={() => setPeriods((ps) => ps.filter((_, j) => j !== i))}><Trash2 className="h-4 w-4" /></Button>
            <p className="col-span-3 text-xs text-muted-foreground">
              {lines[i].row ? `${gbp(lines[i].row![1])} per day × ${lines[i].days} = ${gbp(lines[i].subtotal)} (${lines[i].row![0].toLocaleString("en-GB")} bed days in the national data)` : "No national cost row is published for this combination — excluded from the total."}
            </p>
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={() => setPeriods((ps) => [...ps, { organs: 1, days: "1" }])}><Plus className="h-4 w-4 mr-1" />Add period</Button>
      </div>

      <div className="rounded-md bg-muted p-3">
        <p className="text-sm text-muted-foreground">Estimated total, {totalDays} day{totalDays === 1 ? "" : "s"} · {unit.label}</p>
        <p className="text-2xl font-semibold">{gbp(total)}</p>
        {missing && <p className="text-xs text-destructive mt-1">Total is incomplete: some periods have no published cost.</p>}
        {small && <p className="text-xs text-muted-foreground mt-1">Some rates rest on fewer than {SMALL} national bed days, so a single trust's accounting may dominate them.</p>}
      </div>

      <p className="text-xs text-muted-foreground">
        Arithmetic only, using NHS England's National Schedule of NHS Costs 2019/20 (adult critical care, national average cost per bed day by unit function and organs supported; rounded to the nearest pound). These are trust-reported costs, not tariffs or prices paid, not inflation-adjusted, and exclude the ward part of the hospital stay. It is a teaching estimate, not a bill or a prediction for any patient.
      </p>
    </div>
  );
}

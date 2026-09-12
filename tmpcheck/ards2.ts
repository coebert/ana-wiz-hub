import { icuCaseBank } from "@/data/cases/icuCases";
import { doseReferencesForCase } from "@/lib/caseDoseReferences";
import { mechanismSlugForDrug } from "@/lib/icuDrugMechanismLinks";
import { icuDrugWithdrawal } from "@/data/icuDrugWithdrawal";
const cases = icuCaseBank.cases.filter((c: any) => /ards|proning|prone/i.test(c.title + c.category + c.presentation));
for (const c of cases) {
  console.log("==", c.id, c.title);
  for (const r of doseReferencesForCase(c)) {
    const s = mechanismSlugForDrug(r.drug);
    const w: any = (icuDrugWithdrawal as any)[s as string];
    console.log(`  ${r.drug} -> ${s} | withdrawal: ${w ? "taper=" + w.taper.length : "MISSING"} | dose=${r.dose}`);
  }
}

import { icuCaseBank } from "@/data/cases/icuCases";
import { doseReferencesForCase } from "@/lib/caseDoseReferences";
import { mechanismSlugForDrug } from "@/lib/icuDrugMechanismLinks";
import { icuDrugWithdrawal } from "@/data/icuDrugWithdrawal";
const cases = icuCaseBank.filter(c => /ards/i.test(c.title + c.category + c.presentation));
for (const c of cases) {
  console.log("==", c.id, c.title);
  for (const r of doseReferencesForCase(c)) {
    const s = mechanismSlugForDrug(r.drug);
    const w = icuDrugWithdrawal.find((x:any)=>x.slug===s);
    console.log(` ${r.drug} -> ${s} | withdrawal:${w? "yes taper="+w.taper.length : "MISSING"} | dose=${r.dose}`);
  }
}

import { icuCases } from "../src/data/cases/icuCases";
import { doseReferencesForCase } from "../src/lib/caseDoseReferences";
import { mechanismSlugForDrug } from "../src/lib/icuDrugMechanismLinks";
for (const c of icuCases) {
  if (!/ards|respiratory distress/i.test(c.title)) continue;
  const refs = doseReferencesForCase(c);
  console.log("##", c.title, refs.length);
  for (const r of refs) console.log("   ", r.drug, "| mech:", mechanismSlugForDrug(r.drug) || "NONE");
}

import { icuCaseBank } from "../src/data/cases/icuCases";
const c = icuCaseBank.cases.find(x => /Refractory hypoxaemia in ARDS/.test(x.title))!;
const c2 = icuCaseBank.cases.find(x => /paediatric ARDS/.test(x.title))!;
for (const cc of [c, c2]) {
  const t = JSON.stringify(cc).toLowerCase();
  console.log("###", cc.title);
  for (const d of ["cisatracurium","atracurium","rocuronium","propofol","noradrenaline","fentanyl","midazolam","dexmedetomidine","morphine","alfentanil","furosemide","nitric","milrinone","adrenaline","hydrocortisone","dexamethasone","ketamine","vecuronium","clonidine","salbutamol"]) if (t.includes(d)) console.log("  mentions", d);
}

import { icuCaseBank } from "../src/data/cases/icuCases";
const c = icuCaseBank.cases.find(x => /Refractory hypoxaemia in ARDS/.test(x.title))!;
console.log(Object.keys(c));
console.log(JSON.stringify(c).slice(0, 1200));

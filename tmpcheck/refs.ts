import { topicReferences } from "@/data/references";
const want: Record<string,string[]> = {
  "plastic-surgery": ["BAPRAS 2020","BJA Educ 2021","Curr Opin Anaesthesiol 2019"],
  "burns-plastics": ["BBA EMSB","BJA Educ 2019","Bittner 2015"],
  "hepatobiliary-transplant": ["AAGBI Cirrhosis 2017","BJA Educ LT 2010"],
  "procedural-sedation": ["AAGBI/RCoA 2021","World SIVA AE 2012"],
  "elderly-anaesthesia": ["AAGBI Elderly 2014","BJA 2010 Ageing CVS"],
};
for (const [topic, labels] of Object.entries(want)) {
  const list = (topicReferences as any)[topic] || [];
  for (const l of labels) {
    const r = list.find((x: any) => x.label === l);
    console.log(JSON.stringify({ topic, label: l, citation: r?.citation, url: r?.url }));
  }
}

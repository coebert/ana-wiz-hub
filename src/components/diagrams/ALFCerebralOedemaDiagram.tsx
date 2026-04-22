import { MechanismCascadeDiagram, CascadeStep } from "./MechanismCascadeDiagram";

const steps: CascadeStep[] = [
  {
    node: "Hepatocyte necrosis",
    detail: "Massive parenchymal loss",
    title: "Loss of metabolic capacity",
    body:
      "Acute liver failure (paracetamol, viral, ischaemic, autoimmune) destroys hepatocytes. Functional hepatic mass falls below the threshold needed for urea synthesis, gluconeogenesis and detoxification. Onset of encephalopathy within 8 weeks of jaundice (in a previously healthy liver) defines ALF.",
  },
  {
    node: "Failed urea cycle",
    detail: "Ornithine cycle ↓",
    title: "Ammonia accumulates",
    body:
      "The hepatic urea cycle (carbamoyl phosphate synthetase-1 → ornithine transcarbamylase → arginase) normally clears ammonia from portal blood. With hepatocyte loss, NH₃ bypasses conversion and arterial ammonia rises. Levels > 150 µmol/L predict cerebral oedema; > 200 µmol/L predict herniation.",
  },
  {
    node: "Hyperammonaemia",
    detail: "Crosses BBB freely",
    title: "Ammonia enters the brain",
    body:
      "Unionised NH₃ diffuses across the blood–brain barrier down its concentration gradient. The brain has no urea cycle; the only detoxification route is amidation of glutamate to glutamine by glutamine synthetase, which is concentrated in astrocytes.",
  },
  {
    node: "Astrocyte glutamine",
    detail: "Osmotic load ↑",
    title: "Osmotic swelling",
    body:
      "Glutamine accumulates inside astrocytes — an osmotically active solute that draws water in (the 'Trojan-horse' hypothesis). Astrocytes swell (Alzheimer type-II change). Mitochondrial permeability transition adds oxidative stress, depleting ATP and impairing the Na⁺/K⁺ ATPase.",
  },
  {
    node: "Cerebral oedema",
    detail: "Cytotoxic + vasogenic",
    title: "Diffuse brain swelling",
    body:
      "Astrocyte swelling is cytotoxic oedema (no MRI contrast leak). Loss of cerebral autoregulation and inflammatory cytokines add a vasogenic component. Brain parenchymal volume rises within a rigid skull → ICP increases.",
  },
  {
    node: "↑ ICP",
    detail: "Plateau waves",
    title: "Intracranial hypertension",
    body:
      "Sustained ICP > 20 mmHg compromises CPP (CPP = MAP − ICP). Plateau waves (Lundberg A) signal exhausted compliance. Clinical features: hypertension, bradycardia, abnormal pupils, posturing. Treat with osmotherapy (3% saline, mannitol), hyperventilation to PaCO₂ 4–4.5 kPa, sedation, head-up 30°.",
  },
  {
    node: "Herniation",
    detail: "Uncal / tonsillar",
    title: "Brainstem compression",
    body:
      "Without rapid intervention (and ultimately liver transplantation) brainstem compression follows — uncal herniation through the tentorium or tonsillar herniation through foramen magnum. King's College Criteria identify patients needing super-urgent transplant listing before this point.",
  },
];

export const ALFCerebralOedemaDiagram = () => (
  <MechanismCascadeDiagram
    title="Acute Liver Failure — Ammonia to Cerebral Oedema"
    subtitle="The pathway from hepatic necrosis to herniation."
    accent="icu"
    steps={steps}
  />
);

export default ALFCerebralOedemaDiagram;

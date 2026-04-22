import { MechanismCascadeDiagram, CascadeStep, CascadeSource } from "./MechanismCascadeDiagram";

const EASL: CascadeSource = {
  label: "EASL 2017",
  citation:
    "Wendon J, Cordoba J, Dhawan A et al. EASL Clinical Practical Guidelines on the management of acute (fulminant) liver failure. J Hepatol. 2017;66:1047–81.",
  url: "https://doi.org/10.1016/j.jhep.2016.12.003",
};

const BJA_ALF: CascadeSource = {
  label: "BJA Educ 2018",
  citation:
    "Wong A, Karunaratne D, Auzinger G. Acute liver failure: A practical update. BJA Education. 2019;19(1):11–17.",
  url: "https://doi.org/10.1016/j.bjae.2018.10.001",
};

const KINGS: CascadeSource = {
  label: "King's Criteria",
  citation:
    "O'Grady JG, Alexander GJ, Hayllar KM, Williams R. Early indicators of prognosis in fulminant hepatic failure. Gastroenterology. 1989;97:439–45.",
  url: "https://doi.org/10.1016/0016-5085(89)90081-4",
};

const AMMONIA_OUTCOME: CascadeSource = {
  label: "Bernal 2007",
  citation:
    "Bernal W, Hall C, Karvellas CJ et al. Arterial ammonia and clinical risk factors for encephalopathy and intracranial hypertension in acute liver failure. Hepatology. 2007;46:1844–52.",
  url: "https://doi.org/10.1002/hep.21838",
};

const TROJAN_HORSE: CascadeSource = {
  label: "Albrecht 2006",
  citation:
    "Albrecht J, Norenberg MD. Glutamine: a Trojan horse in ammonia neurotoxicity. Hepatology. 2006;44:788–94.",
  url: "https://doi.org/10.1002/hep.21357",
};

const AASLD: CascadeSource = {
  label: "AASLD 2011",
  citation:
    "Lee WM, Stravitz RT, Larson AM. AASLD Position Paper: The management of acute liver failure: Update 2011. Hepatology. 2012;55:965–7.",
  url: "https://doi.org/10.1002/hep.25551",
};

const steps: CascadeStep[] = [
  {
    node: "Hepatocyte necrosis",
    detail: "Massive parenchymal loss",
    title: "Loss of metabolic capacity",
    body:
      "Acute liver failure (paracetamol, viral, ischaemic, autoimmune) destroys hepatocytes. Functional hepatic mass falls below the threshold needed for urea synthesis, gluconeogenesis and detoxification. Onset of encephalopathy within 8 weeks of jaundice (in a previously healthy liver) defines ALF.",
    sources: [BJA_ALF, EASL],
  },
  {
    node: "Failed urea cycle",
    detail: "Ornithine cycle ↓",
    title: "Ammonia accumulates",
    body:
      "The hepatic urea cycle (carbamoyl phosphate synthetase-1 → ornithine transcarbamylase → arginase) normally clears ammonia from portal blood. With hepatocyte loss, NH₃ bypasses conversion and arterial ammonia rises. Levels > 150 µmol/L predict cerebral oedema; > 200 µmol/L predict herniation.",
    sources: [AMMONIA_OUTCOME, BJA_ALF],
  },
  {
    node: "Hyperammonaemia",
    detail: "Crosses BBB freely",
    title: "Ammonia enters the brain",
    body:
      "Unionised NH₃ diffuses across the blood–brain barrier down its concentration gradient. The brain has no urea cycle; the only detoxification route is amidation of glutamate to glutamine by glutamine synthetase, which is concentrated in astrocytes.",
    sources: [TROJAN_HORSE],
  },
  {
    node: "Astrocyte glutamine",
    detail: "Osmotic load ↑",
    title: "Osmotic swelling",
    body:
      "Glutamine accumulates inside astrocytes — an osmotically active solute that draws water in (the 'Trojan-horse' hypothesis). Astrocytes swell (Alzheimer type-II change). Mitochondrial permeability transition adds oxidative stress, depleting ATP and impairing the Na⁺/K⁺ ATPase.",
    sources: [TROJAN_HORSE],
  },
  {
    node: "Cerebral oedema",
    detail: "Cytotoxic + vasogenic",
    title: "Diffuse brain swelling",
    body:
      "Astrocyte swelling is cytotoxic oedema (no MRI contrast leak). Loss of cerebral autoregulation and inflammatory cytokines add a vasogenic component. Brain parenchymal volume rises within a rigid skull → ICP increases.",
    sources: [BJA_ALF, AMMONIA_OUTCOME],
  },
  {
    node: "↑ ICP",
    detail: "Plateau waves",
    title: "Intracranial hypertension",
    body:
      "Sustained ICP > 20 mmHg compromises CPP (CPP = MAP − ICP). Plateau waves (Lundberg A) signal exhausted compliance. Clinical features: hypertension, bradycardia, abnormal pupils, posturing. Treat with osmotherapy (3% saline, mannitol), hyperventilation to PaCO₂ 4–4.5 kPa, sedation, head-up 30°.",
    sources: [AASLD, BJA_ALF],
  },
  {
    node: "Herniation",
    detail: "Uncal / tonsillar",
    title: "Brainstem compression",
    body:
      "Without rapid intervention (and ultimately liver transplantation) brainstem compression follows — uncal herniation through the tentorium or tonsillar herniation through foramen magnum. King's College Criteria identify patients needing super-urgent transplant listing before this point.",
    sources: [KINGS, EASL],
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

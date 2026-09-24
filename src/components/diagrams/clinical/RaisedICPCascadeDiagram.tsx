import { MechanismCascadeDiagram, CascadeStep, CascadeSource } from "@/components/diagrams/shared/MechanismCascadeDiagram";
import { DiagramFigure } from "../_shared/DiagramFigure";

const BJA15: CascadeSource = {
  label: "BJA Educ 2015",
  citation:
    "Dinsmore J. Anaesthesia for elective neurosurgery. BJA Education. 2015;15(1):15-21 — ICP physiology, CPP targets, herniation syndromes.",
  url: "https://doi.org/10.1093/bjaceaccp/mku002",
};

const BTF: CascadeSource = {
  label: "BTF 2016",
  citation:
    "Carney N et al. Guidelines for the Management of Severe Traumatic Brain Injury, 4th edition. Brain Trauma Foundation. Neurosurgery. 2017;80(1):6-15.",
  url: "https://doi.org/10.1227/NEU.0000000000001432",
};

const NICE: CascadeSource = {
  label: "NICE NG232",
  citation:
    "NICE Guideline NG232 — Head injury: assessment and early management (2023).",
  url: "https://www.nice.org.uk/guidance/ng232",
};

const steps: CascadeStep[] = [
  {
    node: "Insult",
    detail: "Mass / haemorrhage / oedema",
    title: "An additional intracranial volume is introduced",
    body:
      "Trauma, tumour, intracerebral haemorrhage, abscess or hydrocephalus add to the fixed cranial volume. The Monro-Kellie doctrine: brain (~80 %) + blood (~10 %) + CSF (~10 %) within a rigid skull — adding any compartment requires another to shrink.",
    sources: [BJA15],
  },
  {
    node: "Compensation",
    detail: "CSF + venous shift",
    title: "Spatial buffering by CSF and venous blood",
    body:
      "CSF translocates to the spinal subarachnoid space; cerebral venous blood is squeezed into the jugular system. ICP stays near baseline (~7-15 mmHg) on the flat part of the pressure-volume curve. Compliance is high — small volume changes produce only small pressure rises.",
    sources: [BJA15],
  },
  {
    node: "Decompensation",
    detail: "ICP > 22 mmHg",
    title: "Buffer exhausted, steep rise begins",
    body:
      "Once CSF and venous reserves are gone the curve becomes near-vertical. Small added volume now causes large ICP rise. The 22 mmHg threshold (BTF) and sustained spikes >20 mmHg for >5 min predict outcome and trigger tier-1 therapies (head-up 30°, sedation, osmotherapy, normocapnia, normothermia).",
    sources: [BTF, BJA15],
  },
  {
    node: "↓ CPP",
    detail: "CPP = MAP − ICP",
    title: "Cerebral perfusion pressure falls",
    body:
      "As ICP climbs and MAP fails to keep pace, CPP falls below the autoregulation lower limit (~50-60 mmHg in adults). Pressure-passive flow develops — cerebral blood flow tracks MAP linearly. Target CPP 60-70 mmHg in TBI; lower causes ischaemia, higher risks ARDS from forced perfusion.",
    sources: [BTF, NICE],
  },
  {
    node: "Ischaemia",
    detail: "Secondary brain injury",
    title: "Hypoxic-ischaemic injury propagates damage",
    body:
      "Failed ATP supply → Na⁺/K⁺-ATPase failure → cytotoxic oedema, glutamate release, calcium influx, free-radical generation. The penumbra around the primary lesion enlarges. Hypoxia, hypotension, hypercapnia, hyperthermia and hyperglycaemia all worsen secondary injury — the targets of ICU neuroprotection.",
    sources: [NICE, BJA15],
  },
  {
    node: "Herniation",
    detail: "Uncal / tonsillar / subfalcine",
    title: "Brain shifts across rigid dural barriers",
    body:
      "Sustained pressure gradients force brain across the falx (subfalcine), through the tentorial notch (uncal — CN III palsy, ipsilateral fixed dilated pupil) or through the foramen magnum (tonsillar — Cushing's triad: hypertension, bradycardia, irregular respiration; brainstem death follows). Surgical decompression is the only definitive rescue once medical tier-3 therapy fails.",
    sources: [BJA15, BTF],
  },
];

export const RaisedICPCascadeDiagram = () => (
    <DiagramFigure
      id="raised-icp-cascade-diagram"
      title="Raised ICP cascade"
      description="Raised ICP cascade: labelled teaching figure showing the structures, relationships and key values FRCA and FFICM candidates need to recognise and explain for this topic."
    >
            <MechanismCascadeDiagram
      title="Raised ICP — Monro-Kellie cascade"
      subtitle="From insult through decompensation to herniation — and where each therapy interrupts the loop."
      accent="clinical"
      steps={steps}
    />
    </DiagramFigure>
  );

export default RaisedICPCascadeDiagram;

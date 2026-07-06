import { MechanismCascadeDiagram, CascadeStep, CascadeSource } from "@/components/diagrams/shared/MechanismCascadeDiagram";
import { DiagramFigure } from "./_shared/DiagramFigure";

// ---------- Sources ----------
const EVERED_2018: CascadeSource = {
  label: "Evered Nomenclature 2018",
  citation:
    "Evered L et al. Recommendations for the nomenclature of cognitive change associated with anaesthesia and surgery — 2018. Br J Anaesth. 2018;121(5):1005-1012.",
  url: "https://doi.org/10.1016/j.bja.2017.11.087",
};

const ISPOCD1: CascadeSource = {
  label: "ISPOCD1 1998",
  citation:
    "Moller JT et al. Long-term postoperative cognitive dysfunction in the elderly: ISPOCD1 study. Lancet. 1998;351:857-861.",
  url: "https://doi.org/10.1016/S0140-6736(97)07382-0",
};

const ASA_BRAIN: CascadeSource = {
  label: "ASA Brain Health 2018",
  citation:
    "Berger M et al. Best practices for postoperative brain health: ASA Brain Health Initiative Summit. Anesth Analg. 2018;127(6):1406-1413.",
  url: "https://doi.org/10.1213/ANE.0000000000003841",
};

const INOUYE_2014: CascadeSource = {
  label: "Lancet Delirium 2014",
  citation:
    "Inouye SK et al. Delirium in elderly people. Lancet. 2014;383:911-922.",
  url: "https://doi.org/10.1016/S0140-6736(13)60688-1",
};

const ESAIC_POD: CascadeSource = {
  label: "ESAIC POD 2017",
  citation:
    "Aldecoa C et al. European Society of Anaesthesiology evidence-based and consensus-based guideline on postoperative delirium. Eur J Anaesthesiol. 2017;34(4):192-214.",
  url: "https://doi.org/10.1097/EJA.0000000000000594",
};

// ---------- Cascade steps ----------
const steps: CascadeStep[] = [
  {
    node: "Surgical insult",
    detail: "Tissue trauma releases DAMPs",
    title: "Surgical trauma → DAMP release",
    body:
      "Tissue injury at the surgical site releases damage-associated molecular patterns (DAMPs) — HMGB1, S100 proteins, mitochondrial DNA, heat-shock proteins — into the circulation. These endogenous alarmins ligate pattern-recognition receptors (TLR2/4, RAGE) on circulating monocytes and tissue macrophages, triggering systemic release of IL-1β, IL-6 and TNF-α. The intensity of this acute-phase response scales with the magnitude and duration of surgery: cardiac and major orthopaedic/vascular surgery generate the largest signal, which correlates with subsequent POCD incidence.",
    sources: [ASA_BRAIN, EVERED_2018],
  },
  {
    node: "BBB disruption",
    detail: "Cytokines breach tight junctions",
    title: "Blood–brain barrier becomes permeable",
    body:
      "Circulating IL-1β, IL-6, TNF-α and activated complement act on cerebral endothelium to downregulate tight-junction proteins (claudin-5, occludin, ZO-1) and shed the endothelial glycocalyx. The BBB becomes patchily permeable, allowing peripheral cytokines, complement fragments and monocytes to enter the CNS — particularly in the hippocampus and prefrontal cortex, regions already vulnerable in the ageing brain due to reduced cerebrovascular reserve and pre-existing endothelial dysfunction.",
    sources: [ASA_BRAIN, EVERED_2018],
  },
  {
    node: "Microglial priming",
    detail: "Sustained neuroinflammation",
    title: "Microglia become primed and activated",
    body:
      "Aged microglia exist in a 'primed' state with exaggerated, prolonged responses to a second hit. Peripheral inflammatory signals trigger an M1-skewed neuroinflammatory phenotype: sustained release of IL-1β, TNF-α, reactive oxygen species and nitric oxide within the CNS. This impairs hippocampal long-term potentiation (LTP) — the synaptic substrate of memory — disrupts synaptic pruning, and damages oligodendrocytes and white-matter integrity. Animal models show microglial activation persists for weeks after a single surgical episode in aged subjects.",
    sources: [ASA_BRAIN, EVERED_2018, ESAIC_POD],
  },
  {
    node: "Cholinergic deficit",
    detail: "↓ ACh + anticholinergic load",
    title: "Cholinergic and other neurotransmitter failure",
    body:
      "Neuroinflammation inhibits the basal forebrain cholinergic system (nucleus basalis of Meynert) and reduces acetylcholine availability in cortex and hippocampus — the 'cholinergic deficit hypothesis' of delirium and POCD. Perioperative anticholinergic drug burden (atropine, hyoscine, antihistamines, tricyclics) compounds this directly. Parallel disturbances in dopaminergic, serotonergic and GABAergic transmission, together with disrupted melatonin/sleep architecture, contribute to fluctuating attention, working-memory failure and impaired executive function.",
    sources: [INOUYE_2014, ESAIC_POD, ASA_BRAIN],
  },
  {
    node: "Synaptic dysfunction",
    detail: "Aβ, tau, oxidative stress",
    title: "Synaptic and mitochondrial injury",
    body:
      "Sustained neuroinflammation accelerates amyloid-β oligomerisation and tau hyperphosphorylation in vulnerable neurons (animal data; human evidence associative). Mitochondrial dysfunction and oxidative stress impair ATP supply in aged neurons with reduced reserve. The result is dendritic-spine loss, reduced synaptic density and impaired plasticity — the structural correlate of measurable cognitive decline. A second perioperative hit (re-operation, post-op sepsis, hypotension) amplifies the lesion.",
    sources: [EVERED_2018, ASA_BRAIN],
  },
  {
    node: "Cognitive decline",
    detail: "Delirium → POCD spectrum",
    title: "Clinical phenotype: delirium and POCD",
    body:
      "The clinical expression spans an acute–chronic spectrum: postoperative delirium (hours–days, fluctuating attention) → delayed neurocognitive recovery (≤30 days) → mild or major postoperative neurocognitive disorder (30 days–12 months) per the 2018 DSM-5-aligned nomenclature. ISPOCD1 found POCD in ~25% at 1 week and ~10% at 3 months after major non-cardiac surgery in patients >60 y. POCD is independently associated with loss of independence, premature retirement and increased 1-year mortality.",
    sources: [EVERED_2018, ISPOCD1, INOUYE_2014],
  },
  {
    node: "Mitigation",
    detail: "Pre / intra / post bundle",
    title: "Where the cascade is interruptible",
    body:
      "Pre-op: baseline MoCA, Comprehensive Geriatric Assessment, prehabilitation, treat anaemia, STOPP/START review (stop benzodiazepines and anticholinergics), patient/family counselling. Intra-op: processed-EEG depth monitoring to avoid burst-suppression, MAP within 10–20% of baseline, normoxia/normocapnia/normothermia/normoglycaemia, regional or neuraxial where feasible, short-acting agents, avoid pethidine and atropine (prefer glycopyrrolate). Post-op: HELP-style multicomponent bundle (orientation, glasses/hearing aids, early mobilisation, sleep hygiene, hydration, nutrition), multimodal opioid-sparing analgesia, daily 4AT/CAM screen, prompt treatment of pain, hypoxia, sepsis, electrolytes, retention and constipation.",
    sources: [ASA_BRAIN, ESAIC_POD, INOUYE_2014],
  },
];

export const POCDPathophysiologyCascadeDiagram = () => (
  <DiagramFigure
    id="pocd-pathophysiology-cascade-diagram"
    title="POCD pathophysiology cascade"
    description="Animated cascade showing how surgical DAMPs drive blood–brain barrier disruption, microglial priming, cholinergic deficit and synaptic injury — producing the delirium–POCD clinical spectrum and the points where the perioperative bundle interrupts it."
  >
    <MechanismCascadeDiagram
      title="POCD Pathophysiology — Surgical Insult to Cognitive Decline"
      subtitle="DAMPs → BBB disruption → microglial priming → cholinergic deficit → synaptic injury → delirium/POCD."
      accent="clinical"
      steps={steps}
    />
  </DiagramFigure>
);

export default POCDPathophysiologyCascadeDiagram;

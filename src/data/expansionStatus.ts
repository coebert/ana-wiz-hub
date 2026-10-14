/**
 * Curriculum expansion tracking.
 *
 * "Expanded" means a checked, source-led teaching batch has been added to the
 * topic (mechanisms, clinical interpretation, evidence limits, learning
 * checks, curated references). It does NOT certify every claim in the topic.
 *
 * Keep this file in sync with curriculum-expansion.md and roadmap.md — update
 * it whenever a batch is completed or a new priority is identified.
 */
import type { Section } from "./curriculum";

export type ExpansionStatus = "expanded" | "in-progress" | "pending";

export interface ExpansionEntry {
  status: ExpansionStatus;
  /** What has actually been added, or what is outstanding. */
  note: string;
}

/** Section-level default status, used for topics without a topic-level entry. */
export const SECTION_EXPANSION: Record<Section, ExpansionEntry> = {
  physics: {
    status: "in-progress",
    note: "Six-subsection batch checked (Joule–Thomson, transformers, Doppler, arterial dynamic response, flow/heliox, temperature errors). Other physics subsections still need individual review.",
  },
  physiology: {
    status: "in-progress",
    note: "Renal, hepatic and fetal batches checked. Remaining physiology subsections still need individual review.",
  },
  pharmacology: {
    status: "pending",
    note: "Differential blockade batch started (local anaesthetics). Meyer–Overton evidence added (volatile agents). Antimicrobials (antibiotics, antifungals, antivirals, antimalarials, antiseptics, resistance) expanded; toxicology paracetamol and IV anaesthetics PRIS batches added; each lesson lists its sources. Remaining pharmacology subsections need individual review.",
  },
  anatomy: {
    status: "pending",
    note: "Diagram sourcing and citation work completed separately; subsection-depth review not yet done. Candidates: ankle nerves, pelvic autonomics, chest-wall block planes.",
  },
  clinical: {
    status: "pending",
    note: "First batch checked (ENT, paediatrics, renal transplant, bariatric, colorectal). Remaining surgery-specific subsections not yet reviewed.",
  },
  "intensive-care": {
    status: "pending",
    note: "APRV lesson checked. Other ICU subsections not yet reviewed; candidates: innate immunity, endocrine crises.",
  },
  perioperative: {
    status: "pending",
    note: "First batch checked. Remaining topics not yet reviewed; candidates: frailty assessment, complex needs, disease-specific decisions.",
  },
  chemistry: {
    status: "pending",
    note: "Not yet reviewed. Candidates: metallic bonding, redox chemistry.",
  },
};

/** Topic-level overrides for topics with a completed expansion batch. */
export const TOPIC_EXPANSION: Record<string, ExpansionEntry> = {
  "iv-anaesthetics": {
    status: "in-progress",
    note: "Propofol infusion syndrome lesson added (Hemphill 2019 case analysis: child vs adult phenotype, mortality markers, dose relationship, recognition and haemofiltration). Other subsections still need review.",
  },
  toxicology: {
    status: "in-progress",
    note: "Paracetamol poisoning subsection added (NAPQI mechanism, 2012 UK treatment line, SNAP 2014 regimen evidence, anaphylactoid reactions, learning checks). Other toxicology subsections still need review.",
  },
  "antimicrobials-pharm": {
    status: "expanded",
    note: "Antibiotics (critical-illness exposure, DALI, loading doses, TDM, stewardship), antifungals (candidaemia sequencing per IDSA 2016 and Reboli 2007) antivirals (selectivity and trial interpretation), antimalarials (SEAQUAMAT/AQUAMAT) and antiseptics (Darouiche 2010, CLEAN 2015, NAP6 chlorhexidine allergy) and resistance (GBD 2022 burden, MDR/XDR definitions, spread, selection) lessons added with learning checks.",
  },
  "volatile-agents": {
    status: "in-progress",
    note: "Meyer–Overton evidence lesson added (luciferase, isoflurane isomers, non-immobilisers, modern target/pathway view, learning checks). Other subsections still need review.",
  },
  "local-anaesthetics": {
    status: "in-progress",
    note: "Differential blockade lesson added (size-principle limits from Fink 1984 and Gokin 2001, bedside testing, evidence limits, learning checks). Other subsections still need review.",
  },
  // --- Physics batch ---
  "si-units-thermodynamics": {
    status: "expanded",
    note: "Joule–Thomson effect and process boundaries added, with sources and a calculated example.",
  },
  "electricity-magnetism": {
    status: "expanded",
    note: "Transformers and the limits of isolation added.",
  },
  "ultrasound-physics": {
    status: "expanded",
    note: "Doppler spectral interpretation expanded.",
  },
  "clinical-measurement": {
    status: "expanded",
    note: "Arterial dynamic response (natural frequency, damping) expanded.",
  },
  "flow-measurement": {
    status: "expanded",
    note: "Flow-regime assumptions and heliox expanded.",
  },
  "temperature-measurement": {
    status: "expanded",
    note: "Temperature sensor/site error sources expanded.",
  },
  // --- Physiology batch ---
  "renal-physiology": {
    status: "expanded",
    note: "Net acid accounting, distal transport, ammonium adaptation and urine-pH interpretation added.",
  },
  "hepatic-physiology": {
    status: "expanded",
    note: "Hepatic gradients, ammonia scavenging and model limits added.",
  },
  "foetal-circulation": {
    status: "expanded",
    note: "Preload/afterload handover, experimental evidence limits; placental transfer and pulmonary flow/resistance corrections.",
  },
  // --- Earlier completed batches ---
  "mechanical-ventilation": {
    status: "expanded",
    note: "Shared APRV lesson: physiology, settings, monitoring, troubleshooting and evidence-based cautions.",
  },
  "ent-anaesthesia": {
    status: "expanded",
    note: "Laryngectomy emergency pathway added.",
  },
  "paediatric-anaesthesia": {
    status: "expanded",
    note: "URTI decisions and fluid prescribing added.",
  },
  "paediatric-core": {
    status: "expanded",
    note: "Paediatric URTI and maintenance/resuscitation fluid decisions added.",
  },
  "renal-disease": {
    status: "expanded",
    note: "Established renal-transplant perioperative care added.",
  },
  "general-colorectal-surgery": {
    status: "expanded",
    note: "Assessment and AP-resection phases added.",
  },
  "bariatric-anaesthesia": {
    status: "expanded",
    note: "Equipment pathway added.",
  },
};

/** Resolve the expansion entry for a topic, falling back to its section. */
export function expansionFor(
  section: Section,
  topicId: string,
): ExpansionEntry {
  return TOPIC_EXPANSION[topicId] ?? SECTION_EXPANSION[section];
}

export const STATUS_LABEL: Record<ExpansionStatus, string> = {
  expanded: "Expanded",
  "in-progress": "Section in progress",
  pending: "Pending review",
};

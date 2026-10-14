import { anatomyTopics } from "./curriculum";
import { topicReferences } from "./references";
import diagrams from "./anatomyDiagramSources.generated.json";

export const anatomyDirectoryReview = {
  status: "complete",
  date: "14 October 2026",
  scope: "Reference-page wording and record review complete. Unverified source identities remain explicitly flagged; anatomy teaching, historical artwork and added labels/hotspots are not certified.",
} as const;

// Preserve citation keys used by topic pages while correcting reader-facing labels.
export function anatomyReferenceLabel(topicId: string, label: string) {
  const corrected: Record<string, string> = {
    "spinal-anatomy:BJA Educ 2006": "CEACCP 2005 — Applied epidural anatomy",
    "thoracic-anatomy:BJA Educ 2007": "Br J Anaesth 1998 — Thoracic paravertebral block",
    "thoracic-anatomy:BJA Educ 2015 Thoracic Duct": "Eur J Cardiothorac Surg 2007 — Chylothorax",
    "neuroanatomy:BJA Educ 2016 ANS": "Comprehensive Physiology 2016 — Autonomic nervous system",
    "upper-limb-anatomy:NICE CG49": "NICE TA49",
  };
  return corrected[`${topicId}:${label}`] ?? label;
}

/** Existing editorial bibliographies, not generated reading lists or accuracy verdicts. */
export const anatomyReferences = anatomyTopics.map(topic => {
  const path = `/anatomy/${topic.id}`;
  const references = topicReferences[topic.id] ?? [];
  const plates = diagrams.entries.filter(entry => entry.topicLinks.some(link => link.path === path));
  return {
    id: topic.id,
    title: topic.title,
    path,
    references,
    diagrams: plates,
    missingReferences: references.length === 0,
    // Editorial inclusion is not passage-by-passage verification.
    reviewNote: "Reference-page record review complete; full anatomical claim-to-source matching still requires editorial review. Legacy records marked unverified are not source support.",
  };
});
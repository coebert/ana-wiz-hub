import { anatomyTopics } from "./curriculum";
import { topicReferences } from "./references";
import diagrams from "./anatomyDiagramSources.generated.json";

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
    reviewNote: "Curated sources recorded; full claim-to-source matching still requires editorial review.",
  };
});
import { topicReferences } from "@/data/references";

/** Named sources for the bounded residual-copy review, not all monographs. */
export function DrugResidualSources({ groupId }: { groupId: string }) {
  const references = groupId === "neuromuscular-blockade"
    ? [...topicReferences["neuromuscular"]].filter(ref => ["Bridion SmPC", "Salisbury Burns Checklist", "Suxamethonium SmPC"].includes(ref.label))
    : groupId === "metabolic-gi"
      ? [...(topicReferences["acute-liver-failure"] ?? []).filter(ref => ["Acetylcysteine SmPC", "SNAP pathway", "RCUK Anaphylaxis 2021"].includes(ref.label)), ...(topicReferences["antimicrobials-icu"] ?? []).filter(ref => ["Calcium chloride compatibility SmPC", "B Braun calcium gluconate compatibility", "Hameln ceftriaxone calcium compatibility"].includes(ref.label))]
      : groupId === "infection"
        ? (topicReferences["antimicrobials-icu"] ?? []).filter(ref => ["Calcium chloride compatibility SmPC", "B Braun calcium gluconate compatibility", "Hameln ceftriaxone calcium compatibility"].includes(ref.label))
        : [];
  if (!references.length) return null;
  return <p className="mt-2 text-xs text-muted-foreground">
    Sources for the bounded corrected advice (not whole-record validation): {references.map(ref => <a key={ref.label} href={ref.url} target="_blank" rel="noopener noreferrer" title={ref.reviewNote ?? ref.citation} className="mr-3 inline-flex min-h-11 items-center underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring">{ref.label}</a>)}
  </p>;
}
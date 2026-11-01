import { topicReferences } from "@/data/references";

/** Named sources for the bounded residual-copy review, not all monographs. */
export function DrugResidualSources({ groupId }: { groupId: string }) {
  const references = groupId === "neuromuscular-blockade"
    ? [...topicReferences["neuromuscular"]].filter(ref => ["Bridion SmPC", "Salisbury Burns Checklist", "Suxamethonium SmPC"].includes(ref.label))
    : groupId === "metabolic-gi"
      ? (topicReferences["acute-liver-failure"] ?? []).filter(ref => ["Acetylcysteine SmPC", "SNAP pathway", "RCUK Anaphylaxis 2021"].includes(ref.label))
      : [];
  if (!references.length) return null;
  return <p className="mt-2 text-xs text-muted-foreground">
    Sources for the corrected reversal, burns or NAC advice: {references.map(ref => <a key={ref.label} href={ref.url} target="_blank" rel="noopener noreferrer" className="mr-3 underline underline-offset-2">{ref.label}</a>)}
  </p>;
}
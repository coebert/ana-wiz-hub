import { topicReferences } from "@/data/references";

/** Named sources for the bounded residual-copy review, not all monographs. */
export function DrugResidualSources({ groupId }: { groupId: string }) {
  const references = groupId === "neuromuscular-blockade"
    ? [...topicReferences["neuromuscular"]].filter(ref => ["Bridion SmPC", "Salisbury Burns Checklist", "Suxamethonium SmPC"].includes(ref.label))
    : groupId === "liver-gastrointestinal"
      ? [...topicReferences["toxicology"] ?? []].filter(ref => ref.label === "Acetylcysteine SmPC")
      : [];
  if (!references.length) return null;
  return <p className="mt-2 text-xs text-muted-foreground">
    Sources for the corrected reversal, burns or NAC advice: {references.map(ref => <a key={ref.label} href={ref.url} target="_blank" rel="noopener noreferrer" className="mr-3 underline underline-offset-2">{ref.label}</a>)}
    {groupId === "liver-gastrointestinal" && <><a href="https://bnf.nice.org.uk/drugs/acetylcysteine/" target="_blank" rel="noopener noreferrer" className="mr-3 underline underline-offset-2">BNF acetylcysteine / SNAP</a><a href="https://www.resus.org.uk/library/additional-guidance/guidance-anaphylaxis/emergency-treatment" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">RCUK anaphylaxis</a></>}
  </p>;
}
import { Target } from "lucide-react";

interface LearningObjectivesProps {
  objectives: string[];
  /** Optional anchor id for the wrapping block (defaults to "objectives"). */
  blockId?: string;
}

/**
 * Standard "Learning Objectives" block — first content block on every topic page.
 * Each objective gets a stable anchor (`#objective-1`, `#objective-2`, …) so
 * `<SectionReferences>` can deep-link from a citation back to the relevant point.
 */
export const LearningObjectives = ({ objectives, blockId = "objectives" }: LearningObjectivesProps) => {
  return (
    <div id={blockId} className="rounded-xl border border-primary/20 bg-primary/5 p-5 scroll-mt-24">
      <h2 className="flex items-center gap-2 text-lg font-serif font-bold text-foreground mb-3">
        <Target className="h-5 w-5 text-primary" />
        Learning Objectives
      </h2>
      <p className="text-xs text-muted-foreground mb-3">By the end of this topic you should be able to:</p>
      <ul className="space-y-2">
        {objectives.map((o, i) => (
          <li
            key={i}
            id={`objective-${i + 1}`}
            className="flex gap-2 text-sm text-foreground leading-relaxed scroll-mt-24"
          >
            <span className="text-primary font-semibold shrink-0">{i + 1}.</span>
            <span>{o}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

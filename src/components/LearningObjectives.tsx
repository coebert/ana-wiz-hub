import { Target } from "lucide-react";

interface LearningObjectivesProps {
  objectives: string[];
}

/**
 * Standard "Learning Objectives" block — first content block on every topic page.
 * Mirrors the visual language of KeyLearningPoints to bookend the topic.
 */
export const LearningObjectives = ({ objectives }: LearningObjectivesProps) => {
  return (
    <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
      <h2 className="flex items-center gap-2 text-lg font-serif font-bold text-foreground mb-3">
        <Target className="h-5 w-5 text-primary" />
        Learning Objectives
      </h2>
      <p className="text-xs text-muted-foreground mb-3">By the end of this topic you should be able to:</p>
      <ul className="space-y-2">
        {objectives.map((o, i) => (
          <li key={i} className="flex gap-2 text-sm text-foreground leading-relaxed">
            <span className="text-primary font-semibold shrink-0">{i + 1}.</span>
            <span>{o}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

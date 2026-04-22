import { CheckCircle2 } from "lucide-react";

interface KeyLearningPointsProps {
  points: string[];
  /** Optional anchor id for the wrapping block (defaults to "key-points"). */
  blockId?: string;
}

export const KeyLearningPoints = ({ points, blockId = "key-points" }: KeyLearningPointsProps) => {
  return (
    <div
      id={blockId}
      className="mt-12 rounded-xl border-2 border-primary/20 bg-secondary/30 p-6 scroll-mt-24"
    >
      <h3 className="text-xl font-serif font-bold text-foreground mb-4">
        Key Learning Points
      </h3>
      <div className="space-y-3">
        {points.map((point, i) => (
          <div key={i} id={`keypoint-${i + 1}`} className="key-point scroll-mt-24">
            <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 shrink-0" />
            <p className="text-sm text-foreground leading-relaxed">{point}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

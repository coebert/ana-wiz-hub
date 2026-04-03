import { CheckCircle2 } from "lucide-react";

interface KeyLearningPointsProps {
  points: string[];
}

export const KeyLearningPoints = ({ points }: KeyLearningPointsProps) => {
  return (
    <div className="mt-12 rounded-xl border-2 border-primary/20 bg-secondary/30 p-6">
      <h3 className="text-xl font-serif font-bold text-foreground mb-4">
        Key Learning Points
      </h3>
      <div className="space-y-3">
        {points.map((point, i) => (
          <div key={i} className="key-point">
            <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 shrink-0" />
            <p className="text-sm text-foreground leading-relaxed">{point}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

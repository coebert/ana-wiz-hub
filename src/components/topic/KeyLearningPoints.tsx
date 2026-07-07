import { CheckCircle2 } from "lucide-react";
import { ReactNode } from "react";
import { Cite } from "@/components/references/Cite";

/**
 * A key learning point: either a plain string (legacy) or an object with
 * optional inline citations rendered as numeric superscripts.
 */
export type KeyPoint =
  | string
  | {
      text: ReactNode;
      /** Reference labels (must exist in topicReferences[topicId]). */
      cites?: string[];
    };

interface KeyLearningPointsProps {
  points: KeyPoint[];
  /** Optional anchor id for the wrapping block (defaults to "key-points"). */
  blockId?: string;
  /** Topic ID used to resolve citation labels → numeric superscripts. */
  topicId?: string;
}

export const KeyLearningPoints = ({
  points,
  blockId = "key-points",
  topicId,
}: KeyLearningPointsProps) => {
  return (
    <div
      id={blockId}
      className="mt-12 rounded-xl border-2 border-primary/20 bg-secondary/30 p-6 scroll-mt-24"
    >
      <h3 className="h2 mb-4">
        Key Learning Points
      </h3>
      <div className="space-y-3">
        {points.map((point, i) => {
          const isObj = typeof point !== "string";
          const text: ReactNode = isObj ? point.text : point;
          const cites = isObj ? point.cites : undefined;
          return (
            <div key={i} id={`keypoint-${i + 1}`} className="key-point scroll-mt-24">
              <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 shrink-0" />
              <p className="text-sm text-foreground leading-relaxed">
                {text}
                {topicId && cites && cites.length > 0 && (
                  <Cite topicId={topicId} labels={cites} />
                )}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

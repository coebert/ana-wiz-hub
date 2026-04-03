import { CheckCircle2, Circle } from "lucide-react";
import { useProgress } from "@/contexts/ProgressContext";

interface TopicCompletionToggleProps {
  topicId: string;
  topicTitle: string;
}

export const TopicCompletionToggle = ({ topicId, topicTitle }: TopicCompletionToggleProps) => {
  const { isCompleted, toggleTopic } = useProgress();
  const completed = isCompleted(topicId);

  return (
    <button
      onClick={() => toggleTopic(topicId)}
      className={`w-full flex items-center gap-3 px-5 py-4 rounded-xl border-2 transition-all duration-200 mt-10 ${
        completed
          ? "bg-accent/10 border-accent"
          : "bg-card border-border hover:border-accent/50"
      }`}
    >
      {completed ? (
        <CheckCircle2 className="h-6 w-6 text-accent shrink-0" />
      ) : (
        <Circle className="h-6 w-6 text-muted-foreground shrink-0" />
      )}
      <div className="text-left">
        <p className={`font-semibold ${completed ? "text-accent" : "text-foreground"}`}>
          {completed ? "Completed!" : "Mark as completed"}
        </p>
        <p className="text-xs text-muted-foreground">
          {completed
            ? `You've finished studying ${topicTitle}. Click to undo.`
            : `Finished revising? Mark this topic as done to track your progress.`}
        </p>
      </div>
    </button>
  );
};

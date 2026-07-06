import { Check } from "lucide-react";
import { useSubsectionProgress } from "@/contexts/SubsectionProgressContext";

interface SubsectionCheckProps {
  topicId: string;
  subsectionId: string;
  label: string;
}

/**
 * Small inline toggle rendered next to a topic's H2 headings. When ticked
 * the heading gets a subtle success accent so completed subsections are
 * visible at a glance while scrolling.
 */
export const SubsectionCheck = ({ topicId, subsectionId, label }: SubsectionCheckProps) => {
  const { isChecked, toggle } = useSubsectionProgress();
  const checked = isChecked(topicId, subsectionId);

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={`Mark "${label}" as ${checked ? "not " : ""}complete`}
      title={checked ? "Mark as not complete" : "Mark subsection complete"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(topicId, subsectionId);
      }}
      className={`ml-2 inline-flex items-center justify-center align-middle w-5 h-5 rounded-md border transition-colors shrink-0 ${
        checked
          ? "bg-primary border-primary text-primary-foreground"
          : "border-border bg-background text-transparent hover:text-muted-foreground hover:border-muted-foreground"
      }`}
    >
      <Check className="h-3 w-3" aria-hidden strokeWidth={3} />
    </button>
  );
};

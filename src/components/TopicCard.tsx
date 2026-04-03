import { Link } from "react-router-dom";
import { ChevronRight, CheckCircle2 } from "lucide-react";
import { useProgress } from "@/contexts/ProgressContext";

interface TopicCardProps {
  title: string;
  description: string;
  path: string;
  section: "physics" | "physiology" | "pharmacology";
  topicId?: string;
}

export const TopicCard = ({ title, description, path, section, topicId }: TopicCardProps) => {
  const { isCompleted } = useProgress();
  const completed = topicId ? isCompleted(topicId) : false;

  return (
    <Link to={path} className={`topic-card section-card-${section} block group`}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {topicId && (
            <div className="shrink-0">
              {completed ? (
                <CheckCircle2 className="h-5 w-5 text-accent" />
              ) : (
                <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/30" />
              )}
            </div>
          )}
          <div className="min-w-0">
            <h3 className={`font-semibold group-hover:text-primary transition-colors ${completed ? "text-muted-foreground" : "text-foreground"}`}>
              {title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          </div>
        </div>
        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
      </div>
    </Link>
  );
};

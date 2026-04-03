import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface TopicCardProps {
  title: string;
  description: string;
  path: string;
  section: "physics" | "physiology" | "pharmacology";
}

export const TopicCard = ({ title, description, path, section }: TopicCardProps) => {
  return (
    <Link to={path} className={`topic-card section-card-${section} block group`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
      </div>
    </Link>
  );
};

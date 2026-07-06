import { Link } from "react-router-dom";
import { ChevronRight, CheckCircle2, BookOpen, Star } from "lucide-react";
import { useProgress } from "@/contexts/ProgressContext";
import { ExamTag, Section } from "@/data/curriculum";

interface TopicCardProps {
  title: string;
  description: string;
  path: string;
  section: Section;
  topicId?: string;
  examTags?: ExamTag[];
  /** When set, shows a "N refs" badge linking the user to the topic's references drawer. */
  referenceCount?: number;
}

const examTagLabels: Record<ExamTag, string> = {
  primary: "Primary",
  final: "Final",
  fficm: "FFICM",
  edic: "EDIC",
};

const examTagColors: Record<ExamTag, string> = {
  primary: "bg-primary/10 text-primary border-primary/20",
  final: "bg-amber-500/10 text-amber-700 border-amber-500/20",
  fficm: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
  edic: "bg-sky-500/10 text-sky-700 border-sky-500/20",
};

export const TopicCard = ({ title, description, path, section, topicId, examTags, referenceCount }: TopicCardProps) => {
  const { isCompleted } = useProgress();
  const completed = topicId ? isCompleted(topicId) : false;
  // Tier signal: topics that map to all three exam sittings (Primary + Final + FFICM)
  // are curriculum "core" — surfaced with a small star so learners can prioritise.
  const coreExams: ExamTag[] = ["primary", "final", "fficm"];
  const isCore = !!examTags && coreExams.every((e) => examTags.includes(e));

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
          <div className="min-w-0 flex-1">
            <h3 className={`font-semibold group-hover:text-primary transition-colors break-words flex items-center gap-1.5 ${completed ? "text-muted-foreground" : "text-foreground"}`}>
              {isCore && (
                <Star
                  className="h-3.5 w-3.5 shrink-0 text-amber-500 fill-amber-500"
                  aria-label="Core topic — covers Primary, Final and FFICM"
                />
              )}
              <span className="min-w-0">{title}</span>
            </h3>
            <p className="text-sm text-muted-foreground mt-1 break-words">{description}</p>
            {((examTags && examTags.length > 0) || (referenceCount && referenceCount > 0)) && (
              <div className="flex flex-wrap gap-1 mt-1.5">
                {examTags?.map((tag) => (
                  <span key={tag} className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium border ${examTagColors[tag]}`}>
                    {examTagLabels[tag]}
                  </span>
                ))}
                {referenceCount && referenceCount > 0 ? (
                  <span
                    className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium border bg-muted/50 text-muted-foreground border-border"
                    title={`${referenceCount} BJA-style references available`}
                  >
                    <BookOpen className="h-2.5 w-2.5" />
                    {referenceCount} ref{referenceCount === 1 ? "" : "s"}
                  </span>
                ) : null}
              </div>
            )}
          </div>
        </div>
        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
      </div>
    </Link>
  );
};

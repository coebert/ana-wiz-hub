import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import { useRecentTopics } from "@/hooks/useRecentTopics";
import { useProgress } from "@/contexts/ProgressContext";
import { allTopics } from "@/data/curriculum";

const sectionAccent: Record<string, string> = {
  physics: "text-physics",
  physiology: "text-physiology",
  pharmacology: "text-pharmacology",
  clinical: "text-clinical",
  "intensive-care": "text-icu",
  perioperative: "text-perioperative",
};

/**
 * "Continue where you left off" — surfaces up to three recently-visited
 * topics that the user has not yet marked as complete. Renders nothing until
 * the user has visited at least one topic, so first-time visitors don't see
 * an empty affordance.
 */
export const ContinueBand = () => {
  const recent = useRecentTopics();
  const { isCompleted } = useProgress();

  const items = recent
    .map((entry) => {
      const topic = allTopics.find((t) => t.id === entry.topicId);
      if (!topic || !topic.available) return null;
      return { topic, visitedAt: entry.visitedAt };
    })
    .filter((x): x is { topic: (typeof allTopics)[number]; visitedAt: number } => x !== null)
    .filter(({ topic }) => !isCompleted(topic.id))
    .slice(0, 3);

  if (items.length === 0) return null;

  return (
    <section
      aria-label="Continue where you left off"
      className="max-w-6xl mx-auto mb-8 md:mb-10"
    >
      <div className="flex items-center gap-2 mb-3">
        <Clock className="h-4 w-4 text-muted-foreground" aria-hidden />
        <h2 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
          Continue where you left off
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map(({ topic }) => {
          const accent = sectionAccent[topic.section] ?? "text-primary";
          const path = `/${topic.section}/${topic.id}`;
          return (
            <Link
              key={topic.id}
              to={path}
              className="group flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-sm transition-all hover:shadow-md hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div className="min-w-0 flex-1">
                <p className={`text-[10px] uppercase tracking-wider font-semibold ${accent}`}>
                  {topic.section.replace("-", " ")}
                </p>
                <p className="text-sm font-semibold text-foreground truncate">
                  {topic.title}
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
            </Link>
          );
        })}
      </div>
    </section>
  );
};

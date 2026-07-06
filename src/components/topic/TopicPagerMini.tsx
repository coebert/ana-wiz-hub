import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react";
import {
  sectionMeta,
  topicsBySection,
  type Section,
  type Topic,
} from "@/data/curriculum";

interface Props {
  section: Section;
  topic: Topic;
}

/**
 * Compact prev/next pager shown near the top of a topic page. Complements
 * the full-fat `TopicPager` at the bottom so learners can advance without
 * scrolling through the whole page first.
 */
export function TopicPagerMini({ section, topic }: Props) {
  const meta = sectionMeta[section];
  const siblings = topicsBySection[section].filter((t) => t.available);
  const idx = siblings.findIndex((t) => t.id === topic.id);
  const prev = idx > 0 ? siblings[idx - 1] : null;
  const next = idx >= 0 && idx < siblings.length - 1 ? siblings[idx + 1] : null;

  if (!prev && !next) return null;

  return (
    <nav
      aria-label={`${meta.label} quick topic navigation`}
      className="mb-6 flex items-center justify-between gap-2 rounded-lg border border-border/60 bg-muted/20 px-2 py-1.5 text-xs"
    >
      {prev ? (
        <Link
          to={`${meta.path}/${prev.id}`}
          rel="prev"
          className="group inline-flex items-center gap-1 min-w-0 px-2 py-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
          title={`Previous: ${prev.title}`}
        >
          <ChevronLeft className="h-3.5 w-3.5 shrink-0" aria-hidden />
          <span className="truncate max-w-[10rem] sm:max-w-[16rem]">{prev.title}</span>
        </Link>
      ) : (
        <span aria-hidden />
      )}

      <Link
        to={meta.path}
        className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors shrink-0"
        title={`All ${meta.label} topics`}
        aria-label={`All ${meta.label} topics`}
      >
        <LayoutGrid className="h-3.5 w-3.5" aria-hidden />
      </Link>

      {next ? (
        <Link
          to={`${meta.path}/${next.id}`}
          rel="next"
          className="group inline-flex items-center gap-1 min-w-0 px-2 py-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
          title={`Next: ${next.title}`}
        >
          <span className="truncate max-w-[10rem] sm:max-w-[16rem]">{next.title}</span>
          <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
        </Link>
      ) : (
        <span aria-hidden />
      )}
    </nav>
  );
}

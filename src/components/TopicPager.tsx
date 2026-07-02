import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react";
import {
  sectionMeta,
  topicsBySection,
  type Section,
  type Topic,
} from "@/data/curriculum";

interface TopicPagerProps {
  section: Section;
  topic: Topic;
}

/**
 * Crawlable prev / next / section-index navigation rendered at the foot of
 * every topic page. Gives search engines (and keyboard users) a plain
 * `<a href>` path to every sibling topic without relying on the sitemap.
 * The list of "all topics in this section" is expanded inline so a spider
 * fetching any topic page discovers every other topic in the section in
 * one hop.
 */
export function TopicPager({ section, topic }: TopicPagerProps) {
  const meta = sectionMeta[section];
  const siblings = topicsBySection[section].filter((t) => t.available);
  const idx = siblings.findIndex((t) => t.id === topic.id);
  const prev = idx > 0 ? siblings[idx - 1] : null;
  const next = idx >= 0 && idx < siblings.length - 1 ? siblings[idx + 1] : null;

  return (
    <nav
      aria-label={`${meta.label} topic navigation`}
      className="mt-12 border-t border-border/60 pt-8"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {prev ? (
          <Link
            to={`${meta.path}/${prev.id}`}
            rel="prev"
            className="group flex flex-col gap-1 rounded-lg border border-border/60 p-4 hover:border-primary/60 hover:bg-muted/40 transition-colors sm:col-start-1"
          >
            <span className="inline-flex items-center gap-1 text-xs uppercase tracking-wide text-muted-foreground">
              <ChevronLeft className="h-3.5 w-3.5" aria-hidden />
              Previous topic
            </span>
            <span className="font-medium text-foreground group-hover:text-primary transition-colors">
              {prev.title}
            </span>
          </Link>
        ) : (
          <span className="hidden sm:block" aria-hidden />
        )}
        {next ? (
          <Link
            to={`${meta.path}/${next.id}`}
            rel="next"
            className="group flex flex-col gap-1 rounded-lg border border-border/60 p-4 hover:border-primary/60 hover:bg-muted/40 transition-colors sm:col-start-2 sm:text-right"
          >
            <span className="inline-flex items-center gap-1 text-xs uppercase tracking-wide text-muted-foreground sm:justify-end">
              Next topic
              <ChevronRight className="h-3.5 w-3.5" aria-hidden />
            </span>
            <span className="font-medium text-foreground group-hover:text-primary transition-colors">
              {next.title}
            </span>
          </Link>
        ) : (
          <span className="hidden sm:block" aria-hidden />
        )}
      </div>

      <div className="mt-6">
        <Link
          to={meta.path}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          <LayoutGrid className="h-4 w-4" aria-hidden />
          All {meta.label} topics
        </Link>
        {/*
          Inline sibling index — a plain <ul> of anchors so non-JS crawlers
          discover every topic in this section from any topic page, not
          only from the sitemap or the section landing page.
        */}
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
          {siblings.map((t) => {
            const isCurrent = t.id === topic.id;
            return (
              <li key={t.id}>
                {isCurrent ? (
                  <span aria-current="page" className="font-medium text-foreground">
                    {t.title}
                  </span>
                ) : (
                  <Link
                    to={`${meta.path}/${t.id}`}
                    className="hover:text-foreground hover:underline"
                  >
                    {t.title}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

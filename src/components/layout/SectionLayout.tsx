import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { PageMeta } from "@/components/layout/PageMeta";
import { AutoTOC } from "@/components/layout/AutoTOC";
import { topicsBySection, type Section } from "@/data/curriculum";
import { TopicReferencesButton } from "@/components/topic/TopicReferencesButton";
import { TopicPager } from "@/components/topic/TopicPager";
import { TopicPagerMini } from "@/components/topic/TopicPagerMini";
import { ReadingProgressBar } from "@/components/layout/ReadingProgressBar";
import { StickyTopicTitle } from "@/components/layout/StickyTopicTitle";

interface SectionLayoutProps {
  title: string;
  subtitle: string;
  backPath?: string;
  backLabel?: string;
  children: ReactNode;
  accentColor?: string;
  /** Disable the auto-generated sticky TOC. */
  disableAutoTOC?: boolean;
  /** Minimum number of h2s required before the TOC is rendered. Defaults to 4. */
  autoTOCMinHeadings?: number;
  /**
   * Optional richer meta description for crawlers. When omitted we derive one
   * from `title` + `subtitle`, but topic pages usually pass a longer
   * curriculum-specific blurb so descriptions clear the 50-char SEO floor.
   */
  metaDescription?: string;
}

export const SectionLayout = ({
  title,
  subtitle,
  backPath,
  backLabel,
  children,
  accentColor,
  disableAutoTOC,
  autoTOCMinHeadings = 4,
  metaDescription,
}: SectionLayoutProps) => {
  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);

  const topicForPath = (() => {
    if (segments.length !== 2) return null;
    const sec = segments[0] as Section;
    if (!(sec in topicsBySection)) return null;
    const topic = topicsBySection[sec].find((t) => t.id === segments[1]);
    return topic ? { section: sec, topic } : null;
  })();

  // Topic pages get a tighter reading measure (~72ch) so long-form body text
  // stays comfortable to scan; section listings retain the wider 4xl column.
  const measureClass = topicForPath ? "max-w-3xl" : "max-w-4xl";
  return (
    <>
      {topicForPath && <ReadingProgressBar />}
      {topicForPath && <StickyTopicTitle title={title} />}
      <div className={`container mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8 ${measureClass}`}>
      <PageMeta title={title} subtitle={subtitle} metaDescription={metaDescription} />
      <nav
        aria-label="Breadcrumb"
        className="mb-6"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <ol className="flex flex-wrap items-center gap-x-1 gap-y-1 text-sm text-muted-foreground -mx-2">
          <li>
            <Link
              to="/"
              aria-label="Go to home page"
              className="inline-flex items-center min-h-11 px-2 rounded-md hover:text-foreground hover:bg-muted/40 active:bg-muted/60 transition-colors"
            >
              Home
            </Link>
          </li>
          <li aria-hidden className="text-muted-foreground/60 select-none">/</li>
          <li>
            <Link
              to="/revise"
              aria-label="Go to Core Disciplines"
              className="inline-flex items-center min-h-11 px-2 rounded-md hover:text-foreground hover:bg-muted/40 active:bg-muted/60 transition-colors"
            >
              Core Disciplines
            </Link>
          </li>
          <li aria-hidden className="text-muted-foreground/60 select-none">/</li>
          <li
            aria-current="page"
            className="inline-flex items-center min-h-11 px-2 font-medium text-foreground truncate max-w-[16rem]"
          >
            {title}
          </li>
        </ol>
        {backPath && backPath !== "/revise" && backPath !== "/" && (
          <Link
            to={backPath}
            aria-label={`Back to ${backLabel || "previous page"}`}
            className="inline-flex items-center gap-1.5 min-h-11 px-2 -ml-2 mt-1 text-sm text-muted-foreground rounded-md hover:text-foreground hover:bg-muted/40 active:bg-muted/60 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
            {backLabel || "Back"}
          </Link>
        )}
      </nav>
      <div className="mb-6 sm:mb-8 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h1 className={`h1 break-words ${accentColor || "text-foreground"}`}>
            {title}
          </h1>
          <p className="lead mt-2 break-words">{subtitle}</p>
        </div>
        {topicForPath && (
          <div className="shrink-0">
            <TopicReferencesButton
              topicId={topicForPath.topic.id}
              topicTitle={topicForPath.topic.title}
              section={topicForPath.section}
            />
          </div>
        )}
      </div>
      {topicForPath && (
        <TopicPagerMini section={topicForPath.section} topic={topicForPath.topic} />
      )}
      <AutoTOC
        disabled={disableAutoTOC}
        minHeadings={autoTOCMinHeadings}
        topicId={topicForPath?.topic.id}
      >
        {children}
      </AutoTOC>
      {topicForPath && (
        <TopicPager section={topicForPath.section} topic={topicForPath.topic} />
      )}
      </div>
    </>
  );
};


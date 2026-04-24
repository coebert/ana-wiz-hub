import { ExternalLink, BookOpen } from "lucide-react";

export interface GuidelineSource {
  label: string;
  url: string;
  detail?: string;
}

interface GuidelineSourcesProps {
  sources: GuidelineSource[];
  title?: string;
  className?: string;
}

/**
 * Small footer panel that lists clickable, exam-relevant guideline references
 * (BJA Education, JBDS-IP, NICE, Endocrine Society, ATA etc.) under a topic
 * section. Designed to sit under diagrams / core-concept / worked-example
 * sections so trainees can verify the source for any clinical claim.
 */
const GuidelineSources = ({ sources, title = "Guideline sources", className = "" }: GuidelineSourcesProps) => {
  if (!sources?.length) return null;
  return (
    <div className={`mt-4 p-3 rounded-lg border border-border bg-muted/30 ${className}`}>
      <div className="flex items-center gap-2 mb-2">
        <BookOpen className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {title}
        </p>
      </div>
      <ul className="flex flex-wrap gap-1.5">
        {sources.map((s) => (
          <li key={s.url}>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              title={s.detail ?? s.label}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-card border border-border text-[11px] text-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors"
            >
              <span>{s.label}</span>
              <ExternalLink className="h-3 w-3 opacity-60" aria-hidden />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GuidelineSources;

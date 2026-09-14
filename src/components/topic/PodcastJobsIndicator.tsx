import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Headphones, Loader2, X, CheckCircle2, AlertCircle } from "lucide-react";
import {
  dismissPodcastJob,
  podcastJobElapsedSec,
  usePodcastJobs,
} from "@/lib/podcastJobs";
import { cn } from "@/lib/utils";

const formatElapsed = (s: number) => {
  const m = Math.floor(s / 60);
  return `${m}:${(s % 60).toString().padStart(2, "0")}`;
};

/** Keep finished jobs on screen briefly so the user sees the outcome. */
const FINISHED_VISIBLE_MS = 90_000;

/**
 * Floating status card listing podcast generations still running (or just
 * finished) anywhere in the app. Generation continues after the user leaves
 * the topic page, so this is how they keep track of it and jump back.
 */
export const PodcastJobsIndicator = () => {
  const jobs = usePodcastJobs();
  const location = useLocation();
  const [, setTick] = useState(0);

  // Re-render every second so elapsed times count up.
  useEffect(() => {
    const id = window.setInterval(() => setTick((t) => t + 1), 1000);
    return () => window.clearInterval(id);
  }, []);

  const visible = jobs.filter((job) => {
    if (job.dismissed) return false;
    if (job.status === "generating") {
      // Hide while the user is on the topic page — the player itself shows progress.
      return location.pathname !== job.topicPath;
    }
    return Date.now() - (job.finishedAt ?? 0) < FINISHED_VISIBLE_MS;
  });

  if (!visible.length) return null;

  return (
    <div
      className="fixed bottom-4 right-4 z-50 flex w-[min(20rem,calc(100vw-2rem))] flex-col gap-2"
      role="status"
      aria-live="polite"
    >
      {visible.map((job) => {
        const elapsed = podcastJobElapsedSec(job);
        return (
          <div
            key={job.topicId}
            className="rounded-xl border border-border bg-card/95 p-3 shadow-lg backdrop-blur"
          >
            <div className="flex items-start gap-2">
              {job.status === "generating" ? (
                <Loader2 className="mt-0.5 h-4 w-4 shrink-0 animate-spin text-primary" />
              ) : job.status === "ready" ? (
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              ) : (
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
              )}
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-foreground">
                  {job.status === "generating"
                    ? "Generating podcast…"
                    : job.status === "ready"
                    ? "Podcast ready"
                    : "Podcast generation failed"}
                </p>
                <p className="truncate text-xs text-muted-foreground">{job.topicTitle}</p>
                {job.status === "generating" && (
                  <>
                    <p className="mt-0.5 text-[11px] tabular-nums text-muted-foreground">
                      {formatElapsed(elapsed)} elapsed · continues while you browse
                    </p>
                    <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary/60 transition-all"
                        style={{ width: `${Math.min(95, Math.round((elapsed / 240) * 100))}%` }}
                      />
                    </div>
                  </>
                )}
                <Link
                  to={`${job.topicPath}#podcast`}
                  className={cn(
                    "mt-1.5 inline-flex items-center gap-1 text-[11px] font-medium text-primary",
                    "hover:underline",
                  )}
                >
                  <Headphones className="h-3 w-3" />
                  {job.status === "ready" ? "Listen now" : "Open topic"}
                </Link>
              </div>
              {job.status !== "generating" && (
                <button
                  type="button"
                  onClick={() => dismissPodcastJob(job.topicId)}
                  className="rounded p-0.5 text-muted-foreground hover:text-foreground"
                  aria-label="Dismiss"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

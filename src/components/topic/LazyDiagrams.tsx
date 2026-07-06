import { ReactNode, useEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface LazyDiagramsProps {
  children: ReactNode;
  /** Approx skeleton placeholders to render before mount. */
  placeholderCount?: number;
  /** rootMargin for the IntersectionObserver (pre-mount before in view). */
  rootMargin?: string;
}

/**
 * Defers mounting heavy diagram subtrees until they are about to scroll into
 * view, keeping initial topic-page render fast. Once mounted, children stay
 * mounted (no re-mount on scroll out) so animations don't reset.
 *
 * SSR / no-IO fallback: mounts immediately.
 */
export const LazyDiagrams = ({
  children,
  placeholderCount = 1,
  rootMargin = "400px 0px",
}: LazyDiagramsProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(() => {
    if (typeof window === "undefined") return true;
    return typeof window.IntersectionObserver === "undefined";
  });

  useEffect(() => {
    if (mounted || !ref.current) return;
    const el = ref.current;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setMounted(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [mounted, rootMargin]);

  return (
    <div ref={ref} aria-busy={!mounted}>
      {mounted ? (
        children
      ) : (
        <div
          className="space-y-6"
          role="status"
          aria-label="Loading interactive diagrams"
        >
          {Array.from({ length: placeholderCount }).map((_, i) => (
            <DiagramSkeleton key={i} />
          ))}
          <span className="sr-only">Loading interactive diagrams…</span>
        </div>
      )}
    </div>
  );
};

const DiagramSkeleton = () => (
  <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden animate-fade-in">
    {/* Header band — mirrors AnimatedMechanism header */}
    <div className="px-4 sm:px-5 pt-4 pb-3 border-b border-border bg-muted/30">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1 space-y-2">
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-3 w-4/5" />
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </div>
      <Skeleton className="mt-3 h-1.5 w-full rounded-full" />
      <div className="mt-3 flex flex-wrap gap-1.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-6 w-20 rounded-full" />
        ))}
      </div>
    </div>
    {/* Body — scene + side panel */}
    <div className="grid lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-0">
      <div className="p-4 sm:p-5 bg-background min-h-[260px] flex items-center justify-center">
        <Skeleton className="h-44 w-full max-w-md rounded-lg" />
      </div>
      <aside className="p-4 sm:p-5 border-t lg:border-t-0 lg:border-l border-border bg-muted/20 space-y-3">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
      </aside>
    </div>
  </div>
);

export default LazyDiagrams;

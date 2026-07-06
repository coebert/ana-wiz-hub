import { useEffect, useState } from "react";

/**
 * Slim progress bar that tracks how far the reader has scrolled through the
 * current topic. Fixed just under the sticky site header so it doesn't
 * displace layout. Hidden when there's nothing meaningful to progress
 * through (short pages, mobile keyboard).
 */
export const ReadingProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const compute = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const height = doc.scrollHeight - doc.clientHeight;
      if (height <= 0) {
        setProgress(0);
        return;
      }
      const pct = Math.min(100, Math.max(0, (scrollTop / height) * 100));
      setProgress(pct);
    };
    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="fixed left-0 right-0 top-14 z-40 h-0.5 bg-transparent pointer-events-none"
    >
      <div
        className="h-full bg-primary transition-[width] duration-100 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

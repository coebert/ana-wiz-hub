import { useEffect, useState } from "react";

interface StickyTopicTitleProps {
  title: string;
  /** Show only after the page has scrolled past this many pixels. */
  showAfter?: number;
}

/**
 * Compact secondary title bar that fades in after the main H1 scrolls out
 * of view. Anchored beneath the site header + reading-progress rail so the
 * reader always knows which topic they're in on long pages.
 */
export const StickyTopicTitle = ({ title, showAfter = 220 }: StickyTopicTitleProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > showAfter);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [showAfter]);

  return (
    <div
      aria-hidden={!visible}
      className={`fixed left-0 right-0 top-[3.5rem] z-30 border-b border-border/60 bg-background/85 backdrop-blur transition-opacity duration-200 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="container mx-auto max-w-3xl px-4 py-1.5">
        <p className="text-xs font-medium text-foreground truncate">{title}</p>
      </div>
    </div>
  );
};

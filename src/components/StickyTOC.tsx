import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface TOCItem {
  id: string;
  label: string;
}

interface StickyTOCProps {
  items: TOCItem[];
  /** CSS scroll offset so anchored headings clear the sticky site header. */
  offset?: number;
  className?: string;
}

/**
 * Sticky in-page table of contents with scrollspy.
 * - Desktop: floats on the left as a vertical list
 * - Mobile: collapses to a horizontal scrollable chip bar at the top
 */
export const StickyTOC = ({ items, offset = 96, className }: StickyTOCProps) => {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top of the viewport that is intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        // Trigger when section top crosses ~ below the sticky header
        rootMargin: `-${offset}px 0px -65% 0px`,
        threshold: 0,
      }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items, offset]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
    setActiveId(id);
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <>
      {/* Mobile: horizontal chip bar */}
      <nav
        aria-label="On this page"
        className={cn(
          "lg:hidden sticky top-16 z-30 -mx-4 px-4 py-2 bg-background/85 backdrop-blur border-b border-border",
          className
        )}
      >
        <ul className="flex gap-2 overflow-x-auto no-scrollbar">
          {items.map((item) => (
            <li key={item.id} className="shrink-0">
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={cn(
                  "inline-block px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
                  activeId === item.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-muted-foreground border-border hover:text-foreground hover:border-foreground/30"
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Desktop: floating left rail */}
      <nav
        aria-label="On this page"
        className={cn(
          "hidden lg:block fixed left-[max(1rem,calc(50%-32rem-12rem))] top-32 w-44 max-h-[70vh] overflow-y-auto",
          className
        )}
      >
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-3">
          On this page
        </p>
        <ul className="space-y-1 border-l border-border">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={cn(
                  "block pl-3 py-1.5 text-sm border-l-2 -ml-px transition-colors",
                  activeId === item.id
                    ? "border-primary text-foreground font-medium"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-foreground/30"
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

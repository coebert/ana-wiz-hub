import { useEffect, useState } from "react";

export interface TocItem {
  id: string;
  label: string;
  group?: string;
}

interface TopicTableOfContentsProps {
  items: TocItem[];
}

/**
 * Sticky in-page table of contents. On desktop it sticks to the right;
 * on mobile it collapses into a horizontal scroll strip at the top.
 * Tracks the active section using IntersectionObserver and scrolls smoothly
 * with a scroll-margin offset on each section.
 */
export const TopicTableOfContents = ({ items }: TopicTableOfContentsProps) => {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const visible = new Map<string, number>();

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              visible.set(item.id, entry.intersectionRatio);
            } else {
              visible.delete(item.id);
            }
          }
          if (visible.size > 0) {
            const top = [...visible.entries()].sort((a, b) => b[1] - a[1])[0][0];
            setActive(top);
          }
        },
        { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5, 1] }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [items]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <>
      {/* Mobile: horizontal scroll strip */}
      <nav
        aria-label="On this page"
        className="lg:hidden sticky top-14 z-20 -mx-4 mb-4 bg-background/85 backdrop-blur border-y border-border"
      >
        <div className="flex gap-1.5 overflow-x-auto px-4 py-2 text-xs">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={`whitespace-nowrap px-2.5 py-1 rounded-full border transition-colors ${
                active === item.id
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border text-muted-foreground hover:bg-muted/50"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Desktop: sticky sidebar */}
      <nav
        aria-label="On this page"
        className="hidden lg:block fixed right-6 top-24 w-56 z-10"
      >
        <div className="bg-muted/30 border border-border rounded-xl p-3">
          <p className="text-[10px] uppercase tracking-wide font-semibold text-muted-foreground mb-2 px-2">
            On this page
          </p>
          <ul className="space-y-0.5 max-h-[70vh] overflow-y-auto">
            {items.map((item, i) => {
              const showGroup = item.group && item.group !== items[i - 1]?.group;
              return (
                <li key={item.id}>
                  {showGroup && (
                    <p className="text-[9px] uppercase tracking-wider text-muted-foreground/70 mt-2 mb-1 px-2 font-medium">
                      {item.group}
                    </p>
                  )}
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleClick(e, item.id)}
                    className={`block text-xs px-2 py-1 rounded-md border-l-2 transition-colors ${
                      active === item.id
                        ? "border-primary bg-primary/10 text-foreground font-medium"
                        : "border-transparent text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default TopicTableOfContents;

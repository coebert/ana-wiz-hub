import { useEffect, useState } from "react";
import { ChevronDown, ListOrdered } from "lucide-react";

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
  const [mobileOpen, setMobileOpen] = useState(false);
  const collapsible = items.length > 6;
  const activeItem = items.find((i) => i.id === active) ?? items[0];

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
        className="lg:hidden sticky top-14 z-20 -mx-4 mb-4 bg-background/85 backdrop-blur border-y border-border px-4 py-2"
      >
        {collapsible ? (
          <>
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              aria-expanded={mobileOpen}
              aria-controls="topic-toc-list"
              className="w-full flex items-center justify-between gap-2 py-1 text-xs font-medium text-foreground"
            >
              <span className="inline-flex items-center gap-1.5 min-w-0">
                <ListOrdered className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden />
                <span className="text-muted-foreground shrink-0">On this page ({items.length}):</span>
                <span className="truncate text-foreground">{activeItem?.label}</span>
              </span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${mobileOpen ? "rotate-180" : ""}`}
                aria-hidden
              />
            </button>
            {mobileOpen && (
              <ul id="topic-toc-list" className="mt-2 max-h-[50vh] overflow-y-auto flex flex-wrap gap-1.5 pb-1">
                {items.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => {
                        handleClick(e, item.id);
                        setMobileOpen(false);
                      }}
                      className={`inline-block whitespace-nowrap px-2.5 py-1 rounded-full border text-xs transition-colors ${
                        active === item.id
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border text-muted-foreground hover:bg-muted/50"
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <div className="flex gap-1.5 overflow-x-auto text-xs">
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
        )}
      </nav>


      {/* Desktop: sticky sidebar — anchored just outside the max-w-4xl content column
          so it never overlaps body content. Hidden when the viewport is too narrow
          to fit the sidebar next to the content. */}
      <nav
        aria-label="On this page"
        className="hidden 2xl:block fixed top-24 w-56 z-10 left-[calc(50%+28rem+1.5rem)]"
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

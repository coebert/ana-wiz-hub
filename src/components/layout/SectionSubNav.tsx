import { useEffect, useState } from "react";

/**
 * Sticky in-page sub-navigation for section discipline pages.
 *
 * Anchored to `#introduction`, `#topics`, `#summary` — the section page
 * is responsible for wrapping those blocks in `<section id="…">`
 * containers. Highlights the currently-visible section using an
 * IntersectionObserver so users get a consistent "where am I" cue on
 * long pages. The bar itself sits directly under the app header
 * (`top-14`, matching Header's `h-14`) and stays flush edge-to-edge
 * by pulling itself out of the parent container's padding.
 */
const ITEMS: { id: string; label: string }[] = [
  { id: "introduction", label: "Introduction" },
  { id: "topics", label: "Topics" },
  { id: "summary", label: "Key points" },
];

export const SectionSubNav = () => {
  const [active, setActive] = useState<string>(ITEMS[0].id);

  useEffect(() => {
    // Only observe anchors that actually exist on this page — a section
    // page may omit "summary", for example. If nothing is present we
    // skip the observer entirely.
    const els = ITEMS.map((i) => document.getElementById(i.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        // Pick the top-most intersecting section so the highlight moves
        // as the user scrolls through the page.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: [0, 1] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const handleClick = (id: string) => (e: React.MouseEvent) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    // Update hash without triggering the browser's default jump.
    history.replaceState(null, "", `#${id}`);
    setActive(id);
  };

  return (
    <nav
      aria-label="Section navigation"
      className="sticky top-14 z-30 -mx-3 sm:-mx-4 lg:-mx-6 mb-6 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85"

    >
      <div className="px-3 sm:px-4 lg:px-6">
        <ul className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {ITEMS.map((i) => {
            const isActive = active === i.id;
            return (
              <li key={i.id} className="shrink-0">
                <a
                  href={`#${i.id}`}
                  onClick={handleClick(i.id)}
                  aria-current={isActive ? "location" : undefined}
                  className={`inline-flex items-center h-8 px-3 rounded-md text-xs font-medium tracking-tight transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    isActive
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  }`}
                >
                  {i.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

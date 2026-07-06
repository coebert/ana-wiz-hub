/**
 * <AutoTOC> — scans its children for h2 headings after render and injects a
 * StickyTOC. Extracted from SectionLayout so the DOM-mutation side effect is
 * isolated and the layout can remain declarative.
 *
 * Behaviour is preserved from the previous inline implementation:
 *  - assigns generated ids to headings that don't already have one
 *  - skips activation when a page has manually rendered a StickyTOC
 *  - only renders when at least `minHeadings` (default 4) h2s are found
 */
import { ReactNode, useEffect, useRef, useState } from "react";
import { StickyTOC, TOCItem } from "@/components/layout/StickyTOC";

const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

interface AutoTOCProps {
  children: ReactNode;
  /** Set to true to disable the scan entirely. */
  disabled?: boolean;
  /** Minimum h2 count before the TOC is rendered. Defaults to 4. */
  minHeadings?: number;
}

export const AutoTOC = ({ children, disabled, minHeadings = 4 }: AutoTOCProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<TOCItem[]>([]);

  useEffect(() => {
    if (disabled) return;
    const root = contentRef.current;
    if (!root) return;

    // If the page already rendered a StickyTOC manually, don't duplicate.
    if (root.querySelector('nav[aria-label="On this page"]')) return;

    const headings = Array.from(root.querySelectorAll("h2")) as HTMLHeadingElement[];
    const used = new Set<string>();
    const next: TOCItem[] = headings
      .map((h) => {
        const label = (h.textContent || "").trim();
        if (!label) return null;
        let id = h.id || h.closest<HTMLElement>("[id]")?.id || "";
        if (!id) {
          const base = `toc-${slugify(label)}`;
          let candidate = base;
          let n = 2;
          while (used.has(candidate) || document.getElementById(candidate)) {
            candidate = `${base}-${n++}`;
          }
          id = candidate;
          h.id = id;
          h.classList.add("scroll-mt-24");
        }
        used.add(id);
        return { id, label } as TOCItem;
      })
      .filter((x): x is TOCItem => x !== null);

    if (next.length >= minHeadings) setItems(next);
  }, [children, disabled, minHeadings]);

  return (
    <>
      {items.length > 0 && <StickyTOC items={items} />}
      <div ref={contentRef}>{children}</div>
    </>
  );
};

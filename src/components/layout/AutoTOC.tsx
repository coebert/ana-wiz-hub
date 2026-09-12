/**
 * <AutoTOC> — scans its children for h2 headings after render and injects a
 * StickyTOC. Extracted from SectionLayout so the DOM-mutation side effect is
 * isolated and the layout can remain declarative.
 *
 * Behaviour:
 *  - assigns generated ids to headings that don't already have one
 *  - skips activation when a page has manually rendered a StickyTOC
 *  - only renders the sticky TOC when at least `minHeadings` h2s are found
 *  - if a `topicId` is provided, portals a <SubsectionCheck> next to each h2
 *    so signed-in users can tick individual subsections as complete
 */
import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { StickyTOC, TOCItem } from "@/components/layout/StickyTOC";
import { SubsectionCheck } from "@/components/topic/SubsectionCheck";
import { useSubsectionProgress } from "@/contexts/SubsectionProgressContext";

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
  /**
   * Enables per-subsection completion ticks next to each h2. When set,
   * each heading gets a portal-rendered <SubsectionCheck> button.
   */
  topicId?: string;
}

interface CheckMount {
  container: HTMLSpanElement;
  subsectionId: string;
  label: string;
}

export const AutoTOC = ({ children, disabled, minHeadings = 4, topicId }: AutoTOCProps) => {
  const { registerSubsections } = useSubsectionProgress();
  const contentRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<TOCItem[]>([]);
  const [checkMounts, setCheckMounts] = useState<CheckMount[]>([]);

  useEffect(() => {
    if (disabled) return;
    const root = contentRef.current;
    if (!root) return;

    // If the page already rendered a StickyTOC manually, don't duplicate.
    const skipTOC = !!root.querySelector('nav[aria-label="On this page"]');

    const headings = Array.from(root.querySelectorAll("h2")) as HTMLHeadingElement[];
    const used = new Set<string>();
    const next: TOCItem[] = [];
    const nextMounts: CheckMount[] = [];

    for (const h of headings) {
      const label = (h.textContent || "").trim();
      if (!label) continue;
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
      next.push({ id, label });

      // Mount a portal container for the SubsectionCheck. Reuse if we
      // already appended one from a previous render.
      if (topicId) {
        let container = h.querySelector<HTMLSpanElement>("span[data-subsection-check]");
        if (!container) {
          container = document.createElement("span");
          container.setAttribute("data-subsection-check", "");
          container.className = "inline-flex align-middle";
          h.appendChild(container);
        }
        nextMounts.push({ container, subsectionId: id, label });
      }
    }

    if (!skipTOC && next.length >= minHeadings) {
      setItems(next);
    } else {
      setItems([]);
    }
    if (topicId) {
      registerSubsections(
        topicId,
        nextMounts.map(({ subsectionId, label }) => ({ id: subsectionId, label })),
      );
    }
    setCheckMounts(nextMounts);
  }, [children, disabled, minHeadings, topicId, registerSubsections]);

  return (
    <>
      {items.length > 0 && <StickyTOC items={items} />}
      <div ref={contentRef}>{children}</div>
      {topicId &&
        checkMounts.map((m) =>
          createPortal(
            <SubsectionCheck topicId={topicId} subsectionId={m.subsectionId} label={m.label} />,
            m.container,
            `${topicId}:${m.subsectionId}`
          )
        )}
    </>
  );
};

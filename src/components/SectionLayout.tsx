import { ReactNode, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { StickyTOC, TOCItem } from "@/components/StickyTOC";

interface SectionLayoutProps {
  title: string;
  subtitle: string;
  backPath?: string;
  backLabel?: string;
  children: ReactNode;
  accentColor?: string;
  /** Disable the auto-generated sticky TOC. */
  disableAutoTOC?: boolean;
  /** Minimum number of h2s required before the TOC is rendered. Defaults to 4. */
  autoTOCMinHeadings?: number;
}

const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export const SectionLayout = ({
  title,
  subtitle,
  backPath,
  backLabel,
  children,
  accentColor,
  disableAutoTOC,
  autoTOCMinHeadings = 4,
}: SectionLayoutProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [autoItems, setAutoItems] = useState<TOCItem[]>([]);

  useEffect(() => {
    if (disableAutoTOC) return;
    const root = contentRef.current;
    if (!root) return;

    // If the page already rendered a StickyTOC manually, don't duplicate.
    if (root.querySelector('nav[aria-label="On this page"]')) return;

    const headings = Array.from(root.querySelectorAll("h2")) as HTMLHeadingElement[];
    const used = new Set<string>();
    const items: TOCItem[] = headings
      .map((h) => {
        const label = (h.textContent || "").trim();
        if (!label) return null;
        // Use existing id on the heading or its closest ancestor with an id, else generate one.
        let id = h.id || h.closest<HTMLElement>("[id]")?.id || "";
        if (!id) {
          let base = `toc-${slugify(label)}`;
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

    if (items.length >= autoTOCMinHeadings) {
      setAutoItems(items);
    }
  }, [children, disableAutoTOC, autoTOCMinHeadings]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {backPath && (
        <Link
          to={backPath}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ChevronLeft className="h-4 w-4" />
          {backLabel || "Back"}
        </Link>
      )}
      <div className="mb-8">
        <h1 className={`text-3xl md:text-4xl font-serif font-bold ${accentColor || "text-foreground"}`}>
          {title}
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">{subtitle}</p>
      </div>
      {autoItems.length > 0 && <StickyTOC items={autoItems} />}
      <div ref={contentRef}>{children}</div>
    </div>
  );
};

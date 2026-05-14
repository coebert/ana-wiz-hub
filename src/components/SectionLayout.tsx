import { ReactNode, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ChevronLeft } from "lucide-react";
import { StickyTOC, TOCItem } from "@/components/StickyTOC";
import { sectionMeta, topicsBySection, type Section } from "@/data/curriculum";

const SITE_URL = "https://anaesthesiacore.app";
const SITE_NAME = "AnaesthesiaCore";

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
  /**
   * Optional richer meta description for crawlers. When omitted we derive one
   * from `title` + `subtitle`, but topic pages usually pass a longer
   * curriculum-specific blurb so descriptions clear the 50-char SEO floor.
   */
  metaDescription?: string;
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
  metaDescription,
}: SectionLayoutProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [autoItems, setAutoItems] = useState<TOCItem[]>([]);
  const location = useLocation();
  const canonicalUrl = `${SITE_URL}${location.pathname}`;
  const pageTitle = `${title} – ${SITE_NAME}`;
  const rawDescription = (metaDescription && metaDescription.trim().length >= 50)
    ? metaDescription.trim()
    : `${title} — ${subtitle} — exam-focused revision notes, diagrams and viva practice on AnaesthesiaCore for FRCA and FFICM trainees.`;
  const truncatedDescription =
    rawDescription.length > 160 ? `${rawDescription.slice(0, 157).trimEnd()}…` : rawDescription;

  // Build BreadcrumbList JSON-LD from the current path. Segment 1 is the
  // section (e.g. /physics), segment 2 is the topic — we use the page's
  // own title for the leaf so labels match what the user sees.
  const SECTION_LABELS: Record<string, string> = {
    physics: "Physics",
    physiology: "Physiology",
    pharmacology: "Pharmacology",
    clinical: "Clinical Anaesthesia",
    "intensive-care": "Intensive Care",
    perioperative: "Perioperative Medicine",
    anatomy: "Anatomy",
    chemistry: "Chemistry",
    revise: "Revise",
    map: "Topic Map",
    progress: "Progress",
    podcasts: "Podcasts",
    viva: "Viva",
    drugs: "Drugs",
  };
  const segments = location.pathname.split("/").filter(Boolean);
  const crumbs: { name: string; url: string }[] = [
    { name: "Home", url: `${SITE_URL}/` },
  ];
  segments.forEach((seg, i) => {
    const path = `/${segments.slice(0, i + 1).join("/")}`;
    const isLeaf = i === segments.length - 1;
    const name = isLeaf
      ? title
      : SECTION_LABELS[seg] ??
        seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    crumbs.push({ name, url: `${SITE_URL}${path}` });
  });
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  };

  // Course JSON-LD on section landing pages (e.g. /physics, /intensive-care).
  // Each section landing maps to a Course whose hasPart lists its topic pages
  // as LearningResource entries, so Google can model the curriculum hierarchy.
  const sectionEntry = (Object.entries(sectionMeta) as [Section, { label: string; path: string }][])
    .find(([, meta]) => meta.path === location.pathname);
  const courseJsonLd = sectionEntry
    ? (() => {
        const [sectionKey, meta] = sectionEntry;
        const topics = topicsBySection[sectionKey].filter((t) => t.available);
        return {
          "@context": "https://schema.org",
          "@type": "Course",
          name: `${meta.label} — AnaesthesiaCore`,
          description: subtitle,
          url: `${SITE_URL}${meta.path}`,
          inLanguage: "en-GB",
          educationalLevel: "Postgraduate",
          provider: {
            "@type": "Organization",
            name: SITE_NAME,
            sameAs: `${SITE_URL}/`,
          },
          hasCourseInstance: {
            "@type": "CourseInstance",
            courseMode: "online",
            inLanguage: "en-GB",
          },
          hasPart: topics.map((t) => ({
            "@type": "LearningResource",
            name: t.title,
            description: t.description,
            url: `${SITE_URL}${meta.path}/${t.id}`,
            learningResourceType: "Topic",
            educationalLevel: "Postgraduate",
            teaches: t.title,
          })),
        };
      })()
    : null;

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
    <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8 max-w-4xl">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={truncatedDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={truncatedDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={truncatedDescription} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
        {courseJsonLd && (
          <script type="application/ld+json">{JSON.stringify(courseJsonLd)}</script>
        )}
      </Helmet>
      {backPath && (
        <Link
          to={backPath}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ChevronLeft className="h-4 w-4" />
          {backLabel || "Back"}
        </Link>
      )}
      <div className="mb-6 sm:mb-8">
        <h1 className={`text-2xl sm:text-3xl md:text-4xl font-serif font-bold break-words ${accentColor || "text-foreground"}`}>
          {title}
        </h1>
        <p className="text-muted-foreground mt-2 text-base sm:text-lg break-words">{subtitle}</p>
      </div>
      {autoItems.length > 0 && <StickyTOC items={autoItems} />}
      <div ref={contentRef}>{children}</div>
    </div>
  );
};

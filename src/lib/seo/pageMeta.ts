/**
 * Pure builders for per-page SEO metadata (title, description, canonical,
 * BreadcrumbList, and Course JSON-LD). Extracted from SectionLayout so the
 * layout component stays declarative and each transform is unit-testable
 * without React or a DOM.
 */
import { sectionMeta, topicsBySection, type Section } from "@/data/curriculum";

export const SITE_URL = "https://anaesthesiacore.app";
export const SITE_NAME = "AnaesthesiaCore";

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

/**
 * Keep <title> ≤ 60 chars: drop the " – AnaesthesiaCore" suffix when the
 * topic title alone would push past the limit.
 */
export function buildPageTitle(title: string): string {
  const suffix = ` – ${SITE_NAME}`;
  const withSuffix = `${title}${suffix}`;
  if (withSuffix.length <= 60) return withSuffix;
  if (title.length <= 60) return title;
  return `${title.slice(0, 59).trimEnd()}…`;
}

/**
 * Guarantee the topic title appears in the description and cap length at 160
 * chars so every page has a unique, crawler-friendly summary.
 */
export function buildMetaDescription(
  title: string,
  subtitle: string,
  metaDescription?: string,
): string {
  const trimmedProvided = metaDescription?.trim() ?? "";
  const base =
    trimmedProvided.length >= 50
      ? trimmedProvided
      : `${title} — ${subtitle} — exam-focused revision notes, diagrams and viva practice on AnaesthesiaCore for FRCA and FFICM trainees.`;
  const raw = base.toLowerCase().includes(title.toLowerCase()) ? base : `${title}: ${base}`;
  return raw.length > 160 ? `${raw.slice(0, 157).trimEnd()}…` : raw;
}

export function buildCanonicalUrl(pathname: string): string {
  return `${SITE_URL}${pathname}`;
}

export interface BreadcrumbCrumb {
  name: string;
  url: string;
}

export function buildBreadcrumbCrumbs(pathname: string, leafTitle: string): BreadcrumbCrumb[] {
  const segments = pathname.split("/").filter(Boolean);
  const crumbs: BreadcrumbCrumb[] = [{ name: "Home", url: `${SITE_URL}/` }];
  segments.forEach((seg, i) => {
    const path = `/${segments.slice(0, i + 1).join("/")}`;
    const isLeaf = i === segments.length - 1;
    const name = isLeaf
      ? leafTitle
      : SECTION_LABELS[seg] ??
        seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    crumbs.push({ name, url: `${SITE_URL}${path}` });
  });
  return crumbs;
}

export function buildBreadcrumbJsonLd(pathname: string, leafTitle: string) {
  const crumbs = buildBreadcrumbCrumbs(pathname, leafTitle);
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  };
}

/**
 * Course JSON-LD for section landing pages (e.g. /physics). Returns null
 * when `pathname` does not match a known section landing path.
 */
export function buildCourseJsonLd(pathname: string, subtitle: string) {
  const sectionEntry = (
    Object.entries(sectionMeta) as [Section, { label: string; path: string }][]
  ).find(([, meta]) => meta.path === pathname);
  if (!sectionEntry) return null;
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
}

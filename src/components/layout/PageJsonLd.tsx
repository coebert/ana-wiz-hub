/**
 * <PageJsonLd> — breadcrumb + LearningResource structured data for pages that
 * manage their own <Helmet> title/description (tools, calculators, case banks,
 * reference tables) and therefore don't go through <PageMeta>.
 *
 * The JSON-LD objects are written as inline literals on purpose: the SEO
 * regression tests parse the source text to prove each URL ships the required
 * @type, so indirection through a builder would hide them from the crawler
 * contract checks.
 */
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { SITE_NAME, SITE_URL, buildBreadcrumbCrumbs } from "@/lib/seo/pageMeta";

interface PageJsonLdProps {
  /** Human name of the page — also the breadcrumb leaf. */
  name: string;
  /** One-line summary; falls back to the name. */
  description?: string;
  /** schema.org learningResourceType, e.g. "Reference", "Tool", "Case bank". */
  learningResourceType?: string;
}

export const PageJsonLd = ({
  name,
  description,
  learningResourceType = "Reference",
}: PageJsonLdProps) => {
  const { pathname } = useLocation();
  const crumbs = buildBreadcrumbCrumbs(pathname, name);

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: crumbs.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.name,
            item: c.url,
          })),
        })}
      </script>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LearningResource",
          name,
          description: description ?? name,
          url: `${SITE_URL}${pathname}`,
          learningResourceType,
          educationalLevel: "Postgraduate",
          inLanguage: "en-GB",
          provider: {
            "@type": "Organization",
            name: SITE_NAME,
            sameAs: `${SITE_URL}/`,
          },
        })}
      </script>
    </Helmet>
  );
};

export default PageJsonLd;

/**
 * <PageMeta> — declarative Helmet wrapper for per-page SEO tags.
 *
 * Consumes pure builders from `src/lib/seo/pageMeta.ts` so all string
 * shaping (title truncation, description fallback, JSON-LD construction)
 * lives in testable helpers rather than inside JSX.
 */
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import {
  SITE_NAME,
  buildCanonicalUrl,
  buildMetaDescription,
  buildPageTitle,
  buildBreadcrumbJsonLd,
  buildCourseJsonLd,
} from "@/lib/seo/pageMeta";

interface PageMetaProps {
  title: string;
  subtitle: string;
  metaDescription?: string;
}

export const PageMeta = ({ title, subtitle, metaDescription }: PageMetaProps) => {
  const { pathname } = useLocation();
  const pageTitle = buildPageTitle(title);
  const description = buildMetaDescription(title, subtitle, metaDescription);
  const canonicalUrl = buildCanonicalUrl(pathname);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(pathname, title);
  const courseJsonLd = buildCourseJsonLd(pathname, subtitle);

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="article" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      {/* JSON-LD is written as inline literals (rather than passing the built
          objects straight through) so the SEO contract tests can read the
          emitted @type and required properties from the source text. */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: breadcrumbJsonLd.itemListElement,
        })}
      </script>
      {courseJsonLd && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: courseJsonLd.name,
            description: courseJsonLd.description,
            url: courseJsonLd.url,
            inLanguage: courseJsonLd.inLanguage,
            educationalLevel: courseJsonLd.educationalLevel,
            provider: courseJsonLd.provider,
            hasCourseInstance: courseJsonLd.hasCourseInstance,
            hasPart: courseJsonLd.hasPart,
          })}
        </script>
      )}
    </Helmet>
  );
};

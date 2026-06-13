import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ChevronLeft } from "lucide-react";
import { Header } from "@/components/Header";

export interface NoteFaq {
  q: string;
  a: string;
}

export interface NoteRelated {
  label: string;
  to: string;
}

interface NoteLayoutProps {
  slug: string;
  title: string;
  description: string;
  /** ~5–10 word headline label for breadcrumbs and og:title. Defaults to title. */
  shortTitle?: string;
  /** ISO date string for Article datePublished. */
  datePublished: string;
  /** ISO date string for Article dateModified. Optional. */
  dateModified?: string;
  /** Hero/intro paragraph rendered under the H1. */
  lede: string;
  /** Main long-form body. */
  children: ReactNode;
  /** FAQ block (visible + injected into FAQPage JSON-LD). */
  faqs: NoteFaq[];
  /** Related internal links rendered at the bottom. */
  related?: NoteRelated[];
}

/**
 * Long-form, SEO-targeted note page. Each note is a single dense answer to a
 * high-intent search query (e.g. "how does sugammadex reverse rocuronium"),
 * with Article + FAQPage + BreadcrumbList JSON-LD and dense internal links
 * into the main topic curriculum.
 */
export const NoteLayout = ({
  slug,
  title,
  description,
  shortTitle,
  datePublished,
  dateModified,
  lede,
  children,
  faqs,
  related,
}: NoteLayoutProps) => {
  const url = `https://anaesthesiacore.app/notes/${slug}`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: shortTitle ?? title,
    description,
    mainEntityOfPage: url,
    url,
    inLanguage: "en-GB",
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: { "@type": "Person", name: "Dr Rob Coe" },
    publisher: {
      "@type": "Organization",
      name: "AnaesthesiaCore",
      url: "https://anaesthesiacore.app/",
    },
    about: { "@type": "Thing", name: title },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://anaesthesiacore.app/" },
      { "@type": "ListItem", position: 2, name: "Notes", item: "https://anaesthesiacore.app/notes" },
      { "@type": "ListItem", position: 3, name: shortTitle ?? title, item: url },
    ],
  };
  const faqJsonLd = faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      }
    : null;

  return (
    <>
      <Header />
      <Helmet>
        <title>{title} | AnaesthesiaCore</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={shortTitle ?? title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta name="twitter:title" content={shortTitle ?? title} />
        <meta name="twitter:description" content={description} />
        <script type="application/ld+json">{JSON.stringify(articleJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
        {faqJsonLd && (
          <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        )}
      </Helmet>
      <main className="container mx-auto px-4 py-6 sm:py-10 max-w-3xl">
        <nav aria-label="Breadcrumb" className="mb-4 text-sm">
          <ol className="flex flex-wrap items-center gap-1 text-muted-foreground">
            <li>
              <Link to="/" className="hover:text-foreground">Home</Link>
            </li>
            <li aria-hidden>›</li>
            <li>
              <Link to="/notes" className="hover:text-foreground">Notes</Link>
            </li>
            <li aria-hidden>›</li>
            <li aria-current="page" className="text-foreground truncate max-w-[18rem]">
              {shortTitle ?? title}
            </li>
          </ol>
          <Link
            to="/notes"
            className="inline-flex items-center gap-1.5 mt-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden /> All notes
          </Link>
        </nav>

        <article className="space-y-6">
          <header>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-foreground break-words">
              {title}
            </h1>
            <p className="mt-3 text-base sm:text-lg text-muted-foreground leading-relaxed">
              {lede}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Updated <time dateTime={dateModified ?? datePublished}>{(dateModified ?? datePublished).slice(0, 10)}</time>{" "}
              · By Dr Rob Coe
            </p>
          </header>

          <div className="prose prose-slate max-w-none dark:prose-invert prose-headings:font-serif prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h3:text-lg prose-h3:mt-6 prose-p:leading-relaxed prose-a:text-pharmacology hover:prose-a:underline">
            {children}
          </div>

          {faqs.length > 0 && (
            <section aria-labelledby="note-faq" className="mt-8">
              <h2 id="note-faq" className="text-2xl font-serif font-bold text-foreground mb-3">
                Frequently asked
              </h2>
              <div className="space-y-3">
                {faqs.map(({ q, a }) => (
                  <details key={q} className="group rounded-lg border border-border bg-card p-4">
                    <summary className="cursor-pointer font-semibold text-foreground">
                      {q}
                    </summary>
                    <p className="mt-2 text-foreground/90 leading-relaxed">{a}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {related && related.length > 0 && (
            <section aria-labelledby="note-related" className="mt-8 rounded-lg border border-border bg-card p-4">
              <h2 id="note-related" className="text-sm font-semibold text-foreground mb-3">
                Related on AnaesthesiaCore
              </h2>
              <ul className="space-y-1.5 text-sm">
                {related.map((r) => (
                  <li key={r.to}>
                    <Link to={r.to} className="text-pharmacology hover:underline">
                      {r.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>
      </main>
    </>
  );
};

export default NoteLayout;

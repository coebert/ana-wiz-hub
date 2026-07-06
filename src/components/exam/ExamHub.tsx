import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { allTopics, sectionMeta, type ExamTag, type Section } from "@/data/curriculum";

export interface ExamHubFaq {
  question: string;
  answer: string;
}

export interface ExamHubProps {
  /** Curriculum exam tag used to filter topics. */
  examTag: ExamTag;
  /** Short human name, e.g. "FRCA Primary". */
  examName: string;
  /** Page path including leading slash, e.g. "/frca-primary". */
  path: string;
  /** <title> override (≤60 chars). */
  metaTitle: string;
  /** Meta description (80–160 chars). */
  metaDescription: string;
  /** H1 text. */
  h1: string;
  /** Lead paragraph under the H1. */
  intro: string;
  /** FAQ entries — rendered as <details> and emitted as FAQPage JSON-LD. */
  faqs: ExamHubFaq[];
}

const SECTION_ORDER: Section[] = [
  "physics",
  "physiology",
  "pharmacology",
  "anatomy",
  "clinical",
  "intensive-care",
  "perioperative",
  "chemistry",
];

export const ExamHub = ({
  examTag,
  examName,
  path,
  metaTitle,
  metaDescription,
  h1,
  intro,
  faqs,
}: ExamHubProps) => {
  const url = `https://anaesthesiacore.app${path}`;

  // Filter the curriculum to topics tagged for this exam that we've actually
  // published. Group by section so the hub mirrors how trainees navigate.
  const matchedTopics = allTopics.filter(
    (t) => t.available && t.examTags.includes(examTag),
  );
  const grouped: Record<Section, typeof matchedTopics> = SECTION_ORDER.reduce(
    (acc, s) => ({ ...acc, [s]: [] as typeof matchedTopics }),
    {} as Record<Section, typeof matchedTopics>,
  );
  for (const t of matchedTopics) grouped[t.section].push(t);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: metaTitle,
    url,
    description: metaDescription,
    isPartOf: { "@type": "WebSite", name: "AnaesthesiaCore", url: "https://anaesthesiacore.app/" },
    hasPart: matchedTopics.map((t) => ({
      "@type": "LearningResource",
      name: t.title,
      url: `https://anaesthesiacore.app${sectionMeta[t.section].path}/${t.id}`,
      description: t.description,
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://anaesthesiacore.app/" },
      { "@type": "ListItem", position: 2, name: examName, item: url },
    ],
  };

  return (
    <>
      <Header />
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={url} />
        <script type="application/ld+json">{JSON.stringify(collectionJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Helmet>
      <main className="container mx-auto px-4 py-6 sm:py-10 max-w-3xl">
        <header className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-foreground">
            {h1}
          </h1>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground">
            {intro}
          </p>
        </header>

        <section aria-labelledby="curriculum-heading" className="mb-10">
          <h2
            id="curriculum-heading"
            className="text-2xl font-serif font-bold text-foreground mb-4"
          >
            {examName} curriculum topics
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            {matchedTopics.length} topics mapped to the {examName} syllabus.
          </p>
          <div className="space-y-6">
            {SECTION_ORDER.map((s) => {
              const items = grouped[s];
              if (!items.length) return null;
              const meta = sectionMeta[s];
              return (
                <div key={s}>
                  <h3 className="text-lg font-serif font-bold text-foreground mb-2">
                    <Link to={meta.path} className="hover:underline">
                      {meta.label}
                    </Link>
                  </h3>
                  <ul className="space-y-1.5">
                    {items.map((t) => (
                      <li key={t.id}>
                        <Link
                          to={`${meta.path}/${t.id}`}
                          className="block rounded-md border border-border bg-card px-3 py-2 hover:bg-muted/40 transition-colors"
                        >
                          <span className="font-semibold text-foreground">
                            {t.title}
                          </span>
                          <span className="block text-sm text-muted-foreground leading-snug">
                            {t.description}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        <section aria-labelledby="faq-heading">
          <h2
            id="faq-heading"
            className="text-2xl font-serif font-bold text-foreground mb-4"
          >
            {examName} FAQ
          </h2>
          <div className="space-y-2">
            {faqs.map((f) => (
              <details
                key={f.question}
                className="rounded-md border border-border bg-card px-3 py-2 group"
              >
                <summary className="cursor-pointer font-semibold text-foreground">
                  {f.question}
                </summary>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {f.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default ExamHub;

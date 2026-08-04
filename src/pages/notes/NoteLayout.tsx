import { ReactNode } from "react";
import { PageSection } from "@/components/layout/PageSection";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ChevronLeft, Atom, HeartPulse, FlaskConical, Stethoscope, Activity, ClipboardList, ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { supabase } from "@/integrations/supabase/client";

/**
 * Fire-and-forget log of a "Jump to related topic" card click into
 * public.note_jump_clicks. Read by the admin dashboard to rank which
 * canonical topics notes actually feed traffic into.
 */
function logJumpClick(args: {
  noteSlug: string;
  targetPath: string;
  targetSection: string;
  targetLabel: string;
}) {
  let visitor_id: string | null = null;
  try {
    visitor_id = localStorage.getItem("visitor_id");
  } catch {
    // ignore storage errors
  }
  void supabase
    .from("note_jump_clicks")
    .insert({
      note_slug: args.noteSlug,
      target_path: args.targetPath,
      target_section: args.targetSection,
      target_label: args.targetLabel,
      visitor_id,
    })
    .then(({ error }) => {
      if (error) console.warn("[note-jump-click] insert failed", error.message);
    });
}

const SECTION_META: Record<
  string,
  { label: string; icon: typeof Atom; tone: string }
> = {
  physics: { label: "Physics", icon: Atom, tone: "border-physics/40 bg-physics/5 text-physics hover:bg-physics/10" },
  physiology: { label: "Physiology", icon: HeartPulse, tone: "border-physiology/40 bg-physiology/5 text-physiology hover:bg-physiology/10" },
  pharmacology: { label: "Pharmacology", icon: FlaskConical, tone: "border-pharmacology/40 bg-pharmacology/5 text-pharmacology hover:bg-pharmacology/10" },
  clinical: { label: "Clinical", icon: Stethoscope, tone: "border-clinical/40 bg-clinical/5 text-clinical hover:bg-clinical/10" },
  "intensive-care": { label: "Intensive Care", icon: Activity, tone: "border-icu/40 bg-icu/5 text-icu hover:bg-icu/10" },
  perioperative: { label: "Perioperative", icon: ClipboardList, tone: "border-perioperative/40 bg-perioperative/5 text-perioperative hover:bg-perioperative/10" },
};

const CANONICAL_SECTIONS = new Set(["physics", "physiology", "pharmacology", "clinical", "intensive-care", "perioperative"]);

export interface NoteFaq {
  q: string;
  a: string;
}

export interface NoteRelated {
  label: string;
  to: string;
}

export type NoteExamTag = "primary" | "final" | "fficm" | "edic";

const EXAM_LABEL: Record<NoteExamTag, string> = {
  primary: "FRCA Primary",
  final: "FRCA Final",
  fficm: "FFICM",
  edic: "EDIC",
};

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
  /** Exam curriculum mapping shown as small chips under the lede. */
  examTags?: NoteExamTag[];
  /** Optional curriculum-reference codes (e.g. RCoA "PO_BK_03"). */
  curriculumCodes?: string[];
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
  examTags,
  curriculumCodes,
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
  // The prerenderer bakes an identical FAQPage block into the static head for
  // every note route. Skip the client-side copy when it's already there so
  // crawlers never see two FAQPage graphs on the same page.
  const hasPrerenderedFaq =
    typeof document !== "undefined" &&
    !!document.querySelector('script[data-prerender="faqpage"]');
  const faqJsonLd = faqs.length && !hasPrerenderedFaq
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


  // SEO: keep <title> ≤ 60 chars without cutting mid-word. Prefer the full
  // headline + suffix, then the shortTitle (+ suffix), then the bare headline,
  // and only as a last resort trim at a word boundary with an ellipsis.
  const SUFFIX = " | AnaesthesiaCore";
  const trimAtWord = (s: string, max: number) => {
    if (s.length <= max) return s;
    const cut = s.slice(0, max - 1);
    const space = cut.lastIndexOf(" ");
    return `${(space > max * 0.5 ? cut.slice(0, space) : cut).trimEnd()}…`;
  };
  const short = shortTitle ?? title;
  const candidates = [`${title}${SUFFIX}`, `${short}${SUFFIX}`, title, short];
  const pageTitle = candidates.find((c) => c.length <= 60) ?? trimAtWord(short, 60);
  const ogTitleRaw = short;
  const ogTitle = ogTitleRaw.length <= 60 ? ogTitleRaw : trimAtWord(ogTitleRaw, 60);

  return (
    <>
      <Header />
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta name="twitter:title" content={ogTitle} />
        <meta name="twitter:description" content={description} />
        <script type="application/ld+json">{JSON.stringify(articleJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
        {faqJsonLd && (
          <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        )}
      </Helmet>
      <PageSection as="main" spacing="tight" width="narrow">
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
            {examTags && examTags.length > 0 && (
              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mr-1">
                  Curriculum:
                </span>
                {examTags.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] uppercase tracking-wide font-semibold px-2 py-0.5 rounded-full border border-pharmacology/30 bg-pharmacology/5 text-pharmacology"
                  >
                    {EXAM_LABEL[t]}
                  </span>
                ))}
                {curriculumCodes?.map((c) => (
                  <span
                    key={c}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-border bg-muted/40 text-muted-foreground"
                  >
                    {c}
                  </span>
                ))}
              </div>
            )}
            <p className="mt-2 text-xs text-muted-foreground">
              Updated <time dateTime={dateModified ?? datePublished}>{(dateModified ?? datePublished).slice(0, 10)}</time>{" "}
              · By Dr Rob Coe
            </p>
          </header>

          {(() => {
            const jumpTopics = (related ?? [])
              .map((r) => {
                const match = r.to.match(/^\/([^/]+)\/[^/]+/);
                if (!match) return null;
                const section = match[1];
                if (!CANONICAL_SECTIONS.has(section)) return null;
                return { ...r, section };
              })
              .filter((x): x is NoteRelated & { section: string } => x !== null);

            if (jumpTopics.length === 0) return null;

            return (
              <section aria-labelledby="note-jump-to" className="not-prose">
                <h2
                  id="note-jump-to"
                  className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-2"
                >
                  Jump to related topic
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {jumpTopics.map((t) => {
                    const meta = SECTION_META[t.section];
                    const Icon = meta?.icon ?? ArrowRight;
                    return (
                      <Link
                        key={t.to}
                        to={t.to}
                        onClick={() =>
                          logJumpClick({
                            noteSlug: slug,
                            targetPath: t.to,
                            targetSection: t.section,
                            targetLabel: meta?.label ?? t.section,
                          })
                        }
                        className={`group flex items-center gap-3 rounded-lg border px-3 py-2.5 transition-colors ${
                          meta?.tone ?? "border-border bg-card hover:bg-muted/40"
                        }`}
                      >
                        <Icon className="h-4 w-4 shrink-0" aria-hidden />
                        <div className="min-w-0 flex-1">
                          <div className="text-[10px] uppercase tracking-wide font-semibold opacity-70">
                            {meta?.label ?? t.section}
                          </div>
                          <div className="text-sm font-medium text-foreground truncate">
                            {t.label}
                          </div>
                        </div>
                        <ArrowRight className="h-3.5 w-3.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden />
                      </Link>
                    );
                  })}
                </div>
              </section>
            );
          })()}

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
      </PageSection>
    </>
  );
};

export default NoteLayout;

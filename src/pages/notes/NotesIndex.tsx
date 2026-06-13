import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";

interface NoteEntry {
  slug: string;
  title: string;
  description: string;
  tag: string;
}

const notes: NoteEntry[] = [
  {
    slug: "how-sugammadex-reverses-rocuronium",
    title: "How does sugammadex reverse rocuronium?",
    description:
      "1:1 cyclodextrin encapsulation, dosing by TOF and PTC, contraceptive failure, and when neostigmine is still the right choice.",
    tag: "Pharmacology",
  },
  {
    slug: "context-sensitive-half-time-propofol-vs-remifentanil",
    title: "Context-sensitive half-time: propofol vs remifentanil",
    description:
      "Why propofol's CSHT rises modestly with infusion length, remifentanil's stays flat at ~3–4 minutes, and how to use that in TIVA planning.",
    tag: "Pharmacology",
  },
  {
    slug: "p50-fetal-haemoglobin",
    title: "P50 of fetal haemoglobin",
    description:
      "Why HbF sits ~7 mmHg left of HbA, the 2,3-DPG mechanism, the double Bohr effect at the placenta, and the perinatal switch to HbA.",
    tag: "Physiology",
  },
];

const url = "https://anaesthesiacore.app/notes";

const NotesIndex = () => (
  <>
    <Header />
    <Helmet>
      <title>Notes — focused answers to common FRCA questions | AnaesthesiaCore</title>
      <meta
        name="description"
        content="Long-form notes that answer high-yield FRCA Primary and Final exam questions in depth — pharmacokinetics, neuromuscular pharmacology, fetal physiology and more."
      />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="AnaesthesiaCore Notes" />
      <meta
        property="og:description"
        content="Focused, exam-shaped answers to high-yield FRCA questions, with citations and links into the wider curriculum."
      />
      <meta property="og:url" content={url} />
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "AnaesthesiaCore Notes",
        url,
        description:
          "Long-form notes answering high-yield FRCA exam questions in depth.",
        isPartOf: { "@type": "WebSite", name: "AnaesthesiaCore", url: "https://anaesthesiacore.app/" },
        hasPart: notes.map((n) => ({
          "@type": "Article",
          headline: n.title,
          url: `${url}/${n.slug}`,
          description: n.description,
        })),
      })}</script>
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://anaesthesiacore.app/" },
          { "@type": "ListItem", position: 2, name: "Notes", item: url },
        ],
      })}</script>
    </Helmet>
    <main className="container mx-auto px-4 py-6 sm:py-10 max-w-3xl">
      <header className="mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-foreground">
          Notes
        </h1>
        <p className="mt-3 text-base sm:text-lg text-muted-foreground">
          Focused, long-form answers to high-yield FRCA exam questions. Each
          note sits alongside the main curriculum and links back to the full
          topic for deeper context.
        </p>
      </header>
      <ul className="space-y-3">
        {notes.map((n) => (
          <li key={n.slug}>
            <Link
              to={`/notes/${n.slug}`}
              className="block rounded-lg border border-border bg-card p-4 hover:bg-muted/40 transition-colors"
            >
              <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-1">
                {n.tag}
              </p>
              <h2 className="text-lg font-serif font-bold text-foreground">
                {n.title}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                {n.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  </>
);

export default NotesIndex;

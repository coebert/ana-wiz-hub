import { Link } from "react-router-dom";
import { PageSection } from "@/components/layout/PageSection";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";

type ExamTag = "primary" | "final" | "fficm" | "edic";

interface NoteEntry {
  slug: string;
  title: string;
  description: string;
  tag: string;
  examTags: ExamTag[];
}

const EXAM_LABEL: Record<ExamTag, string> = {
  primary: "FRCA Primary",
  final: "FRCA Final",
  fficm: "FFICM",
  edic: "EDIC",
};

const notes: NoteEntry[] = [
  {
    slug: "cardiac-output-formula",
    title: "Cardiac output formula: Fick, thermodilution and CO = SV × HR",
    description:
      "The three ways to derive cardiac output: SV × HR at the bedside, Fick's V̇O₂ / (CaO₂ − CvO₂), and the Stewart–Hamilton thermodilution equation.",
    tag: "Physiology",
    examTags: ["primary", "final", "fficm"],
  },
  {
    slug: "anaesthesia-for-robotic-surgery-guide",
    title: "Anaesthesia for robotic surgery: a practical guide",
    description:
      "Positioning, pneumoperitoneum and steep Trendelenburg physiology, ventilation, fluids, and emergency undocking for robot-assisted cases.",
    tag: "Clinical",
    examTags: ["final", "fficm"],
  },
  {
    slug: "rapid-sequence-induction-drug-doses",
    title: "Rapid sequence induction: drugs and doses",
    description:
      "Adult and paediatric RSI drug doses, modifications for shock, head injury and obstetrics, and the modern role of cricoid pressure.",
    tag: "Clinical",
    examTags: ["primary", "final"],
  },
  {
    slug: "das-difficult-airway-algorithm",
    title: "DAS unanticipated difficult intubation algorithm",
    description:
      "Plans A–D, the criteria for each transition, scalpel–bougie–tube front-of-neck access, and the human-factors anchors built into the 2015 algorithm.",
    tag: "Clinical",
    examTags: ["final", "fficm"],
  },
  {
    slug: "local-anaesthetic-systemic-toxicity-management",
    title: "LAST: local anaesthetic systemic toxicity management",
    description:
      "Recognition, AAGBI immediate management, Intralipid 20% dosing, modified ALS for bupivacaine arrest, and prevention strategies.",
    tag: "Pharmacology",
    examTags: ["primary", "final"],
  },
  {
    slug: "rotem-teg-interpretation",
    title: "ROTEM/TEG interpretation in major haemorrhage",
    description:
      "EXTEM, INTEM, FIBTEM and APTEM channels — what each abnormal pattern means and which blood product to give.",
    tag: "Clinical",
    examTags: ["final", "fficm"],
  },
  {
    slug: "tof-ratio-before-extubation",
    title: "Why TOF ratio ≥ 0.9 before extubation?",
    description:
      "Residual neuromuscular block, why clinical signs are not enough, and how to combine quantitative monitoring with sugammadex or neostigmine.",
    tag: "Pharmacology",
    examTags: ["primary", "final"],
  },
  {
    slug: "mac-for-age-formula",
    title: "MAC for age: how MAC changes with age",
    description:
      "The Mapleson age-adjustment formula, the ~6% per decade rule, and why titrating to age-adjusted MAC matters in elderly anaesthesia.",
    tag: "Pharmacology",
    examTags: ["primary", "final"],
  },
  {
    slug: "sevoflurane-vs-desflurane-recovery",
    title: "Sevoflurane vs desflurane: recovery and clinical choice",
    description:
      "Blood–gas coefficients, emergence times, side-effect profile, environmental footprint, and why UK practice has deselected desflurane.",
    tag: "Pharmacology",
    examTags: ["primary", "final"],
  },
  {
    slug: "apfel-score-ponv-risk",
    title: "Apfel score: predicting postoperative nausea and vomiting",
    description:
      "The four risk factors, the 10/20/40/60/80% gradient, and the SAMBA-2020 mapping to multimodal antiemetic prophylaxis.",
    tag: "Clinical",
    examTags: ["primary", "final"],
  },
  {
    slug: "mapleson-breathing-systems-explained",
    title: "Mapleson breathing systems A to F explained",
    description:
      "Component order of Mapleson A–F, fresh gas flow requirements for spontaneous vs controlled ventilation, and which system is used when.",
    tag: "Equipment",
    examTags: ["primary"],
  },
  {
    slug: "bain-circuit-fresh-gas-flow",
    title: "Bain circuit fresh gas flow for spontaneous and controlled ventilation",
    description:
      "Co-axial Mapleson D anatomy, the Pethick safety test, and why the Bain is efficient for IPPV but wasteful for spontaneous ventilation.",
    tag: "Equipment",
    examTags: ["primary"],
  },
  {
    slug: "how-sugammadex-reverses-rocuronium",
    title: "How does sugammadex reverse rocuronium?",
    description:
      "1:1 cyclodextrin encapsulation, dosing by TOF and PTC, contraceptive failure, and when neostigmine is still the right choice.",
    tag: "Pharmacology",
    examTags: ["primary", "final"],
  },
  {
    slug: "context-sensitive-half-time-propofol-vs-remifentanil",
    title: "Context-sensitive half-time: propofol vs remifentanil",
    description:
      "Why propofol's CSHT rises modestly with infusion length, remifentanil's stays flat at ~3–4 minutes, and how to use that in TIVA planning.",
    tag: "Pharmacology",
    examTags: ["primary", "final"],
  },
  {
    slug: "p50-fetal-haemoglobin",
    title: "P50 of fetal haemoglobin",
    description:
      "Why HbF sits ~7 mmHg left of HbA, the 2,3-DPG mechanism, the double Bohr effect at the placenta, and the perinatal switch to HbA.",
    tag: "Physiology",
    examTags: ["primary"],
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
    <PageSection as="main" spacing="tight" width="narrow">
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
              <div className="flex flex-wrap items-center gap-1.5 mb-1">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">
                  {n.tag}
                </span>
                {n.examTags.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] uppercase tracking-wide font-semibold px-1.5 py-0.5 rounded-full border border-pharmacology/30 bg-pharmacology/5 text-pharmacology"
                  >
                    {EXAM_LABEL[t]}
                  </span>
                ))}
              </div>
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
    </PageSection>
  </>
);

export default NotesIndex;

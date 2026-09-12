import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { BookOpen, Headphones, Mic, ArrowRight, ChevronDown, BookMarked, Sparkles, GraduationCap } from "lucide-react";
import NeonSplash from "@/components/layout/NeonSplash";
import type { DemoVivaQuestion } from "@/components/viva/DemoVivaStepper";
import { ContinueBand } from "@/components/landing/ContinueBand";
import { HomeDashboard } from "@/components/landing/HomeDashboard";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageSection } from "@/components/layout/PageSection";
import { citationStats } from "@/lib/citationStats";

// Below-the-fold bands are code-split so the hero + dashboard paint without
// waiting on the comment wall, support widgets, or the viva stepper bundle.
const SupportSection = lazy(() =>
  import("@/components/feedback/SupportSection").then((m) => ({ default: m.SupportSection })),
);
const CommentWall = lazy(() =>
  import("@/components/feedback/CommentWall").then((m) => ({ default: m.CommentWall })),
);
const DemoVivaStepper = lazy(() => import("@/components/viva/DemoVivaStepper"));


const nf = new Intl.NumberFormat("en-GB");
// Round down to the nearest 10 so the headline number reads cleanly while
// staying honest as references are added.
const roundDown = (n: number, step = 10) => Math.max(step, Math.floor(n / step) * step);
const CITATION_COUNT = roundDown(citationStats.totalCitations);
const SOURCE_COUNT = roundDown(citationStats.uniqueSources);
const TOPIC_COUNT = citationStats.topicsWithRefs;

const DEMO_QUESTIONS: DemoVivaQuestion[] = [
  {
    tag: "Clinical",
    difficulty: "Final",
    question:
      "A 68-year-old man is anuric 6 hours after an open AAA repair. Walk me through your immediate assessment and the first three things you would do.",
    answer:
      "I'd take an A–E approach. After confirming a patent airway and adequate ventilation, I'd review haemodynamics — MAP, CVP, lactate and urine output trend — and think in terms of pre-renal, renal and post-renal causes. My first three actions would be: flush and check the urinary catheter for obstruction; assess volume status with a passive leg raise or fluid challenge of 250 mL crystalloid; and send bloods for U&E, FBC, lactate and a venous gas while reviewing the operative note for cross-clamp time and blood loss.",
    feedback: [
      { label: "Structure (5/5)", text: "Excellent — pre-renal/renal/post-renal framework signposted clearly and an A–E backbone." },
      { label: "Knowledge (4/5)", text: "Catheter check first is exactly right post-laparotomy. Could also mention bladder scan and reviewing recent nephrotoxins (contrast, NSAIDs, gentamicin)." },
      { label: "Communication (4/5)", text: "Confident and well-paced. Slow down slightly when listing investigations so the examiner can follow each one." },
    ],
    curriculum: [
      { exam: "Final", code: "CT_BK_22", topic: "Postoperative acute kidney injury — recognition and management" },
      { exam: "Final", code: "VS_BK_05", topic: "Anaesthesia for open and endovascular aortic surgery" },
      { exam: "Primary", code: "RP_BK_07", topic: "Renal physiology — GFR, autoregulation and oliguria" },
    ],
  },
  {
    tag: "Physiology",
    difficulty: "Primary",
    question:
      "Define the oxygen cascade and outline the main steps from inspired air to mitochondrion.",
    answer:
      "The oxygen cascade describes the stepwise fall in PO₂ from atmospheric air to the mitochondrion. Atmospheric PO₂ is around 21 kPa. Once humidified in the airway, inspired PO₂ falls to about 20 kPa. Alveolar PO₂ is roughly 13.3 kPa, calculated using the alveolar gas equation. Arterial PO₂ is slightly lower at about 13 kPa due to V/Q mismatch and shunt. Capillary PO₂ falls further as oxygen is offloaded, and mitochondrial PO₂ is only 0.5–3 kPa — the Pasteur point below which oxidative phosphorylation fails.",
    feedback: [
      { label: "Structure (5/5)", text: "Textbook stepwise cascade — easy to follow." },
      { label: "Knowledge (5/5)", text: "Accurate values and correct mention of the alveolar gas equation and Pasteur point." },
      { label: "Communication (4/5)", text: "Very clear; consider sketching the cascade if a whiteboard is offered — examiners reward visual structure." },
    ],
    curriculum: [
      { exam: "Primary", code: "RP_BK_01", topic: "Oxygen cascade and alveolar gas equation" },
      { exam: "Primary", code: "RP_BK_03", topic: "Pulmonary gas exchange — V/Q matching and shunt" },
      { exam: "Primary", code: "CP_BK_06", topic: "Tissue oxygen delivery and the Pasteur point" },
    ],
  },
  {
    tag: "Pharmacology",
    difficulty: "Final",
    question:
      "Compare the pharmacokinetics of propofol and remifentanil when used together for total intravenous anaesthesia.",
    answer:
      "Both are ideal TIVA agents because of their short context-sensitive half-times. Propofol follows a three-compartment model with rapid redistribution; its CSHT rises modestly with infusion duration but stays under 40 minutes even after long cases. Remifentanil is metabolised by non-specific tissue and plasma esterases, giving it a CSHT of around 3–5 minutes regardless of infusion length. Synergy means lower doses of each are needed; typical effect-site targets are propofol 3–5 µg/mL and remifentanil 3–6 ng/mL, titrated to processed EEG depth and haemodynamics.",
    feedback: [
      { label: "Structure (4/5)", text: "Logical comparison. State up front that you'll cover absorption, distribution, metabolism and elimination for full marks." },
      { label: "Knowledge (5/5)", text: "Strong on CSHT, esterase metabolism and synergy. Good clinical target ranges." },
      { label: "Communication (4/5)", text: "Confident delivery. Pause briefly after each comparison to invite the examiner to probe further." },
    ],
    curriculum: [
      { exam: "Primary", code: "PH_BK_04", topic: "Pharmacokinetics — compartment models and context-sensitive half-time" },
      { exam: "Primary", code: "PH_BK_09", topic: "Intravenous induction agents — propofol" },
      { exam: "Final", code: "GA_BK_11", topic: "Total intravenous anaesthesia (TIVA) — TCI and EEG-guided depth" },
      { exam: "Primary", code: "PH_BK_12", topic: "Opioid pharmacology — remifentanil and esterase metabolism" },
    ],
  },
];

/**
 * Landing page (`/`).
 *
 * Recomposed to match `/revise`: a calm split editorial hero (brand + factual
 * lede + primary CTAs on the left, a compact "what you get" summary card on
 * the right) sits above the personalised dashboard, continue-band, and a
 * restrained 4-column tool index. Rainbow icon-bg tiles are gone — each tool
 * card carries a single category dot on the title and a left rule in the
 * matching HSL token, mirroring the discipline grid on `/revise`. Downstream
 * bands (evidence, viva demo, comment wall, support) are unchanged in
 * substance but ride on the new token/elevation system.
 */
type Tool = {
  title: string;
  description: string;
  icon: typeof BookOpen;
  to: string;
  dotClass: string;
  ruleColorVar: string;
};

const tools: Tool[] = [
  {
    title: "Revise",
    description: "Browse the full curriculum by section and dive into structured topic notes.",
    icon: BookOpen,
    to: "/revise",
    dotClass: "bg-physiology",
    ruleColorVar: "--physiology",
  },
  {
    title: "Podcast",
    description: "Listen to AI-generated topic podcasts on the go — perfect for commutes.",
    icon: Headphones,
    to: "/podcasts",
    dotClass: "bg-pharmacology",
    ruleColorVar: "--pharmacology",
  },
  {
    title: "Viva Practice",
    description: "Practise out loud with an AI examiner who gives rubric-based feedback on spoken answers.",
    icon: Mic,
    to: "/viva",
    dotClass: "bg-clinical",
    ruleColorVar: "--clinical",
  },
  {
    title: "Ask AI",
    description: "Ask any curriculum question and get a grounded answer linked to the relevant topics.",
    icon: Sparkles,
    to: "/ask",
    dotClass: "bg-physics",
    ruleColorVar: "--physics",
  },
];

const Landing = () => {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-background flex flex-col">
      <NeonSplash />
      <Helmet>
        <title>AnaesthesiaCore – FRCA & FFICM Revision</title>
        <meta
          name="description"
          content="Master anaesthesia and intensive care with interactive diagrams, quizzes, and exam-focused summaries. Mapped to FRCA & FFICM curricula."
        />
        <link rel="canonical" href="https://anaesthesiacore.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="AnaesthesiaCore – FRCA & FFICM Revision" />
        <meta
          property="og:description"
          content="Interactive diagrams, quizzes and exam-focused summaries for anaesthesia and intensive care, mapped to the FRCA and FFICM curricula."
        />
        <meta property="og:url" content="https://anaesthesiacore.app/" />
        <meta name="twitter:title" content="AnaesthesiaCore – FRCA & FFICM Revision" />
        <meta
          name="twitter:description"
          content="Interactive diagrams, quizzes and exam-focused summaries for anaesthesia and intensive care, mapped to the FRCA and FFICM curricula."
        />
      </Helmet>

      {/* Hero — split editorial layout, matches /revise */}
      <section className="relative border-b border-border bg-surface">
        <PageContainer className="py-10 md:py-16">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-12 items-start">
            {/* Left: brand + factual lede + CTAs */}
            <div>
              <p className="eyebrow text-muted-foreground mb-3">
                <GraduationCap className="inline h-3.5 w-3.5 mr-1.5 -mt-0.5" aria-hidden />
                FRCA Primary · FRCA Final · FFICM
              </p>
              <h1 className="display text-foreground">AnaesthesiaCore — FRCA &amp; FFICM Revision</h1>
              <p className="lead mt-4 text-foreground/75">
                A study companion for FRCA Primary, Final and FFICM trainees. Three tools in one place:{" "}
                <strong className="font-semibold text-foreground">structured curriculum notes</strong>,{" "}
                <strong className="font-semibold text-foreground">AI-generated topic podcasts</strong>, and an{" "}
                <strong className="font-semibold text-foreground">AI viva examiner</strong> that gives rubric-based feedback on your spoken answers.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild variant="cta" size="lg">
                  <Link to="/revise">
                    Start revising
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/viva">
                    <Mic className="h-4 w-4" />
                    Take a viva
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="lg">
                  <Link to="/ask">
                    <Sparkles className="h-4 w-4" />
                    Ask AI
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right: "What you get" summary card */}
            <aside
              aria-label="What you get"
              className="rounded-xl border border-border bg-card shadow-elev-1 p-5 lg:sticky lg:top-24"
            >
              <p className="eyebrow text-muted-foreground mb-4">What you get</p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <BookOpen className="h-4 w-4 mt-0.5 shrink-0 text-physiology" aria-hidden />
                  <span className="text-foreground/85">
                    <strong className="font-semibold text-foreground">Full curriculum notes</strong>{" "}
                    — mapped to Primary, Final and FFICM syllabi.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Headphones className="h-4 w-4 mt-0.5 shrink-0 text-pharmacology" aria-hidden />
                  <span className="text-foreground/85">
                    <strong className="font-semibold text-foreground">Topic podcasts</strong>{" "}
                    for on-call and commute revision.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Mic className="h-4 w-4 mt-0.5 shrink-0 text-clinical" aria-hidden />
                  <span className="text-foreground/85">
                    <strong className="font-semibold text-foreground">AI viva examiner</strong>{" "}
                    with structured, rubric-based feedback.
                  </span>
                </li>
              </ul>
              <div className="mt-5 pt-4 border-t border-border">
                <p className="text-[11px] text-muted-foreground mono">
                  {nf.format(CITATION_COUNT)}+ citations · {nf.format(SOURCE_COUNT)}+ sources · {nf.format(TOPIC_COUNT)} topics
                </p>
              </div>
            </aside>
          </div>
        </PageContainer>
      </section>

      <PageSection spacing="default" width="full" className="flex-1">
        <div className="max-w-6xl mx-auto mb-8">
          <HomeDashboard />
        </div>

        <ContinueBand />

        {/* Tools — restrained grid, category dot + left rule */}
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <p className="eyebrow text-muted-foreground mb-2">Tools</p>
            <h2 className="h2">Pick where to start</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {tools.map(({ title, description, icon: Icon, to, dotClass, ruleColorVar }) => (
              <Link
                key={to}
                to={to}
                className="group relative flex flex-col rounded-xl border border-border bg-card p-5 shadow-elev-1 transition-[transform,box-shadow,border-color] duration-150 ease-out hover:-translate-y-px hover:shadow-elev-2 hover:border-foreground/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                style={{
                  borderLeftWidth: "3px",
                  borderLeftColor: `hsl(var(${ruleColorVar}))`,
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <Icon className="h-5 w-5 text-muted-foreground" aria-hidden />
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-0.5 group-hover:text-foreground transition-all" />
                </div>
                <h3 className="h4 mb-1 flex items-center gap-2">
                  <span className={`h-1.5 w-1.5 rounded-full ${dotClass}`} aria-hidden />
                  {title}
                </h3>
                <p className="small leading-relaxed flex-1">{description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Evidence base — calm bordered band, no gradient */}
        <section
          aria-label="Evidence base"
          className="mt-10 md:mt-14 max-w-5xl mx-auto rounded-xl border border-border bg-card shadow-elev-1 px-5 py-6 md:px-8 md:py-7"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div className="flex items-start gap-3">
              <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <BookMarked className="h-5 w-5" />
              </div>
              <div>
                <p className="eyebrow text-muted-foreground">Evidence base</p>
                <p className="h3 mt-1">
                  <span className="text-primary mono">{nf.format(CITATION_COUNT)}+</span> inline citations across{" "}
                  <span className="text-primary mono">{nf.format(SOURCE_COUNT)}+</span> peer-reviewed sources
                </p>
                <p className="small mt-1.5 leading-relaxed">
                  BJA Education, NICE, AAGBI, DAS, SSC and the standard FRCA textbooks — every dose, threshold and recommendation links back to a named source.
                </p>
              </div>
            </div>
            <dl className="grid grid-cols-3 gap-4 md:gap-6 text-center md:text-left md:border-l md:border-border md:pl-6 shrink-0">
              <div>
                <dt className="eyebrow text-muted-foreground">Citations</dt>
                <dd className="mono text-xl font-semibold text-foreground mt-0.5">{nf.format(CITATION_COUNT)}+</dd>
              </div>
              <div>
                <dt className="eyebrow text-muted-foreground">Sources</dt>
                <dd className="mono text-xl font-semibold text-foreground mt-0.5">{nf.format(SOURCE_COUNT)}+</dd>
              </div>
              <div>
                <dt className="eyebrow text-muted-foreground">Topics</dt>
                <dd className="mono text-xl font-semibold text-foreground mt-0.5">{nf.format(TOPIC_COUNT)}</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* Viva demo — calm bordered container, no gradient wrap */}
        <section className="mt-10 md:mt-14 max-w-5xl mx-auto">
          <details className="group rounded-xl border border-border bg-card shadow-elev-1 overflow-hidden">
            <summary className="flex items-center justify-between gap-3 cursor-pointer list-none px-5 py-4 md:px-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-clinical/10 text-clinical">
                  <Mic className="h-4 w-4" />
                </span>
                <span className="h3">See a taste of Viva Practice</span>
              </div>
              <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform group-open:rotate-180" />
            </summary>
            <div className="px-5 pb-6 pt-2 md:px-6 border-t border-border">
              <p className="small mb-6 max-w-2xl mt-4">
                A worked example: three viva questions, model candidate answers, and the kind of constructive feedback the AI examiner gives.
              </p>
              <DemoVivaStepper questions={DEMO_QUESTIONS} />
            </div>
          </details>
        </section>
      </PageSection>

      <CommentWall />

      <SupportSection />

      <SiteFooter extraLinks={[{ label: "Admin", href: "/admin" }]} />

    </main>
  );
};

export default Landing;

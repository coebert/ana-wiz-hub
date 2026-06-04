import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { BookOpen, Headphones, Mic, ArrowRight, ChevronDown, BookMarked } from "lucide-react";
import brainLogo from "/brain-logo.webp";
import NeonSplash from "@/components/NeonSplash";
import { SupportSection } from "@/components/SupportSection";
import { CommentWall } from "@/components/CommentWall";
import DemoVivaStepper, { type DemoVivaQuestion } from "@/components/DemoVivaStepper";
import { citationStats } from "@/lib/citationStats";

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

interface LandingChoice {
  title: string;
  description: string;
  icon: typeof BookOpen;
  to: string;
  /** Tailwind colour token used for the icon + accent ring. */
  accent: string;
}

interface LandingChoiceExt extends LandingChoice {
  iconBg: string;
}

const choices: LandingChoiceExt[] = [
  {
    title: "Revise",
    description: "Browse the full curriculum by section and dive into structured topic notes.",
    icon: BookOpen,
    to: "/revise",
    accent: "text-physiology",
    iconBg: "bg-physiology/10",
  },
  {
    title: "Podcast",
    description: "Listen to AI-generated topic podcasts on the go — perfect for commutes.",
    icon: Headphones,
    to: "/podcasts",
    accent: "text-pharmacology",
    iconBg: "bg-pharmacology/10",
  },
  {
    title: "Viva Practice",
    description: "Practise out loud with an AI examiner who listens to your spoken answers and gives constructive, rubric-based feedback.",
    icon: Mic,
    to: "/viva",
    accent: "text-clinical",
    iconBg: "bg-clinical/10",
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
        <meta property="og:url" content="https://anaesthesiacore.app/" />
      </Helmet>
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-hero)" }}
        />
        {/* Contrast overlay — ensures text legibility in both light and dark modes */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40" />
        <div className="relative container mx-auto px-4 py-12 md:py-20">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
            <img
              src={brainLogo}
              alt="AnaesthesiaCore brain and pulse logo"
              width={288}
              height={288}
              fetchPriority="high"
              decoding="async"
              className="h-52 w-52 md:h-72 md:w-72 mb-6 invert brightness-200 [filter:invert(1)_brightness(2)_drop-shadow(0_4px_12px_rgba(0,0,0,0.35))]"
            />
            <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-3 tracking-tight [text-shadow:0_2px_8px_rgba(0,0,0,0.35)]">
              AnaesthesiaCore — FRCA &amp; FFICM Revision
            </h1>
            <p className="text-base md:text-lg text-white/90 mb-4 max-w-2xl [text-shadow:0_1px_4px_rgba(0,0,0,0.3)]">
              AnaesthesiaCore is a study companion for FRCA Primary, Final and FFICM trainees — built around the official curriculum to help you revise efficiently, learn on the move, and rehearse out loud before exam day.
            </p>
            <p className="text-sm md:text-base text-white/85 mb-5 max-w-2xl [text-shadow:0_1px_4px_rgba(0,0,0,0.3)]">
              Three tools in one place: <strong className="font-semibold text-white">structured curriculum notes</strong> for focused revision, <strong className="font-semibold text-white">AI-generated topic podcasts</strong> for hands-free learning, and an <strong className="font-semibold text-white">AI viva examiner</strong> that listens to your spoken answers and gives rubric-based feedback.
            </p>
            <p className="font-display text-2xl md:text-3xl font-semibold text-white/95 mb-2 tracking-tight [text-shadow:0_1px_6px_rgba(0,0,0,0.3)]">
              How would you like to study today?
            </p>
            <p className="text-base md:text-lg text-white/90 [text-shadow:0_1px_4px_rgba(0,0,0,0.3)]">
              Pick a mode below — read the notes, listen on the move, or rehearse out loud.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:py-16 flex-1">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 max-w-5xl mx-auto">
          {choices.map(({ title, description, icon: Icon, to, accent, iconBg }) => (
            <Link
              key={to}
              to={to}
              className="group relative flex flex-col rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <div className="flex items-center justify-between mb-5">
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${iconBg} ${accent}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <ArrowRight className="h-5 w-5 text-primary/60 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </div>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
                {title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                {description}
              </p>
            </Link>
          ))}
        </div>
        <section className="mt-12 md:mt-16 max-w-5xl mx-auto">
          <details
            className="group relative overflow-hidden rounded-2xl border border-primary/20 shadow-sm"
            style={{ background: "var(--gradient-hero)" }}
          >
            {/* Soft overlay so content cards still pop on the gradient */}
            <div className="absolute inset-0 bg-background/0 dark:bg-background/10 pointer-events-none" />
            <summary className="relative flex items-center justify-between gap-3 cursor-pointer list-none px-6 py-4 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <div className="flex items-center gap-2">
                <Mic className="h-5 w-5 text-white" />
                <span className="font-display text-xl md:text-2xl font-semibold text-white tracking-tight [text-shadow:0_1px_4px_rgba(0,0,0,0.3)]">
                  See a taste of Viva Practice
                </span>
              </div>
              <ChevronDown className="h-5 w-5 text-white transition-transform group-open:rotate-180" />
            </summary>

            <div className="relative px-6 pb-6 pt-2">
              <p className="text-sm md:text-base text-white/90 mb-6 max-w-2xl [text-shadow:0_1px_4px_rgba(0,0,0,0.25)]">
                A worked example: three viva questions, model candidate answers, and the kind of constructive feedback the AI examiner gives.
              </p>

              <DemoVivaStepper questions={DEMO_QUESTIONS} />
            </div>
          </details>
        </section>
      </section>

      <CommentWall />

      <SupportSection />

      <footer className="container mx-auto px-4 pb-8 text-center space-y-2">
        <p className="text-sm text-muted-foreground">
          App created by Dr Rob Coe BA MA OXON MBBS FRCA FFICM
        </p>
        <div className="flex items-center justify-center gap-4">
          <a
            href="/sitemap.xml"
            className="inline-block text-xs text-muted-foreground hover:text-foreground underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
          >
            Sitemap
          </a>
          <a
            href="/admin"
            className="inline-block text-xs text-muted-foreground hover:text-foreground underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
          >
            Admin
          </a>
        </div>
      </footer>
    </main>
  );
};

export default Landing;

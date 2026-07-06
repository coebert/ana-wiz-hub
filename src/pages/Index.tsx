import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Atom, Heart, FlaskConical, GraduationCap, ArrowRight, ArrowLeft, Stethoscope, Activity, ClipboardList, Bone, Beaker } from "lucide-react";
import brainLogo from "/brain-logo.webp";
import { useProgress } from "@/contexts/ProgressContext";
import { useExamFilter } from "@/contexts/ExamFilterContext";
import { ProgressRing } from "@/components/shared/ProgressRing";
import { Section, topicsBySection } from "@/data/curriculum";
import { SupportSection } from "@/components/feedback/SupportSection";

const sections: {
  title: string;
  description: string;
  icon: typeof Atom;
  path: string;
  cardClass: string;
  iconColor: string;
  sectionKey: Section;
}[] = [
  {
    title: "Physics",
    description: "Gas laws, pressure measurement, vaporizers, electrical safety, and more",
    icon: Atom,
    path: "/physics",
    cardClass: "section-card-physics",
    iconColor: "text-physics",
    sectionKey: "physics",
  },
  {
    title: "Physiology",
    description: "Cardiovascular, respiratory, renal, neurophysiology, and applied physiology",
    icon: Heart,
    path: "/physiology",
    cardClass: "section-card-physiology",
    iconColor: "text-physiology",
    sectionKey: "physiology",
  },
  {
    title: "Pharmacology",
    description: "Pharmacokinetics, pharmacodynamics, anaesthetic agents, and drug interactions",
    icon: FlaskConical,
    path: "/pharmacology",
    cardClass: "section-card-pharmacology",
    iconColor: "text-pharmacology",
    sectionKey: "pharmacology",
  },
  {
    title: "Anatomy",
    description: "Airway, cardiac, spinal, brachial plexus, thoracic, abdominal, head & neck, and neuroanatomy",
    icon: Bone,
    path: "/anatomy",
    cardClass: "section-card-anatomy",
    iconColor: "text-anatomy",
    sectionKey: "anatomy",
  },
  {
    title: "Clinical Anaesthesia",
    description: "Airway, regional, obstetric, paediatric, neuro, cardiothoracic, and pain",
    icon: Stethoscope,
    path: "/clinical",
    cardClass: "section-card-clinical",
    iconColor: "text-clinical",
    sectionKey: "clinical",
  },
  {
    title: "Intensive Care",
    description: "Sepsis, ventilation, shock, AKI, ARDS, neurointensive care, and organ support",
    icon: Activity,
    path: "/intensive-care",
    cardClass: "section-card-intensive-care",
    iconColor: "text-icu",
    sectionKey: "intensive-care",
  },
  {
    title: "Perioperative Medicine",
    description: "Preoperative assessment, enhanced recovery, fluid therapy, risk stratification",
    icon: ClipboardList,
    path: "/perioperative",
    cardClass: "section-card-perioperative",
    iconColor: "text-perioperative",
    sectionKey: "perioperative",
  },
  {
    title: "Chemistry Foundations",
    description: "Essential chemistry for anaesthetists — bonding, acids & bases, organic chemistry, solutions",
    icon: Beaker,
    path: "/chemistry",
    cardClass: "section-card-chemistry",
    iconColor: "text-chemistry",
    sectionKey: "chemistry",
  },
];

const SITE_URL = "https://anaesthesiacore.app";

const Index = () => {
  const { getSectionProgress, getOverallProgress } = useProgress();
  const { matchesFilter } = useExamFilter();
  const overall = getOverallProgress();
  const location = useLocation();
  const isRevise = location.pathname === "/revise";
  const canonical = `${SITE_URL}${isRevise ? "/revise" : "/"}`;
  const pageTitle = isRevise
    ? "Revise FRCA & FFICM — AnaesthesiaCore"
    : "AnaesthesiaCore – FRCA & FFICM Revision";
  const pageDescription = isRevise
    ? "Revise FRCA Primary, Final and FFICM topics with notes, diagrams, quizzes and viva practice mapped to the curriculum."
    : "FRCA Primary, Final and FFICM revision: structured notes, diagrams, quizzes, AI podcasts and an AI viva examiner.";

  const visibleSections = sections.filter((s) => {
    const topics = topicsBySection[s.sectionKey] || [];
    return topics.some((t) => matchesFilter(t.examTags));
  });

  return (
    <div>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
      </Helmet>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-90"
          style={{ background: "var(--gradient-hero)" }}
        />
        <div className="relative container mx-auto px-4 py-16 md:py-24 text-center">
          <Link
            to="/"
            aria-label="Back to home page"
            className="absolute z-20 left-2 top-2 md:left-4 md:top-4 inline-flex items-center gap-2 min-h-11 min-w-11 px-3 rounded-md text-sm text-primary-foreground/90 hover:text-primary-foreground bg-black/15 hover:bg-black/25 active:bg-black/30 backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/60 transition-colors"
            style={{
              top: "max(0.5rem, env(safe-area-inset-top))",
              left: "max(0.5rem, env(safe-area-inset-left))",
            }}
          >
            <ArrowLeft className="h-5 w-5" aria-hidden />
            <span>Home</span>
          </Link>
          <div className="relative z-0 flex flex-col items-center justify-center mb-4">
            <picture>
              <source
                type="image/avif"
                srcSet="/brain-logo-160.avif 160w, /brain-logo-224.avif 224w"
                sizes="(max-width: 767px) 160px, 224px"
              />
              <source
                type="image/webp"
                srcSet="/brain-logo-160.webp 160w, /brain-logo-224.webp 224w"
                sizes="(max-width: 767px) 160px, 224px"
              />
              <img
                src={brainLogo}
                alt=""
                width={224}
                height={224}
                fetchPriority="high"
                decoding="async"
                className="absolute h-40 w-40 md:h-56 md:w-56 invert brightness-200 opacity-15 pointer-events-none"
              />
            </picture>
            <h1 className="relative text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-foreground">
              AnaesthesiaCore — FRCA &amp; FFICM Revision
            </h1>
          </div>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-6">
            Master the science and clinical practice of anaesthesia and intensive care. Mapped to the FRCA and FFICM curricula.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-primary-foreground/70">
            <GraduationCap className="h-4 w-4" />
            <span>FRCA Primary · FRCA Final · FFICM</span>
          </div>

          {overall.total > 0 && (
            <Link
              to="/progress"
              className="mt-8 max-w-xs mx-auto block group"
              aria-label="View detailed progress dashboard"
            >
              <div className="flex items-center justify-between text-xs text-primary-foreground/70 mb-1.5">
                <span className="group-hover:text-primary-foreground transition-colors">
                  Overall progress · view dashboard →
                </span>
                <span>{overall.completed}/{overall.total} topics</span>
              </div>
              <div className="h-2 rounded-full bg-primary-foreground/20 overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary-foreground/80 transition-all duration-500"
                  style={{ width: `${(overall.completed / overall.total) * 100}%` }}
                />
              </div>
            </Link>
          )}
        </div>
      </section>

      {/* Sections */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground text-center mb-3">
          Core Disciplines
        </h2>
        <p className="text-muted-foreground text-center mb-10 max-w-lg mx-auto">
          Select a discipline to explore topics with clear explanations, animated diagrams, and exam-focused summaries.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {visibleSections.map((section) => {
            const progress = getSectionProgress(section.sectionKey);
            return (
              <Link
                key={section.path}
                to={section.path}
                className={`${section.cardClass} group rounded-xl bg-card p-5 border border-border hover:shadow-lg transition-all duration-300`}
              >
                <div className="flex items-start justify-between mb-3">
                  <section.icon className={`h-8 w-8 ${section.iconColor}`} />
                  <ProgressRing completed={progress.completed} total={progress.total} size={36} strokeWidth={2.5} />
                </div>
                <h3 className="text-lg font-serif font-bold text-foreground mb-1.5">
                  {section.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                  {section.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {progress.completed}/{progress.total} completed
                  </span>
                  <ArrowRight className={`h-4 w-4 ${section.iconColor} group-hover:translate-x-1 transition-transform`} />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <SupportSection />

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Content sourced from BJA Education, Miller's Anesthesia, Oh's Intensive Care Manual, and established literature.</p>
          <p className="mt-1">Designed for FRCA & FFICM exam preparation. Not a substitute for clinical judgement.</p>
          <p className="mt-3 text-muted-foreground/60">App created by Dr Rob Coe BA MA OXON MBBS FRCA FFICM</p>
          <p className="mt-3">
            <a
              href="/sitemap.xml"
              className="text-muted-foreground/70 hover:text-foreground underline-offset-4 hover:underline"
            >
              Sitemap
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Atom, Heart, FlaskConical, ArrowRight, ArrowLeft, Stethoscope, Activity, ClipboardList, Bone, Beaker, GraduationCap, Mic } from "lucide-react";
import { useProgress } from "@/contexts/ProgressContext";
import { useExamFilter } from "@/contexts/ExamFilterContext";
import { ProgressRing } from "@/components/shared/ProgressRing";
import { Section, topicsBySection } from "@/data/curriculum";
import { SupportSection } from "@/components/feedback/SupportSection";
import { ContinueBand } from "@/components/landing/ContinueBand";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageSection } from "@/components/layout/PageSection";


/**
 * Phase 5 home recomposition.
 *
 * The old full-bleed navy → teal marketing hero is replaced with a
 * split editorial hero: brand + factual tagline + two CTAs on the
 * left, a live "your progress" card on the right. Section grid is
 * an 8-cell restrained index — category dot + rule, topic count,
 * thin progress bar — no full hover-tint. Footer collapses to a
 * single row of muted meta links.
 */
const sections: {
  title: string;
  description: string;
  icon: typeof Atom;
  path: string;
  sectionKey: Section;
  dotClass: string;
  ruleColorVar: string;
}[] = [
  { title: "Physics",              description: "Gas laws, vaporisers, monitoring, electrical safety.",           icon: Atom,          path: "/physics",        sectionKey: "physics",        dotClass: "bg-physics",       ruleColorVar: "--physics" },
  { title: "Physiology",           description: "Cardiovascular, respiratory, renal, neurophysiology.",           icon: Heart,         path: "/physiology",     sectionKey: "physiology",     dotClass: "bg-physiology",    ruleColorVar: "--physiology" },
  { title: "Pharmacology",         description: "PK / PD, anaesthetic agents, drug interactions.",                icon: FlaskConical,  path: "/pharmacology",   sectionKey: "pharmacology",   dotClass: "bg-pharmacology",  ruleColorVar: "--pharmacology" },
  { title: "Anatomy",              description: "Airway, cardiac, spinal, plexus, thoracic, neuroanatomy.",       icon: Bone,          path: "/anatomy",        sectionKey: "anatomy",        dotClass: "bg-anatomy",       ruleColorVar: "--anatomy" },
  { title: "Clinical Anaesthesia", description: "Airway, regional, obstetric, paediatric, cardiothoracic, pain.", icon: Stethoscope,   path: "/clinical",       sectionKey: "clinical",       dotClass: "bg-clinical",      ruleColorVar: "--clinical" },
  { title: "Intensive Care",       description: "Sepsis, ventilation, shock, AKI, ARDS, organ support.",          icon: Activity,      path: "/intensive-care", sectionKey: "intensive-care", dotClass: "bg-icu",           ruleColorVar: "--icu" },
  { title: "Perioperative",        description: "Pre-op assessment, ERAS, fluids, risk stratification.",          icon: ClipboardList, path: "/perioperative",  sectionKey: "perioperative",  dotClass: "bg-perioperative", ruleColorVar: "--perioperative" },
  { title: "Chemistry",            description: "Bonding, acids & bases, organic chemistry, solutions.",          icon: Beaker,        path: "/chemistry",      sectionKey: "chemistry",      dotClass: "bg-chemistry",     ruleColorVar: "--chemistry" },
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

  const overallPct = overall.total > 0 ? Math.round((overall.completed / overall.total) * 100) : 0;

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

      {/* Hero — split editorial layout */}
      <section className="relative border-b border-border bg-surface">
        <Link
          to="/"
          aria-label="Back to home page"
          className="absolute z-20 left-2 top-2 md:left-4 md:top-4 inline-flex items-center gap-1.5 h-9 px-2.5 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors md:hidden"
          style={{
            top: "max(0.5rem, env(safe-area-inset-top))",
            left: "max(0.5rem, env(safe-area-inset-left))",
          }}
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          <span>Home</span>
        </Link>

        <PageContainer className="py-10 md:py-16">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-12 items-start">
            {/* Left: brand + tagline + CTAs */}
            <div>
              <p className="eyebrow text-muted-foreground mb-3">
                <GraduationCap className="inline h-3.5 w-3.5 mr-1.5 -mt-0.5" aria-hidden />
                FRCA Primary · FRCA Final · FFICM
              </p>
              <h1 className="display text-foreground">
                AnaesthesiaCore
              </h1>
              <p className="lead mt-4 text-foreground/75">
                A structured reference for anaesthesia and intensive care exams — dense notes,
                interactive diagrams, quizzes and viva practice, mapped to the RCoA and FICM curricula.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild variant="cta" size="lg">
                  <Link to="/physics">
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
              </div>
            </div>

            {/* Right: progress card (blank-state friendly) */}
            <aside
              aria-label="Your progress"
              className="rounded-xl border border-border bg-card shadow-elev-1 p-5 lg:sticky lg:top-24"
            >
              <div className="flex items-center justify-between mb-4">
                <p className="eyebrow text-muted-foreground">Your progress</p>
                <ProgressRing completed={overall.completed} total={Math.max(1, overall.total)} size={44} strokeWidth={3} />
              </div>

              {overall.total > 0 ? (
                <>
                  <p className="text-2xl font-semibold tracking-tight text-foreground mono">
                    {overall.completed}
                    <span className="text-muted-foreground text-lg font-normal"> / {overall.total} topics</span>
                  </p>
                  <div className="mt-3 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-cta transition-all duration-500"
                      style={{ width: `${overallPct}%` }}
                    />
                  </div>
                  <Link
                    to="/progress"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    View dashboard
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </>
              ) : (
                <>
                  <p className="text-sm text-foreground/80">
                    Mark topics as complete as you work through them. Your progress is
                    saved on this device and synced when you sign in.
                  </p>
                  <Link
                    to="/login"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    Sign in to sync
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </>
              )}
            </aside>
          </div>
        </PageContainer>
      </section>

      {/* Sections index */}
      <PageSection spacing="loose">
        <ContinueBand />

        <div className="mb-8 max-w-2xl">
          <p className="eyebrow text-muted-foreground mb-2">Curriculum</p>
          <h2 className="h2">Core disciplines</h2>
          <p className="lead mt-2 text-foreground/70">
            Eight indexed disciplines. Pick a section to open the topic list, or
            filter by exam sitting from the header.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {visibleSections.map((section) => {
            const progress = getSectionProgress(section.sectionKey);
            const pct = progress.total > 0 ? Math.round((progress.completed / progress.total) * 100) : 0;
            const Icon = section.icon;
            return (
              <Link
                key={section.path}
                to={section.path}
                className="group relative flex flex-col rounded-xl border border-border bg-card p-5 shadow-elev-1 transition-[transform,box-shadow,border-color] duration-150 ease-out hover:-translate-y-px hover:shadow-elev-2 hover:border-foreground/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                style={{
                  borderLeftWidth: "3px",
                  borderLeftColor: `hsl(var(${section.ruleColorVar}))`,
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <Icon className="h-5 w-5 text-muted-foreground" aria-hidden />
                  <span className="text-[11px] font-medium text-muted-foreground mono">
                    {progress.total} topics
                  </span>
                </div>
                <h3 className="h4 mb-1 flex items-center gap-2">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${section.dotClass}`}
                    aria-hidden
                  />
                  {section.title}
                </h3>
                <p className="small mb-4 leading-relaxed flex-1">
                  {section.description}
                </p>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1 h-1 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-cta transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-[11px] text-muted-foreground mono shrink-0">
                    {progress.completed}/{progress.total}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:translate-x-0.5 group-hover:text-foreground transition-all shrink-0" />
                </div>
              </Link>
            );
          })}
        </div>
      </PageSection>

      <SupportSection />

      <SiteFooter />

    </div>
  );
};

export default Index;

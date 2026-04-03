import { Link } from "react-router-dom";
import { Atom, Heart, FlaskConical, BookOpen, GraduationCap, ArrowRight, Stethoscope, Activity, ClipboardList, Bone } from "lucide-react";
import { useProgress } from "@/contexts/ProgressContext";
import { useExamFilter } from "@/contexts/ExamFilterContext";
import { ProgressRing } from "@/components/ProgressRing";
import { Section, topicsBySection } from "@/data/curriculum";

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
];

const Index = () => {
  const { getSectionProgress, getOverallProgress } = useProgress();
  const { matchesFilter } = useExamFilter();
  const overall = getOverallProgress();

  const visibleSections = sections.filter((s) => {
    const topics = topicsBySection[s.sectionKey] || [];
    return topics.some((t) => matchesFilter(t.examTags));
  });

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-90"
          style={{ background: "var(--gradient-hero)" }}
        />
        <div className="relative container mx-auto px-4 py-16 md:py-24 text-center">
          <div className="flex justify-center mb-5">
            <div className="rounded-2xl bg-primary-foreground/20 p-4">
              <BookOpen className="h-10 w-10 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-foreground mb-4">
            AnaesthesiaCore
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-6">
            Master the science and clinical practice of anaesthesia and intensive care. Mapped to the FRCA and FFICM curricula.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-primary-foreground/70">
            <GraduationCap className="h-4 w-4" />
            <span>FRCA Primary · FRCA Final · FFICM</span>
          </div>

          {overall.total > 0 && (
            <div className="mt-8 max-w-xs mx-auto">
              <div className="flex items-center justify-between text-xs text-primary-foreground/70 mb-1.5">
                <span>Overall progress</span>
                <span>{overall.completed}/{overall.total} topics</span>
              </div>
              <div className="h-2 rounded-full bg-primary-foreground/20 overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary-foreground/80 transition-all duration-500"
                  style={{ width: `${(overall.completed / overall.total) * 100}%` }}
                />
              </div>
            </div>
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

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Content sourced from BJA Education, Miller's Anesthesia, Oh's Intensive Care Manual, and established literature.</p>
          <p className="mt-1">Designed for FRCA & FFICM exam preparation. Not a substitute for clinical judgement.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

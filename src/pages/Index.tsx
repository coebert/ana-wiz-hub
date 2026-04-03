import { Link } from "react-router-dom";
import { Atom, Heart, FlaskConical, BookOpen, GraduationCap, ArrowRight } from "lucide-react";

const sections = [
  {
    title: "Physics",
    description: "Gas laws, pressure measurement, vaporizers, electrical safety, lasers, and more",
    icon: Atom,
    path: "/physics",
    cardClass: "section-card-physics",
    iconColor: "text-physics",
    topics: 12,
  },
  {
    title: "Physiology",
    description: "Cardiovascular, respiratory, renal, neurophysiology, and applied physiology",
    icon: Heart,
    path: "/physiology",
    cardClass: "section-card-physiology",
    iconColor: "text-physiology",
    topics: 15,
  },
  {
    title: "Pharmacology",
    description: "Pharmacokinetics, pharmacodynamics, anaesthetic agents, and drug interactions",
    icon: FlaskConical,
    path: "/pharmacology",
    cardClass: "section-card-pharmacology",
    iconColor: "text-pharmacology",
    topics: 14,
  },
];

const Index = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-90"
          style={{ background: "var(--gradient-hero)" }}
        />
        <div className="relative container mx-auto px-4 py-20 md:py-28 text-center">
          <div className="flex justify-center mb-6">
            <div className="rounded-2xl bg-primary-foreground/20 p-4">
              <BookOpen className="h-10 w-10 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-foreground mb-4">
            AnaesthesiaCore
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Master the science underpinning anaesthetic practice. Physics, physiology, and pharmacology mapped to the FRCA curriculum.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-primary-foreground/70">
            <GraduationCap className="h-4 w-4" />
            <span>Aligned with FRCA Primary & Final exam syllabi</span>
          </div>
        </div>
      </section>

      {/* Sections */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground text-center mb-3">
          Core Disciplines
        </h2>
        <p className="text-muted-foreground text-center mb-10 max-w-lg mx-auto">
          Select a discipline to explore topics with clear explanations, animated diagrams, and exam-focused summaries.
        </p>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {sections.map((section) => (
            <Link
              key={section.path}
              to={section.path}
              className={`${section.cardClass} group rounded-xl bg-card p-6 border border-border hover:shadow-lg transition-all duration-300`}
            >
              <section.icon className={`h-10 w-10 ${section.iconColor} mb-4`} />
              <h3 className="text-xl font-serif font-bold text-foreground mb-2">
                {section.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {section.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{section.topics} topics</span>
                <ArrowRight className={`h-4 w-4 ${section.iconColor} group-hover:translate-x-1 transition-transform`} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Content sourced from BJA Education, Miller's Anesthesia, and established anaesthetic literature.</p>
          <p className="mt-1">Designed for FRCA exam preparation. Not a substitute for clinical judgement.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

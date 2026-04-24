import { Link } from "react-router-dom";
import { BookOpen, Headphones, Mic, ArrowRight } from "lucide-react";
import brainLogo from "/brain-logo.png";
import { SupportSection } from "@/components/SupportSection";

interface LandingChoice {
  title: string;
  description: string;
  icon: typeof BookOpen;
  to: string;
  /** Tailwind colour token used for the icon + accent ring. */
  accent: string;
}

const choices: LandingChoice[] = [
  {
    title: "Revise",
    description: "Browse the full curriculum by section and dive into structured topic notes.",
    icon: BookOpen,
    to: "/revise",
    accent: "text-physiology",
  },
  {
    title: "Podcast",
    description: "Listen to AI-generated topic podcasts on the go — perfect for commutes.",
    icon: Headphones,
    to: "/podcasts",
    accent: "text-pharmacology",
  },
  {
    title: "Viva Practice",
    description: "Rehearse spoken viva answers with examiner-style scoring and feedback.",
    icon: Mic,
    to: "/viva",
    accent: "text-clinical",
  },
];

const Landing = () => {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-background flex flex-col">
      <section className="container mx-auto px-4 py-12 md:py-20 flex-1">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <img
            src={brainLogo}
            alt="AnaesthesiaCore logo"
            className="h-32 w-32 md:h-40 md:w-40 mb-6"
          />
          <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-3 tracking-tight">
            AnaesthesiaCore
          </h1>
          <p className="font-display text-2xl md:text-3xl font-semibold text-foreground/90 mb-4 tracking-tight">
            How would you like to study today?
          </p>
          <p className="text-base md:text-lg text-muted-foreground">
            Pick a mode below — read the notes, listen on the move, or rehearse out loud.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 max-w-5xl mx-auto">
          {choices.map(({ title, description, icon: Icon, to, accent }) => (
            <Link
              key={to}
              to={to}
              className="group relative flex flex-col rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <div className="flex items-center justify-between mb-5">
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-muted ${accent}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
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
      </section>

      <SupportSection />

      <footer className="container mx-auto px-4 pb-8 text-center">
        <p className="text-sm text-muted-foreground/70">
          App created by Dr Rob Coe BA MA OXON MBBS FRCA FFICM
        </p>
      </footer>
    </main>
  );
};

export default Landing;

import { Link } from "react-router-dom";
import { BookOpen, Headphones, Mic, ArrowRight, Quote, MessageSquare, ChevronDown } from "lucide-react";
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
    description: "Practise out loud with an AI examiner who listens to your spoken answers and gives constructive, rubric-based feedback.",
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
            className="h-52 w-52 md:h-72 md:w-72 mb-6"
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
        <section className="mt-12 md:mt-16 max-w-5xl mx-auto">
          <details className="group rounded-2xl border border-border bg-card/50 shadow-sm">
            <summary className="flex items-center justify-between gap-3 cursor-pointer list-none px-6 py-4 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <div className="flex items-center gap-2">
                <Mic className="h-5 w-5 text-clinical" />
                <span className="font-display text-xl md:text-2xl font-semibold text-foreground tracking-tight">
                  See a taste of Viva Practice
                </span>
              </div>
              <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform group-open:rotate-180" />
            </summary>

            <div className="px-6 pb-6 pt-2">
              <p className="text-sm md:text-base text-muted-foreground mb-6 max-w-2xl">
                A sample 30-second prompt and the kind of constructive feedback the AI examiner gives.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <Quote className="h-4 w-4 text-clinical" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Sample prompt · 30 seconds
                    </span>
                  </div>
                  <p className="font-display text-lg md:text-xl text-foreground leading-snug mb-4">
                    "A 68-year-old man is anuric 6 hours after an open AAA repair. Walk me through your immediate assessment and the first three things you would do."
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="inline-flex items-center rounded-full bg-clinical/10 text-clinical px-2 py-0.5 font-medium">
                      Clinical
                    </span>
                    <span>Difficulty: Intermediate</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <MessageSquare className="h-4 w-4 text-physiology" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Example examiner feedback
                    </span>
                  </div>
                  <ul className="space-y-3 text-sm text-foreground/90">
                    <li>
                      <span className="font-semibold text-foreground">Structure (4/5):</span>{" "}
                      Clear A–E approach — well done. Consider stating your differential framework (pre-renal / renal / post-renal) up front to signal your reasoning.
                    </li>
                    <li>
                      <span className="font-semibold text-foreground">Knowledge (3/5):</span>{" "}
                      You mentioned bladder scan and fluid challenge, but missed checking the catheter for obstruction first — a common, easily reversible cause post-laparotomy.
                    </li>
                    <li>
                      <span className="font-semibold text-foreground">Communication (5/5):</span>{" "}
                      Confident pacing and good use of pauses. Examiner could follow your logic easily.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </details>
        </section>
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

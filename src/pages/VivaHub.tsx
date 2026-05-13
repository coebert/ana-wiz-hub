import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, BookOpen, Mic, Search, Shuffle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import VivaSession from "@/components/VivaSession";
import {
  allTopics,
  sectionMeta,
  type ExamTag,
  type Topic,
} from "@/data/curriculum";

type Exam = Extract<ExamTag, "primary" | "final" | "fficm">;

const examOptions: { value: Exam; label: string; sub: string }[] = [
  { value: "primary", label: "Primary", sub: "FRCA basic sciences" },
  { value: "final", label: "Final", sub: "FRCA applied clinical" },
  { value: "fficm", label: "FFICM", sub: "Critical care subspecialty" },
];

const VivaHub = () => {
  const [exam, setExam] = useState<Exam>("final");
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<Topic | null>(null);

  const eligible = useMemo(
    () => allTopics.filter((t) => t.available && (t.examTags as string[]).includes(exam)),
    [exam],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return eligible;
    return eligible.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.section.toLowerCase().includes(q),
    );
  }, [eligible, query]);

  const startRandom = () => {
    if (eligible.length === 0) return;
    const t = eligible[Math.floor(Math.random() * eligible.length)];
    setActive(t);
  };

  if (active) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          <button
            onClick={() => setActive(null)}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="h-4 w-4" /> Back to viva hub
          </button>
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            {/* Quick exam toggle: switch standard mid-session without leaving. */}
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-background/60 px-3 py-2">
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">
                  Exam standard
                </p>
                <p className="text-sm font-medium text-foreground truncate">
                  {exam === "primary" ? "FRCA Primary" : exam === "final" ? "FRCA Final" : "FFICM"}
                </p>
              </div>
              <div
                role="group"
                aria-label="Quick switch viva exam standard"
                className="inline-flex rounded-full border border-border bg-card p-0.5"
              >
                {(["primary", "final"] as const).map((opt) => {
                  const isActive = exam === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setExam(opt)}
                      aria-pressed={isActive}
                      className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {opt === "primary" ? "Primary" : "Final"}
                    </button>
                  );
                })}
              </div>
            </div>
            <VivaSession
              key={exam}
              topicId={active.id}
              topicTitle={active.title}
              topicDescription={active.description}
              exam={exam}
              onClose={() => setActive(null)}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Viva voce practice — AI FRCA & FFICM examiner | AnaesthesiaCore</title>
        <meta
          name="description"
          content="Rehearse FRCA Primary, Final and FFICM viva questions out loud. An AI examiner asks spoken questions, listens to your answer, and gives rubric-based feedback."
        />
        <link rel="canonical" href="https://anaesthesiacore.app/viva" />
        <meta property="og:title" content="Viva voce practice — AI FRCA & FFICM examiner" />
        <meta
          property="og:description"
          content="Spoken viva practice with an AI examiner calibrated to FRCA Primary, Final and FFICM standards."
        />
        <meta property="og:url" content="https://anaesthesiacore.app/viva" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Viva voce practice — AI FRCA & FFICM examiner" />
        <meta
          name="twitter:description"
          content="Spoken viva practice with an AI examiner calibrated to FRCA Primary, Final and FFICM standards."
        />
      </Helmet>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>

        <header className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Mic className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-serif font-bold text-foreground">Viva voce practice</h1>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">
            An AI examiner asks a spoken question on the topic of your choice, listens to your
            answer, and gives constructive feedback calibrated to FRCA Primary, Final or FFICM
            standard.
          </p>
        </header>

        {/* Exam standard picker */}
        <section className="mb-5">
          <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-2">
            Exam standard
          </p>
          <div className="grid sm:grid-cols-3 gap-2">
            {examOptions.map((opt) => {
              const isActive = opt.value === exam;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setExam(opt.value)}
                  className={`rounded-lg border p-3 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${
                    isActive
                      ? "border-primary bg-primary/10"
                      : "border-border bg-card hover:border-primary/50"
                  }`}
                  aria-pressed={isActive}
                >
                  <p className="font-serif font-semibold text-foreground">{opt.label}</p>
                  <p className="text-[11px] text-muted-foreground">{opt.sub}</p>
                </button>
              );
            })}
          </div>
        </section>

        {/* Search + random */}
        <section className="mb-4 flex gap-2 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${eligible.length} ${examOptions.find((o) => o.value === exam)?.label} topics…`}
              className="pl-9"
            />
          </div>
          <Button onClick={startRandom} variant="secondary" disabled={eligible.length === 0}>
            <Shuffle className="h-4 w-4 mr-2" /> Random topic
          </Button>
          <Button asChild variant="outline">
            <Link to="/viva/library">
              <BookOpen className="h-4 w-4 mr-2" /> Question library
            </Link>
          </Button>
        </section>

        {/* Topic list */}
        <ul className="space-y-2">
          {filtered.map((t) => (
            <li key={t.id}>
              <button
                type="button"
                onClick={() => setActive(t)}
                className="w-full text-left rounded-lg border border-border bg-card p-3 hover:border-primary hover:bg-primary/5 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-serif font-semibold text-foreground leading-tight">
                      {t.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                      {t.description}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-[10px] flex-shrink-0">
                    {sectionMeta[t.section].label}
                  </Badge>
                </div>
              </button>
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="text-sm text-muted-foreground text-center py-8">
              No topics match — try a different search or exam standard.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default VivaHub;

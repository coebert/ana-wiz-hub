import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import {
  sectionMeta,
  topicsBySection,
  Section,
  Topic,
  Exam,
  ExamTag,
} from "@/data/curriculum";
import { useProgress } from "@/contexts/ProgressContext";

/**
 * Curriculum mapping view: each content section × FRCA Primary/Final.
 * Each cell lists the topics tagged for that exam, linking to the topic
 * page and showing a tick when the user has marked it complete.
 */

const SECTION_ORDER: Section[] = [
  "physics",
  "physiology",
  "pharmacology",
  "anatomy",
  "clinical",
  "intensive-care",
  "perioperative",
  "chemistry",
];

const SECTION_ACCENT: Record<Section, string> = {
  physics: "text-physics",
  physiology: "text-physiology",
  pharmacology: "text-pharmacology",
  anatomy: "text-anatomy",
  clinical: "text-clinical",
  "intensive-care": "text-icu",
  perioperative: "text-perioperative",
  chemistry: "text-chemistry",
};

const EXAMS: { value: ExamTag; label: string }[] = [
  { value: Exam.PRIMARY, label: "FRCA Primary" },
  { value: Exam.FINAL, label: "FRCA Final" },
];

const topicHref = (section: Section, topic: Topic) =>
  `${sectionMeta[section].path}/${topic.id}`;

const Curriculum = () => {
  const { isCompleted } = useProgress();

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-background">
      <Helmet>
        <title>Curriculum Map – FRCA Primary & Final | AnaesthesiaCore</title>
        <meta
          name="description"
          content="Every AnaesthesiaCore topic mapped to the FRCA Primary and Final curricula, organised by section."
        />
        <link rel="canonical" href="https://anaesthesiacore.app/curriculum" />
      </Helmet>

      <section className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
        <header className="mb-8 md:mb-10">
          <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Curriculum Map
          </h1>
          <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl">
            Every topic in AnaesthesiaCore mapped to the FRCA Primary and Final
            curricula. Ticks show topics you've marked as complete.
          </p>
        </header>

        {/* Desktop / tablet: true matrix. Mobile: section-stacked cards. */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground py-3 pr-4 w-48">
                  Section
                </th>
                {EXAMS.map((e) => (
                  <th
                    key={e.value}
                    className="text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground py-3 px-4"
                  >
                    {e.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SECTION_ORDER.map((section) => {
                const topics = topicsBySection[section];
                return (
                  <tr key={section} className="border-b border-border align-top">
                    <th scope="row" className="text-left py-5 pr-4">
                      <Link
                        to={sectionMeta[section].path}
                        className={`font-display text-lg font-semibold hover:underline ${SECTION_ACCENT[section]}`}
                      >
                        {sectionMeta[section].label}
                      </Link>
                      <p className="text-xs text-muted-foreground mt-1">
                        {topics.length} topic{topics.length === 1 ? "" : "s"}
                      </p>
                    </th>
                    {EXAMS.map((exam) => {
                      const matches = topics.filter((t) =>
                        t.examTags.includes(exam.value),
                      );
                      return (
                        <td key={exam.value} className="py-5 px-4">
                          {matches.length === 0 ? (
                            <p className="text-sm text-muted-foreground italic">
                              No topics
                            </p>
                          ) : (
                            <ul className="flex flex-col gap-1.5">
                              {matches.map((t) => {
                                const done = isCompleted(t.id);
                                return (
                                  <li key={t.id}>
                                    <Link
                                      to={topicHref(section, t)}
                                      className="group inline-flex items-start gap-2 text-sm text-foreground hover:text-primary transition-colors"
                                    >
                                      <span
                                        className={`mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                                          done
                                            ? "bg-accent border-accent text-accent-foreground"
                                            : "border-border text-transparent"
                                        }`}
                                        aria-label={
                                          done ? "Completed" : "Not completed"
                                        }
                                      >
                                        <Check className="h-3 w-3" />
                                      </span>
                                      <span className="group-hover:underline">
                                        {t.title}
                                      </span>
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                          <p className="mt-3 text-xs text-muted-foreground">
                            {matches.length} / {topics.length} tagged
                          </p>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile fallback: one card per section with Primary / Final stacks */}
        <div className="md:hidden flex flex-col gap-4">
          {SECTION_ORDER.map((section) => {
            const topics = topicsBySection[section];
            return (
              <article
                key={section}
                className="rounded-xl border border-border bg-card p-4"
              >
                <h2 className="m-0">
                  <Link
                    to={sectionMeta[section].path}
                    className={`font-display text-lg font-semibold hover:underline ${SECTION_ACCENT[section]}`}
                  >
                    {sectionMeta[section].label}
                  </Link>
                </h2>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {EXAMS.map((exam) => {
                    const matches = topics.filter((t) =>
                      t.examTags.includes(exam.value),
                    );
                    return (
                      <div key={exam.value}>
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">
                          {exam.label}
                        </p>
                        {matches.length === 0 ? (
                          <p className="text-xs text-muted-foreground italic">
                            No topics
                          </p>
                        ) : (
                          <ul className="flex flex-col gap-1">
                            {matches.map((t) => {
                              const done = isCompleted(t.id);
                              return (
                                <li key={t.id}>
                                  <Link
                                    to={topicHref(section, t)}
                                    className="inline-flex items-start gap-1.5 text-xs text-foreground hover:text-primary"
                                  >
                                    <span
                                      className={`mt-0.5 inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border ${
                                        done
                                          ? "bg-accent border-accent text-accent-foreground"
                                          : "border-border text-transparent"
                                      }`}
                                      aria-label={
                                        done ? "Completed" : "Not completed"
                                      }
                                    >
                                      <Check className="h-2.5 w-2.5" />
                                    </span>
                                    <span>{t.title}</span>
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </div>
                    );
                  })}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Curriculum;

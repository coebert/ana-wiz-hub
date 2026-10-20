import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Trash2, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  PRACTICE_PASS_MARK,
  passRatesFor,
  practicePassShare,
  weightedOverallPassRate,
  type PassRateExam,
} from "@/data/vivaPassRates";

interface Attempt {
  id: string;
  exam: PassRateExam;
  topic_title: string;
  question: string;
  answer: string;
  score: number;
  verdict: string | null;
  feedback: {
    strengths?: string[];
    gaps?: string[];
    modelAnswer?: string;
    nextStep?: string;
  };
  created_at: string;
}

const examLabel: Record<PassRateExam, string> = { primary: "FRCA Primary", final: "FRCA Final", fficm: "FFICM" };

const VivaScores = () => {
  const { user, loading } = useAuth();
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [busy, setBusy] = useState(true);
  const [exam, setExam] = useState<PassRateExam>("final");
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    if (!user) { setBusy(false); return; }
    setBusy(true);
    supabase
      .from("viva_attempts" as never)
      .select("id, exam, topic_title, question, answer, score, verdict, feedback, created_at")
      .order("created_at", { ascending: false })
      .limit(500)
      .then(({ data }) => {
        setAttempts(((data ?? []) as unknown) as Attempt[]);
        setBusy(false);
      });
  }, [user]);

  const mine = useMemo(() => attempts.filter((a) => a.exam === exam), [attempts, exam]);
  const scores = mine.map((a) => Number(a.score));
  const avg = scores.length ? Math.round((scores.reduce((s, x) => s + x, 0) / scores.length) * 10) / 10 : null;
  const share = practicePassShare(scores);
  const table = passRatesFor(exam);

  const remove = async (id: string) => {
    const { error } = await supabase.from("viva_attempts" as never).delete().eq("id", id);
    if (!error) setAttempts((xs) => xs.filter((x) => x.id !== id));
  };

  return (
    <div className="container max-w-4xl py-8 space-y-6">
      <Helmet>
        <title>My viva scores | AnaesthesiaCore</title>
        <meta name="description" content="Review your saved viva answers, examiner-style feedback and published FRCA oral exam pass rates." />
      </Helmet>
      <Link to="/viva" className="text-sm text-muted-foreground inline-flex items-center gap-1 hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to viva practice
      </Link>
      <header>
        <h1 className="font-serif text-3xl font-bold text-foreground">My viva scores</h1>
        <p className="text-muted-foreground mt-1">
          Attempts you chose to save, with the feedback you received. Only you can see them.
        </p>
      </header>

      <div className="flex gap-2 flex-wrap" role="tablist">
        {(Object.keys(examLabel) as PassRateExam[]).map((e) => (
          <Button key={e} size="sm" variant={exam === e ? "default" : "outline"} onClick={() => setExam(e)}>
            {examLabel[e]}
          </Button>
        ))}
      </div>

      {/* Comparison */}
      <section className="rounded-lg border bg-card p-4 space-y-3">
        <h2 className="font-serif text-xl font-semibold text-foreground">How you compare with the real exam</h2>
        <div className="grid sm:grid-cols-3 gap-3">
          <Stat label="Saved attempts" value={user ? String(scores.length) : "—"} />
          <Stat label="Your average" value={avg !== null ? `${avg}/10` : "—"} />
          <Stat label={`Attempts at ${PRACTICE_PASS_MARK}/10 or above`} value={share !== null ? `${share}%` : "—"} />
        </div>
        {table ? (
          <>
            <p className="text-sm text-foreground">
              Real {table.label} {table.component} pass rate, all candidates, last {table.sittings.length} sittings
              (weighted by candidates): <strong>{weightedOverallPassRate(table)}%</strong>.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-muted-foreground">
                  <tr><th className="py-1 pr-3">Sitting</th><th className="pr-3">Candidates</th><th className="pr-3">All</th><th className="pr-3">UK trainees</th><th>UK 1st attempt</th></tr>
                </thead>
                <tbody>
                  {table.sittings.map((s) => (
                    <tr key={s.sitting} className="border-t">
                      <td className="py-1 pr-3">{s.sitting}</td><td className="pr-3">{s.candidates}</td>
                      <td className="pr-3">{s.overall}%</td><td className="pr-3">{s.ukAll}%</td><td>{s.ukFirst}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <a href={table.sourceUrl} target="_blank" rel="noreferrer" className="text-xs text-primary inline-flex items-center gap-1 underline">
              Source: Royal College of Anaesthetists results <ExternalLink className="h-3 w-3" />
            </a>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            Published FFICM pass rates have not been verified for this page, so no comparison is shown.
          </p>
        )}
        <p className="text-xs text-muted-foreground">
          Practice scores are marked by AI against this app's rubric ({PRACTICE_PASS_MARK}/10 = bare pass). The College
          publishes pass percentages, not viva marks, so this comparison is a rough benchmark — not a prediction of your result.
        </p>
      </section>

      {/* Attempts */}
      <section className="space-y-3">
        <h2 className="font-serif text-xl font-semibold text-foreground">Your answers and feedback</h2>
        {loading || busy ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : !user ? (
          <p className="text-sm text-muted-foreground">
            <Link to="/login" className="text-primary underline">Sign in</Link> to see your saved viva attempts.
          </p>
        ) : mine.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No saved {examLabel[exam]} attempts yet. After a viva answer is marked, press “Save this attempt”.{" "}
            <Link to="/viva" className="text-primary underline">Start a viva</Link>
          </p>
        ) : (
          mine.map((a) => (
            <article key={a.id} className="rounded-lg border bg-card p-4">
              <button className="w-full text-left" onClick={() => setOpen(open === a.id ? null : a.id)}>
                <div className="flex items-baseline justify-between gap-2 flex-wrap">
                  <span className="font-medium text-foreground">{a.topic_title}</span>
                  <span className="flex items-center gap-2">
                    <Badge variant={a.score >= PRACTICE_PASS_MARK ? "default" : "secondary"}>{Number(a.score)}/10</Badge>
                    <span className="text-xs text-muted-foreground">{new Date(a.created_at).toLocaleDateString()}</span>
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{a.question}</p>
              </button>
              {open === a.id && (
                <div className="mt-3 space-y-3 text-sm">
                  {a.verdict && <p className="font-medium text-foreground">{a.verdict}</p>}
                  <Block title="Your answer"><p className="whitespace-pre-wrap">{a.answer}</p></Block>
                  {!!a.feedback.strengths?.length && <Block title="Strengths"><List items={a.feedback.strengths} /></Block>}
                  {!!a.feedback.gaps?.length && <Block title="Gaps to close"><List items={a.feedback.gaps} /></Block>}
                  {a.feedback.modelAnswer && <Block title="Model answer"><p>{a.feedback.modelAnswer}</p></Block>}
                  {a.feedback.nextStep && <Block title="Examiner would ask next"><p className="italic">{a.feedback.nextStep}</p></Block>}
                  <Button variant="ghost" size="sm" onClick={() => remove(a.id)}>
                    <Trash2 className="h-3.5 w-3.5 mr-1.5" /> Delete attempt
                  </Button>
                </div>
              )}
            </article>
          ))
        )}
      </section>
    </div>
  );
};

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded border bg-background p-3">
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className="font-serif text-2xl font-bold text-foreground">{value}</p>
  </div>
);
const Block = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-1">{title}</p>
    <div className="text-foreground">{children}</div>
  </div>
);
const List = ({ items }: { items: string[] }) => (
  <ul className="list-disc pl-4 space-y-0.5">{items.map((s, i) => <li key={i}>{s}</li>)}</ul>
);

export default VivaScores;

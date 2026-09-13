import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { AlertTriangle, CheckCircle2, Loader2, Send } from "lucide-react";
import { SectionLayout } from "@/components/layout/SectionLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { submitInaccuracyReport } from "@/lib/inaccuracy-report";

/**
 * Public errata page — `/errata`.
 *
 * Shows every report an editor has explicitly marked `status='published'`,
 * along with the editor's `public_note` (the correction or context the
 * reader sees). The restricted `public_errata` view exposes only these safe
 * public fields and applies the published-row access policy.
 *
 * Publishing accuracy corrections in the open is the post-publish feedback
 * loop's final step: it lets readers verify that reports are acted on, and
 * gives the team a public ledger of what we changed and when.
 */
interface ErratumRow {
  id: string;
  topic_id: string;
  topic_title: string;
  topic_url: string | null;
  quoted_text: string | null;
  message: string;
  public_note: string | null;
  reviewed_at: string | null;
  created_at: string;
}

const formatDate = (iso: string | null) =>
  iso
    ? new Date(iso).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

const getTopicPath = (topicUrl: string | null) => {
  if (!topicUrl) return null;
  if (topicUrl.startsWith("/")) return topicUrl;
  try {
    return new URL(topicUrl).pathname;
  } catch {
    return null;
  }
};

const Errata = () => {
  const [rows, setRows] = useState<ErratumRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [topic, setTopic] = useState("");
  const [topicUrl, setTopicUrl] = useState("");
  const [quotedText, setQuotedText] = useState("");
  const [message, setMessage] = useState("");
  const [suggestedCorrection, setSuggestedCorrection] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);
    setSubmitted(false);

    setSubmitting(true);
    const result = await submitInaccuracyReport({
      topicId: topic,
      topicTitle: topic,
      topicUrl,
      quotedText,
      message,
      suggestedCorrection,
      contactEmail,
    });
    setSubmitting(false);
    if (!result.ok) {
      setSubmitError(result.message);
      return;
    }

    setTopic("");
    setTopicUrl("");
    setQuotedText("");
    setMessage("");
    setSuggestedCorrection("");
    setContactEmail("");
    setSubmitted(true);
  };

  useEffect(() => {
    let cancelled = false;
    const loadErrata = async () => {
      const { data, error } = await supabase
        .from("public_errata")
        .select(
          "id, topic_id, topic_title, topic_url, quoted_text, message, public_note, reviewed_at, created_at",
        )
        .order("reviewed_at", { ascending: false })
        .limit(200);
      if (cancelled) return;
      if (error) setError(error.message);
      else {
        setError(null);
        setRows(data ?? []);
      }
    };
    void loadErrata();
    const refreshWhenVisible = () => {
      if (document.visibilityState === "visible") void loadErrata();
    };
    const interval = window.setInterval(refreshWhenVisible, 30_000);
    window.addEventListener("focus", refreshWhenVisible);
    return () => {
      cancelled = true;
      window.clearInterval(interval);
      window.removeEventListener("focus", refreshWhenVisible);
    };
  }, []);

  return (
    <SectionLayout
      title="Errata"
      subtitle="Published corrections — every confirmed inaccuracy, what it said, and what we changed it to."
      backPath="/"
      backLabel="Back to home"
    >
      <Helmet>
        <title>Errata — Anaesthesia Core</title>
        <meta
          name="description"
          content="Public ledger of confirmed inaccuracies reported on Anaesthesia Core and the corrections we’ve published."
        />
        <link rel="canonical" href="https://anaesthesiacore.app/errata" />
        <meta property="og:url" content="https://anaesthesiacore.app/errata" />
      </Helmet>

      <div className="max-w-3xl mx-auto space-y-6">
        <div className="rounded-lg border bg-muted/40 p-4 text-sm text-muted-foreground">
          <p className="leading-relaxed">
            Accuracy is the most important quality this app can have. Every topic page
            carries a <span className="font-medium text-foreground">Report an inaccuracy</span>{" "}
            button. Confirmed reports are published here with a short editor’s note so the
            correction is visible in the open.
          </p>
        </div>

        <section aria-labelledby="report-correction-heading" className="rounded-lg border bg-card p-5 sm:p-6">
          <div className="mb-5">
            <h2 id="report-correction-heading" className="font-semibold text-xl text-foreground">
              Report a correction
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Tell us what needs reviewing. An editor checks every report before any correction appears in the public ledger.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="errata-topic">Affected topic or page</Label>
                <Input
                  id="errata-topic"
                  value={topic}
                  onChange={(event) => setTopic(event.target.value)}
                  placeholder="e.g. Pulse oximetry"
                  maxLength={256}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="errata-url">
                  Page address <span className="font-normal text-muted-foreground">(optional)</span>
                </Label>
                <Input
                  id="errata-url"
                  value={topicUrl}
                  onChange={(event) => setTopicUrl(event.target.value)}
                  placeholder="/topics/pulse-oximetry"
                  maxLength={1024}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="errata-quote">
                Text being reported <span className="font-normal text-muted-foreground">(optional)</span>
              </Label>
              <Textarea
                id="errata-quote"
                value={quotedText}
                onChange={(event) => setQuotedText(event.target.value)}
                placeholder="Paste the exact sentence or value here."
                rows={2}
                maxLength={1000}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="errata-message">What is incorrect?</Label>
              <Textarea
                id="errata-message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Describe the issue and include a reliable source where possible."
                rows={4}
                maxLength={4000}
                required
              />
              <p className="text-xs text-muted-foreground text-right">{message.length}/4,000</p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="errata-suggestion">
                Suggested correction <span className="font-normal text-muted-foreground">(optional)</span>
              </Label>
              <Textarea
                id="errata-suggestion"
                value={suggestedCorrection}
                onChange={(event) => setSuggestedCorrection(event.target.value)}
                placeholder="What should the page say instead?"
                rows={3}
                maxLength={4000}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="errata-email">
                Contact email <span className="font-normal text-muted-foreground">(optional)</span>
              </Label>
              <Input
                id="errata-email"
                type="email"
                value={contactEmail}
                onChange={(event) => setContactEmail(event.target.value)}
                placeholder="Used only if an editor needs to follow up"
                maxLength={320}
              />
            </div>

            {submitError && (
              <p role="alert" className="text-sm text-destructive">{submitError}</p>
            )}
            {submitted && (
              <div role="status" className="flex items-start gap-2 rounded-md border border-perioperative/30 bg-perioperative/10 p-3 text-sm text-foreground">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-perioperative" />
                <span>Thank you. Your report is in the editorial review queue and will appear below only if it is confirmed and published.</span>
              </div>
            )}

            <div className="flex justify-end">
              <Button type="submit" disabled={submitting}>
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                Submit report
              </Button>
            </div>
          </form>
        </section>

        <div className="pt-2">
          <h2 className="font-semibold text-xl text-foreground">Published corrections</h2>
          <p className="mt-1 text-sm text-muted-foreground">Confirmed reports and the action taken by an editor.</p>
        </div>

        {error && (
          <div className="rounded-lg border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>Couldn’t load errata: {error}</span>
          </div>
        )}

        {rows === null && !error && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground py-8 justify-center">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading published corrections…
          </div>
        )}

        {rows && rows.length === 0 && !error && (
          <div className="rounded-lg border bg-card p-6 text-sm text-muted-foreground flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-perioperative flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-foreground mb-1">
                No published errata yet.
              </p>
              <p>
                That doesn’t mean there are no reports in flight — only that none have
                been confirmed and published. If you spot something wrong, please use the
                report button on any topic page.
              </p>
            </div>
          </div>
        )}

        {rows && rows.length > 0 && (
          <ol className="space-y-4">
            {rows.map((r) => {
              const dateLabel = formatDate(r.reviewed_at ?? r.created_at);
              const topicHref = getTopicPath(r.topic_url);
              return (
                <li
                  key={r.id}
                  className="rounded-lg border bg-card p-5 space-y-3"
                  id={r.id}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h2 className="font-semibold text-foreground text-base">
                      {topicHref ? (
                        <Link
                          to={topicHref}
                          className="hover:underline"
                        >
                          {r.topic_title}
                        </Link>
                      ) : (
                        r.topic_title
                      )}
                    </h2>
                    <time
                      dateTime={r.reviewed_at ?? r.created_at}
                      className="text-xs text-muted-foreground"
                    >
                      Published {dateLabel}
                    </time>
                  </div>

                  {r.quoted_text && (
                    <blockquote className="border-l-2 border-muted-foreground/30 pl-3 text-sm italic text-muted-foreground">
                      “{r.quoted_text}”
                    </blockquote>
                  )}

                  <p className="text-sm leading-relaxed text-foreground/80">
                    <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground block mb-1">
                      Reported issue
                    </span>
                    {r.message}
                  </p>

                  {r.public_note && (
                    <p className="text-sm leading-relaxed text-foreground rounded-md bg-perioperative/10 border border-perioperative/30 p-3">
                      <span className="text-xs font-semibold uppercase tracking-wide text-perioperative block mb-1">
                        Editor’s note
                      </span>
                      {r.public_note}
                    </p>
                  )}
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </SectionLayout>
  );
};

export default Errata;

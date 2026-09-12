import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { AlertTriangle, CheckCircle2, Loader2 } from "lucide-react";
import { SectionLayout } from "@/components/layout/SectionLayout";
import { supabase } from "@/integrations/supabase/client";

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

const Errata = () => {
  const [rows, setRows] = useState<ErratumRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from("public_errata")
        .select(
          "id, topic_id, topic_title, topic_url, quoted_text, message, public_note, reviewed_at, created_at",
        )
        .order("reviewed_at", { ascending: false })
        .limit(200);
      if (cancelled) return;
      if (error) setError(error.message);
      else setRows(data ?? []);
    })();
    return () => {
      cancelled = true;
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
              const topicHref = r.topic_url ?? undefined;
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
                          to={
                            topicHref.startsWith("http")
                              ? new URL(topicHref).pathname
                              : topicHref
                          }
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

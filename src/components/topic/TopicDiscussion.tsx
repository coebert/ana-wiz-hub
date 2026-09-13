import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MessagesSquare, Reply, Trash2, Loader2, Flag } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

const MAX_BODY = 2000;

interface DiscussionRow {
  id: string;
  parent_id: string | null;
  user_id: string;
  author_label: string;
  body: string;
  created_at: string;
}

interface TopicDiscussionProps {
  topicId: string;
  topicTitle: string;
}

/** Privacy-safe public name: never an email address. */
const displayNameFor = (user: { id: string; email?: string | null; user_metadata?: Record<string, unknown> } | null): string => {
  if (!user) return "Learner";
  const meta = user.user_metadata ?? {};
  const raw = [meta.full_name, meta.name, meta.display_name].find(
    (v): v is string => typeof v === "string" && v.trim().length > 1 && !v.includes("@"),
  );
  if (raw) return raw.trim().slice(0, 60);
  return `Learner ${user.id.slice(0, 4)}`;
};

const formatWhen = (iso: string): string => {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) +
    ", " + d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
};

export const TopicDiscussion = ({ topicId, topicTitle }: TopicDiscussionProps) => {
  const { user } = useAuth();
  const location = useLocation();
  const [rows, setRows] = useState<DiscussionRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [question, setQuestion] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyBody, setReplyBody] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from("topic_discussions")
      .select("id, parent_id, user_id, author_label, body, created_at")
      .eq("topic_id", topicId)
      .order("created_at", { ascending: true });
    if (error) {
      setLoadError("Discussion could not be loaded just now.");
    } else {
      setLoadError(null);
      setRows(data ?? []);
    }
    setLoading(false);
  }, [topicId]);

  useEffect(() => {
    setLoading(true);
    void load();
  }, [load]);

  // Live updates so new questions and replies appear without a refresh.
  useEffect(() => {
    const channel = supabase
      .channel(`topic_discussions:${topicId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "topic_discussions", filter: `topic_id=eq.${topicId}` },
        () => {
          void load();
        },
      )
      .subscribe();
    return () => {
      void supabase.removeChannel(channel);
    };
  }, [topicId, load]);

  const threads = useMemo(() => {
    const questions = rows.filter((r) => !r.parent_id);
    return questions
      .map((q) => ({ ...q, replies: rows.filter((r) => r.parent_id === q.id) }))
      .reverse();
  }, [rows]);

  const post = async (body: string, parentId: string | null) => {
    if (!user) return;
    const trimmed = body.trim();
    if (trimmed.length < 2) {
      toast({ title: "Please write a little more before posting.", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("topic_discussions").insert({
      topic_id: topicId,
      topic_title: topicTitle,
      user_id: user.id,
      author_label: displayNameFor(user),
      body: trimmed.slice(0, MAX_BODY),
      parent_id: parentId,
    });
    setSubmitting(false);
    if (error) {
      toast({ title: "Your message could not be posted.", description: error.message, variant: "destructive" });
      return;
    }
    if (parentId) {
      setReplyBody("");
      setReplyTo(null);
    } else {
      setQuestion("");
    }
    void load();
  };

  /**
   * Reader-driven moderation: signed-in learners can report a post once. The
   * database counts reports and automatically hides a post pending review once
   * three learners have flagged it, so nothing stays broadcast unmoderated.
   */
  const report = async (id: string) => {
    if (!user) return;
    const { error } = await supabase
      .from("discussion_flags")
      .insert({ discussion_id: id, reporter_id: user.id });
    if (error) {
      const already = error.code === "23505";
      toast({
        title: already ? "You have already reported this message." : "That report could not be sent.",
        variant: already ? "default" : "destructive",
      });
      return;
    }
    toast({ title: "Thank you — this message has been sent for review." });
    void load();
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from("topic_discussions").delete().eq("id", id);
    if (error) {
      toast({ title: "That message could not be removed.", description: error.message, variant: "destructive" });
      return;
    }
    void load();
  };

  return (
    <section id="discussion" className="scroll-mt-24 border-t border-border py-6">
      <div className="flex items-start gap-3 mb-4">
        <MessagesSquare className="h-5 w-5 shrink-0 text-primary mt-0.5" aria-hidden />
        <div className="min-w-0">
          <h2 className="text-xl font-serif font-bold text-foreground">Discussion</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Ask a question about {topicTitle} or help another learner with a reply.
          </p>
        </div>
      </div>

      {user ? (
        <div className="mb-6">
          <label htmlFor="discussion-question" className="sr-only">
            Your question
          </label>
          <Textarea
            id="discussion-question"
            value={question}
            maxLength={MAX_BODY}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question about this topic…"
            className="min-h-24"
          />
          <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs text-muted-foreground">
              {question.length}/{MAX_BODY} characters · posted as {displayNameFor(user)}
            </span>
            <Button size="sm" disabled={submitting || question.trim().length < 2} onClick={() => void post(question, null)}>
              {submitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
              Post question
            </Button>
          </div>
        </div>
      ) : (
        <div className="mb-6 rounded-lg border border-border bg-muted/40 p-4">
          <p className="text-sm text-muted-foreground">
            Create a free account or sign in to ask a question and reply to others.
          </p>
          <Button asChild size="sm" className="mt-3">
            <Link to="/login" state={{ from: `${location.pathname}#discussion` }}>
              Sign in or create an account
            </Link>
          </Button>
        </div>
      )}

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading discussion…</p>
      ) : loadError ? (
        <p className="text-sm text-muted-foreground">{loadError}</p>
      ) : threads.length === 0 ? (
        <p className="text-sm text-muted-foreground">No questions yet — be the first to start the discussion.</p>
      ) : (
        <ul className="space-y-4">
          {threads.map((thread) => (
            <li key={thread.id} className="rounded-lg border border-border bg-card p-4 min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span className="text-sm font-semibold text-foreground">{thread.author_label}</span>
                <span className="text-xs text-muted-foreground">{formatWhen(thread.created_at)}</span>
              </div>
              <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-relaxed text-foreground">{thread.body}</p>

              <div className="mt-2 flex flex-wrap gap-2">
                {user && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2"
                    onClick={() => {
                      setReplyTo(replyTo === thread.id ? null : thread.id);
                      setReplyBody("");
                    }}
                  >
                    <Reply className="h-4 w-4" aria-hidden /> Reply
                  </Button>
                )}
                {user && user.id !== thread.user_id && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-muted-foreground"
                    onClick={() => void report(thread.id)}
                  >
                    <Flag className="h-4 w-4" aria-hidden /> Report
                  </Button>
                )}
                {user?.id === thread.user_id && (
                  <Button variant="ghost" size="sm" className="h-8 px-2 text-destructive" onClick={() => void remove(thread.id)}>
                    <Trash2 className="h-4 w-4" aria-hidden /> Delete
                  </Button>
                )}
              </div>

              {thread.replies.length > 0 && (
                <ul className="mt-3 space-y-3 border-l border-border pl-3 sm:pl-4">
                  {thread.replies.map((reply) => (
                    <li key={reply.id} className="min-w-0">
                      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                        <span className="text-sm font-semibold text-foreground">{reply.author_label}</span>
                        <span className="text-xs text-muted-foreground">{formatWhen(reply.created_at)}</span>
                      </div>
                      <p className="mt-1 whitespace-pre-wrap break-words text-sm leading-relaxed text-muted-foreground">
                        {reply.body}
                      </p>
                      {user && user.id !== reply.user_id && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-1 h-7 px-2 text-muted-foreground"
                          onClick={() => void report(reply.id)}
                        >
                          <Flag className="h-4 w-4" aria-hidden /> Report
                        </Button>
                      )}
                      {user?.id === reply.user_id && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-1 h-7 px-2 text-destructive"
                          onClick={() => void remove(reply.id)}
                        >
                          <Trash2 className="h-4 w-4" aria-hidden /> Delete
                        </Button>
                      )}
                    </li>
                  ))}
                </ul>
              )}

              {replyTo === thread.id && user && (
                <div className="mt-3">
                  <label htmlFor={`reply-${thread.id}`} className="sr-only">
                    Your reply
                  </label>
                  <Textarea
                    id={`reply-${thread.id}`}
                    value={replyBody}
                    maxLength={MAX_BODY}
                    onChange={(e) => setReplyBody(e.target.value)}
                    placeholder="Write a reply…"
                    className="min-h-20"
                  />
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <Button size="sm" disabled={submitting || replyBody.trim().length < 2} onClick={() => void post(replyBody, thread.id)}>
                      {submitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
                      Post reply
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setReplyTo(null)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

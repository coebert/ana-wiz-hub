import { useEffect, useState } from "react";
import { Star, Loader2, MessageCircle, Send, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

type Review = {
  id: string;
  author_name: string;
  rating: number;
  comment: string;
  created_at: string;
  status: string;
  deleted_reason: string | null;
  deleted_at: string | null;
};

const Stars = ({
  value,
  onChange,
  size = 18,
}: {
  value: number;
  onChange?: (n: number) => void;
  size?: number;
}) => {
  const interactive = !!onChange;
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = n <= value;
        const StarEl = (
          <Star
            style={{ width: size, height: size }}
            className={
              filled ? "fill-primary text-primary" : "text-muted-foreground/70"
            }
          />
        );
        return interactive ? (
          <button
            key={n}
            type="button"
            onClick={() => onChange?.(n === value ? 0 : n)}
            className="p-0.5 rounded hover:scale-110 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={`${n} star${n === 1 ? "" : "s"}`}
          >
            {StarEl}
          </button>
        ) : (
          <span key={n}>{StarEl}</span>
        );
      })}
    </div>
  );
};

export const CommentWall = () => {
  const { isAdmin } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [website, setWebsite] = useState(""); // honeypot
  const [sending, setSending] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("reviews")
      .select(
        "id, author_name, rating, comment, created_at, status, deleted_reason, deleted_at",
      )
      .in("status", ["approved", "deleted"])
      .order("created_at", { ascending: false })
      .limit(50);
    if (!error && data) setReviews(data as Review[]);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const approvedReviews = reviews.filter((r) => r.status === "approved");
  const avg =
    approvedReviews.length > 0
      ? approvedReviews.reduce((s, r) => s + r.rating, 0) /
        approvedReviews.length
      : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    if (rating < 1) {
      toast.error("Please pick a star rating (1–5).");
      return;
    }
    setSending(true);
    try {
      const { data, error } = await supabase.functions.invoke("submit-review", {
        body: { author_name: name, rating, comment, website },
      });
      if (error || (data as any)?.error) {
        throw new Error((data as any)?.error ?? error?.message ?? "Submit failed");
      }
      toast.success("Thanks for your review!");
      setName("");
      setComment("");
      setRating(0);
      setWebsite("");
      load();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Could not post review.";
      toast.error(msg);
    } finally {
      setSending(false);
    }
  };

  const handleDelete = async (review: Review) => {
    const reason = window.prompt(
      `Reason for deleting this review by ${review.author_name}?\n\nThis will be shown publicly in place of the original review.`,
      "Offensive content",
    );
    if (reason === null) return; // cancelled
    const trimmed = reason.trim();
    if (trimmed.length < 3) {
      toast.error("Please provide a deletion reason (3+ characters).");
      return;
    }
    setDeletingId(review.id);
    try {
      const { error } = await supabase
        .from("reviews")
        .update({
          status: "deleted",
          deleted_reason: trimmed.slice(0, 300),
          deleted_at: new Date().toISOString(),
        })
        .eq("id", review.id);
      if (error) throw error;
      toast.success("Review removed.");
      setReviews((prev) =>
        prev.map((r) =>
          r.id === review.id
            ? {
                ...r,
                status: "deleted",
                deleted_reason: trimmed.slice(0, 300),
                deleted_at: new Date().toISOString(),
              }
            : r,
        ),
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Could not delete.";
      toast.error(msg);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section id="reviews" className="container mx-auto px-4 pb-12 scroll-mt-20">
      <div className="max-w-5xl mx-auto rounded-xl border border-border bg-card p-6 md:p-8">
        <div className="flex items-start gap-3 mb-5">
          <MessageCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div className="flex-1">
            <h2 className="text-lg md:text-xl font-serif font-bold text-foreground">
              Reviews & ratings
            </h2>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
              Share what you think of AnaesthesiaCore. Honest feedback —
              positive or negative — is welcome. Offensive content is
              automatically blocked.
            </p>
            {approvedReviews.length > 0 && (
              <div className="flex items-center gap-2 mt-3">
                <Stars value={Math.round(avg)} size={16} />
                <span className="text-xs text-muted-foreground">
                  {avg.toFixed(1)} / 5 · {approvedReviews.length} review
                  {approvedReviews.length === 1 ? "" : "s"}
                </span>
              </div>
            )}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-3 mb-6 pb-6 border-b border-border"
        >
          {/* Honeypot */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "-10000px",
              width: "1px",
              height: "1px",
              overflow: "hidden",
            }}
          >
            <label htmlFor="review-website-hp">Website</label>
            <input
              id="review-website-hp"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">
                Your name
              </label>
              <input
                type="text"
                required
                maxLength={60}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Dr Smith"
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">
                Rating
              </label>
              <Stars value={rating} onChange={setRating} size={24} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              Your review
            </label>
            <textarea
              required
              maxLength={1000}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              placeholder="What did you find useful, or what could be better?"
              className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
            <p className="text-[11px] text-muted-foreground mt-1">
              {comment.length}/1000
            </p>
          </div>

          <button
            type="submit"
            disabled={sending}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {sending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Posting...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Post review
              </>
            )}
          </button>
        </form>

        {loading ? (
          <div className="flex items-center justify-center py-8 text-muted-foreground text-sm">
            <Loader2 className="h-4 w-4 animate-spin mr-2" /> Loading reviews…
          </div>
        ) : reviews.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            No reviews yet. Be the first to leave one!
          </p>
        ) : (
          <ul className="space-y-4">
            {reviews.map((r) => {
              const isDeleted = r.status === "deleted";
              return (
                <li
                  key={r.id}
                  className={`rounded-lg border p-4 ${
                    isDeleted
                      ? "border-dashed border-border bg-muted/40"
                      : "border-border bg-background/50"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className={`font-medium text-sm truncate ${
                          isDeleted
                            ? "text-muted-foreground italic"
                            : "text-foreground"
                        }`}
                      >
                        {r.author_name}
                      </span>
                      {!isDeleted && <Stars value={r.rating} size={14} />}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <time
                        className="text-[11px] text-muted-foreground"
                        dateTime={r.created_at}
                      >
                        {new Date(r.created_at).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                      {isAdmin && !isDeleted && (
                        <button
                          type="button"
                          onClick={() => handleDelete(r)}
                          disabled={deletingId === r.id}
                          className="p-1 rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-50"
                          aria-label="Delete review"
                          title="Delete review (admin)"
                        >
                          {deletingId === r.id ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="h-3.5 w-3.5" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {isDeleted ? (
                    <p className="text-sm text-muted-foreground italic leading-relaxed">
                      <span className="font-medium not-italic text-foreground/70">
                        Review removed by admin
                      </span>
                      {r.deleted_reason ? (
                        <>
                          {" — "}
                          <span>{r.deleted_reason}</span>
                        </>
                      ) : null}
                    </p>
                  ) : (
                    <p className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed">
                      {r.comment}
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
};

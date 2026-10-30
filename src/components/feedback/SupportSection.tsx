import { useState } from "react";
import { Heart, MessageSquare, ExternalLink, X, Send, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { DONATION_CHOICES, logDonateClick } from "@/lib/donation";

type FormType = "topic" | "error";

export const SupportSection = () => {
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [type, setType] = useState<FormType>("topic");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot — real users leave blank
  const [sending, setSending] = useState(false);

  const resetForm = () => {
    setSubject("");
    setMessage("");
    setWebsite("");
    setType("topic");
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-feedback", {
        body: { type, subject, message, website },
      });
      if (error || (data as any)?.error) {
        throw new Error((data as any)?.error ?? error?.message ?? "Send failed");
      }
      toast.success("Feedback sent — thank you!");
      resetForm();
      setFeedbackOpen(false);
    } catch (err) {
      console.error(err);
      const msg = err instanceof Error ? err.message : "";
      if (msg.toLowerCase().includes("too many")) {
        toast.error("Too many submissions — please wait a few minutes.");
      } else {
        toast.error("Couldn't send feedback. Please try again later.");
      }
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="support"
      aria-labelledby="support-heading"
      className="max-w-3xl mx-auto mt-10 md:mt-14 scroll-mt-20"
    >
      <div className="rounded-xl border border-border bg-card shadow-elev-1 p-6 md:p-8">
        <div className="flex items-start gap-3">
          <Heart className="h-5 w-5 text-primary shrink-0 mt-1" aria-hidden />
          <div className="min-w-0">
            <h2 id="support-heading" className="h3 text-foreground">
              Help keep AnaesthesiaCore free
            </h2>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              If AnaesthesiaCore has helped your revision, a small contribution helps cover running
              costs, maintenance and continued development. Giving is entirely optional. Thank you
              for using the app.
            </p>
          </div>
        </div>

        <p className="eyebrow text-muted-foreground mt-5 mb-2" id="support-choices-label">
          Contribute via PayPal
        </p>
        <ul aria-labelledby="support-choices-label" className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {DONATION_CHOICES.map((c) => (
            <li key={c.source}>
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={c.ariaLabel}
                onClick={() => logDonateClick(c.source)}
                className="min-h-11 w-full inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg border border-border bg-background text-sm font-medium text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {c.label}
                <ExternalLink className="h-3.5 w-3.5 opacity-60 shrink-0" aria-hidden />
              </a>
            </li>
          ))}
        </ul>
        <p className="text-xs text-muted-foreground mt-3 break-words">
          PayPal will show Robert Coe, the creator of AnaesthesiaCore. Opens in a new tab.
        </p>

        <div className="border-t border-border mt-6 pt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-sm text-muted-foreground">Feedback is welcome too.</p>
          <button
            type="button"
            onClick={() => setFeedbackOpen(true)}
            className="min-h-11 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-background text-sm font-medium text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <MessageSquare className="h-4 w-4" aria-hidden />
            Request a topic / report an error
          </button>
        </div>
      </div>

      {feedbackOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
          onClick={() => setFeedbackOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-xl border border-border bg-card p-6 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-serif font-bold text-foreground">
                Send feedback
              </h3>
              <button
                onClick={() => setFeedbackOpen(false)}
                className="p-1 rounded hover:bg-muted text-muted-foreground"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSend} className="space-y-3">
              {/* Honeypot — hidden from real users, bots fill it */}
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
                <label htmlFor="website-url-hp">Website (leave blank)</label>
                <input
                  id="website-url-hp"
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setType("topic")}
                  className={`flex-1 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    type === "topic"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Request a topic
                </button>
                <button
                  type="button"
                  onClick={() => setType("error")}
                  className={`flex-1 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    type === "error"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Report an error
                </button>
              </div>

              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  maxLength={120}
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder={
                    type === "topic"
                      ? "e.g. Add topic on TIVA pharmacokinetics"
                      : "e.g. Error in MAC values table"
                  }
                  className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">
                  Details
                </label>
                <textarea
                  required
                  maxLength={2000}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  placeholder={
                    type === "topic"
                      ? "Which topic would you like to see, and why?"
                      : "Where is the error and what should it say instead?"
                  }
                  className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>

              <p className="text-[11px] text-muted-foreground">
                Your message is sent directly to the AnaesthesiaCore team — no
                email app needed.
              </p>

              <button
                type="submit"
                disabled={sending}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {sending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send feedback
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

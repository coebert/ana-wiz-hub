import { useState } from "react";
import { Heart, MessageSquare, ExternalLink, X, Send, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
// PayPal.me works for any personal PayPal account — no charity/business
// enrollment required (unlike paypal.com/donate which is gated to PayPal
// Giving Fund-enrolled organisations). Set this to your PayPal.me handle
// (create one for free at https://paypal.me — it takes ~30 seconds).
const PAYPAL_ME_HANDLE = "RCoe";
const PAYPAL_URL = `https://www.paypal.com/paypalme/${PAYPAL_ME_HANDLE}`;

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
    <section id="support" className="container mx-auto px-4 pb-12 scroll-mt-20">
      <div className="max-w-3xl mx-auto rounded-xl border border-border bg-card p-6 md:p-8">
        <div className="flex items-start gap-3 mb-4">
          <Heart className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div>
            <h2 className="text-lg md:text-xl font-serif font-bold text-foreground">
              Support AnaesthesiaCore
            </h2>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
              This app is built and maintained using{" "}
              <a
                href="https://lovable.dev"
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-foreground"
              >
                Lovable
              </a>
              , which costs money to run. Any donations go{" "}
              <span className="text-foreground font-medium">
                solely toward the upkeep and ongoing development of the app
              </span>{" "}
              — no profit is taken. If you've found it useful, a small
              contribution helps keep new topics and diagrams coming.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5 mt-5">
          <a
            href={PAYPAL_URL}
            target="_blank"
            rel="noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Heart className="h-4 w-4" />
            Donate via PayPal
            <ExternalLink className="h-3.5 w-3.5 opacity-70" />
          </a>
          <button
            onClick={() => setFeedbackOpen(true)}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-background text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            <MessageSquare className="h-4 w-4" />
            Request topic / report error
          </button>
        </div>

        <p className="text-xs text-muted-foreground mt-3">
          Donations sent via PayPal.me/<span className="font-mono">{PAYPAL_ME_HANDLE}</span>.
        </p>
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

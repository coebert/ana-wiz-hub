import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { enquirySchema } from "@/lib/support";
import { Heart, MessageSquare, ExternalLink, X, Send, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { DONATION_CHOICES, STRIPE_CONTRIBUTE_URL, STRIPE_SOURCE, BUY_ME_A_COFFEE_URL, BUY_ME_A_COFFEE_SOURCE, logDonateClick } from "@/lib/donation";

type FormType = "support" | "topic" | "error";

export const SupportSection = () => {
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [type, setType] = useState<FormType>("topic");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot — real users leave blank
  const [sending, setSending] = useState(false);
  const [name, setName] = useState("");
  const [replyEmail, setReplyEmail] = useState("");
  const pending = useRef<{ key: string; id: string } | null>(null);
  const sendLock = useRef(false);

  const resetForm = () => {
    setSubject("");
    setMessage("");
    setWebsite("");
    setType("topic");
    setName("");
    setReplyEmail("");
    pending.current = null;
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sendLock.current) return;
    const parsed = enquirySchema.safeParse({ type, subject, message, name, replyEmail });
    if (!parsed.success) { toast.error("Check your subject, message and reply email."); return; }
    const key = JSON.stringify(parsed.data);
    if (pending.current?.key !== key) pending.current = { key, id: crypto.randomUUID() };
    sendLock.current = true;
    setSending(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-feedback", {
        body: { ...parsed.data, website, requestId: pending.current.id },
      });
      if (error || (data as any)?.error) {
        throw new Error((data as any)?.error ?? error?.message ?? "Send failed");
      }
      toast.success("Enquiry saved — thank you! The team can now find it in their support inbox.");
      resetForm();
      setFeedbackOpen(false);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      if (msg.toLowerCase().includes("too many")) {
        toast.error("Too many submissions — please wait a few minutes.");
      } else {
        toast.error("Couldn't confirm your enquiry was saved. Retry without changing the message to avoid a duplicate.");
      }
    } finally {
      setSending(false);
      sendLock.current = false;
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

        <div className="mt-5">
          <a
            href={STRIPE_CONTRIBUTE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contribute by card at Stripe (opens in a new tab)"
            aria-describedby="support-stripe-note"
            onClick={() => logDonateClick(STRIPE_SOURCE)}
            className="min-h-11 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Contribute by card
            <ExternalLink className="h-3.5 w-3.5 opacity-80 shrink-0" aria-hidden />
          </a>
          <p id="support-stripe-note" className="text-xs text-muted-foreground mt-2">
            Choose your amount at Stripe. One-off contribution; no account needed. Apple Pay is available on supported devices.
          </p>
        </div>

        <p className="eyebrow text-muted-foreground mt-5 mb-2" id="support-choices-label">
          Or contribute via PayPal
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

        <div className="mt-4">
          <a
            href={BUY_ME_A_COFFEE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Buy Me a Coffee (opens in a new tab)"
            aria-describedby="support-buymeacoffee-note"
            onClick={() => logDonateClick(BUY_ME_A_COFFEE_SOURCE)}
            className="min-h-11 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-background text-sm font-medium text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Buy Me a Coffee
            <ExternalLink className="h-3.5 w-3.5 opacity-60 shrink-0" aria-hidden />
          </a>
          <p id="support-buymeacoffee-note" className="text-xs text-muted-foreground mt-2">
            Another optional way to support AnaesthesiaCore.
          </p>
        </div>

        <div className="border-t border-border mt-6 pt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-sm text-muted-foreground">Feedback is welcome too.</p>
          <Button
            type="button"
            onClick={() => setFeedbackOpen(true)}
            className="min-h-11 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-background text-sm font-medium text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <MessageSquare className="h-4 w-4" aria-hidden />
            Contact support / send feedback
          </Button>
          <Button asChild variant="outline" className="min-h-11"><Link to="/my-enquiries">My enquiries</Link></Button>
        </div>
      </div>

      {feedbackOpen && (
        <Dialog open={feedbackOpen} onOpenChange={setFeedbackOpen}>
          <DialogContent className="max-w-lg max-h-[90dvh] overflow-y-auto" aria-describedby={undefined}>
            <div className="flex items-center justify-between mb-4">
              <DialogTitle>Contact support / send feedback</DialogTitle>
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
                <Button type="button" variant={type === "support" ? "default" : "outline"} className="min-h-11" aria-pressed={type === "support"} onClick={() => setType("support")}>Support enquiry</Button>
                <Button
                  type="button"
                  onClick={() => setType("topic")}
                  className={`flex-1 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    type === "topic"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Request a topic
                </Button>
                <Button
                  type="button"
                  onClick={() => setType("error")}
                  className={`flex-1 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    type === "error"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Report an error
                </Button>
              </div>

              <div>
                <label htmlFor="feedback-subject" className="block text-xs font-medium text-muted-foreground mb-1">
                  Subject
                </label>
                <input
                  id="feedback-subject"
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
                <label htmlFor="feedback-message" className="block text-xs font-medium text-muted-foreground mb-1">
                  Details
                </label>
                <textarea
                  id="feedback-message"
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

              <div><label htmlFor="feedback-name" className="text-sm">Name (optional)</label><input id="feedback-name" className="w-full min-h-11 px-3 rounded-md border border-input bg-background" value={name} maxLength={100} onChange={e => setName(e.target.value)} autoComplete="name" /></div>
              <div><label htmlFor="feedback-email" className="text-sm">Reply email (optional)</label><input id="feedback-email" type="email" className="w-full min-h-11 px-3 rounded-md border border-input bg-background" value={replyEmail} maxLength={254} onChange={e => setReplyEmail(e.target.value)} autoComplete="email" /></div>
              <p className="text-xs text-muted-foreground">Saved privately for the team. When signed in, your account identifies your enquiry and its verified email is used for replies. A typed email never links an anonymous enquiry to an account. Without a reply email or signed-in account, the team cannot respond. Do not include patient-identifiable information.</p>

              <Button
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
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
};

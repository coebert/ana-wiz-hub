import { useState } from "react";
import { Flag, Loader2, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";

/**
 * Report-an-inaccuracy dialog.
 *
 * Rendered on every topic page (see TopicTemplate). Submits to the
 * `inaccuracy_reports` table — the INSERT policy allows anon + authenticated
 * but pins `status='new'` and forbids self-publishing, so editors must
 * promote a report before it appears on /errata.
 *
 * The button is intentionally low-emphasis (ghost variant, small) to avoid
 * implying readers should second-guess every claim — accuracy reports are
 * for genuine errors, not preferences.
 */
export const ReportInaccuracyDialog = ({
  topicId,
  topicTitle,
}: {
  topicId: string;
  topicTitle: string;
}) => {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [quoted, setQuoted] = useState("");
  const [message, setMessage] = useState("");
  const [correction, setCorrection] = useState("");
  const [email, setEmail] = useState("");

  const reset = () => {
    setQuoted("");
    setMessage("");
    setCorrection("");
    setEmail("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim().length < 5) {
      toast.error("Please describe the issue (at least a few words).");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("inaccuracy_reports").insert({
      topic_id: topicId,
      topic_title: topicTitle,
      topic_url: typeof window !== "undefined" ? window.location.href.slice(0, 1024) : null,
      quoted_text: quoted.trim() ? quoted.trim().slice(0, 1000) : null,
      message: message.trim().slice(0, 4000),
      suggested_correction: correction.trim() ? correction.trim().slice(0, 4000) : null,
      contact_email: email.trim() ? email.trim().slice(0, 320) : null,
      user_agent:
        typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 512) : null,
      // status / public_note / reviewed_* are set by the editor workflow,
      // and the RLS INSERT policy refuses any client-side override.
    });
    setSubmitting(false);
    if (error) {
      console.error("inaccuracy_report submit failed", error);
      toast.error("Could not submit report. Please try again later.");
      return;
    }
    toast.success("Thank you — an editor will review your report.");
    reset();
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!submitting) setOpen(next);
      }}
    >
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground gap-1.5"
        >
          <Flag className="h-3.5 w-3.5" />
          Report an inaccuracy
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Report an inaccuracy</DialogTitle>
          <DialogDescription>
            Help us keep <span className="font-medium text-foreground">{topicTitle}</span>{" "}
            accurate. Reports are reviewed by an editor before any change is published.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="report-quoted" className="text-xs">
              Quote the text you’re reporting{" "}
              <span className="text-muted-foreground">(optional)</span>
            </Label>
            <Textarea
              id="report-quoted"
              value={quoted}
              onChange={(e) => setQuoted(e.target.value)}
              placeholder="e.g. “noradrenaline infusion 0.01–3 mcg/kg/min”"
              rows={2}
              maxLength={1000}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="report-message" className="text-xs">
              What’s wrong? <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="report-message"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe the inaccuracy and, if possible, cite a source (BNF, guideline, textbook…)."
              rows={4}
              maxLength={4000}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="report-correction" className="text-xs">
              Suggested correction{" "}
              <span className="text-muted-foreground">(optional)</span>
            </Label>
            <Textarea
              id="report-correction"
              value={correction}
              onChange={(e) => setCorrection(e.target.value)}
              placeholder="What should it say instead?"
              rows={2}
              maxLength={4000}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="report-email" className="text-xs">
              Your email{" "}
              <span className="text-muted-foreground">
                (optional — only used if we need to follow up)
              </span>
            </Label>
            <Input
              id="report-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              maxLength={320}
            />
          </div>
          <DialogFooter className="gap-2 sm:gap-2">
            <a
              href="/errata"
              className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1 mr-auto"
            >
              See published errata <ExternalLink className="h-3 w-3" />
            </a>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting && <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />}
              Submit report
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReportInaccuracyDialog;

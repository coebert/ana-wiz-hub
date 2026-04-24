import { useState } from "react";
import { Mic } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import VivaSession from "@/components/VivaSession";
import type { ExamTag } from "@/data/curriculum";

type Exam = Extract<ExamTag, "primary" | "final" | "fficm">;

interface VivaLauncherProps {
  topicId: string;
  topicTitle: string;
  topicDescription?: string;
  /** Restricts which exam standards can be picked (defaults to all three). */
  availableExams?: Exam[];
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
}

const examMeta: Record<Exam, { label: string; sub: string }> = {
  primary: { label: "Primary", sub: "FRCA basic sciences" },
  final: { label: "Final", sub: "FRCA applied clinical" },
  fficm: { label: "FFICM", sub: "Critical care subspecialty" },
};

/**
 * Drop-in button that opens a viva voce dialog for a single topic.
 * The candidate first picks an exam standard (Primary / Final / FFICM),
 * then a generated question is read aloud and they answer by voice.
 */
const VivaLauncher = ({
  topicId,
  topicTitle,
  topicDescription,
  availableExams,
  variant = "outline",
  size = "sm",
  className,
}: VivaLauncherProps) => {
  const [open, setOpen] = useState(false);
  const [exam, setExam] = useState<Exam | null>(null);

  const exams: Exam[] = availableExams && availableExams.length > 0
    ? availableExams
    : ["primary", "final", "fficm"];

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setExam(null);
      }}
    >
      <DialogTrigger asChild>
        <Button variant={variant} size={size} className={className}>
          <Mic className="h-3.5 w-3.5 mr-1.5" />
          Practise viva
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {!exam ? (
          <>
            <DialogHeader>
              <DialogTitle className="font-serif">Choose viva standard</DialogTitle>
              <DialogDescription>
                {topicTitle} — pick the exam difficulty for this practice viva.
              </DialogDescription>
            </DialogHeader>
            <div className="grid sm:grid-cols-3 gap-2 mt-2">
              {exams.map((e) => {
                const m = examMeta[e];
                return (
                  <button
                    key={e}
                    type="button"
                    onClick={() => setExam(e)}
                    className="rounded-lg border border-border bg-card hover:border-primary hover:bg-primary/5 transition-colors p-4 text-left focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <p className="font-serif font-semibold text-foreground">{m.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{m.sub}</p>
                  </button>
                );
              })}
            </div>
            <p className="text-[11px] text-muted-foreground mt-3 leading-snug">
              You'll be asked a single spoken question. Tap <span className="font-medium">Start answering</span>,
              respond out loud, then submit for marking.
            </p>
          </>
        ) : (
          <>
            <DialogHeader className="sr-only">
              <DialogTitle>Viva session: {topicTitle}</DialogTitle>
            </DialogHeader>
            <VivaSession
              topicId={topicId}
              topicTitle={topicTitle}
              topicDescription={topicDescription}
              exam={exam}
              onClose={() => setOpen(false)}
            />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default VivaLauncher;

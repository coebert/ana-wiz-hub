import { Heart, ExternalLink } from "lucide-react";

export const PAYPAL_ME_HANDLE = "RCoe";
export const PAYPAL_URL = `https://www.paypal.com/paypalme/${PAYPAL_ME_HANDLE}`;

/** Friendly, prominent donation request shown at the top of the home page. */
export const DonationNote = () => (
  <section aria-labelledby="donation-note-heading" className="border-b border-border bg-card">
    <div className="container mx-auto px-4 py-5 md:py-6">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
        <div className="flex items-start gap-3 flex-1">
          <Heart className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden />
          <div>
            <p id="donation-note-heading" className="text-base md:text-lg font-serif font-bold text-foreground">
              A note from the creator
            </p>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
              AnaesthesiaCore was built to help anaesthetics and intensive care trainees learn and
              prepare for exams that are widely considered the most difficult of any medical
              specialty — not to make a profit. It has, however, cost a considerable amount to
              create and needs ongoing investment to maintain. I'd really love to keep it free for
              everyone, but without donations I may eventually have to introduce a fee. If you've
              found it helpful and are able to, any contribution — however small — makes a real
              difference. Thank you.
            </p>
          </div>
        </div>
        <a
          href={PAYPAL_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors shrink-0"
        >
          <Heart className="h-4 w-4" aria-hidden />
          Donate via PayPal
          <ExternalLink className="h-3.5 w-3.5 opacity-70" aria-hidden />
        </a>
      </div>
    </div>
  </section>
);

import { supabase } from "@/integrations/supabase/client";
import { getReduceMotion } from "@/contexts/MotionPreferenceContext";

/** Single source of truth for the PayPal.me recipient. Do not duplicate. */
export const PAYPAL_ME_HANDLE = "RCoe";
export const PAYPAL_URL = `https://www.paypal.com/paypalme/${PAYPAL_ME_HANDLE}`;

export type DonationChoice = { label: string; href: string; source: string; ariaLabel: string };

const amount = (gbp: number): DonationChoice => ({
  label: `£${gbp}`,
  href: `${PAYPAL_URL}/${gbp}GBP`,
  source: `support-card-${gbp}gbp`,
  ariaLabel: `Contribute £${gbp} via PayPal (opens in a new tab)`,
});

export const DONATION_CHOICES: DonationChoice[] = [
  amount(3),
  amount(5),
  amount(10),
  {
    label: "Other amount",
    href: PAYPAL_URL,
    source: "support-card-other",
    ariaLabel: "Contribute another amount via PayPal (opens in a new tab)",
  },
];

/**
 * Fire-and-forget log of an outbound donate-link click (source label only,
 * no personal or payment data). A click is never a completed donation, and
 * failures are swallowed so navigation is never blocked.
 */
export const logDonateClick = (source: string) => {
  try {
    void (supabase as any)
      .from("donation_clicks")
      .insert({ source })
      .then(
        () => {},
        () => {},
      );
  } catch {
    /* ignore */
  }
};

/** Stripe hosted contribution page (customer chooses amount, GBP, one-off). No API integration. */
export const STRIPE_CONTRIBUTE_URL = "https://buy.stripe.com/bJebJ1ePnglq3hQ3om7IY00";
export const STRIPE_SOURCE = "support-card-stripe";

let cancelActive: (() => void) | null = null;

/**
 * Scroll to #support, waiting briefly for the section to mount, then re-align once layout settles.
 * Honours system and in-app reduced-motion preference. Pending re-alignment is cancelled by any
 * user scroll input (wheel/touch/pointer/key), a new support request, or the returned cleanup
 * (call it on unmount/navigation).
 */
export const scrollToSupport = (attempts = 20): (() => void) => {
  cancelActive?.();
  const timers: number[] = [];
  const events = ["wheel", "touchstart", "pointerdown", "keydown"] as const;
  let done = false;
  const cancel = () => {
    if (done) return;
    done = true;
    timers.forEach((t) => window.clearTimeout(t));
    events.forEach((e) => window.removeEventListener(e, cancel, true));
    if (cancelActive === cancel) cancelActive = null;
  };
  cancelActive = cancel;
  const go = (smooth: boolean) =>
    document.getElementById("support")?.scrollIntoView({
      behavior: smooth && !getReduceMotion() ? "smooth" : "auto",
      block: "start",
    });
  const attempt = (left: number) => {
    if (done) return;
    if (document.getElementById("support")) {
      go(true);
      events.forEach((e) => window.addEventListener(e, cancel, { capture: true, passive: true }));
      timers.push(window.setTimeout(() => !done && go(false), 600));
      timers.push(window.setTimeout(() => { if (!done) go(false); cancel(); }, 1500));
      return;
    }
    if (left > 0) timers.push(window.setTimeout(() => attempt(left - 1), 100));
    else cancel();
  };
  attempt(attempts);
  return cancel;
};

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

/** Cancel the active support-scroll job (route change, unmount, user input). Safe to call anytime. */
export const cancelSupportScroll = () => cancelActive?.();

const onSupportRoute = () => typeof window !== "undefined" && window.location.pathname === "/";

/**
 * Scroll to #support, waiting briefly for the section to mount, then re-align once layout settles.
 * Honours system and in-app reduced-motion preference. Cancellation listeners (wheel/touch/pointer/key)
 * are attached as soon as the job starts, so a user scrolling before the section mounts is never pulled
 * back. Each retry/realignment checks the home route is still current. Only one job is active; a new
 * request cancels the old one, and `cancelSupportScroll` cancels whichever job is current.
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
  events.forEach((e) => window.addEventListener(e, cancel, { capture: true, passive: true }));
  const go = (smooth: boolean) =>
    document.getElementById("support")?.scrollIntoView({
      behavior: smooth && !getReduceMotion() ? "smooth" : "auto",
      block: "start",
    });
  const live = () => !done && onSupportRoute();
  const attempt = (left: number) => {
    if (!live()) return cancel();
    if (document.getElementById("support")) {
      go(true);
      timers.push(window.setTimeout(() => (live() ? go(false) : cancel()), 600));
      timers.push(window.setTimeout(() => { if (live()) go(false); cancel(); }, 1500));
      return;
    }
    if (left > 0) timers.push(window.setTimeout(() => attempt(left - 1), 100));
    else cancel();
  };
  attempt(attempts);
  return cancel;
};

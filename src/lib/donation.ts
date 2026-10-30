import { supabase } from "@/integrations/supabase/client";

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

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/** Scroll to #support, waiting briefly for the section to mount. */
export const scrollToSupport = (attempts = 20) => {
  const el = document.getElementById("support");
  if (el) {
    el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
    return;
  }
  if (attempts > 0) window.setTimeout(() => scrollToSupport(attempts - 1), 100);
};

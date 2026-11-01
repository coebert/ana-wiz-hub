import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { BUY_ME_A_COFFEE_URL, BUY_ME_A_COFFEE_SOURCE } from "@/lib/donation";
import { SupportSection } from "@/components/feedback/SupportSection";

const { insert } = vi.hoisted(() => ({ insert: vi.fn(() => Promise.resolve({ error: null })) }));
vi.mock("@/integrations/supabase/client", () => ({ supabase: { from: vi.fn(() => ({ insert })), functions: { invoke: vi.fn() } } }));
afterEach(() => { cleanup(); vi.clearAllMocks(); });

describe("optional Buy Me a Coffee support", () => {
  it("opens the exact owner page and logs only its outbound source", () => {
    render(<SupportSection />);
    const link = screen.getByRole("link", { name: "Buy Me a Coffee (opens in a new tab)" });
    expect(link).toHaveAttribute("href", "https://buymeacoffee.com/anaesthesiacore");
    expect(BUY_ME_A_COFFEE_URL).toBe("https://buymeacoffee.com/anaesthesiacore");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    fireEvent.click(link);
    expect(insert).toHaveBeenCalledTimes(1);
    expect(insert).toHaveBeenCalledWith({ source: "support-card-buymeacoffee" });
    expect(BUY_ME_A_COFFEE_SOURCE).toBe("support-card-buymeacoffee");
  });
  it("preserves Stripe then all PayPal destinations before the optional alternative and feedback", () => {
    render(<SupportSection />);
    expect(screen.getAllByRole("link").map(link => link.getAttribute("href"))).toEqual([
      "https://buy.stripe.com/bJebJ1ePnglq3hQ3om7IY00",
      "https://www.paypal.com/paypalme/RCoe/3GBP", "https://www.paypal.com/paypalme/RCoe/5GBP",
      "https://www.paypal.com/paypalme/RCoe/10GBP", "https://www.paypal.com/paypalme/RCoe",
      "https://buymeacoffee.com/anaesthesiacore",
    ]);
    fireEvent.click(screen.getByRole("button", { name: "Request a topic / report an error" }));
    expect(screen.getByRole("heading", { name: "Send feedback" })).toBeInTheDocument();
    expect(insert).not.toHaveBeenCalled();
  });
});
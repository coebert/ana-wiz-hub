import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";

// Receives PayPal webhook events, verifies them with PayPal, and records
// completed payments into public.donations.
const PAYPAL_API = Deno.env.get("PAYPAL_ENV") === "sandbox"
  ? "https://api-m.sandbox.paypal.com"
  : "https://api-m.paypal.com";

async function getToken(): Promise<string> {
  const id = Deno.env.get("PAYPAL_CLIENT_ID");
  const secret = Deno.env.get("PAYPAL_CLIENT_SECRET");
  if (!id || !secret) throw new Error("PayPal credentials not configured");
  const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${btoa(`${id}:${secret}`)}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  if (!res.ok) throw new Error(`PayPal auth failed ${res.status}`);
  return (await res.json()).access_token;
}

async function verify(req: Request, event: unknown): Promise<boolean> {
  const webhookId = Deno.env.get("PAYPAL_WEBHOOK_ID");
  if (!webhookId) throw new Error("PAYPAL_WEBHOOK_ID not configured");
  const h = (n: string) => req.headers.get(n) ?? "";
  const token = await getToken();
  const res = await fetch(`${PAYPAL_API}/v1/notifications/verify-webhook-signature`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      auth_algo: h("paypal-auth-algo"),
      cert_url: h("paypal-cert-url"),
      transmission_id: h("paypal-transmission-id"),
      transmission_sig: h("paypal-transmission-sig"),
      transmission_time: h("paypal-transmission-time"),
      webhook_id: webhookId,
      webhook_event: event,
    }),
  });
  if (!res.ok) return false;
  return (await res.json()).verification_status === "SUCCESS";
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  let event: any;
  try {
    event = await req.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }
  if (!event || typeof event.event_type !== "string" || typeof event.resource !== "object") {
    return json({ error: "Invalid event" }, 400);
  }

  try {
    if (!(await verify(req, event))) return json({ error: "Signature verification failed" }, 401);
  } catch (e) {
    console.error(e);
    return json({ error: "Verification unavailable" }, 500);
  }

  const handled = ["PAYMENT.CAPTURE.COMPLETED", "PAYMENT.SALE.COMPLETED", "CHECKOUT.ORDER.COMPLETED"];
  if (!handled.includes(event.event_type)) return json({ ignored: event.event_type });

  const r = event.resource ?? {};
  const amountObj = r.amount ?? r.purchase_units?.[0]?.amount ?? {};
  const value = Number(amountObj.value ?? amountObj.total);
  const currency = String(amountObj.currency_code ?? amountObj.currency ?? "GBP").toUpperCase().slice(0, 3);
  const txId = String(r.id ?? event.id);
  if (!Number.isFinite(value) || value <= 0) return json({ ignored: "no amount" });

  const payer = r.payer ?? r.payee ?? {};
  const name = [payer.name?.given_name, payer.name?.surname].filter(Boolean).join(" ") || null;
  const when = String(r.create_time ?? event.create_time ?? new Date().toISOString()).slice(0, 10);

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );
  const { error } = await supabase.from("donations").upsert(
    {
      external_id: `paypal:${txId}`,
      donated_on: when,
      amount: value,
      currency,
      donor_name: name,
      method: "PayPal",
      note: "Recorded automatically from PayPal",
    },
    { onConflict: "external_id", ignoreDuplicates: true },
  );
  if (error) {
    console.error(error);
    return json({ error: "Failed to record" }, 500);
  }
  return json({ recorded: true });
});

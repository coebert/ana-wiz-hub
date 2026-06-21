// Public visit logger. Captures visitor_id, page_path, and the caller's
// country (from Cloudflare's cf-ipcountry header, with an ipapi.co fallback).
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

// ISO-2 → English name. Tiny built-in map for the table; falls back to code.
const COUNTRY_NAMES: Record<string, string> = {
  GB: "United Kingdom", IE: "Ireland", US: "United States", CA: "Canada",
  AU: "Australia", NZ: "New Zealand", IN: "India", PK: "Pakistan",
  BD: "Bangladesh", LK: "Sri Lanka", SG: "Singapore", MY: "Malaysia",
  HK: "Hong Kong", AE: "United Arab Emirates", SA: "Saudi Arabia",
  QA: "Qatar", KW: "Kuwait", BH: "Bahrain", OM: "Oman", EG: "Egypt",
  ZA: "South Africa", NG: "Nigeria", KE: "Kenya", GH: "Ghana",
  DE: "Germany", FR: "France", ES: "Spain", IT: "Italy", NL: "Netherlands",
  BE: "Belgium", CH: "Switzerland", AT: "Austria", SE: "Sweden",
  NO: "Norway", DK: "Denmark", FI: "Finland", PL: "Poland", PT: "Portugal",
  GR: "Greece", CZ: "Czechia", RO: "Romania", HU: "Hungary", TR: "Turkey",
  IL: "Israel", JP: "Japan", KR: "South Korea", CN: "China", TW: "Taiwan",
  TH: "Thailand", VN: "Vietnam", PH: "Philippines", ID: "Indonesia",
  BR: "Brazil", MX: "Mexico", AR: "Argentina", CL: "Chile", CO: "Colombia",
  RU: "Russia", UA: "Ukraine",
};

async function lookupCountryByIp(ip: string): Promise<string | null> {
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 1500);
    const res = await fetch(`https://ipapi.co/${ip}/country/`, {
      signal: ctrl.signal,
      headers: { "User-Agent": "anaesthesiacore-log-visit" },
    });
    clearTimeout(t);
    if (!res.ok) return null;
    const text = (await res.text()).trim().toUpperCase();
    return /^[A-Z]{2}$/.test(text) ? text : null;
  } catch {
    return null;
  }
}

// Classify a referrer URL into a coarse traffic source bucket.
// Returns one of: "search" | "social" | "direct" | "referral".
function classifyReferrer(referrer: string | null): string {
  if (!referrer) return "direct";
  let host = "";
  try {
    host = new URL(referrer).hostname.toLowerCase();
  } catch {
    return "direct";
  }
  if (!host) return "direct";
  const SEARCH = [
    "google.", "bing.com", "duckduckgo.com", "yahoo.", "yandex.",
    "baidu.com", "ecosia.org", "search.brave.com", "qwant.com",
    "startpage.com", "kagi.com", "search.yahoo.",
  ];
  const SOCIAL = [
    "facebook.com", "fb.com", "l.facebook.com", "instagram.com",
    "x.com", "twitter.com", "t.co", "linkedin.com", "lnkd.in",
    "reddit.com", "youtube.com", "youtu.be", "tiktok.com",
    "whatsapp.com", "wa.me", "t.me", "telegram.org", "threads.net",
    "pinterest.", "discord.com", "discord.gg",
  ];
  if (SEARCH.some((s) => host.includes(s))) return "search";
  if (SOCIAL.some((s) => host === s || host.endsWith("." + s) || host.includes(s))) return "social";
  return "referral";
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const visitor_id = typeof body.visitor_id === "string" ? body.visitor_id : "";
    const page_path = typeof body.page_path === "string" ? body.page_path : null;
    let referrer = typeof body.referrer === "string" ? body.referrer : null;
    if (referrer && referrer.length > 1024) referrer = referrer.slice(0, 1024);

    if (!visitor_id || visitor_id.length < 1 || visitor_id.length > 128) {
      return new Response(JSON.stringify({ error: "Invalid visitor_id" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (page_path && page_path.length > 512) {
      return new Response(JSON.stringify({ error: "page_path too long" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const traffic_source = classifyReferrer(referrer);

    // Prefer the Cloudflare-provided country header (Supabase fronts edge
    // functions on Cloudflare). Fall back to ipapi.co on the client IP.
    let country = (req.headers.get("cf-ipcountry") ?? "").toUpperCase();
    if (!country || country === "XX" || country === "T1" || country.length !== 2) {
      const fwd = req.headers.get("x-forwarded-for") ?? "";
      const ip = fwd.split(",")[0]?.trim();
      if (ip) {
        const looked = await lookupCountryByIp(ip);
        if (looked) country = looked;
      }
    }
    if (country.length !== 2) country = "";

    const country_name = country ? (COUNTRY_NAMES[country] ?? country) : null;

    const ua = (req.headers.get("user-agent") ?? "").slice(0, 512) || null;

    const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const { error } = await admin.from("app_visits").insert({
      visitor_id,
      page_path,
      country: country || null,
      country_name,
      referrer,
      traffic_source,
      user_agent: ua,
    });
    if (error) throw error;

    return new Response(JSON.stringify({ ok: true, country: country || null, traffic_source }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("log-visit error:", e);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});


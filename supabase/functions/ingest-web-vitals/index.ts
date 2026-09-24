// Ingests Real-User-Monitoring Core Web Vitals samples from the browser.
// Public endpoint (no JWT): validates strictly with Zod, caps payload,
// writes via service role. One request per sample (fired via sendBeacon
// from the client), so no rate limiting beyond gateway defaults.

import { createClient } from "npm:@supabase/supabase-js@2";
import { z } from "npm:zod@3.23.8";

// sendBeacon uses credentials mode "include", so a wildcard
// Access-Control-Allow-Origin is rejected by browsers. Echo the request
// Origin instead and allow credentials.
const ALLOWED_ORIGIN_RE =
  /^https:\/\/((www\.)?anaesthesiacore\.app|[a-z0-9-]+\.lovable\.app|[a-z0-9-]+\.lovableproject\.com)$|^http:\/\/localhost(:\d+)?$/;

function corsHeadersFor(req: Request) {
  const origin = req.headers.get("origin") ?? "";
  const allowed = ALLOWED_ORIGIN_RE.test(origin);
  return {
    "Access-Control-Allow-Origin": allowed ? origin : "https://anaesthesiacore.app",
    "Access-Control-Allow-Credentials": allowed ? "true" : "false",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    Vary: "Origin",
  };
}

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const serviceRole = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const SampleSchema = z.object({
  metric: z.enum(["LCP", "CLS", "INP", "FCP", "TTFB"]),
  value: z.number().finite().nonnegative().max(600_000),
  rating: z.enum(["good", "needs-improvement", "poor"]).optional().nullable(),
  navigation_type: z.string().max(32).optional().nullable(),
  route: z.string().min(1).max(512),
  release_sha: z.string().max(64).optional().nullable(),
  device_type: z.enum(["mobile", "tablet", "desktop", "unknown"]).optional().nullable(),
  connection: z.string().max(32).optional().nullable(),
  session_id: z.string().max(64).optional().nullable(),
});

const BodySchema = z.union([SampleSchema, z.array(SampleSchema).max(20)]);

Deno.serve(async (req) => {
  const corsHeaders = corsHeadersFor(req);
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const parsed = BodySchema.safeParse(payload);
  if (!parsed.success) {
    return new Response(JSON.stringify({ error: parsed.error.flatten() }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const samples = Array.isArray(parsed.data) ? parsed.data : [parsed.data];
  const ua = req.headers.get("user-agent")?.slice(0, 512) ?? null;

  const rows = samples.map((s) => ({
    metric: s.metric,
    value: s.value,
    rating: s.rating ?? null,
    navigation_type: s.navigation_type ?? null,
    route: s.route,
    release_sha: s.release_sha ?? null,
    user_agent: ua,
    device_type: s.device_type ?? "unknown",
    connection: s.connection ?? null,
    session_id: s.session_id ?? null,
  }));

  const supabase = createClient(supabaseUrl, serviceRole, { auth: { persistSession: false } });
  const { error } = await supabase.from("web_vitals").insert(rows);
  if (error) {
    console.error("web_vitals insert failed", error);
    return new Response(JSON.stringify({ error: "Insert failed" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: true, count: rows.length }), {
    status: 202,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});

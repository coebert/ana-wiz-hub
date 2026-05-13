// Seeds a Lighthouse run by calling Google's PageSpeed Insights API
// (server-side Lighthouse) and inserting the result into `lighthouse_runs`.
// Used by the "Seed Lighthouse data" button on /dev/seo-indexing.

import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { z } from "npm:zod@3.23.8";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const serviceRole = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
const psiKey = Deno.env.get("PAGESPEED_INSIGHTS_API_KEY"); // optional

const BodySchema = z.object({
  url: z.string().url(),
  strategy: z.enum(["mobile", "desktop"]).optional().default("desktop"),
});

async function requireAdmin(req: Request): Promise<string | null> {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;
  const token = authHeader.replace("Bearer ", "");
  const userClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: authHeader } },
    auth: { persistSession: false },
  });
  const { data, error } = await userClient.auth.getClaims(token);
  if (error || !data?.claims?.sub) return null;
  const admin = createClient(supabaseUrl, serviceRole, { auth: { persistSession: false } });
  const { data: roleRow } = await admin
    .from("user_roles")
    .select("role")
    .eq("user_id", data.claims.sub)
    .eq("role", "admin")
    .maybeSingle();
  return roleRow ? data.claims.sub : null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const userId = await requireAdmin(req);
  if (!userId) {
    return new Response(JSON.stringify({ error: "Admin only" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    body = {};
  }
  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) {
    return new Response(
      JSON.stringify({ error: "Validation failed", details: parsed.error.flatten() }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
  const { url, strategy } = parsed.data;

  const psiUrl = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
  psiUrl.searchParams.set("url", url);
  psiUrl.searchParams.set("strategy", strategy);
  for (const cat of ["performance", "accessibility", "best-practices", "seo"]) {
    psiUrl.searchParams.append("category", cat);
  }
  if (psiKey) psiUrl.searchParams.set("key", psiKey);

  const psiRes = await fetch(psiUrl.toString());
  if (!psiRes.ok) {
    const text = await psiRes.text().catch(() => "");
    return new Response(
      JSON.stringify({
        error: `PageSpeed Insights returned ${psiRes.status}`,
        details: text.slice(0, 500),
      }),
      { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  const psi = await psiRes.json();
  const lh = psi?.lighthouseResult;
  if (!lh) {
    return new Response(JSON.stringify({ error: "No Lighthouse result in PSI response" }), {
      status: 502,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const c = lh.categories ?? {};
  const a = lh.audits ?? {};
  const num = (key: string): number | null => {
    const v = a[key]?.numericValue;
    return typeof v === "number" ? v : null;
  };
  const pct = (key: string) =>
    Math.round(((c[key]?.score as number | null | undefined) ?? 0) * 100);

  const lcp = num("largest-contentful-paint");
  const cls = num("cumulative-layout-shift");
  const inp = num("interaction-to-next-paint") ?? num("experimental-interaction-to-next-paint");
  const tbt = num("total-blocking-time");

  const admin = createClient(supabaseUrl, serviceRole, { auth: { persistSession: false } });
  const { data, error } = await admin
    .from("lighthouse_runs")
    .insert({
      url: lh.finalDisplayedUrl ?? lh.finalUrl ?? url,
      commit_sha: null,
      branch: `psi-${strategy}`,
      lh_version: lh.lighthouseVersion ?? null,
      score_performance: pct("performance"),
      score_accessibility: pct("accessibility"),
      score_best_practices: pct("best-practices"),
      score_seo: pct("seo"),
      lcp_ms: lcp != null ? Math.round(lcp) : null,
      cls,
      inp_ms: inp != null ? Math.round(inp) : null,
      tbt_ms: tbt != null ? Math.round(tbt) : null,
      report_path: null,
      raw_summary: {
        source: "pagespeed-insights",
        strategy,
        fetchTime: lh.fetchTime,
        userAgent: lh.userAgent,
        loadingExperience: psi.loadingExperience ?? null,
      },
    })
    .select("id")
    .single();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  return new Response(
    JSON.stringify({
      ok: true,
      id: data.id,
      scores: {
        performance: pct("performance"),
        accessibility: pct("accessibility"),
        best_practices: pct("best-practices"),
        seo: pct("seo"),
      },
    }),
    { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
  );
});

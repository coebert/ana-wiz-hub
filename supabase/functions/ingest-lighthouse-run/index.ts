import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { z } from "npm:zod@3.23.8";

const ingestToken = Deno.env.get("LIGHTHOUSE_INGEST_TOKEN")!;
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const serviceRole = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const SummarySchema = z.object({
  url: z.string().url(),
  commit_sha: z.string().max(64).optional().nullable(),
  branch: z.string().max(128).optional().nullable(),
  lh_version: z.string().max(32).optional().nullable(),
  scores: z.object({
    performance: z.number().min(0).max(100),
    accessibility: z.number().min(0).max(100),
    best_practices: z.number().min(0).max(100),
    seo: z.number().min(0).max(100),
  }),
  metrics: z
    .object({
      lcp_ms: z.number().int().nonnegative().optional().nullable(),
      cls: z.number().nonnegative().optional().nullable(),
      inp_ms: z.number().int().nonnegative().optional().nullable(),
      tbt_ms: z.number().int().nonnegative().optional().nullable(),
    })
    .optional()
    .default({}),
  raw: z.unknown().optional(),
});

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const provided = req.headers.get("x-lighthouse-ingest-token") ?? "";
  if (!ingestToken || provided !== ingestToken) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let summaryJson: unknown;
  let reportFile: File | null = null;

  const contentType = req.headers.get("content-type") ?? "";
  try {
    if (contentType.includes("multipart/form-data")) {
      const form = await req.formData();
      const summaryRaw = form.get("summary");
      if (typeof summaryRaw !== "string") throw new Error("Missing 'summary' field");
      summaryJson = JSON.parse(summaryRaw);
      const r = form.get("report");
      if (r instanceof File) reportFile = r;
    } else {
      summaryJson = await req.json();
    }
  } catch (e) {
    return new Response(JSON.stringify({ error: `Invalid body: ${(e as Error).message}` }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const parsed = SummarySchema.safeParse(summaryJson);
  if (!parsed.success) {
    return new Response(
      JSON.stringify({ error: "Validation failed", details: parsed.error.flatten() }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
  const s = parsed.data;

  const supabase = createClient(supabaseUrl, serviceRole, {
    auth: { persistSession: false },
  });

  let reportPath: string | null = null;
  if (reportFile) {
    const ts = new Date().toISOString().replace(/[:.]/g, "-");
    const safeBranch = (s.branch ?? "main").replace(/[^a-zA-Z0-9_-]/g, "_");
    reportPath = `${safeBranch}/${ts}-${s.commit_sha?.slice(0, 7) ?? "manual"}.html`;
    const buf = await reportFile.arrayBuffer();
    const { error: upErr } = await supabase.storage
      .from("lighthouse-reports")
      .upload(reportPath, buf, { contentType: "text/html", upsert: false });
    if (upErr) {
      return new Response(JSON.stringify({ error: `Report upload failed: ${upErr.message}` }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  }

  const { data, error } = await supabase
    .from("lighthouse_runs")
    .insert({
      url: s.url,
      commit_sha: s.commit_sha ?? null,
      branch: s.branch ?? null,
      lh_version: s.lh_version ?? null,
      score_performance: Math.round(s.scores.performance),
      score_accessibility: Math.round(s.scores.accessibility),
      score_best_practices: Math.round(s.scores.best_practices),
      score_seo: Math.round(s.scores.seo),
      lcp_ms: s.metrics.lcp_ms ?? null,
      cls: s.metrics.cls ?? null,
      inp_ms: s.metrics.inp_ms ?? null,
      tbt_ms: s.metrics.tbt_ms ?? null,
      report_path: reportPath,
      raw_summary: (s.raw ?? {}) as Record<string, unknown>,
    })
    .select("id")
    .single();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: true, id: data.id, report_path: reportPath }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});

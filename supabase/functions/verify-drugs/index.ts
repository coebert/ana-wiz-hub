// Auto-verify drug monographs against open reference sources using Lovable AI.
//
// Runs in chunks so the worker never hits the edge-function wall-time limit:
// each invocation processes up to CHUNK_SIZE drugs (skipping those already
// logged for this job), then re-invokes itself for the next chunk until done.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.74.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-internal-token",
};

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const CHUNK_SIZE = 15;             // drugs processed per invocation
const STALL_MS = 3 * 60 * 1000;    // a "running" job idle this long is stalled

const FIELDS = [
  "indication_oneliner",
  "mechanism_of_action",
  "presentation",
  "preparation",
  "adult_bolus_dose",
  "infusion_range",
  "dosing",
  "pharmacokinetics",
  "side_effects",
  "contraindications",
  "interactions",
  "monitoring",
  "key_warning",
] as const;

type Field = (typeof FIELDS)[number];

interface DrugRow {
  slug: string;
  name: string;
  drug_class: string;
  synonyms: string[];
  indication_oneliner: string;
  mechanism_of_action: string;
  presentation: string;
  preparation: string;
  adult_bolus_dose: string;
  infusion_range: string;
  dosing: string;
  pharmacokinetics: string;
  side_effects: string;
  contraindications: string;
  interactions: string;
  monitoring: string;
  key_warning: string;
}

const SYSTEM_PROMPT = `You are a UK anaesthetic and intensive-care pharmacology editor.

Your job: review one drug monograph and produce a CORRECTED version where every clinical statement is consistent with reliable UK reference sources, in this order of authority:
1. Electronic Medicines Compendium (medicines.org.uk) Summary of Product Characteristics
2. NICE BNF public monograph pages (bnf.nice.org.uk)
3. AAGBI / ICS / RCoA / Resuscitation Council UK guidelines for perioperative and critical-care use

Rules:
- Keep the writing style concise and practical for an FRCA/FFICM trainee. Use the same compact phrasing as the input (short clauses, mg/kg dosing, no marketing fluff).
- Use UK terminology and units (paracetamol not acetaminophen, adrenaline not epinephrine in the body text — but keep US synonyms in synonyms list).
- DO NOT invent data. If a field is not applicable to this drug (e.g. infusion_range for an oral-only agent), set it to an empty string.
- Preserve any structured formatting that already exists (bullet markers like "• ", line breaks).
- For dose ranges, prefer the BNF/SPC adult range. Where anaesthetic practice differs from BNF (e.g. propofol induction), include the standard anaesthetic dose and flag with "(anaesthetic practice)" briefly.
- Keep "key_warning" to ONE short sentence (the single most important safety point).
- Keep "indication_oneliner" under 120 characters.
- For "preparation": include the typical dilution to a standard concentration plus one worked example where relevant (e.g. "noradrenaline 4 mg in 50 mL 5% glucose = 80 µg/mL").
- Return ONLY the JSON via the tool call. Do not add commentary.`;

const tool = {
  type: "function",
  function: {
    name: "emit_corrected_monograph",
    description: "Return the verified, corrected drug monograph fields.",
    parameters: {
      type: "object",
      properties: Object.fromEntries(
        FIELDS.map((f) => [f, { type: "string" }]),
      ),
      required: [...FIELDS],
      additionalProperties: false,
    },
  },
};

async function callAI(drug: DrugRow): Promise<Partial<Record<Field, string>>> {
  const userPayload = {
    name: drug.name,
    drug_class: drug.drug_class,
    synonyms: drug.synonyms,
    current_fields: Object.fromEntries(FIELDS.map((f) => [f, drug[f]])),
  };

  // Per-request timeout so a hung upstream doesn't burn the whole chunk budget.
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 45_000);
  let res: Response;
  try {
    res = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        signal: ctrl.signal,
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            {
              role: "user",
              content:
                "Verify and correct this monograph against eMC SPC, NICE BNF, and AAGBI/ICS/RCoA guidelines. Return ONLY the tool call.\n\n" +
                JSON.stringify(userPayload, null, 2),
            },
          ],
          tools: [tool],
          tool_choice: {
            type: "function",
            function: { name: "emit_corrected_monograph" },
          },
        }),
      },
    );
  } finally {
    clearTimeout(t);
  }

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`AI gateway ${res.status}: ${body.slice(0, 300)}`);
  }
  const json = await res.json();
  const call = json.choices?.[0]?.message?.tool_calls?.[0];
  if (!call?.function?.arguments) {
    throw new Error("No tool call in AI response");
  }
  return JSON.parse(call.function.arguments);
}

async function scheduleContinuation(jobId: string) {
  // Fire-and-forget self-invocation. Bypasses user auth via internal token.
  const url = `${SUPABASE_URL}/functions/v1/verify-drugs`;
  try {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        "x-internal-token": SUPABASE_SERVICE_ROLE_KEY,
      },
      body: JSON.stringify({ action: "continue", jobId }),
    });
  } catch (e) {
    console.error("Failed to schedule continuation:", e);
  }
}

async function processChunk(jobId: string) {
  const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  // Make sure the job is marked running and reflects total once.
  const { data: drugs, error: drugsErr } = await admin
    .from("drugs")
    .select("slug,name,drug_class,synonyms," + FIELDS.join(","))
    .order("name");
  if (drugsErr) throw drugsErr;

  const total = drugs!.length;

  // Which drugs already have a log entry for this job?
  const { data: logged } = await admin
    .from("drug_verification_log")
    .select("drug_slug")
    .eq("job_id", jobId);
  const doneSlugs = new Set((logged ?? []).map((r) => r.drug_slug as string));

  // Refresh job state, bail if cancelled.
  const { data: jobRow } = await admin
    .from("drug_verification_jobs")
    .select("status,succeeded,failed")
    .eq("id", jobId)
    .single();
  if (!jobRow) return;
  if (jobRow.status === "cancelled" || jobRow.status === "completed") return;

  let succeeded = jobRow.succeeded ?? 0;
  let failed = jobRow.failed ?? 0;

  await admin
    .from("drug_verification_jobs")
    .update({
      status: "running",
      total,
      processed: doneSlugs.size,
      updated_at: new Date().toISOString(),
    })
    .eq("id", jobId);

  const remaining = (drugs as DrugRow[]).filter((d) => !doneSlugs.has(d.slug));

  if (remaining.length === 0) {
    await admin
      .from("drug_verification_jobs")
      .update({
        status: "completed",
        processed: total,
        current_drug: null,
        completed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", jobId);
    return;
  }

  const chunk = remaining.slice(0, CHUNK_SIZE);
  let processed = doneSlugs.size;

  for (const drug of chunk) {
    // Periodic cancellation check.
    const { data: jr } = await admin
      .from("drug_verification_jobs")
      .select("status")
      .eq("id", jobId)
      .single();
    if (jr?.status === "cancelled") return;

    await admin
      .from("drug_verification_jobs")
      .update({
        current_drug: drug.name,
        processed,
        succeeded,
        failed,
        updated_at: new Date().toISOString(),
      })
      .eq("id", jobId);

    try {
      const corrected = await callAI(drug);
      const changedFields: string[] = [];
      const update: Record<string, string> = {};

      for (const f of FIELDS) {
        const next = (corrected[f] ?? "").trim();
        const prev = (drug[f] ?? "").trim();
        if (next !== prev) {
          update[f] = next;
          changedFields.push(f);
        }
      }

      if (changedFields.length > 0) {
        const { error: updErr } = await admin
          .from("drugs")
          .update(update)
          .eq("slug", drug.slug);
        if (updErr) throw updErr;
      }

      await admin.from("drug_verification_log").insert({
        job_id: jobId,
        drug_slug: drug.slug,
        drug_name: drug.name,
        status: changedFields.length > 0 ? "updated" : "unchanged",
        fields_changed: changedFields,
      });

      succeeded++;
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.error(`Failed for ${drug.name}:`, msg);
      await admin.from("drug_verification_log").insert({
        job_id: jobId,
        drug_slug: drug.slug,
        drug_name: drug.name,
        status: "failed",
        error: msg.slice(0, 500),
      });
      await admin
        .from("drug_verification_jobs")
        .update({ last_error: `${drug.name}: ${msg.slice(0, 200)}` })
        .eq("id", jobId);
      failed++;
      if (msg.includes("429")) {
        await new Promise((r) => setTimeout(r, 8000));
      }
    }

    processed++;
    await new Promise((r) => setTimeout(r, 400));
  }

  // Persist counters before continuation.
  await admin
    .from("drug_verification_jobs")
    .update({
      processed,
      succeeded,
      failed,
      updated_at: new Date().toISOString(),
    })
    .eq("id", jobId);

  if (processed >= total) {
    await admin
      .from("drug_verification_jobs")
      .update({
        status: "completed",
        current_drug: null,
        completed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", jobId);
    return;
  }

  // Hand off to the next chunk.
  await scheduleContinuation(jobId);
}

async function clearStalledJobs(admin: ReturnType<typeof createClient>) {
  const cutoff = new Date(Date.now() - STALL_MS).toISOString();
  await admin
    .from("drug_verification_jobs")
    .update({
      status: "failed",
      last_error: "Stalled (no heartbeat) — auto-cleared",
      completed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .in("status", ["pending", "running"])
    .lt("updated_at", cutoff);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const action = body.action ?? "start";
    const internalToken = req.headers.get("x-internal-token");
    const isInternal = !!internalToken && internalToken === SUPABASE_SERVICE_ROLE_KEY;
    const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Internal continuation: run a chunk in the background and return immediately.
    if (action === "continue" && isInternal) {
      const { jobId } = body;
      if (!jobId) {
        return new Response(JSON.stringify({ error: "Missing jobId" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      // @ts-ignore EdgeRuntime provided by Supabase
      EdgeRuntime.waitUntil(processChunk(jobId).catch((e) => console.error("chunk err", e)));
      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // All user-facing actions need an admin auth token.
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Missing auth" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const userClient = createClient(SUPABASE_URL, Deno.env.get("SUPABASE_ANON_KEY")!);
    const token = authHeader.replace(/^Bearer\s+/i, "");
    const { data: claimsData, error: userErr } = await userClient.auth.getClaims(token);
    if (userErr || !claimsData?.claims?.sub) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const userId = claimsData.claims.sub as string;
    const { data: roleRow } = await admin
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();
    if (!roleRow) {
      return new Response(JSON.stringify({ error: "Admin only" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "cancel") {
      const { jobId } = body;
      await admin
        .from("drug_verification_jobs")
        .update({
          status: "cancelled",
          completed_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", jobId);
      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "resume") {
      // Find the most recent non-terminal job; if it's stalled, re-kick it.
      const { data: jobs } = await admin
        .from("drug_verification_jobs")
        .select("id,status,updated_at")
        .in("status", ["pending", "running"])
        .order("created_at", { ascending: false })
        .limit(1);
      const j = jobs?.[0];
      if (!j) {
        return new Response(JSON.stringify({ error: "No resumable job" }), {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      await admin
        .from("drug_verification_jobs")
        .update({ updated_at: new Date().toISOString(), last_error: null })
        .eq("id", j.id);
      await scheduleContinuation(j.id);
      return new Response(JSON.stringify({ jobId: j.id, resumed: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // action === "start"
    await clearStalledJobs(admin);

    const { data: running } = await admin
      .from("drug_verification_jobs")
      .select("id")
      .in("status", ["pending", "running"]);
    if (running && running.length > 0) {
      return new Response(
        JSON.stringify({ error: "A verification job is already running", jobId: running[0].id }),
        { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const { data: job, error: jobErr } = await admin
      .from("drug_verification_jobs")
      .insert({ status: "pending", created_by: userId })
      .select("id")
      .single();
    if (jobErr) throw jobErr;

    await scheduleContinuation(job.id);

    return new Response(JSON.stringify({ jobId: job.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("verify-drugs error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});

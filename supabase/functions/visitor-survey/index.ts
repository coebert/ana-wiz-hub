import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { z } from "npm:zod@3";

const schema = z.object({
  visitor_id: z.string().uuid(),
  visit_id: z.string().uuid(),
  event: z.enum(["shown", "answer"]),
  answer: z.enum(["person", "automated", "prefer_not"]).optional(),
}).refine(body => body.event !== "answer" || body.answer !== undefined);
const reply = (body: unknown, status = 200) => new Response(JSON.stringify(body), {
  status, headers: { ...corsHeaders, "Content-Type": "application/json" },
});
Deno.serve(async req => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return reply({ error: "Method not allowed" }, 405);
  try {
    const parsed = schema.safeParse(await req.json().catch(() => null));
    if (!parsed.success) return reply({ error: "Invalid survey response" }, 400);
    const { visitor_id, visit_id, event, answer } = parsed.data;
    const url = Deno.env.get("SUPABASE_URL");
    const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!url || !key) return reply({ error: "Survey unavailable" }, 503);
    const admin = createClient(url, key);
    // Public, pseudonymous survey: require a matching recorded visit, never
    // expose responses or accept another visitor's ID without its visit ID.
    const { data: visit, error: visitError } = await admin.from("app_visits")
      .select("id").eq("id", visit_id).eq("visitor_id", visitor_id).maybeSingle();
    if (visitError) throw visitError;
    if (!visit) return reply({ error: "Recorded visit required" }, 400);
    const { error: invitationError } = await admin.from("visitor_survey_responses")
      .upsert({ visitor_id }, { onConflict: "visitor_id", ignoreDuplicates: true });
    if (invitationError) throw invitationError;
    if (event === "answer") {
      const { error } = await admin.from("visitor_survey_responses")
        .update({ answer, answered_at: new Date().toISOString() })
        .eq("visitor_id", visitor_id).is("answer", null);
      if (error) throw error;
    }
    return reply({ ok: true });
  } catch {
    return reply({ error: "Unable to save survey" }, 500);
  }
});
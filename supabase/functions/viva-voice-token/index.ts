/** Containment only: no clinical generation until the versioned source pipeline is ready. */
const SOURCE_UNAVAILABLE =
  "Current source material is not yet available for reliable AI answers or clinical scoring. Please read the relevant topic and original guidance. Your saved history has been kept.";
function sourceUnavailable(headers: HeadersInit = {}): Response {
  return new Response(
    JSON.stringify({
      status: "source_unavailable",
      code: "SOURCE_UNAVAILABLE",
      error: SOURCE_UNAVAILABLE,
      clinicalScore: null,
    }),
    {
      status: 503,
      headers: {
        ...Object.fromEntries(new Headers(headers)),
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    },
  );
}

// Live examination is held pending source review.
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    // Preserve authentication before exposing the clinical review status.
    const authHeader = req.headers.get("Authorization") ?? "";
    const token = authHeader.toLowerCase().startsWith("bearer ") ? authHeader.slice(7).trim() : "";
    if (!token) {
      return new Response(JSON.stringify({ error: "Authentication required" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");
    if (!supabaseUrl || !supabaseAnonKey) {
      return new Response(JSON.stringify({ error: "Server misconfigured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    });
    const { data: userData, error: userError } = await supabase.auth.getUser(token);
    if (userError || !userData?.user) {
      return new Response(JSON.stringify({ error: "Invalid or expired session" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Stop before clinical generation/cache/provider work. Authentication remains first.
    return sourceUnavailable(corsHeaders);

  } catch (e) {
    console.error("viva-voice-token: unhandled error", e);
    return new Response(JSON.stringify({ error: "Voice session creation failed — please try again." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

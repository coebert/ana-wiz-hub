import { getAuthedUserId } from "../_shared/require-user.ts";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { requestSpeechStream, resolveVoice } from "./request-audio.ts";
// Streams viva speech (24 kHz PCM over SSE) from the hosted voice engine.
// The browser chunks long text, so each request stays short and playback starts at once.

const MAX_CHARS = 2000;
const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (!(await getAuthedUserId(req))) return json({ error: "Please sign in to use this feature." }, 401);

  const apiKey = Deno.env.get("LOVABLE_API_KEY");
  if (!apiKey) return json({ error: "Service unavailable" }, 503);

  const { text, voice } = await req.json().catch(() => ({}));
  if (!text || typeof text !== "string" || !text.trim()) return json({ error: "Missing text" }, 400);
  if (text.length > MAX_CHARS) return json({ error: "Text too long for one segment" }, 400);

  try {
    const upstream = await requestSpeechStream(apiKey, text, resolveVoice(voice), req.signal);
    if (!upstream.ok || !upstream.body) {
      const details = await upstream.text();
      console.error(`[tts-demo] upstream ${upstream.status}: ${details}`);
      return json({ error: "Voice generation unavailable. Please try again.", status: upstream.status }, upstream.status);
    }
    return new Response(upstream.body, {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": upstream.headers.get("Content-Type") ?? "text/event-stream",
        "Cache-Control": "no-cache",
      },
    });
  } catch (err) {
    if (req.signal.aborted) return new Response(null, { status: 499, headers: corsHeaders });
    console.error("[tts-demo] error", err instanceof Error ? err.message : String(err));
    return json({ error: "Voice generation unavailable. Please try again." }, 502);
  }
});

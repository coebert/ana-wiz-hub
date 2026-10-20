import { getAuthedUserId } from "../_shared/require-user.ts";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { requestAudio } from "./request-audio.ts";
// Lightweight OpenAI TTS endpoint for short demo segments on the landing page.
// Mirrors the voice/model used by the podcast generator (alloy / gpt-4o-mini-tts)
// so the demo viva sounds like the rest of the app.
//
// JWTs are validated in code before any paid generation request.

import { encodeBase64 } from "https://deno.land/std@0.224.0/encoding/base64.ts";

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
const DEFAULT_VOICE = "alloy"; // matches podcast voice
const ALLOWED_VOICES = new Set([
  "alloy",
  "ash",
  "ballad",
  "coral",
  "echo",
  "fable",
  "onyx",
  "nova",
  "sage",
  "shimmer",
  "verse",
]);
const MAX_CHARS = 2000; // hard cap for demo segments

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (!(await getAuthedUserId(req))) {
    return new Response(JSON.stringify({ error: "Please sign in to use this feature." }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    if (!OPENAI_API_KEY) {
      console.error("[tts-demo] OPENAI_API_KEY not configured");
      return new Response(
        JSON.stringify({ error: "Service unavailable" }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const { text, voice } = await req.json().catch(() => ({}));
    if (!text || typeof text !== "string") {
      return new Response(
        JSON.stringify({ error: "Missing text" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const selectedVoice =
      typeof voice === "string" && ALLOWED_VOICES.has(voice) ? voice : DEFAULT_VOICE;
    const input = text.slice(0, MAX_CHARS);

    const buf = await requestAudio(OPENAI_API_KEY, input, selectedVoice);
    const audioBase64 = encodeBase64(new Uint8Array(buf));

    return new Response(
      JSON.stringify({ audioBase64, mimeType: "audio/mpeg" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[tts-demo] error", message);
    const timedOut = err instanceof Error && err.name === "AbortError";
    return new Response(
      JSON.stringify({ error: timedOut ? "Voice generation took too long. Please try again." : "Voice generation unavailable. Please try again." }),
      { status: timedOut ? 503 : 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});

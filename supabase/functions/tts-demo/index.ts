// Lightweight OpenAI TTS endpoint for short demo segments on the landing page.
// Mirrors the voice/model used by the podcast generator (alloy / gpt-4o-mini-tts)
// so the demo viva sounds like the rest of the app.
//
// Public (no JWT required) — config.toml sets verify_jwt = false.

import { encodeBase64 } from "https://deno.land/std@0.224.0/encoding/base64.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
const TTS_MODEL = "gpt-4o-mini-tts";
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

    const response = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: TTS_MODEL,
        voice: selectedVoice,
        input,
        response_format: "mp3",
        speed: 1.0,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("[tts-demo] OpenAI failed", response.status, errText);
      return new Response(
        JSON.stringify({ error: `TTS failed (${response.status})` }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const buf = await response.arrayBuffer();
    const audioBase64 = encodeBase64(new Uint8Array(buf));

    return new Response(
      JSON.stringify({ audioBase64, mimeType: "audio/mpeg" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[tts-demo] error", message);
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});

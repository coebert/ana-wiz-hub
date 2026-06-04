// Mints a short-lived OpenAI Realtime session token for the voice viva.
//
// Body: { topicTitle, topicDescription?, exam: "primary"|"final"|"fficm" }
// Returns: the OpenAI sessions response (client_secret.value is the ephemeral key).
//
// The OpenAI API key never leaves the edge function; the browser only sees the
// ephemeral key, which expires within ~60 s and is scoped to a single session.

import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const MODEL = "gpt-4o-realtime-preview-2024-12-17";
const VOICE = "alloy";

type Exam = "primary" | "final" | "fficm";

const EXAM_LABEL: Record<Exam, string> = {
  primary: "FRCA Primary (basic sciences) — expect physics, physiology, pharmacology to a junior trainee standard.",
  final: "FRCA Final (applied clinical) — expect senior trainee standard with structured clinical reasoning.",
  fficm: "FFICM (critical care) — expect senior ICM trainee depth on physiology, evidence and decision-making.",
};

function buildInstructions(opts: { topicTitle: string; topicDescription?: string; exam: Exam }) {
  return `You are an experienced UK ${opts.exam.toUpperCase()} viva examiner.

Topic: "${opts.topicTitle}".
${opts.topicDescription ? `Context: ${opts.topicDescription}\n` : ""}
Exam standard: ${EXAM_LABEL[opts.exam]}

Conduct a live oral viva:
1. Open with a warm but professional greeting, then ask ONE focused opening question on the topic.
2. Wait for the candidate to answer. Listen actively. Do not narrate your own thinking.
3. Probe with follow-up questions exactly as a UK examiner would — short, specific, escalating in difficulty.
4. If the candidate is stuck after ~10 s of silence, offer a gentle prompt (not the answer).
5. After roughly 6–8 minutes of dialogue, say "Thank you — let me give you some feedback" and deliver:
   • A short overall judgement (pass / borderline / fail at this exam standard).
   • Three concrete strengths.
   • Three concrete areas to improve, each with one sentence of advice.
   • One model-answer bullet list for the opening question.

Style rules:
- Speak naturally, one question at a time. Never read a list of questions.
- Use British English and SI units. Pronounce drug names correctly.
- Never invent guidelines; if unsure, ask the candidate what guideline they are using.
- Keep your turns under ~25 seconds.`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const apiKey = Deno.env.get("OPENAI_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "OPENAI_API_KEY not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = (await req.json().catch(() => ({}))) as {
      topicTitle?: string;
      topicDescription?: string;
      exam?: Exam;
    };

    const topicTitle = (body.topicTitle ?? "").toString().trim() || "General anaesthesia";
    const exam: Exam = (body.exam === "primary" || body.exam === "final" || body.exam === "fficm")
      ? body.exam
      : "final";

    const instructions = buildInstructions({
      topicTitle,
      topicDescription: body.topicDescription,
      exam,
    });

    const r = await fetch("https://api.openai.com/v1/realtime/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "OpenAI-Beta": "realtime=v1",
      },
      body: JSON.stringify({
        model: MODEL,
        voice: VOICE,
        modalities: ["audio", "text"],
        instructions,
        input_audio_transcription: { model: "whisper-1" },
        turn_detection: { type: "server_vad", threshold: 0.5, prefix_padding_ms: 300, silence_duration_ms: 600 },
      }),
    });

    const text = await r.text();
    if (!r.ok) {
      return new Response(
        JSON.stringify({ error: `OpenAI sessions error ${r.status}: ${text}` }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(text, {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

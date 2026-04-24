// Generates an exam-focused podcast for a topic.
// Flow:
//   1. Receives topicId, topicTitle, and extracted text content from the client.
//   2. Looks up the existing podcast row; returns immediately if status === 'ready'.
//   3. Otherwise: marks as 'generating', generates a ~6 min script via Lovable AI,
//      synthesises audio via OpenAI TTS (chunked + concatenated as MP3),
//      uploads to the 'podcasts' storage bucket, and updates the row to 'ready'.
//
// This is intentionally synchronous from the client's perspective — the first
// listener of each topic waits ~30–60s. Subsequent listeners get the cached
// audio from public storage with no edge function call at all.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY")!;
const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY")!;

const TTS_MODEL = "gpt-4o-mini-tts";
const TTS_VOICE = "alloy"; // calm, neutral narration
const MAX_TTS_CHARS = 3500; // chunk size; OpenAI hard limit is 4096

interface RequestBody {
  topicId: string;
  topicTitle: string;
  content: string; // plain text extracted from the topic page
}

const SYSTEM_PROMPT = `You are an experienced FRCA (Fellowship of the Royal College of Anaesthetists) examiner and clinical anaesthetist creating audio study material for trainees preparing for the FRCA Primary, Final, and FFICM exams.

Write a 6-minute single-narrator podcast script (~900 words, plain prose only — no headings, no bullet points, no markdown, no stage directions). The script will be read aloud by a text-to-speech engine, so:
- Spell out abbreviations on first use (e.g. "MAP, mean arterial pressure")
- Use natural pauses with commas and full stops
- Avoid symbols, equations as symbols, or anything that won't read well aloud (write "equals" instead of "=", "times" instead of "×")
- Numbers should generally be written out for short numbers (e.g. "ten percent" not "10%")

CRITICAL ACCURACY RULES:
- Use ONLY information present in the provided topic content. Do not invent drug doses, mechanisms, anatomical details, or clinical figures.
- You may rephrase, expand on context, and add brief clinical framing (e.g. "this matters in theatre because…") provided it is clinically accurate and consistent with the source material.
- If the source contains a fact, you may explain it more thoroughly. If the source does NOT contain a fact, do not introduce it.
- Do not contradict anything in the source.
- Maintain UK anaesthetic terminology and spelling.

STRUCTURE (single flowing narration, no section headers spoken aloud):
1. Brief hook: why this topic matters in exam and clinical practice (~30s)
2. Core concepts: walk through the key teaching points in a logical order (~3 min)
3. Exam-focused viva-style framing: "if an examiner asks…", "the classic answer is…", "trainees often forget…" (~1.5 min)
4. Three to five take-home pearls to remember (~45s)
5. Brief closing (~15s)

Tone: warm, confident, like a senior trainee tutoring a peer. Not lecturing.

Output ONLY the spoken script. No preamble, no title, no "Welcome back to…", no metadata.`;

async function generateScript(topicTitle: string, content: string): Promise<string> {
  const userPrompt = `Topic: ${topicTitle}\n\n--- SOURCE CONTENT (use only this) ---\n\n${content}\n\n--- END SOURCE ---\n\nWrite the 6-minute exam-focused podcast script now.`;

  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-pro",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    if (response.status === 429) throw new Error("Rate limit reached generating script. Try again in a moment.");
    if (response.status === 402) throw new Error("Lovable AI credits exhausted. Add credits in Settings → Workspace → Usage.");
    throw new Error(`Script generation failed (${response.status}): ${text}`);
  }

  const data = await response.json();
  const script = data?.choices?.[0]?.message?.content?.trim();
  if (!script) throw new Error("Script generation returned empty content");
  return script;
}

// Split script at sentence boundaries into chunks <= MAX_TTS_CHARS
function chunkScript(script: string): string[] {
  const sentences = script.split(/(?<=[.!?])\s+/);
  const chunks: string[] = [];
  let current = "";
  for (const sentence of sentences) {
    if ((current + " " + sentence).trim().length > MAX_TTS_CHARS) {
      if (current) chunks.push(current.trim());
      current = sentence;
    } else {
      current = (current + " " + sentence).trim();
    }
  }
  if (current) chunks.push(current.trim());
  return chunks;
}

async function synthesiseChunk(text: string): Promise<Uint8Array> {
  const response = await fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: TTS_MODEL,
      voice: TTS_VOICE,
      input: text,
      response_format: "mp3",
      speed: 1.0,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`OpenAI TTS failed (${response.status}): ${errText}`);
  }

  const buf = await response.arrayBuffer();
  return new Uint8Array(buf);
}

// Concatenate MP3 byte arrays. MP3 frames are independent so naive concat
// produces a playable file (fine for spoken audio, no precision required).
function concatMp3(parts: Uint8Array[]): Uint8Array {
  const total = parts.reduce((sum, p) => sum + p.length, 0);
  const out = new Uint8Array(total);
  let offset = 0;
  for (const p of parts) {
    out.set(p, offset);
    offset += p.length;
  }
  return out;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);

  try {
    const { topicId, topicTitle, content } = (await req.json()) as RequestBody;

    if (!topicId || !topicTitle || !content) {
      return new Response(
        JSON.stringify({ error: "topicId, topicTitle and content are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Check existing row
    const { data: existing } = await supabase
      .from("podcasts")
      .select("*")
      .eq("topic_id", topicId)
      .maybeSingle();

    if (existing?.status === "ready" && existing.audio_path) {
      const { data: pub } = supabase.storage.from("podcasts").getPublicUrl(existing.audio_path);
      return new Response(
        JSON.stringify({
          status: "ready",
          audio_url: pub.publicUrl,
          script: existing.script,
          duration_seconds: existing.duration_seconds,
          cached: true,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    if (existing?.status === "generating") {
      return new Response(
        JSON.stringify({ status: "generating", message: "Already in progress" }),
        { status: 202, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Upsert generating row
    await supabase.from("podcasts").upsert(
      {
        topic_id: topicId,
        topic_title: topicTitle,
        status: "generating",
        error_message: null,
      },
      { onConflict: "topic_id" },
    );

    try {
      console.log(`[${topicId}] Generating script...`);
      const script = await generateScript(topicTitle, content);
      console.log(`[${topicId}] Script length: ${script.length} chars`);

      const chunks = chunkScript(script);
      console.log(`[${topicId}] Synthesising ${chunks.length} chunk(s)...`);
      const audioParts: Uint8Array[] = [];
      for (let i = 0; i < chunks.length; i++) {
        console.log(`[${topicId}] Chunk ${i + 1}/${chunks.length} (${chunks[i].length} chars)`);
        audioParts.push(await synthesiseChunk(chunks[i]));
      }

      const fullAudio = concatMp3(audioParts);
      const audioPath = `${topicId}.mp3`;
      console.log(`[${topicId}] Uploading ${fullAudio.length} bytes to ${audioPath}`);

      const { error: uploadErr } = await supabase.storage
        .from("podcasts")
        .upload(audioPath, fullAudio, {
          contentType: "audio/mpeg",
          upsert: true,
        });
      if (uploadErr) throw new Error(`Storage upload failed: ${uploadErr.message}`);

      // Estimate duration: ~150 wpm narration → words / 2.5 = seconds
      const wordCount = script.split(/\s+/).length;
      const durationSeconds = Math.round(wordCount / 2.5);

      await supabase
        .from("podcasts")
        .update({
          script,
          audio_path: audioPath,
          duration_seconds: durationSeconds,
          voice: TTS_VOICE,
          status: "ready",
          error_message: null,
        })
        .eq("topic_id", topicId);

      const { data: pub } = supabase.storage.from("podcasts").getPublicUrl(audioPath);

      return new Response(
        JSON.stringify({
          status: "ready",
          audio_url: pub.publicUrl,
          script,
          duration_seconds: durationSeconds,
          cached: false,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    } catch (genErr) {
      const message = genErr instanceof Error ? genErr.message : String(genErr);
      console.error(`[${topicId}] Generation failed:`, message);
      await supabase
        .from("podcasts")
        .update({ status: "failed", error_message: message })
        .eq("topic_id", topicId);
      return new Response(
        JSON.stringify({ status: "failed", error: message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Request failed:", message);
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});

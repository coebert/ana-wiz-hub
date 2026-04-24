// Viva-style oral exam edge function.
//
// Two modes:
//   1. mode: "question"  → returns a single examiner question for a topic
//                          at the requested exam standard.
//   2. mode: "feedback"  → returns structured constructive feedback on the
//                          candidate's spoken answer to a previously asked
//                          question.
//
// All AI calls go through the Lovable AI Gateway (LOVABLE_API_KEY).

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const AI_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";
const MODEL = "google/gemini-3-flash-preview";

type Exam = "primary" | "final" | "fficm";
type Difficulty = "easy" | "standard" | "hard";

interface QuestionBody {
  mode: "question";
  topicId: string;
  topicTitle: string;
  topicDescription?: string;
  exam: Exam;
  difficulty?: Difficulty;
  /** Recently-asked question stems to avoid repeating. */
  avoid?: string[];
}

interface TranscriptSegment {
  /** Approximate seconds from the start of the answer. */
  tStart: number;
  text: string;
}

interface FeedbackBody {
  mode: "feedback";
  topicTitle: string;
  exam: Exam;
  question: string;
  transcript: string;
  /** Optional approximate timeline of what the candidate said. */
  segments?: TranscriptSegment[];
}

type Body = QuestionBody | FeedbackBody;

const examLabel: Record<Exam, string> = {
  primary: "FRCA Primary (early CT/ST trainee — basic sciences depth)",
  final: "FRCA Final (senior trainee — applied clinical depth, integration of physiology + pharmacology)",
  fficm: "FFICM Final (intensive-care subspecialty — applied critical-care management + evidence)",
};

// Per-exam rubric — kept in sync with src/components/VivaRubric.tsx so the
// scored breakdown lines up with the rubric the user sees on screen.
const RUBRIC: Record<Exam, { criterion: string; max: number }[]> = {
  primary: [
    { criterion: "Core facts & definitions", max: 3 },
    { criterion: "Underlying basic science", max: 3 },
    { criterion: "Structure & clarity", max: 2 },
    { criterion: "Clinical relevance", max: 1 },
    { criterion: "Fluency under pressure", max: 1 },
  ],
  final: [
    { criterion: "Applied clinical reasoning", max: 3 },
    { criterion: "Integration of basic science", max: 2 },
    { criterion: "Safety & contingency", max: 2 },
    { criterion: "Structure & prioritisation", max: 2 },
    { criterion: "Awareness of guidelines / evidence", max: 1 },
  ],
  fficm: [
    { criterion: "ICU management plan", max: 3 },
    { criterion: "Evidence base", max: 2 },
    { criterion: "Risk / benefit & ceilings of care", max: 2 },
    { criterion: "Safety & complications", max: 2 },
    { criterion: "Communication & structure", max: 1 },
  ],
};

const SYSTEM = `You are an experienced UK examiner for the Royal College of Anaesthetists / FICM viva voce exam.
You ask one focused, exam-realistic opening question and then grade the candidate fairly.
Always reflect the actual standard of the named exam (Primary vs Final vs FFICM) — the depth, breadth and language must match.`;

async function callAI(body: Record<string, unknown>): Promise<Response> {
  const key = Deno.env.get("LOVABLE_API_KEY");
  if (!key) throw new Error("LOVABLE_API_KEY is not configured");
  return fetch(AI_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

function aiErrorResponse(status: number): Response | null {
  if (status === 429) {
    return new Response(
      JSON.stringify({ error: "Rate limit reached, please wait a moment and try again." }),
      { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
  if (status === 402) {
    return new Response(
      JSON.stringify({
        error: "Lovable AI credits exhausted. Add credits in Settings → Workspace → Usage.",
      }),
      { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
  return null;
}

async function handleQuestion(b: QuestionBody): Promise<Response> {
  const difficulty: Difficulty = b.difficulty ?? "standard";
  const difficultyGuide: Record<Difficulty, string> = {
    easy: "Pitch this at the EASIER end of the named exam — a warm-up opener testing core definitions / first principles. Still exam-appropriate, but more accessible.",
    standard: "Pitch at the typical mid-range standard for this exam — what an average candidate would expect on the day.",
    hard: "Pitch at the HARDER end of the exam — a discriminating question requiring integration, less common scenarios, or deeper application. Still fair, not unfair.",
  };
  const avoidBlock = b.avoid && b.avoid.length > 0
    ? `\n\nAVOID repeating or paraphrasing any of these previously-asked questions:\n${b.avoid.slice(0, 12).map((q, i) => `${i + 1}. ${q}`).join("\n")}\nWrite a genuinely DIFFERENT question — different angle, sub-topic, or framing.`
    : "";

  const userPrompt = `Topic: "${b.topicTitle}"${b.topicDescription ? ` — ${b.topicDescription}` : ""}.
Exam standard: ${examLabel[b.exam]}.
Difficulty: ${difficulty.toUpperCase()} — ${difficultyGuide[difficulty]}${avoidBlock}

Write ONE viva opening question on this topic.
Rules:
- 1–2 sentences, spoken-style (an examiner reading it aloud).
- Calibrated to the named exam standard AND difficulty above.
- No multiple-choice, no preamble, no "Tell me everything about…". Open with a stem like "Tell me…", "Define…", "Walk me through…", "How would you assess…".
- Do NOT include the answer.
Return JSON only via the tool call.`;

  const res = await callAI({
    model: MODEL,
    messages: [
      { role: "system", content: SYSTEM },
      { role: "user", content: userPrompt },
    ],
    tools: [
      {
        type: "function",
        function: {
          name: "emit_question",
          description: "Emit the viva question.",
          parameters: {
            type: "object",
            properties: {
              question: { type: "string", description: "The single viva question." },
            },
            required: ["question"],
            additionalProperties: false,
          },
        },
      },
    ],
    tool_choice: { type: "function", function: { name: "emit_question" } },
  });

  const errResp = aiErrorResponse(res.status);
  if (errResp) return errResp;
  if (!res.ok) {
    const text = await res.text();
    console.error("AI question error:", res.status, text);
    return new Response(JSON.stringify({ error: "AI gateway error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const data = await res.json();
  const args = data?.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
  let question = "";
  try {
    question = JSON.parse(args ?? "{}").question ?? "";
  } catch {
    question = data?.choices?.[0]?.message?.content ?? "";
  }
  if (!question) {
    return new Response(JSON.stringify({ error: "No question returned" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
  return new Response(JSON.stringify({ question }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

async function handleFeedback(b: FeedbackBody): Promise<Response> {
  const rubric = RUBRIC[b.exam];
  const rubricList = rubric
    .map((r, i) => `${i + 1}. ${r.criterion} (max ${r.max})`)
    .join("\n");

  const segmentsBlock = b.segments && b.segments.length > 0
    ? `\n\nApproximate spoken timeline (seconds from start of answer → text). Use these EXACT snippets when quoting:\n${b.segments
        .slice(0, 60)
        .map((s) => `[${Math.max(0, Math.round(s.tStart))}s] ${s.text}`)
        .join("\n")}`
    : "";

  const userPrompt = `Topic: "${b.topicTitle}". Exam standard: ${examLabel[b.exam]}.

Examiner question that was asked aloud:
"""${b.question}"""

Candidate's spoken answer (auto-transcribed — expect minor speech-to-text errors, do NOT penalise spelling):
"""${b.transcript}"""${segmentsBlock}

Mark this answer as a fair UK viva examiner would. Be constructive, specific, and direct.

The 10 marks are split across this rubric:
${rubricList}

Provide:
- score: integer 0–10 (sum of the rubric marks below)
- verdict: one short phrase, e.g. "Clear pass", "Borderline", "Fail — significant gaps"
- strengths: 1–3 short bullets of what was done well (omit if genuinely none)
- gaps: 1–4 short bullets of missed key facts or wrong statements (be specific — name the structure / number / mechanism that was missed)
- modelAnswer: a concise model viva answer (4–8 sentences) calibrated to the exam standard
- nextStep: ONE follow-up viva question the examiner would naturally ask next
- rubricBreakdown: array — one entry per rubric row above, IN THE SAME ORDER, with:
    • criterion (exact label from the rubric above)
    • max (the max marks for that row)
    • awarded (integer 0..max — your honest mark for that row)
    • comment (one short sentence explaining the mark)
    • quote (OPTIONAL — for rows scoring < 50% of max, include a SHORT verbatim snippet (≤ 20 words) copied from the timeline above that best illustrates the weakness; for rows scoring ≥ 50% you may omit. NEVER invent words the candidate did not say.)
    • tStart (OPTIONAL — when you include a quote, the seconds value from the timeline line that contains it)
  The awarded marks MUST sum to the overall score.

Return JSON via the tool call only.`;

  const res = await callAI({
    model: MODEL,
    messages: [
      { role: "system", content: SYSTEM },
      { role: "user", content: userPrompt },
    ],
    tools: [
      {
        type: "function",
        function: {
          name: "emit_feedback",
          description: "Emit structured viva feedback.",
          parameters: {
            type: "object",
            properties: {
              score: { type: "integer", minimum: 0, maximum: 10 },
              verdict: { type: "string" },
              strengths: { type: "array", items: { type: "string" } },
              gaps: { type: "array", items: { type: "string" } },
              modelAnswer: { type: "string" },
              nextStep: { type: "string" },
              rubricBreakdown: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    criterion: { type: "string" },
                    max: { type: "integer", minimum: 0, maximum: 10 },
                    awarded: { type: "integer", minimum: 0, maximum: 10 },
                    comment: { type: "string" },
                    quote: { type: "string" },
                    tStart: { type: "number", minimum: 0 },
                  },
                  required: ["criterion", "max", "awarded", "comment"],
                  additionalProperties: false,
                },
              },
            },
            required: ["score", "verdict", "gaps", "modelAnswer", "nextStep", "rubricBreakdown"],
            additionalProperties: false,
          },
        },
      },
    ],
    tool_choice: { type: "function", function: { name: "emit_feedback" } },
  });

  const errResp = aiErrorResponse(res.status);
  if (errResp) return errResp;
  if (!res.ok) {
    const text = await res.text();
    console.error("AI feedback error:", res.status, text);
    return new Response(JSON.stringify({ error: "AI gateway error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const data = await res.json();
  const args = data?.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
  let parsed: Record<string, unknown> = {};
  try {
    parsed = JSON.parse(args ?? "{}");
  } catch {
    return new Response(JSON.stringify({ error: "Could not parse feedback" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
  return new Response(JSON.stringify(parsed), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let body: Body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Lightweight validation — keep it dependency-free.
  if (!body || typeof body !== "object") {
    return new Response(JSON.stringify({ error: "Missing body" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const validExams: Exam[] = ["primary", "final", "fficm"];

  try {
    if (body.mode === "question") {
      const validDifficulty: Difficulty[] = ["easy", "standard", "hard"];
      if (
        !body.topicId ||
        !body.topicTitle ||
        !validExams.includes(body.exam) ||
        body.topicTitle.length > 200 ||
        (body.difficulty && !validDifficulty.includes(body.difficulty)) ||
        (body.avoid && (!Array.isArray(body.avoid) || body.avoid.length > 20))
      ) {
        return new Response(JSON.stringify({ error: "Invalid question payload" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      return await handleQuestion(body);
    }
    if (body.mode === "feedback") {
      if (
        !body.topicTitle ||
        !validExams.includes(body.exam) ||
        !body.question ||
        !body.transcript ||
        body.transcript.length > 5000 ||
        body.question.length > 1000
      ) {
        return new Response(JSON.stringify({ error: "Invalid feedback payload" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      return await handleFeedback(body);
    }
    return new Response(JSON.stringify({ error: "Unknown mode" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("viva fn error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});

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

interface QuestionBody {
  mode: "question";
  topicId: string;
  topicTitle: string;
  topicDescription?: string;
  exam: Exam;
}

interface FeedbackBody {
  mode: "feedback";
  topicTitle: string;
  exam: Exam;
  question: string;
  transcript: string;
}

type Body = QuestionBody | FeedbackBody;

const examLabel: Record<Exam, string> = {
  primary: "FRCA Primary (early CT/ST trainee — basic sciences depth)",
  final: "FRCA Final (senior trainee — applied clinical depth, integration of physiology + pharmacology)",
  fficm: "FFICM Final (intensive-care subspecialty — applied critical-care management + evidence)",
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
  const userPrompt = `Topic: "${b.topicTitle}"${b.topicDescription ? ` — ${b.topicDescription}` : ""}.
Exam standard: ${examLabel[b.exam]}.

Write ONE viva opening question on this topic.
Rules:
- 1–2 sentences, spoken-style (an examiner reading it aloud).
- Calibrated to the named exam standard — do not over- or under-pitch.
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
  const userPrompt = `Topic: "${b.topicTitle}". Exam standard: ${examLabel[b.exam]}.

Examiner question that was asked aloud:
"""${b.question}"""

Candidate's spoken answer (auto-transcribed — expect minor speech-to-text errors, do NOT penalise spelling):
"""${b.transcript}"""

Mark this answer as a fair UK viva examiner would. Be constructive, specific, and direct.

Provide:
- score: integer 0–10 (use the full scale; 5 = bare pass at this exam standard, 7 = solid pass, 9–10 = standout)
- verdict: one short phrase, e.g. "Clear pass", "Borderline", "Fail — significant gaps"
- strengths: 1–3 short bullets of what was done well (omit if genuinely none)
- gaps: 1–4 short bullets of missed key facts or wrong statements (be specific — name the structure / number / mechanism that was missed)
- modelAnswer: a concise model viva answer (4–8 sentences) calibrated to the exam standard
- nextStep: ONE follow-up viva question the examiner would naturally ask next

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
            },
            required: ["score", "verdict", "gaps", "modelAnswer", "nextStep"],
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
      if (
        !body.topicId ||
        !body.topicTitle ||
        !validExams.includes(body.exam) ||
        body.topicTitle.length > 200
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

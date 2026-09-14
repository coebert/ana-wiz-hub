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
import { TOPIC_ID_ALLOWLIST } from "./_topic-ids.ts";

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

// Regional narrator bank. Mirrors ACCENT_BANK in src/lib/podcastVoices.ts —
// keep ids, base voices and traits in sync. gpt-4o-mini-tts supports steerable
// delivery, so the accent comes from the built `instructions` string.
interface AccentRow {
  id: string;
  voice: string;
  accent: string;
  traits: string;
  nonBritish?: boolean;
}
interface VoicePreset {
  voice: string;
  instructions: string;
}
const BASE_STYLE =
  "Warm, confident and clear, like a senior anaesthetic trainee tutoring a peer. " +
  "Steady pace, natural phrasing, no exaggeration.";

const ACCENT_BANK: AccentRow[] = [
  // ---------------- General UK ----------------
  {
    id: "british-rp",
    voice: "alloy",
    accent: "British English, modern Received Pronunciation",
    traits: "Non-rhotic, crisp consonants, even measured intonation, no regional colouring.",
  },
  {
    id: "british-female-warm",
    voice: "coral",
    accent: "female British English, warm modern RP",
    traits: "Non-rhotic, gentle rising phrasing, encouraging tutorial warmth.",
  },
  {
    id: "british-male-deep",
    voice: "onyx",
    accent: "male British English, deep authoritative RP",
    traits: "Low chest resonance, unhurried, deliberate stress on key terms.",
  },
  {
    id: "british-storyteller",
    voice: "fable",
    accent: "British English documentary narration",
    traits: "Expressive dynamic range, curious lifts at clause ends, theatrical but controlled.",
  },
  {
    id: "british-estuary",
    voice: "verse",
    accent: "Estuary English (London and the Thames estuary)",
    traits:
      "Softened t-glottalling ('bu'er' for butter), l-vocalisation, RP-adjacent vowels with a modern urban lilt.",
  },
  // Southern England

  // ---------------- Southern England ----------------
  {
    id: "british-cockney",
    voice: "ballad",
    accent: "Cockney (traditional East London)",
    traits:
      "Dropped h's, th-fronting ('fink' for think), glottal stops, diphthong shift ('fice' for face), quick lively rhythm.",
  },
  {
    id: "british-west-country",
    voice: "fable",
    accent: "English West Country (Somerset and Devon)",
    traits:
      "Strongly rhotic burr — sound the 'r' in farm, harder, water. Long broad 'a' ('baath'), soft rounded vowels, gently sing-song unhurried rural lilt.",
  },
  {
    id: "british-bristol",
    voice: "fable",
    accent: "Bristolian (city West Country)",
    traits:
      "Rhotic but brisker than rural Somerset, the Bristol 'l' added to final vowels, flat friendly urban delivery.",
  },
  {
    id: "british-cornish",
    voice: "fable",
    accent: "Cornish (far South West England)",
    traits:
      "Rhotic with a lilting Celtic musicality, elongated vowels, softened endings, gentle seaside cadence.",
  },
  {
    id: "british-east-anglian",
    voice: "ash",
    accent: "Norfolk and East Anglian",
    traits:
      "Distinctive falling-then-rising intonation, yod-dropping ('noo' for new), long 'oo' vowels, relaxed pace.",
  },
  // Midlands
  {
    id: "british-essex",
    voice: "verse",
    accent: "Essex English (south-east England)",
    traits:
      "Strong t-glottalling, l-vocalisation, wide 'ai' diphthongs, upbeat urban lilt.",
  },
  {
    id: "british-kent",
    voice: "ballad",
    accent: "Kentish (south-east England)",
    traits:
      "Non-rhotic, softened final consonants, gently drawled long vowels, relaxed cadence.",
  },
  {
    id: "british-sussex",
    voice: "coral",
    accent: "Sussex and Brighton south-coast English",
    traits:
      "Non-rhotic in modern speech (the old Sussex burr is gone), mellow open vowels, mild t-glottalling, easy relaxed rhythm.",
  },
  {
    id: "british-hampshire",
    voice: "alloy",
    accent: "Hampshire and Solent English",
    traits:
      "Near-RP frame with faint West-Country colouring on long vowels, light rhotic trace in older speech, gentle unhurried delivery.",
  },
  {
    id: "british-dorset",
    voice: "fable",
    accent: "Dorset (rural southern England)",
    traits:
      "Rhotic burred 'r', long drawled 'aa' in bath and grass, voiced 's' at word onset, unhurried lilt.",
  },
  {
    id: "british-home-counties",
    voice: "onyx",
    accent: "Home Counties English (Surrey, Berkshire, Buckinghamshire)",
    traits:
      "Near-RP, clipped consonants, restrained intonation, faint Estuary softening of 't'.",
  },
  {
    id: "british-oxford",
    voice: "sage",
    accent: "Oxford and Thames Valley English",
    traits:
      "Precise near-RP articulation, careful vowel length, measured lecturing cadence.",
  },

  // ---------------- Midlands ----------------
  {
    id: "british-brummie",
    voice: "verse",
    accent: "Birmingham (Brummie)",
    traits:
      "Characteristic downward sentence-final intonation, nasal resonance, 'oi' coloured 'i' in price, unhurried flat delivery.",
  },
  {
    id: "british-black-country",
    voice: "ash",
    accent: "Black Country (Dudley and Wolverhampton)",
    traits:
      "Older Midlands vowels, 'yow' for you, flat FOOT/STRUT vowels, sturdy rhythmic stress and rising ends.",
  },
  {
    id: "british-east-midlands",
    voice: "alloy",
    accent: "East Midlands (Nottingham and Derby)",
    traits:
      "Northern-style short 'a' in bath, flat unrounded vowels, dropped final g's, level even rhythm.",
  },
  // Northern England
  {
    id: "british-potteries",
    voice: "ash",
    accent: "Potteries (Stoke-on-Trent)",
    traits:
      "Flat northern 'a' and 'u', distinctive rising terminals, clipped short vowels, sing-song lift.",
  },
  {
    id: "british-coventry",
    voice: "verse",
    accent: "Coventry English",
    traits:
      "Brummie-adjacent falling intonation with flatter vowels, elongated 'ay', lightly nasal resonance.",
  },
  {
    id: "british-leicester",
    voice: "coral",
    accent: "Leicester (East Midlands)",
    traits:
      "Flat 'a', dropped h-onsets, shortened function words, level unshowy intonation.",
  },
  {
    id: "british-nottingham",
    voice: "alloy",
    accent: "Nottingham (Nottinghamshire)",
    traits:
      "Flat 'u' in bus, monophthongal 'o', glottal replacement of final 't', quick clipped rhythm.",
  },
  {
    id: "british-lincolnshire",
    voice: "ballad",
    accent: "Lincolnshire (rural east England)",
    traits:
      "Long open vowels, rhotic traces, dropped 'h', slow deliberate agricultural cadence.",
  },
  {
    id: "british-shropshire",
    voice: "fable",
    accent: "Shropshire and Welsh border English",
    traits:
      "Softly rhotic, gentle sing-song borrowed from Welsh phrasing, unhurried warm delivery.",
  },
  {
    id: "british-northampton",
    voice: "sage",
    accent: "Northamptonshire English",
    traits:
      "Transitional north-south vowels, mixed 'a' in bath, level intonation, mild t-glottalling.",
  },

  // ---------------- Northern England ----------------
  {
    id: "british-yorkshire",
    voice: "ash",
    accent: "Yorkshire",
    traits:
      "Short flat 'a' in bath and grass, FOOT/STRUT merger ('boos' for bus), definite article reduction, blunt warm cadence.",
  },
  {
    id: "british-lancashire",
    voice: "fable",
    accent: "Lancashire (North West England)",
    traits:
      "Short northern 'a', slightly rhotic in older forms, elongated 'oo', friendly gently rolling intonation.",
  },
  {
    id: "british-manchester",
    voice: "verse",
    accent: "Mancunian (Manchester)",
    traits:
      "Flat northern vowels, prominent final 'er' as 'a', clipped confident delivery, level intonation.",
  },
  {
    id: "british-scouse",
    voice: "ballad",
    accent: "Scouse (Liverpool, Merseyside)",
    traits:
      "Fast rise-fall melody, velar fricative in back and book, hard 'k' softening, adenoidal nasal resonance.",
  },
  {
    id: "british-geordie",
    voice: "ash",
    accent: "Geordie (Newcastle upon Tyne, Tyneside)",
    traits:
      "Musical rising intonation, 'gan' and 'toon' vowels, long 'ee' endings, warm energetic pace.",
  },
  {
    id: "british-mackem",
    voice: "ballad",
    accent: "Mackem (Sunderland, Wearside)",
    traits:
      "Tyneside-adjacent but flatter, 'make' as 'mak', shortened vowels, brisk plain-spoken rhythm.",
  },
  {
    id: "british-cumbrian",
    voice: "fable",
    accent: "Cumbrian (Lake District and Scottish border)",
    traits:
      "Northern short vowels with a faint Scots edge, slight rhoticity, lilting rural border cadence.",
  },
  // Wales
  {
    id: "british-sheffield",
    voice: "onyx",
    accent: "Sheffield (South Yorkshire)",
    traits:
      "Flat 'a' and 'u', definite-article reduction ('t'hospital'), dark 'l', blunt falling ends.",
  },
  {
    id: "british-hull",
    voice: "verse",
    accent: "Hull and East Yorkshire",
    traits:
      "H-dropping, NURSE fronted and rounded so 'work' leans to 'werk', GOAT monophthong ('phern' for phone), flat 'a', dry level tone.",
  },
  {
    id: "british-leeds",
    voice: "ash",
    accent: "Leeds (West Yorkshire)",
    traits:
      "Flat vowels, short 'oo' in book, dropped h-onsets, steady practical rhythm.",
  },
  {
    id: "british-teesside",
    voice: "coral",
    accent: "Teesside (Middlesbrough)",
    traits:
      "Fronted 'oo', Geordie-adjacent lifts without full Tyneside vowels, brisk warm delivery.",
  },
  {
    id: "british-durham",
    voice: "alloy",
    accent: "County Durham English",
    traits:
      "Softer Geordie-adjacent vowels, gentle rise-fall, rhotic-free with warm rounded 'o'.",
  },
  {
    id: "british-northumberland",
    voice: "fable",
    accent: "Northumberland (rural north-east)",
    traits:
      "Trace of the traditional Northumbrian burr on 'r' (now rare), long open vowels, lilting rise-fall, unhurried pastoral cadence.",
  },
  {
    id: "british-bolton",
    voice: "ballad",
    accent: "Bolton and Greater Manchester town English",
    traits:
      "Flat 'a', shortened 'the', nasal Mancunian-adjacent resonance, quick clipped phrasing.",
  },
  {
    id: "british-preston",
    voice: "sage",
    accent: "Preston and central Lancashire",
    traits:
      "Rhotic traces, flat vowels, dropped 'h', level down-to-earth delivery.",
  },

  // ---------------- Islands and Crown dependencies ----------------
  {
    id: "british-isle-of-man",
    voice: "ash",
    accent: "Manx English (Isle of Man)",
    traits:
      "Lancashire-tinged vowels with Gaelic lilt, slight rhoticity, gentle rising phrase ends.",
  },

  // ---------------- Wales ----------------
  {
    id: "welsh-south",
    voice: "coral",
    accent: "general South Wales English",
    traits:
      "Sing-song rise and fall, pure elongated vowels, rolled light 'r', clear consonants, melodic warmth.",
  },
  {
    id: "welsh-north",
    voice: "fable",
    accent: "North Wales (Gwynedd and Anglesey)",
    traits:
      "Stronger Welsh-language influence, crisp dark 'l', clipped precise consonants, steady lilt with falling ends.",
  },
  // Scotland
  {
    id: "welsh-cardiff",
    voice: "verse",
    accent: "Cardiff Welsh English",
    traits:
      "Distinctive long central 'a' ('Caardiff'), non-rhotic, urban clipped consonants, mild musical lift.",
  },
  {
    id: "welsh-swansea",
    voice: "coral",
    accent: "Swansea Welsh English",
    traits:
      "Strong musical intonation, elongated vowels, clear consonants, warm friendly cadence.",
  },
  {
    id: "welsh-valleys",
    voice: "alloy",
    accent: "South Wales Valleys English",
    traits:
      "Pronounced rise-fall sing-song, rolled light 'r', emphatic sentence-final lifts.",
  },
  {
    id: "welsh-mid",
    voice: "fable",
    accent: "Mid Wales English",
    traits:
      "Slow lilting delivery, softly rolled 'r', Welsh-language phrasing rhythm, gentle warmth.",
  },

  // ---------------- Scotland ----------------
  {
    id: "scottish",
    voice: "ash",
    accent: "educated Scottish (Edinburgh)",
    traits:
      "Rhotic tapped 'r', pure monophthong vowels, clear articulation, restrained even intonation.",
  },
  {
    id: "scottish-glaswegian",
    voice: "verse",
    accent: "Glaswegian (Glasgow)",
    traits:
      "Strong rhotic 'r', glottal stops mid-word, punchy varied melody, brisk energetic delivery.",
  },
  {
    id: "scottish-highland",
    voice: "ballad",
    accent: "Highland Scottish (Inverness and the West Highlands)",
    traits:
      "Slow, softly lilting Gaelic-influenced cadence, gently rolled 'r', precise clear vowels.",
  },
  {
    id: "scottish-doric",
    voice: "ash",
    accent: "Doric (Aberdeen and North East Scotland)",
    traits:
      "Distinctive 'fit' for what, 'hoose' for house, strongly rhotic, clipped rhythmic delivery.",
  },
  // Ireland
  {
    id: "scottish-dundee",
    voice: "ash",
    accent: "Dundonian Scots (Dundee)",
    traits:
      "Rhotic tapped 'r', distinctive 'eh' for 'I', clipped quick delivery, flat terminal falls.",
  },
  {
    id: "scottish-fife",
    voice: "ballad",
    accent: "Fife Scots",
    traits:
      "Rhotic, glottal stops mid-word, monophthongal vowels, level understated intonation.",
  },
  {
    id: "scottish-ayrshire",
    voice: "coral",
    accent: "Ayrshire Scots",
    traits:
      "Strong rolled 'r', broad 'oo' in house, sing-song rise on questions, warm open delivery.",
  },
  {
    id: "scottish-borders",
    voice: "sage",
    accent: "Scottish Borders English",
    traits:
      "Rhotic with light burr, long open vowels, measured lilting cadence, softened consonants.",
  },
  {
    id: "scottish-hebridean",
    voice: "fable",
    accent: "Hebridean Scottish English",
    traits:
      "Gaelic-influenced slow lilt, pure long vowels, softly aspirated consonants, melodic phrasing.",
  },

  // ---------------- Ireland ----------------
  {
    id: "irish",
    voice: "ballad",
    accent: "Dublin Irish",
    traits:
      "Softened 'th' towards 't' and 'd', light rhotic 'r', musical rise on statements, easy relaxed pace.",
    nonBritish: true,
  },
  {
    id: "irish-cork",
    voice: "coral",
    accent: "Cork Irish (Munster)",
    traits: "Pronounced sing-song pitch swoops, elongated vowels, rapid lively phrasing.",
    nonBritish: true,
  },
  {
    id: "irish-northern",
    voice: "ash",
    accent: "Northern Irish (Belfast)",
    traits:
      "Falling sentence-final intonation, tight front vowels, rhotic, brisk clipped consonants.",
  },
  {
    id: "irish-galway",
    voice: "alloy",
    accent: "Galway and west of Ireland English",
    traits:
      "Rhotic, soft 'th' as 't', lilting rise-fall, melodic unhurried delivery.",
    nonBritish: true,
  },
  {
    id: "irish-kerry",
    voice: "ballad",
    accent: "Kerry Irish English",
    traits:
      "Strong Gaelic lilt, sing-song rise-fall, rhotic, elongated stressed vowels.",
    nonBritish: true,
  },
  {
    id: "irish-limerick",
    voice: "verse",
    accent: "Limerick Irish English",
    traits:
      "Flatter mid-west vowels, rhotic, brisk clipped rhythm, dry falling terminals.",
    nonBritish: true,
  },
  {
    id: "irish-derry",
    voice: "coral",
    accent: "Derry Irish English",
    traits:
      "Northern rise on statement ends, tight front vowels, rhotic, quick bright delivery.",
  },

  // ---------------- Rest of the world ----------------
  {
    id: "new-zealand",
    voice: "nova",
    accent: "New Zealand English",
    traits:
      "Centralised short 'i' in fish, raised 'e', clipped diphthongs, level friendly delivery.",
    nonBritish: true,
  },
  {
    id: "south-african",
    voice: "onyx",
    accent: "South African English",
    traits:
      "Clipped monophthongal vowels, non-rhotic, crisp dental consonants, firm falling ends.",
    nonBritish: true,
  },
  {
    id: "canadian",
    voice: "sage",
    accent: "Canadian English",
    traits:
      "Rhotic, Canadian raising on 'out' and 'about', even friendly newsreader cadence.",
    nonBritish: true,
  },
  {
    id: "indian-english",
    voice: "ash",
    accent: "Indian English",
    traits:
      "Retroflex 't' and 'd', syllable-timed rhythm, clear precise articulation, even pitch.",
    nonBritish: true,
  },

  // Rest of the world
  {
    id: "australian",
    voice: "nova",
    accent: "general Australian",
    traits: "Broad flattened diphthongs, rising statement intonation, relaxed open delivery.",
    nonBritish: true,
  },
  {
    id: "american",
    voice: "sage",
    accent: "general American",
    traits: "Rhotic, flat 'a' in bath, even mid-Atlantic newsreader delivery.",
    nonBritish: true,
  },
];

const buildInstructions = (row: AccentRow): string => {
  const guard =
    row.id === "american"
      ? ""
      : row.nonBritish
        ? "This is essential: do not drift into a general American accent. "
        : "This is essential: you are NOT American — do not use American vowel colouring or American intonation. ";
  return (
    `Accent: ${row.accent}. ${guard}${row.traits} ` +
    "Keep every clinical term, drug name and number clearly intelligible. " +
    BASE_STYLE
  );
};

const VOICE_PRESETS: Record<string, VoicePreset> = Object.fromEntries(
  ACCENT_BANK.map((row) => [row.id, { voice: row.voice, instructions: buildInstructions(row) }]),
);
const DEFAULT_VOICE_ID = "british-rp";
const resolveVoice = (voiceId: unknown): { id: string; preset: VoicePreset } => {
  const id = typeof voiceId === "string" && VOICE_PRESETS[voiceId] ? voiceId : DEFAULT_VOICE_ID;
  return { id, preset: VOICE_PRESETS[id] };
};

// Target a comfortable chunk size well under OpenAI's 4096-char hard limit.
// Smaller chunks = faster individual TTS calls + safer retries.
const MAX_TTS_CHARS = 2800;
// Hard fallback: if a single sentence exceeds MAX_TTS_CHARS we still need to
// split it. OpenAI rejects > 4096 chars per request.
const HARD_TTS_LIMIT = 3900;
// How many TTS chunks to synthesise concurrently. Tunable at runtime via the
// TTS_CONCURRENCY env var (safe default 4). Clamped to [1, 16] so a bad value
// can never stall generation or hammer the OpenAI API.
const TTS_CONCURRENCY = (() => {
  const raw = Deno.env.get("TTS_CONCURRENCY");
  if (!raw) return 4;
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed) || parsed < 1) {
    console.warn(`[config] Invalid TTS_CONCURRENCY="${raw}", falling back to 4`);
    return 4;
  }
  return Math.min(parsed, 16);
})();
console.log(`[config] TTS_CONCURRENCY effective value: ${TTS_CONCURRENCY}`);
// Per-chunk retry budget (network blips, transient 5xx, brief 429s).
const TTS_MAX_RETRIES = 3;

// --- Per-IP rate limiting & global concurrency cap ----------------------------
// Best-effort, in-memory (per edge instance, resets on cold start). Guards
// against AI-credit abuse by capping how often any single IP can kick off a
// *fresh* podcast generation, plus a global ceiling on simultaneous generations
// per instance. Cached hits are NOT rate-limited.
const RL_MAX_PER_IP = 3;                  // generations per window per IP
const RL_WINDOW_MS = 60 * 60 * 1000;      // 1 hour rolling window
const MAX_CONCURRENT_GENERATIONS = 3;     // per edge instance
const ipHits = new Map<string, number[]>();
let activeGenerations = 0;

function getClientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("cf-connecting-ip") ?? "unknown";
}

function isIpRateLimited(ip: string): boolean {
  const now = Date.now();
  const cutoff = now - RL_WINDOW_MS;
  const recent = (ipHits.get(ip) ?? []).filter((t) => t > cutoff);
  if (recent.length >= RL_MAX_PER_IP) {
    ipHits.set(ip, recent);
    return true;
  }
  recent.push(now);
  ipHits.set(ip, recent);
  if (ipHits.size > 5000) {
    for (const [k, v] of ipHits) {
      const kept = v.filter((t) => t > cutoff);
      if (kept.length === 0) ipHits.delete(k);
      else ipHits.set(k, kept);
    }
  }
  return false;
}

interface RequestBody {
  topicId: string;
  topicTitle: string;
  content: string; // plain text extracted from the topic page
  force?: boolean; // bypass cache and regenerate (requires regeneratePassword)
  regeneratePassword?: string;
  voiceId?: string; // narrator/accent preset id (see VOICE_PRESETS)
}

// Shared secret that authorises bypassing the cached podcast and regenerating
// from scratch. Owner-only — surfaced via a hidden UI control.
// Accept the current secret name plus the legacy one to avoid lockouts.
const REGENERATE_PASSWORD = (
  Deno.env.get("REGENERATE_PASSWORD") ??
  Deno.env.get("PODCAST_REGEN_SECRET") ??
  ""
).trim();

// Hard cap on incoming content length to bound AI/TTS cost per request.
// Large enough for the longest expanded topics (e.g. complex needs) so the
// episode can cover the full page rather than being truncated mid-section.
const MAX_CONTENT_CHARS = 150_000;

interface FailurePayload {
  status: "failed";
  error: string;
  fallback?: boolean;
  code?: string;
}

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const failureResponse = (payload: FailurePayload, status = 200) => jsonResponse(payload, status);

const normaliseProviderError = (message: string): FailurePayload => {
  const lower = message.toLowerCase();

  if (lower.includes("insufficient_quota") || lower.includes("exceeded your current quota")) {
    return {
      status: "failed",
      error: "OpenAI TTS credits exhausted. Add billing or switch to another TTS provider.",
      code: "OPENAI_QUOTA_EXHAUSTED",
      fallback: true,
    };
  }

  if (lower.includes("lovable ai credits exhausted")) {
    return {
      status: "failed",
      error: "Lovable AI credits exhausted. Add credits in Settings → Workspace → Usage.",
      code: "LOVABLE_AI_CREDITS_EXHAUSTED",
      fallback: true,
    };
  }

  if (lower.includes("rate limit")) {
    return {
      status: "failed",
      error: "Podcast generation is temporarily rate limited. Please try again in a moment.",
      code: "RATE_LIMITED",
      fallback: true,
    };
  }

  return {
    status: "failed",
    error: message,
    code: "GENERATION_FAILED",
  };
};

const buildSystemPrompt = (targetMinutes: number, targetWords: number) => `You are an experienced FRCA (Fellowship of the Royal College of Anaesthetists) examiner and clinical anaesthetist creating audio study material for trainees preparing for the FRCA Primary, Final, and FFICM exams.

Write an approximately ${targetMinutes}-minute single-narrator podcast script (~${targetWords} words, plain prose only — no headings, no bullet points, no markdown, no stage directions). The script will be read aloud by a text-to-speech engine, so:
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
- For longer topics, use the extra time to cover MORE of the source material in depth — do not pad with filler or repeat the same point.

STRUCTURE (single flowing narration, no section headers spoken aloud):
1. Brief hook: why this topic matters in exam and clinical practice
2. Core concepts: walk through the key teaching points in a logical order (the bulk of the script)
3. Exam-focused viva-style framing: "if an examiner asks…", "the classic answer is…", "trainees often forget…"
4. Three to five take-home pearls to remember
5. Brief closing

Tone: warm, confident, like a senior trainee tutoring a peer. Not lecturing.

Output ONLY the spoken script. No preamble, no title, no "Welcome back to…", no metadata.`;

// Scale the target podcast length to the source content. No upper cap —
// long topics produce long episodes. Word-rate assumption: ~150 wpm.
function deriveTargetLength(content: string): { minutes: number; words: number } {
  const sourceWords = content.trim().split(/\s+/).length;
  // Aim for ~35% of source word count, with a minimum of 900 words (~6 min)
  // so very short topics still get a substantive episode. No maximum.
  const target = Math.round(sourceWords * 0.35);
  const words = Math.max(900, target);
  const minutes = Math.max(6, Math.round(words / 150));
  return { minutes, words };
}

async function generateScript(topicTitle: string, content: string): Promise<string> {
  const { minutes, words } = deriveTargetLength(content);
  const systemPrompt = buildSystemPrompt(minutes, words);
  const userPrompt = `Topic: ${topicTitle}\n\n--- SOURCE CONTENT (use only this) ---\n\n${content}\n\n--- END SOURCE ---\n\nWrite the approximately ${minutes}-minute (~${words} word) exam-focused podcast script now. Use the full target length to cover the source material thoroughly.`;

  console.log(`[script] target ~${minutes} min / ~${words} words from ${content.length} chars source`);

  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-pro",
      messages: [
        { role: "system", content: systemPrompt },
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
  const rawContent = data?.choices?.[0]?.message?.content;
  const script = (() => {
    if (typeof rawContent === "string") return rawContent.trim();
    if (Array.isArray(rawContent)) {
      return rawContent
        .map((part) => {
          if (typeof part === "string") return part;
          if (part && typeof part === "object") {
            if (typeof (part as { text?: unknown }).text === "string") {
              return (part as { text: string }).text;
            }
            const nestedText = (part as { content?: { text?: string } }).content?.text;
            if (typeof nestedText === "string") return nestedText;
          }
          return "";
        })
        .join("\n")
        .trim();
    }
    if (rawContent && typeof rawContent === "object") {
      if (typeof (rawContent as { text?: unknown }).text === "string") {
        return (rawContent as { text: string }).text.trim();
      }
      const nestedText = (rawContent as { content?: { text?: string } }).content?.text;
      if (typeof nestedText === "string") return nestedText.trim();
    }
    return "";
  })();
  if (!script) {
    const message = data?.choices?.[0]?.message;
    console.warn("[script] AI response did not contain parsable text content", {
      messageKeys: message && typeof message === "object" ? Object.keys(message) : [],
      rawContentType: Array.isArray(rawContent) ? "array" : typeof rawContent,
    });
  }
  if (!script) throw new Error("Script generation returned empty content");
  return script;
}

// Split script at sentence boundaries into chunks <= MAX_TTS_CHARS
// Split script into TTS-safe chunks. Strategy:
//   1. Prefer paragraph boundaries (double newline) — keeps natural pauses.
//   2. Within an oversized paragraph, fall back to sentences.
//   3. As a last resort (very long sentence — abbreviation list, drug name
//      string), hard-split on word boundaries at HARD_TTS_LIMIT.
// This guarantees every chunk is <= HARD_TTS_LIMIT chars so OpenAI never 400s.
function chunkScript(script: string): string[] {
  const out: string[] = [];

  const pushPacked = (text: string) => {
    // Greedy-pack sentences into the current open chunk.
    const sentences = text.split(/(?<=[.!?])\s+/);
    let current = "";
    for (const sentence of sentences) {
      let s = sentence.trim();
      if (!s) continue;

      // Sentence itself too long — hard split on word boundaries.
      while (s.length > HARD_TTS_LIMIT) {
        const slice = s.slice(0, HARD_TTS_LIMIT);
        const lastSpace = slice.lastIndexOf(" ");
        const cut = lastSpace > HARD_TTS_LIMIT * 0.6 ? lastSpace : HARD_TTS_LIMIT;
        if (current) {
          out.push(current.trim());
          current = "";
        }
        out.push(s.slice(0, cut).trim());
        s = s.slice(cut).trim();
      }

      if ((current + " " + s).trim().length > MAX_TTS_CHARS) {
        if (current) out.push(current.trim());
        current = s;
      } else {
        current = (current + " " + s).trim();
      }
    }
    if (current) out.push(current.trim());
  };

  const paragraphs = script.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  if (paragraphs.length === 0) {
    pushPacked(script);
  } else {
    // Pack short paragraphs together; split long ones by sentence.
    let buffer = "";
    for (const p of paragraphs) {
      if ((buffer + "\n\n" + p).trim().length > MAX_TTS_CHARS) {
        if (buffer) {
          pushPacked(buffer);
          buffer = "";
        }
        if (p.length > MAX_TTS_CHARS) {
          pushPacked(p);
        } else {
          buffer = p;
        }
      } else {
        buffer = buffer ? `${buffer}\n\n${p}` : p;
      }
    }
    if (buffer) pushPacked(buffer);
  }

  return out.filter((c) => c.length > 0);
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const TTS_REQUEST_TIMEOUT_MS = 60_000;

async function synthesiseChunk(
  text: string,
  preset: VoicePreset,
  attempt = 1,
): Promise<Uint8Array> {
  const controller = new AbortController();
  const timeoutId = setTimeout(
    () => controller.abort(new Error(`TTS request timed out after ${TTS_REQUEST_TIMEOUT_MS}ms`)),
    TTS_REQUEST_TIMEOUT_MS,
  );
  try {
    const response = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: TTS_MODEL,
        voice: preset.voice,
        input: text,
        response_format: "mp3",
        speed: 1.0,
        // gpt-4o-mini-tts supports steerable delivery — the selected preset
        // carries the accent and delivery instructions.
        instructions: preset.instructions,
      }),
    });


    if (!response.ok) {
      const errText = await response.text();
      // Retry transient errors (rate limits + 5xx). Quota/billing errors are
      // permanent and bubble up immediately so the caller can surface them.
      const isRetryable =
        (response.status === 429 && !errText.toLowerCase().includes("insufficient_quota")) ||
        response.status >= 500;
      if (isRetryable && attempt < TTS_MAX_RETRIES) {
        const backoff = 500 * Math.pow(2, attempt - 1) + Math.random() * 250;
        console.warn(`[tts] chunk failed (${response.status}), retry ${attempt}/${TTS_MAX_RETRIES} in ${Math.round(backoff)}ms`);
        await sleep(backoff);
        return synthesiseChunk(text, preset, attempt + 1);
      }
      throw new Error(`OpenAI TTS failed (${response.status}): ${errText}`);
    }

    const buf = await response.arrayBuffer();
    const bytes = new Uint8Array(buf);
    if (bytes.length === 0) throw new Error("OpenAI TTS returned empty audio");
    return bytes;
  } catch (err) {
    // Retry network errors and timeouts. Quota / explicit OpenAI failures bubble up.
    const message = err instanceof Error ? err.message : String(err);
    const isAbort = err instanceof Error && err.name === "AbortError";
    const isNetwork = isAbort || !message.includes("OpenAI TTS");
    if (isNetwork && attempt < TTS_MAX_RETRIES) {
      const backoff = 500 * Math.pow(2, attempt - 1) + Math.random() * 250;
      console.warn(
        `[tts] ${isAbort ? "timeout" : "network error"}, retry ${attempt}/${TTS_MAX_RETRIES} in ${Math.round(backoff)}ms: ${message}`,
      );
      await sleep(backoff);
      return synthesiseChunk(text, preset, attempt + 1);
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
}

// Run TTS chunks with bounded concurrency. Output preserves chunk order so
// concatenated MP3 plays back in the right sequence regardless of completion order.
async function synthesiseChunksParallel(
  chunks: string[],
  topicId: string,
  preset: VoicePreset,
): Promise<Uint8Array[]> {
  const results: Uint8Array[] = new Array(chunks.length);
  let nextIndex = 0;

  const worker = async (workerId: number) => {
    while (true) {
      const i = nextIndex++;
      if (i >= chunks.length) return;
      console.log(`[${topicId}] worker ${workerId} → chunk ${i + 1}/${chunks.length} (${chunks[i].length} chars)`);
      results[i] = await synthesiseChunk(chunks[i], preset);
    }
  };

  const workerCount = Math.min(TTS_CONCURRENCY, chunks.length);
  await Promise.all(Array.from({ length: workerCount }, (_, w) => worker(w + 1)));
  return results;
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
    const { topicId, topicTitle, content, force, regeneratePassword, voiceId } =
      (await req.json()) as RequestBody;
    const { id: voiceIdResolved, preset: voicePreset } = resolveVoice(voiceId);

    if (!topicId || !topicTitle || !content) {
      return jsonResponse({ error: "topicId, topicTitle and content are required" }, 400);
    }

    if (typeof content !== "string" || content.length > MAX_CONTENT_CHARS) {
      return jsonResponse({ error: `content must be a string under ${MAX_CONTENT_CHARS} characters` }, 400);
    }

    // Reject any topicId that isn't a known curriculum slug. The allowlist is
    // generated from src/data/curriculum.ts via
    // scripts/generate-topic-id-allowlist.mjs. This blocks attackers from
    // burning AI credits on arbitrary made-up topic ids.
    if (typeof topicId !== "string" || !/^[a-z0-9-]{1,80}$/.test(topicId) || !TOPIC_ID_ALLOWLIST.has(topicId)) {
      console.warn(`[generate-podcast] Rejected unknown topicId: ${String(topicId).slice(0, 100)}`);
      return jsonResponse({ error: "Unknown topicId — not a recognised curriculum topic." }, 400);
    }

    // Validate force-regenerate password before doing anything else.
    const forceRegenerate = force === true;
    if (forceRegenerate) {
      const submittedPassword = typeof regeneratePassword === "string" ? regeneratePassword.trim() : "";
      if (!REGENERATE_PASSWORD || submittedPassword !== REGENERATE_PASSWORD) {
        return failureResponse(
          {
            status: "failed",
            error: "Invalid regeneration password.",
            code: "INVALID_REGENERATION_PASSWORD",
          },
          200,
        );
      }
    }

    const { data: existing } = await supabase
      .from("podcasts")
      .select("*")
      .eq("topic_id", topicId)
      .maybeSingle();

    // A cached episode only satisfies the request when it was narrated with
    // the requested voice — otherwise re-narrate it in the chosen accent.
    const cachedVoiceId = typeof existing?.voice === "string" && existing.voice ? existing.voice : DEFAULT_VOICE_ID;
    const voiceChanged = cachedVoiceId !== voiceIdResolved;

    if (!forceRegenerate && !voiceChanged && existing?.status === "ready" && existing.audio_path) {
      const { data: pub } = supabase.storage.from("podcasts").getPublicUrl(existing.audio_path);
      return jsonResponse({
        status: "ready",
        audio_url: pub.publicUrl,
        script: existing.script,
        duration_seconds: existing.duration_seconds,
        voice: cachedVoiceId,
        cached: true,
      });
    }
    if (!forceRegenerate && voiceChanged && existing?.status === "ready") {
      console.log(`[${topicId}] Voice change ${cachedVoiceId} → ${voiceIdResolved} — re-narrating.`);
    }

    // Treat any row stuck in "generating" for >3 minutes as abandoned
    // (edge function crashed, user closed tab mid-run, etc.) and allow a retry.
    // The previous behaviour silently rejected the request, which made the
    // "Generate podcast" button appear broken on those topics.
    // A force-regenerate also bypasses the in-progress guard.
    if (!forceRegenerate && existing?.status === "generating") {
      const updatedAtMs = existing.updated_at ? new Date(existing.updated_at).getTime() : 0;
      const ageMs = Date.now() - updatedAtMs;
      const STALE_AFTER_MS = 3 * 60 * 1000;
      if (ageMs < STALE_AFTER_MS) {
        return jsonResponse({ status: "generating", message: "Already in progress" }, 202);
      }
      console.log(`[${topicId}] Reclaiming stale 'generating' row (age ${Math.round(ageMs / 1000)}s)`);
    }

    if (forceRegenerate) {
      console.log(`[${topicId}] Force-regenerate authorised — bypassing cache.`);
    }

    // Rate-limit & concurrency gates — only on the generation path (cache
    // hits above return early). Best-effort, in-memory, per edge instance.
    const ip = getClientIp(req);
    if (isIpRateLimited(ip)) {
      console.warn(`[${topicId}] IP ${ip} rate-limited`);
      return new Response(
        JSON.stringify({
          status: "failed",
          error: "Too many podcast generations from your network. Please try again in an hour.",
          code: "RATE_LIMITED",
        }),
        {
          status: 429,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
            "Retry-After": String(Math.ceil(RL_WINDOW_MS / 1000)),
          },
        },
      );
    }

    if (activeGenerations >= MAX_CONCURRENT_GENERATIONS) {
      console.warn(`[${topicId}] Concurrency cap hit (${activeGenerations}/${MAX_CONCURRENT_GENERATIONS})`);
      return new Response(
        JSON.stringify({
          status: "failed",
          error: "Server is busy generating other podcasts. Please try again in a minute.",
          code: "BUSY",
        }),
        {
          status: 503,
          headers: { ...corsHeaders, "Content-Type": "application/json", "Retry-After": "60" },
        },
      );
    }
    activeGenerations++;

    await supabase.from("podcasts").upsert(
      {
        topic_id: topicId,
        topic_title: topicTitle,
        status: "generating",
        error_message: null,
      },
      { onConflict: "topic_id" },
    );

    // Generation can take 2–5 minutes (LLM + multi-chunk TTS + upload), which
    // exceeds the supabase.functions.invoke HTTP timeout (~150s) and causes
    // the client to see a "connection closed before message completed" error
    // even though the server is still working.
    //
    // Run the heavy work in the background with EdgeRuntime.waitUntil and
    // return 202 immediately. The client already polls the `podcasts` row
    // every 5s, so the UI will flip to "ready" once the row is updated.
    const work = (async () => {
      try {
        console.log(`[${topicId}] Generating script...`);
        const script = await generateScript(topicTitle, content);
        console.log(`[${topicId}] Script length: ${script.length} chars`);

        const chunks = chunkScript(script);
        const oversize = chunks.filter((c) => c.length > HARD_TTS_LIMIT).length;
        if (oversize > 0) {
          throw new Error(`Internal error: ${oversize} chunk(s) exceed TTS limit after splitting`);
        }
        console.log(
          `[${topicId}] Synthesising ${chunks.length} chunk(s) at concurrency ${Math.min(TTS_CONCURRENCY, chunks.length)}...`,
        );
        const tStart = Date.now();
        const audioParts = await synthesiseChunksParallel(chunks, topicId, voicePreset);
        console.log(`[${topicId}] TTS complete in ${((Date.now() - tStart) / 1000).toFixed(1)}s`);

        const fullAudio = concatMp3(audioParts);
        const audioPath = `${topicId}--${voiceIdResolved}.mp3`;
        console.log(`[${topicId}] Uploading ${fullAudio.length} bytes to ${audioPath}`);

        const { error: uploadErr } = await supabase.storage
          .from("podcasts")
          .upload(audioPath, fullAudio, {
            contentType: "audio/mpeg",
            upsert: true,
          });
        if (uploadErr) throw new Error(`Storage upload failed: ${uploadErr.message}`);

        const wordCount = script.split(/\s+/).length;
        const durationSeconds = Math.round(wordCount / 2.5);

        await supabase
          .from("podcasts")
          .update({
            script,
            audio_path: audioPath,
            duration_seconds: durationSeconds,
            voice: voiceIdResolved,
            status: "ready",
            error_message: null,
          })
          .eq("topic_id", topicId);

        console.log(`[${topicId}] Generation complete — row marked ready.`);
      } catch (genErr) {
        const message = genErr instanceof Error ? genErr.message : String(genErr);
        const failure = normaliseProviderError(message);
        console.error(`[${topicId}] Generation failed:`, message);
        await supabase
          .from("podcasts")
          .update({ status: "failed", error_message: failure.error })
          .eq("topic_id", topicId);
      } finally {
        activeGenerations = Math.max(0, activeGenerations - 1);
      }
    })();

    // @ts-expect-error — EdgeRuntime is a Supabase Edge Runtime global, not in Deno types.
    if (typeof EdgeRuntime !== "undefined" && EdgeRuntime?.waitUntil) {
      // @ts-expect-error — see above.
      EdgeRuntime.waitUntil(work);
    } else {
      // Local/dev fallback: fire-and-forget. Errors are swallowed inside `work`.
      void work;
    }

    return jsonResponse(
      { status: "generating", message: "Generation started — poll the podcasts row for completion." },
      202,
    );

  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Request failed:", message);
    return jsonResponse({ error: "Internal server error" }, 500);
  }
});

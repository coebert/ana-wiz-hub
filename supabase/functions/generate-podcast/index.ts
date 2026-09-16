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
import { NATIVE_VOICE_IDS } from "./_native-voices.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-internal-token, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY")!;
const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY")!;
// Real regional voices (ElevenLabs). When the connection is available every
// accent is narrated by a native speaker of that region; otherwise we fall back
// to steered OpenAI TTS.
const ELEVENLABS_API_KEY = Deno.env.get("ELEVENLABS_API_KEY");

const TTS_MODEL = "gpt-4o-mini-tts";
const ELEVEN_TTS_MODEL = "eleven_multilingual_v2";

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
  /** ElevenLabs voice id of a native speaker of this region, when available. */
  nativeVoiceId?: string;
}
const BASE_STYLE =
  "Warm, confident and clear, like a senior anaesthetic trainee tutoring a peer. " +
  "Steady pace, natural phrasing, no exaggeration or comedy — this is your ordinary speaking voice.";

// Family-level pronunciation anchors. Keep identical to src/lib/podcastVoices.ts.
const NORTHERN_ENGLAND_IDS = new Set([
  "british-yorkshire", "british-lancashire", "british-manchester", "british-scouse",
  "british-geordie", "british-mackem", "british-cumbrian", "british-sheffield",
  "british-hull", "british-leeds", "british-teesside", "british-durham",
  "british-northumberland", "british-bolton", "british-preston", "british-barnsley",
  "british-bradford", "british-york", "british-wigan", "british-blackburn",
  "british-oldham",
]);
const MIDLANDS_IDS = new Set([
  "british-brummie", "british-black-country", "british-east-midlands", "british-potteries",
  "british-coventry", "british-leicester", "british-nottingham", "british-lincolnshire",
  "british-shropshire", "british-northampton", "british-derby", "british-worcester",
  "british-warwickshire", "british-herefordshire",
]);
const WEST_COUNTRY_IDS = new Set([
  "british-west-country", "british-bristol", "british-cornish", "british-devon",
  "british-dorset", "british-wiltshire", "british-gloucestershire",
]);

const familyAnchors = (id: string): string => {
  if (id.startsWith("welsh")) {
    return (
      "Anchors: strong musical rise-and-fall on every phrase; pure clear vowels — 'face' as FEH-ss, " +
      "'goat' as GOH-t with no glide; tapped/rolled r's; clear 'l' in 'milk'; " +
      "stress often late in the phrase, ending on a lift like a question."
    );
  }
  if (id.startsWith("scottish")) {
    return (
      "Anchors: fully rhotic with a tapped r — 'heart' as HAIRT, 'water' as WAH-ter; " +
      "short pure vowels — 'house' as HOOS, 'now' as NOO, 'right' as RICHT; " +
      "'ch' in 'loch' as a throaty velar fricative, never a k; " +
      "clipped clear consonants, brisk energetic rhythm, dark 'l'."
    );
  }
  if (id.startsWith("irish")) {
    return (
      "Anchors: soft dental t and d — 'think' as TINK, 'that' as DAT; light rhotic r; " +
      "'time' as TOIME, 'day' as DEH; rising melodic phrase endings; " +
      "voiced breathy 'wh' in 'what'; lively fluid rhythm with unstressed syllables kept full."
    );
  }
  if (WEST_COUNTRY_IDS.has(id)) {
    return (
      "Anchors: heavily rhotic burr — 'farm' as FAARM, 'harder' as HARR-derr, 'water' as WAH-terr; " +
      "long broad a — 'bath' as BAARTH; 'I' as OI; voiced s in 'Somerset' as ZOMerset; " +
      "slow rolling unhurried rural lilt."
    );
  }
  if (NORTHERN_ENGLAND_IDS.has(id)) {
    return (
      "Anchors: flat short a — 'bath' and 'grass' with the same vowel as 'cat'; " +
      "no foot–strut split — 'but', 'blood' and 'up' use the vowel of 'put' (BOOT, BLOOD, OOP); " +
      "'the' reduced to t' before consonants; hard clipped g's; " +
      "down-stepped ends of phrases, no RP drawl."
    );
  }
  if (MIDLANDS_IDS.has(id)) {
    return (
      "Anchors: flat short a in 'bath'; northern 'but' vowel (as in 'put'); " +
      "'price' as PROICE, 'mouth' as MEOWTH; a distinctly falling, slightly nasal phrase-end " +
      "that drops away rather than lifting."
    );
  }
  if (id === "british-cockney" || id === "british-estuary" || id === "british-essex" || id === "british-kent") {
    return (
      "Anchors: glottal t — 'butter' as BU'-uh, 'water' as WOR-uh; l-vocalisation — 'milk' as MIWK; " +
      "th-fronting — 'think' as FINK, 'brother' as BRUVVer; 'face' as FICE, 'price' as PROICE; " +
      "dropped h in 'house'; quick clipped urban rhythm."
    );
  }
  return "";
};


/**
 * Dialect-level anchors: town- and city-specific pronunciations layered on top
 * of the family anchors above, so (for example) Leeds, Hull and Sheffield are
 * not read as one generic "Yorkshire". Keep identical in both copies.
 */
const DIALECT_ANCHORS: Record<string, string> = {
  // ---- Southern England ----
  "british-cockney":
    "Dialect: 'mate' as MOIT, 'day' as DIE, 'nurse' long as NUHHS; heavy glottal stops mid-word ('hospital' as 'ospi'l); fast staccato delivery.",
  "british-estuary":
    "Dialect: glottal t only at word ends ('right' as RY'), lighter th-fronting than Cockney, h mostly kept, brisk level intonation.",
  "british-essex":
    "Dialect: very open 'no' as NAOW, 'yeah' drawn out, strong l-vocalisation ('well' as WEW), upward drift at phrase ends.",
  "british-kent":
    "Dialect: Estuary base with longer 'bath' as BAHTH, 'goat' as GEOW-t, unhurried coastal pacing.",
  "british-sussex":
    "Dialect: light residual r in 'farmer', long 'a' in 'grass' as GRAHSS, gently falling rural cadence.",
  "british-hampshire":
    "Dialect: faint West Country burr on final r, broad 'about' as ABAOWT, easy relaxed rhythm.",
  "british-portsmouth":
    "Dialect: 'Pompey' urban clip, sharp glottal t, high-pitched rising ends, 'no' as NAO.",
  "british-home-counties":
    "Dialect: near-RP with occasional glottal t and slight l-vocalisation, otherwise conservative vowels.",
  "british-thames-valley":
    "Dialect: RP vowels with mild Estuary softening, level unemphatic tune.",
  "british-oxford":
    "Dialect: precise conservative RP, fully articulated final consonants, measured academic pacing.",
  "british-east-anglian":
    "Dialect: yod-dropping — 'new' as NOO, 'tune' as TOON; 'boat' as BUT-like short o; strong falling ends.",

  // ---- West Country ----
  "british-bristol":
    "Dialect: Bristol L — 'area' as AREAL, 'idea' as IDEAL; rhotic but faster and more urban than rural Somerset.",
  "british-cornish":
    "Dialect: 'us' for 'we', very long open vowels, r softly rolled, distinctly sing-song rise then long fall.",
  "british-devon":
    "Dialect: strong retroflex r in 'harder', 'proper' as PRAPPer, drawling farmyard warmth.",
  "british-dorset":
    "Dialect: voiced initial s and f ('somerset' as ZUMMerzet, 'farm' as VARM), slow deliberate tempo.",
  "british-wiltshire":
    "Dialect: broad flat 'a', heavy final r, gentle rise-fall on each clause.",
  "british-gloucestershire":
    "Dialect: lighter burr than Somerset, 'bath' as BAHTH, quick clipped rural phrasing.",
  "british-west-country":
    "Dialect: Somerset core — 'I be' rhythms, heavy burr, unhurried rolling delivery.",

  // ---- Midlands ----
  "british-brummie":
    "Dialect: falling drawl on final syllables, 'price' as PROIZE, 'go' as GAOW, nasal resonance, 'you' as YOW.",
  "british-black-country":
    "Dialect: broader than Brummie — 'I am' as AM, 'you' as YAM; 'face' as FAY-uss; heavier, slower, more nasal.",
  "british-coventry":
    "Dialect: between Brummie and East Midlands, flatter tune, less drawl, crisper consonants.",
  "british-nottingham":
    "Dialect: 'duck' address, 'right' as REET, 'nothing' as NOWT, level tune with a sharp final drop.",
  "british-derby":
    "Dialect: 'Derby' as DAR-bee, short clipped vowels, quick even rhythm.",
  "british-leicester":
    "Dialect: light Midlands drawl, 'ay up' opener, mid-phrase pitch dips, softened t between vowels.",
  "british-lincolnshire":
    "Dialect: rural East Midlands with slight rhoticity, long 'oo' in 'book' as BOOK, slow flat cadence.",
  "british-potteries":
    "Dialect: Stoke — 'thee' and 'thy' rhythms, 'nesh' vowel colour, distinctly rising then dropping tune.",
  "british-northampton":
    "Dialect: transitional — northern 'but' vowel with southern long 'bath', even level pace.",
  "british-worcester":
    "Dialect: soft western Midlands burr on r, gentle drawl, warm relaxed phrasing.",
  "british-warwickshire":
    "Dialect: mild Brummie colouring, cleaner vowels, steady unhurried pace.",
  "british-herefordshire":
    "Dialect: Midlands vowels with a West Country r, lilting rural tune.",
  "british-shropshire":
    "Dialect: border accent — Midlands flat 'a' with slight Welsh musicality.",
  "british-east-midlands":
    "Dialect: 'summat' and 'nowt' rhythms, flat unemphatic tune, hard final consonants.",

  // ---- Northern England ----
  "british-yorkshire":
    "Dialect: 'the' as t', 'was' as WOR, 'right' as REET, blunt down-stepped statements.",
  "british-york":
    "Dialect: softer, tidier Yorkshire — clear consonants, less broad vowels, gentle final fall.",
  "british-leeds":
    "Dialect: urban West Yorkshire — 'no' as NAY-o, flattened 'face' as FEHSS, quick clipped tempo.",
  "british-hull":
    "Dialect: distinctive 'nurse' and 'square' merging — 'phone' close to FURN; flat monotone-leaning tune.",
  "british-sheffield":
    "Dialect: 'dee' and 'dah' for you/your, 'love' as LUV with a put-vowel, drawn final syllable.",
  "british-barnsley":
    "Dialect: very broad South Yorkshire — 'house' as HAHSS, 'thee' address, strong falling ends.",
  "british-bradford":
    "Dialect: West Yorkshire with slight sing-song lift, clipped 'the' as t', fast paced.",
  "british-lancashire":
    "Dialect: 'book' as BOOK with a long oo, 'love' as LOOV, rolling gentle rise-fall.",
  "british-preston":
    "Dialect: crisp Lancashire, 'right' as REYT, brisk clipped rhythm.",
  "british-bolton":
    "Dialect: broad Lancashire, 'owt' and 'nowt', heavy final consonants, slower tempo.",
  "british-blackburn":
    "Dialect: East Lancashire — nasal edge, 'car' as CAAH, sharply dropping phrase ends.",
  "british-wigan":
    "Dialect: 'Wiganese' — 'og' vowels, hard g's, distinctly bouncing rhythm between Lancashire and Scouse.",
  "british-oldham":
    "Dialect: Greater Manchester fringe, flat 'a', slight nasal twang, quick delivery.",
  "british-manchester":
    "Dialect: 'Manc' — 'you' as YEW, 'poor' as PORE, long drawled final vowels, deadpan flat tune.",
  "british-scouse":
    "Dialect: 'back' and 'chicken' with a throaty ch/k fricative, 'nurse' as NERSE fronted, strongly rising then falling melody, fast adenoidal delivery.",
  "british-geordie":
    "Dialect: 'about' as ABOOT, 'work' as WAAK, 'make' as MEK, 'no' as NAA; bright lifting question-like ends.",
  "british-northumberland":
    "Dialect: rural Northumbrian burr on r, slower than Geordie, long open vowels.",
  "british-mackem":
    "Dialect: Sunderland — 'make' as MAAK, 'school' as SKUUL, flatter and more clipped than Geordie.",
  "british-durham":
    "Dialect: between Geordie and Teesside — 'town' as TOON, gentler rise, softer consonants.",
  "british-teesside":
    "Dialect: 'Smoggie' — 'here' as HOR, 'nurse' rounded, sharply rising phrase ends.",
  "british-cumbrian":
    "Dialect: 'yan' and 'twa' counting rhythms, rolled r, slow lilting rural tune.",

  // ---- Wales ----
  "welsh-south":
    "Dialect: 'lovely' as LUV-ley with a long final vowel, strong rise on each clause, tapped r.",
  "welsh-cardiff":
    "Dialect: distinctive flat 'Cardiff a' — 'Cardiff' as CAAHdiff; more urban and less sing-song than the Valleys.",
  "welsh-swansea":
    "Dialect: softer than Cardiff, longer vowels, marked musical lift at clause ends.",
  "welsh-valleys":
    "Dialect: strongest sing-song rise-fall, 'now' as NOW-uh, emphatic tag-like endings.",
  "welsh-north":
    "Dialect: Welsh-language substrate — clear 'll' and 'ch' sounds, crisper consonants, less rise than the south.",
  "welsh-wrexham":
    "Dialect: north-east border — Welsh musicality with Cheshire flatness, quicker pace.",
  "welsh-pembrokeshire":
    "Dialect: 'Little England' — softer English vowels with a light Welsh lilt.",
  "welsh-mid":
    "Dialect: rural mid-Wales — slow, gentle, evenly paced with mild rise.",
  "welsh-anglesey":
    "Dialect: island north Welsh — pure vowels, strong 'ch', deliberate measured delivery.",

  // ---- Scotland ----
  scottish:
    "Dialect: central-belt standard Scottish — 'house' as HOOS, tapped r, brisk even rhythm.",
  "scottish-glaswegian":
    "Dialect: 'no' as NAW, 'you' as YOO-z, glottal t in 'water' as WA'ER, fast punchy rise on questions.",
  "scottish-lanarkshire":
    "Dialect: Glasgow base, broader vowels, slower with heavier final stress.",
  "scottish-highland":
    "Dialect: Gaelic-influenced — slow, precise, clearly separated syllables, gentle lilt, softer r.",
  "scottish-doric":
    "Dialect: Aberdeenshire Doric — 'what' as FIT, 'where' as FAUR, 'good' as GWEED; distinctive f-for-wh.",
  "scottish-perthshire":
    "Dialect: refined central Scots, clear tapped r, even measured tune.",
  "scottish-dundee":
    "Dialect: 'pie' as PEH, 'eh?' tag, high sharp intonation, clipped vowels.",
  "scottish-fife":
    "Dialect: 'ken' tag, drawn-out vowels, distinctly falling clause ends.",
  "scottish-ayrshire":
    "Dialect: rolling rural Ayrshire r, long open vowels, warm slow melody.",
  "scottish-borders":
    "Dialect: 'Border burr' — uvular r, close to Northumbrian, level unhurried tune.",
  "scottish-hebridean":
    "Dialect: Gaelic first-language rhythm — very slow, pure vowels, soft aspirated consonants.",
  "scottish-orkney":
    "Dialect: Norse-tinged sing-song, rising phrase ends, softer r than the mainland.",
  "scottish-shetland":
    "Dialect: strongest Norse lilt, 'th' as d in 'that', musical rise on every phrase.",

  // ---- Ireland ----
  irish:
    "Dialect: standard Hiberno-English — light r, dental t, melodic mid-phrase lifts.",
  "irish-dublin":
    "Dialect: 'Dublin 4' vs northside contrast avoided — use working Dublin: 'time' as TOIME, 'right' as ROIGHT, quick urban clip.",
  "irish-cork":
    "Dialect: famously sing-song with wide pitch swings, 'like' tag, 'boy' as BAI.",
  "irish-galway":
    "Dialect: west of Ireland — Gaelic rhythm, slower, softer, broad 'a'.",
  "irish-kerry":
    "Dialect: strong musical rise-fall, elongated vowels, heavily aspirated t.",
  "irish-limerick":
    "Dialect: flatter, faster mid-west accent, sharper consonants than Cork.",
  "irish-waterford":
    "Dialect: south-east — clipped vowels, mild rhoticity, level tune.",
  "irish-donegal":
    "Dialect: Ulster Irish substrate — 'now' as NEEOW, rising ends, rolled r.",
  "irish-northern":
    "Dialect: Ulster — 'now' as NYAOW, 'face' as FAY-uss, strongly rising statement endings.",
  "irish-derry":
    "Dialect: Derry lilt — very high rising ends, 'so' as SOH-uh, quick light delivery.",

  // ---- Crown dependencies ----
  "british-isle-of-man":
    "Dialect: Manx English — light Lancashire base with Manx Gaelic lilt and lengthened vowels.",
  "jersey-english":
    "Dialect: Jèrriais colouring — slight French rhythm, softened r, even syllable timing.",
  "guernsey-english":
    "Dialect: Guernésiais colouring — drawn-out vowels, mild sing-song, gentle French-tinged consonants.",

  // ---- Wider English ----
  australian:
    "Dialect: 'day' as DIE, 'no' as NEOW, high rising terminal on statements, relaxed nasal delivery.",
  "new-zealand":
    "Dialect: 'fish' as FUSH, 'pen' close to 'pin', clipped short vowels, level tune.",
  "south-african":
    "Dialect: 'kit' vowel flattened, crisp t, strong stress on first syllables, clipped rhythm.",
  canadian:
    "Dialect: Canadian raising — 'about' as ABOAT, 'sorry' as SORE-y, rhotic and even.",
  "indian-english":
    "Dialect: retroflex t and d, syllable-timed rhythm, full unreduced vowels, clear final consonants.",
  american:
    "Dialect: General American — rhotic r, 'bath' with the 'cat' vowel, flapped t in 'water' as WAH-der.",
};

/** Dialect-specific detail for one narrator, when we have it. */
const dialectAnchors = (id: string): string => DIALECT_ANCHORS[id] ?? "";

const ACCENT_BANK: AccentRow[] = [
  // ---------------- General UK ----------------
  {
    id: "british-rp",
    voice: "ballad",
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
    voice: "verse",
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
    voice: "fable",
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
    voice: "ash",
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
    voice: "coral",
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
    voice: "sage",
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
    accent: "educated Scottish (Edinburgh, Morningside-influenced standard Scottish English)",
    traits:
      "Rhotic tapped 'r', pure monophthong vowels, short-long vowel distinction (shire vs shire with long vowel), clear articulation, restrained even intonation typical of educated Edinburgh speech.",
  },
  {
    id: "scottish-glaswegian",
    voice: "verse",
    accent: "Glaswegian (Glasgow and West of Scotland conurbation)",
    traits:
      "Strong rhotic 'r', glottal stops mid-word ('wa'er' for water), rising terminal intonation, punchy varied melody, brisk energetic West of Scotland delivery.",
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
      "Distinctive Doric colour: 'fit' for what, 'far' for where, 'hoose' for house, 'f' for 'wh' at word start, strongly rhotic, clipped rhythmic North East delivery.",
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
    accent: "Scottish Borders English (Hawick, Galashiels, Kelso)",
    traits:
      "Strongly rhotic with a rolled light burr — the most rhotic variety in Scotland, long open vowels, measured lilting cadence, softened consonants, hint of Northumbrian influence.",
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
    voice: "ballad",
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
    voice: "verse",
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
    voice: "fable",
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

  // ---- Dialect bank (mirrors the dialect section of ACCENT_BANK) ----
  {
    id: "british-devon",
    voice: "ballad",
    accent: "Devon (South West England) dialect",
    traits:
      "Strongly rhotic burred r, long open 'aa' in bath, voiced s ('zummer' for summer), lilting unhurried farmland cadence.",
  },
  {
    id: "british-wiltshire",
    voice: "fable",
    accent: "Wiltshire (Wessex) dialect",
    traits:
      "Rhotic but softer than Devon, drawled vowels, dropped final g's, gentle sing-song downward phrase endings.",
  },
  {
    id: "british-gloucestershire",
    voice: "verse",
    accent: "Gloucestershire (Severn valley) dialect",
    traits:
      "Mild rhoticity, West Country vowels tempered towards the Midlands, level rhythm, warm rounded tone.",
  },
  {
    id: "british-thames-valley",
    voice: "ash",
    accent: "Thames Valley (Reading and Berkshire) dialect",
    traits:
      "Estuary-influenced non-rhotic vowels with faint West Country residue, t-glottalling, brisk even pacing.",
  },
  {
    id: "british-portsmouth",
    voice: "coral",
    accent: "Portsmouth (Pompey) dialect",
    traits:
      "Non-rhotic, fronted 'ow' diphthong, clipped consonants, quick chatty rhythm with rising tag questions.",
  },
  {
    id: "british-derby",
    voice: "onyx",
    accent: "Derby and Derbyshire dialect",
    traits:
      "Flat northern 'a' in bath, short 'u' in cup, downward drawl on phrase endings, dropped definite article.",
  },
  {
    id: "british-worcester",
    voice: "fable",
    accent: "Worcestershire dialect",
    traits:
      "Brummie-adjacent falling intonation softened by rural West Country rhoticity, unhurried, lightly nasal.",
  },
  {
    id: "british-herefordshire",
    voice: "ballad",
    accent: "Herefordshire (Welsh borders) dialect",
    traits:
      "Rhotic border burr, musical Welsh-influenced lift on stressed words, slow deliberate delivery.",
  },
  {
    id: "british-warwickshire",
    voice: "verse",
    accent: "Warwickshire dialect",
    traits:
      "Mild Midlands vowels between Brummie and RP, flat 'a', gentle falling cadence, unhurried clarity.",
  },
  {
    id: "british-barnsley",
    voice: "onyx",
    accent: "Barnsley (South Yorkshire) dialect",
    traits:
      "Broad Yorkshire vowels, definite-article reduction ('down t'ward'), 'thee/tha' rhythm, blunt clipped endings.",
  },
  {
    id: "british-bradford",
    voice: "ballad",
    accent: "Bradford (West Yorkshire) dialect",
    traits:
      "Flat 'a', monophthong 'face' and 'goat' vowels, dropped h's, steady level intonation.",
  },
  {
    id: "british-york",
    voice: "coral",
    accent: "York and North Yorkshire dialect",
    traits: "Softer Yorkshire vowels, gently lengthened 'oo', tidy consonants, calm even pacing.",
  },
  {
    id: "british-wigan",
    voice: "verse",
    accent: "Wigan (Greater Manchester) dialect",
    traits:
      "Lancashire vowels with 'book' as long 'oo', velar nasal plus ('singger'), lively rising phrase ends.",
  },
  {
    id: "british-blackburn",
    voice: "fable",
    accent: "Blackburn (East Lancashire) dialect",
    traits:
      "Broad Lancashire 'oo' and flat 'a', slight rhoticity on final r, terse rhythmic delivery.",
  },
  {
    id: "british-oldham",
    voice: "coral",
    accent: "Oldham (Pennine Lancashire) dialect",
    traits:
      "Manchester-adjacent flat vowels, harder consonants, nasal edge, quick businesslike cadence.",
  },
  {
    id: "welsh-wrexham",
    voice: "verse",
    accent: "Wrexham (north-east Wales) dialect",
    traits:
      "Welsh musicality crossed with Cheshire/Scouse influence, clear consonants, rising mid-sentence lifts.",
  },
  {
    id: "welsh-pembrokeshire",
    voice: "coral",
    accent: "Pembrokeshire (south-west Wales) dialect",
    traits:
      "Soft 'Little England' vowels, light rhoticity, gentle sing-song rise and fall, warm unhurried tone.",
  },
  {
    id: "welsh-anglesey",
    voice: "ballad",
    accent: "Anglesey (Ynys Môn) Welsh-English dialect",
    traits:
      "Strong Welsh-language cadence, rolled r's, pure vowels, melodic rising tunes at clause ends.",
  },
  {
    id: "scottish-lanarkshire",
    voice: "onyx",
    accent: "Lanarkshire (central belt Scotland) dialect",
    traits:
      "Glaswegian-adjacent but broader, tapped r's, dark 'l', glottal stops, punchy driving rhythm.",
  },
  {
    id: "scottish-perthshire",
    voice: "fable",
    accent: "Perthshire (central Scotland) dialect",
    traits:
      "Clear educated Scots vowels, lightly rolled r's, measured lilt, softer than the central belt.",
  },
  {
    id: "scottish-orkney",
    voice: "coral",
    accent: "Orkney islands dialect",
    traits:
      "Norse-influenced sing-song, rising sentence endings, soft r's, gentle unhurried island cadence.",
  },
  {
    id: "scottish-shetland",
    voice: "verse",
    accent: "Shetland islands dialect",
    traits:
      "Strongly Norse-tinged musical intonation, pure vowels, dental 'd' for th, lilting rises.",
  },
  {
    id: "irish-dublin",
    voice: "sage",
    accent: "Dublin city Irish English",
    traits:
      "Fast urban rhythm, fronted 'oi' vowels, t-slitting ('wa'er'), flat rapid phrase endings.",
    nonBritish: true,
  },
  {
    id: "irish-waterford",
    voice: "ballad",
    accent: "Waterford (south-east Ireland) dialect",
    traits: "Soft rhotic r's, dental t and d, gentle rise-fall melody, relaxed steady pace.",
    nonBritish: true,
  },
  {
    id: "irish-donegal",
    voice: "fable",
    accent: "Donegal (Ulster) Irish English",
    traits:
      "Strong Irish-language cadence, slender consonants, Scots-influenced vowels, rising musical endings.",
    nonBritish: true,
  },
  {
    id: "jersey-english",
    voice: "coral",
    accent: "Jersey (Channel Islands) English",
    traits:
      "Near-RP base with Norman-French rhythm, slight rhoticity, softened consonants, gentle lift on final syllables.",
  },
  {
    id: "guernsey-english",
    voice: "verse",
    accent: "Guernsey (Channel Islands) English",
    traits:
      "Soft southern English vowels with Guernésiais French colouring, drawn-out vowels, mild sing-song cadence.",
  },
];

const buildInstructions = (row: AccentRow): string => {
  const anchors = familyAnchors(row.id);
  const dialect = dialectAnchors(row.id);
  const guard =
    row.id === "american"
      ? ""
      : row.nonBritish
        ? "Never drift into General American or neutral British English at any point. "
        : "You are NOT American and NOT a neutral RP speaker: never use American vowel colouring, " +
          "American intonation, or generic BBC RP. ";
  return [
    `You are a lifelong native speaker of ${row.accent}. You have never lived anywhere else, ` +
      "and this is simply your own voice — you are not performing or imitating an accent.",
    guard +
      "Hold the accent consistently from the very first word to the last, including proper nouns and " +
      "technical terms. Do not neutralise or soften it for clarity, and do not fade towards a standard " +
      "accent as the passage goes on.",
    `Accent detail: ${row.traits}`,
    anchors,
    dialect,
    "Say clinical terms, drug names and numbers the way a clinician from that region says them — inside your own dialect's vowels and rhythm, never switched to RP or American for the technical words — while keeping them clearly intelligible.",
    BASE_STYLE,
  ]
    .filter(Boolean)
    .join(" ");
};

const VOICE_PRESETS: Record<string, VoicePreset> = Object.fromEntries(
  ACCENT_BANK.map((row) => [
    row.id,
    {
      voice: row.voice,
      instructions: buildInstructions(row),
      nativeVoiceId: NATIVE_VOICE_IDS[row.id],
    },
  ]),
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
// ElevenLabs currently permits three concurrent requests for this account.
// Staying within that cap prevents regional chunks silently falling back to a
// generic voice when a fourth native request is rate-limited.
const TTS_CONCURRENCY = (() => {
  const raw = Deno.env.get("TTS_CONCURRENCY");
  if (!raw) return 3;
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed) || parsed < 1) {
    console.warn(`[config] Invalid TTS_CONCURRENCY="${raw}", falling back to 3`);
    return 3;
  }
  return Math.min(parsed, 3);
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
  /**
   * Bulk re-record mode: keep the existing episode `ready` and playable while
   * the replacement renders, flagging it with `regenerating` instead of
   * blanking it. Used by the admin re-record queue so listeners never lose an
   * episode mid-run.
   */
  preserveExisting?: boolean;
  /** Internal bulk jobs refresh the script once per topic after content changes. */
  refreshScript?: boolean;
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

COVER THE WHOLE TOPIC, NOT JUST THE PROSE:
- The source includes summary boxes, key-point boxes, warning/pitfall boxes, tables, worked examples, algorithm and flowchart steps, and diagram/animation/figure labels (sometimes listed under a "diagram, animation and figure labels" heading).
- Every one of these must be narrated in words. Turn tables into spoken comparisons ("in contrast, in the second column…"), turn algorithms and flowcharts into ordered spoken steps, and turn diagram or animation labels into a described sequence ("picture the pressure rising as the valve closes, then…").
- Never say "as shown in the diagram", "see the table above", or "as illustrated" — the listener has no screen. Say the content instead.
- If a label list is terse or fragmentary, weave its facts into the surrounding explanation rather than reading the fragments aloud verbatim.

STRUCTURE (single flowing narration, no section headers spoken aloud):
1. Brief hook: why this topic matters in exam and clinical practice
2. Core concepts: walk through the key teaching points in a logical order (the bulk of the script), including summary-box, table and algorithm content
3. Described figures: explain the topic's diagrams and animations in words at the point they are relevant
4. Exam-focused viva-style framing: "if an examiner asks…", "the classic answer is…", "trainees often forget…"
5. Three to five take-home pearls to remember, drawing on the key-point and summary boxes
6. Brief closing

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

/**
 * Narrate a chunk with the real regional voice for this accent. A failed native
 * request returns null so the whole episode can retry without mixing voices.
 */
async function synthesiseChunkNative(
  text: string,
  nativeVoiceId: string,
  attempt = 1,
): Promise<Uint8Array | null> {
  const controller = new AbortController();
  const timeoutId = setTimeout(
    () => controller.abort(new Error("native TTS timed out")),
    TTS_REQUEST_TIMEOUT_MS,
  );
  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${nativeVoiceId}?output_format=mp3_44100_128`,
      {
        method: "POST",
        signal: controller.signal,
        headers: {
          "xi-api-key": ELEVENLABS_API_KEY!,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          model_id: ELEVEN_TTS_MODEL,
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.85,
            style: 0.15,
            use_speaker_boost: true,
          },
        }),
      },
    );

    if (!response.ok) {
      const errText = await response.text();
      // 409 = the shared voice is being provisioned by a parallel chunk; retry.
      const isRetryable =
        response.status === 429 || response.status === 409 || response.status >= 500;
      if (isRetryable && attempt < TTS_MAX_RETRIES) {
        const baseDelay = response.status === 429 ? 3_000 : 500;
        await sleep(baseDelay * Math.pow(2, attempt - 1) + Math.random() * 500);
        return synthesiseChunkNative(text, nativeVoiceId, attempt + 1);
      }
      console.error(`[tts] native voice failed (${response.status}): ${errText}`);
      return null;
    }

    const bytes = new Uint8Array(await response.arrayBuffer());
    if (bytes.length === 0) {
      console.error("[tts] native voice returned empty audio");
      return null;
    }
    return bytes;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (attempt < TTS_MAX_RETRIES) {
      await sleep(500 * Math.pow(2, attempt - 1) + Math.random() * 250);
      return synthesiseChunkNative(text, nativeVoiceId, attempt + 1);
    }
    console.error(`[tts] native voice error: ${message}`);
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function synthesiseChunk(
  text: string,
  preset: VoicePreset,
  attempt = 1,
): Promise<Uint8Array> {
  if (ELEVENLABS_API_KEY && preset.nativeVoiceId && attempt === 1) {
    const native = await synthesiseChunkNative(text, preset.nativeVoiceId);
    if (native) return native;
    throw new Error("Native regional voice was temporarily unavailable; retrying the episode without substituting a generic voice.");
  }
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

/** Stable fingerprint of the source topic text used for an episode. */
async function sha256Hex(text: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}



Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);

  try {
    const { topicId, topicTitle, content, force, regeneratePassword, voiceId, preserveExisting, refreshScript } =
      (await req.json()) as RequestBody;
    const internalRequest = req.headers.get("x-internal-token") === SERVICE_ROLE;
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
      if (!internalRequest && (!REGENERATE_PASSWORD || submittedPassword !== REGENERATE_PASSWORD)) {
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

    // Fingerprint of the topic text this request would narrate. Stored on the
    // episode so an unchanged topic never pays for the same accent twice.
    const contentHash = await sha256Hex(content);

    // Episodes are cached per (topic, voice): each accent a listener picks gets
    // its own row, so one user's re-narration never overwrites another's.
    const { data: existing } = await supabase
      .from("podcasts")
      .select("*")
      .eq("topic_id", topicId)
      .eq("voice", voiceIdResolved)
      .maybeSingle();

    // The spoken script is accent-independent — reuse it from any other voice's
    // ready episode for this topic instead of paying for a fresh LLM script.
    let reusedScript: string | null = null;
    if (refreshScript !== true && (existing?.status !== "ready" || !existing.script)) {
      const { data: anyVoice } = await supabase
        .from("podcasts")
        .select("script")
        .eq("topic_id", topicId)
        .eq("status", "ready")
        .not("script", "is", null)
        .limit(1)
        .maybeSingle();
      if (anyVoice?.script) reusedScript = anyVoice.script as string;
    }

    // The row is scoped to this voice already, so a ready row is always a
    // cache hit for the requested accent. A force-regenerate is also skipped
    // when the topic text is byte-identical to what this accent already
    // narrated — re-recording it would only burn credits.
    const unchangedSinceLastRecording =
      existing?.status === "ready" &&
      !!existing.audio_path &&
      !!existing.content_hash &&
      existing.content_hash === contentHash;

    if (
      existing?.status === "ready" &&
      existing.audio_path &&
      (!forceRegenerate || unchangedSinceLastRecording)
    ) {
      const { data: pub } = supabase.storage.from("podcasts").getPublicUrl(existing.audio_path);
      if (forceRegenerate) {
        console.log(`[${topicId}] Skipping re-record for ${voiceIdResolved} — topic content unchanged.`);
      }
      return jsonResponse({
        status: "ready",
        audio_url: pub.publicUrl,
        script: existing.script,
        duration_seconds: existing.duration_seconds,
        voice: voiceIdResolved,
        cached: true,
        unchanged: forceRegenerate ? true : undefined,
      });
    }
    if (reusedScript) {
      console.log(`[${topicId}] Reusing script from another voice — TTS only for ${voiceIdResolved}.`);
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
    if (!internalRequest && isIpRateLimited(ip)) {
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

    // Keep-until-replaced: when a playable episode already exists and the
    // caller asked to preserve it, leave `status` = ready and the old audio in
    // place, marking the row `regenerating` so the UI can say "re-recording".
    const keepExisting =
      preserveExisting === true && existing?.status === "ready" && !!existing.audio_path;

    await supabase.from("podcasts").upsert(
      {
        topic_id: topicId,
        topic_title: topicTitle,
        voice: voiceIdResolved,
        status: keepExisting ? "ready" : "generating",
        regenerating: true,
        error_message: null,
      },
      { onConflict: "topic_id,voice" },
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
        const script = reusedScript ?? await (async () => {
          console.log(`[${topicId}] Generating script...`);
          return generateScript(topicTitle, content);
        })();
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
            content_hash: contentHash,
            status: "ready",
            regenerating: false,
            error_message: null,
          })
          .eq("topic_id", topicId)
          .eq("voice", voiceIdResolved);

        console.log(`[${topicId}] Generation complete — row marked ready.`);
      } catch (genErr) {
        const message = genErr instanceof Error ? genErr.message : String(genErr);
        const failure = normaliseProviderError(message);
        console.error(`[${topicId}] Generation failed:`, message);
        // On failure keep a preserved episode playable — only rows that had no
        // usable audio become `failed`.
        await supabase
          .from("podcasts")
          .update({
            status: keepExisting ? "ready" : "failed",
            regenerating: false,
            error_message: failure.error,
          })
          .eq("topic_id", topicId)
          .eq("voice", voiceIdResolved);
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

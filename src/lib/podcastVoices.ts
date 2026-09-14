/**
 * Podcast narrator bank.
 *
 * A single table of regional accents drives both the picker in the UI and the
 * text-to-speech steering in supabase/functions/generate-podcast/index.ts —
 * keep ACCENT_BANK in the two files in sync (same ids, voices and traits).
 *
 * Each entry pairs an OpenAI TTS base voice (British-leaning where possible)
 * with accent traits. Instructions are built by one shared formatter, so a new
 * regional narrator only needs a row here and in the edge function.
 */
export interface PodcastAccent {
  id: string;
  label: string;
  description: string;
  /** Grouping shown in the narrator picker. */
  group: string;
  /** OpenAI TTS base voice. */
  voice: string;
  /** Accent name used in the steering instructions. */
  accent: string;
  /** Distinctive phonetic/prosodic traits for the steering instructions. */
  traits: string;
  /** Non-British accents skip the "you are not American" guard rails. */
  nonBritish?: boolean;
}

export const DEFAULT_PODCAST_VOICE = "british-rp";

export const ACCENT_BANK: PodcastAccent[] = [
  // ---------------- General UK ----------------
  {
    id: "british-rp",
    label: "British — neutral (RP)",
    description: "Calm, clear Received Pronunciation",
    group: "General UK",
    voice: "alloy",
    accent: "British English, modern Received Pronunciation",
    traits: "Non-rhotic, crisp consonants, even measured intonation, no regional colouring.",
  },
  {
    id: "british-female-warm",
    label: "British — warm female",
    description: "Friendly UK tutor",
    group: "General UK",
    voice: "coral",
    accent: "female British English, warm modern RP",
    traits: "Non-rhotic, gentle rising phrasing, encouraging tutorial warmth.",
  },
  {
    id: "british-male-deep",
    label: "British — deep male",
    description: "Measured, authoritative UK male",
    group: "General UK",
    voice: "onyx",
    accent: "male British English, deep authoritative RP",
    traits: "Low chest resonance, unhurried, deliberate stress on key terms.",
  },
  {
    id: "british-storyteller",
    label: "British — storyteller",
    description: "Expressive UK documentary narrator",
    group: "General UK",
    voice: "fable",
    accent: "British English documentary narration",
    traits: "Expressive dynamic range, curious lifts at clause ends, theatrical but controlled.",
  },
  {
    id: "british-estuary",
    label: "British — Estuary / London",
    description: "Modern south-east England",
    group: "General UK",
    voice: "verse",
    accent: "Estuary English (London and the Thames estuary)",
    traits:
      "Softened t-glottalling ('bu'er' for butter), l-vocalisation, RP-adjacent vowels with a modern urban lilt.",
  },

  // ---------------- Southern England ----------------

  // ---------------- Southern England ----------------
  {
    id: "british-cockney",
    label: "English — Cockney (East London)",
    description: "Traditional working-class London",
    group: "Southern England",
    voice: "ballad",
    accent: "Cockney (traditional East London)",
    traits:
      "Dropped h's, th-fronting ('fink' for think), glottal stops, diphthong shift ('fice' for face), quick lively rhythm.",
  },
  {
    id: "british-west-country",
    label: "English — West Country",
    description: "Warm Somerset / Devon burr",
    group: "Southern England",
    voice: "fable",
    accent: "English West Country (Somerset and Devon)",
    traits:
      "Strongly rhotic burr — sound the 'r' in farm, harder, water. Long broad 'a' ('baath'), soft rounded vowels, gently sing-song unhurried rural lilt.",
  },
  {
    id: "british-bristol",
    label: "English — Bristol",
    description: "City West Country",
    group: "Southern England",
    voice: "fable",
    accent: "Bristolian (city West Country)",
    traits:
      "Rhotic but brisker than rural Somerset, the Bristol 'l' added to final vowels, flat friendly urban delivery.",
  },
  {
    id: "british-cornish",
    label: "English — Cornish",
    description: "Far South West",
    group: "Southern England",
    voice: "fable",
    accent: "Cornish (far South West England)",
    traits:
      "Rhotic with a lilting Celtic musicality, elongated vowels, softened endings, gentle seaside cadence.",
  },
  {
    id: "british-east-anglian",
    label: "English — Norfolk / East Anglia",
    description: "Rural eastern England",
    group: "Southern England",
    voice: "ash",
    accent: "Norfolk and East Anglian",
    traits:
      "Distinctive falling-then-rising intonation, yod-dropping ('noo' for new), long 'oo' vowels, relaxed pace.",
  },

  // ---------------- Midlands ----------------
  {
    id: "british-essex",
    label: "English — Essex",
    description: "Modern Essex / Thames-side",
    group: "Southern England",
    voice: "verse",
    accent: "Essex English (south-east England)",
    traits:
      "Strong t-glottalling, l-vocalisation, wide 'ai' diphthongs, upbeat urban lilt.",
  },
  {
    id: "british-kent",
    label: "English — Kent",
    description: "Kentish south-east",
    group: "Southern England",
    voice: "ballad",
    accent: "Kentish (south-east England)",
    traits:
      "Non-rhotic, softened final consonants, gently drawled long vowels, relaxed cadence.",
  },
  {
    id: "british-sussex",
    label: "English — Sussex / Brighton",
    description: "South coast England",
    group: "Southern England",
    voice: "coral",
    accent: "Sussex and Brighton south-coast English",
    traits:
      "Non-rhotic in modern speech (the old Sussex burr is gone), mellow open vowels, mild t-glottalling, easy relaxed rhythm.",
  },
  {
    id: "british-hampshire",
    label: "English — Hampshire / Solent",
    description: "Central south coast",
    group: "Southern England",
    voice: "alloy",
    accent: "Hampshire and Solent English",
    traits:
      "Near-RP frame with faint West-Country colouring on long vowels, light rhotic trace in older speech, gentle unhurried delivery.",
  },
  {
    id: "british-dorset",
    label: "English — Dorset",
    description: "Rural southern West Country",
    group: "Southern England",
    voice: "fable",
    accent: "Dorset (rural southern England)",
    traits:
      "Rhotic burred 'r', long drawled 'aa' in bath and grass, voiced 's' at word onset, unhurried lilt.",
  },
  {
    id: "british-home-counties",
    label: "English — Home Counties",
    description: "Polished suburban south-east",
    group: "Southern England",
    voice: "onyx",
    accent: "Home Counties English (Surrey, Berkshire, Buckinghamshire)",
    traits:
      "Near-RP, clipped consonants, restrained intonation, faint Estuary softening of 't'.",
  },
  {
    id: "british-oxford",
    label: "English — Oxford / Thames Valley",
    description: "Academic southern English",
    group: "Southern England",
    voice: "sage",
    accent: "Oxford and Thames Valley English",
    traits:
      "Precise near-RP articulation, careful vowel length, measured lecturing cadence.",
  },

  // ---------------- Midlands ----------------
  {
    id: "british-brummie",
    label: "English — Birmingham (Brummie)",
    description: "West Midlands city",
    group: "Midlands",
    voice: "verse",
    accent: "Birmingham (Brummie)",
    traits:
      "Characteristic downward sentence-final intonation, nasal resonance, 'oi' coloured 'i' in price, unhurried flat delivery.",
  },
  {
    id: "british-black-country",
    label: "English — Black Country",
    description: "Dudley / Wolverhampton",
    group: "Midlands",
    voice: "ash",
    accent: "Black Country (Dudley and Wolverhampton)",
    traits:
      "Older Midlands vowels, 'yow' for you, flat FOOT/STRUT vowels, sturdy rhythmic stress and rising ends.",
  },
  {
    id: "british-east-midlands",
    label: "English — East Midlands",
    description: "Derby / general East Midlands",
    group: "Midlands",
    voice: "alloy",
    accent: "East Midlands (Nottingham and Derby)",
    traits:
      "Northern-style short 'a' in bath, flat unrounded vowels, dropped final g's, level even rhythm.",
  },

  // ---------------- Northern England ----------------
  {
    id: "british-potteries",
    label: "English — Stoke / Potteries",
    description: "North Staffordshire",
    group: "Midlands",
    voice: "ash",
    accent: "Potteries (Stoke-on-Trent)",
    traits:
      "Flat northern 'a' and 'u', distinctive rising terminals, clipped short vowels, sing-song lift.",
  },
  {
    id: "british-coventry",
    label: "English — Coventry",
    description: "West Midlands city",
    group: "Midlands",
    voice: "verse",
    accent: "Coventry English",
    traits:
      "Brummie-adjacent falling intonation with flatter vowels, elongated 'ay', lightly nasal resonance.",
  },
  {
    id: "british-leicester",
    label: "English — Leicester",
    description: "East Midlands city",
    group: "Midlands",
    voice: "coral",
    accent: "Leicester (East Midlands)",
    traits:
      "Flat 'a', dropped h-onsets, shortened function words, level unshowy intonation.",
  },
  {
    id: "british-nottingham",
    label: "English — Nottingham",
    description: "East Midlands / Notts",
    group: "Midlands",
    voice: "alloy",
    accent: "Nottingham (Nottinghamshire)",
    traits:
      "Flat 'u' in bus, monophthongal 'o', glottal replacement of final 't', quick clipped rhythm.",
  },
  {
    id: "british-lincolnshire",
    label: "English — Lincolnshire",
    description: "Rural east Midlands",
    group: "Midlands",
    voice: "ballad",
    accent: "Lincolnshire (rural east England)",
    traits:
      "Long open vowels, rhotic traces, dropped 'h', slow deliberate agricultural cadence.",
  },
  {
    id: "british-shropshire",
    label: "English — Shropshire / Welsh Marches",
    description: "West Midlands borders",
    group: "Midlands",
    voice: "fable",
    accent: "Shropshire and Welsh border English",
    traits:
      "Softly rhotic, gentle sing-song borrowed from Welsh phrasing, unhurried warm delivery.",
  },
  {
    id: "british-northampton",
    label: "English — Northampton",
    description: "South Midlands",
    group: "Midlands",
    voice: "sage",
    accent: "Northamptonshire English",
    traits:
      "Transitional north-south vowels, mixed 'a' in bath, level intonation, mild t-glottalling.",
  },

  // ---------------- Northern England ----------------
  {
    id: "british-yorkshire",
    label: "English — Yorkshire",
    description: "Broad, warm northern",
    group: "Northern England",
    voice: "ash",
    accent: "Yorkshire",
    traits:
      "Short flat 'a' in bath and grass, FOOT/STRUT merger ('boos' for bus), definite article reduction, blunt warm cadence.",
  },
  {
    id: "british-lancashire",
    label: "English — Lancashire",
    description: "North West rural",
    group: "Northern England",
    voice: "fable",
    accent: "Lancashire (North West England)",
    traits:
      "Short northern 'a', slightly rhotic in older forms, elongated 'oo', friendly gently rolling intonation.",
  },
  {
    id: "british-manchester",
    label: "English — Manchester",
    description: "Mancunian city",
    group: "Northern England",
    voice: "verse",
    accent: "Mancunian (Manchester)",
    traits:
      "Flat northern vowels, prominent final 'er' as 'a', clipped confident delivery, level intonation.",
  },
  {
    id: "british-scouse",
    label: "English — Liverpool (Scouse)",
    description: "Merseyside",
    group: "Northern England",
    voice: "ballad",
    accent: "Scouse (Liverpool, Merseyside)",
    traits:
      "Fast rise-fall melody, velar fricative in back and book, hard 'k' softening, adenoidal nasal resonance.",
  },
  {
    id: "british-geordie",
    label: "English — Newcastle (Geordie)",
    description: "Tyneside",
    group: "Northern England",
    voice: "ash",
    accent: "Geordie (Newcastle upon Tyne, Tyneside)",
    traits:
      "Musical rising intonation, 'gan' and 'toon' vowels, long 'ee' endings, warm energetic pace.",
  },
  {
    id: "british-mackem",
    label: "English — Sunderland (Mackem)",
    description: "Wearside",
    group: "Northern England",
    voice: "ballad",
    accent: "Mackem (Sunderland, Wearside)",
    traits:
      "Tyneside-adjacent but flatter, 'make' as 'mak', shortened vowels, brisk plain-spoken rhythm.",
  },
  {
    id: "british-cumbrian",
    label: "English — Cumbria",
    description: "Lake District / border",
    group: "Northern England",
    voice: "fable",
    accent: "Cumbrian (Lake District and Scottish border)",
    traits:
      "Northern short vowels with a faint Scots edge, slight rhoticity, lilting rural border cadence.",
  },

  // ---------------- Wales ----------------
  {
    id: "british-sheffield",
    label: "English — Sheffield",
    description: "South Yorkshire",
    group: "Northern England",
    voice: "onyx",
    accent: "Sheffield (South Yorkshire)",
    traits:
      "Flat 'a' and 'u', definite-article reduction ('t'hospital'), dark 'l', blunt falling ends.",
  },
  {
    id: "british-hull",
    label: "English — Hull / East Yorkshire",
    description: "Humberside",
    group: "Northern England",
    voice: "verse",
    accent: "Hull and East Yorkshire",
    traits:
      "H-dropping, NURSE fronted and rounded so 'work' leans to 'werk', GOAT monophthong ('phern' for phone), flat 'a', dry level tone.",
  },
  {
    id: "british-leeds",
    label: "English — Leeds",
    description: "West Yorkshire city",
    group: "Northern England",
    voice: "ash",
    accent: "Leeds (West Yorkshire)",
    traits:
      "Flat vowels, short 'oo' in book, dropped h-onsets, steady practical rhythm.",
  },
  {
    id: "british-teesside",
    label: "English — Middlesbrough / Teesside",
    description: "North-east England",
    group: "Northern England",
    voice: "coral",
    accent: "Teesside (Middlesbrough)",
    traits:
      "Fronted 'oo', Geordie-adjacent lifts without full Tyneside vowels, brisk warm delivery.",
  },
  {
    id: "british-durham",
    label: "English — Durham",
    description: "North-east England",
    group: "Northern England",
    voice: "alloy",
    accent: "County Durham English",
    traits:
      "Softer Geordie-adjacent vowels, gentle rise-fall, rhotic-free with warm rounded 'o'.",
  },
  {
    id: "british-northumberland",
    label: "English — Northumberland",
    description: "Far north-east England",
    group: "Northern England",
    voice: "fable",
    accent: "Northumberland (rural north-east)",
    traits:
      "Trace of the traditional Northumbrian burr on 'r' (now rare), long open vowels, lilting rise-fall, unhurried pastoral cadence.",
  },
  {
    id: "british-bolton",
    label: "English — Bolton / Greater Manchester",
    description: "Industrial Lancashire",
    group: "Northern England",
    voice: "ballad",
    accent: "Bolton and Greater Manchester town English",
    traits:
      "Flat 'a', shortened 'the', nasal Mancunian-adjacent resonance, quick clipped phrasing.",
  },
  {
    id: "british-preston",
    label: "English — Preston / Lancashire",
    description: "Lancashire",
    group: "Northern England",
    voice: "sage",
    accent: "Preston and central Lancashire",
    traits:
      "Rhotic traces, flat vowels, dropped 'h', level down-to-earth delivery.",
  },

  // ---------------- Islands and Crown dependencies ----------------
  {
    id: "british-isle-of-man",
    label: "Manx — Isle of Man",
    description: "Manx English",
    group: "Islands and Crown dependencies",
    voice: "ash",
    accent: "Manx English (Isle of Man)",
    traits:
      "Lancashire-tinged vowels with Gaelic lilt, slight rhoticity, gentle rising phrase ends.",
  },

  // ---------------- Wales ----------------
  {
    id: "welsh-south",
    label: "Welsh — South Wales (general)",
    description: "General south Wales lilt",
    group: "Wales",
    voice: "coral",
    accent: "general South Wales English",
    traits:
      "Sing-song rise and fall, pure elongated vowels, rolled light 'r', clear consonants, melodic warmth.",
  },
  {
    id: "welsh-north",
    label: "Welsh — North Wales",
    description: "Gwynedd / Anglesey",
    group: "Wales",
    voice: "fable",
    accent: "North Wales (Gwynedd and Anglesey)",
    traits:
      "Stronger Welsh-language influence, crisp dark 'l', clipped precise consonants, steady lilt with falling ends.",
  },

  // ---------------- Scotland ----------------
  {
    id: "welsh-cardiff",
    label: "Welsh — Cardiff",
    description: "Capital city Welsh",
    group: "Wales",
    voice: "verse",
    accent: "Cardiff Welsh English",
    traits:
      "Distinctive long central 'a' ('Caardiff'), non-rhotic, urban clipped consonants, mild musical lift.",
  },
  {
    id: "welsh-swansea",
    label: "Welsh — Swansea",
    description: "South-west Wales",
    group: "Wales",
    voice: "coral",
    accent: "Swansea Welsh English",
    traits:
      "Strong musical intonation, elongated vowels, clear consonants, warm friendly cadence.",
  },
  {
    id: "welsh-valleys",
    label: "Welsh — Valleys",
    description: "South Wales Valleys",
    group: "Wales",
    voice: "alloy",
    accent: "South Wales Valleys English",
    traits:
      "Pronounced rise-fall sing-song, rolled light 'r', emphatic sentence-final lifts.",
  },
  {
    id: "welsh-mid",
    label: "Welsh — Mid Wales",
    description: "Rural mid Wales",
    group: "Wales",
    voice: "fable",
    accent: "Mid Wales English",
    traits:
      "Slow lilting delivery, softly rolled 'r', Welsh-language phrasing rhythm, gentle warmth.",
  },

  // ---------------- Scotland ----------------
  {
    id: "scottish",
    label: "Scottish — Edinburgh",
    description: "Educated Scottish",
    group: "Scottish dialects",
    voice: "ash",
    accent: "educated Scottish (Edinburgh, Morningside-influenced standard Scottish English)",
    traits:
      "Rhotic tapped 'r', pure monophthong vowels, short-long vowel distinction (shire vs shire with long vowel), clear articulation, restrained even intonation typical of educated Edinburgh speech.",
  },
  {
    id: "scottish-glaswegian",
    label: "Scottish — Glasgow",
    description: "Glaswegian city",
    group: "Scottish dialects",
    voice: "verse",
    accent: "Glaswegian (Glasgow and West of Scotland conurbation)",
    traits:
      "Strong rhotic 'r', glottal stops mid-word ('wa'er' for water), rising terminal intonation, punchy varied melody, brisk energetic West of Scotland delivery.",
  },
  {
    id: "scottish-highland",
    label: "Scottish — Highland",
    description: "Inverness / West Highland",
    group: "Scottish dialects",
    voice: "ballad",
    accent: "Highland Scottish (Inverness and the West Highlands)",
    traits:
      "Slow, softly lilting Gaelic-influenced cadence, gently rolled 'r', precise clear vowels.",
  },
  {
    id: "scottish-doric",
    label: "Scottish — Aberdeen (Doric)",
    description: "North East Scotland",
    group: "Scottish dialects",
    voice: "ash",
    accent: "Doric (Aberdeen and North East Scotland)",
    traits:
      "Distinctive Doric colour: 'fit' for what, 'far' for where, 'hoose' for house, 'f' for 'wh' at word start, strongly rhotic, clipped rhythmic North East delivery.",
  },

  // ---------------- Ireland ----------------
  {
    id: "scottish-dundee",
    label: "Scottish — Dundee",
    description: "Tayside",
    group: "Scottish dialects",
    voice: "ash",
    accent: "Dundonian Scots (Dundee)",
    traits:
      "Rhotic tapped 'r', distinctive 'eh' for 'I', clipped quick delivery, flat terminal falls.",
  },
  {
    id: "scottish-fife",
    label: "Scottish — Fife",
    description: "East central Scotland",
    group: "Scottish dialects",
    voice: "ballad",
    accent: "Fife Scots",
    traits:
      "Rhotic, glottal stops mid-word, monophthongal vowels, level understated intonation.",
  },
  {
    id: "scottish-ayrshire",
    label: "Scottish — Ayrshire",
    description: "South-west Scotland",
    group: "Scottish dialects",
    voice: "coral",
    accent: "Ayrshire Scots",
    traits:
      "Strong rolled 'r', broad 'oo' in house, sing-song rise on questions, warm open delivery.",
  },
  {
    id: "scottish-borders",
    label: "Scottish — Borders",
    description: "Southern Scotland",
    group: "Scottish dialects",
    voice: "sage",
    accent: "Scottish Borders English (Hawick, Galashiels, Kelso)",
    traits:
      "Strongly rhotic with a rolled light burr — the most rhotic variety in Scotland, long open vowels, measured lilting cadence, softened consonants, hint of Northumbrian influence.",
  },
  {
    id: "scottish-hebridean",
    label: "Scottish — Hebrides",
    description: "Western Isles",
    group: "Scottish dialects",
    voice: "fable",
    accent: "Hebridean Scottish English",
    traits:
      "Gaelic-influenced slow lilt, pure long vowels, softly aspirated consonants, melodic phrasing.",
  },

  // ---------------- Ireland ----------------
  {
    id: "irish",
    label: "Irish — Dublin",
    description: "Soft Dublin accent",
    group: "Ireland",
    voice: "ballad",
    accent: "Dublin Irish",
    traits:
      "Softened 'th' towards 't' and 'd', light rhotic 'r', musical rise on statements, easy relaxed pace.",
    nonBritish: true,
  },
  {
    id: "irish-cork",
    label: "Irish — Cork",
    description: "Munster lilt",
    group: "Ireland",
    voice: "coral",
    accent: "Cork Irish (Munster)",
    traits:
      "Pronounced sing-song pitch swoops, elongated vowels, rapid lively phrasing.",
    nonBritish: true,
  },
  {
    id: "irish-northern",
    label: "Irish — Belfast (Northern)",
    description: "Northern Irish",
    group: "Ireland",
    voice: "ash",
    accent: "Northern Irish (Belfast)",
    traits:
      "Falling sentence-final intonation, tight front vowels, rhotic, brisk clipped consonants.",
  },
  {
    id: "irish-galway",
    label: "Irish — Galway",
    description: "West of Ireland",
    group: "Ireland",
    voice: "alloy",
    accent: "Galway and west of Ireland English",
    traits:
      "Rhotic, soft 'th' as 't', lilting rise-fall, melodic unhurried delivery.",
    nonBritish: true,
  },
  {
    id: "irish-kerry",
    label: "Irish — Kerry",
    description: "South-west Ireland",
    group: "Ireland",
    voice: "ballad",
    accent: "Kerry Irish English",
    traits:
      "Strong Gaelic lilt, sing-song rise-fall, rhotic, elongated stressed vowels.",
    nonBritish: true,
  },
  {
    id: "irish-limerick",
    label: "Irish — Limerick",
    description: "Mid-west Ireland",
    group: "Ireland",
    voice: "verse",
    accent: "Limerick Irish English",
    traits:
      "Flatter mid-west vowels, rhotic, brisk clipped rhythm, dry falling terminals.",
    nonBritish: true,
  },
  {
    id: "irish-derry",
    label: "Irish — Derry / Londonderry",
    description: "North-west Northern Ireland",
    group: "Ireland",
    voice: "coral",
    accent: "Derry Irish English",
    traits:
      "Northern rise on statement ends, tight front vowels, rhotic, quick bright delivery.",
  },

  // ---------------- Rest of the world ----------------
  {
    id: "new-zealand",
    label: "New Zealand",
    description: "Kiwi accent",
    group: "Rest of the world",
    voice: "nova",
    accent: "New Zealand English",
    traits:
      "Centralised short 'i' in fish, raised 'e', clipped diphthongs, level friendly delivery.",
    nonBritish: true,
  },
  {
    id: "south-african",
    label: "South African",
    description: "South African English",
    group: "Rest of the world",
    voice: "onyx",
    accent: "South African English",
    traits:
      "Clipped monophthongal vowels, non-rhotic, crisp dental consonants, firm falling ends.",
    nonBritish: true,
  },
  {
    id: "canadian",
    label: "Canadian",
    description: "Canadian English",
    group: "Rest of the world",
    voice: "sage",
    accent: "Canadian English",
    traits:
      "Rhotic, Canadian raising on 'out' and 'about', even friendly newsreader cadence.",
    nonBritish: true,
  },
  {
    id: "indian-english",
    label: "Indian English",
    description: "Indian English narration",
    group: "Rest of the world",
    voice: "ash",
    accent: "Indian English",
    traits:
      "Retroflex 't' and 'd', syllable-timed rhythm, clear precise articulation, even pitch.",
    nonBritish: true,
  },

  // ---------------- Rest of the world ----------------
  {
    id: "australian",
    label: "Australian",
    description: "Relaxed Australian accent",
    group: "Rest of the world",
    voice: "nova",
    accent: "general Australian",
    traits: "Broad flattened diphthongs, rising statement intonation, relaxed open delivery.",
    nonBritish: true,
  },
  {
    id: "american",
    label: "American",
    description: "General American accent",
    group: "Rest of the world",
    voice: "sage",
    accent: "general American",
    traits: "Rhotic, flat 'a' in bath, even mid-Atlantic newsreader delivery.",
    nonBritish: true,
  },
];

/** Ordered group names for the picker. */
export const ACCENT_GROUPS: string[] = ACCENT_BANK.reduce<string[]>((groups, a) => {
  if (!groups.includes(a.group)) groups.push(a.group);
  return groups;
}, []);

export const accentsInGroup = (group: string): PodcastAccent[] =>
  ACCENT_BANK.filter((a) => a.group === group);

/** Backwards-compatible shape used by existing pickers. */
export interface PodcastVoiceOption {
  id: string;
  label: string;
  description: string;
  group: string;
}

export const PODCAST_VOICES: PodcastVoiceOption[] = ACCENT_BANK.map(
  ({ id, label, description, group }) => ({ id, label, description, group }),
);

export const podcastVoiceLabel = (id: string | undefined): string =>
  PODCAST_VOICES.find((v) => v.id === id)?.label ??
  (id ? "Custom voice" : PODCAST_VOICES[0].label);

export const isPodcastVoiceId = (id: string | undefined): boolean =>
  !!id && PODCAST_VOICES.some((v) => v.id === id);

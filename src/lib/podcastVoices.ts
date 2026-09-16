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
    voice: "ballad",
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
    voice: "verse",
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
    voice: "fable",
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
    voice: "ash",
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
    voice: "coral",
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
    voice: "sage",
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
    voice: "ballad",
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
    voice: "verse",
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
    voice: "fable",
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

  // ======================================================================
  // Dialect bank — finer-grained local dialects built on the same British
  // base voices, slotted into the existing regional picker groups.
  // ======================================================================

  // ---------------- Southern England ----------------
  {
    id: "british-devon",
    label: "English — Devon",
    description: "Rural Devon dialect",
    group: "Southern England",
    voice: "ballad",
    accent: "Devon (South West England) dialect",
    traits:
      "Strongly rhotic burred r, long open 'aa' in bath, voiced s ('zummer' for summer), lilting unhurried farmland cadence.",
  },
  {
    id: "british-wiltshire",
    label: "English — Wiltshire",
    description: "Wessex countryside dialect",
    group: "Southern England",
    voice: "fable",
    accent: "Wiltshire (Wessex) dialect",
    traits:
      "Rhotic but softer than Devon, drawled vowels, dropped final g's, gentle sing-song downward phrase endings.",
  },
  {
    id: "british-gloucestershire",
    label: "English — Gloucestershire",
    description: "Severn valley dialect",
    group: "Southern England",
    voice: "verse",
    accent: "Gloucestershire (Severn valley) dialect",
    traits:
      "Mild rhoticity, West Country vowels tempered towards the Midlands, level rhythm, warm rounded tone.",
  },
  {
    id: "british-thames-valley",
    label: "English — Thames Valley (Reading)",
    description: "Reading and Berkshire",
    group: "Southern England",
    voice: "ash",
    accent: "Thames Valley (Reading and Berkshire) dialect",
    traits:
      "Estuary-influenced non-rhotic vowels with faint West Country residue, t-glottalling, brisk even pacing.",
  },
  {
    id: "british-portsmouth",
    label: "English — Portsmouth (Pompey)",
    description: "South coast naval city",
    group: "Southern England",
    voice: "coral",
    accent: "Portsmouth (Pompey) dialect",
    traits:
      "Non-rhotic, fronted 'ow' diphthong, clipped consonants, quick chatty rhythm with rising tag questions.",
  },

  // ---------------- Midlands ----------------
  {
    id: "british-derby",
    label: "English — Derby",
    description: "Derbyshire dialect",
    group: "Midlands",
    voice: "onyx",
    accent: "Derby and Derbyshire dialect",
    traits:
      "Flat northern 'a' in bath, short 'u' in cup, downward drawl on phrase endings, dropped definite article.",
  },
  {
    id: "british-worcester",
    label: "English — Worcestershire",
    description: "West Midlands countryside",
    group: "Midlands",
    voice: "fable",
    accent: "Worcestershire dialect",
    traits:
      "Brummie-adjacent falling intonation softened by rural West Country rhoticity, unhurried, lightly nasal.",
  },
  {
    id: "british-herefordshire",
    label: "English — Herefordshire",
    description: "Welsh border dialect",
    group: "Midlands",
    voice: "ballad",
    accent: "Herefordshire (Welsh borders) dialect",
    traits:
      "Rhotic border burr, musical Welsh-influenced lift on stressed words, slow deliberate delivery.",
  },
  {
    id: "british-warwickshire",
    label: "English — Warwickshire",
    description: "Central Midlands dialect",
    group: "Midlands",
    voice: "verse",
    accent: "Warwickshire dialect",
    traits:
      "Mild Midlands vowels between Brummie and RP, flat 'a', gentle falling cadence, unhurried clarity.",
  },

  // ---------------- Northern England ----------------
  {
    id: "british-barnsley",
    label: "English — Barnsley",
    description: "South Yorkshire dialect",
    group: "Northern England",
    voice: "onyx",
    accent: "Barnsley (South Yorkshire) dialect",
    traits:
      "Broad Yorkshire vowels, definite-article reduction ('down t'ward'), 'thee/tha' rhythm, blunt clipped endings.",
  },
  {
    id: "british-bradford",
    label: "English — Bradford",
    description: "West Yorkshire dialect",
    group: "Northern England",
    voice: "ballad",
    accent: "Bradford (West Yorkshire) dialect",
    traits:
      "Flat 'a', monophthong 'face' and 'goat' vowels, dropped h's, steady level intonation.",
  },
  {
    id: "british-york",
    label: "English — York",
    description: "North Yorkshire dialect",
    group: "Northern England",
    voice: "coral",
    accent: "York and North Yorkshire dialect",
    traits:
      "Softer Yorkshire vowels, gently lengthened 'oo', tidy consonants, calm even pacing.",
  },
  {
    id: "british-wigan",
    label: "English — Wigan",
    description: "Greater Manchester dialect",
    group: "Northern England",
    voice: "verse",
    accent: "Wigan (Greater Manchester) dialect",
    traits:
      "Lancashire vowels with 'book' as long 'oo', velar nasal plus ('singger'), lively rising phrase ends.",
  },
  {
    id: "british-blackburn",
    label: "English — Blackburn",
    description: "East Lancashire dialect",
    group: "Northern England",
    voice: "fable",
    accent: "Blackburn (East Lancashire) dialect",
    traits:
      "Broad Lancashire 'oo' and flat 'a', slight rhoticity on final r, terse rhythmic delivery.",
  },
  {
    id: "british-oldham",
    label: "English — Oldham",
    description: "Pennine mill-town dialect",
    group: "Northern England",
    voice: "coral",
    accent: "Oldham (Pennine Lancashire) dialect",
    traits:
      "Manchester-adjacent flat vowels, harder consonants, nasal edge, quick businesslike cadence.",
  },

  // ---------------- Wales ----------------
  {
    id: "welsh-wrexham",
    label: "Welsh — Wrexham",
    description: "North-east Wales dialect",
    group: "Wales",
    voice: "verse",
    accent: "Wrexham (north-east Wales) dialect",
    traits:
      "Welsh musicality crossed with Cheshire/Scouse influence, clear consonants, rising mid-sentence lifts.",
  },
  {
    id: "welsh-pembrokeshire",
    label: "Welsh — Pembrokeshire",
    description: "South-west Wales dialect",
    group: "Wales",
    voice: "coral",
    accent: "Pembrokeshire (south-west Wales) dialect",
    traits:
      "Soft 'Little England' vowels, light rhoticity, gentle sing-song rise and fall, warm unhurried tone.",
  },
  {
    id: "welsh-anglesey",
    label: "Welsh — Anglesey",
    description: "Ynys Môn dialect",
    group: "Wales",
    voice: "ballad",
    accent: "Anglesey (Ynys Môn) Welsh-English dialect",
    traits:
      "Strong Welsh-language cadence, rolled r's, pure vowels, melodic rising tunes at clause ends.",
  },

  // ---------------- Scottish dialects ----------------
  {
    id: "scottish-lanarkshire",
    label: "Scottish — Lanarkshire",
    description: "Central belt dialect",
    group: "Scottish dialects",
    voice: "onyx",
    accent: "Lanarkshire (central belt Scotland) dialect",
    traits:
      "Glaswegian-adjacent but broader, tapped r's, dark 'l', glottal stops, punchy driving rhythm.",
  },
  {
    id: "scottish-perthshire",
    label: "Scottish — Perthshire",
    description: "Highland-edge dialect",
    group: "Scottish dialects",
    voice: "fable",
    accent: "Perthshire (central Scotland) dialect",
    traits:
      "Clear educated Scots vowels, lightly rolled r's, measured lilt, softer than the central belt.",
  },
  {
    id: "scottish-orkney",
    label: "Scottish — Orkney",
    description: "Orkney islands dialect",
    group: "Scottish dialects",
    voice: "coral",
    accent: "Orkney islands dialect",
    traits:
      "Norse-influenced sing-song, rising sentence endings, soft r's, gentle unhurried island cadence.",
  },
  {
    id: "scottish-shetland",
    label: "Scottish — Shetland",
    description: "Shetland islands dialect",
    group: "Scottish dialects",
    voice: "verse",
    accent: "Shetland islands dialect",
    traits:
      "Strongly Norse-tinged musical intonation, pure vowels, dental 'd' for th, lilting rises.",
  },

  // ---------------- Ireland ----------------
  {
    id: "irish-dublin",
    label: "Irish — Dublin",
    description: "Dublin city dialect",
    group: "Ireland",
    voice: "sage",
    accent: "Dublin city Irish English",
    traits:
      "Fast urban rhythm, fronted 'oi' vowels, t-slitting ('wa'er'), flat rapid phrase endings.",
    nonBritish: true,
  },
  {
    id: "irish-waterford",
    label: "Irish — Waterford",
    description: "South-east Ireland dialect",
    group: "Ireland",
    voice: "ballad",
    accent: "Waterford (south-east Ireland) dialect",
    traits:
      "Soft rhotic r's, dental t and d, gentle rise-fall melody, relaxed steady pace.",
    nonBritish: true,
  },
  {
    id: "irish-donegal",
    label: "Irish — Donegal",
    description: "Ulster Gaeltacht dialect",
    group: "Ireland",
    voice: "fable",
    accent: "Donegal (Ulster) Irish English",
    traits:
      "Strong Irish-language cadence, slender consonants, Scots-influenced vowels, rising musical endings.",
    nonBritish: true,
  },

  // ---------------- Islands and Crown dependencies ----------------
  {
    id: "jersey-english",
    label: "Channel Islands — Jersey",
    description: "Jersey dialect",
    group: "Islands and Crown dependencies",
    voice: "coral",
    accent: "Jersey (Channel Islands) English",
    traits:
      "Near-RP base with Norman-French rhythm, slight rhoticity, softened consonants, gentle lift on final syllables.",
  },
  {
    id: "guernsey-english",
    label: "Channel Islands — Guernsey",
    description: "Guernsey dialect",
    group: "Islands and Crown dependencies",
    voice: "verse",
    accent: "Guernsey (Channel Islands) English",
    traits:
      "Soft southern English vowels with Guernésiais French colouring, drawn-out vowels, mild sing-song cadence.",
  },
];

/* ------------------------------------------------------------------ *
 * Accent steering
 *
 * The base voices are strongly pulled towards neutral RP or General
 * American, so weak instructions collapse every regional narrator into one
 * of those two. Three things measurably hold the accent:
 *   1. a first-person native-speaker persona (not "read in an X accent"),
 *   2. concrete pronunciation anchors — real words with respellings,
 *   3. an explicit ban on neutralising the accent "for clarity".
 * Keep this block identical to the copy in
 * supabase/functions/generate-podcast/index.ts.
 * ------------------------------------------------------------------ */

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

/**
 * Family-level pronunciation anchors. Written as real words plus phonetic
 * respellings, which steer the model far harder than adjectives do.
 */
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

const BASE_STYLE =
  "Warm, confident and clear, like a senior anaesthetic trainee tutoring a peer. " +
  "Steady pace, natural phrasing, no exaggeration or comedy — this is your ordinary speaking voice.";

export const buildAccentInstructions = (row: {
  id: string;
  accent: string;
  traits: string;
  nonBritish?: boolean;
}): string => {
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
  // Episodes recorded before the accent bank existed keep their own row and
  // audio file; label them so they stay playable and identifiable.
  (id ? "Original narration" : PODCAST_VOICES[0].label);

export const isPodcastVoiceId = (id: string | undefined): boolean =>
  !!id && PODCAST_VOICES.some((v) => v.id === id);

/**
 * Per-listener narrator preference. Each listener's accent choice is stored on
 * their own device (the server caches one episode per topic AND accent, so
 * individual choices never overwrite each other) and follows them across
 * topics.
 */
export const PODCAST_VOICE_STORAGE_KEY = "podcast-preferred-voice";

export const getPreferredPodcastVoice = (): string => {
  try {
    const stored = window.localStorage.getItem(PODCAST_VOICE_STORAGE_KEY);
    if (stored && isPodcastVoiceId(stored)) return stored;
  } catch {
    // localStorage unavailable (private mode, SSR) — fall through to default.
  }
  return DEFAULT_PODCAST_VOICE;
};

/**
 * True when the listener has actively chosen an accent on this device. Used to
 * decide whether a topic may auto-select one of its real regional recordings
 * instead of the legacy default narration.
 */
export const hasStoredPodcastVoicePreference = (): boolean => {
  try {
    const stored = window.localStorage.getItem(PODCAST_VOICE_STORAGE_KEY);
    return !!stored && isPodcastVoiceId(stored);
  } catch {
    return false;
  }
};

export const setPreferredPodcastVoice = (id: string): void => {
  if (!isPodcastVoiceId(id)) return;
  try {
    window.localStorage.setItem(PODCAST_VOICE_STORAGE_KEY, id);
  } catch {
    // Non-fatal — the picker still works for this session.
  }
};

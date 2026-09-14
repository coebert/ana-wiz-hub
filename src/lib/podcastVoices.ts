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
  // ---------------- Neutral / general UK ----------------
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
    description: "Nottingham / Derby",
    group: "Midlands",
    voice: "alloy",
    accent: "East Midlands (Nottingham and Derby)",
    traits:
      "Northern-style short 'a' in bath, flat unrounded vowels, dropped final g's, level even rhythm.",
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
    id: "welsh-south",
    label: "Welsh — South Wales",
    description: "Cardiff / Valleys",
    group: "Wales",
    voice: "coral",
    accent: "South Wales (Cardiff and the Valleys)",
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
    id: "scottish",
    label: "Scottish — Edinburgh",
    description: "Educated Scottish",
    group: "Scotland",
    voice: "ash",
    accent: "educated Scottish (Edinburgh)",
    traits:
      "Rhotic tapped 'r', pure monophthong vowels, clear articulation, restrained even intonation.",
  },
  {
    id: "scottish-glaswegian",
    label: "Scottish — Glasgow",
    description: "Glaswegian city",
    group: "Scotland",
    voice: "verse",
    accent: "Glaswegian (Glasgow)",
    traits:
      "Strong rhotic 'r', glottal stops mid-word, punchy varied melody, brisk energetic delivery.",
  },
  {
    id: "scottish-highland",
    label: "Scottish — Highland",
    description: "Inverness / West Highland",
    group: "Scotland",
    voice: "ballad",
    accent: "Highland Scottish (Inverness and the West Highlands)",
    traits:
      "Slow, softly lilting Gaelic-influenced cadence, gently rolled 'r', precise clear vowels.",
  },
  {
    id: "scottish-doric",
    label: "Scottish — Aberdeen (Doric)",
    description: "North East Scotland",
    group: "Scotland",
    voice: "ash",
    accent: "Doric (Aberdeen and North East Scotland)",
    traits:
      "Distinctive 'fit' for what, 'hoose' for house, strongly rhotic, clipped rhythmic delivery.",
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

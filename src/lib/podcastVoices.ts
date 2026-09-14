/**
 * Podcast narrator options. Mirrors VOICE_PRESETS in
 * supabase/functions/generate-podcast/index.ts — keep the ids in sync.
 *
 * Each preset pairs an OpenAI TTS voice with steering instructions that set
 * the accent and delivery. The default is British (Received Pronunciation)
 * because the curriculum is UK exam focused.
 */
export interface PodcastVoiceOption {
  id: string;
  label: string;
  description: string;
}

export const DEFAULT_PODCAST_VOICE = "british-rp";

export const PODCAST_VOICES: PodcastVoiceOption[] = [
  { id: "british-rp", label: "British — neutral (RP)", description: "Calm, clear Received Pronunciation" },
  { id: "british-female-warm", label: "British — warm female", description: "Friendly UK tutor" },
  { id: "british-male-deep", label: "British — deep male", description: "Measured, authoritative UK male" },
  { id: "british-storyteller", label: "British — storyteller", description: "Expressive, engaging UK narrator" },
  { id: "scottish", label: "Scottish", description: "Educated Scottish accent" },
  { id: "irish", label: "Irish", description: "Soft Irish accent" },
  { id: "australian", label: "Australian", description: "Relaxed Australian accent" },
  { id: "american", label: "American", description: "General American accent" },
];

export const podcastVoiceLabel = (id: string | undefined): string =>
  PODCAST_VOICES.find((v) => v.id === id)?.label ??
  (id ? "Custom voice" : PODCAST_VOICES[0].label);

export const isPodcastVoiceId = (id: string | undefined): boolean =>
  !!id && PODCAST_VOICES.some((v) => v.id === id);

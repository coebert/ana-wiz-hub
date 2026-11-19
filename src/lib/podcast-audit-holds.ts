/** Exact faulty files retained for audit; no topic-wide or voice-wide ban. */
export const FAULTY_PODCAST_AUDIO_PATHS = [
  "neurointensive-care.mp3", "neuroanatomy.mp3", "organ-donation.mp3",
  "paediatric-icu.mp3", "paediatric-icu--british-west-country.mp3", "paediatric-icu--british-geordie.mp3",
  "bariatric-anaesthesia.mp3",
  "gi-physiology.mp3",
  "muscle-relaxants.mp3",
  "muscle-relaxants--british-oxford.mp3",
  "muscle-relaxants--british-storyteller.mp3",
  "muscle-relaxants--british-west-country.mp3",
  "muscle-relaxants--british-yorkshire.mp3",
  "muscle-relaxants--welsh-swansea.mp3",
  "ophthalmic-anaesthesia.mp3",
  "renal-disease.mp3",
  "rocuronium.mp3",
  "depth-of-anaesthesia.mp3",
  "depth-of-anaesthesia--british-west-country.mp3",
  "haematology-immunity.mp3",
  "haematology-immunity--british-oxford.mp3",
  "haematology-immunity--british-yorkshire.mp3",
  "vasoactive-agents.mp3",
] as const;
export const isHeldPodcastAudio = (url: string): boolean => {
  try {
    const filename = decodeURIComponent(new URL(url, "http://localhost").pathname).split("/").pop();
    return FAULTY_PODCAST_AUDIO_PATHS.some((path) => path === filename);
  } catch { return true; }
};
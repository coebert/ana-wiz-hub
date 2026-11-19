/** Exact faulty files retained for audit; no topic-wide or voice-wide ban. */
export const FAULTY_PODCAST_AUDIO_PATHS = [
  "neurointensive-care.mp3", "neuroanatomy.mp3", "organ-donation.mp3",
  "paediatric-icu.mp3", "paediatric-icu--british-west-country.mp3", "paediatric-icu--british-geordie.mp3",
  "toxicology.mp3", "local-anaesthetics.mp3", "pain-medicine.mp3",
  // 19 Nov 2026 clinical review: these exact serving editions are held. A new
  // recording is stored as `<topic>--<voice>.mp3`, so it is not caught here.
  "capnography.mp3", "capnography--british-west-country.mp3",
  "trauma-emergency.mp3", "arrhythmias-ecg-icu.mp3",
  "psychiatric-substance-disease.mp3", "paediatric-anaesthesia.mp3",
] as const;
export const isHeldPodcastAudio = (url: string): boolean => {
  try {
    const filename = decodeURIComponent(new URL(url, "http://localhost").pathname).split("/").pop();
    return FAULTY_PODCAST_AUDIO_PATHS.some((path) => path === filename);
  } catch { return true; }
};

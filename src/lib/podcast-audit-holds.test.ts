import { describe, expect, it } from "vitest";
import { FAULTY_PODCAST_AUDIO_PATHS, isHeldPodcastAudio } from "./podcast-audit-holds";

describe("Exact clinical recording holds", () => {
  it.each(FAULTY_PODCAST_AUDIO_PATHS)("blocks original %s including cached query", (path) => {
    expect(isHeldPodcastAudio(`https://example.org/podcasts/${path}?v=old`)).toBe(true);
  });

  it("blocks the exact public-storage serving URLs used by fetchPodcast and the playlist", () => {
    expect(isHeldPodcastAudio("https://project.supabase.co/storage/v1/object/public/podcasts/toxicology.mp3?v=1790000000000")).toBe(true);
    expect(isHeldPodcastAudio("https://project.supabase.co/storage/v1/object/public/podcasts/local-anaesthetics.mp3")).toBe(true);
  });

  it("does not ban other voices or reviewed replacements", () => {
    expect(isHeldPodcastAudio("https://example.org/paediatric-icu--british-rp.mp3")).toBe(false);
    expect(isHeldPodcastAudio("https://example.org/neurointensive-care--alloy--reviewed-20261030.mp3")).toBe(false);
    expect(isHeldPodcastAudio("https://example.org/toxicology--alloy--reviewed-20261119.mp3")).toBe(false);
    expect(isHeldPodcastAudio("https://example.org/local-anaesthetics--alloy--reviewed-20261119.mp3")).toBe(false);
  });
});

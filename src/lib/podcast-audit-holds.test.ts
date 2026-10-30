import { describe, expect, it } from "vitest";
import { FAULTY_PODCAST_AUDIO_PATHS, isHeldPodcastAudio } from "./podcast-audit-holds";
describe("Exact clinical recording holds", () => {
  it.each(FAULTY_PODCAST_AUDIO_PATHS)("blocks original %s including cached query", (path) => expect(isHeldPodcastAudio(`https://example.org/podcasts/${path}?v=old`)).toBe(true));
  it("does not ban other voices or reviewed replacements", () => {
    expect(isHeldPodcastAudio("https://example.org/paediatric-icu--british-rp.mp3")).toBe(false);
    expect(isHeldPodcastAudio("https://example.org/neurointensive-care--alloy--reviewed-20261030.mp3")).toBe(false);
  });
});
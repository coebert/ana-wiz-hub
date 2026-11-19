import { describe, expect, it } from "vitest";
import { FAULTY_PODCAST_AUDIO_PATHS, isHeldPodcastAudio } from "./podcast-audit-holds";
describe("Exact clinical recording holds", () => {
  it.each(FAULTY_PODCAST_AUDIO_PATHS)("blocks original %s including cached query", (path) => expect(isHeldPodcastAudio(`https://example.org/podcasts/${path}?v=old`)).toBe(true));
  it("blocks the audited original voices, including cached URLs", () => {
    expect(isHeldPodcastAudio("https://example.org/podcasts/muscle-relaxants--british-oxford.mp3?version=1")).toBe(true);
    expect(isHeldPodcastAudio("https://example.org/podcasts/haematology-immunity--british-oxford.mp3?version=1")).toBe(true);
  });
  it("does not ban other voices or reviewed replacements", () => {
    expect(isHeldPodcastAudio("https://example.org/podcasts/haematology-immunity--british-west-country.mp3")).toBe(false);
    expect(isHeldPodcastAudio("https://example.org/podcasts/muscle-relaxants--british-oxford--reviewed.mp3")).toBe(false);
    expect(isHeldPodcastAudio("https://example.org/podcasts/gi-physiology--british-west-country.mp3")).toBe(false);
    expect(isHeldPodcastAudio("https://example.org/paediatric-icu--british-rp.mp3")).toBe(false);
    expect(isHeldPodcastAudio("https://example.org/neurointensive-care--alloy--reviewed-20261030.mp3")).toBe(false);
  });
});
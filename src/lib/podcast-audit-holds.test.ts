import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { FAULTY_PODCAST_AUDIO_PATHS, isHeldPodcastAudio } from "./podcast-audit-holds";

const HOLD_MIGRATIONS = [
  "supabase/migrations/20261119124500_clinical_audio_holds.sql",
  "supabase/migrations/20261119124600_paediatric_audio_hold.sql",
];

describe("Exact clinical recording holds", () => {
  it.each(FAULTY_PODCAST_AUDIO_PATHS)("blocks original %s including cached query", (path) => {
    expect(isHeldPodcastAudio(`https://example.org/podcasts/${path}?v=old`)).toBe(true);
  });

  it("blocks the exact public-storage serving URLs used by fetchPodcast and the playlist", () => {
    expect(isHeldPodcastAudio("https://project.supabase.co/storage/v1/object/public/podcasts/toxicology.mp3?v=1790000000000")).toBe(true);
    expect(isHeldPodcastAudio("https://project.supabase.co/storage/v1/object/public/podcasts/local-anaesthetics.mp3")).toBe(true);
    expect(isHeldPodcastAudio("https://project.supabase.co/storage/v1/object/public/podcasts/capnography.mp3?v=1795000000000")).toBe(true);
    expect(isHeldPodcastAudio("https://project.supabase.co/storage/v1/object/public/podcasts/paediatric-anaesthesia.mp3")).toBe(true);
  });

  it("holds every exact audio file named by the reviewed SQL migrations", () => {
    const paths = HOLD_MIGRATIONS.flatMap((file) =>
      Array.from(readFileSync(file, "utf8").matchAll(/'([a-z0-9-]+(?:--[a-z-]+)?\.mp3)'/g), (match) => match[1]),
    );
    expect(paths.length).toBeGreaterThan(0);
    for (const path of paths) {
      expect(FAULTY_PODCAST_AUDIO_PATHS).toContain(path);
      expect(isHeldPodcastAudio(`https://project.supabase.co/storage/v1/object/public/podcasts/${path}`)).toBe(true);
    }
  });

  it("does not ban other voices or reviewed replacements", () => {
    expect(isHeldPodcastAudio("https://example.org/paediatric-icu--british-rp.mp3")).toBe(false);
    expect(isHeldPodcastAudio("https://example.org/neurointensive-care--alloy--reviewed-20261030.mp3")).toBe(false);
    expect(isHeldPodcastAudio("https://example.org/toxicology--alloy--reviewed-20261119.mp3")).toBe(false);
    expect(isHeldPodcastAudio("https://example.org/local-anaesthetics--alloy--reviewed-20261119.mp3")).toBe(false);
  });

  it("allows a replacement recording stored under a new voice or reviewed name", () => {
    expect(isHeldPodcastAudio("https://project.supabase.co/storage/v1/object/public/podcasts/capnography--british-rp.mp3?v=1795000000000")).toBe(false);
    expect(isHeldPodcastAudio("https://project.supabase.co/storage/v1/object/public/podcasts/capnography--british-west-country--reviewed-20261119.mp3")).toBe(false);
    expect(isHeldPodcastAudio("https://project.supabase.co/storage/v1/object/public/podcasts/trauma-emergency--alloy.mp3")).toBe(false);
    expect(isHeldPodcastAudio("https://project.supabase.co/storage/v1/object/public/podcasts/arrhythmias-ecg-icu--alloy.mp3")).toBe(false);
    expect(isHeldPodcastAudio("https://project.supabase.co/storage/v1/object/public/podcasts/psychiatric-substance-disease--alloy.mp3")).toBe(false);
    expect(isHeldPodcastAudio("https://project.supabase.co/storage/v1/object/public/podcasts/paediatric-anaesthesia--british-geordie.mp3")).toBe(false);
  });
});

/**
 * Regression cover for the second 19 November 2026 clinical content pass.
 *
 * Sources were checked against their publishing records, so the app must not
 * drift back to the superseded figures or attributions:
 *   • NUTRIREA-3 — day-90 mortality and ICU-discharge readiness (not the
 *     withdrawn day-8 "72.9% vs 66.3%" claim).
 *   • IV lidocaine — Cochrane CD009642.pub3 uncertainty plus the separate
 *     ALLEGRO gut-function trial, not a LOLIPOP recovery result.
 *   • SOFA — the tool stays the original 1996 score and only links SOFA-2.
 */
import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync, statSync } from "fs";
import { resolve } from "path";
import { topicReferences } from "@/data/references";
import { isHeldPodcastAudio } from "@/lib/podcast-audit-holds";

const read = (path: string) => readFileSync(resolve(path), "utf8");
const ref = (topic: string, label: string) =>
  (topicReferences[topic] ?? []).find((r) => r.label === label);

const walk = (dir: string): string[] => {
  const out: string[] = [];
  for (const entry of readdirSync(resolve(dir))) {
    const path = resolve(dir, entry);
    if (statSync(path).isDirectory()) out.push(...walk(path));
    else out.push(path);
  }
  return out;
};

describe("NUTRIREA-3 source-level correction", () => {
  it("keeps the published day-90 mortality and ICU-discharge readiness", () => {
    const r = ref("icu-nutrition", "NUTRIREA-3 2023");
    expect(r).toBeTruthy();
    expect(r!.citation).toContain("Lancet Respir Med. 2023;11(7):602-612");
    expect(r!.citation).toContain("36958363");
    expect(r!.excerpt).toContain("41.3%");
    expect(r!.excerpt).toContain("42.8%");
    expect(r!.excerpt).toContain("p=0.41");
    expect(r!.excerpt).toContain("8 days");
    expect(r!.excerpt).toContain("9 days");
    expect(r!.excerpt).toContain("p=0.015");
  });

  it("has removed the superseded day-8 answer from authored and generated content", () => {
    const roots = [
      "src/pages",
      "src/components",
      "src/data",
      "public/viva-deck",
      "data-build",
      "supabase/functions/kb-reindex",
      "supabase/functions/process-podcast-rerecord",
    ];
    const offenders = roots
      .flatMap((root) => walk(root))
      .filter((path) => /\.(tsx?|json|snap)$/.test(path))
      .filter((path) => read(path).includes("72.9% vs 66.3%"));
    expect(offenders).toEqual([]);
  });
});

describe("IV lidocaine evidence", () => {
  it("keeps the Cochrane review's own uncertainty", () => {
    const r = ref("pain-medicine", "Weibel 2018");
    expect(r).toBeTruthy();
    expect(r!.citation).toContain("CD009642");
    expect(r!.excerpt ?? "").toContain("uncertain whether IV perioperative lidocaine");
  });

  it("attributes the 72-hour gut-function result to ALLEGRO, not LOLIPOP", () => {
    const allegro = ref("pain-medicine", "ALLEGRO 2025");
    expect(allegro).toBeTruthy();
    expect(allegro!.url).toBe("https://doi.org/10.1001/jama.2024.23898");
    expect(allegro!.citation).toContain("39602290");
    expect(allegro!.excerpt).toContain("57.3%");
    expect(allegro!.excerpt).toContain("59.0%");

    const topic = read("src/pages/topics/PainMedicineTopic.tsx");
    expect(topic).toContain("ALLEGRO 2025");
    expect(topic).not.toMatch(/LOLIPOP[^\n]*quality of recovery/);
    expect(topic).not.toMatch(/LOLIPOP[^\n]*no significant benefit/);
  });
});

describe("scoring tool versioning", () => {
  it("labels the original SOFA and links SOFA-2 without changing Sepsis-3", () => {
    const calculator = read("src/components/diagrams/intensive-care/SepsisScoreCalculator.tsx");
    expect(calculator).toContain('name="SOFA (original 1996)"');
    expect(calculator).toContain("https://doi.org/10.1001/jama.2025.20516");
    expect(calculator).toContain("SOFA-2 does not itself redefine Sepsis-3");

    const sofa2 = ref("sepsis", "SOFA-2 2025");
    expect(sofa2).toBeTruthy();
    expect(sofa2!.url).toBe("https://doi.org/10.1001/jama.2025.20516");
  });
});

describe("pain-medicine recording hold", () => {
  it("holds the original pain-medicine audio file", () => {
    expect(isHeldPodcastAudio("https://project.supabase.co/storage/v1/object/public/podcasts/pain-medicine.mp3")).toBe(true);
  });
});

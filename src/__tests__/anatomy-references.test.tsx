import { describe, it, expect, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { readFileSync } from "node:fs";
import { anatomyTopics } from "@/data/curriculum";
import { anatomyReferences, anatomyDirectoryReview, anatomyReferenceLabel } from "@/data/anatomyReferences";
import { topicReferences } from "@/data/references";
import DiagramSources from "@/pages/DiagramSources";

vi.mock("@/components/layout/SectionLayout", () => ({ SectionLayout: ({ children }: { children: React.ReactNode }) => <main>{children}</main> }));

describe("Curated anatomy references", () => {
  it("covers every anatomy topic using its original editorial list unchanged", () => {
    expect(anatomyReferences.map(t => t.id)).toEqual(anatomyTopics.map(t => t.id));
    for (const topic of anatomyReferences) {
      expect(topic.references).toBe(topicReferences[topic.id]);
      expect(topic.references.length).toBeGreaterThan(0);
      expect(topic.reviewNote).toContain("requires editorial review");
      for (const diagram of topic.diagrams) expect(diagram.topicLinks.some(l => l.path === topic.path)).toBe(true);
    }
  });
  it("shows topic citations separately from artwork provenance", () => {
    render(<HelmetProvider><MemoryRouter><DiagramSources /></MemoryRouter></HelmetProvider>);
    expect(screen.getByRole("heading", { name: "Curated references by anatomy topic" })).toBeTruthy();
    expect(document.querySelectorAll("[data-anatomy-bibliography]")).toHaveLength(anatomyTopics.length);
    expect(screen.getByText(/No nightly AI pass/)).toBeTruthy();
    expect(screen.getAllByText("Reference-page record review complete; full anatomical claim-to-source matching still requires editorial review. Legacy records marked unverified are not source support.")).toHaveLength(anatomyTopics.length);
    expect(screen.getByText(/Reference-page review complete ·/)).toBeTruthy();
    cleanup();
  });
  it("does not schedule AI reviews or require gateway credentials", () => {
    const workflow = readFileSync(".github/workflows/anatomy-references.yml", "utf8");
    const checker = readFileSync("scripts/check-anatomy-references.ts", "utf8");
    expect(workflow).not.toMatch(/schedule:|cron:|LOVABLE_API_KEY|--model/);
    expect(checker).not.toMatch(/fetch\(|ai.gateway|LOVABLE_API_KEY/);
    expect(checker).toContain("accuracyCertified: false");
  });
  it("separates completed page review from unresolved sources and removes false quotations", () => {
    expect(anatomyDirectoryReview.status).toBe("complete");
    expect(anatomyDirectoryReview.scope).toContain("not certified");
    for (const topic of anatomyReferences) {
      for (const ref of topic.references.filter(r => r.citation.startsWith("Unverified legacy reference"))) {
        expect(ref.url).toBeUndefined();
        expect(ref.excerpt).toBeUndefined();
        expect(ref.reviewNote).toContain("replacement source is required");
      }
    }
    for (const [id, label] of [["neuroanatomy", "Crit Care 2020 Brainstem"], ["neuroanatomy", "BJA Educ 2016 ANS"], ["thoracic-anatomy", "BJA Educ 2015 Thoracic Duct"]]) {
      expect(topicReferences[id].find(r => r.label === label)?.excerpt).toBeUndefined();
    }
    expect(anatomyReferenceLabel("upper-limb-anatomy", "NICE CG49")).toBe("NICE TA49");
    expect(topicReferences["lower-limb-anatomy"].find(r => r.label === "Can J Anaesth 2007 Lower Limb Blocks")?.citation).toContain("Tran DQ");
  });
});
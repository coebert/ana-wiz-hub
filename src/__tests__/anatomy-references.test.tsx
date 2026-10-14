import { describe, it, expect, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { readFileSync } from "node:fs";
import { anatomyTopics } from "@/data/curriculum";
import { anatomyReferences } from "@/data/anatomyReferences";
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
    expect(screen.getAllByText("Curated sources recorded; full claim-to-source matching still requires editorial review.")).toHaveLength(anatomyTopics.length);
    cleanup();
  });
  it("does not schedule AI reviews or require gateway credentials", () => {
    const workflow = readFileSync(".github/workflows/anatomy-references.yml", "utf8");
    const checker = readFileSync("scripts/check-anatomy-references.ts", "utf8");
    expect(workflow).not.toMatch(/schedule:|cron:|LOVABLE_API_KEY|--model/);
    expect(checker).not.toMatch(/fetch\(|ai.gateway|LOVABLE_API_KEY/);
    expect(checker).toContain("accuracyCertified: false");
  });
});
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { RelatedCases } from "@/components/topic/RelatedCases";
import { caseBankBySlug } from "@/data/cases";
import { allTopics } from "@/data/curriculum";

const routes = [
  { id: "icu-teaching-supervised-handover", topic: "non-technical-skills" },
  { id: "icu-quality-improvement-handover", topic: "icu-discharge-planning" },
];

describe("Professional practice cases", () => {
  it.each(routes)("links the $topic lesson to its case and its sources", ({ id, topic }) => {
    const bank = caseBankBySlug("intensive-care")!;
    const matches = bank.cases.filter(item => item.id === id);
    expect(matches).toHaveLength(1);
    const [item] = matches;
    expect(bank.categories).toContain(item.category);
    expect(item.stages).toHaveLength(3);
    expect(item.sourceLinks.some(source => new URL(source.href).hostname.endsWith("rcoa.ac.uk"))).toBe(true);
    expect(item.sourceLinks.some(source => new URL(source.href).hostname.endsWith("ficm.ac.uk"))).toBe(true);
    for (const topicId of item.topicIds) expect(allTopics.some(t => t.available && t.id === topicId)).toBe(true);
    render(<MemoryRouter><RelatedCases topicId={topic} /></MemoryRouter>);
    const card = screen.getByRole("heading", { name: item.title }).closest("article")!;
    expect(within(card).getByRole("link", { name: /open full scenario/i })).toHaveAttribute("href", bank.path + "#" + id);
  });
});

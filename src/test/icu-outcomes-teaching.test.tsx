import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { topicReferences } from "@/data/references";
import * as lessons from "@/components/topic/IcuOutcomesTeaching";

vi.mock("@/components/references/InlineRef", () => ({
  InlineRef: ({ topicId, refLabel }: { topicId: string; refLabel: string }) => {
    const ref = topicReferences[topicId]?.find((item) => item.label === refLabel);
    expect(ref?.url).toMatch(/^https:\/\//);
    expect(ref?.excerpt).toBeTruthy();
    return <sup data-testid="verified-source">{refLabel}</sup>;
  },
}));
afterEach(cleanup);

describe("ICU outcomes evidence", () => {
  it.each(Object.entries(lessons))("renders %s with sources and a learning check", (_name, Component) => {
    render(<MemoryRouter><Component /></MemoryRouter>);
    expect(screen.getAllByTestId("verified-source").length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Learning check:/).length).toBeGreaterThan(0);
  });

  it("does not calculate ward mortality by subtracting audit percentages", () => {
    render(<MemoryRouter><lessons.OutcomesIcnarcTeaching /></MemoryRouter>);
    expect(screen.queryByText(/about 3.5% of admissions died on the ward/)).not.toBeInTheDocument();
    expect(screen.getByText("Denominator caution:")).toBeInTheDocument();
  });

  it("keeps new source excerpts short and uniquely labelled", () => {
    const refs = topicReferences["icu-outcomes"] ?? [];
    expect(new Set(refs.map((ref) => ref.label)).size).toBe(refs.length);
    for (const ref of refs.filter((ref) => /Kamdar|Parker|Rabiee|Nikayin|Pandharipande|Hatch|2025|2026/.test(ref.label))) {
      expect(ref.excerpt?.length).toBeGreaterThan(30);
      expect(ref.excerpt?.length).toBeLessThanOrEqual(600);
    }
  });
});
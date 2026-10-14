import { render, screen, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { topicReferences } from "@/data/references";
import { LaryngectomyEmergencyTeaching } from "@/components/topic/LaryngectomyEmergencyTeaching";
import { PaediatricFluidTeaching } from "@/components/topic/PaediatricFluidTeaching";
import { PaediatricURTITeaching } from "@/components/topic/PaediatricURTITeaching";
import { RenalTransplantTeaching } from "@/components/topic/RenalTransplantTeaching";
import { ColorectalAssessmentTeaching } from "@/components/topic/ColorectalAssessmentTeaching";
import { APResectionTeaching } from "@/components/topic/APResectionTeaching";

vi.mock("@/components/references/InlineRef", () => ({
  InlineRef: ({ topicId, refLabel }: { topicId: string; refLabel: string }) => {
    expect(topicReferences[topicId]?.find((r) => r.label === refLabel)?.url).toMatch(/^https:\/\//);
    return <sup data-testid="source">{refLabel}</sup>;
  },
}));
afterEach(cleanup);

describe("Source-led clinical depth", () => {
  it.each([
    [LaryngectomyEmergencyTeaching, "After oxygenation is restored"],
    [PaediatricFluidTeaching, "Maintenance: daily formula versus the hourly shortcut"],
    [PaediatricURTITeaching, "Recovery and evidence limitations"],
    [RenalTransplantTeaching, "Postoperative review: a first-day framework, not a fixed testing schedule"],
    [ColorectalAssessmentTeaching, "Complete a practical handover plan"],
    [APResectionTeaching, "Why presacral bleeding can become torrential"],
  ])("renders detailed, linked teaching %s", (Component, heading) => {
    render(<Component />);
    expect(screen.getByRole("heading", { name: heading })).toBeInTheDocument();
    expect(screen.getAllByTestId("source").length).toBeGreaterThan(2);
  });

  it("preserves the NTSP failed-catheter cuff-deflation step before tube removal", () => {
    render(<LaryngectomyEmergencyTeaching />);
    expect(screen.getByText(/If the catheter will not pass, deflate a cuff if present/)).toBeInTheDocument();
    expect(screen.getByText(/Leave the TEP prosthesis in situ/)).toBeInTheDocument();
  });
  it("keeps fluid and timing cautions explicit", () => {
    render(<PaediatricFluidTeaching />);
    expect(screen.getByText(/66.7 mL\/hour/)).toBeInTheDocument();
    cleanup();
    render(<PaediatricURTITeaching />);
    expect(screen.getByText(/No universal symptom-free waiting period/)).toBeInTheDocument();
  });
  it("limits all newly verified NICE excerpts to 600 characters", () => {
    for (const ref of topicReferences["paediatric-anaesthesia"].filter((r) => r.label.startsWith("NICE NG29 "))) {
      expect(ref.excerpt?.length).toBeGreaterThan(30);
      expect(ref.excerpt?.length).toBeLessThanOrEqual(600);
    }
  });
});
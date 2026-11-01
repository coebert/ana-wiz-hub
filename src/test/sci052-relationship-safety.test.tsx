import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Brachial from "@/components/diagrams/anatomy/BrachialPlexusUltrasoundDiagram";
import { topicReferences } from "@/data/references";

afterEach(cleanup);

describe("SCI052 limited conceptual relationship anatomy, not procedural validation", () => {
  it("keeps individual anatomy and procedural limits distinct at each selected level", () => {
    const { container } = render(<MemoryRouter><Brachial /></MemoryRouter>);
    const expectations = [
      ["Interscalene", "between anterior and middle scalene muscles, deep to sternocleidomastoid", "Not every root"],
      ["Supraclavicular", "usually lateral and posterior to the subclavian artery", "not a scan plane"],
      ["Infraclavicular", "Pectoralis major is superficial to pectoralis minor", "not a costoclavicular scan plane"],
      ["Axillary", "between biceps and coracobrachialis", "not an anatomical axis"],
    ];
    for (const [level, relation, limitation] of expectations) {
      fireEvent.click(screen.getByRole("button", { name: level }));
      const img = screen.getByRole("img");
      expect(img.getAttribute("alt")).toContain(relation);
      expect(container.textContent?.toLowerCase()).toContain(limitation.toLowerCase());
      expect(container.textContent).toContain("The entire needle shaft and tip must avoid nerves and vessels");
      expect(container.textContent).toContain("The original sonogram and procedural atlas remain withheld");
      expect(container.textContent).not.toMatch(/(?:9, 6, and 3|~12|~2|~6) o'clock/);
      expect(screen.queryByRole("button", { name: /^(Needle|Spread)$/ })).toBeNull();
    }
  });
  it("resolves anatomical sources without treating filename date or abstracts as certification", () => {
    for (const id of ["brachial-plexus", "upper-limb-anatomy"]) {
      const refs = topicReferences[id];
      for (const label of ["RAUK Plan A upper limb", "Royse plexus variation", "Sandhu infraclavicular anatomy", "Di Filippo cord variation"]) {
        const matches = refs.filter(ref => ref.label === label);
        expect(matches).toHaveLength(1);
        expect(matches[0]?.url).toMatch(/^https:\/\//);
      }
      const spa = refs.find(ref => ref.label === "SPA supraclavicular guide");
      expect(spa?.citation).toContain("created 2022; accessed 1 November 2026");
      expect(spa?.reviewNote).toContain("Last revised N/A");
    }
  });
});
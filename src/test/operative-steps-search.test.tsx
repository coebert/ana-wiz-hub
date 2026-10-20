import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useRef } from "react";
import { OperationsSearchBar } from "@/pages/topics/OperativeStepsTopic";
import { operations, searchOperations } from "@/data/operativeSteps";

afterEach(cleanup);

function Harness({ onQuery = vi.fn(), onSpecialty = vi.fn(), onEnter = vi.fn(), query = "", resultCount = 1 }: {
  onQuery?: (v: string) => void;
  onSpecialty?: (v: never) => void;
  onEnter?: () => void;
  query?: string;
  resultCount?: number;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <OperationsSearchBar
      query={query}
      specialty="All"
      resultCount={resultCount}
      sticky={false}
      onQuery={onQuery}
      onSpecialty={onSpecialty}
      onEnter={onEnter}
      inputRef={inputRef}
    />
  );
}

describe("Operations library search bar", () => {
  it("looks up a specific operation by its plain name", () => {
    const ids = searchOperations("carotid endarterectomy", "All").map((o) => o.id);
    expect(ids).toContain("carotid-endarterectomy");
    expect(searchOperations("cross-clamp", "All").map((o) => o.id)).toContain("open-aaa-repair");
  });

  it("offers a labelled search field that reports what is typed into it", () => {
    const onQuery = vi.fn();
    render(<Harness onQuery={onQuery} />);
    const box = screen.getByRole("textbox", { name: "Search operations" });
    expect(screen.getByText("Search the operations library")).toBeInTheDocument();
    fireEvent.change(box, { target: { value: "Whipple" } });
    expect(onQuery).toHaveBeenCalledWith("Whipple");
  });

  it("shows how many operations match the current search", () => {
    render(<Harness query="carotid" resultCount={3} />);
    expect(screen.getByText(`3 of ${operations.length} operations shown for "carotid"`)).toBeInTheDocument();
  });

  it("opens the first match on Enter and clears the box on request", () => {
    const onEnter = vi.fn();
    const onQuery = vi.fn();
    render(<Harness query="whipple" onEnter={onEnter} onQuery={onQuery} resultCount={1} />);
    fireEvent.keyDown(screen.getByRole("textbox", { name: "Search operations" }), { key: "Enter" });
    expect(onEnter).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByRole("button", { name: "Clear search" }));
    expect(onQuery).toHaveBeenCalledWith("");
  });

  it("filters by specialty from the same bar", () => {
    const onSpecialty = vi.fn();
    render(<Harness onSpecialty={onSpecialty} />);
    fireEvent.click(screen.getByRole("button", { name: /^Vascular/ }));
    expect(onSpecialty).toHaveBeenCalledWith("Vascular");
  });
});

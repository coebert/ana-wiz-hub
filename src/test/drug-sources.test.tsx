import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { safeSourceUrl, normaliseDrugSources } from "@/lib/drug-sources";
import { DrugSources } from "@/components/references/DrugSources";

describe("D30 source provenance", () => {
  it.each(["javascript:alert(1)", "data:text/html,x", "//evil.test", "https://user:secret@site.test", "https://a.test\n", "https://", "ftp://a.test", undefined])( "rejects unsafe link %s", input => {
    expect(safeSourceUrl(input)).toBeNull();
  });
  it("allows absolute HTTP and HTTPS without credentials", () => {
    expect(safeSourceUrl("https://www.medicines.org.uk/emc/product/6409/smpc")).toBe("https://www.medicines.org.uk/emc/product/6409/smpc");
    expect(safeSourceUrl("http://example.test/source")).toBe("http://example.test/source");
  });
  it.each([null, {}, [null, 2, {}, []]])("has no fabricated records for malformed input", input => {
    expect(normaliseDrugSources(input)).toEqual([]);
  });
  it("deduplicates URLs while retaining distinct claim provenance", () => {
    const first = { title: "Product", url: "https://example.test/smpc", section: "2", scope: "Composition" };
    const other = { ...first, section: "4.2", scope: "Adults only" };
    const sources = normaliseDrugSources([first, first, other]);
    expect(sources).toHaveLength(1);
    expect(sources[0].provenance).toEqual([first, other]);
    expect(normaliseDrugSources([first, { ...other, url: "https://example.test/smpc#4.2" }])).toHaveLength(2);
  });
  it("labels searches without promoting them to product labels", () => {
    const sources = normaliseDrugSources([{ title: "BNF monograph", url: "https://bnf.nice.org.uk/search/?q=x" }, { title: "Exact label", url: "https://www.medicines.org.uk/emc/product/6409/smpc" }]);
    expect(sources.map(s => s.search)).toEqual([false, true]);
    expect(sources[1].title).toBe("bnf.nice.org.uk — search tool");
  });
  it("renders accessible safe links, recorded scope and missing-link metadata", () => {
    render(<DrugSources sources={[{ title: "Exact product ".repeat(30), url: "https://example.test/label", publisher: "Manufacturer", scope: "Composition only", reviewNote: "Not dose certification", sections: ["2", "3"] }, { title: "Historical record", url: "javascript:alert(1)" }]} />);
    expect(screen.getByRole("region", { name: "References" })).toBeTruthy();
    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toBe("https://example.test/label");
    expect(link.getAttribute("rel")).toBe("noopener noreferrer");
    expect(screen.getByText("Scope: Composition only")).toBeTruthy();
    expect(screen.getByText("Sections: 2; 3")).toBeTruthy();
    expect(screen.getByText("Historical record — link unavailable")).toBeTruthy();
  });
});
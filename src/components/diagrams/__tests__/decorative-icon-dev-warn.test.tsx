/**
 * Dev-only runtime guard for <DecorativeIcon />.
 *
 * Validates that the assertion fires for non-Lucide-like inputs and
 * stays quiet for valid forwardRef icons / PascalCase function
 * components. The guard is no-op'd in production (NODE_ENV check).
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import * as React from "react";
import { render, cleanup } from "@testing-library/react";
import { AlertTriangle } from "lucide-react";

import { DecorativeIcon } from "@/components/diagrams/_shared/DecorativeIcon";

let warnSpy: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
});

afterEach(() => {
  warnSpy.mockRestore();
  cleanup();
});

describe("DecorativeIcon dev-only icon-shape guard", () => {
  it("does NOT warn for a real lucide-react icon (forwardRef)", () => {
    render(<DecorativeIcon icon={AlertTriangle} />);
    expect(warnSpy).not.toHaveBeenCalled();
  });

  it("does NOT warn for a PascalCase function SVG component", () => {
    const MyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
      <svg {...props} />
    );
    render(<DecorativeIcon icon={MyIcon as never} />);
    expect(warnSpy).not.toHaveBeenCalled();
  });

  it("warns once for a lowercase / non-PascalCase function", () => {
    const lowercase = (props: React.SVGProps<SVGSVGElement>) => (
      <svg {...props} />
    );
    Object.defineProperty(lowercase, "name", { value: "lowercase" });

    render(<DecorativeIcon icon={lowercase as never} />);
    render(<DecorativeIcon icon={lowercase as never} />); // second call → no extra warn

    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy.mock.calls[0][0]).toMatch(/Lucide-like icon component/);
  });

  it("warns when a string is passed", () => {
    // Bypass the compile-time guard intentionally.
    render(<DecorativeIcon icon={"div" as never} />);
    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy.mock.calls[0][0]).toMatch(/Received: string/);
  });

  it("warns when icon is null", () => {
    expect(() =>
      render(<DecorativeIcon icon={null as never} />),
    ).toThrow(); // React still throws when trying to render null as a tag
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringMatching(/null\/undefined/),
    );
  });
});

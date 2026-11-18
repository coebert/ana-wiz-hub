import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

const native = vi.hoisted(() => ({ value: false }));
vi.mock("@/lib/native-platform", () => ({ isNativeApp: () => native.value }));

import { AppStoreApps } from "@/components/landing/AppStoreApps";

const renderBand = () =>
  render(
    <MemoryRouter>
      <AppStoreApps />
    </MemoryRouter>,
  );

describe("homepage App Store band", () => {
  beforeEach(() => {
    native.value = false;
  });

  it("links AnaesthesiaCore to its exact UK App Store listing", () => {
    renderBand();
    const link = screen.getByRole("link", { name: /View on the App Store\s+for AnaesthesiaCore/ });
    expect(link.getAttribute("href")).toBe("https://apps.apple.com/gb/app/anaesthesiacore/id6829783342");
  });

  it("links Lung Sim Pro to its exact UK App Store listing", () => {
    renderBand();
    const link = screen.getByRole("link", { name: /View on the App Store\s+for Lung Sim Pro/ });
    expect(link.getAttribute("href")).toBe("https://apps.apple.com/gb/app/lung-sim-pro/id6829721030");
  });

  it("keeps a path to free web revision", () => {
    renderBand();
    expect(screen.getByRole("link", { name: /keep revising free on the web/i }).getAttribute("href")).toBe("/revise");
  });

  it("renders nothing inside the installed iOS app", () => {
    native.value = true;
    const { container } = renderBand();
    expect(container.querySelector("#app-store")).toBeNull();
  });
});

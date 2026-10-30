import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { cancelSupportScroll, scrollToSupport } from "./donation";

describe("DON01 support scroll cancellation", () => {
  let spy: ReturnType<typeof vi.fn>;
  beforeEach(() => {
    vi.useFakeTimers();
    window.history.replaceState(null, "", "/");
    spy = vi.fn();
    Element.prototype.scrollIntoView = spy as never;
    document.body.innerHTML = "";
  });
  afterEach(() => { cancelSupportScroll(); vi.useRealTimers(); });
  const mount = () => { const el = document.createElement("section"); el.id = "support"; document.body.appendChild(el); };

  it("user input before the section mounts cancels the job", () => {
    scrollToSupport();
    window.dispatchEvent(new Event("wheel"));
    mount();
    vi.advanceTimersByTime(3000);
    expect(spy).not.toHaveBeenCalled();
  });
  it("navigation away after a new click cancels the newer job (no stale pull-back)", () => {
    scrollToSupport();
    scrollToSupport(); // new click replaces job
    window.history.replaceState(null, "", "/topics");
    mount();
    vi.advanceTimersByTime(3000);
    expect(spy).not.toHaveBeenCalled();
  });
  it("route cleanup cancels the current job even after replacement", () => {
    mount();
    scrollToSupport();
    scrollToSupport();
    expect(spy).toHaveBeenCalledTimes(2);
    cancelSupportScroll();
    vi.advanceTimersByTime(3000);
    expect(spy).toHaveBeenCalledTimes(2);
  });
  it("uninterrupted job re-aligns at 600/1500 ms", () => {
    mount();
    scrollToSupport();
    vi.advanceTimersByTime(1600);
    expect(spy).toHaveBeenCalledTimes(3);
  });
});

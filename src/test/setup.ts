import "@testing-library/jest-dom";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = function () {};
}

// jsdom polyfills used by diagram components ---------------------------------

class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
if (typeof globalThis.ResizeObserver === "undefined") {
  // @ts-expect-error — assigning a minimal stub is enough for render-time checks
  globalThis.ResizeObserver = ResizeObserverStub;
}

class IntersectionObserverStub {
  root = null;
  rootMargin = "";
  thresholds: number[] = [];
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
if (typeof globalThis.IntersectionObserver === "undefined") {
  // @ts-expect-error — minimal stub for jsdom
  globalThis.IntersectionObserver = IntersectionObserverStub;
}

// SVGPathElement.getTotalLength is used by some animated cascades.
if (
  typeof SVGPathElement !== "undefined" &&
  !SVGPathElement.prototype.getTotalLength
) {
  SVGPathElement.prototype.getTotalLength = function () {
    return 0;
  };
  SVGPathElement.prototype.getPointAtLength = function () {
    return { x: 0, y: 0 } as DOMPoint;
  };
}

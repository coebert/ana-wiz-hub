/**
 * Lightweight heuristic device tier detector for 3D scenes.
 *
 * Tiers:
 *   - "high"   — desktop GPU, plenty of cores, high DPR; render full LOD
 *   - "medium" — modern laptops / iPads / mid-range phones
 *   - "low"    — older mobiles, low core count, software/integrated GPU
 *
 * The heuristic is intentionally cheap and runs once. It combines:
 *   - hardwareConcurrency
 *   - deviceMemory (when available)
 *   - touch + small viewport (mobile signal)
 *   - WebGL renderer string via UNMASKED_RENDERER_WEBGL when exposed
 */

export type DeviceTier = "low" | "medium" | "high";

let cached: DeviceTier | null = null;

function readGpuRenderer(): string {
  try {
    const canvas = document.createElement("canvas");
    const gl = (canvas.getContext("webgl2") ||
      canvas.getContext("webgl")) as WebGLRenderingContext | null;
    if (!gl) return "";
    const dbg = gl.getExtension("WEBGL_debug_renderer_info");
    if (!dbg) return "";
    return String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) ?? "");
  } catch {
    return "";
  }
}

export function detectDeviceTier(): DeviceTier {
  if (cached) return cached;
  if (typeof window === "undefined") return (cached = "medium");

  const cores = navigator.hardwareConcurrency ?? 4;
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  const touch = (navigator.maxTouchPoints ?? 0) > 0;
  const small = Math.min(window.innerWidth, window.innerHeight) < 700;
  const dpr = window.devicePixelRatio ?? 1;
  const renderer = readGpuRenderer().toLowerCase();

  const weakGpu =
    /(adreno [3-5]\d{2}|mali-[gt][1-6]\d|powervr|swiftshader|llvmpipe|intel.*hd graphics [2-5]\d{3})/i.test(
      renderer,
    );
  const strongGpu = /(rtx|radeon rx|apple m\d|adreno [78]\d{2}|mali-g[78]\d)/i.test(renderer);

  if (weakGpu || cores <= 2 || mem <= 2 || (touch && small && dpr < 2)) {
    return (cached = "low");
  }
  if (strongGpu && cores >= 8 && mem >= 8 && !touch) {
    return (cached = "high");
  }
  return (cached = "medium");
}

/** Stable hook wrapper; tier never changes within a session. */
import { useState } from "react";
export function useDeviceTier(): DeviceTier {
  const [tier] = useState<DeviceTier>(() => detectDeviceTier());
  return tier;
}

import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Pause, Play, RotateCcw } from "lucide-react";
import { DiagramFigure } from "./_shared/DiagramFigure";

/**
 * Interactive walkthrough of the Radon transform and filtered back-projection.
 *
 * The user controls the number of projection angles (1 → 180) over a half-turn.
 * Three synchronised canvases show:
 *   1. Phantom + a highlighted projection angle.
 *   2. Sinogram (θ on y, detector position s on x) building column-by-column.
 *   3. Two reconstructions side-by-side: unfiltered back-projection (blurry,
 *      1/r star artefact) and ramp-filtered back-projection (crisp).
 *
 * All maths is computed in TypeScript and rasterised onto <canvas>. No external
 * libraries — keeps the component self-contained and SSR-safe.
 */

const N = 96; // image / recon resolution
const N_DET = 128; // detector channels per projection
const MAX_ANGLES = 180;

// ─── Phantom: simplified Shepp-Logan-like ellipses ────────────────────────
type Ellipse = { x: number; y: number; a: number; b: number; theta: number; rho: number };
const PHANTOM: Ellipse[] = [
  { x: 0, y: 0, a: 0.69, b: 0.92, theta: 0, rho: 1.0 }, // skull
  { x: 0, y: -0.0184, a: 0.6624, b: 0.874, theta: 0, rho: -0.6 }, // brain
  { x: 0.22, y: 0, a: 0.11, b: 0.31, theta: -0.3, rho: -0.2 },
  { x: -0.22, y: 0, a: 0.16, b: 0.41, theta: 0.3, rho: -0.2 },
  { x: 0, y: 0.35, a: 0.21, b: 0.25, theta: 0, rho: 0.15 },
  { x: 0, y: 0.1, a: 0.046, b: 0.046, theta: 0, rho: 0.25 },
  { x: -0.08, y: -0.605, a: 0.046, b: 0.023, theta: 0, rho: 0.15 },
  { x: 0, y: -0.605, a: 0.023, b: 0.023, theta: 0, rho: 0.15 },
];

const buildPhantom = (): Float32Array => {
  const img = new Float32Array(N * N);
  for (let j = 0; j < N; j++) {
    const y = (j - N / 2 + 0.5) / (N / 2);
    for (let i = 0; i < N; i++) {
      const x = (i - N / 2 + 0.5) / (N / 2);
      let v = 0;
      for (const e of PHANTOM) {
        const dx = x - e.x;
        const dy = y - e.y;
        const ct = Math.cos(e.theta);
        const st = Math.sin(e.theta);
        const xr = dx * ct + dy * st;
        const yr = -dx * st + dy * ct;
        if ((xr * xr) / (e.a * e.a) + (yr * yr) / (e.b * e.b) <= 1) v += e.rho;
      }
      img[j * N + i] = v;
    }
  }
  return img;
};

// ─── Forward Radon transform (parallel beam, per angle) ───────────────────
const projectAngle = (img: Float32Array, theta: number): Float32Array => {
  // For each detector position s, integrate along the perpendicular line.
  const proj = new Float32Array(N_DET);
  const ct = Math.cos(theta);
  const st = Math.sin(theta);
  const samples = N; // step count along the ray
  for (let d = 0; d < N_DET; d++) {
    const s = (d - N_DET / 2 + 0.5) / (N_DET / 2); // [-1, 1]
    let sum = 0;
    for (let k = 0; k < samples; k++) {
      const t = (k - samples / 2 + 0.5) / (samples / 2);
      // (x, y) = s * (cosθ, sinθ) + t * (-sinθ, cosθ)
      const x = s * ct - t * st;
      const y = s * st + t * ct;
      // map to image indices
      const ix = Math.round((x + 1) * (N / 2) - 0.5);
      const iy = Math.round((y + 1) * (N / 2) - 0.5);
      if (ix >= 0 && ix < N && iy >= 0 && iy < N) sum += img[iy * N + ix];
    }
    proj[d] = (sum / samples) * 2; // path length normalisation
  }
  return proj;
};

// ─── Ramp filter via FFT-free direct convolution (Ram-Lak in spatial form) ─
const buildRamLak = (n: number): Float32Array => {
  // Discrete Ram-Lak filter: h[0]=1/4, h[odd]= -1/(π² k²), h[even≠0]=0
  const h = new Float32Array(2 * n + 1);
  for (let k = -n; k <= n; k++) {
    if (k === 0) h[k + n] = 0.25;
    else if (k & 1) h[k + n] = -1 / (Math.PI * Math.PI * k * k);
    else h[k + n] = 0;
  }
  return h;
};

const filterProjection = (proj: Float32Array, h: Float32Array, half: number): Float32Array => {
  const out = new Float32Array(proj.length);
  for (let d = 0; d < proj.length; d++) {
    let s = 0;
    for (let k = -half; k <= half; k++) {
      const dd = d + k;
      if (dd >= 0 && dd < proj.length) s += proj[dd] * h[k + half];
    }
    out[d] = s;
  }
  return out;
};

// ─── Back-project a single projection across an image ──────────────────────
const backProjectInto = (
  acc: Float32Array,
  proj: Float32Array,
  theta: number,
  weight: number
) => {
  const ct = Math.cos(theta);
  const st = Math.sin(theta);
  for (let j = 0; j < N; j++) {
    const y = (j - N / 2 + 0.5) / (N / 2);
    for (let i = 0; i < N; i++) {
      const x = (i - N / 2 + 0.5) / (N / 2);
      const s = x * ct + y * st; // [-1, 1]
      const d = s * (N_DET / 2) + N_DET / 2 - 0.5;
      const di = Math.floor(d);
      const fr = d - di;
      if (di >= 0 && di + 1 < N_DET) {
        acc[j * N + i] += weight * (proj[di] * (1 - fr) + proj[di + 1] * fr);
      }
    }
  }
};

// ─── Render a Float32Array as greyscale onto a canvas ──────────────────────
const drawImage = (
  ctx: CanvasRenderingContext2D,
  data: Float32Array,
  w: number,
  h: number,
  vmin: number,
  vmax: number
) => {
  const id = ctx.createImageData(w, h);
  const range = vmax - vmin || 1;
  for (let p = 0; p < w * h; p++) {
    const v = Math.max(0, Math.min(1, (data[p] - vmin) / range));
    const g = Math.round(v * 255);
    id.data[p * 4 + 0] = g;
    id.data[p * 4 + 1] = g;
    id.data[p * 4 + 2] = g;
    id.data[p * 4 + 3] = 255;
  }
  ctx.putImageData(id, 0, 0);
};

const _drawSinogram = (
  ctx: CanvasRenderingContext2D,
  sino: Float32Array, // shape [MAX_ANGLES * N_DET]
  filledRows: number
) => {
  const w = N_DET;
  const h = MAX_ANGLES;
  const id = ctx.createImageData(w, h);
  // dynamic range over filled rows
  let vmin = Infinity;
  let vmax = -Infinity;
  for (let p = 0; p < filledRows * w; p++) {
    const v = sino[p];
    if (v < vmin) vmin = v;
    if (v > vmax) vmax = v;
  }
  if (!isFinite(vmin)) {
    vmin = 0;
    vmax = 1;
  }
  const range = vmax - vmin || 1;
  for (let r = 0; r < h; r++) {
    for (let c = 0; c < w; c++) {
      const idx = (r * w + c) * 4;
      if (r < filledRows) {
        const v = (sino[r * w + c] - vmin) / range;
        // teal colour-map for sinogram so it's distinguishable from image panels
        id.data[idx + 0] = Math.round(20 + v * 30);
        id.data[idx + 1] = Math.round(60 + v * 180);
        id.data[idx + 2] = Math.round(100 + v * 155);
        id.data[idx + 3] = 255;
      } else {
        id.data[idx + 0] = 30;
        id.data[idx + 1] = 30;
        id.data[idx + 2] = 35;
        id.data[idx + 3] = 255;
      }
    }
  }
  ctx.putImageData(id, 0, 0);
};

export const SinogramFBPWalkthrough = () => {
  const phantomCanvas = useRef<HTMLCanvasElement>(null);
  const sinoCanvas = useRef<HTMLCanvasElement>(null);
  const bpCanvas = useRef<HTMLCanvasElement>(null);
  const fbpCanvas = useRef<HTMLCanvasElement>(null);

  const [nAngles, setNAngles] = useState(8);
  const [playing, setPlaying] = useState(false);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number | null>(null);

  // ─── Pre-compute phantom, all projections, filtered projections ───────────
  const { phantom, sinogram, filtered, vminP, vmaxP } = useMemo(() => {
    const ph = buildPhantom();
    let vminP = Infinity;
    let vmaxP = -Infinity;
    for (let i = 0; i < ph.length; i++) {
      if (ph[i] < vminP) vminP = ph[i];
      if (ph[i] > vmaxP) vmaxP = ph[i];
    }
    const sino = new Float32Array(MAX_ANGLES * N_DET);
    const filt = new Float32Array(MAX_ANGLES * N_DET);
    const half = 32;
    const h = buildRamLak(half);
    for (let a = 0; a < MAX_ANGLES; a++) {
      const theta = (a / MAX_ANGLES) * Math.PI;
      const p = projectAngle(ph, theta);
      sino.set(p, a * N_DET);
      const fp = filterProjection(p, h, half);
      filt.set(fp, a * N_DET);
    }
    return { phantom: ph, sinogram: sino, filtered: filt, vminP, vmaxP };
  }, []);

  // ─── Reconstructions for the current nAngles (sub-sampled across [0, π)) ──
  const { bp, fbp, vminBP, vmaxBP, vminFBP, vmaxFBP, sinoFilledRows: _sinoFilledRows } = useMemo(() => {
    const bp = new Float32Array(N * N);
    const fbp = new Float32Array(N * N);
    if (nAngles > 0) {
      const w = Math.PI / nAngles;
      for (let k = 0; k < nAngles; k++) {
        const a = Math.round((k / nAngles) * MAX_ANGLES);
        const theta = (a / MAX_ANGLES) * Math.PI;
        const proj = sinogram.subarray(a * N_DET, (a + 1) * N_DET);
        const fproj = filtered.subarray(a * N_DET, (a + 1) * N_DET);
        backProjectInto(bp, proj, theta, w);
        backProjectInto(fbp, fproj, theta, w);
      }
    }
    let vminBP = Infinity;
    let vmaxBP = -Infinity;
    let vminFBP = Infinity;
    let vmaxFBP = -Infinity;
    for (let i = 0; i < bp.length; i++) {
      if (bp[i] < vminBP) vminBP = bp[i];
      if (bp[i] > vmaxBP) vmaxBP = bp[i];
      if (fbp[i] < vminFBP) vminFBP = fbp[i];
      if (fbp[i] > vmaxFBP) vmaxFBP = fbp[i];
    }
    // Map sinogram fill: show rows up to the highest sampled angle
    const sinoFilledRows = nAngles === 0 ? 0 : Math.min(MAX_ANGLES, Math.round((nAngles / nAngles) * MAX_ANGLES));
    // We instead want to show only the angles we've actually used. Build a mask.
    return { bp, fbp, vminBP, vmaxBP, vminFBP, vmaxFBP, sinoFilledRows };
  }, [nAngles, sinogram, filtered]);

  // Build a per-row mask of which sinogram rows are "used"
  const sinoMasked = useMemo(() => {
    const out = new Float32Array(MAX_ANGLES * N_DET);
    if (nAngles === 0) return out;
    const used = new Set<number>();
    for (let k = 0; k < nAngles; k++) {
      used.add(Math.round((k / nAngles) * MAX_ANGLES));
    }
    for (let r = 0; r < MAX_ANGLES; r++) {
      if (used.has(r)) {
        for (let c = 0; c < N_DET; c++) out[r * N_DET + c] = sinogram[r * N_DET + c];
      }
    }
    return out;
  }, [nAngles, sinogram]);

  // ─── Draw all canvases when reconstruction changes ────────────────────────
  useEffect(() => {
    const phc = phantomCanvas.current?.getContext("2d");
    if (phc) drawImage(phc, phantom, N, N, vminP, vmaxP);

    const sc = sinoCanvas.current?.getContext("2d");
    if (sc) {
      // Render the masked sinogram (only used rows are coloured)
      const id = sc.createImageData(N_DET, MAX_ANGLES);
      // dynamic range of FULL sinogram
      let vmin = Infinity;
      let vmax = -Infinity;
      for (let i = 0; i < sinogram.length; i++) {
        if (sinogram[i] < vmin) vmin = sinogram[i];
        if (sinogram[i] > vmax) vmax = sinogram[i];
      }
      const range = vmax - vmin || 1;
      const used = new Set<number>();
      for (let k = 0; k < nAngles; k++) used.add(Math.round((k / nAngles) * MAX_ANGLES));
      for (let r = 0; r < MAX_ANGLES; r++) {
        const isUsed = used.has(r);
        for (let c = 0; c < N_DET; c++) {
          const idx = (r * N_DET + c) * 4;
          if (isUsed) {
            const v = (sinogram[r * N_DET + c] - vmin) / range;
            id.data[idx + 0] = Math.round(20 + v * 30);
            id.data[idx + 1] = Math.round(60 + v * 180);
            id.data[idx + 2] = Math.round(100 + v * 155);
            id.data[idx + 3] = 255;
          } else {
            id.data[idx + 0] = 28;
            id.data[idx + 1] = 28;
            id.data[idx + 2] = 32;
            id.data[idx + 3] = 255;
          }
        }
      }
      sc.putImageData(id, 0, 0);
      // Highlight the most-recent angle as a yellow row
      if (nAngles > 0) {
        const lastAngleRow = Math.round(((nAngles - 1) / nAngles) * MAX_ANGLES);
        sc.fillStyle = "rgba(245, 200, 60, 0.55)";
        sc.fillRect(0, lastAngleRow, N_DET, 1);
      }
    }

    const bc = bpCanvas.current?.getContext("2d");
    if (bc) drawImage(bc, bp, N, N, vminBP, vmaxBP);

    const fc = fbpCanvas.current?.getContext("2d");
    if (fc) drawImage(fc, fbp, N, N, vminFBP, vmaxFBP);
  }, [phantom, vminP, vmaxP, sinogram, sinoMasked, bp, fbp, vminBP, vmaxBP, vminFBP, vmaxFBP, nAngles]);

  // ─── Auto-play: ramp nAngles 1 → 180 ──────────────────────────────────────
  useEffect(() => {
    if (!playing) {
      lastRef.current = null;
      return;
    }
    const tick = (ts: number) => {
      if (lastRef.current == null) lastRef.current = ts;
      const dt = (ts - lastRef.current) / 1000;
      lastRef.current = ts;
      setNAngles((prev) => {
        const next = prev + dt * 28; // ~6.5s for full sweep
        if (next >= MAX_ANGLES) {
          setPlaying(false);
          return MAX_ANGLES;
        }
        return next;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [playing]);

  const nAnglesInt = Math.max(1, Math.round(nAngles));
  const angularCoverage = ((nAnglesInt / MAX_ANGLES) * 180).toFixed(0);

  // ─── Phantom overlay: highlight current projection direction ──────────────
  const lastTheta = nAnglesInt > 0 ? ((nAnglesInt - 1) / nAnglesInt) * Math.PI : 0;
  const overlayCx = 50;
  const overlayCy = 50;
  const overlayR = 48;
  const dirX = Math.cos(lastTheta + Math.PI / 2);
  const dirY = Math.sin(lastTheta + Math.PI / 2);
  const tubeX = overlayCx - overlayR * Math.cos(lastTheta);
  const tubeY = overlayCy - overlayR * Math.sin(lastTheta);
  const detX = overlayCx + overlayR * Math.cos(lastTheta);
  const detY = overlayCy + overlayR * Math.sin(lastTheta);

  return (
    <DiagramFigure
      id="sinogram-fbp-walkthrough"
      title="Sinogram FBP walkthrough"
      description="Auto-generated wrapper for the Sinogram FBP walkthrough anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
                  <div className="my-6 rounded-xl border border-border bg-muted/30 p-4 space-y-4">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <h3 className="text-lg font-serif font-bold text-foreground leading-tight">
              Sinogram &amp; filtered back-projection — interactive walkthrough
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Sweep the number of projection angles (1 → {MAX_ANGLES}) over a half-turn and watch the sinogram fill,
              the unfiltered back-projection blur, and the ramp-filtered reconstruction sharpen.
            </p>
          </div>
          <div className="flex gap-1.5">
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => {
                if (nAngles >= MAX_ANGLES) setNAngles(1);
                setPlaying((p) => !p);
              }}
              className="h-7 px-2 text-xs"
            >
              {playing ? <Pause className="w-3 h-3 mr-1" /> : <Play className="w-3 h-3 mr-1" />}
              {playing ? "Pause" : "Play"}
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => {
                setPlaying(false);
                setNAngles(1);
              }}
              className="h-7 px-2 text-xs"
            >
              <RotateCcw className="w-3 h-3" />
            </Button>
          </div>
        </div>
  
        {/* Slider */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Projection angles</span>
            <span className="tabular-nums font-medium text-foreground">
              {nAnglesInt} <span className="text-muted-foreground">/ {MAX_ANGLES}</span>
              <span className="text-muted-foreground ml-2">({angularCoverage}° coverage)</span>
            </span>
          </div>
          <Slider
            value={[nAnglesInt]}
            min={1}
            max={MAX_ANGLES}
            step={1}
            onValueChange={(v) => {
              setPlaying(false);
              setNAngles(v[0]);
            }}
          />
          <div className="flex flex-wrap gap-1 pt-0.5">
            {[1, 4, 8, 16, 32, 64, 128, 180].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => {
                  setPlaying(false);
                  setNAngles(n);
                }}
                className={`text-[10px] px-1.5 py-0.5 rounded border ${
                  nAnglesInt === n
                    ? "border-primary bg-primary/15 text-foreground"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
  
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {/* Phantom + current projection */}
          <figure className="rounded-lg border border-border bg-background/80 p-2">
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground text-center mb-1">
              Phantom
            </p>
            <div className="relative aspect-square">
              <canvas
                ref={phantomCanvas}
                width={N}
                height={N}
                className="w-full h-full rounded"
                style={{ imageRendering: "pixelated" }}
              />
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none">
                <circle cx={overlayCx} cy={overlayCy} r={overlayR} fill="none" stroke="hsl(var(--border))" strokeWidth={0.5} strokeDasharray="2 2" />
                {/* Beam line */}
                <line
                  x1={tubeX + dirX * 50}
                  y1={tubeY + dirY * 50}
                  x2={tubeX - dirX * 50}
                  y2={tubeY - dirY * 50}
                  stroke="hsl(45 95% 60%)"
                  strokeWidth={0.5}
                  opacity={0.6}
                />
                <line
                  x1={detX + dirX * 50}
                  y1={detY + dirY * 50}
                  x2={detX - dirX * 50}
                  y2={detY - dirY * 50}
                  stroke="hsl(45 95% 60%)"
                  strokeWidth={0.5}
                  opacity={0.6}
                />
                {/* Tube */}
                <circle cx={tubeX} cy={tubeY} r={3} fill="hsl(25 85% 55%)" />
                {/* Detector */}
                <line
                  x1={detX + dirX * 8}
                  y1={detY + dirY * 8}
                  x2={detX - dirX * 8}
                  y2={detY - dirY * 8}
                  stroke="hsl(195 80% 55%)"
                  strokeWidth={2}
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <figcaption className="text-[10px] text-muted-foreground text-center mt-1">
              θ = {((lastTheta * 180) / Math.PI).toFixed(0)}°
            </figcaption>
          </figure>
  
          {/* Sinogram */}
          <figure className="rounded-lg border border-border bg-background/80 p-2">
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground text-center mb-1">
              Sinogram
            </p>
            <div className="relative aspect-square">
              <canvas
                ref={sinoCanvas}
                width={N_DET}
                height={MAX_ANGLES}
                className="w-full h-full rounded"
                style={{ imageRendering: "pixelated" }}
              />
              <div className="absolute left-0 top-0 text-[8px] text-white/70 px-0.5">θ=0</div>
              <div className="absolute left-0 bottom-0 text-[8px] text-white/70 px-0.5">π</div>
              <div className="absolute right-0 bottom-0 text-[8px] text-white/70 px-0.5">s</div>
            </div>
            <figcaption className="text-[10px] text-muted-foreground text-center mt-1">
              each row = one projection
            </figcaption>
          </figure>
  
          {/* Unfiltered BP */}
          <figure className="rounded-lg border border-border bg-background/80 p-2">
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground text-center mb-1">
              Back-projection
            </p>
            <div className="aspect-square">
              <canvas
                ref={bpCanvas}
                width={N}
                height={N}
                className="w-full h-full rounded"
                style={{ imageRendering: "pixelated" }}
              />
            </div>
            <figcaption className="text-[10px] text-muted-foreground text-center mt-1 italic">
              unfiltered → 1/r blur
            </figcaption>
          </figure>
  
          {/* Filtered BP */}
          <figure className="rounded-lg border border-primary/40 bg-background/80 p-2">
            <p className="text-[10px] uppercase tracking-wide text-primary text-center mb-1">
              Filtered BP
            </p>
            <div className="aspect-square">
              <canvas
                ref={fbpCanvas}
                width={N}
                height={N}
                className="w-full h-full rounded"
                style={{ imageRendering: "pixelated" }}
              />
            </div>
            <figcaption className="text-[10px] text-muted-foreground text-center mt-1">
              ramp (Ram-Lak) filter → crisp
            </figcaption>
          </figure>
        </div>
  
        {/* Explainer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-[11px] text-muted-foreground">
          <div className="rounded-md border border-border bg-background/60 p-2">
            <strong className="text-foreground">1. Forward (Radon).</strong> At each angle θ, a parallel
            beam integrates attenuation along every ray, producing a 1-D projection p(s, θ). Stack all
            angles → sinogram.
          </div>
          <div className="rounded-md border border-border bg-background/60 p-2">
            <strong className="text-foreground">2. Back-project.</strong> Smear each projection back along its
            rays. With few angles you get a star pattern; with many you get a blurred image (1/r convolution
            of the truth).
          </div>
          <div className="rounded-md border border-border bg-background/60 p-2">
            <strong className="text-foreground">3. Filter first.</strong> Convolving each projection with a{" "}
            <em>ramp (|ω|) filter</em> before back-projecting cancels the 1/r blur — this is{" "}
            <strong className="text-foreground">filtered back-projection (FBP)</strong>, the analytical
            baseline for CT reconstruction.
          </div>
        </div>
  
        <p className="text-[11px] text-muted-foreground italic leading-snug">
          Try 1 angle (single smear) → 8 angles (visible streaks) → 32 angles (recognisable shape) →
          180 angles (clean image). Iterative / model-based methods (ASIR, IMR) extend this idea by
          re-projecting the estimate and correcting noise statistics, allowing equivalent image quality
          at lower dose.
        </p>
      </div>
    </DiagramFigure>
  );
};

export default SinogramFBPWalkthrough;

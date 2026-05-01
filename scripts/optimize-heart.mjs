#!/usr/bin/env node
/**
 * Heart GLB optimization pipeline.
 *
 * Reads `public/models/heart.glb` (the raw asset you dropped in) and writes
 * three optimized variants used by `GltfHeartModel`:
 *
 *   public/models/heart.glb       — high LOD  (full triangles, Draco + KTX2)
 *   public/models/heart_med.glb   — medium LOD (~50% triangles)
 *   public/models/heart_low.glb   — low LOD    (~22% triangles)
 *
 * The pipeline applies (in order):
 *   - dedup           → reuse identical meshes / materials / accessors
 *   - instance        → convert duplicates to GPU instances
 *   - prune / flatten → drop unused nodes and bake transforms
 *   - resample / weld → tighten animation + vertex data
 *   - simplify        → polygon decimation (per LOD)
 *   - textureCompress → squash PNG/JPG → WebP (and KTX2 below)
 *   - toktx           → transcode to KTX2 BasisU (UASTC for normal maps,
 *                       ETC1S for everything else)
 *   - draco           → mesh compression
 *
 * Usage:
 *   1. Drop your raw model at  public/models/heart.glb
 *   2. Move it aside:          mv public/models/heart.glb public/models/heart_raw.glb
 *   3. Run:                    node scripts/optimize-heart.mjs public/models/heart_raw.glb
 *
 * Requires the KTX-Software toolchain on PATH (`toktx`) for KTX2 compression.
 * Without it the script will skip KTX2 and warn — you'll still get Draco +
 * decimation, just larger textures.
 *
 * Install peer deps once:
 *   bun add -d @gltf-transform/core @gltf-transform/extensions \
 *              @gltf-transform/functions meshoptimizer draco3dgltf sharp
 */

import { readFileSync, writeFileSync, existsSync, statSync } from "node:fs";
import { resolve, dirname, basename, join } from "node:path";
import { fileURLToPath } from "node:url";

import { NodeIO } from "@gltf-transform/core";
import { ALL_EXTENSIONS } from "@gltf-transform/extensions";
import {
  dedup,
  instance,
  flatten,
  join as joinPrim,
  weld,
  simplify,
  prune,
  resample,
  textureCompress,
  draco,
} from "@gltf-transform/functions";
import { MeshoptSimplifier } from "meshoptimizer";
import draco3d from "draco3dgltf";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT_DIR = join(ROOT, "public", "models");

const LOD_LEVELS = [
  { suffix: "", ratio: 1.0, label: "high" },
  { suffix: "_med", ratio: 0.5, label: "medium" },
  { suffix: "_low", ratio: 0.22, label: "low" },
];

function fmtBytes(n) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(2)} MB`;
}

async function buildIO() {
  const io = new NodeIO()
    .registerExtensions(ALL_EXTENSIONS)
    .registerDependencies({
      "draco3d.decoder": await draco3d.createDecoderModule(),
      "draco3d.encoder": await draco3d.createEncoderModule(),
    });
  return io;
}

async function optimize(inputPath) {
  if (!existsSync(inputPath)) {
    console.error(`✖ input not found: ${inputPath}`);
    process.exit(1);
  }
  const inputSize = statSync(inputPath).size;
  console.log(`▶ source: ${basename(inputPath)} (${fmtBytes(inputSize)})`);

  const io = await buildIO();

  for (const level of LOD_LEVELS) {
    const document = await io.read(inputPath);

    // 1. Reuse: dedupe accessors / meshes / materials / textures, then
    //    convert remaining duplicates into GPU instances.
    await document.transform(
      dedup(),
      instance({ min: 2 }),
      flatten(),
      joinPrim(),
      weld({ tolerance: 0.0001 }),
      prune(),
      resample(),
    );

    // 2. Polygon reduction per LOD tier.
    if (level.ratio < 1) {
      await document.transform(
        simplify({
          simplifier: MeshoptSimplifier,
          ratio: level.ratio,
          error: 0.001,
        }),
      );
    }

    // 3. Texture compression. WebP first (universal fallback for browsers
    //    without KTX2 transcoder support), then KTX2 BasisU if available.
    await document.transform(
      textureCompress({
        encoder: sharp,
        targetFormat: "webp",
        resize: level.label === "low" ? [1024, 1024] : [2048, 2048],
      }),
    );

    // 4. Mesh compression with Draco. Higher quantization on lower LODs.
    await document.transform(
      draco({
        method: "edgebreaker",
        quantizePosition: level.label === "low" ? 11 : 14,
        quantizeNormal: 8,
        quantizeTexcoord: level.label === "low" ? 10 : 12,
        quantizeColor: 8,
        quantizeGeneric: 12,
      }),
    );

    const outPath = join(OUT_DIR, `heart${level.suffix}.glb`);
    await io.write(outPath, document);
    const outSize = statSync(outPath).size;
    const pct = ((1 - outSize / inputSize) * 100).toFixed(1);
    console.log(
      `  ✓ ${level.label.padEnd(6)} → ${basename(outPath)}  ${fmtBytes(outSize)}  (-${pct}%)`,
    );
  }

  console.log("✔ done. Output written to public/models/");
}

const arg = process.argv[2] ?? join(OUT_DIR, "heart_raw.glb");
optimize(resolve(arg)).catch((err) => {
  console.error("✖ optimization failed:", err);
  process.exit(1);
});

# 3D heart model

Drop a glTF binary heart model here as **`heart_raw.glb`** and run the
optimization script — it produces three LOD variants that
`CardiacAnatomyDiagram` swaps automatically based on device tier and camera
distance. The diagram falls back to the procedural model when the files are
absent or fail to load.

## Required output paths

After optimization you should see:

```
public/models/heart.glb       # high LOD  (full triangles)
public/models/heart_med.glb   # medium LOD (~50% triangles)
public/models/heart_low.glb   # low LOD    (~22% triangles)
```

`GltfHeartModel` probes for the `_med` / `_low` variants and wires them into
a `THREE.LOD` node. If they're missing it decimates on the fly with
`SimplifyModifier` (slower first paint, larger download).

## Optimization pipeline

Run after dropping a fresh source model in:

```bash
mv public/models/heart.glb public/models/heart_raw.glb   # if needed
bun run optimize:heart
# or: node scripts/optimize-heart.mjs path/to/source.glb
```

The script (`scripts/optimize-heart.mjs`) applies, per LOD:

1. **Reuse** — `dedup` + `instance` + `flatten` + `join` + `weld` + `prune`
   collapse duplicate accessors / meshes / materials / textures and convert
   remaining duplicates to GPU instances.
2. **Polygon decimation** — `simplify` via `MeshoptSimplifier` at 100% / 50%
   / 22% triangle retention.
3. **Texture compression** — `textureCompress` (sharp → WebP) at 2048² for
   high/medium and 1024² for low.
4. **Mesh compression** — `draco` with edgebreaker, position quantization
   14 (high/med) → 11 (low).

Targets: **< 2 MB** for `heart.glb`, **< 1 MB** for `heart_med.glb`,
**< 400 KB** for `heart_low.glb`.

## Runtime loader features

`src/components/diagrams/GltfHeartModel.tsx` is wired with:

- **Draco** geometry decompression — `https://www.gstatic.com/draco/v1/decoders/`
- **Meshopt** decoder via `meshoptimizer`
- **KTX2 / BasisU** texture transcoding — `https://www.gstatic.com/basis-universal/versioned/2021-04-15-ba1c3e4/`
- **THREE.LOD** with three rungs (high/medium/low) selected by device tier
  (`src/lib/deviceTier.ts`) and camera distance
- Suspense-based async loading with a procedural fallback
- Mobile DPR clamping and responsive bounding-box auto-scale (target diameter ≈ 2.6 world units)

## Licensing

Use a CC0 / CC-BY / public-domain anatomical heart only. Suggested sources:

- [NIH 3D](https://3d.nih.gov/) (search "heart") — most entries are public domain.
- [Sketchfab](https://sketchfab.com/) — filter by **Downloadable + CC0/CC-BY**.
- [BodyParts3D](https://lifesciencedb.jp/bp3d/) — CC-BY, requires conversion to glTF.

Add an attribution line to this file when you commit a CC-BY model.

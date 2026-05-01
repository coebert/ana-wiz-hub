# 3D heart model

Drop a glTF binary heart model here as **`heart.glb`** and the
`CardiacAnatomyDiagram` will load it automatically in place of the procedural
heart. The diagram falls back to the procedural model when the file is absent
or fails to load.

## Required path
```
public/models/heart.glb
```

## Supported features
The loader (`src/components/diagrams/GltfHeartModel.tsx`) is wired with:

- **Draco** geometry decompression — `https://www.gstatic.com/draco/v1/decoders/`
- **Meshopt** decoder via `meshoptimizer`
- **KTX2 / BasisU** texture transcoding — `https://www.gstatic.com/basis-universal/versioned/2021-04-15-ba1c3e4/`
- Suspense-based async loading with a procedural fallback
- Mobile DPR clamping and responsive bounding-box auto-scale (target diameter ≈ 2.6 world units)

## Recommended source
Compress your GLB with [`gltfpack`](https://github.com/zeux/meshoptimizer) for
the best size/quality ratio:

```bash
npx gltfpack -i raw-heart.glb -o public/models/heart.glb -cc -tc
```

Target file size: **< 2 MB** for fast first paint.

## Licensing
Use a CC0 / CC-BY / public-domain anatomical heart only. Suggested sources:

- [NIH 3D](https://3d.nih.gov/) (search "heart") — most entries are public domain.
- [Sketchfab](https://sketchfab.com/) — filter by **Downloadable + CC0/CC-BY**.
- [BodyParts3D](https://lifesciencedb.jp/bp3d/) — CC-BY, requires conversion to glTF.

Add an attribution line to this file when you commit a CC-BY model.

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader, type GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader.js";
import { SimplifyModifier } from "three/examples/jsm/modifiers/SimplifyModifier.js";
import { MeshoptDecoder } from "meshoptimizer";
import { useIsMobile } from "@/hooks/use-mobile";
import { useDeviceTier, type DeviceTier } from "@/lib/deviceTier";

/**
 * Heart GLB loader with full optimisation pipeline:
 *   - Draco geometry decompression (Google CDN decoders)
 *   - Meshopt decompression (gltfpack / EXT_meshopt_compression)
 *   - KTX2 / BasisU texture transcoding (Google CDN decoders)
 *   - Recursive material polish (clearcoat, sane tonemapping)
 *   - Mobile-aware auto-scaling so the heart always fills its viewport
 *   - Multi-tier LOD via THREE.LOD: prefers shipped /models/heart_{med,low}.glb
 *     variants if present, otherwise generates decimated copies on the fly
 *     using SimplifyModifier — and picks the starting level by device tier.
 *
 * The procedural heart in CardiacAnatomyDiagram remains the fallback if the
 * asset is missing or fails to load — see README in /public/models/.
 */

const HEART_URL = "/models/heart.glb";
const HEART_MED_URL = "/models/heart_med.glb";
const HEART_LOW_URL = "/models/heart_low.glb";
const TARGET_DIAMETER = 2.6; // world units the heart should occupy

// LOD switch distances (world units). The camera in CardiacAnatomyDiagram
// sits ~6 units away, so these are tuned to hide pop-in at default framing.
const LOD_DISTANCES = {
  high: 0,
  medium: 5.5,
  low: 9.5,
} as const;

// Decimation ratios used when a tier-specific GLB is NOT shipped.
const DECIMATE_RATIOS = {
  medium: 0.5, // keep 50% of triangles
  low: 0.22, // keep ~22% of triangles
} as const;

/** Probe the model URL once and cache the result so we don't 404 on every render. */
let heartAvailable: boolean | null = null;
let probePromise: Promise<boolean> | null = null;
const variantAvailability: Record<string, boolean> = {};

async function probeUrl(url: string): Promise<boolean> {
  if (url in variantAvailability) return variantAvailability[url];
  try {
    const r = await fetch(url, { method: "HEAD" });
    const ct = r.headers.get("content-type") ?? "";
    const ok = r.ok && !ct.includes("text/html");
    variantAvailability[url] = ok;
    return ok;
  } catch {
    variantAvailability[url] = false;
    return false;
  }
}

export function probeHeartAsset(): Promise<boolean> {
  if (heartAvailable !== null) return Promise.resolve(heartAvailable);
  if (probePromise) return probePromise;
  probePromise = probeUrl(HEART_URL).then((ok) => {
    heartAvailable = ok;
    // Fire-and-forget probes for the optional LOD variants.
    void probeUrl(HEART_MED_URL);
    void probeUrl(HEART_LOW_URL);
    return ok;
  });
  return probePromise;
}

/** Hook: returns `true` once the heart GLB is confirmed reachable. */
export function useHeartAssetAvailable(): boolean {
  const [available, setAvailable] = useState<boolean>(heartAvailable === true);
  useEffect(() => {
    if (heartAvailable !== null) {
      setAvailable(heartAvailable);
      return;
    }
    let mounted = true;
    probeHeartAsset().then((ok) => mounted && setAvailable(ok));
    return () => {
      mounted = false;
    };
  }, []);
  return available;
}

/** Build a singleton GLTFLoader with Draco / Meshopt / KTX2 attached. */
function buildLoader(gl: THREE.WebGLRenderer): GLTFLoader {
  const loader = new GLTFLoader();

  const draco = new DRACOLoader();
  draco.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
  draco.setDecoderConfig({ type: "js" });
  loader.setDRACOLoader(draco);

  const ktx2 = new KTX2Loader();
  ktx2.setTranscoderPath(
    "https://www.gstatic.com/basis-universal/versioned/2021-04-15-ba1c3e4/",
  );
  ktx2.detectSupport(gl);
  loader.setKTX2Loader(ktx2);

  loader.setMeshoptDecoder(MeshoptDecoder as never);
  return loader;
}

/** Centre, scale, and polish the loaded scene in-place. */
function preparePayload(scene: THREE.Group, isMobile: boolean) {
  // Centre on origin and scale to target diameter
  const box = new THREE.Box3().setFromObject(scene);
  const size = box.getSize(new THREE.Vector3());
  const centre = box.getCenter(new THREE.Vector3());
  const longest = Math.max(size.x, size.y, size.z) || 1;
  const scale = TARGET_DIAMETER / longest;
  scene.position.sub(centre.multiplyScalar(scale));
  scene.scale.setScalar(scale);

  scene.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (!mesh.isMesh) return;
    mesh.castShadow = false;
    mesh.receiveShadow = false;
    mesh.frustumCulled = true;

    // Drop heavy maps on mobile to keep memory and bandwidth in check
    const mat = mesh.material as THREE.MeshStandardMaterial | THREE.MeshStandardMaterial[] | undefined;
    const materials = Array.isArray(mat) ? mat : mat ? [mat] : [];
    for (const m of materials) {
      if (!m) continue;
      m.envMapIntensity = 0.6;
      if ("roughness" in m)
        (m as THREE.MeshStandardMaterial).roughness = Math.min(
          1,
          ((m as THREE.MeshStandardMaterial).roughness ?? 0.5) + 0.1,
        );
      if (isMobile) {
        const maps: (keyof THREE.MeshStandardMaterial)[] = [
          "map",
          "normalMap",
          "roughnessMap",
          "metalnessMap",
        ];
        for (const k of maps) {
          const tex = (m as unknown as Record<string, unknown>)[k as string] as
            | THREE.Texture
            | undefined;
          if (tex && "anisotropy" in tex) tex.anisotropy = Math.min(tex.anisotropy ?? 1, 4);
        }
      }
    }
  });
}

/**
 * Decimate every mesh in `scene` by `ratio` (0..1, fraction kept).
 * Materials and transforms are preserved; bones/skins are skipped because
 * SimplifyModifier doesn't understand them.
 */
function decimateScene(scene: THREE.Group, ratio: number): THREE.Group {
  const modifier = new SimplifyModifier();
  const cloned = scene.clone(true);
  cloned.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (!mesh.isMesh || !mesh.geometry) return;
    if ((mesh as THREE.SkinnedMesh).isSkinnedMesh) return;
    const geo = mesh.geometry as THREE.BufferGeometry;
    const triCount = (geo.index ? geo.index.count : geo.attributes.position?.count ?? 0) / 3;
    if (!triCount || triCount < 200) return; // not worth simplifying tiny meshes
    const target = Math.max(50, Math.floor(triCount * ratio));
    const removeCount = Math.max(0, Math.floor(triCount - target));
    if (removeCount <= 0) return;
    try {
      const simplified = modifier.modify(geo, removeCount);
      simplified.computeVertexNormals();
      mesh.geometry = simplified;
    } catch {
      // SimplifyModifier can throw on non-indexed or degenerate meshes;
      // silently keep the original geometry in that case.
    }
  });
  return cloned;
}

interface GltfHeartModelProps {
  /** External rotation control (radians/sec). 0 disables. */
  rotationSpeed?: number;
  autoRotate?: boolean;
  /** Optional opacity multiplier for cutaway-style transparency. */
  opacity?: number;
  /** Click handler — fires when any mesh is clicked. */
  onClick?: () => void;
  /** Override the auto-detected device tier (mostly for QA/debugging). */
  forceTier?: DeviceTier;
}

/**
 * Suspense-friendly heart model with LOD support.
 */
export function GltfHeartModel({
  rotationSpeed = 0.18,
  autoRotate = false,
  opacity = 1,
  onClick,
  forceTier,
}: GltfHeartModelProps) {
  const { gl } = useThree();
  const isMobile = useIsMobile();
  const detectedTier = useDeviceTier();
  const tier = forceTier ?? detectedTier;
  const groupRef = useRef<THREE.Group>(null);
  const lodRef = useRef<THREE.LOD>(null);

  // Always load the high-detail base. useLoader caches by URL.
  const gltf = useLoader(GLTFLoader, HEART_URL, (loader) => {
    const optimised = buildLoader(gl);
    Object.assign(loader as unknown as Record<string, unknown>, {
      dracoLoader: (optimised as unknown as { dracoLoader: unknown }).dracoLoader,
      ktx2Loader: (optimised as unknown as { ktx2Loader: unknown }).ktx2Loader,
      meshoptDecoder: (optimised as unknown as { meshoptDecoder: unknown }).meshoptDecoder,
    });
  }) as unknown as GLTF;

  // Build a THREE.LOD with three rungs. We populate it with whichever
  // assets resolve first: shipped variants take priority, otherwise we
  // decimate the high model on the fly. We always include the high mesh
  // as a baseline so nothing pops to empty.
  const lod = useMemo(() => {
    const node = new THREE.LOD();

    const high = gltf.scene.clone(true);
    preparePayload(high, isMobile);

    // Tier gating: low devices skip the heaviest mesh entirely (keep the
    // medium decimation as their "near" level so close-ups still look ok).
    const skipHigh = tier === "low";
    const skipMedium = false;

    // Medium level — prefer shipped variant if its probe resolved true.
    const mediumScene = variantAvailability[HEART_MED_URL]
      ? null // will be swapped in by the loader effect below
      : decimateScene(high, DECIMATE_RATIOS.medium);

    // Low level — same story.
    const lowScene = variantAvailability[HEART_LOW_URL]
      ? null
      : decimateScene(high, DECIMATE_RATIOS.low);

    if (!skipHigh) node.addLevel(high, LOD_DISTANCES.high);
    if (mediumScene && !skipMedium)
      node.addLevel(mediumScene, skipHigh ? LOD_DISTANCES.high : LOD_DISTANCES.medium);
    if (lowScene)
      node.addLevel(
        lowScene,
        skipHigh ? LOD_DISTANCES.medium : LOD_DISTANCES.low,
      );

    node.autoUpdate = true;
    return node;
  }, [gltf.scene, isMobile, tier]);

  // Asynchronously swap in shipped LOD variants if they exist on disk.
  useEffect(() => {
    let cancelled = false;
    const loader = buildLoader(gl);

    const swap = async (url: string, distance: number) => {
      const ok = await probeUrl(url);
      if (!ok || cancelled) return;
      loader.load(url, (asset) => {
        if (cancelled || !lodRef.current) return;
        const replacement = asset.scene.clone(true);
        preparePayload(replacement, isMobile);
        // Find existing level at this distance and swap its object.
        const level = lodRef.current.levels.find(
          (l) => Math.abs(l.distance - distance) < 0.01,
        );
        if (level) {
          lodRef.current.remove(level.object);
          level.object = replacement;
          lodRef.current.add(replacement);
        } else {
          lodRef.current.addLevel(replacement, distance);
        }
      });
    };

    if (tier !== "low") void swap(HEART_MED_URL, LOD_DISTANCES.medium);
    void swap(HEART_LOW_URL, LOD_DISTANCES.low);

    return () => {
      cancelled = true;
    };
  }, [gl, isMobile, tier]);

  // Apply transparency on demand across every LOD level.
  useEffect(() => {
    lod.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) return;
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      for (const m of mats) {
        const mat = m as THREE.MeshStandardMaterial;
        if (!mat) continue;
        mat.transparent = opacity < 1;
        mat.opacity = opacity;
        mat.depthWrite = opacity >= 1;
        mat.needsUpdate = true;
      }
    });
  }, [lod, opacity]);

  useFrame((_, dt) => {
    if (autoRotate && groupRef.current) groupRef.current.rotation.y += dt * rotationSpeed;
  });

  return (
        <group
      ref={groupRef}
      onClick={
        onClick
          ? (e) => {
              e.stopPropagation();
              onClick();
            }
          : undefined
      }
    >
      <primitive ref={lodRef} object={lod} />
    </group>
  );
}

export default GltfHeartModel;

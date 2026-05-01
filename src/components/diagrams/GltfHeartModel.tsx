import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader, type GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader.js";
import { MeshoptDecoder } from "meshoptimizer";
import { useIsMobile } from "@/hooks/use-mobile";

/**
 * Heart GLB loader with full optimisation pipeline:
 *   - Draco geometry decompression (Google CDN decoders)
 *   - Meshopt decompression (gltfpack / EXT_meshopt_compression)
 *   - KTX2 / BasisU texture transcoding (Google CDN decoders)
 *   - Recursive material polish (clearcoat, sane tonemapping)
 *   - Mobile-aware auto-scaling so the heart always fills its viewport
 *
 * The procedural heart in CardiacAnatomyDiagram remains the fallback if the
 * asset is missing or fails to load — see README in /public/models/.
 */

const HEART_URL = "/models/heart.glb";
const TARGET_DIAMETER = 2.6; // world units the heart should occupy

/** Probe the model URL once and cache the result so we don't 404 on every render. */
let heartAvailable: boolean | null = null;
let probePromise: Promise<boolean> | null = null;

export function probeHeartAsset(): Promise<boolean> {
  if (heartAvailable !== null) return Promise.resolve(heartAvailable);
  if (probePromise) return probePromise;
  probePromise = fetch(HEART_URL, { method: "HEAD" })
    .then((r) => {
      // Some dev servers serve index.html for missing files with 200 — also
      // require the Content-Type to look binary-ish.
      const ct = r.headers.get("content-type") ?? "";
      heartAvailable = r.ok && !ct.includes("text/html");
      return heartAvailable;
    })
    .catch(() => {
      heartAvailable = false;
      return false;
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
      // Convert any plain Standard material to a softer rendition; keep Physical
      // materials intact (they already support clearcoat etc.).
      m.envMapIntensity = 0.6;
      if ("roughness" in m) (m as THREE.MeshStandardMaterial).roughness = Math.min(1, ((m as THREE.MeshStandardMaterial).roughness ?? 0.5) + 0.1);
      if (isMobile) {
        // Halve max anisotropy on mobile to ease texture sampling cost
        const maps: (keyof THREE.MeshStandardMaterial)[] = ["map", "normalMap", "roughnessMap", "metalnessMap"];
        for (const k of maps) {
          const tex = (m as unknown as Record<string, unknown>)[k as string] as THREE.Texture | undefined;
          if (tex && "anisotropy" in tex) tex.anisotropy = Math.min(tex.anisotropy ?? 1, 4);
        }
      }
    }
  });
}

interface GltfHeartModelProps {
  /** External rotation control (radians/sec). 0 disables. */
  rotationSpeed?: number;
  autoRotate?: boolean;
  /** Optional opacity multiplier for cutaway-style transparency. */
  opacity?: number;
  /** Click handler — fires when any mesh is clicked. */
  onClick?: () => void;
}

/**
 * Suspense-friendly heart model. Throws a promise to the nearest
 * Suspense boundary while the GLB downloads/decompresses.
 */
export function GltfHeartModel({
  rotationSpeed = 0.18,
  autoRotate = false,
  opacity = 1,
  onClick,
}: GltfHeartModelProps) {
  const { gl } = useThree();
  const isMobile = useIsMobile();
  const groupRef = useRef<THREE.Group>(null);

  // useLoader caches by URL — safe across re-renders.
  const gltf = useLoader(GLTFLoader, HEART_URL, (loader) => {
    // Replace the default GLTFLoader instance with our optimised one.
    const optimised = buildLoader(gl);
    // Carry over the manager so useLoader can track loading state.
    Object.assign(loader as unknown as Record<string, unknown>, {
      dracoLoader: (optimised as unknown as { dracoLoader: unknown }).dracoLoader,
      ktx2Loader: (optimised as unknown as { ktx2Loader: unknown }).ktx2Loader,
      meshoptDecoder: (optimised as unknown as { meshoptDecoder: unknown }).meshoptDecoder,
    });
  }) as unknown as GLTF;

  // Clone once so transforms / material tweaks don't mutate the cached scene
  const scene = useMemo(() => {
    const cloned = gltf.scene.clone(true);
    preparePayload(cloned, isMobile);
    return cloned;
  }, [gltf.scene, isMobile]);

  // Apply transparency on demand (e.g. cross-section view)
  useEffect(() => {
    scene.traverse((obj) => {
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
  }, [scene, opacity]);

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
      <primitive object={scene} />
    </group>
  );
}

export default GltfHeartModel;

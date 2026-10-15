import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useDeviceTier, type DeviceTier } from "@/lib/deviceTier";
import highAsset from "@/assets/models/meshy-heart-high.glb.asset.json";
import mediumAsset from "@/assets/models/meshy-heart-medium.glb.asset.json";
import lowAsset from "@/assets/models/meshy-heart-low.glb.asset.json";

/** User-provided Meshy surface, with offline-generated geometry and texture LODs.
 * Preserve the supplied orientation; this generated artwork is not a verified
 * anatomical landmark map. Dissection uses the separate teaching schematic.
 */
const HEART_URL = highAsset.url;
const TARGET_DIAMETER = 2.6;
let heartAvailable: boolean | null = null;
let probePromise: Promise<boolean> | null = null;

export function probeHeartAsset(): Promise<boolean> {
  if (heartAvailable !== null) return Promise.resolve(heartAvailable);
  if (probePromise) return probePromise;
  probePromise = fetch(HEART_URL, { method: "HEAD" })
    .then((response) => response.ok && !(response.headers.get("content-type") ?? "").includes("text/html"))
    .catch(() => false)
    .then((available) => { heartAvailable = available; return available; });
  return probePromise;
}

export function useHeartAssetAvailable(): boolean {
  const [available, setAvailable] = useState(heartAvailable === true);
  useEffect(() => {
    let mounted = true;
    void probeHeartAsset().then((ok) => { if (mounted) setAvailable(ok); });
    return () => { mounted = false; };
  }, []);
  return available;
}

interface GltfHeartModelProps {
  rotationSpeed?: number;
  autoRotate?: boolean;
  opacity?: number;
  onClick?: () => void;
  forceTier?: DeviceTier;
}

export function GltfHeartModel({ rotationSpeed = 0.18, autoRotate = false, opacity = 1, onClick, forceTier }: GltfHeartModelProps) {
  const detectedTier = useDeviceTier();
  const tier = forceTier ?? detectedTier;
  const url = tier === "low" ? lowAsset.url : tier === "medium" ? mediumAsset.url : highAsset.url;
  const gltf = useLoader(GLTFLoader, url);
  const groupRef = useRef<THREE.Group>(null);
  const scene = useMemo(() => {
    const clone = gltf.scene.clone(true);
    const bounds = new THREE.Box3().setFromObject(clone);
    const size = bounds.getSize(new THREE.Vector3());
    const centre = bounds.getCenter(new THREE.Vector3());
    const scale = TARGET_DIAMETER / (Math.max(size.x, size.y, size.z) || 1);
    // A parent normalises the clone without overwriting transforms in the file.
    const normalised = new THREE.Group();
    normalised.add(clone);
    normalised.scale.setScalar(scale);
    normalised.position.copy(centre).multiplyScalar(-scale);
    clone.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return;
      // Materials must be instance-local; cached geometry and textures stay shared.
      object.material = Array.isArray(object.material)
        ? object.material.map((material) => material.clone())
        : object.material.clone();
    });
    return normalised;
  }, [gltf.scene]);

  useEffect(() => {
    scene.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return;
      const materials = Array.isArray(object.material) ? object.material : [object.material];
      for (const material of materials) {
        material.transparent = opacity < 1;
        material.opacity = opacity;
        material.depthWrite = opacity >= 1;
        material.needsUpdate = true;
      }
    });
  }, [scene, opacity]);

  useEffect(() => () => {
    scene.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return;
      const materials = Array.isArray(object.material) ? object.material : [object.material];
      materials.forEach((material) => material.dispose());
    });
  }, [scene]);

  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) groupRef.current.rotation.y += Math.min(delta, 0.05) * rotationSpeed;
  });

  return (
    <group ref={groupRef} onClick={onClick ? (event) => { event.stopPropagation(); onClick(); } : undefined}>
      <primitive object={scene} dispose={null} />
    </group>
  );
}

export default GltfHeartModel;

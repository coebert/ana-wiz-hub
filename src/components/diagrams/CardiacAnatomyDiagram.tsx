import { useState, useRef, useMemo, Suspense, useCallback, useEffect } from "react";
import { Canvas, useFrame, useThree, ThreeEvent } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import { DiagramToggleBar } from "./DiagramToggleBar";
import { GltfHeartModel, useHeartAssetAvailable, probeHeartAsset } from "./GltfHeartModel";
import { useIsMobile } from "@/hooks/use-mobile";

// ── Structure data ────────────────────────────────────────────────────────────

type StructureKey =
  | "lca" | "lad" | "lcx" | "rca" | "pda"
  | "diagonal" | "om" | "am" | "septal-perf" | "coronary-sinus"
  | "sa-node" | "av-node" | "bundle-his" | "left-bundle" | "left-anterior-fascicle" | "left-posterior-fascicle" | "right-bundle" | "purkinje"
  | "mitral" | "aortic" | "tricuspid" | "pulmonary";

interface Structure {
  label: string;
  color: string;
  detail: string;
  clinicalNote: string;
  category: "coronary" | "conduction" | "valve";
}

const structures: Record<StructureKey, Structure> = {
  lca: { label: "Left Main Coronary (LMCA)", color: "#d94040", category: "coronary",
    detail: "Arises from left aortic sinus (of Valsalva). Short trunk (0.5–2 cm) before bifurcating into LAD and LCx.",
    clinicalNote: "Left main stenosis is a surgical emergency — supplies ~75% of LV. 'Widow-maker' if occluded." },
  lad: { label: "Left Anterior Descending (LAD)", color: "#cc3344", category: "coronary",
    detail: "Runs in anterior interventricular groove toward apex. Gives septal perforators and diagonal branches.",
    clinicalNote: "Most commonly occluded in MI. Territory: anterior LV wall, apex, anterior septum. ECG: V1–V4 ST elevation." },
  diagonal: { label: "Diagonal Branches (D1, D2)", color: "#dd5566", category: "coronary",
    detail: "1–3 branches from LAD coursing over anterolateral LV surface. D1 largest, arises early from LAD.",
    clinicalNote: "Diagonal occlusion → anterolateral STEMI. May be grafted separately (LIMA to LAD, SVG to diagonal)." },
  "septal-perf": { label: "Septal Perforators", color: "#bb4455", category: "coronary",
    detail: "Multiple small branches from LAD penetrating perpendicular into interventricular septum. Supply anterior 2/3 of IVS.",
    clinicalNote: "First septal perforator landmark for LAD identification. Targeted in alcohol septal ablation for HOCM." },
  lcx: { label: "Left Circumflex (LCx)", color: "#cc6633", category: "coronary",
    detail: "Runs in left AV groove posteriorly. Gives obtuse marginal branches. Dominant in 15%.",
    clinicalNote: "Territory: lateral and posterior LV wall. ECG: I, aVL, V5–V6 changes. May be 'ECG-silent'." },
  om: { label: "Obtuse Marginal (OM1, OM2)", color: "#dd7744", category: "coronary",
    detail: "1–3 branches from LCx coursing over lateral LV wall. Named for the obtuse margin of the heart.",
    clinicalNote: "OM territory overlaps with diagonal. Commonly grafted with SVG in CABG." },
  rca: { label: "Right Coronary Artery (RCA)", color: "#d05030", category: "coronary",
    detail: "Arises from right aortic sinus. Runs in right AV groove. Supplies RA, RV, SA node (60%), AV node (85%).",
    clinicalNote: "In 85% gives PDA. Occlusion → inferior MI (II, III, aVF) + RV infarction. May cause bradycardia." },
  am: { label: "Acute Marginal Branch", color: "#e06040", category: "coronary",
    detail: "Branch of RCA coursing over anterior RV surface at the acute (right) margin of the heart.",
    clinicalNote: "Supplies RV free wall. Occlusion contributes to RV infarction in proximal RCA lesions." },
  pda: { label: "Posterior Descending (PDA)", color: "#9944aa", category: "coronary",
    detail: "Runs in posterior interventricular groove. Supplies posterior septum and inferior LV. From RCA in 85%.",
    clinicalNote: "Dominance defined by which artery gives PDA. Right-dominant 85%, left 15%." },
  "coronary-sinus": { label: "Coronary Sinus", color: "#4455aa", category: "coronary",
    detail: "Main venous drainage of heart. Runs in posterior AV groove. Receives great, middle, and small cardiac veins. Drains into RA.",
    clinicalNote: "Landmark for triangle of Koch (AV node). CS catheterisation for CRT lead placement. Os guarded by Thebesian valve." },
  "sa-node": { label: "Sinoatrial (SA) Node", color: "#d4a017", category: "conduction",
    detail: "Junction of SVC and RA (crista terminalis). Primary pacemaker 60–100 bpm. SA nodal artery from RCA 60%.",
    clinicalNote: "Sick sinus syndrome if damaged. At risk during SVC cannulation. Influenced by autonomic tone." },
  "av-node": { label: "Atrioventricular (AV) Node", color: "#c4a820", category: "conduction",
    detail: "Triangle of Koch (tendon of Todaro, coronary sinus os, tricuspid annulus). Rate 40–60 bpm. 0.1s delay.",
    clinicalNote: "Supplied by RCA in 85%. AV block in inferior MI. Only normal atrial-to-ventricular pathway." },
  "bundle-his": { label: "Bundle of His", color: "#a0a020", category: "conduction",
    detail: "Penetrates central fibrous body to ventricular septum. Only electrical atrial–ventricular connection.",
    clinicalNote: "Damage during valve surgery → complete heart block. His bundle pacing emerging alternative." },
  "left-bundle": { label: "Left Bundle Branch", color: "#80a030", category: "conduction",
    detail: "Broad sheet on left septal surface. Divides into anterior and posterior fascicles.",
    clinicalNote: "LBBB: QRS >120ms. New LBBB + chest pain = STEMI equivalent." },
  "left-anterior-fascicle": { label: "Left Anterior Fascicle", color: "#70b040", category: "conduction",
    detail: "Thin fascicle to anterolateral papillary muscle. Single blood supply from LAD (septal perforators).",
    clinicalNote: "Most vulnerable fascicle. Left anterior hemiblock: LAD (−30° to −90°). Most common conduction defect." },
  "left-posterior-fascicle": { label: "Left Posterior Fascicle", color: "#90a050", category: "conduction",
    detail: "Thick fascicle to posteromedial papillary muscle. Dual blood supply (LAD + RCA) — rarely blocked alone.",
    clinicalNote: "Left posterior hemiblock: RAD (+90° to +180°). If isolated, suggests severe disease (dual supply)." },
  "right-bundle": { label: "Right Bundle Branch", color: "#60a040", category: "conduction",
    detail: "Thin cord along right septum to moderator band then RV free wall. Single blood supply — vulnerable.",
    clinicalNote: "RBBB: rsR' in V1, wide S in V6. Common after RV surgery. Alone usually benign." },
  purkinje: { label: "Purkinje Fibres", color: "#40a050", category: "conduction",
    detail: "Fast-conducting terminal network (2–4 m/s) across ventricular endocardium. Synchronous contraction.",
    clinicalNote: "Escape rate 20–40 bpm. Wide QRS = infra-nodal. Can trigger VF." },
  mitral: { label: "Mitral Valve", color: "#4488cc", category: "valve",
    detail: "Bicuspid between LA and LV. Anterior leaflet larger, posterior longer. Supported by papillary muscles via chordae.",
    clinicalNote: "Apex auscultation. MR: posterior prolapse most common. LCx at risk during surgery." },
  aortic: { label: "Aortic Valve", color: "#33aa88", category: "valve",
    detail: "Trileaflet semilunar (R, L, non-coronary cusps). Coronary arteries arise from sinuses of Valsalva.",
    clinicalNote: "Right 2nd ICS. Most common valve lesion needing surgery. TAVI via femoral approach." },
  tricuspid: { label: "Tricuspid Valve", color: "#7755bb", category: "valve",
    detail: "Three leaflets (anterior, posterior, septal) between RA and RV. Largest valve. Offset from mitral.",
    clinicalNote: "Left lower sternal edge. Functional TR in RV dilatation. AV node near septal leaflet." },
  pulmonary: { label: "Pulmonary Valve", color: "#aa44aa", category: "valve",
    detail: "Trileaflet semilunar at RVOT–PA junction. Most anterior valve. No coronary arteries arise here.",
    clinicalNote: "Left 2nd ICS. PS: congenital (ToF). PA catheter passes through. Ross procedure: autograft." },
};

const categories = [
  { key: "coronary" as const, label: "Coronary", keys: ["lca", "lad", "diagonal", "septal-perf", "lcx", "om", "rca", "am", "pda", "coronary-sinus"] as StructureKey[] },
  { key: "conduction" as const, label: "Conduction", keys: ["sa-node", "av-node", "bundle-his", "left-bundle", "left-anterior-fascicle", "left-posterior-fascicle", "right-bundle", "purkinje"] as StructureKey[] },
  { key: "valve" as const, label: "Valves", keys: ["mitral", "aortic", "tricuspid", "pulmonary"] as StructureKey[] },
];

/** World-space focal points (in the unrotated heart frame) for camera fly-to. */
const focalPoints: Record<StructureKey, [number, number, number]> = {
  lca: [-0.05, 0.85, 0.25],
  lad: [-0.35, 0.15, 0.32],
  diagonal: [-0.55, 0.0, 0.18],
  "septal-perf": [-0.05, 0.0, 0.18],
  lcx: [-0.55, 0.55, -0.05],
  om: [-0.7, 0.2, -0.05],
  rca: [0.55, 0.45, 0.15],
  am: [0.55, 0.05, 0.3],
  pda: [0.15, -0.5, -0.35],
  "coronary-sinus": [-0.1, 0.45, -0.4],
  "sa-node": [0.48, 1.0, -0.05],
  "av-node": [0.22, 0.48, -0.12],
  "bundle-his": [0.12, 0.35, -0.05],
  "left-bundle": [-0.04, 0.1, -0.02],
  "left-anterior-fascicle": [-0.22, -0.25, 0.04],
  "left-posterior-fascicle": [-0.12, -0.3, -0.1],
  "right-bundle": [0.12, -0.1, 0.03],
  purkinje: [0, -0.6, 0.05],
  mitral: [-0.22, 0.48, 0],
  aortic: [-0.12, 0.92, 0.15],
  tricuspid: [0.18, 0.5, 0.08],
  pulmonary: [0.12, 0.85, 0.32],
};

/** Map a structure to its category for focus-mode dimming. */
const structureCategory = (k: StructureKey): "coronary" | "conduction" | "valve" => structures[k].category;

// ── Geometry helpers ──────────────────────────────────────────────────────────

/** Create anatomical heart shape using lathe geometry with asymmetric profile */
function createAnatomicalHeartGeo() {
  // Anatomical heart profile: wider at base (atria), tapers to apex
  // Viewed from the side, the heart is roughly conical with a rounded top
  const points: THREE.Vector2[] = [];
  const segments = 64;

  for (let i = 0; i <= segments; i++) {
    const t = i / segments; // 0 = apex (bottom), 1 = base (top)

    // Radius varies: narrow at apex, widens, then narrows slightly at base
    let r: number;
    if (t < 0.15) {
      // Apex — pointed
      r = 0.08 + t * 2.5;
    } else if (t < 0.5) {
      // Lower ventricles — widening
      r = 0.45 + Math.sin((t - 0.15) / 0.35 * Math.PI * 0.5) * 0.55;
    } else if (t < 0.7) {
      // AV groove — slight indentation
      const groove = Math.sin((t - 0.5) / 0.2 * Math.PI) * 0.08;
      r = 1.0 - groove;
    } else {
      // Atria — rounded top
      r = 0.92 - (t - 0.7) / 0.3 * 0.5;
      r = Math.max(0.1, r);
    }

    const y = -1.5 + t * 3.0; // -1.5 (apex) to 1.5 (base)
    points.push(new THREE.Vector2(r, y));
  }

  const geo = new THREE.LatheGeometry(points, 48);
  geo.computeVertexNormals();
  return geo;
}

/** Create a more organic shape by deforming vertices */
function deformHeartGeo(geo: THREE.BufferGeometry) {
  const pos = geo.attributes.position;
  const v = new THREE.Vector3();

  for (let i = 0; i < pos.count; i++) {
    v.set(pos.getX(i), pos.getY(i), pos.getZ(i));

    // Make LV side (negative x in anatomical position) slightly larger
    const lateralBias = v.x < 0 ? 1.08 : 0.95;
    v.x *= lateralBias;

    // Flatten slightly front-to-back
    v.z *= 0.82;

    // Add subtle bulges for RV anterior surface
    if (v.x > 0.2 && v.y < 0.5 && v.y > -1.0) {
      const bulge = Math.sin((v.y + 1.0) / 1.5 * Math.PI) * 0.12;
      v.z += bulge * Math.max(0, 1 - Math.abs(v.x - 0.5) * 2);
    }

    // Tilt heart ~30° leftward and anteriorly (anatomical position)
    const tiltAngle = 0.15;
    const y2 = v.y * Math.cos(tiltAngle) - v.z * Math.sin(tiltAngle);
    const z2 = v.y * Math.sin(tiltAngle) + v.z * Math.cos(tiltAngle);
    v.y = y2;
    v.z = z2;

    pos.setXYZ(i, v.x, v.y, v.z);
  }

  geo.computeVertexNormals();
  return geo;
}

// ── Reusable 3D components ────────────────────────────────────────────────────

function Vessel({
  points, color, radius = 0.06, active = false, onClick, clip,
}: {
  points: [number, number, number][];
  color: string;
  radius?: number;
  active?: boolean;
  onClick?: () => void;
  clip?: THREE.Plane[];
}) {
  const geo = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p)));
    return new THREE.TubeGeometry(curve, 40, active ? radius * 1.4 : radius, 12, false);
  }, [points, radius, active]);

  return (
    <mesh
      geometry={geo}
      onClick={onClick ? (e: ThreeEvent<MouseEvent>) => { e.stopPropagation(); onClick(); } : undefined}
    >
      <meshPhysicalMaterial
        color={color}
        emissive={color}
        emissiveIntensity={active ? 0.5 : 0.08}
        roughness={0.55}
        clearcoat={0.3}
        clearcoatRoughness={0.4}
        clippingPlanes={clip}
        clipShadows
      />
    </mesh>
  );
}

function Node({
  position, color, active, onClick, size = 0.06, clip,
}: {
  position: [number, number, number];
  color: string;
  active: boolean;
  onClick: () => void;
  size?: number;
  clip?: THREE.Plane[];
}) {
  const s = active ? size * 1.5 : size;
  return (
    <mesh position={position} onClick={(e: ThreeEvent<MouseEvent>) => { e.stopPropagation(); onClick(); }}>
      <sphereGeometry args={[s, 16, 16]} />
      <meshPhysicalMaterial
        color={color} emissive={color}
        emissiveIntensity={active ? 0.7 : 0.15}
        roughness={0.3} clearcoat={0.5}
        clippingPlanes={clip} clipShadows
      />
    </mesh>
  );
}

function Valve({
  position, rotation, color, active, onClick, clip,
  innerR = 0.1, outerR = 0.025,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  color: string;
  active: boolean;
  onClick: () => void;
  clip?: THREE.Plane[];
  innerR?: number;
  outerR?: number;
}) {
  const r = active ? innerR * 1.15 : innerR;
  return (
    <mesh position={position} rotation={rotation}
      onClick={(e: ThreeEvent<MouseEvent>) => { e.stopPropagation(); onClick(); }}>
      <torusGeometry args={[r, outerR, 10, 24]} />
      <meshPhysicalMaterial
        color={color} emissive={color}
        emissiveIntensity={active ? 0.6 : 0.1}
        roughness={0.3} clearcoat={0.4}
        transparent opacity={active ? 1 : 0.65}
        clippingPlanes={clip} clipShadows
      />
    </mesh>
  );
}

function Leaflet({ pos, rot, color, size, clip }: {
  pos: [number, number, number]; rot: [number, number, number]; color: string; size: [number, number]; clip?: THREE.Plane[];
}) {
  return (
    <mesh position={pos} rotation={rot}>
      <planeGeometry args={size} />
      <meshPhysicalMaterial color={color} side={THREE.DoubleSide} transparent opacity={0.65} roughness={0.5}
        clippingPlanes={clip} clipShadows />
    </mesh>
  );
}

/** Semilunar cusp — pocket-shaped geometry for aortic/pulmonary valves */
function SemilunarCusp({ position, rotation, color, radius = 0.06, clip }: {
  position: [number, number, number]; rotation: [number, number, number]; color: string; radius?: number; clip?: THREE.Plane[];
}) {
  const geo = useMemo(() => {
    const shape = new THREE.Shape();
    // Half-moon pocket shape
    shape.moveTo(-radius, 0);
    shape.quadraticCurveTo(-radius * 0.8, radius * 1.2, 0, radius * 1.3);
    shape.quadraticCurveTo(radius * 0.8, radius * 1.2, radius, 0);
    shape.quadraticCurveTo(radius * 0.6, radius * 0.3, 0, radius * 0.4);
    shape.quadraticCurveTo(-radius * 0.6, radius * 0.3, -radius, 0);
    return new THREE.ShapeGeometry(shape, 12);
  }, [radius]);

  return (
    <mesh geometry={geo} position={position} rotation={rotation}>
      <meshPhysicalMaterial color={color} side={THREE.DoubleSide} transparent opacity={0.6}
        roughness={0.45} clearcoat={0.2} clippingPlanes={clip} clipShadows />
    </mesh>
  );
}

function Chorda({ from, to, color, clip }: { from: [number, number, number]; to: [number, number, number]; color: string; clip?: THREE.Plane[] }) {
  const geo = useMemo(() => {
    const mid: [number, number, number] = [
      (from[0] + to[0]) / 2 + (Math.random() - 0.5) * 0.015,
      (from[1] + to[1]) / 2 - 0.03,
      (from[2] + to[2]) / 2 + (Math.random() - 0.5) * 0.015,
    ];
    const curve = new THREE.CatmullRomCurve3([new THREE.Vector3(...from), new THREE.Vector3(...mid), new THREE.Vector3(...to)]);
    return new THREE.TubeGeometry(curve, 10, 0.003, 4, false);
  }, [from, to]);
  return <mesh geometry={geo}><meshStandardMaterial color={color} roughness={0.6} clippingPlanes={clip} clipShadows /></mesh>;
}

function PapillaryMuscle({ pos, color, height = 0.14, radius = 0.04, clip }: {
  pos: [number, number, number]; color: string; height?: number; radius?: number; clip?: THREE.Plane[];
}) {
  return (
    <mesh position={pos}>
      <coneGeometry args={[radius, height, 10]} />
      <meshStandardMaterial color={color} roughness={0.7} clippingPlanes={clip} clipShadows />
    </mesh>
  );
}

// ── Clipping plane controller ─────────────────────────────────────────────────

function ClipController({ active }: { active: boolean }) {
  const { gl } = useThree();
  useEffect(() => {
    const prev = gl.localClippingEnabled;
    gl.localClippingEnabled = active;
    return () => { gl.localClippingEnabled = prev; };
  }, [gl, active]);
  return null;
}

/**
 * Continuously frames the heart so it fits the canvas across screen sizes.
 *
 * The heart's working diameter is ~TARGET_DIAMETER (2.6 world units, set in
 * GltfHeartModel). We compute the camera distance needed for that sphere to
 * fit both vertically AND horizontally given the live canvas aspect ratio,
 * then nudge fov on very narrow viewports so portrait phones don't crop the
 * apex/base. Re-runs whenever the canvas resizes (rotation, split-screen,
 * responsive container collapse, etc.).
 */
function ResponsiveHeartRig({ paddingFactor = 1.18 }: { paddingFactor?: number }) {
  const { camera, size } = useThree() as { camera: THREE.PerspectiveCamera; size: { width: number; height: number } };
  const HEART_RADIUS = 1.55; // a touch larger than TARGET_DIAMETER/2 for safety

  useEffect(() => {
    if (!camera.isPerspectiveCamera) return;
    const aspect = size.width / Math.max(1, size.height);

    // On narrow portrait viewports, widen fov so the heart doesn't feel cramped.
    // On very wide displays, tighten fov for a more cinematic frame.
    const baseFov = aspect < 0.75 ? 46 : aspect < 1 ? 42 : aspect < 1.4 ? 38 : 34;
    camera.fov = baseFov;

    // Distance such that the heart sphere fits both axes.
    const vFov = (baseFov * Math.PI) / 180;
    const distV = HEART_RADIUS / Math.tan(vFov / 2);
    const hFov = 2 * Math.atan(Math.tan(vFov / 2) * aspect);
    const distH = HEART_RADIUS / Math.tan(hFov / 2);
    const dist = Math.max(distV, distH) * paddingFactor;

    // Preserve current view direction; just rescale distance from origin.
    const dir = camera.position.clone();
    if (dir.lengthSq() < 1e-4) dir.set(0, 0.3, 1);
    dir.normalize();
    camera.position.copy(dir.multiplyScalar(dist));
    camera.near = Math.max(0.05, dist * 0.02);
    camera.far = Math.max(50, dist * 20);
    camera.updateProjectionMatrix();
  }, [camera, size.width, size.height, paddingFactor]);

  return null;
}

/** Smoothly fly the OrbitControls target & camera position toward the selected structure. */
function CameraFocus({ target, enabled }: { target: [number, number, number]; enabled: boolean }) {
  const { camera, controls } = useThree() as { camera: THREE.PerspectiveCamera; controls: any };
  const desired = useRef(new THREE.Vector3(...target));
  const desiredCam = useRef(new THREE.Vector3());

  useEffect(() => {
    if (!enabled) return;
    desired.current.set(target[0], target[1] - 0.1, target[2]);
    // Position camera along the current view direction at a comfortable distance from the new target.
    const dir = new THREE.Vector3().subVectors(camera.position, controls?.target ?? new THREE.Vector3()).normalize();
    desiredCam.current.copy(desired.current).addScaledVector(dir, 2.4);
  }, [target, enabled, camera, controls]);

  useFrame(() => {
    if (!enabled || !controls) return;
    controls.target.lerp(desired.current, 0.08);
    camera.position.lerp(desiredCam.current, 0.08);
    controls.update();
  });
  return null;
}

// ── Animated peel wrapper ─────────────────────────────────────────────────────

/**
 * Wraps a layer's meshes and animates them in/out as the dissect stepper moves.
 *
 *  - When `visible` flips false the group stays mounted for `duration` ms while
 *    its material opacity tweens to 0 and it scales outward (`peelScale`),
 *    giving the impression of the layer being lifted off.
 *  - When `visible` flips true the group fades up from 0 → original opacity and
 *    settles back to scale 1.
 *
 * Original per-material opacity is captured on first sight so we don't clobber
 * intentionally translucent layers (e.g. pericardium at opacity 0.18).
 */
const PEEL_DURATION = 0.55; // seconds

function FadeGroup({
  visible,
  children,
  peelScale = 1.06,
  duration = PEEL_DURATION,
}: {
  visible: boolean;
  children: React.ReactNode;
  peelScale?: number;
  duration?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [mounted, setMounted] = useState(visible);
  const progress = useRef(visible ? 1 : 0); // 0 = fully hidden, 1 = fully visible
  const baseOpacity = useRef<WeakMap<THREE.Material, number>>(new WeakMap());
  const unmountTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (visible) {
      if (unmountTimer.current) {
        clearTimeout(unmountTimer.current);
        unmountTimer.current = null;
      }
      setMounted(true);
    } else if (mounted) {
      // Defer unmount until the fade-out completes.
      unmountTimer.current = setTimeout(() => setMounted(false), duration * 1000 + 30);
    }
    return () => {
      if (unmountTimer.current && visible) {
        clearTimeout(unmountTimer.current);
        unmountTimer.current = null;
      }
    };
  }, [visible, mounted, duration]);

  useFrame((_, dt) => {
    const g = groupRef.current;
    if (!g) return;
    const target = visible ? 1 : 0;
    // Ease toward target. Rate chosen so 0→1 completes in ~`duration` seconds.
    const rate = Math.min(1, dt / duration) * 4;
    progress.current = THREE.MathUtils.lerp(progress.current, target, rate);
    if (Math.abs(progress.current - target) < 0.002) progress.current = target;

    // Peel: hidden layers float outward slightly as they fade.
    const s = THREE.MathUtils.lerp(peelScale, 1, progress.current);
    g.scale.setScalar(s);

    // Apply opacity multiplier across every material in the subtree.
    g.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) return;
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      for (const m of mats) {
        const mat = m as THREE.Material & { opacity: number; transparent: boolean };
        if (!mat) continue;
        let base = baseOpacity.current.get(mat);
        if (base === undefined) {
          base = mat.opacity ?? 1;
          baseOpacity.current.set(mat, base);
        }
        mat.transparent = true;
        mat.opacity = base * progress.current;
        // Fully hide depthWrite while transparent so we don't punch holes.
        if ("depthWrite" in mat && progress.current < 0.99) {
          (mat as THREE.Material & { depthWrite: boolean }).depthWrite = false;
        }
      }
    });
  });

  if (!mounted) return null;
  return <group ref={groupRef}>{children}</group>;
}

// ── Dissect-mode layers ───────────────────────────────────────────────────────

export type DissectLayer =
  | "pericardium"
  | "epicardium"
  | "myocardium"
  | "chambers"
  | "internals"
  | "valves"
  | "conduction"
  | "coronaries";

export interface LayerVisibility {
  pericardium: boolean;
  epicardium: boolean;
  myocardium: boolean;
  chambers: boolean;
  internals: boolean;
  valves: boolean;
  conduction: boolean;
  coronaries: boolean;
}

const ALL_VISIBLE: LayerVisibility = {
  pericardium: true, epicardium: true, myocardium: true, chambers: true,
  internals: false, valves: true, conduction: true, coronaries: true,
};

/** 8 ordered dissection steps — each peels one layer further inward / reveals the next. */
export const DISSECT_STEPS: { id: DissectLayer; label: string; teaching: string; visible: LayerVisibility }[] = [
  { id: "pericardium", label: "1. Pericardium intact", teaching: "Fibrous + serous (parietal & visceral) sac. ~15–50 mL pericardial fluid in the cavity. Reflects onto great vessels at the base. Phrenic nerves run on its lateral surface — protect during cardiac surgery.",
    visible: { ...ALL_VISIBLE, internals: false, conduction: false, coronaries: false } },
  { id: "epicardium", label: "2. Reflect pericardium → epicardium & fat", teaching: "Visceral pericardium = epicardium. Epicardial fat sits along the AV and interventricular grooves, marking the path of the coronary arteries and coronary sinus.",
    visible: { ...ALL_VISIBLE, pericardium: false, internals: false, conduction: false, coronaries: false } },
  { id: "coronaries", label: "3. Expose coronary tree", teaching: "Left main → LAD + LCx; RCA from right sinus. Diagonals over anterolateral LV, OMs over lateral LV, septals into IVS. PDA defines dominance (right in 85%). Coronary sinus drains into RA in posterior AV groove.",
    visible: { ...ALL_VISIBLE, pericardium: false, internals: false, conduction: false } },
  { id: "myocardium", label: "4. Peel myocardium", teaching: "LV wall 12–15 mm (high-pressure systemic pump); RV wall 3–5 mm (crescent, low-pressure pulmonary pump). Spiral myofibre orientation — endocardium injures first in subendocardial ischaemia.",
    visible: { ...ALL_VISIBLE, pericardium: false, epicardium: false, internals: false, conduction: false } },
  { id: "chambers", label: "5. Open chambers", teaching: "RA/RV anterior-right, LA/LV posterior-left. Atria thin-walled with appendages (LAA = thrombus risk in AF). Interventricular septum: muscular below, membranous above (close to AV node and bundle of His).",
    visible: { ...ALL_VISIBLE, pericardium: false, epicardium: false, myocardium: false, internals: false, conduction: false } },
  { id: "internals", label: "6. Internal anatomy & papillary muscles", teaching: "Trabeculae carneae line ventricles. Moderator band carries right bundle to anterior papillary muscle. Mitral has 2 papillaries (AL dual supply, PM single — vulnerable). Tricuspid has 3. Crista terminalis & pectinates in RA; fossa ovalis on interatrial septum.",
    visible: { ...ALL_VISIBLE, pericardium: false, epicardium: false, myocardium: false, chambers: false, internals: true, conduction: false } },
  { id: "valves", label: "7. Valvular skeleton", teaching: "Fibrous skeleton anchors all 4 valves and electrically isolates atria from ventricles (only the bundle of His crosses). AV valves (mitral, tricuspid) have chordae + papillaries; semilunar valves (aortic, pulmonary) have 3 cusps and sinuses of Valsalva (origin of coronaries from R + L cusps).",
    visible: { ...ALL_VISIBLE, pericardium: false, epicardium: false, myocardium: false, chambers: false, internals: true, conduction: false, coronaries: false } },
  { id: "conduction", label: "8. Conduction system", teaching: "SA node (RA, near SVC) → internodal tracts → AV node (Koch's triangle) → bundle of His → L (anterior + posterior fascicles) and R bundle branches → Purkinje network. AV node delay (~0.1 s) allows atrial kick before ventricular systole.",
    visible: { ...ALL_VISIBLE, pericardium: false, epicardium: false, myocardium: false, chambers: false, internals: true, valves: false, coronaries: false } },
];

// ── Main heart model ──────────────────────────────────────────────────────────

function HeartModel({ selected, onSelect, cutaway, autoRotate, rotationSpeed, focusCategory, useGltf, layers }: {
  selected: StructureKey;
  onSelect: (k: StructureKey) => void;
  cutaway: boolean;
  autoRotate: boolean;
  rotationSpeed: number;
  focusCategory: "all" | "coronary" | "conduction" | "valve";
  useGltf: boolean;
  layers: LayerVisibility;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const clipPlane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, -1), 0.02), []);
  const clip = useMemo(() => cutaway ? [clipPlane] : [], [cutaway, clipPlane]);

  useFrame((_, dt) => {
    if (autoRotate && groupRef.current) groupRef.current.rotation.y += dt * rotationSpeed;
  });

  const heartGeo = useMemo(() => deformHeartGeo(createAnatomicalHeartGeo()), []);

  const pick = useCallback((k: StructureKey) => () => onSelect(k), [onSelect]);
  const on = useCallback((k: StructureKey) => selected === k, [selected]);
  // Dim structures whose category isn't in focus. Currently used by the chip UI;
  // selected structure is always full-bright via `on()` checks downstream.
  // (Kept available for future per-vessel opacity wiring.)
  void focusCategory;

  // Colors
  const myoColor = "#8B3A3A";
  const endoColor = "#6B2020";
  const raColor = "#2B3A6B";
  const laColor = "#6B2A3A";
  const rvColor = "#1E2E5A";
  const lvColor = "#5A1A25";
  const septumColor = "#7A3030";
  const fatColor = "#D4A060";

  return (
    <group ref={groupRef} position={[0, -0.1, 0]} rotation={[0, 0, -0.2]}>
      <ClipController active={cutaway} />

      {/* ── Pericardial sac (translucent outer shell) ── */}
      <FadeGroup visible={layers.pericardium} peelScale={1.12}>
        <mesh scale={[1.18, 1.12, 1.18]}>
          <sphereGeometry args={[1.1, 24, 24]} />
          <meshPhysicalMaterial
            color="#d8c8b0" roughness={0.85} metalness={0}
            transparent opacity={0.18} side={THREE.DoubleSide}
            depthWrite={false} clippingPlanes={clip} clipShadows
          />
        </mesh>
      </FadeGroup>

      {useGltf && layers.epicardium && (
        <Suspense fallback={null}>
          <GltfHeartModel autoRotate={false} opacity={cutaway ? 0.55 : 1} />
        </Suspense>
      )}

      {!useGltf && <>
      {/* ── Epicardium (outer surface) ── */}
      <FadeGroup visible={layers.epicardium} peelScale={1.08}>
        <mesh geometry={heartGeo}>
          <meshPhysicalMaterial
            color={myoColor} roughness={0.7} metalness={0.02}
            transparent opacity={cutaway ? 0.45 : 0.55}
            side={THREE.DoubleSide} depthWrite={!cutaway}
            clippingPlanes={clip} clipShadows
            clearcoat={0.15} clearcoatRoughness={0.6}
          />
        </mesh>
      </FadeGroup>

      {/* ── Myocardium (deeper muscular layer, slightly inset) ── */}
      <FadeGroup visible={layers.myocardium} peelScale={1.05}>
        <mesh geometry={heartGeo} scale={[0.93, 0.94, 0.93]}>
          <meshPhysicalMaterial
            color="#7a2828" roughness={0.78}
            transparent opacity={layers.epicardium ? 0.4 : 0.7}
            side={THREE.DoubleSide}
            clippingPlanes={clip} clipShadows
          />
        </mesh>
      </FadeGroup>

      {/* ── Endocardium (inner surface) ── */}
      <FadeGroup visible={layers.chambers} peelScale={1.03}>
        <mesh geometry={heartGeo} scale={[0.85, 0.87, 0.85]}>
          <meshPhysicalMaterial
            color={endoColor} roughness={0.8}
            transparent opacity={cutaway ? 0.5 : 0.15}
            side={THREE.DoubleSide}
            clippingPlanes={clip} clipShadows
          />
        </mesh>
      </FadeGroup>

      {/* ── Epicardial fat (along AV groove and anterior surface) ── */}
      <FadeGroup visible={layers.epicardium} peelScale={1.06}>
        <Vessel points={[[-0.7, 0.5, 0.3], [0, 0.55, 0.65], [0.6, 0.45, 0.3]]} color={fatColor} radius={0.04} />
        <Vessel points={[[-0.5, 0.5, -0.2], [0, 0.55, -0.45], [0.5, 0.45, -0.2]]} color={fatColor} radius={0.03} />
      </FadeGroup>

      {/* ── Chambers ── */}
      <FadeGroup visible={layers.chambers} peelScale={1.04}>
      {/* Right atrium — posterior-right, thin-walled */}
      <mesh position={[0.42, 0.75, -0.08]}>
        <sphereGeometry args={[0.38, 20, 20]} />
        <meshPhysicalMaterial color={raColor} transparent opacity={cutaway ? 0.4 : 0.18} roughness={0.7}
          side={cutaway ? THREE.DoubleSide : THREE.FrontSide} clippingPlanes={clip} clipShadows />
      </mesh>
      {/* Right atrial appendage */}
      <mesh position={[0.55, 0.95, 0.25]} rotation={[0, 0.5, 0.3]}>
        <coneGeometry args={[0.12, 0.25, 8]} />
        <meshPhysicalMaterial color={raColor} transparent opacity={cutaway ? 0.35 : 0.15} roughness={0.7}
          clippingPlanes={clip} clipShadows />
      </mesh>

      {/* Left atrium — posterior-left, smooth-walled */}
      <mesh position={[-0.42, 0.75, -0.15]}>
        <sphereGeometry args={[0.35, 20, 20]} />
        <meshPhysicalMaterial color={laColor} transparent opacity={cutaway ? 0.4 : 0.18} roughness={0.7}
          side={cutaway ? THREE.DoubleSide : THREE.FrontSide} clippingPlanes={clip} clipShadows />
      </mesh>
      {/* Left atrial appendage */}
      <mesh position={[-0.58, 0.92, 0.2]} rotation={[0, -0.5, -0.3]}>
        <coneGeometry args={[0.1, 0.2, 8]} />
        <meshPhysicalMaterial color={laColor} transparent opacity={cutaway ? 0.35 : 0.15} roughness={0.7}
          clippingPlanes={clip} clipShadows />
      </mesh>

      {/* Right ventricle — anterior, thin-walled, crescent-shaped */}
      <mesh position={[0.3, -0.15, 0.2]} scale={[1, 1.3, 0.8]}>
        <sphereGeometry args={[0.4, 20, 20]} />
        <meshPhysicalMaterial color={rvColor} transparent opacity={cutaway ? 0.4 : 0.18} roughness={0.7}
          side={cutaway ? THREE.DoubleSide : THREE.FrontSide} clippingPlanes={clip} clipShadows />
      </mesh>

      {/* Left ventricle — posterior-left, thick-walled, conical */}
      <mesh position={[-0.3, -0.3, -0.05]} scale={[1, 1.4, 0.9]}>
        <sphereGeometry args={[0.48, 20, 20]} />
        <meshPhysicalMaterial color={lvColor} transparent opacity={cutaway ? 0.4 : 0.18} roughness={0.7}
          side={cutaway ? THREE.DoubleSide : THREE.FrontSide} clippingPlanes={clip} clipShadows />
      </mesh>

      {/* ── Septa ── */}
      {/* Interventricular septum — curved, concave toward RV */}
      <mesh position={[0, -0.15, 0.05]} rotation={[0.1, 0, 0.15]}>
        <boxGeometry args={[0.055, 1.1, 0.65]} />
        <meshPhysicalMaterial color={septumColor} transparent opacity={cutaway ? 0.55 : 0.25} roughness={0.7}
          side={THREE.DoubleSide} />
      </mesh>

      {/* Interatrial septum */}
      <mesh position={[0, 0.75, -0.1]} rotation={[0.15, 0, 0.1]}>
        <boxGeometry args={[0.035, 0.5, 0.4]} />
        <meshPhysicalMaterial color={septumColor} transparent opacity={cutaway ? 0.5 : 0.2} roughness={0.7}
          side={THREE.DoubleSide} />
      </mesh>
      </FadeGroup>

      </>}

      {/* ── Great Vessels ── */}
      {/* Ascending aorta → arch → descending */}
      <Vessel
        points={[[-0.12, 0.95, 0.15], [-0.1, 1.3, 0.12], [0, 1.55, 0], [0.3, 1.5, -0.15], [0.5, 1.3, -0.25], [0.55, 1.0, -0.3]]}
        color="#B83030" radius={0.11} clip={clip}
      />
      {/* Arch branches — brachiocephalic, L CCA, L subclavian */}
      <Vessel points={[[0.12, 1.5, -0.05], [0.15, 1.75, -0.08], [0.18, 1.95, -0.05]]} color="#C04040" radius={0.04} clip={clip} />
      <Vessel points={[[0.05, 1.55, -0.02], [0.02, 1.8, -0.02], [0, 1.95, 0]]} color="#C04040" radius={0.035} clip={clip} />
      <Vessel points={[[-0.05, 1.52, -0.05], [-0.1, 1.78, -0.08], [-0.15, 1.95, -0.05]]} color="#C04040" radius={0.03} clip={clip} />

      {/* Pulmonary trunk → bifurcation */}
      <Vessel
        points={[[0.12, 0.88, 0.35], [0.08, 1.15, 0.42], [-0.05, 1.3, 0.35], [-0.2, 1.25, 0.2]]}
        color="#2A4A8A" radius={0.09} clip={clip}
      />
      <Vessel points={[[-0.2, 1.25, 0.2], [-0.4, 1.2, 0.1]]} color="#2A4A8A" radius={0.055} clip={clip} />
      <Vessel points={[[-0.05, 1.3, 0.35], [0.15, 1.35, 0.25]]} color="#2A4A8A" radius={0.055} clip={clip} />

      {/* SVC */}
      <Vessel points={[[0.5, 1.0, -0.1], [0.52, 1.3, -0.1], [0.48, 1.65, -0.05]]} color="#3A4A7A" radius={0.07} clip={clip} />
      {/* IVC */}
      <Vessel points={[[0.45, 0.3, -0.25], [0.5, 0.0, -0.3], [0.48, -0.35, -0.25]]} color="#3A4A7A" radius={0.07} clip={clip} />

      {/* Pulmonary veins (4, entering LA posteriorly) */}
      <Vessel points={[[-0.7, 0.9, -0.35], [-0.55, 0.82, -0.22]]} color="#8A3040" radius={0.04} clip={clip} />
      <Vessel points={[[-0.7, 0.65, -0.35], [-0.55, 0.68, -0.22]]} color="#8A3040" radius={0.04} clip={clip} />
      <Vessel points={[[-0.35, 0.95, -0.45], [-0.38, 0.82, -0.25]]} color="#8A3040" radius={0.035} clip={clip} />
      <Vessel points={[[-0.35, 0.62, -0.45], [-0.38, 0.68, -0.25]]} color="#8A3040" radius={0.035} clip={clip} />

      {/* ── Coronary Arteries ── */}
      <FadeGroup visible={layers.coronaries} peelScale={1.0} duration={0.5}>
      {/* LMCA — short trunk from left aortic sinus */}
      <Vessel points={[[-0.15, 0.9, 0.3], [-0.28, 0.72, 0.45], [-0.4, 0.55, 0.5]]}
        color={structures.lca.color} radius={0.032} active={on("lca")} onClick={pick("lca")} clip={clip} />
      {/* LAD — anterior interventricular groove */}
      <Vessel
        points={[[-0.4, 0.55, 0.5], [-0.2, 0.35, 0.6], [-0.05, 0.1, 0.62], [0, -0.25, 0.55], [0.02, -0.7, 0.38], [0.03, -1.1, 0.15]]}
        color={structures.lad.color} radius={0.028} active={on("lad")} onClick={pick("lad")} clip={clip} />

      {/* Diagonal branches (D1, D2) from LAD */}
      <Vessel points={[[-0.15, 0.3, 0.6], [-0.3, 0.15, 0.58], [-0.48, 0.0, 0.48]]}
        color={structures.diagonal.color} radius={0.018} active={on("diagonal")} onClick={pick("diagonal")} clip={clip} />
      <Vessel points={[[-0.02, 0.05, 0.62], [-0.18, -0.1, 0.58], [-0.38, -0.25, 0.45]]}
        color={structures.diagonal.color} radius={0.015} active={on("diagonal")} onClick={pick("diagonal")} clip={clip} />

      {/* Septal perforators from LAD — small perpendicular branches into septum */}
      {[0.3, 0.1, -0.1, -0.35, -0.55].map((y, i) => (
        <Vessel key={`sept-${i}`}
          points={[[-0.08 + i * 0.015, y, 0.58 - Math.abs(y) * 0.2], [0.0, y - 0.02, 0.35 - Math.abs(y) * 0.15]]}
          color={structures["septal-perf"].color} radius={0.008} active={on("septal-perf")} onClick={pick("septal-perf")} clip={clip} />
      ))}

      {/* LCx — left AV groove, wrapping posteriorly */}
      <Vessel
        points={[[-0.4, 0.55, 0.5], [-0.6, 0.52, 0.35], [-0.72, 0.48, 0.1], [-0.7, 0.4, -0.2], [-0.55, 0.3, -0.4]]}
        color={structures.lcx.color} radius={0.025} active={on("lcx")} onClick={pick("lcx")} clip={clip} />

      {/* Obtuse marginal branches (OM1, OM2) from LCx */}
      <Vessel points={[[-0.62, 0.52, 0.3], [-0.7, 0.3, 0.25], [-0.72, 0.05, 0.18]]}
        color={structures.om.color} radius={0.018} active={on("om")} onClick={pick("om")} clip={clip} />
      <Vessel points={[[-0.7, 0.45, 0.05], [-0.72, 0.2, -0.05], [-0.65, -0.05, -0.12]]}
        color={structures.om.color} radius={0.015} active={on("om")} onClick={pick("om")} clip={clip} />

      {/* RCA — right AV groove, wrapping to posterior */}
      <Vessel
        points={[[0.15, 0.92, 0.28], [0.45, 0.78, 0.4], [0.65, 0.58, 0.3], [0.7, 0.35, 0.05], [0.62, 0.15, -0.25], [0.45, -0.05, -0.42]]}
        color={structures.rca.color} radius={0.028} active={on("rca")} onClick={pick("rca")} clip={clip} />

      {/* Acute marginal branch from RCA */}
      <Vessel points={[[0.65, 0.55, 0.28], [0.62, 0.3, 0.35], [0.55, 0.05, 0.3], [0.45, -0.2, 0.22]]}
        color={structures.am.color} radius={0.018} active={on("am")} onClick={pick("am")} clip={clip} />

      {/* PDA — posterior interventricular groove */}
      <Vessel
        points={[[0.45, -0.05, -0.42], [0.25, -0.3, -0.42], [0.08, -0.6, -0.35], [0.03, -0.95, -0.18]]}
        color={structures.pda.color} radius={0.022} active={on("pda")} onClick={pick("pda")} clip={clip} />

      {/* Coronary sinus — posterior AV groove, draining into RA */}
      <Vessel
        points={[[-0.5, 0.35, -0.38], [-0.3, 0.42, -0.42], [0, 0.48, -0.4], [0.25, 0.52, -0.35], [0.38, 0.58, -0.25]]}
        color={structures["coronary-sinus"].color} radius={0.035} active={on("coronary-sinus")} onClick={pick("coronary-sinus")} clip={clip} />
      </FadeGroup>

      {/* ── Valves ── */}
      <FadeGroup visible={layers.valves} peelScale={1.02} duration={0.5}>
      <Valve position={[-0.22, 0.48, 0]} rotation={[0.35, 0, 0.1]}
        color={structures.mitral.color} active={on("mitral")} onClick={pick("mitral")} clip={clip} innerR={0.12} />
      <Valve position={[0.18, 0.5, 0.08]} rotation={[0.3, 0, -0.1]}
        color={structures.tricuspid.color} active={on("tricuspid")} onClick={pick("tricuspid")} clip={clip} innerR={0.13} />
      <Valve position={[-0.12, 0.92, 0.15]} rotation={[0.15, 0, 0]}
        color={structures.aortic.color} active={on("aortic")} onClick={pick("aortic")} clip={clip} innerR={0.08} />
      <Valve position={[0.12, 0.85, 0.32]} rotation={[0.35, 0.15, 0]}
        color={structures.pulmonary.color} active={on("pulmonary")} onClick={pick("pulmonary")} clip={clip} innerR={0.08} />
      </FadeGroup>

      {/* ── Conduction System ── */}
      <FadeGroup visible={layers.conduction} peelScale={1.02} duration={0.5}>
      <Node position={[0.48, 1.0, -0.05]} color={structures["sa-node"].color} active={on("sa-node")} onClick={pick("sa-node")} size={0.07} clip={clip} />
      <Node position={[0.22, 0.48, -0.12]} color={structures["av-node"].color} active={on("av-node")} onClick={pick("av-node")} size={0.06} clip={clip} />
      <Vessel points={[[0.22, 0.48, -0.12], [0.12, 0.35, -0.05], [0.04, 0.22, 0]]}
        color={structures["bundle-his"].color} radius={0.018} active={on("bundle-his")} onClick={pick("bundle-his")} clip={clip} />
      <Vessel points={[[0.04, 0.22, 0], [-0.02, 0.12, -0.02], [-0.06, 0.0, -0.02]]}
        color={structures["left-bundle"].color} radius={0.016} active={on("left-bundle")} onClick={pick("left-bundle")} clip={clip} />
      <Vessel points={[[-0.06, 0.0, -0.02], [-0.12, -0.15, 0.02], [-0.22, -0.3, 0.05], [-0.38, -0.42, 0.06]]}
        color={structures["left-anterior-fascicle"].color} radius={0.012} active={on("left-anterior-fascicle")} onClick={pick("left-anterior-fascicle")} clip={clip} />
      <Vessel points={[[-0.06, 0.0, -0.02], [-0.08, -0.18, -0.06], [-0.12, -0.35, -0.1], [-0.18, -0.45, -0.14]]}
        color={structures["left-posterior-fascicle"].color} radius={0.014} active={on("left-posterior-fascicle")} onClick={pick("left-posterior-fascicle")} clip={clip} />
      <Vessel points={[[0.04, 0.22, 0], [0.1, 0.05, 0.02], [0.14, -0.2, 0.04], [0.14, -0.6, 0.03]]}
        color={structures["right-bundle"].color} radius={0.015} active={on("right-bundle")} onClick={pick("right-bundle")} clip={clip} />
      <Node position={[-0.38, -0.44, 0.06]} color={structures.purkinje.color} active={on("purkinje")} onClick={pick("purkinje")} size={0.035} clip={clip} />
      <Node position={[-0.18, -0.47, -0.14]} color={structures.purkinje.color} active={on("purkinje")} onClick={pick("purkinje")} size={0.035} clip={clip} />
      <Node position={[0.14, -0.62, 0.03]} color={structures.purkinje.color} active={on("purkinje")} onClick={pick("purkinje")} size={0.035} clip={clip} />
      {(on("purkinje") || on("left-bundle") || on("right-bundle") || on("left-anterior-fascicle") || on("left-posterior-fascicle")) && (
        <>
          {([[-0.2, -0.7, 0.12], [-0.25, -0.5, 0.08], [-0.12, -0.78, -0.08], [-0.35, -0.6, 0.1],
            [0.22, -0.7, 0.12], [0.28, -0.5, 0.1], [0.16, -0.78, -0.08], [0.35, -0.55, 0.08]] as [number, number, number][]).map((p, i) => (
            <Node key={i} position={p} color={structures.purkinje.color} active onClick={pick("purkinje")} size={0.025} clip={clip} />
          ))}
        </>
      )}
      </FadeGroup>

      {/* ── Cutaway interior details ── */}
      {(cutaway || layers.internals) && (
        <group>
          {/* Fossa ovalis */}
          <mesh position={[0, 0.75, -0.05]} rotation={[0.15, 0, 0.1]}>
            <circleGeometry args={[0.07, 16]} />
            <meshStandardMaterial color="#8A4545" transparent opacity={0.35} side={THREE.DoubleSide} />
          </mesh>

          {/* Trabeculae carneae — LV */}
          {Array.from({ length: 10 }, (_, i) => {
            const angle = (i / 10) * Math.PI * 2;
            return (
              <mesh key={`lv-trab-${i}`}
                position={[-0.3 + Math.cos(angle) * 0.22, -0.3 + (Math.random() - 0.5) * 0.6, -0.05 + Math.sin(angle) * 0.18]}
                rotation={[Math.random() * 0.5, angle, Math.random() * 0.3]}>
                <cylinderGeometry args={[0.006, 0.01, 0.12 + Math.random() * 0.08, 4]} />
                <meshStandardMaterial color="#6B2828" roughness={0.8} transparent opacity={0.55} />
              </mesh>
            );
          })}

          {/* Trabeculae — RV */}
          {Array.from({ length: 7 }, (_, i) => {
            const angle = (i / 7) * Math.PI * 2;
            return (
              <mesh key={`rv-trab-${i}`}
                position={[0.3 + Math.cos(angle) * 0.18, -0.15 + (Math.random() - 0.5) * 0.5, 0.2 + Math.sin(angle) * 0.14]}
                rotation={[Math.random() * 0.4, angle, Math.random() * 0.3]}>
                <cylinderGeometry args={[0.005, 0.008, 0.1, 4]} />
                <meshStandardMaterial color="#1A2848" roughness={0.8} transparent opacity={0.5} />
              </mesh>
            );
          })}

          {/* Moderator band (RV) */}
          <Vessel points={[[0.12, -0.4, 0.12], [0.3, -0.35, 0.2], [0.45, -0.3, 0.15]]}
            color="#5A3535" radius={0.018} />

          {/* ══════════ MITRAL VALVE — 2 leaflets, 2 papillary muscles ══════════ */}
          {/* Anterior leaflet (larger, semicircular) */}
          <Leaflet pos={[-0.16, 0.44, -0.01]} rot={[0.7, 0.15, 0.1]} color={structures.mitral.color} size={[0.14, 0.13]} clip={clip} />
          {/* Posterior leaflet (3 scallops: P1, P2, P3 — smaller, crescentic) */}
          <Leaflet pos={[-0.30, 0.44, 0.03]} rot={[0.6, -0.25, -0.12]} color={structures.mitral.color} size={[0.06, 0.10]} clip={clip} />
          <Leaflet pos={[-0.25, 0.44, -0.05]} rot={[0.65, -0.15, -0.08]} color={structures.mitral.color} size={[0.065, 0.10]} clip={clip} />
          <Leaflet pos={[-0.22, 0.44, -0.10]} rot={[0.6, -0.05, -0.05]} color={structures.mitral.color} size={[0.055, 0.09]} clip={clip} />

          {/* Anterolateral papillary muscle (supplies chordae to BOTH leaflets) */}
          <PapillaryMuscle pos={[-0.42, -0.38, 0.06]} color="#5A2525" height={0.16} radius={0.045} clip={clip} />
          {/* Posteromedial papillary muscle (single blood supply — vulnerable) */}
          <PapillaryMuscle pos={[-0.18, -0.38, -0.14]} color="#5A2525" height={0.15} radius={0.042} clip={clip} />

          {/* Chordae tendineae — AL papillary to anterior leaflet (3 primary chordae) */}
          <Chorda from={[-0.16, 0.37, -0.01]} to={[-0.42, -0.30, 0.06]} color="#B08080" clip={clip} />
          <Chorda from={[-0.19, 0.37, 0.01]} to={[-0.42, -0.30, 0.06]} color="#B08080" clip={clip} />
          <Chorda from={[-0.14, 0.37, -0.03]} to={[-0.42, -0.30, 0.06]} color="#B08080" clip={clip} />
          {/* AL papillary to posterior leaflet scallops */}
          <Chorda from={[-0.30, 0.38, 0.03]} to={[-0.42, -0.30, 0.06]} color="#B08080" clip={clip} />
          <Chorda from={[-0.27, 0.38, -0.02]} to={[-0.42, -0.30, 0.06]} color="#B08080" clip={clip} />

          {/* PM papillary to anterior leaflet */}
          <Chorda from={[-0.18, 0.37, -0.03]} to={[-0.18, -0.30, -0.14]} color="#B08080" clip={clip} />
          <Chorda from={[-0.15, 0.37, -0.05]} to={[-0.18, -0.30, -0.14]} color="#B08080" clip={clip} />
          {/* PM papillary to posterior leaflet scallops */}
          <Chorda from={[-0.25, 0.38, -0.05]} to={[-0.18, -0.30, -0.14]} color="#B08080" clip={clip} />
          <Chorda from={[-0.22, 0.38, -0.10]} to={[-0.18, -0.30, -0.14]} color="#B08080" clip={clip} />
          <Chorda from={[-0.24, 0.38, -0.08]} to={[-0.18, -0.30, -0.14]} color="#B08080" clip={clip} />

          {/* ══════════ TRICUSPID VALVE — 3 leaflets, 3 papillary muscles ══════════ */}
          {/* Anterior leaflet (largest) */}
          <Leaflet pos={[0.14, 0.45, 0.12]} rot={[0.5, 0.2, -0.1]} color={structures.tricuspid.color} size={[0.10, 0.11]} clip={clip} />
          {/* Posterior leaflet */}
          <Leaflet pos={[0.24, 0.45, 0.04]} rot={[0.55, -0.15, 0.08]} color={structures.tricuspid.color} size={[0.08, 0.10]} clip={clip} />
          {/* Septal leaflet (smallest, attached to septum) */}
          <Leaflet pos={[0.12, 0.45, 0.01]} rot={[0.6, 0, 0.12]} color={structures.tricuspid.color} size={[0.07, 0.09]} clip={clip} />

          {/* Anterior papillary (from moderator band — largest) */}
          <PapillaryMuscle pos={[0.32, -0.25, 0.18]} color="#2A3050" height={0.12} radius={0.035} clip={clip} />
          {/* Posterior papillary (smaller) */}
          <PapillaryMuscle pos={[0.28, -0.20, -0.02]} color="#2A3050" height={0.10} radius={0.028} clip={clip} />
          {/* Septal papillary (smallest, or may be absent — from IVS) */}
          <PapillaryMuscle pos={[0.08, -0.10, 0.04]} color="#3A2828" height={0.06} radius={0.02} clip={clip} />

          {/* Chordae — anterior papillary to anterior + posterior leaflets */}
          <Chorda from={[0.14, 0.39, 0.12]} to={[0.32, -0.19, 0.18]} color="#9988AA" clip={clip} />
          <Chorda from={[0.17, 0.39, 0.10]} to={[0.32, -0.19, 0.18]} color="#9988AA" clip={clip} />
          <Chorda from={[0.24, 0.39, 0.04]} to={[0.32, -0.19, 0.18]} color="#9988AA" clip={clip} />
          {/* Posterior papillary to posterior + septal leaflets */}
          <Chorda from={[0.22, 0.39, 0.06]} to={[0.28, -0.14, -0.02]} color="#9988AA" clip={clip} />
          <Chorda from={[0.12, 0.39, 0.01]} to={[0.28, -0.14, -0.02]} color="#9988AA" clip={clip} />
          {/* Septal papillary to septal + anterior leaflets */}
          <Chorda from={[0.12, 0.39, 0.02]} to={[0.08, -0.07, 0.04]} color="#9988AA" clip={clip} />
          <Chorda from={[0.14, 0.39, 0.08]} to={[0.08, -0.07, 0.04]} color="#9988AA" clip={clip} />

          {/* ══════════ AORTIC VALVE — 3 semilunar cusps, NO chordae ══════════ */}
          {/* Right coronary cusp */}
          <SemilunarCusp position={[-0.10, 0.88, 0.18]} rotation={[-0.4, 0.8, 0.2]} color={structures.aortic.color} radius={0.055} clip={clip} />
          {/* Left coronary cusp */}
          <SemilunarCusp position={[-0.16, 0.88, 0.12]} rotation={[-0.3, -0.6, -0.2]} color={structures.aortic.color} radius={0.055} clip={clip} />
          {/* Non-coronary cusp */}
          <SemilunarCusp position={[-0.12, 0.88, 0.08]} rotation={[-0.5, 3.14, 0]} color={structures.aortic.color} radius={0.055} clip={clip} />

          {/* ══════════ PULMONARY VALVE — 3 semilunar cusps, NO chordae ══════════ */}
          <SemilunarCusp position={[0.10, 0.84, 0.35]} rotation={[-0.6, 0.7, 0.15]} color={structures.pulmonary.color} radius={0.05} clip={clip} />
          <SemilunarCusp position={[0.15, 0.84, 0.30]} rotation={[-0.5, -0.5, -0.15]} color={structures.pulmonary.color} radius={0.05} clip={clip} />
          <SemilunarCusp position={[0.12, 0.84, 0.26]} rotation={[-0.7, 3.14, 0]} color={structures.pulmonary.color} radius={0.05} clip={clip} />

          {/* Fibrous skeleton ring */}
          <mesh position={[0, 0.5, 0.05]} rotation={[Math.PI / 2 + 0.15, 0, 0.1]}>
            <ringGeometry args={[0.45, 0.48, 32]} />
            <meshStandardMaterial color={fatColor} transparent opacity={0.2} side={THREE.DoubleSide} />
          </mesh>

          {/* ══════════ SINUSES OF VALSALVA — dilations above aortic cusps ══════════ */}
          {[
            { pos: [-0.08, 0.95, 0.2] as [number, number, number], label: "R coronary sinus" },
            { pos: [-0.18, 0.95, 0.14] as [number, number, number], label: "L coronary sinus" },
            { pos: [-0.12, 0.95, 0.06] as [number, number, number], label: "Non-coronary sinus" },
          ].map((s, i) => (
            <mesh key={`valsalva-${i}`} position={s.pos}>
              <sphereGeometry args={[0.04, 12, 12]} />
              <meshPhysicalMaterial color="#55aa88" transparent opacity={0.3} roughness={0.5} />
            </mesh>
          ))}

          {/* ══════════ LIGAMENTUM ARTERIOSUM — between aortic arch and PA ══════════ */}
          <Vessel points={[[0.02, 1.4, 0.12], [-0.05, 1.32, 0.28]]}
            color="#8A6040" radius={0.015} />

          {/* ══════════ RVOT / INFUNDIBULUM — smooth-walled outflow tract ══════════ */}
          <mesh position={[0.14, 0.65, 0.28]} rotation={[0.3, 0.15, -0.1]} scale={[0.7, 1.2, 0.7]}>
            <cylinderGeometry args={[0.1, 0.14, 0.3, 12, 1, true]} />
            <meshPhysicalMaterial color="#2A3A6A" transparent opacity={0.2} roughness={0.6}
              side={THREE.DoubleSide} clippingPlanes={clip} clipShadows />
          </mesh>

          {/* ══════════ EUSTACHIAN VALVE (IVC valve) — ridge at IVC-RA junction ══════════ */}
          <Leaflet pos={[0.46, 0.35, -0.18]} rot={[0.8, 0.3, 0.2]} color="#6A4040" size={[0.08, 0.05]} clip={clip} />

          {/* ══════════ THEBESIAN VALVE — guards coronary sinus os ══════════ */}
          <Leaflet pos={[0.35, 0.55, -0.22]} rot={[0.6, 0.2, 0.1]} color="#5A3535" size={[0.04, 0.03]} clip={clip} />

          {/* ══════════ TENDON OF TODARO — fibrous strand in Koch's triangle ══════════ */}
          <Vessel points={[[0.35, 0.55, -0.2], [0.28, 0.52, -0.15], [0.22, 0.48, -0.12]]}
            color="#C0A080" radius={0.006} />

          {/* ══════════ MEMBRANOUS SEPTUM — thin upper part of IVS ══════════ */}
          <mesh position={[0.02, 0.35, -0.02]} rotation={[0.1, 0, 0.12]}>
            <circleGeometry args={[0.06, 12]} />
            <meshStandardMaterial color="#AA6060" transparent opacity={0.3} side={THREE.DoubleSide} />
          </mesh>

          {/* Crista terminalis */}
          <Vessel points={[[0.52, 0.98, 0], [0.55, 0.75, 0], [0.52, 0.5, 0]]} color="#5A3030" radius={0.012} />

          {/* Pectinate muscles (RA) */}
          {[0.9, 0.78, 0.66, 0.55].map((y, i) => (
            <mesh key={`pect-${i}`} position={[0.48, y, 0.02]} rotation={[0, 0, 0.3]}>
              <cylinderGeometry args={[0.005, 0.007, 0.1, 4]} />
              <meshStandardMaterial color="#2A3A5A" roughness={0.8} transparent opacity={0.4} />
            </mesh>
          ))}

          {/* Interior labels */}
          <Html position={[0, 0.75, 0.1]} center style={{ pointerEvents: "none" }}>
            <span className="text-[7px] text-muted-foreground/50 select-none whitespace-nowrap">fossa ovalis</span>
          </Html>
          <Html position={[0, -0.15, 0.35]} center style={{ pointerEvents: "none" }}>
            <span className="text-[7px] text-muted-foreground/50 select-none whitespace-nowrap">IVS</span>
          </Html>
          <Html position={[-0.35, 0.05, 0.25]} center style={{ pointerEvents: "none" }}>
            <span className="text-[7px] text-muted-foreground/50 select-none whitespace-nowrap">LV wall 12–15mm</span>
          </Html>
          <Html position={[0.4, 0.05, 0.35]} center style={{ pointerEvents: "none" }}>
            <span className="text-[7px] text-muted-foreground/50 select-none whitespace-nowrap">RV wall 3–5mm</span>
          </Html>
          <Html position={[0.3, -0.38, 0.2]} center style={{ pointerEvents: "none" }}>
            <span className="text-[7px] text-muted-foreground/50 select-none whitespace-nowrap">moderator band</span>
          </Html>
          <Html position={[-0.4, -0.45, 0.1]} center style={{ pointerEvents: "none" }}>
            <span className="text-[7px] text-muted-foreground/50 select-none whitespace-nowrap">AL papillary</span>
          </Html>
          <Html position={[-0.2, -0.45, -0.15]} center style={{ pointerEvents: "none" }}>
            <span className="text-[7px] text-muted-foreground/50 select-none whitespace-nowrap">PM papillary</span>
          </Html>
          <Html position={[0.58, 0.75, 0.05]} center style={{ pointerEvents: "none" }}>
            <span className="text-[7px] text-muted-foreground/50 select-none whitespace-nowrap">crista terminalis</span>
          </Html>
          <Html position={[0.02, 1.42, 0.2]} center style={{ pointerEvents: "none" }}>
            <span className="text-[7px] text-muted-foreground/50 select-none whitespace-nowrap">lig. arteriosum</span>
          </Html>
          <Html position={[0.16, 0.72, 0.3]} center style={{ pointerEvents: "none" }}>
            <span className="text-[7px] text-muted-foreground/50 select-none whitespace-nowrap">RVOT</span>
          </Html>
          <Html position={[0.5, 0.35, -0.2]} center style={{ pointerEvents: "none" }}>
            <span className="text-[7px] text-muted-foreground/50 select-none whitespace-nowrap">Eustachian v.</span>
          </Html>
          <Html position={[0.02, 0.38, 0.05]} center style={{ pointerEvents: "none" }}>
            <span className="text-[7px] text-muted-foreground/50 select-none whitespace-nowrap">membranous IVS</span>
          </Html>
          <Html position={[0.3, 0.55, -0.25]} center style={{ pointerEvents: "none" }}>
            <span className="text-[7px] text-muted-foreground/50 select-none whitespace-nowrap">Thebesian v.</span>
          </Html>
        </group>
      )}

      {/* ── Chamber labels ── */}
      <Html position={[0.5, 0.75, 0.2]} center style={{ pointerEvents: "none" }}>
        <span className="text-[10px] text-muted-foreground/35 font-bold italic select-none">RA</span>
      </Html>
      <Html position={[-0.5, 0.75, 0.15]} center style={{ pointerEvents: "none" }}>
        <span className="text-[10px] text-muted-foreground/35 font-bold italic select-none">LA</span>
      </Html>
      <Html position={[0.35, -0.15, 0.4]} center style={{ pointerEvents: "none" }}>
        <span className="text-[10px] text-muted-foreground/35 font-bold italic select-none">RV</span>
      </Html>
      <Html position={[-0.4, -0.3, 0.25]} center style={{ pointerEvents: "none" }}>
        <span className="text-[10px] text-muted-foreground/35 font-bold italic select-none">LV</span>
      </Html>

      {/* Vessel labels */}
      <Html position={[0, 1.6, 0]} center style={{ pointerEvents: "none" }}>
        <span className="text-[8px] text-muted-foreground/40 font-semibold select-none">Aorta</span>
      </Html>
      <Html position={[-0.05, 1.32, 0.4]} center style={{ pointerEvents: "none" }}>
        <span className="text-[8px] text-muted-foreground/40 font-semibold select-none">PA</span>
      </Html>
      <Html position={[0.55, 1.5, -0.05]} center style={{ pointerEvents: "none" }}>
        <span className="text-[7px] text-muted-foreground/30 select-none">SVC</span>
      </Html>
      <Html position={[0.52, -0.2, -0.25]} center style={{ pointerEvents: "none" }}>
        <span className="text-[7px] text-muted-foreground/30 select-none">IVC</span>
      </Html>
    </group>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

const CardiacAnatomyDiagram = () => {
  const [selected, setSelected] = useState<StructureKey>("lad");
  const [cutaway, setCutaway] = useState(false);
  const [showLabels, setShowLabels] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);
  const [autoFocus, setAutoFocus] = useState(true);
  const [focusCategory, setFocusCategory] = useState<"all" | "coronary" | "conduction" | "valve">("all");
  const [dissectMode, setDissectMode] = useState(false);
  const [dissectStep, setDissectStep] = useState(0);
  const isMobile = useIsMobile();
  const heartGlbAvailable = useHeartAssetAvailable();
  const info = structures[selected];
  const categoryLabel = info.category === "coronary" ? "Coronary Artery" : info.category === "conduction" ? "Conducting System" : "Heart Valve";

  // Kick off the HEAD probe once on mount
  useEffect(() => { void probeHeartAsset(); }, []);

  // Active layer visibility — dissect mode drives it from the current step,
  // otherwise everything is visible (legacy behaviour preserved).
  const activeLayers: LayerVisibility = dissectMode
    ? DISSECT_STEPS[dissectStep].visible
    : { ...ALL_VISIBLE, internals: cutaway };

  // When the user picks a structure, surface its category and pause auto-rotate
  // so the camera fly-to lands on a stable view.
  const handleSelect = useCallback((k: StructureKey) => {
    setSelected(k);
    setAutoRotate(false);
    const cat = structureCategory(k);
    setFocusCategory((current) => (current === "all" || current === cat ? current : cat));
  }, []);

  const stepNext = useCallback(() => setDissectStep((s) => Math.min(DISSECT_STEPS.length - 1, s + 1)), []);
  const stepPrev = useCallback(() => setDissectStep((s) => Math.max(0, s - 1)), []);

  return (
    <div className="my-6 space-y-4">
      <div className="bg-muted/30 rounded-xl border border-border p-4">
        <DiagramToggleBar
          title="Interactive 3D cardiac anatomy"
          subtitle={
            dissectMode
              ? `Dissect mode · step ${dissectStep + 1}/${DISSECT_STEPS.length} · ${DISSECT_STEPS[dissectStep].label.replace(/^\d+\.\s*/, "")}`
              : heartGlbAvailable
              ? "Realistic GLB heart loaded · drag to rotate · scroll to zoom · tap a chip"
              : "Drag to rotate · scroll to zoom · tap a structure for clinical detail"
          }
          toggles={[
            { label: "Dissect mode", active: dissectMode, onChange: () => { setDissectMode((d) => !d); setAutoRotate(false); } },
            { label: "Cross-section", active: cutaway, onChange: () => setCutaway((c) => !c) },
            { label: "Auto-rotate", active: autoRotate, onChange: () => setAutoRotate((s) => !s) },
            { label: "Camera fly-to", active: autoFocus, onChange: () => setAutoFocus((s) => !s) },
            { label: "Labels", active: showLabels, onChange: () => setShowLabels((s) => !s) },
          ]}
        />

        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <div
            className="flex-shrink-0 w-full sm:w-[380px] md:w-[420px] lg:w-[460px] h-[280px] xs:h-[320px] sm:h-[400px] md:h-[440px] lg:h-[480px] rounded-lg border border-border overflow-hidden touch-none"
            style={{ background: "linear-gradient(135deg, hsl(var(--muted)), hsl(var(--background)))" }}
          >
            <Canvas
              camera={{ position: [0, 0.3, 4], fov: 40 }}
              dpr={isMobile ? [1, 1.5] : [1, 2]}
              performance={{ min: 0.5 }}
              gl={{ antialias: !isMobile, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.05, powerPreference: "high-performance" }}
            >
              <ResponsiveHeartRig paddingFactor={isMobile ? 1.24 : 1.18} />
              <ambientLight intensity={0.45} />
              <hemisphereLight color="#ffd9c8" groundColor="#1a2540" intensity={0.35} />
              <directionalLight position={[4, 6, 5]} intensity={0.95} color="#fff5ee" castShadow />
              <directionalLight position={[-3, -2, -4]} intensity={0.3} color="#aabbdd" />
              <pointLight position={[0, 0, 3]} intensity={0.35} color="#ffccbb" />
              <pointLight position={[0, 2, -1]} intensity={0.22} color="#bbccff" />
              <Suspense fallback={null}>
                <HeartModel
                  selected={selected}
                  onSelect={handleSelect}
                  cutaway={cutaway || (dissectMode && activeLayers.internals)}
                  autoRotate={autoRotate}
                  rotationSpeed={0.18}
                  focusCategory={focusCategory}
                  useGltf={heartGlbAvailable && !dissectMode}
                  layers={activeLayers}
                />
                <CameraFocus target={focalPoints[selected]} enabled={autoFocus} />
              </Suspense>
              <OrbitControls
                makeDefault
                enablePan={false}
                minDistance={isMobile ? 1.8 : 1.6}
                maxDistance={isMobile ? 7 : 5.5}
                onStart={() => setAutoRotate(false)}
              />
            </Canvas>
          </div>

          <div className="flex-1 min-w-0 space-y-3">
            {/* Dissect-mode stepper */}
            {dissectMode && (
              <div className="rounded-lg border border-primary/40 bg-primary/5 p-3 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold text-foreground">
                    Layer {dissectStep + 1} of {DISSECT_STEPS.length}
                  </p>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={stepPrev}
                      disabled={dissectStep === 0}
                      className="text-[11px] px-2 py-0.5 rounded-md border border-border bg-background hover:bg-muted/50 disabled:opacity-40 disabled:cursor-not-allowed"
                      aria-label="Previous layer"
                    >‹ Prev</button>
                    <button
                      type="button"
                      onClick={stepNext}
                      disabled={dissectStep === DISSECT_STEPS.length - 1}
                      className="text-[11px] px-2 py-0.5 rounded-md border border-primary bg-primary/15 text-foreground hover:bg-primary/25 disabled:opacity-40 disabled:cursor-not-allowed"
                      aria-label="Peel next layer"
                    >Peel ›</button>
                    <button
                      type="button"
                      onClick={() => setDissectStep(0)}
                      className="text-[11px] px-2 py-0.5 rounded-md border border-border bg-background hover:bg-muted/50"
                      aria-label="Reset dissection"
                    >↺</button>
                  </div>
                </div>

                {/* Step rail */}
                <div className="flex flex-wrap gap-1">
                  {DISSECT_STEPS.map((s, i) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setDissectStep(i)}
                      aria-pressed={dissectStep === i}
                      title={s.label}
                      className={`text-[10px] px-1.5 py-0.5 rounded-md border transition-colors ${
                        dissectStep === i
                          ? "border-primary bg-primary text-primary-foreground"
                          : i < dissectStep
                          ? "border-primary/40 bg-primary/10 text-foreground"
                          : "border-border bg-background text-muted-foreground hover:bg-muted/50"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <p className="text-xs font-medium text-foreground">
                  {DISSECT_STEPS[dissectStep].label.replace(/^\d+\.\s*/, "")}
                </p>
                <p className="text-[11px] leading-relaxed text-muted-foreground">
                  {DISSECT_STEPS[dissectStep].teaching}
                </p>
              </div>
            )}

            {/* Category focus chips */}
            <div className="flex flex-wrap gap-1.5 text-[11px]">
              <span className="text-muted-foreground mr-1 self-center">Focus:</span>
              {([
                { id: "all" as const, label: "All systems" },
                { id: "coronary" as const, label: "Coronary" },
                { id: "conduction" as const, label: "Conduction" },
                { id: "valve" as const, label: "Valves" },
              ]).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setFocusCategory(opt.id)}
                  aria-pressed={focusCategory === opt.id}
                  className={`px-2 py-0.5 rounded-full border transition-colors ${
                    focusCategory === opt.id
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border text-muted-foreground hover:bg-muted/50"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {showLabels && (
              <div className="flex flex-wrap gap-1">
                {categories
                  .filter((cat) => focusCategory === "all" || focusCategory === cat.key)
                  .map((cat) => (
                    <div key={cat.key} className="flex flex-wrap gap-1">
                      {cat.keys.map((k) => (
                        <button
                          key={k}
                          onClick={() => handleSelect(k)}
                          className={`text-xs px-2 py-0.5 rounded-full border transition-colors ${
                            selected === k ? "border-current font-bold" : "border-border text-muted-foreground hover:text-foreground"
                          }`}
                          style={selected === k ? { color: structures[k].color, borderColor: structures[k].color } : {}}
                        >
                          {structures[k].label.split("(")[0].replace("Left ", "L ").replace("Right ", "R ").trim()}
                        </button>
                      ))}
                    </div>
                  ))}
              </div>
            )}

            <div
              className="p-3 rounded-lg border border-border bg-background/80 space-y-1.5"
              style={{ borderLeftWidth: 4, borderLeftColor: info.color }}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="font-semibold text-foreground text-sm">{info.label}</p>
                <span
                  className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded-md"
                  style={{ background: `${info.color}26`, color: info.color }}
                >
                  {categoryLabel}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">Anatomy:</span> {info.detail}
              </p>
              <p className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">Clinical:</span> {info.clinicalNote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardiacAnatomyDiagram;

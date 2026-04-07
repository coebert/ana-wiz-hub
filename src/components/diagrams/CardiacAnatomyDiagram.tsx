import { useState, useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, ThreeEvent } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";

type StructureKey =
  | "lca" | "lad" | "lcx" | "rca" | "pda"
  | "sa-node" | "av-node" | "bundle-his" | "left-bundle" | "right-bundle" | "purkinje"
  | "mitral" | "aortic" | "tricuspid" | "pulmonary";

interface Structure {
  label: string;
  color: string;
  detail: string;
  clinicalNote: string;
  category: "coronary" | "conduction" | "valve";
}

const structures: Record<StructureKey, Structure> = {
  lca: { label: "Left Main Coronary (LMCA)", color: "hsl(0, 65%, 52%)", category: "coronary",
    detail: "Arises from left aortic sinus (of Valsalva). Short trunk (0.5–2 cm) before bifurcating into LAD and LCx. Passes between pulmonary trunk and left atrial appendage.",
    clinicalNote: "Left main stenosis is a surgical emergency — supplies ~75% of LV. 'Widow-maker' if occluded. CABG rather than PCI for significant left main disease." },
  lad: { label: "Left Anterior Descending (LAD)", color: "hsl(350, 60%, 50%)", category: "coronary",
    detail: "Runs in anterior interventricular groove toward apex. Gives septal perforators (supply anterior 2/3 of interventricular septum) and diagonal branches (anterior LV wall).",
    clinicalNote: "Most commonly occluded in MI. Territory: anterior LV wall, apex, anterior septum. ECG: V1–V4 ST elevation. LIMA-to-LAD is the gold standard CABG graft." },
  lcx: { label: "Left Circumflex (LCx)", color: "hsl(20, 65%, 50%)", category: "coronary",
    detail: "Runs in left AV groove posteriorly. Gives obtuse marginal branches to lateral LV wall. In 15% of population, gives the PDA ('left-dominant' circulation).",
    clinicalNote: "Territory: lateral and posterior LV wall. ECG: I, aVL, V5–V6 changes. Circumflex occlusion may be 'ECG-silent' — posterior changes often missed." },
  rca: { label: "Right Coronary Artery (RCA)", color: "hsl(10, 60%, 52%)", category: "coronary",
    detail: "Arises from right aortic sinus. Runs in right AV groove. Supplies RA, RV, SA node (in 60%), AV node (in 85% — right-dominant). Gives acute marginal branches.",
    clinicalNote: "In 85% ('right-dominant'), RCA gives posterior descending artery (PDA). RCA occlusion → inferior MI (II, III, aVF) + RV infarction. May cause bradycardia (SA/AV node supply)." },
  pda: { label: "Posterior Descending (PDA)", color: "hsl(280, 45%, 50%)", category: "coronary",
    detail: "Runs in posterior interventricular groove. Supplies posterior 1/3 of interventricular septum and inferior LV wall. Arises from RCA in 85% (right-dominant), LCx in 15%.",
    clinicalNote: "Dominance defined by which artery gives PDA. Right-dominant (85%): PDA from RCA. Left-dominant (15%): PDA from LCx. Co-dominant: both contribute." },
  "sa-node": { label: "Sinoatrial (SA) Node", color: "hsl(45, 75%, 48%)", category: "conduction",
    detail: "Located at junction of SVC and right atrium (crista terminalis). Primary pacemaker: intrinsic rate 60–100 bpm. Supplied by SA nodal artery (from RCA in 60%, LCx in 40%).",
    clinicalNote: "Sick sinus syndrome if damaged. SA nodal artery at risk during SVC cannulation and Fontan surgery. Automaticity influenced by autonomic tone." },
  "av-node": { label: "Atrioventricular (AV) Node", color: "hsl(55, 70%, 46%)", category: "conduction",
    detail: "Located in triangle of Koch (bounded by tendon of Todaro, coronary sinus ostium, tricuspid annulus). Intrinsic rate 40–60 bpm. Delays conduction 0.1s (PR interval).",
    clinicalNote: "AV node supplied by RCA in 85%. AV block in inferior MI (RCA territory). Only structure allowing atrial-to-ventricular conduction (cardiac skeleton insulates)." },
  "bundle-his": { label: "Bundle of His", color: "hsl(65, 65%, 44%)", category: "conduction",
    detail: "Penetrates the central fibrous body (cardiac skeleton) to reach the ventricular septum. Only electrical connection between atria and ventricles. Short segment (~20 mm).",
    clinicalNote: "Damage during aortic/mitral valve surgery → complete heart block. His bundle pacing is emerging as physiological pacing alternative." },
  "left-bundle": { label: "Left Bundle Branch", color: "hsl(80, 55%, 44%)", category: "conduction",
    detail: "Fans out as a broad sheet on left septal surface. Divides into anterior and posterior fascicles. Anterior fascicle: thin, single blood supply (LAD) — vulnerable. Posterior fascicle: thick, dual supply.",
    clinicalNote: "LBBB: QRS >120ms, broad negative V1, broad positive V6. New LBBB with chest pain = STEMI equivalent. Left anterior hemiblock is most common conduction defect." },
  "right-bundle": { label: "Right Bundle Branch", color: "hsl(100, 50%, 44%)", category: "conduction",
    detail: "Thin, discrete cord running along right side of interventricular septum to the moderator band, then to RV free wall. Single blood supply — relatively vulnerable.",
    clinicalNote: "RBBB: rsR' pattern in V1, wide S in V6. Common after right heart catheterisation or RV surgery. RBBB alone usually benign; with left fascicular block = bifascicular." },
  purkinje: { label: "Purkinje Fibres", color: "hsl(120, 45%, 42%)", category: "conduction",
    detail: "Terminal network of fast-conducting fibres spreading across ventricular endocardium. Conduction velocity 2–4 m/s (fastest in heart). Ensures synchronous ventricular contraction.",
    clinicalNote: "Intrinsic rate 20–40 bpm (escape rhythm). Wide QRS escape rhythm = infra-nodal (His-Purkinje). Purkinje fibres can be arrhythmogenic trigger in VF." },
  mitral: { label: "Mitral Valve", color: "hsl(200, 55%, 50%)", category: "valve",
    detail: "Bicuspid valve between LA and LV. Anterior leaflet larger (covers more orifice area), posterior leaflet longer (greater annular attachment). Supported by anterolateral and posteromedial papillary muscles via chordae tendineae.",
    clinicalNote: "Auscultation: apex (5th ICS, mid-clavicular). Mitral regurgitation: posterior leaflet prolapse most common. LCx artery runs in proximity — at risk during mitral surgery." },
  aortic: { label: "Aortic Valve", color: "hsl(170, 50%, 45%)", category: "valve",
    detail: "Trileaflet semilunar valve (right, left, non-coronary cusps). Coronary arteries arise from right and left sinuses of Valsalva above the cusps. No chordae — supported by annulus.",
    clinicalNote: "Auscultation: right 2nd ICS. Aortic stenosis: most common valve lesion requiring surgery. TAVI via femoral/transapical approach. Calcification progresses with age." },
  tricuspid: { label: "Tricuspid Valve", color: "hsl(260, 45%, 52%)", category: "valve",
    detail: "Three leaflets (anterior, posterior, septal) between RA and RV. Largest valve by annular area. Septal leaflet attached to ventricular septum — offset from mitral (more apical).",
    clinicalNote: "Auscultation: left lower sternal edge. Functional TR common in RV dilatation. AV node lies near septal leaflet — risk during tricuspid surgery. Offset helps identify ventricles on echo." },
  pulmonary: { label: "Pulmonary Valve", color: "hsl(310, 40%, 50%)", category: "valve",
    detail: "Trileaflet semilunar valve at RV outflow tract (infundibulum) — pulmonary trunk junction. Most anterior valve. No coronary arteries arise from pulmonary sinuses.",
    clinicalNote: "Auscultation: left 2nd ICS. Pulmonary stenosis: congenital (tetralogy of Fallot). PA catheter passes through this valve. Ross procedure: pulmonary autograft replaces diseased aortic valve." },
};

const categories = [
  { key: "coronary" as const, label: "Coronary Arteries", keys: ["lca", "lad", "lcx", "rca", "pda"] as StructureKey[] },
  { key: "conduction" as const, label: "Conducting System", keys: ["sa-node", "av-node", "bundle-his", "left-bundle", "right-bundle", "purkinje"] as StructureKey[] },
  { key: "valve" as const, label: "Valves", keys: ["mitral", "aortic", "tricuspid", "pulmonary"] as StructureKey[] },
];

function createHeartShape() {
  const shape = new THREE.Shape();
  // Anatomical heart cross-section (asymmetric, LV bigger)
  shape.moveTo(0, -1.7);
  shape.bezierCurveTo(-0.2, -1.8, -0.8, -1.6, -1.1, -1.0);
  shape.bezierCurveTo(-1.4, -0.4, -1.3, 0.3, -1.1, 0.8);
  shape.bezierCurveTo(-0.9, 1.2, -0.5, 1.5, 0, 1.6);
  shape.bezierCurveTo(0.5, 1.5, 0.9, 1.2, 1.1, 0.8);
  shape.bezierCurveTo(1.3, 0.3, 1.3, -0.4, 1.0, -1.0);
  shape.bezierCurveTo(0.7, -1.6, 0.2, -1.8, 0, -1.7);
  return shape;
}

/** Tube from a catmull-rom curve */
function ArteryTube({
  points,
  color,
  radius = 0.03,
  active,
  onClick,
}: {
  points: [number, number, number][];
  color: string;
  radius?: number;
  active: boolean;
  onClick: () => void;
}) {
  const geo = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p)));
    return new THREE.TubeGeometry(curve, 32, active ? radius * 1.6 : radius, 8, false);
  }, [points, radius, active]);

  return (
    <mesh geometry={geo} onClick={(e: ThreeEvent<MouseEvent>) => { e.stopPropagation(); onClick(); }}>
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={active ? 0.6 : 0.15} roughness={0.4} />
    </mesh>
  );
}

function NodeSphere({
  position,
  color,
  active,
  onClick,
  size = 0.07,
}: {
  position: [number, number, number];
  color: string;
  active: boolean;
  onClick: () => void;
  size?: number;
}) {
  return (
    <mesh position={position} onClick={(e: ThreeEvent<MouseEvent>) => { e.stopPropagation(); onClick(); }}>
      <sphereGeometry args={[active ? size * 1.5 : size, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={active ? 0.8 : 0.2} roughness={0.3} />
    </mesh>
  );
}

function ValveRing({
  position,
  rotation,
  color,
  active,
  onClick,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  color: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <mesh position={position} rotation={rotation} onClick={(e: ThreeEvent<MouseEvent>) => { e.stopPropagation(); onClick(); }}>
      <torusGeometry args={[active ? 0.14 : 0.12, 0.025, 12, 24]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={active ? 0.7 : 0.15} roughness={0.3} transparent opacity={active ? 1 : 0.6} />
    </mesh>
  );
}

function HeartModel({
  selected,
  onSelect,
}: {
  selected: StructureKey;
  onSelect: (k: StructureKey) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);

  // Gentle idle rotation
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
    }
  });

  const heartGeo = useMemo(() => {
    const shape = createHeartShape();
    // Lathe-like extrusion to get 3D shape
    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 1.2,
      bevelEnabled: true,
      bevelThickness: 0.35,
      bevelSize: 0.3,
      bevelSegments: 12,
      curveSegments: 24,
    };
    const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geo.center();
    geo.computeVertexNormals();
    return geo;
  }, []);

  const click = (k: StructureKey) => () => onSelect(k);
  const isActive = (k: StructureKey) => selected === k;

  return (
    <group ref={groupRef} position={[0, 0.2, 0]}>
      {/* Myocardium — outer wall */}
      <mesh geometry={heartGeo}>
        <meshStandardMaterial
          color="hsl(0, 32%, 38%)"
          roughness={0.65}
          metalness={0.05}
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Inner wall hint */}
      <mesh geometry={heartGeo} scale={[0.88, 0.88, 0.88]}>
        <meshStandardMaterial color="hsl(0, 40%, 28%)" roughness={0.8} transparent opacity={0.2} side={THREE.BackSide} />
      </mesh>

      {/* ── Chambers (as translucent inner shapes) ── */}
      {/* Right atrium */}
      <mesh position={[0.45, 0.55, 0]}>
        <sphereGeometry args={[0.38, 16, 16]} />
        <meshStandardMaterial color="hsl(220, 50%, 30%)" transparent opacity={0.22} roughness={0.7} />
      </mesh>
      {/* Left atrium */}
      <mesh position={[-0.45, 0.55, 0]}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color="hsl(0, 50%, 35%)" transparent opacity={0.22} roughness={0.7} />
      </mesh>
      {/* Right ventricle */}
      <mesh position={[0.35, -0.3, 0.15]}>
        <sphereGeometry args={[0.42, 16, 16]} />
        <meshStandardMaterial color="hsl(225, 48%, 28%)" transparent opacity={0.22} roughness={0.7} />
      </mesh>
      {/* Left ventricle (larger, thicker wall) */}
      <mesh position={[-0.35, -0.35, -0.05]}>
        <sphereGeometry args={[0.48, 16, 16]} />
        <meshStandardMaterial color="hsl(0, 55%, 30%)" transparent opacity={0.22} roughness={0.7} />
      </mesh>

      {/* Interventricular septum */}
      <mesh position={[0, -0.25, 0.05]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.06, 0.9, 0.7]} />
        <meshStandardMaterial color="hsl(0, 28%, 35%)" transparent opacity={0.3} roughness={0.7} />
      </mesh>

      {/* ── Great Vessels ── */}
      {/* Aorta */}
      <ArteryTube
        points={[[-0.15, 0.7, 0], [-0.15, 1.1, 0], [0, 1.35, 0], [0.35, 1.3, -0.1], [0.5, 1.1, -0.2]]}
        color="hsl(0, 50%, 45%)" radius={0.1} active={false} onClick={() => {}} />
      {/* Pulmonary trunk */}
      <ArteryTube
        points={[[0.15, 0.65, 0.25], [0.1, 1.0, 0.35], [-0.1, 1.15, 0.3], [-0.35, 1.05, 0.2]]}
        color="hsl(225, 45%, 38%)" radius={0.08} active={false} onClick={() => {}} />
      {/* SVC */}
      <ArteryTube
        points={[[0.5, 1.1, -0.05], [0.55, 1.4, -0.05], [0.5, 1.7, 0]]}
        color="hsl(220, 40%, 40%)" radius={0.07} active={false} onClick={() => {}} />
      {/* IVC */}
      <ArteryTube
        points={[[0.5, -0.5, -0.2], [0.55, -0.8, -0.2], [0.5, -1.1, -0.15]]}
        color="hsl(220, 40%, 40%)" radius={0.07} active={false} onClick={() => {}} />

      {/* ── Coronary arteries ── */}
      {/* LMCA */}
      <ArteryTube
        points={[[-0.15, 0.65, 0.45], [-0.3, 0.5, 0.55], [-0.45, 0.35, 0.55]]}
        color={structures.lca.color} radius={0.035} active={isActive("lca")} onClick={click("lca")} />
      {/* LAD — runs down anterior interventricular groove */}
      <ArteryTube
        points={[[-0.45, 0.35, 0.55], [-0.2, 0.15, 0.65], [-0.05, -0.1, 0.65], [0, -0.5, 0.55], [0, -0.85, 0.35]]}
        color={structures.lad.color} radius={0.03} active={isActive("lad")} onClick={click("lad")} />
      {/* LCx — runs in left AV groove posteriorly */}
      <ArteryTube
        points={[[-0.45, 0.35, 0.55], [-0.65, 0.3, 0.35], [-0.75, 0.15, 0], [-0.7, 0, -0.3], [-0.55, -0.15, -0.45]]}
        color={structures.lcx.color} radius={0.028} active={isActive("lcx")} onClick={click("lcx")} />
      {/* RCA — runs in right AV groove */}
      <ArteryTube
        points={[[0.2, 0.68, 0.4], [0.5, 0.55, 0.45], [0.7, 0.35, 0.3], [0.75, 0.1, 0], [0.65, -0.1, -0.35], [0.45, -0.3, -0.5]]}
        color={structures.rca.color} radius={0.03} active={isActive("rca")} onClick={click("rca")} />
      {/* PDA — posterior descending */}
      <ArteryTube
        points={[[0.45, -0.3, -0.5], [0.25, -0.5, -0.45], [0.05, -0.7, -0.35], [0, -0.85, -0.15]]}
        color={structures.pda.color} radius={0.025} active={isActive("pda")} onClick={click("pda")} />

      {/* ── Valves ── */}
      <ValveRing position={[-0.25, 0.25, 0.05]} rotation={[0.3, 0, 0]} color={structures.mitral.color} active={isActive("mitral")} onClick={click("mitral")} />
      <ValveRing position={[0.2, 0.28, 0.1]} rotation={[0.3, 0, 0]} color={structures.tricuspid.color} active={isActive("tricuspid")} onClick={click("tricuspid")} />
      <ValveRing position={[-0.15, 0.7, 0.05]} rotation={[0.1, 0, 0]} color={structures.aortic.color} active={isActive("aortic")} onClick={click("aortic")} />
      <ValveRing position={[0.15, 0.65, 0.25]} rotation={[0.4, 0.2, 0]} color={structures.pulmonary.color} active={isActive("pulmonary")} onClick={click("pulmonary")} />

      {/* ── Conduction system ── */}
      <NodeSphere position={[0.5, 0.85, 0.05]} color={structures["sa-node"].color} active={isActive("sa-node")} onClick={click("sa-node")} size={0.08} />
      <NodeSphere position={[0.28, 0.22, -0.05]} color={structures["av-node"].color} active={isActive("av-node")} onClick={click("av-node")} size={0.07} />

      {/* Bundle of His */}
      <ArteryTube
        points={[[0.28, 0.22, -0.05], [0.15, 0.1, -0.02], [0.05, 0, 0]]}
        color={structures["bundle-his"].color} radius={0.02} active={isActive("bundle-his")} onClick={click("bundle-his")} />

      {/* Left bundle branch */}
      <ArteryTube
        points={[[0.05, 0, 0], [-0.05, -0.15, -0.02], [-0.1, -0.4, -0.02], [-0.1, -0.7, 0]]}
        color={structures["left-bundle"].color} radius={0.018} active={isActive("left-bundle")} onClick={click("left-bundle")} />

      {/* Right bundle branch */}
      <ArteryTube
        points={[[0.05, 0, 0], [0.1, -0.15, 0.02], [0.15, -0.4, 0.05], [0.15, -0.7, 0.03]]}
        color={structures["right-bundle"].color} radius={0.018} active={isActive("right-bundle")} onClick={click("right-bundle")} />

      {/* Purkinje fibres — spreading network */}
      <NodeSphere position={[-0.1, -0.72, 0]} color={structures.purkinje.color} active={isActive("purkinje")} onClick={click("purkinje")} size={0.05} />
      <NodeSphere position={[0.15, -0.72, 0.03]} color={structures.purkinje.color} active={isActive("purkinje")} onClick={click("purkinje")} size={0.05} />
      {(isActive("purkinje") || isActive("left-bundle") || isActive("right-bundle")) && (
        <>
          {[[-0.25, -0.75, 0.15], [-0.3, -0.6, 0.1], [-0.15, -0.82, -0.1], [0.25, -0.75, 0.15], [0.3, -0.6, 0.12], [0.18, -0.82, -0.1]].map((p, i) => (
            <NodeSphere key={i} position={p as [number, number, number]} color={structures.purkinje.color} active={true} onClick={click("purkinje")} size={0.03} />
          ))}
        </>
      )}

      {/* ── Labels (HTML overlays) ── */}
      <Html position={[0.55, 0.55, 0.2]} center style={{ pointerEvents: "none" }}>
        <span className="text-[9px] text-muted-foreground/40 font-bold italic select-none">RA</span>
      </Html>
      <Html position={[-0.5, 0.55, 0.2]} center style={{ pointerEvents: "none" }}>
        <span className="text-[9px] text-muted-foreground/40 font-bold italic select-none">LA</span>
      </Html>
      <Html position={[0.4, -0.3, 0.4]} center style={{ pointerEvents: "none" }}>
        <span className="text-[9px] text-muted-foreground/40 font-bold italic select-none">RV</span>
      </Html>
      <Html position={[-0.45, -0.35, 0.3]} center style={{ pointerEvents: "none" }}>
        <span className="text-[9px] text-muted-foreground/40 font-bold italic select-none">LV</span>
      </Html>
    </group>
  );
}

const CardiacAnatomyDiagram = () => {
  const [selected, setSelected] = useState<StructureKey>("lad");
  const info = structures[selected];

  return (
    <div className="border border-border rounded-lg p-4 mb-6">
      <h3 className="text-lg font-serif font-bold text-foreground mb-1">Interactive 3D Cardiac Anatomy</h3>
      <p className="text-xs text-muted-foreground mb-3">Drag to rotate · Scroll to zoom · Tap any structure for detail</p>

      <div className="flex flex-col sm:flex-row gap-4 items-start">
        {/* 3D Canvas */}
        <div className="flex-shrink-0 w-full sm:w-[360px] h-[400px] rounded border border-border overflow-hidden bg-gradient-to-b from-background to-secondary/20">
          <Canvas camera={{ position: [0, 0, 3.5], fov: 40 }} dpr={[1, 2]}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[3, 5, 4]} intensity={0.8} />
            <directionalLight position={[-3, -2, -3]} intensity={0.3} color="hsl(220, 60%, 70%)" />
            <pointLight position={[0, 0, 3]} intensity={0.4} color="hsl(0, 40%, 70%)" />
            <Suspense fallback={null}>
              <HeartModel selected={selected} onSelect={setSelected} />
            </Suspense>
            <OrbitControls
              enablePan={false}
              minDistance={2}
              maxDistance={6}
              autoRotate={false}
            />
          </Canvas>
        </div>

        {/* Info panel */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap gap-1 mb-3">
            {categories.map(cat => (
              <div key={cat.key} className="flex flex-wrap gap-1">
                {cat.keys.map(k => (
                  <button
                    key={k}
                    onClick={() => setSelected(k)}
                    className={`text-xs px-2 py-0.5 rounded-full border transition-colors ${selected === k ? 'border-current font-bold' : 'border-border text-muted-foreground hover:text-foreground'}`}
                    style={selected === k ? { color: structures[k].color, borderColor: structures[k].color } : {}}
                  >
                    {structures[k].label.split('(')[0].replace('Left ', 'L ').replace('Right ', 'R ').trim()}
                  </button>
                ))}
              </div>
            ))}
          </div>

          <div className="p-4 rounded-lg border border-border animate-fade-in" key={selected}>
            <p className="font-bold text-sm" style={{ color: info.color }}>{info.label}</p>
            <span className="text-[10px] uppercase tracking-wide text-muted-foreground">{info.category === "coronary" ? "Coronary Artery" : info.category === "conduction" ? "Conducting System" : "Heart Valve"}</span>
            <p className="text-sm text-muted-foreground mt-1">{info.detail}</p>
            <p className="text-xs mt-2 p-2 rounded bg-secondary/50 text-foreground">
              <strong>Clinical:</strong> {info.clinicalNote}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardiacAnatomyDiagram;

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { withAlpha } from "@/lib/color-utils";
import { DiagramToggleBar } from "./DiagramToggleBar";
import { normaliseLevel, findLocalLevel, type CanonicalLevel } from "@/lib/dermatome-sync";
import { DiagramFigure } from "./_shared/DiagramFigure";

interface SpinalLevel {
  id: string;
  level: string;
  region: "cervical" | "thoracic" | "lumbar" | "sacral";
  dermatome: string;
  myotome: string;
  reflex?: string;
  blockRelevance: string;
  color: string;
  // Body map paths (anterior view)
  paths: string[];
  labelY: number;
}

const levels: SpinalLevel[] = [
  { id: "c2", level: "C2", region: "cervical", dermatome: "Occiput, posterior scalp", myotome: "Neck flexion (longus colli)", blockRelevance: "Greater occipital nerve block", color: "hsl(0,60%,55%)", paths: ["M90,22 C86,18 82,16 78,18 C76,20 78,24 82,26 C86,28 90,26 90,22 Z","M110,22 C114,18 118,16 122,18 C124,20 122,24 118,26 C114,28 110,26 110,22 Z"], labelY: 22 },
  { id: "c3", level: "C3", region: "cervical", dermatome: "Lateral neck, posterior auricular", myotome: "Neck lateral flexion, diaphragm (partial)", blockRelevance: "Superficial cervical plexus block", color: "hsl(8,60%,55%)", paths: ["M82,38 C78,36 74,40 76,46 C78,50 84,50 86,46 C88,42 86,40 82,38 Z","M118,38 C122,36 126,40 124,46 C122,50 116,50 114,46 C112,42 114,40 118,38 Z"], labelY: 42 },
  { id: "c4", level: "C4", region: "cervical", dermatome: "Shoulder tip (cape distribution)", myotome: "Shoulder shrug (trapezius), diaphragm", blockRelevance: "Superficial cervical plexus; shoulder surgery", color: "hsl(16,60%,55%)", paths: ["M72,58 C64,60 56,66 52,74 C50,78 56,80 62,76 C68,72 74,66 76,62 C78,60 76,58 72,58 Z","M128,58 C136,60 144,66 148,74 C150,78 144,80 138,76 C132,72 126,66 124,62 C122,60 124,58 128,58 Z"], labelY: 68 },
  { id: "c5", level: "C5", region: "cervical", dermatome: "Lateral arm (regimental badge — deltoid)", myotome: "Shoulder abduction (deltoid), elbow flexion (biceps)", reflex: "Biceps jerk (C5,6)", blockRelevance: "Interscalene block (C5–C6 roots)", color: "hsl(24,65%,55%)", paths: ["M50,82 C44,90 40,100 38,112 C36,120 40,122 46,118 C52,112 56,100 58,90 C60,84 56,80 50,82 Z","M150,82 C156,90 160,100 162,112 C164,120 160,122 154,118 C148,112 144,100 142,90 C140,84 144,80 150,82 Z"], labelY: 100 },
  { id: "c6", level: "C6", region: "cervical", dermatome: "Lateral forearm, thumb, index finger", myotome: "Wrist extensors (ECRL/B), elbow flexion (brachioradialis)", reflex: "Brachioradialis jerk (C5,6)", blockRelevance: "Supraclavicular block", color: "hsl(32,65%,52%)", paths: ["M36,122 C32,136 28,152 24,168 C22,178 20,188 18,198 C16,204 20,206 24,200 C28,190 32,174 36,158 C40,142 42,130 40,122 Z","M164,122 C168,136 172,152 176,168 C178,178 180,188 182,198 C184,204 180,206 176,200 C172,190 168,174 164,158 C160,142 158,130 160,122 Z"], labelY: 160 },
  { id: "c7", level: "C7", region: "cervical", dermatome: "Middle finger (dorsal & palmar)", myotome: "Wrist flexors, finger extensors, elbow extension (triceps)", reflex: "Triceps jerk (C7,8)", blockRelevance: "Supraclavicular / infraclavicular block", color: "hsl(42,60%,50%)", paths: ["M18,198 C16,208 14,216 14,222 C14,226 18,226 20,220 C22,214 22,206 20,200 Z","M182,198 C184,208 186,216 186,222 C186,226 182,226 180,220 C178,214 178,206 180,200 Z"], labelY: 214 },
  { id: "c8", level: "C8", region: "cervical", dermatome: "Medial forearm, ring & little finger", myotome: "Finger flexors (FDP), thumb opposition", blockRelevance: "Infraclavicular / axillary block", color: "hsl(52,55%,48%)", paths: ["M46,118 C50,130 52,146 52,162 C52,178 50,194 48,206 C46,214 42,216 40,210 C38,200 40,182 42,164 C44,146 44,130 44,120 Z","M154,118 C150,130 148,146 148,162 C148,178 150,194 152,206 C154,214 158,216 160,210 C162,200 160,182 158,164 C156,146 156,130 156,120 Z"], labelY: 168 },
  { id: "t1", level: "T1", region: "thoracic", dermatome: "Medial arm (axilla to elbow)", myotome: "Intrinsic hand muscles (interossei, lumbricals)", blockRelevance: "Stellate ganglion block territory", color: "hsl(65,50%,45%)", paths: ["M56,92 C58,100 60,110 60,118 C60,124 56,124 54,120 C52,114 52,104 54,96 Z","M144,92 C142,100 140,110 140,118 C140,124 144,124 146,120 C148,114 148,104 146,96 Z"], labelY: 108 },
  { id: "t2", level: "T2", region: "thoracic", dermatome: "Medial arm, axilla", myotome: "—", blockRelevance: "Intercostobrachial nerve (tourniquet pain)", color: "hsl(80,48%,45%)", paths: ["M76,82 C74,88 72,94 72,100 C72,104 76,104 80,102 C84,100 86,94 86,90 C86,86 82,82 76,82 Z","M124,82 C126,88 128,94 128,100 C128,104 124,104 120,102 C116,100 114,94 114,90 C114,86 118,82 124,82 Z"], labelY: 92 },
  { id: "t4", level: "T4", region: "thoracic", dermatome: "Nipple line (4th intercostal space)", myotome: "—", blockRelevance: "High thoracic epidural; cardiac sympathectomy T1–T4", color: "hsl(100,48%,42%)", paths: ["M76,104 C74,110 72,118 72,126 C72,130 80,132 92,132 C100,132 108,132 116,132 C128,132 130,130 130,126 C130,118 128,110 126,104 Z"], labelY: 118 },
  { id: "t6", level: "T6", region: "thoracic", dermatome: "Xiphisternum / xiphoid process", myotome: "—", blockRelevance: "Mid-thoracic epidural; upper abdominal surgery", color: "hsl(130,45%,42%)", paths: ["M72,132 C70,140 68,148 68,156 C68,160 78,162 92,162 C100,162 110,162 120,162 C132,162 134,160 134,156 C134,148 132,140 130,132 Z"], labelY: 148 },
  { id: "t10", level: "T10", region: "thoracic", dermatome: "Umbilicus", myotome: "Abdominal muscles (partial)", blockRelevance: "TAP block; low thoracic epidural", color: "hsl(170,45%,42%)", paths: ["M68,172 C66,182 66,192 66,200 C66,204 78,206 92,206 C100,206 112,206 124,206 C136,206 138,204 138,200 C138,192 136,182 134,172 Z"], labelY: 190 },
  { id: "t12", level: "T12", region: "thoracic", dermatome: "Inguinal fold / suprapubic", myotome: "Abdominal muscles", blockRelevance: "Subcostal TAP block", color: "hsl(190,48%,42%)", paths: ["M68,206 C66,212 66,218 68,222 C72,226 80,228 92,228 C100,228 112,228 124,228 C132,226 136,222 138,218 C140,214 138,210 136,206 Z"], labelY: 216 },
  { id: "l1", level: "L1", region: "lumbar", dermatome: "Inguinal ligament / groin crease", myotome: "Hip flexion (partial — iliopsoas)", blockRelevance: "Ilioinguinal / iliohypogastric nerve block", color: "hsl(210,55%,52%)", paths: ["M72,228 C70,236 68,242 70,248 C72,252 78,254 84,250 C88,246 88,238 86,232 Z","M128,228 C130,236 132,242 130,248 C128,252 122,254 116,250 C112,246 112,238 114,232 Z"], labelY: 242 },
  { id: "l2", level: "L2", region: "lumbar", dermatome: "Anterior thigh (upper)", myotome: "Hip flexion (iliopsoas), hip adduction", blockRelevance: "Lumbar plexus / fascia iliaca block", color: "hsl(220,52%,52%)", paths: ["M80,254 C78,264 76,274 76,282 C76,288 80,288 84,284 C88,280 90,270 90,260 C90,256 86,254 80,254 Z","M120,254 C122,264 124,274 124,282 C124,288 120,288 116,284 C112,280 110,270 110,260 C110,256 114,254 120,254 Z"], labelY: 270 },
  { id: "l3", level: "L3", region: "lumbar", dermatome: "Anterior knee (patella), medial thigh", myotome: "Knee extension (quadriceps)", reflex: "Knee jerk (L3,4)", blockRelevance: "Femoral nerve block / adductor canal block", color: "hsl(235,50%,55%)", paths: ["M76,288 C74,298 72,308 72,318 C72,326 78,328 84,324 C88,320 90,310 90,300 C90,294 86,290 80,288 Z","M124,288 C126,298 128,308 128,318 C128,326 122,328 116,324 C112,320 110,310 110,300 C110,294 114,290 120,288 Z"], labelY: 308 },
  { id: "l4", level: "L4", region: "lumbar", dermatome: "Medial leg (shin), medial malleolus", myotome: "Ankle dorsiflexion (tibialis anterior)", reflex: "Knee jerk (L3,4)", blockRelevance: "Femoral / saphenous nerve block", color: "hsl(250,48%,55%)", paths: ["M72,328 C70,340 70,352 70,362 C70,370 76,372 82,368 C86,364 86,354 86,344 C86,336 82,330 78,328 Z","M128,328 C130,340 130,352 130,362 C130,370 124,372 118,368 C114,364 114,354 114,344 C114,336 118,330 122,328 Z"], labelY: 350 },
  { id: "l5", level: "L5", region: "lumbar", dermatome: "Dorsum of foot, great toe, lateral calf", myotome: "Great toe extension (EHL), hip abduction", blockRelevance: "Sciatic / common peroneal nerve block", color: "hsl(265,48%,55%)", paths: ["M70,372 C68,380 66,388 66,394 C66,400 72,402 78,398 C82,394 82,386 80,378 C80,374 76,372 70,372 Z","M130,372 C132,380 134,388 134,394 C134,400 128,402 122,398 C118,394 118,386 120,378 C120,374 124,372 130,372 Z"], labelY: 388 },
  { id: "s1", level: "S1", region: "sacral", dermatome: "Lateral foot, sole, posterior calf", myotome: "Ankle plantarflexion (gastrocnemius), ankle eversion (peroneals)", reflex: "Ankle jerk (S1,2)", blockRelevance: "Sciatic / tibial / ankle block; caudal block", color: "hsl(285,45%,52%)", paths: ["M66,398 C64,404 64,410 68,412 C72,414 78,412 80,408 C82,404 80,400 76,398 Z","M134,398 C136,404 136,410 132,412 C128,414 122,412 120,408 C118,404 120,400 124,398 Z"], labelY: 406 },
  { id: "s2-4", level: "S2–4", region: "sacral", dermatome: "Perineum, perianal (saddle area)", myotome: "Pelvic floor, bladder/bowel sphincters", blockRelevance: "Saddle spinal; pudendal nerve block", color: "hsl(310,42%,50%)", paths: ["M90,228 C88,234 88,240 92,242 C96,244 104,244 108,242 C112,240 112,234 110,228 Z"], labelY: 236 },
];

const _regionColors: Record<string, string> = {
  cervical: "text-red-400",
  thoracic: "text-green-400",
  lumbar: "text-blue-400",
  sacral: "text-purple-400",
};

const regionLabels: Record<string, string> = {
  cervical: "Cervical",
  thoracic: "Thoracic",
  lumbar: "Lumbar",
  sacral: "Sacral",
};

interface DermatomeMyotomeDiagramProps {
  /** Optional controlled canonical level (e.g. "T10", "S2-4"). */
  selectedLevel?: CanonicalLevel | null;
  /** Notified on every click with the canonical level (or null when un-mappable). */
  onLevelChange?: (level: CanonicalLevel | null) => void;
}

const DermatomeMyotomeDiagram = ({ selectedLevel, onLevelChange }: DermatomeMyotomeDiagramProps = {}) => {
  const isControlled = selectedLevel !== undefined;
  const [internal, setInternal] = useState<string | null>(null);

  // When controlled: resolve canonical -> local id (e.g. "T10" -> "t10"); when uncontrolled: internal id.
  const selected = isControlled
    ? findLocalLevel(levels, selectedLevel ?? null, "level")?.id ?? null
    : internal;

  const setSelected = (local: string | null) => {
    if (!isControlled) setInternal(local);
    if (local === null) {
      onLevelChange?.(null);
      return;
    }
    const lvl = levels.find((l) => l.id === local);
    onLevelChange?.(lvl ? normaliseLevel(lvl.level) : null);
  };

  const [view, setView] = useState<"map" | "myotomes" | "reflexes">("map");
  const [showLandmarks, setShowLandmarks] = useState(true);
  const [showLabels, setShowLabels] = useState(true);

  const activeLevel = levels.find(l => l.id === selected);
  const accent = activeLevel?.color ?? "hsl(var(--anatomy))";

  return (
    <DiagramFigure
      id="dermatome-myotome-diagram"
      title="Dermatome myotome"
      description="Auto-generated wrapper for the Dermatome myotome anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
                  <div className="my-6 space-y-4">
        <div className="bg-muted/30 rounded-xl border border-border p-4">
          <DiagramToggleBar
            title="Dermatome & Myotome reference"
            subtitle="Tap a body region or spinal level to view dermatome, myotome, reflex and block relevance."
            toggles={[
              { label: "Landmarks", active: showLandmarks, onChange: () => setShowLandmarks((s) => !s) },
              { label: "Labels", active: showLabels, onChange: () => setShowLabels((s) => !s) },
            ]}
          />
  
          <Tabs value={view} onValueChange={(v) => setView(v as typeof view)} className="mb-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="map" className="text-xs">Dermatome Map</TabsTrigger>
              <TabsTrigger value="myotomes" className="text-xs">Myotome Table</TabsTrigger>
              <TabsTrigger value="reflexes" className="text-xs">Reflexes & Levels</TabsTrigger>
            </TabsList>
  
            <TabsContent value="map" className="mt-4">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Body SVG */}
                <div className="flex-shrink-0 mx-auto">
                  <svg viewBox="0 0 200 425" width="220" className="max-w-full">
                    <defs>
                      <radialGradient id="dm-bgShade" cx="50%" cy="45%" r="65%">
                        <stop offset="0%" stopColor="hsl(var(--anatomy))" stopOpacity="0.18" />
                        <stop offset="100%" stopColor="hsl(var(--anatomy))" stopOpacity="0.04" />
                      </radialGradient>
                      <pattern id="dm-tissue" patternUnits="userSpaceOnUse" width="6" height="6">
                        <circle cx="1" cy="1" r="0.4" fill="hsl(var(--muted-foreground))" opacity="0.18" />
                      </pattern>
                      <filter id="dm-shadow" x="-10%" y="-10%" width="120%" height="120%">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="1.2" />
                        <feOffset dx="0" dy="1.2" result="off" />
                        <feComponentTransfer><feFuncA type="linear" slope="0.3" /></feComponentTransfer>
                        <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
                      </filter>
                      <linearGradient id="body-fill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--muted))" stopOpacity="0.1" />
                        <stop offset="100%" stopColor="hsl(var(--muted))" stopOpacity="0.03" />
                      </linearGradient>
                      <linearGradient id="body-skin" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="hsl(var(--muted-foreground))" stopOpacity="0.06" />
                        <stop offset="50%" stopColor="hsl(var(--muted-foreground))" stopOpacity="0.02" />
                        <stop offset="100%" stopColor="hsl(var(--muted-foreground))" stopOpacity="0.06" />
                      </linearGradient>
                    </defs>
  
                    {/* Background depth plate */}
                    <rect x="2" y="2" width="196" height="421" rx="8" fill="url(#dm-bgShade)" stroke="hsl(var(--border))" strokeWidth="0.5" />
  
                    {/* Body outline — improved anatomical proportions */}
                    <g stroke="hsl(var(--muted-foreground))" strokeWidth="0.75" fill="url(#body-fill)" opacity="0.45">
                      {/* Head with jaw/chin */}
                      <path d="M100,8 C115,8 126,16 126,30 C126,40 120,48 112,50 L112,52 C108,56 100,58 92,56 L88,52 L88,50 C80,48 74,40 74,30 C74,16 85,8 100,8 Z" />
                      {/* Neck */}
                      <path d="M88,52 C86,58 84,64 82,68" fill="none" />
                      <path d="M112,52 C114,58 116,64 118,68" fill="none" />
                      {/* Shoulders — more natural slope */}
                      <path d="M82,68 C72,70 62,76 54,84 C48,92 44,102 40,114 C38,122 36,128 36,132" fill="none" />
                      <path d="M118,68 C128,70 138,76 146,84 C152,92 156,102 160,114 C162,122 164,128 164,132" fill="none" />
                      {/* Torso — with waist definition */}
                      <path d="M82,68 C80,78 76,90 74,104 C72,118 70,134 68,150 C66,168 66,186 68,204 C70,218 72,228 74,232" fill="none" />
                      <path d="M118,68 C120,78 124,90 126,104 C128,118 130,134 132,150 C134,168 134,186 132,204 C130,218 128,228 126,232" fill="none" />
                      {/* Arms — upper */}
                      <path d="M36,132 C34,144 30,158 26,172 C22,186 18,200 16,212 C14,220 14,224 14,226" fill="none" />
                      <path d="M52,118 C50,132 48,148 46,162 C44,178 42,194 42,208 C42,216 42,222 44,226" fill="none" />
                      <path d="M164,132 C166,144 170,158 174,172 C178,186 182,200 184,212 C186,220 186,224 186,226" fill="none" />
                      <path d="M148,118 C150,132 152,148 154,162 C156,178 158,194 158,208 C158,216 158,222 156,226" fill="none" />
                      {/* Hands */}
                      <path d="M14,226 C12,230 14,232 22,232 C30,232 36,230 40,228 C42,228 44,228 44,226" fill="none" />
                      <path d="M186,226 C188,230 186,232 178,232 C170,232 164,230 160,228 C158,228 156,228 156,226" fill="none" />
                      {/* Pelvis */}
                      <path d="M74,232 C78,238 84,242 90,244" fill="none" />
                      <path d="M126,232 C122,238 116,242 110,244" fill="none" />
                      {/* Legs — with calf/ankle definition */}
                      <path d="M90,244 C88,258 84,276 82,294 C80,312 78,330 76,348 C74,366 72,382 70,396 C68,406 66,414 66,418" fill="none" />
                      <path d="M98,244 C96,258 94,276 92,294 C92,312 90,330 90,348 C88,366 88,382 86,396 C86,406 84,414 84,418" fill="none" />
                      <path d="M110,244 C112,258 116,276 118,294 C120,312 122,330 124,348 C126,366 128,382 130,396 C132,406 134,414 134,418" fill="none" />
                      <path d="M102,244 C104,258 106,276 108,294 C108,312 110,330 110,348 C112,366 112,382 114,396 C114,406 116,414 116,418" fill="none" />
                      {/* Feet */}
                      <path d="M66,418 C64,420 66,422 74,422 C82,422 84,420 84,418" fill="none" />
                      <path d="M134,418 C136,420 134,422 126,422 C118,422 116,420 116,418" fill="none" />
                    </g>
  
                    {/* Faint anatomical surface detail (under territories) */}
                    <g stroke="hsl(var(--muted-foreground))" fill="none" opacity="0.18" strokeWidth="0.5">
                      {/* Clavicles */}
                      <path d="M82,72 C78,74 72,76 66,78" />
                      <path d="M118,72 C122,74 128,76 134,78" />
                      {/* Pectoralis outline */}
                      <path d="M82,80 C84,88 90,96 96,98 C98,98 100,98 100,96" />
                      <path d="M118,80 C116,88 110,96 104,98 C102,98 100,98 100,96" />
                      {/* Deltoid bulk */}
                      <path d="M64,80 C58,88 54,98 52,108" />
                      <path d="M136,80 C142,88 146,98 148,108" />
                    </g>
  
                    {/* Midline */}
                    <line x1="100" y1="56" x2="100" y2="244" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.15" />
  
                    {/* Dermatome regions — translucent so anatomy reads through */}
                    {levels.map(l => (
                      <g key={l.id}>
                        {l.paths.map((p, i) => (
                          <path
                            key={i}
                            d={p}
                            fill={l.color}
                            fillOpacity={selected === l.id ? 0.55 : 0.28}
                            stroke={l.color}
                            strokeWidth={selected === l.id ? 1.2 : 0.5}
                            strokeOpacity={selected === l.id ? 0.95 : 0.5}
                            strokeDasharray={selected === l.id ? undefined : "3 2"}
                            className="cursor-pointer transition-all duration-200"
                            onClick={() => setSelected(selected === l.id ? null : l.id)}
                          />
                        ))}
                      </g>
                    ))}
  
                    {/* Surface anatomy plate (bones + landmarks) ON TOP of territories */}
                    <g fill="none" stroke="hsl(var(--foreground))" strokeWidth="0.5" opacity="0.6"
                      style={{ pointerEvents: "none" }}>
                      {/* Sternum */}
                      <path d="M100,80 L100,150" strokeWidth="0.75" />
                      <line x1="95" y1="90" x2="105" y2="90" strokeWidth="0.5" />
                      {/* Costal margin */}
                      <path d="M76,150 C90,176 110,184 100,184 C90,184 110,184 124,150" strokeDasharray="2 2" />
                      {/* Ribs subtle */}
                      <path d="M78,108 C90,114 100,116 100,116" strokeWidth="0.5" opacity="0.55" />
                      <path d="M122,108 C110,114 100,116 100,116" strokeWidth="0.5" opacity="0.55" />
                      <path d="M76,128 C90,134 100,136 100,136" strokeWidth="0.5" opacity="0.55" />
                      <path d="M124,128 C110,134 100,136 100,136" strokeWidth="0.5" opacity="0.55" />
                      {/* Nipples (T4) */}
                      <circle cx="90" cy="126" r="1.4" fill="hsl(var(--foreground))" stroke="none" />
                      <circle cx="110" cy="126" r="1.4" fill="hsl(var(--foreground))" stroke="none" />
                      {/* Xiphoid (T6) */}
                      <circle cx="100" cy="150" r="1.2" fill="hsl(var(--foreground))" stroke="none" opacity="0.85" />
                      {/* Umbilicus (T10) */}
                      <circle cx="100" cy="196" r="2.0" strokeWidth="0.75" />
                      {/* ASIS + inguinal ligament */}
                      <circle cx="78" cy="232" r="1.6" fill="hsl(var(--foreground))" stroke="none" opacity="0.9" />
                      <circle cx="122" cy="232" r="1.6" fill="hsl(var(--foreground))" stroke="none" opacity="0.9" />
                      <path d="M78,232 L100,250 L122,232" strokeDasharray="2 2" opacity="0.7" />
                      {/* Patellae */}
                      <ellipse cx="86" cy="324" rx="5" ry="6" />
                      <ellipse cx="114" cy="324" rx="5" ry="6" />
                      {/* Medial malleoli */}
                      <circle cx="84" cy="412" r="1.4" fill="hsl(var(--foreground))" stroke="none" />
                      <circle cx="116" cy="412" r="1.4" fill="hsl(var(--foreground))" stroke="none" />
                    </g>
  
                    {/* Landmark annotations — toggle via showLandmarks */}
                    {showLandmarks && (
                      <g opacity="0.6" fontSize="4" fill="hsl(var(--muted-foreground))" style={{ pointerEvents: "none" }}>
                        <line x1="114" y1="126" x2="136" y2="126" strokeWidth="0.5" stroke="hsl(var(--muted-foreground))" opacity="0.6" />
                        {showLabels && <text x="138" y="128" fontSize="3.5" fontWeight="600">T4 nipple</text>}
                        <line x1="104" y1="150" x2="136" y2="150" strokeWidth="0.5" stroke="hsl(var(--muted-foreground))" opacity="0.5" />
                        {showLabels && <text x="138" y="152" fontSize="3.5">T6 xiphoid</text>}
                        <line x1="104" y1="196" x2="136" y2="196" strokeWidth="0.5" stroke="hsl(var(--muted-foreground))" opacity="0.6" />
                        {showLabels && <text x="138" y="198" fontSize="3.5" fontWeight="600">T10 umbilicus</text>}
                        <line x1="124" y1="232" x2="136" y2="232" strokeWidth="0.5" stroke="hsl(var(--muted-foreground))" opacity="0.5" />
                        {showLabels && <text x="138" y="234" fontSize="3.5">L1 groin / ASIS</text>}
                        <line x1="118" y1="320" x2="136" y2="320" strokeWidth="0.5" stroke="hsl(var(--muted-foreground))" opacity="0.5" />
                        {showLabels && <text x="138" y="322" fontSize="3.5">L3 patella</text>}
                      </g>
                    )}
                  </svg>
                </div>
  
                {/* Spinal level selector + detail */}
                <div className="flex-1 min-w-0 space-y-3">
                  {/* Compact level selector */}
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wide">Select Spinal Level</p>
                    <div className="flex flex-wrap gap-1">
                      {levels.map(l => (
                        <button
                          key={l.id}
                          onClick={() => setSelected(selected === l.id ? null : l.id)}
                          className={`px-1.5 py-0.5 rounded text-xs font-medium transition-colors border ${
                            selected === l.id
                              ? "border-primary bg-primary/20 text-foreground"
                              : "border-border hover:bg-muted/50 text-muted-foreground"
                          }`}
                          style={selected === l.id ? { borderColor: l.color, backgroundColor: withAlpha(l.color, 0.13) } : {}}
                        >
                          {l.level}
                        </button>
                      ))}
                    </div>
                  </div>
  
                  {/* Standardised detail panel with left-border accent */}
                  {activeLevel ? (
                    <div
                      className="p-4 rounded-lg border border-border bg-background/80 animate-fade-in space-y-2"
                      style={{ borderLeftWidth: 4, borderLeftColor: accent }}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-lg font-bold" style={{ color: activeLevel.color }}>{activeLevel.level}</span>
                        <Badge variant="outline" className="text-xs" style={{ borderColor: withAlpha(accent, 0.4), color: accent }}>
                          {regionLabels[activeLevel.region]}
                        </Badge>
                      </div>
  
                      <div>
                        <p className="text-[10px] font-semibold text-foreground uppercase tracking-wide mb-0.5">Dermatome</p>
                        <p className="text-xs text-muted-foreground">{activeLevel.dermatome}</p>
                      </div>
  
                      <div>
                        <p className="text-[10px] font-semibold text-foreground uppercase tracking-wide mb-0.5">Myotome</p>
                        <p className="text-xs text-muted-foreground">{activeLevel.myotome}</p>
                      </div>
  
                      {activeLevel.reflex && (
                        <div>
                          <p className="text-[10px] font-semibold text-foreground uppercase tracking-wide mb-0.5">Reflex</p>
                          <p className="text-xs text-muted-foreground">{activeLevel.reflex}</p>
                        </div>
                      )}
  
                      <div className="pt-2 border-t border-border/50">
                        <p className="text-[10px] font-semibold uppercase tracking-wide mb-0.5" style={{ color: accent }}>Regional Block</p>
                        <p className="text-xs text-muted-foreground">{activeLevel.blockRelevance}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 rounded-lg border border-dashed border-border bg-background/40">
                      <p className="text-xs text-muted-foreground italic">Tap a spinal level button or body region to see dermatome, myotome, reflex and regional block relevance.</p>
                    </div>
                  )}
  
                  {/* Quick landmark key */}
                  <div className="p-3 rounded-lg border border-border/60 bg-muted/20">
                    <p className="text-xs font-semibold text-foreground mb-1">Key Landmarks</p>
                    <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
                      <span>C5 — Deltoid</span><span>T4 — Nipple</span>
                      <span>C6 — Thumb</span><span>T10 — Umbilicus</span>
                      <span>C7 — Middle finger</span><span>L1 — Groin</span>
                      <span>C8 — Little finger</span><span>L3 — Knee</span>
                      <span>T1 — Medial arm</span><span>S1 — Lateral foot</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
  
            <TabsContent value="myotomes" className="mt-4">
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-1.5 text-foreground font-semibold w-12">Level</th>
                      <th className="text-left py-1.5 text-foreground font-semibold">Myotome (Key Muscle)</th>
                      <th className="text-left py-1.5 text-foreground font-semibold">Movement</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    {[
                      { l: "C3,4,5", m: "Diaphragm", a: "Breathing — \"C3,4,5 keeps the diaphragm alive\"" },
                      { l: "C5", m: "Deltoid, Biceps", a: "Shoulder abduction, Elbow flexion" },
                      { l: "C6", m: "Wrist extensors (ECRL)", a: "Wrist extension" },
                      { l: "C7", m: "Triceps, Wrist flexors", a: "Elbow extension, Wrist flexion" },
                      { l: "C8", m: "Finger flexors (FDP)", a: "Finger flexion" },
                      { l: "T1", m: "Hand intrinsics", a: "Finger abduction/adduction" },
                      { l: "L1,2", m: "Iliopsoas", a: "Hip flexion" },
                      { l: "L3,4", m: "Quadriceps", a: "Knee extension" },
                      { l: "L4", m: "Tibialis anterior", a: "Ankle dorsiflexion" },
                      { l: "L5", m: "EHL, Gluteus medius", a: "Great toe extension, Hip abduction" },
                      { l: "S1", m: "Gastrocnemius, Peroneals", a: "Ankle plantarflexion, Eversion" },
                      { l: "S2–4", m: "Pelvic floor", a: "Bladder/bowel sphincters" },
                    ].map((r, i) => (
                      <tr key={i} className="border-b border-border/50">
                        <td className="py-1.5 font-medium text-foreground">{r.l}</td>
                        <td className="py-1.5">{r.m}</td>
                        <td className="py-1.5">{r.a}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-3 p-3 rounded-lg border border-amber-500/20 bg-amber-500/5">
                <p className="text-xs text-amber-400 font-semibold mb-1">⚠ High-Yield Mnemonic</p>
                <p className="text-xs text-muted-foreground">
                  <strong>C3,4,5 keeps the diaphragm alive</strong> (phrenic nerve) — high spinal/epidural above C5 → respiratory arrest.
                  Motor level ascending: L2 hip flexion → L3 knee extension → L4 dorsiflexion → L5 great toe → S1 plantarflexion.
                </p>
              </div>
            </TabsContent>
  
            <TabsContent value="reflexes" className="mt-4">
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-1.5 text-foreground font-semibold">Reflex</th>
                      <th className="text-left py-1.5 text-foreground font-semibold">Root</th>
                      <th className="text-left py-1.5 text-foreground font-semibold">How to Test</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    {[
                      { reflex: "Biceps jerk", root: "C5,6", test: "Tap biceps tendon in antecubital fossa" },
                      { reflex: "Brachioradialis jerk", root: "C5,6", test: "Tap distal radius (supinator)" },
                      { reflex: "Triceps jerk", root: "C7,8", test: "Tap triceps tendon above olecranon" },
                      { reflex: "Knee jerk (patellar)", root: "L3,4", test: "Tap patellar tendon" },
                      { reflex: "Ankle jerk (Achilles)", root: "S1,2", test: "Tap Achilles tendon" },
                      { reflex: "Cremasteric", root: "L1,2", test: "Stroke medial thigh → testicular elevation" },
                      { reflex: "Bulbocavernosus", root: "S3,4", test: "Squeeze glans → anal sphincter contraction" },
                      { reflex: "Anal wink", root: "S4,5", test: "Stroke perianal skin → sphincter contraction" },
                    ].map((r, i) => (
                      <tr key={i} className="border-b border-border/50">
                        <td className="py-1.5 font-medium text-foreground">{r.reflex}</td>
                        <td className="py-1.5">{r.root}</td>
                        <td className="py-1.5">{r.test}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-3 p-3 rounded-lg border border-border bg-muted/20">
                <p className="text-xs font-semibold text-foreground mb-1">Assessing Block Height</p>
                <p className="text-xs text-muted-foreground">
                  Test sensory level with cold spray or sharp/blunt discrimination. Motor assessment: ask patient to lift straight leg (L2), dorsiflex ankle (L4), plantarflex (S1). Loss of reflexes confirms motor block at that level. Bromage scale grades motor block 0–3.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default DermatomeMyotomeDiagram;

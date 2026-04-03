import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

const regionColors: Record<string, string> = {
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

const DermatomeMyotomeDiagram = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [view, setView] = useState<"map" | "myotomes" | "reflexes">("map");

  const activeLevel = levels.find(l => l.id === selected);

  return (
    <Card className="mb-8 border-border bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-serif text-foreground">
          Dermatome & Myotome Reference
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Select a spinal level to view its dermatome, myotome, reflex, and regional block relevance.
        </p>
      </CardHeader>
      <CardContent>
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
                    <linearGradient id="body-fill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--muted))" stopOpacity="0.08" />
                      <stop offset="100%" stopColor="hsl(var(--muted))" stopOpacity="0.02" />
                    </linearGradient>
                  </defs>

                  {/* Body outline */}
                  <g stroke="hsl(var(--muted-foreground))" strokeWidth="0.7" fill="url(#body-fill)" opacity="0.4">
                    <ellipse cx="100" cy="30" rx="18" ry="22" />
                    <path d="M88,50 C86,56 82,62 78,68" />
                    <path d="M112,50 C114,56 118,62 122,68" />
                    <path d="M78,68 C68,72 58,80 52,90 C46,100 42,112 38,125" />
                    <path d="M122,68 C132,72 142,80 148,90 C154,100 158,112 162,125" />
                    <path d="M78,68 C76,80 72,95 70,110 C68,130 66,150 66,170 C66,190 68,210 70,228" />
                    <path d="M122,68 C124,80 128,95 130,110 C132,130 134,150 134,170 C134,190 132,210 130,228" />
                    <path d="M38,125 C34,140 28,158 24,175 C20,192 16,208 14,222" />
                    <path d="M52,125 C50,138 48,155 46,170 C44,188 42,204 42,218" />
                    <path d="M162,125 C166,140 172,158 176,175 C180,192 184,208 186,222" />
                    <path d="M148,125 C150,138 152,155 154,170 C156,188 158,204 158,218" />
                    <path d="M70,228 C72,234 78,240 86,244" />
                    <path d="M130,228 C128,234 122,240 114,244" />
                    <path d="M86,244 C84,264 80,290 78,310 C76,330 74,352 72,372 C70,392 68,406 66,414" />
                    <path d="M96,244 C94,264 92,290 90,310 C90,330 88,352 88,372 C88,392 86,406 84,414" />
                    <path d="M114,244 C116,264 120,290 122,310 C124,330 126,352 128,372 C130,392 132,406 134,414" />
                    <path d="M104,244 C106,264 108,290 110,310 C110,330 112,352 112,372 C112,392 114,406 116,414" />
                    <path d="M66,414 C64,418 66,420 76,420 C84,420 84,418 84,414" />
                    <path d="M134,414 C136,418 134,420 124,420 C116,420 116,418 116,414" />
                  </g>

                  {/* Midline */}
                  <line x1="100" y1="52" x2="100" y2="244" stroke="hsl(var(--muted-foreground))" strokeWidth="0.25" strokeDasharray="2 4" opacity="0.2" />

                  {/* Landmark annotations */}
                  <g opacity="0.3" fontSize="4" fill="hsl(var(--muted-foreground))">
                    <circle cx="88" cy="126" r="1" />
                    <circle cx="112" cy="126" r="1" />
                    <text x="136" y="128" fontSize="3.5">T4 nipple</text>
                    <circle cx="100" cy="196" r="1.5" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.4" />
                    <text x="136" y="198" fontSize="3.5">T10 umbilicus</text>
                  </g>

                  {/* Dermatome regions */}
                  {levels.map(l => (
                    <g key={l.id}>
                      {l.paths.map((p, i) => (
                        <path
                          key={i}
                          d={p}
                          fill={l.color}
                          fillOpacity={selected === l.id ? 0.55 : 0.15}
                          stroke={selected === l.id ? l.color : "transparent"}
                          strokeWidth={selected === l.id ? 1.2 : 0}
                          className="cursor-pointer transition-all duration-200"
                          onClick={() => setSelected(selected === l.id ? null : l.id)}
                        />
                      ))}
                    </g>
                  ))}
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
                        style={selected === l.id ? { borderColor: l.color, backgroundColor: l.color + "22" } : {}}
                      >
                        {l.level}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Detail panel */}
                {activeLevel ? (
                  <div className="p-4 rounded-lg border border-border animate-fade-in space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold" style={{ color: activeLevel.color }}>{activeLevel.level}</span>
                      <Badge variant="outline" className={`text-xs ${regionColors[activeLevel.region]}`}>
                        {regionLabels[activeLevel.region]}
                      </Badge>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-0.5">Dermatome</p>
                      <p className="text-sm text-muted-foreground">{activeLevel.dermatome}</p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-0.5">Myotome</p>
                      <p className="text-sm text-muted-foreground">{activeLevel.myotome}</p>
                    </div>

                    {activeLevel.reflex && (
                      <div>
                        <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-0.5">Reflex</p>
                        <p className="text-sm text-muted-foreground">{activeLevel.reflex}</p>
                      </div>
                    )}

                    <div className="pt-2 border-t border-border/50">
                      <p className="text-xs font-semibold text-amber-400 mb-0.5">Regional Block</p>
                      <p className="text-sm text-muted-foreground">{activeLevel.blockRelevance}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground italic">Tap a spinal level button or body region above</p>
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
      </CardContent>
    </Card>
  );
};

export default DermatomeMyotomeDiagram;

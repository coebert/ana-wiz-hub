import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { withAlpha } from "@/lib/color-utils";

interface DermatomeLevel {
  id: string;
  level: string;
  region: "cervical" | "thoracic" | "lumbar" | "sacral";
  landmark: string;
  blockTarget: string;
  surgicalCoverage: string;
  color: string;
  anteriorPaths: string[];
  posteriorPaths: string[];
}

// Anatomically accurate dermatome territories based on standard clinical dermatome maps
// Viewbox: 0 0 240 520 — proportional human figure
const dermatomes: DermatomeLevel[] = [
  {
    id: "c2", level: "C2", region: "cervical",
    landmark: "Occiput, posterior scalp to vertex",
    blockTarget: "Greater occipital nerve block",
    surgicalCoverage: "Posterior craniotomy positioning",
    color: "hsl(0,60%,55%)",
    anteriorPaths: [
      // Scalp — anterior crescent above ears
      "M107,18 C104,14 100,13 96,13 C88,13 82,16 80,20 C78,24 80,28 85,30 C90,28 95,24 100,22 C105,20 108,20 107,18 Z",
      "M133,18 C136,14 140,13 144,13 C152,13 158,16 160,20 C162,24 160,28 155,30 C150,28 145,24 140,22 C135,20 132,20 133,18 Z",
    ],
    posteriorPaths: [
      // Posterior scalp — large territory
      "M95,10 C100,6 110,4 120,4 C130,4 140,6 145,10 C148,14 148,20 146,26 C142,32 134,36 126,38 C120,40 114,38 108,36 C100,32 94,26 92,20 C91,16 92,12 95,10 Z",
    ],
  },
  {
    id: "c3", level: "C3", region: "cervical",
    landmark: "Lateral neck, supraclavicular fossa",
    blockTarget: "Superficial cervical plexus block",
    surgicalCoverage: "Thyroid, carotid endarterectomy (partial)",
    color: "hsl(10,60%,55%)",
    anteriorPaths: [
      // Anterolateral neck — left
      "M88,42 C84,46 78,52 76,58 C74,62 78,64 82,62 C86,60 90,54 92,48 C93,44 91,42 88,42 Z",
      // Right
      "M152,42 C156,46 162,52 164,58 C166,62 162,64 158,62 C154,60 150,54 148,48 C147,44 149,42 152,42 Z",
    ],
    posteriorPaths: [
      "M100,38 C96,42 90,48 88,54 C86,58 90,60 96,58 C100,56 104,50 106,44 C107,40 104,38 100,38 Z",
      "M140,38 C144,42 150,48 152,54 C154,58 150,60 144,58 C140,56 136,50 134,44 C133,40 136,38 140,38 Z",
    ],
  },
  {
    id: "c4", level: "C4", region: "cervical",
    landmark: "Shoulder tip (cape distribution)",
    blockTarget: "Superficial cervical plexus / interscalene",
    surgicalCoverage: "Shoulder arthroscopy (cutaneous)",
    color: "hsl(20,60%,55%)",
    anteriorPaths: [
      // Cape over shoulder — left
      "M76,64 C68,68 58,76 50,86 C46,92 50,94 56,90 C64,84 72,74 78,68 C80,66 78,64 76,64 Z",
      // Right
      "M164,64 C172,68 182,76 190,86 C194,92 190,94 184,90 C176,84 168,74 162,68 C160,66 162,64 164,64 Z",
    ],
    posteriorPaths: [
      "M94,58 C86,62 74,72 64,82 C58,90 62,94 68,90 C76,84 86,72 94,64 C96,62 96,60 94,58 Z",
      "M146,58 C154,62 166,72 176,82 C182,90 178,94 172,90 C164,84 154,72 146,64 C144,62 144,60 146,58 Z",
    ],
  },
  {
    id: "c5", level: "C5", region: "cervical",
    landmark: "Lateral arm — regimental badge (deltoid)",
    blockTarget: "Interscalene block (C5–C6 roots)",
    surgicalCoverage: "Shoulder surgery, proximal humerus",
    color: "hsl(28,65%,55%)",
    anteriorPaths: [
      // Deltoid region — lateral upper arm — left
      "M48,94 C42,106 38,120 36,136 C34,146 38,148 44,142 C50,134 54,120 56,108 C58,100 54,94 48,94 Z",
      // Right
      "M192,94 C198,106 202,120 204,136 C206,146 202,148 196,142 C190,134 186,120 184,108 C182,100 186,94 192,94 Z",
    ],
    posteriorPaths: [
      "M64,92 C56,104 50,118 46,134 C44,144 48,148 54,142 C62,134 66,120 68,108 C70,100 68,94 64,92 Z",
      "M176,92 C184,104 190,118 194,134 C196,144 192,148 186,142 C178,134 174,120 172,108 C170,100 172,94 176,92 Z",
    ],
  },
  {
    id: "c6", level: "C6", region: "cervical",
    landmark: "Lateral forearm → thumb & index finger",
    blockTarget: "Supraclavicular block",
    surgicalCoverage: "Elbow, lateral forearm surgery",
    color: "hsl(36,65%,52%)",
    anteriorPaths: [
      // Lateral forearm to thumb — left
      "M34,148 C30,164 26,182 22,200 C20,212 18,224 16,236 C14,244 16,248 20,244 C24,238 28,220 32,202 C36,184 38,166 38,152 C38,148 36,146 34,148 Z",
      // Right
      "M206,148 C210,164 214,182 218,200 C220,212 222,224 224,236 C226,244 224,248 220,244 C216,238 212,220 208,202 C204,184 202,166 202,152 C202,148 204,146 206,148 Z",
    ],
    posteriorPaths: [
      "M46,148 C42,164 38,182 34,200 C32,214 30,228 28,240 C26,248 28,250 32,246 C36,238 40,222 44,204 C48,186 50,168 50,154 C50,148 48,146 46,148 Z",
      "M194,148 C198,164 202,182 206,200 C208,214 210,228 212,240 C214,248 212,250 208,246 C204,238 200,222 196,204 C192,186 190,168 190,154 C190,148 192,146 194,148 Z",
    ],
  },
  {
    id: "c7", level: "C7", region: "cervical",
    landmark: "Middle finger (dorsal & palmar)",
    blockTarget: "Supraclavicular / infraclavicular",
    surgicalCoverage: "Hand surgery (middle finger)",
    color: "hsl(46,60%,50%)",
    anteriorPaths: [
      // Middle finger territory — left
      "M16,240 C14,248 12,256 12,262 C12,268 16,270 20,264 C22,258 22,250 20,244 Z",
      // Right
      "M224,240 C226,248 228,256 228,262 C228,268 224,270 220,264 C218,258 218,250 220,244 Z",
    ],
    posteriorPaths: [
      "M28,244 C26,252 24,260 24,266 C24,272 28,274 32,268 C34,262 34,254 32,248 Z",
      "M212,244 C214,252 216,260 216,266 C216,272 212,274 208,268 C206,262 206,254 208,248 Z",
    ],
  },
  {
    id: "c8", level: "C8", region: "cervical",
    landmark: "Medial forearm, ring & little finger",
    blockTarget: "Infraclavicular / axillary block",
    surgicalCoverage: "Ulnar nerve territory surgery",
    color: "hsl(56,55%,48%)",
    anteriorPaths: [
      // Medial forearm — left
      "M56,142 C58,158 58,176 56,194 C54,212 50,230 46,244 C44,250 40,252 38,248 C36,242 40,224 42,206 C44,188 46,168 48,152 C48,146 52,142 56,142 Z",
      // Right
      "M184,142 C182,158 182,176 184,194 C186,212 190,230 194,244 C196,250 200,252 202,248 C204,242 200,224 198,206 C196,188 194,168 192,152 C192,146 188,142 184,142 Z",
    ],
    posteriorPaths: [
      "M60,144 C62,160 62,178 60,196 C58,214 54,232 50,246 C48,252 44,254 42,250 C40,244 44,226 46,208 C48,190 50,170 52,154 C52,148 56,144 60,144 Z",
      "M180,144 C178,160 178,178 180,196 C182,214 186,232 190,246 C192,252 196,254 198,250 C200,244 196,226 194,208 C192,190 190,170 188,154 C188,148 184,144 180,144 Z",
    ],
  },
  {
    id: "t1", level: "T1", region: "thoracic",
    landmark: "Medial arm (axilla to elbow)",
    blockTarget: "Stellate ganglion territory",
    surgicalCoverage: "Intercostobrachial (tourniquet pain)",
    color: "hsl(68,50%,45%)",
    anteriorPaths: [
      // Medial arm — left
      "M60,104 C62,114 64,126 64,136 C64,142 60,144 56,140 C54,134 54,122 56,112 C56,106 58,102 60,104 Z",
      // Right
      "M180,104 C178,114 176,126 176,136 C176,142 180,144 184,140 C186,134 186,122 184,112 C184,106 182,102 180,104 Z",
    ],
    posteriorPaths: [
      "M66,106 C68,116 70,128 70,138 C70,144 66,146 62,142 C60,136 60,124 62,114 C62,108 64,104 66,106 Z",
      "M174,106 C172,116 170,128 170,138 C170,144 174,146 178,142 C180,136 180,124 178,114 C178,108 176,104 174,106 Z",
    ],
  },
  {
    id: "t4", level: "T4", region: "thoracic",
    landmark: "Nipple line (4th intercostal space)",
    blockTarget: "High thoracic epidural / paravertebral",
    surgicalCoverage: "Mastectomy, cardiac surgery (sternotomy)",
    color: "hsl(110,48%,42%)",
    anteriorPaths: [
      // T4 band across chest at nipple line
      "M82,116 C80,124 78,132 78,142 C78,148 86,150 98,150 C110,150 120,150 130,150 C140,150 154,148 162,142 C162,132 160,124 158,116 C150,110 140,108 130,108 C120,108 110,108 100,108 C92,108 86,110 82,116 Z",
    ],
    posteriorPaths: [
      "M88,118 C86,126 84,134 84,144 C84,150 92,152 104,152 C116,152 128,152 140,152 C148,152 156,150 156,144 C156,134 154,126 152,118 C146,112 138,110 128,110 C118,110 108,110 100,110 C94,110 90,112 88,118 Z",
    ],
  },
  {
    id: "t6", level: "T6", region: "thoracic",
    landmark: "Xiphisternum / xiphoid process",
    blockTarget: "Mid-thoracic epidural",
    surgicalCoverage: "Upper abdominal surgery (cholecystectomy)",
    color: "hsl(140,45%,42%)",
    anteriorPaths: [
      "M78,150 C76,160 74,170 74,180 C74,186 84,188 100,188 C116,188 128,188 140,188 C152,186 166,180 166,170 C166,160 164,150 162,148 Z",
    ],
    posteriorPaths: [
      "M84,152 C82,162 80,172 80,182 C80,188 90,190 108,190 C122,190 134,190 146,190 C156,188 160,182 160,172 C160,162 158,152 156,150 Z",
    ],
  },
  {
    id: "t8", level: "T8", region: "thoracic",
    landmark: "Midpoint xiphoid–umbilicus",
    blockTarget: "Thoracic epidural / TAP block",
    surgicalCoverage: "Appendicectomy, open cholecystectomy",
    color: "hsl(160,45%,42%)",
    anteriorPaths: [
      "M74,188 C72,198 70,208 70,216 C70,222 80,224 100,224 C120,224 134,224 148,222 C160,220 170,214 170,206 C170,198 168,188 166,186 Z",
    ],
    posteriorPaths: [
      "M80,190 C78,200 76,210 76,218 C76,224 86,226 106,226 C124,226 138,226 150,224 C160,222 164,216 164,208 C164,200 162,190 160,188 Z",
    ],
  },
  {
    id: "t10", level: "T10", region: "thoracic",
    landmark: "Umbilicus",
    blockTarget: "TAP block / low thoracic epidural",
    surgicalCoverage: "Periumbilical, appendicectomy, hernia repair",
    color: "hsl(185,48%,42%)",
    anteriorPaths: [
      "M70,224 C68,234 66,244 66,252 C66,258 78,260 100,260 C122,260 138,260 152,258 C164,256 174,248 174,240 C174,232 172,224 170,222 Z",
    ],
    posteriorPaths: [
      "M76,226 C74,236 72,246 72,254 C72,260 84,262 106,262 C126,262 142,262 154,260 C164,258 168,252 168,244 C168,236 166,226 164,224 Z",
    ],
  },
  {
    id: "t12", level: "T12", region: "thoracic",
    landmark: "Suprapubic / inguinal fold",
    blockTarget: "Subcostal TAP block",
    surgicalCoverage: "Inguinal hernia (partial), suprapubic",
    color: "hsl(198,48%,42%)",
    anteriorPaths: [
      "M66,260 C64,268 62,276 64,282 C68,286 80,288 100,288 C120,288 136,288 150,286 C158,284 176,276 178,268 C180,260 178,256 176,254 Z",
    ],
    posteriorPaths: [
      "M72,262 C70,270 68,278 70,284 C74,288 86,290 106,290 C126,290 142,290 154,288 C162,286 170,278 172,270 C174,262 172,258 170,256 Z",
    ],
  },
  {
    id: "l1", level: "L1", region: "lumbar",
    landmark: "Inguinal ligament / groin crease",
    blockTarget: "Ilioinguinal / iliohypogastric block",
    surgicalCoverage: "Inguinal hernia repair, orchidopexy",
    color: "hsl(215,55%,52%)",
    anteriorPaths: [
      // Inguinal band — left thigh
      "M74,288 C72,296 70,304 72,310 C76,314 82,316 90,312 C94,308 96,300 94,294 C92,290 86,288 78,288 Z",
      // Right
      "M166,288 C168,296 170,304 168,310 C164,314 158,316 150,312 C146,308 144,300 146,294 C148,290 154,288 162,288 Z",
    ],
    posteriorPaths: [
      "M80,290 C78,298 76,306 78,312 C82,316 88,318 96,314 C100,310 102,302 100,296 C98,292 92,290 86,290 Z",
      "M160,290 C162,298 164,306 162,312 C158,316 152,318 144,314 C140,310 138,302 140,296 C142,292 148,290 154,290 Z",
    ],
  },
  {
    id: "l2", level: "L2", region: "lumbar",
    landmark: "Anterior thigh (upper / medial)",
    blockTarget: "Lumbar plexus / fascia iliaca block",
    surgicalCoverage: "Hip surgery (anterior approach)",
    color: "hsl(225,52%,52%)",
    anteriorPaths: [
      // Anterior upper thigh — left
      "M86,316 C84,328 82,340 80,352 C78,360 82,362 88,358 C92,354 94,342 94,330 C94,322 92,316 88,314 Z",
      // Right
      "M154,316 C156,328 158,340 160,352 C162,360 158,362 152,358 C148,354 146,342 146,330 C146,322 148,316 152,314 Z",
    ],
    posteriorPaths: [
      "M92,318 C90,330 88,342 86,354 C84,362 88,364 94,360 C98,356 100,344 100,332 C100,324 98,318 94,316 Z",
      "M148,318 C150,330 152,342 154,354 C156,362 152,364 146,360 C142,356 140,344 140,332 C140,324 142,318 146,316 Z",
    ],
  },
  {
    id: "l3", level: "L3", region: "lumbar",
    landmark: "Anterior knee (patella), medial thigh",
    blockTarget: "Femoral nerve / adductor canal block",
    surgicalCoverage: "Knee replacement, ACL repair",
    color: "hsl(240,50%,55%)",
    anteriorPaths: [
      // Anterior knee and distal thigh — left
      "M80,362 C78,374 76,386 76,396 C76,406 80,410 88,406 C92,402 94,392 94,382 C94,372 92,364 88,360 Z",
      // Right
      "M160,362 C162,374 164,386 164,396 C164,406 160,410 152,406 C148,402 146,392 146,382 C146,372 148,364 152,360 Z",
    ],
    posteriorPaths: [
      "M86,364 C84,376 82,388 82,398 C82,408 86,412 94,408 C98,404 100,394 100,384 C100,374 98,366 94,362 Z",
      "M154,364 C156,376 158,388 158,398 C158,408 154,412 146,408 C142,404 140,394 140,384 C140,374 142,366 146,362 Z",
    ],
  },
  {
    id: "l4", level: "L4", region: "lumbar",
    landmark: "Medial leg (shin), medial malleolus",
    blockTarget: "Femoral / saphenous nerve block",
    surgicalCoverage: "Medial leg, saphenous vein stripping",
    color: "hsl(252,48%,55%)",
    anteriorPaths: [
      // Medial shin — left
      "M76,410 C74,422 72,434 72,446 C72,456 76,460 84,456 C88,452 90,442 90,432 C90,422 88,414 84,410 Z",
      // Right
      "M164,410 C166,422 168,434 168,446 C168,456 164,460 156,456 C152,452 150,442 150,432 C150,422 152,414 156,410 Z",
    ],
    posteriorPaths: [
      "M82,412 C80,424 78,436 78,448 C78,458 82,462 90,458 C94,454 96,444 96,434 C96,424 94,416 90,412 Z",
      "M158,412 C160,424 162,436 162,448 C162,458 158,462 150,458 C146,454 144,444 144,434 C144,424 146,416 150,412 Z",
    ],
  },
  {
    id: "l5", level: "L5", region: "lumbar",
    landmark: "Dorsum of foot, great toe, lateral calf",
    blockTarget: "Sciatic / common peroneal block",
    surgicalCoverage: "Foot surgery, ankle arthroscopy",
    color: "hsl(268,48%,55%)",
    anteriorPaths: [
      // Dorsum of foot and lateral shin — left
      "M72,460 C70,468 68,476 68,484 C68,490 74,492 82,488 C86,484 86,476 84,468 C84,464 80,460 76,460 Z",
      // Right
      "M168,460 C170,468 172,476 172,484 C172,490 166,492 158,488 C154,484 154,476 156,468 C156,464 160,460 164,460 Z",
    ],
    posteriorPaths: [
      "M78,462 C76,470 74,478 74,486 C74,492 80,494 88,490 C92,486 92,478 90,470 C90,466 86,462 82,462 Z",
      "M162,462 C164,470 166,478 166,486 C166,492 160,494 152,490 C148,486 148,478 150,470 C150,466 154,462 158,462 Z",
    ],
  },
  {
    id: "s1", level: "S1", region: "sacral",
    landmark: "Lateral foot, sole, posterior calf",
    blockTarget: "Sciatic / tibial / ankle block",
    surgicalCoverage: "Lateral ankle, Achilles tendon, sole",
    color: "hsl(290,45%,52%)",
    anteriorPaths: [
      // Lateral foot and sole — left
      "M68,490 C66,496 66,500 70,502 C76,504 84,502 86,498 C88,494 86,490 82,488 Z",
      // Right
      "M172,490 C174,496 174,500 170,502 C164,504 156,502 154,498 C152,494 154,490 158,488 Z",
    ],
    posteriorPaths: [
      "M74,494 C72,498 72,502 76,504 C82,506 90,504 92,500 C94,496 92,492 88,490 Z",
      "M166,494 C168,498 168,502 164,504 C158,506 150,504 148,500 C146,496 148,492 152,490 Z",
    ],
  },
  {
    id: "s2-4", level: "S2–4", region: "sacral",
    landmark: "Perineum, perianal (saddle area)",
    blockTarget: "Saddle spinal / pudendal nerve block / caudal",
    surgicalCoverage: "Perineal surgery, haemorrhoidectomy, obstetric",
    color: "hsl(320,42%,50%)",
    anteriorPaths: [
      // Perineal/saddle area
      "M100,282 C96,288 94,294 98,298 C102,302 108,304 114,302 C120,300 124,296 126,290 C128,286 126,282 122,280 C116,278 108,278 102,280 Z",
    ],
    posteriorPaths: [
      "M106,284 C102,290 100,296 104,302 C108,306 114,308 120,306 C126,304 130,298 132,292 C134,288 132,284 128,282 C122,280 114,280 108,282 Z",
    ],
  },
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

const surgicalLevels = [
  { procedure: "Caesarean section", level: "T4", color: "hsl(110,48%,42%)" },
  { procedure: "Appendicectomy", level: "T8–T10", color: "hsl(160,45%,42%)" },
  { procedure: "Inguinal hernia", level: "T12–L1", color: "hsl(198,48%,42%)" },
  { procedure: "TURP / Cystoscopy", level: "T10", color: "hsl(185,48%,42%)" },
  { procedure: "Hip replacement", level: "T10–L1", color: "hsl(185,48%,42%)" },
  { procedure: "Knee replacement", level: "T12–L3", color: "hsl(198,48%,42%)" },
  { procedure: "Ankle surgery", level: "L4–S1", color: "hsl(252,48%,55%)" },
  { procedure: "Perineal surgery", level: "S2–S4 (saddle)", color: "hsl(320,42%,50%)" },
];

// Anatomically proportional body outline — 240x520 viewbox.
// Two layers: a faint silhouette stroke (drawn UNDER the territories)
// and a stronger surface-anatomy overlay (drawn ON TOP of territories so
// bony landmarks remain readable through the translucent dermatome fills).
const BodySilhouette = ({ view }: { view: "anterior" | "posterior" }) => (
  <g stroke="hsl(var(--muted-foreground))" strokeWidth="0.8" fill="none" opacity="0.45">
    {/* Head — oval with slight jaw */}
    <path d="M104,8 C96,8 88,14 86,24 C84,34 86,42 92,48 C96,52 102,54 108,56 C112,58 118,58 124,56 C130,54 136,52 140,48 C146,42 148,34 146,24 C144,14 136,8 128,8 C120,6 112,6 104,8 Z" />
    {/* Neck */}
    <path d="M108,56 C106,60 102,66 98,70 C94,74 90,78 86,82" />
    <path d="M124,56 C126,60 130,66 134,70 C138,74 142,78 146,82" />
    {/* Shoulders — natural slope */}
    <path d="M86,82 C76,86 64,92 54,100 C46,108 40,118 36,130 C32,142 30,154 28,166" />
    <path d="M146,82 C156,86 168,92 178,100 C186,108 192,118 196,130 C200,142 202,154 204,166" />
    {/* Torso — left side with natural waist */}
    <path d="M86,82 C84,92 80,106 78,120 C76,136 74,154 72,172 C70,190 68,208 66,226 C64,244 64,260 66,274 C68,282 72,288 78,294 C82,298 86,302 90,306" />
    {/* Torso — right side */}
    <path d="M146,82 C148,92 152,106 154,120 C156,136 158,154 160,172 C162,190 164,208 166,226 C168,244 168,260 166,274 C164,282 160,288 154,294 C150,298 146,302 142,306" />
    {/* Left arm — upper */}
    <path d="M36,130 C32,146 28,164 24,182 C20,200 18,218 16,234 C14,244 14,252 16,258" />
    {/* Left arm — inner */}
    <path d="M60,104 C58,118 56,134 54,150 C52,168 50,186 48,204 C46,220 44,236 42,248" />
    {/* Right arm — upper */}
    <path d="M196,130 C200,146 204,164 208,182 C212,200 214,218 216,234 C218,244 218,252 216,258" />
    {/* Right arm — inner */}
    <path d="M172,104 C174,118 176,134 178,150 C180,168 182,186 184,204 C186,220 188,236 190,248" />
    {/* Left hand */}
    <path d="M16,258 C14,264 12,270 14,274 C16,276 20,274 22,268 C24,262 24,256 22,250" />
    <path d="M42,248 C44,254 44,260 42,264 C40,262 38,256 38,250" />
    {/* Right hand */}
    <path d="M216,258 C218,264 220,270 218,274 C216,276 212,274 210,268 C208,262 208,256 210,250" />
    <path d="M190,248 C188,254 188,260 190,264 C192,262 194,256 194,250" />
    {/* Pelvis — iliac crests */}
    <path d="M90,306 C92,310 94,314 96,316" />
    <path d="M142,306 C140,310 138,314 136,316" />
    {/* Left leg — outer */}
    <path d="M90,316 C88,336 84,358 82,378 C80,398 78,418 76,438 C74,456 72,472 70,486 C68,496 68,504 72,508" />
    {/* Left leg — inner */}
    <path d="M104,316 C102,336 100,358 98,378 C96,398 94,418 92,438 C92,456 90,472 88,486 C86,496 86,504 90,508" />
    {/* Right leg — outer */}
    <path d="M142,316 C144,336 148,358 150,378 C152,398 154,418 156,438 C158,456 160,472 162,486 C164,496 164,504 160,508" />
    {/* Right leg — inner */}
    <path d="M128,316 C130,336 132,358 134,378 C136,398 138,418 140,438 C140,456 142,472 144,486 C146,496 146,504 142,508" />
    {/* Left foot */}
    <path d="M72,508 C70,510 68,512 72,514 C78,516 86,514 90,510 C90,508 88,506 86,506" />
    {/* Right foot */}
    <path d="M160,508 C162,510 164,512 160,514 C154,516 146,514 142,510 C142,508 144,506 146,506" />
  </g>
);

// Surface-anatomy overlay (bones + landmarks) — drawn ON TOP of dermatome
// fills so the underlying anatomy is always visible through the territories.
const SurfaceAnatomy = ({ view }: { view: "anterior" | "posterior" }) => (
  <g fill="none" stroke="hsl(var(--foreground))" strokeWidth="0.7" opacity="0.55"
    style={{ pointerEvents: "none" }}>
    {view === "anterior" ? (
      <>
        {/* Clavicles */}
        <path d="M98,82 C88,84 80,86 74,90" />
        <path d="M134,82 C144,84 152,86 158,90" />
        {/* Sternum (manubrium → body → xiphoid) */}
        <path d="M116,90 L116,170" strokeWidth="0.9" />
        <line x1="110" y1="100" x2="122" y2="100" strokeWidth="0.5" opacity="0.7" />
        <circle cx="116" cy="170" r="1.6" fill="hsl(var(--foreground))" stroke="none" opacity="0.8" />
        {/* Costal margin (rib cage) */}
        <path d="M78,168 C92,200 112,210 116,210 C120,210 140,200 154,168" strokeDasharray="2 2" />
        {/* Ribs — subtle hint */}
        <path d="M82,118 C95,124 116,126 116,126" strokeWidth="0.4" opacity="0.45" />
        <path d="M150,118 C137,124 116,126 116,126" strokeWidth="0.4" opacity="0.45" />
        <path d="M80,138 C95,144 116,146 116,146" strokeWidth="0.4" opacity="0.45" />
        <path d="M152,138 C137,144 116,146 116,146" strokeWidth="0.4" opacity="0.45" />
        {/* Nipples (T4) */}
        <circle cx="92" cy="140" r="1.6" fill="hsl(var(--foreground))" stroke="none" opacity="0.8" />
        <circle cx="140" cy="140" r="1.6" fill="hsl(var(--foreground))" stroke="none" opacity="0.8" />
        {/* Umbilicus (T10) */}
        <circle cx="116" cy="238" r="2.4" strokeWidth="0.7" />
        {/* ASIS markers + inguinal ligament */}
        <circle cx="92" cy="298" r="1.8" fill="hsl(var(--foreground))" stroke="none" opacity="0.85" />
        <circle cx="140" cy="298" r="1.8" fill="hsl(var(--foreground))" stroke="none" opacity="0.85" />
        <path d="M92,298 L116,316 L140,298" strokeDasharray="2 2" opacity="0.6" />
        {/* Patellae */}
        <ellipse cx="82" cy="400" rx="5" ry="6" />
        <ellipse cx="150" cy="400" rx="5" ry="6" />
        {/* Medial malleoli */}
        <circle cx="90" cy="500" r="1.6" fill="hsl(var(--foreground))" stroke="none" opacity="0.8" />
        <circle cx="142" cy="500" r="1.6" fill="hsl(var(--foreground))" stroke="none" opacity="0.8" />
      </>
    ) : (
      <>
        {/* Spine */}
        <line x1="116" y1="58" x2="116" y2="290" strokeWidth="0.8" strokeDasharray="2 3" />
        {/* Vertebra prominens (C7) */}
        <circle cx="116" cy="80" r="1.8" fill="hsl(var(--foreground))" stroke="none" opacity="0.85" />
        {/* Scapulae — spine + medial border */}
        <path d="M96,110 C92,120 90,136 94,148 C98,152 104,148 106,140 C108,130 106,118 102,110 Z" />
        <path d="M144,110 C148,120 150,136 146,148 C142,152 136,148 134,140 C132,130 134,118 138,110 Z" />
        <path d="M96,118 L106,118" strokeWidth="0.5" opacity="0.7" />
        <path d="M144,118 L134,118" strokeWidth="0.5" opacity="0.7" />
        {/* Inferior angle of scapula (T7) */}
        <circle cx="100" cy="152" r="1.5" fill="hsl(var(--foreground))" stroke="none" opacity="0.85" />
        <circle cx="140" cy="152" r="1.5" fill="hsl(var(--foreground))" stroke="none" opacity="0.85" />
        {/* Iliac crests (L4) */}
        <path d="M86,268 C92,276 100,280 110,282" strokeWidth="0.9" />
        <path d="M154,268 C148,276 140,280 130,282" strokeWidth="0.9" />
        {/* PSIS dimples */}
        <circle cx="106" cy="290" r="1.4" fill="hsl(var(--foreground))" stroke="none" opacity="0.8" />
        <circle cx="130" cy="290" r="1.4" fill="hsl(var(--foreground))" stroke="none" opacity="0.8" />
        {/* Gluteal fold */}
        <path d="M92,308 C100,314 108,316 116,316 C124,316 132,314 140,308" strokeDasharray="2 2" />
        {/* Popliteal creases */}
        <path d="M76,408 C80,412 86,412 90,408" strokeWidth="0.5" />
        <path d="M142,408 C146,412 152,412 156,408" strokeWidth="0.5" />
      </>
    )}
  </g>
);


const DermatomeMapDiagram = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [bodyView, setBodyView] = useState<"anterior" | "posterior">("anterior");
  const [regionFilter, setRegionFilter] = useState<string | null>(null);

  const activeLevel = dermatomes.find(d => d.id === selected);
  const filteredDermatomes = regionFilter
    ? dermatomes.filter(d => d.region === regionFilter)
    : dermatomes;

  const renderBodySVG = (view: "anterior" | "posterior") => (
    <svg viewBox="0 0 240 520" width="220" className="max-w-full">
      <BodyOutline view={view} />

      {/* Dermatome regions */}
      {filteredDermatomes.map(d => {
        const paths = view === "anterior" ? d.anteriorPaths : d.posteriorPaths;
        const isActive = selected === d.id;
        return (
          <g key={d.id}>
            {paths.map((path, i) => (
              <path
                key={i}
                d={path}
                fill={d.color}
                fillOpacity={isActive ? 0.55 : 0.16}
                stroke={isActive ? d.color : d.color}
                strokeWidth={isActive ? 1.5 : 0.3}
                strokeOpacity={isActive ? 1 : 0.3}
                className="cursor-pointer transition-all duration-200"
                onClick={() => setSelected(selected === d.id ? null : d.id)}
              />
            ))}
          </g>
        );
      })}

      {/* Landmark annotations */}
      <g opacity="0.4" fontSize="4" fill="hsl(var(--muted-foreground))" fontWeight="500">
        {view === "anterior" ? (
          <>
            <text x="150" y="142">← T4 nipple</text>
            <text x="134" y="240">← T10 umbilicus</text>
          </>
        ) : (
          <>
            <text x="158" y="128">← T3 spine of scapula</text>
            <text x="158" y="152">← T7 inf. angle scapula</text>
            <text x="158" y="278">← iliac crest (L4)</text>
          </>
        )}
      </g>

      {/* View label */}
      <text x="120" y="516" textAnchor="middle" fontSize="5.5" fill="hsl(var(--muted-foreground))" opacity="0.45" fontWeight="600" letterSpacing="1.5">
        {view === "anterior" ? "ANTERIOR" : "POSTERIOR"}
      </text>
    </svg>
  );

  return (
    <Card className="mb-8 border-border bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-serif text-foreground">
          Interactive Dermatome Map
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Tap a dermatome region on either view to see its landmark, block target, and surgical coverage. Use filters to isolate regions.
        </p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="map">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="map" className="text-xs">Dermatome Map</TabsTrigger>
            <TabsTrigger value="surgical" className="text-xs">Surgical Levels</TabsTrigger>
          </TabsList>

          <TabsContent value="map" className="mt-4">
            {/* Region filter chips */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              <Badge
                variant={regionFilter === null ? "default" : "outline"}
                className="cursor-pointer text-xs"
                onClick={() => setRegionFilter(null)}
              >
                All
              </Badge>
              {(["cervical", "thoracic", "lumbar", "sacral"] as const).map(r => (
                <Badge
                  key={r}
                  variant={regionFilter === r ? "default" : "outline"}
                  className={`cursor-pointer text-xs ${regionFilter === r ? "" : regionColors[r]}`}
                  onClick={() => setRegionFilter(regionFilter === r ? null : r)}
                >
                  {regionLabels[r]}
                </Badge>
              ))}
            </div>

            {/* View toggle — mobile */}
            <div className="flex gap-2 mb-3 sm:hidden">
              <button
                onClick={() => setBodyView("anterior")}
                className={`flex-1 text-xs py-1.5 rounded border transition-colors ${bodyView === "anterior" ? "bg-primary/20 border-primary text-foreground" : "border-border text-muted-foreground"}`}
              >
                Anterior
              </button>
              <button
                onClick={() => setBodyView("posterior")}
                className={`flex-1 text-xs py-1.5 rounded border transition-colors ${bodyView === "posterior" ? "bg-primary/20 border-primary text-foreground" : "border-border text-muted-foreground"}`}
              >
                Posterior
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-start">
              {/* Body diagrams */}
              <div className="flex gap-2 flex-shrink-0 mx-auto">
                <div className="hidden sm:block">{renderBodySVG("anterior")}</div>
                <div className="hidden sm:block">{renderBodySVG("posterior")}</div>
                <div className="sm:hidden">{renderBodySVG(bodyView)}</div>
              </div>

              {/* Info panel */}
              <div className="flex-1 min-w-0 space-y-3">
                {/* Level selector */}
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wide">Select Level</p>
                  <div className="flex flex-wrap gap-1">
                    {filteredDermatomes.map(d => (
                      <button
                        key={d.id}
                        onClick={() => setSelected(selected === d.id ? null : d.id)}
                        className={`px-1.5 py-0.5 rounded text-xs font-medium transition-colors border ${
                          selected === d.id
                            ? "border-primary bg-primary/20 text-foreground"
                            : "border-border hover:bg-muted/50 text-muted-foreground"
                        }`}
                        style={selected === d.id ? { borderColor: d.color, backgroundColor: withAlpha(d.color, 0.13) } : {}}
                      >
                        {d.level}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Detail */}
                {activeLevel ? (
                  <div className="p-4 rounded-lg border border-border animate-fade-in space-y-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold" style={{ color: activeLevel.color }}>{activeLevel.level}</span>
                      <Badge variant="outline" className={`text-xs ${regionColors[activeLevel.region]}`}>
                        {regionLabels[activeLevel.region]}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-0.5">Clinical Landmark</p>
                      <p className="text-sm text-muted-foreground">{activeLevel.landmark}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-0.5">Block Target</p>
                      <p className="text-sm text-muted-foreground">{activeLevel.blockTarget}</p>
                    </div>
                    <div className="pt-2 border-t border-border/50">
                      <p className="text-xs font-semibold text-amber-400 mb-0.5">Surgical Coverage</p>
                      <p className="text-sm text-muted-foreground">{activeLevel.surgicalCoverage}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground italic">Tap a level or body region to view details</p>
                )}

                {/* Quick landmarks */}
                <div className="p-3 rounded-lg border border-border/60 bg-muted/20">
                  <p className="text-xs font-semibold text-foreground mb-1">Key Sensory Landmarks</p>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
                    <span>C5 — Deltoid badge</span><span>T4 — Nipple</span>
                    <span>C6 — Thumb</span><span>T6 — Xiphoid</span>
                    <span>C7 — Middle finger</span><span>T10 — Umbilicus</span>
                    <span>C8 — Little finger</span><span>L1 — Groin</span>
                    <span>T1 — Medial arm</span><span>L3 — Knee</span>
                    <span>T3 — Spine of scapula</span><span>S1 — Lateral foot</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="surgical" className="mt-4">
            <p className="text-sm text-muted-foreground mb-3">
              Minimum sensory block height required for common surgical procedures under neuraxial anaesthesia.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">Procedure</th>
                    <th className="text-left py-2 text-foreground font-semibold">Min. Block Level</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  {surgicalLevels.map((s, i) => (
                    <tr key={i} className="border-b border-border/50">
                      <td className="py-2">{s.procedure}</td>
                      <td className="py-2 font-medium" style={{ color: s.color }}>{s.level}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-3 rounded-lg border border-amber-500/20 bg-amber-500/5">
              <p className="text-xs text-amber-400 font-semibold mb-1">⚠ Exam Tip</p>
              <p className="text-xs text-muted-foreground">
                <strong>Caesarean section requires T4</strong> (nipple line) to cover peritoneal traction pain.
                Test block height with cold spray or ethyl chloride — check bilaterally.
                Motor block (Bromage scale) does not correlate with sensory level.
                Always test before surgical incision.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DermatomeMapDiagram;

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

const dermatomes: DermatomeLevel[] = [
  {
    id: "c2", level: "C2", region: "cervical",
    landmark: "Occiput, posterior scalp to vertex",
    blockTarget: "Greater occipital nerve block",
    surgicalCoverage: "Posterior craniotomy positioning",
    color: "hsl(0,60%,55%)",
    anteriorPaths: [
      "M88,14 C84,10 80,10 78,14 C76,18 80,22 86,24 C90,26 92,22 92,18 C92,16 90,14 88,14 Z",
      "M112,14 C116,10 120,10 122,14 C124,18 120,22 114,24 C110,26 108,22 108,18 C108,16 110,14 112,14 Z",
    ],
    posteriorPaths: [
      "M82,12 C86,8 94,6 100,6 C106,6 114,8 118,12 C120,16 118,22 114,26 C108,30 92,30 86,26 C82,22 80,16 82,12 Z",
    ],
  },
  {
    id: "c3", level: "C3", region: "cervical",
    landmark: "Lateral neck, supraclavicular fossa",
    blockTarget: "Superficial cervical plexus block",
    surgicalCoverage: "Thyroid, carotid endarterectomy (partial)",
    color: "hsl(10,60%,55%)",
    anteriorPaths: [
      "M80,36 C76,34 72,38 74,44 C76,48 82,50 86,46 C88,42 86,38 80,36 Z",
      "M120,36 C124,34 128,38 126,44 C124,48 118,50 114,46 C112,42 114,38 120,36 Z",
    ],
    posteriorPaths: [
      "M84,34 C80,36 76,42 76,48 C76,52 80,54 86,52 C90,50 92,44 92,40 C92,36 88,34 84,34 Z",
      "M116,34 C120,36 124,42 124,48 C124,52 120,54 114,52 C110,50 108,44 108,40 C108,36 112,34 116,34 Z",
    ],
  },
  {
    id: "c4", level: "C4", region: "cervical",
    landmark: "Shoulder tip (cape distribution)",
    blockTarget: "Superficial cervical plexus / interscalene",
    surgicalCoverage: "Shoulder arthroscopy (cutaneous)",
    color: "hsl(20,60%,55%)",
    anteriorPaths: [
      "M72,56 C64,60 56,66 50,76 C48,80 54,82 60,78 C68,72 74,64 76,60 Z",
      "M128,56 C136,60 144,66 150,76 C152,80 146,82 140,78 C132,72 126,64 124,60 Z",
    ],
    posteriorPaths: [
      "M76,54 C68,58 58,66 52,76 C50,80 56,82 62,78 C70,72 76,62 78,58 Z",
      "M124,54 C132,58 142,66 148,76 C150,80 144,82 138,78 C130,72 124,62 122,58 Z",
    ],
  },
  {
    id: "c5", level: "C5", region: "cervical",
    landmark: "Lateral arm — regimental badge (deltoid)",
    blockTarget: "Interscalene block (C5–C6 roots)",
    surgicalCoverage: "Shoulder surgery, proximal humerus",
    color: "hsl(28,65%,55%)",
    anteriorPaths: [
      "M48,82 C42,92 38,104 36,116 C34,124 38,126 44,120 C50,112 54,100 56,90 C58,84 54,80 48,82 Z",
      "M152,82 C158,92 162,104 164,116 C166,124 162,126 156,120 C150,112 146,100 144,90 C142,84 146,80 152,82 Z",
    ],
    posteriorPaths: [
      "M50,82 C44,92 40,106 38,118 C36,126 42,128 48,122 C54,114 58,100 58,90 C58,84 54,80 50,82 Z",
      "M150,82 C156,92 160,106 162,118 C164,126 158,128 152,122 C146,114 142,100 142,90 C142,84 146,80 150,82 Z",
    ],
  },
  {
    id: "c6", level: "C6", region: "cervical",
    landmark: "Lateral forearm → thumb & index finger",
    blockTarget: "Supraclavicular block",
    surgicalCoverage: "Elbow, lateral forearm surgery",
    color: "hsl(36,65%,52%)",
    anteriorPaths: [
      "M34,126 C30,140 26,156 22,172 C20,182 18,192 16,202 C14,208 18,210 22,204 C26,194 30,178 34,162 C38,146 40,134 38,126 Z",
      "M166,126 C170,140 174,156 178,172 C180,182 182,192 184,202 C186,208 182,210 178,204 C174,194 170,178 166,162 C162,146 160,134 162,126 Z",
    ],
    posteriorPaths: [
      "M36,128 C32,142 28,158 24,174 C22,184 20,194 18,204 C16,210 20,212 24,206 C28,196 32,180 36,164 C40,148 42,136 40,128 Z",
      "M164,128 C168,142 172,158 176,174 C178,184 180,194 182,204 C184,210 180,212 176,206 C172,196 168,180 164,164 C160,148 158,136 160,128 Z",
    ],
  },
  {
    id: "c7", level: "C7", region: "cervical",
    landmark: "Middle finger (dorsal & palmar)",
    blockTarget: "Supraclavicular / infraclavicular",
    surgicalCoverage: "Hand surgery (middle finger)",
    color: "hsl(46,60%,50%)",
    anteriorPaths: [
      "M16,202 C14,210 12,218 12,224 C12,228 16,228 18,222 C20,216 20,208 18,204 Z",
      "M184,202 C186,210 188,218 188,224 C188,228 184,228 182,222 C180,216 180,208 182,204 Z",
    ],
    posteriorPaths: [
      "M18,204 C16,212 14,220 14,226 C14,230 18,230 20,224 C22,218 22,210 20,206 Z",
      "M182,204 C184,212 186,220 186,226 C186,230 182,230 180,224 C178,218 178,210 180,206 Z",
    ],
  },
  {
    id: "c8", level: "C8", region: "cervical",
    landmark: "Medial forearm, ring & little finger",
    blockTarget: "Infraclavicular / axillary block",
    surgicalCoverage: "Ulnar nerve territory surgery",
    color: "hsl(56,55%,48%)",
    anteriorPaths: [
      "M44,120 C48,134 50,150 50,166 C50,182 48,198 46,210 C44,216 40,218 38,212 C36,204 38,186 40,168 C42,150 42,134 42,122 Z",
      "M156,120 C152,134 150,150 150,166 C150,182 152,198 154,210 C156,216 160,218 162,212 C164,204 162,186 160,168 C158,150 158,134 158,122 Z",
    ],
    posteriorPaths: [
      "M48,122 C52,136 54,152 54,168 C54,184 52,200 50,212 C48,218 44,220 42,214 C40,206 42,188 44,170 C46,152 46,136 46,124 Z",
      "M152,122 C148,136 146,152 146,168 C146,184 148,200 150,212 C152,218 156,220 158,214 C160,206 158,188 156,170 C154,152 154,136 154,124 Z",
    ],
  },
  {
    id: "t1", level: "T1", region: "thoracic",
    landmark: "Medial arm (axilla to elbow)",
    blockTarget: "Stellate ganglion territory",
    surgicalCoverage: "Intercostobrachial (tourniquet pain)",
    color: "hsl(68,50%,45%)",
    anteriorPaths: [
      "M56,90 C58,98 60,108 60,118 C60,124 56,124 52,120 C50,114 50,104 52,94 Z",
      "M144,90 C142,98 140,108 140,118 C140,124 144,124 148,120 C150,114 150,104 148,94 Z",
    ],
    posteriorPaths: [
      "M58,90 C60,100 62,110 62,120 C62,126 58,126 54,122 C52,116 52,106 54,96 Z",
      "M142,90 C140,100 138,110 138,120 C138,126 142,126 146,122 C148,116 148,106 146,96 Z",
    ],
  },
  {
    id: "t4", level: "T4", region: "thoracic",
    landmark: "Nipple line (4th intercostal space)",
    blockTarget: "High thoracic epidural / paravertebral",
    surgicalCoverage: "Mastectomy, cardiac surgery (sternotomy)",
    color: "hsl(110,48%,42%)",
    anteriorPaths: [
      "M76,100 C74,108 72,116 72,126 C72,132 80,134 92,134 C100,134 108,134 120,134 C130,132 132,126 132,116 C132,108 130,100 128,96 Z",
    ],
    posteriorPaths: [
      "M78,100 C76,108 74,118 74,128 C74,134 82,136 92,136 C100,136 108,136 120,136 C130,134 132,128 132,118 C132,108 130,100 128,96 Z",
    ],
  },
  {
    id: "t6", level: "T6", region: "thoracic",
    landmark: "Xiphisternum / xiphoid process",
    blockTarget: "Mid-thoracic epidural",
    surgicalCoverage: "Upper abdominal surgery (cholecystectomy)",
    color: "hsl(140,45%,42%)",
    anteriorPaths: [
      "M72,134 C70,142 68,150 68,160 C68,164 78,166 92,166 C100,166 110,166 122,166 C132,164 134,160 134,150 C134,142 132,134 130,132 Z",
    ],
    posteriorPaths: [
      "M74,136 C72,144 70,152 70,162 C70,166 80,168 92,168 C100,168 110,168 122,168 C132,166 134,162 134,152 C134,144 132,136 130,134 Z",
    ],
  },
  {
    id: "t8", level: "T8", region: "thoracic",
    landmark: "Midpoint xiphoid–umbilicus",
    blockTarget: "Thoracic epidural / TAP block",
    surgicalCoverage: "Appendicectomy, open cholecystectomy",
    color: "hsl(160,45%,42%)",
    anteriorPaths: [
      "M68,166 C66,174 66,182 66,188 C66,192 76,194 92,194 C100,194 110,194 124,194 C134,192 136,188 136,182 C136,174 134,166 132,164 Z",
    ],
    posteriorPaths: [
      "M70,168 C68,176 68,184 68,190 C68,194 78,196 92,196 C100,196 110,196 124,196 C134,194 136,190 136,184 C136,176 134,168 132,166 Z",
    ],
  },
  {
    id: "t10", level: "T10", region: "thoracic",
    landmark: "Umbilicus",
    blockTarget: "TAP block / low thoracic epidural",
    surgicalCoverage: "Periumbilical, appendicectomy, hernia repair",
    color: "hsl(185,48%,42%)",
    anteriorPaths: [
      "M66,194 C64,202 64,210 64,216 C64,220 76,222 92,222 C100,222 112,222 126,222 C136,220 138,216 138,210 C138,202 136,194 134,192 Z",
    ],
    posteriorPaths: [
      "M68,196 C66,204 66,212 66,218 C66,222 78,224 92,224 C100,224 112,224 126,224 C136,222 138,218 138,212 C138,204 136,196 134,194 Z",
    ],
  },
  {
    id: "t12", level: "T12", region: "thoracic",
    landmark: "Suprapubic / inguinal fold",
    blockTarget: "Subcostal TAP block",
    surgicalCoverage: "Inguinal hernia (partial), suprapubic",
    color: "hsl(198,48%,42%)",
    anteriorPaths: [
      "M64,222 C62,230 62,236 64,240 C68,244 78,246 92,246 C100,246 112,246 126,246 C134,244 138,240 140,236 C142,230 140,224 138,222 Z",
    ],
    posteriorPaths: [
      "M66,224 C64,232 64,238 66,242 C70,246 80,248 92,248 C100,248 112,248 126,248 C134,246 138,242 140,238 C142,232 140,226 138,224 Z",
    ],
  },
  {
    id: "l1", level: "L1", region: "lumbar",
    landmark: "Inguinal ligament / groin crease",
    blockTarget: "Ilioinguinal / iliohypogastric block",
    surgicalCoverage: "Inguinal hernia repair, orchidopexy",
    color: "hsl(215,55%,52%)",
    anteriorPaths: [
      "M68,246 C66,254 66,260 68,264 C72,268 78,268 84,264 C88,260 88,254 86,248 Z",
      "M132,246 C134,254 134,260 132,264 C128,268 122,268 116,264 C112,260 112,254 114,248 Z",
    ],
    posteriorPaths: [
      "M70,248 C68,256 68,262 70,266 C74,270 80,270 86,266 C90,262 90,256 88,250 Z",
      "M130,248 C132,256 132,262 130,266 C126,270 120,270 114,266 C110,262 110,256 112,250 Z",
    ],
  },
  {
    id: "l2", level: "L2", region: "lumbar",
    landmark: "Anterior thigh (upper / medial)",
    blockTarget: "Lumbar plexus / fascia iliaca block",
    surgicalCoverage: "Hip surgery (anterior approach)",
    color: "hsl(225,52%,52%)",
    anteriorPaths: [
      "M80,268 C78,280 76,292 76,302 C76,308 80,308 84,304 C88,298 90,286 90,276 C90,270 86,268 80,268 Z",
      "M120,268 C122,280 124,292 124,302 C124,308 120,308 116,304 C112,298 110,286 110,276 C110,270 114,268 120,268 Z",
    ],
    posteriorPaths: [
      "M82,270 C80,282 78,294 78,304 C78,310 82,310 86,306 C90,300 92,288 92,278 C92,272 88,270 82,270 Z",
      "M118,270 C120,282 122,294 122,304 C122,310 118,310 114,306 C110,300 108,288 108,278 C108,272 112,270 118,270 Z",
    ],
  },
  {
    id: "l3", level: "L3", region: "lumbar",
    landmark: "Anterior knee (patella), medial thigh",
    blockTarget: "Femoral nerve / adductor canal block",
    surgicalCoverage: "Knee replacement, ACL repair",
    color: "hsl(240,50%,55%)",
    anteriorPaths: [
      "M76,308 C74,320 72,332 72,342 C72,350 78,352 84,348 C88,344 90,332 90,322 C90,314 86,310 80,308 Z",
      "M124,308 C126,320 128,332 128,342 C128,350 122,352 116,348 C112,344 110,332 110,322 C110,314 114,310 120,308 Z",
    ],
    posteriorPaths: [
      "M78,310 C76,322 74,334 74,344 C74,352 80,354 86,350 C90,346 92,334 92,324 C92,316 88,312 82,310 Z",
      "M122,310 C124,322 126,334 126,344 C126,352 120,354 114,350 C110,346 108,334 108,324 C108,316 112,312 118,310 Z",
    ],
  },
  {
    id: "l4", level: "L4", region: "lumbar",
    landmark: "Medial leg (shin), medial malleolus",
    blockTarget: "Femoral / saphenous nerve block",
    surgicalCoverage: "Medial leg, saphenous vein stripping",
    color: "hsl(252,48%,55%)",
    anteriorPaths: [
      "M72,352 C70,364 70,376 70,386 C70,394 76,396 82,392 C86,388 86,376 86,366 C86,358 82,354 78,352 Z",
      "M128,352 C130,364 130,376 130,386 C130,394 124,396 118,392 C114,388 114,376 114,366 C114,358 118,354 122,352 Z",
    ],
    posteriorPaths: [
      "M74,354 C72,366 72,378 72,388 C72,396 78,398 84,394 C88,390 88,378 88,368 C88,360 84,356 80,354 Z",
      "M126,354 C128,366 128,378 128,388 C128,396 122,398 116,394 C112,390 112,378 112,368 C112,360 116,356 120,354 Z",
    ],
  },
  {
    id: "l5", level: "L5", region: "lumbar",
    landmark: "Dorsum of foot, great toe, lateral calf",
    blockTarget: "Sciatic / common peroneal block",
    surgicalCoverage: "Foot surgery, ankle arthroscopy",
    color: "hsl(268,48%,55%)",
    anteriorPaths: [
      "M70,396 C68,404 66,410 66,416 C66,422 72,424 78,420 C82,416 82,408 80,400 Z",
      "M130,396 C132,404 134,410 134,416 C134,422 128,424 122,420 C118,416 118,408 120,400 Z",
    ],
    posteriorPaths: [
      "M72,398 C70,406 68,412 68,418 C68,424 74,426 80,422 C84,418 84,410 82,402 Z",
      "M128,398 C130,406 132,412 132,418 C132,424 126,426 120,422 C116,418 116,410 118,402 Z",
    ],
  },
  {
    id: "s1", level: "S1", region: "sacral",
    landmark: "Lateral foot, sole, posterior calf",
    blockTarget: "Sciatic / tibial / ankle block",
    surgicalCoverage: "Lateral ankle, Achilles tendon, sole",
    color: "hsl(290,45%,52%)",
    anteriorPaths: [
      "M66,422 C64,428 64,432 68,434 C72,436 78,434 80,430 C82,426 80,422 76,420 Z",
      "M134,422 C136,428 136,432 132,434 C128,436 122,434 120,430 C118,426 120,422 124,420 Z",
    ],
    posteriorPaths: [
      "M68,424 C66,430 66,434 70,436 C74,438 80,436 82,432 C84,428 82,424 78,422 Z",
      "M132,424 C134,430 134,434 130,436 C126,438 120,436 118,432 C116,428 118,424 122,422 Z",
    ],
  },
  {
    id: "s2-4", level: "S2–4", region: "sacral",
    landmark: "Perineum, perianal (saddle area)",
    blockTarget: "Saddle spinal / pudendal nerve block / caudal",
    surgicalCoverage: "Perineal surgery, haemorrhoidectomy, obstetric",
    color: "hsl(320,42%,50%)",
    anteriorPaths: [
      "M88,244 C86,250 86,256 90,258 C94,260 100,260 106,260 C110,260 114,258 116,254 C118,250 116,246 114,244 Z",
    ],
    posteriorPaths: [
      "M88,246 C86,254 86,260 90,264 C94,268 100,270 106,268 C110,266 114,260 116,254 C118,248 116,246 114,244 Z",
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

// Common surgical procedures → required dermatome levels
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

const BodyOutline = ({ view }: { view: "anterior" | "posterior" }) => (
  <g stroke="hsl(var(--muted-foreground))" strokeWidth="0.7" fill="none" opacity="0.35">
    {/* Head */}
    <ellipse cx="100" cy="28" rx="18" ry="22" />
    {/* Neck */}
    <path d="M88,48 C86,54 82,60 78,66" />
    <path d="M112,48 C114,54 118,60 122,66" />
    {/* Shoulders */}
    <path d="M78,66 C68,70 58,78 52,88 C46,98 42,110 38,124" />
    <path d="M122,66 C132,70 142,78 148,88 C154,98 158,110 162,124" />
    {/* Torso */}
    <path d="M78,66 C76,78 72,94 70,110 C68,130 66,150 66,170 C66,190 64,210 64,230 C64,240 68,248 76,254" />
    <path d="M122,66 C124,78 128,94 130,110 C132,130 134,150 134,170 C134,190 136,210 136,230 C136,240 132,248 124,254" />
    {/* Arms - left */}
    <path d="M38,124 C34,140 28,158 24,174 C20,192 16,208 14,222" />
    <path d="M52,124 C50,138 48,155 46,170 C44,188 42,204 40,218" />
    {/* Arms - right */}
    <path d="M162,124 C166,140 172,158 176,174 C180,192 184,208 186,222" />
    <path d="M148,124 C150,138 152,155 154,170 C156,188 158,204 160,218" />
    {/* Hands */}
    <path d="M14,222 C12,228 10,234 14,236 C16,234 18,228 20,222" />
    <path d="M40,218 C42,224 42,230 40,232 C38,230 36,224 36,218" />
    <path d="M186,222 C188,228 190,234 186,236 C184,234 182,228 180,222" />
    <path d="M160,218 C158,224 158,230 160,232 C162,230 164,224 164,218" />
    {/* Pelvis */}
    <path d="M76,254 C80,260 84,264 90,266" />
    <path d="M124,254 C120,260 116,264 110,266" />
    {/* Legs - left */}
    <path d="M82,266 C80,286 78,306 76,326 C74,346 72,366 70,386 C68,406 66,422 64,436" />
    <path d="M94,266 C92,286 90,306 88,326 C88,346 86,366 86,386 C86,406 84,422 84,436" />
    {/* Legs - right */}
    <path d="M118,266 C120,286 122,306 124,326 C126,346 128,366 130,386 C132,406 134,422 136,436" />
    <path d="M106,266 C108,286 110,306 112,326 C112,346 114,366 114,386 C114,406 116,422 116,436" />
    {/* Feet */}
    <path d="M64,436 C62,440 64,442 74,442 C82,442 84,440 84,436" />
    <path d="M136,436 C138,440 136,442 126,442 C118,442 116,440 116,436" />
    {/* View-specific markers */}
    {view === "anterior" && (
      <>
        <circle cx="88" cy="126" r="1.2" />
        <circle cx="112" cy="126" r="1.2" />
        <circle cx="100" cy="204" r="1.5" fill="none" strokeWidth="0.4" />
      </>
    )}
    {view === "posterior" && (
      <>
        {/* Spine line */}
        <line x1="100" y1="50" x2="100" y2="248" strokeWidth="0.5" strokeDasharray="1 2" />
        {/* Scapulae */}
        <path d="M80,90 C76,100 76,120 80,130 C84,134 90,130 90,120 C90,110 88,96 84,90 Z" opacity="0.3" />
        <path d="M120,90 C124,100 124,120 120,130 C116,134 110,130 110,120 C110,110 112,96 116,90 Z" opacity="0.3" />
        {/* Iliac crests hint */}
        <path d="M72,230 C78,236 86,238 92,238" opacity="0.3" />
        <path d="M128,230 C122,236 114,238 108,238" opacity="0.3" />
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
    <svg viewBox="0 0 200 450" width="200" className="max-w-full">
      <defs>
        <linearGradient id={`body-bg-${view}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--muted))" stopOpacity="0.06" />
          <stop offset="100%" stopColor="hsl(var(--muted))" stopOpacity="0.01" />
        </linearGradient>
      </defs>

      <BodyOutline view={view} />

      {/* Midline reference */}
      <line x1="100" y1="50" x2="100" y2="260" stroke="hsl(var(--muted-foreground))" strokeWidth="0.2" strokeDasharray="2 4" opacity="0.15" />

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
                fillOpacity={isActive ? 0.6 : 0.18}
                stroke={isActive ? d.color : "transparent"}
                strokeWidth={isActive ? 1.5 : 0}
                className="cursor-pointer transition-all duration-200"
                onClick={() => setSelected(selected === d.id ? null : d.id)}
              />
            ))}
          </g>
        );
      })}

      {/* Landmark annotations */}
      <g opacity="0.35" fontSize="3.5" fill="hsl(var(--muted-foreground))">
        {view === "anterior" ? (
          <>
            <text x="128" y="128">← T4 nipple</text>
            <text x="112" y="206">← T10 umbilicus</text>
          </>
        ) : (
          <>
            <text x="128" y="106">← T3 spine of scapula</text>
            <text x="128" y="138">← T7 inf. angle scapula</text>
            <text x="128" y="238">← iliac crest (L4)</text>
          </>
        )}
      </g>

      {/* View label */}
      <text x="100" y="448" textAnchor="middle" fontSize="5" fill="hsl(var(--muted-foreground))" opacity="0.5" fontWeight="600">
        {view === "anterior" ? "ANTERIOR" : "POSTERIOR"}
      </text>
    </svg>
  );

  return (
    <Card className="mb-8 border-border bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-serif text-foreground">
          Interactive Dermatome Map — Neuraxial Block Assessment
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

            {/* View toggle */}
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
                {/* Mobile: single view; Desktop: both */}
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
                        style={selected === d.id ? { borderColor: d.color, backgroundColor: d.color + "22" } : {}}
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

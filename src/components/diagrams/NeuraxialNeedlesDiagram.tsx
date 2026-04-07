import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

type NeedleKey = "quincke" | "whitacre" | "sprotte" | "tuohy" | "huber" | "pencilpoint-general";

interface NeedleInfo {
  label: string;
  altNames: string;
  type: "cutting" | "pencil-point" | "epidural" | "specialised";
  gauge: string;
  color: string;
  tipDescription: string;
  mechanism: string;
  advantages: string[];
  disadvantages: string[];
  indications: string;
  pdphRisk: string;
  historicalNote: string;
}

const needles: Record<NeedleKey, NeedleInfo> = {
  quincke: {
    label: "Quincke",
    altNames: "Standard cutting spinal needle",
    type: "cutting",
    gauge: "22G, 25G, 27G (25G most common)",
    color: "hsl(0, 60%, 55%)",
    tipDescription: "Bevelled cutting tip with a sharp, medium-length bevel (approx 14°). The bevel cuts through dural fibres cleanly.",
    mechanism: "The sharp bevel CUTS through dural fibres transversely. Longitudinal fibres are severed rather than separated, creating a hole that gapes and leaks CSF.",
    advantages: [
      "Clear CSF flow — larger dural hole gives brisk CSF flashback",
      "Good tactile feedback through tissue planes",
      "Easier to insert (less force required)",
      "Cheaper and widely available",
    ],
    disadvantages: [
      "Higher PDPH rate than pencil-point needles (especially ≤25G)",
      "Dural fibre orientation matters — bevel should be parallel to longitudinal fibres",
      "Larger CSF leak through the cut hole",
    ],
    indications: "Spinal anaesthesia (still widely used). Diagnostic LP. CSF sampling. Preferred when clear CSF flow is critical.",
    pdphRisk: "Higher: ~6-12% with 22G, ~2-4% with 25G, <1% with 27G. Reduced by inserting bevel parallel to dural fibres (longitudinal orientation).",
    historicalNote: "Heinrich Quincke (1891) — pioneered lumbar puncture technique. The original spinal needle design.",
  },
  whitacre: {
    label: "Whitacre",
    altNames: "Pencil-point / conical tip",
    type: "pencil-point",
    gauge: "22G, 25G, 27G (25G most common)",
    color: "hsl(210, 60%, 52%)",
    tipDescription: "Solid, conical (pencil-point) tip with a side-opening port located 2mm proximal to the tip. The tip is completely atraumatic — no cutting edge.",
    mechanism: "The blunt conical tip SEPARATES (parts) dural fibres rather than cutting them. Fibres are pushed aside and spring back together after withdrawal, creating a self-sealing flap valve.",
    advantages: [
      "Significantly lower PDPH rate than Quincke (50-60% reduction)",
      "Dural fibres separate and recoil → self-sealing puncture",
      "Orientation of bevel irrelevant (no cutting edge)",
      "Reduced CSF leak post-procedure",
    ],
    disadvantages: [
      "Slower CSF flow through side port",
      "Slightly more force to insert (blunt tip)",
      "May deflect off midline in tough ligaments",
      "More expensive than Quincke",
    ],
    indications: "Preferred for spinal anaesthesia in young patients, obstetric spinals (low PDPH risk critical). Standard choice in many UK centres.",
    pdphRisk: "Lower: ~0.5-2% with 25G. Gold standard for minimising PDPH. Particularly important in young women (highest risk group).",
    historicalNote: "Hart & Whitacre (1951) — designed to reduce post-LP headache. Now the most widely used spinal needle design in obstetric anaesthesia.",
  },
  sprotte: {
    label: "Sprotte",
    altNames: "Modified pencil-point with elongated aperture",
    type: "pencil-point",
    gauge: "22G, 24G, 25G",
    color: "hsl(160, 50%, 48%)",
    tipDescription: "Pencil-point (atraumatic) tip similar to Whitacre but with a LONGER side-opening aperture (approximately 5–6mm long vs 2mm in Whitacre). The elongated port improves CSF flow.",
    mechanism: "Same principle as Whitacre — blunt tip separates dural fibres. The larger side port gives faster CSF return and easier injection, while still maintaining low PDPH rates.",
    advantages: [
      "Pencil-point benefits (low PDPH) with improved CSF flow",
      "Larger aperture → faster CSF flashback than Whitacre",
      "Good balance between atraumatic tip and functional CSF return",
      "Less risk of tip occlusion by tissue",
    ],
    disadvantages: [
      "Larger aperture may allow asymmetric drug distribution",
      "Slightly more expensive",
      "The longer opening can straddle the dura (partial intrathecal injection)",
      "Less common in some centres — familiarity varies",
    ],
    indications: "Spinal anaesthesia (alternative to Whitacre). Some prefer for combined spinal-epidural (CSE) due to better CSF flow.",
    pdphRisk: "Similar to Whitacre: ~0.5-2% with 24G. Low PDPH profile.",
    historicalNote: "Sprotte (1987) — modified the Whitacre design with an elongated aperture to improve CSF flow while retaining pencil-point advantages.",
  },
  tuohy: {
    label: "Tuohy",
    altNames: "Epidural needle (curved Huber tip)",
    type: "epidural",
    gauge: "16G, 18G (16G most common for epidural catheter insertion)",
    color: "hsl(45, 70%, 48%)",
    tipDescription: "Large-bore needle with a curved (Huber-point) tip angled at approximately 15-30°. The curved bevel directs the epidural catheter laterally and cephalad. Has cm depth markings and lateral wings for grip.",
    mechanism: "The curved tip serves two purposes: (1) provides tactile feedback during loss of resistance — the blunt curve gives a distinct 'pop' through the ligamentum flavum; (2) directs the epidural catheter in the desired direction (typically cephalad).",
    advantages: [
      "Curved tip directs catheter — can aim cephalad or caudad",
      "Excellent tactile feedback for loss of resistance technique",
      "Depth markings allow accurate measurement of skin-to-epidural distance",
      "Wings provide stable grip and controlled advancement",
      "Large bore accepts epidural catheter (20G)",
    ],
    disadvantages: [
      "Large gauge — PDPH rate very high if accidental dural puncture (>50% with 16G)",
      "Not designed for intentional dural puncture (use spinal needle through epidural for CSE)",
      "Curved tip can core tissue if rotated excessively",
      "Heavy and requires practice for subtle tissue feedback",
    ],
    indications: "Epidural anaesthesia and analgesia. Labour analgesia. Postoperative pain management. Combined spinal-epidural (needle-through-needle technique).",
    pdphRisk: "Very high if dural puncture: >50-80% with 16G Tuohy. This is an ACCIDENTAL complication — the Tuohy is NOT designed to puncture the dura. Treat with epidural blood patch.",
    historicalNote: "Edward Tuohy (1945) — modified the Huber-point needle for epidural use. The curved tip was key to allowing catheter threading.",
  },
  huber: {
    label: "Huber Point",
    altNames: "Non-coring curved bevel",
    type: "specialised",
    gauge: "Various (20G-22G for port access; the tip design is used in Tuohy needles)",
    color: "hsl(280, 45%, 52%)",
    tipDescription: "Deflected (curved) bevel point where the tip is bent to one side rather than having a straight cutting edge. The bevel opening faces sideways rather than forward. This design prevents tissue coring.",
    mechanism: "Standard bevelled needles (like Quincke) can punch out a small core of tissue during insertion. The Huber point's deflected tip pushes tissue aside rather than coring it. In port-a-cath access, this prevents damage to the silicone septum.",
    advantages: [
      "Non-coring — preserves port septum integrity (thousands of punctures possible)",
      "Tissue is displaced rather than removed",
      "The principle is incorporated into Tuohy epidural needle design",
      "Reduces tissue plug formation that could cause catheter blockage",
    ],
    disadvantages: [
      "Requires specific orientation for port access",
      "Not suitable for standard venepuncture",
      "More expensive than standard needles",
    ],
    indications: "Primary: accessing implanted ports (port-a-cath) for chemotherapy, TPN, blood sampling. The Huber-point PRINCIPLE is used in Tuohy epidural needles.",
    pdphRisk: "N/A — not typically used for neuraxial procedures directly. The Huber point concept is incorporated into the Tuohy needle.",
    historicalNote: "Ralph Huber (1946) — designed the non-coring deflected point. The curved tip became the basis for Tuohy's epidural needle modification.",
  },
  "pencilpoint-general": {
    label: "Pencil-Point (General)",
    altNames: "Atraumatic / non-cutting spinal needle category",
    type: "pencil-point",
    gauge: "22-27G",
    color: "hsl(120, 45%, 45%)",
    tipDescription: "Collective term for spinal needles with a solid conical tip and side-opening port. Includes Whitacre (short aperture), Sprotte (long aperture), and Gertie Marx (intermediate). All share the atraumatic principle.",
    mechanism: "All pencil-point designs share the same mechanism: the solid conical tip separates dural fibres longitudinally rather than cutting across them. The elastic dural fibres spring back together after the needle is withdrawn.",
    advantages: [
      "50-60% lower PDPH rate than equivalent gauge cutting needles",
      "Self-sealing dural puncture site",
      "No bevel orientation needed",
      "Now the standard of care for obstetric spinal anaesthesia",
    ],
    disadvantages: [
      "Slower CSF return (side port smaller than end-hole)",
      "More insertion force required",
      "Higher cost",
      "May create greater tissue trauma to the deeper layers despite atraumatic dural puncture",
    ],
    indications: "Standard for obstetric spinals. Recommended for all patients at high PDPH risk (young, female, previous PDPH). Increasingly standard for all spinal anaesthesia.",
    pdphRisk: "0.5-2% (25G) vs 3-12% for equivalent cutting needles. The single most important modifiable factor in PDPH prevention (after needle gauge).",
    historicalNote: "The pencil-point concept has reduced obstetric PDPH from ~10% to <1%, making spinal anaesthesia the technique of choice for caesarean section.",
  },
};

const needleOrder: NeedleKey[] = ["quincke", "whitacre", "sprotte", "tuohy", "huber", "pencilpoint-general"];

// SVG needle tip rendering
const NeedleTipSVG = ({ needleKey, isActive }: { needleKey: NeedleKey; isActive: boolean }) => {
  const n = needles[needleKey];
  const opacity = isActive ? 1 : 0.6;

  return (
    <svg viewBox="0 0 160 280" width="140" className="mx-auto">
      <defs>
        <linearGradient id={`shaft-${needleKey}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="hsl(0,0%,70%)" />
          <stop offset="40%" stopColor="hsl(0,0%,85%)" />
          <stop offset="60%" stopColor="hsl(0,0%,88%)" />
          <stop offset="100%" stopColor="hsl(0,0%,72%)" />
        </linearGradient>
        <linearGradient id={`shaftInner-${needleKey}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="hsl(0,0%,60%)" />
          <stop offset="50%" stopColor="hsl(0,0%,75%)" />
          <stop offset="100%" stopColor="hsl(0,0%,62%)" />
        </linearGradient>
      </defs>

      {/* Title */}
      <text x="80" y="16" textAnchor="middle" fontSize="11" fill={n.color} fontWeight="bold" opacity={opacity}>{n.label}</text>
      <text x="80" y="28" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))" opacity={0.6}>{n.type === "cutting" ? "Cutting tip" : n.type === "pencil-point" ? "Pencil-point (atraumatic)" : n.type === "epidural" ? "Epidural needle" : "Non-coring point"}</text>

      {/* Needle shaft */}
      <rect x="62" y="38" width="36" height="180" rx="2" fill={`url(#shaft-${needleKey})`} opacity={opacity * 0.85} />
      {/* Lumen */}
      <rect x="72" y="38" width="16" height="180" rx="1" fill={`url(#shaftInner-${needleKey})`} opacity={opacity * 0.25} />
      {/* Depth markings */}
      {[0, 1, 2, 3, 4, 5].map(i => (
        <g key={i} opacity={opacity * 0.3}>
          <line x1="62" y1={58 + i * 28} x2="68" y2={58 + i * 28} stroke="hsl(0,0%,40%)" strokeWidth="1" />
          <line x1="92" y1={58 + i * 28} x2="98" y2={58 + i * 28} stroke="hsl(0,0%,40%)" strokeWidth="1" />
        </g>
      ))}

      {/* Needle tip — specific to each type */}
      {needleKey === "quincke" && (
        <g opacity={opacity}>
          {/* Cutting bevel — angled sharp point */}
          <path d="M62,218 L62,248 L80,268 L98,248 L98,218 Z" fill={`url(#shaft-${needleKey})`} stroke="hsl(0,0%,55%)" strokeWidth="0.8" />
          {/* Bevel face */}
          <path d="M62,248 L80,268 L98,248" fill="none" stroke={n.color} strokeWidth="1.5" />
          {/* Sharp tip indicator */}
          <circle cx="80" cy="268" r="1.5" fill={n.color} />
          {/* Lumen opening at bevel */}
          <ellipse cx="80" cy="252" rx="6" ry="8" fill="hsl(0,0%,30%)" opacity="0.25" />
          {/* Bevel angle annotation */}
          <path d="M102,248 L112,248" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" opacity="0.5" />
          <path d="M102,268 L112,258" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" opacity="0.5" />
          <text x="116" y="256" fontSize="6" fill="hsl(var(--muted-foreground))" opacity="0.6">~14° bevel</text>
          {/* Label */}
          <text x="80" y="278" textAnchor="middle" fontSize="6.5" fill={n.color} fontWeight="600">Sharp cutting bevel</text>
          {/* Fibre interaction */}
          <g opacity="0.5">
            <text x="40" y="252" textAnchor="end" fontSize="5" fill="hsl(var(--muted-foreground))">Cuts dural</text>
            <text x="40" y="258" textAnchor="end" fontSize="5" fill="hsl(var(--muted-foreground))">fibres ✂️</text>
          </g>
        </g>
      )}

      {needleKey === "whitacre" && (
        <g opacity={opacity}>
          {/* Conical pencil-point tip */}
          <path d="M62,218 L62,252 Q62,262 72,268 L80,272 L88,268 Q98,262 98,252 L98,218 Z" fill={`url(#shaft-${needleKey})`} stroke="hsl(0,0%,55%)" strokeWidth="0.8" />
          {/* Solid tip — no opening */}
          <path d="M72,268 L80,272 L88,268" fill="hsl(0,0%,65%)" stroke="hsl(0,0%,50%)" strokeWidth="1" />
          <circle cx="80" cy="272" r="1.2" fill="hsl(0,0%,55%)" />
          {/* Side port — small aperture */}
          <ellipse cx="60" cy="244" rx="3" ry="5" fill="hsl(0,0%,25%)" opacity="0.35" />
          <path d="M57,244 L50,244" stroke={n.color} strokeWidth="1" opacity="0.7" />
          <text x="48" y="241" textAnchor="end" fontSize="5.5" fill={n.color}>Side port</text>
          <text x="48" y="248" textAnchor="end" fontSize="5" fill="hsl(var(--muted-foreground))" opacity="0.7">(~2mm)</text>
          {/* Solid tip label */}
          <text x="80" y="280" textAnchor="middle" fontSize="6.5" fill={n.color} fontWeight="600">Solid conical tip</text>
          {/* Fibre interaction */}
          <g opacity="0.5">
            <text x="120" y="258" fontSize="5" fill="hsl(var(--muted-foreground))">Separates</text>
            <text x="120" y="264" fontSize="5" fill="hsl(var(--muted-foreground))">fibres ↔</text>
          </g>
        </g>
      )}

      {needleKey === "sprotte" && (
        <g opacity={opacity}>
          {/* Pencil-point tip similar to Whitacre */}
          <path d="M62,218 L62,252 Q62,262 72,268 L80,272 L88,268 Q98,262 98,252 L98,218 Z" fill={`url(#shaft-${needleKey})`} stroke="hsl(0,0%,55%)" strokeWidth="0.8" />
          <path d="M72,268 L80,272 L88,268" fill="hsl(0,0%,65%)" stroke="hsl(0,0%,50%)" strokeWidth="1" />
          <circle cx="80" cy="272" r="1.2" fill="hsl(0,0%,55%)" />
          {/* Large elongated side port */}
          <ellipse cx="59" cy="240" rx="3.5" ry="12" fill="hsl(0,0%,25%)" opacity="0.35" />
          <path d="M55,240 L44,240" stroke={n.color} strokeWidth="1" opacity="0.7" />
          <text x="42" y="236" textAnchor="end" fontSize="5.5" fill={n.color}>Large side port</text>
          <text x="42" y="244" textAnchor="end" fontSize="5" fill="hsl(var(--muted-foreground))" opacity="0.7">(~5-6mm)</text>
          {/* Comparison bracket */}
          <line x1="54" y1="228" x2="54" y2="252" stroke={n.color} strokeWidth="0.8" opacity="0.5" />
          <line x1="52" y1="228" x2="56" y2="228" stroke={n.color} strokeWidth="0.8" opacity="0.5" />
          <line x1="52" y1="252" x2="56" y2="252" stroke={n.color} strokeWidth="0.8" opacity="0.5" />
          <text x="80" y="280" textAnchor="middle" fontSize="6.5" fill={n.color} fontWeight="600">Elongated aperture tip</text>
        </g>
      )}

      {needleKey === "tuohy" && (
        <g opacity={opacity}>
          {/* Curved Huber-point bevel */}
          <path d="M62,218 L62,250 Q62,258 66,262 Q72,268 80,268 Q88,264 92,258 L98,250 L98,218 Z" fill={`url(#shaft-${needleKey})`} stroke="hsl(0,0%,55%)" strokeWidth="0.8" />
          {/* Curved tip — the key feature */}
          <path d="M62,250 Q62,258 66,262 Q72,268 80,268" fill="none" stroke={n.color} strokeWidth="2" />
          {/* Lumen opening at curve */}
          <path d="M66,256 Q72,262 80,264 Q84,260 84,254" fill="hsl(0,0%,25%)" opacity="0.3" />
          {/* Direction arrow — catheter exit */}
          <path d="M80,268 C84,262 88,254 92,244" stroke={n.color} strokeWidth="1" strokeDasharray="3 2" opacity="0.6" fill="none" />
          <text x="100" y="244" fontSize="5.5" fill={n.color} opacity="0.7">Catheter</text>
          <text x="100" y="250" fontSize="5.5" fill={n.color} opacity="0.7">direction ↗</text>
          {/* Wings */}
          <rect x="42" y="40" width="20" height="8" rx="2" fill="hsl(0,0%,75%)" opacity="0.4" />
          <rect x="98" y="40" width="20" height="8" rx="2" fill="hsl(0,0%,75%)" opacity="0.4" />
          <text x="80" y="48" textAnchor="middle" fontSize="5" fill="hsl(var(--muted-foreground))" opacity="0.5">Wings</text>
          <text x="80" y="278" textAnchor="middle" fontSize="6.5" fill={n.color} fontWeight="600">Curved Huber-point tip</text>
          {/* Gauge annotation */}
          <text x="40" y="268" textAnchor="end" fontSize="5" fill="hsl(var(--muted-foreground))" opacity="0.5">16G (large bore)</text>
        </g>
      )}

      {needleKey === "huber" && (
        <g opacity={opacity}>
          {/* Deflected bevel — key difference from standard bevel */}
          <path d="M62,218 L62,250 L68,260 L80,266 L92,256 L98,248 L98,218 Z" fill={`url(#shaft-${needleKey})`} stroke="hsl(0,0%,55%)" strokeWidth="0.8" />
          {/* Deflected tip face */}
          <path d="M62,250 L68,260 L80,266" fill="none" stroke={n.color} strokeWidth="2" />
          {/* Non-coring illustration */}
          <path d="M80,266 L92,256" fill="none" stroke="hsl(0,0%,50%)" strokeWidth="1.5" />
          {/* Septum illustration */}
          <rect x="55" y="240" width="50" height="6" rx="1" fill="hsl(var(--muted-foreground))" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" strokeDasharray="3 2" opacity="0.12" />
          <text x="130" y="244" fontSize="5" fill="hsl(var(--muted-foreground))" opacity="0.5">Port septum</text>
          <text x="80" y="278" textAnchor="middle" fontSize="6.5" fill={n.color} fontWeight="600">Deflected non-coring tip</text>
          <g opacity="0.5">
            <text x="40" y="262" textAnchor="end" fontSize="5" fill="hsl(var(--muted-foreground))">Displaces,</text>
            <text x="40" y="268" textAnchor="end" fontSize="5" fill="hsl(var(--muted-foreground))">doesn't core</text>
          </g>
        </g>
      )}

      {needleKey === "pencilpoint-general" && (
        <g opacity={opacity}>
          {/* Generic pencil-point */}
          <path d="M62,218 L62,252 Q62,262 72,268 L80,272 L88,268 Q98,262 98,252 L98,218 Z" fill={`url(#shaft-${needleKey})`} stroke="hsl(0,0%,55%)" strokeWidth="0.8" />
          <circle cx="80" cy="272" r="1.2" fill="hsl(0,0%,55%)" />
          {/* Dural fibre interaction diagram */}
          {/* Fibres before */}
          <g opacity="0.6">
            {[-20, -14, -8, 8, 14, 20].map((dy, i) => (
              <line key={i} x1="30" y1={250 + dy} x2="50" y2={250 + dy} stroke="hsl(270, 30%, 55%)" strokeWidth="0.8" />
            ))}
            <text x="40" y="276" textAnchor="middle" fontSize="5" fill="hsl(270, 30%, 55%)">Dural fibres</text>
            <text x="40" y="282" textAnchor="middle" fontSize="5" fill="hsl(270, 30%, 55%)">(intact)</text>
          </g>
          {/* Fibres after — separated and sprung back */}
          <g opacity="0.6">
            {[-20, -14, -8, 8, 14, 20].map((dy, i) => (
              <line key={i} x1="110" y1={250 + dy} x2="130" y2={250 + dy} stroke="hsl(270, 30%, 55%)" strokeWidth="0.8" />
            ))}
            <text x="120" y="276" textAnchor="middle" fontSize="5" fill="hsl(270, 30%, 55%)">After withdrawal</text>
            <text x="120" y="282" textAnchor="middle" fontSize="5" fill="hsl(270, 30%, 55%)">(fibres recoil)</text>
          </g>
          <text x="80" y="280" textAnchor="middle" fontSize="6" fill={n.color} fontWeight="600">Self-sealing mechanism</text>
        </g>
      )}
    </svg>
  );
};

// Cross-section comparison
const CrossSectionComparison = () => (
  <div className="p-3 rounded-lg border border-border bg-secondary/20">
    <p className="text-xs font-semibold text-foreground mb-2">Dural Puncture Comparison</p>
    <svg viewBox="0 0 300 100" width="280" className="mx-auto">
      {/* Cutting needle dural hole */}
      <g>
        <text x="75" y="14" textAnchor="middle" fontSize="8" fill="hsl(0, 60%, 55%)" fontWeight="bold">Cutting (Quincke)</text>
        {/* Dural fibres — cut */}
        {[-18, -12, -6, 0, 6, 12, 18].map((dy, i) => (
          <g key={i}>
            <line x1="30" y1={50 + dy} x2="60" y2={50 + dy} stroke="hsl(270, 30%, 55%)" strokeWidth="1.2" opacity="0.6" />
            <line x1="90" y1={50 + dy} x2="120" y2={50 + dy} stroke="hsl(270, 30%, 55%)" strokeWidth="1.2" opacity="0.6" />
          </g>
        ))}
        {/* Gap — fibres cut */}
        <ellipse cx="75" cy="50" rx="12" ry="16" fill="none" stroke="hsl(0, 60%, 55%)" strokeWidth="1.5" strokeDasharray="3 2" />
        <text x="75" y="52" textAnchor="middle" fontSize="6" fill="hsl(0, 60%, 55%)">CSF</text>
        <text x="75" y="58" textAnchor="middle" fontSize="5" fill="hsl(0, 60%, 55%)">leak</text>
        <text x="75" y="82" textAnchor="middle" fontSize="7" fill="hsl(0, 60%, 55%)">Hole gapes open</text>
        <text x="75" y="92" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">→ Higher PDPH risk</text>
      </g>

      {/* Pencil-point dural hole */}
      <g>
        <text x="225" y="14" textAnchor="middle" fontSize="8" fill="hsl(210, 60%, 52%)" fontWeight="bold">Pencil-point (Whitacre)</text>
        {/* Dural fibres — separated then recoiled */}
        {[-18, -12, -6, 0, 6, 12, 18].map((dy, i) => (
          <line key={i} x1="180" y1={50 + dy} x2="270" y2={50 + dy} stroke="hsl(270, 30%, 55%)" strokeWidth="1.2" opacity="0.6" />
        ))}
        {/* Tiny slit — fibres spring back */}
        <line x1="225" y1="34" x2="225" y2="66" stroke="hsl(210, 60%, 52%)" strokeWidth="1.5" opacity="0.6" />
        <text x="225" y="82" textAnchor="middle" fontSize="7" fill="hsl(210, 60%, 52%)">Fibres recoil closed</text>
        <text x="225" y="92" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">→ Lower PDPH risk</text>
      </g>
    </svg>
  </div>
);

const NeuraxialNeedlesDiagram = () => {
  const [selected, setSelected] = useState<NeedleKey>("quincke");
  const info = needles[selected];

  return (
    <div className="border border-border rounded-lg p-4 mb-6 space-y-4">
      <div>
        <h3 className="text-lg font-serif font-bold text-foreground">Neuraxial & Specialised Needles</h3>
        <p className="text-xs text-muted-foreground">Tap a needle type to explore tip geometry, mechanism, and clinical significance</p>
      </div>

      {/* Needle selector */}
      <div className="flex flex-wrap gap-1.5">
        {needleOrder.map(key => {
          const n = needles[key];
          const isActive = selected === key;
          return (
            <button
              key={key}
              onClick={() => setSelected(key)}
              className={`px-2.5 py-1 rounded text-xs font-medium border transition-all ${
                isActive ? "text-foreground" : "border-border text-muted-foreground hover:bg-secondary/40"
              }`}
              style={isActive ? { borderColor: n.color, backgroundColor: n.color + "18", color: n.color } : {}}
            >
              {n.label}
            </button>
          );
        })}
      </div>

      <Tabs defaultValue="diagram">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="diagram" className="text-xs">Tip Diagram</TabsTrigger>
          <TabsTrigger value="details" className="text-xs">Clinical Details</TabsTrigger>
          <TabsTrigger value="comparison" className="text-xs">PDPH Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="diagram" className="mt-3">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-shrink-0">
              <NeedleTipSVG needleKey={selected} isActive={true} />
            </div>
            <div className="flex-1 min-w-0 space-y-3">
              <div className="p-3 rounded-lg border border-border">
                <p className="font-bold text-sm" style={{ color: info.color }}>{info.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{info.altNames}</p>
                <Badge variant="outline" className="mt-1 text-xs">{info.gauge}</Badge>
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground mb-0.5">Tip Geometry</p>
                <p className="text-sm text-muted-foreground">{info.tipDescription}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground mb-0.5">Mechanism of Action</p>
                <p className="text-sm text-muted-foreground">{info.mechanism}</p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="details" className="mt-3 space-y-3">
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-lg border border-border">
              <p className="text-xs font-semibold text-foreground mb-1">✅ Advantages</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                {info.advantages.map((a, i) => (
                  <li key={i} className="flex gap-1.5"><span className="text-primary mt-0.5">•</span>{a}</li>
                ))}
              </ul>
            </div>
            <div className="p-3 rounded-lg border border-border">
              <p className="text-xs font-semibold text-foreground mb-1">⚠️ Disadvantages</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                {info.disadvantages.map((d, i) => (
                  <li key={i} className="flex gap-1.5"><span className="text-destructive mt-0.5">•</span>{d}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="p-3 rounded-lg border border-border">
            <p className="text-xs font-semibold text-foreground mb-0.5">Indications</p>
            <p className="text-sm text-muted-foreground">{info.indications}</p>
          </div>
          <div className="p-3 rounded-lg border border-border bg-secondary/20">
            <p className="text-xs font-semibold text-foreground mb-0.5">PDPH Risk</p>
            <p className="text-sm text-muted-foreground">{info.pdphRisk}</p>
          </div>
          <div className="p-2 rounded border border-border/50">
            <p className="text-xs text-muted-foreground italic">📜 {info.historicalNote}</p>
          </div>
        </TabsContent>

        <TabsContent value="comparison" className="mt-3 space-y-3">
          <CrossSectionComparison />
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Needle</th>
                  <th className="text-left py-2 text-foreground font-semibold">Type</th>
                  <th className="text-left py-2 text-foreground font-semibold">Tip</th>
                  <th className="text-left py-2 text-foreground font-semibold">PDPH Risk (25G)</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="py-1.5 font-medium" style={{ color: needles.quincke.color }}>Quincke</td>
                  <td>Cutting</td><td>Sharp bevel, end-hole</td><td>3–12%</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-1.5 font-medium" style={{ color: needles.whitacre.color }}>Whitacre</td>
                  <td>Pencil-point</td><td>Conical, side-port (2mm)</td><td>0.5–2%</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-1.5 font-medium" style={{ color: needles.sprotte.color }}>Sprotte</td>
                  <td>Pencil-point</td><td>Conical, side-port (5-6mm)</td><td>0.5–2%</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-1.5 font-medium" style={{ color: needles.tuohy.color }}>Tuohy</td>
                  <td>Epidural</td><td>Curved Huber-point (16G)</td><td>&gt;50% if ADP</td>
                </tr>
                <tr>
                  <td className="py-1.5 font-medium" style={{ color: needles.huber.color }}>Huber</td>
                  <td>Non-coring</td><td>Deflected bevel</td><td>N/A (port access)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-3 rounded-lg border border-border bg-secondary/20">
            <p className="text-xs font-semibold text-foreground mb-1">Key PDPH Reduction Factors</p>
            <div className="text-xs text-muted-foreground space-y-0.5">
              <p>1. <strong>Needle gauge:</strong> Smaller gauge → smaller dural hole → less PDPH (27G &lt; 25G &lt; 22G)</p>
              <p>2. <strong>Needle tip:</strong> Pencil-point &gt; cutting (50–60% reduction at same gauge)</p>
              <p>3. <strong>Bevel orientation (cutting only):</strong> Parallel to longitudinal dural fibres reduces PDPH</p>
              <p>4. <strong>Patient factors:</strong> Young, female, previous PDPH → higher risk</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NeuraxialNeedlesDiagram;

import { useState } from "react";
import { DiagramFigure } from "./_shared/DiagramFigure";

/**
 * Schematic axial contrast-enhanced CT slice through the upper abdomen
 * illustrating the cardinal features of severe acute pancreatitis.
 *
 * Drawn entirely in SVG (no image asset) so it stays crisp and themable.
 * Anatomy is stylised, not a true radiological reconstruction — intended
 * as a teaching schematic at the level of the body of pancreas / L1.
 *
 * Toggles:
 *  - Labels   — show / hide the callout pills
 *  - Findings — highlight the pathological features (necrosis, fluid,
 *    stranding, gallstone, splanchnic vein thrombus, pleural effusion).
 */

interface Finding {
  id: string;
  /** Short callout text (\n for line breaks). */
  text: string;
  /** Anatomical anchor on the CT image (viewBox 0–100 in both axes). */
  dot: { x: number; y: number };
  /** Side of the gutter the label pill anchors to. */
  side: "left" | "right";
  /** Vertical position of the label pill (0–100). */
  labelY: number;
  /** Detail shown when this finding is selected. */
  detail: {
    title: string;
    body: string;
    severity: string;
  };
}

const findings: Finding[] = [
  {
    id: "necrosis",
    text: "Pancreatic necrosis\n(non-enhancing)",
    dot: { x: 50, y: 52 },
    side: "left",
    labelY: 24,
    detail: {
      title: "Pancreatic parenchymal necrosis",
      body:
        "Lack of enhancement of pancreatic parenchyma after IV contrast — the defining CT feature of necrotising pancreatitis. Best assessed on CECT 72–96 h after onset (earlier scans under-call necrosis). Quantified as <30%, 30–50% or >50% of the gland for the CT Severity Index.",
      severity: "Defines necrotising pancreatitis (Atlanta 2012)",
    },
  },
  {
    id: "stranding",
    text: "Peripancreatic\nfat stranding",
    dot: { x: 38, y: 44 },
    side: "left",
    labelY: 38,
    detail: {
      title: "Peripancreatic inflammation / fat stranding",
      body:
        "Hazy, reticular increased attenuation of the peripancreatic fat reflecting oedema and inflammatory exudate. Earliest CT sign — present in virtually all cases of acute pancreatitis severe enough to image.",
      severity: "Universal in moderate/severe disease",
    },
  },
  {
    id: "collection",
    text: "Acute peripancreatic\nfluid collection",
    dot: { x: 32, y: 60 },
    side: "left",
    labelY: 52,
    detail: {
      title: "Acute peripancreatic fluid collection (APFC)",
      body:
        "Homogeneous fluid density without a defined wall, confined by normal fascial planes. Develops in the first 4 weeks. After 4 weeks an encapsulated APFC becomes a pseudocyst; an encapsulated necrotic collection becomes walled-off necrosis (WON).",
      severity: "Pseudocyst / WON if persistent >4 wk",
    },
  },
  {
    id: "lesser",
    text: "Lesser sac\ncollection",
    dot: { x: 50, y: 42 },
    side: "left",
    labelY: 66,
    detail: {
      title: "Lesser sac collection",
      body:
        "The lesser sac (omental bursa) lies directly anterior to the pancreas and is the commonest site for fluid tracking. Large lesser-sac collections can compress the stomach and contribute to gastric outlet obstruction.",
      severity: "Common location — drainable transgastrically",
    },
  },
  {
    id: "gas",
    text: "Gas bubbles =\ninfected necrosis",
    dot: { x: 56, y: 56 },
    side: "right",
    labelY: 24,
    detail: {
      title: "Gas within a necrotic collection",
      body:
        "Pathognomonic of infected pancreatic necrosis (in the absence of recent intervention). Indication for source control — image-guided percutaneous drainage as the first step in the 'step-up' approach (PANTER trial), escalating to endoscopic or minimally invasive necrosectomy if needed.",
      severity: "Triggers step-up drainage",
    },
  },
  {
    id: "gallstone",
    text: "Gallstone in\nneck of Gallbladder",
    dot: { x: 26, y: 38 },
    side: "left",
    labelY: 12,
    detail: {
      title: "Gallstone — likely aetiology",
      body:
        "Gallstones cause ~50% of acute pancreatitis in the UK. Look for stones in the gallbladder neck, CBD dilatation (>6 mm) and intrahepatic duct dilatation. ERCP within 72 h if cholangitis or persistent biliary obstruction; same-admission cholecystectomy for mild gallstone pancreatitis.",
      severity: "Aetiological clue",
    },
  },
  {
    id: "splenic",
    text: "Splenic vein\nthrombosis",
    dot: { x: 64, y: 50 },
    side: "right",
    labelY: 40,
    detail: {
      title: "Splanchnic vein thrombosis",
      body:
        "Splenic, portal or SMV thrombosis complicates 15–25% of severe pancreatitis. Risk of left-sided portal hypertension and gastric varices. Anticoagulation is individualised — weighed against bleeding risk from inflamed tissue and pseudoaneurysm.",
      severity: "15–25% of severe cases",
    },
  },
  {
    id: "effusion",
    text: "Left pleural\neffusion",
    dot: { x: 78, y: 14 },
    side: "right",
    labelY: 8,
    detail: {
      title: "Reactive (sympathetic) pleural effusion",
      body:
        "Left-sided or bilateral effusions are common (~50% of severe cases) and are part of the Glasgow / Imrie criteria when associated with hypoxia (PaO₂ <8 kPa). Reflect diaphragmatic irritation and capillary leak; can progress to ARDS.",
      severity: "Marker of severity (Glasgow)",
    },
  },
  {
    id: "ascites",
    text: "Pancreatic\nascites",
    dot: { x: 18, y: 70 },
    side: "left",
    labelY: 80,
    detail: {
      title: "Pancreatic ascites / haemorrhagic ascites",
      body:
        "Free intraperitoneal fluid from ductal disruption or capillary leak. High amylase (>1000 U/L) on paracentesis. Contributes to intra-abdominal hypertension and abdominal compartment syndrome.",
      severity: "Contributes to ACS risk",
    },
  },
  {
    id: "bowel",
    text: "Thickened, oedematous\ntransverse colon",
    dot: { x: 50, y: 78 },
    side: "right",
    labelY: 72,
    detail: {
      title: "Bowel wall oedema",
      body:
        "Inflammation tracks through the transverse mesocolon causing wall thickening and ileus. The 'colon cut-off sign' on plain film reflects the same process. Contributes to feed intolerance and intra-abdominal hypertension.",
      severity: "Drives ileus and IAH",
    },
  },
  {
    id: "kidney",
    text: "Perinephric\nstranding",
    dot: { x: 80, y: 60 },
    side: "right",
    labelY: 56,
    detail: {
      title: "Perinephric stranding — early AKI",
      body:
        "Inflammatory exudate tracks down the anterior pararenal space (Gerota's fascia). AKI in severe pancreatitis is multifactorial: hypovolaemia, intra-abdominal hypertension, cytokine-mediated injury and abdominal compartment syndrome.",
      severity: "Component of MOF",
    },
  },
];

interface Anatomy {
  id: string;
  text: string;
  dot: { x: number; y: number };
  side: "left" | "right";
  labelY: number;
}

const anatomy: Anatomy[] = [
  { id: "liver", text: "Liver", dot: { x: 22, y: 28 }, side: "left", labelY: 4 },
  { id: "stomach", text: "Stomach", dot: { x: 42, y: 32 }, side: "left", labelY: 92 },
  { id: "spleen", text: "Spleen", dot: { x: 82, y: 36 }, side: "right", labelY: 90 },
  { id: "aorta", text: "Aorta", dot: { x: 54, y: 66 }, side: "right", labelY: 84 },
  { id: "ivc", text: "IVC", dot: { x: 46, y: 66 }, side: "left", labelY: 88 },
  { id: "vertebra", text: "L1 vertebral body", dot: { x: 50, y: 72 }, side: "right", labelY: 96 },
];

const SeverePancreatitisCTDiagram = () => {
  const [showLabels, setShowLabels] = useState(true);
  const [showFindings, setShowFindings] = useState(true);
  const [selected, setSelected] = useState<string>("necrosis");

  const selectedFinding = findings.find((f) => f.id === selected) ?? findings[0];

  return (
    <DiagramFigure
      id="severe-pancreatitis-ct-diagram"
      title="Severe pancreatitis CT"
      description="Auto-generated wrapper for the Severe pancreatitis CT anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <div className="my-6 space-y-4">
        <div className="bg-muted/30 rounded-xl border border-border p-4">
          {/* Header / toggles */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="text-lg font-serif font-bold text-foreground">
                Axial CT — Severe Acute Pancreatitis
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Schematic contrast-enhanced slice at L1 showing the cardinal CT features.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowLabels((v) => !v)}
                aria-pressed={showLabels}
                className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${
                  showLabels
                    ? "bg-primary/10 border-primary/40 text-foreground"
                    : "bg-background border-border text-muted-foreground"
                }`}
              >
                Labels
              </button>
              <button
                type="button"
                onClick={() => setShowFindings((v) => !v)}
                aria-pressed={showFindings}
                className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${
                  showFindings
                    ? "bg-destructive/15 border-destructive/40 text-foreground"
                    : "bg-background border-border text-muted-foreground"
                }`}
              >
                Findings
              </button>
            </div>
          </div>
  
          {/* Diagram */}
          <div className="relative">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid meet"
              role="img"
              aria-label="Schematic axial CT slice through the upper abdomen at L1, showing the cardinal features of severe acute pancreatitis: pancreatic necrosis, peripancreatic fluid collections, fat stranding, gas within a necrotic collection indicating infection, splenic vein thrombosis, pleural effusion, ascites and perinephric stranding."
              className="w-full h-auto block rounded-lg border border-border bg-[hsl(var(--background))]"
            >
              <defs>
                {/* CT soft-tissue window grayscale background */}
                <radialGradient id="spct-bg" cx="50%" cy="50%" r="70%">
                  <stop offset="0%" stopColor="hsl(0 0% 3%)" />
                  <stop offset="100%" stopColor="hsl(0 0% 0%)" />
                </radialGradient>
                {/* Subcutaneous fat (HU ≈ −100) — dark gray with faint reticulation */}
                <pattern id="spct-fat" width="2.2" height="2.2" patternUnits="userSpaceOnUse">
                  <rect width="2.2" height="2.2" fill="hsl(0 0% 20%)" />
                  <path d="M0 1.1 L2.2 1.1 M1.1 0 L1.1 2.2" stroke="hsl(0 0% 14%)" strokeWidth="0.12" opacity="0.5" />
                </pattern>
                {/* Mesenteric / intra-abdominal fat (slightly brighter than subcut) */}
                <pattern id="spct-mesfat" width="2.4" height="2.4" patternUnits="userSpaceOnUse">
                  <rect width="2.4" height="2.4" fill="hsl(0 0% 22%)" />
                  <circle cx="1.2" cy="1.2" r="0.18" fill="hsl(0 0% 15%)" opacity="0.5" />
                </pattern>
                {/* Inflammatory stranding — reticular, brighter strands through fat */}
                <pattern id="spct-stranding" width="3" height="3" patternUnits="userSpaceOnUse">
                  <rect width="3" height="3" fill="hsl(0 0% 30%)" />
                  <path d="M0 0 L3 3 M0 3 L3 0 M0 1.5 L3 1.5 M1.5 0 L1.5 3"
                        stroke="hsl(0 0% 46%)" strokeWidth="0.22" opacity="0.85" />
                </pattern>
                {/* Liver parenchyma — homogeneous mid-gray with faint vascular flecks */}
                <pattern id="spct-liver" width="6" height="6" patternUnits="userSpaceOnUse">
                  <rect width="6" height="6" fill="hsl(0 0% 52%)" />
                  <circle cx="1.5" cy="2" r="0.35" fill="hsl(0 0% 38%)" opacity="0.7" />
                  <circle cx="4.5" cy="4.2" r="0.5" fill="hsl(0 0% 36%)" opacity="0.75" />
                  <circle cx="3" cy="5" r="0.25" fill="hsl(0 0% 40%)" opacity="0.6" />
                </pattern>
                {/* Spleen parenchyma — slightly heterogeneous arterial-phase */}
                <pattern id="spct-spleen" width="5" height="5" patternUnits="userSpaceOnUse">
                  <rect width="5" height="5" fill="hsl(0 0% 48%)" />
                  <path d="M0 1 Q2.5 0 5 1 M0 3.5 Q2.5 2.5 5 3.5"
                        stroke="hsl(0 0% 58%)" strokeWidth="0.25" fill="none" opacity="0.7" />
                </pattern>
                {/* Bone (cortex bright, marrow slightly darker) */}
                <radialGradient id="spct-bone" cx="50%" cy="50%" r="60%">
                  <stop offset="0%" stopColor="hsl(0 0% 70%)" />
                  <stop offset="80%" stopColor="hsl(0 0% 92%)" />
                  <stop offset="100%" stopColor="hsl(0 0% 98%)" />
                </radialGradient>
                {/* Renal cortex / medulla differentiation (corticomedullary phase) */}
                <radialGradient id="spct-kidney" cx="50%" cy="50%" r="65%">
                  <stop offset="0%" stopColor="hsl(0 0% 38%)" />
                  <stop offset="55%" stopColor="hsl(0 0% 44%)" />
                  <stop offset="100%" stopColor="hsl(0 0% 62%)" />
                </radialGradient>
                {/* Film grain — quantum mottle */}
                <filter id="spct-grain" x="0" y="0" width="100%" height="100%">
                  <feTurbulence type="fractalNoise" baseFrequency="2.6" numOctaves="2" seed="7" />
                  <feColorMatrix values="0 0 0 0 1
                                          0 0 0 0 1
                                          0 0 0 0 1
                                          0 0 0 0.12 0" />
                  <feComposite in2="SourceGraphic" operator="in" />
                </filter>
                <filter id="spct-shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="0.25" />
                </filter>
                {/* Clip everything to the body outline so background stays jet-black */}
                <clipPath id="spct-body-clip">
                  <ellipse cx="50" cy="52" rx="45" ry="38" />
                </clipPath>
              </defs>

              {/* Jet-black gantry background */}
              <rect x="0" y="0" width="100" height="100" fill="url(#spct-bg)" />

              {/* Left pleural effusion outside the body clip (sits above diaphragm) */}
              {showFindings && (
                <g
                  onClick={() => setSelected("effusion")}
                  style={{ cursor: "pointer" }}
                >
                  {/* Lung base (aerated — black) */}
                  <path d="M62 2 Q78 2 90 10 L90 2 Z" fill="hsl(0 0% 4%)" />
                  {/* Effusion crescent — water density */}
                  <path
                    d="M68 4 Q82 6 92 16 Q92 20 86 22 Q76 22 70 14 Q68 10 68 4 Z"
                    fill="hsl(0 0% 30%)"
                    stroke={selected === "effusion" ? "hsl(45 90% 65%)" : "hsl(0 0% 18%)"}
                    strokeWidth={selected === "effusion" ? 0.7 : 0.25}
                  />
                </g>
              )}

              {/* ─── BODY CROSS-SECTION ─── */}
              <g clipPath="url(#spct-body-clip)">

                {/* Subcutaneous fat layer */}
                <ellipse cx="50" cy="52" rx="45" ry="38" fill="url(#spct-fat)" />

                {/* Anterior abdominal wall musculature */}
                <path d="M30 16 Q50 12 70 16 L72 22 Q50 19 28 22 Z" fill="hsl(0 0% 40%)" opacity="0.85" />
                <rect x="44" y="14" width="5" height="8" rx="1.2" fill="hsl(0 0% 44%)" />
                <rect x="51" y="14" width="5" height="8" rx="1.2" fill="hsl(0 0% 44%)" />
                <line x1="50" y1="14" x2="50" y2="22" stroke="hsl(0 0% 22%)" strokeWidth="0.35" />
                <path d="M6 40 Q5 56 10 78 Q14 82 18 80 Q14 60 16 42 Z" fill="hsl(0 0% 38%)" opacity="0.8" />
                <path d="M94 40 Q95 56 90 78 Q86 82 82 80 Q86 60 84 42 Z" fill="hsl(0 0% 38%)" opacity="0.8" />

                {/* Peritoneal cavity background (mesenteric fat) */}
                <ellipse cx="50" cy="54" rx="38" ry="32" fill="url(#spct-mesfat)" />

                {/* Ribs — lateral cortical arcs */}
                <g fill="url(#spct-bone)" stroke="hsl(0 0% 30%)" strokeWidth="0.25">
                  <path d="M8 40 Q5 50 9 62 Q11 62 13 60 Q10 50 12 42 Z" />
                  <path d="M6 52 Q4 62 8 74 Q10 74 12 72 Q9 62 10 54 Z" />
                  <path d="M92 40 Q95 50 91 62 Q89 62 87 60 Q90 50 88 42 Z" />
                  <path d="M94 52 Q96 62 92 74 Q90 74 88 72 Q91 62 90 54 Z" />
                </g>
                {/* Costal cartilage (less dense) */}
                <path d="M28 18 Q24 26 22 36 L25 36 Q27 26 30 19 Z" fill="hsl(0 0% 60%)" opacity="0.7" />
                <path d="M72 18 Q76 26 78 36 L75 36 Q73 26 70 19 Z" fill="hsl(0 0% 60%)" opacity="0.7" />

                {/* Vertebral body */}
                <ellipse cx="50" cy="72" rx="7" ry="5" fill="url(#spct-bone)" stroke="hsl(0 0% 30%)" strokeWidth="0.35" />
                <ellipse cx="50" cy="73.5" rx="2.4" ry="1.9" fill="hsl(0 0% 28%)" stroke="hsl(0 0% 60%)" strokeWidth="0.2" />
                <ellipse cx="50" cy="73.5" rx="1.1" ry="1" fill="hsl(0 0% 42%)" />
                <path d="M43 72 L34 69 L34 73 Q40 73 43 73 Z M57 72 L66 69 L66 73 Q60 73 57 73 Z"
                      fill="url(#spct-bone)" stroke="hsl(0 0% 30%)" strokeWidth="0.25" />
                <path d="M48 76 L52 76 L51 82 L49 82 Z" fill="url(#spct-bone)" stroke="hsl(0 0% 30%)" strokeWidth="0.25" />

                {/* Paraspinal + psoas + quadratus lumborum */}
                <ellipse cx="40" cy="76" rx="5" ry="4" fill="hsl(0 0% 42%)" />
                <ellipse cx="60" cy="76" rx="5" ry="4" fill="hsl(0 0% 42%)" />
                <ellipse cx="42" cy="70" rx="3.2" ry="3.6" fill="hsl(0 0% 44%)" />
                <ellipse cx="58" cy="70" rx="3.2" ry="3.6" fill="hsl(0 0% 44%)" />
                <path d="M34 66 Q32 72 36 78 Q40 76 38 70 Z" fill="hsl(0 0% 40%)" opacity="0.85" />
                <path d="M66 66 Q68 72 64 78 Q60 76 62 70 Z" fill="hsl(0 0% 40%)" opacity="0.85" />

                {/* ─── LIVER ─── */}
                <path
                  d="M6 24 Q10 14 28 16 Q44 20 46 36 Q44 50 30 52 Q14 50 6 38 Z"
                  fill="url(#spct-liver)"
                  stroke="hsl(0 0% 28%)"
                  strokeWidth="0.4"
                  filter="url(#spct-shadow)"
                />
                <path d="M22 28 Q28 30 32 36 M18 36 Q24 38 28 42 M26 22 Q30 26 30 32"
                      fill="none" stroke="hsl(0 0% 36%)" strokeWidth="0.7" strokeLinecap="round" opacity="0.85" />
                <path d="M30 24 Q36 32 42 46" fill="none" stroke="hsl(0 0% 62%)" strokeWidth="0.55" opacity="0.7" />
                <ellipse cx="40" cy="42" rx="1.4" ry="1.1" fill="hsl(0 0% 70%)" />

                {/* Gallbladder */}
                <ellipse cx="22" cy="40" rx="4" ry="5" fill="hsl(0 0% 26%)" stroke="hsl(0 0% 40%)" strokeWidth="0.35" />
                {showFindings && (
                  <g onClick={() => setSelected("gallstone")} style={{ cursor: "pointer" }}>
                    <circle
                      cx="24" cy="38"
                      r={selected === "gallstone" ? 1.5 : 1.2}
                      fill="hsl(0 0% 94%)"
                      stroke={selected === "gallstone" ? "hsl(45 90% 65%)" : "hsl(0 0% 60%)"}
                      strokeWidth="0.4"
                    />
                    <circle cx="24" cy="38" r="1.3" fill="none" stroke="hsl(0 0% 100%)" strokeWidth="0.18" opacity="0.6" />
                  </g>
                )}

                {/* ─── SPLEEN ─── */}
                <path
                  d="M94 28 Q86 20 74 28 Q70 38 78 46 Q88 48 94 38 Z"
                  fill="url(#spct-spleen)"
                  stroke="hsl(0 0% 28%)"
                  strokeWidth="0.4"
                  filter="url(#spct-shadow)"
                />

                {/* ─── STOMACH (gas + fluid level + rugae) ─── */}
                <ellipse cx="42" cy="32" rx="10" ry="5.2" fill="hsl(0 0% 36%)" stroke="hsl(0 0% 22%)" strokeWidth="0.4" />
                <path d="M33 30 Q42 28 51 30 L51 32.5 Q42 31.5 33 32.5 Z" fill="hsl(0 0% 5%)" />
                <line x1="33" y1="32.5" x2="51" y2="32.5" stroke="hsl(0 0% 70%)" strokeWidth="0.18" />
                <path d="M36 34 Q42 36 48 34 M38 36 Q42 37 46 36"
                      fill="none" stroke="hsl(0 0% 24%)" strokeWidth="0.25" opacity="0.7" />

                {/* Duodenal C-loop */}
                <path d="M22 50 Q20 56 24 62 Q30 64 32 58"
                      fill="none" stroke="hsl(0 0% 42%)" strokeWidth="2.2" strokeLinecap="round" />
                <circle cx="23" cy="58" r="0.6" fill="hsl(0 0% 6%)" />

                {/* Aorta, IVC, SMA, SMV, portal confluence */}
                <circle cx="54" cy="66" r="3" fill="hsl(0 0% 88%)" stroke="hsl(0 0% 40%)" strokeWidth="0.35" />
                <ellipse cx="46" cy="66" rx="3.2" ry="2.4" fill="hsl(0 0% 70%)" stroke="hsl(0 0% 40%)" strokeWidth="0.35" />
                <circle cx="50" cy="60" r="0.9" fill="hsl(0 0% 92%)" stroke="hsl(0 0% 40%)" strokeWidth="0.2" />
                <circle cx="46.5" cy="58.5" r="1.1" fill="hsl(0 0% 70%)" stroke="hsl(0 0% 40%)" strokeWidth="0.2" />
                <ellipse cx="44" cy="52" rx="2" ry="1.3" fill="hsl(0 0% 68%)" stroke="hsl(0 0% 38%)" strokeWidth="0.25" />

                {/* Kidneys with cortex/medulla + collecting system */}
                <g>
                  <ellipse cx="22" cy="62" rx="4.8" ry="6.2" fill="url(#spct-kidney)" stroke="hsl(0 0% 28%)" strokeWidth="0.4" />
                  <ellipse cx="24" cy="62" rx="1.8" ry="2.6" fill="hsl(0 0% 22%)" opacity="0.6" />
                  <ellipse cx="24" cy="62" rx="1" ry="1.6" fill="hsl(0 0% 30%)" />
                </g>
                <g>
                  <ellipse cx="78" cy="62" rx="4.8" ry="6.2" fill="url(#spct-kidney)" stroke="hsl(0 0% 28%)" strokeWidth="0.4" />
                  <ellipse cx="76" cy="62" rx="1.8" ry="2.6" fill="hsl(0 0% 22%)" opacity="0.6" />
                  <ellipse cx="76" cy="62" rx="1" ry="1.6" fill="hsl(0 0% 30%)" />
                </g>

                {/* Perinephric stranding */}
                {showFindings && (
                  <g
                    onClick={() => setSelected("kidney")}
                    style={{ cursor: "pointer" }}
                    opacity={selected === "kidney" ? 1 : 0.9}
                  >
                    <ellipse
                      cx="78" cy="62" rx="7.8" ry="9.4"
                      fill="none"
                      stroke={selected === "kidney" ? "hsl(45 90% 65%)" : "hsl(0 0% 78%)"}
                      strokeWidth={selected === "kidney" ? 0.55 : 0.35}
                      strokeDasharray="0.7 0.9"
                    />
                    <path d="M70 58 Q74 60 78 58 M82 58 Q86 60 88 58 M82 68 Q86 66 88 68"
                          stroke="hsl(0 0% 70%)" strokeWidth="0.25" fill="none" opacity="0.85" />
                  </g>
                )}

                {/* ─── PANCREAS — head / body / tail with necrotic core + gas ─── */}
                {showFindings && (
                  <g onClick={() => setSelected("necrosis")} style={{ cursor: "pointer" }}>
                    <path
                      d="M28 56 Q32 50 38 50 Q48 46 56 50 Q66 54 74 50 Q78 52 76 56 Q70 60 56 58 Q42 60 32 60 Q28 60 28 56 Z"
                      fill="hsl(0 0% 48%)"
                      stroke={selected === "necrosis" ? "hsl(45 90% 65%)" : "hsl(0 0% 24%)"}
                      strokeWidth={selected === "necrosis" ? 0.85 : 0.4}
                    />
                    <path
                      d="M40 52 Q50 48 58 52 Q56 58 48 58 Q42 58 40 54 Z"
                      fill="hsl(0 0% 24%)"
                      stroke="hsl(0 0% 14%)"
                      strokeWidth="0.4"
                    />
                    <circle cx="46" cy="54" r="0.8" fill="hsl(0 0% 32%)" opacity="0.7" />
                    <circle cx="50" cy="56" r="0.6" fill="hsl(0 0% 18%)" opacity="0.8" />
                    <g onClick={(e) => { e.stopPropagation(); setSelected("gas"); }}>
                      <circle cx="54" cy="54" r={selected === "gas" ? 1.3 : 1} fill="hsl(0 0% 4%)"
                              stroke={selected === "gas" ? "hsl(45 90% 65%)" : "hsl(0 0% 60%)"} strokeWidth={selected === "gas" ? 0.5 : 0.22} />
                      <circle cx="56.5" cy="56" r={selected === "gas" ? 0.9 : 0.7} fill="hsl(0 0% 4%)"
                              stroke={selected === "gas" ? "hsl(45 90% 65%)" : "hsl(0 0% 60%)"} strokeWidth={selected === "gas" ? 0.5 : 0.22} />
                      <circle cx="52" cy="56.5" r={selected === "gas" ? 0.7 : 0.55} fill="hsl(0 0% 4%)"
                              stroke={selected === "gas" ? "hsl(45 90% 65%)" : "hsl(0 0% 60%)"} strokeWidth={selected === "gas" ? 0.5 : 0.22} />
                    </g>
                  </g>
                )}

                {/* Peripancreatic fat stranding */}
                {showFindings && (
                  <g
                    onClick={() => setSelected("stranding")}
                    style={{ cursor: "pointer" }}
                    opacity={selected === "stranding" ? 1 : 0.85}
                  >
                    <path
                      d="M24 50 Q42 38 56 44 Q72 46 80 42 Q82 56 70 64 Q54 68 36 66 Q24 64 22 56 Z"
                      fill="url(#spct-stranding)"
                      stroke={selected === "stranding" ? "hsl(45 90% 65%)" : "hsl(0 0% 32%)"}
                      strokeWidth={selected === "stranding" ? 0.7 : 0.25}
                      opacity="0.55"
                    />
                  </g>
                )}

                {/* Acute peripancreatic fluid collection */}
                {showFindings && (
                  <g onClick={() => setSelected("collection")} style={{ cursor: "pointer" }}>
                    <path
                      d="M12 54 Q22 50 30 58 Q32 66 24 70 Q12 68 10 60 Z"
                      fill="hsl(0 0% 32%)"
                      stroke={selected === "collection" ? "hsl(45 90% 65%)" : "hsl(0 0% 50%)"}
                      strokeWidth={selected === "collection" ? 0.7 : 0.35}
                    />
                  </g>
                )}

                {/* Lesser sac collection */}
                {showFindings && (
                  <g onClick={() => setSelected("lesser")} style={{ cursor: "pointer" }}>
                    <path
                      d="M34 38 Q48 36 60 40 Q58 46 46 46 Q36 46 34 42 Z"
                      fill="hsl(0 0% 32%)"
                      stroke={selected === "lesser" ? "hsl(45 90% 65%)" : "hsl(0 0% 50%)"}
                      strokeWidth={selected === "lesser" ? 0.7 : 0.35}
                    />
                  </g>
                )}

                {/* Splenic vein with thrombus filling defect */}
                {showFindings && (
                  <g onClick={() => setSelected("splenic")} style={{ cursor: "pointer" }}>
                    <path
                      d="M50 50 Q58 50 66 50 Q72 50 76 48"
                      fill="none"
                      stroke="hsl(0 0% 66%)"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <ellipse
                      cx="64" cy="50" rx="2.4" ry="1.1"
                      fill="hsl(0 0% 26%)"
                      stroke={selected === "splenic" ? "hsl(45 90% 65%)" : "hsl(0 0% 40%)"}
                      strokeWidth={selected === "splenic" ? 0.6 : 0.3}
                    />
                  </g>
                )}

                {/* Ascites — bilateral paracolic gutters */}
                {showFindings && (
                  <g
                    onClick={() => setSelected("ascites")}
                    style={{ cursor: "pointer" }}
                    opacity={selected === "ascites" ? 1 : 0.85}
                  >
                    <path
                      d="M8 68 Q14 76 22 80 Q14 86 6 80 Z"
                      fill="hsl(0 0% 30%)"
                      stroke={selected === "ascites" ? "hsl(45 90% 65%)" : "hsl(0 0% 48%)"}
                      strokeWidth={selected === "ascites" ? 0.6 : 0.3}
                    />
                    <path
                      d="M88 70 Q94 78 92 86 Q84 84 80 76 Z"
                      fill="hsl(0 0% 30%)"
                      stroke={selected === "ascites" ? "hsl(45 90% 65%)" : "hsl(0 0% 48%)"}
                      strokeWidth={selected === "ascites" ? 0.6 : 0.3}
                    />
                  </g>
                )}

                {/* Transverse colon — oedematous wall, gas lumen, haustra */}
                {showFindings && (
                  <g onClick={() => setSelected("bowel")} style={{ cursor: "pointer" }}>
                    <path
                      d="M28 80 Q50 73 72 80"
                      fill="none"
                      stroke={selected === "bowel" ? "hsl(45 90% 65%)" : "hsl(0 0% 50%)"}
                      strokeWidth={selected === "bowel" ? 3.5 : 2.8}
                      strokeLinecap="round"
                    />
                    <path
                      d="M28 80 Q50 74.5 72 80"
                      fill="none"
                      stroke="hsl(0 0% 6%)"
                      strokeWidth="1.1"
                      strokeLinecap="round"
                    />
                    <path d="M38 78 L38 79.5 M50 75 L50 77 M62 78 L62 79.5"
                          stroke="hsl(0 0% 50%)" strokeWidth="0.3" />
                  </g>
                )}

              </g>
              {/* Quantum-mottle grain overlay */}
              <rect x="0" y="0" width="100" height="100" filter="url(#spct-grain)" opacity="0.55" pointerEvents="none" />
  
  
              {/* Compass labels — orientation */}
              <text x="50" y="2.5" fontSize="2" textAnchor="middle" fill="hsl(var(--muted-foreground))" style={{ fontFamily: "JetBrains Mono, monospace" }}>A</text>
              <text x="50" y="99" fontSize="2" textAnchor="middle" fill="hsl(var(--muted-foreground))" style={{ fontFamily: "JetBrains Mono, monospace" }}>P</text>
              <text x="2" y="51" fontSize="2" textAnchor="start" fill="hsl(var(--muted-foreground))" style={{ fontFamily: "JetBrains Mono, monospace" }}>R</text>
              <text x="98" y="51" fontSize="2" textAnchor="end" fill="hsl(var(--muted-foreground))" style={{ fontFamily: "JetBrains Mono, monospace" }}>L</text>
  
              {/* Anatomy labels (subtle) */}
              {showLabels && anatomy.map((a) => {
                const labelX = a.side === "left" ? 2 : 98;
                const anchor = a.side === "left" ? "start" : "end";
                return (
                  <g key={a.id} opacity="0.7">
                    <line
                      x1={a.dot.x}
                      y1={a.dot.y}
                      x2={labelX}
                      y2={a.labelY}
                      stroke="hsl(var(--muted-foreground))"
                      strokeWidth="0.5"
                      strokeDasharray="0.6 0.6"
                    />
                    <text
                      x={labelX}
                      y={a.labelY}
                      fontSize="1.7"
                      textAnchor={anchor}
                      dominantBaseline="middle"
                      fill="hsl(var(--muted-foreground))"
                      stroke="hsl(var(--background))"
                      strokeWidth="0.5"
                      paintOrder="stroke"
                      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                    >
                      {a.text}
                    </text>
                  </g>
                );
              })}
  
              {/* Findings labels (prominent, clickable) */}
              {showLabels && showFindings && findings.map((f) => {
                const labelX = f.side === "left" ? 2 : 98;
                const anchor = f.side === "left" ? "start" : "end";
                const isSel = selected === f.id;
                const lines = f.text.split("\n");
                return (
                      <g
                    key={f.id}
                    onClick={() => setSelected(f.id)}
                    style={{ cursor: "pointer" }}
                    opacity={isSel ? 1 : 0.85}
                  >
                    <line
                      x1={f.dot.x}
                      y1={f.dot.y}
                      x2={labelX}
                      y2={f.labelY}
                      stroke={isSel ? "hsl(45 90% 65%)" : "hsl(var(--clinical))"}
                      strokeWidth={isSel ? 0.3 : 0.2}
                      vectorEffect="non-scaling-stroke"
                    />
                    <circle
                      cx={f.dot.x}
                      cy={f.dot.y}
                      r={isSel ? 0.9 : 0.7}
                      fill={isSel ? "hsl(45 90% 65%)" : "hsl(var(--clinical))"}
                      stroke="hsl(var(--background))"
                      strokeWidth="0.5"
                    />
                    <text
                      x={labelX}
                      y={f.labelY - (lines.length - 1) * 1.05}
                      fontSize="1.85"
                      fontWeight="600"
                      textAnchor={anchor}
                      dominantBaseline="middle"
                      fill={isSel ? "hsl(45 90% 70%)" : "hsl(var(--foreground))"}
                      stroke="hsl(var(--background))"
                      strokeWidth="0.5"
                      paintOrder="stroke"
                      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                    >
                      {lines.map((line, i) => (
                        <tspan key={i} x={labelX} dy={i === 0 ? 0 : 2.1}>
                          {line}
                        </tspan>
                      ))}
                    </text>
                  </g>
    );
              })}
            </svg>
          </div>
  
          {/* Detail panel */}
          <div
            className="mt-4 min-h-[110px] rounded-lg border border-border bg-card p-3 border-l-4"
            style={{ borderLeftColor: "hsl(var(--icu))" }}
          >
            <div className="flex items-start justify-between gap-3 mb-1">
              <h4 className="font-semibold text-foreground text-sm">{selectedFinding.detail.title}</h4>
              <span className="text-[10px] uppercase tracking-wide font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground whitespace-nowrap">
                {selectedFinding.detail.severity}
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{selectedFinding.detail.body}</p>
          </div>
  
          {/* Findings chip row */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {findings.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setSelected(f.id)}
                className={`text-xs px-2 py-1 rounded-full border transition-colors ${
                  selected === f.id
                    ? "bg-icu/15 border-icu/50 text-foreground font-medium"
                    : "bg-background border-border text-muted-foreground hover:border-icu/30"
                }`}
              >
                {f.text.replace(/\n/g, " ")}
              </button>
            ))}
          </div>
  
          <p className="text-[11px] text-muted-foreground italic mt-3 leading-relaxed">
            Schematic teaching diagram — not a true CT reconstruction. Tap any feature on the slice or in the chip
            row to read its clinical significance. Pleural effusion sits at the cranial edge of the slice (lung base).
          </p>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default SeverePancreatitisCTDiagram;

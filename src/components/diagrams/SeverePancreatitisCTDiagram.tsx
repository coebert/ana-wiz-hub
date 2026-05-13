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
    text: "Gallstone in\nneck of GB",
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
    text: "Perinephric\nstranding (AKI)",
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
                <radialGradient id="spct-bg" cx="50%" cy="50%" r="60%">
                  <stop offset="0%" stopColor="hsl(220 14% 14%)" />
                  <stop offset="100%" stopColor="hsl(220 18% 6%)" />
                </radialGradient>
                <pattern id="spct-fat" width="2" height="2" patternUnits="userSpaceOnUse">
                  <rect width="2" height="2" fill="hsl(220 12% 22%)" />
                  <circle cx="1" cy="1" r="0.18" fill="hsl(220 8% 12%)" opacity="0.6" />
                </pattern>
                <pattern id="spct-stranding" width="3" height="3" patternUnits="userSpaceOnUse">
                  <rect width="3" height="3" fill="hsl(220 14% 28%)" />
                  <path d="M0 0 L3 3 M0 3 L3 0" stroke="hsl(220 8% 14%)" strokeWidth="0.5" />
                </pattern>
                <filter id="spct-shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="0.4" />
                </filter>
              </defs>
  
              {/* CT background (body cross-section) */}
              <rect x="0" y="0" width="100" height="100" fill="url(#spct-bg)" />
  
              {/* Body wall ellipse (skin / subcut fat) */}
              <ellipse
                cx="50"
                cy="52"
                rx="45"
                ry="38"
                fill="url(#spct-fat)"
                stroke="hsl(220 8% 8%)"
                strokeWidth="0.5"
              />
              {/* Inner peritoneal cavity */}
              <ellipse
                cx="50"
                cy="52"
                rx="40"
                ry="34"
                fill="hsl(220 14% 32%)"
                stroke="hsl(220 8% 10%)"
                strokeWidth="0.5"
              />
  
              {/* Left pleural effusion (top right corner — patient's left) */}
              {showFindings && (
                <g
                  onClick={() => setSelected("effusion")}
                  style={{ cursor: "pointer" }}
                  opacity={selected === "effusion" ? 1 : 0.85}
                >
                  <path
                    d="M70 4 Q85 4 92 18 L92 4 Z"
                    fill="hsl(210 50% 35%)"
                    stroke="hsl(210 60% 50%)"
                    strokeWidth={selected === "effusion" ? 0.7 : 0.35}
                  />
                </g>
              )}
  
              {/* Liver (right side of patient = viewer's left) */}
              <path
                d="M8 24 Q12 16 28 18 Q40 20 42 36 Q40 48 28 50 Q14 48 8 38 Z"
                fill="hsl(20 28% 38%)"
                stroke="hsl(20 30% 22%)"
                strokeWidth="0.5"
                filter="url(#spct-shadow)"
              />
  
              {/* Gallbladder */}
              <ellipse
                cx="22"
                cy="40"
                rx="4"
                ry="5"
                fill="hsl(50 55% 45%)"
                stroke="hsl(45 40% 25%)"
                strokeWidth="0.5"
              />
              {/* Gallstone */}
              {showFindings && (
                <g
                  onClick={() => setSelected("gallstone")}
                  style={{ cursor: "pointer" }}
                >
                  <circle
                    cx="24"
                    cy="38"
                    r={selected === "gallstone" ? 1.4 : 1.1}
                    fill="hsl(45 75% 78%)"
                    stroke="hsl(30 40% 20%)"
                    strokeWidth="0.5"
                  />
                </g>
              )}
  
              {/* Spleen (patient's left = viewer's right) */}
              <path
                d="M92 30 Q86 22 76 28 Q72 36 78 44 Q86 46 92 38 Z"
                fill="hsl(0 35% 38%)"
                stroke="hsl(0 40% 22%)"
                strokeWidth="0.5"
                filter="url(#spct-shadow)"
              />
  
              {/* Stomach (anterior, midline-left) */}
              <ellipse
                cx="42"
                cy="32"
                rx="10"
                ry="5"
                fill="hsl(220 18% 22%)"
                stroke="hsl(220 12% 10%)"
                strokeWidth="0.5"
              />
  
              {/* Vertebral body (midline posterior) */}
              <ellipse
                cx="50"
                cy="72"
                rx="7"
                ry="5"
                fill="hsl(40 18% 78%)"
                stroke="hsl(220 8% 14%)"
                strokeWidth="0.5"
              />
              {/* Spinal canal */}
              <ellipse cx="50" cy="73" rx="2.5" ry="2" fill="hsl(220 14% 28%)" />
              {/* Transverse processes */}
              <path
                d="M43 72 L36 70 L36 74 Z M57 72 L64 70 L64 74 Z"
                fill="hsl(40 18% 78%)"
                stroke="hsl(220 8% 14%)"
                strokeWidth="0.5"
              />
  
              {/* Aorta */}
              <circle
                cx="54"
                cy="66"
                r="3"
                fill="hsl(0 75% 50%)"
                stroke="hsl(0 60% 25%)"
                strokeWidth="0.5"
              />
              {/* IVC */}
              <ellipse
                cx="46"
                cy="66"
                rx="3.2"
                ry="2.4"
                fill="hsl(220 70% 45%)"
                stroke="hsl(220 60% 22%)"
                strokeWidth="0.5"
              />
  
              {/* Kidneys (paired, posterior lateral) */}
              <ellipse
                cx="22"
                cy="62"
                rx="4.5"
                ry="6"
                fill="hsl(20 35% 42%)"
                stroke="hsl(20 30% 22%)"
                strokeWidth="0.5"
              />
              <ellipse
                cx="78"
                cy="62"
                rx="4.5"
                ry="6"
                fill="hsl(20 35% 42%)"
                stroke="hsl(20 30% 22%)"
                strokeWidth="0.5"
              />
  
              {/* Perinephric stranding (right kidney) */}
              {showFindings && (
                <g
                  onClick={() => setSelected("kidney")}
                  style={{ cursor: "pointer" }}
                  opacity={selected === "kidney" ? 1 : 0.85}
                >
                  <ellipse
                    cx="78"
                    cy="62"
                    rx="7.5"
                    ry="9"
                    fill="none"
                    stroke="hsl(45 80% 60%)"
                    strokeWidth={selected === "kidney" ? 0.7 : 0.45}
                    strokeDasharray="0.6 0.8"
                  />
                </g>
              )}
  
              {/* Pancreas — head, body, tail (curving across midline anterior to vertebra) */}
              {/* Body (necrotic — central non-enhancing region) */}
              {showFindings && (
                <g
                  onClick={() => setSelected("necrosis")}
                  style={{ cursor: "pointer" }}
                >
                  <path
                    d="M30 56 Q42 46 54 50 Q66 54 74 50 Q70 60 56 58 Q42 60 30 60 Z"
                    fill="hsl(20 30% 30%)"
                    stroke={selected === "necrosis" ? "hsl(45 90% 65%)" : "hsl(20 30% 18%)"}
                    strokeWidth={selected === "necrosis" ? 0.9 : 0.45}
                  />
                  {/* Necrotic non-enhancing core */}
                  <path
                    d="M40 52 Q50 48 58 52 Q56 58 48 58 Q42 58 40 54 Z"
                    fill="hsl(220 18% 20%)"
                    stroke="hsl(220 8% 8%)"
                    strokeWidth="0.5"
                  />
                  {/* Gas bubbles within necrotic collection */}
                  <g onClick={(e) => { e.stopPropagation(); setSelected("gas"); }}>
                    <circle cx="54" cy="54" r={selected === "gas" ? 1.3 : 1} fill="hsl(220 10% 6%)" stroke={selected === "gas" ? "hsl(45 90% 65%)" : "hsl(220 6% 4%)"} strokeWidth={selected === "gas" ? 0.5 : 0.25} />
                    <circle cx="56.5" cy="56" r={selected === "gas" ? 0.9 : 0.7} fill="hsl(220 10% 6%)" stroke={selected === "gas" ? "hsl(45 90% 65%)" : "hsl(220 6% 4%)"} strokeWidth={selected === "gas" ? 0.5 : 0.25} />
                    <circle cx="52" cy="56.5" r={selected === "gas" ? 0.7 : 0.55} fill="hsl(220 10% 6%)" stroke={selected === "gas" ? "hsl(45 90% 65%)" : "hsl(220 6% 4%)"} strokeWidth={selected === "gas" ? 0.5 : 0.25} />
                  </g>
                </g>
              )}
  
              {/* Peripancreatic fat stranding (around the pancreas) */}
              {showFindings && (
                <g
                  onClick={() => setSelected("stranding")}
                  style={{ cursor: "pointer" }}
                  opacity={selected === "stranding" ? 1 : 0.85}
                >
                  <path
                    d="M26 50 Q42 40 56 46 Q72 48 78 44 Q80 56 70 62 Q54 66 38 64 Q26 62 24 56 Z"
                    fill="url(#spct-stranding)"
                    stroke={selected === "stranding" ? "hsl(45 90% 65%)" : "hsl(220 8% 14%)"}
                    strokeWidth={selected === "stranding" ? 0.7 : 0.3}
                    opacity="0.55"
                  />
                </g>
              )}
  
              {/* Acute peripancreatic fluid collection (left anterior pararenal) */}
              {showFindings && (
                <g
                  onClick={() => setSelected("collection")}
                  style={{ cursor: "pointer" }}
                >
                  <path
                    d="M14 56 Q22 52 30 58 Q32 66 24 68 Q14 66 12 60 Z"
                    fill="hsl(210 55% 38%)"
                    stroke={selected === "collection" ? "hsl(45 90% 65%)" : "hsl(210 50% 22%)"}
                    strokeWidth={selected === "collection" ? 0.8 : 0.4}
                  />
                </g>
              )}
  
              {/* Lesser sac collection (between stomach and pancreas) */}
              {showFindings && (
                <g
                  onClick={() => setSelected("lesser")}
                  style={{ cursor: "pointer" }}
                >
                  <path
                    d="M36 38 Q48 36 58 40 Q56 46 46 46 Q38 46 36 42 Z"
                    fill="hsl(210 55% 38%)"
                    stroke={selected === "lesser" ? "hsl(45 90% 65%)" : "hsl(210 50% 22%)"}
                    strokeWidth={selected === "lesser" ? 0.8 : 0.4}
                  />
                </g>
              )}
  
              {/* Splenic vein thrombus (posterior to body of pancreas, leading to spleen) */}
              {showFindings && (
                <g
                  onClick={() => setSelected("splenic")}
                  style={{ cursor: "pointer" }}
                >
                  <path
                    d="M54 50 Q60 50 66 50 Q72 50 76 48"
                    fill="none"
                    stroke="hsl(220 60% 32%)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  {/* Filling defect (thrombus) */}
                  <ellipse
                    cx="64"
                    cy="50"
                    rx="2.4"
                    ry="1.2"
                    fill="hsl(0 0% 12%)"
                    stroke={selected === "splenic" ? "hsl(45 90% 65%)" : "hsl(220 30% 18%)"}
                    strokeWidth={selected === "splenic" ? 0.7 : 0.35}
                  />
                </g>
              )}
  
              {/* Free ascites (dependent / paracolic gutters) */}
              {showFindings && (
                <g
                  onClick={() => setSelected("ascites")}
                  style={{ cursor: "pointer" }}
                  opacity={selected === "ascites" ? 1 : 0.85}
                >
                  <path
                    d="M10 70 Q16 76 22 78 Q14 84 8 80 Z"
                    fill="hsl(210 55% 38%)"
                    stroke={selected === "ascites" ? "hsl(45 90% 65%)" : "hsl(210 50% 22%)"}
                    strokeWidth={selected === "ascites" ? 0.7 : 0.35}
                  />
                  <path
                    d="M86 72 Q92 78 90 84 Q82 82 80 76 Z"
                    fill="hsl(210 55% 38%)"
                    stroke={selected === "ascites" ? "hsl(45 90% 65%)" : "hsl(210 50% 22%)"}
                    strokeWidth={selected === "ascites" ? 0.7 : 0.35}
                  />
                </g>
              )}
  
              {/* Transverse colon (oedematous) */}
              {showFindings && (
                <g
                  onClick={() => setSelected("bowel")}
                  style={{ cursor: "pointer" }}
                >
                  <path
                    d="M28 78 Q50 72 72 78"
                    fill="none"
                    stroke={selected === "bowel" ? "hsl(45 90% 65%)" : "hsl(30 35% 50%)"}
                    strokeWidth={selected === "bowel" ? 3.5 : 2.8}
                    strokeLinecap="round"
                    opacity="0.9"
                  />
                  <path
                    d="M28 78 Q50 73.5 72 78"
                    fill="none"
                    stroke="hsl(220 14% 32%)"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                </g>
              )}
  
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

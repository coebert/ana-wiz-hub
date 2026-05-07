import React from "react";
import AnatomyPlate, { ANATOMY_COLORS as C } from "../AnatomyPlate";

/**
 * Cardiac — anterior (sternocostal) view.
 *
 * Orientation rule: viewer faces patient's chest, so
 *   patient's RIGHT  = image LEFT  (low x)
 *   patient's LEFT   = image RIGHT (high x)
 *
 * Anatomical decisions:
 *   - Right-dominant coronary system (85%): RCA → PDA.
 *   - RV forms most of the anterior surface; apex (LV) points down-right.
 *   - Aortic arch arches to viewer's RIGHT; arch branches L→R in image are
 *     brachiocephalic, L common carotid, L subclavian.
 *   - SVC and RA are on viewer's LEFT; LV apex on viewer's RIGHT.
 *
 * Every label target was checked against the path/circle it points at —
 * see comments next to each label entry for the structure coordinate.
 */

const AnteriorCardiacPlate: React.FC = () => {
  return (
    <AnatomyPlate
      title="Heart — anterior (sternocostal) view"
      subtitle="Right-dominant circulation. Patient's right is on viewer's LEFT."
      caption="The right ventricle forms most of the sternocostal surface; the apex is the inferolateral tip of the LV. The LAD runs in the anterior interventricular groove between RV and LV."
      checkpoints={[
        "Apex beat: 5th left intercostal space, mid-clavicular line",
        "RV forms most of the anterior surface — vulnerable to penetrating trauma",
        "LAD in anterior IV groove → anterior LV + anterior septum",
        "Aortic arch branches L→R in image: brachiocephalic, L common carotid, L subclavian",
      ]}
      width={1000}
      height={700}
      labels={[
        // ---- Great vessels --------------------------------------------------
        // SVC vertical path x≈430 y 175→320 (viewer-LEFT)
        { id: "svc", text: "Superior vena cava", target: [430, 220], label: [120, 180], side: "right", accent: C.vein },
        // IVC vertical path x≈430 y 470→555
        { id: "ivc", text: "Inferior vena cava", target: [430, 540], label: [120, 600], side: "right", accent: C.vein },
        // Ascending aorta vertical at x=500, y 230→350
        { id: "aorta", text: "Ascending aorta", target: [500, 290], label: [840, 270], accent: C.artery },
        // Aortic arch curves from (500,230) up over to (640,175) on viewer-RIGHT
        { id: "arch", text: "Aortic arch", target: [600, 100], label: [820, 70], accent: C.artery },
        // Branch endpoints
        { id: "bct",  text: "Brachiocephalic trunk", target: [475, 60],  label: [120, 30],  side: "right", accent: C.artery },
        { id: "lcca", text: "Left common carotid",   target: [540, 35],  label: [820, 20],  accent: C.artery },
        { id: "lsa",  text: "Left subclavian",       target: [605, 60],  label: [870, 100], accent: C.artery },
        // Pulmonary trunk vertical at x=560 y 250→350 (anterior to aorta, viewer-LEFT of aorta)
        { id: "pa",   text: "Pulmonary trunk",       target: [560, 305], label: [820, 320], accent: C.vein },
        // PA bifurcation: LPA continues to viewer-RIGHT (patient-left lung) end ~ (640,205)
        { id: "lpa",  text: "L. pulmonary artery",   target: [640, 205], label: [880, 165], accent: C.vein },
        // RPA crosses behind aorta to viewer-LEFT end ~ (470,200)
        { id: "rpa",  text: "R. pulmonary artery",   target: [470, 200], label: [120, 215], side: "right", accent: C.vein },

        // ---- Chambers -------------------------------------------------------
        // RA on viewer-LEFT, between SVC and IVC, around (390,400)
        { id: "ra",   text: "Right atrium",          target: [390, 400], label: [110, 380], side: "right", accent: C.stroke },
        // R. atrial appendage (drawn at ~(450,260))
        { id: "raa",  text: "R. atrial appendage",   target: [445, 265], label: [120, 270], side: "right", accent: C.stroke },
        // RV: anterior central, drawn x 430→640 y 380→580; centre ~ (520, 480)
        { id: "rv",   text: "Right ventricle",       target: [520, 470], label: [110, 510], side: "right", accent: C.stroke },
        // LV: viewer-RIGHT, drawn x 580→730 y 350→600; centre ~ (660, 470)
        { id: "lv",   text: "Left ventricle",        target: [660, 470], label: [880, 470], accent: C.stroke },
        // L. atrial appendage at ~(620, 295)
        { id: "laa",  text: "L. atrial appendage",   target: [620, 295], label: [880, 240], accent: C.stroke },
        // Apex marker at (700, 575)
        { id: "apex", text: "Apex (LV)",             target: [700, 575], label: [880, 605], accent: C.stroke },

        // ---- Conduction & coronaries ---------------------------------------
        // SA node circle at (430, 195) (SVC–RA junction on viewer-LEFT)
        { id: "sa",   text: "SA node",               target: [430, 195], label: [110, 130], side: "right", accent: C.nerve, sub: "SVC–RA junction" },
        // LAD path 540,310 → 700,560 — midpoint ~(620, 435)
        { id: "lad",  text: "LAD",                   target: [620, 435], label: [880, 410], accent: C.artery, sub: "anterior IV groove" },
        // RCA path 460,320 → 420,540 (viewer-LEFT AV groove) — midpoint ~(440, 430)
        { id: "rca",  text: "RCA",                   target: [440, 430], label: [110, 430], side: "right", accent: C.artery, sub: "right AV groove" },
        // LCx path 540,310 → 670,355 (viewer-RIGHT AV groove) — midpoint ~(605, 333)
        { id: "lcx",  text: "Circumflex (LCx)",      target: [605, 333], label: [880, 320], accent: C.artery, sub: "left AV groove" },
        // Diagonal off LAD endpoint ~(680, 510)
        { id: "diag", text: "Diagonal br.",          target: [680, 510], label: [880, 555], accent: C.artery },
        // Obtuse marginal off LCx endpoint ~(700, 430)
        { id: "om",   text: "Obtuse marginal",       target: [700, 430], label: [880, 365], accent: C.artery },
        // Acute marginal off RCA endpoint ~(440, 525)
        { id: "am",   text: "Acute marginal",        target: [440, 525], label: [110, 580], side: "right", accent: C.artery },
      ]}
    >
      {/* ----- Background pericardial silhouette (subtle) ----- */}
      <ellipse cx="540" cy="430" rx="320" ry="280" fill="hsl(var(--anatomy-paper))" stroke="none" />

      {/* ===== Great vessels (drawn first, behind heart) ===== */}

      {/* Aortic arch — ascends at x=500, arches to viewer's RIGHT, descends behind */}
      <path
        d="M 500 230 C 500 150, 530 90, 570 90 C 620 90, 640 130, 640 175"
        fill="none"
        stroke={C.artery}
        strokeWidth="22"
        strokeLinecap="round"
        opacity="0.95"
      />
      {/* Ascending aorta */}
      <path d="M 500 230 L 500 350" stroke={C.artery} strokeWidth="34" strokeLinecap="round" />
      {/* Aortic root */}
      <ellipse cx="500" cy="350" rx="22" ry="10" fill={C.artery} opacity="0.9" />

      {/* Arch branches — order L→R in image: BCT, LCCA, LSA */}
      <path d="M 510 130 L 475 60"  stroke={C.artery} strokeWidth="10" strokeLinecap="round" />
      <path d="M 545 100 L 540 35"  stroke={C.artery} strokeWidth="10" strokeLinecap="round" />
      <path d="M 590 100 L 605 60"  stroke={C.artery} strokeWidth="10" strokeLinecap="round" />

      {/* SVC — viewer-LEFT, descends to RA */}
      <path d="M 430 175 L 420 320" stroke={C.vein} strokeWidth="32" strokeLinecap="round" />
      {/* IVC — viewer-LEFT, ascends to RA */}
      <path d="M 430 555 L 425 470" stroke={C.vein} strokeWidth="32" strokeLinecap="round" />

      {/* Pulmonary trunk — anterior to aorta (slightly viewer-RIGHT of aorta in this projection),
          bifurcates into LPA (continues right) and RPA (crosses behind aorta to viewer-LEFT). */}
      <path d="M 560 350 L 560 250" stroke={C.vein} strokeWidth="28" strokeLinecap="round" opacity="0.9" />
      {/* LPA: continues to viewer-RIGHT */}
      <path d="M 560 250 C 590 220, 620 210, 640 205" stroke={C.vein} strokeWidth="22" fill="none" strokeLinecap="round" opacity="0.9" />
      {/* RPA: crosses behind aorta to viewer-LEFT */}
      <path d="M 560 250 C 540 220, 510 205, 470 200" stroke={C.vein} strokeWidth="20" fill="none" strokeLinecap="round" opacity="0.85" />

      {/* ===== Heart silhouette ===== */}
      {/* Anterior outline: apex points to viewer's RIGHT–DOWN at (700, 575) */}
      <path
        d="
          M 420 320
          C 360 330, 320 380, 340 470
          C 360 555, 440 605, 540 605
          C 640 605, 720 580, 730 510
          C 740 430, 720 360, 680 320
          C 640 290, 560 290, 500 305
          C 460 312, 440 315, 420 320
          Z
        "
        fill="hsl(var(--anatomy-organ))"
        stroke={C.stroke}
        strokeWidth="2"
      />

      {/* Anterior interventricular groove (LAD groove): runs from upper-mid down to apex */}
      <path
        d="M 540 315 C 580 380, 640 480, 700 570"
        fill="none"
        stroke={C.stroke}
        strokeWidth="1"
        strokeDasharray="4 3"
        opacity="0.5"
      />

      {/* Atrioventricular groove: separates atria above from ventricles below */}
      <path
        d="M 380 380 C 460 330, 580 320, 700 360"
        fill="none"
        stroke={C.stroke}
        strokeWidth="1"
        strokeDasharray="4 3"
        opacity="0.5"
      />

      {/* Right atrial appendage (viewer-LEFT, between SVC and aorta) */}
      <path
        d="M 460 250 C 440 245, 425 265, 440 285 C 460 300, 480 285, 470 265 Z"
        fill="hsl(var(--anatomy-organ))"
        stroke={C.stroke}
        strokeWidth="1.5"
      />
      {/* Left atrial appendage (viewer-RIGHT, peeking out beside PA) */}
      <path
        d="M 615 280 C 595 275, 580 295, 600 310 C 620 325, 645 305, 635 285 Z"
        fill="hsl(var(--anatomy-organ))"
        stroke={C.stroke}
        strokeWidth="1.5"
      />

      {/* ===== Coronary arteries ===== */}
      {/* Left main → bifurcates into LAD + LCx */}
      <path d="M 510 320 L 540 310" stroke={C.artery} strokeWidth="6" fill="none" strokeLinecap="round" />
      {/* LAD — anterior IV groove, runs to apex */}
      <path
        d="M 540 310 C 580 380, 640 480, 700 565"
        stroke={C.artery}
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Diagonal branch off LAD — courses to viewer-RIGHT */}
      <path d="M 600 410 L 680 510" stroke={C.artery} strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* LCx — left AV groove, courses to viewer-RIGHT */}
      <path
        d="M 540 310 C 580 320, 640 335, 670 355"
        stroke={C.artery}
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Obtuse marginal — off LCx, runs down on viewer-RIGHT lateral wall */}
      <path d="M 660 350 L 700 430" stroke={C.artery} strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* RCA — right AV groove, courses to viewer-LEFT and around */}
      <path
        d="M 490 322 C 460 330, 430 360, 425 420 C 422 480, 440 540, 480 555"
        stroke={C.artery}
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Acute marginal — off RCA, runs down on viewer-LEFT lateral wall */}
      <path d="M 425 440 L 440 525" stroke={C.artery} strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* SA node marker — SVC/RA junction on viewer-LEFT */}
      <circle cx="430" cy="195" r="6" fill={C.nerve} stroke={C.stroke} strokeWidth="1" />
      {/* Apex marker */}
      <circle cx="700" cy="575" r="4" fill={C.stroke} />
    </AnatomyPlate>
  );
};

export default AnteriorCardiacPlate;

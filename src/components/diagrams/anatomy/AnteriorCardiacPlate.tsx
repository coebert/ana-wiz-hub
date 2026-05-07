import React from "react";
import AnatomyPlate, { ANATOMY_COLORS as C } from "./AnatomyPlate";

/**
 * Cardiac — anterior view (sternocostal surface).
 *
 * Anatomical decisions:
 * - Right-dominant coronary system (85% of population): RCA gives PDA.
 * - Heart rotated so RV forms most of the anterior surface (true anatomy).
 * - Apex points down-and-left into the 5th left ICS, mid-clavicular line.
 * - Aortic arch with three classic branches (BCT, LCCA, LSA).
 * - SA node marked at SVC/RA junction; LAD in anterior interventricular groove.
 */

const AnteriorCardiacPlate: React.FC = () => {
  return (
    <AnatomyPlate
      title="Heart — anterior (sternocostal) view"
      subtitle="Right-dominant circulation. Most of the anterior surface is right ventricle."
      caption="The right ventricle forms most of the sternocostal surface; the apex is the inferolateral tip of the LV. The LAD runs in the anterior interventricular groove between RV and LV."
      checkpoints={[
        "Apex beat: 5th left intercostal space, mid-clavicular line",
        "RV forms most of the anterior surface — vulnerable to penetrating trauma",
        "LAD in anterior IV groove → anterior LV + anterior septum",
        "Aortic arch branches L→R: brachiocephalic, L common carotid, L subclavian",
      ]}
      width={1000}
      height={700}
      labels={[
        { id: "svc", text: "Superior vena cava", target: [560, 175], label: [820, 130], accent: C.vein },
        { id: "ivc", text: "Inferior vena cava", target: [555, 555], label: [820, 605], accent: C.vein },
        { id: "aorta", text: "Ascending aorta", target: [500, 200], label: [240, 130], accent: C.artery, side: "right" },
        { id: "arch", text: "Aortic arch", target: [490, 110], label: [225, 70], accent: C.artery, side: "right" },
        { id: "bct", text: "Brachiocephalic trunk", target: [515, 70], label: [780, 35], accent: C.artery },
        { id: "lcca", text: "Left common carotid", target: [460, 50], label: [180, 25], accent: C.artery, side: "right" },
        { id: "lsa", text: "Left subclavian", target: [400, 65], label: [110, 70], accent: C.artery, side: "right" },
        { id: "pa", text: "Pulmonary trunk", target: [430, 250], label: [150, 215], accent: C.vein, side: "right" },
        { id: "lpa", text: "L. pulmonary artery", target: [380, 195], label: [100, 165], accent: C.vein, side: "right" },
        { id: "rpa", text: "R. pulmonary artery", target: [535, 195], label: [800, 195], accent: C.vein },
        { id: "ra", text: "Right atrium", target: [600, 290], label: [840, 270], accent: C.stroke },
        { id: "raa", text: "R. atrial appendage", target: [555, 245], label: [820, 235], accent: C.stroke },
        { id: "rv", text: "Right ventricle", target: [475, 460], label: [770, 480], accent: C.stroke },
        { id: "lv", text: "Left ventricle", target: [340, 470], label: [110, 480], accent: C.stroke, side: "right" },
        { id: "laa", text: "L. atrial appendage", target: [355, 270], label: [85, 250], accent: C.stroke, side: "right" },
        { id: "apex", text: "Apex (LV)", target: [305, 555], label: [80, 580], accent: C.stroke, side: "right" },
        { id: "sa", text: "SA node", target: [570, 195], label: [810, 170], accent: C.nerve, sub: "SVC–RA junction" },
        { id: "lad", text: "LAD", target: [400, 410], label: [60, 405], accent: C.artery, side: "right", sub: "anterior IV groove" },
        { id: "rca", text: "RCA", target: [555, 380], label: [820, 360], accent: C.artery, sub: "right AV groove" },
        { id: "lcx", text: "Circumflex (LCx)", target: [355, 320], label: [60, 330], accent: C.artery, side: "right", sub: "left AV groove" },
        { id: "diag", text: "Diagonal br.", target: [360, 460], label: [60, 540], accent: C.artery, side: "right" },
        { id: "om", text: "Obtuse marginal", target: [305, 410], label: [60, 470], accent: C.artery, side: "right" },
        { id: "am", text: "Acute marginal", target: [560, 480], label: [820, 540], accent: C.artery },
      ]}
    >
      {/* ----- Background pericardial silhouette (subtle) ----- */}
      <ellipse cx="450" cy="400" rx="320" ry="280" fill="hsl(var(--anatomy-paper))" stroke="none" />

      {/* ----- Great vessels behind the heart ----- */}
      {/* Aortic arch */}
      <path
        d="M 500 230 C 500 150, 470 90, 430 90 C 380 90, 360 130, 360 175"
        fill="none"
        stroke={C.artery}
        strokeWidth="22"
        strokeLinecap="round"
        opacity="0.95"
      />
      {/* Ascending aorta */}
      <path d="M 500 230 L 500 350" stroke={C.artery} strokeWidth="34" strokeLinecap="round" />
      {/* Aortic root (visible behind PA) */}
      <ellipse cx="500" cy="350" rx="22" ry="10" fill={C.artery} opacity="0.9" />

      {/* Arch branches */}
      <path d="M 500 130 L 515 70" stroke={C.artery} strokeWidth="10" strokeLinecap="round" />
      <path d="M 470 100 L 460 50" stroke={C.artery} strokeWidth="10" strokeLinecap="round" />
      <path d="M 425 95 L 400 60" stroke={C.artery} strokeWidth="10" strokeLinecap="round" />

      {/* SVC */}
      <path d="M 560 175 L 580 320" stroke={C.vein} strokeWidth="32" strokeLinecap="round" />
      {/* IVC */}
      <path d="M 555 555 L 580 470" stroke={C.vein} strokeWidth="32" strokeLinecap="round" />

      {/* Pulmonary trunk + bifurcation */}
      <path d="M 430 350 C 430 290, 410 240, 380 195" stroke={C.vein} strokeWidth="26" fill="none" strokeLinecap="round" opacity="0.9" />
      <path d="M 430 350 C 460 290, 500 230, 535 195" stroke={C.vein} strokeWidth="20" fill="none" strokeLinecap="round" opacity="0.9" />
      <path d="M 430 350 L 430 250" stroke={C.vein} strokeWidth="28" strokeLinecap="round" opacity="0.9" />

      {/* ----- Heart silhouette (RV + LV + atria) ----- */}
      {/* Outer myocardium */}
      <path
        d="
          M 580 320
          C 640 330, 690 380, 670 470
          C 650 560, 560 615, 460 600
          C 360 590, 270 540, 250 460
          C 235 380, 280 300, 360 280
          C 400 270, 430 270, 460 280
          Z
        "
        fill="hsl(var(--anatomy-organ))"
        stroke={C.stroke}
        strokeWidth="2"
      />

      {/* Anterior interventricular groove (LAD groove) */}
      <path
        d="M 460 280 C 440 340, 420 410, 360 540"
        fill="none"
        stroke={C.stroke}
        strokeWidth="1"
        strokeDasharray="4 3"
        opacity="0.5"
      />

      {/* AV groove (atrioventricular) */}
      <path
        d="M 250 380 C 320 320, 460 290, 600 320"
        fill="none"
        stroke={C.stroke}
        strokeWidth="1"
        strokeDasharray="4 3"
        opacity="0.5"
      />

      {/* Right atrial appendage */}
      <path
        d="M 540 240 C 520 230, 510 250, 525 270 C 545 285, 565 270, 555 250 Z"
        fill="hsl(var(--anatomy-organ))"
        stroke={C.stroke}
        strokeWidth="1.5"
      />

      {/* Left atrial appendage */}
      <path
        d="M 360 265 C 340 255, 325 275, 340 290 C 360 305, 380 285, 370 270 Z"
        fill="hsl(var(--anatomy-organ))"
        stroke={C.stroke}
        strokeWidth="1.5"
      />

      {/* ----- Coronary arteries (drawn on top) ----- */}
      {/* Left main → LAD (anterior IV groove) + LCx (left AV groove) */}
      <path
        d="M 460 285 L 445 305"
        stroke={C.artery}
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
      {/* LAD */}
      <path
        d="M 445 305 C 430 360, 410 430, 360 540"
        stroke={C.artery}
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Diagonal branch off LAD */}
      <path d="M 420 380 L 360 460" stroke={C.artery} strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M 405 425 L 340 490" stroke={C.artery} strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* LCx — left AV groove curving posteriorly */}
      <path
        d="M 445 305 C 400 305, 350 320, 320 360"
        stroke={C.artery}
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Obtuse marginal */}
      <path d="M 360 320 L 305 410" stroke={C.artery} strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* RCA — right AV groove */}
      <path
        d="M 545 320 C 580 350, 590 410, 565 470 C 540 525, 470 555, 410 545"
        stroke={C.artery}
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Acute marginal */}
      <path d="M 580 410 L 555 490" stroke={C.artery} strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* SA node marker */}
      <circle cx="570" cy="195" r="6" fill={C.nerve} stroke={C.stroke} strokeWidth="1" />

      {/* Apex marker */}
      <circle cx="305" cy="555" r="4" fill={C.stroke} />
    </AnatomyPlate>
  );
};

export default AnteriorCardiacPlate;

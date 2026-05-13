import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { AlertTriangle, ArrowLeft, Pill, ChevronDown, ChevronUp } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { allTopics, sectionMeta } from "@/data/curriculum";
import { classifyImpact as classifyImpactExternal } from "@/lib/drug-impact-classifier";
import { Breadcrumbs } from "@/components/Breadcrumbs";

interface InfusionStandard {
  amount_mg?: number;
  diluent_ml?: number;
  unit?: string;
  weight_based?: boolean;
  note?: string;
}

interface Drug {
  slug: string;
  name: string;
  drug_class: string;
  synonyms: string[];
  indication_oneliner: string;
  key_warning: string;
  adult_bolus_dose: string;
  infusion_range: string;
  presentation: string;
  mechanism_of_action: string;
  pharmacokinetics: string;
  preparation: string;
  dosing: string;
  monitoring: string;
  side_effects: string;
  contraindications: string;
  interactions: string;
  infusion_standard: InfusionStandard;
  related_topic_ids: string[];
}

const Section = ({ title, body }: { title: string; body: string }) => (
  <section className="bg-card border border-border rounded-lg p-4">
    <h3 className="text-sm font-semibold text-foreground mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">{body}</p>
  </section>
);

// Parse a free-text dosing string into labelled buckets so adult vs paediatric
// vs renal/hepatic/elderly considerations are visually separated.
type DosingBucket = { key: string; label: string; tone: string; body: string };

const DOSING_RULES: Array<{ key: string; label: string; tone: string; patterns: RegExp[] }> = [
  { key: "adult-bolus", label: "Adult — bolus", tone: "border-drugs/30 bg-drugs/5",
    patterns: [/^adult bolus/i, /^adults? bolus/i, /^bolus/i, /^induction/i, /^loading/i, /^rsi/i, /^stat/i] },
  { key: "adult-infusion", label: "Adult — infusion / maintenance", tone: "border-drugs/30 bg-drugs/5",
    patterns: [/^adult infusion/i, /^infusion/i, /^maintenance/i, /^tiva/i, /^icu sedation/i, /^continuous/i] },
  { key: "adult", label: "Adult — general", tone: "border-drugs/30 bg-drugs/5",
    patterns: [/^adults?\b/i] },
  { key: "paediatric", label: "Paediatric", tone: "border-physiology/30 bg-physiology/5",
    patterns: [/^paed/i, /^paediatrics?/i, /^pediatric/i, /^children/i, /^neonat/i] },
  { key: "elderly", label: "Elderly / frail", tone: "border-perioperative/30 bg-perioperative/5",
    patterns: [/^elderly/i, /^frail/i, /^elderly\/obese/i, /^elderly\/frail/i] },
  { key: "renal", label: "Renal impairment / RRT", tone: "border-clinical/30 bg-clinical/5",
    patterns: [/^renal/i, /^renal impairment/i, /^renal replacement/i, /^crcl/i, /^rrt/i, /^cvvh/i, /^renal adjustment/i] },
  { key: "hepatic", label: "Hepatic impairment", tone: "border-pharmacology/30 bg-pharmacology/5",
    patterns: [/^hepatic/i, /^liver/i] },
  { key: "obese", label: "Obesity", tone: "border-perioperative/30 bg-perioperative/5",
    patterns: [/^obese/i, /^obesity/i, /^bariatric/i] },
  { key: "obstetric", label: "Obstetric", tone: "border-physiology/30 bg-physiology/5",
    patterns: [/^obstetric/i, /^pregnan/i] },
  { key: "other", label: "Other / context", tone: "border-border bg-card",
    patterns: [/^post-operative/i, /^post operative/i, /^icu/i, /^prophylaxis/i, /^altitude/i] },
];

function classifySegment(label: string): { key: string; label: string; tone: string } {
  for (const rule of DOSING_RULES) {
    if (rule.patterns.some((re) => re.test(label.trim()))) {
      // Use the original written label (more specific than the bucket label) when helpful
      return { key: rule.key, label: rule.label, tone: rule.tone };
    }
  }
  return { key: "notes", label: label.trim().replace(/[:.]$/, ""), tone: "border-border bg-card" };
}

function parseDosing(raw: string): { buckets: DosingBucket[]; preface: string } {
  if (!raw) return { buckets: [], preface: "" };
  // Match "Label: ..." segments. Labels may contain spaces, slashes, parentheses, hyphens.
  const regex = /([A-Z][A-Za-z0-9 /()\-–]{1,50}?):\s+/g;
  const matches: Array<{ label: string; start: number; end: number }> = [];
  let m: RegExpExecArray | null;
  while ((m = regex.exec(raw)) !== null) {
    matches.push({ label: m[1], start: m.index, end: m.index + m[0].length });
  }
  if (matches.length === 0) return { buckets: [], preface: raw.trim() };
  const preface = raw.slice(0, matches[0].start).trim();
  const buckets: DosingBucket[] = [];
  for (let i = 0; i < matches.length; i++) {
    const cur = matches[i];
    const nextStart = i + 1 < matches.length ? matches[i + 1].start : raw.length;
    const body = raw.slice(cur.end, nextStart).trim().replace(/\s+/g, " ");
    if (!body) continue;
    const cls = classifySegment(cur.label);
    buckets.push({ key: `${cls.key}-${i}`, label: cur.label.trim(), tone: cls.tone, body });
  }
  return { buckets, preface };
}

function DosingBreakdown({ raw }: { raw: string }) {
  const { buckets, preface } = parseDosing(raw);
  if (buckets.length === 0) {
    return (
      <section className="bg-card border border-border rounded-lg p-4">
        <h3 className="text-sm font-semibold text-foreground mb-2">Dosing — regimen defaults & patient context</h3>
        <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">{raw || "—"}</p>
      </section>
    );
  }
  return (
    <section className="bg-card border border-border rounded-lg p-4">
      <h3 className="text-sm font-semibold text-foreground mb-1">Dosing — regimen defaults & patient context</h3>
      <p className="text-[11px] text-muted-foreground mb-3">
        Bolus and infusion ranges below; paediatric, renal, hepatic and elderly adjustments are split out where relevant.
      </p>
      {preface && (
        <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{preface}</p>
      )}
      <div className="grid sm:grid-cols-2 gap-2.5">
        {buckets.map((b) => (
          <div key={b.key} className={`rounded-md border ${b.tone} p-3`}>
            <div className="text-[10px] uppercase tracking-wide font-semibold text-foreground/80 mb-1">{b.label}</div>
            <div className="text-sm text-foreground/90 leading-relaxed">{b.body}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// =====================================================================
// Standardized Avoid / Caution / Preferred badges (shared with PathophysDrugMapper convention)
// =====================================================================
type Impact = "avoid" | "caution" | "preferred" | "neutral";

const IMPACT_DEFINITIONS: Record<Exclude<Impact, "neutral">, { label: string; tone: string; description: string }> = {
  avoid: {
    label: "Avoid",
    tone: "bg-destructive/10 text-destructive border-destructive/30",
    description: "Serious or potentially irreversible harm — do not use, or use only when no safer alternative exists.",
  },
  caution: {
    label: "Caution",
    tone: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30",
    description: "Predictable adverse effect or pitfall — anticipate, mitigate and monitor closely.",
  },
  preferred: {
    label: "Preferred / required",
    tone: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
    description: "Mandatory or strongly recommended monitoring / target — should be in place during use.",
  },
};

const NEUTRAL_TONE = "bg-muted text-muted-foreground border-border";

// Detect whether a bolus / infusion range string actually carries usable dosing
// (some drugs are explicitly "Not used as an infusion" etc.).
function isRangePresent(value: string | null | undefined): boolean {
  if (!value) return false;
  const v = value.trim();
  if (!v || v === "—" || v === "-" || v === "N/A" || v === "n/a") return false;
  if (/^not\s+(used|typically|applicable|given|administered|recommended|usually)/i.test(v)) return false;
  if (/^(none|nil)\b/i.test(v)) return false;
  return true;
}

function RangeBadge({ present, label, compact = false }: { present: boolean; label?: string; compact?: boolean }) {
  const tone = present
    ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30"
    : "bg-muted text-muted-foreground border-border";
  const text = compact
    ? present ? "✓" : "—"
    : `${label ?? ""} ${present ? "✓" : "—"}`.trim();
  const title = present
    ? `${label ?? "Range"} dose available`
    : `${label ?? "Range"} not applicable for this drug`;
  return (
    <span
      title={title}
      className={`text-[10px] uppercase tracking-wide font-semibold px-1.5 py-0.5 rounded border ${tone}`}
    >
      {text}
    </span>
  );
}

// Classification is delegated to a per-class keyword map; see
// `src/lib/drug-impact-classifier.ts` for the editable rules.
function classifyImpact(
  label: string,
  body: string,
  mode: "side_effects" | "monitoring",
  drugClass?: string,
): Impact {
  return classifyImpactExternal(label, body, mode, drugClass) as Impact;
}

function parseLabelled(raw: string): Array<{ label: string; body: string }> {
  if (!raw) return [];
  const regex = /([A-Z][A-Za-z0-9 /()\-–'’]{1,60}?):\s+/g;
  const matches: Array<{ label: string; start: number; end: number }> = [];
  let m: RegExpExecArray | null;
  while ((m = regex.exec(raw)) !== null) {
    matches.push({ label: m[1], start: m.index, end: m.index + m[0].length });
  }
  if (matches.length === 0) {
    // Split on sentences as fallback so each item can be badged.
    return raw.split(/(?<=\.)\s+(?=[A-Z])/).map((s) => ({ label: "", body: s.trim() })).filter((x) => x.body);
  }
  const out: Array<{ label: string; body: string }> = [];
  const preface = raw.slice(0, matches[0].start).trim();
  if (preface) out.push({ label: "", body: preface });
  for (let i = 0; i < matches.length; i++) {
    const cur = matches[i];
    const nextStart = i + 1 < matches.length ? matches[i + 1].start : raw.length;
    const body = raw.slice(cur.end, nextStart).trim().replace(/\s+/g, " ");
    if (body) out.push({ label: cur.label.trim(), body });
  }
  return out;
}

function ImpactBadge({ impact }: { impact: Impact }) {
  if (impact === "neutral") {
    return (
      <span className={`text-[10px] uppercase tracking-wide font-semibold px-2 py-0.5 rounded-full border ${NEUTRAL_TONE}`}>
        Note
      </span>
    );
  }
  const def = IMPACT_DEFINITIONS[impact];
  return (
    <span
      title={def.description}
      className={`text-[10px] uppercase tracking-wide font-semibold px-2 py-0.5 rounded-full border ${def.tone}`}
    >
      {def.label}
    </span>
  );
}

function ImpactLegend() {
  return (
    <div className="flex flex-wrap gap-x-3 gap-y-1.5 mb-3 text-[11px] text-muted-foreground">
      <span className="font-medium text-foreground">Legend:</span>
      {(Object.keys(IMPACT_DEFINITIONS) as Array<Exclude<Impact, "neutral">>).map((k) => {
        const def = IMPACT_DEFINITIONS[k];
        return (
          <span key={k} className="inline-flex items-center gap-1.5">
            <span className={`text-[10px] uppercase tracking-wide font-semibold px-1.5 py-0.5 rounded border ${def.tone}`}>
              {def.label}
            </span>
            <span>{def.description}</span>
          </span>
        );
      })}
    </div>
  );
}

// =====================================================================
// Quick-target panel — extracts haemodynamic / ECG / TDM thresholds
// =====================================================================

interface QuickTarget {
  key: string;
  label: string;
  value: string;
  category: "haemodynamic" | "ecg" | "tdm" | "depth" | "other";
}

const NUM = "\\d+(?:\\.\\d+)?";
const _RANGE = `(?:${NUM}\\s*[-–—]\\s*${NUM}|[<>≤≥]\\s*${NUM}|${NUM})`;
// permissive unit list
const _UNITS = "(?:mmHg|bpm|ms|mg/L|µg/ml|mcg/ml|µg/mL|mcg/mL|ng/mL|ng/ml|mg/dL|µmol/L|/min|%)?";

function tryMatch(text: string, label: string, category: QuickTarget["category"], pattern: RegExp): QuickTarget[] {
  const out: QuickTarget[] = [];
  let m: RegExpExecArray | null;
  const seen = new Set<string>();
  const re = new RegExp(pattern.source, pattern.flags.includes("g") ? pattern.flags : pattern.flags + "g");
  while ((m = re.exec(text)) !== null) {
    const value = (m[1] ?? m[0]).trim().replace(/\s+/g, " ");
    if (!value || seen.has(value)) continue;
    seen.add(value);
    out.push({ key: `${label}-${out.length}`, label, value, category });
    if (out.length >= 2) break; // cap per metric
  }
  return out;
}

function extractQuickTargets(raw: string): QuickTarget[] {
  if (!raw) return [];
  const t = raw.replace(/\s+/g, " ");
  const out: QuickTarget[] = [];

  // Haemodynamic
  out.push(...tryMatch(t, "MAP", "haemodynamic",
    /MAP[^.]{0,40}?((?:>|<|≥|≤)?\s*\d+(?:\s*[-–—]\s*\d+)?\s*mmHg?)/i));
  out.push(...tryMatch(t, "SBP", "haemodynamic",
    /SBP[^.]{0,40}?((?:>|<|≥|≤)?\s*\d+(?:\s*[-–—]\s*\d+)?\s*mmHg?)/i));
  out.push(...tryMatch(t, "DBP", "haemodynamic",
    /DBP[^.]{0,40}?((?:>|<|≥|≤)?\s*\d+(?:\s*[-–—]\s*\d+)?\s*mmHg?)/i));
  out.push(...tryMatch(t, "BP", "haemodynamic",
    /\bBP[^.]{0,40}?((?:>|<|≥|≤)?\s*\d{2,3}\s*\/\s*\d{2,3}\s*mmHg?)/i));
  out.push(...tryMatch(t, "HR", "haemodynamic",
    /\bHR[^.]{0,40}?((?:>|<|≥|≤)?\s*\d+(?:\s*[-–—]\s*\d+)?\s*(?:bpm|\/min))/i));

  // ECG / QT
  out.push(...tryMatch(t, "QTc", "ecg",
    /QTc[^.]{0,40}?((?:>|<|≥|≤)?\s*\d{2,4}\s*ms)/i));
  out.push(...tryMatch(t, "QT interval", "ecg",
    /QT (?:interval|prolong\w*)[^.]{0,40}?((?:>|<|≥|≤)?\s*\d{2,4}\s*ms)/i));

  // Depth of anaesthesia / sedation
  out.push(...tryMatch(t, "BIS", "depth",
    /BIS[^.]{0,30}?((?:>|<|≥|≤)?\s*\d{2,3}(?:\s*[-–—]\s*\d{2,3})?)/i));
  out.push(...tryMatch(t, "RASS", "depth",
    /RASS[^.]{0,30}?(target\s*)?((?:[-+]?\d)(?:\s*to\s*[-+]?\d)?)/i));
  out.push(...tryMatch(t, "MAC", "depth",
    /(?:end-tidal\s*)?MAC[^.]{0,30}?(\d(?:\.\d+)?\s*[-–—]\s*\d(?:\.\d+)?)/i));
  out.push(...tryMatch(t, "ETCO₂", "depth",
    /ETCO2?[^.]{0,30}?((?:>|<|≥|≤)?\s*\d(?:\.\d+)?\s*[-–—]?\s*\d?(?:\.\d+)?\s*kPa)/i));

  // TDM levels
  out.push(...tryMatch(t, "Trough", "tdm",
    /trough[^.]{0,60}?((?:>|<|≥|≤)?\s*\d+(?:\.\d+)?\s*[-–—]?\s*\d*(?:\.\d+)?\s*(?:mg\/L|µg\/ml|mcg\/ml|ng\/mL|ng\/ml))/i));
  out.push(...tryMatch(t, "Peak", "tdm",
    /peak[^.]{0,60}?((?:>|<|≥|≤)?\s*\d+(?:\.\d+)?\s*[-–—]?\s*\d*(?:\.\d+)?\s*(?:mg\/L|µg\/ml|mcg\/ml|ng\/mL|ng\/ml))/i));
  out.push(...tryMatch(t, "AUC₂₄", "tdm",
    /AUC[\s\d:]*[^.]{0,40}?(\d+(?:\.\d+)?\s*[-–—]\s*\d+(?:\.\d+)?\s*mg[·\.]?h\/L)/i));
  out.push(...tryMatch(t, "Therapeutic level", "tdm",
    /(?:therapeutic range|target level|plasma level|level[s]?)[^.]{0,60}?(\d+(?:\.\d+)?\s*[-–—]\s*\d+(?:\.\d+)?\s*(?:mg\/L|µg\/ml|mcg\/ml|ng\/mL|ng\/ml))/i));

  // Other useful objective targets
  out.push(...tryMatch(t, "SpO₂", "other",
    /SpO2?[^.]{0,30}?((?:>|<|≥|≤)?\s*\d{2,3}\s*%)/i));
  out.push(...tryMatch(t, "Temperature", "other",
    /temperature[^.]{0,30}?((?:>|<|≥|≤)?\s*\d{2}(?:\.\d+)?\s*°C)/i));
  out.push(...tryMatch(t, "TOF ratio", "other",
    /TOF[^.]{0,30}?((?:>|<|≥|≤)?\s*0?\.\d+)/i));

  return out;
}

const CATEGORY_TONES: Record<QuickTarget["category"], { label: string; tone: string }> = {
  haemodynamic: { label: "Haemodynamic", tone: "border-clinical/40 bg-clinical/5 text-clinical" },
  ecg: { label: "ECG / QT", tone: "border-destructive/30 bg-destructive/5 text-destructive" },
  tdm: { label: "Drug levels", tone: "border-pharmacology/40 bg-pharmacology/5 text-pharmacology" },
  depth: { label: "Depth / sedation", tone: "border-icu/40 bg-icu/5 text-icu" },
  other: { label: "Other targets", tone: "border-border bg-muted/30 text-foreground" },
};

function QuickTargetPanel({ raw }: { raw: string }) {
  const targets = extractQuickTargets(raw);
  if (targets.length === 0) return null;

  // group by category
  const grouped = targets.reduce<Record<QuickTarget["category"], QuickTarget[]>>((acc, t) => {
    (acc[t.category] ||= []).push(t);
    return acc;
  }, {} as Record<QuickTarget["category"], QuickTarget[]>);

  const order: QuickTarget["category"][] = ["haemodynamic", "ecg", "depth", "tdm", "other"];

  return (
    <section className="bg-drugs/5 border border-drugs/30 rounded-lg p-4">
      <h3 className="text-sm font-semibold text-foreground mb-1">Quick targets</h3>
      <p className="text-[11px] text-muted-foreground mb-3">
        Auto-extracted thresholds from the monitoring text — verify in the full notes below.
      </p>
      <div className="grid gap-2">
        {order.filter((c) => grouped[c]?.length).map((cat) => {
          const meta = CATEGORY_TONES[cat];
          return (
            <div key={cat} className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] uppercase tracking-wide font-semibold text-muted-foreground mr-1">
                {meta.label}
              </span>
              {grouped[cat].map((tgt) => (
                <span
                  key={tgt.key}
                  className={`inline-flex items-baseline gap-1 text-[11px] font-mono px-2 py-0.5 rounded-md border ${meta.tone}`}
                  title={`${tgt.label}: ${tgt.value}`}
                >
                  <span className="font-sans font-semibold not-italic">{tgt.label}</span>
                  <span>{tgt.value}</span>
                </span>
              ))}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ClinicalSignalPanel({
  title,
  raw,
  mode,
  drugClass,
}: {
  title: string;
  raw: string;
  mode: "side_effects" | "monitoring";
  drugClass?: string;
}) {
  const items = parseLabelled(raw);
  if (items.length === 0) {
    return (
      <section className="bg-card border border-border rounded-lg p-4">
        <h3 className="text-sm font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">—</p>
      </section>
    );
  }
  const subtitle =
    mode === "monitoring"
      ? "Drug levels, haemodynamic targets and ECG/QTc considerations — banded by clinical priority."
      : "Adverse effects banded by severity to guide vigilance.";
  return (
    <section className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-baseline justify-between gap-2 mb-1">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        {drugClass && (
          <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
            class rules: {drugClass}
          </span>
        )}
      </div>
      <p className="text-[11px] text-muted-foreground mb-2">{subtitle}</p>
      <ImpactLegend />
      <ul className="grid gap-2">
        {items.map((it, i) => {
          const impact = classifyImpact(it.label, it.body, mode, drugClass);
          return (
            <li key={i} className="flex items-start gap-2.5 bg-background/50 border border-border rounded-md p-2.5">
              <div className="shrink-0 pt-0.5">
                <ImpactBadge impact={impact} />
              </div>
              <div className="text-sm text-foreground/90 leading-relaxed min-w-0">
                {it.label && (
                  <span className="font-medium text-foreground">{it.label}: </span>
                )}
                <span className="text-foreground/85">{it.body}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

// =====================================================================
// Preparation guide — step-by-step draw-up + dilution helper
// =====================================================================

const DILUENT_TONES: Array<{ match: RegExp; label: string; tone: string }> = [
  { match: /glucose\s*5%|5%\s*glucose|d5w|dextrose\s*5%/i, label: "Glucose 5%", tone: "bg-clinical/10 text-clinical border-clinical/30" },
  { match: /0\.9%\s*saline|normal\s*saline|sodium\s*chloride|nacl/i, label: "0.9% Saline", tone: "bg-physiology/10 text-physiology border-physiology/30" },
  { match: /water for injection|sterile water|wfi/i, label: "Water for Injection", tone: "bg-pharmacology/10 text-pharmacology border-pharmacology/30" },
  { match: /hartmann|compound sodium lactate|csl|ringer/i, label: "Hartmann's", tone: "bg-icu/10 text-icu border-icu/30" },
];

function detectDiluents(text: string): Array<{ label: string; tone: string }> {
  const out: Array<{ label: string; tone: string }> = [];
  for (const d of DILUENT_TONES) {
    if (d.match.test(text) && !out.find((x) => x.label === d.label)) {
      out.push({ label: d.label, tone: d.tone });
    }
  }
  return out;
}

function extractDilutions(text: string): Array<{ raw: string; mgPerMl: number; mcgPerMl: number }> {
  const out: Array<{ raw: string; mgPerMl: number; mcgPerMl: number }> = [];
  const seen = new Set<string>();
  const re = /(\d+(?:\.\d+)?)\s*(mg|g|mcg|micrograms?|units?)\s*(?:in|\/)\s*(\d+(?:\.\d+)?)\s*(?:ml|mls)/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    const amount = parseFloat(m[1]);
    const unit = m[2].toLowerCase();
    const ml = parseFloat(m[3]);
    if (!ml) continue;
    let mg = amount;
    if (unit === "g") mg = amount * 1000;
    else if (unit.startsWith("mcg") || unit.startsWith("microgram")) mg = amount / 1000;
    const key = `${m[1]}${unit}-${ml}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const mgPerMl = mg / ml;
    out.push({ raw: m[0], mgPerMl, mcgPerMl: mgPerMl * 1000 });
    if (out.length >= 6) break;
  }
  return out;
}

function splitSteps(raw: string): string[] {
  if (!raw) return [];
  const numbered = raw.match(/\d+\.\s+[^]+?(?=(?:\s\d+\.\s)|$)/g);
  if (numbered && numbered.length >= 2) {
    return numbered.map((s) => s.replace(/^\d+\.\s+/, "").trim()).filter(Boolean);
  }
  return raw
    .split(/(?<=\.)\s+(?=[A-Z(])/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

function WorkedExample({ drug }: { drug: Drug }) {
  const std = drug.infusion_standard || {};
  if (!std.amount_mg || !std.diluent_ml || !std.unit) return null;

  const concMgPerMl = std.amount_mg / std.diluent_ml;
  const concMcgPerMl = concMgPerMl * 1000;
  const weight = 70;
  const exampleRate =
    std.unit === "mcg/kg/min" ? 0.1
    : std.unit === "mcg/min" ? 20
    : std.unit === "mg/kg/hr" ? 2
    : std.unit === "mcg/kg/hr" ? 5
    : std.unit === "units/hr" ? 2
    : std.unit === "mg/hr" ? 5
    : 1;

  let mlPerHr = 0;
  let workings = "";
  if (std.unit === "mcg/kg/min") {
    const mcgPerMin = exampleRate * weight;
    mlPerHr = (mcgPerMin * 60) / concMcgPerMl;
    workings = `${exampleRate} mcg/kg/min × ${weight} kg = ${mcgPerMin.toFixed(1)} mcg/min → ×60 = ${(mcgPerMin * 60).toFixed(0)} mcg/hr ÷ ${concMcgPerMl.toFixed(0)} mcg/mL = ${mlPerHr.toFixed(2)} mL/hr`;
  } else if (std.unit === "mcg/min") {
    mlPerHr = (exampleRate * 60) / concMcgPerMl;
    workings = `${exampleRate} mcg/min × 60 = ${(exampleRate * 60).toFixed(0)} mcg/hr ÷ ${concMcgPerMl.toFixed(0)} mcg/mL = ${mlPerHr.toFixed(2)} mL/hr`;
  } else if (std.unit === "mg/kg/hr") {
    mlPerHr = (exampleRate * weight) / concMgPerMl;
    workings = `${exampleRate} mg/kg/hr × ${weight} kg = ${(exampleRate * weight).toFixed(1)} mg/hr ÷ ${concMgPerMl.toFixed(2)} mg/mL = ${mlPerHr.toFixed(2)} mL/hr`;
  } else if (std.unit === "mcg/kg/hr") {
    mlPerHr = (exampleRate * weight) / concMcgPerMl;
    workings = `${exampleRate} mcg/kg/hr × ${weight} kg = ${(exampleRate * weight).toFixed(1)} mcg/hr ÷ ${concMcgPerMl.toFixed(0)} mcg/mL = ${mlPerHr.toFixed(2)} mL/hr`;
  } else if (std.unit === "units/hr" || std.unit === "mg/hr") {
    mlPerHr = exampleRate / concMgPerMl;
    workings = `${exampleRate} ${std.unit} ÷ ${concMgPerMl.toFixed(2)} ${std.unit.replace("/hr", "/mL")} = ${mlPerHr.toFixed(2)} mL/hr`;
  }

  return (
    <div className="rounded-md border border-drugs/30 bg-drugs/5 p-3 mt-3">
      <div className="text-[10px] uppercase tracking-wide font-semibold text-drugs mb-1.5">Worked example</div>
      <div className="text-xs text-foreground/90 leading-relaxed">
        <div className="mb-1">
          <span className="font-medium">Mix:</span> {std.amount_mg} mg in {std.diluent_ml} mL ={" "}
          <span className="font-mono">{concMgPerMl.toFixed(2)} mg/mL</span>
          {concMcgPerMl >= 1 && <> (<span className="font-mono">{concMcgPerMl.toFixed(0)} mcg/mL</span>)</>}
        </div>
        <div className="mb-1">
          <span className="font-medium">Target:</span> {exampleRate} {std.unit}
          {std.weight_based && <> for a {weight} kg adult</>}
        </div>
        <div className="font-mono text-[11px] text-foreground/80 bg-background/60 rounded px-2 py-1 border border-border whitespace-pre-wrap">
          {workings}
        </div>
        <div className="text-[11px] text-muted-foreground mt-1.5">Adjust the live calculator below for other weights and target rates.</div>
      </div>
    </div>
  );
}

function PreparationGuide({ raw, drug }: { raw: string; drug: Drug }) {
  const steps = splitSteps(raw);
  const dilutions = extractDilutions(raw);
  const diluents = detectDiluents(raw);

  if (!raw) {
    return (
      <section className="bg-card border border-border rounded-lg p-4">
        <h3 className="text-sm font-semibold text-foreground mb-2">Preparation & dilution guide</h3>
        <p className="text-sm text-muted-foreground">—</p>
      </section>
    );
  }

  return (
    <section className="bg-card border border-border rounded-lg p-4">
      <h3 className="text-sm font-semibold text-foreground mb-1">Preparation & dilution guide</h3>
      <p className="text-[11px] text-muted-foreground mb-3">
        Step-by-step draw-up, common concentrations and a worked dilution example.
      </p>

      {(diluents.length > 0 || dilutions.length > 0) && (
        <div className="mb-3 grid gap-2">
          {diluents.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold mr-1">Diluents</span>
              {diluents.map((d) => (
                <span key={d.label} className={`text-[10px] uppercase tracking-wide font-semibold px-2 py-0.5 rounded-full border ${d.tone}`}>
                  {d.label}
                </span>
              ))}
            </div>
          )}
          {dilutions.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold mr-1">Common concentrations</span>
              {dilutions.map((d, i) => (
                <span
                  key={i}
                  className="text-[11px] font-mono px-2 py-0.5 rounded-md border border-drugs/30 bg-drugs/5 text-foreground"
                  title={`${d.mgPerMl.toFixed(3)} mg/mL = ${d.mcgPerMl.toFixed(1)} mcg/mL`}
                >
                  {d.raw} → {d.mgPerMl >= 1 ? `${d.mgPerMl.toFixed(2)} mg/mL` : `${d.mcgPerMl.toFixed(0)} mcg/mL`}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      <ol className="space-y-2">
        {steps.map((s, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span className="shrink-0 h-5 w-5 rounded-full bg-drugs/15 text-drugs text-[11px] font-semibold grid place-items-center mt-0.5">
              {i + 1}
            </span>
            <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-line">{s}</p>
          </li>
        ))}
      </ol>

      <WorkedExample drug={drug} />
    </section>
  );
}

function InfusionCalculator({ drug }: { drug: Drug }) {
  const std = drug.infusion_standard || {};
  const [weight, setWeight] = useState<number>(70);
  const [rate, setRate] = useState<number>(0.1);

  if (!std.amount_mg || !std.diluent_ml || !std.unit) return null;

  const concMgPerMl = std.amount_mg / std.diluent_ml;
  const concMcgPerMl = concMgPerMl * 1000;
  const weightBased = std.weight_based;

  // Compute mL/hr
  let mlPerHr = 0;
  if (std.unit === "mcg/kg/min") {
    const mcgPerMin = rate * weight;
    mlPerHr = (mcgPerMin * 60) / concMcgPerMl;
  } else if (std.unit === "mcg/min") {
    mlPerHr = (rate * 60) / concMcgPerMl;
  } else if (std.unit === "mg/kg/hr") {
    mlPerHr = (rate * weight) / concMgPerMl;
  } else if (std.unit === "mcg/kg/hr") {
    mlPerHr = (rate * weight) / concMcgPerMl;
  } else if (std.unit === "units/hr" || std.unit === "mg/hr") {
    mlPerHr = rate / concMgPerMl;
  }

  return (
    <section className="bg-drugs/5 border border-drugs/30 rounded-lg p-4">
      <h3 className="text-sm font-semibold text-foreground mb-1">Infusion calculator</h3>
      <p className="text-xs text-muted-foreground mb-3">
        Standard mix: <span className="font-medium text-foreground">{std.amount_mg} mg in {std.diluent_ml} mL</span>
        {" "}({concMgPerMl.toFixed(2)} mg/mL{std.note ? ` — ${std.note}` : ""})
      </p>
      <div className="grid grid-cols-2 gap-3 mb-3">
        {weightBased && (
          <label className="text-xs">
            <span className="block text-muted-foreground mb-1">Weight (kg)</span>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
              className="w-full px-2 py-1.5 rounded border border-border bg-background text-sm"
            />
          </label>
        )}
        <label className="text-xs">
          <span className="block text-muted-foreground mb-1">Target ({std.unit})</span>
          <input
            type="number"
            step="0.01"
            value={rate}
            onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
            className="w-full px-2 py-1.5 rounded border border-border bg-background text-sm"
          />
        </label>
      </div>
      <div className="text-sm">
        <span className="text-muted-foreground">Pump rate: </span>
        <span className="font-semibold text-drugs">{mlPerHr.toFixed(2)} mL/hr</span>
      </div>
    </section>
  );
}

export default function DrugDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [drug, setDrug] = useState<Drug | null>(null);
  const [loading, setLoading] = useState(true);
  const [crashCardMinimised, setCrashCardMinimised] = useState<boolean>(() => {
    try {
      return localStorage.getItem("drug-crash-card-minimised") === "1";
    } catch {
      return false;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem("drug-crash-card-minimised", crashCardMinimised ? "1" : "0");
    } catch {
      // ignore
    }
  }, [crashCardMinimised]);

  useEffect(() => {
    (async () => {
      if (!slug) return;
      const { data } = await supabase.from("drugs").select("*").eq("slug", slug).maybeSingle();
      setDrug(data as Drug | null);
      setLoading(false);
    })();
  }, [slug]);

  const relatedTopics = useMemo(() => {
    if (!drug?.related_topic_ids?.length) return [];
    return allTopics.filter((t) => drug.related_topic_ids.includes(t.id) && t.available);
  }, [drug]);

  if (loading) return (
    <div className="min-h-screen bg-background"><main className="container mx-auto px-4 py-8"><p className="text-sm text-muted-foreground">Loading…</p></main></div>
  );
  if (!drug) return (
    <div className="min-h-screen bg-background"><main className="container mx-auto px-4 py-8 max-w-4xl">
      <Breadcrumbs items={[{ label: "Drug Formulary", to: "/drugs" }, { label: "Not found" }]} />
      <Link to="/drugs" className="text-sm text-drugs inline-flex items-center gap-1 mb-4"><ArrowLeft className="h-3.5 w-3.5"/>Back to formulary</Link>
      <p className="text-sm text-muted-foreground">Drug not found.</p>
    </main></div>
  );

  return (
    <div className="min-h-screen bg-background">
      
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <Breadcrumbs items={[{ label: "Drug Formulary", to: "/drugs" }, { label: drug.name }]} />
        <Link to="/drugs" className="text-sm text-muted-foreground hover:text-drugs inline-flex items-center gap-1 mb-3">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to formulary
        </Link>

        {/* Sticky crash card */}
        <div className="sticky top-14 z-30 bg-background/95 backdrop-blur-sm py-3 -mx-4 px-4 mb-4 border-b border-border">
          <div className="bg-drugs/5 border border-drugs/40 rounded-xl p-4">
            <div className="flex items-start gap-3 flex-wrap">
              <div className="h-9 w-9 rounded-lg bg-drugs/15 text-drugs grid place-items-center shrink-0">
                <Pill className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <h1 className="text-xl font-bold text-foreground">{drug.name}</h1>
                  <span className="text-[10px] uppercase tracking-wide text-drugs font-medium">{drug.drug_class}</span>
                  {(() => {
                    const hasBolus = isRangePresent(drug.adult_bolus_dose);
                    const hasInfusion = isRangePresent(drug.infusion_range);
                    return (
                      <span className="inline-flex items-center gap-1 ml-auto">
                        <RangeBadge present={hasBolus} label="Bolus" />
                        <RangeBadge present={hasInfusion} label="Infusion" />
                        <button
                          onClick={() => setCrashCardMinimised((v) => !v)}
                          className="ml-1 h-6 w-6 grid place-items-center rounded-md text-muted-foreground hover:bg-drugs/10 hover:text-drugs transition-colors"
                          aria-label={crashCardMinimised ? "Expand drug card" : "Minimise drug card"}
                          aria-expanded={!crashCardMinimised}
                        >
                          {crashCardMinimised ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
                        </button>
                      </span>
                    );
                  })()}
                </div>
                {!crashCardMinimised && (
                  <>
                    {drug.synonyms?.length > 0 && (
                      <p className="text-[11px] text-muted-foreground mt-0.5">aka {drug.synonyms.join(", ")}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1.5">{drug.indication_oneliner}</p>
                    <div className="grid sm:grid-cols-2 gap-2 mt-2.5 text-xs">
                      {(() => {
                        const hasBolus = isRangePresent(drug.adult_bolus_dose);
                        const hasInfusion = isRangePresent(drug.infusion_range);
                        return (
                          <>
                            <div className={`border rounded-md px-2.5 py-1.5 ${hasBolus ? "bg-card border-border" : "bg-muted/30 border-border/60"}`}>
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-[10px] uppercase tracking-wide text-muted-foreground">Adult bolus</span>
                                <RangeBadge present={hasBolus} compact />
                              </div>
                              <div className={`font-medium ${hasBolus ? "text-foreground" : "text-muted-foreground italic"}`}>
                                {drug.adult_bolus_dose || "Not applicable"}
                              </div>
                            </div>
                            <div className={`border rounded-md px-2.5 py-1.5 ${hasInfusion ? "bg-card border-border" : "bg-muted/30 border-border/60"}`}>
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-[10px] uppercase tracking-wide text-muted-foreground">Infusion</span>
                                <RangeBadge present={hasInfusion} compact />
                              </div>
                              <div className={`font-medium ${hasInfusion ? "text-foreground" : "text-muted-foreground italic"}`}>
                                {drug.infusion_range || "Not applicable"}
                              </div>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                    {drug.key_warning && (
                      <div className="mt-2 flex items-start gap-1.5 text-xs text-destructive bg-destructive/5 border border-destructive/20 rounded-md px-2 py-1.5">
                        <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                        <span>{drug.key_warning}</span>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {(() => {
          const sectionLinks: Array<{ id: string; label: string }> = [
            { id: "infusion", label: "Infusion calc" },
            { id: "presentation", label: "Presentation" },
            { id: "moa", label: "MoA" },
            { id: "pk", label: "PK" },
            { id: "preparation", label: "Preparation" },
            { id: "dosing", label: "Dosing" },
            { id: "monitoring", label: "Monitoring" },
            { id: "side-effects", label: "Side effects" },
            { id: "contraindications", label: "Contraindications" },
            { id: "interactions", label: "Interactions" },
          ];
          return (
            <nav
              aria-label="Drug sections"
              className="mt-3 -mx-4 px-4 py-2 border-b border-border bg-background/95 backdrop-blur-sm overflow-x-auto"
            >
              <ul className="flex items-center gap-1.5 min-w-max">
                {sectionLinks.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="inline-block text-[11px] font-medium px-2.5 py-1 rounded-full border border-border bg-card text-muted-foreground hover:border-drugs/50 hover:text-drugs transition-colors whitespace-nowrap"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          );
        })()}

        <div id="infusion" className="scroll-mt-32">
          <InfusionCalculator drug={drug} />
        </div>

        <div className="mt-4 grid gap-3">
          <div id="presentation" className="scroll-mt-32"><Section title="Presentation" body={drug.presentation} /></div>
          <div id="moa" className="scroll-mt-32"><Section title="Mechanism of action" body={drug.mechanism_of_action} /></div>
          <div id="pk" className="scroll-mt-32"><Section title="Pharmacokinetics" body={drug.pharmacokinetics} /></div>
          <div id="preparation" className="scroll-mt-32"><PreparationGuide raw={drug.preparation} drug={drug} /></div>
          <div id="dosing" className="scroll-mt-32"><DosingBreakdown raw={drug.dosing} /></div>
          <div id="monitoring" className="scroll-mt-32 grid gap-3">
            <QuickTargetPanel raw={drug.monitoring} />
            <ClinicalSignalPanel title="Monitoring requirements" raw={drug.monitoring} mode="monitoring" drugClass={drug.drug_class} />
          </div>
          <div id="side-effects" className="scroll-mt-32"><ClinicalSignalPanel title="Side effects" raw={drug.side_effects} mode="side_effects" drugClass={drug.drug_class} /></div>
          <div id="contraindications" className="scroll-mt-32"><Section title="Contraindications" body={drug.contraindications} /></div>
          <div id="interactions" className="scroll-mt-32"><Section title="Interactions" body={drug.interactions} /></div>
        </div>

        {relatedTopics.length > 0 && (
          <section className="mt-6 bg-muted/30 border border-border rounded-lg p-4">
            <h3 className="text-sm font-semibold text-foreground mb-2">Related curriculum topics</h3>
            <ul className="flex flex-wrap gap-2">
              {relatedTopics.map((t) => (
                <li key={t.id}>
                  <Link
                    to={`${sectionMeta[t.section].path}/${t.id}`}
                    className="text-xs px-2.5 py-1 rounded-full border border-border bg-card hover:border-drugs/50 hover:text-drugs transition-colors"
                  >
                    {t.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}

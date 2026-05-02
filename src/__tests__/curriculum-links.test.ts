/**
 * Validates every CorPictum plate's `curriculumLinks` entry.
 *
 *  1. Format check — `code` must match the RCoA `XX_BK_NN` pattern
 *     (two upper-case letters, `_BK_`, two digits).
 *  2. Destination check — when `anchor` is set, an element with the
 *     matching `id="..."` must exist in the topic page that renders
 *     the folio. Catches typos like `#coronary-suply` that scroll to
 *     nowhere and silently break the in-app cross-reference UX.
 *  3. Sanity checks — `title` non-empty, `exams` non-empty, no duplicate
 *     (code, anchor) pairs within a single plate.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, it, expect } from "vitest";

import * as folios from "@/components/diagrams/anatomyFolios";
import type { CorPictumFolioData } from "@/components/diagrams/anatomyFolios";
import {
  isCurriculumCodeFormat,
  isCurriculumCode,
  ALL_CURRICULUM_CODES,
} from "@/data/curriculumCodes";

/** folio export name → topic page that renders it */
const FOLIO_TO_PAGE: Record<string, string> = {
  airwayFolio: "src/pages/topics/AirwayManagementTopic.tsx",
  headNeckFolio: "src/pages/topics/HeadNeckAnatomyTopic.tsx",
  neuroFolio: "src/pages/topics/NeuroanatomyTopic.tsx",
  spinalFolio: "src/pages/topics/SpinalAnatomyTopic.tsx",
  brachialFolio: "src/pages/topics/BrachialPlexusTopic.tsx",
  upperLimbFolio: "src/pages/topics/UpperLimbAnatomyTopic.tsx",
  lowerLimbFolio: "src/pages/topics/LowerLimbAnatomyTopic.tsx",
  thoracicFolio: "src/pages/topics/ThoracicAnatomyTopic.tsx",
  abdominalFolio: "src/pages/topics/AbdominalAnatomyTopic.tsx",
  cardiacFolio: "src/pages/topics/CardiacAnatomyTopic.tsx",
};

/** Mirror of `slugify` in src/components/SectionLayout.tsx. */
const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

/**
 * Collect every anchor that the topic page makes available at runtime:
 *   • literal `id="..."` / `id={"..."}` attributes
 *   • slugified `<h2>` text content (auto-injected by SectionLayout as
 *     `toc-<slug>` — we accept both the raw slug and the `toc-` form so
 *     authors can use either in folio data)
 *   • literal string props like `sectionId="…"` and JSX prop ids
 */
function extractAnchorIds(filePath: string): Set<string> {
  const src = readFileSync(resolve(process.cwd(), filePath), "utf8");
  const ids = new Set<string>();

  // 1. Literal id="..." / id={"..."}
  const idRe = /\bid=(?:"([^"]+)"|\{\s*"([^"]+)"\s*\})/g;
  let m: RegExpExecArray | null;
  while ((m = idRe.exec(src))) ids.add(m[1] ?? m[2]);

  // 2. <h2> literal text → slug + toc-slug
  const h2Re = /<h2[^>]*>([\s\S]*?)<\/h2>/g;
  while ((m = h2Re.exec(src))) {
    // strip nested JSX expressions and tags to keep only literal text
    const text = m[1]
      .replace(/\{[^{}]*\}/g, " ")
      .replace(/<[^>]+>/g, " ")
      .trim();
    if (!text) continue;
    const slug = slugify(text);
    if (slug) {
      ids.add(slug);
      ids.add(`toc-${slug}`);
    }
  }

  return ids;
}

describe("CorPictum curriculumLinks", () => {
  for (const [folioName, pagePath] of Object.entries(FOLIO_TO_PAGE)) {
    const folio = (folios as Record<string, CorPictumFolioData>)[folioName];

    describe(folioName, () => {
      it("is exported from anatomyFolios", () => {
        expect(folio).toBeDefined();
        expect(folio.plates.length).toBeGreaterThan(0);
      });

      const pageIds = extractAnchorIds(pagePath);

      for (const plate of folio.plates) {
        const links = plate.curriculumLinks ?? [];
        if (links.length === 0) continue;

        describe(`plate "${plate.id}"`, () => {
          it.each(links.map((l, i) => [i, l] as const))(
            "link[%i] %o passes format + destination checks",
            (_i, link) => {
              // 1. Format
              expect(
                CODE_RE.test(link.code),
                `code "${link.code}" must match XX_BK_NN`,
              ).toBe(true);

              // 2. Sanity
              expect(link.title.trim().length).toBeGreaterThan(0);
              expect(link.exams.length).toBeGreaterThan(0);

              // 3. Destination
              if (link.anchor) {
                expect(
                  pageIds.has(link.anchor),
                  `anchor "#${link.anchor}" referenced by ${folioName} → ${plate.id} → ${link.code} ` +
                    `does not match any id="..." in ${pagePath}. ` +
                    `Available ids: ${[...pageIds].sort().join(", ") || "(none)"}`,
                ).toBe(true);
              }
            },
          );

          it("has no duplicate (code, anchor) pairs", () => {
            const seen = new Set<string>();
            for (const l of links) {
              const key = `${l.code}@${l.anchor ?? ""}`;
              expect(seen.has(key), `duplicate link ${key}`).toBe(false);
              seen.add(key);
            }
          });
        });
      }
    });
  }
});

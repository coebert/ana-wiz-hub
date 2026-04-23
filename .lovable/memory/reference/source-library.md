---
name: Source library
description: Canonical bibliographic source library at src/data/sources.ts mapping source IDs (peck-hill, bja-education, nice, das, nap, etc.) to full reference details, with resolveReference()/resolveReferences() helpers used by topicReferences entries
type: reference
---

`src/data/sources.ts` is the canonical bibliographic library. Each `Source` (id, shortName, type, author, title, publisher, edition, year, url) describes ONE textbook / journal / guideline body / society / national audit (e.g. `peck-hill`, `cross-plunkett`, `al-shaikh-stacey`, `bja-education`, `nice`, `aagbi`, `das`, `rcoa`, `ics`, `ficm`, `nap`, `ssc`, `kdigo`).

**How to cite from `topicReferences[topicId]`:**

A. **Legacy (still supported, no migration required):** hand-rolled `{ label, citation, url? }` `Reference` objects.

B. **New (preferred for new topics):** call `resolveReference({ sourceId, locator?, year?, url?, articleTitle?, articleAuthor?, label? })` which returns a fully-formatted `Reference`. Locator examples: `"Ch.3"` for textbooks, `"17(3):73-78"` for journals, `"CG65"` for NICE, `"NAP5"` for NAP. Use `resolveReferences([...])` to mix compact + legacy entries during incremental migration.

**Why:** Stops duplication of full citation prose across 121 topics, gives consistent rendering format across textbooks/journals/guidelines/audits, and exposes `SourceType` so the UI can later badge or filter by evidence class without touching topic files.

**How to apply:** Add new sources to the `sources` array with a stable kebab-case id (matches `/^[a-z][a-z0-9-]*$/`, enforced by `src/__tests__/sources.test.ts`). Use the resolver in any new `topicReferences` entry; existing entries keep working unchanged.

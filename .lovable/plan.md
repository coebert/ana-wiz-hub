# Component folder reorganisation

## Scope

- **In scope:** the ~80 loose files directly under `src/components/`. Group them into concern subfolders. All import specifiers across `src/`, `scripts/`, `tests/` rewritten in one automated pass.
- **Deferred:** the 480 files under `src/components/diagrams/`. Categorising them into per-section subfolders (physics / cardiac / airway / anatomy / etc.) requires reading each file's usage to determine which section it belongs to — filename alone is often ambiguous (e.g. `AAShuntAnimation`, `AlveolarGasEquationDiagram`). That belongs in a separate PR with a per-file mapping table, not a mass-move. I'll leave `diagrams/` at its current path.

## Proposed component subfolders

```text
src/components/
  layout/         Header, NavLink, Breadcrumbs, SectionLayout, StickyTOC,
                  TopicTableOfContents, ThemeToggle, ReduceMotionToggle,
                  UpdateBanner, UnitPreferenceMenu, SearchDialog,
                  VisitTrackerWrapper, RequireAdmin, NeonSplash
  topic/          TopicTemplate, TopicCard, TopicPager, TopicFaqs,
                  TopicPodcastPlayer, TopicReferencesButton, TopicCompletionToggle,
                  TopicExamFilterBar, LearningObjectives, KeyLearningPoints,
                  WorkedExamples, SynthesisBlock, DiagramSection,
                  CollapsibleSubsection, SectionSummary, SectionTopicsList,
                  SectionReferences, SectionReferencesPanel, LazyDiagrams,
                  SeeAlso, CrossReferenceCallout, FRCARelevanceCallout
  exam/           ExamHub, ExamMappingBadges, ExamSection, ExamSummary,
                  ExamPitfallsCallout
  quiz/           QuizSection
  references/     Cite, InlineRef, References, ReferencesList, GuidelineSources
  viva/           VivaLauncher, VivaRubric, VivaSession, DemoVivaInteractive,
                  DemoVivaPlayer, DemoVivaStepper, MicConfidenceMeter, MicHelpPanel
  clinical/       SedationCaseScenarios, SedationDecisionGate,
                  SedationDischargeChecklist, SedationRescueLadder,
                  HITAssessmentBlock, FourTsScorePanel,
                  EmergencySurgeryGlossaryDrawer, CriticalTransferChecklist,
                  SnodReferralDecider, RadiationDoseComparisonTable,
                  RadiationSafetyChecklist, DbiTimeline, LabGlossaryPopover
  feedback/       CommentWall, SupportSection, ReportInaccuracyDialog
  ops/            LighthouseHistoryPanel, CoverageBreakdownPanel, SeoScanPanel
  ui/             (unchanged — shadcn primitives)
  admin/          (unchanged — already a subfolder)
  diagrams/       (unchanged — see "Deferred" above)
  Qty.tsx, ProgressRing.tsx  → shared/  (small primitives)
```

## Execution steps

1. Create the target subfolders.
2. `mv` each file to its new home (bash loop, one commit's worth of moves).
3. Rewrite imports project-wide with a single `sed` pass:
   - `@/components/Foo` → `@/components/<category>/Foo` for every moved file.
   - Relative imports inside `src/components/*.tsx` that used `./Foo` get normalised to `@/components/<category>/Foo` so future moves don't cascade.
4. `bunx tsgo --noEmit` to confirm clean typecheck. Any missed rewrites surface immediately as TS2307.
5. Fix stragglers; rerun typecheck.

## Risk / rollback

- Roughly 400–600 import lines touched. Because typecheck is the gate, breakage is loud and fast — not silent.
- Test files, Playwright specs and scripts also import from `@/components/*` and get the same treatment.
- Version history lets you roll back in one click if the diff looks wrong.

## What I need from you

Confirm the grouping above (any file you want moved to a different bucket — say so and I'll adjust), and confirm you're OK deferring `diagrams/` to a follow-up. Once you say go, I execute steps 1–5 in one turn.

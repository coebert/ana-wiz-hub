# AnaesthesiaCore: paid Apple App Store readiness

## Agreed goal
A native iPhone app, sold as a **one-time paid download through Apple**, for Primary FRCA, Final FRCA and FFICM learners. Prioritise trustworthy teaching, intuitive revision and value for money. No price or release date is assumed.

The existing curriculum, interactive figures, quizzes, search and progress tools are the foundation—not a reason to add more content indiscriminately. Do not advertise paused AI or held recordings as paid features.

## 1. Establish a release baseline first
- Create a focused readiness register with evidence, priority, owner and completion gate. Distinguish current source, live behaviour and older notes; several roadmap entries conflict with later AI-pause work.
- Exercise real iPhone-sized learning journeys: select an exam, find a topic, read teaching and sources, inspect a figure, complete a quiz, save progress and resume. Test sign-in separately with an authorised account.
- Inventory privacy disclosures, account deletion, analytics, permissions, content/image rights, source gaps and known failing checks. Missing source-search results are not proof a feature is absent.
- Identify what needs clinical review and what needs product work. No broad clinical rewrite, database changes or release during this stage.

**First deliverable:** a prioritised, evidence-backed gap list and small, bounded improvement batches—not a claim that the app is ready.

## 2. Set the accuracy and paid-value gates
- Arrange independent clinician review of release content, prioritising high-risk doses, calculators, paediatric care, emergencies and anatomy. Automated tests and citations do not certify accuracy.
- Resolve or explicitly exclude unresolved material from the release; retain source limitations, historical context and withdrawn procedural artwork. Preserve clinical holds and the AI safety pause.
- Reconcile matching quizzes, figures and generated copies only when approved source corrections require it.
- Agree a sustainable update and support commitment before setting the price. Do not promise lifetime updates without defining what is included.
- Keep educational/exam-preparation positioning distinct from clinical decision support; assess regulatory implications if intended use changes.

**Gate:** reviewed scope and honest limitations support the advertised paid offering.

## 3. Improve the iPhone learning experience
- Use the first-stage observations to fix navigation and reading friction while preserving the current design, normal spacing and comprehensive teaching.
- Verify touch targets, safe areas, text enlargement, VoiceOver, figure enlargement, keyboard behaviour, back navigation and light/dark contrast.
- Make interrupted loading and loss of connection understandable, without silently serving stale clinical material. Offline downloads are a separate decision, not included automatically.
- Keep account access optional where it is not required; explain which learning records require an account.

**Gate:** core study journeys work on real iPhones, not only browser-sized previews.

## 4. Prepare native delivery and Apple compliance
- Use Capacitor with the existing React app; no framework rewrite. Prepare native packaging in a bounded implementation batch after the baseline.
- The release must bundle tested web assets. Never submit a native build that loads the Lovable development preview or uses development hot reload.
- A substantial learning app must meet Apple's minimum-functionality requirement; a website wrapper alone is not an approval guarantee.
- Apple handles the paid download in App Store Connect. Do not enable Stripe or Paddle, add subscriptions or alter current donation/payment settings.
- Review external support links against current Apple rules and intended storefronts; any iOS-specific changes require a separate bounded approval and must preserve the website's support arrangements.
- Verify native sign-in and callback behaviour, current Apple sign-in requirements and provider configuration. Existing Apple sign-in code is not proof native sign-in works.
- Provide a verified in-app account-deletion path where required, including Apple authorisation revocation when applicable. Any backend/account-lifecycle work requires a separate approval.
- Complete privacy policy, data inventory, retention/deletion details, App Store privacy disclosures, required SDK privacy manifests and applicable required-reason API declarations.

**Gate:** signed release build, compliant account/privacy flows and a documented SDK inventory.

## 5. Beta, pricing and submission
- Test the signed app through TestFlight with representative Primary FRCA, Final FRCA and FFICM learners. Measure task completion, confusing screens and perceived value before choosing a price.
- Run focused regressions plus release-wide checks; record inherited failures instead of refreshing baselines to hide them. Respect this environment's restriction on manually running builds/typechecks; record automatic validation separately and obtain local Xcode/release evidence.
- Prepare screenshots from the real app, accurate descriptions, support/privacy URLs, age rating, review notes and reviewer access where required. Do not claim college endorsement or clinical certification without evidence.
- The owner needs Apple Developer Program membership, the Paid Apps Agreement, tax/banking details, and a Mac with Xcode or an authorised release partner. Verify current Apple fees and terms before any purchase.
- Submit through App Store Connect only after an explicit instruction; keep manual release control.

## Boundaries and approval
Approval starts **Stage 1 only**: read-only readiness assessment, actual public learning-flow checks, and a prioritised register. Later implementation batches are scoped from that evidence. No publication, deployment, generation, audio changes, hold release, database writes, credential changes or payment setup is authorised by this plan.

This initial review has not verified hosted policies, native builds, all clinical content, account deletion or every learner flow. Current source contains AI-pause guards; older notes asserting no activation are stale and must not guide a rollback.

## Reference guidance
- [Apple App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/) — medical safety 1.4.1, purchases 3.1, minimum functionality 4.2, login 4.8, privacy/deletion 5.1.1.
- [Apple account deletion](https://developer.apple.com/help/app-review/guideline-reference/5-1-1-account-deletion/)
- [Apple third-party SDK requirements](https://developer.apple.com/support/third-party-SDK-requirements/)
- [App Store Connect workflow](https://developer.apple.com/help/app-store-connect/get-started/app-store-connect-workflow/)
- [Lovable Capacitor mobile development guide](https://lovable.dev/blog/capacitor-mobile-development) — read before local native setup.

Apple approval is case-specific; the plan is not an approval prediction or clinical sign-off.
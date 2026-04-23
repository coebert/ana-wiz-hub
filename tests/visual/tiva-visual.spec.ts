import { test, expect, type Page } from "@playwright/test";

/**
 * Visual regression check for the TIVA topic page.
 *
 * Verifies that diagrams (SVG content) and animated cues
 * (`animate-fade-in` / model-switch transition) render correctly
 * at mobile, tablet, and desktop widths.
 *
 * Baselines live in tests/visual/__snapshots__/. To update after an
 * intentional design change run:
 *   npx playwright test tests/visual/tiva-visual.spec.ts --update-snapshots
 */

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 820, height: 1180 },
  { name: "desktop", width: 1366, height: 768 },
] as const;

const TIVA_PATH = "/clinical/tiva";

/** Pause CSS animations & transitions so screenshots are deterministic. */
async function freezeAnimations(page: Page) {
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
      }
    `,
  });
}

/**
 * Wait for diagrams to be FULLY rendered, not just present in the DOM.
 *
 * Slower CI machines and cold caches frequently produced flaky screenshots
 * because the SVG `<svg>` element existed but its content (axes, plotted
 * paths, legend text) had not yet been drawn by React's effect / raf
 * passes. We now wait on stable, content-specific signals from each of
 * the three TIVA diagrams so the screenshot only fires after every plot
 * has actually painted its contents.
 */
async function waitForDiagrams(page: Page) {
  await page.waitForLoadState("networkidle");

  // 1. Container-level: at least one SVG diagram in the DOM and visible.
  await page
    .locator("svg")
    .first()
    .waitFor({ state: "visible", timeout: 15_000 });

  // 2. TCISimulatorDiagram — wait for the static legend labels that
  //    render on every paint regardless of model selection / animation.
  await expect
    .poll(
      async () =>
        (await page.locator("svg text", { hasText: "Marsh Cp (solid)" }).count()) > 0,
      { timeout: 15_000, message: "TCISimulatorDiagram legend not rendered" },
    )
    .toBe(true);
  await expect
    .poll(
      async () =>
        (await page.locator("svg text", { hasText: "Target Ce" }).count()) > 0,
      { timeout: 15_000, message: "TCISimulatorDiagram target label not rendered" },
    )
    .toBe(true);
  // Plotted curves: TCISimulatorDiagram draws several <path> elements for
  // Marsh/Schnider Cp/Ce; insist on the curves having rendered.
  await expect
    .poll(async () => await page.locator("svg path").count(), {
      timeout: 15_000,
      message: "TCI simulator paths not rendered",
    })
    .toBeGreaterThan(4);

  // 3. CSHTDiagram — drug names are rendered as <text> labels for each
  //    plotted drug. Wait for the canonical set so we know the curves are
  //    drawn and the legend is laid out.
  for (const drug of ["Propofol", "Remifentanil", "Fentanyl"]) {
    await expect
      .poll(
        async () =>
          (await page.locator("svg text", { hasText: drug }).count()) > 0,
        { timeout: 15_000, message: `CSHTDiagram missing drug label "${drug}"` },
      )
      .toBe(true);
  }

  // 4. DecrementTimeDiagram — a "min" axis tick proves the y-axis labels
  //    have actually rendered (rather than just the empty SVG frame).
  await expect
    .poll(
      async () =>
        (await page.locator("svg text", { hasText: /min$/ }).count()) > 0,
      { timeout: 15_000, message: "DecrementTimeDiagram axis ticks not rendered" },
    )
    .toBe(true);

  // 5. Animated cue blocks should be mounted (model-switch fade-in).
  await page
    .locator(".animate-fade-in")
    .first()
    .waitFor({ state: "attached", timeout: 10_000 });

  // 6. Final settle: wait for fonts so text-metric-driven layout is
  //    stable (fallback → web font swap can move text by 1–2px and produce
  //    pixel diffs), then for two animation frames so React commits land.
  await page.evaluate(async () => {
    if ("fonts" in document) {
      await (document as unknown as { fonts: { ready: Promise<unknown> } })
        .fonts.ready;
    }
  });
  await page.evaluate(
    () =>
      new Promise((r) =>
        requestAnimationFrame(() => requestAnimationFrame(() => r(null))),
      ),
  );
}

test.describe("TIVA page — visual regression across viewports", () => {
  for (const vp of VIEWPORTS) {
    test(`renders diagrams & animated cues at ${vp.name} (${vp.width}×${vp.height})`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(TIVA_PATH, { waitUntil: "domcontentloaded" });
      await waitForDiagrams(page);
      await freezeAnimations(page);

      // 1. Sanity: at least one SVG and one animated block rendered
      const svgCount = await page.locator("svg").count();
      expect(svgCount, "expected SVG diagrams to render").toBeGreaterThan(0);

      const animatedCount = await page.locator(".animate-fade-in").count();
      expect(
        animatedCount,
        "expected at least one animated cue block",
      ).toBeGreaterThan(0);

      // 2. Sanity: no element overflows the viewport horizontally
      const overflowingElements = await page.evaluate((vw) => {
        const offenders: { tag: string; right: number; cls: string }[] = [];
        document.querySelectorAll("body *").forEach((el) => {
          const r = (el as HTMLElement).getBoundingClientRect();
          if (r.right > vw + 1 && r.width > 4) {
            offenders.push({
              tag: el.tagName,
              right: Math.round(r.right),
              cls: (el as HTMLElement).className?.toString().slice(0, 60) ?? "",
            });
          }
        });
        return offenders.slice(0, 5);
      }, vp.width);
      expect(
        overflowingElements,
        `elements overflow ${vp.width}px viewport`,
      ).toEqual([]);

      // 3. Full-page screenshot baseline
      await expect(page).toHaveScreenshot(`tiva-${vp.name}.png`, {
        fullPage: true,
        animations: "disabled",
        maxDiffPixelRatio: 0.02,
      });

      // 4. Diagram-region close-up baseline (first SVG)
      const firstSvg = page.locator("svg").first();
      await expect(firstSvg).toHaveScreenshot(`tiva-${vp.name}-first-diagram.png`, {
        animations: "disabled",
        maxDiffPixelRatio: 0.02,
      });
    });
  }
});

test.describe("TIVA page — model selector interaction & animated cue updates", () => {
  // Runs once at desktop only — the interaction logic is viewport-independent
  // and re-running across all 3 viewports would triple the snapshot footprint
  // without exercising new code paths.
  test("switching PK model re-runs the fade-in cue and updates content", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1366, height: 768 });
    await page.goto(TIVA_PATH, { waitUntil: "domcontentloaded" });
    await waitForDiagrams(page);

    // The "TCI Model Explorer" panel is the only block whose header is
    // exactly that string — scope all interactions/screenshots to it so a
    // change elsewhere on the page can't flake this test.
    const explorer = page
      .locator("div", {
        has: page.getByRole("heading", { name: "TCI Model Explorer" }),
      })
      .first();
    await expect(explorer).toBeVisible();

    // The animated cue is the `.animate-fade-in` block keyed on the
    // selected model — re-mounted on every selection.
    const cue = explorer.locator(".animate-fade-in").first();

    // Default state: Marsh selected → header reads "Marsh Model — Propofol".
    await expect(cue).toContainText("Marsh Model");
    await expect(cue).toContainText("Propofol");

    // Settle for the baseline screenshot. Freeze CSS animations only AFTER
    // we've captured the initial render so the click below can play the
    // 0.3s fade-in we explicitly want to verify.
    await freezeAnimations(page);
    await expect(cue).toHaveScreenshot("tiva-model-cue-marsh.png", {
      animations: "disabled",
      maxDiffPixelRatio: 0.02,
    });

    // Unfreeze: re-add a stylesheet that restores default durations so the
    // model-switch fade-in animation actually runs.
    await page.addStyleTag({
      content: `*, *::before, *::after { animation-duration: revert !important; transition-duration: revert !important; }`,
    });

    // Click the Schnider button — this triggers React to remount the
    // `.animate-fade-in` block (because its `key` changes), replaying the
    // 0.3s fade-in keyframe.
    await page.getByRole("button", { name: /^Schnider/ }).click();

    // Wait for the cue to actually settle on the new content. Polling on
    // text content is more reliable than waiting on `animationend` because
    // the old node is unmounted before the listener can attach.
    await expect(cue).toContainText("Schnider Model", { timeout: 5_000 });
    await expect(cue).toContainText("Age, weight, height, sex, LBM");

    // Wait for the fade-in animation to finish (keyframe is 0.3s) plus a
    // small buffer for compositor commit.
    await page.waitForTimeout(450);

    // Re-freeze for a deterministic screenshot.
    await freezeAnimations(page);

    await expect(cue).toHaveScreenshot("tiva-model-cue-schnider.png", {
      animations: "disabled",
      maxDiffPixelRatio: 0.02,
    });

    // Switch a third time (Eleveld) and verify another fade-in cycle runs
    // — covers the case where React might fail to remount on repeat keys.
    await page.addStyleTag({
      content: `*, *::before, *::after { animation-duration: revert !important; transition-duration: revert !important; }`,
    });
    await page.getByRole("button", { name: /^Eleveld/ }).click();
    await expect(cue).toContainText("Eleveld Model", { timeout: 5_000 });
    await expect(cue).toContainText(/opioid interaction/i);
    await page.waitForTimeout(450);
    await freezeAnimations(page);
    await expect(cue).toHaveScreenshot("tiva-model-cue-eleveld.png", {
      animations: "disabled",
      maxDiffPixelRatio: 0.02,
    });
  });

  test("toggling a CSHT drug hides its curve and updates the legend", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1366, height: 768 });
    await page.goto(TIVA_PATH, { waitUntil: "domcontentloaded" });
    await waitForDiagrams(page);
    await freezeAnimations(page);

    // Scope to the CSHT diagram block — its <h3> is "Context-Sensitive
    // Half-Time (CSHT)".
    const csht = page
      .locator("div", {
        has: page.getByRole("heading", {
          name: /Context-Sensitive Half-Time/i,
        }),
      })
      .first();
    await expect(csht).toBeVisible();

    // Baseline: all 5 drug curves rendered → at least 5 plotted <path>s.
    const pathCount = await csht.locator("svg path").count();
    expect(pathCount, "expected ≥5 CSHT drug curves").toBeGreaterThanOrEqual(5);
    await expect(csht).toHaveScreenshot("tiva-csht-all-drugs.png", {
      animations: "disabled",
      maxDiffPixelRatio: 0.02,
    });

    // Toggle Fentanyl off via the drug button (rendered as a <button> in
    // CSHTDiagram with the drug name as its text).
    const fentanylBtn = csht.getByRole("button", { name: /^Fentanyl/ });
    await fentanylBtn.click();

    // Wait for the SVG to re-render without the Fentanyl path. Easiest
    // signal: the in-SVG <text> label "Fentanyl" disappears (it's only
    // rendered for visible drugs).
    await expect(csht.locator("svg text", { hasText: "Fentanyl" })).toHaveCount(
      0,
      { timeout: 5_000 },
    );

    // Path count should drop by exactly 1 (one curve removed).
    const newPathCount = await csht.locator("svg path").count();
    expect(
      newPathCount,
      "expected exactly one fewer plotted path after toggling Fentanyl off",
    ).toBe(pathCount - 1);

    // Other drug labels still present.
    for (const drug of ["Propofol", "Remifentanil"]) {
      await expect(
        csht.locator("svg text", { hasText: drug }),
      ).not.toHaveCount(0);
    }

    await expect(csht).toHaveScreenshot("tiva-csht-fentanyl-off.png", {
      animations: "disabled",
      maxDiffPixelRatio: 0.02,
    });
  });
});

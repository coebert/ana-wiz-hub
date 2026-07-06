import { test, expect } from "@playwright/test";

/**
 * End-to-end regression for the sign-out → clear → re-sign-in flow.
 *
 * The bug this guards against: if `signOut()` fails to purge the per-user
 * localStorage caches (`anaesthesia-core-progress`, `-subsection-progress`,
 * `-recent-topics`) and the `*-cloud-migrated:<userId>` flags, then any
 * "junk" local progress left over from an anonymous session would get
 * union-merged into the next signed-in user's cloud rows on their next
 * sign-in — silently inflating the dashboard.
 *
 * Flow:
 *   1. Sign in with a test email user.
 *   2. Record the "cloud-only" FRCA Primary progress count.
 *   3. Sign out — this must wipe the three progress keys + migrated flags.
 *   4. Seed junk into localStorage (simulating an anonymous browse).
 *   5. Hard-reload.
 *   6. Sign in again.
 *   7. Assert the dashboard's FRCA Primary count equals the cloud baseline
 *      (i.e. the junk was NOT merged in).
 *
 * Requires env vars TEST_USER_EMAIL and TEST_USER_PASSWORD for a real
 * account on the project's Cloud Auth (email/password confirmed).
 *
 * Run:
 *   TEST_USER_EMAIL=... TEST_USER_PASSWORD=... \
 *     npx playwright test tests/e2e/signout-clears-local-progress.spec.ts
 */

const EMAIL = process.env.TEST_USER_EMAIL;
const PASSWORD = process.env.TEST_USER_PASSWORD;

const STORAGE_KEYS = [
  "anaesthesia-core-progress",
  "anaesthesia-core-subsection-progress",
  "anaesthesia-core-recent-topics",
];

// Any real Primary-tagged topic id would inflate the count if leaked.
// Use one that's very unlikely to already be marked complete on the test
// account. If the account happens to have it done, swap for another id
// from src/data/curriculum.
const JUNK_TOPIC_ID = "atomic-structure-bonding";

test.describe("sign-out clears local progress caches", () => {
  test.skip(!EMAIL || !PASSWORD, "TEST_USER_EMAIL/TEST_USER_PASSWORD not set");

  test("junk local progress is not merged into cloud on next sign-in", async ({ page }) => {
    // 1. Sign in.
    await page.goto("/login");
    await page.getByLabel(/email/i).fill(EMAIL!);
    await page.getByLabel(/password/i).fill(PASSWORD!);
    await page.getByRole("button", { name: /sign in/i }).first().click();

    // Land on the dashboard (Landing renders HomeDashboard for signed-in users).
    await page.goto("/");
    const primaryBar = page
      .getByRole("progressbar", { name: /FRCA Primary progress/i })
      .first();
    await expect(primaryBar).toBeVisible({ timeout: 15000 });
    const baseline = Number(await primaryBar.getAttribute("aria-valuenow"));
    expect(Number.isFinite(baseline)).toBe(true);

    // Snapshot the cloud-only Recent Topics ("Continue where you left off")
    // hrefs. The section renders nothing when the user has no recent topics,
    // so we tolerate both an empty and a populated baseline.
    const continueBand = page.getByRole("region", {
      name: /continue where you left off/i,
    });
    const baselineRecentHrefs = (await continueBand.count())
      ? await continueBand.getByRole("link").evaluateAll((els) =>
          (els as HTMLAnchorElement[]).map((a) => new URL(a.href).pathname)
        )
      : [];

    // 2. Sign out — opens the header account menu, clicks Sign out.
    // signOut() triggers a hard reload to "/", so wait for it.
    await page.getByRole("button", { name: /account|profile|menu/i }).first().click().catch(() => {});
    // Fallback: some viewports show the account trigger by initial only.
    const signOut = page.getByRole("menuitem", { name: /sign out/i }).or(
      page.getByRole("button", { name: /sign out/i })
    );
    await signOut.first().click();
    await page.waitForURL(/\/$/, { timeout: 10000 });

    // 3. Confirm signOut wiped the caches.
    const clearedKeys = await page.evaluate((keys) => {
      const migrated: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.includes("-cloud-migrated:")) migrated.push(k);
      }
      return {
        remaining: keys.filter((k) => localStorage.getItem(k) !== null),
        migrated,
      };
    }, STORAGE_KEYS);
    expect(clearedKeys.remaining).toEqual([]);
    expect(clearedKeys.migrated).toEqual([]);

    // 4. Seed junk into localStorage (as if an anonymous user browsed and
    //    ticked topics we never want merged into the cloud account).
    await page.evaluate(
      ({ keys, junkId }) => {
        localStorage.setItem(
          keys[0],
          JSON.stringify({ completedTopics: [junkId] })
        );
        localStorage.setItem(
          keys[1],
          JSON.stringify({ [junkId]: ["intro", "summary"] })
        );
        localStorage.setItem(
          keys[2],
          JSON.stringify([{ topicId: junkId, visitedAt: Date.now() }])
        );
      },
      { keys: STORAGE_KEYS, junkId: JUNK_TOPIC_ID }
    );

    // 5. Hard reload to boot every context from the seeded localStorage.
    await page.reload();

    // 6. Sign in again.
    await page.goto("/login");
    await page.getByLabel(/email/i).fill(EMAIL!);
    await page.getByLabel(/password/i).fill(PASSWORD!);
    await page.getByRole("button", { name: /sign in/i }).first().click();
    await page.goto("/");

    const primaryBar2 = page
      .getByRole("progressbar", { name: /FRCA Primary progress/i })
      .first();
    await expect(primaryBar2).toBeVisible({ timeout: 15000 });

    // Give the union-merge effect a moment; if signOut had failed to purge
    // the migrated flag, this is when the junk would be uploaded.
    await page.waitForTimeout(2000);

    // 7. Assert the dashboard still reflects cloud-only progress.
    const after = Number(await primaryBar2.getAttribute("aria-valuenow"));
    expect(after).toBe(baseline);

    // And confirm the seeded local junk is not present in the completed set
    // that ProgressContext hydrated from cloud.
    const localProgress = await page.evaluate(
      (k) => localStorage.getItem(k),
      STORAGE_KEYS[0]
    );
    expect(localProgress ?? "").not.toContain(JUNK_TOPIC_ID);
  });
});

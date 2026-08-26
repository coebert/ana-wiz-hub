import { test, expect, type Page } from "@playwright/test";
import {
  confirmTestUser,
  deleteTestUser,
  testEmail,
  TEST_PASSWORD,
} from "./provisionTestUser";

/**
 * End-to-end proof that account creation persists progress across sessions.
 *
 * Flow:
 *   1. Sign up a brand-new user through the /login "Create account" tab.
 *   2. Mark a topic as completed (writes to `public.user_topic_progress`).
 *   3. Sign out (which purges every local progress cache).
 *   4. Wipe localStorage entirely — simulating a different device/browser.
 *   5. Sign back in and assert the topic still reads "Completed!" — i.e. the
 *      state came from the cloud, not from local storage.
 *
 * Email confirmation is enabled on the project, so `signUp()` alone yields no
 * usable session. Rather than skipping, the spec provisions a deterministic,
 * pre-confirmed account in the reserved `e2e.anaesthesiacore.test` domain via
 * the `e2e-provision-user` edge function, then signs in with it. The account
 * is recreated per run (empty cloud progress) and deleted afterwards.
 *
 * Run:
 *   npx playwright test tests/e2e/signup-progress-rehydrates.spec.ts
 */

const TOPIC_PATH = "/physics/temperature-measurement";
const SECOND_TOPIC_PATH = "/physics/venturi-mask";

/** Escape a string for safe use inside a RegExp. */
const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const PROGRESS_KEYS = [
  "anaesthesia-core-progress",
  "anaesthesia-core-subsection-progress",
  "anaesthesia-core-recent-topics",
];

const PASSWORD = TEST_PASSWORD;

/** Fill and submit the /login form in the requested mode. */
async function submitAuthForm(page: Page, mode: "signin" | "signup", email: string, password: string) {
  await page.goto("/login");
  if (mode === "signup") {
    await page.getByRole("tab", { name: /create account|sign up/i }).click();
  }
  const form = page.locator("form").filter({ has: page.locator('input[type="password"]') }).first();
  await form.locator('input[type="email"]').fill(email);
  await form.locator('input[type="password"]').fill(password);
  await form.getByRole("button", { name: /sign in|create account/i }).first().click();
}

/** True once the Supabase client has an access token in storage. */
async function hasSession(page: Page): Promise<boolean> {
  return page
    .waitForFunction(
      () =>
        Object.keys(localStorage).some(
          (k) => k.startsWith("sb-") && k.endsWith("-auth-token") && !!localStorage.getItem(k)
        ),
      undefined,
      { timeout: 15000 }
    )
    .then(() => true)
    .catch(() => false);
}

const completionToggle = (page: Page) =>
  page.getByRole("button", { name: /mark as completed|completed!/i }).first();

test.describe("progress survives sign-out and a fresh session", () => {
  let provisionedEmail: string | undefined;

  test.afterAll(async () => {
    if (provisionedEmail) await deleteTestUser(provisionedEmail);
  });

  test("a new account's topic completion rehydrates from the cloud", async ({ page }) => {
    // ---- 1. Create the account through the real signup UI -------------
    // The address lives in the reserved e2e domain, so the backend can
    // confirm it for us instead of us needing the confirmation e-mail.
    const email = testEmail("progress");
    const password = PASSWORD;
    provisionedEmail = email;

    await submitAuthForm(page, "signup", email, password);
    let signedIn = await hasSession(page);

    if (!signedIn) {
      // Email confirmation is enabled — confirm the account server-side
      // (test-mode bypass) and sign in normally.
      await confirmTestUser(email, password);
      await submitAuthForm(page, "signin", email, password);
      signedIn = await hasSession(page);
    }

    expect(signedIn, "expected an authenticated session after account creation").toBe(true);

    // ---- 2. Record progress on a topic --------------------------------
    await page.goto(TOPIC_PATH);
    const toggle = completionToggle(page);
    await expect(toggle).toBeVisible({ timeout: 15000 });

    // Normalise: if the fallback account already completed it, untick first
    // so we exercise a real write in this session.
    if (await toggle.getByText(/completed!/i).count()) {
      await toggle.click();
      await expect(toggle).toContainText(/mark as completed/i);
      await page.waitForTimeout(1000);
    }
    await toggle.click();
    await expect(toggle).toContainText(/completed!/i);

    // ---- 2b. Tick subsection checkboxes -------------------------------
    const subsectionChecks = page.getByRole("checkbox", { name: /^Mark ".*" as (not )?complete$/i });
    await expect(subsectionChecks.first()).toBeVisible({ timeout: 15000 });
    const checkCount = Math.min(await subsectionChecks.count(), 2);
    expect(checkCount, "expected at least one subsection tick on the topic page").toBeGreaterThan(0);

    const tickedLabels: string[] = [];
    for (let i = 0; i < checkCount; i++) {
      const box = subsectionChecks.nth(i);
      const label = (await box.getAttribute("aria-label")) ?? "";
      if ((await box.getAttribute("aria-checked")) === "true") {
        // Normalise to unchecked so this session performs a real write.
        await box.click();
        await expect(box).toHaveAttribute("aria-checked", "false");
        await page.waitForTimeout(500);
      }
      await box.click();
      await expect(box).toHaveAttribute("aria-checked", "true");
      tickedLabels.push(label.replace(/ as (not )?complete$/i, ""));
    }

    // ---- 2c. Visit a second topic so recent-topics records it ---------
    await page.goto(SECOND_TOPIC_PATH);
    await expect(completionToggle(page)).toBeVisible({ timeout: 15000 });

    const recentBefore = await page.evaluate((k) => localStorage.getItem(k), PROGRESS_KEYS[2]);
    expect(recentBefore ?? "", "recent topics should be recorded locally").toContain("topicId");

    // Let the fire-and-forget cloud upserts land before signing out.
    await page.waitForTimeout(2500);

    // ---- 3. Sign out ---------------------------------------------------
    await page
      .getByRole("button", { name: /account|profile|menu/i })
      .first()
      .click()
      .catch(() => {});
    await page
      .getByRole("menuitem", { name: /sign out/i })
      .or(page.getByRole("button", { name: /sign out/i }))
      .first()
      .click();
    await page.waitForURL(/\/$/, { timeout: 15000 });

    // ---- 4. Simulate a different device: nuke all local state ----------
    await page.evaluate(() => localStorage.clear());
    await page.context().clearCookies();
    await page.reload();

    // The topic must now read as NOT completed (no local cache, no session)
    // and every subsection tick must be gone too.
    await page.goto(TOPIC_PATH);
    await expect(completionToggle(page)).toContainText(/mark as completed/i, { timeout: 15000 });
    for (const partial of tickedLabels) {
      await expect(
        page.getByRole("checkbox", { name: new RegExp(`^${escapeRe(partial)} as complete$`, "i") })
      ).toHaveAttribute("aria-checked", "false");
    }

    // ---- 5. Sign back in and expect the cloud state to rehydrate -------
    await submitAuthForm(page, "signin", email, password);
    expect(await hasSession(page), "expected to be signed in again").toBe(true);

    await page.goto(TOPIC_PATH);
    await expect(completionToggle(page)).toContainText(/completed!/i, { timeout: 20000 });

    // Subsection ticks rehydrate from `user_subsection_progress`.
    for (const partial of tickedLabels) {
      await expect(
        page.getByRole("checkbox", {
          name: new RegExp(`^${escapeRe(partial)} as (not )?complete$`, "i"),
        })
      ).toHaveAttribute("aria-checked", "true", { timeout: 20000 });
    }

    // Recent topics rehydrate from `user_recent_topics` — both visited
    // topics should be back in the local cache after the cloud merge.
    await page.goto("/");
    await expect
      .poll(
        async () => (await page.evaluate((k) => localStorage.getItem(k), PROGRESS_KEYS[2])) ?? "",
        { timeout: 20000 }
      )
      .toContain("topicId");

    const recentAfter = JSON.parse(
      (await page.evaluate((k) => localStorage.getItem(k), PROGRESS_KEYS[2])) ?? "[]"
    ) as { topicId: string }[];
    expect(recentAfter.length, "expected recent topics to rehydrate from the cloud").toBeGreaterThan(
      0
    );

    // And the topic-completion cache should have been repopulated too.
    const cached = await page.evaluate((k) => localStorage.getItem(k), PROGRESS_KEYS[0]);
    expect(cached ?? "").not.toEqual("");

    const subsectionCache = await page.evaluate((k) => localStorage.getItem(k), PROGRESS_KEYS[1]);
    expect(subsectionCache ?? "").not.toEqual("");
  });

});

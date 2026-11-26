import { describe, expect, it } from "vitest";
import { MIGRATION_MAPPING } from "../../scripts/base44/migration-mapping.ts";
import {
  buildSyntheticMigrationInput,
  SYNTHETIC_SENSITIVE_VALUES,
} from "../../scripts/base44/migration-fixtures.ts";
import { runDryRunValidation, validateMapping } from "../../scripts/base44/migration-validate.ts";

const entity = (report: ReturnType<typeof runDryRunValidation>, table: string) => {
  const found = report.entities.find((entry) => entry.sourceTable === table);
  if (!found) throw new Error(`missing entity report for ${table}`);
  return found;
};

describe("Base44 dry-run migration validator", () => {
  it("passes the clean synthetic fixtures", () => {
    const report = runDryRunValidation(buildSyntheticMigrationInput());
    expect(report.mode).toBe("dry-run");
    expect(report.blocking).toEqual([]);
    expect(report.mappingProblems).toEqual([]);
    expect(report.ok).toBe(true);
    expect(report.identities).toEqual({
      sourceAccounts: 3,
      mappedAccounts: 3,
      unmappedAccounts: 0,
      duplicateJoinEmails: 0,
      duplicateIdentityTargets: 0,
      unknownIdentitySources: 0,
    });
    expect(report.roles).toMatchObject({
      sourceRows: 2,
      adminRows: 1,
      unknownRoles: 0,
      adminRoleConfigured: true,
    });
    expect(report.roles.byRole).toEqual({ admin: 1, user: 1 });
    expect(report.totals.countDelta).toBe(0);
    expect(report.totals.sourceRows).toBe(report.totals.targetRows);
  });

  it("reports only aggregates and never a source identifier or body", () => {
    const serialized = JSON.stringify(runDryRunValidation(buildSyntheticMigrationInput()));
    expect(SYNTHETIC_SENSITIVE_VALUES.length).toBeGreaterThan(5);
    for (const value of SYNTHETIC_SENSITIVE_VALUES) {
      expect(serialized).not.toContain(value);
    }
    expect(serialized).not.toMatch(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/);
  });

  it("detects rows whose owner has no identity mapping", () => {
    const input = buildSyntheticMigrationInput();
    input.identities = input.identities.filter((entry) => entry.targetUserId !== "base44-user-2");
    const report = runDryRunValidation(input);
    expect(report.blocking).toContain("ORPHANED_OWNER");
    expect(entity(report, "user_topic_progress").orphanedOwnerRows).toBe(1);
    expect(entity(report, "user_topic_progress").eligibleRows).toBe(2);
    expect(entity(report, "viva_attempts").orphanedOwnerRows).toBe(1);
    expect(entity(report, "support_tickets").orphanedOwnerRows).toBe(1);
    expect(entity(report, "support_messages").orphanedOwnerRows).toBe(1);
    expect(report.identities.unmappedAccounts).toBe(1);
    expect(report.ok).toBe(false);

    const stray = buildSyntheticMigrationInput();
    stray.identities.push({
      sourceId: "11111111-1111-4111-8111-111111111111",
      targetUserId: "base44-user-stray",
    });
    const strayReport = runDryRunValidation(stray);
    expect(strayReport.identities.unknownIdentitySources).toBe(1);
    expect(strayReport.blocking).toContain("UNKNOWN_IDENTITY_SOURCE");
  });

  it("detects duplicate source and target rows", () => {
    const input = buildSyntheticMigrationInput();
    const sourceRow = input.source.tables.user_topic_progress[0];
    input.source.tables.user_topic_progress.push({ ...sourceRow });
    const targetRow = input.target.entities.MigratedTopicProgress[0];
    input.target.entities.MigratedTopicProgress.push({ ...targetRow });
    const report = runDryRunValidation(input);
    expect(entity(report, "user_topic_progress").duplicateSourceKeys).toBe(1);
    expect(entity(report, "user_topic_progress").duplicateTargetKeys).toBe(1);
    expect(report.blocking).toEqual(
      expect.arrayContaining(["DUPLICATE_SOURCE_KEY", "DUPLICATE_TARGET_KEY"])
    );
  });

  it("compares source and target counts", () => {
    const input = buildSyntheticMigrationInput();
    input.target.entities.MigratedRecentTopic.pop();
    const report = runDryRunValidation(input);
    expect(entity(report, "user_recent_topics")).toMatchObject({
      eligibleRows: 2,
      targetRows: 1,
      countDelta: -1,
      missingTargetRows: 1,
    });
    expect(report.blocking).toContain("MISSING_TARGET_ROWS");
    expect(report.totals.countDelta).toBe(-1);
  });

  it("detects a target id that is not the stable source id", () => {
    const input = buildSyntheticMigrationInput();
    input.target.entities.MigratedVivaAttempt[0].id = "99999999-0000-4000-8000-999999999999";
    const report = runDryRunValidation(input);
    expect(entity(report, "viva_attempts")).toMatchObject({
      unmatchedTargetRows: 1,
      missingTargetRows: 1,
    });
    expect(report.blocking).toContain("UNMATCHED_TARGET_ROWS");
  });

  it("rejects roles outside the source enum and requires a configured admin role", () => {
    const input = buildSyntheticMigrationInput();
    input.source.tables.user_roles.push({ user_id: input.identities[2].sourceId, role: "owner" });
    input.target.entities.MigratedAccountRole.push({
      user_id: input.identities[2].sourceId,
      role: "owner",
    });
    const unknown = runDryRunValidation(input);
    expect(unknown.roles.unknownRoles).toBe(1);
    expect(unknown.blocking).toContain("UNKNOWN_ROLE");

    const unconfigured = runDryRunValidation({
      ...buildSyntheticMigrationInput(),
      adminRole: undefined,
    });
    expect(unconfigured.roles.adminRows).toBe(1);
    expect(unconfigured.roles.adminRoleConfigured).toBe(false);
    expect(unconfigured.blocking).toContain("ADMIN_ROLE_NOT_CONFIGURED");

    const noAdmins = runDryRunValidation({ ...buildSyntheticMigrationInput(), adminRole: "  " });
    expect(noAdmins.blocking).toContain("ADMIN_ROLE_NOT_CONFIGURED");
  });

  it("detects ownership rewritten to a different account", () => {
    const input = buildSyntheticMigrationInput();
    input.target.entities.MigratedVivaAttempt[0].user_id = input.identities[2].sourceId;
    const report = runDryRunValidation(input);
    expect(entity(report, "viva_attempts").ownershipMismatches).toBe(1);
    expect(report.blocking).toContain("OWNERSHIP_MISMATCH");
  });

  it("refuses a snapshot that carries credential columns", () => {
    const input = buildSyntheticMigrationInput();
    input.source.tables["auth.users"][0].encrypted_password = "not-a-real-hash";
    const report = runDryRunValidation(input);
    expect(report.blocking).toContain("SECRET_FIELD_PRESENT");
    expect(report.ok).toBe(false);
  });

  it("maps every personal surface to a restricted entity that keeps its source keys", () => {
    expect(validateMapping(MIGRATION_MAPPING)).toEqual([]);
    const tables = MIGRATION_MAPPING.map((entry) => entry.sourceTable);
    for (const expected of [
      "auth.users",
      "user_roles",
      "user_topic_progress",
      "user_subsection_progress",
      "user_study_time",
      "user_recent_topics",
      "viva_attempts",
      "support_tickets",
      "support_messages",
    ]) {
      expect(tables).toContain(expected);
    }
    for (const entry of MIGRATION_MAPPING) {
      expect(entry.targetEntity).toMatch(/^Migrated/);
      expect(["service-only", "admin-only", "owner-scoped"]).toContain(entry.access);
      expect(entry.restrictions.length).toBeGreaterThan(0);
      for (const field of entry.fields) {
        if (entry.naturalKey.includes(field.source)) expect(field.target).toBe(field.source);
      }
    }
    const roles = MIGRATION_MAPPING.find((entry) => entry.sourceTable === "user_roles");
    expect(roles?.access).toBe("admin-only");
    const accounts = MIGRATION_MAPPING.find((entry) => entry.sourceTable === "auth.users");
    expect(accounts?.access).toBe("service-only");
    expect(accounts?.fields.some((field) => /password|token|secret/i.test(field.source))).toBe(
      false
    );
  });
});

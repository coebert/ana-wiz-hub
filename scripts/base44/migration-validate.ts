/**
 * Dry-run validator for the AnaesthesiaCore → Base44 data cutover.
 *
 * Reads a source snapshot, a target snapshot and an explicit identity map, and
 * reports aggregate validation results only: counts, deltas and issue codes. It
 * never prints an identifier, an e-mail address, a message body or a row value,
 * never connects to a database and never writes anything — it is safe to run
 * against a staged export before any cutover is authorised.
 *
 * Run: `npm run base44:validate` (synthetic fixtures) or
 *      `npm run base44:validate -- --source <file> --target <file> --id-map <file> [--admin-role <name>]`
 */
import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import {
  ACCOUNT_TARGET_ENTITY,
  ADMIN_SOURCE_ROLE,
  MIGRATION_MAPPING,
  SOURCE_ALLOWED_ROLES,
  type EntityAccess,
  type EntityMapping,
} from "./migration-mapping.ts";
import { buildSyntheticMigrationInput } from "./migration-fixtures.ts";

export type Row = Record<string, unknown>;

export type SourceSnapshot = { tables: Record<string, Row[]> };
export type TargetSnapshot = { entities: Record<string, Row[]> };
export type IdentityMap = { sourceId: string; targetUserId: string }[];

export type ValidationInput = {
  mapping: EntityMapping[];
  source: SourceSnapshot;
  target: TargetSnapshot;
  identities: IdentityMap;
  allowedRoles: readonly string[];
  /** Deployment-configured Base44 admin role name. No default. */
  adminRole?: string;
};

export type IssueCode =
  | "SECRET_FIELD_PRESENT"
  | "MAPPING_INVALID"
  | "DUPLICATE_SOURCE_KEY"
  | "DUPLICATE_TARGET_KEY"
  | "ORPHANED_OWNER"
  | "ORPHANED_PARENT"
  | "UNMATCHED_TARGET_ROWS"
  | "MISSING_TARGET_ROWS"
  | "OWNERSHIP_MISMATCH"
  | "UNKNOWN_ROLE"
  | "ADMIN_ROLE_NOT_CONFIGURED"
  | "DUPLICATE_IDENTITY_TARGET"
  | "UNKNOWN_IDENTITY_SOURCE";

export type EntityReport = {
  sourceTable: string;
  targetEntity: string;
  access: EntityAccess;
  sourceRows: number;
  eligibleRows: number;
  targetRows: number;
  countDelta: number;
  duplicateSourceKeys: number;
  duplicateTargetKeys: number;
  orphanedOwnerRows: number;
  orphanedParentRows: number;
  unmatchedTargetRows: number;
  missingTargetRows: number;
  ownershipMismatches: number;
};

export type ValidationReport = {
  mode: "dry-run";
  mappingProblems: string[];
  identities: {
    sourceAccounts: number;
    mappedAccounts: number;
    unmappedAccounts: number;
    duplicateJoinEmails: number;
    duplicateIdentityTargets: number;
    unknownIdentitySources: number;
  };
  roles: {
    sourceRows: number;
    byRole: Record<string, number>;
    unknownRoles: number;
    adminRows: number;
    adminRoleConfigured: boolean;
  };
  entities: EntityReport[];
  totals: {
    sourceRows: number;
    eligibleRows: number;
    targetRows: number;
    countDelta: number;
    duplicateSourceKeys: number;
    duplicateTargetKeys: number;
    orphanedOwnerRows: number;
    orphanedParentRows: number;
    unmatchedTargetRows: number;
    missingTargetRows: number;
    ownershipMismatches: number;
  };
  blocking: IssueCode[];
  ok: boolean;
};

/** Any column that would mean a snapshot is carrying a credential, not a projection. */
const SECRET_FIELD = /(password|secret|token|api_?key|service_role|private_key|credential)/i;

const keyOf = (row: Row, columns: string[]): string =>
  columns.map((column) => String(row[column] ?? "")).join("\u0000");

const valueOf = (row: Row, column: string | null): string | null => {
  if (!column) return null;
  const value = row[column];
  if (value === null || value === undefined) return null;
  const text = String(value).trim();
  return text ? text : null;
};

const duplicatesOf = (keys: string[]): number => {
  const seen = new Map<string, number>();
  for (const key of keys) seen.set(key, (seen.get(key) ?? 0) + 1);
  let duplicates = 0;
  for (const count of seen.values()) if (count > 1) duplicates += count - 1;
  return duplicates;
};

/** Static self-check of the mapping itself, so a bad mapping cannot pass silently. */
export function validateMapping(mapping: EntityMapping[]): string[] {
  const problems: string[] = [];
  const targets = new Set<string>();
  for (const entity of mapping) {
    const label = `${entity.sourceTable}→${entity.targetEntity}`;
    if (!entity.targetEntity.startsWith("Migrated"))
      problems.push(`${label}: target entity is not a restricted migration entity`);
    if (targets.has(entity.targetEntity)) problems.push(`${label}: duplicate target entity`);
    targets.add(entity.targetEntity);
    if (!entity.fields.length) problems.push(`${label}: no field mapping`);
    if (!entity.restrictions.length) problems.push(`${label}: no access restrictions recorded`);
    if (entity.stableId && entity.stableId.target !== "id")
      problems.push(`${label}: stable id target must be the source id`);
    if (!entity.stableId && !entity.naturalKey.length)
      problems.push(`${label}: no stable or natural key`);
    const sources = new Set(entity.fields.map((field) => field.source));
    for (const column of entity.naturalKey) {
      const field = entity.fields.find((candidate) => candidate.source === column);
      if (!field) problems.push(`${label}: key column ${column} is not mapped`);
      else if (field.target !== column)
        problems.push(`${label}: key column ${column} must keep its name`);
    }
    if (entity.ownerColumn && !sources.has(entity.ownerColumn))
      problems.push(`${label}: owner column ${entity.ownerColumn} is not mapped`);
    if (entity.parent && !sources.has(entity.parent.column))
      problems.push(`${label}: parent column ${entity.parent.column} is not mapped`);
  }
  return problems;
}

export function runDryRunValidation(input: ValidationInput): ValidationReport {
  const { mapping, source, target, identities, allowedRoles } = input;
  const mappingProblems = validateMapping(mapping);

  const accountsMapping = mapping.find((entity) => entity.targetEntity === ACCOUNT_TARGET_ENTITY);
  const accountRows = accountsMapping ? (source.tables[accountsMapping.sourceTable] ?? []) : [];
  const accountIds = new Set(
    accountRows
      .map((row) => valueOf(row, accountsMapping?.stableId?.source ?? "id"))
      .filter(Boolean) as string[]
  );

  const mappedSourceIds = new Set(identities.map((entry) => entry.sourceId));
  const mappedAccounts = [...accountIds].filter((id) => mappedSourceIds.has(id)).length;
  const normalizedEmails = accountRows
    .map((row) =>
      String(row.email ?? "")
        .trim()
        .toLowerCase()
    )
    .filter(Boolean);
  const duplicateJoinEmails = duplicatesOf(normalizedEmails);
  const duplicateIdentityTargets = duplicatesOf(identities.map((entry) => entry.targetUserId));
  const unknownIdentitySources = identities.filter(
    (entry) => !accountIds.has(entry.sourceId)
  ).length;

  const blocking = new Set<IssueCode>();
  const add = (condition: boolean, code: IssueCode) => {
    if (condition) blocking.add(code);
  };

  // A snapshot must be a projection: credential columns are refused, not reported on.
  let secretFields = false;
  for (const rows of [...Object.values(source.tables), ...Object.values(target.entities)]) {
    for (const row of rows) {
      if (Object.keys(row).some((key) => SECRET_FIELD.test(key))) secretFields = true;
    }
  }
  add(secretFields, "SECRET_FIELD_PRESENT");
  add(mappingProblems.length > 0, "MAPPING_INVALID");
  add(duplicateIdentityTargets > 0, "DUPLICATE_IDENTITY_TARGET");
  add(unknownIdentitySources > 0, "UNKNOWN_IDENTITY_SOURCE");

  const entities: EntityReport[] = mapping.map((entity) => {
    const sourceRows = source.tables[entity.sourceTable] ?? [];
    const targetRows = target.entities[entity.targetEntity] ?? [];
    const sourceKeyColumns = entity.stableId ? [entity.stableId.source] : entity.naturalKey;
    const targetKeyColumns = entity.stableId ? [entity.stableId.target] : entity.naturalKey;

    const parentIds = entity.parent
      ? new Set(
          (source.tables[entity.parent.table] ?? [])
            .map((row) => valueOf(row, "id"))
            .filter(Boolean) as string[]
        )
      : null;

    const eligible = sourceRows.filter((row) => {
      const owner = valueOf(row, entity.ownerColumn);
      const parent = entity.parent ? valueOf(row, entity.parent.column) : null;
      const ownerOk = !owner || mappedSourceIds.has(owner) || !entity.ownerColumn;
      const parentOk = !parent || !parentIds || parentIds.has(parent);
      return ownerOk && parentOk;
    });

    const orphanedOwnerRows = sourceRows.filter((row) => {
      const owner = valueOf(row, entity.ownerColumn);
      return Boolean(owner) && Boolean(entity.ownerColumn) && !mappedSourceIds.has(owner as string);
    }).length;
    const orphanedParentRows = sourceRows.filter((row) => {
      const parent = entity.parent ? valueOf(row, entity.parent.column) : null;
      return (
        Boolean(parent) && Boolean(parentIds) && !(parentIds as Set<string>).has(parent as string)
      );
    }).length;

    const sourceKeys = new Set(sourceRows.map((row) => keyOf(row, sourceKeyColumns)));
    const targetKeys = new Set(targetRows.map((row) => keyOf(row, targetKeyColumns)));

    const unmatchedTargetRows = targetRows.filter(
      (row) => !sourceKeys.has(keyOf(row, targetKeyColumns))
    ).length;
    const missingTargetRows = eligible.filter(
      (row) => !targetKeys.has(keyOf(row, sourceKeyColumns))
    ).length;

    const sourceByKey = new Map(sourceRows.map((row) => [keyOf(row, sourceKeyColumns), row]));
    let ownershipMismatches = 0;
    if (entity.ownerColumn) {
      for (const row of targetRows) {
        const original = sourceByKey.get(keyOf(row, targetKeyColumns));
        if (!original) continue;
        const before = valueOf(original, entity.ownerColumn);
        const after = valueOf(row, entity.ownerColumn);
        if ((before ?? "") !== (after ?? "")) ownershipMismatches += 1;
      }
    }

    const report: EntityReport = {
      sourceTable: entity.sourceTable,
      targetEntity: entity.targetEntity,
      access: entity.access,
      sourceRows: sourceRows.length,
      eligibleRows: eligible.length,
      targetRows: targetRows.length,
      countDelta: targetRows.length - eligible.length,
      duplicateSourceKeys: duplicatesOf(sourceRows.map((row) => keyOf(row, sourceKeyColumns))),
      duplicateTargetKeys: duplicatesOf(targetRows.map((row) => keyOf(row, targetKeyColumns))),
      orphanedOwnerRows,
      orphanedParentRows,
      unmatchedTargetRows,
      missingTargetRows,
      ownershipMismatches,
    };

    add(report.duplicateSourceKeys > 0, "DUPLICATE_SOURCE_KEY");
    add(report.duplicateTargetKeys > 0, "DUPLICATE_TARGET_KEY");
    add(report.orphanedOwnerRows > 0, "ORPHANED_OWNER");
    add(report.orphanedParentRows > 0, "ORPHANED_PARENT");
    add(report.unmatchedTargetRows > 0, "UNMATCHED_TARGET_ROWS");
    add(report.missingTargetRows > 0, "MISSING_TARGET_ROWS");
    add(report.ownershipMismatches > 0, "OWNERSHIP_MISMATCH");
    return report;
  });

  const roleMapping = mapping.find((entity) => entity.sourceTable === "user_roles");
  const roleRows = roleMapping ? (source.tables[roleMapping.sourceTable] ?? []) : [];
  const byRole: Record<string, number> = {};
  for (const row of roleRows) {
    const role = String(row.role ?? "");
    byRole[role] = (byRole[role] ?? 0) + 1;
  }
  const unknownRoles = roleRows.filter(
    (row) => !allowedRoles.includes(String(row.role ?? ""))
  ).length;
  const adminRows = byRole[ADMIN_SOURCE_ROLE] ?? 0;
  const adminRoleConfigured = Boolean((input.adminRole ?? "").trim());
  add(unknownRoles > 0, "UNKNOWN_ROLE");
  add(adminRows > 0 && !adminRoleConfigured, "ADMIN_ROLE_NOT_CONFIGURED");

  const total = (pick: (entity: EntityReport) => number) =>
    entities.reduce((sum, entity) => sum + pick(entity), 0);

  const totals = {
    sourceRows: total((entity) => entity.sourceRows),
    eligibleRows: total((entity) => entity.eligibleRows),
    targetRows: total((entity) => entity.targetRows),
    countDelta: total((entity) => entity.countDelta),
    duplicateSourceKeys: total((entity) => entity.duplicateSourceKeys),
    duplicateTargetKeys: total((entity) => entity.duplicateTargetKeys),
    orphanedOwnerRows: total((entity) => entity.orphanedOwnerRows),
    orphanedParentRows: total((entity) => entity.orphanedParentRows),
    unmatchedTargetRows: total((entity) => entity.unmatchedTargetRows),
    missingTargetRows: total((entity) => entity.missingTargetRows),
    ownershipMismatches: total((entity) => entity.ownershipMismatches),
  };

  const blockingCodes = [...blocking].sort() as IssueCode[];

  return {
    mode: "dry-run",
    mappingProblems,
    identities: {
      sourceAccounts: accountRows.length,
      mappedAccounts,
      unmappedAccounts: accountRows.length - mappedAccounts,
      duplicateJoinEmails,
      duplicateIdentityTargets,
      unknownIdentitySources,
    },
    roles: {
      sourceRows: roleRows.length,
      byRole,
      unknownRoles,
      adminRows,
      adminRoleConfigured,
    },
    entities,
    totals,
    blocking: blockingCodes,
    ok: blockingCodes.length === 0,
  };
}

type CliArgs = {
  source?: string;
  target?: string;
  idMap?: string;
  adminRole?: string;
};

function parseArgs(argv: string[]): CliArgs {
  const args: CliArgs = {};
  for (let index = 0; index < argv.length; index += 1) {
    const flag = argv[index];
    const value = argv[index + 1];
    if (flag === "--source") args.source = value;
    else if (flag === "--target") args.target = value;
    else if (flag === "--id-map") args.idMap = value;
    else if (flag === "--admin-role") args.adminRole = value;
    else if (flag !== "--fixtures") throw new Error(`Unknown argument: ${flag}`);
    if (flag !== "--fixtures") index += 1;
  }
  return args;
}

function readJson<T>(path: string): T {
  return JSON.parse(readFileSync(path, "utf8")) as T;
}

function loadInput(args: CliArgs): ValidationInput {
  if (!args.source && !args.target && !args.idMap) {
    const fixture = buildSyntheticMigrationInput();
    return { ...fixture, adminRole: args.adminRole ?? fixture.adminRole };
  }
  if (!args.source || !args.target || !args.idMap) {
    throw new Error(
      "Provide --source, --target and --id-map together (or none for the synthetic fixtures)."
    );
  }
  return {
    mapping: MIGRATION_MAPPING,
    source: readJson<SourceSnapshot>(args.source),
    target: readJson<TargetSnapshot>(args.target),
    identities: readJson<IdentityMap>(args.idMap),
    allowedRoles: SOURCE_ALLOWED_ROLES,
    adminRole: args.adminRole,
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const report = runDryRunValidation(loadInput(parseArgs(process.argv.slice(2))));
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  process.exitCode = report.ok ? 0 : 1;
}

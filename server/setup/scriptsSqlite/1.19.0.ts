import { APP_PATH } from "@server/lib/consts";
import Database from "better-sqlite3";
import path from "path";

const version = "1.19.0";

export default async function migration() {
    console.log(`Running setup script ${version}...`);

    const location = path.join(APP_PATH, "db", "db.sqlite");
    const db = new Database(location);

    try {
        db.pragma("foreign_keys = OFF");

        db.transaction(() => {
            const duplicateGroups = db
                .prepare(
                    `SELECT "orgId", "name", MIN("roleId") AS "keepId",
                            GROUP_CONCAT("roleId") AS "allIds"
                     FROM "roles"
                     GROUP BY "orgId", "name"
                     HAVING COUNT(*) > 1`
                )
                .all() as {
                orgId: string;
                name: string;
                keepId: number;
                allIds: string;
            }[];

            console.log(
                `Found ${duplicateGroups.length} duplicate role group(s) to merge`
            );

            for (const group of duplicateGroups) {
                const keepId = Number(group.keepId);
                const removeIds = group.allIds
                    .split(",")
                    .map(Number)
                    .filter((id) => id !== keepId);

                if (removeIds.length === 0) continue;

                const placeholders = removeIds.map(() => "?").join(",");

                // Check for isAdmin divergence
                const allIds = [keepId, ...removeIds];
                const allPlaceholders = allIds.map(() => "?").join(",");
                const adminValues = db
                    .prepare(
                        `SELECT DISTINCT "isAdmin" FROM "roles"
                         WHERE "roleId" IN (${allPlaceholders})`
                    )
                    .all(...allIds) as { isAdmin: number | null }[];
                if (adminValues.length > 1) {
                    console.warn(
                        `WARNING: Duplicate roles "${group.name}" in org ${group.orgId} have differing isAdmin values. Keeper roleId ${keepId} will be used.`
                    );
                }

                // userOrgRoles: has UNIQUE(userId, orgId, roleId)
                db.prepare(
                    `DELETE FROM "userOrgRoles"
                     WHERE "roleId" IN (${placeholders})
                       AND EXISTS (
                           SELECT 1 FROM "userOrgRoles" k
                           WHERE k."userId" = "userOrgRoles"."userId"
                             AND k."orgId" = "userOrgRoles"."orgId"
                             AND k."roleId" = ?
                       )`
                ).run(...removeIds, keepId);
                db.prepare(
                    `UPDATE "userOrgRoles" SET "roleId" = ?
                     WHERE "roleId" IN (${placeholders})`
                ).run(keepId, ...removeIds);

                // userInviteRoles: has PK(inviteId, roleId)
                db.prepare(
                    `DELETE FROM "userInviteRoles"
                     WHERE "roleId" IN (${placeholders})
                       AND EXISTS (
                           SELECT 1 FROM "userInviteRoles" k
                           WHERE k."inviteId" = "userInviteRoles"."inviteId"
                             AND k."roleId" = ?
                       )`
                ).run(...removeIds, keepId);
                db.prepare(
                    `UPDATE "userInviteRoles" SET "roleId" = ?
                     WHERE "roleId" IN (${placeholders})`
                ).run(keepId, ...removeIds);

                // Tables without unique constraints: update then deduplicate
                // Scoped to keepId only to avoid collapsing unrelated rows
                db.prepare(
                    `UPDATE "roleSiteResources" SET "roleId" = ?
                     WHERE "roleId" IN (${placeholders})`
                ).run(keepId, ...removeIds);
                db.prepare(
                    `DELETE FROM "roleSiteResources"
                     WHERE rowid NOT IN (
                         SELECT MIN(rowid) FROM "roleSiteResources"
                         WHERE "roleId" = ?
                         GROUP BY "roleId", "siteResourceId"
                     ) AND "roleId" = ?`
                ).run(keepId, keepId);

                db.prepare(
                    `UPDATE "roleActions" SET "roleId" = ?
                     WHERE "roleId" IN (${placeholders})`
                ).run(keepId, ...removeIds);
                db.prepare(
                    `DELETE FROM "roleActions"
                     WHERE rowid NOT IN (
                         SELECT MIN(rowid) FROM "roleActions"
                         WHERE "roleId" = ?
                         GROUP BY "roleId", "actionId", "orgId"
                     ) AND "roleId" = ?`
                ).run(keepId, keepId);

                db.prepare(
                    `UPDATE "roleSites" SET "roleId" = ?
                     WHERE "roleId" IN (${placeholders})`
                ).run(keepId, ...removeIds);
                db.prepare(
                    `DELETE FROM "roleSites"
                     WHERE rowid NOT IN (
                         SELECT MIN(rowid) FROM "roleSites"
                         WHERE "roleId" = ?
                         GROUP BY "roleId", "siteId"
                     ) AND "roleId" = ?`
                ).run(keepId, keepId);

                db.prepare(
                    `UPDATE "roleResources" SET "roleId" = ?
                     WHERE "roleId" IN (${placeholders})`
                ).run(keepId, ...removeIds);
                db.prepare(
                    `DELETE FROM "roleResources"
                     WHERE rowid NOT IN (
                         SELECT MIN(rowid) FROM "roleResources"
                         WHERE "roleId" = ?
                         GROUP BY "roleId", "resourceId"
                     ) AND "roleId" = ?`
                ).run(keepId, keepId);

                db.prepare(
                    `UPDATE "roleClients" SET "roleId" = ?
                     WHERE "roleId" IN (${placeholders})`
                ).run(keepId, ...removeIds);
                db.prepare(
                    `DELETE FROM "roleClients"
                     WHERE rowid NOT IN (
                         SELECT MIN(rowid) FROM "roleClients"
                         WHERE "roleId" = ?
                         GROUP BY "roleId", "clientId"
                     ) AND "roleId" = ?`
                ).run(keepId, keepId);

                db.prepare(
                    `DELETE FROM "roles" WHERE "roleId" IN (${placeholders})`
                ).run(...removeIds);

                console.log(
                    `Merged ${removeIds.length} duplicate(s) of role "${group.name}" in org ${group.orgId} into roleId ${keepId}`
                );
            }

            db.prepare(
                `CREATE UNIQUE INDEX IF NOT EXISTS "idx_roles_orgId_name" ON "roles" ("orgId", "name")`
            ).run();
        })();

        console.log("Migrated database");
    } catch (e) {
        console.error("Failed to migrate db:", e);
        throw e;
    } finally {
        db.pragma("foreign_keys = ON");
        db.close();
    }

    console.log(`${version} migration complete`);
}

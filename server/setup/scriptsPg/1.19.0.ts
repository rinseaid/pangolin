import { db } from "@server/db/pg/driver";
import { sql } from "drizzle-orm";

const version = "1.19.0";

export default async function migration() {
    console.log(`Running setup script ${version}...`);

    try {
        await db.transaction(async (tx) => {
            const dupsQuery = await tx.execute(sql`
                SELECT "orgId", "name", MIN("roleId")::integer AS "keepId",
                       array_agg("roleId") AS "allIds"
                FROM "roles"
                GROUP BY "orgId", "name"
                HAVING COUNT(*) > 1
            `);

            const duplicateGroups = dupsQuery.rows as {
                orgId: string;
                name: string;
                keepId: number;
                allIds: number[];
            }[];

            console.log(
                `Found ${duplicateGroups.length} duplicate role group(s) to merge`
            );

            for (const group of duplicateGroups) {
                const keepId = Number(group.keepId);
                const removeIds = group.allIds
                    .map(Number)
                    .filter((id) => id !== keepId);

                if (removeIds.length === 0) continue;

                // Check for isAdmin divergence
                const adminCheck = await tx.execute(sql`
                    SELECT DISTINCT "isAdmin" FROM "roles"
                    WHERE "roleId" = ANY(${group.allIds})
                `);
                const adminValues = adminCheck.rows.map((r: any) => r.isAdmin);
                if (adminValues.length > 1) {
                    console.warn(
                        `WARNING: Duplicate roles "${group.name}" in org ${group.orgId} have differing isAdmin values. Keeper roleId ${keepId} will be used.`
                    );
                }

                // userOrgRoles: has UNIQUE(userId, orgId, roleId)
                await tx.execute(sql`
                    DELETE FROM "userOrgRoles" d
                    WHERE d."roleId" = ANY(${removeIds})
                      AND EXISTS (
                          SELECT 1 FROM "userOrgRoles" k
                          WHERE k."userId" = d."userId"
                            AND k."orgId" = d."orgId"
                            AND k."roleId" = ${keepId}
                      )
                `);
                await tx.execute(sql`
                    UPDATE "userOrgRoles" SET "roleId" = ${keepId}
                    WHERE "roleId" = ANY(${removeIds})
                `);

                // userInviteRoles: has PK(inviteId, roleId)
                await tx.execute(sql`
                    DELETE FROM "userInviteRoles" d
                    WHERE d."roleId" = ANY(${removeIds})
                      AND EXISTS (
                          SELECT 1 FROM "userInviteRoles" k
                          WHERE k."inviteId" = d."inviteId"
                            AND k."roleId" = ${keepId}
                      )
                `);
                await tx.execute(sql`
                    UPDATE "userInviteRoles" SET "roleId" = ${keepId}
                    WHERE "roleId" = ANY(${removeIds})
                `);

                // Tables without unique constraints: update then deduplicate
                // Scoped to keepId only to avoid collapsing unrelated rows
                await tx.execute(sql`
                    UPDATE "roleSiteResources" SET "roleId" = ${keepId}
                    WHERE "roleId" = ANY(${removeIds})
                `);
                await tx.execute(sql`
                    DELETE FROM "roleSiteResources" a
                    USING "roleSiteResources" b
                    WHERE a.ctid > b.ctid
                      AND a."roleId" = b."roleId"
                      AND a."siteResourceId" = b."siteResourceId"
                      AND a."roleId" = ${keepId}
                `);

                await tx.execute(sql`
                    UPDATE "roleActions" SET "roleId" = ${keepId}
                    WHERE "roleId" = ANY(${removeIds})
                `);
                await tx.execute(sql`
                    DELETE FROM "roleActions" a
                    USING "roleActions" b
                    WHERE a.ctid > b.ctid
                      AND a."roleId" = b."roleId"
                      AND a."actionId" = b."actionId"
                      AND a."orgId" = b."orgId"
                      AND a."roleId" = ${keepId}
                `);

                await tx.execute(sql`
                    UPDATE "roleSites" SET "roleId" = ${keepId}
                    WHERE "roleId" = ANY(${removeIds})
                `);
                await tx.execute(sql`
                    DELETE FROM "roleSites" a
                    USING "roleSites" b
                    WHERE a.ctid > b.ctid
                      AND a."roleId" = b."roleId"
                      AND a."siteId" = b."siteId"
                      AND a."roleId" = ${keepId}
                `);

                await tx.execute(sql`
                    UPDATE "roleResources" SET "roleId" = ${keepId}
                    WHERE "roleId" = ANY(${removeIds})
                `);
                await tx.execute(sql`
                    DELETE FROM "roleResources" a
                    USING "roleResources" b
                    WHERE a.ctid > b.ctid
                      AND a."roleId" = b."roleId"
                      AND a."resourceId" = b."resourceId"
                      AND a."roleId" = ${keepId}
                `);

                await tx.execute(sql`
                    UPDATE "roleClients" SET "roleId" = ${keepId}
                    WHERE "roleId" = ANY(${removeIds})
                `);
                await tx.execute(sql`
                    DELETE FROM "roleClients" a
                    USING "roleClients" b
                    WHERE a.ctid > b.ctid
                      AND a."roleId" = b."roleId"
                      AND a."clientId" = b."clientId"
                      AND a."roleId" = ${keepId}
                `);

                await tx.execute(sql`
                    DELETE FROM "roles" WHERE "roleId" = ANY(${removeIds})
                `);

                console.log(
                    `Merged ${removeIds.length} duplicate(s) of role "${group.name}" in org ${group.orgId} into roleId ${keepId}`
                );
            }

            await tx.execute(sql`
                CREATE UNIQUE INDEX IF NOT EXISTS "idx_roles_orgId_name" ON "roles" ("orgId", "name")
            `);
        });

        console.log("Migrated database");
    } catch (e) {
        console.error("Unable to migrate database:", e);
        throw e;
    }

    console.log(`${version} migration complete`);
}

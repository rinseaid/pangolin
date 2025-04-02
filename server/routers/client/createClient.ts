import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { db } from "@server/db";
import {
    roles,
    Client,
    clients,
    roleClients,
    userClients,
    olms,
    clientSites,
    exitNodes
} from "@server/db/schema";
import response from "@server/lib/response";
import HttpCode from "@server/types/HttpCode";
import createHttpError from "http-errors";
import logger from "@server/logger";
import { eq, and } from "drizzle-orm";
import { fromError } from "zod-validation-error";
import moment from "moment";
import { hashPassword } from "@server/auth/password";
import { getNextAvailableClientSubnet } from "@server/lib/ip";
import config from "@server/lib/config";

const createClientParamsSchema = z
    .object({
        orgId: z.string()
    })
    .strict();

const createClientSchema = z
    .object({
        name: z.string().min(1).max(255),
        siteIds: z.array(z.number().int().positive()),
        olmId: z.string(),
        secret: z.string(),
        type: z.enum(["olm"])
    })
    .strict();

export type CreateClientBody = z.infer<typeof createClientSchema>;

export type CreateClientResponse = Client;

export async function createClient(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> {
    try {
        const parsedBody = createClientSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return next(
                createHttpError(
                    HttpCode.BAD_REQUEST,
                    fromError(parsedBody.error).toString()
                )
            );
        }

        const { name, type, siteIds, olmId, secret } = parsedBody.data;

        const parsedParams = createClientParamsSchema.safeParse(req.params);
        if (!parsedParams.success) {
            return next(
                createHttpError(
                    HttpCode.BAD_REQUEST,
                    fromError(parsedParams.error).toString()
                )
            );
        }

        const { orgId } = parsedParams.data;

        if (!req.userOrgRoleId) {
            return next(
                createHttpError(HttpCode.FORBIDDEN, "User does not have a role")
            );
        }

        const newSubnet = await getNextAvailableClientSubnet(orgId);

        const subnet = `${newSubnet.split("/")[0]}/${config.getRawConfig().orgs.block_size}`; // we want the block size of the whole org

        await db.transaction(async (trx) => {
            // TODO: more intelligent way to pick the exit node

            // make sure there is an exit node by counting the exit nodes table
            const nodes = await db.select().from(exitNodes);
            if (nodes.length === 0) {
                return next(
                    createHttpError(
                        HttpCode.NOT_FOUND,
                        "No exit nodes available"
                    )
                );
            }

            // get the first exit node
            const exitNode = nodes[0];

            const adminRole = await trx
                .select()
                .from(roles)
                .where(and(eq(roles.isAdmin, true), eq(roles.orgId, orgId)))
                .limit(1);

            if (adminRole.length === 0) {
                trx.rollback();
                return next(
                    createHttpError(HttpCode.NOT_FOUND, `Admin role not found`)
                );
            }

            const [newClient] = await trx
                .insert(clients)
                .values({
                    exitNodeId: exitNode.exitNodeId,
                    orgId,
                    name,
                    subnet,
                    type
                })
                .returning();

            await trx.insert(roleClients).values({
                roleId: adminRole[0].roleId,
                clientId: newClient.clientId
            });

            if (req.userOrgRoleId != adminRole[0].roleId) {
                // make sure the user can access the site
                trx.insert(userClients).values({
                    userId: req.user?.userId!,
                    clientId: newClient.clientId
                });
            }

            // Create site to client associations
            if (siteIds && siteIds.length > 0) {
                await trx.insert(clientSites).values(
                    siteIds.map((siteId) => ({
                        clientId: newClient.clientId,
                        siteId
                    }))
                );
            }

            const secretHash = await hashPassword(secret);

            await trx.insert(olms).values({
                olmId,
                secretHash,
                clientId: newClient.clientId,
                dateCreated: moment().toISOString()
            });

            return response<CreateClientResponse>(res, {
                data: newClient,
                success: true,
                error: false,
                message: "Site created successfully",
                status: HttpCode.CREATED
            });
        });
    } catch (error) {
        logger.error(error);
        return next(
            createHttpError(HttpCode.INTERNAL_SERVER_ERROR, "An error occurred")
        );
    }
}

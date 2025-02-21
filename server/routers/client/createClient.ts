import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { db } from "@server/db";
import {
    roles,
    userSites,
    sites,
    roleSites,
    Site,
    Client,
    clients,
    roleClients,
    userClients,
    olms
} from "@server/db/schema";
import response from "@server/lib/response";
import HttpCode from "@server/types/HttpCode";
import createHttpError from "http-errors";
import logger from "@server/logger";
import { eq, and } from "drizzle-orm";
import { addPeer } from "../newt/peers";
import { fromError } from "zod-validation-error";
import { newts } from "@server/db/schema";
import moment from "moment";
import { hashPassword } from "@server/auth/password";

const createClientParamsSchema = z
    .object({
        siteId: z
            .string()
            .transform((val) => parseInt(val))
            .pipe(z.number())
    })
    .strict();

const createClientSchema = z
    .object({
        name: z.string().min(1).max(255),
        siteId: z.number().int().positive(),
        subnet: z.string(),
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

        const { name, type, siteId, subnet, olmId, secret } =
            parsedBody.data;

        const parsedParams = createClientParamsSchema.safeParse(req.params);
        if (!parsedParams.success) {
            return next(
                createHttpError(
                    HttpCode.BAD_REQUEST,
                    fromError(parsedParams.error).toString()
                )
            );
        }

        const { siteId: paramSiteId } = parsedParams.data;

        if (siteId != paramSiteId) {
            return next(
                createHttpError(
                    HttpCode.BAD_REQUEST,
                    "Site ID in body does not match site ID in URL"
                )
            );
        }

        if (!req.userOrgRoleId) {
            return next(
                createHttpError(HttpCode.FORBIDDEN, "User does not have a role")
            );
        }

        const [site] = await db
            .select()
            .from(sites)
            .where(eq(sites.siteId, siteId));

        if (!site) {
            return next(createHttpError(HttpCode.NOT_FOUND, "Site not found"));
        }

        await db.transaction(async (trx) => {
            const adminRole = await trx
                .select()
                .from(roles)
                .where(
                    and(eq(roles.isAdmin, true), eq(roles.orgId, site.orgId))
                )
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
                    siteId,
                    orgId: site.orgId,
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

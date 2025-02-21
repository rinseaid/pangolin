import { db } from "@server/db";
import {
    clients,
    orgs,
    roleClients,
    roleSites,
    sites,
    userClients,
    userSites
} from "@server/db/schema";
import logger from "@server/logger";
import HttpCode from "@server/types/HttpCode";
import response from "@server/lib/response";
import { and, count, eq, inArray, or, sql } from "drizzle-orm";
import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { z } from "zod";
import { fromError } from "zod-validation-error";

const listClientsParamsSchema = z
    .object({
        orgId: z.string()
    })
    .strict();

const listClientsSchema = z.object({
    limit: z
        .string()
        .optional()
        .default("1000")
        .transform(Number)
        .pipe(z.number().int().positive()),
    offset: z
        .string()
        .optional()
        .default("0")
        .transform(Number)
        .pipe(z.number().int().nonnegative())
});

function queryClients(orgId: string, accessibleClientIds: number[]) {
    return db
        .select({
            siteId: sites.siteId,
            niceId: sites.niceId,
            name: sites.name,
            pubKey: sites.pubKey,
            subnet: sites.subnet,
            megabytesIn: sites.megabytesIn,
            megabytesOut: sites.megabytesOut,
            orgName: orgs.name,
            type: sites.type,
            online: sites.online
        })
        .from(clients)
        .leftJoin(orgs, eq(clients.orgId, orgs.orgId))
        .where(
            and(
                inArray(clients.clientId, accessibleClientIds),
                eq(clients.orgId, orgId)
            )
        );
}

export type ListClientsResponse = {
    clients: Awaited<ReturnType<typeof queryClients>>;
    pagination: { total: number; limit: number; offset: number };
};

export async function listClients(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> {
    try {
        const parsedQuery = listClientsSchema.safeParse(req.query);
        if (!parsedQuery.success) {
            return next(
                createHttpError(
                    HttpCode.BAD_REQUEST,
                    fromError(parsedQuery.error)
                )
            );
        }
        const { limit, offset } = parsedQuery.data;

        const parsedParams = listClientsParamsSchema.safeParse(req.params);
        if (!parsedParams.success) {
            return next(
                createHttpError(
                    HttpCode.BAD_REQUEST,
                    fromError(parsedParams.error)
                )
            );
        }
        const { orgId } = parsedParams.data;

        if (orgId && orgId !== req.userOrgId) {
            return next(
                createHttpError(
                    HttpCode.FORBIDDEN,
                    "User does not have access to this organization"
                )
            );
        }

        const accessibleClients = await db
            .select({
                clientId: sql<number>`COALESCE(${userClients.clientId}, ${roleClients.clientId})`
            })
            .from(userClients)
            .fullJoin(
                roleClients,
                eq(userClients.clientId, roleClients.clientId)
            )
            .where(
                or(
                    eq(userSites.userId, req.user!.userId),
                    eq(roleSites.roleId, req.userOrgRoleId!)
                )
            );

        const accessibleSiteIds = accessibleClients.map(
            (site) => site.clientId
        );
        const baseQuery = queryClients(orgId, accessibleSiteIds);

        let countQuery = db
            .select({ count: count() })
            .from(sites)
            .where(
                and(
                    inArray(sites.siteId, accessibleSiteIds),
                    eq(sites.orgId, orgId)
                )
            );

        const clientsList = await baseQuery.limit(limit).offset(offset);
        const totalCountResult = await countQuery;
        const totalCount = totalCountResult[0].count;

        return response<ListClientsResponse>(res, {
            data: {
                clients: clientsList,
                pagination: {
                    total: totalCount,
                    limit,
                    offset
                }
            },
            success: true,
            error: false,
            message: "Clients retrieved successfully",
            status: HttpCode.OK
        });
    } catch (error) {
        logger.error(error);
        return next(
            createHttpError(HttpCode.INTERNAL_SERVER_ERROR, "An error occurred")
        );
    }
}

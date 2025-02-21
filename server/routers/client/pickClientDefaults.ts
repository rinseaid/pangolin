import { Request, Response, NextFunction } from "express";
import { db } from "@server/db";
import { clients, sites } from "@server/db/schema";
import { eq } from "drizzle-orm";
import response from "@server/lib/response";
import HttpCode from "@server/types/HttpCode";
import createHttpError from "http-errors";
import logger from "@server/logger";
import { findNextAvailableCidr } from "@server/lib/ip";
import { generateId } from "@server/auth/sessions/app";
import config from "@server/lib/config";
import { z } from "zod";
import { fromError } from "zod-validation-error";

const getSiteSchema = z
    .object({
        siteId: z.number().int().positive()
    })
    .strict();

export type PickClientDefaultsResponse = {
    siteId: number;
    address: string;
    publicKey: string;
    name: string;
    listenPort: number;
    endpoint: string;
    subnet: string;
    clientId: string;
    clientSecret: string;
};

export async function pickClientDefaults(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> {
    try {
        const parsedParams = getSiteSchema.safeParse(req.params);
        if (!parsedParams.success) {
            return next(
                createHttpError(
                    HttpCode.BAD_REQUEST,
                    fromError(parsedParams.error).toString()
                )
            );
        }

        const { siteId } = parsedParams.data;

        const [site] = await db
            .select()
            .from(sites)
            .where(eq(sites.siteId, siteId));

        if (!site) {
            return next(createHttpError(HttpCode.NOT_FOUND, "Site not found"));
        }

        // make sure all the required fields are present
        if (
            !site.address ||
            !site.publicKey ||
            !site.listenPort ||
            !site.endpoint
        ) {
            return next(
                createHttpError(HttpCode.BAD_REQUEST, "Site has no address")
            );
        }

        const clientsQuery = await db
            .select({
                subnet: clients.subnet
            })
            .from(clients)
            .where(eq(clients.siteId, site.siteId));

        let subnets = clientsQuery.map((client) => client.subnet);

        // exclude the exit node address by replacing after the / with a site block size
        subnets.push(
            site.address.replace(
                /\/\d+$/,
                `/${config.getRawConfig().wg_site.block_size}`
            )
        );
        const newSubnet = findNextAvailableCidr(
            subnets,
            config.getRawConfig().wg_site.block_size,
            site.address
        );
        if (!newSubnet) {
            return next(
                createHttpError(
                    HttpCode.INTERNAL_SERVER_ERROR,
                    "No available subnets"
                )
            );
        }

        const clientId = generateId(15);
        const secret = generateId(48);

        return response<PickClientDefaultsResponse>(res, {
            data: {
                siteId: site.siteId,
                address: site.address,
                publicKey: site.publicKey,
                name: site.name,
                listenPort: site.listenPort,
                endpoint: site.endpoint,
                subnet: newSubnet,
                clientId,
                clientSecret: secret
            },
            success: true,
            error: false,
            message: "Organization retrieved successfully",
            status: HttpCode.OK
        });
    } catch (error) {
        logger.error(error);
        return next(
            createHttpError(HttpCode.INTERNAL_SERVER_ERROR, "An error occurred")
        );
    }
}

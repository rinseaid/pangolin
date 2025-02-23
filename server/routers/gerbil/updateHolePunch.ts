import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { clients, newts, olms, Site, sites } from "@server/db/schema";
import { db } from "@server/db";
import { eq } from "drizzle-orm";
import HttpCode from "@server/types/HttpCode";
import createHttpError from "http-errors";
import logger from "@server/logger";
import { fromError } from "zod-validation-error";

// Define Zod schema for request validation
const updateHolePunchSchema = z.object({
    olmId: z.string().optional(),
    newtId: z.string().optional(),
    ip: z.string(),
    port: z.number(),
    timestamp: z.number()
});

export async function updateHolePunch(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> {
    try {
        // Validate request parameters
        const parsedParams = updateHolePunchSchema.safeParse(req.body);
        if (!parsedParams.success) {
            return next(
                createHttpError(
                    HttpCode.BAD_REQUEST,
                    fromError(parsedParams.error).toString()
                )
            );
        }

        const { olmId, newtId, ip, port, timestamp } = parsedParams.data;
        
        // logger.debug(`Got hole punch with ip: ${ip}, port: ${port} for olmId: ${olmId} or newtId: ${newtId}`);

        let site: Site | undefined;

        if (olmId) {
            const [olm] = await db
                .select()
                .from(olms)
                .where(eq(olms.olmId, olmId));

            if (!olm || !olm.clientId) {
                logger.warn(`Olm not found: ${olmId}`);
                return next(
                    createHttpError(HttpCode.NOT_FOUND, "Olm not found")
                );
            }

            const [client] = await db
                .update(clients)
                .set({
                    endpoint: `${ip}:${port}`,
                    lastHolePunch: timestamp
                })
                .where(eq(clients.clientId, olm.clientId))
                .returning();

            [site] = await db
                .select()
                .from(sites)
                .where(eq(sites.siteId, client.siteId));
        } else if (newtId) {
            const [newt] = await db
                .select()
                .from(newts)
                .where(eq(newts.newtId, newtId));

            if (!newt || !newt.siteId) {
                logger.warn(`Newt not found: ${newtId}`);
                return next(
                    createHttpError(HttpCode.NOT_FOUND, "New not found")
                );
            }

            [site] = await db
                .update(sites)
                .set({
                    endpoint: `${ip}:${port}`,
                    lastHolePunch: timestamp
                })
                .where(eq(sites.siteId, newt.siteId))
                .returning();
        }

        if (!site || !site.endpoint || !site.subnet) {
            logger.warn(`Site not found for olmId: ${olmId} or newtId: ${newtId}`);
            return next(
                createHttpError(HttpCode.NOT_FOUND, "Site not found")
            );
        }

        return res.status(HttpCode.OK).send({
            destinationIp: site.subnet.split("/")[0],
            destinationPort: parseInt(site.endpoint.split(":")[1])
        });
    } catch (error) {
        logger.error(error);
        return next(
            createHttpError(
                HttpCode.INTERNAL_SERVER_ERROR,
                "An error occurred..."
            )
        );
    }
}

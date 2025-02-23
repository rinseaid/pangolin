import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { clients, exitNodes, newts, olms, Site, sites } from "@server/db/schema";
import { db } from "@server/db";
import { eq } from "drizzle-orm";
import HttpCode from "@server/types/HttpCode";
import createHttpError from "http-errors";
import logger from "@server/logger";
import { fromError } from "zod-validation-error";

// Define Zod schema for request validation
const getAllRelaysSchema = z.object({
    publicKey: z.string().optional(),
});

export async function getAllRelays(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> {
    try {
        // Validate request parameters
        const parsedParams = getAllRelaysSchema.safeParse(req.body);
        if (!parsedParams.success) {
            return next(
                createHttpError(
                    HttpCode.BAD_REQUEST,
                    fromError(parsedParams.error).toString()
                )
            );
        }

        const { publicKey } = parsedParams.data;

        if (!publicKey) {
            return next(createHttpError(HttpCode.BAD_REQUEST, 'publicKey is required'));
        }

        // Fetch exit node
        let [exitNode] = await db.select().from(exitNodes).where(eq(exitNodes.publicKey, publicKey));
        if (!exitNode) {
            return next(createHttpError(HttpCode.NOT_FOUND, "Exit node not found"));
        }

        // Fetch sites for this exit node
        const sitesRes = await db.select().from(sites).where(eq(sites.exitNodeId, exitNode.exitNodeId));

        if (sitesRes.length === 0) {
            return next(createHttpError(HttpCode.NOT_FOUND, "No sites found for this exit node"));
        }
        
        // get the clients on each site and map them to the site
        const sitesAndClients = await Promise.all(sitesRes.map(async (site) => {
            const clientsRes = await db.select().from(clients).where(eq(clients.siteId, site.siteId));
            return {
                site,
                clients: clientsRes 
            };
        }));

        let mappings: { [key: string]: {
            destinationIp: string;
            destinationPort: number;
        } } = {};

        for (const siteAndClients of sitesAndClients) {
            const { site, clients } = siteAndClients;
            for (const client of clients) {
                if (!client.endpoint || !site.endpoint || !site.subnet) {
                    continue;
                }
                mappings[client.endpoint] = {
                    destinationIp: site.subnet.split("/")[0],
                    destinationPort: parseInt(site.endpoint.split(":")[1])
                };
            }
        }

        return res.status(HttpCode.OK).send({ mappings });
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

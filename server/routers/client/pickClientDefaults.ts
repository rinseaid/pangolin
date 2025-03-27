import { Request, Response, NextFunction } from "express";
import { db } from "@server/db";
import { clients, exitNodes, olms, sites } from "@server/db/schema";
import { eq } from "drizzle-orm";
import response from "@server/lib/response";
import HttpCode from "@server/types/HttpCode";
import createHttpError from "http-errors";
import logger from "@server/logger";
import { findNextAvailableCidr, getNextAvailableClientSubnet } from "@server/lib/ip";
import { generateId } from "@server/auth/sessions/app";
import config from "@server/lib/config";
import { z } from "zod";
import { fromError } from "zod-validation-error";

const getSiteSchema = z
    .object({
        siteId: z.string().transform(Number).pipe(z.number())
    })
    .strict();

export type PickClientDefaultsResponse = {
    exitNodeId: number;
    siteId: number;
    address: string;
    publicKey: string;
    name: string;
    listenPort: number;
    endpoint: string;
    subnet: string;
    olmId: string;
    olmSecret: string;
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

        if (site.type !== "newt") {
            return next(
                createHttpError(
                    HttpCode.BAD_REQUEST,
                    "Site is not a newt site"
                )
            );
        }

        // TODO: more intelligent way to pick the exit node

        // make sure there is an exit node by counting the exit nodes table
        const nodes = await db.select().from(exitNodes);
        if (nodes.length === 0) {
            return next(
                createHttpError(HttpCode.NOT_FOUND, "No exit nodes available")
            );
        }

        // get the first exit node
        const exitNode = nodes[0];

        // make sure all the required fields are present
        const sitesRequiredFields = z.object({
            address: z.string(),
            publicKey: z.string(),
            listenPort: z.number(),
            endpoint: z.string()
        });

        const parsedSite = sitesRequiredFields.safeParse(site);
        if (!parsedSite.success) {
            logger.error("Unable to pick client defaults because: " + fromError(parsedSite.error).toString());
            return next(
                createHttpError(
                    HttpCode.BAD_REQUEST,
                    "Site is not configured to accept client connectivity"
                )
            );
        }

        const { address, publicKey, listenPort, endpoint } = parsedSite.data;

        const newSubnet = await getNextAvailableClientSubnet(site.orgId);
        
        const olmId = generateId(15);
        const secret = generateId(48);

        return response<PickClientDefaultsResponse>(res, {
            data: {
                exitNodeId: exitNode.exitNodeId,
                siteId: site.siteId,
                address: address,
                publicKey: publicKey,
                name: site.name,
                listenPort: listenPort,
                endpoint: endpoint,
                subnet: `${newSubnet.split("/")[0]}/${config.getRawConfig().orgs.block_size}`, // we want the block size of the whole org
                olmId: olmId,
                olmSecret: secret
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

import { z } from "zod";
import { MessageHandler } from "../ws";
import logger from "@server/logger";
import { fromError } from "zod-validation-error";
import db from "@server/db";
import { clients, clientSites, Newt, Site, sites } from "@server/db/schema";
import { eq } from "drizzle-orm";
import { getNextAvailableClientSubnet } from "@server/lib/ip";
import config from "@server/lib/config";

const inputSchema = z.object({
    publicKey: z.string(),
    port: z.number().int().positive(),
});

type Input = z.infer<typeof inputSchema>;

export const handleGetConfigMessage: MessageHandler = async (context) => {
    const { message, client, sendToClient } = context;
    const newt = client as Newt;

    logger.debug(JSON.stringify(message.data));

    logger.debug("Handling Newt get config message!");

    if (!newt) {
        logger.warn("Newt not found");
        return;
    }

    if (!newt.siteId) {
        logger.warn("Newt has no site!"); // TODO: Maybe we create the site here?
        return;
    }

    const parsed = inputSchema.safeParse(message.data);
    if (!parsed.success) {
        logger.error(
            "handleGetConfigMessage: Invalid input: " +
                fromError(parsed.error).toString()
        );
        return;
    }

    const { publicKey, port } = message.data as Input;

    const siteId = newt.siteId;

    const [siteRes] = await db
        .select()
        .from(sites)
        .where(eq(sites.siteId, siteId));

    if (!siteRes) {
        logger.warn("handleGetConfigMessage: Site not found");
        return;
    }

    let site: Site | undefined;
    if (!siteRes.address) {
        let address = await getNextAvailableClientSubnet(siteRes.orgId);
        if (!address) {
            logger.error("handleGetConfigMessage: No available address");
            return;
        }

        address = `${address.split("/")[0]}/${config.getRawConfig().orgs.block_size}` // we want the block size of the whole org

        // create a new exit node
        const [updateRes] = await db
            .update(sites)
            .set({
                publicKey,
                address,
                listenPort: port,
            })
            .where(eq(sites.siteId, siteId))
            .returning();

        site = updateRes;

        logger.info(`Updated site ${siteId} with new WG Newt info`);
    } else {
        // update the endpoint and the public key
        const [siteRes] = await db
            .update(sites)
            .set({
                publicKey,
                listenPort: port,
            })
            .where(eq(sites.siteId, siteId))
            .returning();

        site = siteRes;
    }

    if (!site) {
        logger.error("handleGetConfigMessage: Failed to update site");
        return;
    }

    const clientsRes = await db
        .select()
        .from(clients)
        .innerJoin(clientSites, eq(clients.clientId, clientSites.clientId))
        .where(eq(clientSites.siteId, siteId));

    const peers = await Promise.all(
        clientsRes
            .filter((client) => {
                if (!client.clients.pubKey) {
                    return false;
                }
                if (!client.clients.subnet) {
                    return false;
                }
                if (!client.clients.endpoint) {
                    return false;
                }
                if (!client.clients.online) {
                    return false;
                }

                return true;
            })
            .map(async (client) => {
                return {
                    publicKey: client.clients.pubKey,
                    allowedIps: [client.clients.subnet],
                    endpoint: client.clients.endpoint
                };
            })
    );

    const configResponse = {
        ipAddress: site.address,
        peers
    };

    logger.debug("Sending config: ", configResponse);

    return {
        message: {
            type: "newt/wg/receive-config", // what to make the response type?
            data: {
                ...configResponse
            }
        },
        broadcast: false, // Send to all clients
        excludeSender: false // Include sender in broadcast
    };
};
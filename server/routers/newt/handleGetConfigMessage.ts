import { z } from "zod";
import { MessageHandler } from "../ws";
import logger from "@server/logger";
import { fromError } from "zod-validation-error";
import db from "@server/db";
import {
    clients,
    clientSites,
    Newt,
    Site,
    sites,
    olms
} from "@server/db/schema";
import { eq } from "drizzle-orm";
import { getNextAvailableClientSubnet } from "@server/lib/ip";
import config from "@server/lib/config";
import { addPeer } from "../olm/peers";

const inputSchema = z.object({
    publicKey: z.string(),
    port: z.number().int().positive()
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

    // Get the current site data
    const [existingSite] = await db
        .select()
        .from(sites)
        .where(eq(sites.siteId, siteId));

    if (!existingSite) {
        logger.warn("handleGetConfigMessage: Site not found");
        return;
    }

    let site: Site | undefined;
    if (!existingSite.address) {
        // This is a new site configuration
        let address = await getNextAvailableClientSubnet(existingSite.orgId);
        if (!address) {
            logger.error("handleGetConfigMessage: No available address");
            return;
        }

        address = `${address.split("/")[0]}/${config.getRawConfig().orgs.block_size}`; // we want the block size of the whole org

        // Update the site with new WireGuard info
        const [updateRes] = await db
            .update(sites)
            .set({
                publicKey,
                address,
                listenPort: port
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
                listenPort: port
            })
            .where(eq(sites.siteId, siteId))
            .returning();

        site = siteRes;
    }

    if (!site) {
        logger.error("handleGetConfigMessage: Failed to update site");
        return;
    }

    // Get all clients connected to this site
    const clientsRes = await db
        .select()
        .from(clients)
        .innerJoin(clientSites, eq(clients.clientId, clientSites.clientId))
        .where(eq(clientSites.siteId, siteId));

    // Prepare peers data for the response
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
                const peerData = {
                    publicKey: client.clients.pubKey!,
                    allowedIps: [client.clients.subnet!],
                    endpoint: client.clientSites.isRelayed ? "" : client.clients.endpoint! // if its relayed it should be localhost
                };

                // Add or update this peer on the olm if it is connected
                try {
                    await addPeer(client.clients.clientId, {
                        ...peerData,
                        siteId: siteId,
                        serverIP: site.address,
                        serverPort: site.listenPort
                    });
                } catch (error) {
                    logger.error(
                        `Failed to add/update peer ${client.clients.pubKey} to newt ${newt.newtId}: ${error}`
                    );
                }

                return peerData;
            })
    );

    // Filter out any null values from peers that didn't have an olm
    const validPeers = peers.filter((peer) => peer !== null);

    // Build the configuration response
    const configResponse = {
        ipAddress: site.address,
        peers: validPeers
    };

    logger.debug("Sending config: ", configResponse);

    return {
        message: {
            type: "newt/wg/receive-config",
            data: {
                ...configResponse
            }
        },
        broadcast: false,
        excludeSender: false
    };
};

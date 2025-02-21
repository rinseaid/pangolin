import db from "@server/db";
import { MessageHandler } from "../ws";
import {
    clients,
    Olm,
    olms,
    sites,
} from "@server/db/schema";
import { eq, } from "drizzle-orm";
import { addPeer, deletePeer } from "../newt/peers";
import logger from "@server/logger";

export const handleOlmRegisterMessage: MessageHandler = async (context) => {
    const { message, client: c, sendToClient } = context;
    const olm = c as Olm;

    logger.info("Handling register olm message!");

    if (!olm) {
        logger.warn("Olm not found");
        return;
    }

    if (!olm.clientId) {
        logger.warn("Olm has no site!"); // TODO: Maybe we create the site here?
        return;
    }

    const clientId = olm.clientId;

    const { publicKey } = message.data;
    if (!publicKey) {
        logger.warn("Public key not provided");
        return;
    }

    const [client] = await db
        .select()
        .from(clients)
        .where(eq(clients.clientId, clientId))
        .limit(1);

    if (!client || !client.siteId) {
        logger.warn("Site not found or does not have exit node");
        return;
    }

    const [site] = await db
        .select()
        .from(sites)
        .where(eq(sites.siteId, client.siteId))
        .limit(1);

    if (!client) {
        logger.warn("Site not found or does not have exit node");
        return;
    }

    await db
        .update(clients)
        .set({
            pubKey: publicKey
        })
        .where(eq(clients.clientId, olm.clientId))
        .returning();

    if (client.pubKey && client.pubKey !== publicKey) {
        logger.info("Public key mismatch. Deleting old peer...");
        await deletePeer(site.siteId, client.pubKey);
    }

    if (!site.subnet) {
        logger.warn("Site has no subnet");
        return;
    }

    // add the peer to the exit node
    await addPeer(site.siteId, {
        publicKey: publicKey,
        allowedIps: [site.subnet]
    });

    return {
        message: {
            type: "olm/wg/connect",
            data: {
                endpoint: `${site.endpoint}:${site.listenPort}`,
                publicKey: site.publicKey,
                serverIP: site.address!.split("/")[0],
                tunnelIP: client.subnet.split("/")[0]
            }
        },
        broadcast: false, // Send to all olms
        excludeSender: false // Include sender in broadcast
    };
};

import db from "@server/db";
import { MessageHandler } from "../ws";
import { clients, Olm, olms, sites } from "@server/db/schema";
import { eq } from "drizzle-orm";
import { addPeer, deletePeer } from "../newt/peers";
import logger from "@server/logger";

export const handleOlmRelayMessage: MessageHandler = async (context) => {
    const { message, client: c, sendToClient } = context;
    const olm = c as Olm;

    logger.info("Handling relay olm message!");

    if (!olm) {
        logger.warn("Olm not found");
        return;
    }

    if (!olm.clientId) {
        logger.warn("Olm has no site!"); // TODO: Maybe we create the site here?
        return;
    }

    const clientId = olm.clientId;

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

    // make sure we hand endpoints for both the site and the client and the lastHolePunch is not too old
    if (!client.pubKey) {
        logger.warn("Site or client has no endpoint or listen port");
        return;
    }

    if (!site.subnet) {
        logger.warn("Site has no subnet");
        return;
    }

    await deletePeer(site.siteId, client.pubKey);

    // add the peer to the exit node
    await addPeer(site.siteId, {
        publicKey: client.pubKey,
        allowedIps: [client.subnet],
        endpoint: "" 
    });

    return
};

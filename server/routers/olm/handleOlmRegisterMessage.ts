import db from "@server/db";
import { MessageHandler } from "../ws";
import { clients, exitNodes, Olm, olms, sites } from "@server/db/schema";
import { eq } from "drizzle-orm";
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

    if (!site) {
        logger.warn("Site not found or does not have exit node");
        return;
    }

    if (!site.exitNodeId) {
        logger.warn("Site does not have exit node");
        return;
    }

    const [exitNode] = await db
        .select()
        .from(exitNodes)
        .where(eq(exitNodes.exitNodeId, site.exitNodeId))
        .limit(1);

    sendToClient(olm.olmId, {
        type: "olm/wg/holepunch",
        data: {
            serverPubKey: exitNode.publicKey,
        }
    });

    // make sure we hand endpoints for both the site and the client and the lastHolePunch is not too old
    if (!site.endpoint || !client.endpoint) {
        logger.warn("Site or client has no endpoint or listen port");
        return;
    }

    const now = new Date().getTime() / 1000;
    if (site.lastHolePunch && now - site.lastHolePunch > 6) {
        logger.warn("Site last hole punch is too old");
        return;
    }

    if (client.lastHolePunch && now - client.lastHolePunch > 6) {
        logger.warn("Client last hole punch is too old");
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
        allowedIps: [client.subnet],
        endpoint: client.endpoint
    });

    return {
        message: {
            type: "olm/wg/connect",
            data: {
                endpoint: site.endpoint,
                publicKey: site.publicKey,
                serverIP: site.address!.split("/")[0],
                tunnelIP: `${client.subnet.split("/")[0]}/${site.address!.split("/")[1]}` // put the client ip in the same subnet as the site. TODO: Is this right? Maybe we need th make .subnet work properly!
            }
        },
        broadcast: false, // Send to all olms
        excludeSender: false // Include sender in broadcast
    };
};

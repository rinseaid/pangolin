import db from "@server/db";
import { MessageHandler } from "../ws";
import {
    exitNodes,
    resources,
    sites,
    Target,
    targets
} from "@server/db/schema";
import { eq, and, sql } from "drizzle-orm";
import { addPeer, deletePeer } from "../gerbil/peers";
import logger from "@server/logger";

export const handleOlmRegisterMessage: MessageHandler = async (context) => {
    const { message, client, sendToClient } = context;

    const olm = client;

    logger.info("Handling register message!");

    if (!olm) {
        logger.warn("Olm not found");
        return;
    }

    if (!olm.siteId) {
        logger.warn("Olm has no site!"); // TODO: Maybe we create the site here?
        return;
    }

    const siteId = olm.siteId;

    const { publicKey } = message.data;
    if (!publicKey) {
        logger.warn("Public key not provided");
        return;
    }

    const [site] = await db
        .select()
        .from(sites)
        .where(eq(sites.siteId, siteId))
        .limit(1);

    if (!site || !site.exitNodeId) {
        logger.warn("Site not found or does not have exit node");
        return;
    }

    await db
        .update(sites)
        .set({
            pubKey: publicKey
        })
        .where(eq(sites.siteId, siteId))
        .returning();

    const [exitNode] = await db
        .select()
        .from(exitNodes)
        .where(eq(exitNodes.exitNodeId, site.exitNodeId))
        .limit(1);

    if (site.pubKey && site.pubKey !== publicKey) {
        logger.info("Public key mismatch. Deleting old peer...");
        await deletePeer(site.exitNodeId, site.pubKey);
    }

    if (!site.subnet) {
        logger.warn("Site has no subnet");
        return;
    }

    // add the peer to the exit node
    await addPeer(site.exitNodeId, {
        publicKey: publicKey,
        allowedIps: [site.subnet]
    });

    return {
        message: {
            type: "olm/wg/connect",
            data: {
                endpoint: `${exitNode.endpoint}:${exitNode.listenPort}`,
                publicKey: exitNode.publicKey,
                serverIP: exitNode.address.split("/")[0],
                tunnelIP: site.subnet.split("/")[0]
            }
        },
        broadcast: false, // Send to all olms
        excludeSender: false // Include sender in broadcast
    };
};

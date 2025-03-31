import db from "@server/db";
import { MessageHandler } from "../ws";
import { clients, clientSites, Olm, olms, sites } from "@server/db/schema";
import { eq } from "drizzle-orm";
import { updatePeer } from "../newt/peers";
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

    if (!client) {
        logger.warn("Site not found or does not have exit node");
        return;
    }

    // make sure we hand endpoints for both the site and the client and the lastHolePunch is not too old
    if (!client.pubKey) {
        logger.warn("Site or client has no endpoint or listen port");
        return;
    }

    const sitesData = await db
        .select()
        .from(sites)
        .innerJoin(clientSites, eq(sites.siteId, clientSites.siteId))
        .where(eq(clientSites.clientId, client.clientId));

    let jobs: Array<Promise<void>> = [];
    for (const site of sitesData) {
        // update the peer on the exit node
        const job = updatePeer(site.sites.siteId, client.pubKey, {
            endpoint: "" // this removes the endpoint
        });
        jobs.push(job);
    }

    await Promise.all(jobs);

    return;
};

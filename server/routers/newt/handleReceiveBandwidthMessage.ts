import db from "@server/db";
import { MessageHandler } from "../ws";
import { clients, Newt } from "@server/db/schema";
import { eq } from "drizzle-orm";
import logger from "@server/logger";

interface PeerBandwidth {
    publicKey: string;
    bytesIn: number;
    bytesOut: number;
}

export const handleReceiveBandwidthMessage: MessageHandler = async (context) => {
    const { message, client, sendToClient } = context;

    if (!message.data.bandwidthData) {
        logger.warn("No bandwidth data provided");
    }

    const bandwidthData: PeerBandwidth[] = message.data.bandwidthData;

    if (!Array.isArray(bandwidthData)) {
        throw new Error("Invalid bandwidth data");
    }

    await db.transaction(async (trx) => {
        for (const peer of bandwidthData) {
            const { publicKey, bytesIn, bytesOut } = peer;

            // Find the site by public key
            const [client] = await trx
                .select()
                .from(clients)
                .where(eq(clients.pubKey, publicKey))
                .limit(1);

            if (!client) {
                continue;
            }
            let online = client.online;

            // if the bandwidth for the site is > 0 then set it to online. if it has been less than 0 (no update) for 5 minutes then set it to offline
            if (bytesIn > 0 || bytesOut > 0) {
                online = true;
            } else if (client.lastBandwidthUpdate) {
                const lastBandwidthUpdate = new Date(
                    client.lastBandwidthUpdate
                );
                const currentTime = new Date();
                const diff =
                    currentTime.getTime() - lastBandwidthUpdate.getTime();
                if (diff < 300000) {
                    online = false;
                }
            }

            // Update the site's bandwidth usage
            await trx
                .update(clients)
                .set({
                    megabytesOut: (client.megabytesIn || 0) + bytesIn,
                    megabytesIn: (client.megabytesOut || 0) + bytesOut,
                    lastBandwidthUpdate: new Date().toISOString(),
                    online
                })
                .where(eq(clients.clientId, client.clientId));
        }
    });
};

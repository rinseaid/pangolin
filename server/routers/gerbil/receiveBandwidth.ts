import { Request, Response, NextFunction } from "express";
import { eq, and, lt, inArray } from "drizzle-orm";
import { sites } from "@server/db";
import { db } from "@server/db";
import logger from "@server/logger";
import createHttpError from "http-errors";
import HttpCode from "@server/types/HttpCode";
import response from "@server/lib/response";

interface PeerBandwidth {
    publicKey: string;
    bytesIn: number;
    bytesOut: number;
}

export const receiveBandwidth = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const bandwidthData: PeerBandwidth[] = req.body;

        if (!Array.isArray(bandwidthData)) {
            throw new Error("Invalid bandwidth data");
        }

        const currentTime = new Date();
        const oneMinuteAgo = new Date(currentTime.getTime() - 60000); // 1 minute ago

        await db.transaction(async (trx) => {
            // First, handle sites that are actively reporting bandwidth
            const activePeers = bandwidthData.filter(peer => peer.bytesIn > 0 || peer.bytesOut > 0);
            
            if (activePeers.length > 0) {
                // Get all active sites in one query
                const activeSites = await trx
                    .select()
                    .from(sites)
                    .where(inArray(sites.pubKey, activePeers.map(p => p.publicKey)));

                // Create a map for quick lookup
                const siteMap = new Map();
                activeSites.forEach(site => {
                    siteMap.set(site.pubKey, site);
                });

                // Update sites with actual bandwidth usage
                for (const peer of activePeers) {
                    const site = siteMap.get(peer.publicKey);
                    if (!site) continue;

                    await trx
                        .update(sites)
                        .set({
                            megabytesOut: (site.megabytesOut || 0) + peer.bytesIn,
                            megabytesIn: (site.megabytesIn || 0) + peer.bytesOut,
                            lastBandwidthUpdate: currentTime.toISOString(),
                            online: true
                        })
                        .where(eq(sites.siteId, site.siteId));
                }
            }

            // Handle sites that reported zero bandwidth but need online status updated
            const zeroBandwidthPeers = bandwidthData.filter(peer => peer.bytesIn === 0 && peer.bytesOut === 0);
            
            if (zeroBandwidthPeers.length > 0) {
                const zeroBandwidthSites = await trx
                    .select()
                    .from(sites)
                    .where(inArray(sites.pubKey, zeroBandwidthPeers.map(p => p.publicKey)));

                for (const site of zeroBandwidthSites) {
                    let newOnlineStatus = site.online;

                    // Check if site should go offline based on last bandwidth update WITH DATA
                    if (site.lastBandwidthUpdate) {
                        const lastUpdateWithData = new Date(site.lastBandwidthUpdate);
                        if (lastUpdateWithData < oneMinuteAgo) {
                            newOnlineStatus = false;
                        }
                    } else {
                        // No previous data update recorded, set to offline
                        newOnlineStatus = false;
                    }

                    // Always update lastBandwidthUpdate to show this instance is receiving reports
                    // Only update online status if it changed
                    if (site.online !== newOnlineStatus) {
                        await trx
                            .update(sites)
                            .set({
                                lastBandwidthUpdate: currentTime.toISOString(),
                                online: newOnlineStatus
                            })
                            .where(eq(sites.siteId, site.siteId));
                    } else {
                        // Just update the heartbeat timestamp
                        await trx
                            .update(sites)
                            .set({
                                lastBandwidthUpdate: currentTime.toISOString()
                            })
                            .where(eq(sites.siteId, site.siteId));
                    }
                }
            }
        });

        return response(res, {
            data: {},
            success: true,
            error: false,
            message: "Bandwidth data updated successfully",
            status: HttpCode.OK
        });
    } catch (error) {
        logger.error("Error updating bandwidth data:", error);
        return next(
            createHttpError(
                HttpCode.INTERNAL_SERVER_ERROR,
                "An error occurred..."
            )
        );
    }
};
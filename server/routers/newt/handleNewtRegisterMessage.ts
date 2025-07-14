import { db, newts } from "@server/db";
import { MessageHandler } from "../ws";
import { exitNodes, Newt, resources, sites, Target, targets } from "@server/db";
import { eq, and, sql, inArray } from "drizzle-orm";
import { addPeer, deletePeer } from "../gerbil/peers";
import logger from "@server/logger";
import config from "@server/lib/config";
import {
    findNextAvailableCidr,
    getNextAvailableClientSubnet
} from "@server/lib/ip";

export type ExitNodePingResult = {
    exitNodeId: number;
    latencyMs: number;
    weight: number;
    error?: string;
    exitNodeName: string;
    endpoint: string;
    wasPreviouslyConnected: boolean;
};

export const handleNewtRegisterMessage: MessageHandler = async (context) => {
    const { message, client, sendToClient } = context;
    const newt = client as Newt;

    logger.info("Handling register newt message!");

    if (!newt) {
        logger.warn("Newt not found");
        return;
    }

    if (!newt.siteId) {
        logger.warn("Newt has no site!"); // TODO: Maybe we create the site here?
        return;
    }

    const siteId = newt.siteId;

    const { publicKey, pingResults, newtVersion, backwardsCompatible } =
        message.data;
    if (!publicKey) {
        logger.warn("Public key not provided");
        return;
    }

    if (backwardsCompatible) {
        logger.debug(
            "Backwards compatible mode detecting - not sending connect message and waiting for ping response."
        );
        return;
    }

    let exitNodeId: number | undefined;
    if (pingResults) {
        const bestPingResult = selectBestExitNode(
            pingResults as ExitNodePingResult[]
        );
        if (!bestPingResult) {
            logger.warn("No suitable exit node found based on ping results");
            return;
        }
        exitNodeId = bestPingResult.exitNodeId;
    }

    if (newtVersion) {
        // update the newt version in the database
        await db
            .update(newts)
            .set({
                version: newtVersion as string
            })
            .where(eq(newts.newtId, newt.newtId));
    }

    const [oldSite] = await db
        .select()
        .from(sites)
        .where(eq(sites.siteId, siteId))
        .limit(1);

    if (!oldSite || !oldSite.exitNodeId) {
        logger.warn("Site not found or does not have exit node");
        return;
    }

    let siteSubnet = oldSite.subnet;
    let exitNodeIdToQuery = oldSite.exitNodeId;
    if (exitNodeId && (oldSite.exitNodeId !== exitNodeId || !oldSite.subnet)) {
        // This effectively moves the exit node to the new one
        exitNodeIdToQuery = exitNodeId; // Use the provided exitNodeId if it differs from the site's exitNodeId

        const sitesQuery = await db
            .select({
                subnet: sites.subnet
            })
            .from(sites)
            .where(eq(sites.exitNodeId, exitNodeId));

        const [exitNode] = await db
            .select()
            .from(exitNodes)
            .where(eq(exitNodes.exitNodeId, exitNodeIdToQuery))
            .limit(1);

        const blockSize = config.getRawConfig().gerbil.site_block_size;
        const subnets = sitesQuery.map((site) => site.subnet).filter((subnet) => subnet !== null);
        subnets.push(exitNode.address.replace(/\/\d+$/, `/${blockSize}`));
        const newSubnet = findNextAvailableCidr(
            subnets,
            blockSize,
            exitNode.address
        );
        if (!newSubnet) {
            logger.error("No available subnets found for the new exit node");
            return;
        }

        siteSubnet = newSubnet;

        await db
            .update(sites)
            .set({
                pubKey: publicKey,
                exitNodeId: exitNodeId,
                subnet: newSubnet
            })
            .where(eq(sites.siteId, siteId))
            .returning();
    } else {
        await db
            .update(sites)
            .set({
                pubKey: publicKey
            })
            .where(eq(sites.siteId, siteId))
            .returning();
    }

    const [exitNode] = await db
        .select()
        .from(exitNodes)
        .where(eq(exitNodes.exitNodeId, exitNodeIdToQuery))
        .limit(1);

    if (oldSite.pubKey && oldSite.pubKey !== publicKey) {
        logger.info("Public key mismatch. Deleting old peer...");
        await deletePeer(oldSite.exitNodeId, oldSite.pubKey);
    }

    if (!siteSubnet) {
        logger.warn("Site has no subnet");
        return;
    }

    // add the peer to the exit node
    await addPeer(exitNodeIdToQuery, {
        publicKey: publicKey,
        allowedIps: [siteSubnet]
    });

    // Improved version
    const allResources = await db.transaction(async (tx) => {
        // First get all resources for the site
        const resourcesList = await tx
            .select({
                resourceId: resources.resourceId,
                subdomain: resources.subdomain,
                fullDomain: resources.fullDomain,
                ssl: resources.ssl,
                blockAccess: resources.blockAccess,
                sso: resources.sso,
                emailWhitelistEnabled: resources.emailWhitelistEnabled,
                http: resources.http,
                proxyPort: resources.proxyPort,
                protocol: resources.protocol
            })
            .from(resources)
            .where(eq(resources.siteId, siteId));

        // Get all enabled targets for these resources in a single query
        const resourceIds = resourcesList.map((r) => r.resourceId);
        const allTargets =
            resourceIds.length > 0
                ? await tx
                      .select({
                          resourceId: targets.resourceId,
                          targetId: targets.targetId,
                          ip: targets.ip,
                          method: targets.method,
                          port: targets.port,
                          internalPort: targets.internalPort,
                          enabled: targets.enabled
                      })
                      .from(targets)
                      .where(
                          and(
                              inArray(targets.resourceId, resourceIds),
                              eq(targets.enabled, true)
                          )
                      )
                : [];

        // Combine the data in JS instead of using SQL for the JSON
        return resourcesList.map((resource) => ({
            ...resource,
            targets: allTargets.filter(
                (target) => target.resourceId === resource.resourceId
            )
        }));
    });

    const { tcpTargets, udpTargets } = allResources.reduce(
        (acc, resource) => {
            // Skip resources with no targets
            if (!resource.targets?.length) return acc;

            // Format valid targets into strings
            const formattedTargets = resource.targets
                .filter(
                    (target: Target) =>
                        target?.internalPort && target?.ip && target?.port
                )
                .map(
                    (target: Target) =>
                        `${target.internalPort}:${target.ip}:${target.port}`
                );

            // Add to the appropriate protocol array
            if (resource.protocol === "tcp") {
                acc.tcpTargets.push(...formattedTargets);
            } else {
                acc.udpTargets.push(...formattedTargets);
            }

            return acc;
        },
        { tcpTargets: [] as string[], udpTargets: [] as string[] }
    );

    return {
        message: {
            type: "newt/wg/connect",
            data: {
                endpoint: `${exitNode.endpoint}:${exitNode.listenPort}`,
                publicKey: exitNode.publicKey,
                serverIP: exitNode.address.split("/")[0],
                tunnelIP: siteSubnet.split("/")[0],
                targets: {
                    udp: udpTargets,
                    tcp: tcpTargets
                }
            }
        },
        broadcast: false, // Send to all clients
        excludeSender: false // Include sender in broadcast
    };
};

/**
 * Selects the most suitable exit node from a list of ping results.
 *
 * The selection algorithm follows these steps:
 *
 * 1. **Filter Invalid Nodes**: Excludes nodes with errors or zero weight.
 *
 * 2. **Sort by Latency**: Sorts valid nodes in ascending order of latency.
 *
 * 3. **Preferred Selection**:
 *    - If the lowest-latency node has sufficient capacity (≥10% weight),
 *      check if a previously connected node is also acceptable.
 *    - The previously connected node is preferred if its latency is within
 *      30ms or 15% of the best node’s latency.
 *
 * 4. **Fallback to Next Best**:
 *    - If the lowest-latency node is under capacity, find the next node
 *      with acceptable capacity.
 *
 * 5. **Final Fallback**:
 *    - If no nodes meet the capacity threshold, fall back to the node
 *      with the highest weight (i.e., most available capacity).
 *
 */
function selectBestExitNode(
    pingResults: ExitNodePingResult[]
): ExitNodePingResult | null {
    const MIN_CAPACITY_THRESHOLD = 0.1;
    const LATENCY_TOLERANCE_MS = 30;
    const LATENCY_TOLERANCE_PERCENT = 0.15;

    // Filter out invalid nodes
    const validNodes = pingResults.filter((n) => !n.error && n.weight > 0);

    if (validNodes.length === 0) {
        logger.error("No valid exit nodes available");
        return null;
    }

    // Sort by latency (ascending)
    const sortedNodes = validNodes
        .slice()
        .sort((a, b) => a.latencyMs - b.latencyMs);
    const lowestLatencyNode = sortedNodes[0];

    logger.info(
        `Lowest latency node: ${lowestLatencyNode.exitNodeName} (${lowestLatencyNode.latencyMs} ms, weight=${lowestLatencyNode.weight.toFixed(2)})`
    );

    // If lowest latency node has enough capacity, check if previously connected node is acceptable
    if (lowestLatencyNode.weight >= MIN_CAPACITY_THRESHOLD) {
        const previouslyConnectedNode = sortedNodes.find(
            (n) =>
                n.wasPreviouslyConnected && n.weight >= MIN_CAPACITY_THRESHOLD
        );

        if (previouslyConnectedNode) {
            const latencyDiff =
                previouslyConnectedNode.latencyMs - lowestLatencyNode.latencyMs;
            const percentDiff = latencyDiff / lowestLatencyNode.latencyMs;

            if (
                latencyDiff <= LATENCY_TOLERANCE_MS ||
                percentDiff <= LATENCY_TOLERANCE_PERCENT
            ) {
                logger.info(
                    `Sticking with previously connected node: ${previouslyConnectedNode.exitNodeName} ` +
                        `(${previouslyConnectedNode.latencyMs} ms), latency diff = ${latencyDiff.toFixed(1)}ms ` +
                        `/ ${(percentDiff * 100).toFixed(1)}%.`
                );
                return previouslyConnectedNode;
            }
        }

        return lowestLatencyNode;
    }

    // Otherwise, find the next node (after the lowest) that has enough capacity
    for (let i = 1; i < sortedNodes.length; i++) {
        const node = sortedNodes[i];
        if (node.weight >= MIN_CAPACITY_THRESHOLD) {
            logger.info(
                `Lowest latency node under capacity. Using next best: ${node.exitNodeName} ` +
                    `(${node.latencyMs} ms, weight=${node.weight.toFixed(2)})`
            );
            return node;
        }
    }

    // Fallback: pick the highest weight node
    const fallbackNode = validNodes.reduce((a, b) =>
        a.weight > b.weight ? a : b
    );
    logger.warn(
        `No nodes with ≥10% weight. Falling back to highest capacity node: ${fallbackNode.exitNodeName}`
    );
    return fallbackNode;
}

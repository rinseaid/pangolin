import { db } from "@server/db";
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

    const { publicKey, pingResults, backwardsCompatible } = message.data;
    if (!publicKey) {
        logger.warn("Public key not provided");
        return;
    }

    if (backwardsCompatible) {
        logger.debug("Backwards compatible mode detecting - not sending connect message and waiting for ping response.");
        return;
    }

    let exitNodeId: number | undefined;
    if (pingResults) {
        const bestPingResult = selectBestExitNode(pingResults as ExitNodePingResult[]); 
        if (!bestPingResult) {
            logger.warn("No suitable exit node found based on ping results");
            return;
        }
        exitNodeId = bestPingResult.exitNodeId;
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
    if (exitNodeId && oldSite.exitNodeId !== exitNodeId) {
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
        const subnets = sitesQuery.map((site) => site.subnet);
        subnets.push(
            exitNode.address.replace(
                /\/\d+$/,
                `/${blockSize}`
            )
        );
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

function selectBestExitNode(pingResults: ExitNodePingResult[]): ExitNodePingResult | null {
    // Configuration constants - can be tweaked as needed
    const LATENCY_PENALTY_EXPONENT = 1.5;  // make latency matter more
    const LAST_NODE_SCORE_BOOST = 1.10;    // 10% preference for the last used node
    const SCORE_TOLERANCE_PERCENT = 5.0;   // allow last node if within 5% of best score

    let bestNode = null;
    let bestScore = -1e12;
    let bestLatency = 1e12;
    const candidateNodes = [];

    // Calculate scores for each valid node
    for (const result of pingResults) {
        // Skip nodes with errors or invalid weight
        if (result.error || result.weight <= 0) {
            continue;
        }

        const latencyMs = result.latencyMs;
        let score = result.weight / Math.pow(latencyMs, LATENCY_PENALTY_EXPONENT);

        // Apply boost if this was the previously connected node
        if (result.wasPreviouslyConnected === true) {
            score *= LAST_NODE_SCORE_BOOST;
        }

        logger.info(`Exit node ${result.exitNodeName} with score: ${score.toFixed(2)} (latency: ${latencyMs}ms, weight: ${result.weight.toFixed(2)})`);

        candidateNodes.push({
            node: result,
            score: score,
            latency: latencyMs
        });

        // Track the best scoring node
        if (score > bestScore) {
            bestScore = score;
            bestLatency = latencyMs;
            bestNode = result;
        } else if (score === bestScore && latencyMs < bestLatency) {
            bestLatency = latencyMs;
            bestNode = result;
        }
    }

    // Check if the previously connected node is close enough in score to stick with it
    for (const candidate of candidateNodes) {
        if (candidate.node.wasPreviouslyConnected) {
            const scoreDifference = bestScore - candidate.score;
            const tolerance = bestScore * (SCORE_TOLERANCE_PERCENT / 100.0);
            
            if (scoreDifference <= tolerance) {
                logger.info(`Sticking with last used exit node: ${candidate.node.exitNodeName} (${candidate.node.endpoint}), score close enough to best`);
                bestNode = candidate.node;
            }
            break;
        }
    }

    if (bestNode === null) {
        logger.error("No suitable exit node found");
        return null;
    }

    logger.info(`Selected exit node: ${bestNode.exitNodeName} (${bestNode.endpoint})`);
    return bestNode;
}

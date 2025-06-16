import { db } from "@server/db";
import { MessageHandler } from "../ws";
import { exitNodes, Newt } from "@server/db";
import logger from "@server/logger";

export const handleNewtPingRequestMessage: MessageHandler = async (context) => {
    const { message, client, sendToClient } = context;
    const newt = client as Newt;

    logger.info("Handling ping request newt message!");

    if (!newt) {
        logger.warn("Newt not found");
        return;
    }

    // TODO: pick which nodes to send and ping better than just all of them
    const exitNodesList = await db
        .select()
        .from(exitNodes);

    const exitNodesPayload = exitNodesList.map((node) => ({
        exitNodeId: node.exitNodeId,
        exitNodeName: node.name,
        endpoint: node.endpoint,
        weight: 1 // TODO: Implement weight calculation if needed depending on load
        // (MAX_CONNECTIONS - current_connections) / MAX_CONNECTIONS)
        // higher = more desirable
    }));

    return {
        message: {
            type: "newt/ping/exitNodes",
            data: {
                exitNodes: exitNodesPayload
            }
        },
        broadcast: false, // Send to all clients
        excludeSender: false // Include sender in broadcast
    };
};

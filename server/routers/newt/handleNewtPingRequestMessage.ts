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

    let exitNodesPayload = exitNodesList.map((node) => ({
        exitNodeId: node.exitNodeId,
        endpoint: node.endpoint,
        weight: 0 // TODO: Implement weight calculation if needed depending on load
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

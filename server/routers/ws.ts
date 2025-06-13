import { Router, Request, Response } from "express";
import { Server as HttpServer } from "http";
import { WebSocket, WebSocketServer } from "ws";
import { IncomingMessage } from "http";
import { Socket } from "net";
import { Newt, newts, NewtSession } from "@server/db";
import { eq } from "drizzle-orm";
import { db } from "@server/db";
import { validateNewtSessionToken } from "@server/auth/sessions/newt";
import { messageHandlers } from "./messageHandlers";
import logger from "@server/logger";
import redisManager from "@server/db/redis";
import { v4 as uuidv4 } from "uuid";

// Custom interfaces
interface WebSocketRequest extends IncomingMessage {
    token?: string;
}

interface AuthenticatedWebSocket extends WebSocket {
    newt?: Newt;
    connectionId?: string;
}

interface TokenPayload {
    newt: Newt;
    session: NewtSession;
}

interface WSMessage {
    type: string;
    data: any;
}

interface HandlerResponse {
    message: WSMessage;
    broadcast?: boolean;
    excludeSender?: boolean;
    targetNewtId?: string;
}

interface HandlerContext {
    message: WSMessage;
    senderWs: WebSocket;
    newt: Newt | undefined;
    sendToClient: (newtId: string, message: WSMessage) => Promise<boolean>;
    broadcastToAllExcept: (message: WSMessage, excludeNewtId?: string) => Promise<void>;
    connectedClients: Map<string, WebSocket[]>;
}

interface RedisMessage {
    type: 'direct' | 'broadcast';
    targetNewtId?: string;
    excludeNewtId?: string;
    message: WSMessage;
    fromNodeId: string;
}

export type MessageHandler = (context: HandlerContext) => Promise<HandlerResponse | void>;

const router: Router = Router();
const wss: WebSocketServer = new WebSocketServer({ noServer: true });

// Generate unique node ID for this instance
const NODE_ID = uuidv4();
const REDIS_CHANNEL = 'websocket_messages';

// Client tracking map (local to this node)
let connectedClients: Map<string, AuthenticatedWebSocket[]> = new Map();

// Redis keys
const getConnectionsKey = (newtId: string) => `ws:connections:${newtId}`;
const getNodeConnectionsKey = (nodeId: string, newtId: string) => `ws:node:${nodeId}:${newtId}`;

// Initialize Redis subscription for cross-node messaging
const initializeRedisSubscription = async (): Promise<void> => {
    if (!redisManager.isRedisEnabled()) return;

    await redisManager.subscribe(REDIS_CHANNEL, async (channel: string, message: string) => {
        try {
            const redisMessage: RedisMessage = JSON.parse(message);
            
            // Ignore messages from this node
            if (redisMessage.fromNodeId === NODE_ID) return;
            
            if (redisMessage.type === 'direct' && redisMessage.targetNewtId) {
                // Send to specific client on this node
                await sendToClientLocal(redisMessage.targetNewtId, redisMessage.message);
            } else if (redisMessage.type === 'broadcast') {
                // Broadcast to all clients on this node except excluded
                await broadcastToAllExceptLocal(redisMessage.message, redisMessage.excludeNewtId);
            }
        } catch (error) {
            logger.error('Error processing Redis message:', error);
        }
    });
};

// Helper functions for client management
const addClient = async (newtId: string, ws: AuthenticatedWebSocket): Promise<void> => {
    // Generate unique connection ID
    const connectionId = uuidv4();
    ws.connectionId = connectionId;

    // Add to local tracking
    const existingClients = connectedClients.get(newtId) || [];
    existingClients.push(ws);
    connectedClients.set(newtId, existingClients);

    // Add to Redis tracking if enabled
    if (redisManager.isRedisEnabled()) {
        // Add this node to the set of nodes handling this newt
        await redisManager.sadd(getConnectionsKey(newtId), NODE_ID);
        
        // Track specific connection on this node
        await redisManager.hset(getNodeConnectionsKey(NODE_ID, newtId), connectionId, Date.now().toString());
    }

    logger.info(`Client added to tracking - Newt ID: ${newtId}, Connection ID: ${connectionId}, Total connections: ${existingClients.length}`);
};

const removeClient = async (newtId: string, ws: AuthenticatedWebSocket): Promise<void> => {
    // Remove from local tracking
    const existingClients = connectedClients.get(newtId) || [];
    const updatedClients = existingClients.filter(client => client !== ws);

    if (updatedClients.length === 0) {
        connectedClients.delete(newtId);
        
        // Remove from Redis tracking if enabled
        if (redisManager.isRedisEnabled()) {
            await redisManager.srem(getConnectionsKey(newtId), NODE_ID);
            await redisManager.del(getNodeConnectionsKey(NODE_ID, newtId));
        }
        
        logger.info(`All connections removed for Newt ID: ${newtId}`);
    } else {
        connectedClients.set(newtId, updatedClients);
        
        // Update Redis tracking if enabled
        if (redisManager.isRedisEnabled() && ws.connectionId) {
            await redisManager.hdel(getNodeConnectionsKey(NODE_ID, newtId), ws.connectionId);
        }
        
        logger.info(`Connection removed - Newt ID: ${newtId}, Remaining connections: ${updatedClients.length}`);
    }
};

// Local message sending (within this node)
const sendToClientLocal = async (newtId: string, message: WSMessage): Promise<boolean> => {
    const clients = connectedClients.get(newtId);
    if (!clients || clients.length === 0) {
        return false;
    }

    const messageString = JSON.stringify(message);
    clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(messageString);
        }
    });
    return true;
};

const broadcastToAllExceptLocal = async (message: WSMessage, excludeNewtId?: string): Promise<void> => {
    connectedClients.forEach((clients, newtId) => {
        if (newtId !== excludeNewtId) {
            clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(message));
                }
            });
        }
    });
};

// Cross-node message sending (via Redis)
const sendToClient = async (newtId: string, message: WSMessage): Promise<boolean> => {
    // Try to send locally first
    const localSent = await sendToClientLocal(newtId, message);
    
    // If Redis is enabled, also send via Redis pub/sub to other nodes
    if (redisManager.isRedisEnabled()) {
        const redisMessage: RedisMessage = {
            type: 'direct',
            targetNewtId: newtId,
            message,
            fromNodeId: NODE_ID
        };
        
        await redisManager.publish(REDIS_CHANNEL, JSON.stringify(redisMessage));
    }
    
    return localSent;
};

const broadcastToAllExcept = async (message: WSMessage, excludeNewtId?: string): Promise<void> => {
    // Broadcast locally
    await broadcastToAllExceptLocal(message, excludeNewtId);
    
    // If Redis is enabled, also broadcast via Redis pub/sub to other nodes
    if (redisManager.isRedisEnabled()) {
        const redisMessage: RedisMessage = {
            type: 'broadcast',
            excludeNewtId,
            message,
            fromNodeId: NODE_ID
        };
        
        await redisManager.publish(REDIS_CHANNEL, JSON.stringify(redisMessage));
    }
};

// Check if a newt has active connections across all nodes
const hasActiveConnections = async (newtId: string): Promise<boolean> => {
    if (!redisManager.isRedisEnabled()) {
        // Fallback to local check
        const clients = connectedClients.get(newtId);
        return !!(clients && clients.length > 0);
    }
    
    const activeNodes = await redisManager.smembers(getConnectionsKey(newtId));
    return activeNodes.length > 0;
};

// Get all active nodes for a newt
const getActiveNodes = async (newtId: string): Promise<string[]> => {
    if (!redisManager.isRedisEnabled()) {
        const clients = connectedClients.get(newtId);
        return (clients && clients.length > 0) ? [NODE_ID] : [];
    }
    
    return await redisManager.smembers(getConnectionsKey(newtId));
};

// Token verification middleware (unchanged)
const verifyToken = async (token: string): Promise<TokenPayload | null> => {
    try {
        const { session, newt } = await validateNewtSessionToken(token);

        if (!session || !newt) {
            return null;
        }

        const existingNewt = await db
            .select()
            .from(newts)
            .where(eq(newts.newtId, newt.newtId));

        if (!existingNewt || !existingNewt[0]) {
            return null;
        }

        return { newt: existingNewt[0], session };
    } catch (error) {
        logger.error("Token verification failed:", error);
        return null;
    }
};

const setupConnection = async (ws: AuthenticatedWebSocket, newt: Newt): Promise<void> => {
    logger.info("Establishing websocket connection");

    if (!newt) {
        logger.error("Connection attempt without newt");
        return ws.terminate();
    }

    ws.newt = newt;

    // Add client to tracking
    await addClient(newt.newtId, ws);

    ws.on("message", async (data) => {
        try {
            const message: WSMessage = JSON.parse(data.toString());

            // Validate message format
            if (!message.type || typeof message.type !== "string") {
                throw new Error("Invalid message format: missing or invalid type");
            }

            // Get the appropriate handler for the message type
            const handler = messageHandlers[message.type];
            if (!handler) {
                throw new Error(`Unsupported message type: ${message.type}`);
            }

            // Process the message and get response
            const response = await handler({
                message,
                senderWs: ws,
                newt: ws.newt,
                sendToClient,
                broadcastToAllExcept,
                connectedClients
            });

            // Send response if one was returned
            if (response) {
                if (response.broadcast) {
                    // Broadcast to all clients except sender if specified
                    await broadcastToAllExcept(response.message, response.excludeSender ? newt.newtId : undefined);
                } else if (response.targetNewtId) {
                    // Send to specific client if targetNewtId is provided
                    await sendToClient(response.targetNewtId, response.message);
                } else {
                    // Send back to sender
                    ws.send(JSON.stringify(response.message));
                }
            }

        } catch (error) {
            logger.error("Message handling error:", error);
            ws.send(JSON.stringify({
                type: "error",
                data: {
                    message: error instanceof Error ? error.message : "Unknown error occurred",
                    originalMessage: data.toString()
                }
            }));
        }
    });

    ws.on("close", async () => {
        await removeClient(newt.newtId, ws);
        logger.info(`Client disconnected - Newt ID: ${newt.newtId}`);
    });

    ws.on("error", (error: Error) => {
        logger.error(`WebSocket error for Newt ID ${newt.newtId}:`, error);
    });

    logger.info(`WebSocket connection established - Newt ID: ${newt.newtId}, Node ID: ${NODE_ID}`);
};

// Router endpoint (unchanged)
router.get("/ws", (req: Request, res: Response) => {
    res.status(200).send("WebSocket endpoint");
});

// WebSocket upgrade handler
const handleWSUpgrade = (server: HttpServer): void => {
    server.on("upgrade", async (request: WebSocketRequest, socket: Socket, head: Buffer) => {
        try {
            const token = request.url?.includes("?")
                ? new URLSearchParams(request.url.split("?")[1]).get("token") || ""
                : request.headers["sec-websocket-protocol"];

            if (!token) {
                logger.warn("Unauthorized connection attempt: no token...");
                socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
                socket.destroy();
                return;
            }

            const tokenPayload = await verifyToken(token);
            if (!tokenPayload) {
                logger.warn("Unauthorized connection attempt: invalid token...");
                socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
                socket.destroy();
                return;
            }

            wss.handleUpgrade(request, socket, head, async (ws: AuthenticatedWebSocket) => {
                await setupConnection(ws, tokenPayload.newt);
            });
        } catch (error) {
            logger.error("WebSocket upgrade error:", error);
            socket.write("HTTP/1.1 500 Internal Server Error\r\n\r\n");
            socket.destroy();
        }
    });
};

// Initialize Redis subscription when the module is loaded
if (redisManager.isRedisEnabled()) {
    initializeRedisSubscription().catch(error => {
        logger.error('Failed to initialize Redis subscription:', error);
    });
    logger.info(`WebSocket handler initialized with Redis support - Node ID: ${NODE_ID}`);
} else {
    logger.info('WebSocket handler initialized in local mode (Redis disabled)');
}

// Cleanup function for graceful shutdown
const cleanup = async (): Promise<void> => {
    try {
        // Close all WebSocket connections
        connectedClients.forEach((clients) => {
            clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.terminate();
                }
            });
        });

        // Clean up Redis tracking for this node
        if (redisManager.isRedisEnabled()) {
            const keys = await redisManager.getClient()?.keys(`ws:node:${NODE_ID}:*`) || [];
            if (keys.length > 0) {
                await Promise.all(keys.map(key => redisManager.del(key)));
            }
        }

        logger.info('WebSocket cleanup completed');
    } catch (error) {
        logger.error('Error during WebSocket cleanup:', error);
    }
};

// Handle process termination
process.on('SIGTERM', cleanup);
process.on('SIGINT', cleanup);

export {
    router,
    handleWSUpgrade,
    sendToClient,
    broadcastToAllExcept,
    connectedClients,
    hasActiveConnections,
    getActiveNodes,
    NODE_ID,
    cleanup
};
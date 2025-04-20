import { Router, Request, Response } from "express";
import { Server as HttpServer } from "http";
import { WebSocket, WebSocketServer } from "ws";
import { IncomingMessage } from "http";
import { Socket } from "net";
import { Newt, newts, NewtSession, olms, Olm, OlmSession } from "@server/db/schemas";
import { eq } from "drizzle-orm";
import db from "@server/db";
import { validateNewtSessionToken } from "@server/auth/sessions/newt";
import { validateOlmSessionToken } from "@server/auth/sessions/olm";
import { messageHandlers } from "./messageHandlers";
import logger from "@server/logger";

// Custom interfaces
interface WebSocketRequest extends IncomingMessage {
    token?: string;
}

type ClientType = 'newt' | 'olm';

interface AuthenticatedWebSocket extends WebSocket {
    client?: Newt | Olm;
    clientType?: ClientType;
}

interface TokenPayload {
    client: Newt | Olm;
    session: NewtSession | OlmSession;
    clientType: ClientType;
}

interface WSMessage {
    type: string;
    data: any;
}

interface HandlerResponse {
    message: WSMessage;
    broadcast?: boolean;
    excludeSender?: boolean;
    targetClientId?: string;
}

interface HandlerContext {
    message: WSMessage;
    senderWs: WebSocket;
    client: Newt | Olm | undefined;
    clientType: ClientType;
    sendToClient: (clientId: string, message: WSMessage) => boolean;
    broadcastToAllExcept: (message: WSMessage, excludeClientId?: string) => void;
    connectedClients: Map<string, WebSocket[]>;
}

export type MessageHandler = (context: HandlerContext) => Promise<HandlerResponse | void>;

const router: Router = Router();
const wss: WebSocketServer = new WebSocketServer({ noServer: true });

// Client tracking map
let connectedClients: Map<string, AuthenticatedWebSocket[]> = new Map();

// Helper functions for client management
const addClient = (clientId: string, ws: AuthenticatedWebSocket, clientType: ClientType): void => {
    const existingClients = connectedClients.get(clientId) || [];
    existingClients.push(ws);
    connectedClients.set(clientId, existingClients);
    logger.info(`Client added to tracking - ${clientType.toUpperCase()} ID: ${clientId}, Total connections: ${existingClients.length}`);
};

const removeClient = (clientId: string, ws: AuthenticatedWebSocket, clientType: ClientType): void => {
    const existingClients = connectedClients.get(clientId) || [];
    const updatedClients = existingClients.filter(client => client !== ws);
    if (updatedClients.length === 0) {
        connectedClients.delete(clientId);
        logger.info(`All connections removed for ${clientType.toUpperCase()} ID: ${clientId}`);
    } else {
        connectedClients.set(clientId, updatedClients);
        logger.info(`Connection removed - ${clientType.toUpperCase()} ID: ${clientId}, Remaining connections: ${updatedClients.length}`);
    }
};

// Helper functions for sending messages
const sendToClient = (clientId: string, message: WSMessage): boolean => {
    const clients = connectedClients.get(clientId);
    if (!clients || clients.length === 0) {
        logger.info(`No active connections found for Client ID: ${clientId}`);
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

const broadcastToAllExcept = (message: WSMessage, excludeClientId?: string): void => {
    connectedClients.forEach((clients, clientId) => {
        if (clientId !== excludeClientId) {
            clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(message));
                }
            });
        }
    });
};

// Token verification middleware
const verifyToken = async (token: string, clientType: ClientType): Promise<TokenPayload | null> => {
    try {
        if (clientType === 'newt') {
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
            return { client: existingNewt[0], session, clientType };
        } else {
            const { session, olm } = await validateOlmSessionToken(token);
            if (!session || !olm) {
                return null;
            }
            const existingOlm = await db
                .select()
                .from(olms)
                .where(eq(olms.olmId, olm.olmId));
            if (!existingOlm || !existingOlm[0]) {
                return null;
            }
            return { client: existingOlm[0], session, clientType };
        }
    } catch (error) {
        logger.error("Token verification failed:", error);
        return null;
    }
};

const setupConnection = (ws: AuthenticatedWebSocket, client: Newt | Olm, clientType: ClientType): void => {
    logger.info("Establishing websocket connection");
    if (!client) {
        logger.error("Connection attempt without client");
        return ws.terminate();
    }

    ws.client = client;
    ws.clientType = clientType;

    // Add client to tracking
    const clientId = clientType === 'newt' ? (client as Newt).newtId : (client as Olm).olmId;
    addClient(clientId, ws, clientType);

    ws.on("message", async (data) => {
        try {
            const message: WSMessage = JSON.parse(data.toString());

            if (!message.type || typeof message.type !== "string") {
                throw new Error("Invalid message format: missing or invalid type");
            }

            const handler = messageHandlers[message.type];
            if (!handler) {
                throw new Error(`Unsupported message type: ${message.type}`);
            }

            const response = await handler({
                message,
                senderWs: ws,
                client: ws.client,
                clientType: ws.clientType!,
                sendToClient,
                broadcastToAllExcept,
                connectedClients
            });

            if (response) {
                if (response.broadcast) {
                    broadcastToAllExcept(response.message, response.excludeSender ? clientId : undefined);
                } else if (response.targetClientId) {
                    sendToClient(response.targetClientId, response.message);
                } else {
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

    ws.on("close", () => {
        removeClient(clientId, ws, clientType);
        logger.info(`Client disconnected - ${clientType.toUpperCase()} ID: ${clientId}`);
    });

    ws.on("error", (error: Error) => {
        logger.error(`WebSocket error for ${clientType.toUpperCase()} ID ${clientId}:`, error);
    });

    logger.info(`WebSocket connection established - ${clientType.toUpperCase()} ID: ${clientId}`);
};

// Router endpoint
router.get("/ws", (req: Request, res: Response) => {
    res.status(200).send("WebSocket endpoint");
});

// WebSocket upgrade handler
const handleWSUpgrade = (server: HttpServer): void => {
    server.on("upgrade", async (request: WebSocketRequest, socket: Socket, head: Buffer) => {
        try {
            const url = new URL(request.url || '', `http://${request.headers.host}`);
            const token = url.searchParams.get('token') || request.headers["sec-websocket-protocol"] || '';
            let clientType = url.searchParams.get('clientType') as ClientType;

            if (!clientType) {
                clientType = "newt";
            }

            if (!token || !clientType || !['newt', 'olm'].includes(clientType)) {
                logger.warn("Unauthorized connection attempt: invalid token or client type...");
                socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
                socket.destroy();
                return;
            }

            const tokenPayload = await verifyToken(token, clientType);
            if (!tokenPayload) {
                logger.warn("Unauthorized connection attempt: invalid token...");
                socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
                socket.destroy();
                return;
            }

            wss.handleUpgrade(request, socket, head, (ws: AuthenticatedWebSocket) => {
                setupConnection(ws, tokenPayload.client, tokenPayload.clientType);
            });
        } catch (error) {
            logger.error("WebSocket upgrade error:", error);
            socket.write("HTTP/1.1 500 Internal Server Error\r\n\r\n");
            socket.destroy();
        }
    });
};

export {
    router,
    handleWSUpgrade,
    sendToClient,
    broadcastToAllExcept,
    connectedClients
};

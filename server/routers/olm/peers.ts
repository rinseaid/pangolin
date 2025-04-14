import db from '@server/db';
import { clients, olms, newts } from '@server/db/schema';
import { eq } from 'drizzle-orm';
import { sendToClient } from '../ws';
import logger from '@server/logger';

export async function addPeer(clientId: number, peer: {
    siteId: number,
    publicKey: string;
    allowedIps: string[];
    endpoint: string;
    serverIP: string | null;
    serverPort: number | null;
}) {
    const [olm] = await db.select().from(olms).where(eq(olms.clientId, clientId)).limit(1);
    if (!olm) {
        throw new Error(`Olm with ID ${clientId} not found`);
    }

    sendToClient(olm.olmId, {
        type: 'olm/wg/peer/add',    
        data: {
            publicKey: peer.publicKey,
            allowedIps: peer.allowedIps,
            endpoint: peer.endpoint,
            serverIP: peer.serverIP,
            serverPort: peer.serverPort
        }
    });

    logger.info(`Added peer ${peer.publicKey} to olm ${olm.olmId}`);
}

export async function deletePeer(clientId: number, publicKey: string) {
    const [olm] = await db.select().from(olms).where(eq(olms.clientId, clientId)).limit(1);
    if (!olm) {
        throw new Error(`Olm with ID ${clientId} not found`);
    }

    sendToClient(olm.olmId, {
        type: 'olm/wg/peer/remove',
        data: {
            publicKey
        }
    });

    logger.info(`Deleted peer ${publicKey} from olm ${olm.olmId}`);
}

export async function updatePeer(clientId: number, publicKey: string, peer: {
    allowedIps?: string[];
    endpoint?: string;
    serverIP?: string;
    serverPort?: number;
}) {
    const [olm] = await db.select().from(olms).where(eq(olms.clientId, clientId)).limit(1);
    if (!olm) {
        throw new Error(`Olm with ID ${clientId} not found`);
    }

    sendToClient(olm.olmId, {
        type: 'olm/wg/peer/update',
        data: {
            publicKey,
            ...peer
        }
    });

    logger.info(`Updated peer ${publicKey} on olm ${olm.olmId}`);
}
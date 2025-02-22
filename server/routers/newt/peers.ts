import db from '@server/db';
import { newts, sites } from '@server/db/schema';
import { eq } from 'drizzle-orm';
import { sendToClient } from '../ws';

export async function addPeer(siteId: number, peer: {
    publicKey: string;
    allowedIps: string[];
    endpoint: string;
}) {

    const [site] = await db.select().from(sites).where(eq(sites.siteId, siteId)).limit(1);
    if (!site) {
        throw new Error(`Exit node with ID ${siteId} not found`);
    }

    // get the newt on the site
    const [newt] = await db.select().from(newts).where(eq(newts.siteId, siteId)).limit(1);
    if (!newt) {
        throw new Error(`Newt not found for site ${siteId}`);
    }

    sendToClient(newt.newtId, {
        type: 'newt/wg/peer/add',    
        data: peer
    });
}

export async function deletePeer(siteId: number, publicKey: string) {
    const [site] = await db.select().from(sites).where(eq(sites.siteId, siteId)).limit(1);
    if (!site) {
        throw new Error(`Exit node with ID ${siteId} not found`);
    }

    // get the newt on the site
    const [newt] = await db.select().from(newts).where(eq(newts.siteId, siteId)).limit(1);
    if (!newt) {
        throw new Error(`Newt not found for site ${siteId}`);
    }

    sendToClient(newt.newtId, {
        type: 'newt/wg/peer/remove',
        data: {
            publicKey
        }
    });
}
import { z } from "zod";
import { MessageHandler } from "../ws";
import logger from "@server/logger";
import { fromError } from "zod-validation-error";
import db from "@server/db";
import { clients, Newt, Site, sites } from "@server/db/schema";
import { eq, isNotNull } from "drizzle-orm";
import { findNextAvailableCidr } from "@server/lib/ip";
import config from "@server/lib/config";

const inputSchema = z.object({
    publicKey: z.string(),
    endpoint: z.string(),
    listenPort: z.number()
});

type Input = z.infer<typeof inputSchema>;

export const handleGetConfigMessage: MessageHandler = async (context) => {
    const { message, client, sendToClient } = context;
    const newt = client as Newt;

    logger.debug("Handling Newt get config message!");

    if (!newt) {
        logger.warn("Newt not found");
        return;
    }

    if (!newt.siteId) {
        logger.warn("Newt has no site!"); // TODO: Maybe we create the site here?
        return;
    }

    const parsed = inputSchema.safeParse(message.data);
    if (!parsed.success) {
        logger.error(
            "handleGetConfigMessage: Invalid input: " +
                fromError(parsed.error).toString()
        );
        return;
    }

    const { publicKey, endpoint, listenPort } = message.data as Input;

    const siteId = newt.siteId;

    const [siteRes] = await db
        .select()
        .from(sites)
        .where(eq(sites.siteId, siteId));

    if (!siteRes) {
        logger.warn("handleGetConfigMessage: Site not found");
        return;
    }

    let site: Site | undefined;
    if (!site) {
        const address = await getNextAvailableSubnet();

        // create a new exit node
        const [updateRes] = await db
            .update(sites)
            .set({
                publicKey,
                endpoint,
                address,
                listenPort
            })
            .where(eq(sites.siteId, siteId))
            .returning();

        site = updateRes;

        logger.info(`Updated site ${siteId} with new WG Newt info`);
    } else {
        site = siteRes;
    }

    if (!site) {
        logger.error("handleGetConfigMessage: Failed to update site");
        return;
    }

    const clientsRes = await db
        .select()
        .from(clients)
        .where(eq(clients.siteId, siteId));

    const peers = await Promise.all(
        clientsRes.map(async (client) => {
            return {
                publicKey: client.pubKey,
                allowedIps: "0.0.0.0/0" // TODO: We should lock this down more
            };
        })
    );

    const configResponse = {
        listenPort: site.listenPort, // ?????
        // ipAddress: exitNode[0].address,
        peers
    };

    logger.debug("Sending config: ", configResponse);

    return {
        message: {
            type: "newt/wg/receive-config", // what to make the response type?
            data: {
                config: configResponse
            }
        },
        broadcast: false, // Send to all clients
        excludeSender: false // Include sender in broadcast
    };
};

async function getNextAvailableSubnet(): Promise<string> {
    const existingAddresses = await db
        .select({
            address: sites.address
        })
        .from(sites)
        .where(isNotNull(sites.address));

    const addresses = existingAddresses
        .map((a) => a.address)
        .filter((a) => a) as string[];

    let subnet = findNextAvailableCidr(
        addresses,
        config.getRawConfig().wg_site.block_size,
        config.getRawConfig().wg_site.subnet_group
    );
    if (!subnet) {
        throw new Error("No available subnets remaining in space");
    }

    // replace the last octet with 1
    subnet =
        subnet.split(".").slice(0, 3).join(".") +
        ".1" +
        "/" +
        subnet.split("/")[1];
    return subnet;
}

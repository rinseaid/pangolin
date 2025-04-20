import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { db } from "@server/db";
import {
    clients,
    clientSites
} from "@server/db/schemas";
import response from "@server/lib/response";
import HttpCode from "@server/types/HttpCode";
import createHttpError from "http-errors";
import logger from "@server/logger";
import { eq, and } from "drizzle-orm";
import { fromError } from "zod-validation-error";

const updateClientParamsSchema = z
    .object({
        clientId: z.string().transform(Number).pipe(z.number().int().positive())
    })
    .strict();

const updateClientSchema = z
    .object({
        name: z.string().min(1).max(255).optional(),
        siteIds: z.array(z.string().transform(Number).pipe(z.number())).optional()
    })
    .strict();

export type UpdateClientBody = z.infer<typeof updateClientSchema>;

export async function updateClient(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> {
    try {
        const parsedBody = updateClientSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return next(
                createHttpError(
                    HttpCode.BAD_REQUEST,
                    fromError(parsedBody.error).toString()
                )
            );
        }

        const { name, siteIds } = parsedBody.data;

        const parsedParams = updateClientParamsSchema.safeParse(req.params);
        if (!parsedParams.success) {
            return next(
                createHttpError(
                    HttpCode.BAD_REQUEST,
                    fromError(parsedParams.error).toString()
                )
            );
        }

        const { clientId } = parsedParams.data;

        // Fetch the client to make sure it exists and the user has access to it
        const [client] = await db
            .select()
            .from(clients)
            .where(eq(clients.clientId, clientId))
            .limit(1);

        if (!client) {
            return next(
                createHttpError(
                    HttpCode.NOT_FOUND,
                    `Client with ID ${clientId} not found`
                )
            );
        }

        await db.transaction(async (trx) => {
            // Update client name if provided
            if (name) {
                await trx
                    .update(clients)
                    .set({ name })
                    .where(eq(clients.clientId, clientId));
            }

            // Update site associations if provided
            if (siteIds) {
                // Delete existing site associations
                await trx
                    .delete(clientSites)
                    .where(eq(clientSites.clientId, clientId));

                // Create new site associations
                if (siteIds.length > 0) {
                    await trx.insert(clientSites).values(
                        siteIds.map(siteId => ({
                            clientId,
                            siteId
                        }))
                    );
                }
            }

            // Fetch the updated client
            const [updatedClient] = await trx
                .select()
                .from(clients)
                .where(eq(clients.clientId, clientId))
                .limit(1);

            return response(res, {
                data: updatedClient,
                success: true,
                error: false,
                message: "Client updated successfully",
                status: HttpCode.OK
            });
        });
    } catch (error) {
        logger.error(error);
        return next(
            createHttpError(HttpCode.INTERNAL_SERVER_ERROR, "An error occurred")
        );
    }
}
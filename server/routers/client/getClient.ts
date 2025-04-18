import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { db } from "@server/db";
import { clients } from "@server/db/schema";
import { eq, and } from "drizzle-orm";
import response from "@server/lib/response";
import HttpCode from "@server/types/HttpCode";
import createHttpError from "http-errors";
import logger from "@server/logger";
import stoi from "@server/lib/stoi";
import { fromError } from "zod-validation-error";

const getClientSchema = z
    .object({
        clientId: z
            .string()
            .transform(stoi)
            .pipe(z.number().int().positive()),
        orgId: z.string().optional()
    })
    .strict();

async function query(clientId: number) {
        const [res] = await db
            .select()
            .from(clients)
            .where(eq(clients.clientId, clientId))
            .limit(1);
        return res;
}

export type GetClientResponse = NonNullable<Awaited<ReturnType<typeof query>>>;

export async function getClient(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> {
    try {
        const parsedParams = getClientSchema.safeParse(req.params);
        if (!parsedParams.success) {
            logger.error(
                `Error parsing params: ${fromError(parsedParams.error).toString()}`
            );
            return next(
                createHttpError(
                    HttpCode.BAD_REQUEST,
                    fromError(parsedParams.error).toString()
                )
            );
        }

        const { clientId } = parsedParams.data;

        const client = await query(clientId);

        if (!client) {
            return next(createHttpError(HttpCode.NOT_FOUND, "Client not found"));
        }

        return response<GetClientResponse>(res, {
            data: client,
            success: true,
            error: false,
            message: "Client retrieved successfully",
            status: HttpCode.OK
        });
    } catch (error) {
        logger.error(error);
        return next(
            createHttpError(HttpCode.INTERNAL_SERVER_ERROR, "An error occurred")
        );
    }
}

import { Request, Response, NextFunction } from "express";
import response from "@server/lib/response";
import HttpCode from "@server/types/HttpCode";
import createHttpError from "http-errors";
import logger from "@server/logger";
import { generateId } from "@server/auth/sessions/app";

export type PickClientDefaultsResponse = {
    olmId: string;
    olmSecret: string;
};

export async function pickClientDefaults(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> {
    try {
        const olmId = generateId(15);
        const secret = generateId(48);

        return response<PickClientDefaultsResponse>(res, {
            data: {
                olmId: olmId,
                olmSecret: secret
            },
            success: true,
            error: false,
            message: "Organization retrieved successfully",
            status: HttpCode.OK
        });
    } catch (error) {
        logger.error(error);
        return next(
            createHttpError(HttpCode.INTERNAL_SERVER_ERROR, "An error occurred")
        );
    }
}

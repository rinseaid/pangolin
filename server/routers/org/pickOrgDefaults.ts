import { Request, Response, NextFunction } from "express";
import response from "@server/lib/response";
import HttpCode from "@server/types/HttpCode";
import createHttpError from "http-errors";
import logger from "@server/logger";
import { getNextAvailableOrgSubnet } from "@server/lib/ip";

export type PickOrgDefaultsResponse = {
    subnet: string;
};

export async function pickOrgDefaults(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> {
    try {
        const subnet = await getNextAvailableOrgSubnet();

        return response<PickOrgDefaultsResponse>(res, {
            data: {
                subnet: subnet
            },
            success: true,
            error: false,
            message: "Organization defaults created successfully",
            status: HttpCode.OK
        });
    } catch (error) {
        logger.error(error);
        return next(
            createHttpError(HttpCode.INTERNAL_SERVER_ERROR, "An error occurred")
        );
    }
}

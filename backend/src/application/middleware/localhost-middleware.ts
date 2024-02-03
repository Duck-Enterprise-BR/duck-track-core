import { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "axios";
import { getMachineIp } from "./middleware.utils";
import { logger } from "../logger/server-logger";

export const LocalhostMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const remoteAddress = req.socket.remoteAddress;

    logger.alert(`Localhost route accessed by ip: [${ remoteAddress }]`);

    const ip: string = getMachineIp();

    if (remoteAddress === "::1" || remoteAddress === "127.0.0.1" || remoteAddress === ip) {
        next();
        return;
    }

    res.status(HttpStatusCode.Unauthorized).send();
}
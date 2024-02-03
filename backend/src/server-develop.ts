import { Express } from "express";
import { logger } from "./application/logger/server-logger";
import list from "express-list-endpoints";

export const serverDevelop = async (app: Express): Promise<void> => {
    for (const route of list(app)) {
        logger.info(`PATH: ${route.path} | METHODS: [${route.methods}]`);
    }
}
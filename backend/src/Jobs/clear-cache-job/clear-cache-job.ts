import { RedisClient } from "../../providers/redis/redis-cliente";
import { logger } from "../../application/logger/server-logger";

export const ClearCacheJob = async (): Promise<void> => {
    await RedisClient.instanceCache.flushall(() => {
        logger.job("Cache flushall");
    });
}
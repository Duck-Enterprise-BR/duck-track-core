import { environment } from "../../environment";
import { logger } from "../../application/logger/server-logger";
import Redis from "ioredis";

export class RedisClient {
    public static instanceCache: Redis;
    public static instanceQueue: Redis;

    public constructor() {
        if (!RedisClient.instanceCache) {
            RedisClient.instanceCache = new Redis(redisCacheConnectionOption);
        }
        if (!RedisClient.instanceQueue) {
            RedisClient.instanceQueue = new Redis(redisQueueConnectionOption);
        }
    }

    public async testConnection(): Promise<void> {
        await RedisClient.instanceCache.ping()
            .then(() => {
                logger.info("Redis cache connected");
            })
            .catch((error) => {
                logger.alert(error.toString());
            });
    }
}

export const connectRedis = async (): Promise<void> => {
    await new RedisClient().testConnection();
}

export const redisQueueConnectionOption = {
    host: environment.redisHost,
    port: environment.redisQueuePort,
    password: environment.redisPassword,
    maxRetriesPerRequest: null
}

export const redisCacheConnectionOption = {
    host: environment.redisHost,
    port: environment.redisCachePort,
    password: environment.redisPassword,
    maxRetriesPerRequest: null
}
import dotenv from "dotenv";

dotenv.config();

class Environment {
    public readonly port: number = parseInt(process.env.PORT ?? "3000");
    public readonly host: string = process.env.HOST ?? "localhost";
    public readonly developMode: boolean = process.env.DEVELOP_MODE === "true" ?? false;
    public readonly tokenPassword: string = process.env.TOKEN_PASSWORD ?? "";
    public readonly mongoUrl: string = process.env.MONGO_URL ?? "";
    public readonly mongoDb: string = process.env.MONGO_DB ?? "";
    public readonly trackQueueUrl: string = process.env.TRACK_QUEUE_URL ?? "";
    public readonly redisCachePort: number = parseInt(process.env.REDIS_CACHE_PORT ?? "");
    public readonly redisQueuePort: number = parseInt(process.env.REDIS_QUEUE_PORT ?? "");
    public readonly redisHost: string = process.env.REDIS_HOST ?? "";
    public readonly redisPassword: string = process.env.REDIS_PASSWORD ?? "";
    public readonly bucketName: string = process.env.BUCKET_NAME ?? "";
    public readonly nodeForcks: number = 4;
}

export const environment = new Environment();
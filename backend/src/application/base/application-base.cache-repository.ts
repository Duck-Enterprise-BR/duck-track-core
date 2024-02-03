import { RedisClient } from "../../providers/redis/redis-cliente";

export class ApplicationBaseCacheRepository {
    private readonly redis = RedisClient.instanceCache;
    private readonly table: string;

    public constructor(table: string) {
        this.table = table;
    }

    public async create<T>(data: T, key: string): Promise<void> {
        await this.redis.set(this.makeKey(key), JSON.stringify(data));
    }

    public async find<T>(key: string): Promise<T | null> {
        const result = await this.redis.get(this.makeKey(key));
        return result ? JSON.parse(result) : null;
    }

    public async clear(key: string): Promise<void> {
        await this.redis.del(this.makeKey(key));
    }

    public async clearAll(): Promise<void> {
        const keys = await this.redis.keys(`${ this.table }:*`);

        if (keys.length > 0) {
            await this.redis.del(...keys);
        }
    }

    private makeKey(key: string): string {
        return `${ this.table }:${ key }`;
    }
}
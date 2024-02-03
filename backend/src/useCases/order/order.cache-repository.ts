import { ApplicationBaseCacheRepository } from "../../application/base/application-base.cache-repository";

export class OrderCacheRepository extends ApplicationBaseCacheRepository {
    public constructor() {
        super("order-cache");
    }
}
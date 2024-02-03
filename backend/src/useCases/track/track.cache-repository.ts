import { ApplicationBaseCacheRepository } from "../../application/base/application-base.cache-repository";

export class TrackCacheRepository extends ApplicationBaseCacheRepository {
    public constructor() {
        super("track");
    }
}
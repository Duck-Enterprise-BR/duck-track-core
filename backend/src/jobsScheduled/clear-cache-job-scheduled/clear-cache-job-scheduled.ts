import { ApplicationBaseJobScheduled } from "../../application/base/application-base.job-scheduled";
import { ClearCacheJob } from "../../Jobs/clear-cache-job/clear-cache-job";

export class ClearCacheJobScheduled extends ApplicationBaseJobScheduled {
    public constructor() {
        super("*/1440 * * * *", "clear-cache-job-scheduled");
    }

    public async exec(): Promise<void> {
        await ClearCacheJob();
    }
}
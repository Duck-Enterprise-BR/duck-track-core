import { ApplicationBaseJobScheduled } from "./application/base/application-base.job-scheduled";
import cron from "node-cron";

import { ClearCacheJobScheduled } from "./jobsScheduled/clear-cache-job-scheduled/clear-cache-job-scheduled";
import { TrackJobScheduled } from "./jobsScheduled/track-job-scheduled/track-job-scheduled";
import { logger } from "./application/logger/server-logger";

const jobs: Array<ApplicationBaseJobScheduled> = [
    new TrackJobScheduled(),
    new ClearCacheJobScheduled(),
];

export const runScheduledJobs = (): void => {
    for (const job of jobs) {
        cron.schedule(job.getSchedule(), () => {
            job.exec();
            logger.job(`Scheduled Job: ${ job.getName() } started`);
        }).start();
    }
}
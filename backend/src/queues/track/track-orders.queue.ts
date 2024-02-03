import { ApplicationBaseQueue } from "../../application/base/application-base.queue";
import { TrackDTO } from "../../Jobs/track-job/track.dto";
import { Job } from "bullmq";

import { trackJob } from "../../Jobs/track-job/track-job";

export class TrackOrdersQueue extends ApplicationBaseQueue<TrackDTO> {
    public constructor() {
        super("track-order-queue", {
            max: 1,
            duration: 2000
        });
    }

    public async exec(job: Job): Promise<void> {
        await trackJob(job.data.code, job.data.priority);
    }
}
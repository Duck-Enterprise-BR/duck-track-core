import { ApplicationBaseQueue } from "../../application/base/application-base.queue";
import { notificationJob } from "../../Jobs/notification-job/notification-job";
import { Job } from "bullmq";

export interface MessageDTO {
    token: string;
    data: {
        title: string;
        body: string;
    }
}

export class NotificationQueue extends ApplicationBaseQueue<MessageDTO> {
    public constructor() {
        super("notification-queue");
    }

    public async add(data: MessageDTO): Promise<void> {
        console.log(888)
        await this.queue.add(this.name, data);
    }

    public async exec(job: Job<MessageDTO>): Promise<void> {
        console.log(job.data)

        await notificationJob(job.data);
    }
}
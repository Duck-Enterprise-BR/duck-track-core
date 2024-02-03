import { Job, Queue, Worker, RateLimiterOptions } from "bullmq";
import { redisQueueConnectionOption } from "../../providers/redis/redis-cliente";

export class ApplicationBaseQueue<T> {
    protected readonly queue: Queue;
    protected readonly worker: Worker;
    protected readonly name: string;

    protected constructor(queueName: string, workerLimiter?: RateLimiterOptions) {
        this.queue = new Queue(queueName, {
            connection: redisQueueConnectionOption,
        });

        this.name = queueName;
        this.worker = new Worker(queueName, this.exec, {
            connection: redisQueueConnectionOption,
            limiter: workerLimiter
        });
    }

    public async add(data: T): Promise<void> {
        await this.queue.add(this.name, data);
    }

    public async exec(job: Job): Promise<void> {
    }
}
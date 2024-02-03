import { ApplicationBaseJobScheduled } from "../../application/base/application-base.job-scheduled";
import { TrackOrdersScheduledQueue } from "../../queues/track/track-orders-scheduled.queue";
import { OrderModel } from "../../useCases/order/order.model";
import { RedisClient } from "../../providers/redis/redis-cliente";

export class TrackJobScheduled extends ApplicationBaseJobScheduled {
    private readonly queue = new TrackOrdersScheduledQueue();

    public constructor() {
        super("*/25 * * * *", "track-job-scheduled");

        this.exec.bind(OrderModel);
    }

    public async exec(): Promise<void> {

        await RedisClient.instanceCache.flushall();

        let codeOrdersTracked: Array<string> = [];
        const orderQuery = { enabled: true, delivered: false };
        const count = (await OrderModel.find(orderQuery).exec()).length;

        let orderProcessed: number = 0;
        let skip: number = 0;
        let limit: number = 10;

        while (orderProcessed < count) {
            const orders = await OrderModel.find(orderQuery)
                .limit(limit)
                .skip(skip)
                .exec();

            orderProcessed += orders.length;

            orders.forEach(order => {
                if (!codeOrdersTracked.includes(order.code)) {
                    codeOrdersTracked.push(order.code);
                    this.queue.add(order);
                }
            });
        }
    }
}
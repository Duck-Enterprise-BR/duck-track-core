import { ApplicationBaseQueue } from "../../application/base/application-base.queue";
import { notificationJob } from "../../Jobs/notification-job/notification-job";
import { OrderInterface } from "../../useCases/order/order.interface";
import { OrderModel } from "../../useCases/order/order.model";
import { TrackModel } from "../../useCases/track/track.model";
import { UserModel } from "../../useCases/user/user.model";
import { trackJob } from "../../Jobs/track-job/track-job";
import { Job } from "bullmq";
import { logger } from "../../application/logger/server-logger";

export class TrackOrdersScheduledQueue extends ApplicationBaseQueue<OrderInterface> {

    constructor() {
        super("track-orders-scheduled-queue", {
            max: 1,
            duration: 1200
        });
    }

    public async exec(job: Job<OrderInterface>): Promise<void> {

        const data = job.data;

        const currentTrack = await TrackModel.findOne({
            enabled: true,
            delivered: false,
            code: data.code
        }).exec();

        const result = await trackJob(data.code, false);

        if (currentTrack && currentTrack.code) {

            logger.info(`Tracked ${ result.code }`);

            if (result.events.length > currentTrack.events.length) {

                const ordersWithCode = await OrderModel.find({ enabled: true, code: result.code }).exec();

                for (let order of ordersWithCode) {
                    const users = await UserModel.find({ enabled: true, _id: order.userId }).exec();

                    if (users.length) {
                        for (let user of users) {
                            await notificationJob({
                                token: user.tokenNotification,
                                data: {
                                    title: `Hey, ${ user.name }, novo status para ${ order.name }`,
                                    body: result.events[0].status
                                }
                            }, user.name)
                        }
                    }
                }
            }
        }
    }
}
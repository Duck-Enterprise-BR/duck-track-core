import { notificationJob } from "../notification-job/notification-job";
import { UserModel } from "../../useCases/user/user.model";

export const SendNotificationForAllJob = async (): Promise<void> => {
    const users = await UserModel.find({ enabled: true }).exec();

    for (const user of users) {
        await notificationJob({
            token: user.tokenNotification,
            data: {
                title: "dev",
                body: "0101"
            }
        })
    }
}
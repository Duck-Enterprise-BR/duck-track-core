import MessagingDevicesResponse = messaging.MessagingDevicesResponse;
import firebase, { messaging } from "firebase-admin";
import { MessageDTO } from "../../queues/notification/notification.queue";
import { logger } from "../../application/logger/server-logger";

export const notificationJob = async (message: MessageDTO, name?: string) => {

    await firebase.messaging().sendToDevice(message.token, {
        notification: {
            title: message.data.title,
            body: message.data.body
        }
    })
        .then((res: MessagingDevicesResponse) => {
            logger.info(`Notification sent ${ res }`)
        })
        .catch(error => {
            logger.error(error.toString());
        })
}
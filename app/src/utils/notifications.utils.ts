import * as notifications from "expo-notifications";

export const getToken = async (): Promise<string> => {
    const { status: existingStatus } = await notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
        const { status } = await notifications.requestPermissionsAsync();
        finalStatus = status;
    }

    if (finalStatus !== "granted") {
        return "undefined";
    }

    const { data: token } = await notifications.getDevicePushTokenAsync();

    return token
}
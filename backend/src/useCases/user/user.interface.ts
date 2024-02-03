import { ApplicationBaseInterface } from "../../application/base/application-base.interface";

export interface UserInterface extends ApplicationBaseInterface {
    name: string;
    deviceId: string;
    tokenNotification: string;
    brand: string;
    os: string;
}
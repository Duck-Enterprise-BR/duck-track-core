import { ApplicationBaseInterface } from "../../application/base/application-base.interface";

export interface OrderInterface extends ApplicationBaseInterface {
    delivered: boolean;
    name: string;
    code: string;
    userId: string;
}
import { ApplicationBaseInterface } from "../../application/base/application-base.interface";

export interface TrackApiInterface extends ApplicationBaseInterface {
    url: string;
    forJob: boolean;
    totalUsed: number;
}
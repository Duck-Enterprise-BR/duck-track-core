import { ApplicationBaseInterface } from "../../application/base/application-base.interface";

export interface TrackInterface extends ApplicationBaseInterface {
    delivered: boolean;
    code: string;
    host: string;
    events: typeof Array<TrackEventInterface>;
    responseTime: number;
    quantity: number;
    service: string;
    lastUpdated: string;
}

export interface TrackEventInterface {
    date: string;
    time: string;
    location: string;
    status: string;
    subStatus: string[];
    key: string;
}
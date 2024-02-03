export interface TrackDTO {
    _id: string;
    enabled: boolean;
    delivered: boolean;
    code: string;
    host: string;
    events: Array<TrackEventDTO>;
    responseTime: number;
    quantity: number;
    service: string;
    lastUpdated: string;
}

export interface TrackEventDTO {
    date: string;
    time: string;
    location: string;
    status: string;
    subStatus: string[];
    key: string;
}
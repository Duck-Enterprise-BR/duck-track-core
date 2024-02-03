import { TrackInterface, TrackEventInterface } from "./track.interface";
import { ModelFactory, Schema } from "../../providers/mongo/model-factory";

const scheme: Schema<TrackInterface> = {
    delivered: {
        type: Boolean,
        required: true,
    },
    code: {
        type: String,
        required: true
    },
    host: {
        type: String,
        required: true,
    },
    events: {
        type: Array<TrackEventInterface>,
        required: true
    },
    responseTime: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    service: {
        type: String,
        required: true
    },
    lastUpdated: {
        type: String,
        required: true
    }
}

export const TrackModel = ModelFactory<TrackInterface>("track", scheme, "tracks");
import { ModelFactory, Schema } from "../../providers/mongo/model-factory";
import { TrackApiInterface } from "./track-api.interface";

const schema: Schema<TrackApiInterface> = {
    url: {
        type: String,
        required: true
    },
    totalUsed: {
        type: Number,
        required: true,
        default: 0
    },
    forJob: {
        type: Boolean,
        required: true,
        default: false
    }
}

export const TrackApiModel = ModelFactory<TrackApiInterface>("track-api", schema, "track-apis");
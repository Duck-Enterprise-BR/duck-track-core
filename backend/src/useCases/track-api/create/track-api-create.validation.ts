import { Schema } from "sp-validator-tool";

export const TrackApiCreateValidation: Schema = {
    url: {
        type: "string",
        required: true,
        min: 1
    }
}
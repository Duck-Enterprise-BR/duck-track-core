import { Schema } from "sp-validator-tool";

export const UserCreateValidation: Schema = {
    name: {
        type: "string",
        required: true,
        min: 1
    },
    deviceId: {
        type: "string",
        required: true,
        min: 1
    },
    tokenNotification: {
        type: "string",
        required: true,
        min: 1
    },
    brand: {
        type: "string",
        required: true,
        min: 1
    },
    os: {
        type: "string",
        required: true,
        min: 1
    }
}
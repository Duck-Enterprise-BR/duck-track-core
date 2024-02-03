import { Schema } from "sp-validator-tool";

export const OrderCreateUpdateValidation: Schema = {
    name: {
        type: "string",
        required: true,
        min: 1
    },
    code: {
        type: "string",
        required: true,
        min: 1
    }
}
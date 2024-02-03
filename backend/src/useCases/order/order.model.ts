import { Schema, ModelFactory } from "../../providers/mongo/model-factory";
import { OrderInterface } from "./order.interface";

const schema: Schema<OrderInterface> = {
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    delivered: {
        type: Boolean,
        default: false,
        required: true
    }
}

export const OrderModel = ModelFactory<OrderInterface>("order", schema, "orders");

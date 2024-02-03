import { Schema, ModelFactory } from "../../providers/mongo/model-factory";
import { UserInterface } from "./user.interface";

const schema: Schema<UserInterface> = {
    name: {
        type: String,
        required: true
    },
    deviceId: {
        type: String,
        required: true
    },
    tokenNotification: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    os: {
        type: String,
        required: true
    }
}

export const UserModel = ModelFactory<UserInterface>("user", schema, "users");
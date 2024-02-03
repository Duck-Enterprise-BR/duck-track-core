import mongoose from "mongoose";
import { v4 as id } from "uuid";

export type Schema<T> = mongoose.SchemaDefinition<T>;

export type Model<T> = mongoose.Model<T>;

interface base {
    _id: string;
    enabled: boolean;
}

export const ModelFactory = <T>(name: string, schema: Schema<T>, collection: string): Model<T & base> => {
    const newSchema = new mongoose.Schema({
        _id: {
            type: String,
            default: id
        },
        enabled: {
            type: Boolean,
            default: true
        },
        ...schema
    }, {
        versionKey: false,
        timestamps: true
    });

    return mongoose.model<T & base>(name, newSchema, collection);
}
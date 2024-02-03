import { ObjectId } from "mongoose";

export interface ApplicationBaseInterface {
    _id: string;
    enabled: boolean;
}
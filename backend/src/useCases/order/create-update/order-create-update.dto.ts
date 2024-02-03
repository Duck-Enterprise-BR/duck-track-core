import { OrderInterface } from "../order.interface";

export type OrderCreateUpdateDTO = Omit<OrderInterface, "_id | enabled">;

export type OrderCreateResponseDTO = {
    message: string;
}
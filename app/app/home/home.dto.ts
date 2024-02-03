export type OrderDTO = {
    delivered: boolean;
    _id: string;
    name: string;
    code: string;
    userId: string;
}

export type AddOrderDTO = {
    name: string;
    code: string;
}
import { OrderInterface } from "../../useCases/order/order.interface";

export interface TrackDTO {
    code: string;
    priority: boolean;
}

export interface TrackApiResponseDTO {
    codigo: string;
    host: string;
    eventos: {
        data: string;
        hora: string;
        local: string;
        status: string;
        subStatus: string[];
    }[];
    time: number;
    quantidade: number;
    servico: string;
    ultimo: string;
}
import { TrackApiResponseDTO, TrackDTO } from "./track.dto";
import { TrackEventInterface } from "../../useCases/track/track.interface";
import { v4 } from "uuid";

const DELIVERED_TEXT: string = "Objeto entregue ao destinatário";

export type ReturnType = {
    firstTrackInProgress: boolean;
    delivered: boolean;
    code: string;
    host: string;
    events: Array<TrackEventInterface>;
    responseTime: number;
    quantity: number;
    service: string;
    lastUpdated: string;
}

export const transformData = (data: TrackApiResponseDTO): ReturnType => {
    let events: Array<TrackEventInterface> = [];

    if (data.eventos.length > 0) {
        for (let item of data.eventos) {
            events.push({
                date: item.data,
                time: item.hora,
                location: item.local,
                status: item.status,
                subStatus: item.subStatus,
                key: v4()
            })
        }
    }

    const delivered: boolean = data.eventos.length > 0 && data.eventos[0].status === DELIVERED_TEXT;

    return {
        firstTrackInProgress: false,
        delivered: delivered,
        code: data.codigo,
        host: data.host ?? "Não identificado",
        events: events,
        responseTime: data.time,
        quantity: data.quantidade,
        service: data.servico === "" ? "Não identificado" : data.servico,
        lastUpdated: data.ultimo ? new Date(data.ultimo).toLocaleDateString() : new Date().toLocaleDateString(),
    }
}
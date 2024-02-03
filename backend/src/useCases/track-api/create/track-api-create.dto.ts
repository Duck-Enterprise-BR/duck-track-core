import { TrackApiInterface } from "../track-api.interface";

export type TrackApiCreateDTO = Omit<TrackApiInterface, "_id | enabled">;
export type TrackApiCreateResponseDTO = TrackApiCreateDTO;
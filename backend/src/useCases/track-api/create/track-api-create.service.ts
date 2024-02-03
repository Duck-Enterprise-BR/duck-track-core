import { TrackApiCreateDTO, TrackApiCreateResponseDTO } from "./track-api-create.dto";
import { ApplicationBaseResponse } from "../../../application/base/application-base.response";
import { ApplicationBaseService } from "../../../application/base/application-base.service";
import { TrackApiModel } from "../track-api.model";
import { HttpStatusCode } from "axios";

export class TrackApiCreateService extends ApplicationBaseService {
    public async execute(data: TrackApiCreateDTO): Promise<ApplicationBaseResponse<TrackApiCreateResponseDTO>> {

        const exist = await TrackApiModel.findOne({ enabled: true, url: data.url }).exec();

        if(exist) {
            return new ApplicationBaseResponse<TrackApiCreateResponseDTO>(undefined, [], HttpStatusCode.BadRequest);
        }

        const dataCreated = await TrackApiModel.create({
            url: data.url
        });

        return new ApplicationBaseResponse<TrackApiCreateResponseDTO>(dataCreated);
    }
}
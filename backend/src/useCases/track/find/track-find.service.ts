import { ApplicationBaseResponse } from "../../../application/base/application-base.response";
import { ApplicationBaseService } from "../../../application/base/application-base.service";
import { TrackCacheRepository } from "../track.cache-repository";
import { TrackInterface } from "../track.interface";
import { TrackModel } from "../track.model";

export class TrackFindService extends ApplicationBaseService {
    private readonly cache = new TrackCacheRepository();

    public async execute(code: string): Promise<ApplicationBaseResponse<TrackInterface>> {

        const dataCached = await this.cache.find<TrackInterface>(code);

        if (dataCached) {
            return new ApplicationBaseResponse<TrackInterface>(dataCached);

        }

        const result = <TrackInterface>await TrackModel.findOne({ enabled: true, code: code }).exec();

        await this.cache.create<TrackInterface>(result, code);

        return new ApplicationBaseResponse<TrackInterface>(result);
    }
}
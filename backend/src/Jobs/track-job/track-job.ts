import axios, { AxiosResponse } from "axios";
import { transformData } from "./track-job.utils";
import { TrackApiModel } from "../../useCases/track-api/track-api.model";
import { OrderModel } from "../../useCases/order/order.model";
import { ReturnType } from "./track-job.utils";
import { TrackModel } from "../../useCases/track/track.model";
import { logger } from "../../application/logger/server-logger";

export const trackJob = async (code: string, priority: boolean): Promise<ReturnType> => {
    let url: string = "";
    const api = await TrackApiModel.findOne({ enabled: true, forJob: priority }).exec();

    if (api) {
        url = `${ api.url }${ code }`;
        await TrackApiModel.updateOne({ enabled: true, _id: api._id }, {
            $set: {
                totalUsed: api.totalUsed + 1
            }
        }).exec();
    }

    const result = <AxiosResponse>await axios.get(url)
        .catch(error => {
            logger.alert(error.toString());
            return;
        });

    const data = transformData(result.data);
    const query = { enabled: true, code: data.code };

    const currentData = await TrackModel.findOne({ enabled: true, code: data.code }).exec();

    if (currentData && data.events.length > currentData?.events.length) {
        if (data.delivered) {
            await OrderModel.updateMany({ enabled: true, code: data.code },
                {
                    $set: {
                        delivered: true
                    }
                }
            );
        }

        await TrackModel.updateMany(query, {
            $set: data
        }).exec();

        return data;
    }

    await TrackModel.create(data)
        .catch(error => {
            logger.info(error.toString());
        });

    return data;
}
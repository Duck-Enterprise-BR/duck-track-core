import { ApplicationBaseResponse } from "../../../application/base/application-base.response";
import { ApplicationBaseService } from "../../../application/base/application-base.service";
import { OrderCacheRepository } from "../order.cache-repository";
import { OrderDeleteDTO } from "./order-delete.dto";
import { OrderModel } from "../order.model";

export class OrderDeleteService extends ApplicationBaseService {
    private readonly cache = new OrderCacheRepository();

    public async execute(data: OrderDeleteDTO): Promise<ApplicationBaseResponse<any>> {
        await OrderModel.updateOne({ _id: data.id }, {
            $set: {
                enabled: false
            }
        }).exec();

        await this.cache.clearAll();

        return new ApplicationBaseResponse<any>();
    }
}
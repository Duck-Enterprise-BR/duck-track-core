import { ApplicationBaseResponse } from "../../../application/base/application-base.response";
import { ApplicationBaseService } from "../../../application/base/application-base.service";
import { OrderReadResponseDTO } from "./order-read.dto";
import { OrderCacheRepository } from "../order.cache-repository";
import { UserInterface } from "../../user/user.interface";
import { OrderModel } from "../order.model";

export class OrderReadService extends ApplicationBaseService {
    private readonly cache = new OrderCacheRepository();

    public async execute(user: UserInterface): Promise<ApplicationBaseResponse<OrderReadResponseDTO>> {

        const dataCached = await this.cache.find<OrderReadResponseDTO>(user._id);
        
        if (dataCached) {
            return new ApplicationBaseResponse<OrderReadResponseDTO>(dataCached);
        }

        const orders = await OrderModel.find({ enabled: true, userId: user._id }).exec();

        await this.cache.create<OrderReadResponseDTO>(orders, user._id);

        return new ApplicationBaseResponse<OrderReadResponseDTO>(orders);
    }
}